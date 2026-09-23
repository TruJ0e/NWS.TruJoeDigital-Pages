import { loadState } from './state.js';
import { dueDelayedChecks } from './retrieval.js';
import { dueRecoveryFollowups } from './recovery-followup.js';

const COURSE_STATE_KEY='nwsCourseShell.v1';
const CONTEXT_KEY='nwsCourseShell.context';
const PACING_FOCUS_KEY='nwsCourseShell.pacingFocus';
const ADULT_FOCUS_KEY='nwsCourseShell.adultLifeFocus';

const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot',"'":'&#39;'}[c]));

export const MODULES=[
  {
    id:'foundations',number:1,title:'Money Foundations',
    summary:'Learn what money is for before deciding what to do with it.',
    lessons:[
      {id:'nws-routine',title:'Needs, Wants, Savings',summary:'Use NWS as a decision tool, not a moral label.',screen:'home',kind:'tool',toolKind:'Dashboard'},
      {id:'available-money',title:'What money is actually available?',summary:'Separate the visible balance from money that already has a job.',screen:'money',kind:'tool',toolKind:'Dashboard'},
      {id:'depends-decisions',title:'Needs, Wants, and “it depends”',summary:'Practice contextual choices instead of memorizing rigid categories.',screen:'spend',kind:'practice'}
    ]
  },
  {
    id:'pacing',number:2,title:'Make Money Last',
    summary:'Learn to divide money by both purpose and time.',
    lessons:[
      {id:'pacing-basics',title:'Pacing money over time',summary:'Turn a weekly, monthly, or semester amount into a usable pace.',screen:'pacing-value',pacingFocus:'pacing',kind:'lesson'},
      {id:'safe-to-spend',title:'Balance vs. safe to spend',summary:'Protect future Needs and planned savings before calling money flexible.',screen:'pacing-value',pacingFocus:'safe',kind:'lesson'},
      {id:'savings-purpose',title:'Savings is money for later',summary:'Savings can become a future Need, emergency resource, or planned goal.',screen:'pacing-value',pacingFocus:'savings-purpose',kind:'lesson'},
      {id:'irregular-income',title:'Irregular income',summary:'Plan without pretending money that has not arrived is guaranteed.',screen:'pacing-value',pacingFocus:'irregular',kind:'lesson'},
      {id:'semester-plan',title:'Plan a longer time period',summary:'Break a semester lump sum or paycheck cycle into smaller usable periods.',screen:'plan',kind:'tool',toolKind:'Calculator'}
    ]
  },
  {
    id:'value',number:3,title:'Spend Smart',
    summary:'A lower price is useful only when it fits the plan and creates real value.',
    lessons:[
      {id:'sales-decisions',title:'Sales and discounts',summary:'A discount is not savings when it causes an unnecessary purchase.',screen:'spend',kind:'practice'},
      {id:'usable-value',title:'Quantity, unit price, and waste',summary:'Compare the amount you will actually use, not just package size.',screen:'pacing-value',pacingFocus:'value',kind:'lesson'},
      {id:'gas-value',title:'Gas price vs. travel cost',summary:'Count the cost of getting the deal before calling it a savings.',screen:'pacing-value',pacingFocus:'gas',kind:'lesson'},
      {id:'subscriptions-lesson',title:'Subscriptions and recurring costs',summary:'Turn small repeating charges into monthly and yearly decisions.',screen:'subscriptions',kind:'tool',toolKind:'Calculator'}
    ]
  },
  {
    id:'adult-money',number:4,title:'Everyday Adult Money',
    summary:'Learn the financial processes that appear when support shifts toward independent living.',
    lessons:[
      {id:'banking',title:'Banking and overdrafts',summary:'Track pending obligations instead of trusting only the displayed balance.',screen:'adult-life',adultModule:'banking',kind:'lesson'},
      {id:'first-job',title:'Paychecks and tax paperwork',summary:'Use take-home pay and recognize the basic employment paperwork sequence.',screen:'adult-life',adultModule:'first-job',kind:'lesson'},
      {id:'credit',title:'Credit and borrowing',summary:'Treat credit as borrowed money with a future obligation.',screen:'adult-life',adultModule:'credit',kind:'lesson'},
      {id:'scams',title:'Scams and payment safety',summary:'Use a stop-and-verify routine when someone creates urgency around money.',screen:'adult-life',adultModule:'scams',kind:'lesson'}
    ]
  },
  {
    id:'living-costs',number:5,title:'Living Costs',
    summary:'Plan the real bundles of costs that come with housing, food, transportation, and health care.',
    lessons:[
      {id:'renting',title:'Renting and leases',summary:'Look beyond advertised rent to written rules, fees, utilities, and recurring costs.',screen:'adult-life',adultModule:'renting',kind:'lesson'},
      {id:'utilities',title:'Utilities and home bills',summary:'Plan variable recurring costs, due dates, and setup responsibilities.',screen:'adult-life',adultModule:'utilities',kind:'lesson'},
      {id:'groceries',title:'Groceries and meal planning',summary:'Plan from what will actually be eaten, prepared, stored, and used.',screen:'adult-life',adultModule:'groceries',kind:'lesson'},
      {id:'transportation',title:'Transportation choices',summary:'Compare the whole transportation cost, not one payment or one trip.',screen:'adult-life',adultModule:'transportation',kind:'lesson'},
      {id:'health-insurance',title:'Health insurance and medical costs',summary:'Compare premiums with the other major cost-sharing terms.',screen:'adult-life',adultModule:'health-insurance',kind:'lesson'}
    ]
  },
  {
    id:'support',number:6,title:'Future Money and Support',
    summary:'Protect future needs, understand changing benefits information, and prepare for unexpected changes.',
    lessons:[
      {id:'future-needs',title:'Future Needs and emergency money',summary:'Reserve money for predictable irregular costs before they become emergencies.',screen:'save',kind:'tool',toolKind:'Calculator'},
      {id:'benefits-lesson',title:'Benefits basics',summary:'Use current, versioned information instead of memorizing rules that can change.',screen:'benefits',kind:'lesson'},
      {id:'decision-routine',title:'Put the whole routine together',summary:'Use the same money questions across new situations.',screen:'pacing-value',pacingFocus:'routine',kind:'lesson'}
    ]
  }
];

