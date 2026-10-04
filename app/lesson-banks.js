// NWS lesson variation banks: scaffolded practice draws.
//
// Every lesson has a bank of 50 author-confirmed variation templates
// (src/content/banks/*). Per lesson visit, drawBankSteps() selects up to
// DRAW_COUNT unserved templates, ordered easy -> hard by scaffold part
// (see docs/SCAFFOLD-MAP.md), round-robin across parts for verb variety.
//
// Served tracking is per-learner with stable template IDs
// (nwsLessonServed.v1): a learner never repeats a template until the
// lesson's bank is exhausted, then it reshuffles. Drawn picks are persisted
// per visit so a reload mid-lesson re-serves the identical steps (stable
// indices keep resume/deep-links working).
//
// Storage follows the adult-served.js guard patterns: schema-version check,
// corrupt-shape reset, in-memory fallback when localStorage is blocked.

import { VARIATION_BANKS } from '../content/banks/index.js';
import { makeVariant, learnerSeed } from './variants.js';

export const DRAW_COUNT = 8;

const STORAGE_KEY = 'nwsLessonServed.v1';
const SCHEMA_VERSION = 1;

function blankStore(){ return { version: SCHEMA_VERSION, lessons: {}, draws: {} }; }

let memFallback = null;
let storageOK = true;

function loadStore(){
  if(memFallback) return memFallback;
  try{
    if(typeof localStorage === 'undefined' || !localStorage) throw new Error('no storage');
    const raw = localStorage.getItem(STORAGE_KEY);
    if(!raw) return blankStore();
    const parsed = JSON.parse(raw);
    if(!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return blankStore();
    if(parsed.version !== SCHEMA_VERSION) return blankStore();
    if(!parsed.lessons || typeof parsed.lessons !== 'object') parsed.lessons = {};
    if(!parsed.draws || typeof parsed.draws !== 'object') parsed.draws = {};
    return parsed;
  }catch{
    storageOK = false;
    if(!memFallback) memFallback = blankStore();
    return memFallback;
  }
}

function saveStore(store){
  if(!storageOK){ memFallback = store; return; }
  try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(store)); }
  catch{ storageOK = false; memFallback = store; }
}

/** Template IDs already served for a lesson. */
export function lessonServedIds(lessonId){
  const store = loadStore();
  const list = store.lessons[String(lessonId)];
  return Array.isArray(list) ? list.slice() : [];
}

export function markLessonServed(lessonId, id){
  lessonId = String(lessonId); id = String(id);
  const store = loadStore();
  if(!Array.isArray(store.lessons[lessonId])) store.lessons[lessonId] = [];
  if(!store.lessons[lessonId].includes(id)){ store.lessons[lessonId].push(id); saveStore(store); }
}

/** Templates authored for a lesson (empty array when none). */
export function bankTemplatesFor(lessonId){
  const bank = VARIATION_BANKS[String(lessonId)];
  return Array.isArray(bank) ? bank : [];
}

// Per-lesson visit counter for bank draws (independent of variants.js visits;
// only used to key the draw cache + persisted picks). Persisted so a reload
// mid-lesson re-serves the identical draw (stable step indices).
const VISIT_STORE_KEY = 'nwsLessonBankVisits.v1';
function readBankVisits(){
  try{ return JSON.parse(localStorage.getItem(VISIT_STORE_KEY) || '{}'); }
  catch{ return {}; }
}
function writeBankVisits(v){
  try{ localStorage.setItem(VISIT_STORE_KEY, JSON.stringify(v)); }catch{}
}
export function noteBankVisit(lessonId){
  lessonId = String(lessonId);
  const v = readBankVisits();
  v[lessonId] = (v[lessonId] || 0) + 1;
  writeBankVisits(v);
  return v[lessonId];
}
export function peekBankVisit(lessonId){
  return readBankVisits()[String(lessonId)] || 1;
}

/**
 * Pick up to DRAW_COUNT templates: unserved first (reshuffle on exhaustion),
 * ordered easy -> hard by scaffold part, round-robin across parts so one
 * visit mixes verbs instead of dealing six sorts in a row.
 * Pure selection: all storage writes happen in drawBankSteps on one store.
 */
