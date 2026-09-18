export const STORAGE_KEY = 'nwsFinancialSkills.v2';
export const LEGACY_STORAGE_KEY = 'collegeMoneyLab.v1';

export const DEFAULTS = {
  profile:{name:'Alex',cadence:'weekly',amount:50,balance:50,savings:20,scaffold:'Guide',emergencyTarget:50,shortGoalName:'Game',shortGoal:80,mediumGoalName:'Semester buffer',mediumGoal:250,longGoalName:'After-college move',longGoal:800,incomeConsistency:'fixed',scenarioMode:'baseline',scenarioSeed:'NWS-001'},
  preferences:{theme:'light',density:'low',calculations:'full',unexpected:'previewed',wording:'standard'},
  subscriptions:[{id:'stream',name:'Streaming',monthly:10,uses:8,active:true,value:'high',renewal:'Monthly'}],
  planned:[{id:'transport',name:'Transportation',amount:10,type:'need'}],
  customScenarioActive:null,
  ledger:[],completed:{},attempts:0,weekStarted:false,report:null,spendQuiz:{},notes:'',revealedHints:{},currentRunStart:null,currentScenarioEvents:[],transferMode:false,
  learning:{hintsUsed:0,decisions:[],lastPracticed:{},delayedChecks:[],recoveryFollowups:[],scenarioHistory:[]},
  content:{version:'2026.09',benefitsReviewed:'2026-09-16'},version:4
};

export function cloneState(value){ return JSON.parse(JSON.stringify(value)); }

export function normalizeState(value){
  const x=value||{};
  const learning=x.learning||{};
  return {...cloneState(DEFAULTS),...x,
    profile:{...DEFAULTS.profile,...(x.profile||{})},
    preferences:{...DEFAULTS.preferences,...(x.preferences||{})},
    customScenarioActive:x.customScenarioActive||null,
    learning:{
      ...cloneState(DEFAULTS.learning),
      ...learning,
      lastPracticed:{...(learning.lastPracticed||{})},
      decisions:[...(learning.decisions||[])],
      delayedChecks:[...(learning.delayedChecks||[])],
      recoveryFollowups:[...(learning.recoveryFollowups||[])],
      scenarioHistory:[...(learning.scenarioHistory||[])]
    },
    content:{...DEFAULTS.content,...(x.content||{})},
    version:4
  };
}

export function loadState(storage=globalThis.localStorage){
  if(!storage) return cloneState(DEFAULTS);
  let parsed=null;
  try{ parsed=JSON.parse(storage.getItem(STORAGE_KEY)||storage.getItem(LEGACY_STORAGE_KEY)||'null'); }catch{}
  return parsed ? normalizeState(parsed) : cloneState(DEFAULTS);
}

export function saveState(state,storage=globalThis.localStorage){
  if(storage) storage.setItem(STORAGE_KEY,JSON.stringify(state));
  return state;
}
