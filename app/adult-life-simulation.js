import { scaledAmount, weeklyEquivalent } from './money.js';
import { hashSeed, seededRandom } from './scenarios.js';

export const ADULT_LIFE_SIM_VERSION = 1;
export const ADULT_LIFE_SIM_MODE = 'adult-life-multiperiod';

const round=value=>Math.round((Number(value)||0)*100)/100;
const clamp0=value=>Math.max(0,round(value));
const choice=(id,label,defensible,feedback,effect={})=>({id,label,defensible,feedback,effect});
const decision=(id,skill,title,prompt,choices)=>({id,skill,title,prompt,choices});

export function buildAdultLifeSimulationPlan(state){
  const seed=state.profile?.scenarioSeed||'NWS-001';
  const random=seededRandom(hashSeed(`${seed}-ADULT-LIFE-V20`));
  const scale=base=>scaledAmount(state.profile,base);
  const variable=(base,spread=.14)=>Math.max(1,Math.round(scale(base)*(1-spread+random()*spread*2)));
  const normalIncome=Math.max(1,round(weeklyEquivalent(state.profile)));
  const reducedIncome=Math.max(1,round(normalIncome*.72));
  const irregularIncome=Math.max(1,round(normalIncome*(.62+random()*.48)));

  const housing=variable(18,.08),utilities=variable(5,.18),food=variable(9,.12),transport=variable(7,.12);
  const health=variable(15,.12),repair=variable(13,.12),want=variable(12,.12),scamLoss=variable(14,.08);

  return [
    {
      period:1,id:'housing-foundation',title:'Set up the recurring plan',income:normalIncome,transfer:false,
      summary:'Housing and utilities enter the plan before flexible spending.',
      decisions:[
        decision('housing-bundle','housing','Housing bundle',`Housing is ${housing} and the lease also makes you responsible for ${utilities} of utilities. What should the plan protect?`,[
          choice('bundle',`Protect housing + utilities (${housing+utilities})`,true,'The recurring housing decision uses the full responsibility bundle, not rent alone.',{spend:housing+utilities,protected:2}),
          choice('rent-only',`Protect housing only (${housing})`,false,'The displayed rent is not the whole recurring responsibility when the lease assigns utilities to you.',{spend:housing,missedRequired:1,futureCost:utilities}),
          choice('want-first',`Spend ${want} on an optional purchase first`,false,'Flexible spending can wait until known required housing costs are protected.',{spend:want,missedRequired:2,futureCost:housing+utilities})
        ]),
        decision('food-plan','food','Food planning',`You still need food before the next income event. Which process best protects use and reduces avoidable waste?`,[
          choice('inventory',`Check what you have, then spend about ${food} on missing items`,true,'Inventory-first planning connects spending to food that will actually be used.',{spend:food,protected:1}),
          choice('sale-bulk',`Spend ${food+scale(5)} on the largest sale packages`,false,'A lower unit price is not automatically a better result if food will not be used or stored safely.',{spend:food+scale(5)}),
          choice('skip-food','Skip food spending to keep the balance higher',false,'Required food access should not be treated as optional simply to preserve the displayed balance.',{missedRequired:1,futureCost:food})
        ])
      ]
    },
    {
      period:2,id:'reduced-income',title:'Replan after lower income',income:reducedIncome,transfer:false,
      summary:'The available income is lower this period, so the plan must use the amount actually available.',
      decisions:[
        decision('income-replan','income','Reduced income',`This period provides ${reducedIncome}, lower than the usual ${normalIncome}. Which amount should drive this period's plan?`,[
          choice('actual',`Use the ${reducedIncome} actually available`,true,'Planning from money that is actually available prevents spending anticipated income before it arrives.',{}),
          choice('usual',`Plan from the usual ${normalIncome}`,false,'The normal amount is useful context, but it is not available money this period.',{futureCost:scale(6)}),
          choice('future','Include the next period too',false,'Future income should not be spent as though it is already available.',{futureCost:scale(7)})
        ]),
        decision('transport-protect','transportation','Transportation access',`Transportation needed for class/work costs about ${transport}. What should happen before optional spending?`,[
          choice('transport',`Protect transportation (${transport})`,true,'Protecting required transportation first keeps the plan connected to class/work access.',{spend:transport,protected:1}),
          choice('optional',`Use ${want} for an optional purchase first`,false,'The optional purchase can reduce money needed for a known transportation responsibility.',{spend:want,missedRequired:1,futureCost:transport}),
          choice('assume-ride','Assume someone else will provide a ride',false,'A plan should not silently replace a required cost with support that has not been confirmed.',{missedRequired:1})
        ])
      ]
    },
    {
      period:3,id:'health-event',title:'Handle an unexpected health cost',income:normalIncome,transfer:false,
      summary:'An unexpected covered health cost appears while ordinary required costs continue.',
      decisions:[
        decision('health-cost','health-costs','Unexpected health cost',`A necessary health expense of ${health} appears. Which responses can be financially defensible?`,[
          choice('balance',`Use available spending money if required costs remain protected`,true,'Using available money can be reasonable when it does not displace more urgent required costs.',{spend:health,protected:1}),
          choice('savings',`Use up to ${health} from emergency savings`,true,'Emergency savings can be used for an actual unexpected necessary cost; the consequence is lower savings afterward.',{savingsSpend:health,protected:1}),
          choice('ignore','Ignore the necessary cost and hope it disappears',false,'Ignoring a known necessary cost does not remove the obligation and can create a larger later problem.',{missedRequired:1,futureCost:health+scale(4)})
        ]),
        decision('utility-variation','utilities','Variable utility cost',`The utility cost is higher than last period. What planning method fits a variable required bill?`,[
          choice('estimate-buffer',`Use the current amount and preserve a small buffer (${utilities+scale(2)})`,true,'Variable required costs still belong in the plan; history/estimates plus a buffer make variation visible.',{spend:utilities+scale(2),protected:1}),
          choice('lowest',`Budget only the lowest utility amount (${Math.max(1,utilities-scale(2))})`,false,'Using only the lowest observed bill hides predictable variation.',{spend:Math.max(1,utilities-scale(2)),futureCost:scale(4)}),
          choice('omit','Leave utilities out because the amount changes',false,'Variable does not mean optional.',{missedRequired:1,futureCost:utilities})
        ])
      ]
    },
    {
      period:4,id:'credit-pressure',title:'Evaluate borrowing and recurring pressure',income:normalIncome,transfer:false,
      summary:'A tempting purchase and recurring costs compete with the same limited money.',
      decisions:[
        decision('credit-choice','credit','Credit decision',`An optional ${want+scale(6)} purchase can go on a card with a small minimum payment. What should you recognize first?`,[
          choice('total-debt','Treat the full purchase as debt and compare repayment/other obligations before deciding',true,'The minimum payment is not the total purchase cost. Borrowing changes timing, not the amount owed.',{}),
          choice('minimum-only',`Treat only the minimum payment as the purchase cost`,false,'A minimum payment does not make the rest of the debt disappear.',{debt:want+scale(6)}),
          choice('income','Treat the credit limit as extra income',false,'Borrowing capacity is not earned income or savings.',{debt:want+scale(8)})
        ]),
        decision('recurring-choice','recurring','Recurring service',`A recurring service costs ${scale(4)} this period and has barely been used. What is the useful comparison?`,[
          choice('review-use',`Compare cost, actual use, personal value, and what keeping it delays`,true,'Recurring decisions combine cost with actual use and personal value; cheapest is not automatically the only valid goal.',{spend:scale(4)}),
          choice('ignore-renewal','Ignore it because the charge is automatic',false,'Automatic renewal is still a real recurring cost in the plan.',{spend:scale(4),futureCost:scale(4)}),
          choice('keep-always','Keep every subscription permanently because cancellation is inconvenient',false,'Convenience can matter, but recurring costs still deserve intentional review.',{spend:scale(4),futureCost:scale(4)})
        ])
      ]
    },
    {
      period:5,id:'safety-repair',title:'Protect against fraud and a transport disruption',income:irregularIncome,transfer:false,
      summary:'Income varies and two different risks appear: an urgent payment request and a transportation repair.',
      decisions:[
        decision('scam-verify','safety','Urgent payment message',`A message says your utility will be shut off today unless you send ${scamLoss} through a new payment link. What should happen first?`,[
          choice('verify','Verify through the known utility site, bill, or phone number before paying',true,'Independent verification protects against urgency-based payment scams.',{}),
          choice('pay-link',`Pay ${scamLoss} through the message link`,false,'The payment path came from the unverified message, so urgency is driving a hard-to-reverse action.',{spend:scamLoss,scamLoss}),
          choice('send-info','Reply with account/security information',false,'Sensitive information should not be sent to an unverified contact.',{scamLoss:scale(3)})
        ]),
        decision('transport-repair','transportation','Transportation disruption',`A required transportation repair/access alternative costs ${repair}. What should the plan consider?`,[
          choice('balance',`Use available money if the remaining required costs still fit`,true,'Required transportation can be paid from available money when the remaining plan still works.',{spend:repair,protected:1}),
          choice('savings',`Use emergency savings if available`,true,'Emergency savings can reasonably support an unexpected required transportation cost.',{savingsSpend:repair,protected:1}),
          choice('ignore','Ignore the disruption even though class/work access depends on it',false,'Ignoring the known access problem leaves a required function unresolved.',{missedRequired:1,futureCost:repair})
        ])
      ]
    },
    {
      period:6,id:'integrated-transfer',title:'Independent-life transfer check',income:normalIncome,transfer:true,
      summary:'Amounts and combinations change. Apply the same decision process without automatic solution cues.',
      decisions:[
        decision('integrated-plan','weekly','Combined obligations',`This period combines housing ${housing+scale(2)}, utilities ${utilities+scale(1)}, food ${food}, and transportation ${transport+scale(1)}. What is the first planning move?`,[
          choice('protect-known','List/protect the known required bundle before deciding what is flexible',true,'The same NWS routine transfers to a larger combined responsibility set.',{spend:housing+scale(2)+utilities+scale(1)+food+transport+scale(1),protected:4}),
          choice('flex-first',`Choose flexible spending first and fit the required costs around it`,false,'Known required costs become harder to protect when flexibility is allocated first.',{spend:want,missedRequired:2,futureCost:utilities+transport}),
          choice('future-income','Use expected future income to make the current plan balance',false,'Future income is not current available money.',{futureCost:scale(8)})
        ]),
        decision('integrated-shock','health-costs','Changed unexpected cost',`A smaller unexpected health cost of ${Math.max(1,health-scale(4))} appears after the required bundle. What should guide the response?`,[
          choice('replan','Recheck current balance, remaining obligations, savings, and borrowing consequences before choosing a source',true,'Replanning from the updated state is the transferable skill; there is not one universal funding source.',{}),
          choice('credit-default','Always use credit for unexpected costs',false,'Credit may be one tool, but it is not automatically the best source in every situation.',{debt:Math.max(1,health-scale(4))}),
          choice('skip-required','Skip a different required cost automatically',false,'Moving a problem to another required obligation is not a complete replan.',{missedRequired:1})
        ])
      ]
    }
  ];
}

