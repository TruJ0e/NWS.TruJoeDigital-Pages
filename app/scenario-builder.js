import { loadState } from './state.js';
import {
  latestScenarioDefinitions, scenarioVersions, saveNewScenarioRevision, importScenarioDefinition,
  activateScenarioDefinition, clearActiveCustomScenario, exportScenarioDefinition,
  recordCustomScenarioRunFromState
} from './scenario-library.js';
import { EVENT_TYPES, SKILL_TAGS, scenarioDefinitionFingerprint } from '../content/scenario-schema.js';

const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let draft={scenarioId:'',title:'',description:'',events:[defaultEvent(1)]};

function defaultEvent(n){
  return {id:`event-${n}`,title:'',text:'',type:'need',required:true,surprise:false,skill:'weekly',amountRule:{kind:'weeklyPercent',value:20}};
}

function stateActive(){ return loadState().customScenarioActive; }
function dollarsOrPercent(event){ return Number(event.amountRule?.value)||0; }

function eventEditor(event,index){
  const controlId=name=>`scenario-event-${index}-${name}`;
  return `<fieldset class="card scenario-event" data-event-index="${index}"><legend><b>Event ${index+1}</b></legend><div class="grid g3"><div class="field"><label for="${controlId('id')}">Event ID</label><input id="${controlId('id')}" data-field="id" value="${esc(event.id)}" maxlength="48"></div><div class="field"><label for="${controlId('title')}">Title</label><input id="${controlId('title')}" data-field="title" value="${esc(event.title)}" maxlength="80"></div><div class="field"><label for="${controlId('type')}">Type</label><select id="${controlId('type')}" data-field="type">${EVENT_TYPES.map(x=>`<option value="${x}" ${x===event.type?'selected':''}>${esc(x)}</option>`).join('')}</select></div><div class="field"><label for="${controlId('amount-kind')}">Amount rule</label><select id="${controlId('amount-kind')}" data-field="amountKind"><option value="fixed" ${event.amountRule?.kind==='fixed'?'selected':''}>Fixed fictional dollars</option><option value="weeklyPercent" ${event.amountRule?.kind==='weeklyPercent'?'selected':''}>% of weekly-equivalent budget</option></select></div><div class="field"><label for="${controlId('amount-value')}">Amount / percent</label><input id="${controlId('amount-value')}" data-field="amountValue" type="number" min="0" step="0.01" value="${dollarsOrPercent(event)}"></div><div class="field"><label for="${controlId('skill')}">Skill tag</label><select id="${controlId('skill')}" data-field="skill"><option value="">Automatic / none</option>${SKILL_TAGS.map(x=>`<option value="${x}" ${x===event.skill?'selected':''}>${esc(x)}</option>`).join('')}</select></div></div><div class="field"><label for="${controlId('text')}">Plain-language prompt</label><textarea id="${controlId('text')}" data-field="text" rows="2" maxlength="320">${esc(event.text)}</textarea></div><div class="row"><label><input data-field="required" type="checkbox" ${event.required?'checked':''}> Required cost</label><label><input data-field="surprise" type="checkbox" ${event.surprise?'checked':''}> Unexpected-event behavior</label><button type="button" class="btn secondary" data-action="remove-event" data-index="${index}">Remove event</button></div></fieldset>`;
}

function libraryCard(def){
  const versions=scenarioVersions(def.scenarioId).length;
  const active=stateActive();
  const selected=active&&active.scenarioId===def.scenarioId&&active.revision===def.revision;
  return `<div class="card"><div class="row between"><div><b>${esc(def.title)}</b><div class="sub">${esc(def.scenarioId)} · revision ${def.revision} · ${versions} saved version${versions===1?'':'s'}</div></div>${selected?'<span class="tag info">Active</span>':''}</div><p class="sub">${esc(def.description||'No description.')}</p><div class="row"><button type="button" class="btn" data-action="activate" data-id="${esc(def.scenarioId)}" data-revision="${def.revision}">Activate for learner</button><button type="button" class="btn secondary" data-action="edit" data-id="${esc(def.scenarioId)}" data-revision="${def.revision}">Load as new revision</button><button type="button" class="btn secondary" data-action="download" data-id="${esc(def.scenarioId)}" data-revision="${def.revision}">Download JSON</button></div><p class="sub">Fingerprint: ${esc(scenarioDefinitionFingerprint(def))}</p></div>`;
}

