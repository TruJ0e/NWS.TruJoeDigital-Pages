import { retrievalStatus, scheduleDelayedCheck } from './retrieval.js';

export const MASTERY_DIMENSIONS = ['accuracy','independence','transfer','retention','recovery'];

export function skillForTransactionType(type){
  if(type==='need') return 'needs';
  if(type==='want') return 'weekly';
  if(type==='recurring') return 'recurring';
  if(type==='save') return 'saving';
  if(type==='income') return 'income';
  return 'weekly';
}

export function recordLearningDecision(state,skill,correct,{prompted=false,errorType='',transfer=false,recovery=false,recoveryPhase='',detail='',scheduleRetention=true}={}){
  const decision={id:Date.now()+Math.random(),skill,correct:correct===null?null:!!correct,prompted:!!prompted,errorType,transfer:!!transfer,recovery:!!recovery,recoveryPhase:recovery?(recoveryPhase||'immediate'):null,detail,scaffold:state.profile.scaffold,cadence:state.profile.cadence,amount:+state.profile.amount,at:new Date().toISOString()};
  state.learning.decisions.push(decision);
  if(state.learning.decisions.length>500) state.learning.decisions=state.learning.decisions.slice(-500);
  state.learning.lastPracticed[skill]=decision.at;
  state.completed['skill:'+skill]=true;
  if(scheduleRetention && decision.correct===true && !decision.prompted){
    scheduleDelayedCheck(state,skill,{sourceDecisionId:decision.id});
  }
  return decision;
}

function recoveryPercent(list){return list.length?Math.round(100*list.filter(d=>d.correct).length/list.length):null;}

export function getSkillStats(state,skill,now=Date.now()){
  const all=state.learning.decisions.filter(d=>d.skill===skill);
  const scored=all.filter(d=>d.correct!==null);
  const accuracy=scored.length?Math.round(100*scored.filter(d=>d.correct).length/scored.length):null;
  const independence=scored.length?Math.round(100*scored.filter(d=>!d.prompted).length/scored.length):null;
  const transferItems=scored.filter(d=>d.transfer);
  const transfer=transferItems.length?Math.round(100*transferItems.filter(d=>d.correct).length/transferItems.length):null;
  const recoveries=scored.filter(d=>d.recovery);
  const immediateRecoveries=recoveries.filter(d=>(d.recoveryPhase||'immediate')==='immediate');
  const transferRecoveries=recoveries.filter(d=>d.recoveryPhase==='transfer');
  const retentionRecoveries=recoveries.filter(d=>d.recoveryPhase==='retention');
  const recovery=recoveryPercent(recoveries);
  const retentionEvidence=retrievalStatus(state,skill,now);
  const retention=retentionEvidence.retentionPercent!=null
    ? `${retentionEvidence.retentionPercent}%`
    : retentionEvidence.due>0
      ? 'Due'
      : retentionEvidence.scheduled>0
        ? 'Scheduled'
        : 'Not scheduled';
  return {
    accuracy,independence,transfer,recovery,
    recoveryImmediate:recoveryPercent(immediateRecoveries),
    recoveryTransfer:recoveryPercent(transferRecoveries),
    recoveryRetention:recoveryPercent(retentionRecoveries),
    retention,retentionEvidence,n:all.length
  };
}

export function proposedMasteryStatus(stats){
  if(stats.accuracy==null) return 'Not started';
  const transferReady=(stats.transfer??0)>=80;
  const coreReady=stats.accuracy>=80 && (stats.independence??0)>=80 && transferReady;
  if(!coreReady) return 'Learning';
  if(stats.retentionEvidence?.retentionPercent>=80) return 'Mastered / monitor maintenance';
  if(stats.retention==='Due') return 'Delayed check due';
  return 'Developing / verify retention';
}
