// NWS Simple Mode — student flow engine.
//
// One thing per screen. Every screen has exactly one clear next step, so
// there are no dead ends. Hash routes keep it working on static hosting:
//   #/            welcome
//   #/sections    section picker
//   #/section/ID  step screens (one step per screen)
//   #/done/ID     section complete
//   #/grownups    grown-ups gate (simple-settings.js)
//   #/settings    grown-ups settings (simple-settings.js)

import { SIMPLE_SECTIONS } from '../content/simple-lessons.js';
import { renderTool } from './simple-tools.js';
import {
  PROGRESS_KEY, getSettings, applyTextSize,
  renderGate, renderSettings
} from './simple-settings.js';

const CHEERS = ['Nice work!', 'You did it!', 'Way to go!', 'Keep it up!'];

function el(tag, cls, text) {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text != null) n.textContent = text;
  return n;
}

function getProgress() {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (!raw) return { stepsDone: {}, sectionsDone: [], last: null };
    const p = JSON.parse(raw);
    return {
      stepsDone: p.stepsDone || {},
      sectionsDone: Array.isArray(p.sectionsDone) ? p.sectionsDone : [],
      last: p.last || null
    };
  } catch {
    return { stepsDone: {}, sectionsDone: [], last: null };
  }
}

function saveProgress(p) {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(p));
}

function visibleSections() {
  const s = getSettings();
  return SIMPLE_SECTIONS.filter(sec => s.sections[sec.id] !== false);
}

function findSection(id) {
  return visibleSections().find(s => s.id === id) || null;
}

// --- Screens ----------------------------------------------------------------

function focusHeading(container) {
  const h = container.querySelector('h1');
  if (h) h.focus();
}

function renderWelcome(container) {
  const p = getProgress();
  container.innerHTML = '';
  const h = el('h1', null, 'Money practice.');
  h.tabIndex = -1;
  const lead = el('p', 'lead', 'One small step at a time.');
  const btn = el('button', 'btn', p.last ? 'Keep going' : 'Start');
  btn.type = 'button';
  btn.addEventListener('click', () => {
    location.hash = p.last && findSection(p.last) ? '#/section/' + p.last : '#/sections';
  });
  const grown = el('a', 'grown-link', 'For grown-ups');
  grown.href = '#/grownups';
  container.append(h, lead, btn, grown);
  focusHeading(container);
}

function renderSections(container) {
  container.innerHTML = '';
  const back = el('a', 'back-link', '← Start');
  back.href = '#/';
  const h = el('h1', null, 'What do you want to do?');
  h.tabIndex = -1;
  const lead = el('p', 'lead', 'Pick one.');
  container.append(back, h, lead);
  const p = getProgress();
  for (const sec of visibleSections()) {
    const done = p.stepsDone[sec.id] || 0;
    const total = sec.steps.length;
    const card = el('a', 'section-card');
    card.href = '#/section/' + sec.id;
    const name = el('p', 'name', sec.name);
    const tag = el('p', 'tag', sec.tagline);
    const prog = el('p', 'prog' + (done >= total ? ' done' : ''),
      done >= total ? 'Done ✓' : done > 0 ? `${done} of ${total} steps done` : 'Not started yet');
    card.append(name, tag, prog);
    container.appendChild(card);
  }
  focusHeading(container);
}

function markStepDone(sectionId, stepIndex, total) {
  const p = getProgress();
  p.stepsDone[sectionId] = Math.max(p.stepsDone[sectionId] || 0, stepIndex + 1);
  p.last = sectionId;
  if (p.stepsDone[sectionId] >= total && !p.sectionsDone.includes(sectionId)) {
    p.sectionsDone.push(sectionId);
  }
  saveProgress(p);
}

function nextButton(container, label, target) {
  const btn = el('button', 'btn', label || 'Next →');
  btn.type = 'button';
  btn.addEventListener('click', () => { location.hash = target; });
  container.appendChild(btn);
  return btn;
}

