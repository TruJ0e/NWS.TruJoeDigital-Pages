export function formatMoney(value){
  return new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(Number(value)||0);
}

export function weeklyEquivalent(profile){
  const amount=Number(profile.amount)||0;
  if(profile.cadence==='weekly') return amount;
  if(profile.cadence==='monthly') return amount/4.33;
  if(profile.cadence==='semester') return amount/16;
  return amount;
}

export function monthlyEquivalent(profile){
  const amount=Number(profile.amount)||0;
  if(profile.cadence==='weekly') return amount*4.33;
  if(profile.cadence==='monthly') return amount;
  if(profile.cadence==='semester') return (amount/16)*4.33;
  return amount*4.33;
}

export function cadenceUnit(profile){
  return ({weekly:'week',monthly:'month',semester:'semester',irregular:'refill'})[profile.cadence]||'period';
}

export function activeSubscriptionsMonthly(subscriptions=[]){
  return subscriptions.filter(s=>s.active).reduce((total,s)=>total+(Number(s.monthly)||0),0);
}

export function recurringForCurrentPeriod(state){
  const monthly=activeSubscriptionsMonthly(state.subscriptions);
  const cadence=state.profile.cadence;
  if(cadence==='weekly') return monthly/4.33;
  if(cadence==='monthly') return monthly;
  if(cadence==='semester') return monthly*3.7;
  return monthly/4.33;
}

export function spentByType(ledger=[],type){
  return Math.abs(ledger.filter(x=>x.type===type&&x.amount<0).reduce((a,x)=>a+x.amount,0));
}

export function savedInLedger(ledger=[]){
  return ledger.filter(x=>x.type==='save').reduce((a,x)=>a+x.amount,0);
}

export function savingsGoalPercent(profile){
  const target=Number(profile.shortGoal)||1;
  return Math.min(100,((Number(profile.savings)||0)/target)*100);
}

export function requiredOutstandingAmount(state){
  const scenario=(state.currentScenarioEvents||[]).filter(e=>e.required);
  const obligations=scenario.length?scenario:(state.planned||[]);
  return obligations.filter(p=>!state.completed['event:'+p.id]).reduce((a,p)=>a+(Number(p.amount)||0),0);
}

export function flexibleMoneyAvailable(state){
  return Math.max(0,(Number(state.profile.balance)||0)-requiredOutstandingAmount(state)-recurringForCurrentPeriod(state));
}

export function scaledAmount(profile,base){
  return Math.max(1,Math.round((Number(base)||0)*(weeklyEquivalent(profile)/50)));
}

export function goalContributionPerPeriod(goalAmount,alreadySaved,periodsRemaining){
  const periods=Math.max(1,Number(periodsRemaining)||1);
  return Math.max(0,(Number(goalAmount)||0)-(Number(alreadySaved)||0))/periods;
}

export function annualizedMonthlyCost(monthly){ return (Number(monthly)||0)*12; }
export function costPerUse(monthly,uses){ const n=Number(uses)||0; return n>0?(Number(monthly)||0)/n:null; }
