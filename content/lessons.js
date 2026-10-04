// NWS lesson content: one-thing-per-screen lesson flows.
// Each lesson is an ordered list of steps. The lesson player in app/course-ui.js
// renders one step per screen and auto-appends an "end and review" summary.
// Step types:
//   teach   {h, body}                    - concept + reasoning
//   example {h, story, points[]}         - worked example, Maya walks through it
//   try     {q, choices:[{label,ok}], hint, good, bad, why} - one question, feedback, mini explanation
//   sort    {h, body, buckets[], items:[{label,a,why}]}     - interactive animated sorting
//   tool    {screen, h, body, cta}       - hands-on in the real tool, then continue
// Review answers persist to sessionStorage only; they are not mastery evidence.

export const LESSON_CONTENT={
/* ================= MODULE 1: Money Foundations ================= */
'nws-routine':{intro:'Sort every dollar before you spend it: Needs, Wants, Savings.',steps:[
 {t:'teach',h:'Money needs a job before you spend it',
  body:'<p>Most money stress is not a math problem. It is a <b>sorting</b> problem: dollars without a job get spent on whatever shows up first.</p><p>The NWS routine gives every dollar a job:</p><ul><li><b>Need</b> - keeps you safe, healthy, or functioning <i>right now</i>.</li><li><b>Want</b> - nice to have, but life works without it.</li><li><b>Savings</b> - money moved to later, for a goal or a surprise.</li></ul><p>This is not about being "good with money." It is a decision tool: sort first, then decide.</p>',diagram:'<svg class="nws-diagram" viewBox="0 0 480 268" role="img" aria-labelledby="dga-t"> <title id="dga-t">Three money buckets in order: Needs first, Savings next, Wants last</title> <rect x="155" y="8" width="170" height="46" rx="23" fill="var(--brand)"/> <text x="240" y="38" text-anchor="middle" font-size="20" font-weight="700" fill="var(--panel)">Every payday</text> <line x1="240" y1="56" x2="90" y2="116" stroke="var(--brand)" stroke-width="3"/> <line x1="240" y1="56" x2="240" y2="116" stroke="var(--brand)" stroke-width="3"/> <line x1="240" y1="56" x2="390" y2="116" stroke="var(--brand)" stroke-width="3"/> <rect x="18" y="118" width="144" height="128" rx="12" fill="var(--brand)"/> <text x="90" y="160" text-anchor="middle" font-size="20" font-weight="700" fill="var(--panel)">1 &#183; NEEDS</text> <text x="90" y="190" text-anchor="middle" font-size="18" fill="var(--panel)">protect first</text> <text x="90" y="214" text-anchor="middle" font-size="18" fill="var(--panel)">rent &#183; food &#183; bus</text> <rect x="168" y="118" width="144" height="128" rx="12" fill="var(--brand-soft)" stroke="var(--brand)" stroke-width="2"/> <text x="240" y="160" text-anchor="middle" font-size="20" font-weight="700" fill="var(--brand-deep)">2 &#183; SAVINGS</text> <text x="240" y="190" text-anchor="middle" font-size="18" fill="var(--ink)">move aside next</text> <text x="240" y="214" text-anchor="middle" font-size="18" fill="var(--ink)">goals &#183; surprises</text> <rect x="318" y="118" width="144" height="128" rx="12" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="2"/> <text x="390" y="160" text-anchor="middle" font-size="20" font-weight="700" fill="var(--accent-deep)">3 &#183; WANTS</text> <text x="390" y="190" text-anchor="middle" font-size="18" fill="var(--ink)">spend last,</text> <text x="390" y="214" text-anchor="middle" font-size="18" fill="var(--ink)">guilt-free</text> </svg>'},
 {t:'teach',h:'The 4-step routine',
  body:'<ol><li><b>List</b> what is coming: bills, pay, anything pending.</li><li><b>Sort</b> each one into Need, Want, or Savings.</li><li><b>Protect</b> Needs first, then move Savings aside <i>before</i> spending on Wants.</li><li><b>Spend</b> what is left on Wants - without guilt. That is what it is for.</li></ol><p>Order matters. Wants are decided <i>last</i>, from what is left - never first, from what is visible.</p>',diagram:'<svg class="nws-diagram" viewBox="0 0 360 412" role="img" aria-labelledby="dgb-t"> <title id="dgb-t">The four-step routine in order: List, Sort, Protect, Spend</title> <rect x="14" y="0" width="332" height="78" rx="14" fill="var(--brand-soft)" stroke="var(--line)"/> <circle cx="52" cy="39" r="20" fill="var(--brand)"/> <text x="52" y="46" text-anchor="middle" font-size="20" font-weight="700" fill="var(--panel)">1</text> <text x="86" y="34" font-size="21" font-weight="700" fill="var(--ink)">List</text> <text x="86" y="60" font-size="18" fill="var(--muted)">what&#8217;s coming</text> <line x1="180" y1="78" x2="180" y2="96" stroke="var(--brand)" stroke-width="3"/><path d="M172,96 L188,96 L180,106 Z" fill="var(--brand)"/> <rect x="14" y="104" width="332" height="78" rx="14" fill="var(--brand-soft)" stroke="var(--line)"/> <circle cx="52" cy="143" r="20" fill="var(--brand)"/> <text x="52" y="150" text-anchor="middle" font-size="20" font-weight="700" fill="var(--panel)">2</text> <text x="86" y="138" font-size="21" font-weight="700" fill="var(--ink)">Sort</text> <text x="86" y="164" font-size="18" fill="var(--muted)">need &#183; want &#183; savings</text> <line x1="180" y1="182" x2="180" y2="200" stroke="var(--brand)" stroke-width="3"/><path d="M172,200 L188,200 L180,210 Z" fill="var(--brand)"/> <rect x="14" y="208" width="332" height="78" rx="14" fill="var(--brand-soft)" stroke="var(--line)"/> <circle cx="52" cy="247" r="20" fill="var(--brand)"/> <text x="52" y="254" text-anchor="middle" font-size="20" font-weight="700" fill="var(--panel)">3</text> <text x="86" y="242" font-size="21" font-weight="700" fill="var(--ink)">Protect</text> <text x="86" y="268" font-size="18" fill="var(--muted)">needs + savings first</text> <line x1="180" y1="286" x2="180" y2="304" stroke="var(--brand)" stroke-width="3"/><path d="M172,304 L188,304 L180,314 Z" fill="var(--brand)"/> <rect x="14" y="312" width="332" height="78" rx="14" fill="var(--brand-soft)" stroke="var(--line)"/> <circle cx="52" cy="351" r="20" fill="var(--brand)"/> <text x="52" y="358" text-anchor="middle" font-size="20" font-weight="700" fill="var(--panel)">4</text> <text x="86" y="346" font-size="21" font-weight="700" fill="var(--ink)">Spend</text> <text x="86" y="372" font-size="18" fill="var(--muted)">wants &#8212; from what&#8217;s left</text> </svg>'},
 {t:'sort',h:'Sort it: Maya\u2019s week',body:'<p>Maya has her week in front of her. Sort each item into the right bucket. Watch what the routine protects.</p>',
  buckets:['Need','Want','Savings'],
  items:[
   {label:'Bus pass to get to work',a:'need',why:'Without it she cannot earn. Work transport is a Need.'},
   {label:'Groceries for the week',a:'need',why:'Food that keeps her going is a Need - not fancy food, but food.'},
   {label:'New headphones (old ones work fine)',a:'want',why:'Nice to have. The old ones work, so this is a Want.'},
   {label:'$10 into her emergency fund',a:'savings',why:'Money moved to later. Savings is its own bucket.'},
   {label:'Phone bill',a:'need',why:'Required to keep service she depends on. A Need.'},
   {label:'Concert ticket',a:'want',why:'Fun, memorable - and optional. A Want.'},
   {label:'Prescription refill',a:'need',why:'Health comes first. A Need, no debate.'},
   {label:'Daily fancy coffee',a:'want',why:'A small daily Want. Fine - but only from what is left after Needs and Savings.'}]},
{t:'try',skill:'nws-routine',tier:'guided',
  gen:(v)=>{
   const person=v.person();
   const payC=Math.round(v.cents(560,780)*100);
   const needsC=Math.round(v.cents(280,400)*100);
   const savC=Math.round(v.cents(40,90)*100);
   const flexC=payC-needsC-savC;
   const wantC=flexC+v.int(-4000,4000);
   const want=v.pick(['concert tickets','a new pair of sneakers','a video game','a weekend trip']);
   const fits=wantC<=flexC;
   const P=v.money(payC/100),N=v.money(needsC/100),S=v.money(savC/100),F=v.money(flexC/100),W=v.money(wantC/100);
   return {
    q:`${person} runs the routine on a ${P} paycheck: List, Sort, Protect, Spend. Needs are ${N}, the Savings move is ${S}, and ${want} costs ${W}. What does the routine say?`,
    choices: fits?[
     {label:`Buy it \u2014 ${F} is left after Needs and Savings, and ${W} fits inside it.`,ok:true},
     {label:`Skip it \u2014 Wants are never allowed once Savings exist.`,ok:false,mis:'savings-means-no-spending'},
     {label:`Buy it straight from the ${P} \u2014 the whole paycheck is the spending number.`,ok:false,mis:'available-means-balance'},
     {label:`Buy it and skip Savings this week \u2014 the Want showed up first.`,ok:false,mis:'savings-skippable'}
    ]:[
     {label:`Wait \u2014 only ${F} is left after Needs and Savings, and ${W} does not fit.`,ok:true},
     {label:`Buy it \u2014 ${P} is bigger than ${W}, so the money is there.`,ok:false,mis:'available-means-balance'},
     {label:`Buy it and shrink the Needs \u2014 time-sensitive Wants jump the line.`,ok:false,mis:'needs-are-flexible'},
     {label:`Buy it \u2014 Savings can be skipped whenever a good Want appears.`,ok:false,mis:'savings-skippable'}
    ],
    cue:`Protect first: hold ${N} of Needs and move ${S} to Savings. Only then check what is left.`,
    hint:'Wants are decided last, from what is left \u2014 never first.',
    good: fits?`Right: ${P} \u2212 ${N} \u2212 ${S} = ${F} flexible, and ${W} fits \u2014 enjoy it guilt-free.`:`Right: ${P} \u2212 ${N} \u2212 ${S} = ${F} flexible, which is short of ${W}.`,
    bad: fits?`Run the order: ${P} \u2212 ${N} \u2212 ${S} = ${F}. The ${W} Want fits inside it, so the routine says yes.`:`Run the order: ${P} \u2212 ${N} \u2212 ${S} = ${F}. ${W} does not fit \u2014 it waits for next week.`,
    why: fits?`The routine is order, not willpower: Needs (${N}) and Savings (${S}) are protected first, then a ${W} Want spends cleanly from the ${F} that is left.`:`${F} is this week\u2019s honest Wants budget. A ${W} Want against ${F} flexible breaks the order \u2014 the Want waits, the routine holds.`};
  }},
 {t:'try',skill:'nws-routine',tier:'independent',
  gen:(v)=>{
   const person=v.person();
   const items=[
    ['bus pass','she needs it to get to work','need','Work transport keeps her earning \u2014 a Need.'],
    ['prescription refill','her doctor ordered it','need','Health comes first \u2014 a Need, no debate.'],
    ['groceries for the week','her fridge is empty','need','Food that keeps her going \u2014 a Need.'],
    ['new headphones','her old ones work fine','want','Nice to have. The old ones work, so this is a Want.'],
    ['concert tickets','she would love to go','want','Fun and memorable \u2014 and optional. A Want.'],
    ['a streaming bundle','she can already use her roommate\u2019s for free','want','The access already exists for free \u2014 a Want.']
   ];
   const it=v.pick(items);
   const item=it[0], ctx=it[1], ans=it[2], whyLine=it[3];
   const priceC=Math.round(v.cents(12,85)*100);
   const price=v.money(priceC/100);
   const saleC=Math.round(priceC*0.6);
   const tag=ans==='want'?v.money(saleC/100)+' (40% off this week)':price;
   return {
    q:`${person} runs the routine: ${item}, and ${ctx}. Price: ${tag}. Which bucket does it belong in?`,
    choices: ans==='need'?[
     {label:'Need',ok:true},
     {label:'Want',ok:false},
     {label:'Savings \u2014 buying the cheap option counts as saving',ok:false,mis:'not-spending-is-saving'},
     {label:'It depends \u2014 every purchase is a mystery',ok:false,mis:'sort-dodge'}
    ]:[
     {label:'Want',ok:true},
     {label:'Need \u2014 40% off makes it a Need',ok:false,mis:'sale-not-needed'},
     {label:'Savings \u2014 the discount itself goes in the Savings bucket',ok:false,mis:'not-spending-is-saving'},
     {label:'Need \u2014 cheap things are always Needs',ok:false,mis:'cheap-means-need'}
    ],
    hint:'Sort by what it is for, right now \u2014 not the price tag.',
    good:`Right: ${whyLine}`,
    bad:`Ask what it is for, right now: ${ctx}. ${whyLine}`,
    why: ans==='need'?`${whyLine} The routine protects it in step 3, before any Want is considered.`:`${whyLine} A sale changes the price, not the job \u2014 a discounted Want is still a Want, paid from what is left after Needs and Savings.`};
  }},
 {t:'try',skill:'nws-routine',tier:'independent',
  gen:(v)=>{
   const person=v.person();
   const billC=Math.round(v.cents(45,95)*100);
   const giftC=billC+v.int(-2500,6000);
   const wantC=Math.round(v.cents(20,55)*100);
   const want=v.pick(['concert tickets','a new game','sneakers she has been eyeing']);
   const coversWant=giftC>=billC+wantC;
   const G=v.money(giftC/100),B=v.money(billC/100),W=v.money(wantC/100);
   return {
    q:`${person} gets a no-strings ${G} birthday gift. Her phone bill (${B}, a Need) is due tomorrow, and she wants ${want} (${W}). What does the routine say to do first?`,
    choices: coversWant?[
     {label:`Pay the ${B} bill first, then the ${W} ${want} \u2014 windfalls run the same routine.`,ok:true},
     {label:`Spend the whole ${G} on the ${want} \u2014 gift money is fun money.`,ok:false,mis:'windfall-exception'},
     {label:`Put all ${G} in Savings \u2014 gifts should never be spent.`,ok:false,mis:'save-everything'},
     {label:`Skip the routine \u2014 it only applies to paychecks.`,ok:false,mis:'windfall-exception'}
    ]:[
     {label:`Pay the ${B} bill first; the ${want} waits \u2014 gift money runs the same routine.`,ok:true},
     {label:`Buy the ${want} first \u2014 gifts are for fun, bills can wait a week.`,ok:false,mis:'timing-dodge'},
     {label:`Split it evenly: half bill, half ${want}, and hope the rest works out.`,ok:false,mis:'even-split'},
     {label:`Ignore the bill \u2014 the routine only sorts paycheck money.`,ok:false,mis:'windfall-exception'}
    ],
    hint:'Does the routine care where the money came from?',
    good: coversWant?`Right: Needs (${B}) protected first, then the ${W} Want fits in what is left.`:`Right: the ${B} Need is protected first, and ${G} does not stretch to the ${W} Want.`,
    bad: coversWant?`Needs first, then Wants: ${G} \u2212 ${B} leaves room for the ${W} ${want}.`:`Needs first: the ${B} bill eats first, and ${G} \u2212 ${B} is short of ${W}.`,
    why:`Gift money, found money, side-gig money \u2014 it all spends the same. Running it through Needs \u2192 Savings \u2192 Wants keeps a fun surprise from quietly becoming regret.`};
  }},
 {t:'try',skill:'nws-routine',tier:'stretch',
  gen:(v)=>{
   const person=v.person();
   const payC=Math.round(v.cents(620,840)*100);
   const needsC=Math.round(v.cents(330,470)*100);
   const savC=Math.round(v.cents(50,100)*100);
   const flexC=payC-needsC-savC;
   const outcome=v.pick(['a','b','both','neither']);
   const aC=outcome==='a'?Math.round(flexC*0.55):outcome==='b'?Math.round(flexC*1.25):outcome==='both'?Math.round(flexC*0.4):Math.round(flexC*1.3);
   const bC=outcome==='b'?Math.round(flexC*0.55):outcome==='a'?Math.round(flexC*1.25):outcome==='both'?Math.round(flexC*0.45):Math.round(flexC*1.15);
   const itemA=v.pick(['concert tickets','a new video game','a weekend trip']);
   const itemB=v.pick(['new sneakers','a nice dinner out','headphones']);
   const P=v.money(payC/100),F=v.money(flexC/100),A=v.money(aC/100),B=v.money(bC/100);
   const sum=v.money((aC+bC)/100);
   return {
    q:`${person} protects Needs and Savings from a ${P} paycheck, leaving ${F} flexible. She wants ${itemA} (${A}) and ${itemB} (${B}). What is the routine\u2019s call?`,
    choices: outcome==='a'?[
     {label:`${itemA} only \u2014 ${A} fits in ${F}; ${B} does not.`,ok:true},
     {label:`Both \u2014 the ${P} paycheck covers ${A} plus ${B}.`,ok:false,mis:'available-means-balance'},
     {label:`${itemB} only \u2014 pick the more expensive one first.`,ok:false,mis:'price-only-decision'},
     {label:`Neither \u2014 two Wants in one week is always too many.`,ok:false,mis:'absolute-rules'}
    ]:outcome==='b'?[
     {label:`${itemB} only \u2014 ${B} fits in ${F}; ${A} does not.`,ok:true},
     {label:`Both \u2014 the ${P} paycheck covers ${A} plus ${B}.`,ok:false,mis:'available-means-balance'},
     {label:`${itemA} only \u2014 first come, first served.`,ok:false,mis:'first-come-first-served'},
     {label:`Neither \u2014 Wants should take turns, one per month.`,ok:false,mis:'absolute-rules'}
    ]:outcome==='neither'?[
     {label:`Neither \u2014 ${A} and ${B} both break the ${F} flexible budget. They wait.`,ok:true},
     {label:`${itemA} \u2014 at least one Want per week is the rule.`,ok:false,mis:'absolute-rules'},
     {label:`Both \u2014 put them on a card and sort it out later.`,ok:false},
     {label:`${itemB} \u2014 the cheaper one is always fine.`,ok:false,mis:'absolute-rules'}
    ]:[
     {label:`Both \u2014 ${A} plus ${B} is ${sum}, inside ${F}. Guilt-free.`,ok:true},
     {label:`Only one \u2014 Wants are one-per-week, no exceptions.`,ok:false,mis:'absolute-rules'},
     {label:`Neither \u2014 bank the ${F} and skip both.`,ok:false,mis:'save-everything'},
     {label:`Both, plus dip into Savings for a third \u2014 great weeks are for splurging.`,ok:false,mis:'great-week-splurge'}
    ],
    hint:'Flexible money is the only judge: compare each Want to it, not to the paycheck.',
    good: outcome==='a'?`Right: ${A} \u2264 ${F}, but ${B} is over \u2014 ${itemA} only.`:(outcome==='b'?`Right: ${B} \u2264 ${F}, but ${A} is over \u2014 ${itemB} only.`:(outcome==='neither'?`Right: both Wants break ${F}. The routine holds \u2014 they wait.`:`Right: ${sum} total fits inside ${F}. Both, guilt-free.`)),
    bad:`Flexible is ${F}. ${itemA} costs ${A}, ${itemB} costs ${B}. The routine spends only what is left \u2014 each Want judged against ${F}.`,
    why:`Wants are decided last, from what is left \u2014 never first, from what is visible. ${F} flexible is the whole answer; the ${P} paycheck is not the spending number.`};
  }},
]},
'available-money':{intro:'The number on the screen is not the number you can spend.',steps:[
 {t:'teach',h:'The number on the screen lies a little',
  body:'<p>Your app shows a <b>balance</b>. But some of that money already has a job:</p><ul><li><b>Scheduled payments</b> - autopay that has not hit yet.</li><li><b>Pending charges</b> - swiped but not posted.</li><li><b>Promises</b> - money you already decided to save.</li></ul><p><b>Available money = balance \u2212 money that already has a job.</b> Spend from the available number, never the visible one.</p>'},
 {t:'example',h:'Maya checks before she spends',story:'<p>Friday night. Maya\u2019s app shows <b>$320</b>. A friend invites her to dinner - about $40. She checks first:</p>',
  points:['Balance on screen: $320','Electric autopay hits tomorrow: \u2212$90','Promised to emergency savings: \u2212$40','Actually available: <b>$190</b>','Dinner fits. She goes - and the electric bill is safe.']},
 {t:'try',skill:'available-money',tier:'guided',
 gen:(v)=>{
  const person=v.person();
  const bal=v.cents(220,460), auto=v.cents(45,140);
  const bC=Math.round(bal*100), aC=Math.round(auto*100);
  const availC=bC-aC;
  const B=v.money(bal), A=v.money(auto), AV=v.money(availC/100);
  const when=v.pick(['tomorrow','in two days','on Friday']);
  const bill=v.pick(['electric','phone','internet']);
  return {
   q:`${person}\u2019s app shows a balance of ${B}. A ${A} ${bill} autopay hits ${when}. Nothing else is pending. What is actually available to spend?`,
   choices:[
    {label:`${AV}`,ok:true},
    {label:`${B} \u2014 the balance is the spending number`,ok:false,mis:'available-means-balance'},
    {label:`${v.money((bC+aC)/100)} \u2014 the payment has not hit yet, so add it back`,ok:false,mis:'not-due-means-safe'},
    {label:`${A} \u2014 the autopay amount is the answer`,ok:false,mis:'obligation-is-available'}],
   cue:'Start by subtracting the money that already has a job.',
   hint:'Available = balance \u2212 money with a job.',
   good:`Right: ${B} \u2212 ${A} = ${AV}.`,
   bad:`Subtract the scheduled payment first: ${B} \u2212 ${A} = ${AV}.`,
   why:`The ${A} is already spoken for. Available = ${B} \u2212 ${A} = ${AV}.`};
 }},
 {t:'try',skill:'available-money',tier:'independent',
 gen:(v)=>{
  const person=v.person();
  const bal=v.cents(450,650), auto=v.cents(120,200), hold=v.cents(25,60), sav=v.cents(30,80);
  const bC=Math.round(bal*100), aC=Math.round(auto*100), hC=Math.round(hold*100), sC=Math.round(sav*100);
  const availC=bC-aC-hC-sC;
  const B=v.money(bal), A=v.money(auto), H=v.money(hold), S=v.money(sav), AV=v.money(availC/100);
  const spoken=v.money((aC+hC+sC)/100);
  return {
   q:`${person}\u2019s app shows ${B}. Coming up: a ${A} rent autopay, a ${H} pending gas hold, and ${S} promised to savings. What is actually available?`,
   choices:[
    {label:`${AV}`,ok:true},
    {label:`${B} \u2014 the app balance is the real number`,ok:false,mis:'available-means-balance'},
    {label:`${v.money((bC-aC-sC)/100)} \u2014 pending holds do not count until they post`,ok:false,mis:'balance-not-available'},
    {label:`${v.money((bC-aC-hC)/100)} \u2014 the savings promise can wait`,ok:false,mis:'savings-from-leftovers'}],
   hint:'Three things already have a job. Subtract all three.',
   good:`Right: ${B} \u2212 ${A} \u2212 ${H} \u2212 ${S} = ${AV}.`,
   bad:`Count everything with a job: ${A} + ${H} + ${S} = ${spoken} spoken for. ${B} \u2212 ${spoken} = ${AV}.`,
   why:`Rent, the pending hold, and the savings promise all count \u2014 posted or not. ${B} \u2212 ${spoken} = ${AV} actually available.`};
 }},
 {t:'try',skill:'available-money',tier:'independent',
 gen:(v)=>{
  const person=v.person();
  const bal=v.cents(240,420), auto=v.cents(60,130);
  const bC=Math.round(bal*100), aC=Math.round(auto*100);
  const availC=bC-aC;
  const priceC=availC+v.int(-2800,2800);
  const B=v.money(bal), A=v.money(auto), AV=v.money(availC/100), P=v.money(priceC/100);
  const item=v.pick(['concert ticket','pair of sneakers','video game','desk lamp']);
  const when=v.pick(['tomorrow','in a few days']);
  const afford=priceC<=availC;
  return {
   q:`${person} wants a ${P} ${item} today. The app shows ${B}, but a ${A} autopay hits ${when}. Does the available-money rule say buy it?`,
   choices: afford?[
    {label:`Yes \u2014 ${AV} is actually available, and that covers ${P}.`,ok:true},
    {label:`No \u2014 never spend anything before a scheduled payment clears.`,ok:false,mis:'absolute-rules'},
    {label:`Yes \u2014 but only by skipping the autopay this month.`,ok:false,mis:'skip-obligation'},
    {label:`No \u2014 the ${B} on screen is not the spending number, so nothing is safe.`,ok:false,mis:'nothing-safe'}
   ]:[
    {label:`No \u2014 only ${AV} is safe today; ${P} is out of reach.`,ok:true},
    {label:`Yes \u2014 the ${B} balance covers ${P} with room to spare.`,ok:false,mis:'available-means-balance'},
    {label:`Yes \u2014 ${when} is not today; spend now and worry later.`,ok:false,mis:'timing-dodge'},
    {label:`No \u2014 ${person} should never buy ${item}s on this budget.`,ok:false,mis:'absolute-rules'}
   ],
   hint:'Compare the price to the available number, not the balance.',
   good: afford?`Right: ${AV} available covers the ${P} ${item}, with the ${A} autopay untouched.`:`Right: ${P} is more than the ${AV} available. The autopay eats first.`,
   bad: afford?`Check against available, not the screen: ${B} \u2212 ${A} = ${AV}, which covers ${P}.`:`Available is ${B} \u2212 ${A} = ${AV} \u2014 short of ${P}.`,
   why: afford?`The rule is a comparison, not a ban: ${AV} available covers the ${P} ${item} with the ${A} autopay protected.`:`Wanting it today does not change the math: ${AV} is the real number, and ${P} does not fit inside it.`};
 }},
 {t:'try',skill:'available-money',tier:'stretch',
 gen:(v)=>{
  const person=v.person();
  const bal=v.cents(180,320), pay=v.cents(220,380), rent=v.cents(90,160);
  const bC=Math.round(bal*100), pC=Math.round(pay*100), rC=Math.round(rent*100);
  const availC=bC-rC;
  const phantom=v.int(500,1500);
  const B=v.money(bal), P=v.money(pay), R=v.money(rent), AV=v.money(availC/100);
  return {
   q:`It is Wednesday. ${person}\u2019s balance is ${B}. A ${P} paycheck lands Friday, and ${R} rent autopay hits Saturday. What is the most ${person} can spend today without risking the rent?`,
   choices:[
    {label:`${AV}`,ok:true},
    {label:`${B} \u2014 spend from what is on screen`,ok:false,mis:'available-means-balance'},
    {label:`${v.money((bC+pC-rC)/100)} \u2014 Friday\u2019s paycheck is basically here`,ok:false,mis:'pending-is-cash'},
    {label:`${v.money((availC-phantom)/100)} \u2014 hold a buffer on top of the rent`,ok:false}],
   hint:'Which of those future numbers is guaranteed today?',
   good:`Right: ${B} \u2212 ${R} = ${AV}. Friday\u2019s money does not exist yet.`,
   bad:`Protect the scheduled rent from today\u2019s balance \u2014 and do not spend a paycheck that has not landed: ${B} \u2212 ${R} = ${AV}.`,
   why:`Two rules in one: subtract scheduled costs from what you have <i>now</i> (${B} \u2212 ${R} = ${AV}), and never spend income before it arrives. Friday\u2019s ${P} is a hope until it posts.`};
 }},
 {t:'tool',screen:'home',h:'See it on a dashboard',body:'<p>The home dashboard separates <b>Available now</b>, <b>Known Needs</b>, and <b>Flexible after known costs</b> - the same check you just did, live.</p>',cta:'Open the dashboard'}
]},
'depends-decisions':{intro:'Context changes the category. "It depends" is a real answer.',steps:[
 {t:'teach',h:'"It depends" is a real answer',
  body:'<p>The same item can be a Need for one person and a Want for another. The category is not in the <i>thing</i> - it is in the <b>context</b>.</p><p>When you are unsure, ask: <b>"What is it for, right now?"</b></p><ul><li>Winter coat, October, you own none \u2192 Need.</li><li>Winter coat, you already own a warm one \u2192 Want.</li><li>Laptop, required for classes \u2192 Need.</li><li>Laptop, mostly for games \u2192 Want.</li></ul>'},
 {t:'sort',h:'Sort it: context matters',body:'<p>Each item comes with its context. Some are clear. Two of them genuinely depend - use the <b>It depends</b> bucket.</p>',
  buckets:['Need','Want','It depends'],
  items:[
   {label:'Laptop - required for your classes',a:'need',why:'Required to function as a student. Need.'},
   {label:'Laptop - mostly for gaming',a:'want',why:'Same object, different job. For games it is a Want.'},
   {label:'Winter coat - it is October and you own none',a:'need',why:'Health and safety. Need.'},
   {label:'Winter coat - you already own a warm one',a:'want',why:'The second coat is optional. Want.'},
   {label:'Car - no bus route to your job',a:'need',why:'Without it there is no income. Need.'},
   {label:'Car - just for weekend fun',a:'want',why:'Fun is a Want - a great one, but a Want.'},
   {label:'Ordering takeout (no other info)',a:'depends',why:'Depends: no food at home leans Need; a craving leans Want. You need more info.'},
   {label:'A $60 video game (no other info)',a:'depends',why:'Depends: a gift for a friend? a reward you planned? Without context you cannot sort it.'}]},
{t:'try',skill:'needs',tier:'guided',
  gen:(v)=>{
   const person=v.person();
   const items=[
    ['a $38 phone charger','hers died last night and her work schedule comes through her phone','hers works fine \u2014 she just wants a longer cable','Without a working phone she cannot get her shifts \u2014 a Need.','The phone already charges \u2014 a longer cable is a Want.'],
    ['lunch out ($14)','her fridge is empty and she has no packed lunch','she has groceries waiting at home','No food at home and no backup \u2014 this lunch covers the Need.','The food Need is already covered at home \u2014 this lunch is social, a Want.'],
    ['new work shoes ($62)','her old pair has holes and she is on her feet all shift','her old pair is fine \u2014 these are a style upgrade','Holes plus a standing shift means function \u2014 a Need.','Fine shoes already do the job \u2014 the upgrade is a Want.'],
    ['a laptop','her classes require one this semester','she mostly wants it for streaming and games','Required to function as a student \u2014 a Need.','Same object, different job \u2014 for games it is a Want.']
   ];
   const it=v.pick(items);
   const name=it[0], needCtx=it[1], wantCtx=it[2];
   const isNeed=v.pick([true,false]);
   const ctx=isNeed?needCtx:wantCtx;
   const whyLine=isNeed?it[3]:it[4];
   return {
    q:`${person} is eyeing ${name}. Context: ${ctx}. Need or Want?`,
    choices: isNeed?[
     {label:'Need',ok:true},
     {label:'Want',ok:false},
     {label:'Need \u2014 but only if it is on sale',ok:false,mis:'sale-not-needed'},
     {label:'Savings \u2014 paying cash for it counts as saving',ok:false}
    ]:[
     {label:'Want',ok:true},
     {label:'Need',ok:false},
     {label:'Need \u2014 everyone needs one eventually',ok:false,mis:'eventual-need'},
     {label:'It depends \u2014 there is never enough info',ok:false,mis:'sort-dodge'}
    ],
    cue:`Ask \u201cwhat is it for, right now?\u201d \u2014 then check function, alternatives, and consequences.`,
    hint:'Same item, different context. The category lives in the context.',
    good:`Exactly: ${whyLine}`,
    bad:`Look at the context, not the item: ${ctx}. ${whyLine}`,
    why:`Identical purchase, different categories \u2014 this is why \u201cwhat is it for, right now?\u201d beats any fixed list.`};
  }},
 {t:'try',skill:'needs',tier:'independent',
  gen:(v)=>{
   const person=v.person();
   const items=[
    ['Winter coat \u2014 it is October and she owns none','need','Health and safety \u2014 a Need.'],
    ['Winter coat \u2014 she already owns a warm one','want','The second coat is optional \u2014 a Want.'],
    ['Ordering takeout \u2014 no other info','depends','No food at home leans Need; a craving leans Want. Without context, it depends.'],
    ['Car repairs \u2014 no bus route to her job','need','Without it there is no income \u2014 a Need.'],
    ['A car upgrade \u2014 just for weekend fun','want','Fun is a Want \u2014 a great one, but a Want.'],
    ['A $60 video game \u2014 no other info','depends','A planned reward? A gift for a friend? Without context you cannot sort it \u2014 it depends.']
   ];
   const it=v.pick(items);
   const label=it[0], ans=it[1], whyLine=it[2];
   return {
    q:`${person} sorts: \u201c${label}.\u201d Which bucket?`,
    choices: ans==='need'?[
     {label:'Need',ok:true},
     {label:'Want',ok:false},
     {label:'It depends \u2014 nothing is ever really a Need',ok:false,mis:'sort-dodge'},
     {label:'Savings \u2014 not buying it moves the money to Savings',ok:false,mis:'not-spending-is-saving'}
    ]:ans==='want'?[
     {label:'Want',ok:true},
     {label:'Need',ok:false},
     {label:'It depends \u2014 maybe she secretly needs it',ok:false,mis:'sort-dodge'},
     {label:'Savings \u2014 skipping it is the same as saving',ok:false,mis:'not-spending-is-saving'}
    ]:[
     {label:'It depends \u2014 more info needed',ok:true},
     {label:'Need \u2014 guess Need to be safe',ok:false,mis:'sort-dodge'},
     {label:'Want \u2014 when in doubt it is a Want',ok:false,mis:'sort-dodge'},
     {label:'Savings \u2014 just do not buy it',ok:false,mis:'not-spending-is-saving'}
    ],
    hint:'No fixed lists \u2014 ask what it is for, right now.',
    good:`Right: ${whyLine}`,
    bad:`Check the context line by line: ${whyLine}`,
    why:`${whyLine} \u201cIt depends\u201d is a real answer \u2014 it means go get the missing context, not guess.`};
  }},
 {t:'try',skill:'needs',tier:'independent',
  gen:(v)=>{
   const person=v.person();
   const price=v.money(v.cents(11,19));
   const alt=v.pick([true,false]);
   const altLine=alt?'A bus runs the same route for $2.':'There is no bus route \u2014 it is this ride or miss the shift.';
   return {
    q:`${person} needs to get to work. A rideshare costs ${price}. ${altLine} How should she sort the rideshare?`,
    choices: alt?[
     {label:`Want \u2014 the trip is a Need, but the ${price} rideshare is the premium version of it.`,ok:true},
     {label:'Need \u2014 getting to work is always a Need, whatever it costs.',ok:false,mis:'absolute-rules'},
     {label:'Savings \u2014 taking the bus saves money.',ok:false,mis:'not-spending-is-saving'},
     {label:'It depends \u2014 transportation can never be sorted.',ok:false,mis:'sort-dodge'}
    ]:[
     {label:'Need \u2014 without it there is no income.',ok:true},
     {label:`Want \u2014 ${price} is too much for a ride.`,ok:false,mis:'price-only-decision'},
     {label:'It depends \u2014 she could always walk.',ok:false,mis:'extreme-alternative'},
     {label:'Savings \u2014 she should save the fare instead.',ok:false,mis:'not-spending-is-saving'}
    ],
    hint:'Sort the specific choice in front of her \u2014 not \u201ctransportation\u201d in general.',
    good: alt?`Exactly: the Need is getting there; the ${price} rideshare on top of a $2 bus is a Want.`:`Exactly: no alternative, no income without it \u2014 a Need.`,
    bad: alt?`The trip is a Need, but she has a $2 way to cover it. The ${price} rideshare buys comfort, not function.`:`No bus, no other way there \u2014 and no shift without the trip. That is a Need.`,
    why: alt?`Alternatives rewrite the category: with a $2 bus covering the function, the ${price} rideshare is paying for comfort \u2014 a Want.`:`Consequences decide it: miss the ride, miss the shift, miss the pay. When there is no alternative, the cost is a Need.`};
  }},
 {t:'try',skill:'needs',tier:'stretch',
  gen:(v)=>{
   const person=v.person();
   const plainC=Math.round(v.cents(38,64)*100);
   const fancyC=plainC+Math.round(v.cents(28,72)*100);
   const deltaC=fancyC-plainC;
   const real=v.pick([true,false]);
   const why=real?'her warehouse job requires steel toes':'it is just a nicer color';
   const P=v.money(plainC/100), FP=v.money(fancyC/100), D=v.money(deltaC/100);
   return {
    q:`${person} needs work shoes: the plain pair is ${P}. The ${FP} pair is tougher \u2014 ${why}. How should she sort this?`,
    choices: real?[
     {label:`Buy the ${FP} pair \u2014 the whole thing is a Need, since the job requires it.`,ok:true},
     {label:`Buy the plain pair \u2014 the extra ${D} is always a Want.`,ok:false},
     {label:`Buy neither \u2014 make the old shoes last.`,ok:false,mis:'defer-forever'},
     {label:`Buy the ${FP} pair \u2014 expensive shoes are an investment, which is Savings.`,ok:false,mis:'investment-relabel'}
    ]:[
     {label:`Buy the plain pair \u2014 Need covered. The extra ${D} is a Want hiding inside a Need.`,ok:true},
     {label:`Buy the ${FP} pair \u2014 it is one purchase, so it is all a Need.`,ok:false,mis:'bundle-justifies'},
     {label:`Buy the ${FP} pair \u2014 a nicer color motivates her to work.`,ok:false,mis:'motivation-premium'},
     {label:`Buy neither \u2014 shoes are Wants until they fall apart.`,ok:false,mis:'absolute-rules'}
    ],
    hint:'Split the purchase: the Need part and the upgrade part are two different decisions.',
    good: real?`Right: the job requires the tougher shoe \u2014 the function makes the full ${FP} a Need.`:`Right: ${P} covers the Need; the ${D} upgrade buys looks, a Want.`,
    bad: real?`Check the function: steel toes are required for the job, so the ${FP} pair is not an upgrade \u2014 it is the Need itself.`:`Split it: ${P} does the job (Need); the extra ${D} buys color (Want). One receipt, two buckets.`,
    why: real?`The category follows the function: required steel toes make the ${FP} pair the Need \u2014 there is no \u201cupgrade\u201d here at all.`:`A Want can hide inside a Need purchase. Sorting the reasons \u2014 not the receipt \u2014 keeps the ${D} from sneaking through as a Need.`};
  }},
]}
};