function renderStep(container, sectionId, stepIndex) {
  const sec = findSection(sectionId);
  if (!sec) { location.hash = '#/sections'; return; }
  const total = sec.steps.length;
  if (stepIndex >= total) { location.hash = '#/done/' + sectionId; return; }
  const step = sec.steps[stepIndex];
  const settings = getSettings();

  container.innerHTML = '';
  const back = el('a', 'back-link', '← Back');
  back.href = stepIndex > 0 ? '#/section/' + sectionId + '/' + (stepIndex - 1) : '#/sections';
  const kicker = el('p', 'step-kicker', `${sec.name} · Step ${stepIndex + 1} of ${total}`);
  const h = el('h1', 'sr-only', `${sec.name}, step ${stepIndex + 1}`);
  h.tabIndex = -1;
  container.append(back, kicker, h);

  const nextTarget = stepIndex + 1 >= total ? '#/done/' + sectionId : '#/section/' + sectionId + '/' + (stepIndex + 1);
  let nextShown = false;
  const showNext = () => {
    if (nextShown) return;
    nextShown = true;
    nextButton(container, stepIndex + 1 >= total ? 'Finish ✓' : 'Next →', nextTarget);
  };

  if (step.text) container.appendChild(el('p', 'step-text', step.text));

  if (step.tool) {
    const toolDiv = el('div', 'card');
    container.appendChild(toolDiv);
    renderTool(step.tool, () => {
      markStepDone(sectionId, stepIndex, total);
      showNext();
    }, toolDiv);
  } else if (step.question) {
    const q = el('p', 'step-text', step.question);
    container.appendChild(q);
    const choices = step.choices.slice(0, settings.choices);
    const feedback = el('div', 'feedback');
    feedback.hidden = true;
    feedback.setAttribute('role', 'status');
    const buttons = choices.map(ch => {
      const b = el('button', 'choice', ch.label);
      b.type = 'button';
      b.addEventListener('click', () => {
        buttons.forEach(x => { x.disabled = true; });
        const right = !!ch.correct;
        b.classList.add(right ? 'picked-correct' : 'picked-wrong');
        feedback.hidden = false;
        feedback.classList.toggle('gentle', !right);
        feedback.textContent = right ? (step.correctNote || 'That’s right.') : (step.tryAgainNote || 'Good try.');
        markStepDone(sectionId, stepIndex, total);
        showNext();
      });
      container.appendChild(b);
      return b;
    });
    container.appendChild(feedback);
  } else if (step.cards) {
    for (const card of step.cards) {
      const b = el('button', 'choice', card.q);
      b.type = 'button';
      b.setAttribute('aria-expanded', 'false');
      const ans = el('div', 'help-answer', card.a);
      ans.hidden = true;
      b.addEventListener('click', () => {
        const open = ans.hidden;
        ans.hidden = !open;
        b.setAttribute('aria-expanded', String(open));
      });
      const wrap = el('div', 'help-card');
      wrap.append(b, ans);
      container.appendChild(wrap);
    }
    const nb = nextButton(container, 'Next →', nextTarget);
    nb.addEventListener('click', () => markStepDone(sectionId, stepIndex, total), { once: true });
  } else {
    const nb = nextButton(container, 'Next →', nextTarget);
    nb.addEventListener('click', () => markStepDone(sectionId, stepIndex, total), { once: true });
  }
  focusHeading(container);
}

function renderDone(container, sectionId) {
  const sec = SIMPLE_SECTIONS.find(s => s.id === sectionId);
  if (!sec) { location.hash = '#/sections'; return; }
  const settings = getSettings();
  container.innerHTML = '';
  const cheer = settings.encouragement
    ? CHEERS[Math.floor(Math.random() * CHEERS.length)]
    : 'Done.';
  container.appendChild(el('p', 'cheer', cheer));
  const h = el('h1', null, `You finished: ${sec.name}`);
  h.tabIndex = -1;
  h.style.textAlign = 'center';
  const nextSec = sec.next ? SIMPLE_SECTIONS.find(s => s.id === sec.next) : null;
  const nextVisible = nextSec && getSettings().sections[nextSec.id] !== false;
  const lead = el('p', 'lead', nextVisible
    ? `Next up: ${nextSec.name} — ${nextSec.tagline}`
    : 'What do you want to do next?');
  lead.style.textAlign = 'center';
  container.append(h, lead);
  if (nextVisible) {
    const btn = el('button', 'btn', `Next: ${nextSec.name} →`);
    btn.type = 'button';
    btn.addEventListener('click', () => { location.hash = '#/section/' + nextSec.id; });
    const alt = el('button', 'btn btn-secondary', 'Choose what’s next');
    alt.type = 'button';
    alt.addEventListener('click', () => { location.hash = '#/sections'; });
    container.append(btn, alt);
  } else {
    const btn = el('button', 'btn', 'Choose what’s next');
    btn.type = 'button';
    btn.addEventListener('click', () => { location.hash = '#/sections'; });
    container.append(btn);
  }
  focusHeading(container);
}

// --- Router ------------------------------------------------------------------

function route() {
  const app = document.getElementById('simple-app');
  if (!app) return;
  applyTextSize(getSettings().textSize);
  const hash = location.hash || '#/';

  let m = hash.match(/^#\/section\/([a-z-]+)(?:\/(\d+))?$/);
  if (m) { renderStep(app, m[1], m[2] ? Number(m[2]) : 0); return; }
  m = hash.match(/^#\/done\/([a-z-]+)$/);
  if (m) { renderDone(app, m[1]); return; }
  if (hash === '#/sections') { renderSections(app); return; }
  if (hash === '#/grownups') { renderGate(app, () => {
    try { sessionStorage.setItem('nwsSimple.grownup', '1'); } catch {}
    location.hash = '#/settings';
  }); return; }
  if (hash === '#/settings') {
    let ok = false;
    try { ok = sessionStorage.getItem('nwsSimple.grownup') === '1'; } catch {}
    if (!ok) { location.hash = '#/grownups'; return; }
    renderSettings(app, SIMPLE_SECTIONS);
    return;
  }
  if (hash !== '#/') { location.hash = '#/'; return; }
  renderWelcome(app);
}

window.addEventListener('hashchange', route);
document.addEventListener('DOMContentLoaded', () => {
  if (!location.hash) history.replaceState(null, '', '#/');
  route();
});