const LESSONS=new Map(MODULES.flatMap(module=>module.lessons.map(lesson=>[lesson.id,{...lesson,moduleId:module.id,moduleTitle:module.title,moduleNumber:module.number}])));
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

function kindLabel(lesson){
  if(lesson.kind==='practice') return 'Practice';
  if(lesson.kind==='tool') return lesson.toolKind||'Tool';
  return 'Lesson';
}

function lessonButton(lesson){
  const visited=!!readCourseState().visited[lesson.id];
  return `<button type="button" class="course-lesson" onclick="course.openLesson('${esc(lesson.id)}')"><span class="course-lesson-meta"><b>${esc(lesson.title)}</b><small>${esc(lesson.summary)}</small></span><span class="tag course-kind">${esc(kindLabel(lesson))}</span><span class="course-lesson-action">${visited?'Open again':'Start'}</span></button>`;
}

function moduleLessonGroups(module){
  const lessons=module.lessons.filter(l=>l.kind!=='tool'&&l.kind!=='practice');
  const tools=module.lessons.filter(l=>l.kind==='tool'||l.kind==='practice');
  let html=`<div class="course-lesson-list" aria-label="Lessons">${lessons.map(lessonButton).join('')}</div>`;
  if(tools.length) html+=`<div class="course-tools-head"><span>Practice &amp; tools in this module</span></div><div class="course-lesson-list" aria-label="Practice and tools">${tools.map(lessonButton).join('')}</div>`;
  return html;
}

function renderCourse(){
  const host=document.getElementById('course'); if(!host)return;
  const state=readCourseState();
  const allLessons=MODULES.flatMap(module=>module.lessons);
  const next=allLessons.find(lesson=>!state.visited[lesson.id])||allLessons[0];
  host.innerHTML=`<div class="hero course-hero"><span class="tag">NWS Course</span><h2>Your course</h2><p class="sub">Work through the modules in order — lessons first, then practice. Reviews, references, and simulations each have their own place.</p><div class="course-flow" aria-label="Course flow"><span><b>1</b> Modules</span><span><b>2</b> Practice</span><span><b>3</b> Reviews</span><span><b>4</b> Quick References</span><span><b>5</b> Simulations</span></div><div class="row"><button class="btn" type="button" onclick="course.openLesson('${esc(next.id)}')">${Object.keys(state.visited).length?'Continue course':'Start Module 1'}</button><span class="sub">Visits are shown for navigation only — they are not a mastery score.</span></div></div><div class="section-title"><div><h2>Modules</h2><p>Recommended order. Nothing is locked.</p></div></div><div class="stack course-modules">${MODULES.map(module=>{const visited=module.lessons.filter(lesson=>state.visited[lesson.id]).length;return `<article class="card course-module"><div class="course-module-head"><div><span class="course-module-number">Module ${module.number}</span><h3>${esc(module.title)}</h3><p class="sub">${esc(module.summary)}</p></div><span class="tag">${visited}/${module.lessons.length} visited</span></div>${moduleLessonGroups(module)}</article>`;}).join('')}</div>`;
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
  host.innerHTML=`<div class="hero"><span class="tag">Practice</span><h2>Practice what you learned</h2><p class="sub">Try a skill after its lesson. Practice is separate from lessons on purpose — learning first, then doing.</p></div><div class="course-card-grid">${PRACTICE_ITEMS.map(([title,text,screen])=>`<button type="button" class="card course-action-card" onclick="course.openTool('${screen}','practice-hub')"><span class="tag">Practice</span><h3>${esc(title)}</h3><p>${esc(text)}</p><b>Open practice →</b></button>`).join('')}</div>`;
}