/* ================= MODULE 2: Make Money Last ================= */
Object.assign(LESSON_CONTENT,{
'pacing-basics':{intro:'Turn a lump of money into a weekly pace you can actually follow.',steps:[
 {t:'teach',h:'Divide money by time',
  body:'<p>A month of money feels huge on day one and tiny on day twenty. <b>Pacing</b> fixes that:</p><p><b>Flexible money \u00f7 time remaining = your pace.</b></p><p>The pace is a <i>speed limit</i>, not a target. Staying under it means the money lasts. Use <i>flexible</i> money - after Needs and Savings are protected - never the full balance.</p>'},
 {t:'example',h:'Maya paces $400',story:'<p>Maya has $400 for 4 weeks. She protects $200 for needs and savings first, leaving $200 flexible.</p>',diagram:'<svg class="nws-diagram" viewBox="0 0 480 302" role="img" aria-labelledby="dgd-t"> <title id="dgd-t">Money left at the start of each week: 200, 150, 100, then 50 dollars. Each week can drop at most one 50-dollar pace.</title> <text x="240" y="32" text-anchor="middle" font-size="21" font-weight="700" fill="var(--ink)">$200 flexible &#247; 4 weeks</text> <rect x="20" y="70" width="88" height="170" fill="var(--brand)"/><text x="64" y="60" text-anchor="middle" font-size="19" font-weight="700" fill="var(--ink)">$200</text><rect x="132" y="112.5" width="88" height="127.5" fill="var(--brand)"/><text x="176" y="102.5" text-anchor="middle" font-size="19" font-weight="700" fill="var(--ink)">$150</text><rect x="244" y="155" width="88" height="85" fill="var(--brand)"/><text x="288" y="145" text-anchor="middle" font-size="19" font-weight="700" fill="var(--ink)">$100</text><rect x="356" y="197.5" width="88" height="42.5" fill="var(--brand)"/><text x="400" y="187.5" text-anchor="middle" font-size="19" font-weight="700" fill="var(--ink)">$50</text><line x1="120" y1="70" x2="120" y2="112.5" stroke="var(--accent)" stroke-width="3"/><path d="M112,112.5 L128,112.5 L120,122.5 Z" fill="var(--accent)"/><line x1="232" y1="112.5" x2="232" y2="155" stroke="var(--accent)" stroke-width="3"/><path d="M224,155 L240,155 L232,165 Z" fill="var(--accent)"/><line x1="344" y1="155" x2="344" y2="197.5" stroke="var(--accent)" stroke-width="3"/><path d="M336,197.5 L352,197.5 L344,207.5 Z" fill="var(--accent)"/><line x1="10" y1="240" x2="470" y2="240" stroke="var(--ink)" stroke-width="2"/> <text x="64" y="266" text-anchor="middle" font-size="18" fill="var(--ink)">Week 1</text> <text x="176" y="266" text-anchor="middle" font-size="18" fill="var(--ink)">Week 2</text> <text x="288" y="266" text-anchor="middle" font-size="18" fill="var(--ink)">Week 3</text> <text x="400" y="266" text-anchor="middle" font-size="18" fill="var(--ink)">Week 4</text> <text x="240" y="294" text-anchor="middle" font-size="18" fill="var(--ink)">Each drop is at most one $50 pace &#8212; the speed limit</text> </svg>',
  points:['Flexible money: $200','Time: 4 weeks','Pace: $200 \u00f7 4 = <b>$50/week</b>','Week 2, she has spent $45. She is under pace - the money will last.']},
 {t:'try',skill:'pacing-weekly',tier:'guided',
 gen:(v)=>{
  const person=v.person();
  const weeks=v.pick([2,3,4]);
  const paceC=v.int(2500,8000);
  const flexC=paceC*weeks;
  const needsC=v.int(60000,140000), savC=v.int(8000,25000);
  const payC=flexC+needsC+savC;
  const P=v.money(payC/100), N=v.money(needsC/100), S=v.money(savC/100);
  const PW=v.money(paceC/100), FW=v.money(flexC/100);
  return {
   q:`Payday: ${person} gets ${P}. Needs are ${N}, savings goal ${S}, and there are ${weeks} weeks to cover. What is the weekly pace?`,
   choices:[
    {label:`${PW}/week`,ok:true},
    {label:`${v.money(payC/weeks/100)}/week \u2014 pace the whole paycheck`,ok:false,mis:'paycheck-gross'},
    {label:`${FW} \u2014 that is the flexible total`,ok:false,mis:'no-pace-needed'},
    {label:`${v.money((payC-needsC)/weeks/100)}/week \u2014 needs protected, savings stays flexible`,ok:false,mis:'savings-doesnt-touch-spending'}],
   cue:'Protect Needs and Savings first \u2014 pace only the flexible money.',
   hint:'Flexible money \u00f7 weeks.',
   good:`Right: (${P} \u2212 ${N} \u2212 ${S}) = ${FW} \u00f7 ${weeks} = ${PW}/week.`,
   bad:`Flexible first: ${P} \u2212 ${N} \u2212 ${S} = ${FW}. Then ${FW} \u00f7 ${weeks} = ${PW}/week.`,
   why:`${v.money(payC/weeks/100)}/week would spend the rent and savings money. The pace only ever applies to flexible money: ${FW} \u00f7 ${weeks} = ${PW}/week.`};
 }},
 {t:'try',skill:'pacing-weekly',tier:'independent',
 gen:(v)=>{
  const person=v.person();
  const weeks=v.pick([3,4]);
  const paceC=v.int(4000,9000);
  const flexC=paceC*weeks;
  const k=v.int(600,2200);
  const spentC=paceC+k*(weeks-1);
  const remC=flexC-spentC;
  const left=weeks-1;
  const newC=remC/left;
  const F=v.money(flexC/100), P0=v.money(paceC/100), E=v.money(spentC/100);
  const REM=v.money(remC/100), NP=v.money(newC/100);
  return {
   q:`${person} paced ${F} over ${weeks} weeks \u2014 ${P0}/week. But week 1 spending hit ${E}. What is the new weekly pace for the remaining ${left} weeks?`,
   choices:[
    {label:`${NP}/week`,ok:true},
    {label:`${P0}/week \u2014 stick to the original plan`,ok:false,mis:'plan-never-changes'},
    {label:`${v.money(remC/weeks/100)}/week \u2014 spread what is left over all ${weeks} weeks`,ok:false,mis:'pace-math'},
    {label:`${REM} \u2014 that is what is left, no weekly math needed`,ok:false,mis:'no-pace-needed'}],
   hint:'Forget the original plan. Use what REMAINS.',
   good:`Right: ${F} \u2212 ${E} = ${REM} \u00f7 ${left} = ${NP}/week. You recalculated from what remains.`,
   bad:`Do not punish yourself or cling to the old plan: ${REM} \u00f7 ${left} weeks = ${NP}/week.`,
   why:`Overspending does not mean the plan failed \u2014 it means the plan updates. New pace = remaining money \u00f7 remaining time = ${NP}/week.`};
 }},
 {t:'try',skill:'pacing-weekly',tier:'independent',
 gen:(v)=>{
  const person=v.person();
  const weeks=v.pick([3,4]);
  const paceC=v.int(3000,7000);
  const flexC=paceC*weeks;
  const a=v.int(200,800), b=v.int(200,800);
  const s1C=paceC-a*(weeks-2), s2C=paceC-b*(weeks-2);
  const remC=flexC-s1C-s2C;
  const left=weeks-2;
  const newC=remC/left;
  const F=v.money(flexC/100), P0=v.money(paceC/100);
  const S1=v.money(s1C/100), S2=v.money(s2C/100);
  const REM=v.money(remC/100), NP=v.money(newC/100);
  const wkWord=left===1?'week':'weeks';
  return {
   q:`${person}\u2019s pace was ${P0}/week on ${F} for ${weeks} weeks. After 2 weeks, spending was ${S1} then ${S2}. What is the new pace for the remaining ${left} ${wkWord}?`,
   choices:[
    {label:`${NP}/week \u2014 the unspent money rolls into the new pace`,ok:true},
    {label:`${P0}/week \u2014 the pace never changes`,ok:false,mis:'plan-never-changes'},
    {label:`${REM} \u2014 spend what is left with no weekly limit`,ok:false,mis:'no-pace-needed'},
    {label:`${v.money(remC/weeks/100)}/week \u2014 divide by all ${weeks} weeks again`,ok:false,mis:'pace-math'}],
   hint:'Recalculate from what remains \u2014 in both directions.',
   good:`Right: ${F} \u2212 ${S1} \u2212 ${S2} = ${REM} \u00f7 ${left} = ${NP}/week.`,
   bad:`${F} \u2212 ${S1} \u2212 ${S2} = ${REM} remains. ${left} ${wkWord} left: ${NP}/week.`,
   why:`Pace recalculates from what remains \u2014 under-spending raises it, over-spending lowers it. The plan updates from reality, never from the original number.`};
 }},
 {t:'try',skill:'pacing-weekly',tier:'stretch',
 gen:(v)=>{
  const person=v.person();
  const daysLeft=v.pick([10,12,15,20]);
  const day=30-daysLeft;
  const paceC=v.int(900,2600);
  const flexC=paceC*daysLeft;
  const needsC=Math.round(v.cents(180,420)*100), savC=Math.round(v.cents(40,120)*100);
  const payC=flexC+needsC+savC;
  const P=v.money(payC/100), N=v.money(needsC/100), S=v.money(savC/100);
  const PD=v.money(paceC/100), FW=v.money(flexC/100);
  return {
   q:`It is the ${day}th of a 30-day month. ${person} was paid ${P}; needs were ${N}, savings ${S}. What is the daily pace for the rest of the month?`,
   choices:[
    {label:`${PD}/day`,ok:true},
    {label:`${v.money(payC/daysLeft/100)}/day \u2014 pace the whole paycheck`,ok:false,mis:'paycheck-gross'},
    {label:`${v.money(flexC/30/100)}/day \u2014 divide by the whole month`,ok:false,mis:'pace-math'},
    {label:`${FW} \u2014 that is the flexible total`,ok:false,mis:'no-pace-needed'}],
   hint:'Flexible money \u00f7 days LEFT.',
   good:`Right: (${P} \u2212 ${N} \u2212 ${S}) = ${FW} \u00f7 ${daysLeft} days left = ${PD}/day.`,
   bad:`Flexible first: ${FW}. Days remaining: ${daysLeft}. ${FW} \u00f7 ${daysLeft} = ${PD}/day.`,
   why:`Two traps in one: pacing the full paycheck spends protected money, and dividing by 30 pretends the days already gone are still ahead. ${PD}/day for ${daysLeft} days is the honest pace.`};
 }},
 {t:'tool',screen:'pacing-value',focus:'pacing',h:'Try the pacing calculator',body:'<p>Enter your own numbers and watch the pace compute - including what happens when you change the time left.</p>',cta:'Open the pacing calculator'}
]},
'safe-to-spend':{intro:'Balance is what exists. Safe to spend is what is left after money with a job.',steps:[
 {t:'teach',h:'Two different numbers',
  body:'<p><b>Balance</b> = everything in the account.<br><b>Safe to spend</b> = balance \u2212 future needs \u2212 protected savings.</p><p>Confusing the two is the #1 way people "mysteriously" run out of money. The balance includes money that already has a job.</p>',diagram:'<svg class="nws-diagram" viewBox="0 0 480 258" role="img" aria-labelledby="dgc-t"> <title id="dgc-t">A 400-dollar balance splits into 200 dollars safe to spend, 120 dollars future needs, and 80 dollars protected savings</title> <text x="10" y="30" font-size="19" font-weight="700" fill="var(--ink)">Balance: $400 &#8212; everything in the account</text> <rect x="10" y="46" width="460" height="58" fill="var(--panel-2)" stroke="var(--line)"/> <rect x="11" y="47" width="230" height="56" fill="var(--good)"/> <rect x="241" y="47" width="138" height="56" fill="var(--brand)"/> <rect x="379" y="47" width="90" height="56" fill="var(--mint)"/> <text x="126" y="82" text-anchor="middle" font-size="20" font-weight="700" fill="var(--panel)">$200</text> <text x="310" y="82" text-anchor="middle" font-size="20" font-weight="700" fill="var(--panel)">$120</text> <text x="424" y="82" text-anchor="middle" font-size="20" font-weight="700" fill="var(--ink)">$80</text> <text x="126" y="132" text-anchor="middle" font-size="18" font-weight="700" fill="var(--ink)">Safe to spend</text> <text x="126" y="156" text-anchor="middle" font-size="18" fill="var(--ink)">no job yet</text> <text x="310" y="132" text-anchor="middle" font-size="18" font-weight="700" fill="var(--ink)">Future needs</text> <text x="310" y="156" text-anchor="middle" font-size="18" fill="var(--ink)">comes out later</text> <text x="424" y="132" text-anchor="middle" font-size="18" font-weight="700" fill="var(--ink)">Savings</text> <text x="424" y="156" text-anchor="middle" font-size="18" fill="var(--ink)">set aside</text> <text x="240" y="206" text-anchor="middle" font-size="18" fill="var(--ink)">Balance $400 = $200 safe + $120 needs + $80 savings</text> <text x="240" y="234" text-anchor="middle" font-size="18" font-weight="700" fill="var(--brand-deep)">The $400 balance lies &#8212; only $200 is spendable</text> </svg>'},
 {t:'example',h:'Maya\u2019s two numbers',story:'<p>Maya\u2019s balance: <b>$400</b>.</p>',
  points:['Future transport this month: \u2212$120','Protected savings: \u2212$80','Safe to spend: <b>$200</b>','Over 4 weeks: $50/week safe. The $400 balance would have lied to her.']},
 {t:'try',skill:'safe-to-spend',tier:'guided',
 gen:(v)=>{
  const person=v.person();
  const bal=v.cents(300,520), need=v.cents(80,180), sav=v.cents(40,100);
  const bC=Math.round(bal*100), nC=Math.round(need*100), sC=Math.round(sav*100);
  const safeC=bC-nC-sC;
  const B=v.money(bal), N=v.money(need), S=v.money(sav), SF=v.money(safeC/100);
  const bill=v.pick(['transport','groceries','utilities']);
  return {
   q:`${person}\u2019s balance is ${B}. Still to come this month: ${N} for ${bill}, and ${S} is protected savings. What is safe to spend?`,
   choices:[
    {label:`${SF}`,ok:true},
    {label:`${B} \u2014 it is all in the account`,ok:false,mis:'available-means-balance'},
    {label:`${v.money((bC-nC)/100)} \u2014 savings is still ${person}\u2019s money`,ok:false,mis:'emergency-as-savings'},
    {label:`${v.money((bC-sC)/100)} \u2014 the ${bill} bill is not due yet`,ok:false,mis:'not-due-means-safe'}],
   cue:'Subtract everything that already has a job \u2014 future needs AND protected savings.',
   hint:'Balance \u2212 future needs \u2212 protected savings.',
   good:`Right: ${B} \u2212 ${N} \u2212 ${S} = ${SF}.`,
   bad:`Safe to spend = ${B} \u2212 ${N} (future need) \u2212 ${S} (savings) = ${SF}.`,
   why:`The balance includes money that already has a job. ${SF} is the real spending number.`};
 }},
 {t:'try',skill:'safe-to-spend',tier:'independent',
 gen:(v)=>{
  const person=v.person();
  const weeks=v.pick([2,4]);
  const wkC=v.int(3000,8000);
  const safeC=wkC*weeks;
  const n1C=Math.round(v.cents(60,160)*100), n2C=Math.round(v.cents(40,120)*100), sC=Math.round(v.cents(50,110)*100);
  const bC=safeC+n1C+n2C+sC;
  const bills=v.pick([['rent','utilities'],['transport','groceries'],['phone','internet']]);
  const B=v.money(bC/100), N1=v.money(n1C/100), N2=v.money(n2C/100), S=v.money(sC/100);
  const SF=v.money(safeC/100), WK=v.money(wkC/100);
  return {
   q:`Balance ${B}. Coming up: ${N1} ${bills[0]}, ${N2} ${bills[1]}, and ${S} protected savings. What is safe to spend per week over ${weeks} weeks?`,
   choices:[
    {label:`${WK}/week`,ok:true},
    {label:`${v.money(bC/weeks/100)}/week \u2014 the balance divided by ${weeks}`,ok:false,mis:'available-means-balance'},
    {label:`${SF} \u2014 that is the safe total`,ok:false,mis:'no-pace-needed'},
    {label:`${v.money((bC-sC)/weeks/100)}/week \u2014 savings can cover any shortfall`,ok:false,mis:'emergency-as-savings'}],
   hint:'Safe to spend first, then divide.',
   good:`Right: (${B} \u2212 ${N1} \u2212 ${N2} \u2212 ${S}) = ${SF} \u00f7 ${weeks} = ${WK}/week.`,
   bad:`First find safe to spend: ${SF}. Then ${SF} \u00f7 ${weeks} = ${WK}/week.`,
   why:`${v.money(bC/weeks/100)}/week spends the ${bills[0]}, ${bills[1]}, and savings money too. Safe to spend is ${SF}; per week that is ${WK}.`};
 }},
 {t:'try',skill:'safe-to-spend',tier:'independent',
 gen:(v)=>{
  const person=v.person();
  const pay=v.cents(900,1300), rent=v.cents(300,450), bills=v.cents(80,150), sav=v.cents(50,120);
  const pC=Math.round(pay*100), rC=Math.round(rent*100), lC=Math.round(bills*100), sC=Math.round(sav*100);
  const safeC=pC-rC-lC-sC;
  const P=v.money(pay), R=v.money(rent), L=v.money(bills), S=v.money(sav), SF=v.money(safeC/100);
  return {
   q:`${person} is paid ${P}. Before spending anything, ${R} rent, ${L} bills, and ${S} savings are spoken for. A friend says \u201cyou\u2019ve got ${P} to spend!\u201d What is actually safe to spend?`,
   choices:[
    {label:`${SF}`,ok:true},
    {label:`${P} \u2014 it is all in the account`,ok:false,mis:'available-means-balance'},
    {label:`${v.money((pC-rC-lC)/100)} \u2014 savings is still ${person}\u2019s money`,ok:false,mis:'emergency-as-savings'},
    {label:`${v.money((pC-rC-sC)/100)} \u2014 the bills are not due yet`,ok:false,mis:'not-due-means-safe'}],
   hint:'Subtract everything with a job \u2014 including the savings promise.',
   good:`Right: ${P} \u2212 ${R} \u2212 ${L} \u2212 ${S} = ${SF}.`,
   bad:`${P} \u2212 ${R} (rent) \u2212 ${L} (bills) \u2212 ${S} (savings) = ${SF}.`,
   why:`\u201cSavings is still my money\u201d is the sneakiest trap here: the moment savings is spent, it stops being savings. Safe to spend is ${SF}.`};
 }},
 {t:'try',skill:'safe-to-spend',tier:'stretch',
 gen:(v)=>{
  const person=v.person();
  const weeks=v.pick([4,6]);
  const wkC=v.int(2500,6000);
  const safeC=wkC*weeks;
  const n1C=Math.round(v.cents(280,520)*100), n2C=Math.round(v.cents(60,160)*100), sC=Math.round(v.cents(50,130)*100);
  const bC=Math.round(v.cents(150,400)*100);
  const pC=safeC+n1C+n2C+sC-bC;
  const B=v.money(bC/100), P=v.money(pC/100);
  const N1=v.money(n1C/100), N2=v.money(n2C/100), S=v.money(sC/100);
  const SF=v.money(safeC/100), WK=v.money(wkC/100);
  return {
   q:`${person} has ${B} now, and a ${P} paycheck lands in two weeks. Over the next ${weeks} weeks: ${N1} rent, ${N2} transport, ${S} protected savings. What is safe to spend per week?`,
   choices:[
    {label:`${WK}/week`,ok:true},
    {label:`${v.money((bC+pC)/weeks/100)}/week \u2014 everything coming in, divided up`,ok:false,mis:'balance-not-available'},
    {label:`${v.money(safeC/100)} \u2014 that is the safe total, no weekly math needed`,ok:false,mis:'no-pace-needed'},
    {label:`${v.money((bC+pC-n1C-n2C)/weeks/100)}/week \u2014 savings is a cushion, not a subtraction`,ok:false,mis:'emergency-as-savings'}],
   hint:'Total resources for the whole period \u2212 everything with a job, then \u00f7 weeks.',
   good:`Right: (${B} + ${P} \u2212 ${N1} \u2212 ${N2} \u2212 ${S}) = ${SF} \u00f7 ${weeks} = ${WK}/week.`,
   bad:`Add up the period\u2019s money, subtract every job: ${SF} safe. ${SF} \u00f7 ${weeks} = ${WK}/week.`,
   why:`Planning a whole period means counting the paycheck that lands inside it \u2014 but still subtracting every job first. ${WK}/week is the pace the full ${weeks} weeks can actually hold.`};
 }},
]},
'savings-purpose':{intro:'Savings is not a vault you never open. It is money with a future job.',steps:[
 {t:'teach',h:'Savings has a job description',
  body:'<p>"Savings" is vague, and vague money gets spent. Give it a job:</p><ul><li><b>Emergency money</b> - for surprises (car repair, medical).</li><li><b>Planned goal</b> - textbooks, a deposit, a trip.</li><li><b>Future need</b> - tuition due in 3 months.</li></ul><p>When the job arrives, <b>using the savings IS the plan working</b> - not a failure.</p>'},
 {t:'example',h:'Maya\u2019s textbooks',story:'<p>Maya saved $180 for textbooks all semester.</p>',
  points:['Saved: $180 (job: textbooks)','Books cost: $165','She spends the $165 from savings - the plan worked.','$15 stays saved for next time.']},
{t:'try',skill:'savings-purpose',tier:'guided',
  gen:(v)=>{
   const person=v.person();
   const goals=[['textbooks','books'],['a security deposit','the deposit'],['a laptop for classes','the laptop']];
   const g=v.pick(goals);
   const goal=g[0], the=g[1];
   const savedC=Math.round(v.cents(150,260)*100);
   const costC=savedC+v.int(-4000,4500);
   const arrived=v.pick([true,false]);
   const S=v.money(savedC/100), C=v.money(costC/100);
   const shortC=costC-savedC;
   const SH=v.money(shortC/100);
   const whyArrived=shortC<=0?`${C} of ${goal}, paid by the ${S} saved for exactly that.`:`${S} of the ${C} ${goal}, with ${SH} from flexible money.`;
   const whyText=!arrived?`Vague money gets spent; job-titled money waits. Raiding ${goal} savings for a sale rewrites the job description \u2014 and next month\u2019s self pays for it.`:`Using savings on its purpose is the plan working \u2014 ${whyArrived}`;
   return {
    q:`${person} saved ${S} for ${goal}. ${arrived?`It is time to buy \u2014 ${the} costs ${C}.`:`${the} is not due for months, but a flash sale tempts her to spend the ${S} on something fun now.`} What is the right move?`,
    choices: !arrived?[
     {label:`Leave it \u2014 the ${S} already has a job, and the job has not arrived yet.`,ok:true},
     {label:`Spend it \u2014 savings that sits still is wasted.`,ok:false,mis:'spend-the-fund'},
     {label:`Spend it \u2014 she can save it again later.`,ok:false,mis:'spend-the-fund'},
     {label:`Spend half \u2014 compromise keeps everyone happy.`,ok:false,mis:'spend-the-fund'}
    ]:shortC<=0?[
     {label:`Buy ${the} from savings \u2014 spending it on its purpose is the plan working.`,ok:true},
     {label:`Do not touch it \u2014 savings should never be spent.`,ok:false,mis:'emergency-as-savings'},
     {label:`Buy ${the} on a credit card and keep the ${S} saved.`,ok:false,mis:'credit-shield'},
     {label:`Buy ${the} \u2014 and feel guilty about touching savings.`,ok:false,mis:'guilt-is-budgeting'}
    ]:[
     {label:`Use the full ${S}, and cover the extra ${SH} from flexible money \u2014 the fund did its part.`,ok:true},
     {label:`Do not touch it \u2014 savings should never be spent.`,ok:false,mis:'emergency-as-savings'},
     {label:`Abandon the goal \u2014 the savings missed, so the plan failed.`,ok:false,mis:'miss-means-fail'},
     {label:`Borrow the ${SH} from her emergency fund \u2014 savings is savings.`,ok:false,mis:'fund-fungibility'}
    ],
    cue:`Match the money to its job description: what was the ${S} saved for, and has that job arrived?`,
    hint:'Savings is money with a future job. Has the job arrived?',
    good: !arrived?`Right: the job is ${goal}, months away. The money waits.`:(shortC<=0?`Right: ${C} for ${goal} \u2014 that is exactly what the ${S} was for.`:`Right: the ${S} covers most of it; ${SH} comes from this week\u2019s flexible money.`),
    bad: !arrived?`The ${S} has a job: ${goal}. A sale on something fun is a different job \u2014 the money stays put.`:(shortC<=0?`The money\u2019s job was ${goal}. Using it for ${the} is success, not failure.`:`${S} toward the ${C} ${goal}, then ${SH} from flexible money. The savings did its job; the gap is this week\u2019s problem.`),
    why: whyText};
  }},
 {t:'try',skill:'savings-purpose',tier:'independent',
  gen:(v)=>{
   const person=v.person();
   const fundC=Math.round(v.cents(180,340)*100);
   const repairC=fundC+v.int(-9000,9000);
   const covered=repairC<=fundC;
   const gapC=repairC-fundC;
   const F=v.money(fundC/100), R=v.money(repairC/100), G=v.money(gapC/100);
   const leftC=fundC-repairC;
   const L=v.money(leftC/100);
   return {
    q:`${person}\u2019s emergency fund holds ${F}. Her car needs a ${R} repair \u2014 no car, no shifts. What should the emergency money do?`,
    choices: covered?[
     {label:`Cover the repair \u2014 that is exactly its job. ${L} stays in the fund.`,ok:true},
     {label:`Put the repair on a credit card and keep the ${F} untouched.`,ok:false,mis:'credit-shield'},
     {label:`Pay it from this week\u2019s flexible money and keep the fund \u201cfor a real emergency.\u201d`,ok:false,mis:'emergency-as-savings'},
     {label:`Skip the repair \u2014 touching the fund means the savings failed.`,ok:false,mis:'fund-purity'}
    ]:[
     {label:`Empty the fund toward the repair and cover the extra ${G} from flexible money \u2014 the fund did its job.`,ok:true},
     {label:`Pay only ${F} and ignore the rest \u2014 the fund is the whole plan.`,ok:false,mis:'fund-is-plan'},
     {label:`Put the whole ${R} on a credit card to protect the ${F}.`,ok:false,mis:'credit-shield'},
     {label:`Skip the repair \u2014 the fund cannot cover it, so wait.`,ok:false,mis:'fund-is-plan'}
    ],
    hint:'Match the money to its job description: emergencies.',
    good: covered?`Right: ${R} from the fund, ${L} stays put. The plan worked.`:`Right: the full ${F} goes to the repair, ${G} from flexible money.`,
    bad: covered?`Emergency money has one job: emergencies. ${F} \u2212 ${R} = ${L} left in the fund.`:`The fund covers what it can: ${F} toward ${R}, and the ${G} gap comes from flexible money \u2014 not from skipping the repair.`,
    why: covered?`Purpose beats impulse: the repair is the emergency the fund was built for, and ${L} stays ready for the next one.`:`A fund that covers most of an emergency did not fail \u2014 it did most of its job. The ${G} gap is this week\u2019s problem, not a reason to leave the car broken.`};
  }},
 {t:'try',skill:'savings-purpose',tier:'independent',
  gen:(v)=>{
   const person=v.person();
   const goalC=50000;
   const curC=goalC+v.int(-12000,9000);
   const moveC=Math.round(v.cents(30,60)*100);
   const done=curC>=goalC;
   const CUR=v.money(curC/100), M=v.money(moveC/100);
   const next=v.pick(['her textbook fund','a trip she is planning','next semester\u2019s deposit']);
   return {
    q:`${person}\u2019s emergency fund goal is $500.00 \u2014 it currently holds ${CUR}. She auto-moves ${M}/month into it out of habit. Smart?`,
    choices: done?[
     {label:`Redirect the ${M} to ${next} \u2014 the fund did its job.`,ok:true},
     {label:`Keep feeding it \u2014 you can never have too much emergency money.`,ok:false,mis:'emergency-as-savings'},
     {label:`Spend the ${CUR} to celebrate hitting the goal.`,ok:false,mis:'goal-trophy-spend'},
     {label:`Move the whole ${CUR} into stocks \u2014 emergency money should grow.`,ok:false,mis:'emergency-invests'}
    ]:[
     {label:`Keep the ${M} flowing \u2014 the job is $500.00 and it is not done.`,ok:true},
     {label:`Stop contributing \u2014 ${CUR} is close enough to $500.00.`,ok:false,mis:'close-enough'},
     {label:`Spend the ${CUR} now and restart the fund later.`,ok:false,mis:'spend-the-fund'},
     {label:`Move the ${M} to ${next} \u2014 new goals matter more.`,ok:false,mis:'goal-swap'}
    ],
    hint:'What was the fund\u2019s job description \u2014 and is it finished?',
    good: done?`Right: $500.00 funded. The ${M} gets its next assignment: ${next}.`:`Right: the job is $500.00, the fund holds ${CUR}. Keep going.`,
    bad: done?`The job was \u201c$500.00 of emergency buffer.\u201d Done \u2014 reassign the ${M} to ${next}.`:`The job was \u201c$500.00 of emergency buffer.\u201d ${CUR} is not there yet \u2014 the ${M} keeps its job.`,
    why: done?`Endless emergency saving has an opportunity cost: that ${M} could be building ${next}. Fund the job, then reassign the worker.`:`A half-built buffer is not a buffer. Until the fund holds $500.00, the ${M} still works its original job.`};
  }},
 {t:'try',skill:'savings-purpose',tier:'stretch',
  gen:(v)=>{
   const person=v.person();
   const emC=Math.round(v.cents(220,380)*100);
   const txC=Math.round(v.cents(140,220)*100);
   const repairC=emC+v.int(-6000,6000);
   const flexC=Math.round(v.cents(60,140)*100);
   const concC=Math.round(v.cents(45,95)*100);
   const covers=repairC<=emC;
   const gapC=repairC-emC;
   const E=v.money(emC/100), T=v.money(txC/100), R=v.money(repairC/100), FL=v.money(flexC/100), CC=v.money(concC/100), G=v.money(gapC/100);
   return {
    q:`${person} has two savings buckets: ${E} emergency money and ${T} for textbooks due next month. Her car needs a ${R} repair (no car, no shifts), she has ${FL} flexible this week, and concert tickets cost ${CC}. What is the right move?`,
    choices: covers?[
     {label:`Repair from the emergency fund; textbooks untouched; concert only if it fits in ${FL}.`,ok:true},
     {label:`Repair from the textbook fund \u2014 savings is savings.`,ok:false,mis:'fund-fungibility'},
     {label:`Buy the concert first, then see what is left for the repair.`,ok:false},
     {label:`Put the repair on a credit card and keep both funds untouched.`,ok:false,mis:'emergency-as-savings'}
    ]:[
     {label:`Empty the emergency fund toward the repair, cover the extra ${G} from flexible money; textbooks untouched; concert waits.`,ok:true},
     {label:`Pull the ${G} gap from the textbook fund \u2014 it is all savings anyway.`,ok:false,mis:'fund-fungibility'},
     {label:`Buy the concert \u2014 the repair can wait until next month.`,ok:false,mis:'timing-dodge'},
     {label:`Skip the repair entirely \u2014 the fund cannot cover it.`,ok:false,mis:'fund-is-plan'}
    ],
    hint:'Each bucket has a job title. Which job matches the repair \u2014 and what does the fund not cover?',
    good: covers?`Right: emergency money \u2192 emergency. Textbooks keep their job; the concert is a Want judged against ${FL}.`:`Right: all ${E} to the repair, ${G} from flexible money. The textbook fund is not the repair\u2019s money.`,
    bad: covers?`Match jobs to money: the ${R} repair is the emergency fund\u2019s job. ${T} stays on textbooks; the ${CC} concert answers to ${FL} flexible.`:`The emergency fund covers what it can (${E} of ${R}); the ${G} gap comes from flexible money. Textbook money has a different job title.`,
    why: covers?`Buckets are promises with labels. The repair matches the emergency label \u2014 the textbook label does not stretch, and the concert never outranks either.`:`A short fund still does its job first: ${E} toward the repair, ${G} from flexible money. Raiding the textbook bucket just moves the emergency to next month.`};
  }},
]},
'savings-apy':{intro:'Money can grow while it waits.',steps:[
 {t:'teach',h:'Growth that earns its own growth',
  body:'<p>$100 saved at 5% becomes <b>$105</b> after a year. Leave it a second year: 5% of the <i>new</i> $105 is $5.25, so <b>$110.25</b>.</p><p>Year 2 did not grow the original $100. It grew $105 \u2014 last year\u2019s growth included. The growth earns growth.</p>',diagram:'<svg class="nws-diagram" viewBox="0 0 480 318" role="img" aria-labelledby="dge-t"> <title id="dge-t">Two growth lines over five years on 100 dollars: adding 5 dollars a year stays straight and ends at 125 dollars; 5 percent compounding curves up and ends at 127 dollars 63 cents</title> <line x1="58" y1="18" x2="96" y2="18" stroke="var(--brand)" stroke-width="4"/> <text x="104" y="24" font-size="18" fill="var(--ink)">compounding: 5% of the new total</text> <line x1="58" y1="46" x2="96" y2="46" stroke="var(--muted)" stroke-width="3" stroke-dasharray="9 7"/> <text x="104" y="52" font-size="18" fill="var(--ink)">just adding $5 a year</text> <line x1="58" y1="262" x2="418" y2="262" stroke="var(--line)"/><line x1="58" y1="195.3" x2="418" y2="195.3" stroke="var(--line)"/><line x1="58" y1="128.7" x2="418" y2="128.7" stroke="var(--line)"/><line x1="58" y1="62" x2="418" y2="62" stroke="var(--line)"/><text x="50" y="268" text-anchor="end" font-size="18" fill="var(--muted)">$100</text><text x="50" y="201.3" text-anchor="end" font-size="18" fill="var(--muted)">$110</text><text x="50" y="134.7" text-anchor="end" font-size="18" fill="var(--muted)">$120</text><text x="50" y="68" text-anchor="end" font-size="18" fill="var(--muted)">$130</text><path d="M58,262 L130,228.7 L202,195.3 L274,162 L346,128.7 L418,95.3" fill="none" stroke="var(--muted)" stroke-width="3" stroke-dasharray="9 7"/><path d="M58,262 L130,228.7 L202,193.7 L274,156.9 L346,118.3 L418,77.9" fill="none" stroke="var(--brand)" stroke-width="4"/><circle cx="418" cy="95.3" r="5" fill="var(--muted)"/> <circle cx="418" cy="77.9" r="5" fill="var(--brand)"/> <text x="58" y="288" text-anchor="middle" font-size="18" fill="var(--muted)">0</text><text x="130" y="288" text-anchor="middle" font-size="18" fill="var(--muted)">1</text><text x="202" y="288" text-anchor="middle" font-size="18" fill="var(--muted)">2</text><text x="274" y="288" text-anchor="middle" font-size="18" fill="var(--muted)">3</text><text x="346" y="288" text-anchor="middle" font-size="18" fill="var(--muted)">4</text><text x="418" y="288" text-anchor="middle" font-size="18" fill="var(--muted)">5</text><text x="238" y="312" text-anchor="middle" font-size="18" fill="var(--ink)">The gap between the lines = growth earning growth</text> </svg>'},
 {t:'teach',h:'Compounding, APY, and the rule of 72',
  body:'<ul><li><b>Compounding</b> = growth earning growth: every period applies to the new total.</li><li><b>APY</b> includes compounding; <b>APR</b> does not. Same digits, different meaning \u2014 compare APY to APY.</li><li><b>Rule of 72:</b> 72 \u00f7 rate \u2248 years to double. At 8%, money doubles in about 9 years.</li></ul>'},
 {t:'example',h:'Maya saves $200 at 5% APY',story:'<p>Maya parks <b>$200</b> in a 5% APY account for 2 years and does not touch it.</p>',
  points:['Year 1: $200 + 5% = <b>$210.00</b>','Year 2: 5% of the new $210 = $10.50 \u2192 <b>$220.50</b>','Adding without compounding would give $220. The extra $0.50 is growth earning growth.','Fifty cents is small. Over decades, it is the whole game.']},
 {t:'try',skill:'compounding',tier:'guided',
  gen:(v)=>{
   const P=v.cents(150,300);
   const y1=v.money(P*1.05);
   const y2ok=v.money(P*1.1025);
   const added=v.money(P*1.10);
   const rateDollars=v.money(P*1.05+5);
   return {
    q:`${v.person()} saves ${v.money(P)} at 5% APY for 2 years, untouched. About what is it worth at the end?`,
    choices:[
     {label:y2ok,ok:true},
     {label:added,ok:false,mis:'added-not-compounded'},
     {label:y1,ok:false},
     {label:rateDollars,ok:false}],
    cue:`Year 1 grows the money to ${y1}. Year 2 grows THAT number \u2014 including year 1\u2019s growth.`,
    hint:'Each year applies 5% to the new total, not just the starting amount.',
    good:`Right: ${y1} after year 1, then 5% of ${y1} gives ${y2ok}.`,
    bad:`Year 1: ${v.money(P)} \u00d7 1.05 = ${y1}. Year 2: ${y1} \u00d7 1.05 = ${y2ok} \u2014 growth on growth.`,
    why:`${added} just adds 5% twice to the start. Compounding applies year 2\u2019s 5% to ${y1}, the grown total \u2014 that is where ${y2ok} comes from.`};
  }},
 {t:'try',skill:'apy-vs-apr',tier:'independent',
  gen:(v)=>{
   const rate=v.pick([3,4,5,6]);
   const person=v.person();
   return {
    q:`${person} compares two savings accounts: one advertises ${rate}% APR, the other ${rate}% APY. After a year of no deposits and no withdrawals, which holds more?`,
    choices:[
     {label:`The ${rate}% APY one \u2014 APY already counts compounding`,ok:true},
     {label:`The ${rate}% APR one \u2014 APR always earns more`,ok:false,mis:'apy-apr-confusion'},
     {label:`They hold exactly the same \u2014 ${rate}% is ${rate}%`,ok:false,mis:'apy-apr-confusion'},
     {label:`Neither \u2014 the letters are just marketing`,ok:false,mis:'apy-apr-confusion'}],
    hint:'One of those numbers already includes growth-on-growth. Which one?',
    good:`Right. APY counts compounding; APR does not \u2014 so ${rate}% APY beats ${rate}% APR.`,
    bad:`APY = the yearly result WITH compounding. APR = the rate WITHOUT it. Same digits, different meaning.`,
    why:'This is the whole APY/APR split: APY tells you what a year actually yields. Comparing the digits without the letters is how the confusion wins.'};
  }},
 {t:'try',skill:'rule-of-72',tier:'independent',
  gen:(v)=>{
   const rate=v.pick([6,8,9,12]);
   const yrs=72/rate;
   return {
    q:`Money left alone at about ${rate}% a year: roughly how long until it doubles? (Rule of 72: 72 \u00f7 rate.)`,
    choices:[
     {label:`About ${yrs} years`,ok:true},
     {label:`About ${72*rate} years`,ok:false,mis:'rule-72-flip'},
     {label:`About ${rate} years`,ok:false},
     {label:`About ${72+rate} years`,ok:false}],
    hint:'The rule is a division: 72 \u00f7 the rate.',
    good:`Right: 72 \u00f7 ${rate} = about ${yrs} years.`,
    bad:`Divide, do not multiply or add: 72 \u00f7 ${rate} = ${yrs}. About ${yrs} years to double.`,
    why:`The rule of 72 turns any steady rate into a doubling time with one division. A higher rate \u2014 like ${rate}% \u2014 means fewer years: about ${yrs}.`};
  }},
 {t:'try',skill:'apy-vs-apr',tier:'stretch',
  gen:(v)=>{
   const P=v.cents(800,1500);
   const rApy=5, rApr=5.1, yrs=2;
   const AC=Math.round(P*Math.pow(1+rApy/100,yrs)*100)/100;
   const BC=Math.round(P*(1+yrs*rApr/100)*100)/100;
   const diffC=Math.round((AC-BC)*100)/100;
   const A=v.money(AC), B=v.money(BC), diff=v.money(diffC);
   return {
    q:`${v.person()} has ${v.money(P)} to park for ${yrs} years. Account A pays ${rApy}% APY (compounds). Account B pays ${rApr}% APR (no compounding). Which ends up bigger \u2014 and by how much?`,
    choices:[
     {label:`Account A \u2014 ${A} beats ${B} by ${diff}`,ok:true},
     {label:`Account B \u2014 ${rApr}% is the bigger number`,ok:false,mis:'apy-apr-confusion'},
     {label:`They tie \u2014 ${rApy}% vs ${rApr}% is basically the same`,ok:false,mis:'apy-apr-confusion'},
     {label:`Account B \u2014 APY is just a marketing word`,ok:false,mis:'apy-apr-confusion'}],
    hint:'Run both for the full 2 years: A compounds, B just adds. Then compare.',
    good:`Right: A = ${v.money(P)} \u00d7 1.05 \u00d7 1.05 = ${A}; B = ${v.money(P)} + 2 years of 5.1% = ${B}. Compounding wins by ${diff}.`,
    bad:`A compounds: ${v.money(P)} \u00d7 1.05 \u00d7 1.05 = ${A}. B adds: ${v.money(P)} \u00d7 (1 + 0.102) = ${B}. A wins by ${diff}.`,
    why:`The bigger digit lost. ${rApr}% APR adds the same slice twice; ${rApy}% APY grows the growth. Over 2 years on ${v.money(P)}, compounding beats the bigger number by ${diff}.`};
  }},
 {t:'tool',screen:'save',h:'Watch growth compound',body:'<p>Open the savings tools, set a goal, and project what steady saving plus compounding does to it year by year.</p>',cta:'Open savings tools'}
]},
'irregular-income':{intro:'Do not budget money that has not arrived yet.',steps:[
 {t:'teach',h:'Irregular income needs a stricter rule',
  body:'<p>When shifts vary, the paycheck is a <i>guess</i> until it lands. The rule:</p><ol><li><b>Protect required costs first</b> - what MUST be paid before the next known income.</li><li><b>Hold a buffer</b> - a cushion for the gap.</li><li><b>Only then</b> treat the rest as flexible.</li></ol><p>Never spend "expected" shifts. Budget the cash in hand.</p>'},
 {t:'example',h:'Maya\u2019s slow weeks',story:'<p>Two slow weeks ahead. Maya has $300 cash, $170 in required costs, and no guaranteed shifts.</p>',
  points:['Cash in hand: $300','Required costs: \u2212$170','Buffer for the gap: \u2212$50','Flexible: <b>$80</b>. Small - and honest.']},
{t:'try',skill:'irregular-income',tier:'guided',
  gen:(v)=>{
   const person=v.person();
   const cashC=Math.round(v.cents(320,520)*100);
   const reqC=Math.round(v.cents(130,230)*100);
   const bufC=Math.round(v.cents(30,60)*100);
   const flexC=cashC-reqC-bufC;
   const C=v.money(cashC/100), R=v.money(reqC/100), B=v.money(bufC/100), F=v.money(flexC/100);
   const noBuf=v.money((cashC-reqC)/100);
   const plusBuf=v.money((cashC-reqC+bufC)/100);
   return {
    q:`${person} has ${C} cash in hand, ${R} in required costs before any more known income, and no guaranteed shifts. The routine says: protect required costs, hold a ${B} buffer. What is honestly flexible?`,
    choices:[
     {label:F,ok:true},
     {label:`${C} \u2014 it is all in hand, so it is all flexible.`,ok:false,mis:'protect-first'},
     {label:`${noBuf} \u2014 buffers are only for people with steady jobs.`,ok:false,mis:'buffers-are-for-steady'},
     {label:`${plusBuf} \u2014 add the buffer for extra safety.`,ok:false}],
    cue:`Subtract in order: required costs first, then the buffer. What is left is the answer.`,
    hint:'Protect, buffer, then see what is left.',
    good:`Right: ${C} \u2212 ${R} \u2212 ${B} = ${F}.`,
    bad:`In order: ${C} \u2212 ${R} (required) = ${noBuf}; minus the ${B} buffer = ${F} flexible.`,
    why:`With irregular income, required costs and a buffer come off the top. Only ${F} is truly flexible \u2014 the rest already has a job or a reason.`};
  }},
 {t:'try',skill:'irregular-income',tier:'independent',
  gen:(v)=>{
   const person=v.person();
   const m1C=Math.round(v.cents(500,900)*100);
   const m2C=Math.round(v.cents(900,1400)*100);
   const loC=Math.min(m1C,m2C), hiC=Math.max(m1C,m2C);
   const subC=Math.round(v.cents(40,110)*100);
   const reqLowC=Math.round(loC*v.pick([0.78,0.85,0.92]));
   const affords=subC<=loC-reqLowC;
   const LO=v.money(loC/100), HI=v.money(hiC/100), SUB=v.money(subC/100), ANN=v.money(subC*12/100);
   const REQ=v.money(reqLowC/100), AVG=v.money((m1C+m2C)/2/100), LEFT=v.money((loC-reqLowC)/100);
   return {
    q:`${person}\u2019s gig pay was ${HI} last month and ${LO} the month before. In a ${LO} month, required costs eat ${REQ}. She is eyeing a ${SUB}/month subscription. How should she decide?`,
    choices: affords?[
     {label:`Take it \u2014 even the ${LO} month covers required costs plus ${SUB}.`,ok:true},
     {label:`Take it \u2014 ${HI} is her real earning power.`,ok:false,mis:'optimistic-plan'},
     {label:`Take it \u2014 ${SUB}/month is small enough to ignore.`,ok:false,mis:'subscription-blindness'},
     {label:`Average the months: ${AVG}/month, so it is fine.`,ok:false,mis:'average-is-plan'}
    ]:[
     {label:`Skip it \u2014 the ${LO} month cannot carry required costs plus ${SUB}.`,ok:true},
     {label:`Take it \u2014 the ${HI} month proves she can afford it.`,ok:false,mis:'optimistic-plan'},
     {label:`Take it \u2014 ${SUB}/month is barely anything.`,ok:false,mis:'subscription-blindness'},
     {label:`Average the months and decide from the middle.`,ok:false,mis:'average-is-plan'}
    ],
    hint:'Which month has to cover the bill when work dries up?',
    good: affords?`Right: ${LO} \u2212 ${REQ} leaves room for ${SUB}. The low month carries it.`:`Right: in a ${LO} month, ${REQ} of required costs leaves no room for ${SUB}.`,
    bad: affords?`Test the subscription against the worst normal month: ${LO} \u2212 ${REQ} required still covers ${SUB}. It survives the dry spell.`:`Test against the worst normal month, not the average: ${LO} \u2212 ${REQ} required = ${LEFT} left, short of ${SUB}.`,
    why: affords?`Recurring costs must survive the worst normal month, not the best one \u2014 and ${SUB}/month is really ${ANN}/year. Here the ${LO} month carries it, so it is a clean yes.`:`Averages lie when income swings: the ${LO} month is the one that must pay the bill. And ${SUB}/month is ${ANN}/year \u2014 small monthly numbers hide big yearly ones.`};
  }},
 {t:'try',skill:'irregular-income',tier:'independent',
  gen:(v)=>{
   const person=v.person();
   const cashC=Math.round(v.cents(300,480)*100);
   const reqC=Math.round(v.cents(140,220)*100);
   const bufC=Math.round(v.cents(30,60)*100);
   const flexC=cashC-reqC-bufC;
   const shiftC=Math.round(v.cents(60,120)*100);
   const wantC=flexC+v.int(-1500,3500);
   const want=v.pick(['concert tickets','a new jacket','a weekend trip with friends']);
   const fits=wantC<=flexC;
   const C=v.money(cashC/100), R=v.money(reqC/100), B=v.money(bufC/100), F=v.money(flexC/100), W=v.money(wantC/100), SH=v.money(shiftC/100);
   return {
    q:`${person} has ${C} cash, ${R} in required costs, and holds a ${B} buffer. A friend says \u201cyou will probably pick up a Saturday shift worth ${SH}.\u201d ${want} costs ${W}. Can she afford it?`,
    choices: fits?[
     {label:`Yes \u2014 ${F} is honestly flexible, and ${W} fits. The maybe-shift changes nothing.`,ok:true},
     {label:`Yes \u2014 and the ${SH} shift means she can spend even more.`,ok:false,mis:'pending-is-cash'},
     {label:`No \u2014 never spend anything when income is irregular.`,ok:false,mis:'absolute-rules'},
     {label:`Yes \u2014 count the ${SH} shift and buy the ${W} ${want} plus extra.`,ok:false,mis:'pending-is-cash'}
    ]:[
     {label:`No \u2014 only ${F} is flexible; ${W} does not fit, and the shift has not happened.`,ok:true},
     {label:`Yes \u2014 the ${SH} Saturday shift covers the gap.`,ok:false,mis:'pending-is-cash'},
     {label:`No \u2014 irregular earners should never buy ${want}.`,ok:false,mis:'absolute-rules'},
     {label:`Spend the ${SH} the second the shift is confirmed \u2014 then it counts.`,ok:false,mis:'pending-is-cash'}
    ],
    hint:'What is she counting that is not in her hand?',
    good: fits?`Right: ${F} flexible covers ${W}. The probably-shift is a hope, not income.`:`Right: ${W} is more than the ${F} flexible, and a probably-shift is not money.`,
    bad: fits?`Budget cash in hand: ${C} \u2212 ${R} \u2212 ${B} = ${F}, which covers ${W}. The shift is unworked \u2014 it counts for nothing.`:`Budget cash in hand: ${C} \u2212 ${R} \u2212 ${B} = ${F}, short of ${W}. \u201cProbably\u201d is not a paycheck.`,
    why:`\u201cYou will pick up shifts\u201d is a hope, not a paycheck. The rule: budget cash in hand, protect required costs, hold a buffer \u2014 then judge the Want against ${F}, not against Saturday.`};
  }},
 {t:'try',skill:'irregular-income',tier:'stretch',
  gen:(v)=>{
   const person=v.person();
   const cashC=Math.round(v.cents(420,560)*100);
   const reqC=Math.round(v.cents(200,290)*100);
   const bufC=Math.round(v.cents(40,70)*100);
   const flexC=cashC-reqC-bufC;
   const pendC=Math.round(v.cents(120,220)*100);
   const wantC=flexC+v.int(-4000,4000);
   const want=v.pick(['new headphones','a weekend trip','concert tickets']);
   const fits=wantC<=flexC;
   const C=v.money(cashC/100), R=v.money(reqC/100), B=v.money(bufC/100), F=v.money(flexC/100), W=v.money(wantC/100), PD=v.money(pendC/100);
   return {
    q:`Big week: ${person} earned ${C} from gigs. Required costs before the next known income: ${R}. A gig app shows ${PD} pending (arrives next week). She feels rich and wants ${want} (${W}). What is the move?`,
    choices: fits?[
     {label:`Protect the ${R}, hold the buffer, and buy the ${want} \u2014 ${F} flexible covers ${W}. The pending ${PD} stays out of it.`,ok:true},
     {label:`Spend freely \u2014 ${C} plus the ${PD} pending means she is rich this week.`,ok:false,mis:'pending-is-cash'},
     {label:`Buy the ${want} from the pending ${PD} \u2014 it is basically here.`,ok:false,mis:'pending-is-cash'},
     {label:`Save all ${C} \u2014 great weeks should be saved entirely.`,ok:false,mis:'save-everything'}
    ]:[
     {label:`Protect the ${R}, hold the buffer \u2014 only ${F} is flexible, so the ${W} ${want} waits. The pending ${PD} is not money yet.`,ok:true},
     {label:`Buy it \u2014 ${C} cash plus ${PD} pending easily covers ${W}.`,ok:false,mis:'pending-is-cash'},
     {label:`Buy it from the pending ${PD} and keep the cash safe.`,ok:false,mis:'spend-pending-save-cash'},
     {label:`Lend a friend $50 \u2014 great weeks are for sharing.`,ok:false,mis:'great-week-splurge'}
    ],
    hint:'Feeling rich is a feeling. Which numbers are actually in her hand?',
    good: fits?`Right: the routine does not take weeks off \u2014 but ${F} flexible honestly covers ${W}.`:`Right: ${F} flexible is short of ${W}, and pending money is not money.`,
    bad: fits?`${C} \u2212 ${R} \u2212 ${B} buffer = ${F}. ${W} fits \u2014 and the ${PD} pending never enters the math.`:`${C} \u2212 ${R} \u2212 ${B} buffer = ${F}, short of ${W}. Pending is a promise, not cash.`,
    why:`\u201cFeeling rich\u201d after one good week is how irregular earners go broke: the ${R} of required costs did not get the memo, and next week\u2019s ${PD} cannot be spent today.`};
  }},
 {t:'tool',screen:'pacing-value',focus:'irregular',h:'Try the irregular-income calculator',body:'<p>Plug in cash on hand, required costs, and a buffer - see what is honestly flexible.</p>',cta:'Open the calculator'}
]},
'semester-plan':{intro:'Lump sums lie. Break them into periods.',steps:[
 {t:'teach',h:'Big money, long time',
  body:'<p>A semester refund, a tax refund, a bonus - lump sums <i>feel</i> huge on day one. The fix is the same pace math, stretched out:</p><p><b>(Lump sum \u2212 needs \u2212 savings) \u00f7 number of periods = pace per period.</b></p><p>A $3,200 semester refund is not $3,200 of spending money. It is 16 weeks of paced money.</p>'},
 {t:'example',h:'Maya\u2019s semester refund',story:'<p>$3,200 refund lands in August. Semester is 16 weeks.</p>',
  points:['Semester needs: \u2212$1,600','Savings goal: \u2212$400','Flexible: $1,200','Pace: $1,200 \u00f7 16 = <b>$75/week</b> for the whole semester.']},
 {t:'try',skill:'budget-tradeoff',tier:'guided',
 gen:(v)=>{
  const person=v.person();
  const weeks=v.pick([12,16]);
  const paceC=v.int(5000,10000);
  const flexC=paceC*weeks;
  const needsC=Math.round(v.cents(1200,2200)*100), savC=Math.round(v.cents(200,600)*100);
  const lumpC=flexC+needsC+savC;
  const src=v.pick(['semester refund','tax refund','signing bonus']);
  const L=v.money(lumpC/100), N=v.money(needsC/100), S=v.money(savC/100);
  const PW=v.money(paceC/100), FW=v.money(flexC/100);
  return {
   q:`A ${L} ${src} lands for ${person}. Semester needs: ${N}. Savings goal: ${S}. The semester is ${weeks} weeks. What is the weekly pace?`,
   choices:[
    {label:`${PW}/week`,ok:true},
    {label:`${v.money(lumpC/weeks/100)}/week \u2014 pace the whole lump sum`,ok:false,mis:'protect-first'},
    {label:`${FW} \u2014 that is the flexible total`,ok:false,mis:'no-pace-needed'},
    {label:`${v.money((lumpC-needsC)/weeks/100)}/week \u2014 needs protected, savings stays flexible`,ok:false,mis:'savings-doesnt-touch-spending'}],
   cue:'Protect needs and savings first \u2014 pace only what is flexible.',
   hint:'(Lump sum \u2212 needs \u2212 savings) \u00f7 weeks.',
   good:`Right: (${L} \u2212 ${N} \u2212 ${S}) = ${FW} \u00f7 ${weeks} = ${PW}/week.`,
   bad:`Protect first: ${L} \u2212 ${N} \u2212 ${S} = ${FW} flexible. ${FW} \u00f7 ${weeks} = ${PW}/week.`,
   why:`${v.money(lumpC/weeks/100)}/week would burn through the needs money by mid-semester. ${PW}/week lasts all ${weeks} weeks.`};
 }},
 {t:'try',skill:'budget-tradeoff',tier:'independent',
 gen:(v)=>{
  const person=v.person();
  const weeks=v.pick([15,16]);
  const paceC=v.int(5000,9000);
  const flexC=paceC*weeks;
  const trueMonthlyC=flexC*4.33/weeks;
  let mC=Math.ceil(trueMonthlyC/10000)*10000;
  if(mC<=trueMonthlyC) mC+=10000;
  const months=weeks/4.33;
  const totalC=mC*months;
  const overC=totalC-flexC;
  const M=v.money(mC/100), TOT=v.money(totalC/100), OVER=v.money(overC/100);
  const PW=v.money(paceC/100), FW=v.money(flexC/100);
  const monthWord=Math.round(months);
  return {
   q:`${person}\u2019s refund leaves ${FW} flexible over ${weeks} weeks \u2014 a ${PW}/week pace. A friend says \u201c${M}/month is fine, monthly math is easier.\u201d What is wrong?`,
   choices:[
    {label:`${weeks} weeks is not ${monthWord} months \u2014 ${M}/month spends ${TOT}, ${OVER} over budget`,ok:true},
    {label:`Nothing \u2014 monthly math is simpler and close enough`,ok:false,mis:'close-enough-math'},
    {label:`${M}/month is too low \u2014 ${person} can afford more`,ok:false,mis:'afford-more'},
    {label:`Weekly pacing does not apply to lump sums`,ok:false,mis:'pace-doesnt-apply'}],
   hint:'How many weeks are in the average month?',
   good:`Right: ${PW}/week \u00d7 4.33 is about ${v.money(paceC*4.33/100)}/month, not ${M}.`,
   bad:`A month averages 4.33 weeks. ${M}/month over ${months.toFixed(1)} months = ${TOT} \u2014 ${OVER} over the ${FW} plan.`,
   why:`\u201cMonthly math is easier\u201d quietly adds phantom weeks: ${weeks} weeks is ${months.toFixed(1)} months, not ${monthWord}. ${M}/month spends ${TOT} of a ${FW} plan. Pace in weeks when the money must last weeks.`};
 }},
 {t:'try',skill:'budget-tradeoff',tier:'independent',
 gen:(v)=>{
  const person=v.person();
  const weeks=v.pick([12,16]);
  const paceC=v.int(6000,11000);
  const flexC=paceC*weeks;
  const needsC=Math.round(v.cents(1200,2200)*100), savC=Math.round(v.cents(200,500)*100);
  const lumpC=flexC+needsC+savC;
  const cut=v.int(500,2000);
  const newC=paceC-cut;
  const sav2C=savC+cut*weeks;
  const L=v.money(lumpC/100), N=v.money(needsC/100), S=v.money(savC/100), S2=v.money(sav2C/100);
  const PW=v.money(paceC/100), NPW=v.money(newC/100);
  const F2=v.money((lumpC-needsC-sav2C)/100);
  return {
   q:`${person}\u2019s ${L} refund: ${N} needs, ${S} savings, ${weeks} weeks \u2192 ${PW}/week. ${person} bumps the savings goal to ${S2}. What is the new weekly pace?`,
   choices:[
    {label:`${NPW}/week`,ok:true},
    {label:`${PW}/week \u2014 saving more does not change spending`,ok:false,mis:'savings-doesnt-touch-spending'},
    {label:`${F2} \u2014 that is the new flexible total`,ok:false,mis:'no-pace-needed'},
    {label:`${v.money((lumpC-sav2C)/weeks/100)}/week \u2014 needs can flex too`,ok:false,mis:'needs-are-flexible'}],
   hint:'Savings comes from the same flexible pool \u2014 redo the pace math.',
   good:`Right: ${v.money(cut*weeks/100)} more to savings means ${v.money(cut/100)}/week less to spend: ${NPW}/week.`,
   bad:`New flexible: ${L} \u2212 ${N} \u2212 ${S2} = ${F2}. ${F2} \u00f7 ${weeks} = ${NPW}/week.`,
   why:`Every extra savings dollar is a spent-later dollar, not a free one: raising savings by ${v.money(cut*weeks/100)} cuts the pace by ${v.money(cut/100)}/week. That is the tradeoff.`};
 }},
 {t:'try',skill:'budget-tradeoff',tier:'stretch',
 gen:(v)=>{
  const person=v.person();
  const weeks=v.pick([12,16]);
  const baseC=v.int(4000,9000);
  const flexC=baseC*weeks;
  const needsC=Math.round(v.cents(1200,2200)*100), savC=Math.round(v.cents(200,600)*100);
  const lumpC=flexC+needsC+savC;
  const jobC=v.int(1500,5000);
  const totalC=baseC+jobC;
  const src=v.pick(['semester refund','tax refund']);
  const job=v.pick(['campus job','weekend gig','tutoring gig']);
  const L=v.money(lumpC/100), N=v.money(needsC/100), S=v.money(savC/100);
  const J=v.money(jobC/100), TW=v.money(totalC/100), BW=v.money(baseC/100);
  return {
   q:`${person} gets a ${L} ${src} for a ${weeks}-week semester: ${N} needs, ${S} savings. ${person} also earns ${J}/week from a ${job}. What is the total weekly spending pace?`,
   choices:[
    {label:`${TW}/week`,ok:true},
    {label:`${BW}/week \u2014 the job money is extra, not pace money`,ok:false,mis:'job-money-extra'},
    {label:`${v.money((lumpC+jobC-needsC-savC)/weeks/100)}/week \u2014 add one week of pay to the lump sum`,ok:false,mis:'add-week-to-lump'},
    {label:`${v.money(lumpC/weeks/100)}/week, plus the ${J} whenever \u2014 keep them separate`,ok:false,mis:'keep-separate'}],
   hint:'Pace the lump sum first, then add the weekly income on top.',
   good:`Right: ${BW}/week from the refund + ${J}/week from the ${job} = ${TW}/week.`,
   bad:`Refund pace: (${L} \u2212 ${N} \u2212 ${S}) \u00f7 ${weeks} = ${BW}/week. Plus ${J}/week of steady income = ${TW}/week.`,
   why:`Two income shapes, one pace: the lump sum gets divided by time, the weekly pay just joins it. ${TW}/week holds for all ${weeks} weeks.`};
 }},
 {t:'tool',screen:'plan',h:'Try the semester planner',body:'<p>Map a lump sum across a whole semester and watch the weekly pace appear.</p>',cta:'Open the planner'}
]}
});