export function createAdultLifeSimulation(state){
  const periods=buildAdultLifeSimulationPlan(state);
  return {
    version:ADULT_LIFE_SIM_VERSION,
    mode:ADULT_LIFE_SIM_MODE,
    seed:state.profile?.scenarioSeed||'NWS-001',
    status:'active',
    periodIndex:0,
    decisionIndex:0,
    balance:0,
    savings:clamp0(state.profile?.savings),
    debt:0,
    pendingCost:0,
    missedRequired:0,
    protectedRequired:0,
    scamLoss:0,
    helpUsed:{},
    history:[],
    lastOutcome:null,
    periods
  };
}

export function currentAdultLifePeriod(sim){ return sim?.periods?.[sim.periodIndex]||null; }
export function currentAdultLifeDecision(sim){ return currentAdultLifePeriod(sim)?.decisions?.[sim.decisionIndex]||null; }
export function adultLifePeriodComplete(sim){
  const period=currentAdultLifePeriod(sim);
  return !!period && sim.decisionIndex>=period.decisions.length;
}
export function adultLifeSimulationComplete(sim){ return sim?.status==='complete'; }

export function beginAdultLifePeriod(sim){
  const period=currentAdultLifePeriod(sim);
  if(!period||sim.periodStarted)return sim;
  const carry=sim.balance;
  const pending=sim.pendingCost;
  sim.balance=round(carry+period.income-pending);
  sim.pendingCost=0;
  sim.periodStarted=true;
  sim.lastOutcome={kind:'period-start',text:`Period ${period.period} added ${period.income} of simulated income/refill${pending?` and applied ${pending} of carried cost`:''}.`};
  return sim;
}

