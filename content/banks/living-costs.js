// NWS variation bank: living-costs — 50 confirmed templates per lesson.
// Module 5 · Living Costs: renting (1-3), utilities (2-4), groceries (3-5),
// transportation (4-6), health-insurance (5-8).
// Build payloads use totalDollars (integer dollars) per the integration patch
// (tools/patch-course-ui-banks.py); targets must sum exactly to totalDollars.
export const BANK_LIVING_COSTS = {
'renting': [
{ id:'renting-choice-01', verb:'choice', part:1, tier:'independent', skill:'renting',
  gen:(v)=>{
    const person=v.person();
    const R=Math.round(v.cents(650,1050)*100), P=v.int(25,75)*100, T=v.int(15,40)*100;
    const total=R+P+T;
    return {
      q:`${person} finds a listing at ${v.money(R/100)}/month. The lease adds a ${v.money(P/100)}/month parking fee and ${v.money(T/100)}/month pet rent. What is the true monthly housing cost?`,
      choices:[
        {label:`${v.money(total/100)} — rent plus every lease-required monthly fee`, ok:true},
        {label:`${v.money(R/100)} — the advertised rent is the monthly cost`, ok:false, mis:'sticker-rent'},
        {label:`${v.money((R+P)/100)} — rent plus parking; the pet rent is small enough to skip`, ok:false, mis:'small-costs-dont-matter'},
        {label:`${v.money(R/100)} plus the security deposit — upfront is all that matters`, ok:false, mis:'upfront-is-all'}
      ],
      hint:'The lease can stack monthly fees on top of the advertised rent.',
      good:`Right: ${v.money(R/100)} + ${v.money(P/100)} + ${v.money(T/100)} = ${v.money(total/100)}/month.`,
      bad:`Add every lease-required monthly fee to the sticker rent: ${v.money(R/100)} + ${v.money(P/100)} + ${v.money(T/100)} = ${v.money(total/100)}.`,
      why:'Sticker rent is the headline; the lease defines the real monthly bill.'
    };
  } },
{ id:'renting-choice-02', verb:'choice', part:1, tier:'independent', skill:'renting',
  gen:(v)=>{
    const person=v.person();
    const R=Math.round(v.cents(700,1000)*100), A=v.int(25,60)*100;
    const total=2*R+A;
    return {
      q:`${person} is approved for a ${v.money(R/100)}/month apartment. Before getting the keys the landlord requires: first month's rent (${v.money(R/100)}), a security deposit of one month's rent (${v.money(R/100)}), and a ${v.money(A/100)} application fee. How much cash does ${person} need on move-in day?`,
      choices:[
        {label:`${v.money(total/100)} — first month + deposit + application fee`, ok:true},
        {label:`${v.money(R/100)} — just the security deposit, since it is due first`, ok:false, mis:'upfront-is-all'},
        {label:`${v.money(R/100)} — the monthly rent is the number that matters`, ok:false, mis:'sticker-rent'},
        {label:`${v.money((2*R)/100)} — first month plus deposit; fees can be talked away later`, ok:false, mis:'fees-negotiable'}
      ],
      hint:'Move-in day stacks three separate payments.',
      good:`Right: ${v.money(R/100)} + ${v.money(R/100)} + ${v.money(A/100)} = ${v.money(total/100)} before the keys.`,
      bad:`Count all three: first month (${v.money(R/100)}) + deposit (${v.money(R/100)}) + application fee (${v.money(A/100)}) = ${v.money(total/100)}.`,
      why:'Getting the keys costs more than one month of rent — plan the whole stack, not just the deposit.'
    };
  } },
{ id:'renting-choice-03', verb:'choice', part:1, tier:'independent', skill:'renting',
  gen:(v)=>{
    const person=v.person();
    const R=Math.round(v.cents(750,950)*100), P=v.int(40,80)*100, I=v.int(12,25)*100, A=v.int(30,65)*100;
    return {
      q:`${person}'s lease lists: monthly rent ${v.money(R/100)}, monthly parking ${v.money(P/100)}, monthly renter's insurance ${v.money(I/100)}, and a one-time ${v.money(A/100)} application fee. Which of these will ${person} pay EVERY month?`,
      choices:[
        {label:`Rent, parking, and renter's insurance — the recurring ones`, ok:true},
        {label:`Only the rent — fees are one-time by nature`, ok:false, mis:'sticker-rent'},
        {label:`The application fee — it was due first, so it must repeat`, ok:false, mis:'upfront-is-all'},
        {label:`Rent and parking — insurance can be skipped after the first month`, ok:false}
      ],
      hint:'Ask of each line: does the lease charge this once, or every month?',
      good:`Right. Rent, parking, and insurance repeat monthly; the application fee is paid once.`,
      bad:`Separate the stack: one-time (application fee) vs every-month (rent, parking, insurance).`,
      why:'A lease mixes one-time and recurring costs. Only the recurring ones belong in the monthly budget.'
    };
  } },
{ id:'renting-choice-04', verb:'choice', part:1, tier:'independent', skill:'renting',
  gen:(v)=>{
    const person=v.person();
    const util=v.pick([['electric','gas'],['electric','water'],['gas','internet']]);
    return {
      q:`${person} reads the lease before signing. It says: "Tenant is responsible for ${util[0]} and ${util[1]}. All other utilities are included in rent." Which accounts must ${person} set up?`,
      choices:[
        {label:`${util[0][0].toUpperCase()+util[0].slice(1)} and ${util[1]} — exactly what the lease assigns`, ok:true},
        {label:`None — if rent covers "all other utilities," the landlord handles everything`, ok:false, mis:'assume-included'},
        {label:`Every utility — leases never really include anything`, ok:false},
        {label:`${util[0][0].toUpperCase()+util[0].slice(1)} and ${util[1]}, plus water and trash just in case`, ok:false}
      ],
      hint:'The lease names who pays for what. Read that line twice.',
      good:`Right. The lease assigns ${util[0]} and ${util[1]} to the tenant; the rest are included.`,
      bad:`Go back to the exact sentence: tenant pays ${util[0]} and ${util[1]}. The rest are included.`,
      why:'Utility responsibility is a lease line, not a guess — the wrong guess means a surprise bill or a shutoff notice.'
    };
  } },
{ id:'renting-choice-05', verb:'choice', part:3, tier:'guided', skill:'renting',
  gen:(v)=>{
    const person=v.person();
    const R=Math.round(v.cents(800,1000)*100), P=v.int(35,70)*100, I=v.int(12,22)*100;
    const total=R+P+I;
    return {
      q:`Guided read: ${person}'s lease shows rent ${v.money(R/100)}/month, parking ${v.money(P/100)}/month, and required renter's insurance ${v.money(I/100)}/month. Walk the full monthly housing cost.`,
      choices:[
        {label:`${v.money(total/100)}/month — ${v.money(R/100)} + ${v.money(P/100)} + ${v.money(I/100)}`, ok:true},
        {label:`${v.money(R/100)}/month — the rent line is the whole story`, ok:false, mis:'sticker-rent'},
        {label:`${v.money((R+P)/100)}/month — insurance is optional, so leave it out`, ok:false},
        {label:`${v.money((R+I)/100)}/month — parking can be negotiated away`, ok:false, mis:'fees-negotiable'}
      ],
      cue:'Start with the sticker rent, then add each lease-required monthly fee one by one.',
      hint:'Rent + parking + insurance — all three repeat every month.',
      good:`Right: ${v.money(R/100)} + ${v.money(P/100)} + ${v.money(I/100)} = ${v.money(total/100)}/month.`,
      bad:`Stack them: ${v.money(R/100)} (rent) + ${v.money(P/100)} (parking) + ${v.money(I/100)} (insurance) = ${v.money(total/100)}.`,
      why:'A guided total-cost read means no line gets skipped: headline rent first, then every required monthly fee.'
    };
  } },
{ id:'renting-choice-06', verb:'choice', part:3, tier:'guided', skill:'renting',
  gen:(v)=>{
    const person=v.person();
    const R=Math.round(v.cents(780,980)*100), P=v.int(40,70)*100, U=v.int(60,110)*100;
    const total=R+P+U, B=total+v.int(25,90)*100, left=B-total;
    return {
      q:`Guided read: ${person}'s monthly housing budget is ${v.money(B/100)}. The apartment costs ${v.money(R/100)} rent + ${v.money(P/100)} parking + about ${v.money(U/100)} utilities. After housing, how much of the budget is left?`,
      choices:[
        {label:`${v.money(left/100)} — budget minus the full housing bundle`, ok:true},
        {label:`${v.money((B-R)/100)} — budget minus the rent only`, ok:false, mis:'sticker-rent'},
        {label:`${v.money(B/100)} — the budget is untouched until the first bill arrives`, ok:false},
        {label:`${v.money(total/100)} — that is the housing cost, which is the answer`, ok:false}
      ],
      cue:'First find the FULL monthly housing cost, then subtract it from the budget.',
      hint:'Leftover = budget − (rent + parking + utilities).',
      good:`Right: ${v.money(B/100)} − ${v.money(total/100)} = ${v.money(left/100)} left.`,
      bad:`Total housing is ${v.money(R/100)} + ${v.money(P/100)} + ${v.money(U/100)} = ${v.money(total/100)}. ${v.money(B/100)} − ${v.money(total/100)} = ${v.money(left/100)}.`,
      why:'"Does it fit?" is answered by the full bundle, not the rent line — the leftover is what is real.'
    };
  } },
{ id:'renting-choice-07', verb:'choice', part:3, tier:'guided', skill:'renting',
  gen:(v)=>{
    const person=v.person();
    const RA=v.int(800,950)*100, F=v.int(80,150)*100, RB=RA+v.int(10,60)*100;
    const totA=RA+F;
    return {
      q:`Guided read: ${person} compares two apartments. A: ${v.money(RA/100)}/month rent plus ${v.money(F/100)}/month in required fees. B: ${v.money(RB/100)}/month, all fees included. Which costs less per month?`,
      choices:[
        {label:`B at ${v.money(RB/100)} — less than A's ${v.money(totA/100)} true cost`, ok:true},
        {label:`A — ${v.money(RA/100)} rent beats ${v.money(RB/100)} rent`, ok:false, mis:'sticker-rent'},
        {label:`They cost the same — fees roughly cancel out`, ok:false},
        {label:`A — the fees can be negotiated down to nothing`, ok:false, mis:'fees-negotiable'}
      ],
      cue:'Compute each apartment\'s TRUE monthly total before comparing.',
      hint:'A\'s real price is rent + fees, not just rent.',
      good:`Right: A truly costs ${v.money(RA/100)} + ${v.money(F/100)} = ${v.money(totA/100)}; B costs ${v.money(RB/100)}. B wins.`,
      bad:`A = ${v.money(RA/100)} + ${v.money(F/100)} = ${v.money(totA/100)} vs B = ${v.money(RB/100)}. Compare totals, not headlines.`,
      why:'Cheaper rent with stacked fees can lose to a higher all-in rent — only totals tell the truth.'
    };
  } },
{ id:'renting-choice-08', verb:'choice', part:3, tier:'guided', skill:'renting',
  gen:(v)=>{
    const person=v.person();
    const R=Math.round(v.cents(850,1050)*100), P=v.int(30,60)*100, T=v.int(20,35)*100;
    const monthly=R+P+T, yearly=monthly*12;
    return {
      q:`Guided read: ${person}'s true monthly housing cost is ${v.money(R/100)} rent + ${v.money(P/100)} parking + ${v.money(T/100)} pet rent. What will housing cost over the full 12-month lease?`,
      choices:[
        {label:`${v.money(yearly/100)} — ${v.money(monthly/100)} × 12 months`, ok:true},
        {label:`${v.money((R*12)/100)} — ${v.money(R/100)} × 12, the rent is the cost`, ok:false, mis:'sticker-rent'},
        {label:`${v.money(monthly/100)} — that IS the housing cost`, ok:false},
        {label:`${v.money((yearly+R)/100)} — yearly total plus another month's rent for the deposit`, ok:false, mis:'upfront-is-all'}
      ],
      cue:'First get the true monthly number, then stretch it across all 12 months.',
      hint:'Yearly = true monthly × 12.',
      good:`Right: ${v.money(monthly/100)} × 12 = ${v.money(yearly/100)} for the lease year.`,
      bad:`Monthly is ${v.money(R/100)} + ${v.money(P/100)} + ${v.money(T/100)} = ${v.money(monthly/100)}; × 12 = ${v.money(yearly/100)}.`,
      why:'A lease is a year-long promise — the monthly bundle times 12 is the real commitment.'
    };
  } },
{ id:'renting-sort-01', verb:'sort', part:2, tier:'independent', skill:'renting',
  gen:(v)=>({
    h:'Sort it: one-time or monthly?',
    body:'<p>Each line from the lease is either paid ONCE or EVERY MONTH. Sort them.</p>',
    buckets:['One-time','Monthly'],
    items:[
      {label:'Application fee', a:'one-time', why:'Paid once with the application — never again.'},
      {label:'Security deposit', a:'one-time', why:'Paid once before move-in (and may come back later).'},
      {label:'Monthly rent', a:'monthly', why:'Due every single month of the lease.'},
      {label:'Parking fee', a:'monthly', why:'A recurring lease charge, not a one-off.'},
      {label:'Pet rent', a:'monthly', why:'Charged every month the pet lives there.'},
      {label:'Renter\u2019s insurance', a:'monthly', why:'A recurring policy cost, usually monthly.'},
      {label:'Key replacement fee', a:'one-time', why:'Paid once, only if keys are lost.'}
    ]
  }) },
{ id:'renting-sort-02', verb:'sort', part:2, tier:'independent', skill:'renting',
  gen:(v)=>({
    h:'Sort it: who decides?',
    body:'<p>Some rules come from the lease; some choices are yours. Sort them.</p>',
    buckets:['The lease decides','You decide'],
    items:[
      {label:'Whether pets are allowed', a:'the lease decides', why:'The lease pet clause sets the rule.'},
      {label:'Guest and overnight-visitor policy', a:'the lease decides', why:'Written into the lease — not your call alone.'},
      {label:'Who pays for water', a:'the lease decides', why:'The lease assigns utility responsibility.'},
      {label:'Quiet hours', a:'the lease decides', why:'Lease rules, enforceable by the landlord.'},
      {label:'How much you spend on groceries', a:'you decide', why:'Your budget, your call.'},
      {label:'What time you go to bed', a:'you decide', why:'Personal routine — the lease is silent on it.'},
      {label:'Which bus route you take to work', a:'you decide', why:'Transportation choice is yours.'}
    ]
  }) },
{ id:'renting-sort-03', verb:'sort', part:2, tier:'independent', skill:'renting',
  gen:(v)=>({
    h:'Sort it: included or on you?',
    body:'<p>The lease says water and trash are included. Sort each bill by who pays.</p>',
    buckets:['Included in rent','Tenant pays'],
    items:[
      {label:'Water bill', a:'included in rent', why:'The lease lists water as included.'},
      {label:'Trash pickup', a:'included in rent', why:'The lease lists trash as included.'},
      {label:'Electric bill', a:'tenant pays', why:'Not on the included list — tenant sets up the account.'},
      {label:'Gas bill', a:'tenant pays', why:'Not on the included list — tenant pays.'},
      {label:'Internet', a:'tenant pays', why:'Almost never included unless the lease says so.'},
      {label:'Renter\u2019s insurance', a:'tenant pays', why:'A tenant-side policy the lease requires you to carry.'}
    ]
  }) },
{ id:'renting-sort-04', verb:'sort', part:2, tier:'independent', skill:'renting',
  gen:(v)=>({
    h:'Sort it: ask first or decide yourself?',
    body:'<p>Before signing, some things must be asked about in writing. Sort them.</p>',
    buckets:['Ask before signing','Decide yourself'],
    items:[
      {label:'Which utilities you must pay', a:'ask before signing', why:'Get responsibility in writing before it becomes your bill.'},
      {label:'How the deposit is returned', a:'ask before signing', why:'Deposit rules vary by lease and by state.'},
      {label:'Pet policy and pet fees', a:'ask before signing', why:'A surprise pet clause can cost hundreds.'},
      {label:'Parking cost and rules', a:'ask before signing', why:'Confirm the fee and the spot before you count on it.'},
      {label:'How you decorate the living room', a:'decide yourself', why:'Your taste — within the lease\u2019s alteration rules.'},
      {label:'Your grocery budget', a:'decide yourself', why:'Your money plan, not the landlord\u2019s.'},
      {label:'What time you do laundry', a:'decide yourself', why:'Daily routine — unless quiet hours say otherwise.'}
    ]
  }) },
{ id:'renting-sort-05', verb:'sort', part:2, tier:'independent', skill:'renting',
  gen:(v)=>({
    h:'Sort it: before keys or after move-in?',
    body:'<p>Sort each housing cost by WHEN it is due.</p>',
    buckets:['Before keys','After move-in'],
    items:[
      {label:'First month\u2019s rent', a:'before keys', why:'Due at signing, before you move in.'},
      {label:'Security deposit', a:'before keys', why:'Due before the landlord hands over keys.'},
      {label:'Application fee', a:'before keys', why:'Paid with the application, before approval.'},
      {label:'Second month\u2019s rent', a:'after move-in', why:'The monthly cycle starts after you are in.'},
      {label:'Monthly parking fee', a:'after move-in', why:'Billed with each month\u2019s rent.'},
      {label:'Electric bill', a:'after move-in', why:'First bill arrives after you start service.'},
      {label:'Renter\u2019s insurance', a:'after move-in', why:'A recurring policy cost each month.'}
    ]
  }) },
{ id:'renting-sort-06', verb:'sort', part:2, tier:'independent', skill:'renting',
  gen:(v)=>({
    h:'Sort it: recurring or one-time?',
    body:'<p>Which housing costs repeat, and which hit once? Sort them.</p>',
    buckets:['Recurring','One-time'],
    items:[
      {label:'Monthly rent', a:'recurring', why:'Every month for the whole lease.'},
      {label:'Parking fee', a:'recurring', why:'Charged each month.'},
      {label:'Pet rent', a:'recurring', why:'A monthly add-on while the pet is there.'},
      {label:'Renter\u2019s insurance', a:'recurring', why:'Renews monthly or yearly — a repeating cost.'},
      {label:'Application fee', a:'one-time', why:'Once, with the application.'},
      {label:'Security deposit', a:'one-time', why:'Once upfront; it is not a monthly bill.'},
      {label:'Moving-truck rental', a:'one-time', why:'One day, one charge.'}
    ]
  }) },
{ id:'renting-decide-01', verb:'decide', part:3, tier:'guided', skill:'renting',
  gen:(v)=>{
    const person=v.person();
    const RA=v.int(820,940)*100, FA=v.int(90,140)*100, RB=RA+v.int(20,70)*100;
    const totA=RA+FA, B=v.int(1050,1150)*100;
    return {
      q:`${person} has a ${v.money(B/100)}/month housing budget. Apartment A: ${v.money(RA/100)} rent + ${v.money(FA/100)} required fees (${v.money(totA/100)} true cost). Apartment B: ${v.money(RB/100)} all-in. Which does ${person} take?`,
      choices:[
        {label:`Apartment B — ${v.money(RB/100)} true cost fits the ${v.money(B/100)} budget with room to spare`, ok:true},
        {label:`Apartment A — the ${v.money(RA/100)} rent is lower, so it must be cheaper`, ok:false, mis:'sticker-rent'},
        {label:`Apartment A — the fees can be negotiated down after moving in`, ok:false, mis:'fees-negotiable'},
        {label:`Neither — wait for a cheaper listing even with no place lined up`, ok:false}
      ],
      cue:'Compare TRUE monthly totals against the budget, not headline rents.',
      hint:'A\u2019s real price is rent + fees.',
      good:`B it is: ${v.money(RB/100)} all-in fits the ${v.money(B/100)} budget, while A truly costs ${v.money(totA/100)} — over budget before utilities.`,
      bad:`A\u2019s headline rent hides the truth: ${v.money(RA/100)} + ${v.money(FA/100)} = ${v.money(totA/100)}, which breaks the ${v.money(B/100)} budget. B at ${v.money(RB/100)} fits.`,
      why:'Decisions run on true totals. A "cheaper" rent that busts the budget is not cheaper.'
    };
  } },
{ id:'renting-decide-02', verb:'decide', part:3, tier:'guided', skill:'renting',
  gen:(v)=>{
    const person=v.person();
    const A=v.int(35,60)*100;
    return {
      q:`${person} loves an apartment but the ${v.money(A/100)} application fee is nonrefundable, and ${person} has not read the full lease yet. What is the call?`,
      choices:[
        {label:`Read the full lease first, then pay the fee only if the terms work`, ok:true},
        {label:`Pay the fee now to hold the unit — reading can happen later`, ok:false},
        {label:`Pay the fee — application fees are always refunded if you back out`, ok:false, mis:'fees-negotiable'},
        {label:`Skip reading entirely — every lease says the same thing`, ok:false}
      ],
      cue:'Ask what is lost if the lease turns out to be a bad fit.',
      hint:'Nonrefundable means gone whether you sign or not.',
      good:`Read first: the ${v.money(A/100)} is only well spent on a lease ${person} would actually sign.`,
      bad:`Paying first risks ${v.money(A/100)} on a lease with deal-breaking terms — pet bans, fee stacks, guest rules. Read, then pay.`,
      why:'Nonrefundable money should only follow a decision, never precede one.'
    };
  } },
{ id:'renting-decide-03', verb:'decide', part:3, tier:'guided', skill:'renting',
  gen:(v)=>{
    const person=v.person();
    const D=v.int(250,400)*100, M=v.int(25,40)*100, yr=M*12;
    const cheaper = D < yr;
    return {
      q:`${person}'s dog is welcome either way: a one-time ${v.money(D/100)} pet deposit (refundable) OR ${v.money(M/100)}/month pet rent (${v.money(yr/100)} over the 12-month lease). Which costs less for this lease?`,
      choices:[
        {label: cheaper ? `The ${v.money(D/100)} deposit — less than ${v.money(yr/100)} in pet rent, and it may come back` : `The ${v.money(M/100)}/month pet rent — ${v.money(yr/100)} total beats a ${v.money(D/100)} deposit`, ok:true},
        {label: cheaper ? `Pet rent — monthly feels smaller, so it must be cheaper` : `The deposit — one big payment is always cheaper`, ok:false},
        {label:`Pet rent — the deposit can be negotiated to zero anyway`, ok:false, mis:'fees-negotiable'},
        {label:`Neither — hide the dog and pay nothing`, ok:false}
      ],
      cue:'Multiply the monthly option across the whole lease, then compare.',
      hint:'Monthly × 12 vs one-time — do both sides of the math.',
      good: cheaper ? `Deposit wins: ${v.money(D/100)} once vs ${v.money(yr/100)} across the lease — and the deposit may be refunded.` : `Pet rent wins: ${v.money(yr/100)} across the lease vs ${v.money(D/100)} tied up in a deposit.`,
      bad: cheaper ? `${v.money(M/100)} × 12 = ${v.money(yr/100)} — more than the ${v.money(D/100)} deposit. "Feels smaller" is not "is smaller."` : `The deposit is ${v.money(D/100)}; pet rent totals ${v.money(yr/100)}. Do the full-lease math before choosing.`,
      why:'One-time vs monthly is only comparable after stretching the monthly across the whole lease.'
    };
  } },
{ id:'renting-decide-04', verb:'decide', part:3, tier:'guided', skill:'renting',
  gen:(v)=>{
    const person=v.person();
    const I=v.int(12,20)*100, gear=v.pick(['laptop','bike','camera']);
    return {
      q:`The lease requires renter's insurance at ${v.money(I/100)}/month. ${person} thinks: "My ${gear} is the only valuable thing I own — skip it." What is the call?`,
      choices:[
        {label:`Get the policy — ${v.money(I/100)}/month protects everything, and the lease requires it`, ok:true},
        {label:`Skip it — nothing valuable means nothing to protect`, ok:false},
        {label:`Skip it — the landlord's insurance covers tenant belongings`, ok:false, mis:'assume-included'},
        {label:`Get it, then cancel after the first month once the landlord stops checking`, ok:false}
      ],
      cue:'Check two things: what the lease requires, and what a single bad day costs.',
      hint:'The lease requires it — that alone settles part of it.',
      good:`Policy on: lease-compliant for ${v.money(I/100)}/month, and one theft or leak would cost far more than a year of premiums.`,
      bad:`Skipping violates the lease and leaves the ${gear} (plus clothes, documents, everything) uncovered — one bad day erases years of ${v.money(I/100)} payments.`,
      why:'Insurance is priced for the disaster, not the average day — and required means required.'
    };
  } },
{ id:'renting-decide-05', verb:'decide', part:3, tier:'guided', skill:'renting',
  gen:(v)=>{
    const person=v.person();
    const R=Math.round(v.cents(900,1100)*100), D=R+v.int(0,200)*100;
    const moveIn=R+D, monthly=R;
    return {
      q:`Move-in special: first month FREE, but the security deposit is ${v.money(D/100)} instead of the usual one month (${v.money(R/100)}). Rent after that is ${v.money(R/100)}/month. ${person} plans to stay the full 12 months. Take the special?`,
      choices:[
        {label:`Yes — 11 months of rent + the deposit beats 12 months + a standard deposit`, ok:true},
        {label:`No — a bigger deposit is never worth it`, ok:false},
        {label:`Yes — free month means the whole year is basically free`, ok:false},
        {label:`No — specials like this are always scams`, ok:false}
      ],
      cue:'Price the full 12 months both ways: with the special and without it.',
      hint:'Count 11 rent payments + the bigger deposit vs 12 rent payments + a normal deposit.',
      good:`Take it: 11 × ${v.money(R/100)} + ${v.money(D/100)} deposit is less outlay than 12 × ${v.money(R/100)} + ${v.money(R/100)} deposit.`,
      bad:`Do the year: special = 11 months rent + ${v.money(D/100)} deposit; standard = 12 months rent + ${v.money(R/100)} deposit. The special costs less.`,
      why:'Specials are math problems, not gifts — price the whole lease term before deciding.'
    };
  } },
{ id:'renting-decide-06', verb:'decide', part:3, tier:'guided', skill:'renting',
  gen:(v)=>{
    const person=v.person();
    const F=v.int(120,200)*100;
    return {
      q:`${person}'s lease lists ${v.money(F/100)}/month in required fees (parking, trash, "building fee"). A friend says "everyone negotiates those away." ${person} is building the budget. What is the call?`,
      choices:[
        {label:`Budget the full ${v.money(F/100)} — plan on the lease as written`, ok:true},
        {label:`Budget half — negotiation will surely cut it`, ok:false, mis:'fees-negotiable'},
        {label:`Budget zero — confidently refuse to pay them`, ok:false, mis:'fees-negotiable'},
        {label:`Budget the rent only and deal with fees if they appear`, ok:false, mis:'sticker-rent'}
      ],
      cue:'Ask: what happens to the budget if the negotiation fails?',
      hint:'The lease as written is the only promise on paper.',
      good:`Budget the ${v.money(F/100)} as written. If negotiation later works, that is a bonus — the budget never depended on it.`,
      bad:`If the fees stick (likely), the budget is short ${v.money(F/100)} every month from day one. Hope is not a budget line.`,
      why:'Budget the paper you signed. Negotiate from a safe position, not a short one.'
    };
  } },
{ id:'renting-decide-07', verb:'decide', part:3, tier:'guided', skill:'renting',
  gen:(v)=>{
    const person=v.person();
    const S=v.int(1000,1200)*100, H=v.int(550,700)*100, U=v.int(60,100)*100;
    const shared=H+U;
    return {
      q:`${person} can live solo for ${v.money(S/100)}/month all-in, or split a place: ${v.money(H/100)} rent share + about ${v.money(U/100)} utilities (${v.money(shared/100)} total). The roommate is a stranger from an ad. What is the call?`,
      choices:[
        {label:`Meet the roommate first, agree on bill-splitting in writing, then take the ${v.money(shared/100)} split if it feels right`, ok:true},
        {label:`Take the split sight unseen — ${v.money(shared/100)} beats ${v.money(S/100)} no matter what`, ok:false},
        {label:`Live solo — roommates always end in disaster`, ok:false},
        {label:`Take the split but keep it verbal — paperwork ruins friendships`, ok:false}
      ],
      cue:'Price the savings, then price the risk of the unknown person.',
      hint:'The math favors splitting; the person is the variable.',
      good:`Smart sequence: meet, put the split in writing, then save ${v.money((S-shared)/100)}/month with eyes open.`,
      bad:`${v.money(shared/100)} vs ${v.money(S/100)} is real savings — but an unvetted roommate can cost more in conflict, skipped bills, and early move-out. Verify the person, then take the deal.`,
      why:'Roommate math is great; roommate risk is real. The written agreement is what makes the math safe.'
    };
  } },
{ id:'renting-decide-08', verb:'decide', part:3, tier:'guided', skill:'renting',
  gen:(v)=>{
    const person=v.person();
    const L=v.int(850,950)*100, S6=v.int(1000,1120)*100;
    const yrL=L*12, yrS=S6*12;
    return {
      q:`${person} is unsure about staying a full year. Option 1: 12-month lease at ${v.money(L/100)}/month. Option 2: 6-month lease at ${v.money(S6/100)}/month, then renew or leave. If ${person} ends up staying 12 months either way, which costs less?`,
      choices:[
        {label:`The 12-month lease — ${v.money(yrL/100)} for the year vs ${v.money(yrS/100)}`, ok:true},
        {label:`The 6-month lease — shorter commitments are always cheaper`, ok:false},
        {label:`They cost the same — rent is rent`, ok:false},
        {label:`The 6-month lease — the second 6 months can be negotiated down`, ok:false, mis:'fees-negotiable'}
      ],
      cue:'Stretch both options across the same 12 months before comparing.',
      hint:'Flexibility has a price — find it in the monthly gap × 12.',
      good:`12-month wins by ${v.money((yrS-yrL)/100)} over the year — the 6-month's flexibility costs extra every month.`,
      bad:`Year-math: 12 × ${v.money(L/100)} = ${v.money(yrL/100)} vs 12 × ${v.money(S6/100)} = ${v.money(yrS/100)}. Shorter lease = higher rate.`,
      why:'Lease length is a price lever: landlords charge more per month for the right to leave sooner.'
    };
  } },
{ id:'renting-spot-01', verb:'spot', part:1, tier:'independent', skill:'renting',
  gen:(v)=>{
    const person=v.person();
    const R=Math.round(v.cents(800,950)*100), P=v.int(45,70)*100, T=v.int(20,35)*100;
    const total=R+P+T;
    return {
      scenario:`<p>${person}\u2019s first-month housing plan:</p><ul><li>Budget for housing: ${v.money((total+50)/100)}</li><li>Rent: ${v.money(R/100)}</li><li>Parking fee: ${v.money(P/100)} (listed as "we\u2019ll figure it out later")</li><li>Pet rent: ${v.money(T/100)} (listed as "probably fine to skip")</li></ul>`,
      q:'What is the mistake here?',
      choices:[
        {label:`${person} planned around the rent and waved away the required fees`, ok:true},
        {label:`${person} over-budgeted — the fees are optional`, ok:false, mis:'fees-negotiable'},
        {label:`${person} should have budgeted only the security deposit`, ok:false, mis:'upfront-is-all'},
        {label:`There is no mistake — rent is the only guaranteed cost`, ok:false, mis:'sticker-rent'}
      ],
      hint:'"We\u2019ll figure it out later" is doing a lot of work in that plan.',
      good:`Right — the lease-required fees are real monthly costs: ${v.money(R/100)} + ${v.money(P/100)} + ${v.money(T/100)} = ${v.money(total/100)}.`,
      bad:`Add the waved-away fees: ${v.money(R/100)} + ${v.money(P/100)} + ${v.money(T/100)} = ${v.money(total/100)} true monthly.`,
      why:'"Later" arrives as a bill. Required fees belong in the plan from day one.'
    };
  } },
{ id:'renting-spot-02', verb:'spot', part:1, tier:'independent', skill:'renting',
  gen:(v)=>{
    const person=v.person();
    const R=Math.round(v.cents(850,1000)*100), A=v.int(40,75)*100;
    return {
      scenario:`<p>${person} saved exactly ${v.money(R/100)} for move-in day, calling it "the deposit plus a little extra."</p><ul><li>Saved: ${v.money(R/100)}</li><li>Landlord requires: first month ${v.money(R/100)} + deposit ${v.money(R/100)} + application fee ${v.money(A/100)}</li></ul>`,
      q:'What is the mistake here?',
      choices:[
        {label:`${person} saved for one piece of a three-piece move-in stack`, ok:true},
        {label:`${person} saved too much — only the rent matters`, ok:false, mis:'sticker-rent'},
        {label:`${person} should have saved nothing and negotiated everything`, ok:false, mis:'fees-negotiable'},
        {label:`There is no mistake — deposits cover everything`, ok:false, mis:'upfront-is-all'}
      ],
      hint:'Count how many separate payments the landlord listed.',
      good:`Right — move-in needs ${v.money(R/100)} + ${v.money(R/100)} + ${v.money(A/100)} = ${v.money((2*R+A)/100)}, not just ${v.money(R/100)}.`,
      bad:`The stack is three deep: first month + deposit + fee = ${v.money((2*R+A)/100)}. ${person} is short ${v.money((R+A)/100)}.`,
      why:'Move-in day is a stack, not a single payment — saving for one piece leaves you short at the door.'
    };
  } },
{ id:'renting-spot-03', verb:'spot', part:2, tier:'independent', skill:'renting',
  gen:(v)=>{
    const person=v.person();
    const R=Math.round(v.cents(750,900)*100);
    return {
      scenario:`<p>${person}\u2019s lease says: "Tenant responsible for electric and gas." ${person}\u2019s budget:</p><ul><li>Rent: ${v.money(R/100)}</li><li>Electric: $0 ("landlord probably covers it")</li><li>Gas: $0 ("it\u2019s a small apartment, can\u2019t be much")</li></ul>`,
      q:'What is the mistake here?',
      choices:[
        {label:`${person} budgeted $0 for bills the lease clearly assigns to the tenant`, ok:true},
        {label:`${person} misread — the lease probably includes them anyway`, ok:false, mis:'assume-included'},
        {label:`${person} over-thought it — small apartments have no utility bills`, ok:false},
        {label:`The mistake is budgeting rent — rent is the landlord\u2019s problem`, ok:false}
      ],
      hint:'The lease sentence is quoted right there. Who does it name?',
      good:`Right — "tenant responsible" means ${person} pays. $0 is a guess, not a plan.`,
      bad:`The lease assigns electric and gas to the tenant. Budget estimates for both, or the first bills are a shock.`,
      why:'"Probably covered" is the most expensive phrase in renting — the lease already answered the question.'
    };
  } },
{ id:'renting-spot-04', verb:'spot', part:2, tier:'independent', skill:'renting',
  gen:(v)=>{
    const person=v.person();
    const R=Math.round(v.cents(800,950)*100), F=v.int(90,150)*100;
    return {
      scenario:`<p>${person} compares two listings:</p><ul><li>Apartment A: ${v.money(R/100)}/month + ${v.money(F/100)}/month required fees</li><li>Apartment B: ${v.money((R+40)/100)}/month, no extra fees</li><li>${person}\u2019s note: "A is cheaper — I\u2019ll just negotiate the fees off."</li></ul>`,
      q:'What is the mistake here?',
      choices:[
        {label:`${person} compared headline rent and bet the budget on a negotiation`, ok:true},
        {label:`${person} should have picked A without thinking — lower rent always wins`, ok:false, mis:'sticker-rent'},
        {label:`${person}\u2019s math is right — fees are never really enforced`, ok:false, mis:'fees-negotiable'},
        {label:`There is no mistake — B is obviously a scam at that price`, ok:false}
      ],
      hint:'A\u2019s true cost is rent + fees. The negotiation is a hope, not a term.',
      good:`Right — A truly costs ${v.money((R+F)/100)}/month; B costs ${v.money((R+40)/100)}. The "cheaper" pick was never cheaper.`,
      bad:`True totals: A = ${v.money((R+F)/100)}, B = ${v.money((R+40)/100)}. B wins — and it wins on paper, no negotiation required.`,
      why:'Compare signed totals, not hoped-for discounts. The lease you sign is the price you pay.'
    };
  } },
{ id:'renting-spot-05', verb:'spot', part:3, tier:'guided', skill:'renting',
  gen:(v)=>{
    const person=v.person();
    const R=Math.round(v.cents(850,1000)*100), P=v.int(40,65)*100, I=v.int(12,20)*100;
    const total=R+P+I;
    return {
      scenario:`<p>${person}\u2019s "total cost read" worksheet:</p><ul><li>Rent: ${v.money(R/100)}</li><li>Parking: ${v.money(P/100)} — "added"</li><li>Renter\u2019s insurance: ${v.money(I/100)} — "skipped, it\u2019s tiny"</li><li>Worksheet total: ${v.money((R+P)/100)}/month</li></ul>`,
      q:'What is the mistake here?',
      choices:[
        {label:`${person} dropped a required recurring cost because it looked small`, ok:true},
        {label:`${person} added wrong — the total should be just the rent`, ok:false, mis:'sticker-rent'},
        {label:`${person} should have skipped the parking too — small fees don\u2019t matter`, ok:false, mis:'small-costs-dont-matter'},
        {label:`There is no mistake — tiny costs round to zero`, ok:false}
      ],
      cue:'Check: did every lease-required monthly line make it into the total?',
      hint:'"Tiny" still repeats twelve times a year.',
      good:`Right — the worksheet total should be ${v.money(total/100)}, not ${v.money((R+P)/100)}. Small and required still counts.`,
      bad:`Add the skipped line: ${v.money(R/100)} + ${v.money(P/100)} + ${v.money(I/100)} = ${v.money(total/100)}/month.`,
      why:'A total-cost read with a skipped line is not a total — small recurring costs are exactly what sink tight budgets.'
    };
  } },
{ id:'renting-spot-06', verb:'spot', part:3, tier:'guided', skill:'renting',
  gen:(v)=>{
    const person=v.person();
    const R=Math.round(v.cents(900,1050)*100), A=v.int(30,60)*100;
    const need=2*R+A, have=need-v.int(100,300)*100;
    return {
      scenario:`<p>${person}\u2019s move-in savings: ${v.money(have/100)}.</p><ul><li>Landlord requires: first month ${v.money(R/100)} + deposit ${v.money(R/100)} + fee ${v.money(A/100)} = ${v.money(need/100)}</li><li>${person}\u2019s plan: "I\u2019m basically there — close enough."</li></ul>`,
      q:'What is the mistake here?',
      choices:[
        {label:`${person} is short ${v.money((need-have)/100)} and "close enough" doesn\u2019t open doors`, ok:true},
        {label:`${person} oversaved — the deposit is the only real requirement`, ok:false, mis:'upfront-is-all'},
        {label:`${person} should negotiate the gap away at the door`, ok:false, mis:'fees-negotiable'},
        {label:`There is no mistake — landlords accept "close enough"`, ok:false}
      ],
      cue:'Subtract what\u2019s saved from what\u2019s required. Is the gap zero?',
      hint:'Move-in math has no partial credit.',
      good:`Right — ${v.money(need/100)} required vs ${v.money(have/100)} saved = ${v.money((need-have)/100)} short. Keys need the full stack.`,
      bad:`Required: ${v.money(need/100)}. Saved: ${v.money(have/100)}. Gap: ${v.money((need-have)/100)} — and landlords don\u2019t do "close enough."`,
      why:'Move-in is binary: the full stack or no keys. "Basically there" is still short.'
    };
  } },
{ id:'renting-compare-01', verb:'compare', part:2, tier:'independent', skill:'renting',
  gen:(v)=>{
    const person=v.person();
    const RA=v.int(880,960)*100, FA=v.int(90,130)*100, RB=v.int(970,1020)*100;
    const totA=RA+FA;
    return {
      context:`<p><b>Option A:</b> ${v.money(RA/100)}/month rent + ${v.money(FA/100)}/month required fees = ${v.money(totA/100)} true monthly.</p><p><b>Option B:</b> ${v.money(RB/100)}/month, every fee included.</p>`,
      q:`${person} wants the cheaper true monthly cost. Which wins?`,
      choices:[
        {label:`Option B — ${v.money(RB/100)} beats A's ${v.money(totA/100)} true cost`, ok:true},
        {label:`Option A — ${v.money(RA/100)} rent is lower than ${v.money(RB/100)}`, ok:false, mis:'sticker-rent'},
        {label:`Option A — the fees will disappear after negotiating`, ok:false, mis:'fees-negotiable'},
        {label:`Tie — fees don\u2019t count as real cost`, ok:false}
      ],
      hint:'Compare true monthly totals, not rent lines.',
      good:`Right — B's ${v.money(RB/100)} all-in beats A's ${v.money(totA/100)} real monthly.`,
      bad:`A = ${v.money(RA/100)} + ${v.money(FA/100)} = ${v.money(totA/100)} vs B = ${v.money(RB/100)}. B wins.`,
      why:'Side-by-side only works on true totals — rent lines lie by omission.'
    };
  } },
{ id:'renting-compare-02', verb:'compare', part:2, tier:'independent', skill:'renting',
  gen:(v)=>{
    const person=v.person();
    const L=v.int(880,940)*100, S=v.int(1020,1100)*100;
    return {
      context:`<p><b>Option A:</b> 12-month lease at ${v.money(L/100)}/month → ${v.money((L*12)/100)} for the year.</p><p><b>Option B:</b> 6-month lease at ${v.money(S/100)}/month, renewed once → ${v.money((S*12)/100)} for the year.</p>`,
      q:`If ${person} stays the full year either way, which lease costs less?`,
      choices:[
        {label:`Option A — ${v.money((L*12)/100)} for the year vs ${v.money((S*12)/100)}`, ok:true},
        {label:`Option B — shorter is always cheaper`, ok:false},
        {label:`They are equal — 12 months is 12 months`, ok:false},
        {label:`Option B — renewal rates always drop`, ok:false, mis:'fees-negotiable'}
      ],
      hint:'Stretch both to the same 12 months.',
      good:`Right — the 12-month lease saves ${v.money(((S-L)*12)/100)} over the year.`,
      bad:`A: 12 × ${v.money(L/100)} = ${v.money((L*12)/100)}. B: 12 × ${v.money(S/100)} = ${v.money((S*12)/100)}. A wins.`,
      why:'Landlords price flexibility into shorter leases — the per-month gap compounds across the year.'
    };
  } },
{ id:'renting-compare-03', verb:'compare', part:2, tier:'independent', skill:'renting',
  gen:(v)=>{
    const person=v.person();
    const M=v.int(28,38)*100, yr=M*12, D=v.int(280,380)*100;
    return {
      context:`<p><b>Option A:</b> ${v.money(M/100)}/month pet rent → ${v.money(yr/100)} over 12 months (never refunded).</p><p><b>Option B:</b> one-time ${v.money(D/100)} pet deposit (refundable if no damage).</p>`,
      q:`Which pet option costs less over the 12-month lease?`,
      choices: D<yr ? [
        {label:`Option B — ${v.money(D/100)} once beats ${v.money(yr/100)} in pet rent`, ok:true},
        {label:`Option A — monthly payments are always smaller`, ok:false},
        {label:`Option B — but only because deposits are negotiable to zero`, ok:false, mis:'fees-negotiable'},
        {label:`They are the same — money is money`, ok:false}
      ] : [
        {label:`Option A — ${v.money(yr/100)} total beats tying up ${v.money(D/100)}`, ok:true},
        {label:`Option B — one big payment is always cheaper`, ok:false},
        {label:`Option A — but only if the landlord forgets to collect some months`, ok:false},
        {label:`They are the same — money is money`, ok:false}
      ],
      hint:'Monthly × 12 vs one-time — then compare.',
      good: D<yr ? `Right — ${v.money(D/100)} once (possibly refunded) beats ${v.money(yr/100)} gone forever.` : `Right — ${v.money(yr/100)} across the lease beats locking ${v.money(D/100)} in a deposit.`,
      bad:`Do both sides: ${v.money(M/100)} × 12 = ${v.money(yr/100)} vs ${v.money(D/100)} once. Then pick the smaller.`,
      why:'Monthly vs one-time is only a fair fight after the monthly is stretched across the whole lease.'
    };
  } },
{ id:'renting-compare-04', verb:'compare', part:3, tier:'guided', skill:'renting',
  gen:(v)=>{
    const person=v.person();
    const soloR=v.int(1050,1150)*100, shareR=v.int(600,680)*100, shareU=v.int(70,110)*100;
    const shared=shareR+shareU;
    return {
      context:`<p><b>Option A:</b> studio alone — ${v.money(soloR/100)}/month all-in.</p><p><b>Option B:</b> 2-bedroom with a roommate — ${v.money(shareR/100)} rent share + ~${v.money(shareU/100)} utilities = ${v.money(shared/100)}/month.</p>`,
      q:`On pure monthly cost, which leaves ${person} with more money?`,
      choices:[
        {label:`Option B — ${v.money(shared/100)}/month saves ${v.money((soloR-shared)/100)} vs solo`, ok:true},
        {label:`Option A — solo living has no hidden costs`, ok:false},
        {label:`Option B — but only if the roommate covers all the utilities`, ok:false, mis:'assume-included'},
        {label:`They are equal once you count the hassle`, ok:false}
      ],
      cue:'Add the roommate\u2019s share lines together, then subtract from the solo number.',
      hint:'B\u2019s total is rent share + utilities.',
      good:`Right — B saves ${v.money((soloR-shared)/100)} every month: ${v.money(soloR/100)} − ${v.money(shared/100)}.`,
      bad:`B totals ${v.money(shareR/100)} + ${v.money(shareU/100)} = ${v.money(shared/100)} vs A\u2019s ${v.money(soloR/100)}. B keeps more.`,
      why:'On pure cost, splitting wins — the roommate decision is about whether the savings are worth the shared space.'
    };
  } },
{ id:'renting-compare-05', verb:'compare', part:3, tier:'guided', skill:'renting',
  gen:(v)=>{
    const person=v.person();
    const R=Math.round(v.cents(950,1050)*100), S=v.int(850,920)*100;
    const dealYr=11*R, stdYr=12*S;
    return {
      context:`<p><b>Option A:</b> ${v.money(R/100)}/month with first month FREE → 11 payments = ${v.money(dealYr/100)} for the year.</p><p><b>Option B:</b> ${v.money(S/100)}/month, no special → 12 payments = ${v.money(stdYr/100)} for the year.</p>`,
      q:`Which costs less over the full 12-month lease?`,
      choices: dealYr<stdYr ? [
        {label:`Option A — ${v.money(dealYr/100)} for the year beats ${v.money(stdYr/100)}`, ok:true},
        {label:`Option B — the lower monthly rent always wins`, ok:false, mis:'sticker-rent'},
        {label:`Option A — a free month means the year is nearly free`, ok:false},
        {label:`Option B — specials are tricks, never take them`, ok:false}
      ] : [
        {label:`Option B — ${v.money(stdYr/100)} for the year beats ${v.money(dealYr/100)}`, ok:true},
        {label:`Option A — a free month always wins`, ok:false},
        {label:`Option B — the lower monthly rent always wins`, ok:false, mis:'sticker-rent'},
        {label:`Tie — free months cancel out exactly`, ok:false}
      ],
      cue:'Price the entire year for each option — count the actual payments.',
      hint:'Count payments: A makes 11, B makes 12.',
      good: dealYr<stdYr ? `Right — the free month drops A to ${v.money(dealYr/100)}, below B's ${v.money(stdYr/100)}.` : `Right — even with the free month, A totals ${v.money(dealYr/100)} vs B's ${v.money(stdYr/100)}.`,
      bad:`Year totals: A = 11 × ${v.money(R/100)} = ${v.money(dealYr/100)}; B = 12 × ${v.money(S/100)} = ${v.money(stdYr/100)}. Compare those.`,
      why:'Move-in specials are year-math problems — count every payment before calling it a deal.'
    };
  } },
{ id:'renting-compare-06', verb:'compare', part:3, tier:'guided', skill:'renting',
  gen:(v)=>{
    const person=v.person();
    const RA=v.int(920,980)*100, RB=v.int(950,990)*100, P=v.int(60,90)*100;
    const totB=RB+P;
    return {
      context:`<p><b>Option A:</b> ${v.money(RA/100)}/month rent, parking included.</p><p><b>Option B:</b> ${v.money(RB/100)}/month rent + ${v.money(P/100)}/month parking = ${v.money(totB/100)} true monthly.</p>`,
      q:`${person} needs a parking spot either way. Which is cheaper per month?`,
      choices: RA<totB ? [
        {label:`Option A — ${v.money(RA/100)} with parking included beats B's ${v.money(totB/100)}`, ok:true},
        {label:`Option B — the rent lines are close, so it hardly matters`, ok:false},
        {label:`Option B — parking fees can be dodged by parking on the street`, ok:false},
        {label:`Option A — but only because included parking is always free`, ok:false, mis:'assume-included'}
      ] : [
        {label:`Option B — ${v.money(totB/100)} true cost beats A's ${v.money(RA/100)}`, ok:true},
        {label:`Option A — included parking means it wins automatically`, ok:false, mis:'assume-included'},
        {label:`Option B — the rent lines are close, so it hardly matters`, ok:false},
        {label:`Tie — parking washes out`, ok:false}
      ],
      cue:'Add parking into B\u2019s total first — then the comparison is fair.',
      hint:'"Included" is a price too — put a number on it.',
      good: RA<totB ? `Right — A's included parking makes ${v.money(RA/100)} the true cheaper number vs B's ${v.money(totB/100)}.` : `Right — even with parking added, B's ${v.money(totB/100)} beats A's ${v.money(RA/100)}.`,
      bad:`Fair totals: A = ${v.money(RA/100)} (parking in), B = ${v.money(RB/100)} + ${v.money(P/100)} = ${v.money(totB/100)}. Then compare.`,
      why:'"Included" just means prepaid — fold it into both totals and the winner is obvious.'
    };
  } },
{ id:'renting-predict-01', verb:'predict', part:2, tier:'independent', skill:'renting',
  gen:(v)=>{
    const person=v.person();
    const pet=v.pick(['dog','cat','parrot']);
    return {
      q:`${person} signs a lease without reading the pet clause, then moves in with a ${pet}. The lease actually bans pets over 25 lbs with a ${v.money(v.int(200,400)*100/100)}/month violation fee. What breaks first?`,
      choices:[
        {label:`The budget — violation fees pile up every month until the pet leaves or the lease breaks`, ok:true},
        {label:`Nothing — landlords never enforce pet clauses`, ok:false, mis:'fees-negotiable'},
        {label:`The lease magically updates itself to allow the pet`, ok:false},
        {label:`The pet clause expires after 30 days`, ok:false}
      ],
      hint:'The clause was in the lease ${person} signed.',
      good:`Right — the signed lease is enforceable: monthly violation fees until the situation changes.`,
      bad:`The pet clause doesn\u2019t vanish because it wasn\u2019t read — expect monthly violation fees or a lease violation notice.`,
      why:'Unread clauses still bind. The pet policy is a budget line the moment you sign.'
    };
  } },
{ id:'renting-predict-02', verb:'predict', part:2, tier:'independent', skill:'renting',
  gen:(v)=>{
    const person=v.person();
    const R=Math.round(v.cents(850,1000)*100), F=v.int(80,140)*100;
    return {
      q:`${person} budgets exactly ${v.money(R/100)} for housing — the rent line — and ignores ${v.money(F/100)}/month in required lease fees. What happens in month one?`,
      choices:[
        {label:`${person} comes up ${v.money(F/100)} short and scrambles to cover the fees`, ok:true},
        {label:`The landlord waives the fees for the first month`, ok:false, mis:'fees-negotiable'},
        {label:`Nothing — fees are suggestions, not bills`, ok:false},
        {label:`The rent drops to cover the difference`, ok:false}
      ],
      hint:'Required fees bill like rent does.',
      good:`Right — the ${v.money(F/100)} doesn\u2019t vanish; month one is short by exactly that.`,
      bad:`Budget math: ${v.money(R/100)} planned vs ${v.money((R+F)/100)} owed = ${v.money(F/100)} short in month one.`,
      why:'Ignored fees don\u2019t disappear — they arrive as a shortfall in the first month.'
    };
  } },
{ id:'renting-predict-03', verb:'predict', part:2, tier:'independent', skill:'renting',
  gen:(v)=>{
    const person=v.person();
    return {
      q:`${person} skips the required renter's insurance to save ${v.money(v.int(12,20)*100/100)}/month. In month four, a burst pipe ruins ${person}'s mattress, clothes, and laptop. What happens next?`,
      choices:[
        {label:`${person} replaces everything out of pocket — thousands vs the skipped ${v.money(15)}/month policy`, ok:true},
        {label:`The landlord's insurance replaces ${person}'s belongings`, ok:false, mis:'assume-included'},
        {label:`The pipe\u2019s manufacturer pays for the damage`, ok:false},
        {label:`Nothing — burst pipes never damage personal property`, ok:false}
      ],
      hint:'Whose policy covers the tenant\u2019s stuff?',
      good:`Right — landlord insurance covers the building, not ${person}'s belongings. The skipped policy would have covered them.`,
      bad:`The landlord\u2019s policy covers the building. Without renter\u2019s insurance, the mattress, clothes, and laptop are ${person}'s loss alone.`,
      why:'Insurance is for the one bad month — skipping it turns a covered event into a personal bill.'
    };
  } },
{ id:'renting-predict-04', verb:'predict', part:3, tier:'guided', skill:'renting',
  gen:(v)=>{
    const person=v.person();
    const dep=v.int(600,900)*100;
    return {
      q:`${person} finds a too-good listing, wires the ${v.money(dep/100)} deposit before seeing the unit or verifying who controls the property. What is the most likely outcome?`,
      choices:[
        {label:`The money is gone — no verified landlord, no lease, no recourse`, ok:true},
        {label:`The deposit is safe because wiring money creates a legal lease`, ok:false},
        {label:`The "landlord" will send it back if asked nicely`, ok:false},
        {label:`The bank automatically reverses wired deposits`, ok:false}
      ],
      cue:'Ask what ${person} verified BEFORE the money moved.',
      hint:'Verify the listing and who controls the property before sending money.',
      good:`Right — money sent to an unverified listing is usually unrecoverable. Verification comes before payment, always.`,
      bad:`Nothing was verified: no property control, no lease, no identity. Wired money to a stranger is gone.`,
      why:'In rentals, verification is the payment\u2019s prerequisite — the order can never be reversed.'
    };
  } },
{ id:'renting-predict-05', verb:'predict', part:3, tier:'guided', skill:'renting',
  gen:(v)=>{
    const person=v.person();
    const F=v.int(100,160)*100;
    return {
      q:`${person} assumes the ${v.money(F/100)}/month in lease fees "can be talked down later" and budgets without them. Three months in, the fees are still full price. What breaks first?`,
      choices:[
        {label:`The monthly budget — it has been ${v.money(F/100)} short every single month`, ok:true},
        {label:`The fees — they expire after 90 days automatically`, ok:false, mis:'fees-negotiable'},
        {label:`Nothing — landlords always negotiate eventually`, ok:false, mis:'fees-negotiable'},
        {label:`The rent — it drops to offset the fees`, ok:false}
      ],
      cue:'Add up the shortfall across all three months.',
      hint:'"Later" has arrived. The fees didn\u2019t move.',
      good:`Right — three months × ${v.money(F/100)} = ${v.money((F*3)/100)} of budget damage from one assumption.`,
      bad:`The budget was short ${v.money(F/100)} in month one, month two, and month three: ${v.money((F*3)/100)} total. Hope didn\u2019t pay it.`,
      why:'Budgeting on a hoped-for discount means every month starts in a hole.'
    };
  } },
{ id:'renting-predict-06', verb:'predict', part:3, tier:'guided', skill:'renting',
  gen:(v)=>{
    const person=v.person();
    const R=Math.round(v.cents(900,1100)*100), late=v.int(50,100)*100;
    return {
      q:`${person}'s rent is ${v.money(R/100)}, due on the 1st. The lease charges a ${v.money(late/100)} late fee after the 5th. ${person} pays on the 8th "just this once" without checking the lease. What happens?`,
      choices:[
        {label:`${person} owes ${v.money((R+late)/100)} — rent plus the late fee that was in the lease`, ok:true},
        {label:`${person} owes just the rent — first-time lateness is always forgiven`, ok:false},
        {label:`The late fee applies, but only to the next month\u2019s rent`, ok:false},
        {label:`Nothing — late fees are illegal`, ok:false}
      ],
      cue:'The lease already priced "just this once." Find that line.',
      hint:'Due on the 1st, fee after the 5th, paid on the 8th.',
      good:`Right — the 8th is past the 5th, so ${v.money(R/100)} + ${v.money(late/100)} = ${v.money((R+late)/100)} is owed.`,
      bad:`The lease set the rule: after the 5th, +${v.money(late/100)}. The 8th triggers it: ${v.money((R+late)/100)} total.`,
      why:'Late fees aren\u2019t surprises — they\u2019re lease terms with a date on them.'
    };
  } },
{ id:'renting-build-01', verb:'build', part:3, tier:'guided', skill:'renting',
  gen:(v)=>({
    h:'Build it: the monthly housing bundle',
    body:'<p>Split a $1,200 monthly housing budget across every recurring housing line — no line left at zero.</p>',
    totalDollars:1200,
    buckets:[{id:'rent',label:'Rent'},{id:'fees',label:'Parking + insurance'},{id:'utilities',label:'Utilities'},{id:'buffer',label:'Buffer'}],
    targets:{rent:950,fees:65,utilities:100,buffer:85},
    cue:'Start with the biggest fixed line (rent), then fill the smaller required ones.',
    hint:'Every recurring housing cost needs its own bucket.',
    good:'Right — 950 + 65 + 100 + 85 = 1,200. Every recurring line is covered.',
    bad:'The four lines must total exactly $1,200: rent 950, fees 65, utilities 100, buffer 85.',
    why:'A housing budget is a bundle — one slider per recurring line, and the buffer catches the wobble.'
  }) },
{ id:'renting-build-02', verb:'build', part:3, tier:'guided', skill:'renting',
  gen:(v)=>({
    h:'Build it: tight-budget housing',
    body:'<p>Split a $1,000 monthly housing budget. The lease requires rent, fees, and utilities estimates.</p>',
    totalDollars:1000,
    buckets:[{id:'rent',label:'Rent'},{id:'fees',label:'Lease fees'},{id:'utilities',label:'Utilities'},{id:'buffer',label:'Buffer'}],
    targets:{rent:800,fees:75,utilities:90,buffer:35},
    cue:'Rent first, then required fees, then utilities — buffer gets what\u2019s left.',
    hint:'Four lines, $1,000 total.',
    good:'Right — 800 + 75 + 90 + 35 = 1,000. Tight, but every line is funded.',
    bad:'Allocate: rent 800, fees 75, utilities 90, buffer 35 = $1,000 exactly.',
    why:'Tight budgets still need every line — the buffer is smallest, but it exists.'
  }) },
{ id:'renting-build-03', verb:'build', part:3, tier:'guided', skill:'renting',
  gen:(v)=>({
    h:'Build it: housing with a pet',
    body:'<p>Split a $1,100 monthly housing budget for a renter with a dog.</p>',
    totalDollars:1100,
    buckets:[{id:'rent',label:'Rent'},{id:'petparking',label:'Pet + parking'},{id:'homebills',label:'Insurance + utilities'},{id:'buffer',label:'Buffer'}],
    targets:{rent:850,petparking:90,homebills:120,buffer:40},
    cue:'Add the pet line the lease requires — it is a real monthly cost.',
    hint:'Four lines, including the pet.',
    good:'Right — 850 + 90 + 120 + 40 = 1,100. The dog has a budget line too.',
    bad:'Targets: rent 850, pet + parking 90, insurance + utilities 120, buffer 40 = $1,100.',
    why:'Pets are recurring housing costs when the lease says so — budget the whole pack.'
  }) },
{ id:'renting-build-04', verb:'build', part:3, tier:'guided', skill:'renting',
  gen:(v)=>({
    h:'Build it: move-in day stack',
    body:'<p>Split $2,600 of move-in savings across everything due before the keys.</p>',
    totalDollars:2600,
    buckets:[{id:'firstmonth',label:'First month'},{id:'deposit',label:'Deposit'},{id:'moveinfees',label:'App fee + utility setup'},{id:'reserve',label:'Reserve'}],
    targets:{firstmonth:900,deposit:900,moveinfees:200,reserve:600},
    cue:'Stack them in move-in order: rent, deposit, fee, setup — reserve last.',
    hint:'Four one-time lines, $2,600 total.',
    good:'Right — 900 + 900 + 200 + 600 = 2,600. Move-in day is fully funded.',
    bad:'Allocate: first month 900, deposit 900, app fee + setup 200, reserve 600 = $2,600.',
    why:'Move-in is a stack of one-time costs — funding each line separately means no surprise at the door.'
  }) },
{ id:'renting-build-05', verb:'build', part:3, tier:'guided', skill:'renting',
  gen:(v)=>({
    h:'Build it: the roommate split',
    body:'<p>Split a $1,400 monthly housing budget for one roommate\u2019s share.</p>',
    totalDollars:1400,
    buckets:[{id:'rentshare',label:'Rent share'},{id:'sharedbills',label:'Utilities + internet'},{id:'parkins',label:'Parking + insurance'},{id:'buffer',label:'Buffer'}],
    targets:{rentshare:700,sharedbills:195,parkins:70,buffer:435},
    cue:'The rent share is only the first line — utilities and the rest still need homes.',
    hint:'Four lines, $1,400 total — buffer holds the remainder.',
    good:'Right — 700 + 195 + 70 + 435 = 1,400. The share is fully planned.',
    bad:'Targets: rent share 700, utilities + internet 195, parking + insurance 70, buffer 435 = $1,400.',
    why:'A roommate share isn\u2019t just rent — the written split covers every shared line plus a buffer.'
  }) },
{ id:'renting-explain-01', verb:'explain', part:3, tier:'guided', skill:'renting',
  gen:(v)=>({
    h:'Teach it back: sticker rent',
    prompt:'Explain in your own words why the advertised rent is not the monthly housing cost.',
    keyPoints:['Sticker rent is only the headline number','Leases add required monthly fees (parking, pet rent, trash)','True cost = rent + every required monthly fee','Decisions and budgets must use the true cost'],
    modelAnswer:'The advertised rent is just the headline. A lease can stack required monthly fees — parking, pet rent, trash — on top of it, so the true monthly housing cost is the rent plus every required fee. Budgets and apartment comparisons only work on that full number.',
    hint:'Think: headline vs lease.',
    cue:'Start with what the listing shows, then what the lease adds.'
  }) },
{ id:'renting-explain-02', verb:'explain', part:3, tier:'guided', skill:'renting',
  gen:(v)=>({
    h:'Teach it back: read the lease',
    prompt:'Explain in your own words why you read the lease BEFORE paying any fees or signing.',
    keyPoints:['The lease sets fees, rules, and who pays for what','Application fees are usually nonrefundable','Surprises (pet bans, guest rules) hide in the fine print','Reading first means money follows a decision, not hope'],
    modelAnswer:'The lease is the actual deal — it sets the fees, the rules, and who pays for what. Application fees are usually nonrefundable, so paying before reading risks money on terms you might reject. Read first, then let money follow the decision.',
    hint:'Think: what is lost if you pay first and read later?',
    cue:'Name two things the lease decides that the listing doesn\u2019t.'
  }) },
{ id:'renting-explain-03', verb:'explain', part:3, tier:'guided', skill:'renting',
  gen:(v)=>({
    h:'Teach it back: one-time vs monthly',
    prompt:'Explain in your own words why one-time move-in costs and monthly costs must be budgeted separately.',
    keyPoints:['One-time costs hit once (deposit, application fee)','Monthly costs repeat all lease long (rent, parking, insurance)','Mixing them understates the monthly budget','Each type gets its own savings target'],
    modelAnswer:'One-time costs like the deposit and application fee hit once, while rent, parking, and insurance repeat every month of the lease. Mixing them together understates the monthly budget — the monthly number must stand on its own, and the one-time stack needs its own separate savings target.',
    hint:'Think: what repeats vs what happens once?',
    cue:'Sort these first: deposit, rent, application fee, parking.'
  }) },
{ id:'renting-explain-04', verb:'explain', part:3, tier:'guided', skill:'renting',
  gen:(v)=>({
    h:'Teach it back: the fee-negotiation trap',
    prompt:'Explain in your own words why "I\u2019ll negotiate the fees away" is a dangerous budgeting plan.',
    keyPoints:['The lease as written is the only enforceable price','Negotiation is a hope, not a budget line','If it fails, every month starts short','Budget the paper; treat any discount as a bonus'],
    modelAnswer:'The lease you sign is the price you pay — negotiation is a hope, not a term. Budgeting as if fees will vanish means every month starts short if they don\u2019t. The safe move is budgeting the lease as written and treating any negotiated discount as a bonus.',
    hint:'Think: what happens to the budget if the talk fails?',
    cue:'Finish this sentence: "Hope is not a…"'
  }) },
{ id:'renting-explain-05', verb:'explain', part:3, tier:'guided', skill:'renting',
  gen:(v)=>({
    h:'Teach it back: the total-cost read',
    prompt:'Explain in your own words how to do a total-cost read on an apartment listing for a friend.',
    keyPoints:['Start with the advertised rent','Add every lease-required monthly fee','Add estimated utilities you must pay','Compare the TRUE total to the budget — not the rent line'],
    modelAnswer:'Start with the advertised rent, then add every lease-required monthly fee — parking, pet rent, trash — plus your estimated utilities. That true monthly total is the number to compare against the budget and against other apartments. The rent line alone never decides anything.',
    hint:'Think: the four steps of the read.',
    cue:'List the steps in order: rent, then…?'
  }) },
],
'utilities': [
{ id:'utilities-choice-01', verb:'choice', part:2, tier:'independent', skill:'utilities',
  gen:(v)=>{
    const person=v.person();
    const variable=v.pick(['electric','gas','water']);
    const fixed=v.pick(['internet','trash pickup','streaming']);
    return {
      q:`${person} lists the home bills: electric, gas, water, internet, and trash pickup. Which of these can change from month to month based on usage and season?`,
      choices:[
        {label:`Electric, gas, and water — usage and seasons move them`, ok:true},
        {label:`Internet — the price changes every month`, ok:false},
        {label:`Trash pickup — it depends how much trash there is`, ok:false},
        {label:`None of them — every bill is the same each month`, ok:false, mis:'vary-is-a-number'}
      ],
      hint:'Which bills are metered by how much you use?',
      good:`Right — electric, gas, and water vary with usage and season; internet and trash are typically flat.`,
      bad:`Metered utilities (electric, gas, water) move month to month. Flat-rate services usually don\u2019t.`,
      why:'Knowing which bills can move is step one — only the movers need a buffer.'
    };
  } },
{ id:'utilities-choice-02', verb:'choice', part:2, tier:'independent', skill:'utilities',
  gen:(v)=>{
    const person=v.person();
    return {
      q:`A listing says "utilities vary" with no numbers. ${person} needs a budget figure before signing. What is the most useful information to get?`,
      choices:[
        {label:`Which utilities ${person} pays, typical cost ranges, and any setup deposits`, ok:true},
        {label:`Nothing — "vary" means roughly average, so budget the average`, ok:false, mis:'vary-is-a-number'},
        {label:`Nothing — variable bills can\u2019t be planned for anyway`, ok:false, mis:'variable-means-unplannable'},
        {label:`Assume they are included until the first bill proves otherwise`, ok:false, mis:'assume-included'}
      ],
      hint:'"Vary" is a warning, not a number.',
      good:`Right — responsibility + typical range + deposits turns "vary" into a plannable number.`,
      bad:`"Vary" is not a number and not a plan. Ask who pays, what it typically runs, and what setup costs.`,
      why:'Variable doesn\u2019t mean unknowable — it means you have to ask before the lease locks it in.'
    };
  } },
{ id:'utilities-choice-03', verb:'choice', part:2, tier:'independent', skill:'utilities',
  gen:(v)=>{
    const person=v.person();
    const dep=v.int(75,200)*100;
    return {
      q:`The electric company tells ${person} a ${v.money(dep/100)} deposit is required before service starts. ${person} has never paid a utility deposit before. What does this mean for move-in planning?`,
      choices:[
        {label:`${v.money(dep/100)} must be saved as part of the move-in stack — no deposit, no power`, ok:true},
        {label:`Deposits are optional suggestions — service starts anyway`, ok:false},
        {label:`The landlord automatically covers all utility deposits`, ok:false, mis:'assume-included'},
        {label:`It means the electric bill itself will be ${v.money(dep/100)} cheaper`, ok:false}
      ],
      hint:'Service starts when the deposit is paid.',
      good:`Right — the ${v.money(dep/100)} is a gate: it joins the move-in savings target.`,
      bad:`No deposit, no account, no power on move-in day. Add ${v.money(dep/100)} to the move-in stack.`,
      why:'Utility deposits are move-in costs wearing a different name — plan them like the rest of the stack.'
    };
  } },
{ id:'utilities-choice-04', verb:'choice', part:2, tier:'independent', skill:'utilities',
  gen:(v)=>{
    const person=v.person();
    return {
      q:`${person}'s lease says: "Water and trash included. Tenant establishes electric, gas, and internet accounts." It is two days before move-in and no accounts exist yet. What should ${person} do?`,
      choices:[
        {label:`Set up electric, gas, and internet accounts now — the lease assigned them`, ok:true},
        {label:`Wait — the landlord probably set them up already`, ok:false, mis:'assume-included'},
        {label:`Set up only internet — utilities sort themselves out`, ok:false},
        {label:`Do nothing — accounts can\u2019t be opened before living there`, ok:false}
      ],
      hint:'The lease names three accounts. Count how many exist.',
      good:`Right — three accounts assigned, zero opened. Move-in day without them means no power, no heat, no wifi.`,
      bad:`The lease assigned electric, gas, and internet to the tenant. Open all three before move-in.`,
      why:'Lease-assigned accounts don\u2019t open themselves — "the landlord probably did it" is how you move into a dark apartment.'
    };
  } },
{ id:'utilities-choice-05', verb:'choice', part:3, tier:'guided', skill:'utilities',
  gen:(v)=>{
    const person=v.person();
    const b1=v.int(95,140)*100, b2=v.int(70,95)*100, b3=v.int(55,75)*100, b4=v.int(80,110)*100;
    const avg=Math.round((b1+b2+b3+b4)/4);
    return {
      q:`Guided math: ${person}'s last four electric bills were ${v.money(b1/100)}, ${v.money(b2/100)}, ${v.money(b3/100)}, and ${v.money(b4/100)}. What is the average monthly bill to budget?`,
      choices:[
        {label:`${v.money(avg/100)} — the four bills added, divided by 4`, ok:true},
        {label:`${v.money(b1/100)} — budget the highest so you\u2019re safe`, ok:false},
        {label:`${v.money(b3/100)} — budget the lowest and hope`, ok:false},
        {label:`${v.money((b1+b2+b3+b4)/100)} — the total of all four`, ok:false}
      ],
      cue:'Add all four bills, then divide by 4 — that\u2019s what "average" means.',
      hint:'Average = total ÷ number of bills.',
      good:`Right: (${v.money(b1/100)} + ${v.money(b2/100)} + ${v.money(b3/100)} + ${v.money(b4/100)}) ÷ 4 = ${v.money(avg/100)}.`,
      bad:`Add them: ${v.money((b1+b2+b3+b4)/100)} total ÷ 4 bills = ${v.money(avg/100)} average.`,
      why:'An average turns bumpy history into one plannable monthly number.'
    };
  } },
{ id:'utilities-choice-06', verb:'choice', part:3, tier:'guided', skill:'utilities',
  gen:(v)=>{
    const person=v.person();
    const W=v.int(110,150)*100, S=v.int(120,160)*100, M=v.int(60,85)*100;
    const yearly=(W*4)+(S*4)+(M*4);
    return {
      q:`Guided math: ${person}'s gas bill runs about ${v.money(W/100)} in each of the 4 winter months, ${v.money(S/100)} in each of the 4 summer months (water heating + dryer), and ${v.money(M/100)} in the 4 mild months. What is the yearly gas total?`,
      choices:[
        {label:`${v.money(yearly/100)} — each season\u2019s monthly rate × 4, then added`, ok:true},
        {label:`${v.money(((W+S+M)/3*12)/100)} — average the three rates and × 12`, ok:false},
        {label:`${v.money((W*12)/100)} — just use the winter rate all year`, ok:false},
        {label:`${v.money((M*12)/100)} — the mild months are the "real" bill`, ok:false}
      ],
      cue:'Do each season separately: monthly rate × 4 months, then add the three seasons.',
      hint:'Winter × 4, summer × 4, mild × 4.',
      good:`Right: ${v.money((W*4)/100)} + ${v.money((S*4)/100)} + ${v.money((M*4)/100)} = ${v.money(yearly/100)} for the year.`,
      bad:`Season by season: 4 × ${v.money(W/100)} = ${v.money((W*4)/100)}; 4 × ${v.money(S/100)} = ${v.money((S*4)/100)}; 4 × ${v.money(M/100)} = ${v.money((M*4)/100)}. Total: ${v.money(yearly/100)}.`,
      why:'Yearly totals respect the seasons — one flat rate all year misprices the bill by design.'
    };
  } },
{ id:'utilities-choice-07', verb:'choice', part:3, tier:'guided', skill:'utilities',
  gen:(v)=>{
    const person=v.person();
    const lo=v.int(65,85)*100, hi=v.int(120,160)*100;
    return {
      q:`Guided planning: ${person}'s electric bill swings between ${v.money(lo/100)} and ${v.money(hi/100)} depending on the season. No budget-billing plan is available. What monthly budget line keeps the lights on year-round?`,
      choices:[
        {label:`${v.money(hi/100)} — budget the high end so every month is covered`, ok:true},
        {label:`${v.money(lo/100)} — budget the low end; spikes are rare`, ok:false},
        {label:`${v.money(Math.round((lo+hi)/2)/100)} — the middle is always safe`, ok:false, mis:'vary-is-a-number'},
        {label:`$0 — skip it; variable bills can\u2019t be budgeted`, ok:false, mis:'variable-means-unplannable'}
      ],
      cue:'Ask: in the worst month, is the budgeted number enough?',
      hint:'The budget must survive the highest month, not the average one.',
      good:`Right — ${v.money(hi/100)} covers every month; cheaper months just leave extra.`,
      bad:`The bill WILL hit ${v.money(hi/100)} some months. Only ${v.money(hi/100)} budgeted survives all twelve.`,
      why:'For variable bills without a smoothing plan, the high month sets the budget — the average only works on paper.'
    };
  } },
{ id:'utilities-choice-08', verb:'choice', part:3, tier:'guided', skill:'utilities',
  gen:(v)=>{
    const person=v.person();
    const Q=v.int(75,120)*100, per=Math.round(Q/3);
    return {
      q:`Guided math: ${person}'s water bill comes quarterly at about ${v.money(Q/100)} every 3 months. How much should ${person} set aside each month so the bill never stings?`,
      choices:[
        {label:`${v.money(per/100)}/month — one quarter bill split across 3 months`, ok:true},
        {label:`${v.money(Q/100)}/month — save the whole bill monthly to be safe`, ok:false},
        {label:`$0/month — deal with it when it arrives`, ok:false},
        {label:`${v.money(Math.round(Q/12)/100)}/month — split across the whole year`, ok:false}
      ],
      cue:'The bill covers 3 months — so divide it by 3.',
      hint:'Quarterly = every 3 months. Divide by 3.',
      good:`Right: ${v.money(Q/100)} ÷ 3 = ${v.money(per/100)}/month set aside.`,
      bad:`${v.money(Q/100)} every 3 months means ${v.money(Q/100)} ÷ 3 = ${v.money(per/100)} per month.`,
      why:'Big infrequent bills get sliced into monthly pieces — that\u2019s how a quarterly bill becomes a monthly habit.'
    };
  } },
{ id:'utilities-sort-01', verb:'sort', part:2, tier:'independent', skill:'utilities',
  gen:(v)=>({
    h:'Sort it: fixed or variable?',
    body:'<p>Sort each home bill by whether the amount is fixed or moves around.</p>',
    buckets:['Fixed','Variable'],
    items:[
      {label:'Internet plan', a:'fixed', why:'Flat monthly rate, same every month.'},
      {label:'Trash pickup fee', a:'fixed', why:'A flat city or lease fee.'},
      {label:'Phone plan', a:'fixed', why:'Same rate unless the plan changes.'},
      {label:'Electric bill', a:'variable', why:'Moves with usage and season.'},
      {label:'Gas bill', a:'variable', why:'Heating season spikes it.'},
      {label:'Water bill', a:'variable', why:'Metered — more use, more bill.'}
    ]
  }) },
{ id:'utilities-sort-02', verb:'sort', part:2, tier:'independent', skill:'utilities',
  gen:(v)=>({
    h:'Sort it: who sets it up?',
    body:'<p>The lease says water and trash are included. Sort each bill by setup duty.</p>',
    buckets:['Tenant sets up','Included'],
    items:[
      {label:'Electric account', a:'tenant sets up', why:'Lease assigns it to the tenant.'},
      {label:'Gas account', a:'tenant sets up', why:'Lease assigns it to the tenant.'},
      {label:'Internet install', a:'tenant sets up', why:'Tenant\u2019s account to open.'},
      {label:'Water service', a:'included', why:'Lease lists water as included.'},
      {label:'Trash pickup', a:'included', why:'Lease lists trash as included.'},
      {label:'Renter\u2019s insurance policy', a:'tenant sets up', why:'Tenant\u2019s policy to buy and carry.'}
    ]
  }) },
{ id:'utilities-sort-03', verb:'sort', part:2, tier:'independent', skill:'utilities',
  gen:(v)=>({
    h:'Sort it: once or every month?',
    body:'<p>Sort each utility cost by how often it hits.</p>',
    buckets:['One-time setup','Every month'],
    items:[
      {label:'Electric connection fee', a:'one-time setup', why:'Paid once to open the account.'},
      {label:'Utility security deposit', a:'one-time setup', why:'Once upfront; may be refunded later.'},
      {label:'Internet installation', a:'one-time setup', why:'One visit, one charge.'},
      {label:'Monthly electric bill', a:'every month', why:'Billed every cycle.'},
      {label:'Monthly internet bill', a:'every month', why:'Recurring service charge.'},
      {label:'Quarterly water bill', a:'every month', why:'Recurring — just slice it monthly in the budget.'}
    ]
  }) },
{ id:'utilities-sort-04', verb:'sort', part:2, tier:'independent', skill:'utilities',
  gen:(v)=>({
    h:'Sort it: seasonal swing or steady?',
    body:'<p>Which bills swing with the seasons, and which stay flat all year?</p>',
    buckets:['Swings with seasons','Steady all year'],
    items:[
      {label:'Heating (gas) bill', a:'swings with seasons', why:'Winter heating spikes it.'},
      {label:'Cooling (electric) bill', a:'swings with seasons', why:'Summer AC spikes it.'},
      {label:'Water bill', a:'swings with seasons', why:'Summer watering and use push it up.'},
      {label:'Internet bill', a:'steady all year', why:'Flat rate regardless of weather.'},
      {label:'Trash fee', a:'steady all year', why:'Flat fee, season-independent.'},
      {label:'Phone plan', a:'steady all year', why:'Same rate in January and July.'}
    ]
  }) },
{ id:'utilities-sort-05', verb:'sort', part:2, tier:'independent', skill:'utilities',
  gen:(v)=>({
    h:'Sort it: verify or assume?',
    body:'<p>Some utility facts must be verified; others are safe to figure out yourself. Sort them.</p>',
    buckets:['Verify with the provider','Figure out yourself'],
    items:[
      {label:'Whether a deposit is required', a:'verify with the provider', why:'Only the utility knows its deposit rule.'},
      {label:'Which utilities are in your name', a:'verify with the provider', why:'Confirm with the lease and the utility — never assume.'},
      {label:'The exact due date', a:'verify with the provider', why:'Due dates come from the biller, not the listing.'},
      {label:'"Vary" means roughly average', a:'figure out yourself', why:'Wrong — "vary" is not a number; this assumption needs replacing with real data.'},
      {label:'All utilities are included', a:'figure out yourself', why:'Wrong — check the lease line instead of assuming.'},
      {label:'Your own usage habits', a:'figure out yourself', why:'Only you know how long your showers run.'}
    ]
  }) },
{ id:'utilities-sort-06', verb:'sort', part:2, tier:'independent', skill:'utilities',
  gen:(v)=>({
    h:'Sort it: buffer or no buffer?',
    body:'<p>Which bills need a buffer in the budget, and which don\u2019t?</p>',
    buckets:['Needs a buffer','No buffer needed'],
    items:[
      {label:'Electric bill', a:'needs a buffer', why:'Variable — seasons and usage move it.'},
      {label:'Gas bill', a:'needs a buffer', why:'Variable — winter spikes it.'},
      {label:'Water bill', a:'needs a buffer', why:'Variable and metered.'},
      {label:'Internet bill', a:'no buffer needed', why:'Fixed rate — budget the exact number.'},
      {label:'Trash fee', a:'no buffer needed', why:'Flat fee — no surprises.'},
      {label:'Quarterly water estimate', a:'needs a buffer', why:'Infrequent + variable = buffer territory.'}
    ]
  }) },
{ id:'utilities-decide-01', verb:'decide', part:3, tier:'guided', skill:'utilities',
  gen:(v)=>{
    const person=v.person();
    return {
      q:`${person}'s electric bill swings between $70 and $140. The utility offers autopay (auto-drafts whatever the bill is) or manual pay each month. ${person}'s checking balance is usually tight. What is the call?`,
      choices:[
        {label:`Manual pay with a calendar reminder — autopay on a swinging bill risks an overdraft`, ok:true},
        {label:`Autopay — set it and forget it, the amount doesn\u2019t matter`, ok:false},
        {label:`Autopay — variable bills can\u2019t be planned, so automation is the only hope`, ok:false, mis:'variable-means-unplannable'},
        {label:`Pay neither — utility bills are optional in summer`, ok:false}
      ],
      cue:'Ask what autopay does on the $140 month with a tight balance.',
      hint:'Autopay drafts the full bill, whatever it is.',
      good:`Manual wins here: ${person} checks the amount first, so a $140 spike never overdrafts a tight account.`,
      bad:`Autopay would draft the full $140 on a spike month — on a tight balance that means overdraft fees on top of the bill. Manual keeps control.`,
      why:'Automation is great for fixed bills; on swinging bills with tight cash, eyes-on beats autopay.'
    };
  } },
{ id:'utilities-decide-02', verb:'decide', part:3, tier:'guided', skill:'utilities',
  gen:(v)=>{
    const person=v.person();
    const lo=v.int(60,80)*100, hi=v.int(120,150)*100;
    return {
      q:`${person}'s gas bill runs ${v.money(lo/100)}–${v.money(hi/100)}. No smoothing plan exists. Budget the average (~${v.money(Math.round((lo+hi)/2)/100)}) or the high end (${v.money(hi/100)})?`,
      choices:[
        {label:`The high end — ${v.money(hi/100)} covers every month; cheap months leave extra`, ok:true},
        {label:`The average — averages are designed for exactly this`, ok:false, mis:'vary-is-a-number'},
        {label:`The low end — winter is months away`, ok:false},
        {label:`Skip gas in the budget — it\u2019s too unpredictable to plan`, ok:false, mis:'variable-means-unplannable'}
      ],
      cue:'Test each option against the worst month, not the typical one.',
      hint:'The bill WILL hit the high end some months.',
      good:`High-end budgeting means no month breaks the plan — ${v.money(hi/100)} always covers it.`,
      bad:`The average fails in every above-average month. Only ${v.money(hi/100)} survives the ${v.money(hi/100)} months.`,
      why:'Without smoothing, the budget must survive the peak — the average is a hope, the high end is a plan.'
    };
  } },
{ id:'utilities-decide-03', verb:'decide', part:3, tier:'guided', skill:'utilities',
  gen:(v)=>{
    const person=v.person();
    return {
      q:`The electric company offers budget billing: pay a flat $105/month year-round instead of bills swinging $65–$150. ${person} hates surprises. Take it?`,
      choices:[
        {label:`Yes — a flat $105 turns a variable bill into a plannable one`, ok:true},
        {label:`No — flat plans always cost more overall`, ok:false},
        {label:`No — variable bills can\u2019t be tamed, so don\u2019t bother`, ok:false, mis:'variable-means-unplannable'},
        {label:`Yes — and then stop watching usage entirely`, ok:false}
      ],
      cue:'Compare what changes: the total paid, or just the timing?',
      hint:'Budget billing smooths timing, not usage.',
      good:`Take it: $105 flat kills the surprise months, and the yearly total stays tied to actual use.`,
      bad:`Budget billing doesn\u2019t raise the total — it spreads it. $105 every month beats $150 ambushes.`,
      why:'Smoothing plans convert "variable" from a planning problem into a fixed line — that\u2019s exactly what tight budgets need.'
    };
  } },
{ id:'utilities-decide-04', verb:'decide', part:3, tier:'guided', skill:'utilities',
  gen:(v)=>{
    const person=v.person();
    const total=v.int(140,200)*100, half=Math.round(total/2);
    return {
      q:`${person} and a roommate share utilities (~${v.money(total/100)}/month total). The roommate proposes splitting 50/50; ${person} works from home and uses far more power. What is the call?`,
      choices:[
        {label:`Agree in writing to a usage-based split — 50/50 isn\u2019t fair when use isn\u2019t equal`, ok:true},
        {label:`Take 50/50 — splitting evenly is always fair`, ok:false},
        {label:`Let the roommate pay it all — they suggested the split`, ok:false},
        {label:`Skip the written agreement — trust covers it`, ok:false}
      ],
      cue:'Fairness follows usage, not headcount.',
      hint:'50/50 is fair only when usage is 50/50.',
      good:`Written usage-based split: the higher user pays the higher share, and it\u2019s on paper before the first bill.`,
      bad:`50/50 on unequal use means ${person} subsidizes the roommate\u2019s share every month — or vice versa. Match the split to the usage, in writing.`,
      why:'Utility splits should follow the meter, not the headcount — and verbal deals evaporate at the first big bill.'
    };
  } },
{ id:'utilities-decide-05', verb:'decide', part:4, tier:'independent', skill:'utilities',
  gen:(v)=>{
    const person=v.person();
    const spike=v.int(55,85)*100;
    return {
      q:`August heat pushes ${person}'s electric bill ${v.money(spike/100)} over budget. Savings has exactly one month of buffer. What is the call?`,
      choices:[
        {label:`Cover it from the buffer, then rebuild the buffer over the next two months`, ok:true},
        {label:`Put the overage on a credit card and hope September is cooler`, ok:false},
        {label:`Skip the bill — one missed utility payment doesn\u2019t matter`, ok:false},
        {label:`Drain the whole buffer — that\u2019s what it\u2019s for, all at once`, ok:false}
      ],
      hint:'The buffer exists for spikes — but it must be rebuilt.',
      good:`Buffer absorbs the ${v.money(spike/100)} spike, then two months of rebuilding restores the shield. That\u2019s the buffer doing its job.`,
      bad:`Credit just moves the spike with interest; skipping risks late fees and shutoff notices. Use the buffer, then rebuild it.`,
      why:'A buffer isn\u2019t spent — it\u2019s deployed and then replenished. That cycle is the whole strategy.'
    };
  } },
{ id:'utilities-decide-06', verb:'decide', part:4, tier:'independent', skill:'utilities',
  gen:(v)=>{
    const person=v.person();
    const dep=v.int(100,180)*100;
    return {
      q:`The gas company requires a ${v.money(dep/100)} deposit before turning on service. Move-in is in 5 days and ${person}'s savings are thin. What is the call?`,
      choices:[
        {label:`Pay the deposit from savings now — heat and hot water on day one beat a thin buffer`, ok:true},
        {label:`Delay setup until after move-in — cold showers build character`, ok:false},
        {label:`Assume the landlord will cover it`, ok:false, mis:'assume-included'},
        {label:`Borrow it on a credit card and pay it back "sometime"`, ok:false}
      ],
      hint:'No deposit means no service on move-in day.',
      good:`Pay it: ${v.money(dep/100)} from savings gets gas flowing on day one. Essential service beats a slightly thinner buffer.`,
      bad:`Delaying means moving into a home with no heat or hot water — and the deposit doesn\u2019t shrink by waiting. Pay it, move in functional.`,
      why:'Some costs are gates, not choices — the deposit is the price of a working home on day one.'
    };
  } },
{ id:'utilities-decide-07', verb:'decide', part:4, tier:'independent', skill:'utilities',
  gen:(v)=>{
    const person=v.person();
    const heat=v.int(40,60)*100, bill=v.int(25,40)*100;
    return {
      q:`Winter: ${person} can run a space heater in one room (about ${v.money(heat/100)}/month in electricity) or keep the whole apartment at 72°F (about ${v.money(bill/100)}/month more on the gas bill). Which costs less?`,
      choices:[
        {label:`The space heater — ${v.money(heat/100)} beats ${v.money(bill/100)} for the same warmth where it counts`, ok:true},
        {label:`Whole-apartment heat — comfort everywhere is worth any price`, ok:false},
        {label:`Neither — just wear a coat indoors all winter`, ok:false},
        {label:`The space heater — and run three of them for maximum savings`, ok:false}
      ],
      hint:'Compare the two numbers directly.',
      good:`Heater wins: ${v.money(heat/100)} < ${v.money(bill/100)}. Heat the room you\u2019re in, not the empty ones.`,
      bad:`${v.money(heat/100)} (heater) vs ${v.money(bill/100)} (whole apartment) — the targeted heat costs less.`,
      why:'Heating cost follows heated space — warming one room is simply cheaper than warming five.'
    };
  } },
{ id:'utilities-decide-08', verb:'decide', part:4, tier:'independent', skill:'utilities',
  gen:(v)=>{
    const person=v.person();
    const est=v.int(90,130)*100, actual=v.int(50,75)*100;
    return {
      q:`${person}'s electric bill says "estimated" at ${v.money(est/100)} — but the meter photo ${person} took shows usage closer to ${v.money(actual/100)}. What is the call?`,
      choices:[
        {label:`Send the meter reading to the utility and ask for a corrected bill`, ok:true},
        {label:`Pay the estimate — estimates are always right`, ok:false},
        {label:`Ignore it — overpaying builds credit with the utility`, ok:false},
        {label:`Refuse to pay anything until they apologize`, ok:false}
      ],
      hint:'The meter is the truth; the estimate is a guess.',
      good:`Corrected bill: one photo and one call can save ~${v.money((est-actual)/100)} this month.`,
      bad:`Paying the estimate hands over ~${v.money((est-actual)/100)} extra for nothing. The meter reading is the fix.`,
      why:'Estimated bills are placeholders — a real reading replaces the guess with the truth.'
    };
  } },
{ id:'utilities-spot-01', verb:'spot', part:2, tier:'independent', skill:'utilities',
  gen:(v)=>{
    const person=v.person();
    const lo=v.int(70,90)*100, hi=v.int(130,170)*100;
    return {
      scenario:`<p>${person}\u2019s budget worksheet:</p><ul><li>Electric bill: listed as "varies ${v.money(lo/100)}–${v.money(hi/100)}"</li><li>Budgeted amount: ${v.money(Math.round((lo+hi)/2)/100)} ("right in the middle — that\u2019s what vary means")</li></ul>`,
      q:'What is the mistake here?',
      choices:[
        {label:`${person} treated "varies" as a single safe number — the middle fails every above-average month`, ok:true},
        {label:`${person} should have budgeted $0 — variable bills are unplannable`, ok:false, mis:'variable-means-unplannable'},
        {label:`${person} over-budgeted — the low end is the real bill`, ok:false},
        {label:`There is no mistake — the middle of a range is always safe`, ok:false, mis:'vary-is-a-number'}
      ],
      hint:'What happens in a ${v.money(hi/100)} month?',
      good:`Right — "vary" is a range, not a number. The middle leaves ${person} short in every high month.`,
      bad:`In a ${v.money(hi/100)} month, a ${v.money(Math.round((lo+hi)/2)/100)} budget is short ${v.money((hi-Math.round((lo+hi)/2))/100)}. Budget the range, not the midpoint.`,
      why:'"Vary" describes the weather, not the budget — plan for the range, especially the top of it.'
    };
  } },
{ id:'utilities-spot-02', verb:'spot', part:2, tier:'independent', skill:'utilities',
  gen:(v)=>{
    const person=v.person();
    return {
      scenario:`<p>${person}\u2019s lease: "Tenant responsible for electric and gas." ${person}\u2019s move-in checklist:</p><ul><li>Electric account: "landlord handles it, surely"</li><li>Gas account: "I\u2019ll call if the heat doesn\u2019t work"</li></ul>`,
      q:'What is the mistake here?',
      choices:[
        {label:`${person} assumed away accounts the lease clearly assigned`, ok:true},
        {label:`${person} over-prepared — landlords always set up utilities`, ok:false, mis:'assume-included'},
        {label:`The mistake is reading the lease at all`, ok:false},
        {label:`There is no mistake — heat works without an account`, ok:false}
      ],
      hint:'The lease sentence names the tenant. Twice.',
      good:`Right — "tenant responsible" means ${person} opens the accounts. "Surely" isn\u2019t a setup confirmation.`,
      bad:`The lease assigned both accounts to the tenant. Move-in day with no accounts = no power, no heat.`,
      why:'Assumed coverage is the classic move-in failure — the lease already said who does what.'
    };
  } },
{ id:'utilities-spot-03', verb:'spot', part:2, tier:'independent', skill:'utilities',
  gen:(v)=>{
    const person=v.person();
    return {
      scenario:`<p>${person}\u2019s budget:</p><ul><li>Rent: budgeted</li><li>Internet: budgeted</li><li>Electric: $0 — "it changes every month so you can\u2019t budget it"</li><li>Gas: $0 — "same reason"</li></ul>`,
      q:'What is the mistake here?',
      choices:[
        {label:`${person} deleted variable bills instead of planning for them — variable means buffer, not zero`, ok:true},
        {label:`${person} is right — unpredictable bills don\u2019t belong in budgets`, ok:false, mis:'variable-means-unplannable'},
        {label:`${person} should also delete the internet line for consistency`, ok:false},
        {label:`There is no mistake — $0 is a valid estimate`, ok:false}
      ],
      hint:'The bills arrive whether they\u2019re budgeted or not.',
      good:`Right — variable bills need estimates and buffers, not deletion. $0 just guarantees a shock.`,
      bad:`Electric and gas will bill real dollars every month. Budget a range with a buffer instead of $0.`,
      why:'Uncertainty is a reason to plan, not a reason to omit — the bill doesn\u2019t care that it wasn\u2019t budgeted.'
    };
  } },
{ id:'utilities-spot-04', verb:'spot', part:3, tier:'guided', skill:'utilities',
  gen:(v)=>{
    const person=v.person();
    const b1=v.int(80,110)*100, b2=v.int(60,85)*100, b3=v.int(90,120)*100;
    const wrong=b1+b2+b3, right=Math.round(wrong/3);
    return {
      scenario:`<p>${person}\u2019s "average bill" math:</p><ul><li>Bills: ${v.money(b1/100)}, ${v.money(b2/100)}, ${v.money(b3/100)}</li><li>${person}\u2019s average: ${v.money(wrong/100)}</li></ul>`,
      q:'What is the mistake here?',
      choices:[
        {label:`${person} added the bills but forgot to divide — the average is ${v.money(right/100)}, not ${v.money(wrong/100)}`, ok:true},
        {label:`${person} should have used only the highest bill`, ok:false},
        {label:`${person} should have budgeted $0 — averages are guesses anyway`, ok:false, mis:'variable-means-unplannable'},
        {label:`There is no mistake — ${v.money(wrong/100)} is the average`, ok:false}
      ],
      cue:'Average means total ÷ how many bills. Count the bills.',
      hint:'Three bills were added. What\u2019s missing?',
      good:`Right — (${v.money(b1/100)} + ${v.money(b2/100)} + ${v.money(b3/100)}) ÷ 3 = ${v.money(right/100)}.`,
      bad:`Total is ${v.money(wrong/100)}, but that\u2019s three months of bills, not one. Divide by 3: ${v.money(right/100)}.`,
      why:'A total is not an average — forgetting to divide triples the budget line by accident.'
    };
  } },
{ id:'utilities-spot-05', verb:'spot', part:3, tier:'guided', skill:'utilities',
  gen:(v)=>{
    const person=v.person();
    const mild=v.int(55,75)*100, winter=v.int(130,170)*100;
    return {
      scenario:`<p>${person} budgeted the gas bill at ${v.money(mild/100)}/month — the September amount — for the whole year.</p><ul><li>September bill: ${v.money(mild/100)}</li><li>January bill (last year): ${v.money(winter/100)}</li><li>${person}\u2019s note: "A bill is a bill."</li></ul>`,
      q:'What is the mistake here?',
      choices:[
        {label:`${person} budgeted a mild month as if every month is mild — winter will be ${v.money((winter-mild)/100)} over`, ok:true},
        {label:`${person} should have budgeted the January amount for every month`, ok:false},
        {label:`${person} is right — bills don\u2019t change with seasons`, ok:false, mis:'vary-is-a-number'},
        {label:`There is no mistake — September is representative`, ok:false}
      ],
      cue:'Compare the September number to the January number. Same bill?',
      hint:'One month\u2019s bill is not the year\u2019s bill.',
      good:`Right — January runs ${v.money(winter/100)} vs September\u2019s ${v.money(mild/100)}. "A bill is a bill" ignores seasons.`,
      bad:`Winter months hit ~${v.money(winter/100)} — ${v.money((winter-mild)/100)} over the ${v.money(mild/100)} budget, every cold month.`,
      why:'Sampling one mild month and projecting it year-round is how winter becomes a financial surprise.'
    };
  } },
{ id:'utilities-spot-06', verb:'spot', part:3, tier:'guided', skill:'utilities',
  gen:(v)=>{
    const person=v.person();
    const bal=v.int(80,120)*100, bill=v.int(140,190)*100;
    return {
      scenario:`<p>${person} put the variable electric bill on autopay. This month:</p><ul><li>Checking balance on draft day: ${v.money(bal/100)}</li><li>Electric bill drafted: ${v.money(bill/100)}</li><li>Result: overdraft fee</li></ul>`,
      q:'What is the mistake here?',
      choices:[
        {label:`${person} automated a swinging bill against a thin balance — autopay drafted more than was there`, ok:true},
        {label:`The mistake is having a checking account at all`, ok:false},
        {label:`Autopay is always safe — the bank made an error`, ok:false},
        {label:`There is no mistake — overdrafts are free`, ok:false}
      ],
      cue:'Autopay drafts the FULL bill. Was the full bill in the account?',
      hint:`${v.money(bill/100)} drafted from ${v.money(bal/100)}.`,
      good:`Right — autopay doesn\u2019t check your balance first. ${v.money(bill/100)} out of ${v.money(bal/100)} means overdraft.`,
      bad:`The bill (${v.money(bill/100)}) exceeded the balance (${v.money(bal/100)}). On variable bills with thin cash, manual pay keeps control.`,
      why:'Autopay is a promise to pay any amount — only make that promise when the balance can keep it.'
    };
  } },
{ id:'utilities-compare-01', verb:'compare', part:3, tier:'guided', skill:'utilities',
  gen:(v)=>{
    const person=v.person();
    const flat=v.int(105,115)*100, avg=v.int(92,102)*100;
    const yrFlat=flat*12, yrAvg=avg*12;
    return {
      context:`<p><b>Option A:</b> budget billing — flat ${v.money(flat/100)}/month → ${v.money(yrFlat/100)}/year.</p><p><b>Option B:</b> pay actual — averages ${v.money(avg/100)}/month but swings $65–$150 → ${v.money(yrAvg/100)}/year.</p>`,
      q:`On pure dollars over the year, which costs less?`,
      choices:[
        {label:`Option B — ${v.money(yrAvg/100)} for the year vs ${v.money(yrFlat/100)}`, ok:true},
        {label:`Option A — flat plans are always cheaper`, ok:false},
        {label:`Option B — but only because estimates are free money`, ok:false},
        {label:`They cost exactly the same — smoothing is free`, ok:false}
      ],
      cue:'Multiply each monthly number by 12 and compare the yearly totals.',
      hint:'Yearly = monthly × 12 for each option.',
      good:`Right — B costs ${v.money((yrFlat-yrAvg)/100)} less over the year. (A still wins on predictability — that\u2019s a separate question.)`,
      bad:`A: 12 × ${v.money(flat/100)} = ${v.money(yrFlat/100)}. B: 12 × ${v.money(avg/100)} = ${v.money(yrAvg/100)}. B costs fewer dollars.`,
      why:'Cost and predictability are different axes — compare dollars to dollars first, then decide what smooth billing is worth.'
    };
  } },
{ id:'utilities-compare-02', verb:'compare', part:3, tier:'guided', skill:'utilities',
  gen:(v)=>{
    const person=v.person();
    const flat=v.int(58,65)*100, base=v.int(42,48)*100, fees=v.int(10,15)*100;
    const varTotal=base+fees;
    return {
      context:`<p><b>Option A:</b> ${v.money(flat/100)}/month internet, all fees included.</p><p><b>Option B:</b> ${v.money(base/100)}/month + about ${v.money(fees/100)} in fees = ${v.money(varTotal/100)} true monthly.</p>`,
      q:`Which internet plan costs less per month?`,
      choices: varTotal<flat ? [
        {label:`Option B — ${v.money(varTotal/100)} true monthly beats ${v.money(flat/100)}`, ok:true},
        {label:`Option A — the advertised ${v.money(flat/100)} vs ${v.money(base/100)}… wait, compare full totals`, ok:false},
        {label:`Option B — the ${v.money(base/100)} sticker price is the whole cost`, ok:false},
        {label:`Tie — fees don\u2019t count`, ok:false}
      ] : [
        {label:`Option A — ${v.money(flat/100)} all-in beats B's ${v.money(varTotal/100)} true cost`, ok:true},
        {label:`Option B — ${v.money(base/100)} is lower than ${v.money(flat/100)}`, ok:false, mis:'sticker-rent'},
        {label:`Tie — fees don\u2019t count`, ok:false},
        {label:`Option B — fees can be negotiated away`, ok:false, mis:'fees-negotiable'}
      ],
      cue:'Add the fees into Option B before comparing.',
      hint:'B\u2019s real price is base + fees.',
      good: varTotal<flat ? `Right — B's true ${v.money(varTotal/100)} beats A's ${v.money(flat/100)}.` : `Right — B's fees push it to ${v.money(varTotal/100)}, so A's flat ${v.money(flat/100)} wins.`,
      bad:`B = ${v.money(base/100)} + ${v.money(fees/100)} = ${v.money(varTotal/100)} vs A = ${v.money(flat/100)}. Compare those.`,
      why:'"Plus fees" is part of the price — the sticker rate without fees is a different product\u2019s price.'
    };
  } },
{ id:'utilities-compare-03', verb:'compare', part:3, tier:'guided', skill:'utilities',
  gen:(v)=>{
    const person=v.person();
    const flat=v.int(32,40)*100, avg=v.int(24,30)*100;
    return {
      context:`<p><b>Option A:</b> flat-rate water ${v.money(flat/100)}/month → ${v.money((flat*12)/100)}/year.</p><p><b>Option B:</b> metered water, averages ${v.money(avg/100)}/month (swings $18–$42) → ${v.money((avg*12)/100)}/year.</p>`,
      q:`Which water option costs less over a year?`,
      choices:[
        {label:`Option B — ${v.money((avg*12)/100)}/year vs ${v.money((flat*12)/100)}`, ok:true},
        {label:`Option A — flat rates are always the better deal`, ok:false},
        {label:`Option B — metered water is free if you\u2019re careful`, ok:false},
        {label:`They\u2019re equal — averages lie`, ok:false, mis:'vary-is-a-number'}
      ],
      cue:'Stretch both to 12 months and compare yearly totals.',
      hint:'Monthly × 12 for each.',
      good:`Right — metered averages ${v.money((avg*12)/100)}/year vs flat ${v.money((flat*12)/100)}. Metered wins on dollars.`,
      bad:`A: 12 × ${v.money(flat/100)} = ${v.money((flat*12)/100)}. B: 12 × ${v.money(avg/100)} = ${v.money((avg*12)/100)}. B is cheaper.`,
      why:'For low-water households, metered billing usually wins — but only the yearly math proves it.'
    };
  } },
{ id:'utilities-compare-04', verb:'compare', part:4, tier:'independent', skill:'utilities',
  gen:(v)=>{
    const person=v.person();
    const d=v.int(25,45)*100, months=3;
    return {
      context:`<p><b>Option A:</b> AC at 78°F all summer — baseline bill.</p><p><b>Option B:</b> AC at 72°F — about ${v.money(d/100)}/month more, for ${months} summer months = ${v.money((d*months)/100)} extra.</p>`,
      q:`How much does the colder setting cost over the summer?`,
      choices:[
        {label:`${v.money((d*months)/100)} extra — ${v.money(d/100)} × ${months} months`, ok:true},
        {label:`${v.money(d/100)} — just the monthly difference`, ok:false},
        {label:`Nothing — thermostats don\u2019t affect bills`, ok:false},
        {label:`${v.money((d*12)/100)} — the difference applies all year`, ok:false}
      ],
      hint:'Monthly difference × summer months.',
      good:`Right — ${v.money(d/100)} × ${months} = ${v.money((d*months)/100)} for the colder summer.`,
      bad:`The gap is ${v.money(d/100)}/month for ${months} months: ${v.money((d*months)/100)} total.`,
      why:'Comfort has a seasonal price tag — multiplying the monthly gap across the season makes it visible.'
    };
  } },
{ id:'utilities-compare-05', verb:'compare', part:4, tier:'independent', skill:'utilities',
  gen:(v)=>{
    const person=v.person();
    const flat=v.int(100,115)*100;
    const m1=v.int(60,80)*100, m2=v.int(70,90)*100, m3=v.int(120,150)*100, m4=v.int(130,160)*100;
    const yrFlat=flat*12, yrAct=(m1+m2+m3+m4)*3;
    return {
      context:`<p><b>Option A:</b> level-pay ${v.money(flat/100)}/month → ${v.money(yrFlat/100)}/year.</p><p><b>Option B:</b> actual seasonal bills averaging ${v.money(Math.round((m1+m2+m3+m4)/4)/100)}/month → ${v.money(yrAct/100)}/year.</p>`,
      q:`Which costs fewer dollars over the year?`,
      choices: yrAct<yrFlat ? [
        {label:`Option B — ${v.money(yrAct/100)} vs ${v.money(yrFlat/100)}`, ok:true},
        {label:`Option A — level plans always win`, ok:false},
        {label:`They\u2019re identical — smoothing changes nothing`, ok:false},
        {label:`Option B — seasonal bills are basically free in mild months`, ok:false}
      ] : [
        {label:`Option A — ${v.money(yrFlat/100)} vs ${v.money(yrAct/100)}`, ok:true},
        {label:`Option B — actual bills are always cheaper`, ok:false},
        {label:`They\u2019re identical — smoothing changes nothing`, ok:false},
        {label:`Option A — level plans charge extra for the convenience`, ok:false}
      ],
      hint:'Yearly vs yearly — multiply it out.',
      good: yrAct<yrFlat ? `Right — actual billing totals ${v.money(yrAct/100)}, ${v.money((yrFlat-yrAct)/100)} less than level-pay.` : `Right — level-pay totals ${v.money(yrFlat/100)}, ${v.money((yrAct-yrFlat)/100)} less than actual billing here.`,
      bad:`A: 12 × ${v.money(flat/100)} = ${v.money(yrFlat/100)}. B totals ${v.money(yrAct/100)}. Smaller wins.`,
      why:'Level-pay trades dollars for predictability — the yearly math shows exactly what the trade costs.'
    };
  } },
{ id:'utilities-compare-06', verb:'compare', part:4, tier:'independent', skill:'utilities',
  gen:(v)=>{
    const person=v.person();
    const T=v.int(150,210)*100, half=Math.round(T/2), use=Math.round(T*0.65);
    return {
      context:`<p><b>Option A:</b> 50/50 split — ${person} pays ${v.money(half/100)} of the ${v.money(T/100)} bill.</p><p><b>Option B:</b> usage split — ${person} used ~65%, so pays ${v.money(use/100)}.</p>`,
      q:`On pure cost to ${person}, which split is cheaper?`,
      choices:[
        {label:`Option A — ${v.money(half/100)} is less than ${v.money(use/100)}`, ok:true},
        {label:`Option B — usage splits are always cheaper for everyone`, ok:false},
        {label:`They cost the same — splits are splits`, ok:false},
        {label:`Option B — the roommate will cover the difference`, ok:false}
      ],
      hint:'Compare the two numbers ${person} would actually pay.',
      good:`Right — ${v.money(half/100)} < ${v.money(use/100)}. (Fairness is a separate question from cost.)`,
      bad:`A costs ${person} ${v.money(half/100)}; B costs ${v.money(use/100)}. A is cheaper for ${person}.`,
      why:'Cost and fairness can point opposite ways — see both numbers clearly, then choose with eyes open.'
    };
  } },
{ id:'utilities-predict-01', verb:'predict', part:3, tier:'guided', skill:'utilities',
  gen:(v)=>{
    const person=v.person();
    const avg=v.int(70,90)*100, spike=v.int(140,180)*100;
    return {
      q:`${person} budgets the electric bill at the ${v.money(avg/100)} average with zero buffer. January\u2019s bill arrives at ${v.money(spike/100)}. What breaks first?`,
      choices:[
        {label:`The month\u2019s plan — ${v.money((spike-avg)/100)} has to come from somewhere (savings, another bill, or debt)`, ok:true},
        {label:`Nothing — the utility forgives first-time spikes`, ok:false},
        {label:`The bill — it drops back to average on its own`, ok:false, mis:'vary-is-a-number'},
        {label:`Next month\u2019s bill — it will be extra low to compensate`, ok:false}
      ],
      cue:'Subtract the budgeted number from the actual bill. Where does the gap go?',
      hint:'The bill is real; the budget was a guess.',
      good:`Right — ${v.money(spike/100)} − ${v.money(avg/100)} = ${v.money((spike-avg)/100)} short, and shortfalls always land somewhere.`,
      bad:`The gap is ${v.money((spike-avg)/100)}. With no buffer, it eats savings or another bill\u2019s money.`,
      why:'Averages don\u2019t pay bills — the buffer between the average and the peak is what survives January.'
    };
  } },
{ id:'utilities-predict-02', verb:'predict', part:3, tier:'guided', skill:'utilities',
  gen:(v)=>{
    const person=v.person();
    const fee=v.int(25,35)*100;
    return {
      q:`${person} autopays a swinging electric bill from a checking account that usually holds about $90. A $150 summer bill drafts. What happens next?`,
      choices:[
        {label:`Overdraft — the draft exceeds the balance, plus a ${v.money(fee/100)} bank fee on top`, ok:true},
        {label:`Nothing — autopay waits until the balance is high enough`, ok:false},
        {label:`The utility lowers the bill to fit the balance`, ok:false},
        {label:`The bank covers it for free as a courtesy`, ok:false}
      ],
      cue:'Autopay drafts the full amount. Compare it to the balance.',
      hint:'$150 out of ~$90.',
      good:`Right — the draft overdraws the account, and the bank adds its ~${v.money(fee/100)} fee to the damage.`,
      bad:`$150 drafted from ~$90 = overdraft. Autopay never asks permission — it just drafts.`,
      why:'Automating a variable bill on a thin balance converts one problem (the bill) into two (the bill + fees).'
    };
  } },
{ id:'utilities-predict-03', verb:'predict', part:3, tier:'guided', skill:'utilities',
  gen:(v)=>{
    const person=v.person();
    const dep=v.int(90,160)*100;
    return {
      q:`${person} never paid the ${v.money(dep/100)} gas deposit, assuming "they\u2019ll turn it on anyway." Move-in day arrives in winter. What happens?`,
      choices:[
        {label:`No gas service — no heat, no hot water until the deposit is paid`, ok:true},
        {label:`The gas company turns it on as a move-in gift`, ok:false},
        {label:`The landlord secretly paid it`, ok:false, mis:'assume-included'},
        {label:`Deposits are symbolic — service starts regardless`, ok:false}
      ],
      cue:'What did the utility require BEFORE service starts?',
      hint:'Deposit first, service second.',
      good:`Right — the deposit is a gate. No deposit, no gas, no heat on move-in day.`,
      bad:`The utility required ${v.money(dep/100)} before activation. Assuming otherwise means a cold, showerless move-in.`,
      why:'Setup requirements don\u2019t negotiate with move-in day — gates stay closed until paid.'
    };
  } },
{ id:'utilities-predict-04', verb:'predict', part:4, tier:'independent', skill:'utilities',
  gen:(v)=>{
    const person=v.person();
    const under=v.int(15,30)*100, months=12, owed=under*months;
    return {
      q:`${person} pays "estimated" electric bills for a full year without ever submitting a meter reading. The estimates ran about ${v.money(under/100)}/month low. What happens at the annual true-up?`,
      choices:[
        {label:`A catch-up bill for roughly ${v.money(owed/100)} — a year of underestimates lands at once`, ok:true},
        {label:`Nothing — estimates become final after 12 months`, ok:false},
        {label:`The utility writes off the difference as a loyalty bonus`, ok:false},
        {label:`Next year\u2019s estimates drop to compensate`, ok:false}
      ],
      hint:'Estimates are placeholders. The meter is the truth.',
      good:`Right — ~${v.money(under/100)} × 12 = ~${v.money(owed/100)} owed when the real reading lands.`,
      bad:`A year of ${v.money(under/100)}/month underestimates = ~${v.money(owed/100)} due at true-up. One reading a month prevents it.`,
      why:'Estimated billing is a loan from the meter — the true-up collects it all at once.'
    };
  } },
{ id:'utilities-predict-05', verb:'predict', part:4, tier:'independent', skill:'utilities',
  gen:(v)=>{
    const person=v.person();
    const bill=v.int(120,180)*100;
    return {
      q:`The electric account is in ${person}'s name. The roommate moves out mid-lease without notice. The next ${v.money(bill/100)} bill arrives. Who pays it?`,
      choices:[
        {label:`${person} — the account holder owes the full bill, roommate or not`, ok:true},
        {label:`Nobody — the bill dies with the roommate\u2019s departure`, ok:false},
        {label:`The landlord — vacant rooms are the landlord\u2019s problem`, ok:false, mis:'assume-included'},
        {label:`The utility — they should have known the roommate left`, ok:false}
      ],
      hint:'Whose name is on the account?',
      good:`Right — the account holder is liable for the whole ${v.money(bill/100)}, and the utility reports missed payments under that name.`,
      bad:`The bill follows the account name, not the occupancy. ${person} owes ${v.money(bill/100)} and must chase the roommate separately.`,
      why:'Utility liability sticks to the name on the account — roommate agreements are separate from that fact.'
    };
  } },
{ id:'utilities-predict-06', verb:'predict', part:4, tier:'independent', skill:'utilities',
  gen:(v)=>{
    const person=v.person();
    const amt=v.int(200,400)*100;
    return {
      q:`${person} gets an urgent call: "Your power will be cut in 30 minutes unless you pay ${v.money(amt/100)} in gift cards right now." ${person} pays. What happens next?`,
      choices:[
        {label:`The money is gone — real utilities never demand gift cards or threaten instant shutoff`, ok:true},
        {label:`The power stays on — the payment worked`, ok:false},
        {label:`The utility sends a thank-you note for fast payment`, ok:false},
        {label:`The gift cards are refunded by the utility\u2019s fraud department`, ok:false}
      ],
      hint:'How do real utilities actually contact you about bills?',
      good:`Right — it was a scam. Gift-card pressure + instant-shutoff threat is the classic utility scam script.`,
      bad:`No legitimate utility takes gift cards or gives 30-minute ultimatums. The ${v.money(amt/100)} went to a scammer.`,
      why:'Urgency + unusual payment = scam. Real shutoffs follow written notices and offer normal payment channels.'
    };
  } },
{ id:'utilities-build-01', verb:'build', part:4, tier:'independent', skill:'utilities',
  gen:(v)=>({
    h:'Build it: the monthly utility stack',
    body:'<p>Split a $200 monthly utility budget across every home bill.</p>',
    totalDollars:200,
    buckets:[{id:'electric',label:'Electric'},{id:'gas',label:'Gas'},{id:'water',label:'Water'},{id:'internet',label:'Internet'}],
    targets:{electric:85,gas:45,water:30,internet:40},
    hint:'Four bills, $200 total.',
    good:'Right — 85 + 45 + 30 + 40 = 200. Every bill has a home.',
    bad:'Allocate: electric 85, gas 45, water 30, internet 40 = $200 exactly.',
    why:'A utility budget is a stack — one line per bill, nothing sharing, nothing missing.'
  }) },
{ id:'utilities-build-02', verb:'build', part:4, tier:'independent', skill:'utilities',
  gen:(v)=>({
    h:'Build it: utilities with a buffer',
    body:'<p>Split $175 across the bills plus a buffer for the variable ones.</p>',
    totalDollars:175,
    buckets:[{id:'electric',label:'Electric'},{id:'internet',label:'Internet'},{id:'watertrash',label:'Water + trash'},{id:'buffer',label:'Buffer'}],
    targets:{electric:70,internet:45,watertrash:40,buffer:20},
    hint:'The buffer is a real line, not leftover.',
    good:'Right — 70 + 45 + 40 + 20 = 175. The variable bills have backup.',
    bad:'Allocate: electric 70, internet 45, water + trash 40, buffer 20 = $175.',
    why:'Variable bills earn a buffer line — that\u2019s what keeps a spike month from becoming a crisis month.'
  }) },
{ id:'utilities-build-03', verb:'build', part:4, tier:'independent', skill:'utilities',
  gen:(v)=>({
    h:'Build it: summer utility stack',
    body:'<p>Split $220 for a peak-summer month — cooling season changes the mix.</p>',
    totalDollars:220,
    buckets:[{id:'electric',label:'Electric (AC)'},{id:'gas',label:'Gas'},{id:'water',label:'Water'},{id:'internet',label:'Internet'}],
    targets:{electric:110,gas:30,water:35,internet:45},
    hint:'Summer moves money from gas to electric.',
    good:'Right — 110 + 30 + 35 + 45 = 220. The AC line carries the season.',
    bad:'Allocate: electric 110, gas 30, water 35, internet 45 = $220.',
    why:'Seasonal budgets shift weight between lines — summer\u2019s electric line does the heavy lifting.'
  }) },
{ id:'utilities-build-04', verb:'build', part:4, tier:'independent', skill:'utilities',
  gen:(v)=>({
    h:'Build it: winter utility stack',
    body:'<p>Split $150 for a deep-winter month — heating season changes the mix.</p>',
    totalDollars:150,
    buckets:[{id:'gas',label:'Gas (heat)'},{id:'electric',label:'Electric'},{id:'water',label:'Water'},{id:'internet',label:'Internet'}],
    targets:{gas:80,electric:35,water:15,internet:20},
    hint:'Winter moves money from electric to gas.',
    good:'Right — 80 + 35 + 15 + 20 = 150. The heat line carries the season.',
    bad:'Allocate: gas 80, electric 35, water 15, internet 20 = $150.',
    why:'Seasonal budgets shift weight — winter\u2019s gas line does the heavy lifting.'
  }) },
{ id:'utilities-build-05', verb:'build', part:4, tier:'independent', skill:'utilities',
  gen:(v)=>({
    h:'Build it: the full monthly set-aside',
    body:'<p>Split $260/month to cover every utility, including sliced-up quarterly bills and a buffer.</p>',
    totalDollars:260,
    buckets:[{id:'electric',label:'Electric'},{id:'gas',label:'Gas'},{id:'homebills',label:'Water + internet + trash'},{id:'buffer',label:'Buffer'}],
    targets:{electric:95,gas:55,homebills:92,buffer:18},
    hint:'Four lines, $260 — the quarterly water bill is sliced monthly here.',
    good:'Right — 95 + 55 + 92 + 18 = 260. Nothing bills without a line.',
    bad:'Allocate: electric 95, gas 55, water + internet + trash 92, buffer 18 = $260.',
    why:'The complete set-aside covers monthly bills, sliced quarterly bills, and the buffer — then no bill ever surprises.'
  }) },
{ id:'utilities-explain-01', verb:'explain', part:3, tier:'guided', skill:'utilities',
  gen:(v)=>({
    h:'Teach it back: "vary" is not a number',
    prompt:'Explain in your own words why "utilities vary" can\u2019t be used as a budget number.',
    keyPoints:['"Vary" describes a range, not an amount','A range needs a top and bottom before it can be budgeted','The fix is asking: who pays, typical range, deposits','Budget the high end (or average + buffer), never the word "vary"'],
    modelAnswer:'"Vary" tells you the bill moves — it doesn\u2019t tell you how much. To budget it you need the real questions answered: which utilities you pay, what they typically run, and any deposits. Then budget the high end of the range (or the average plus a buffer). The word itself is never the number.',
    hint:'Think: what does "vary" actually tell you?',
    cue:'Start with what the listing says, then list what you still need to know.'
  }) },
{ id:'utilities-explain-02', verb:'explain', part:3, tier:'guided', skill:'utilities',
  gen:(v)=>({
    h:'Teach it back: variable but plannable',
    prompt:'Explain in your own words why a variable utility bill can still be planned for.',
    keyPoints:['Variable means "moves in a range," not "unknowable"','Past bills and seasons give you the range','Tools: average + buffer, budget the high end, or budget billing','Deleting it from the budget guarantees a surprise'],
    modelAnswer:'Variable just means the bill moves inside a range — and ranges can be planned. Past bills and seasonal patterns reveal the range, and then you pick a tool: budget the average plus a buffer, budget the high end, or take the utility\u2019s flat budget-billing plan. What you can\u2019t do is budget zero and hope.',
    hint:'Think: range vs unknowable.',
    cue:'Name the three tools for taming a variable bill.'
  }) },
{ id:'utilities-explain-03', verb:'explain', part:4, tier:'independent', skill:'utilities',
  gen:(v)=>({
    h:'Teach it back: the yearly utility budget',
    prompt:'Explain in your own words how to build a yearly utility budget from seasonal bills.',
    keyPoints:['Group bills by season (winter, summer, mild)','Multiply each season\u2019s monthly rate by its months','Add the seasons for the yearly total','Divide by 12 for a flat monthly set-aside'],
    modelAnswer:'Group the bills by season and find each season\u2019s typical monthly rate. Multiply each rate by its number of months, add the seasons together for the yearly total, then divide by 12. That gives a flat monthly set-aside that covers the expensive seasons with the cheap ones\u2019 leftovers.',
    hint:'Think: seasons → months → total → ÷12.'
  }) },
{ id:'utilities-explain-04', verb:'explain', part:4, tier:'independent', skill:'utilities',
  gen:(v)=>({
    h:'Teach it back: budget the peak',
    prompt:'Explain in your own words why the high month — not the average — sets the utility budget.',
    keyPoints:['The average fails in every above-average month','The bill WILL hit the high end some months','Budgeting the peak means cheap months leave extra','The average only works if a buffer covers the gap'],
    modelAnswer:'An average is below the real bill in every above-average month — and the bill will hit the high end. Budgeting the peak means every month is covered, and cheap months just leave extra behind. The average only works as a budget if a separate buffer covers the months it misses.',
    hint:'Think: what happens in the worst month?'
  }) },
{ id:'utilities-explain-05', verb:'explain', part:4, tier:'independent', skill:'utilities',
  gen:(v)=>({
    h:'Teach it back: the lease check',
    prompt:'Explain in your own words how to check utility responsibility before signing a lease.',
    keyPoints:['Find the utilities clause in the lease itself','List which utilities the tenant pays vs what\u2019s included','Ask the provider about deposits and setup timing','Never assume inclusion from the listing or the landlord\u2019s vibe'],
    modelAnswer:'Open the lease and find the utilities clause — it names exactly which utilities the tenant pays and which are included. Then call the providers to ask about deposits, setup timing, and typical costs. The listing\u2019s wording and the landlord\u2019s assurances are not the lease; only the written clause (plus the provider\u2019s answers) counts.',
    hint:'Think: the one document that actually binds.'
  }) },
],
'groceries': [
{ id:'groceries-choice-01', verb:'choice', part:3, tier:'guided', skill:'groceries',
  gen:(v)=>{
    const person=v.person();
    const amt=v.int(30,45)*100;
    return {
      q:`Guided planning: ${person} has ${v.money(amt/100)} for groceries until the next refill. What is the first step?`,
      choices:[
        {label:`Check the fridge, freezer, and pantry — then plan meals around what\u2019s already there`, ok:true},
        {label:`Head to the store and buy every sale item first`, ok:false, mis:'sale-not-needed'},
        {label:`Write the list from memory — checking takes too long`, ok:false, mis:'memory-inventory'},
        {label:`Spend the standard grocery percentage everyone uses`, ok:false, mis:'one-percent-fits-all'}
      ],
      cue:'The cheapest groceries are the ones already in the kitchen.',
      hint:'Inventory first, list second, store third.',
      good:`Right — a two-minute inventory prevents buying duplicates and anchors the meal plan in reality.`,
      bad:`Start in the kitchen, not the store: check what exists, plan meals, then list only what\u2019s missing.`,
      why:'Inventory-first planning turns ${v.money(amt/100)} into meals instead of duplicates.'
    };
  } },
{ id:'groceries-choice-02', verb:'choice', part:3, tier:'guided', skill:'groceries',
  gen:(v)=>{
    const person=v.person();
    const perMeal=Math.round(v.cents(3,6)*100), nights=v.int(4,6);
    const total=perMeal*nights;
    return {
      q:`Guided math: ${person} plans ${nights} dinners at home this week at about ${v.money(perMeal/100)} per dinner in ingredients. What is the dinner grocery target?`,
      choices:[
        {label:`${v.money(total/100)} — ${nights} dinners × ${v.money(perMeal/100)}`, ok:true},
        {label:`${v.money(perMeal/100)} — one dinner\u2019s cost covers the week`, ok:false},
        {label:`${v.money((total*2)/100)} — double it to be safe`, ok:false},
        {label:`${v.money((perMeal*nights*7)/100)} — multiply by all 7 days instead`, ok:false}
      ],
      cue:'Meals planned × cost per meal = the target.',
      hint:'Multiply, don\u2019t guess.',
      good:`Right: ${nights} × ${v.money(perMeal/100)} = ${v.money(total/100)} for the week\u2019s dinners.`,
      bad:`${nights} dinners at ${v.money(perMeal/100)} each: ${nights} × ${v.money(perMeal/100)} = ${v.money(total/100)}.`,
      why:'Meal-plan math converts "groceries" from a vague blob into dinners × dollars.'
    };
  } },
{ id:'groceries-choice-03', verb:'choice', part:3, tier:'guided', skill:'groceries',
  gen:(v)=>{
    const person=v.person();
    const aOz=v.int(12,16), aP=Math.round(v.cents(3,5)*100);
    const bOz=v.int(24,32), bP=Math.round(v.cents(5,8)*100);
    const aU=aP/aOz, bU=bP/bOz;
    const aWins=aU<bU;
    return {
      q:`Guided math: Oats — small box ${aOz} oz for ${v.money(aP/100)} vs big box ${bOz} oz for ${v.money(bP/100)}. ${person} will use it all. Which is the better buy?`,
      choices: aWins ? [
        {label:`Small box — ${v.money(aU/100)}/oz beats ${v.money(bU/100)}/oz`, ok:true},
        {label:`Big box — bigger is always cheaper per unit`, ok:false},
        {label:`Small box — the lower sticker price always wins`, ok:false},
        {label:`Big box — the higher sticker price means better quality`, ok:false}
      ] : [
        {label:`Big box — ${v.money(bU/100)}/oz beats ${v.money(aU/100)}/oz`, ok:true},
        {label:`Small box — the lower sticker price always wins`, ok:false},
        {label:`Big box — bigger is always cheaper per unit`, ok:false},
        {label:`Small box — small packages are fresher`, ok:false}
      ],
      cue:'Divide each price by its ounces — compare the per-ounce numbers.',
      hint:'Price ÷ ounces for each box.',
      good: aWins ? `Right — ${v.money(aP/100)} ÷ ${aOz} = ${v.money(aU/100)}/oz beats ${v.money(bP/100)} ÷ ${bOz} = ${v.money(bU/100)}/oz.` : `Right — ${v.money(bP/100)} ÷ ${bOz} = ${v.money(bU/100)}/oz beats ${v.money(aP/100)} ÷ ${aOz} = ${v.money(aU/100)}/oz.`,
      bad:`Per-ounce: small = ${v.money(aU/100)}/oz, big = ${v.money(bU/100)}/oz. Lower per-unit wins when you\u2019ll use it all.`,
      why:'Unit price is the only fair comparison — package price without size is just advertising.'
    };
  } },
{ id:'groceries-choice-04', verb:'choice', part:3, tier:'guided', skill:'groceries',
  gen:(v)=>{
    const person=v.person();
    const item=v.pick(['artisan crackers','fancy cheese','sparkling juice','gourmet cookies']);
    const price=Math.round(v.cents(4,9)*100);
    return {
      q:`Guided judgment: ${item} are on sale for ${v.money(price/100)} (regularly $${(price/100+3).toFixed(2)}). They are NOT on ${person}'s meal-plan list. Buy them?`,
      choices:[
        {label:`No — a sale on an unplanned item is spending, not saving`, ok:true},
        {label:`Yes — the discount means it\u2019s basically free`, ok:false, mis:'sale-not-needed'},
        {label:`Yes — sales this good never come back`, ok:false},
        {label:`No — but only because the discount isn\u2019t big enough`, ok:false}
      ],
      cue:'Ask: was this item going to be bought anyway?',
      hint:'Savings require a plan the sale fits into.',
      good:`Right — unplanned "savings" still cost ${v.money(price/100)} out of the grocery budget.`,
      bad:`The sale only saves money if the item was already on the list. Otherwise it\u2019s ${v.money(price/100)} of new spending.`,
      why:'A discount on something you wouldn\u2019t buy is a 100%-off coupon for spending.'
    };
  } },
{ id:'groceries-choice-05', verb:'choice', part:4, tier:'independent', skill:'groceries',
  gen:(v)=>{
    const person=v.person();
    const total=v.int(72,108)*100, meals=v.int(10,14);
    const per=Math.round(total/meals);
    return {
      q:`${person} spends ${v.money(total/100)} on groceries that become ${meals} home-cooked meals. What is the cost per meal?`,
      choices:[
        {label:`${v.money(per/100)} — ${v.money(total/100)} ÷ ${meals} meals`, ok:true},
        {label:`${v.money(total/100)} — the grocery total is the per-meal cost`, ok:false},
        {label:`${v.money(Math.round(total*meals)/100)} — multiply instead`, ok:false},
        {label:`${v.money(Math.round(total/7)/100)} — divide by days in a week`, ok:false}
      ],
      hint:'Total ÷ meals.',
      good:`Right: ${v.money(total/100)} ÷ ${meals} = ${v.money(per/100)} per meal.`,
      bad:`${v.money(total/100)} spread across ${meals} meals = ${v.money(per/100)} each.`,
      why:'Per-meal cost is the great equalizer — it lets home cooking compete honestly with takeout.'
    };
  } },
{ id:'groceries-choice-06', verb:'choice', part:4, tier:'independent', skill:'groceries',
  gen:(v)=>{
    const person=v.person();
    const bigP=v.int(780,900), useN=v.int(8,10), bigN=12;
    const smallP=v.int(440,520), smallN=6;
    const bigU=bigP/useN, smallU=smallP/smallN;
    const smallWins=smallU<bigU;
    return {
      q:`${person} compares: 12-pack for ${v.money(bigP/100)} (will use ${useN} before it spoils) vs 6-pack for ${v.money(smallP/100)} (will use all ${smallN}). Which is cheaper per USED unit?`,
      choices: smallWins ? [
        {label:`6-pack — ${v.money(smallU/100)} per used unit vs ${v.money(bigU/100)}`, ok:true},
        {label:`12-pack — the per-package unit price is lower`, ok:false},
        {label:`12-pack — bigger packs are always the better deal`, ok:false},
        {label:`6-pack — smaller packages are always fresher`, ok:false}
      ] : [
        {label:`12-pack — ${v.money(bigU/100)} per used unit vs ${v.money(smallU/100)}`, ok:true},
        {label:`6-pack — the lower sticker price always wins`, ok:false},
        {label:`12-pack — bigger packs are always the better deal`, ok:false},
        {label:`They\u2019re equal — unit price is unit price`, ok:false}
      ],
      hint:'Divide by what gets USED, not what\u2019s in the pack.',
      good: smallWins ? `Right — ${v.money(smallP/100)} ÷ ${smallN} = ${v.money(smallU/100)} beats ${v.money(bigP/100)} ÷ ${useN} = ${v.money(bigU/100)}. Spoiled units aren\u2019t savings.` : `Right — ${v.money(bigP/100)} ÷ ${useN} = ${v.money(bigU/100)} beats ${v.money(smallP/100)} ÷ ${smallN} = ${v.money(smallU/100)} even with waste.`,
      bad:`Per USED unit: 12-pack = ${v.money(bigP/100)} ÷ ${useN} = ${v.money(bigU/100)}; 6-pack = ${v.money(smallP/100)} ÷ ${smallN} = ${v.money(smallU/100)}.`,
      why:'Bulk math only counts what you actually eat — spoiled units are money in the trash.'
    };
  } },
{ id:'groceries-choice-07', verb:'choice', part:4, tier:'independent', skill:'groceries',
  gen:(v)=>{
    const person=v.person();
    const saleP=Math.round(v.cents(9,13)*100), regP=Math.round(v.cents(5,8)*100);
    const saleU=saleP/20, regU=regP/5;
    return {
      q:`Rice: 20-lb bag on sale for ${v.money(saleP/100)} vs 5-lb bag at regular price ${v.money(regP/100)}. ${person} eats rice weekly and has storage space. Which is the better buy per pound?`,
      choices: saleU<regU ? [
        {label:`20-lb bag — ${v.money(saleU/100)}/lb beats ${v.money(regU/100)}/lb`, ok:true},
        {label:`5-lb bag — smaller bags are always fresher`, ok:false},
        {label:`20-lb bag — the higher sticker price means better rice`, ok:false},
        {label:`5-lb bag — big bags always go stale`, ok:false}
      ] : [
        {label:`5-lb bag — ${v.money(regU/100)}/lb beats ${v.money(saleU/100)}/lb`, ok:true},
        {label:`20-lb bag — the sale sticker means it must be cheaper`, ok:false, mis:'sale-not-needed'},
        {label:`5-lb bag — smaller bags are always fresher`, ok:false},
        {label:`20-lb bag — bigger is always cheaper per unit`, ok:false}
      ],
      hint:'Price ÷ pounds for each bag.',
      good: saleU<regU ? `Right — ${v.money(saleP/100)} ÷ 20 = ${v.money(saleU/100)}/lb beats ${v.money(regP/100)} ÷ 5 = ${v.money(regU/100)}/lb.` : `Right — ${v.money(regP/100)} ÷ 5 = ${v.money(regU/100)}/lb beats the "sale" bag\u2019s ${v.money(saleU/100)}/lb.`,
      bad:`Per pound: 20-lb = ${v.money(saleU/100)}/lb; 5-lb = ${v.money(regU/100)}/lb. Lower wins — sale sticker or not.`,
      why:'A sale sign is a claim; per-unit math is the verdict — especially on staples you\u2019ll definitely use.'
    };
  } },
{ id:'groceries-choice-08', verb:'choice', part:4, tier:'independent', skill:'groceries',
  gen:(v)=>{
    const person=v.person();
    const wk=v.int(100,140)*100, meals=21;
    const per=Math.round(wk/meals);
    return {
      q:`${person}'s weekly grocery budget is ${v.money(wk/100)} for 21 meals (3/day × 7). What is the per-meal target?`,
      choices:[
        {label:`${v.money(per/100)} — ${v.money(wk/100)} ÷ 21 meals`, ok:true},
        {label:`${v.money(Math.round(wk/7)/100)} — divide by 7 days`, ok:false},
        {label:`${v.money(wk/100)} — the budget is the per-meal number`, ok:false},
        {label:`${v.money(Math.round(wk/3)/100)} — divide by 3 meals a day`, ok:false}
      ],
      hint:'Meals per week = 21.',
      good:`Right: ${v.money(wk/100)} ÷ 21 = ${v.money(per/100)} per meal.`,
      bad:`21 meals in the week: ${v.money(wk/100)} ÷ 21 = ${v.money(per/100)} each.`,
      why:'A weekly budget becomes real when it\u2019s sliced per meal — that\u2019s the number every food choice gets judged against.'
    };
  } },
{ id:'groceries-sort-01', verb:'sort', part:3, tier:'guided', skill:'groceries',
  gen:(v)=>({
    h:'Sort it: use it or list it?',
    cue:'Inventory first — sort by what the kitchen already holds.',
    body:'<p>After checking the kitchen, sort each item: cook from what\u2019s here, or add it to the list?</p>',
    buckets:['Use what you have','Add to the list'],
    items:[
      {label:'Half a bag of rice in the pantry', a:'use what you have', why:'Already owned — plan a meal around it.'},
      {label:'Three eggs in the fridge', a:'use what you have', why:'Use them before they age out.'},
      {label:'Frozen chicken from last month', a:'use what you have', why:'Bought and frozen — it\u2019s inventory, not a memory.'},
      {label:'Milk — fridge is empty', a:'add to the list', why:'Needed and not on hand — list it.'},
      {label:'Fresh vegetables — none left', a:'add to the list', why:'No stock — buy for the week\u2019s meals.'},
      {label:'Bread — last slice eaten yesterday', a:'add to the list', why:'Out of stock — it goes on the list.'}
    ]
  }) },
{ id:'groceries-sort-02', verb:'sort', part:3, tier:'guided', skill:'groceries',
  gen:(v)=>({
    h:'Sort it: meal ingredient or impulse?',
    cue:'If the meal plan doesn\u2019t need it, it\u2019s an impulse add.',
    body:'<p>The meal plan is set. Sort each cart addition by whether it serves the plan.</p>',
    buckets:['Meal ingredient','Impulse add'],
    items:[
      {label:'Chicken for Tuesday\u2019s stir-fry', a:'meal ingredient', why:'On the plan for a specific meal.'},
      {label:'Rice for the week\u2019s bowls', a:'meal ingredient', why:'A planned staple across meals.'},
      {label:'Sale cookies — not on the list', a:'impulse add', why:'No meal needs them; the sale created the want.'},
      {label:'Fancy soda — caught my eye', a:'impulse add', why:'Eye-catching isn\u2019t meal-planning.'},
      {label:'Broccoli for Thursday\u2019s pasta', a:'meal ingredient', why:'Planned produce for a planned dinner.'},
      {label:'New snack flavor — "just to try"', a:'impulse add', why:'Curiosity isn\u2019t a meal ingredient.'}
    ]
  }) },
{ id:'groceries-sort-03', verb:'sort', part:3, tier:'guided', skill:'groceries',
  gen:(v)=>({
    h:'Sort it: use soon or stock up?',
    cue:'Ask of each item: how many days until this must be eaten?',
    body:'<p>Sort each item by how fast it must be used.</p>',
    buckets:['Use soon','Stock up'],
    items:[
      {label:'Fresh berries', a:'use soon', why:'Days of life — plan them into this week\u2019s meals.'},
      {label:'Milk', a:'use soon', why:'Perishable — buy for the week, not the month.'},
      {label:'Fresh fish', a:'use soon', why:'Cook within a day or two.'},
      {label:'Rice', a:'stock up', why:'Shelf-stable for months — buy on sale.'},
      {label:'Canned beans', a:'stock up', why:'Pantry staple; sale = stock-up time.'},
      {label:'Pasta', a:'stock up', why:'Keeps for ages — bulk-friendly.'},
      {label:'Frozen vegetables', a:'stock up', why:'Freezer-stable; waste-proof bulk.'}
    ]
  }) },
{ id:'groceries-sort-04', verb:'sort', part:4, tier:'independent', skill:'groceries',
  gen:(v)=>({
    h:'Sort it: real saving or fake saving?',
    body:'<p>Not every "deal" saves money. Sort them.</p>',
    buckets:['Real saving','Fake saving'],
    items:[
      {label:'Lower unit price on rice you eat weekly', a:'real saving', why:'Used fully — the lower per-unit price is real.'},
      {label:'Bulk chicken, portioned and frozen same day', a:'real saving', why:'Preserved before spoiling — savings captured.'},
      {label:'Sale on snacks you\u2019d never buy', a:'fake saving', why:'Unplanned spending wearing a discount costume.'},
      {label:'Bulk berries with no freezer space', a:'fake saving', why:'Half will spoil — the "deal" rots.'},
      {label:'Big pack with a lower per-unit price, all used', a:'real saving', why:'Fully used + cheaper per unit = genuinely cheaper.'},
      {label:'"Buy 2 get 1" on perishables you can\u2019t finish', a:'fake saving', why:'The free one spoils — you paid for two and ate one.'}
    ]
  }) },
{ id:'groceries-sort-05', verb:'sort', part:4, tier:'independent', skill:'groceries',
  gen:(v)=>({
    h:'Sort it: plan step or skip?',
    body:'<p>Sort each habit by whether it belongs in a solid grocery routine.</p>',
    buckets:['Plan step','Skip it'],
    items:[
      {label:'Check the fridge before writing the list', a:'plan step', why:'Inventory prevents duplicates.'},
      {label:'Plan meals for the week', a:'plan step', why:'Meals turn a list into a strategy.'},
      {label:'Compare unit prices on staples', a:'plan step', why:'Per-unit math finds the real deal.'},
      {label:'Shop hungry with no list', a:'skip it', why:'Hunger + no list = impulse cart.'},
      {label:'Buy from memory without checking', a:'skip it', why:'Memory duplicates and misses.'},
      {label:'Grab every end-cap sale "just in case"', a:'skip it', why:'"Just in case" is how budgets leak.'}
    ]
  }) },
{ id:'groceries-sort-06', verb:'sort', part:4, tier:'independent', skill:'groceries',
  gen:(v)=>({
    h:'Sort it: fresh or freezer-friendly?',
    body:'<p>Match each food to the form that fits a busy week with limited shopping trips.</p>',
    buckets:['Buy fresh','Buy frozen / shelf-stable'],
    items:[
      {label:'Berries for tomorrow\u2019s breakfast', a:'buy fresh', why:'Eaten immediately — fresh wins.'},
      {label:'Vegetables for stir-fry next week', a:'buy frozen / shelf-stable', why:'Frozen holds nutrition and won\u2019t wilt.'},
      {label:'Chicken for meals 5 days out', a:'buy frozen / shelf-stable', why:'Frozen chicken waits safely; fresh won\u2019t.'},
      {label:'Salad greens for tonight', a:'buy fresh', why:'Tonight\u2019s meal — fresh is right.'},
      {label:'Rice and pasta for the month', a:'buy frozen / shelf-stable', why:'Shelf-stable staples — stock up.'},
      {label:'Canned tomatoes for batch cooking', a:'buy frozen / shelf-stable', why:'Pantry staple, always ready.'}
    ]
  }) },
{ id:'groceries-decide-01', verb:'decide', part:3, tier:'guided', skill:'groceries',
  gen:(v)=>{
    const person=v.person();
    const amt=v.int(30,40)*100;
    return {
      q:`${person} has ${v.money(amt/100)} for groceries until the next refill in 6 days. The store flyer shows big sales. What is the call?`,
      choices:[
        {label:`Inventory the kitchen, plan 6 days of meals, buy only what\u2019s missing — check sales against the list`, ok:true},
        {label:`Buy every sale item first, then figure out meals from the haul`, ok:false, mis:'sale-not-needed'},
        {label:`Write the list from memory at the store — faster`, ok:false, mis:'memory-inventory'},
        {label:`Spend the standard percentage — ${v.money(amt/100)} is probably wrong anyway`, ok:false, mis:'one-percent-fits-all'}
      ],
      cue:'The sales are real, but only useful inside a plan. What comes first?',
      hint:'Inventory → meals → list → store (sales checked last).',
      good:`Plan-first wins: the ${v.money(amt/100)} becomes 6 days of actual meals instead of a pile of discounted randomness.`,
      bad:`Sale-first fills the cart with deals that don\u2019t combine into meals — and the ${v.money(amt/100)} runs out by day 4. Inventory, plan, list, then shop.`,
      why:'Sales serve the plan; the plan never serves the sales.'
    };
  } },
{ id:'groceries-decide-02', verb:'decide', part:3, tier:'guided', skill:'groceries',
  gen:(v)=>{
    const person=v.person();
    return {
      q:`${person} is starving after work and needs groceries tonight. Options: shop now, or eat a quick snack at home first and shop after. What is the call?`,
      choices:[
        {label:`Snack first, then shop with the list — hunger won\u2019t be driving the cart`, ok:true},
        {label:`Shop now — hunger makes you efficient`, ok:false},
        {label:`Shop now and skip the list — hungry instincts know what you need`, ok:false},
        {label:`Order takeout instead and skip groceries entirely`, ok:false}
      ],
      cue:'Ask who\u2019s making the decisions in each option: the plan or the stomach?',
      hint:'Hunger is a terrible shopping assistant.',
      good:`Snack-first: the list survives contact with the store because hunger isn\u2019t voting.`,
      bad:`Shopping starving turns "just groceries" into a cart of immediate cravings — the list never stood a chance. Eat first.`,
      why:'Decisions made hungry serve hunger, not the week\u2019s meals — a 10-minute snack protects the whole trip.'
    };
  } },
{ id:'groceries-decide-03', verb:'decide', part:3, tier:'guided', skill:'groceries',
  gen:(v)=>{
    const person=v.person();
    const extra=v.int(12,22)*100;
    return {
      q:`${person} has a solid list. In the store, three unlisted sale items catch ${person}'s eye — about ${v.money(extra/100)} total. What is the call?`,
      choices:[
        {label:`Stick to the list — the ${v.money(extra/100)} stays in the budget for planned meals`, ok:true},
        {label:`Grab all three — sales this good justify themselves`, ok:false, mis:'sale-not-needed'},
        {label:`Grab them — the list was probably missing things anyway`, ok:false, mis:'memory-inventory'},
        {label:`Grab them and skip something on the list to "balance" it`, ok:false}
      ],
      cue:'The list represents planned meals. What do the extras represent?',
      hint:'Unlisted + on sale = impulse with a costume.',
      good:`List wins: every dollar stays assigned to a real meal instead of leaking into ${v.money(extra/100)} of "deals."`,
      bad:`${v.money(extra/100)} of unplanned extras either blows the budget or forces a planned meal to be skipped. The list is the budget\u2019s bodyguard.`,
      why:'The list is a pre-commitment device — overriding it at the shelf is how "deals" eat the meal plan.'
    };
  } },
{ id:'groceries-decide-04', verb:'decide', part:3, tier:'guided', skill:'groceries',
  gen:(v)=>{
    const person=v.person();
    return {
      q:`${person} is choosing a grocery rhythm: one big monthly stock-up trip vs smaller weekly fresh trips. ${person} has a normal fridge and a busy schedule. What is the call?`,
      choices:[
        {label:`Hybrid — monthly stock-up for shelf-stable staples, weekly quick trips for fresh items`, ok:true},
        {label:`One giant monthly trip for everything — fewer trips always win`, ok:false},
        {label:`Daily trips — freshest food, no planning needed`, ok:false},
        {label:`Monthly trip only — fresh food is overrated`, ok:false}
      ],
      cue:'Match the trip type to the food type: what keeps vs what wilts?',
      hint:'Staples keep; produce doesn\u2019t.',
      good:`Hybrid wins: staples bought monthly on sale, fresh food bought weekly — each on its own optimal rhythm.`,
      bad:`All-monthly means wilted produce by week 2; all-daily means no bulk savings ever. Split by food type.`,
      why:'One rhythm can\u2019t serve two food types — staples reward stock-ups, fresh food rewards frequency.'
    };
  } },
{ id:'groceries-decide-05', verb:'decide', part:5, tier:'independent', skill:'groceries',
  gen:(v)=>{
    const person=v.person();
    const fee=v.int(55,65)*100, save=v.int(8,15)*100, yrSave=save*12;
    return {
      q:`A warehouse club costs ${v.money(fee/100)}/year. ${person} estimates it would save about ${v.money(save/100)}/month on staples bought there. Join?`,
      choices:[
        {label:`Yes — ${v.money(yrSave/100)}/year in savings beats the ${v.money(fee/100)} fee`, ok:true},
        {label:`No — membership fees are never worth it`, ok:false},
        {label:`Yes — bulk buying always pays off regardless of the math`, ok:false},
        {label:`No — the fee means the savings aren\u2019t real`, ok:false}
      ],
      hint:'Yearly savings vs yearly fee.',
      good:`Join: ${v.money(yrSave/100)} − ${v.money(fee/100)} = ${v.money((yrSave-fee)/100)} net gain for the year.`,
      bad:`Do the year: ${v.money(save/100)} × 12 = ${v.money(yrSave/100)} saved vs ${v.money(fee/100)} fee. The fee loses.`,
      why:'Memberships are math: yearly savings minus the fee. The fee isn\u2019t a vibe — it\u2019s a number to beat.'
    };
  } },
{ id:'groceries-decide-06', verb:'decide', part:5, tier:'independent', skill:'groceries',
  gen:(v)=>{
    const person=v.person();
    const kit=Math.round(v.cents(9,12)*100), home=v.int(3,5)*100, wk=5;
    return {
      q:`Meal kits cost ${v.money(kit/100)}/meal; cooking the same meals from groceries costs about ${v.money(home/100)}/meal. ${person} eats 5 such dinners a week. What is the call?`,
      choices:[
        {label:`Cook from groceries — saves $${((kit-home)*wk/100).toFixed(2)}/week (${v.money(kit/100)} vs ${v.money(home/100)} × 5)`, ok:true},
        {label:`Meal kits — the per-meal price looks small so it must be cheaper`, ok:false},
        {label:`Meal kits — cooking at home has hidden costs that erase the gap`, ok:false},
        {label:`Split randomly — variety matters more than cost`, ok:false}
      ],
      hint:'Weekly = per-meal gap × 5.',
      good:`Groceries win by $${((kit-home)*wk/100).toFixed(2)} every week — that\u2019s $${((kit-home)*wk*52/100).toFixed(0)} a year for the same dinners.`,
      bad:`Gap per meal: ${v.money(kit/100)} − ${v.money(home/100)} = ${v.money((kit-home)/100)}. × 5/week = $${((kit-home)*wk/100).toFixed(2)} extra weekly for kits.`,
      why:'Per-meal prices look small until they\u2019re multiplied by a week, then a year — convenience has a visible price.'
    };
  } },
{ id:'groceries-decide-07', verb:'decide', part:5, tier:'independent', skill:'groceries',
  gen:(v)=>{
    const person=v.person();
    const deal=v.pick(['chicken breasts','ground turkey','berries']);
    return {
      q:`${person}'s freezer fits about 8 family packs. ${deal} are at a deep sale — limit 12 packs. ${person} eats them weekly. How many to buy?`,
      choices:[
        {label:`8 — fill the freezer, the real storage limit, and skip the rest of the "deal"`, ok:true},
        {label:`12 — the limit is the target; figure out storage later`, ok:false},
        {label:`2 — sales always come back, no rush`, ok:false},
        {label:`12 — stack them in the fridge instead`, ok:false}
      ],
      hint:'The freezer holds 8. The deal offers 12.',
      good:`8 it is: every pack has a frozen home, zero spoilage, full sale captured on what fits.`,
      bad:`Packs 9–12 have nowhere cold to go — they\u2019d spoil in the fridge, turning the "deal" into waste. Buy the 8 that fit.`,
      why:'Stock-up quantity is set by storage, not by the sale limit — the deal ends where the freezer does.'
    };
  } },
{ id:'groceries-decide-08', verb:'decide', part:5, tier:'independent', skill:'groceries',
  gen:(v)=>{
    const person=v.person();
    const out=v.int(13,18)*100, home=v.int(4,6)*100, n=3, wk=4;
    const outMo=out*n*wk, homeMo=home*n*wk;
    return {
      q:`${person} eats out 3×/week at ~${v.money(out/100)} each (${v.money(outMo/100)}/month). Cooking those meals costs ~${v.money(home/100)} each (${v.money(homeMo/100)}/month). The food budget is tight. What is the call?`,
      choices:[
        {label:`Cook those 3 meals — saves ${v.money((outMo-homeMo)/100)}/month for the same dinners`, ok:true},
        {label:`Keep eating out — ${v.money(out/100)} a meal is cheap`, ok:false},
        {label:`Eat out more — cooking wastes time that earns more`, ok:false},
        {label:`Skip those meals entirely — fasting saves the most`, ok:false}
      ],
      hint:'Monthly vs monthly.',
      good:`Cooking wins: ${v.money(outMo/100)} − ${v.money(homeMo/100)} = ${v.money((outMo-homeMo)/100)}/month back in the budget.`,
      bad:`Eating out: 3 × ${v.money(out/100)} × 4 = ${v.money(outMo/100)}/month. Cooking: 3 × ${v.money(home/100)} × 4 = ${v.money(homeMo/100)}/month. The gap is ${v.money((outMo-homeMo)/100)}.`,
      why:'"Just" $15 a meal is a monthly number in disguise — ×3/week ×4 weeks is where the truth lives.'
    };
  } },
{ id:'groceries-spot-01', verb:'spot', part:3, tier:'guided', skill:'groceries',
  gen:(v)=>{
    const person=v.person();
    const dup=v.int(9,16)*100;
    return {
      scenario:`<p>${person} wrote the grocery list from memory, without opening the fridge.</p><ul><li>Bought: eggs, milk, rice, chicken</li><li>Already at home: eggs, rice, chicken — found afterward</li><li>Wasted on duplicates: ~${v.money(dup/100)}</li></ul>`,
      q:'What is the mistake here?',
      choices:[
        {label:`${person} shopped from memory instead of a 2-minute inventory — ${v.money(dup/100)} of duplicates`, ok:true},
        {label:`${person} should have bought even more — stock up while there`, ok:false},
        {label:`The mistake is shopping at all — delivery avoids this`, ok:false},
        {label:`There is no mistake — duplicates are just extra meals`, ok:false}
      ],
      cue:'Where was the information ${person} needed? (Hint: behind the fridge door.)',
      hint:'Memory vs an actual look inside.',
      good:`Right — the fridge already knew the answer. Two minutes of checking saves ${v.money(dup/100)} of doubles.`,
      bad:`The inventory was sitting in the kitchen the whole time. Memory guessed; the fridge knew.`,
      why:'Memory is a worse inventory system than your eyes — the check takes two minutes and pays every trip.'
    };
  } },
{ id:'groceries-spot-02', verb:'spot', part:3, tier:'guided', skill:'groceries',
  gen:(v)=>{
    const person=v.person();
    return {
      scenario:`<p>${person}\u2019s grocery trip:</p><ul><li>Meal plan: none ("I\u2019ll see what\u2019s on sale")</li><li>Cart: 70% sale items, most unplanned</li><li>Result: nothing combines into dinners; takeout 3 nights</li></ul>`,
      q:'What is the mistake here?',
      choices:[
        {label:`${person} let sales write the meal plan — discounts don\u2019t combine into dinners by themselves`, ok:true},
        {label:`${person} didn\u2019t buy ENOUGH sale items`, ok:false, mis:'sale-not-needed'},
        {label:`The mistake is the takeout — the groceries were fine`, ok:false},
        {label:`There is no mistake — sale shopping is meal planning`, ok:false}
      ],
      cue:'Sales answer "cheap." What question do meals need answered?',
      hint:'Meals need ingredients that go together.',
      good:`Right — a cart of disconnected deals isn\u2019t a week of dinners. The plan comes first; sales fit inside it.`,
      bad:`Seventy percent of the cart was "deals" and zero percent was dinner. Plan meals, then let sales reduce the list\u2019s cost.`,
      why:'Sale-first shopping optimizes the receipt and ruins the week — the plan is what turns groceries into meals.'
    };
  } },
{ id:'groceries-spot-03', verb:'spot', part:3, tier:'guided', skill:'groceries',
  gen:(v)=>{
    const person=v.person();
    const pct=v.int(10,15);
    return {
      scenario:`<p>${person} set the grocery budget at ${pct}% of pay "because that\u2019s the rule."</p><ul><li>Actual meals needed: 21/week</li><li>Actual per-meal cost nearby: ~$6</li><li>${pct}% of pay: covers about 60% of the real need</li></ul>`,
      q:'What is the mistake here?',
      choices:[
        {label:`${person} applied a universal percentage instead of pricing actual meals`, ok:true},
        {label:`${person} should use a BIGGER universal percentage`, ok:false, mis:'one-percent-fits-all'},
        {label:`The mistake is eating 3 meals a day`, ok:false},
        {label:`There is no mistake — percentages are always right`, ok:false, mis:'one-percent-fits-all'}
      ],
      cue:'Does the percentage know how many meals ${person} eats?',
      hint:'Percentages don\u2019t eat; people do.',
      good:`Right — 21 meals × ~$6 is the real number. No percentage knows ${person}'s life.`,
      bad:`The budget must cover actual meals: 21/week × ~$6. A borrowed percentage can\u2019t do that math.`,
      why:'Food budgets come from meals × cost, not from folklore percentages — the plate sets the number.'
    };
  } },
{ id:'groceries-spot-04', verb:'spot', part:4, tier:'independent', skill:'groceries',
  gen:(v)=>{
    const person=v.person();
    const waste=v.int(18,30)*100;
    return {
      scenario:`<p>${person} bought the jumbo berry pack (great unit price!) with no freezer space.</p><ul><li>Unit price: excellent</li><li>Berries eaten: half</li><li>Berries trashed: half (~${v.money(waste/100)} worth)</li><li>${person}\u2019s review: "Still a good deal per ounce."</li></ul>`,
      q:'What is the mistake here?',
      choices:[
        {label:`${person} priced the berries per package-ounce instead of per eaten-ounce — half the "deal" rotted`, ok:true},
        {label:`${person} should have bought TWO jumbo packs`, ok:false},
        {label:`The mistake is not eating faster`, ok:false},
        {label:`There is no mistake — unit price is unit price`, ok:false}
      ],
      hint:'What fraction was actually eaten?',
      good:`Right — with half trashed, the real per-eaten-ounce cost doubled. The "deal" rotted.`,
      bad:`~${v.money(waste/100)} in the trash means the effective price per eaten berry was double the sticker math.`,
      why:'Bulk deals are priced on consumption, not purchase — uneaten units are the most expensive kind.'
    };
  } },
{ id:'groceries-spot-05', verb:'spot', part:4, tier:'independent', skill:'groceries',
  gen:(v)=>{
    const person=v.person();
    return {
      scenario:`<p>${person} chose the $4.20 box over the $5.80 box "because it\u2019s cheaper."</p><ul><li>$4.20 box: 10 oz → $0.42/oz</li><li>$5.80 box: 18 oz → $0.32/oz</li><li>${person} will use it all</li></ul>`,
      q:'What is the mistake here?',
      choices:[
        {label:`${person} compared package prices instead of unit prices — the "cheap" box costs more per ounce`, ok:true},
        {label:`${person} was right — lower sticker always wins`, ok:false},
        {label:`${person} should have bought both to be safe`, ok:false},
        {label:`There is no mistake — $4.20 < $5.80, math is math`, ok:false}
      ],
      hint:'Divide each price by its ounces.',
      good:`Right — $0.42/oz vs $0.32/oz. The bigger box is 24% cheaper per ounce.`,
      bad:`Per-ounce: $4.20 ÷ 10 = $0.42 vs $5.80 ÷ 18 = $0.32. Sticker price lied; unit price told the truth.`,
      why:'Package price is advertising; unit price is information — compare the second, not the first.'
    };
  } },
{ id:'groceries-spot-06', verb:'spot', part:4, tier:'independent', skill:'groceries',
  gen:(v)=>{
    const person=v.person();
    const dup=v.int(10,18)*100;
    return {
      scenario:`<p>${person} "knew" the pantry was out of pasta. It wasn\u2019t.</p><ul><li>Pasta bought: 4 boxes</li><li>Pasta already home: 5 boxes</li><li>Money tied up in duplicates: ~${v.money(dup/100)}</li><li>Meanwhile: actually out of cooking oil — not bought</li></ul>`,
      q:'What is the mistake here?',
      choices:[
        {label:`${person} trusted memory over a 30-second pantry check — bought doubles, missed the real gap`, ok:true},
        {label:`${person} didn\u2019t buy ENOUGH pasta`, ok:false},
        {label:`The mistake is having a pantry at all`, ok:false},
        {label:`There is no mistake — extra pasta is emergency prep`, ok:false, mis:'memory-inventory'}
      ],
      hint:'Two failures: a duplicate AND a miss.',
      good:`Right — memory produced both errors at once: doubles bought, the real need (oil) missed.`,
      bad:`A 30-second look would have shown 5 boxes of pasta and zero oil. Memory got both backwards.`,
      why:'Skipped inventory fails twice: it buys what you have and misses what you need.'
    };
  } },
{ id:'groceries-compare-01', verb:'compare', part:4, tier:'independent', skill:'groceries',
  gen:(v)=>{
    const person=v.person();
    return {
      context:'<p><b>Option A:</b> 12-pack for $8.40 — you will use 9 before it spoils.</p><p><b>Option B:</b> 6-pack for $4.80 — you will use all 6.</p>',
      q:'Which is the better deal for what you will actually use?',
      choices:[
        {label:'Option B — $0.80 per used unit vs $0.93', ok:true},
        {label:'Option A — $0.70 per package unit is lower', ok:false},
        {label:'Option A — bigger packs are always better', ok:false},
        {label:'They\u2019re equal — unit price doesn\u2019t change', ok:false}
      ],
      hint:'Divide by USED units, not package units.',
      good:'Right — B: $4.80 ÷ 6 = $0.80; A: $8.40 ÷ 9 = $0.93 per used unit.',
      bad:'Per used unit: A = $8.40 ÷ 9 = $0.93; B = $4.80 ÷ 6 = $0.80. B wins.',
      why:'The deal is priced on what you eat — spoiled units vote for the smaller pack.'
    };
  } },
{ id:'groceries-compare-02', verb:'compare', part:4, tier:'independent', skill:'groceries',
  gen:(v)=>{
    const person=v.person();
    const frU=Math.round(v.cents(2.80,3.60)*100), fzU=Math.round(v.cents(1.40,1.90)*100);
    const lbs=v.int(2,4), frT=frU*lbs, fzT=fzU*lbs;
    return {
      context:`<p><b>Option A:</b> fresh vegetables at ${v.money(frU/100)}/lb × ${lbs} lbs = ${v.money(frT/100)}.</p><p><b>Option B:</b> frozen vegetables at ${v.money(fzU/100)}/lb × ${lbs} lbs = ${v.money(fzT/100)} (same nutrition, zero wilt).</p>`,
      q:`${person} will cook all ${lbs} lbs this week. Which costs less?`,
      choices:[
        {label:`Option B — ${v.money(fzT/100)} vs ${v.money(frT/100)} for the same ${lbs} lbs`, ok:true},
        {label:`Option A — fresh is always worth more`, ok:false},
        {label:`Option A — frozen vegetables have no nutrition`, ok:false},
        {label:`They\u2019re equal — vegetables are vegetables`, ok:false}
      ],
      hint:'Same pounds, different per-pound price.',
      good:`Right — frozen saves ${v.money((frT-fzT)/100)} on ${lbs} lbs with no nutrition penalty.`,
      bad:`A: ${lbs} × ${v.money(frU/100)} = ${v.money(frT/100)}. B: ${lbs} × ${v.money(fzU/100)} = ${v.money(fzT/100)}. B wins.`,
      why:'Frozen produce is the budget cook\u2019s cheat code — same nutrition, lower price, zero wilt.'
    };
  } },
{ id:'groceries-compare-03', verb:'compare', part:4, tier:'independent', skill:'groceries',
  gen:(v)=>{
    const person=v.person();
    const nP=Math.round(v.cents(3.80,4.60)*100), nOz=v.int(14,16);
    const sP=Math.round(v.cents(2.40,3.00)*100), sOz=v.int(14,16);
    const nU=nP/nOz, sU=sP/sOz;
    const sWins=sU<nU;
    return {
      context:`<p><b>Option A:</b> name brand ${nOz} oz for ${v.money(nP/100)} (${v.money(nU/100)}/oz).</p><p><b>Option B:</b> store brand ${sOz} oz for ${v.money(sP/100)} (${v.money(sU/100)}/oz).</p>`,
      q:'Which is the better buy per ounce?',
      choices: sWins ? [
        {label:`Option B — ${v.money(sU/100)}/oz beats ${v.money(nU/100)}/oz`, ok:true},
        {label:`Option A — the brand name guarantees value`, ok:false},
        {label:`Option A — higher price means higher quality`, ok:false},
        {label:`They\u2019re equal — ounces are ounces`, ok:false}
      ] : [
        {label:`Option A — ${v.money(nU/100)}/oz beats ${v.money(sU/100)}/oz`, ok:true},
        {label:`Option B — store brand is always cheaper`, ok:false},
        {label:`Option B — the lower sticker always wins`, ok:false},
        {label:`They\u2019re equal — ounces are ounces`, ok:false}
      ],
      hint:'Compare the per-ounce numbers.',
      good: sWins ? `Right — store brand at ${v.money(sU/100)}/oz undercuts the name brand\u2019s ${v.money(nU/100)}/oz.` : `Right — here the name brand\u2019s ${v.money(nU/100)}/oz actually beats the store brand\u2019s ${v.money(sU/100)}/oz. Labels don\u2019t decide; math does.`,
      bad:`Per ounce: A = ${v.money(nU/100)}, B = ${v.money(sU/100)}. Lower wins.`,
      why:'Brand is marketing; per-unit is math — and sometimes the math surprises you.'
    };
  } },
{ id:'groceries-compare-04', verb:'compare', part:5, tier:'independent', skill:'groceries',
  gen:(v)=>{
    const person=v.person();
    const use=v.int(6,10), saleU=Math.round(v.cents(0.90,1.30)*100), regU=Math.round(v.cents(1.50,2.00)*100);
    const saleT=saleU*use, regT=regU*use;
    return {
      context:`<p><b>Option A:</b> stock up now at the sale price ${v.money(saleU/100)}/unit × ${use} units/month = ${v.money(saleT/100)}.</p><p><b>Option B:</b> buy weekly at regular ${v.money(regU/100)}/unit × ${use} = ${v.money(regT/100)}/month.</p>`,
      q:`${person} uses ${use} units a month and has storage. Which costs less for the month?`,
      choices:[
        {label:`Option A — ${v.money(saleT/100)} vs ${v.money(regT/100)}`, ok:true},
        {label:`Option B — regular price means fresher stock`, ok:false},
        {label:`Option A — but only if storage is free`, ok:false},
        {label:`They\u2019re equal — sales are marketing tricks`, ok:false, mis:'sale-not-needed'}
      ],
      hint:'Monthly use × unit price for each.',
      good:`Right — stocking up saves ${v.money((regT-saleT)/100)} this month on units ${person} will definitely use.`,
      bad:`A: ${use} × ${v.money(saleU/100)} = ${v.money(saleT/100)}. B: ${use} × ${v.money(regU/100)} = ${v.money(regT/100)}. A wins.`,
      why:'Stock-up math is simple: sale unit price × certain usage — storage turns a sale into a month of savings.'
    };
  } },
{ id:'groceries-compare-05', verb:'compare', part:5, tier:'independent', skill:'groceries',
  gen:(v)=>{
    const person=v.person();
    const fee=v.int(55,65)*100, moUse=v.int(4,6);
    const bulkU=Math.round(v.cents(1.80,2.40)*100), groU=Math.round(v.cents(2.80,3.40)*100);
    const bulkMo=bulkU*moUse+Math.round(fee/12), groMo=groU*moUse;
    return {
      context:`<p><b>Option A:</b> warehouse bulk ${v.money(bulkU/100)}/unit × ${moUse}/month + ${v.money(fee/100)}/yr fee sliced monthly = ${v.money(bulkMo/100)}/month.</p><p><b>Option B:</b> grocery store ${v.money(groU/100)}/unit × ${moUse}/month = ${v.money(groMo/100)}/month.</p>`,
      q:'Which costs less per month, fee included?',
      choices: bulkMo<groMo ? [
        {label:`Option A — ${v.money(bulkMo/100)}/month with the fee beats ${v.money(groMo/100)}`, ok:true},
        {label:`Option B — membership fees always erase the savings`, ok:false},
        {label:`Option A — bulk always wins no matter the numbers`, ok:false},
        {label:`They\u2019re equal — fees and savings cancel exactly`, ok:false}
      ] : [
        {label:`Option B — ${v.money(groMo/100)}/month beats ${v.money(bulkMo/100)} with the fee`, ok:true},
        {label:`Option A — bulk always wins no matter the numbers`, ok:false},
        {label:`Option B — membership fees always erase the savings`, ok:false},
        {label:`They\u2019re equal — fees and savings cancel exactly`, ok:false}
      ],
      hint:'The fee counts — slice it monthly and add it in.',
      good: bulkMo<groMo ? `Right — even with the fee sliced in, bulk costs ${v.money((groMo-bulkMo)/100)} less per month.` : `Right — at this usage the fee isn\u2019t covered: bulk runs ${v.money((bulkMo-groMo)/100)}/month more.`,
      bad:`A: ${moUse} × ${v.money(bulkU/100)} + ${v.money(fee/100)}÷12 = ${v.money(bulkMo/100)}. B: ${moUse} × ${v.money(groU/100)} = ${v.money(groMo/100)}.`,
      why:'Warehouse math must include the membership — amortize the fee monthly, then compare honestly.'
    };
  } },
{ id:'groceries-compare-06', verb:'compare', part:5, tier:'independent', skill:'groceries',
  gen:(v)=>{
    const person=v.person();
    const kit=Math.round(v.cents(9.50,11.50)*100), home=v.int(350,500)*100, n=5;
    return {
      context:`<p><b>Option A:</b> 5 meal kits at ${v.money(kit/100)} each = ${v.money((kit*n)/100)}/week.</p><p><b>Option B:</b> 5 home-cooked equivalents at ~${v.money(home/100)} each = ${v.money((home*n)/100)}/week.</p>`,
      q:'Which costs less for the week\u2019s 5 dinners?',
      choices:[
        {label:`Option B — ${v.money((home*n)/100)} vs ${v.money((kit*n)/100)}`, ok:true},
        {label:`Option A — kits look cheap per box`, ok:false},
        {label:`Option A — cooking at home has hidden costs`, ok:false},
        {label:`They\u2019re equal — convenience is free`, ok:false}
      ],
      hint:'Weekly = per-meal × 5.',
      good:`Right — home cooking saves $${(((kit-home)*n)/100).toFixed(2)} this week alone.`,
      bad:`A: 5 × ${v.money(kit/100)} = ${v.money((kit*n)/100)}. B: 5 × ${v.money(home/100)} = ${v.money((home*n)/100)}. B wins.`,
      why:'Kits sell convenience by the meal; the weekly total reveals its real price.'
    };
  } },
{ id:'groceries-predict-01', verb:'predict', part:4, tier:'independent', skill:'groceries',
  gen:(v)=>{
    const person=v.person();
    const over=v.int(18,35)*100;
    return {
      q:`${person} shops starving, with no list, "just grabbing a few things." What happens at checkout?`,
      choices:[
        {label:`The cart holds ~${v.money(over/100)} of unplanned cravings — the budget leaks before the week starts`, ok:true},
        {label:`Hunger sharpens focus — the trip comes in under budget`, ok:false},
        {label:`The store gives a hunger discount at the register`, ok:false},
        {label:`Nothing different — lists don\u2019t affect spending`, ok:false}
      ],
      hint:'Who\u2019s deciding in the aisles: the plan or the stomach?',
      good:`Right — hunger + no list is the classic budget leak: cravings decide, the plan never gets a vote.`,
      bad:`Without a list, every aisle is a suggestion — and a starving shopper accepts all of them. ~${v.money(over/100)} of impulse is typical.`,
      why:'The checkout total is decided in the aisles, and hunger is a terrible negotiator.'
    };
  } },
{ id:'groceries-predict-02', verb:'predict', part:4, tier:'independent', skill:'groceries',
  gen:(v)=>{
    const person=v.person();
    const waste=v.int(20,35)*100;
    return {
      q:`${person} buys the jumbo fresh-produce box (amazing unit price!) with a tiny fridge and no freezer space. What happens by week\u2019s end?`,
      choices:[
        {label:`About ${v.money(waste/100)} of produce wilts — the "deal" rots at a premium per eaten bite`, ok:true},
        {label:`The produce stays fresh for a month — unit price wins again`, ok:false},
        {label:`The fridge expands to fit — storage adapts to deals`, ok:false},
        {label:`Nothing — produce doesn\u2019t spoil`, ok:false}
      ],
      hint:'Great unit price ÷ zero storage = ?',
      good:`Right — perishables without cold storage become expensive trash. The effective price per eaten bite soars.`,
      bad:`Fresh produce lasts days, not weeks. Without freezer space, the jumbo box\u2019s back half is a ~${v.money(waste/100)} donation to the bin.`,
      why:'Perishable bulk is only a deal when storage exists — otherwise you bought a science experiment.'
    };
  } },
{ id:'groceries-predict-03', verb:'predict', part:4, tier:'independent', skill:'groceries',
  gen:(v)=>{
    const person=v.person();
    const dup=v.int(25,45)*100;
    return {
      q:`${person} skips the kitchen inventory "to save time" for a whole month of grocery trips. What breaks first?`,
      choices:[
        {label:`The budget — ~${v.money(dup/100)} of duplicates pile up while real gaps go unfilled`, ok:true},
        {label:`Nothing — experienced shoppers don\u2019t need inventories`, ok:false, mis:'memory-inventory'},
        {label:`The fridge — it overflows with perfectly planned meals`, ok:false},
        {label:`Time — skipping the check somehow takes longer`, ok:false}
      ],
      hint:'Two minutes skipped × 4 trips = ?',
      good:`Right — a month of memory-shopping compounds into duplicates bought and needs missed.`,
      bad:`Each skipped check risks ~$8–12 in doubles; four trips in, that\u2019s ~${v.money(dup/100)} of budget feeding the pantry\u2019s duplicates.`,
      why:'Skipped inventory doesn\u2019t save time — it converts two minutes into weeks of waste.'
    };
  } },
{ id:'groceries-predict-04', verb:'predict', part:5, tier:'independent', skill:'groceries',
  gen:(v)=>{
    const person=v.person();
    const cost=v.int(120,200)*100;
    return {
      q:`${person} meal-preps every Sunday for a month, then skips prep for three straight weeks "because it\u2019s a hassle." What breaks first?`,
      choices:[
        {label:`The food budget — unplanned nights become ~${v.money(cost/100)} of takeout over three weeks`, ok:true},
        {label:`Nothing — willpower covers the gap`, ok:false},
        {label:`Health — instantly, on day one`, ok:false},
        {label:`The kitchen — it files a complaint`, ok:false}
      ],
      hint:'No prepped food + hungry evenings = ?',
      good:`Right — the prep habit was load-bearing. Without it, tired evenings default to delivery.`,
      bad:`Three weeks of "I\u2019ll figure it out" at ~$40–65/week of takeout = ~${v.money(cost/100)} gone. The hassle was cheaper.`,
      why:'Meal prep isn\u2019t about Sunday — it\u2019s about protecting every tired weeknight from the delivery app.'
    };
  } },
{ id:'groceries-predict-05', verb:'predict', part:5, tier:'independent', skill:'groceries',
  gen:(v)=>{
    const person=v.person();
    return {
      q:`For a month, ${person} buys ONLY what\u2019s on sale — no meal plan, no list. What does the month look like?`,
      choices:[
        {label:`A pantry of disconnected deals, missing-meal gaps, and extra takeout spending to fill them`, ok:true},
        {label:`A perfectly balanced diet at record-low cost`, ok:false, mis:'sale-not-needed'},
        {label:`Massive savings — sales are all a budget needs`, ok:false},
        {label:`Nothing unusual — this is how chefs shop`, ok:false}
      ],
      hint:'Sales optimize price. What optimizes meals?',
      good:`Right — sale-only shopping nails the receipt and misses the week: random ingredients, no dinners, takeout fills the holes.`,
      bad:`A month of "deals" with no plan = ingredients that don\u2019t combine. The takeout bill eats the savings.`,
      why:'Sales answer "what\u2019s cheap" — only a plan answers "what\u2019s dinner."'
    };
  } },
{ id:'groceries-predict-06', verb:'predict', part:5, tier:'independent', skill:'groceries',
  gen:(v)=>{
    const person=v.person();
    const waste=v.int(30,55)*100;
    return {
      q:`${person} does a huge freezer stock-up — then freezes everything unlabeled and undated. Six months later, what happens?`,
      choices:[
        {label:`Mystery bags get tossed — ~${v.money(waste/100)} of food wasted because no one knows what or when it is`, ok:true},
        {label:`Everything gets eaten — labels are for restaurants`, ok:false},
        {label:`The food improves with mystery — aged like fine wine`, ok:false},
        {label:`Nothing — freezers preserve food forever`, ok:false}
      ],
      hint:'Six months from now, is that chicken or fish?',
      good:`Right — unlabeled frozen food becomes unidentifiable risk, and risk gets thrown away.`,
      bad:`Without labels and dates, "use it" becomes "toss it to be safe" — ~${v.money(waste/100)} of the stock-up dies of anonymity.`,
      why:'A stock-up without labels is a donation to future trash — 30 seconds with a marker protects the whole investment.'
    };
  } },
{ id:'groceries-build-01', verb:'build', part:4, tier:'independent', skill:'groceries',
  gen:(v)=>({
    h:'Build it: the weekly grocery split',
    body:'<p>Split a $120 weekly grocery budget across food groups plus a buffer.</p>',
    totalDollars:120,
    buckets:[{id:'produce',label:'Produce'},{id:'protein',label:'Protein'},{id:'pantry',label:'Staples + dairy'},{id:'buffer',label:'Buffer'}],
    targets:{produce:35,protein:40,pantry:37,buffer:8},
    hint:'Four lines, $120 total.',
    good:'Right — 35 + 40 + 37 + 8 = 120. Every food group funded.',
    bad:'Allocate: produce 35, protein 40, staples + dairy 37, buffer 8 = $120.',
    why:'A weekly split keeps any single category from eating the whole budget.'
  }) },
{ id:'groceries-build-02', verb:'build', part:4, tier:'independent', skill:'groceries',
  gen:(v)=>({
    h:'Build it: tight-week groceries',
    body:'<p>Split an $80 weekly grocery budget. Every line matters at this size.</p>',
    totalDollars:80,
    buckets:[{id:'produce',label:'Produce'},{id:'protein',label:'Protein'},{id:'pantry',label:'Staples + dairy'},{id:'buffer',label:'Buffer'}],
    targets:{produce:22,protein:28,pantry:26,buffer:4},
    hint:'Four lines, $80 — staples stretch the furthest.',
    good:'Right — 22 + 28 + 26 + 4 = 80. Tight but complete.',
    bad:'Allocate: produce 22, protein 28, staples + dairy 26, buffer 4 = $80.',
    why:'Small budgets lean on staples — rice, beans, and pasta carry the week\u2019s calories cheaply.'
  }) },
{ id:'groceries-build-03', verb:'build', part:5, tier:'independent', skill:'groceries',
  gen:(v)=>({
    h:'Build it: the monthly stock-up',
    body:'<p>Split a $200 monthly stock-up budget across shelf-stable categories.</p>',
    totalDollars:200,
    buckets:[{id:'drygoods',label:'Rice, pasta + canned'},{id:'frozen',label:'Frozen'},{id:'oilspice',label:'Oils + spices'},{id:'paper',label:'Paper goods'}],
    targets:{drygoods:75,frozen:60,oilspice:25,paper:40},
    hint:'Four stock-up lines, $200.',
    good:'Right — 75 + 60 + 25 + 40 = 200. The pantry is loaded.',
    bad:'Allocate: rice, pasta + canned 75, frozen 60, oils + spices 25, paper 40 = $200.',
    why:'A stocked pantry is a shock absorber — future weeks\u2019 fresh trips get cheaper because the base is covered.'
  }) },
{ id:'groceries-build-04', verb:'build', part:5, tier:'independent', skill:'groceries',
  gen:(v)=>({
    h:'Build it: fresh-forward week',
    body:'<p>Split $150 for a week leaning on fresh food — with frozen backup and a buffer.</p>',
    totalDollars:150,
    buckets:[{id:'fresh',label:'Fresh'},{id:'frozen',label:'Frozen'},{id:'staples',label:'Staples'},{id:'buffer',label:'Buffer'}],
    targets:{fresh:70,frozen:40,staples:30,buffer:10},
    hint:'Four lines, $150.',
    good:'Right — 70 + 40 + 30 + 10 = 150. Fresh leads, frozen backs it up.',
    bad:'Allocate: fresh 70, frozen 40, staples 30, buffer 10 = $150.',
    why:'Fresh-forward weeks cost more — the frozen line is the insurance against wilt-week waste.'
  }) },
{ id:'groceries-build-05', verb:'build', part:5, tier:'independent', skill:'groceries',
  gen:(v)=>({
    h:'Build it: the simple weekly split',
    body:'<p>Split $100 across meals, snacks, staples, and a buffer.</p>',
    totalDollars:100,
    buckets:[{id:'meals',label:'Meals'},{id:'snacks',label:'Snacks'},{id:'staples',label:'Staples'},{id:'buffer',label:'Buffer'}],
    targets:{meals:60,snacks:20,staples:15,buffer:5},
    hint:'Four lines, $100.',
    good:'Right — 60 + 20 + 15 + 5 = 100. Meals first, snacks capped.',
    bad:'Allocate: meals 60, snacks 20, staples 15, buffer 5 = $100.',
    why:'Capping snacks as their own line keeps them from quietly eating the meals budget.'
  }) },
{ id:'groceries-explain-01', verb:'explain', part:4, tier:'independent', skill:'groceries',
  gen:(v)=>({
    h:'Teach it back: inventory first',
    prompt:'Explain in your own words why checking the kitchen beats writing the list from memory.',
    keyPoints:['Memory duplicates what you own and misses what you need','A 2-minute check prevents both errors at once','Inventory connects the list to actual meals','It\u2019s the cheapest step in the whole grocery routine'],
    modelAnswer:'Memory is a bad inventory system: it buys duplicates of what you already own and misses what you actually ran out of. A two-minute check of the fridge, freezer, and pantry prevents both errors at once and connects the shopping list to real meals. It\u2019s the cheapest, fastest step in grocery planning.',
    hint:'Think: what does memory get wrong?'
  }) },
{ id:'groceries-explain-02', verb:'explain', part:4, tier:'independent', skill:'groceries',
  gen:(v)=>({
    h:'Teach it back: unit price',
    prompt:'Explain in your own words why unit price beats package price when comparing options.',
    keyPoints:['Package price hides the size difference','Unit price = price ÷ amount (per oz, per lb)','Lower unit price wins — but only on what you\u2019ll use','Spoiled bulk erases the unit-price advantage'],
    modelAnswer:'Package prices hide size differences, so the only fair comparison is price divided by amount — per ounce or per pound. The lower unit price wins, but only on units you\u2019ll actually use: bulk that spoils has the worst per-used-unit price of all.',
    hint:'Think: what does the sticker hide?'
  }) },
{ id:'groceries-explain-03', verb:'explain', part:5, tier:'independent', skill:'groceries',
  gen:(v)=>({
    h:'Teach it back: stock-up vs fresh',
    prompt:'Explain in your own words how to decide between stocking up and buying fresh.',
    keyPoints:['Shelf-stable + freezer-friendly = stock up on sale','Perishable with no storage = buy fresh, buy small','Storage space sets the stock-up limit','Match the rhythm to the food: monthly staples, weekly fresh'],
    modelAnswer:'Stock up on shelf-stable and freezer-friendly foods when they\u2019re on sale — rice, canned goods, frozen vegetables. Buy perishables fresh and in small quantities you\u2019ll use before they wilt. Storage space sets the stock-up ceiling, and the rhythm follows the food: staples monthly, fresh weekly.',
    hint:'Think: what keeps vs what wilts?'
  }) },
{ id:'groceries-explain-04', verb:'explain', part:5, tier:'independent', skill:'groceries',
  gen:(v)=>({
    h:'Teach it back: the sale trap',
    prompt:'Explain in your own words why a sale isn\u2019t savings without a plan.',
    keyPoints:['A discount only saves money on something you\u2019d buy anyway','Unplanned sale items are new spending, not savings','Sale-first carts don\u2019t combine into meals','Check sales against the list — never build the list from sales'],
    modelAnswer:'A sale only saves money if the item was already going to be bought — otherwise the "discount" is just cheaper spending on something unneeded. Sale-first carts fill with disconnected deals that don\u2019t become meals. The right order is: plan, list, then check which list items happen to be on sale.',
    hint:'Think: when does a discount actually save?'
  }) },
{ id:'groceries-explain-05', verb:'explain', part:5, tier:'independent', skill:'groceries',
  gen:(v)=>({
    h:'Teach it back: the per-meal check',
    prompt:'Explain in your own words how the per-meal cost check keeps a food budget honest.',
    keyPoints:['Per-meal = grocery total ÷ meals it makes','It lets home cooking compete fairly with takeout','A weekly budget ÷ 21 meals = the per-meal target','Every food choice gets judged against that number'],
    modelAnswer:'Divide what the groceries cost by how many meals they make — that\u2019s the per-meal cost, and it lets home cooking compete honestly with takeout prices. A weekly budget divided by 21 meals gives a per-meal target, and every food decision gets judged against it. Vague grocery blobs become accountable numbers.',
    hint:'Think: total ÷ meals = ?'
  }) },
],
'transportation': [
{ id:'transportation-choice-01', verb:'choice', part:4, tier:'independent', skill:'transportation',
  gen:(v)=>{
    const person=v.person();
    const P=v.int(180,260)*100, I=v.int(80,130)*100, F=v.int(60,110)*100, M=v.int(30,60)*100;
    const total=P+I+F+M;
    return {
      q:`${person}'s car costs: payment ${v.money(P/100)}/month, insurance ${v.money(I/100)}/month, fuel ~${v.money(F/100)}/month, maintenance set-aside ${v.money(M/100)}/month. What is the true monthly transportation cost?`,
      choices:[
        {label:`${v.money(total/100)} — payment + insurance + fuel + maintenance`, ok:true},
        {label:`${v.money(P/100)} — the payment is the car cost`, ok:false, mis:'payment-is-total'},
        {label:`${v.money(F/100)} — fuel is the only cost that changes`, ok:false, mis:'volatile-means-only'},
        {label:`${v.money((P+I)/100)} — payment plus insurance; the rest is too small to matter`, ok:false, mis:'small-costs-dont-matter'}
      ],
      hint:'A car is a bundle of four monthly costs.',
      good:`Right: ${v.money(P/100)} + ${v.money(I/100)} + ${v.money(F/100)} + ${v.money(M/100)} = ${v.money(total/100)}/month.`,
      bad:`Stack all four: ${v.money(P/100)} + ${v.money(I/100)} + ${v.money(F/100)} + ${v.money(M/100)} = ${v.money(total/100)}.`,
      why:'The payment is the headline; insurance, fuel, and maintenance are the rest of the bill.'
    };
  } },
{ id:'transportation-choice-02', verb:'choice', part:4, tier:'independent', skill:'transportation',
  gen:(v)=>{
    const person=v.person();
    const W=v.int(120,220), G=v.int(22,32);
    const P=Math.round(v.cents(2.80,3.60)*100);
    const weeklyC=Math.round(W/G*P), monthlyC=weeklyC*4;
    return {
      q:`${person} drives ${W} miles/week. The car gets ${G} mpg and gas is ${v.money(P/100)}/gallon. About what is the monthly fuel cost (4 weeks)?`,
      choices:[
        {label:`${v.money(monthlyC/100)} — ${W}÷${G} gallons/week × ${v.money(P/100)} × 4 weeks`, ok:true},
        {label:`${v.money(P/100)} — the price per gallon is the fuel cost`, ok:false},
        {label:`${v.money((W*P)/100)} — miles × price, skip the mpg`, ok:false},
        {label:`${v.money(weeklyC/100)} — that\u2019s the weekly cost, which is the answer`, ok:false}
      ],
      hint:'Miles ÷ mpg = gallons. Gallons × price = cost.',
      good:`Right: ${W} ÷ ${G} ≈ ${(W/G).toFixed(1)} gal/week × ${v.money(P/100)} = ${v.money(weeklyC/100)}/week × 4 = ${v.money(monthlyC/100)}/month.`,
      bad:`Gallons/week = ${W} ÷ ${G} ≈ ${(W/G).toFixed(1)}; × ${v.money(P/100)} = ${v.money(weeklyC/100)}/week; × 4 weeks = ${v.money(monthlyC/100)}.`,
      why:'Fuel math is three steps — miles to gallons, gallons to dollars, weeks to months. Skip one and the number lies.'
    };
  } },
{ id:'transportation-choice-03', verb:'choice', part:4, tier:'independent', skill:'transportation',
  gen:(v)=>{
    const person=v.person();
    const six=v.int(480,780)*100, mo=Math.round(six/6);
    return {
      q:`${person}'s car insurance bills ${v.money(six/100)} every 6 months. What is the monthly insurance cost for the budget?`,
      choices:[
        {label:`${v.money(mo/100)}/month — ${v.money(six/100)} ÷ 6`, ok:true},
        {label:`${v.money(six/100)}/month — budget the bill as it arrives`, ok:false},
        {label:`$0/month — deal with it when the bill comes`, ok:false},
        {label:`${v.money(Math.round(six/12)/100)}/month — split across the whole year`, ok:false}
      ],
      hint:'The bill covers 6 months — divide by 6.',
      good:`Right: ${v.money(six/100)} ÷ 6 = ${v.money(mo/100)}/month set aside.`,
      bad:`${v.money(six/100)} every 6 months = ${v.money(six/100)} ÷ 6 = ${v.money(mo/100)} per month.`,
      why:'Big infrequent bills get sliced into monthly pieces — that\u2019s how a 6-month premium becomes a monthly line.'
    };
  } },
{ id:'transportation-choice-04', verb:'choice', part:4, tier:'independent', skill:'transportation',
  gen:(v)=>{
    const person=v.person();
    const yr=v.int(600,1200)*100, mo=Math.round(yr/12);
    return {
      q:`${person}'s mechanic says to expect about ${v.money(yr/100)}/year in maintenance (oil, brakes, tires). How much should ${person} set aside monthly?`,
      choices:[
        {label:`${v.money(mo/100)}/month — ${v.money(yr/100)} ÷ 12`, ok:true},
        {label:`$0/month — maintenance isn\u2019t a bill until something breaks`, ok:false},
        {label:`${v.money(yr/100)}/month — budget the whole year monthly to be safe`, ok:false},
        {label:`${v.money(Math.round(yr/6)/100)}/month — cars need work twice a year`, ok:false}
      ],
      hint:'Yearly estimate ÷ 12 months.',
      good:`Right: ${v.money(yr/100)} ÷ 12 = ${v.money(mo/100)}/month, so repairs never ambush the budget.`,
      bad:`${v.money(yr/100)} spread over 12 months = ${v.money(mo/100)}/month set aside.`,
      why:'Maintenance isn\u2019t "if" — it\u2019s "when." A monthly set-aside turns surprises into planned spending.'
    };
  } },
{ id:'transportation-choice-05', verb:'choice', part:4, tier:'independent', skill:'transportation',
  gen:(v)=>{
    const person=v.person();
    const pass=v.int(60,90)*100;
    const P=v.int(150,220)*100, I=v.int(70,110)*100, F=v.int(50,90)*100, M=v.int(25,50)*100;
    const car=P+I+F+M;
    return {
      q:`Monthly bus pass: ${v.money(pass/100)}. ${person}'s car would cost ${v.money(P/100)} payment + ${v.money(I/100)} insurance + ${v.money(F/100)} fuel + ${v.money(M/100)} maintenance. Which is cheaper per month?`,
      choices:[
        {label:`The bus — ${v.money(pass/100)} vs the car\u2019s ${v.money(car/100)} true monthly`, ok:true},
        {label:`The car — the ${v.money(P/100)} payment is close to the pass price`, ok:false, mis:'payment-is-total'},
        {label:`The car — fuel is the only real car cost`, ok:false, mis:'volatile-means-only'},
        {label:`They\u2019re equal — transportation is transportation`, ok:false}
      ],
      hint:'The car\u2019s price is four lines, not one.',
      good:`Right — the car truly costs ${v.money(car/100)}/month vs the ${v.money(pass/100)} pass.`,
      bad:`Car total: ${v.money(P/100)} + ${v.money(I/100)} + ${v.money(F/100)} + ${v.money(M/100)} = ${v.money(car/100)} vs pass ${v.money(pass/100)}.`,
      why:'Transit-vs-car only works on the car\u2019s full monthly bundle — the payment alone rigs the comparison.'
    };
  } },
{ id:'transportation-choice-06', verb:'choice', part:4, tier:'independent', skill:'transportation',
  gen:(v)=>{
    const person=v.person();
    const P=v.int(190,250)*100;
    return {
      q:`A dealer ad says "${v.money(P/100)}/month — drive it home today!" ${person} is deciding if the car fits the budget. What is wrong with deciding on this number alone?`,
      choices:[
        {label:`It\u2019s only the payment — insurance, fuel, and maintenance aren\u2019t in it`, ok:true},
        {label:`Nothing — the advertised payment is the full cost of a car`, ok:false, mis:'payment-is-total'},
        {label:`The payment is too low to be real — ads always lie upward`, ok:false},
        {label:`Nothing — fuel and insurance are free with new cars`, ok:false}
      ],
      hint:'What does the ad leave out?',
      good:`Right — the ad prices the loan, not the car. The real monthly is payment + insurance + fuel + maintenance.`,
      bad:`The ${v.money(P/100)} is one of four monthly lines. Budget all four before deciding.`,
      why:'Ads sell the payment because the payment is the smallest number — the budget needs the biggest one.'
    };
  } },
{ id:'transportation-choice-07', verb:'choice', part:4, tier:'independent', skill:'transportation',
  gen:(v)=>{
    const person=v.person();
    const F=v.int(70,110)*100, I=v.int(90,140)*100;
    return {
      q:`${person} compares two commute options by fuel cost only: driving (${v.money(F/100)}/month fuel) vs the bus (${v.money(45)}/month pass). "Driving wins," ${person} says — but the car also needs ${v.money(I/100)}/month insurance. What is the mistake?`,
      choices:[
        {label:`${person} priced only the most volatile cost — the full comparison needs insurance too`, ok:true},
        {label:`${person} is right — fuel is the only cost that matters`, ok:false, mis:'volatile-means-only'},
        {label:`${person} should compare only the payments instead`, ok:false, mis:'payment-is-total'},
        {label:`There is no mistake — ${v.money(F/100)} vs ${v.money(45)} is the whole story`, ok:false}
      ],
      hint:'Which costs did the comparison leave out?',
      good:`Right — driving truly costs ${v.money(F/100)} + ${v.money(I/100)} = ${v.money((F+I)/100)}/month vs the ${v.money(45)} pass.`,
      bad:`Add the missing line: ${v.money(F/100)} fuel + ${v.money(I/100)} insurance = ${v.money((F+I)/100)} vs bus ${v.money(45)}. Bus wins.`,
      why:'The most changeable cost isn\u2019t the only cost — fuel-only math hides the fixed lines that dominate.'
    };
  } },
{ id:'transportation-choice-08', verb:'choice', part:4, tier:'independent', skill:'transportation',
  gen:(v)=>{
    const person=v.person();
    const P=v.int(180,240)*100, I=v.int(80,120)*100, F=v.int(60,100)*100;
    const small=v.int(35,65)*100, total=P+I+F+small;
    return {
      q:`${person} budgets the car at ${v.money(P/100)} payment + ${v.money(I/100)} insurance + ${v.money(F/100)} fuel, calling parking, tolls, and registration (${v.money(small/100)}/month combined) "too small to matter." What is the true monthly?`,
      choices:[
        {label:`${v.money(total/100)} — the "small" ${v.money(small/100)} counts too`, ok:true},
        {label:`${v.money((P+I+F)/100)} — small costs really don\u2019t matter`, ok:false, mis:'small-costs-dont-matter'},
        {label:`${v.money(P/100)} — just the payment`, ok:false, mis:'payment-is-total'},
        {label:`${v.money(small/100)} — the small costs are the only real ones`, ok:false}
      ],
      hint:'"Too small to matter" × 12 months = ?',
      good:`Right: ${v.money(P/100)} + ${v.money(I/100)} + ${v.money(F/100)} + ${v.money(small/100)} = ${v.money(total/100)}.`,
      bad:`Add the dismissed line: ${v.money((P+I+F)/100)} + ${v.money(small/100)} = ${v.money(total/100)}/month.`,
      why:'Small recurring costs are exactly what break tight car budgets — ${v.money(small/100)}/month is $${((small*12)/100).toFixed(0)} a year.'
    };
  } },
{ id:'transportation-sort-01', verb:'sort', part:4, tier:'independent', skill:'transportation',
  gen:(v)=>({
    h:'Sort it: fixed or varies?',
    body:'<p>Sort each car cost by whether it\u2019s the same every month.</p>',
    buckets:['Fixed monthly','Varies'],
    items:[
      {label:'Car payment', a:'fixed monthly', why:'Same loan amount every month.'},
      {label:'Insurance premium', a:'fixed monthly', why:'Set rate for the policy term.'},
      {label:'Fuel', a:'varies', why:'Moves with miles driven and gas prices.'},
      {label:'Maintenance and repairs', a:'varies', why:'Some months zero, some months hundreds.'},
      {label:'Parking', a:'varies', why:'Depends where the month takes you.'},
      {label:'Tolls', a:'varies', why:'Route-dependent, never flat.'}
    ]
  }) },
{ id:'transportation-sort-02', verb:'sort', part:4, tier:'independent', skill:'transportation',
  gen:(v)=>({
    h:'Sort it: need or nice?',
    body:'<p>Sort each car expense: does it get you there reliably, or is it comfort?</p>',
    buckets:['Need (gets you there)','Nice (comfort)'],
    items:[
      {label:'Working brakes', a:'need (gets you there)', why:'Safety — non-negotiable.'},
      {label:'Liability insurance', a:'need (gets you there)', why:'Legally required to drive.'},
      {label:'Oil changes', a:'need (gets you there)', why:'Keeps the engine alive.'},
      {label:'Premium sound system', a:'nice (comfort)', why:'Music sounds fine on the stock speakers.'},
      {label:'Monthly detailing', a:'nice (comfort)', why:'Shine doesn\u2019t get you to work.'},
      {label:'Seat covers with racing stripes', a:'nice (comfort)', why:'Style, not transportation.'}
    ]
  }) },
{ id:'transportation-sort-03', verb:'sort', part:4, tier:'independent', skill:'transportation',
  gen:(v)=>({
    h:'Sort it: predictable or surprise?',
    body:'<p>Sort each cost by whether you can see it coming.</p>',
    buckets:['Predictable','Surprise'],
    items:[
      {label:'Car payment', a:'predictable', why:'Known amount, known date.'},
      {label:'Insurance', a:'predictable', why:'Set premium on a schedule.'},
      {label:'Fuel', a:'predictable', why:'Roughly trackable from driving habits.'},
      {label:'Blown transmission', a:'surprise', why:'No warning, huge bill.'},
      {label:'Tow after a breakdown', a:'surprise', why:'Unplanned by definition.'},
      {label:'Pothole tire blowout', a:'surprise', why:'Random road violence.'},
      {label:'Annual registration', a:'predictable', why:'Known fee, known month.'}
    ]
  }) },
{ id:'transportation-sort-04', verb:'sort', part:4, tier:'independent', skill:'transportation',
  gen:(v)=>({
    h:'Sort it: car cost or not?',
    body:'<p>Which of these belong in the transportation budget?</p>',
    buckets:['Car cost','Not a car cost'],
    items:[
      {label:'Fuel', a:'car cost', why:'The car drinks it.'},
      {label:'Insurance', a:'car cost', why:'Required to operate the car.'},
      {label:'Repairs', a:'car cost', why:'Keeping the car running.'},
      {label:'Parking fees', a:'car cost', why:'Storing the car costs money.'},
      {label:'Groceries', a:'not a car cost', why:'Food budget, not transport.'},
      {label:'Rent', a:'not a car cost', why:'Housing budget.'},
      {label:'Phone bill', a:'not a car cost', why:'Separate bill entirely.'}
    ]
  }) },
{ id:'transportation-sort-05', verb:'sort', part:4, tier:'independent', skill:'transportation',
  gen:(v)=>({
    h:'Sort it: every month or sometimes?',
    body:'<p>Sort each car cost by how often it hits.</p>',
    buckets:['Every month','Sometimes'],
    items:[
      {label:'Car payment', a:'every month', why:'Due monthly until the loan ends.'},
      {label:'Insurance', a:'every month', why:'Budgeted monthly even if billed by term.'},
      {label:'Fuel', a:'every month', why:'Driven monthly, fueled monthly.'},
      {label:'Registration renewal', a:'sometimes', why:'Once a year.'},
      {label:'New tires', a:'sometimes', why:'Every few years.'},
      {label:'Major repairs', a:'sometimes', why:'Irregular — that\u2019s why there\u2019s a set-aside.'}
    ]
  }) },
{ id:'transportation-sort-06', verb:'sort', part:4, tier:'independent', skill:'transportation',
  gen:(v)=>({
    h:'Sort it: monthly math or per-trip math?',
    body:'<p>Some options are priced per trip but must be judged per month. Sort by the right math.</p>',
    buckets:['Judge per month','Judge per trip'],
    items:[
      {label:'Monthly bus pass', a:'judge per month', why:'Flat monthly — compare monthly totals.'},
      {label:'Car ownership', a:'judge per month', why:'Four monthly lines — judge monthly.'},
      {label:'Daily rideshare habit', a:'judge per month', why:'"$12 a ride" × 40 rides is a monthly number.'},
      {label:'Single emergency taxi', a:'judge per trip', why:'One-off — per-trip price is the right lens.'},
      {label:'Airport shuttle, once a year', a:'judge per trip', why:'Rare and standalone.'},
      {label:'Borrowing a friend\u2019s car once', a:'judge per trip', why:'One-time favor, one-time math.'}
    ]
  }) },
{ id:'transportation-decide-01', verb:'decide', part:5, tier:'independent', skill:'transportation',
  gen:(v)=>{
    const person=v.person();
    const P=v.int(210,260)*100, I=v.int(95,130)*100, F=v.int(70,100)*100, M=v.int(30,50)*100;
    const car=P+I+F+M, pass=v.int(65,85)*100;
    return {
      q:`${person} is offered a used car: ${v.money(P/100)} payment + ${v.money(I/100)} insurance + ${v.money(F/100)} fuel + ${v.money(M/100)} maintenance = ${v.money(car/100)}/month. The bus pass is ${v.money(pass/100)}/month and the bus reaches work fine. What is the call?`,
      choices:[
        {label:`Keep the bus — ${v.money(pass/100)} vs the car\u2019s ${v.money(car/100)} true monthly`, ok:true},
        {label:`Take the car — the ${v.money(P/100)} payment is the cost to compare`, ok:false, mis:'payment-is-total'},
        {label:`Take the car — cars are always worth it no matter the math`, ok:false},
        {label:`Keep the bus — but only because buses are morally superior`, ok:false}
      ],
      hint:'The car\u2019s price is four lines.',
      good:`Bus wins by ${v.money((car-pass)/100)}/month — the car\u2019s true ${v.money(car/100)} never got close to the ${v.money(pass/100)} pass.`,
      bad:`Car total: ${v.money(P/100)} + ${v.money(I/100)} + ${v.money(F/100)} + ${v.money(M/100)} = ${v.money(car/100)} vs bus ${v.money(pass/100)}. The bus keeps more.`,
      why:'When transit reaches the destination, the car must beat it on full monthly cost — payment-only comparisons rig the race.'
    };
  } },
{ id:'transportation-decide-02', verb:'decide', part:5, tier:'independent', skill:'transportation',
  gen:(v)=>{
    const person=v.person();
    const full=v.int(120,150)*100, liab=v.int(60,85)*100;
    const save=v.int((full-liab)/100,(full-liab)/100+20)*100;
    return {
      q:`Full coverage costs ${v.money(full/100)}/month; liability-only costs ${v.money(liab/100)}/month. ${person}'s car is worth little, but savings are thin. What is the call?`,
      choices:[
        {label:`Liability-only — saves ~${v.money(save/100)}/month on a low-value car, and full coverage can\u2019t be afforded anyway`, ok:true},
        {label:`Full coverage — more insurance is always better regardless of cost`, ok:false},
        {label:`No insurance — the car\u2019s barely worth anything`, ok:false},
        {label:`Liability-only — and spend the savings on upgrades`, ok:false}
      ],
      hint:'Match the coverage to the car\u2019s value and the budget\u2019s reality.',
      good:`Liability-only fits: the car\u2019s low value doesn\u2019t justify full coverage, and ~${v.money(save/100)}/month stays in the budget.`,
      bad:`Full coverage on a low-value car with a thin budget means paying ${v.money(full/100)}/month to protect little. Liability-only matches the situation.`,
      why:'Insurance should fit the asset and the budget — over-insuring a cheap car starves everything else.'
    };
  } },
{ id:'transportation-decide-03', verb:'decide', part:5, tier:'independent', skill:'transportation',
  gen:(v)=>{
    const person=v.person();
    const rep=v.int(700,950)*100, val=v.int(2500,4000)*100;
    return {
      q:`${person}'s old car needs a ${v.money(rep/100)} repair. The car is otherwise sound and worth about ${v.money(val/100)}. A replacement would mean a fresh car payment. What is the call?`,
      choices:[
        {label:`Repair it — ${v.money(rep/100)} once beats a new monthly payment for years`, ok:true},
        {label:`Replace it — old cars should never be repaired`, ok:false},
        {label:`Junk it and go carless with no backup plan`, ok:false},
        {label:`Repair it — and also buy a second car as backup`, ok:false}
      ],
      hint:'Compare one repair against years of payments.',
      good:`Repair wins: ${v.money(rep/100)} once vs a new payment every month for years on a car worth ${v.money(val/100)}.`,
      bad:`A ${v.money(rep/100)} repair on a sound ${v.money(val/100)} car is cheap compared to restarting loan payments. Fix it.`,
      why:'Repair-vs-replace is total-cost thinking: one bill against a whole new loan.'
    };
  } },
{ id:'transportation-decide-04', verb:'decide', part:5, tier:'independent', skill:'transportation',
  gen:(v)=>{
    const person=v.person();
    const save=v.int(8,15)*100, gal=v.int(10,14);
    const tripCost=v.int(3,6)*100;
    const net=save-tripCost;
    return {
      q:`Station B is cheaper by ${v.money(save/100)} per fill-up (${gal} gallons), but it\u2019s a 20-minute detour costing ~${v.money(tripCost/100)} in fuel. Worth the drive?`,
      choices: net>0 ? [
        {label:`Yes — nets about ${v.money(net/100)} per trip after the detour fuel`, ok:true},
        {label:`No — cheaper gas is always a trap`, ok:false},
        {label:`Yes — the sticker saving is all that matters`, ok:false},
        {label:`No — detours are illegal`, ok:false}
      ] : [
        {label:`No — the detour eats the saving (nets about ${v.money(net/100)})`, ok:true},
        {label:`Yes — cheaper gas always wins`, ok:false},
        {label:`No — cheaper gas is always a trap`, ok:false},
        {label:`Yes — the sticker saving is all that matters`, ok:false}
      ],
      hint:'Saving minus detour cost = the real answer.',
      good: net>0 ? `Worth it: ${v.money(save/100)} − ${v.money(tripCost/100)} = ${v.money(net/100)} net saved per trip.` : `Skip it: ${v.money(save/100)} − ${v.money(tripCost/100)} = ${v.money(net/100)} — the "saving" costs money.`,
      bad:`Net math: ${v.money(save/100)} saved − ${v.money(tripCost/100)} detour fuel = ${v.money(net/100)}. Decide on the net.`,
      why:'"Cheaper gas" is only cheaper after the drive there is priced in — net savings decide, not sticker savings.'
    };
  } },
{ id:'transportation-decide-05', verb:'decide', part:5, tier:'independent', skill:'transportation',
  gen:(v)=>{
    const person=v.person();
    const ride=v.int(11,15)*100, days=20, mo=ride*days, pass=v.int(65,90)*100;
    return {
      q:`Rideshare to work costs ~${v.money(ride/100)}/ride, ${days} workdays a month = ${v.money(mo/100)}/month. The bus pass is ${v.money(pass/100)}/month on a decent route. What is the call?`,
      choices:[
        {label:`Take the bus — ${v.money(pass/100)} vs ${v.money(mo/100)} in rideshares`, ok:true},
        {label:`Rideshare daily — $${(ride/100).toFixed(0)} a ride sounds cheap`, ok:false},
        {label:`Rideshare daily — the bus is for other people`, ok:false},
        {label:`Take the bus — and also rideshare for fun`, ok:false}
      ],
      hint:'Per-ride × 20 workdays.',
      good:`Bus wins by ${v.money((mo-pass)/100)}/month — "$${(ride/100).toFixed(0)} a ride" was a ${v.money(mo/100)} habit in disguise.`,
      bad:`Rideshare math: ${v.money(ride/100)} × ${days} = ${v.money(mo/100)}/month vs bus ${v.money(pass/100)}. The bus keeps ${v.money((mo-pass)/100)}.`,
      why:'Per-trip prices hide monthly totals — multiply by the routine before calling anything "cheap."'
    };
  } },
{ id:'transportation-decide-06', verb:'decide', part:5, tier:'independent', skill:'transportation',
  gen:(v)=>{
    const person=v.person();
    const tires=v.int(400,600)*100;
    return {
      q:`${person}'s tires are bald. New ones cost ${v.money(tires/100)}. Money is tight and ${person} is tempted to "get a few more months" out of them. What is the call?`,
      choices:[
        {label:`Buy the tires now — bald tires risk a crash that costs far more than ${v.money(tires/100)}`, ok:true},
        {label:`Wait — tires are a comfort item, not safety`, ok:false},
        {label:`Wait — a blowout is just bad luck, not a decision`, ok:false},
        {label:`Buy the tires — and the premium rims to match`, ok:false}
      ],
      hint:'What does a blowout at speed cost?',
      good:`Tires now: ${v.money(tires/100)} scheduled beats a crash, a tow, and a repair bill — safety items don\u2019t wait.`,
      bad:`Bald tires + highway speed = blowout risk. ${v.money(tires/100)} planned beats thousands unplanned.`,
      why:'Safety maintenance is never the place to economize — the downside isn\u2019t money, it\u2019s metal.'
    };
  } },
{ id:'transportation-decide-07', verb:'decide', part:5, tier:'independent', skill:'transportation',
  gen:(v)=>{
    const person=v.person();
    const solo=v.int(90,130)*100, share=v.int(30,50)*100;
    return {
      q:`A coworker offers a carpool: ${person} pays ${v.money(share/100)}/month toward gas instead of driving solo at ~${v.money(solo/100)}/month in fuel. Schedules match. What is the call?`,
      choices:[
        {label:`Carpool — saves ~${v.money((solo-share)/100)}/month with zero downside on a matching schedule`, ok:true},
        {label:`Drive solo — carpools are for people who can\u2019t afford cars`, ok:false},
        {label:`Carpool — and stop paying entirely after the first month`, ok:false},
        {label:`Drive solo — the fuel difference is pocket change`, ok:false, mis:'small-costs-dont-matter'}
      ],
      hint:'Monthly vs monthly.',
      good:`Carpool wins: ${v.money(solo/100)} − ${v.money(share/100)} = ~${v.money((solo-share)/100)}/month saved.`,
      bad:`Solo fuel ~${v.money(solo/100)}/month vs carpool ${v.money(share/100)}. Same commute, ${v.money((solo-share)/100)} cheaper.`,
      why:'When schedules align, carpooling is free money — the commute happens either way.'
    };
  } },
{ id:'transportation-decide-08', verb:'decide', part:5, tier:'independent', skill:'transportation',
  gen:(v)=>{
    const person=v.person();
    const lease=v.int(280,330)*100, buyP=v.int(190,230)*100, buyI=v.int(85,115)*100, buyF=v.int(60,90)*100, buyM=v.int(30,50)*100;
    const buyT=buyP+buyI+buyF+buyM, leaseT=lease+buyI+buyF+buyM;
    return {
      q:`Lease: ${v.money(lease/100)}/month for 3 years, then nothing to show. Buy used: ${v.money(buyP/100)} payment + ${v.money(buyI/100)} insurance + ${v.money(buyF/100)} fuel + ${v.money(buyM/100)} maintenance = ${v.money(buyT/100)}/month, and the car is yours after the loan. Which costs less monthly?`,
      choices: buyT<leaseT ? [
        {label:`Buy used — ${v.money(buyT/100)}/month and ownership at the end vs lease ${v.money(leaseT/100)}`, ok:true},
        {label:`Lease — the lower payment line always wins`, ok:false, mis:'payment-is-total'},
        {label:`Lease — new cars never need maintenance`, ok:false},
        {label:`Buy — any used car is automatically a deal`, ok:false}
      ] : [
        {label:`Lease — ${v.money(leaseT/100)}/month all-in beats buying\u2019s ${v.money(buyT/100)}`, ok:true},
        {label:`Buy — ownership always wins regardless of price`, ok:false},
        {label:`Lease — the lower payment line always wins`, ok:false, mis:'payment-is-total'},
        {label:`Buy — any used car is automatically a deal`, ok:false}
      ],
      hint:'Monthly total vs monthly total — then ask what\u2019s left at the end.',
      good: buyT<leaseT ? `Buy wins: ${v.money(buyT/100)}/month AND a car at the end vs ${v.money(leaseT/100)}/month for three years of renting.` : `Lease wins here: ${v.money(leaseT/100)}/month vs buying\u2019s ${v.money(buyT/100)} — price the actual numbers, not the theory.`,
      bad:`Lease total: ${v.money(lease/100)} + ${v.money(buyI/100)} + ${v.money(buyF/100)} + ${v.money(buyM/100)} = ${v.money(leaseT/100)}. Buy total: ${v.money(buyT/100)}. Compare, then consider ownership.`,
      why:'Lease-vs-buy is monthly-total math plus an endgame question: after the last payment, who owns what?'
    };
  } },
{ id:'transportation-spot-01', verb:'spot', part:5, tier:'independent', skill:'transportation',
  gen:(v)=>{
    const person=v.person();
    const P=v.int(220,280)*100, I=v.int(100,140)*100, F=v.int(80,120)*100;
    return {
      scenario:`<p>${person}\u2019s car budget:</p><ul><li>Car payment: ${v.money(P/100)}</li><li>Insurance: $0 — "I\u2019ll add it later"</li><li>Fuel: $0 — "I\u2019ll track it later"</li><li>Total budgeted: ${v.money(P/100)}</li></ul>`,
      q:'What is the mistake here?',
      choices:[
        {label:`${person} budgeted the payment and called it the car — insurance and fuel are missing`, ok:true},
        {label:`${person} over-budgeted — the payment covers everything`, ok:false, mis:'payment-is-total'},
        {label:`The mistake is budgeting at all — cars budget themselves`, ok:false},
        {label:`There is no mistake — "later" is a valid budget category`, ok:false}
      ],
      hint:'Count the car\u2019s real monthly lines. How many are budgeted?',
      good:`Right — a car has (at least) four monthly lines; ${person} funded one.`,
      bad:`Missing: ~${v.money(I/100)} insurance + ~${v.money(F/100)} fuel every month. "Later" arrives as a shortfall.`,
      why:'Payment-only budgeting is how cars surprise people — the other lines bill whether they\u2019re budgeted or not.'
    };
  } },
{ id:'transportation-spot-02', verb:'spot', part:5, tier:'independent', skill:'transportation',
  gen:(v)=>{
    const person=v.person();
    const F=v.int(75,105)*100, I=v.int(95,135)*100;
    return {
      scenario:`<p>${person} chose driving over the bus "because fuel is only ${v.money(F/100)} and the pass is $${55}."</p><ul><li>Compared: fuel ${v.money(F/100)} vs pass $55</li><li>Ignored: insurance ${v.money(I/100)}/month, maintenance, parking</li></ul>`,
      q:'What is the mistake here?',
      choices:[
        {label:`${person} compared only the most volatile cost — driving truly costs ${v.money(F/100)} + ${v.money(I/100)} + more`, ok:true},
        {label:`${person} is right — fuel is the only real driving cost`, ok:false, mis:'volatile-means-only'},
        {label:`${person} should have compared only the car payment`, ok:false, mis:'payment-is-total'},
        {label:`There is no mistake — $55 passes are overpriced`, ok:false}
      ],
      hint:'Fuel is one line. How many lines does driving have?',
      good:`Right — driving\u2019s real monthly is ${v.money((F+I)/100)}+ before maintenance and parking. The bus wins.`,
      bad:`Full driving cost: ${v.money(F/100)} fuel + ${v.money(I/100)} insurance + maintenance + parking vs $55 pass. Fuel-only math rigged it.`,
      why:'Comparing on the jumpiest cost alone hides the steady lines — and the steady lines usually dominate.'
    };
  } },
{ id:'transportation-spot-03', verb:'spot', part:5, tier:'independent', skill:'transportation',
  gen:(v)=>{
    const person=v.person();
    const P=v.int(200,260)*100, I=v.int(90,130)*100;
    return {
      scenario:`<p>${person} bought the car, then discovered insurance costs ${v.money(I/100)}/month — never budgeted.</p><ul><li>Planned: payment ${v.money(P/100)}</li><li>Surprise: insurance ${v.money(I/100)}/month, due immediately</li><li>${person}: "Nobody told me about this."</li></ul>`,
      q:'What is the mistake here?',
      choices:[
        {label:`${person} priced the car without its mandatory second line — insurance was always part of the cost`, ok:true},
        {label:`The dealer\u2019s fault — buyers can\u2019t be expected to know`, ok:false},
        {label:`Insurance is optional — ${person} can skip it`, ok:false},
        {label:`There is no mistake — surprises are unavoidable`, ok:false}
      ],
      hint:'Was insurance ever actually optional?',
      good:`Right — insurance is a known, mandatory, quotable cost. It belonged in the pre-purchase math.`,
      bad:`A 5-minute quote before buying would have revealed ${v.money(I/100)}/month. "Nobody told me" means nobody was asked.`,
      why:'Every car has the same cost anatomy — the buyer\u2019s job is to price all of it before signing.'
    };
  } },
{ id:'transportation-spot-04', verb:'spot', part:6, tier:'independent', skill:'transportation',
  gen:(v)=>{
    const person=v.person();
    const save=v.int(4,7)*100, gal=v.int(12,15), trip=v.int(5,9)*100;
    const net=save-trip;
    return {
      scenario:`<p>${person} drives 25 minutes each way to the "cheap" gas station.</p><ul><li>Saved per fill-up: ${v.money(save/100)} (${gal} gallons)</li><li>Extra fuel burned on the detour: ~${v.money(trip/100)}</li><li>${person}\u2019s claim: "I save ${v.money(save/100)} every time!"</li></ul>`,
      q:'What is the mistake here?',
      choices:[
        {label:`${person} counted the saving but not the detour — net is about ${v.money(net/100)}, not ${v.money(save/100)}`, ok:true},
        {label:`${person} is right — ${v.money(save/100)} saved is ${v.money(save/100)} saved`, ok:false},
        {label:`The mistake is buying ${gal} gallons — smaller fill-ups save more`, ok:false},
        {label:`There is no mistake — time has no value`, ok:false}
      ],
      hint:'Subtract the detour fuel from the "saving."',
      good:`Right — ${v.money(save/100)} − ${v.money(trip/100)} = ${v.money(net/100)} net. The claim was gross, not net.`,
      bad:`Net saving: ${v.money(save/100)} − ${v.money(trip/100)} detour = ${v.money(net/100)}. Plus 50 minutes of driving.`,
      why:'"Cheaper gas" claims are gross figures — the detour is a cost, and net is the only honest number.'
    };
  } },
{ id:'transportation-spot-05', verb:'spot', part:6, tier:'independent', skill:'transportation',
  gen:(v)=>{
    const person=v.person();
    const ride=v.int(12,16)*100, days=22, mo=ride*days;
    return {
      scenario:`<p>${person} rideshares to work daily: "It\u2019s only $${(ride/100).toFixed(0)} a ride."</p><ul><li>Per ride: ${v.money(ride/100)}</li><li>Rides/month: ~${days}</li><li>Monthly total: ${v.money(mo/100)} — never calculated</li><li>Bus pass alternative: $${70}/month</li></ul>`,
      q:'What is the mistake here?',
      choices:[
        {label:`${person} never multiplied — "$${(ride/100).toFixed(0)} a ride" is a ${v.money(mo/100)}/month habit`, ok:true},
        {label:`${person} is right — per-ride price is the only honest metric`, ok:false},
        {label:`The mistake is not tipping more`, ok:false},
        {label:`There is no mistake — rideshares are always worth it`, ok:false}
      ],
      hint:'Per-ride × rides per month.',
      good:`Right — ${v.money(ride/100)} × ${days} = ${v.money(mo/100)}/month vs a $70 pass. The "only" was doing heavy lifting.`,
      bad:`Monthly: ${v.money(ride/100)} × ${days} rides = ${v.money(mo/100)}. That\u2019s the number to compare with the $70 pass.`,
      why:'Small per-unit prices are monthly totals wearing a disguise — multiply by the routine to unmask them.'
    };
  } },
{ id:'transportation-spot-06', verb:'spot', part:6, tier:'independent', skill:'transportation',
  gen:(v)=>{
    const person=v.person();
    const oil=v.int(40,70)*100, engine=v.int(2500,4500)*100;
    return {
      scenario:`<p>${person} skipped oil changes for a year to "save" ~${v.money(oil/100)}.</p><ul><li>Saved: ~${v.money(oil/100)}</li><li>Result: seized engine — repair estimate ${v.money(engine/100)}</li><li>${person}: "Cars are money pits."</li></ul>`,
      q:'What is the mistake here?',
      choices:[
        {label:`${person} saved ${v.money(oil/100)} to spend ${v.money(engine/100)} — skipped maintenance compounds`, ok:true},
        {label:`${person} was right — oil changes are a scam`, ok:false},
        {label:`The mistake is owning a car at all`, ok:false},
        {label:`There is no mistake — engines seize randomly`, ok:false}
      ],
      hint:'Compare the "saving" to the bill.',
      good:`Right — ${v.money(oil/100)} of skipped maintenance bought a ${v.money(engine/100)} engine. That\u2019s not a money pit; that\u2019s cause and effect.`,
      bad:`Skipped: ~${v.money(oil/100)}. Bill: ${v.money(engine/100)}. Maintenance is the cheapest repair there is.`,
      why:'Deferred maintenance doesn\u2019t disappear — it accrues interest in the form of bigger failures.'
    };
  } },
{ id:'transportation-compare-01', verb:'compare', part:5, tier:'independent', skill:'transportation',
  gen:(v)=>{
    const person=v.person();
    const pA=v.int(180,220)*100, iA=v.int(85,110)*100, fA=v.int(60,90)*100, mA=v.int(25,45)*100;
    const pB=v.int(140,170)*100, iB=v.int(110,140)*100, fB=v.int(90,120)*100, mB=v.int(40,60)*100;
    const tA=pA+iA+fA+mA, tB=pB+iB+fB+mB;
    return {
      context:`<p><b>Car A:</b> ${v.money(pA/100)} payment + ${v.money(iA/100)} insurance + ${v.money(fA/100)} fuel + ${v.money(mA/100)} maintenance = ${v.money(tA/100)}/month.</p><p><b>Car B:</b> ${v.money(pB/100)} payment + ${v.money(iB/100)} insurance + ${v.money(fB/100)} fuel + ${v.money(mB/100)} maintenance = ${v.money(tB/100)}/month.</p>`,
      q:'Which car costs less per month, all lines counted?',
      choices: tA<tB ? [
        {label:`Car A — ${v.money(tA/100)}/month vs ${v.money(tB/100)}`, ok:true},
        {label:`Car B — the ${v.money(pB/100)} payment is lower`, ok:false, mis:'payment-is-total'},
        {label:`Car B — cheaper payment always means cheaper car`, ok:false},
        {label:`They\u2019re equal — cars cost what cars cost`, ok:false}
      ] : [
        {label:`Car B — ${v.money(tB/100)}/month vs ${v.money(tA/100)}`, ok:true},
        {label:`Car A — the ${v.money(pA/100)} payment is lower`, ok:false, mis:'payment-is-total'},
        {label:`Car A — cheaper payment always means cheaper car`, ok:false},
        {label:`They\u2019re equal — cars cost what cars cost`, ok:false}
      ],
      hint:'Total vs total — all four lines each.',
      good: tA<tB ? `Right — A\u2019s ${v.money(tA/100)} beats B\u2019s ${v.money(tB/100)} despite the payment gap.` : `Right — B\u2019s ${v.money(tB/100)} beats A\u2019s ${v.money(tA/100)} despite the higher payment.`,
      bad:`A totals ${v.money(tA/100)}; B totals ${v.money(tB/100)}. The payment line alone would have picked wrong.`,
      why:'Cars compete on four-line totals — the cheapest payment frequently loses the real race.'
    };
  } },
{ id:'transportation-compare-02', verb:'compare', part:5, tier:'independent', skill:'transportation',
  gen:(v)=>{
    const person=v.person();
    const pass=v.int(70,95)*100;
    const P=v.int(160,200)*100, I=v.int(75,105)*100, F=v.int(55,85)*100, M=v.int(30,50)*100;
    const car=P+I+F+M;
    return {
      context:`<p><b>Option A:</b> bus pass ${v.money(pass/100)}/month — route reaches work in 35 minutes.</p><p><b>Option B:</b> drive — ${v.money(P/100)} payment + ${v.money(I/100)} insurance + ${v.money(F/100)} fuel + ${v.money(M/100)} maintenance = ${v.money(car/100)}/month.</p>`,
      q:`${person} values the 20 minutes driving would save daily. On pure monthly cost, which wins?`,
      choices:[
        {label:`The bus — ${v.money(pass/100)} vs driving\u2019s ${v.money(car/100)}`, ok:true},
        {label:`Driving — the ${v.money(P/100)} payment is barely more than the pass`, ok:false, mis:'payment-is-total'},
        {label:`Driving — time saved is worth any price`, ok:false},
        {label:`They\u2019re equal once you count the bus wait time`, ok:false}
      ],
      hint:'Cost question first — time value is separate.',
      good:`Right — on dollars alone, the bus saves ${v.money((car-pass)/100)}/month. (Whether 20 min/day is worth that is a values call.)`,
      bad:`Driving\u2019s true monthly: ${v.money(car/100)} vs bus ${v.money(pass/100)}. Dollars say bus.`,
      why:'Separate the questions: dollars first (bus wins big), then decide what your time is worth — don\u2019t blend them.'
    };
  } },
{ id:'transportation-compare-03', verb:'compare', part:5, tier:'independent', skill:'transportation',
  gen:(v)=>{
    const person=v.person();
    const ride=v.int(9,13)*100, days=22, mo=ride*2*days, pass=v.int(60,85)*100;
    return {
      context:`<p><b>Option A:</b> rideshare both ways — ${v.money(ride/100)} × 2 × ${days} days = ${v.money(mo/100)}/month.</p><p><b>Option B:</b> bus pass ${v.money(pass/100)}/month.</p>`,
      q:'Which costs less for the month\u2019s commute?',
      choices:[
        {label:`The bus — ${v.money(pass/100)} vs ${v.money(mo/100)} in rideshares`, ok:true},
        {label:`Rideshare — $${(ride/100).toFixed(0)} a ride is pocket change`, ok:false},
        {label:`Rideshare — door-to-door is priceless`, ok:false},
        {label:`They\u2019re equal — commuting costs what it costs`, ok:false}
      ],
      hint:'Round trips × workdays.',
      good:`Right — the bus saves ${v.money((mo-pass)/100)}/month over daily rideshares.`,
      bad:`Rideshare: ${v.money(ride/100)} × 2 × ${days} = ${v.money(mo/100)}/month vs bus ${v.money(pass/100)}.`,
      why:'Twice-daily habits multiply brutally — per-ride thinking hides a second car payment.'
    };
  } },
{ id:'transportation-compare-04', verb:'compare', part:6, tier:'independent', skill:'transportation',
  gen:(v)=>{
    const person=v.person();
    const rep=v.int(900,1400)*100, fuelO=v.int(110,150)*100;
    const payN=v.int(220,280)*100, insN=v.int(100,140)*100, fuelN=v.int(70,100)*100, mN=v.int(20,40)*100;
    const yrOld=rep+fuelO*12, yrNew=(payN+insN+fuelN+mN)*12;
    return {
      context:`<p><b>Keep old car:</b> ${v.money(rep/100)} in repairs this year + ${v.money(fuelO/100)}/month fuel = ${v.money(yrOld/100)}/year.</p><p><b>Buy newer:</b> ${v.money(payN/100)} payment + ${v.money(insN/100)} insurance + ${v.money(fuelN/100)} fuel + ${v.money(mN/100)} maintenance = ${v.money(yrNew/100)}/year.</p>`,
      q:'Which costs less over the next 12 months?',
      choices: yrOld<yrNew ? [
        {label:`Keep the old car — ${v.money(yrOld/100)} for the year vs ${v.money(yrNew/100)}`, ok:true},
        {label:`Buy newer — new cars are always cheaper to run`, ok:false},
        {label:`Keep the old car — repairs build character`, ok:false},
        {label:`They\u2019re equal — car math always ties`, ok:false}
      ] : [
        {label:`Buy newer — ${v.money(yrNew/100)} for the year vs ${v.money(yrOld/100)}`, ok:true},
        {label:`Keep the old car — the devil you know is cheaper`, ok:false},
        {label:`Buy newer — new cars never need repairs`, ok:false},
        {label:`They\u2019re equal — car math always ties`, ok:false}
      ],
      hint:'Yearly vs yearly — repairs + fuel vs the full new bundle.',
      good: yrOld<yrNew ? `Right — one repair year (${v.money(yrOld/100)}) beats a full year of new-car payments (${v.money(yrNew/100)}).` : `Right — the repair bill (${v.money(yrOld/100)}) exceeds a year of the newer car\u2019s total (${v.money(yrNew/100)}). Time to upgrade.`,
      bad:`Old: ${v.money(rep/100)} + 12 × ${v.money(fuelO/100)} = ${v.money(yrOld/100)}. New: 12 × ${v.money((payN+insN+fuelN+mN)/100)} = ${v.money(yrNew/100)}.`,
      why:'Repair-vs-replace is a 12-month race — price both lanes fully before choosing.'
    };
  } },
{ id:'transportation-compare-05', verb:'compare', part:6, tier:'independent', skill:'transportation',
  gen:(v)=>{
    const person=v.person();
    const full=v.int(125,155)*100, liab=v.int(65,90)*100;
    const yrF=full*12, yrL=liab*12;
    return {
      context:`<p><b>Option A:</b> full coverage ${v.money(full/100)}/month → ${v.money(yrF/100)}/year.</p><p><b>Option B:</b> liability-only ${v.money(liab/100)}/month → ${v.money(yrL/100)}/year (car\u2019s value is low).</p>`,
      q:'On pure premium cost, which is cheaper for the year — and what\u2019s the tradeoff?',
      choices:[
        {label:`B by ${v.money((yrF-yrL)/100)}/year — tradeoff: no payout if your own car is wrecked`, ok:true},
        {label:`A — more coverage is always cheaper overall`, ok:false},
        {label:`B — and there\u2019s no tradeoff at all`, ok:false},
        {label:`They\u2019re equal — insurance is insurance`, ok:false}
      ],
      hint:'Yearly gap first, then name what\u2019s given up.',
      good:`Right — B saves ${v.money((yrF-yrL)/100)}/year but leaves your own car uncovered. On a low-value car, that\u2019s usually the right trade.`,
      bad:`Gap: ${v.money(yrF/100)} − ${v.money(yrL/100)} = ${v.money((yrF-yrL)/100)}/year. The tradeoff is coverage on your own car.`,
      why:'Insurance comparisons need both columns: dollars saved AND protection dropped.'
    };
  } },
{ id:'transportation-compare-06', verb:'compare', part:6, tier:'independent', skill:'transportation',
  gen:(v)=>{
    const person=v.person();
    const pA=Math.round(v.cents(3.00,3.30)*100), pB=Math.round(v.cents(2.75,2.95)*100);
    const gal=v.int(11,14), save=(pA-pB)*gal, trip=v.int(250,450);
    const net=save-trip;
    return {
      context:`<p><b>Station A:</b> ${v.money(pA/100)}/gal on the normal route — fill-up ${v.money((pA*gal)/100)}.</p><p><b>Station B:</b> ${v.money(pB/100)}/gal, 15-min detour — fill-up ${v.money((pB*gal)/100)}, detour fuel ~${v.money(trip/100)}.</p>`,
      q:`${person} needs ${gal} gallons. Which station is truly cheaper?`,
      choices: net>0 ? [
        {label:`Station B — nets ${v.money(net/100)} after the ${v.money(trip/100)} detour`, ok:true},
        {label:`Station A — detours always erase savings`, ok:false},
        {label:`Station B — the per-gallon price is all that matters`, ok:false},
        {label:`Station A — higher prices mean better gas`, ok:false}
      ] : [
        {label:`Station A — B\u2019s "saving" nets ${v.money(net/100)} after the detour`, ok:true},
        {label:`Station B — cheaper per gallon always wins`, ok:false},
        {label:`Station A — detours always erase savings`, ok:false},
        {label:`Station B — the per-gallon price is all that matters`, ok:false}
      ],
      hint:'Gross saving minus detour fuel = net.',
      bad:`Net math: ${v.money(save/100)} saved \u2212 ${v.money(trip/100)} detour = ${v.money(net/100)}. Gross savings don\u2019t decide — net does.`,
      good: net>0 ? `Right — ${v.money(save/100)} saved − ${v.money(trip/100)} detour = ${v.money(net/100)} net. B wins.` : `Right — ${v.money(save/100)} − ${v.money(trip/100)} = ${v.money(net/100)}. The "deal" costs money.`,
      why:'Gas-station math is net math — the pump price minus the price of getting there.'
    };
  } },
{ id:'transportation-predict-01', verb:'predict', part:6, tier:'independent', skill:'transportation',
  gen:(v)=>{
    const person=v.person();
    const P=v.int(230,290)*100, extra=v.int(150,220)*100;
    return {
      q:`${person} buys a car because the ${v.money(P/100)}/month payment "fits" — never pricing insurance, fuel, or maintenance. What breaks first?`,
      choices:[
        {label:`The budget — ~${v.money(extra/100)}/month of unpriced costs hits from month one`, ok:true},
        {label:`Nothing — payments are the only real car cost`, ok:false, mis:'payment-is-total'},
        {label:`The car — it senses financial ignorance and breaks down`, ok:false},
        {label:`Nothing — the dealer covers the other costs for a year`, ok:false}
      ],
      hint:'Three more monthly lines were never budgeted.',
      good:`Right — insurance + fuel + maintenance (~${v.money(extra/100)}/month) bill from day one, budgeted or not.`,
      bad:`The payment was one of four lines. The other three total ~${v.money(extra/100)}/month — and they don\u2019t wait for permission.`,
      why:'Payment-only math buys the car and breaks the budget — the surprise isn\u2019t the costs, it\u2019s that they were knowable.'
    };
  } },
{ id:'transportation-predict-02', verb:'predict', part:6, tier:'independent', skill:'transportation',
  gen:(v)=>{
    const person=v.person();
    return {
      q:`${person} skips every oil change for 18 months to "save money." What is the most likely consequence?`,
      choices:[
        {label:`Accelerated engine wear leading to a repair bill dwarfing every skipped oil change`, ok:true},
        {label:`Nothing — modern engines don\u2019t need oil changes`, ok:false},
        {label:`Better fuel economy — old oil is more efficient`, ok:false},
        {label:`The car automatically schedules its own maintenance`, ok:false}
      ],
      hint:'What does oil do inside an engine?',
      good:`Right — oil is the engine\u2019s blood. Starve it long enough and the engine dies expensively.`,
      bad:`Skipped oil changes don\u2019t save — they convert $50 maintenance into $3,000+ engine damage.`,
      why:'Cheap prevention vs catastrophic cure: maintenance is the highest-ROI money a car owner spends.'
    };
  } },
{ id:'transportation-predict-03', verb:'predict', part:6, tier:'independent', skill:'transportation',
  gen:(v)=>{
    const person=v.person();
    const dmg=v.int(1800,3200)*100;
    return {
      q:`${person} carries liability-only insurance and has no emergency fund. A fender bender totals ${person}'s own car (${v.money(dmg/100)} in damage, other driver fine). What happens?`,
      choices:[
        {label:`${person} absorbs the full ${v.money(dmg/100)} — liability covers the other driver, not your car`, ok:true},
        {label:`The insurance pays for ${person}'s car anyway — that\u2019s what insurance is for`, ok:false},
        {label:`The other driver\u2019s insurance fixes ${person}'s car automatically`, ok:false},
        {label:`The repair shop bills the insurance company directly`, ok:false}
      ],
      hint:'Liability = your liability TO OTHERS.',
      good:`Right — liability-only means your car, your bill: ${v.money(dmg/100)} out of pocket with no fund to catch it.`,
      bad:`Liability covers damage YOU cause to OTHERS. Your own ${v.money(dmg/100)} repair is yours alone.`,
      why:'Coverage names matter: "liability-only" is a precise description of what isn\u2019t covered — your car.'
    };
  } },
{ id:'transportation-predict-04', verb:'predict', part:6, tier:'independent', skill:'transportation',
  gen:(v)=>{
    const person=v.person();
    const ride=v.int(12,16)*100, sem=ride*2*22*4;
    return {
      q:`${person} rideshares to campus daily "just this semester" at ~${v.money(ride/100)} each way. What does the semester actually cost?`,
      choices:[
        {label:`Around ${v.money(sem/100)} — a per-ride habit compounding into a car-payment-sized bill`, ok:true},
        {label:`About ${v.money(ride/100)} — it\u2019s just one ride at a time`, ok:false},
        {label:`Nothing extra — semesters don\u2019t count in budgets`, ok:false},
        {label:`The rideshare company caps semester spending`, ok:false}
      ],
      hint:'Per ride × 2 × days × 4 months.',
      good:`Right — ${v.money(ride/100)} × 2 × ~88 days ≈ ${v.money(sem/100)}. "Just this semester" is a full budget line.`,
      bad:`Daily rideshares for a semester: ${v.money(ride/100)} × 2 × 22 days × 4 months ≈ ${v.money(sem/100)}.`,
      why:'Temporary habits still spend real money — "just this semester" needs the semester math.'
    };
  } },
{ id:'transportation-predict-05', verb:'predict', part:6, tier:'independent', skill:'transportation',
  gen:(v)=>{
    const person=v.person();
    return {
      q:`${person}'s check-engine light has been on for two months. "It still drives fine." What is the most likely consequence of ignoring it?`,
      choices:[
        {label:`A small fixable issue grows into a major repair — the light was the cheap warning`, ok:true},
        {label:`The light burns out and the problem fixes itself`, ok:false},
        {label:`Nothing — check-engine lights are decorative`, ok:false},
        {label:`The car gets faster to compensate`, ok:false}
      ],
      hint:'Warning lights are priced by what they prevent.',
      good:`Right — the light is the $100 version of the problem. Ignored, it becomes the $1,500 version.`,
      bad:`Two months of "drives fine" is how minor sensor issues become engine damage. The light was the bargain.`,
      why:'Warning lights are early, cheap information — ignoring them converts information into expense.'
    };
  } },
{ id:'transportation-predict-06', verb:'predict', part:6, tier:'independent', skill:'transportation',
  gen:(v)=>{
    const person=v.person();
    const tix=v.int(3,5), each=v.int(35,60)*100;
    const owed=tix*each*2;
    return {
      q:`${person} collects ${tix} unpaid parking tickets at ${v.money(each/100)} each, figuring "they\u2019ll forget." What happens?`,
      choices:[
        {label:`Fines double with late penalties (~${v.money(owed/100)}) and the car can be booted or towed`, ok:true},
        {label:`The city forgets — tickets expire quietly`, ok:false},
        {label:`The tickets transfer to the next owner automatically`, ok:false},
        {label:`Nothing — parking tickets are suggestions`, ok:false}
      ],
      hint:'Do fines shrink with age?',
      good:`Right — tickets grow late fees, then enforcement: boot, tow, registration holds. ~${v.money(owed/100)} and rising.`,
      bad:`${tix} × ${v.money(each/100)} doubles with penalties to ~${v.money(owed/100)} — and cities don\u2019t forget; they escalate.`,
      why:'Ignored fines are the only bills that reliably get bigger — paying early is the discount.'
    };
  } },
{ id:'transportation-build-01', verb:'build', part:6, tier:'independent', skill:'transportation',
  gen:(v)=>({
    h:'Build it: the monthly car bundle',
    body:'<p>Split a $400 monthly car budget across all four car lines.</p>',
    totalDollars:400,
    buckets:[{id:'payment',label:'Payment'},{id:'insurance',label:'Insurance'},{id:'fuel',label:'Fuel'},{id:'maintenance',label:'Maintenance'}],
    targets:{payment:220,insurance:90,fuel:60,maintenance:30},
    hint:'Four lines, $400.',
    good:'Right — 220 + 90 + 60 + 30 = 400. The full bundle, funded.',
    bad:'Allocate: payment 220, insurance 90, fuel 60, maintenance 30 = $400.',
    why:'A car budget with all four lines is a car budget that survives contact with reality.'
  }) },
{ id:'transportation-build-02', verb:'build', part:6, tier:'independent', skill:'transportation',
  gen:(v)=>({
    h:'Build it: paid-off car budget',
    body:'<p>No payment — split $300 across everything a paid-off car still costs.</p>',
    totalDollars:300,
    buckets:[{id:'insurance',label:'Insurance'},{id:'fuel',label:'Fuel'},{id:'upkeep',label:'Maintenance + parking'},{id:'buffer',label:'Buffer'}],
    targets:{insurance:80,fuel:90,upkeep:100,buffer:30},
    hint:'No payment ≠ no cost. Four lines, $300.',
    good:'Right — 80 + 90 + 100 + 30 = 300. Paid off, not free.',
    bad:'Allocate: insurance 80, fuel 90, maintenance + parking 100, buffer 30 = $300.',
    why:'"No car payment" is wonderful — and the car still costs $300/month to own and run.'
  }) },
{ id:'transportation-build-03', verb:'build', part:6, tier:'independent', skill:'transportation',
  gen:(v)=>({
    h:'Build it: the transit budget',
    body:'<p>Split $150 across a car-free transportation month.</p>',
    totalDollars:150,
    buckets:[{id:'buspass',label:'Bus pass'},{id:'rideshare',label:'Rideshare'},{id:'bike',label:'Bike upkeep'},{id:'buffer',label:'Buffer'}],
    targets:{buspass:75,rideshare:45,bike:10,buffer:20},
    hint:'Four lines, $150.',
    good:'Right — 75 + 45 + 10 + 20 = 150. Car-free, fully planned.',
    bad:'Allocate: bus pass 75, rideshare 45, bike 10, buffer 20 = $150.',
    why:'Car-free isn\u2019t cost-free — but $150 planned beats $400 surprised.'
  }) },
{ id:'transportation-build-04', verb:'build', part:6, tier:'independent', skill:'transportation',
  gen:(v)=>({
    h:'Build it: the full car budget',
    body:'<p>Split $500 across a complete car month, parking included.</p>',
    totalDollars:500,
    buckets:[{id:'payment',label:'Payment'},{id:'insurance',label:'Insurance'},{id:'running',label:'Fuel + maintenance'},{id:'parking',label:'Parking'}],
    targets:{payment:280,insurance:110,running:95,parking:15},
    hint:'Four lines, $500.',
    good:'Right — 280 + 110 + 95 + 15 = 500. Nothing left unbilled.',
    bad:'Allocate: payment 280, insurance 110, fuel + maintenance 95, parking 15 = $500.',
    why:'The complete car budget has no "miscellaneous" — every dollar has a line.'
  }) },
{ id:'transportation-build-05', verb:'build', part:6, tier:'independent', skill:'transportation',
  gen:(v)=>({
    h:'Build it: lean car month',
    body:'<p>Split $250 across a lean car month — no payment, every line tight.</p>',
    totalDollars:250,
    buckets:[{id:'insurance',label:'Insurance'},{id:'fuel',label:'Fuel'},{id:'upkeep',label:'Maintenance + registration'},{id:'buffer',label:'Buffer'}],
    targets:{insurance:95,fuel:80,upkeep:60,buffer:15},
    hint:'Five lines, $250.',
    good:'Right — 95 + 80 + 45 + 15 + 15 = 250. Lean but honest.',
    bad:'Allocate: insurance 95, fuel 80, maintenance 45, registration 15, buffer 15 = $250.',
    why:'Lean budgets still slice the yearly bills monthly — registration doesn\u2019t care that the month is tight.'
  }) },
{ id:'transportation-explain-01', verb:'explain', part:5, tier:'independent', skill:'transportation',
  gen:(v)=>({
    h:'Teach it back: payment isn\u2019t total',
    prompt:'Explain in your own words why the monthly car payment is not the monthly car cost.',
    keyPoints:['The payment is just the loan slice','Insurance, fuel, and maintenance bill every month too','True cost = all four lines added','Decisions made on the payment alone break budgets'],
    modelAnswer:'The payment is only the loan slice of car ownership. Insurance, fuel, and maintenance all bill every month too, so the true monthly cost is all four lines added together. Anyone who decides on the payment alone is deciding on roughly half the real number.',
    hint:'Think: how many monthly lines does a car have?'
  }) },
{ id:'transportation-explain-02', verb:'explain', part:5, tier:'independent', skill:'transportation',
  gen:(v)=>({
    h:'Teach it back: the four-line list',
    prompt:'Explain in your own words the four lines of monthly car cost a friend must budget.',
    keyPoints:['Payment (or $0 if paid off)','Insurance — mandatory and quotable','Fuel — from miles, mpg, and gas price','Maintenance set-aside — repairs are "when," not "if"'],
    modelAnswer:'Every car month has four lines: the payment (zero if it\u2019s paid off), insurance (mandatory — get a quote before buying), fuel (miles divided by mpg times gas price), and a maintenance set-aside because repairs are "when," not "if." Budget all four and the car never surprises you.',
    hint:'Think: payment, insurance, fuel, and…?'
  }) },
{ id:'transportation-explain-03', verb:'explain', part:6, tier:'independent', skill:'transportation',
  gen:(v)=>({
    h:'Teach it back: small costs matter',
    prompt:'Explain in your own words why "small" car costs (parking, tolls, fees) belong in the budget.',
    keyPoints:['Small and monthly still compounds — ×12 is real money','They\u2019re the exact costs tight budgets forget','"Too small to matter" is how budgets leak','Every recurring dollar gets a line, no minimum'],
    modelAnswer:'A "small" monthly cost times twelve months is real money — $50/month is $600 a year. These are exactly the costs tight car budgets forget, and "too small to matter" is how budgets leak to death. The rule is simple: every recurring dollar gets a budget line, no minimum.',
    hint:'Think: small × 12 = ?'
  }) },
{ id:'transportation-explain-04', verb:'explain', part:6, tier:'independent', skill:'transportation',
  gen:(v)=>({
    h:'Teach it back: critiquing "cheaper gas"',
    prompt:'Explain in your own words how to check whether a cheaper gas station is actually cheaper.',
    keyPoints:['Note the per-gallon saving and the gallons you\u2019ll buy','Price the detour: fuel burned + time','Net saving = gross saving − detour cost','Only the net number decides'],
    modelAnswer:'Take the per-gallon saving times the gallons you\u2019ll buy — that\u2019s the gross saving. Then price the detour: the fuel burned getting there (and your time). Net saving equals gross minus detour cost, and only the net number gets to decide. Most "cheap gas" claims die at this step.',
    hint:'Think: gross vs net.'
  }) },
{ id:'transportation-explain-05', verb:'explain', part:6, tier:'independent', skill:'transportation',
  gen:(v)=>({
    h:'Teach it back: car vs transit',
    prompt:'Explain in your own words how to fairly compare owning a car vs taking transit for a month.',
    keyPoints:['Price the car\u2019s FULL monthly bundle (4+ lines)','Price transit\u2019s monthly total (pass + occasional rides)','Compare month to month — never payment to pass','Then weigh time and reliability separately from dollars'],
    modelAnswer:'Price the car\u2019s full monthly bundle — payment, insurance, fuel, maintenance, parking — against transit\u2019s monthly total of passes plus occasional rides. Never compare the car payment to the bus pass; that rigs it. Once dollars are honest, weigh time and reliability as a separate decision.',
    hint:'Think: what\u2019s the fairest version of each side?'
  }) },
],
'health-insurance': [
{ id:'health-insurance-choice-01', verb:'choice', part:5, tier:'independent', skill:'health-insurance',
  gen:(v)=>{
    const person=v.person();
    const D=v.int(1500,3000)*100;
    return {
      q:`${person}'s plan has a ${v.money(D/100)} deductible. What does that mean?`,
      choices:[
        {label:`${person} pays the first ${v.money(D/100)} of covered care costs before the plan starts paying its share`, ok:true},
        {label:`The plan pays ${person} ${v.money(D/100)} at the start of the year`, ok:false},
        {label:`${person}'s monthly premium is ${v.money(D/100)}`, ok:false, mis:'premium-is-total'},
        {label:`It\u2019s the most ${person} will ever pay in a year, total`, ok:false}
      ],
      hint:'Deductible = what you pay FIRST.',
      good:`Right — the deductible is your upfront share: the first ${v.money(D/100)} of covered costs comes from you.`,
      bad:`A deductible isn\u2019t a payment TO you or a premium — it\u2019s the amount you cover before the plan\u2019s share kicks in: ${v.money(D/100)}.`,
      why:'The deductible is the plan\u2019s "you first" number — everything about plan cost flows from it.'
    };
  } },
{ id:'health-insurance-choice-02', verb:'choice', part:5, tier:'independent', skill:'health-insurance',
  gen:(v)=>{
    const person=v.person();
    const copay=v.int(25,50)*100, pct=v.int(15,30);
    return {
      q:`${person}'s plan charges a ${v.money(copay/100)} copay for primary-care visits and ${pct}% coinsurance for lab work. What is the difference?`,
      choices:[
        {label:`Copay is a fixed ${v.money(copay/100)}; coinsurance is ${pct}% of the allowed cost — one is flat, one scales`, ok:true},
        {label:`They\u2019re the same thing with two names`, ok:false},
        {label:`Copay is a percentage and coinsurance is fixed`, ok:false},
        {label:`Both are paid to the employer, not for care`, ok:false}
      ],
      hint:'Fixed vs percentage.',
      good:`Right — copay = flat ${v.money(copay/100)}; coinsurance = ${pct}% of the bill. Different math, different surprises.`,
      bad:`Copay is fixed (${v.money(copay/100)} no matter the visit\u2019s price); coinsurance is a share (${pct}% of the allowed amount).`,
      why:'Fixed vs percentage is the whole difference — percentages scale with the bill, flat fees don\u2019t.'
    };
  } },
{ id:'health-insurance-choice-03', verb:'choice', part:5, tier:'independent', skill:'health-insurance',
  gen:(v)=>{
    const person=v.person();
    const oop=v.int(5000,8000)*100;
    return {
      q:`${person}'s plan has a ${v.money(oop/100)} out-of-pocket maximum. What does it cap?`,
      choices:[
        {label:`The most ${person} pays in a year for covered in-network cost-sharing (deductible, copays, coinsurance)`, ok:true},
        {label:`The most the insurance company will ever pay out`, ok:false},
        {label:`The total including monthly premiums`, ok:false},
        {label:`The most a single hospital visit can cost`, ok:false}
      ],
      hint:'It\u2019s YOUR maximum, not theirs.',
      good:`Right — once ${person}'s covered cost-sharing hits ${v.money(oop/100)}, the plan pays 100% of covered in-network care for the rest of the year.`,
      bad:`The out-of-pocket max caps YOUR yearly share of covered costs at ${v.money(oop/100)} — premiums aren\u2019t included in it.`,
      why:'The out-of-pocket max is the worst-case number — it turns "what if something big happens" into a known ceiling.'
    };
  } },
{ id:'health-insurance-choice-04', verb:'choice', part:5, tier:'independent', skill:'health-insurance',
  gen:(v)=>{
    const person=v.person();
    const lo=v.int(150,200)*100, hi=v.int(280,350)*100;
    return {
      q:`Plan A\u2019s premium is ${v.money(lo/100)}/month — the lowest available. Does that automatically make it the cheapest plan for the year?`,
      choices:[
        {label:`No — compare premiums PLUS expected deductible, copay, and coinsurance costs`, ok:true},
        {label:`Yes — the premium is the only cost that matters`, ok:false, mis:'premium-is-total'},
        {label:`Yes — as long as you ignore the provider network`, ok:false, mis:'network-doesnt-matter'},
        {label:`Yes — if a friend on Plan A pays less overall`, ok:false, mis:'friend-math'}
      ],
      hint:'Premium is one of several yearly costs.',
      good:`Right — a low premium often pairs with a high deductible. Total cost decides, not the monthly headline.`,
      bad:`Premium is just the entry fee. Add the expected deductible/copay/coinsurance before crowning a winner.`,
      why:'"Lowest premium" is the sticker-rent of health insurance — the full cost bundle tells the truth.'
    };
  } },
{ id:'health-insurance-choice-05', verb:'choice', part:6, tier:'independent', skill:'health-insurance',
  gen:(v)=>{
    const person=v.person();
    const prem=v.int(180,240)*100, yrPrem=prem*12, care=v.int(800,1500)*100;
    const total=yrPrem+care;
    return {
      q:`Plan A: ${v.money(prem/100)}/month premium (${v.money(yrPrem/100)}/year). ${person} expects about ${v.money(care/100)} in deductible/copay costs this year. What is the estimated yearly total?`,
      choices:[
        {label:`${v.money(total/100)} — ${v.money(yrPrem/100)} premiums + ${v.money(care/100)} cost-sharing`, ok:true},
        {label:`${v.money(yrPrem/100)} — premiums are the total`, ok:false, mis:'premium-is-total'},
        {label:`${v.money(care/100)} — cost-sharing is the total`, ok:false},
        {label:`${v.money(prem/100)} — one month\u2019s premium is the yearly cost`, ok:false}
      ],
      hint:'Yearly = (monthly premium × 12) + expected care costs.',
      good:`Right: ${v.money(prem/100)} × 12 = ${v.money(yrPrem/100)}, + ${v.money(care/100)} = ${v.money(total/100)} estimated.`,
      bad:`Premiums: ${v.money(prem/100)} × 12 = ${v.money(yrPrem/100)}. Add expected care ${v.money(care/100)} → ${v.money(total/100)}.`,
      why:'Plan math is always premiums-plus-care — either half alone is a different (wrong) number.'
    };
  } },
{ id:'health-insurance-choice-06', verb:'choice', part:6, tier:'independent', skill:'health-insurance',
  gen:(v)=>{
    const person=v.person();
    const doc=v.pick(['therapist','dermatologist','physical therapist']);
    return {
      q:`${person}'s ${doc} is out-of-network on the cheapest plan. ${person} figures "insurance is insurance — it\u2019ll cover it." What is wrong with this?`,
      choices:[
        {label:`Out-of-network care can cost far more and may not count toward the deductible or out-of-pocket max`, ok:true},
        {label:`Nothing — networks are just marketing`, ok:false, mis:'network-doesnt-matter'},
        {label:`The plan will quietly add the doctor to the network`, ok:false},
        {label:`Out-of-network means the care is free`, ok:false}
      ],
      hint:'"In-network" is a price tier, not a suggestion.',
      good:`Right — out-of-network often means higher cost-sharing that doesn\u2019t count toward your limits. The network is a money question.`,
      bad:`Networks set the price: out-of-network care bills more and may not credit toward the deductible/OOP max. Check before assuming.`,
      why:'The network is where the plan\u2019s prices live — ignoring it is like ignoring which currency a price is in.'
    };
  } },
{ id:'health-insurance-choice-07', verb:'choice', part:6, tier:'independent', skill:'health-insurance',
  gen:(v)=>{
    const person=v.person();
    const friend=v.person();
    return {
      q:`${friend} pays very little overall on Plan B and tells ${person} "just pick Plan B, it\u2019s the best." Should ${person} follow this advice?`,
      choices:[
        {label:`Not blindly — ${friend}\u2019s care needs aren\u2019t ${person}'s; total cost depends on your own expected care`, ok:true},
        {label:`Yes — if it\u2019s cheapest for ${friend}, it\u2019s cheapest for everyone`, ok:false, mis:'friend-math'},
        {label:`Yes — friends are better than plan documents`, ok:false},
        {label:`No — never take advice from friends about anything`, ok:false}
      ],
      hint:'Whose doctor visits set the cost?',
      good:`Right — plan cost = YOUR expected care × the plan\u2019s terms. ${friend}'s math doesn\u2019t transfer.`,
      bad:`${friend}'s low costs reflect ${friend}'s health and usage. ${person} must run the numbers on ${person}'s own expected care.`,
      why:'Health plans are personal math — someone else\u2019s total is a anecdote, not an answer.'
    };
  } },
{ id:'health-insurance-choice-08', verb:'choice', part:6, tier:'independent', skill:'health-insurance',
  gen:(v)=>{
    const person=v.person();
    const copay=v.int(25,45)*100, n=v.int(4,8);
    const total=copay*n;
    return {
      q:`${person}'s plan has a ${v.money(copay/100)} specialist copay. ${person} expects ${n} specialist visits this year. What is the expected copay total?`,
      choices:[
        {label:`${v.money(total/100)} — ${n} × ${v.money(copay/100)}`, ok:true},
        {label:`${v.money(copay/100)} — one copay covers the year`, ok:false},
        {label:`${v.money((copay*n*2)/100)} — copays double after the third visit`, ok:false},
        {label:`$0 — copays don\u2019t count as real costs`, ok:false}
      ],
      hint:'Copays are per visit.',
      good:`Right: ${n} × ${v.money(copay/100)} = ${v.money(total/100)} in expected copays.`,
      bad:`Each visit costs ${v.money(copay/100)}: ${n} visits = ${v.money(total/100)}.`,
      why:'Copays feel small until they\u2019re multiplied by a year of visits — per-visit × visits is the real line.'
    };
  } },
{ id:'health-insurance-sort-01', verb:'sort', part:5, tier:'independent', skill:'health-insurance',
  gen:(v)=>({
    h:'Sort it: keep the plan or get care?',
    body:'<p>Sort each cost by WHEN you pay it.</p>',
    buckets:['Pay to keep the plan','Pay when you get care'],
    items:[
      {label:'Monthly premium', a:'pay to keep the plan', why:'Paid to maintain coverage, care or no care.'},
      {label:'Deductible', a:'pay when you get care', why:'Paid as you receive covered services.'},
      {label:'Copay', a:'pay when you get care', why:'Due at the visit.'},
      {label:'Coinsurance', a:'pay when you get care', why:'Your share of each covered bill.'},
      {label:'Enrollment fee (if any)', a:'pay to keep the plan', why:'Keeps the coverage active.'},
      {label:'Prescription copay', a:'pay when you get care', why:'Paid when filling the prescription.'}
    ]
  }) },
{ id:'health-insurance-sort-02', verb:'sort', part:5, tier:'independent', skill:'health-insurance',
  gen:(v)=>({
    h:'Sort it: fixed or percentage?',
    body:'<p>Sort each cost-sharing type by how it\u2019s calculated.</p>',
    buckets:['Fixed amount','Percentage'],
    items:[
      {label:'Primary-care copay', a:'fixed amount', why:'A flat dollar amount per visit.'},
      {label:'Prescription copay tiers', a:'fixed amount', why:'Flat amounts per tier.'},
      {label:'Urgent-care copay', a:'fixed amount', why:'Flat fee per visit.'},
      {label:'Coinsurance on lab work', a:'percentage', why:'A % of the allowed cost.'},
      {label:'Coinsurance on surgery', a:'percentage', why:'Your share scales with the bill.'},
      {label:'Coinsurance on imaging', a:'percentage', why:'Percentage of the allowed amount.'}
    ]
  }) },
{ id:'health-insurance-sort-03', verb:'sort', part:5, tier:'independent', skill:'health-insurance',
  gen:(v)=>({
    h:'Sort it: counts toward the max?',
    body:'<p>Sort each payment by whether it counts toward the out-of-pocket maximum.</p>',
    buckets:['Counts toward OOP max','Does NOT count'],
    items:[
      {label:'Deductible payments', a:'counts toward oop max', why:'Cost-sharing that accrues to the max.'},
      {label:'Copays', a:'counts toward oop max', why:'Counts toward the yearly cap.'},
      {label:'Coinsurance', a:'counts toward oop max', why:'Your share accrues to the max.'},
      {label:'Monthly premiums', a:'does not count', why:'Premiums are separate — they never count toward the max.'},
      {label:'Out-of-network balance bills', a:'does not count', why:'Often excluded from the cap.'},
      {label:'Non-covered services', a:'does not count', why:'Not covered = not counted.'}
    ]
  }) },
{ id:'health-insurance-sort-04', verb:'sort', part:5, tier:'independent', skill:'health-insurance',
  gen:(v)=>({
    h:'Sort it: plan terms or your life?',
    body:'<p>Comparing plans needs two kinds of facts. Sort them.</p>',
    buckets:['Plan terms','Your situation'],
    items:[
      {label:'Monthly premium', a:'plan terms', why:'Set by the plan.'},
      {label:'Deductible amount', a:'plan terms', why:'Set by the plan.'},
      {label:'Provider network', a:'plan terms', why:'Set by the plan.'},
      {label:'Out-of-pocket maximum', a:'plan terms', why:'Set by the plan.'},
      {label:'How often you see a doctor', a:'your situation', why:'Your expected care drives the math.'},
      {label:'Your prescriptions', a:'your situation', why:'Your drug needs change the total.'},
      {label:'Which doctors you want to keep', a:'your situation', why:'Your network needs filter the options.'}
    ]
  }) },
{ id:'health-insurance-sort-05', verb:'sort', part:5, tier:'independent', skill:'health-insurance',
  gen:(v)=>({
    h:'Sort it: lower or higher cost to you?',
    body:'<p>Sort each care choice by what it typically costs you.</p>',
    buckets:['Lower cost to you','Higher cost to you'],
    items:[
      {label:'In-network primary care visit', a:'lower cost to you', why:'Contracted rates + normal cost-sharing.'},
      {label:'Preventive checkup', a:'lower cost to you', why:'Often covered at no cost-sharing.'},
      {label:'In-network generic prescription', a:'lower cost to you', why:'Lowest drug tier.'},
      {label:'Out-of-network specialist', a:'higher cost to you', why:'Higher share, may not count to limits.'},
      {label:'ER visit for a non-emergency', a:'higher cost to you', why:'Most expensive door for routine care.'},
      {label:'Brand-name drug with a generic available', a:'higher cost to you', why:'Higher tier, higher copay.'}
    ]
  }) },
{ id:'health-insurance-sort-06', verb:'sort', part:5, tier:'independent', skill:'health-insurance',
  gen:(v)=>({
    h:'Sort it: monthly or per-visit?',
    body:'<p>Sort each health cost by how often you pay it.</p>',
    buckets:['Monthly cost','Per-visit cost'],
    items:[
      {label:'Premium', a:'monthly cost', why:'Billed every month to keep coverage.'},
      {label:'Copay', a:'per-visit cost', why:'Paid each time you get that care.'},
      {label:'Coinsurance', a:'per-visit cost', why:'Charged per covered service.'},
      {label:'Dental add-on premium', a:'monthly cost', why:'Recurring add-on charge.'},
      {label:'Lab-work coinsurance', a:'per-visit cost', why:'Per test, per bill.'},
      {label:'Prescription copay', a:'per-visit cost', why:'Per fill.'}
    ]
  }) },
{ id:'health-insurance-decide-01', verb:'decide', part:5, tier:'independent', skill:'health-insurance',
  gen:(v)=>{
    const person=v.person();
    const loP=v.int(160,200)*100, loD=v.int(4000,6000)*100;
    const hiP=v.int(300,360)*100, hiD=v.int(800,1500)*100;
    const care=v.int(300,600)*100;
    const totLo=loP*12+Math.min(care,loD), totHi=hiP*12+Math.min(care,hiD);
    return {
      q:`${person} is healthy with ~${v.money(care/100)}/year in expected care. Plan L: ${v.money(loP/100)}/mo + ${v.money(loD/100)} deductible. Plan H: ${v.money(hiP/100)}/mo + ${v.money(hiD/100)} deductible. Which is cheaper for the year?`,
      choices: totLo<totHi ? [
        {label:`Plan L — ~${v.money(totLo/100)} total vs ~${v.money(totHi/100)}`, ok:true},
        {label:`Plan H — higher premiums mean better coverage, always`, ok:false},
        {label:`Plan L — the lowest premium always wins`, ok:false, mis:'premium-is-total'},
        {label:`Plan H — deductibles don\u2019t matter for healthy people`, ok:false}
      ] : [
        {label:`Plan H — ~${v.money(totHi/100)} total vs ~${v.money(totLo/100)}`, ok:true},
        {label:`Plan L — the lowest premium always wins`, ok:false, mis:'premium-is-total'},
        {label:`Plan H — higher premiums mean better coverage, always`, ok:false},
        {label:`Plan L — deductibles don\u2019t matter for healthy people`, ok:false}
      ],
      hint:'Yearly = premium × 12 + expected care (capped by the deductible).',
      good: totLo<totHi ? `Plan L wins at ~${v.money(totLo/100)} vs ~${v.money(totHi/100)} — low expected care favors the low premium.` : `Plan H wins at ~${v.money(totHi/100)} vs ~${v.money(totLo/100)} — here the premium gap beats the deductible gap.`,
      bad:`L: ${v.money(loP/100)} × 12 + ${v.money(Math.min(care,loD)/100)} = ${v.money(totLo/100)}. H: ${v.money(hiP/100)} × 12 + ${v.money(Math.min(care,hiD)/100)} = ${v.money(totHi/100)}.`,
      why:'Healthy-year math rewards low premiums — but only the full yearly total proves it.'
    };
  } },
{ id:'health-insurance-decide-02', verb:'decide', part:5, tier:'independent', skill:'health-insurance',
  gen:(v)=>{
    const person=v.person();
    const loP=v.int(160,200)*100, loD=v.int(4500,6000)*100;
    const hiP=v.int(320,380)*100, hiD=v.int(1000,1500)*100;
    const rx=v.int(4000,6000)*100;
    const totLo=loP*12+Math.min(rx,loD), totHi=hiP*12+Math.min(rx,hiD);
    return {
      q:`${person} takes a daily prescription costing ~${v.money(rx/100)}/year. Plan L: ${v.money(loP/100)}/mo + ${v.money(loD/100)} deductible. Plan H: ${v.money(hiP/100)}/mo + ${v.money(hiD/100)} deductible. Which is cheaper for the year?`,
      choices: totLo<totHi ? [
        {label:`Plan L — ~${v.money(totLo/100)} total vs ~${v.money(totHi/100)}`, ok:true},
        {label:`Plan H — chronic needs always want the low deductible`, ok:false},
        {label:`Plan L — lowest premium always wins`, ok:false, mis:'premium-is-total'},
        {label:`Neither — skip insurance and pay cash for the drug`, ok:false}
      ] : [
        {label:`Plan H — ~${v.money(totHi/100)} total vs ~${v.money(totLo/100)}`, ok:true},
        {label:`Plan L — lowest premium always wins`, ok:false, mis:'premium-is-total'},
        {label:`Plan H — chronic needs always want the low deductible`, ok:false},
        {label:`Neither — skip insurance and pay cash for the drug`, ok:false}
      ],
      hint:'High certain costs flip the math — run both yearly totals.',
      good: totLo<totHi ? `Plan L still wins at ~${v.money(totLo/100)} — the premium gap outweighs the deductible gap even with the prescription.` : `Plan H wins at ~${v.money(totHi/100)} — the certain ${v.money(rx/100)} in drug costs makes the low deductible worth the premium.`,
      bad:`L: ${v.money(loP/100)} × 12 + ${v.money(Math.min(rx,loD)/100)} = ${v.money(totLo/100)}. H: ${v.money(hiP/100)} × 12 + ${v.money(Math.min(rx,hiD)/100)} = ${v.money(totHi/100)}.`,
      why:'Certain high costs change the winner — the plan must be priced on YOUR expected care, not a generic profile.'
    };
  } },
{ id:'health-insurance-decide-03', verb:'decide', part:5, tier:'independent', skill:'health-insurance',
  gen:(v)=>{
    const person=v.person();
    const doc=v.pick(['therapist','dermatologist']);
    const cheapP=v.int(170,210)*100, keepP=v.int(260,320)*100;
    const oon=v.int(1500,2500)*100;
    return {
      q:`${person}'s ${doc} is in-network ONLY on the pricier plan. Cheap plan: ${v.money(cheapP/100)}/mo (doctor out-of-network, ~${v.money(oon/100)}/year extra). Pricier plan: ${v.money(keepP/100)}/mo (doctor in-network). Which is cheaper for the year?`,
      choices: (cheapP*12+oon)<(keepP*12) ? [
        {label:`Cheap plan + out-of-network costs — ~${v.money((cheapP*12+oon)/100)} vs ~${v.money((keepP*12)/100)}`, ok:true},
        {label:`Pricier plan — keeping your doctor is priceless`, ok:false},
        {label:`Cheap plan — networks don\u2019t affect costs`, ok:false, mis:'network-doesnt-matter'},
        {label:`Cheap plan — and the doctor will bill in-network rates anyway`, ok:false}
      ] : [
        {label:`Pricier plan — ~${v.money((keepP*12)/100)} vs ~${v.money((cheapP*12+oon)/100)} with the doctor out-of-network`, ok:true},
        {label:`Cheap plan — the lowest premium always wins`, ok:false, mis:'premium-is-total'},
        {label:`Cheap plan — networks don\u2019t affect costs`, ok:false, mis:'network-doesnt-matter'},
        {label:`Pricier plan — keeping your doctor is priceless`, ok:false}
      ],
      hint:'Cheap premium + out-of-network reality vs pricier premium with the doctor covered.',
      good: (cheapP*12+oon)<(keepP*12) ? `Cheap plan wins on dollars: ~${v.money((cheapP*12+oon)/100)} vs ~${v.money((keepP*12)/100)} — even paying out-of-network.` : `Pricier plan wins: ~${v.money((keepP*12)/100)} vs ~${v.money((cheapP*12+oon)/100)} once the out-of-network costs land.`,
      bad:`Cheap: ${v.money(cheapP/100)} × 12 + ${v.money(oon/100)} OON = ${v.money((cheapP*12+oon)/100)}. Pricier: ${v.money(keepP/100)} × 12 = ${v.money((keepP*12)/100)}.`,
      why:'"Keep my doctor" is a line item — price the network reality into the cheap plan before comparing.'
    };
  } },
{ id:'health-insurance-decide-04', verb:'decide', part:5, tier:'independent', skill:'health-insurance',
  gen:(v)=>{
    const person=v.person();
    const rider=v.int(18,30)*100, yr=rider*12;
    const clean=v.int(120,180)*100, visits=v.int(1,2);
    const cashCost=clean*visits;
    return {
      q:`A dental rider costs ${v.money(rider/100)}/month (${v.money(yr/100)}/year). ${person} expects ${visits} cleanings this year at ~${v.money(clean/100)} cash each (${v.money(cashCost/100)} total). Add the rider?`,
      choices: yr<cashCost ? [
        {label:`Yes — ${v.money(yr/100)}/year beats paying ${v.money(cashCost/100)} cash`, ok:true},
        {label:`No — riders are never worth it`, ok:false},
        {label:`Yes — insurance always pays for itself`, ok:false},
        {label:`No — skip the cleanings instead`, ok:false}
      ] : [
        {label:`No — ${v.money(cashCost/100)} cash beats ${v.money(yr/100)} in rider premiums`, ok:true},
        {label:`Yes — insurance always pays for itself`, ok:false},
        {label:`No — riders are never worth it`, ok:false},
        {label:`Yes — and skip the cleanings since you\u2019re covered`, ok:false}
      ],
      hint:'Yearly rider cost vs expected cash cost.',
      good: yr<cashCost ? `Rider wins: ${v.money(yr/100)} < ${v.money(cashCost/100)} cash.` : `Cash wins: ${v.money(cashCost/100)} < ${v.money(yr/100)} in premiums.`,
      bad:`Rider: ${v.money(rider/100)} × 12 = ${v.money(yr/100)}/year. Cash: ${visits} × ${v.money(clean/100)} = ${v.money(cashCost/100)}. Smaller wins.`,
      why:'Add-on coverage is arithmetic: expected cash costs vs the rider\u2019s yearly price — no vibes, just numbers.'
    };
  } },
{ id:'health-insurance-decide-05', verb:'decide', part:8, tier:'stretch', skill:'health-insurance',
  gen:(v)=>{
    const person=v.person();
    const hsaP=v.int(190,230)*100, hsaD=v.int(3500,4500)*100;
    const tradP=v.int(300,360)*100, tradD=v.int(1200,1800)*100;
    const hsaTax=v.int(500,800)*100;
    const hsaTot=hsaP*12+hsaD-hsaTax, tradTot=tradP*12+tradD;
    return {
      q:`Novel situation: ${person} freelances and expects a big surgery year (~${v.money(hsaD/100)} in care). HSA plan: ${v.money(hsaP/100)}/mo, ${v.money(hsaD/100)} deductible, ~${v.money(hsaTax/100)} in tax savings. Traditional: ${v.money(tradP/100)}/mo, ${v.money(tradD/100)} deductible. Which costs less all-in?`,
      choices: hsaTot<tradTot ? [
        {label:`HSA plan — ~${v.money(hsaTot/100)} all-in vs ~${v.money(tradTot/100)} (tax savings count)`, ok:true},
        {label:`Traditional — lower deductibles always win big years`, ok:false},
        {label:`HSA plan — the tax break alone decides everything`, ok:false},
        {label:`Traditional — HSA plans are only for healthy people`, ok:false}
      ] : [
        {label:`Traditional — ~${v.money(tradTot/100)} all-in vs ~${v.money(hsaTot/100)}`, ok:true},
        {label:`HSA plan — the tax break alone decides everything`, ok:false},
        {label:`Traditional — lower deductibles always win big years`, ok:false},
        {label:`HSA plan — high deductibles are always cheaper`, ok:false, mis:'premium-is-total'}
      ],
      hint:'All-in = premiums + deductible − real tax savings. Big-year math.',
      good: hsaTot<tradTot ? `HSA wins: ${v.money((hsaP*12)/100)} + ${v.money(hsaD/100)} − ${v.money(hsaTax/100)} = ~${v.money(hsaTot/100)} vs ~${v.money(tradTot/100)}.` : `Traditional wins: ~${v.money(tradTot/100)} vs the HSA\u2019s ~${v.money(hsaTot/100)} — the tax break didn\u2019t close the gap.`,
      bad:`HSA all-in: ${v.money((hsaP*12)/100)} + ${v.money(hsaD/100)} − ${v.money(hsaTax/100)} = ${v.money(hsaTot/100)}. Traditional: ${v.money((tradP*12)/100)} + ${v.money(tradD/100)} = ${v.money(tradTot/100)}.`,
      why:'Novel situations use the same engine: every dollar in, every dollar out, tax effects included — then compare.'
    };
  } },
{ id:'health-insurance-decide-06', verb:'decide', part:8, tier:'stretch', skill:'health-insurance',
  gen:(v)=>{
    const person=v.person();
    const jobP=v.int(90,130)*100, jobD=v.int(2500,3500)*100;
    const parP=0, parD=v.int(1500,2500)*100;
    const jobTot=jobP*12+Math.min(800*100,jobD), parTot=Math.min(800*100,parD);
    return {
      q:`Novel situation: ${person} (24) can stay on a parent\u2019s plan FREE (${v.money(parD/100)} deductible) or take the part-time job\u2019s plan at ${v.money(jobP/100)}/mo (${v.money(jobD/100)} deductible). Expected care: ~$800/year. Which costs less?`,
      choices: parTot<jobTot ? [
        {label:`Stay on the parent\u2019s plan — ~${v.money(parTot/100)} vs ~${v.money(jobTot/100)} on the job plan`, ok:true},
        {label:`Take the job plan — having your own plan is always better`, ok:false},
        {label:`Stay on parent\u2019s — free premiums always win no matter what`, ok:false, mis:'premium-is-total'},
        {label:`Take the job plan — parents\u2019 plans don\u2019t count as real insurance`, ok:false}
      ] : [
        {label:`Take the job plan — ~${v.money(jobTot/100)} vs ~${v.money(parTot/100)}`, ok:true},
        {label:`Stay on parent\u2019s — free premiums always win no matter what`, ok:false, mis:'premium-is-total'},
        {label:`Take the job plan — having your own plan is always better`, ok:false},
        {label:`Stay — but only because job plans are scams`, ok:false}
      ],
      hint:'Free premium + deductible vs paid premium + deductible, on $800 of care.',
      good: parTot<jobTot ? `Parent\u2019s plan wins: $0 premium + $800 of care under the deductible = ~${v.money(parTot/100)} vs ~${v.money(jobTot/100)}.` : `Job plan wins: ~${v.money(jobTot/100)} vs ~${v.money(parTot/100)} — here the lower deductible beats free premiums.`,
      bad:`Parent\u2019s: $0 + min($800, ${v.money(parD/100)}) = ${v.money(parTot/100)}. Job: ${v.money(jobP/100)} × 12 + min($800, ${v.money(jobD/100)}) = ${v.money(jobTot/100)}.`,
      why:'"Free" still has a deductible — price both fully. Under-26 coverage is an option to evaluate, not an automatic win.'
    };
  } },
{ id:'health-insurance-decide-07', verb:'decide', part:8, tier:'stretch', skill:'health-insurance',
  gen:(v)=>{
    const person=v.person();
    const uc=v.int(35,60)*100, er=v.int(400,700)*100;
    const issue=v.pick(['a sprained ankle','a bad cut needing stitches','a sudden fever']);
    return {
      q:`Novel situation: ${person} has ${issue} — urgent but not life-threatening. Urgent-care copay: ${v.money(uc/100)}. ER cost-sharing: ~${v.money(er/100)}. Both are in-network. Where to go?`,
      choices:[
        {label:`Urgent care — ${v.money(uc/100)} handles it; the ER\u2019s ~${v.money(er/100)} buys nothing extra here`, ok:true},
        {label:`The ER — more expensive means better care`, ok:false},
        {label:`Urgent care — and skip the copay by not mentioning insurance`, ok:false},
        {label:`Neither — wait a week and see`, ok:false}
      ],
      hint:'Match the severity to the door — then compare the prices.',
      good:`Urgent care wins: ${v.money(uc/100)} vs ~${v.money(er/100)} for the same outcome on a non-emergency.`,
      bad:`${issue} doesn\u2019t need an ER. Urgent care: ${v.money(uc/100)}. ER: ~${v.money(er/100)}. Same result, ${v.money((er-uc)/100)} apart.`,
      why:'The right door is a money decision: ER prices are for emergencies — using them otherwise is the priciest possible choice.'
    };
  } },
{ id:'health-insurance-decide-08', verb:'decide', part:8, tier:'stretch', skill:'health-insurance',
  gen:(v)=>{
    const person=v.person();
    const spec=v.pick(['cardiologist','neurologist']);
    const pA=v.int(200,250)*100, pB=v.int(280,340)*100;
    const oonA=v.int(2000,3000)*100;
    const totA=pA*12+oonA, totB=pB*12;
    return {
      q:`Novel situation: ${person} moves to a new city and must keep seeing a ${spec}. Plan A (${v.money(pA/100)}/mo) doesn\u2019t include the ${spec} — out-of-network care ~${v.money(oonA/100)}/year. Plan B (${v.money(pB/100)}/mo) includes the ${spec} in-network. Which costs less for the year?`,
      choices: totA<totB ? [
        {label:`Plan A — ~${v.money(totA/100)} even with out-of-network specialist costs vs ~${v.money(totB/100)}`, ok:true},
        {label:`Plan B — in-network specialists are always worth any premium`, ok:false},
        {label:`Plan A — networks don\u2019t change what you pay`, ok:false, mis:'network-doesnt-matter'},
        {label:`Plan B — the higher premium guarantees better care`, ok:false}
      ] : [
        {label:`Plan B — ~${v.money(totB/100)} vs ~${v.money(totA/100)} once the specialist bills out-of-network`, ok:true},
        {label:`Plan A — the lower premium always wins`, ok:false, mis:'premium-is-total'},
        {label:`Plan A — networks don\u2019t change what you pay`, ok:false, mis:'network-doesnt-matter'},
        {label:`Plan B — in-network specialists are always worth any premium`, ok:false}
      ],
      hint:'A\u2019s premium + the real out-of-network specialist cost vs B\u2019s premium.',
      good: totA<totB ? `Plan A wins on dollars: ~${v.money(totA/100)} vs ~${v.money(totB/100)}.` : `Plan B wins: ~${v.money(totB/100)} vs ~${v.money(totA/100)} — the "cheap" plan\u2019s network gap was the expensive part.`,
      bad:`A: ${v.money(pA/100)} × 12 + ${v.money(oonA/100)} = ${v.money(totA/100)}. B: ${v.money(pB/100)} × 12 = ${v.money(totB/100)}.`,
      why:'A must-keep doctor is a constraint, not a preference — price the network gap into the cheap plan first.'
    };
  } },
{ id:'health-insurance-spot-01', verb:'spot', part:6, tier:'independent', skill:'health-insurance',
  gen:(v)=>{
    const person=v.person();
    const loP=v.int(150,190)*100, loD=v.int(5000,7000)*100;
    const hiP=v.int(300,360)*100, hiD=v.int(1200,1800)*100;
    const care=v.int(2500,3500)*100;
    return {
      scenario:`<p>${person} picked the ${v.money(loP/100)}/month plan "because it\u2019s cheapest."</p><ul><li>Chosen: ${v.money(loP/100)}/mo premium, ${v.money(loD/100)} deductible</li><li>Skipped: ${v.money(hiP/100)}/mo premium, ${v.money(hiD/100)} deductible</li><li>${person}'s actual care this year: ~${v.money(care/100)}</li></ul>`,
      q:'What is the mistake here?',
      choices:[
        {label:`${person} crowned the lowest premium without pricing the deductible against real expected care`, ok:true},
        {label:`${person} should have picked an even cheaper premium`, ok:false, mis:'premium-is-total'},
        {label:`The mistake is having health costs at all`, ok:false},
        {label:`There is no mistake — lowest premium is always cheapest`, ok:false, mis:'premium-is-total'}
      ],
      hint:'Premium × 12 + care (up to the deductible) for each plan.',
      good:`Right — the "cheap" plan\u2019s real yearly was ~${v.money((loP*12+Math.min(care,loD))/100)} vs ~${v.money((hiP*12+Math.min(care,hiD))/100)} for the skipped one.`,
      bad:`Yearly totals: chosen = ${v.money(loP/100)} × 12 + ${v.money(Math.min(care,loD)/100)} = ${v.money((loP*12+Math.min(care,loD))/100)}; skipped = ${v.money((hiP*12+Math.min(care,hiD))/100)}. The "cheap" plan lost.`,
      why:'Premium-only shopping is how the most expensive plan wins the "cheapest" contest.'
    };
  } },
{ id:'health-insurance-spot-02', verb:'spot', part:6, tier:'independent', skill:'health-insurance',
  gen:(v)=>{
    const person=v.person();
    const doc=v.pick(['therapist','specialist']);
    return {
      scenario:`<p>${person} chose a plan without checking whether their ${doc} is in-network.</p><ul><li>Assumption: "All plans cover all doctors"</li><li>Reality: ${doc} is out-of-network — visits cost 3× more and don\u2019t count toward the deductible</li></ul>`,
      q:'What is the mistake here?',
      choices:[
        {label:`${person} treated the network as irrelevant — it sets the actual prices paid`, ok:true},
        {label:`${person} was right — insurance covers every doctor equally`, ok:false, mis:'network-doesnt-matter'},
        {label:`The mistake is seeing a ${doc} at all`, ok:false},
        {label:`There is no mistake — networks update automatically`, ok:false}
      ],
      hint:'In-network vs out-of-network is a price difference, not a suggestion.',
      good:`Right — the network determines the price tier. Unchecked, it tripled the visit cost and stalled the deductible.`,
      bad:`Out-of-network: 3× the cost, and payments may not credit toward the deductible. The network check takes five minutes.`,
      why:'"All doctors covered" is the network version of "all utilities included" — the plan document, not the assumption, decides.'
    };
  } },
{ id:'health-insurance-spot-03', verb:'spot', part:6, tier:'independent', skill:'health-insurance',
  gen:(v)=>{
    const person=v.person();
    const friend=v.person();
    return {
      scenario:`<p>${person} copied ${friend}\u2019s plan choice exactly.</p><ul><li>${friend}: healthy, no prescriptions, rarely sees a doctor — Plan Q is cheapest for them</li><li>${person}: monthly prescriptions + regular specialist visits — same Plan Q</li><li>${person}\u2019s surprise: costs far higher than ${friend}\u2019s</li></ul>`,
      q:'What is the mistake here?',
      choices:[
        {label:`${person} borrowed ${friend}\u2019s answer instead of pricing ${person}'s own expected care`, ok:true},
        {label:`${person} should have copied a DIFFERENT friend`, ok:false, mis:'friend-math'},
        {label:`The mistake is having prescriptions`, ok:false},
        {label:`There is no mistake — the best plan is universal`, ok:false, mis:'friend-math'}
      ],
      hint:'Whose body generates the bills?',
      good:`Right — Plan Q fits ${friend}'s near-zero usage, not ${person}'s prescriptions and visits. Same plan, different math.`,
      bad:`${friend}'s costs came from ${friend}'s health. ${person}'s costs come from ${person}'s — the plan must be priced per person.`,
      why:'Health insurance is personal arithmetic — someone else\u2019s optimum is your random guess.'
    };
  } },
{ id:'health-insurance-spot-04', verb:'spot', part:6, tier:'independent', skill:'health-insurance',
  gen:(v)=>{
    const person=v.person();
    const pA=v.int(180,220)*100, dA=v.int(4000,5500)*100;
    const pB=v.int(290,350)*100, dB=v.int(1000,1500)*100;
    return {
      scenario:`<p>${person} compared two plans on monthly premium only:</p><ul><li>Plan A: ${v.money(pA/100)}/mo — "winner"</li><li>Plan B: ${v.money(pB/100)}/mo — "too expensive"</li><li>Never compared: deductibles (${v.money(dA/100)} vs ${v.money(dB/100)}), networks, OOP max</li></ul>`,
      q:'What is the mistake here?',
      choices:[
        {label:`${person} compared one of five cost dimensions and declared a winner`, ok:true},
        {label:`${person} was thorough — premium is the only dimension`, ok:false, mis:'premium-is-total'},
        {label:`${person} should have compared only the deductibles instead`, ok:false},
        {label:`There is no mistake — monthly is the only timeframe that matters`, ok:false}
      ],
      hint:'How many numbers make up a plan\u2019s yearly cost?',
      good:`Right — premium, deductible, copays, coinsurance, network, OOP max: ${person} priced one of six.`,
      bad:`The comparison skipped deductibles (${v.money(dA/100)} vs ${v.money(dB/100)}), networks, and the OOP max — the "winner" was decided on 1/6th of the price.`,
      why:'Single-dimension comparisons manufacture false winners — yearly totals need every dimension.'
    };
  } },
{ id:'health-insurance-spot-05', verb:'spot', part:6, tier:'independent', skill:'health-insurance',
  gen:(v)=>{
    const person=v.person();
    const rx=v.int(200,350)*100, mo=12, yr=rx*mo;
    return {
      scenario:`<p>${person}'s plan comparison:</p><ul><li>Premiums: compared ✓</li><li>Deductibles: compared ✓</li><li>Monthly prescriptions at ${v.money(rx/100)}/month: "I forgot those count"</li><li>Missing from the math: ${v.money(yr/100)}/year</li></ul>`,
      q:'What is the mistake here?',
      choices:[
        {label:`${person} left ${v.money(yr/100)}/year of certain drug costs out of the total`, ok:true},
        {label:`${person} was right — prescriptions aren\u2019t health costs`, ok:false},
        {label:`The mistake is taking prescriptions at all`, ok:false},
        {label:`There is no mistake — drug costs are always covered 100%`, ok:false}
      ],
      hint:`${v.money(rx/100)} × 12.`,
      good:`Right — ${v.money(rx/100)} × 12 = ${v.money(yr/100)}/year of certain costs, invisible in the comparison. Plans with better drug tiers would have won.`,
      bad:`Add the missing line: ${v.money(rx/100)} × 12 = ${v.money(yr/100)}/year. Certain costs belong in every plan total.`,
      why:'The most predictable costs are the easiest to forget — and forgetting them flips plan rankings.'
    };
  } },
{ id:'health-insurance-spot-06', verb:'spot', part:6, tier:'independent', skill:'health-insurance',
  gen:(v)=>{
    const person=v.person();
    const prem=v.int(220,300)*100, oop=v.int(6000,8000)*100;
    return {
      scenario:`<p>${person}'s "worst case" math:</p><ul><li>Out-of-pocket max: ${v.money(oop/100)}</li><li>Premiums: ${v.money(prem/100)}/month × 12 = ${v.money((prem*12)/100)}</li><li>${person}\u2019s worst-case total: ${v.money(oop/100)} ("the max is the max")</li></ul>`,
      q:'What is the mistake here?',
      choices:[
        {label:`${person} forgot the premiums — worst case is ${v.money(oop/100)} + ${v.money((prem*12)/100)} = ${v.money((oop+prem*12)/100)}`, ok:true},
        {label:`${person} was right — the OOP max includes everything`, ok:false},
        {label:`The mistake is buying insurance at all`, ok:false},
        {label:`There is no mistake — "max" means max`, ok:false}
      ],
      hint:'Do premiums count toward the out-of-pocket max?',
      good:`Right — premiums never count toward the OOP max. True worst case: ${v.money((oop+prem*12)/100)}.`,
      bad:`Worst case = OOP max (${v.money(oop/100)}) + full year of premiums (${v.money((prem*12)/100)}) = ${v.money((oop+prem*12)/100)}.`,
      why:'"Max" has an asterisk: the out-of-pocket maximum caps cost-sharing, not premiums — the real ceiling is both.'
    };
  } },
{ id:'health-insurance-compare-01', verb:'compare', part:5, tier:'independent', skill:'health-insurance',
  gen:(v)=>{
    const person=v.person();
    const pA=v.int(170,200)*100, dA=v.int(2800,3500)*100;
    const pB=v.int(250,290)*100, dB=v.int(800,1200)*100;
    const care=v.int(1200,2000)*100;
    const tA=pA*12+Math.min(care,dA), tB=pB*12+Math.min(care,dB);
    return {
      context:`<p><b>Plan A:</b> ${v.money(pA/100)}/mo + ${v.money(dA/100)} deductible → ~${v.money(tA/100)}/year with ${v.money(care/100)} of care.</p><p><b>Plan B:</b> ${v.money(pB/100)}/mo + ${v.money(dB/100)} deductible → ~${v.money(tB/100)}/year with ${v.money(care/100)} of care.</p>`,
      q:`${person} expects about ${v.money(care/100)} in care this year. Which plan costs less total?`,
      choices: tA<tB ? [
        {label:`Plan A — ~${v.money(tA/100)} vs ~${v.money(tB/100)}`, ok:true},
        {label:`Plan B — the lower deductible always wins`, ok:false},
        {label:`Plan A — the lower premium always wins`, ok:false, mis:'premium-is-total'},
        {label:`They\u2019re equal — premiums and deductibles cancel out`, ok:false}
      ] : [
        {label:`Plan B — ~${v.money(tB/100)} vs ~${v.money(tA/100)}`, ok:true},
        {label:`Plan A — the lower premium always wins`, ok:false, mis:'premium-is-total'},
        {label:`Plan B — the lower deductible always wins`, ok:false},
        {label:`They\u2019re equal — premiums and deductibles cancel out`, ok:false}
      ],
      hint:'Premium × 12 + care (capped by each deductible).',
      good: tA<tB ? `Right — A\u2019s ~${v.money(tA/100)} beats B\u2019s ~${v.money(tB/100)} at this care level.` : `Right — B\u2019s ~${v.money(tB/100)} beats A\u2019s ~${v.money(tA/100)} at this care level.`,
      bad:`A: ${v.money(pA/100)} × 12 + ${v.money(Math.min(care,dA)/100)} = ${v.money(tA/100)}. B: ${v.money(pB/100)} × 12 + ${v.money(Math.min(care,dB)/100)} = ${v.money(tB/100)}.`,
      why:'Premium-vs-deductible is a tradeoff, not a hierarchy — the winner depends on the care level.'
    };
  } },
{ id:'health-insurance-compare-02', verb:'compare', part:5, tier:'independent', skill:'health-insurance',
  gen:(v)=>{
    const person=v.person();
    const copay=v.int(40,60)*100, n=4;
    const visitP=v.int(180,260)*100, pct=v.int(20,30);
    const copayT=copay*n, coinT=Math.round(visitP*pct/100)*n;
    return {
      context:`<p><b>Plan A:</b> ${v.money(copay/100)} specialist copay × ${n} visits = ${v.money(copayT/100)}.</p><p><b>Plan B:</b> ${pct}% coinsurance on ${v.money(visitP/100)} visits × ${n} = ${v.money(coinT/100)}.</p>`,
      q:`${person} expects ${n} specialist visits this year. Which plan\u2019s visit costs are lower?`,
      choices: copayT<coinT ? [
        {label:`Plan A — ${v.money(copayT/100)} in copays vs ${v.money(coinT/100)} in coinsurance`, ok:true},
        {label:`Plan B — percentages are always smaller than flat fees`, ok:false},
        {label:`Plan A — copays are always cheaper than coinsurance`, ok:false},
        {label:`They\u2019re equal — cost-sharing is cost-sharing`, ok:false}
      ] : [
        {label:`Plan B — ${v.money(coinT/100)} in coinsurance vs ${v.money(copayT/100)} in copays`, ok:true},
        {label:`Plan A — copays are always cheaper than coinsurance`, ok:false},
        {label:`Plan B — percentages are always smaller than flat fees`, ok:false},
        {label:`They\u2019re equal — cost-sharing is cost-sharing`, ok:false}
      ],
      hint:'Multiply it out: copay × visits vs visit price × % × visits.',
      good: copayT<coinT ? `Right — flat copays win here: ${v.money(copayT/100)} vs ${v.money(coinT/100)}.` : `Right — coinsurance wins here: ${v.money(coinT/100)} vs ${v.money(copayT/100)}. It depends on the visit price.`,
      bad:`A: ${n} × ${v.money(copay/100)} = ${v.money(copayT/100)}. B: ${n} × ${v.money(visitP/100)} × ${pct}% = ${v.money(coinT/100)}.`,
      why:'Copay-vs-coinsurance has no universal winner — the visit price decides, so run the visits.'
    };
  } },
{ id:'health-insurance-compare-03', verb:'compare', part:5, tier:'independent', skill:'health-insurance',
  gen:(v)=>{
    const person=v.person();
    const inC=v.int(200,400)*100, outC=inC*3;
    const proc=v.pick(['MRI','outpatient procedure','specialist consultation']);
    return {
      context:`<p><b>In-network:</b> your share of the ${proc} is about ${v.money(inC/100)}.</p><p><b>Out-of-network:</b> your share of the same ${proc} is about ${v.money(outC/100)}.</p>`,
      q:'Same procedure, same quality — which costs less?',
      choices:[
        {label:`In-network — ${v.money(inC/100)} vs ${v.money(outC/100)} for the identical ${proc}`, ok:true},
        {label:`Out-of-network — higher prices mean better care`, ok:false, mis:'network-doesnt-matter'},
        {label:`They\u2019re equal — insurance equalizes all prices`, ok:false, mis:'network-doesnt-matter'},
        {label:`Out-of-network — the extra cost is refunded later`, ok:false}
      ],
      hint:'Same procedure. Different network. Compare the two shares.',
      good:`Right — ${v.money(inC/100)} vs ${v.money(outC/100)}. The network is a 3× price difference on the same care.`,
      bad:`In-network share: ${v.money(inC/100)}. Out-of-network share: ${v.money(outC/100)}. Same ${proc}.`,
      why:'Networks are price lists — the same procedure has two different prices, and you choose which one you pay.'
    };
  } },
{ id:'health-insurance-compare-04', verb:'compare', part:6, tier:'independent', skill:'health-insurance',
  gen:(v)=>{
    const person=v.person();
    const pX=v.int(190,230)*100, dX=v.int(2800,3600)*100;
    const pY=v.int(300,350)*100, dY=v.int(400,700)*100;
    const care=1500*100;
    const tX=pX*12+Math.min(care,dX), tY=pY*12+Math.min(care,dY);
    return {
      context:`<p><b>Plan X:</b> ${v.money(pX/100)}/mo + ${v.money(dX/100)} deductible → ~${v.money(tX/100)}/year with $1,500 of care.</p><p><b>Plan Y:</b> ${v.money(pY/100)}/mo + ${v.money(dY/100)} deductible → ~${v.money(tY/100)}/year with $1,500 of care.</p>`,
      q:'Which plan costs less with $1,500 of expected care?',
      choices: tX<tY ? [
        {label:`Plan X — ~${v.money(tX/100)} vs ~${v.money(tY/100)}`, ok:true},
        {label:`Plan Y — the tiny deductible always wins`, ok:false},
        {label:`Plan X — low premiums always win`, ok:false, mis:'premium-is-total'},
        {label:`They\u2019re equal at $1,500 of care`, ok:false}
      ] : [
        {label:`Plan Y — ~${v.money(tY/100)} vs ~${v.money(tX/100)}`, ok:true},
        {label:`Plan X — low premiums always win`, ok:false, mis:'premium-is-total'},
        {label:`Plan Y — the tiny deductible always wins`, ok:false},
        {label:`They\u2019re equal at $1,500 of care`, ok:false}
      ],
      hint:'Yearly = premium × 12 + min(care, deductible).',
      good: tX<tY ? `Right — X\u2019s ~${v.money(tX/100)} beats Y\u2019s ~${v.money(tY/100)} here.` : `Right — Y\u2019s ~${v.money(tY/100)} beats X\u2019s ~${v.money(tX/100)} here.`,
      bad:`X: ${v.money(pX/100)} × 12 + ${v.money(Math.min(care,dX)/100)} = ${v.money(tX/100)}. Y: ${v.money(pY/100)} × 12 + ${v.money(Math.min(care,dY)/100)} = ${v.money(tY/100)}.`,
      why:'At a fixed care level, the tradeoff resolves to one number — run it, don\u2019t guess it.'
    };
  } },
{ id:'health-insurance-compare-05', verb:'compare', part:6, tier:'independent', skill:'health-insurance',
  gen:(v)=>{
    const person=v.person();
    const pA=v.int(180,230)*100, oopA=v.int(7000,9000)*100;
    const pB=v.int(300,360)*100, oopB=v.int(3500,5000)*100;
    const tA=pA*12+oopA, tB=pB*12+oopB;
    return {
      context:`<p><b>Plan A:</b> ${v.money(pA/100)}/mo + ${v.money(oopA/100)} OOP max → worst case ~${v.money(tA/100)}/year.</p><p><b>Plan B:</b> ${v.money(pB/100)}/mo + ${v.money(oopB/100)} OOP max → worst case ~${v.money(tB/100)}/year.</p>`,
      q:`${person} wants to know the worst-case year (major surgery — the OOP max gets hit). Which plan\u2019s worst case is cheaper?`,
      choices: tA<tB ? [
        {label:`Plan A — worst case ~${v.money(tA/100)} vs ~${v.money(tB/100)}`, ok:true},
        {label:`Plan B — lower OOP max always means cheaper worst case`, ok:false},
        {label:`Plan A — lower premiums always win`, ok:false, mis:'premium-is-total'},
        {label:`They\u2019re equal — worst cases are always the same`, ok:false}
      ] : [
        {label:`Plan B — worst case ~${v.money(tB/100)} vs ~${v.money(tA/100)}`, ok:true},
        {label:`Plan A — lower premiums always win`, ok:false, mis:'premium-is-total'},
        {label:`Plan B — lower OOP max always means cheaper worst case`, ok:false},
        {label:`They\u2019re equal — worst cases are always the same`, ok:false}
      ],
      hint:'Worst case = full year of premiums + the OOP max.',
      good: tA<tB ? `Right — A\u2019s worst case (~${v.money(tA/100)}) beats B\u2019s (~${v.money(tB/100)}).` : `Right — B\u2019s worst case (~${v.money(tB/100)}) beats A\u2019s (~${v.money(tA/100)}).`,
      bad:`A: ${v.money(pA/100)} × 12 + ${v.money(oopA/100)} = ${v.money(tA/100)}. B: ${v.money(pB/100)} × 12 + ${v.money(oopB/100)} = ${v.money(tB/100)}.`,
      why:'Worst-case math is premiums-plus-max — the "cheap" plan\u2019s max can outweigh its premium savings.'
    };
  } },
{ id:'health-insurance-compare-06', verb:'compare', part:6, tier:'independent', skill:'health-insurance',
  gen:(v)=>{
    const person=v.person();
    const uc=v.int(35,55)*100, er=v.int(450,650)*100;
    const issue=v.pick(['a sprained ankle','stitches for a cut','a painful ear infection']);
    return {
      context:`<p><b>Urgent care:</b> ${v.money(uc/100)} copay — treats ${issue} fully.</p><p><b>Emergency room:</b> ~${v.money(er/100)} cost-sharing — treats ${issue} fully.</p>`,
      q:`${issue} — not life-threatening. Which door costs less?`,
      choices:[
        {label:`Urgent care — ${v.money(uc/100)} vs ~${v.money(er/100)} for the same outcome`, ok:true},
        {label:`The ER — expensive care is better care`, ok:false},
        {label:`They\u2019re equal — insurance flattens all doors`, ok:false},
        {label:`The ER — the copay is waived for real injuries`, ok:false}
      ],
      hint:'Same outcome, two prices.',
      good:`Right — urgent care saves ~${v.money((er-uc)/100)} on a non-emergency.`,
      bad:`Urgent care: ${v.money(uc/100)}. ER: ~${v.money(er/100)}. Same ${issue}, ${v.money((er-uc)/100)} apart.`,
      why:'The door you walk through is a price choice — match severity to the cheapest adequate door.'
    };
  } },
{ id:'health-insurance-predict-01', verb:'predict', part:6, tier:'independent', skill:'health-insurance',
  gen:(v)=>{
    const person=v.person();
    return {
      q:`${person} picks a high-deductible plan to save on premiums, then avoids ALL care for the year "to keep costs at zero" — including free preventive visits. What is the likely consequence?`,
      choices:[
        {label:`Small catchable issues grow unchecked — and the free preventive care went unused`, ok:true},
        {label:`Perfect health — avoiding doctors prevents illness`, ok:false},
        {label:`The deductible drops to zero as a reward`, ok:false},
        {label:`Nothing — preventive care costs extra anyway`, ok:false}
      ],
      hint:'What did the plan cover at no cost?',
      good:`Right — dodging free preventive care to "save" is the worst trade in the plan: $0 visits skipped, problems compounding.`,
      bad:`Preventive visits cost $0 under most plans. Skipping them doesn\u2019t save — it just lets small issues become big ones.`,
      why:'High-deductible plans still cover prevention free — avoiding care doesn\u2019t avoid costs, it delays and multiplies them.'
    };
  } },
{ id:'health-insurance-predict-02', verb:'predict', part:6, tier:'independent', skill:'health-insurance',
  gen:(v)=>{
    const person=v.person();
    const bill=v.int(8000,15000)*100;
    return {
      q:`${person} schedules surgery without checking whether the surgeon is in-network. The bill arrives at ${v.money(bill/100)} — mostly out-of-network charges that don\u2019t count toward the deductible. What happens?`,
      choices:[
        {label:`${person} owes far more than the in-network path would have cost — and it doesn\u2019t credit toward the OOP max`, ok:true},
        {label:`The plan reprices it as in-network automatically`, ok:false, mis:'network-doesnt-matter'},
        {label:`The surgeon absorbs the difference as a courtesy`, ok:false},
        {label:`Out-of-network bills are legally unenforceable`, ok:false}
      ],
      hint:'Who was supposed to check the network?',
      good:`Right — one unchecked box (network status) turned a planned procedure into a ${v.money(bill/100)} uncapped bill.`,
      bad:`Out-of-network surgery bills at out-of-network rates and may not count toward limits. The 5-minute check would have rerouted it.`,
      why:'For big procedures, the network check IS the financial planning — everything else is details.'
    };
  } },
{ id:'health-insurance-predict-03', verb:'predict', part:6, tier:'independent', skill:'health-insurance',
  gen:(v)=>{
    const person=v.person();
    const oop=v.int(5000,7000)*100;
    return {
      q:`${person} hits the ${v.money(oop/100)} out-of-pocket maximum in March after a surgery. What do covered in-network visits cost for the rest of the year?`,
      choices:[
        {label:`$0 in cost-sharing — the plan pays 100% of covered in-network care once the max is hit`, ok:true},
        {label:`The usual copays — the max is just a suggestion`, ok:false},
        {label:`Double — the plan penalizes heavy users`, ok:false},
        {label:`Full price — the max resets every quarter`, ok:false}
      ],
      hint:'"Maximum" means maximum.',
      good:`Right — after the max, covered in-network care costs $0 in cost-sharing for the rest of the plan year. (Premiums still bill.)`,
      bad:`The OOP max is a ceiling: once hit, the plan covers 100% of covered in-network cost-sharing through year-end.`,
      why:'The out-of-pocket max is the light at the end of a bad year — once reached, the plan carries the rest.'
    };
  } },
{ id:'health-insurance-predict-04', verb:'predict', part:7, tier:'independent', skill:'health-insurance',
  gen:(v)=>{
    const person=v.person();
    return {
      q:`${person} misses the open-enrollment deadline, assuming "I can sign up whenever." What happens?`,
      choices:[
        {label:`No coverage until the next enrollment period (unless a qualifying life event occurs)`, ok:true},
        {label:`Coverage starts automatically — deadlines are flexible`, ok:false},
        {label:`The deadline extends for anyone who asks`, ok:false},
        {label:`You can enroll any Tuesday`, ok:false}
      ],
      hint:'What is a deadline FOR?',
      good:`Right — missed enrollment usually means waiting a full year, uninsured, unless a qualifying event opens a special window.`,
      bad:`Open enrollment is the window. Miss it without a qualifying life event and there\u2019s no coverage until next year.`,
      why:'Enrollment deadlines are gates, not suggestions — the calendar is part of the plan\u2019s price.'
    };
  } },
{ id:'health-insurance-predict-05', verb:'predict', part:7, tier:'independent', skill:'health-insurance',
  gen:(v)=>{
    const person=v.person();
    const spent=v.int(900,1600)*100;
    return {
      q:`${person} switches plans mid-year for a lower premium. The new plan\u2019s deductible starts at $0 — the ${v.money(spent/100)} already paid toward the old plan\u2019s deductible doesn\u2019t transfer. What is the consequence?`,
      choices:[
        {label:`${person} pays a fresh deductible — the ${v.money(spent/100)} of progress is wiped out`, ok:true},
        {label:`Deductibles transfer automatically between plans`, ok:false},
        {label:`The old plan refunds the ${v.money(spent/100)}`, ok:false},
        {label:`The new plan honors the old deductible as a courtesy`, ok:false}
      ],
      hint:'Each plan\u2019s deductible is its own counter.',
      good:`Right — mid-year switches reset the deductible clock. The ${v.money(spent/100)} bought nothing transferable.`,
      bad:`New plan, new deductible counter at $0. The ${v.money(spent/100)} already spent stays with the old plan.`,
      why:'Deductibles don\u2019t travel — switching mid-year means paying the entry fee twice.'
    };
  } },
{ id:'health-insurance-predict-06', verb:'predict', part:7, tier:'independent', skill:'health-insurance',
  gen:(v)=>{
    const person=v.person();
    return {
      q:`${person}'s plan covers an annual preventive checkup at $0 cost-sharing. ${person} skips it three years running "because nothing\u2019s wrong." What is the likely consequence?`,
      choices:[
        {label:`Preventable issues go undetected — the $0 visit that catches things early never happens`, ok:true},
        {label:`The plan rewards the skipped visits with lower premiums`, ok:false},
        {label:`Nothing — checkups are only for sick people`, ok:false},
        {label:`The $0 visits accumulate as account credit`, ok:false}
      ],
      hint:'What is prevention FOR?',
      good:`Right — three years of free early-detection skipped. Prevention only works if you show up.`,
      bad:`The checkup costs $0 and exists to catch things early. Skipping it saves nothing and risks everything it\u2019s designed to catch.`,
      why:'Free prevention is the highest-value line in the whole plan — $0 cost, priceless timing.'
    };
  } },
{ id:'health-insurance-build-01', verb:'build', part:7, tier:'independent', skill:'health-insurance',
  gen:(v)=>({
    h:'Build it: the yearly health budget',
    body:'<p>Split a $4,200 yearly health budget: premiums plus expected care costs.</p>',
    totalDollars:4200,
    buckets:[{id:'premiums',label:'Premiums'},{id:'copays',label:'Copays'},{id:'prescriptions',label:'Prescriptions'}],
    targets:{premiums:3600,copays:400,prescriptions:200},
    hint:'Yearly = monthly premium × 12, plus care lines.',
    good:'Right — 3600 + 400 + 200 = 4,200. Premiums plus expected care.',
    bad:'Allocate: premiums 3600 (300×12), copays 400, prescriptions 200 = $4,200.',
    why:'A health budget is premiums-plus-care — both halves, every year.'
  }) },
{ id:'health-insurance-build-02', verb:'build', part:7, tier:'independent', skill:'health-insurance',
  gen:(v)=>({
    h:'Build it: the deductible fund',
    body:'<p>Split $2,500 to pre-fund a high-deductible year: the deductible itself plus routine costs.</p>',
    totalDollars:2500,
    buckets:[{id:'deductible',label:'Deductible set-aside'},{id:'copays',label:'Copays'},{id:'prescriptions',label:'Prescriptions'}],
    targets:{deductible:1500,copays:600,prescriptions:400},
    hint:'Fund the deductible BEFORE the care happens.',
    good:'Right — 1500 + 600 + 400 = 2,500. The deductible year is pre-funded.',
    bad:'Allocate: deductible set-aside 1500, copays 600, prescriptions 400 = $2,500.',
    why:'High-deductible plans work when the deductible is saved, not hoped for — pre-fund it like a bill.'
  }) },
{ id:'health-insurance-build-03', verb:'build', part:7, tier:'independent', skill:'health-insurance',
  gen:(v)=>({
    h:'Build it: the full-cost year',
    body:'<p>Split $6,000 across a full year of health costs on a mid-tier plan.</p>',
    totalDollars:6000,
    buckets:[{id:'premiums',label:'Premiums'},{id:'deductible',label:'Deductible'},{id:'copays',label:'Copays'}],
    targets:{premiums:4800,deductible:800,copays:400},
    hint:'Three lines, $6,000.',
    good:'Right — 4800 + 800 + 400 = 6,000. The whole year, priced.',
    bad:'Allocate: premiums 4800, deductible 800, copays 400 = $6,000.',
    why:'Constructing the full year on paper is how plan choices stop being guesses.'
  }) },
{ id:'health-insurance-build-04', verb:'build', part:7, tier:'independent', skill:'health-insurance',
  gen:(v)=>({
    h:'Build it: the light-care year',
    body:'<p>Split $1,800 for a healthy year: mostly premiums, light care.</p>',
    totalDollars:1800,
    buckets:[{id:'premiums',label:'Premiums'},{id:'copays',label:'Copays'},{id:'prescriptions',label:'Prescriptions'}],
    targets:{premiums:1200,copays:360,prescriptions:240},
    hint:'Light years are mostly premiums.',
    good:'Right — 1200 + 360 + 240 = 1,800. Even light years have three lines.',
    bad:'Allocate: premiums 1200, copays 360, prescriptions 240 = $1,800.',
    why:'Healthy years still cost premiums — budgeting the full picture keeps the light year honest.'
  }) },
{ id:'health-insurance-build-05', verb:'build', part:7, tier:'independent', skill:'health-insurance',
  gen:(v)=>({
    h:'Build it: the worst-case year',
    body:'<p>Split $9,000 — the true worst case: a full year of premiums PLUS the out-of-pocket max.</p>',
    totalDollars:9000,
    buckets:[{id:'premiums',label:'Premiums'},{id:'maxsharing',label:'Max cost-sharing'}],
    targets:{premiums:5400,maxsharing:3600},
    hint:'Premiums never count toward the max — add them.',
    good:'Right — 5400 + 3600 = 9,000. That\u2019s the real ceiling.',
    bad:'Allocate: premiums 5400, max cost-sharing 3600 = $9,000.',
    why:'The true worst case is premiums PLUS the OOP max — knowing the ceiling turns fear into a number.'
  }) },
{ id:'health-insurance-explain-01', verb:'explain', part:8, tier:'stretch', skill:'health-insurance',
  gen:(v)=>({
    h:'Teach it back: the three big terms',
    prompt:'Explain in your own words the difference between premium, deductible, and out-of-pocket maximum.',
    keyPoints:['Premium: what you pay to KEEP the plan, care or not','Deductible: what you pay FIRST on care before the plan\u2019s share','OOP max: the yearly ceiling on your cost-sharing','Premiums don\u2019t count toward the OOP max — worst case is both'],
    modelAnswer:'The premium is the monthly price of keeping the plan, paid whether you get care or not. The deductible is what you pay first on covered care before the plan starts sharing costs. The out-of-pocket maximum caps your yearly cost-sharing — but premiums never count toward it, so the true worst case is a full year of premiums plus the max.',
    hint:'Think: keep the plan, first on care, yearly ceiling.'
  }) },
{ id:'health-insurance-explain-02', verb:'explain', part:8, tier:'stretch', skill:'health-insurance',
  gen:(v)=>({
    h:'Teach it back: the premium trap',
    prompt:'Explain in your own words why comparing plans on premium alone fails.',
    keyPoints:['Premium is one of several yearly costs','Low premiums often pair with high deductibles','Total = premium × 12 + expected deductible/copay/coinsurance','The "cheapest" premium can be the priciest year'],
    modelAnswer:'The premium is just the entry fee — one of several yearly costs. Low-premium plans usually carry high deductibles, so the real comparison is premium times twelve plus expected deductible, copay, and coinsurance costs. Judged on premium alone, the most expensive year can win the "cheapest plan" contest.',
    hint:'Think: entry fee vs total bill.'
  }) },
{ id:'health-insurance-explain-03', verb:'explain', part:8, tier:'stretch', skill:'health-insurance',
  gen:(v)=>({
    h:'Teach it back: networks are money',
    prompt:'Explain in your own words how a provider network affects what you actually pay.',
    keyPoints:['In-network = contracted prices + normal cost-sharing','Out-of-network = higher share, may not count toward limits','A must-keep doctor is a plan constraint','Always verify network status before big procedures'],
    modelAnswer:'In-network providers bill at contracted prices with normal cost-sharing that counts toward your deductible and out-of-pocket max. Out-of-network care costs you more per visit and often doesn\u2019t credit toward those limits. If you must keep a specific doctor, that\u2019s a plan constraint — and before any big procedure, verifying network status is the financial planning.',
    hint:'Think: two price lists for the same care.'
  }) },
{ id:'health-insurance-explain-04', verb:'explain', part:8, tier:'stretch', skill:'health-insurance',
  gen:(v)=>({
    h:'Teach it back: the total-cost scenario',
    prompt:'Explain in your own words how to build a total-cost scenario for comparing two health plans.',
    keyPoints:['List each plan\u2019s premium, deductible, copays, OOP max, network','Estimate YOUR expected care for the year (visits, drugs)','Compute yearly total per plan: premiums + expected cost-sharing','Also compute the worst case: premiums + OOP max'],
    modelAnswer:'List each plan\u2019s premium, deductible, copay/coinsurance terms, out-of-pocket max, and network. Then estimate your own expected care — visits, prescriptions, any planned procedures. Compute each plan\u2019s yearly total as premiums plus expected cost-sharing, and also price the worst case (premiums plus the OOP max). Two scenarios per plan, and the comparison is honest.',
    hint:'Think: plan facts + your facts = two scenarios.'
  }) },
{ id:'health-insurance-explain-05', verb:'explain', part:8, tier:'stretch', skill:'health-insurance',
  gen:(v)=>({
    h:'Teach it back: advising a friend',
    prompt:'Explain in your own words the process you\u2019d walk a friend through to choose between two health plans.',
    keyPoints:['Start with THEIR expected care, not yours or anyone\u2019s','Check THEIR doctors against each plan\u2019s network','Run the yearly totals: premiums + expected cost-sharing','Compare worst cases too, then let them decide'],
    modelAnswer:'Start with their expected care — visits, prescriptions, must-keep doctors — never yours or a friend\u2019s. Check their doctors against each plan\u2019s network, then run the yearly totals: premiums plus expected cost-sharing for each plan. Compare the worst cases as well, lay both scenarios out, and let them choose. The process is the advice.',
    hint:'Think: whose numbers drive the choice?'
  }) },
]
};