/* ================= MODULE 3: Spend Smart ================= */
Object.assign(LESSON_CONTENT,{
'sales-decisions':{intro:'A discount is not savings if it causes a purchase you would not make.',steps:[
 {t:'teach',h:'The "was I going to buy it anyway" test',
  body:'<p>Sales are designed to make spending feel like saving. Cut through it with one question:</p><p><b>"Was I already going to buy this?"</b></p><ul><li><b>Yes</b> \u2192 the discount is real savings. Take it.</li><li><b>No</b> \u2192 you did not save anything. You spent money you were not going to spend.</li></ul><p>"50% off" on something you did not want is not a deal. It is 50% off <i>still spending</i>.</p>'},
 {t:'example',h:'Maya faces two sales',story:'<p>Sale 1: Maya needs shampoo ($8). It is buy-one-get-one 50% off. She buys two for $12 - she will use both.</p><p>Sale 2: $40 shoes, 50% off ($20). She did not need shoes.</p>',
  points:['Sale 1: needed it anyway \u2192 real savings of $4.','Sale 2: did not need them \u2192 she "saved" $20 by spending $20.','Same 50% off. Opposite results. The test tells them apart.']},
 {t:'try',skill:'budget-tradeoff',tier:'guided',
 gen:(v)=>{
  const person=v.person(), store=v.place();
  const items=[['a winter coat','the coat'],['a pair of headphones','the headphones'],['a desk lamp','the lamp'],['a pair of sneakers','the sneakers']];
  const [item,noun]=v.pick(items);
  const planned=v.pick([true,false]);
  const price=v.cents(39,120);
  const pct=v.pick([20,25,30,40,50]);
  const sale=+(price*(1-pct/100)).toFixed(2);
  const p=v.money(price), s=v.money(sale), saved=v.money(+(price-sale).toFixed(2));
  return {
   q:`${person} ${planned?'has been planning to buy '+item:'was not planning to buy '+item}. At ${store}, ${noun} is ${pct}% off: ${p} \u2192 ${s}. ${person} buys it. Did the discount save ${person} money?`,
   choices: planned?[
    {label:`Yes \u2014 ${person} was going to buy ${item} anyway, so the ${saved} discount is real savings`,ok:true},
    {label:`No \u2014 a discount is never real savings`,ok:false,mis:'absolute-rules'},
    {label:`Yes \u2014 ${s} is just a low price for ${item}`,ok:false,mis:'low-price-justifies'},
    {label:`No \u2014 ${person} should have waited for a bigger sale`,ok:false,mis:'sale-timing'}]
   :[
    {label:`No \u2014 ${person} was not going to buy ${item}, so this is ${s} of unplanned spending`,ok:true},
    {label:`Yes \u2014 ${pct}% off is savings no matter what the plan was`,ok:false,mis:'sale-not-needed'},
    {label:`Yes \u2014 ${s} is objectively cheap for ${item}`,ok:false,mis:'sale-not-needed'},
    {label:`No \u2014 but only because ${pct}% is too small a discount to matter`,ok:false}],
   cue:`Ask the test first: was ${person} going to buy ${item} before this sale existed?`,
   hint:'Run the "was I going to buy it anyway" test.',
   good: planned?`Right. Planned purchase + discount = real savings of ${saved}.`:`Right. No planned purchase = no savings. ${s} of spending, not saving.`,
   bad: planned?`The test passes: ${person} WAS going to buy ${item}. The ${saved} discount is real money kept.`:`The test fails: ${person} was NOT going to buy ${item}. "${pct}% off" turned a $0.00 plan into ${s} of spending.`,
   why: planned?`Savings = a discount on something you were buying anyway. ${person} kept ${saved} off the price ${person} would have paid.`:`Savings require a planned purchase. Without one, the sale does not reduce spending \u2014 it creates it: ${s} instead of $0.00.`};
 }},
 {t:'try',skill:'budget-tradeoff',tier:'independent',
 gen:(v)=>{
  const person=v.person();
  const T=v.pick([75,100,125]);
  const Y=v.pick([15,20,25]);
  const H=v.cents(T*0.55,T*0.85);
  const gap=+((T-H)).toFixed(2);
  let F=v.cents(gap+0.01,gap+30);
  let net=+((F-Y)).toFixed(2);
  if(net===0){F=+((F+0.01)).toFixed(2);net=+((F-Y)).toFixed(2);}
  const win=net<0, amt=v.money(Math.abs(net));
  const filler=v.pick(['a scented candle','a novelty mug','a phone case','a bag of fancy coffee']);
  return {
   q:`${person} has ${v.money(H)} of groceries she needs in her cart. The store offers ${v.money(Y)} off any purchase of ${v.money(T)} or more. She adds ${filler} (${v.money(F)}) she does not need to reach ${v.money(T)}. Smart move?`,
   choices: win?[
    {label:`Yes \u2014 she spends ${v.money(F)} on ${filler} but banks ${v.money(Y)} off: net ${amt} ahead`,ok:true},
    {label:`No \u2014 threshold deals are always a trap`,ok:false,mis:'absolute-rules'},
    {label:`Yes \u2014 she "saved" ${v.money(Y)}, and the ${filler} is basically free`,ok:false,mis:'sale-not-needed'},
    {label:`No \u2014 she should have added two ${filler}s to save even more`,ok:false,mis:'sale-not-needed'}]
   :[
    {label:`No \u2014 she spends ${v.money(F)} extra to "save" ${v.money(Y)}: net ${amt} lost`,ok:true},
    {label:`Yes \u2014 ${v.money(Y)} off is always a win`,ok:false,mis:'sale-not-needed'},
    {label:`No \u2014 threshold deals are always a trap`,ok:false,mis:'absolute-rules'},
    {label:`Yes \u2014 the ${filler} was basically free after the discount`,ok:false,mis:'sale-not-needed'}],
   hint:'Net it out: extra spent minus discount gained.',
   good: win?`Right: ${v.money(F)} out, ${v.money(Y)} back = ${amt} ahead. The math \u2014 not the rule \u2014 decides.`:`Right: \u2212${v.money(F)} + ${v.money(Y)} = \u2212${amt}. She paid to "save."`,
   bad: win?`Do both sides: she adds ${v.money(F)} but the discount is ${v.money(Y)}. ${v.money(Y)} \u2212 ${v.money(F)} = ${amt} ahead \u2014 the filler pays for itself here.`:`Do both sides: she adds ${v.money(F)} but the discount is only ${v.money(Y)}. ${v.money(F)} \u2212 ${v.money(Y)} = ${amt} lost.`,
   why: win?`Threshold deals are not automatically good or bad \u2014 the net decides. Here the filler costs less than the discount it unlocks, so she comes out ${amt} ahead.`:`"Spend $X, save $Y" baits you into adding unneeded items. Net math: ${v.money(F)} spent \u2212 ${v.money(Y)} saved = ${amt} lost.`};
 }},
 {t:'try',skill:'budget-tradeoff',tier:'independent',
 gen:(v)=>{
  const person=v.person();
  const items=[['shampoo','bottle'],['cereal','box'],['toothpaste','tube'],['laundry pods','tub']];
  const [name,unit]=v.pick(items);
  const price=v.cents(6,14);
  const twoP=+((2*price)).toFixed(2);
  const perMonth=v.int(1,2);
  const expires=v.pick([true,false]);
  const monthsLeft=expires?v.int(1,3):99;
  const used=expires?Math.min(3,monthsLeft*perMonth):3;
  const verdict=used===3?'deal':used===2?'wash':'trap';
  return {
   q:`"Buy 2, get 1 free" on ${name}: 3 ${unit}s for ${v.money(twoP)} (normally ${v.money(price)} each). ${person} uses ${perMonth} ${unit}${perMonth>1?'s':''} a month, and it ${expires?`expires in ${monthsLeft} month${monthsLeft>1?'s':''}`:'never expires'}. Deal or trap?`,
   choices:[
    verdict==='deal'
     ?{label:`Deal \u2014 ${person} will use all 3, so the free ${unit} is real savings of ${v.money(price)}`,ok:true}
     :verdict==='wash'
     ?{label:`Neither \u2014 ${person} uses ${used} of the 3 before they expire: ${v.money(twoP)} \u00f7 ${used} = ${v.money(price)} per ${unit}, the same as buying one at a time`,ok:true}
     :{label:`Trap \u2014 only ${used} of the 3 gets used before it expires, so ${person} pays ${v.money(twoP)} for one usable ${unit} instead of ${v.money(price)}`,ok:true},
    {label:`Deal \u2014 free is free, so always stock up`,ok:false,mis:'free-means-stockup'},
    {label:`Trap \u2014 bulk deals are always a trick`,ok:false,mis:'absolute-rules'},
    {label:`Deal \u2014 three for the price of two is 33% off no matter what`,ok:false,mis:'unit-price-sticker'}],
   hint:'Will all three get used before they expire?',
   good: verdict==='deal'?`Right: all 3 get used, so the free ${unit} saves ${v.money(price)}.`
    :verdict==='wash'?`Right: ${v.money(twoP)} \u00f7 ${used} used = ${v.money(price)}/${unit} \u2014 the "deal" changes nothing.`
    :`Right: ${v.money(twoP)} for one usable ${unit} is worse than ${v.money(price)}.`,
   bad:`Count what gets used: ${used} of 3. ${v.money(twoP)} \u00f7 ${used} used = ${v.money(+(twoP/used).toFixed(2))} per ${unit} vs ${v.money(price)} buying single.`,
   why:`The test has two parts: "was I buying this anyway" AND "will I use it all." ${used} of 3 get used \u2014 that decides whether the BOGO is a deal, a wash, or a trap.`};
 }},
 {t:'try',skill:'budget-tradeoff',tier:'stretch',
 gen:(v)=>{
  const person=v.person();
  const storeA=v.place(); let storeB=v.place(); if(storeB===storeA) storeB='another store';
  const item=v.pick(['a winter coat','a pair of headphones','a desk lamp','a pair of sneakers','a backpack']);
  const priceA=v.cents(45,110);
  let priceB=v.cents(28,95);
  const ship=v.cents(4.99,9.99);
  let totalB=+((priceB+ship)).toFixed(2);
  let diff=+((priceA-totalB)).toFixed(2);
  if(diff===0){priceB=+((priceB-0.01)).toFixed(2);totalB=+((priceB+ship)).toFixed(2);diff=+((priceA-totalB)).toFixed(2);}
  const switchWins=diff>0;
  return {
   q:`${person} planned to buy ${item} this month, budgeted at ${v.money(priceA)} from ${storeA}. A "today only" flash sale at ${storeB} lists the same ${item} for ${v.money(priceB)} plus ${v.money(ship)} shipping. What is the smart move?`,
   choices: switchWins?[
    {label:`Buy at ${storeB} \u2014 ${v.money(priceB)} + ${v.money(ship)} shipping = ${v.money(totalB)}, still ${v.money(diff)} under the ${v.money(priceA)} budget`,ok:true},
    {label:`Stick with ${storeA} \u2014 flash sales are always traps`,ok:false,mis:'absolute-rules'},
    {label:`Buy two at ${storeB} before the sale ends \u2014 double the discount`,ok:false,mis:'discount-doubles'},
    {label:`Wait for a 50%-off sale \u2014 never buy at less than half price`,ok:false,mis:'sale-timing'}]
   :[
    {label:`Stick with ${storeA} \u2014 the "deal" totals ${v.money(totalB)}, which is ${v.money(-diff)} OVER the ${v.money(priceA)} budget`,ok:true},
    {label:`Buy at ${storeB} \u2014 ${v.money(priceB)} is less than ${v.money(priceA)}, so it is cheaper`,ok:false,mis:'sticker-compare'},
    {label:`Buy at ${storeB} \u2014 "today only" means it will never be this cheap again`,ok:false,mis:'urgency-pricing'},
    {label:`Buy two at ${storeB} before the sale ends \u2014 double the discount`,ok:false,mis:'discount-doubles'}],
   hint:'Compare the full totals, not the sticker prices.',
   good: switchWins?`Right: ${v.money(totalB)} all-in beats ${v.money(priceA)}. Planned purchase + real discount = savings of ${v.money(diff)}.`:`Right: shipping turned the "deal" into ${v.money(totalB)} \u2014 over budget.`,
   bad: switchWins?`Add the shipping: ${v.money(priceB)} + ${v.money(ship)} = ${v.money(totalB)}, which is ${v.money(diff)} under the ${v.money(priceA)} plan. The test passes AND the math works.`:`Add the shipping: ${v.money(priceB)} + ${v.money(ship)} = ${v.money(totalB)} vs the ${v.money(priceA)} plan. The sticker lied; the total tells the truth.`,
   why: switchWins?`Two checks, both pass: (1) ${person} was buying ${item} anyway, (2) the all-in total ${v.money(totalB)} is under budget. Urgency did not decide \u2014 math did.`:`The flash price ignored the shipping. All-in, ${storeB} costs ${v.money(totalB)} vs ${v.money(priceA)} planned \u2014 "today only" was selling the feeling, not a saving.`};
 }},
]},
'sales-tax':{intro:'The tag price is not the register price.',steps:[
 {t:'teach',h:'The register adds a little on top',
  body:'<p>A $20.00 tag does not mean $20.00 out the door. At the register the store adds <b>tax</b>: $20.00 \u00d7 0.08 = $1.60, so <b>$21.60</b> leaves your account.</p><p>The tag is the price. The register is the cost.</p>'},
 {t:'teach',h:'Sales tax, in one line',
  body:'<p>That extra has a name: <b>sales tax</b>.</p><ul><li><b>Tax = rate \u00d7 price.</b> 8% means 8 cents of tax on every dollar.</li><li><b>Total = price + tax.</b> That total is what actually leaves your account.</li><li><b>Rates differ by place.</b> 6% in one town, 9.5% in the next \u2014 same item, different register total.</li></ul>'},
 {t:'example',h:'Maya buys headphones',story:'<p>Maya finds headphones tagged <b>$24.99</b>. Her town\u2019s tax rate is 8%.</p>',
  points:['Tax: $24.99 \u00d7 0.08 = $1.9992, rounds to <b>$2.00</b>','Register total: $24.99 + $2.00 = <b>$26.99</b>','She brings $26.99, not $24.99 \u2014 a $2.00 surprise avoided by doing the math first.']},
 {t:'try',skill:'sales-tax-total',tier:'guided',
  gen:(v)=>{
   const price=v.cents(9,55);
   const rate=v.pick([6,7,7.25,8,8.5,9,9.5,10]);
   const taxC=Math.round(price*rate);
   const tax=taxC/100;
   const totalC=Math.round(price*100)+taxC;
   const total=v.money(totalC/100);
   return {
    q:`${v.person()} buys an item tagged ${v.money(price)} at ${v.place()}. The sales tax rate there is ${rate}%. What is the register total?`,
    choices:[
     {label:total,ok:true},
     {label:v.money(price),ok:false,mis:'forgot-tax'},
     {label:v.money(price+rate),ok:false,mis:'tax-added-as-dollars'},
     {label:v.money((Math.round(price*100)+Math.round(price*(rate+2)))/100),ok:false}],
    cue:`Turn ${rate}% into a decimal, multiply by the price to get the tax, then add the tax to the price.`,
    hint:'Tax = rate \u00d7 price. Total = price + tax.',
    good:`Right: ${v.money(price)} \u00d7 ${rate/100} = ${v.money(tax)} of tax, so ${total} out the door.`,
    bad:`Two steps: tax = ${v.money(price)} \u00d7 ${rate/100} = ${v.money(tax)}. Total = ${v.money(price)} + ${v.money(tax)} = ${total}.`,
    why:`The tag is not the total. ${rate}% of ${v.money(price)} is ${v.money(tax)}, and the register charges ${total}.`};
  }},
 {t:'try',skill:'sales-tax-deal',tier:'independent',
  gen:(v)=>{
   const item=v.pick(['a jacket','a backpack','headphones','sneakers','a desk lamp']);
   const person=v.person();
   const price=v.cents(28,75);
   const off=v.pick([15,20,25]);
   const rate=v.pick([6,7,8,9]);
   const pC=Math.round(price*100);
   const discC=Math.round(pC*(100-off)/100);
   const taxC=Math.round(discC*rate/100);
   const okC=discC+taxC;
   const taxFullC=Math.round(pC*rate/100);
   const wrongOrderC=pC+taxFullC-Math.round(pC*off/100);
   const asDollarsC=discC+rate*100;
   return {
    q:`${person} finds ${item} priced at ${v.money(price)}: ${off}% off, and the sales tax rate is ${rate}%. What is the out-the-door total?`,
    choices:[
     {label:v.money(okC/100),ok:true},
     {label:v.money(wrongOrderC/100),ok:false,mis:'discount-then-tax-order'},
     {label:v.money(discC/100),ok:false,mis:'forgot-tax'},
     {label:v.money(asDollarsC/100),ok:false,mis:'tax-added-as-dollars'}],
    hint:'What does the store tax \u2014 the price before the discount, or after?',
    good:`Right: ${off}% off first (${v.money(discC/100)}), then ${rate}% tax on that: ${v.money(okC/100)}.`,
    bad:`Discount first: ${v.money(price)} \u00d7 ${(100-off)/100} = ${v.money(discC/100)}. Then tax that: ${v.money(discC/100)} \u00d7 ${(100+rate)/100} = ${v.money(okC/100)}.`,
    why:`The register taxes what you actually pay \u2014 the discounted price. Taxing the full price and then discounting overcharges by ${v.money((wrongOrderC-okC)/100)} here.`};
  }},
 {t:'try',skill:'sales-tax-compare',tier:'independent',
  gen:(v)=>{
   const person=v.person();
   return {
    q:`${person} wants a $200.00 game console. Store A charges 6% sales tax; Store B charges 9.5%. Where is it cheaper out the door \u2014 and by how much?`,
    choices:[
     {label:'Store A (6%) \u2014 $212.00 vs $219.00, $7.00 cheaper',ok:true},
     {label:'Store A (6%) \u2014 $206.00 vs $209.50, $3.50 cheaper',ok:false,mis:'tax-added-as-dollars'},
     {label:'Store B (9.5%) \u2014 the higher tax means the store absorbs more, so you pay less',ok:false,mis:'tax-absorbed'},
     {label:'Neither \u2014 $200 is $200 wherever you buy it',ok:false,mis:'forgot-tax'}],
    hint:'Run the register math for both stores, then compare the two totals.',
    good:'Right: $200 \u00d7 1.06 = $212.00 vs $200 \u00d7 1.095 = $219.00. Store A wins by $7.00.',
    bad:'$200 + 6% tax = $212.00. $200 + 9.5% tax = $219.00. $219.00 \u2212 $212.00 = $7.00.',
    why:'Same item, different tax, different register total. "Cheaper" means out the door \u2014 $7.00 cheaper at the 6% store.'};
  }},
 {t:'try',skill:'sales-tax-total',tier:'stretch',
  gen:(v)=>{
   const item=v.pick(['a jacket','a backpack','headphones','sneakers','a desk lamp']);
   const person=v.person();
   const price=v.cents(150,250);
   const pC=Math.round(price*100);
   const d=v.pick([15,20]);
   const e=v.pick([10,25]);
   const rA=v.pick([7,8]);
   const rB=v.pick([9,10]);
   const tAC=Math.round(pC*(100-d)*(100+rA)/10000);
   const tBC=Math.round(pC*(100-e)*(100+rB)/10000);
   const aWins=tAC<tBC;
   const wC=aWins?tAC:tBC, lC=aWins?tBC:tAC;
   const winner=aWins?'Store A':'Store B', loser=aWins?'Store B':'Store A';
   const diffC=Math.abs(tAC-tBC);
   const preAC=Math.round(pC*(100-d)/100), preBC=Math.round(pC*(100-e)/100);
   const preWinner=d>e?'Store A':'Store B';
   const preW=d>e?preAC:preBC, preL=d>e?preBC:preAC;
   const wD=aWins?d:e, wR=aWins?rA:rB;
   const netC=Math.round(pC*(100-wD+wR)/100);
   return {
    q:`${person} is buying ${item} priced at ${v.money(price)}. Store A takes ${d}% off and charges ${rA}% tax; Store B takes ${e}% off and charges ${rB}% tax. Which is cheaper out the door \u2014 and by about how much?`,
    choices:[
     {label:`${winner} \u2014 ${v.money(wC/100)} vs ${v.money(lC/100)} out the door, about ${v.money(diffC/100)} cheaper`,ok:true},
     {label:`${loser} \u2014 ${v.money(lC/100)} vs ${v.money(wC/100)} out the door, about ${v.money(diffC/100)} cheaper`,ok:false},
     {label:`${preWinner} wins before tax \u2014 ${v.money(preW/100)} vs ${v.money(preL/100)}, so it wins overall`,ok:false,mis:'forgot-tax'},
     {label:`${winner} \u2014 ${wD}% off plus ${wR}% tax is really ${wD-wR}% off: ${v.money(netC/100)}`,ok:false,mis:'discount-then-tax-order'}],
    hint:'Out the door means discount first, then tax \u2014 for BOTH stores. Compare the two register totals.',
    good:`Right: Store A = ${v.money(tAC/100)} out the door, Store B = ${v.money(tBC/100)}. ${winner} wins by about ${v.money(diffC/100)}.`,
    bad:`Discount first, then tax, on each store: A = ${v.money(pC/100)} \u00d7 ${(100-d)/100} \u00d7 ${(100+rA)/100} = ${v.money(tAC/100)}; B = ${v.money(pC/100)} \u00d7 ${(100-e)/100} \u00d7 ${(100+rB)/100} = ${v.money(tBC/100)}.`,
    why:'Two moves, in order, on each store. The bigger sticker discount does not always win \u2014 the tax rates vote too.'};
  }},
 {t:'tool',screen:'spend',h:'Compare out-the-door totals',body:'<p>Open the spending tools and run two deals side by side — tag price, tax, trip cost — and see which one is actually cheaper out the door.</p>',cta:'Open spending tools'}
]},
'usable-value':{intro:'Compare what you will USE, not what is in the package.',steps:[
 {t:'teach',h:'Unit price is only half the story',
  body:'<p><b>Unit price = price \u00f7 quantity.</b> But the quantity that matters is what you will <i>actually use</i>:</p><p><b>True unit price = price \u00f7 units you will use.</b></p><p>A giant pack is only cheaper if the extra does not go in the trash. Waste is the most expensive ingredient.</p>'},
 {t:'example',h:'Maya compares two packs',story:'<p>Pasta: 12-pack for $9 ($0.75 each) vs 6-pack for $5.40 ($0.90 each).</p>',
  points:['She will use all 12 before they expire.','True cost: $0.75 vs $0.90 per pack.','The 12-pack wins - <i>because none is wasted</i>.']},
 {t:'try',skill:'unit-price-usable',tier:'guided',
  gen:(v)=>{
   const prods=[['pasta packs','pack',12,6],['granola bars','bar',24,12],['coffee pods','pod',20,10],['trash bags','bag',30,15]];
   const [name,unit,bigQ,smallQ]=v.pick(prods);
   const person=v.person();
   const upBig=v.cents(0.55,0.85), upSmall=+(upBig+v.cents(0.12,0.35)).toFixed(2);
   const bigP=v.money(upBig*bigQ), smallP=v.money(upSmall*smallQ);
   const ub=v.money(upBig), us=v.money(upSmall);
   return {
    q:`${person} compares ${name}: ${bigQ}-pack for ${bigP} (${ub} each) vs ${smallQ}-pack for ${smallP} (${us} each). ${person} will use all ${bigQ} before they expire. Which is the better buy?`,
    choices:[
     {label:`The ${bigQ}-pack \u2014 ${ub} per ${unit} beats ${us}`,ok:true},
     {label:`The ${smallQ}-pack \u2014 ${smallP} total is less than ${bigP}`,ok:false,mis:'total-not-unit'},
     {label:`The ${smallQ}-pack \u2014 smaller is safer`,ok:false,mis:'smaller-is-safer'},
     {label:`They tie \u2014 both are ${name}`,ok:false,mis:'same-category-same-value'}],
    cue:`Divide each price by the number ${person} will USE, then compare the two.`,
    hint:'True unit price = price \u00f7 units you will use.',
    good:`Right: ${ub} < ${us} per ${unit} used.`,
    bad:`${bigP} \u00f7 ${bigQ} = ${ub} each vs ${smallP} \u00f7 ${smallQ} = ${us} each. The big pack is cheaper per use.`,
    why:`When everything gets used, the lower unit price wins: ${ub} vs ${us} per ${unit}.`};
  }},
 {t:'try',skill:'unit-price-usable',tier:'independent',
  gen:(v)=>{
   const prods=[['pasta packs','pack',12,6],['granola bars','bar',24,12],['coffee pods','pod',20,10],['trash bags','bag',30,15]];
   const [name,unit,bigQ,smallQ]=v.pick(prods);
   const person=v.person();
   const upBig=v.cents(0.55,0.85), upSmall=+(upBig+v.cents(0.12,0.35)).toFixed(2);
   const bigP=v.money(upBig*bigQ), smallP=v.money(upSmall*smallQ);
   const ub=v.money(upBig), us=v.money(upSmall);
   const trueBig=v.money(upBig*bigQ/smallQ);
   return {
    q:`Same two packs \u2014 but ${person} will only use ${smallQ} before the rest expire. Now which is better?`,
    choices:[
     {label:`The ${smallQ}-pack \u2014 ${smallP} \u00f7 ${smallQ} used = ${us} per ${unit}`,ok:true},
     {label:`Still the ${bigQ}-pack \u2014 the sticker says ${ub}`,ok:false,mis:'unit-price-sticker'},
     {label:`The ${bigQ}-pack \u2014 ${person} can sell the extra ${bigQ-smallQ} to a friend`,ok:false,mis:'others-use'},
     {label:`They tie \u2014 both give ${person} the ${smallQ} ${unit}s needed`,ok:false,mis:'exact-quantity-tie'}],
    hint:`Recompute with ${smallQ} used, not ${bigQ} bought.`,
    good:`Right: ${bigP} \u00f7 ${smallQ} used = ${trueBig} each vs ${us}. The small pack wins.`,
    bad:`True unit price uses what you USE: ${bigP} \u00f7 ${smallQ} = ${trueBig} each. The small pack at ${us} wins.`,
    why:`Waste flips the answer. ${trueBig} per ${unit} used is far above the small pack\u2019s ${us}. Always divide by what you will use.`};
  }},
 {t:'try',skill:'unit-price-usable',tier:'independent',
  gen:(v)=>{
   const items=[['Laundry detergent','load',60,40],['Dish soap','wash',50,30],['Shampoo','wash',80,48]];
   const [name,unit,bigQ,smallQ]=v.pick(items);
   const person=v.person();
   const upBig=v.cents(0.18,0.32), upSmall=+(upBig+v.cents(0.05,0.14)).toFixed(2);
   const bigP=v.money(upBig*bigQ), smallP=v.money(upSmall*smallQ);
   const ub=v.money(upBig), us=v.money(upSmall);
   return {
    q:`${name}: ${bigP} for ${bigQ} ${unit}s vs ${smallP} for ${smallQ} ${unit}s. ${person} will use every drop. Which is the better buy?`,
    choices:[
     {label:`The ${bigP} one \u2014 ${ub}/${unit} beats ${us}/${unit}`,ok:true},
     {label:`The ${smallP} one \u2014 the lower total is cheaper`,ok:false,mis:'total-not-unit'},
     {label:`They are the same \u2014 both clean things`,ok:false,mis:'same-category-same-value'},
     {label:`The bigger one \u2014 bigger is always the better value`,ok:false,mis:'unit-price-sticker'}],
    hint:`Divide price by ${unit}s you will use.`,
    good:`Right: ${bigP} \u00f7 ${bigQ} = ${ub} vs ${smallP} \u00f7 ${smallQ} = ${us}.`,
    bad:`${ub}/${unit} is less than ${us}/${unit}. When all of it gets used, unit price decides.`,
    why:`\u201cLower total\u201d and \u201cbigger is better\u201d are both shortcuts that skip the division. True unit price \u2014 price \u00f7 ${unit}s you will use \u2014 is the whole answer.`};
  }},
 {t:'try',skill:'unit-price-usable',tier:'stretch',
  gen:(v)=>{
   const prods=[['yogurt cups','cup',24,12],['soda cans','can',24,12],['snack packs','pack',36,18],['juice boxes','box',30,15]];
   const [name,unit,bigQ,smallQ]=v.pick(prods);
   const person=v.person();
   const eatQ=v.int(Math.max(4,Math.floor(smallQ*0.6)),smallQ-2);
   const upBig=v.cents(0.42,0.68), upSmall=+(upBig+v.cents(0.10,0.28)).toFixed(2);
   const bigP=v.money(upBig*bigQ), smallP=v.money(upSmall*smallQ);
   const ub=v.money(upBig), us=v.money(upSmall);
   const trueBig=v.money(upBig*bigQ/eatQ);
   const roommate=v.pick(['a roommate','a sibling','a coworker']);
   return {
    q:`${person}\u2019s family will eat ${eatQ} ${name} before the rest expire; ${roommate} might take a few, but nothing is promised. ${bigQ}-pack for ${bigP} (${ub} each) vs ${smallQ}-pack for ${smallP} (${us} each). Which wins?`,
    choices:[
     {label:`The ${smallQ}-pack \u2014 ${bigP} \u00f7 ${eatQ} eaten = ${trueBig} per ${unit} vs ${us}`,ok:true},
     {label:`The ${bigQ}-pack \u2014 the sticker says ${ub} each`,ok:false,mis:'unit-price-sticker'},
     {label:`The ${bigQ}-pack \u2014 ${roommate} will probably take the rest`,ok:false,mis:'others-use'},
     {label:`Neither \u2014 ${name} are a Want, so value does not matter`,ok:false,mis:'want-value-irrelevant'}],
    hint:`Divide by ${unit}s eaten, not ${unit}s bought. Count only what is promised.`,
    good:`Right: ${bigP} \u00f7 ${eatQ} = ${trueBig} per ${unit} actually eaten.`,
    bad:`True unit price uses what gets used: ${bigP} \u00f7 ${eatQ} = ${trueBig} each. The small pack at ${us} wins.`,
    why:`The sticker\u2019s ${ub} assumes all ${bigQ} get eaten. Waste rewrites the price: ${trueBig} per ${unit} eaten beats nothing \u2014 and \u201cmight take a few\u201d changes the question instead of answering it.`};
  }},
 {t:'tool',screen:'pacing-value',focus:'value',h:'Try the value calculator',body:'<p>Compare packs with unit price - and factor in what you will actually use.</p>',cta:'Open the value calculator'}
]},
'gas-value':{intro:'Count the cost of getting the deal.',steps:[
 {t:'teach',h:'The pump price is not the full price',
  body:'<p>Driving for cheaper gas has a cost: the trip itself.</p><p><b>Real savings = pump savings \u2212 extra trip cost.</b></p><p>Extra trip cost = (extra miles \u00f7 mpg) \u00d7 gas price. If the station is <i>on your route anyway</i>, the extra cost is $0 - then the cheaper pump always wins.</p>'},
 {t:'example',h:'Maya does the math',story:'<p>Station A: $3.00/gal, next door. Station B: $2.85/gal, 8 extra miles round trip. 12 gallons, 25 mpg.</p>',
  points:['Pump savings: 12 \u00d7 $0.15 = $1.80','Trip cost: (8 \u00f7 25) \u00d7 $3.00 \u2248 $0.96','Real savings: $1.80 \u2212 $0.96 = <b>$0.84</b>','Worth it? Barely. A smaller gap would flip it.']},
 {t:'try',skill:'trip-cost',tier:'guided',
 gen:(v)=>{
  const person=v.person();
  const gal=v.int(10,16);
  const priceA=v.cents(2.95,3.79);
  const gap=v.cents(0.08,0.22);
  const priceB=+((priceA-gap)).toFixed(2);
  const miles=v.int(5,12), mpg=v.int(22,32);
  const pump=+((gal*gap)).toFixed(2);
  const trip=+(((miles/mpg)*priceA)).toFixed(2);
  const real=+((pump-trip)).toFixed(2);
  const worth=real>0;
  return {
   q:`${person} needs ${gal} gallons. Station A (${v.money(priceA)}/gal) is next door; station B (${v.money(priceB)}/gal) is ${miles} extra miles round trip. The car gets ${mpg} mpg. What are the real savings of driving to B?`,
   choices:[
    worth?{label:`${v.money(real)} \u2014 ${v.money(pump)} pump savings minus ${v.money(trip)} trip cost`,ok:true}
     :{label:`Not worth the drive \u2014 the ${v.money(trip)} trip cost wipes out the ${v.money(pump)} pump savings`,ok:true},
    {label:`${v.money(pump)} \u2014 the pump price is all that matters`,ok:false,mis:'ignores-trip-cost'},
    {label:`$0.00 \u2014 any detour wipes out the savings`,ok:false,mis:'trip-math'},
    {label:`${v.money(+((pump*2)).toFixed(2))} \u2014 count the savings on the way there and back`,ok:false,mis:'double-count-savings'}],
   cue:`First find the pump savings: ${gal} gallons \u00d7 ${v.money(gap)}. Then price the ${miles}-mile detour.`,
   hint:'Real savings = pump savings \u2212 trip cost.',
   good: worth?`Right: ${v.money(pump)} \u2212 ${v.money(trip)} = ${v.money(real)} real savings.`:`Right: the trip eats the whole discount. Stay at A.`,
   bad:`Do both sides: pump savings ${gal} \u00d7 ${v.money(gap)} = ${v.money(pump)}; trip cost (${miles} \u00f7 ${mpg}) \u00d7 ${v.money(priceA)} = ${v.money(trip)}. ${v.money(pump)} \u2212 ${v.money(trip)} = ${v.money(real)}.`,
   why:`The pump price ignores the drive. Real savings = ${v.money(pump)} \u2212 ${v.money(trip)} = ${v.money(real)}.`};
 }},
 {t:'try',skill:'trip-cost',tier:'independent',
 gen:(v)=>{
  const person=v.person();
  const gal=v.int(8,14);
  const priceA=v.cents(2.95,3.79);
  const gap=v.cents(0.10,0.30);
  const priceB=+((priceA-gap)).toFixed(2);
  const onRoute=v.pick([true,false]);
  const miles=onRoute?0:v.int(6,16);
  const mpg=v.int(20,30);
  const pump=+((gal*gap)).toFixed(2);
  const trip=+(((miles/mpg)*priceA)).toFixed(2);
  const real=+((pump-trip)).toFixed(2);
  const worth=real>0;
  return {
   q:`Station B is ${v.money(gap)}/gal cheaper than station A (${v.money(priceA)} vs ${v.money(priceB)}). ${onRoute?`B sits directly on ${person}\u2019s normal route \u2014 zero extra miles.`:`B is ${miles} extra miles round trip off ${person}\u2019s route.`} ${person} needs ${gal} gallons and the car gets ${mpg} mpg. Which station wins?`,
   choices: onRoute?[
    {label:`Station B \u2014 zero extra miles means zero trip cost; the full ${v.money(pump)} is real`,ok:true},
    {label:`Station A \u2014 the closest station is always cheapest overall`,ok:false,mis:'trip-math'},
    {label:`Station B \u2014 but only because cheaper gas is higher quality`,ok:false,mis:'price-means-quality'},
    {label:`It does not matter \u2014 ${v.money(gap)}/gal is too small to count`,ok:false,mis:'small-per-unit'}]
   : worth?[
    {label:`Station B \u2014 ${v.money(pump)} pump savings minus ${v.money(trip)} trip cost = ${v.money(real)} real`,ok:true},
    {label:`Station B \u2014 ${v.money(gap)}/gal cheaper is all that matters`,ok:false,mis:'ignores-trip-cost'},
    {label:`Station A \u2014 any detour wipes out the savings`,ok:false,mis:'trip-math'},
    {label:`Station A \u2014 ${miles} miles is too far for any discount`,ok:false,mis:'trip-math'}]
   :[
    {label:`Station A \u2014 the ${v.money(trip)} trip cost wipes out the ${v.money(pump)} pump savings`,ok:true},
    {label:`Station B \u2014 ${v.money(gap)}/gal cheaper is all that matters`,ok:false,mis:'ignores-trip-cost'},
    {label:`Station A \u2014 driving farther for gas is never worth it`,ok:false,mis:'trip-math'},
    {label:`Station B \u2014 the pump price is the only number that matters`,ok:false,mis:'ignores-trip-cost'}],
   hint:'What does the trip itself cost this time?',
   good: onRoute?`Right. Zero extra miles = zero extra cost. Cheaper pump wins outright.`
    :worth?`Right: ${v.money(pump)} \u2212 ${v.money(trip)} = ${v.money(real)}. B still wins, by less than the pump gap.`
    :`Right: the detour eats the discount. Stay at A.`,
   bad: onRoute?`Extra miles = 0, so extra cost = $0.00. The cheaper pump wins with no penalty.`
    :`Subtract the trip: (${miles} \u00f7 ${mpg}) \u00d7 ${v.money(priceA)} = ${v.money(trip)}. ${v.money(pump)} \u2212 ${v.money(trip)} = ${v.money(real)}.`,
   why: onRoute?`On-route changes everything: the trip cost drops to $0.00, so the full ${v.money(pump)} pump savings is real.`
    :`Same subtraction as always: ${v.money(pump)} \u2212 ${v.money(trip)} = ${v.money(real)}. ${worth?`B wins by ${v.money(real)}.`:`The detour eats it \u2014 A wins.`}`};
 }},
 {t:'try',skill:'trip-cost',tier:'independent',
 gen:(v)=>{
  const person=v.person();
  const gal=v.int(20,32);
  const priceA=v.cents(3.05,3.95);
  const gap=v.cents(0.12,0.35);
  const priceB=+((priceA-gap)).toFixed(2);
  const miles=v.int(10,24), mpg=v.int(14,22);
  const pump=+((gal*gap)).toFixed(2);
  const trip=+(((miles/mpg)*priceA)).toFixed(2);
  const real=+((pump-trip)).toFixed(2);
  const worth=real>0;
  return {
   q:`${person}\u2019s truck needs ${gal} gallons. Station B is ${v.money(gap)}/gal cheaper (${v.money(priceB)} vs ${v.money(priceA)}) but ${miles} extra miles round trip; the truck gets ${mpg} mpg. Worth the drive?`,
   choices:[
    worth?{label:`Yes \u2014 ${v.money(pump)} pump savings minus ${v.money(trip)} trip cost = ${v.money(real)} real`,ok:true}
     :{label:`No \u2014 the ${v.money(trip)} trip cost wipes out the ${v.money(pump)} pump savings`,ok:true},
    {label:`Yes \u2014 big tanks always make the drive worth it`,ok:false,mis:'trip-math'},
    {label:`Yes \u2014 the pump savings are ${v.money(pump)} and the trip does not cost real money`,ok:false,mis:'ignores-trip-cost'},
    {label:`No \u2014 ${miles} miles is too far for any discount`,ok:false,mis:'trip-math'}],
   hint:'Pump savings \u2212 trip cost \u2014 the tank size does not change the formula.',
   good: worth?`Right: ${v.money(pump)} \u2212 ${v.money(trip)} = ${v.money(real)} real savings.`:`Right: the truck drinks the discount. Stay at A.`,
   bad:`Pump savings: ${gal} \u00d7 ${v.money(gap)} = ${v.money(pump)}. Trip cost: (${miles} \u00f7 ${mpg}) \u00d7 ${v.money(priceA)} = ${v.money(trip)}. Net: ${v.money(real)}.`,
   why:`A big tank scales BOTH sides: bigger pump savings, but the same subtraction. ${v.money(pump)} \u2212 ${v.money(trip)} = ${v.money(real)} \u2014 that is the whole decision.`};
 }},
 {t:'try',skill:'trip-cost',tier:'stretch',
 gen:(v)=>{
  const person=v.person();
  const gal=v.int(12,20);
  const priceA=v.cents(3.05,3.85);
  const gap=v.cents(0.10,0.28);
  const priceB=+((priceA-gap)).toFixed(2);
  const miles=v.int(8,18), mpg=v.int(20,30);
  const trip=+(((miles/mpg)*priceA)).toFixed(2);
  const pump=+((gal*gap)).toFixed(2);
  const errand=v.pick([true,false]);
  const real=errand?pump:+((pump-trip)).toFixed(2);
  const worth=real>0;
  return {
   q:`Station B is ${v.money(gap)}/gal cheaper (${v.money(priceB)} vs ${v.money(priceA)}) but ${miles} extra miles round trip. ${person} needs ${gal} gallons (${mpg} mpg)${errand?` and is already driving past station B for groceries this week`:` and has no other reason to drive that way`}. Which station wins?`,
   choices:[
    errand?{label:`Station B \u2014 the trip was happening anyway, so trip cost is $0.00 and the full ${v.money(pump)} is real`,ok:true}
     :worth?{label:`Station B \u2014 ${v.money(pump)} pump savings minus ${v.money(trip)} trip cost = ${v.money(real)} real`,ok:true}
     :{label:`Station A \u2014 the ${v.money(trip)} trip wipes out the ${v.money(pump)} pump savings`,ok:true},
    {label:`Station B \u2014 ${v.money(gap)}/gal cheaper is all that matters`,ok:false,mis:'ignores-trip-cost'},
    {label:`Station A \u2014 driving farther for gas is never worth it`,ok:false,mis:'trip-math'},
    {label:`Station A \u2014 ${v.money(priceA)} and ${v.money(priceB)} are basically the same price`,ok:false,mis:'close-enough-prices'}],
   hint:'Does the detour add any NEW miles?',
   good: errand?`Right: miles already driven cost nothing extra. Full ${v.money(pump)} is real.`
    :worth?`Right: ${v.money(pump)} \u2212 ${v.money(trip)} = ${v.money(real)}.`
    :`Right: a special trip for the discount loses money. Stay at A.`,
   bad: errand?`${person} is driving past B anyway: extra miles = 0, trip cost = $0.00. The full ${v.money(pump)} pump savings is real.`
    :`No free miles here: pump savings ${v.money(pump)}, trip cost (${miles} \u00f7 ${mpg}) \u00d7 ${v.money(priceA)} = ${v.money(trip)}. Net: ${v.money(real)}.`,
   why: errand?`Combine the errand and the detour disappears: $0.00 extra trip cost, so the whole ${v.money(pump)} pump gap is real savings.`
    :`The miles are real and new, so the trip costs ${v.money(trip)}. ${v.money(pump)} \u2212 ${v.money(trip)} = ${v.money(real)} \u2014 ${worth?'B still wins.':'A wins.'}`};
 }},
 {t:'tool',screen:'pacing-value',focus:'gas',h:'Try the gas calculator',body:'<p>Enter both stations, your tank, and the detour - see the real savings.</p>',cta:'Open the gas calculator'}
]},
'subscriptions-lesson':{intro:'Small monthly charges are yearly decisions in disguise.',steps:[
 {t:'teach',h:'Multiply by 12',
  body:'<p>$12.99/month sounds small. <b>$12.99 \u00d7 12 = $156/year</b> sounds different - because it is the same money.</p><p>Every subscription is a <i>yearly</i> decision wearing a monthly costume. Three "small" subs can quietly eat $400\u2013$500 a year.</p>'},
 {t:'example',h:'Maya audits her subs',story:'<p>Music $9.99 + video $15.99 + a fitness app $7.99 she opened twice.</p>',
  points:['Monthly total: $33.97','Yearly: $33.97 \u00d7 12 = <b>$407.64</b>','She cancels the fitness app: saves $95.88/year in 2 minutes.']},
 {t:'try',skill:'subscription-annual',tier:'guided',
 gen:(v)=>{
  const person=v.person();
  const subs=[['music streaming','video streaming'],['a fitness app','cloud storage'],['a news app','a gaming service']];
  const [s1,s2]=v.pick(subs);
  const m1=v.cents(7.99,16.99), m2=v.cents(4.99,12.99);
  const monthly=+((m1+m2)).toFixed(2), yearly=+((monthly*12)).toFixed(2);
  return {
   q:`${person} pays ${v.money(m1)}/month for ${s1} and ${v.money(m2)}/month for ${s2}. What is the real yearly size of these two subscriptions?`,
   choices:[
    {label:`${v.money(yearly)}/year \u2014 (${v.money(m1)} + ${v.money(m2)}) \u00d7 12`,ok:true},
    {label:`${v.money(monthly)}/month \u2014 the monthly number is the real size`,ok:false,mis:'subscription-blindness'},
    {label:`About ${v.money(monthly)} a year \u2014 just add the two monthly prices`,ok:false,mis:'period-math'},
    {label:`${v.money(+((monthly*6)).toFixed(2))}/year \u2014 multiply by 6 for half a year`,ok:false,mis:'period-math'}],
   cue:`First add the two monthly prices, then multiply the total by 12.`,
   hint:'Add, then \u00d7 12.',
   good:`Right: ${v.money(monthly)} \u00d7 12 = ${v.money(yearly)}/year.`,
   bad:`Add first: ${v.money(m1)} + ${v.money(m2)} = ${v.money(monthly)}/month. Then \u00d7 12 = ${v.money(yearly)}/year.`,
   why:`${v.money(monthly)} feels small; ${v.money(yearly)} is the same money with the costume off. Every subscription is a yearly decision.`};
 }},
 {t:'try',skill:'subscription-annual',tier:'independent',
 gen:(v)=>{
  const person=v.person();
  const sub=v.pick(['a meditation app','a streaming service','a gaming subscription','a news app','cloud storage']);
  const m=v.cents(6.99,17.99);
  const yearly=v.money(+((m*12)).toFixed(2));
  const use=v.pick(['daily','a few times a month','twice ever','not once']);
  const keep=use==='daily'||use==='a few times a month';
  return {
   q:`${person} pays ${v.money(m)}/month for ${sub}. In the last three months ${person} opened it ${use}. At ${yearly}/year, keep or cancel?`,
   choices: keep?[
    {label:`Keep \u2014 ${use} use earns its ${yearly}/year`,ok:true},
    {label:`Cancel \u2014 every subscription is a trap`,ok:false,mis:'absolute-rules'},
    {label:`Keep \u2014 canceling wastes the months already paid for`,ok:false,mis:'sunk-subscription'},
    {label:`Cancel \u2014 ${v.money(m)}/month is too much for any app`,ok:false,mis:'price-alone-cancels'}]
   :[
    {label:`Cancel \u2014 ${yearly}/year for "${use}" is a bad trade; re-subscribe if life changes`,ok:true},
    {label:`Keep \u2014 it is only ${v.money(m)}/month`,ok:false,mis:'subscription-blindness'},
    {label:`Keep \u2014 ${person} might need it someday`,ok:false,mis:'someday-subscription'},
    {label:`Keep \u2014 canceling wastes the three months already paid`,ok:false,mis:'sunk-subscription'}],
   hint:'Recurring cost needs recurring value.',
   good: keep?`Right: ${use} use at ${yearly}/year is money working.`:`Right: "${use}" does not earn ${yearly}/year. Cancel in two minutes; rejoin if life changes.`,
   bad: keep?`${use} is recurring value \u2014 the subscription earns its ${yearly}/year.`:`Three months at "${use}" = the value is not recurring. ${yearly}/year for that is a bad trade.`,
   why: keep?`A subscription must earn its cost every month. "${use}" clears that bar at ${yearly}/year.`:`${v.money(m)}/month sounds tiny; ${yearly}/year is the real price of "${use}." Cancel now, re-subscribe if life changes.`};
 }},
 {t:'try',skill:'subscription-annual',tier:'independent',
 gen:(v)=>{
  const person=v.person();
  const svc=v.pick(['a language app','a fitness app','a cloud backup plan','a music service']);
  const daily=v.cents(0.89,2.49);
  let monthly=v.cents(24.99,59.99);
  let dYear=+((daily*365)).toFixed(2), mYear=+((monthly*12)).toFixed(2);
  if(dYear===mYear){monthly=+((monthly+1)).toFixed(2);mYear=+((monthly*12)).toFixed(2);}
  const dailyWins=dYear<mYear;
  return {
   q:`${person} can get ${svc} for ${v.money(daily)}/day or ${v.money(monthly)}/month. Which costs less over a full year?`,
   choices:[
    {label:`${v.money(daily)}/day \u2014 ${v.money(dYear)}/year`,ok:dailyWins},
    {label:`${v.money(monthly)}/month \u2014 ${v.money(mYear)}/year`,ok:!dailyWins},
    {label:`The daily plan \u2014 ${v.money(daily)} a day is pocket change`,ok:false,mis:'per-day-illusion'},
    {label:`The monthly plan \u2014 ${v.money(monthly)}/month is the number that matters`,ok:false,mis:'subscription-blindness'}],
   hint:'Multiply both out to a full year.',
   good:`Right: ${v.money(dYear)} vs ${v.money(mYear)} per year. The costume does not change the money.`,
   bad:`${v.money(daily)} \u00d7 365 = ${v.money(dYear)}/year. ${v.money(monthly)} \u00d7 12 = ${v.money(mYear)}/year. Compare those.`,
   why:`"Pocket change a day" hides ${v.money(dYear)}/year; the monthly number hides ${v.money(mYear)}/year. Multiply everything to yearly before judging.`};
 }},
 {t:'try',skill:'subscription-annual',tier:'stretch',
 gen:(v)=>{
  const person=v.person();
  const a=v.pick(['music streaming','video streaming']);
  const b=v.pick(['a fitness app','a meditation app','cloud storage']);
  const aOld=v.cents(9.99,14.99), aNew=+((aOld+v.cents(2,5))).toFixed(2);
  const bOld=v.cents(4.99,9.99), bNew=+((bOld+v.cents(1,4))).toFixed(2);
  const aYear=+((aNew*12)).toFixed(2), bYear=+((bNew*12)).toFixed(2);
  const total=+((aYear+bYear)).toFixed(2);
  const bUsed=v.pick([true,false]);
  return {
   q:`${person} uses ${a} daily; it just rose from ${v.money(aOld)} to ${v.money(aNew)}/month. ${person} opened ${b} ${bUsed?'a few times a month':'twice ever'}; it rose from ${v.money(bOld)} to ${v.money(bNew)}/month. The new yearly total is ${v.money(total)}. What should ${person} do?`,
   choices: bUsed?[
    {label:`Keep both \u2014 both earn their cost; the new yearly total is ${v.money(total)}`,ok:true},
    {label:`Cancel ${b} \u2014 any price hike means cancel`,ok:false,mis:'price-alone-cancels'},
    {label:`Keep both \u2014 the hikes are only a few dollars a month`,ok:false,mis:'subscription-blindness'},
    {label:`Cancel ${a} and keep ${b} \u2014 ${b} is cheaper`,ok:false,mis:'cheaper-means-keep'}]
   :[
    {label:`Cancel ${b}, keep ${a} \u2014 new total ${v.money(aYear)}/year instead of ${v.money(total)}; the hike is the reminder to cut dead weight`,ok:true},
    {label:`Keep both \u2014 the hikes are only a few dollars a month`,ok:false,mis:'subscription-blindness'},
    {label:`Cancel both \u2014 price hikes are always a scam`,ok:false,mis:'absolute-rules'},
    {label:`Keep ${b} too \u2014 canceling wastes the ${v.money(bOld)}/month already paid`,ok:false,mis:'sunk-subscription'}],
   hint:'Which subscriptions earn their cost at the NEW prices?',
   good: bUsed?`Right: both earn their keep at ${v.money(total)}/year \u2014 the audit says keep, not panic.`:`Right: ${v.money(total)} drops to ${v.money(aYear)}/year. The hike did its job as a reminder.`,
   bad: bUsed?`Re-audit at the new prices: ${a} is used daily (${v.money(aYear)}/year) and ${b} earns its ${v.money(bYear)}/year too. Keep both.`:`Re-audit at the new prices: ${a} earns its ${v.money(aYear)}/year; ${b} at "${bUsed?'a few times a month':'twice ever'}" does not earn ${v.money(bYear)}/year. Cut ${b}.`,
   why: bUsed?`A price hike is a prompt to re-audit, not an order to cancel. Both subscriptions still earn their cost \u2014 ${v.money(total)}/year for real, recurring value.`:`Price hikes count on you not noticing. Each one is a free reminder: would you sign up today at this price? For ${b}, the answer is no \u2014 cancel it and keep ${v.money(bYear)}/year.`};
 }},
 {t:'tool',screen:'subscriptions',h:'Audit your subscriptions',body:'<p>List yours and see the yearly total - the number that actually matters.</p>',cta:'Open the subscription tracker'}
]},
'credit-cards':{intro:'Borrowed money has a price.',steps:[
 {t:'teach',h:'The balance that would not shrink',
  body:'<p>Maya puts <b>$240</b> on her card and pays <b>$25</b>. Next month she expects to owe $215.</p><p>She owes <b>$219.80</b>. The extra $4.80 is <b>interest</b> \u2014 the price of borrowing \u2014 charged every month on whatever is left.</p><p>Pay $25, owe $219.80. The debt shrinks slower than the payments.</p>'},
 {t:'teach',h:'APR, minimums, and fees',
  body:'<p>The vocabulary, now that you have felt the bite:</p><ul><li><b>APR</b> = the <b>yearly</b> rate. Monthly rate = APR \u00f7 12. A 24% APR charges about 2% a month.</li><li><b>Minimum payment</b> = the smallest the card allows \u2014 not a plan. The rest keeps charging interest every month.</li><li><b>Fees:</b> late fee (dodge it: pay on time), annual fee (dodge it: pick a no-annual-fee card), cash-advance fee (dodge it: never take cash advances).</li></ul><p class="sub">Learning tool, not financial advice. Every example here uses fictional money. Real cards have terms that change — the cardholder agreement is the source of truth.</p>'},
 {t:'example',h:'Maya pays $25 a month',story:'<p>Maya owes <b>$240</b> at 24% APR \u2014 about 2% a month. She pays <b>$25/month</b>.</p>',
  points:['Month 1: $240 + $4.80 interest \u2212 $25 = <b>$219.80</b>','Every month, the 2% applies to what is LEFT \u2014 not the original $240','It takes about <b>11 payments</b> to clear it','Total extra lost to interest: about <b>$30</b>. Paying in full would have cost $0.']},
 {t:'try',skill:'apr-to-monthly',tier:'guided',
  gen:(v)=>{
   const apr=v.pick([12,18,24,30]);
   const m=apr/12;
   const mLabel=m%1===0?String(m):m.toFixed(1);
   return {
    q:`A credit card charges ${apr}% APR. About what is the monthly interest rate?`,
    choices:[
     {label:`${mLabel}% a month`,ok:true},
     {label:`${apr}% a month`,ok:false,mis:'apr-as-monthly'},
     {label:`${mLabel}% a year`,ok:false,mis:'no-conversion'},
     {label:`${m/10}% a month`,ok:false}],
    cue:`APR is the YEARLY rate. What operation splits one yearly rate into 12 monthly pieces?`,
    hint:'Yearly \u00f7 12 = monthly.',
    good:`Right: ${apr}% \u00f7 12 = ${mLabel}% a month.`,
    bad:`Divide the yearly rate by 12 months: ${apr} \u00f7 12 = ${mLabel}% a month \u2014 not ${apr}%.`,
    why:'APR is always the yearly number. Using it as the monthly rate overcharges by 12\u00d7.'};
  }},
 {t:'try',skill:'min-payment-cost',tier:'independent',
  gen:(v)=>{
   const bal=v.pick([180,210,240,300]);
   const pay=v.pick([20,25,30]);
   const r=0.02;
   let b=bal, months=0, paid=0;
   while(b>0.005&&months<600){const i=b*r;b+=i;const p=Math.min(pay,b);b-=p;paid+=p;months++;}
   const interest=v.money(Math.round((paid-bal)*100)/100);
   const quick=Math.ceil(bal/pay);
   return {
    q:`${v.person()} owes ${v.money(bal)} on a card at 24% APR and pays ${v.money(pay)} a month. About how long until it is gone \u2014 and roughly how much extra goes to interest?`,
    choices:[
     {label:`About ${months} months, roughly ${interest} extra to interest`,ok:true},
     {label:`${quick} payments, $0 interest \u2014 the payments just divide it up`,ok:false,mis:'min-payment-trap'},
     {label:`About ${months} months, $0 interest \u2014 ${v.money(pay)} beats the minimum, so interest stops`,ok:false,mis:'min-payment-trap'},
     {label:`It never clears \u2014 the interest eats every payment`,ok:false,mis:'interest-eats-all'}],
    hint:'Interest charges every month on what is LEFT. The payments shrink it, but slower than they look.',
    good:`Right: about ${months} payments, roughly ${interest} lost to interest.`,
    bad:`Month by month at 2%: the ${v.money(bal)} shrinks by less than ${v.money(pay)} each time. About ${months} months, roughly ${interest} in interest.`,
    why:`Paying more than the minimum is still not a payoff plan by itself \u2014 every leftover dollar keeps charging 2% a month. About ${months} months and ${interest} of interest is the real price.`};
  }},
 {t:'try',skill:'card-fees',tier:'independent',
  gen:(v)=>{
   const fees=[
    ['late fee','pay on time every month','$35.00'],
    ['annual fee','choose a card with no annual fee','$95.00'],
    ['cash-advance fee','never take cash advances on the card','$10.00']];
   const feeRow=v.pick(fees);
   const fee=feeRow[0], how=feeRow[1], amt=feeRow[2];
   const person=v.person();
   return {
    q:`${person}\u2019s statement shows a ${amt} ${fee}. Which card fee was avoidable \u2014 and how?`,
    choices:[
     {label:`The ${fee} \u2014 ${how}`,ok:true},
     {label:`The ${fee} \u2014 it is automatic, so just budget for it`,ok:false,mis:'fee-inevitable'},
     {label:`None of them \u2014 fees are the unavoidable price of having a card`,ok:false,mis:'fee-inevitable'},
     {label:`The ${fee} \u2014 pay it with a different card`,ok:false,mis:'shuffle-fee'}],
    hint:'Each fee has a dodge. Which fee, which dodge?',
    good:`Right: the ${fee} never had to happen \u2014 ${how}.`,
    bad:`The three classic dodges: pay on time (late fee), no-annual-fee cards (annual fee), never cash-advance (cash-advance fee). Here: ${how}.`,
    why:`Fees feel automatic, but each one has an off switch. The move is never "pay it with another card" \u2014 that just moves the cost.`};
  }},
 {t:'try',skill:'card-fees',tier:'stretch',
  gen:(v)=>{
   const bal=v.pick([360,480]);
   const pay=v.pick([45,60]);
   const person=v.person();
   const amort=(start,fee)=>{
    let b=start,m=0,paid=0;
    const r=0.02;
    while(b>0.005&&m<600){m++;if(fee&&m===2)b+=35;const i=b*r;b+=i;const p=Math.min(pay,b);b-=p;paid+=p;}
    return{m,interestC:Math.round((paid-start-(fee?35:0))*100)};
   };
   const A=amort(bal,false), B=amort(bal,true);
   const costA=A.interestC/100, costB=(B.interestC+3500)/100;
   const diffC=(B.interestC+3500)-A.interestC;
   return {
    q:`${person} owes ${v.money(bal)} on a card and pays ${v.money(pay)} a month. Plan A: always on time. Plan B: same, but a $35 late fee hits in month 2. Which plan costs less in the end \u2014 and by about how much?`,
    choices:[
     {label:`Plan A (never late) \u2014 about ${v.money(diffC/100)} cheaper`,ok:true},
     {label:`Plan B \u2014 the fee is only $35, so it barely changes anything`,ok:false,mis:'fee-face-value'},
     {label:`They cost the same \u2014 $35 is $35 either way`,ok:false,mis:'fee-face-value'},
     {label:`Plan A saves exactly $35.00 \u2014 the fee, nothing more`,ok:false,mis:'fee-face-value'}],
    hint:'A fee does not just cost $35. It gets added to what you owe, and then you pay interest on it too.',
    good:`Right: Plan A costs about ${v.money(costA)} in interest; Plan B costs about ${v.money(costB)}. The $35 fee really costs about ${v.money(diffC/100)}.`,
    bad:`Add $35 to month 2\u2019s balance and rerun the months: Plan B runs ${B.m} months at about ${v.money(costB)} total cost vs ${A.m} months and ${v.money(costA)} for Plan A.`,
    why:'Fees compound: the $35 does not sit still \u2014 it joins the balance and charges interest every month after. "Barely changes anything" and "exactly $35" both miss the interest it earns.'};
  }},
 {t:'tool',screen:'adult-life',focus:'credit',h:'See credit in action',body:'<p>Open the credit module and watch what minimum payments do to a balance over time — with fictional money, not yours.</p>',cta:'Open the credit module'}
]},
});

