// NWS variation bank: support — 50 confirmed templates per lesson.
// Lessons: future-needs (parts 1-4), benefits-lesson (parts 3-6), decision-routine (parts 5-8).
// Verb spread per lesson: choice 8, sort 6, decide 8, spot 6, compare 6, predict 6, build 5, explain 5.
// Correction (check-v28): ALL choice-family verbs (choice, decide, spot, compare, predict)
// carry EXACTLY 4 choices with exactly ONE ok:true.
export const BANK_SUPPORT = {
'future-needs': [
// ---- choice (8): part 1 x3 (recognize), part 3 x2 (guided buffer math), part 4 x3 (calculate) ----
{ id:'future-needs-choice-01', verb:'choice', part:1, tier:'independent', skill:'future-needs',
  gen:(v)=>{
    const person=v.person();
    const fee=v.money(Math.round(v.cents(120,220)));
    const repair=v.money(Math.round(v.cents(200,400)));
    return {
      q:`${person} lists four upcoming costs. Which one is a future cost ${person} can plan for ahead of time?`,
      choices:[
        {label:`Car registration renewal: ${fee}, due in three months`, ok:true},
        {label:`The phone screen cracked this morning: ${repair} repair`, ok:false, mis:'surprises-unplannable'},
        {label:`A surprise medical copay from last week\u2019s urgent-care visit`, ok:false, mis:'surprises-unplannable'},
        {label:`Coffee ${person} already bought this morning`, ok:false}],
      hint:'Which cost has a known date on the calendar?',
      good:`Right: the registration has a date and an amount. Predictable costs are plannable costs.`,
      bad:`A cracked screen and a surprise copay already happened. The plannable cost is the one with a date you can see coming.`,
      why:'Future money starts with the costs you can see on the calendar. If it has a date, you can build a pace for it.'};
  }},
{ id:'future-needs-choice-02', verb:'choice', part:1, tier:'independent', skill:'future-needs',
  gen:(v)=>{
    const person=v.person();
    const sub=v.money(Math.round(v.cents(60,140)));
    return {
      q:`${person} looks at the year ahead. Which of these shows up on a schedule?`,
      choices:[
        {label:`The ${sub} annual subscription that renews every October`, ok:true},
        {label:`A fender bender in a parking lot`, ok:false, mis:'surprises-unplannable'},
        {label:`A flash sale that ends tonight`, ok:false},
        {label:`A lottery ticket ${person} might buy`, ok:false}],
      hint:'One of these has happened before, on the same month, every year.',
      good:`Right: the annual renewal is on a schedule. Recurring costs are future costs wearing a calendar.`,
      bad:`A fender bender and a flash sale are surprises or temptations. The scheduled cost is the subscription that renews every October.`,
      why:'Costs that repeat on a schedule are not surprises. They are just future needs you have not saved for yet.'};
  }},
{ id:'future-needs-choice-03', verb:'choice', part:1, tier:'independent', skill:'future-needs',
  gen:(v)=>{
    const person=v.person();
    const books=v.money(Math.round(v.cents(120,320)));
    return {
      q:`${person} is starting college. Which is a future cost, not a current one?`,
      choices:[
        {label:`Textbooks next semester: about ${books}`, ok:true},
        {label:`This week\u2019s groceries`, ok:false},
        {label:`Last month\u2019s phone bill`, ok:false},
        {label:`The rent due this Friday`, ok:false}],
      hint:'Future cost means the money is not due yet.',
      good:`Right: next semester\u2019s textbooks are a future cost. You cannot spend the money yet, but you can start saving for it now.`,
      bad:`Groceries, the old phone bill, and Friday\u2019s rent are all now-costs. The future cost is the one that has not arrived yet.`,
      why:'Naming future costs early is the whole game: it turns a future panic into a small weekly pace.'};
  }},
{ id:'future-needs-choice-04', verb:'choice', part:3, tier:'guided', skill:'future-needs',
  gen:(v)=>{
    const person=v.person();
    const pair=v.pick([[600,15,40],[480,12,40],[900,30,30],[500,10,50]]);
    const target=pair[0], weekly=pair[1], weeks=pair[2];
    return {
      q:`${person} needs a $${target} emergency buffer. Saving $${weekly} a week, how many weeks until the buffer is full?`,
      choices:[
        {label:`${weeks} weeks ($${target} \u00f7 $${weekly})`, ok:true},
        {label:`${weeks+10} weeks \u2014 saving only counts every other week`, ok:false, mis:'close-enough'},
        {label:`About a year, no matter what the math says`, ok:false, mis:'close-enough'},
        {label:`${Math.round(weeks/2)} weeks \u2014 the fund grows twice as fast`, ok:false}],
      cue:'Buffer pace is a division: total \u00f7 weekly savings = weeks.',
      hint:'Divide the target by the weekly move.',
      good:`Right: $${target} \u00f7 $${weekly} = ${weeks} weeks. Buffer pace is just a division problem.`,
      bad:`Do the division: $${target} \u00f7 $${weekly} = ${weeks} weeks. No guessing, no magic growth.`,
      why:'Buffer pace = amount \u00f7 weekly savings. Once you can divide, you can plan for any future cost.'};
  }},
{ id:'future-needs-choice-05', verb:'choice', part:3, tier:'guided', skill:'future-needs',
  gen:(v)=>{
    const person=v.person();
    const weekly=v.pick([10,12,15,20]);
    const weeks=v.pick([13,26,52]);
    const total=weekly*weeks;
    return {
      q:`${person} moves $${weekly} a week into an emergency fund. After ${weeks} weeks, how much is in the fund?`,
      choices:[
        {label:`$${total} ($${weekly} \u00d7 ${weeks})`, ok:true},
        {label:`$${total+weekly} \u2014 close enough`, ok:false, mis:'close-enough'},
        {label:`$${Math.round(total/2)} \u2014 small savings shrink`, ok:false, mis:'small-saves-nothing'},
        {label:`$${total*2} \u2014 it doubles on its own`, ok:false}],
      cue:'This is multiplication, not magic: weekly move \u00d7 weeks.',
      hint:'Multiply the weekly move by the number of weeks.',
      good:`Right: $${weekly} \u00d7 ${weeks} = $${total}. Small moves stack into real money.`,
      bad:`Multiply: $${weekly} \u00d7 ${weeks} = $${total}. Money does not double or shrink on its own.`,
      why:'The buffer grows one multiplication at a time. Knowing the math is what makes $10 a week feel worth doing.'};
  }},
{ id:'future-needs-choice-06', verb:'choice', part:4, tier:'independent', skill:'future-needs',
  gen:(v)=>{
    const person=v.person();
    const pair=v.pick([[480,12,40],[720,24,30],[360,12,30],[560,14,40]]);
    const target=pair[0], weeks=pair[1], pace=pair[2];
    return {
      q:`${person} wants a $${target} buffer in ${weeks} weeks. What is the weekly pace?`,
      choices:[
        {label:`$${pace}/week ($${target} \u00f7 ${weeks})`, ok:true},
        {label:`$${pace+5}/week \u2014 round up to be safe`, ok:false, mis:'close-enough'},
        {label:`$${Math.round(target/weeks/2)}/week \u2014 half is fine`, ok:false},
        {label:`$${pace*2}/week \u2014 double it to finish early`, ok:false}],
      hint:'Amount \u00f7 weeks = weekly pace.',
      good:`Right: $${target} \u00f7 ${weeks} = $${pace}/week. Exact pace, exact target, exact date.`,
      bad:`Divide: $${target} \u00f7 ${weeks} = $${pace}/week. Rounding up changes the date; halving misses the target.`,
      why:'Buffer pace turns a scary total into a weekly number you can actually do.'};
  }},
{ id:'future-needs-choice-07', verb:'choice', part:4, tier:'independent', skill:'future-needs',
  gen:(v)=>{
    const person=v.person();
    const pair=v.pick([[780,26,30],[650,13,50],[420,14,30],[350,14,25]]);
    const target=pair[0], weeks=pair[1], pace=pair[2];
    return {
      q:`A $${target} car repair fund, fully built in ${weeks} weeks. What weekly pace gets ${person} there?`,
      choices:[
        {label:`$${pace}/week`, ok:true},
        {label:`$${pace-10}/week and hope for the best`, ok:false, mis:'optimistic-plan'},
        {label:`One $${target} lump sum \u201clater\u201d`, ok:false, mis:'surprises-unplannable'},
        {label:`$${Math.round(pace*1.5)}/week so it hurts`, ok:false}],
      hint:'Target divided by weeks. Nothing else.',
      good:`Right: $${target} \u00f7 ${weeks} = $${pace}/week. A pace you can keep beats a plan you cannot.`,
      bad:`The math is $${target} \u00f7 ${weeks} = $${pace}/week. \u201cLater\u201d is not a pace and hoping is not a plan.`,
      why:'Predictable costs deserve a pace. The fund is built before the repair, not wished for after it.'};
  }},
{ id:'future-needs-choice-08', verb:'choice', part:4, tier:'independent', skill:'future-needs',
  gen:(v)=>{
    const person=v.person();
    const weekly=v.pick([25,30,40,50]);
    const target=v.pick([600,750,900,1000]);
    const weeks=target/weekly;
    return {
      q:`${person} saves $${weekly}/week toward a $${target} buffer. How many weeks to finish?`,
      choices:[
        {label:`${weeks} weeks`, ok:true},
        {label:`${weeks-4} weeks \u2014 it finishes early`, ok:false, mis:'close-enough'},
        {label:`${weeks+8} weeks \u2014 savings barely count`, ok:false, mis:'small-saves-nothing'},
        {label:`It never finishes \u2014 small amounts do not add up`, ok:false, mis:'small-saves-nothing'}],
      hint:'Target \u00f7 weekly = weeks.',
      good:`Right: $${target} \u00f7 $${weekly} = ${weeks} weeks. The math is the whole story.`,
      bad:`$${target} \u00f7 $${weekly} = ${weeks} weeks. Small amounts absolutely add up \u2014 that is what division shows.`,
      why:'Every buffer has a finish date hiding in one division. Find it and the goal stops feeling infinite.'};
  }},
// ---- sort (6): part 2 — classify surprise vs predictable ----
{ id:'future-needs-sort-01', verb:'sort', part:2, tier:'independent', skill:'future-needs',
  gen:(v)=>({ h:'Sort it: surprise or predictable?',
    body:'<p>Put each cost where it belongs. Predictable costs can be planned for; surprises cannot be scheduled.</p>',
    buckets:['Predictable','Surprise'],
    items:v.shuffle([
      {label:'Oil change every 5,000 miles', a:'predictable', why:'It happens on a schedule.'},
      {label:'Car registration renewal', a:'predictable', why:'It has a date every year.'},
      {label:'A phone screen cracking', a:'surprise', why:'Nobody schedules a crack.'},
      {label:'An ER copay at 2 a.m.', a:'surprise', why:'Emergencies pick their own time.'},
      {label:'Holiday travel every December', a:'predictable', why:'December comes every year.'},
      {label:'A water heater dying', a:'surprise', why:'You know it will fail, not when.'},
      {label:'Haircuts every six weeks', a:'predictable', why:'Regular and roughly priced.'}]) })},
{ id:'future-needs-sort-02', verb:'sort', part:2, tier:'independent', skill:'future-needs',
  gen:(v)=>({ h:'Sort it: what is the emergency fund for?',
    body:'<p>The emergency fund has one job. Sort each use into what it is really for.</p>',
    buckets:['Fund job','Not fund job'],
    items:v.shuffle([
      {label:'A $300 car repair to get to work', a:'fund job', why:'Surprise cost that protects income.'},
      {label:'A surprise medical copay', a:'fund job', why:'True surprise, no time to save.'},
      {label:'Concert tickets on sale', a:'not fund job', why:'A want, not an emergency.'},
      {label:'A new phone because the old one is boring', a:'not fund job', why:'Boredom is not an emergency.'},
      {label:'Replacing a dead refrigerator', a:'fund job', why:'Surprise cost that hits daily life.'},
      {label:'A vacation deal that expires Friday', a:'not fund job', why:'Urgency from a sale is not an emergency.'},
      {label:'Emergency vet visit', a:'fund job', why:'Surprise cost, real need.'}]) })},
{ id:'future-needs-sort-03', verb:'sort', part:2, tier:'independent', skill:'future-needs',
  gen:(v)=>({ h:'Sort it: future need or current want?',
    body:'<p>Future needs deserve a savings pace. Current wants come from safe-to-spend money.</p>',
    buckets:['Future need','Current want'],
    items:v.shuffle([
      {label:'Textbooks for next semester', a:'future need', why:'Due later, price known roughly.'},
      {label:'An apartment deposit next summer', a:'future need', why:'Future date, real cost.'},
      {label:'New sneakers this weekend', a:'current want', why:'Now, and optional.'},
      {label:'A winter coat before November', a:'future need', why:'Seasonal and predictable.'},
      {label:'Takeout tonight', a:'current want', why:'Immediate and optional.'},
      {label:'Car insurance renewal in two months', a:'future need', why:'Dated and required.'},
      {label:'A streaming upgrade today', a:'current want', why:'Now, and optional.'}]) })},
{ id:'future-needs-sort-04', verb:'sort', part:2, tier:'independent', skill:'future-needs',
  gen:(v)=>({ h:'Sort it: plan it or accept it?',
    body:'<p>You plan for the category, not the exact event. Sort what planning can and cannot do.</p>',
    buckets:['Can plan for','Cannot schedule'],
    items:v.shuffle([
      {label:'Cars will need repairs', a:'can plan for', why:'The category is certain.'},
      {label:'Exactly which Tuesday the car breaks', a:'cannot schedule', why:'The timing is a surprise.'},
      {label:'Medical costs will happen', a:'can plan for', why:'Adults all face them.'},
      {label:'Which illness and when', a:'cannot schedule', why:'No calendar for that.'},
      {label:'Phones eventually die', a:'can plan for', why:'Every phone has a lifespan.'},
      {label:'Dropping it on concrete Thursday', a:'cannot schedule', why:'Accidents pick themselves.'},
      {label:'Birthday gifts every year', a:'can plan for', why:'Birthdays are on the calendar.'}]) })},
{ id:'future-needs-sort-05', verb:'sort', part:2, tier:'independent', skill:'future-needs',
  gen:(v)=>({ h:'Sort it: buffer math or wishful thinking?',
    body:'<p>Buffer math is amount \u00f7 weeks. Sort the real plans from the pretend ones.</p>',
    buckets:['Real pace','Wishful thinking'],
    items:v.shuffle([
      {label:'$500 \u00f7 10 weeks = $50/week', a:'real pace', why:'Amount, time, and pace all named.'},
      {label:'$300 \u00f7 15 weeks = $20/week', a:'real pace', why:'A pace you can actually run.'},
      {label:'\u201cI will save more soon\u201d', a:'wishful thinking', why:'No amount, no weeks, no pace.'},
      {label:'\u201c$1,000 by whenever\u201d', a:'wishful thinking', why:'No date means no plan.'},
      {label:'$720 \u00f7 24 weeks = $30/week', a:'real pace', why:'Exact math, exact finish.'},
      {label:'\u201cWhatever is left at month end\u201d', a:'wishful thinking', why:'Nothing is ever left by accident.'},
      {label:'$260 \u00f7 13 weeks = $20/week', a:'real pace', why:'Small, exact, doable.'}]) })},
{ id:'future-needs-sort-06', verb:'sort', part:2, tier:'independent', skill:'future-needs',
  gen:(v)=>({ h:'Sort it: which costs belong in a monthly pace?',
    body:'<p>Some costs repeat every month like clockwork. Others do not. Sort them.</p>',
    buckets:['Monthly pace','Not monthly'],
    items:v.shuffle([
      {label:'Phone bill', a:'monthly pace', why:'Same bill, every month.'},
      {label:'Bus pass', a:'monthly pace', why:'Bought every month.'},
      {label:'Annual car registration', a:'not monthly', why:'Once a year \u2014 needs its own pace.'},
      {label:'Streaming subscription', a:'monthly pace', why:'Charged monthly.'},
      {label:'Holiday gifts', a:'not monthly', why:'Seasonal \u2014 save across months.'},
      {label:'Gym membership', a:'monthly pace', why:'Monthly charge.'},
      {label:'Textbooks each semester', a:'not monthly', why:'Twice a year \u2014 its own pace.'}]) })},
// ---- decide (8): part 3 x4 guided, part 4 x4 ----
{ id:'future-needs-decide-01', verb:'decide', part:3, tier:'guided', skill:'future-needs',
  gen:(v)=>{
    const person=v.person();
    const repair=v.money(Math.round(v.cents(250,380)));
    const fund=v.money(Math.round(v.cents(400,550)));
    return {
      q:`${person} has a ${fund} emergency fund. The car needs a ${repair} repair to get to work tomorrow. What is the call?`,
      choices:[
        {label:`Pay the ${repair} from the fund \u2014 that is its whole job`, ok:true},
        {label:`Put the ${repair} on a credit card and keep the fund \u201cpure\u201d`, ok:false, mis:'fund-purity'},
        {label:`Skip the repair and risk missing work`, ok:false},
        {label:`Borrow ${repair} from a friend and leave the fund untouched`, ok:false, mis:'fund-purity'}],
      cue:'Ask: is this a surprise cost that protects income? If yes, the fund exists for exactly this.',
      hint:'What was the fund built for?',
      good:`Paid from the fund, ${person} still has a fund and no new debt. The plan worked exactly as designed.`,
      bad:`Keeping the fund \u201cpure\u201d while going into debt defeats the fund. It exists to be spent on real emergencies \u2014 then rebuilt.`,
      why:'An emergency fund is a tool, not a trophy. Using it on a true emergency is success, not failure.'};
  }},
{ id:'future-needs-decide-02', verb:'decide', part:3, tier:'guided', skill:'future-needs',
  gen:(v)=>{
    const person=v.person();
    const fee=v.money(Math.round(v.cents(150,210)));
    return {
      q:`${person}\u2019s car registration (${fee}) renews in 12 weeks. Nothing saved yet. What is the call?`,
      choices:[
        {label:`Start a pace now: ${fee} \u00f7 12 weeks, every week`, ok:true},
        {label:`Wait and deal with it in 12 weeks`, ok:false, mis:'surprises-unplannable'},
        {label:`Hope the fee goes down by then`, ok:false, mis:'optimistic-plan'},
        {label:`Skip it \u2014 registrations are optional`, ok:false}],
      cue:'It has a date and an amount. What does the routine say about costs like that?',
      hint:'Date + amount = pace.',
      good:`Twelve weeks of small moves and the fee is covered. No panic, no card, no late fees.`,
      bad:`Waiting turns a predictable ${fee} into a surprise ${fee} plus late fees. The date was on the calendar the whole time.`,
      why:'Predictable costs ignored become surprise costs. A pace now is always cheaper than panic later.'};
  }},
{ id:'future-needs-decide-03', verb:'decide', part:3, tier:'guided', skill:'future-needs',
  gen:(v)=>{
    const person=v.person();
    const repair=v.money(Math.round(v.cents(180,240)));
    const fund=v.money(Math.round(v.cents(120,170)));
    const rest=v.money(Math.round(v.cents(40,80)));
    return {
      q:`${person}\u2019s phone dies. Repair is ${repair}. The emergency fund has ${fund}. What is the call?`,
      choices:[
        {label:`Use the full ${fund} from the fund, cover the ${rest} from this week\u2019s safe-to-spend`, ok:true},
        {label:`Buy a brand-new $900 phone on credit instead`, ok:false, mis:'emergency-misuse'},
        {label:`Leave the fund alone and put the whole ${repair} on a card`, ok:false, mis:'fund-purity'},
        {label:`Go without a phone for a month to \u201cprotect\u201d the fund`, ok:false}],
      cue:'The fund covers what it can. The rest is a spending decision, not a crisis.',
      hint:'Fund first, then the smallest possible gap.',
      good:`The fund absorbs ${fund}, only ${rest} comes from spending money. Debt avoided, phone fixed, fund gets rebuilt next.`,
      bad:`A partial fund still beats a full credit card charge. Protecting the fund by going into debt is backwards.`,
      why:'The fund does not have to cover everything to be worth using. Every dollar it absorbs is a dollar that never becomes debt.'};
  }},
{ id:'future-needs-decide-04', verb:'decide', part:3, tier:'guided', skill:'future-needs',
  gen:(v)=>{
    const person=v.person();
    const weekly=v.money(v.pick([10,15,20]));
    return {
      q:`${person} spends ${weekly} a week on snacks and says \u201cthere is nothing left for a buffer.\u201d The buffer needs $10/week. What is the call?`,
      choices:[
        {label:`Trim snacks by $10/week and start the buffer \u2014 small moves count`, ok:true},
        {label:`Skip the buffer \u2014 $10/week is too small to matter`, ok:false, mis:'small-saves-nothing'},
        {label:`Feel guilty about the snacks but change nothing`, ok:false, mis:'guilt-is-budgeting'},
        {label:`Wait for a raise, then start the buffer big`, ok:false, mis:'surprises-unplannable'}],
      cue:'$10 a week for a year is a real number. Do the multiplication before deciding it is too small.',
      hint:'$10 \u00d7 52 = ?',
      good:`$10/week becomes $520 in a year. The buffer starts the week the decision is made, not the week money feels easy.`,
      bad:`Guilt is not a budget and waiting is not a plan. $10/week is $520/year \u2014 the only too-small move is the one never made.`,
      why:'\u201cToo small to matter\u201d is the most expensive sentence in personal finance. Small and steady beats big and someday.'};
  }},
{ id:'future-needs-decide-05', verb:'decide', part:4, tier:'independent', skill:'future-needs',
  gen:(v)=>{
    const person=v.person();
    const vet=v.money(Math.round(v.cents(350,480)));
    const fund=v.money(Math.round(v.cents(500,650)));
    return {
      q:`${person}\u2019s dog needs an emergency vet visit: ${vet}. The fund holds ${fund}. The vet offers a payment plan with a $40 fee. What is the call?`,
      choices:[
        {label:`Pay ${vet} from the fund, skip the fee, rebuild the fund after`, ok:true},
        {label:`Take the payment plan to \u201ckeep the fund intact\u201d`, ok:false, mis:'fund-purity'},
        {label:`Put it on a credit card for the points`, ok:false, mis:'emergency-misuse'},
        {label:`Wait a week to see if the dog improves`, ok:false}],
      hint:'Compare the true costs: fund money vs fund money + $40 fee vs card interest.',
      good:`Fund money costs $0 in fees. The payment plan costs $40 for the privilege of not using the fund. Use the fund.`,
      bad:`Paying a $40 fee to avoid using the emergency fund on an actual emergency is paying money to misunderstand the fund.`,
      why:'The fund\u2019s job is to make emergencies cheap. Any option that adds fees or interest to dodge the fund has it backwards.'};
  }},
{ id:'future-needs-decide-06', verb:'decide', part:4, tier:'independent', skill:'future-needs',
  gen:(v)=>{
    const person=v.person();
    const sub=v.money(Math.round(v.cents(80,120)));
    return {
      q:`${person}\u2019s ${sub} annual subscription renews next week. No money was set aside for it. What is the call?`,
      choices:[
        {label:`Pay it, then immediately start a ${sub} \u00f7 52 weekly pace for next year`, ok:true},
        {label:`Cancel it in anger and re-subscribe next month anyway`, ok:false},
        {label:`Pay it and change nothing \u2014 deal with it again next year`, ok:false, mis:'surprises-unplannable'},
        {label:`Borrow from the emergency fund to cover it`, ok:false, mis:'emergency-as-savings'}],
      hint:'The renewal will happen again. What should be different next time?',
      good:`This year\u2019s renewal is paid; next year\u2019s is already being paced. One surprise becomes zero surprises.`,
      bad:`Borrowing from the emergency fund for a predictable subscription confuses two different buckets. Pace the subscription separately.`,
      why:'Every predictable cost you pace once never surprises you again. The routine converts surprises into schedules.'};
  }},
{ id:'future-needs-decide-07', verb:'decide', part:4, tier:'independent', skill:'future-needs',
  gen:(v)=>{
    const person=v.person();
    const trip=v.money(Math.round(v.cents(300,420)));
    return {
      q:`${person} wants to visit family for the holidays: ${trip} for travel, 8 weeks away. Current travel savings: $0. What is the call?`,
      choices:[
        {label:`Start now: ${trip} \u00f7 8 weeks, every week, no skipping`, ok:true},
        {label:`Book it on a card now and \u201cfigure it out\u201d later`, ok:false, mis:'surprises-unplannable'},
        {label:`Wait 7 weeks, then panic-save the whole ${trip}`, ok:false},
        {label:`Take the money from the emergency fund and repay it \u201csomeday\u201d`, ok:false, mis:'fund-fungibility'}],
      hint:'Eight weeks is plenty \u2014 if the pace starts this week.',
      good:`Eight weeks of steady saving covers the trip with zero debt. Starting now is the entire trick.`,
      bad:`\u201cSomeday\u201d repayment from the emergency fund is how funds die. The trip is predictable \u2014 it gets its own pace.`,
      why:'Future costs with dates are the easiest wins in money: divide, start now, done.'};
  }},
{ id:'future-needs-decide-08', verb:'decide', part:4, tier:'independent', skill:'future-needs',
  gen:(v)=>{
    const person=v.person();
    const copay=v.money(Math.round(v.cents(120,180)));
    const shoes=v.money(Math.round(v.cents(100,140)));
    return {
      q:`${person} gets a surprise ${copay} medical copay the same week ${shoes} shoes go on sale. The emergency fund covers the copay. What is the call?`,
      choices:[
        {label:`Pay the copay from the fund; the shoes wait for safe-to-spend money`, ok:true},
        {label:`Buy the shoes now \u2014 the fund can cover the copay AND the shoes`, ok:false, mis:'emergency-misuse'},
        {label:`Put both on a credit card to \u201cprotect\u201d the fund`, ok:false, mis:'fund-purity'},
        {label:`Skip the copay bill and buy the shoes`, ok:false}],
      hint:'One of these is a fund job. The other is not.',
      good:`Copay from the fund: correct bucket. Shoes from safe-to-spend or not at all: correct bucket. Buckets stay clean.`,
      bad:`The fund covers emergencies, not sales. Mixing the shoes into the fund is exactly how emergency money disappears.`,
      why:'Two buckets, two jobs. The moment fund money pays for wants, the fund stops being a fund.'};
  }},
// ---- spot (6): part 4 — find the mistake ----
{ id:'future-needs-spot-01', verb:'spot', part:4, tier:'independent', skill:'future-needs',
  gen:(v)=>{
    const person=v.person();
    return {
      scenario:`<p>${person}\u2019s money plan this month:</p><ul><li>Paycheck: $900</li><li>Needs: $600</li><li>Emergency fund move: $0</li><li>Reason: \u201cYou cannot plan for surprises, so why bother\u201d</li></ul>`,
      q:'What is the mistake here?',
      choices:[
        {label:'Treating surprises as unplannable \u2014 the category is predictable even when the timing is not', ok:true},
        {label:'The paycheck is too small to save from', ok:false, mis:'small-saves-nothing'},
        {label:'Needs should come after the emergency fund', ok:false},
        {label:'There is no mistake \u2014 surprises really cannot be planned for', ok:false, mis:'surprises-unplannable'}],
      hint:'Can you predict WHEN? Can you predict WHETHER?',
      good:`Right: ${person} confuses timing with category. Nobody knows which Tuesday \u2014 everybody knows something will break.`,
      bad:`The mistake is the belief itself: \u201csurprises can\u2019t be planned for.\u201d The category is certain, so the fund is plannable.`,
      why:'Emergencies are predictable in general and surprising in particular. Plan for the category.'};
  }},
{ id:'future-needs-spot-02', verb:'spot', part:4, tier:'independent', skill:'future-needs',
  gen:(v)=>{
    const person=v.person();
    return {
      scenario:`<p>${person} saved a $400 emergency fund. Then:</p><ul><li>Concert tickets: $160 \u2014 paid from the emergency fund</li><li>New headphones: $90 \u2014 paid from the emergency fund</li><li>Car breaks down: $300 \u2014 fund has $150 left</li></ul>`,
      q:'What is the mistake here?',
      choices:[
        {label:'Spending emergency money on wants \u2014 concerts and headphones are not emergencies', ok:true},
        {label:'The fund was too small to begin with', ok:false},
        {label:'Saving $400 in the first place', ok:false, mis:'emergency-as-savings'},
        {label:'Not buying the concert tickets sooner', ok:false}],
      hint:'Which of these three costs was a true surprise?',
      good:'Right: the fund paid for two wants, so it failed at its one job when the real emergency arrived.',
      bad:'The size was fine \u2014 the spending was not. Wants drained the fund before the emergency ever showed up.',
      why:'An emergency fund spent on non-emergencies is just a savings account with a dramatic name.'};
  }},
{ id:'future-needs-spot-03', verb:'spot', part:4, tier:'independent', skill:'future-needs',
  gen:(v)=>{
    const person=v.person();
    return {
      scenario:`<p>${person}\u2019s \u201csmart\u201d emergency plan:</p><ul><li>$500 emergency fund \u2192 moved into a hot crypto coin</li><li>Plan: \u201cit will grow to $800 while I wait\u201d</li><li>Car repair needed Tuesday: coin is down 30%</li></ul>`,
      q:'What is the mistake here?',
      choices:[
        {label:'Investing emergency money \u2014 it must be there in full, on the worst day, not the best day', ok:true},
        {label:'Only putting in $500', ok:false, mis:'small-saves-nothing'},
        {label:'Not checking the coin price daily', ok:false},
        {label:'Fixing the car on a Tuesday', ok:false}],
      hint:'When do you need emergency money \u2014 on good days or bad days?',
      good:'Right: emergency money is needed exactly when markets are worst. Growth and safety are different jobs.',
      bad:'The amount was not the problem \u2014 the risk was. Emergency funds must be boring, liquid, and whole.',
      why:'Invest the long-term money. Park the emergency money. One job per dollar.'};
  }},
{ id:'future-needs-spot-04', verb:'spot', part:4, tier:'independent', skill:'future-needs',
  gen:(v)=>{
    const person=v.person();
    return {
      scenario:`<p>${person}\u2019s fund history:</p><ul><li>Built a $450 emergency fund</li><li>Took $300 for a beach trip: \u201cI\u2019ll pay it back\u201d</li><li>Never paid it back</li><li>Phone dies: fund has $150</li></ul>`,
      q:'What is the mistake here?',
      choices:[
        {label:'Treating the fund as borrowable \u2014 \u201cI\u2019ll pay it back\u201d is how funds evaporate', ok:true},
        {label:'Going to the beach at all', ok:false},
        {label:'Building the fund too slowly', ok:false, mis:'small-saves-nothing'},
        {label:'Not having a second fund for trips', ok:false}],
      hint:'Did the payback happen?',
      good:'Right: borrowed fund money is spent fund money. The payback almost never comes.',
      bad:'The beach was not the mistake \u2014 raiding the fund for it was. Wants get their own savings pace.',
      why:'Fund money is not fungible with fun money. The wall between them is the whole point.'};
  }},
{ id:'future-needs-spot-05', verb:'spot', part:4, tier:'independent', skill:'future-needs',
  gen:(v)=>{
    const person=v.person();
    return {
      scenario:`<p>${person} every payday:</p><ul><li>Moves $0 to emergency savings</li><li>Says: \u201c$10 a week is nothing \u2014 why bother\u201d</li><li>Two years later: $0 saved, two card-funded \u201cemergencies\u201d</li></ul>`,
      q:'What is the mistake here?',
      choices:[
        {label:'Believing small savings do nothing \u2014 $10/week is $1,040 in two years', ok:true},
        {label:'Not earning more money', ok:false},
        {label:'Having emergencies at all', ok:false, mis:'surprises-unplannable'},
        {label:'There is no mistake \u2014 $10 really is nothing', ok:false, mis:'small-saves-nothing'}],
      hint:'Multiply $10 \u00d7 104 weeks.',
      good:'Right: $10/week \u00d7 104 weeks = $1,040. That covers both \u201cemergencies\u201d without the card debt.',
      bad:'$10 a week is not nothing \u2014 it is $520 a year. \u201cWhy bother\u201d cost two years and two rounds of interest.',
      why:'\u201cToo small to matter\u201d is the belief that keeps balances at zero. Math disagrees.'};
  }},
{ id:'future-needs-spot-06', verb:'spot', part:4, tier:'independent', skill:'future-needs',
  gen:(v)=>{
    const person=v.person();
    return {
      scenario:`<p>${person}\u2019s relationship with money:</p><ul><li>Feels guilty every time money is tight</li><li>Has never built an emergency fund</li><li>Says: \u201cI feel bad about it, so I\u2019m handling it\u201d</li></ul>`,
      q:'What is the mistake here?',
      choices:[
        {label:'Confusing guilt with a plan \u2014 feeling bad builds no fund', ok:true},
        {label:'Not feeling guilty enough', ok:false, mis:'guilt-is-budgeting'},
        {label:'Money being tight sometimes', ok:false},
        {label:'There is no mistake \u2014 guilt means it matters', ok:false, mis:'guilt-is-budgeting'}],
      hint:'What has the guilt produced so far?',
      good:'Right: two years of guilt, $0 saved. Feelings are not transfers \u2014 only the $10/week move builds the fund.',
      bad:'Guilt without action is just a mood. The fund gets built by a weekly move, not by feeling bad.',
      why:'Budgeting is behavior, not emotion. Convert the guilt into a pace and it finally does something.'};
  }},
// ---- compare (6): part 4 ----
{ id:'future-needs-compare-01', verb:'compare', part:4, tier:'independent', skill:'future-needs',
  gen:(v)=>{
    const person=v.person();
    return {
      context:'<p><b>Plan A:</b> $15/week into the buffer for 52 weeks.</p><p><b>Plan B:</b> $60/month into the buffer for 12 months.</p>',
      q:`Which plan builds a bigger buffer for ${person}?`,
      choices:[
        {label:'Plan A \u2014 $780 vs $720', ok:true},
        {label:'Plan B \u2014 monthly is more serious', ok:false},
        {label:'They are the same \u2014 $15 is basically $60', ok:false, mis:'close-enough'},
        {label:'Neither \u2014 both are too small to matter', ok:false, mis:'small-saves-nothing'}],
      hint:'Multiply both out.',
      good:'Right: $15 \u00d7 52 = $780 beats $60 \u00d7 12 = $720. Weekly beats monthly here \u2014 and the math proves it.',
      bad:'Do the multiplication: Plan A = $780, Plan B = $720. \u201cBasically the same\u201d costs $60.',
      why:'Compare plans with arithmetic, not vibes. Small frequency differences compound over a year.'};
  }},
{ id:'future-needs-compare-02', verb:'compare', part:4, tier:'independent', skill:'future-needs',
  gen:(v)=>{
    const person=v.person();
    return {
      context:'<p><b>Plan A:</b> Save $300 once, then stop.</p><p><b>Plan B:</b> Save $10/week, ongoing.</p>',
      q:`Which protects ${person} longer?`,
      choices:[
        {label:'Plan B \u2014 it refills after every emergency; Plan A drains once and is gone', ok:true},
        {label:'Plan A \u2014 $300 now beats $10 later', ok:false},
        {label:'They are equal after 30 weeks', ok:false, mis:'close-enough'},
        {label:'Plan A \u2014 stopping is the goal', ok:false, mis:'fund-is-plan'}],
      hint:'What happens after the first emergency hits each plan?',
      good:'Right: Plan B rebuilds itself. Plan A is one emergency away from zero \u2014 permanently.',
      bad:'After one $300 emergency, Plan A is at $0 forever. Plan B is back to $300 in 30 weeks without thinking.',
      why:'A buffer is a habit, not a milestone. Ongoing beats one-time because emergencies are ongoing too.'};
  }},
{ id:'future-needs-compare-03', verb:'compare', part:4, tier:'independent', skill:'future-needs',
  gen:(v)=>{
    const person=v.person();
    const repair=v.money(Math.round(v.cents(280,360)));
    return {
      context:`<p><b>Option A:</b> Pay a ${repair} repair from the emergency fund.</p><p><b>Option B:</b> Put ${repair} on a credit card and pay the minimum for a year.</p>`,
      q:`Which costs ${person} less overall?`,
      choices:[
        {label:`Option A \u2014 fund money costs $0 in interest`, ok:true},
        {label:'Option B \u2014 minimum payments keep cash free', ok:false, mis:'emergency-misuse'},
        {label:'They cost the same \u2014 debt is just delayed fund money', ok:false},
        {label:'Option B \u2014 the fund stays \u201cpure\u201d', ok:false, mis:'fund-purity'}],
      hint:'What does a year of minimum payments add?',
      good:`Right: the fund turns a ${repair} emergency into a ${repair} cost. The card turns it into ${repair} plus a year of interest.`,
      bad:'Minimum payments stretch one emergency across a year of interest. The fund ends the emergency the day it happens.',
      why:'This is the entire economic case for the buffer: it deletes interest from emergencies.'};
  }},
{ id:'future-needs-compare-04', verb:'compare', part:4, tier:'independent', skill:'future-needs',
  gen:(v)=>{
    const person=v.person();
    return {
      context:'<p><b>Plan A:</b> Start $10/week today.</p><p><b>Plan B:</b> Start $40/week \u201cnext month when things calm down.\u201d</p>',
      q:`Which plan actually builds a buffer?`,
      choices:[
        {label:'Plan A \u2014 next month never comes; today\u2019s $10 is real', ok:true},
        {label:'Plan B \u2014 $40 beats $10', ok:false},
        {label:'Plan B \u2014 waiting is responsible', ok:false, mis:'surprises-unplannable'},
        {label:'They are equal \u2014 intentions count', ok:false}],
      hint:'Which plan has money moving this week?',
      good:'Right: Plan A has $10 moving this week. Plan B has $0 moving until a \u201ccalm\u201d month that never arrives.',
      bad:'$40/week of someday is worth $0/week of today. The best pace is the one that starts now.',
      why:'\u201cLater\u201d is where buffers go to die. A small started pace beats a big imagined one every time.'};
  }},
{ id:'future-needs-compare-05', verb:'compare', part:4, tier:'independent', skill:'future-needs',
  gen:(v)=>{
    const person=v.person();
    const fee=v.money(Math.round(v.cents(150,210)));
    return {
      context:`<p><b>Plan A:</b> Save for the ${fee} registration at $15/month for 12 months.</p><p><b>Plan B:</b> Pay the full ${fee} in a panic the week it is due.</p>`,
      q:`Which costs ${person} less in money and stress?`,
      choices:[
        {label:'Plan A \u2014 $15/month is painless; panic week risks late fees and card interest', ok:true},
        {label:'Plan B \u2014 one payment is simpler', ok:false},
        {label:'They cost the same \u2014 it is the same fee', ok:false, mis:'close-enough'},
        {label:'Plan B \u2014 panic builds character', ok:false}],
      hint:'Add the late fee and the interest to Plan B.',
      good:`Right: Plan A costs exactly ${fee}. Plan B costs ${fee} plus late fees, stress, and possibly card interest.`,
      bad:`The fee is the same; everything around it is not. Panic adds late fees and interest that pacing never pays.`,
      why:'Pacing does not just spread the cost \u2014 it deletes the penalty costs that come with surprise payments.'};
  }},
{ id:'future-needs-compare-06', verb:'compare', part:4, tier:'independent', skill:'future-needs',
  gen:(v)=>{
    const person=v.person();
    return {
      context:'<p><b>Plan A:</b> $20/week for 25 weeks = $500.</p><p><b>Plan B:</b> $50/week for 10 weeks = $500.</p>',
      q:`Same $500 total. Which pace is more likely to survive real life?`,
      choices:[
        {label:'Plan A \u2014 $20/week bends without breaking when a tight week hits', ok:true},
        {label:'Plan B \u2014 faster is always better', ok:false},
        {label:'They are identical \u2014 $500 is $500', ok:false, mis:'close-enough'},
        {label:'Plan B \u2014 pain now means done sooner', ok:false}],
      hint:'Which pace survives a week with a surprise $30 cost?',
      good:'Right: $20/week survives tight weeks; $50/week snaps at the first surprise and the plan dies.',
      bad:'Same total, different survival odds. The pace you can keep through bad weeks beats the pace that only works in good ones.',
      why:'The best pace is not the fastest \u2014 it is the one still running in week 20.'};
  }},
// ---- predict (6): part 4 ----
{ id:'future-needs-predict-01', verb:'predict', part:4, tier:'independent', skill:'future-needs',
  gen:(v)=>{
    const person=v.person();
    const hit=v.money(Math.round(v.cents(350,450)));
    return {
      q:`${person} has no buffer and puts a ${hit} car repair on a credit card at high interest, paying only the minimum. What breaks next?`,
      choices:[
        {label:'The debt cycle: interest grows the balance faster than minimum payments shrink it', ok:true},
        {label:'Nothing \u2014 minimum payments make it free', ok:false},
        {label:'The car \u2014 it breaks again out of spite', ok:false},
        {label:'The credit limit \u2014 it automatically rises to help', ok:false, mis:'optimistic-plan'}],
      hint:'What does high interest do to a balance that is barely being paid?',
      good:'Right: minimums mostly feed interest. The $400 repair becomes a $600+ problem that eats next month\u2019s money too.',
      bad:'High interest on minimum payments means the balance barely moves \u2014 the \u201cemergency\u201d keeps charging rent for a year.',
      why:'No buffer turns one emergency into twelve months of interest. The buffer is cheaper than the card, every time.'};
  }},
{ id:'future-needs-predict-02', verb:'predict', part:4, tier:'independent', skill:'future-needs',
  gen:(v)=>{
    const person=v.person();
    return {
      q:`${person} invests the whole emergency fund in a volatile stock. The market dips 25% the same week the car dies. What happens?`,
      choices:[
        {label:'The fund is not there when needed \u2014 selling at the dip locks in the loss and still may not cover the repair', ok:true},
        {label:'The market recovers by Tuesday \u2014 timing always works out', ok:false, mis:'optimistic-plan'},
        {label:'The car waits patiently for the rebound', ok:false},
        {label:'Nothing \u2014 emergency funds are supposed to be invested', ok:false, mis:'emergency-invests'}],
      hint:'When do emergencies arrive \u2014 on your schedule or the market\u2019s worst day?',
      good:'Right: emergency money is needed on bad days by definition. Invested, it can be 25% short exactly when it matters.',
      bad:'The dip and the breakdown arriving together is not bad luck \u2014 it is the normal case. That is why the fund stays liquid.',
      why:'Emergency money has one requirement: whole and available on the worst day. Investments cannot promise that.'};
  }},
{ id:'future-needs-predict-03', verb:'predict', part:4, tier:'independent', skill:'future-needs',
  gen:(v)=>{
    const person=v.person();
    return {
      q:`${person} decides \u201c$10 a week is too small to bother with\u201d and saves $0 for five years. What does the math predict?`,
      choices:[
        {label:'$0 saved \u2014 and about $2,600 of buffer that never existed ($10 \u00d7 260 weeks)', ok:true},
        {label:'Roughly the same as saving \u2014 small amounts cancel out', ok:false, mis:'small-saves-nothing'},
        {label:'More money \u2014 not saving avoids the temptation to spend it', ok:false},
        {label:'It evens out \u2014 emergencies skip people who do not save', ok:false, mis:'surprises-unplannable'}],
      hint:'Multiply $10 \u00d7 260 weeks.',
      good:'Right: five years of \u201ctoo small\u201d is $2,600 left on the table \u2014 plus every emergency funded by card interest instead.',
      bad:'$10 \u00d7 260 = $2,600. \u201cToo small\u201d was never a math conclusion \u2014 it was a feeling that cost thousands.',
      why:'Time multiplies small moves. The only move that is truly too small is the one never made.'};
  }},
{ id:'future-needs-predict-04', verb:'predict', part:4, tier:'independent', skill:'future-needs',
  gen:(v)=>{
    const person=v.person();
    const trip=v.money(Math.round(v.cents(250,350)));
    const repair=v.money(Math.round(v.cents(280,380)));
    return {
      q:`${person} borrows ${trip} from the emergency fund for a trip, promising to repay it. A month later the car needs a ${repair} repair. What happens?`,
      choices:[
        {label:`The fund is short: ${repair} repair meets a half-empty fund, so the rest lands on a card`, ok:true},
        {label:'The fund magically refills \u2014 borrowed money returns itself', ok:false},
        {label:'The car repair waits until the trip is fully enjoyed', ok:false},
        {label:'Nothing \u2014 funds are meant to be borrowed from', ok:false, mis:'fund-fungibility'}],
      hint:'Was the trip money ever repaid?',
      good:`Right: the \u201cborrowed\u201d ${trip} never came back, so the fund faces the ${repair} repair half-empty. The card covers the gap \u2014 with interest.`,
      bad:'Borrowed fund money is spent fund money. The repair does not care about the promise; it only sees the balance.',
      why:'Every \u201cI\u2019ll pay it back\u201d is a bet that no emergency arrives before the payback. Emergencies do not wait.'};
  }},
{ id:'future-needs-predict-05', verb:'predict', part:4, tier:'independent', skill:'future-needs',
  gen:(v)=>{
    const person=v.person();
    const fee=v.money(Math.round(v.cents(150,210)));
    const late=v.money(Math.round(v.cents(25,45)));
    return {
      q:`${person} ignores the ${fee} registration renewal for 12 weeks \u2014 no pace, no savings. Renewal week arrives with a ${late} late fee. What is the total damage?`,
      choices:[
        {label:`${fee} + ${late} late fee + a panicked week \u2014 the predictable cost got more expensive`, ok:true},
        {label:`Just ${fee} \u2014 ignoring it changes nothing`, ok:false, mis:'close-enough'},
        {label:'$0 \u2014 fees are always waived if you ask nicely', ok:false, mis:'optimistic-plan'},
        {label:`Less than ${fee} \u2014 waiting earns a discount`, ok:false}],
      hint:'Add the late fee. Then add the stress.',
      good:`Right: the same ${fee} now costs ${fee} + ${late}, due immediately, with zero weeks left to pace it.`,
      bad:`Ignoring a dated cost does not freeze it \u2014 it adds the late fee and deletes all 12 weeks you could have used.`,
      why:'Predictable costs do not stay the same price when ignored. Delay is a surcharge.'};
  }},
{ id:'future-needs-predict-06', verb:'predict', part:4, tier:'independent', skill:'future-needs',
  gen:(v)=>{
    const person=v.person();
    return {
      q:`${person} builds a $500 buffer, then stops the weekly move \u2014 \u201cdone forever.\u201d A $400 emergency hits six months later. What happens next?`,
      choices:[
        {label:'The fund drops to $100 and stays there \u2014 the next emergency lands on a card', ok:true},
        {label:'The fund refills itself \u2014 $500 is permanent', ok:false, mis:'fund-is-plan'},
        {label:'$100 is plenty forever', ok:false, mis:'close-enough'},
        {label:'Emergencies stop happening once you have saved once', ok:false, mis:'surprises-unplannable'}],
      hint:'What refills the fund after it is spent?',
      good:'Right: a buffer is not a one-time trophy. Without the ongoing move, the first emergency permanently empties it.',
      bad:'$500 spent is $500 gone. Only the weekly habit refills it \u2014 \u201cdone forever\u201d is how funds die after one use.',
      why:'Emergencies are recurring; the refill must be recurring too. The habit is the fund.'};
  }},
// ---- build (5): part 4 ----
{ id:'future-needs-build-01', verb:'build', part:4, tier:'independent', skill:'future-needs',
  gen:(v)=>({ h:'Build it: split $200 toward the future',
    body:'<p>Split $200 between this month\u2019s needs, the emergency buffer, and this month\u2019s wants. The buffer gets fed before wants.</p>',
    totalDollars:200, buckets:[{id:'needs',label:'Needs'},{id:'buffer',label:'Emergency buffer'},{id:'wants',label:'Wants'}],
    targets:{needs:120, buffer:50, wants:30},
    hint:'Needs first, then the buffer, then wants get the rest.',
    good:'Needs covered ($120), buffer fed ($50), wants get what is left ($30). Future money moves before fun money.',
    bad:'Check the order: needs, then buffer, then wants. The buffer is a need from your future self.',
    why:'Every paycheck can feed the future a little. The split makes it automatic instead of accidental.' })},
{ id:'future-needs-build-02', verb:'build', part:4, tier:'independent', skill:'future-needs',
  gen:(v)=>({ h:'Build it: split $300 of monthly savings',
    body:'<p>$300 a month is available for future money. Split it between the emergency buffer, planned future costs (registration, textbooks), and flexible fun savings.</p>',
    totalDollars:300, buckets:[{id:'buffer',label:'Emergency buffer'},{id:'planned',label:'Planned future costs'},{id:'fun',label:'Fun savings'}],
    targets:{buffer:150, planned:100, fun:50},
    hint:'Emergencies and dated costs both need feeding \u2014 fun gets the remainder.',
    good:'Buffer $150, planned costs $100, fun $50. Both kinds of future money \u2014 surprise and scheduled \u2014 get fed.',
    bad:'Two different futures need money: surprises (buffer) and dated costs (planned). Fund both before fun.',
    why:'Future money has two buckets: the surprise fund and the scheduled-cost pace. Both need a share.' })},
{ id:'future-needs-build-03', verb:'build', part:4, tier:'independent', skill:'future-needs',
  gen:(v)=>({ h:'Build it: split a $120 side-gig payout',
    body:'<p>A $120 side-gig payout arrives. Split it: the car\u2019s future repairs, the emergency buffer, and spending money.</p>',
    totalDollars:120, buckets:[{id:'car',label:'Car future'},{id:'buffer',label:'Emergency buffer'},{id:'spend',label:'Spend now'}],
    targets:{car:45, buffer:45, spend:30},
    hint:'Windfalls are future money\u2019s best friend \u2014 feed both future buckets first.',
    good:'Car future $45, buffer $45, spend $30. The windfall did triple duty: two futures fed, present enjoyed.',
    bad:'Side money feels free, which is exactly why it should feed the future first. Split it before it evaporates.',
    why:'Irregular money is the fastest buffer-builder \u2014 if it gets split on arrival instead of spent whole.' })},
{ id:'future-needs-build-04', verb:'build', part:4, tier:'independent', skill:'future-needs',
  gen:(v)=>({ h:'Build it: split a $500 tax refund',
    body:'<p>A $500 tax refund lands. Split it between the emergency buffer, a planned cost (the December trip), and wants.</p>',
    totalDollars:500, buckets:[{id:'buffer',label:'Emergency buffer'},{id:'trip',label:'December trip'},{id:'wants',label:'Wants'}],
    targets:{buffer:300, trip:150, wants:50},
    hint:'Big lump sums can finish a buffer \u2014 then pace the dated cost.',
    good:'Buffer $300, trip $150, wants $50. One refund: buffer nearly done, trip paced, present still gets something.',
    bad:'A refund spent whole is a refund gone. Split it and it funds the future for months.',
    why:'Lump sums are buffer accelerators. Aim them at the fund first and the finish line jumps closer.' })},
{ id:'future-needs-build-05', verb:'build', part:4, tier:'independent', skill:'future-needs',
  gen:(v)=>({ h:'Build it: split $80 every two weeks',
    body:'<p>Every two weeks, $80 is free after needs. Split it between the emergency buffer, car\u2019s future costs, and wants.</p>',
    totalDollars:80, buckets:[{id:'buffer',label:'Emergency buffer'},{id:'car',label:'Car future'},{id:'wants',label:'Wants'}],
    targets:{buffer:40, car:25, wants:15},
    hint:'Half to the buffer keeps the pace strong; the car gets its own line.',
    good:'Buffer $40, car $25, wants $15. Every two weeks the future gets $65 richer without a second thought.',
    bad:'Recurring splits beat recurring intentions. Set the amounts once and let the habit run.',
    why:'Small recurring splits are the engine of every fund. Automate the split and willpower leaves the chat.' })},
// ---- explain (5): part 4 ----
{ id:'future-needs-explain-01', verb:'explain', part:4, tier:'independent', skill:'future-needs',
  gen:(v)=>({ h:'Teach it back: planning for surprises',
    prompt:'Explain in your own words: how can you plan for surprises if you cannot predict them?',
    keyPoints:['You cannot predict WHEN, but you know something WILL happen','Plan for the category (car, medical, phone), not the exact event','A small weekly buffer covers the surprise whenever it arrives'],
    modelAnswer:'You cannot predict which Tuesday the car breaks, but you know cars break. So you save for the category \u2014 car trouble \u2014 a little every week. When the surprise arrives, the money is already waiting.',
    hint:'WHEN vs WHETHER \u2014 which one can you plan around?' })},
{ id:'future-needs-explain-02', verb:'explain', part:4, tier:'independent', skill:'future-needs',
  gen:(v)=>({ h:'Teach it back: why $10 a week matters',
    prompt:'A friend says \u201c$10 a week is too small to matter.\u201d Explain why they are wrong.',
    keyPoints:['$10 \u00d7 52 weeks = $520 a year','That covers most real surprise costs without debt','Small and steady beats big and someday'],
    modelAnswer:'$10 a week is $520 in a year \u2014 enough to cover a car repair or a medical copay without a credit card. The amount is small; the result is not. \u201cToo small\u201d just means \u201cnever started.\u201d',
    hint:'Do the multiplication out loud: $10 \u00d7 52.' })},
{ id:'future-needs-explain-03', verb:'explain', part:4, tier:'independent', skill:'future-needs',
  gen:(v)=>({ h:'Teach it back: two different future buckets',
    prompt:'Explain the difference between an emergency fund and savings for planned future costs.',
    keyPoints:['Emergency fund: surprise costs, no date, rebuilt after every use','Planned savings: dated costs (registration, trip), paced by amount \u00f7 weeks','They are separate buckets \u2014 one does not borrow from the other'],
    modelAnswer:'The emergency fund is for surprises with no date \u2014 car breakdowns, ER visits \u2014 and it refills after every use. Planned savings are for dated costs like a registration renewal: you divide the amount by the weeks left. Separate buckets, separate jobs, no borrowing between them.',
    hint:'One has a date. The other does not. Start there.' })},
{ id:'future-needs-explain-04', verb:'explain', part:4, tier:'independent', skill:'future-needs',
  gen:(v)=>({ h:'Teach it back: why the fund stays boring',
    prompt:'Explain in your own words why the emergency fund should NOT be invested.',
    keyPoints:['Emergency money is needed on bad days \u2014 exactly when investments dip','It must be whole and withdrawable immediately','Growth is for long-term money; safety is for emergency money'],
    modelAnswer:'You need emergency money on the worst days \u2014 the same days investments fall. If the fund is invested, it can be 25% short right when the car dies. Emergency money\u2019s job is to be there in full, instantly. Growth belongs to money you will not touch for years.',
    hint:'When do you need it \u2014 good days or bad days?' })},
{ id:'future-needs-explain-05', verb:'explain', part:4, tier:'independent', skill:'future-needs',
  gen:(v)=>({ h:'Teach it back: buffer pace in plain words',
    prompt:'Explain buffer pace to a friend: what is it and how do you find it?',
    keyPoints:['Buffer pace = the weekly amount that fills a fund by a date','Find it by dividing: target amount \u00f7 weeks','Example: $480 \u00f7 12 weeks = $40/week'],
    modelAnswer:'Buffer pace is how much you save each week to hit a target by a date. You find it with one division: amount divided by weeks. A $480 fund in 12 weeks means $40 every week \u2014 no guessing, just math.',
    hint:'It is one division problem. Which two numbers?' })},
],
'benefits-lesson': [
// ---- choice (8): part 3 x4 guided (source-checking habit), part 4 x4 (calculate with verified numbers) ----
{ id:'benefits-lesson-choice-01', verb:'choice', part:3, tier:'guided', skill:'benefits-lesson',
  gen:(v)=>{
    const person=v.person();
    const program=v.pick(['SSI','SSDI','an ABLE account']);
    const amount='$'+v.int(940,1040);
    return {
      q:`A friend tells ${person}: \u201c${program} pays ${amount} a month \u2014 that is what you would get.\u201d What is the right response?`,
      choices:[
        {label:`Treat it as a lead, not an answer \u2014 check the current year-labeled figure at the official source`, ok:true},
        {label:`Plan around ${amount} \u2014 a number is a number`, ok:false, mis:'hearsay-number'},
        {label:`Add 10% \u2014 friends usually underestimate`, ok:false, mis:'hearsay-number'},
        {label:`Average it with two other friends\u2019 numbers`, ok:false, mis:'hearsay-number'}],
      cue:'The figure is versioned information. What do you do with versioned numbers?',
      hint:'Concepts last; numbers expire.',
      good:`Right: the stable concept is that ${program} has rules and amounts that change \u2014 the dollar figure must be verified current.`,
      bad:`A friend\u2019s number is a copy of a copy. Amounts change yearly and depend on the situation: check the official source\u2019s current year-labeled figure.`,
      why:`Versioned information goes stale. ${amount} may have been right for its year and situation \u2014 it is not a personal quote.`};
  }},
{ id:'benefits-lesson-choice-02', verb:'choice', part:3, tier:'guided', skill:'benefits-lesson',
  gen:(v)=>{
    const person=v.person();
    const program=v.pick(['SSI','SSDI']);
    return {
      q:`${person} needs the current ${program} income limit. Two sources disagree: a social media screenshot with no date, and the official program page labeled with this year. Which does ${person} trust?`,
      choices:[
        {label:'The official page with this year\u2019s label \u2014 dated, sourced, current', ok:true},
        {label:'The screenshot \u2014 it has more likes', ok:false, mis:'unverified-source'},
        {label:'Whichever number is higher \u2014 plan optimistically', ok:false, mis:'optimistic-plan'},
        {label:'The screenshot \u2014 it is newer-looking', ok:false, mis:'unverified-source'}],
      cue:'Ask two questions: who published it, and what year is on it?',
      hint:'Source and year label \u2014 which source has both?',
      good:'Right: official publisher plus a current year label beats an undated screenshot every time.',
      bad:'Likes are not verification. Only the official source with a current year label can be trusted for a number you will plan around.',
      why:'For versioned numbers, the source-checking habit is: official publisher, current year label, your situation.'};
  }},
{ id:'benefits-lesson-choice-03', verb:'choice', part:3, tier:'guided', skill:'benefits-lesson',
  gen:(v)=>{
    const person=v.person();
    const oldYear=v.pick([2020,2021,2022]);
    const limit=v.money(v.cents(1800,2400));
    return {
      q:`${person} finds an article from ${oldYear} saying the limit is ${limit}. The official site shows a newer year-labeled figure. Which number should ${person} plan around?`,
      choices:[
        {label:`The newer official figure \u2014 the ${oldYear} number has expired`, ok:true},
        {label:`The ${oldYear} figure \u2014 published numbers are permanent`, ok:false, mis:'numbers-permanent'},
        {label:'Whichever is higher \u2014 plan optimistically', ok:false, mis:'optimistic-plan'},
        {label:'Split the difference between the two figures', ok:false}],
      cue:'Numbers have expiration dates. Which one is still alive?',
      hint:'What did you learn about versioned information?',
      good:`Right: several rule changes can fit between ${oldYear} and now. The year label tells you which figure is alive.`,
      bad:`Old articles do not update themselves. The ${oldYear} figure expired; the current year-labeled official figure is the one to plan around.`,
      why:`Treating a ${oldYear} number as current is how people plan around money that no longer exists.`};
  }},
{ id:'benefits-lesson-choice-04', verb:'choice', part:3, tier:'guided', skill:'benefits-lesson',
  gen:(v)=>{
    const person=v.person();
    const amount='$'+v.int(940,1040);
    return {
      q:`${person} reads two facts: (1) \u201cSSI has income and resource rules.\u201d (2) \u201cSSI pays ${amount} a month.\u201d Which is the durable concept to remember, and which needs a current check?`,
      choices:[
        {label:`Fact 1 is the concept to keep; fact 2\u2019s number must be verified current`, ok:true},
        {label:'Both are permanent \u2014 memorize them', ok:false, mis:'numbers-permanent'},
        {label:`Fact 2 is the concept; fact 1 changes yearly`, ok:false},
        {label:'Neither matters \u2014 rules do not apply to individuals', ok:false, mis:'folk-rules'}],
      cue:'Concepts last; numbers expire. Which fact is a concept?',
      hint:'One of these is true every year. The other has a year on it.',
      good:'Right: \u201crules exist\u201d is true every year. The dollar figure is versioned \u2014 remember the concept, verify the number.',
      bad:'The concept (\u201crules exist, here is what kind\u201d) lasts. The number expires. Memorizing an expiring number is memorizing tomorrow\u2019s mistake.',
      why:'The durable skill is knowing THAT rules exist, WHAT KIND they are, and WHERE to verify them \u2014 then checking.'};
  }},
{ id:'benefits-lesson-choice-05', verb:'choice', part:4, tier:'independent', skill:'benefits-lesson',
  gen:(v)=>{
    const person=v.person();
    const fbr=967;
    const earnings=v.pick([385,485,585]);
    const countable=earnings-85;
    const benefit=fbr-countable;
    return {
      q:`The verified figures: the federal benefit amount is $${fbr}, and $${earnings} of earnings leaves $${countable} countable after the verified exclusions. What is ${person}\u2019s benefit?`,
      choices:[
        {label:`$${benefit} ($${fbr} \u2212 $${countable})`, ok:true},
        {label:`$${fbr} \u2014 earnings do not matter`, ok:false, mis:'folk-rules'},
        {label:`$${countable} \u2014 the benefit equals the countable income`, ok:false},
        {label:`$0 \u2014 any earnings end the benefit`, ok:false, mis:'folk-rules'}],
      hint:'Benefit = verified amount minus verified countable income.',
      good:`Right: $${fbr} \u2212 $${countable} = $${benefit}. Real numbers, real subtraction, real answer.`,
      bad:`The verified math: $${fbr} minus $${countable} countable = $${benefit}. Earnings reduce the benefit by formula \u2014 they do not erase it by rumor.`,
      why:'Calculate with verified numbers, not with fear. The formula is public; the rumor is not.'};
  }},
{ id:'benefits-lesson-choice-06', verb:'choice', part:4, tier:'independent', skill:'benefits-lesson',
  gen:(v)=>{
    const person=v.person();
    const limit=2000;
    const resources=v.pick([1250,1450,1600]);
    const room=limit-resources;
    return {
      q:`The verified resource limit is $${limit}. ${person}\u2019s countable resources are $${resources}. How much room is left under the limit?`,
      choices:[
        {label:`$${room} ($${limit} \u2212 $${resources})`, ok:true},
        {label:`$${room+200} \u2014 close enough to the limit`, ok:false, mis:'close-enough'},
        {label:'$0 \u2014 being near the limit is the same as over it', ok:false},
        {label:`$${limit} \u2014 resources do not count until verified twice`, ok:false, mis:'unverified-source'}],
      hint:'Limit minus resources = room.',
      good:`Right: $${limit} \u2212 $${resources} = $${room} of room. Exact numbers, exact answer.`,
      bad:`The subtraction is $${limit} \u2212 $${resources} = $${room}. \u201cClose enough\u201d near a hard limit is how people go over it.`,
      why:'Limits are exact. Calculate the room exactly \u2014 rounding near a cutoff is a decision to risk it.'};
  }},
{ id:'benefits-lesson-choice-07', verb:'choice', part:4, tier:'independent', skill:'benefits-lesson',
  gen:(v)=>{
    const person=v.person();
    const f1='$'+v.int(900,950);
    const f2='$'+v.int(1000,1080);
    const avg=Math.round(((parseInt(f1.slice(1))+parseInt(f2.slice(1)))/2));
    const official=967;
    return {
      q:`Two friends quote the monthly amount: ${f1} and ${f2}. The official year-labeled figure is $${official}. ${person} averages the friends\u2019 numbers to $${avg}. Which number should ${person} budget around?`,
      choices:[
        {label:`$${official} \u2014 the official figure; friend math is not verification`, ok:true},
        {label:`$${avg} \u2014 the average of two quotes is more reliable`, ok:false, mis:'hearsay-number'},
        {label:`${f2} \u2014 take the higher quote to be safe`, ok:false, mis:'optimistic-plan'},
        {label:`${f1} \u2014 take the lower quote to be safe`, ok:false}],
      hint:'Averaging two guesses gives you a guess with decimal points.',
      good:`Right: $${official} is verified and year-labeled. $${avg} is two rumors doing math together.`,
      bad:`Averaging hearsay does not create data. Only the official $${official} figure was published by the source that sets the amount.`,
      why:'\u201cFriend math\u201d \u2014 averaging quotes, adding percentages \u2014 launders rumors into fake precision. Verify instead.'};
  }},
{ id:'benefits-lesson-choice-08', verb:'choice', part:4, tier:'independent', skill:'benefits-lesson',
  gen:(v)=>{
    const person=v.person();
    const annual=v.pick([18000,19000]);
    const saved=v.pick([4000,6500,9000]);
    const room=annual-saved;
    return {
      q:`The verified annual contribution limit for the account is $${annual}. ${person} has contributed $${saved} this year. How much more can go in?`,
      choices:[
        {label:`$${room} ($${annual} \u2212 $${saved})`, ok:true},
        {label:`$${annual} \u2014 the limit resets with each contribution`, ok:false},
        {label:'Unlimited \u2014 a friend said there is no real cap', ok:false, mis:'hearsay-number'},
        {label:`$${room+1000} \u2014 round up, limits are flexible`, ok:false, mis:'close-enough'}],
      hint:'Annual limit minus already contributed.',
      good:`Right: $${annual} \u2212 $${saved} = $${room} of room left this year.`,
      bad:`The limit is annual and exact: $${annual} \u2212 $${saved} = $${room}. A friend\u2019s \u201cno cap\u201d is not a source.`,
      why:'Verified limits protect the account\u2019s status. Calculate the room; do not guess past it.'};
  }},
// ---- sort (6): part 3 x3 guided, part 4 x3 ----
{ id:'benefits-lesson-sort-01', verb:'sort', part:3, tier:'guided', skill:'benefits-lesson',
  gen:(v)=>({ h:'Sort it: verify or trust from memory?',
    body:'<p>Some facts must be checked at the official source every time. Others are safe to carry in your head. Sort them.</p>',
    cue:'Ask: could this number have changed since I learned it? If yes, it needs a check.',
    buckets:['Verify at source','Safe from memory'],
    items:v.shuffle([
      {label:'This year\u2019s benefit amount', a:'verify at source', why:'Amounts update yearly.'},
      {label:'This year\u2019s income limit', a:'verify at source', why:'Limits are versioned.'},
      {label:'That rules exist and have types', a:'safe from memory', why:'The concept is stable.'},
      {label:'Your friend\u2019s quoted number', a:'verify at source', why:'Hearsay is never a source.'},
      {label:'Where the official source lives', a:'safe from memory', why:'The location is stable.'},
      {label:'That amounts change yearly', a:'safe from memory', why:'The pattern is stable.'},
      {label:'Your exact personal amount', a:'verify at source', why:'It depends on your situation.'}]) })},
{ id:'benefits-lesson-sort-02', verb:'sort', part:3, tier:'guided', skill:'benefits-lesson',
  gen:(v)=>({ h:'Sort it: stable concept or versioned number?',
    body:'<p>Concepts last; numbers expire. Sort each statement.</p>',
    cue:'If it has a dollar sign or a year on it, it probably expires.',
    buckets:['Stable concept','Versioned number'],
    items:v.shuffle([
      {label:'\u201cPrograms have income and resource rules\u201d', a:'stable concept', why:'True every year.'},
      {label:'\u201cWork does not automatically end benefits\u201d', a:'stable concept', why:'The principle holds.'},
      {label:'\u201cThe amount is $967 a month\u201d', a:'versioned number', why:'Year-labeled and changeable.'},
      {label:'\u201cThe resource limit is $2,000\u201d', a:'versioned number', why:'A figure that updates.'},
      {label:'\u201cCheck the official source for current figures\u201d', a:'stable concept', why:'The habit never expires.'},
      {label:'\u201cMy cousin got $1,020\u201d', a:'versioned number', why:'One person\u2019s past figure.'},
      {label:'\u201cRules depend on your situation\u201d', a:'stable concept', why:'Always true.'}]) })},
{ id:'benefits-lesson-sort-03', verb:'sort', part:3, tier:'guided', skill:'benefits-lesson',
  gen:(v)=>({ h:'Sort it: trustworthy source or not?',
    body:'<p>Not every source deserves your budget. Sort them.</p>',
    cue:'Official publisher + current year label = trustworthy. Missing either = not.',
    buckets:['Trustworthy','Not trustworthy'],
    items:v.shuffle([
      {label:'The official program page, labeled with this year', a:'trustworthy', why:'Publisher and year both check out.'},
      {label:'Your official award letter', a:'trustworthy', why:'Written to you, by the source.'},
      {label:'A screenshot repost with no date', a:'not trustworthy', why:'No publisher, no year.'},
      {label:'A 2021 blog post', a:'not trustworthy', why:'Expired year label.'},
      {label:'A friend\u2019s text message quote', a:'not trustworthy', why:'Hearsay, no source at all.'},
      {label:'A relative\u2019s memory of \u201chow it worked\u201d', a:'not trustworthy', why:'Memory is not a year label.'},
      {label:'The program\u2019s official phone line', a:'trustworthy', why:'The source itself.'}]) })},
{ id:'benefits-lesson-sort-04', verb:'sort', part:4, tier:'independent', skill:'benefits-lesson',
  gen:(v)=>({ h:'Sort it: what changes yearly vs what stays?',
    body:'<p>Programs evolve. Sort what you must re-check from what you can rely on.</p>',
    buckets:['Changes yearly','Stays true'],
    items:v.shuffle([
      {label:'Benefit dollar amounts', a:'changes yearly', why:'Updated by the program.'},
      {label:'Income limits', a:'changes yearly', why:'Revised on a schedule.'},
      {label:'That you should verify before deciding', a:'stays true', why:'The habit is permanent.'},
      {label:'Contribution caps', a:'changes yearly', why:'Adjusted over time.'},
      {label:'That rumors are unreliable', a:'stays true', why:'Always true.'},
      {label:'That rules depend on your situation', a:'stays true', why:'Built into every program.'},
      {label:'Exclusion formulas\u2019 exact dollars', a:'changes yearly', why:'Figures get updated.'}]) })},
{ id:'benefits-lesson-sort-05', verb:'sort', part:4, tier:'independent', skill:'benefits-lesson',
  gen:(v)=>({ h:'Sort it: needs verification or not?',
    body:'<p>Before you decide, sort what must be verified at the official source.</p>',
    buckets:['Must verify','No check needed'],
    items:v.shuffle([
      {label:'The exact amount you will receive', a:'must verify', why:'Personal and versioned.'},
      {label:'Whether work affects your specific case', a:'must verify', why:'Depends on your situation.'},
      {label:'The current year\u2019s limits', a:'must verify', why:'They change.'},
      {label:'That checking is better than guessing', a:'no check needed', why:'The principle is stable.'},
      {label:'A number a stranger quoted online', a:'must verify', why:'Unverified by definition.'},
      {label:'That programs have rules', a:'no check needed', why:'Durable concept.'},
      {label:'What the official site said last year', a:'must verify', why:'Last year is expired.'}]) })},
{ id:'benefits-lesson-sort-06', verb:'sort', part:4, tier:'independent', skill:'benefits-lesson',
  gen:(v)=>({ h:'Sort it: friend math vs real verification',
    body:'<p>\u201cFriend math\u201d feels like research. Sort the real moves from the fake ones.</p>',
    buckets:['Real verification','Friend math'],
    items:v.shuffle([
      {label:'Reading the year-labeled official figure', a:'real verification', why:'Source plus date.'},
      {label:'Averaging three friends\u2019 quotes', a:'friend math', why:'Math on rumors is still rumor.'},
      {label:'Calling the program\u2019s official line', a:'real verification', why:'The source itself.'},
      {label:'Adding 10% to a friend\u2019s number \u201cto be safe\u201d', a:'friend math', why:'Invented precision.'},
      {label:'Checking your official letter', a:'real verification', why:'Written for your case.'},
      {label:'Trusting the highest quote you heard', a:'friend math', why:'Optimism is not data.'},
      {label:'Using last year\u2019s number because it is familiar', a:'friend math', why:'Familiar is not current.'}]) })},
// ---- decide (8): part 3 x4 guided, part 5 x4 ----
{ id:'benefits-lesson-decide-01', verb:'decide', part:3, tier:'guided', skill:'benefits-lesson',
  gen:(v)=>{
    const person=v.person();
    const job=v.pick(['a weekend gig','a part-time shift','a campus job']);
    const hours=v.int(8,15);
    return {
      q:`${person} receives SSI and is offered ${job} at ${hours} hours a week. A relative warns: \u201cAny work ends your benefits \u2014 don\u2019t risk it.\u201d What is the call?`,
      choices:[
        {label:'Check the current official work rules for SSI first \u2014 then decide about the job', ok:true},
        {label:'Decline the job \u2014 the relative lived it, that settles it', ok:false, mis:'folk-rules'},
        {label:'Take the job and hide the income', ok:false},
        {label:'Assume old rules still apply and decide from memory', ok:false, mis:'numbers-permanent'}],
      cue:'Fear-based advice is a rumor wearing authority. What does the habit say to do with rumors?',
      hint:'Which part is the durable concept, and which part needs a current check?',
      good:`${person} checks the official work-incentive rules, learns work does not automatically end SSI, and decides with real numbers. The job stays on the table.`,
      bad:`Declining on a relative\u2019s warning throws away real income over an unverified rumor. The stable concept: rules exist \u2014 so check the current ones.`,
      why:'Fear-based advice treats a rumor as a rule. Verify first; the job decision comes second.'};
  }},
{ id:'benefits-lesson-decide-02', verb:'decide', part:3, tier:'guided', skill:'benefits-lesson',
  gen:(v)=>{
    const person=v.person();
    const oldYear=v.pick([2021,2022]);
    return {
      q:`Two sources disagree about the current limit: a blog post from ${oldYear}, and the official program page labeled with this year. ${person} must decide today. What is the call?`,
      choices:[
        {label:'Follow the official page \u2014 current year label beats an old blog', ok:true},
        {label:`Follow the ${oldYear} blog \u2014 it was written by someone confident`, ok:false, mis:'numbers-permanent'},
        {label:'Average the two numbers', ok:false, mis:'hearsay-number'},
        {label:'Pick the higher one \u2014 optimism is a strategy', ok:false, mis:'optimistic-plan'}],
      cue:'When sources disagree, rank them: official + current year wins.',
      hint:'Which source sets the actual rules?',
      good:`${person} follows the official current figure. If the blog was right, no harm \u2014 if it was wrong, ${person} is protected.`,
      bad:`An old blog cannot overrule the program that writes the rules. Averaging or picking the higher number just manufactures a wrong answer.`,
      why:'Source ranking is a decision skill: official and current outranks everything else, every time.'};
  }},
{ id:'benefits-lesson-decide-03', verb:'decide', part:3, tier:'guided', skill:'benefits-lesson',
  gen:(v)=>{
    const person=v.person();
    const program=v.pick(['SSI','SNAP','housing assistance']);
    return {
      q:`${person} is thinking about applying for ${program}. A friend says \u201cyou definitely won\u2019t qualify \u2014 don\u2019t bother.\u201d What is the call?`,
      choices:[
        {label:'Check the official eligibility rules anyway \u2014 a friend does not decide qualification', ok:true},
        {label:'Skip applying \u2014 the friend knows the system', ok:false, mis:'folk-rules'},
        {label:'Apply but lie about income to qualify', ok:false},
        {label:'Wait a year and hope the rules loosen', ok:false, mis:'optimistic-plan'}],
      cue:'Who actually decides eligibility \u2014 the friend or the program?',
      hint:'Eligibility is decided by rules, not by friends.',
      good:`${person} reads the real eligibility rules. Either ${person} qualifies (win) or learns exactly what would change that (also a win).`,
      bad:`Letting a friend\u2019s guess cancel an application can cost months of support. The program\u2019s rules are the only verdict that counts.`,
      why:'Hearsay can talk you out of help you qualify for. The application \u2014 guided by official rules \u2014 is the real answer.'};
  }},
{ id:'benefits-lesson-decide-04', verb:'decide', part:3, tier:'guided', skill:'benefits-lesson',
  gen:(v)=>{
    const person=v.person();
    return {
      q:`At a family gathering, ${person} hears a brand-new rule about benefits that sounds important \u2014 and scary. What is the call before repeating it to anyone?`,
      choices:[
        {label:'Verify it at the official source first; repeat nothing unverified', ok:true},
        {label:'Repeat it immediately \u2014 scary news should spread fast', ok:false, mis:'unverified-source'},
        {label:'Repeat it with \u201cI heard that\u2026\u201d so it is not your fault', ok:false, mis:'unverified-source'},
        {label:'Assume it is true \u2014 family would not mislead you', ok:false, mis:'folk-rules'}],
      cue:'You are about to become someone else\u2019s \u201cfriend who said.\u201d What stops the chain?',
      hint:'Do not become the hearsay.',
      good:`${person} checks first. If true, ${person} shares it with a source. If false, ${person} just stopped a rumor.`,
      bad:`\u201cI heard that\u2026\u201d still spreads it. Every rumor needs one person who repeats it \u2014 ${person} refuses to be that person.`,
      why:'The source-checking habit protects other people too. Verify before you amplify.'};
  }},
{ id:'benefits-lesson-decide-05', verb:'decide', part:5, tier:'independent', skill:'benefits-lesson',
  gen:(v)=>{
    const person=v.person();
    const hours=v.int(10,18);
    return {
      q:`${person} gets SSI and is offered ${hours} hours a week at a campus job. Everyone \u201cknows\u201d working ends benefits. ${person}\u2019s rent depends on getting this right. What is the call?`,
      choices:[
        {label:'Verify the current work-incentive rules at the official source, run the real numbers, then decide', ok:true},
        {label:'Decline the job \u2014 everyone cannot be wrong', ok:false, mis:'folk-rules'},
        {label:'Take the job secretly and not report it', ok:false},
        {label:'Decide by whichever neighbor shouts loudest', ok:false, mis:'unverified-source'}],
      hint:'Rent is on the line. Which information is solid enough to bet rent on?',
      good:`${person} gets the verified rules, calculates the real effect on the benefit, and decides with numbers \u2014 keeping both the job option and the benefit safe.`,
      bad:`Betting rent on \u201ceveryone knows\u201d is gambling. The official rules are free to check and exact enough to plan around.`,
      why:'High-stakes decisions demand verified inputs. Rumor is never solid enough to bet rent on.'};
  }},
{ id:'benefits-lesson-decide-06', verb:'decide', part:5, tier:'independent', skill:'benefits-lesson',
  gen:(v)=>{
    const person=v.person();
    const letter='$'+v.int(940,1000);
    const friend='$'+v.int(1010,1080);
    return {
      q:`${person}\u2019s official award letter says ${letter} a month. A friend insists the real amount is ${friend} \u2014 \u201cthey always lowball the letter.\u201d ${person} is building next month\u2019s budget. What is the call?`,
      choices:[
        {label:`Budget around ${letter} \u2014 the official letter beats the friend\u2019s theory`, ok:true},
        {label:`Budget around ${friend} \u2014 friends know the real numbers`, ok:false, mis:'hearsay-number'},
        {label:`Budget around ${letter} but spend like it is ${friend}`, ok:false},
        {label:'Budget around the average of the two', ok:false, mis:'hearsay-number'}],
      hint:'Which one was written by the organization that sends the check?',
      good:`${person} budgets ${letter} and the budget holds. If the friend was right, there is a pleasant surplus \u2014 not a shortfall.`,
      bad:`Budgeting ${friend} on a friend\u2019s theory manufactures a shortfall when the real check is ${letter}. The letter is the plan; the rumor is noise.`,
      why:'Budget around verified numbers. Rumors can only create pleasant surprises \u2014 never the plan itself.'};
  }},
{ id:'benefits-lesson-decide-07', verb:'decide', part:5, tier:'independent', skill:'benefits-lesson',
  gen:(v)=>{
    const person=v.person();
    return {
      q:`Last year ${person} learned a benefits rule by heart. This week the official site shows the rule changed. ${person} liked the old rule better. What is the call?`,
      choices:[
        {label:'Follow the current rule \u2014 the site outranks memory and preference', ok:true},
        {label:'Follow the old rule \u2014 it was true when learned', ok:false, mis:'numbers-permanent'},
        {label:'Follow whichever rule is more generous', ok:false, mis:'optimistic-plan'},
        {label:'Ignore both and decide by gut feeling', ok:false}],
      hint:'Rules do not care which version you prefer.',
      good:`${person} updates to the current rule. Acting on the expired one would mean planning around a world that no longer exists.`,
      bad:`The old rule is now a souvenir, not a guide. Decisions run on current rules \u2014 preference does not get a vote.`,
      why:'Versioned information requires versioned habits: re-check, update, move on. Memory is not a source.'};
  }},
{ id:'benefits-lesson-decide-08', verb:'decide', part:5, tier:'independent', skill:'benefits-lesson',
  gen:(v)=>{
    const person=v.person();
    const annual=v.pick([18000,19000]);
    const planned=v.pick([22000,24000]);
    return {
      q:`A friend tells ${person} \u201cyou can put unlimited money in the account \u2014 no cap.\u201d ${person} is about to contribute $${planned}, but the verified annual limit is $${annual}. What is the call?`,
      choices:[
        {label:`Contribute at most $${annual} \u2014 the verified limit beats the friend\u2019s \u201cno cap\u201d`, ok:true},
        {label:`Contribute the full $${planned} \u2014 the friend sounded confident`, ok:false, mis:'hearsay-number'},
        {label:`Contribute $${planned} and hide the extra`, ok:false},
        {label:'Skip contributing entirely \u2014 too confusing', ok:false}],
      hint:'What happens to the account if it goes over the real limit?',
      good:`${person} stays within $${annual} and the account stays in good standing. The friend\u2019s confidence was not a source.`,
      bad:`Going over a verified limit on a friend\u2019s word risks the account\u2019s status. Confidence is not verification.`,
      why:'Limits protect you. When hearsay and a verified limit disagree, the limit wins \u2014 it is the one with consequences.'};
  }},
// ---- spot (6): part 6 — critique hearsay rules and friend math ----
{ id:'benefits-lesson-spot-01', verb:'spot', part:6, tier:'independent', skill:'benefits-lesson',
  gen:(v)=>{
    const person=v.person();
    const quote='$'+v.int(990,1060);
    return {
      scenario:`<p>${person}\u2019s budget plan:</p><ul><li>Monthly income line: \u201c${quote} (my friend\u2019s SSI amount)\u201d</li><li>Official source checked: never</li><li>Year label on the number: none</li></ul>`,
      q:'What is the mistake here?',
      choices:[
        {label:'Budgeting around a friend\u2019s number with no verification \u2014 hearsay is not a source', ok:true},
        {label:'Writing the budget down at all', ok:false},
        {label:'Not asking a second friend to confirm', ok:false, mis:'hearsay-number'},
        {label:'There is no mistake \u2014 friends are reliable sources', ok:false, mis:'unverified-source'}],
      hint:'Who published that number, and what year is on it?',
      good:'Right: the entire budget rests on an unverified quote. One check at the official source replaces the guess with a fact.',
      bad:'The mistake is the foundation: a budget built on hearsay. Asking a second friend just adds a second rumor.',
      why:'Every unverified number in a budget is a future surprise. Verify the inputs and the plan holds.'};
  }},
{ id:'benefits-lesson-spot-02', verb:'spot', part:6, tier:'independent', skill:'benefits-lesson',
  gen:(v)=>{
    const person=v.person();
    const oldYear=v.pick([2020,2021]);
    const amount=v.money(v.cents(900,980));
    return {
      scenario:`<p>${person}\u2019s 2026 plan:</p><ul><li>Benefit amount used: ${amount}</li><li>Source: a blog post from ${oldYear}</li><li>Official site checked: \u201cnah, it was a good article\u201d</li></ul>`,
      q:'What is the mistake here?',
      choices:[
        {label:`Using a ${oldYear} number in 2026 \u2014 published figures expire`, ok:true},
        {label:'Reading blogs at all', ok:false},
        {label:'Planning in 2026 instead of 2025', ok:false},
        {label:'There is no mistake \u2014 good articles stay true', ok:false, mis:'numbers-permanent'}],
      hint:'How many rule updates fit between then and now?',
      good:`Right: a ${oldYear} figure is expired information. The official site\u2019s current year-labeled number is the only one that counts.`,
      bad:`\u201cGood article\u201d is not a year label. Numbers expire whether the article was good or not.`,
      why:'Old numbers do not update themselves. Check the current figure or plan around a ghost.'};
  }},
{ id:'benefits-lesson-spot-03', verb:'spot', part:6, tier:'independent', skill:'benefits-lesson',
  gen:(v)=>{
    const person=v.person();
    const hours=v.int(10,16);
    return {
      scenario:`<p>${person} turned down ${hours} hours a week of work because:</p><ul><li>Grandma said: \u201cany paycheck ends your benefits\u201d</li><li>Official rules checked: never</li><li>Income lost: every week since</li></ul>`,
      q:'What is the mistake here?',
      choices:[
        {label:'Treating a relative\u2019s fear-rule as verified fact \u2014 without ever checking the official rules', ok:true},
        {label:'Listening to grandma at all', ok:false},
        {label:'Wanting to work while on benefits', ok:false, mis:'folk-rules'},
        {label:'There is no mistake \u2014 family warnings are always right', ok:false, mis:'folk-rules'}],
      hint:'What would one check at the official source have cost?',
      good:'Right: one free check would have shown work does not automatically end benefits. The rumor cost weeks of income.',
      bad:'Grandma\u2019s warning was love, not data. The mistake was treating it as verified fact instead of checking.',
      why:'Fear-based folk rules are the most expensive rumors \u2014 they talk people out of income. Verify before declining.'};
  }},
{ id:'benefits-lesson-spot-04', verb:'spot', part:6, tier:'independent', skill:'benefits-lesson',
  gen:(v)=>{
    const person=v.person();
    const low='$'+v.int(930,960);
    const high='$'+v.int(1010,1070);
    return {
      scenario:`<p>${person} heard two amounts: ${low} and ${high}.</p><ul><li>Budget built on: ${high}</li><li>Reason: \u201cplan for the best case\u201d</li><li>Official figure checked: never</li></ul>`,
      q:'What is the mistake here?',
      choices:[
        {label:'Planning around the higher rumor \u2014 optimism is not verification', ok:true},
        {label:'Hearing two different numbers', ok:false},
        {label:`Not picking ${low} instead`, ok:false},
        {label:'There is no mistake \u2014 best case is smart planning', ok:false, mis:'optimistic-plan'}],
      hint:'What happens when the real check is lower than the budget?',
      good:`Right: budgeting the higher rumor manufactures a shortfall. The official figure \u2014 not the optimistic one \u2014 is the plan.`,
      bad:`\u201cPlan for the best case\u201d is how budgets break. Plan around the verified number; let reality surprise you upward.`,
      why:'Optimistic planning feels good and fails precisely. Verify, then plan around what is real.'};
  }},
{ id:'benefits-lesson-spot-05', verb:'spot', part:6, tier:'independent', skill:'benefits-lesson',
  gen:(v)=>{
    const person=v.person();
    return {
      scenario:`<p>${person} is SURE about the new rule because:</p><ul><li>Source: a screenshot in a group chat</li><li>Original publisher: unknown</li><li>Date on the screenshot: none visible</li><li>Official source checked: \u201cthe screenshot looked official\u201d</li></ul>`,
      q:'What is the mistake here?',
      choices:[
        {label:'Treating an unsourced screenshot as verified \u2014 \u201clooked official\u201d is not a source', ok:true},
        {label:'Being in the group chat', ok:false},
        {label:'Not screenshotting it faster', ok:false},
        {label:'There is no mistake \u2014 screenshots are documents', ok:false, mis:'unverified-source'}],
      hint:'Can you name the publisher and the year?',
      good:'Right: no publisher, no date, no verification. A screenshot is just pixels until the official source confirms it.',
      bad:'\u201cLooked official\u201d is exactly how misinformation dresses. Publisher plus year label, or it does not count.',
      why:'Screenshots strip context \u2014 dates, sources, updates. Always trace it back to the official page.'};
  }},
{ id:'benefits-lesson-spot-06', verb:'spot', part:6, tier:'independent', skill:'benefits-lesson',
  gen:(v)=>{
    const person=v.person();
    const limit=v.money(v.cents(1950,2050));
    return {
      scenario:`<p>${person} tracks resources against the $2,000 limit:</p><ul><li>Counted resources: ${limit}</li><li>${person}\u2019s call: \u201cclose enough, basically $2,000\u201d</li><li>Extra $80 gift card: not counted \u201c—it\u2019s small\u201d</li></ul>`,
      q:'What is the mistake here?',
      choices:[
        {label:'Rounding near a hard limit \u2014 \u201cclose enough\u201d plus the uncounted $80 can cross the line', ok:true},
        {label:'Tracking resources at all', ok:false},
        {label:'The $2,000 limit existing', ok:false},
        {label:'There is no mistake \u2014 small amounts never count', ok:false, mis:'close-enough'}],
      hint:'What is $2,000 minus the real total?',
      good:'Right: limits are exact lines, not vibes. \u201cClose enough\u201d plus an uncounted $80 is how people cross limits they were tracking.',
      bad:'The limit does not grade on a curve. Count everything, round nothing near a cutoff.',
      why:'Precision matters most near boundaries. \u201cClose enough\u201d is a decision to risk the line.'};
  }},
// ---- compare (6): part 6 ----
{ id:'benefits-lesson-compare-01', verb:'compare', part:6, tier:'independent', skill:'benefits-lesson',
  gen:(v)=>{
    const person=v.person();
    const quote='$'+v.int(990,1060);
    const official=967;
    return {
      context:`<p><b>Source A:</b> A friend\u2019s quote: \u201c${quote} a month, trust me.\u201d</p><p><b>Source B:</b> The official program page: $${official} a month, labeled with this year.</p>`,
      q:`${person} is deciding what to budget. Which source wins?`,
      choices:[
        {label:`Source B \u2014 official publisher, current year label, $${official}`, ok:true},
        {label:`Source A \u2014 the friend knows ${person}\u2019s situation personally`, ok:false, mis:'hearsay-number'},
        {label:`Source A \u2014 ${quote} is higher, so it is safer`, ok:false, mis:'optimistic-plan'},
        {label:'Neither \u2014 split the difference', ok:false}],
      hint:'Which source actually sets the amount?',
      good:`Right: the program that writes the checks outranks the friend who heard a number. $${official}, verified, budgeted.`,
      bad:`A friend\u2019s confidence is not a source. The official year-labeled $${official} is the only number the budget can trust.`,
      why:'Rank sources before comparing numbers: official + current beats personal + confident, every time.'};
  }},
{ id:'benefits-lesson-compare-02', verb:'compare', part:6, tier:'independent', skill:'benefits-lesson',
  gen:(v)=>{
    const person=v.person();
    const old=v.money(v.cents(900,950));
    return {
      context:`<p><b>Source A:</b> A 2021 blog post saying the amount was ${old}.</p><p><b>Source B:</b> The official page with this year\u2019s figure.</p>`,
      q:'Which figure should be treated as current?',
      choices:[
        {label:'Source B \u2014 the year label is what makes a figure current', ok:true},
        {label:`Source A \u2014 ${old} was published, so it is permanent`, ok:false, mis:'numbers-permanent'},
        {label:'Source A \u2014 older sources are more tested', ok:false},
        {label:'Average them \u2014 the truth is in the middle', ok:false, mis:'hearsay-number'}],
      hint:'Which one has this year on it?',
      good:'Right: currency comes from the year label, not from age or confidence. Source B is alive; Source A expired.',
      bad:'A 2021 figure is a history lesson, not a budget input. Only the current year-labeled figure plans the present.',
      why:'\u201cPublished\u201d is not \u201cpermanent.\u201d The year label is the freshness date \u2014 read it like one.'};
  }},
{ id:'benefits-lesson-compare-03', verb:'compare', part:6, tier:'independent', skill:'benefits-lesson',
  gen:(v)=>{
    const person=v.person();
    return {
      context:'<p><b>Source A:</b> A screenshot of the rule, reposted three times, no date visible.</p><p><b>Source B:</b> The same rule read directly on the official program page today.</p>',
      q:`${person} needs the rule exactly right. Which source?`,
      choices:[
        {label:'Source B \u2014 direct from the publisher, seen today', ok:true},
        {label:'Source A \u2014 three reposts means three verifications', ok:false, mis:'unverified-source'},
        {label:'Source A \u2014 screenshots cannot be edited', ok:false, mis:'unverified-source'},
        {label:'They are identical \u2014 a copy is a copy', ok:false}],
      hint:'What gets lost every time a screenshot is reposted?',
      good:'Right: reposts strip dates and context. Reading it live at the official source is the only way to know it is current.',
      bad:'Reposts are not verifications \u2014 they are copies of copies. Screenshots can be cropped, old, or edited.',
      why:'Proximity to the publisher is the verification. Every repost is a step away from the truth.'};
  }},
{ id:'benefits-lesson-compare-04', verb:'compare', part:6, tier:'independent', skill:'benefits-lesson',
  gen:(v)=>{
    const person=v.person();
    const a='$'+v.int(940,970);
    const b='$'+v.int(980,1010);
    const c='$'+v.int(1020,1060);
    return {
      context:`<p><b>Method A:</b> Average three friends\u2019 quotes: ${a}, ${b}, ${c}.</p><p><b>Method B:</b> Read the one official year-labeled figure.</p>`,
      q:'Which method gives a number to plan around?',
      choices:[
        {label:'Method B \u2014 one verified figure beats three averaged rumors', ok:true},
        {label:'Method A \u2014 three heads are better than one', ok:false, mis:'hearsay-number'},
        {label:'Method A \u2014 the average smooths out errors', ok:false, mis:'hearsay-number'},
        {label:'Both \u2014 average all four numbers together', ok:false}],
      hint:'What is the average actually made of?',
      good:'Right: averaging rumors produces a precise-looking rumor. Method B is the only one anchored to the source.',
      bad:'Three guesses do not become data through arithmetic. The average of hearsay is hearsay with decimal points.',
      why:'\u201cFriend math\u201d manufactures confidence without adding information. One verified figure ends the debate.'};
  }},
{ id:'benefits-lesson-compare-05', verb:'compare', part:6, tier:'independent', skill:'benefits-lesson',
  gen:(v)=>{
    const person=v.person();
    return {
      context:'<p><b>Source A:</b> A relative\u2019s memory: \u201cwhen I dealt with this, the rule was X.\u201d</p><p><b>Source B:</b> The program\u2019s official work-incentives page, read this week.</p>',
      q:`${person} is deciding whether to take a job. Which source decides it?`,
      choices:[
        {label:'Source B \u2014 current official rules for this situation', ok:true},
        {label:'Source A \u2014 lived experience beats a website', ok:false, mis:'folk-rules'},
        {label:'Source A \u2014 family would never steer you wrong', ok:false, mis:'folk-rules'},
        {label:'Whichever is scarier \u2014 fear keeps you safe', ok:false}],
      hint:'Whose situation was the relative\u2019s memory about \u2014 and when?',
      good:'Right: the relative\u2019s case was a different person, a different year, possibly different rules. Source B is this person, this week.',
      bad:'Lived experience is real \u2014 and expired. Rules change, situations differ. Only the current official page matches this decision.',
      why:'Anecdotes are data about the past. Decisions need data about now.'};
  }},
{ id:'benefits-lesson-compare-06', verb:'compare', part:6, tier:'independent', skill:'benefits-lesson',
  gen:(v)=>{
    const person=v.person();
    const old=v.money(v.cents(1800,2000));
    return {
      context:`<p><b>Figure A:</b> \u201cThe limit was ${old} when I applied.\u201d</p><p><b>Figure B:</b> This year\u2019s official limit, read today.</p>`,
      q:'Which figure governs this year\u2019s decisions?',
      choices:[
        {label:'Figure B \u2014 limits are versioned; the current year\u2019s figure rules', ok:true},
        {label:`Figure A \u2014 the limit you learned first is the real one`, ok:false, mis:'numbers-permanent'},
        {label:`Figure A \u2014 ${old} is grandfathered in forever`, ok:false, mis:'numbers-permanent'},
        {label:'Whichever is higher \u2014 more room is better', ok:false, mis:'optimistic-plan'}],
      hint:'Do limits have a year on them?',
      good:'Right: Figure A is a memory of a past limit. Figure B is the limit that actually applies now.',
      bad:'Limits do not grandfather memories. This year\u2019s decisions run on this year\u2019s figure.',
      why:'\u201cWhen I applied\u201d is a timestamp, not a rule. Re-check the current figure every year.'};
  }},
// ---- predict (6): part 6 ----
{ id:'benefits-lesson-predict-01', verb:'predict', part:6, tier:'independent', skill:'benefits-lesson',
  gen:(v)=>{
    const person=v.person();
    const quote='$'+v.int(1010,1080);
    const real=967;
    return {
      q:`${person} budgets around a friend\u2019s unverified quote of ${quote} a month. The real amount turns out to be $${real}. What breaks first?`,
      choices:[
        {label:'The budget \u2014 it was built on money that never arrives, so bills go unpaid', ok:true},
        {label:'Nothing \u2014 budgets adjust themselves', ok:false},
        {label:'The friendship \u2014 friends owe each other accurate quotes', ok:false},
        {label:'The program \u2014 it must match the friend\u2019s quote', ok:false, mis:'hearsay-number'}],
      hint:'What happens when planned income is higher than real income?',
      good:`Right: every month the budget expects ${quote} and receives $${real}. The gap eats rent money until the budget collapses.`,
      bad:`The budget cannot survive income that does not exist. Unverified inputs do not \u201cadjust\u201d \u2014 they detonate.`,
      why:'Budgets are only as real as their inputs. One unverified number poisons the whole plan.'};
  }},
{ id:'benefits-lesson-predict-02', verb:'predict', part:6, tier:'independent', skill:'benefits-lesson',
  gen:(v)=>{
    const person=v.person();
    const hours=v.int(10,16);
    const pay=v.money(Math.round(v.cents(11,15)));
    return {
      q:`${person} believes the rumor \u201cany work ends benefits\u201d and declines ${hours} hours a week at ${pay}/hour without checking. What is the predictable consequence?`,
      choices:[
        {label:'Lost income every week \u2014 plus never learning the real work rules that would have allowed it', ok:true},
        {label:'The benefits increase \u2014 the program rewards not working', ok:false, mis:'folk-rules'},
        {label:'Nothing \u2014 declining was the safe move', ok:false},
        {label:'The job waits forever \u2014 offers never expire', ok:false, mis:'optimistic-plan'}],
      hint:'What did the rumor cost, in dollars per week?',
      good:`Right: ${hours} hours \u00d7 ${pay} of income, gone weekly \u2014 over a rumor that one free check would have killed.`,
      bad:'\u201cSafe\u201d here meant expensive. The rumor did not protect the benefits; it just deleted the paycheck.',
      why:'Unverified fear has a price tag. This one charges weekly.'};
  }},
{ id:'benefits-lesson-predict-03', verb:'predict', part:6, tier:'independent', skill:'benefits-lesson',
  gen:(v)=>{
    const person=v.person();
    const oldYear=v.pick([2020,2021]);
    return {
      q:`${person} plans 2026 around a ${oldYear} benefit figure, never re-checking. What happens when the real 2026 figure is lower?`,
      choices:[
        {label:'A slow-motion shortfall \u2014 every month the plan overspends reality until something breaks', ok:true},
        {label:'The program honors the old figure \u2014 published is permanent', ok:false, mis:'numbers-permanent'},
        {label:'Nothing \u2014 old figures are close enough', ok:false, mis:'close-enough'},
        {label:'The extra money appears \u2014 planning hard enough manifests it', ok:false, mis:'optimistic-plan'}],
      hint:'Which direction does the gap go, every single month?',
      good:'Right: the plan spends the old number while reality pays the new one. The gap compounds monthly until a bill fails.',
      bad:'Programs pay current figures, not fond memories. The ${oldYear} number is not \u201cclose enough\u201d \u2014 it is gone.',
      why:'Stale numbers fail slowly, then suddenly. Re-check yearly or budget against a ghost.'};
  }},
{ id:'benefits-lesson-predict-04', verb:'predict', part:6, tier:'independent', skill:'benefits-lesson',
  gen:(v)=>{
    const person=v.person();
    const annual=v.pick([18000,19000]);
    const over=v.money(Math.round(v.cents(2000,4000)));
    return {
      q:`${person} trusts \u201cno cap\u201d hearsay and contributes ${over} over the verified $${annual} annual limit. What is the predictable consequence?`,
      choices:[
        {label:'Account problems \u2014 going over a verified limit puts the account\u2019s standing at risk', ok:true},
        {label:'Bonus rewards \u2014 extra contributions earn extra credit', ok:false},
        {label:'Nothing \u2014 limits are suggestions', ok:false, mis:'close-enough'},
        {label:'The limit rises to match \u2014 the system adapts', ok:false, mis:'optimistic-plan'}],
      hint:'Who set the limit \u2014 the friend or the program?',
      good:`Right: the program set the limit, and the program enforces it. Hearsay does not outrank the rulebook.`,
      bad:'Limits are not suggestions and the system does not adapt to wishes. The verified number was the guardrail.',
      why:'Verified limits exist to protect the account. Guessing past them gambles the protection itself.'};
  }},
{ id:'benefits-lesson-predict-05', verb:'predict', part:6, tier:'independent', skill:'benefits-lesson',
  gen:(v)=>{
    const person=v.person();
    return {
      q:`${person} repeats an unverified scary \u201crule\u201d to three friends, who repeat it further. What is the predictable consequence?`,
      choices:[
        {label:'The rumor hardens into \u201cfact\u201d \u2014 someone makes a real decision (declining work, skipping aid) on it', ok:true},
        {label:'Nothing \u2014 words are harmless', ok:false, mis:'unverified-source'},
        {label:'The rumor corrects itself \u2014 crowds always fix errors', ok:false, mis:'optimistic-plan'},
        {label:'Only ${person} is affected \u2014 rumors do not travel', ok:false}],
      hint:'What happens when a scary rumor meets someone making a big decision?',
      good:'Right: rumors do not stay as chat \u2014 they become someone\u2019s reason to decline a job or skip an application.',
      bad:'Words travel and harden. An unverified scare repeated three times becomes three people\u2019s \u201cfact.\u201d',
      why:'Repeating without verifying makes you the rumor\u2019s publisher. The chain stops with one check.'};
  }},
{ id:'benefits-lesson-predict-06', verb:'predict', part:6, tier:'independent', skill:'benefits-lesson',
  gen:(v)=>{
    const person=v.person();
    return {
      q:`${person} checks the official source every January and updates every figure. Five years pass. What is the predictable result?`,
      choices:[
        {label:'Plans that stay accurate \u2014 no stale-number surprises, ever', ok:true},
        {label:'Wasted time \u2014 numbers never really change', ok:false, mis:'numbers-permanent'},
        {label:'Paranoia \u2014 checking makes the numbers worse', ok:false},
        {label:'Nothing different \u2014 habits do not compound', ok:false}],
      hint:'What does a yearly check prevent?',
      good:'Right: five years of current figures means five years of budgets built on reality. The habit compounds into reliability.',
      bad:'Numbers do change \u2014 yearly. The check is cheap; the stale-number surprise it prevents is expensive.',
      why:'Good habits are boring and profitable. Annual verification is a five-minute insurance policy on every plan.'};
  }},
// ---- build (5): part 6 ----
{ id:'benefits-lesson-build-01', verb:'build', part:6, tier:'independent', skill:'benefits-lesson',
  gen:(v)=>({ h:'Build it: split the verified $967',
    body:'<p>The verified monthly amount is $967. Split it: needs, savings, wants. Verified money still needs a plan.</p>',
    totalDollars:967, buckets:[{id:'needs',label:'Needs'},{id:'savings',label:'Savings'},{id:'wants',label:'Wants'}],
    targets:{needs:700, savings:100, wants:167},
    hint:'Needs first, then the savings move, then wants get the rest.',
    good:'Needs $700, savings $100, wants $167. A verified number with a real split \u2014 that is a plan.',
    bad:'The amount is verified; now the split must be deliberate. Needs, savings, wants \u2014 in that order.',
    why:'Verification tells you the number. The routine tells you what to do with it.' })},
{ id:'benefits-lesson-build-02', verb:'build', part:6, tier:'independent', skill:'benefits-lesson',
  gen:(v)=>({ h:'Build it: split the first benefit check',
    body:'<p>The first verified check is $967. Split it between needs, the emergency buffer, and wants.</p>',
    totalDollars:967, buckets:[{id:'needs',label:'Needs'},{id:'buffer',label:'Emergency buffer'},{id:'wants',label:'Wants'}],
    targets:{needs:600, buffer:200, wants:167},
    hint:'First checks should feed the buffer hard \u2014 future surprises are coming.',
    good:'Needs $600, buffer $200, wants $167. The first check builds the safety net while covering life.',
    bad:'New income feels like free money \u2014 which is exactly why the buffer gets fed first, on purpose.',
    why:'The first check sets the pattern. Feed the future first and every check after follows.' })},
{ id:'benefits-lesson-build-03', verb:'build', part:6, tier:'independent', skill:'benefits-lesson',
  gen:(v)=>({ h:'Build it: split $500 of work earnings',
    body:'<p>$500 from the campus job (work rules verified \u2014 it fits). Split it: needs, savings, wants.</p>',
    totalDollars:500, buckets:[{id:'needs',label:'Needs'},{id:'savings',label:'Savings'},{id:'wants',label:'Wants'}],
    targets:{needs:350, savings:100, wants:50},
    hint:'Verified work income is still income \u2014 it gets the full routine.',
    good:'Needs $350, savings $100, wants $50. Verified earnings, routine split, no drama.',
    bad:'Earned money still follows the routine: needs, savings, wants. Verification was step one; the split is step two.',
    why:'Checking the rules protects the income. Splitting it protects the future.' })},
{ id:'benefits-lesson-build-04', verb:'build', part:6, tier:'independent', skill:'benefits-lesson',
  gen:(v)=>({ h:'Build it: map the $2,000 resource limit',
    body:'<p>The verified resource limit is $2,000. Map it: already-counted resources, remaining room, and a safety margin you will not touch.</p>',
    totalDollars:2000, buckets:[{id:'counted',label:'Counted'},{id:'room',label:'Room left'},{id:'margin',label:'Safety margin'}],
    targets:{counted:1450, room:400, margin:150},
    hint:'Counted + room + margin = the full limit. The margin is never spent.',
    good:'Counted $1,450, room $400, margin $150. The limit is mapped \u2014 and the margin keeps you safely under it.',
    bad:'Map the whole limit: what is counted, what room remains, and a margin you never touch. Precision near limits.',
    why:'Visualizing the limit beats feeling it. The margin is what stands between you and an accidental crossing.' })},
{ id:'benefits-lesson-build-05', verb:'build', part:6, tier:'independent', skill:'benefits-lesson',
  gen:(v)=>({ h:'Build it: split the annual contribution room',
    body:'<p>Verified annual room: $18,000. Already contributed: $6,500. Split the year: contributed, planned contributions, remaining cushion.</p>',
    totalDollars:18000, buckets:[{id:'done',label:'Contributed'},{id:'planned',label:'Planned'},{id:'cushion',label:'Cushion'}],
    targets:{done:6500, planned:9000, cushion:2500},
    hint:'Done + planned must stay under the verified annual figure \u2014 the cushion is your guardrail.',
    good:'Contributed $6,500, planned $9,000, cushion $2,500. The year is mapped and the limit is never touched.',
    bad:'Plan the full year against the verified limit: contributed, planned, and a cushion so \u201cclose enough\u201d never happens.',
    why:'Annual limits need annual maps. The cushion turns a hard line into a comfortable distance.' })},
// ---- explain (5): part 6 ----
{ id:'benefits-lesson-explain-01', verb:'explain', part:6, tier:'independent', skill:'benefits-lesson',
  gen:(v)=>({ h:'Teach it back: concepts last, numbers expire',
    prompt:'Explain in your own words why concepts last but numbers expire.',
    keyPoints:['Rules and ideas (that limits exist, where to check) stay true','Dollar amounts and limits get updated by the program','So you memorize the concept and verify the number every time'],
    modelAnswer:'The idea that a program has income rules is true every year \u2014 that is a concept. The exact dollar limit gets updated \u2014 that is a number with an expiration date. So I remember the concept and check the current number at the official source before deciding.',
    hint:'Which one has a year on it?' })},
{ id:'benefits-lesson-explain-02', verb:'explain', part:6, tier:'independent', skill:'benefits-lesson',
  gen:(v)=>({ h:'Teach it back: what is friend math?',
    prompt:'Explain \u201cfriend math\u201d to someone: what is it and why does it fail?',
    keyPoints:['Friend math = averaging quotes, adding percentages, trusting the highest number','It does arithmetic on rumors \u2014 the output is still a rumor','It fails because no step touches the official source'],
    modelAnswer:'Friend math is doing math on hearsay \u2014 averaging three friends\u2019 quotes, adding 10% \u201cto be safe.\u201d It fails because arithmetic cannot create information: three rumors averaged are still a rumor. Only the official source gives you a number to plan around.',
    hint:'What is the average actually made of?' })},
{ id:'benefits-lesson-explain-03', verb:'explain', part:6, tier:'independent', skill:'benefits-lesson',
  gen:(v)=>({ h:'Teach it back: why not trust the relative\u2019s experience?',
    prompt:'A relative says \u201cI lived it, I know how it works.\u201d Explain why you still check the official source.',
    keyPoints:['Their case was a different person, a different year, maybe different rules','Rules change \u2014 their experience has an expiration date','Your decision needs current rules for your situation'],
    modelAnswer:'The relative\u2019s experience was real \u2014 for them, then. Rules change every year and every situation is different, so their story is a lead, not a verdict. I check the official source for the current rules that apply to me before I decide.',
    hint:'Whose situation and which year was their story about?' })},
{ id:'benefits-lesson-explain-04', verb:'explain', part:6, tier:'independent', skill:'benefits-lesson',
  gen:(v)=>({ h:'Teach it back: stable rule vs versioned number',
    prompt:'Explain the difference between a stable rule and a versioned number, with an example.',
    keyPoints:['Stable rule: an idea that stays true (\u201cprograms have income rules\u201d)','Versioned number: a figure with a year on it (\u201cthe limit is $X\u201d)','Example: remember the rule, verify the number before deciding'],
    modelAnswer:'A stable rule is an idea like \u201cbenefits have income and resource rules\u201d \u2014 true every year. A versioned number is a figure like \u201cthe limit is $2,000\u201d \u2014 it has a year on it and it changes. I carry the rule in my head and check the number at the official source.',
    hint:'One of them has a year on it.' })},
{ id:'benefits-lesson-explain-05', verb:'explain', part:6, tier:'independent', skill:'benefits-lesson',
  gen:(v)=>({ h:'Teach it back: the source-checking habit',
    prompt:'Explain the source-checking habit in three steps.',
    keyPoints:['Step 1: ask who published it and what year is on it','Step 2: rank sources \u2014 official + current beats everything','Step 3: decide only on verified numbers, treat the rest as leads'],
    modelAnswer:'First, ask who published it and what year is on it \u2014 no publisher or no date means no trust. Second, rank: the official source with a current year label beats screenshots, blogs, and friends every time. Third, decide only on verified numbers; everything else is a lead to check, not an answer.',
    hint:'Publisher, year, rank, decide.' })},
],
'decision-routine': [
// ---- choice (8): part 5 x4 (full routine), part 6 x4 (critique routine cases) ----
{ id:'decision-routine-choice-01', verb:'choice', part:5, tier:'independent', skill:'decision-routine',
  gen:(v)=>{
    const person=v.person();
    const pay=750, needs=420, save=75, days=30;
    const safe=pay-needs-save, pace=+(safe/days).toFixed(2);
    return {
      q:`${person} gets $${pay} for the month. Needs are $${needs}, and the savings move is $${save}. It must last ${days} days. What is the daily pace?`,
      choices:[
        {label:`$${pace}/day (($${pay} \u2212 $${needs} \u2212 $${save}) \u00f7 ${days})`, ok:true},
        {label:`$${+(pay/days).toFixed(2)}/day \u2014 pace the whole paycheck`, ok:false, mis:'close-enough'},
        {label:`$${+((pay-needs)/days).toFixed(2)}/day \u2014 skip the savings move`, ok:false},
        {label:`$${pace+2}/day \u2014 round up, it is fine`, ok:false, mis:'close-enough'}],
      hint:'Safe money first: paycheck minus needs minus savings. Then divide by days.',
      good:`Right: $${pay} \u2212 $${needs} \u2212 $${save} = $${safe}; $${safe} \u00f7 ${days} = $${pace}/day. The routine in one line.`,
      bad:`Run the steps in order: available ($${pay}), needs ($${needs}), savings ($${save}), then pace $${safe} \u00f7 ${days} = $${pace}/day. Skipping a step breaks the pace.`,
      why:'Pace = (money \u2212 needs \u2212 savings) \u00f7 time. Every skipped subtraction is a lie the pace tells you.'};
  }},
{ id:'decision-routine-choice-02', verb:'choice', part:5, tier:'independent', skill:'decision-routine',
  gen:(v)=>{
    const person=v.person();
    const balance=Math.round(v.cents(700,950));
    const scheduled=Math.round(v.cents(250,400));
    const pending=Math.round(v.cents(30,70));
    const promised=Math.round(v.cents(40,90));
    const avail=+(balance-scheduled-pending-promised).toFixed(2);
    return {
      q:`${person}\u2019s account shows $${balance}. Scheduled bills: $${scheduled}. Pending charges: $${pending}. Promised to a cousin: $${promised}. What is truly available?`,
      choices:[
        {label:`$${avail} ($${balance} \u2212 $${scheduled} \u2212 $${pending} \u2212 $${promised})`, ok:true},
        {label:`$${balance} \u2014 the account balance is the money`, ok:false},
        {label:`$${+(balance-scheduled).toFixed(2)} \u2014 pending and promised do not count yet`, ok:false},
        {label:`$${+(balance+pending).toFixed(2)} \u2014 pending adds back`, ok:false}],
      hint:'Available = balance minus scheduled, pending, AND promised.',
      good:`Right: $${avail}. The balance lies; the subtractions tell the truth.`,
      bad:`All three come out: $${balance} \u2212 $${scheduled} \u2212 $${pending} \u2212 $${promised} = $${avail}. Pending and promised spend the money before you do.`,
      why:'Step 1 of the routine exists because the balance is a rumor. Available money is what is left after every claim.'};
  }},
{ id:'decision-routine-choice-03', verb:'choice', part:5, tier:'independent', skill:'decision-routine',
  gen:(v)=>{
    const person=v.person();
    const safe=v.pick([420,450,480]);
    const days=v.pick([14,15,16]);
    const pace=+(safe/days).toFixed(2);
    return {
      q:`${person} has $${safe} of safe money and ${days} days to cover. What is the daily pace?`,
      choices:[
        {label:`$${pace}/day`, ok:true},
        {label:`$${+(safe/(days-4)).toFixed(2)}/day \u2014 weekends do not count`, ok:false},
        {label:`$${Math.round(safe/days)}/day \u2014 round it, close enough`, ok:false, mis:'close-enough'},
        {label:`$${+(safe/days*2).toFixed(2)}/day \u2014 spend it while it lasts`, ok:false}],
      hint:'Safe money \u00f7 time. All the days count.',
      good:`Right: $${safe} \u00f7 ${days} = $${pace}/day. Every day counts \u2014 skipping days just moves the broke day earlier.`,
      bad:`$${safe} \u00f7 ${days} = $${pace}/day. Weekends still need food; rounding still costs money.`,
      why:'The pace is a speed limit, not a suggestion. It only works if every day is in the denominator.'};
  }},
{ id:'decision-routine-choice-04', verb:'choice', part:5, tier:'independent', skill:'decision-routine',
  gen:(v)=>{
    const person=v.person();
    const start=300, days=10, spent=120, used=3;
    const remain=start-spent, left=days-used;
    const pace=+(remain/left).toFixed(2);
    return {
      q:`${person} started with $${start} for ${days} days ($${(start/days).toFixed(2)}/day). After ${used} days, $${spent} is spent. What is the new pace?`,
      choices:[
        {label:`$${pace}/day ($${remain} left \u00f7 ${left} days)`, ok:true},
        {label:`$${(start/days).toFixed(2)}/day \u2014 stick to the original plan`, ok:false},
        {label:`$${+(spent/used).toFixed(2)}/day \u2014 pace the spending rate so far`, ok:false},
        {label:'$0/day \u2014 the plan is ruined, give up', ok:false, mis:'miss-means-fail'}],
      hint:'Overspent? Recalculate from what REMAINS \u2014 never from the original plan.',
      good:`Right: $${remain} \u00f7 ${left} = $${pace}/day. The routine survives overspending \u2014 the old pace does not.`,
      bad:`The original pace died with the overspend. New reality: $${remain} over ${left} days = $${pace}/day. Recalculate from remains.`,
      why:'Step 7 exists because plans break. The routine does not punish overspending \u2014 it re-prices the future.'};
  }},
{ id:'decision-routine-choice-05', verb:'choice', part:6, tier:'independent', skill:'decision-routine',
  gen:(v)=>{
    const person=v.person();
    const balance=Math.round(v.cents(600,800));
    const pending=Math.round(v.cents(80,120));
    return {
      q:`${person} paces spending from the $${balance} balance, ignoring a $${pending} pending charge. Payday is a week away. What is the flaw?`,
      choices:[
        {label:`Skipped step 1 \u2014 the pace is built on money that is already spoken for`, ok:true},
        {label:'The balance was too low to pace from', ok:false},
        {label:'A week is too short to pace', ok:false},
        {label:'There is no flaw \u2014 pending charges sometimes disappear', ok:false, mis:'optimistic-plan'}],
      hint:'What does the pending charge do to the \u201cavailable\u201d money?',
      good:`Right: the $${pending} is already gone \u2014 ${person} just has not felt it yet. The pace overspends from day one.`,
      bad:`Step 1 (Available?) exists for exactly this: pending money is spent money. Pacing from the raw balance is pacing a fantasy.`,
      why:'The routine\u2019s order is load-bearing. Skip step 1 and every later step computes on a lie.'};
  }},
{ id:'decision-routine-choice-06', verb:'choice', part:6, tier:'independent', skill:'decision-routine',
  gen:(v)=>{
    const person=v.person();
    return {
      q:`${person} runs the routine but moves savings \u201clast, from whatever is left.\u201d Month after month, $0 is left. What is the flaw?`,
      choices:[
        {label:'Savings is step 4, not step \u201cwhenever\u201d \u2014 last place means no place', ok:true},
        {label:'The routine has too many steps', ok:false},
        {label:'$0 left means the needs were too high', ok:false},
        {label:'There is no flaw \u2014 saving leftovers is the routine', ok:false, mis:'fund-is-plan'}],
      hint:'What is ever \u201cleft\u201d at the end of a month?',
      good:'Right: \u201cwhatever is left\u201d is always $0 \u2014 spending expands to fill available money. Savings must move before spending, not after.',
      bad:'Step 4 says savings next \u2014 before the pace, before the wants. Last place in the routine is the same as no place.',
      why:'Pay-your-future-self is a sequencing rule, not a wish. Order is the entire mechanism.'};
  }},
{ id:'decision-routine-choice-07', verb:'choice', part:6, tier:'independent', skill:'decision-routine',
  gen:(v)=>{
    const person=v.person();
    return {
      q:`${person} overspends mid-month, then re-paces from the ORIGINAL monthly plan instead of what remains. What is the flaw?`,
      choices:[
        {label:'Step 7 says recalculate from what remains \u2014 the original plan no longer exists', ok:true},
        {label:'Re-pacing at all \u2014 the original pace should hold', ok:false},
        {label:'Overspending \u2014 the routine forbids it', ok:false, mis:'miss-means-fail'},
        {label:'There is no flaw \u2014 the plan is the plan', ok:false}],
      hint:'Can you spend money you already spent?',
      good:'Right: the original plan described money that is gone. Only the remaining balance can be paced.',
      bad:'Step 7: recalculate from what remains \u2014 never from the original plan. The plan is history; the balance is reality.',
      why:'The routine is honest about failure: it does not shame the overspend, it re-prices from what is actually left.'};
  }},
{ id:'decision-routine-choice-08', verb:'choice', part:6, tier:'independent', skill:'decision-routine',
  gen:(v)=>{
    const person=v.person();
    const deals=v.pick([3,4]);
    return {
      q:`${person} buys ${deals} \u201cdeals\u201d in a week, skipping the \u201cwas I going to buy it anyway?\u201d test each time. What is the flaw?`,
      choices:[
        {label:'Skipped step 6 \u2014 without the test, every discount becomes a reason to spend', ok:true},
        {label:'Buying more than two deals', ok:false},
        {label:'Shopping weekly instead of monthly', ok:false},
        {label:'There is no flaw \u2014 a deal is always smart', ok:false, mis:'close-enough'}],
      hint:'What question would have stopped at least one of those purchases?',
      good:`Right: the test \u2014 \u201cwas I going to buy it anyway?\u201d \u2014 is the only thing standing between a pace and a sale rack.`,
      bad:'Step 6 exists because discounts hack the brain. Without the test, \u201csaving 40%\u201d becomes spending 100% on things unplanned.',
      why:'Spend-smart is a filter, not a feeling. One question, asked every time, protects the whole pace.'};
  }},
// ---- sort (6): part 6 ----
{ id:'decision-routine-sort-01', verb:'sort', part:6, tier:'independent', skill:'decision-routine',
  gen:(v)=>({ h:'Sort it: which routine step is this?',
    body:'<p>Each action belongs to a step of the NWS routine. Sort them.</p>',
    buckets:['Available','Needs','Pace'],
    items:v.shuffle([
      {label:'Subtract the electric bill due Friday', a:'available', why:'Step 1: scheduled money comes out.'},
      {label:'Rent is due the 1st \u2014 protect it', a:'needs', why:'Step 3: needs first.'},
      {label:'$90 left for 9 days', a:'pace', why:'Step 5: safe money \u00f7 time.'},
      {label:'The pending gas charge', a:'available', why:'Step 1: pending comes out too.'},
      {label:'Bus pass for the month', a:'needs', why:'Step 3: required cost.'},
      {label:'$6.33 a day is the speed limit', a:'pace', why:'Step 5: the daily number.'},
      {label:'Money promised to a cousin', a:'available', why:'Step 1: promised is spoken for.'}]) })},
{ id:'decision-routine-sort-02', verb:'sort', part:6, tier:'independent', skill:'decision-routine',
  gen:(v)=>({ h:'Sort it: routine step or not?',
    body:'<p>Which of these are actual steps of the NWS decision routine?</p>',
    buckets:['Routine step','Not a step'],
    items:v.shuffle([
      {label:'Balance minus scheduled, pending, promised', a:'routine step', why:'Step 1: Available?'},
      {label:'Move savings before spending', a:'routine step', why:'Step 4: Savings next.'},
      {label:'Safe money \u00f7 time', a:'routine step', why:'Step 5: Pace it.'},
      {label:'Buy it if the discount is big', a:'not a step', why:'The test is \u201cwas I going to buy it anyway?\u201d'},
      {label:'Recalculate from what remains', a:'routine step', why:'Step 7: Overspent?'},
      {label:'Spend the balance, check later', a:'not a step', why:'The opposite of the routine.'},
      {label:'Was I going to buy it anyway?', a:'routine step', why:'Step 6: Spend smart.'}]) })},
{ id:'decision-routine-sort-03', verb:'sort', part:6, tier:'independent', skill:'decision-routine',
  gen:(v)=>({ h:'Sort it: protect first or pace later?',
    body:'<p>Needs get protected before the pace is set. Wants live inside the pace. Sort them.</p>',
    buckets:['Protect first','Inside the pace'],
    items:v.shuffle([
      {label:'Rent share', a:'protect first', why:'Required \u2014 step 3.'},
      {label:'Bus pass', a:'protect first', why:'Required to earn.'},
      {label:'Streaming subscription', a:'inside the pace', why:'Optional \u2014 paced.'},
      {label:'Phone bill', a:'protect first', why:'Required service.'},
      {label:'Takeout', a:'inside the pace', why:'Optional \u2014 paced.'},
      {label:'Minimum card payment', a:'protect first', why:'Required obligation.'},
      {label:'New game', a:'inside the pace', why:'Optional \u2014 paced.'}]) })},
{ id:'decision-routine-sort-04', verb:'sort', part:6, tier:'independent', skill:'decision-routine',
  gen:(v)=>({ h:'Sort it: does this need a re-pace?',
    body:'<p>Step 7: recalculate from what remains when reality changes. Sort what triggers it.</p>',
    buckets:['Re-pace now','No re-pace'],
    items:v.shuffle([
      {label:'Spent faster than the pace for 3 days', a:'re-pace now', why:'Reality changed.'},
      {label:'A surprise $60 cost appeared', a:'re-pace now', why:'Less remains.'},
      {label:'Nothing changed \u2014 on pace all week', a:'no re-pace', why:'The pace still holds.'},
      {label:'Got $50 extra income', a:'re-pace now', why:'More remains \u2014 run it.'},
      {label:'A bill came in $20 higher', a:'re-pace now', why:'Needs changed.'},
      {label:'Thought about spending more', a:'no re-pace', why:'Thoughts are not transactions.'},
      {label:'Two weeks left, balance matches plan', a:'no re-pace', why:'No change, no recalc.'}]) })},
{ id:'decision-routine-sort-05', verb:'sort', part:6, tier:'independent', skill:'decision-routine',
  gen:(v)=>({ h:'Sort it: working routine or broken routine?',
    body:'<p>Sort each habit by whether it follows the NWS routine.</p>',
    buckets:['Follows routine','Breaks routine'],
    items:v.shuffle([
      {label:'Subtracted pending charges first', a:'follows routine', why:'Step 1 done right.'},
      {label:'Moved savings before any wants', a:'follows routine', why:'Step 4 done right.'},
      {label:'Paced from the raw balance', a:'breaks routine', why:'Step 1 skipped.'},
      {label:'Re-paced after overspending', a:'follows routine', why:'Step 7 done right.'},
      {label:'Saved \u201cwhatever is left\u201d', a:'breaks routine', why:'Step 4 skipped.'},
      {label:'Asked \u201cwas I going to buy it anyway?\u201d', a:'follows routine', why:'Step 6 done right.'},
      {label:'Re-paced from the original plan', a:'breaks routine', why:'Step 7 done wrong.'}]) })},
{ id:'decision-routine-sort-06', verb:'sort', part:6, tier:'independent', skill:'decision-routine',
  gen:(v)=>({ h:'Sort it: what comes out of \u201cavailable\u201d?',
    body:'<p>Step 1 subtracts every claim on the money. Sort what gets subtracted.</p>',
    buckets:['Subtract it','Not yet'],
    items:v.shuffle([
      {label:'The electric bill due Friday', a:'subtract it', why:'Scheduled.'},
      {label:'A pending gas station charge', a:'subtract it', why:'Pending.'},
      {label:'$40 promised to a cousin', a:'subtract it', why:'Promised.'},
      {label:'Next week\u2019s paycheck', a:'not yet', why:'Not received.'},
      {label:'A \u201cmaybe\u201d bonus', a:'not yet', why:'Not certain.'},
      {label:'Rent auto-draft on the 1st', a:'subtract it', why:'Scheduled.'},
      {label:'A wish-list item', a:'not yet', why:'Not a claim.'}]) })},
// ---- decide (8): part 5 x4, part 8 x4 stretch (novel) ----
{ id:'decision-routine-decide-01', verb:'decide', part:5, tier:'independent', skill:'decision-routine',
  gen:(v)=>{
    const person=v.person();
    return {
      q:`${person} has $500 until Friday (5 days). Needs: $200 for gas and food. Savings move: $30. Safe money is $270 \u2014 a $54/day pace. Friends invite ${person} to a $40 concert tonight. What is the call?`,
      choices:[
        {label:'Go \u2014 $40 fits inside today\u2019s $54 pace, and the pace holds tomorrow', ok:true},
        {label:'Skip it \u2014 any fun spending breaks the routine', ok:false, mis:'miss-means-fail'},
        {label:'Go and buy $60 of merch too \u2014 the pace is a suggestion', ok:false, mis:'close-enough'},
        {label:'Put the ticket on a card so the pace stays \u201cclean\u201d', ok:false}],
      hint:'Run the steps: available, needs, savings, pace \u2014 then check the ticket against the pace.',
      good:'Concert AND the pace survive: $40 tonight leaves the $54/day limit intact for the other four days. The routine allows joy inside the limit.',
      bad:'The routine is not a punishment \u2014 $40 fits the $54 pace. But $100 of ticket-plus-merch does not, and card-hiding the ticket corrupts the math.',
      why:'Decide with the routine, not with guilt or vibes: pace first, then check the choice against it.'};
  }},
{ id:'decision-routine-decide-02', verb:'decide', part:5, tier:'independent', skill:'decision-routine',
  gen:(v)=>{
    const person=v.person();
    const repair=v.money(Math.round(v.cents(130,170)));
    return {
      q:`Mid-month, ${person}\u2019s car needs a ${repair} repair. The emergency buffer covers it. The old pace was $30/day with 12 days left. What is the call?`,
      choices:[
        {label:'Pay from the buffer, then re-pace the remaining days from what remains', ok:true},
        {label:'Pay from the buffer and keep the old $30/day pace unchanged', ok:false},
        {label:'Put it on a card to avoid touching the buffer', ok:false, mis:'fund-purity'},
        {label:'Skip the repair \u2014 the pace matters more than the car', ok:false}],
      hint:'Two steps fire here: the buffer handles the surprise, then step 7 re-prices the days.',
      good:'Buffer absorbs the surprise (its job), then the remaining 12 days get a fresh pace from what is left. Both systems do their jobs.',
      bad:'Keeping the old pace after a surprise spends money twice \u2014 once on the repair, once in the fantasy budget. Re-pace from remains.',
      why:'Surprises trigger two routine moves: spend the right bucket, then re-pace. In that order.'};
  }},
{ id:'decision-routine-decide-03', verb:'decide', part:5, tier:'independent', skill:'decision-routine',
  gen:(v)=>{
    const person=v.person();
    const save=v.money(v.pick([40,50,60]));
    return {
      q:`Payday: a friend says \u201cskip the ${save} savings move just this once \u2014 you deserve it.\u201d ${person}\u2019s buffer is half-built. What is the call?`,
      choices:[
        {label:`Move the ${save} first \u2014 the routine protects the future before the present celebrates`, ok:true},
        {label:'Skip it once \u2014 one skip changes nothing', ok:false, mis:'close-enough'},
        {label:'Skip it and double next time \u2014 it evens out', ok:false},
        {label:'Move half \u2014 compromise with the routine', ok:false, mis:'close-enough'}],
      hint:'What does \u201cjust this once\u201d do to a half-built buffer\u2019s finish date?',
      good:`The ${save} moves. \u201cJust this once\u201d is how half-built buffers stay half-built \u2014 the routine does not negotiate with paydays.`,
      bad:'One skip pushes the finish date back and teaches the habit that skipping is allowed. \u201cDouble next time\u201d is a promise the future rarely keeps.',
      why:'Step 4 is non-negotiable because every exception becomes the rule. Move it first, then enjoy the rest.'};
  }},
{ id:'decision-routine-decide-04', verb:'decide', part:5, tier:'independent', skill:'decision-routine',
  gen:(v)=>{
    const person=v.person();
    const a=v.money(Math.round(v.cents(40,60)));
    const b=v.money(Math.round(v.cents(40,60)));
    return {
      q:`${person}\u2019s pace allows one treat this week: a ${a} dinner out OR a ${b} game \u2014 not both. What is the call?`,
      choices:[
        {label:'Pick one, enjoy it fully, leave the other \u2014 the pace holds', ok:true},
        {label:'Get both \u2014 the pace can absorb it', ok:false, mis:'close-enough'},
        {label:'Get neither \u2014 wanting things is the problem', ok:false, mis:'miss-means-fail'},
        {label:'Get both on a card \u2014 the pace stays clean', ok:false}],
      hint:'The pace allows exactly one. What does the routine do with \u201cor\u201d?',
      good:'One treat, fully enjoyed, pace intact. Choosing is the skill \u2014 the routine makes the tradeoff visible instead of painful.',
      bad:'\u201cThe pace can absorb it\u201d is how $50 treats become $100 weeks. And card-hiding a want corrupts every number downstream.',
      why:'The routine does not eliminate wants \u2014 it rations them honestly. One real treat beats two guilty ones.'};
  }},
{ id:'decision-routine-decide-05', verb:'decide', part:8, tier:'stretch', skill:'decision-routine',
  gen:(v)=>{
    const person=v.person();
    const refund=900, needs=520, save=90, days=30;
    const safe=refund-needs-save, pace=+(safe/days).toFixed(2);
    return {
      q:`Novel case: ${person} gets a $${refund} tax refund \u2014 not a paycheck, no \u201cmonth\u201d attached. ${person} decides it must cover the next ${days} days: needs $${needs}, savings move $${save}. What is the call?`,
      choices:[
        {label:`Run the full routine: safe = $${safe}, pace $${pace}/day for ${days} days`, ok:true},
        {label:`Spend it freely \u2014 refunds are bonus money, the routine is for paychecks`, ok:false, mis:'fund-is-plan'},
        {label:`Pace the whole $${refund} at $${(refund/days).toFixed(2)}/day \u2014 skip needs and savings, it is extra`, ok:false},
        {label:`Save all $${refund} and live on nothing for ${days} days`, ok:false, mis:'miss-means-fail'}],
      hint:'The routine triggers on money arriving OR a big decision looming. A refund is money arriving.',
      good:`Right: the routine does not care where money comes from. $${refund} \u2212 $${needs} \u2212 $${save} = $${safe}; $${safe} \u00f7 ${days} = $${pace}/day.`,
      bad:'\u201cBonus money\u201d is how refunds evaporate in a week. The routine applies to every arrival \u2014 paycheck, refund, or windfall.',
      why:'Transfer test: the routine is portable. Any money, any source \u2014 available, needs, savings, pace.'};
  }},
{ id:'decision-routine-decide-06', verb:'decide', part:8, tier:'stretch', skill:'decision-routine',
  gen:(v)=>{
    const person=v.person();
    const total=1400, weeks=6, days=42;
    const needs=800, save=120, safe=total-needs-save, pace=+(safe/days).toFixed(2);
    return {
      q:`Novel case: ${person} earns $${total} from gig work spread unevenly over ${weeks} weeks (${days} days). Needs total $${needs}, savings move $${save}. Pay arrives in random chunks. What is the call?`,
      choices:[
        {label:`Pace the totals: $${safe} safe \u00f7 ${days} days = $${pace}/day, and never spend a chunk before it arrives`, ok:true},
        {label:'Spend each chunk as it arrives \u2014 paced money is for steady paychecks', ok:false},
        {label:`Pace only the first $${total/weeks|0} chunk and hope the rest comes`, ok:false, mis:'optimistic-plan'},
        {label:'Skip the savings move \u2014 irregular income cannot be saved', ok:false}],
      hint:'The routine paces totals over time. What are the totals here \u2014 and what rule covers unarrived chunks?',
      good:`Right: totals are known ($${safe} over ${days} days = $${pace}/day) even when timing is not. Unarrived money is not available \u2014 step 1 still rules.`,
      bad:'Spending chunks on arrival is pacing by mood. The routine paces the known totals and treats unarrived money as $0.',
      why:'Transfer test: irregular income still has totals and a time span. Pace those; let the chunks land when they land.'};
  }},
{ id:'decision-routine-decide-07', verb:'decide', part:8, tier:'stretch', skill:'decision-routine',
  gen:(v)=>{
    const person=v.person();
    const old=350, jump=180, total=old+jump;
    const avail=900, save=60, days=18;
    const safe=avail-total-save, pace=+(safe/days).toFixed(2);
    return {
      q:`Novel case: mid-month, ${person}\u2019s roommate moves out \u2014 rent share jumps from $${old} to $${total} (+$${jump}). $${avail} available, ${days} days left, savings move $${save}. What is the call?`,
      choices:[
        {label:`Re-run the routine now: needs $${total}, safe $${safe}, new pace $${pace}/day for ${days} days`, ok:true},
        {label:'Keep the old pace \u2014 the month is half over anyway', ok:false},
        {label:'Cover the extra rent from the emergency buffer', ok:false, mis:'emergency-as-savings'},
        {label:'Stop the savings move to \u201cmake room\u201d', ok:false}],
      hint:'A mid-month shock means step 7 plus a full re-run. What are the new needs?',
      good:`Right: new needs $${total} change everything downstream \u2014 safe $${safe}, pace $${pace}/day. The routine re-runs whenever reality changes.`,
      bad:'The old pace priced the old rent. And the buffer is for surprises, not for a known higher bill \u2014 the re-run absorbs it honestly.',
      why:'Transfer test: the routine is not a monthly ritual \u2014 it is a tool you re-run the moment the inputs change.'};
  }},
{ id:'decision-routine-decide-08', verb:'decide', part:8, tier:'stretch', skill:'decision-routine',
  gen:(v)=>{
    const person=v.person();
    const extra=300, avail=1150, needs=640, save=90, days=24;
    const safe=avail+extra-needs-save, pace=+(safe/days).toFixed(2);
    return {
      q:`Novel case: December brings ${person} $${extra} extra income \u2014 and heavy gift pressure. Base: $${avail} available, needs $${needs}, savings $${save}, ${days} days. What is the call?`,
      choices:[
        {label:`Fold it into the routine: safe $${safe}, pace $${pace}/day \u2014 gifts live inside the pace like any want`, ok:true},
        {label:'Treat the extra as gift-only money outside the routine', ok:false, mis:'fund-fungibility'},
        {label:'Spend the extra first, then run the routine on what is left', ok:false},
        {label:'Skip savings this month \u2014 December is special', ok:false, mis:'close-enough'}],
      hint:'Extra income is still income. Where does the routine put wants?',
      good:`Right: $${extra} joins available money, the routine re-prices everything \u2014 $${pace}/day \u2014 and gifts compete inside the pace like any other want.`,
      bad:'Money outside the routine is money unprotected. December does not suspend step 4; gifts are wants and wants live in the pace.',
      why:'Transfer test: seasons change, pressure changes, the routine does not. Every dollar enters through step 1.'};
  }},
// ---- spot (6): part 6 — critique broken routines ----
{ id:'decision-routine-spot-01', verb:'spot', part:6, tier:'independent', skill:'decision-routine',
  gen:(v)=>{
    const person=v.person();
    const balance=Math.round(v.cents(700,900));
    const pending=Math.round(v.cents(90,130));
    return {
      scenario:`<p>${person}\u2019s \u201croutine\u201d this month:</p><ul><li>Balance: $${balance} \u2192 paced as if all available</li><li>Pending charges: $${pending} \u2014 \u201cI\u2019ll deal with those when they post\u201d</li><li>Result: overdrawn on day 9</li></ul>`,
      q:'What is the mistake here?',
      choices:[
        {label:'Skipped step 1 \u2014 paced the balance instead of available money', ok:true},
        {label:'The balance was too small', ok:false},
        {label:'Pacing over a whole month', ok:false},
        {label:'There is no mistake \u2014 pending charges are unpredictable', ok:false, mis:'surprises-unplannable'}],
      hint:'What was already spoken for before the pacing started?',
      good:`Right: $${pending} pending was already spent. Pacing $${balance} meant overspending from day one \u2014 the overdraft was scheduled, not surprising.`,
      bad:'Pending charges are visible and subtractable. Step 1 exists precisely so the pace never includes spoken-for money.',
      why:'Critique the order, not just the math: a routine run out of order is a broken routine.'};
  }},
{ id:'decision-routine-spot-02', verb:'spot', part:6, tier:'independent', skill:'decision-routine',
  gen:(v)=>{
    const person=v.person();
    return {
      scenario:`<p>${person}\u2019s monthly \u201csystem\u201d:</p><ul><li>Needs: protected</li><li>Wants: spent freely from the pace</li><li>Savings move: \u201cwhatever is left\u201d \u2014 always $0</li><li>Emergency fund after a year: $0</li></ul>`,
      q:'What is the mistake here?',
      choices:[
        {label:'Savings never got its step \u2014 \u201cwhatever is left\u201d is always nothing', ok:true},
        {label:'Protecting needs first', ok:false},
        {label:'Spending wants from the pace', ok:false},
        {label:'There is no mistake \u2014 a year is too short to judge', ok:false, mis:'close-enough'}],
      hint:'Which step is missing, and what fills its place?',
      good:'Right: step 4 (savings next) was replaced with \u201cleftovers.\u201d Spending expands to fill the pace \u2014 savings must move before wants, not after.',
      bad:'The wants were not the problem; the missing savings step was. A year of $0 proves \u201cleftovers\u201d is not a strategy.',
      why:'The routine\u2019s order IS the strategy. Demote savings to last and it never happens.'};
  }},
{ id:'decision-routine-spot-03', verb:'spot', part:6, tier:'independent', skill:'decision-routine',
  gen:(v)=>{
    const person=v.person();
    return {
      scenario:`<p>${person} overspent by $120 mid-month, then:</p><ul><li>Re-paced from the ORIGINAL monthly plan</li><li>New \u201cpace\u201d: generous and comfortable</li><li>Ran out of money 5 days early</li></ul>`,
      q:'What is the mistake here?',
      choices:[
        {label:'Re-paced from the original plan instead of what remains \u2014 step 7 violated', ok:true},
        {label:'Overspending in the first place', ok:false, mis:'miss-means-fail'},
        {label:'Re-pacing at all', ok:false},
        {label:'There is no mistake \u2014 the plan is the plan', ok:false}],
      hint:'Can the original plan\u2019s money still be spent?',
      good:'Right: the original plan described already-spent money. The \u201cgenerous\u201d re-pace was fiction \u2014 reality ran out 5 days early.',
      bad:'Step 7: recalculate from what remains \u2014 never from the original plan. The plan is a memory; the balance is the budget.',
      why:'A broken routine often looks like a working one until the money runs out. Check which numbers are real.'};
  }},
{ id:'decision-routine-spot-04', verb:'spot', part:6, tier:'independent', skill:'decision-routine',
  gen:(v)=>{
    const person=v.person();
    const monthly=Math.round(v.cents(1100,1400));
    return {
      scenario:`<p>${person} gets $${monthly} for the month, then:</p><ul><li>Skipped \u201chow long?\u201d \u2014 never set a time span</li><li>Spends like it is weekly money</li><li>Broke by week 2, every month</li></ul>`,
      q:'What is the mistake here?',
      choices:[
        {label:'Skipped step 2 \u2014 money without a time span has no pace', ok:true},
        {label:`$${monthly} is not enough for a month`, ok:false},
        {label:'Spending weekly instead of daily', ok:false},
        {label:'There is no mistake \u2014 some months are just hard', ok:false, mis:'surprises-unplannable'}],
      hint:'Pace = safe money \u00f7 WHAT?',
      good:`Right: without \u201chow long,\u201d there is no denominator \u2014 so there is no pace, just spending until it stops.`,
      bad:'Step 2 (How long?) turns money into a pace. Skip it and every dollar feels spendable today \u2014 because nothing says otherwise.',
      why:'\u201cHow long must it last\u201d is the question that creates the speed limit. No question, no limit.'};
  }},
{ id:'decision-routine-spot-05', verb:'spot', part:6, tier:'independent', skill:'decision-routine',
  gen:(v)=>{
    const person=v.person();
    const deals=v.pick([3,4]);
    return {
      scenario:`<p>${person}\u2019s week:</p><ul><li>Saw ${deals} \u201cdeals,\u201d bought all ${deals}</li><li>Asked \u201cwas I going to buy it anyway?\u201d \u2014 zero times</li><li>Pace: destroyed by Thursday</li></ul>`,
      q:'What is the mistake here?',
      choices:[
        {label:'Skipped step 6 \u2014 no spend-smart test, so every discount became spending', ok:true},
        {label:`Buying ${deals} items instead of 2`, ok:false},
        {label:'Shopping more than once a week', ok:false},
        {label:'There is no mistake \u2014 deals save money by definition', ok:false, mis:'close-enough'}],
      hint:'Which single question would have filtered these purchases?',
      good:'Right: \u201cwas I going to buy it anyway?\u201d asked zero times means zero filters. The pace never stood a chance.',
      bad:'Deals do not save money on things you were never buying. Step 6 is the filter \u2014 skipping it floods the budget.',
      why:'Critique the missing filter, not the shopping itself. One question protects the entire pace.'};
  }},
{ id:'decision-routine-spot-06', verb:'spot', part:6, tier:'independent', skill:'decision-routine',
  gen:(v)=>{
    const person=v.person();
    const fun=v.money(Math.round(v.cents(150,250)));
    return {
      scenario:`<p>${person}\u2019s month:</p><ul><li>Emergency fund: $500 \u2192 $350</li><li>Reason: \u201cborrowed\u201d ${fun} for concert tickets and food delivery</li><li>Payback plan: none written down</li></ul>`,
      q:'What is the mistake here?',
      choices:[
        {label:'Raided the emergency fund for wants \u2014 routine money and fund money got mixed', ok:true},
        {label:'Having an emergency fund at all', ok:false},
        {label:'Going to concerts', ok:false},
        {label:'There is no mistake \u2014 the fund is just savings', ok:false, mis:'emergency-as-savings'}],
      hint:'Which bucket were the tickets supposed to come from?',
      good:`Right: wants come from the pace, not the fund. ${fun} of \u201cborrowed\u201d fund money is ${fun} of missing emergency protection.`,
      bad:'The fund is not a second spending account. Concert tickets are pace money \u2014 the fund never enters the picture.',
      why:'Bucket discipline is the routine\u2019s immune system. Mix the buckets and every protection fails at once.'};
  }},
// ---- compare (6): part 6 ----
{ id:'decision-routine-compare-01', verb:'compare', part:6, tier:'independent', skill:'decision-routine',
  gen:(v)=>{
    const person=v.person();
    const balance=Math.round(v.cents(800,1000));
    const claims=Math.round(v.cents(180,260));
    const avail=balance-claims;
    return {
      context:`<p><b>Method A:</b> Pace from the $${balance} balance.</p><p><b>Method B:</b> Pace from $${avail} (balance minus $${claims} scheduled, pending, promised).</p>`,
      q:`Which pace keeps ${person} safe?`,
      choices:[
        {label:`Method B \u2014 it paces money ${person} actually has`, ok:true},
        {label:`Method A \u2014 the balance is the official number`, ok:false},
        {label:'Method A \u2014 pending charges might not post', ok:false, mis:'optimistic-plan'},
        {label:'They are the same \u2014 subtraction is a formality', ok:false, mis:'close-enough'}],
      hint:'Which method\u2019s money is already spoken for?',
      good:`Right: Method A paces $${claims} of ghost money. Method B\u2019s $${avail} is real \u2014 the pace survives contact with reality.`,
      bad:`Method A\u2019s pace spends the $${claims} twice \u2014 once in the pace, once when the claims post. Subtraction is not a formality.`,
      why:'Compare methods by what they assume: Method B assumes the claims are real, because they are.'};
  }},
{ id:'decision-routine-compare-02', verb:'compare', part:6, tier:'independent', skill:'decision-routine',
  gen:(v)=>{
    const person=v.person();
    return {
      context:'<p><b>Method A:</b> After overspending, re-pace from what remains.</p><p><b>Method B:</b> After overspending, re-pace from the original plan.</p>',
      q:'Which method recovers the month?',
      choices:[
        {label:'Method A \u2014 only remaining money can be paced', ok:true},
        {label:'Method B \u2014 the plan is the commitment', ok:false},
        {label:'Method B \u2014 it is more optimistic', ok:false, mis:'optimistic-plan'},
        {label:'Neither \u2014 overspending ends the routine', ok:false, mis:'miss-means-fail'}],
      hint:'Which method\u2019s dollars still exist?',
      good:'Right: Method A paces real dollars. Method B paces a memory \u2014 comfortable, fictional, and broke five days early.',
      bad:'The original plan\u2019s money is gone. Method B is nostalgia with a spreadsheet; Method A is a working budget.',
      why:'Step 7 is a reality rule: remains are plannable, plans are history.'};
  }},
{ id:'decision-routine-compare-03', verb:'compare', part:6, tier:'independent', skill:'decision-routine',
  gen:(v)=>{
    const person=v.person();
    const save=v.money(v.pick([50,60,75]));
    return {
      context:`<p><b>Method A:</b> Move the ${save} savings first, then pace the rest.</p><p><b>Method B:</b> Pace everything, save \u201cwhatever is left.\u201d</p>`,
      q:`Which method builds ${person}\u2019s future?`,
      choices:[
        {label:`Method A \u2014 the ${save} is guaranteed; the future gets fed every payday`, ok:true},
        {label:'Method B \u2014 leftovers are more honest', ok:false},
        {label:'Method B \u2014 saving first is too rigid', ok:false, mis:'fund-is-plan'},
        {label:'They are equal \u2014 the same money moves either way', ok:false, mis:'close-enough'}],
      hint:'How much is \u201cwhatever is left\u201d at month end \u2014 usually?',
      good:`Right: Method B\u2019s leftovers are reliably $0. Method A\u2019s ${save} moves before spending can claim it.`,
      bad:'\u201cWhatever is left\u201d is not a savings strategy \u2014 it is a $0 strategy with good intentions. Order decides the outcome.',
      why:'Compare by outcome, not intention: first-place savings compounds; last-place savings evaporates.'};
  }},
{ id:'decision-routine-compare-04', verb:'compare', part:6, tier:'independent', skill:'decision-routine',
  gen:(v)=>{
    const person=v.person();
    return {
      context:'<p><b>Routine A:</b> Needs protected, then savings, then wants inside the pace.</p><p><b>Routine B:</b> Wants first, needs from whatever is left.</p>',
      q:'Which routine survives a full month?',
      choices:[
        {label:'Routine A \u2014 required costs are covered before optional ones compete', ok:true},
        {label:'Routine B \u2014 happiness first keeps you motivated', ok:false},
        {label:'Routine B \u2014 needs are flexible', ok:false},
        {label:'They are the same \u2014 money is money', ok:false, mis:'close-enough'}],
      hint:'Which routine\u2019s rent is guaranteed?',
      good:'Right: Routine A\u2019s rent is protected on day one. Routine B\u2019s rent competes with every want all month \u2014 and loses.',
      bad:'Wants expand to fill available money; needs do not shrink to fit leftovers. Order is survival.',
      why:'The routine\u2019s sequence is a priority list made executable: needs, future, wants. Reverse it and it breaks.'};
  }},
{ id:'decision-routine-compare-05', verb:'compare', part:6, tier:'independent', skill:'decision-routine',
  gen:(v)=>{
    const person=v.person();
    return {
      context:'<p><b>Shopper A:</b> Sees a 40% off deal, asks \u201cwas I going to buy it anyway?\u201d \u2014 answer: no. Walks away.</p><p><b>Shopper B:</b> Sees the same deal, buys it \u2014 \u201csaving 40%!\u201d</p>',
      q:`Who spent smarter, ${person}\u2019s way of thinking?`,
      choices:[
        {label:'Shopper A \u2014 spent $0 on an unplanned item; the \u201csavings\u201d were imaginary', ok:true},
        {label:'Shopper B \u2014 40% off is 40% off', ok:false},
        {label:'Shopper B \u2014 the deal might not come back', ok:false, mis:'close-enough'},
        {label:'They are equal \u2014 both thought about it', ok:false}],
      hint:'What did each shopper actually spend?',
      good:'Right: A spent $0. B spent 60% of the price on something unplanned \u2014 that is not saving, that is spending with a coupon.',
      bad:'40% off an unplanned purchase is 60% spent unnecessarily. The test \u2014 \u201cwas I going to buy it anyway\u201d \u2014 is the whole difference.',
      why:'Step 6 filters deals through intent. Without the question, every discount is a trap.'};
  }},
{ id:'decision-routine-compare-06', verb:'compare', part:6, tier:'independent', skill:'decision-routine',
  gen:(v)=>{
    const person=v.person();
    return {
      context:'<p><b>Pattern A:</b> $30/day, steady, all month.</p><p><b>Pattern B:</b> $200 weekend blowout, then $0 weekdays \u2014 \u201caverages $30/day.\u201d</p>',
      q:'Which pattern actually works?',
      choices:[
        {label:'Pattern A \u2014 the pace is a daily speed limit, not a monthly average', ok:true},
        {label:'Pattern B \u2014 the math averages out', ok:false, mis:'close-enough'},
        {label:'Pattern B \u2014 weekends deserve it', ok:false},
        {label:'They are identical \u2014 $30/day is $30/day', ok:false}],
      hint:'What happens on the weekdays of Pattern B?',
      good:'Right: Pattern B starves five days to fund two. A pace is per-day protection \u2014 averaging destroys it.',
      bad:'\u201cAverages $30/day\u201d still means $0 food days. The pace protects every day, not the average day.',
      why:'Pace is a speed limit, not an average speed. Blowouts break the days around them.'};
  }},
// ---- predict (6): part 7 x2, part 8 x4 stretch (novel) ----
{ id:'decision-routine-predict-01', verb:'predict', part:7, tier:'independent', skill:'decision-routine',
  gen:(v)=>{
    const person=v.person();
    const save=v.money(v.pick([40,50,60]));
    return {
      q:`${person} skips the ${save} savings move for 6 months to cover takeout. Then the car needs a $350 repair. What happens?`,
      choices:[
        {label:'Card debt \u2014 6 skipped moves = ~$1,200 of buffer that never existed, so the repair goes on credit', ok:true},
        {label:'Nothing \u2014 takeout was worth it', ok:false},
        {label:'The repair waits \u2014 cars understand budgeting', ok:false},
        {label:'The savings appear retroactively \u2014 intent counts', ok:false, mis:'guilt-is-budgeting'}],
      hint:'Add up 6 months of skipped moves. What would that have covered?',
      good:'Right: ~$1,200 of skipped buffer would have swallowed the $350 repair. Instead it is $350 plus interest.',
      bad:'Six months of \u201cjust takeout\u201d deleted the fund that would have handled this exact repair. The card charges tuition.',
      why:'Skipped savings do not vanish quietly \u2014 they reappear as debt the next time a surprise arrives.'};
  }},
{ id:'decision-routine-predict-02', verb:'predict', part:7, tier:'independent', skill:'decision-routine',
  gen:(v)=>{
    const person=v.person();
    return {
      q:`${person} overspends early, keeps pacing from the original plan, and never re-calculates. What does the end of the month look like?`,
      choices:[
        {label:'Broke days early \u2014 the \u201cpace\u201d was pacing money already spent', ok:true},
        {label:'Fine \u2014 the original plan was solid', ok:false},
        {label:'A surplus \u2014 pacing from the plan creates extra money', ok:false, mis:'optimistic-plan'},
        {label:'Nothing changes \u2014 plans are self-correcting', ok:false}],
      hint:'What was the pace actually dividing?',
      good:'Right: the pace divided money that no longer existed. Reality collects the difference \u2014 about five days early.',
      bad:'A pace built on spent money is a countdown to zero that nobody is watching. Step 7 would have caught it.',
      why:'Uncorrected plans fail on schedule. The re-pace is the routine\u2019s early-warning system.'};
  }},
{ id:'decision-routine-predict-03', verb:'predict', part:8, tier:'stretch', skill:'decision-routine',
  gen:(v)=>{
    const person=v.person();
    const raise=v.money(Math.round(v.cents(150,250)));
    return {
      q:`Novel case: ${person} gets a ${raise}/month raise but keeps running the old pace and old savings move. What happens over a year?`,
      choices:[
        {label:'The extra drifts into unpaced spending \u2014 unless the routine re-runs, raises evaporate', ok:true},
        {label:'Automatic wealth \u2014 raises save themselves', ok:false, mis:'optimistic-plan'},
        {label:'The pace breaks \u2014 old paces cannot handle new money', ok:false},
        {label:'Nothing \u2014 raises do not affect routines', ok:false}],
      hint:'Where does unpaced money go?',
      good:'Right: money without a pace finds wants. A year of \u201cextra\u201d with no re-run = a year of lifestyle creep, $0 extra saved.',
      bad:'Raises do not save themselves \u2014 spending expands to fill them. The routine must re-run to capture the raise into savings.',
      why:'Transfer test: the routine is not set-and-forget. New inputs \u2014 even good ones \u2014 demand a re-run.'};
  }},
{ id:'decision-routine-predict-04', verb:'predict', part:8, tier:'stretch', skill:'decision-routine',
  gen:(v)=>{
    const person=v.person();
    return {
      q:`Novel case: ${person} starts a side gig earning variable income but never re-runs the routine \u2014 the old paycheck pace stays. What happens?`,
      choices:[
        {label:'Two money systems collide \u2014 gig cash gets spent whole while the old pace starves', ok:true},
        {label:'Double savings \u2014 extra income automatically doubles the fund', ok:false, mis:'optimistic-plan'},
        {label:'Nothing \u2014 the old pace covers all income', ok:false},
        {label:'The gig income cancels out \u2014 new money, new spending, net zero forever', ok:false}],
      hint:'Which dollars does the old pace know about?',
      good:'Right: the old pace prices the old paycheck. Gig money arrives outside the routine \u2014 unpaced, unprotected, spent.',
      bad:'Income the routine never sees is income the routine never protects. Re-run with the new totals or the gig funds lifestyle, not the future.',
      why:'Transfer test: every new income stream must enter through step 1. Money outside the routine is money unbudgeted.'};
  }},
{ id:'decision-routine-predict-05', verb:'predict', part:8, tier:'stretch', skill:'decision-routine',
  gen:(v)=>{
    const person=v.person();
    const drop=v.money(Math.round(v.cents(120,200)));
    return {
      q:`Novel case: ${person} moves to a cheaper apartment, saving ${drop}/month on rent \u2014 but keeps the old \u201cneeds\u201d number in the routine. What happens?`,
      choices:[
        {label:`The ${drop} becomes invisible extra \u2014 absorbed by wants unless the routine re-prices needs`, ok:true},
        {label:'Automatic savings \u2014 cheaper rent saves itself', ok:false, mis:'optimistic-plan'},
        {label:'The routine breaks \u2014 it cannot handle lower needs', ok:false},
        {label:'Nothing \u2014 needs numbers are permanent', ok:false, mis:'numbers-permanent'}],
      hint:'If needs are overstated, where does the phantom money go?',
      good:`Right: the routine still \u201cprotects\u201d the old rent number, so ${drop} hides inside needs and leaks into spending. Re-price needs, capture the win.`,
      bad:'Cheaper rent only saves money if the routine knows about it. Otherwise the old needs number shelters the savings from ever reaching savings.',
      why:'Transfer test: the routine\u2019s inputs must match reality. Stale inputs \u2014 even favorable ones \u2014 leak money.'};
  }},
{ id:'decision-routine-predict-06', verb:'predict', part:8, tier:'stretch', skill:'decision-routine',
  gen:(v)=>{
    const person=v.person();
    return {
      q:`Novel case: ${person} teaches the routine to a sibling, who skips step 1 (\u201cAvailable?\u201d) but does everything else perfectly. What breaks first?`,
      choices:[
        {label:'The pace \u2014 built on the balance instead of available money, it overspends from day one', ok:true},
        {label:'Nothing \u2014 step 1 is optional for beginners', ok:false},
        {label:'The savings move \u2014 it cannot work without step 1', ok:false},
        {label:'The sibling\u2019s motivation \u2014 routines need all 7 steps to feel good', ok:false}],
      hint:'Which step\u2019s numbers does every later step compute from?',
      good:'Right: every later step \u2014 needs, savings, pace \u2014 divides money that pending charges already claimed. The failure cascades from step 1.',
      bad:'Step 1 is the foundation: all downstream math inherits its error. Skip it and the whole routine computes on a fantasy.',
      why:'Transfer test: teaching reveals the load-bearing step. Step 1\u2019s subtraction protects every step after it.'};
  }},
// ---- build (5): part 7 — construct a personal routine ----
{ id:'decision-routine-build-01', verb:'build', part:7, tier:'independent', skill:'decision-routine',
  gen:(v)=>({ h:'Build it: run the routine on $600',
    body:'<p>$600 for the month. Needs are $350. Split it the routine\u2019s way: needs, savings, wants.</p>',
    totalDollars:600, buckets:[{id:'needs',label:'Needs'},{id:'savings',label:'Savings'},{id:'wants',label:'Wants'}],
    targets:{needs:350, savings:60, wants:190},
    hint:'Needs first, savings next (step 4), wants get the paced remainder.',
    good:'Needs $350, savings $60, wants $190. The routine in one split \u2014 then $190 \u00f7 days is the pace.',
    bad:'Order matters: needs, then savings, then wants. The savings move happens before wants, not from leftovers.',
    why:'Building the split IS the routine: protect, move, pace. Every payday, same order.' })},
{ id:'decision-routine-build-02', verb:'build', part:7, tier:'independent', skill:'decision-routine',
  gen:(v)=>({ h:'Build it: run the routine on $900',
    body:'<p>$900 for the month. Needs are $520. Split it: needs, savings, wants.</p>',
    totalDollars:900, buckets:[{id:'needs',label:'Needs'},{id:'savings',label:'Savings'},{id:'wants',label:'Wants'}],
    targets:{needs:520, savings:90, wants:290},
    hint:'Bigger paycheck, same order: needs, savings, wants.',
    good:'Needs $520, savings $90, wants $290. The routine scales \u2014 the order never changes.',
    bad:'Same steps at every size: protect needs, move savings, pace the rest. Size changes the numbers, not the order.',
    why:'The routine is size-independent. $900 or $300 \u2014 needs, savings, wants, pace.' })},
{ id:'decision-routine-build-03', verb:'build', part:7, tier:'independent', skill:'decision-routine',
  gen:(v)=>({ h:'Build it: run the routine on $450',
    body:'<p>A tight month: $450. Needs are $280. Split it: needs, savings, wants.</p>',
    totalDollars:450, buckets:[{id:'needs',label:'Needs'},{id:'savings',label:'Savings'},{id:'wants',label:'Wants'}],
    targets:{needs:280, savings:45, wants:125},
    hint:'Tight months still move savings \u2014 smaller, not zero.',
    good:'Needs $280, savings $45, wants $125. Even tight months feed the future \u2014 the move shrinks, it never disappears.',
    bad:'Skipping savings in tight months is when the buffer is needed most. Shrink the move; do not delete it.',
    why:'The routine holds in tight months because the habit \u2014 not the amount \u2014 is the point.' })},
{ id:'decision-routine-build-04', verb:'build', part:7, tier:'independent', skill:'decision-routine',
  gen:(v)=>({ h:'Build it: run the routine on $1,200',
    body:'<p>A strong month: $1,200. Needs are $700. Split it: needs, savings, wants.</p>',
    totalDollars:1200, buckets:[{id:'needs',label:'Needs'},{id:'savings',label:'Savings'},{id:'wants',label:'Wants'}],
    targets:{needs:700, savings:120, wants:380},
    hint:'Strong months are where buffers get built fast \u2014 if the routine runs.',
    good:'Needs $700, savings $120, wants $380. Strong months accelerate the future \u2014 but only through the same steps.',
    bad:'Big months tempt big skipping. The routine does not care about the size \u2014 needs, savings, wants, every time.',
    why:'Windfall months build buffers fastest \u2014 but only if the split happens before the spending starts.' })},
{ id:'decision-routine-build-05', verb:'build', part:7, tier:'independent', skill:'decision-routine',
  gen:(v)=>({ h:'Build it: run the routine on $300 a week',
    body:'<p>$300 for the week. Needs are $180. Split it: needs, savings, wants.</p>',
    totalDollars:300, buckets:[{id:'needs',label:'Needs'},{id:'savings',label:'Savings'},{id:'wants',label:'Wants'}],
    targets:{needs:180, savings:30, wants:90},
    hint:'Weekly money gets the weekly routine \u2014 same steps, shorter span.',
    good:'Needs $180, savings $30, wants $90. Weekly routine, weekly protection \u2014 the pace is $90 \u00f7 7.',
    bad:'Weekly pay still runs all 7 steps \u2014 just on a 7-day span. Shorter time, same order.',
    why:'The routine is span-independent: month, week, or gig stretch \u2014 available, needs, savings, pace.' })},
// ---- explain (5): part 8 stretch — teach the whole routine back ----
{ id:'decision-routine-explain-01', verb:'explain', part:8, tier:'stretch', skill:'decision-routine',
  gen:(v)=>({ h:'Teach it back: the whole routine',
    prompt:'Explain the full NWS decision routine in your own words, in order.',
    keyPoints:['Start with available money: balance minus scheduled, pending, promised','Protect needs, then move savings, then pace the rest over the time span','If you overspend, re-pace from what remains \u2014 never from the plan'],
    modelAnswer:'First find available money: balance minus everything already claimed. Then protect needs, move savings next, and pace what is safe over the days it must last. Spend smart with the \u201cwas I going to buy it anyway\u201d test. If you overspend, throw out the old pace and re-pace from what remains.',
    hint:'Available \u2192 needs \u2192 savings \u2192 pace \u2192 spend smart \u2192 re-pace.' })},
{ id:'decision-routine-explain-02', verb:'explain', part:8, tier:'stretch', skill:'decision-routine',
  gen:(v)=>({ h:'Teach it back: why re-pace from remains?',
    prompt:'Explain in your own words why the routine says to recalculate from what remains \u2014 never from the original plan.',
    keyPoints:['The original plan describes money that is already spent','Only remaining money can actually be paced','Re-pacing from remains keeps the plan honest instead of fictional'],
    modelAnswer:'The original plan was built on money you already spent \u2014 pacing from it is pacing a memory. What remains is the only real money left, so the new pace must divide that. It feels stricter because it is honest; the old plan would just run out early.',
    hint:'Which dollars still exist?' })},
{ id:'decision-routine-explain-03', verb:'explain', part:8, tier:'stretch', skill:'decision-routine',
  gen:(v)=>({ h:'Teach it back: safe money \u00f7 time',
    prompt:'A friend starts their first job. Explain \u201csafe money \u00f7 time\u201d to them.',
    keyPoints:['Safe money = what is left after needs and the savings move','Divide it by the days it must last','The result is a daily speed limit, not a suggestion'],
    modelAnswer:'Safe money is what is left after you protect needs and move savings \u2014 that is the only money allowed to be spent. Divide it by the days until next payday. The answer is your daily speed limit: spend under it and the money lasts; the routine just makes the limit visible.',
    hint:'What two numbers go into the division?' })},
{ id:'decision-routine-explain-04', verb:'explain', part:8, tier:'stretch', skill:'decision-routine',
  gen:(v)=>({ h:'Teach it back: why savings before wants?',
    prompt:'Explain in your own words why savings comes before wants in the routine.',
    keyPoints:['Spending expands to fill whatever is available \u2014 leftovers are always $0','Moving savings first guarantees the future gets fed','Order is the mechanism, not a preference'],
    modelAnswer:'If savings waits for leftovers, it gets nothing \u2014 spending always expands to fill the pace. Moving savings before wants is the only guarantee the future gets paid. It is not about caring more; it is about sequencing: first place always beats last place.',
    hint:'What is \u201cwhatever is left\u201d at month end \u2014 usually?' })},
{ id:'decision-routine-explain-05', verb:'explain', part:8, tier:'stretch', skill:'decision-routine',
  gen:(v)=>({ h:'Teach it back: routine on a tax refund',
    prompt:'A friend gets a $900 tax refund and says \u201cthe routine is for paychecks.\u201d Teach them the routine applied to the refund.',
    keyPoints:['The routine triggers on any money arriving \u2014 source does not matter','Same steps: available, needs, savings, pace over the days it must cover','Bonus money without the routine evaporates; with it, it builds'],
    modelAnswer:'The routine does not care where money comes from \u2014 it triggers whenever money arrives. So: is the $900 all available, what needs must it cover and for how many days, move savings first, then pace the rest daily. \u201cBonus money\u201d without the routine is gone in a week; with it, the refund builds the buffer.',
    hint:'What triggers the routine \u2014 paychecks, or money arriving?' })},
]
};
