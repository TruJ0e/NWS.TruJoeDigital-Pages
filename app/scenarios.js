import { weeklyEquivalent, activeSubscriptionsMonthly, scaledAmount } from './money.js';
import { createFictionalPaycheck } from './paycheck.js';
import { resolveScenarioDefinition } from '../content/scenario-schema.js';

export const SCENARIO_MODES = [
  {id:'baseline',label:'Baseline',skill:'core planning'},
  {id:'tight',label:'Tight budget',skill:'prioritization'},
  {id:'shock',label:'Unexpected expense',skill:'recovery and replanning'},
  {id:'irregular',label:'Irregular income',skill:'uncertainty'},
  {id:'reduced',label:'Reduced income',skill:'replanning after lower income'},
  {id:'seasonal',label:'Seasonal / future cost',skill:'forward planning'},
  {id:'responsibility',label:'Responsibility transfer',skill:'new recurring obligations'},
  {id:'paycheck',label:'First paycheck',skill:'gross vs take-home income'},
  {id:'custom',label:'Custom advisor scenario',skill:'locally configured practice'}
];

export function hashSeed(value){
  let h=2166136261>>>0;
  for(const ch of String(value)){ h^=ch.charCodeAt(0); h=Math.imul(h,16777619); }
  return h>>>0;
}

export function seededRandom(seed){
  let a=seed>>>0;
  return()=>{a+=0x6D2B79F5;let t=a;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296};
}

export function scenarioRandom(state){ return seededRandom(hashSeed(state.profile.scenarioSeed||'NWS-001')); }

export function scenarioStartAmount(state){
  const r=scenarioRandom(state),base=weeklyEquivalent(state.profile);
  if(state.profile.scenarioMode==='irregular') return Math.max(1,Math.round(base*(.55+r()*.55)));
  if(state.profile.scenarioMode==='tight') return Math.max(1,Math.round(base*.82));
  if(state.profile.scenarioMode==='reduced') return Math.max(1,Math.round(base*.70));
  if(state.profile.scenarioMode==='paycheck') return Math.max(1,Math.round(base*.82));
  return +base.toFixed(2);
}

export function buildResponsibilityTransferSequence(state){
  const phone=scaledAmount(state.profile,12);
  const transport=scaledAmount(state.profile,10);
  const seed=state.profile.scenarioSeed||'NWS-001';
  return [
    {
      period:1,
      id:'responsibility-preview',
      scaffold:'Teach',
      seed:`${seed}-RESP-1`,
      title:'Preview a new responsibility',
      text:`Starting next period, a ${phone} phone cost will become part of your own plan. Identify where it will fit before it is due.`,
      obligations:[{id:'transport',title:'Transportation',amount:transport,required:true}],
      transfer:false
    },
    {
      period:2,
      id:'responsibility-phone',
      scaffold:'Guide',
      seed:`${seed}-RESP-2`,
      title:'First period paying the phone cost',
      text:'The phone cost is now your responsibility. Protect required costs before flexible spending.',
      obligations:[{id:'transport',title:'Transportation',amount:transport,required:true},{id:'phone',title:'Phone',amount:phone,required:true}],
      transfer:false
    },
    {
      period:3,
      id:'responsibility-combined',
      scaffold:'Practice',
      seed:`${seed}-RESP-3`,
      title:'Manage multiple responsibilities',
      text:'The phone cost continues and another required expense occurs in the same period. Plan without automatic solution cues.',
      obligations:[{id:'transport',title:'Transportation',amount:transport,required:true},{id:'phone',title:'Phone',amount:phone,required:true},{id:'school',title:'Required school cost',amount:scaledAmount(state.profile,8),required:true}],
      transfer:false
    },
    {
      period:4,
      id:'responsibility-transfer-check',
      scaffold:'Simulate',
      seed:`${seed}-RESP-4`,
      title:'Novel responsibility-transfer check',
      text:'Use the same planning method with changed amounts and no automatic prompts. Help remains available if requested.',
      obligations:[{id:'transport',title:'Transportation',amount:scaledAmount(state.profile,11),required:true},{id:'phone',title:'Phone',amount:scaledAmount(state.profile,13),required:true}],
      transfer:true
    }
  ];
}

export function customScenarioMetadata(state){
  if(state.profile?.scenarioMode!=='custom'||!state.customScenarioActive) return null;
  const resolved=resolveScenarioDefinition(state.customScenarioActive,state);
  return resolved.valid?resolved.metadata:null;
}

export function buildScenarioEvents(state){
  if(state.profile?.scenarioMode==='custom'){
    const resolved=resolveScenarioDefinition(state.customScenarioActive,state);
    if(resolved.valid&&resolved.events.length) return resolved.events;
    return [{id:'custom-scenario-error',title:'Custom scenario not ready',amount:0,type:'info',skill:'weekly',text:'Return to Advisor → Scenarios and activate a valid scenario before starting this practice.',required:false}];
  }

  const r=scenarioRandom(state),jitter=()=>.9+r()*.2;
  const scale=base=>scaledAmount(state.profile,base);
  const events=[
    {id:'transport',title:'Transportation',amount:+((state.planned[0]?.amount||scale(10))*jitter()).toFixed(2),type:'need',text:'Transportation is required before your next income or refill.',required:true},
    {id:'friends',title:'Eat with friends',amount:Math.max(1,Math.round(scale(15)*jitter())),type:'want',text:'Friends invite you to eat out. Check what is still due before the next refill.'},
    {id:'subscription',title:'Subscription share',amount:+(activeSubscriptionsMonthly(state.subscriptions)/4.33).toFixed(2),type:'recurring',text:'Part of a monthly recurring cost belongs to this week even if the charge posts on another day.'},
    {id:'impulse',title:'Unplanned purchase',amount:Math.max(1,Math.round(scale(8)*jitter())),type:'want',text:'You see something you like that was not in your plan.'},
    {id:'save',title:'Choose an amount to save',amount:Math.max(1,Math.round(weeklyEquivalent(state.profile)*.10)),type:'save',text:'Choose a savings amount only after looking at required costs and near-term plans.'}
  ];
  if(state.profile.scenarioMode==='tight') events.splice(1,0,{id:'course',title:'Required course material',amount:scale(12),type:'need',text:'A required class item is due this week.',required:true});
  if(state.profile.scenarioMode==='shock'&&state.preferences.unexpected!=='disabled') events.splice(3,0,{id:'medical',title:'Unexpected prescription cost',amount:scale(20),type:'need',text:state.preferences.unexpected==='previewed'?'Previewed event: an unexpected prescription cost appears this week.':'An unexpected prescription cost appears this week.',required:true});
  if(state.profile.scenarioMode==='seasonal') events.splice(3,0,{id:'travel',title:'Travel home is approaching',amount:scale(18),type:'need',text:'A known future travel cost is approaching. Decide how much to protect now.',required:true});
  if(state.profile.scenarioMode==='responsibility') events.splice(2,0,{id:'phone',title:'Phone bill becomes your responsibility',amount:scale(12),type:'need',text:'Family support changed. A recurring phone cost is now part of your own plan.',required:true});
  if(state.profile.scenarioMode==='paycheck'){
    const statement=createFictionalPaycheck();
    events.unshift({id:'paycheck-info',title:'First paycheck: gross is not take-home',amount:0,type:'info',skill:'income',text:`Fictional statement: gross ${statement.gross.toFixed(2)}, deductions ${statement.deductionTotal.toFixed(2)}, take-home ${statement.takeHome.toFixed(2)}. Use take-home—not gross—as the amount actually available to budget.`,statement,required:false});
  }
  return events;
}