/* ================= MODULES 4 & 5: built from adult-life content ================= */
import { ADULT_LIFE_MODULES, adultPracticeVariants } from './adult-life.js';
import { adultLifeAssessmentForSkill, adultTransferVariants, normalizeAdultChoices } from './adult-life-assessment.js';
import './adult-life-variants.js';

const escHtml=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

function adultLifeLesson(id){
  const m=ADULT_LIFE_MODULES.find(x=>x.id===id);
  if(!m) return {intro:'',steps:[]};
  const correctChoice=m.practice.choices.find(c=>c.id===m.practice.correct);
  const correctFeedback=correctChoice?correctChoice.feedback:'Correct.';
  const steps=[
    {t:'teach',h:m.title+': the move',
     body:'<p>'+escHtml(m.summary)+'</p><p class="sub">Concepts last; rules, amounts, and forms change. When an answer depends on current rules, check the official source - never memorize a number as permanent.</p>'},
    {t:'teach',h:m.title+': what to know',
     body:'<ul>'+m.durableConcepts.map(c=>'<li>'+escHtml(c)+'</li>').join('')+'</ul>'},
    {t:'try',skill:'adult-'+m.skill,tier:'independent',
     gen:(v)=>{
       const vars=adultPracticeVariants(m.id);
       const pv=vars[(v.attempt||0)%vars.length];
       const right=pv.choices.find(c=>c.id===pv.correct);
       const correctFeedback=right?right.feedback:'Correct.';
       return {
         q:pv.prompt,
         choices:pv.choices.map(c=>({label:c.label,ok:c.id===pv.correct,note:c.feedback,mis:c.mis})),
         hint:'Which choice protects the decision process — not just today, but as a habit?',
         good:correctFeedback,
         bad:'Not quite. Read what each choice actually does, then pick the one that protects the process.',
         why:correctFeedback
       };
     }}
  ];
  const transfer=adultLifeAssessmentForSkill(m.skill,'transfer');
  if(transfer){
    steps.push({t:'try',skill:'adult-'+m.skill,tier:'independent',
      gen:(v)=>{
        const vars=adultTransferVariants(m.skill);
        let tv=vars[(v.attempt||0)%vars.length];
        if(v.targetMis){
          const hit=vars.find(x=>normalizeAdultChoices(x.choices).some(c=>!(c.key===x.good)&&c.mis===v.targetMis));
          if(hit) tv=hit;
        }
        const ch=normalizeAdultChoices(tv.choices);
        return {
          q:'Harder — same skill, new situation: '+tv.question,
          choices:ch.map(c=>({label:c.label,ok:c.key===tv.good,mis:c.mis})),
          hint:'Ignore the new surface details. What is the underlying decision?',
          good:'Right. '+tv.help,
          bad:'The situation changed but the skill did not. '+tv.help,
          why:tv.help
        };
      }});
  }
  return {intro:m.summary,steps};
}

