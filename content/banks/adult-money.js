// NWS variation bank: adult-money — 50 confirmed templates per lesson.
// Lessons: banking (parts 1-3) · first-job (parts 2-4) · credit (parts 3-5)
//          credit-cards (parts 4-6) · scams (parts 5-8)
// Verb spread per lesson: choice 8 · sort 6 · decide 8 · spot 6 · compare 6 · predict 6 · build 5 · explain 5 = 50.
export const BANK_ADULT_MONEY = { 'banking': [

/* ================= banking · choice (8) ================= */
{id:'banking-choice-01',verb:'choice',part:1,tier:'independent',skill:'banking',
gen:(v)=>{
  const person=v.person(), store=v.place();
  const bal=v.int(280,640), hold=v.int(35,85);
  return {
    q:`${person}'s banking app shows a balance of ${v.money(bal)} and a ${v.money(hold)} gas charge from ${store} marked "pending." What does "pending" mean here?`,
    choices:v.shuffle([
      {label:`The ${v.money(hold)} is reserved by the gas station, but the final charge has not posted yet.`,ok:true},
      {label:`The ${v.money(hold)} is still fully available to spend on other things.`,ok:false,mis:'pending-is-cash'},
      {label:`The whole ${v.money(bal)} balance is frozen until the gas charge clears.`,ok:false,mis:'balance-not-available'},
      {label:`The pending charge is a bank error that will disappear on its own.`,ok:false}
    ]),
    hint:'Pending sits between "started" and "finished."',
    good:'Pending = reserved, not final. The station holds the money so it cannot be spent twice, and the exact amount can still change when it posts.',
    bad:'Recheck what "pending" guards against: spending the same money twice before the final amount lands.',
    why:'A pending transaction reserves money before it posts; the final posted amount can differ from the hold.'
  };
}},
{id:'banking-choice-02',verb:'choice',part:1,tier:'independent',skill:'banking',
gen:(v)=>{
  const person=v.person();
  return {
    q:`${person} wants to know which charges are fully finished and settled today — nothing still moving. Which list in the app shows that?`,
    choices:v.shuffle([
      {label:'The "posted transactions" list.',ok:true},
      {label:'The "pending transactions" list.',ok:false,mis:'pending-is-cash'},
      {label:'The scheduled autopay list.',ok:false},
      {label:'The big balance number at the top of the screen.',ok:false,mis:'balance-not-available'}
    ]),
    hint:'Finished means the bank has fully processed it.',
    good:'Posted = done and settled. Pending = still moving. Scheduled = has not happened yet.',
    bad:'The big number mixes finished and unfinished activity. Look for the list labeled "posted."',
    why:'Only posted transactions are final; pending and scheduled amounts can still change or arrive late.'
  };
}},
{id:'banking-choice-03',verb:'choice',part:1,tier:'independent',skill:'banking',
gen:(v)=>{
  const person=v.person();
  const dep=v.int(250,600);
  return {
    q:`A ${v.money(dep)} paycheck shows in ${person}'s app as a "pending deposit." Can ${person} safely spend that money right now?`,
    choices:v.shuffle([
      {label:'No — a pending deposit can still be delayed or adjusted; only spend what has posted.',ok:true},
      {label:'Yes — it shows in the app, so it is spendable cash.',ok:false,mis:'pending-is-cash'},
      {label:'No, but the bank will quietly cover any gap for free until it posts.',ok:false,mis:'overdraft-as-backup'},
      {label:'Yes — half of any pending deposit is always available immediately.',ok:false,mis:'guess-is-good-enough'}
    ]),
    hint:'"Pending" applies to money coming in, too.',
    good:'Money moving in can stall or be corrected before it posts. Treat a pending deposit like a promise, not cash in hand.',
    bad:'If the deposit posts a day late, every dollar spent against it can trigger a fee.',
    why:'Until a deposit posts, it is not guaranteed usable money — spending against it is spending money you do not have yet.'
  };
}},
{id:'banking-choice-04',verb:'choice',part:3,tier:'guided',skill:'banking',
gen:(v)=>{
  const person=v.person();
  const bal=210, bill=60, dinner=45, free=bal-bill;
  return {
    q:`${person}'s app shows ${v.money(bal)}. A ${v.money(bill)} electric autopay is scheduled for tomorrow. ${person} wants a ${v.money(dinner)} dinner tonight. What is the call?`,
    cue:`First protect the scheduled bill: ${v.money(bal)} − ${v.money(bill)} = ${v.money(free)} actually free. Now compare the dinner to that.`,
    choices:v.shuffle([
      {label:`Dinner fits: after the ${v.money(bill)} bill, ${v.money(free)} stays free — the ${v.money(dinner)} dinner leaves ${v.money(free-dinner)}.`,ok:true},
      {label:`Spend the dinner money freely; the app shows ${v.money(bal)}, so all of it is available.`,ok:false,mis:'balance-not-available'},
      {label:`Cancel the autopay so the full ${v.money(bal)} is free for dinner tonight.`,ok:false},
      {label:`Go to dinner and let overdraft coverage quietly handle the electric bill.`,ok:false,mis:'overdraft-as-backup'}
    ]),
    hint:'Scheduled money is already spent in every way that matters.',
    good:`Dinner happens AND the lights stay on: ${v.money(bal)} − ${v.money(bill)} − ${v.money(dinner)} = ${v.money(free-dinner)} left after the bill posts.`,
    bad:'The app number lied by omission — the scheduled bill was already spoken for before tonight was planned.',
    why:'Available money = what you see minus what is already scheduled. Decide with the remainder, never the headline number.'
  };
}},
{id:'banking-choice-05',verb:'choice',part:3,tier:'guided',skill:'banking',
gen:(v)=>{
  const person=v.person();
  const bal=80, hold=65, groc=25, free=bal-hold;
  return {
    q:`${person}'s app shows ${v.money(bal)}, but a ${v.money(hold)} gas-station hold from yesterday is still pending. Can ${person} buy ${v.money(groc)} of groceries today?`,
    cue:`Pending money is already spoken for: ${v.money(bal)} − ${v.money(hold)} = ${v.money(free)} truly free.`,
    choices:v.shuffle([
      {label:`No — only ${v.money(free)} is really free once the ${v.money(hold)} hold posts.`,ok:true},
      {label:`Yes — the app shows ${v.money(bal)}, and the hold is not final yet.`,ok:false,mis:'pending-is-cash'},
      {label:`Yes — overdraft coverage will quietly fill any small gap.`,ok:false,mis:'overdraft-as-backup'},
      {label:`Yes — the hold will probably drop to about $20, so there is room.`,ok:false,mis:'guess-is-good-enough'}
    ]),
    hint:'A hold you cannot see through is still a hold.',
    good:`The $${hold} hold will post at some amount near $${hold}; planning around only $${free} keeps the groceries from bouncing the account.`,
    bad:'"Probably drops" is a guess, and the account does not grade on guesses — it grades on posted amounts.',
    why:'Holds reserve money even while the final charge is unknown. Budget against the hold, not around it.'
  };
}},
{id:'banking-choice-06',verb:'choice',part:3,tier:'guided',skill:'banking',
gen:(v)=>{
  const person=v.person();
  const shown=100, dep=300, rent=280, after=shown+dep-rent;
  return {
    q:`Rent of ${v.money(rent)} is due tomorrow. ${person}'s app shows ${v.money(shown)}, and a ${v.money(dep)} paycheck is pending. Can ${person} spend $60 on shoes today?`,
    cue:`Nothing is spendable until it posts. What has actually posted? Only the ${v.money(shown)}.`,
    choices:v.shuffle([
      {label:`Not today — wait for the ${v.money(dep)} to post; then ${v.money(shown)} + ${v.money(dep)} − ${v.money(rent)} = ${v.money(after)} is real.`,ok:true},
      {label:`Yes — ${v.money(shown)} + ${v.money(dep)} = ${v.money(shown+dep)}, so $60 is fine.`,ok:false,mis:'pending-is-cash'},
      {label:`Yes — rent is not due until tomorrow, so today's money is free.`,ok:false,mis:'spend-before-obligation'},
      {label:`Buy the shoes and pay rent a day late; one late day never matters.`,ok:false}
    ]),
    hint:'Tomorrow\u2019s bill spends today\u2019s money.',
    good:'Patience turns a maybe into math: once the deposit posts, the $60 fits inside a real $120 surplus.',
    bad:'Spending the deposit before it lands means the rent is competing with shoes for money that is not there yet.',
    why:'Scheduled obligations are claimed against posted money. Until the deposit posts, the rent owns the $100.'
  };
}},
{id:'banking-choice-07',verb:'choice',part:3,tier:'guided',skill:'banking',
gen:(v)=>{
  const person=v.person();
  const bal=45, bill=40, hold=35, item=30, short=bill+hold-bal;
  return {
    q:`${person} has ${v.money(bal)} in the account, a ${v.money(bill)} bill scheduled for tomorrow, and a ${v.money(hold)} hold still pending. ${person} is eyeing a ${v.money(item)} purchase. What happens if they buy it?`,
    cue:`Add up what is already claimed: ${v.money(bill)} + ${v.money(hold)} = ${v.money(bill+hold)} against ${v.money(bal)}. The account is already ${v.money(short)} short — before the purchase.`,
    choices:v.shuffle([
      {label:`No — the account is already ${v.money(short)} short before the purchase; that buy triggers an overdraft.`,ok:true},
      {label:`Yes — overdraft coverage exists for exactly this kind of moment.`,ok:false,mis:'overdraft-as-backup'},
      {label:`Yes — pending holds do not count until they post, so the money is there.`,ok:false,mis:'pending-is-cash'},
      {label:`Yes — the ${v.money(item)} fits inside the ${v.money(bal)} shown.`,ok:false,mis:'balance-not-available'}
    ]),
    hint:'Stack the claims before judging the purchase.',
    good:'The math was already red: $45 − $40 − $35 = −$30. The $30 item does not cause the problem — it just makes a visible one.',
    bad:'Overdraft "coverage" is a fee with a friendly name. The account was short before the cart was ever opened.',
    why:'When scheduled bills plus pending holds exceed the balance, the account is already overdrawn in practice — any new spend just triggers the fee.'
  };
}},
{id:'banking-choice-08',verb:'choice',part:3,tier:'guided',skill:'banking',
gen:(v)=>{
  const person=v.person();
  return {
    q:`${person} has overdrafted twice this year on small forgotten charges. Which habit actually prevents the next accidental overdraft?`,
    cue:'The two overdrafts came from charges nobody saw coming. What would have made them visible in time?',
    choices:v.shuffle([
      {label:'Turn on low-balance alerts and keep a written list of every scheduled bill with its date.',ok:true},
      {label:'Keep overdraft coverage on and treat it as a backup plan for tight weeks.',ok:false,mis:'overdraft-as-backup'},
      {label:'Estimate the monthly bills roughly — close enough works most of the time.',ok:false,mis:'guess-is-good-enough'},
      {label:'Check the balance once a month; that is plenty for a simple account.',ok:false}
    ]),
    hint:'You cannot dodge what you cannot see.',
    good:'Alerts make the invisible visible, and the bill list turns "forgotten" into "scheduled." Both are free; overdrafts are not.',
    bad:'A backup plan that charges $35 a use is not a backup plan — it is a subscription to your own mistakes.',
    why:'Accidental overdrafts come from unseen claims on the account. Early warnings plus a scheduled-bill list remove the surprise.'
  };
}},

/* ================= banking · sort (6) ================= */
{id:'banking-sort-01',verb:'sort',part:2,tier:'independent',skill:'banking',
gen:(v)=>({
  h:'Sort it: where does each event live right now?',
  body:'<p>Drag each banking event into the bucket that matches its current state.</p>',
  buckets:['Posted','Pending','Scheduled'],
  items:v.shuffle([
    {label:'Gas hold: $50 (authorized yesterday)',a:'pending',why:'A hold reserves money; the final charge has not posted.'},
    {label:'Grocery charge from Tuesday: $62',a:'posted',why:'It cleared days ago — fully settled.'},
    {label:'Rent autopay set for Friday: $700',a:'scheduled',why:'It has a future date; nothing has moved yet.'},
    {label:'Paycheck deposited Monday: $540',a:'posted',why:'Deposited and cleared — usable money.'},
    {label:'Coffee this morning, still processing: $6',a:'pending',why:'Still moving through the system.'},
    {label:'Phone bill autopay on the 15th: $45',a:'scheduled',why:'A future-dated automatic payment.'},
    {label:'ATM withdrawal last week: $40',a:'posted',why:'Cash out and settled.'},
    {label:'Streaming charge clearing tonight: $12',a:'pending',why:'Clearing tonight means it has not posted yet.'}
  ])
})},
{id:'banking-sort-02',verb:'sort',part:2,tier:'independent',skill:'banking',
gen:(v)=>({
  h:'Sort it: bill events by state',
  body:'<p>Sort each bill-related event into posted, pending, or scheduled.</p>',
  buckets:['Posted','Pending','Scheduled'],
  items:v.shuffle([
    {label:'Electric autopay this Friday: $60',a:'scheduled',why:'Future-dated autopay.'},
    {label:'Water bill due the 28th: $38',a:'scheduled',why:'Due later this month — not yet paid.'},
    {label:'Last month\u2019s rent (cleared): $700',a:'posted',why:'Cleared = posted.'},
    {label:'Insurance charge processing: $95',a:'pending',why:'Processing means not yet posted.'},
    {label:'Internet bill scheduled Monday: $55',a:'scheduled',why:'Set for a future date.'},
    {label:'Gym fee posted yesterday: $25',a:'posted',why:'Posted yesterday — settled.'}
  ])
})},
{id:'banking-sort-03',verb:'sort',part:2,tier:'independent',skill:'banking',
gen:(v)=>({
  h:'Sort it: payday-week money movement',
  body:'<p>It is payday week. Sort each money event by its current state.</p>',
  buckets:['Posted','Pending','Scheduled'],
  items:v.shuffle([
    {label:'Paycheck pending deposit: $820',a:'pending',why:'Pending deposit — not yet usable.'},
    {label:'Bonus scheduled next Friday: $150',a:'scheduled',why:'A future payout date.'},
    {label:'Last check, cleared: $790',a:'posted',why:'Cleared and settled.'},
    {label:'Transfer still processing: $200',a:'pending',why:'Still moving between accounts.'},
    {label:'Side-gig payout scheduled Monday: $120',a:'scheduled',why:'Has not arrived yet.'},
    {label:'Cash tip deposited at the ATM: $45',a:'posted',why:'Deposited cash posts immediately.'}
  ])
})},
{id:'banking-sort-04',verb:'sort',part:2,tier:'independent',skill:'banking',
gen:(v)=>({
  h:'Sort it: subscription charges',
  body:'<p>Subscriptions hit at different times. Sort each one.</p>',
  buckets:['Posted','Pending','Scheduled'],
  items:v.shuffle([
    {label:'Streaming renewing on the 3rd: $16',a:'scheduled',why:'Renews on a future date.'},
    {label:'Music app charge processing: $11',a:'pending',why:'Processing = pending.'},
    {label:'Last month\u2019s streaming (settled): $16',a:'posted',why:'Settled last month.'},
    {label:'Annual fee scheduled December: $60',a:'scheduled',why:'Months away — scheduled.'},
    {label:'Trial charge clearing tonight: $5',a:'pending',why:'Clearing tonight, not yet posted.'},
    {label:'Canceled service, refund pending: $20',a:'pending',why:'Refunds also pass through pending.'}
  ])
})},
{id:'banking-sort-05',verb:'sort',part:2,tier:'independent',skill:'banking',
gen:(v)=>({
  h:'Sort it: card swipes, holds, and checks',
  body:'<p>Not every debit behaves the same. Sort each event.</p>',
  buckets:['Posted','Pending','Scheduled'],
  items:v.shuffle([
    {label:'Debit swipe at lunch, processing: $14',a:'pending',why:'Processing swipe.'},
    {label:'Debit swipe yesterday, cleared: $22',a:'posted',why:'Cleared yesterday.'},
    {label:'Cash withdrawn Friday: $60',a:'posted',why:'Withdrawn and settled.'},
    {label:'Rent check mailed, not cashed: $700',a:'scheduled',why:'Written but not yet presented — a future claim.'},
    {label:'Gas pump hold: $75',a:'pending',why:'A hold is pending by definition.'},
    {label:'Zelle sent, still processing: $50',a:'pending',why:'Still moving.'}
  ])
})},
{id:'banking-sort-06',verb:'sort',part:2,tier:'independent',skill:'banking',
gen:(v)=>({
  h:'Sort it: refunds and surprises',
  body:'<p>Refunds and holds count too. Sort each event.</p>',
  buckets:['Posted','Pending','Scheduled'],
  items:v.shuffle([
    {label:'Return refund processing back to card: $40',a:'pending',why:'Refund still traveling back.'},
    {label:'Last week\u2019s posted refund: $18',a:'posted',why:'Posted and settled.'},
    {label:'Subscription renewal Friday: $13',a:'scheduled',why:'Future renewal date.'},
    {label:'Double-charge hold from hotel: $120',a:'pending',why:'A hold, even a mistaken one.'},
    {label:'Rent autopay next week: $700',a:'scheduled',why:'Next week — scheduled.'},
    {label:'ATM fee posted: $3',a:'posted',why:'Small, but settled.'}
  ])
})},

/* ================= banking · decide (8) ================= */
{id:'banking-decide-01',verb:'decide',part:3,tier:'guided',skill:'banking',
gen:(v)=>{
  const person=v.person();
  const bal=72, bill=55, fun=25, free=bal-bill;
  return {
    q:`${person}'s app shows ${v.money(bal)}. A ${v.money(bill)} autopay hits tomorrow, and friends want ${person} at a ${v.money(fun)} game tonight. What is the call?`,
    cue:`Known bills eat first: ${v.money(bal)} − ${v.money(bill)} = ${v.money(free)} truly free. Compare the night out to that.`,
    choices:v.shuffle([
      {label:`Skip the game: only ${v.money(free)} stays free after the autopay, and a bounced bill costs more than a missed night.`,ok:true},
      {label:`Go tonight — the bill does not leave until tomorrow, so today's money is free.`,ok:false,mis:'spend-before-obligation'},
      {label:`Go — overdraft coverage will quietly handle the ${v.money(bill-fun)} gap.`,ok:false,mis:'overdraft-as-backup'},
      {label:`Go, but pay the bill late next week so tonight fits.`,ok:false}
    ]),
    hint:'The bill is already holding that money.',
    good:`Bill protected: ${v.money(bal)} − ${v.money(bill)} = ${v.money(free)} free; the ${v.money(fun)} plan does not fit. The routine puts the Need (the autopay) before the Want.`,
    bad:'"Tomorrow\u2019s problem" becomes a $35 fee when the autopay hits an account that funded a game instead.',
    why:'Decide with money after scheduled obligations, not the headline balance — obligations are claimed first whether you feel it or not.'
  };
}},
{id:'banking-decide-02',verb:'decide',part:3,tier:'guided',skill:'banking',
gen:(v)=>{
  const person=v.person();
  const shown=90, payout=180, auto=150, item=40, after=shown+payout-auto;
  return {
    q:`${person}'s app shows ${v.money(shown)}. A ${v.money(payout)} side-gig payout is pending, and a ${v.money(auto)} card autopay hits Friday. ${person} wants ${v.money(item)} headphones today (Tuesday). What is the call?`,
    cue:`Posted money today: ${v.money(shown)}. Posted money Friday: ${v.money(shown)} + ${v.money(payout)} − ${v.money(auto)} = ${v.money(after)}.`,
    choices:v.shuffle([
      {label:`Wait until Friday: once the payout posts, ${v.money(after)} is real and the ${v.money(item)} fits.`,ok:true},
      {label:`Buy now — the ${v.money(payout)} is basically already here.`,ok:false,mis:'pending-is-cash'},
      {label:`Buy now — the autopay is three days away, so it does not count yet.`,ok:false,mis:'spend-before-obligation'},
      {label:`Buy now and let overdraft bridge whatever gap appears Friday.`,ok:false,mis:'overdraft-as-backup'}
    ]),
    hint:'Tuesday money and Friday money are different piles.',
    good:'Waiting three days converts a risky guess into settled math — and the headphones still fit.',
    bad:'If the payout posts even one day late, Friday\u2019s autopay collides with Tuesday\u2019s headphones.',
    why:'Spend posted money against scheduled obligations first; pending money becomes real only when it posts.'
  };
}},
{id:'banking-decide-03',verb:'decide',part:3,tier:'guided',skill:'banking',
gen:(v)=>{
  const person=v.person(), friend=v.person();
  const bal=200, bill=180, loan=50, free=bal-bill;
  return {
    q:`${person} has ${v.money(bal)}. A ${v.money(bill)} insurance bill is scheduled Friday. ${friend} asks to borrow ${v.money(loan)} until next week. What is the call?`,
    cue:`${v.money(bal)} − ${v.money(bill)} = ${v.money(free)} free. The loan asks for ${v.money(loan)}.`,
    choices:v.shuffle([
      {label:`Say no for now — lending ${v.money(loan)} leaves ${v.money(bal-loan)} when ${v.money(bill)} is due; an IOU does not pay the bill.`,ok:true},
      {label:`Lend it — helping a friend matters more than the timing.`,ok:false},
      {label:`Lend half (${v.money(25)}) as a compromise; that should be safe.`,ok:false,mis:'guess-is-good-enough'},
      {label:`Lend the full ${v.money(loan)} — overdraft coverage will handle Friday if needed.`,ok:false,mis:'overdraft-as-backup'}
    ]),
    hint:'Generosity needs a funded source.',
    good:'A no today protects both the bill and the friendship — lending money you do not have free turns help into a second problem.',
    bad:'Splitting the loan still breaks the bill: $200 − $25 = $175 against a $180 claim. Almost-safe is still short.',
    why:'Lend only from money that is free after scheduled obligations; otherwise you are borrowing from your own bills to fund someone else.'
  };
}},
{id:'banking-decide-04',verb:'decide',part:3,tier:'guided',skill:'banking',
gen:(v)=>{
  const person=v.person();
  return {
    q:`${person}'s low-balance alert fires: $25 left, payday is Friday, and it is Thursday lunch. The caf\u00e9 line is calling. What is the call?`,
    cue:'The alert is the smoke detector. What does a smoke detector ask you to do — ignore it, or act?',
    choices:v.shuffle([
      {label:'Pack a lunch from home and keep the $25 buffer untouched until payday.',ok:true},
      {label:'Buy the $14 lunch — $25 is still positive, so it is fine.',ok:false,mis:'balance-not-available'},
      {label:'Turn off the alert so it stops stressing them out.',ok:false},
      {label:'Buy lunch and move $20 from savings to cover it.',ok:false,mis:'spend-pending-save-cash'}
    ]),
    hint:'Alerts are early warnings, not decorations.',
    good:'The buffer survives to Friday, and Friday\u2019s paycheck arrives into a calm account instead of a rescue mission.',
    bad:'One $14 lunch leaves $11 — and any forgotten $12 renewal turns the last day before payday into an overdraft.',
    why:'A low-balance alert marks the line where every remaining dollar is spoken for. Respect the line and the buffer does its job.'
  };
}},
{id:'banking-decide-05',verb:'decide',part:3,tier:'guided',skill:'banking',
gen:(v)=>{
  const person=v.person(), store=v.place();
  const shown=110, hold=75, real=52, groc=60, safe=shown-hold;
  return {
    q:`${person} filled up at ${store}: a ${v.money(hold)} hold is pending, though the real fill will be about ${v.money(real)}. The app shows ${v.money(shown)}. ${person} wants ${v.money(groc)} of groceries. What is the call?`,
    cue:`The bank sees the ${v.money(hold)} hold, not your estimate. Safe math uses the hold: ${v.money(shown)} − ${v.money(hold)} = ${v.money(safe)}.`,
    choices:v.shuffle([
      {label:`Treat the ${v.money(hold)} as gone: only ${v.money(safe)} is safe until the hold clears at the real amount.`,ok:true},
      {label:`Shop the full ${v.money(groc)} — the hold is not the real charge, so it does not count.`,ok:false,mis:'pending-is-cash'},
      {label:`Assume the fill is ${v.money(real)} and spend ${v.money(shown-real)} on groceries.`,ok:false,mis:'guess-is-good-enough'},
      {label:`Buy the groceries; the hold always drops within an hour anyway.`,ok:false}
    ]),
    hint:'Budget against what the bank sees, not what you expect.',
    good:'Shopping to the $35 line keeps every charge covered whether the hold clears in an hour or in three days.',
    bad:'If the hold sits for two days, the $60 grocery run posts against a $75 hold — the account goes negative on a guess.',
    why:'Holds reserve the held amount regardless of the final charge. Plan with the hold until it is replaced by the real number.'
  };
}},
{id:'banking-decide-06',verb:'decide',part:3,tier:'guided',skill:'banking',
gen:(v)=>{
  const person=v.person();
  return {
    q:`${person}'s bank offers "overdraft protection": each overdraft pulls from savings with a $12 transfer fee. The alternative is free low-balance alerts plus a small buffer. Which setup should ${person} choose?`,
    cue:'One option charges per mistake. The other warns before the mistake. Which one makes mistakes cheaper — or rarer?',
    choices:v.shuffle([
      {label:'Skip the transfer-fee plan: use free alerts and keep a buffer so overdrafts rarely happen at all.',ok:true},
      {label:'Take the protection — $12 a use is cheap insurance for tight weeks.',ok:false,mis:'overdraft-as-backup'},
      {label:'Take the protection and stop watching the balance; that is what it is for.',ok:false,mis:'overdraft-as-backup'},
      {label:'Decline both — checking the app once a month is enough discipline.',ok:false}
    ]),
    hint:'Compare what each option costs when things go wrong.',
    good:'Free alerts prevent most overdrafts; the buffer absorbs the rest. The fee plan monetizes the exact mistakes the free tools prevent.',
    bad:'$12 per transfer across a year of tight weeks quietly becomes a subscription to your own overdrafts.',
    why:'Protection that charges per use is priced for the bank, not for you. Prevention (alerts + buffer) beats paid rescue.'
  };
}},
{id:'banking-decide-07',verb:'decide',part:3,tier:'guided',skill:'banking',
gen:(v)=>{
  const person=v.person();
  const bal=120, bill=95, date=60, cap=bal-bill;
  return {
    q:`It is Saturday. ${person} has ${v.money(bal)}, a ${v.money(bill)} phone bill due Monday, and a ${v.money(date)} date night planned. What is the call?`,
    cue:`Monday already owns part of Saturday\u2019s money: ${v.money(bal)} − ${v.money(bill)} = ${v.money(cap)} free.`,
    choices:v.shuffle([
      {label:`Cap the date at ${v.money(cap)}: the bill stays protected and the night still happens.`,ok:true},
      {label:`Spend the ${v.money(date)} — the bill can wait until Tuesday.`,ok:false,mis:'spend-before-obligation'},
      {label:`Spend freely; the ${v.money(bal)} shown is all available since the bill is not due yet.`,ok:false,mis:'balance-not-available'},
      {label:`Put the date on a credit card so the ${v.money(bal)} covers the bill.`,ok:false,mis:'borrow-to-spend'}
    ]),
    hint:'A capped plan beats a canceled plan.',
    good:'$25 of fun with the bill safe beats $60 of fun plus a late fee and a Monday scramble.',
    bad:'Monday\u2019s bill does not negotiate because Saturday was fun. The $95 is claimed whether it is felt or not.',
    why:'Future-dated obligations shrink today\u2019s free money. Cap the Want to the remainder and both survive.'
  };
}},
{id:'banking-decide-08',verb:'decide',part:3,tier:'guided',skill:'banking',
gen:(v)=>{
  const person=v.person(), mate=v.person();
  const check=900, rent=700, share=80, after=check-rent-share;
  return {
    q:`Payday: a ${v.money(check)} check is pending, ${v.money(rent)} rent is due tomorrow, and roommate ${mate} wants the ${v.money(share)} utility share today. What is the call?`,
    cue:`Today\u2019s posted money vs tomorrow\u2019s posted money. Which pile pays the rent?`,
    choices:v.shuffle([
      {label:`Wait for the check to post, then pay: ${v.money(check)} − ${v.money(rent)} − ${v.money(share)} = ${v.money(after)} works cleanly.`,ok:true},
      {label:`Pay ${mate} now — the ${v.money(check)} is basically here already.`,ok:false,mis:'pending-is-cash'},
      {label:`Pay rent from the pending check today so it is "handled."`,ok:false,mis:'pending-is-cash'},
      {label:`Tell ${mate} the share will have to wait until next month.`,ok:false}
    ]),
    hint:'Promises do not clear rent.',
    good:'One day of patience turns three competing claims into one clean sequence: deposit posts, rent clears, roommate gets paid.',
    bad:'Paying from a pending check means the rent is racing money that has not arrived — and rent never wins ties gracefully.',
    why:'Large scheduled bills should be paid from posted money. Pending income becomes a plan only after it posts.'
  };
}},

/* ================= banking · spot (6) ================= */
{id:'banking-spot-01',verb:'spot',part:2,tier:'independent',skill:'banking',
gen:(v)=>{
  const person=v.person();
  return {
    scenario:`<p>${person}\u2019s note before a shopping trip:</p><ul><li>App balance: $340</li><li>Rent due Friday: $300</li><li>Plan: spend up to $340 today</li><li>Safe to spend: $340</li></ul>`,
    q:'What is the mistake here?',
    choices:v.shuffle([
      {label:'They treated the full $340 as spendable and never subtracted the $300 rent due Friday.',ok:true},
      {label:'They should have spent the $300 rent money first, then shopped.',ok:false,mis:'spend-before-obligation'},
      {label:'The mistake is checking the app at all — the number is always wrong.',ok:false},
      {label:'They should have waited for the rent to post before planning anything.',ok:false}
    ]),
    hint:'One of those lines is already claimed.',
    good:'"Safe to spend" is $340 − $300 = $40. The rent line was read and then ignored.',
    bad:'The rent did not disappear because the plan ignored it — it is still due Friday.',
    why:'A balance read that skips scheduled obligations is not a plan; it is a wish with numbers.'
  };
}},
{id:'banking-spot-02',verb:'spot',part:2,tier:'independent',skill:'banking',
gen:(v)=>{
  const person=v.person();
  return {
    scenario:`<p>${person}\u2019s "money I can spend today" list:</p><ul><li>Posted balance: $120</li><li>Paycheck (pending deposit): $400</li><li>Total available: $520</li></ul>`,
    q:'What is the mistake here?',
    choices:v.shuffle([
      {label:'The $400 pending deposit was counted as posted cash — only $120 is actually usable today.',ok:true},
      {label:'The math is wrong: $120 + $400 is $420, not $520.',ok:false},
      {label:'Pending deposits should be counted double, since they are guaranteed.',ok:false,mis:'pending-is-cash'},
      {label:'The mistake is listing the posted balance first.',ok:false}
    ]),
    hint:'One of those dollars has not arrived yet.',
    good:'Pending ≠ posted. Until the $400 lands, "available" is $120 — the list spent $400 of promise.',
    bad:'Arithmetic was not the problem; the category was. A pending deposit is a future event wearing today\u2019s clothes.',
    why:'Money you can spend today = posted balance minus pending claims. Pending deposits join the plan only after they post.'
  };
}},
{id:'banking-spot-03',verb:'spot',part:2,tier:'independent',skill:'banking',
gen:(v)=>{
  const person=v.person();
  return {
    scenario:`<p>${person} filled the tank and wrote in the budget app:</p><ul><li>Gas hold (pending): logged as $60 spent</li><li>Gas budget: another $50 reserved "for when it posts"</li></ul>`,
    q:'What is the mistake here?',
    choices:v.shuffle([
      {label:'They counted the hold as the final charge AND reserved for it again — one fill-up is holding $110 hostage.',ok:true},
      {label:'They should have logged the hold as $0 since it is not final.',ok:false,mis:'pending-is-cash'},
      {label:'The mistake is budgeting for gas at all.',ok:false},
      {label:'They should delete the hold and wait for the final charge to appear.',ok:false}
    ]),
    hint:'The hold and the final charge are the same purchase — not two.',
    good:'The $60 hold will be replaced by the real charge (~$45). Reserving twice locks up money the car never burned.',
    bad:'Ignoring the hold entirely is the opposite error — then the real charge arrives as a surprise.',
    why:'A hold is a placeholder for the final charge, not an additional charge. Track it once, at the held amount, until it posts.'
  };
}},
{id:'banking-spot-04',verb:'spot',part:3,tier:'guided',skill:'banking',
gen:(v)=>{
  const person=v.person();
  return {
    scenario:`<p>${person} turned off low-balance alerts because "they were stressful," then overdrafted when a $9 subscription renewed three days before payday.</p>`,
    q:'What is the mistake here?',
    cue:'The alerts were the smoke detector, not the fire. What did turning them off actually fix?',
    choices:v.shuffle([
      {label:'They removed the early warning instead of fixing the cause — the $9 renewal hit an account nobody was watching.',ok:true},
      {label:'The mistake was the $9 subscription; all subscriptions cause overdrafts.',ok:false},
      {label:'They should have turned off the subscription instead of the alerts — alerts are useless.',ok:false},
      {label:'The bank should have declined the $9 charge automatically.',ok:false,mis:'overdraft-as-backup'}
    ]),
    hint:'Stressful news is still news.',
    good:'The alert would have shown $9 of danger three days early — time to move money or pause the renewal.',
    bad:'Silencing the warning did not silence the renewal. The fee arrived exactly on schedule; only the warning was canceled.',
    why:'Alerts convert surprise charges into visible ones. Discomfort with the signal is a reason to act on it, not mute it.'
  };
}},
{id:'banking-spot-05',verb:'spot',part:3,tier:'guided',skill:'banking',
gen:(v)=>{
  const person=v.person();
  return {
    scenario:`<p>${person} moved $100 to savings on the 28th, proud of the habit. On the 1st, the $650 rent autopay posted — and the account overdrafted by $40.</p>`,
    q:'What is the mistake here?',
    cue:'Scheduled money moves first; savings moves second. Which order did they use?',
    choices:v.shuffle([
      {label:'Savings came before the scheduled bill — the rent posted against whatever was left after the $100 moved.',ok:true},
      {label:'They saved too much; $100 is an unsafe amount for anyone.',ok:false},
      {label:'The mistake was using autopay — manual payments never overdraft.',ok:false},
      {label:'They should have saved the $100 after the overdraft to rebuild faster.',ok:false,mis:'guess-is-good-enough'}
    ]),
    hint:'Good habits in the wrong order still break.',
    good:'Save after the scheduled bills clear, not before. The habit is right; the sequence was backwards.',
    bad:'The $100 did not cause the overdraft alone — the $100 moving before the $650 did.',
    why:'Savings is a claim you choose; rent is a claim you owe. Fund the owed claims first, then save from the true remainder.'
  };
}},
{id:'banking-spot-06',verb:'spot',part:3,tier:'guided',skill:'banking',
gen:(v)=>{
  const person=v.person();
  return {
    scenario:`<p>${person} saw a "current balance" of $500, spent $480 on a weekend trip, then a $60 pending gas charge posted Monday. Overdraft fee: $35.</p>`,
    q:'What is the mistake here?',
    cue:'"Current balance" can include pending credits while pending debits are still traveling. Which balance should they have read?',
    choices:v.shuffle([
      {label:'They spent against the current balance instead of the available balance after pending charges.',ok:true},
      {label:'The $60 gas charge was fraudulent and should be disputed.',ok:false},
      {label:'They should have spent $500 exactly — the problem was leaving $20 unspent.',ok:false,mis:'balance-not-available'},
      {label:'Weekend trips should always be paid with overdraft coverage.',ok:false,mis:'overdraft-as-backup'}
    ]),
    hint:'Two balances, one truth.',
    good:'Available balance = current balance minus pending debits. The $480 trip was planned against money the gas charge had already claimed.',
    bad:'The gas charge was legitimate and predictable — it was pending, not hidden.',
    why:'Banks can show more than one balance. The one that matters before spending is available balance: what is posted minus what is still pending.'
  };
}},

/* ================= banking · compare (6) ================= */
{id:'banking-compare-01',verb:'compare',part:2,tier:'independent',skill:'banking',
gen:(v)=>{
  const person=v.person();
  return {
    context:`<p><b>Option A:</b> ${person} glances at the big balance number before buying.</p><p><b>Option B:</b> ${person} checks the balance, subtracts pending holds, then subtracts scheduled bills — and buys from what is left.</p>`,
    q:'Which check actually keeps the account safe?',
    choices:v.shuffle([
      {label:'Option B — it accounts for money that is reserved or already claimed.',ok:true},
      {label:'Option A — the big number is the official balance, so it is the safest guide.',ok:false,mis:'balance-not-available'},
      {label:'Both are equally safe; the app would warn about any problem.',ok:false},
      {label:'Option A — subtracting things yourself just creates math errors.',ok:false,mis:'guess-is-good-enough'}
    ]),
    hint:'Which check sees the invisible claims?',
    good:'Option B reads the account the way the bank will settle it: posted minus pending minus scheduled.',
    bad:'The big number is a snapshot, not a promise — it does not know about tomorrow\u2019s autopay.',
    why:'A safe balance check includes pending and scheduled claims, because the bank will include them when it settles.'
  };
}},
{id:'banking-compare-02',verb:'compare',part:2,tier:'independent',skill:'banking',
gen:(v)=>{
  const person=v.person();
  return {
    context:`<p><b>Option A:</b> Overdraft coverage at $35 per overdraft, used about 6 times a year.</p><p><b>Option B:</b> Free low-balance alerts plus a $100 buffer that sits untouched.</p>`,
    q:'Which setup costs less over a year?',
    choices:v.shuffle([
      {label:'Option B — $0 in fees vs about $210 in overdraft fees for Option A.',ok:true},
      {label:'Option A — $35 is a small price for never being declined.',ok:false,mis:'overdraft-as-backup'},
      {label:'They cost the same once you count the buffer as "spent" money.',ok:false},
      {label:'Option A — alerts are annoying, and annoyance has a cost too.',ok:false}
    ]),
    hint:'Multiply the fee by the frequency.',
    good:'6 × $35 = $210 a year for Option A. Option B costs $0 and the buffer is still yours.',
    bad:'"Never declined" is not free — each rescue is a $35 ticket, six times a year.',
    why:'Paid overdraft "protection" is priced per mistake. Prevention tools are free and keep the money.'
  };
}},
{id:'banking-compare-03',verb:'compare',part:2,tier:'independent',skill:'banking',
gen:(v)=>{
  const person=v.person();
  return {
    context:`<p><b>Option A:</b> A low-balance alert set at $50.</p><p><b>Option B:</b> A low-balance alert set at $150.</p>`,
    q:'Which alert gives more time to react before the account hits zero?',
    choices:v.shuffle([
      {label:'Option B — it fires earlier, while there is still room to move money or pause spending.',ok:true},
      {label:'Option A — alerts should only fire when danger is real and close.',ok:false},
      {label:'They are identical; the account hits zero at the same moment either way.',ok:false},
      {label:'Option A — earlier alerts just train you to ignore them.',ok:false,mis:'guess-is-good-enough'}
    ]),
    hint:'An alert is useful only if it arrives before the problem.',
    good:'$150 of warning buys days of options; $50 of warning buys hours of panic.',
    bad:'By the time a $50 alert fires, one forgotten subscription can finish the job before you react.',
    why:'Earlier thresholds turn alerts from obituaries into early warnings — reaction time is the whole point.'
  };
}},
{id:'banking-compare-04',verb:'compare',part:3,tier:'guided',skill:'banking',
gen:(v)=>{
  const person=v.person();
  return {
    context:`<p><b>Option A:</b> Pay the $650 rent today from the posted balance.</p><p><b>Option B:</b> Move $80 to savings today, then pay the $650 rent tomorrow from a paycheck that is still pending.</p>`,
    q:'Which option is safer?',
    cue:'Posted money is certain. Pending money is a promise. Which option pays the biggest bill with certain money?',
    choices:v.shuffle([
      {label:'Option A — the rent clears against money that has already posted.',ok:true},
      {label:'Option B — saving first is always the right priority.',ok:false},
      {label:'Option B — the paycheck will post overnight; banks are never late.',ok:false,mis:'pending-is-cash'},
      {label:'Both are equally safe; the rent gets paid either way.',ok:false}
    ]),
    hint:'Rank the money by certainty.',
    good:'Rent is the largest claim and it deserves the most certain money. Savings can wait one day; eviction notices cannot.',
    bad:'If the paycheck posts even a day late, the rent bounces — and the $80 "saved" becomes a $35 fee.',
    why:'Match the certainty of the money to the size of the obligation: biggest bills get posted money.'
  };
}},
{id:'banking-compare-05',verb:'compare',part:3,tier:'guided',skill:'banking',
gen:(v)=>{
  const person=v.person();
  return {
    context:`<p><b>Option A:</b> Keep a $200 buffer in checking that never gets spent.</p><p><b>Option B:</b> Spend down to zero freely and rely on low-balance alerts to catch problems.</p>`,
    q:'Which setup survives a surprise $60 charge better?',
    cue:'A buffer absorbs a surprise. An alert only announces one. Which one pays the $60?',
    choices:v.shuffle([
      {label:'Option A — the buffer absorbs the $60 with $140 to spare; nothing bounces.',ok:true},
      {label:'Option B — the alert fires and that is all the protection anyone needs.',ok:false},
      {label:'Option B — keeping $200 idle is wasting money that could be spent.',ok:false,mis:'spend-pending-save-cash'},
      {label:'They are the same; $200 is $200 whether it is a buffer or a balance.',ok:false,mis:'balance-not-available'}
    ]),
    hint:'One of these pays the surprise. The other just reports it.',
    good:'The buffer is shock absorption; the alert is a news report. You want the shock absorber when the $60 lands.',
    bad:'An alert at $0 arrives exactly when the account is already empty — perfect information, zero help.',
    why:'Buffers prevent overdrafts; alerts only warn about them. Use both, but never trade the buffer for the warning.'
  };
}},
{id:'banking-compare-06',verb:'compare',part:3,tier:'guided',skill:'banking',
gen:(v)=>{
  const person=v.person();
  return {
    context:`<p>${person} is $12 short at the register.</p><p><b>Option A:</b> Let the card decline and put one item back.</p><p><b>Option B:</b> Let overdraft coverage approve it — $35 fee.</p>`,
    q:'Which option is cheaper?',
    cue:'Price the embarrassment against the fee. One of them has a dollar amount.',
    choices:v.shuffle([
      {label:'Option A — putting an item back costs $0; the fee costs $35.',ok:true},
      {label:'Option B — $35 is worth avoiding an awkward moment.',ok:false,mis:'overdraft-as-backup'},
      {label:'Option B — the fee is basically the same as the $12 shortfall.',ok:false,mis:'fee-face-value'},
      {label:'Neither matters; $12 is too small to change any outcome.',ok:false}
    ]),
    hint:'One option has a price tag. Read it.',
    good:'A declined card is free and instant feedback. The $35 fee is nearly triple the $12 gap — the most expensive $12 ever borrowed.',
    bad:'$35 does not "cover" $12; it multiplies it. The register moment passes in seconds; the fee sits on the statement for a month.',
    why:'A decline is free information that you overshot. Overdraft turns a $12 miss into a $47 lesson.'
  };
}},

/* ================= banking · predict (6) ================= */
{id:'banking-predict-01',verb:'predict',part:3,tier:'guided',skill:'banking',
gen:(v)=>{
  const person=v.person();
  return {
    q:`${person} skips the $40 weekly bill-reserve move for a month to cover takeout instead. The $160 electric autopay is due at month\u2019s end. What breaks first?`,
    cue:'Four skipped $40 moves = $160 missing. The autopay does not care what the money became.',
    choices:v.shuffle([
      {label:'The $160 autopay bounces — the reserve it was supposed to come from was eaten $40 at a time.',ok:true},
      {label:'Nothing — takeout spending does not affect autopays.',ok:false},
      {label:'The takeout places start charging extra.',ok:false},
      {label:'The bank automatically covers the autopay for free.',ok:false,mis:'overdraft-as-backup'}
    ]),
    hint:'Follow the $40s.',
    good:'The autopay pulls from a reserve that takeout already spent. Small skips compound into one big bounce.',
    bad:'Money is fungible: every $40 spent on takeout was $40 not reserved for the bill.',
    why:'Skipping a reserve move does not cancel the bill it was funding — it just schedules a future shortfall.'
  };
}},
{id:'banking-predict-02',verb:'predict',part:3,tier:'guided',skill:'banking',
gen:(v)=>{
  const person=v.person();
  return {
    q:`${person} counts a $500 pending deposit as cash and mails the $480 rent check today. The deposit posts two days late. What happens?`,
    cue:'The check arrives before the money does. What does a check do when the money is not there?',
    choices:v.shuffle([
      {label:'The rent check bounces — and the landlord may charge a returned-check fee on top of the bank\u2019s.',ok:true},
      {label:'The bank holds the check politely until the deposit arrives.',ok:false,mis:'pending-is-cash'},
      {label:'Nothing — pending deposits always post before mailed checks clear.',ok:false,mis:'pending-is-cash'},
      {label:'The deposit speeds up because a check is waiting on it.',ok:false}
    ]),
    hint:'Checks do not wait for promises.',
    good:'A bounced rent check can mean a bank fee, a landlord fee, and a landlord who now doubts the next check.',
    bad:'Banks process what arrives; they do not pause a check out of courtesy for a pending deposit.',
    why:'Spending pending money as cash creates a race between the obligation and the deposit — and the obligation does not slow down.'
  };
}},
{id:'banking-predict-03',verb:'predict',part:3,tier:'guided',skill:'banking',
gen:(v)=>{
  const person=v.person();
  return {
    q:`${person} turns off every banking alert "to reduce stress." A forgotten $12 subscription renews four days before payday on a $10 balance. What happens next?`,
    cue:'No alert fires. The $12 charge arrives on a $10 balance. Do the subtraction.',
    choices:v.shuffle([
      {label:'The $12 renewal overdrafts the account — discovered only when the $35 fee posts.',ok:true},
      {label:'The subscription politely cancels itself when the balance is too low.',ok:false},
      {label:'The bank covers the $12 for free since it is a small amount.',ok:false,mis:'overdraft-as-backup'},
      {label:'Nothing happens until the account owner checks the app again.',ok:false}
    ]),
    hint:'The charge does not need permission to post.',
    good:'Silence is not safety: the renewal posts, the balance goes negative, and the fee is the first notification.',
    bad:'Subscriptions renew on their schedule, not on your attention span.',
    why:'Alerts exist because small forgotten charges are the most common overdraft trigger. Removing the warning removes the reaction time.'
  };
}},
{id:'banking-predict-04',verb:'predict',part:3,tier:'guided',skill:'banking',
gen:(v)=>{
  const person=v.person();
  return {
    q:`${person} uses overdraft coverage as a monthly bridge: about 4 overdrafts a month at $35 each. What does that cost over a year?`,
    cue:'4 × $35 = $140 a month. Now × 12.',
    choices:v.shuffle([
      {label:'About $1,680 a year — more than a month of groceries — for the privilege of overspending.',ok:true},
      {label:'About $140 a year; the fees are occasional.',ok:false,mis:'fee-face-value'},
      {label:'Nothing extra — overdraft coverage is a free service.',ok:false,mis:'overdraft-as-backup'},
      {label:'About $420; fees stop accumulating after the third each month.',ok:false,mis:'guess-is-good-enough'}
    ]),
    hint:'Monthly habit × 12.',
    good:'$140/month × 12 = $1,680. That is a vacation, an emergency fund, or months of groceries — converted into fees.',
    bad:'"Just this month" repeated twelve times is a $1,680 annual subscription to your own shortfalls.',
    why:'Recurring fees compound like interest in reverse. Annualizing a monthly habit reveals its true price.'
  };
}},
{id:'banking-predict-05',verb:'predict',part:3,tier:'guided',skill:'banking',
gen:(v)=>{
  const person=v.person();
  return {
    q:`${person} schedules a $400 rent autopay and a $60 insurance autopay on the same Friday without checking the balance. The account holds $420 that morning. What breaks first?`,
    cue:'$420 − $400 = $20. Then the $60 arrives.',
    choices:v.shuffle([
      {label:'The $60 insurance autopay bounces — the rent takes the $400 first and $20 cannot cover $60.',ok:true},
      {label:'Both go through; autopays always clear regardless of balance.',ok:false,mis:'overdraft-as-backup'},
      {label:'The rent bounces because it is the larger charge.',ok:false},
      {label:'The bank merges them into one $460 charge that clears fine.',ok:false}
    ]),
    hint:'Subtract in order.',
    good:'Stacked autopays on one payday need a balance check first — the second charge in line finds an empty account.',
    bad:'Autopays do not coordinate with each other; each one assumes the money is there.',
    why:'Multiple same-day autopays draw from one pool. Total them before the day arrives, or the last one in line fails.'
  };
}},
{id:'banking-predict-06',verb:'predict',part:3,tier:'guided',skill:'banking',
gen:(v)=>{
  const person=v.person();
  return {
    q:`${person} sees a $75 gas hold pending and thinks "it\u2019s not final, so it doesn\u2019t count." They spend down to $10, then the real $52 charge posts — along with a $48 grocery charge from yesterday. What breaks first?`,
    cue:'Add the posted reality: $52 + $48 = $100 in real charges against $10 remaining.',
    choices:v.shuffle([
      {label:'The $48 grocery charge bounces (or overdrafts) — the "not final" hold was reserving real money the whole time.',ok:true},
      {label:'Nothing — the hold disappears and only the groceries count.',ok:false,mis:'pending-is-cash'},
      {label:'The gas station refunds the $75 hold as a reward.',ok:false},
      {label:'The bank deletes the oldest charge to make room.',ok:false}
    ]),
    hint:'"Not final" never meant "not reserved."',
    good:'The hold was holding $75 of spending power hostage the entire time. Dismissing it did not free the money — it just hid the claim.',
    bad:'Pending charges post whether you respected them or not; the only choice was whether you planned for them.',
    why:'A hold\u2019s final amount can change, but its reservation is real from the start. "Not final" is not "not counting."'
  };
}},

/* ================= banking · build (5) ================= */
{id:'banking-build-01',verb:'build',part:3,tier:'guided',skill:'banking',
gen:(v)=>{
  const person=v.person();
  const total=640;
  return {
    h:'Build it: split the paycheck before it gets spent',
    body:`<p>${person} brings home ${v.money(total)}. Split every dollar: scheduled bills first, then needs, then savings, then wants.</p>`,
    cue:'Fund the claims you owe before the claims you choose: bills → needs → savings → wants.',
    totalDollars:total,
    buckets:[{id:'bills',label:'Scheduled bills'},{id:'needs',label:'Needs'},{id:'savings',label:'Savings'},{id:'wants',label:'Wants'}],
    targets:{bills:380,needs:140,savings:80,wants:40},
    hint:'Bills are not optional; fund them first.',
    good:'$380 covers every scheduled bill, $140 runs the week, $80 builds the buffer, $40 is guilt-free fun.',
    bad:'Any dollar moved from bills to wants is a future overdraft wearing a costume.',
    why:'Splitting the check on payday pre-decides every dollar\u2019s job — scheduled obligations can never be "accidentally" spent.'
  };
}},
{id:'banking-build-02',verb:'build',part:3,tier:'guided',skill:'banking',
gen:(v)=>{
  const person=v.person();
  const total=480;
  return {
    h:'Build it: a tight check, split right',
    body:`<p>${person}'s check is ${v.money(total)} this week. Make the tight budget hold together.</p>`,
    cue:'On a tight check the order matters even more: scheduled → food → savings → wants.',
    totalDollars:total,
    buckets:[{id:'scheduled',label:'Scheduled bills'},{id:'food',label:'Food'},{id:'savings',label:'Savings'},{id:'wants',label:'Wants'}],
    targets:{scheduled:300,food:100,savings:50,wants:30},
    hint:'Small check, same order.',
    good:'Even at $480 the structure holds: bills safe, food covered, savings alive, wants honest.',
    bad:'Skipping the $50 savings to inflate wants feels good for a week and costs the buffer forever.',
    why:'Tight budgets do not need a different system — they need the same system, followed exactly.'
  };
}},
{id:'banking-build-03',verb:'build',part:3,tier:'guided',skill:'banking',
gen:(v)=>{
  const person=v.person();
  const total=720;
  return {
    h:'Build it: split the check with a buffer line',
    body:`<p>${person} earns ${v.money(total)}. This build adds a buffer bucket for surprise charges.</p>`,
    cue:'The buffer is a bill you owe your future self — fund it with the bills, not from leftovers.',
    totalDollars:total,
    buckets:[{id:'bills',label:'Scheduled bills'},{id:'needs',label:'Weekly needs'},{id:'buffer',label:'Buffer'},{id:'wants',label:'Wants'}],
    targets:{bills:400,needs:160,buffer:100,wants:60},
    hint:'The buffer is not savings — it is overdraft armor.',
    good:'$100 of buffer means a forgotten $60 charge is a shrug, not a $35 fee.',
    bad:'A buffer of $0 is a plan that assumes no surprises — and surprises do not ask permission.',
    why:'A checking buffer absorbs the charges you forgot; it is the cheapest overdraft protection ever sold (free).'
  };
}},
{id:'banking-build-04',verb:'build',part:3,tier:'guided',skill:'banking',
gen:(v)=>{
  const person=v.person();
  const total=560;
  return {
    h:'Build it: obligations before options',
    body:`<p>${person}'s ${v.money(total)} has to cover rent week. Split it so nothing bounces.</p>`,
    cue:'Rent week = obligations first. Every optional dollar waits its turn.',
    totalDollars:total,
    buckets:[{id:'obligations',label:'Obligations'},{id:'groceries',label:'Groceries'},{id:'savings',label:'Savings'},{id:'wants',label:'Wants'}],
    targets:{obligations:320,groceries:120,savings:60,wants:60},
    hint:'Rent week is not the week to improvise.',
    good:'Obligations locked, groceries real, savings alive — the $60 of wants is honest money.',
    bad:'Borrowing from obligations to fund wants is just scheduling an overdraft with extra steps.',
    why:'Pre-assigning dollars on payday removes the daily "can I afford this" guess — the answer was decided Friday.'
  };
}},
{id:'banking-build-05',verb:'build',part:3,tier:'guided',skill:'banking',
gen:(v)=>{
  const person=v.person();
  const total=840;
  return {
    h:'Build it: a bigger check, same discipline',
    body:`<p>${person}'s best check yet: ${v.money(total)}. Bigger checks need the same split — lifestyle creep starts here.</p>`,
    cue:'A bigger check is not permission to skip the order. Bills → needs → savings → wants, at any size.',
    totalDollars:total,
    buckets:[{id:'bills',label:'Scheduled bills'},{id:'needs',label:'Needs'},{id:'savings',label:'Savings'},{id:'wants',label:'Wants'}],
    targets:{bills:500,needs:180,savings:100,wants:60},
    hint:'Raise the savings before raising the wants.',
    good:'The raise went to savings ($100), not to lifestyle — that is how bigger checks build wealth instead of bigger bills.',
    bad:'Letting wants absorb the whole raise is how $840 checks feel exactly like $640 checks.',
    why:'The split scales: fixed order, bigger numbers. Discipline is what turns higher income into higher savings.'
  };
}},

/* ================= banking · explain (5) ================= */
{id:'banking-explain-01',verb:'explain',part:2,tier:'independent',skill:'banking',
gen:(v)=>({
  h:'Teach it back: pending vs posted',
  prompt:'Explain in your own words the difference between a pending transaction and a posted one — and why it matters before you spend.',
  keyPoints:['Pending means reserved but not final; the amount can still change','Posted means fully settled and finished','A pending deposit is not spendable cash yet','Spending against pending money risks overdrafts if timing slips'],
  modelAnswer:'A pending transaction has started but not finished — a hold reserves the money while the final amount is still unknown. Posted means settled and final. It matters because spending money that is only pending is spending money you do not fully have yet.',
  hint:'Think: started vs finished.'
})},
{id:'banking-explain-02',verb:'explain',part:2,tier:'independent',skill:'banking',
gen:(v)=>({
  h:'Teach it back: scheduled bills own your balance first',
  prompt:'Explain in your own words why a bill due tomorrow has to come out of today\u2019s spending plan.',
  keyPoints:['A scheduled bill is a claim already made on the money','The app balance does not subtract it for you','Available money = balance minus scheduled bills minus pending holds','Ignoring it does not cancel it — it just schedules a bounce'],
  modelAnswer:'A scheduled bill is money already promised. The app still shows it in your balance, so you have to subtract it yourself. What is left after scheduled bills and pending holds is your real available money — spending more than that means the bill will hit an empty account.',
  hint:'Who owns the money first: you, or the bill?'
})},
{id:'banking-explain-03',verb:'explain',part:3,tier:'guided',skill:'banking',
gen:(v)=>({
  h:'Teach it back: reading your available balance',
  prompt:'Explain in your own words the steps to find how much money is actually safe to spend right now.',
  cue:'The steps in order: start at the posted balance, subtract pending holds, subtract scheduled bills. What is left is the answer.',
  keyPoints:['Start from the posted/available balance, not the big headline number','Subtract every pending hold at its held amount','Subtract every scheduled bill before its due date','The remainder is the safe-to-spend number'],
  modelAnswer:'First read the available balance, then subtract pending holds at their full held amounts, then subtract any scheduled bills coming due. Whatever remains is actually safe to spend — everything else is already claimed.',
  hint:'Posted, minus pending, minus scheduled.'
})},
{id:'banking-explain-04',verb:'explain',part:3,tier:'guided',skill:'banking',
gen:(v)=>({
  h:'Teach it back: the overdraft trap',
  prompt:'Explain in your own words why treating overdraft coverage as a backup plan is expensive.',
  cue:'Think about what "coverage" actually is: the bank lends you the shortfall and charges a fee each time. Multiply one fee by a year of tight weeks.',
  keyPoints:['Overdraft coverage is a short loan plus a fee, not free money','One $35 fee can exceed the shortfall it "covered"','Used monthly, fees compound into hundreds per year','Free alerts plus a buffer prevent the problem instead of pricing it'],
  modelAnswer:'Overdraft coverage is not a safety net — it is the bank covering your shortfall and charging about $35 each time. A few uses a month becomes hundreds of dollars a year. Free low-balance alerts and a small buffer prevent overdrafts instead of monetizing them.',
  hint:'Price one fee × twelve months.'
})},
{id:'banking-explain-05',verb:'explain',part:3,tier:'guided',skill:'banking',
gen:(v)=>({
  h:'Teach it back: the alert habit',
  prompt:'Explain in your own words how low-balance alerts and a scheduled-bill list work together to prevent overdrafts.',
  cue:'One tool warns, the other tool remembers. Which does which — and what happens when you have both?',
  keyPoints:['Alerts warn you while there is still time to act','The bill list turns forgotten charges into scheduled ones','Together they remove the surprise that causes most overdrafts','Both are free, unlike overdraft fees'],
  modelAnswer:'Low-balance alerts warn you while you can still move money or pause spending, and a written bill list means no charge is ever a surprise. Together they remove the invisibility that causes most accidental overdrafts — and both cost nothing, unlike the fees they prevent.',
  hint:'Warn + remember = no surprises.'
})}
],
'first-job': [

/* ================= first-job · choice (8) ================= */
{id:'first-job-choice-01',verb:'choice',part:2,tier:'independent',skill:'first-job',
gen:(v)=>{
  const person=v.person();
  return {
    q:`${person}'s first pay stub shows four lines: "Gross wages: $680" · "Federal income tax: $54" · "Net pay: $541" · "State tax: $21." Which line shows what ${person} earned before anything was taken out?`,
    choices:v.shuffle([
      {label:'"Gross wages: $680" — earnings before any deductions.',ok:true},
      {label:'"Net pay: $541" — gross means what you actually keep.',ok:false,mis:'paycheck-gross'},
      {label:'"Federal income tax: $54" — taxes are your earnings.',ok:false},
      {label:'Add all four lines together; the total is the gross.',ok:false,mis:'guess-is-good-enough'}
    ]),
    hint:'Gross = the whole pie, before slices.',
    good:'Gross wages is the starting number — everything else is subtracted from it.',
    bad:'Net pay is what survives the subtractions. Tax lines are slices, not the pie.',
    why:'Gross pay is earnings before deductions; every other line on the stub is either a subtraction or the result.'
  };
}},
{id:'first-job-choice-02',verb:'choice',part:2,tier:'independent',skill:'first-job',
gen:(v)=>{
  const person=v.person();
  return {
    q:`${person}'s stub lists: "Federal income tax $58" · "Health insurance premium $42" · "Union dues $12" · "Gym membership $20." Which one is a tax?`,
    choices:v.shuffle([
      {label:'"Federal income tax $58" — a government withholding.',ok:true},
      {label:'"Health insurance premium $42" — premiums are taxes.',ok:false},
      {label:'"Union dues $12" — dues are a payroll tax.',ok:false},
      {label:'"Gym membership $20" — it came off the check, so it is a tax.',ok:false,mis:'guess-is-good-enough'}
    ]),
    hint:'Taxes go to a government. The others go elsewhere.',
    good:'Only the income-tax line is a tax. Premiums, dues, and gym fees are other deductions — they still shrink the check, but they are not taxes.',
    bad:'"Taken from my check" does not mean "tax." Follow where the money actually goes.',
    why:'A pay stub mixes taxes with other deductions. Knowing which is which matters when you estimate or question a line.'
  };
}},
{id:'first-job-choice-03',verb:'choice',part:3,tier:'guided',skill:'first-job',
gen:(v)=>{
  const person=v.person();
  const gross=800, tax=120, other=45, net=gross-tax-other;
  return {
    q:`${person}'s check shows $${gross} gross pay, $${tax} in taxes withheld, and $${other} in other deductions. What is the take-home pay?`,
    cue:`Take-home = gross minus ALL deductions: $${gross} − $${tax} − $${other}. Do both subtractions.`,
    choices:v.shuffle([
      {label:`${v.money(net)} — $${gross} minus $${tax} taxes minus $${other} other deductions.`,ok:true},
      {label:`${v.money(gross-tax)} — subtract the taxes; the other deductions do not count.`,ok:false,mis:'paycheck-gross'},
      {label:`${v.money(gross)} — take-home is just another word for gross.`,ok:false,mis:'paycheck-gross'},
      {label:`About ${v.money(gross-100)} — taxes are roughly $100, close enough.`,ok:false,mis:'guess-is-good-enough'}
    ]),
    hint:'Every deduction line counts.',
    good:`$800 − $120 − $45 = $635. "Other deductions" are still deductions — the check does not care what you call them.`,
    bad:'Skipping the $45 line overstates the check by $45. Small lines add up to real money.',
    why:'Take-home = gross minus every deduction line, taxes and non-taxes alike. Miss a line, miss the real number.'
  };
}},
{id:'first-job-choice-04',verb:'choice',part:3,tier:'guided',skill:'first-job',
gen:(v)=>{
  const person=v.person();
  const rate=18, hrs=40, gross=rate*hrs, ded=98, net=gross-ded;
  return {
    q:`${person} works ${hrs} hours at ${v.money(rate)}/hour. The stub shows ${v.money(ded)} in total deductions. What is the take-home pay?`,
    cue:`Step 1: gross = ${hrs} × ${v.money(rate)} = ${v.money(gross)}. Step 2: subtract deductions.`,
    choices:v.shuffle([
      {label:`${v.money(net)} — ${v.money(gross)} gross minus ${v.money(ded)} deductions.`,ok:true},
      {label:`${v.money(gross)} — hourly workers get the full hourly total.`,ok:false,mis:'paycheck-gross'},
      {label:`${v.money(gross-80)} — deductions are always about $80.`,ok:false,mis:'guess-is-good-enough'},
      {label:`${v.money(net-98)} — subtract the deductions twice to be safe.`,ok:false}
    ]),
    hint:'Gross first, then subtract once.',
    good:`40 × $18 = $720 gross; $720 − $98 = $622 take-home. Two steps, one subtraction.`,
    bad:'Hourly pay is still taxed and deducted. The hourly rate is not the take-home rate.',
    why:'For hourly work: hours × rate = gross, then subtract the stub\u2019s total deductions — once.'
  };
}},
{id:'first-job-choice-05',verb:'choice',part:3,tier:'guided',skill:'first-job',
gen:(v)=>{
  const person=v.person();
  return {
    q:`${person} is planning next month. The offer letter says $940/week gross, but the first stub shows $812 take-home. Which number belongs in the spending plan?`,
    cue:'The plan spends money that actually arrives. Which number arrives in the account?',
    choices:v.shuffle([
      {label:'The $812 take-home — the amount actually paid to them.',ok:true},
      {label:'The $940 gross — planning from the bigger number is more ambitious.',ok:false,mis:'paycheck-gross'},
      {label:'$3,760 — the monthly salary divided by 4, no matter how payroll works.',ok:false,mis:'paycheck-gross'},
      {label:'$850 — gross minus a rough guess at taxes.',ok:false,mis:'guess-is-good-enough'}
    ]),
    hint:'Budgets spend arrivals, not promises.',
    good:'$812 is what lands. Planning from $940 builds a $128 hole into every week before the month even starts.',
    bad:'"More ambitious" is not a budgeting strategy — it is a shortfall with confidence.',
    why:'Only take-home pay is available to spend. Gross describes earnings; take-home describes reality.'
  };
}},
{id:'first-job-choice-06',verb:'choice',part:4,tier:'independent',skill:'first-job',
gen:(v)=>{
  const person=v.person();
  const gross=880, d1=61, d2=22, d3=14, d4=38, ded=d1+d2+d3+d4, net=gross-ded;
  return {
    q:`${person}'s stub: $${gross} gross. Deductions: federal $${d1}, state $${d2}, Social Security/Medicare $${d3}, health premium $${d4}. Take-home?`,
    choices:v.shuffle([
      {label:`${v.money(net)} — $${gross} minus $${ded} total deductions.`,ok:true},
      {label:`${v.money(gross-d1)} — subtract only the federal tax; the rest are optional.`,ok:false,mis:'paycheck-gross'},
      {label:`${v.money(gross-d1-d2)} — subtract the two taxes and ignore the rest.`,ok:false},
      {label:`${v.money(gross-ded-ded)} — subtract everything twice to be extra safe.`,ok:false}
    ]),
    hint:'Total the deductions first, then subtract once.',
    good:`$61 + $22 + $14 + $38 = $135; $880 − $135 = $745. Add the lines, subtract the sum.`,
    bad:'"Optional-looking" lines still leave the check. Every deduction line reduces take-home, whatever its name.',
    why:'Multi-line stubs need one extra step: sum every deduction line first, then subtract the total from gross.'
  };
}},
{id:'first-job-choice-07',verb:'choice',part:4,tier:'independent',skill:'first-job',
gen:(v)=>{
  const person=v.person();
  const gross=780, ded=142, net=gross-ded;
  return {
    q:`${person} earns $19.50/hour for 40 hours: $${gross} gross. Total deductions on the stub: $${ded}. What is the take-home?`,
    choices:v.shuffle([
      {label:`${v.money(net)} — $${gross} minus $${ded}.`,ok:true},
      {label:`${v.money(gross-100)} — round the deductions to $100; easier math.`,ok:false,mis:'guess-is-good-enough'},
      {label:`${v.money(gross)} — $19.50 × 40 is the whole story.`,ok:false,mis:'paycheck-gross'},
      {label:`${v.money(net-40)} — always hold back an extra $40 for surprise taxes.`,ok:false}
    ]),
    hint:'The stub already did the hard part — it totaled the deductions.',
    good:`$780 − $142 = $638. The stub\u2019s deduction total is exact; rounding it is throwing away free accuracy.`,
    bad:'Rounding $142 to $100 invents $42 that will not be there. The stub gives exact numbers — use them.',
    why:'When the stub shows a deduction total, take-home is one subtraction. Exact beats estimated every time.'
  };
}},
{id:'first-job-choice-08',verb:'choice',part:4,tier:'independent',skill:'first-job',
gen:(v)=>{
  const person=v.person();
  const gross=1540, ded=286, net=gross-ded;
  return {
    q:`${person} is paid biweekly: $${gross} gross per check, $${ded} in total deductions per check. What is the take-home per check?`,
    choices:v.shuffle([
      {label:`${v.money(net)} per check — $${gross} minus $${ded}.`,ok:true},
      {label:`${v.money(gross)} — biweekly checks have no deductions.`,ok:false,mis:'paycheck-gross'},
      {label:`${v.money(net*2)} — double it, since biweekly means two weeks of pay.`,ok:false},
      {label:`${v.money(Math.round(net/2))} — split it; each week gets half.`,ok:false,mis:'guess-is-good-enough'}
    ]),
    hint:'"Per check" is the unit. Do not resize it.',
    good:`$1,540 − $286 = $1,254 per check. Biweekly describes the schedule; the subtraction is the same.`,
    bad:'Doubling or halving changes the question. "Per check" means this check, as printed.',
    why:'Pay frequency changes how often the math happens, not how it works: gross minus deductions, per check.'
  };
}},

/* ================= first-job · sort (6) ================= */
{id:'first-job-sort-01',verb:'sort',part:2,tier:'independent',skill:'first-job',
gen:(v)=>({
  h:'Sort it: read the pay stub',
  body:'<p>Sort each pay-stub line into the right bucket.</p>',
  buckets:['Gross pay','Tax withheld','Other deduction','Take-home'],
  items:v.shuffle([
    {label:'Regular hours 40 × $18',a:'gross pay',why:'Wages earned — part of gross.'},
    {label:'Overtime 5 × $27',a:'gross pay',why:'Extra earnings — still gross.'},
    {label:'Federal income tax',a:'tax withheld',why:'Government withholding.'},
    {label:'State income tax',a:'tax withheld',why:'Government withholding.'},
    {label:'Social Security + Medicare',a:'tax withheld',why:'Payroll taxes.'},
    {label:'Health insurance premium',a:'other deduction',why:'A benefit cost, not a tax.'},
    {label:'401(k) contribution',a:'other deduction',why:'Retirement savings — a deduction, not a tax.'},
    {label:'Net pay — this check',a:'take-home',why:'What actually arrives.'}
  ])
})},
{id:'first-job-sort-02',verb:'sort',part:2,tier:'independent',skill:'first-job',
gen:(v)=>({
  h:'Sort it: salary stub with a bonus',
  body:'<p>A bonus showed up this check. Sort every line.</p>',
  buckets:['Gross pay','Tax withheld','Other deduction','Take-home'],
  items:v.shuffle([
    {label:'Salary — semimonthly: $1,450',a:'gross pay',why:'Base earnings.'},
    {label:'Bonus: $200',a:'gross pay',why:'Bonuses are earnings too.'},
    {label:'Federal tax on bonus',a:'tax withheld',why:'Tax on the bonus.'},
    {label:'Dental premium',a:'other deduction',why:'Benefit cost.'},
    {label:'Union dues',a:'other deduction',why:'Dues — not a tax.'},
    {label:'Take-home pay',a:'take-home',why:'The final number.'}
  ])
})},
{id:'first-job-sort-03',verb:'sort',part:2,tier:'independent',skill:'first-job',
gen:(v)=>({
  h:'Sort it: holiday-week stub',
  body:'<p>Holiday pay is on this stub. Sort each line.</p>',
  buckets:['Gross pay','Tax withheld','Other deduction','Take-home'],
  items:v.shuffle([
    {label:'Hourly wages: $720',a:'gross pay',why:'Base earnings.'},
    {label:'Holiday pay: $144',a:'gross pay',why:'Paid time — still earnings.'},
    {label:'State income tax',a:'tax withheld',why:'State withholding.'},
    {label:'Medicare',a:'tax withheld',why:'Payroll tax.'},
    {label:'Vision plan premium',a:'other deduction',why:'Benefit cost.'},
    {label:'Net pay',a:'take-home',why:'What lands in the account.'}
  ])
})},
{id:'first-job-sort-04',verb:'sort',part:2,tier:'independent',skill:'first-job',
gen:(v)=>({
  h:'Sort it: commission-check stub',
  body:'<p>Commission plus hourly on one stub. Sort it all.</p>',
  buckets:['Gross pay','Tax withheld','Other deduction','Take-home'],
  items:v.shuffle([
    {label:'Commission: $150',a:'gross pay',why:'Earnings.'},
    {label:'Overtime: $135',a:'gross pay',why:'Earnings.'},
    {label:'Federal income tax',a:'tax withheld',why:'Federal withholding.'},
    {label:'Social Security',a:'tax withheld',why:'Payroll tax.'},
    {label:'Retirement contribution',a:'other deduction',why:'Savings deduction.'},
    {label:'Parking deduction',a:'other deduction',why:'A fee — not a tax.'},
    {label:'This check\u2019s take-home',a:'take-home',why:'Final number.'}
  ])
})},
{id:'first-job-sort-05',verb:'sort',part:2,tier:'independent',skill:'first-job',
gen:(v)=>({
  h:'Sort it: shift-differential stub',
  body:'<p>Night-shift pay is listed separately. Sort each line.</p>',
  buckets:['Gross pay','Tax withheld','Other deduction','Take-home'],
  items:v.shuffle([
    {label:'Base pay: $640',a:'gross pay',why:'Base earnings.'},
    {label:'Shift differential: $48',a:'gross pay',why:'Extra earnings for nights.'},
    {label:'City income tax',a:'tax withheld',why:'Local withholding.'},
    {label:'State income tax',a:'tax withheld',why:'State withholding.'},
    {label:'Life insurance premium',a:'other deduction',why:'Benefit cost.'},
    {label:'Take-home',a:'take-home',why:'What arrives.'}
  ])
})},
{id:'first-job-sort-06',verb:'sort',part:2,tier:'independent',skill:'first-job',
gen:(v)=>({
  h:'Sort it: tipped-worker stub',
  body:'<p>Reported tips are on this stub. Sort every line.</p>',
  buckets:['Gross pay','Tax withheld','Other deduction','Take-home'],
  items:v.shuffle([
    {label:'Tips reported: $85',a:'gross pay',why:'Tips count as earnings.'},
    {label:'Regular wages: $420',a:'gross pay',why:'Base earnings.'},
    {label:'Federal income tax',a:'tax withheld',why:'Federal withholding.'},
    {label:'Medicare',a:'tax withheld',why:'Payroll tax.'},
    {label:'Uniform deduction',a:'other deduction',why:'A fee — not a tax.'},
    {label:'Net pay',a:'take-home',why:'Final number.'}
  ])
})},

/* ================= first-job · decide (8) ================= */
{id:'first-job-decide-01',verb:'decide',part:3,tier:'guided',skill:'first-job',
gen:(v)=>{
  const person=v.person();
  return {
    q:`${person}'s offer letter says $900/week gross, but the stub shows $700 take-home. ${person} is building next month\u2019s budget. Which number goes in?`,
    cue:'The budget spends money that arrives. $900 is described; $700 is deposited. Which one can buy groceries?',
    choices:v.shuffle([
      {label:'The $700 take-home — the amount actually paid out each week.',ok:true},
      {label:'The $900 gross — a budget should aim high.',ok:false,mis:'paycheck-gross'},
      {label:'$800 — split the difference between gross and take-home.',ok:false,mis:'guess-is-good-enough'},
      {label:'$900, and just hope the deductions shrink over time.',ok:false,mis:'paycheck-gross'}
    ]),
    hint:'Hope is not a line item.',
    good:'Budgeting $700 means every planned dollar exists. Budgeting $900 means planning to spend $200 that never arrives.',
    bad:'"Aim high" budgeting creates a $200 weekly shortfall wearing a positive attitude.',
    why:'Plans run on arrivals, not descriptions. Take-home is the only number the budget can spend.'
  };
}},
{id:'first-job-decide-02',verb:'decide',part:3,tier:'guided',skill:'first-job',
gen:(v)=>{
  const person=v.person();
  return {
    q:`Day one at the new job: HR hands ${person} a W-4 form for federal income-tax withholding. ${person} is tempted to skip it and "deal with taxes later." What is the call?`,
    cue:'The W-4 tells the employer how much tax to withhold from each check. No form = the employer guesses. Who pays for a bad guess?',
    choices:v.shuffle([
      {label:'Fill it out on day one — correct withholding keeps each check accurate and avoids a surprise bill later.',ok:true},
      {label:'Skip it — HR will figure out the right withholding automatically.',ok:false},
      {label:'Skip it — less withholding now means bigger checks, which is always better.',ok:false,mis:'paycheck-gross'},
      {label:'Fill it out next year; the first year of work does not count.',ok:false}
    ]),
    hint:'The form exists because the employer cannot read minds.',
    good:'Right withholding now = accurate checks now and no scramble at tax time. Five minutes on day one prevents months of fixing.',
    bad:'"Bigger checks now" from skipped withholding is a loan from your future tax bill — with interest in stress.',
    why:'The W-4 sets withholding per check. Skipping it does not skip taxes; it just moves them into one painful surprise.'
  };
}},
{id:'first-job-decide-03',verb:'decide',part:3,tier:'guided',skill:'first-job',
gen:(v)=>{
  const person=v.person();
  return {
    q:`In January a W-2 arrives: last year\u2019s wages and withholding, needed for the tax return. ${person}'s desk is a paper pile. What is the call?`,
    cue:'The W-2 is needed once a year, at a stressful time, and cannot be re-downloaded from memory. Where should it live until then?',
    choices:v.shuffle([
      {label:'File it in one labeled folder with the other tax papers — findable in January.',ok:true},
      {label:'Toss it in the paper pile; it will turn up when needed.',ok:false},
      {label:'Throw it away — the employer keeps a copy, so it is redundant.',ok:false},
      {label:'Photograph it and delete the paper; a blurry photo is fine for taxes.',ok:false,mis:'guess-is-good-enough'}
    ]),
    hint:'January-you is counting on today-you.',
    good:'One folder, everything findable: the return gets filed on time instead of becoming a paper-pile excavation.',
    bad:'"It will turn up" is how W-2s become February panic and late filings.',
    why:'Tax documents are used rarely and needed urgently. A predictable place beats a good memory every time.'
  };
}},
{id:'first-job-decide-04',verb:'decide',part:3,tier:'guided',skill:'first-job',
gen:(v)=>{
  const person=v.person();
  return {
    q:`${person}'s salary is $42,000/year. A friend says "that\u2019s $3,500 a month — budget that." But ${person}'s actual take-home is $2,620/month. Which number should the budget use?`,
    cue:'$42,000 ÷ 12 = $3,500 ignores withholding and deductions entirely. Which number actually lands each month?',
    choices:v.shuffle([
      {label:'The $2,620 take-home — the amount that actually arrives each month.',ok:true},
      {label:'The $3,500 — salary divided by 12 is the official monthly pay.',ok:false,mis:'paycheck-gross'},
      {label:'$3,000 — a round number between the two, easier to remember.',ok:false,mis:'guess-is-good-enough'},
      {label:'$3,500 — deductions might go down, so plan optimistically.',ok:false,mis:'paycheck-gross'}
    ]),
    hint:'Annual salary is a description, not a deposit.',
    good:'$2,620 planned = $2,620 available. $3,500 planned = an $880 monthly fantasy that rent will expose immediately.',
    bad:'Optimism does not change withholding. The $880 gap appears every single month, on schedule.',
    why:'Salary ÷ 12 is gross math. Budgets need net math: what lands, after everything, each pay period.'
  };
}},
{id:'first-job-decide-05',verb:'decide',part:4,tier:'independent',skill:'first-job',
gen:(v)=>{
  const person=v.person();
  const check=980, monthly=Math.round(check*26/12), rent=900, bills=500, food=400, total=rent+bills+food, left=monthly-total;
  return {
    q:`${person}'s biweekly take-home is ${v.money(check)} — about ${v.money(monthly)}/month. A ${v.money(rent)} apartment plus ${v.money(bills)} bills and ${v.money(food)} food = ${v.money(total)}/month. Can they afford it?`,
    choices:v.shuffle([
      {label:`Yes — ${v.money(monthly)} take-home covers ${v.money(total)} with about ${v.money(left)} to spare.`,ok:true},
      {label:`No — ${v.money(check)} biweekly is only ${v.money(check*2)} a month, which falls short.`,ok:false,mis:'guess-is-good-enough'},
      {label:`Yes — and the spare ${v.money(left)} means they can also afford a $400 car payment.`,ok:false},
      {label:`No — rent alone should never exceed one biweekly check.`,ok:false,mis:'guess-is-good-enough'}
    ]),
    hint:'Biweekly × 26 ÷ 12 = monthly. Then compare.',
    good:`The math holds: $2,123 in, $1,800 out, $323 of breathing room. The apartment fits — the car payment does not.`,
    bad:'"$980 × 2" is the classic biweekly trap: 26 checks a year, not 24. The real monthly number is $2,123, not $1,960.',
    why:'Affordability = monthly take-home (computed correctly from pay frequency) minus total monthly costs. Frequency math first, verdict second.'
  };
}},
{id:'first-job-decide-06',verb:'decide',part:4,tier:'independent',skill:'first-job',
gen:(v)=>{
  const person=v.person();
  return {
    q:`Two offers. Job A: $20/hr × 40 hrs, take-home about $640/week. Job B: $22/hr × 30 hrs, take-home about $528/week. Which pays more in hand each week?`,
    choices:v.shuffle([
      {label:'Job A — $640/week in hand beats $528/week, even though the hourly rate is lower.',ok:true},
      {label:'Job B — $22/hr is the higher rate, so it pays more.',ok:false,mis:'paycheck-gross'},
      {label:'They are equal — $20 × 40 and $22 × 30 are basically the same.',ok:false,mis:'guess-is-good-enough'},
      {label:'Job B — fewer hours for nearly the same money is always the better deal.',ok:false}
    ]),
    hint:'Multiply rate × hours first, then compare take-homes.',
    good:'$640 vs $528 is a $112/week gap — $5,800 a year. The hourly rate is trivia; the take-home is the paycheck.',
    bad:'Comparing hourly rates without hours is comparing prices without quantities.',
    why:'Compare jobs on take-home per period: (rate × hours) minus deductions. Rate alone never answers "which pays more."'
  };
}},
{id:'first-job-decide-07',verb:'decide',part:4,tier:'independent',skill:'first-job',
gen:(v)=>{
  const person=v.person();
  const gross=650, ded=118, net=gross-ded;
  return {
    q:`${person}'s stub: $${gross} gross, $${ded} total deductions = ${v.money(net)} take-home. A friend says "just budget the $${gross}, it\u2019s simpler." What is the call?`,
    choices:v.shuffle([
      {label:`Budget the ${v.money(net)} — simpler is not worth a $${ded} weekly hole.`,ok:true},
      {label:`Budget the $${gross} — round numbers make cleaner budgets.`,ok:false,mis:'paycheck-gross'},
      {label:`Budget $${gross-50} — close enough to the real number.`,ok:false,mis:'guess-is-good-enough'},
      {label:`Budget the $${gross} and skip one small bill a month to balance it.`,ok:false}
    ]),
    hint:'"Simpler" has a price. Read it.',
    good:`$532 planned = $532 real. $650 planned = a $118 weekly shortfall that compounds into a missed bill by month\u2019s end.`,
    bad:'Skipping a bill to "balance" a fantasy budget is just choosing which obligation to break.',
    why:'Budgeting from gross bakes the deductions back in as imaginary money. The stub already did the real math — use its answer.'
  };
}},
{id:'first-job-decide-08',verb:'decide',part:4,tier:'independent',skill:'first-job',
gen:(v)=>{
  const person=v.person();
  return {
    q:`${person}'s biweekly take-home is $1,100 and they want to save $200/month automatically. Which setup actually gets it saved?`,
    choices:v.shuffle([
      {label:'Split it at direct deposit: $100 per check straight to savings before it can be spent.',ok:true},
      {label:'Save whatever is left at month\u2019s end — it usually works out.',ok:false,mis:'guess-is-good-enough'},
      {label:'Keep it all in checking and move $200 when they remember.',ok:false},
      {label:'Wait until the savings account "feels" ready for automatic transfers.',ok:false}
    ]),
    hint:'"Whatever is left" is usually nothing.',
    good:'$100/check × 26 checks = $2,600/year saved without a single decision. Automation beats intention.',
    bad:'"Whatever is left" competes with every impulse for 30 days and loses every time.',
    why:'Once take-home is known, pre-decide savings at deposit time. Money saved before it is seen is money actually saved.'
  };
}},

/* ================= first-job · spot (6) ================= */
{id:'first-job-spot-01',verb:'spot',part:3,tier:'guided',skill:'first-job',
gen:(v)=>{
  const person=v.person();
  return {
    scenario:`<p>${person}\u2019s monthly budget:</p><ul><li>Pay (from offer letter): $2,800</li><li>Rent: $1,100</li><li>Bills + food: $900</li><li>Leftover: $800</li></ul><p>Actual take-home: $2,150/month.</p>`,
    q:'What is the mistake here?',
    cue:'The budget\u2019s first line is not money that arrives. Which number actually lands?',
    choices:v.shuffle([
      {label:'The budget was built from the $2,800 gross — real take-home is $2,150, so the "$800 leftover" is a $650 fantasy.',ok:true},
      {label:'The rent is too high; that is the only mistake.',ok:false},
      {label:'They should have budgeted $3,000 to be safe.',ok:false,mis:'guess-is-good-enough'},
      {label:'The mistake is listing bills before food.',ok:false}
    ]),
    hint:'Compare line one to reality.',
    good:'$2,800 − $2,150 = $650 of imaginary money baked into the plan. The budget was broken before any spending happened.',
    bad:'Rent is not the problem — the income line is. Even cheap rent cannot fix a $650 phantom.',
    why:'A budget built on gross pay plans spending for money that withholding already took. Start from take-home or every line below is fiction.'
  };
}},
{id:'first-job-spot-02',verb:'spot',part:3,tier:'guided',skill:'first-job',
gen:(v)=>{
  const person=v.person();
  return {
    scenario:`<p>${person} estimates take-home on a $900 gross check: "Taxes are about 10%, so $90 off — take-home $810."</p><p>Actual stub: $148 in total deductions. Take-home: $752.</p>`,
    q:'What is the mistake here?',
    cue:'"About 10%" was a guess. What did the guess cost?',
    choices:v.shuffle([
      {label:'They guessed at deductions instead of reading the stub — the guess was $58 high, every single check.',ok:true},
      {label:'The mistake was rounding; $810 is close enough to $752.',ok:false,mis:'guess-is-good-enough'},
      {label:'They should have guessed 20% to be safe.',ok:false,mis:'guess-is-good-enough'},
      {label:'The stub is wrong; 10% is the standard tax rate.',ok:false}
    ]),
    hint:'$58 × every check × every year.',
    good:'$58 per check × 26 checks = $1,508 a year of phantom money. The stub had the exact number for free.',
    bad:'"Close enough" repeated 26 times a year is a four-figure error wearing a shrug.',
    why:'Deduction guesses compound into budget holes. The stub prints exact numbers — reading beats estimating.'
  };
}},
{id:'first-job-spot-03',verb:'spot',part:3,tier:'guided',skill:'first-job',
gen:(v)=>{
  const person=v.person();
  return {
    scenario:`<p>${person} never filled out the W-4 ("I\u2019ll do it later"). Withholding came out far too low all year. In April: a $900 tax bill, no savings, panic.</p>`,
    q:'What is the mistake here?',
    cue:'The W-4 sets withholding per check. What happens when nobody sets it?',
    choices:v.shuffle([
      {label:'Skipping the W-4 meant too little was withheld each check — the missing taxes arrived all at once in April.',ok:true},
      {label:'The mistake was earning too much money.',ok:false},
      {label:'Taxes are optional the first year of work.',ok:false},
      {label:'The employer should have refused to pay them without a W-4.',ok:false}
    ]),
    hint:'Later arrived. With interest in stress.',
    good:'Twelve months of under-withholding compressed into one $900 bill. Five minutes on day one would have spread it across 26 checks.',
    bad:'"Later" did not cancel the taxes — it just scheduled them as a lump-sum ambush.',
    why:'Withholding is pay-as-you-go. Skipping the setup form does not skip the tax; it concentrates it.'
  };
}},
{id:'first-job-spot-04',verb:'spot',part:4,tier:'independent',skill:'first-job',
gen:(v)=>{
  const person=v.person();
  return {
    scenario:`<p>${person}\u2019s take-home math on an $800 check with $135 in deductions:</p><p>$800 − $135 − $135 = $530 take-home.</p>`,
    q:'What is the mistake here?',
    choices:v.shuffle([
      {label:'They subtracted the deductions twice — take-home is $800 − $135 = $665.',ok:true},
      {label:'They should have subtracted three times to be safe.',ok:false},
      {label:'The gross should have been doubled first.',ok:false},
      {label:'$530 is correct; deductions always apply twice.',ok:false,mis:'guess-is-good-enough'}
    ]),
    hint:'Count the subtractions.',
    good:'One set of deductions = one subtraction. Doubling it invents a $135 shortfall that does not exist.',
    bad:'"To be safe" math is not safe — it is just wrong in a cautious-sounding way.',
    why:'Each deduction line subtracts once. Re-subtracting manufactures missing money and breaks the budget for no reason.'
  };
}},
{id:'first-job-spot-05',verb:'spot',part:4,tier:'independent',skill:'first-job',
gen:(v)=>{
  const person=v.person();
  return {
    scenario:`<p>${person} plans the week from the stub\u2019s "year-to-date gross" line: $4,800. This check\u2019s actual gross: $800.</p>`,
    q:'What is the mistake here?',
    choices:v.shuffle([
      {label:'They read the year-to-date total as this check\u2019s pay — $4,800 is six checks, not one.',ok:true},
      {label:'Year-to-date numbers are always the right ones to budget from.',ok:false,mis:'paycheck-gross'},
      {label:'The mistake is not multiplying $4,800 by the tax rate.',ok:false},
      {label:'They should budget from the largest number on the stub.',ok:false,mis:'paycheck-gross'}
    ]),
    hint:'Year-to-date = so far this year.',
    good:'YTD answers "how much have I earned all year" — useless for "what lands Friday." This check\u2019s lines are the ones that pay this week\u2019s bills.',
    bad:'Budgeting six checks of income against one week of bills is a $4,000 fantasy.',
    why:'Stubs show both per-check and year-to-date figures. Weekly plans need per-check numbers; YTD is for tax season.'
  };
}},
{id:'first-job-spot-06',verb:'spot',part:4,tier:'independent',skill:'first-job',
gen:(v)=>{
  const person=v.person();
  return {
    scenario:`<p>${person}\u2019s math: $900 gross − $95 federal tax = $805 take-home.</p><p>The stub also shows: state tax $21.</p>`,
    q:'What is the mistake here?',
    choices:v.shuffle([
      {label:'They missed the $21 state-tax line — real take-home is $900 − $95 − $21 = $784.',ok:true},
      {label:'State tax does not reduce take-home; only federal does.',ok:false},
      {label:'They should have added the $21 instead of subtracting.',ok:false},
      {label:'$805 is correct; small lines like that are optional.',ok:false,mis:'guess-is-good-enough'}
    ]),
    hint:'Read every line, not just the big one.',
    good:'$21 × 26 checks = $546 a year hiding in one skipped line. Small lines are still subtractions.',
    bad:'"Optional-looking" is not a category on a pay stub. If it is printed as a deduction, it deducts.',
    why:'Take-home math must include every deduction line. The lines people skip are exactly the ones that quietly break budgets.'
  };
}},

/* ================= first-job · compare (6) ================= */
{id:'first-job-compare-01',verb:'compare',part:3,tier:'guided',skill:'first-job',
gen:(v)=>{
  const person=v.person();
  return {
    context:`<p>${person}'s check: $940 gross, $812 take-home.</p><p><b>Option A:</b> Build the monthly budget from the $940 gross.</p><p><b>Option B:</b> Build it from the $812 take-home.</p>`,
    q:'Which number gives a budget that actually works?',
    cue:'Only one of these numbers arrives in the account. Budgets spend arrivals.',
    choices:v.shuffle([
      {label:'Option B — $812 is real money; $940 includes $128 that never arrives.',ok:true},
      {label:'Option A — bigger income numbers make budgets more motivating.',ok:false,mis:'paycheck-gross'},
      {label:'Both work; the $128 gap closes itself over the month.',ok:false},
      {label:'Option A — deductions shrink over time, so gross becomes accurate.',ok:false,mis:'paycheck-gross'}
    ]),
    hint:'Which one can buy groceries?',
    good:'$812 planned = $812 spendable. $940 planned = a $128 weekly hole dug on day one.',
    bad:'Motivation does not pay bills. The $128 gap does not "close itself" — it becomes a missed payment.',
    why:'A working budget is built from money that arrives. Gross is a description; take-home is the deposit.'
  };
}},
{id:'first-job-compare-02',verb:'compare',part:3,tier:'guided',skill:'first-job',
gen:(v)=>{
  const person=v.person();
  return {
    context:`<p>Two stubs, same $800 gross.</p><p><b>Stub A:</b> take-home $640 (health premium + retirement).</p><p><b>Stub B:</b> take-home $612 (higher tax withholding, no benefits).</p>`,
    q:'Which check is bigger in hand?',
    cue:'Same gross, different subtractions. In-hand = after every line.',
    choices:v.shuffle([
      {label:'Stub A — $640 in hand beats $612, even with the benefit deductions.',ok:true},
      {label:'They are equal — same gross means same pay.',ok:false,mis:'paycheck-gross'},
      {label:'Stub B — fewer deduction lines means more money.',ok:false},
      {label:'Stub A — but only because benefits are free money.',ok:false}
    ]),
    hint:'Gross is the tie; deductions break it.',
    good:'$640 vs $612: the deductions decide. And Stub A\u2019s "extra" deductions bought health coverage and retirement — not nothing.',
    bad:'Same gross never means same pay. The stub\u2019s lines are the whole story.',
    why:'Equal gross pay can mean unequal take-home. Compare checks on the final line, and price what the deductions bought.'
  };
}},
{id:'first-job-compare-03',verb:'compare',part:3,tier:'guided',skill:'first-job',
gen:(v)=>{
  const person=v.person();
  return {
    context:`<p>${person} wants to save $150/month.</p><p><b>Option A:</b> Paper check in hand each payday; save "what is left."</p><p><b>Option B:</b> Direct deposit splits $75 per check straight to savings.</p>`,
    q:'Which setup actually protects the savings?',
    cue:'One option saves before spending is possible. The other saves after spending is done.',
    choices:v.shuffle([
      {label:'Option B — the money is saved before it can be spent.',ok:true},
      {label:'Option A — holding the full check builds discipline.',ok:false},
      {label:'Both save the same; the method does not matter.',ok:false,mis:'guess-is-good-enough'},
      {label:'Option A — "what is left" is usually more than $150.',ok:false,mis:'guess-is-good-enough'}
    ]),
    hint:'When does the saving happen?',
    good:'$75/check saved at deposit = $1,950/year without one decision. "What is left" usually loses to 30 days of impulses.',
    bad:'Discipline is a fine plan until the first sale, the first invite, the first "just this once."',
    why:'Savings that moves first is protected from spending. Savings that moves last competes with everything.'
  };
}},
{id:'first-job-compare-04',verb:'compare',part:4,tier:'independent',skill:'first-job',
gen:(v)=>{
  const person=v.person();
  return {
    context:`<p><b>Job A:</b> $18/hr × 40 hrs/week, take-home $590/week.</p><p><b>Job B:</b> Salary $2,600/month, take-home $2,080/month.</p>`,
    q:'Which pays more in hand per month? (A month ≈ 4.33 weeks.)',
    choices:v.shuffle([
      {label:'Job A — $590 × 4.33 ≈ $2,555/month beats $2,080.',ok:true},
      {label:'Job B — salary jobs always pay more than hourly.',ok:false,mis:'paycheck-gross'},
      {label:'Job B — $2,600 is bigger than $590.',ok:false,mis:'paycheck-gross'},
      {label:'They are equal — $18/hr is roughly $2,600/month.',ok:false,mis:'guess-is-good-enough'}
    ]),
    hint:'Convert both to the same period: monthly take-home.',
    good:'$2,555 vs $2,080 is a $475/month gap — nearly $5,700 a year. "Salary" is a pay structure, not a pay raise.',
    bad:'Comparing $2,600 (gross, monthly) to $590 (take-home, weekly) mixes two different units and two different stages.',
    why:'Compare offers in identical units: same period, both take-home. Everything else is marketing.'
  };
}},
{id:'first-job-compare-05',verb:'compare',part:4,tier:'independent',skill:'first-job',
gen:(v)=>{
  const person=v.person();
  return {
    context:`<p>${person}'s biweekly take-home: $1,050.</p><p><b>Option A:</b> Monthly income = $1,050 × 2 = $2,100.</p><p><b>Option B:</b> Monthly income = $1,050 × 26 ÷ 12 = $2,275.</p>`,
    q:'Which math is right?',
    choices:v.shuffle([
      {label:'Option B — 26 checks a year ÷ 12 months = $2,275/month.',ok:true},
      {label:'Option A — two checks a month, simple multiplication.',ok:false,mis:'guess-is-good-enough'},
      {label:'Both — the $175 difference is just rounding.',ok:false},
      {label:'Option A — the extra two checks are basically bonuses.',ok:false}
    ]),
    hint:'How many biweekly checks land in a year?',
    good:'26 ÷ 12 = 2.167 checks/month. "× 2" silently deletes two full checks a year — $2,100 of real money.',
    bad:'$175/month × 12 = $2,100/year missing from the budget. That is not rounding; that is a vanished paycheck.',
    why:'Biweekly pay = 26 checks/year. Monthly budgeting must use ×26÷12, or two checks a year disappear from the plan.'
  };
}},
{id:'first-job-compare-06',verb:'compare',part:4,tier:'independent',skill:'first-job',
gen:(v)=>{
  const person=v.person();
  return {
    context:`<p>Same $900 gross, two benefit choices.</p><p><b>Plan X:</b> $168 total deductions → $732 take-home.</p><p><b>Plan Y:</b> $121 total deductions → $779 take-home.</p>`,
    q:'Which plan leaves more in hand each check?',
    choices:v.shuffle([
      {label:'Plan Y — $779 take-home beats $732 by $47/check.',ok:true},
      {label:'Plan X — more deductions means better benefits, so it pays more.',ok:false},
      {label:'They are equal — same gross, same pay.',ok:false,mis:'paycheck-gross'},
      {label:'Plan X — the $47 gap is too small to matter.',ok:false,mis:'guess-is-good-enough'}
    ]),
    hint:'Subtract, then compare the remainders.',
    good:'$47 × 26 = $1,222/year. Small per-check gaps are large annual gaps — but price what Plan X\u2019s extra $47 buys before dismissing it.',
    bad:'"Too small to matter" × 26 checks = $1,222. Per-check thinking hides annual money.',
    why:'Benefit choices change take-home. Compare the final numbers, then decide whether the extra deductions\u2019 benefits are worth their price.'
  };
}},

/* ================= first-job · predict (6) ================= */
{id:'first-job-predict-01',verb:'predict',part:4,tier:'independent',skill:'first-job',
gen:(v)=>{
  const person=v.person();
  return {
    q:`${person} budgets from the $940 gross for three months, but take-home is $760 — a $180 monthly gap. What breaks first?`,
    choices:v.shuffle([
      {label:'Month one\u2019s rent comes up $180 short — the gap hits the biggest bill immediately.',ok:true},
      {label:'Nothing for three months; gross catches up to take-home over time.',ok:false,mis:'paycheck-gross'},
      {label:'The employer notices and raises take-home to match the budget.',ok:false},
      {label:'Only the savings goal breaks; bills are unaffected.',ok:false,mis:'guess-is-good-enough'}
    ]),
    hint:'$180 missing × month one.',
    good:'The $180 does not wait politely for month three — it is missing from the very first rent payment.',
    bad:'Gross never "catches up." Withholding is permanent; the gap renews every check.',
    why:'Budgeting from gross front-loads the shortfall: the first big bill exposes a gap that was baked in on day one.'
  };
}},
{id:'first-job-predict-02',verb:'predict',part:4,tier:'independent',skill:'first-job',
gen:(v)=>{
  const person=v.person();
  return {
    q:`${person} never completes the W-4, so almost nothing is withheld for federal tax all year. What happens in April?`,
    choices:v.shuffle([
      {label:'A lump-sum tax bill for everything that should have been withheld — due at once.',ok:true},
      {label:'Nothing — unwithheld taxes are forgiven the first year.',ok:false},
      {label:'The employer pays the missing tax as a penalty for not asking.',ok:false},
      {label:'Withholding catches up automatically in December.',ok:false,mis:'guess-is-good-enough'}
    ]),
    hint:'The tax was never canceled, only postponed.',
    good:'Twelve months of missing withholding arrive as one bill. April does not negotiate.',
    bad:'"Forgiven the first year" is not a tax rule anyone has ever met.',
    why:'Withholding spreads the tax bill across checks. Skipping it concentrates the whole year into April.'
  };
}},
{id:'first-job-predict-03',verb:'predict',part:4,tier:'independent',skill:'first-job',
gen:(v)=>{
  const person=v.person();
  return {
    q:`${person}'s health premium rises $30 per biweekly check, but the budget is never updated. What breaks first?`,
    choices:v.shuffle([
      {label:'The monthly budget runs $65 short — a bill or the savings goal gives way within a month or two.',ok:true},
      {label:'Nothing — $30 is too small to affect a monthly budget.',ok:false,mis:'guess-is-good-enough'},
      {label:'Take-home rises to cover it automatically.',ok:false},
      {label:'The premium drops back down on its own next quarter.',ok:false}
    ]),
    hint:'$30 × 26 ÷ 12.',
    good:'$30/check × 26 ÷ 12 = $65/month of new deduction. Unbudgeted, it eats the savings goal first, then a bill.',
    bad:'Small per-check changes are monthly changes in disguise. $30 "small" is $780 a year.',
    why:'Deduction changes alter take-home permanently. Budgets built on old take-home numbers slowly suffocate.'
  };
}},
{id:'first-job-predict-04',verb:'predict',part:4,tier:'independent',skill:'first-job',
gen:(v)=>{
  const person=v.person();
  return {
    q:`${person} picks up 8 overtime hours at $27/hr — $216 extra gross. What happens to take-home?`,
    choices:v.shuffle([
      {label:'It rises, but by less than $216 — the extra earnings are also taxed and deducted.',ok:true},
      {label:'It rises by exactly $216 — overtime is paid tax-free.',ok:false,mis:'paycheck-gross'},
      {label:'It stays the same — overtime never changes the check.',ok:false},
      {label:'It rises by more than $216 because of the overtime bonus.',ok:false,mis:'guess-is-good-enough'}
    ]),
    hint:'New earnings, same stub rules.',
    good:'Overtime is gross like everything else: taxed, deducted, then kept. Expect roughly $160–$170 of the $216.',
    bad:'"Tax-free overtime" is a myth that has disappointed many first paychecks.',
    why:'Every added dollar of gross passes through the same deductions. Overtime raises take-home — just not dollar for dollar.'
  };
}},
{id:'first-job-predict-05',verb:'predict',part:4,tier:'independent',skill:'first-job',
gen:(v)=>{
  const person=v.person();
  return {
    q:`${person} switches from weekly pay ($590 take-home) to biweekly pay ($1,180 take-home) and doubles every weekly budget line. What breaks?`,
    choices:v.shuffle([
      {label:'Cash-flow timing breaks — the monthly total is about the same, but a $1,180 check invites $1,180 weekends followed by two starving weeks.',ok:true},
      {label:'Nothing — doubling every weekly line is exactly right for biweekly pay.',ok:false},
      {label:'They get paid twice as much per month now.',ok:false,mis:'paycheck-gross'},
      {label:'Taxes double, so take-home stays $590.',ok:false}
    ]),
    hint:'The monthly total is fine. What changed is WHEN money arrives.',
    good:'Monthly math survives ($1,180 biweekly ≈ $2,555/month), but weekly spending habits do not: the big check feels like a bonus and gets spent like one.',
    bad:'"Twice the check" feels like twice the money. It is the same money on a slower schedule.',
    why:'Pay-frequency changes redistribute cash flow, not income. Budgets must follow the new rhythm or the big check gets spent like a bonus.'
  };
}},
{id:'first-job-predict-06',verb:'predict',part:4,tier:'independent',skill:'first-job',
gen:(v)=>{
  const person=v.person();
  return {
    q:`${person} quits mid-month. The final check is half the usual size, but all the monthly autopays are still full-size. What breaks first?`,
    choices:v.shuffle([
      {label:'The autopays hit a half-size deposit — the largest one bounces or overdrafts the account.',ok:true},
      {label:'Autopays shrink automatically to match the smaller check.',ok:false},
      {label:'The employer covers the gap as a courtesy.',ok:false,mis:'overdraft-as-backup'},
      {label:'Nothing — final checks are always full-size by law.',ok:false,mis:'unverified-source'}
    ]),
    hint:'Fixed bills, variable final pay.',
    good:'Autopays do not know you quit. The half check covers half the obligations; the rest bounce.',
    bad:'No law tops up a final check to full size. Hours worked = pay earned, nothing more.',
    why:'Income can change overnight; scheduled bills cannot. Transition months need the autopays rechecked against the actual incoming pay.'
  };
}},

/* ================= first-job · build (5) ================= */
{id:'first-job-build-01',verb:'build',part:4,tier:'independent',skill:'first-job',
gen:(v)=>{
  const person=v.person();
  const total=620;
  return {
    h:'Build it: split the take-home check',
    body:`<p>${person}'s take-home is ${v.money(total)}. Split the real number — not the gross.</p>`,
    totalDollars:total,
    buckets:[{id:'bills',label:'Bills'},{id:'needs',label:'Needs'},{id:'savings',label:'Savings'},{id:'wants',label:'Wants'}],
    targets:{bills:340,needs:150,savings:70,wants:60},
    hint:'Take-home is the only honest starting point.',
    good:'$620 split four ways with nothing imaginary: bills covered, needs met, savings alive.',
    bad:'Building this from the $800 gross would plan $180 of spending that never arrives.',
    why:'Splitting take-home — never gross — is what makes every bucket real money.'
  };
}},
{id:'first-job-build-02',verb:'build',part:4,tier:'independent',skill:'first-job',
gen:(v)=>{
  const person=v.person();
  const total=745;
  return {
    h:'Build it: split a $745 take-home',
    body:`<p>${person} kept ${v.money(total)} from an $880 gross. Split what survived.</p>`,
    totalDollars:total,
    buckets:[{id:'bills',label:'Bills'},{id:'needs',label:'Needs'},{id:'savings',label:'Savings'},{id:'wants',label:'Wants'}],
    targets:{bills:420,needs:165,savings:90,wants:70},
    hint:'The $135 in deductions is gone — do not spend it twice.',
    good:'$745, fully assigned: the deductions already took their share, so every remaining dollar is spendable.',
    bad:'Planning from $880 double-spends the $135 the stub already removed.',
    why:'Deductions are spent before you ever see the check. Budget only the survivors.'
  };
}},
{id:'first-job-build-03',verb:'build',part:4,tier:'independent',skill:'first-job',
gen:(v)=>{
  const person=v.person();
  const total=532;
  return {
    h:'Build it: a small check, split exactly',
    body:`<p>${person}'s take-home is only ${v.money(total)}. Small checks need exact splits the most.</p>`,
    totalDollars:total,
    buckets:[{id:'bills',label:'Bills'},{id:'needs',label:'Needs'},{id:'savings',label:'Savings'},{id:'wants',label:'Wants'}],
    targets:{bills:300,needs:130,savings:52,wants:50},
    hint:'Small check, same order: bills first.',
    good:'Even $52 of savings counts — the habit matters more than the amount at this size.',
    bad:'Zeroing savings "until the check gets bigger" is how small checks stay small forever.',
    why:'The split works at any size because the order — not the amounts — is the system.'
  };
}},
{id:'first-job-build-04',verb:'build',part:4,tier:'independent',skill:'first-job',
gen:(v)=>{
  const person=v.person();
  const total=1050;
  return {
    h:'Build it: split the biweekly take-home',
    body:`<p>${person}'s biweekly take-home: ${v.money(total)}. Cover two weeks with one split.</p>`,
    totalDollars:total,
    buckets:[{id:'bills',label:'Bills'},{id:'needs',label:'Two-week needs'},{id:'savings',label:'Savings'},{id:'wants',label:'Wants'}],
    targets:{bills:600,needs:220,savings:130,wants:100},
    hint:'Biweekly means this split must last 14 days.',
    good:'$1,050 stretched across two weeks: bills locked, needs paced, savings automatic.',
    bad:'Treating a biweekly check like a weekly one spends 14 days of money in 7.',
    why:'The split must match the pay period — a biweekly check funds two weeks, not one big week.'
  };
}},
{id:'first-job-build-05',verb:'build',part:4,tier:'independent',skill:'first-job',
gen:(v)=>{
  const person=v.person();
  const total=812;
  return {
    h:'Build it: first real paycheck split',
    body:`<p>${person}'s first full take-home: ${v.money(total)} (from $940 gross). Make it count.</p>`,
    totalDollars:total,
    buckets:[{id:'bills',label:'Bills'},{id:'needs',label:'Needs'},{id:'savings',label:'Savings'},{id:'wants',label:'Wants'}],
    targets:{bills:460,needs:180,savings:92,wants:80},
    hint:'The $128 gap between gross and take-home is already gone — do not resurrect it.',
    good:'$812, every dollar employed: the gross is a memory, the take-home is the budget.',
    bad:'Sneaking the $128 back into wants is budgeting money the stub already buried.',
    why:'The first paycheck sets the pattern: split what arrived, forget what was described.'
  };
}},

/* ================= first-job · explain (5) ================= */
{id:'first-job-explain-01',verb:'explain',part:3,tier:'guided',skill:'first-job',
gen:(v)=>({
  h:'Teach it back: gross vs take-home',
  prompt:'Explain in your own words the difference between gross pay and take-home pay — and which one a budget should use.',
  cue:'Gross is the starting number; take-home is what survives. Which one can actually be spent?',
  keyPoints:['Gross pay is earnings before anything is taken out','Take-home is what remains after taxes and other deductions','The gap is real money that never reaches you','Budgets must use take-home, or they plan spending for phantom money'],
  modelAnswer:'Gross pay is what you earned before deductions; take-home is what is left after taxes and other deductions are withheld. The difference never reaches your account, so budgets must be built from take-home — planning from gross bakes imaginary money into every line.',
  hint:'Starting line vs finish line.'
})},
{id:'first-job-explain-02',verb:'explain',part:3,tier:'guided',skill:'first-job',
gen:(v)=>({
  h:'Teach it back: W-4 vs W-2',
  prompt:'Explain in your own words what the W-4 and the W-2 each do — and when you deal with each one.',
  cue:'One is filled out at the START of a job and controls withholding. The other ARRIVES in January and reports the year. Which is which?',
  keyPoints:['W-4: completed when starting a job; tells the employer how much federal tax to withhold','W-2: received in January; reports last year\u2019s wages and withholding','The W-2 is used when preparing the tax return','Keep the W-2 somewhere findable — it is needed once a year, urgently'],
  modelAnswer:'The W-4 is filled out when you start a job so the employer withholds the right federal tax from each check. The W-2 arrives each January showing last year\u2019s wages and withholding, and you use it to prepare your tax return. One sets the withholding; the other reports it.',
  hint:'Start-of-job vs January.'
})},
{id:'first-job-explain-03',verb:'explain',part:4,tier:'independent',skill:'first-job',
gen:(v)=>({
  h:'Teach it back: computing take-home from a stub',
  prompt:'Explain in your own words the exact steps to find take-home pay from a pay stub.',
  keyPoints:['Find the gross pay line — the starting number','Add up EVERY deduction line: taxes plus other deductions','Subtract the deduction total from gross — once','The result is take-home; never skip a line or subtract twice'],
  modelAnswer:'First read the gross pay line. Then add up every deduction line — taxes and non-tax deductions alike. Subtract that total from gross exactly once. The result is take-home pay: skipping a line overstates it, and subtracting twice understates it.',
  hint:'Gross, minus everything, once.'
})},
{id:'first-job-explain-04',verb:'explain',part:4,tier:'independent',skill:'first-job',
gen:(v)=>({
  h:'Teach it back: same gross, different check',
  prompt:'Explain in your own words how two paychecks with the same gross pay can leave different take-home amounts.',
  keyPoints:['Gross is only the starting number; deductions decide the rest','Different tax withholding changes take-home','Benefit choices (health, retirement) change take-home too','Compare jobs and checks on the take-home line, not the gross line'],
  modelAnswer:'Gross pay is just the starting point — what matters is what gets subtracted. Different withholding, different benefit elections, and different deduction lines mean the same gross can produce very different take-home amounts. Always compare the final line.',
  hint:'Same start, different subtractions.'
})},
{id:'first-job-explain-05',verb:'explain',part:4,tier:'independent',skill:'first-job',
gen:(v)=>({
  h:'Teach it back: the paycheck-gross trap',
  prompt:'Explain in your own words why budgeting from gross pay breaks — and what to do instead.',
  keyPoints:['Gross includes money that withholding already removed','Every budget line built on gross is overstated by the gap','The shortfall hits the biggest bills first','Build every plan from the take-home number on the stub'],
  modelAnswer:'Budgeting from gross pay plans spending for money that taxes and deductions already took. The gap — often hundreds a month — does not spread politely; it hits the first big bill as a shortfall. The fix is simple: every plan starts from the take-home line on the actual stub.',
  hint:'Phantom money, real bills.'
})}
],
'credit': [

/* ================= credit · choice (8) ================= */
{id:'credit-choice-01',verb:'choice',part:3,tier:'guided',skill:'credit',
gen:(v)=>{
  const person=v.person();
  const price=450;
  return {
    q:`A ${v.money(price)} bike does not fit ${person}'s plan this month, but the credit card has room. What is the financially accurate way to classify using the card?`,
    cue:'The card does not create money — it moves the payment through time. What is that called?',
    choices:v.shuffle([
      {label:'Borrowed money that creates a future payment obligation.',ok:true},
      {label:'Extra income, because the card increases what can be spent today.',ok:false,mis:'credit-as-income'},
      {label:'Savings, because paying later is the same as saving now.',ok:false,mis:'delay-is-savings'},
      {label:'Free money until the statement arrives.',ok:false,mis:'later-is-free'}
    ]),
    hint:'Credit changes WHEN you pay, not WHETHER you pay.',
    good:'The $450 still costs $450 — plus any interest. The card is a time machine for the payment, not a discount.',
    bad:'"Extra income" has to be repaid with interest. That is the definition of debt, not income.',
    why:'Credit is borrowing: spending today\u2019s wants with tomorrow\u2019s money, plus the lender\u2019s price.'
  };
}},
{id:'credit-choice-02',verb:'choice',part:3,tier:'guided',skill:'credit',
gen:(v)=>{
  const person=v.person();
  return {
    q:`${person}'s card has a $2,000 credit limit. What does that limit actually mean?`,
    cue:'A limit is a ceiling the lender sets. A ceiling on what?',
    choices:v.shuffle([
      {label:'The maximum the lender will let them borrow on this card.',ok:true},
      {label:'Extra monthly income of $2,000 from the card company.',ok:false,mis:'credit-as-income'},
      {label:'$2,000 of savings the bank is holding for them.',ok:false},
      {label:'A reward: spend $2,000 and the bank forgives it.',ok:false,mis:'later-is-free'}
    ]),
    hint:'Limits limit borrowing — not earning.',
    good:'$2,000 is how deep the hole can go, not how high the income is. Every dollar used must come back.',
    bad:'A limit is not a gift, a salary, or savings. It is pre-approved debt.',
    why:'A credit limit caps borrowing. Treating it as income turns a ceiling into a spending target.'
  };
}},
{id:'credit-choice-03',verb:'choice',part:3,tier:'guided',skill:'credit',
gen:(v)=>{
  const person=v.person();
  return {
    q:`${person} heard "carry a balance to build credit." They are considering leaving $300 unpaid each month on purpose. What is the accurate move?`,
    cue:'Payment HISTORY builds credit — not interest paid. What kind of history does "paid in full, on time" create?',
    choices:v.shuffle([
      {label:'Pay in full each month — on-time full payments build history without paying interest.',ok:true},
      {label:'Carry the $300 — paying interest proves you can handle debt.',ok:false,mis:'credit-shield'},
      {label:'Carry the $300 — the lender rewards balances with higher scores.',ok:false,mis:'credit-shield'},
      {label:'Max out the card — high balances show high trust.',ok:false,mis:'credit-as-income'}
    ]),
    hint:'Lenders track whether you paid, not how much interest you donated.',
    good:'"Paid in full, on time" is perfect payment history at $0 interest. Carrying a balance buys nothing but interest charges.',
    bad:'Carrying $300 at 24% costs $6/month for a myth. The score never sees the interest — only the on-time payment.',
    why:'Credit history records on-time payments. Paying in full still creates that history — carrying a balance just adds a fee for the same record.'
  };
}},
{id:'credit-choice-04',verb:'choice',part:4,tier:'independent',skill:'credit',
gen:(v)=>{
  const person=v.person();
  const bal=600, apr=24, monthly=Math.round(bal*apr/12*100)/100;
  return {
    q:`${person} carries a ${v.money(bal)} balance at ${apr}% APR and pays nothing this month. About how much interest is added for the month? (Monthly rate = APR ÷ 12.)`,
    choices:v.shuffle([
      {label:`${v.money(monthly)} — ${v.money(bal)} × ${apr}% ÷ 12.`,ok:true},
      {label:`${v.money(bal*apr/100)} — ${apr}% of the balance, charged monthly.`,ok:false,mis:'apr-as-monthly'},
      {label:`${v.money(Math.round(bal*apr/12/12*100)/100)} — divide by 12 twice to be safe.`,ok:false},
      {label:'$0 — interest only starts after a full year.',ok:false,mis:'later-is-free'}
    ]),
    hint:'APR is annual. One month is one-twelfth of it.',
    good:`$600 × 24% ÷ 12 = $12/month. That is $144 a year for the privilege of not paying.`,
    bad:'APR ÷ 12, not APR. Using the annual rate monthly overstates — and misunderstanding it understates the real cost the rest of the year.',
    why:'APR is a yearly price. Monthly interest = balance × APR ÷ 12. The division by 12 is the whole trick.'
  };
}},
{id:'credit-choice-05',verb:'choice',part:4,tier:'independent',skill:'credit',
gen:(v)=>{
  const person=v.person();
  const bal=900, apr=18, monthly=Math.round(bal*apr/12*100)/100;
  return {
    q:`${person} carries ${v.money(bal)} at ${apr}% APR. How much interest accrues in one month?`,
    choices:v.shuffle([
      {label:`${v.money(monthly)} — ${v.money(bal)} × ${apr}% ÷ 12.`,ok:true},
      {label:`${v.money(162)} — 18% of $900, every month.`,ok:false,mis:'apr-as-monthly'},
      {label:`${v.money(9)} — move the decimal; APR math is basically 1%.`,ok:false,mis:'guess-is-good-enough'},
      {label:'Nothing until the balance hits $1,000.',ok:false}
    ]),
    hint:'Balance × APR ÷ 12.',
    good:`$900 × 18% ÷ 12 = $13.50/month — $162 a year. The balance charges rent for existing.`,
    bad:'18% is the annual price. Charging it monthly would be a 216% APR — even cards are not that bold.',
    why:'Same formula every time: balance × APR ÷ 12 = one month\u2019s interest. Memorize the shape, not the numbers.'
  };
}},
{id:'credit-choice-06',verb:'choice',part:4,tier:'independent',skill:'credit',
gen:(v)=>{
  const person=v.person();
  const bal=750, apr=20, yearly=Math.round(bal*apr/100);
  return {
    q:`${person} carries ${v.money(bal)} at ${apr}% APR for a full year without paying it down. About how much interest does that year cost?`,
    choices:v.shuffle([
      {label:`${v.money(yearly)} — ${v.money(bal)} × ${apr}%.`,ok:true},
      {label:`${v.money(yearly*12)} — the monthly amount times 12 again.`,ok:false,mis:'apr-as-monthly'},
      {label:`${v.money(75)} — roughly 10% feels right.`,ok:false,mis:'guess-is-good-enough'},
      {label:'$0 — carrying a balance is free if you pay the minimum.',ok:false,mis:'min-payment-trap'}
    ]),
    hint:'A full year at the annual rate: balance × APR.',
    good:`$750 × 20% = $150 — one-fifth of the balance, paid for the privilege of owing it. That is a nice dinner out, converted into interest.`,
    bad:'"Feels right" is not a rate. The APR is printed on the statement — $150 is the receipt.',
    why:'Annual cost of carrying = balance × APR. One multiplication shows the yearly price of "I\u2019ll pay it later."'
  };
}},
{id:'credit-choice-07',verb:'choice',part:4,tier:'independent',skill:'credit',
gen:(v)=>{
  const person=v.person();
  const bal=400, apr=24, interest=Math.round(bal*apr/12*100)/100, min=25, principal=min-interest;
  return {
    q:`${person} owes ${v.money(bal)} at ${apr}% APR. The minimum payment is ${v.money(min)}. How much of that ${v.money(min)} actually reduces the balance?`,
    choices:v.shuffle([
      {label:`${v.money(principal)} — ${v.money(min)} minus ${v.money(interest)} interest.`,ok:true},
      {label:`${v.money(min)} — the whole minimum attacks the balance.`,ok:false,mis:'min-payment-trap'},
      {label:`$0 — minimums never touch the balance.`,ok:false,mis:'interest-eats-all'},
      {label:`${v.money(min+interest)} — payments get a bonus for being on time.`,ok:false}
    ]),
    hint:'Interest eats first. The balance gets the leftovers.',
    good:`$8 of the $25 is interest; only $17 shrinks the debt. At that pace the $400 takes about two years to die.`,
    bad:'"The whole minimum attacks the balance" is the trap\u2019s sales pitch. Interest always takes its cut first.',
    why:'Every payment covers that month\u2019s interest first; only the remainder reduces what you owe. Minimums maximize the interest\u2019s share.'
  };
}},
{id:'credit-choice-08',verb:'choice',part:4,tier:'independent',skill:'credit',
gen:(v)=>{
  const person=v.person();
  const bal=300, apr=24, monthly=Math.round(bal*apr/12*100)/100;
  return {
    q:`${person} can pay ${v.money(bal)} in full today, or carry it at ${apr}% APR. What does carrying it cost per month?`,
    choices:v.shuffle([
      {label:`${v.money(monthly)} per month — for no benefit at all.`,ok:true},
      {label:'$0 — small balances do not accrue interest.',ok:false,mis:'later-is-free'},
      {label:`${v.money(72)} per month — 24% of $300, monthly.`,ok:false,mis:'apr-as-monthly'},
      {label:'It earns money — the bank pays you to carry balances.',ok:false,mis:'credit-shield'}
    ]),
    hint:'Balance × APR ÷ 12. Then ask what the $6 buys.',
    good:'$6/month to owe $300 you could have cleared. Carrying a payable balance is paying rent on your own money.',
    bad:'"Small" does not mean "free." Interest has no minimum balance requirement.',
    why:'Any carried balance accrues interest from day one of the carry. If you can pay in full, carrying is pure cost.'
  };
}},

/* ================= credit · sort (6) ================= */
{id:'credit-sort-01',verb:'sort',part:4,tier:'independent',skill:'credit',
gen:(v)=>({
  h:'Sort it: what kind of credit event is this?',
  body:'<p>Sort each card event into borrowing, repaying, or the cost of borrowing.</p>',
  buckets:['Borrowing','Repaying','Cost of borrowing'],
  items:v.shuffle([
    {label:'Swiped card for $80 groceries',a:'borrowing',why:'New debt created.'},
    {label:'Paid the statement in full',a:'repaying',why:'Debt cleared.'},
    {label:'Interest charge $9.40',a:'cost of borrowing',why:'The lender\u2019s price.'},
    {label:'Late fee $30',a:'cost of borrowing',why:'A penalty price.'},
    {label:'Sent $200 to the card',a:'repaying',why:'Payment toward debt.'},
    {label:'Cash advance $100',a:'borrowing',why:'Borrowed cash — usually at a higher rate.'}
  ])
})},
{id:'credit-sort-02',verb:'sort',part:4,tier:'independent',skill:'credit',
gen:(v)=>({
  h:'Sort it: fees, payments, and new debt',
  body:'<p>Sort each event by what it really is.</p>',
  buckets:['Borrowing','Repaying','Cost of borrowing'],
  items:v.shuffle([
    {label:'Bought $250 headphones on the card',a:'borrowing',why:'New debt.'},
    {label:'Minimum payment $25',a:'repaying',why:'A payment — even a small one.'},
    {label:'Finance charge $12',a:'cost of borrowing',why:'Interest, renamed.'},
    {label:'Extra $100 payment',a:'repaying',why:'Payment above the minimum.'},
    {label:'Annual fee $95',a:'cost of borrowing',why:'Cost of keeping the card.'},
    {label:'Balance transfer in: $500',a:'borrowing',why:'Debt moved, not erased.'}
  ])
})},
{id:'credit-sort-03',verb:'sort',part:4,tier:'independent',skill:'credit',
gen:(v)=>({
  h:'Sort it: a messy statement month',
  body:'<p>One statement, many events. Sort them all.</p>',
  buckets:['Borrowing','Repaying','Cost of borrowing'],
  items:v.shuffle([
    {label:'Charged $60 gas',a:'borrowing',why:'New debt.'},
    {label:'Paid $60 toward the card',a:'repaying',why:'Payment.'},
    {label:'Over-limit fee $35',a:'cost of borrowing',why:'Penalty price.'},
    {label:'Interest on carried balance $7.20',a:'cost of borrowing',why:'The monthly rent on debt.'},
    {label:'Returned payment fee $30',a:'cost of borrowing',why:'Penalty price.'},
    {label:'Autopay to card $150',a:'repaying',why:'Payment.'}
  ])
})},
{id:'credit-sort-04',verb:'sort',part:4,tier:'independent',skill:'credit',
gen:(v)=>({
  h:'Sort it: the promo that expired',
  body:'<p>A "no interest for 6 months" promo just ended. Sort the fallout.</p>',
  buckets:['Borrowing','Repaying','Cost of borrowing'],
  items:v.shuffle([
    {label:'TV bought during promo: $900',a:'borrowing',why:'The original debt.'},
    {label:'Payments made during promo: $400',a:'repaying',why:'Payments made.'},
    {label:'Deferred interest added at expiry: $140',a:'cost of borrowing',why:'Retroactive interest — the promo\u2019s fine print.'},
    {label:'New purchases after promo: $120',a:'borrowing',why:'New debt at full rate.'},
    {label:'Payment after expiry: $200',a:'repaying',why:'Payment.'},
    {label:'Late fee during promo: $30',a:'cost of borrowing',why:'Penalty price.'}
  ])
})},
{id:'credit-sort-05',verb:'sort',part:4,tier:'independent',skill:'credit',
gen:(v)=>({
  h:'Sort it: phone bill on the card',
  body:'<p>Monthly card routine. Sort each event.</p>',
  buckets:['Borrowing','Repaying','Cost of borrowing'],
  items:v.shuffle([
    {label:'Phone bill charged: $45',a:'borrowing',why:'New debt.'},
    {label:'Paid more than minimum: $80',a:'repaying',why:'Payment above minimum.'},
    {label:'Cash-advance fee $10',a:'cost of borrowing',why:'Fee price.'},
    {label:'Late fee $30',a:'cost of borrowing',why:'Penalty price.'},
    {label:'Statement paid in full',a:'repaying',why:'Full repayment.'},
    {label:'Interest charged: $4.10',a:'cost of borrowing',why:'Interest price.'}
  ])
})},
{id:'credit-sort-06',verb:'sort',part:4,tier:'independent',skill:'credit',
gen:(v)=>({
  h:'Sort it: the repair payoff',
  body:'<p>A car repair went on the card. Sort the payoff journey.</p>',
  buckets:['Borrowing','Repaying','Cost of borrowing'],
  items:v.shuffle([
    {label:'Emergency repair charged: $400',a:'borrowing',why:'New debt — the repair.'},
    {label:'Monthly $100 payments',a:'repaying',why:'Payoff payments.'},
    {label:'Monthly interest $6.67',a:'cost of borrowing',why:'Interest while carrying.'},
    {label:'Paid it off completely',a:'repaying',why:'Final payment.'},
    {label:'Balance-transfer fee 3%',a:'cost of borrowing',why:'Fee price.'},
    {label:'Groceries charged meanwhile: $90',a:'borrowing',why:'New debt added mid-payoff.'}
  ])
})},

/* ================= credit · decide (8) ================= */
{id:'credit-decide-01',verb:'decide',part:3,tier:'guided',skill:'credit',
gen:(v)=>{
  const person=v.person();
  return {
    q:`A $300 game console does not fit ${person}'s plan this month. The card has $1,500 of room. What is the call?`,
    cue:'The card makes "today" possible. What does it do to the next three months?',
    choices:v.shuffle([
      {label:'Wait and save — the console costs $300 either way, but the card adds interest and a monthly obligation.',ok:true},
      {label:'Buy it on the card — available credit means it fits the budget.',ok:false,mis:'borrow-to-spend'},
      {label:'Buy it — the limit is basically extra income this month.',ok:false,mis:'credit-as-income'},
      {label:'Buy it and pay the minimum; minimums keep it affordable.',ok:false,mis:'min-payment-trap'}
    ]),
    hint:'"Fits the card" ≠ "fits the plan."',
    good:'Waiting costs $300. The card costs $300 plus interest plus three months of payments for a want that could wait.',
    bad:'Available credit is not available money. The statement arrives with the full $300 either way.',
    why:'Borrowing for a want converts one payment into many — with interest. If the want can wait, waiting is cheaper.'
  };
}},
{id:'credit-decide-02',verb:'decide',part:3,tier:'guided',skill:'credit',
gen:(v)=>{
  const person=v.person();
  return {
    q:`${person}'s car needs a $400 repair to get to work. No savings, no buffer. The card charges 24% APR. What is the call?`,
    cue:'This is a Need (getting to work), not a Want. Borrowing can be a tool — what makes it a tool instead of a trap?',
    choices:v.shuffle([
      {label:'Use the card, then pay $110/month until it is clear — borrowing with a written payoff plan.',ok:true},
      {label:'Do not borrow at any cost — walk to work instead.',ok:false},
      {label:'Use the card and pay the minimum — minimums are designed for this.',ok:false,mis:'min-payment-trap'},
      {label:'Put it on the card and deal with the balance "eventually."',ok:false,mis:'borrow-to-spend'}
    ]),
    hint:'A tool has a handle: the payoff plan.',
    good:'$400 at $110/month clears in 4 months with about $20 interest. The repair earns its keep — the plan keeps the cost honest.',
    bad:'"Eventually" at 24% turns a $400 repair into a $600 repair. The minimum stretches it past a year.',
    why:'Borrowing for a true need is legitimate — with a fixed payoff plan that kills the debt fast. The plan is what separates tool from trap.'
  };
}},
{id:'credit-decide-03',verb:'decide',part:3,tier:'guided',skill:'credit',
gen:(v)=>{
  const person=v.person(), friend=v.person();
  return {
    q:`${friend} says: "My card gave me a $3,000 limit — that\u2019s basically a $3,000 raise." ${person} is nodding along. What should ${person} actually conclude?`,
    cue:'A raise is money you keep. A limit is money you must return. Which one is $3,000 of limit?',
    choices:v.shuffle([
      {label:'Reject it — a limit is pre-approved debt, not income; every dollar spent must be repaid.',ok:true},
      {label:'Agree — $3,000 of limit spends exactly like a $3,000 raise.',ok:false,mis:'credit-as-income'},
      {label:'Agree — the bank would not offer it if it were not safe to spend.',ok:false,mis:'credit-as-income'},
      {label:'Split the difference — treat half the limit as income.',ok:false,mis:'guess-is-good-enough'}
    ]),
    hint:'Raises do not send statements.',
    good:'$3,000 of limit "spent like a raise" becomes $3,000 of debt plus interest. The bank profits precisely when you believe the pitch.',
    bad:'Banks offer limits hoping you will use them — that is how they earn interest. The offer is not financial advice.',
    why:'Credit-as-income is the most expensive misconception on this list: it turns every limit increase into a spending increase.'
  };
}},
{id:'credit-decide-04',verb:'decide',part:3,tier:'guided',skill:'credit',
gen:(v)=>{
  const person=v.person();
  return {
    q:`${person} is $50 over budget on wants this month. The card has plenty of room. What is the call?`,
    cue:'$50 of want, borrowed at 24%. What does that $50 really cost by the time it is repaid?',
    choices:v.shuffle([
      {label:'Wait — trim $50 somewhere or skip it; borrowing for budget overflow just moves the hole to next month.',ok:true},
      {label:'Charge it — $50 is too small for interest to matter.',ok:false,mis:'borrow-to-spend'},
      {label:'Charge it — the minimum will be tiny, so it is affordable.',ok:false,mis:'min-payment-trap'},
      {label:'Charge it and pay it "whenever" — small balances take care of themselves.',ok:false,mis:'later-is-free'}
    ]),
    hint:'Budget overflow + card = overflow with interest.',
    good:'$50 skipped is $50 saved. $50 charged at minimums lingers for months, collecting interest on a want nobody remembers.',
    bad:'Small borrowed wants are how $50 holes become $500 balances — one "too small to matter" at a time.',
    why:'Borrowing to cover budget overflow does not fix the budget; it finances it. The overflow returns next month, now with interest.'
  };
}},
{id:'credit-decide-05',verb:'decide',part:5,tier:'independent',skill:'credit',
gen:(v)=>{
  const person=v.person();
  return {
    q:`${person} wants a $1,200 laptop. Path 1: save $200/month for 6 months, then buy. Path 2: buy today on the card at 22% APR, paying $200/month. Which path costs less total?`,
    choices:v.shuffle([
      {label:'Path 1 — $1,200 total, zero interest, and six months to be sure about the purchase.',ok:true},
      {label:'Path 2 — $200/month is $200/month either way, so they cost the same.',ok:false,mis:'fee-face-value'},
      {label:'Path 2 — paying interest builds credit faster.',ok:false,mis:'credit-shield'},
      {label:'Path 1 — but only because waiting is virtuous, not because of math.',ok:false}
    ]),
    hint:'Path 2 adds ~$75+ in interest. Path 1 adds $0.',
    good:'Path 1: $1,200 out the door. Path 2: $1,200 plus roughly $75–$90 in interest — paying extra for the privilege of impatience.',
    bad:'"$200/month either way" ignores the interest line entirely. Same payment, different total.',
    why:'Saving first vs borrowing first: identical monthly effort, but borrowing adds the lender\u2019s price to the same purchase.'
  };
}},
{id:'credit-decide-06',verb:'decide',part:5,tier:'independent',skill:'credit',
gen:(v)=>{
  const person=v.person();
  return {
    q:`A store card offers "$800 at 0% for 6 months!" The fine print: deferred interest — if ANY balance remains at month 6, all 6 months of interest (24% APR) hits at once. ${person} can pay $130/month. What is the call?`,
    choices:v.shuffle([
      {label:'Only take it if the full $800 is gone by month 6 — $130 × 6 = $780 leaves $20, triggering ~$96 retroactive interest.',ok:true},
      {label:'Take it — 0% means 0%, and $130/month is responsible.',ok:false,mis:'fee-face-value'},
      {label:'Take it and pay the minimum — the promo protects minimum payers.',ok:false,mis:'min-payment-trap'},
      {label:'Take it — deferred interest is just a scare word.',ok:false}
    ]),
    hint:'$130 × 6 = $780. The promo demands $800. Do the subtraction.',
    good:'$20 short at month 6 = ~$96 of retroactive interest on the original $800. "Almost paid off" is the promo\u2019s favorite outcome.',
    bad:'Deferred interest is not a scare word — it is interest charged retroactively on the full original balance.',
    why:'Deferred-interest promos punish near-misses. Read the payoff math before the headline rate: the deadline is the real term.'
  };
}},
{id:'credit-decide-07',verb:'decide',part:5,tier:'independent',skill:'credit',
gen:(v)=>{
  const person=v.person();
  return {
    q:`${person} wants $500 concert tickets. The card charges 24% APR, and they would pay $50/month. Total cost if carried: about $545 over 11 months. Skip or buy?`,
    choices:v.shuffle([
      {label:'Skip — $45 in interest plus 11 months of payments for one night is a bad trade.',ok:true},
      {label:'Buy — $50/month is affordable, so it fits.',ok:false,mis:'min-payment-trap'},
      {label:'Buy — concerts are experiences, and experiences are priceless.',ok:false,mis:'borrow-to-spend'},
      {label:'Buy — $45 of interest is basically nothing.',ok:false,mis:'fee-face-value'}
    ]),
    hint:'Price the night, not the month.',
    good:'One night of music for $545 and eleven months of statements. Saving $100/month for 5 months buys the same night for $500.',
    bad:'"Affordable monthly" is how $500 wants become $545 obligations. The payment fits; the trade does not.',
    why:'Borrow-vs-wait for a want: compare total cost, not monthly comfort. Interest turns wants into overpriced wants.'
  };
}},
{id:'credit-decide-08',verb:'decide',part:5,tier:'independent',skill:'credit',
gen:(v)=>{
  const person=v.person();
  return {
    q:`${person} owes $900 at 21% APR and sets a plan: $150/month until clear. Rough check: 6 payments = $900, plus about $50 interest. Does the plan work?`,
    choices:v.shuffle([
      {label:'Yes — about 7 payments of $150 clears it (~$950 total); the plan kills the debt in half a year.',ok:true},
      {label:'No — $150/month can never dent a $900 balance.',ok:false,mis:'interest-eats-all'},
      {label:'No — minimums only; $150/month will trigger penalties.',ok:false},
      {label:'Yes — and they could drop to $25 minimums once it feels easier.',ok:false,mis:'min-payment-trap'}
    ]),
    hint:'$900 ÷ $150 = 6, plus a little interest. Count the months.',
    good:'Fixed $150 payments beat the debt in ~7 months for ~$50 interest. Same debt on minimums would take 4+ years and ~$700 interest.',
    bad:'Dropping to minimums "when it feels easier" is how 7-month plans become 4-year plans.',
    why:'A fixed payoff plan converts an open-ended trap into a countdown. The amount above the minimum is what actually kills the debt.'
  };
}},

/* ================= credit · spot (6) ================= */
{id:'credit-spot-01',verb:'spot',part:4,tier:'independent',skill:'credit',
gen:(v)=>{
  const person=v.person();
  return {
    scenario:`<p>${person} reads "24% APR" on the statement and says: "So they take 24% of my balance every month."</p>`,
    q:'What is the mistake here?',
    choices:v.shuffle([
      {label:'APR is annual — the monthly rate is 24% ÷ 12 = 2%, not 24%.',ok:true},
      {label:'The rate is actually 24% per week.',ok:false},
      {label:'APR only applies on leap years.',ok:false},
      {label:'They are right — 24% monthly is standard.',ok:false,mis:'apr-as-monthly'}
    ]),
    hint:'Annual Percentage Rate. Annual.',
    good:'2% monthly is still brutal ($12 on $600), but 24% monthly would be $144 — a 288% yearly rate. The A in APR does real work.',
    bad:'Misreading APR as monthly either terrifies unnecessarily or — worse — makes the real 2% feel "small."',
    why:'APR ÷ 12 = monthly rate. Confusing the two mangles every interest calculation that follows.'
  };
}},
{id:'credit-spot-02',verb:'spot',part:4,tier:'independent',skill:'credit',
gen:(v)=>{
  const person=v.person();
  return {
    scenario:`<p>${person} pays the $25 minimum on a $500 balance (24% APR) and says: "I\u2019m making great progress — $25 a month adds up fast."</p>`,
    q:'What is the mistake here?',
    choices:v.shuffle([
      {label:'Only ~$15 of the $25 reduces the balance — $10 is interest; at this pace the $500 takes about 2 years.',ok:true},
      {label:'The mistake is paying monthly instead of weekly.',ok:false},
      {label:'$25 minimums clear a $500 balance in 20 months — that IS fast.',ok:false,mis:'min-payment-trap'},
      {label:'Minimums are calculated to clear the debt in 6 months.',ok:false,mis:'min-payment-trap'}
    ]),
    hint:'Interest eats first.',
    good:'$25 − $10 interest = $15 of progress. Two years and ~$120 in interest for a $500 balance — that is the minimum\u2019s business model.',
    bad:'"Adds up fast" describes the interest, not the progress.',
    why:'Minimum payments are sized to maximize the lender\u2019s interest, not your progress. The minimum is a ceiling on their risk, not a plan for your debt.'
  };
}},
{id:'credit-spot-03',verb:'spot',part:4,tier:'independent',skill:'credit',
gen:(v)=>{
  const person=v.person();
  return {
    scenario:`<p>${person}'s card limit rises from $2,000 to $3,000. ${person} tells friends: "I basically got a $1,000 raise."</p>`,
    q:'What is the mistake here?',
    choices:v.shuffle([
      {label:'A limit increase is more pre-approved debt, not income — the "raise" must be repaid with interest.',ok:true},
      {label:'The mistake is telling friends; limit increases should be secret.',ok:false},
      {label:'They are right — banks only raise limits for people who earned it.',ok:false,mis:'credit-as-income'},
      {label:'The raise is real but only $500 after fees.',ok:false,mis:'fee-face-value'}
    ]),
    hint:'Raises do not accrue 24% interest.',
    good:'$1,000 more limit = $1,000 more rope. Celebrating it as income is how limits become balances.',
    bad:'Banks raise limits hoping usage rises — it is a revenue move, not a reward.',
    why:'Credit-as-income strikes again: every limit increase feels like wealth and behaves like debt.'
  };
}},
{id:'credit-spot-04',verb:'spot',part:5,tier:'independent',skill:'credit',
gen:(v)=>{
  const person=v.person();
  return {
    scenario:`<p>${person} deliberately carries a $200 balance month to month, explaining: "Carrying a balance builds my credit score."</p>`,
    q:'What is the mistake here?',
    choices:v.shuffle([
      {label:'Payment history builds credit — "paid in full, on time" builds the same history with $0 interest.',ok:true},
      {label:'The mistake is the amount; $500 would build credit faster.',ok:false,mis:'credit-shield'},
      {label:'They are right — lenders reward customers who pay interest.',ok:false,mis:'credit-shield'},
      {label:'Carrying a balance only helps if it is over $1,000.',ok:false,mis:'credit-shield'}
    ]),
    hint:'What does the score actually record: payments or interest?',
    good:'The record shows "paid on time" either way. The $200 carry adds ~$4/month in interest for literally nothing.',
    bad:'Lenders do not bonus you for donating interest. The myth survives because it sounds like insider knowledge.',
    why:'Scores track payment behavior, not interest paid. Carrying a balance is paying for a benefit that does not exist.'
  };
}},
{id:'credit-spot-05',verb:'spot',part:5,tier:'independent',skill:'credit',
gen:(v)=>{
  const person=v.person();
  return {
    scenario:`<p>${person} buys $600 of wants on the card, saying: "I\u2019ll pay it later — later is basically free since there\u2019s no bill today."</p>`,
    q:'What is the mistake here?',
    choices:v.shuffle([
      {label:'"Later" arrives with the full $600 plus interest — delaying payment is not a discount.',ok:true},
      {label:'The mistake is the amount; under $500 later really is free.',ok:false,mis:'later-is-free'},
      {label:'They are right — no bill today means no cost.',ok:false,mis:'later-is-free'},
      {label:'The mistake is buying wants at all, ever.',ok:false}
    ]),
    hint:'Later has a due date. Due dates have prices.',
    good:'$600 today or $600 + interest later. "Later" is a payment plan, not a sale price.',
    bad:'No bill today just means the bill is traveling. It arrives on schedule, with interest as a tip.',
    why:'Later-is-free confuses timing with pricing. Credit moves the cost through time; it never reduces it.'
  };
}},
{id:'credit-spot-06',verb:'spot',part:5,tier:'independent',skill:'credit',
gen:(v)=>{
  const person=v.person();
  return {
    scenario:`<p>${person} pays the $30 minimum on a $1,000 balance (24% APR) every month and never looks at the interest line. After a year: $360 paid, balance ~$940.</p>`,
    q:'What is the mistake here?',
    choices:v.shuffle([
      {label:'They never noticed interest eating most of each payment — $360 paid, only ~$60 of debt gone.',ok:true},
      {label:'The mistake is paying monthly; annual payments work better.',ok:false},
      {label:'They should have paid less — minimums are a scam to avoid.',ok:false},
      {label:'$360 for $60 of progress is a normal, fair exchange.',ok:false,mis:'fee-face-value'}
    ]),
    hint:'$360 out, $60 of debt gone. Where did $300 go?',
    good:'$300 went to interest — 83% of every payment. The interest line is the most important line on the statement, and it was never read.',
    bad:'Ignoring the interest line does not pause interest. It just lets it work undisturbed.',
    why:'When minimums barely exceed monthly interest, payments mostly feed the lender. Reading the interest line is how you see the trap.'
  };
}},

/* ================= credit · compare (6) ================= */
{id:'credit-compare-01',verb:'compare',part:4,tier:'independent',skill:'credit',
gen:(v)=>{
  const person=v.person();
  return {
    context:`<p>${person} owes $400 at 24% APR.</p><p><b>Option A:</b> Pay in full today.</p><p><b>Option B:</b> Carry it, paying minimums.</p>`,
    q:'Which costs less?',
    choices:v.shuffle([
      {label:'Option A — $400 total. Option B adds ~$8/month in interest for the same $400.',ok:true},
      {label:'Option B — minimums are small, so carrying is cheaper.',ok:false,mis:'min-payment-trap'},
      {label:'They cost the same — $400 is $400.',ok:false,mis:'fee-face-value'},
      {label:'Option B — spreading payments always saves money.',ok:false,mis:'later-is-free'}
    ]),
    hint:'Price the carrying, not just the balance.',
    good:'$400 now vs $400 plus $8/month until it dies. Carrying a payable balance is a subscription to your own debt.',
    bad:'Small minimums are not small costs — they are slow costs, which is worse.',
    why:'Pay-in-full vs carry: the difference is pure interest. If the money exists, carrying is paying extra for nothing.'
  };
}},
{id:'credit-compare-02',verb:'compare',part:4,tier:'independent',skill:'credit',
gen:(v)=>{
  const person=v.person();
  return {
    context:`<p>${person} carries $600 on two different cards.</p><p><b>Card X:</b> 12% APR.</p><p><b>Card Y:</b> 24% APR.</p>`,
    q:'Which card charges more interest per month on the $600?',
    choices:v.shuffle([
      {label:'Card Y — $12/month vs $6/month on Card X.',ok:true},
      {label:'Card X — lower APRs hide higher fees.',ok:false,mis:'guess-is-good-enough'},
      {label:'They charge the same — $600 is $600.',ok:false,mis:'fee-face-value'},
      {label:'Neither — interest is charged yearly, not monthly.',ok:false,mis:'apr-as-monthly'}
    ]),
    hint:'$600 × APR ÷ 12, twice.',
    good:'$600 × 12% ÷ 12 = $6; $600 × 24% ÷ 12 = $12. Double the APR = double the monthly rent on the same debt.',
    bad:'Same balance, different price tags. The APR is the price tag — read it before you carry.',
    why:'Monthly interest scales directly with APR. Comparing APRs is comparing monthly costs.'
  };
}},
{id:'credit-compare-03',verb:'compare',part:4,tier:'independent',skill:'credit',
gen:(v)=>{
  const person=v.person();
  return {
    context:`<p>${person} owes $800 at 24% APR.</p><p><b>Option A:</b> Pay the $25 minimum each month.</p><p><b>Option B:</b> Pay a fixed $100 each month.</p>`,
    q:'Which clears the debt faster — and by roughly how much?',
    choices:v.shuffle([
      {label:'Option B — about 10 months vs about 4 years on minimums.',ok:true},
      {label:'Option A — minimums are designed to clear debt efficiently.',ok:false,mis:'min-payment-trap'},
      {label:'They finish together — $800 is $800.',ok:false},
      {label:'Option B is faster but costs more in total.',ok:false,mis:'fee-face-value'}
    ]),
    hint:'$25 minimum ≈ $16 interest + $9 progress. $100 ≈ $16 interest + $84 progress.',
    good:'$100/month kills it in ~10 months for ~$90 interest. Minimums take ~4 years and ~$400 interest. Same debt, 4× the cost.',
    bad:'"Designed to clear debt efficiently" — efficiently for whom? Minimums are designed around the lender\u2019s profit.',
    why:'Fixed payments above the minimum attack principal; minimums mostly feed interest. The gap is years and hundreds of dollars.'
  };
}},
{id:'credit-compare-04',verb:'compare',part:5,tier:'independent',skill:'credit',
gen:(v)=>{
  const person=v.person();
  return {
    context:`<p>${person} wants a $600 TV.</p><p><b>Option A:</b> Save $150/month for 4 months, then buy.</p><p><b>Option B:</b> Buy today at 24% APR, paying $50/month (~14 months, ~$90 interest).</p>`,
    q:'Which path costs less total?',
    choices:v.shuffle([
      {label:'Option A — $600 total vs about $690 on the card.',ok:true},
      {label:'Option B — $50/month feels cheaper than $150/month.',ok:false,mis:'min-payment-trap'},
      {label:'They cost the same — $600 TV, $600 paid.',ok:false,mis:'fee-face-value'},
      {label:'Option B — waiting 4 months has a hidden cost too.',ok:false,mis:'delay-is-savings'}
    ]),
    hint:'Total cost, not monthly comfort.',
    good:'$600 vs ~$690: the card charges $90 for impatience. Four months of waiting is a 15% discount.',
    bad:'"$50/month feels cheaper" is the trap\u2019s native language. Feelings are not totals.',
    why:'Borrow-vs-wait math: compare total outlay. Monthly smallness hides total bigness — always multiply it out.'
  };
}},
{id:'credit-compare-05',verb:'compare',part:5,tier:'independent',skill:'credit',
gen:(v)=>{
  const person=v.person();
  return {
    context:`<p>${person} carries two balances.</p><p><b>Card P:</b> $400 at 29.99% APR.</p><p><b>Card Q:</b> $900 at 19.99% APR.</p>`,
    q:'Which balance costs more in interest per month?',
    choices:v.shuffle([
      {label:'Card Q — about $15/month vs about $10/month on Card P.',ok:true},
      {label:'Card P — 29.99% is the higher rate, so it must cost more.',ok:false,mis:'apr-as-monthly'},
      {label:'They cost the same — interest is interest.',ok:false},
      {label:'Card P — smaller balances always cost more.',ok:false,mis:'guess-is-good-enough'}
    ]),
    hint:'Rate × balance. Both matter.',
    good:'$400 × 29.99% ÷ 12 ≈ $10; $900 × 19.99% ÷ 12 ≈ $15. The lower rate on the bigger balance wins the cost contest.',
    bad:'Rate-only thinking misses half the formula. A small fire at high heat vs a big fire at medium heat — measure both.',
    why:'Monthly interest = balance × APR ÷ 12. Both factors count; the "scariest rate" is not always the most expensive debt.'
  };
}},
{id:'credit-compare-06',verb:'compare',part:5,tier:'independent',skill:'credit',
gen:(v)=>{
  const person=v.person();
  return {
    context:`<p>${person} owes $1,000 at 18% APR.</p><p><b>Option A:</b> Pay $200/month (~6 months, ~$48 interest).</p><p><b>Option B:</b> Pay $100/month (~11 months, ~$92 interest).</p>`,
    q:'What does doubling the payment save?',
    choices:v.shuffle([
      {label:'About $44 in interest and 5 months of debt.',ok:true},
      {label:'Nothing — $1,000 paid is $1,000 paid.',ok:false,mis:'fee-face-value'},
      {label:'About $500 — doubling the payment halves the total.',ok:false,mis:'guess-is-good-enough'},
      {label:'It costs more — bigger payments trigger bigger interest.',ok:false}
    ]),
    hint:'Interest accrues monthly. Fewer months = less interest.',
    good:'$200/month: ~$48 interest, done in 6. $100/month: ~$92 interest, done in 11. Doubling the payment nearly halves the interest.',
    bad:'Interest is rent on remaining debt — the faster the balance falls, the less rent you pay.',
    why:'Every extra dollar above the minimum shortens the debt\u2019s life, and interest only accrues while the debt is alive.'
  };
}},

/* ================= credit · predict (6) ================= */
{id:'credit-predict-01',verb:'predict',part:5,tier:'independent',skill:'credit',
gen:(v)=>{
  const person=v.person();
  return {
    q:`${person} carries $1,000 at 24% APR and pays only the $25 minimum each month. After one year of this, where do they stand?`,
    choices:v.shuffle([
      {label:'About $940 still owed — $300 paid, but ~$240 of it was interest.',ok:true},
      {label:'Debt-free — $25 × 12 = $300... wait, that is only $300 of $1,000.',ok:false},
      {label:'About $700 owed — minimums make steady progress.',ok:false,mis:'min-payment-trap'},
      {label:'The balance grows — minimums do not even cover interest.',ok:false,mis:'interest-eats-all'}
    ]),
    hint:'$20/month interest vs $25 payment. Net progress: $5/month.',
    good:'$300 paid, $240 to interest, $60 of debt gone. A year of "responsible minimums" erased 6% of the balance.',
    bad:'"Steady progress" at $5/month is a 16-year plan wearing a responsible face.',
    why:'When the minimum barely exceeds monthly interest, a year of payments mostly pays the lender, not the debt.'
  };
}},
{id:'credit-predict-02',verb:'predict',part:5,tier:'independent',skill:'credit',
gen:(v)=>{
  const person=v.person();
  return {
    q:`${person} maxes out a $2,000 limit — $2,000 balance on a $2,000 limit — and keeps it there for months. What happens on the credit-score side?`,
    choices:v.shuffle([
      {label:'High utilization (100%) can drag scores down — maxed-out looks risky to scoring models.',ok:true},
      {label:'Scores rise — using the full limit shows the lender trusts them.',ok:false,mis:'credit-shield'},
      {label:'Nothing — scores only track whether payments are on time.',ok:false},
      {label:'Scores rise — big balances mean big responsibility.',ok:false,mis:'credit-as-income'}
    ]),
    hint:'How close the balance is to the limit is a scoring factor.',
    good:'100% utilization signals distress to models. Same $2,000 at 10% utilization tells a completely different story.',
    bad:'"The lender trusts me" confuses a credit limit with a compliment. Models read maxed-out as maxed-out.',
    why:'Utilization — balance vs limit — is a major scoring factor. High utilization, held for months, weighs scores down.'
  };
}},
{id:'credit-predict-03',verb:'predict',part:5,tier:'independent',skill:'credit',
gen:(v)=>{
  const person=v.person();
  return {
    q:`${person} owes $600 at 24% APR (about $12/month interest) and pays $25/month. Roughly how long until it is gone — and what is the total interest?`,
    choices:v.shuffle([
      {label:'About 32 months, with roughly $190 in total interest — on a $600 balance.',ok:true},
      {label:'24 months — $600 ÷ $25, simple division.',ok:false,mis:'min-payment-trap'},
      {label:'About 12 months — minimums accelerate near the end.',ok:false,mis:'guess-is-good-enough'},
      {label:'Never — $25 does not cover the $12 interest.',ok:false,mis:'interest-eats-all'}
    ]),
    hint:'$25 − $12 = $13 of real progress per month. $600 ÷ $13 ≈ 46... but shrinking interest speeds it up: ~32 months.',
    good:'Nearly 3 years and $190 interest on $600 — the debt costs almost a third of itself again.',
    bad:'"$600 ÷ $25" pretends interest does not exist. Interest is the reason it takes 32 months instead of 24.',
    why:'Minimum-payment timelines stretch because early payments are mostly interest. The true cost is measured in years, not payments.'
  };
}},
{id:'credit-predict-04',verb:'predict',part:5,tier:'independent',skill:'credit',
gen:(v)=>{
  const person=v.person();
  return {
    q:`Every month ${person} charges $300 of wants on the card and pays only the minimum. What does this pattern build over a year?`,
    choices:v.shuffle([
      {label:'A growing balance — $3,600 of new charges against minimum-sized payments means the debt climbs all year.',ok:true},
      {label:'A great score — heavy card use proves creditworthiness.',ok:false,mis:'credit-shield'},
      {label:'Nothing — minimums keep any balance flat forever.',ok:false,mis:'min-payment-trap'},
      {label:'Wealth — the rewards points outweigh the interest.',ok:false,mis:'borrow-to-spend'}
    ]),
    hint:'$300 in, ~$25 out. Every month.',
    good:'$3,600 charged, maybe $300 paid toward principal — the balance roughly triples while the minimums smile and wave.',
    bad:'Rewards on $3,600 might be $36–$72. Interest on the growing balance is hundreds. The math is not close.',
    why:'Charging more than you pay is debt growth by definition. Minimums cannot outrun new borrowing — the pattern is the problem.'
  };
}},
{id:'credit-predict-05',verb:'predict',part:5,tier:'independent',skill:'credit',
gen:(v)=>{
  const person=v.person();
  return {
    q:`${person} takes a $200 cash advance at 28% APR with a 5% cash-advance fee. What is the immediate damage?`,
    choices:v.shuffle([
      {label:'A $10 fee instantly, plus ~$4.67/month interest starting day one — no grace period.',ok:true},
      {label:'Just the $200 — cash advances work like regular purchases.',ok:false,mis:'fee-face-value'},
      {label:'A $10 fee, but no interest for the first month.',ok:false,mis:'later-is-free'},
      {label:'Nothing extra — cash is cash.',ok:false,mis:'borrow-to-spend'}
    ]),
    hint:'Fee up front, higher rate, interest from day one.',
    good:'$200 borrowed becomes $210 owed instantly, then ~$4.67/month. Cash advances are the most expensive way to use a card.',
    bad:'"Just like a purchase" misses the fee, the higher APR, and the missing grace period — three strikes.',
    why:'Cash advances stack every cost at once: upfront fee, higher APR, immediate interest. It is borrowing with the difficulty turned up.'
  };
}},
{id:'credit-predict-06',verb:'predict',part:5,tier:'independent',skill:'credit',
gen:(v)=>{
  const person=v.person();
  return {
    q:`${person} took a "0% for 12 months" offer with $1,500 still unpaid at month 12. The rate jumps to 29.99%. What happens in month 13?`,
    choices:v.shuffle([
      {label:'About $37 in interest hits in a single month — the 0% era ends abruptly.',ok:true},
      {label:'Nothing — the 0% extends automatically if the balance is shrinking.',ok:false,mis:'later-is-free'},
      {label:'About $3.75 — the rate phases in gradually.',ok:false,mis:'guess-is-good-enough'},
      {label:'The balance is forgiven as a loyalty reward.',ok:false}
    ]),
    hint:'$1,500 × 29.99% ÷ 12.',
    good:'$1,500 × 29.99% ÷ 12 ≈ $37.50 — in one month. The promo was a countdown, not a pardon.',
    bad:'Promos do not extend out of kindness. Month 13 bills at the real rate on whatever remains.',
    why:'Intro-rate expiry is a cliff: the same balance gets dramatically more expensive overnight. Plan the payoff against the deadline.'
  };
}},

/* ================= credit · build (5) ================= */
{id:'credit-build-01',verb:'build',part:4,tier:'independent',skill:'credit',
gen:(v)=>{
  const person=v.person();
  const total=900;
  return {
    h:'Build it: monthly plan while carrying debt',
    body:`<p>${person} brings home ${v.money(total)}/month and owes $600 on a card. Build the payoff month.</p>`,
    totalDollars:total,
    buckets:[{id:'needs',label:'Needs'},{id:'debt-payoff',label:'Debt payoff'},{id:'savings',label:'Savings'},{id:'wants',label:'Wants'}],
    targets:{needs:550,'debt-payoff':200,savings:100,wants:50},
    hint:'The debt payment must beat the monthly interest — or the balance grows.',
    good:'$200/month kills the $600 in ~3 months for ~$25 interest. Minimums would take 2+ years.',
    bad:'A $25 debt line while carrying $600 is paying the lender to keep you in debt.',
    why:'While carrying a balance, the payoff bucket is the highest-return "investment" available: a guaranteed 24% return.'
  };
}},
{id:'credit-build-02',verb:'build',part:4,tier:'independent',skill:'credit',
gen:(v)=>{
  const person=v.person();
  const total=750;
  return {
    h:'Build it: tight month, real debt',
    body:`<p>${person}'s take-home is ${v.money(total)} and the card holds $450 at 24%. Split it.</p>`,
    totalDollars:total,
    buckets:[{id:'needs',label:'Needs'},{id:'debt-payoff',label:'Debt payoff'},{id:'savings',label:'Savings'},{id:'wants',label:'Wants'}],
    targets:{needs:450,'debt-payoff':150,savings:80,wants:70},
    hint:'$450 at 24% costs $9/month. The payoff line must clear that easily.',
    good:'$150/month clears it in ~3 months. The wants survive — shrunk, not sacrificed.',
    bad:'Protecting wants at full size while the debt accrues is choosing interest over fun money.',
    why:'Debt payoff is a Need until the balance is zero — interest does not pause for tight months.'
  };
}},
{id:'credit-build-03',verb:'build',part:5,tier:'independent',skill:'credit',
gen:(v)=>{
  const person=v.person();
  const total=1100;
  return {
    h:'Build it: two cards, one plan (avalanche)',
    body:`<p>${person} owes $700 at 24% (Card A) and $500 at 18% (Card B). Take-home: ${v.money(total)}. Aim extra at the highest rate.</p>`,
    totalDollars:total,
    buckets:[{id:'needs',label:'Needs'},{id:'card-a-24pct',label:'Card A (24%)'},{id:'card-b-18pct',label:'Card B (18%)'},{id:'savings',label:'Savings'}],
    targets:{needs:650,'card-a-24pct':250,'card-b-18pct':100,savings:100},
    hint:'Minimums on both, then every extra dollar attacks the highest APR.',
    good:'$250 vs $100: the 24% card dies first, minimizing total interest. That is the avalanche — highest rate first.',
    bad:'Splitting evenly feels fair; math prefers the 24% card. Fairness to cards is not a financial strategy.',
    why:'Avalanche payoff: pay minimums everywhere, throw extra at the highest APR. Highest rate = most expensive debt = first target.'
  };
}},
{id:'credit-build-04',verb:'build',part:5,tier:'independent',skill:'credit',
gen:(v)=>{
  const person=v.person();
  const total=850;
  return {
    h:'Build it: payoff month on $850',
    body:`<p>${person} takes home ${v.money(total)} and owes $800 at 21%. Build the kill-the-debt month.</p>`,
    totalDollars:total,
    buckets:[{id:'needs',label:'Needs'},{id:'debt-payoff',label:'Debt payoff'},{id:'savings',label:'Savings'},{id:'wants',label:'Wants'}],
    targets:{needs:520,'debt-payoff':180,savings:80,wants:70},
    hint:'$800 at 21% ≈ $14/month interest. The payoff line must dwarf it.',
    good:'$180/month clears it in ~5 months for ~$40 interest. The debt dies before half a year passes.',
    bad:'$70 of wants is fine — $0 of payoff is not. Interest never takes a month off.',
    why:'A fixed, oversized payoff line turns "someday" into a date. The debt\u2019s lifespan is set by the payment size.'
  };
}},
{id:'credit-build-05',verb:'build',part:5,tier:'independent',skill:'credit',
gen:(v)=>{
  const person=v.person();
  const total=1200;
  return {
    h:'Build it: big push on $1,000 of debt',
    body:`<p>${person} takes home ${v.money(total)} and owes $1,000 at 24%. How aggressive can the payoff be?</p>`,
    totalDollars:total,
    buckets:[{id:'needs',label:'Needs'},{id:'debt-payoff',label:'Debt payoff'},{id:'savings',label:'Savings'},{id:'wants',label:'Wants'}],
    targets:{needs:700,'debt-payoff':300,savings:120,wants:80},
    hint:'$300/month vs $20/month interest — the debt has no chance.',
    good:'$300/month kills $1,000 in under 4 months for ~$40 interest. Aggression is the whole strategy.',
    bad:'Minimums on $1,000 would cost ~$700+ in interest over 4+ years. Same debt, 17× the interest.',
    why:'Payoff speed is the interest rate\u2019s enemy. Every extra $100/month is months of debt-life — and interest — erased.'
  };
}},

/* ================= credit · explain (5) ================= */
{id:'credit-explain-01',verb:'explain',part:5,tier:'independent',skill:'credit',
gen:(v)=>({
  h:'Teach it back: credit is borrowing',
  prompt:'Explain in your own words why a credit card is borrowed money — not extra income — and what that means for using one.',
  keyPoints:['A credit limit is pre-approved debt, not income','Every dollar spent must be repaid, usually with interest','Using the card moves the payment through time; it never reduces it','Treating it as income turns limits into balances'],
  modelAnswer:'A credit card lets you spend money you do not have yet — that is borrowing, not earning. Every dollar comes back as a bill, plus interest if it is not repaid quickly. Treating the limit like income is the fastest way to convert available credit into expensive debt.',
  hint:'Income stays. Borrowed money returns — with a fee.'
})},
{id:'credit-explain-02',verb:'explain',part:5,tier:'independent',skill:'credit',
gen:(v)=>({
  h:'Teach it back: APR to monthly cost',
  prompt:'Explain in your own words how to turn an APR into the actual monthly cost of carrying a balance.',
  keyPoints:['APR is the ANNUAL price of borrowing','Monthly rate = APR ÷ 12','Monthly interest = balance × APR ÷ 12','A 24% APR means 2% per month — $20 on every $1,000 carried'],
  modelAnswer:'APR is the yearly price of carrying debt. Divide it by 12 to get the monthly rate, then multiply by the balance: balance × APR ÷ 12. So 24% APR on $1,000 costs about $20 every month — $240 a year for the same debt.',
  hint:'Annual ÷ 12 × balance.'
})},
{id:'credit-explain-03',verb:'explain',part:5,tier:'independent',skill:'credit',
gen:(v)=>({
  h:'Teach it back: the minimum-payment trap',
  prompt:'Explain in your own words why paying only the minimum keeps debt alive so long.',
  keyPoints:['Interest is taken out of each payment first','Only the remainder reduces the balance','Minimums are sized small, so the remainder is tiny','The result: years of payments, mostly interest, little progress'],
  modelAnswer:'Each payment covers that month\u2019s interest first, and only the leftover shrinks the balance. Minimum payments are set just above the interest, so the leftover is tiny — which is why a $500 balance on minimums takes years and costs hundreds in interest. Paying more than the minimum is what actually kills debt.',
  hint:'Interest eats first.'
})},
{id:'credit-explain-04',verb:'explain',part:5,tier:'independent',skill:'credit',
gen:(v)=>({
  h:'Teach it back: borrow vs wait',
  prompt:'Explain in your own words how to decide whether to buy something on credit now or wait and save for it.',
  keyPoints:['Compare TOTAL cost, not monthly payments','Borrowing adds interest; waiting adds $0','For wants, waiting is almost always cheaper','Borrowing fits true needs — with a fixed payoff plan, not minimums'],
  modelAnswer:'To decide, compare the total cost of each path: borrowing adds interest to the price, while saving first costs exactly the price. For wants, waiting wins. For true needs, borrowing can work — but only with a fixed payoff plan that clears the debt fast, never with minimums.',
  hint:'Total cost vs total cost.'
})},
{id:'credit-explain-05',verb:'explain',part:5,tier:'independent',skill:'credit',
gen:(v)=>({
  h:'Teach it back: utilization and scores',
  prompt:'Explain in your own words what credit utilization is and why maxing out a card can hurt a credit score.',
  keyPoints:['Utilization = balance compared to the credit limit','It is a major factor in credit scoring models','High utilization (near the limit) looks risky to models','Lower utilization with on-time payments looks safer'],
  modelAnswer:'Utilization is how much of your credit limit you are using — a $1,800 balance on a $2,000 limit is 90% utilization. Scoring models read high utilization as risk, which can pull scores down. Keeping balances low relative to limits, with on-time payments, tells a safer story.',
  hint:'Balance vs limit, as a percentage.'
})}
],
'credit-cards': [

/* ================= credit-cards · choice (8) ================= */
{id:'credit-cards-choice-01',verb:'choice',part:4,tier:'independent',skill:'credit-cards',
gen:(v)=>{
  const person=v.person();
  return {
    q:`${person}'s card advertises 24% APR. What is the monthly interest rate?`,
    choices:v.shuffle([
      {label:'2% per month — 24% ÷ 12.',ok:true},
      {label:'24% per month — APR is already monthly.',ok:false,mis:'apr-as-monthly'},
      {label:'0.24% per month — move the decimal two places.',ok:false,mis:'guess-is-good-enough'},
      {label:'12% per month — APR is split in half.',ok:false}
    ]),
    hint:'Annual ÷ 12.',
    good:'24 ÷ 12 = 2. Every month the card charges 2% on whatever balance remains.',
    bad:'APR is annual by definition. Reading it as monthly inflates the rate 12× — and hides how the real 2% compounds.',
    why:'APR ÷ 12 = monthly rate. This one division unlocks every card calculation that follows.'
  };
}},
{id:'credit-cards-choice-02',verb:'choice',part:4,tier:'independent',skill:'credit-cards',
gen:(v)=>{
  const person=v.person();
  return {
    q:`${person}'s card charges 18% APR. What is the monthly rate?`,
    choices:v.shuffle([
      {label:'1.5% per month — 18% ÷ 12.',ok:true},
      {label:'18% per month.',ok:false,mis:'apr-as-monthly'},
      {label:'0.18% per month.',ok:false,mis:'guess-is-good-enough'},
      {label:'6% per month — a quarter of the APR.',ok:false}
    ]),
    hint:'Same division, every card.',
    good:'18 ÷ 12 = 1.5. On a $1,000 balance that is $15/month — $180/year.',
    bad:'1.5% "sounds small" until it is $15 every single month on a four-figure balance.',
    why:'The monthly rate makes APR concrete: multiply it by any balance to price one month of carrying.'
  };
}},
{id:'credit-cards-choice-03',verb:'choice',part:4,tier:'independent',skill:'credit-cards',
gen:(v)=>{
  const person=v.person();
  const bal=1000, apr=24, interest=Math.round(bal*apr/12*100)/100;
  return {
    q:`${person} carries ${v.money(bal)} at ${apr}% APR. How much interest posts this month?`,
    choices:v.shuffle([
      {label:`${v.money(interest)} — ${v.money(bal)} × 2%.`,ok:true},
      {label:`${v.money(240)} — 24% of the balance, monthly.`,ok:false,mis:'apr-as-monthly'},
      {label:`${v.money(10)} — 1% is close enough to the monthly rate.`,ok:false,mis:'guess-is-good-enough'},
      {label:'$0 — interest only posts quarterly.',ok:false}
    ]),
    hint:'Balance × monthly rate.',
    good:`$1,000 × 2% = $20/month — $240/year. The balance charges $20 rent for existing.`,
    bad:'$240 would be a 288% APR. The real $20/month is already expensive enough to respect.',
    why:'Monthly interest = balance × (APR ÷ 12). Two steps, one number that prices the carry.'
  };
}},
{id:'credit-cards-choice-04',verb:'choice',part:4,tier:'independent',skill:'credit-cards',
gen:(v)=>{
  const person=v.person();
  const bal=500, monthlyRate=2, interest=Math.round(bal*monthlyRate/100), min=25, principal=min-interest;
  return {
    q:`${person} owes ${v.money(bal)} at a 2% monthly rate. The minimum payment is ${v.money(min)}. How much actually reduces the balance?`,
    choices:v.shuffle([
      {label:`${v.money(principal)} — ${v.money(interest)} goes to interest first.`,ok:true},
      {label:`${v.money(min)} — every dollar of the minimum attacks the balance.`,ok:false,mis:'min-payment-trap'},
      {label:'$0 — minimums never reduce balances.',ok:false,mis:'interest-eats-all'},
      {label:`${v.money(interest)} — only the interest portion counts as progress.`,ok:false}
    ]),
    hint:'Interest eats first; the balance gets leftovers.',
    good:`$25 − $10 = $15 of progress. At $15/month, $500 takes about 3 years and ~$180 in interest.`,
    bad:'"Every dollar attacks the balance" is the minimum\u2019s marketing. The statement\u2019s interest line tells the truth.',
    why:'Minimum − monthly interest = real progress. When the minimum barely beats the interest, the debt barely moves.'
  };
}},
{id:'credit-cards-choice-05',verb:'choice',part:4,tier:'independent',skill:'credit-cards',
gen:(v)=>{
  const person=v.person();
  const min=60, fee=30;
  return {
    q:`${person}'s ${v.money(min)} minimum is due Friday, with a ${v.money(fee)} late fee after that. ${person} has $80 in checking. What does paying three days late actually cost?`,
    choices:v.shuffle([
      {label:`${v.money(fee)} extra — plus a possible penalty APR hike on the whole balance.`,ok:true},
      {label:'Nothing — three days is within the grace everyone gets.',ok:false,mis:'fee-face-value'},
      {label:`${v.money(min+fee)} — the late fee replaces the minimum.`,ok:false},
      {label:'Just a warning email; fees start after 30 days.',ok:false,mis:'guess-is-good-enough'}
    ]),
    hint:'The fee is printed on the statement. The penalty APR is in the fine print.',
    good:'$30 for three days — and a penalty APR (often ~30%) can then inflate every future month\u2019s interest.',
    bad:'"Everyone gets a few days" is not a card term anyone signed. The due date is the due date.',
    why:'Late fees are the visible cost; penalty APR is the hidden one. One late payment can reprice the entire balance.'
  };
}},
{id:'credit-cards-choice-06',verb:'choice',part:4,tier:'independent',skill:'credit-cards',
gen:(v)=>{
  const person=v.person();
  const bal=1200, apr=18, interest=Math.round(bal*apr/12*100)/100;
  return {
    q:`${person} carries ${v.money(bal)} at ${apr}% APR. Monthly interest?`,
    choices:v.shuffle([
      {label:`${v.money(interest)} — ${v.money(bal)} × 1.5%.`,ok:true},
      {label:`${v.money(216)} — 18% monthly.`,ok:false,mis:'apr-as-monthly'},
      {label:`${v.money(12)} — about 1% is fine for estimates.`,ok:false,mis:'guess-is-good-enough'},
      {label:'$0 until the balance crosses $1,500.',ok:false}
    ]),
    hint:'APR ÷ 12, then × balance.',
    good:`$1,200 × 1.5% = $18/month — $216/year. Bigger balances make even "moderate" APRs expensive.`,
    bad:'Estimating 1% instead of 1.5% hides $6/month — $72/year of invisible cost.',
    why:'Same formula at bigger balances: the monthly rate is small, but the balance is the multiplier.'
  };
}},
{id:'credit-cards-choice-07',verb:'choice',part:4,tier:'independent',skill:'credit-cards',
gen:(v)=>{
  const person=v.person();
  const bal=2000, monthlyRate=1.5, interest=Math.round(bal*monthlyRate/100), min=40, principal=min-interest;
  return {
    q:`${person} owes ${v.money(bal)} at a 1.5% monthly rate and pays the ${v.money(min)} minimum. How much of it reduces the balance?`,
    choices:v.shuffle([
      {label:`${v.money(principal)} — ${v.money(interest)} is eaten by interest.`,ok:true},
      {label:`${v.money(min)} — minimums are designed to make real progress.`,ok:false,mis:'min-payment-trap'},
      {label:'$0 — on big balances minimums are purely interest.',ok:false,mis:'interest-eats-all'},
      {label:`${v.money(interest)} — the interest portion IS the progress.`,ok:false}
    ]),
    hint:'$40 − $30.',
    good:'$10 of progress on a $2,000 debt. At this pace the balance outlives the card — about 9 years and ~$2,300 in interest.',
    bad:'"Designed to make progress" — for whom? $30 of every $40 goes to the lender.',
    why:'On large balances, minimums are nearly all interest. The minimum is the slowest legal way out of debt.'
  };
}},
{id:'credit-cards-choice-08',verb:'choice',part:4,tier:'independent',skill:'credit-cards',
gen:(v)=>{
  const person=v.person();
  const amt=200, feePct=5, fee=Math.round(amt*feePct/100);
  return {
    q:`${person} takes a ${v.money(amt)} cash advance: ${feePct}% fee up front, higher APR, interest from day one. What is the immediate cost?`,
    choices:v.shuffle([
      {label:`${v.money(fee)} fee instantly — then daily interest at the higher cash-advance APR, no grace period.`,ok:true},
      {label:`${v.money(fee)} — the fee is the only extra cost; interest works like a normal purchase.`,ok:false,mis:'fee-face-value'},
      {label:'$0 — cash advances have no fees, just the APR.',ok:false},
      {label:`${v.money(fee)} — but it is refunded if repaid within a week.`,ok:false,mis:'guess-is-good-enough'}
    ]),
    hint:'Fee + higher rate + no grace period. All three.',
    good:'$200 becomes $210 owed instantly, then interest accrues daily at ~28%. Three penalties stacked on one transaction.',
    bad:'"Just like a purchase" misses all three differences — that is why cash advances are the card\u2019s most expensive feature.',
    why:'Cash advances combine every card cost at once. If there is any other way to get the cash, it is cheaper.'
  };
}},

/* ================= credit-cards · sort (6) ================= */
{id:'credit-cards-sort-01',verb:'sort',part:4,tier:'independent',skill:'credit-cards',
gen:(v)=>({
  h:'Sort it: interest, fee, or payment?',
  body:'<p>Sort each statement line into interest, fee, or payment.</p>',
  buckets:['Interest','Fee','Payment'],
  items:v.shuffle([
    {label:'Monthly interest $14.20',a:'interest',why:'Interest charge.'},
    {label:'Late fee $30',a:'fee',why:'Penalty fee.'},
    {label:'Extra $50 payment',a:'payment',why:'Money toward the debt.'},
    {label:'Annual fee $95',a:'fee',why:'Cost of the card.'},
    {label:'Minimum payment $25',a:'payment',why:'A payment, however small.'},
    {label:'Finance charge $8.10',a:'interest',why:'Interest, renamed.'}
  ])
})},
{id:'credit-cards-sort-02',verb:'sort',part:4,tier:'independent',skill:'credit-cards',
gen:(v)=>({
  h:'Sort it: transfer month',
  body:'<p>A balance transfer just happened. Sort every line.</p>',
  buckets:['Interest','Fee','Payment'],
  items:v.shuffle([
    {label:'Balance transfer fee 3%: $36',a:'fee',why:'Fee for the transfer.'},
    {label:'Interest on $800 balance: $16',a:'interest',why:'Interest charge.'},
    {label:'Over-limit fee $35',a:'fee',why:'Penalty fee.'},
    {label:'Autopay $120',a:'payment',why:'Payment.'},
    {label:'Returned payment fee $30',a:'fee',why:'Penalty fee.'},
    {label:'Paying double the minimum',a:'payment',why:'Payment above minimum.'}
  ])
})},
{id:'credit-cards-sort-03',verb:'sort',part:5,tier:'independent',skill:'credit-cards',
gen:(v)=>({
  h:'Sort it: cash-advance month',
  body:'<p>Someone took a cash advance. Sort the damage.</p>',
  buckets:['Interest','Fee','Payment'],
  items:v.shuffle([
    {label:'Cash-advance fee $10',a:'fee',why:'Upfront fee.'},
    {label:'Cash-advance interest $4.67',a:'interest',why:'Interest from day one.'},
    {label:'Statement paid in full',a:'payment',why:'Full payment.'},
    {label:'Foreign transaction fee 3%',a:'fee',why:'Fee.'},
    {label:'Interest after promo: $37.50',a:'interest',why:'Interest charge.'},
    {label:'$200 payoff payment',a:'payment',why:'Payment.'}
  ])
})},
{id:'credit-cards-sort-04',verb:'sort',part:5,tier:'independent',skill:'credit-cards',
gen:(v)=>({
  h:'Sort it: fee-heavy statement',
  body:'<p>Fees everywhere. Sort each line correctly.</p>',
  buckets:['Interest','Fee','Payment'],
  items:v.shuffle([
    {label:'Deferred interest $96',a:'interest',why:'Retroactive interest.'},
    {label:'Late fee $30',a:'fee',why:'Penalty fee.'},
    {label:'Minimum payment $25',a:'payment',why:'Payment.'},
    {label:'Expedited payment fee $15',a:'fee',why:'Fee for rush payment.'},
    {label:'Interest $22.40',a:'interest',why:'Interest charge.'},
    {label:'Extra principal payment $75',a:'payment',why:'Payment toward principal.'}
  ])
})},
{id:'credit-cards-sort-05',verb:'sort',part:5,tier:'independent',skill:'credit-cards',
gen:(v)=>({
  h:'Sort it: penalty-APR month',
  body:'<p>A late payment triggered penalty APR. Sort the fallout.</p>',
  buckets:['Interest','Fee','Payment'],
  items:v.shuffle([
    {label:'Penalty APR interest $41.65',a:'interest',why:'Interest at the penalty rate.'},
    {label:'Over-limit fee $35',a:'fee',why:'Penalty fee.'},
    {label:'Paying $300 lump sum',a:'payment',why:'Payment.'},
    {label:'Balance transfer fee $45',a:'fee',why:'Fee.'},
    {label:'Monthly interest $18',a:'interest',why:'Interest charge.'},
    {label:'Minimum $40',a:'payment',why:'Payment.'}
  ])
})},
{id:'credit-cards-sort-06',verb:'sort',part:5,tier:'independent',skill:'credit-cards',
gen:(v)=>({
  h:'Sort it: paid-in-full month',
  body:'<p>Paid in full — but the statement still has lines. Sort them.</p>',
  buckets:['Interest','Fee','Payment'],
  items:v.shuffle([
    {label:'Interest charged: $0 (paid in full)',a:'interest',why:'Zero interest — the reward for full payment.'},
    {label:'Late fee $30',a:'fee',why:'Penalty fee.'},
    {label:'Full statement payment $640',a:'payment',why:'Full payment.'},
    {label:'Card replacement fee $5',a:'fee',why:'Fee.'},
    {label:'Interest $11.20',a:'interest',why:'Interest charge.'},
    {label:'Minimum $25',a:'payment',why:'Payment.'}
  ])
})},

/* ================= credit-cards · decide (8) ================= */
{id:'credit-cards-decide-01',verb:'decide',part:5,tier:'independent',skill:'credit-cards',
gen:(v)=>{
  const person=v.person();
  return {
    q:`${person}'s $60 minimum is due Friday; a $30 late fee hits Saturday. Checking holds $80. What is the call?`,
    choices:v.shuffle([
      {label:'Pay the $60 today — on time beats $30 for nothing, and avoids penalty APR.',ok:true},
      {label:'Pay Monday — a weekend late is basically on time.',ok:false,mis:'fee-face-value'},
      {label:'Pay $30 now and the rest later — partial payments stop fees.',ok:false,mis:'guess-is-good-enough'},
      {label:'Skip it this month — one missed payment is no big deal.',ok:false}
    ]),
    hint:'The money exists. The fee is optional.',
    good:'$60 on time = $60 total. $60 late = $90 plus a possible rate hike. The $80 in checking makes this a free choice.',
    bad:'"Basically on time" is not a card term. The due date does not observe weekends.',
    why:'When the money exists, lateness is pure waste: fee plus penalty-APR risk for zero benefit.'
  };
}},
{id:'credit-cards-decide-02',verb:'decide',part:5,tier:'independent',skill:'credit-cards',
gen:(v)=>{
  const person=v.person();
  return {
    q:`${person} owes $900 at 24% APR. The minimum is $25; they can afford $150 this month. What is the call?`,
    choices:v.shuffle([
      {label:'Pay the $150 — about $18 is interest, $132 kills principal; the debt dies in ~7 months.',ok:true},
      {label:'Pay the $25 minimum and save the $125 — cash on hand beats debt payoff.',ok:false,mis:'min-payment-trap'},
      {label:'Pay $25 — extra payments do not reduce interest.',ok:false,mis:'interest-eats-all'},
      {label:'Pay $75 — meet in the middle; extremes are risky.',ok:false,mis:'guess-is-good-enough'}
    ]),
    hint:'$900 at 24% costs $18/month. What must the payment beat?',
    good:'$150/month: ~7 months, ~$60 interest. $25/month: ~5 years, ~$600 interest. Same debt, 10× the interest.',
    bad:'"Cash on hand" earning 0–4% while debt accrues 24% is a guaranteed losing trade.',
    why:'Every dollar above the minimum shortens the debt\u2019s life — and interest only accrues while the debt is alive.'
  };
}},
{id:'credit-cards-decide-03',verb:'decide',part:5,tier:'independent',skill:'credit-cards',
gen:(v)=>{
  const person=v.person();
  return {
    q:`${person} owes $1,200 at 24% APR ($24/month interest). A 0%-for-12-months transfer costs a 3% fee ($36) — IF no new purchases go on the new card. What is the call?`,
    choices:v.shuffle([
      {label:'Transfer and freeze the new card — ~$36 fee vs ~$288/year interest saves about $250.',ok:true},
      {label:'Transfer and keep spending on the new card — 0% means free money.',ok:false,mis:'shuffle-fee'},
      {label:'Do not transfer — $36 is more than $24/month.',ok:false,mis:'fee-face-value'},
      {label:'Transfer, then transfer again next year — perpetual 0% is the strategy.',ok:false,mis:'shuffle-fee'}
    ]),
    hint:'$36 once vs $24 every month. And the fine print has a condition.',
    good:'$36 one-time vs $288/year: the transfer wins by ~$250 — but only if the new card is not used for spending.',
    bad:'New purchases on a transfer card usually accrue interest immediately (no grace period). The "strategy" becomes a trap.',
    why:'Balance transfers trade a small one-time fee for months of interest — profitable only with a payoff plan and zero new spending.'
  };
}},
{id:'credit-cards-decide-04',verb:'decide',part:5,tier:'independent',skill:'credit-cards',
gen:(v)=>{
  const person=v.person();
  return {
    q:`${person} pays a $95 annual fee on a card whose travel perks they never use. A no-annual-fee card with the same APR is available. What is the call?`,
    choices:v.shuffle([
      {label:'Switch to the no-fee card — $95/year for unused perks is a donation.',ok:true},
      {label:'Keep it — annual fees build credit faster.',ok:false,mis:'credit-shield'},
      {label:'Keep it — $95 is basically nothing.',ok:false,mis:'fee-face-value'},
      {label:'Keep it and start traveling to "earn back" the fee.',ok:false,mis:'borrow-to-spend'}
    ]),
    hint:'$95 × 5 years = $475. For perks never used.',
    good:'$95/year saved = $475 over five years, same APR, same credit line. Unused perks are not perks.',
    bad:'Spending extra to "earn back" a fee is the fee\u2019s favorite trick — it converts $95 into $500 of travel.',
    why:'Annual fees are worth it only when the perks\u2019 used value exceeds the fee. Otherwise it is a subscription to nothing.'
  };
}},
{id:'credit-cards-decide-05',verb:'decide',part:6,tier:'independent',skill:'credit-cards',
gen:(v)=>{
  const person=v.person();
  return {
    q:`${person} owes $3,000 at 24% APR — about $60/month in interest alone. They can pay $300/month. What is the call?`,
    choices:v.shuffle([
      {label:'Pay the fixed $300 — ~$240 beats principal monthly; the debt dies in about a year.',ok:true},
      {label:'Pay the $75 minimum — $300 is overkill for any debt.',ok:false,mis:'min-payment-trap'},
      {label:'Pay $60 — exactly the interest, keeping the balance "stable."',ok:false,mis:'interest-eats-all'},
      {label:'Pay $300 this month, then minimums — one big payment fixes it.',ok:false,mis:'guess-is-good-enough'}
    ]),
    hint:'$300 − $60 = $240 of real progress per month.',
    good:'$300/month clears $3,000 in ~11 months for ~$350 interest. Minimums would take 10+ years and ~$4,000+ interest.',
    bad:'Paying only the interest is renting the debt forever — $60/month, forever, for nothing.',
    why:'Big fixed payments turn scary balances into countdowns. The payment size — not the balance size — sets the timeline.'
  };
}},
{id:'credit-cards-decide-06',verb:'decide',part:6,tier:'independent',skill:'credit-cards',
gen:(v)=>{
  const person=v.person();
  return {
    q:`${person} has $250/month for two cards: Card A $400 at 29.99%, Card B $1,100 at 19.99%. Minimums are $25 each. Where should the $250 go?`,
    choices:v.shuffle([
      {label:'Minimums on both ($50), then the extra $200 at Card A — highest APR dies first (avalanche).',ok:true},
      {label:'All $250 at Card B — the bigger balance is scarier.',ok:false,mis:'apr-as-monthly'},
      {label:'$125 each — fairness matters between cards.',ok:false,mis:'guess-is-good-enough'},
      {label:'All $250 at Card A and skip Card B\u2019s minimum this month.',ok:false}
    ]),
    hint:'Price each card\u2019s monthly interest: A ≈ $10, B ≈ $18. Which rate is the most expensive debt?',
    good:'Avalanche: Card A dies in 2 months, then all $250 attacks Card B. Total interest minimized — the 29.99% rate is the priciest debt.',
    bad:'Skipping a minimum triggers a late fee plus penalty APR — the "extra" payment funds new penalties instead.',
    why:'Pay minimums everywhere (never miss), then aim all extra at the highest APR. Highest rate = most expensive = first target.'
  };
}},
{id:'credit-cards-decide-07',verb:'decide',part:6,tier:'independent',skill:'credit-cards',
gen:(v)=>{
  const person=v.person();
  return {
    q:`${person} gets a surprise $500. Options: kill $500 of card debt at 24% APR, or park it in savings earning 4%. What is the call?`,
    choices:v.shuffle([
      {label:'Kill the card debt — a guaranteed 24% return beats a 4% return every time.',ok:true},
      {label:'Save it — cash on hand is always safer than paying debt.',ok:false,mis:'guess-is-good-enough'},
      {label:'Split it — $250 each; balance in all things.',ok:false,mis:'guess-is-good-enough'},
      {label:'Spend it — windfalls do not count in budgets.',ok:false,mis:'borrow-to-spend'}
    ]),
    hint:'Paying 24% debt = earning 24%, risk-free. Savings = 4%.',
    good:'$500 against 24% debt saves ~$120/year in interest, guaranteed. The savings account would earn ~$20. The spread is $100/year.',
    bad:'"Cash on hand" while paying 24% is renting your own money back to yourself at credit-card rates.',
    why:'Debt payoff is an investment with a guaranteed return equal to the APR. Compare it to any alternative return honestly.'
  };
}},
{id:'credit-cards-decide-08',verb:'decide',part:6,tier:'independent',skill:'credit-cards',
gen:(v)=>{
  const person=v.person();
  return {
    q:`${person}'s oldest card (10 years) sits at $0 balance with no annual fee. A friend says "close it — fewer cards, cleaner life." What is the call?`,
    choices:v.shuffle([
      {label:'Keep it open — 10 years of history helps the score; an unused no-fee card costs $0.',ok:true},
      {label:'Close it — fewer cards always means a better score.',ok:false,mis:'guess-is-good-enough'},
      {label:'Close it — a $0 balance is embarrassing to the lender.',ok:false},
      {label:'Close it and open a new card — new cards reset the history clock nicely.',ok:false,mis:'credit-shield'}
    ]),
    hint:'History length is a scoring factor. $0 balance + $0 fee = $0 cost.',
    good:'The 10-year history keeps scoring models happy at zero cost. Closing it shortens the history and can raise utilization — a double hit for "cleanliness."',
    bad:'"Cleaner life" is not a scoring factor. History length is.',
    why:'Old, no-fee, zero-balance cards are free score support. Close cards that charge fees you do not use — not cards that cost nothing.'
  };
}},

/* ================= credit-cards · spot (6) ================= */
{id:'credit-cards-spot-01',verb:'spot',part:6,tier:'independent',skill:'credit-cards',
gen:(v)=>{
  const person=v.person();
  return {
    scenario:`<p>${person} owes $2,000 at 1.5% monthly ($30 interest/month), pays the $40 minimum, and says: "I\u2019m making real progress — $40 a month adds up."</p>`,
    q:'What is the flaw in this thinking?',
    choices:v.shuffle([
      {label:'Only $10 of the $40 reduces the balance — at this pace the debt takes ~9 years and ~$2,300 in interest.',ok:true},
      {label:'The flaw is paying monthly; biweekly minimums would fix it.',ok:false},
      {label:'There is no flaw — $40/month clears $2,000 in 50 months.',ok:false,mis:'min-payment-trap'},
      {label:'The flaw is the 1.5% rate; cards should charge 0%.',ok:false}
    ]),
    hint:'$40 − $30.',
    good:'$10/month of progress on $2,000 = a 200-month plan. "Adds up" describes the interest, not the payoff.',
    bad:'$40 × 50 = $2,000 ignores interest entirely — the most common arithmetic error in personal finance.',
    why:'Critique minimums by splitting them: interest portion vs principal portion. The split reveals the trap.'
  };
}},
{id:'credit-cards-spot-02',verb:'spot',part:6,tier:'independent',skill:'credit-cards',
gen:(v)=>{
  const person=v.person();
  return {
    scenario:`<p>${person} paid a $30 late fee, shrugged — "just $30" — and never noticed the penalty APR (29.99%) that kicked in on the $1,000 balance.</p>`,
    q:'What is the flaw in this thinking?',
    choices:v.shuffle([
      {label:'The $30 was the cheap part — penalty APR raised monthly interest from ~$20 to ~$25 until the rate resets.',ok:true},
      {label:'The flaw is shrugging; late fees require formal complaints.',ok:false},
      {label:'There is no flaw — $30 is the entire cost of paying late.',ok:false,mis:'fee-face-value'},
      {label:'Penalty APR only applies to new purchases, so the $1,000 is safe.',ok:false,mis:'guess-is-good-enough'}
    ]),
    hint:'Read past the fee line to the rate-change notice.',
    good:'$30 once vs +$5/month for months: the fee was the appetizer. Penalty APR is the main course.',
    bad:'Taking a fee at "face value" misses the rate change hiding behind it — the fine print is where the real price lives.',
    why:'Fee situations must be critiqued fully: the fee AND the triggered consequences. Face-value reading misses the expensive part.'
  };
}},
{id:'credit-cards-spot-03',verb:'spot',part:6,tier:'independent',skill:'credit-cards',
gen:(v)=>{
  const person=v.person();
  return {
    scenario:`<p>${person} "beat the system": shuffled $1,000 across three 0% promo cards over 18 months, paying a 3% transfer fee each time ($90 total), while still charging new purchases.</p>`,
    q:'What is the flaw in this thinking?',
    choices:v.shuffle([
      {label:'$90 in transfer fees plus interest on new purchases (no grace period) — the shuffle cost more than a straight payoff plan.',ok:true},
      {label:'The flaw is using three cards; two would have been optimal.',ok:false,mis:'shuffle-fee'},
      {label:'There is no flaw — 0% means 0%, and fees do not count.',ok:false,mis:'fee-face-value'},
      {label:'The flaw is stopping at three cards; perpetual shuffling is free money.',ok:false,mis:'shuffle-fee'}
    ]),
    hint:'Add the fees. Then price the new purchases.',
    good:'$90 in fees + new-purchase interest at full APR with no grace period. The "system" was beaten by the system.',
    bad:'Each shuffle feels clever; the fee ledger says $90 for the privilege of still owing $1,000.',
    why:'Rate-chasing without a payoff plan is motion without progress. Count every fee — shuffling is not free.'
  };
}},
{id:'credit-cards-spot-04',verb:'spot',part:6,tier:'independent',skill:'credit-cards',
gen:(v)=>{
  const person=v.person();
  return {
    scenario:`<p>${person} closed their oldest card (12 years, $0 balance, no fee) for a "fresh start." Six months later their score dropped.</p>`,
    q:'What is the flaw in this thinking?',
    choices:v.shuffle([
      {label:'Closing it shortened their credit history and possibly raised utilization — a $0 no-fee card was free score support.',ok:true},
      {label:'The flaw is the 6-month wait; scores update instantly.',ok:false},
      {label:'There is no flaw — old cards always hurt scores.',ok:false,mis:'credit-shield'},
      {label:'The flaw is the $0 balance; cards should carry small balances.',ok:false,mis:'credit-shield'}
    ]),
    hint:'What did the old card contribute? History length and available credit.',
    good:'12 years of history deleted for "freshness." The card cost $0 and contributed two scoring factors.',
    bad:'"Fresh start" is not a scoring factor. History length is.',
    why:'Critique closures: a no-fee card with history is an asset. Close fee-charging unused cards — not free ones with tenure.'
  };
}},
{id:'credit-cards-spot-05',verb:'spot',part:6,tier:'independent',skill:'credit-cards',
gen:(v)=>{
  const person=v.person();
  return {
    scenario:`<p>${person} took a $300 cash advance for concert tickets: 5% fee ($15), 28% APR, interest from day one.</p>`,
    q:'What is the flaw in this thinking?',
    choices:v.shuffle([
      {label:'Three stacked costs — $15 fee, higher APR, no grace period — for tickets that could have waited.',ok:true},
      {label:'The flaw is the concert choice; cash advances for bills are fine.',ok:false},
      {label:'There is no flaw — $15 is a fair price for quick cash.',ok:false,mis:'fee-face-value'},
      {label:'The flaw is not taking $600 to make the fee "worth it."',ok:false,mis:'borrow-to-spend'}
    ]),
    hint:'Fee + rate + timing. All three at once.',
    good:'$300 became $315 instantly, then ~$7/month in interest. For a want. The most expensive ticket surcharge ever.',
    bad:'"Fair price for quick cash" ignores the rate and the missing grace period — the fee is only one of three costs.',
    why:'Cash advances deserve extra critique because the costs stack: fee up front, higher rate, interest immediately.'
  };
}},
{id:'credit-cards-spot-06',verb:'spot',part:6,tier:'independent',skill:'credit-cards',
gen:(v)=>{
  const person=v.person();
  return {
    scenario:`<p>${person} took "0% for 12 months" on $1,500, paid $100/month, and left $300 at month 12 — then got hit with $360 in deferred interest.</p>`,
    q:'What is the flaw in this thinking?',
    choices:v.shuffle([
      {label:'They missed the "deferred" in deferred interest — the $300 remainder triggered 12 months of retroactive interest on the full $1,500.',ok:true},
      {label:'The flaw is paying $100/month; minimums would have avoided the interest.',ok:false,mis:'min-payment-trap'},
      {label:'There is no flaw — $360 in interest on $1,500 is normal.',ok:false,mis:'fee-face-value'},
      {label:'The flaw is the 12-month term; 6-month promos never do this.',ok:false,mis:'guess-is-good-enough'}
    ]),
    hint:'Deferred ≠ waived. Read the trigger condition.',
    good:'$1,500 × 24% = $360 retroactive — because $300 remained. $100/month was $25/month short of the real requirement: $125.',
    bad:'The promo\u2019s headline was 0%; its terms were "0% IF." The IF was the entire contract.',
    why:'Deferred-interest promos must be critiqued on the trigger, not the headline: any remainder at the deadline reprices the whole original balance.'
  };
}},

/* ================= credit-cards · compare (6) ================= */
{id:'credit-cards-compare-01',verb:'compare',part:6,tier:'independent',skill:'credit-cards',
gen:(v)=>{
  const person=v.person();
  return {
    context:`<p>${person} owes $1,000 at 24% APR.</p><p><b>Path A:</b> $25 minimums (~4 years, ~$400 interest).</p><p><b>Path B:</b> Fixed $100/month (~1 year, ~$90 interest).</p>`,
    q:'Which payoff path costs less — and by about how much?',
    choices:v.shuffle([
      {label:'Path B — about $310 less interest and 3 fewer years of debt.',ok:true},
      {label:'Path A — smaller payments always cost less overall.',ok:false,mis:'min-payment-trap'},
      {label:'They cost the same — $1,000 repaid is $1,000 repaid.',ok:false,mis:'fee-face-value'},
      {label:'Path A — stretching payments reduces the monthly interest rate.',ok:false,mis:'apr-as-monthly'}
    ]),
    hint:'Interest accrues monthly. Count the months.',
    good:'~$90 vs ~$400: Path B saves ~$310 and ends 3 years sooner. Same debt, wildly different price.',
    bad:'Smaller payments cost less per month and far more in total — the most expensive "savings" in finance.',
    why:'Compare payoff paths on total interest + total time. The minimum path maximizes both.'
  };
}},
{id:'credit-cards-compare-02',verb:'compare',part:6,tier:'independent',skill:'credit-cards',
gen:(v)=>{
  const person=v.person();
  return {
    context:`<p>${person} has $200/month for two cards: A $400 at 29.99%, B $900 at 19.99%.</p><p><b>Avalanche:</b> extra to the highest APR (A first).</p><p><b>Snowball:</b> extra to the smallest balance (A first — same target here, but B would linger longer under snowball if balances were reversed).</p>`,
    q:'Which method costs less in total interest here?',
    choices:v.shuffle([
      {label:'Avalanche — attacking the 29.99% rate first minimizes total interest.',ok:true},
      {label:'Snowball — smallest balance first always costs less.',ok:false,mis:'guess-is-good-enough'},
      {label:'They are identical — $200/month is $200/month.',ok:false,mis:'fee-face-value'},
      {label:'Neither — split $100/$100; fairness minimizes interest.',ok:false}
    ]),
    hint:'Highest rate = most expensive debt per dollar.',
    good:'Avalanche kills the 29.99% debt first, saving the most interest. Snowball\u2019s speed advantage is psychological — real, but priced.',
    bad:'"Smallest first always costs less" is only true when the smallest also has the highest rate. Check both.',
    why:'Avalanche minimizes interest (math-optimal); snowball maximizes quick wins (motivation-optimal). Know which you are buying.'
  };
}},
{id:'credit-cards-compare-03',verb:'compare',part:6,tier:'independent',skill:'credit-cards',
gen:(v)=>{
  const person=v.person();
  return {
    context:`<p>${person} owes $1,500 at 24% APR ($30/month interest).</p><p><b>Option A:</b> Stay — keep paying at 24%.</p><p><b>Option B:</b> Transfer to 0% for 12 months, 3% fee ($45), and pay it off within the year.</p>`,
    q:'Which costs less over the next 12 months?',
    choices:v.shuffle([
      {label:'Option B — $45 fee vs ~$360 in interest saves about $315.',ok:true},
      {label:'Option A — $45 is more than one month of $30 interest.',ok:false,mis:'fee-face-value'},
      {label:'They cost the same — fees and interest cancel out.',ok:false},
      {label:'Option B — but only if they also keep spending on the new card.',ok:false,mis:'shuffle-fee'}
    ]),
    hint:'$30 × 12 vs $45 once.',
    good:'$45 vs ~$360: the transfer wins by ~$315 — provided the balance actually dies within 12 months and the new card stays frozen.',
    bad:'Comparing the fee to ONE month of interest is the oldest transfer-trap math. Multiply the interest by the months.',
    why:'Transfer math: one-time fee vs (monthly interest × months). The fee usually wins — if the payoff deadline is real.'
  };
}},
{id:'credit-cards-compare-04',verb:'compare',part:6,tier:'independent',skill:'credit-cards',
gen:(v)=>{
  const person=v.person();
  return {
    context:`<p>${person} owes $1,800 at 21% APR.</p><p><b>Path A:</b> $200/month (~10 months, ~$150 interest).</p><p><b>Path B:</b> $100/month (~22 months, ~$350 interest).</p>`,
    q:'What does the bigger payment save?',
    choices:v.shuffle([
      {label:'About $200 in interest and roughly a year of debt.',ok:true},
      {label:'Nothing — $1,800 repaid is $1,800 repaid.',ok:false,mis:'fee-face-value'},
      {label:'About $1,000 — doubling payments halves everything.',ok:false,mis:'guess-is-good-enough'},
      {label:'It costs extra — bigger payments are penalized.',ok:false}
    ]),
    hint:'Fewer months alive = fewer months of interest.',
    good:'~$150 vs ~$350 interest; 10 months vs 22. Doubling the payment saved ~$200 and a full year.',
    bad:'Interest is rent on the remaining balance — the faster it falls, the less rent accrues. Bigger payments are never penalized.',
    why:'Payment size sets the debt\u2019s lifespan, and lifespan sets total interest. Compare paths on both.'
  };
}},
{id:'credit-cards-compare-05',verb:'compare',part:6,tier:'independent',skill:'credit-cards',
gen:(v)=>{
  const person=v.person();
  return {
    context:`<p>${person} has an extra $100/month.</p><p><b>Option A:</b> Extra $100 toward a card at 24% APR.</p><p><b>Option B:</b> $100/month into savings earning 4%.</p>`,
    q:'Which use of the $100 earns more over a year?',
    choices:v.shuffle([
      {label:'Option A — avoiding 24% interest beats earning 4%, guaranteed.',ok:true},
      {label:'Option B — savings are safe; debt payoff is just spending.',ok:false,mis:'guess-is-good-enough'},
      {label:'They are equal — $100 is $100 either way.',ok:false,mis:'fee-face-value'},
      {label:'Option B — 4% compounds, 24% does not.',ok:false,mis:'apr-as-monthly'}
    ]),
    hint:'24% guaranteed vs 4%. No contest — but say why.',
    good:'$100/month against 24% debt saves ~$240+/year in interest (and compounds as the balance falls). Savings earns ~$25. The spread is ~10×.',
    bad:'"Debt payoff is just spending" misses that it is spending with a 24% guaranteed return attached.',
    why:'Paying high-APR debt is a risk-free investment yielding the APR. Compare it honestly against any alternative yield.'
  };
}},
{id:'credit-cards-compare-06',verb:'compare',part:6,tier:'independent',skill:'credit-cards',
gen:(v)=>{
  const person=v.person();
  return {
    context:`<p>${person} has $600 in checking and a $600 card balance at 24%.</p><p><b>Option A:</b> Pay the card in full, keep a small buffer.</p><p><b>Option B:</b> Keep the $600 in checking "for emergencies" and carry the balance.</p>`,
    q:'Which costs less per month?',
    choices:v.shuffle([
      {label:'Option A — carrying costs $12/month; the "emergency" cash earns ~$0.',ok:true},
      {label:'Option B — cash on hand is always worth 24% APR.',ok:false,mis:'guess-is-good-enough'},
      {label:'They are equal — $600 is $600.',ok:false,mis:'fee-face-value'},
      {label:'Option B — paying in full leaves you broke.',ok:false,mis:'balance-not-available'}
    ]),
    hint:'$600 × 24% ÷ 12 vs $600 × ~0%.',
    good:'$12/month to keep cash that earns pennies. Keep a $100 buffer, kill the $500 — the math is $10/month saved.',
    bad:'"For emergencies" at 24% is the most expensive insurance policy ever sold. A paid-off card IS the emergency fund — the credit line remains.',
    why:'Idle cash next to high-APR debt is a guaranteed loss. Compare the debt\u2019s monthly cost against the cash\u2019s monthly earnings.'
  };
}},

/* ================= credit-cards · predict (6) ================= */
{id:'credit-cards-predict-01',verb:'predict',part:6,tier:'independent',skill:'credit-cards',
gen:(v)=>{
  const person=v.person();
  return {
    q:`${person} owes $2,400 at 24% APR ($48/month interest) and pays only the $48 minimum. After one full year, what happened?`,
    choices:v.shuffle([
      {label:'About $576 paid, balance still ~$2,350 — a year of payments erased ~$50 of debt.',ok:true},
      {label:'Debt-free — $48 × 12 = $576... which is nowhere near $2,400.',ok:false},
      {label:'Balance cut in half — minimums make steady progress.',ok:false,mis:'min-payment-trap'},
      {label:'Balance grew — the minimum did not cover interest.',ok:false,mis:'interest-eats-all'}
    ]),
    hint:'$48 payment − $48 interest = $0 progress. (Roughly — shrinking balance helps slightly.)',
    good:'$576 out, ~$50 of debt gone. A full year of "responsible payments" bought 2% of progress.',
    bad:'"Steady progress" at ~$4/month is a 50-year plan. The minimum was calibrated to the interest, not to freedom.',
    why:'When the minimum ≈ monthly interest, payments tread water. The debt\u2019s lifespan is set by the payment\u2019s size above interest.'
  };
}},
{id:'credit-cards-predict-02',verb:'predict',part:6,tier:'independent',skill:'credit-cards',
gen:(v)=>{
  const person=v.person();
  return {
    q:`${person} pays 10 days late once on a $1,000 balance. Beyond the $30 fee, what changes going forward?`,
    choices:v.shuffle([
      {label:'Penalty APR (~29.99%) can kick in — monthly interest jumps from ~$20 to ~$25 until the rate resets.',ok:true},
      {label:'Nothing — one late payment has no consequences beyond the fee.',ok:false,mis:'fee-face-value'},
      {label:'The balance is forgiven as a first-time courtesy.',ok:false},
      {label:'The APR drops as a warning to do better.',ok:false}
    ]),
    hint:'Read the Schumer box: "penalty APR."',
    good:'+$5/month for as long as the penalty lasts — the $30 fee was just the cover charge.',
    bad:'"No consequences beyond the fee" is exactly what the fee wants you to think. The rate change is the real bill.',
    why:'One late payment can reprice the entire balance upward for months. The fee is visible; the repricing is the expensive part.'
  };
}},
{id:'credit-cards-predict-03',verb:'predict',part:6,tier:'independent',skill:'credit-cards',
gen:(v)=>{
  const person=v.person();
  return {
    q:`${person} closes their oldest card — 10 years of history, $0 balance, no fee. What happens to the credit-score factors?`,
    choices:v.shuffle([
      {label:'History length can shrink and utilization can rise — two scoring factors move the wrong way.',ok:true},
      {label:'Scores rise — fewer cards always helps.',ok:false,mis:'credit-shield'},
      {label:'Nothing — closed cards stay on the report looking identical.',ok:false,mis:'guess-is-good-enough'},
      {label:'Scores rise — old cards drag down the average.',ok:false}
    ]),
    hint:'Two factors: how long you have had credit, and balance vs total limits.',
    good:'The 10-year anchor vanishes from the average age, and $0 of its limit stops diluting utilization. Both hurt.',
    bad:'Closed cards do not "look identical" — the available credit leaves the utilization math immediately.',
    why:'Utilization = balances ÷ total limits. Closing a card shrinks the denominator — every remaining balance looks bigger.'
  };
}},
{id:'credit-cards-predict-04',verb:'predict',part:6,tier:'independent',skill:'credit-cards',
gen:(v)=>{
  const person=v.person();
  return {
    q:`${person} takes "0% for 6 months (deferred interest)" on $900 at 24%, pays $100/month, and has $300 left at month 6. What hits?`,
    choices:v.shuffle([
      {label:'About $108 in retroactive interest — 6 months at 24% on the original $900, triggered by the $300 remainder.',ok:true},
      {label:'Nothing — $100/month was responsible, so the promo extends.',ok:false,mis:'later-is-free'},
      {label:'About $6 — interest on just the $300 remainder.',ok:false,mis:'guess-is-good-enough'},
      {label:'The $300 is forgiven as a promo reward.',ok:false}
    ]),
    hint:'Deferred interest looks backward at the ORIGINAL balance.',
    good:'$900 × 24% ÷ 2 = $108 — for being $300 short. The promo demanded $150/month; $100/month was a $50/month miscalculation.',
    bad:'"Responsible payments" do not satisfy deferred-interest terms. Only $0 at the deadline does.',
    why:'Deferred interest reprices the original balance retroactively. The deadline math — balance ÷ months — must be done before signing.'
  };
}},
{id:'credit-cards-predict-05',verb:'predict',part:6,tier:'independent',skill:'credit-cards',
gen:(v)=>{
  const person=v.person();
  return {
    q:`${person} pays $100/month toward a $1,200 balance (24% APR) but keeps charging $200/month in new purchases. What happens over six months?`,
    choices:v.shuffle([
      {label:'The balance GROWS — $1,200 of new charges vs $600 of payments means ~$1,700+ owed, plus interest.',ok:true},
      {label:'The balance shrinks — $100/month always makes progress.',ok:false,mis:'min-payment-trap'},
      {label:'The balance stays flat — payments and purchases cancel out.',ok:false,mis:'fee-face-value'},
      {label:'The card freezes itself as a safety measure.',ok:false}
    ]),
    hint:'$200 in, $100 out. Every month. Do the direction.',
    good:'+$100/month net, plus ~$20–$30/month interest: six months turns $1,200 into ~$1,900. Payments cannot outrun bigger spending.',
    bad:'"Always makes progress" ignores the other side of the ledger. Net flow decides the balance, not payments alone.',
    why:'Payoff requires payments > new charges + interest. Charging more than you pay is debt growth with extra steps.'
  };
}},
{id:'credit-cards-predict-06',verb:'predict',part:6,tier:'independent',skill:'credit-cards',
gen:(v)=>{
  const person=v.person();
  return {
    q:`${person} ignores a $95 annual fee on a card they never use. Three years pass. What did that cost?`,
    choices:v.shuffle([
      {label:'$285 — for zero benefit, plus three years of statements to ignore.',ok:true},
      {label:'$95 — annual fees only charge once, ever.',ok:false,mis:'fee-face-value'},
      {label:'$0 — unused cards are never charged.',ok:false,mis:'guess-is-good-enough'},
      {label:'$95 — fees pause while the card is unused.',ok:false}
    ]),
    hint:'Annual. Every year.',
    good:'$285 donated for nothing. One phone call in year one — cancel or downgrade — would have kept all of it.',
    bad:'"Never charged for unused cards" is wishful thinking with a billing department.',
    why:'Recurring fees compound like subscriptions: small annual amounts become large multi-year totals. Audit cards yearly.'
  };
}},

/* ================= credit-cards · build (5) ================= */
{id:'credit-cards-build-01',verb:'build',part:5,tier:'independent',skill:'credit-cards',
gen:(v)=>{
  const person=v.person();
  const total=1000;
  return {
    h:'Build it: payoff month on $1,000 take-home',
    body:`<p>${person} takes home ${v.money(total)} and owes $1,200 at 24%. Build the attack month.</p>`,
    totalDollars:total,
    buckets:[{id:'needs',label:'Needs'},{id:'card-payoff',label:'Card payoff'},{id:'savings',label:'Savings'},{id:'wants',label:'Wants'}],
    targets:{needs:620,'card-payoff':220,savings:100,wants:60},
    hint:'$1,200 at 24% ≈ $24/month interest. The payoff line must crush it.',
    good:'$220/month clears it in ~6 months for ~$75 interest. Minimums would take 5+ years.',
    bad:'A $25 payoff line against $24/month interest is treading water at $1/month of progress.',
    why:'The payoff line\u2019s size above monthly interest sets the debt\u2019s lifespan. Oversize it.'
  };
}},
{id:'credit-cards-build-02',verb:'build',part:5,tier:'independent',skill:'credit-cards',
gen:(v)=>{
  const person=v.person();
  const total=800;
  return {
    h:'Build it: tight month, $700 of card debt',
    body:`<p>${person}'s take-home is ${v.money(total)}; the card holds $700 at 21%. Split it.</p>`,
    totalDollars:total,
    buckets:[{id:'needs',label:'Needs'},{id:'card-payoff',label:'Card payoff'},{id:'savings',label:'Savings'},{id:'wants',label:'Wants'}],
    targets:{needs:500,'card-payoff':170,savings:70,wants:60},
    hint:'Tight months still need an oversized payoff line.',
    good:'$170/month kills $700 in ~5 months. The wants survive at $60 — trimmed, not zeroed.',
    bad:'Protecting wants at full size while the debt accrues 21% is choosing the expensive version of fun.',
    why:'Debt at 21% is the highest "bill" in the budget — it deserves the biggest discretionary line.'
  };
}},
{id:'credit-cards-build-03',verb:'build',part:6,tier:'independent',skill:'credit-cards',
gen:(v)=>{
  const person=v.person();
  const total=1400;
  return {
    h:'Build it: two-card avalanche month',
    body:`<p>${person} owes $900 at 24% (Card A) and $600 at 18% (Card B). Take-home: ${v.money(total)}. Build the avalanche.</p>`,
    totalDollars:total,
    buckets:[{id:'needs',label:'Needs'},{id:'card-a-24pct',label:'Card A (24%)'},{id:'card-b-18pct',label:'Card B (18%)'},{id:'savings',label:'Savings'}],
    targets:{needs:900,'card-a-24pct':300,'card-b-18pct':100,savings:100},
    hint:'Minimums on both, then everything extra at the highest APR.',
    good:'$300 vs $100: Card A dies in ~3 months, then all $400 attacks Card B. Total interest minimized.',
    bad:'Even splits feel fair but cost more — fairness to lenders is not a strategy.',
    why:'Avalanche in action: minimums everywhere, extra fire concentrated on the priciest debt.'
  };
}},
{id:'credit-cards-build-04',verb:'build',part:6,tier:'independent',skill:'credit-cards',
gen:(v)=>{
  const person=v.person();
  const total=950;
  return {
    h:'Build it: $950 month vs $1,100 debt',
    body:`<p>${person} takes home ${v.money(total)} and owes $1,100 at 22%. Every dollar has a job.</p>`,
    totalDollars:total,
    buckets:[{id:'needs',label:'Needs'},{id:'card-payoff',label:'Card payoff'},{id:'savings',label:'Savings'},{id:'wants',label:'Wants'}],
    targets:{needs:580,'card-payoff':200,savings:90,wants:80},
    hint:'$1,100 at 22% ≈ $20/month interest. $200/month ends it in ~6 months.',
    good:'$200/month: ~6 months, ~$65 interest. The debt dies before summer ends.',
    bad:'$80 of wants is honest; $0 of payoff would be surrender. Interest never surrenders.',
    why:'Fixed oversized payments convert "debt" into "countdown." The calendar does the rest.'
  };
}},
{id:'credit-cards-build-05',verb:'build',part:6,tier:'independent',skill:'credit-cards',
gen:(v)=>{
  const person=v.person();
  const total=1600;
  return {
    h:'Build it: the big push — $1,600 month',
    body:`<p>${person}'s best month: ${v.money(total)} take-home, $1,800 card debt at 24%. Go aggressive.</p>`,
    totalDollars:total,
    buckets:[{id:'needs',label:'Needs'},{id:'card-payoff',label:'Card payoff'},{id:'savings',label:'Savings'},{id:'wants',label:'Wants'}],
    targets:{needs:950,'card-payoff':400,savings:150,wants:100},
    hint:'$400/month vs ~$36/month interest — the debt cannot survive this.',
    good:'$400/month clears $1,800 in ~5 months for ~$100 interest. Minimums: 10+ years, ~$2,500+ interest.',
    bad:'Lifestyle-creeping the extra income instead would keep the debt alive for years — at 24%.',
    why:'Aggression is the strategy: big payments collapse both the timeline and the total interest.'
  };
}},

/* ================= credit-cards · explain (5) ================= */
{id:'credit-cards-explain-01',verb:'explain',part:6,tier:'independent',skill:'credit-cards',
gen:(v)=>({
  h:'Teach it back: APR to monthly rate',
  prompt:'Explain in your own words how to convert a card\u2019s APR into its monthly rate — and why the monthly rate matters more day-to-day.',
  keyPoints:['APR is annual; divide by 12 for the monthly rate','24% APR = 2% per month; 18% = 1.5%','Monthly interest = balance × monthly rate','The monthly rate prices one month of carrying any balance'],
  modelAnswer:'Divide the APR by 12 to get the monthly rate — 24% APR is 2% per month. Multiply any balance by that rate to price one month of carrying it. The monthly rate matters more day-to-day because interest posts monthly, not yearly.',
  hint:'Annual ÷ 12.'
})},
{id:'credit-cards-explain-02',verb:'explain',part:6,tier:'independent',skill:'credit-cards',
gen:(v)=>({
  h:'Teach it back: the minimum-payment trap',
  prompt:'Explain in your own words why minimum payments keep card debt alive for years.',
  keyPoints:['Interest is subtracted from each payment first','Minimums are set just above the monthly interest','So only a tiny slice reduces the balance','Result: years of payments, mostly interest'],
  modelAnswer:'Every payment covers the month\u2019s interest first, and only the leftover shrinks the balance. Minimums are sized barely above the interest charge, so the leftover is tiny — which is how a $2,000 balance on $40 minimums takes ~9 years. Paying more than the minimum is the only thing that shortens the trap.',
  hint:'Interest eats first.'
})},
{id:'credit-cards-explain-03',verb:'explain',part:6,tier:'independent',skill:'credit-cards',
gen:(v)=>({
  h:'Teach it back: avalanche vs snowball',
  prompt:'Explain in your own words the two main multi-card payoff strategies and when each makes sense.',
  keyPoints:['Avalanche: extra payments to the highest APR first — cheapest total','Snowball: extra payments to the smallest balance first — fastest first win','Both pay minimums on all cards always','Avalanche wins on math; snowball wins on motivation'],
  modelAnswer:'Avalanche aims all extra payments at the highest-APR card, minimizing total interest — it is math-optimal. Snowball aims extra at the smallest balance for the fastest first payoff — it is motivation-optimal. Both require minimums on every card; the choice is cheapest total vs quickest win.',
  hint:'Highest rate vs smallest balance.'
})},
{id:'credit-cards-explain-04',verb:'explain',part:6,tier:'independent',skill:'credit-cards',
gen:(v)=>({
  h:'Teach it back: reading the fine print',
  prompt:'Explain in your own words three fee traps hiding in card fine print — and how to spot each before signing.',
  keyPoints:['Deferred interest: "0%" can mean retroactive interest if any balance remains at the deadline','Balance-transfer fees (often 3%) are charged up front on the transferred amount','Penalty APR (~30%) can reprice the whole balance after one late payment','The trigger conditions matter more than the headline rate'],
  modelAnswer:'Three traps: deferred interest charges months of retroactive interest if anything remains at the promo deadline; balance-transfer fees take ~3% up front; and one late payment can trigger penalty APR near 30% on the whole balance. In each case the trigger condition — not the headline — is the real term.',
  hint:'Headline vs trigger.'
})},
{id:'credit-cards-explain-05',verb:'explain',part:6,tier:'independent',skill:'credit-cards',
gen:(v)=>({
  h:'Teach it back: old cards and credit history',
  prompt:'Explain in your own words why keeping an old, no-fee card open can help — and when closing a card makes sense.',
  keyPoints:['History length is a scoring factor — old cards lengthen it','Their credit limit also dilutes utilization','A $0-balance, no-fee card costs nothing to keep','Close cards with fees you do not use — not free cards with history'],
  modelAnswer:'An old no-fee card with zero balance contributes history length and available credit to scoring models — at zero cost. Closing it can shorten history and raise utilization. Close cards whose fees exceed their used perks; keep free cards with tenure.',
  hint:'Free history vs paid nothing.'
})}
],
'scams': [

/* ================= scams · choice (8) ================= */
{id:'scams-choice-01',verb:'choice',part:5,tier:'independent',skill:'scams',
gen:(v)=>{
  const person=v.person();
  return {
    q:`A caller says ${person}'s electricity will be shut off in 30 minutes unless they pay with gift cards. What is the single biggest warning sign?`,
    choices:v.shuffle([
      {label:'The demand for gift cards — real companies never take payment that way.',ok:true},
      {label:'The 30-minute deadline — real shutoffs happen with no warning at all.',ok:false},
      {label:'The phone call — utilities never call customers.',ok:false,mis:'unverified-source'},
      {label:'There is no warning sign; this sounds like normal billing.',ok:false,mis:'urgency-overrides-verify'}
    ]),
    hint:'How does the caller want to be paid?',
    good:'Gift cards = untraceable, irreversible. That payment method IS the scam detector.',
    bad:'"Normal billing" never involves gift cards and 30-minute death threats.',
    why:'Payment method is the fastest scam filter: gift cards, crypto, and wire transfers are scammer favorites because they cannot be reversed.'
  };
}},
{id:'scams-choice-02',verb:'choice',part:5,tier:'independent',skill:'scams',
gen:(v)=>{
  const person=v.person();
  return {
    q:`"Pay in the next 20 minutes or the police are coming." Why is the time pressure itself a reason to slow down?`,
    choices:v.shuffle([
      {label:'Urgency is the weapon — it stops you from thinking and verifying.',ok:true},
      {label:'It is not a reason — real emergencies need fast payment.',ok:false,mis:'urgency-overrides-verify'},
      {label:'Time pressure proves the caller is legitimate and busy.',ok:false},
      {label:'The deadline is the only honest part of the call.',ok:false,mis:'unverified-source'}
    ]),
    hint:'What does rushing prevent you from doing?',
    good:'Rushing prevents the one thing that kills scams: independent verification. The deadline is engineered.',
    bad:'Real emergencies (hospital, fire) never demand gift cards on a countdown.',
    why:'Urgency bypasses judgment. Any demand that forbids verification is verifying itself — as a scam.'
  };
}},
{id:'scams-choice-03',verb:'choice',part:5,tier:'independent',skill:'scams',
gen:(v)=>{
  const person=v.person();
  return {
    q:`${person} wants to check whether the shutoff threat is real. Which number should they call?`,
    choices:v.shuffle([
      {label:'The number printed on a real bill or the utility\u2019s known website.',ok:true},
      {label:'The number the caller gave for "immediate assistance."',ok:false,mis:'their-number-verifies'},
      {label:'The number from the caller ID display.',ok:false,mis:'their-number-verifies'},
      {label:'Any number found in the call\u2019s text-message follow-up.',ok:false,mis:'unverified-source'}
    ]),
    hint:'Who chose each number?',
    good:'The bill\u2019s number was chosen by the real company, months ago. Every other number was chosen by the person pressuring you.',
    bad:'Calling back their number just reaches the scam\u2019s second act.',
    why:'Verification must use a contact method you already know is legitimate — never one supplied by the person demanding money.'
  };
}},
{id:'scams-choice-04',verb:'choice',part:5,tier:'independent',skill:'scams',
gen:(v)=>{
  const person=v.person();
  return {
    q:`${person} gets a text "from the bank": "Suspicious activity — tap this link to secure your account." What is the safe move?`,
    choices:v.shuffle([
      {label:'Delete the text; open the bank\u2019s app (or type its address) directly and check there.',ok:true},
      {label:'Tap the link — it came from the bank\u2019s name.',ok:false,mis:'unverified-source'},
      {label:'Reply STOP and then tap the link to confirm.',ok:false,mis:'unverified-source'},
      {label:'Forward the link to friends to warn them, then tap it.',ok:false}
    ]),
    hint:'Names on texts are costumes. Where do you go instead?',
    good:'The app you installed (or the address you type) cannot be faked by a text. The link can.',
    bad:'Sender names are trivially spoofed. "From the bank" is a label, not a proof.',
    why:'Never verify through the channel that contacted you. Go to the institution through a path you chose.'
  };
}},
{id:'scams-choice-06',verb:'choice',part:6,tier:'independent',skill:'scams',
gen:(v)=>{
  const person=v.person();
  return {
    q:`${person}'s "friend" messages from a familiar account: "Emergency — send $200 fast, I\u2019ll explain later." What is the safe move?`,
    choices:v.shuffle([
      {label:'Contact the friend through a different, known channel (call their real number) before sending anything.',ok:true},
      {label:'Send it — the account is familiar, so it must be them.',ok:false,mis:'unverified-source'},
      {label:'Ask the messenger for proof, like a photo of their ID.',ok:false,mis:'hearsay-number'},
      {label:'Send half now — that limits the risk.',ok:false,mis:'guess-is-good-enough'}
    ]),
    hint:'Accounts get hacked. What cannot be hacked as easily?',
    good:'A voice call to the known number cuts through a hijacked account in 30 seconds.',
    bad:'A scammer holding the account can fake any "proof" the chat can carry — including ID photos.',
    why:'Verify identity through a second, independent channel — especially when the request is urgent and monetary.'
  };
}},
{id:'scams-choice-05',verb:'choice',part:6,tier:'independent',skill:'scams',
gen:(v)=>{
  const person=v.person();
  return {
    q:`A stranger demands payment and offers three options: gift cards, wire transfer, or credit card. Which option should make ${person} MOST suspicious?`,
    choices:v.shuffle([
      {label:'Gift cards — nearly impossible to reverse once the codes are shared.',ok:true},
      {label:'Credit card — it creates debt instantly.',ok:false,mis:'borrow-to-spend'},
      {label:'Wire transfer — wires are always safe because banks watch them.',ok:false,mis:'unverified-source'},
      {label:'All three are equally suspicious; the method does not matter.',ok:false}
    ]),
    hint:'Which one can never be taken back?',
    good:'Gift-card codes are cash with no return address. Credit cards have dispute processes; gift cards have none.',
    bad:'The method matters enormously — reversibility is the difference between a scare and a loss.',
    why:'Rank payment methods by reversibility. The less reversible, the more scammers love it — and the more suspicious the demand.'
  };
}},
{id:'scams-choice-07',verb:'choice',part:6,tier:'independent',skill:'scams',
gen:(v)=>{
  const person=v.person();
  return {
    q:`A "job" offers ${person} $400/week to cash $2,000 checks and forward $1,600 to "vendors." What is this?`,
    choices:v.shuffle([
      {label:'A fake-check scam — the checks will bounce, and ${person} will owe the $1,600 forwarded.',ok:true},
      {label:'A legitimate payment-processing job — forwarding money is normal work.',ok:false,mis:'unverified-source'},
      {label:'A great deal — $400 for simple errands.',ok:false,mis:'borrow-to-spend'},
      {label:'Legal as long as the checks clear initially.',ok:false}
    ]),
    hint:'Why would a real company pay a stranger to move its money?',
    good:'The $2,000 check is fake; the $1,600 you forward is real — from your account. When the check bounces, the bank takes back $2,000.',
    bad:'"Cleared initially" means nothing — fake checks bounce days later, after the forwarded money is gone.',
    why:'Any job that has you moving money through your own account is either a scam or money laundering. Real employers never operate this way.'
  };
}},
{id:'scams-choice-08',verb:'choice',part:6,tier:'independent',skill:'scams',
gen:(v)=>{
  const person=v.person();
  return {
    q:`The caller ID shows the bank\u2019s real customer-service number, and the caller knows ${person}'s name. Safe to trust?`,
    choices:v.shuffle([
      {label:'No — caller ID is easily spoofed, and names are public. Hang up and call the bank yourself.',ok:true},
      {label:'Yes — the bank\u2019s number on the display proves it is the bank.',ok:false,mis:'unverified-source'},
      {label:'Yes — scammers cannot know your real name.',ok:false,mis:'unverified-source'},
      {label:'Yes, but only share the last 4 digits of the account.',ok:false,mis:'their-number-verifies'}
    ]),
    hint:'What does the display actually prove?',
    good:'The display proves nothing — spoofing is trivial. The callback to the known number proves everything.',
    bad:'Names leak in every data breach. "Knows my name" is not authentication.',
    why:'Caller ID is a label, not a credential. Trust the number you dialed, never the number that dialed you.'
  };
}},

/* ================= scams · sort (6) ================= */
{id:'scams-sort-01',verb:'sort',part:5,tier:'independent',skill:'scams',
gen:(v)=>({
  h:'Sort it: signal, verify step, or safe habit?',
  body:'<p>Sort each item: is it a scam signal, a verification step, or an everyday safe habit?</p>',
  buckets:['Scam signal','Verify step','Safe habit'],
  items:v.shuffle([
    {label:'Demands payment in gift cards',a:'scam signal',why:'Scammers\u2019 favorite payment.'},
    {label:'Threatens shutoff in 30 minutes',a:'scam signal',why:'Manufactured urgency.'},
    {label:'Hang up; call the number on your bill',a:'verify step',why:'Independent verification.'},
    {label:'Asks for your PIN',a:'scam signal',why:'Real companies never ask.'},
    {label:'Tells you to keep it secret',a:'scam signal',why:'Secrecy blocks verification.'},
    {label:'Look up the company yourself',a:'verify step',why:'Your own lookup, your own number.'},
    {label:'Never share one-time codes',a:'safe habit',why:'Codes authenticate you — sharing hands over the account.'},
    {label:'Pause before any urgent payment',a:'safe habit',why:'The pause defeats urgency.'}
  ])
})},
{id:'scams-sort-02',verb:'sort',part:5,tier:'independent',skill:'scams',
gen:(v)=>({
  h:'Sort it: texts, links, and prizes',
  body:'<p>Sort each item about messages and links.</p>',
  buckets:['Scam signal','Verify step','Safe habit'],
  items:v.shuffle([
    {label:'Text with a link from "your bank"',a:'scam signal',why:'Banks do not operate by surprise text links.'},
    {label:'Open the bank app yourself instead',a:'verify step',why:'Your own path to the institution.'},
    {label:'"You won a prize" you never entered',a:'scam signal',why:'Unentered prizes are bait.'},
    {label:'Call back using the number on your statement',a:'verify step',why:'Known-good contact.'},
    {label:'Threatens arrest today',a:'scam signal',why:'Fear as a weapon.'},
    {label:'Demands crypto payment',a:'scam signal',why:'Irreversible payment demand.'},
    {label:'Check a link\u2019s real destination before tapping',a:'verify step',why:'Inspect before you trust.'},
    {label:'Never pay to receive a prize',a:'safe habit',why:'Real prizes do not charge admission.'}
  ])
})},
{id:'scams-sort-03',verb:'sort',part:6,tier:'independent',skill:'scams',
gen:(v)=>({
  h:'Sort it: job-scam edition',
  body:'<p>Job offers can be scams too. Sort each item.</p>',
  buckets:['Scam signal','Verify step','Safe habit'],
  items:v.shuffle([
    {label:'Job asks you to cash checks and forward money',a:'scam signal',why:'Fake-check / mule pattern.'},
    {label:'Interview happens only over text chat',a:'scam signal',why:'No verifiable identity.'},
    {label:'Look up the company independently',a:'verify step',why:'Confirm it exists and is hiring.'},
    {label:'Ask for a written offer letter',a:'verify step',why:'Real jobs document.'},
    {label:'Upfront "training fee" required',a:'scam signal',why:'Real jobs do not charge to hire you.'},
    {label:'Verify the recruiter on the company site',a:'verify step',why:'Match the person to the company.'},
    {label:'Never pay for a job',a:'safe habit',why:'Money flows TO the worker.'},
    {label:'Keep personal documents private until verified',a:'safe habit',why:'ID documents are not interview props.'}
  ])
})},
{id:'scams-sort-04',verb:'sort',part:6,tier:'independent',skill:'scams',
gen:(v)=>({
  h:'Sort it: tax-and-utility threats',
  body:'<p>Sort each item about threatening calls.</p>',
  buckets:['Scam signal','Verify step','Safe habit'],
  items:v.shuffle([
    {label:'"IRS agent" demands gift cards',a:'scam signal',why:'The IRS does not take gift cards. Ever.'},
    {label:'Threatens arrest in 20 minutes',a:'scam signal',why:'Manufactured urgency.'},
    {label:'Hang up and call the official number',a:'verify step',why:'Independent verification.'},
    {label:'The IRS initiates contact by mail',a:'safe habit',why:'Known fact that defuses phone threats.'},
    {label:'Asks for your Social Security number by phone',a:'scam signal',why:'Real agencies do not cold-call for SSNs.'},
    {label:'Use the number on last year\u2019s notice',a:'verify step',why:'Known-good contact.'},
    {label:'Slow down when threatened',a:'safe habit',why:'The pause defeats urgency.'},
    {label:'Never pay taxes with gift cards',a:'safe habit',why:'Payment-method filter.'}
  ])
})},
{id:'scams-sort-05',verb:'sort',part:6,tier:'independent',skill:'scams',
gen:(v)=>({
  h:'Sort it: friend-or-fraud messages',
  body:'<p>Sort each item about urgent money requests.</p>',
  buckets:['Scam signal','Verify step','Safe habit'],
  items:v.shuffle([
    {label:'"Friend" messages asking for $200 fast',a:'scam signal',why:'Urgency + money + messaging = verify.'},
    {label:'Call the friend on their known number',a:'verify step',why:'Second-channel verification.'},
    {label:'Ask something only they would know',a:'verify step',why:'Identity check.'},
    {label:'New online friend asks for money',a:'scam signal',why:'Classic advance-fee pattern.'},
    {label:'Keeps the relationship secret from family',a:'scam signal',why:'Secrecy blocks verification.'},
    {label:'Video-call before sending anything',a:'verify step',why:'Harder to fake live.'},
    {label:'Never send money to someone you have not met',a:'safe habit',why:'The base rule.'},
    {label:'Tell someone you trust about the request',a:'safe habit',why:'Sunlight kills scams.'}
  ])
})},
{id:'scams-sort-06',verb:'sort',part:6,tier:'independent',skill:'scams',
gen:(v)=>({
  h:'Sort it: QR codes and mystery links',
  body:'<p>Sort each item about codes, links, and texts.</p>',
  buckets:['Scam signal','Verify step','Safe habit'],
  items:v.shuffle([
    {label:'QR sticker slapped over a parking meter',a:'scam signal',why:'Tampered payment point.'},
    {label:'Link in an unexpected text',a:'scam signal',why:'Unsolicited link.'},
    {label:'Type the official address yourself',a:'verify step',why:'Your own path.'},
    {label:'Use the official parking app',a:'verify step',why:'Known-good channel.'},
    {label:'Unexpected "toll unpaid" text',a:'scam signal',why:'Smishing pattern.'},
    {label:'Hover to check a link\u2019s real destination',a:'verify step',why:'Inspect before tapping.'},
    {label:'Slow down before scanning anything',a:'safe habit',why:'The pause defeats urgency.'},
    {label:'Delete and report the suspicious text',a:'safe habit',why:'Cuts the channel.'}
  ])
})},

/* ================= scams · decide (8) ================= */
{id:'scams-decide-01',verb:'decide',part:5,tier:'independent',skill:'scams',
gen:(v)=>{
  const person=v.person();
  return {
    q:`${person} is on the phone: "Electric company — $180 due in 25 minutes or we cut the power. Pay by gift card." ${person}'s hands are shaking. What is the call?`,
    choices:v.shuffle([
      {label:'Hang up immediately, then call the number on a real bill to check the account.',ok:true},
      {label:'Pay quickly — 25 minutes is not enough time to verify.',ok:false,mis:'urgency-overrides-verify'},
      {label:'Ask the caller for their employee ID to confirm.',ok:false,mis:'their-number-verifies'},
      {label:'Buy one gift card as a good-faith partial payment.',ok:false,mis:'urgency-overrides-verify'}
    ]),
    hint:'The shaking hands are the point. What does the routine say?',
    good:'Hung up, verified through the bill\u2019s number: account current, no shutoff scheduled. The 25 minutes were theater.',
    bad:'One gift-card code shared = $180 gone, unrecoverable. "Good-faith partial" is still a full loss.',
    why:'Decide under pressure with the routine, not the adrenaline: stop the contact, verify independently, then act.'
  };
}},
{id:'scams-decide-02',verb:'decide',part:5,tier:'independent',skill:'scams',
gen:(v)=>{
  const person=v.person();
  return {
    q:`"IRS Criminal Division. You owe $800. Pay by wire transfer in the next hour or agents will arrest you today." ${person} has never owed taxes. What is the call?`,
    choices:v.shuffle([
      {label:'Hang up — the IRS initiates contact by mail and never demands wire transfers under arrest threats.',ok:true},
      {label:'Pay — an arrest threat from the IRS must be real.',ok:false,mis:'urgency-overrides-verify'},
      {label:'Call back the number they gave to "work out a plan."',ok:false,mis:'their-number-verifies'},
      {label:'Wire half to show cooperation while looking into it.',ok:false,mis:'urgency-overrides-verify'}
    ]),
    hint:'Two facts kill this call. Which two?',
    good:'Hung up. The IRS mails first, and no real agency takes wire transfers on an arrest countdown. Both facts were knowable in advance.',
    bad:'"Cooperation money" wired to scammers is just a donation with extra steps.',
    why:'Known facts are armor: IRS-by-mail and no-gift-card/wire-taxes turn the threat into noise before it starts.'
  };
}},
{id:'scams-decide-03',verb:'decide',part:5,tier:'independent',skill:'scams',
gen:(v)=>{
  const person=v.person();
  return {
    q:`A crying voice: "Grandma/Grandpa, it\u2019s me — I\u2019m in jail. Wire $900 bail, and please don\u2019t tell Mom." The voice sounds almost right. What is the call?`,
    choices:v.shuffle([
      {label:'Do not wire — call the grandchild\u2019s real number and the parents; verify before a dollar moves.',ok:true},
      {label:'Wire it — the voice sounded right, and jail is urgent.',ok:false,mis:'urgency-overrides-verify'},
      {label:'Wire it but tell Mom afterward — secrecy was just embarrassment.',ok:false},
      {label:'Ask the caller for the jail\u2019s name and wire the jail directly.',ok:false,mis:'their-number-verifies'}
    ]),
    hint:'"Don\u2019t tell Mom" — who benefits from that?',
    good:'Called the real number: grandchild is at home, confused. The secrecy request was the lock on the scam\u2019s door.',
    bad:'"Almost right" is what voice fear plus a bad connection sounds like. Almost-right has emptied many savings accounts.',
    why:'Secrecy requests are a verification blockade. Break the blockade first — call the known people — then decide.'
  };
}},
{id:'scams-decide-04',verb:'decide',part:5,tier:'independent',skill:'scams',
gen:(v)=>{
  const person=v.person();
  return {
    q:`An email "from the landlord": "New account for rent — wire this month\u2019s $700 here." The email looks right, but ${person} never got notice of any change. What is the call?`,
    choices:v.shuffle([
      {label:'Do not wire — contact the landlord through the known number/office to confirm any account change.',ok:true},
      {label:'Wire it — the email looks exactly like the landlord\u2019s.',ok:false,mis:'unverified-source'},
      {label:'Reply to the email asking "is this really you?"',ok:false,mis:'their-number-verifies'},
      {label:'Wire half now, half after they confirm by email.',ok:false,mis:'unverified-source'}
    ]),
    hint:'The email is the claim. Where is the verification?',
    good:'Called the office: no account change, email was spoofed. The $700 stayed put because verification used a separate channel.',
    bad:'Replying "is this you?" to a scammer gets a reassuring "yes." The channel is compromised — its answers are too.',
    why:'Account-change requests must be verified through a pre-known channel. The message announcing the change can never verify itself.'
  };
}},
{id:'scams-decide-05',verb:'decide',part:8,tier:'stretch',skill:'scams',
gen:(v)=>{
  const person=v.person();
  return {
    q:`New situation: ${person} lands a "remote job." Day one, a $2,500 check arrives for "home-office equipment" — buy what you need, forward the leftover $1,200 to the "supplier." It feels professional: offer letter, portal, manager on chat. What is the call?`,
    choices:v.shuffle([
      {label:'Do not forward a dollar — real employers never route equipment money through new hires; the check will bounce.',ok:true},
      {label:'Forward the $1,200 — the offer letter and portal prove it is real.',ok:false,mis:'unverified-source'},
      {label:'Cash the check, buy the equipment, keep the rest — free gear.',ok:false,mis:'borrow-to-spend'},
      {label:'Forward half now to show good faith, half after the check clears.',ok:false,mis:'guess-is-good-enough'}
    ]),
    hint:'Strip the costumes (letter, portal, chat). What is the money move?',
    good:'The costumes are cheap to fake; the money move is the tell. The $2,500 bounces in days; the $1,200 forwarded is real money from your account.',
    bad:'"Clears" initially means nothing — fake checks bounce after the forwarded funds are gone. The routine sees through the production design.',
    why:'Transfer test: any "job" whose core task is moving money through YOUR account fails, no matter how professional the staging.'
  };
}},
{id:'scams-decide-06',verb:'decide',part:8,tier:'stretch',skill:'scams',
gen:(v)=>{
  const person=v.person(), place=v.place();
  return {
    q:`New situation: the parking meter at ${place} has a neat QR sticker: "Scan to pay — avoid a ticket!" ${person} is in a hurry. What is the call?`,
    choices:v.shuffle([
      {label:'Do not scan — use the official parking app (or the meter itself); stickers are trivially faked.',ok:true},
      {label:'Scan it — it is printed neatly and says "official."',ok:false,mis:'unverified-source'},
      {label:'Scan it but only pay a small amount to test.',ok:false,mis:'guess-is-good-enough'},
      {label:'Scan it — QR codes cannot be faked.',ok:false,mis:'unverified-source'}
    ]),
    hint:'Who put the sticker there? You do not know. So?',
    good:'Opened the official app: no such QR program exists. The sticker led to a lookalike payment page harvesting cards.',
    bad:'"Test" payments still hand the card number to the page. There is no safe amount to send a scammer.',
    why:'Transfer test: unknown QR in the wild = unverified source. The routine says use YOUR known path (official app), not theirs.'
  };
}},
{id:'scams-decide-07',verb:'decide',part:8,tier:'stretch',skill:'scams',
gen:(v)=>{
  const person=v.person();
  return {
    q:`New situation: a call from "Mom\u2019s" voice — cloned by AI — panics: "I\u2019m hurt, wire $1,000 to this clinic NOW." It sounds exactly like her. What is the call?`,
    choices:v.shuffle([
      {label:'Do not wire — hang up, call Mom\u2019s real number, and use the family code word; AI can clone any voice.',ok:true},
      {label:'Wire it — it sounds exactly like her, and that is proof.',ok:false,mis:'urgency-overrides-verify'},
      {label:'Ask the voice for personal details to confirm identity.',ok:false,mis:'hearsay-number'},
      {label:'Wire half — the voice is convincing but the amount is big.',ok:false,mis:'guess-is-good-enough'}
    ]),
    hint:'Voice is now a costume. What cannot be cloned in a panic call?',
    good:'Called her real number: she is fine, at home. The family code word — set up in advance — would have exposed the clone in seconds.',
    bad:'"Sounds like her" is no longer evidence. Cloned voices pass every ear test — that is the whole threat.',
    why:'Transfer test: when a familiar voice demands urgent money, identity must be verified by a pre-shared secret (code word) plus a callback — never by the voice itself.'
  };
}},
{id:'scams-decide-08',verb:'decide',part:8,tier:'stretch',skill:'scams',
gen:(v)=>{
  const person=v.person();
  return {
    q:`New situation: text — "TOLL ROAD: you owe $12.50, pay in 24h or face a $50 fine: [link]." ${person} did drive a toll road last month. What is the call?`,
    choices:v.shuffle([
      {label:'Do not tap — go to the toll authority\u2019s official site (typed yourself) and check the account there.',ok:true},
      {label:'Tap and pay — $12.50 is small and they knew about the toll road.',ok:false,mis:'unverified-source'},
      {label:'Tap the link but do not enter card details — just look.',ok:false,mis:'unverified-source'},
      {label:'Reply asking for proof of the toll.',ok:false,mis:'their-number-verifies'}
    ]),
    hint:'Plausible details are cheap. What is the verification path?',
    good:'Official site: no balance due. The text was smishing — the "knew about the toll road" detail was a lucky guess blasted to thousands.',
    bad:'"Just looking" still loads their page, and the page\u2019s job is harvesting. Curiosity clicks are the product.',
    why:'Transfer test: plausible context does not verify a sender. The routine is unchanged — your typed path, not their link.'
  };
}},

/* ================= scams · spot (6) ================= */
{id:'scams-spot-01',verb:'spot',part:6,tier:'independent',skill:'scams',
gen:(v)=>{
  const person=v.person();
  return {
    scenario:`<p>${person} got the "shutoff in 30 minutes" call, paid $150 in gift cards to "stop it," and THEN called the utility — which confirmed it was a scam and no shutoff was ever scheduled.</p>`,
    q:'What is the mistake here?',
    choices:v.shuffle([
      {label:'The order was backwards — verification must happen BEFORE any payment, not after.',ok:true},
      {label:'The mistake was the amount; $150 was too much for a first payment.',ok:false,mis:'fee-face-value'},
      {label:'They should have paid by wire instead — faster to reverse.',ok:false,mis:'unverified-source'},
      {label:'The mistake was calling the utility at all.',ok:false}
    ]),
    hint:'Verify, then pay. Or pay, then verify?',
    good:'"Pay then verify" guarantees the scammer gets paid during the only window that matters. Verification after payment is an autopsy.',
    bad:'The amount was irrelevant — $15 would be gone just as permanently.',
    why:'Critique the sequence: verification is only useful before money moves. After is just documentation of the loss.'
  };
}},
{id:'scams-spot-02',verb:'spot',part:6,tier:'independent',skill:'scams',
gen:(v)=>{
  const person=v.person();
  return {
    scenario:`<p>${person} got suspicious, hung up — then called back the number the "agent" had given "for your convenience." A friendly "supervisor" confirmed the $800 debt.</p>`,
    q:'What is the mistake here?',
    choices:v.shuffle([
      {label:'They verified through the scammer\u2019s own number — the "supervisor" was the scam\u2019s second act.',ok:true},
      {label:'The mistake was hanging up first; that was rude.',ok:false},
      {label:'They should have asked for a different supervisor.',ok:false,mis:'their-number-verifies'},
      {label:'The mistake was the $800 figure; real debts are rounder.',ok:false,mis:'guess-is-good-enough'}
    ]),
    hint:'Who chose the callback number?',
    good:'Hanging up was perfect — then they dialed right back into the trap. Verification must use YOUR known number, never theirs.',
    bad:'A scammer\u2019s "supervisor" is just a scammer with a deeper voice.',
    why:'Critique the channel: a compromised source cannot verify itself. The callback number is part of the scam infrastructure.'
  };
}},
{id:'scams-spot-03',verb:'spot',part:6,tier:'independent',skill:'scams',
gen:(v)=>{
  const person=v.person();
  return {
    scenario:`<p>${person} trusted the call because caller ID showed the bank\u2019s real number — and shared a one-time code with the "fraud department." $2,100 left the account within the hour.</p>`,
    q:'What is the mistake here?',
    choices:v.shuffle([
      {label:'Two mistakes stacked: trusting spoofable caller ID, then sharing a one-time code no real rep ever asks for.',ok:true},
      {label:'The mistake was answering the phone at all.',ok:false},
      {label:'One-time codes are safe to share with fraud departments.',ok:false,mis:'their-number-verifies'},
      {label:'The mistake was having $2,100 in the account.',ok:false}
    ]),
    hint:'Two failures. Name both.',
    good:'Caller ID is a label (spoofable); one-time codes are keys (never shared). Either mistake alone could cost the account — together they guaranteed it.',
    bad:'"Fraud department" asking for your code is like a locksmith asking for your house keys permanently.',
    why:'Critique layered failures: spoofed identity PLUS shared credential. Real reps never ask for codes — that rule alone stops this scam.'
  };
}},
{id:'scams-spot-04',verb:'spot',part:6,tier:'independent',skill:'scams',
gen:(v)=>{
  const person=v.person();
  return {
    scenario:`<p>A "bank rep" on the phone asked ${person} to read back the 6-digit code that just arrived by text "to verify your identity." ${person} complied.</p>`,
    q:'What is the mistake here?',
    choices:v.shuffle([
      {label:'One-time codes verify YOU to the system — reading one to a caller hands them your identity.',ok:true},
      {label:'The mistake was the 6 digits; 4-digit codes are safe to share.',ok:false,mis:'guess-is-good-enough'},
      {label:'There is no mistake — reps need codes to help you.',ok:false,mis:'their-number-verifies'},
      {label:'The mistake was not writing the code down first.',ok:false}
    ]),
    hint:'Who is the code for?',
    good:'The code was the bank asking "is this really you?" — and the answer was handed to a stranger. The account was "verified" straight into the scammer\u2019s hands.',
    bad:'No legitimate rep, process, or emergency ever needs your one-time code. That sentence has no exceptions.',
    why:'Critique the credential flow: codes go INTO the official app/site, never OUT to a voice on the phone.'
  };
}},
{id:'scams-spot-05',verb:'spot',part:6,tier:'independent',skill:'scams',
gen:(v)=>{
  const person=v.person();
  return {
    scenario:`<p>${person} received a text about "suspicious activity," tapped the link "just to see," and entered login details on the page that loaded. The real account was drained that night.</p>`,
    q:'What is the mistake here?',
    choices:v.shuffle([
      {label:'Tapping the unverified link and entering credentials — "just looking" still handed over the keys.',ok:true},
      {label:'The mistake was having a bank account with online access.',ok:false},
      {label:'They should have entered a fake password to test the page.',ok:false,mis:'unverified-source'},
      {label:'The mistake was not tapping faster; speed beats phishing.',ok:false}
    ]),
    hint:'What did the page need to win?',
    good:'One tap + one login = full account access. "Just looking" is the phishing page\u2019s favorite phrase.',
    bad:'Fake passwords still confirm the link is live and the victim is engaged — and typos happen.',
    why:'Critique the click: unsolicited links are untrusted by default. Credentials only ever go into paths you chose yourself.'
  };
}},
{id:'scams-spot-06',verb:'spot',part:6,tier:'independent',skill:'scams',
gen:(v)=>{
  const person=v.person();
  return {
    scenario:`<p>The caller insisted: "Do NOT tell anyone — they\u2019ll delay the payment and you\u2019ll be arrested." ${person} obeyed, told nobody, and wired $1,200.</p>`,
    q:'What is the mistake here?',
    choices:v.shuffle([
      {label:'Obeying the secrecy order — it existed to block the exact verification that would have exposed the scam.',ok:true},
      {label:'The mistake was the $1,200 amount; smaller wires are safer.',ok:false,mis:'fee-face-value'},
      {label:'They should have told exactly one person, not zero.',ok:false,mis:'guess-is-good-enough'},
      {label:'There is no mistake — privacy is important in legal matters.',ok:false}
    ]),
    hint:'Who benefits from your silence?',
    good:'Every person told is a chance the scam dies. The secrecy order was not privacy — it was insulation for the lie.',
    bad:'Real legal matters do not require silence from family; scams require silence from everyone.',
    why:'Critique secrecy demands: legitimate urgency survives witnesses. Scam urgency depends on isolation.'
  };
}},

/* ================= scams · compare (6) ================= */
{id:'scams-compare-01',verb:'compare',part:6,tier:'independent',skill:'scams',
gen:(v)=>{
  const person=v.person();
  return {
    context:`<p>Threatening call about a $180 bill.</p><p><b>Option A:</b> Pay now to make the threat stop.</p><p><b>Option B:</b> Hang up, verify through the bill\u2019s number, then pay only if it is real.</p>`,
    q:'Which option actually protects the money?',
    choices:v.shuffle([
      {label:'Option B — it pays real bills and starves fake ones.',ok:true},
      {label:'Option A — paying fast ends the stress fastest.',ok:false,mis:'urgency-overrides-verify'},
      {label:'Both protect equally — the bill gets paid either way.',ok:false},
      {label:'Option A — hanging up on bill collectors creates penalties.',ok:false,mis:'their-number-verifies'}
    ]),
    hint:'Which option can tell a real bill from a fake one?',
    good:'Option B pays the $180 IF it is owed — to the real company. Option A pays $180 to whoever shouted loudest.',
    bad:'"Ends the stress" is the product being sold. The stress is manufactured; the payment is real.',
    why:'Compare responses by what they verify before paying. Payment without verification is a donation to pressure.'
  };
}},
{id:'scams-compare-02',verb:'compare',part:6,tier:'independent',skill:'scams',
gen:(v)=>{
  const person=v.person();
  return {
    context:`<p>${person} wants to confirm a scary account alert.</p><p><b>Option A:</b> Call the number the texter provided.</p><p><b>Option B:</b> Call the number on the monthly statement.</p>`,
    q:'Which callback actually verifies anything?',
    choices:v.shuffle([
      {label:'Option B — the statement\u2019s number predates the scare and belongs to the real company.',ok:true},
      {label:'Option A — it is faster, and speed matters in fraud cases.',ok:false,mis:'their-number-verifies'},
      {label:'Both — any callback shows due diligence.',ok:false},
      {label:'Option A — the texter knows which department handles this.',ok:false,mis:'their-number-verifies'}
    ]),
    hint:'Who chose each number, and when?',
    good:'The statement number was printed months ago by the real company. The texter\u2019s number was chosen minutes ago by the person scaring you.',
    bad:'"Due diligence" through the scammer\u2019s number is just a longer conversation with the scammer.',
    why:'Compare verification channels by provenance: pre-known beats provided, every time.'
  };
}},
{id:'scams-compare-03',verb:'compare',part:6,tier:'independent',skill:'scams',
gen:(v)=>{
  const person=v.person();
  return {
    context:`<p>A stranger pressures ${person} to pay $200.</p><p><b>Option A:</b> Pay with gift cards.</p><p><b>Option B:</b> Pay with a credit card.</p>`,
    q:'If forced to rank them, which is worse — and why does the ranking matter?',
    choices:v.shuffle([
      {label:'Option A — gift cards are irreversible; credit cards have dispute processes.',ok:true},
      {label:'Option B — credit cards create debt, which is worse than losing cash.',ok:false,mis:'borrow-to-spend'},
      {label:'They are equal — $200 lost is $200 lost.',ok:false,mis:'fee-face-value'},
      {label:'Neither matters — pressure voids all payments legally.',ok:false,mis:'guess-is-good-enough'}
    ]),
    hint:'Which payment can be taken back?',
    good:'Gift-card codes: gone forever. Credit-card charge: disputable, reversible, traceable. The ranking matters because scammers demand the irreversible ones.',
    bad:'"$200 lost is $200 lost" ignores recovery. Reversibility is the entire difference between a scare and a loss.',
    why:'Compare payment methods by reversibility. The demand for the irreversible method is itself the warning sign.'
  };
}},
{id:'scams-compare-04',verb:'compare',part:7,tier:'independent',skill:'scams',
gen:(v)=>{
  const person=v.person();
  return {
    context:`<p>Text: "Suspicious login — secure your account: [link]."</p><p><b>Option A:</b> Reply to the text asking if it is real.</p><p><b>Option B:</b> Open the bank app yourself and check for alerts.</p>`,
    q:'Which response actually checks the account?',
    choices:v.shuffle([
      {label:'Option B — the app you installed shows the real account state.',ok:true},
      {label:'Option A — replying verifies the sender.',ok:false,mis:'their-number-verifies'},
      {label:'Both — any response shows you are vigilant.',ok:false},
      {label:'Option A — it is faster than opening the app.',ok:false,mis:'urgency-overrides-verify'}
    ]),
    hint:'The text is the claim. Where is the independent check?',
    good:'The app is ground truth; the text is a stranger\u2019s claim about ground truth. Replying asks the claimant to verify itself.',
    bad:'"Vigilant" replies still travel through the scammer\u2019s channel. Vigilance needs the right channel.',
    why:'Compare by independence: your own path to the institution vs the stranger\u2019s path to you.'
  };
}},
{id:'scams-compare-05',verb:'compare',part:7,tier:'independent',skill:'scams',
gen:(v)=>{
  const person=v.person();
  return {
    context:`<p>"Do not tell anyone about this payment."</p><p><b>Option A:</b> Keep it secret as instructed.</p><p><b>Option B:</b> Tell a trusted person before paying.</p>`,
    q:'Which option keeps the money safer?',
    choices:v.shuffle([
      {label:'Option B — a second brain spots what panic hides; sunlight kills scams.',ok:true},
      {label:'Option A — privacy prevents interference with urgent matters.',ok:false},
      {label:'Both are equal — other people cannot verify payments.',ok:false,mis:'hearsay-number'},
      {label:'Option A — telling people spreads the panic.',ok:false}
    ]),
    hint:'Who benefits from each option?',
    good:'One calm listener breaks the urgency spell. Every exposed scam dies; every secret one gets paid.',
    bad:'"Privacy" here is not discretion — it is isolation engineered by the person taking the money.',
    why:'Compare by who the secrecy serves. Legitimate processes survive witnesses; scams require the opposite.'
  };
}},
{id:'scams-compare-06',verb:'compare',part:7,tier:'independent',skill:'scams',
gen:(v)=>{
  const person=v.person();
  return {
    context:`<p>A familiar voice demands an urgent wire.</p><p><b>Option A:</b> Trust the voice — it sounds exactly right.</p><p><b>Option B:</b> Ask for the family code word, then call back the known number.</p>`,
    q:'Which actually confirms identity?',
    choices:v.shuffle([
      {label:'Option B — a pre-shared secret plus a callback cannot be faked by a voice clone.',ok:true},
      {label:'Option A — nobody can perfectly imitate a voice.',ok:false,mis:'unverified-source'},
      {label:'Both — voice plus a few questions is thorough.',ok:false,mis:'hearsay-number'},
      {label:'Option A — code words are paranoid and insulting.',ok:false}
    ]),
    hint:'AI clones voices now. What cannot be cloned on the spot?',
    good:'The code word was set months ago in calm; the clone cannot know it. The callback reaches the real person.',
    bad:'"A few questions" — mother\u2019s maiden name, pet\u2019s name — are all public or breachable. Only the secret secret works.',
    why:'Compare identity proofs by fakability: voice (clonable) vs pre-shared secret + callback (not clonable on demand).'
  };
}},

/* ================= scams · predict (6) ================= */
{id:'scams-predict-01',verb:'predict',part:7,tier:'independent',skill:'scams',
gen:(v)=>{
  const person=v.person();
  return {
    q:`${person} reads the $150 in gift-card codes to the "utility agent" over the phone. What happens next?`,
    choices:v.shuffle([
      {label:'The $150 is gone within minutes — codes are spent instantly and cannot be recovered.',ok:true},
      {label:'The utility credits the $150 to the account once the codes are verified.',ok:false,mis:'urgency-overrides-verify'},
      {label:'The codes can be canceled by calling the gift-card company within 24 hours.',ok:false,mis:'guess-is-good-enough'},
      {label:'The agent sends a receipt and the shutoff is canceled.',ok:false}
    ]),
    hint:'Gift-card codes are cash. Spoken cash.',
    good:'Seconds after the codes are read, they are redeemed or resold. There is no "undo" button on a spoken code.',
    bad:'Gift-card companies cannot unspend a redeemed code. "Within 24 hours" is a fantasy.',
    why:'Predict the irreversibility: sharing a code = handing over cash to a stranger with no return address.'
  };
}},
{id:'scams-predict-02',verb:'predict',part:7,tier:'independent',skill:'scams',
gen:(v)=>{
  const person=v.person();
  return {
    q:`${person} reads the 6-digit texted code to the "bank rep." What does the scammer do with it in the next five minutes?`,
    choices:v.shuffle([
      {label:'Uses it to pass the bank\u2019s verification and take over the account — password resets, transfers, the works.',ok:true},
      {label:'Files it away — codes are only useful to the person who received the text.',ok:false,mis:'their-number-verifies'},
      {label:'Nothing — codes expire before anyone can use them.',ok:false,mis:'guess-is-good-enough'},
      {label:'Reports it to the real fraud department as a courtesy.',ok:false}
    ]),
    hint:'The code is a key. Who just got the key?',
    good:'The code completes THEIR login as you. Five minutes is enough to reset the password and lock you out.',
    bad:'Codes do not check who reads them aloud — they just work, for whoever enters them first.',
    why:'Predict the credential flow: a shared one-time code becomes the scammer\u2019s one-time access to everything.'
  };
}},
{id:'scams-predict-03',verb:'predict',part:7,tier:'independent',skill:'scams',
gen:(v)=>{
  const person=v.person();
  return {
    q:`${person} deposits the "employer\u2019s" $2,500 check and forwards $1,200 to the "supplier" the same day. What happens when the check bounces a week later?`,
    choices:v.shuffle([
      {label:'The bank reverses the $2,500 — and ${person} owes the $1,200 forwarded plus fees, from their own money.',ok:true},
      {label:'The employer covers it — their check, their problem.',ok:false,mis:'unverified-source'},
      {label:'The bank splits the loss — $600 each.',ok:false,mis:'guess-is-good-enough'},
      {label:'Nothing — deposited checks are final after 24 hours.',ok:false}
    ]),
    hint:'Whose account did the $1,200 leave?',
    good:'The $2,500 was never real; the $1,200 was. The reversal takes back the phantom and leaves the real loss.',
    bad:'"Deposited = final" confuses availability with validity. Banks can reverse fake deposits days later.',
    why:'Predict the reversal: fake inbound, real outbound = you hold the loss. Speed of forwarding is the scammer\u2019s whole plan.'
  };
}},
{id:'scams-predict-04',verb:'predict',part:8,tier:'stretch',skill:'scams',
gen:(v)=>{
  const person=v.person();
  return {
    q:`${person} taps the "toll unpaid" link and enters card details to pay $12.50. It was smishing. What happens in the coming weeks?`,
    choices:v.shuffle([
      {label:'The card is used for growing fraudulent charges — the $12.50 was just the harvest.',ok:true},
      {label:'Nothing — $12.50 is too small for criminals to bother with.',ok:false,mis:'fee-face-value'},
      {label:'The toll authority eventually credits it back automatically.',ok:false,mis:'unverified-source'},
      {label:'The page was legitimate; the toll gets paid normally.',ok:false,mis:'unverified-source'}
    ]),
    hint:'What did the page actually collect?',
    good:'The card number, expiry, CVV — and possibly the phone\u2019s trust. The $12.50 charge was the proof the card works; bigger ones follow.',
    bad:'Criminals automate everything — "too small to bother" is not a concept in their business model.',
    why:'Predict past the first charge: phishing harvests credentials, and credentials are monetized in escalating amounts.'
  };
}},
{id:'scams-predict-05',verb:'predict',part:8,tier:'stretch',skill:'scams',
gen:(v)=>{
  const person=v.person(), place=v.place();
  return {
    q:`${person} scans the QR sticker on the ${place} parking meter and "pays" $8. What are the two likely outcomes?`,
    choices:v.shuffle([
      {label:'The $8 goes to a scammer — AND the real meter is unpaid, so a ticket may follow.',ok:true},
      {label:'The $8 pays the meter normally — stickers are official.',ok:false,mis:'unverified-source'},
      {label:'The phone gets a virus that disables the camera.',ok:false,mis:'guess-is-good-enough'},
      {label:'Nothing — $8 QR payments are always legitimate.',ok:false}
    ]),
    hint:'Two victims: the wallet and the parking session.',
    good:'Double loss: money to the scammer, ticket from the city. The sticker solved neither problem — it created both.',
    bad:'"Official-looking" is a design choice, not a credential. Stickers have no authority.',
    why:'Predict both channels: the payment went to the wrong party, and the legitimate obligation remains unpaid.'
  };
}},
{id:'scams-predict-06',verb:'predict',part:8,tier:'stretch',skill:'scams',
gen:(v)=>{
  const person=v.person();
  return {
    q:`${person} wires $900 "bail" for the "grandchild" and obeys the "tell no one" order for two days. What happens when the family finally talks?`,
    choices:v.shuffle([
      {label:'The grandchild was never in jail — the $900 wire is unrecoverable, and the secrecy bought the scammers a two-day head start.',ok:true},
      {label:'The jail refunds the bail once the mix-up is discovered.',ok:false,mis:'guess-is-good-enough'},
      {label:'The wire can be reversed within a week by the bank.',ok:false,mis:'unverified-source'},
      {label:'The family covers the loss, so nothing is really lost.',ok:false}
    ]),
    hint:'Wires + secrecy + two days. What survives that?',
    good:'Wires clear fast and reverse almost never. The two silent days were the scammer\u2019s insurance policy.',
    bad:'"The bank reverses wires within a week" is the hope the scam counts on. It does not.',
    why:'Predict the compounding: irreversible payment × enforced silence × time = maximum loss. Breaking any one factor early changes the outcome.'
  };
}},

/* ================= scams · build (5) ================= */
{id:'scams-build-01',verb:'build',part:7,tier:'independent',skill:'scams',
gen:(v)=>{
  const person=v.person();
  const total=60;
  return {
    h:'Build it: your first hour after a scam attempt',
    body:`<p>${person} just hung up on a suspicious call. They have ${total} minutes before the trail goes cold. Split them: verify with the real company, secure accounts, report it, warn family.</p>`,
    totalDollars:total,
    buckets:[{id:'verify',label:'Verify with real company'},{id:'secure',label:'Secure accounts'},{id:'report',label:'Report it'},{id:'warn',label:'Warn family'}],
    targets:{verify:25,secure:15,report:10,warn:10},
    hint:'Verify first — everything else depends on knowing what is real. (Minutes, not dollars, this time.)',
    good:'25 to verify through known numbers, 15 to lock accounts, 10 to report, 10 to warn family. One hour converts panic into a plan.',
    bad:'Spending the hour "thinking about it" lets the scammer call back — or call your family next.',
    why:'A constructed routine beats adrenaline: verify, secure, report, warn — in that order, before the trail cools.'
  };
}},
{id:'scams-build-02',verb:'build',part:7,tier:'independent',skill:'scams',
gen:(v)=>{
  const person=v.person();
  const total=30;
  return {
    h:'Build it: the 30-minute pressure routine',
    body:`<p>${person} is being pressured RIGHT NOW. Build the ${total}-minute routine that defeats urgency: stop, find the real number, call and verify, then decide calmly.</p>`,
    totalDollars:total,
    buckets:[{id:'stop',label:'Stop & breathe'},{id:'find-number',label:'Find real number'},{id:'call-verify',label:'Call & verify'},{id:'decide',label:'Decide calmly'}],
    targets:{stop:5,'find-number':10,'call-verify':10,decide:5},
    hint:'The biggest slice goes to verification — that is the step pressure tries to skip. (Minutes.)',
    good:'5 to break the spell, 10 to find the real number, 10 to verify, 5 to decide with a clear head. Urgency cannot survive this routine.',
    bad:'Skipping "stop" means deciding with adrenaline. Adrenaline works for the scammer.',
    why:'Constructing the routine in advance means pressure meets a plan, not a panic. The pause is the weapon.'
  };
}},
{id:'scams-build-03',verb:'build',part:7,tier:'independent',skill:'scams',
gen:(v)=>{
  const person=v.person();
  const total=10;
  return {
    h:'Build it: the 10-minute pause plan',
    body:`<p>${person} has ${total} minutes before a "deadline." Split them: hang up, slow down, verify.</p>`,
    totalDollars:total,
    buckets:[{id:'hang-up',label:'Hang up'},{id:'slow-down',label:'Slow down'},{id:'verify',label:'Verify'}],
    targets:{'hang-up':2,'slow-down':3,verify:5},
    hint:'Even 10 minutes kills a 20-minute "deadline." (Minutes.)',
    good:'2 to disconnect, 3 to breathe, 5 to check through a known number. The deadline was fake; the verification is real.',
    bad:'"No time to verify" is the scammer\u2019s sentence, not yours. Ten minutes is always available.',
    why:'The shortest effective routine: disconnect, decompress, verify. Three steps, ten minutes, scam-proof.'
  };
}},
{id:'scams-build-04',verb:'build',part:7,tier:'independent',skill:'scams',
gen:(v)=>{
  const person=v.person();
  const total=200;
  return {
    h:'Build it: the $200 scam-proofing kit',
    body:`<p>${person} has ${v.money(total)} to spend once on scam defenses: a call-blocker app, a password manager, a home safe for documents, and a printed contact list of real company numbers.</p>`,
    totalDollars:total,
    buckets:[{id:'call-blocker',label:'Call-blocker app'},{id:'password-manager',label:'Password manager'},{id:'home-safe',label:'Document safe'},{id:'contact-list',label:'Printed real numbers'}],
    targets:{'call-blocker':40,'password-manager':60,'home-safe':60,'contact-list':40},
    hint:'The printed real-number list is the verify routine in physical form — worth every dollar.',
    good:'$40 blocks the calls, $60 kills password reuse, $60 locks the documents, $40 puts real numbers in a drawer. Defense in depth for $200.',
    bad:'Spending it all on one gadget leaves the other three doors open. Scammers try every door.',
    why:'Scam defense is layered: fewer scam calls reach you, accounts resist takeover, documents stay private, verification numbers are always at hand.'
  };
}},
{id:'scams-build-05',verb:'build',part:7,tier:'independent',skill:'scams',
gen:(v)=>{
  const person=v.person();
  const total=120;
  return {
    h:'Build it: family protection weekend (2 hours)',
    body:`<p>${person} gets the family together for ${total} minutes: set a code word, list everyone\u2019s real numbers, practice scam scenarios, and secure the accounts.</p>`,
    totalDollars:total,
    buckets:[{id:'code-word',label:'Set code word'},{id:'real-numbers',label:'List real numbers'},{id:'practice',label:'Practice scenarios'},{id:'secure',label:'Secure accounts'}],
    targets:{'code-word':20,'real-numbers':30,practice:40,secure:30},
    hint:'Practice is the biggest slice — routines must be rehearsed to survive panic. (Minutes.)',
    good:'20 for the code word, 30 for the number list, 40 rehearsing the "shutoff call," 30 locking accounts. The family now shares one routine.',
    bad:'A code word nobody practiced is trivia. Rehearsal is what makes it work under pressure.',
    why:'Scam defense is a team sport: shared secrets, shared numbers, shared practice. Two hours buys years of protection.'
  };
}},

/* ================= scams · explain (5) ================= */
{id:'scams-explain-01',verb:'explain',part:8,tier:'stretch',skill:'scams',
gen:(v)=>({
  h:'Teach it back: the stop-and-verify routine',
  prompt:'Explain in your own words the full stop-and-verify routine — the exact steps to take when someone pressures you about money.',
  keyPoints:['STOP: end the contact — hang up, do not engage','VERIFY: contact the real company through a number YOU know (bill, app, official site)','Never verify through any number, link, or contact the pressurer supplied','Only then decide — calmly, with real information'],
  modelAnswer:'When pressured about money: first stop — hang up and break contact. Then verify independently through a contact method you already know is legitimate, like the number on a bill or the official app. Never use a number or link the pressurer gave you. Only after independent verification do you decide anything. Stop, verify through your own channel, then decide.',
  hint:'Stop → your channel → decide.'
})},
{id:'scams-explain-02',verb:'explain',part:8,tier:'stretch',skill:'scams',
gen:(v)=>({
  h:'Teach it back: why urgency works',
  prompt:'Explain in your own words why scammers always manufacture urgency — and why the routine\u2019s first step is to slow down.',
  keyPoints:['Urgency triggers panic, and panic shuts down careful thinking','Rushing prevents the one defense that works: independent verification','Deadlines ("30 minutes!") are engineered to block the verify step','Slowing down restores judgment — the pause is the counter-weapon'],
  modelAnswer:'Scammers manufacture urgency because panic disables the careful thinking needed to spot the scam — and a rushing victim never stops to verify. Every deadline is designed to make verification feel impossible. Deliberately slowing down restores judgment and reopens the verify step, which is exactly what the scammer fears.',
  hint:'What does rushing prevent?'
})},
{id:'scams-explain-03',verb:'explain',part:8,tier:'stretch',skill:'scams',
gen:(v)=>({
  h:'Teach it back: their number never verifies',
  prompt:'Explain in your own words why you must never verify through a number, link, or contact supplied by the person pressuring you.',
  keyPoints:['The pressurer chose that contact — it leads back to them','Callback numbers, links, and "supervisors" are part of the scam setup','Caller ID and sender names are easily faked','Verification only counts through a pre-known, independent channel'],
  modelAnswer:'Any number, link, or contact the pressurer supplies was chosen by the pressurer — calling it just reaches the scam\u2019s second act. Caller ID and sender names are trivially faked. Real verification must travel through a channel you knew before the scare: the number on a bill, the app you installed, the address you typed.',
  hint:'Who chose the channel?'
})},
{id:'scams-explain-04',verb:'explain',part:8,tier:'stretch',skill:'scams',
gen:(v)=>({
  h:'Teach it back: the routine vs a brand-new scam',
  prompt:'A scammer uses AI to clone your mom\u2019s voice and demands an urgent wire. Explain in your own words how the stop-and-verify routine still defeats it — even though you have never seen this scam before.',
  keyPoints:['The routine does not depend on recognizing the scam — only on the pressure pattern','Stop: hang up despite the familiar voice','Verify: call her real number + use the family code word','A pre-shared secret cannot be faked on the spot, even by AI'],
  modelAnswer:'The routine works on the pattern, not the costume: urgent money demand means stop, hang up, and verify through my own channel. I call Mom\u2019s real number and ask for our family code word — set in advance, unknowable to the clone. The scam is brand new; the defense is the same three steps, because pressure plus money always gets the same routine.',
  hint:'Pattern, not costume.'
})},
{id:'scams-explain-05',verb:'explain',part:8,tier:'stretch',skill:'scams',
gen:(v)=>({
  h:'Teach it back: after it happens',
  prompt:'Explain in your own words what to do if the money already went to a scammer — the recovery steps in order.',
  keyPoints:['Act fast: contact the bank/payment provider immediately — speed matters for reversals','Report the fraud: FTC (ReportFraud.ftc.gov) and local police','Tell people — secrecy only helps the scammer','Lock down: change passwords, watch accounts, warn family they may be targeted next'],
  modelAnswer:'If money went out: contact the bank or payment provider immediately — faster reports have better reversal odds. Then report to the FTC and police, tell trusted people what happened, and lock everything down: new passwords, account monitoring, and warning family that scammers often target victims\u2019 relatives next. Speed and sunlight are the recovery tools.',
  hint:'Fast + loud + locked down.'
})}
]
};
