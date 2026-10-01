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
const round2=value=>Math.round((Number(value)||0)*100)/100;

/* Money-movement helpers: every decision shows what moved, like a bank app. */
function moneyDeltaLine(out,prev){
  const parts=[];
  if(prev&&prev.balance!=null){
    const db=round2(out.balance-prev.balance);
    if(db)parts.push(`${db<0?'−':'+'}${money(Math.abs(db))} checking`);
  }
  if(prev&&prev.savings!=null){
    const ds=round2(out.savings-prev.savings);
    if(ds)parts.push(`${ds<0?'−':'+'}${money(Math.abs(ds))} savings`);
  }
  if(prev&&prev.debt!=null){
    const dd=round2(out.debt-prev.debt);
    if(dd)parts.push(`${dd>0?'↑':'↓'} ${money(Math.abs(dd))} debt`);
  }
  if(prev&&prev.pendingCost!=null&&out.pendingCost!=null){
    const dp=round2(out.pendingCost-prev.pendingCost);
    if(dp>0)parts.push(`+${money(dp)} bills due`);
  }
  return parts.join(' · ');
}
function prevMoneyState(sim,out){
  const idx=sim.history.lastIndexOf(out);
  if(idx<=0)return null;
  for(let i=idx-1;i>=0;i--){
    const x=sim.history[i];
    if(x&&x.balance!=null)return{balance:x.balance,savings:x.savings,debt:x.debt,pendingCost:x.pendingCost};
  }
  return null;
}
function periodDots(sim){
  return `<div class="period-dots" role="img" aria-label="Period ${sim.periodIndex+1} of ${sim.periods.length}">${sim.periods.map((p,i)=>`<span class="pdot${i<sim.periodIndex?' done':i===sim.periodIndex?' now':''}"></span>`).join('')}</div>`;
}
function ledgerCard(sim){
  const rows=[];
  let prev=null;
  for(const x of sim.history){
    if(x.kind==='period-start'){
      rows.push({label:'Payday',detail:`Period ${x.period||''} income lands in checking`,amt:'+'+money(x.income||0)});
    }else if(x.kind==='decision'){
      const delta=prev?moneyDeltaLine(x,prev):'';
      rows.push({label:x.defensible?'Good call':'Costly call',detail:String(x.choiceLabel||x.decisionId).slice(0,64),amt:delta||'no money moved'});
    }else if(x.kind==='recovery'){
      rows.push({label:'Recovery',detail:String(x.choiceLabel||'recovery').slice(0,64),amt:prev?moneyDeltaLine(x,prev)||'plan updated':'—'});
    }
    if(x&&x.balance!=null)prev={balance:x.balance,savings:x.savings,debt:x.debt,pendingCost:x.pendingCost};
  }
  const recent=rows.slice(-6).reverse();
  if(!recent.length)return'';
  return `<div class="section-title"><h2>Money movement</h2></div><div class="card"><div class="stack">${recent.map(r=>`<div class="row between"><div><b>${esc(r.label)}</b><div class="sub">${esc(r.detail)}</div></div><span class="tag money-delta">${esc(r.amt)}</span></div>`).join('')}</div><p class="sub">Every decision moves money you can see. Fictional funds only.</p></div>`;
}

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

function simShapeValid(sim){
  return !!sim&&Array.isArray(sim.periods)&&sim.periods.length>0&&Array.isArray(sim.history)&&
    Number.isInteger(sim.periodIndex)&&sim.periodIndex>=0&&sim.periodIndex<sim.periods.length;
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
    starting:(sim.periodStartBalance??null),
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
  if(out.kind==='period-start') return `<div class="callout" role="status"><b>💰 Payday</b><p>${esc(out.text)}</p></div>`;
  if(out.kind==='recovery') return `<div class="result" role="status"><b>${out.defensible?'Recovery plan identified.':'This recovery attempt still needs revision.'}</b><p>${esc(out.feedback)}</p></div>`;
  if(out.kind!=='decision')return'';
  const prev=prevMoneyState(sim,out);
  const delta=prev?moneyDeltaLine(out,prev):'';
  return `<div class="result" role="status">${delta?`<b class="money-delta">${esc(delta)}</b>`:''}<p>${esc(out.feedback)}</p><p class="sub">Now: checking ${money(out.balance)} · savings ${money(out.savings)} · debt ${money(out.debt)}${out.pendingCost?` · bills due ${money(out.pendingCost)}`:''}${out.missedRequired?` · unresolved needs ${out.missedRequired}`:''}</p></div>`;
}

