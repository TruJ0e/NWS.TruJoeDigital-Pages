import { loadState, saveState } from './state.js';
import { recordLearningDecision } from './mastery.js';
import { formatMoney } from './money.js';
import {
  ADULT_LIFE_SIM_MODE,
  createAdultLifeSimulation,
  beginAdultLifePeriod,
  currentAdultLifePeriod,
  currentAdultLifeDecision,
  adultLifePeriodComplete,
  adultLifeSimulationComplete,
  applyAdultLifeChoice,
  markAdultLifeHelp,
  advanceAdultLifePeriod,
  adultLifeSimulationSummary
} from './adult-life-simulation.js';
import {
  enableAdultLifeRecovery,
  queueAdultLifeRecovery,
  currentAdultLifeRecovery,
  markAdultLifeRecoveryHelp,
  applyAdultLifeRecovery,
  adultLifeRecoverySummary
} from './adult-life-recovery.js';

const RESUME_KEY='nws-v22-resume-life-sim';
const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const money=formatMoney;

function skillCue(skill){
  const cues={
    housing:'List the full recurring responsibility bundle, not only the headline rent.',
    utilities:'Use the current/expected required bill and allow for variation.',
    food:'Check what will actually be used, available, and accessible before comparing price.',
    transportation:'Protect the access needed for class, work, or other required travel.',
    income:'Plan from money actually available now rather than expected future income.',
    'health-costs':'Recheck remaining obligations, savings, and borrowing consequences before choosing a funding source.',
    credit:'Borrowing changes when you pay; it does not turn debt into income.',
    recurring:'Compare recurring cost, actual use, personal value, and what keeping it delays.',
    safety:'Stop and independently verify unexpected urgent payment requests.',
    weekly:'List what must happen before the next income event, then identify what is flexible.'
  };
  return cues[skill]||'Check what is available, what must happen next, and what this choice changes later.';
}

function stateWithSimulation(){
  const state=loadState();
  const sim=state.adultLifeSimulation||null;
  if(sim) enableAdultLifeRecovery(sim);
  return {state,sim};
}

function reloadIntoSimulation(state){
  saveState(state);
  sessionStorage.setItem(RESUME_KEY,'1');
  location.reload();
}

function addPeriodHistory(state,sim,period){
  state.learning.scenarioHistory ||= [];
  const decisions=sim.history.filter(x=>x.kind==='decision'&&x.period===period.period);
  const evidence=sim.history.filter(x=>(x.kind==='decision'||x.kind==='recovery')&&x.period===period.period);
  const recoveries=sim.history.filter(x=>x.kind==='recovery'&&x.period===period.period&&x.defensible);
  state.learning.scenarioHistory.push({
    mode:ADULT_LIFE_SIM_MODE,
    seed:sim.seed,
    adultLifePeriod:period.period,
    adultLifePeriodId:period.id,
    scaffold:state.profile.scaffold,
    starting:null,
    remaining:sim.balance,
    protectedNeeds:decisions.every(x=>x.defensible)||sim.missedRequired===0,
    hintsUsed:evidence.filter(x=>x.prompted).length,
    recoverySuccesses:recoveries.length,
    completedAt:new Date().toISOString()
  });
  if(state.learning.scenarioHistory.length>100) state.learning.scenarioHistory=state.learning.scenarioHistory.slice(-100);
}

function startSimulation(){
  const state=loadState();
  const sim=enableAdultLifeRecovery(createAdultLifeSimulation(state));
  beginAdultLifePeriod(sim);
  state.adultLifeSimulation=sim;
  reloadIntoSimulation(state);
}

function resetSimulation(){
  const state=loadState();
  state.adultLifeSimulation=null;
  reloadIntoSimulation(state);
}

function showHelp(){
  const {state,sim}=stateWithSimulation();
  if(!sim||adultLifeSimulationComplete(sim)||currentAdultLifeRecovery(sim))return;
  const item=currentAdultLifeDecision(sim);
  if(!item)return;
  if(markAdultLifeHelp(sim)){
    state.learning.hintsUsed=(Number(state.learning.hintsUsed)||0)+1;
    state.adultLifeSimulation=sim;
    saveState(state);
    renderAdultLifeSimulation();
  }
}

function showRecoveryHelp(){
  const {state,sim}=stateWithSimulation();
  if(!sim||adultLifeSimulationComplete(sim)||!currentAdultLifeRecovery(sim))return;
  if(markAdultLifeRecoveryHelp(sim)){
    state.learning.hintsUsed=(Number(state.learning.hintsUsed)||0)+1;
    state.adultLifeSimulation=sim;
    saveState(state);
    renderAdultLifeSimulation();
  }
}