export function applyAdultLifeChoice(sim,choiceId){
  const period=currentAdultLifePeriod(sim),item=currentAdultLifeDecision(sim);
  if(!period||!item) return {ok:false,reason:'No current decision.'};
  const selected=item.choices.find(x=>x.id===choiceId);
  if(!selected) return {ok:false,reason:'Unknown choice.'};
  const effect=selected.effect||{};
  const spend=Number(effect.spend)||0;
  const savingsSpend=Number(effect.savingsSpend)||0;
  const fromSavings=Math.min(sim.savings,savingsSpend);
  const savingsShortfall=Math.max(0,savingsSpend-fromSavings);
  sim.balance=round(sim.balance-spend);
  sim.savings=clamp0(sim.savings-fromSavings);
  sim.debt=clamp0(sim.debt+(Number(effect.debt)||0)+savingsShortfall);
  sim.pendingCost=clamp0(sim.pendingCost+(Number(effect.futureCost)||0));
  sim.missedRequired=Math.max(0,sim.missedRequired+(Number(effect.missedRequired)||0));
  sim.protectedRequired=Math.max(0,sim.protectedRequired+(Number(effect.protected)||0));
  sim.scamLoss=clamp0(sim.scamLoss+(Number(effect.scamLoss)||0));
  const prompted=!!sim.helpUsed[item.id];
  const outcome={
    kind:'decision',period:period.period,periodId:period.id,decisionId:item.id,skill:item.skill,
    choiceId:selected.id,choiceLabel:selected.label,defensible:!!selected.defensible,prompted,
    transfer:!!period.transfer,feedback:selected.feedback,
    balance:sim.balance,savings:sim.savings,debt:sim.debt,pendingCost:sim.pendingCost,missedRequired:sim.missedRequired
  };
  sim.history.push(outcome);
  sim.lastOutcome=outcome;
  sim.decisionIndex++;
  return {ok:true,outcome,periodComplete:adultLifePeriodComplete(sim)};
}

