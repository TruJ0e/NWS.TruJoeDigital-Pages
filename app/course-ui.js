import { loadState } from './state.js';
import { dueDelayedChecks, retrievalStatus } from './retrieval.js';
import { dueRecoveryFollowups } from './recovery-followup.js';
import { SKILLS } from '../content/curriculum.js';
import { ttsControlsHTML, bindTTSControls, speakText, stopTTS, ttsSupported } from './tts.js';
import { resolveTry, orderedChoices, recordSkillAttempt, skillStats, skillLabel, misconceptionLine, topMisconception, parseAttempt, skillDotStatus } from './variants.js';

const COURSE_STATE_KEY='nwsCourseShell.v1';
const CONTEXT_KEY='nwsCourseShell.context';
const PACING_FOCUS_KEY='nwsCourseShell.pacingFocus';
const ADULT_FOCUS_KEY='nwsCourseShell.adultLifeFocus';
const OUTLINE_KEY='nwsCourseShell.outlineOpen';
const RESUME_KEY='nwsCourseShell.resume';
function readResume(){try{return JSON.parse(localStorage.getItem(RESUME_KEY)||'null');}catch{return null;}}
function writeResume(lessonId,stepIdx){try{localStorage.setItem(RESUME_KEY,JSON.stringify({lessonId,stepIdx}));}catch{}}
function clearResume(){try{localStorage.removeItem(RESUME_KEY);}catch{}}

const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

