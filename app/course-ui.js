import { loadState } from './state.js';
import { dueDelayedChecks } from './retrieval.js';
import { dueRecoveryFollowups } from './recovery-followup.js';

const COURSE_STATE_KEY='nwsCourseShell.v1';
const CONTEXT_KEY='nwsCourseShell.context';
const PACING_FOCUS_KEY='nwsCourseShell.pacingFocus';
const ADULT_FOCUS_KEY='nwsCourseShell.adultLifeFocus';

const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot',"'":'&#39;'}[c]));

const MODULES=[
  {
    id:'foundations',number:1,title:'Money Foundations',
    summary:'Learn what money is for before deciding what to do with it.',
    lessons:[
      {id:'nws-routine',title:'Needs, Wants, Savings',summary:'Use NWS as a decision tool, not a moral label.',screen:'home'},
      {id:'available-money',title:'What money is actually available?',summary:'Separate the visible balance from money that already has a job.',screen:'money'},
      {id:'depends-decisions',title:'Needs, Wants, and “it depends”',summary:'Practice contextual choices instead of memorizing rigid categories.',screen:'spend'}
    ]
  },
  {
    id:'pacing',number:2,title:'Make Money Last',
    summary:'Learn to divide money by both purpose and time.',
    lessons:[
      {id:'pacing-basics',title:'Pacing money over time',summary:'Turn a weekly, monthly, or semester amount into a usable pace.',screen:'pacing-value',pacingFocus:'pacing'},
      {id:'safe-to-spend',title:'Balance vs. safe to spend',summary:'Protect future Needs and planned savings before calling money flexible.',screen:'pacing-value',pacingFocus:'safe'},
      {id:'savings-purpose',title:'Savings is money for later',summary:'Savings can become a future Need, emergency resource, or planned goal.',screen:'pacing-value',pacingFocus:'savings-purpose'},
      {id:'irregular-income',title:'Irregular income',summary:'Plan without pretending money that has not arrived is guaranteed.',screen:'pacing-value',pacingFocus:'irregular'},
      {id:'semester-plan',title:'Plan a longer time period',summary:'Break a semester lump sum or paycheck cycle into smaller usable periods.',screen:'plan'}
    ]
  },
  {
    id:'value',number:3,title:'Spend Smart',
    summary:'A lower price is useful only when it fits the plan and creates real value.',
    lessons:[
      {id:'sales-decisions',title:'Sales and discounts',summary:'A discount is not savings when it causes an unnecessary purchase.',screen:'spend'},
      {id:'usable-value',title:'Quantity, unit price, and waste',summary:'Compare the amount you will actually use, not just package size.',screen:'pacing-value',pacingFocus:'value'},
      {id:'gas-value',title:'Gas price vs. travel cost',summary:'Count the cost of getting the deal before calling it a savings.',screen:'pacing-value',pacingFocus:'gas'},
      {id:'subscriptions-lesson',title:'Subscriptions and recurring costs',summary:'Turn small repeating charges into monthly and yearly decisions.',screen:'subscriptions'}
    ]
  },
  {
    id:'adult-money',number:4,title:'Everyday Adult Money',
    summary:'Learn the financial processes that appear when support shifts toward independent living.',
    lessons:[
      {id:'banking',title:'Banking and overdrafts',summary:'Track pending obligations instead of trusting only the displayed balance.',screen:'adult-life',adultModule:'banking'},
      {id:'first-job',title:'Paychecks and tax paperwork',summary:'Use take-home pay and recognize the basic employment paperwork sequence.',screen:'adult-life',adultModule:'first-job'},
      {id:'credit',title:'Credit and borrowing',summary:'Treat credit as borrowed money with a future obligation.',screen:'adult-life',adultModule:'credit'},
      {id:'scams',title:'Scams and payment safety',summary:'Use a stop-and-verify routine when someone creates urgency around money.',screen:'adult-life',adultModule:'scams'}
    ]
  },
  {
    id:'living-costs',number:5,title:'Living Costs',
    summary:'Plan the real bundles of costs that come with housing, food, transportation, and health care.',
    lessons:[
      {id:'renting',title:'Renting and leases',summary:'Look beyond advertised rent to written rules, fees, utilities, and recurring costs.',screen:'adult-life',adultModule:'renting'},
      {id:'utilities',title:'Utilities and home bills',summary:'Plan variable recurring costs, due dates, and setup responsibilities.',screen:'adult-life',adultModule:'utilities'},
      {id:'groceries',title:'Groceries and meal planning',summary:'Plan from what will actually be eaten, prepared, stored, and used.',screen:'adult-life',adultModule:'groceries'},
      {id:'transportation',title:'Transportation choices',summary:'Compare the whole transportation cost, not one payment or one trip.',screen:'adult-life',adultModule:'transportation'},
      {id:'health-insurance',title:'Health insurance and medical costs',summary:'Compare premiums with the other major cost-sharing terms.',screen:'adult-life',adultModule:'health-insurance'}
    ]
  },
  {
    id:'support',number:6,title:'Future Money and Support',
    summary:'Protect future needs, understand changing benefits information, and prepare for unexpected changes.',
    lessons:[
      {id:'future-needs',title:'Future Needs and emergency money',summary:'Reserve money for predictable irregular costs before they become emergencies.',screen:'save'},
      {id:'benefits-lesson',title:'Benefits basics',summary:'Use current, versioned information instead of memorizing rules that can change.',screen:'benefits'},
      {id:'decision-routine',title:'Put the whole routine together',summary:'Use the same money questions across new situations.',screen:'pacing-value',pacingFocus:'routine'}
    ]
  }
];

