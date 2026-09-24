import { loadState } from './state.js';
import { dueDelayedChecks } from './retrieval.js';
import { dueRecoveryFollowups } from './recovery-followup.js';

const COURSE_STATE_KEY='nwsCourseShell.v1';
const CONTEXT_KEY='nwsCourseShell.context';
const PACING_FOCUS_KEY='nwsCourseShell.pacingFocus';
const ADULT_FOCUS_KEY='nwsCourseShell.adultLifeFocus';
const OUTLINE_KEY='nwsCourseShell.outlineOpen';
const RESUME_DISMISSED_KEY='nwsCourseShell.resumeDismissed';

const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

export const MODULES=[
  {
    id:'foundations',number:1,title:'Money Foundations',
    summary:'Learn what money is for before deciding what to do with it.',outcomes:['Sort any expense into Need, Want, or Savings — and handle the “it depends” cases.','Run the full NWS decision routine: sort, check, then decide.','Say a clear, respectful no to pressure spending without guilt.'],
    lessons:[
      {id:'nws-routine',est:8,title:'Needs, Wants, Savings',summary:'Use NWS as a decision tool, not a moral label.',screen:'home',kind:'tool',toolKind:'Dashboard'},
      {id:'available-money',est:8,title:'What money is actually available?',summary:'Separate the visible balance from money that already has a job.',screen:'money',kind:'tool',toolKind:'Dashboard'},
      {id:'depends-decisions',est:12,title:'Needs, Wants, and “it depends”',summary:'Practice contextual choices instead of memorizing rigid categories.',screen:'spend',kind:'practice'}
    ]
  },
  {
    id:'pacing',number:2,title:'Make Money Last',
    summary:'Learn to divide money by both purpose and time.',outcomes:['Turn a paycheck or a semester lump sum into a weekly pace you can follow.','Read your real safe-to-spend number instead of trusting the account balance.','Recalculate your pace when spending changes instead of hoping it works out.'],
    lessons:[
      {id:'pacing-basics',est:8,title:'Pacing money over time',summary:'Turn a weekly, monthly, or semester amount into a usable pace.',screen:'pacing-value',pacingFocus:'pacing',kind:'lesson'},
      {id:'safe-to-spend',est:7,title:'Balance vs. safe to spend',summary:'Protect future Needs and planned savings before calling money flexible.',screen:'pacing-value',pacingFocus:'safe',kind:'lesson'},
      {id:'savings-purpose',est:6,title:'Savings is money for later',summary:'Savings can become a future Need, emergency resource, or planned goal.',screen:'pacing-value',pacingFocus:'savings-purpose',kind:'lesson'},
      {id:'irregular-income',est:8,title:'Irregular income',summary:'Plan without pretending money that has not arrived is guaranteed.',screen:'pacing-value',pacingFocus:'irregular',kind:'lesson'},
      {id:'semester-plan',est:10,title:'Plan a longer time period',summary:'Break a semester lump sum or paycheck cycle into smaller usable periods.',screen:'plan',kind:'tool',toolKind:'Calculator'}
    ]
  },
  {
    id:'value',number:3,title:'Spend Smart',
    summary:'A lower price is useful only when it fits the plan and creates real value.',outcomes:['Judge sales, subscriptions, and bulk deals by usable value, not sticker price.','Compare options by unit cost and practical cost, not the loudest discount.','Spot the true cost of a subscription before it becomes a leak.'],
    lessons:[
      {id:'sales-decisions',est:12,title:'Sales and discounts',summary:'A discount is not savings when it causes an unnecessary purchase.',screen:'spend',kind:'practice'},
      {id:'usable-value',est:8,title:'Quantity, unit price, and waste',summary:'Compare the amount you will actually use, not just package size.',screen:'pacing-value',pacingFocus:'value',kind:'lesson'},
      {id:'gas-value',est:7,title:'Gas price vs. travel cost',summary:'Count the cost of getting the deal before calling it a savings.',screen:'pacing-value',pacingFocus:'gas',kind:'lesson'},
      {id:'subscriptions-lesson',est:10,title:'Subscriptions and recurring costs',summary:'Turn small repeating charges into monthly and yearly decisions.',screen:'subscriptions',kind:'tool',toolKind:'Calculator'}
    ]
  },
  {
    id:'adult-money',number:4,title:'Everyday Adult Money',
    summary:'Learn the financial processes that appear when support shifts toward independent living.',outcomes:['Handle banking, paychecks, credit, and scams without learning the hard way.','Read a pay stub and know where the money went.','Treat credit as a tool with rules, not free money.'],
    lessons:[
      {id:'banking',est:8,title:'Banking and overdrafts',summary:'Track pending obligations instead of trusting only the displayed balance.',screen:'adult-life',adultModule:'banking',kind:'lesson'},
      {id:'first-job',est:8,title:'Paychecks and tax paperwork',summary:'Use take-home pay and recognize the basic employment paperwork sequence.',screen:'adult-life',adultModule:'first-job',kind:'lesson'},
      {id:'credit',est:8,title:'Credit and borrowing',summary:'Treat credit as borrowed money with a future obligation.',screen:'adult-life',adultModule:'credit',kind:'lesson'},
      {id:'scams',est:6,title:'Scams and payment safety',summary:'Use a stop-and-verify routine when someone creates urgency around money.',screen:'adult-life',adultModule:'scams',kind:'lesson'}
    ]
  },
  {
    id:'living-costs',number:5,title:'Living Costs',
    summary:'Plan the real bundles of costs that come with housing, food, transportation, and health care.',outcomes:['Plan housing, food, transport, and health costs as one real budget.','Compare housing and transport options by total monthly cost.','Build a grocery routine that feeds you without draining you.'],
    lessons:[
      {id:'renting',est:10,title:'Renting and leases',summary:'Look beyond advertised rent to written rules, fees, utilities, and recurring costs.',screen:'adult-life',adultModule:'renting',kind:'lesson'},
      {id:'utilities',est:7,title:'Utilities and home bills',summary:'Plan variable recurring costs, due dates, and setup responsibilities.',screen:'adult-life',adultModule:'utilities',kind:'lesson'},
      {id:'groceries',est:8,title:'Groceries and meal planning',summary:'Plan from what will actually be eaten, prepared, stored, and used.',screen:'adult-life',adultModule:'groceries',kind:'lesson'},
      {id:'transportation',est:8,title:'Transportation choices',summary:'Compare the whole transportation cost, not one payment or one trip.',screen:'adult-life',adultModule:'transportation',kind:'lesson'},
      {id:'health-insurance',est:9,title:'Health insurance and medical costs',summary:'Compare premiums with the other major cost-sharing terms.',screen:'adult-life',adultModule:'health-insurance',kind:'lesson'}
    ]
  },
  {
    id:'support',number:6,title:'Future Money and Support',
    summary:'Protect future needs, understand changing benefits information, and prepare for unexpected changes.',outcomes:['Protect future needs with emergency money before the emergency.','Know which benefits information is versioned and where to verify it.','Run one decision routine that travels across every money situation.'],
    lessons:[
      {id:'future-needs',est:8,title:'Future Needs and emergency money',summary:'Reserve money for predictable irregular costs before they become emergencies.',screen:'save',kind:'tool',toolKind:'Calculator'},
      {id:'benefits-lesson',est:8,title:'Benefits basics',summary:'Use current, versioned information instead of memorizing rules that can change.',screen:'benefits',kind:'lesson'},
      {id:'decision-routine',est:10,title:'Put the whole routine together',summary:'Use the same money questions across new situations.',screen:'pacing-value',pacingFocus:'routine',kind:'lesson'}
    ]
  }
];

