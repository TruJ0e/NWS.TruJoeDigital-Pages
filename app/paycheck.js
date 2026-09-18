export function createFictionalPaycheck({
  gross = 420,
  deductions = [
    {label:'Fictional withholding', amount:42},
    {label:'Fictional payroll deduction', amount:18},
    {label:'Fictional benefit deduction', amount:7}
  ]
} = {}) {
  const clean = deductions.map(x => ({label:String(x.label), amount:Math.max(0, Number(x.amount) || 0)}));
  const deductionTotal = +clean.reduce((sum, x) => sum + x.amount, 0).toFixed(2);
  const takeHome = +Math.max(0, Number(gross) - deductionTotal).toFixed(2);
  return {
    gross:+Number(gross).toFixed(2),
    deductions:clean,
    deductionTotal,
    takeHome,
    fictional:true,
    note:'This statement is fictional practice. NWS does not calculate real taxes, withholding, or payroll eligibility.'
  };
}

export function evaluatePaycheckReading(statement, selectedAmount) {
  const chosen = Number(selectedAmount);
  return {
    correct:Number.isFinite(chosen) && Math.abs(chosen - statement.takeHome) < 0.005,
    selectedAmount:chosen,
    availableToBudget:statement.takeHome,
    explanation:`Gross pay is ${statement.gross.toFixed(2)}. After fictional deductions of ${statement.deductionTotal.toFixed(2)}, the simulated take-home amount available to budget is ${statement.takeHome.toFixed(2)}.`
  };
}