function readDraft(){
  const host=document.getElementById('scenarios');
  if(!host) return draft;
  draft.scenarioId=host.querySelector('#scenarioId')?.value||draft.scenarioId;
  draft.title=host.querySelector('#scenarioTitle')?.value||'';
  draft.description=host.querySelector('#scenarioDescription')?.value||'';
  draft.events=[...host.querySelectorAll('[data-event-index]')].map((row,index)=>({
    id:row.querySelector('[data-field="id"]')?.value||`event-${index+1}`,
    title:row.querySelector('[data-field="title"]')?.value||'',
    text:row.querySelector('[data-field="text"]')?.value||'',
    type:row.querySelector('[data-field="type"]')?.value||'want',
    required:!!row.querySelector('[data-field="required"]')?.checked,
    surprise:!!row.querySelector('[data-field="surprise"]')?.checked,
    skill:row.querySelector('[data-field="skill"]')?.value||null,
    amountRule:{kind:row.querySelector('[data-field="amountKind"]')?.value||'fixed',value:Number(row.querySelector('[data-field="amountValue"]')?.value)||0}
  }));
  return draft;
}

function render(message=''){
  const host=document.getElementById('scenarios');
  if(!host) return;
  const defs=latestScenarioDefinitions();
  const active=stateActive();
  host.innerHTML=`<div class="hero"><h2 id="scenarios-heading">Scenario Builder</h2><p class="sub">Create fictional college-transition practice contexts without changing NWS’s core decision routine.</p><div class="warning"><b>Research comparability:</b> default NWS scenarios stay stable. Custom scenarios are versioned and identified separately; formal evaluation should pre-specify which definition/revision is used.</div>${active?`<div class="callout"><b>Active custom scenario:</b> ${esc(active.title)} · revision ${active.revision} · ${esc(scenarioDefinitionFingerprint(active))}</div>`:'<div class="callout">No custom scenario is active.</div>'}${message?`<div class="result" role="status">${esc(message)}</div>`:''}</div><div class="section-title"><div><h2>Build a scenario</h2><p>Plain data only. No code, formulas, or real student financial identifiers.</p></div></div><div class="card"><div class="grid g3"><div class="field"><label for="scenarioId">Scenario ID</label><input id="scenarioId" maxlength="48" value="${esc(draft.scenarioId)}" placeholder="campus-transport"><small>Stable local identifier. Saving again creates a new revision.</small></div><div class="field"><label for="scenarioTitle">Title</label><input id="scenarioTitle" maxlength="80" value="${esc(draft.title)}" placeholder="Campus transportation week"></div></div><div class="field"><label for="scenarioDescription">Description</label><textarea id="scenarioDescription" rows="2" maxlength="320">${esc(draft.description)}</textarea></div></div><div class="section-title"><h2>Events</h2><button type="button" class="btn secondary" id="addScenarioEvent">Add event</button></div><div class="stack">${draft.events.map(eventEditor).join('')}</div><div class="card"><div class="row"><button type="button" class="btn" id="saveScenarioRevision">Save new revision</button><button type="button" class="btn secondary" id="newScenarioDraft">New blank scenario</button><label class="btn secondary">Import JSON<input id="importScenarioFile" type="file" accept="application/json" hidden></label>${active?'<button type="button" class="btn warn" id="clearActiveScenario">Deactivate custom scenario</button>':''}</div></div><div class="section-title"><div><h2>Local scenario library</h2><p>Definitions stay in this browser unless explicitly downloaded.</p></div></div><div class="stack">${defs.length?defs.map(libraryCard).join(''):'<div class="card"><p class="sub">No custom scenarios saved yet.</p></div>'}</div>`;
  host.setAttribute('aria-labelledby','scenarios-heading');
  bind();
}