Object.assign(LESSON_CONTENT,{
 'banking':adultLifeLesson('banking'),
 'first-job':adultLifeLesson('first-job'),
 'credit':adultLifeLesson('credit'),
 'scams':adultLifeLesson('scams'),
 'renting':adultLifeLesson('renting'),
 'utilities':adultLifeLesson('utilities'),
 'groceries':adultLifeLesson('groceries'),
 'transportation':adultLifeLesson('transportation'),
 'health-insurance':adultLifeLesson('health-insurance')
});

/* ================= MODULE 6: Future Money and Support ================= */
import { BENEFIT_TOPICS } from './benefits.js';

Object.assign(LESSON_CONTENT,{
'future-needs':{intro:'Emergencies are predictable in general and surprising in particular. Plan for the category.',steps:[
 {t:'teach',h:'You cannot predict it. You can still plan for it.',
  body:'<p>Nobody knows <i>when</i> the car will break down, the phone will die, or the medical bill will arrive. But every adult knows they <i>will</i> arrive.</p><p>Emergency money is not pessimism. It is <b>pre-deciding</b>: "when a surprise comes, it comes out of this bucket - not a credit card, not panic."</p><p>A starter emergency fund for a student: <b>$500\u2013$1,000</b>, or about one month of needs. Build it $10\u2013$20 at a time.</p>'},
 {t:'example',h:'Maya builds a buffer',story:'<p>Maya moves $10/week into emergency savings. Nothing dramatic.</p>',diagram:'<svg class="nws-diagram" viewBox="0 0 480 282" role="img" aria-labelledby="dgf-t"> <title id="dgf-t">Ten dollars a week grows the emergency buffer to about 260 dollars at six months and about 520 dollars at a year</title> <rect x="35" y="207" width="110" height="8" fill="var(--muted)"/> <rect x="185" y="125" width="110" height="90" fill="var(--brand)"/> <rect x="335" y="35" width="110" height="180" fill="var(--brand)"/> <text x="90" y="195" text-anchor="middle" font-size="20" font-weight="700" fill="var(--ink)">$0</text> <text x="240" y="113" text-anchor="middle" font-size="20" font-weight="700" fill="var(--ink)">~$260</text> <text x="390" y="23" text-anchor="middle" font-size="20" font-weight="700" fill="var(--ink)">~$520</text> <line x1="10" y1="215" x2="470" y2="215" stroke="var(--ink)" stroke-width="2"/> <text x="90" y="243" text-anchor="middle" font-size="18" fill="var(--ink)">Week 0</text> <text x="240" y="243" text-anchor="middle" font-size="18" fill="var(--ink)">6 months</text> <text x="390" y="243" text-anchor="middle" font-size="18" fill="var(--ink)">12 months</text> <text x="240" y="272" text-anchor="middle" font-size="18" fill="var(--ink)">Nothing dramatic &#8212; $10/week becomes ~$520 in a year</text> </svg>',
  points:['After 6 months: ~$260.','After a year: ~$520.','Then her car needs a $300 repair.','It comes from the buffer. No credit card. No crisis. The plan worked.']},
{t:'try',skill:'emergency-buffer',tier:'guided',
 gen:(v)=>{
  const person=v.person();
  const buffer=v.pick([200,300,400,500]);
  const repair=v.cents(150,650);
  const onCard=+((repair-Math.min(buffer,repair))).toFixed(2);
  const coversAll=onCard===0;
  const correctLabel=coversAll
   ? `Pay the full ${v.money(repair)} from the emergency fund \u2014 $0 on a card`
   : `Use the full ${v.money(buffer)} from the emergency fund, put only ${v.money(onCard)} on the card`;
  const goodMsg=coversAll
   ? `Right: a surprise repair is the fund\u2019s whole job. The card never gets involved.`
   : `Right: the fund absorbs what it can. Only ${v.money(onCard)} becomes debt instead of ${v.money(repair)}.`;
  const badMsg=coversAll
   ? `The fund exists for this exact moment: ${v.money(buffer)} available beats a ${v.money(repair)} surprise. Pay from the fund.`
   : `Fund first, card last: ${v.money(repair)} \u2212 ${v.money(buffer)} = ${v.money(onCard)} on the card.`;
  return {
   q:`${person} has ${v.money(buffer)} in an emergency fund. The car needs a ${v.money(repair)} repair \u2014 a true surprise, and it cannot wait. What is the smartest move?`,
   choices:[
    {label:correctLabel,ok:true},
    {label:`Put the whole ${v.money(repair)} on the credit card and \u201cprotect\u201d the fund`,ok:false,mis:'min-payment-trap'},
    {label:`Spend the ${v.money(buffer)} fund on the planned spring-break trip, card the repair`,ok:false,mis:'emergency-as-savings'},
    {label:`Wait \u2014 most repairs can sit until saving catches up`,ok:false,mis:'defer-forever'}],
   cue:`Emergency money exists for exactly this moment. Spend the fund before you borrow.`,
   hint:'A surprise repair is what the emergency fund is FOR.',
   good:goodMsg,
   bad:badMsg,
   why:`Without a buffer the whole ${v.money(repair)} becomes card debt plus interest. The fund breaks that chain \u2014 that is its entire job.`};
 }},
{t:'try',skill:'emergency-buffer',tier:'independent',
 gen:(v)=>{
  const person=v.person();
  const target=v.pick([500,1000]);
  const weekly=v.pick([10,20]);
  const weeks=target/weekly;
  const slowWeeks=weeks*2;
  const fastWeeks=Math.max(4,Math.round(weeks/4));
  return {
   q:`${person} saves ${v.money(weekly)} every week toward a starter emergency fund of ${v.money(target)}. About how many weeks until the fund is full?`,
   choices:[
    {label:`About ${weeks} weeks \u2014 ${v.money(weekly)} \u00d7 ${weeks} = ${v.money(target)}`,ok:true},
    {label:`About ${slowWeeks} weeks \u2014 small amounts barely move the total`,ok:false,mis:'small-saves-nothing'},
    {label:`About ${fastWeeks} weeks \u2014 steady saving compounds like interest`,ok:false,mis:'savings-compounds'},
    {label:`It never fills \u2014 ${v.money(weekly)} a week is too small to count`,ok:false,mis:'small-saves-nothing'}],
   hint:'Divide the target by the weekly amount.',
   good:`Right: ${v.money(target)} \u00f7 ${v.money(weekly)} = ${weeks} weeks. Small and steady still arrives.`,
   bad:`${v.money(target)} \u00f7 ${v.money(weekly)}/week = ${weeks} weeks. The habit is the engine \u2014 the amount just sets the timeline.`,
   why:`$10\u2013$20 at a time is the whole method. ${v.money(weekly)}/week reaches ${v.money(target)} in ${weeks} weeks \u2014 but only if the habit actually runs.`};
 }},
{t:'try',skill:'emergency-buffer',tier:'independent',
 gen:(v)=>{
  const person=v.person();
  const weekly=v.pick([10,15,20]);
  const total=weekly*52;
  const s1=v.cents(80,200);
  const s2=v.cents(80,200);
  const s3=+((total-s1-s2)).toFixed(2);
  const items=v.shuffle(['car repair','cracked phone screen','urgent dental bill','laptop repair','medical copay','new tire']).slice(0,3);
  return {
   q:`Last year ${person} got hit with three surprises: a ${v.money(s1)} ${items[0]}, a ${v.money(s2)} ${items[1]}, and a ${v.money(s3)} ${items[2]} \u2014 ${v.money(total)} total. Nobody could have predicted the timing. What weekly habit would have covered the whole category?`,
   choices:[
    {label:`${v.money(weekly)}/week into emergency savings \u2014 ${v.money(weekly)} \u00d7 52 = ${v.money(total)}`,ok:true},
    {label:`${v.money(weekly)}/month \u2014 same number, easier schedule`,ok:false,mis:'schedule-swap'},
    {label:`Save only after each surprise hits`,ok:false,mis:'surprises-unplannable'},
    {label:`Nothing \u2014 surprises cannot be planned for, so planning is pointless`,ok:false,mis:'surprises-unplannable'}],
   hint:'You cannot predict the particular. You can fund the category.',
   good:`Right: the category was predictable even though each surprise was not. ${v.money(weekly)}/week covers it.`,
   bad:`Add the year up: ${v.money(s1)} + ${v.money(s2)} + ${v.money(s3)} = ${v.money(total)}. ${v.money(total)} \u00f7 52 weeks = ${v.money(weekly)}/week.`,
   why:`\u201cPredictable category, surprising particular.\u201d Nobody knew which three surprises would come \u2014 but ${v.money(total)} of surprise was always coming. A ${v.money(weekly)}/week habit pre-decides where it comes from.`};
 }},
{t:'try',skill:'emergency-buffer',tier:'stretch',
 gen:(v)=>{
  const person=v.person();
  const weekly=v.pick([10,15,20]);
  const weeksSaved=v.pick([20,26,30]);
  const buffer=weekly*weeksSaved;
  const s1=v.cents(120,260), s2=v.cents(120,260);
  const hit=+((s1+s2)).toFixed(2);
  const onCard=+((hit>buffer?hit-buffer:0)).toFixed(2);
  const interest=Math.round(onCard*24)/100;
  const realCost=v.money(+((hit+interest)).toFixed(2));
  const fullHitInterest=v.money(+((hit+Math.round(hit*24)/100)).toFixed(2));
  const coveredAll=onCard===0;
  const goodMsg=coveredAll
   ? `Right: ${v.money(buffer)} of buffer swallowed ${v.money(hit)} of surprise. The chain broke before the card.`
   : `Right: ${v.money(buffer)} of buffer, ${v.money(onCard)} on the card, ${v.money(interest)} of interest. The buffer shrank the damage.`;
  const badMsg=coveredAll
   ? `The buffer (${v.money(buffer)}) covered the full ${v.money(hit)}. Cost = ${realCost}, interest = $0.00.`
   : `${v.money(hit)} \u2212 ${v.money(buffer)} buffer = ${v.money(onCard)} on the card; a year at 24% APR adds about ${v.money(interest)}. Total: ${realCost}.`;
  const whyMsg=coveredAll
   ? `This is the plan working: a bad month that would have become card debt cost exactly what it cost \u2014 because the buffer was there first.`
   : `Without the buffer the month would have cost ${fullHitInterest}. The ${v.money(buffer)} buffer cut the card balance to ${v.money(onCard)} and the interest to ${v.money(interest)}.`;
  return {
   q:`${person} saved ${v.money(weekly)}/week for ${weeksSaved} weeks \u2014 a ${v.money(buffer)} buffer. Then one bad month brings a ${v.money(s1)} car repair and a ${v.money(s2)} medical copay (${v.money(hit)} total). The buffer pays first; the rest goes on a card at 24% APR and takes a year to clear, adding about ${v.money(interest)} in interest. What did that month really cost?`,
   choices: coveredAll?[
    {label:`${realCost} \u2014 the buffer absorbed all ${v.money(hit)}; no card, no interest`,ok:true},
    {label:`$0 \u2014 that is what emergency funds are for`,ok:false,mis:'emergency-as-savings'},
    {label:`${fullHitInterest} \u2014 card interest applies even when the buffer covers it`,ok:false},
    {label:`${v.money(buffer)} \u2014 the month cost whatever was saved`,ok:false}]
   :[
    {label:`${realCost} \u2014 ${v.money(hit)} of surprises plus ${v.money(interest)} of card interest`,ok:true},
    {label:`${v.money(hit)} \u2014 the minimum payment handles the rest, so interest is not real`,ok:false,mis:'min-payment-trap'},
    {label:`${fullHitInterest} \u2014 the buffer changes nothing; interest applies to the whole ${v.money(hit)}`,ok:false},
    {label:`${v.money(onCard)} \u2014 only the card part counts; the buffer part was free money`,ok:false,mis:'emergency-as-savings'}],
   hint:'Buffer first, card last \u2014 then price the card.',
   good:goodMsg,
   bad:badMsg,
   why:whyMsg};
 }},
 {t:'tool',screen:'save',h:'Start the buffer',body:'<p>Set a savings target and watch small weekly moves add up to a real buffer.</p>',cta:'Open savings tools'}
]},
'benefits-lesson':{intro:'Support programs exist. Learn how to read them correctly.',steps:[
 {t:'teach',h:'Versioned information, not memorized numbers',
  body:'<p>Programs like SSI, SSDI, and ABLE accounts have <b>rules that change</b>: the dollar amounts update every year, and who qualifies depends on your situation.</p><p>So do not memorize numbers. Learn the <b>big ideas that stay true</b>:</p><ul>'+BENEFIT_TOPICS.slice(0,3).map(t=>'<li><b>'+escHtml(t.title)+':</b> '+escHtml(t.summary)+'</li>').join('')+'</ul><p class="sub">Current figures are labeled with their year and source inside the Benefits section. When an answer depends on a current rule, check the official source.</p>'},
 {t:'example',h:'Maya reads a benefit correctly',story:'<p>Maya hears "SSI pays $X a month" from a friend.</p>',
  points:['She checks the Benefits section: the figure is labeled with its year and source.','She reads the <i>stable concept</i>: SSI has income and resource rules; work does not automatically end it.','She does not treat the friend\u2019s number as permanent - she checks the official source.']},
{t:'try',skill:'benefits-basics',tier:'guided',
 gen:(v)=>{
  const person=v.person();
  const program=v.pick(['SSI','SSDI','an ABLE account']);
  const amount='$'+v.int(940,1040);
  return {
   q:`A friend tells ${person}: \u201c${program} pays ${amount} a month \u2014 that is what you would get.\u201d What is the right response?`,
   choices:[
    {label:`Treat it as a lead, not an answer \u2014 check the current year-labeled figure at the official source`,ok:true},
    {label:`Plan around ${amount} \u2014 a number is a number`,ok:false,mis:'hearsay-number'},
    {label:`Add 10% \u2014 friends usually underestimate`,ok:false,mis:'hearsay-number'},
    {label:`Average it with two other friends\u2019 numbers`,ok:false,mis:'hearsay-number'}],
   cue:`The figure is versioned information. What do you do with versioned numbers?`,
   hint:'Concepts last; numbers expire.',
   good:`Right: the stable concept is that ${program} has rules and amounts that change \u2014 the dollar figure must be verified current.`,
   bad:`A friend\u2019s number is a copy of a copy. Amounts change yearly and depend on your situation: check the official source\u2019s current year-labeled figure.`,
   why:`Versioned information goes stale. ${amount} may have been right for its year and situation \u2014 it is not a personal quote.`};
 }},
{t:'try',skill:'benefits-basics',tier:'independent',
 gen:(v)=>{
  const person=v.person();
  const job=v.pick(['a weekend gig','a part-time shift','a campus job']);
  const hours=v.int(8,15);
  return {
   q:`${person} receives SSI and is offered ${job} at ${hours} hours a week. A relative warns: \u201cAny work ends your benefits \u2014 don\u2019t risk it.\u201d What does the stable concept say?`,
   choices:[
    {label:`SSI has income and resource rules \u2014 work does not automatically end it; check the current official rules for ${person}\u2019s situation`,ok:true},
    {label:`The relative is right \u2014 any paycheck ends SSI immediately`,ok:false,mis:'folk-rules'},
    {label:`Work is fine \u2014 SSI has no income rules at all`,ok:false},
    {label:`Old rules still apply \u2014 whatever was true when the relative heard it stays true`,ok:false,mis:'folk-rules'}],
   hint:'Which part is the durable concept, and which part needs a current check?',
   good:`Right: the concept (\u201crules exist, work is not automatic disqualification\u201d) is stable; the exact limits are versioned.`,
   bad:`The stable concept: SSI has income and resource rules, and work does not automatically end it. The current limits for ${person}\u2019s situation live at the official source.`,
   why:`Fear-based advice treats a rumor as a rule. The durable skill is knowing <i>that</i> rules exist, <i>what kind</i> they are, and <i>where</i> to verify them \u2014 then checking.`};
 }},
{t:'try',skill:'benefits-basics',tier:'independent',
 gen:(v)=>{
  const person=v.person();
  const program=v.pick(['SSI','SSDI','an ABLE account']);
  const oldYear=v.pick([2020,2021,2022]);
  const limit=v.money(v.cents(1800,2400));
  return {
   q:`${person} finds an article from ${oldYear} saying ${program}\u2019s limit is ${limit}. The Benefits section shows a newer year-labeled figure from the official source. Which number should ${person} plan around?`,
   choices:[
    {label:`The newer official figure \u2014 the ${oldYear} number has expired`,ok:true},
    {label:`The ${oldYear} figure \u2014 published numbers are permanent`,ok:false,mis:'numbers-permanent'},
    {label:`Whichever is higher \u2014 plan optimistically`,ok:false,mis:'optimistic-plan'},
    {label:`Split the difference between the two figures`,ok:false,mis:'average-is-plan'}],
   hint:'What did you learn about versioned information?',
   good:`Right: several rule changes can fit between ${oldYear} and now. The year label tells you which figure is alive.`,
   bad:`Old articles do not update themselves. The ${oldYear} figure expired; the current year-labeled official figure is the one to plan around.`,
   why:`Treating a ${oldYear} number as current is how people plan around money that no longer exists. Year-labeled beats undated, official beats retold.`};
 }},
{t:'try',skill:'benefits-basics',tier:'stretch',
 gen:(v)=>{
  const person=v.person();
  const program=v.pick(['SSI','SSDI']);
  const amount='$'+v.int(900,1100);
  const ruleClaim=v.pick(['the amount is identical for every recipient','working any hours ends the benefit immediately','there are no limits of any kind']);
  return {
   q:`A viral video with 2M views says ${program} pays ${amount} a month and that ${ruleClaim}. ${person} wants to know what applies to them. What is the most reliable next step?`,
   choices:[
    {label:`Check the program\u2019s official site \u2014 current rules, and how they apply to ${person}\u2019s situation`,ok:true},
    {label:`Trust the video \u2014 2M views means it was fact-checked`,ok:false,mis:'unverified-source'},
    {label:`Use ${amount} in the budget \u2014 the video\u2019s number is specific, so it is current`,ok:false,mis:'unverified-source'},
    {label:`Ask a friend who receives ${program} what they get`,ok:false,mis:'unverified-source'}],
   hint:'Who actually writes the rules \u2014 and whose situation is it?',
   good:`Right: the rule-writer outranks every retelling, and eligibility is individual.`,
   bad:`Views are not verification. The official source is current by definition \u2014 and only it can say what ${person} qualifies for.`,
   why:`Two versioned-information traps at once: a dollar figure that expires, and a blanket rule claim about a program whose rules are individual. The official source resolves both.`};
 }},
 {t:'tool',screen:'benefits',h:'Explore the Benefits section',body:'<p>See how figures are year-labeled and sourced - and where the official links live.</p>',cta:'Open Benefits'}
]},
'decision-routine':{intro:'Put the whole routine together on one real scenario.',steps:[
 {t:'teach',h:'The full NWS decision routine',
  body:'<p>Everything in this course compresses into one routine. Run it whenever money arrives or a big decision looms:</p><ol><li><b>Available?</b> Balance \u2212 scheduled, pending, and promised money.</li><li><b>How long?</b> How much time must it cover?</li><li><b>Needs first.</b> Protect every required cost.</li><li><b>Savings next.</b> Move future money aside before spending.</li><li><b>Pace it.</b> Safe money \u00f7 time = your speed limit.</li><li><b>Spend smart.</b> Was I going to buy it anyway? What will I actually use?</li><li><b>Overspent?</b> Recalculate from what remains - never from the original plan.</li></ol>'},
 {t:'example',h:'Maya runs the whole routine',story:'<p>Maya gets $600 for the month.</p>',
  points:['<b>Available?</b> $600, nothing pending \u2192 $600.','<b>How long?</b> 30 days.','<b>Needs:</b> $350 rent share + food \u2192 protect it.','<b>Savings:</b> $60 to the emergency buffer.','<b>Pace:</b> ($600 \u2212 $350 \u2212 $60) \u00f7 30 = <b>$6.33/day</b>.','<b>Spend smart:</b> the "deal" she sees gets the "was I going to buy it anyway" test.','<b>Overspent mid-month?</b> New pace from what remains.']},
{t:'try',skill:'decision-routine',tier:'guided',
 gen:(v)=>{
  const person=v.person();
  const balance=v.cents(600,1200);
  const scheduled=v.cents(200,450);
  const pending=v.cents(20,80);
  const promised=v.cents(30,90);
  const committed=+((scheduled+pending+promised)).toFixed(2);
  const avail=+((balance-committed)).toFixed(2);
  const availNoPP=+((balance-scheduled)).toFixed(2);
  return {
   q:`${person}\u2019s account shows ${v.money(balance)}. But ${v.money(scheduled)} in rent auto-pays tomorrow, ${v.money(pending)} is pending on a card, and ${v.money(promised)} was promised to a sibling. How much is actually available?`,
   choices:[
    {label:`${v.money(avail)} \u2014 balance minus every dollar that already has a job`,ok:true},
    {label:`${v.money(balance)} \u2014 the balance is what is available`,ok:false,mis:'balance-not-available'},
    {label:`${v.money(availNoPP)} \u2014 only the rent counts; pending and promised are not real yet`,ok:false,mis:'available-means-balance'},
    {label:`$0 \u2014 with that many commitments nothing is safe to touch`,ok:false,mis:'nothing-safe'}],
   cue:`List every dollar that already has a job, add them up, subtract from the balance.`,
   hint:'Available = balance \u2212 scheduled \u2212 pending \u2212 promised.',
   good:`Right: ${v.money(balance)} \u2212 ${v.money(committed)} committed = ${v.money(avail)} available.`,
   bad:`Add the commitments: ${v.money(scheduled)} + ${v.money(pending)} + ${v.money(promised)} = ${v.money(committed)}. ${v.money(balance)} \u2212 ${v.money(committed)} = ${v.money(avail)}.`,
   why:`Step 1 of the routine: the balance lies by omission. Available money is what is left after every scheduled, pending, and promised dollar is honored.`};
 }},
{t:'try',skill:'decision-routine',tier:'independent',
 gen:(v)=>{
  const person=v.person();
  const avail=v.cents(400,800);
  const needs=v.cents(150,350);
  const savings=v.pick([10,15,20]);
  const days=v.int(28,31);
  const safe=Math.round((avail-needs-savings)*100)/100;
  const pace=v.money(Math.round(safe/days*100)/100);
  const paceNoSave=v.money(Math.round((avail-needs)/days*100)/100);
  const paceNoNeeds=v.money(Math.round((avail-savings)/days*100)/100);
  return {
   q:`${person} has ${v.money(avail)} available for ${days} days. Needs take ${v.money(needs)}; ${v.money(savings)} moves to the emergency buffer first. What is the daily pace for everything else?`,
   choices:[
    {label:`${pace}/day \u2014 ${v.money(safe)} safe \u00f7 ${days} days`,ok:true},
    {label:`${paceNoSave}/day \u2014 savings can come from whatever is left`,ok:false,mis:'savings-from-leftovers'},
    {label:`${paceNoNeeds}/day \u2014 needs are flexible if the pace is tight`,ok:false,mis:'needs-are-flexible'},
    {label:`${v.money(safe)}/day \u2014 the whole safe amount, every day`,ok:false,mis:'daily-equals-total'}],
   hint:'Pace = (available \u2212 needs \u2212 savings) \u00f7 days.',
   good:`Right: ${v.money(safe)} safe money \u00f7 ${days} days = ${pace}/day. That is the speed limit.`,
   bad:`Protect first, then divide: ${v.money(avail)} \u2212 ${v.money(needs)} \u2212 ${v.money(savings)} = ${v.money(safe)}; ${v.money(safe)} \u00f7 ${days} = ${pace}/day.`,
   why:`The pace is only honest if needs and savings are protected BEFORE the division. Skip a subtraction and the \u201cspeed limit\u201d is a fantasy that collapses mid-month.`};
 }},
{t:'try',skill:'decision-routine',tier:'independent',
 gen:(v)=>{
  const person=v.person();
  const pair=v.pick([['Headphones','are'],['A jacket','is'],['Sneakers','are'],['A desk lamp','is']]);
  const item=pair[0], verb=pair[1];
  const was=v.pick([true,false]);
  const planned=was?'already planned to buy':'was not planning to buy';
  const price=v.cents(35,90);
  const wasPrice=v.money(+((price+v.cents(10,30))).toFixed(2));
  const goodMsg=was
   ? `Right: planned + on sale = the deal working for the plan.`
   : `Right: unplanned + on sale = the deal working against the plan.`;
  const badMsg=was
   ? `It was on the list before the sale existed. Buying planned items on sale is the routine working.`
   : `The test is not the price \u2014 it is whether the item was already going to be bought. It was not.`;
  const whyMsg=was
   ? `Spend smart asks two questions: \u201cwas I going to buy it anyway?\u201d (yes) and \u201cwhat will I actually use?\u201d The sale only matters because the first answer was already yes.`
   : `A discount on something you were not buying is spending, not saving. The routine\u2019s spend-smart step exists to catch exactly this.`;
  return {
   q:`${item} ${person} ${planned} ${verb} on sale: ${v.money(price)}, down from ${wasPrice}. The pace is tight this month. What does the routine say?`,
   choices: was?[
    {label:`Buy \u2014 it was already on the list; the sale is a real saving`,ok:true},
    {label:`Skip \u2014 any spending at all breaks the pace`,ok:false,mis:'skip-spending-breaks-pace'},
    {label:`Buy two \u2014 the discount doubles`,ok:false,mis:'discount-doubles'},
    {label:`Wait for an even bigger sale`,ok:false,mis:'sale-timing'}]
   :[
    {label:`Skip \u2014 a discount on something unplanned is spending, not saving`,ok:true,mis:'sale-not-needed'},
    {label:`Buy \u2014 ${v.money(price)} is objectively a good price`,ok:false,mis:'sale-not-needed'},
    {label:`Buy \u2014 the pace can absorb one deal`,ok:false,mis:'pace-absorbs'},
    {label:`Buy now, return later if the pace breaks`,ok:false,mis:'return-as-plan'}],
   hint:'The spend-smart test: was I going to buy it anyway?',
   good:goodMsg,
   bad:badMsg,
   why:whyMsg};
 }},
{t:'try',skill:'decision-routine',tier:'stretch',
 gen:(v)=>{
  const person=v.person();
  const balance=v.cents(900,1500);
  const scheduled=v.cents(250,450);
  const pending=v.cents(15,80);
  const needs=v.cents(150,300);
  const savings=v.pick([10,15,20]);
  const days=v.int(28,31);
  const avail=Math.round((balance-scheduled-pending)*100)/100;
  const safe=Math.round((avail-needs-savings)*100)/100;
  const pace=v.money(Math.round(safe/days*100)/100);
  const paceNoSched=v.money(Math.round((balance-needs-savings)/days*100)/100);
  const paceNoSave=v.money(Math.round((avail-needs)/days*100)/100);
  const paceWeekly=v.money(Math.round(safe/7*100)/100);
  return {
   q:`${person} runs the whole routine. Account balance: ${v.money(balance)}. Scheduled: ${v.money(scheduled)} rent autopay. Pending: ${v.money(pending)} card charge. Needs for the stretch: ${v.money(needs)}. Savings move: ${v.money(savings)} to the buffer. ${days} days to cover. What is the daily pace?`,
   choices:[
    {label:`${pace}/day`,ok:true},
    {label:`${paceNoSched}/day \u2014 scheduled and pending come out of next month\u2019s money`,ok:false,mis:'balance-not-available'},
    {label:`${paceNoSave}/day \u2014 savings can wait until month-end`,ok:false,mis:'savings-from-leftovers'},
    {label:`${paceWeekly}/day \u2014 pace is a weekly number`,ok:false,mis:'period-math'}],
   hint:'Available, then needs, then savings, then \u00f7 days. Every step in order.',
   good:`Right: ${v.money(avail)} available \u2212 ${v.money(needs)} needs \u2212 ${v.money(savings)} savings = ${v.money(safe)} \u00f7 ${days} = ${pace}/day.`,
   bad:`Step by step: available = ${v.money(balance)} \u2212 ${v.money(scheduled)} \u2212 ${v.money(pending)} = ${v.money(avail)}; safe = ${v.money(avail)} \u2212 ${v.money(needs)} \u2212 ${v.money(savings)} = ${v.money(safe)}; pace = ${v.money(safe)} \u00f7 ${days} = ${pace}/day.`,
   why:`The order IS the routine \u2014 skip a subtraction and the pace is a fantasy. ${pace}/day is the true speed limit.`};
 }},
]}
});
