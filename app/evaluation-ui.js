import { loadState } from './state.js';
import { buildDeidentifiedEvaluationExport, evaluationExportContainsForbiddenKeys } from './evaluation-export.js';
import {
  EVALUATION_POSITION, EVALUATION_PHASES, EVALUATION_DIMENSIONS, SUPPORT_LEVELS,
  EVALUATION_DATA_EXCLUSIONS, READINESS_CHECKS
} from '../content/evaluation.js';

const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

function readinessList(){
  return `<ul>${READINESS_CHECKS.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`;
}

function render(){
  const host=document.getElementById('evaluation');
  if(!host) return;
  const state=loadState();
  const decisions=state.learning?.decisions?.length||0;
  const delayed=state.learning?.delayedChecks?.length||0;
  const recoveryFollowups=state.learning?.recoveryFollowups?.length||0;
  const scenarios=state.learning?.scenarioHistory?.length||0;
  host.innerHTML=`<div class="hero"><h2 id="evaluation-heading">Evaluation readiness</h2><p class="sub">${esc(EVALUATION_POSITION.label)}. ${esc(EVALUATION_POSITION.statement)}</p><div class="warning"><b>Before formal research:</b> ${esc(EVALUATION_POSITION.governance)}</div></div><div class="section-title"><div><h2>Staged evidence program</h2><p>Do not jump from a working prototype directly to a broad efficacy claim.</p></div></div><div class="grid g2">${EVALUATION_PHASES.map(x=>`<div class="card"><b>${esc(x.label)}</b><p class="sub">${esc(x.purpose)}</p></div>`).join('')}</div><div class="section-title"><h2>What NWS measures separately</h2></div><div class="card"><div class="grid g2">${EVALUATION_DIMENSIONS.map(x=>`<div class="module"><b>${esc(x.label)}</b><small>${esc(x.definition)}</small></div>`).join('')}</div></div><div class="section-title"><h2>Prompt / support coding</h2></div><div class="card"><table><thead><tr><th scope="col">Level</th><th scope="col">Definition</th></tr></thead><tbody>${SUPPORT_LEVELS.map(x=>`<tr><td>${x.value}</td><td>${esc(x.label)}</td></tr>`).join('')}</tbody></table></div><div class="section-title"><h2>Local evidence currently available</h2></div><div class="card"><div class="stats"><div class="stat"><span>Decisions</span><b>${decisions}</b></div><div class="stat"><span>Delayed checks</span><b>${delayed}</b></div><div class="stat"><span>Recovery follow-ups</span><b>${recoveryFollowups}</b></div><div class="stat"><span>Scenario histories</span><b>${scenarios}</b></div><div class="stat"><span>Automatic upload</span><b>No</b></div></div><p class="sub">This is local educational data. A formal research study still requires its own approved governance, consent, recruitment, and data-handling process.</p></div><div class="section-title"><h2>De-identified evaluation snapshot</h2></div><div class="card"><div class="field"><label for="evaluationParticipantCode">Study-assigned participant code (optional)</label><input id="evaluationParticipantCode" type="text" maxlength="32" autocomplete="off" placeholder="Example: P-014"><small>Use a random/study code — not a name, student ID, email, or other identifier.</small></div><div style="height:12px"></div><div class="row"><button class="btn secondary" type="button" id="downloadEvaluationSnapshot">Download de-identified snapshot</button></div><p class="sub">The export strips learner name, free text, exact timestamps, scenario seeds, exact budget amounts, and other direct identifiers. For Life Simulation, it includes only simulation version/status, aggregate counts, and coarse outcome bands—not raw seeds, titles, exact amounts, or decision text. Recovery follow-ups export only categorical phase/stage/skill/outcome evidence; probe IDs, lineage IDs, prompts, response text, and dates are excluded. It does not upload anything.</p></div><div class="section-title"><h2>Research-readiness checklist</h2></div><div class="card">${readinessList()}</div><div class="section-title"><h2>Excluded by default</h2></div><div class="card"><p class="sub">${EVALUATION_DATA_EXCLUSIONS.map(esc).join(' · ')}</p></div>`;
  host.setAttribute('aria-labelledby','evaluation-heading');
  document.getElementById('downloadEvaluationSnapshot')?.addEventListener('click',downloadSnapshot);
}

function downloadSnapshot(){
  const state=loadState();
  const participantCode=document.getElementById('evaluationParticipantCode')?.value||'';
  const payload=buildDeidentifiedEvaluationExport(state,{participantCode});
  if(evaluationExportContainsForbiddenKeys(payload)){
    alert('NWS blocked this export because an excluded identifying field was detected.');
    return;
  }
  const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'});
  const url=URL.createObjectURL(blob);
  const link=document.createElement('a');
  link.href=url;
  link.download='nws-evaluation-snapshot.json';
  link.click();
  URL.revokeObjectURL(url);
}

function initialize(){
  render();
  document.querySelector('[data-screen="evaluation"]')?.addEventListener('click',()=>queueMicrotask(render));
}

if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',initialize,{once:true});
else initialize();
