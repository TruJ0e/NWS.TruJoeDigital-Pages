import { DEFAULTS, cloneState, loadState, normalizeState, saveState } from './state.js';
import {
  formatMoney, weeklyEquivalent, monthlyEquivalent, cadenceUnit, activeSubscriptionsMonthly,
  spentByType, savedInLedger, savingsGoalPercent, flexibleMoneyAvailable, scaledAmount,
  requiredOutstandingAmount, goalContributionPerPeriod, annualizedMonthlyCost, costPerUse
} from './money.js';
import {
  scenarioStartAmount, buildScenarioEvents, buildResponsibilityTransferSequence,
  SCENARIO_MODES
} from './scenarios.js';
import { supportTextFor } from './scaffolding.js';
import { skillForTransactionType, recordLearningDecision, getSkillStats } from './mastery.js';
import { applyAccessibilityPreferences } from './accessibility.js';
import { dueDelayedChecks, completeDelayedCheck, scheduleDelayedCheck } from './retrieval.js';
import { createFictionalPaycheck, evaluatePaycheckReading } from './paycheck.js';
import { generateInstructorReport } from './reporting.js';
import { CURRICULUM_MODULES, SKILLS, DECISION_ROUTINE } from '../content/curriculum.js';
import { MODULES, readCourseState } from './course-ui.js';
import { cleanNum } from './money.js';
import { RESEARCH_FOUNDATIONS, RESEARCH_POSITION } from '../content/research-basis.js';
import { VERSIONED_CONTENT_SOURCES } from '../content/sources.js';

let state = loadState();
const $ = id => document.getElementById(id);
const money = formatMoney;
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const weekly = () => weeklyEquivalent(state.profile);
const monthly = () => monthlyEquivalent(state.profile);
const outstanding = () => requiredOutstandingAmount(state);
const events = () => state.currentScenarioEvents?.length ? state.currentScenarioEvents : buildScenarioEvents(state);
const pct = value => value == null ? '—' : `${value}%`;

function persist(){ saveState(state); applyAccessibilityPreferences(state.preferences); }
function record(skill, correct, meta={}){ return recordLearningDecision(state, skill, correct, meta); }
function reducedMotion(){ return globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches; }
function show(id, opts={}){
  const prev=document.querySelector('main .screen.active')?.id;
  if(prev&&prev!==id){ try{ sessionStorage.setItem('nwsScroll.'+prev,String(window.scrollY)); }catch{} }
  document.querySelectorAll('.screen').forEach(s => s.classList.toggle('active', s.id === id));
  document.querySelectorAll('.nav button').forEach(b => b.classList.toggle('active', b.dataset.screen === id));
  renderAll();
  let top=0;
  if(opts.restoreScroll){
    try{ const saved=sessionStorage.getItem('nwsScroll.'+id); if(saved!=null) top=Math.max(0,+saved||0); }catch{}
  }
  const doScroll=()=>window.scrollTo({top, behavior:(reducedMotion()||top>0) ? 'auto' : 'smooth'});
  // Restore after the browser settles its own scroll position from the screen swap,
  // otherwise scroll anchoring can clobber the restored offset.
  if(opts.restoreScroll&&top>0) requestAnimationFrame(()=>requestAnimationFrame(doScroll));
  else doScroll();
  window.NWSRouter?.synced(id);
}
function field(label,id,type,value){ const shown=type==='number'?cleanNum(value):value; return `<div class="field"><label for="${id}">${label}</label><input id="${id}" type="${type}" value="${esc(shown)}" ${type==='number'?'min="0" step=".01"':''}></div>`; }
function selectField(label,id,options,value){ return `<div class="field"><label for="${id}">${label}</label><select id="${id}">${options.map(o=>`<option value="${esc(o[0])}" ${o[0]===value?'selected':''}>${esc(o[1])}</option>`).join('')}</select></div>`; }
function card(title,body){ return `<div class="card"><b>${title}</b>${body}</div>`; }

function renderHome(){
  const p=state.profile;
  $('home').innerHTML=`<div class="hero"><div class="row between"><div><span class="tag">${esc(p.scaffold)} support</span><h2>${esc(p.name)}'s money at a glance</h2><p class="sub">Practice budget: ${money(p.amount)} per ${cadenceUnit(p)}. Scenario: ${esc(p.scenarioMode)}.</p></div><button class="btn secondary" onclick="app.show('setup')">Change setup</button></div><div class="stats"><div class="stat"><span>Available now</span><b>${money(p.balance)}</b></div><div class="stat"><span>Savings</span><b>${money(p.savings)}</b></div><div class="stat"><span>Known Needs</span><b>${money(outstanding())}</b></div><div class="stat"><span>Flexible after known costs</span><b>${money(flexibleMoneyAvailable(state))}</b></div></div></div><div class="section-title"><div><h2>NWS decision routine</h2><p>Externalize the steps instead of holding the whole budget in memory.</p></div></div><div class="card"><div class="stack">${DECISION_ROUTINE.map((x,i)=>`<div><b>${i+1}.</b> ${esc(x)}</div>`).join('')}</div></div><div class="section-title"><h2>Nearest goal</h2></div><div class="card"><div class="row between"><div><b>${esc(p.shortGoalName)}</b><div class="sub">${money(p.savings)} of ${money(p.shortGoal)}</div></div><b>${Math.round(savingsGoalPercent(p))}%</b></div><div class="progressbar"><div style="width:${savingsGoalPercent(p)}%"></div></div><div style="height:12px"></div><button class="btn" onclick="app.show('week')">Open scenario practice</button></div>`;
}

