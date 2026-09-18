import {
  RECOVERY_RETENTION_INTERVAL_DAYS,
  recoveryProbeById,
  selectRecoveryProbe,
  evaluateRecoveryProbe
} from '../content/recovery-followup.js';

const DAY_MS=86400000;
const iso=value=>new Date(value).toISOString();

function ensure(state){
  state.learning ||= {};
  state.learning.recoveryFollowups ||= [];
  return state.learning.recoveryFollowups;
}

function lineageChecks(state,lineageId){
  return ensure(state).filter(x=>x.lineageId===lineageId);
}

function existingCheck(state,lineageId,phase,stage){
  return ensure(state).find(x=>x.lineageId===lineageId&&x.phase===phase&&Number(x.stage||0)===Number(stage||0))||null;
}

export function scheduleRecoveryTransfer(state,{
  sourceSkill='',
  sourceDecisionId=null,
  lineageId=null,
  now=Date.now(),
  simulationVersion=null
}={}){
  const lineage=lineageId||`recovery-lineage-${Number(now)}-${sourceDecisionId||'unknown'}`;
  const existing=existingCheck(state,lineage,'transfer',0);
  if(existing) return existing;
  const probe=selectRecoveryProbe({sourceSkill,phase:'transfer',stage:0});
  const check={
    id:`recovery-transfer-${Number(now)}-${probe.id}`,
    lineageId:lineage,
    phase:'transfer',
    stage:0,
    intervalDays:0,
    scheduledAt:iso(now),
    dueAt:iso(now),
    status:'scheduled',
    sourceSkill:sourceSkill||null,
    skill:probe.skill,
    probeId:probe.id,
    sourceDecisionId,
    simulationVersion:simulationVersion==null?null:Number(simulationVersion),
    helpRequested:false,
    correct:null,
    prompted:null,
    completedAt:null
  };
  ensure(state).push(check);
  return check;
}

export function syncSuccessfulRecoveryFollowups(state,{now=Date.now()}={}){
  const sim=state?.adultLifeSimulation;
  if(!sim||!Array.isArray(sim.history)) return 0;
  let queued=0;
  sim.history.forEach((entry,index)=>{
    if(entry?.kind!=='recovery'||!entry.defensible||entry.followupQueued) return;
    const lineageId=`life-recovery-${Number(now)}-${index}`;
    scheduleRecoveryTransfer(state,{
      sourceSkill:entry.skill,
      sourceDecisionId:entry.sourceDecisionId||null,
      lineageId,
      now:Number(now)+index,
      simulationVersion:sim.version
    });
    entry.followupQueued=true;
    entry.followupLineageId=lineageId;
    queued++;
  });
  return queued;
}

export function scheduleRecoveryRetention(state,sourceCheck,{
  now=Date.now(),
  stage=0
}={}){
  if(!sourceCheck||stage>=RECOVERY_RETENTION_INTERVAL_DAYS.length) return null;
  const lineageId=sourceCheck.lineageId;
  const existing=existingCheck(state,lineageId,'retention',stage);
  if(existing) return existing;
  const prior=lineageChecks(state,lineageId).map(x=>x.probeId).filter(Boolean);
  const probe=selectRecoveryProbe({
    sourceSkill:sourceCheck.sourceSkill||sourceCheck.skill,
    phase:'retention',
    stage,
    avoidProbeIds:prior
  });
  const intervalDays=RECOVERY_RETENTION_INTERVAL_DAYS[stage];
  const dueAt=Number(now)+intervalDays*DAY_MS;
  const check={
    id:`recovery-retention-${stage}-${Number(now)}-${probe.id}`,
    lineageId,
    phase:'retention',
    stage,
    intervalDays,
    scheduledAt:iso(now),
    dueAt:iso(dueAt),
    status:'scheduled',
    sourceSkill:sourceCheck.sourceSkill||null,
    skill:probe.skill,
    probeId:probe.id,
    sourceDecisionId:sourceCheck.sourceDecisionId||null,
    simulationVersion:sourceCheck.simulationVersion==null?null:Number(sourceCheck.simulationVersion),
    helpRequested:false,
    correct:null,
    prompted:null,
    completedAt:null
  };
  ensure(state).push(check);
  return check;
}

export function dueRecoveryFollowups(state,now=Date.now()){
  return ensure(state).filter(x=>x.status==='scheduled'&&new Date(x.dueAt).getTime()<=Number(now));
}

export function scheduledRecoveryFollowups(state){
  return ensure(state).filter(x=>x.status==='scheduled');
}

export function markRecoveryFollowupHelp(state,id){
  const check=ensure(state).find(x=>x.id===id&&x.status==='scheduled');
  if(!check) return false;
  check.helpRequested=true;
  return true;
}

export function completeRecoveryFollowup(state,id,choiceId,{now=Date.now()}={}){
  const check=ensure(state).find(x=>x.id===id&&x.status==='scheduled');
  if(!check) return null;
  const evaluated=evaluateRecoveryProbe(check.probeId,choiceId);
  if(!evaluated) return null;
  check.status='completed';
  check.correct=!!evaluated.correct;
  check.prompted=!!check.helpRequested;
  check.completedAt=iso(now);
  let next=null;
  if(check.correct&&!check.prompted){
    if(check.phase==='transfer') next=scheduleRecoveryRetention(state,check,{now,stage:0});
    else if(check.phase==='retention') next=scheduleRecoveryRetention(state,check,{now,stage:Number(check.stage||0)+1});
  }
  return {check,probe:evaluated.probe,selected:evaluated.selected,correct:!!evaluated.correct,next};
}

export function recoveryFollowupStatus(state,now=Date.now()){
  const all=ensure(state);
  const transfer=all.filter(x=>x.phase==='transfer');
  const retention=all.filter(x=>x.phase==='retention');
  const completedTransfer=transfer.filter(x=>x.status==='completed');
  const completedRetention=retention.filter(x=>x.status==='completed');
  const pct=list=>list.length?Math.round(100*list.filter(x=>x.correct&&!x.prompted).length/list.length):null;
  return {
    due:dueRecoveryFollowups(state,now).length,
    scheduled:all.filter(x=>x.status==='scheduled').length,
    transferCompleted:completedTransfer.length,
    transferIndependentPercent:pct(completedTransfer),
    retentionCompleted:completedRetention.length,
    retentionIndependentPercent:pct(completedRetention)
  };
}

export function recoveryFollowupProbe(check){ return check?recoveryProbeById(check.probeId):null; }