function recoveryCard(sim,period){
  const recovery=currentAdultLifeRecovery(sim);
  if(!recovery)return'';
  const helped=!!sim.recoveryHelpUsed?.[recovery.sourceDecisionId];
  return `<div class="card"><div class="row between"><div><span class="tag warn">Recovery checkpoint</span><h3 style="margin:8px 0 2px">${esc(recovery.title)}</h3></div>${recovery.transfer?'<span class="tag">Transfer recovery</span>':''}</div><p><b>${esc(recovery.prompt)}</b></p><div class="stack">${recovery.choices.map(x=>`<button type="button" class="btn secondary" data-life-sim-recovery="${esc(x.id)}">${esc(x.label)}</button>`).join('')}</div><div style="height:10px"></div>${helped?`<div class="hint"><b>Recovery cue:</b> Start from the current balance and obligations. Do not erase the earlier consequence; decide what can still change next.</div>`:`<button type="button" class="btn ghost" id="lifeSimRecoveryHelp">Show recovery cue</button>`}<p class="sub">A recovery attempt is recorded separately. A good re-plan does not erase the earlier consequence.</p></div>`;
}

function decisionCard(sim,period){
  if(currentAdultLifeRecovery(sim))return recoveryCard(sim,period);
  const item=currentAdultLifeDecision(sim);
  if(!item)return'';
  const helped=!!sim.helpUsed?.[item.id];
  return `<div class="card"><div class="row between"><div><span class="tag info">Decision ${sim.decisionIndex+1} of ${period.decisions.length}</span><h3 style="margin:8px 0 2px">${esc(item.title)}</h3></div>${period.transfer?'<span class="tag">Novel transfer</span>':''}</div><p><b>${esc(item.prompt)}</b></p><div class="stack">${item.choices.map(x=>`<button type="button" class="btn secondary" data-life-sim-choice="${esc(x.id)}">${esc(x.label)}</button>`).join('')}</div><div style="height:10px"></div>${helped?`<div class="hint"><b>Decision cue:</b> ${esc(skillCue(item.skill))}</div>`:`<button type="button" class="btn ghost" id="lifeSimHelp">Show decision cue</button>`}<p class="sub">Pick the move you would actually make — you will see the money move right away. More than one response can be financially defensible when the context supports it.</p></div>`;
}

function periodCompleteCard(sim,period){
  if(currentAdultLifeRecovery(sim)||!adultLifePeriodComplete(sim))return'';
  const periodDecisions=sim.history.filter(x=>x.kind==='decision'&&x.period===period.period);
  const defensible=periodDecisions.filter(x=>x.defensible).length;
  const recovery=sim.history.filter(x=>x.kind==='recovery'&&x.period===period.period);
  const recovered=recovery.filter(x=>x.defensible).length;
  return `<div class="card"><span class="tag">Period review</span><h3>${esc(period.title)} complete</h3><p>${defensible} of ${periodDecisions.length} original decisions protected the target process in this period. ${recovery.length?`${recovered} of ${recovery.length} recovery attempts produced a workable re-plan.`:'No recovery checkpoint was needed.'} No grade — just what happened.</p><p class="sub">Carry forward: available ${money(sim.balance)} · savings ${money(sim.savings)} · debt ${money(sim.debt)} · carried cost ${money(sim.pendingCost)} · unresolved required items ${sim.missedRequired}.</p><button type="button" class="btn" id="lifeSimAdvance">${sim.periodIndex>=sim.periods.length-1?'Complete simulation':'Continue to next planning period'}</button></div>`;
}