function renderMoney(){
  const p=state.profile;
  $('money').innerHTML=`<div class="hero"><h2>My Money</h2><p class="sub">Balance and time are shown together so future obligations stay visible.</p><div class="stats"><div class="stat"><span>Spending balance</span><b>${money(p.balance)}</b></div><div class="stat"><span>Savings</span><b>${money(p.savings)}</b></div><div class="stat"><span>Next income / refill</span><b>${money(p.amount)}</b></div><div class="stat"><span>Monthly recurring</span><b>${money(activeSubscriptionsMonthly(state.subscriptions))}</b></div></div></div><div class="section-title"><h2>Recent activity</h2></div><div class="card">${state.ledger.length?`<table><thead><tr><th>Item</th><th>Type</th><th>Amount</th></tr></thead><tbody>${state.ledger.slice().reverse().map(x=>`<tr><td>${esc(x.desc)}</td><td>${esc(x.type)}</td><td>${x.amount<0?'-':'+'}${money(Math.abs(x.amount))}</td></tr>`).join('')}</tbody></table>`:'<p class="sub">No practice transactions yet.</p>'}</div>`;
}

function renderEvent(e){
  const done=state.completed['event:'+e.id], teach=state.profile.scaffold==='Teach', guide=state.profile.scaffold==='Guide', revealed=state.revealedHints[e.id];
  const kind=e.type==='save'?'save':e.type==='recurring'?'sub':'buy';
  let controls='';
  if(!state.weekStarted) controls='<span class="sub">Start the scenario first.</span>';
  else if(done) controls='<span class="positive">Decision recorded</span>';
  else if(e.type==='info') controls=`<button class="btn secondary" onclick="app.reviewEvent('${e.id}','income')">Mark reviewed</button>`;
  else if(e.id==='save') controls=`<div class="row"><input id="saveWeekAmt" type="number" min="0" step="1" value="${e.amount}" style="max-width:110px;padding:9px"><button class="btn" onclick="app.saveFromWeek()">Save amount</button><button class="btn secondary" onclick="app.skipEvent('${e.id}')">Not this period</button></div>`;
  else controls=`<div class="row"><button class="btn" onclick="app.payEvent('${e.id}',${e.amount},'${e.type}','${esc(e.title)}')">${e.required?'Pay / protect':'Spend '+money(e.amount)}</button>${e.required?'':`<button class="btn secondary" onclick="app.skipEvent('${e.id}')">Skip / wait</button>`}</div>`;
  const support=e.type==='info'?'':teach?`<div class="hint"><b>Worked step:</b> ${esc(supportTextFor(state.profile.scaffold,kind))}</div>`:revealed?`<div class="hint">${esc(supportTextFor(state.profile.scaffold,kind))}</div>`:`<button class="btn ghost" onclick="app.hint('${e.id}','${kind}')">${guide?'Show first step':'Show help'}</button>`;
  const label=e.type==='need'?'Need':e.type==='want'?'Want':e.type==='save'?'Savings':e.type==='info'?'Information':'Recurring';
  return `<div class="event ${done?'done':''}"><div class="row between"><div><span class="tag ${e.type}">${label}</span><h3 style="margin:7px 0 3px">${esc(e.title)}</h3></div><b>${e.type==='info'?'Information':e.id==='save'?'Suggested '+money(e.amount):money(e.amount)}</b></div><p>${esc(e.text||'')}</p>${state.preferences.wording==='standard'?support:''}<div style="height:10px"></div>${controls}</div>`;
}

function renderWeek(){
  const list=events();
  const period=state.activeResponsibilityPeriod ? ` Responsibility-transfer period ${state.activeResponsibilityPeriod}.` : '';
  $('week').innerHTML=`<div class="hero"><div class="row between"><div><h2>Scenario Practice</h2><p class="sub">Seed ${esc(state.profile.scenarioSeed)} reproduces the same event sequence. Mode: ${esc(state.profile.scenarioMode)}.${period}</p></div>${state.weekStarted?'<button class="btn secondary" onclick="app.finishWeek()">End & review</button>':'<button class="btn" onclick="app.startWeek()">Start scenario</button>'}</div>${state.weekStarted?`<div class="stats"><div class="stat"><span>Started with</span><b>${money(state.currentRunStart)}</b></div><div class="stat"><span>Balance now</span><b>${money(state.profile.balance)}</b></div><div class="stat"><span>Hints used</span><b>${Math.max(0,state.learning.hintsUsed-(state.currentRunHintsStart||0))}</b></div><div class="stat"><span>Known Needs left</span><b>${money(outstanding())}</b></div></div>`:''}</div><div class="section-title"><div><h2>Events</h2><p>${state.profile.scaffold==='Teach'?'Worked reasoning is visible.':state.profile.scaffold==='Guide'?'Use cues first; request a step only when needed.':'No automatic solution cues. Help remains available.'}</p></div></div><div class="stack">${list.map(renderEvent).join('')}</div>`;
}

function renderSpend(){
  const transfer=state.transferMode;
  const q=[
    {id:'q1',skill:'needs',text:`You have ${money(weekly())}. Transportation of ${money(scaledAmount(state.profile,10))} is still required. A friend asks you to spend ${money(scaledAmount(state.profile,18))} now.`,good:'plan',choices:[['spend','Spend now'],['plan','Check plan first']],ex:'Checking required costs first protects money you already know is needed.'},
    {id:'q2',skill:'sales',text:`A ${money(scaledAmount(state.profile,30))} item is 30% off, but it was not planned.`,good:'wait',choices:[['sale','Buy because it is on sale'],['wait','Check plan / wait']],ex:'A sale changes price, not automatically affordability or priority.'},
    {id:'q3',skill:'needs',text:'Prepared food is necessary twice each week because cooking is not realistically accessible on those days. How should it be classified?',good:'depends',choices:[['need','Need'],['want','Want'],['depends','It depends']],ex:'Needs and Wants are contextual. Consider function, alternatives, and consequences.'}
  ];
  $('spend').innerHTML=`<div class="hero"><div class="row between"><div><h2>Spend</h2><p class="sub">Practice affordability and context. Spending on a Want is not automatically a mistake.</p></div><button class="btn secondary" onclick="app.toggleTransfer()">${transfer?'Exit transfer check':'Run transfer check'}</button></div>${transfer?'<div class="callout">Transfer attempts are tracked separately.</div>':''}</div><div class="section-title"><h2>Decision practice</h2></div><div class="card">${q.map(x=>`<div class="choice"><div><b>${esc(x.text)}</b>${state.spendQuiz[x.id]?`<div class="result">${esc(x.ex)}</div>`:''}</div><div class="row">${x.choices.map(c=>`<button class="btn ${c[0]===x.good?'':'secondary'}" onclick="app.quiz('${x.id}','${c[0]}','${x.good}','${x.skill}')">${esc(c[1])}</button>`).join('')}</div></div>`).join('')}</div>`;
}