const LESSONS=new Map(MODULES.flatMap(module=>module.lessons.map(lesson=>[lesson.id,{...lesson,moduleId:module.id,moduleTitle:module.title,moduleNumber:module.number}])));
// Standalone tool opens that unambiguously visit a course step: exactly one
// step claims the screen, and the screen's primary content IS that step's tool.
// Deliberately excluded: 'home'/'money' (legacy dashboards, not the lesson),
// 'spend'/'pacing-value'/'adult-life' (one screen serves many lessons — opening
// the screen does not visit any single step), 'plan' (the semester splitter
// shares its screen with the responsibility-transfer and paycheck tools), and
// 'week'/'life-sim'/'progress' (no course step claims those screens).
const TOOL_STEP_BY_SCREEN={save:'future-needs',subscriptions:'subscriptions-lesson',benefits:'benefits-lesson'};
function markToolStepVisited(screen){
  const id=TOOL_STEP_BY_SCREEN[screen];
  if(id&&LESSONS.has(id))markVisited(id);
}

import { LESSON_CONTENT } from '../content/lessons.js';

// NWS course shell: one-per-screen course layer over the existing learning
// engines (money, week, spend, save, subscriptions, plan, pacing-value,
// adult-life, life-sim, benefits, progress). Lessons are authored as step
// data in src/content/lessons.js and rendered by the lesson player below;
// module pages give each module its own top-nav page; the home page keeps
// only the hero, progress, and a module quicklist.
const HUBS=new Set(['course','practice-hub','reviews','references','simulations','module-page']);
const ADVISOR=new Set(['advisor-dashboard','setup','scenarios','evidence','evaluation']);
const AREA_LABELS={course:'Modules', 'practice-hub':'Practice', reviews:'Reviews', references:'Quick References', simulations:'Simulations'};
const DEFAULT_ORIGIN={home:'course',money:'course',spend:'practice-hub',save:'practice-hub',subscriptions:'practice-hub',plan:'course','pacing-value':'practice-hub','adult-life':'practice-hub',benefits:'references',progress:'reviews',week:'simulations','life-sim':'simulations'};

export function readCourseState(){
  try{return {visited:{},...JSON.parse(localStorage.getItem(COURSE_STATE_KEY)||'{}')};}catch{return {visited:{}};}
}
function writeCourseState(value){localStorage.setItem(COURSE_STATE_KEY,JSON.stringify(value));}
function markVisited(id){
  const state=readCourseState(); state.visited[id]=state.visited[id]||new Date().toISOString(); writeCourseState(state);
}
function currentContext(){
  try{return JSON.parse(sessionStorage.getItem(CONTEXT_KEY)||'null');}catch{return null;}
}
function setContext(value){
  if(value)sessionStorage.setItem(CONTEXT_KEY,JSON.stringify(value));else sessionStorage.removeItem(CONTEXT_KEY);
}
function setFocus(lesson){
  if(lesson?.pacingFocus)sessionStorage.setItem(PACING_FOCUS_KEY,lesson.pacingFocus);else sessionStorage.removeItem(PACING_FOCUS_KEY);
  if(lesson?.adultModule)sessionStorage.setItem(ADULT_FOCUS_KEY,lesson.adultModule);else sessionStorage.removeItem(ADULT_FOCUS_KEY);
}
function clearFocus(){sessionStorage.removeItem(PACING_FOCUS_KEY);sessionStorage.removeItem(ADULT_FOCUS_KEY);}

function kindTag(lesson){
  if(lesson.kind==='practice') return 'Practice';
  if(lesson.kind==='tool') return 'Tool';
  return 'Lesson';
}

export function moduleMinutes(module){return module.lessons.reduce((sum,lesson)=>sum+(lesson.est||0),0);}

function courseDurationLabel(){
  const total=MODULES.reduce((sum,module)=>sum+moduleMinutes(module),0);
  const halfHours=Math.round(total/30)/2;
  return `~${Math.floor(halfHours)}${halfHours%1?'½':''} hours`;
}

// "Pick up where you left off" — shown on the course home only when this tab
// session still holds a lesson context (e.g. the learner used the browser back
// button or reloaded on the home hash). One-time per lesson: dismissing sets a
// session flag, and opening any lesson clears it so a new step re-arms the
// banner. Never auto-navigates — no surprise jumps.
function resumeBanner(){
  const ctx=currentContext();
  const lesson=ctx?.lessonId?LESSONS.get(ctx.lessonId):null;
  if(!lesson)return '';
  try{if(sessionStorage.getItem(RESUME_DISMISSED_KEY)==='1')return '';}catch{return '';}
  return `<div class="course-resume" role="status"><span>Pick up where you left off: <b>${esc(lesson.title)}</b><span class="sub"> · Module ${lesson.moduleNumber}: ${esc(lesson.moduleTitle)} · ${lesson.est} min</span></span><span class="row"><button class="btn" type="button" onclick="course.openLesson('${esc(lesson.id)}')">Resume step</button><button class="btn secondary" type="button" onclick="course.dismissResume()">Dismiss</button></span></div>`;
}
function dismissResume(){
  try{sessionStorage.setItem(RESUME_DISMISSED_KEY,'1');}catch{}
  renderCourse();
}

function renderCourse(){
  const host=document.getElementById('course'); if(!host)return;
  const state=readCourseState();
  const allLessons=MODULES.flatMap(module=>module.lessons);
  const total=allLessons.length;
  const visitedCount=allLessons.filter(lesson=>state.visited[lesson.id]).length;
  const next=allLessons.find(lesson=>!state.visited[lesson.id]);
  const target=next||allLessons[0];
  const ctaLabel=visitedCount===0?'Start course':(next?`Resume: ${target.title}`:'Review course from the start');
  const ctaNote=visitedCount===0?`Begin with Module 1 · ${esc(allLessons[0].title)}`:(next?`Next up: ${esc(next.title)} · ${next.est} min`:'You have visited every step — review anything, any time.');
  const pct=Math.round(visitedCount/total*100);
  host.innerHTML=
`<div class="hero course-hero"><span class="tag">NWS Course</span><h2>Learn to run your money like an adult.</h2><p class="sub">Built for college students. Plain-language lessons and hands-on practice for the money decisions that actually show up: paychecks, rent, groceries, subscriptions, and the surprises in between.</p><ul class="course-logistics" aria-label="Course logistics"><li><b>Self-paced</b><span>go in any order</span></li><li><b>Free</b><span>no account, no cost</span></li><li><b>6 modules · ${total} steps</b><span>lessons, practice &amp; tools</span></li><li><b>${esc(courseDurationLabel())}</b><span>total, at your pace</span></li></ul><div class="row course-cta-row"><button class="btn" type="button" onclick="course.openLesson('${esc(target.id)}')">${esc(ctaLabel)}</button><span class="sub">${ctaNote}</span></div>${resumeBanner()}</div>`
+`<section class="card course-progress" aria-label="Course progress"><div class="course-progress-head"><h3>Your progress</h3><span class="tag">${visitedCount} of ${total} visited</span></div><div class="progressbar" role="progressbar" aria-valuemin="0" aria-valuemax="${total}" aria-valuenow="${visitedCount}" aria-label="Course steps visited"><i style="width:${pct}%"></i></div><p class="sub">Visits are shown for navigation only — they are not a mastery score.</p></section>`
+`<div class="section-title"><div><h2>Modules</h2><p>Each module is its own page of short lessons — one idea per screen.</p></div></div><div class="module-quicklist">${MODULES.map(moduleQuickCard).join('')}</div>`
+`<section class="card course-simple-card" aria-label="Simple mode"><span class="tag">Easier mode</span><h3>Want the calm version? Try Simple mode.</h3><p>Same money skills, one step at a time, in plain language.</p><a class="btn" href="./simple.html">Open Simple mode →</a></section>`;
}

