import { weeklyEquivalent } from '../app/money.js';

export const SCENARIO_SCHEMA_VERSION = 1;
export const CUSTOM_SCENARIO_SOURCE = 'advisor-local-custom';
export const MAX_SCENARIO_EVENTS = 12;

export const EVENT_TYPES = ['need','want','recurring','save','info'];
export const AMOUNT_RULES = ['fixed','weeklyPercent'];
export const SKILL_TAGS = ['weekly','needs','saving','recurring','sales','semester','income'];

const plain = (value,max=240) => String(value??'')
  .replace(/[<>]/g,' ')
  .replace(/[\u0000-\u001f\u007f]/g,' ')
  .replace(/\s+/g,' ')
  .trim()
  .slice(0,max);
const slug = value => plain(value,48).toLowerCase().replace(/[^a-z0-9_-]+/g,'-').replace(/^-+|-+$/g,'').slice(0,48);
const bounded = (value,min,max,fallback=min) => Math.min(max,Math.max(min,Number.isFinite(Number(value))?Number(value):fallback));

export function normalizeScenarioDefinition(input={}){
  const events=Array.isArray(input.events)?input.events.slice(0,MAX_SCENARIO_EVENTS):[];
  return {
    schemaVersion:SCENARIO_SCHEMA_VERSION,
    scenarioId:slug(input.scenarioId),
    revision:Math.max(1,Math.floor(bounded(input.revision,1,999,1))),
    title:plain(input.title,80),
    description:plain(input.description,320),
    source:CUSTOM_SCENARIO_SOURCE,
    createdFrom:plain(input.createdFrom||'advisor-builder',64),
    coreRoutine:'nws-decision-routine-v1',
    events:events.map((event,index)=>({
      id:slug(event.id)||`event-${index+1}`,
      title:plain(event.title,80),
      text:plain(event.text,320),
      type:EVENT_TYPES.includes(event.type)?event.type:'want',
      required:!!event.required,
      surprise:!!event.surprise,
      skill:SKILL_TAGS.includes(event.skill)?event.skill:null,
      amountRule:{
        kind:AMOUNT_RULES.includes(event.amountRule?.kind)?event.amountRule.kind:'fixed',
        value:bounded(event.amountRule?.value,0,10000,0)
      }
    }))
  };
}

export function validateScenarioDefinition(input={}){
  const def=normalizeScenarioDefinition(input);
  const errors=[];
  if(!slug(input.scenarioId)) errors.push('Scenario ID is required and may use letters, numbers, dashes, or underscores.');
  if(Number(input.schemaVersion??SCENARIO_SCHEMA_VERSION)!==SCENARIO_SCHEMA_VERSION) errors.push(`Scenario schema version must be ${SCENARIO_SCHEMA_VERSION}.`);
  if(!def.title||def.title.length<3) errors.push('Scenario title must be at least 3 characters.');
  if(!Array.isArray(input.events)||input.events.length<1) errors.push('Add at least one event.');
  if(Array.isArray(input.events)&&input.events.length>MAX_SCENARIO_EVENTS) errors.push(`Use no more than ${MAX_SCENARIO_EVENTS} events.`);

  const ids=new Set();
  def.events.forEach((event,index)=>{
    const raw=input.events?.[index]||{};
    if(raw.type!=null&&!EVENT_TYPES.includes(raw.type)) errors.push(`Event ${index+1} uses an unsupported type.`);
    if(raw.amountRule?.kind!=null&&!AMOUNT_RULES.includes(raw.amountRule.kind)) errors.push(`Event ${index+1} uses an unsupported amount rule.`);
    if(raw.skill!=null&&raw.skill!==''&&!SKILL_TAGS.includes(raw.skill)) errors.push(`Event ${index+1} uses an unsupported skill tag.`);
    if(!event.title) errors.push(`Event ${index+1} needs a title.`);
    if(ids.has(event.id)) errors.push(`Event IDs must be unique: ${event.id}.`);
    ids.add(event.id);
    if((event.type==='want'||event.type==='save'||event.type==='info')&&event.required) errors.push(`${event.title||`Event ${index+1}`} cannot be marked required when type is ${event.type}.`);
    if(event.type==='info'&&event.amountRule.value!==0) errors.push(`${event.title||`Event ${index+1}`} must use amount 0 because it is informational.`);
    if(event.amountRule.kind==='weeklyPercent'&&event.amountRule.value>200) errors.push(`${event.title||`Event ${index+1}`} cannot exceed 200% of the weekly-equivalent budget.`);
  });
  return {valid:errors.length===0,errors,definition:def};
}

export function scenarioDefinitionFingerprint(input){
  const def=normalizeScenarioDefinition(input);
  const stable=JSON.stringify(def);
  let h=2166136261>>>0;
  for(const ch of stable){h^=ch.charCodeAt(0);h=Math.imul(h,16777619)}
  return `fnv1a32-${(h>>>0).toString(16).padStart(8,'0')}`;
}

export function resolveScenarioDefinition(input,state){
  const checked=validateScenarioDefinition(input);
  if(!checked.valid) return {valid:false,errors:checked.errors,events:[],metadata:null};
  const def=checked.definition;
  const weekly=weeklyEquivalent(state.profile);
  const events=def.events
    .filter(event=>!(event.surprise&&state.preferences?.unexpected==='disabled'))
    .map(event=>{
      const amount=event.type==='info'?0:event.amountRule.kind==='weeklyPercent'
        ? +(weekly*(event.amountRule.value/100)).toFixed(2)
        : +event.amountRule.value.toFixed(2);
      const previewPrefix=event.surprise&&state.preferences?.unexpected==='previewed'?'Previewed event: ':'';
      return {
        id:`custom-${def.scenarioId}-${event.id}`,
        title:event.title,
        text:`${previewPrefix}${event.text}`.trim(),
        type:event.type,
        amount,
        required:event.required,
        skill:event.skill,
        customScenario:true
      };
    });
  return {
    valid:true,
    errors:[],
    events,
    metadata:{
      source:CUSTOM_SCENARIO_SOURCE,
      scenarioId:def.scenarioId,
      revision:def.revision,
      schemaVersion:def.schemaVersion,
      fingerprint:scenarioDefinitionFingerprint(def),
      coreRoutine:def.coreRoutine
    }
  };
}
