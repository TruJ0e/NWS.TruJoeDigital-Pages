export const RECOVERY_RETENTION_INTERVAL_DAYS = [7, 21];

const choice=(id,label,correct,feedback)=>({id,label,correct,feedback});

export const RECOVERY_PROBES = [
  {
    id:'income-gap',skill:'income',title:'Recover after lower income',
    prompt:'You planned from your usual income, but less money actually arrived. What is the strongest recovery move?',
    choices:[
      choice('rebuild-current','Rebuild the plan from the money actually available now and adjust what is still flexible',true,'Recovery uses the current situation instead of pretending the missing income is already available.'),
      choice('keep-plan','Keep the original plan because the usual income normally arrives',false,'The original plan still depends on money that is not currently available.'),
      choice('future-money','Count the next income event now so the plan balances',false,'Future income is still not current available money.')
    ]
  },
  {
    id:'recurring-renewal',skill:'recurring',title:'Recover after a hidden recurring charge',
    prompt:'A subscription renewed after you already planned the period. What is the strongest recovery move?',
    choices:[
      choice('show-and-review','Add the charge to the current plan, recheck flexible spending, and review whether to keep the next renewal',true,'The current charge stays visible and the next renewal becomes an intentional decision.'),
      choice('ignore-renewal','Ignore it because the charge already happened',false,'Ignoring the charge leaves the same planning gap in place.'),
      choice('add-service','Add a different subscription before reviewing this one',false,'Another recurring cost does not repair the original budget gap.')
    ]
  },
  {
    id:'unsafe-payment',skill:'safety',title:'Recover after an unsafe payment',
    prompt:'You sent money through an urgent message before verifying it. What is the strongest recovery move?',
    choices:[
      choice('secure-verify-replan','Stop further action, verify through an official channel, secure the account if needed, and re-plan the remaining money',true,'Recovery limits additional risk and updates the plan without erasing the loss that already occurred.'),
      choice('continue-thread','Keep using the same message thread because the first payment was already sent',false,'Continuing through the same unverified channel can compound the original risk.'),
      choice('send-more','Send more money or information to try to fix the first payment',false,'A second unverified action can create another loss.')
    ]
  },
  {
    id:'credit-overreach',skill:'credit',title:'Recover after borrowing too much',
    prompt:'You used credit after treating the minimum payment as the full cost. The larger debt now exists. What is the strongest recovery move?',
    choices:[
      choice('full-debt-visible','Make the full debt visible, pause additional borrowing, and revise flexible spending around repayment',true,'Recovery starts from the actual debt rather than the minimum-payment illusion.'),
      choice('minimum-only','Keep budgeting as though only the minimum payment exists',false,'That preserves the same incomplete view of the obligation.'),
      choice('new-credit','Use more credit so the current budget looks balanced',false,'Additional borrowing can deepen the original problem.')
    ]
  },
  {
    id:'transport-shortfall',skill:'transportation',title:'Recover after missing transportation money',
    prompt:'Flexible spending left you short for transportation needed for class or work. What is the strongest recovery move?',
    choices:[
      choice('protect-access','Recheck the current balance and options, protect required access, and reduce or delay what is still flexible',true,'Recovery protects the required function from the situation that now exists.'),
      choice('ignore-access','Keep the remaining flexible plan unchanged and hope transportation works out',false,'The required access problem remains unresolved.'),
      choice('assume-help','Assume someone else will cover transportation without confirming it',false,'Unconfirmed support is not a reliable repair plan.')
    ]
  },
  {
    id:'utility-variation',skill:'utilities',title:'Recover after underbudgeting a utility bill',
    prompt:'The utility bill is higher than the amount you planned. What is the strongest recovery move?',
    choices:[
      choice('update-required','Update the required amount, recheck the current balance, and change flexible items before dropping another required cost',true,'The changed bill becomes visible and the remaining plan is adjusted around it.'),
      choice('pretend-low','Keep using the lower estimate because it was the original plan',false,'The actual bill still has to be accounted for.'),
      choice('skip-other-need','Automatically skip another required expense without comparing options',false,'Moving the shortfall to another required obligation is not a complete re-plan.')
    ]
  },
  {
    id:'food-access',skill:'food',title:'Recover after a food-planning mistake',
    prompt:'A bulk purchase used more money than planned and some of the food will not work for the next few days. What is the strongest recovery move?',
    choices:[
      choice('inventory-replan','Check what is actually usable, protect the next food need, and adjust remaining flexible spending',true,'Recovery starts with the usable food and money that remain now.'),
      choice('buy-more-bulk','Buy more of the same sale items because the unit price is low',false,'A lower unit price does not solve the access/use problem.'),
      choice('skip-food','Skip required food access only to preserve the displayed balance',false,'The financial display should not override a required function.')
    ]
  },
  {
    id:'housing-bundle',skill:'housing',title:'Recover after missing part of housing cost',
    prompt:'You protected rent but forgot a required housing-related utility or fee. What is the strongest recovery move?',
    choices:[
      choice('bundle-visible','Add the missing required cost to the current bundle and re-plan what is still flexible',true,'Recovery uses the complete housing responsibility rather than the headline rent alone.'),
      choice('ignore-fee','Ignore the additional cost because rent was already protected',false,'The additional required cost remains unresolved.'),
      choice('future-cover','Assume next month will cover it without changing the current plan',false,'Future money does not remove the current obligation.')
    ]
  },
  {
    id:'health-shock',skill:'health-costs',title:'Recover after an unexpected health cost',
    prompt:'An unexpected necessary health cost appears after most of the period is planned. What is the strongest recovery process?',
    choices:[
      choice('recheck-sources','Recheck available money, remaining required costs, savings, and borrowing consequences before choosing a source',true,'Recovery compares the updated situation instead of using one automatic funding rule.'),
      choice('always-credit','Always use credit for an unexpected cost',false,'Credit may be one option, but it is not automatically the best source in every situation.'),
      choice('ignore-cost','Ignore the known necessary cost and continue the old plan unchanged',false,'The known cost remains part of the situation even if the plan ignores it.')
    ]
  },
  {
    id:'combined-plan',skill:'weekly',title:'Recover after several small planning errors',
    prompt:'Several small choices left less money than expected while required costs remain. What is the strongest recovery process?',
    choices:[
      choice('rebuild-priorities','List what is still required, use the balance that actually remains, then change what is still flexible',true,'Recovery rebuilds the plan from current facts and remaining obligations.'),
      choice('keep-original','Keep the original flexible plan because each earlier choice was small',false,'Several small consequences can still change what the current plan can support.'),
      choice('count-future','Count expected future income so the current plan appears to fit',false,'Future money is not current available money.')
    ]
  }
];

function hash(text=''){
  let h=2166136261;
  for(const c of String(text)){
    h^=c.charCodeAt(0);
    h=Math.imul(h,16777619);
  }
  return h>>>0;
}

export function recoveryProbeById(id){ return RECOVERY_PROBES.find(x=>x.id===id)||null; }

export function selectRecoveryProbe({sourceSkill='',phase='transfer',stage=0,avoidProbeIds=[]}={}){
  let eligible=RECOVERY_PROBES.filter(x=>x.skill!==sourceSkill&&!avoidProbeIds.includes(x.id));
  if(!eligible.length) eligible=RECOVERY_PROBES.filter(x=>!avoidProbeIds.includes(x.id));
  if(!eligible.length) eligible=RECOVERY_PROBES;
  return eligible[hash(`${sourceSkill}|${phase}|${stage}`)%eligible.length];
}

export function evaluateRecoveryProbe(probeId,choiceId){
  const probe=recoveryProbeById(probeId);
  const selected=probe?.choices.find(x=>x.id===choiceId)||null;
  return selected?{probe,selected,correct:!!selected.correct}:null;
}