// Module quicklist card (course home): one tap target per module. Opens the
// standalone module page; lessons live there, not on this page.
function moduleQuickCard(module){
  const state=readCourseState();
  const done=module.lessons.filter(lesson=>state.visited[lesson.id]).length;
  return `<button type="button" class="module-quick-card" onclick="course.openModulePage('${esc(module.id)}')" aria-label="Open Module ${module.number}: ${esc(module.title)} — ${done} of ${module.lessons.length} visited"><span class="course-module-num" aria-hidden="true">${module.number}</span><span class="mq-body"><b>Module ${module.number}: ${esc(module.title)}</b><small>${esc(module.summary)}</small><small class="mq-meta">${done}/${module.lessons.length} visited · about ${moduleMinutes(module)} min</small></span><span class="mq-go" aria-hidden="true">→</span></button>`;
}

// Standalone module page: top navigation (sidebar moves to the top inside
// modules), lesson list, outcomes, and prev/next module paging.
function modulePageTopNav(){
  const items=[['#/modules','Modules'],['#/practice','Practice'],['#/reviews','Reviews'],['#/references','Quick References'],['#/simulations','Simulations']];
  return `<nav class="topnav" aria-label="Course sections"><div class="topnav-scroll">${items.map(([hash,label])=>`<a class="topnav-link${hash==='#/modules'?' active':''}" href="${hash}">${esc(label)}</a>`).join('')}<a class="topnav-link topnav-simple" href="./simple.html">Simple mode</a></div></nav>`;
}

function renderModulePage(moduleId){
  const host=document.getElementById('module-page'); if(!host)return;
  const module=MODULES.find(entry=>entry.id===moduleId);
  if(!module){host.innerHTML='';return;}
  const state=readCourseState();
  const idx=MODULES.indexOf(module);
  const prev=MODULES[idx-1]||null;
  const next=MODULES[idx+1]||null;
  const done=module.lessons.filter(lesson=>state.visited[lesson.id]).length;
  let stepNum=lessonSequence().indexOf(module.lessons[0].id);
  const rows=module.lessons.map(lesson=>{
    stepNum+=1;
    const visited=!!state.visited[lesson.id];
    return `<button type="button" class="course-lesson${visited?' visited':''}" onclick="course.openLesson('${esc(lesson.id)}')" aria-label="Lesson ${stepNum}: ${esc(lesson.title)}${visited?' (visited)':''}"><span class="course-step-num" aria-hidden="true">${stepNum}</span><span class="course-lesson-meta"><b>${esc(lesson.title)}</b><small>${esc(lesson.summary)}</small></span><span class="course-kind">${esc(kindTag(lesson))}</span><span class="course-est">${lesson.est} min</span><span class="course-check" aria-hidden="true">✓</span><span class="course-lesson-action">${visited?'Open again':'Start'}</span></button>`;
  }).join('');
  host.innerHTML=
`${modulePageTopNav()}<div class="module-page-head"><p class="lp-kicker">Module ${module.number} of ${MODULES.length}</p><h2>${esc(module.title)}</h2><p class="sub">${esc(module.summary)}</p><p class="module-page-meta"><span class="tag">${done}/${module.lessons.length} visited</span><span class="sub">about ${moduleMinutes(module)} min</span></p></div>`
+`<div class="section-title"><div><h2>Lessons</h2><p>One idea per screen. Every lesson ends with a review of your answers.</p></div></div><div class="course-lesson-list module-lesson-list">${rows}</div>`
+`<div class="section-title"><div><h2>You will be able to</h2><p>What this module builds.</p></div></div><div class="card"><ul class="course-outcomes">${(module.outcomes||[]).map(line=>`<li>${esc(line)}</li>`).join('')}</ul></div>`
+`<div class="row between module-page-pager">${prev?`<button type="button" class="btn secondary" onclick="course.openModulePage('${esc(prev.id)}')" aria-label="Previous module: ${esc(prev.title)}">← Module ${prev.number}</button>`:'<span></span>'}${next?`<button type="button" class="btn" onclick="course.openModulePage('${esc(next.id)}')" aria-label="Next module: ${esc(next.title)}">Module ${next.number} →</button>`:'<span></span>'}</div>`;
}

// Internal: actually opens the module page (called by the router after the hash changes).
function _openModulePage(moduleId){
  const module=MODULES.find(entry=>entry.id===moduleId);
  if(!module){location.hash='#/modules';return;}
  clearFocus();
  setContext({screen:'module-page',origin:'course',title:'Module '+module.number+': '+module.title,moduleId});
  window.app?.show?.('module-page');
  queueMicrotask(()=>{renderModulePage(moduleId);updateTrail();});
}

// Public: module cards call this; navigation goes through the hash so module
// pages are deep-linkable, refresh-safe, and work with the browser back button.
function openModulePage(moduleId){
  const hash='#/modules/'+moduleId;
  if(!window.NWSRouter) return _openModulePage(moduleId);
  if((location.hash||'')===hash) _openModulePage(moduleId);
  else location.hash=hash;
}

const PRACTICE_ITEMS=[
  ['NWS decisions','Needs, Wants, sales, affordability, and contextual choices.','spend'],
  ['Pacing & safe to spend','Practice calculations and decisions for money that must last.','pacing-value'],
  ['Savings & goals','Move simulated money and work backward from a goal.','save'],
  ['Subscriptions','Compare recurring services, yearly cost, use, and value.','subscriptions'],
  ['Paychecks & semester planning','Practice take-home pay and longer time periods.','plan'],
  ['Adult-life skills','Choose one adult-life topic and practice the decision.','adult-life']
];
function renderPractice(){
  const host=document.getElementById('practice-hub'); if(!host)return;
  host.innerHTML=`<div class="hero"><span class="tag">Practice</span><h2>Practice what you learned</h2><p class="sub">Try a skill after its lesson — learning first, then doing.</p></div><div class="course-card-grid">${PRACTICE_ITEMS.map(([title,text,screen])=>`<button type="button" class="card course-action-card" onclick="course.openTool('${screen}','practice-hub')"><span class="tag">Practice</span><h3>${esc(title)}</h3><p>${esc(text)}</p><b>Open practice →</b></button>`).join('')}</div>`;
}