function pickTemplates(servedIds, templates, visitN, lessonId){
  const served = new Set(servedIds);
  let pool = templates.filter(t => t && t.id && !served.has(String(t.id)));
  let reshuffled = false;
  if(pool.length < DRAW_COUNT){
    reshuffled = true; // exhausted (or nearly): fresh round
    pool = templates.filter(t => t && t.id);
  }
  if(!pool.length) return { picked: [], reshuffled };
  // Group by part, shuffle within part with a visit seed for variety.
  const byPart = new Map();
  for(const t of pool){
    const p = Math.min(8, Math.max(1, t.part | 0 || 1));
    if(!byPart.has(p)) byPart.set(p, []);
    byPart.get(p).push(t);
  }
  const v = makeVariant(learnerSeed(), String(lessonId), 'bankdraw', 'visit-' + visitN);
  const parts = [...byPart.keys()].sort((a, b) => a - b);
  for(const p of parts) byPart.set(p, v.shuffle(byPart.get(p)));
  const picked = [];
  let round = 0;
  while(picked.length < DRAW_COUNT && round < DRAW_COUNT){
    let took = false;
    for(const p of parts){
      const group = byPart.get(p);
      if(group.length > round){ picked.push(group[round]); took = true; }
      if(picked.length >= DRAW_COUNT) break;
    }
    if(!took) break;
    round++;
  }
  return { picked, reshuffled };
}

/** Convert an authored template into a lesson-player step object. */
function templateToStep(lessonId, visitN, template){
  const base = {
    skill: template.skill || null,
    tier: template.tier || 'independent',
    part: template.part || 1,
    bankId: template.id,
    bankVerb: template.verb,
  };
  const verb = template.verb;
  if(verb === 'sort'){
    // Sort games resolve once at draw time (no per-attempt variant needed).
    const v = makeVariant(learnerSeed(), String(lessonId), 'banksort', String(template.id), 'visit-' + visitN);
    const s = template.gen(v);
    return { t: 'sort', h: s.h, body: s.body, buckets: s.buckets, items: s.items, ...base };
  }
  if(verb === 'build') return { t: 'build', gen: template.gen, ...base };
  if(verb === 'explain') return { t: 'explain', gen: template.gen, ...base };
  // Choice-family verbs (choice/decide/spot/compare/predict) ride the
  // existing try pipeline: resolveTry, orderedChoices, skill evidence,
  // focus mode, and review all keep working unchanged.
  return { t: 'try', verb, gen: template.gen, ...base };
}

// Resolved build/explain payloads, cached per visit (sort resolves once at
// draw time; choice-family verbs resolve per render through resolveTry).
const resolvedCache = new Map();
export function resolveBankStep(lessonId, step, visitN){
  const key = String(lessonId) + ':' + visitN + ':' + String(step.bankId);
  let hit = resolvedCache.get(key);
  if(!hit){
    const v = makeVariant(learnerSeed(), String(lessonId), 'bankstep', String(step.bankId), 'visit-' + visitN);
    hit = step.gen(v);
    resolvedCache.set(key, hit);
  }
  return hit;
}

/**
 * Drawn bank steps for a lesson visit. Stable within the visit AND across
 * reloads: picked template IDs persist per visit, so step indices never
 * shift under resume/deep-links.
 */
export function drawBankSteps(lessonId, visitN){
  lessonId = String(lessonId);
  const drawKey = lessonId + ':draw:' + visitN;
  const store = loadStore();
  const templates = bankTemplatesFor(lessonId);
  if(!templates.length) return [];
  let ids = store.draws[drawKey];
  let picked;
  if(Array.isArray(ids) && ids.length){
    // Re-serve the identical draw (reload mid-lesson).
    const byId = new Map(templates.map(t => [String(t.id), t]));
    picked = ids.map(id => byId.get(String(id))).filter(Boolean);
  }else{
    // Single store object for every write: no clobbering between the
    // served list and the persisted draw.
    const servedList = Array.isArray(store.lessons[lessonId]) ? store.lessons[lessonId] : [];
    const { picked: fresh, reshuffled } = pickTemplates(servedList, templates, visitN, lessonId);
    picked = fresh;
    if(reshuffled) store.lessons[lessonId] = [];
    if(!Array.isArray(store.lessons[lessonId])) store.lessons[lessonId] = [];
    for(const t of picked){
      const tid = String(t.id);
      if(!store.lessons[lessonId].includes(tid)) store.lessons[lessonId].push(tid);
    }
    store.draws[drawKey] = picked.map(t => String(t.id));
    saveStore(store);
  }
  return picked.map(t => templateToStep(lessonId, visitN, t));
}

/** Forget a lesson's bank history (fresh start). */
export function resetLessonBank(lessonId){
  lessonId = String(lessonId);
  const store = loadStore();
  delete store.lessons[lessonId];
  for(const k of Object.keys(store.draws)) if(k.startsWith(lessonId + ':draw:')) delete store.draws[k];
  saveStore(store);
}