function answerChoice(choiceId){
  const {state,sim}=stateWithSimulation();
  if(!sim||adultLifeSimulationComplete(sim)||currentAdultLifeRecovery(sim))return;
  const result=applyAdultLifeChoice(sim,choiceId);
  if(!result.ok)return;
  const x=result.outcome;
  recordLearningDecision(state,x.skill,x.defensible,{
    prompted:x.prompted,
    transfer:x.transfer,
    errorType:x.defensible?'':'planning',
    detail:`Adult Life multi-period P${x.period} ${x.decisionId}:${x.choiceId}`
  });
  if(!x.defensible) queueAdultLifeRecovery(sim,x);
  state.adultLifeSimulation=sim;
  reloadIntoSimulation(state);
}

function answerRecovery(choiceId){
  const {state,sim}=stateWithSimulation();
  if(!sim||adultLifeSimulationComplete(sim))return;
  const result=applyAdultLifeRecovery(sim,choiceId);
  if(!result.ok)return;
  const x=result.outcome;
  recordLearningDecision(state,x.skill,x.defensible,{
    prompted:x.prompted,
    transfer:x.transfer,
    recovery:true,
    errorType:x.defensible?'':'recovery',
    scheduleRetention:false,
    detail:`Adult Life recovery P${x.period} ${x.sourceDecisionId}:${x.choiceId}`
  });
  state.adultLifeSimulation=sim;
  reloadIntoSimulation(state);
}

function advancePeriod(){
  const {state,sim}=stateWithSimulation();
  if(!sim||adultLifeSimulationComplete(sim)||currentAdultLifeRecovery(sim)||!adultLifePeriodComplete(sim))return;
  const period=currentAdultLifePeriod(sim);
  addPeriodHistory(state,sim,period);
  advanceAdultLifePeriod(sim);
  state.adultLifeSimulation=sim;
  reloadIntoSimulation(state);
}

function stat(label,value){return `<div class="stat"><span>${esc(label)}</span><b>${esc(value)}</b></div>`;}

function outcomeCard(sim){
  const out=sim.lastOutcome;
  if(!out)return'';
  if(out.kind==='period-start') return `<div class="callout" role="status"><b>New planning period</b><p>${esc(out.text)}</p></div>`;
  if(out.kind==='recovery') return `<div class="result" role="status"><b>${out.defensible?'Recovery plan identified.':'This recovery attempt still needs revision.'}</b><p>${esc(out.feedback)}</p><p class="sub">The original financial consequence remains part of the simulation. Recovery evidence measures whether the learner can update the plan from what is true now.</p></div>`;
  if(out.kind!=='decision')return'';
  return `<div class="result" role="status"><b>${out.defensible?'The decision process protected the target skill.':'This choice creates a consequence to replan around.'}</b><p>${esc(out.feedback)}</p><p class="sub">After this choice: available ${money(out.balance)} · savings ${money(out.savings)} · simulated debt ${money(out.debt)}${out.pendingCost?` · carried cost ${money(out.pendingCost)}`:''}${out.missedRequired?` · unresolved required items ${out.missedRequired}`:''}</p></div>`;
}

function recoveryCard(sim,period){
  const recovery=currentAdultLifeRecovery(sim);
  if(!recovery)return'';
  const helped=!!sim.recoveryHelpUsed?.[recovery.sourceDecisionId];
  return `<div class="card"><div class="row between"><div><span class="tag warn">Recovery checkpoint</span><h3 style="margin:8px 0 2px">${esc(recovery.title)}</h3></div>${recovery.transfer?'<span class="tag">Transfer recovery</span>':''}</div><p><b>${esc(recovery.prompt)}</b></p><div class="stack">${recovery.choices.map(x=>`<button type="button" class="btn secondary" data-life-sim-recovery="${esc(x.id)}">${esc(x.label)}</button>`).join('')}</div><div style="height:10px"></div>${helped?`<div class="hint"><b>Recovery cue:</b> Start from the current balance and obligations. Do not erase the earlier consequence; decide what can still change next.</div>`:`<button type="button" class="btn ghost" id="lifeSimRecoveryHelp">Show recovery cue</button>`}<p class="sub">A recovery attempt is recorded separately from the original choice. A successful re-plan does not turn the earlier decision into a correct one.</p></div>`;
}