function renderReviews(){
  const host=document.getElementById('reviews'); if(!host)return;
  const state=loadState();
  const ordinary=dueDelayedChecks(state).length;
  const recovery=dueRecoveryFollowups(state).length;
  const total=ordinary+recovery;
  host.innerHTML=`<div class="hero"><span class="tag">Reviews</span><h2>Review after time has passed</h2><p class="sub">Reviews bring back older material so it sticks. Not a lesson, not a simulation.</p><div class="stats"><div class="stat"><span>Due now</span><b>${total}</b></div><div class="stat"><span>Regular reviews</span><b>${ordinary}</b></div><div class="stat"><span>Recovery follow-ups</span><b>${recovery}</b></div></div><div style="height:14px"></div><button class="btn" type="button" onclick="course.openTool('progress','reviews')">${total?'Start due reviews':'Open review center'}</button></div><div class="section-title"><h2>What belongs here?</h2></div><div class="card"><ul><li>Recalling material you learned earlier, after time has passed.</li><li>A follow-up in a changed situation, after a recovery attempt.</li><li>Revisiting a module when a review shows the idea needs more teaching.</li></ul><p class="sub">Reviews check what stuck — not just what you finished.</p></div>`;
}

function refCard(title,body){return `<div class="card quick-ref"><h3>${esc(title)}</h3>${body}</div>`;}
function renderReferences(){
  const host=document.getElementById('references'); if(!host)return;
  host.innerHTML=`<div class="hero"><span class="tag">Quick References</span><h2>Look it up without reopening a whole lesson</h2><p class="sub">Short reminders only — for when you already learned the skill and just need the steps.</p></div><div class="course-card-grid">${refCard('NWS','<p><b>Need:</b> required for health, safety, access, responsibilities, or functioning in the current situation.</p><p><b>Want:</b> optional or flexible in the current situation.</p><p><b>Savings:</b> money moved from available now to available later. It can later pay for a Need or a goal.</p><p><b>“It depends” is valid.</b> Context can change the category.</p>')}${refCard('Safe to spend','<p><b>Visible balance − known future Needs − protected savings = flexible / safe-to-spend money.</b></p><p>The account balance answers “what exists?” Safe to spend answers “what can I use without taking money from another job?”</p>')}${refCard('Money pacing','<p><b>Remaining flexible money ÷ remaining time = new pace.</b></p><p>When spending changes, do not keep the old pace. Recalculate from what remains.</p>')}${refCard('Is it really a deal?','<ol><li>Was I already going to buy it?</li><li>Will I actually use the quantity?</li><li>What is the usable unit cost?</li><li>Does buying extra interfere with later Needs?</li><li>Does getting the deal add travel, time, or other cost?</li></ol>')}${refCard('Gas comparison','<p><b>Pump-price savings − extra-trip fuel cost = practical fuel savings.</b></p><p>If the stop is already on your route, the extra-trip miles may be zero.</p>')}${refCard('When the plan changes','<p>You cannot change money already spent, but you can change what happens next.</p><ol><li>Find money remaining.</li><li>Find time remaining.</li><li>Protect required costs.</li><li>Choose what can change or wait.</li><li>Set a new pace.</li></ol>')}<button type="button" class="card course-action-card" onclick="course.openTool('benefits','references')"><span class="tag info">Versioned reference</span><h3>Benefits information</h3><p>Open current SSI, SSDI, and ABLE reference information. These figures and rules require version checks.</p><b>Open benefits reference →</b></button></div>`;
}

function renderSimulations(){
  const host=document.getElementById('simulations'); if(!host)return;
  host.innerHTML=`<div class="hero"><span class="tag">Simulations</span><h2>Put multiple skills together</h2><p class="sub">After teaching and practice: decisions, consequences, and changing conditions, combined. One run is not a mastery score.</p></div><div class="course-card-grid"><button type="button" class="card course-action-card" onclick="course.openTool('week','simulations')"><span class="tag">Short simulation</span><h3>Scenario Practice</h3><p>Work through one contained money period with Needs, Wants, savings, and recurring choices.</p><b>Start scenario →</b></button><button type="button" class="card course-action-card" onclick="course.openTool('life-sim','simulations')"><span class="tag">Full simulation</span><h3>Independent Life Simulation</h3><p>Carry money, obligations, debt, savings, unexpected costs, and consequences across multiple periods.</p><b>Start life simulation →</b></button><button type="button" class="card course-action-card" onclick="course.openTool('plan','simulations')"><span class="tag">Responsibility transfer</span><h3>Increase independence gradually</h3><p>Move from more support toward less support while keeping the same decision routine.</p><b>Open transfer sequence →</b></button></div>`;
}

function renderArea(id){
  if(id==='course')renderCourse();
  else if(id==='practice-hub')renderPractice();
  else if(id==='reviews')renderReviews();
  else if(id==='references')renderReferences();
  else if(id==='simulations')renderSimulations();
  else if(id==='module-page'){const ctx=currentContext();if(ctx?.moduleId)renderModulePage(ctx.moduleId);}
}

function lessonSequence(){
  return MODULES.flatMap(module=>module.lessons.map(lesson=>lesson.id));
}

function outlineOpen(){
  try{return sessionStorage.getItem(OUTLINE_KEY)==='1';}catch{return false;}
}
function setOutlineOpen(open){
  try{if(open)sessionStorage.setItem(OUTLINE_KEY,'1');else sessionStorage.removeItem(OUTLINE_KEY);}catch{}
}
function toggleOutline(){setOutlineOpen(!outlineOpen());updateTrail();}

function outlineStepRow(lesson,stepNum,currentId,visited){
  const current=lesson.id===currentId;
  return `<button type="button" class="outline-step${visited?' visited':''}${current?' current':''}"${current?' aria-current="true"':''} onclick="course.openLesson('${esc(lesson.id)}')" aria-label="${esc(lesson.title)}${visited?' (visited)':''}${current?' (current step)':''}"><span class="outline-step-num" aria-hidden="true">${stepNum}</span><span class="outline-check" aria-hidden="true">${visited?'✓':''}</span><span class="outline-step-meta"><b>${esc(lesson.title)}</b><small>${esc(kindTag(lesson))} · ${lesson.est} min</small></span></button>`;
}

// Udemy-style collapsible curriculum outline: every module + all 24 steps, with
// visited checkmarks, per-step kind + est, per-module x/n visited, current step
// highlighted, and click-to-jump through the existing lesson hash routes.
// Rendered in normal flow directly below the trail (never overlapping lesson
// content); collapsed until the trail's Outline toggle opens it.
function renderOutline(currentId){
  const trail=document.getElementById('courseTrail');
  if(!trail)return;
  let panel=document.getElementById('courseOutline');
  if(!panel){panel=document.createElement('div');panel.id='courseOutline';trail.after(panel);}
  const state=readCourseState();
  const open=outlineOpen();
  panel.className='course-outline'+(open?' open':'');
  panel.setAttribute('role','navigation');
  panel.setAttribute('aria-label','Course outline');
  const total=MODULES.reduce((n,module)=>n+module.lessons.length,0);
  const visitedTotal=MODULES.reduce((n,module)=>n+module.lessons.filter(lesson=>state.visited[lesson.id]).length,0);
  let stepNum=0;
  panel.innerHTML=`<div class="course-outline-head"><h3>Course outline</h3><span class="tag">${visitedTotal} of ${total} visited</span></div>`+MODULES.map(module=>{
    const visited=module.lessons.filter(lesson=>state.visited[lesson.id]).length;
    const rows=module.lessons.map(lesson=>{stepNum+=1;return outlineStepRow(lesson,stepNum,currentId,!!state.visited[lesson.id]);}).join('');
    const hasCurrent=module.lessons.some(lesson=>lesson.id===currentId);
    return `<details class="outline-module"${hasCurrent?' open':''}><summary><span class="outline-module-num" aria-hidden="true">${module.number}</span><span class="outline-step-meta outline-module-meta"><b>Module ${module.number}: ${esc(module.title)}</b><small>${visited}/${module.lessons.length} visited · about ${moduleMinutes(module)} min</small></span><span class="tag">${visited}/${module.lessons.length}</span></summary><div class="outline-steps">${rows}</div></details>`;
  }).join('');
}

