// NWS Simple Mode — simplified tools.
//
// The applied layer from the main app, reframed: one screen, one question,
// one plain-language answer. Reuses the tested math from app/money.js and
// app/paycheck.js so the numbers stay honest.

import { formatMoney, cleanNum, annualizedMonthlyCost, costPerUse } from './money.js';
import { createFictionalPaycheck } from './paycheck.js';

function el(tag, cls, text) {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text != null) n.textContent = text;
  return n;
}

function moneyField(labelText, placeholder) {
  const wrap = el('div', 'field');
  const lab = el('label', null, labelText);
  const input = el('input');
  input.type = 'number';
  input.inputMode = 'decimal';
  input.min = '0';
  input.placeholder = placeholder || '';
  lab.appendChild(input);
  wrap.appendChild(lab);
  // label wraps input for a big tap target; keep the label text visible too
  return { wrap, input };
}

function answerBox() {
  const box = el('div', 'answer');
  box.setAttribute('role', 'status');
  box.hidden = true;
  return box;
}

const PRACTICE_NOTE = 'Practice with pretend numbers. Not financial advice.';

// --- "Make Money Last": money ÷ days ------------------------------------------------

function pacingTool(onDone) {
  const frag = document.createDocumentFragment();
  frag.appendChild(el('p', 'step-text', 'How much money do you have? How many days until more money comes?'));
  const f1 = moneyField('Money you have right now ($)', '60');
  const f2 = moneyField('Days until more money comes', '7');
  const btn = el('button', 'btn', 'Figure it out');
  btn.type = 'button';
  const ans = answerBox();
  btn.addEventListener('click', () => {
    const money = Number(f1.input.value);
    const days = Number(f2.input.value);
    if (!(money > 0) || !(days > 0)) {
      ans.hidden = false;
      ans.textContent = 'Type a money amount and a number of days first.';
      return;
    }
    const perDay = cleanNum(money / days);
    ans.hidden = false;
    ans.textContent = `About ${formatMoney(perDay)} each day.`;
    onDone();
  });
  frag.append(f1.wrap, f2.wrap, btn, ans, el('p', 'practice-note', PRACTICE_NOTE));
  return frag;
}

// --- "Payday": hours × pay → take-home -------------------------------------------------

function paycheckTool(onDone) {
  const frag = document.createDocumentFragment();
  frag.appendChild(el('p', 'step-text', 'Type your hours and your pay. See what you really get to keep.'));
  const f1 = moneyField('Hours you worked', '20');
  const f2 = moneyField('Pay per hour ($)', '12');
  const btn = el('button', 'btn', 'Figure it out');
  btn.type = 'button';
  const ans = answerBox();
  btn.addEventListener('click', () => {
    const hours = Number(f1.input.value);
    const rate = Number(f2.input.value);
    if (!(hours > 0) || !(rate > 0)) {
      ans.hidden = false;
      ans.textContent = 'Type your hours and your pay first.';
      return;
    }
    const gross = cleanNum(hours * rate);
    const slip = createFictionalPaycheck({ gross });
    ans.hidden = false;
    ans.textContent =
      `Your pay is ${formatMoney(slip.gross)}. ` +
      `About ${formatMoney(slip.deductionTotal)} is taken out. ` +
      `You take home about ${formatMoney(slip.takeHome)}.`;
    onDone();
  });
  const note = el('p', 'practice-note', 'Pretend paycheck. Real jobs take out different amounts. ' + PRACTICE_NOTE);
  frag.append(f1.wrap, f2.wrap, btn, ans, note);
  return frag;
}

// --- "Monthly Costs": monthly × 12, cost per use ---------------------------------------

function subscriptionsTool(onDone) {
  const frag = document.createDocumentFragment();
  frag.appendChild(el('p', 'step-text', 'Type what it costs each month. See what a year really costs.'));
  const f1 = moneyField('Cost each month ($)', '10');
  const f2 = moneyField('Times you use it each month', '4');
  const btn = el('button', 'btn', 'Figure it out');
  btn.type = 'button';
  const ans = answerBox();
  btn.addEventListener('click', () => {
    const monthly = Number(f1.input.value);
    const uses = Number(f2.input.value);
    if (!(monthly > 0)) {
      ans.hidden = false;
      ans.textContent = 'Type the monthly cost first.';
      return;
    }
    const yearly = cleanNum(annualizedMonthlyCost(monthly));
    let text = `In one year, that's ${formatMoney(yearly)}.`;
    const perUse = costPerUse(monthly, uses);
    if (perUse != null) text += ` That's about ${formatMoney(cleanNum(perUse))} each time you use it.`;
    ans.hidden = false;
    ans.textContent = text;
    onDone();
  });
  frag.append(f1.wrap, f2.wrap, btn, ans, el('p', 'practice-note', PRACTICE_NOTE));
  return frag;
}

export function renderTool(name, onDone, container) {
  container.innerHTML = '';
  if (name === 'pacing') container.appendChild(pacingTool(onDone));
  else if (name === 'paycheck') container.appendChild(paycheckTool(onDone));
  else if (name === 'subscriptions') container.appendChild(subscriptionsTool(onDone));
  else container.appendChild(el('p', null, 'This tool is not available right now.'));
}
