import {
  ADULT_LIFE_SIM_MODE,
  ADULT_LIFE_SIM_VERSION,
  adultLifeSimulationSummary
} from './adult-life-simulation.js';
import { adultLifeRecoverySummary } from './adult-life-recovery.js';

function nonnegativeBand(value){
  const n=Math.max(0,Number(value)||0);
  if(n===0) return 'zero';
  if(n<=25) return '1-25';
  if(n<=50) return '26-50';
  if(n<=100) return '51-100';
  if(n<=200) return '101-200';
  if(n<=600) return '201-600';
  return 'over-600';
}

function balanceBand(value){
  const n=Number(value)||0;
  if(n<0) return 'below-zero';
  return nonnegativeBand(n);
}

function countBand(value){
  const n=Math.max(0,Math.trunc(Number(value)||0));
  if(n===0) return 'zero';
  if(n===1) return 'one';
  if(n===2) return 'two';
  return 'three-or-more';
}

export function buildAdultLifeSimulationProvenance(sim){
  if(!sim || sim.mode!==ADULT_LIFE_SIM_MODE) return null;
  const summary=adultLifeSimulationSummary(sim);
  const recovery=adultLifeRecoverySummary(sim);
  const history=Array.isArray(sim.history)?sim.history:[];
  const decisions=history.filter(x=>x?.kind==='decision');
  const periodsCompleted=history.filter(x=>x?.kind==='period-summary').length;

  return {
    mode:ADULT_LIFE_SIM_MODE,
    simulationVersion:Number(sim.version)||ADULT_LIFE_SIM_VERSION,
    status:sim.status==='complete'?'complete':'active',
    periodsCompleted,
    periodsTotal:Array.isArray(sim.periods)?sim.periods.length:0,
    decisionsCompleted:summary.decisions,
    defensibleCount:summary.defensible,
    independentDefensibleCount:summary.independent,
    promptedCount:decisions.filter(x=>x.prompted).length,
    transferAttempts:summary.transferAttempts,
    transferDefensibleCount:summary.transferDefensible,
    recoveryAttempts:recovery.attempts,
    recoverySuccesses:recovery.successful,
    independentRecoverySuccesses:recovery.independentSuccessful,
    endingBalanceBand:balanceBand(summary.endingBalance),
    endingSavingsBand:nonnegativeBand(summary.endingSavings),
    debtBand:nonnegativeBand(summary.debt),
    carriedCostBand:nonnegativeBand(summary.carriedCost),
    unresolvedRequiredBand:countBand(summary.missedRequired),
    protectedRequiredBand:countBand(summary.protectedRequired),
    scamLossBand:nonnegativeBand(summary.scamLoss)
  };
}

export const EVALUATION_PROVENANCE_BANDING={
  money:'zero | 1-25 | 26-50 | 51-100 | 101-200 | 201-600 | over-600',
  balance:'below-zero plus the nonnegative money bands',
  counts:'zero | one | two | three-or-more'
};
