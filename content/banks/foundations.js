// NWS variation bank: foundations — 50 confirmed templates per lesson.
// nws-routine: parts 1-3 | available-money: parts 3-5 | depends-decisions: parts 5-8
// Tier rule: guided on part-3 templates (with cue), stretch on part-8 templates, independent elsewhere.
export const BANK_FOUNDATIONS = {
'nws-routine': [
 // ---- choice x8 (parts 1-3) ----
 { id:'nws-routine-choice-01', verb:'choice', part:1, tier:'independent', skill:'nws-routine',
  gen:(v)=>{
   const person=v.person();
   const rent=v.money(Math.round(v.cents(650,950)*100)/100);
   const game=v.money(Math.round(v.cents(45,70)*100)/100);
   return {
    q:`${person} sorts three things: rent (${rent}), a ${game} video game, and $40 for savings. Which one is a Need?`,
    choices:[
     {label:`Rent (${rent}) — it keeps a roof over ${person}`, ok:true},
     {label:`The ${game} video game — fun is a need`, ok:false, mis:'needs-are-flexible'},
     {label:`The $40 for savings — savings come first`, ok:false, mis:'savings-from-leftovers'},
     {label:`Whichever costs the most`, ok:false, mis:'price-decides-need'},
    ],
    hint:'A Need keeps you safe, healthy, or functioning right now.',
    good:`Right. Rent keeps ${person} housed — a Need. The game is a Want; savings is its own bucket.`,
    bad:'Check the definition: a Need keeps you safe, healthy, or functioning right now. Only one of the three does that.',
    why:'Needs are about function — what breaks if it is missing? Rent has an answer; the game does not.'};
  }},
 { id:'nws-routine-choice-02', verb:'choice', part:1, tier:'independent', skill:'nws-routine',
  gen:(v)=>{
   const person=v.person();
   const sub=v.money(Math.round(v.cents(12,18)*100)/100);
   const groc=v.money(Math.round(v.cents(55,85)*100)/100);
   return {
    q:`${person} has a ${sub}/month streaming subscription and ${groc} of groceries. Which is a Want?`,
    choices:[
     {label:`The ${sub} streaming subscription — life works without it`, ok:true},
     {label:`The ${groc} of groceries`, ok:false},
     {label:`Both — everything you pay for is a Want`, ok:false, mis:'sort-dodge'},
     {label:`Neither — subscriptions are bills, so they are Needs`, ok:false, mis:'needs-are-flexible'},
    ],
    hint:'A Want is nice to have, but life works without it.',
    good:`Right. Streaming is nice; skipping it changes nothing essential. Groceries keep ${person} fed.`,
    bad:'Ask of each: does life still work without it? Groceries pass the test for Need; streaming does not.',
    why:'A Want is defined by what happens without it — nothing breaks. That is the whole test.'};
  }},
 { id:'nws-routine-choice-03', verb:'choice', part:1, tier:'independent', skill:'nws-routine',
  gen:(v)=>{
   const person=v.person();
   const amt=v.int(25,80);
   return {
    q:`On payday, ${person} moves $${amt} to an emergency fund before spending anything. Which bucket did that money land in?`,
    choices:[
     {label:'Savings — money moved to later', ok:true},
     {label:'Need — it might be needed someday', ok:false, mis:'savings-means-no-spending'},
     {label:'Want — saving is optional', ok:false, mis:'savings-skippable'},
     {label:'None — it is just sitting there', ok:false, mis:'sort-dodge'},
    ],
    hint:'Savings is money with a job in the future.',
    good:`Right. Moving money aside for later — a goal or a surprise — is exactly what Savings means.`,
    bad:'The money was moved to later on purpose. Which bucket is "money for later"?',
    why:'Savings is not what is left over; it is money deliberately given a future job.'};
  }},
 { id:'nws-routine-choice-04', verb:'choice', part:1, tier:'independent', skill:'nws-routine',
  gen:(v)=>{
   const person=v.person();
   const place=v.place();
   const fare=v.money(Math.round(v.cents(28,45)*100)/100);
   return {
    q:`${person} buys a ${fare} bus pass at ${place} to get to work. Need, Want, or Savings?`,
    choices:[
     {label:'Need — without it there is no paycheck', ok:true},
     {label:'Want — a car would be nicer', ok:false, mis:'needs-are-flexible'},
     {label:'Savings — paying in advance saves money', ok:false, mis:'not-spending-is-saving'},
     {label:'It depends on how ${person} feels about buses', ok:false, mis:'sort-dodge'},
    ],
    hint:'Work transport protects the income. What breaks without it?',
    good:`Right. No bus pass, no getting to work, no paycheck — that chain makes it a Need.`,
    bad:'Follow the chain: without the pass, what stops? If the answer is "earning money," it is a Need.',
    why:'Some Needs do not look like food and rent. Anything the paycheck depends on is a Need.'};
  }},
 { id:'nws-routine-choice-05', verb:'choice', part:3, tier:'guided', skill:'nws-routine',
  gen:(v)=>{
   const person=v.person();
   return {
    q:`${person} just got paid and wants to run the NWS routine. The four steps are List, Sort, Protect, Spend. Which comes FIRST?`,
    choices:[
     {label:'List — write down what is coming before deciding anything', ok:true},
     {label:'Spend — handle the fun stuff while the money is there', ok:false, mis:'first-come-first-served'},
     {label:'Protect — move savings out immediately', ok:false},
     {label:'Sort — you can sort from memory', ok:false},
    ],
    cue:'You cannot sort what you cannot see. What step makes everything visible?',
    hint:'Before you can sort, you have to see everything.',
    good:'Right. List first: bills, pay, anything pending. Sorting from memory is how bills get forgotten.',
    bad:'Step one is seeing the whole picture. Which step does that?',
    why:'List comes first because hidden bills are the ones that blow up the plan. Everything else follows from the list.'};
  }},
 { id:'nws-routine-choice-06', verb:'choice', part:3, tier:'guided', skill:'nws-routine',
  gen:(v)=>{
   const person=v.person();
   const pay=v.money(v.int(520,780));
   const rent=v.money(Math.round(v.cents(400,520)*100)/100);
   const shoes=v.money(Math.round(v.cents(85,130)*100)/100);
   return {
    q:`${person} gets a ${pay} paycheck. On the list: rent (${rent}, due Friday), $50 promised to savings, and ${shoes} sneakers. The routine says Protect before Spend. What does that mean here?`,
    choices:[
     {label:`Rent and the $50 savings move are handled before the sneakers`, ok:true},
     {label:`Buy the sneakers first — the sale ends today`, ok:false, mis:'sale-not-needed'},
     {label:`Split it three ways so nobody feels left out`, ok:false, mis:'even-split'},
     {label:`Pay rent, buy the sneakers, save what is left`, ok:false, mis:'savings-from-leftovers'},
    ],
    cue:'Protect = Needs first, then Savings. Wants are decided last, from what is left.',
    hint:'Needs first, then Savings, then Wants — in that order.',
    good:`Right. Rent is a Need and the $50 already has a job. Sneakers are a Want — they wait for what is left.`,
    bad:'Put them in order: which is the Need, which is the promised Savings, which is the Want?',
    why:'Protect means the important jobs get filled before the fun ones. Order is the whole trick.'};
  }},
 { id:'nws-routine-choice-07', verb:'choice', part:3, tier:'guided', skill:'nws-routine',
  gen:(v)=>{
   const person=v.person();
   const left=v.money(Math.round(v.cents(60,120)*100)/100);
   return {
    q:`${person} ran the routine: Needs protected, savings moved, and ${left} is left over. When is it okay to spend it on Wants?`,
    choices:[
     {label:'Now — that is literally what the leftover is for, guilt-free', ok:true},
     {label:'Never — spending it undoes the whole routine', ok:false, mis:'save-everything'},
     {label:'Only if nothing fun comes up later this month', ok:false},
     {label:'It should have been spent first, before the bills', ok:false, mis:'first-come-first-served'},
    ],
    cue:'Step 4 of the routine is literally called Spend. What is it for?',
    hint:'The routine ends with a step on purpose.',
    good:`Right. Wants decided last, from what is left, are guilt-free by design — the Needs and Savings are already safe.`,
    bad:'Re-read the four steps. The last one exists for a reason — what is it?',
    why:'The routine is not anti-fun. It puts fun last so fun never steals from rent or savings.'};
  }},
 { id:'nws-routine-choice-08', verb:'choice', part:3, tier:'guided', skill:'nws-routine',
  gen:(v)=>{
   const person=v.person();
   const takeout=v.money(Math.round(v.cents(28,45)*100)/100);
   const save=v.int(30,60);
   return {
    q:`${person} usually moves $${save} to savings on payday. This week ${person} wants ${takeout} takeout instead and thinks, "I will just skip savings once." What does the routine say?`,
    choices:[
     {label:`Move the $${save} first — savings is a promise, not a suggestion`, ok:true},
     {label:`Skip it once — one week will not matter`, ok:false, mis:'savings-skippable'},
     {label:`Skip it and save double next week`, ok:false, mis:'savings-from-leftovers'},
     {label:`Takeout is food, so it counts as the Need — no conflict`, ok:false, mis:'needs-are-flexible'},
    ],
    cue:'"Skip it once" is the classic trap. What does Protect say about Savings?',
    hint:'Savings gets protected before Wants — even small, even this week.',
    good:`Right. "Once" is how the habit dies. The $${save} moves first; takeout competes with what is left, not with savings.`,
    bad:'Which bucket is the takeout, and which is the savings? The routine protects them in a fixed order.',
    why:'Savings skipped "once" becomes skipped always. Protecting it first is what makes the amount small but the habit big.'};
  }},
 // ---- sort x6 (part 2) ----
 { id:'nws-routine-sort-01', verb:'sort', part:2, tier:'independent', skill:'nws-routine',
  gen:(v)=>{
   const person=v.person();
   const items=[
    ['Rent for the month','need','Housing keeps you safe — a Need.'],
    ['Groceries for the week','need','Food that keeps you going — a Need.'],
    ['New video game','want','Fun, but life works without it — a Want.'],
    ['$30 to the emergency fund','savings','Money moved to later — Savings.'],
    ['Electric bill','need','The lights stay on — a Need.'],
    ['Concert tickets with friends','want','A great night, but optional — a Want.'],
    ['Birthday gift savings jar','savings','Money for a future goal — Savings.'],
   ];
   const picked=v.shuffle(items).slice(0,7);
   return { h:`Sort it: ${person}'s money week`, body:'<p>Put each item in the right NWS bucket.</p>',
    buckets:['Need','Want','Savings'],
    items:picked.map(x=>({label:x[0],a:x[1],why:x[2]}))};
  }},
 { id:'nws-routine-sort-02', verb:'sort', part:2, tier:'independent', skill:'nws-routine',
  gen:(v)=>{
   const pay=v.int(480,760);
   const list=[
    ['Bus fare to work','need','Getting to work protects the paycheck — a Need.'],
    ['Phone bill','need','The phone carries work schedules and safety — a Need.'],
    ['Streaming subscription','want','Entertainment that can pause — a Want.'],
    ['Lunch out twice a week','want','Food is a Need; restaurant lunch is a Want.'],
    ['$25 weekly savings move','savings','A promised move to later — Savings.'],
    ['Work boots (old ones have holes)','need','Broken boots on a standing shift — a Need.'],
    ['New phone case (old one is fine)','want','The old case works — a Want.'],
   ];
   return { h:`Sort it: payday $${pay}`, body:'<p>The paycheck just landed. Sort where each dollar should go first.</p>',
    buckets:['Need','Want','Savings'],
    items:v.shuffle(list).slice(0,7).map(x=>({label:x[0],a:x[1],why:x[2]}))};
  }},
 { id:'nws-routine-sort-03', verb:'sort', part:2, tier:'independent', skill:'nws-routine',
  gen:(v)=>{
   const person=v.person();
   const list=[
    ['Groceries: rice, beans, eggs','need','Basic food — a Need.'],
    ['Groceries: imported snacks for the pantry','want','Fancy extras on top of real food — a Want.'],
    ['Shoes for work (soles worn through)','need','Function for the job — a Need.'],
    ['Shoes because the colorway is cool','want','Style on top of working shoes — a Want.'],
    ['$10 into the "new laptop" fund','savings','Money for a future goal — Savings.'],
    ['Eating out because cooking feels like a chore','want','The Need (food) is covered at home — the rest is a Want.'],
    ['Prescription refill','need','Health — a Need.'],
   ];
   return { h:`Sort it: the tricky ones`, body:`<p>${person} keeps mixing these up. Sort carefully — looks can lie.</p>`,
    buckets:['Need','Want','Savings'],
    items:v.shuffle(list).slice(0,7).map(x=>({label:x[0],a:x[1],why:x[2]}))};
  }},
 { id:'nws-routine-sort-04', verb:'sort', part:2, tier:'independent', skill:'nws-routine',
  gen:(v)=>{
   const list=[
    ['Emergency fund deposit','savings','Surprise money — Savings.'],
    ['Vacation jar deposit','savings','A future goal — Savings.'],
    ['Rent','need','Housing — a Need.'],
    ['New jacket (old one works)','want','A second jacket is optional — a Want.'],
    ['Car insurance','need','Legal and protective — a Need.'],
    ['Concert livestream ticket','want','Fun from the couch — a Want.'],
    ['"Oops" fund for surprise bills','savings','Buffer money — Savings.'],
   ];
   return { h:'Sort it: where savings hides', body:'<p>Some of these are savings in disguise. Find them.</p>',
    buckets:['Need','Want','Savings'],
    items:v.shuffle(list).slice(0,7).map(x=>({label:x[0],a:x[1],why:x[2]}))};
  }},
 { id:'nws-routine-sort-05', verb:'sort', part:2, tier:'independent', skill:'nws-routine',
  gen:(v)=>{
   const person=v.person();
   const list=[
    ['Winter coat — owns none and it is November','need','Health and safety with no alternative — a Need.'],
    ['Winter coat — already owns a warm one','want','The second coat is optional — a Want.'],
    ['Laptop — required for classes','need','Required to function as a student — a Need.'],
    ['Laptop — mostly for games','want','Same object, different job — a Want.'],
    ['Haircut before a job interview','need','Function for earning — a Need.'],
    ['Haircut just because, third this month','want','Maintenance beyond function — a Want.'],
    ['$20 to savings','savings','Moved to later — Savings.'],
   ];
   return { h:`Sort it: ${person}'s context check`, body:'<p>Same item, different context. Read the whole line before you sort.</p>',
    buckets:['Need','Want','Savings'],
    items:v.shuffle(list).slice(0,7).map(x=>({label:x[0],a:x[1],why:x[2]}))};
  }},
 { id:'nws-routine-sort-06', verb:'sort', part:2, tier:'independent', skill:'nws-routine',
  gen:(v)=>{
   const list=[
    ['Rent due Friday','need','Due now — protect first.'],
    ['Electric bill due next week','need','Still a Need, just later — protect second.'],
    ['Snacks for the game night','want','Fun — decided last.'],
    ['$40 savings move','savings','Promised to later — protect before Wants.'],
    ['New game release day purchase','want','Day-one hype — a Want.'],
    ['Bus pass renewal','need','Work transport — a Need.'],
   ];
   return { h:'Sort it: the protect order', body:'<p>Sort each item — and notice the order the routine would protect them in.</p>',
    buckets:['Need','Want','Savings'],
    items:v.shuffle(list).slice(0,6).map(x=>({label:x[0],a:x[1],why:x[2]}))};
  }},
 // ---- decide x8 (part 3, guided) ----
 { id:'nws-routine-decide-01', verb:'decide', part:3, tier:'guided', skill:'nws-routine',
  gen:(v)=>{
   const person=v.person();
   const gas=v.money(Math.round(v.cents(22,32)*100)/100);
   const ticket=v.money(Math.round(v.cents(28,42)*100)/100);
   const cash=v.int(55,80);
   return {
    q:`${person} has $${cash} until Friday. The car needs ${gas} of gas to get to work, and friends invite ${person} to a ${ticket} concert tonight. What is the call?`,
    choices:[
     {label:`Gas first, then see if the concert still fits`, ok:true},
     {label:`Concert first — ${person} can figure out gas later`, ok:false, mis:'first-come-first-served'},
     {label:`Skip both and save the whole $${cash}`, ok:false, mis:'save-everything'},
     {label:`Buy the ticket — it is cheaper than the gas`, ok:false, mis:'price-only-decision'},
    ],
    cue:'Sort first: which one is the Need (protects the paycheck)? Which is the Want?',
    hint:'The Need protects the income. The Want waits for what is left.',
    good:`Gas first: $${cash} − ${gas} leaves room, and the ${ticket} ticket may still fit — work AND concert covered.`,
    bad:`Ticket first leaves about $${cash - Math.round(parseFloat(ticket.slice(1))*100)/100} — short of the gas needed to earn. The routine protects the Need (getting to work) before the Want.`,
    why:'Needs protect the income that funds everything else. A Want that risks the paycheck is never the right first call.'};
  }},
 { id:'nws-routine-decide-02', verb:'decide', part:3, tier:'guided', skill:'nws-routine',
  gen:(v)=>{
   const person=v.person();
   const pay=v.int(600,820);
   const rent=v.money(Math.round(v.cents(420,560)*100)/100);
   const drop=v.money(Math.round(v.cents(95,140)*100)/100);
   return {
    q:`${person} gets a $${pay} paycheck. Rent (${rent}) is due Friday, $60 is promised to savings, and a limited ${drop} sneaker drop ends tonight. What is the call?`,
    choices:[
     {label:'Rent and the $60 move first; sneakers only if money is left', ok:true},
     {label:'Grab the sneakers now — limited drops do not wait', ok:false, mis:'sale-not-needed'},
     {label:'Split the paycheck evenly three ways', ok:false, mis:'even-split'},
     {label:'Pay rent, buy the sneakers, and save whatever is left', ok:false, mis:'savings-from-leftovers'},
    ],
    cue:'List → Sort → Protect → Spend. Where do sneakers fall in the protect order?',
    hint:'Limited does not change the bucket. Sort first.',
    good:`Rent protected, $60 moved to savings, then the sneakers question gets answered with what is left — no rent risk either way.`,
    bad:`Sneakers first gambles the rent money on hype. If the drop wins and rent loses, ${person} "saved" nothing and owes a late fee.`,
    why:'Urgency is a sales tactic, not a bucket change. The routine sorts by job, not by countdown timer.'};
  }},
 { id:'nws-routine-decide-03', verb:'decide', part:3, tier:'guided', skill:'nws-routine',
  gen:(v)=>{
   const person=v.person();
   const save=v.int(40,70);
   const dinner=v.money(Math.round(v.cents(35,55)*100)/100);
   return {
    q:`Payday. ${person} always moves $${save} to savings first. Tonight a friend invites ${person} to a ${dinner} dinner. ${person} has not moved the savings yet. What is the call?`,
    choices:[
     {label:`Move the $${save} first, then decide on dinner with what is left`, ok:true},
     {label:`Go to dinner — the $${save} can move tomorrow`, ok:false, mis:'savings-skippable'},
     {label:`Skip dinner and move double to savings to be safe`, ok:false, mis:'save-everything'},
     {label:`Dinner is food, and food is a Need — no conflict`, ok:false, mis:'needs-are-flexible'},
    ],
    cue:'Protect means Savings moves BEFORE Wants get decided. What happens if dinner goes first?',
    hint:'The order is the protection. Savings first.',
    good:`$${save} moved aside, dinner decided from the rest. If dinner fits, ${person} goes guilt-free; if not, savings still happened.`,
    bad:`Dinner first means the $${save} competes with a good time — and the good time usually wins. "Tomorrow" becomes never.`,
    why:'Protecting savings first is not about the amount; it is about removing the decision from the moment of temptation.'};
  }},
 { id:'nws-routine-decide-04', verb:'decide', part:3, tier:'guided', skill:'nws-routine',
  gen:(v)=>{
   const person=v.person();
   const bill=v.money(Math.round(v.cents(60,110)*100)/100);
   const left=v.money(Math.round(v.cents(90,150)*100)/100);
   return {
    q:`Mid-week, ${person} gets a surprise ${bill} medical bill — due now. ${person} has ${left} left after protecting rent, and savings are untouched. What is the call?`,
    choices:[
     {label:'Pay it from the leftover — that is what the buffer is for', ok:true},
     {label:'Ignore it until next payday — rent is already handled', ok:false, mis:'sort-dodge'},
     {label:'Pull it from savings and skip rebuilding savings this month', ok:false, mis:'savings-means-no-spending'},
     {label:'Put it on a credit card and deal with it later', ok:false, mis:'first-come-first-served'},
    ],
    cue:'The routine left money unassigned after Protect. What job does unassigned money do when surprises hit?',
    hint:'Surprises are why the leftover exists.',
    good:`The ${bill} gets paid from the ${left} leftover — the routine absorbed the surprise without touching rent or the savings habit.`,
    bad:`Ignoring it turns a ${bill} bill into fees and stress. The leftover exists exactly for "due now" surprises.`,
    why:'A good routine does not prevent surprises; it leaves room for them. The unspent remainder is a shock absorber.'};
  }},
 { id:'nws-routine-decide-05', verb:'decide', part:3, tier:'guided', skill:'nws-routine',
  gen:(v)=>{
   const person=v.person();
   const place=v.place();
   const sale=v.money(Math.round(v.cents(18,30)*100)/100);
   return {
    q:`${person} is at ${place} and spots a ${sale} shirt on clearance — 60% off. The closet at home is full and rent week starts Monday. What is the call?`,
    choices:[
     {label:'Walk away — a discount on something unneeded is still spending', ok:true},
     {label:'Buy it — 60% off means it is basically a Need', ok:false, mis:'cheap-means-need'},
     {label:'Buy two — the savings are too good to pass up', ok:false, mis:'sale-not-needed'},
     {label:'Buy it and skip one savings move to cover it', ok:false, mis:'savings-skippable'},
    ],
    cue:'Ask "what is it for, right now?" — does the answer change because of the red tag?',
    hint:'The price tag does not change the bucket.',
    good:`Walked away. The ${sale} stayed in the account, rent week stays calm, and nothing was "saved" by spending.`,
    bad:`The red tag moved a Want to the front of the line — ahead of rent week. Discounts do not re-sort buckets.`,
    why:'"On sale" describes the price, not the job. A Want on sale is still a Want, and rent week does not care about the discount.'};
  }},
 { id:'nws-routine-decide-06', verb:'decide', part:3, tier:'guided', skill:'nws-routine',
  gen:(v)=>{
   const person=v.person();
   const a=v.money(Math.round(v.cents(40,60)*100)/100);
   const b=v.money(Math.round(v.cents(40,60)*100)/100);
   const left=v.int(70,100);
   return {
    q:`After Protect, ${person} has $${left} for Wants. Two options: a ${a} game and a ${b} dinner out — together they cost more than $${left}. What is the call?`,
    choices:[
     {label:'Pick one this week — the other waits for a future leftover', ok:true},
     {label:'Get both — Wants money is guilt-free, so limits do not apply', ok:false, mis:'needs-are-flexible'},
     {label:'Get both and pull the difference from savings', ok:false, mis:'savings-skippable'},
     {label:'Get neither — spending any of it breaks the routine', ok:false, mis:'save-everything'},
    ],
    cue:'Guilt-free does not mean limit-free. What is the actual number available for Wants?',
    hint:'Wants are guilt-free inside the leftover — not beyond it.',
    good:`One Want now, one later. The $${left} boundary holds, and next week brings a fresh decision.`,
    bad:`Both blows past $${left} and raids savings — the "guilt-free" part only works inside the leftover.`,
    why:'The routine gives Wants a budget, not a blank check. Choosing between Wants is the skill the routine is building.'};
  }},
 { id:'nws-routine-decide-07', verb:'decide', part:3, tier:'guided', skill:'nws-routine',
  gen:(v)=>{
   const person=v.person();
   const groc=v.money(Math.round(v.cents(45,70)*100)/100);
   const take=v.money(Math.round(v.cents(22,35)*100)/100);
   return {
    q:`${person} needs food for the week. Option one: ${groc} of groceries. Option two: ${take} of takeout tonight, then figure out the rest later. The fridge is empty. What is the call?`,
    choices:[
     {label:`Groceries — ${groc} feeds the whole week; takeout feeds one night`, ok:true},
     {label:'Takeout tonight — hunger now beats planning later', ok:false, mis:'first-come-first-served'},
     {label:'Takeout — it is still food, so the Need is covered either way', ok:false, mis:'needs-are-flexible'},
     {label:'Neither — skip eating out AND groceries to save more', ok:false, mis:'save-everything'},
    ],
    cue:'Same bucket (food = Need), different efficiency. Which one actually covers the week?',
    hint:'Both are "food" — but only one feeds seven days.',
    good:`Groceries cover the Need for the week. Takeout covers one evening and leaves six days unsolved.`,
    bad:`${take} tonight feels like solving food, but the empty fridge is still empty tomorrow — and the money is gone.`,
    why:'Inside a bucket, efficiency matters. The routine sorts first, then spends the sorted dollars where they cover the most ground.'};
  }},
 { id:'nws-routine-decide-08', verb:'decide', part:3, tier:'guided', skill:'nws-routine',
  gen:(v)=>{
   const person=v.person();
   const bonus=v.int(80,150);
   return {
    q:`${person} gets an unexpected $${bonus} bonus at work. No bills are due and savings are on track. What does the routine say to do?`,
    choices:[
     {label:'Run it through the routine: protect anything exposed, then split the rest', ok:true},
     {label:'It is bonus money — the routine does not apply to windfalls', ok:false, mis:'windfall-exception'},
     {label:'Spend it all immediately — unexpected money is fun money', ok:false, mis:'great-week-splurge'},
     {label:'Save every cent — bonuses must never be enjoyed', ok:false, mis:'save-everything'},
    ],
    cue:'Windfalls still get List → Sort → Protect → Spend. "Unexpected" is not a bucket.',
    hint:'The routine has no exceptions for surprise money.',
    good:`Bonus runs the same four steps: nothing exposed, savings on track, so most of the $${bonus} can split between extra savings and guilt-free Wants.`,
    bad:`"The routine does not apply" is how $${bonus} vanishes with nothing to show — no extra buffer, no planned fun, just gone.`,
    why:'Windfalls test the routine more than paychecks do. Same steps, same order — surprise money gets a job like all the rest.'};
  }},
 // ---- spot x6 (part 3, guided) ----
 { id:'nws-routine-spot-01', verb:'spot', part:3, tier:'guided', skill:'nws-routine',
  gen:(v)=>{
   const person=v.person();
   const pay=v.int(560,740);
   const rent=v.money(Math.round(v.cents(430,540)*100)/100);
   const game=v.money(Math.round(v.cents(60,80)*100)/100);
   return {
    scenario:`<p>${person}\u2019s payday plan ($${pay}):</p><ul><li>Bought a ${game} game on release day</li><li>Dinner out twice</li><li>Rent (${rent}) due Friday — \u201cI\u2019ll figure it out\u201d</li><li>Savings move: $0</li></ul>`,
    q:'What is the mistake here?',
    choices:[
     {label:'Wants were spent first, before Needs and Savings were protected', ok:true},
     {label:`The game was too expensive — Wants should cost under $50`, ok:false, mis:'price-only-decision'},
     {label:'Nothing — the money got spent, which is what money is for', ok:false, mis:'sort-dodge'},
     {label:'The mistake is not saving the entire paycheck', ok:false, mis:'save-everything'},
    ],
    cue:'Check the order: what got decided first, and what got decided never?',
    hint:'Look at what happened first vs what was left for later.',
    good:'Right. The game and dinners (Wants) went first; rent (Need) and savings got whatever was left — the routine backwards.',
    bad:'The amounts are not the problem — the order is. Which bucket got served first?',
    why:'Spending order is the routine. Wants first means Needs gamble on the leftovers.'};
  }},
 { id:'nws-routine-spot-02', verb:'spot', part:3, tier:'guided', skill:'nws-routine',
  gen:(v)=>{
   const person=v.person();
   const bill=v.money(Math.round(v.cents(70,120)*100)/100);
   return {
    scenario:`<p>${person} sorted from memory — no list. Payday went smoothly until Thursday, when a ${bill} insurance autopay hit that ${person} forgot about. The account went negative.</p>`,
    q:'What is the mistake here?',
    choices:[
     {label:'Skipped the List step — sorting from memory misses bills', ok:true},
     {label:`The ${bill} bill is just too big for this budget`, ok:false, mis:'price-only-decision'},
     {label:'The mistake is using autopay at all', ok:false},
     {label:'Nothing — surprise bills happen to everyone', ok:false, mis:'sort-dodge'},
    ],
    cue:'Step 1 exists for exactly this. Which step was skipped?',
    hint:'Memory is not a system. Which routine step fixes that?',
    good:'Right. No List means invisible bills. The routine starts with List precisely so autopays cannot ambush the account.',
    bad:'The bill was knowable — it was on autopay. What step would have surfaced it before payday spending?',
    why:'"I forgot" is a systems failure, not a character flaw. List turns memory into a visible plan.'};
  }},
 { id:'nws-routine-spot-03', verb:'spot', part:3, tier:'guided', skill:'nws-routine',
  gen:(v)=>{
   const person=v.person();
   return {
    scenario:`<p>${person}\u2019s plan: \u201cI\u2019ll pay my bills, live my life, and whatever is left at the end of the month goes to savings.\u201d End of month savings: $0 — three months in a row.</p>`,
    q:'What is the mistake here?',
    choices:[
     {label:'Savings is treated as leftovers instead of a protected step', ok:true},
     {label:'The mistake is paying bills first', ok:false},
     {label:`${person} just needs a bigger paycheck`, ok:false, mis:'price-only-decision'},
     {label:'Nothing — saving $0 is fine if bills are paid', ok:false, mis:'savings-skippable'},
    ],
    cue:'Where does Savings sit in the protect order — before Wants, or after everything?',
    hint:'"Whatever is left" is doing a lot of work in that plan.',
    good:'Right. "Save what is left" means saving competes with every Want all month — and loses. The routine moves savings before Wants.',
    bad:'Three months of $0 is a pattern, not bad luck. Where in the order does savings get decided in this plan?',
    why:'Leftovers are not a savings strategy; they are a hope. Protect puts savings before the spending, not after.'};
  }},
 { id:'nws-routine-spot-04', verb:'spot', part:3, tier:'guided', skill:'nws-routine',
  gen:(v)=>{
   const person=v.person();
   const shoes=v.money(Math.round(v.cents(75,110)*100)/100);
   return {
    scenario:`<p>${person} bought ${shoes} sneakers and logged them as a \u201cNeed\u201d because they were 40% off. The old sneakers are fine. Rent week starts Monday.</p>`,
    q:'What is the mistake here?',
    choices:[
     {label:'A sale price was used to re-label a Want as a Need', ok:true},
     {label:`The shoes cost too much — Needs must be cheap`, ok:false, mis:'price-only-decision'},
     {label:'Nothing — 40% off makes anything a Need', ok:false, mis:'cheap-means-need'},
     {label:'The mistake is logging expenses at all', ok:false, mis:'sort-dodge'},
    ],
    cue:'Ask "what is it for, right now?" — does the discount change the answer?',
    hint:'The red tag changes the price, not the bucket.',
    good:'Right. The discount describes the price; the job (style upgrade, old pair fine) is still a Want. The label was bought, not earned.',
    bad:'Forget the 40% for a second. Old shoes fine, new shoes wanted — which bucket is that?',
    why:'Sale logic smuggles Wants into the Need bucket. The routine sorts by job, and jobs do not go on clearance.'};
  }},
 { id:'nws-routine-spot-05', verb:'spot', part:3, tier:'guided', skill:'nws-routine',
  gen:(v)=>{
   const person=v.person();
   const amt=v.money(Math.round(v.cents(45,75)*100)/100);
   return {
    scenario:`<p>${person} almost bought a ${amt} jacket, put it back, and told a friend: \u201cI saved ${amt} today!\u201d The ${amt} then got spent on takeout.</p>`,
    q:'What is the mistake here?',
    choices:[
     {label:'Not spending is not saving — the money was never moved to Savings', ok:true},
     {label:`The takeout was the real mistake, not the jacket logic`, ok:false},
     {label:'Nothing — skipping a purchase is saving by definition', ok:false, mis:'not-spending-is-saving'},
     {label:`${person} should have bought the jacket AND the takeout`, ok:false, mis:'needs-are-flexible'},
    ],
    cue:'Where did the unspent money actually go? Which bucket received it?',
    hint:'Follow the dollars: did any of them land in Savings?',
    good:'Right. The jacket money just became takeout money. "Saving" only happens when dollars actually move to the Savings bucket.',
    bad:'Track the ${amt}: jacket skipped, then takeout bought. Did Savings ever see a cent?',
    why:'Not-buying feels like saving, but money only counts as saved when it is moved aside. Otherwise it is just unspent — and unspent gets spent.'};
  }},
 { id:'nws-routine-spot-06', verb:'spot', part:3, tier:'guided', skill:'nws-routine',
  gen:(v)=>{
   const person=v.person();
   const fund=v.int(300,600);
   const bill=v.money(Math.round(v.cents(120,200)*100)/100);
   return {
    scenario:`<p>${person} built a $${fund} emergency fund over six months. Then a ${bill} car repair — the car gets ${person} to work — came up. ${person} refused to touch the fund and missed two shifts instead, saying \u201csavings is savings.\u201d</p>`,
    q:'What is the mistake here?',
    choices:[
     {label:'Savings was treated as untouchable, even for the emergency it exists for', ok:true},
     {label:`The fund was too small — $${fund} is not real savings`, ok:false, mis:'price-only-decision'},
     {label:'Nothing — never touching savings is the whole point', ok:false, mis:'savings-means-no-spending'},
     {label:'The mistake is owning a car', ok:false},
    ],
    cue:'What job was the emergency fund given? Did this repair match that job?',
    hint:'Savings has a job too — and this was exactly it.',
    good:'Right. The fund exists for surprises like this. Refusing to use it turned a solvable repair into lost wages.',
    bad:'The fund was built for surprises. A car repair that threatens the paycheck — is that the surprise it was for?',
    why:'Savings is not a museum. Money saved for emergencies and then withheld from an emergency fails at its one job.'};
  }},
 // ---- compare x6 (part 3, guided) ----
 { id:'nws-routine-compare-01', verb:'compare', part:3, tier:'guided', skill:'nws-routine',
  gen:(v)=>{
   const p1=v.person(), p2=v.person();
   const pay=v.int(600,800);
   return {
    context:`<p><b>${p1}:</b> lists everything on payday, sorts into NWS, protects rent + savings, then spends the leftover.</p><p><b>${p2}:</b> spends as things come up from the $${pay} paycheck, and sorts what is left at month end.</p>`,
    q:'Whose approach protects the rent more reliably?',
    choices:[
     {label:`${p1} — the routine protects before spending, not after`, ok:true},
     {label:`${p2} — flexible spending adapts to real life better`, ok:false, mis:'sort-dodge'},
     {label:'Neither — rent gets paid either way if you earn enough', ok:false, mis:'price-only-decision'},
     {label:`${p2} — sorting at month end is the same thing, just later`, ok:false, mis:'savings-from-leftovers'},
    ],
    cue:'One of them decides with the full picture first. Which one?',
    hint:'Protection has to happen before the spending, not after.',
    good:`Right. ${p1} gives rent its job before any Want can claim the dollars. ${p2} lets Wants draft first and hopes rent survives.`,
    bad:'Month-end sorting is an autopsy, not a plan. Who protects rent before spending starts?',
    why:'Order is protection. Decide-first beats hope-later every month.'};
  }},
 { id:'nws-routine-compare-02', verb:'compare', part:3, tier:'guided', skill:'nws-routine',
  gen:(v)=>{
   const p1=v.person(), p2=v.person();
   const amt=v.int(40,70);
   return {
    context:`<p><b>${p1}:</b> moves $${amt} to savings on payday morning, then lives on the rest.</p><p><b>${p2}:</b> spends through the month and moves whatever is left to savings on the 30th.</p>`,
    q:'Who ends the year with more savings?',
    choices:[
     {label:`${p1} — protected savings happen every payday; leftovers rarely exist`, ok:true},
     {label:`${p2} — waiting means saving only what is truly extra`, ok:false, mis:'savings-from-leftovers'},
     {label:'Same — $${amt} is $${amt} either way', ok:false, mis:'price-only-decision'},
     {label:`${p2} — month-end saving is more disciplined`, ok:false, mis:'sort-dodge'},
    ],
    cue:'"Whatever is left" competes with a whole month of Wants. What usually wins?',
    hint:'Think about what the savings competes with in each plan.',
    good:`Right. ${p1}'s $${amt} is decided once, before temptation. ${p2}'s savings fights every dinner, sale, and bored scroll for 30 days.`,
    bad:'In which plan does savings compete with nothing, and in which does it compete with everything?',
    why:'Pay-yourself-first wins because it removes the contest. Leftovers lose because the contest is rigged.'};
  }},
 { id:'nws-routine-compare-03', verb:'compare', part:3, tier:'guided', skill:'nws-routine',
  gen:(v)=>{
   const p1=v.person(), p2=v.person();
   const place=v.place();
   return {
    context:`<p><b>${p1}:</b> makes a grocery list at home, then shops at ${place}.</p><p><b>${p2}:</b> walks the aisles at ${place} and decides in the moment.</p>`,
    q:'Whose food spending fits the routine better?',
    choices:[
     {label:`${p1} — the list is the List step; the store is just execution`, ok:true},
     {label:`${p2} — in-the-moment choices catch the best deals`, ok:false, mis:'sale-not-needed'},
     {label:'Same — both end up with food', ok:false, mis:'price-only-decision'},
     {label:`${p2} — lists are for people who cannot decide`, ok:false, mis:'sort-dodge'},
    ],
    cue:'Which shopper is running List → Sort → Protect → Spend, and which is skipping to Spend?',
    hint:'One of them does step 1 before leaving home.',
    good:`Right. ${p1} decided at home, calm and fed. ${p2} decides hungry, surrounded by marketing — the routine's worst conditions.`,
    bad:'Where does each person do their deciding — before the store, or inside it?',
    why:'The list is the routine in miniature: decide with a clear head, then execute. The aisle is where Wants ambush Needs.'};
  }},
 { id:'nws-routine-compare-04', verb:'compare', part:3, tier:'guided', skill:'nws-routine',
  gen:(v)=>{
   const p1=v.person(), p2=v.person();
   return {
    context:`<p><b>${p1}:</b> pays bills in NWS order — Needs and savings promises first, then Wants.</p><p><b>${p2}:</b> pays whichever bill shows up first, in arrival order.</p>`,
    q:'Whose bill-paying keeps the important stuff safe?',
    choices:[
     {label:`${p1} — important is decided by job, not by arrival time`, ok:true},
     {label:`${p2} — first-come-first-served is the fairest system`, ok:false, mis:'first-come-first-served'},
     {label:'Same — every bill gets paid eventually', ok:false, mis:'sort-dodge'},
     {label:`${p2} — due dates matter more than categories`, ok:false},
    ],
    cue:'Arrival order is random. Is "random" a good way to choose what gets protected?',
    hint:'Fair is not the same as safe. Which system protects Needs?',
    good:`Right. ${p1} protects by importance. ${p2} lets the mail schedule decide — a streaming bill can beat rent just by arriving Tuesday.`,
    bad:'If rent arrives Thursday and a Want-bill arrives Monday, who pays the Want-bill first?',
    why:'First-come-first-served feels fair and protects nothing. Protection needs a ranking, and NWS is the ranking.'};
  }},
 { id:'nws-routine-compare-05', verb:'compare', part:3, tier:'guided', skill:'nws-routine',
  gen:(v)=>{
   const p1=v.person(), p2=v.person();
   const cap=v.int(80,120);
   return {
    context:`<p><b>${p1}:</b> gives Wants a $${cap} weekly cap from the leftover.</p><p><b>${p2}:</b> spends on Wants freely — \u201cI protected rent and savings, so the rest is all fun.\u201d</p>`,
    q:'Whose Want spending is more sustainable?',
    choices:[
     {label:`${p1} — the cap keeps Wants inside the leftover`, ok:true},
     {label:`${p2} — protected bills mean unlimited fun is safe`, ok:false, mis:'needs-are-flexible'},
     {label:'Same — both protected the important stuff', ok:false, mis:'sort-dodge'},
     {label:`${p2} — caps take the joy out of guilt-free spending`, ok:false},
    ],
    cue:'"The rest is all fun" — but how much is "the rest," exactly?',
    hint:'Guilt-free has a number attached. Who knows theirs?',
    good:`Right. ${p1} knows the number ($${cap}). ${p2} never counted the leftover — "the rest" is a feeling, and feelings overspend.`,
    bad:'${p2} protected rent and savings but never measured what is left. Can you spend safely from a number you never computed?',
    why:'Guilt-free spending needs a measured boundary. A cap is not a punishment; it is what makes the fun actually safe.'};
  }},
 { id:'nws-routine-compare-06', verb:'compare', part:3, tier:'guided', skill:'nws-routine',
  gen:(v)=>{
   const p1=v.person(), p2=v.person();
   const raise=v.int(100,200);
   return {
    context:`<p><b>${p1}:</b> gets a $${raise}/month raise and routes half to savings, half to Wants.</p><p><b>${p2}:</b> gets the same raise and lets lifestyle absorb all of it.</p>`,
    q:'Who is using the raise better?',
    choices:[
     {label:`${p1} — the raise got sorted like any other income`, ok:true},
     {label:`${p2} — raises are meant to be enjoyed, that is the point`, ok:false, mis:'windfall-exception'},
     {label:'Same — both earned it, both choose', ok:false, mis:'sort-dodge'},
     {label:`${p2} — saving raise money is overkill`, ok:false, mis:'savings-skippable'},
    ],
    cue:'New income still needs List → Sort → Protect → Spend. Who ran the steps?',
    hint:'A raise is income. Income gets sorted.',
    good:`Right. ${p1} gave the $${raise} jobs — future and fun both win. ${p2}'s raise dissolved into lifestyle with nothing to show.`,
    bad:'Twelve months later: who has a bigger buffer? The raise only builds wealth if some of it gets a savings job.',
    why:'Lifestyle creep eats unsorted raises. Sorting the raise is a one-time decision that pays every month after.'};
  }},
 // ---- predict x6 (part 3, guided) ----
 { id:'nws-routine-predict-01', verb:'predict', part:3, tier:'guided', skill:'nws-routine',
  gen:(v)=>{
   const person=v.person();
   const save=v.int(25,50);
   const takeout=v.money(Math.round(v.cents(30,45)*100)/100);
   return {
    q:`${person} skips the $${save} weekly savings move for a month to cover takeout. What breaks first?`,
    choices:[
     {label:'The savings habit — "just this month" becomes the new normal', ok:true},
     {label:'Nothing — $100 of takeout is harmless', ok:false, mis:'savings-skippable'},
     {label:'The takeout budget — it will run out by week two', ok:false, mis:'price-only-decision'},
     {label:'The rent — skipping savings always hits rent first', ok:false},
    ],
    cue:'The dollars are small. What is big is the pattern being set. What breaks first — the budget, or the habit?',
    hint:'Watch the habit, not just the dollars.',
    good:'Right. Four skipped moves teach the brain that savings is optional. The $${save} is small; the permission is huge.',
    bad:'The math ($${save} × 4) is survivable. What is harder to rebuild — $100, or the automatic habit?',
    why:'Habits break before budgets do. Protecting the small move protects the identity of "someone who saves."'};
  }},
 { id:'nws-routine-predict-02', verb:'predict', part:3, tier:'guided', skill:'nws-routine',
  gen:(v)=>{
   const person=v.person();
   const bal=v.money(Math.round(v.cents(300,420)*100)/100);
   const rent=v.money(Math.round(v.cents(380,480)*100)/100);
   return {
    q:`${person}'s app shows ${bal}. Without listing anything, ${person} spends freely all week. Rent (${rent}) is due Friday. What happens?`,
    choices:[
     {label:'The spending eats rent money — Friday becomes a scramble', ok:true},
     {label:'Nothing — the balance was enough for everything', ok:false, mis:'available-means-balance'},
     {label:'The app will warn ${person} in time', ok:false, mis:'sort-dodge'},
     {label:'Rent will sort itself out', ok:false},
    ],
    cue:'No List means no protection. What is the biggest unprotected bill in the story?',
    hint:'Unsorted dollars go to whatever shows up first.',
    good:'Right. Without a list, every purchase drafts against rent. Friday arrives with an empty account and a due bill.',
    bad:'The balance looked fine on Monday. What did Monday-you not know about Friday?',
    why:'Visible money without a plan is already spent — it just does not know it yet. The list is what reserves rent\'s share.'};
  }},
 { id:'nws-routine-predict-03', verb:'predict', part:3, tier:'guided', skill:'nws-routine',
  gen:(v)=>{
   const person=v.person();
   return {
    q:`${person} runs the full routine every payday for three months — List, Sort, Protect, Spend. What changes first?`,
    choices:[
     {label:'The end-of-month scramble disappears — bills are already covered', ok:true},
     {label:'Income magically increases', ok:false, mis:'price-only-decision'},
     {label:'Nothing — routines do not change money outcomes', ok:false, mis:'sort-dodge'},
     {label:'Wants disappear completely', ok:false, mis:'save-everything'},
    ],
    cue:'The routine does not create money. What does it remove?',
    hint:'Think about what the scramble is made of.',
    good:'Right. Same income, but every bill has its dollars reserved up front. The panic was never about the amount — it was about the order.',
    bad:'Income did not change. So what did? Track where the panic used to come from.',
    why:'Most money stress is sequencing stress. Protect-first turns "will rent clear?" from a weekly fear into a non-event.'};
  }},
 { id:'nws-routine-predict-04', verb:'predict', part:3, tier:'guided', skill:'nws-routine',
  gen:(v)=>{
   const person=v.person();
   const left=v.money(Math.round(v.cents(100,160)*100)/100);
   return {
    q:`${person} protects Needs and savings first, leaving ${left} unassigned. A surprise car repair hits mid-month. What happens?`,
    choices:[
     {label:'The repair gets handled from the leftover — the routine absorbed it', ok:true},
     {label:'The repair wrecks the whole month regardless', ok:false, mis:'sort-dodge'},
     {label:'Savings must be raided — leftovers never cover repairs', ok:false, mis:'savings-means-no-spending'},
     {label:'Nothing — ${left} is too small to matter', ok:false, mis:'price-only-decision'},
    ],
    cue:'Unassigned money after Protect is not "extra" — it has a job. What job?',
    hint:'The leftover is a shock absorber by design.',
    good:'Right. The ${left} was never assigned, so the surprise has somewhere to land without touching rent or savings.',
    bad:'If every dollar were pre-spent, the repair would raid savings. What is different here?',
    why:'Protect-first leaves a remainder on purpose. That remainder is the plan for the unplannable.'};
  }},
 { id:'nws-routine-predict-05', verb:'predict', part:3, tier:'guided', skill:'nws-routine',
  gen:(v)=>{
   const person=v.person();
   const save=v.int(30,60);
   return {
    q:`${person} moves $${save} to savings first every payday for a year, without ever raising the amount. What is true at year end?`,
    choices:[
     {label:`About $${save*52} saved — small moves compound into a real buffer`, ok:true},
     {label:'Barely anything — small amounts are not worth the effort', ok:false, mis:'savings-skippable'},
     {label:'The savings will have been spent on emergencies anyway', ok:false, mis:'savings-means-no-spending'},
     {label:'Nothing changes without a big lump sum', ok:false, mis:'price-only-decision'},
    ],
    cue:'Multiply it out. Then ask: what else did a year of "savings first" build besides dollars?',
    hint:'Do the multiplication: 52 paydays.',
    good:`Right. $${save} × 52 ≈ $${save*52} — plus the identity of someone whose savings happens automatically.`,
    bad:'Run the numbers: $${save} every week for 52 weeks. Small is not the same as nothing.',
    why:'Consistency beats intensity. A small protected move, repeated, outperforms a big intended move that never happens.'};
  }},
 { id:'nws-routine-predict-06', verb:'predict', part:3, tier:'guided', skill:'nws-routine',
  gen:(v)=>{
   const person=v.person();
   const deal=v.money(Math.round(v.cents(55,85)*100)/100);
   return {
    q:`Rent week starts Monday. ${person} sees a ${deal} "deal of the day" on something wanted but unneeded, and buys it Sunday night. What happens Monday?`,
    choices:[
     {label:'Rent week starts short — the deal spent protected money', ok:true},
     {label:'Nothing — deals pay for themselves', ok:false, mis:'sale-not-needed'},
     {label:'The rent gets cheaper somehow', ok:false},
     {label:'It all works out because the item was discounted', ok:false, mis:'cheap-means-need'},
    ],
    cue:'Sunday-night dollars and Monday-morning rent come from the same account. What did the deal draft against?',
    hint:'The calendar does not pause for deals.',
    good:'Right. The ${deal} came from rent week\'s dollars. "Deal of the day" timing is designed to beat the routine\'s timing.',
    bad:'Monday still needs the full rent. Where did Sunday\'s ${deal} come from?',
    why:'Deals exploit timing — they rush the decision past the routine. Protect-first means big known bills outrank surprise discounts.'};
  }},
 // ---- build x5 (part 3, guided) ----
 { id:'nws-routine-build-01', verb:'build', part:3, tier:'guided', skill:'nws-routine',
  gen:(v)=>{
   return { h:'Build it: split the paycheck', cue:'Protect order: Needs first, then Savings, then Wants — make the targets match that order.',
    body:'<p>A $600 paycheck just landed. Build the split the routine would protect.</p>',
    totalDollars:600, buckets:[{id:'needs',label:'Needs'},{id:'savings',label:'Savings'},{id:'wants',label:'Wants'}],
    targets:{needs:380,savings:60,wants:160},
    hint:'Needs first ($380), then Savings ($60), then Wants get the rest ($160).',
    good:'Right: $380 Needs, $60 Savings, $160 Wants. Protection order, then guilt-free fun.',
    bad:'Order matters: cover Needs first, move Savings second, Wants take what is left.',
    why:'The split is the routine in numbers — protection before pleasure.'};
  }},
 { id:'nws-routine-build-02', verb:'build', part:3, tier:'guided', skill:'nws-routine',
  gen:(v)=>{
   return { h:'Build it: tight week', cue:'Tight weeks protect MORE carefully, not less. Shrink Wants first.',
    body:'<p>Only $480 this week, and rent is due. Build a split that keeps the roof safe.</p>',
    totalDollars:480, buckets:[{id:'needs',label:'Needs'},{id:'savings',label:'Savings'},{id:'wants',label:'Wants'}],
    targets:{needs:340,savings:40,wants:100},
    good:'Right: $340 Needs, $40 Savings, $100 Wants. Even tight weeks keep the savings habit alive.',
    bad:'When money is tight, Wants shrink first — not Needs, not the savings move.',
    why:'The routine does not pause for tight weeks; it just reallocates. Protect the habit at any size.'};
  }},
 { id:'nws-routine-build-03', verb:'build', part:3, tier:'guided', skill:'nws-routine',
  gen:(v)=>{
   return { h:'Build it: the big paycheck', cue:'Bigger paychecks tempt bigger Wants. Let Savings grow too.',
    body:'<p>A $750 paycheck — overtime paid off. Build the split before lifestyle eats it.</p>',
    totalDollars:750, buckets:[{id:'needs',label:'Needs'},{id:'savings',label:'Savings'},{id:'wants',label:'Wants'}],
    targets:{needs:440,savings:110,wants:200},
    hint:'Needs $440, Savings $110 (overtime boosts the future too), Wants $200.',
    good:'Right: $440 Needs, $110 Savings, $200 Wants. The raise got sorted instead of absorbed.',
    bad:'Windfall-size paychecks still get sorted. Give Savings a share of the upside.',
    why:'Unsorted raises become lifestyle. Sorted raises become wealth and fun, both.'};
  }},
 { id:'nws-routine-build-04', verb:'build', part:3, tier:'guided', skill:'nws-routine',
  gen:(v)=>{
   return { h:'Build it: four buckets', cue:'Groceries and bills are both Needs — but splitting them makes the list visible. Keep Savings before Fun.',
    body:'<p>$520 to split, and this household tracks food separately. Build it.</p>',
    totalDollars:520, buckets:[{id:'bills',label:'Bills'},{id:'food',label:'Food'},{id:'savings',label:'Savings'},{id:'fun',label:'Fun'}],
    targets:{bills:220,food:140,savings:60,fun:100},
    hint:'Bills $220, Food $140, Savings $60, Fun $100 — protection order left to right.',
    good:'Right: $220 Bills, $140 Food, $60 Savings, $100 Fun. Same routine, finer buckets.',
    bad:'Keep the order: fixed bills, food, savings promise, then fun from the rest.',
    why:'Bucket labels can flex; the protection order cannot. Savings still sits before Fun.'};
  }},
 { id:'nws-routine-build-05', verb:'build', part:3, tier:'guided', skill:'nws-routine',
  gen:(v)=>{
   return { h:'Build it: goal month', cue:'A goal month moves MORE to savings — Wants can survive one lean month.',
    body:'<p>$900 paycheck, and there is a savings goal with a deadline. Build an aggressive-but-safe split.</p>',
    totalDollars:900, buckets:[{id:'needs',label:'Needs'},{id:'savings',label:'Savings'},{id:'wants',label:'Wants'}],
    targets:{needs:520,savings:220,wants:160},
    hint:'Needs $520, Savings $220 (goal mode), Wants $160.',
    good:'Right: $520 Needs, $220 Savings, $160 Wants. The goal gets funded without endangering the Needs.',
    bad:'Aggressive savings still protects Needs first — never starve a Need to feed a goal.',
    why:'Goals get their turn by shrinking Wants temporarily, never by raiding Needs.'};
  }},
 // ---- explain x5 (part 3, guided) ----
 { id:'nws-routine-explain-01', verb:'explain', part:3, tier:'guided', skill:'nws-routine',
  gen:(v)=>{
   const person=v.person();
   return { h:'Teach it back: the order', cue:'Think about what each step protects the NEXT step from.',
    prompt:`${person} asks why the routine has to go in order — Needs, then Savings, then Wants. Explain it in your own words.`,
    keyPoints:['Needs first because they keep you safe and earning','Savings second because "later" never wins against "now"','Wants last so fun never steals from rent or savings','Order is the protection — same dollars, different safety'],
    modelAnswer:'The order is the protection. Needs go first because they keep you housed, fed, and earning. Savings goes second because future-you never beats present-you in a fair fight. Wants go last so fun is guilt-free — it can only spend what survived the important jobs.',
    hint:'What does each step protect the next one from?'};
  }},
 { id:'nws-routine-explain-02', verb:'explain', part:3, tier:'guided', skill:'nws-routine',
  gen:(v)=>{
   return { h:'Teach it back: every dollar gets a job', cue:'Compare a dollar with a job to a dollar without one — where does each end up?',
    prompt:'Explain in your own words what "give every dollar a job before you spend it" means.',
    keyPoints:['A "job" is a bucket: Need, Want, or Savings','Dollars without jobs get spent on whatever shows up first','Listing is how you see all the jobs at once','A sorted dollar is a decided dollar'],
    modelAnswer:'Giving dollars jobs means deciding what each one is for before spending starts. Without jobs, money flows to whatever is loudest — sales, cravings, friends. With jobs, each dollar already knows whether it protects rent, builds the future, or funds fun.',
    hint:'What happens to money that has no plan?'};
  }},
 { id:'nws-routine-explain-03', verb:'explain', part:3, tier:'guided', skill:'nws-routine',
  gen:(v)=>{
   return { h:'Teach it back: guilt-free wants', cue:'Guilt comes from doubt. What does the routine remove the doubt about?',
    prompt:'Explain why spending on Wants can be guilt-free — but only when they come last.',
    keyPoints:['Guilt comes from wondering if the money was needed elsewhere','The routine answers that question up front','Wants-last means rent and savings are already safe','Fun inside the leftover is the reward for sorting, not a failure'],
    modelAnswer:'Guilt is just unanswered doubt — "should this have gone to rent?" When Wants come last, the question is already answered: rent is protected, savings moved. What is left is genuinely free, so enjoying it is the system working, not the system failing.',
    hint:'Where does the guilt actually come from?'};
  }},
 { id:'nws-routine-explain-04', verb:'explain', part:3, tier:'guided', skill:'nws-routine',
  gen:(v)=>{
   return { h:'Teach it back: list first', cue:'Think of a bill you have forgotten before. What would have caught it?',
    prompt:'Explain why "List" is step 1 — why can you not just sort from memory?',
    keyPoints:['Memory drops bills, especially autopays and quarterly ones','You cannot sort what you cannot see','The list turns vague worry into a visible plan','Listing takes minutes and prevents the expensive surprises'],
    modelAnswer:'Memory is a terrible filing system — autopays, quarterly bills, and promises slip through. Listing puts everything visible at once, so sorting is done with the full picture. Five minutes of listing prevents the "I forgot" overdraft that costs real money.',
    hint:'What is memory bad at?'};
  }},
 { id:'nws-routine-explain-05', verb:'explain', part:3, tier:'guided', skill:'nws-routine',
  gen:(v)=>{
   return { h:'Teach it back: savings is not leftovers', cue:'Compare "pay yourself first" with "save what is left" — who wins the contest against Wants?',
    prompt:'Explain why Savings has to be protected before Wants, not funded from what is left.',
    keyPoints:['Leftovers compete with every Want all month — and lose','Protecting savings first removes the contest entirely','Even small protected amounts build the habit','"Later" needs a scheduled move, not a hope'],
    modelAnswer:'"Save what is left" pits savings against a month of dinners, sales, and boredom — an unfair fight it loses. Moving savings before Wants are decided removes the contest: the money is already gone to its future job before temptation sees it. Small and protected beats big and hypothetical.',
    hint:'Who does "leftover" savings compete with for 30 days?'};
  }},
],
'available-money': [
 // ---- choice x8 (parts 3-4) ----
 { id:'available-money-choice-01', verb:'choice', part:3, tier:'guided', skill:'available-money',
  gen:(v)=>{
   const person=v.person();
   const balC=Math.round(v.cents(240,420)*100), autoC=Math.round(v.cents(60,130)*100);
   const availC=balC-autoC;
   const bill=v.pick(['electric','phone','internet']);
   const when=v.pick(['tomorrow','in two days','on Friday']);
   return {
    q:`${person}\u2019s app shows a balance of ${v.money(balC/100)}. A ${v.money(autoC/100)} ${bill} autopay hits ${when}. Nothing else is pending. What is actually available to spend?`,
    choices:[
     {label:`${v.money(availC/100)}`, ok:true},
     {label:`${v.money(balC/100)} \u2014 the balance is the spending number`, ok:false, mis:'available-means-balance'},
     {label:`${v.money((balC+autoC)/100)} \u2014 the payment has not hit yet`, ok:false, mis:'pending-is-cash'},
     {label:`${v.money(autoC/100)} \u2014 that is the number that matters`, ok:false},
    ],
    cue:'Start by subtracting the money that already has a job.',
    hint:'Available = balance \u2212 money with a job.',
    good:`Right: ${v.money(balC/100)} \u2212 ${v.money(autoC/100)} = ${v.money(availC/100)}.`,
    bad:`Subtract the scheduled payment first: ${v.money(balC/100)} \u2212 ${v.money(autoC/100)} = ${v.money(availC/100)}.`,
    why:`The ${v.money(autoC/100)} is already spoken for. Spend from ${v.money(availC/100)}, not from the screen.`};
  }},
 { id:'available-money-choice-02', verb:'choice', part:3, tier:'guided', skill:'available-money',
  gen:(v)=>{
   const person=v.person();
   const balC=Math.round(v.cents(380,560)*100), rentC=Math.round(v.cents(150,240)*100), savC=Math.round(v.cents(40,80)*100);
   const availC=balC-rentC-savC;
   return {
    q:`${person}\u2019s app shows ${v.money(balC/100)}. Coming up: ${v.money(rentC/100)} rent autopay and $${savC/100} promised to savings. What is actually available?`,
    choices:[
     {label:`${v.money(availC/100)}`, ok:true},
     {label:`${v.money(balC/100)} \u2014 the app knows best`, ok:false, mis:'available-means-balance'},
     {label:`${v.money((balC-rentC)/100)} \u2014 the savings promise can wait`, ok:false, mis:'savings-skippable'},
     {label:`${v.money((balC-savC)/100)} \u2014 rent is not due today`, ok:false, mis:'pending-is-cash'},
    ],
    cue:'Two things already have jobs. Subtract both.',
    hint:'Count every job: the autopay AND the promise.',
    good:`Right: ${v.money(balC/100)} \u2212 ${v.money(rentC/100)} \u2212 ${v.money(savC/100)} = ${v.money(availC/100)}.`,
    bad:`Both jobs count: ${v.money(rentC/100)} + ${v.money(savC/100)} = ${v.money((rentC+savC)/100)} spoken for. Subtract all of it.`,
    why:'Promises are jobs too. Available money subtracts everything spoken for — due today or not.'};
  }},
 { id:'available-money-choice-03', verb:'choice', part:3, tier:'guided', skill:'available-money',
  gen:(v)=>{
   const person=v.person();
   const balC=Math.round(v.cents(280,400)*100), autoC=Math.round(v.cents(90,150)*100);
   const availC=balC-autoC;
   const priceC=availC+v.int(-3000,3000);
   const item=v.pick(['concert ticket','pair of sneakers','video game','desk lamp']);
   const when=v.pick(['tomorrow','in a few days']);
   const afford=priceC<=availC;
   return {
    q:`${person} wants a ${v.money(priceC/100)} ${item}. The app shows ${v.money(balC/100)}, but a ${v.money(autoC/100)} autopay hits ${when}. Does the available-money rule say buy it?`,
    choices: afford?[
     {label:`Yes \u2014 ${v.money(availC/100)} is available and covers ${v.money(priceC/100)}`, ok:true},
     {label:`No \u2014 never spend anything before a payment clears`, ok:false, mis:'absolute-rules'},
     {label:`Yes \u2014 the ${v.money(balC/100)} balance covers it easily`, ok:false, mis:'available-means-balance'},
     {label:`No \u2014 the autopay means nothing is safe to buy`, ok:false, mis:'save-everything'}
    ]:[
     {label:`No \u2014 only ${v.money(availC/100)} is safe; ${v.money(priceC/100)} is out of reach`, ok:true},
     {label:`Yes \u2014 ${v.money(balC/100)} covers ${v.money(priceC/100)} with room`, ok:false, mis:'available-means-balance'},
     {label:`Yes \u2014 ${when} is not today, so spend now`, ok:false, mis:'pending-is-cash'},
     {label:`No \u2014 ${person} should never buy ${item}s`, ok:false, mis:'absolute-rules'}
    ],
    cue:'Compare the price to the available number — not the balance.',
    hint:'Available first, price second. Compare those two.',
    good: afford?`Right: ${v.money(availC/100)} available covers the ${v.money(priceC/100)} ${item}, autopay untouched.`:`Right: ${v.money(priceC/100)} is more than the ${v.money(availC/100)} available. The autopay eats first.`,
    bad: afford?`Check against available: ${v.money(balC/100)} \u2212 ${v.money(autoC/100)} = ${v.money(availC/100)}, which covers it.`:`Available is ${v.money(balC/100)} \u2212 ${v.money(autoC/100)} = ${v.money(availC/100)} \u2014 short of ${v.money(priceC/100)}.`,
    why: afford?'The rule is a comparison, not a ban: available covers it, so it fits.':'Wanting it today does not change the math — the available number is the real one.'};
  }},
 { id:'available-money-choice-04', verb:'choice', part:3, tier:'guided', skill:'available-money',
  gen:(v)=>{
   const person=v.person();
   const balC=Math.round(v.cents(320,480)*100), holdC=Math.round(v.cents(35,75)*100);
   const availC=balC-holdC;
   const store=v.place();
   return {
    q:`${person} bought gas at ${store} — a ${v.money(holdC/100)} hold is pending (it has not posted yet). The app shows ${v.money(balC/100)}. What is available?`,
    choices:[
     {label:`${v.money(availC/100)} \u2014 the pending hold counts`, ok:true},
     {label:`${v.money(balC/100)} \u2014 pending is not real money yet`, ok:false, mis:'pending-is-cash'},
     {label:`${v.money((balC+holdC)/100)} \u2014 holds get added back`, ok:false},
     {label:`$0 \u2014 pending holds freeze everything`, ok:false, mis:'absolute-rules'},
    ],
    cue:'Pending means the money is already claimed — "not posted" is not "not spent."',
    hint:'A hold is money with a job, posted or not.',
    good:`Right: ${v.money(balC/100)} \u2212 ${v.money(holdC/100)} = ${v.money(availC/100)}. The hold will post; the dollars are already gone.`,
    bad:`Pending does not mean free. Subtract the ${v.money(holdC/100)} hold: ${v.money(availC/100)}.`,
    why:'Banks show the balance before pending clears. Your spending number has to clear it first.'};
  }},
 { id:'available-money-choice-05', verb:'choice', part:4, tier:'independent', skill:'available-money',
  gen:(v)=>{
   const person=v.person();
   const balC=Math.round(v.cents(450,650)*100), autoC=Math.round(v.cents(120,200)*100), holdC=Math.round(v.cents(25,60)*100), savC=Math.round(v.cents(30,80)*100);
   const availC=balC-autoC-holdC-savC;
   const spokenC=autoC+holdC+savC;
   return {
    q:`${person}\u2019s app shows ${v.money(balC/100)}. Coming up: a ${v.money(autoC/100)} rent autopay, a ${v.money(holdC/100)} pending gas hold, and ${v.money(savC/100)} promised to savings. What is actually available?`,
    choices:[
     {label:`${v.money(availC/100)}`, ok:true},
     {label:`${v.money(balC/100)} \u2014 the app balance is the real number`, ok:false, mis:'available-means-balance'},
     {label:`${v.money((balC-autoC-savC)/100)} \u2014 pending holds do not count until they post`, ok:false, mis:'pending-is-cash'},
     {label:`${v.money((balC-autoC-holdC)/100)} \u2014 the savings promise can wait`, ok:false, mis:'savings-from-leftovers'},
    ],
    hint:'Three jobs. Subtract all three.',
    good:`Right: ${v.money(balC/100)} \u2212 ${v.money(autoC/100)} \u2212 ${v.money(holdC/100)} \u2212 ${v.money(savC/100)} = ${v.money(availC/100)}.`,
    bad:`Count everything with a job: ${v.money(spokenC/100)} spoken for. ${v.money(balC/100)} \u2212 ${v.money(spokenC/100)} = ${v.money(availC/100)}.`,
    why:`Rent, the pending hold, and the savings promise all count — posted or not. ${v.money(availC/100)} is the real number.`};
  }},
 { id:'available-money-choice-06', verb:'choice', part:4, tier:'independent', skill:'available-money',
  gen:(v)=>{
   const person=v.person();
   const payC=Math.round(v.cents(620,880)*100), rentC=Math.round(v.cents(400,520)*100), billsC=Math.round(v.cents(90,160)*100), savC=Math.round(v.cents(50,90)*100);
   const availC=payC-rentC-billsC-savC;
   return {
    q:`Payday: ${person} gets ${v.money(payC/100)}. This period\u2019s jobs: rent ${v.money(rentC/100)}, other bills ${v.money(billsC/100)}, savings promise ${v.money(savC/100)}. After every job is filled, what is left to spend?`,
    choices:[
     {label:`${v.money(availC/100)}`, ok:true},
     {label:`${v.money(payC/100)} \u2014 the whole paycheck is spendable`, ok:false, mis:'available-means-balance'},
     {label:`${v.money((payC-rentC-billsC)/100)} \u2014 savings comes from leftovers`, ok:false, mis:'savings-from-leftovers'},
     {label:`${v.money((payC-rentC)/100)} \u2014 only rent is a real job`, ok:false, mis:'needs-are-flexible'},
    ],
    hint:'Paycheck minus every job = the spending number.',
    good:`Right: ${v.money(payC/100)} \u2212 ${v.money(rentC/100)} \u2212 ${v.money(billsC/100)} \u2212 ${v.money(savC/100)} = ${v.money(availC/100)}.`,
    bad:`Subtract them all in one chain: ${v.money(payC/100)} minus rent, minus bills, minus the savings promise.`,
    why:'A paycheck is not a spending number until every job is subtracted. What is left is genuinely free.'};
  }},
 { id:'available-money-choice-07', verb:'choice', part:4, tier:'independent', skill:'available-money',
  gen:(v)=>{
   const person=v.person();
   const balC=Math.round(v.cents(260,380)*100), autoC=Math.round(v.cents(80,140)*100);
   const windC=Math.round(v.cents(40,90)*100);
   const availC=balC-autoC;
   const withWindC=availC+windC;
   return {
    q:`${person}\u2019s app shows ${v.money(balC/100)} with a ${v.money(autoC/100)} autopay due tomorrow. Then a $${windC/100} birthday gift arrives in cash. What is actually available now?`,
    choices:[
     {label:`${v.money(withWindC/100)} \u2014 the gift adds to the available number`, ok:true},
     {label:`${v.money(balC/100)} \u2014 gift cash does not count until deposited`, ok:false, mis:'sort-dodge'},
     {label:`${v.money((balC+windC)/100)} \u2014 the autopay is tomorrow, not today`, ok:false, mis:'pending-is-cash'},
     {label:`${v.money(windC/100)} \u2014 windfalls are separate fun money`, ok:false, mis:'windfall-exception'},
    ],
    hint:'New money joins the pool — but the autopay still has its job.',
    good:`Right: (${v.money(balC/100)} \u2212 ${v.money(autoC/100)}) + ${v.money(windC/100)} = ${v.money(withWindC/100)}. Windfalls get sorted like everything else.`,
    bad:`Add the gift to the available number, not the raw balance: ${v.money(availC/100)} + ${v.money(windC/100)} = ${v.money(withWindC/100)}.`,
    why:'Windfalls are income, not exceptions. They join the pool — and the autopay still eats first.'};
  }},
 { id:'available-money-choice-08', verb:'choice', part:4, tier:'independent', skill:'available-money',
  gen:(v)=>{
   const person=v.person();
   const balC=Math.round(v.cents(500,700)*100), sub1C=Math.round(v.cents(15,25)*100), sub2C=Math.round(v.cents(40,70)*100), insC=Math.round(v.cents(85,130)*100);
   const availC=balC-sub1C-sub2C-insC;
   const jobC=sub1C+sub2C+insC;
   return {
    q:`${person} sees ${v.money(balC/100)}. Three autopays hit this week: ${v.money(sub1C/100)} streaming, ${v.money(sub2C/100)} gym, ${v.money(insC/100)} insurance. What is available?`,
    choices:[
     {label:`${v.money(availC/100)}`, ok:true},
     {label:`${v.money(balC/100)} \u2014 small subscriptions do not count`, ok:false, mis:'available-means-balance'},
     {label:`${v.money((balC-insC)/100)} \u2014 only the big one matters`, ok:false, mis:'price-only-decision'},
     {label:`${v.money((balC-sub1C-sub2C)/100)} \u2014 insurance can be skipped a week`, ok:false},
    ],
    hint:'Small jobs are still jobs. Add all three, then subtract.',
    good:`Right: ${v.money(balC/100)} \u2212 ${v.money(jobC/100)} = ${v.money(availC/100)}. Three "small" autopays are one real number.`,
    bad:`Add the jobs: ${v.money(sub1C/100)} + ${v.money(sub2C/100)} + ${v.money(insC/100)} = ${v.money(jobC/100)}. Subtract all of it.`,
    why:'Autopays stack. Individually small, collectively they are a rent-sized bite — all of them count.'};
  }},
 // ---- sort x6 (part 3, guided) ----
 { id:'available-money-sort-01', verb:'sort', part:3, tier:'guided', skill:'available-money',
  gen:(v)=>{
   const list=[
    ['Paycheck balance on screen','free','The raw number — before any jobs are subtracted.'],
    ['Rent autopay due Friday','job','Already promised. A job.'],
    ['$50 savings promise','job','A promise is a job.'],
    ['Pending gas station hold','job','Claimed but not posted — still a job.'],
    ['Money left after all jobs','free','This is the available number.'],
    ['Birthday cash just received','free','New money with no job yet — free until sorted.'],
   ];
   return { h:'Sort it: job or free?', cue:'Ask of each line: "does this money already have somewhere to be?" If yes → job.',
    body:'<p>Sort each line into money that <b>already has a job</b> vs money that is <b>free to spend</b>.</p>',
    buckets:['Has a job','Free to spend'],
    items:v.shuffle(list).slice(0,6).map(x=>({label:x[0],a:x[1]==='job'?'has a job':'free to spend',why:x[2]}))};
  }},
 { id:'available-money-sort-02', verb:'sort', part:3, tier:'guided', skill:'available-money',
  gen:(v)=>{
   const list=[
    ['Electric autopay tomorrow','job','Due tomorrow = job today.'],
    ['Grocery money for the week','job','Food for the week is already assigned.'],
    ['Concert ticket fund (planned)','free','Planned fun with no bill attached — free to spend or skip.'],
    ['Phone bill autopay','job','Autopay = job.'],
    ['Cash in wallet after bills','free','Bills handled — this is available.'],
    ['Credit card minimum due','job','A due payment is a job.'],
   ];
   return { h:'Sort it: the weekly check', cue:'Autopays and due bills are jobs even before they hit. "Not yet" ≠ "free."',
    body:'<p>It is Sunday night. Sort what has a job already vs what is free.</p>',
    buckets:['Has a job','Free to spend'],
    items:v.shuffle(list).slice(0,6).map(x=>({label:x[0],a:x[1]==='job'?'has a job':'free to spend',why:x[2]}))};
  }},
 { id:'available-money-sort-03', verb:'sort', part:3, tier:'guided', skill:'available-money',
  gen:(v)=>{
   const list=[
    ['Rent due in 3 days','job','Due soon = job now.'],
    ['Pending restaurant charge','job','Swiped = spent, even unposted.'],
    ['Savings move scheduled Friday','job','Scheduled = job.'],
    ['Leftover after Friday\u2019s moves','free','After the jobs clear, this is available.'],
    ['Side-gig cash, unsorted','free','No job assigned yet — free until it gets one.'],
    ['Insurance autopay next week','job','Next week still counts — it is coming from this balance.'],
   ];
   return { h:'Sort it: before the weekend', cue:'"Due later" still means the money is claimed. Sort by claim, not by date.',
    body:'<p>Friday is coming. Sort every line by whether the money is already claimed.</p>',
    buckets:['Has a job','Free to spend'],
    items:v.shuffle(list).slice(0,6).map(x=>({label:x[0],a:x[1]==='job'?'has a job':'free to spend',why:x[2]}))};
  }},
 { id:'available-money-sort-04', verb:'sort', part:3, tier:'guided', skill:'available-money',
  gen:(v)=>{
   const list=[
    ['Paycheck deposited this morning','free','Fresh money, no jobs yet — free until sorted.'],
    ['Car insurance due Monday','job','Monday is close enough — job.'],
    ['Promised $40 to emergency fund','job','A promise is a job.'],
    ['Gas hold from this morning','job','Pending hold = claimed.'],
    ['Money for Saturday plans','free','Fun money with no bill attached — spendable.'],
    ['Library fine (overdue)','job','Owed money is a job, even if small.'],
   ];
   return { h:'Sort it: payday morning', cue:'Fresh paychecks feel 100% free. They are not — list the jobs first.',
    body:'<p>The paycheck just landed and everything looks spendable. Sort it honestly.</p>',
    buckets:['Has a job','Free to spend'],
    items:v.shuffle(list).slice(0,6).map(x=>({label:x[0],a:x[1]==='job'?'has a job':'free to spend',why:x[2]}))};
  }},
 { id:'available-money-sort-05', verb:'sort', part:3, tier:'guided', skill:'available-money',
  gen:(v)=>{
   const list=[
    ['Streaming subscription renews Sunday','job','Renewal = job.'],
    ['Gym membership autopay','job','Autopay = job.'],
    ['Dinner budget for the week','job','Already assigned to food — a job.'],
    ['Unassigned remainder','free','No assignment = available.'],
    ['Refund that just posted','free','New money, no claim — free.'],
    ['Bus pass renewal Friday','job','Work transport due Friday — job.'],
   ];
   return { h:'Sort it: the subscription stack', cue:'Subscriptions are quiet jobs — they take money without asking. Count every one.',
    body:'<p>Autopays are invisible jobs. Drag each into the light.</p>',
    buckets:['Has a job','Free to spend'],
    items:v.shuffle(list).slice(0,6).map(x=>({label:x[0],a:x[1]==='job'?'has a job':'free to spend',why:x[2]}))};
  }},
 { id:'available-money-sort-06', verb:'sort', part:3, tier:'guided', skill:'available-money',
  gen:(v)=>{
   const list=[
    ['Rent autopay','job','The biggest job.'],
    ['Pending coffee charge','job','Small, swiped, claimed — still a job.'],
    ['Savings promise','job','Promise = job.'],
    ['Screen balance','free','The number before jobs — the starting point, not the answer.'],
    ['Cash from selling old textbooks','free','No claim on it yet — free until sorted.'],
    ['Phone bill due in 2 days','job','Two days away = already claimed.'],
   ];
   return { h:'Sort it: the full picture', cue:'The screen balance is where you START the math, not where you finish it.',
    body:'<p>Last sort of the set. Separate the jobs from the free money.</p>',
    buckets:['Has a job','Free to spend'],
    items:v.shuffle(list).slice(0,6).map(x=>({label:x[0],a:x[1]==='job'?'has a job':'free to spend',why:x[2]}))};
  }},
 // ---- decide x8 (parts 3-5) ----
 { id:'available-money-decide-01', verb:'decide', part:3, tier:'guided', skill:'available-money',
  gen:(v)=>{
   const person=v.person();
   const balC=Math.round(v.cents(300,420)*100), autoC=Math.round(v.cents(95,150)*100);
   const availC=balC-autoC;
   const dinnerC=Math.round(v.cents(35,55)*100);
   return {
    q:`${person}\u2019s app shows ${v.money(balC/100)}, but a ${v.money(autoC/100)} autopay hits tomorrow. A friend invites ${person} to a ${v.money(dinnerC/100)} dinner tonight. What is the call?`,
    choices:[
     {label:`Go only if ${v.money(dinnerC/100)} fits inside ${v.money(availC/100)}`, ok:true},
     {label:`Go — ${v.money(balC/100)} covers dinner with room to spare`, ok:false, mis:'available-means-balance'},
     {label:'Go — tomorrow\u2019s problem is tomorrow\u2019s', ok:false, mis:'pending-is-cash'},
     {label:'Never go out before an autopay clears', ok:false, mis:'absolute-rules'},
    ],
    cue:'First compute the available number. Then compare the dinner to THAT number.',
    hint:'Available first, decision second.',
    good:`Available is ${v.money(availC/100)}. If the ${v.money(dinnerC/100)} dinner fits inside it, ${person} goes — autopay safe either way.`,
    bad:`The balance (${v.money(balC/100)}) is not the decision number. ${v.money(availC/100)} is. Compare the dinner to that.`,
    why:'The rule turns "can I go?" into a comparison: price vs available. No guilt, no guessing — just the numbers.'};
  }},
 { id:'available-money-decide-02', verb:'decide', part:3, tier:'guided', skill:'available-money',
  gen:(v)=>{
   const person=v.person();
   const payC=Math.round(v.cents(700,900)*100), rentC=Math.round(v.cents(450,580)*100), savC=Math.round(v.cents(50,90)*100);
   const availC=payC-rentC-savC;
   const wantC=Math.round(v.cents(90,160)*100);
   const item=v.pick(['headphones','a jacket','sneakers','a monitor']);
   const fits=wantC<=availC;
   return {
    q:`Payday: ${person} gets ${v.money(payC/100)}. Rent (${v.money(rentC/100)}) and a ${v.money(savC/100)} savings promise come out first. ${person} wants ${item} for ${v.money(wantC/100)}. What is the call?`,
    choices: fits?[
     {label:`Buy it — ${v.money(availC/100)} is available and it fits`, ok:true},
     {label:'Wait — rent week means buying nothing at all', ok:false, mis:'absolute-rules'},
     {label:`Buy it from the full ${v.money(payC/100)} and sort it out later`, ok:false, mis:'available-means-balance'},
     {label:'Skip the savings promise this once to be extra safe', ok:false, mis:'savings-from-leftovers'}
    ]:[
     {label:`Not today — ${v.money(wantC/100)} is more than the ${v.money(availC/100)} available`, ok:true},
     {label:`Buy it — the ${v.money(payC/100)} paycheck covers it`, ok:false, mis:'available-means-balance'},
     {label:'Buy it and skip rent this month', ok:false},
     {label:'Never buy wants on a rent week', ok:false, mis:'absolute-rules'}
    ],
    cue:'Protect first, then compare. What is left after rent and the savings promise?',
    hint:'Rent and savings are already out. Decide from the remainder.',
    good: fits?`Right: ${v.money(availC/100)} available covers the ${v.money(wantC/100)} ${item} — protected money untouched.`:`Right: the ${item} costs more than the ${v.money(availC/100)} available. It waits.`,
    bad: fits?`Available = ${v.money(payC/100)} \u2212 ${v.money(rentC/100)} \u2212 ${v.money(savC/100)} = ${v.money(availC/100)} — and that covers it.`:`Available = ${v.money(availC/100)}. The ${v.money(wantC/100)} price does not fit inside it.`,
    why:'Protect-then-compare: the decision is arithmetic, not willpower. The numbers say yes or no.'};
  }},
 { id:'available-money-decide-03', verb:'decide', part:3, tier:'guided', skill:'available-money',
  gen:(v)=>{
   const person=v.person();
   const balC=Math.round(v.cents(240,360)*100), holdC=Math.round(v.cents(40,80)*100);
   const availC=balC-holdC;
   const spendC=Math.round(v.cents(120,180)*100);
   const fits=spendC<=availC;
   return {
    q:`${person} sees ${v.money(balC/100)}, but a ${v.money(holdC/100)} gas hold is still pending. ${person} wants to spend ${v.money(spendC/100)} on groceries today. What is the call?`,
    choices: fits?[
     {label:`Buy them — ${v.money(availC/100)} available covers ${v.money(spendC/100)}`, ok:true},
     {label:`Buy them — the hold has not posted so it does not count`, ok:false, mis:'pending-is-cash'},
     {label:'Wait for the hold to post before buying anything', ok:false, mis:'absolute-rules'},
     {label:`Buy double — the ${v.money(balC/100)} balance allows it`, ok:false, mis:'available-means-balance'}
    ]:[
     {label:`Wait or trim the list — only ${v.money(availC/100)} is truly available`, ok:true},
     {label:`Buy it all — ${v.money(balC/100)} is right there`, ok:false, mis:'available-means-balance'},
     {label:'Buy it all — pending holds never actually post', ok:false, mis:'pending-is-cash'},
     {label:'Skip groceries entirely this week', ok:false, mis:'save-everything'}
    ],
    cue:'Pending = already spent. Subtract the hold before deciding.',
    hint:'The hold is real money, just slow paperwork.',
    good: fits?`Right: ${v.money(balC/100)} \u2212 ${v.money(holdC/100)} = ${v.money(availC/100)}, which covers the groceries.`:`Right: only ${v.money(availC/100)} is safe. The list gets trimmed or waits a day.`,
    bad: fits?`Count the hold: ${v.money(availC/100)} available still covers ${v.money(spendC/100)}.`:`The hold counts: ${v.money(balC/100)} \u2212 ${v.money(holdC/100)} = ${v.money(availC/100)} < ${v.money(spendC/100)}.`,
    why:'Pending holds are the classic trap: the money looks free and is not. Subtracting first keeps groceries from bouncing.'};
  }},
 { id:'available-money-decide-04', verb:'decide', part:3, tier:'guided', skill:'available-money',
  gen:(v)=>{
   const person=v.person();
   const balC=Math.round(v.cents(200,300)*100), autoC=Math.round(v.cents(60,110)*100);
   const availC=balC-autoC;
   const windC=Math.round(v.cents(50,100)*100);
   return {
    q:`${person} has ${v.money(availC/100)} available (${v.money(balC/100)} minus a ${v.money(autoC/100)} autopay). A friend hands ${person} ${v.money(windC/100)} cash as a thank-you. What is the call?`,
    choices:[
     {label:`Sort it like any income — protect first, then enjoy what is left`, ok:true},
     {label:`Spend it all — windfall cash is exempt from the rules`, ok:false, mis:'windfall-exception'},
     {label:`It does not count until it is in the bank`, ok:false, mis:'sort-dodge'},
     {label:`Save every cent — gifts must never be spent`, ok:false, mis:'save-everything'},
    ],
    cue:'"Unexpected" is not a bucket. What are the four steps, and do windfalls skip them?',
    hint:'Windfalls get jobs too.',
    good:`Right: the ${v.money(windC/100)} runs List → Sort → Protect → Spend like everything else — some to buffer, some to fun.`,
    bad:`"It does not count" is how ${v.money(windC/100)} evaporates. It counts the moment it is in hand.`,
    why:'Exempting windfalls teaches the brain that sorting is optional. It is not — especially for surprise money.'};
  }},
 { id:'available-money-decide-05', verb:'decide', part:5, tier:'independent', skill:'available-money',
  gen:(v)=>{
   const person=v.person();
   const balC=Math.round(v.cents(520,680)*100), rentC=Math.round(v.cents(380,480)*100), carC=Math.round(v.cents(140,220)*100);
   const afterRentC=balC-rentC;
   const fixFits=carC<=afterRentC;
   return {
    q:`${person}\u2019s app shows ${v.money(balC/100)}. Rent (${v.money(rentC/100)}) is due Friday; the car needs a ${v.money(carC/100)} repair to stay drivable. Both matter. What is the call?`,
    choices: fixFits?[
     {label:`Pay rent first, then the repair — ${v.money(afterRentC/100)} covers it`, ok:true},
     {label:'Fix the car first — it is more urgent than rent', ok:false, mis:'first-come-first-served'},
     {label:'Split the money evenly between rent and repair', ok:false, mis:'even-split'},
     {label:'Pay neither yet — wait and see which gets louder', ok:false, mis:'sort-dodge'}
    ]:[
     {label:`Rent is protected first; the repair needs a plan — partial payment, delay, or side cash`, ok:true},
     {label:'Pay the repair in full and short the rent', ok:false},
     {label:'Split it evenly and hope both accept partial', ok:false, mis:'even-split'},
     {label:`Ignore both until the ${v.money(balC/100)} feels bigger`, ok:false, mis:'sort-dodge'}
    ],
    hint:'Two Needs, one pool. Which one has the harder deadline?',
    good: fixFits?`Right: rent protected (${v.money(rentC/100)}), repair covered from the ${v.money(afterRentC/100)} remainder. Both Needs survive.`:`Right: rent cannot flex, so it is protected in full — then the repair gets triage, not the rent money.`,
    bad: fixFits?`Order: rent (${v.money(rentC/100)}) first — it has the fixed due date — then the repair from what remains.`:`Shorting rent creates fees bigger than the repair. Protect rent; solve the repair separately.`,
    why:'When Needs collide, deadlines decide the order. Protect the immovable one first, then get creative with the other.'};
  }},
 { id:'available-money-decide-06', verb:'decide', part:5, tier:'independent', skill:'available-money',
  gen:(v)=>{
   const person=v.person();
   const balC=Math.round(v.cents(340,460)*100), savC=Math.round(v.cents(50,90)*100);
   const billC=Math.round(v.cents(70,130)*100);
   const availC=balC-savC;
   return {
    q:`${person} promised ${v.money(savC/100)} to savings this week (balance ${v.money(balC/100)}). Then a ${v.money(billC/100)} surprise bill arrives. What is the call?`,
    choices:[
     {label:`Pay the bill from the ${v.money(availC/100)} available — the savings promise stays intact`, ok:true},
     {label:'Raid the savings promise — surprises outrank promises', ok:false, mis:'savings-skippable'},
     {label:'Ignore the bill — the promise matters more', ok:false, mis:'absolute-rules'},
     {label:'Pay the bill and double the savings promise to make up for it', ok:false, mis:'save-everything'},
    ],
    hint:'The savings promise was already subtracted. What is left?',
    good:`Right: available was ${v.money(availC/100)} after the promise — the bill fits inside it. Promise kept, bill paid.`,
    bad:`The promise was already accounted for. Available = ${v.money(balC/100)} \u2212 ${v.money(savC/100)} = ${v.money(availC/100)} — check the bill against that.`,
    why:'This is why the promise gets subtracted first: surprises land on the available number, not on the savings habit.'};
  }},
 { id:'available-money-decide-07', verb:'decide', part:5, tier:'independent', skill:'available-money',
  gen:(v)=>{
   const person=v.person();
   const balC=Math.round(v.cents(420,560)*100), a1C=Math.round(v.cents(120,180)*100), a2C=Math.round(v.cents(60,110)*100);
   const availC=balC-a1C-a2C;
   const wantC=Math.round(v.cents(80,140)*100);
   const fits=wantC<=availC;
   return {
    q:`Two autopays hit this week for ${person}: ${v.money(a1C/100)} and ${v.money(a2C/100)}. Balance is ${v.money(balC/100)}. ${person} wants something for ${v.money(wantC/100)}. What is the call?`,
    choices: fits?[
     {label:`Buy it — ${v.money(availC/100)} available covers ${v.money(wantC/100)}`, ok:true},
     {label:'Buy it now before the autopays hit', ok:false, mis:'pending-is-cash'},
     {label:'Never spend in a two-autopay week', ok:false, mis:'absolute-rules'},
     {label:`The ${v.money(balC/100)} balance is the real budget`, ok:false, mis:'available-means-balance'}
    ]:[
     {label:`Pass — only ${v.money(availC/100)} is available against a ${v.money(wantC/100)} price`, ok:true},
     {label:`Buy it — ${v.money(balC/100)} is plenty`, ok:false, mis:'available-means-balance'},
     {label:'Buy it before the autopays post', ok:false, mis:'spend-pending-save-cash'},
     {label:'Cancel one autopay to afford it', ok:false}
    ],
    hint:'Two jobs, one subtraction. Then compare.',
    good: fits?`Right: ${v.money(availC/100)} available, price ${v.money(wantC/100)} — it fits with both autopays safe.`:`Right: ${v.money(wantC/100)} > ${v.money(availC/100)}. The autopays win this week.`,
    bad: fits?`Available = ${v.money(balC/100)} \u2212 ${v.money(a1C/100)} \u2212 ${v.money(a2C/100)} = ${v.money(availC/100)}. Compare the price to that.`:`Stack the jobs: ${v.money(a1C/100)} + ${v.money(a2C/100)} = ${v.money((a1C+a2C)/100)} spoken for. Only ${v.money(availC/100)} is free.`,
    why:'Multi-autopay weeks are where the balance lies biggest. The subtraction is the truth-teller.'};
  }},
 { id:'available-money-decide-08', verb:'decide', part:5, tier:'independent', skill:'available-money',
  gen:(v)=>{
   const person=v.person();
   const otC=Math.round(v.cents(120,220)*100);
   const balC=Math.round(v.cents(280,400)*100), autoC=Math.round(v.cents(100,160)*100);
   const availC=balC-autoC;
   return {
    q:`${person} picks up overtime: an extra ${v.money(otC/100)} this week. Current available is ${v.money(availC/100)} (${v.money(balC/100)} minus a ${v.money(autoC/100)} autopay). What is the call?`,
    choices:[
     {label:`Add it to the pool and re-run the routine — protect, then split`, ok:true},
     {label:`Spend it all — overtime money is bonus money`, ok:false, mis:'windfall-exception'},
     {label:'It is already covered — the available number does not change', ok:false, mis:'sort-dodge'},
     {label:`Hide it from the budget so it feels like free cash`, ok:false, mis:'great-week-splurge'},
    ],
    hint:'New income, same four steps.',
    good:`Right: the ${v.money(otC/100)} joins the pool — available becomes ${v.money((availC+otC)/100)}, and the routine re-sorts it.`,
    bad:`Overtime is income, not a loophole. Add it: ${v.money(availC/100)} + ${v.money(otC/100)} = ${v.money((availC+otC)/100)} available.`,
    why:'"Bonus" money that skips the routine becomes lifestyle creep. Sorted overtime becomes buffer and fun, on purpose.'};
  }},
 // ---- spot x6 (part 5, independent) ----
 { id:'available-money-spot-01', verb:'spot', part:5, tier:'independent', skill:'available-money',
  gen:(v)=>{
   const person=v.person();
   const bal=v.money(Math.round(v.cents(340,440)*100)/100);
   const auto=v.money(Math.round(v.cents(110,160)*100)/100);
   const spend=v.money(Math.round(v.cents(180,240)*100)/100);
   return {
    scenario:`<p>${person}\u2019s week:</p><ul><li>App balance: ${bal}</li><li>Rent autopay hits Thursday: ${auto}</li><li>Monday–Wednesday spending: ${spend} (based on the ${bal} balance)</li><li>Thursday: autopay bounces</li></ul>`,
    q:'What is the mistake here?',
    choices:[
     {label:'Spent from the visible balance instead of the available number', ok:true},
     {label:`The ${spend} spending was just too much in general`, ok:false, mis:'price-only-decision'},
     {label:'The mistake is having autopay at all', ok:false},
     {label:'Nothing — the bank should have covered it', ok:false, mis:'sort-dodge'},
    ],
    hint:'Which number did the spending get compared against?',
    good:`Right. The ${bal} screen hid the ${auto} job. Spending against the visible number guaranteed the bounce.`,
    bad:'The spending was not the problem — the number it was measured against was. Which number should it have been?',
    why:'The balance is a starting point, not a budget. Every bounce starts with spending the screen instead of the remainder.'};
  }},
 { id:'available-money-spot-02', verb:'spot', part:5, tier:'independent', skill:'available-money',
  gen:(v)=>{
   const person=v.person();
   const hold=v.money(Math.round(v.cents(45,85)*100)/100);
   const bal=v.money(Math.round(v.cents(220,300)*100)/100);
   return {
    scenario:`<p>${person} filled up at the pump — a ${hold} hold is pending. Seeing ${bal} in the app, ${person} thought: \u201cpending is not posted, so that money is still mine,\u201d and spent it. The hold posted the next day. Account: negative.</p>`,
    q:'What is the mistake here?',
    choices:[
     {label:'Treated a pending hold as spendable cash', ok:true},
     {label:`Gas is too expensive — ${hold} is the real problem`, ok:false, mis:'price-only-decision'},
     {label:'Nothing — pending holds sometimes disappear', ok:false, mis:'pending-is-cash'},
     {label:'The mistake is checking the app at all', ok:false, mis:'sort-dodge'},
    ],
    hint:'"Not posted" and "not spent" are different things.',
    good:'Right. The hold was claimed money doing slow paperwork. Spending it twice — once at the pump, once at the store — broke the account.',
    bad:'The money was already promised to the gas station. What does "pending" actually mean?',
    why:'Pending is a timing label, not a discount. Money with a hold on it is money with a job.'};
  }},
 { id:'available-money-spot-03', verb:'spot', part:5, tier:'independent', skill:'available-money',
  gen:(v)=>{
   const person=v.person();
   const save=v.int(40,70);
   return {
    scenario:`<p>${person}\u2019s system: bills get paid, fun gets funded, and \u201cthe $${save} savings promise happens if there is anything left.\u201d Six weeks later the emergency fund has grown by $0.</p>`,
    q:'What is the mistake here?',
    choices:[
     {label:'The savings promise was never subtracted — it was left to compete with spending', ok:true},
     {label:`$${save} is too small to matter anyway`, ok:false, mis:'savings-skippable'},
     {label:'The mistake is paying bills before saving', ok:false},
     {label:'Nothing — $0 growth is normal', ok:false, mis:'sort-dodge'},
    ],
    hint:'Where in the order does the promise get decided?',
    good:'Right. "If anything is left" means the promise fights every purchase for six weeks — and loses every time.',
    bad:'The promise existed as a wish, not a subtraction. When did the money actually get set aside?',
    why:'A savings promise only protects money if it is subtracted up front. As a month-end hope, it is decoration.'};
  }},
 { id:'available-money-spot-04', verb:'spot', part:5, tier:'independent', skill:'available-money',
  gen:(v)=>{
   const person=v.person();
   const pend=v.money(Math.round(v.cents(60,100)*100)/100);
   const cash=v.money(Math.round(v.cents(80,130)*100)/100);
   return {
    scenario:`<p>${person}\u2019s plan: \u201cI\u2019ll spend the ${pend} pending charge money now on fun, then use my ${cash} cash to cover savings later.\u201d The cash got spent too.</p>`,
    q:'What is the mistake here?',
    choices:[
     {label:'Spent pending money first and trusted future cash to fix it', ok:true},
     {label:`The ${cash} cash was the problem, not the plan`, ok:false},
     {label:'Nothing — juggling like this usually works out', ok:false, mis:'spend-pending-save-cash'},
     {label:`${person} just needs more income`, ok:false, mis:'price-only-decision'},
    ],
    hint:'Which money had a job, and which was supposed to get one "later"?',
    good:'Right. Pending money already had a job; the "later" cash never survived to cover savings. Two spends, one pool.',
    bad:'Trace both dollars: the pending one was claimed, the cash one was hoped-for. Which plan survives contact with a store?',
    why:'Borrowing from pending to fund fun, then hoping cash covers savings, is two gambles stacked. The routine allows zero.'};
  }},
 { id:'available-money-spot-05', verb:'spot', part:5, tier:'independent', skill:'available-money',
  gen:(v)=>{
   const person=v.person();
   const wind=v.money(Math.round(v.cents(150,250)*100)/100);
   const auto=v.money(Math.round(v.cents(90,140)*100)/100);
   return {
    scenario:`<p>${person} got ${wind} from a side gig. \u201cBonus money!\u201d — all of it went to shopping the same day. The next morning, a ${auto} autopay hit and the account went negative.</p>`,
    q:'What is the mistake here?',
    choices:[
     {label:'Treated the windfall as exempt from the routine while a job was still unpaid', ok:true},
     {label:`${wind} was simply not enough money`, ok:false, mis:'price-only-decision'},
     {label:'Nothing — bonus money is for spending', ok:false, mis:'windfall-exception'},
     {label:'The mistake was the side gig, not the spending', ok:false},
    ],
    hint:'Did the autopay care that the money was a "bonus"?',
    good:`Right. The ${auto} autopay had a job regardless of where the ${wind} came from. Exempting windfalls exempts the math.`,
    bad:'The autopay did not pause for the bonus. What number should the shopping have been compared against?',
    why:'Money does not remember where it came from. Jobs attach to dollars, not to their origin story.'};
  }},
 { id:'available-money-spot-06', verb:'spot', part:5, tier:'independent', skill:'available-money',
  gen:(v)=>{
   const person=v.person();
   const pay=v.int(700,900);
   const rent=v.money(Math.round(v.cents(420,540)*100)/100);
   const fun=v.money(Math.round(v.cents(150,220)*100)/100);
   return {
    scenario:`<p>${person} splits every $${pay} paycheck evenly: $${Math.round(pay/2)} to bills, $${Math.round(pay/2)} to fun. This month: rent (${rent}) + utilities bounced the "bills half," and the "fun half" covered ${fun} of concerts.</p>`,
    q:'What is the mistake here?',
    choices:[
     {label:'Split the paycheck evenly instead of by actual jobs — the bills half was underfunded', ok:true},
     {label:`The concerts (${fun}) were the problem, not the split`, ok:false, mis:'price-only-decision'},
     {label:'Nothing — 50/50 is the fairest system', ok:false, mis:'even-split'},
     {label:`$${pay} is just not enough to live on`, ok:false},
    ],
    hint:'Fair splits and correct splits are different things. What did the bills actually cost?',
    good:`Right. Even splits ignore the real numbers: the bills half needed more than half. Fairness is not accuracy.`,
    bad:'Add up the actual bills. Did the "bills half" cover them? The split was decided by symmetry, not by jobs.',
    why:'Money splits must follow the jobs, not the aesthetics. An even split that underfunds rent is just a confident mistake.'};
  }},
 // ---- compare x6 (part 5, independent) ----
 { id:'available-money-compare-01', verb:'compare', part:5, tier:'independent', skill:'available-money',
  gen:(v)=>{
   const p1=v.person(), p2=v.person();
   const bal=v.money(Math.round(v.cents(380,480)*100)/100);
   const auto=v.money(Math.round(v.cents(120,170)*100)/100);
   return {
    context:`<p><b>${p1}:</b> checks the app (${bal}), subtracts the ${auto} autopay due tomorrow, then decides about dinner.</p><p><b>${p2}:</b> checks the app (${bal}) and decides about dinner straight from that number.</p>`,
    q:'Who is less likely to bounce the autopay?',
    choices:[
     {label:`${p1} — the decision used the available number`, ok:true},
     {label:`${p2} — faster decisions mean fewer mistakes`, ok:false, mis:'sort-dodge'},
     {label:'Same — both looked at the real balance', ok:false, mis:'available-means-balance'},
     {label:`${p2} — subtracting first is overthinking it`, ok:false, mis:'pending-is-cash'},
    ],
    hint:'One of them did the subtraction. Which one?',
    good:`Right. ${p1} spent from what was actually free. ${p2} spent the autopay's money and called it dinner.`,
    bad:'Both saw the same screen. Only one adjusted it. Who?',
    why:'Thirty seconds of subtraction is the whole difference between "dinner out" and "dinner out plus a bounce fee."'};
  }},
 { id:'available-money-compare-02', verb:'compare', part:5, tier:'independent', skill:'available-money',
  gen:(v)=>{
   const p1=v.person(), p2=v.person();
   const bal=v.money(Math.round(v.cents(400,500)*100)/100);
   const hold=v.money(Math.round(v.cents(50,90)*100)/100);
   return {
    context:`<p><b>${p1}:</b> balance ${bal}, no pending charges.</p><p><b>${p2}:</b> balance ${bal}, with a ${hold} pending hold.</p><p>Both are about to spend $100 on the same thing.</p>`,
    q:'Whose $100 is safer?',
    choices:[
     {label:`${p1} — same screen, but ${p2}\u2019s money has a ${hold} job hiding in it`, ok:true},
     {label:`${p2} — pending holds sometimes vanish`, ok:false, mis:'pending-is-cash'},
     {label:'Same — the balances are identical', ok:false, mis:'available-means-balance'},
     {label:`${p2} — holds do not affect new purchases`, ok:false},
    ],
    hint:'Identical screens, different realities. What is hiding?',
    good:`Right. ${p1} truly has the ${bal}. ${p2}'s real number is lower by ${hold} — the screen just has not caught up.`,
    bad:'Subtract the hold from the second balance. Now compare the two real numbers.',
    why:'Two identical balances can be two different budgets. Pending is the invisible difference.'};
  }},
 { id:'available-money-compare-03', verb:'compare', part:5, tier:'independent', skill:'available-money',
  gen:(v)=>{
   const p1=v.person(), p2=v.person();
   const amt=v.int(50,90);
   return {
    context:`<p><b>${p1}:</b> subtracts the $${amt} savings promise from the balance before deciding what is spendable.</p><p><b>${p2}:</b> decides what is spendable first, and saves from whatever is left at month end.</p>`,
    q:'Who actually builds savings?',
    choices:[
     {label:`${p1} — the promise is protected before spending starts`, ok:true},
     {label:`${p2} — month-end saving captures the true extra`, ok:false, mis:'savings-from-leftovers'},
     {label:'Same — $${amt} is $${amt} whenever it moves', ok:false, mis:'price-only-decision'},
     {label:`${p2} — flexible saving adapts to real months`, ok:false, mis:'savings-skippable'},
    ],
    hint:'When does each person\'s savings compete with spending?',
    good:`Right. ${p1}'s $${amt} never enters the spending pool. ${p2}'s savings fights every purchase for 30 days.`,
    bad:'In which system does savings get decided once, and in which does it get re-decided daily?',
    why:'Protection timing is everything. Subtracted-first savings is a transfer; leftover savings is a wish.'};
  }},
 { id:'available-money-compare-04', verb:'compare', part:5, tier:'independent', skill:'available-money',
  gen:(v)=>{
   const p1=v.person(), p2=v.person();
   const wind=v.money(Math.round(v.cents(100,180)*100)/100);
   return {
    context:`<p><b>${p1}:</b> gets ${wind} unexpectedly and runs it through the routine — buffer, then fun.</p><p><b>${p2}:</b> gets ${wind} unexpectedly and spends it all the same day — \u201cfound money!\u201d</p>`,
    q:'Who ends the month stronger?',
    choices:[
     {label:`${p1} — the windfall got jobs instead of evaporating`, ok:true},
     {label:`${p2} — found money is meant to be enjoyed fully`, ok:false, mis:'windfall-exception'},
     {label:'Same — ${wind} is ${wind}', ok:false, mis:'price-only-decision'},
     {label:`${p2} — sorting windfalls kills the joy`, ok:false, mis:'great-week-splurge'},
    ],
    hint:'A month later, what does each person have to show for it?',
    good:`Right. ${p1} has a fatter buffer and planned fun. ${p2} has a memory of a shopping day.`,
    bad:'Fast-forward 30 days. Who still has something from the windfall?',
    why:'Windfalls amplify habits: sorted money builds, unsorted money vanishes. The origin does not change the math.'};
  }},
 { id:'available-money-compare-05', verb:'compare', part:5, tier:'independent', skill:'available-money',
  gen:(v)=>{
   const p1=v.person(), p2=v.person();
   const big=v.money(Math.round(v.cents(200,300)*100)/100);
   const small=v.money(Math.round(v.cents(12,25)*100)/100);
   return {
    context:`<p><b>${p1}:</b> subtracts every autopay — including the ${small} ones — before spending.</p><p><b>${p2}:</b> subtracts only the big ${big} autopay; the ${small} subscriptions \u201care too small to matter.\u201d</p>`,
    q:'Whose available number is more honest?',
    choices:[
     {label:`${p1} — small jobs stack into a real number`, ok:true},
     {label:`${p2} — tracking tiny subscriptions is obsessive`, ok:false, mis:'price-only-decision'},
     {label:'Same — small amounts cannot break a budget', ok:false, mis:'available-means-balance'},
     {label:`${p2} — only big bills cause bounces`, ok:false},
    ],
    hint:'How many "too small to matter" charges does a typical month hold?',
    good:`Right. Four ${small} charges are a ${big}-sized bite. ${p2}'s number is honest-looking and wrong.`,
    bad:'Multiply the small ones by how many there are. Still "too small to matter"?',
    why:'Budgets die by a thousand small autopays. Honest math counts all of them.'};
  }},
 { id:'available-money-compare-06', verb:'compare', part:5, tier:'independent', skill:'available-money',
  gen:(v)=>{
   const p1=v.person(), p2=v.person();
   const bal=v.money(Math.round(v.cents(300,420)*100)/100);
   return {
    context:`<p><b>${p1}:</b> grocery-shops from the available number, after subtracting the week\u2019s jobs.</p><p><b>${p2}:</b> grocery-shops from the ${bal} screen balance, then hopes the bills fit.</p>`,
    q:'Whose groceries are less likely to cause a bounced bill?',
    choices:[
     {label:`${p1} — the groceries were sized to the real remainder`, ok:true},
     {label:`${p2} — bigger grocery budgets mean better food`, ok:false, mis:'available-means-balance'},
     {label:'Same — groceries are a Need either way', ok:false, mis:'needs-are-flexible'},
     {label:`${p2} — hoping is a valid strategy`, ok:false, mis:'sort-dodge'},
    ],
    hint:'Groceries are flexible spending — which makes them the perfect shock absorber, or the perfect thief.',
    good:`Right. ${p1}'s cart fits the remainder by construction. ${p2}'s cart fits the screen — and the bills pay the difference.`,
    bad:'Which shopper measured the remainder before filling the cart?',
    why:'Flexible spending should flex around the jobs, not through them. Measure first, shop second.'};
  }},
 // ---- predict x6 (part 5, independent) ----
 { id:'available-money-predict-01', verb:'predict', part:5, tier:'independent', skill:'available-money',
  gen:(v)=>{
   const person=v.person();
   const auto=v.money(Math.round(v.cents(100,160)*100)/100);
   return {
    q:`${person} keeps spending from the screen balance and ignoring the ${auto} autopay due each Thursday. What breaks first?`,
    choices:[
     {label:'The autopay bounces — the screen kept hiding the job', ok:true},
     {label:'Nothing — banks always cover autopays gracefully', ok:false, mis:'sort-dodge'},
     {label:'The spending money runs out first', ok:false, mis:'price-only-decision'},
     {label:'The autopay cancels itself', ok:false},
    ],
    hint:'The autopay does not check the screen. It checks the account.',
    good:'Right. Thursday arrives, the dollars are gone, the autopay bounces — plus a fee for the lesson.',
    bad:'The autopay is a machine: it pulls on Thursday no matter what the screen said on Monday. What happens when the dollars are not there?',
    why:'Ignoring a job does not cancel it. It just moves the failure to the worst possible moment.'};
  }},
 { id:'available-money-predict-02', verb:'predict', part:5, tier:'independent', skill:'available-money',
  gen:(v)=>{
   const person=v.person();
   const hold=v.money(Math.round(v.cents(55,95)*100)/100);
   return {
    q:`${person} treats a ${hold} pending gas hold as "not real yet" and spends that money on dinner. The hold posts tomorrow. What happens?`,
    choices:[
     {label:'The account goes short — the same dollars got spent twice', ok:true},
     {label:'Nothing — pending holds usually disappear', ok:false, mis:'pending-is-cash'},
     {label:'The gas station refunds the hold', ok:false},
     {label:'Dinner was free because the hold covered it', ok:false, mis:'sort-dodge'},
    ],
    hint:'Two spends, one pool of dollars.',
    good:'Right. Pump claimed them, dinner re-spent them. When the hold posts, the math catches up.',
    bad:'The hold is a claim, not a suggestion. What happens when a claim and a dinner compete for the same dollars?',
    why:'"Not posted" is a bank processing delay, not a second paycheck. Spending pending money is spending twice.'};
  }},
 { id:'available-money-predict-03', verb:'predict', part:5, tier:'independent', skill:'available-money',
  gen:(v)=>{
   const person=v.person();
   return {
    q:`${person} starts checking the available number — not the screen — before every purchase, for a full month. What changes?`,
    choices:[
     {label:'Surprise shortfalls stop — every buy was measured against reality', ok:true},
     {label:'Income increases', ok:false, mis:'price-only-decision'},
     {label:'Nothing — it is just a different number to look at', ok:false, mis:'sort-dodge'},
     {label:'Spending stops completely', ok:false, mis:'save-everything'},
    ],
    hint:'What caused the surprises before?',
    good:'Right. The surprises were never surprises — they were unsubtracted jobs. Subtracting first removes them.',
    bad:'Before, buys were measured against the screen. Now against the remainder. Which one was lying?',
    why:'Most "unexpected" shortfalls are expected bills met with unmeasured spending. The available number ends the ambush.'};
  }},
 { id:'available-money-predict-04', verb:'predict', part:5, tier:'independent', skill:'available-money',
  gen:(v)=>{
   const person=v.person();
   const bonus=v.money(Math.round(v.cents(200,350)*100)/100);
   return {
    q:`${person} has a great week — overtime plus a ${bonus} bonus. ${person} decides it is a "treat yourself" week and spends it all without running the routine. What happens next month?`,
    choices:[
     {label:'Nothing to show for it — the great week evaporated with no buffer built', ok:true},
     {label:'The great week compounds into lasting wealth', ok:false, mis:'great-week-splurge'},
     {label:'Bills get cheaper out of gratitude', ok:false},
     {label:'It was the right call — great weeks are rare', ok:false, mis:'windfall-exception'},
    ],
    hint:'A month later, what remains of the great week?',
    good:'Right. Unsorted windfalls become stories, not buffers. Next month starts at zero — again.',
    bad:'The bonus is gone; what did it build? Compare that to a sorted version of the same week.',
    why:'Great weeks only change the future if some of the greatness gets a job. Otherwise they are just expensive memories.'};
  }},
 { id:'available-money-predict-05', verb:'predict', part:5, tier:'independent', skill:'available-money',
  gen:(v)=>{
   const person=v.person();
   const save=v.int(40,70);
   return {
    q:`${person} skips the $${save} savings promise "just until things settle down." Six months pass. What is true?`,
    choices:[
     {label:`About $${save*26} never got saved — "temporary" became permanent`, ok:true},
     {label:'The money saved itself anyway', ok:false, mis:'savings-from-leftovers'},
     {label:'Things settled down, so it all worked out', ok:false, mis:'sort-dodge'},
     {label:`$${save} is too small to have mattered`, ok:false, mis:'savings-skippable'},
    ],
    hint:'"Until things settle down" has no end date. What fills the gap?',
    good:`Right. $${save} × 26 weeks ≈ $${save*26} gone — not to bills, to drift. Temporary pauses without end dates are permanent.`,
    bad:'Count the skipped weeks. Then ask what "settled down" was waiting for.',
    why:'Pauses need resume dates. Without one, "just for now" is just "never" with better PR.'};
  }},
 { id:'available-money-predict-06', verb:'predict', part:5, tier:'independent', skill:'available-money',
  gen:(v)=>{
   const person=v.person();
   const hold=v.money(Math.round(v.cents(40,70)*100)/100);
   return {
    q:`${person} sees a ${hold} pending hold and decides to wait one day for it to post before buying anything. What does the waiting buy?`,
    choices:[
     {label:'Certainty — the decision gets made with the true number', ok:true},
     {label:'Nothing — waiting is just procrastination', ok:false, mis:'sort-dodge'},
     {label:'Higher prices tomorrow', ok:false, mis:'price-only-decision'},
     {label:'The hold disappears if ignored', ok:false, mis:'pending-is-cash'},
    ],
    hint:'What is the cost of deciding with a blurry number?',
    good:'Right. One day of patience trades a guess for the real number. Cheap insurance.',
    bad:'The alternative is deciding now with a number that is wrong by the hold amount. Which is riskier?',
    why:'When the number is blurry, waiting is a strategy — not hesitation. Clarity is worth a day.'};
  }},
 // ---- build x5 (part 5, independent) ----
 { id:'available-money-build-01', verb:'build', part:5, tier:'independent', skill:'available-money',
  gen:(v)=>{
   return { h:'Build it: what is actually available?',
    body:'<p>$500 in the account. Bills due: $280. Savings promise: $50. Build the true picture.</p>',
    totalDollars:500, buckets:[{id:'bills',label:'Bills due'},{id:'savings',label:'Savings promise'},{id:'free',label:'Free to spend'}],
    targets:{bills:280,savings:50,free:170},
    hint:'Subtract every job: $500 − $280 − $50 = $170 free.',
    good:'Right: $280 bills, $50 savings, $170 free. The screen said $500; the truth is $170.',
    bad:'List every job first, then subtract. What is left is the spending number.',
    why:'Building the split makes the invisible jobs visible — that is the whole skill.'};
  }},
 { id:'available-money-build-02', verb:'build', part:5, tier:'independent', skill:'available-money',
  gen:(v)=>{
   return { h:'Build it: the autopay stack',
    body:'<p>$640 balance. Three autopays ($350 total) plus an $80 savings promise. Build it.</p>',
    totalDollars:640, buckets:[{id:'bills',label:'Bills due'},{id:'savings',label:'Savings promise'},{id:'free',label:'Free to spend'}],
    targets:{bills:350,savings:80,free:210},
    hint:'$640 − $350 − $80 = $210 free.',
    good:'Right: $350 bills, $80 savings, $210 free. Stacked autopays, fully accounted.',
    bad:'Add the autopays together first, then subtract everything with a job.',
    why:'Autopays stack silently. Building the split drags them into the open.'};
  }},
 { id:'available-money-build-03', verb:'build', part:5, tier:'independent', skill:'available-money',
  gen:(v)=>{
   return { h:'Build it: tight month',
    body:'<p>$420 in the account. Bills: $200. Savings promise: $40. Every dollar counts — build it exactly.</p>',
    totalDollars:420, buckets:[{id:'bills',label:'Bills due'},{id:'savings',label:'Savings promise'},{id:'free',label:'Free to spend'}],
    targets:{bills:200,savings:40,free:180},
    hint:'$420 − $200 − $40 = $180 free.',
    good:'Right: $200 bills, $40 savings, $180 free. Tight months need the math most.',
    bad:'Tight does not mean skip the subtraction — it means the subtraction matters more.',
    why:'When money is tight, the available number is the difference between control and chaos.'};
  }},
 { id:'available-money-build-04', verb:'build', part:5, tier:'independent', skill:'available-money',
  gen:(v)=>{
   return { h:'Build it: payday plus pending',
    body:'<p>$780 balance — but a $90 gas hold is still pending. Bills due: $420. Savings promise: $100. Build the honest split.</p>',
    totalDollars:780, buckets:[{id:'bills',label:'Bills due'},{id:'pending',label:'Pending hold'},{id:'savings',label:'Savings promise'},{id:'free',label:'Free to spend'}],
    targets:{bills:420,pending:90,savings:100,free:170},
    hint:'$780 − $420 − $90 − $100 = $170 free.',
    good:'Right: $420 bills, $90 pending, $100 savings, $170 free. The pending hold got its own bucket — as it should.',
    bad:'Pending is a job too. Give it a bucket before you count what is free.',
    why:'Four buckets because reality has four claims. Honest splits count the quiet ones.'};
  }},
 { id:'available-money-build-05', verb:'build', part:5, tier:'independent', skill:'available-money',
  gen:(v)=>{
   return { h:'Build it: the bonus week',
    body:'<p>$360 balance. Bills: $190. Savings promise: $30. A $60 side-gig payment just arrived in cash. Build the full picture.</p>',
    totalDollars:420, buckets:[{id:'bills',label:'Bills due'},{id:'savings',label:'Savings promise'},{id:'free',label:'Free to spend'}],
    targets:{bills:190,savings:30,free:200},
    hint:'New total: $360 + $60 = $420. Then $420 − $190 − $30 = $200 free.',
    good:'Right: $190 bills, $30 savings, $200 free. The side-gig cash joined the pool and got sorted.',
    bad:'Add the new cash to the total first — then run the usual subtraction.',
    why:'Windfalls change the total before they change the split. New total, same routine.'};
  }},
 // ---- explain x5 (part 5, independent) ----
 { id:'available-money-explain-01', verb:'explain', part:5, tier:'independent', skill:'available-money',
  gen:(v)=>{
   return { h:'Teach it back: the lying screen',
    prompt:'Explain in your own words why the balance on the screen is not the spending number.',
    keyPoints:['The screen shows dollars before jobs are subtracted','Autopays, pending holds, and promises already claim part of it','Available = balance minus everything with a job','Spending the screen spends other jobs\u2019 money too'],
    modelAnswer:'The screen shows every dollar in the account, but some of those dollars already have jobs — autopays about to hit, holds not yet posted, promises you made. The spending number is what is left after all of those are subtracted. Spending the screen means spending money that belongs to a bill.',
    hint:'What does the screen show, and what does it hide?'};
  }},
 { id:'available-money-explain-02', verb:'explain', part:5, tier:'independent', skill:'available-money',
  gen:(v)=>{
   return { h:'Teach it back: pending counts',
    prompt:'Explain why a pending charge has to be subtracted even though it "has not posted yet."',
    keyPoints:['Pending means the merchant already claimed the money','"Not posted" is bank paperwork speed, not a discount','The dollars will leave — the only question is when','Spending them now means spending the same dollars twice'],
    modelAnswer:'Pending just means the bank is slow at paperwork — the merchant already claimed the money and it will leave your account. Treating it as still yours means the same dollars get spent twice: once by the hold, once by you. Subtract it now and the surprise never comes.',
    hint:'What does "pending" actually describe — the money, or the paperwork?'};
  }},
 { id:'available-money-explain-03', verb:'explain', part:5, tier:'independent', skill:'available-money',
  gen:(v)=>{
   return { h:'Teach it back: promises are jobs',
    prompt:'Explain why a savings promise counts as "money with a job" even though no bill requires it.',
    keyPoints:['A promise you made to yourself is still a commitment','If it is not subtracted, spending will eat it','Jobs are about decisions, not just due dates','Protecting the promise is what makes savings real'],
    modelAnswer:'A job is any decision you have already made about money — bills, holds, and promises all count. If the savings promise is not subtracted up front, every purchase gets a quiet vote against it, and it loses. Counting it as a job protects it from the spending before the spending starts.',
    hint:'What happens to unsubtracted promises over 30 days?'};
  }},
 { id:'available-money-explain-04', verb:'explain', part:5, tier:'independent', skill:'available-money',
  gen:(v)=>{
   return { h:'Teach it back: compare, do not guess',
    prompt:'Explain how to answer "can I afford this?" using the available number.',
    keyPoints:['First compute available: balance minus all jobs','Then compare the price to that number, not the balance','If price fits inside available, it is safe; if not, it waits','The rule removes guilt and guessing — it is arithmetic'],
    modelAnswer:'Can-I-afford-it is a two-step comparison: first find the available number by subtracting every job, then hold the price up against it. Fits inside means yes; bigger means wait. No willpower, no guilt — the numbers decide, and the autopays stay safe either way.',
    hint:'What are the two numbers being compared?'};
  }},
 { id:'available-money-explain-05', verb:'explain', part:5, tier:'independent', skill:'available-money',
  gen:(v)=>{
   return { h:'Teach it back: the 60-second check',
    prompt:'Explain the 60-second routine for finding your real spending number before any purchase.',
    keyPoints:['Open the app and read the balance — that is the start, not the answer','Subtract autopays and bills due before next payday','Subtract pending holds and your savings promise','What is left is safe to decide from'],
    modelAnswer:'Sixty seconds: read the balance, then subtract — in your head or on paper — every autopay due soon, every pending hold, and your savings promise. Whatever remains is your real spending number for the week. Do it before the store, not after, and the number you decide from is the number that is true.',
    hint:'What are the three things to subtract, every time?'};
  }},
],
'depends-decisions': [
 // ---- choice x8 (parts 5-6) ----
 { id:'depends-decisions-choice-01', verb:'choice', part:5, tier:'independent', skill:'depends-decisions',
  gen:(v)=>{
   const person=v.person();
   const coat=v.money(Math.round(v.cents(80,140)*100)/100);
   return {
    q:`${person} is looking at a ${coat} winter coat. It is November, ${person} owns no coat, and the bus stop wait is 20 minutes. Need or Want?`,
    choices:[
     {label:'Need — health and safety with no alternative', ok:true},
     {label:'Want — coats are clothing, and clothing is a Want', ok:false, mis:'absolute-rules'},
     {label:'Need — but only if it is on sale', ok:false, mis:'sale-not-needed'},
     {label:'It depends — there is never enough info', ok:false, mis:'sort-dodge'},
    ],
    hint:'Ask: "what is it for, right now?"',
    good:'Right. No coat + winter + long outdoor wait = health and safety. The context makes it a Need.',
    bad:'Check the context, not the item: November, no coat, 20-minute outdoor wait. What is it for?',
    why:'The category lives in the context. Same coat, different situation, different bucket.'};
  }},
 { id:'depends-decisions-choice-02', verb:'choice', part:5, tier:'independent', skill:'depends-decisions',
  gen:(v)=>{
   const person=v.person();
   const coat=v.money(Math.round(v.cents(80,140)*100)/100);
   return {
    q:`${person} is looking at a ${coat} winter coat. ${person} already owns a warm one that works fine — this one just looks better. Need or Want?`,
    choices:[
     {label:'Want — the warmth Need is already covered', ok:true},
     {label:'Need — everyone needs a backup coat', ok:false, mis:'sort-dodge'},
     {label:'Need — it is winter, so coats are Needs', ok:false, mis:'absolute-rules'},
     {label:'Savings — not buying it counts as saving', ok:false, mis:'not-spending-is-saving'},
    ],
    hint:'What is it for, right now? The first coat already does that job.',
    good:'Right. Warmth is covered; this coat\'s job is style. Second of something that works = Want.',
    bad:'The first coat already handles "warm." What job is left for this one?',
    why:'Duplicates of working items are Wants. The Need was satisfied by coat number one.'};
  }},
 { id:'depends-decisions-choice-03', verb:'choice', part:5, tier:'independent', skill:'depends-decisions',
  gen:(v)=>{
   const person=v.person();
   const amt=v.money(Math.round(v.cents(25,60)*100)/100);
   return {
    q:`${person} is deciding about ${amt} of takeout. That is ALL the info — no word on the fridge, the budget, or the occasion. Which bucket?`,
    choices:[
     {label:'It depends — more info needed', ok:true},
     {label:'Need — food is always a Need', ok:false, mis:'absolute-rules'},
     {label:'Want — takeout is always a Want', ok:false, mis:'absolute-rules'},
     {label:'Need — guess Need to be safe', ok:false, mis:'sort-dodge'},
    ],
    hint:'No context, no category. What questions would you ask?',
    good:'Right. Empty fridge? A craving? A planned celebration? Without context, "it depends" is the honest answer.',
    bad:'"Food is a Need" skips the real question: is THIS food filling an unfilled need, or doubling up?',
    why:'"It depends" is not a dodge when info is genuinely missing — it is the correct refusal to guess.'};
  }},
 { id:'depends-decisions-choice-04', verb:'choice', part:5, tier:'independent', skill:'depends-decisions',
  gen:(v)=>{
   const person=v.person();
   const rep=v.money(Math.round(v.cents(180,320)*100)/100);
   return {
    q:`${person}\u2019s car needs a ${rep} repair. There is no bus route to ${person}\u2019s job, and missing shifts means losing the job. Need or Want?`,
    choices:[
     {label:'Need — the paycheck depends on the car', ok:true},
     {label:'Want — cars are lifestyle items', ok:false, mis:'absolute-rules'},
     {label:'It depends — cars are always a gray area', ok:false, mis:'sort-dodge'},
     {label:'Need — but only the cheapest possible repair', ok:false, mis:'price-only-decision'},
    ],
    hint:'Follow the chain: no repair → no car → no job → no income.',
    good:'Right. The repair protects the income itself. When the paycheck depends on it, it is a Need.',
    bad:'Ask what breaks without the repair — not the car, but what the car enables.',
    why:'Needs include whatever the income depends on. Context (no bus route) is doing all the work here.'};
  }},
 { id:'depends-decisions-choice-05', verb:'choice', part:6, tier:'independent', skill:'depends-decisions',
  gen:(v)=>{
   const person=v.person();
   const med=v.money(Math.round(v.cents(15,35)*100)/100);
   return {
    q:`${person} follows the rule "never buy coffee out — it is always a Want." ${person} also skipped a ${med} prescription refill to "stay disciplined." What is wrong with the rule?`,
    choices:[
     {label:'It is absolute — it treats medicine and coffee as the same decision', ok:true},
     {label:'Nothing — discipline means no exceptions', ok:false, mis:'absolute-rules'},
     {label:`The coffee rule is fine; the ${med} was just too expensive`, ok:false, mis:'price-only-decision'},
     {label:'Rules are the problem — ${person} should decide by feeling', ok:false, mis:'sort-dodge'},
    ],
    hint:'A rule that cannot tell coffee from medicine is not discipline — it is blindness.',
    good:'Right. Absolute rules skip the context question. Coffee out: Want. Prescription: Need. One rule, two wrong answers.',
    bad:'Apply the rule to both items. Does the same answer make sense for both?',
    why:'Rigid rules feel disciplined and decide badly. Context beats commandments.'};
  }},
 { id:'depends-decisions-choice-06', verb:'choice', part:6, tier:'independent', skill:'depends-decisions',
  gen:(v)=>{
   const person=v.person();
   const cheap=v.money(Math.round(v.cents(20,35)*100)/100);
   const good=v.money(Math.round(v.cents(45,65)*100)/100);
   return {
    q:`${person} needs work boots. Option A: ${cheap}, lasts 3 months. Option B: ${good}, lasts 2 years. ${person}\u2019s rule is "always buy the cheapest." What is the flaw?`,
    choices:[
     {label:'Price-only thinking — the cheap boots cost more per month of use', ok:true},
     {label:'Nothing — cheapest is always smartest', ok:false, mis:'price-only-decision'},
     {label:`Option B is a Want because it costs more`, ok:false, mis:'price-decides-need'},
     {label:'Boots are Wants, so the rule does not apply', ok:false, mis:'sort-dodge'},
    ],
    hint:'Divide price by months of use. Which is actually cheaper?',
    good:`Right. A: ~$${Math.round(cheap*100/3)/100}/month. B: ~$${Math.round(good*100/24)/100}/month. "Cheapest" at the register is the most expensive over time.`,
    bad:'The sticker is not the cost — the cost is price divided by how long it lasts. Run that division.',
    why:'Price-only decisions confuse the tag with the value. Context includes how long the thing works.'};
  }},
 { id:'depends-decisions-choice-07', verb:'choice', part:6, tier:'independent', skill:'depends-decisions',
  gen:(v)=>{
   const person=v.person();
   return {
    q:`${person} says: "My rule is simple — if it costs more, it must be more of a Need." What is wrong with that rule?`,
    choices:[
     {label:'Price does not decide the bucket — context does', ok:true},
     {label:'Nothing — expensive things are Needs by definition', ok:false, mis:'price-decides-need'},
     {label:'The rule is fine for bills but not for fun', ok:false},
     {label:'Rules about money are always wrong', ok:false, mis:'sort-dodge'},
    ],
    hint:'Think of an expensive Want and a cheap Need.',
    good:'Right. A $200 concert ticket is a Want; a $4 bus fare can be a Need. Price and bucket are unrelated.',
    bad:'Test the rule: find one expensive Want and one cheap Need. If both exist, the rule is broken.',
    why:'"Expensive = Need" lets pricey Wants smuggle into the protected bucket. The question is always "what is it for?"'};
  }},
 { id:'depends-decisions-choice-08', verb:'choice', part:6, tier:'independent', skill:'depends-decisions',
  gen:(v)=>{
   const person=v.person();
   return {
    q:`${person} pays bills in the order they arrive — "first come, first served." The streaming bill arrived Monday; rent is due Friday. Payday was last week. What is the flaw?`,
    choices:[
     {label:'Arrival order is random — it lets unimportant bills draft before rent', ok:true},
     {label:'Nothing — first-come-first-served is the fairest method', ok:false, mis:'first-come-first-served'},
     {label:'The flaw is paying the streaming bill at all', ok:false, mis:'absolute-rules'},
     {label:'Bills should be paid by which is cheapest first', ok:false, mis:'price-only-decision'},
    ],
    hint:'Is "arrived Monday" a good reason to beat "due Friday"?',
    good:'Right. The mail schedule is not a priority system. Rent should outrank streaming regardless of arrival day.',
    bad:'What decides the order here — importance, or the post office? Which should it be?',
    why:'Fair-feeling systems can still be wrong systems. Protection needs ranking by job, not by arrival.'};
  }},
 // ---- sort x6 (parts 6-7) ----
 { id:'depends-decisions-sort-01', verb:'sort', part:6, tier:'independent', skill:'depends-decisions',
  gen:(v)=>{
   const list=[
    ['Laptop — required for classes','need','Required to function as a student. Need.'],
    ['Laptop — mostly for gaming','want','Same object, different job. For games it is a Want.'],
    ['Winter coat — owns none, it is November','need','Health and safety. Need.'],
    ['Winter coat — already owns a warm one','want','The second coat is optional. Want.'],
    ['Ordering takeout (no other info)','it depends','No food at home leans Need; a craving leans Want. Need more info.'],
    ['A $60 video game (no other info)','it depends','A planned reward? A gift? Without context you cannot sort it.'],
    ['Car — no bus route to the job','need','Without it there is no income. Need.'],
   ];
   return { h:'Sort it: context is the category', body:'<p>Read the full line — the context after the dash decides the bucket.</p>',
    buckets:['Need','Want','It depends'],
    items:v.shuffle(list).slice(0,7).map(x=>({label:x[0],a:x[1],why:x[2]}))};
  }},
 { id:'depends-decisions-sort-02', verb:'sort', part:6, tier:'independent', skill:'depends-decisions',
  gen:(v)=>{
   const list=[
    ['Phone charger — hers died and her shifts come by text','need','No phone = no shifts = no pay. Need.'],
    ['Phone charger — hers works, she wants a longer cable','want','The phone already charges. Want.'],
    ['Lunch out — fridge empty, no packed lunch','need','No food at home and no backup — this lunch is the Need.'],
    ['Lunch out — groceries waiting at home','want','The Need is covered at home; this lunch is social. Want.'],
    ['New shoes — old pair has holes, on feet all shift','need','Function for the job. Need.'],
    ['New shoes — old pair fine, these are a style upgrade','want','The upgrade is optional. Want.'],
    ['Gym membership (no other info)','it depends','Health goal? Social? Unused subscription? Depends on the why.'],
   ];
   return { h:'Sort it: same item, different job', body:'<p>Pairs of identical items with opposite contexts. The dash decides.</p>',
    buckets:['Need','Want','It depends'],
    items:v.shuffle(list).slice(0,7).map(x=>({label:x[0],a:x[1],why:x[2]}))};
  }},
 { id:'depends-decisions-sort-03', verb:'sort', part:6, tier:'independent', skill:'depends-decisions',
  gen:(v)=>{
   const items=[
    ['Medicine refill — prescribed, daily','need','Health is non-negotiable. Need.'],
    ['Vitamins — "might help," no deficiency','want','Optional optimization. Want.'],
    ['Haircut — job interview tomorrow','need','Function for earning. Need.'],
    ['Haircut — third this month, just because','want','Maintenance beyond function. Want.'],
    ['"Buy the cheapest always" as a rule','it depends','Smart for commodities, costly for boots. Depends on the item.'],
    ['Streaming bundle (no other info)','it depends','Used daily? Forgotten subscription? Depends on the reality.'],
    ['Work uniform — required, unprovided','need','Required to earn. Need.'],
   ];
   return { h:'Sort it: critique the reflex', body:'<p>Some of these punish rigid thinking. Sort by context, not by reflex.</p>',
    buckets:['Need','Want','It depends'],
    items:v.shuffle(items).slice(0,7).map(x=>({label:x[0],a:x[1],why:x[2]}))};
  }},
 { id:'depends-decisions-sort-04', verb:'sort', part:7, tier:'independent', skill:'depends-decisions',
  gen:(v)=>{
   const person=v.person();
   const items=[
    ['Rent — due Friday','need','Housing. Need, and first in line.'],
    ['$60 savings move — promised','need','A promise is a job; treat it as protected.'],
    ['Groceries — fridge empty','need','Food for the week. Need.'],
    ['Takeout Friday — friends going','want','Social fun. Want.'],
    ['New game release','want','Day-one hype. Want.'],
    ['Car insurance — due next week','need','Legal and protective. Need.'],
    ['Side-gig bonus — unsorted','it depends','New money with no job yet — depends on what it is assigned to.'],
    ['Old laptop — still works, want the new model','want','Working tool + upgrade itch = Want.'],
   ];
   return { h:`Sort it: ${person}'s full week`, body:'<p>Construct the whole week\u2019s sort — every dollar in its bucket before anything is decided.</p>',
    buckets:['Need','Want','It depends'],
    items:v.shuffle(items).slice(0,8).map(x=>({label:x[0],a:x[1],why:x[2]}))};
  }},
 { id:'depends-decisions-sort-05', verb:'sort', part:7, tier:'independent', skill:'depends-decisions',
  gen:(v)=>{
   const items=[
    ['Bus pass — only way to work','need','Income depends on it. Need.'],
    ['Bus pass — car works fine too','want','Backup transport when the car runs. Want.'],
    ['Dinner out — anniversary','want','Meaningful, planned, still a Want.'],
    ['Dinner out — no food at home, stores closed','need','The only food available. Need.'],
    ['Course fee — required certification','need','Required to keep earning. Need.'],
    ['Course fee — interesting hobby topic','want','Enrichment, not requirement. Want.'],
    ['$100 — "miscellaneous"','it depends','Unassigned money: depends on what it gets assigned to.'],
    ['Phone upgrade — current one dying','need','Work and safety tool failing. Need.'],
   ];
   return { h:'Sort it: the ambiguous week', body:'<p>Half of these flip buckets on one word of context. Read every word.</p>',
    buckets:['Need','Want','It depends'],
    items:v.shuffle(items).slice(0,8).map(x=>({label:x[0],a:x[1],why:x[2]}))};
  }},
 { id:'depends-decisions-sort-06', verb:'sort', part:7, tier:'independent', skill:'depends-decisions',
  gen:(v)=>{
   const person=v.person();
   const items=[
    ['First month\u2019s rent — new apartment','need','Housing. Need.'],
    ['Renter\u2019s insurance — required by lease','need','Required and protective. Need.'],
    ['New furniture — apartment is empty','it depends','A bed might be a Need; a statement chair is a Want. Depends on the piece.'],
    ['Takeout — kitchen not set up yet','need','No way to cook yet. Need, temporarily.'],
    ['Decor — "make it feel like home"','want','Comfort styling. Want.'],
    ['Tool set — for the new maintenance job','need','Required to earn. Need.'],
    ['Streaming — "for background noise while unpacking"','want','Nice, not necessary. Want.'],
    ['Savings — first deposit in the new place','it depends','Smart, but the amount depends on what is left after Needs.'],
   ];
   return { h:`Sort it: ${person} just moved`, body:'<p>New-place chaos: everything feels urgent. Sort by actual job, not by stress.</p>',
    buckets:['Need','Want','It depends'],
    items:v.shuffle(items).slice(0,8).map(x=>({label:x[0],a:x[1],why:x[2]}))};
  }},
 // ---- decide x8 (parts 5-8) ----
 { id:'depends-decisions-decide-01', verb:'decide', part:5, tier:'independent', skill:'depends-decisions',
  gen:(v)=>{
   const person=v.person();
   const take=v.money(Math.round(v.cents(24,40)*100)/100);
   const empty=v.pick([true,false]);
   return {
    q: empty?`${person} gets home wiped out. The fridge is empty, the store is closed, and takeout costs ${take}. What is the call?`
     :`${person} is craving takeout (${take}), but the fridge is full of groceries bought yesterday. What is the call?`,
    choices: empty?[
     {label:'Order it — with no food available, this takeout is the Need', ok:true},
     {label:'Go hungry — takeout is always a Want, no exceptions', ok:false, mis:'absolute-rules'},
     {label:'Order double — hunger justifies anything', ok:false, mis:'needs-are-flexible'},
     {label:'Wait until morning — Needs can always wait', ok:false, mis:'sort-dodge'}
    ]:[
     {label:'Cook at home — the Need is already covered; this is a Want', ok:true},
     {label:'Order it — cravings are Needs', ok:false, mis:'needs-are-flexible'},
     {label:'Order it — the groceries can be tomorrow\u2019s problem', ok:false, mis:'first-come-first-served'},
     {label:'Throw the groceries out so the takeout becomes a Need', ok:false}
    ],
    hint:'Same item, opposite contexts. What is the fridge situation?',
    good: empty?`Right. No food, no store — the ${take} takeout is doing a Need\u2019s job tonight.`:`Right. The groceries already cover the Need; the takeout is pure Want. Cook.`,
    bad: empty?'Check the context: empty fridge, closed store. What is the takeout FOR?':'The groceries are already bought and waiting. What job would the takeout do?',
    why:'"It depends" in action: identical purchase, opposite buckets — decided by what the fridge holds.'};
  }},
 { id:'depends-decisions-decide-02', verb:'decide', part:5, tier:'independent', skill:'depends-decisions',
  gen:(v)=>{
   const person=v.person();
   const rep=v.money(Math.round(v.cents(120,200)*100)/100);
   const rep2=v.money(Math.round(v.cents(300,450)*100)/100);
   const old=v.pick([true,false]);
   return {
    q: old?`${person}\u2019s 8-year-old laptop needs a ${rep} repair. Classes require a working laptop. A new one costs ${rep2}. What is the call?`
     :`${person}\u2019s 1-year-old laptop needs a ${rep} repair under a free warranty fix — but the new model just dropped for ${rep2}. What is the call?`,
    choices: old?[
     {label:`Repair it — ${rep} keeps the required tool working`, ok:true},
     {label:`Buy the new ${rep2} model — repairs are throwing money away`, ok:false, mis:'price-only-decision'},
     {label:'Do neither — borrow a laptop forever', ok:false, mis:'sort-dodge'},
     {label:`Repair it, then also buy the new one`, ok:false, mis:'needs-are-flexible'}
    ]:[
     {label:'Take the free warranty repair — the new model is a Want', ok:true},
     {label:`Buy the ${rep2} model — new is always better`, ok:false, mis:'sale-not-needed'},
     {label:`Buy it — the repair being free makes the laptop a Need`, ok:false, mis:'price-decides-need'},
     {label:'Skip the repair — warranties are not worth the trip', ok:false, mis:'sort-dodge'}
    ],
    hint:'What is the laptop FOR, right now? And what does it cost to keep it doing that?',
    good: old?`Right. The Need is "a working laptop for classes" — the ${rep} repair delivers exactly that.`:`Right. The Need (working laptop) is free via warranty. The ${rep2} is pure Want dressed as an upgrade.`,
    bad: old?`Separate the Need (working laptop for classes) from the Want (shiny new model). Which option serves the Need?`:'The warranty repair is free and restores the tool. What job would the new model do that the repaired one cannot?',
    why:'Repair-vs-replace is a context question: age, requirement, and cost-per-job — not a loyalty test to "new."'};
  }},
 { id:'depends-decisions-decide-03', verb:'decide', part:5, tier:'independent', skill:'depends-decisions',
  gen:(v)=>{
   const person=v.person();
   const buy=v.money(Math.round(v.cents(60,110)*100)/100);
   const once=v.pick([true,false]);
   return {
    q: once?`${person} needs a ${buy} tool for a one-time furniture assembly this weekend. A neighbor offered to lend the same tool free. What is the call?`
     :`${person} needs a ${buy} tool — and will use it weekly for a side gig that pays. What is the call?`,
    choices: once?[
     {label:'Borrow it — a one-time job does not justify owning', ok:true},
     {label:`Buy it — owning tools is always a Need`, ok:false, mis:'absolute-rules'},
     {label:`Buy the premium version — tools are investments`, ok:false, mis:'price-decides-need'},
     {label:'Skip the assembly — furniture is optional', ok:false, mis:'sort-dodge'}
    ]:[
     {label:`Buy it — weekly paid use makes it a Need for earning`, ok:true},
     {label:'Keep borrowing weekly — buying is a Want', ok:false, mis:'absolute-rules'},
     {label:`Rent it each time — ownership is never worth it`, ok:false, mis:'absolute-rules'},
     {label:`Buy the cheapest one regardless of quality`, ok:false, mis:'price-only-decision'}
    ],
    hint:'Frequency changes everything. How many times will this tool earn its keep?',
    good: once?`Right. One use = borrow. The ${buy} stays available for things that actually need buying.`:`Right. Weekly paid use = the tool is equipment, and equipment that earns is a Need.`,
    bad: once?'How many times will you use it? Divide the price by that. Now compare to free.':`How often does it get used, and does that use pay? That is the whole decision.`,
    why:'"Buy vs borrow" is answered by frequency × purpose. One-time: borrow. Income-producing: own.'};
  }},
 { id:'depends-decisions-decide-04', verb:'decide', part:5, tier:'independent', skill:'depends-decisions',
  gen:(v)=>{
   const person=v.person();
   const sale=v.money(Math.round(v.cents(40,75)*100)/100);
   const soon=v.pick([true,false]);
   const item=v.pick(['work shoes','a winter coat','a phone charger','kitchen knives']);
   return {
    q: soon?`${person} sees ${item} on sale for ${sale} — and the current one is falling apart this month. What is the call?`
     :`${person} sees ${item} on sale for ${sale} — the current one works fine and should last another year. What is the call?`,
    choices: soon?[
     {label:`Buy it — a needed replacement at a discount is smart timing`, ok:true},
     {label:'Wait for a bigger sale — discounts only count over 50% off', ok:false, mis:'absolute-rules'},
     {label:'Do not buy — sales are always traps', ok:false, mis:'absolute-rules'},
     {label:`Buy two — the discount justifies stocking up`, ok:false, mis:'sale-not-needed'}
    ]:[
     {label:'Pass — a discount on an unneeded item is still spending', ok:true},
     {label:`Buy it — ${sale} is too cheap to be a Want`, ok:false, mis:'cheap-means-need'},
     {label:'Buy it — it will be needed eventually', ok:false, mis:'sale-not-needed'},
     {label:`Buy it and skip a savings move to cover it`, ok:false, mis:'savings-skippable'}
    ],
    hint:'The sale is the same in both versions. What is different?',
    good: soon?`Right. The Need already existed; the sale just made it cheaper. That is what discounts are for.`:`Right. Nothing is broken, nothing is needed — the red tag is doing all the talking.`,
    bad: soon?'Is the item needed, or is the discount creating the need? Here the need came first.':'Cover the red tag with your thumb. Would you buy it at full price today? There is your answer.',
    why:'Sales do not create Needs; at best they discount existing ones. "Needed soon + on sale" is the only combo that works.'};
  }},
 { id:'depends-decisions-decide-05', verb:'decide', part:8, tier:'stretch', skill:'depends-decisions',
  gen:(v)=>{
   const person=v.person();
   const gift=v.money(Math.round(v.cents(75,140)*100)/100);
   const avail=v.money(Math.round(v.cents(40,70)*100)/100);
   const friend=v.person();
   return {
    q:`Novel situation: ${friend}\u2019s wedding is Saturday — ${person} genuinely wants to go. A proper gift costs about ${gift}, but ${person}\u2019s available money this week is ${avail}. Skipping feels awful; overspending breaks the routine. What is the call?`,
    choices:[
     {label:`Go, give what fits in ${avail} with a heartfelt card — presence beats price`, ok:true},
     {label:`Spend the ${gift} anyway — friendships are Needs, so the budget bends`, ok:false, mis:'needs-are-flexible'},
     {label:'Skip the wedding — the routine says no, and routines have no exceptions', ok:false, mis:'absolute-rules'},
     {label:`Put the ${gift} on a credit card — future ${person} will figure it out`, ok:false, mis:'first-come-first-served'},
    ],
    hint:'The Need here is the friendship, not the gift amount. How else can that Need be honored?',
    good:`Right. The relationship is the Need; the ${gift} price tag is not. Showing up with ${avail} and honesty protects both.`,
    bad:'Separate the two things: attending (the relationship) vs the gift amount (the pressure). Which one is actually the Need?',
    why:'Social pressure tries to price-tag relationships. Context thinking honors the Need (showing up) without letting the Want (the impressive gift) raid the budget.'};
  }},
 { id:'depends-decisions-decide-06', verb:'decide', part:8, tier:'stretch', skill:'depends-decisions',
  gen:(v)=>{
   const person=v.person();
   const gear=v.money(Math.round(v.cents(220,380)*100)/100);
   const earn=v.money(Math.round(v.cents(150,260)*100)/100);
   return {
    q:`Novel situation: ${person} is offered weekend gig work paying ${earn}/month — but it needs ${gear} of equipment up front. ${person}\u2019s buffer is thin and rent is due in two weeks. What is the call?`,
    choices:[
     {label:'Verify the gig is real first, then buy only if payback is under two months', ok:true},
     {label:`Buy the gear immediately — income opportunities are always Needs`, ok:false, mis:'needs-are-flexible'},
     {label:'Never buy gear for gig work — that is always a Want', ok:false, mis:'absolute-rules'},
     {label:`Buy the gear on credit — the ${earn}/month will cover it`, ok:false, mis:'price-only-decision'},
    ],
    hint:'Two context questions: is the income real, and how fast does the gear pay for itself?',
    good:`Right. Verified gig + fast payback = the gear is equipment (Need). Unverified or slow payback = expensive gamble. Context decides.`,
    bad:'"Income opportunity" is a story until verified. What two facts would turn this from gamble to equipment?',
    why:'Novel situations need novel questions, not old rules. Verify-then-math beats both "always invest" and "never risk."'};
  }},
 { id:'depends-decisions-decide-07', verb:'decide', part:8, tier:'stretch', skill:'depends-decisions',
  gen:(v)=>{
   const person=v.person();
   const newP=v.money(Math.round(v.cents(400,700)*100)/100);
   const used=v.money(Math.round(v.cents(120,220)*100)/100);
   return {
    q:`Novel situation: ${person} moves into an unfurnished place. A bed is genuinely needed now. New: ${newP}. Good used: ${used}. The budget is tight for two months. What is the call?`,
    choices:[
     {label:`Buy the used ${used} bed now — the Need is sleep, not newness`, ok:true},
     {label:`Buy the new ${newP} bed — beds are Needs so price does not matter`, ok:false, mis:'price-decides-need'},
     {label:'Sleep on the floor for two months to protect savings', ok:false, mis:'save-everything'},
     {label:`Buy new on credit — comfort is a Need`, ok:false, mis:'needs-are-flexible'},
    ],
    hint:'The Need is "a place to sleep," not "a new bed." What is the cheapest way to fill exactly that job?',
    good:`Right. ${used} fills the Need (sleep) and leaves the budget breathing room. Newness was the Want hiding inside.`,
    bad:'Strip the Need to its minimum: what does "a bed" actually have to do? Now find the cheapest thing that does that.',
    why:'Needs have minimum viable versions. Filling the Need at the minimum frees everything else — that is context thinking under pressure.'};
  }},
 { id:'depends-decisions-decide-08', verb:'decide', part:8, tier:'stretch', skill:'depends-decisions',
  gen:(v)=>{
   const person=v.person();
   const trial=v.money(Math.round(v.cents(14,22)*100)/100);
   return {
    q:`Novel situation: ${person}\u2019s free trial of a ${trial}/month app ends tomorrow. ${person} opened it twice in 30 days — both times by accident. The app warns "you will lose everything!" What is the call?`,
    choices:[
     {label:'Let it lapse — twice-by-accident is not a Need, whatever the warning says', ok:true},
     {label:`Keep it — ${trial}/month is cheap enough to be a Need`, ok:false, mis:'cheap-means-need'},
     {label:'Keep it — "losing everything" sounds serious', ok:false, mis:'absolute-rules'},
     {label:`Keep it — maybe it becomes useful later`, ok:false, mis:'sort-dodge'},
    ],
    hint:'Urgency is marketing. What is the usage context — the actual 30-day record?',
    good:'Right. Two accidental opens = no job being done. The warning is designed to bypass the context question.',
    bad:'Ignore the warning; read the usage. What did the app actually DO for the last 30 days?',
    why:'"Lose everything" framing manufactures urgency to skip the real question: what is it for? The answer here is "nothing."'};
  }},
 // ---- spot x6 (part 6, independent) ----
 { id:'depends-decisions-spot-01', verb:'spot', part:6, tier:'independent', skill:'depends-decisions',
  gen:(v)=>{
   const person=v.person();
   const med=v.money(Math.round(v.cents(18,32)*100)/100);
   const cof=v.money(Math.round(v.cents(5,8)*100)/100);
   return {
    scenario:`<p>${person}\u2019s rule: \u201cNo exceptions — I never spend on anything optional.\u201d This month ${person} skipped a ${med} prescription refill AND a ${cof} coffee with an old friend. ${person} calls both \u201cdiscipline.\u201d</p>`,
    q:'What is the flaw in this thinking?',
    choices:[
     {label:'An absolute rule treated medicine (Need) and coffee (Want) as the same decision', ok:true},
     {label:`The coffee was the real mistake — ${cof} adds up`, ok:false, mis:'price-only-decision'},
     {label:'Nothing — no exceptions is the strongest system', ok:false, mis:'absolute-rules'},
     {label:`The prescription was too expensive at ${med}`, ok:false, mis:'price-decides-need'},
    ],
    hint:'Apply the rule to each item separately. Same answer both times — is that right?',
    good:'Right. The rule cannot tell a health Need from a social Want. Discipline without context is just damage with confidence.',
    bad:'Sort the two items by context first: prescription vs coffee. Now re-read the rule. See the problem?',
    why:'Absolute rules feel strong because they never hesitate. They are weak because they never think.'};
  }},
 { id:'depends-decisions-spot-02', verb:'spot', part:6, tier:'independent', skill:'depends-decisions',
  gen:(v)=>{
   const person=v.person();
   const cheap=v.money(Math.round(v.cents(25,40)*100)/100);
   const solid=v.money(Math.round(v.cents(70,95)*100)/100);
   return {
    scenario:`<p>${person} needed a winter coat and bought the ${cheap} one — \u201cthe cheapest that counts as a coat.\u201d It fell apart by January. The ${solid} coat would have lasted five winters.</p>`,
    q:'What is the flaw in this thinking?',
    choices:[
     {label:'Price-only decision — the cheapest sticker was the most expensive per winter', ok:true},
     {label:`The ${cheap} coat was still a Need, so it was fine`, ok:false, mis:'price-decides-need'},
     {label:'The mistake is buying coats at all', ok:false, mis:'absolute-rules'},
     {label:'Nothing — cheapest is always the smart money move', ok:false, mis:'price-only-decision'},
    ],
    hint:'Divide each price by winters of use. Which coat was actually cheaper?',
    good:`Right. Cheap coat: ~$${cheap} per winter (one winter). Solid coat: ~$${Math.round(solid*100/5)/100} per winter. The "deal" cost more.`,
    bad:'Cost is not the sticker — it is the sticker divided by the lifespan. Run both divisions.',
    why:'Price-only thinking optimizes the receipt, not the cost. Context includes how long the thing lasts.'};
  }},
 { id:'depends-decisions-spot-03', verb:'spot', part:6, tier:'independent', skill:'depends-decisions',
  gen:(v)=>{
   const person=v.person();
   const fund=v.int(900,1500);
   const fix=v.money(Math.round(v.cents(200,350)*100)/100);
   return {
    scenario:`<p>${person} has a $${fund} emergency fund. The furnace died — a ${fix} repair, in winter. ${person} refuses to touch the fund: \u201cSavings is savings. I\u2019ll put on extra blankets.\u201d</p>`,
    q:'What is the flaw in this thinking?',
    choices:[
     {label:'Savings was made untouchable for the exact emergency it exists for', ok:true},
     {label:`The ${fix} repair is overpriced — that is the real problem`, ok:false, mis:'price-only-decision'},
     {label:'Nothing — never touching savings is the goal', ok:false, mis:'save-everything'},
     {label:'The mistake is owning a furnace', ok:false, mis:'sort-dodge'},
    ],
    hint:'What job was the emergency fund given when it was built?',
    good:'Right. A no-heat emergency in winter IS the job description. Blankets are not a financial strategy.',
    bad:'Read the fund\u2019s job title: "emergency." Now read the situation. Match?',
    why:'Save-everything turns a buffer into a monument. Money that cannot be used wisely was not saved wisely.'};
  }},
 { id:'depends-decisions-spot-04', verb:'spot', part:6, tier:'independent', skill:'depends-decisions',
  gen:(v)=>{
   const person=v.person();
   const sale=v.money(Math.round(v.cents(50,90)*100)/100);
   return {
    scenario:`<p>${person} bought ${sale} of kitchen gadgets on a flash sale and logged them as Needs: \u201cThey were 50% off — I NEEDED to buy them.\u201d The old tools all work fine.</p>`,
    q:'What is the flaw in this thinking?',
    choices:[
     {label:'A discount was used to re-label Wants as Needs', ok:true},
     {label:`The gadgets were too expensive at ${sale}`, ok:false, mis:'price-only-decision'},
     {label:'Nothing — 50% off makes anything a Need', ok:false, mis:'cheap-means-need'},
     {label:'The mistake is logging purchases at all', ok:false, mis:'sort-dodge'},
    ],
    hint:'Cover the "50% off" with your thumb. Need or Want?',
    good:'Right. "I NEEDED to buy them" confuses urgency with necessity. Working tools + sale = Want with a red tag.',
    bad:'Ask "what is it for, right now?" — and do not let the discount answer.',
    why:'Sale-not-needed: the discount changes the price, never the bucket. Marketing knows this confusion is profitable.'};
  }},
 { id:'depends-decisions-spot-05', verb:'spot', part:6, tier:'independent', skill:'depends-decisions',
  gen:(v)=>{
   const person=v.person();
   return {
    scenario:`<p>${person} on sorting: \u201cEverything depends on context, so categories are pointless. I just buy what feels right and call it \u2018it depends.\u2019\u201d ${person}\u2019s savings: $0.</p>`,
    q:'What is the flaw in this thinking?',
    choices:[
     {label:'"It depends" is being used as a dodge to skip sorting entirely', ok:true},
     {label:'Nothing — context really does make categories pointless', ok:false, mis:'sort-dodge'},
     {label:'The mistake is thinking about money at all', ok:false, mis:'sort-dodge'},
     {label:'Feelings are the most accurate budget tool', ok:false, mis:'needs-are-flexible'},
    ],
    hint:'"It depends" is supposed to START the questions, not end them.',
    good:'Right. Real "it depends" asks: what is it for? This version asks nothing and excuses everything. Same words, opposite meaning.',
    bad:'Count how many context questions got asked before the purchase. Zero? Then "it depends" was a costume for "whatever."',
    why:'"It depends" is a real answer only after real questions. Without them, it is just sophistication-flavored impulse.'};
  }},
 { id:'depends-decisions-spot-06', verb:'spot', part:6, tier:'independent', skill:'depends-decisions',
  gen:(v)=>{
   const person=v.person();
   const sub=v.money(Math.round(v.cents(16,24)*100)/100);
   return {
    scenario:`<p>${person} keeps a ${sub}/month subscription \u201cbecause it is only ${sub}.\u201d ${person} opened it once in four months. Asked about it: \u201cCanceling is more effort than keeping it.\u201d</p>`,
    q:'What is the flaw in this thinking?',
    choices:[
     {label:'"Only ${sub}" ignores that unused subscriptions are pure Want-drain', ok:true},
     {label:`${sub} is genuinely too small to think about`, ok:false, mis:'cheap-means-need'},
     {label:'Nothing — small subscriptions are harmless', ok:false, mis:'price-only-decision'},
     {label:'The mistake is checking subscriptions at all', ok:false, mis:'sort-dodge'},
    ],
    hint:'What is the subscription FOR, right now? Once in four months = what job?',
    good:`Right. The context question — "what is it for?" — returns "nothing." ${sub}/month for nothing is not small; it is 100% waste.`,
    bad:'Multiply by 12. Now ask what job that yearly total does. Still "too small to think about"?',
    why:'"Only" is price-only thinking in disguise. Context asks about use, and unused has no price low enough.'};
  }},
 // ---- compare x6 (part 6, independent) ----
 { id:'depends-decisions-compare-01', verb:'compare', part:6, tier:'independent', skill:'depends-decisions',
  gen:(v)=>{
   const p1=v.person(), p2=v.person();
   return {
    context:`<p><b>${p1}:</b> lives by "never buy coffee out — no exceptions."</p><p><b>${p2}:</b> asks "what is it for, right now?" — skips the daily latte, but buys one for a job-interview morning.</p>`,
    q:'Whose approach handles real life better?',
    choices:[
     {label:`${p2} — context keeps the rule\u2019s spirit without its blindness`, ok:true},
     {label:`${p1} — absolute rules are the only ones that work`, ok:false, mis:'absolute-rules'},
     {label:'Same — both spend almost nothing on coffee', ok:false, mis:'price-only-decision'},
     {label:`${p1} — ${p2}\u2019s exceptions will multiply`, ok:false, mis:'sort-dodge'},
    ],
    hint:'Which system can tell a habit from a strategy?',
    good:`Right. ${p2} spends the same $0 most days — but can spend with purpose when context justifies it. ${p1} cannot tell the difference.`,
    bad:'The interview-morning coffee has a job (calm, focus, ritual). Does the absolute rule see jobs?',
    why:'Context does not weaken discipline; it aims it. Rigid rules save pennies and miss purposes.'};
  }},
 { id:'depends-decisions-compare-02', verb:'compare', part:6, tier:'independent', skill:'depends-decisions',
  gen:(v)=>{
   const p1=v.person(), p2=v.person();
   const lap=v.money(Math.round(v.cents(500,800)*100)/100);
   return {
    context:`<p><b>${p1}:</b> buys a ${lap} laptop — required for the new remote job starting Monday.</p><p><b>${p2}:</b> buys the same ${lap} laptop — mostly for streaming and games.</p>`,
    q:'Who made the better money decision?',
    choices:[
     {label:`${p1} — same item, but the context makes it a Need that protects income`, ok:true},
     {label:`${p2} — enjoyment is a valid reason at any price`, ok:false, mis:'needs-are-flexible'},
     {label:'Same — identical purchase, identical wisdom', ok:false, mis:'price-decides-need'},
     {label:`${p1} — expensive laptops are always Needs`, ok:false, mis:'price-decides-need'},
    ],
    hint:'The laptops are identical. What is not?',
    good:`Right. ${p1}'s laptop earns its keep from Monday. ${p2}'s is entertainment at a Need's price. Same receipt, different decision.`,
    bad:'Forget the item. Compare what each laptop is FOR.',
    why:'You cannot judge a purchase without its context. Identical spending can be brilliant or reckless — the why decides.'};
  }},
 { id:'depends-decisions-compare-03', verb:'compare', part:6, tier:'independent', skill:'depends-decisions',
  gen:(v)=>{
   const p1=v.person(), p2=v.person();
   const cheap=v.money(Math.round(v.cents(30,45)*100)/100);
   const solid=v.money(Math.round(v.cents(85,120)*100)/100);
   return {
    context:`<p><b>${p1}:</b> buys the ${cheap} boots — replaced every 4 months.</p><p><b>${p2}:</b> buys the ${solid} boots — going strong after 2 years.</p>`,
    q:'Who spent smarter?',
    choices:[
     {label:`${p2} — cost per month of use is a fraction of ${p1}\u2019s`, ok:true},
     {label:`${p1} — lower price is always smarter`, ok:false, mis:'price-only-decision'},
     {label:'Same — both have boots', ok:false, mis:'sort-dodge'},
     {label:`${p1} — expensive boots are a Want flex`, ok:false, mis:'price-decides-need'},
    ],
    hint:'Two years of ${p1}\u2019s boots costs six pairs. Do that math.',
    good:`Right. ${p1}: ~$${cheap*6} over two years. ${p2}: $${solid} once. The "expensive" choice was the cheap one.`,
    bad:'Total cost = price × replacements. Run it for two years each.',
    why:'Smart spending is cost-per-use, not price-per-tag. Context includes lifespan.'};
  }},
 { id:'depends-decisions-compare-04', verb:'compare', part:6, tier:'independent', skill:'depends-decisions',
  gen:(v)=>{
   const p1=v.person(), p2=v.person();
   const amt=v.int(80,140);
   return {
    context:`<p><b>${p1}:</b> saves $${amt}/month and spends it freely on whatever comes up — "savings is for using."</p><p><b>${p2}:</b> saves $${amt}/month and never touches it, even for real emergencies — "savings is savings."</p>`,
    q:'Whose savings philosophy is healthier?',
    choices:[
     {label:'Neither — one raids it, the other worships it; both miss the point', ok:true},
     {label:`${p1} — money is meant to be used`, ok:false, mis:'savings-skippable'},
     {label:`${p2} — untouched savings is perfect discipline`, ok:false, mis:'save-everything'},
     {label:'Same — both save the same amount', ok:false, mis:'price-only-decision'},
    ],
    hint:'What is savings FOR? Which philosophy serves that job?',
    good:`Right. Savings is a tool: protected from impulses, available for real needs. ${p1} has no protection; ${p2} has no availability.`,
    bad:'Test each against a real emergency. What does ${p1} have? What does ${p2} do?',
    why:'Healthy savings has a gate, not a wall or an open door: impulses stay out, real needs get in.'};
  }},
 { id:'depends-decisions-compare-05', verb:'compare', part:6, tier:'independent', skill:'depends-decisions',
  gen:(v)=>{
   const p1=v.person(), p2=v.person();
   return {
    context:`<p><b>${p1}:</b> hits an unclear purchase and asks three questions: what is it for, what happens without it, what is the cheaper alternative?</p><p><b>${p2}:</b> hits an unclear purchase and guesses — "probably a Want, whatever."</p>`,
    q:'Who sorts more accurately over a year?',
    choices:[
     {label:`${p1} — three questions beat one guess, every time`, ok:true},
     {label:`${p2} — guessing is faster and just as good`, ok:false, mis:'sort-dodge'},
     {label:'Same — unclear purchases are 50/50 anyway', ok:false},
     {label:`${p2} — overthinking small buys wastes more than it saves`, ok:false, mis:'price-only-decision'},
    ],
    hint:'Accuracy compounds. What does a year of guesses cost vs a year of questions?',
    good:`Right. ${p1}'s questions take 30 seconds and get sharper with practice. ${p2}'s guesses stay guesses forever.`,
    bad:'Which approach improves with repetition? Guessing does not learn; questioning does.',
    why:'"It depends" works when it triggers questions. As a shrug, it is just guessing with better vocabulary.'};
  }},
 { id:'depends-decisions-compare-06', verb:'compare', part:6, tier:'independent', skill:'depends-decisions',
  gen:(v)=>{
   const p1=v.person(), p2=v.person();
   return {
    context:`<p><b>${p1}:</b> sorts with a fixed list: "rent, food, transport = Needs; everything else = Wants."</p><p><b>${p2}:</b> sorts with the context question: "what is it for, right now?"</p>`,
    q:'Whose sorting survives real life?',
    choices:[
     {label:`${p2} — fixed lists break on the first unusual month`, ok:true},
     {label:`${p1} — fixed lists are consistent and consistency wins`, ok:false, mis:'absolute-rules'},
     {label:'Same — both end up with three buckets', ok:false, mis:'sort-dodge'},
     {label:`${p1} — questions are just procrastination`, ok:false},
    ],
    hint:'What happens to the fixed list when the car breaks down mid-month?',
    good:`Right. Fixed lists have no entry for "furnace died" or "job requires a laptop." The question handles all of them.`,
    bad:'Stress-test the list: where does emergency car repair go? Where does "course required for promotion" go?',
    why:'Lists describe the past; questions handle the future. Real life is mostly future.'};
  }},
 // ---- predict x6 (parts 7-8) ----
 { id:'depends-decisions-predict-01', verb:'predict', part:7, tier:'independent', skill:'depends-decisions',
  gen:(v)=>{
   const person=v.person();
   return {
    q:`${person} adopts the rule "cheapest is always best" for every purchase for a year. What breaks first?`,
    choices:[
     {label:'The things themselves — cheap versions fail and get rebought', ok:true},
     {label:'Nothing — a year of cheapest is a year of savings', ok:false, mis:'price-only-decision'},
     {label:'The budget — cheap things somehow cost more up front', ok:false},
     {label:'${person}\u2019s reputation as a smart shopper', ok:false, mis:'sort-dodge'},
    ],
    hint:'What is the total cost of something bought three times?',
    good:'Right. Boots, coats, chargers, pans — the cheap versions die first and get replaced, often at a higher total than the solid version once.',
    bad:'Think per-use, not per-purchase. What does a year of replacements add up to?',
    why:'Absolute price rules optimize the moment of purchase and punish every moment after.'};
  }},
 { id:'depends-decisions-predict-02', verb:'predict', part:7, tier:'independent', skill:'depends-decisions',
  gen:(v)=>{
   const person=v.person();
   return {
    q:`${person} sorts every purchase with "what is it for, right now?" for three months. What improves first?`,
    choices:[
     {label:'Impulse buys drop — the question interrupts the autopilot', ok:true},
     {label:'Income rises to match the better thinking', ok:false, mis:'price-only-decision'},
     {label:'Nothing — questions do not change spending', ok:false, mis:'sort-dodge'},
     {label:'All Wants disappear', ok:false, mis:'save-everything'},
    ],
    hint:'What does a 10-second question do to a 2-second impulse?',
    good:'Right. The question inserts a pause between urge and purchase — and most impulses cannot survive a pause with a purpose.',
    bad:'Impulses thrive on speed. What happens when every one of them has to answer a question first?',
    why:'Context thinking is friction in exactly the right place: between wanting and buying.'};
  }},
 { id:'depends-decisions-predict-03', verb:'predict', part:7, tier:'independent', skill:'depends-decisions',
  gen:(v)=>{
   const person=v.person();
   return {
    q:`${person} keeps a fixed Needs list from a blog — no context questions, ever. Five years pass. What happens?`,
    choices:[
     {label:'The list gets more wrong over time — life changes, the list does not', ok:true},
     {label:'The list keeps working — Needs never change', ok:false, mis:'absolute-rules'},
     {label:'${person} becomes the best budgeter in the friend group', ok:false, mis:'sort-dodge'},
     {label:'Nothing changes — lists are timeless', ok:false},
    ],
    hint:'New job, new city, new health, new family — does the old list know about any of that?',
    good:'Right. A 2021 list cannot sort 2026 life. Fixed lists decay; questions stay current because they re-ask every time.',
    bad:'List five things that changed in five years. Now ask the old list to sort them.',
    why:'Money categories are not facts about objects; they are judgments about situations. Situations change — so the method must re-judge.'};
  }},
 { id:'depends-decisions-predict-04', verb:'predict', part:8, tier:'stretch', skill:'depends-decisions',
  gen:(v)=>{
   const person=v.person();
   return {
    q:`Novel situation: ${person} starts gig work with wildly uneven pay — $900 one month, $300 the next. ${person} keeps the old fixed-budget rules. What breaks first?`,
    choices:[
     {label:'The fixed rules — they assume a steady paycheck that no longer exists', ok:true},
     {label:'The gig work — uneven pay always fails', ok:false, mis:'sort-dodge'},
     {label:'Nothing — rules work at any income level', ok:false, mis:'absolute-rules'},
     {label:'The $900 months — too much money breaks budgets', ok:false, mis:'price-only-decision'},
    ],
    hint:'Fixed rules were built for fixed pay. What is different now?',
    good:'Right. "Save $X monthly" and fixed splits assume predictability. Uneven income needs context rules: percentages, buffers, and fat-month discipline.',
    bad:'Which assumption is the old system built on? Is that assumption still true?',
    why:'New income shapes need new methods. Transferring the skill means rebuilding the rules for the new context — not forcing the old ones.'};
  }},
 { id:'depends-decisions-predict-05', verb:'predict', part:8, tier:'stretch', skill:'depends-decisions',
  gen:(v)=>{
   const person=v.person();
   const rel=v.pick(['mom','dad','best friend','sister']);
   return {
    q:`Novel situation: ${person}\u2019s ${rel} says "family helps family — lend me $200, no questions." ${person} has the money but it is earmarked for rent. ${person} lends it without asking anything. What happens?`,
    choices:[
     {label:'Rent is now short — generosity without context questions raids a Need', ok:true},
     {label:'Nothing — family loans always come back', ok:false, mis:'sort-dodge'},
     {label:'The relationship improves no matter what', ok:false, mis:'needs-are-flexible'},
     {label:'It was the only moral choice', ok:false, mis:'absolute-rules'},
    ],
    hint:'"No questions" is the opposite of context thinking. What questions were skipped?',
    good:'Right. The questions — when is it back, what happens to rent, can it be less — were banned by "no questions." Rent pays the price.',
    bad:'Separate love from logistics: the caring is real AND the rent is due. What questions honor both?',
    why:'Even love needs context. "No questions asked" sounds loyal and decides blind — the transfer skill is asking kindly, not skipping.'};
  }},
 { id:'depends-decisions-predict-06', verb:'predict', part:8, tier:'stretch', skill:'depends-decisions',
  gen:(v)=>{
   const person=v.person();
   return {
    q:`Novel situation: every subscription ${person} owns slowly raises its price $1–2. ${person} never re-asks "what is it for?" What happens over two years?`,
    choices:[
     {label:'Subscription creep — the stack costs far more while delivering the same value', ok:true},
     {label:'Nothing — $1–2 is too small to matter', ok:false, mis:'price-only-decision'},
     {label:'The subscriptions get better to match the price', ok:false, mis:'sort-dodge'},
     {label:'${person} notices immediately and cancels everything', ok:false},
    ],
    hint:'Small raises × many subscriptions × 24 months. And the value never got re-checked.',
    good:'Right. Creep works because no single raise triggers the context question. Two years later the stack is 40% pricier for identical value.',
    bad:'Add up all the $1–2 raises across every subscription for 24 months. Surprised?',
    why:'"What is it for, right now?" has an expiry date — it needs re-asking. Creep exploits the asking going stale.'};
  }},
 // ---- build x5 (part 7, independent) ----
 { id:'depends-decisions-build-01', verb:'build', part:7, tier:'independent', skill:'depends-decisions',
  gen:(v)=>{
   const person=v.person();
   return { h:`Build it: ${person}'s context paycheck`,
    body:'<p>$700 paycheck. Needs depend on context this month: the car repair is real, the course is required. Build the full sort.</p>',
    totalDollars:700, buckets:[{id:'needs',label:'Needs'},{id:'savings',label:'Savings'},{id:'wants',label:'Wants'}],
    targets:{needs:420,savings:90,wants:190},
    hint:'Needs $420 (rent, repair, required course), Savings $90, Wants $190.',
    good:'Right: $420 Needs, $90 Savings, $190 Wants. Context decided what counted as a Need — then the math followed.',
    bad:'Sort by context first: which expenses protect health, income, or housing? Those are the Needs.',
    why:'Constructing the split IS the context skill: judge each line, then allocate.'};
  }},
 { id:'depends-decisions-build-02', verb:'build', part:7, tier:'independent', skill:'depends-decisions',
  gen:(v)=>{
   return { h:'Build it: the lean month',
    body:'<p>$550, and two "maybe" expenses are fighting for Need status. Build a split that only protects true Needs.</p>',
    totalDollars:550, buckets:[{id:'needs',label:'Needs'},{id:'savings',label:'Savings'},{id:'wants',label:'Wants'}],
    targets:{needs:340,savings:70,wants:140},
    hint:'Needs $340, Savings $70, Wants $140. The maybes lost — they were Wants.',
    good:'Right: $340 Needs, $70 Savings, $140 Wants. The "maybes" got judged honestly and landed in Wants.',
    bad:'Interrogate the maybes: what breaks without each one? If the answer is "nothing," it is a Want.',
    why:'Lean months are the final exam for context thinking — every dollar\u2019s job gets questioned.'};
  }},
 { id:'depends-decisions-build-03', verb:'build', part:7, tier:'independent', skill:'depends-decisions',
  gen:(v)=>{
   return { h:'Build it: with a flex jar',
    body:'<p>$820 paycheck. This household keeps a "decide later" jar for genuinely unclear items. Build all four buckets.</p>',
    totalDollars:820, buckets:[{id:'needs',label:'Needs'},{id:'savings',label:'Savings'},{id:'wants',label:'Wants'},{id:'flex',label:'Decide later'}],
    targets:{needs:480,savings:100,wants:170,flex:70},
    hint:'Needs $480, Savings $100, Wants $170, Decide-later $70.',
    good:'Right: $480 Needs, $100 Savings, $170 Wants, $70 Decide-later. Ambiguity gets a parking spot — not a free pass.',
    bad:'Unclear items do not default to Wants OR Needs — they wait in the flex jar until context arrives.',
    why:'"It depends" needs a budget home. The flex jar holds unclear dollars until the questions get answered.'};
  }},
 { id:'depends-decisions-build-04', verb:'build', part:7, tier:'independent', skill:'depends-decisions',
  gen:(v)=>{
   return { h:'Build it: new job month',
    body:'<p>$460 — first partial paycheck at the new job. Work clothes are a real Need this month. Build it.</p>',
    totalDollars:460, buckets:[{id:'needs',label:'Needs'},{id:'savings',label:'Savings'},{id:'wants',label:'Wants'}],
    targets:{needs:300,savings:50,wants:110},
    hint:'Needs $300 (rent share, food, work clothes), Savings $50, Wants $110.',
    good:'Right: $300 Needs, $50 Savings, $110 Wants. The new context (job requirements) legitimately grew the Needs.',
    bad:'New job = new context. What does earning now require that it did not before?',
    why:'Context changes the Needs — that is the system working. Work clothes for a real job are a real Need.'};
  }},
 { id:'depends-decisions-build-05', verb:'build', part:7, tier:'independent', skill:'depends-decisions',
  gen:(v)=>{
   return { h:'Build it: the strong month',
    body:'<p>$950 — best month yet. Build a split where the surplus strengthens the future, not just the weekend.</p>',
    totalDollars:950, buckets:[{id:'needs',label:'Needs'},{id:'savings',label:'Savings'},{id:'wants',label:'Wants'}],
    targets:{needs:560,savings:140,wants:250},
    hint:'Needs $560, Savings $140 (surplus share), Wants $250.',
    good:'Right: $560 Needs, $140 Savings, $250 Wants. The strong month built the buffer instead of just the lifestyle.',
    bad:'Strong months tempt Wants to absorb everything. Give the surplus a savings job first.',
    why:'Surplus months are where wealth is actually built — if the extra gets sorted instead of spent.'};
  }},
 // ---- explain x5 (part 8, stretch) ----
 { id:'depends-decisions-explain-01', verb:'explain', part:8, tier:'stretch', skill:'depends-decisions',
  gen:(v)=>{
   return { h:'Teach it back: the category lives in the context',
    prompt:'Explain in your own words why the same item can be a Need for one person and a Want for another.',
    keyPoints:['The bucket is decided by "what is it for, right now?" — not by the object','Same laptop: required for classes (Need) vs for games (Want)','Context includes alternatives, urgency, and consequences','No fixed list survives real life — the question does'],
    modelAnswer:'Objects do not have buckets; situations do. A laptop is a Need when classes require it and a Want when it is for games — the plastic did not change, the purpose did. That is why "what is it for, right now?" beats any fixed list: it re-sorts every purchase against the actual situation.',
    hint:'What changed between the two laptop buyers — the laptop, or the life around it?'};
  }},
 { id:'depends-decisions-explain-02', verb:'explain', part:8, tier:'stretch', skill:'depends-decisions',
  gen:(v)=>{
   return { h:'Teach it back: why rigid rules break',
    prompt:'Explain why absolute money rules ("never," "always") eventually make bad decisions.',
    keyPoints:['Absolute rules skip the context question by design','The same rule gives right answers and wrong ones — e.g. skipping medicine vs skipping lattes','Life keeps producing situations the rule never imagined','Questions adapt; commandments do not'],
    modelAnswer:'Absolute rules feel safe because they never hesitate — but hesitation is where thinking happens. "Never spend on extras" correctly kills the impulse latte and wrongly kills the prescription refill. The rule cannot tell them apart because it was designed not to look. Questions adapt to new situations; commandments just keep commanding.',
    hint:'Find one rule and two situations where it gives opposite-quality answers.'};
  }},
 { id:'depends-decisions-explain-03', verb:'explain', part:8, tier:'stretch', skill:'depends-decisions',
  gen:(v)=>{
   return { h:'Teach it back: the master question',
    prompt:'Explain how "what is it for, right now?" sorts a purchase — walk through the three follow-ups.',
    keyPoints:['"What is it for?" names the job the purchase would do','"What happens without it?" tests whether the job matters','"What is the cheaper alternative?" checks efficiency','If the job is vital and no alternative exists → Need'],
    modelAnswer:'The master question has three follow-ups. "What is it for?" names the job — warmth, income, fun. "What happens without it?" tests the job — nothing, or real harm. "What is the cheaper alternative?" checks efficiency — borrow, buy used, wait. Vital job plus no alternative equals Need; anything else lands in Want, Savings, or "it depends until I know more."',
    hint:'The question is the start — what are the three tests that finish the job?'};
  }},
 { id:'depends-decisions-explain-04', verb:'explain', part:8, tier:'stretch', skill:'depends-decisions',
  gen:(v)=>{
   return { h:'Teach it back: real "it depends" vs the dodge',
    prompt:'Explain the difference between a genuine "it depends" and using it as an excuse to skip sorting.',
    keyPoints:['Genuine "it depends" names what info is missing','The dodge asks zero questions and buys anyway','Real version parks the money (flex jar) until answers arrive','You can tell them apart by counting the questions asked'],
    modelAnswer:'Genuine "it depends" is specific: "it depends on whether the fridge is empty — I will check tonight." The dodge is vague: "it depends, whatever, I will just get it." The test is simple: count the questions. Real "it depends" asks them and waits; the dodge asks none and spends. One is thinking, the other is impulse in a costume.',
    hint:'What is the observable difference — what could you count?'};
  }},
 { id:'depends-decisions-explain-05', verb:'explain', part:8, tier:'stretch', skill:'depends-decisions',
  gen:(v)=>{
   return { h:'Teach it back: the whole routine',
    prompt:'A friend asks how you handle money. Explain the full NWS routine — buckets, order, available money, and context — in your own words.',
    keyPoints:['Every dollar gets a job: Need, Want, or Savings — sorted by context','Order: List, Sort, Protect (Needs then Savings), Spend Wants last','Spend from available money (balance minus jobs), never the screen','"It depends" is answered with questions, not guesses'],
    modelAnswer:'Every payday I list everything, sort each line into Need, Want, or Savings by asking what it is for right now, protect Needs and the savings promise first, then spend what is left guilt-free. I never spend the screen balance — only what is left after every job is subtracted. And when something is unclear, I ask questions instead of guessing; "it depends" means "let me find out," not "whatever."',
    hint:'Four ideas, one flow: buckets → order → available money → context.'};
  }},
],
};