const LESSONS=new Map(MODULES.flatMap(module=>module.lessons.map(lesson=>[lesson.id,{...lesson,moduleId:module.id,moduleTitle:module.title,moduleNumber:module.number}])));
const HUBS=new Set(['course','practice-hub','reviews','references','simulations']);
const ADVISOR=new Set(['advisor-dashboard','setup','scenarios','evidence','evaluation']);
const AREA_LABELS={course:'Modules', 'practice-hub':'Practice', reviews:'Reviews', references:'Quick References', simulations:'Simulations'};
const DEFAULT_ORIGIN={home:'course',money:'course',spend:'practice-hub',save:'practice-hub',subscriptions:'practice-hub',plan:'course','pacing-value':'practice-hub','adult-life':'practice-hub',benefits:'references',progress:'reviews',week:'simulations','life-sim':'simulations'};

function readCourseState(){
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

function lessonButton(lesson){
  const visited=!!readCourseState().visited[lesson.id];
  return `<button type="button" class="course-lesson" onclick="course.openLesson('${esc(lesson.id)}')"><span><b>${esc(lesson.title)}</b><small>${esc(lesson.summary)}</small></span><span class="course-lesson-action">${visited?'Open again':'Start'}</span></button>`;
}

function renderCourse(){
  const host=document.getElementById('course'); if(!host)return;
  const state=readCourseState();
  const allLessons=MODULES.flatMap(module=>module.lessons);
  const next=allLessons.find(lesson=>!state.visited[lesson.id])||allLessons[0];
  host.innerHTML=`<div class="hero course-hero"><span class="tag">NWS Course</span><h2>Your course</h2><p class="sub">Work through the modules in order. Lessons teach the idea first. Practice, reviews, quick references, and simulations stay in their own sections so you always know what kind of work you are doing.</p><div class="course-flow" aria-label="Course flow"><span><b>1</b> Modules</span><span><b>2</b> Practice</span><span><b>3</b> Reviews</span><span><b>4</b> Quick References</span><span><b>5</b> Simulations</span></div><div class="row"><button class="btn" type="button" onclick="course.openLesson('${esc(next.id)}')">${Object.keys(state.visited).length?'Continue course':'Start Module 1'}</button><span class="sub">Lesson visits are shown for navigation only; they are not a mastery score.</span></div></div><div class="section-title"><div><h2>Modules</h2><p>Recommended order. Nothing is locked.</p></div></div><div class="stack course-modules">${MODULES.map(module=>{const visited=module.lessons.filter(lesson=>state.visited[lesson.id]).length;return `<article class="card course-module"><div class="course-module-head"><div><span class="course-module-number">Module ${module.number}</span><h3>${esc(module.title)}</h3><p class="sub">${esc(module.summary)}</p></div><span class="tag">${visited}/${module.lessons.length} visited</span></div><div class="course-lesson-list">${module.lessons.map(lessonButton).join('')}</div></article>`;}).join('')}</div>`;
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
  host.innerHTML=`<div class="hero"><span class="tag">Practice</span><h2>Practice what you learned</h2><p class="sub">Choose a skill after its lesson. Practice is separate from the lesson so students can tell the difference between learning, trying, and reviewing.</p></div><div class="course-card-grid">${PRACTICE_ITEMS.map(([title,text,screen])=>`<button type="button" class="card course-action-card" onclick="course.openTool('${screen}','practice-hub')"><span class="tag">Practice</span><h3>${esc(title)}</h3><p>${esc(text)}</p><b>Open practice →</b></button>`).join('')}</div>`;
}

function renderReviews(){
  const host=document.getElementById('reviews'); if(!host)return;
  const state=loadState();
  const ordinary=dueDelayedChecks(state).length;
  const recovery=dueRecoveryFollowups(state).length;
  const total=ordinary+recovery;
  host.innerHTML=`<div class="hero"><span class="tag">Reviews</span><h2>Review after time has passed</h2><p class="sub">Reviews bring older material back into working memory. They are not another lesson page and they are not mixed into simulations.</p><div class="stats"><div class="stat"><span>Due now</span><b>${total}</b></div><div class="stat"><span>Regular reviews</span><b>${ordinary}</b></div><div class="stat"><span>Recovery follow-ups</span><b>${recovery}</b></div></div><div style="height:14px"></div><button class="btn" type="button" onclick="course.openTool('progress','reviews')">${total?'Start due reviews':'Open review center'}</button></div><div class="section-title"><h2>What belongs here?</h2></div><div class="card"><ul><li>Delayed retrieval of material learned earlier.</li><li>Changed-context follow-up after a recovery attempt.</li><li>Revisiting a module when a review shows the concept needs more teaching.</li></ul><p class="sub">Accuracy, independence, transfer, retention, and recovery remain separate evidence dimensions underneath the course.</p></div>`;
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

function updateTrail(){
  const trail=document.getElementById('courseTrail'); if(!trail)return;
  const active=document.querySelector('main .screen.active')?.id;
  if(!active||HUBS.has(active)||ADVISOR.has(active)){trail.classList.add('hidden');return;}
  const ctx=currentContext();
  const matching=ctx?.screen===active?ctx:null;
  const origin=matching?.origin||DEFAULT_ORIGIN[active]||'course';
  const originLabel=AREA_LABELS[origin]||'Modules';
  const title=matching?.title||document.querySelector(`#${CSS.escape(active)} h2`)?.textContent||'Course activity';
  trail.innerHTML=`<button type="button" class="btn secondary" onclick="course.back('${esc(origin)}')">← Back to ${esc(originLabel)}</button><div><small>${esc(originLabel)}</small><b>${esc(title)}</b></div>`;
  trail.classList.remove('hidden');
}

function openLesson(id){
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

function openTool(screen,origin='practice-hub'){
  clearFocus();
  setContext({screen,origin,title:screen==='week'?'Scenario Practice':screen==='life-sim'?'Independent Life Simulation':null});
  if(screen==='pacing-value')window.pacingValue?.setCourseFocus?.(null);
  if(screen==='adult-life')window.nwsAdultLifeOpenModule?.(null,false);
  window.app?.show?.(screen);
  queueMicrotask(updateTrail);
}
function back(origin='course'){
  clearFocus(); setContext(null);
  window.pacingValue?.setCourseFocus?.(null);
  window.nwsAdultLifeOpenModule?.(null,false);
  renderArea(origin); window.app?.show?.(origin); queueMicrotask(updateTrail);
}

window.course={openLesson,openTool,back,render:()=>{renderCourse();renderPractice();renderReviews();renderReferences();renderSimulations();updateTrail();}};

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
  document.querySelectorAll('.nav button[data-course-stage]').forEach(button=>button.addEventListener('click',()=>{setContext(null);clearFocus();queueMicrotask(()=>renderArea(button.dataset.screen));}));
  updateTrail();
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initialize,{once:true});else initialize();
