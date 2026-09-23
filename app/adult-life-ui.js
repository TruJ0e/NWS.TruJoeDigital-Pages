import { ADULT_LIFE_REVIEW, ADULT_LIFE_MODULES } from '../content/adult-life.js';
import { adultLifeAssessmentForSkill, adultLifeModuleForSkill } from '../content/adult-life-assessment.js';
import { loadState, saveState } from './state.js';
import { completeDelayedCheck, scheduleDelayedCheck } from './retrieval.js';
import { recordLearningDecision } from './mastery.js';

const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let activeModuleId=ADULT_LIFE_MODULES[0]?.id||null;
let lastAnswer=null;
let lastTransferAnswer=null;
let retrievalPatched=false;

function activeModule(){ return ADULT_LIFE_MODULES.find(x=>x.id===activeModuleId)||ADULT_LIFE_MODULES[0]; }

function ensureInitialPracticeMode(){
  const persisted=loadState();
  if(persisted.transferMode&&window.app?.toggleTransfer) window.app.toggleTransfer();
}

function moduleButton(module){
  const active=module.id===activeModuleId;
  return `<button type="button" class="btn ${active?'':'secondary'}" data-adult-module="${esc(module.id)}" aria-pressed="${active}">${esc(module.title)}</button>`;
}

function practiceChoice(module,choice){
  return `<button type="button" class="btn secondary adult-life-choice" data-adult-answer="${esc(choice.id)}">${esc(choice.label)}</button>`;
}

function transferChoice(choice){
  return `<button type="button" class="btn secondary adult-life-transfer-choice" data-adult-transfer-answer="${esc(choice[0])}">${esc(choice[1])}</button>`;
}

function sources(module){
  return `<div class="card"><h3>Official source handoffs</h3><p class="sub">Concepts can be durable while rules, forms, prices, plan terms, and state/local law can change. Use the official source when the answer depends on current rules.</p><ul>${module.sources.map(item=>`<li><a href="${esc(item.url)}" target="_blank" rel="noopener noreferrer">${esc(item.agency)} — ${esc(item.title)}</a>${item.jurisdictionSpecific?' <span class="tag info">Location-specific rules may apply</span>':''}${item.reviewRequired?' <span class="tag info">Recheck current version</span>':''}</li>`).join('')}</ul><p class="sub">NWS source review: ${esc(ADULT_LIFE_REVIEW.lastReviewed)}</p></div>`;
}

function transferCard(module){
  const assessment=adultLifeAssessmentForSkill(module.skill,'transfer');
  if(!assessment)return'';
  const answered=lastTransferAnswer?.moduleId===module.id;
  const correct=answered&&lastTransferAnswer.choiceId===assessment.good;
  return `<div class="card"><div class="row between"><h3>Try a new situation</h3><span class="tag info">Novel transfer</span></div><p class="sub">Same underlying skill, changed context. This is recorded separately as transfer evidence.</p><p><b>${esc(assessment.question)}</b></p><div class="stack">${assessment.choices.map(transferChoice).join('')}</div>${answered?`<div class="result" role="status"><b>${correct?'This applies the skill in the changed situation.':'This changed situation still uses the same decision process.'}</b><p>${esc(assessment.help)}</p></div>`:''}</div>`;
}

function renderDetail(module){
  const answered=lastAnswer?.moduleId===module.id;
  const chosen=answered?module.practice.choices.find(x=>x.id===lastAnswer.choiceId):null;
  const correct=answered&&lastAnswer.choiceId===module.practice.correct;
  const transfer=answered&&correct
    ? transferCard(module)
    : answered
      ? '<div class="callout"><b>Transfer check stays locked for now.</b> Retry the quick practice successfully before applying the skill in a changed situation.</div>'
      : '<div class="callout"><b>Transfer comes next.</b> Complete the quick practice first; NWS will then give you a changed-context version of the same skill.</div>';
  return `<div class="stack"><div class="hero"><h3>Independent-life practice</h3><p class="sub">Practice the financial processes that show up when college support begins shifting toward independent adult responsibilities.</p><div class="callout"><b>Current module:</b> ${esc(module.title)}. Work one decision at a time; use the official source when a rule depends on current law, plan terms, or location.</div></div><div class="card"><h3>${esc(module.title)}</h3><p>${esc(module.summary)}</p><h3>What to know</h3><ul>${module.durableConcepts.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div><div class="card"><h3>Quick practice</h3><p><b>${esc(module.practice.prompt)}</b></p><div class="stack">${module.practice.choices.map(choice=>practiceChoice(module,choice)).join('')}</div>${answered?`<div class="result" role="status"><b>${correct?'This choice protects the decision process.':'Review the consequence and try again if useful.'}</b><p>${esc(chosen?.feedback||'')}</p></div>`:''}<p class="sub">Retries are allowed. This first response contributes accuracy and independence evidence through the same NWS evidence system. A separate changed-context item is used for transfer.</p></div>${transfer}${sources(module)}</div>`;
}

