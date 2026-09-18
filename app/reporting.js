import { getSkillStats } from './mastery.js';
import { dueDelayedChecks } from './retrieval.js';
import { recoveryFollowupStatus } from './recovery-followup.js';
import { SKILLS } from '../content/curriculum.js';

export function generateInstructorReport(state, {now = Date.now()} = {}) {
  const decisions = state.learning?.decisions || [];
  const scored = decisions.filter(d => d.correct !== null);
  const correct = scored.filter(d => d.correct).length;
  const independent = scored.filter(d => !d.prompted).length;
  const transferItems = scored.filter(d => d.transfer);
  const recoveryItems = scored.filter(d => d.recovery);
  const immediateRecoveryItems = recoveryItems.filter(d => (d.recoveryPhase || 'immediate') === 'immediate');
  const transferRecoveryItems = recoveryItems.filter(d => d.recoveryPhase === 'transfer');
  const retentionRecoveryItems = recoveryItems.filter(d => d.recoveryPhase === 'retention');
  const followups = recoveryFollowupStatus(state, now);
  const scenarioHistory = [...(state.learning?.scenarioHistory || [])];
  const skillEvidence = SKILLS.map(skill => ({
    id:skill.id,
    label:skill.label,
    ...getSkillStats(state, skill.id, now)
  }));

  return {
    generatedAt:new Date(now).toISOString(),
    learnerId:state.profile?.name || 'Learner',
    practiceContext:{
      cadence:state.profile?.cadence,
      amount:state.profile?.amount,
      scaffold:state.profile?.scaffold,
      scenarioMode:state.profile?.scenarioMode
    },
    summary:{
      scoredDecisions:scored.length,
      accuracyPercent:scored.length ? Math.round(100 * correct / scored.length) : null,
      independencePercent:scored.length ? Math.round(100 * independent / scored.length) : null,
      promptedPercent:scored.length ? Math.round(100 * scored.filter(d => d.prompted).length / scored.length) : null,
      transferAttempts:transferItems.length,
      recoveryAttempts:recoveryItems.length,
      successfulRecoveryEvents:recoveryItems.filter(d => d.correct).length,
      immediateRecoveryAttempts:immediateRecoveryItems.length,
      recoveryTransferAttempts:transferRecoveryItems.length,
      recoveryRetentionAttempts:retentionRecoveryItems.length,
      hintsRequested:state.learning?.hintsUsed || 0,
      delayedChecksDue:dueDelayedChecks(state, now).length,
      recoveryChecksDue:followups.due,
      recoveryTransferCompleted:followups.transferCompleted,
      recoveryTransferIndependentPercent:followups.transferIndependentPercent,
      recoveryRetentionCompleted:followups.retentionCompleted,
      recoveryRetentionIndependentPercent:followups.retentionIndependentPercent
    },
    scenarioExposure:{
      totalRuns:scenarioHistory.length,
      standardRuns:scenarioHistory.filter(x => x.mode !== 'custom').length,
      customRuns:scenarioHistory.filter(x => x.mode === 'custom').length
    },
    skills:skillEvidence,
    scenarioHistory,
    privacyNote:'This report is designed for simulated/local-first educational data. Do not add bank credentials, SSNs, medical records, or unnecessary diagnosis information.',
    interpretationNote:'NWS separates accuracy, independence, transfer, retention, immediate recovery, recovery transfer, recovery retention, and prompt use. This report is not a clinical score or validated autism norm.'
  };
}