function renderSave(){
  const p=state.profile;
  $('save').innerHTML=`<div class="hero"><h2>Save</h2><p class="sub">Work backward from a goal, then check whether the contribution fits after Needs.</p></div><div class="section-title"><h2>Goal pace</h2></div><div class="card"><div class="grid g3">${field('Goal amount','goalAmount','number',p.shortGoal)}${field('Already saved','goalSaved','number',p.savings)}${field('Periods remaining','goalPeriods','number',4)}</div><div style="height:12px"></div><button class="btn" onclick="app.calcGoalPace()">Calculate goal pace</button><div id="goalPaceResult" class="result hidden"></div></div><div class="section-title"><h2>Move simulated money</h2></div><div class="card"><div class="row"><input id="saveTransfer" type="number" min="0" step="1" value="5" style="max-width:120px"><button class="btn" onclick="app.transferSave()">Move to savings</button></div></div>`;
}

function renderSubscriptions(){
  const total=activeSubscriptionsMonthly(state.subscriptions);
  $('subscriptions').innerHTML=`<div class="hero"><h2>Subscriptions</h2><p class="sub">Recurring decisions combine cost, time, use, overlap, and personal value.</p><div class="stats"><div class="stat"><span>Monthly active</span><b>${money(total)}</b></div><div class="stat"><span>Yearly active</span><b>${money(annualizedMonthlyCost(total))}</b></div></div></div><div class="section-title"><h2>Services</h2></div><div class="card"><div style="overflow-x:auto"><table><thead><tr><th>Service</th><th>Monthly</th><th>Yearly</th><th>Uses</th><th>Cost/use</th><th>Value</th><th></th></tr></thead><tbody>${state.subscriptions.map(s=>`<tr><td>${esc(s.name)}</td><td>${money(s.monthly)}</td><td>${money(annualizedMonthlyCost(s.monthly))}</td><td>${s.uses||0}</td><td>${costPerUse(s.monthly,s.uses)==null?'—':money(costPerUse(s.monthly,s.uses))}</td><td>${esc(s.value||'—')}</td><td><button class="btn secondary" onclick="app.toggleSub('${s.id}')">${s.active?'Pause':'Keep'}</button></td></tr>`).join('')}</tbody></table></div></div><div class="section-title"><h2>Add comparison</h2></div><div class="card"><div class="grid g3">${field('Service','subName','text','')}${field('Monthly cost','subCost','number',10)}${field('Uses / month','subUses','number',4)}${selectField('Personal value','subValue',[['low','Low'],['medium','Medium'],['high','High']],'medium')}</div><div style="height:12px"></div><button class="btn" onclick="app.addSub()">Add service</button></div>${window.myNumbers?.yourTurnHTML?.('subscriptions')||''}`;
}

function paycheckCard(){
  const statement=createFictionalPaycheck();
  const result=state.paycheckPracticeResult;
  return `<div class="card"><div class="row between"><div><b>Fictional first paycheck</b><p class="sub">Practice reading a statement. These are not real tax rates.</p></div><span class="tag info">Income interpretation</span></div><table><tbody><tr><td>Gross pay</td><td>${money(statement.gross)}</td></tr>${statement.deductions.map(x=>`<tr><td>${esc(x.label)}</td><td>−${money(x.amount)}</td></tr>`).join('')}<tr><td><b>Take-home pay</b></td><td><b>${money(statement.takeHome)}</b></td></tr></tbody></table><p><b>Which amount is actually available to budget after the fictional deductions?</b></p><div class="row"><button class="btn secondary" onclick="app.answerPaycheck(${statement.gross})">${money(statement.gross)}</button><button class="btn secondary" onclick="app.answerPaycheck(${statement.deductionTotal})">${money(statement.deductionTotal)}</button><button class="btn" onclick="app.answerPaycheck(${statement.takeHome})">${money(statement.takeHome)}</button></div>${result?`<div class="result">${result.correct?'<span class="positive"><b>Correct.</b></span>':'<span class="negative"><b>Not yet.</b></span>'} ${esc(result.explanation)}</div>`:''}<p class="sub">${esc(statement.note)}</p></div>`;
}

function responsibilityCards(){
  const sequence=buildResponsibilityTransferSequence(state);
  const completed=new Set((state.learning.scenarioHistory||[]).filter(x=>x.mode==='responsibility').map(x=>x.responsibilityPeriod));
  return `<div class="grid g2">${sequence.map(p=>`<div class="card"><div class="row between"><div><span class="tag">${esc(p.scaffold)}</span><h3 style="margin:8px 0 2px">Period ${p.period}: ${esc(p.title)}</h3></div>${completed.has(p.period)?'<span class="positive"><b>Completed</b></span>':''}</div><p>${esc(p.text)}</p><p class="sub">Required costs in this period: ${p.obligations.map(o=>`${esc(o.title)} ${money(o.amount)}`).join(' · ')}</p><button class="btn ${completed.has(p.period)?'secondary':''}" onclick="app.startResponsibilityPeriod(${p.period})">${completed.has(p.period)?'Replay period':'Start period'}</button></div>`).join('')}</div>`;
}

