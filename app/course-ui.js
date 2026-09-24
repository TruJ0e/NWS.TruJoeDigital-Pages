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
    summary:'Learn what money is for before deciding what to do with it.',
    lessons:[
      {id:'nws-routine',est:8,title:'Needs, Wants, Savings',summary:'Use NWS as a decision tool, not a moral label.',screen:'home',kind:'tool',toolKind:'Dashboard'},
      {id:'available-money',est:8,title:'What money is actually available?',summary:'Separate the visible balance from money that already has a job.',screen:'money',kind:'tool',toolKind:'Dashboard'},
      {id:'depends-decisions',est:12,title:'Needs, Wants, and “it depends”',summary:'Practice contextual choices instead of memorizing rigid categories.',screen:'spend',kind:'practice'}
    ]
  },
  {
    id:'pacing',number:2,title:'Make Money Last',
    summary:'Learn to divide money by both purpose and time.',
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
    summary:'A lower price is useful only when it fits the plan and creates real value.',
    lessons:[
      {id:'sales-decisions',est:12,title:'Sales and discounts',summary:'A discount is not savings when it causes an unnecessary purchase.',screen:'spend',kind:'practice'},
      {id:'usable-value',est:8,title:'Quantity, unit price, and waste',summary:'Compare the amount you will actually use, not just package size.',screen:'pacing-value',pacingFocus:'value',kind:'lesson'},
      {id:'gas-value',est:7,title:'Gas price vs. travel cost',summary:'Count the cost of getting the deal before calling it a savings.',screen:'pacing-value',pacingFocus:'gas',kind:'lesson'},
      {id:'subscriptions-lesson',est:10,title:'Subscriptions and recurring costs',summary:'Turn small repeating charges into monthly and yearly decisions.',screen:'subscriptions',kind:'tool',toolKind:'Calculator'}
    ]
  },
  {
    id:'adult-money',number:4,title:'Everyday Adult Money',
    summary:'Learn the financial processes that appear when support shifts toward independent living.',
    lessons:[
      {id:'banking',est:8,title:'Banking and overdrafts',summary:'Track pending obligations instead of trusting only the displayed balance.',screen:'adult-life',adultModule:'banking',kind:'lesson'},
      {id:'first-job',est:8,title:'Paychecks and tax paperwork',summary:'Use take-home pay and recognize the basic employment paperwork sequence.',screen:'adult-life',adultModule:'first-job',kind:'lesson'},
      {id:'credit',est:8,title:'Credit and borrowing',summary:'Treat credit as borrowed money with a future obligation.',screen:'adult-life',adultModule:'credit',kind:'lesson'},
      {id:'scams',est:6,title:'Scams and payment safety',summary:'Use a stop-and-verify routine when someone creates urgency around money.',screen:'adult-life',adultModule:'scams',kind:'lesson'}
    ]
  },
  {
    id:'living-costs',number:5,title:'Living Costs',
    summary:'Plan the real bundles of costs that come with housing, food, transportation, and health care.',
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
    summary:'Protect future needs, understand changing benefits information, and prepare for unexpected changes.',
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

const HUBS=new Set(['course','practice-hub','reviews','references','simulations']);
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

function lessonButton(lesson,stepNum){
  const visited=!!readCourseState().visited[lesson.id];
  return `<button type="button" class="course-lesson${visited?' visited':''}" aria-label="${esc(lesson.title)}${visited?' (visited)':''}" onclick="course.openLesson('${esc(lesson.id)}')"><span class="course-step-num" aria-hidden="true">${stepNum}</span><span class="course-lesson-meta"><b>${esc(lesson.title)}</b><small>${esc(lesson.summary)}</small></span><span class="tag course-kind">${esc(kindTag(lesson))}</span><span class="course-est">${lesson.est} min</span><span class="course-check" aria-hidden="true">✓</span><span class="course-lesson-action">${visited?'Open again':'Start'}</span></button>`;
}

function moduleLessonGroups(module){
  let stepNum=0;
  const group=list=>list.map(lesson=>{stepNum+=1;return lessonButton(lesson,stepNum);}).join('');
  const lessons=module.lessons.filter(l=>l.kind!=='tool'&&l.kind!=='practice');
  const tools=module.lessons.filter(l=>l.kind==='tool'||l.kind==='practice');
  let html=`<div class="course-lesson-list" aria-label="Lessons">${group(lessons)}</div>`;
  if(tools.length) html+=`<div class="course-tools-head"><span>Practice &amp; tools in this module</span></div><div class="course-lesson-list" aria-label="Practice and tools">${group(tools)}</div>`;
  return html;
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
+`<div class="section-title"><div><h2>Course outline</h2><p>Recommended order. Nothing is locked.</p></div></div><div class="stack course-modules">${MODULES.map(module=>{const visited=module.lessons.filter(lesson=>state.visited[lesson.id]).length;return `<article class="card course-module"><div class="course-module-head"><span class="course-module-num" aria-hidden="true">${module.number}</span><div><span class="course-module-kicker">Module ${module.number}</span><h3>${esc(module.title)}</h3><p class="sub">${esc(module.summary)}</p></div><span class="tag">${visited}/${module.lessons.length} visited</span></div><p class="course-module-meta"><span>${module.lessons.length} steps</span><span aria-hidden="true">·</span><span>about ${moduleMinutes(module)} min</span></p>${moduleLessonGroups(module)}</article>`;}).join('')}</div>`
+`<section class="card course-simple-card" aria-label="Simple mode"><span class="tag">Easier mode</span><h3>Want the calm version? Try Simple mode.</h3><p>Same money skills, one step at a time, in plain language.</p><a class="btn" href="./simple.html">Open Simple mode →</a></section>`
+`<div class="section-title"><div><h2>What you will walk away with</h2><p>Real routines, not just information.</p></div></div><div class="card"><ul class="course-outcomes"><li>Sort any expense into <b>Need</b>, <b>Want</b>, or <b>Savings</b> — and handle the “it depends” cases.</li><li>Turn a paycheck or a semester lump sum into a weekly pace you can actually follow.</li><li>Read the real <b>safe-to-spend</b> number instead of trusting the account balance.</li><li>Judge sales, subscriptions, and bulk deals by usable value, not sticker price.</li><li>Handle banking, paychecks, credit, and scams without learning the hard way.</li><li>Plan housing, food, transport, and health costs as one real budget.</li><li>Protect future needs with emergency money — and one decision routine that travels.</li></ul></div><div class="callout good"><b>When you finish:</b> visit all ${total} steps and you will have worked through every core money routine once. Visits are saved on this device for navigation only — they are not a mastery score, and there is no exam waiting at the end.</div>`;
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
  if(!active||HUBS.has(active)||ADVISOR.has(active)){
    trail.classList.add('hidden');
    if(panel)panel.classList.add('hidden');
    document.title='NWS Money Masterclass';
    return;
  }
  const ctx=currentContext();
  const matching=ctx?.screen===active?ctx:null;
  const origin=matching?.origin||DEFAULT_ORIGIN[active]||'course';
  const originLabel=AREA_LABELS[origin]||'Modules';
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
    const cur=LESSONS.get(lessonId);
    const prev=idx>0?LESSONS.get(seq[idx-1]):null;
    const next=idx>=0&&idx<seq.length-1?LESSONS.get(seq[idx+1]):null;
    // The sequence mixes real lessons with dashboards, calculators, and practice,
    // so the counter says "Lesson" only for actual lessons — "Step" otherwise.
    const stepWord=cur&&cur.kind==='lesson'?'Lesson':'Step';
    const nounOf=l=>!l||l.kind==='lesson'?'lesson':l.kind==='practice'?'practice':'tool';
    const pct=idx>=0?Math.round((idx+1)/seq.length*100):0;
    flow=`<div class="trail-flow"><span class="trail-progress">${stepWord} ${idx+1} of ${seq.length}</span><span class="progressbar trail-meter" role="progressbar" aria-valuemin="0" aria-valuemax="${seq.length}" aria-valuenow="${idx+1}" aria-label="Lesson progress"><i style="width:${pct}%"></i></span><span class="trail-nav">`
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
function _openLesson(id){
  const lesson=LESSONS.get(id); if(!lesson)return;
  markVisited(id); setFocus(lesson);
  // A newly opened lesson re-arms the resume banner: returning home afterwards
  // offers this step again until the learner dismisses it.
  try{sessionStorage.removeItem(RESUME_DISMISSED_KEY);}catch{}
  setContext({screen:lesson.screen,origin:'course',title:lesson.title,moduleNumber:lesson.moduleNumber,moduleTitle:lesson.moduleTitle,lessonId:id});
  window.app?.show?.(lesson.screen);
  queueMicrotask(()=>{
    if(lesson.screen==='pacing-value')window.pacingValue?.setCourseFocus?.(lesson.pacingFocus||null);
    if(lesson.screen==='adult-life')window.nwsAdultLifeOpenModule?.(lesson.adultModule,true);
    updateTrail(); renderCourse();
  });
}

// Public: lesson buttons call this; navigation goes through the hash so lessons are
// deep-linkable, refresh-safe, and work with the browser back button.
function openLesson(id){
  const lesson=LESSONS.get(id); if(!lesson||!window.NWSRouter) return _openLesson(id);
  const hash=window.NWSRouter.lessonHash(lesson);
  if((location.hash||'')===hash) _openLesson(id);
  else location.hash=hash;
}

function _openTool(screen,origin='practice-hub'){
  clearFocus();
  // Direct tool opens visit their step too (see TOOL_STEP_BY_SCREEN), so the
  // home bar, outline, and trail meter stay consistent with the visited set.
  markToolStepVisited(screen);
  setContext({screen,origin,title:screen==='week'?'Scenario Practice':screen==='life-sim'?'Independent Life Simulation':null});
  if(screen==='pacing-value')window.pacingValue?.setCourseFocus?.(null);
  if(screen==='adult-life')window.nwsAdultLifeOpenModule?.(null,false);
  window.app?.show?.(screen);
  queueMicrotask(()=>{updateTrail();renderCourse();});
}

function openTool(screen,origin='practice-hub'){
  if(!window.NWSRouter) return _openTool(screen,origin);
  const hash=window.NWSRouter.toolHash(screen);
  try{sessionStorage.setItem('nwsToolOrigin',origin);}catch{}
  if((location.hash||'')===hash) _openTool(screen,origin);
  else location.hash=hash;
}

function back(origin='course'){
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

window.course={openLesson,openTool,back,toggleOutline,dismissResume,_openLesson,_openTool,render:()=>{renderCourse();renderPractice();renderReviews();renderReferences();renderSimulations();updateTrail();}};

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
    openLesson:_openLesson,
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
