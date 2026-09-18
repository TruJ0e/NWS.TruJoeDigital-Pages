import { BENEFITS_REVIEW, BENEFIT_TOPICS, benefitsNeedingReview } from '../content/benefits.js';

const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

function sourceLink(source){
  if(!source) return '';
  return `<a href="${esc(source.url)}" target="_blank" rel="noopener noreferrer">${esc(source.agency)} — ${esc(source.title)}</a>`;
}

function factsTable(facts=[]){
  if(!facts.length) return '';
  return `<div class="table-scroll" tabindex="0" aria-label="Current reviewed figures"><table><thead><tr><th scope="col">Reviewed fact</th><th scope="col">Current value</th></tr></thead><tbody>${facts.map(f=>`<tr><td>${esc(f.label)}</td><td><b>${esc(f.value)}</b></td></tr>`).join('')}</tbody></table></div>`;
}

function topicCard(topic){
  return `<article class="card benefits-card" id="benefit-${esc(topic.id)}"><h3>${esc(topic.title)}</h3><p>${esc(topic.summary)}</p><h4>What to learn</h4><ul>${topic.stableConcepts.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>${factsTable(topic.currentFacts)}<div class="source-note"><b>Official source:</b> ${sourceLink(topic.source)}${topic.secondarySource?`<br><b>Additional official source:</b> ${sourceLink(topic.secondarySource)}`:''}<br><span>Effective/review label: ${esc(topic.source.effective)} · review required: ${topic.source.reviewRequired?'yes':'no'}</span></div></article>`;
}

export function renderBenefits(){
  const host=document.getElementById('benefits');
  if(!host) return;
  const stale=benefitsNeedingReview(new Date());
  host.innerHTML=`<div class="hero"><h2 id="benefits-heading">Benefits & disability-related financial tools</h2><p class="sub">Learn the concepts, identify which program applies, and verify current rules before a real decision.</p><div class="callout"><b>Important:</b> ${esc(BENEFITS_REVIEW.disclaimer)}</div><p class="sub">Last reviewed ${esc(BENEFITS_REVIEW.lastReviewed)}. ${stale.length?`${stale.length} topic(s) need a new effective-year review.`:'All year-labeled topics match the current review year.'}</p></div><div class="section-title"><div><h2>Introductory topics</h2><p>Current figures are labeled and sourced; they are not permanent constants.</p></div></div><div class="stack">${BENEFIT_TOPICS.map(topicCard).join('')}</div>`;
  host.setAttribute('aria-labelledby','benefits-heading');
}

if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',renderBenefits,{once:true});
else renderBenefits();