function renderPlan(){
  $('plan').innerHTML=`<div class="hero"><h2>Plan</h2><p class="sub">Practice today → week → month → semester → after graduation.</p><div class="stats"><div class="stat"><span>Weekly equivalent</span><b>${money(weekly())}</b></div><div class="stat"><span>Monthly equivalent</span><b>${money(monthly())}</b></div><div class="stat"><span>16-week semester</span><b>${money(weekly()*16)}</b></div><div class="stat"><span>Recurring / month</span><b>${money(activeSubscriptionsMonthly(state.subscriptions))}</b></div></div></div><div class="section-title"><h2>Semester splitter</h2></div><div class="card"><div class="grid g3">${field('Semester money','semesterCash','number',600)}${field('Weeks remaining','semesterWeeks','number',15)}${field('Known future obligation','semesterFuture','number',120)}</div><div style="height:12px"></div><button class="btn" onclick="app.calcSemester()">Calculate sustainable weekly amount</button><div id="semesterResult" class="result hidden"></div></div><div class="section-title"><div><h2>Responsibility transfer</h2><p>Practice the same responsibility with progressively less automatic support.</p></div></div>${responsibilityCards()}<div class="section-title"><div><h2>First paycheck</h2><p>Learn to read take-home pay without pretending to calculate real taxes.</p></div></div>${paycheckCard()}${window.myNumbers?.yourTurnHTML?.('plan')||''}`;
}

function retrievalChallenge(check){
  const statement=createFictionalPaycheck();
  const map={
    weekly:{question:'Transportation costs $12 before your next refill. A $14 movie is optional. What should you protect first?',choices:[['protect','Protect transportation'],['movie','Buy the movie first']],good:'protect',help:'Look at what must happen before the next income event.'},
    needs:{question:'Prepared food is required on a day when cooking is not realistically accessible. How should NWS classify it?',choices:[['need','Always a Need'],['want','Always a Want'],['depends','It depends on the situation']],good:'depends',help:'Needs and Wants are contextual. Ask what function the expense serves and what alternatives exist.'},
    saving:{question:'A goal needs $100 more and there are 5 periods left. What is the needed contribution per period?',choices:[['10','$10'],['20','$20'],['25','$25']],good:'20',help:'Divide the amount still needed by the periods remaining.'},
    recurring:{question:'A service costs $10 each month. What is its approximate yearly cost?',choices:[['100','$100'],['120','$120'],['140','$140']],good:'120',help:'Annualize a monthly recurring cost by multiplying by 12.'},
    sales:{question:'An unplanned item is discounted. What should you check before buying it?',choices:[['sale','The discount alone'],['plan','Your plan, required costs, and goals']],good:'plan',help:'A sale changes the price, not automatically whether the purchase fits your plan.'},
    semester:{question:'You have $600 for 15 weeks and must reserve $120 for travel. About how much is available per week after reserving travel?',choices:[['32','$32'],['40','$40'],['48','$48']],good:'32',help:'Reserve the known future cost first, then divide what remains by the weeks.'},
    income:{question:`A fictional paycheck shows gross ${money(statement.gross)} and take-home ${money(statement.takeHome)}. Which amount is available to budget?`,choices:[[String(statement.gross),money(statement.gross)],[String(statement.takeHome),money(statement.takeHome)]],good:String(statement.takeHome),help:'Use the amount that actually reaches the worker after deductions: take-home pay.'}
  };
  return map[check.skill]||map.weekly;
}

function renderRetrieval(){
  const due=dueDelayedChecks(state);
  const scheduled=(state.learning.delayedChecks||[]).filter(x=>x.status==='scheduled');
  const active=scheduled.find(x=>x.id===state.activeRetrievalCheck);
  let practice='';
  if(active){
    const q=retrievalChallenge(active), helped=!!state.retrievalHelpUsed?.[active.id];
    practice=`<div class="card"><span class="tag">Delayed check</span><h3 style="margin:8px 0">${esc(SKILLS.find(s=>s.id===active.skill)?.label||active.skill)}</h3><p><b>${esc(q.question)}</b></p><div class="row">${q.choices.map(c=>`<button class="btn secondary" onclick="app.answerRetrieval('${active.id}','${esc(c[0])}')">${esc(c[1])}</button>`).join('')}</div><div style="height:10px"></div>${helped?`<div class="hint">${esc(q.help)}</div>`:`<button class="btn ghost" onclick="app.retrievalHelp('${active.id}')">Show help</button>`}</div>`;
  }
  return `<div class="section-title"><div><h2>Delayed retrieval</h2><p>Retention is checked later, not assumed from same-session success.</p></div></div><div class="card"><div class="stats"><div class="stat"><span>Due now</span><b>${due.length}</b></div><div class="stat"><span>Scheduled</span><b>${scheduled.length}</b></div><div class="stat"><span>Pilot intervals</span><b>1 / 7 / 21</b></div><div class="stat"><span>Rule</span><b>Advance independently</b></div></div><p class="sub">The spacing principle is evidence-based; 1/7/21 days is an NWS pilot hypothesis to validate, not an autism-specific established schedule.</p>${due.length?`<div class="row">${due.map(x=>`<button class="btn" onclick="app.startRetrieval('${x.id}')">Start ${esc(SKILLS.find(s=>s.id===x.skill)?.label||x.skill)} check</button>`).join('')}</div>`:'<p class="positive">No delayed checks are due right now.</p>'}</div>${practice}`;
}