function decisionCard(sim,period){
  if(currentAdultLifeRecovery(sim))return recoveryCard(sim,period);
  const item=currentAdultLifeDecision(sim);
  if(!item)return'';
  const helped=!!sim.helpUsed?.[item.id];
  return `<div class="card"><div class="row between"><div><span class="tag info">Decision ${sim.decisionIndex+1} of ${period.decisions.length}</span><h3 style="margin:8px 0 2px">${esc(item.title)}</h3></div>${period.transfer?'<span class="tag">Novel transfer</span>':''}</div><p><b>${esc(item.prompt)}</b></p><div class="stack">${item.choices.map(x=>`<button type="button" class="btn secondary" data-life-sim-choice="${esc(x.id)}">${esc(x.label)}</button>`).join('')}</div><div style="height:10px"></div>${helped?`<div class="hint"><b>Decision cue:</b> ${esc(skillCue(item.skill))}</div>`:`<button type="button" class="btn ghost" id="lifeSimHelp">Show decision cue</button>`}<p class="sub">More than one response can be financially defensible when the context supports it. NWS records whether the decision process protects the relevant function and obligations.</p></div>`;
}

function periodCompleteCard(sim,period){
  if(currentAdultLifeRecovery(sim)||!adultLifePeriodComplete(sim))return'';
  const periodDecisions=sim.history.filter(x=>x.kind==='decision'&&x.period===period.period);
  const defensible=periodDecisions.filter(x=>x.defensible).length;
  const recovery=sim.history.filter(x=>x.kind==='recovery'&&x.period===period.period);
  const recovered=recovery.filter(x=>x.defensible).length;
  return `<div class="card"><span class="tag">Period review</span><h3>${esc(period.title)} complete</h3><p>${defensible} of ${periodDecisions.length} original decisions protected the target process in this period. ${recovery.length?`${recovered} of ${recovery.length} recovery attempts produced a defensible re-plan.`:'No recovery checkpoint was needed.'} This is descriptive evidence, not a moral grade.</p><p class="sub">Carry forward: available ${money(sim.balance)} · savings ${money(sim.savings)} · debt ${money(sim.debt)} · carried cost ${money(sim.pendingCost)} · unresolved required items ${sim.missedRequired}.</p><button type="button" class="btn" id="lifeSimAdvance">${sim.periodIndex>=sim.periods.length-1?'Complete simulation':'Continue to next planning period'}</button></div>`;
}

function completedView(sim){
  const summary=adultLifeSimulationSummary(sim);
  const recovery=adultLifeRecoverySummary(sim);
  const rows=sim.history.filter(x=>x.kind==='period-summary');
  return `<div class="hero"><div class="row between"><div><span class="tag">Completed</span><h2 id="life-sim-heading">Life Simulation</h2><p class="sub">Review consequences and recovery across the full multi-period plan.</p></div><button type="button" class="btn secondary" id="lifeSimRestart">Replay from period 1</button></div><div class="stats">${stat('Decisions',summary.decisions)}${stat('Independent defensible',summary.independent)}${stat('Transfer evidence',`${summary.transferDefensible}/${summary.transferAttempts}`)}${stat('Recovery',`${recovery.successful}/${recovery.attempts}`)}${stat('Ending available',money(summary.endingBalance))}</div></div><div class="section-title"><h2>Carry-forward review</h2></div><div class="card"><div class="stats">${stat('Ending savings',money(summary.endingSavings))}${stat('Simulated debt',money(summary.debt))}${stat('Unresolved required items',summary.missedRequired)}${stat('Scam loss',money(summary.scamLoss))}</div><p class="sub">A low balance, debt, unresolved cost, or earlier mistake is shown as a consequence to analyze—not as a personal or moral judgment. Successful recovery means updating the plan; it does not erase what happened.</p></div><div class="section-title"><h2>Period history</h2></div><div class="card table-scroll" tabindex="0"><table><thead><tr><th>Period</th><th>Available</th><th>Savings</th><th>Debt</th><th>Carried cost</th><th>Unresolved required</th></tr></thead><tbody>${rows.map(x=>`<tr><td>${x.period}</td><td>${money(x.balance)}</td><td>${money(x.savings)}</td><td>${money(x.debt)}</td><td>${money(x.pendingCost)}</td><td>${x.missedRequired}</td></tr>`).join('')}</tbody></table></div>`;
}