export function markAdultLifeHelp(sim){
  const item=currentAdultLifeDecision(sim);
  if(!item)return false;
  sim.helpUsed[item.id]=true;
  return true;
}

export function advanceAdultLifePeriod(sim){
  if(!adultLifePeriodComplete(sim))return {ok:false,reason:'Finish the current period first.'};
  const period=currentAdultLifePeriod(sim);
  sim.history.push({kind:'period-summary',period:period.period,periodId:period.id,balance:sim.balance,savings:sim.savings,debt:sim.debt,pendingCost:sim.pendingCost,missedRequired:sim.missedRequired});
  if(sim.periodIndex>=sim.periods.length-1){
    sim.status='complete';
    sim.periodStarted=false;
    sim.lastOutcome={kind:'complete',text:'Multi-period simulation completed.'};
    return {ok:true,complete:true};
  }
  sim.periodIndex++;
  sim.decisionIndex=0;
  sim.periodStarted=false;
  sim.lastOutcome=null;
  beginAdultLifePeriod(sim);
  return {ok:true,complete:false,period:currentAdultLifePeriod(sim)};
}

export function adultLifeSimulationSummary(sim){
  const decisions=(sim?.history||[]).filter(x=>x.kind==='decision');
  const defensible=decisions.filter(x=>x.defensible).length;
  const independent=decisions.filter(x=>x.defensible&&!x.prompted).length;
  const transfer=decisions.filter(x=>x.transfer);
  return {
    decisions:decisions.length,
    defensible,
    independent,
    transferAttempts:transfer.length,
    transferDefensible:transfer.filter(x=>x.defensible).length,
    endingBalance:round(sim?.balance),
    endingSavings:round(sim?.savings),
    debt:round(sim?.debt),
    carriedCost:round(sim?.pendingCost),
    missedRequired:Number(sim?.missedRequired)||0,
    protectedRequired:Number(sim?.protectedRequired)||0,
    scamLoss:round(sim?.scamLoss)
  };
}
