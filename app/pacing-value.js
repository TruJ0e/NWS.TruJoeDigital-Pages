const money = value => Math.round((Number(value) + Number.EPSILON) * 100) / 100;
const nonnegative = value => Math.max(0, Number(value) || 0);
const clamp = (value,min,max) => Math.min(max,Math.max(min,Number(value)||0));

export function calculatePacing({available=0,periods=1,reservedNeeds=0,protectedSavings=0}={}){
  const total = nonnegative(available);
  const count = Math.max(1, Math.floor(nonnegative(periods) || 1));
  const needs = nonnegative(reservedNeeds);
  const savings = nonnegative(protectedSavings);
  const safePool = money(Math.max(0,total-needs-savings));
  return {available:money(total),periods:count,reservedNeeds:money(needs),protectedSavings:money(savings),safePool,perPeriod:money(safePool/count),overcommitted:needs+savings>total};
}

export function calculateMoneyPacing({available=0,periods=1,periodsElapsed=0,flexibleSpent=0,reservedNeeds=0,protectedSavings=0}={}){
  const base=calculatePacing({available,periods,reservedNeeds,protectedSavings});
  const elapsed=Math.floor(clamp(periodsElapsed,0,base.periods));
  const spent=money(nonnegative(flexibleSpent));
  const remainingPeriods=Math.max(0,base.periods-elapsed);
  const expectedSpent=money(base.safePool*(elapsed/base.periods));
  const remainingFlexible=money(Math.max(0,base.safePool-spent));
  const newPerPeriod=remainingPeriods>0?money(remainingFlexible/remainingPeriods):0;
  const variance=money(expectedSpent-spent);
  const tolerance=money(Math.max(1,base.perPeriod*0.05));
  const status=variance>tolerance?'ahead':variance<-tolerance?'behind':'on-pace';
  const overspentFlexible=money(Math.max(0,spent-base.safePool));
  const currentBalance=money(Math.max(0,base.available-spent));
  return {...base,periodsElapsed:elapsed,remainingPeriods,flexibleSpent:spent,expectedSpent,remainingFlexible,safeToSpendNow:remainingFlexible,currentBalance,newPerPeriod,variance,tolerance,status,overspentFlexible};
}

export function recoveryPlan(result={}){
  const status=result?.status||'on-pace';
  if(result?.overcommitted) return {level:'required-change',headline:'The plan is overcommitted.',actions:['Protect required costs first.','Reduce or delay flexible spending.','Review the savings target only if its timing or purpose can safely change.','Do not solve the gap by pretending future income has already arrived.']};
  if(result?.overspentFlexible>0) return {level:'required-change',headline:`Flexible spending is $${money(result.overspentFlexible).toFixed(2)} above the safe pool.`,actions:['Stop new flexible spending until required costs are protected.','Recalculate from money and time that remain.','Move or delay Wants before taking money from a required Need.','If the gap cannot be closed, identify the real shortfall instead of hiding it.']};
  if(status==='behind') return {level:'adjust',headline:`Spending is $${money(Math.abs(result.variance||0)).toFixed(2)} behind the planned pace.`,actions:[`Use the new pace of $${money(result.newPerPeriod||0).toFixed(2)} per remaining period.`,'Pause, reduce, or delay flexible Wants first.','Keep future Needs visible instead of using their money to make the balance look larger.','Recalculate again whenever a major expense or income event changes the plan.']};
  if(status==='ahead') return {level:'stable',headline:`Spending is $${money(Math.abs(result.variance||0)).toFixed(2)} ahead of pace.`,actions:['Keep the lower spending pace if it is realistic.','Do not treat the extra room as permission to spend all of it immediately.','Recheck upcoming Needs and savings jobs before increasing flexible spending.']};
  return {level:'stable',headline:'Spending is on pace.',actions:[`Continue near $${money(result.newPerPeriod ?? result.perPeriod ?? 0).toFixed(2)} per remaining period.`,'Recalculate when the money, time, or required costs change.']};
}

export function recalculatePace({remaining=0,periodsRemaining=1}={}){
  const cash = nonnegative(remaining);
  const periods = Math.max(1,Math.floor(nonnegative(periodsRemaining)||1));
  return {remaining:money(cash),periodsRemaining:periods,perPeriod:money(cash/periods)};
}

export function calculateIrregularPlan({cash=0,requiredBeforeNextIncome=0,buffer=0}={}){
  const total=nonnegative(cash), required=nonnegative(requiredBeforeNextIncome), reserve=nonnegative(buffer);
  const flexible=money(Math.max(0,total-required-reserve));
  return {cash:money(total),required:money(required),buffer:money(reserve),flexible,overcommitted:required+reserve>total};
}

export function unitValue({price=0,units=0,usableUnits=null}={}){
  const cost=nonnegative(price), listed=nonnegative(units), usable=usableUnits==null?listed:nonnegative(usableUnits);
  return {price:money(cost),units:listed,usableUnits:usable,listedUnitCost:listed>0?money(cost/listed):null,usableUnitCost:usable>0?money(cost/usable):null};
}

export function compareUnitValue(a,b){
  const left=unitValue(a), right=unitValue(b);
  if(left.usableUnitCost==null||right.usableUnitCost==null) return {left,right,better:null,savingsPerUsedUnit:null};
  const diff=money(Math.abs(left.usableUnitCost-right.usableUnitCost));
  return {left,right,better:left.usableUnitCost===right.usableUnitCost?'tie':left.usableUnitCost<right.usableUnitCost?'left':'right',savingsPerUsedUnit:diff};
}

export function gasTripValue({nearPrice=0,farPrice=0,gallons=0,extraMiles=0,mpg=1}={}){
  const near=nonnegative(nearPrice), far=nonnegative(farPrice), fill=nonnegative(gallons), miles=nonnegative(extraMiles), efficiency=Math.max(0.1,nonnegative(mpg)||0.1);
  const pumpSavings=money(Math.max(0,(near-far)*fill));
  const travelGallons=money(miles/efficiency);
  const travelCost=money(travelGallons*far);
  const netSavings=money(pumpSavings-travelCost);
  return {pumpSavings,travelGallons,travelCost,netSavings,worthExtraTrip:netSavings>0};
}