import { loadState, saveState } from './state.js';
import { recordLearningDecision } from './mastery.js';
import {
  syncSuccessfulRecoveryFollowups,
  dueRecoveryFollowups,
  scheduledRecoveryFollowups,
  markRecoveryFollowupHelp,
  completeRecoveryFollowup,
  recoveryFollowupStatus,
  recoveryFollowupProbe
} from './recovery-followup.js';

const RESUME_KEY='nws-v23-resume-recovery-followup';
const SYNC_KEY='nws-v23-followup-synced';
const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

function reloadProgress(state){
  saveState(state);
  sessionStorage.setItem(RESUME_KEY,'1');
  location.reload();
}

function ensureHost(){
  const progress=document.getElementById('progress');
  if(!progress) return null;
  let host=document.getElementById('recoveryFollowupHost');
  if(!host){
    host=document.createElement('div');
    host.id='recoveryFollowupHost';
    progress.append(host);
  }
  return host;
}

function stat(label,value){return `<div class="stat"><span>${esc(label)}</span><b>${esc(value)}</b></div>`;}

function dueCard(check,probe){
  const phase=check.phase==='transfer'?'Recovery transfer':'Delayed recovery';
  const helped=!!check.helpRequested;
  return `<div class="card"><div class="row between"><div><span class="tag ${check.phase==='transfer'?'info':'warn'}">${phase}</span><h3 style="margin:8px 0 2px">${esc(probe.title)}</h3></div>${check.phase==='retention'?`<span class="tag">${esc(check.intervalDays)}-day check</span>`:''}</div><p><b>${esc(probe.prompt)}</b></p><div class="stack">${probe.choices.map(choice=>`<button type="button" class="btn secondary" data-recovery-followup-choice="${esc(choice.id)}" data-recovery-followup-id="${esc(check.id)}">${esc(choice.label)}</button>`).join('')}</div><div style="height:10px"></div>${helped?`<div class="hint"><b>Recovery cue:</b> Start from what is true now. Keep the consequence visible, identify what still must happen, and change what is still flexible.</div>`:`<button type="button" class="btn ghost" id="recoveryFollowupHelp" data-recovery-followup-id="${esc(check.id)}">Show recovery cue</button>`}<p class="sub">${check.phase==='transfer'?'This is a changed-context recovery check. It is separate from the original recovery attempt.':'This delayed check uses another context to test whether the recovery process is still available later.'} Help remains available, but a supported response is not counted as independent recovery evidence.</p></div>`;
}

function feedbackCard(last){
  if(!last)return'';
  return `<div class="result" role="status"><b>${last.correct?'Recovery process identified.':'This recovery plan still needs revision.'}</b><p>${esc(last.feedback||'')}</p>${last.nextIntervalDays?`<p class="sub">An independent correct response scheduled another recovery check in ${last.nextIntervalDays} days.</p>`:''}</div>`;
}

export function renderRecoveryFollowup(){
  const host=ensureHost();
  if(!host)return;
  const state=loadState();
  const queued=syncSuccessfulRecoveryFollowups(state);
  if(queued>0&&!sessionStorage.getItem(SYNC_KEY)){
    saveState(state);
    sessionStorage.setItem(SYNC_KEY,'1');
    sessionStorage.setItem(RESUME_KEY,'1');
    location.reload();
    return;
  }
  sessionStorage.removeItem(SYNC_KEY);
  const due=dueRecoveryFollowups(state).sort((a,b)=>new Date(a.dueAt)-new Date(b.dueAt));
  const scheduled=scheduledRecoveryFollowups(state);
  const status=recoveryFollowupStatus(state);
  const check=due[0]||null;
  const probe=recoveryFollowupProbe(check);
  const last=state.learning?.lastRecoveryFollowup||null;
  const future=scheduled.filter(x=>!due.some(d=>d.id===x.id)).sort((a,b)=>new Date(a.dueAt)-new Date(b.dueAt));
  const next=future[0]||null;

  host.innerHTML=`<div class="section-title"><div><h2>Recovery follow-up</h2><p>Recovery is measured separately from the original decision. NWS checks whether the re-planning process transfers to a different mistake and remains available later.</p></div></div><div class="card"><div class="stats">${stat('Due now',status.due)}${stat('Recovery transfer',status.transferIndependentPercent==null?'—':`${status.transferIndependentPercent}%`)}${stat('Recovery retention',status.retentionIndependentPercent==null?'—':`${status.retentionIndependentPercent}%`)}${stat('Scheduled',status.scheduled)}</div><p class="sub">The delayed recovery pilot uses 7 / 21 days after an independent transfer success. That timing is an NWS evaluation hypothesis, not an autism-specific norm.</p>${next?`<p class="sub">Next scheduled recovery follow-up: ${esc(next.phase)} in ${esc(next.intervalDays)} days.</p>`:''}</div>${feedbackCard(last)}${check&&probe?dueCard(check,probe):'<div class="card"><b>No recovery follow-up is due right now.</b><p class="sub">A changed-context transfer check is queued after a successful Life Simulation recovery. Independent transfer success can then schedule delayed recovery checks.</p></div>'}`;

  document.getElementById('recoveryFollowupHelp')?.addEventListener('click',event=>{
    const fresh=loadState();
    const id=event.currentTarget.dataset.recoveryFollowupId;
    if(markRecoveryFollowupHelp(fresh,id)){
      fresh.learning.hintsUsed=(Number(fresh.learning.hintsUsed)||0)+1;
      reloadProgress(fresh);
    }
  });
  host.querySelectorAll('[data-recovery-followup-choice]').forEach(button=>button.addEventListener('click',()=>{
    const fresh=loadState();
    const id=button.dataset.recoveryFollowupId;
    const result=completeRecoveryFollowup(fresh,id,button.dataset.recoveryFollowupChoice);
    if(!result)return;
    const phase=result.check.phase;
    recordLearningDecision(fresh,result.check.skill,result.correct,{
      prompted:result.check.prompted,
      transfer:phase==='transfer',
      recovery:true,
      recoveryPhase:phase,
      errorType:result.correct?'':'recovery-followup',
      scheduleRetention:false,
      detail:`Recovery ${phase} follow-up ${result.probe.id}`
    });
    fresh.learning.lastRecoveryFollowup={
      phase,
      correct:result.correct,
      feedback:result.selected.feedback,
      nextIntervalDays:result.next?.intervalDays||null
    };
    reloadProgress(fresh);
  }));
}

function initialize(){
  document.querySelector('[data-screen="progress"]')?.addEventListener('click',()=>queueMicrotask(renderRecoveryFollowup));
  if(sessionStorage.getItem(RESUME_KEY)==='1'){
    sessionStorage.removeItem(RESUME_KEY);
    queueMicrotask(()=>{
      window.app?.show?.('progress');
      queueMicrotask(()=>{
        renderRecoveryFollowup();
        document.getElementById('recoveryFollowupHost')?.scrollIntoView({block:'nearest'});
      });
    });
  }
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initialize,{once:true});else initialize();