function renderReviews(){
  const host=document.getElementById('reviews'); if(!host)return;
  const state=loadState();
  const ordinary=dueDelayedChecks(state).length;
  const recovery=dueRecoveryFollowups(state).length;
  const total=ordinary+recovery;
  host.innerHTML=`<div class="hero"><span class="tag">Reviews</span><h2>Review after time has passed</h2><p class="sub">Reviews bring back older material so it sticks. A review is not another lesson, and it is not a simulation.</p><div class="stats"><div class="stat"><span>Due now</span><b>${total}</b></div><div class="stat"><span>Regular reviews</span><b>${ordinary}</b></div><div class="stat"><span>Recovery follow-ups</span><b>${recovery}</b></div></div><div style="height:14px"></div><button class="btn" type="button" onclick="course.openTool('progress','reviews')">${total?'Start due reviews':'Open review center'}</button></div><div class="section-title"><h2>What belongs here?</h2></div><div class="card"><ul><li>Recalling material you learned earlier, after time has passed.</li><li>A follow-up in a changed situation, after a recovery attempt.</li><li>Revisiting a module when a review shows the idea needs more teaching.</li></ul><p class="sub">Reviews check what stuck — not just what you finished.</p></div>`;
}

function refCard(title,body){return `<div class="card quick-ref"><h3>${esc(title)}</h3>${body}</div>`;}
function renderReferences(){
  const host=document.getElementById('references'); if(!host)return;
  host.innerHTML=`<div class="hero"><span class="tag">Quick References</span><h2>Look it up without reopening a whole lesson</h2><p class="sub">Short reminders only. Use these during practice or real-life planning when you already learned the skill and just need the steps.</p></div><div class="course-card-grid refs-grid">${refCard('NWS','<p><b>Need:</b> required for health, safety, access, responsibilities, or functioning in the current situation.</p><p><b>Want:</b> optional or flexible in the current situation.</p><p><b>Savings:</b> money moved from available now to available later. It can later pay for a Need or a goal.</p><p><b>“It depends” is valid.</b> Context can change the category.</p>')}${refCard('Safe to spend','<p><b>Visible balance − known future Needs − protected savings = flexible / safe-to-spend money.</b></p><p>The account balance answers “what exists?” Safe to spend answers “what can I use without taking money from another job?”</p>')}${refCard('Money pacing','<p><b>Remaining flexible money ÷ remaining time = new pace.</b></p><p>When spending changes, do not keep the old pace. Recalculate from what remains.</p>')}${refCard('Is it really a deal?','<ol><li>Was I already going to buy it?</li><li>Will I actually use the quantity?</li><li>What is the usable unit cost?</li><li>Does buying extra interfere with later Needs?</li><li>Does getting the deal add travel, time, or other cost?</li></ol>')}${refCard('Gas comparison','<p><b>Pump-price savings − extra-trip fuel cost = practical fuel savings.</b></p><p>If the stop is already on your route, the extra-trip miles may be zero.</p>')}${refCard('When the plan changes','<p>You cannot change money already spent, but you can change what happens next.</p><ol><li>Find money remaining.</li><li>Find time remaining.</li><li>Protect required costs.</li><li>Choose what can change or wait.</li><li>Set a new pace.</li></ol>')}<button type="button" class="card course-action-card" onclick="course.openTool('benefits','references')"><span class="tag info">Versioned reference</span><h3>Benefits information</h3><p>Open current SSI, SSDI, and ABLE reference information. These figures and rules require version checks.</p><b>Open benefits reference →</b></button></div>`;
}

