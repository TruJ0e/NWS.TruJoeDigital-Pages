// NWS text-to-speech — ported from the TRSS study-page reader.
// Browser-native speechSynthesis: sentence chunking (iOS truncates long
// utterances), persisted voice + rate settings, chain token so stop always
// wins. Simple Mode is untouched; the reader is opt-in per tap.
const SETTINGS_KEY='NWS:v1:tts-settings';
const MAX_CHUNK=180;

const settings={enabled:true,voiceURI:'',rate:1};
try{
  const raw=localStorage.getItem(SETTINGS_KEY);
  if(raw)Object.assign(settings,JSON.parse(raw));
}catch{/* storage unavailable: run on defaults */}

let chainToken=0;

function save(){
  try{localStorage.setItem(SETTINGS_KEY,JSON.stringify(settings));}catch{/* ignore */}
}
export function ttsSupported(){
  return typeof window!=='undefined'&&'speechSynthesis' in window&&typeof window.SpeechSynthesisUtterance!=='undefined';
}
function voiceList(){
  if(!ttsSupported())return[];
  try{return window.speechSynthesis.getVoices()||[];}catch{return[];}
}
function voiceQualityScore(v){
  // Prefer higher-quality voices: neural/natural/premium first, legacy robotic last.
  // All languages stay available — this only ranks within the list.
  const name=(v.name||'').toLowerCase();
  let score=0;
  if(/natural|neural|premium|enhanced/i.test(name)) score+=30;
  if(/google/i.test(name)) score+=10; // Google voices are consistently decent
  if(/samantha|zira|david|mark|karen|moira|tessa|daniel|fiona|arthur/i.test(name)) score+=8; // known-good system voices
  if(/whisper|soft|compact/i.test(name)) score-=5;
  // Deprioritize obvious legacy robotic voices
  if(/microsoft (anna|sam|mike|mary)|espeak|festival/i.test(name)) score-=20;
  return score;
}
function pickVoice(){
  const vs=voiceList();
  if(!vs.length)return null;
  if(settings.voiceURI){
    const saved=vs.find(v=>v.voiceURI===settings.voiceURI);
    if(saved)return saved;
  }
  // Quality-ranked: best English voice first, then best of any language.
  const en=vs.filter(v=>(v.lang||'').toLowerCase().indexOf('en')===0);
  const pool=en.length?en:vs;
  return pool.slice().sort((a,b)=>voiceQualityScore(b)-voiceQualityScore(a))[0]||vs[0];
}
function chunkText(text){
  const clean=String(text).replace(/\s+/g,' ').trim();
  if(!clean)return[];
  const sentences=clean.match(/[^.!?]+[.!?]+["'”)]?|\S[^.!?]*$/g)||[clean];
  const chunks=[];
  let cur='';
  sentences.forEach(s=>{
    s=s.trim();
    if(!s)return;
    if(cur&&(cur+' '+s).length>MAX_CHUNK){chunks.push(cur);cur=s;}
    else cur=cur?cur+' '+s:s;
  });
  if(cur)chunks.push(cur);
  return chunks;
}
function speakChunks(chunks,voice,token){
  if(token!==chainToken||!chunks.length)return;
  const synth=window.speechSynthesis;
  const u=new window.SpeechSynthesisUtterance(chunks[0]);
  if(voice)u.voice=voice;
  u.rate=settings.rate||1;
  // Slight pitch lift on low-quality voices reduces the worst robotic artifacts.
  if(voice&&voiceQualityScore(voice)<0)u.pitch=1.1;
  if(chunks.length>1){
    u.onend=()=>speakChunks(chunks.slice(1),voice,token);
    u.onerror=()=>{/* a failed chunk ends the chain */};
  }
  synth.speak(u);
}
export function speakText(text){
  if(!settings.enabled||!ttsSupported())return false;
  const chunks=chunkText(text);
  if(!chunks.length)return false;
  stopTTS();
  speakChunks(chunks,pickVoice(),chainToken);
  return true;
}
export function stopTTS(){
  chainToken++;
  if(!ttsSupported())return;
  try{window.speechSynthesis.cancel();}catch{/* ignore */}
}
export function ttsEnabled(){return settings.enabled;}
export function setTTSEnabled(on){
  settings.enabled=Boolean(on);
  if(!settings.enabled)stopTTS();
  save();
  paintTTSToggle();
}

// -- Controls (toggle + voice/rate panel). Rendered wherever NWS wants a
// reader; currently the lesson player. ------------------------------------
let toggleBtn=null,voiceSelect=null,rateInput=null,rateLabel=null;

function injectStyles(){
  if(document.getElementById('nws-tts-styles'))return;
  const st=document.createElement('style');
  st.id='nws-tts-styles';
  st.textContent=[
    '.tts-controls{display:flex;align-items:center;gap:10px;flex-wrap:wrap}',
    // Match the app's .btn language: solid brand green, 12px radius, real padding.
    '.tts-toggle{appearance:none;border:1.5px solid var(--brand,#166534);background:var(--brand,#166534);color:#fff;font-family:var(--font-sans,inherit);font-weight:700;font-size:.95rem;padding:11px 18px;border-radius:12px;cursor:pointer;display:inline-flex;align-items:center;gap:8px;transition:transform .12s ease,box-shadow .12s ease,background .12s ease;line-height:1.3}',
    '.tts-toggle:hover{background:#12562c;transform:translateY(-1px);box-shadow:0 6px 16px rgba(22,101,52,.28)}',
    '.tts-toggle[aria-pressed="false"]{background:#fff;color:var(--brand-deep,#14532d);border-color:#c9d6cb}',
    '.tts-toggle[aria-pressed="false"]:hover{background:var(--brand-soft,#f0fdf4);box-shadow:var(--shadow-sm,0 2px 6px rgba(0,0,0,.08))}',
    '.tts-settings{position:relative}',
    '.tts-settings>summary{list-style:none;cursor:pointer;appearance:none;border:1.5px solid #c9d6cb;background:#fff;color:var(--brand-deep,#14532d);font-family:var(--font-sans,inherit);font-weight:700;font-size:.95rem;padding:11px 16px;border-radius:12px;display:inline-flex;align-items:center;gap:8px;line-height:1.3}',
    '.tts-settings>summary:hover{background:var(--brand-soft,#f0fdf4)}',
    '.tts-settings>summary::-webkit-details-marker{display:none}',
    '.tts-settings-panel{position:absolute;right:0;top:calc(100% + 6px);z-index:60;min-width:240px;background:var(--surface,#fffdf8);border:1px solid var(--border,#d8d2c4);border-radius:12px;padding:12px 14px;box-shadow:0 8px 24px rgba(60,40,20,.18);display:flex;flex-direction:column;gap:10px}',
    '.tts-settings-panel label{font-size:13px;font-weight:600;display:flex;flex-direction:column;gap:6px}',
    '.tts-settings-panel select,.tts-settings-panel input{width:100%;font-size:14px;padding:8px;border-radius:8px;border:1px solid var(--border,#d8d2c4)}',
  ].join('\n');
  document.head.appendChild(st);
}
function paintTTSToggle(){
  if(!toggleBtn)return;
  toggleBtn.setAttribute('aria-pressed',settings.enabled?'true':'false');
  toggleBtn.innerHTML=settings.enabled
    ?'<span aria-hidden="true">🔊</span> Listen'
    :'<span aria-hidden="true">🔇</span> Muted';
  toggleBtn.title=settings.enabled?'Turn spoken audio off':'Turn spoken audio on';
}
function refreshVoices(){
  if(!voiceSelect)return;
  const vs=voiceList();
  voiceSelect.innerHTML='';
  vs.forEach(v=>{
    const o=document.createElement('option');
    o.value=v.voiceURI;
    o.textContent=v.name+(v.lang?` (${v.lang})`:'');
    voiceSelect.appendChild(o);
  });
  const pick=pickVoice();
  voiceSelect.value=(pick&&pick.voiceURI)||(vs[0]&&vs[0].voiceURI)||'';
  if(!settings.voiceURI&&pick){settings.voiceURI=pick.voiceURI;save();}
}
// Markup for the reader controls; call bindTTSControls() after insert.
export function ttsControlsHTML(){
  return `<div class="tts-controls"><button type="button" class="tts-toggle" data-tts-toggle aria-pressed="${settings.enabled?'true':'false'}"></button><details class="tts-settings"><summary aria-label="Voice settings" title="Voice settings"><span aria-hidden="true">⚙</span> Voice</summary><div class="tts-settings-panel"><label>Voice<select data-tts-voice aria-label="Voice"></select></label><label><span data-tts-rate-label></span><input type="range" data-tts-rate min="0.5" max="2" step="0.1" value="${settings.rate||1}" aria-label="Speaking rate"></label></div></details></div>`;
}
export function bindTTSControls(root){
  const scope=root||document;
  injectStyles();
  toggleBtn=scope.querySelector('[data-tts-toggle]');
  voiceSelect=scope.querySelector('[data-tts-voice]');
  rateInput=scope.querySelector('[data-tts-rate]');
  rateLabel=scope.querySelector('[data-tts-rate-label]');
  if(toggleBtn)toggleBtn.addEventListener('click',()=>setTTSEnabled(!settings.enabled));
  paintTTSToggle();
  if(voiceSelect){
    voiceSelect.addEventListener('change',()=>{settings.voiceURI=voiceSelect.value;save();});
    refreshVoices();
    if(ttsSupported()&&'onvoiceschanged' in window.speechSynthesis){
      window.speechSynthesis.onvoiceschanged=refreshVoices;
    }
  }
  if(rateInput){
    const paintRate=()=>{if(rateLabel)rateLabel.textContent=`Rate: ${Number(rateInput.value).toFixed(1)}×`;};
    rateInput.value=String(settings.rate||1);
    paintRate();
    rateInput.addEventListener('input',()=>{settings.rate=Number(rateInput.value)||1;paintRate();save();});
  }
}