function updateTrail(){
  const trail=document.getElementById('courseTrail'); if(!trail)return;
  const active=document.querySelector('main .screen.active')?.id;
  const panel=document.getElementById('courseOutline');
  // Inside a module (module page or lesson player) the left sidebar moves away;
  // module pages show their own top navigation instead.
  document.body.classList.toggle('module-view',active==='module-page'||active==='lesson-player');
  if(!active||HUBS.has(active)||ADVISOR.has(active)){
    trail.classList.add('hidden');
    if(panel)panel.classList.add('hidden');
    document.title='NWS Money Masterclass';
    return;
  }
  const ctx=currentContext();
  const matching=ctx?.screen===active?ctx:null;
  const origin=matching?.origin||DEFAULT_ORIGIN[active]||'course';
  // Lesson origins are module pages ('module:<id>'); label them Module N.
  let originLabel=AREA_LABELS[origin];
  if(!originLabel&&origin.startsWith('module:')){
    const mod=MODULES.find(entry=>entry.id===origin.slice(7));
    originLabel=mod?`Module ${mod.number}`:'Modules';
  }
  // Tool steps opened from inside a lesson carry 'lessonstep:<id>:<idx>' so the
  // trail can return to the exact step the learner left.
  if(!originLabel&&origin.startsWith('lessonstep:'))originLabel='Lesson';
  originLabel=originLabel||'Modules';
  const lessonId=matching?.lessonId||null;
  const title=matching?.title||document.querySelector(`#${CSS.escape(active)} h2`)?.textContent||'Course activity';
  document.title=`${title} — NWS Money Masterclass`;
  // Breadcrumb: hub › module › step on lessons, hub › title everywhere else.
  const crumb=(lessonId&&matching?.moduleNumber)
    ?`<small>${esc(originLabel)}</small><span class="trail-sep" aria-hidden="true">›</span><span class="trail-module">Module ${esc(matching.moduleNumber)}: ${esc(matching.moduleTitle)}</span><span class="trail-sep" aria-hidden="true">›</span><b>${esc(title)}</b>`
    :`<small>${esc(originLabel)}</small><span class="trail-sep" aria-hidden="true">›</span><b>${esc(title)}</b>`;
  // Prev / next across the full lesson sequence, with in-lesson progress.
  let flow='';
  if(lessonId){
    const seq=lessonSequence();
    const idx=seq.indexOf(lessonId);
    const prev=idx>0?LESSONS.get(seq[idx-1]):null;
    const next=idx>=0&&idx<seq.length-1?LESSONS.get(seq[idx+1]):null;
    // Every lesson now renders in the lesson player, so the counter always
    // says "Lesson" (the outline still shows each step's kind).
    const nounOf=l=>!l||l.kind==='lesson'?'lesson':l.kind==='practice'?'practice':'tool';
    const pct=idx>=0?Math.round((idx+1)/seq.length*100):0;
    flow=`<div class="trail-flow"><span class="trail-progress">Lesson ${idx+1} of ${seq.length}</span><span class="progressbar trail-meter" role="progressbar" aria-valuemin="0" aria-valuemax="${seq.length}" aria-valuenow="${idx+1}" aria-label="Lesson progress"><i style="width:${pct}%"></i></span><span class="trail-nav">`
      +(prev?`<button type="button" class="btn secondary" onclick="course.openLesson('${esc(prev.id)}')" aria-label="Previous ${nounOf(prev)}: ${esc(prev.title)}">← ${esc(prev.title)}</button>`:'<span></span>')
      +(next?`<button type="button" class="btn" onclick="course.openLesson('${esc(next.id)}')" aria-label="Next ${nounOf(next)}: ${esc(next.title)}">${esc(next.title)} →</button>`:'<span></span>')
      +`</span></div>`;
  }
  const isOpen=outlineOpen();
  trail.innerHTML=`<button type="button" class="btn secondary" onclick="course.back('${esc(origin)}')">← Back to ${esc(originLabel)}</button><button type="button" class="btn secondary trail-outline-toggle" aria-expanded="${isOpen}" aria-controls="courseOutline" onclick="course.toggleOutline()">${isOpen?'Hide outline':'Outline'}</button><div class="trail-title">${crumb}</div>${flow}`;
  trail.classList.remove('hidden');
  renderOutline(lessonId);
  const created=document.getElementById('courseOutline');
  if(created)created.classList.remove('hidden');
}

// Internal: actually opens the lesson (called by the router after the hash changes).
// Lessons render in the lesson player: one idea per screen, with an
// auto-appended "end and review" summary after the last step.
function _openLesson(id,stepIdx=0){
  const lesson=LESSONS.get(id); if(!lesson)return;
  const content=lessonContent(id);
  if(!content){location.hash='#/modules/'+lesson.moduleId;return;}
  markVisited(id);
  // A newly opened lesson re-arms the resume banner: returning home afterwards
  // offers this step again until the learner dismisses it.
  try{sessionStorage.removeItem(RESUME_DISMISSED_KEY);}catch{}
  setContext({screen:'lesson-player',origin:'module:'+lesson.moduleId,title:lesson.title,moduleNumber:lesson.moduleNumber,moduleTitle:lesson.moduleTitle,lessonId:id,moduleId:lesson.moduleId,stepIdx});
  initPlayerState(id,stepIdx);
  window.app?.show?.('lesson-player');
  queueMicrotask(()=>{renderPlayerStep();updateTrail();renderCourse();});
}

// Hash for a lesson step: step 0 uses the bare lesson hash so existing links
// keep working; deeper steps append the index.
function lessonStepHash(lesson,stepIdx){
  return '#/modules/'+lesson.moduleId+'/'+lesson.id+(stepIdx>0?'/'+stepIdx:'');
}

// Public: lesson buttons call this; navigation goes through the hash so lessons are
// deep-linkable, refresh-safe, and work with the browser back button.
function openLesson(id,stepIdx=0){
  const lesson=LESSONS.get(id); if(!lesson)return;
  const hash=lessonStepHash(lesson,stepIdx);
  if(!window.NWSRouter) return _openLesson(id,stepIdx);
  if((location.hash||'')===hash) _openLesson(id,stepIdx);
  else location.hash=hash;
}

// focus: optional {pacingFocus} or {adultModule} from a lesson tool-step, so
// the tool opens on the section the lesson was teaching.
function _openTool(screen,origin='practice-hub',focus=null){
  if(focus&&focus.pacingFocus){try{sessionStorage.setItem(PACING_FOCUS_KEY,focus.pacingFocus);}catch{}}
  else if(focus&&focus.adultModule){try{sessionStorage.setItem(ADULT_FOCUS_KEY,focus.adultModule);}catch{}}
  else clearFocus();
  // Direct tool opens visit their step too (see TOOL_STEP_BY_SCREEN), so the
  // home bar, outline, and trail meter stay consistent with the visited set.
  markToolStepVisited(screen);
  setContext({screen,origin,title:screen==='week'?'Scenario Practice':screen==='life-sim'?'Independent Life Simulation':null});
  if(screen==='pacing-value')window.pacingValue?.setCourseFocus?.(focus&&focus.pacingFocus?focus.pacingFocus:null);
  if(screen==='adult-life')window.nwsAdultLifeOpenModule?.(focus&&focus.adultModule?focus.adultModule:null,!!(focus&&focus.adultModule));
  window.app?.show?.(screen);
  queueMicrotask(()=>{updateTrail();renderCourse();});
}