function completedView(sim){
  const summary=adultLifeSimulationSummary(sim);
  const recovery=adultLifeRecoverySummary(sim);
  const rows=sim.history.filter(x=>x.kind==='period-summary');
  return `<div class="hero"><div class="row between"><div><span class="tag">Completed</span><h2 id="life-sim-heading">My Sim Bank</h2><p class="sub">Review what moved, what it cost, and what recovered across all six periods.</p></div><button type="button" class="btn secondary" id="lifeSimRestart">Replay from period 1</button></div><div class="stats">${stat('Decisions',summary.decisions)}${stat('Independent defensible',summary.independent)}${stat('Transfer evidence',`${summary.transferDefensible}/${summary.transferAttempts}`)}${stat('Recovery',`${recovery.successful}/${recovery.attempts}`)}${stat('Ending available',money(summary.endingBalance))}</div></div><div class="section-title"><h2>Carry-forward review</h2></div><div class="card"><div class="stats">${stat('Ending savings',money(summary.endingSavings))}${stat('Simulated debt',money(summary.debt))}${stat('Unresolved required items',summary.missedRequired)}${stat('Scam loss',money(summary.scamLoss))}</div><p class="sub">A low balance, debt, unresolved cost, or earlier mistake is shown as a consequence to analyze—not as a personal or moral judgment. Successful recovery means updating the plan; it does not erase what happened.</p></div><div class="section-title"><h2>Period history</h2></div><div class="card table-scroll" tabindex="0"><table><thead><tr><th>Period</th><th>Available</th><th>Savings</th><th>Debt</th><th>Carried cost</th><th>Unresolved required</th></tr></thead><tbody>${rows.map(x=>`<tr><td>${x.period}</td><td>${money(x.balance)}</td><td>${money(x.savings)}</td><td>${money(x.debt)}</td><td>${money(x.pendingCost)}</td><td>${x.missedRequired}</td></tr>`).join('')}</tbody></table></div>`;
}

function activeView(sim){
  const period=currentAdultLifePeriod(sim);
  const summary=adultLifeSimulationSummary(sim);
  const recovery=adultLifeRecoverySummary(sim);
  const recovering=!!currentAdultLifeRecovery(sim);
  return `<div class="hero"><div class="row between"><div><span class="tag">Period ${period.period} of ${sim.periods.length}</span><h2 id="life-sim-heading">My Sim Bank</h2><p class="sub">${esc(period.title)}</p></div><button type="button" class="btn secondary" id="lifeSimReset">Restart</button></div><div class="bank-balance"><span>Checking</span><b>${money(sim.balance)}</b></div><div class="stats">${stat('Savings',money(sim.savings))}${stat('Debt',money(sim.debt))}${stat('Bills due',money(sim.pendingCost))}${stat('Unresolved needs',sim.missedRequired)}</div>${periodDots(sim)}<p class="sub">Fictional money. Decide, then watch it move.</p></div><div class="section-title"><div><h2>${recovering?'Recovery checkpoint':'Your decision'}</h2><p>${recovering?'Re-plan from what is true now. The earlier consequence stays on the record.':'One major decision is shown at a time. There is no undo — just the next decision.'}</p></div></div>${decisionCard(sim,period)}${outcomeCard(sim)}${periodCompleteCard(sim,period)}${ledgerCard(sim)}${summary.decisions?`<div class="section-title"><h2>Your run so far</h2></div><div class="card"><div class="stats">${stat('Decisions',summary.decisions)}${stat('Good calls',summary.defensible)}${stat('On your own',summary.independent)}${stat('Recovery',`${recovery.successful}/${recovery.attempts}`)}</div></div>`:''}`;
}

function emptyView(){
  return `<div class="hero"><h2 id="life-sim-heading">My Sim Bank</h2><p class="sub">A fictional bank account for the Life Simulation: six connected planning periods. Decide, watch the money move, live with the consequences.</p><div class="callout"><b>What carries forward:</b> available money, simulation savings, simulated debt, unresolved required costs, future costs, decision evidence, and recovery evidence after a poor choice.</div></div><div class="section-title"><h2>Included domains</h2></div><div class="card"><div class="grid g2"><div class="module"><b>Housing + utilities</b><small>Plan the full recurring responsibility bundle.</small></div><div class="module"><b>Food + transportation</b><small>Protect function and access while comparing flexible choices.</small></div><div class="module"><b>Reduced / irregular income</b><small>Replan from money actually available.</small></div><div class="module"><b>Health costs + savings</b><small>Respond to an unexpected necessary cost.</small></div><div class="module"><b>Credit + recurring costs</b><small>Recognize debt and recurring consequences.</small></div><div class="module"><b>Scam safety + final transfer</b><small>Verify urgent requests, then apply the routine to changed amounts.</small></div><div class="module"><b>Recovery after mistakes</b><small>A non-defensible choice pauses the simulation until the learner updates the plan.</small></div></div><div style="height:14px"></div><button type="button" class="btn" id="lifeSimStart">Start six-period simulation</button><p class="sub">Fictional money only. The simulation uses your current practice budget as a scale, not as a recommendation for real housing, food, medical, transportation, or debt spending.</p></div>`;
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
  host.innerHTML=!sim||!simShapeValid(sim)?emptyView():adultLifeSimulationComplete(sim)?completedView(sim):activeView(sim);
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