function findDefinition(id,revision){ return scenarioVersions(id).find(x=>Number(x.revision)===Number(revision)); }

function bind(){
  document.getElementById('addScenarioEvent')?.addEventListener('click',()=>{readDraft();if(draft.events.length>=12)return render('A scenario can contain up to 12 events.');draft.events.push(defaultEvent(draft.events.length+1));render()});
  document.querySelectorAll('[data-action="remove-event"]').forEach(button=>button.addEventListener('click',()=>{readDraft();draft.events.splice(Number(button.dataset.index),1);if(!draft.events.length)draft.events=[defaultEvent(1)];render()}));
  document.getElementById('newScenarioDraft')?.addEventListener('click',()=>{draft={scenarioId:'',title:'',description:'',events:[defaultEvent(1)]};render()});
  document.getElementById('saveScenarioRevision')?.addEventListener('click',()=>{
    const input=readDraft();
    const result=saveNewScenarioRevision(input);
    if(!result.ok)return render(result.errors.join(' '));
    draft=JSON.parse(JSON.stringify(result.definition));
    render(`Saved ${result.definition.title}, revision ${result.definition.revision}.`);
  });
  document.getElementById('clearActiveScenario')?.addEventListener('click',()=>{clearActiveCustomScenario();location.reload()});
  document.querySelectorAll('[data-action="activate"]').forEach(button=>button.addEventListener('click',()=>{const def=findDefinition(button.dataset.id,button.dataset.revision);const result=activateScenarioDefinition(def);if(!result.ok)return render(result.errors.join(' '));location.reload()}));
  document.querySelectorAll('[data-action="edit"]').forEach(button=>button.addEventListener('click',()=>{const def=findDefinition(button.dataset.id,button.dataset.revision);if(def){draft=JSON.parse(JSON.stringify(def));render('Loaded this definition as the basis for a new revision.')}}));
  document.querySelectorAll('[data-action="download"]').forEach(button=>button.addEventListener('click',()=>{const def=findDefinition(button.dataset.id,button.dataset.revision),text=exportScenarioDefinition(def);if(!text)return;const url=URL.createObjectURL(new Blob([text],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download=`nws-scenario-${def.scenarioId}-r${def.revision}.json`;a.click();URL.revokeObjectURL(url)}));
  document.getElementById('importScenarioFile')?.addEventListener('change',event=>{const file=event.target.files?.[0];if(!file)return;const reader=new FileReader();reader.onload=()=>{try{const result=importScenarioDefinition(JSON.parse(reader.result));if(!result.ok)return render(result.errors.join(' '));draft=JSON.parse(JSON.stringify(result.definition));render(result.duplicate?'That exact definition already exists.':'Imported scenario definition.')}catch{render('That file is not valid NWS scenario JSON.')}};reader.readAsText(file)});
}

function wrapRunRecording(attempt=0){
  if(!window.app?.finishWeek){if(attempt<30)setTimeout(()=>wrapRunRecording(attempt+1),0);return}
  if(window.app.finishWeek.__nwsScenarioRecorded)return;
  const original=window.app.finishWeek.bind(window.app);
  const wrapped=(...args)=>{const result=original(...args);recordCustomScenarioRunFromState(loadState());return result};
  wrapped.__nwsScenarioRecorded=true;
  window.app.finishWeek=wrapped;
}

function initialize(){render();document.querySelector('[data-screen="scenarios"]')?.addEventListener('click',()=>queueMicrotask(()=>render()));wrapRunRecording()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initialize,{once:true});else initialize();