function activeView(sim){
  const period=currentAdultLifePeriod(sim);
  const summary=adultLifeSimulationSummary(sim);
  const recovery=adultLifeRecoverySummary(sim);
  const recovering=!!currentAdultLifeRecovery(sim);
  return `<div class="hero"><div class="row between"><div><span class="tag">Period ${period.period} of ${sim.periods.length}</span><h2 id="life-sim-heading">Life Simulation</h2><p class="sub">${esc(period.title)} — ${esc(period.summary)}</p></div><button type="button" class="btn secondary" id="lifeSimReset">Restart simulation</button></div><div class="stats">${stat('Available now',money(sim.balance))}${stat('Simulation savings',money(sim.savings))}${stat('Simulated debt',money(sim.debt))}${stat('Unresolved required',sim.missedRequired)}</div><p class="sub">Period income/refill: ${money(period.income)}. Carried costs and prior decisions remain part of later periods.</p></div><div class="section-title"><div><h2>${recovering?'Recovery checkpoint':'Current decision'}</h2><p>${recovering?'Use the updated situation to re-plan before continuing. The original consequence remains recorded.':'One major decision is shown at a time. Help remains available without turning a supported response into independent evidence.'}</p></div></div>${outcomeCard(sim)}${decisionCard(sim,period)}${periodCompleteCard(sim,period)}${summary.decisions?`<div class="section-title"><h2>Evidence so far</h2></div><div class="card"><div class="stats">${stat('Decisions',summary.decisions)}${stat('Defensible',summary.defensible)}${stat('Independent',summary.independent)}${stat('Transfer attempts',summary.transferAttempts)}${stat('Recovery',`${recovery.successful}/${recovery.attempts}`)}</div></div>`:''}`;
}

function emptyView(){
  return `<div class="hero"><h2 id="life-sim-heading">Life Simulation</h2><p class="sub">Carry decisions across six connected planning periods instead of resetting after every scenario.</p><div class="callout"><b>What carries forward:</b> available money, simulation savings, simulated debt, unresolved required costs, future costs, decision evidence, and recovery evidence after a poor choice.</div></div><div class="section-title"><h2>Included domains</h2></div><div class="card"><div class="grid g2"><div class="module"><b>Housing + utilities</b><small>Plan the full recurring responsibility bundle.</small></div><div class="module"><b>Food + transportation</b><small>Protect function and access while comparing flexible choices.</small></div><div class="module"><b>Reduced / irregular income</b><small>Replan from money actually available.</small></div><div class="module"><b>Health costs + savings</b><small>Respond to an unexpected necessary cost.</small></div><div class="module"><b>Credit + recurring costs</b><small>Recognize debt and recurring consequences.</small></div><div class="module"><b>Scam safety + final transfer</b><small>Verify urgent requests, then apply the routine to changed amounts.</small></div><div class="module"><b>Recovery after mistakes</b><small>A non-defensible choice pauses the simulation until the learner updates the plan.</small></div></div><div style="height:14px"></div><button type="button" class="btn" id="lifeSimStart">Start six-period simulation</button><p class="sub">Fictional money only. The simulation uses your current practice budget as a scale, not as a recommendation for real housing, food, medical, transportation, or debt spending.</p></div>`;
}

function bind(){
  document.getElementById('lifeSimStart')?.addEventListener('click',startSimulation);
  document.getElementById('lifeSimReset')?.addEventListener('click',resetSimulation);
  document.getElementById('lifeSimRestart')?.addEventListener('click',startSimulation);
  document.getElementById('lifeSimHelp')?.addEventListener('click',showHelp);
  document.getElementById('lifeSimRecoveryHelp')?.addEventListener('click',showRecoveryHelp);
  document.getElementById('lifeSimAdvance')?.addEventListener('click',advancePeriod);
  document.querySelectorAll('[data-life-sim-choice]').forEach(button=>button.addEventListener('click',()=>answerChoice(button.dataset.lifeSimChoice)));
  document.querySelectorAll('[data-life-sim-recovery]').forEach(button=>button.addEventListener('click',()=>answerRecovery(button.dataset.lifeSimRecovery)));
}

export function renderAdultLifeSimulation(){
  const host=document.getElementById('life-sim');
  if(!host)return;
  const {sim}=stateWithSimulation();
  host.setAttribute('aria-labelledby','life-sim-heading');
  host.innerHTML=!sim?emptyView():adultLifeSimulationComplete(sim)?completedView(sim):activeView(sim);
  bind();
}

function initialize(){
  renderAdultLifeSimulation();
  document.querySelector('[data-screen="life-sim"]')?.addEventListener('click',()=>queueMicrotask(renderAdultLifeSimulation));
  if(sessionStorage.getItem(RESUME_KEY)==='1'){
    sessionStorage.removeItem(RESUME_KEY);
    queueMicrotask(()=>{
      window.app?.show?.('life-sim');
      queueMicrotask(()=>{
        renderAdultLifeSimulation();
        document.getElementById('life-sim')?.focus({preventScroll:true});
      });
    });
  }
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initialize,{once:true});else initialize();