function renderProgress(){
  const report=generateInstructorReport(state);
  $('progress').innerHTML=`<div class="hero"><div class="row between"><div><h2>Progress</h2><p class="sub">One quiz doesn't tell the whole story.</p></div><div class="row"><button class="btn secondary" onclick="app.previewInstructorReport()">Preview advisor report</button><button class="btn secondary" onclick="app.downloadInstructorReport()">Download report</button></div></div><div class="stats"><div class="stat"><span>Scenario attempts</span><b>${state.attempts}</b></div><div class="stat"><span>Hints requested</span><b>${state.learning.hintsUsed}</b></div><div class="stat"><span>Recorded decisions</span><b>${state.learning.decisions.length}</b></div><div class="stat"><span>Current support</span><b>${esc(state.profile.scaffold)}</b></div></div></div>${renderRetrieval()}<div class="section-title"><h2>How you're doing</h2></div><div class="card"><div style="overflow-x:auto"><table><thead><tr><th>Skill</th><th>Correct answers</th><th>Without hints</th><th>In new situations</th><th>Remembered later</th><th>After mistakes</th></tr></thead><tbody>${SKILLS.map(s=>{const x=getSkillStats(state,s.id);return `<tr><td>${esc(s.label)}</td><td>${pct(x.accuracy)}</td><td>${pct(x.independence)}</td><td>${pct(x.transfer)}</td><td>${esc(x.retention)}</td><td>${pct(x.recovery)}</td></tr>`}).join('')}</tbody></table></div><p class="sub">These show patterns over time — not a grade. There is no pass or fail here.</p></div><div class="section-title"><h2>Current advisor summary</h2></div><div class="card"><div class="stats"><div class="stat"><span>Scored decisions</span><b>${report.summary.scoredDecisions}</b></div><div class="stat"><span>Correct answers</span><b>${pct(report.summary.accuracyPercent)}</b></div><div class="stat"><span>Without hints</span><b>${pct(report.summary.independencePercent)}</b></div><div class="stat"><span>Checks due</span><b>${report.summary.delayedChecksDue}</b></div></div><p class="sub">${esc(report.interpretationNote)}</p></div><div class="section-title"><h2>Curriculum path</h2></div><div class="card"><div class="grid g2">${MODULES.map(m=>{const v=m.lessons.filter(l=>(readCourseState().visited||{})[l.id]).length;return `<div class="module"><b>Module ${m.number}: ${esc(m.title)}</b><small>${v}/${m.lessons.length} visited</small></div>`;}).join('')}</div></div>`;
}

function renderEvidence(){
  $('evidence').innerHTML=`<div class="hero"><h2>Evidence & Design Basis</h2><p class="sub">${esc(RESEARCH_POSITION.label)}. ${esc(RESEARCH_POSITION.reason)}</p></div><div class="section-title"><h2>Evidence guardrails</h2></div><div class="card"><div class="stack"><div class="callout"><b>Claim:</b> research-informed, not “proven for autism.”</div><div class="callout"><b>Primary outcome:</b> independent performance on novel scenarios, not course completion alone.</div><div class="callout"><b>Retrieval:</b> spacing/retrieval is well supported generally; NWS's 1/7/21-day sequence is a pilot hypothesis.</div><div class="callout"><b>Responsibility transfer:</b> the four-period Teach → Guide → Practice → Simulate sequence is a research-informed design inference, not a published autism-finance protocol.</div><div class="callout"><b>Privacy:</b> fictional money and minimized personal data in the MVP.</div><div class="callout"><b>Changing rules:</b> tax and benefits content requires authoritative source/effective-date metadata.</div></div></div><div class="section-title"><h2>Core source families</h2></div><div class="card"><div style="overflow-x:auto"><table><thead><tr><th>Source</th><th>NWS use</th><th>Evidence role</th></tr></thead><tbody>${RESEARCH_FOUNDATIONS.map(x=>`<tr><td><a href="${x.url}" target="_blank" rel="noopener">${esc(x.name)}</a></td><td>${esc(x.use)}</td><td>${esc(x.strength)}</td></tr>`).join('')}</tbody></table></div></div><div class="section-title"><h2>Versioned changing content</h2></div><div class="card"><table><thead><tr><th>Topic</th><th>Agency</th><th>Last reviewed</th><th>Review required</th></tr></thead><tbody>${VERSIONED_CONTENT_SOURCES.map(x=>`<tr><td>${esc(x.topic)}</td><td>${esc(x.agency)}</td><td>${esc(x.lastReviewed)}</td><td>${x.reviewRequired?'Yes':'No'}</td></tr>`).join('')}</tbody></table></div>`;
}

