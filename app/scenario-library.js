import { loadState, saveState } from './state.js';
import { validateScenarioDefinition, scenarioDefinitionFingerprint } from '../content/scenario-schema.js';

export const SCENARIO_LIBRARY_KEY = 'nwsScenarioLibrary.v1';
const MAX_DEFINITIONS = 60;
const MAX_RUN_RECORDS = 200;

function emptyLibrary(){ return {version:1,definitions:[],runRecords:[]}; }

function safeDefinitions(values=[]){
  const output=[];
  for(const value of values){
    const checked=validateScenarioDefinition(value);
    if(checked.valid) output.push(checked.definition);
  }
  return output;
}

export function loadScenarioLibrary(storage=globalThis.localStorage){
  if(!storage) return emptyLibrary();
  try{
    const parsed=JSON.parse(storage.getItem(SCENARIO_LIBRARY_KEY)||'null');
    return parsed&&parsed.version===1?{
      version:1,
      definitions:safeDefinitions(Array.isArray(parsed.definitions)?parsed.definitions:[]),
      runRecords:Array.isArray(parsed.runRecords)?parsed.runRecords:[]
    }:emptyLibrary();
  }catch{return emptyLibrary()}
}

export function saveScenarioLibrary(library,storage=globalThis.localStorage){
  const safe={version:1,definitions:safeDefinitions(library.definitions||[]).slice(-MAX_DEFINITIONS),runRecords:(library.runRecords||[]).slice(-MAX_RUN_RECORDS)};
  if(storage) storage.setItem(SCENARIO_LIBRARY_KEY,JSON.stringify(safe));
  return safe;
}

export function latestScenarioDefinitions(storage=globalThis.localStorage){
  const defs=loadScenarioLibrary(storage).definitions;
  const latest=new Map();
  for(const def of defs){
    const current=latest.get(def.scenarioId);
    if(!current||Number(def.revision)>Number(current.revision)) latest.set(def.scenarioId,def);
  }
  return [...latest.values()].sort((a,b)=>a.title.localeCompare(b.title));
}

export function scenarioVersions(scenarioId,storage=globalThis.localStorage){
  return loadScenarioLibrary(storage).definitions.filter(x=>x.scenarioId===scenarioId).sort((a,b)=>b.revision-a.revision);
}

export function saveNewScenarioRevision(input,storage=globalThis.localStorage){
  const firstCheck=validateScenarioDefinition(input);
  if(!firstCheck.valid) return {ok:false,errors:firstCheck.errors,definition:null};
  const library=loadScenarioLibrary(storage);
  const draft=firstCheck.definition;
  const prior=library.definitions.filter(x=>x.scenarioId===draft.scenarioId);
  draft.revision=prior.length?Math.max(...prior.map(x=>Number(x.revision)||1))+1:Math.max(1,Number(draft.revision)||1);
  const checked=validateScenarioDefinition(draft);
  if(!checked.valid) return {ok:false,errors:checked.errors,definition:null};
  const definition=checked.definition;
  library.definitions.push(definition);
  saveScenarioLibrary(library,storage);
  return {ok:true,errors:[],definition,fingerprint:scenarioDefinitionFingerprint(definition)};
}

export function importScenarioDefinition(input,storage=globalThis.localStorage){
  const checked=validateScenarioDefinition(input);
  if(!checked.valid) return {ok:false,errors:checked.errors,definition:null};
  const library=loadScenarioLibrary(storage);
  const def=checked.definition;
  const duplicate=library.definitions.some(x=>x.scenarioId===def.scenarioId&&x.revision===def.revision&&scenarioDefinitionFingerprint(x)===scenarioDefinitionFingerprint(def));
  if(!duplicate){
    const collision=library.definitions.some(x=>x.scenarioId===def.scenarioId&&x.revision===def.revision);
    if(collision) def.revision=Math.max(...library.definitions.filter(x=>x.scenarioId===def.scenarioId).map(x=>Number(x.revision)||1))+1;
    library.definitions.push(def);
    saveScenarioLibrary(library,storage);
  }
  return {ok:true,errors:[],definition:def,fingerprint:scenarioDefinitionFingerprint(def),duplicate};
}

export function activateScenarioDefinition(definition,{storage=globalThis.localStorage}={}){
  const checked=validateScenarioDefinition(definition);
  if(!checked.valid) return {ok:false,errors:checked.errors};
  const def=checked.definition;
  const state=loadState(storage);
  state.customScenarioActive=def;
  state.profile.scenarioMode='custom';
  state.profile.scenarioSeed=`CUSTOM-${def.scenarioId}-R${def.revision}`;
  state.currentScenarioEvents=[];
  state.activeResponsibilityPeriod=null;
  state.transferMode=false;
  saveState(state,storage);
  return {ok:true,definition:def,fingerprint:scenarioDefinitionFingerprint(def)};
}

export function clearActiveCustomScenario({storage=globalThis.localStorage}={}){
  const state=loadState(storage);
  state.customScenarioActive=null;
  if(state.profile.scenarioMode==='custom') state.profile.scenarioMode='baseline';
  state.currentScenarioEvents=[];
  saveState(state,storage);
  return state;
}

export function recordCustomScenarioRunFromState(state,storage=globalThis.localStorage){
  if(state.profile?.scenarioMode!=='custom'||!state.customScenarioActive) return null;
  const checked=validateScenarioDefinition(state.customScenarioActive);
  if(!checked.valid) return null;
  const last=(state.learning?.scenarioHistory||[]).at(-1);
  if(!last) return null;
  const def=checked.definition;
  const library=loadScenarioLibrary(storage);
  const record={
    sequence:(library.runRecords.at(-1)?.sequence||0)+1,
    scenarioId:def.scenarioId,
    revision:def.revision,
    schemaVersion:def.schemaVersion,
    fingerprint:scenarioDefinitionFingerprint(def),
    scaffold:last.scaffold||state.profile.scaffold||null,
    needsProtected:typeof last.protectedNeeds==='boolean'?last.protectedNeeds:null,
    hintsUsed:Number(last.hintsUsed)||0
  };
  library.runRecords.push(record);
  saveScenarioLibrary(library,storage);
  return record;
}

export function listCustomScenarioRunRecords(storage=globalThis.localStorage){
  return [...loadScenarioLibrary(storage).runRecords];
}

export function exportScenarioDefinition(definition){
  const checked=validateScenarioDefinition(definition);
  if(!checked.valid) return null;
  return JSON.stringify(checked.definition,null,2);
}
