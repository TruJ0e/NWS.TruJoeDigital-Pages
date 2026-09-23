// "Your turn" — bridge from fictional scenarios to the learner's own numbers.
// New localStorage key (nwsMyNumbers.v1); existing NWS keys are never touched.
(function(){
  'use strict';
  const KEY='nwsMyNumbers.v1';
  const CONTEXT_KEY='nwsCourseShell.context';
  const PACING_FOCUS_KEY='nwsCourseShell.pacingFocus';
  const ADULT_FOCUS_KEY='nwsCourseShell.adultLifeFocus';

  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const usd=v=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(Number(v)||0);
  const num2=v=>{const n=Number(v);return Number.isFinite(n)?(Math.round(n*100)/100):0;};
  const ss=k=>{try{return sessionStorage.getItem(k);}catch{return null;}};

  function load(){ try{return JSON.parse(localStorage.getItem(KEY)||'{}');}catch{return{};} }
  function saveAll(s){ try{localStorage.setItem(KEY,JSON.stringify(s));}catch{} }
  function values(id){ return load().values?.[id]||{}; }
  function checks(id){ return load().checks?.[id]||[]; }

  const CARDS={
    'pacing-basics':{
      title:'Your turn — your monthly pace',
      scenario:'Class example: $1,800 − $1,050 Needs − $150 savings = $600 flexible ÷ 30 days = $20/day.',
      fields:[
        {key:'money',label:'Your money for the month ($)',def:1800,step:'0.01'},
        {key:'needs',label:'Known Needs to protect ($)',def:1050,step:'0.01'},
        {key:'savings',label:'Savings with a future job ($)',def:150,step:'0.01'},
        {key:'days',label:'Days it must last',def:30,step:'1'}
      ],
      compute(v){
        const flex=num2(v.money-v.needs-v.savings), per=v.days>0?num2(flex/v.days):0;
        if(flex<0) return `<span class="negative"><b>Overcommitted:</b></span> Needs plus savings are ${usd(-flex)} more than the money. Protect required costs first, then redo the math.`;
        return `Your flexible money: <b>${usd(flex)}</b> → your pace: <b>${usd(per)}/day</b>.`;
      },
      checklist:[
        'Write down the money that actually arrives this month (paycheck, allowance, benefits).',
        'List the Needs that must be paid before more money arrives.',
        'Subtract Needs and protected savings. What is left is your flexible money.',
        'Divide flexible money by the days it must last. That is your daily pace.',
        'If the daily pace feels tight, pick one flexible habit to shrink — not a Need.'
      ]
    },
    'semester-plan':{
      title:'Your turn — your semester pace',
      scenario:'Class example: $3,200 − $1,600 Needs − $400 savings = $1,200 ÷ 16 weeks = $75/week.',
      fields:[
        {key:'money',label:'Your semester total ($)',def:3200,step:'0.01'},
        {key:'needs',label:'Already-promised costs ($)',def:1600,step:'0.01'},
        {key:'savings',label:'Savings to protect ($)',def:400,step:'0.01'},
        {key:'weeks',label:'Weeks in your term',def:16,step:'1'}
      ],
      compute(v){
        const flex=num2(v.money-v.needs-v.savings), per=v.weeks>0?num2(flex/v.weeks):0;
        if(flex<0) return `<span class="negative"><b>Overcommitted</b></span> by ${usd(-flex)}. Something promised has to move, shrink, or wait.`;
        return `Usable for the term: <b>${usd(flex)}</b> → your pace: <b>${usd(per)}/week</b>.`;
      },
      checklist:[
        'Write your real semester total (refund, savings, family help — what actually exists).',
        'Subtract money already promised (tuition, rent, fees).',
        'Divide what is left by the weeks in your term.',
        'Put that weekly number where you will see it (phone note, fridge).',
        'When anything changes, redo the division. Never keep the old pace.'
      ]
    },
    'first-job':{
      title:'Your turn — read your own pay stub',
      scenario:'Class example: $420 gross − $67 in deductions = $353 take-home. Budget from take-home, never gross.',
      fields:[
        {key:'gross',label:'Gross pay ($)',def:420,step:'0.01'},
        {key:'d1',label:'Deduction 1 ($)',def:42,step:'0.01'},
        {key:'d2',label:'Deduction 2 ($)',def:18,step:'0.01'},
        {key:'d3',label:'Deduction 3 ($)',def:7,step:'0.01'}
      ],
      compute(v){
        const ded=num2(v.d1+v.d2+v.d3), take=num2(Math.max(0,v.gross-ded));
        const pct=v.gross>0?Math.round(take/v.gross*100):0;
        return `Deductions: <b>${usd(ded)}</b> → your take-home: <b>${usd(take)}</b> (${pct}% of gross). Only take-home goes in your budget.`;
      },
      checklist:[
        'Find a real pay stub (yours, or a sample one) and circle the gross pay.',
        'Circle each deduction and add them up yourself.',
        'Subtract to get take-home. That is the only number your budget uses.',
        'Ask: which deductions are choices vs required?',
        'Recompute whenever your hours or pay change.'
      ]
    },
    'usable-value':{
      title:'Your turn — compare something you buy',
      scenario:'Class example: $9 ÷ 12 used = $0.75 each vs $5.40 ÷ 6 used = $0.90 each. Use what you will actually use.',
      fields:[
        {key:'priceA',label:'Option A price ($)',def:9,step:'0.01'},
        {key:'unitsA',label:'Option A package units',def:12,step:'1'},
        {key:'usableA',label:'Option A units you will use',def:12,step:'1'},
        {key:'priceB',label:'Option B price ($)',def:5.4,step:'0.01'},
        {key:'unitsB',label:'Option B package units',def:6,step:'1'},
        {key:'usableB',label:'Option B units you will use',def:6,step:'1'}
      ],
      compute(v){
        if(v.usableA<=0||v.usableB<=0) return 'Units you will use must be above zero for both options.';
        const a=num2(v.priceA/v.usableA), b=num2(v.priceB/v.usableB);
        const better=a===b?'Neither — they tie on usable unit cost.':`The better usable value is <b>Option ${a<b?'A':'B'}</b>.`;
        return `A: <b>${usd(a)}</b> per used unit · B: <b>${usd(b)}</b> per used unit. ${better}`;
      },
      checklist:[
        'Pick two sizes of something you actually buy.',
        'For each: price ÷ units you will REALLY use (not the package count).',
        'Buy the lower per-used-unit — unless the bigger size will go to waste.',
        'Check: would the extra quantity expire or sit unused? Waste erases the deal.'
      ]
    },
    'gas-value':{
      title:'Your turn — is the cheaper station worth it?',
      scenario:'Class example: 12 gal × $0.15 cheaper = $1.80 pump savings − trip fuel cost = net savings.',
      fields:[
        {key:'near',label:'Nearby price / gallon ($)',def:3.2,step:'0.01'},
        {key:'far',label:'Cheaper price / gallon ($)',def:3.05,step:'0.01'},
        {key:'gallons',label:'Gallons you will buy',def:12,step:'0.1'},
        {key:'miles',label:'Extra round-trip miles',def:8,step:'0.1'},
        {key:'mpg',label:'Your vehicle MPG',def:25,step:'0.1'}
      ],
      compute(v){
        const save=num2(Math.max(0,(v.near-v.far))*v.gallons);
        const cost=v.mpg>0?num2(v.miles/v.mpg*v.far):0;
        const net=num2(save-cost);
        return `Pump savings <b>${usd(save)}</b> − trip fuel <b>${usd(cost)}</b> = net <b>${usd(net)}</b>. ${net>0?'The cheaper station wins on fuel alone.':'The extra drive costs more than the discount saves.'}`;
      },
      checklist:[
        'Use your car\'s real MPG (check the dash or look it up).',
        'Math it: (price difference × gallons) − (extra miles ÷ MPG × price).',
        'If the result is negative, the “deal” costs you money.',
        'Only count the trip if you would not drive there anyway.'
      ]
    },
    'subscriptions-lesson':{
      title:'Your turn — audit your subscriptions',
      scenario:'Class example: $10/month × 12 = $120/year ÷ 8 uses = $1.25 per use.',
      fields:[
        {key:'monthly',label:'Monthly cost ($)',def:10,step:'0.01'},
        {key:'uses',label:'Times you use it per month',def:4,step:'1'}
      ],
      compute(v){
        const yearly=num2(v.monthly*12), per=v.uses>0?num2(v.monthly/v.uses):null;
        return `<b>${usd(yearly)}</b> per year${per==null?'':' · <b>'+usd(per)+'</b> per use'}. ${per!=null&&per>5?'That is a pricey habit per use — consider pausing it.':'Compare this against your other subscriptions.'}`;
      },
      checklist:[
        'List every subscription you pay for (streaming, apps, boxes, memberships).',
        'For each: monthly × 12 = yearly cost. Then monthly ÷ uses = cost per use.',
        'Pause or cancel anything with a high cost-per-use you barely touch.',
        'Set a calendar reminder to re-check every 3 months.'
      ]
    }
  };

  function ctxLessonId(){ try{return JSON.parse(ss(CONTEXT_KEY)||'null')?.lessonId||null;}catch{return null;} }

  function cardIdFor(area){
    const ctx=ctxLessonId(), pf=ss(PACING_FOCUS_KEY), af=ss(ADULT_FOCUS_KEY);
    if(area==='pacing-value'){
      if(ctx==='pacing-basics'||ctx==='usable-value'||ctx==='gas-value') return ctx;
      return {pacing:'pacing-basics',value:'usable-value',gas:'gas-value'}[pf]||null;
    }
    if(area==='plan') return 'semester-plan';
    if(area==='subscriptions') return 'subscriptions-lesson';
    if(area==='adult-life') return af==='first-job'?'first-job':null;
    return null;
  }

  function fieldHtml(id,f){
    const val=values(id)[f.key];
    const shown=val==null?f.def:val;
    return `<div class="field"><label for="yn-${id}-${f.key}">${esc(f.label)}</label><input id="yn-${id}-${f.key}" type="number" min="0" step="${f.step}" value="${esc(shown)}" oninput="myNumbers.fieldInput('${id}')"></div>`;
  }

  function cardHtml(id){
    const c=CARDS[id]; if(!c) return '';
    const chks=checks(id);
    return `<section class="card your-turn" aria-label="Your turn: use your own numbers">`
      +`<div class="row between"><div><span class="tag your-turn-tag">Your turn</span><h3>${esc(c.title)}</h3></div></div>`
      +`<p class="sub">${esc(c.scenario)} Now run it with your numbers — they are saved on this device only.</p>`
      +`<div class="grid g3">${c.fields.map(f=>fieldHtml(id,f)).join('')}</div>`
      +`<div style="height:12px"></div><button class="btn" type="button" onclick="myNumbers.calc('${id}')">Do the math</button>`
      +`<div class="result${values(id)&&Object.keys(values(id)).length?'':' hidden'}" id="yn-${id}-result" role="status" aria-live="polite"></div>`
      +`<details class="your-turn-checklist"><summary><b>Takeaway checklist</b> — do this for real</summary><ol>`
      +c.checklist.map((item,i)=>`<li><label><input type="checkbox"${chks[i]?' checked':''} onchange="myNumbers.check('${id}',${i},this.checked)"> <span>${esc(item)}</span></label></li>`).join('')
      +`</ol><button class="btn secondary" type="button" onclick="window.print()">Print this checklist</button></details>`
      +`</section>`;
  }

  function readValues(id){
    const c=CARDS[id], out={};
    for(const f of c.fields){ out[f.key]=Number(document.getElementById(`yn-${id}-${f.key}`)?.value)||0; }
    return out;
  }

  function calc(id){
    const c=CARDS[id]; if(!c) return;
    const v=readValues(id);
    const s=load(); s.values=s.values||{}; s.values[id]=v; saveAll(s);
    const r=document.getElementById(`yn-${id}-result`);
    if(r){ r.innerHTML=c.compute(v); r.classList.remove('hidden'); }
  }

  function fieldInput(id){ // persist without re-rendering (keeps focus while typing)
    const s=load(); s.values=s.values||{}; s.values[id]=readValues(id); saveAll(s);
  }

  function check(id,i,on){
    const s=load(); s.checks=s.checks||{}; const arr=s.checks[id]=s.checks[id]||[];
    arr[i]=!!on; saveAll(s);
  }

  function yourTurnHTML(area){
    const id=cardIdFor(area);
    if(!id) return '';
    const html=cardHtml(id);
    // If the learner already saved numbers, show the result immediately after paint.
    queueMicrotask(()=>{ const v=values(id); if(v&&Object.keys(v).length){ try{calc(id);}catch{} } });
    return html;
  }

  window.myNumbers={yourTurnHTML,calc,fieldInput,check};
})();