function renderSetup(){
  const p=state.profile,pr=state.preferences;
  $('setup').innerHTML=`<div class="hero"><h2>Setup & Accessibility</h2><p class="sub">Financial context and instructional support are separate. No diagnosis is required.</p></div><div class="section-title"><h2>Quick budgets</h2></div><div class="card"><div class="row">${[['weekly',25,'$25/week'],['weekly',50,'$50/week'],['weekly',75,'$75/week'],['monthly',100,'$100/month'],['monthly',200,'$200/month'],['semester',600,'$600/semester']].map(x=>`<button class="btn secondary" onclick="app.preset('${x[0]}',${x[1]})">${x[2]}</button>`).join('')}</div></div><div class="section-title"><h2>Financial scenario</h2></div><div class="card"><div class="grid g3">${field('Learner name or ID','pName','text',p.name)}${selectField('Budget cadence','pCadence',[['weekly','Weekly'],['monthly','Monthly'],['semester','Semester lump sum'],['irregular','Irregular / custom refill']],p.cadence)}${field('Budget amount','pAmount','number',p.amount)}${field('Current spending balance','pBalance','number',p.balance)}${field('Current savings','pSavings','number',p.savings)}${selectField('Scaffold level','pScaffold',[['Teach','Teach'],['Guide','Guide'],['Practice','Practice'],['Simulate','Simulate']],p.scaffold)}${selectField('Scenario pressure','pScenario',SCENARIO_MODES.map(x=>[x.id,x.label]),p.scenarioMode)}${field('Scenario seed','pSeed','text',p.scenarioSeed)}${field('Emergency target','pEmergency','number',p.emergencyTarget)}${field('Short goal amount','pShort','number',p.shortGoal)}${field('Medium goal amount','pMedium','number',p.mediumGoal)}${field('Long goal amount','pLong','number',p.longGoal)}</div><div style="height:14px"></div><button class="btn" onclick="app.saveSetup()">Save scenario</button></div><div class="section-title"><h2>Accessibility preferences</h2></div><div class="card"><div class="grid g3">${selectField('Visual theme','prefTheme',[['light','Light'],['dark','Dark']],pr.theme)}${selectField('Information density','prefDensity',[['low','Low'],['standard','Standard']],pr.density)}${selectField('Calculation support','prefCalc',[['full','Show full calculations'],['partial','Show partial calculations'],['none','No calculation prompts']],pr.calculations)}${selectField('Unexpected events','prefUnexpected',[['previewed','Preview them'],['unpreviewed','Do not preview'],['disabled','Disable them']],pr.unexpected)}${selectField('Wording detail','prefWording',[['standard','Standard'],['concise','Concise']],pr.wording)}</div><div style="height:14px"></div><button class="btn" onclick="app.savePreferences()">Save accessibility settings</button></div><div class="section-title"><h2>Data & instructor handoff</h2></div><div class="card"><div class="row"><button class="btn secondary" onclick="app.exportData()">Export JSON</button><button class="btn secondary" onclick="app.exportCSV()">Export CSV decisions</button><button class="btn secondary" onclick="app.previewInstructorReport()">Preview advisor report</button><button class="btn secondary" onclick="app.downloadInstructorReport()">Download advisor report</button><label class="btn secondary">Import progress<input type="file" accept="application/json" onchange="app.importData(this)" style="display:none"></label><button class="btn warn" onclick="app.resetAll()">Reset demo</button></div><p class="sub">Do not enter bank credentials, SSNs, medical records, or real benefits identifiers.</p></div>`;
}

function renderAll(){
  applyAccessibilityPreferences(state.preferences);
  // Keep the support-level pill honest: tooltip + label always describe what it is.
  const sc=state.profile.scaffold;
  const scGoal={Teach:'Worked steps are shown automatically.',Guide:'Cues are visible; ask for a step when needed.',Practice:'Minimal automatic help; help is still available.',Simulate:'No automatic cues; transfer the skill to new situations.'}[sc]||'';
  const pill=$('scaffoldPill');
  pill.textContent=sc;
  pill.setAttribute('aria-label','Support level: '+sc+'. '+scGoal);
  pill.setAttribute('title','Support level: '+sc+' — '+scGoal+' Change it under Instructor tools → Setup.');
  renderHome();renderMoney();renderWeek();renderSpend();renderSave();renderSubscriptions();renderPlan();renderProgress();renderSetup();renderEvidence();
}

// Nav clicks are routed through the hash router in course-ui.js (all .nav buttons).

function addScenarioHistory({protectedNeeds}){
  state.learning.scenarioHistory ||= [];
  state.learning.scenarioHistory.push({
    mode:state.profile.scenarioMode,
    seed:state.profile.scenarioSeed,
    responsibilityPeriod:state.activeResponsibilityPeriod||null,
    scaffold:state.profile.scaffold,
    starting:state.currentRunStart,
    remaining:state.profile.balance,
    protectedNeeds:!!protectedNeeds,
    hintsUsed:Math.max(0,state.learning.hintsUsed-(state.currentRunHintsStart||0)),
    completedAt:new Date().toISOString()
  });
  if(state.learning.scenarioHistory.length>100) state.learning.scenarioHistory=state.learning.scenarioHistory.slice(-100);
}

