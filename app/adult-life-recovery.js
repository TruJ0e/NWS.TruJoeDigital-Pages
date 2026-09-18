export const ADULT_LIFE_RECOVERY_VERSION = 1;
export const ADULT_LIFE_RECOVERY_SIM_VERSION = 2;

const recoveryChoice=(id,label,defensible,feedback)=>({id,label,defensible,feedback});

function definitionFor(outcome){
  const consequence='The original consequence stays in the simulation; recovery means updating the plan from the situation that now exists.';

  if(outcome.skill==='safety'){
    return {
      title:'Recover after an unsafe payment decision',
      prompt:'The risky action has already happened in the simulation. What is the strongest next response?',
      choices:[
        recoveryChoice('secure-replan','Stop further action, use an official contact to secure/check the account, then re-plan the remaining money',true,`This limits additional risk and updates the plan without pretending the earlier loss disappeared. ${consequence}`),
        recoveryChoice('keep-message','Keep using the same message thread because the first payment was already sent',false,'Continuing through the unverified contact can compound the original risk.'),
        recoveryChoice('send-more','Send more information or money to try to fix the first payment',false,'A second action through the same unverified channel can create another loss rather than recover from the first one.')
      ]
    };
  }

  if(outcome.skill==='credit'){
    return {
      title:'Recover after a borrowing mistake',
      prompt:'The simulated debt now exists. What should the next plan do?',
      choices:[
        recoveryChoice('debt-replan','Treat the full debt as an obligation, pause additional borrowing, and re-plan flexible spending around repayment',true,`The debt is not erased; it is made visible in the next plan so future choices can respond to it. ${consequence}`),
        recoveryChoice('minimum-only','Keep planning as though only the minimum payment exists',false,'Focusing only on a minimum payment continues to hide the full obligation.'),
        recoveryChoice('new-credit','Use more available credit so the current budget appears balanced',false,'Additional borrowing can increase the obligation instead of correcting the plan.')
      ]
    };
  }

  if(outcome.skill==='income'){
    return {
      title:'Recover after planning from unavailable income',
      prompt:'The plan used money that is not currently available. What should happen next?',
      choices:[
        recoveryChoice('current-money','Rebuild the plan from the money actually available now and move, reduce, or delay flexible items',true,`The correction uses current resources instead of assuming future income. ${consequence}`),
        recoveryChoice('assume-future','Keep the same plan and assume future income will arrive in time',false,'The original planning problem remains because future money is still being treated as current money.'),
        recoveryChoice('ignore-gap','Leave the gap unexplained and continue to the next purchase',false,'An unexplained shortfall makes later required costs harder to protect.')
      ]
    };
  }

  if(outcome.skill==='recurring'){
    return {
      title:'Recover after overlooking a recurring cost',
      prompt:'The recurring charge has already affected this period. What is the useful next step?',
      choices:[
        recoveryChoice('review-recurring','Add the recurring cost to the visible plan, review use/value, and decide intentionally whether to keep it next period',true,`The charge remains part of this period, but the next renewal becomes an intentional decision. ${consequence}`),
        recoveryChoice('ignore-renewal','Leave it automatic and do not include it in the next plan',false,'Ignoring the renewal preserves the same hidden recurring-cost problem.'),
        recoveryChoice('replace-service','Add another service before reviewing the current one',false,'Adding another recurring cost does not resolve the original planning gap.')
      ]
    };
  }

  return {
    title:'Re-plan after this decision',
    prompt:'The choice created a consequence. What is the strongest recovery process now?',
    choices:[
      recoveryChoice('replan-current','Recheck the current balance, remaining required costs, savings/debt consequences, and change what is still flexible',true,`Recovery starts from the updated situation and protects the next required function where possible. ${consequence}`),
      recoveryChoice('future-fix','Assume future income will fix the problem without changing the current plan',false,'Future income does not remove the need to update the current plan.'),
      recoveryChoice('ignore-consequence','Keep the plan unchanged and ignore the new consequence',false,'Ignoring the consequence prevents the plan from adapting to what actually happened.')
    ]
  };
}

export function enableAdultLifeRecovery(sim){
  if(!sim) return sim;
  sim.version=ADULT_LIFE_RECOVERY_SIM_VERSION;
  sim.recoveryPending=sim.recoveryPending||null;
  sim.recoveryHelpUsed=sim.recoveryHelpUsed||{};
  return sim;
}

export function queueAdultLifeRecovery(sim,outcome){
  if(!sim||!outcome||outcome.kind!=='decision'||outcome.defensible) return false;
  const definition=definitionFor(outcome);
  sim.recoveryPending={
    version:ADULT_LIFE_RECOVERY_VERSION,
    period:outcome.period,
    sourceDecisionId:outcome.decisionId,
    sourceChoiceId:outcome.choiceId,
    skill:outcome.skill,
    transfer:!!outcome.transfer,
    title:definition.title,
    prompt:definition.prompt,
    choices:definition.choices
  };
  return true;
}

export function currentAdultLifeRecovery(sim){ return sim?.recoveryPending||null; }

export function markAdultLifeRecoveryHelp(sim){
  const recovery=currentAdultLifeRecovery(sim);
  if(!recovery) return false;
  sim.recoveryHelpUsed ||= {};
  sim.recoveryHelpUsed[recovery.sourceDecisionId]=true;
  return true;
}

export function applyAdultLifeRecovery(sim,choiceId){
  const recovery=currentAdultLifeRecovery(sim);
  if(!recovery) return {ok:false,reason:'No recovery checkpoint is active.'};
  const selected=recovery.choices.find(x=>x.id===choiceId);
  if(!selected) return {ok:false,reason:'Unknown recovery choice.'};
  const prompted=!!sim.recoveryHelpUsed?.[recovery.sourceDecisionId];
  const outcome={
    kind:'recovery',
    period:recovery.period,
    sourceDecisionId:recovery.sourceDecisionId,
    sourceChoiceId:recovery.sourceChoiceId,
    skill:recovery.skill,
    choiceId:selected.id,
    choiceLabel:selected.label,
    defensible:!!selected.defensible,
    prompted,
    transfer:!!recovery.transfer,
    feedback:selected.feedback,
    balance:sim.balance,
    savings:sim.savings,
    debt:sim.debt,
    pendingCost:sim.pendingCost,
    missedRequired:sim.missedRequired
  };
  sim.history.push(outcome);
  sim.lastOutcome=outcome;
  if(selected.defensible) sim.recoveryPending=null;
  return {ok:true,outcome,recovered:!!selected.defensible};
}

export function adultLifeRecoverySummary(sim){
  const attempts=(sim?.history||[]).filter(x=>x?.kind==='recovery');
  const successful=attempts.filter(x=>x.defensible);
  return {
    attempts:attempts.length,
    successful:successful.length,
    independentSuccessful:successful.filter(x=>!x.prompted).length,
    pending:!!currentAdultLifeRecovery(sim)
  };
}
