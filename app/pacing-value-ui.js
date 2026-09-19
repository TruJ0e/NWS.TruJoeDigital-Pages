import { loadState, saveState } from './state.js';
import { recordLearningDecision } from './mastery.js';
import { calculatePacing, calculateMoneyPacing, recoveryPlan, recalculatePace, calculateIrregularPlan, compareUnitValue, gasTripValue } from './pacing-value.js';

const UI_KEY='nwsPacingValue.v1';
const RETURN_KEY='nws.v25.returnScreen';
const FOCUS_KEY='nwsCourseShell.pacingFocus';
const $=id=>document.getElementById(id);
const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const money=value=>`$${Number(value||0).toFixed(2)}`;
const defaults={answers:{},hints:{},paceResult:null,valueResult:null,gasResult:null,irregularResult:null};

function readUi(){
  try{return {...defaults,...JSON.parse(localStorage.getItem(UI_KEY)||'{}')};}catch{return {...defaults};}
}
function writeUi(value){localStorage.setItem(UI_KEY,JSON.stringify(value));}
function field(label,id,value,step='1'){
  return `<div class="field"><label for="${id}">${esc(label)}</label><input id="${id}" type="number" min="0" step="${step}" value="${esc(value)}"></div>`;
}
function answerStatus(id){
  const answer=readUi().answers[id];
  if(!answer)return '';
  return `<div class="result" role="status"><b class="${answer.correct?'positive':'negative'}">${answer.correct?'Correct.':'Not yet.'}</b> ${esc(answer.explanation)}</div>`;
}
function hint(id,text){
  return readUi().hints[id]
    ? `<div class="hint"><b>Reasoning cue:</b> ${esc(text)}</div>`
    : `<button class="btn ghost" type="button" onclick="pacingValue.showHint('${id}')">Show reasoning</button>`;
}
function choice(id,value,label,primary=false){return `<button class="btn ${primary?'':'secondary'}" type="button" onclick="pacingValue.answer('${id}','${value}')">${esc(label)}</button>`;}

const questions={
  recalc:{skill:'weekly',good:'90',transfer:false,errorType:'pacing-recalculation',explanation:'After spending $130 from $400, $270 remains. With 3 weeks left, the new pace is $90 per week.'},
  safe:{skill:'weekly',good:'50',transfer:false,errorType:'safe-to-spend',explanation:'The bank balance is not the same as safe-to-spend money. Protect $120 for a future Need and $80 in planned savings first; $200 remains, or $50 per week for four weeks.'},
  savingsPurpose:{skill:'saving',good:'use-it',transfer:true,errorType:'savings-purpose',explanation:'Savings can have a job. Using textbook savings to buy the planned textbook is the plan working, not a failure to save.'},
  foodAll:{skill:'sales',good:'large',transfer:false,errorType:'unit-value',explanation:'If all 12 are used, $9 ÷ 12 = $0.75 each, compared with $5.40 ÷ 6 = $0.90 each.'},
  foodWaste:{skill:'sales',good:'small',transfer:true,errorType:'usable-value',explanation:'If only 6 of the 12-pack will actually be used, the effective cost is $1.50 per used item. The 6-pack stays $0.90 per used item.'},
  gasTrip:{skill:'sales',good:'compare',transfer:true,errorType:'travel-cost',explanation:'The cheaper pump price is only part of the decision. Subtract the fuel used for the extra drive before calling it a savings.'},
  gasCombined:{skill:'sales',good:'far',transfer:true,errorType:'combined-trip-value',explanation:'When the cheaper station is already on the route, the extra-trip cost falls to zero, so the pump savings are real savings.'},
  irregular:{skill:'weekly',good:'protect',transfer:true,errorType:'irregular-income',explanation:'With irregular income, do not pretend another refill is guaranteed. Protect required costs and a chosen buffer first, then decide what part of the remainder can be flexible.'},
  monthlyPaycheck:{skill:'weekly',good:'20',transfer:true,errorType:'monthly-pacing',explanation:'From $1,800, protect $1,050 of known Needs and $150 of planned savings. The $600 flexible remainder must last 30 days, which is $20 per day.'},
  semesterPace:{skill:'semester',good:'75',transfer:true,errorType:'semester-pacing',explanation:'From $3,200, protect $1,600 of semester Needs and $400 of planned savings. The $1,200 flexible remainder across 16 weeks is $75 per week.'},
  recoveryChoice:{skill:'weekly',good:'recalculate',transfer:true,errorType:'pacing-recovery',explanation:'Money already spent cannot be undone. Protect remaining Needs, find the time and flexible money left, and set a new pace before making the next flexible purchase.'}
};