window.app={
  show,
  preset(cadence,amount){Object.assign(state.profile,{cadence,amount,balance:amount});state.ledger=[];state.completed={};state.weekStarted=false;state.currentRunStart=null;state.currentScenarioEvents=[];persist();renderAll()},
  saveSetup(){const g=id=>$(id);Object.assign(state.profile,{name:g('pName').value||'Student',cadence:g('pCadence').value,amount:+g('pAmount').value||0,balance:+g('pBalance').value||0,savings:+g('pSavings').value||0,scaffold:g('pScaffold').value,scenarioMode:g('pScenario').value,scenarioSeed:g('pSeed').value||'NWS-001',emergencyTarget:+g('pEmergency').value||0,shortGoal:+g('pShort').value||0,mediumGoal:+g('pMedium').value||0,longGoal:+g('pLong').value||0});state.currentScenarioEvents=[];state.activeResponsibilityPeriod=null;persist();show('home')},
  savePreferences(){Object.assign(state.preferences,{theme:$('prefTheme').value,density:$('prefDensity').value,calculations:$('prefCalc').value,unexpected:$('prefUnexpected').value,wording:$('prefWording').value});persist();renderAll()},
  startWeek(){state.attempts++;state.weekStarted=true;state.ledger=[];state.completed={};state.revealedHints={};state.currentRunHintsStart=state.learning.hintsUsed;state.currentRunStart=scenarioStartAmount(state);state.profile.balance=state.currentRunStart;state.currentScenarioEvents=buildScenarioEvents(state);state.activeResponsibilityPeriod=null;record('weekly',null,{detail:'Scenario started'});persist();renderAll()},
  startResponsibilityPeriod(periodNumber){const period=buildResponsibilityTransferSequence(state).find(x=>x.period===periodNumber);if(!period)return;state.attempts++;state.profile.scaffold=period.scaffold;state.profile.scenarioMode='responsibility';state.profile.scenarioSeed=period.seed;state.transferMode=period.transfer;state.activeResponsibilityPeriod=period.period;state.weekStarted=true;state.ledger=[];state.completed={};state.revealedHints={};state.currentRunHintsStart=state.learning.hintsUsed;state.currentRunStart=weekly();state.profile.balance=state.currentRunStart;state.currentScenarioEvents=[{id:`period-${period.period}-info`,title:period.title,amount:0,type:'info',text:period.text,required:false},...period.obligations.map(o=>({id:o.id,title:o.title,amount:o.amount,type:'need',text:`${o.title} is required in this practice period.`,required:true})),{id:`period-${period.period}-want`,title:'Flexible choice',amount:scaledAmount(state.profile,10),type:'want',text:'An optional purchase is available. Check required costs first.',required:false},{id:'save',title:'Choose an amount to save',amount:Math.max(1,Math.round(weekly()*.10)),type:'save',text:'Choose a savings amount after checking required costs.',required:false}];record('weekly',null,{detail:`Responsibility period ${period.period} started`});persist();show('week')},
  payEvent(id,amount,type,title){const after=state.profile.balance-amount,needsAfter=Math.max(0,outstanding()-(type==='need'?amount:0));if(after<0&&!confirm('This choice would take the simulated balance below zero. Record it anyway for learning?'))return;state.ledger.push({id:Date.now()+Math.random(),desc:title,amount:-amount,type,date:new Date().toISOString()});state.profile.balance=+after.toFixed(2);state.completed['event:'+id]=true;const coherent=after>=needsAfter;record(skillForTransactionType(type),coherent,{prompted:!!state.revealedHints[id],transfer:!!state.transferMode,errorType:coherent?'':'planning',detail:`${title}: ${type}`});persist();renderAll()},
  reviewEvent(id,skill='weekly'){state.completed['event:'+id]=true;record(skill,true,{transfer:!!state.transferMode,detail:'Information reviewed'});persist();renderAll()},
  skipEvent(id){state.completed['event:'+id]=true;record(id==='save'?'saving':'weekly',true,{prompted:!!state.revealedHints[id],transfer:!!state.transferMode,detail:'Skipped or delayed optional choice'});persist();renderAll()},
  hint(id,kind){state.revealedHints[id]=true;state.learning.hintsUsed++;record(kind==='sub'?'recurring':kind==='save'?'saving':'weekly',null,{prompted:true,scheduleRetention:false,detail:'Hint requested'});persist();renderAll()},
  saveFromWeek(){const n=+$('saveWeekAmt').value||0;if(n>state.profile.balance)return alert('Choose a smaller amount.');const coherent=(state.profile.balance-n)>=outstanding();state.profile.balance=+(state.profile.balance-n).toFixed(2);state.profile.savings=+(state.profile.savings+n).toFixed(2);state.ledger.push({id:Date.now(),desc:'Savings transfer',amount:n,type:'save',date:new Date().toISOString()});state.completed['event:save']=true;record('saving',coherent,{prompted:!!state.revealedHints.save,transfer:!!state.transferMode,errorType:coherent?'':'planning',detail:`Saved ${money(n)}`});persist();renderAll()},
  finishWeek(){const body=$('reportBody'),needs=spentByType(state.ledger,'need'),wants=spentByType(state.ledger,'want'),rec=spentByType(state.ledger,'recurring'),saved=savedInLedger(state.ledger),protectedNeeds=outstanding()<=state.profile.balance;state.report={needs,wants,rec,saved,remaining:state.profile.balance,protectedNeeds};record('weekly',state.profile.balance>=0&&protectedNeeds,{transfer:!!state.transferMode,errorType:protectedNeeds?'':'planning',detail:'End-of-scenario review'});addScenarioHistory({protectedNeeds});body.innerHTML=`<h2>Scenario review</h2><p class="sub">This describes consequences, not a moral grade.</p><table><tbody><tr><td>Starting amount</td><td>${money(state.currentRunStart||weekly())}</td></tr><tr><td>Needs paid</td><td>${money(needs)}</td></tr><tr><td>Wants</td><td>${money(wants)}</td></tr><tr><td>Recurring</td><td>${money(rec)}</td></tr><tr><td>Saved</td><td>${money(saved)}</td></tr><tr><td>Remaining</td><td>${money(state.profile.balance)}</td></tr></tbody></table><p>${protectedNeeds?'Known required costs remain covered.':'At least one known required cost is not fully protected. What could change, move, or wait?'}</p><div class="row"><button class="btn" onclick="app.closeReport()">Continue</button><button class="btn secondary" onclick="app.replayWeek()">Replay same seed</button></div>`;persist();$('reportDialog').showModal()},
  closeReport(){$('reportDialog').close();show(state.activeResponsibilityPeriod?'plan':'progress')},
  replayWeek(){$('reportDialog').close();state.weekStarted=false;state.ledger=[];state.completed={};state.revealedHints={};state.profile.balance=weekly();state.currentRunStart=null;persist();show('week')},
  quiz(id,answer,good,skill){const prior=state.spendQuiz[id],correct=answer===good,recovery=!!(prior&&prior.correct===false&&correct);state.spendQuiz[id]={answer,correct};record(skill,correct,{transfer:state.transferMode,recovery,errorType:correct?'':'classification',detail:`${id}:${answer}`});persist();renderAll()},
  toggleTransfer(){state.transferMode=!state.transferMode;state.spendQuiz={};persist();renderAll()},
  transferSave(){const n=+$('saveTransfer').value||0;if(n<=0||n>state.profile.balance)return alert('Choose an amount within the simulated balance.');const coherent=(state.profile.balance-n)>=outstanding();state.profile.balance=+(state.profile.balance-n).toFixed(2);state.profile.savings=+(state.profile.savings+n).toFixed(2);state.ledger.push({id:Date.now(),desc:'Savings transfer',amount:n,type:'save',date:new Date().toISOString()});record('saving',coherent,{errorType:coherent?'':'planning',detail:`Transfer ${money(n)}`});persist();renderAll()},
  calcGoalPace(){const pace=goalContributionPerPeriod(+$('goalAmount').value,+$('goalSaved').value,+$('goalPeriods').value),flex=flexibleMoneyAvailable(state),r=$('goalPaceResult');r.innerHTML=`Needed per period: <b>${money(pace)}</b>. Flexible money after known costs: <b>${money(flex)}</b>. ${pace<=flex?'That pace fits this simulated period.':'That pace does not fit without changing another part of the plan. Change the contribution, deadline, goal, or another flexible cost.'}`;r.classList.remove('hidden');record('saving',pace<=flex,{detail:'Goal pace calculation'});persist()},
  toggleSub(id){const s=state.subscriptions.find(x=>x.id===id);if(s)s.active=!s.active;record('recurring',true,{detail:'Subscription status reviewed'});persist();renderAll()},
  addSub(){const name=$('subName').value.trim(),monthly=+$('subCost').value,uses=+$('subUses').value||0,value=$('subValue').value;if(!name||!(monthly>=0))return alert('Enter a service and monthly cost.');state.subscriptions.push({id:'s'+Date.now(),name,monthly,uses,active:true,value,renewal:'Monthly'});record('recurring',true,{detail:'Added recurring service'});persist();renderAll()},
  calcSemester(){const cash=+$('semesterCash').value||0,weeks=Math.max(1,+$('semesterWeeks').value||1),future=+$('semesterFuture').value||0,usable=Math.max(0,cash-future),r=$('semesterResult');r.textContent=`Reserve ${money(future)} first. ${money(usable)} across ${weeks} weeks is about ${money(usable/weeks)} per week.`;r.classList.remove('hidden');record('semester',future<=cash,{transfer:true,detail:'Semester allocation'});persist();renderProgress()},
  answerPaycheck(selected){const result=evaluatePaycheckReading(createFictionalPaycheck(),selected);state.paycheckPracticeResult=result;record('income',result.correct,{errorType:result.correct?'':'income-reading',detail:`Selected paycheck amount ${selected}`});persist();renderPlan();renderProgress()},
  startRetrieval(id){state.activeRetrievalCheck=id;state.retrievalHelpUsed ||= {};persist();renderProgress()},
  retrievalHelp(id){state.retrievalHelpUsed ||= {};if(!state.retrievalHelpUsed[id]){state.retrievalHelpUsed[id]=true;state.learning.hintsUsed++;}persist();renderProgress()},
  answerRetrieval(id,answer){const check=(state.learning.delayedChecks||[]).find(x=>x.id===id);if(!check)return;const q=retrievalChallenge(check),correct=String(answer)===String(q.good),prompted=!!state.retrievalHelpUsed?.[id];completeDelayedCheck(state,id,{correct,prompted});record(check.skill,correct,{prompted,transfer:true,errorType:correct?'':'retrieval',scheduleRetention:false,detail:`Delayed retrieval stage ${check.stage}`});if(!correct||prompted)scheduleDelayedCheck(state,check.skill,{stage:check.stage});state.activeRetrievalCheck=null;persist();renderProgress()},
  previewInstructorReport(){const report=generateInstructorReport(state),body=$('reportBody');body.innerHTML=`<h2>Advisor evidence report</h2><p class="sub">${esc(report.interpretationNote)}</p><div class="stats"><div class="stat"><span>Correct answers</span><b>${pct(report.summary.accuracyPercent)}</b></div><div class="stat"><span>Without hints</span><b>${pct(report.summary.independencePercent)}</b></div><div class="stat"><span>Transfer attempts</span><b>${report.summary.transferAttempts}</b></div><div class="stat"><span>Checks due</span><b>${report.summary.delayedChecksDue}</b></div></div><div style="overflow-x:auto"><table><thead><tr><th>Skill</th><th>Correct answers</th><th>Without hints</th><th>In new situations</th><th>Remembered later</th><th>After mistakes</th></tr></thead><tbody>${report.skills.map(x=>`<tr><td>${esc(x.label)}</td><td>${pct(x.accuracy)}</td><td>${pct(x.independence)}</td><td>${pct(x.transfer)}</td><td>${esc(x.retention)}</td><td>${pct(x.recovery)}</td></tr>`).join('')}</tbody></table></div><p class="sub">${esc(report.privacyNote)}</p><div class="row"><button class="btn" onclick="app.closeAdvisorReport()">Close</button><button class="btn secondary" onclick="app.downloadInstructorReport()">Download JSON</button></div>`;$('reportDialog').showModal()},
  closeAdvisorReport(){$('reportDialog').close()},
  downloadInstructorReport(){const report=generateInstructorReport(state),a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(report,null,2)],{type:'application/json'}));a.download='nws-advisor-report.json';a.click();URL.revokeObjectURL(a.href)},
  exportData(){const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(state,null,2)],{type:'application/json'}));a.download='nws-progress.json';a.click();URL.revokeObjectURL(a.href)},
  exportCSV(){const rows=[['timestamp','skill','correct','prompted','transfer','recovery','error_type','scaffold','cadence','budget_amount','detail'],...state.learning.decisions.map(d=>[d.at,d.skill,d.correct,d.prompted,d.transfer,d.recovery,d.errorType,d.scaffold,d.cadence,d.amount,d.detail])],csv=rows.map(r=>r.map(v=>`"${String(v??'').replace(/"/g,'""')}"`).join(',')).join('\n'),a=document.createElement('a');a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv'}));a.download='nws-decisions.csv';a.click();URL.revokeObjectURL(a.href)},
  importData(input){const file=input.files?.[0];if(!file)return;const r=new FileReader();r.onload=()=>{try{state=normalizeState(JSON.parse(r.result));persist();renderAll();alert('Progress imported.')}catch{alert('That file could not be imported.')}};r.readAsText(file)},
  resetAll(){if(confirm('Reset this browser to the fictional NWS scenario?')){state=cloneState(DEFAULTS);persist();show('home')}}
};

applyAccessibilityPreferences(state.preferences);
renderAll();
