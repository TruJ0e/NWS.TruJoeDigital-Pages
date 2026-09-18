import { getSkillStats } from './mastery.js';
import { dueDelayedChecks } from './retrieval.js';
import { dueRecoveryFollowups } from './recovery-followup.js';
import { SKILLS } from '../content/curriculum.js';

export const ADVISOR_PILOT_CRITERION_PERCENT = 80;

const pct = (part,total) => total ? Math.round(100 * part / total) : null;
const bySkill = (items,skill) => items.filter(item => item.skill === skill);

function errorCounts(items){
  const counts = new Map();
  for(const item of items){
    if(item.correct !== false || !item.errorType) continue;
    counts.set(item.errorType,(counts.get(item.errorType) || 0) + 1);
  }
  return [...counts.entries()]
    .map(([category,count]) => ({category,count}))
    .sort((a,b) => b.count - a.count || a.category.localeCompare(b.category));
}

function recoveryFollowupForSourceSkill(state,sourceSkill,now){
  const records = (state.learning?.recoveryFollowups || []).filter(item => item.sourceSkill === sourceSkill);
  const completedTransfer = records.filter(item => item.phase === 'transfer' && item.status === 'completed');
  const completedRetention = records.filter(item => item.phase === 'retention' && item.status === 'completed');
  const scheduledTransfer = records.filter(item => item.phase === 'transfer' && item.status === 'scheduled');
  const scheduledRetention = records.filter(item => item.phase === 'retention' && item.status === 'scheduled');
  const dueTransfer = scheduledTransfer.filter(item => new Date(item.dueAt).getTime() <= Number(now));
  const dueRetention = scheduledRetention.filter(item => new Date(item.dueAt).getTime() <= Number(now));
  const independentPercent = list => pct(list.filter(item => item.correct && !item.prompted).length,list.length);
  return {
    total:records.length,
    transferCompleted:completedTransfer.length,
    transferIndependentPercent:independentPercent(completedTransfer),
    transferDue:dueTransfer.length,
    transferScheduled:scheduledTransfer.length,
    retentionCompleted:completedRetention.length,
    retentionIndependentPercent:independentPercent(completedRetention),
    retentionDue:dueRetention.length,
    retentionScheduled:scheduledRetention.length,
    due:dueTransfer.length + dueRetention.length,
    scheduled:scheduledTransfer.length + scheduledRetention.length
  };
}

function actionForSkill({stats,scoredAttempts,promptedPercent,recoveryImmediateAttempts,recoveryFollowup}){
  const criterion = ADVISOR_PILOT_CRITERION_PERCENT;
  if(scoredAttempts === 0){
    return {code:'start-practice',priority:50,label:'Start practice',reason:'No scored evidence has been recorded for this skill yet.'};
  }
  if(recoveryImmediateAttempts > 0 && recoveryFollowup.due > 0){
    return {code:'recovery-followup-due',priority:4,label:'Complete recovery follow-up',reason:'A changed-context or delayed recovery check is due now.'};
  }
  if(stats.retentionEvidence?.due > 0){
    return {code:'retention-due',priority:5,label:'Complete delayed check',reason:'A delayed retention check is due now.'};
  }
  if((stats.accuracy ?? 0) < criterion){
    return {code:'build-accuracy',priority:20,label:'Practice the core decision',reason:`Accuracy is ${stats.accuracy ?? 0}%; continue worked/guided practice before raising independence demands.`};
  }
  if((stats.independence ?? 0) < criterion || (promptedPercent ?? 0) > (100 - criterion)){
    return {code:'fade-support',priority:25,label:'Fade support',reason:'Accuracy is established more strongly than independence; reduce prompts gradually and recheck the same skill.'};
  }
  if(stats.transfer == null){
    return {code:'add-transfer',priority:30,label:'Try a changed context',reason:'Independent core performance exists, but no changed-context transfer evidence has been recorded.'};
  }
  if(stats.transfer < criterion){
    return {code:'strengthen-transfer',priority:22,label:'Repeat changed-context practice',reason:`Transfer is ${stats.transfer}%; vary context without simply repeating the original item.`};
  }
  if(stats.retentionEvidence?.retentionPercent != null && stats.retentionEvidence.retentionPercent < criterion){
    return {code:'strengthen-retention',priority:10,label:'Rebuild and recheck later',reason:`Delayed retention is ${stats.retentionEvidence.retentionPercent}%; review briefly, then schedule another delayed check.`};
  }
  if(recoveryImmediateAttempts > 0){
    if(recoveryFollowup.transferCompleted === 0){
      return {code:'recovery-transfer',priority:12,label:'Check recovery in a different context',reason:'Immediate recovery has been observed, but changed-context recovery has not yet been completed.'};
    }
    if(recoveryFollowup.transferIndependentPercent != null && recoveryFollowup.transferIndependentPercent < criterion){
      return {code:'recovery-transfer-support',priority:14,label:'Fade support in recovery transfer',reason:'Changed-context recovery has occurred, but independent recovery evidence is still below the pilot criterion.'};
    }
    if(recoveryFollowup.retentionScheduled > 0 && recoveryFollowup.retentionCompleted === 0){
      return {code:'recovery-retention-scheduled',priority:60,label:'Recovery retention scheduled',reason:'A delayed recovery check is scheduled; no additional same-session drilling is needed.'};
    }
    if(recoveryFollowup.retentionIndependentPercent != null && recoveryFollowup.retentionIndependentPercent < criterion){
      return {code:'recovery-retention-support',priority:16,label:'Recheck recovery later',reason:'Delayed recovery evidence is present but not yet consistently independent.'};
    }
  }
  if(stats.retentionEvidence?.scheduled > 0 && stats.retentionEvidence?.retentionPercent == null){
    return {code:'retention-scheduled',priority:65,label:'Delayed check scheduled',reason:'Core and transfer evidence are present; wait for the scheduled retention check rather than over-practicing now.'};
  }
  return {code:'maintain',priority:90,label:'Maintain / monitor',reason:'Current evidence does not show an immediate instructional gap. Continue varied practice and scheduled maintenance checks.'};
}