function render(){
  const host=document.getElementById('adult-life');
  if(!host)return;
  const module=activeModule();
  const heading=(lessonMode&&module)?module.title:'Adult Life';
  host.innerHTML=`<div class="section-title"><div><h2 id="adult-life-heading">${esc(heading)}</h2><p>Select one area. NWS keeps changing rules sourced instead of turning them into permanent constants.</p></div></div><div class="row adult-life-module-nav" aria-label="Adult-life module selection"${lessonMode?' hidden':''}>${ADULT_LIFE_MODULES.map(moduleButton).join('')}</div>${renderDetail(module)}`;
  host.setAttribute('aria-labelledby','adult-life-heading');
  bind();
  if(window.myNumbers&&activeModuleId==='first-job'){
    const card=window.myNumbers.yourTurnHTML('adult-life');
    if(card) host.insertAdjacentHTML('beforeend',card);
  }
}

function recordChoice(module,choiceId){
  ensureInitialPracticeMode();
  const correct=choiceId===module.practice.correct;
  const quizId=`adult-life-${module.id}`;
  if(window.app?.quiz) window.app.quiz(quizId,choiceId,module.practice.correct,module.skill);
  lastAnswer={moduleId:module.id,choiceId,correct};
  lastTransferAnswer=null;
  render();
  [...document.querySelectorAll('[data-adult-answer]')].find(button=>button.dataset.adultAnswer===choiceId)?.focus();
}

function recordTransferChoice(module,choiceId){
  const assessment=adultLifeAssessmentForSkill(module.skill,'transfer');
  if(!assessment||!window.app?.quiz)return;
  ensureInitialPracticeMode();
  if(!loadState().transferMode&&window.app?.toggleTransfer) window.app.toggleTransfer();
  window.app.quiz(`adult-life-transfer-${module.id}`,choiceId,assessment.good,module.skill);
  if(loadState().transferMode&&window.app?.toggleTransfer) window.app.toggleTransfer();
  const correct=choiceId===assessment.good;
  lastTransferAnswer={moduleId:module.id,choiceId,correct};
  render();
  [...document.querySelectorAll('[data-adult-transfer-answer]')].find(button=>button.dataset.adultTransferAnswer===choiceId)?.focus();
}

function adultLifeRetrievalContext(){
  const persisted=loadState();
  const check=(persisted.learning?.delayedChecks||[]).find(x=>x.id===persisted.activeRetrievalCheck&&x.status==='scheduled');
  const assessment=check?adultLifeAssessmentForSkill(check.skill,'retention'):null;
  return assessment?{persisted,check,assessment,module:adultLifeModuleForSkill(check.skill)}:null;
}

function completeAdultLifeRetrieval(id,choiceId){
  const persisted=loadState();
  const check=(persisted.learning?.delayedChecks||[]).find(x=>x.id===id&&x.status==='scheduled');
  const assessment=check?adultLifeAssessmentForSkill(check.skill,'retention'):null;
  if(!check||!assessment)return;
  const correct=choiceId===assessment.good;
  const prompted=!!persisted.retrievalHelpUsed?.[id];
  completeDelayedCheck(persisted,id,{correct,prompted});
  recordLearningDecision(persisted,check.skill,correct,{
    prompted,
    transfer:false,
    errorType:correct?'':'retrieval',
    scheduleRetention:false,
    detail:`Adult Life delayed retrieval stage ${check.stage}`
  });
  if(!correct||prompted) scheduleDelayedCheck(persisted,check.skill,{stage:check.stage});
  persisted.activeRetrievalCheck=null;
  saveState(persisted);
  sessionStorage.setItem('nws-v19-retention-feedback',JSON.stringify({
    correct,
    moduleTitle:adultLifeModuleForSkill(check.skill)?.title||check.skill,
    help:assessment.help
  }));
  sessionStorage.setItem('nws-v19-resume-screen','progress');
  location.reload();
}

