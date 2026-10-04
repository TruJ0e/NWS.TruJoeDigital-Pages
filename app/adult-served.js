/* NWS adult-life served-set tracking.
   Guarantees a learner never sees the same adult-life practice/transfer/
   retention entry twice until that topic's bank is exhausted, then reshuffles.
   Entry identity is a content hash (prompt/question + choices + answer), NOT
   an array index, so bank growth/reordering never invalidates history.
   Storage failures (private mode) fall back to an in-memory set, which still
   gives per-session no-repeat. Follows the state.js normalize/guard style. */

const STORAGE_KEY = 'nwsAdultServed.v1';
const SCHEMA_VERSION = 1;

/** FNV-1a 32-bit hash, hex. Stable across sessions; no crypto needed. */
export function contentHash(text){
  const s = String(text ?? '');
  let h = 0x811c9dc5;
  for(let i=0;i<s.length;i++){ h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193); }
  return (h >>> 0).toString(16).padStart(8, '0');
}

/** Stable entry id for practice {prompt,choices,correct} and
    transfer/retention {question,choices,good,help} shapes. */
export function adultEntryId(entry){
  if(!entry || typeof entry !== 'object') return 'invalid';
  const text = entry.prompt ?? entry.question ?? '';
  const answer = entry.correct ?? entry.good ?? '';
  return contentHash(text + '|' + JSON.stringify(entry.choices ?? []) + '|' + answer);
}

function blankStore(){ return { version: SCHEMA_VERSION, topics: {} }; }

let memFallback = null;   // in-memory store when localStorage is unavailable
let storageOK = true;

function loadStore(){
  if(memFallback) return memFallback;
  try{
    if(typeof localStorage === 'undefined' || !localStorage) throw new Error('no storage');
    const raw = localStorage.getItem(STORAGE_KEY);
    if(!raw) return blankStore();
    const parsed = JSON.parse(raw);
    // Schema-version guard: unknown version or corrupt shape -> fresh store.
    if(!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return blankStore();
    if(parsed.version !== SCHEMA_VERSION) return blankStore();
    if(!parsed.topics || typeof parsed.topics !== 'object' || Array.isArray(parsed.topics)) parsed.topics = {};
    return parsed;
  }catch{
    storageOK = false;
    if(!memFallback) memFallback = blankStore();
    return memFallback;
  }
}

function saveStore(store){
  if(!storageOK){ memFallback = store; return; }
  try{
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  }catch{
    // Storage full/blocked mid-session: keep serving from memory, stay alive.
    storageOK = false;
    memFallback = store;
  }
}

function topicBucket(store, topic){
  if(!store.topics[topic] || typeof store.topics[topic] !== 'object') store.topics[topic] = {};
  return store.topics[topic];
}

function servedList(store, topic, kind){
  const bucket = topicBucket(store, topic);
  if(!Array.isArray(bucket[kind])) bucket[kind] = [];
  return bucket[kind];
}

/** Ids already served for this topic+kind (kind: 'practice'|'transfer'|'retention'). */
export function getServedIds(topic, kind){
  return servedList(loadStore(), String(topic), String(kind)).slice();
}

export function markServed(topic, kind, id){
  topic = String(topic); kind = String(kind); id = String(id);
  const store = loadStore();
  const list = servedList(store, topic, kind);
  if(!list.includes(id)){ list.push(id); saveStore(store); }
  return id;
}

/**
 * Draw one unserved entry uniformly at random. Marks it served.
 * On exhaustion (every entry served), clears the set and redraws = reshuffle.
 * Returns null when entries is empty.
 */
export function drawUnserved(topic, kind, entries){
  topic = String(topic); kind = String(kind);
  if(!Array.isArray(entries) || !entries.length) return null;
  const store = loadStore();
  let served = servedList(store, topic, kind);
  const servedSet = new Set(served);
  let candidates = entries.filter(e => !servedSet.has(adultEntryId(e)));
  if(!candidates.length){
    served.length = 0;               // exhausted: start a fresh round
    candidates = entries.slice();
  }
  const pick = candidates[Math.floor(Math.random() * candidates.length)];
  const id = adultEntryId(pick);
  served = servedList(store, topic, kind); // re-fetch after potential clear
  if(!served.includes(id)){ served.push(id); saveStore(store); }
  return pick;
}

/** Fisher-Yates shuffle of 0..count-1. */
function shuffledIndices(count, rand = Math.random){
  const order = Array.from({ length: count }, (_, i) => i);
  for(let i = order.length - 1; i > 0; i--){
    const j = Math.floor(rand() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}

/**
 * Persisted shuffled practice sequence for a module: {order:[entryIdx], pos}.
 * Survives reloads and module switches; reshuffles automatically when the
 * learner finishes the sequence. Rebuilds if the bank size changed.
 */
export function getPracticeSeq(topic, entryCount){
  topic = String(topic);
  entryCount = Math.max(0, Math.floor(entryCount) || 0);
  const store = loadStore();
  const bucket = topicBucket(store, topic);
  let seq = bucket.practiceSeq;
  const valid = seq && typeof seq === 'object'
    && Array.isArray(seq.order) && seq.order.length === entryCount
    && Number.isInteger(seq.pos) && seq.pos >= 0 && seq.pos <= seq.order.length;
  if(!valid){
    seq = { order: shuffledIndices(entryCount), pos: 0 };
    bucket.practiceSeq = seq;
    saveStore(store);
  }
  return seq;
}

/** Advance the persisted practice position; reshuffle when the round ends. */
export function advancePracticeSeq(topic){
  topic = String(topic);
  const store = loadStore();
  const bucket = topicBucket(store, topic);
  const seq = bucket.practiceSeq;
  if(!seq || !Array.isArray(seq.order) || !seq.order.length) return;
  seq.pos += 1;
  if(seq.pos >= seq.order.length){
    seq.order = shuffledIndices(seq.order.length);
    seq.pos = 0;
  }
  saveStore(store);
}

/** Forget a topic's served history and practice sequence (fresh start). */
export function resetTopic(topic){
  topic = String(topic);
  const store = loadStore();
  delete store.topics[topic];
  saveStore(store);
}

/** True when the store had to fall back to memory (storage blocked). */
export function servedStoreIsMemoryOnly(){ return !storageOK || !!memFallback; }