function openTool(screen,origin='practice-hub',focus=null){
  if(!window.NWSRouter) return _openTool(screen,origin,focus);
  const hash=window.NWSRouter.toolHash(screen);
  try{sessionStorage.setItem('nwsToolOrigin',origin);}catch{}
  if((location.hash||'')===hash) _openTool(screen,origin,focus);
  else location.hash=hash;
}

function back(origin='course'){
  if(origin.startsWith('module:')){openModulePage(origin.slice(7));return;}
  if(origin.startsWith('lessonstep:')){
    const parts=origin.split(':');
    const stepIdx=parseInt(parts[2],10);
    if(parts[1]&&Number.isInteger(stepIdx)){openLesson(parts[1],stepIdx);return;}
  }
  clearFocus(); setContext(null);
  window.pacingValue?.setCourseFocus?.(null);
  window.nwsAdultLifeOpenModule?.(null,false);
  renderArea(origin);
  if(!window.NWSRouter){ window.app?.show?.(origin,{restoreScroll:true}); queueMicrotask(updateTrail); return; }
  try{sessionStorage.setItem('nwsRestoreScroll','1');}catch{}
  const hash=window.NWSRouter.hubHash(origin);
  if((location.hash||'')===hash){ window.app?.show?.(origin,{restoreScroll:true}); queueMicrotask(updateTrail); }
  else location.hash=hash;
}

window.course={openLesson,openTool,openModulePage,back,toggleOutline,dismissResume,_openLesson,_openTool,_openModulePage,render:()=>{renderCourse();renderPractice();renderReviews();renderReferences();renderSimulations();updateTrail();}};

function initialize(){
  window.course.render();
  const main=document.querySelector('main');
  if(main){
    let lastActive = main.querySelector('.screen.active')?.id || 'course';
    new MutationObserver(()=>{
      const active=main.querySelector('.screen.active')?.id;
      if(active && active !== lastActive){
        lastActive = active;
        if(HUBS.has(active))renderArea(active);
        updateTrail();
      }
    }).observe(main,{subtree:true,attributes:true,attributeFilter:['class']});
  }
  // All nav buttons route through the hash (replaces the show() binding in main-v11).
  document.querySelectorAll('.nav button[data-screen]').forEach(button=>button.addEventListener('click',()=>{
    setContext(null); clearFocus();
    const screen=button.dataset.screen;
    if(!window.NWSRouter){ renderArea(screen); window.app?.show?.(screen,{restoreScroll:true}); return; }
    try{sessionStorage.setItem('nwsRestoreScroll','1');}catch{}
    const hash=window.NWSRouter.hubHash(screen);
    queueMicrotask(()=>renderArea(screen));
    if((location.hash||'')===hash) window.app?.show?.(screen,{restoreScroll:true});
    else location.hash=hash;
  }));
  if(window.NWSRouter) window.NWSRouter.init({
    lessons:LESSONS,
    modules:MODULES,
    openLesson:_openLesson,
    openModulePage:_openModulePage,
    showScreen:(screen,opts)=>{
      let restore=!!opts?.restoreScroll, toolOrigin=null;
      try{
        if(sessionStorage.getItem('nwsRestoreScroll')==='1'){ restore=true; sessionStorage.removeItem('nwsRestoreScroll'); }
        toolOrigin=sessionStorage.getItem('nwsToolOrigin'); if(toolOrigin) sessionStorage.removeItem('nwsToolOrigin');
      }catch{}
      if(window.NWSRouter&&!window.NWSRouter.HUB_IDS.has(screen)){
        // Standalone tool view (not a lesson): clear lesson context so tabs,
        // titles, and focus match the tool instead of a stale lesson. Direct
        // tool opens also visit their step (see TOOL_STEP_BY_SCREEN).
        clearFocus();
        markToolStepVisited(screen);
        setContext({screen,origin:toolOrigin||'practice-hub',title:null});
        if(screen==='pacing-value')window.pacingValue?.setCourseFocus?.(null);
        if(screen==='adult-life')window.nwsAdultLifeOpenModule?.(null,false);
      }
      window.app?.show?.(screen,{restoreScroll:restore});
      queueMicrotask(()=>{updateTrail();renderCourse();});
    }
  });
  updateTrail();
}

// Deferred module scripts execute with readyState 'interactive' (the document
// leaves 'loading' before they run), and course-ui.js can evaluate even earlier:
// main-v11.js statically imports it, so it runs before router.js is evaluated
// and before window.app exists. Skipping router init then leaves hash routing
// dead (Start-lesson buttons change the URL but no route ever handles it).
// All deferred scripts finish before DOMContentLoaded fires, so waiting for it
// guarantees the router and the app shell are ready before initializing.
if(document.readyState==='complete')initialize();
else document.addEventListener('DOMContentLoaded',initialize,{once:true});

// ==================== Lesson player: one idea per screen ====================
// Lessons are authored as step data in src/content/lessons.js. The player
// renders exactly one step per screen (teach -> example -> try -> harder try),
// records answers to sessionStorage, and auto-appends an "end and review"
// screen after the last step showing the learner's choices with corrections.
const PLAYER_KEY='nwsLessonPlayer.v1';
function readPlayerState(){try{return JSON.parse(sessionStorage.getItem(PLAYER_KEY))||null;}catch{return null;}}
function writePlayerState(state){try{sessionStorage.setItem(PLAYER_KEY,JSON.stringify(state));}catch{}}
function lessonContent(id){return LESSON_CONTENT[id]||null;}
function lessonSeqNum(id){return lessonSequence().indexOf(id)+1;}
function lessonModule(lesson){return MODULES.find(entry=>entry.id===lesson.moduleId);}
function initPlayerState(id,stepIdx){
  const prev=readPlayerState();
  const answers=(prev&&prev.lessonId===id&&Array.isArray(prev.answers))?prev.answers:[];
  writePlayerState({lessonId:id,idx:stepIdx,answers});
}
function playerRecord(rec){
  const ps=readPlayerState(); if(!ps)return;
  ps.answers=(ps.answers||[]).filter(a=>!(a.step===rec.step&&a.item===rec.item));
  ps.answers.push(rec); writePlayerState(ps);
}
function playerAnswerFor(step,item){
  const ps=readPlayerState();
  if(!ps||!Array.isArray(ps.answers))return null;
  return ps.answers.find(a=>a.step===step&&a.item===item)||null;
}
function sortStepDone(ps,step){
  return step.items.every((_,i)=>!!playerAnswerFor(ps.idx,i));
}
function playerStepComplete(ps){
  const content=lessonContent(ps.lessonId);
  const step=content&&content.steps[ps.idx];
  if(!step)return true;
  if(step.t==='try')return !!playerAnswerFor(ps.idx,0);
  if(step.t==='sort')return sortStepDone(ps,step);
  return true;
}
function bucketIndexOf(step,answer){
  return step.buckets.findIndex(bucket=>bucket.toLowerCase()===answer);
}
function capFirst(text){return text.charAt(0).toUpperCase()+text.slice(1);}