function renderSimulations(){
  const host=document.getElementById('simulations'); if(!host)return;
  host.innerHTML=`<div class="hero"><span class="tag">Simulations</span><h2>Put multiple skills together</h2><p class="sub">Simulations come after teaching and practice. They combine decisions, consequences, changing conditions, and recovery without turning one run into a mastery score.</p></div><div class="course-card-grid"><button type="button" class="card course-action-card" onclick="course.openTool('week','simulations')"><span class="tag">Short simulation</span><h3>Scenario Practice</h3><p>Work through one contained money period with Needs, Wants, savings, and recurring choices.</p><b>Start scenario →</b></button><button type="button" class="card course-action-card" onclick="course.openTool('life-sim','simulations')"><span class="tag">Full simulation</span><h3>Independent Life Simulation</h3><p>Carry money, obligations, debt, savings, unexpected costs, and consequences across multiple periods.</p><b>Start life simulation →</b></button><button type="button" class="card course-action-card" onclick="course.openTool('plan','simulations')"><span class="tag">Responsibility transfer</span><h3>Increase independence gradually</h3><p>Move from more support toward less support while keeping the same decision routine.</p><b>Open transfer sequence →</b></button></div>`;
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

function updateTrail(){
  const trail=document.getElementById('courseTrail'); if(!trail)return;
  const active=document.querySelector('main .screen.active')?.id;
  if(!active||HUBS.has(active)||ADVISOR.has(active)){
    trail.classList.add('hidden');
    document.title='NWS Money Masterclass';
    return;
  }
  const ctx=currentContext();
  const matching=ctx?.screen===active?ctx:null;
  const origin=matching?.origin||DEFAULT_ORIGIN[active]||'course';
  const originLabel=AREA_LABELS[origin]||'Modules';
  const title=matching?.title||document.querySelector(`#${CSS.escape(active)} h2`)?.textContent||'Course activity';
  document.title=`${title} — NWS Money Masterclass`;
  // Prev / next across the full lesson sequence, with in-lesson progress.
  let flow='';
  const lessonId=matching?.lessonId;
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
    flow=`<div class="trail-flow"><span class="trail-progress">${stepWord} ${idx+1} of ${seq.length}</span><span class="trail-nav">`
      +(prev?`<button type="button" class="btn secondary" onclick="course.openLesson('${esc(prev.id)}')" aria-label="Previous ${nounOf(prev)}: ${esc(prev.title)}">← ${esc(prev.title)}</button>`:'<span></span>')
      +(next?`<button type="button" class="btn" onclick="course.openLesson('${esc(next.id)}')" aria-label="Next ${nounOf(next)}: ${esc(next.title)}">${esc(next.title)} →</button>`:'<span></span>')
      +`</span></div>`;
  }
  trail.innerHTML=`<button type="button" class="btn secondary" onclick="course.back('${esc(origin)}')">← Back to ${esc(originLabel)}</button><div class="trail-title"><small>${esc(originLabel)}</small><span class="trail-sep" aria-hidden="true">›</span><b>${esc(title)}</b></div>${flow}`;
  trail.classList.remove('hidden');
}

// Internal: actually opens the lesson (called by the router after the hash changes).
function _openLesson(id){
  const lesson=LESSONS.get(id); if(!lesson)return;
  markVisited(id); setFocus(lesson);
  setContext({screen:lesson.screen,origin:'course',title:`Module ${lesson.moduleNumber}: ${lesson.title}`,lessonId:id});
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
  setContext({screen,origin,title:screen==='week'?'Scenario Practice':screen==='life-sim'?'Independent Life Simulation':null});
  if(screen==='pacing-value')window.pacingValue?.setCourseFocus?.(null);
  if(screen==='adult-life')window.nwsAdultLifeOpenModule?.(null,false);
  window.app?.show?.(screen);
  queueMicrotask(updateTrail);
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

window.course={openLesson,openTool,back,_openLesson,_openTool,render:()=>{renderCourse();renderPractice();renderReviews();renderReferences();renderSimulations();updateTrail();}};

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
        // titles, and focus match the tool instead of a stale lesson.
        clearFocus();
        setContext({screen,origin:toolOrigin||'practice-hub',title:null});
        if(screen==='pacing-value')window.pacingValue?.setCourseFocus?.(null);
        if(screen==='adult-life')window.nwsAdultLifeOpenModule?.(null,false);
      }
      window.app?.show?.(screen,{restoreScroll:restore});
      queueMicrotask(updateTrail);
    }
  });
  updateTrail();
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initialize,{once:true});else initialize();