function recordAnswer(id,choice){
  const q=questions[id]; if(!q)return;
  const ui=readUi(), prior=ui.answers[id], correct=choice===q.good, prompted=!!ui.hints[id];
  ui.answers[id]={choice,correct,explanation:q.explanation}; writeUi(ui);
  const state=loadState();
  recordLearningDecision(state,q.skill,correct,{prompted,transfer:q.transfer,recovery:!!(prior&&prior.correct===false&&correct),errorType:correct?'':q.errorType,detail:`Pacing & Value ${id}: ${choice}`});
  saveState(state);
  render();
}

function showHint(id){
  const ui=readUi();
  if(!ui.hints[id]){
    ui.hints[id]=true;
    const state=loadState(); state.learning.hintsUsed=(state.learning.hintsUsed||0)+1; saveState(state);
    writeUi(ui);
  }
  render();
}

function calcPace(){
  const result=calculateMoneyPacing({available:+$('pvAvailable').value,periods:+$('pvPeriods').value,periodsElapsed:+$('pvElapsed').value,flexibleSpent:+$('pvSpent').value,reservedNeeds:+$('pvNeeds').value,protectedSavings:+$('pvSavings').value});
  const ui=readUi(); ui.paceResult=result; writeUi(ui); render();
}
function applyPacePreset(kind){
  const presets={monthly:{available:1800,periods:30,elapsed:0,spent:0,needs:1050,savings:150},semester:{available:3200,periods:16,elapsed:0,spent:0,needs:1600,savings:400},weekly:{available:400,periods:4,elapsed:0,spent:0,needs:120,savings:80}};
  const preset=presets[kind]||presets.weekly;
  const values={pvAvailable:preset.available,pvPeriods:preset.periods,pvElapsed:preset.elapsed,pvSpent:preset.spent,pvNeeds:preset.needs,pvSavings:preset.savings};
  for(const [id,value] of Object.entries(values)){const el=$(id);if(el)el.value=value;}
  calcPace();
}
function setCourseFocus(focus){
  if(focus)sessionStorage.setItem(FOCUS_KEY,focus);else sessionStorage.removeItem(FOCUS_KEY);
  render();
  queueMicrotask(()=>{const target=document.querySelector(`[data-pacing-focus="${focus||'pacing'}"]`);target?.scrollIntoView?.({block:'start'});target?.focus?.({preventScroll:true});});
}
function calcIrregular(){
  const result=calculateIrregularPlan({cash:+$('pvIrregularCash').value,requiredBeforeNextIncome:+$('pvIrregularNeeds').value,buffer:+$('pvIrregularBuffer').value});
  const ui=readUi(); ui.irregularResult=result; writeUi(ui); render();
}
function calcValue(){
  const result=compareUnitValue(
    {price:+$('pvLeftPrice').value,units:+$('pvLeftUnits').value,usableUnits:+$('pvLeftUsable').value},
    {price:+$('pvRightPrice').value,units:+$('pvRightUnits').value,usableUnits:+$('pvRightUsable').value}
  );
  const ui=readUi(); ui.valueResult=result; writeUi(ui); render();
}
function calcGas(){
  const result=gasTripValue({nearPrice:+$('pvNearGas').value,farPrice:+$('pvFarGas').value,gallons:+$('pvGallons').value,extraMiles:+$('pvExtraMiles').value,mpg:+$('pvMpg').value});
  const ui=readUi(); ui.gasResult=result; writeUi(ui); render();
}

