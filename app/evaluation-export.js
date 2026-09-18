import { getSkillStats } from './mastery.js';
import { EVALUATION_PROTOCOL_VERSION, EVALUATION_DIMENSIONS } from '../content/evaluation.js';
import { SKILLS } from '../content/curriculum.js';
import { listCustomScenarioRunRecords } from './scenario-library.js';
import { buildAdultLifeSimulationProvenance } from './evaluation-provenance.js';

function cleanCode(value=''){
  return String(value).trim().replace(/[^a-zA-Z0-9_-]/g,'').slice(0,32);
}

function budgetBand(amount){
  const n=Number(amount)||0;
  if(n<=25) return 'up-to-25';
  if(n<=50) return '26-50';
  if(n<=100) return '51-100';
  if(n<=200) return '101-200';
  if(n<=600) return '201-600';
  return 'over-600';
}

function safeCustomScenarioRuns(records=[]){
  return records.map((x,index)=>({
    sequence:index+1,
    source:'custom',
    schemaVersion:Number(x.schemaVersion)||1,
    revision:Number(x.revision)||1,
    fingerprint:String(x.fingerprint||'').slice(0,64)||null,
    scaffold:x.scaffold||null,
    needsProtected:typeof x.needsProtected==='boolean'?x.needsProtected:null,
    hintsUsed:Number(x.hintsUsed)||0
  }));
}

function safeRecoveryFollowups(records=[]){
  return records.map((x,index)=>({
    sequence:index+1,
    phase:x.phase==='retention'?'retention':'transfer',
    stage:Number(x.stage)||0,
    intervalDays:Number(x.intervalDays)||0,
    sourceSkill:x.sourceSkill||null,
    skill:x.skill||null,
    status:x.status||null,
    correct:x.correct,
    prompted:x.prompted,
    simulationVersion:x.simulationVersion==null?null:Number(x.simulationVersion)
  }));
}

export function buildDeidentifiedEvaluationExport(state,{participantCode='',customScenarioRunRecords=null}={}){
  const decisions=(state.learning?.decisions||[]).map((d,index)=>({
    attempt:index+1,
    skill:d.skill||null,
    correct:d.correct,
    prompted:!!d.prompted,
    transfer:!!d.transfer,
    recovery:!!d.recovery,
    recoveryPhase:d.recovery?(d.recoveryPhase||'immediate'):null,
    errorCategory:d.errorType||null,
    scaffold:d.scaffold||null,
    cadence:d.cadence||null,
    budgetBand:budgetBand(d.amount)
  }));

  const delayedChecks=(state.learning?.delayedChecks||[]).map((x,index)=>({
    sequence:index+1,
    skill:x.skill,
    stage:Number(x.stage)||0,
    intervalDays:Number(x.intervalDays)||0,
    status:x.status,
    correct:x.correct,
    prompted:x.prompted
  }));

  const recoveryFollowups=safeRecoveryFollowups(state.learning?.recoveryFollowups||[]);

  const scenarioHistory=(state.learning?.scenarioHistory||[]).map((x,index)=>({
    sequence:index+1,
    source:x.mode==='custom'?'custom':'standard',
    mode:x.mode||null,
    transferPeriod:x.transferPeriod||null,
    scaffold:x.scaffold||null,
    needsProtected:typeof x.protectedNeeds==='boolean'?x.protectedNeeds:null,
    hintsUsed:Number(x.hintsUsed)||0
  }));

  const customRuns=safeCustomScenarioRuns(
    customScenarioRunRecords===null ? listCustomScenarioRunRecords() : customScenarioRunRecords
  );

  const adultLifeSimulation=buildAdultLifeSimulationProvenance(state.adultLifeSimulation);

  return {
    schema:'nws-evaluation-export-v2',
    protocolVersion:EVALUATION_PROTOCOL_VERSION,
    participantCode:cleanCode(participantCode)||null,
    deidentifiedByDefault:true,
    collectionMode:'local-user-initiated-export',
    context:{
      cadence:state.profile?.cadence||null,
      scaffold:state.profile?.scaffold||null,
      scenarioMode:state.profile?.scenarioMode||null,
      scenarioSource:state.profile?.scenarioMode==='custom'?'custom':'standard',
      budgetBand:budgetBand(state.profile?.amount)
    },
    mastery:SKILLS.map(skill=>({skill:skill.id,...getSkillStats(state,skill.id)})),
    dimensions:EVALUATION_DIMENSIONS.map(x=>x.id),
    decisions,
    delayedChecks,
    recoveryFollowups,
    scenarioHistory,
    customScenarioRuns:customRuns,
    adultLifeSimulation,
    privacyNote:'Names, scenario titles/IDs, recovery probe IDs/text, student IDs, diagnosis, free text, exact timestamps, scenario seeds, exact money amounts, bank/benefit identifiers, IP addresses, and device fingerprints are intentionally excluded.'
  };
}

export function evaluationExportContainsForbiddenKeys(value){
  const forbidden=new Set(['name','title','scenarioid','scenario_id','probeid','probe_id','email','phone','studentid','student_id','diagnosis','ssn','notes','ip','ipaddress','devicefingerprint','at','date','completedat','scheduledat','dueat','seed']);
  function walk(node){
    if(!node||typeof node!=='object') return false;
    for(const [key,val] of Object.entries(node)){
      if(forbidden.has(key.toLowerCase())) return true;
      if(walk(val)) return true;
    }
    return false;
  }
  return walk(value);
}