function lpTeach(step){return `<h2>${esc(step.h)}</h2><div class="lp-body">${step.body}</div>`;}
function lpExample(step){
  return `<h2>${esc(step.h)}</h2><p class="lp-story">${esc(step.story)}</p><ul class="lp-points">${step.points.map(point=>`<li>${point}</li>`).join('')}</ul>`;
}
function lpTry(ps,step){
  const rec=playerAnswerFor(ps.idx,0);
  const choices=step.choices.map((choice,ci)=>{
    let cls='lp-choice',mark='';
    if(rec){
      if(choice.ok){cls+=' correct';mark='<span aria-hidden="true"> ✓</span>';}
      else if(rec.choice===ci){cls+=' wrong';mark='<span aria-hidden="true"> ✗</span>';}
    }
    return `<button type="button" class="${cls}"${rec?' disabled':''} onclick="course.playerAnswer(${ci})">${esc(choice.label)}${mark}</button>`;
  }).join('');
  let extra='';
  if(!rec&&step.hint)extra=`<button type="button" class="linklike lp-hint-btn" onclick="course.playerHint(this)">Need a hint?</button><p class="lp-hint hidden">${esc(step.hint)}</p>`;
  let fb='';
  if(rec){
    const choice=step.choices[rec.choice];
    fb=`<div class="lp-feedback ${choice.ok?'good':'miss'}" role="status"><p><b>${esc(choice.ok?step.good:step.bad)}</b></p>${step.why?`<p class="lp-why">${step.why}</p>`:''}</div>`;
  }
  return `<h2>Try it</h2><p class="lp-q">${esc(step.q)}</p><div class="lp-choices">${choices}</div>${extra}${fb}`;
}
function lpSort(step){
  return `<h2>${esc(step.h)}</h2><div class="lp-body">${step.body}</div>`
  +`<div class="sort-game" data-sort><div class="sort-buckets" role="group" aria-label="Sort into buckets">`
  +step.buckets.map((bucket,bi)=>`<button type="button" class="sort-bucket" data-bucket="${bi}" onclick="course.sortPick(${bi})" aria-label="Put in ${esc(bucket)}"><span class="sort-bucket-label">${esc(bucket)}</span><span class="sort-bucket-count" data-count="${bi}">0</span></button>`).join('')
  +`</div><div class="sort-stage"><div class="sort-card" data-card></div></div><p class="sort-progress sub" data-progress></p><div class="sort-feedback hidden" data-feedback role="status"></div><button type="button" class="btn hidden" data-nextitem onclick="course.sortNext()">Next item →</button></div>`;
}
function lpSortDone(ps,step){
  const correct=step.items.filter((_,i)=>{const r=playerAnswerFor(ps.idx,i);return r&&r.correct;}).length;
  return `<h2>${esc(step.h)}</h2><div class="lp-done" role="status"><p><b>Sorted ${correct} of ${step.items.length}.</b></p><p class="sub">The full breakdown — your choices, the corrections, and why — is on the end-of-lesson review.</p><button type="button" class="btn secondary" onclick="course.playerGo(0)">Replay this sort</button></div>`;
}
function lpTool(ps,step,lesson){
  // focus is a plain slug in authored content; map it to the shape _openTool expects.
  const slug=(typeof step.focus==='string'&&/^[a-z0-9-]+$/.test(step.focus))?step.focus:null;
  let focus='null';
  if(slug&&step.screen==='pacing-value')focus=`{pacingFocus:'${slug}'}`;
  else if(slug&&step.screen==='adult-life')focus=`{adultModule:'${slug}'}`;
  const origin=`lessonstep:${lesson.id}:${ps.idx}`;
  return `<h2>${esc(step.h)}</h2><div class="lp-body">${step.body}</div><div class="lp-tool-cta"><button type="button" class="btn" onclick="course._openTool('${esc(step.screen)}','${esc(origin)}',${focus})">${esc(step.cta)} →</button><p class="sub">Opens the real tool. Your browser-back button brings you right back to this step.</p></div>`;
}
function lpNav(ps,total){
  const isLast=ps.idx===total-1;
  const prev=ps.idx>0?`<button type="button" class="btn secondary" onclick="course.playerGo(-1)">← Back</button>`:'<span></span>';
  const label=isLast?'See your review →':'Next →';
  const blocked=!playerStepComplete(ps);
  return `<div class="lp-nav">${prev}<button type="button" class="btn" data-lp-next${blocked?' disabled':''} onclick="course.playerGo(1)">${label}</button></div>`;
}

function renderPlayerStep(){
  const host=document.getElementById('lesson-player'); if(!host)return;
  const ps=readPlayerState(); if(!ps){host.innerHTML='';return;}
  const lesson=LESSONS.get(ps.lessonId);
  const content=lessonContent(ps.lessonId);
  if(!lesson||!content){host.innerHTML='';return;}
  const steps=content.steps;
  if(ps.idx>=steps.length){renderPlayerReview(host,lesson,content,ps);return;}
  const step=steps[ps.idx];
  const kicker=`Module ${lesson.moduleNumber} · Lesson ${lessonSeqNum(ps.lessonId)} of ${lessonSequence().length} · Step ${ps.idx+1} of ${steps.length}`;
  let body='';
  if(step.t==='teach')body=lpTeach(step);
  else if(step.t==='example')body=lpExample(step);
  else if(step.t==='try')body=lpTry(ps,step);
  else if(step.t==='sort')body=sortStepDone(ps,step)?lpSortDone(ps,step):lpSort(step);
  else if(step.t==='tool')body=lpTool(ps,step,lesson);
  else body=lpTeach({h:'Lesson',body:'<p>Content coming right up.</p>'});
  host.innerHTML=`<div class="lp-wrap"><p class="lp-kicker">${esc(kicker)}</p><div class="lp-card">${body}</div>${lpNav(ps,steps.length)}</div>`;
  if(step.t==='sort'&&!sortStepDone(ps,step))initSortGame(ps,step);
  const card=host.querySelector('.lp-card');
  if(card)card.scrollIntoView({block:'start',behavior:'auto'});
}