function render(){
  const root=$('pacing-value'); if(!root)return;
  const ui=readUi(), state=loadState();
  const p=ui.paceResult, irr=ui.irregularResult, v=ui.valueResult, g=ui.gasResult;
  root.innerHTML=`
    <div class="hero">
      <span class="tag">Learner workspace</span>
      <h2 id="pacing-value-heading">Pacing & Value</h2>
      <p class="sub">Turn a balance into a plan that lasts. Protect future Needs and purpose-based savings before deciding what is safe to spend.</p>
      <div class="callout"><b>Core rule:</b> Balance is what exists. Safe to spend is what remains after the money with a future job is protected.</div>
    </div>

    <div class="section-title" data-pacing-focus="pacing" tabindex="-1"><div><h2>1. Make the money last</h2><p>Start with the money you actually have, protect its future jobs, then divide the flexible part across the time it must last.</p></div></div>
    <div class="card">
      <div class="row mobile-stack"><button class="btn secondary" type="button" onclick="pacingValue.applyPacePreset('weekly')">4-period example</button><button class="btn secondary" type="button" onclick="pacingValue.applyPacePreset('monthly')">Monthly paycheck: 30 days</button><button class="btn secondary" type="button" onclick="pacingValue.applyPacePreset('semester')">Semester lump sum: 16 weeks</button></div>
      <div style="height:12px"></div>
      <div class="grid g3">${field('Money available','pvAvailable',400)}${field('Periods it must last','pvPeriods',4)}${field('Periods already elapsed','pvElapsed',0)}${field('Flexible money already spent','pvSpent',0,'.01')}${field('Known future Needs to reserve','pvNeeds',120)}${field('Savings with a future job','pvSavings',80)}</div>
      <div style="height:12px"></div><button class="btn" type="button" onclick="pacingValue.calcPace()">Calculate current pace</button>
      ${p?`<div class="result"><div class="stats"><div class="stat"><span>Visible balance now</span><b>${money(p.currentBalance)}</b></div><div class="stat"><span>Safe pool for the full plan</span><b>${money(p.safePool)}</b></div><div class="stat"><span>Safe to spend from now</span><b>${money(p.safeToSpendNow)}</b></div><div class="stat"><span>New pace</span><b>${money(p.newPerPeriod)} / period</b></div></div><p><b>Status: ${p.status==='ahead'?'Ahead of pace':p.status==='behind'?'Behind pace':'On pace'}.</b> Planned flexible spending by now: ${money(p.expectedSpent)}. Actual flexible spending: ${money(p.flexibleSpent)}.</p>${p.overcommitted?'<div class="warning"><b>The plan is overcommitted.</b> Needs plus protected savings are larger than the money available.</div>':''}</div><div class="card"><h3>What should change next?</h3><p><b>${esc(recoveryPlan(p).headline)}</b></p><ol>${recoveryPlan(p).actions.map(action=>`<li>${esc(action)}</li>`).join('')}</ol></div>`:''}
    </div>

    <div class="section-title"><h2>2. Recalculate when real life changes</h2></div>
    <div class="card"><p><b>You have $400 for four weeks.</b> Your first-week plan was $100, but you spend $130. What is the new weekly pace for the $270 that remains over the final three weeks?</p><div class="row">${choice('recalc','100','$100')}${choice('recalc','90','$90',true)}${choice('recalc','70','$70')}</div>${hint('recalc','Do not keep using the old pace. Divide what remains by the time that remains.')}${answerStatus('recalc')}</div>
    <div class="card"><h3>Monthly paycheck application</h3><p>You receive <b>$1,800 once for the next 30 days</b>. You protect $1,050 for known Needs and $150 for savings with a future job. What is the flexible daily pace?</p><div class="row">${choice('monthlyPaycheck','60','$60/day')}${choice('monthlyPaycheck','20','$20/day',true)}${choice('monthlyPaycheck','45','$45/day')}</div>${hint('monthlyPaycheck','First find the flexible pool: $1,800 - $1,050 - $150. Then divide that remainder by all 30 days.')}${answerStatus('monthlyPaycheck')}<hr><h3>Semester lump-sum application</h3><p>You have <b>$3,200 for a 16-week semester</b>. You protect $1,600 for known semester Needs and $400 for planned savings. What is the flexible weekly pace?</p><div class="row">${choice('semesterPace','200','$200/week')}${choice('semesterPace','100','$100/week')}${choice('semesterPace','75','$75/week',true)}</div>${hint('semesterPace','Protect the $2,000 that already has a job, then divide the $1,200 flexible remainder across 16 weeks.')}${answerStatus('semesterPace')}<hr><h3>If you get behind</h3><p>You spent more flexible money than planned during the first part of the period. What is the next useful move?</p><div class="row">${choice('recoveryChoice','ignore','Keep the old pace')}${choice('recoveryChoice','borrow','Use money reserved for a Need')}${choice('recoveryChoice','recalculate','Recalculate from what remains',true)}</div>${hint('recoveryChoice','You cannot change past spending, but you can change the next decision.')}${answerStatus('recoveryChoice')}</div>

    <div class="section-title" data-pacing-focus="safe" tabindex="-1"><h2>3. Balance is not the same as safe to spend</h2></div>
    <div class="card"><p>Your account shows <b>$400</b>. Before the next refill you need <b>$120</b> for transportation and supplies, and <b>$80</b> is already being saved for a planned goal. You have four weeks. What is the flexible weekly pace?</p><div class="row">${choice('safe','100','$100')}${choice('safe','70','$70')}${choice('safe','50','$50',true)}</div>${hint('safe','Subtract money that already has a job before dividing the rest across time.')}${answerStatus('safe')}</div>

    <div class="section-title" data-pacing-focus="savings-purpose" tabindex="-1"><h2>4. Savings can be meant to be spent</h2></div>
    <div class="card"><p>You saved $180 specifically for textbooks. The books now cost $165. What does using that savings mean?</p><div class="row">${choice('savingsPurpose','failed','I failed because savings went down')}${choice('savingsPurpose','use-it','The savings did its job',true)}${choice('savingsPurpose','never','Savings should never be spent')}</div>${hint('savingsPurpose','Ask what the savings was created to accomplish.')}${answerStatus('savingsPurpose')}</div>

    <div class="section-title" data-pacing-focus="irregular" tabindex="-1"><div><h2>5. Irregular income</h2><p>When the next refill is uncertain, protect what must happen first instead of inventing a guaranteed weekly paycheck.</p></div></div>
    <div class="card"><div class="grid g3">${field('Cash available','pvIrregularCash',300)}${field('Required before next known income','pvIrregularNeeds',170)}${field('Chosen safety buffer','pvIrregularBuffer',50)}</div><div style="height:12px"></div><button class="btn" type="button" onclick="pacingValue.calcIrregular()">Find flexible remainder</button>${irr?`<div class="result">Required costs: <b>${money(irr.required)}</b>. Buffer: <b>${money(irr.buffer)}</b>. Flexible remainder: <b>${money(irr.flexible)}</b>. ${irr.overcommitted?'Required costs and buffer exceed available cash.':'No future income was assumed.'}</div>`:''}<p><b>If the next income date is unknown, what should happen first?</b></p><div class="row">${choice('irregular','divide','Divide all cash evenly')}${choice('irregular','protect','Protect required costs and buffer first',true)}${choice('irregular','spend','Spend wants while cash is high')}</div>${hint('irregular','Uncertain income changes the time horizon. Do not budget money that has not arrived.')}${answerStatus('irregular')}</div>

    <div class="section-title" data-pacing-focus="value" tabindex="-1"><div><h2>6. Quantity and usable value</h2><p>A larger package is only a better value when the lower unit price survives real use, storage, and waste.</p></div></div>
    <div class="card"><div class="grid g2">${field('Option A price','pvLeftPrice',9,'.01')}${field('Option A package units','pvLeftUnits',12)}${field('Option A units you will actually use','pvLeftUsable',12)}${field('Option B price','pvRightPrice',5.4,'.01')}${field('Option B package units','pvRightUnits',6)}${field('Option B units you will actually use','pvRightUsable',6)}</div><div style="height:12px"></div><button class="btn" type="button" onclick="pacingValue.calcValue()">Compare usable unit value</button>${v?`<div class="result">Option A: <b>${money(v.left.usableUnitCost)} per used unit</b>. Option B: <b>${money(v.right.usableUnitCost)} per used unit</b>. ${v.better==='tie'?'They are equal on usable unit cost.':`The better usable value is <b>Option ${v.better==='left'?'A':'B'}</b>.`}</div>`:''}</div>
    <div class="card"><p><b>Practice A:</b> A 12-pack costs $9 and a 6-pack costs $5.40. You will use every item. Which has the lower unit cost?</p><div class="row">${choice('foodAll','large','12-pack',true)}${choice('foodAll','small','6-pack')}</div>${hint('foodAll','Compare price divided by units when all units will actually be used.')}${answerStatus('foodAll')}<hr><p><b>Practice B:</b> Same prices, but you realistically use only 6 items before the 12-pack is wasted. Which is now the better usable value?</p><div class="row">${choice('foodWaste','large','12-pack')}${choice('foodWaste','small','6-pack',true)}</div>${hint('foodWaste','Value is based on what you actually use, not just what the package contains.')}${answerStatus('foodWaste')}</div>

    <div class="section-title" data-pacing-focus="gas" tabindex="-1"><div><h2>7. Gas savings after travel cost</h2><p>A cheaper price can stop being a deal when getting the deal costs money.</p></div></div>
    <div class="card"><div class="grid g2">${field('Nearby station price / gallon','pvNearGas',3.2,'.01')}${field('Cheaper station price / gallon','pvFarGas',3.05,'.01')}${field('Gallons to buy','pvGallons',12,'.1')}${field('Extra round-trip miles','pvExtraMiles',8,'.1')}${field('Vehicle miles / gallon','pvMpg',25,'.1')}</div><div style="height:12px"></div><button class="btn" type="button" onclick="pacingValue.calcGas()">Calculate real gas savings</button>${g?`<div class="result">Pump-price savings: <b>${money(g.pumpSavings)}</b>. Extra-trip fuel cost: <b>${money(g.travelCost)}</b>. Net savings: <b>${money(g.netSavings)}</b>. ${g.worthExtraTrip?'The cheaper station still saves money on fuel alone, before valuing time.':'The extra drive costs more fuel than the pump discount saves.'}</div>`:''}</div>
    <div class="card"><p><b>Practice A:</b> A station is cheaper, but it requires an extra trip. What should you compare?</p><div class="row">${choice('gasTrip','price','Only cents per gallon')}${choice('gasTrip','compare','Pump savings minus extra-trip cost',true)}</div>${hint('gasTrip','A deal has acquisition costs. Count the cost created by going to get it.')}${answerStatus('gasTrip')}<hr><p><b>Practice B:</b> The cheaper station is already on your route home, so there are no extra miles. Which station has the lower fuel cost for the same gallons?</p><div class="row">${choice('gasCombined','near','The nearby higher-price station')}${choice('gasCombined','far','The cheaper station on the existing route',true)}</div>${hint('gasCombined','If the trip is already happening, do not charge the gas purchase for miles you were going to drive anyway.')}${answerStatus('gasCombined')}</div>

    <div class="section-title" data-pacing-focus="routine" tabindex="-1"><h2>8. Use the same routine everywhere</h2></div>
    <div class="card"><ol><li>How much money is actually available?</li><li>How long must it last?</li><li>What Needs must be protected before the next income event?</li><li>What savings already has a future job?</li><li>What is safe to spend after those protections?</li><li>Is the cheaper option actually cheaper for the amount I will use?</li><li>What changed, and what is the new pace?</li></ol><p class="sub">Current NWS support level: <b>${esc(state.profile.scaffold)}</b>. Correct prompted answers and independent answers are recorded separately.</p></div>`;
}

function handleNavigation(event){
  const screen=$('pacing-value');
  if(!screen?.classList.contains('active'))return;
  const button=event.target.closest?.('button[data-screen]');
  if(!button||button.dataset.screen==='pacing-value')return;
  event.preventDefault(); event.stopImmediatePropagation();
  sessionStorage.setItem(RETURN_KEY,button.dataset.screen); location.reload();
}

document.querySelector('.nav')?.addEventListener('click',handleNavigation,true);
window.pacingValue={render,calcPace,calcIrregular,calcValue,calcGas,applyPacePreset,setCourseFocus,answer:recordAnswer,showHint};
render();
const returnScreen=sessionStorage.getItem(RETURN_KEY);
if(returnScreen){sessionStorage.removeItem(RETURN_KEY);queueMicrotask(()=>window.app?.show(returnScreen));}