export const MODULES=[
  {
    id:'foundations',img:'images/modules/module-foundations.png',number:1,title:'Money Foundations',
    summary:'Learn what money is for before deciding what to do with it.',outcomes:['Sort any expense into Need, Want, or Savings — and handle the “it depends” cases.','Run the full NWS decision routine: sort, check, then decide.','Say a clear, respectful no to pressure spending without guilt.'],
    lessons:[
      {id:'nws-routine',est:8,title:'Needs, Wants, Savings',summary:'Use NWS as a decision tool, not a moral label.',screen:'home',kind:'tool',toolKind:'Dashboard'},
      {id:'available-money',est:8,title:'What money is actually available?',summary:'Separate the visible balance from money that already has a job.',screen:'money',kind:'tool',toolKind:'Dashboard'},
      {id:'depends-decisions',est:12,title:'Needs, Wants, and “it depends”',summary:'Practice contextual choices instead of memorizing rigid categories.',screen:'spend',kind:'practice'}
    ]
  },
  {
    id:'pacing',img:'images/modules/module-pacing.png',number:2,title:'Make Money Last',
    summary:'Learn to divide money by both purpose and time.',outcomes:['Turn a paycheck or a semester lump sum into a weekly pace you can follow.','Read your real safe-to-spend number instead of trusting the account balance.','Recalculate your pace when spending changes instead of hoping it works out.'],
    lessons:[
      {id:'pacing-basics',est:8,title:'Pacing money over time',summary:'Turn a weekly, monthly, or semester amount into a usable pace.',screen:'pacing-value',pacingFocus:'pacing',kind:'lesson'},
      {id:'safe-to-spend',est:7,title:'Balance vs. safe to spend',summary:'Protect future Needs and planned savings before calling money flexible.',screen:'pacing-value',pacingFocus:'safe',kind:'lesson'},
      {id:'savings-purpose',est:6,title:'Savings is money for later',summary:'Savings can become a future Need, emergency resource, or planned goal.',screen:'pacing-value',pacingFocus:'savings-purpose',kind:'lesson'},
      {id:'savings-apy',est:8,title:'Compounding: growth on growth',summary:'Watch growth earn growth, tell APY from APR, and use the rule of 72.',screen:'save',kind:'lesson'},
      {id:'irregular-income',est:8,title:'Irregular income',summary:'Plan without pretending money that has not arrived is guaranteed.',screen:'pacing-value',pacingFocus:'irregular',kind:'lesson'},
      {id:'semester-plan',est:10,title:'Plan a longer time period',summary:'Break a semester lump sum or paycheck cycle into smaller usable periods.',screen:'plan',kind:'tool',toolKind:'Calculator'}
    ]
  },
  {
    id:'value',img:'images/modules/module-value.png',number:3,title:'Spend Smart',
    summary:'A lower price is useful only when it fits the plan and creates real value.',outcomes:['Judge sales, subscriptions, and bulk deals by usable value, not sticker price.','Compare options by unit cost and practical cost, not the loudest discount.','Spot the true cost of a subscription before it becomes a leak.'],
    lessons:[
      {id:'sales-decisions',est:12,title:'Sales and discounts',summary:'A discount is not savings when it causes an unnecessary purchase.',screen:'spend',kind:'practice'},
      {id:'sales-tax',est:8,title:'Sales tax at the register',summary:'The tag is not the total: tax the discounted price, then compare out-the-door totals.',screen:'spend',kind:'practice'},
      {id:'usable-value',est:8,title:'Quantity, unit price, and waste',summary:'Compare the amount you will actually use, not just package size.',screen:'pacing-value',pacingFocus:'value',kind:'lesson'},
      {id:'gas-value',est:7,title:'Gas price vs. travel cost',summary:'Count the cost of getting the deal before calling it a savings.',screen:'pacing-value',pacingFocus:'gas',kind:'lesson'},
      {id:'subscriptions-lesson',est:10,title:'Subscriptions and recurring costs',summary:'Turn small repeating charges into monthly and yearly decisions.',screen:'subscriptions',kind:'tool',toolKind:'Calculator'}
    ]
  },
  {
    id:'adult-money',img:'images/modules/module-adult-money.png',number:4,title:'Everyday Adult Money',
    summary:'Learn the financial processes that appear when support shifts toward independent living.',outcomes:['Handle banking, paychecks, credit, and scams without learning the hard way.','Read a pay stub and know where the money went.','Treat credit as a tool with rules, not free money.'],
    lessons:[
      {id:'banking',est:8,title:'Banking and overdrafts',summary:'Track pending obligations instead of trusting only the displayed balance.',screen:'adult-life',adultModule:'banking',kind:'lesson'},
      {id:'first-job',est:8,title:'Paychecks and tax paperwork',summary:'Use take-home pay and recognize the basic employment paperwork sequence.',screen:'adult-life',adultModule:'first-job',kind:'lesson'},
      {id:'credit',est:8,title:'Credit and borrowing',summary:'Treat credit as borrowed money with a future obligation.',screen:'adult-life',adultModule:'credit',kind:'lesson'},
      {id:'credit-cards',est:10,title:'Credit cards: borrowed money has a price',summary:'Turn APR into a monthly rate, price the minimum-payment trap, and dodge card fees.',screen:'spend',kind:'practice'},
      {id:'scams',est:6,title:'Scams and payment safety',summary:'Use a stop-and-verify routine when someone creates urgency around money.',screen:'adult-life',adultModule:'scams',kind:'lesson'}
    ]
  },
  {
    id:'living-costs',img:'images/modules/module-living-costs.png',number:5,title:'Living Costs',
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
    id:'support',img:'images/modules/module-support.png',number:6,title:'Future Money and Support',
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
  try{return {visited:{},completed:{},...JSON.parse(localStorage.getItem(COURSE_STATE_KEY)||'{}')};}catch{return {visited:{},completed:{}};}
}
function writeCourseState(value){localStorage.setItem(COURSE_STATE_KEY,JSON.stringify(value));}
// Used by "Reset demo": clears all course-side localStorage (progress + resume +
// per-screen focus prefs) so the demo truly returns to a fresh state. Does not
// touch the scenario state (state.js / persist()), which the caller resets.
export function resetCourseState(){
  try{
    localStorage.removeItem(COURSE_STATE_KEY);
    localStorage.removeItem(RESUME_KEY);
    localStorage.removeItem(PACING_FOCUS_KEY);
    localStorage.removeItem(ADULT_FOCUS_KEY);
    localStorage.removeItem(OUTLINE_KEY);
  }catch{}
}
function markVisited(id){
  const state=readCourseState(); state.visited[id]=state.visited[id]||new Date().toISOString(); writeCourseState(state);
}
function markCompleted(id){
  const state=readCourseState(); state.completed[id]=state.completed[id]||new Date().toISOString(); writeCourseState(state);
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

// Dismissing a resume position: kept for API compatibility; the hero CTA
// is now the single resume surface (see renderCourse above).
function dismissResume(){
  clearResume();
  renderCourse();
}

// Single honest resume: the hero CTA *is* the resume. It deep-links to the
// exact lesson + screen the learner was last on (localStorage), so there is
// never a second competing "pick up where you left off" widget. With no
// saved position it falls back to "next unvisited lesson" logic.
// Never auto-navigates.
function renderCourse(){
  const host=document.getElementById('course'); if(!host)return;
  const state=readCourseState();
  const allLessons=MODULES.flatMap(module=>module.lessons);
  const total=allLessons.length;
  const visitedCount=allLessons.filter(lesson=>state.visited[lesson.id]).length;
  const completedCount=allLessons.filter(lesson=>state.completed[lesson.id]).length;
  const saved=readResume();
  const resumeLesson=saved&&saved.lessonId?LESSONS.get(saved.lessonId):null;
  let ctaId,ctaStep,ctaLabel,ctaNote;
  if(resumeLesson){
    const totalSteps=lessonContent(resumeLesson.id)?.steps.length||0;
    ctaStep=Number.isInteger(saved.stepIdx)?Math.max(0,Math.min(saved.stepIdx,totalSteps)):0;
    const atReview=totalSteps>0&&ctaStep>=totalSteps;
    ctaId=resumeLesson.id;
    ctaLabel=`Continue: ${resumeLesson.title}`;
    ctaNote=`Pick up where you left off · Module ${resumeLesson.moduleNumber} · ${atReview?'end-of-lesson review':`screen ${ctaStep+1} of ${totalSteps}`}`;
  }else{
    const next=allLessons.find(lesson=>!state.visited[lesson.id]);
    const target=next||allLessons[0];
    ctaId=target.id; ctaStep=0;
    ctaLabel=visitedCount===0?'Start course':(next?`Next up: ${target.title}`:'Review course from the start');
    ctaNote=visitedCount===0?`Begin with Module 1 · ${esc(allLessons[0].title)}`:(next?`${esc(next.title)} · ${next.est} min · Module ${next.moduleNumber}`:'You have visited every lesson — review anything, any time.');
  }
  const pct=Math.round(visitedCount/total*100);
  host.innerHTML=
`<div class="hero course-hero"><span class="tag">NWS Course</span><h2>Learn to run your money like an adult.</h2><p class="sub">Built for college students. Plain-language lessons and hands-on practice for the money decisions that actually show up: paychecks, rent, groceries, subscriptions, and the surprises in between.</p><ul class="course-logistics" aria-label="Course logistics"><li><b>Self-paced</b><span>go in any order</span></li><li><b>Free</b><span>no account, no cost</span></li><li><b>6 modules · ${total} lessons</b><span>lessons, practice &amp; tools</span></li><li><b>${esc(courseDurationLabel())}</b><span>total, at your pace</span></li></ul><div class="row course-cta-row"><button class="btn" type="button" onclick="course.openLesson('${esc(ctaId)}',${ctaStep})">${esc(ctaLabel)}</button><span class="sub">${ctaNote}</span></div></div>`
+`<section class="card course-progress" aria-label="Course progress"><div class="course-progress-head"><h3>Your progress</h3><span class="tag">${visitedCount} of ${total} visited · ${completedCount} completed</span></div><div class="progressbar" role="progressbar" aria-valuemin="0" aria-valuemax="${total}" aria-valuenow="${visitedCount}" aria-label="Course lessons visited"><i style="width:${pct}%"></i></div><p class="sub">Visited means you opened it — they are not a mastery score. Completed means you finished every screen and its practice — that is the real progress.</p></section>`
+`<div class="section-title"><div><h2>Modules</h2><p>Each module is its own page of short lessons — one idea per screen.</p></div></div><div class="module-quicklist">${MODULES.map(moduleQuickCard).join('')}</div>`
+`<section class="card course-simple-card" aria-label="Simple mode"><span class="tag">Easier mode</span><h3>Want the calm version? Try Simple mode.</h3><p>Same money skills, one step at a time, in plain language.</p><a class="btn" href="./simple.html">Open Simple mode →</a></section>`;
}

// Module quicklist card (course home): one tap target per module. Opens the
// standalone module page; lessons live there, not on this page.
// Minimal module descriptors for the landing quick cards: number on top,
// progress count under it, the subject line, then as few words as possible.
const MODULE_TAGLINES={
  foundations:'Sort every dollar: Needs, Wants, Savings.',
  pacing:'Make money last across time.',
  value:'Judge value, not sticker price.',
  'adult-money':'Banking, paychecks, credit, scams.',
  'living-costs':'Housing, food, transport, health costs.',
  support:'Emergencies, benefits, the full routine.'
};

function moduleQuickCard(module){
  const state=readCourseState();
  const total=module.lessons.length;
  const done=module.lessons.filter(lesson=>state.completed[lesson.id]).length;
  const inProgress=module.lessons.filter(lesson=>state.visited[lesson.id]&&!state.completed[lesson.id]).length;
  return `<button type="button" class="module-quick-card" onclick="course.openModulePage('${esc(module.id)}')" aria-label="Module ${module.number}: ${esc(module.title)} — ${inProgress} in progress, ${done} of ${total} completed, about ${moduleMinutes(module)} minutes"><img class="mq-img" src="${module.img||''}" alt="" aria-hidden="true" loading="lazy"/>${moduleSkillDots(module)}<span class="mq-progress" aria-hidden="true">${inProgress} in progress / ${done} completed · about ${moduleMinutes(module)} min</span><b class="mq-title">${esc(module.title)}</b><small class="mq-tagline">${esc(MODULE_TAGLINES[module.id]||module.summary)}</small></button>`;
}

// Khan-style skill dots on module cards: subtle, small, under the module
// number. Informational only — they never gate advancement. One dot per
// skill the module's lessons practice; the title names the skill + level.
function moduleSkillDots(module){
  const skills=[...new Set(module.lessons.flatMap(lesson=>{
    const content=lessonContent(lesson.id);
    return content?content.steps.filter(s=>s.t==='try'&&s.skill).map(s=>s.skill):[];
  }))];
  if(!skills.length)return '';
  const dots=skills.map(sid=>{
    const d=skillDotStatus(sid);
    return `<span class="mq-dot mq-dot-${d.level}" title="${esc(skillLabel(sid))}: ${d.label}"></span>`;
  }).join('');
  return `<span class="mq-dots" aria-hidden="true">${dots}</span>`;
}

// Standalone module page: top navigation (sidebar moves to the top inside
// modules), lesson list, outcomes, and prev/next module paging.
function modulePageTopNav(){
  const items=[['#/modules','Modules'],['#/practice','Practice'],['#/reviews','Reviews'],['#/references','Quick References'],['#/simulations','Simulations'],['#/instructor/advisor-dashboard','Instructor Tools']];
  return `<nav class="topnav" aria-label="Course sections"><div class="topnav-scroll">${items.map(([hash,label])=>`<a class="topnav-link${hash==='#/modules'?' active':''}" href="${hash}">${esc(label)}</a>`).join('')}<a class="topnav-link topnav-simple" href="./simple.html">Simple mode</a></div></nav>`;
}

// Per-skill evidence on module lesson rows: what the learner's accuracy
// looks like for each skill the lesson practices. Gates are by skill,
// never by total score; this display is evidence, not a block.
function lessonSkillSummary(lessonId){
  const content=lessonContent(lessonId);
  if(!content)return '';
  const skills=[...new Set(content.steps.filter(s=>s.t==='try'&&s.skill).map(s=>s.skill))];
  if(!skills.length)return '';
  const parts=skills.map(sid=>{
    const st=skillStats(sid);
    if(st.pct==null)return null;
    const mark=st.status==='solid'?'✓':st.status==='building'?'~':'!';
    return `${mark} ${esc(skillLabel(sid))}: ${st.pct}%`;
  }).filter(Boolean);
  if(!parts.length)return '';
  return `<small class="course-skills">Skills — ${parts.join(' · ')}</small>`;
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
    return `<button type="button" class="course-lesson${visited?' visited':''}" onclick="course.openLesson('${esc(lesson.id)}')" aria-label="Lesson ${stepNum}: ${esc(lesson.title)}${visited?' (visited)':''}"><span class="course-step-num" aria-hidden="true">${stepNum}</span><span class="course-lesson-meta"><b>${esc(lesson.title)}</b><small>${esc(lesson.summary)}</small>${lessonSkillSummary(lesson.id)}</span><span class="course-kind">${esc(kindTag(lesson))}</span><span class="course-est">${lesson.est} min</span><span class="course-check" aria-hidden="true">✓</span><span class="course-lesson-action">${visited?'Open again':'Start'}</span></button>`;
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

// Practice mirrors the module outline: one section per module with that
// module's guided practice lessons plus its hands-on tool screens.
const MODULE_PRACTICE_TOOLS={
  foundations:[['spend','NWS decisions','Needs, Wants, sales, affordability, and contextual choices.']],
  pacing:[['pacing-value','Pacing & safe to spend','Practice calculations and decisions for money that must last.'],['plan','Paychecks & semester planning','Practice take-home pay and longer time periods.']],
  value:[['spend','Sales practice','Sales, discounts, and whether the purchase fits the plan.'],['pacing-value','Value checks','Unit value, comparisons, and usable value.'],['subscriptions','Subscriptions','Compare recurring services, yearly cost, use, and value.']],
  'adult-money':[['adult-life','Adult-life practice: banking & work','Banking, credit, scams, and the first job.'],['spend','Credit cards','Credit-card decisions and interest.']],
  'living-costs':[['adult-life','Adult-life practice: housing & daily costs','Renting, utilities, groceries, transportation, health insurance.']],
  support:[['save','Savings & goals','Move simulated money and work backward from a goal.'],['benefits','Benefits basics','What benefits are and where to check them.'],['pacing-value','Decision routine','Run the full NWS routine on a new situation.']]
};
function renderPractice(){
  const host=document.getElementById('practice-hub'); if(!host)return;
  host.innerHTML=`<div class="hero"><span class="tag">Practice</span><h2>Practice what you learned</h2><p class="sub">Practice follows the same path as the modules. Pick a module, then a practice activity.</p></div>`+MODULES.map(m=>{
    const practices=m.lessons.filter(l=>l.kind==='practice');
    const tools=MODULE_PRACTICE_TOOLS[m.id]||[];
    const rows=practices.map(l=>`<button type="button" class="card course-action-card" onclick="course.openLesson('${esc(l.id)}')"><span class="tag">Guided practice</span><h3>${esc(l.title)}</h3><p>${esc(l.summary||'')} · ${l.est} min</p><b>Start practice →</b></button>`).join('')
      +tools.map(([screen,title,text])=>`<button type="button" class="card course-action-card" onclick="course.openTool('${esc(screen)}','practice-hub')"><span class="tag">Hands-on tool</span><h3>${esc(title)}</h3><p>${esc(text)}</p><b>Open practice →</b></button>`).join('');
    return `<div class="section-title"><div><h2>Module ${m.number}: ${esc(m.title)}</h2><p>${esc(m.summary)}</p></div></div><div class="course-card-grid">${rows}</div>`;
  }).join('');
}

// Reviews hub: the real review center. Due checks start in place (no
// redirect to Practice → Progress), recovery follow-ups link to their home,
// and a retention overview folds in the advisor-facing summary.
export function renderReviews(){
  const host=document.getElementById('reviews'); if(!host)return;
  const state=loadState();
  const due=dueDelayedChecks(state).sort((a,b)=>new Date(a.dueAt)-new Date(b.dueAt));
  const dueIds=new Set(due.map(x=>x.id));
  const upcoming=(state.learning?.delayedChecks||[]).filter(x=>x.status==='scheduled'&&!dueIds.has(x.id)).sort((a,b)=>new Date(a.dueAt)-new Date(b.dueAt));
  const recovery=dueRecoveryFollowups(state);
  const total=due.length+recovery.length;
  const activeQ=(window.app&&state.activeRetrievalCheck)?window.app.reviewQuestion(state.activeRetrievalCheck):null;
  const fmt=d=>{try{return new Date(d).toLocaleDateString();}catch{return '';}};
  const skillLabel=id=>SKILLS.find(s=>s.id===id)?.label||id;
  const stageName={1:'Day 1',7:'Day 7',21:'Day 21'};
  const dueRows=due.length
    ?due.map(x=>`<div class="row between"><div><b>${esc(skillLabel(x.skill))}</b><div class="sub">${esc(stageName[x.stage]||('Stage '+x.stage))} check · due ${esc(fmt(x.dueAt))}</div></div><button type="button" class="btn" onclick="app.startReview('${esc(x.id)}')">Start review</button></div>`).join('')
    :'<p class="positive">Nothing due right now. New reviews appear after you complete lessons and practice.</p>';
  const activeCard=activeQ
    ?`<div class="card"><span class="tag info">Review in progress</span><h3 style="margin:8px 0">${esc(activeQ.skillLabel)}</h3><p><b>${esc(activeQ.question)}</b></p><div class="stack">${activeQ.choices.map(c=>`<button type="button" class="btn secondary" onclick="app.answerReview('${esc(activeQ.id)}','${esc(c.id)}')">${esc(c.label)}</button>`).join('')}</div><div style="height:10px"></div>${activeQ.helped?`<div class="hint">${esc(activeQ.help)}</div>`:`<button type="button" class="btn ghost" onclick="app.reviewHelp('${esc(activeQ.id)}')">Show help</button>`}<div style="height:10px"></div><button type="button" class="btn ghost" onclick="app.startReview('')">Put this review back</button></div>`
    :'';
  const recoveryRows=recovery.length
    ?recovery.map(x=>`<div class="row between"><div><b>Recovery follow-up</b><div class="sub">${esc(x.phase||'follow-up')} · due ${esc(fmt(x.dueAt))}</div></div><button type="button" class="btn secondary" onclick="course.openTool('progress','reviews')">Open</button></div>`).join('')
    :'<p class="sub">No recovery follow-ups due. These appear after a Life Simulation recovery.</p>';
  const upcomingRows=upcoming.length
    ?upcoming.map(x=>`<div class="row between"><div><b>${esc(skillLabel(x.skill))}</b><div class="sub">${esc(stageName[x.stage]||('Stage '+x.stage))} check</div></div><span class="tag">${esc(fmt(x.dueAt))}</span></div>`).join('')
    :'<p class="sub">Nothing scheduled yet.</p>';
  const skillRows=SKILLS.map(s=>({label:s.label,...retrievalStatus(state,s.id)})).filter(x=>x.due||x.scheduled||x.completed);
  const overview=skillRows.length
    ?`<div class="section-title"><h2>Retention overview</h2></div><div class="card"><div style="overflow-x:auto"><table><thead><tr><th>Skill</th><th>Due</th><th>Scheduled</th><th>Remembered later</th></tr></thead><tbody>${skillRows.map(x=>`<tr><td>${esc(x.label)}</td><td>${x.due}</td><td>${x.scheduled}</td><td>${x.retentionPercent==null?'—':x.retentionPercent+'%'}</td></tr>`).join('')}</tbody></table></div><p class="sub">“Remembered later” counts independent correct answers on delayed checks — no hints used. Not a grade.</p></div>`
    :'';
  host.innerHTML=`<div class="hero"><span class="tag">Reviews</span><h2>Review what you learned</h2><p class="sub">Reviews bring back older material after time has passed, so it sticks. Start each review right here.</p><div class="stats"><div class="stat"><span>Due now</span><b>${total}</b></div><div class="stat"><span>Regular reviews</span><b>${due.length}</b></div><div class="stat"><span>Recovery follow-ups</span><b>${recovery.length}</b></div></div></div>${activeCard}<div class="section-title"><h2>Due now</h2></div><div class="card"><div class="stack">${dueRows}</div></div><div class="section-title"><h2>Recovery follow-ups</h2></div><div class="card"><div class="stack">${recoveryRows}</div></div><div class="section-title"><h2>Coming up</h2></div><div class="card"><div class="stack">${upcomingRows}</div></div>${overview}`;
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
  return `<button type="button" class="outline-step${visited?' visited':''}${current?' current':''}"${current?' aria-current="true"':''} onclick="course.openLesson('${esc(lesson.id)}')" aria-label="${esc(lesson.title)}${visited?' (visited)':''}${current?' (current lesson)':''}"><span class="outline-step-num" aria-hidden="true">${stepNum}</span><span class="outline-check" aria-hidden="true">${visited?'✓':''}</span><span class="outline-step-meta"><b>${esc(lesson.title)}</b><small>${esc(kindTag(lesson))} · ${lesson.est} min</small></span></button>`;
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
  // Persist the resume position on every step change, so the course-home
  // banner can offer this exact step on any navigation path or reload.
  writeResume(id,stepIdx);
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
  stopTTS(); // the reader belongs to the lesson player; never bleed into tools
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
  // Scroll again after tool content renders — the page height changes during
  // render, which can leave the viewport mid-page (especially on mobile).
  requestAnimationFrame(()=>requestAnimationFrame(()=>window.scrollTo({top:0,behavior:'auto'})));
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
  // The outline always loads closed; it stays open only within the session
  // after the learner uses it to switch content.
  try{sessionStorage.removeItem(OUTLINE_KEY);}catch{}
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
    // Instructor/tool screens are not course hubs: hubHash() falls back to
    // '#/modules' for them, which made Setup/Evidence clicks silently land on
    // Modules. Use toolHash() (#/instructor/<screen>) for non-hub screens.
    const hash=window.NWSRouter.HUB_IDS.has(screen)?window.NWSRouter.hubHash(screen):window.NWSRouter.toolHash(screen);
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
  const attempts=(prev&&prev.lessonId===id&&prev.attempts&&typeof prev.attempts==='object')?prev.attempts:{};
  const focusSkills=(prev&&prev.lessonId===id&&Array.isArray(prev.focusSkills))?prev.focusSkills:null;
  writePlayerState({lessonId:id,idx:stepIdx,answers,attempts,focusSkills});
}
// Retry attempt per step: attempt 0 is the base variant; each "Try a similar
// one" bumps the attempt so the learner gets a FRESH variant of the same skill.
// The attempt may carry a diagnosed misconception ("n|mis-id") so the retry
// targets the same misconception, not just the same skill.
function playerAttemptFor(stepIdx){
  const ps=readPlayerState();
  if(!ps||!ps.attempts) return 0;
  const a=ps.attempts[stepIdx];
  if(Number.isInteger(a)&&a>=0) return a;
  if(typeof a==='string'&&/^(\d+)(\|[a-z0-9-]+)?$/.test(a)) return a;
  return 0;
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
  return `<h2>${esc(step.h)}</h2><p class="lp-story">${step.story}</p><ul class="lp-points">${step.points.map(point=>`<li>${point}</li>`).join('')}</ul>`;
}
// Practice-set progress: within a lesson, consecutive try steps read as one
// practice set, so show "Question i of n" above the question.
function practiceProgress(ps){
  const content=lessonContent(ps.lessonId);
  if(!content)return '';
  const tries=content.steps.map((s,i)=>s.t==='try'?i:-1).filter(i=>i>=0);
  if(tries.length<2)return '';
  const n=tries.indexOf(ps.idx)+1;
  return n>0?`Question ${n} of ${tries.length}`:'';
}
function lpTry(ps,step){
  const lessonId=ps.lessonId, stepIdx=ps.idx;
  const attempt=playerAttemptFor(stepIdx);
  const q=resolveTry(lessonId,stepIdx,step,attempt);
  const choices=orderedChoices(q,lessonId,stepIdx);
  const rec=playerAnswerFor(stepIdx,0);
  const buttons=choices.map((choice,ci)=>{
    let cls='lp-choice',mark='';
    if(rec){
      if(choice.ok){cls+=' correct';mark='<span aria-hidden="true"> ✓</span>';}
      else if(rec.choice===ci){cls+=' wrong';mark='<span aria-hidden="true"> ✗</span>';}
    }
    return `<button type="button" class="${cls}"${rec?' disabled':''} onclick="course.playerAnswer(${ci})">${esc(choice.label)}${mark}</button>`;
  }).join('');
  let extra='';
  if(!rec){
    // Guided tier: the next reasoning step is visible up front, then fades.
    if(q.tier==='guided'&&(q.cue||q.hint)){
      extra=`<div class="lp-guide" role="note">${q.cue?`<p class="lp-cue"><b>Start here:</b> ${esc(q.cue)}</p>`:''}${q.hint?`<p class="lp-hint-open">${esc(q.hint)}</p>`:''}</div>`;
    }else if(q.hint){
      extra=`<button type="button" class="linklike lp-hint-btn" onclick="course.playerHint(this)">Need a hint?</button><p class="lp-hint hidden">${esc(q.hint)}</p>`;
    }
  }
  let fb='';
  if(rec){
    const choice=choices[rec.choice];
    const ok=!!(choice&&choice.ok);
    const misLine=!ok&&choice&&choice.mis?misconceptionLine(choice.mis):null;
    fb=`<div class="lp-feedback ${ok?'good':'miss'}" role="status"><p><b>${esc(ok?q.good:q.bad)}</b></p>${misLine?`<p class="lp-mis"><b>The trap:</b> ${esc(misLine)}</p>`:''}${q.why?`<p class="lp-why">${q.why}</p>`:''}`
      +(!ok?`<p><button type="button" class="btn secondary" onclick="course.playerRetry()">Try a similar one →</button></p>`:'')
      +`</div>`;
  }
  const prog=practiceProgress(ps);
  const tryTitle=q.tier==='guided'?'Guided practice':q.tier==='stretch'?'Stretch: try it':'Try it on your own';
  return `<h2>${tryTitle}</h2>${prog?`<p class="lp-qprog">${esc(prog)}</p>`:''}<p class="lp-q">${esc(q.q)}</p><div class="lp-choices">${buttons}</div>${extra}${fb}`;
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
  return `<h2>${esc(step.h)}</h2><div class="lp-body">${step.body}</div><div class="lp-tool-cta"><button type="button" class="btn" onclick="course._openTool('${esc(step.screen)}','${esc(origin)}',${focus})">${esc(step.cta)} →</button><p class="sub">Opens the real tool. Your browser-back button brings you right back to this screen.</p></div>`;
}
function lpNav(ps,total){
  const isLast=ps.idx===total-1;
  const prev=ps.idx>0?`<button type="button" class="btn secondary" onclick="course.playerGo(-1)">← Back</button>`:'<span></span>';
  const label=isLast?'See your review →':'Next →';
  const blocked=!playerStepComplete(ps);
  // A disabled Next with no explanation reads as broken: say what unlocks it.
  const step=lessonContent(ps.lessonId)?.steps[ps.idx];
  const whyBlocked=blocked?(step&&step.t==='sort'?'Finish sorting to continue':'Choose an answer to continue'):'';
  return `<div class="lp-nav">${prev}<span class="lp-nav-next"><button type="button" class="btn" data-lp-next${blocked?' disabled':''} onclick="course.playerGo(1)">${label}</button>${blocked?`<small class="lp-blocked-hint">${whyBlocked}</small>`:''}</span></div>`;
}

function renderPlayerStep(){
  const host=document.getElementById('lesson-player'); if(!host)return;
  stopTTS(); // a new screen never inherits the previous screen's audio
  const ps=readPlayerState(); if(!ps){host.innerHTML='';return;}
  const lesson=LESSONS.get(ps.lessonId);
  const content=lessonContent(ps.lessonId);
  if(!lesson||!content){host.innerHTML='';return;}
  const steps=content.steps;
  // Focus mode: skip everything except try steps for the focus skills.
  if(ps.focusSkills&&ps.focusSkills.length&&ps.idx<steps.length){
    const st=steps[ps.idx];
    if(!(st.t==='try'&&ps.focusSkills.includes(st.skill))){
      ps.idx+=1; writePlayerState(ps);
      renderPlayerStep(); return;
    }
  }
  if(ps.idx>=steps.length){renderPlayerReview(host,lesson,content,ps);return;}
  const step=steps[ps.idx];
  let kicker=`Module ${lesson.moduleNumber} · Lesson ${lessonSeqNum(ps.lessonId)} of ${lessonSequence().length} · Screen ${ps.idx+1} of ${steps.length}`;
  if(ps.focusSkills&&ps.focusSkills.length){
    const focusIdx=steps.map((s,i)=>({s,i})).filter(({s})=>s.t==='try'&&ps.focusSkills.includes(s.skill)).map(({i})=>i);
    const pos=focusIdx.indexOf(ps.idx)+1;
    if(pos>0)kicker=`Module ${lesson.moduleNumber} · Focused practice · Question ${pos} of ${focusIdx.length}`;
  }
  let body='';
  if(step.t==='teach')body=lpTeach(step);
  else if(step.t==='example')body=lpExample(step);
  else if(step.t==='try')body=lpTry(ps,step);
  else if(step.t==='sort')body=sortStepDone(ps,step)?lpSortDone(ps,step):lpSort(step);
  else if(step.t==='tool')body=lpTool(ps,step,lesson);
  else body=lpTeach({h:'Lesson',body:'<p>Content coming right up.</p>'});
  host.innerHTML=`<div class="lp-wrap"><div class="row between"><p class="lp-kicker">${esc(kicker)}</p>${ttsSupported()?`<div class="tts-slot">${ttsControlsHTML()}<button type="button" class="tts-speak-btn" data-tts-read-screen aria-label="Read this screen aloud" title="Read this screen aloud">🔊 Read screen</button></div>`:''}</div><div class="lp-card">${body}</div>${lpNav(ps,steps.length)}</div>`;
  bindTTSControls(host);
  host.querySelector('[data-tts-read-screen]')?.addEventListener('click',()=>{
    const card=host.querySelector('.lp-card');
    if(card)speakText(card.textContent||'');
  });
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
    const rq=resolveTry(ps.lessonId,a.step,step,a.att||0);
    const rchoices=orderedChoices(rq,ps.lessonId,a.step);
    const choice=rchoices[a.choice];
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
        const rq=resolveTry(ps.lessonId,a.step,step,a.att||0);
        const rchoices=orderedChoices(rq,ps.lessonId,a.step);
        const choice=rchoices[a.choice]||{};
        q=rq.q; chose=choice.label||'';
        const ci=rchoices.findIndex(c=>c.ok);
        correctLabel=rchoices[ci]?rchoices[ci].label:'';
        why=rq.why; ok=!!choice.ok;
      }
      return `<div class="lp-ritem ${ok?'ok':'miss'}"><p class="lp-ri-q">${esc(q)}</p><p class="lp-ri-a">You chose <b>${esc(chose)}</b> ${ok?'<span class="tag good-tag">Correct</span>':`<span class="tag miss-tag">Correct answer: <b>${esc(correctLabel)}</b></span>`}</p>${why?`<p class="lp-ri-why">${why}</p>`:''}</div>`;
    }).join('');
  }
  const pct=total?Math.round(correct/total*100):100;
  const verdict=!total?'':pct===100?'Perfect run — the routine is yours.':pct>=70?'Solid. The misses are the interesting part — read the why.':'Worth a second pass. Redo the lesson, then try again.';
  // Per-skill evidence: what each practiced skill's accuracy looks like.
  // Gating is by skill, never by total score. This-lesson accuracy decides
  // completion; the cumulative stats below are long-term evidence.
  const skillIds=[...new Set(content.steps.filter(s=>s.t==='try'&&s.skill).map(s=>s.skill))];
  const lessonSkill={};
  for(const a of answers){
    if(a.bucket!==undefined)continue;
    const st=content.steps[a.step];
    const sid=st&&st.skill; if(!sid)continue;
    lessonSkill[sid]=lessonSkill[sid]||{asked:0,correct:0};
    lessonSkill[sid].asked+=1;
    if(isCorrect(a))lessonSkill[sid].correct+=1;
  }
  const weakSkills=skillIds.filter(sid=>{
    const s=lessonSkill[sid];
    return s&&s.asked>0&&(s.correct/s.asked)<0.7;
  });
  const wasFocus=!!(ps.focusSkills&&ps.focusSkills.length);
  if(wasFocus){ps.focusSkills=null;writePlayerState(ps);}
  let skillHtml='';
  if(skillIds.length){
    skillHtml='<div class="lp-skills"><h3>Skills you practiced</h3><ul>'
      +skillIds.map(sid=>{
        const st=skillStats(sid);
        const pctText=st.pct==null?'no tries yet':st.pct+'% right ('+st.correct+' of '+st.asked+')';
        const tag=st.status==='solid'?' <span class="tag good-tag">Solid</span>':st.status==='needs-practice'?' <span class="tag miss-tag">Needs practice</span>':'';
        return `<li><b>${esc(skillLabel(sid))}</b> — ${esc(pctText)}${tag}</li>`;
      }).join('')
      +'</ul><p class="sub">Solid over time: 3+ tries and 70%+ right. Reaching this review completes the lesson — the dots on your module cards track how each skill is really doing.</p></div>';
  }
  // Informational nudge (never a blocker): weak skills get a focused-practice
  // path with fresh variants of just those skills. Completion = reaching this
  // review; mastery dots on module cards carry the richer signal.
  let nudgeHtml='';
  if(weakSkills.length){
    const weakList=weakSkills.map(sid=>{
      const s=lessonSkill[sid];
      return `<li><b>${esc(skillLabel(sid))}</b> — ${s.correct} of ${s.asked} right this time</li>`;
    }).join('');
    nudgeHtml=`<div class="lp-card lp-nudge"><h3>Worth another look</h3><p>These skills were shaky this time. A quick fresh round helps more than rereading:</p><ul>${weakList}</ul><div class="lp-nav"><button type="button" class="btn" onclick='course.playerFocusPractice(${esc(JSON.stringify(weakSkills))})'">Practice these skills →</button></div></div>`;
  }
  const navButtons=`${nextId?`<button type="button" class="btn" onclick="course.openLesson('${esc(nextId)}')">Next lesson →</button>`:`<button type="button" class="btn" onclick="course.openModulePage('${esc(lesson.moduleId)}')">Back to Module ${lesson.moduleNumber} →</button>`}`;
  host.innerHTML=`<div class="lp-wrap"><p class="lp-kicker">Module ${lesson.moduleNumber} · Lesson ${lessonSeqNum(ps.lessonId)} of ${seq.length} · End-of-lesson review</p>`
  +`<div class="lp-card lp-review"><h2>End of lesson review</h2>${total?`<p class="lp-score">You got <b>${correct} of ${total}</b> right. ${esc(verdict)}</p>`:`<p class="lp-score">Review of what this lesson covered.</p>`}${skillHtml}<div class="lp-review-list">${items}</div></div>`
  +nudgeHtml
  +`<div class="lp-nav"><button type="button" class="btn secondary" onclick="course.playerGo(-1)">← Back into the lesson</button><button type="button" class="btn secondary" onclick="course.playerRedo()">Redo lesson</button>${navButtons}</div></div>`;
  markCompleted(ps.lessonId);
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
  const attempt=playerAttemptFor(ps.idx);
  const q=resolveTry(ps.lessonId,ps.idx,step,attempt);
  const choices=orderedChoices(q,ps.lessonId,ps.idx);
  const choice=choices[choiceIdx];
  playerRecord({step:ps.idx,item:0,choice:choiceIdx,att:attempt});
  // Per-skill evidence (gates are computed on skill accuracy, never total score).
  recordSkillAttempt(q.skill,!!(choice&&choice.ok),{misconception:choice&&!choice.ok?(choice.mis||null):null});
  renderPlayerStep();
  const fb=document.querySelector('#lesson-player .lp-feedback');
  if(fb)fb.scrollIntoView({block:'nearest',behavior:'smooth'});
}
// Miss-triggered retry: a FRESH variant of the same skill, targeted at the
// diagnosed misconception when one is known (same skill + same misconception),
// falling back to a same-skill variant otherwise — never the identical
// question. Wrong → explanation → targeted retry → confidence rebuild,
// never a punishment loop.
function playerRetry(){
  const ps=readPlayerState(); if(!ps)return;
  const content=lessonContent(ps.lessonId);
  const step=content&&content.steps[ps.idx];
  if(!step||step.t!=='try')return;
  const rec=playerAnswerFor(ps.idx,0);
  if(!rec)return;
  // Diagnose the miss: the misconception behind the chosen wrong answer, else
  // the learner's most-missed misconception for this skill, else untargeted.
  let targetMis=null;
  try{
    const att=playerAttemptFor(ps.idx);
    const q=resolveTry(ps.lessonId,ps.idx,step,att);
    const choices=orderedChoices(q,ps.lessonId,ps.idx);
    const chosen=choices[rec.choice];
    if(chosen&&!chosen.ok&&chosen.mis&&misconceptionLine(chosen.mis)) targetMis=chosen.mis;
  }catch{}
  if(!targetMis&&step.skill){
    const top=topMisconception(step.skill);
    if(top&&misconceptionLine(top.id)) targetMis=top.id;
  }
  ps.answers=(ps.answers||[]).filter(a=>!(a.step===ps.idx&&a.item===0));
  ps.attempts=ps.attempts||{};
  const prev=parseAttempt(ps.attempts[ps.idx]);
  const n=(prev.n||0)+1;
  ps.attempts[ps.idx]=targetMis?(n+'|'+targetMis):n;
  writePlayerState(ps);
  renderPlayerStep();
  const card=document.querySelector('#lesson-player .lp-card');
  if(card)card.scrollIntoView({block:'start',behavior:'auto'});
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
// Focused practice: fresh variants of ONLY the given skills (non-punitive
// retry route). Clears this-lesson answers for those skills so the retry is
// a clean slate, bumps attempts for fresh variants, and jumps to the first
// matching try step. Other steps are skipped while focusSkills is set.
function playerFocusPractice(skills){
  const ps=readPlayerState(); if(!ps)return;
  const content=lessonContent(ps.lessonId);
  const focus=Array.isArray(skills)?skills:[skills];
  ps.focusSkills=focus;
  ps.answers=(ps.answers||[]).filter(a=>{
    const st=content&&content.steps[a.step];
    return !(st&&st.t==='try'&&focus.includes(st.skill));
  });
  ps.attempts=ps.attempts||{};
  let first=-1;
  content.steps.forEach((st,i)=>{
    if(st.t==='try'&&focus.includes(st.skill)){
      const prevA=parseAttempt(ps.attempts[i]);
      ps.attempts[i]=(prevA.n||0)+1;
      if(first<0)first=i;
    }
  });
  ps.idx=first>=0?first:0;
  writePlayerState(ps);
  openLesson(ps.lessonId,ps.idx);
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

Object.assign(window.course,{playerGo,playerAnswer,playerHint,playerRedo,playerRetry,playerFocusPractice,sortPick,sortNext});
