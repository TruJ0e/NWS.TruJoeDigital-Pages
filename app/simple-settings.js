// NWS Simple Mode — grown-ups side.
//
// A separate, gated settings area for parents, instructors, and teachers.
// The student side never shows these controls; it only reads the result.
// Stored locally on this device: 'nwsSimple.settings.v1'.

export const SETTINGS_KEY = 'nwsSimple.settings.v1';
export const PROGRESS_KEY = 'nwsSimple.progress.v1';

export const DEFAULT_SETTINGS = {
  // Which sections the student sees. Keys must match SIMPLE_SECTIONS ids.
  sections: {
    needs: true,
    savings: true,
    spending: true,
    pacing: true,
    paycheck: true,
    subscriptions: true,
    help: true
  },
  textSize: 'normal',      // 'normal' | 'big' | 'bigger'
  choices: 3,             // 2 | 3  (max answer choices per question)
  encouragement: true     // cheerful lines on done screens
};

export function getSettings() {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return structuredClone(DEFAULT_SETTINGS);
    const s = JSON.parse(raw);
    return {
      sections: { ...DEFAULT_SETTINGS.sections, ...(s.sections || {}) },
      textSize: ['normal', 'big', 'bigger'].includes(s.textSize) ? s.textSize : 'normal',
      choices: s.choices === 2 ? 2 : 3,
      encouragement: s.encouragement !== false
    };
  } catch {
    return structuredClone(DEFAULT_SETTINGS);
  }
}

export function saveSettings(s) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(s));
}

export function resetStudentProgress() {
  localStorage.removeItem(PROGRESS_KEY);
}

// --- Grown-ups gate ---------------------------------------------------------
// A simple arithmetic question keeps curious taps out of the adult area.
// It is not security — just a "grown-ups only" speed bump.

export function makeGateQuestion() {
  const a = 2 + Math.floor(Math.random() * 8); // 2..9
  const b = 2 + Math.floor(Math.random() * 8);
  return { a, b, answer: a + b };
}

export function renderGate(container, onPass) {
  const q = makeGateQuestion();
  container.innerHTML = '';
  const h = document.createElement('h1');
  h.tabIndex = -1;
  h.textContent = 'For grown-ups';
  const p = document.createElement('p');
  p.className = 'lead';
  p.textContent = 'This area is for parents and teachers. To continue, answer:';
  const card = document.createElement('div');
  card.className = 'card';
  const qtext = document.createElement('p');
  qtext.className = 'step-text';
  qtext.textContent = `What is ${q.a} + ${q.b}?`;
  const field = document.createElement('div');
  field.className = 'field';
  const input = document.createElement('input');
  input.type = 'number';
  input.inputMode = 'numeric';
  input.setAttribute('aria-label', 'Your answer');
  field.appendChild(input);
  const msg = document.createElement('p');
  msg.className = 'practice-note';
  msg.setAttribute('role', 'status');
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'btn';
  btn.textContent = 'Continue';
  btn.addEventListener('click', () => {
    if (Number(input.value) === q.answer) {
      onPass();
    } else {
      msg.textContent = 'Not quite — try again.';
      input.value = '';
      input.focus();
    }
  });
  const back = document.createElement('a');
  back.className = 'back-link';
  back.href = '#/';
  back.textContent = '← Back to practice';
  card.append(qtext, field, msg, btn);
  container.append(h, p, card, back);
  h.focus();
}

// --- Settings screen ---------------------------------------------------------