function renderPlayerReview(host,lesson,content,ps){
  const seq=lessonSequence();
  const li=seq.indexOf(ps.lessonId);
  const nextId=seq[li+1]||null;
  const answers=(ps.answers||[]).filter(a=>a.choice!==undefined||a.bucket!==undefined);
  const isCorrect=a=>{
    if(a.bucket!==undefined)return !!a.correct;
    const step=content.steps[a.step];
    const choice=step&&step.choices[a.choice];
    return !!(choice&&choice.ok);
  };
  const correct=answers.filter(isCorrect).length;
  const total=answers.length;
  let items='';
  if(!total){
    items=`<div class="lp-ritem"><p><b>${esc(content.intro)}</b></p><p class="sub">This lesson had no questions — the idea above is the whole takeaway.</p></div>`;
  }else{
    items=answers.map(a=>{
      const step=content.steps[a.step];
      let q,chose,correctLabel,why,ok;
      if(a.bucket!==undefined){
        const item=step.items[a.item];
        q='Sort: '+item.label;
        chose=step.buckets[a.bucket];
        correctLabel=step.buckets[bucketIndexOf(step,item.a)]||capFirst(item.a);
        why=item.why; ok=!!a.correct;
      }else{
        const choice=step.choices[a.choice];
        q=step.q; chose=choice.label;
        const ci=step.choices.findIndex(c=>c.ok);
        correctLabel=step.choices[ci]?step.choices[ci].label:'';
        why=step.why; ok=!!choice.ok;
      }
      return `<div class="lp-ritem ${ok?'ok':'miss'}"><p class="lp-ri-q">${esc(q)}</p><p class="lp-ri-a">You chose <b>${esc(chose)}</b> ${ok?'<span class="tag good-tag">Correct</span>':`<span class="tag miss-tag">Correct answer: <b>${esc(correctLabel)}</b></span>`}</p>${why?`<p class="lp-ri-why">${why}</p>`:''}</div>`;
    }).join('');
  }
  const pct=total?Math.round(correct/total*100):100;
  const verdict=!total?'':pct===100?'Perfect run — the routine is yours.':pct>=70?'Solid. The misses are the interesting part — read the why.':'Worth a second pass. Redo the lesson, then try again.';
  host.innerHTML=`<div class="lp-wrap"><p class="lp-kicker">Module ${lesson.moduleNumber} · Lesson ${lessonSeqNum(ps.lessonId)} of ${seq.length} · End-of-lesson review</p>`
  +`<div class="lp-card lp-review"><h2>End of lesson review</h2>${total?`<p class="lp-score">You got <b>${correct} of ${total}</b> right. ${esc(verdict)}</p>`:`<p class="lp-score">Review of what this lesson covered.</p>`}<div class="lp-review-list">${items}</div></div>`
  +`<div class="lp-nav"><button type="button" class="btn secondary" onclick="course.playerGo(-1)">← Back into the lesson</button><button type="button" class="btn secondary" onclick="course.playerRedo()">Redo lesson</button>${nextId?`<button type="button" class="btn" onclick="course.openLesson('${esc(nextId)}')">Next lesson →</button>`:`<button type="button" class="btn" onclick="course.openModulePage('${esc(lesson.moduleId)}')">Back to Module ${lesson.moduleNumber} →</button>`}</div></div>`;
  document.title=`Review: ${lesson.title} — NWS Money Masterclass`;
  host.scrollIntoView({block:'start',behavior:'auto'});
}

// ---------- Player interactions ----------
function playerGo(delta){
  const ps=readPlayerState(); if(!ps)return;
  const content=lessonContent(ps.lessonId);
  const total=content?content.steps.length:0;
  const nextIdx=ps.idx+delta;
  if(nextIdx<0||nextIdx>total)return;
  openLesson(ps.lessonId,nextIdx);
}
function playerAnswer(choiceIdx){
  const ps=readPlayerState(); if(!ps)return;
  const content=lessonContent(ps.lessonId);
  const step=content&&content.steps[ps.idx];
  if(!step||step.t!=='try')return;
  if(playerAnswerFor(ps.idx,0))return;
  playerRecord({step:ps.idx,item:0,choice:choiceIdx});
  renderPlayerStep();
  const fb=document.querySelector('#lesson-player .lp-feedback');
  if(fb)fb.scrollIntoView({block:'nearest',behavior:'smooth'});
}
function playerHint(btn){
  const hint=btn&&btn.nextElementSibling;
  if(!hint||!hint.classList.contains('lp-hint'))return;
  hint.classList.toggle('hidden');
  btn.textContent=hint.classList.contains('hidden')?'Need a hint?':'Hide hint';
}
function playerRedo(){
  const ps=readPlayerState(); if(!ps)return;
  writePlayerState({lessonId:ps.lessonId,idx:0,answers:[]});
  openLesson(ps.lessonId,0);
}

// ---------- Animated sort game (Module 1 decision routine) ----------
let sortGame=null;
function initSortGame(ps,step){
  // After a reload, resume at the first unanswered item instead of replaying
  // answered ones (re-answering would just overwrite the same records).
  let start=0;
  while(start<step.items.length&&playerAnswerFor(ps.idx,start))start++;
  sortGame={stepIdx:ps.idx,itemIdx:start,step,done:false};
  sortShowItem();
}
function sortShowItem(){
  const g=sortGame; if(!g)return;
  const host=document.querySelector('#lesson-player [data-sort]'); if(!host)return;
  if(g.itemIdx>=g.step.items.length){sortFinish(host);return;}
  const item=g.step.items[g.itemIdx];
  const card=host.querySelector('[data-card]');
  card.style.visibility=''; card.style.transform=''; card.style.opacity='';
  card.textContent=item.label;
  card.style.animation='none'; void card.offsetWidth; card.style.animation='';
  host.querySelector('[data-progress]').textContent=`Item ${g.itemIdx+1} of ${g.step.items.length}`;
  const fb=host.querySelector('[data-feedback]'); fb.classList.add('hidden'); fb.innerHTML='';
  host.querySelector('[data-nextitem]').classList.add('hidden');
  host.querySelectorAll('[data-bucket]').forEach(btn=>{btn.disabled=false;});
  g.done=false;
}
function sortPick(bucketIdx){
  const g=sortGame; if(!g||g.done)return;
  const ps=readPlayerState(); if(!ps||ps.idx!==g.stepIdx)return;
  const item=g.step.items[g.itemIdx];
  const correct=g.step.buckets[bucketIdx].toLowerCase()===item.a;
  g.done=true;
  const host=document.querySelector('#lesson-player [data-sort]'); if(!host)return;
  host.querySelectorAll('[data-bucket]').forEach(btn=>{btn.disabled=true;});
  const card=host.querySelector('[data-card]');
  const bucketBtn=host.querySelector(`[data-bucket="${bucketIdx}"]`);
  const showResult=()=>{
    bucketBtn.classList.add(correct?'flash-ok':'flash-bad');
    setTimeout(()=>bucketBtn.classList.remove('flash-ok','flash-bad'),1400);
    const count=host.querySelector(`[data-count="${bucketIdx}"]`);
    count.textContent=String(Number(count.textContent||'0')+1);
    playerRecord({step:g.stepIdx,item:g.itemIdx,bucket:bucketIdx,correct});
    const fb=host.querySelector('[data-feedback]');
    const rightBucket=g.step.buckets[bucketIndexOf(g.step,item.a)]||capFirst(item.a);
    fb.innerHTML=correct
      ?`<p><b>Correct.</b></p><p class="lp-why">${item.why}</p>`
      :`<p><b>Not quite — the right bucket was ${esc(rightBucket)}.</b></p><p class="lp-why">${item.why}</p>`;
    fb.classList.remove('hidden'); fb.classList.add(correct?'good':'miss'); fb.classList.remove(correct?'miss':'good');
    const nextBtn=host.querySelector('[data-nextitem]');
    nextBtn.textContent=g.itemIdx+1>=g.step.items.length?'See results →':'Next item →';
    nextBtn.classList.remove('hidden');
    nextBtn.focus({preventScroll:true});
  };
  const reduceMotion=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduceMotion||!card||!bucketBtn){showResult();return;}
  const cr=card.getBoundingClientRect(), br=bucketBtn.getBoundingClientRect();
  const dx=br.left+br.width/2-(cr.left+cr.width/2);
  const dy=br.top+br.height/2-(cr.top+cr.height/2);
  card.style.transform=`translate(${dx}px,${dy}px) scale(.55)`;
  card.style.opacity='0';
  setTimeout(()=>{card.style.visibility='hidden';showResult();},400);
}
function sortNext(){
  const g=sortGame; if(!g)return;
  g.itemIdx+=1;
  sortShowItem();
}
function sortFinish(host){
  sortGame=null;
  renderPlayerStep();
}

Object.assign(window.course,{playerGo,playerAnswer,playerHint,playerRedo,sortPick,sortNext});