function enhanceAdultLifeRetrieval(){
  const context=adultLifeRetrievalContext();
  if(!context)return false;
  const {persisted,check,assessment,module}=context;
  const host=document.getElementById('progress');
  const delayedTag=[...(host?.querySelectorAll('.tag')||[])].find(node=>node.textContent?.trim()==='Delayed check');
  const card=delayedTag?.closest('.card');
  if(!card)return false;
  const helped=!!persisted.retrievalHelpUsed?.[check.id];
  card.dataset.adultLifeRetention='true';
  card.innerHTML=`<span class="tag">Delayed check</span><div class="row between"><h3 style="margin:8px 0">${esc(module?.title||check.skill)}</h3><span class="tag info">Retention</span></div><p class="sub">This later item checks the same skill after time has passed. It does not count as a novel transfer attempt.</p><p><b>${esc(assessment.question)}</b></p><div class="row">${assessment.choices.map(choice=>`<button type="button" class="btn secondary" data-adult-retention-answer="${esc(choice[0])}" onclick="app.answerAdultLifeRetrieval('${esc(check.id)}','${esc(choice[0])}')">${esc(choice[1])}</button>`).join('')}</div><div style="height:10px"></div>${helped?`<div class="hint">${esc(assessment.help)}</div>`:`<button type="button" class="btn ghost" onclick="app.retrievalHelp('${esc(check.id)}')">Show help</button>`}`;
  return true;
}

function showRetentionFeedback(){
  const raw=sessionStorage.getItem('nws-v19-retention-feedback');
  if(!raw)return;
  sessionStorage.removeItem('nws-v19-retention-feedback');
  let feedback;
  try{feedback=JSON.parse(raw);}catch{return;}
  const host=document.getElementById('progress');
  if(!host)return;
  const card=document.createElement('div');
  card.className='card';
  card.id='adult-life-retention-feedback';
  card.tabIndex=-1;
  card.setAttribute('role','status');
  card.innerHTML=`<span class="tag info">Retention result</span><h3>${esc(feedback.moduleTitle)}</h3><p><b>${feedback.correct?'Independent delayed response recorded.':'Delayed response needs more practice.'}</b></p><p>${esc(feedback.help)}</p>`;
  host.prepend(card);
  card.focus({preventScroll:true});
}

function patchRetrievalRuntime(){
  if(retrievalPatched||!window.app)return;
  retrievalPatched=true;
  const originalStart=window.app.startRetrieval?.bind(window.app);
  const originalHelp=window.app.retrievalHelp?.bind(window.app);
  if(originalStart) window.app.startRetrieval=id=>{
    originalStart(id);
    queueMicrotask(enhanceAdultLifeRetrieval);
  };
  if(originalHelp) window.app.retrievalHelp=id=>{
    originalHelp(id);
    queueMicrotask(enhanceAdultLifeRetrieval);
  };
  window.app.answerAdultLifeRetrieval=(id,choiceId)=>completeAdultLifeRetrieval(id,choiceId);
}

// Called by the course shell when a lesson opens this screen: select the lesson's own
// tab so the content matches the breadcrumb (fixes the credit/banking mismatch).
let lessonMode=false;
function openModule(moduleId,fromLesson){
  lessonMode=!!fromLesson;
  if(moduleId&&ADULT_LIFE_MODULES.some(m=>m.id===moduleId)){
    activeModuleId=moduleId; lastAnswer=null; lastTransferAnswer=null;
  }
  render();
}
window.nwsAdultLifeOpenModule=openModule;

function bind(){
  document.querySelectorAll('[data-adult-module]').forEach(button=>button.addEventListener('click',()=>{
    activeModuleId=button.dataset.adultModule;
    lastAnswer=null;
    lastTransferAnswer=null;
    render();
    document.getElementById('adult-life')?.focus({preventScroll:true});
  }));
  document.querySelectorAll('[data-adult-answer]').forEach(button=>button.addEventListener('click',()=>recordChoice(activeModule(),button.dataset.adultAnswer)));
  document.querySelectorAll('[data-adult-transfer-answer]').forEach(button=>button.addEventListener('click',()=>recordTransferChoice(activeModule(),button.dataset.adultTransferAnswer)));
}

function initialize(){
  render();
  patchRetrievalRuntime();
  enhanceAdultLifeRetrieval();
  document.querySelector('[data-screen="adult-life"]')?.addEventListener('click',()=>{
    ensureInitialPracticeMode();
    queueMicrotask(render);
  });
  document.querySelector('[data-screen="progress"]')?.addEventListener('click',()=>queueMicrotask(enhanceAdultLifeRetrieval));
  if(sessionStorage.getItem('nws-v19-resume-screen')==='progress'){
    sessionStorage.removeItem('nws-v19-resume-screen');
    queueMicrotask(()=>{
      window.app?.show?.('progress');
      queueMicrotask(()=>{
        enhanceAdultLifeRetrieval();
        showRetentionFeedback();
      });
    });
  }
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initialize,{once:true});else initialize();