function scenarioExposure(state){
  const history = state.learning?.scenarioHistory || [];
  const standard = history.filter(item => item.mode !== 'custom');
  const custom = history.filter(item => item.mode === 'custom');
  const modeCounts = new Map();
  for(const item of history){
    const mode = item.mode || 'unknown';
    modeCounts.set(mode,(modeCounts.get(mode) || 0) + 1);
  }
  return {
    totalRuns:history.length,
    standardRuns:standard.length,
    customRuns:custom.length,
    modes:[...modeCounts.entries()].map(([mode,count]) => ({mode,count})).sort((a,b) => b.count - a.count || a.mode.localeCompare(b.mode))
  };
}

export function buildAdvisorDashboardModel(state,{now=Date.now()}={}){
  const decisions = state.learning?.decisions || [];
  const scored = decisions.filter(item => item.correct !== null);
  const recoveryDecisions = scored.filter(item => item.recovery);
  const ordinaryDue = dueDelayedChecks(state,now).length;
  const recoveryDue = dueRecoveryFollowups(state,now).length;

  const skills = SKILLS.map(skill => {
    const skillDecisions = bySkill(decisions,skill.id);
    const skillScored = skillDecisions.filter(item => item.correct !== null);
    const stats = getSkillStats(state,skill.id,now);
    const prompted = skillScored.filter(item => item.prompted).length;
    const immediateRecoveryAttempts = skillScored.filter(item => item.recovery && (item.recoveryPhase || 'immediate') === 'immediate').length;
    const recoveryFollowup = recoveryFollowupForSourceSkill(state,skill.id,now);
    const errors = errorCounts(skillScored);
    const nextAction = actionForSkill({
      stats,
      scoredAttempts:skillScored.length,
      promptedPercent:pct(prompted,skillScored.length),
      recoveryImmediateAttempts:immediateRecoveryAttempts,
      recoveryFollowup
    });
    return {
      id:skill.id,
      label:skill.label,
      scoredAttempts:skillScored.length,
      promptedAttempts:prompted,
      promptedPercent:pct(prompted,skillScored.length),
      errors,
      immediateRecoveryAttempts,
      recoveryFollowup,
      ...stats,
      nextAction
    };
  });

  const started = skills.filter(skill => skill.scoredAttempts > 0).length;
  const meetingIndependenceCriterion = skills.filter(skill => skill.independence != null && skill.independence >= ADVISOR_PILOT_CRITERION_PERCENT).length;
  const exposure = scenarioExposure(state);
  const actions = skills
    .filter(skill => skill.nextAction.code !== 'maintain')
    .map(skill => ({skillId:skill.id,skillLabel:skill.label,...skill.nextAction}))
    .sort((a,b) => a.priority - b.priority || a.skillLabel.localeCompare(b.skillLabel));

  return {
    generatedAt:new Date(now).toISOString(),
    criterionPercent:ADVISOR_PILOT_CRITERION_PERCENT,
    summary:{
      scoredDecisions:scored.length,
      accuracyPercent:pct(scored.filter(item => item.correct).length,scored.length),
      independencePercent:pct(scored.filter(item => !item.prompted).length,scored.length),
      promptedPercent:pct(scored.filter(item => item.prompted).length,scored.length),
      skillsStarted:started,
      skillsTotal:skills.length,
      skillsMeetingIndependenceCriterion:meetingIndependenceCriterion,
      delayedChecksDue:ordinaryDue,
      recoveryChecksDue:recoveryDue,
      recoveryAttempts:recoveryDecisions.length,
      successfulRecoveryAttempts:recoveryDecisions.filter(item => item.correct).length,
      independentRecoverySuccesses:recoveryDecisions.filter(item => item.correct && !item.prompted).length
    },
    scenarioExposure:exposure,
    errorPatterns:errorCounts(scored),
    skills,
    actions,
    interpretationNote:'NWS keeps accuracy, independence, transfer, retention, recovery, and prompt use separate. The 80% criterion is an NWS pilot product criterion to validate, not an autism-specific norm or clinical cutoff.'
  };
}

export function buildAdvisorDashboardExport(state,{now=Date.now()}={}){
  const model = buildAdvisorDashboardModel(state,{now});
  return {
    schema:'nws-advisor-evidence-v1',
    generatedAt:model.generatedAt,
    learnerId:state.profile?.name || 'Learner',
    currentScaffold:state.profile?.scaffold || null,
    summary:model.summary,
    scenarioExposure:model.scenarioExposure,
    errorPatterns:model.errorPatterns,
    skills:model.skills.map(skill => ({
      id:skill.id,
      label:skill.label,
      scoredAttempts:skill.scoredAttempts,
      accuracy:skill.accuracy,
      independence:skill.independence,
      transfer:skill.transfer,
      retention:skill.retention,
      recoveryImmediate:skill.recoveryImmediate,
      recoveryTransfer:skill.recoveryFollowup.transferIndependentPercent,
      recoveryRetention:skill.recoveryFollowup.retentionIndependentPercent,
      promptedPercent:skill.promptedPercent,
      errors:skill.errors,
      nextAction:{code:skill.nextAction.code,label:skill.nextAction.label,reason:skill.nextAction.reason}
    })),
    interpretationNote:model.interpretationNote,
    privacyNote:'This local advisor report may include the learner label used in NWS. Use the separate Evaluation export for research-oriented de-identified data.'
  };
}