export function renderSettings(container, sectionDefs) {
  const s = getSettings();
  container.innerHTML = '';
  const h = document.createElement('h1');
  h.tabIndex = -1;
  h.textContent = 'Grown-up settings';
  const p = document.createElement('p');
  p.className = 'lead';
  p.textContent = 'Change what the student sees. Changes save right away.';

  const persist = () => saveSettings(s);

  // Section visibility
  const secTitle = document.createElement('p');
  secTitle.className = 'step-kicker';
  secTitle.textContent = 'Sections the student can open';
  container.append(h, p, secTitle);
  for (const def of sectionDefs) {
    const row = document.createElement('div');
    row.className = 'setting-row';
    const lab = document.createElement('div');
    const name = document.createElement('div');
    name.className = 's-label';
    name.textContent = def.name;
    const desc = document.createElement('div');
    desc.className = 's-desc';
    desc.textContent = def.tagline;
    lab.append(name, desc);
    const sw = document.createElement('button');
    sw.type = 'button';
    sw.className = 'switch';
    sw.setAttribute('role', 'switch');
    sw.setAttribute('aria-checked', String(!!s.sections[def.id]));
    sw.setAttribute('aria-label', 'Show ' + def.name);
    sw.addEventListener('click', () => {
      s.sections[def.id] = !s.sections[def.id];
      sw.setAttribute('aria-checked', String(!!s.sections[def.id]));
      persist();
    });
    row.append(lab, sw);
    container.appendChild(row);
  }

  // Text size
  const tTitle = document.createElement('p');
  tTitle.className = 'step-kicker';
  tTitle.textContent = 'Text size';
  const tSeg = segmented(['normal', 'big', 'bigger'], s.textSize, v => { s.textSize = v; persist(); applyTextSize(v); });
  container.append(tTitle, tSeg);

  // Choices
  const cTitle = document.createElement('p');
  cTitle.className = 'step-kicker';
  cTitle.textContent = 'Answer choices per question';
  const cSeg = segmented(['2', '3'], String(s.choices), v => { s.choices = Number(v); persist(); });
  container.append(cTitle, cSeg);

  // Encouragement
  const eRow = document.createElement('div');
  eRow.className = 'setting-row';
  const eLab = document.createElement('div');
  const eName = document.createElement('div');
  eName.className = 's-label';
  eName.textContent = 'Encouragement';
  const eDesc = document.createElement('div');
  eDesc.className = 's-desc';
  eDesc.textContent = 'Cheerful lines like “Nice work!” on done screens.';
  eLab.append(eName, eDesc);
  const eSw = document.createElement('button');
  eSw.type = 'button';
  eSw.className = 'switch';
  eSw.setAttribute('role', 'switch');
  eSw.setAttribute('aria-checked', String(!!s.encouragement));
  eSw.setAttribute('aria-label', 'Encouragement messages');
  eSw.addEventListener('click', () => {
    s.encouragement = !s.encouragement;
    eSw.setAttribute('aria-checked', String(!!s.encouragement));
    persist();
  });
  eRow.append(eLab, eSw);
  const eTitle = document.createElement('p');
  eTitle.className = 'step-kicker';
  eTitle.textContent = 'Cheer';
  container.append(eTitle, eRow);

  // Reset progress
  const rTitle = document.createElement('p');
  rTitle.className = 'step-kicker';
  rTitle.textContent = 'Start over';
  const rBtn = document.createElement('button');
  rBtn.type = 'button';
  rBtn.className = 'btn btn-secondary';
  rBtn.textContent = 'Erase student progress on this device';
  const rMsg = document.createElement('p');
  rMsg.className = 'practice-note';
  rMsg.setAttribute('role', 'status');
  rBtn.addEventListener('click', () => {
    resetStudentProgress();
    rMsg.textContent = 'Done. Progress is erased.';
  });
  container.append(rTitle, rBtn, rMsg);

  const back = document.createElement('a');
  back.className = 'back-link';
  back.href = '#/';
  back.textContent = '← Back to practice';
  container.appendChild(back);
  h.focus();
}

function segmented(options, current, onPick) {
  const wrap = document.createElement('div');
  wrap.className = 'seg';
  wrap.style.marginBottom = '24px';
  for (const opt of options) {
    const b = document.createElement('button');
    b.type = 'button';
    b.textContent = opt[0].toUpperCase() + opt.slice(1);
    b.setAttribute('aria-pressed', String(opt === current));
    b.addEventListener('click', () => {
      onPick(opt);
      wrap.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
    });
    wrap.appendChild(b);
  }
  return wrap;
}

export function applyTextSize(size) {
  document.body.classList.remove('text-big', 'text-bigger');
  if (size === 'big') document.body.classList.add('text-big');
  if (size === 'bigger') document.body.classList.add('text-bigger');
}
