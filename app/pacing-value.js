const money = value => Math.round((Number(value) + Number.EPSILON) * 100) / 100;
const nonnegative = value => Math.max(0, Number(value) || 0);

export function calculatePacing({available=0,periods=1,reservedNeeds=0,protectedSavings=0}={}){
  const total = nonnegative(available);
  const count = Math.max(1, Math.floor(nonnegative(periods) || 1));
  const needs = nonnegative(reservedNeeds);
  const savings = nonnegative(protectedSavings);
  const safePool = money(Math.max(0,total-needs-savings));
  return {
    available:money(total),
    periods:count,
    reservedNeeds:money(needs),
    protectedSavings:money(savings),
    safePool,
    perPeriod:money(safePool/count),
    overcommitted:needs+savings>total
  };
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
  return {
    price:money(cost),units:listed,usableUnits:usable,
    listedUnitCost:listed>0?money(cost/listed):null,
    usableUnitCost:usable>0?money(cost/usable):null
  };
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
