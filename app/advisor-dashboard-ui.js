import { loadState } from './state.js';
import { buildAdvisorDashboardModel, buildAdvisorDashboardExport } from './advisor-dashboard.js';

const esc = value => String(value ?? '').replace(/[&<>"']/g,char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const pct = value => value == null ? '—' : `${value}%`;

function retentionText(skill){
  if(skill.retentionEvidence?.due > 0) return 'Due';
  if(skill.retentionEvidence?.retentionPercent != null) return `${skill.retentionEvidence.retentionPercent}%`;
  if(skill.retentionEvidence?.scheduled > 0) return 'Scheduled';
  return 'Not scheduled';
}

function recoveryText(percent,completed,due,scheduled){
  if(due > 0) return 'Due';
  if(percent != null) return `${percent}%`;
  if(completed > 0) return 'Completed';
  if(scheduled > 0) return 'Scheduled';
  return '—';
}

function recoveryTransferText(skill){
  return recoveryText(
    skill.recoveryFollowup.transferIndependentPercent,
    skill.recoveryFollowup.transferCompleted,
    skill.recoveryFollowup.transferDue,
    skill.recoveryFollowup.transferScheduled
  );
}

function recoveryRetentionText(skill){
  return recoveryText(
    skill.recoveryFollowup.retentionIndependentPercent,
    skill.recoveryFollowup.retentionCompleted,
    skill.recoveryFollowup.retentionDue,
    skill.recoveryFollowup.retentionScheduled
  );
}

function errorsText(errors=[]){
  if(!errors.length) return 'None recorded';
  return errors.slice(0,3).map(item => `${item.category} (${item.count})`).join(', ');
}

function actionCards(model){
  if(!model.actions.length) return '<p class="positive">No immediate evidence action is flagged. Continue varied practice and scheduled maintenance checks.</p>';
  const visible = model.actions.slice(0,6);
  const remaining = model.actions.length - visible.length;
  return `<div class="grid g2">${visible.map(action => `<div class="module"><b>${esc(action.skillLabel)} — ${esc(action.label)}</b><small>${esc(action.reason)}</small></div>`).join('')}</div>${remaining>0?`<p class="sub">${remaining} additional skill action${remaining===1?' is':'s are'} shown in the full evidence matrix below.</p>`:''}`;
}

function evidenceRows(model){
  return model.skills.map(skill => `<tr>
      <th scope="row">${esc(skill.label)}</th>
      <td>${skill.scoredAttempts}</td>
      <td>${pct(skill.accuracy)}</td>
      <td>${pct(skill.independence)}</td>
      <td>${pct(skill.promptedPercent)}</td>
      <td>${pct(skill.transfer)}</td>
      <td>${esc(retentionText(skill))}</td>
      <td>${pct(skill.recoveryImmediate)}</td>
      <td>${esc(recoveryTransferText(skill))}</td>
      <td>${esc(recoveryRetentionText(skill))}</td>
      <td>${esc(skill.nextAction.label)}</td>
    </tr>`).join('');
}

function errorRows(model){
  const withErrors = model.skills.filter(skill => skill.errors.length);
  if(!withErrors.length) return '<p class="sub">No categorized errors are recorded yet.</p>';
  return `<div style="overflow-x:auto"><table><caption>Error and support patterns by skill</caption><thead><tr><th>Skill</th><th>Error categories</th><th>Prompted attempts</th><th>Scored attempts</th></tr></thead><tbody>${withErrors.map(skill => `<tr><th scope="row">${esc(skill.label)}</th><td>${esc(errorsText(skill.errors))}</td><td>${skill.promptedAttempts}</td><td>${skill.scoredAttempts}</td></tr>`).join('')}</tbody></table></div>`;
}

function scenarioModeRows(model){
  if(!model.scenarioExposure.modes.length) return '<p class="sub">No completed scenario exposure is recorded yet.</p>';
  return `<div class="row">${model.scenarioExposure.modes.map(item => `<span class="tag info">${esc(item.mode)}: ${item.count}</span>`).join('')}</div>`;
}

function printableHtml(state,model){
  const rows = model.skills.map(skill => `<tr><td>${esc(skill.label)}</td><td>${pct(skill.accuracy)}</td><td>${pct(skill.independence)}</td><td>${pct(skill.transfer)}</td><td>${esc(retentionText(skill))}</td><td>${pct(skill.recoveryImmediate)}</td><td>${esc(recoveryTransferText(skill))}</td><td>${esc(recoveryRetentionText(skill))}</td><td>${esc(skill.nextAction.label)}</td></tr>`).join('');
  const actions = model.actions.length ? `<ul>${model.actions.map(action => `<li><b>${esc(action.skillLabel)}:</b> ${esc(action.label)} — ${esc(action.reason)}</li>`).join('')}</ul>` : '<p>No immediate evidence action is flagged.</p>';
  return `<!doctype html><html><head><meta charset="utf-8"><title>NWS advisor evidence summary</title><style>body{font-family:system-ui,sans-serif;margin:32px;color:#111}h1,h2{margin-bottom:8px}.muted{color:#555}table{width:100%;border-collapse:collapse;margin:16px 0;font-size:11px}th,td{border:1px solid #bbb;padding:6px;text-align:left;vertical-align:top}.stats{display:grid;grid-template-columns:repeat(4,minmax(120px,1fr));gap:10px}.stat{border:1px solid #bbb;padding:10px}@media print{body{margin:10mm}}</style></head><body><h1>NWS advisor evidence summary</h1><p class="muted">Learner: ${esc(state.profile?.name || 'Learner')} · Generated ${esc(model.generatedAt)}</p><p>${esc(model.interpretationNote)}</p><div class="stats"><div class="stat"><b>${model.summary.scoredDecisions}</b><br>Scored decisions</div><div class="stat"><b>${pct(model.summary.accuracyPercent)}</b><br>Accuracy</div><div class="stat"><b>${pct(model.summary.independencePercent)}</b><br>Independence</div><div class="stat"><b>${pct(model.summary.promptedPercent)}</b><br>Prompted</div></div><h2>Next evidence actions</h2>${actions}<h2>Skill evidence</h2><table><thead><tr><th>Skill</th><th>Accuracy</th><th>Independence</th><th>Transfer</th><th>Retention</th><th>Recovery now</th><th>Recovery transfer</th><th>Recovery retention</th><th>Next action</th></tr></thead><tbody>${rows}</tbody></table><p class="muted">Standard scenario runs: ${model.scenarioExposure.standardRuns}. Custom scenario runs: ${model.scenarioExposure.customRuns}. This is an educational evidence summary, not a clinical score or validated autism norm.</p></body></html>`;
}

function downloadReport(state){
  const payload = buildAdvisorDashboardExport(state);
  const url = URL.createObjectURL(new Blob([JSON.stringify(payload,null,2)],{type:'application/json'}));
  const link = document.createElement('a');
  link.href = url;
  link.download = 'nws-advisor-evidence.json';
  link.click();
  URL.revokeObjectURL(url);
}

function printReport(state,model){
  const popup = window.open('','_blank');
  if(!popup) return;
  try{ popup.opener = null; }catch{}
  popup.document.open();
  popup.document.write(printableHtml(state,model));
  popup.document.close();
  popup.focus();
  popup.print();
}

export function renderAdvisorDashboard(){
  const host = document.getElementById('advisor-dashboard');
  if(!host) return;
  const state = loadState();
  const model = buildAdvisorDashboardModel(state);
  const summary = model.summary;
  host.innerHTML = `<div class="hero"><div class="row between"><div><h2 id="advisor-dashboard-heading">Advisor Evidence Dashboard</h2><p class="sub">See the evidence dimensions separately. NWS does not combine them into one mastery score.</p></div><div class="row"><button class="btn secondary" type="button" id="advisorDashboardDownload">Download summary</button><button class="btn secondary" type="button" id="advisorDashboardPrint">Print / Save PDF</button></div></div><div class="stats"><div class="stat"><span>Skills started</span><b>${summary.skillsStarted} / ${summary.skillsTotal}</b></div><div class="stat"><span>Accuracy</span><b>${pct(summary.accuracyPercent)}</b></div><div class="stat"><span>Independence</span><b>${pct(summary.independencePercent)}</b></div><div class="stat"><span>Prompted attempts</span><b>${pct(summary.promptedPercent)}</b></div><div class="stat"><span>Delayed checks due</span><b>${summary.delayedChecksDue}</b></div><div class="stat"><span>Recovery checks due</span><b>${summary.recoveryChecksDue}</b></div><div class="stat"><span>Standard scenario runs</span><b>${model.scenarioExposure.standardRuns}</b></div><div class="stat"><span>Custom scenario runs</span><b>${model.scenarioExposure.customRuns}</b></div></div></div>
  <div class="section-title"><div><h2>Next evidence actions</h2><p>These are rule-based instructional prompts from the evidence pattern, not a diagnosis or automated placement decision.</p></div></div><div class="card">${actionCards(model)}</div>
  <div class="section-title"><div><h2>Skill-by-skill evidence</h2><p>Recovery transfer and recovery retention are attributed to the skill where the original recovery occurred, even when the follow-up uses a different financial context.</p></div></div><div class="card"><div style="overflow-x:auto"><table><caption>Advisor evidence matrix by skill</caption><thead><tr><th>Skill</th><th>Attempts</th><th>Accuracy</th><th>Independence</th><th>Prompted</th><th>Transfer</th><th>Retention</th><th>Recovery now</th><th>Recovery transfer</th><th>Recovery retention</th><th>Next evidence action</th></tr></thead><tbody>${evidenceRows(model)}</tbody></table></div><p class="sub">${esc(model.interpretationNote)}</p></div>
  <div class="section-title"><h2>Error and support patterns</h2></div><div class="card">${errorRows(model)}</div>
  <div class="section-title"><h2>Scenario exposure</h2></div><div class="card"><div class="stats"><div class="stat"><span>Total completed runs</span><b>${model.scenarioExposure.totalRuns}</b></div><div class="stat"><span>Standard</span><b>${model.scenarioExposure.standardRuns}</b></div><div class="stat"><span>Custom</span><b>${model.scenarioExposure.customRuns}</b></div><div class="stat"><span>Independent recovery successes</span><b>${summary.independentRecoverySuccesses}</b></div></div><div style="height:12px"></div>${scenarioModeRows(model)}</div>
  <div class="section-title"><h2>Interpretation boundary</h2></div><div class="card"><div class="callout"><b>No composite score.</b> Accuracy, independence, transfer, retention, recovery, and support use can move differently and should be interpreted separately.</div><div class="callout"><b>Recovery is opportunity-dependent.</b> A blank recovery field can mean no relevant error/recovery opportunity has occurred; it does not automatically mean the learner cannot recover.</div><div class="callout"><b>Pilot criterion.</b> The 80% criterion is an NWS product hypothesis to evaluate, not an autism-specific norm or clinical cutoff.</div></div>`;
  host.setAttribute('aria-labelledby','advisor-dashboard-heading');
  document.getElementById('advisorDashboardDownload')?.addEventListener('click',() => downloadReport(loadState()));
  document.getElementById('advisorDashboardPrint')?.addEventListener('click',() => {
    const current = loadState();
    printReport(current,buildAdvisorDashboardModel(current));
  });
}

function initialize(){
  renderAdvisorDashboard();
  document.querySelector('[data-screen="advisor-dashboard"]')?.addEventListener('click',() => queueMicrotask(renderAdvisorDashboard));
}

if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded',initialize,{once:true});
else initialize();
