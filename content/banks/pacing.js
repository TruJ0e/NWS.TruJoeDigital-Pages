// NWS variation bank: pacing — 50 confirmed templates per lesson.
// Module: Make Money Last. Verb spread per lesson: choice 8, sort 6, decide 8,
// spot 6, compare 6, predict 6, build 5, explain 5. Tier: guided on part-3
// templates (cue included), stretch on part-8, independent elsewhere.
export const BANK_PACING = {
'pacing-basics': [
{id:'pacing-basics-choice-01', verb:'choice', part:1, tier:'independent', skill:'pacing-basics',
 gen:(v)=>{
  return {
   q:`What does it mean to pace your money?`,
   choices:[
    {label:'Split flexible money across the time it must cover, so it lasts', ok:true},
    {label:'Add extra money to your account every week', ok:false, mis:'pace-math'},
    {label:'Save all of it and never spend any', ok:false, mis:'no-pace-needed'},
    {label:'Spend it all on day one and start fresh next month', ok:false}],
   hint:'Think: money divided by time.',
   good:'Pacing spreads what you have across the weeks it must last.',
   bad:'Pacing is not adding money or freezing it. It is dividing by time.',
   why:'A lump of money has to survive a stretch of time. Pacing is the division that makes it fit.'};
 }},
{id:'pacing-basics-choice-02', verb:'choice', part:1, tier:'independent', skill:'pacing-basics',
 gen:(v)=>{
  const person=v.person();
  return {
   q:`${person} gets a paycheck. Which money does the pace get calculated from?`,
   choices:[
    {label:'The flexible money, after Needs and Savings are protected', ok:true},
    {label:'The whole paycheck, every dollar', ok:false, mis:'total-is-safe'},
    {label:'The savings, since savings is the safest money', ok:false, mis:'savings-doesnt-touch-spending'},
    {label:'Just the cash in the wallet, ignoring the account', ok:false}],
   hint:'Some money already has a job.',
   good:'Needs and savings get protected first. Only the flexible remainder gets a pace.',
   bad:'Pacing the whole paycheck paces money that already belongs to rent or goals.',
   why:'Flexible money \u00f7 time remaining = pace. Never pace money with a job.'};
 }},
{id:'pacing-basics-choice-03', verb:'choice', part:1, tier:'independent', skill:'pacing-basics',
 gen:(v)=>{
  const person=v.person();
  return {
   q:`${person} has a $50/week pace and spends $38 this week. How did the week go?`,
   choices:[
    {label:'Under pace \u2014 great, the money will last longer', ok:true},
    {label:'Failed \u2014 the pace is a target and must be hit exactly', ok:false, mis:'pace-math'},
    {label:'Wasted \u2014 the unspent $12 disappears', ok:false},
    {label:'Behind \u2014 the $12 has to be spent next week to catch up', ok:false, mis:'no-pace-needed'}],
   hint:'The pace is a speed limit, not a target.',
   good:'Under the pace means the money stretches further. Nothing is lost.',
   bad:'You do not owe the pace $12. It caps spending; it never demands it.',
   why:'The pace is a ceiling, not a quota. Under is always fine.'};
 }},
{id:'pacing-basics-choice-04', verb:'choice', part:1, tier:'independent', skill:'pacing-basics',
 gen:(v)=>{
  const person=v.person();
  return {
   q:`${person} has $200 to last 4 weeks. Which person is pacing?`,
   choices:[
    {label:'The one spending about $50 a week', ok:true},
    {label:'The one spending $200 in week one and $0 after', ok:false, mis:'no-pace-needed'},
    {label:'The one spending $25 a week and saving nothing', ok:false},
    {label:'The one hiding the $200 in a drawer until week four', ok:false}],
   hint:'Pace = total \u00f7 weeks.',
   good:'$200 \u00f7 4 = $50/week. Steady and even is pacing.',
   bad:'All-at-once or nothing-at-all are both the opposite of a pace.',
   why:'Pacing evens spending out across the whole stretch of time.'};
 }},
{id:'pacing-basics-choice-05', verb:'choice', part:1, tier:'independent', skill:'pacing-basics',
 gen:(v)=>{
  return {
   q:`Which math gives a weekly pace?`,
   choices:[
    {label:'Flexible money \u00f7 weeks remaining', ok:true},
    {label:'Weeks remaining \u00f7 flexible money', ok:false, mis:'pace-math'},
    {label:'Flexible money + weeks remaining', ok:false, mis:'pace-math'},
    {label:'Whole paycheck \u00f7 weeks, ignoring needs', ok:false, mis:'total-is-safe'}],
   hint:'Money on top, time on the bottom.',
   good:'Dollars divided by weeks gives dollars per week.',
   bad:'Flipped or added math gives nonsense units. Money \u00f7 time = money per time.',
   why:'The pace formula: flexible money divided by time remaining.'};
 }},
{id:'pacing-basics-choice-06', verb:'choice', part:1, tier:'independent', skill:'pacing-basics',
 gen:(v)=>{
  const person=v.person();
  return {
   q:`${person} gets $600 that must last 6 weeks. It feels huge on day one. What is really true?`,
   choices:[
    {label:'It is 6 weeks of money, not one big pile to spend', ok:true},
    {label:'It is bonus money since it all arrived at once', ok:false, mis:'no-pace-needed'},
    {label:'It should be spent fast while it is available', ok:false, mis:'total-is-safe'},
    {label:'It means the pace is $600 a week', ok:false, mis:'pace-math'}],
   hint:'Lump sums lie.',
   good:'$600 \u00f7 6 = $100/week. The feeling of "huge" is the trap pacing fixes.',
   bad:'One arrival day does not make it one week of money.',
   why:'Lump sums feel big on day one and tiny on day twenty. The pace tells the truth.'};
 }},
{id:'pacing-basics-choice-07', verb:'choice', part:1, tier:'independent', skill:'pacing-basics',
 gen:(v)=>{
  return {
   q:`A $120 flexible pool covers 4 weeks, then the trip gets cut to 2 weeks. What happens to the pace?`,
   choices:[
    {label:'It doubles \u2014 $30/week becomes $60/week', ok:true},
    {label:'It halves \u2014 less time means less pace', ok:false, mis:'pace-math'},
    {label:'It stays $30/week \u2014 the pace never changes', ok:false, mis:'plan-never-changes'},
    {label:'It becomes $120/week \u2014 all of it, every week', ok:false}],
   hint:'Same money, less time.',
   good:'$120 \u00f7 4 = $30. $120 \u00f7 2 = $60. Less time, faster pace.',
   bad:'The pace follows the time remaining. When time shrinks, the pace recalculates.',
   why:'The pace is always money \u00f7 CURRENT time remaining. New time, new pace.'};
 }},
{id:'pacing-basics-choice-08', verb:'choice', part:1, tier:'independent', skill:'pacing-basics',
 gen:(v)=>{
  return {
   q:`What does pacing NOT do for your money?`,
   choices:[
    {label:'Make the money grow on its own', ok:true},
    {label:'Make the money last across the weeks', ok:false},
    {label:'Turn a lump sum into a weekly limit', ok:false},
    {label:'Show whether you are ahead or behind', ok:false}],
   hint:'Pacing is about timing, not growing.',
   good:'Pacing stretches money through time. Growth is a different job (savings and APY).',
   bad:'Pacing does not add a single dollar. It only controls the speed of spending.',
   why:'Pacing = lasting. It never creates money, it rations it.'};
 }},
{id:'pacing-basics-predict-01', verb:'predict', part:1, tier:'independent', skill:'pacing-basics',
 gen:(v)=>{
  const person=v.person(); const store=v.place();
  const lump=v.pick([240,300,360]); const wks=v.pick([3,4,6]);
  return {
   q:`${person} gets ${v.money(lump)} for ${wks} weeks, sets no pace, and spends half of it at ${store} in week one. What happens by the final week?`,
   choices:[
    {label:`The money runs out early \u2014 about ${v.money(Math.round(lump/(2*(wks-1))))}/week is left for the rest`, ok:true},
    {label:'Nothing bad \u2014 the money stretches itself out automatically', ok:false, mis:'no-pace-needed'},
    {label:'The money grows back by the final week', ok:false, mis:'savings-compounds'},
    {label:'Week one was free \u2014 the pace only counts the last week', ok:false, mis:'pace-math'}],
   hint:'Half the money, gone in one of the weeks.',
   good:`${v.money(lump/2)} spent in week one leaves ${v.money(lump/2)} for ${wks-1} weeks. The end of the stretch goes hungry.`,
   bad:'Without a pace, week one eats the later weeks. Money never stretches itself.',
   why:'No pace = front-loaded spending = empty later weeks. The pace exists to prevent exactly this.'};
 }},
{id:'pacing-basics-predict-02', verb:'predict', part:1, tier:'independent', skill:'pacing-basics',
 gen:(v)=>{
  const person=v.person();
  return {
   q:`${person} paces $60/week, spends $60 in week one and $60 in week two, then stops checking the pace. What is the most likely result?`,
   choices:[
    {label:'Drift \u2014 without checking, spending creeps over the pace', ok:true},
    {label:'Safety \u2014 two good weeks lock the pace in forever', ok:false, mis:'no-pace-needed'},
    {label:'Growth \u2014 the unspent attention earns interest', ok:false, mis:'savings-compounds'},
    {label:'Nothing \u2014 the pace was only needed for two weeks', ok:false, mis:'pace-doesnt-apply'}],
   hint:'A speed limit only works if you look at it.',
   good:'Pacing is a habit of checking, not a one-time setup. Unchecked weeks drift over.',
   bad:'Two on-pace weeks do not protect the rest. The check is the system.',
   why:'The pace only works while you keep measuring against it.'};
 }},
{id:'pacing-basics-predict-03', verb:'predict', part:1, tier:'independent', skill:'pacing-basics',
 gen:(v)=>{
  const person=v.person();
  const pace=v.pick([40,50,70]);
  return {
   q:`${person} has a ${v.money(pace)}/week pace and spends "just a little" every day without adding it up. What breaks first?`,
   choices:[
    {label:'The pace \u2014 small daily spends quietly blow past it', ok:true},
    {label:'Nothing \u2014 small amounts can never break a pace', ok:false, mis:'daily-equals-total'},
    {label:'The calendar \u2014 daily spending skips weeks', ok:false},
    {label:'The savings \u2014 daily spending only touches savings', ok:false, mis:'savings-doesnt-touch-spending'}],
   hint:'A little, times seven days.',
   good:'$7 a day is $49 a week. "Just a little" is exactly how a pace dies quietly.',
   bad:'Daily spending is still weekly spending. Small does not mean harmless.',
   why:'Untracked small spends add up past the pace before you notice.'};
 }},
{id:'pacing-basics-predict-04', verb:'predict', part:1, tier:'independent', skill:'pacing-basics',
 gen:(v)=>{
  const person=v.person();
  return {
   q:`Two friends each get $400 for 4 weeks. One paces $100/week; the other "just tries to be careful." Who runs out first?`,
   choices:[
    {label:'The careful one \u2014 "careful" without a number drifts', ok:true},
    {label:'The paced one \u2014 pacing is too rigid to survive real life', ok:false, mis:'pace-doesnt-apply'},
    {label:'Neither \u2014 $400 always lasts 4 weeks', ok:false, mis:'no-pace-needed'},
    {label:'Both at the same time \u2014 same money, same result', ok:false}],
   hint:'Which one has a number to check against?',
   good:'"Be careful" is a feeling; $100/week is a measurement. Feelings lose to weekends.',
   bad:'Good intentions do not ration money. A checked number does.',
   why:'A pace turns a vague intention into a checkable weekly limit.'};
 }},
{id:'pacing-basics-predict-05', verb:'predict', part:1, tier:'independent', skill:'pacing-basics',
 gen:(v)=>{
  const person=v.person();
  const over=v.pick([25,30,40]);
  return {
   q:`${person} goes ${v.money(over)} OVER the weekly pace in week one of four. What must happen next?`,
   choices:[
    {label:`The other weeks tighten \u2014 about ${v.money(over)}/3 less per week to still last`, ok:true},
    {label:'Nothing \u2014 week one does not count', ok:false, mis:'no-pace-needed'},
    {label:'The pace grows \u2014 overspending raises the pace automatically', ok:false, mis:'pace-math'},
    {label:'Savings covers it with no change needed', ok:false, mis:'savings-doesnt-touch-spending'}],
   hint:'The total is fixed. Over here means under there.',
   good:'One fixed pool: overshoot early, and the remaining weeks must absorb it.',
   bad:'The money does not reset. Week one overspending is borrowed from weeks two through four.',
   why:'A fixed pool means every dollar over pace comes from a later week.'};
 }},
{id:'pacing-basics-predict-06', verb:'predict', part:1, tier:'independent', skill:'pacing-basics',
 gen:(v)=>{
  const person=v.person();
  return {
   q:`${person} sets a $45/week pace, then gets a surprise $45 gift in week three. What does the pace say to do?`,
   choices:[
    {label:'Nothing changes \u2014 the gift is separate; the pace still guards the original money', ok:true},
    {label:'Double week three spending \u2014 the pace doubles with new money', ok:false, mis:'pace-math'},
    {label:'Stop pacing \u2014 the gift proves pacing was unnecessary', ok:false, mis:'no-pace-needed'},
    {label:'Spend the gift first, then restart the pace', ok:false}],
   hint:'New money does not rewrite the old plan.',
   good:'The pace protected the original pool. New money gets its own decision, not a spending spree.',
   bad:'A windfall is not permission to abandon the pace.',
   why:'The pace guards the planned money. Surprise money is a separate, deliberate choice.'};
 }},
{id:'pacing-basics-spot-01', verb:'spot', part:1, tier:'independent', skill:'pacing-basics',
 gen:(v)=>{
  const person=v.person();
  return {
   scenario:`<p>${person}\u2019s 4-week plan:</p><ul><li>Flexible money: $200</li><li>Pace: $200 \u00f7 4 = <b>$50/week</b></li><li>Week 1 spending: $130 (new shoes + concert)</li><li>Plan: "I will be careful the other weeks"</li></ul>`,
   q:'What is the mistake here?',
   choices:[
    {label:'Week one spent 2.6 weeks of pace with no plan to absorb it', ok:true},
    {label:'The pace math is wrong \u2014 $200 \u00f7 4 is $40', ok:false, mis:'pace-math'},
    {label:'There is no mistake \u2014 being careful later fixes it', ok:false, mis:'no-pace-needed'},
    {label:'The mistake is pacing at all \u2014 the full $200 was available', ok:false, mis:'total-is-safe'}],
   hint:'Compare week one to the weekly pace.',
   good:'$130 is nearly three weeks of pace gone in week one. "Careful later" is not a plan.',
   bad:'Vague carefulness cannot replace the missing $80.',
   why:'One blown week borrows from every week after it. The pace has to absorb it or it breaks.'};
 }},
{id:'pacing-basics-spot-02', verb:'spot', part:1, tier:'independent', skill:'pacing-basics',
 gen:(v)=>{
  const person=v.person();
  return {
   scenario:`<p>${person}\u2019s paycheck plan:</p><ul><li>Paycheck: $650</li><li>Rent + bills (Needs): $450</li><li>Savings move: $50</li><li>Pace set from: <b>$650 \u00f7 2 weeks = $325/week</b></li></ul>`,
   q:'What is the mistake here?',
   choices:[
    {label:'The pace used the whole paycheck instead of the $150 flexible money', ok:true},
    {label:'The pace should be $650 \u00d7 2 weeks', ok:false, mis:'pace-math'},
    {label:'Savings should not be protected before pacing', ok:false, mis:'savings-doesnt-touch-spending'},
    {label:'Two weeks is too short to pace', ok:false, mis:'pace-doesnt-apply'}],
   hint:'Which dollars already have jobs?',
   good:'$650 \u2212 $450 \u2212 $50 = $150 flexible. The real pace is $75/week, not $325.',
   bad:'Pacing $325/week spends the rent money by week two.',
   why:'Pace only the flexible remainder. Pacing the whole paycheck paces the rent too.'};
 }},
{id:'pacing-basics-spot-03', verb:'spot', part:1, tier:'independent', skill:'pacing-basics',
 gen:(v)=>{
  const person=v.person();
  return {
   scenario:`<p>${person}\u2019s weekly log:</p><ul><li>Pace: $60/week</li><li>Spent: $58</li><li>Note: "Missed the pace. Must spend $2 more to hit it."</li></ul>`,
   q:'What is the mistake here?',
   choices:[
    {label:'Treating the pace as a target to hit instead of a limit to stay under', ok:true},
    {label:'The math \u2014 $58 is over $60', ok:false, mis:'pace-math'},
    {label:'Not spending enough \u2014 unspent pace money is wasted', ok:false, mis:'no-pace-needed'},
    {label:'Logging at all \u2014 pacing works without tracking', ok:false}],
   hint:'Is $58 under or over $60?',
   good:'$58 is UNDER a $60 pace. That is a win, not a miss. The pace is a ceiling.',
   bad:'Forcing spending up to the pace defeats the whole point.',
   why:'Speed limit, not target. Under is always fine.'};
 }},
{id:'pacing-basics-spot-04', verb:'spot', part:1, tier:'independent', skill:'pacing-basics',
 gen:(v)=>{
  const person=v.person();
  return {
   scenario:`<p>${person}\u2019s month:</p><ul><li>Got $500 for 5 weeks</li><li>Set no pace: "I will just watch my account balance"</li><li>Week 3: balance $60, still 2 weeks to go</li></ul>`,
   q:'What is the mistake here?',
   choices:[
    {label:'Watching the balance instead of setting a $100/week pace', ok:true},
    {label:'The balance is wrong \u2014 $500 lasts 5 weeks automatically', ok:false, mis:'no-pace-needed'},
    {label:'Checking the account \u2014 that is what broke the plan', ok:false},
    {label:'Five weeks is too long to pace', ok:false, mis:'pace-doesnt-apply'}],
   hint:'The balance only tells you what is left, not what is allowed.',
   good:'$500 \u00f7 5 = $100/week. Without that number, "watching" just narrates the collapse.',
   bad:'A balance cannot tell you whether $60 with 2 weeks left is okay. A pace can.',
   why:'The balance is a thermometer; the pace is the speed limit. You need both.'};
 }},
{id:'pacing-basics-spot-05', verb:'spot', part:1, tier:'independent', skill:'pacing-basics',
 gen:(v)=>{
  const person=v.person();
  return {
   scenario:`<p>${person}\u2019s reasoning:</p><ul><li>"My pace is $40/week"</li><li>"I spent $40 on Monday"</li><li>"So I have $40 more to spend this week \u2014 the pace resets daily"</li></ul>`,
   q:'What is the mistake here?',
   choices:[
    {label:'The pace is weekly \u2014 $40 Monday means $0 left that week', ok:true},
    {label:'The pace is too low to matter', ok:false},
    {label:'Monday spending does not count toward the pace', ok:false, mis:'daily-equals-total'},
    {label:'The pace should reset every day for accuracy', ok:false, mis:'pace-math'}],
   hint:'How many $40s fit in one week?',
   good:'One $40/week pace = $40 total for the week. Monday spent it.',
   bad:'A weekly pace does not refill daily. It is spent once.',
   why:'The pace covers the whole period. Spending it on day one leaves six days at zero.'};
 }},
{id:'pacing-basics-spot-06', verb:'spot', part:1, tier:'independent', skill:'pacing-basics',
 gen:(v)=>{
  const person=v.person();
  return {
   scenario:`<p>${person}\u2019s plan:</p><ul><li>$160 flexible, 4 weeks</li><li>"Pace: $160 \u00f7 4 = $40/week"</li><li>"But week 2 has my birthday, so I will just skip pacing that week"</li></ul>`,
   q:'What is the mistake here?',
   choices:[
    {label:'Skipping the pace for the expensive week instead of adjusting all weeks', ok:true},
    {label:'The pace math \u2014 $160 \u00f7 4 is $45', ok:false, mis:'close-enough-math'},
    {label:'Birthdays are exempt from all money rules', ok:false, mis:'pace-doesnt-apply'},
    {label:'The pace should be higher in birthday weeks only', ok:false, mis:'skip-spending-breaks-pace'}],
   hint:'The total does not change because it is a birthday.',
   good:'A big week needs a RECALCULATED pace (less the other weeks), not a skipped pace.',
   bad:'Skipping the pace for the priciest week is skipping it where it matters most.',
   why:'Special weeks adjust the pace \u2014 they never cancel it.'};
 }},
{id:'pacing-basics-sort-01', verb:'sort', part:2, tier:'independent', skill:'pacing-basics',
 gen:(v)=>({
  h:'Sort it: paced or unpaced?',
  body:'<p>Decide whether each spending pattern follows a pace or breaks it.</p>',
  buckets:['Paced','Unpaced'],
  items:[
   {label:'$50 every week from a $200, 4-week pool', a:'paced', why:'$200 \u00f7 4 = $50/week, steady.'},
   {label:'$200 all in week one', a:'unpaced', why:'Four weeks of money gone in one.'},
   {label:'Checking the weekly pace before buying', a:'paced', why:'Measuring against the limit is the habit.'},
   {label:'$0 for three weeks, then a $200 splurge', a:'unpaced', why:'Back-loading is still not pacing.'},
   {label:'$45, $52, $48, $50 across four weeks', a:'paced', why:'Near the pace with small wiggles is pacing.'},
   {label:'Spending until the account looks low', a:'unpaced', why:'No number, no pace.'},
   {label:'Skipping the pace "just this week"', a:'unpaced', why:'Skipped weeks are broken weeks.'},
   {label:'Recalculating the pace after a big week', a:'paced', why:'Adjusting keeps the total intact.'}]
 })},
{id:'pacing-basics-sort-02', verb:'sort', part:2, tier:'independent', skill:'pacing-basics',
 gen:(v)=>({
  h:'Sort it: on pace or off pace?',
  body:'<p>Pace is $70/week. Sort each week of spending.</p>',
  buckets:['On pace','Off pace'],
  items:[
   {label:'Week: $65', a:'on pace', why:'Under the $70 ceiling.'},
   {label:'Week: $70', a:'on pace', why:'Exactly at the limit is fine.'},
   {label:'Week: $95', a:'off pace', why:'$25 over the ceiling.'},
   {label:'Week: $70, but $20 was a need', a:'on pace', why:'Needs were protected before pacing; pace covers the flexible part.'},
   {label:'Week: $0', a:'on pace', why:'Zero is under the ceiling.'},
   {label:'Week: $70 plus a $30 "exception"', a:'off pace', why:'Exceptions are just uncounted overspending.'},
   {label:'Week: $68', a:'on pace', why:'Under by $2.'},
   {label:'Week: $140, "making up for last week"', a:'off pace', why:'Doubling up breaks this week too.'}]
 })},
{id:'pacing-basics-sort-03', verb:'sort', part:2, tier:'independent', skill:'pacing-basics',
 gen:(v)=>({
  h:'Sort it: counts in the pace or comes off first?',
  body:'<p>Before pacing, some money gets protected. Sort each item.</p>',
  buckets:['Protect first','Pace the rest'],
  items:[
   {label:'Rent due next week', a:'protect first', why:'A Need with a deadline.'},
   {label:'Savings goal move', a:'protect first', why:'Savings gets its job before pacing.'},
   {label:'Friday dinner with friends', a:'pace the rest', why:'Flexible spending lives in the pace.'},
   {label:'Bus fare to work', a:'protect first', why:'Keeps you functioning \u2014 a Need.'},
   {label:'New video game', a:'pace the rest', why:'A Want, paced like everything flexible.'},
   {label:'Phone bill due Friday', a:'protect first', why:'Obligation with a date.'},
   {label:'Snacks between classes', a:'pace the rest', why:'Flexible, paced spending.'},
   {label:'Emergency fund contribution', a:'protect first', why:'Savings is protected, never paced.'}]
 })},
{id:'pacing-basics-sort-04', verb:'sort', part:2, tier:'independent', skill:'pacing-basics',
 gen:(v)=>({
  h:'Sort it: helps the pace or hurts the pace?',
  body:'<p>Sort each habit by what it does to a weekly pace.</p>',
  buckets:['Helps','Hurts'],
  items:[
   {label:'Logging spending each night', a:'helps', why:'You cannot stay under a number you do not watch.'},
   {label:'"Just this once" exceptions', a:'hurts', why:'Exceptions are how paces die.'},
   {label:'Rounding the pace down a little', a:'helps', why:'A cushion absorbs surprises.'},
   {label:'Checking the balance instead of the pace', a:'hurts', why:'Balance is not a speed limit.'},
   {label:'Splitting the pool into weekly envelopes', a:'helps', why:'Physical pacing.'},
   {label:'Waiting a day on big wants', a:'helps', why:'Impulse is the pace-killer.'},
   {label:'Borrowing from next week "temporarily"', a:'hurts', why:'Temporary borrowing is permanent overspending.'},
   {label:'Recalculating after an over week', a:'helps', why:'Adjusting keeps the total honest.'}]
 })},
{id:'pacing-basics-sort-05', verb:'sort', part:2, tier:'independent', skill:'pacing-basics',
 gen:(v)=>({
  h:'Sort it: lump thinking or pace thinking?',
  body:'<p>Sort each thought by which mindset it shows.</p>',
  buckets:['Lump thinking','Pace thinking'],
  items:[
   {label:'"I have $400!" (day one)', a:'lump thinking', why:'Sees the pile, not the weeks.'},
   {label:'"That is $100 a week for four weeks"', a:'pace thinking', why:'Divides by time immediately.'},
   {label:'"It feels like free money"', a:'lump thinking', why:'The classic lump-sum illusion.'},
   {label:'"I am $20 under pace this week"', a:'pace thinking', why:'Measures against the limit.'},
   {label:'"I will deal with week four later"', a:'lump thinking', why:'Later is where the money runs out.'},
   {label:'"Big week coming \u2014 I will tighten the other weeks"', a:'pace thinking', why:'Adjusts across time.'},
   {label:'"The account still looks fine"', a:'lump thinking', why:'Balance-watching, not pace-checking.'},
   {label:'"One week of pace left in the pool"', a:'pace thinking', why:'Thinks in weeks, not dollars.'}]
 })},
{id:'pacing-basics-sort-06', verb:'sort', part:2, tier:'independent', skill:'pacing-basics',
 gen:(v)=>({
  h:'Sort it: steady pace or front-loaded?',
  body:'<p>$300 for 3 weeks ($100/week pace). Sort each spending pattern.</p>',
  buckets:['Steady pace','Front-loaded'],
  items:[
   {label:'$100, $100, $100', a:'steady pace', why:'Textbook pacing.'},
   {label:'$180, $70, $50', a:'front-loaded', why:'Week one ate the cushion.'},
   {label:'$90, $110, $100', a:'steady pace', why:'Small wiggles around the pace.'},
   {label:'$250, $30, $20', a:'front-loaded', why:'Nearly everything in week one.'},
   {label:'$0, $0, $300', a:'front-loaded', why:'All back-loaded \u2014 still not pacing.'},
   {label:'$95, $95, $110', a:'steady pace', why:'Close to the pace every week.'},
   {label:'$120, $120, $60', a:'front-loaded', why:'Two heavy weeks starve week three.'},
   {label:'$100, $90, $95', a:'steady pace', why:'Under every week \u2014 even better.'}]
 })},
{id:'pacing-basics-decide-01', verb:'decide', part:2, tier:'independent', skill:'pacing-basics',
 gen:(v)=>{
  const person=v.person();
  return {
   q:`${person} has a $60/week pace. In week two, a $90 pair of sneakers drops \u2014 the only restock this month. What is the call?`,
   choices:[
    {label:'Wait: buy it in week three when two weeks of pace ($120) cover it', ok:true},
    {label:'Buy now \u2014 the pace is just a suggestion for normal weeks', ok:false, mis:'skip-spending-breaks-pace'},
    {label:'Buy now and skip pacing for the rest of the month', ok:false, mis:'no-pace-needed'},
    {label:'Buy it from the savings \u2014 savings is just stored spending money', ok:false, mis:'savings-doesnt-touch-spending'}],
   hint:'The pace is $60/week. The shoes are $90.',
   good:'Waiting one week lets $120 of pace cover the $90 shoes. The pace survives, the shoes arrive.',
   bad:'Buying now blows two weeks of pace in one day. "Just a suggestion" is how paces die.',
   why:'Big wants wait for the pace to accumulate \u2014 they do not break it.'};
 }},
{id:'pacing-basics-decide-02', verb:'decide', part:2, tier:'independent', skill:'pacing-basics',
 gen:(v)=>{
  const person=v.person(); const place=v.place();
  return {
   q:`${person} is $25 under pace after week one. Friends invite ${person} to ${place} \u2014 about $25. What is the call?`,
   choices:[
    {label:'Go and enjoy it \u2014 under-pace money is real room', ok:true},
    {label:'Skip it \u2014 under-pace money must roll into savings', ok:false, mis:'no-pace-needed'},
    {label:'Go, and spend $25 more since the pace "reset"', ok:false, mis:'pace-math'},
    {label:'Go but put it on a credit card to protect the pace', ok:false}],
   hint:'Under the pace means room exists.',
   good:'Being $25 under means the outing fits inside the pace. That is the pace working.',
   bad:'The pace is a ceiling, not a vault. Hoarding under-pace dollars as untouchable misses the point.',
   why:'Under-pace room is spendable \u2014 that is what the ceiling is for.'};
 }},
{id:'pacing-basics-decide-03', verb:'decide', part:2, tier:'independent', skill:'pacing-basics',
 gen:(v)=>{
  const person=v.person();
  return {
   q:`${person} blew the pace in week one ($110 spent on a $70 pace). Three weeks remain. What is the call?`,
   choices:[
    {label:'Recalculate: spread the $40 overage across the 3 weeks \u2014 about $57/week now', ok:true},
    {label:'Pretend week one did not happen and keep $70/week', ok:false, mis:'no-pace-needed'},
    {label:'Give up on pacing \u2014 one bad week ruins the whole plan', ok:false, mis:'pace-doesnt-apply'},
    {label:'Pull $40 from savings and keep $70/week', ok:false, mis:'savings-doesnt-touch-spending'}],
   hint:'The total pool is fixed. The overage has to live somewhere.',
   good:'Recalculating absorbs the $40: the remaining pool divided by 3 weeks. Honest and survivable.',
   bad:'Ignoring the overage just moves the shortfall to the final week.',
   why:'A blown week gets recalculated, not ignored. New math, same total.'};
 }},
{id:'pacing-basics-decide-04', verb:'decide', part:2, tier:'independent', skill:'pacing-basics',
 gen:(v)=>{
  const person=v.person();
  return {
   q:`${person} has $80 left of a $100/week pace on Thursday, and a $95 concert is Friday. What is the call?`,
   choices:[
    {label:'Skip the concert or find a cheaper plan \u2014 $95 does not fit $80', ok:true},
    {label:'Go anyway \u2014 $15 over is close enough', ok:false, mis:'close-enough-math'},
    {label:'Go and count it against next week\u2019s pace', ok:false, mis:'skip-spending-breaks-pace'},
    {label:'Go \u2014 the pace restarts Friday anyway', ok:false, mis:'pace-math'}],
   hint:'$80 left. $95 ticket. Does it fit?',
   good:'It does not fit, so the answer is no or a cheaper plan. $15 over is still over.',
   bad:'Borrowing from next week starts a debt spiral across weeks.',
   why:'The pace is a hard edge this week. "Close enough" is over.'};
 }},
{id:'pacing-basics-decide-05', verb:'decide', part:2, tier:'independent', skill:'pacing-basics',
 gen:(v)=>{
  const person=v.person();
  return {
   q:`${person}\u2019s pace is $55/week. A friend offers to split a $40 pizza order \u2014 ${person}\u2019s half is $20, and ${person} already spent $45 this week. What is the call?`,
   choices:[
    {label:'Pass or pay less \u2014 $45 + $20 = $65, over the $55 pace', ok:true},
    {label:'Say yes \u2014 $20 is small money', ok:false, mis:'daily-equals-total'},
    {label:'Say yes \u2014 food with friends does not count', ok:false, mis:'pace-doesnt-apply'},
    {label:'Say yes and skip logging it', ok:false}],
   hint:'Add it up: $45 + $20.',
   good:'$65 beats $55. Small amounts still add up past the ceiling.',
   bad:'"Small" and "with friends" do not change the math.',
   why:'Every dollar counts against the pace \u2014 no category is exempt.'};
 }},
{id:'pacing-basics-decide-06', verb:'decide', part:2, tier:'independent', skill:'pacing-basics',
 gen:(v)=>{
  const person=v.person();
  return {
   q:`${person} gets paid weekly now instead of monthly, so the "weeks remaining" keep resetting. What is the call?`,
   choices:[
    {label:'Pace each paycheck across its own week \u2014 same math, shorter window', ok:true},
    {label:'Stop pacing \u2014 weekly pay means pacing is unnecessary', ok:false, mis:'no-pace-needed'},
    {label:'Keep the old monthly pace and spend it in week one', ok:false, mis:'pace-doesnt-apply'},
    {label:'Add each week\u2019s pay to one big pile and pace monthly anyway', ok:false, mis:'add-week-to-lump'}],
   hint:'Money \u00f7 time. What is the time now?',
   good:'Each paycheck gets its own 1-week pace. The formula never changes, only the window.',
   bad:'Weekly pay without pacing is just faster lump-sum thinking.',
   why:'The pace always uses the CURRENT money and CURRENT time. Shorter window, same division.'};
 }},
{id:'pacing-basics-decide-07', verb:'decide', part:2, tier:'independent', skill:'pacing-basics',
 gen:(v)=>{
  const person=v.person();
  return {
   q:`${person} is pacing $40/week and finds a $35 item on sale (was $60). ${person} has spent $10 this week. What is the call?`,
   choices:[
    {label:'Buy it \u2014 $45 is only $5 over, close enough', ok:false, mis:'close-enough-math'},
    {label:'Skip it \u2014 $10 + $35 = $45 beats the $40 pace', ok:true},
    {label:'Buy it \u2014 the $25 "saved" covers the overage', ok:false, mis:'close-enough-math'},
    {label:'Buy it \u2014 sales do not count against the pace', ok:false, mis:'pace-doesnt-apply'}],
   hint:'$10 + $35 = $45. Pace is $40.',
   good:'Even a good deal has to fit the pace. $45 > $40, so it waits.',
   bad:'"Money saved" on a sale is not money earned. The pace counts dollars spent.',
   why:'Sales do not get a pace exemption. If it does not fit, it waits.'};
 }},
{id:'pacing-basics-decide-08', verb:'decide', part:2, tier:'independent', skill:'pacing-basics',
 gen:(v)=>{
  const person=v.person();
  return {
   q:`${person} has paced perfectly for 3 weeks ($50/week). Week four arrives with $50 left and zero needs. What is the call?`,
   choices:[
    {label:'Spend, save, or roll it \u2014 it is the final week of paced money', ok:true},
    {label:'Spend all $50 immediately \u2014 paced money expires', ok:false, mis:'no-pace-needed'},
    {label:'Keep pacing $50/week forever with no new income', ok:false, mis:'pace-math'},
    {label:'Give it away \u2014 leftover pace money is a failure', ok:false}],
   hint:'The stretch is over. What was the pace protecting?',
   good:'Three disciplined weeks earned a free final $50. Spend it, save it, or roll it forward \u2014 your call.',
   bad:'Paced money does not expire or punish you. The reward for pacing is options.',
   why:'The pace got the money across the finish line. Leftover is victory, not waste.'};
 }},
{id:'pacing-basics-compare-01', verb:'compare', part:2, tier:'independent', skill:'pacing-basics',
 gen:(v)=>{
  return {
   context:'<p><b>Alex:</b> $240 for 4 weeks. Spends $60 every week.</p><p><b>Jordan:</b> $240 for 4 weeks. Spends $120 in week one, then $40 a week after.</p>',
   q:'Who is pacing better?',
   choices:[
    {label:'Alex \u2014 steady $60/week matches the $240 \u00f7 4 pace', ok:true},
    {label:'Jordan \u2014 getting the big spending done early is smarter', ok:false, mis:'no-pace-needed'},
    {label:'Tie \u2014 both spent $240 total', ok:false, mis:'total-is-safe'},
    {label:'Jordan \u2014 spending less later proves week one was fine', ok:false}],
   hint:'Same total. Different timing.',
   good:'Alex never breaks the $60 ceiling. Jordan starved weeks two through four.',
   bad:'Total spent is not the test. Timing is.',
   why:'Pacing is about WHEN the money goes, not just how much.'};
 }},
{id:'pacing-basics-compare-02', verb:'compare', part:2, tier:'independent', skill:'pacing-basics',
 gen:(v)=>{
  return {
   context:'<p><b>Sam:</b> $300 for 6 weeks ($50/week pace). Logs spending nightly.</p><p><b>Casey:</b> $300 for 6 weeks ($50/week pace). Never logs, "feels" on track.</p>',
   q:'Whose pace is more likely to survive?',
   choices:[
    {label:'Sam \u2014 checking against the number is the system', ok:true},
    {label:'Casey \u2014 logging is overkill if you are careful', ok:false, mis:'no-pace-needed'},
    {label:'Tie \u2014 same pace, same outcome', ok:false},
    {label:'Casey \u2014 feelings adjust faster than logs', ok:false, mis:'daily-equals-total'}],
   hint:'Which one can SEE the pace?',
   good:'Sam can spot drift at $52 and correct. Casey finds out at $90.',
   bad:'"Feeling on track" is how $300 becomes $40 by week four.',
   why:'The pace only works while measured. Logging is the measurement.'};
 }},
{id:'pacing-basics-compare-03', verb:'compare', part:2, tier:'independent', skill:'pacing-basics',
 gen:(v)=>{
  return {
   context:'<p><b>Plan A:</b> $500 for 5 weeks, pace $100/week, recalculated after any over week.</p><p><b>Plan B:</b> $500 for 5 weeks, "spend less than last week" each week.</p>',
   q:'Which plan holds up better?',
   choices:[
    {label:'Plan A \u2014 a real number with a repair rule', ok:true},
    {label:'Plan B \u2014 spending less each week always works', ok:false, mis:'pace-math'},
    {label:'Tie \u2014 both are just being careful', ok:false, mis:'no-pace-needed'},
    {label:'Plan B \u2014 no math means no mistakes', ok:false}],
   hint:'What happens after a $130 week in each plan?',
   good:'Plan A absorbs the $30 overage with new math. Plan B has no number to absorb it into.',
   bad:'"Spend less" with no baseline drifts. A pace plus a repair rule survives reality.',
   why:'A pace is a number AND a rule for when the number breaks.'};
 }},
{id:'pacing-basics-compare-04', verb:'compare', part:2, tier:'independent', skill:'pacing-basics',
 gen:(v)=>{
  return {
   context:'<p><b>Riley:</b> Paces the whole $800 paycheck at $200/week for 4 weeks.</p><p><b>Morgan:</b> Protects $500 needs + $100 savings, paces the $200 flexible at $50/week.</p>',
   q:'Who set the pace correctly?',
   choices:[
    {label:'Morgan \u2014 paced only the flexible $200', ok:true},
    {label:'Riley \u2014 pacing everything is more disciplined', ok:false, mis:'total-is-safe'},
    {label:'Riley \u2014 a bigger pace means more freedom', ok:false, mis:'afford-more'},
    {label:'Tie \u2014 both divided by 4', ok:false, mis:'pace-math'}],
   hint:'Whose rent money is inside the pace?',
   good:'Morgan\u2019s $50/week pace cannot touch rent or savings. Riley\u2019s $200/week pace spends both by week three.',
   bad:'Pacing money with a job is not discipline \u2014 it is spending the rent.',
   why:'Protect first, pace the rest. Always.'};
 }},
{id:'pacing-basics-compare-05', verb:'compare', part:2, tier:'independent', skill:'pacing-basics',
 gen:(v)=>{
  return {
   context:'<p><b>Taylor:</b> Under pace by $15 in week one, spends the $15 on fun in week two.</p><p><b>Avery:</b> Under pace by $15 in week one, banks it and paces $50/week anyway.</p>',
   q:'Which approach is right?',
   choices:[
    {label:'Both are fine \u2014 under-pace money is real room either way', ok:true},
    {label:'Only Taylor \u2014 under-pace money must be spent', ok:false, mis:'no-pace-needed'},
    {label:'Only Avery \u2014 under-pace money can never be touched', ok:false},
    {label:'Neither \u2014 being under pace means the pace was wrong', ok:false, mis:'pace-math'}],
   hint:'The pace is a ceiling, not a vault.',
   good:'Under the ceiling is under. Spend it, save it \u2014 the pace does not care.',
   bad:'Neither "must spend" nor "never touch" is a rule. The only rule is the ceiling.',
   why:'Under-pace dollars are free dollars. The pace only caps; it never commands.'};
 }},
{id:'pacing-basics-compare-06', verb:'compare', part:2, tier:'independent', skill:'pacing-basics',
 gen:(v)=>{
  return {
   context:'<p><b>Plan X:</b> $120 for 2 weeks \u2192 $60/week pace.</p><p><b>Plan Y:</b> $120 for 4 weeks \u2192 $30/week pace.</p>',
   q:'What does the comparison show?',
   choices:[
    {label:'Same money, different time \u2014 the pace must be recalculated', ok:true},
    {label:'Plan X is better \u2014 a higher pace is always better', ok:false, mis:'afford-more'},
    {label:'Plan Y is wrong \u2014 $120 can never last 4 weeks', ok:false},
    {label:'The pace should stay $60 in both \u2014 paces never change', ok:false, mis:'plan-never-changes'}],
   hint:'$120 \u00f7 2 vs $120 \u00f7 4.',
   good:'The money did not change; the time did. The pace follows the time remaining.',
   bad:'A "better" pace is not a bigger one. It is the true one for the time left.',
   why:'Pace = money \u00f7 current time. New time, new pace.'};
 }},
{id:'pacing-basics-build-01', verb:'build', part:2, tier:'independent', skill:'pacing-basics',
 gen:(v)=>{
  const total=400; const needs=220; const sav=60; const flex=120;
  return {
   h:'Build it: protect, then pace',
   body:'<p>Split the $400 paycheck: protect Needs and Savings first, then pace what is flexible across 4 weeks.</p>',
   totalDollars: total,
   buckets:[{id:'needs',label:'Needs'},{id:'savings',label:'Savings'},{id:'flex',label:'Flexible (paced $30/wk)'}],
   targets:{needs:needs, savings:sav, flex:flex},
   hint:'Needs + savings come off first.',
   good:'Needs $220 and savings $60 are protected; $120 flexible paces at $30/week.',
   bad:'Pacing before protecting spends the rent.',
   why:'Protect first, pace the rest.'};
 }},
{id:'pacing-basics-build-02', verb:'build', part:2, tier:'independent', skill:'pacing-basics',
 gen:(v)=>{
  const total=200;
  return {
   h:'Build it: four weekly envelopes',
   body:'<p>Split $200 flexible across 4 weekly envelopes \u2014 even pacing.</p>',
   totalDollars: total,
   buckets:[{id:'w1',label:'Week 1'},{id:'w2',label:'Week 2'},{id:'w3',label:'Week 3'},{id:'w4',label:'Week 4'}],
   targets:{w1:50, w2:50, w3:50, w4:50},
   hint:'$200 \u00f7 4.',
   good:'$50 per envelope = $50/week pace. Even and simple.',
   bad:'Loading week one starves week four.',
   why:'Even envelopes are pacing you can touch.'};
 }},
{id:'pacing-basics-build-03', verb:'build', part:2, tier:'independent', skill:'pacing-basics',
 gen:(v)=>{
  const total=300;
  return {
   h:'Build it: pace with a cushion',
   body:'<p>Split $300 flexible across 3 weeks, but hold a $30 cushion for surprises. Pace the rest.</p>',
   totalDollars: total,
   buckets:[{id:'w1',label:'Week 1'},{id:'w2',label:'Week 2'},{id:'w3',label:'Week 3'},{id:'cushion',label:'Cushion'}],
   targets:{w1:90, w2:90, w3:90, cushion:30},
   hint:'Protect the cushion first, then divide.',
   good:'$30 cushion held; $270 paced at $90/week. Surprises do not break the pace.',
   bad:'Pacing all $300 at $100/week leaves zero room for the unexpected.',
   why:'A cushion inside the plan beats a broken pace later.'};
 }},
{id:'pacing-basics-build-04', verb:'build', part:2, tier:'independent', skill:'pacing-basics',
 gen:(v)=>{
  const total=150;
  return {
   h:'Build it: two-week sprint',
   body:'<p>Split $150 flexible across 2 weeks \u2014 even pacing.</p>',
   totalDollars: total,
   buckets:[{id:'w1',label:'Week 1'},{id:'w2',label:'Week 2'}],
   targets:{w1:75, w2:75},
   hint:'$150 \u00f7 2.',
   good:'$75/week. Short window, same math.',
   bad:'Uneven splits front-load the risk.',
   why:'The formula never changes: money \u00f7 time.'};
 }},
{id:'pacing-basics-build-05', verb:'build', part:2, tier:'independent', skill:'pacing-basics',
 gen:(v)=>{
  const total=480;
  return {
   h:'Build it: the full NWS split',
   body:'<p>Split a $480 paycheck: Needs $260, Savings $80, and pace the flexible rest across 4 weeks.</p>',
   totalDollars: total,
   buckets:[{id:'needs',label:'Needs'},{id:'savings',label:'Savings'},{id:'flex',label:'Flexible ($35/wk)'}],
   targets:{needs:260, savings:80, flex:140},
   hint:'Flexible = 480 \u2212 260 \u2212 80.',
   good:'$140 flexible \u00f7 4 = $35/week pace, with needs and savings safe.',
   bad:'Skipping the split paces the rent money too.',
   why:'Sort first (NWS), then pace what is flexible.'};
 }},
{id:'pacing-basics-explain-01', verb:'explain', part:2, tier:'independent', skill:'pacing-basics',
 gen:(v)=>({
  h:'Teach it back: what pacing is',
  prompt:'Explain in your own words what pacing money means and why it works.',
  keyPoints:['Pacing splits money across the time it must last','It uses flexible money, after needs and savings are protected','The pace is a weekly (or daily) spending limit','It works because a lump sum feels bigger than it is'],
  modelAnswer:'Pacing means dividing your flexible money by the time it has to cover, giving a weekly limit. You protect needs and savings first, then pace the rest. It works because lump sums feel huge on day one \u2014 the pace tells the truth about what each week can spend.',
  hint:'Start with the formula: flexible money \u00f7 time.'
 })},
{id:'pacing-basics-explain-02', verb:'explain', part:2, tier:'independent', skill:'pacing-basics',
 gen:(v)=>({
  h:'Teach it back: speed limit, not target',
  prompt:'Explain why the pace is a speed limit and not a target.',
  keyPoints:['A speed limit caps how fast you can go','Going under the pace is fine and even good','You never owe the pace unspent money','Hitting it exactly is not required'],
  modelAnswer:'The pace caps spending, like a speed limit caps speed. Driving under the limit is fine \u2014 nobody owes the road extra miles. Same with money: under the pace means the money lasts longer, and unspent pace money is simply yours.',
  hint:'Think of an actual speed limit sign.'
 })},
{id:'pacing-basics-explain-03', verb:'explain', part:2, tier:'independent', skill:'pacing-basics',
 gen:(v)=>({
  h:'Teach it back: lump sums lie',
  prompt:'Explain why a lump sum feels bigger on day one than it really is.',
  keyPoints:['Day one shows the whole pile at once','Your brain counts the pile, not the weeks','By the last week the pile is gone but time remains','The pace converts the pile into honest weekly amounts'],
  modelAnswer:'On day one you see every dollar at once, so it feels like wealth. But the money has to survive every week, and your brain forgets the later weeks. The pace divides the pile by the weeks, turning the illusion into a true weekly number.',
  hint:'What do you see on day one vs day twenty?'
 })},
{id:'pacing-basics-explain-04', verb:'explain', part:2, tier:'independent', skill:'pacing-basics',
 gen:(v)=>({
  h:'Teach it back: what to do after a blown week',
  prompt:'Explain what to do when a week goes over the pace.',
  keyPoints:['Do not ignore it \u2014 the overage is real','Recalculate: remaining money \u00f7 remaining weeks','The new pace will be a little tighter','This keeps the total honest instead of breaking at the end'],
  modelAnswer:'When a week goes over, you recalculate: take the money left, divide by the weeks left, and follow the new tighter pace. Ignoring the overage just moves the pain to the final week. Recalculating keeps the plan honest.',
  hint:'The total pool is fixed \u2014 so where does the overage go?'
 })},
{id:'pacing-basics-explain-05', verb:'explain', part:2, tier:'independent', skill:'pacing-basics',
 gen:(v)=>({
  h:'Teach it back: protect first, pace the rest',
  prompt:'Explain why needs and savings are protected BEFORE pacing.',
  keyPoints:['Needs and savings already have jobs','Pacing the whole paycheck would spend rent and goal money','Flexible money is what is left after protection','The pace only rations money with no job yet'],
  modelAnswer:'Needs (rent, bills) and savings (goals) already have jobs \u2014 pacing them would spend money that belongs elsewhere. So you protect them first and pace only the flexible remainder. The pace rations free money; it never rations the rent.',
  hint:'What happens if the rent money gets a weekly pace?'
 })},
],
'safe-to-spend': [
{id:'safe-to-spend-choice-01', verb:'choice', part:3, tier:'guided', skill:'safe-to-spend',
 gen:(v)=>{
  const person=v.person();
  const bal=v.int(380,520), obl=v.int(120,200), sav=v.int(40,80);
  const safe=bal-obl-sav;
  return {
   q:`${person}\u2019s account shows ${v.money(bal)}. Rent due Friday is ${v.money(obl)}, and the savings move is ${v.money(sav)}. What is safe to spend?`,
   choices:[
    {label:v.money(safe), ok:true},
    {label:v.money(bal), ok:false, mis:'total-is-safe'},
    {label:v.money(bal-obl), ok:false, mis:'savings-doesnt-touch-spending'},
    {label:v.money(obl), ok:false, mis:'obligation-is-available'}],
   cue:'Balance minus every dollar that already has a job.',
   hint:'Two jobs: the rent and the savings move.',
   good:`${v.money(bal)} \u2212 ${v.money(obl)} \u2212 ${v.money(sav)} = ${v.money(safe)} safe to spend.`,
   bad:'The balance is what exists. Safe to spend is what is left after money with a job.',
   why:'Safe to spend = balance \u2212 obligations \u2212 protected savings.'};
 }},
{id:'safe-to-spend-choice-02', verb:'choice', part:3, tier:'guided', skill:'safe-to-spend',
 gen:(v)=>{
  const person=v.person();
  const bal=v.int(300,450), pend=v.int(45,95), bill=v.int(60,110);
  const safe=bal-pend-bill;
  return {
   q:`${person} sees ${v.money(bal)} in the account, but a ${v.money(pend)} pending charge and a ${v.money(bill)} phone bill due tomorrow are on the way. What is safe to spend?`,
   choices:[
    {label:v.money(safe), ok:true},
    {label:v.money(bal), ok:false, mis:'total-is-safe'},
    {label:v.money(bal-pend), ok:false, mis:'obligation-is-available'},
    {label:v.money(0), ok:false, mis:'nothing-safe'}],
   cue:'Pending and due-tomorrow money is already spoken for.',
   hint:'Subtract both the pending charge and the bill.',
   good:`${v.money(bal)} \u2212 ${v.money(pend)} \u2212 ${v.money(bill)} = ${v.money(safe)}.`,
   bad:'Pending charges and tomorrow\u2019s bill are not available \u2014 they just have not left yet.',
   why:'Money on its way out is already gone for spending purposes.'};
 }},
{id:'safe-to-spend-choice-03', verb:'choice', part:3, tier:'guided', skill:'safe-to-spend',
 gen:(v)=>{
  const person=v.person(); const place=v.place();
  const bal=v.int(500,700), needs=v.int(280,400), sav=v.int(60,120);
  const safe=bal-needs-sav;
  return {
   q:`${person} has ${v.money(bal)} before a trip to ${place}. Needs for the next two weeks are ${v.money(needs)} and savings gets ${v.money(sav)}. What is safe to spend on the trip?`,
   choices:[
    {label:v.money(safe), ok:true},
    {label:v.money(bal-needs), ok:false, mis:'savings-doesnt-touch-spending'},
    {label:v.money(bal), ok:false, mis:'total-is-safe'},
    {label:v.money(safe+40), ok:false, mis:'close-enough-math'}],
   cue:'Needs and savings both have jobs \u2014 protect both.',
   hint:'Balance minus needs minus savings.',
   good:`${v.money(bal)} \u2212 ${v.money(needs)} \u2212 ${v.money(sav)} = ${v.money(safe)} for the trip.`,
   bad:'Skipping the savings move borrows from a goal to fund a trip.',
   why:'Safe to spend survives only if every jobbed dollar is subtracted first.'};
 }},
{id:'safe-to-spend-choice-04', verb:'choice', part:3, tier:'guided', skill:'safe-to-spend',
 gen:(v)=>{
  const person=v.person();
  const bal=v.int(250,380), gas=v.int(40,70), groc=v.int(60,100);
  const safe=bal-gas-groc;
  return {
   q:`${person}\u2019s balance is ${v.money(bal)}. This week\u2019s gas (${v.money(gas)}) and groceries (${v.money(groc)}) are not bought yet. What is safe to spend on extras?`,
   choices:[
    {label:v.money(safe), ok:true},
    {label:v.money(bal), ok:false, mis:'total-is-safe'},
    {label:v.money(bal-gas), ok:false, mis:'obligation-is-available'},
    {label:v.money(safe-20), ok:false, mis:'nothing-safe'}],
   cue:'Unbought needs are still needs.',
   hint:'Gas and groceries come off first.',
   good:`${v.money(bal)} \u2212 ${v.money(gas)} \u2212 ${v.money(groc)} = ${v.money(safe)} for extras.`,
   bad:'"Not bought yet" does not mean "not owed." The needs are real either way.',
   why:'Safe to spend counts needs you have not paid yet.'};
 }},
{id:'safe-to-spend-choice-05', verb:'choice', part:3, tier:'guided', skill:'safe-to-spend',
 gen:(v)=>{
  const person=v.person();
  const bal=v.int(420,600), rent=v.int(200,300), sav=v.int(50,90), sub=v.int(15,30);
  const safe=bal-rent-sav-sub;
  return {
   q:`${person}: balance ${v.money(bal)}, rent due ${v.money(rent)}, savings ${v.money(sav)}, subscription renews ${v.money(sub)}. What is safe to spend?`,
   choices:[
    {label:v.money(safe), ok:true},
    {label:v.money(bal-rent), ok:false, mis:'savings-doesnt-touch-spending'},
    {label:v.money(bal), ok:false, mis:'total-is-safe'},
    {label:v.money(rent), ok:false, mis:'obligation-is-available'}],
   cue:'Three jobbed dollars: rent, savings, subscription.',
   hint:'Subtract all three.',
   good:`${v.money(bal)} \u2212 ${v.money(rent)} \u2212 ${v.money(sav)} \u2212 ${v.money(sub)} = ${v.money(safe)}.`,
   bad:'Small renewals are still jobs. Forgetting them overstates safety.',
   why:'Every dollar with a job \u2014 big or small \u2014 comes off the balance.'};
 }},
{id:'safe-to-spend-choice-06', verb:'choice', part:3, tier:'guided', skill:'safe-to-spend',
 gen:(v)=>{
  const person=v.person();
  const bal=v.int(350,480), obl=v.int(180,260);
  const safe=bal-obl;
  return {
   q:`${person} has ${v.money(bal)} and one obligation: ${v.money(obl)} for a car payment Friday. No savings move this week. What is safe to spend?`,
   choices:[
    {label:v.money(safe), ok:true},
    {label:v.money(bal), ok:false, mis:'total-is-safe'},
    {label:v.money(obl), ok:false, mis:'obligation-is-available'},
    {label:v.money(safe+obl), ok:false, mis:'close-enough-math'}],
   cue:'Only one job here \u2014 the car payment.',
   hint:'Balance minus the car payment.',
   good:`${v.money(bal)} \u2212 ${v.money(obl)} = ${v.money(safe)} safe to spend.`,
   bad:'The car payment is not spendable just because Friday has not arrived.',
   why:'One obligation, one subtraction. The rest is truly safe.'};
 }},
{id:'safe-to-spend-choice-07', verb:'choice', part:3, tier:'guided', skill:'safe-to-spend',
 gen:(v)=>{
  const person=v.person();
  const bal=v.int(600,800), tui=v.int(250,400), sav=v.int(100,180);
  const safe=bal-tui-sav;
  return {
   q:`${person}\u2019s balance is ${v.money(bal)}. Tuition installment ${v.money(tui)} is due next week, plus a ${v.money(sav)} savings move. What is safe to spend this week?`,
   choices:[
    {label:v.money(safe), ok:true},
    {label:v.money(bal-tui), ok:false, mis:'savings-doesnt-touch-spending'},
    {label:v.money(bal), ok:false, mis:'total-is-safe'},
    {label:v.money(safe-50), ok:false, mis:'nothing-safe'}],
   cue:'Tuition is a dated obligation \u2014 it has a job.',
   hint:'Balance minus tuition minus savings.',
   good:`${v.money(bal)} \u2212 ${v.money(tui)} \u2212 ${v.money(sav)} = ${v.money(safe)}.`,
   bad:'Tuition due next week is not "next week\u2019s problem." It is this balance\u2019s problem.',
   why:'Dated obligations count the moment you know about them.'};
 }},
{id:'safe-to-spend-choice-08', verb:'choice', part:3, tier:'guided', skill:'safe-to-spend',
 gen:(v)=>{
  const person=v.person();
  const bal=v.int(280,400), med=v.int(90,150), sav=v.int(30,60);
  const safe=bal-med-sav;
  return {
   q:`${person}: ${v.money(bal)} in the account. A ${v.money(med)} medical copay is scheduled, and savings takes ${v.money(sav)}. What is safe to spend?`,
   choices:[
    {label:v.money(safe), ok:true},
    {label:v.money(bal), ok:false, mis:'total-is-safe'},
    {label:v.money(bal-med), ok:false, mis:'savings-doesnt-touch-spending'},
    {label:v.money(med), ok:false, mis:'obligation-is-available'}],
   cue:'Two subtractions: the copay and the savings move.',
   hint:'Balance minus copay minus savings.',
   good:`${v.money(bal)} \u2212 ${v.money(med)} \u2212 ${v.money(sav)} = ${v.money(safe)}.`,
   bad:'The balance is a fact; safe-to-spend is a calculation.',
   why:'Safe to spend is always balance minus every jobbed dollar.'};
 }},
{id:'safe-to-spend-sort-01', verb:'sort', part:2, tier:'independent', skill:'safe-to-spend',
 gen:(v)=>({
  h:'Sort it: has a job or is safe?',
  body:'<p>Sort each dollar by whether it is already spoken for.</p>',
  buckets:['Has a job','Safe to spend'],
  items:[
   {label:'Rent due Friday', a:'has a job', why:'Dated obligation.'},
   {label:'Money left after all jobs are subtracted', a:'safe to spend', why:'That remainder is the definition.'},
   {label:'Savings goal move', a:'has a job', why:'Savings is a job, not spare cash.'},
   {label:'Pending card charge', a:'has a job', why:'Already on its way out.'},
   {label:'Birthday gift from grandma, no plans', a:'safe to spend', why:'No job assigned yet.'},
   {label:'Phone bill due tomorrow', a:'has a job', why:'Due tomorrow = spoken for today.'},
   {label:'Gas money for the work week', a:'has a job', why:'A need with a date.'},
   {label:'Leftover after rent, bills, and savings', a:'safe to spend', why:'Jobs done \u2014 this is the safe number.'}]
 })},
{id:'safe-to-spend-sort-02', verb:'sort', part:2, tier:'independent', skill:'safe-to-spend',
 gen:(v)=>({
  h:'Sort it: subtract it or keep it?',
  body:'<p>Balance is $450. Sort each item: does it come off the balance?</p>',
  buckets:['Subtract','Keep'],
  items:[
   {label:'$200 rent due in 3 days', a:'subtract', why:'Obligation with a date.'},
   {label:'$50 savings move', a:'subtract', why:'Savings has a job.'},
   {label:'$30 pending gas charge', a:'subtract', why:'Pending = leaving.'},
   {label:'$170 truly unassigned', a:'keep', why:'No job \u2014 safe.'},
   {label:'$25 subscription renews tonight', a:'subtract', why:'Tonight is basically now.'},
   {label:'$80 "maybe" concert next month', a:'keep', why:'A maybe is not a job yet.'},
   {label:'$60 groceries not yet bought', a:'subtract', why:'Unbought needs are still needs.'},
   {label:'$12 streaming trial ending', a:'subtract', why:'It will charge.'}]
 })},
{id:'safe-to-spend-sort-03', verb:'sort', part:2, tier:'independent', skill:'safe-to-spend',
 gen:(v)=>({
  h:'Sort it: balance facts vs safe-to-spend facts',
  body:'<p>Sort each statement about the two numbers.</p>',
  buckets:['Balance','Safe to spend'],
  items:[
   {label:'What the account shows right now', a:'balance', why:'A snapshot of existence.'},
   {label:'What is left after jobs are subtracted', a:'safe to spend', why:'A calculation, not a snapshot.'},
   {label:'Includes rent money due Friday', a:'balance', why:'The rent is still sitting there.'},
   {label:'Excludes rent money due Friday', a:'safe to spend', why:'Spoken-for dollars are removed.'},
   {label:'Can be spent freely with no consequences', a:'safe to spend', why:'That is what "safe" means.'},
   {label:'Spending all of it breaks something later', a:'balance', why:'Jobs inside it would go unpaid.'},
   {label:'Changes when a new bill is scheduled', a:'safe to spend', why:'New job = new subtraction.'},
   {label:'Goes up on payday before bills are considered', a:'balance', why:'Payday inflates existence first.'}]
 })},
{id:'safe-to-spend-sort-04', verb:'sort', part:2, tier:'independent', skill:'safe-to-spend',
 gen:(v)=>({
  h:'Sort it: obligation or available?',
  body:'<p>Sort each item by whether it is an obligation.</p>',
  buckets:['Obligation','Available'],
  items:[
   {label:'Car insurance due Monday', a:'obligation', why:'Dated and required.'},
   {label:'Paycheck deposited, all bills listed and subtracted', a:'available', why:'Jobs done \u2014 the remainder is safe.'},
   {label:'Minimum credit card payment', a:'obligation', why:'Due date, real consequence.'},
   {label:'Savings for a spring trip', a:'obligation', why:'A committed savings move is a job.'},
   {label:'Cash after all jobs subtracted', a:'available', why:'The safe remainder.'},
   {label:'Utility bill autopay Thursday', a:'obligation', why:'Autopay still counts.'},
   {label:'Refund with no purpose yet', a:'available', why:'No job assigned.'},
   {label:'Library fine due this week', a:'obligation', why:'Small but dated.'}]
 })},
{id:'safe-to-spend-sort-05', verb:'sort', part:2, tier:'independent', skill:'safe-to-spend',
 gen:(v)=>({
  h:'Sort it: two-number thinking',
  body:'<p>Sort each behavior: does it use one number or two?</p>',
  buckets:['One number','Two numbers'],
  items:[
   {label:'"The account says $400, so I have $400"', a:'one number', why:'Balance-only thinking.'},
   {label:'"The account says $400, minus $250 in jobs = $150 safe"', a:'two numbers', why:'Balance AND safe-to-spend.'},
   {label:'Spending until the card declines', a:'one number', why:'No calculation at all.'},
   {label:'Listing Friday\u2019s bills before the weekend', a:'two numbers', why:'Jobs first, then the remainder.'},
   {label:'"Pending charges do not count yet"', a:'one number', why:'Ignores money on the way out.'},
   {label:'Subtracting autopay before it hits', a:'two numbers', why:'Counts jobs before they leave.'},
   {label:'"I will figure out rent later"', a:'one number', why:'Later is where it breaks.'},
   {label:'Rechecking safe-to-spend after each big bill', a:'two numbers', why:'Keeps the safe number honest.'}]
 })},
{id:'safe-to-spend-sort-06', verb:'sort', part:2, tier:'independent', skill:'safe-to-spend',
 gen:(v)=>({
  h:'Sort it: jobbed or jobless?',
  body:'<p>Sort each dollar by whether it already has a job.</p>',
  buckets:['Jobbed','Jobless'],
  items:[
   {label:'Bus pass for next week', a:'jobbed', why:'A dated need.'},
   {label:'Spare cash after every bill is listed', a:'jobless', why:'No job \u2014 safe.'},
   {label:'Dentist copay scheduled', a:'jobbed', why:'Scheduled = spoken for.'},
   {label:'Savings move to the emergency fund', a:'jobbed', why:'Savings is a job.'},
   {label:'Gift money with no plans', a:'jobless', why:'Unassigned.'},
   {label:'Lunch money for the school week', a:'jobbed', why:'A planned need.'},
   {label:'Side-gig cash before bills are listed', a:'jobbed', why:'Unlisted bills still exist \u2014 list them first.'},
   {label:'Rebate check, nothing due', a:'jobless', why:'Nothing due \u2014 safe.'}]
 })},
{id:'safe-to-spend-decide-01', verb:'decide', part:3, tier:'guided', skill:'safe-to-spend',
 gen:(v)=>{
  const person=v.person();
  return {
   q:`${person}: balance $420, rent $250 due Friday, savings move $50. A $150 jacket drops today. What is the call?`,
   choices:[
    {label:'Skip it \u2014 safe to spend is $120, the jacket does not fit', ok:true},
    {label:'Buy it \u2014 $420 covers $150 easily', ok:false, mis:'total-is-safe'},
    {label:'Buy it \u2014 rent can wait until next paycheck', ok:false, mis:'obligation-is-available'},
    {label:'Buy it and skip the savings move to make room', ok:false, mis:'savings-doesnt-touch-spending'}],
   cue:'Safe to spend = $420 \u2212 $250 \u2212 $50. Compare the jacket to THAT.',
   hint:'Calculate the safe number first.',
   good:'Safe to spend is $120. The $150 jacket breaks it \u2014 rent and savings stay protected.',
   bad:'Buying from the $420 balance spends Friday\u2019s rent today.',
   why:'Decisions run on safe-to-spend, never on the balance.'};
 }},
{id:'safe-to-spend-decide-02', verb:'decide', part:3, tier:'guided', skill:'safe-to-spend',
 gen:(v)=>{
  const person=v.person(); const place=v.place();
  return {
   q:`${person}: balance $380, car payment $180 due Monday, no savings move. Friends plan ${place} Saturday \u2014 about $90. What is the call?`,
   choices:[
    {label:'Go \u2014 safe to spend is $200, the $90 night fits', ok:true},
    {label:'Skip \u2014 nothing is ever safe to spend', ok:false, mis:'nothing-safe'},
    {label:'Go and spend $200 \u2014 the whole safe amount in one night', ok:false, mis:'daily-equals-total'},
    {label:'Go \u2014 the car payment can come from next week\u2019s pay', ok:false, mis:'obligation-is-available'}],
   cue:'Safe to spend = $380 \u2212 $180. Is $90 under that?',
   hint:'One subtraction, then compare.',
   good:'Safe to spend is $200 and the night costs $90 \u2014 it fits with room to spare.',
   bad:'Skipping everything is as wrong as spending everything. The safe number says yes.',
   why:'Safe-to-spend gives permission too \u2014 not just limits.'};
 }},
{id:'safe-to-spend-decide-03', verb:'decide', part:3, tier:'guided', skill:'safe-to-spend',
 gen:(v)=>{
  const person=v.person();
  return {
   q:`${person} sees $500 in the account and wants a $200 game console. There is a $300 tuition payment due in 4 days. What is the call?`,
   choices:[
    {label:'Wait \u2014 safe to spend is $200 only if savings is $0; tuition eats it first', ok:true},
    {label:'Buy it \u2014 $500 minus $200 leaves $300 for tuition', ok:false, mis:'total-is-safe'},
    {label:'Buy it \u2014 tuition is 4 days away, basically next month', ok:false, mis:'obligation-is-available'},
    {label:'Buy it now, figure out tuition when it is due', ok:false, mis:'plan-never-changes'}],
   cue:'Tuition is a dated job: $500 \u2212 $300 = $200 safe. Now compare.',
   hint:'The console costs exactly the safe amount \u2014 but is there any cushion?',
   good:'Safe to spend is exactly $200, and spending every safe dollar leaves zero cushion. Waiting is the call.',
   bad:'Spending the safe number to zero on a want leaves the plan with no shock absorber.',
   why:'"Fits" is not the same as "wise." Safe-to-spend is the ceiling, and ceilings deserve margins.'};
 }},
{id:'safe-to-spend-decide-04', verb:'decide', part:3, tier:'guided', skill:'safe-to-spend',
 gen:(v)=>{
  const person=v.person();
  return {
   q:`${person}: balance $310, pending charge $70, electric bill $90 due tomorrow. A $100 pair of shoes is on sale. What is the call?`,
   choices:[
    {label:'Pass \u2014 safe to spend is $150, and the shoes plus cushion do not fit well', ok:true},
    {label:'Buy \u2014 $310 is plenty', ok:false, mis:'total-is-safe'},
    {label:'Buy \u2014 pending charges do not count until they post', ok:false, mis:'obligation-is-available'},
    {label:'Buy \u2014 the sale ends today, bills can be late once', ok:false}],
   cue:'Safe = $310 \u2212 $70 \u2212 $90. Do the shoes fit with room to spare?',
   hint:'Subtract the pending charge AND the bill.',
   good:'Safe to spend is $150. Technically $100 fits, but with bills this tight the wise call is to pass or wait.',
   bad:'Ignoring pending charges and tomorrow\u2019s bill turns a $310 balance into a bounced payment.',
   why:'Tight safe numbers mean wants wait \u2014 the margin is the safety.'};
 }},
{id:'safe-to-spend-decide-05', verb:'decide', part:3, tier:'guided', skill:'safe-to-spend',
 gen:(v)=>{
  const person=v.person();
  return {
   q:`${person}: balance $650, rent $400 due Friday, savings $80. A friend asks to borrow $100 "until next week." What is the call?`,
   choices:[
    {label:'Lend $100 only if it fits inside the $170 safe-to-spend', ok:true},
    {label:'Lend it \u2014 $650 is more than enough', ok:false, mis:'total-is-safe'},
    {label:'Lend $250 \u2014 rent is not due until Friday', ok:false, mis:'obligation-is-available'},
    {label:'Never lend \u2014 safe-to-spend can never leave the account', ok:false, mis:'nothing-safe'}],
   cue:'Safe = $650 \u2212 $400 \u2212 $80 = $170. The loan comes from the safe part only.',
   hint:'Lending is spending until it comes back.',
   good:'$100 fits inside the $170 safe amount. The loan is real spending until repaid \u2014 it must fit the safe number.',
   bad:'Lending from the balance lends the rent money.',
   why:'Any money leaving the account \u2014 even lent \u2014 must fit safe-to-spend.'};
 }},
{id:'safe-to-spend-decide-06', verb:'decide', part:3, tier:'guided', skill:'safe-to-spend',
 gen:(v)=>{
  const person=v.person();
  return {
   q:`${person} gets paid $700. Bills due before next payday total $450, savings move $100. A $200 festival ticket goes on sale. What is the call?`,
   choices:[
    {label:'Skip or find $150 \u2014 safe to spend is $150, not $200', ok:true},
    {label:'Buy \u2014 $700 paycheck, $200 ticket, easy', ok:false, mis:'total-is-safe'},
    {label:'Buy \u2014 savings can be skipped this once', ok:false, mis:'savings-doesnt-touch-spending'},
    {label:'Buy two \u2014 bring a friend, the paycheck covers it', ok:false, mis:'afford-more'}],
   cue:'Safe = $700 \u2212 $450 \u2212 $100. Compare $200 to that.',
   hint:'New paycheck, same rule.',
   good:'Safe to spend is $150. The $200 ticket is $50 over \u2014 it waits or gets cheaper.',
   bad:'Payday excitement spends bills and savings before they are protected.',
   why:'Payday is when safe-to-spend matters most, because the balance looks biggest.'};
 }},
{id:'safe-to-spend-decide-07', verb:'decide', part:3, tier:'guided', skill:'safe-to-spend',
 gen:(v)=>{
  const person=v.person();
  return {
   q:`${person}: balance $290. Groceries ($70) and gas ($40) not yet bought. A $180 subscription box renews tonight \u2014 cancel or keep?`,
   choices:[
    {label:'Cancel \u2014 safe to spend is $180, and the box would eat all of it', ok:true},
    {label:'Keep \u2014 $290 covers everything', ok:false, mis:'total-is-safe'},
    {label:'Keep \u2014 groceries and gas are next week\u2019s problem', ok:false, mis:'obligation-is-available'},
    {label:'Keep and also order takeout \u2014 subscriptions do not count', ok:false}],
   cue:'Safe = $290 \u2212 $70 \u2212 $40 = $180. The box costs exactly that.',
   hint:'The box costs the ENTIRE safe amount.',
   good:'Spending 100% of the safe number on a box leaves zero for the week\u2019s real life. Cancel.',
   bad:'"Covers everything" math forgets that groceries and gas are real.',
   why:'A want that consumes the whole safe number is a no \u2014 margins matter.'};
 }},
{id:'safe-to-spend-decide-08', verb:'decide', part:3, tier:'guided', skill:'safe-to-spend',
 gen:(v)=>{
  const person=v.person();
  return {
   q:`${person}: balance $520, no bills due for 10 days, savings move $60 done. Safe to spend is $460. A $400 emergency car repair hits. What is the call?`,
   choices:[
    {label:'Pay it \u2014 repairs are needs, and $460 safe covers $400', ok:true},
    {label:'Wait 10 days \u2014 no bills due means no spending allowed', ok:false, mis:'nothing-safe'},
    {label:'Pay it from savings \u2014 never touch safe-to-spend', ok:false, mis:'savings-doesnt-touch-spending'},
    {label:'Pay it and skip listing it \u2014 emergencies do not count', ok:false, mis:'daily-equals-total'}],
   cue:'Safe = $520 \u2212 $60 = $460. A need can use safe money.',
   hint:'Repairs are needs. Needs can spend the safe number.',
   good:'The car repair is a need, and $400 fits inside $460 safe. Pay it, log it, move on.',
   bad:'Safe-to-spend is not a museum piece. Needs are exactly what it is for.',
   why:'Safe money exists to be USED on needs and paced wants \u2014 that is the whole point.'};
 }},
{id:'safe-to-spend-spot-01', verb:'spot', part:2, tier:'independent', skill:'safe-to-spend',
 gen:(v)=>{
  const person=v.person();
  return {
   scenario:`<p>${person}\u2019s Saturday:</p><ul><li>Account balance: $380</li><li>Spent $200 on clothes: "I had $380!"</li><li>Monday: $150 rent portion auto-drafts \u2014 account overdraws</li></ul>`,
   q:'What is the mistake here?',
   choices:[
    {label:'Spent from the balance instead of the safe-to-spend ($380 \u2212 jobs)', ok:true},
    {label:'The math \u2014 $380 minus $200 is $180, not $230', ok:false, mis:'close-enough-math'},
    {label:'Shopping on Saturday \u2014 weekends are unsafe', ok:false},
    {label:'Having autopay at all', ok:false}],
   hint:'What else lived inside that $380?',
   good:'The $380 held Monday\u2019s rent draft. Spending $200 from the balance spent the rent.',
   bad:'The subtraction was right; the number was wrong. Balance is not safe-to-spend.',
   why:'The balance holds jobbed dollars. Spending it spends their jobs too.'};
 }},
{id:'safe-to-spend-spot-02', verb:'spot', part:2, tier:'independent', skill:'safe-to-spend',
 gen:(v)=>{
  const person=v.person();
  return {
   scenario:`<p>${person}\u2019s plan:</p><ul><li>Balance: $450</li><li>"Safe to spend: $450 \u2212 $200 rent = $250"</li><li>Forgot: $60 savings move and $40 pending charge</li><li>Spent $250 on a weekend trip</li></ul>`,
   q:'What is the mistake here?',
   choices:[
    {label:'Left two jobs out \u2014 real safe-to-spend was $150, not $250', ok:true},
    {label:'The rent subtraction \u2014 rent should never be subtracted', ok:false, mis:'obligation-is-available'},
    {label:'Weekend trips are never allowed', ok:false, mis:'nothing-safe'},
    {label:'The balance was too low to travel at all', ok:false}],
   hint:'Count the jobs again.',
   good:'$450 \u2212 $200 \u2212 $60 \u2212 $40 = $150. The $100 overspend came from savings and the pending charge.',
   bad:'A safe number built on a partial job list is a confident wrong number.',
   why:'Every job counts. Miss one and the "safe" number lies.'};
 }},
{id:'safe-to-spend-spot-03', verb:'spot', part:2, tier:'independent', skill:'safe-to-spend',
 gen:(v)=>{
  const person=v.person();
  return {
   scenario:`<p>${person}\u2019s logic:</p><ul><li>"My $75 pending gas charge has not posted yet"</li><li>"So my safe-to-spend is $75 higher"</li><li>Spends the "extra" $75 on takeout</li></ul>`,
   q:'What is the mistake here?',
   choices:[
    {label:'Pending money is already gone \u2014 it must be subtracted', ok:true},
    {label:'Gas is a want, not a job', ok:false},
    {label:'Takeout is always the mistake, not the math', ok:false},
    {label:'The $75 should be doubled before subtracting', ok:false, mis:'close-enough-math'}],
   hint:'Where is that $75 going?',
   good:'Pending = leaving. The $75 was never available, posted or not.',
   bad:'"Not posted yet" is a bank delay, not free money.',
   why:'Money on its way out counts the moment it is committed.'};
 }},
{id:'safe-to-spend-spot-04', verb:'spot', part:2, tier:'independent', skill:'safe-to-spend',
 gen:(v)=>{
  const person=v.person();
  return {
   scenario:`<p>${person}\u2019s week:</p><ul><li>Correctly calculated safe-to-spend: $180</li><li>Spent $180 on day one: "It was all safe!"</li><li>Days 2\u20137: $0, ate a friend\u2019s leftovers</li></ul>`,
   q:'What is the mistake here?',
   choices:[
    {label:'Safe-to-spend is the total, not a daily allowance \u2014 it still needs pacing', ok:true},
    {label:'The calculation was wrong \u2014 $180 can never be safe', ok:false, mis:'nothing-safe'},
    {label:'Eating leftovers \u2014 pride should have bought food', ok:false},
    {label:'Nothing \u2014 spending safe money fast is the goal', ok:false, mis:'daily-equals-total'}],
   hint:'Safe for WHEN?',
   good:'$180 safe for the week paced at ~$26/day. Spending it Monday starves the week.',
   bad:'"All safe" does not mean "all today." Safe-to-spend still gets paced across time.',
   why:'Safe-to-spend answers HOW MUCH. Pacing answers HOW FAST.'};
 }},
{id:'safe-to-spend-spot-05', verb:'spot', part:2, tier:'independent', skill:'safe-to-spend',
 gen:(v)=>{
  const person=v.person();
  return {
   scenario:`<p>${person}\u2019s reasoning:</p><ul><li>"Safe to spend is $0 this week"</li><li>"So I will just not pay the $120 electric bill"</li><li>"That makes $120 safe to spend!"</li></ul>`,
   q:'What is the mistake here?',
   choices:[
    {label:'Skipping a job to create "safe" money \u2014 the bill is still owed', ok:true},
    {label:'The math \u2014 $0 safe means $0, bills do not change it', ok:false},
    {label:'Electric bills are wants, not jobs', ok:false, mis:'obligation-is-available'},
    {label:'$120 is too small to matter', ok:false}],
   hint:'Does the bill disappear if you ignore it?',
   good:'Unpaid bills do not vanish \u2014 they grow (fees, shutoff). The $120 was never safe.',
   bad:'Deleting a job from the list does not delete it from reality.',
   why:'Safe-to-spend only works with an HONEST job list.'};
 }},
{id:'safe-to-spend-spot-06', verb:'spot', part:2, tier:'independent', skill:'safe-to-spend',
 gen:(v)=>{
  const person=v.person();
  return {
   scenario:`<p>${person}\u2019s payday:</p><ul><li>$700 deposited, balance looks amazing</li><li>Spends $300 on fun Friday night</li><li>Never lists the $450 in bills due before next payday</li><li>Sunday: $400 left, $450 due</li></ul>`,
   q:'What is the mistake here?',
   choices:[
    {label:'Spent from the payday balance before listing the jobs', ok:true},
    {label:'Having fun on Friday \u2014 paydays are for bills only', ok:false, mis:'nothing-safe'},
    {label:'The $700 deposit \u2014 paydays should be smaller', ok:false},
    {label:'Checking the balance \u2014 that is what caused it', ok:false}],
   hint:'What should happen BEFORE the fun?',
   good:'Jobs first: $700 \u2212 $450 \u2212 savings = the real safe number. Friday spent the bills.',
   bad:'Payday is the most dangerous day for balance-thinking \u2014 the number looks biggest.',
   why:'List the jobs before ANY spending. Payday order: protect, then play.'};
 }},
{id:'safe-to-spend-compare-01', verb:'compare', part:2, tier:'independent', skill:'safe-to-spend',
 gen:(v)=>{
  return {
   context:'<p><b>Dev:</b> Balance $500, subtracts $300 rent + $60 savings \u2192 spends from $140.</p><p><b>Sam:</b> Balance $500, spends from $500 until it "feels low."</p>',
   q:'Who handles the weekend better?',
   choices:[
    {label:'Dev \u2014 the $140 is real; Sam\u2019s $500 includes the rent', ok:true},
    {label:'Sam \u2014 more money available means more fun', ok:false, mis:'total-is-safe'},
    {label:'Tie \u2014 same balance, same weekend', ok:false},
    {label:'Sam \u2014 "feels low" is a natural limit', ok:false, mis:'daily-equals-total'}],
   hint:'Whose rent is protected?',
   good:'Dev\u2019s $140 is honest. Sam\u2019s weekend is funded by next week\u2019s rent.',
   bad:'"Feels low" arrives after the damage.',
   why:'Two numbers beat one feeling.'};
 }},
{id:'safe-to-spend-compare-02', verb:'compare', part:2, tier:'independent', skill:'safe-to-spend',
 gen:(v)=>{
  return {
   context:'<p><b>Plan A:</b> Recalculate safe-to-spend every payday and after every big bill.</p><p><b>Plan B:</b> Calculate safe-to-spend once on the 1st and trust it all month.</p>',
   q:'Which plan stays honest?',
   choices:[
    {label:'Plan A \u2014 the safe number changes as jobs come and go', ok:true},
    {label:'Plan B \u2014 one calculation is enough for a month', ok:false, mis:'plan-never-changes'},
    {label:'Tie \u2014 the math is the same either way', ok:false},
    {label:'Plan B \u2014 recalculating just confuses things', ok:false}],
   hint:'Do jobs stay the same all month?',
   good:'New bills, paid bills, pending charges \u2014 the safe number moves. Plan A moves with it.',
   bad:'A month-old safe number is a guess wearing a lab coat.',
   why:'Safe-to-spend is a living number, recalculated as reality changes.'};
 }},
{id:'safe-to-spend-compare-03', verb:'compare', part:2, tier:'independent', skill:'safe-to-spend',
 gen:(v)=>{
  return {
   context:'<p><b>Rae:</b> $600 balance, $400 in jobs \u2192 safe $200, paces it $50/week.</p><p><b>Lee:</b> $600 balance, $400 in jobs \u2192 safe $200, spends it all Monday.</p>',
   q:'What is the difference?',
   choices:[
    {label:'Rae paces the safe number; Lee treats it as one-day money', ok:true},
    {label:'No difference \u2014 both respected the $200', ok:false, mis:'daily-equals-total'},
    {label:'Lee is better \u2014 faster spending is more efficient', ok:false},
    {label:'Rae is wrong \u2014 safe money should be spent immediately', ok:false, mis:'nothing-safe'}],
   hint:'Safe for how long?',
   good:'Rae\u2019s $50/week lasts four weeks. Lee\u2019s Monday ends the week on day one.',
   bad:'The safe number still needs a pace \u2014 it is a total, not a day.',
   why:'Safe-to-spend says HOW MUCH. Pacing says HOW FAST. You need both.'};
 }},
{id:'safe-to-spend-compare-04', verb:'compare', part:2, tier:'independent', skill:'safe-to-spend',
 gen:(v)=>{
  return {
   context:'<p><b>Kim:</b> Lists every job before spending \u2014 rent, bills, savings, pending.</p><p><b>Jo:</b> Subtracts only rent \u2014 "the rest will work out."</p>',
   q:'Whose safe number can be trusted?',
   choices:[
    {label:'Kim \u2014 every job counted', ok:true},
    {label:'Jo \u2014 rent is the only real job', ok:false, mis:'obligation-is-available'},
    {label:'Tie \u2014 both subtracted something', ok:false, mis:'close-enough-math'},
    {label:'Jo \u2014 simpler is safer', ok:false}],
   hint:'What did Jo leave out?',
   good:'Kim\u2019s number survives contact with reality. Jo\u2019s "safe" money includes bills and savings.',
   bad:'Partial job lists make confident wrong numbers.',
   why:'The safe number is only as honest as the job list.'};
 }},
{id:'safe-to-spend-compare-05', verb:'compare', part:2, tier:'independent', skill:'safe-to-spend',
 gen:(v)=>{
  return {
   context:'<p><b>Ari:</b> Safe-to-spend $120 \u2192 skips a $150 want, no drama.</p><p><b>Max:</b> Balance $400 \u2192 buys the $150 want, "still $250 left."</p>',
   q:'Who made the better call?',
   choices:[
    {label:'Ari \u2014 the want did not fit the safe number', ok:true},
    {label:'Max \u2014 $250 left is plenty', ok:false, mis:'total-is-safe'},
    {label:'Tie \u2014 both had enough money', ok:false},
    {label:'Max \u2014 wants should be bought when the balance allows', ok:false, mis:'afford-more'}],
   hint:'What is inside Max\u2019s $250?',
   good:'Ari protected the jobs. Max\u2019s "$250 left" includes next week\u2019s obligations.',
   bad:'Balance-left is not safety \u2014 it is just what has not been spent yet.',
   why:'Good calls run on the safe number, not the leftover balance.'};
 }},
{id:'safe-to-spend-compare-06', verb:'compare', part:2, tier:'independent', skill:'safe-to-spend',
 gen:(v)=>{
  return {
   context:'<p><b>Noa:</b> Safe-to-spend $90 \u2192 treats it as the ceiling for the week.</p><p><b>Eli:</b> Safe-to-spend $90 \u2192 "nothing is safe, I will spend $0."</p>',
   q:'Who uses the safe number correctly?',
   choices:[
    {label:'Noa \u2014 $90 is spendable, with pacing', ok:true},
    {label:'Eli \u2014 zero spending is the only safe move', ok:false, mis:'nothing-safe'},
    {label:'Tie \u2014 both are being careful', ok:false},
    {label:'Eli \u2014 safe-to-spend is just a trick to spend more', ok:false}],
   hint:'What does "safe" mean?',
   good:'Safe means safe. Noa spends within it; Eli treats a green light as a red one.',
   bad:'Hoarding safe money is not discipline \u2014 it is misunderstanding the number.',
   why:'Safe-to-spend gives permission, not just limits.'};
 }},
{id:'safe-to-spend-predict-01', verb:'predict', part:2, tier:'independent', skill:'safe-to-spend',
 gen:(v)=>{
  const person=v.person();
  return {
   q:`${person} spends from the full $450 balance every month and never calculates safe-to-spend. What happens first?`,
   choices:[
    {label:'A job goes unpaid \u2014 a bill or savings move gets eaten', ok:true},
    {label:'Nothing \u2014 $450 always covers everything', ok:false, mis:'total-is-safe'},
    {label:'The balance grows \u2014 spending freely attracts money', ok:false},
    {label:'Bills disappear \u2014 unlisted jobs cancel themselves', ok:false, mis:'obligation-is-available'}],
   hint:'The balance holds jobbed dollars.',
   good:'Month after month, spending the balance spends the jobs inside it. Something dated breaks first.',
   bad:'The balance is not a budget. Unlisted jobs do not vanish.',
   why:'Balance-spending is job-eating with extra steps.'};
 }},
{id:'safe-to-spend-predict-02', verb:'predict', part:2, tier:'independent', skill:'safe-to-spend',
 gen:(v)=>{
  const person=v.person();
  return {
   q:`${person} calculates safe-to-spend as $160 but "rounds it up" to $200 for the week. What breaks first?`,
   choices:[
    {label:'The $40 cushion \u2014 the last $40 of the week comes from a job', ok:true},
    {label:'Nothing \u2014 rounding is harmless', ok:false, mis:'close-enough-math'},
    {label:'The math \u2014 $160 and $200 are the same number', ok:false},
    {label:'The week \u2014 rounding makes weeks shorter', ok:false}],
   hint:'Where does the extra $40 come from?',
   good:'The $40 has to come from somewhere \u2014 and "somewhere" is a jobbed dollar.',
   bad:'Rounding up a safety number rounds down your safety.',
   why:'The safe number is exact for a reason. Padding it pads the risk.'};
 }},
{id:'safe-to-spend-predict-03', verb:'predict', part:2, tier:'independent', skill:'safe-to-spend',
 gen:(v)=>{
  const person=v.person();
  return {
   q:`${person} ignores a $65 pending charge "because it has not posted." What happens when it posts mid-week?`,
   choices:[
    {label:'The safe number was $65 too high \u2014 the week breaks', ok:true},
    {label:'Nothing \u2014 pending charges never post', ok:false},
    {label:'The bank covers it for free', ok:false, mis:'obligation-is-available'},
    {label:'The charge disappears if ignored long enough', ok:false}],
   hint:'Posted or pending \u2014 where is the money going?',
   good:'The $65 was always leaving. Ignoring it just meant the safe number lied by $65.',
   bad:'Bank delays do not create money.',
   why:'Pending is gone. Count it now or pay for it later.'};
 }},
{id:'safe-to-spend-predict-04', verb:'predict', part:2, tier:'independent', skill:'safe-to-spend',
 gen:(v)=>{
  const person=v.person();
  return {
   q:`${person} lists jobs honestly and finds safe-to-spend is $25 for the week. What is the smartest prediction?`,
   choices:[
    {label:'A tight, careful week \u2014 $25 paced, no surprises', ok:true},
    {label:'Disaster \u2014 $25 means the system failed', ok:false, mis:'nothing-safe'},
    {label:'Freedom \u2014 $25 safe means $25 to waste', ok:false, mis:'daily-equals-total'},
    {label:'Error \u2014 safe-to-spend can never be that low', ok:false}],
   hint:'The number is honest. What does honesty allow?',
   good:'$25 honest beats $200 imaginary. A tight week survived is a win.',
   bad:'A low safe number is information, not failure.',
   why:'The safe number tells the truth even when the truth is tight.'};
 }},
{id:'safe-to-spend-predict-05', verb:'predict', part:2, tier:'independent', skill:'safe-to-spend',
 gen:(v)=>{
  const person=v.person();
  return {
   q:`${person} gets a $300 side-gig payment and adds it straight to safe-to-spend without listing new jobs. What is the risk?`,
   choices:[
    {label:'Hidden jobs \u2014 the $300 may owe taxes or upcoming bills', ok:true},
    {label:'No risk \u2014 new money is always fully safe', ok:false, mis:'total-is-safe'},
    {label:'The $300 will vanish on its own', ok:false},
    {label:'Side-gig money does not count as money', ok:false, mis:'job-money-extra'}],
   hint:'New money, same rule.',
   good:'Every new dollar needs the job check first. Gig money can owe taxes or cover gaps.',
   bad:'"New" does not mean "jobless." The rule applies to every dollar.',
   why:'Safe-to-spend is recalculated on every new dollar, jobs first.'};
 }},
{id:'safe-to-spend-predict-06', verb:'predict', part:2, tier:'independent', skill:'safe-to-spend',
 gen:(v)=>{
  const person=v.person();
  return {
   q:`${person} uses safe-to-spend perfectly for a month, then stops recalculating. What happens?`,
   choices:[
    {label:'Drift \u2014 old safe numbers go stale as jobs change', ok:true},
    {label:'Nothing \u2014 one good month locks it in', ok:false, mis:'plan-never-changes'},
    {label:'Growth \u2014 the habit earns interest now', ok:false, mis:'savings-compounds'},
    {label:'Freedom \u2014 the training wheels can come off forever', ok:false, mis:'no-pace-needed'}],
   hint:'Do bills stay the same forever?',
   good:'Jobs change weekly. A frozen safe number is a guess within days.',
   bad:'The system is the recalculating, not the one good month.',
   why:'Safe-to-spend is a habit, not a trophy.'};
 }},
{id:'safe-to-spend-build-01', verb:'build', part:3, tier:'guided', skill:'safe-to-spend',
 gen:(v)=>{
  const total=450;
  return {
   h:'Build it: find the safe number',
   body:'<p>Split the $450 balance: $250 rent due Friday, $60 savings move, and the rest is safe to spend.</p>',
   totalDollars: total,
   buckets:[{id:'rent',label:'Rent (job)'},{id:'savings',label:'Savings (job)'},{id:'safe',label:'Safe to spend'}],
   targets:{rent:250, savings:60, safe:140},
   cue:'Jobs first: rent and savings. The remainder is the safe number.',
   hint:'450 \u2212 250 \u2212 60.',
   good:'$140 safe to spend, with rent and savings protected.',
   bad:'Anything over $140 safe dips into a job.',
   why:'Build the safe number by subtracting every job.'};
 }},
{id:'safe-to-spend-build-02', verb:'build', part:3, tier:'guided', skill:'safe-to-spend',
 gen:(v)=>{
  const total=600;
  return {
   h:'Build it: payday split',
   body:'<p>Split the $600 paycheck: $320 bills due before next payday, $80 savings, rest is safe.</p>',
   totalDollars: total,
   buckets:[{id:'bills',label:'Bills (jobs)'},{id:'savings',label:'Savings (job)'},{id:'safe',label:'Safe to spend'}],
   targets:{bills:320, savings:80, safe:200},
   cue:'Two jobs: bills and savings. Safe is what remains.',
   hint:'600 \u2212 320 \u2212 80.',
   good:'$200 safe, bills and savings untouched.',
   bad:'Payday balances lie the loudest \u2014 subtract first.',
   why:'Payday order: jobs, savings, then the safe remainder.'};
 }},
{id:'safe-to-spend-build-03', verb:'build', part:3, tier:'guided', skill:'safe-to-spend',
 gen:(v)=>{
  const total=380;
  return {
   h:'Build it: pending counts too',
   body:'<p>Split $380: $70 pending charge, $90 electric bill tomorrow, $40 savings, rest safe.</p>',
   totalDollars: total,
   buckets:[{id:'pending',label:'Pending (job)'},{id:'bill',label:'Bill due (job)'},{id:'savings',label:'Savings (job)'},{id:'safe',label:'Safe to spend'}],
   targets:{pending:70, bill:90, savings:40, safe:180},
   cue:'Four buckets, three jobs. Pending and due-tomorrow both count.',
   hint:'380 \u2212 70 \u2212 90 \u2212 40.',
   good:'$180 safe. Pending and tomorrow\u2019s bill are real jobs.',
   bad:'Forgetting pending money overstates safety by exactly the pending amount.',
   why:'If it is leaving, it is a job \u2014 posted or not.'};
 }},
{id:'safe-to-spend-build-04', verb:'build', part:3, tier:'guided', skill:'safe-to-spend',
 gen:(v)=>{
  const total=520;
  return {
   h:'Build it: tuition week',
   body:'<p>Split $520: $300 tuition due next week, $60 savings move, rest safe.</p>',
   totalDollars: total,
   buckets:[{id:'tuition',label:'Tuition (job)'},{id:'savings',label:'Savings (job)'},{id:'safe',label:'Safe to spend'}],
   targets:{tuition:300, savings:60, safe:160},
   cue:'A dated obligation is a job even a week out.',
   hint:'520 \u2212 300 \u2212 60.',
   good:'$160 safe, tuition and savings protected.',
   bad:'"Next week" tuition is this week\u2019s subtraction.',
   why:'Dated jobs count the moment you know them.'};
 }},
{id:'safe-to-spend-build-05', verb:'build', part:3, tier:'guided', skill:'safe-to-spend',
 gen:(v)=>{
  const total=700;
  return {
   h:'Build it: the full two-number split',
   body:'<p>Split $700: $400 rent+jobs, $100 savings, and keep a $50 cushion inside the safe amount.</p>',
   totalDollars: total,
   buckets:[{id:'jobs',label:'All jobs'},{id:'savings',label:'Savings'},{id:'safe',label:'Safe to spend'},{id:'cushion',label:'Cushion'}],
   targets:{jobs:400, savings:100, safe:150, cushion:50},
   cue:'Jobs and savings first; then split the remainder into safe + cushion.',
   hint:'700 \u2212 400 \u2212 100 = 200; hold $50 back.',
   good:'$150 safe to spend plus a $50 cushion \u2014 jobs protected, margin kept.',
   bad:'Spending the cushion as "safe" erases the margin.',
   why:'Even the safe number deserves a cushion.'};
 }},
{id:'safe-to-spend-explain-01', verb:'explain', part:3, tier:'guided', skill:'safe-to-spend',
 gen:(v)=>({
  h:'Teach it back: the two numbers',
  prompt:'Explain the difference between balance and safe-to-spend.',
  keyPoints:['Balance is what the account shows right now','Safe-to-spend is balance minus every dollar with a job','Jobs include dated bills, pending charges, and savings moves','Spending from the balance spends jobbed dollars too'],
  modelAnswer:'The balance is what exists in the account. Safe-to-spend is what is left after subtracting every dollar that already has a job \u2014 rent, bills, pending charges, savings. Spending from the balance alone spends money that belongs to those jobs.',
  hint:'One is a snapshot; the other is a calculation.',
  cue:'Start with: "Balance is what exists. Safe-to-spend is what is left."'
 })},
{id:'safe-to-spend-explain-02', verb:'explain', part:3, tier:'guided', skill:'safe-to-spend',
 gen:(v)=>({
  h:'Teach it back: what counts as a job',
  prompt:'Explain what counts as "money with a job."',
  keyPoints:['Dated obligations like rent and bills','Pending charges that have not posted yet','Committed savings moves','Needs you have not bought yet, like groceries'],
  modelAnswer:'Money with a job is any dollar already spoken for: rent and bills with due dates, pending charges on their way out, savings moves you committed to, and needs you still have to buy like groceries. If it is leaving or promised, it is jobbed.',
  hint:'Think of everything that will leave the account soon.',
  cue:'Ask: "Is this dollar already promised to something?"'
 })},
{id:'safe-to-spend-explain-03', verb:'explain', part:3, tier:'guided', skill:'safe-to-spend',
 gen:(v)=>({
  h:'Teach it back: why payday is dangerous',
  prompt:'Explain why payday is the most dangerous day for balance-thinking.',
  keyPoints:['The balance looks biggest right after payday','Jobs have not been subtracted yet','Spending early eats bills due later','Listing jobs first fixes the order'],
  modelAnswer:'Right after payday the balance looks huge, but none of the jobs have been subtracted yet. Spending from that big number eats the bills due later in the pay period. Listing every job first \u2014 then spending from the safe remainder \u2014 keeps payday from becoming bill-day regret.',
  hint:'What does the balance show vs what does it hide?',
  cue:'Biggest balance = biggest illusion.'
 })},
{id:'safe-to-spend-explain-04', verb:'explain', part:3, tier:'guided', skill:'safe-to-spend',
 gen:(v)=>({
  h:'Teach it back: safe money still gets paced',
  prompt:'Explain why safe-to-spend still needs pacing.',
  keyPoints:['Safe-to-spend is a total, not a daily amount','Spending it all on day one starves the rest of the week','Pacing spreads the safe total across time','Safe answers how much; pace answers how fast'],
  modelAnswer:'Safe-to-spend tells you how much is truly yours, but not how fast to use it. Spending the whole safe total on Monday leaves nothing for the rest of the week. Pacing the safe amount across the days or weeks keeps it lasting.',
  hint:'Two questions: how much, and how fast?',
  cue:'Safe = HOW MUCH. Pace = HOW FAST.'
 })},
{id:'safe-to-spend-explain-05', verb:'explain', part:3, tier:'guided', skill:'safe-to-spend',
 gen:(v)=>({
  h:'Teach it back: the honest job list',
  prompt:'Explain why the job list has to be honest and complete.',
  keyPoints:['Every missed job makes the safe number too high','"Forgetting" a bill does not cancel it','Partial lists create confident wrong numbers','Rechecking the list keeps the number honest'],
  modelAnswer:'The safe number is only as honest as the job list behind it. Every forgotten bill, pending charge, or skipped savings move inflates the safe number by exactly that amount \u2014 and the overspend comes straight out of the forgotten job. An honest, complete list is the whole system.',
  hint:'What happens to a forgotten $60 bill?',
  cue:'Miss a job, and the safe number lies by exactly that much.'
 })},
],
'savings-purpose': [
{id:'savings-purpose-choice-01', verb:'choice', part:3, tier:'guided', skill:'savings-purpose',
 gen:(v)=>{
  const person=v.person();
  return {
   q:`${person} wants to save $240 over 8 weeks. What is the savings pace?`,
   choices:[
    {label:'$30/week moved to savings first', ok:true},
    {label:'$240 whenever it is left over', ok:false, mis:'savings-from-leftovers'},
    {label:'$15/week \u2014 half the pace is fine', ok:false, mis:'close-enough-math'},
    {label:'$240 in week 8, all at once', ok:false, mis:'no-pace-needed'}],
   cue:'Goal \u00f7 periods. Move it FIRST, not from leftovers.',
   hint:'$240 \u00f7 8.',
   good:'$30/week, moved before spending. 8 \u00d7 $30 = $240, guaranteed by the math.',
   bad:'Leftovers are not a plan \u2014 most weeks leave nothing.',
   why:'Savings goals get their own pace: amount \u00f7 periods, moved first.'};
 }},
{id:'savings-purpose-choice-02', verb:'choice', part:3, tier:'guided', skill:'savings-purpose',
 gen:(v)=>{
  const person=v.person();
  return {
   q:`${person} earns $500, needs are $300, and the savings goal pace is $50. What happens to the $50?`,
   choices:[
    {label:'Moved to savings before any flexible spending', ok:true},
    {label:'Spent first, saved if anything remains', ok:false, mis:'savings-from-leftovers'},
    {label:'Skipped \u2014 $500 paychecks do not need savings', ok:false},
    {label:'Added to flexible spending \u2014 it is basically the same', ok:false, mis:'job-money-extra'}],
   cue:'Savings is a job. Jobs get paid before wants.',
   hint:'Protect first \u2014 savings is protection, not leftovers.',
   good:'The $50 moves first. What remains ($150) is the true flexible amount.',
   bad:'Saving "what remains" after spending leaves $0 most weeks.',
   why:'The NWS order: Needs, then Savings, then Wants get paced.'};
 }},
{id:'savings-purpose-choice-03', verb:'choice', part:3, tier:'guided', skill:'savings-purpose',
 gen:(v)=>{
  const person=v.person();
  return {
   q:`${person} saved $100 toward a $400 goal, then spent $60 of it on concert tickets. What went wrong?`,
   choices:[
    {label:'Treated jobbed savings money as flexible spending money', ok:true},
    {label:'Saved too much \u2014 $100 was excessive', ok:false},
    {label:'Bought concert tickets \u2014 fun is never allowed', ok:false, mis:'nothing-safe'},
    {label:'Nothing \u2014 savings is just stored spending money', ok:false, mis:'savings-doesnt-touch-spending'}],
   cue:'Savings has a job description. What was this money\u2019s job?',
   hint:'The $100 already had a job.',
   good:'That $100 belonged to the $400 goal. Spending it restarted the goal at $40.',
   bad:'Savings with a purpose is not a spare wallet.',
   why:'Purpose is what separates savings from a pile of cash.'};
 }},
{id:'savings-purpose-choice-04', verb:'choice', part:3, tier:'guided', skill:'savings-purpose',
 gen:(v)=>{
  const person=v.person();
  return {
   q:`${person} has two savings goals: $200 for textbooks (10 weeks) and $100 for a trip (10 weeks). What are the paces?`,
   choices:[
    {label:'$20/week textbooks + $10/week trip = $30/week total savings', ok:true},
    {label:'$30/week to one goal, the other waits', ok:false, mis:'keep-separate'},
    {label:'$300 in week 10 for both', ok:false, mis:'savings-from-leftovers'},
    {label:'$15/week each \u2014 split the difference', ok:false, mis:'close-enough-math'}],
   cue:'Each goal gets its own pace: amount \u00f7 periods.',
   hint:'$200 \u00f7 10 and $100 \u00f7 10.',
   good:'Two goals, two paces, one total savings move of $30/week.',
   bad:'Merging or halving the paces breaks the math for at least one goal.',
   why:'Every goal gets a named pace. Add the paces for the total savings move.'};
 }},
{id:'savings-purpose-choice-05', verb:'choice', part:4, tier:'independent', skill:'savings-purpose',
 gen:(v)=>{
  const goal=v.pick([360,480,600]); const wks=v.pick([6,8,12]);
  const pace=goal/wks;
  return {
   q:`Goal: ${v.money(goal)} in ${wks} weeks. What is the weekly savings pace?`,
   choices:[
    {label:v.money(pace)+'/week', ok:true},
    {label:v.money(goal/(wks+2))+'/week \u2014 give it extra weeks', ok:false, mis:'close-enough-math'},
    {label:v.money(pace*2)+'/week \u2014 double it to be safe', ok:false},
    {label:v.money(goal)+'/week \u2014 the whole goal every week', ok:false, mis:'pace-math'}],
   hint:'Goal \u00f7 weeks.',
   good:`${v.money(goal)} \u00f7 ${wks} = ${v.money(pace)}/week, moved first each week.`,
   bad:'Extra weeks and doubled paces are guesses. The division is exact.',
   why:'Goal pace = goal amount \u00f7 number of periods.'};
 }},
{id:'savings-purpose-choice-06', verb:'choice', part:4, tier:'independent', skill:'savings-purpose',
 gen:(v)=>{
  const goal=v.pick([450,750]); const mo=v.pick([3,5,6]);
  const pace=goal/mo;
  return {
   q:`Goal: ${v.money(goal)} in ${mo} months. What is the monthly savings pace?`,
   choices:[
    {label:v.money(pace)+'/month', ok:true},
    {label:v.money(goal/(mo*2))+'/month \u2014 stretch it out', ok:false, mis:'close-enough-math'},
    {label:v.money(goal)+'/month', ok:false, mis:'pace-math'},
    {label:'$0/month \u2014 save it all in the last month', ok:false, mis:'savings-from-leftovers'}],
   hint:'Goal \u00f7 months.',
   good:`${v.money(goal)} \u00f7 ${mo} = ${v.money(pace)}/month, every month, moved first.`,
   bad:'Back-loading the goal bets the whole plan on one future month.',
   why:'Monthly goals get monthly paces \u2014 same division, bigger window.'};
 }},
{id:'savings-purpose-choice-07', verb:'choice', part:4, tier:'independent', skill:'savings-purpose',
 gen:(v)=>{
  const goal=500; const wks=10; const saved=200;
  const pace=(goal-saved)/wks;
  return {
   q:`Goal: ${v.money(goal)} in ${wks} weeks. Already saved ${v.money(saved)}. What is the new weekly pace?`,
   choices:[
    {label:v.money(pace)+'/week on the remaining amount', ok:true},
    {label:v.money(goal/wks)+'/week \u2014 ignore what is saved', ok:false, mis:'close-enough-math'},
    {label:v.money(saved/wks)+'/week \u2014 pace the saved money', ok:false, mis:'pace-math'},
    {label:'$0/week \u2014 $200 saved means the goal is done', ok:false}],
   hint:'Only the REMAINING amount needs pacing.',
   good:`${v.money(goal-saved)} left \u00f7 ${wks} = ${v.money(pace)}/week. Progress lowers the pace.`,
   bad:'Ignoring progress over-saves; quitting under-saves. Pace the remainder.',
   why:'Recalculate the goal pace on what is left, not the original total.'};
 }},
{id:'savings-purpose-choice-08', verb:'choice', part:4, tier:'independent', skill:'savings-purpose',
 gen:(v)=>{
  const person=v.person();
  const goal=240; const wks=8; const pace=30;
  return {
   q:`${person}\u2019s goal pace is ${v.money(pace)}/week for ${wks} weeks (${v.money(goal)} total). After 4 weeks, only $80 is saved. What is true?`,
   choices:[
    {label:`Behind by $40 \u2014 the pace must rise to $40/week for 4 weeks`, ok:true},
    {label:'On track \u2014 $80 is close to $120', ok:false, mis:'close-enough-math'},
    {label:'Ahead \u2014 any savings counts as on track', ok:false},
    {label:'Fine \u2014 the goal will catch up on its own', ok:false, mis:'savings-from-leftovers'}],
   hint:'4 weeks \u00d7 $30 = $120 expected. Saved: $80.',
   good:`$120 expected \u2212 $80 saved = $40 behind. Remaining: $160 \u00f7 4 = $40/week.`,
   bad:'"Close" and "any savings" are not measurements. The pace is.',
   why:'Check progress against pace \u00d7 elapsed time, then recalculate.'};
 }},
{id:'savings-purpose-decide-01', verb:'decide', part:3, tier:'guided', skill:'savings-purpose',
 gen:(v)=>{
  const person=v.person();
  return {
   q:`${person} gets a $600 paycheck. Needs $350, savings goal pace $60/week. A friend invites ${person} on a $120 weekend trip. What is the call?`,
   choices:[
    {label:'Move the $60 to savings first, then see if $120 fits the $190 flexible', ok:true},
    {label:'Book the trip \u2014 savings can skip a week', ok:false, mis:'savings-from-leftovers'},
    {label:'Skip savings forever \u2014 trips matter more than goals', ok:false},
    {label:'Borrow the $60 from savings and pay it back "later"', ok:false, mis:'savings-doesnt-touch-spending'}],
   cue:'Order: needs, savings, then flexible. $600 \u2212 $350 \u2212 $60 = ?',
   hint:'Protect first, then decide.',
   good:'$190 flexible. The $120 trip fits \u2014 AFTER the $60 savings move. Order is everything.',
   bad:'Skipping savings "just once" is how goals die quietly.',
   why:'The trip is affordable only because the savings move happened first.'};
 }},
{id:'savings-purpose-decide-02', verb:'decide', part:3, tier:'guided', skill:'savings-purpose',
 gen:(v)=>{
  const person=v.person();
  return {
   q:`${person} has $200 flexible this month and a $50/month savings pace for a laptop. A $180 jacket is on sale. What is the call?`,
   choices:[
    {label:'Move $50 to savings, then the jacket leaves only $150 flexible \u2014 it does not fit; wait', ok:true},
    {label:'Buy the jacket \u2014 $200 covers $180', ok:false, mis:'savings-doesnt-touch-spending'},
    {label:'Buy the jacket and "save double" next month', ok:false, mis:'savings-from-leftovers'},
    {label:'Skip savings \u2014 the jacket is a better investment', ok:false}],
   cue:'Savings first: $200 \u2212 $50 = $150 real flexible. Now compare.',
   hint:'The jacket costs more than the true flexible amount.',
   good:'After the $50 move, only $150 is flexible. The $180 jacket breaks it \u2014 it waits.',
   bad:'"Save double next month" is a promise the future rarely keeps.',
   why:'The savings move shrinks what is truly flexible. Decide from the smaller number.'};
 }},
{id:'savings-purpose-decide-03', verb:'decide', part:3, tier:'guided', skill:'savings-purpose',
 gen:(v)=>{
  const person=v.person();
  return {
   q:`${person} reached a $300 savings goal early. A $120 concert is this weekend. What is the call?`,
   choices:[
    {label:'Set the next goal first, then decide from new flexible money \u2014 not the $300', ok:true},
    {label:'Spend the $300 \u2014 the goal is done, so it is free money', ok:false, mis:'savings-doesnt-touch-spending'},
    {label:'Spend $120 of the $300 \u2014 goals deserve a reward', ok:false, mis:'job-money-extra'},
    {label:'Keep saving with no goal \u2014 purposeless saving is safest', ok:false}],
   cue:'Finished savings needs a NEW job before it becomes spendable.',
   hint:'What is the $300\u2019s job now?',
   good:'Completed savings gets reassigned \u2014 new goal, emergency fund, or deliberate spend. Not a reflex splurge.',
   bad:'"Goal done" does not convert savings into fun money automatically.',
   why:'Every dollar keeps a job. Finished goals get new jobs, not no jobs.'};
 }},
{id:'savings-purpose-decide-04', verb:'decide', part:3, tier:'guided', skill:'savings-purpose',
 gen:(v)=>{
  const person=v.person();
  return {
   q:`${person}\u2019s savings pace is $40/week, but this week\u2019s paycheck is short \u2014 only $20 can be spared. What is the call?`,
   choices:[
    {label:'Move the $20 and recalculate the pace on the remaining goal', ok:true},
    {label:'Skip entirely \u2014 partial savings do not count', ok:false, mis:'savings-from-leftovers'},
    {label:'Skip and quit the goal \u2014 one short week ruins it', ok:false},
    {label:'Move $40 anyway by skipping a need', ok:false, mis:'protect-first'}],
   cue:'Partial progress is real progress. Pace the remainder.',
   hint:'$20 moved is $20 closer.',
   good:'The $20 moves, the goal shrinks by $20, and the pace recalculates. The plan bends; it does not break.',
   bad:'All-or-nothing thinking turns one tight week into a dead goal.',
   why:'A smaller move still moves. Recalculate, don\u2019t abandon.'};
 }},
{id:'savings-purpose-decide-05', verb:'decide', part:3, tier:'guided', skill:'savings-purpose',
 gen:(v)=>{
  const person=v.person();
  return {
   q:`${person} has $90 flexible and two savings goals: $30/week textbooks, $20/week trip. A $50 game drops. What is the call?`,
   choices:[
    {label:'Move $50 to savings first \u2014 the game does not fit the $40 left', ok:true},
    {label:'Buy the game \u2014 $90 covers $50', ok:false, mis:'savings-doesnt-touch-spending'},
    {label:'Buy the game and pause one goal "temporarily"', ok:false, mis:'savings-from-leftovers'},
    {label:'Split the game cost across both goals\u2019 money', ok:false, mis:'job-money-extra'}],
   cue:'Savings first: $90 \u2212 $30 \u2212 $20 = $40 flexible.',
   hint:'Two paces, one total savings move.',
   good:'After both goal paces, $40 is flexible. The $50 game waits a week.',
   bad:'Pausing a goal "temporarily" is usually permanent.',
   why:'Multiple goals stack into one savings move \u2014 protected before any want.'};
 }},
{id:'savings-purpose-decide-06', verb:'decide', part:3, tier:'guided', skill:'savings-purpose',
 gen:(v)=>{
  const person=v.person();
  return {
   q:`${person} gets an unexpected $100. The textbook goal still needs $80. What is the call?`,
   choices:[
    {label:'Finish the goal with $80, then decide the $20 deliberately', ok:true},
    {label:'Spend all $100 \u2014 windfalls are fun money', ok:false, mis:'job-money-extra'},
    {label:'Save all $100 with no purpose \u2014 more savings is always better', ok:false},
    {label:'Ignore the goal \u2014 it was going fine without the $100', ok:false, mis:'savings-from-leftovers'}],
   cue:'Windfalls accelerate goals first \u2014 that is their best job.',
   hint:'The goal needs $80. The windfall is $100.',
   good:'$80 completes the goal early; the $20 gets its own deliberate decision.',
   bad:'Windfalls spent reflexively are just lottery-ticket thinking.',
   why:'Unexpected money\u2019s highest use is finishing a goal early.'};
 }},
{id:'savings-purpose-decide-07', verb:'decide', part:3, tier:'guided', skill:'savings-purpose',
 gen:(v)=>{
  const person=v.person();
  return {
   q:`${person}\u2019s friend says "just save what is left at the end of the month." ${person}\u2019s goal needs $60/month. What is the call?`,
   choices:[
    {label:'Reject it \u2014 move $60 first; leftovers average near zero', ok:true},
    {label:'Accept it \u2014 simpler and it usually works out', ok:false, mis:'savings-from-leftovers'},
    {label:'Accept it but double the goal to $120', ok:false},
    {label:'Reject savings entirely \u2014 goals are stressful', ok:false}],
   cue:'What is left at month\u2019s end, honestly, most months?',
   hint:'Think about your own last three month-ends.',
   good:'Pay-yourself-first beats pay-yourself-last because spending expands to fill the account.',
   bad:'"What is left" is a wish, not a system.',
   why:'Savings from leftovers fails because there are rarely leftovers.'};
 }},
{id:'savings-purpose-decide-08', verb:'decide', part:3, tier:'guided', skill:'savings-purpose',
 gen:(v)=>{
  const person=v.person();
  return {
   q:`${person} is offered overtime: +$80 this week. The emergency fund goal pace is $25/week. What is the call?`,
   choices:[
    {label:'Take it; move the $25 pace, then the extra $55 is truly flexible', ok:true},
    {label:'Take it and spend all $80 \u2014 overtime is bonus money', ok:false, mis:'job-money-extra'},
    {label:'Skip it \u2014 extra money complicates the plan', ok:false},
    {label:'Take it and skip the $25 pace since $80 "covers it"', ok:false, mis:'savings-from-leftovers'}],
   cue:'Extra income still runs the NWS order: needs, savings, then flexible.',
   hint:'The $25 pace still moves first.',
   good:'Overtime accelerates everything: the pace moves, and $55 of genuinely free money appears.',
   bad:'"Bonus" framing turns extra income into extra spending.',
   why:'More income means the same system, faster \u2014 not a day off from it.'};
 }},
{id:'savings-purpose-spot-01', verb:'spot', part:3, tier:'guided', skill:'savings-purpose',
 gen:(v)=>{
  const person=v.person();
  return {
   scenario:`<p>${person}\u2019s month:</p><ul><li>Goal: save $100</li><li>Strategy: "spend normally, save what is left"</li><li>Month end: $4 left \u2014 saved $4</li><li>Conclusion: "I just do not earn enough to save"</li></ul>`,
   q:'What is the mistake here?',
   choices:[
    {label:'Saving from leftovers instead of moving $25/week first', ok:true},
    {label:'The goal \u2014 $100 is too much for anyone', ok:false},
    {label:'Spending normally \u2014 all spending is the mistake', ok:false, mis:'nothing-safe'},
    {label:'The conclusion \u2014 earning more is the only fix', ok:false, mis:'job-money-extra'}],
   cue:'What gets paid first in the NWS order?',
   hint:'"What is left" is doing the work here.',
   good:'Leftovers averaged $4 because spending expands to fill the account. $25/week moved first would have hit $100.',
   bad:'The income was not the problem. The order was.',
   why:'Pay yourself first. Leftovers are a hope, not a plan.'};
 }},
{id:'savings-purpose-spot-02', verb:'spot', part:3, tier:'guided', skill:'savings-purpose',
 gen:(v)=>{
  const person=v.person();
  return {
   scenario:`<p>${person}\u2019s savings account:</p><ul><li>Balance: $350, labeled "savings"</li><li>Spent $120 on shoes: "it was in savings, so it was saved money being used"</li><li>Textbook goal: still $200 short, due in 3 weeks</li></ul>`,
   q:'What is the mistake here?',
   choices:[
    {label:'No job description \u2014 "savings" with no goal is just a spending pile', ok:true},
    {label:'The shoes \u2014 shoes are never a valid purchase', ok:false},
    {label:'The textbook goal \u2014 goals should not have deadlines', ok:false},
    {label:'Labeling the account \u2014 labels do not matter', ok:false, mis:'keep-separate'}],
   cue:'What was the $350 FOR?',
   hint:'A goal without a name is a pile without a guard.',
   good:'Savings needs a job description: "$350 for textbooks by May." Without it, any want raids it.',
   bad:'The shoes were not the core problem \u2014 the undefended pile was.',
   why:'Named goals defend themselves. Unnamed savings is just delayed spending.'};
 }},
{id:'savings-purpose-spot-03', verb:'spot', part:3, tier:'guided', skill:'savings-purpose',
 gen:(v)=>{
  const person=v.person();
  return {
   scenario:`<p>${person}\u2019s plan:</p><ul><li>Goal: $240 in 8 weeks ($30/week pace)</li><li>Week 1: moved $30 \u2713</li><li>Week 2: "I will move $60 next week to catch up" \u2014 moved $0</li><li>Week 3: moved $0 \u2014 "still catching up next week"</li></ul>`,
   q:'What is the mistake here?',
   choices:[
    {label:'Borrowing from future weeks instead of moving this week\u2019s $30', ok:true},
    {label:'The pace \u2014 $30/week is too aggressive', ok:false},
    {label:'Moving $30 in week 1 \u2014 should have waited', ok:false, mis:'savings-from-leftovers'},
    {label:'Having a goal at all \u2014 goals create pressure', ok:false}],
   cue:'Which week\u2019s $30 is real: this week\u2019s or "next week\u2019s"?',
   hint:'"Next week" has never paid anyone.',
   good:'Each skipped $30 becomes a $60 future burden that never arrives. Move this week\u2019s money this week.',
   bad:'Catch-up promises compound like debt \u2014 in the wrong direction.',
   why:'The savings pace is weekly because weeks are when money exists.'};
 }},
{id:'savings-purpose-spot-04', verb:'spot', part:3, tier:'guided', skill:'savings-purpose',
 gen:(v)=>{
  const person=v.person();
  return {
   scenario:`<p>${person}\u2019s payday:</p><ul><li>$550 paycheck</li><li>Needs: $380</li><li>Moved $100 to savings (no goal): "saving extra is good"</li><li>Flexible left: $70 \u2014 but weekly pace needs $90</li></ul>`,
   q:'What is the mistake here?',
   choices:[
    {label:'Saved with no goal and broke the spending pace to do it', ok:true},
    {label:'Saving $100 \u2014 saving is always correct', ok:false, mis:'protect-first'},
    {label:'The $70 flexible \u2014 flexible money should be $0', ok:false, mis:'nothing-safe'},
    {label:'Earning $550 \u2014 too little to save and pace', ok:false}],
   cue:'Savings needs a job AND the pace needs its money. Check both.',
   hint:'$380 + $100 + $70 = $550. What is short?',
   good:'Purposeless over-saving starved the weekly pace. Savings needs a named goal AND a pace that still works.',
   bad:'Saving is not automatically right \u2014 it has to fit the whole plan.',
   why:'Every dollar has ONE job. Over-funding savings under-funds the weeks.'};
 }},
{id:'savings-purpose-spot-05', verb:'spot', part:3, tier:'guided', skill:'savings-purpose',
 gen:(v)=>{
  const person=v.person();
  return {
   scenario:`<p>${person}\u2019s "system":</p><ul><li>Keeps savings and spending in one account</li><li>"I will just remember that $200 of it is savings"</li><li>Month end: spent $180 of the $200 \u2014 "I forgot"</li></ul>`,
   q:'What is the mistake here?',
   choices:[
    {label:'Memory is not separation \u2014 jobbed money needs its own place', ok:true},
    {label:'The $200 goal \u2014 too big to remember', ok:false},
    {label:'Spending $180 \u2014 the amount was the problem', ok:false},
    {label:'Having one account \u2014 everyone needs five accounts', ok:false, mis:'keep-separate'}],
   cue:'What guards the $200 when willpower is tired?',
   hint:'"I will remember" vs a separate envelope.',
   good:'Separate the money \u2014 different account, envelope, or bucket. Memory fails exactly when temptation peaks.',
   bad:'The failure was structural, not moral. Build the guardrail.',
   why:'Jobbed money needs a physical (or digital) boundary, not a mental note.'};
 }},
{id:'savings-purpose-spot-06', verb:'spot', part:3, tier:'guided', skill:'savings-purpose',
 gen:(v)=>{
  const person=v.person();
  return {
   scenario:`<p>${person}\u2019s goal check:</p><ul><li>Goal: $300 in 6 weeks ($50/week)</li><li>After 6 weeks: $300 saved \u2713</li><li>"Great \u2014 now I can stop saving entirely"</li><li>Next surprise expense: $0 saved for it</li></ul>`,
   q:'What is the mistake here?',
   choices:[
    {label:'Treating savings as a one-time project instead of an ongoing habit', ok:true},
    {label:'Hitting the goal \u2014 goals should be missed sometimes', ok:false},
    {label:'The $50 pace \u2014 it was too fast', ok:false},
    {label:'Saving $300 \u2014 that money should have been spent', ok:false, mis:'savings-doesnt-touch-spending'}],
   cue:'What happens AFTER a goal is finished?',
   hint:'Goals end. Does saving end?',
   good:'Finished goals get replaced with new ones \u2014 emergency fund, next goal, ongoing cushion. Saving is a habit, not a project.',
   bad:'Stopping at the finish line leaves the next surprise unfunded.',
   why:'The savings habit outlives any single goal.'};
 }},
{id:'savings-purpose-predict-01', verb:'predict', part:3, tier:'guided', skill:'savings-purpose',
 gen:(v)=>{
  const person=v.person();
  return {
   q:`${person} moves $25/week to a named textbook goal for 8 weeks without fail. What happens?`,
   choices:[
    {label:'$200 saved, goal met \u2014 the math just works', ok:true},
    {label:'$200 saved but it feels like less \u2014 small moves do not add up', ok:false, mis:'close-enough-math'},
    {label:'Nothing \u2014 $25/week is too small to matter', ok:false, mis:'savings-from-leftovers'},
    {label:'The goal moves further away \u2014 saving causes goals to grow', ok:false}],
   cue:'8 \u00d7 $25. Do the multiplication.',
   hint:'Multiply it out.',
   good:'8 \u00d7 $25 = $200. Boring, automatic, done.',
   bad:'Small and steady beats big and someday, every time.',
   why:'Consistent paces hit goals. That is the whole trick.'};
 }},
{id:'savings-purpose-predict-02', verb:'predict', part:3, tier:'guided', skill:'savings-purpose',
 gen:(v)=>{
  const person=v.person();
  return {
   q:`${person} names every savings dollar ("textbooks," "trip," "cushion") and moves each pace first. What changes?`,
   choices:[
    {label:'Raids stop \u2014 named money defends itself', ok:true},
    {label:'Nothing \u2014 names are just decoration', ok:false, mis:'keep-separate'},
    {label:'Spending rises \u2014 named money feels richer', ok:false, mis:'job-money-extra'},
    {label:'Goals get harder \u2014 naming adds pressure', ok:false}],
   cue:'Would you spend "textbook money" on sneakers?',
   hint:'Names create guilt \u2014 useful guilt.',
   good:'A dollar named "textbooks" is psychologically locked. Unnamed piles are open season.',
   bad:'Decoration does not defend; job descriptions do.',
   why:'Purpose is the cheapest security system for savings.'};
 }},
{id:'savings-purpose-predict-03', verb:'predict', part:3, tier:'guided', skill:'savings-purpose',
 gen:(v)=>{
  const person=v.person();
  return {
   q:`${person} skips the savings move for "just one week" to cover takeout. What happens next month?`,
   choices:[
    {label:'The skip repeats \u2014 "just once" becomes the new normal', ok:true},
    {label:'Nothing \u2014 one skip never matters', ok:false, mis:'savings-from-leftovers'},
    {label:'The goal finishes early \u2014 skips motivate', ok:false},
    {label:'Takeout gets cheaper \u2014 the system rewards it', ok:false}],
   cue:'What did the skip teach the brain?',
   hint:'Habits are what you repeat.',
   good:'The first skip is the hardest; the second is easy. Goals die from a thousand "just onces."',
   bad:'One skip is survivable \u2014 if it stays one. It rarely does.',
   why:'Protect the streak. The pace is a promise to your future self.'};
 }},
{id:'savings-purpose-predict-04', verb:'predict', part:3, tier:'guided', skill:'savings-purpose',
 gen:(v)=>{
  const person=v.person();
  return {
   q:`${person} doubles the savings pace after a raise, keeping spending flat. What is the result in 6 months?`,
   choices:[
    {label:'The goal arrives twice as fast \u2014 raises accelerate paced goals', ok:true},
    {label:'Nothing changes \u2014 raises do not affect savings', ok:false},
    {label:'Spending doubles too \u2014 raises always get spent', ok:false, mis:'afford-more'},
    {label:'The goal gets further \u2014 saving more confuses the plan', ok:false}],
   cue:'Same spending + bigger pace = ?',
   hint:'Where does the raise go?',
   good:'Raises routed to the savings pace hit goals at double speed. Lifestyle stayed flat; the goal sprinted.',
   bad:'Raises only vanish if you let spending absorb them first.',
   why:'The fastest wealth builder: raise the savings pace before spending notices.'};
 }},
{id:'savings-purpose-predict-05', verb:'predict', part:3, tier:'guided', skill:'savings-purpose',
 gen:(v)=>{
  const person=v.person();
  return {
   q:`${person} saves "whatever is left" for a year while a friend paces $30/week to savings. Who has more at year\u2019s end?`,
   choices:[
    {label:'The friend \u2014 $30 \u00d7 52 = $1,560 of boring certainty', ok:true},
    {label:`${person} \u2014 leftovers add up to more than paces`, ok:false, mis:'savings-from-leftovers'},
    {label:'Tie \u2014 both are saving strategies', ok:false},
    {label:'Neither \u2014 small amounts never accumulate', ok:false}],
   cue:'52 weeks. Multiply.',
   hint:'$30 \u00d7 52.',
   good:'$1,560 vs the average leftover haul of nearly nothing. Systems beat wishes.',
   bad:'A year of "whatever is left" is a year of nothing left.',
   why:'Time multiplies paces. It does not multiply leftovers.'};
 }},
{id:'savings-purpose-predict-06', verb:'predict', part:3, tier:'guided', skill:'savings-purpose',
 gen:(v)=>{
  const person=v.person();
  return {
   q:`${person} hits a savings goal and immediately assigns the freed-up $40/week to the next goal. What happens over two years?`,
   choices:[
    {label:'Goal after goal falls \u2014 the habit compounds into real wealth', ok:true},
    {label:'Burnout \u2014 perpetual saving is unsustainable', ok:false},
    {label:'Nothing \u2014 finished goals should end the saving', ok:false, mis:'savings-from-leftovers'},
    {label:'Oversaving \u2014 money saved too long evaporates', ok:false}],
   cue:'What does the habit become after the third goal?',
   hint:'Think in years, not weeks.',
   good:'$40/week \u00d7 104 weeks = $4,160 of goals crushed. The habit is the wealth.',
   bad:'Resting between goals is fine; retiring the habit is expensive.',
   why:'Rolling the pace into the next goal turns saving into a lifestyle.'};
 }},
{id:'savings-purpose-sort-01', verb:'sort', part:4, tier:'independent', skill:'savings-purpose',
 gen:(v)=>({
  h:'Sort it: savings job or spending?',
  body:'<p>Sort each move by whether the money keeps a savings job.</p>',
  buckets:['Savings job','Spending'],
  items:[
   {label:'$30/week to the textbook goal', a:'savings job', why:'Named goal, paced move.'},
   {label:'$30/week to "whatever"', a:'savings job', why:'Even unnamed, it is moved to savings first.'},
   {label:'$30 of takeout from the textbook envelope', a:'spending', why:'Raided the goal.'},
   {label:'Skipping the move "just this week"', a:'spending', why:'The skip spends the future.'},
   {label:'Windfall $80 straight to the goal', a:'savings job', why:'Accelerates the purpose.'},
   {label:'Borrowing goal money "temporarily"', a:'spending', why:'Temporary is permanent.'},
   {label:'Raising the pace after a raise', a:'savings job', why:'More income, same system, faster goal.'},
   {label:'Saving what is left at month end', a:'spending', why:'Leftovers are spending that has not happened yet.'}]
 })},
{id:'savings-purpose-sort-02', verb:'sort', part:4, tier:'independent', skill:'savings-purpose',
 gen:(v)=>({
  h:'Sort it: pay-first or pay-last?',
  body:'<p>Sort each habit by when savings gets paid.</p>',
  buckets:['Pay first','Pay last'],
  items:[
   {label:'Move $40 to savings on payday', a:'pay first', why:'Before any spending.'},
   {label:'Save what remains on the 30th', a:'pay last', why:'Leftovers.'},
   {label:'Autotransfer the goal pace Friday', a:'pay first', why:'Automatic and first.'},
   {label:'"I will save if the week goes well"', a:'pay last', why:'Conditional = last.'},
   {label:'Separate the savings into its own envelope', a:'pay first', why:'Protected before spending.'},
   {label:'Count savings from the grocery change', a:'pay last', why:'Scraps.'},
   {label:'Increase the pace before spending the raise', a:'pay first', why:'First claim on new money.'},
   {label:'Round down purchases and "save the change"', a:'pay last', why:'Pennies, not a pace.'}]
 })},
{id:'savings-purpose-sort-03', verb:'sort', part:4, tier:'independent', skill:'savings-purpose',
 gen:(v)=>({
  h:'Sort it: goal pace math',
  body:'<p>Sort each statement about goal-pace math as true or false.</p>',
  buckets:['True','False'],
  items:[
   {label:'$240 \u00f7 8 weeks = $30/week', a:'true', why:'Exact division.'},
   {label:'Already-saved money lowers the remaining pace', a:'true', why:'Pace the remainder.'},
   {label:'Missing a week means doubling next week always works', a:'false', why:'Doubled weeks rarely happen.'},
   {label:'Two goals = two paces added together', a:'true', why:'Each goal gets its own division.'},
   {label:'$500 \u00f7 10 = $60/week', a:'false', why:'It is $50. Check the math.'},
   {label:'Behind pace? Recalculate on what is left', a:'true', why:'Remaining \u00f7 remaining time.'},
   {label:'Leftover saving beats paced saving', a:'false', why:'Leftovers lose to paces every time.'},
   {label:'The pace moves before flexible spending', a:'true', why:'Protect first.'}]
 })},
{id:'savings-purpose-sort-04', verb:'sort', part:4, tier:'independent', skill:'savings-purpose',
 gen:(v)=>({
  h:'Sort it: protects the goal or raids it?',
  body:'<p>Sort each action by what it does to a savings goal.</p>',
  buckets:['Protects','Raids'],
  items:[
   {label:'Naming the goal "textbooks \u2014 May"', a:'protects', why:'Job description defends it.'},
   {label:'Keeping goal money in the spending account', a:'raids', why:'No boundary.'},
   {label:'Telling a friend the goal', a:'protects', why:'Social commitment.'},
   {label:'"Borrowing" $20 for the weekend', a:'raids', why:'Raids wear disguises.'},
   {label:'Checking progress against pace \u00d7 weeks', a:'protects', why:'Early warning system.'},
   {label:'Hiding the goal\u2019s existence from yourself', a:'raids', why:'Unwatched money wanders.'},
   {label:'Auto-moving the pace every Friday', a:'protects', why:'Removes willpower from it.'},
   {label:'Lowering the goal when tempted', a:'raids', why:'Moving the finish line.'}]
 })},
{id:'savings-purpose-sort-05', verb:'sort', part:4, tier:'independent', skill:'savings-purpose',
 gen:(v)=>({
  h:'Sort it: NWS order',
  body:'<p>Sort each step into the correct NWS order position.</p>',
  buckets:['First','Second','Third'],
  items:[
   {label:'Pay rent and bills', a:'first', why:'Needs first.'},
   {label:'Move the savings goal pace', a:'second', why:'Savings second.'},
   {label:'Pace the flexible remainder on wants', a:'third', why:'Wants last.'},
   {label:'Cover groceries for the week', a:'first', why:'Need.'},
   {label:'Emergency fund contribution', a:'second', why:'Savings.'},
   {label:'Concert tickets', a:'third', why:'Want \u2014 paced.'},
   {label:'Bus fare to work', a:'first', why:'Need.'},
   {label:'Textbook goal move', a:'second', why:'Savings goal.'}]
 })},
{id:'savings-purpose-sort-06', verb:'sort', part:4, tier:'independent', skill:'savings-purpose',
 gen:(v)=>({
  h:'Sort it: good goal or vague goal?',
  body:'<p>Sort each savings goal by whether it can get a pace.</p>',
  buckets:['Pace-able','Vague'],
  items:[
   {label:'"$400 textbooks in 10 weeks"', a:'pace-able', why:'Amount + deadline = $40/week.'},
   {label:'"Save more this year"', a:'vague', why:'No amount, no date.'},
   {label:'"$150 trip in 6 weeks"', a:'pace-able', why:'$25/week.'},
   {label:'"Be better with money"', a:'vague', why:'Not a goal, a wish.'},
   {label:'"$1,000 emergency fund in 20 weeks"', a:'pace-able', why:'$50/week.'},
   {label:'"Save for someday"', a:'vague', why:'Someday never comes.'},
   {label:'"$90 headphones in 3 weeks"', a:'pace-able', why:'$30/week.'},
   {label:'"Stop wasting money"', a:'vague', why:'No target to pace.'}]
 })},
{id:'savings-purpose-compare-01', verb:'compare', part:4, tier:'independent', skill:'savings-purpose',
 gen:(v)=>{
  return {
   context:'<p><b>Priya:</b> Moves $30/week to savings first, then paces the rest.</p><p><b>Leo:</b> Spends through the week, saves whatever is left.</p>',
   q:'After 10 weeks, who is closer to a $300 goal?',
   choices:[
    {label:'Priya \u2014 $300 exactly, by construction', ok:true},
    {label:'Leo \u2014 leftovers usually beat paces', ok:false, mis:'savings-from-leftovers'},
    {label:'Tie \u2014 same 10 weeks', ok:false},
    {label:'Leo \u2014 flexibility beats rigidity', ok:false}],
   hint:'$30 \u00d7 10.',
   good:'Priya\u2019s math guarantees $300. Leo\u2019s leftovers average near zero.',
   bad:'Flexibility without a system is just spending with hope.',
   why:'First beats last. Every time.'};
 }},
{id:'savings-purpose-compare-02', verb:'compare', part:4, tier:'independent', skill:'savings-purpose',
 gen:(v)=>{
  return {
   context:'<p><b>Goal A:</b> $240 in 8 weeks \u2192 $30/week.</p><p><b>Goal B:</b> $240 "as soon as possible" \u2192 no pace.</p>',
   q:'Which goal gets finished?',
   choices:[
    {label:'Goal A \u2014 the pace makes it automatic', ok:true},
    {label:'Goal B \u2014 urgency beats math', ok:false, mis:'savings-from-leftovers'},
    {label:'Tie \u2014 same $240', ok:false},
    {label:'Goal B \u2014 no pace means no pressure', ok:false}],
   hint:'Which one has a weekly action?',
   good:'Goal A moves $30 every week without decisions. Goal B waits for motivation.',
   bad:'"As soon as possible" is never. The pace is a schedule.',
   why:'A goal with a pace is a plan. Without one it is a wish.'};
 }},
{id:'savings-purpose-compare-03', verb:'compare', part:4, tier:'independent', skill:'savings-purpose',
 gen:(v)=>{
  return {
   context:'<p><b>Mia:</b> One $300 goal, $50/week pace.</p><p><b>Zoe:</b> Three $100 goals, one $50/week pace split three ways.</p>',
   q:'Who reaches all their goals?',
   choices:[
    {label:'Both \u2014 $50/week \u00d7 6 weeks = $300 either way', ok:true},
    {label:'Only Mia \u2014 split goals never work', ok:false, mis:'keep-separate'},
    {label:'Only Zoe \u2014 more goals means more motivation', ok:false},
    {label:'Neither \u2014 $50/week is too slow', ok:false}],
   hint:'Add up Zoe\u2019s three goals.',
   good:'3 \u00d7 $100 = $300, same total, same pace. Split or whole \u2014 the math is identical.',
   bad:'The number of goals does not change the total pace needed.',
   why:'Goals add. Paces add. The arithmetic does not care how you slice it.'};
 }},
{id:'savings-purpose-compare-04', verb:'compare', part:4, tier:'independent', skill:'savings-purpose',
 gen:(v)=>{
  return {
   context:'<p><b>Plan X:</b> Save $200/month for 5 months.</p><p><b>Plan Y:</b> Save $50/week for 20 weeks.</p>',
   q:'Which plan saves more?',
   choices:[
    {label:'Tie \u2014 both total $1,000', ok:true},
    {label:'Plan X \u2014 monthly is more serious', ok:false},
    {label:'Plan Y \u2014 weekly beats monthly', ok:false, mis:'close-enough-math'},
    {label:'Plan X \u2014 $200 is bigger than $50', ok:false, mis:'pace-math'}],
   hint:'Multiply both out.',
   good:'$200 \u00d7 5 = $1,000. $50 \u00d7 20 = $1,000. Same total \u2014 pick the rhythm you will keep.',
   bad:'Bigger per-move numbers do not mean bigger totals.',
   why:'Compare totals, not move sizes. Then pick the sustainable rhythm.'};
 }},
{id:'savings-purpose-compare-05', verb:'compare', part:4, tier:'independent', skill:'savings-purpose',
 gen:(v)=>{
  return {
   context:'<p><b>Ann:</b> Saves $40/week to a named "car fund."</p><p><b>Ben:</b> Saves $40/week to an unnamed savings pile.</p>',
   q:'Whose savings survives a tempting sale?',
   choices:[
    {label:'Ann \u2014 the name defends the money', ok:true},
    {label:'Ben \u2014 unnamed money is more flexible', ok:false, mis:'job-money-extra'},
    {label:'Tie \u2014 same $40/week', ok:false, mis:'keep-separate'},
    {label:'Ben \u2014 names make money harder to use well', ok:false}],
   hint:'Which $40 is harder to raid?',
   good:'"Car fund" creates a psychological lock. Ben\u2019s pile is just delayed spending.',
   bad:'Flexibility is the enemy of a goal under temptation.',
   why:'Purpose protects. Names are purpose you can read.'};
 }},
{id:'savings-purpose-compare-06', verb:'compare', part:4, tier:'independent', skill:'savings-purpose',
 gen:(v)=>{
  return {
   context:'<p><b>Ray:</b> Behind pace, recalculates: remaining \u00f7 remaining weeks.</p><p><b>Jay:</b> Behind pace, doubles next week\u2019s move to "catch up."</p>',
   q:'Whose recovery actually works?',
   choices:[
    {label:'Ray \u2014 the new pace is honest and sustainable', ok:true},
    {label:'Jay \u2014 doubling shows commitment', ok:false, mis:'close-enough-math'},
    {label:'Tie \u2014 both address the gap', ok:false},
    {label:'Neither \u2014 behind means the goal is dead', ok:false, mis:'savings-from-leftovers'}],
   hint:'Which plan survives contact with a real week?',
   good:'Ray\u2019s recalculation spreads the gap thin. Jay\u2019s double-up usually becomes another skip.',
   bad:'Commitment without math is just enthusiasm.',
   why:'Recover with division, not heroics.'};
 }},
{id:'savings-purpose-build-01', verb:'build', part:4, tier:'independent', skill:'savings-purpose',
 gen:(v)=>{
  const total=500;
  return {
   h:'Build it: paycheck with a goal pace',
   body:'<p>Split the $500 paycheck: needs $300, textbook goal pace $50/week, and pace the flexible rest.</p>',
   totalDollars: total,
   buckets:[{id:'needs',label:'Needs'},{id:'savings',label:'Savings pace'},{id:'flex',label:'Flexible'}],
   targets:{needs:300, savings:50, flex:150},
   hint:'Needs, then savings, then flexible.',
   good:'$50 moves to the goal first; $150 flexible remains.',
   bad:'Saving from the $150 leftover would leave the goal at $0.',
   why:'NWS order in one split.'};
 }},
{id:'savings-purpose-build-02', verb:'build', part:4, tier:'independent', skill:'savings-purpose',
 gen:(v)=>{
  const total=240;
  return {
   h:'Build it: two goals, one paycheck slice',
   body:'<p>Split $240 of goal money: $160 to textbooks (8 weeks left), $80 to the trip fund (8 weeks left).</p>',
   totalDollars: total,
   buckets:[{id:'books',label:'Textbooks'},{id:'trip',label:'Trip'}],
   targets:{books:160, trip:80},
   hint:'Two goals, two paces: $20/week + $10/week.',
   good:'Each goal funded at its own pace: $20/week and $10/week.',
   bad:'Lumping them loses track of which goal is behind.',
   why:'Separate goals, separate paces, one total move.'};
 }},
{id:'savings-purpose-build-03', verb:'build', part:4, tier:'independent', skill:'savings-purpose',
 gen:(v)=>{
  const total=600;
  return {
   h:'Build it: the full monthly split',
   body:'<p>Split $600: needs $350, emergency fund pace $100, trip goal pace $50, flexible rest.</p>',
   totalDollars: total,
   buckets:[{id:'needs',label:'Needs'},{id:'emergency',label:'Emergency pace'},{id:'trip',label:'Trip pace'},{id:'flex',label:'Flexible'}],
   targets:{needs:350, emergency:100, trip:50, flex:100},
   hint:'Two savings paces stack.',
   good:'$150 total savings pace, protected before the $100 flexible.',
   bad:'Forgetting one pace underfunds its goal silently.',
   why:'Stack the paces, then pace what is left.'};
 }},
{id:'savings-purpose-build-04', verb:'build', part:4, tier:'independent', skill:'savings-purpose',
 gen:(v)=>{
  const total=180;
  return {
   h:'Build it: short-goal sprint',
   body:'<p>Split $180 across 3 weeks for a $180 headphones goal \u2014 even weekly moves.</p>',
   totalDollars: total,
   buckets:[{id:'w1',label:'Week 1'},{id:'w2',label:'Week 2'},{id:'w3',label:'Week 3'}],
   targets:{w1:60, w2:60, w3:60},
   hint:'$180 \u00f7 3.',
   good:'$60/week \u00d7 3 = $180. Goal met on schedule.',
   bad:'Back-loading bets everything on week 3.',
   why:'Even moves finish goals on time.'};
 }},
{id:'savings-purpose-build-05', verb:'build', part:4, tier:'independent', skill:'savings-purpose',
 gen:(v)=>{
  const total=1000;
  return {
   h:'Build it: big-picture month',
   body:'<p>Split $1,000: needs $600, savings paces $200 total, cushion $50, flexible rest.</p>',
   totalDollars: total,
   buckets:[{id:'needs',label:'Needs'},{id:'savings',label:'Savings paces'},{id:'cushion',label:'Cushion'},{id:'flex',label:'Flexible'}],
   targets:{needs:600, savings:200, cushion:50, flex:150},
   hint:'Protect needs, savings, cushion \u2014 then flexible.',
   good:'$200 of goal paces plus a $50 cushion, all before the $150 flexible.',
   bad:'Skipping the cushion turns surprises into raids.',
   why:'The complete protected-first split.'};
 }},
{id:'savings-purpose-explain-01', verb:'explain', part:4, tier:'independent', skill:'savings-purpose',
 gen:(v)=>({
  h:'Teach it back: savings has a job description',
  prompt:'Explain what it means for savings to have a job description.',
  keyPoints:['Every saved dollar is assigned to a named goal','The name tells you what the money is for and when','Named money resists raids \u2014 unnamed piles do not','A finished goal\u2019s money gets a new job, not no job'],
  modelAnswer:'Savings with a job description means every dollar is labeled: "$400 for textbooks by May." The name states the purpose and deadline, which makes raiding it feel wrong \u2014 that is the defense. When a goal finishes, its money gets reassigned to the next job instead of becoming free cash.',
  hint:'What does a job description do for a worker?'
 })},
{id:'savings-purpose-explain-02', verb:'explain', part:4, tier:'independent', skill:'savings-purpose',
 gen:(v)=>({
  h:'Teach it back: goal pace math',
  prompt:'Explain how to calculate a goal pace and what to do when behind.',
  keyPoints:['Goal pace = goal amount \u00f7 number of periods','Move the pace first, before flexible spending','If behind, recalculate: remaining amount \u00f7 remaining periods','Already-saved money lowers the pace \u2014 pace the remainder'],
  modelAnswer:'Divide the goal amount by the number of weeks or months to get the pace, and move it before spending. If you fall behind, do not double up heroically \u2014 recalculate on what is left divided by the time left. Progress you already made lowers the pace because you only pace the remainder.',
  hint:'Start with the division.'
 })},
{id:'savings-purpose-explain-03', verb:'explain', part:4, tier:'independent', skill:'savings-purpose',
 gen:(v)=>({
  h:'Teach it back: pay yourself first',
  prompt:'Explain why savings moves happen before spending, not from leftovers.',
  keyPoints:['Spending expands to fill whatever is available','Leftovers average near zero most months','Moving savings first makes the goal automatic','The flexible remainder is the honest spending number'],
  modelAnswer:'If savings waits for leftovers, spending eats it first \u2014 expenses expand to fill the account. Moving the savings pace first flips it: the goal becomes automatic and whatever remains is honestly flexible. Pay yourself first is not a slogan; it is the order that makes saving happen.',
  hint:'What is "left" at the end of most months?'
 })},
{id:'savings-purpose-explain-04', verb:'explain', part:4, tier:'independent', skill:'savings-purpose',
 gen:(v)=>({
  h:'Teach it back: recovering from a skipped week',
  prompt:'Explain the right way to recover when a savings week gets skipped.',
  keyPoints:['Do not ignore it \u2014 the gap is real','Do not double up heroically next week','Recalculate: remaining goal \u00f7 remaining time','One skip is a warning; a pattern kills the goal'],
  modelAnswer:'When a savings week is skipped, recalculate the pace on the remaining amount divided by the remaining time \u2014 the new pace will be slightly higher and honest. Doubling up sounds committed but usually becomes another skip. One skip is recoverable; a pattern of skips is a dead goal.',
  hint:'Division, not heroics.'
 })},
{id:'savings-purpose-explain-05', verb:'explain', part:4, tier:'independent', skill:'savings-purpose',
 gen:(v)=>({
  h:'Teach it back: multiple goals, one move',
  prompt:'Explain how to handle two savings goals at once.',
  keyPoints:['Each goal gets its own pace: amount \u00f7 periods','Add the paces into one total savings move','Track each goal separately so none falls behind silently','The total move still happens before flexible spending'],
  modelAnswer:'Give every goal its own pace by dividing its amount by its periods, then add the paces into a single savings move each week. Track each goal\u2019s progress separately so a lagging goal cannot hide. The combined move still goes first, before any flexible spending.',
  hint:'Two divisions, one addition.'
 })},
],
'savings-apy': [
{id:'savings-apy-choice-01', verb:'choice', part:4, tier:'independent', skill:'savings-apy',
 gen:(v)=>{
  const amt=v.pick([200,300,400]); const rate=v.pick([4,5,6]);
  const growth=Math.round(amt*rate)/100;
  const total=amt+growth;
  return {
   q:`${v.money(amt)} sits in a ${rate}% APY account for 1 year, untouched. What is it worth?`,
   choices:[
    {label:v.money(total), ok:true},
    {label:v.money(amt), ok:false, mis:'savings-compounds'},
    {label:v.money(amt+rate), ok:false, mis:'added-not-compounded'},
    {label:v.money(amt*2), ok:false, mis:'rule-of-72-flip'}],
   hint:`${rate}% of ${v.money(amt)}.`,
   good:`${rate}% of ${v.money(amt)} = ${v.money(growth)}. New total: ${v.money(total)}.`,
   bad:'Growth is a percent of the balance, not the rate added as dollars.',
   why:'One year of growth = balance + (rate \u00d7 balance).'};
 }},
{id:'savings-apy-choice-02', verb:'choice', part:4, tier:'independent', skill:'savings-apy',
 gen:(v)=>{
  const amt=200; const rate=5;
  const y1=amt*(1+rate/100);
  const y2=Math.round(y1*(1+rate/100)*100)/100;
  return {
   q:`$200 at 5% APY. Year 1: $210.00. What is year 2?`,
   choices:[
    {label:v.money(y2), ok:true},
    {label:'$220.00 \u2014 another $10, same as year 1', ok:false, mis:'added-not-compounded'},
    {label:'$215.00 \u2014 growth shrinks each year', ok:false},
    {label:'$230.00 \u2014 5% of $200 twice, plus extra', ok:false, mis:'close-enough-math'}],
   hint:'Year 2 grows the NEW total ($210), not $200.',
   good:`5% of $210 = $10.50 \u2192 $220.50. The extra $0.50 is growth earning growth.`,
   bad:'Compounding applies the rate to the new balance every period \u2014 never the original alone.',
   why:'Compounding = each period\u2019s growth is calculated on the new total.'};
 }},
{id:'savings-apy-choice-03', verb:'choice', part:4, tier:'independent', skill:'savings-apy',
 gen:(v)=>{
  const rate=v.pick([6,8,9]); const yrs=Math.round(72/rate);
  return {
   q:`Using the rule of 72, about how long does money take to double at ${rate}%?`,
   choices:[
    {label:`About ${yrs} years`, ok:true},
    {label:`About ${rate*2} years \u2014 double the rate`, ok:false, mis:'rule-of-72-flip'},
    {label:'About 72 years \u2014 always 72', ok:false, mis:'rule-of-72-flip'},
    {label:`About ${Math.round(72/rate/2)} years \u2014 half the rule`, ok:false, mis:'close-enough-math'}],
   hint:'72 \u00f7 rate.',
   good:`72 \u00f7 ${rate} \u2248 ${yrs} years to double.`,
   bad:'The rule divides 72 BY the rate \u2014 never the other way around.',
   why:'Rule of 72: 72 \u00f7 rate \u2248 years to double.'};
 }},
{id:'savings-apy-choice-04', verb:'choice', part:4, tier:'independent', skill:'savings-apy',
 gen:(v)=>{
  return {
   q:`One account advertises 5% APR, another 5% APY. Which grows savings faster?`,
   choices:[
    {label:'The 5% APY \u2014 APY includes compounding, APR does not', ok:true},
    {label:'The 5% APR \u2014 APR is the bigger number', ok:false, mis:'apy-apr-confusion'},
    {label:'Tie \u2014 5% is 5%', ok:false, mis:'apy-apr-confusion'},
    {label:'Neither \u2014 percents do not grow money', ok:false, mis:'savings-compounds'}],
   hint:'Same digits, different meaning.',
   good:'APY counts growth-earning-growth; APR quotes the rate without it. 5% APY wins.',
   bad:'"5% is 5%" ignores what each number includes.',
   why:'Compare APY to APY. APR is the rate before compounding.'};
 }},
{id:'savings-apy-choice-05', verb:'choice', part:4, tier:'independent', skill:'savings-apy',
 gen:(v)=>{
  const amt=v.pick([100,500]); const rate=4; const yrs=Math.round(72/rate);
  return {
   q:`${v.money(amt)} at ${rate}% APY, untouched. About when does it double?`,
   choices:[
    {label:`About ${yrs} years \u2192 ~${v.money(amt*2)}`, ok:true},
    {label:'About 4 years \u2014 the rate is the years', ok:false, mis:'rule-of-72-flip'},
    {label:'Never \u2014 small amounts cannot double', ok:false, mis:'savings-compounds'},
    {label:`About ${yrs*2} years \u2192 ~${v.money(amt*2)}`, ok:false, mis:'close-enough-math'}],
   hint:'72 \u00f7 4.',
   good:`72 \u00f7 4 = 18 years. ${v.money(amt)} becomes ~${v.money(amt*2)} if untouched.`,
   bad:'The starting amount does not change the doubling TIME \u2014 only the rate does.',
   why:'Doubling time depends on rate, not balance.'};
 }},
{id:'savings-apy-choice-06', verb:'choice', part:4, tier:'independent', skill:'savings-apy',
 gen:(v)=>{
  const amt=500; const rate=10;
  const simple=amt+2*(amt*rate/100);
  const compound=Math.round(amt*Math.pow(1+rate/100,2)*100)/100;
  return {
   q:`$500 at 10% for 2 years. Simple (added) growth vs compounded growth \u2014 what is the difference?`,
   choices:[
    {label:`${v.money(compound)} compounded vs ${v.money(simple)} added \u2014 ${v.money(Math.round((compound-simple)*100)/100)} extra`, ok:true},
    {label:'No difference \u2014 10% is 10% either way', ok:false, mis:'added-not-compounded'},
    {label:`${v.money(simple)} compounded vs ${v.money(compound)} added`, ok:false, mis:'apy-apr-confusion'},
    {label:'$1,000 either way \u2014 money doubles in 2 years at 10%', ok:false, mis:'rule-of-72-flip'}],
   hint:'Year 2: 10% of $550, not $500.',
   good:`Added: $500 + $50 + $50 = $600. Compounded: $500 \u2192 $550 \u2192 $605. The $5 gap is growth earning growth.`,
   bad:'Adding the same dollar amount each year is not compounding.',
   why:'Compounding re-applies the rate to the new total every period.'};
 }},
{id:'savings-apy-choice-07', verb:'choice', part:4, tier:'independent', skill:'savings-apy',
 gen:(v)=>{
  return {
   q:`Why does money grow FASTER in later years of compounding?`,
   choices:[
    {label:'Each year\u2019s growth is calculated on a bigger balance', ok:true},
    {label:'The rate increases every year automatically', ok:false, mis:'savings-compounds'},
    {label:'Banks add bonus money in later years', ok:false},
    {label:'It does not \u2014 growth is the same every year', ok:false, mis:'added-not-compounded'}],
   hint:'What does year 5\u2019s percent apply to?',
   good:'5% of $200 is $10; 5% of $300 is $15. Same rate, bigger base \u2014 the snowball effect.',
   bad:'The rate stays flat. The BASE grows \u2014 that is the acceleration.',
   why:'Compounding accelerates because the base keeps growing.'};
 }},
{id:'savings-apy-choice-08', verb:'choice', part:4, tier:'independent', skill:'savings-apy',
 gen:(v)=>{
  const rate=v.pick([3,7]); const yrs=Math.round(72/rate);
  return {
   q:`At ${rate}% APY, the rule of 72 says money doubles in about ${yrs} years. What does WITHDRAWING half the money in year 3 do?`,
   choices:[
    {label:'Resets the doubling \u2014 the smaller base must grow back first', ok:true},
    {label:'Nothing \u2014 the rule of 72 ignores withdrawals', ok:false, mis:'rule-of-72-flip'},
    {label:'Speeds it up \u2014 smaller money doubles faster', ok:false, mis:'savings-compounds'},
    {label:'Freezes growth forever', ok:false}],
   hint:'Compounding needs the full base.',
   good:'Half the base = half the growth engine. The doubling clock effectively restarts on less.',
   bad:'Withdrawals do not pause compounding \u2014 they shrink what compounds.',
   why:'Compounding rewards untouched money. Every withdrawal taxes the snowball.'};
 }},
{id:'savings-apy-sort-01', verb:'sort', part:4, tier:'independent', skill:'savings-apy',
 gen:(v)=>({
  h:'Sort it: compounds or not?',
  body:'<p>Sort each situation by whether growth earns growth.</p>',
  buckets:['Compounds','Does not compound'],
  items:[
   {label:'Money left untouched in a 5% APY account', a:'compounds', why:'Every period grows the new total.'},
   {label:'Adding $10 every year to a jar', a:'does not compound', why:'Added, not grown.'},
   {label:'5% APR loan balance growing unpaid', a:'compounds', why:'Unpaid interest joins the balance (against you).'},
   {label:'A flat $50 birthday check each year', a:'does not compound', why:'Same dollars, no growth on growth.'},
   {label:'Reinvested dividends in an account', a:'compounds', why:'Earnings rejoin the base.'},
   {label:'Withdrawing all growth each year', a:'does not compound', why:'Nothing left to earn growth.'},
   {label:'Leaving $200 at 5% APY for 3 years', a:'compounds', why:'Year 2 grows year 1\u2019s total.'},
   {label:'Simple interest paid out yearly', a:'does not compound', why:'Paid out = not reinvested.'}]
 })},
{id:'savings-apy-sort-02', verb:'sort', part:4, tier:'independent', skill:'savings-apy',
 gen:(v)=>({
  h:'Sort it: APY or APR?',
  body:'<p>Sort each statement to the right number.</p>',
  buckets:['APY','APR'],
  items:[
   {label:'Includes compounding', a:'apy', why:'APY = the full yearly effect.'},
   {label:'Quoted without compounding', a:'apr', why:'APR = the rate alone.'},
   {label:'Use it to compare two savings accounts', a:'apy', why:'Compare APY to APY.'},
   {label:'Often quoted on loans', a:'apr', why:'Loans advertise APR.'},
   {label:'5% here beats 5% of the other one', a:'apy', why:'APY\u2019s 5% includes growth-on-growth.'},
   {label:'The "sticker rate" before compounding', a:'apr', why:'That is literally APR.'},
   {label:'What your savings actually earns in a year', a:'apy', why:'APY reflects reality.'},
   {label:'Needs converting before comparing to savings APY', a:'apr', why:'APR vs APY is apples vs oranges.'}]
 })},
{id:'savings-apy-sort-03', verb:'sort', part:4, tier:'independent', skill:'savings-apy',
 gen:(v)=>({
  h:'Sort it: rule-of-72 true or false?',
  body:'<p>Sort each claim about the rule of 72.</p>',
  buckets:['True','False'],
  items:[
   {label:'72 \u00f7 rate \u2248 years to double', a:'true', why:'The rule itself.'},
   {label:'At 8%, money doubles in about 9 years', a:'true', why:'72 \u00f7 8 = 9.'},
   {label:'Rate \u00f7 72 \u2248 years to double', a:'false', why:'Flipped \u2014 backwards.'},
   {label:'At 6%, money doubles in about 12 years', a:'true', why:'72 \u00f7 6 = 12.'},
   {label:'It is exact to the penny', a:'false', why:'It is an estimate (\u2248).'},
   {label:'Higher rate = faster doubling', a:'true', why:'Bigger divisor, fewer years.'},
   {label:'It works for halving too (money lost)', a:'true', why:'Same math on shrinking balances.'},
   {label:'The starting amount changes the doubling time', a:'false', why:'Only the rate matters.'}]
 })},
{id:'savings-apy-sort-04', verb:'sort', part:4, tier:'independent', skill:'savings-apy',
 gen:(v)=>({
  h:'Sort it: helps compounding or hurts it?',
  body:'<p>Sort each action by its effect on compounding.</p>',
  buckets:['Helps','Hurts'],
  items:[
   {label:'Leaving the money untouched', a:'helps', why:'The base keeps growing.'},
   {label:'Withdrawing the growth each year', a:'hurts', why:'Removes the growth-on-growth.'},
   {label:'Starting earlier', a:'helps', why:'More periods = more compounding.'},
   {label:'Raiding the account for wants', a:'hurts', why:'Shrinks the base.'},
   {label:'Choosing the higher APY', a:'helps', why:'Bigger rate, faster doubling.'},
   {label:'Waiting "until there is more to save"', a:'hurts', why:'Lost time never compounds.'},
   {label:'Adding to the account regularly', a:'helps', why:'Bigger base + compounding.'},
   {label:'Moving money to a 0% jar "for safety"', a:'hurts', why:'Zero rate = zero compounding.'}]
 })},
{id:'savings-apy-sort-05', verb:'sort', part:4, tier:'independent', skill:'savings-apy',
 gen:(v)=>({
  h:'Sort it: growth or just adding?',
  body:'<p>$200 at 5%. Sort each year-2 description.</p>',
  buckets:['Growth (compounded)','Just adding'],
  items:[
   {label:'Year 2: 5% of $210 = $10.50', a:'growth (compounded)', why:'Rate on the new total.'},
   {label:'Year 2: another flat $10', a:'just adding', why:'Same dollars, no growth-on-growth.'},
   {label:'Total $220.50 after 2 years', a:'growth (compounded)', why:'The extra $0.50 proves it.'},
   {label:'Total $220.00 after 2 years', a:'just adding', why:'$10 + $10, linear.'},
   {label:'Year 3: 5% of $220.50', a:'growth (compounded)', why:'Base keeps updating.'},
   {label:'Year 3: another flat $10', a:'just adding', why:'Linear again.'},
   {label:'Each year\u2019s percent applies to more', a:'growth (compounded)', why:'The snowball.'},
   {label:'Each year adds the same dollars', a:'just adding', why:'No acceleration.'}]
 })},
{id:'savings-apy-sort-06', verb:'sort', part:4, tier:'independent', skill:'savings-apy',
 gen:(v)=>({
  h:'Sort it: where compounding matters most',
  body:'<p>Sort each situation by whether compounding is the star or a side note.</p>',
  buckets:['Star','Side note'],
  items:[
   {label:'Money untouched for 10 years', a:'star', why:'Long time = compounding dominates.'},
   {label:'Money needed next week', a:'side note', why:'One week barely compounds.'},
   {label:'Retirement-style decades-long saving', a:'star', why:'Decades are compounding\u2019s home turf.'},
   {label:'This month\u2019s grocery budget', a:'side note', why:'Pacing matters; compounding does not.'},
   {label:'Emergency fund sitting for years', a:'star', why:'Years of quiet growth.'},
   {label:'Next Friday\u2019s gas money', a:'side note', why:'Too short to matter.'},
   {label:'A 5-year car goal', a:'star', why:'Years let growth earn growth.'},
   {label:'Lunch money for tomorrow', a:'side note', why:'Compounding needs time.'}]
 })},
{id:'savings-apy-predict-01', verb:'predict', part:4, tier:'independent', skill:'savings-apy',
 gen:(v)=>{
  const person=v.person();
  return {
   q:`${person} leaves $300 at 6% APY untouched for years. What does the growth look like over time?`,
   choices:[
    {label:'It accelerates \u2014 later years add more dollars than early years', ok:true},
    {label:'It stays flat \u2014 $18 every year forever', ok:false, mis:'added-not-compounded'},
    {label:'It slows down \u2014 growth gets tired', ok:false},
    {label:'It stops after doubling once', ok:false, mis:'rule-of-72-flip'}],
   hint:'What does 6% apply to in year 10?',
   good:'6% of $300 is $18; 6% of $500 is $30. Same rate, growing base \u2014 acceleration.',
   bad:'Flat yearly growth is adding, not compounding.',
   why:'Compounding snowballs: the base grows, so the same percent yields more.'};
 }},
{id:'savings-apy-predict-02', verb:'predict', part:4, tier:'independent', skill:'savings-apy',
 gen:(v)=>{
  const person=v.person();
  return {
   q:`${person} has $1,000 at 8% APY. Rule of 72 says it doubles in ~9 years. What if ${person} adds $100 every year too?`,
   choices:[
    {label:'It doubles FASTER \u2014 additions plus compounding stack', ok:true},
    {label:'It doubles slower \u2014 additions confuse compounding', ok:false},
    {label:'No change \u2014 the rule of 72 forbids additions', ok:false, mis:'rule-of-72-flip'},
    {label:'It never doubles \u2014 additions reset the clock', ok:false}],
   hint:'Bigger base + same rate.',
   good:'Every $100 raises the base that 8% applies to. Additions and compounding multiply each other.',
   bad:'Additions do not interfere \u2014 they feed the snowball.',
   why:'Contributions + compounding is the fastest legal wealth builder.'};
 }},
{id:'savings-apy-predict-03', verb:'predict', part:4, tier:'independent', skill:'savings-apy',
 gen:(v)=>{
  const person=v.person();
  return {
   q:`${person} keeps savings in a 0.5% account "to keep it simple" instead of a 5% APY account. What is the 10-year cost?`,
   choices:[
    {label:'Huge \u2014 the 5% money compounds to far more over a decade', ok:true},
    {label:'Tiny \u2014 4.5% difference is nothing', ok:false, mis:'close-enough-math'},
    {label:'Zero \u2014 percents do not matter on savings', ok:false, mis:'savings-compounds'},
    {label:'Negative \u2014 simple accounts secretly win', ok:false}],
   hint:'Rule of 72: 5% doubles in ~14 years; 0.5% in ~144.',
   good:'Over 10 years, 5% compounding laps 0.5% completely. "Simple" has a price.',
   bad:'Small rate gaps become canyons over time \u2014 that is compounding\u2019s whole point.',
   why:'Time magnifies rate differences. Lazy rates cost real money.'};
 }},
{id:'savings-apy-predict-04', verb:'predict', part:4, tier:'independent', skill:'savings-apy',
 gen:(v)=>{
  const person=v.person();
  return {
   q:`${person} withdraws every cent of growth each year from a 6% APY account. What happens to compounding?`,
   choices:[
    {label:'It stops \u2014 the base never grows, so growth never grows', ok:true},
    {label:'It continues \u2014 compounding does not need the growth', ok:false, mis:'added-not-compounded'},
    {label:'It speeds up \u2014 withdrawals motivate the account', ok:false},
    {label:'It reverses \u2014 the account starts shrinking', ok:false, mis:'savings-compounds'}],
   hint:'What does year 2\u2019s 6% apply to?',
   good:'Withdrawing growth freezes the base. 6% of the same base every year is just adding.',
   bad:'Compounding IS the growth staying in. Remove it and you have simple interest.',
   why:'Growth left in earns growth. Growth taken out is just income.'};
 }},
{id:'savings-apy-predict-05', verb:'predict', part:4, tier:'independent', skill:'savings-apy',
 gen:(v)=>{
  const person=v.person();
  return {
   q:`${person} starts saving at 16 vs a friend who starts at 26, same $50/month, same 6% APY. At 36, who has more?`,
   choices:[
    {label:'The early starter \u2014 by a lot; 10 extra years of compounding dominate', ok:true},
    {label:'Tie \u2014 $50/month is $50/month', ok:false, mis:'added-not-compounded'},
    {label:'The late starter \u2014 waiting means bigger paychecks', ok:false, mis:'close-enough-math'},
    {label:'Neither \u2014 $50/month never amounts to anything', ok:false}],
   hint:'10 extra years at 6%. Rule of 72: doubling ~12 years.',
   good:'The early starter\u2019s money nearly doubles an extra time. Time beats amount.',
   bad:'Same monthly amount, wildly different results \u2014 time is the multiplier.',
   why:'Compounding\u2019s fuel is time. Starting early is the cheat code.'};
 }},
{id:'savings-apy-predict-06', verb:'predict', part:4, tier:'independent', skill:'savings-apy',
 gen:(v)=>{
  const person=v.person();
  return {
   q:`${person} reads "8% APR compounded monthly" on an account ad. What should ${person} look for instead?`,
   choices:[
    {label:'The APY \u2014 it already includes the monthly compounding', ok:true},
    {label:'Nothing \u2014 APR is all that matters', ok:false, mis:'apy-apr-confusion'},
    {label:'A bigger APR somewhere else', ok:false, mis:'close-enough-math'},
    {label:'The ad\u2019s fine print font size', ok:false}],
   hint:'Which number already counts the compounding?',
   good:'"8% APR compounded monthly" is roughly 8.3% APY. The APY is the comparable number.',
   bad:'Comparing APRs across different compounding schedules misleads.',
   why:'APY is the apples-to-apples number. Always compare APY to APY.'};
 }},
{id:'savings-apy-decide-01', verb:'decide', part:5, tier:'independent', skill:'savings-apy',
 gen:(v)=>{
  const person=v.person();
  return {
   q:`${person} has $400 for a 2-year goal. Account A: 5% APY. Account B: 5% APR. Which holds the goal money?`,
   choices:[
    {label:'Account A \u2014 5% APY includes compounding', ok:true},
    {label:'Account B \u2014 APR sounds more official', ok:false, mis:'apy-apr-confusion'},
    {label:'Either \u2014 identical digits, identical growth', ok:false, mis:'apy-apr-confusion'},
    {label:'Neither \u2014 keep it in a drawer for 2 years', ok:false, mis:'savings-compounds'}],
   hint:'Same digits, different meaning.',
   good:'Over 2 years, A\u2019s compounding pulls ahead: ~$441 vs $440. Small now, but the habit of picking APY pays forever.',
   bad:'Identical digits do not mean identical growth.',
   why:'When digits tie, APY wins \u2014 it counts the growth-on-growth.'};
 }},
{id:'savings-apy-decide-02', verb:'decide', part:5, tier:'independent', skill:'savings-apy',
 gen:(v)=>{
  const person=v.person();
  return {
   q:`${person}\u2019s $600 emergency fund sits at 4% APY. A $200 "emergency" (concert tickets) tempts ${person}. What is the call?`,
   choices:[
    {label:'No \u2014 raiding the fund shrinks the compounding base for a non-emergency', ok:true},
    {label:'Yes \u2014 concerts are emergencies of the soul', ok:false},
    {label:'Yes \u2014 4% will regrow it instantly', ok:false, mis:'savings-compounds'},
    {label:'Yes, and close the account \u2014 compounding is a scam', ok:false}],
   hint:'Is a concert an emergency? What does the raid cost over time?',
   good:'$200 out = $200 not compounding for years. Non-emergencies never raid the fund.',
   bad:'4% regrows slowly \u2014 the raid\u2019s true cost is years of lost growth.',
   why:'Emergency funds compound quietly. Raids are taxed twice: now and later.'};
 }},
{id:'savings-apy-decide-03', verb:'decide', part:5, tier:'independent', skill:'savings-apy',
 gen:(v)=>{
  const person=v.person();
  return {
   q:`${person} can put $50/month toward a 3-year goal. Option 1: 5% APY account. Option 2: checking account (0%). What is the call?`,
   choices:[
    {label:'Option 1 \u2014 3 years of compounding beats 0% by a real margin', ok:true},
    {label:'Option 2 \u2014 simpler, and 5% is tiny', ok:false, mis:'close-enough-math'},
    {label:'Option 2 \u2014 compounding only works on big money', ok:false, mis:'savings-compounds'},
    {label:'Neither \u2014 3 years is too short for any account', ok:false, mis:'pace-doesnt-apply'}],
   hint:'$50/month \u00d7 36 months = $1,800 base. What does 5% add?',
   good:'$1,800 of contributions plus ~$140 of compounding vs $0. Free money for zero extra work.',
   bad:'"Tiny" percents on monthly contributions stack into real dollars.',
   why:'Even short horizons deserve the APY \u2014 free growth is free.'};
 }},
{id:'savings-apy-decide-04', verb:'decide', part:5, tier:'independent', skill:'savings-apy',
 gen:(v)=>{
  const person=v.person();
  return {
   q:`${person} sees "12% APR!" on a savings ad and "11.5% APY" on another. Which is better?`,
   choices:[
    {label:'Compare APYs \u2014 convert the 12% APR first; the 11.5% APY might win', ok:true},
    {label:'The 12% \u2014 bigger number always wins', ok:false, mis:'apy-apr-confusion'},
    {label:'The 11.5% \u2014 smaller numbers are safer', ok:false},
    {label:'Neither \u2014 ads are always lies', ok:false}],
   hint:'APR vs APY is not a fair fight.',
   good:'12% APR compounded monthly \u2248 12.68% APY \u2014 actually better here. But you only know by converting.',
   bad:'Picking by the bigger digit without converting is guessing.',
   why:'Convert everything to APY, then compare. Never mix the two.'};
 }},
{id:'savings-apy-decide-05', verb:'decide', part:5, tier:'independent', skill:'savings-apy',
 gen:(v)=>{
  const person=v.person();
  return {
   q:`${person}\u2019s goal needs $500 in one year. ${person} has $480 today at 5% APY. What is the call?`,
   choices:[
    {label:'Wait \u2014 $480 at 5% becomes $504, covering the goal', ok:true},
    {label:'Add $20 now \u2014 growth is too slow to trust', ok:false, mis:'close-enough-math'},
    {label:'Spend the $480 \u2014 $500 goals need $500 today', ok:false},
    {label:'Move it to 0% \u2014 5% might lose money', ok:false, mis:'savings-compounds'}],
   hint:'$480 \u00d7 1.05.',
   good:'$480 \u00d7 1.05 = $504. The growth does the last $20 of work.',
   bad:'Distrusting the math costs $20 of free growth.',
   why:'Let compounding finish the job it can finish.'};
 }},
{id:'savings-apy-decide-06', verb:'decide', part:5, tier:'independent', skill:'savings-apy',
 gen:(v)=>{
  const person=v.person();
  return {
   q:`${person} has $300 at 6% APY and is offered a "guaranteed double in 5 years" scheme by a stranger. What is the call?`,
   choices:[
    {label:'Walk away \u2014 doubling in 5 years needs ~14.4%, a scam rate', ok:true},
    {label:'Take it \u2014 doubling is doubling', ok:false},
    {label:'Take it \u2014 the rule of 72 guarantees it', ok:false, mis:'rule-of-72-flip'},
    {label:'Split the money \u2014 half scam, half safe', ok:false}],
   hint:'Rule of 72: what rate doubles money in 5 years?',
   good:'72 \u00f7 5 = 14.4%. No safe account pays that. "Guaranteed" + impossible rate = scam.',
   bad:'The rule of 72 is a detector here: impossible rates reveal impossible promises.',
   why:'Use the rule of 72 as a lie detector for too-good offers.'};
 }},
{id:'savings-apy-decide-07', verb:'decide', part:5, tier:'independent', skill:'savings-apy',
 gen:(v)=>{
  const person=v.person();
  return {
   q:`${person} keeps $2,000 of long-term savings in checking at 0% "for easy access." A 4.5% APY savings account is free to open. What is the call?`,
   choices:[
    {label:'Move it \u2014 keep one month of spending in checking, let the rest compound', ok:true},
    {label:'Keep it all \u2014 moving money is risky', ok:false, mis:'savings-compounds'},
    {label:'Keep it all \u2014 4.5% is not worth the clicks', ok:false, mis:'close-enough-math'},
    {label:'Spend it \u2014 easy access means easy spending', ok:false, mis:'job-money-extra'}],
   hint:'$2,000 \u00d7 4.5% = $90/year of free money.',
   good:'$90/year for ten minutes of setup. Keep spending cash in checking; let savings savings.',
   bad:'"Easy access" on long-term money is an expensive convenience.',
   why:'Right money, right place: checking for flow, APY for storage.'};
 }},
{id:'savings-apy-decide-08', verb:'decide', part:5, tier:'independent', skill:'savings-apy',
 gen:(v)=>{
  const person=v.person();
  return {
   q:`${person}\u2019s $150/month goal pace is set. A 5% APY account would add ~$50 over the year vs 0%. ${person} thinks "not worth the hassle." What is the call?`,
   choices:[
    {label:'Do it \u2014 $50 of free growth for one setup', ok:true},
    {label:'Skip it \u2014 $50 is nothing', ok:false, mis:'close-enough-math'},
    {label:'Skip it \u2014 compounding only matters for rich people', ok:false, mis:'savings-compounds'},
    {label:'Double the pace instead \u2014 effort beats interest', ok:false}],
   hint:'What is the cost of the setup?',
   good:'One-time setup, $50/year forever. That is the highest hourly wage you will ever earn.',
   bad:'"$50 is nothing" ignores that it repeats every year, growing.',
   why:'Free growth with zero ongoing effort is always worth it.'};
 }},
{id:'savings-apy-spot-01', verb:'spot', part:5, tier:'independent', skill:'savings-apy',
 gen:(v)=>{
  const person=v.person();
  return {
   scenario:`<p>${person}\u2019s math:</p><ul><li>$300 at 5% APY for 2 years</li><li>"Year 1: +$15. Year 2: +$15. Total: $330"</li></ul>`,
   q:'What is the mistake here?',
   choices:[
    {label:'Added instead of compounding \u2014 year 2 is 5% of $315 ($15.75), total $330.75', ok:true},
    {label:'The rate \u2014 5% of $300 is $50, not $15', ok:false, mis:'close-enough-math'},
    {label:'Nothing \u2014 $330 is exactly right', ok:false, mis:'added-not-compounded'},
    {label:'The years \u2014 2 years is too short to calculate', ok:false}],
   hint:'What does year 2\u2019s 5% apply to?',
   good:'Year 1: $300 \u2192 $315. Year 2: 5% of $315 = $15.75 \u2192 $330.75. The $0.75 is the compounding.',
   bad:'Flat $15s are adding. Compounding re-applies to the new total.',
   why:'Every period compounds on the NEW balance, not the original.'};
 }},
{id:'savings-apy-spot-02', verb:'spot', part:5, tier:'independent', skill:'savings-apy',
 gen:(v)=>{
  const person=v.person();
  return {
   scenario:`<p>${person}\u2019s rule-of-72 use:</p><ul><li>Account pays 6%</li><li>"72 \u00f7 6 = 12, so my money doubles 12 times per year"</li></ul>`,
   q:'What is the mistake here?',
   choices:[
    {label:'Flipped the meaning \u2014 12 is the YEARS to double once, not doublings per year', ok:true},
    {label:'The division \u2014 72 \u00f7 6 is 18', ok:false, mis:'close-enough-math'},
    {label:'Nothing \u2014 12 doublings a year is right', ok:false, mis:'rule-of-72-flip'},
    {label:'The rate \u2014 6% can never double money', ok:false, mis:'savings-compounds'}],
   hint:'What are the UNITS of the answer?',
   good:'72 \u00f7 6 = 12 YEARS for one doubling. Units matter.',
   bad:'"12 doublings a year" would turn $100 into trillions. Check the units.',
   why:'The rule of 72 outputs years-per-doubling, not doublings-per-year.'};
 }},
{id:'savings-apy-spot-03', verb:'spot', part:5, tier:'independent', skill:'savings-apy',
 gen:(v)=>{
  const person=v.person();
  return {
   scenario:`<p>${person} compares accounts:</p><ul><li>Account A: 4.8% APY</li><li>Account B: 4.9% APR</li><li>"B wins \u2014 4.9 is bigger than 4.8"</li></ul>`,
   q:'What is the mistake here?',
   choices:[
    {label:'Compared APR to APY \u2014 different numbers, unfair fight', ok:true},
    {label:'The math \u2014 4.9 is NOT bigger than 4.8', ok:false},
    {label:'Nothing \u2014 bigger digit always wins', ok:false, mis:'apy-apr-confusion'},
    {label:'Comparing accounts at all \u2014 rates do not matter', ok:false, mis:'savings-compounds'}],
   hint:'What does each number include?',
   good:'4.9% APR compounded monthly is ~5.01% APY \u2014 B might actually win, but only the APY comparison can say.',
   bad:'Digit-comparing across APR/APY is guessing with confidence.',
   why:'Convert to APY first. Then compare.'};
 }},
{id:'savings-apy-spot-04', verb:'spot', part:5, tier:'independent', skill:'savings-apy',
 gen:(v)=>{
  const person=v.person();
  return {
   scenario:`<p>${person}\u2019s plan:</p><ul><li>$500 emergency fund at 5% APY</li><li>"I will withdraw the $25 growth every year for fun"</li><li>"The $500 keeps compounding, so nothing is lost"</li></ul>`,
   q:'What is the mistake here?',
   choices:[
    {label:'Withdrawing the growth freezes the base \u2014 the $25 never earns its own $25', ok:true},
    {label:'The math \u2014 5% of $500 is $50, not $25', ok:false, mis:'close-enough-math'},
    {label:'Nothing \u2014 the base is untouched so compounding continues', ok:false, mis:'added-not-compounded'},
    {label:'Emergency funds should not earn anything', ok:false}],
   hint:'What is compounding, exactly?',
   good:'Compounding IS growth earning growth. Skimming the growth every year converts it to simple interest.',
   bad:'"Base untouched" is not enough \u2014 the growth must stay IN to compound.',
   why:'Growth taken out is income. Growth left in is compounding.'};
 }},
{id:'savings-apy-spot-05', verb:'spot', part:5, tier:'independent', skill:'savings-apy',
 gen:(v)=>{
  const person=v.person();
  return {
   scenario:`<p>${person}\u2019s claim:</p><ul><li>"My savings doubles every 9 years at 8%"</li><li>"So in 18 years it quadruples, in 27 years it octuples \u2014 guaranteed"</li></ul>`,
   q:'What is the mistake here?',
   choices:[
    {label:'Assumes the rate never changes \u2014 rates move, and "guaranteed" overstates it', ok:true},
    {label:'The math \u2014 doubling twice is tripling', ok:false, mis:'close-enough-math'},
    {label:'Nothing \u2014 the rule of 72 guarantees all of it', ok:false, mis:'rule-of-72-flip'},
    {label:'8% can never double money in the first place', ok:false, mis:'savings-compounds'}],
   hint:'What has to stay true for 27 years?',
   good:'The rule estimates at a CONSTANT rate. Real rates change; "guaranteed" ignores that.',
   bad:'Compounding math is right; the guarantee is wrong.',
   why:'The rule of 72 is an estimate under steady conditions \u2014 not a promise.'};
 }},
{id:'savings-apy-spot-06', verb:'spot', part:5, tier:'independent', skill:'savings-apy',
 gen:(v)=>{
  const person=v.person();
  return {
   scenario:`<p>${person}\u2019s reasoning:</p><ul><li>"Compounding made my $200 grow, so compounding will also shrink my debt slower"</li><li>Leaves a 20% APR balance unpaid: "compounding helps both sides"</li></ul>`,
   q:'What is the mistake here?',
   choices:[
    {label:'Compounding works AGAINST you on debt \u2014 unpaid balances grow faster, not slower', ok:true},
    {label:'The rate \u2014 20% is too low to compound', ok:false},
    {label:'Nothing \u2014 compounding is always friendly', ok:false, mis:'savings-compounds'},
    {label:'Debt cannot compound, only savings can', ok:false, mis:'added-not-compounded'}],
   hint:'Who benefits when YOUR balance compounds?',
   good:'Compounding on debt means interest earning interest AGAINST you. 20% unpaid is a snowball rolling downhill at you.',
   bad:'Compounding is neutral math \u2014 wonderful on savings, brutal on debt.',
   why:'The same snowball either builds your wealth or buries you. Direction matters.'};
 }},
{id:'savings-apy-compare-01', verb:'compare', part:5, tier:'independent', skill:'savings-apy',
 gen:(v)=>{
  return {
   context:'<p><b>Account A:</b> 5% APY, $300, untouched 3 years.</p><p><b>Account B:</b> 5% APR simple, $300, untouched 3 years.</p>',
   q:'Which has more after 3 years?',
   choices:[
    {label:'Account A \u2014 compounding beats adding every year after year 1', ok:true},
    {label:'Account B \u2014 simple is more reliable', ok:false, mis:'apy-apr-confusion'},
    {label:'Tie \u2014 5% is 5%', ok:false, mis:'added-not-compounded'},
    {label:'Account B \u2014 APR is the honest number', ok:false}],
   hint:'Year 2: 5% of what?',
   good:'A: $300 \u2192 $315 \u2192 $330.75 \u2192 $347.29. B: $300 + $15 + $15 + $15 = $345. Compounding wins.',
   bad:'"5% is 5%" misses what each 5% applies to.',
   why:'Time separates compounding from adding \u2014 longer means a bigger gap.'};
 }},
{id:'savings-apy-compare-02', verb:'compare', part:5, tier:'independent', skill:'savings-apy',
 gen:(v)=>{
  return {
   context:'<p><b>Early:</b> $100/month from age 16 to 26, then stops (6% APY).</p><p><b>Late:</b> $100/month from age 26 to 46, never stops (6% APY).</p>',
   q:'At 46, who has more?',
   choices:[
    {label:'Early \u2014 10 years of contributions compounding for 20+ more years wins', ok:true},
    {label:'Late \u2014 20 years of contributions beats 10', ok:false, mis:'added-not-compounded'},
    {label:'Tie \u2014 both paid $100/month for a while', ok:false, mis:'close-enough-math'},
    {label:'Late \u2014 stopping early forfeits everything', ok:false}],
   hint:'Early put in $12,000 total. Late put in $24,000. Guess who still wins?',
   good:'Early\u2019s $12k compounds for 30 years; Late\u2019s $24k for 20. Time beats amount \u2014 Early wins.',
   bad:'Contribution totals mislead. Compounding time dominates.',
   why:'The most powerful money move is starting early.'};
 }},
{id:'savings-apy-compare-03', verb:'compare', part:5, tier:'independent', skill:'savings-apy',
 gen:(v)=>{
  return {
   context:'<p><b>Plan X:</b> $1,000 at 3% APY for 10 years.</p><p><b>Plan Y:</b> $1,000 at 6% APY for 10 years.</p>',
   q:'How big is the gap?',
   choices:[
    {label:'Big \u2014 ~$1,344 vs ~$1,791; the rate gap compounds too', ok:true},
    {label:'Small \u2014 3% difference on $1,000 is $30', ok:false, mis:'close-enough-math'},
    {label:'Zero \u2014 same $1,000 start', ok:false},
    {label:'Plan X wins \u2014 lower rates are steadier', ok:false, mis:'savings-compounds'}],
   hint:'Rule of 72: 3% doubles in 24 years; 6% in 12.',
   good:'$447 apart after 10 years \u2014 from a "mere" 3% gap. Rate differences compound.',
   bad:'"$30" thinking is one-year thinking. Ten years is the real game.',
   why:'Small rate gaps become big money gaps over time.'};
 }},
{id:'savings-apy-compare-04', verb:'compare', part:5, tier:'independent', skill:'savings-apy',
 gen:(v)=>{
  return {
   context:'<p><b>Saver A:</b> $200/month at 5% APY.</p><p><b>Saver B:</b> $220/month at 0% (checking).</p>',
   q:'Who reaches $5,000 first?',
   choices:[
    {label:'Saver A \u2014 compounding closes the $20/month gap', ok:true},
    {label:'Saver B \u2014 $220 beats $200 every month', ok:false, mis:'added-not-compounded'},
    {label:'Tie \u2014 it evens out', ok:false, mis:'close-enough-math'},
    {label:'Saver B \u2014 0% has no risk', ok:false}],
   hint:'5% on a growing balance vs a flat $20 lead.',
   good:'A\u2019s compounding earns the $20 difference back within about a year, then pulls ahead.',
   bad:'Monthly leads lose to compounding over time.',
   why:'A smaller contribution at a real rate beats a bigger one at zero.'};
 }},
{id:'savings-apy-compare-05', verb:'compare', part:5, tier:'independent', skill:'savings-apy',
 gen:(v)=>{
  return {
   context:'<p><b>Option 1:</b> 4% APY savings account, free, instant transfers.</p><p><b>Option 2:</b> 7% "guaranteed" from a stranger\u2019s app, locks money 2 years.</p>',
   q:'Which is the real deal?',
   choices:[
    {label:'Option 1 \u2014 72 \u00f7 7 \u2248 10 years to double is not "guaranteed" money behavior', ok:true},
    {label:'Option 2 \u2014 7 beats 4, guaranteed', ok:false},
    {label:'Tie \u2014 both are just numbers', ok:false},
    {label:'Option 2 \u2014 locks prove seriousness', ok:false, mis:'apy-apr-confusion'}],
   hint:'What rate would GUARANTEE fast doubling?',
   good:'"Guaranteed" high returns + lockups + strangers = classic scam shape. Real 7% is never guaranteed.',
   bad:'Locks do not prove legitimacy \u2014 they prove you cannot get your money back.',
   why:'The rule of 72 doubles as a scam detector.'};
 }},
{id:'savings-apy-compare-06', verb:'compare', part:5, tier:'independent', skill:'savings-apy',
 gen:(v)=>{
  return {
   context:'<p><b>Strategy 1:</b> Save $5,000, then let 5% APY compound 10 years.</p><p><b>Strategy 2:</b> Save $5,000 and add $100/month at 5% APY for 10 years.</p>',
   q:'Which ends higher?',
   choices:[
    {label:'Strategy 2 \u2014 $12,000 of additions plus compounding crushes lump-only', ok:true},
    {label:'Strategy 1 \u2014 lump sums compound cleaner', ok:false, mis:'added-not-compounded'},
    {label:'Tie \u2014 same 5%, same 10 years', ok:false, mis:'close-enough-math'},
    {label:'Strategy 1 \u2014 additions dilute compounding', ok:false}],
   hint:'$100/month \u00d7 120 months.',
   good:'Strategy 2: ~$8,144 (lump growth) + ~$15,500 (contributions growth) \u2248 $23,600 vs ~$8,144.',
   bad:'"Dilute" is backwards \u2014 additions FEED the compounding base.',
   why:'Lump + contributions + compounding is the full stack.'};
 }},
{id:'savings-apy-build-01', verb:'build', part:5, tier:'independent', skill:'savings-apy',
 gen:(v)=>{
  const total=1000;
  return {
   h:'Build it: right money, right place',
   body:'<p>Split $1,000: keep 1 month of flow ($300) in checking at 0%, move the rest to a 5% APY account.</p>',
   totalDollars: total,
   buckets:[{id:'checking',label:'Checking (0%)'},{id:'apy',label:'Savings (5% APY)'}],
   targets:{checking:300, apy:700},
   hint:'Flow money stays; storage money grows.',
   good:'$700 compounding at 5% while $300 handles daily life.',
   bad:'All $1,000 in checking earns $0/year. All in savings risks overdrafts.',
   why:'Checking for flow, APY for storage.'};
 }},
{id:'savings-apy-build-02', verb:'build', part:5, tier:'independent', skill:'savings-apy',
 gen:(v)=>{
  const total=600;
  return {
   h:'Build it: the goal gets the APY',
   body:'<p>Split $600: $400 for a 2-year goal goes to 5% APY; $200 stays flexible for this month.</p>',
   totalDollars: total,
   buckets:[{id:'goal',label:'Goal (5% APY)'},{id:'flex',label:'Flexible'}],
   targets:{goal:400, flex:200},
   hint:'Long horizon \u2192 compounding. Short horizon \u2192 pacing.',
   good:'The 2-year money compounds (~$441); the month\u2019s money stays liquid.',
   bad:'Parking 2-year money at 0% donates the growth.',
   why:'Match the horizon to the tool: APY for years, pace for weeks.'};
 }},
{id:'savings-apy-build-03', verb:'build', part:5, tier:'independent', skill:'savings-apy',
 gen:(v)=>{
  const total=240;
  return {
   h:'Build it: monthly pace into APY',
   body:'<p>Split $240 of this month\u2019s savings: $200 to the 5% APY goal account, $40 stays as a cushion in checking.</p>',
   totalDollars: total,
   buckets:[{id:'apy',label:'Goal (5% APY)'},{id:'cushion',label:'Cushion'}],
   targets:{apy:200, cushion:40},
   hint:'Most to growth, some to cushion.',
   good:'$200 compounding, $40 cushion \u2014 growth with a safety net.',
   bad:'Zero cushion means the next surprise raids the goal.',
   why:'Compound the goal; cushion the surprises.'};
 }},
{id:'savings-apy-build-04', verb:'build', part:5, tier:'independent', skill:'savings-apy',
 gen:(v)=>{
  const total=1500;
  return {
   h:'Build it: emergency fund placement',
   body:'<p>Split $1,500: full emergency fund ($1,200) to 4.5% APY, $300 stays in checking for bills.</p>',
   totalDollars: total,
   buckets:[{id:'efund',label:'Emergency (4.5% APY)'},{id:'bills',label:'Bills buffer'}],
   targets:{efund:1200, bills:300},
   hint:'Emergency funds sit for years \u2014 years love APY.',
   good:'$1,200 quietly compounding; $300 covering bill timing.',
   bad:'$1,500 in checking = $0/year on money that sits for years.',
   why:'Idle-for-years money belongs in APY.'};
 }},
{id:'savings-apy-build-05', verb:'build', part:5, tier:'independent', skill:'savings-apy',
 gen:(v)=>{
  const total=800;
  return {
   h:'Build it: two goals, two horizons',
   body:'<p>Split $800: $500 for a 3-year goal at 5% APY, $300 for a 3-month goal kept liquid.</p>',
   totalDollars: total,
   buckets:[{id:'long',label:'3-year (5% APY)'},{id:'short',label:'3-month (liquid)'}],
   targets:{long:500, short:300},
   hint:'Horizon decides the home.',
   good:'Long money compounds (~$579); short money stays reachable.',
   bad:'Locking 3-month money away risks the goal; leaving 3-year money at 0% wastes it.',
   why:'Years get APY. Months get liquidity.'};
 }},
{id:'savings-apy-explain-01', verb:'explain', part:5, tier:'independent', skill:'savings-apy',
 gen:(v)=>({
  h:'Teach it back: compounding',
  prompt:'Explain compounding in your own words.',
  keyPoints:['Growth is calculated on the new total each period, not the original','That makes later years add more dollars than early years','It only works on money left untouched','Time is the fuel \u2014 longer means a bigger snowball'],
  modelAnswer:'Compounding means each period\u2019s growth is calculated on the new, bigger total \u2014 so growth itself earns growth. Later years add more dollars than early ones, like a snowball. It only works if the money stays untouched, and time is what makes it powerful.',
  hint:'Snowball.'
 })},
{id:'savings-apy-explain-02', verb:'explain', part:5, tier:'independent', skill:'savings-apy',
 gen:(v)=>({
  h:'Teach it back: APY vs APR',
  prompt:'Explain the difference between APY and APR.',
  keyPoints:['APY includes compounding; APR does not','Same digits can mean different growth','Always compare APY to APY','APR is the "sticker rate" before compounding'],
  modelAnswer:'APY counts growth-earning-growth over a year; APR quotes the rate without compounding. So 5% APY beats 5% APR even though the digits match. Never compare one of each \u2014 convert everything to APY first, then compare.',
  hint:'Same digits, different meaning.'
 })},
{id:'savings-apy-explain-03', verb:'explain', part:5, tier:'independent', skill:'savings-apy',
 gen:(v)=>({
  h:'Teach it back: rule of 72',
  prompt:'Explain the rule of 72 and what it is good for.',
  keyPoints:['72 \u00f7 rate \u2248 years for money to double','It is an estimate, not exact','Higher rate = fewer years','It also works as a scam detector for "guaranteed" returns'],
  modelAnswer:'Divide 72 by the interest rate to estimate how many years it takes money to double \u2014 8% means about 9 years. It is an estimate that assumes a steady rate. It also exposes scams: anyone "guaranteeing" a doubling faster than the math allows is lying.',
  hint:'72 \u00f7 rate.'
 })},
{id:'savings-apy-explain-04', verb:'explain', part:5, tier:'independent', skill:'savings-apy',
 gen:(v)=>({
  h:'Teach it back: when compounding matters',
  prompt:'Explain when compounding matters a lot and when it barely matters.',
  keyPoints:['Matters most over years \u2014 long horizons let the snowball roll','Barely matters over days or weeks','Bigger rates and earlier starts multiply the effect','Short-term money needs pacing, not compounding'],
  modelAnswer:'Compounding matters over years, where growth-on-growth has time to snowball \u2014 that is why early starts and higher APYs win big. Over days or weeks it barely registers, so short-term money should be paced, not parked for growth. Match the tool to the horizon.',
  hint:'Think: 10 years vs 10 days.'
 })},
{id:'savings-apy-explain-05', verb:'explain', part:5, tier:'independent', skill:'savings-apy',
 gen:(v)=>({
  h:'Teach it back: compounding cuts both ways',
  prompt:'Explain how compounding can hurt you, not just help you.',
  keyPoints:['Unpaid debt balances compound too \u2014 against you','Interest earning interest on a loan grows the debt faster','That is why carrying balances is so expensive','Paying debt beats saving at a lower rate'],
  modelAnswer:'Compounding is neutral math: on savings it builds wealth, but on unpaid debt it builds the debt \u2014 interest earning interest against you. A 20% balance left unpaid snowballs fast. That is why killing high-rate debt usually beats saving at a lower rate.',
  hint:'Who benefits when a loan balance compounds?'
 })},
],
'irregular-income': [
{id:'irregular-income-decide-01', verb:'decide', part:5, tier:'independent', skill:'irregular-income',
 gen:(v)=>{
  const person=v.person();
  return {
   q:`${person} does gig work: $300 cash in hand, $170 required costs before the next known pay, no guaranteed shifts. A $90 pair of headphones tempts ${person}. What is the call?`,
   choices:[
    {label:'Hold a $50 buffer, protect $170 costs \u2014 $80 flexible; the headphones do not fit', ok:true},
    {label:'Buy them \u2014 $300 covers $90', ok:false, mis:'total-is-safe'},
    {label:'Buy them \u2014 next week\u2019s shifts will cover the costs', ok:false, mis:'buffers-are-for-steady'},
    {label:'Skip the buffer \u2014 buffers are for people with steady jobs', ok:false, mis:'buffers-are-for-steady'}],
   hint:'Cash in hand: $300. Jobs: $170 + buffer. What is left?',
   good:'$300 \u2212 $170 \u2212 $50 = $80 flexible. The $90 headphones break it \u2014 they wait.',
   bad:'Budgeting "expected" shifts spends money that has not arrived.',
   why:'Irregular income rule: protect costs, hold a buffer, pace only the rest \u2014 from cash in hand.'};
 }},
{id:'irregular-income-decide-02', verb:'decide', part:5, tier:'independent', skill:'irregular-income',
 gen:(v)=>{
  const person=v.person();
  return {
   q:`${person} had a huge $900 week. Next week looks slow ($200 maybe). Rent ($400) is due in 10 days. What is the call?`,
   choices:[
    {label:'Protect the $400 rent first, buffer the gap, pace a small flexible amount', ok:true},
    {label:'Celebrate \u2014 $900 weeks mean the pace can be $900/week', ok:false, mis:'add-week-to-lump'},
    {label:'Spend big now \u2014 slow weeks take care of themselves', ok:false, mis:'plan-never-changes'},
    {label:'Lend $300 to a friend \u2014 $900 is plenty', ok:false, mis:'total-is-safe'}],
   hint:'One great week does not change next week\u2019s reality.',
   good:'Big weeks fund the buffer that carries slow weeks. Rent protected, gap buffered, small pace.',
   bad:'Spending the peak as if it is the average is how gig workers go broke between peaks.',
   why:'Irregular income: average down, buffer up, pace the honest remainder.'};
 }},
{id:'irregular-income-decide-03', verb:'decide', part:5, tier:'independent', skill:'irregular-income',
 gen:(v)=>{
  const person=v.person();
  return {
   q:`${person}\u2019s boss "might" schedule 3 extra shifts next week. Bills need $250. ${person} has $280 cash. What is the call?`,
   choices:[
    {label:'Budget the $280 in hand \u2014 "might" shifts are $0 until confirmed', ok:true},
    {label:'Budget $280 + expected shift pay \u2014 the shifts will probably happen', ok:false, mis:'buffers-are-for-steady'},
    {label:'Spend the $280 now \u2014 shifts will refill it', ok:false, mis:'total-is-safe'},
    {label:'Skip the bills \u2014 shifts cover bills automatically', ok:false, mis:'obligation-is-available'}],
   hint:'"Might" is not money.',
   good:'$280 in hand minus $250 bills = $30 flexible. Expected shifts count at $0.',
   bad:'Budgeting expected income is spending money that does not exist yet.',
   why:'Never budget money that has not arrived. Cash in hand only.'};
 }},
{id:'irregular-income-decide-04', verb:'decide', part:5, tier:'independent', skill:'irregular-income',
 gen:(v)=>{
  const person=v.person();
  return {
   q:`${person} earns $400\u2013$800/month gigging. Setting a monthly pace, which number should anchor it?`,
   choices:[
    {label:'The low end ($400) \u2014 pace the worst realistic month, save the surplus', ok:true},
    {label:'The high end ($800) \u2014 aim high', ok:false, mis:'add-week-to-lump'},
    {label:'The average ($600) \u2014 averages are fair', ok:false, mis:'close-enough-math'},
    {label:'No pace \u2014 irregular income cannot be paced', ok:false, mis:'pace-doesnt-apply'}],
   hint:'What happens in a $400 month under each plan?',
   good:'Pacing $400 means every month works; surplus months build the buffer. Averaging breaks in bad months.',
   bad:'Averages lie when the bad months still have bills.',
   why:'Pace the floor, not the ceiling. Surplus is a bonus, not the plan.'};
 }},
{id:'irregular-income-decide-05', verb:'decide', part:5, tier:'independent', skill:'irregular-income',
 gen:(v)=>{
  const person=v.person();
  return {
   q:`${person} has $500 cash, $200 required costs, and a $100 buffer already saved. A $250 want appears. What is the call?`,
   choices:[
    {label:'Flexible is $300 ($500 \u2212 $200) \u2014 the $250 want fits, buffer untouched', ok:true},
    {label:'Flexible is $200 \u2014 subtract the buffer again', ok:false, mis:'close-enough-math'},
    {label:'Buy it and refill the buffer "later"', ok:false, mis:'savings-from-leftovers'},
    {label:'Skip it \u2014 irregular earners cannot have wants', ok:false, mis:'nothing-safe'}],
   hint:'The buffer is already funded. Do not subtract it twice.',
   good:'$500 \u2212 $200 costs = $300 flexible. The want fits with $50 to spare \u2014 buffer intact.',
   bad:'Double-counting the buffer invents poverty. Raiding it invents risk.',
   why:'A funded buffer is a done job. Pace the remainder confidently.'};
 }},
{id:'irregular-income-decide-06', verb:'decide', part:5, tier:'independent', skill:'irregular-income',
 gen:(v)=>{
  const person=v.person();
  return {
   q:`${person}\u2019s slow season starts: income drops for 6 weeks. The buffer holds $300. Required costs are $150/week. What is the call?`,
   choices:[
    {label:'Stretch the buffer: $300 covers 2 weeks of costs; cut flexible to near zero now', ok:true},
    {label:'Keep spending normally \u2014 the buffer will stretch itself', ok:false, mis:'buffers-are-for-steady'},
    {label:'Spend the buffer fast \u2014 slow seasons end quickly', ok:false, mis:'plan-never-changes'},
    {label:'Borrow to keep the lifestyle \u2014 buffers are embarrassing', ok:false}],
   hint:'$300 \u00f7 $150/week.',
   good:'Two weeks of costs covered. Cutting flexible NOW makes the buffer last into week 3+ with odd jobs.',
   bad:'Normal spending in a slow season burns the buffer in days.',
   why:'Slow seasons: the buffer buys time, and tightened pacing buys more of it.'};
 }},
{id:'irregular-income-decide-07', verb:'decide', part:5, tier:'independent', skill:'irregular-income',
 gen:(v)=>{
  const person=v.person();
  return {
   q:`${person} gets paid per project: $700 just landed, next project unknown. Needs $350 before any known income. What is the call?`,
   choices:[
    {label:'Protect $350, hold a $100 buffer, pace $250 across the unknown gap', ok:true},
    {label:'Treat $700 as monthly income \u2014 $700/month pace', ok:false, mis:'add-week-to-lump'},
    {label:'Spend $700 \u2014 projects always come', ok:false, mis:'no-pace-needed'},
    {label:'Save all $700 \u2014 project workers cannot spend', ok:false, mis:'nothing-safe'}],
   hint:'Unknown gap = unknown weeks. What is the safe math?',
   good:'$350 protected, $100 buffered, $250 paced carefully across the gap. Unknown time gets a cautious pace.',
   bad:'Treating one project as a salary spends the gap\u2019s money on day one.',
   why:'Project pay: protect, buffer, then pace the rest over the unknown.'};
 }},
{id:'irregular-income-decide-08', verb:'decide', part:5, tier:'independent', skill:'irregular-income',
 gen:(v)=>{
  const person=v.person();
  return {
   q:`${person}\u2019s roommate says "just split everything 50/50 and pace your half." ${person} earns half what the roommate earns, irregularly. What is the call?`,
   choices:[
    {label:'Pace from personal cash-in-hand reality, not the roommate\u2019s steady half', ok:true},
    {label:'Match the roommate\u2019s pace \u2014 50/50 is fair', ok:false, mis:'close-enough-math'},
    {label:'Skip pacing \u2014 roommates make it impossible', ok:false, mis:'pace-doesnt-apply'},
    {label:'Borrow to match \u2014 keeping up matters', ok:false, mis:'afford-more'}],
   hint:'Whose income is irregular here?',
   good:'${person}\u2019s pace must fit ${person}\u2019s cash reality \u2014 lower floor, real buffer. Fair splits need honest personal math first.',
   bad:'Matching a steady earner\u2019s pace on irregular income breaks in the first slow week.',
   why:'Pace YOUR money, not someone else\u2019s.'};
 }},
{id:'irregular-income-predict-01', verb:'predict', part:5, tier:'independent', skill:'irregular-income',
 gen:(v)=>{
  const person=v.person();
  return {
   q:`${person} budgets next month\u2019s "expected" $600 in gig pay and spends $200 of it early. The gigs fall through. What breaks first?`,
   choices:[
    {label:'The bills \u2014 $200 of phantom money is already spent', ok:true},
    {label:'Nothing \u2014 expected money always arrives eventually', ok:false, mis:'buffers-are-for-steady'},
    {label:'The gigs \u2014 they feel guilty and return', ok:false},
    {label:'The calendar \u2014 time slows down to help', ok:false}],
   hint:'Spent: $200 real. Income: $0 real.',
   good:'The $200 came from somewhere real \u2014 bills or buffer. Phantom income creates real holes.',
   bad:'"Expected" is not a deposit.',
   why:'Budgeting unarrived money spends arrived money. The bills notice first.'};
 }},
{id:'irregular-income-predict-02', verb:'predict', part:5, tier:'independent', skill:'irregular-income',
 gen:(v)=>{
  const person=v.person();
  return {
   q:`${person} skips the buffer "because income is irregular anyway." What happens in the first slow week?`,
   choices:[
    {label:'Costs eat the flexible money \u2014 with no cushion, the plan breaks immediately', ok:true},
    {label:'Nothing \u2014 irregular income does not need buffers', ok:false, mis:'buffers-are-for-steady'},
    {label:'Income rises to fill the gap', ok:false},
    {label:'Bills wait politely', ok:false, mis:'obligation-is-available'}],
   hint:'Who needs buffers most: steady or irregular earners?',
   good:'Irregular earners need buffers MOST \u2014 the buffer is the steady paycheck they do not have.',
   bad:'"Irregular anyway" is the reason FOR the buffer, not against it.',
   why:'The buffer converts irregular income into steady coverage.'};
 }},
{id:'irregular-income-predict-03', verb:'predict', part:5, tier:'independent', skill:'irregular-income',
 gen:(v)=>{
  const person=v.person();
  return {
   q:`${person} paces the $800 peak month instead of the $400 floor. What does month three (a $400 month) look like?`,
   choices:[
    {label:'Broken \u2014 the pace assumed money that did not come', ok:true},
    {label:'Fine \u2014 peaks average out', ok:false, mis:'add-week-to-lump'},
    {label:'Fine \u2014 the pace adjusts itself', ok:false, mis:'plan-never-changes'},
    {label:'Better \u2014 high paces attract high income', ok:false}],
   hint:'Pace: $800/month. Reality: $400.',
   good:'The $800 pace spends $400 of phantom money. Bills eat the buffer, then the plan.',
   bad:'Paces do not self-adjust. People do \u2014 after the damage.',
   why:'Pace the floor. Peaks are bonuses.'};
 }},
{id:'irregular-income-predict-04', verb:'predict', part:5, tier:'independent', skill:'irregular-income',
 gen:(v)=>{
  const person=v.person();
  return {
   q:`${person} builds a $400 buffer over good months, then a 4-week dry spell hits with $100/week costs. What happens?`,
   choices:[
    {label:'Survives \u2014 $400 covers exactly 4 weeks of costs', ok:true},
    {label:'Fails \u2014 buffers never actually work', ok:false, mis:'buffers-are-for-steady'},
    {label:'Fails \u2014 $400 is too small to matter', ok:false, mis:'close-enough-math'},
    {label:'Thrives \u2014 dry spells increase income', ok:false}],
   hint:'$400 \u00f7 $100/week.',
   good:'The buffer does its one job: 4 weeks of costs, zero panic. That is the whole design.',
   bad:'"Too small" thinking skips the buffer that would have saved the month.',
   why:'Buffers are measured in weeks of costs \u2014 that is their unit.'};
 }},
{id:'irregular-income-predict-05', verb:'predict', part:5, tier:'independent', skill:'irregular-income',
 gen:(v)=>{
  const person=v.person();
  return {
   q:`${person} treats every good week as the new normal and raises the pace each time. What is the long-term result?`,
   choices:[
    {label:'A ratchet \u2014 the pace only rises, then slow weeks shatter it', ok:true},
    {label:'Wealth \u2014 rising paces build savings', ok:false, mis:'afford-more'},
    {label:'Stability \u2014 the pace finds the true average', ok:false, mis:'close-enough-math'},
    {label:'Nothing \u2014 paces do not affect reality', ok:false}],
   hint:'What goes up with peaks but never comes down?',
   good:'Lifestyle ratchets up on peaks and cannot ratchet down for valleys. The gap becomes debt.',
   bad:'"New normal" thinking spends tomorrow\u2019s valleys today.',
   why:'Anchor the pace to the floor. Let peaks be peaks.'};
 }},
{id:'irregular-income-predict-06', verb:'predict', part:5, tier:'independent', skill:'irregular-income',
 gen:(v)=>{
  const person=v.person();
  return {
   q:`${person} keeps the buffer in the checking account "for easy access" with no label. What happens?`,
   choices:[
    {label:'It gets spent \u2014 unlabeled money looks available', ok:true},
    {label:'It grows \u2014 easy access earns interest', ok:false, mis:'savings-compounds'},
    {label:'Nothing \u2014 buffers are immune to spending', ok:false, mis:'buffers-are-for-steady'},
    {label:'It doubles \u2014 checking accounts compound fast', ok:false}],
   hint:'What does $300 of "available" balance invite?',
   good:'Unlabeled buffer money reads as spendable. Label it, separate it, or watch it evaporate.',
   bad:'"Easy access" is easy spending with a nicer name.',
   why:'Buffers need boundaries \u2014 separate, labeled, boring.'};
 }},
{id:'irregular-income-spot-01', verb:'spot', part:6, tier:'independent', skill:'irregular-income',
 gen:(v)=>{
  const person=v.person();
  return {
   scenario:`<p>${person}\u2019s gig budget:</p><ul><li>Cash in hand: $350</li><li>"Expected" gig pay: $400</li><li>Budgeted spending: $700 \u2014 "it is all coming"</li><li>Costs due: $300</li></ul>`,
   q:'What is the mistake here?',
   choices:[
    {label:'Budgeted $400 that has not arrived \u2014 only $350 is real', ok:true},
    {label:'The costs \u2014 $300 is too high', ok:false},
    {label:'Nothing \u2014 expected money is basically real', ok:false, mis:'buffers-are-for-steady'},
    {label:'Having gig income at all', ok:false}],
   hint:'Which dollars exist right now?',
   good:'$700 of plans on $350 of reality. When the $400 wobbles, the $300 costs still stand.',
   bad:'"Basically real" is not real.',
   why:'Budget cash in hand. Expected money is $0 until it lands.'};
 }},
{id:'irregular-income-spot-02', verb:'spot', part:6, tier:'independent', skill:'irregular-income',
 gen:(v)=>{
  const person=v.person();
  return {
   scenario:`<p>${person}\u2019s "buffer":</p><ul><li>Saved $250 buffer over 2 good months</li><li>Slow week: spent $200 of it on a sale \u2014 "I will rebuild it"</li><li>Next slow week: $50 left, $180 in costs</li></ul>`,
   q:'What is the mistake here?',
   choices:[
    {label:'Spent the buffer on a want \u2014 buffers cover cost gaps, not sales', ok:true},
    {label:'Saving $250 \u2014 too much buffer', ok:false, mis:'buffers-are-for-steady'},
    {label:'Having a slow week \u2014 avoidable with planning', ok:false},
    {label:'The $180 costs \u2014 costs should be zero in slow weeks', ok:false}],
   hint:'What is a buffer FOR?',
   good:'The buffer\u2019s job is covering cost gaps in dry spells. Sale spending fired the safety net before the emergency.',
   bad:'"Rebuild it later" is how buffers die \u2014 later has its own costs.',
   why:'Buffers are for gaps, not deals.'};
 }},
{id:'irregular-income-spot-03', verb:'spot', part:6, tier:'independent', skill:'irregular-income',
 gen:(v)=>{
  const person=v.person();
  return {
   scenario:`<p>${person}\u2019s monthly pace:</p><ul><li>Earns $500\u2013$900/month</li><li>Set pace at $900/month: "I usually hit it"</li><li>Bad month: $520 earned, $900 paced</li></ul>`,
   q:'What is the mistake here?',
   choices:[
    {label:'Paced the ceiling instead of the floor \u2014 "usually" is not "always"', ok:true},
    {label:'Earning $500\u2013$900 \u2014 too unpredictable to pace', ok:false, mis:'pace-doesnt-apply'},
    {label:'The $900 pace \u2014 paces should be higher than income', ok:false, mis:'add-week-to-lump'},
    {label:'Nothing \u2014 one bad month is fine', ok:false, mis:'plan-never-changes'}],
   hint:'What breaks in a $520 month?',
   good:'"$900 usually" still breaks in $520 months. Pace the $500 floor; bank the surplus.',
   bad:'"Usually" is a hope wearing a plan\u2019s clothes.',
   why:'The floor is the plan. Everything above is bonus.'};
 }},
{id:'irregular-income-spot-04', verb:'spot', part:6, tier:'independent', skill:'irregular-income',
 gen:(v)=>{
  const person=v.person();
  return {
   scenario:`<p>${person}\u2019s week:</p><ul><li>$420 cash in hand, $200 costs, $50 buffer held</li><li>Flexible: $170 \u2014 correct</li><li>Spent $170 on day one: "it was all flexible!"</li></ul>`,
   q:'What is the mistake here?',
   choices:[
    {label:'Flexible still needs pacing \u2014 $170 is the total, not the daily amount', ok:true},
    {label:'The buffer \u2014 $50 is too small', ok:false, mis:'buffers-are-for-steady'},
    {label:'The math \u2014 flexible was really $370', ok:false, mis:'close-enough-math'},
    {label:'Nothing \u2014 flexible means spendable instantly', ok:false, mis:'daily-equals-total'}],
   hint:'Flexible for HOW LONG?',
   good:'$170 flexible for the whole gap, spent day one = six days at zero.',
   bad:'"All flexible" does not mean "all today." Pace it.',
   why:'Flexible is HOW MUCH. Pacing is HOW FAST \u2014 even for gig workers.'};
 }},
{id:'irregular-income-spot-05', verb:'spot', part:6, tier:'independent', skill:'irregular-income',
 gen:(v)=>{
  const person=v.person();
  return {
   scenario:`<p>${person}\u2019s system:</p><ul><li>Good months: spends the surplus on upgrades</li><li>"I will save when I have a steady job"</li><li>Slow month: $0 buffer, costs due</li></ul>`,
   q:'What is the mistake here?',
   choices:[
    {label:'Surplus months are WHEN the buffer gets built \u2014 waiting for "steady" never comes', ok:true},
    {label:'Spending on upgrades \u2014 upgrades are always wrong', ok:false},
    {label:'Wanting a steady job \u2014 gig work is the problem', ok:false, mis:'pace-doesnt-apply'},
    {label:'The slow month \u2014 unpredictable and unfair', ok:false}],
   hint:'When CAN a buffer be built?',
   good:'Buffers are built from surplus \u2014 which only exists in good months. "Later" is a mirage.',
   bad:'Waiting for steady income to start buffering is waiting forever.',
   why:'Good months fund the buffer. That is their highest use.'};
 }},
{id:'irregular-income-spot-06', verb:'spot', part:6, tier:'independent', skill:'irregular-income',
 gen:(v)=>{
  const person=v.person();
  return {
   scenario:`<p>${person}\u2019s schedule swap:</p><ul><li>Was: $300/week gig, $120/week costs</li><li>Now: $0 for 2 weeks, then $600 week 3</li><li>Kept the old $180/week flexible pace through the $0 weeks</li></ul>`,
   q:'What is the mistake here?',
   choices:[
    {label:'Kept the old pace through a schedule change \u2014 new reality, new math', ok:true},
    {label:'The $600 week \u2014 too much at once', ok:false, mis:'add-week-to-lump'},
    {label:'Gig work \u2014 schedules should never change', ok:false, mis:'schedule-swap'},
    {label:'Nothing \u2014 paces survive any schedule', ok:false, mis:'plan-never-changes'}],
   hint:'What funds weeks 1\u20132?',
   good:'$0 weeks need buffer math, not the old pace. The $600 week refills; it does not retro-fund.',
   bad:'Paces are not permanent \u2014 they recalculate when reality changes.',
   why:'Schedule changes trigger instant recalculation.'};
 }},
{id:'irregular-income-compare-01', verb:'compare', part:6, tier:'independent', skill:'irregular-income',
 gen:(v)=>{
  return {
   context:'<p><b>Sam:</b> $600 cash, $250 costs, $100 buffer \u2192 $250 flexible, paced.</p><p><b>Alex:</b> $600 cash, $250 costs, no buffer \u2192 $350 "flexible," unpaced.</p>',
   q:'Who survives a surprise $150 cost?',
   choices:[
    {label:'Sam \u2014 the buffer absorbs it, pace intact', ok:true},
    {label:'Alex \u2014 more flexible money means more room', ok:false, mis:'buffers-are-for-steady'},
    {label:'Tie \u2014 same $600', ok:false, mis:'total-is-safe'},
    {label:'Alex \u2014 buffers just trap money', ok:false}],
   hint:'Where does Alex\u2019s $150 come from?',
   good:'Sam\u2019s $100 buffer was built for exactly this. Alex\u2019s $150 comes from costs or chaos.',
   bad:'"More flexible" without a buffer is just unprotected.',
   why:'Buffers turn surprises into line items.'};
 }},
{id:'irregular-income-compare-02', verb:'compare', part:6, tier:'independent', skill:'irregular-income',
 gen:(v)=>{
  return {
   context:'<p><b>Plan A:</b> Pace the $400 floor; bank surplus months.</p><p><b>Plan B:</b> Pace the $650 average; hope bad months are mild.</p>',
   q:'Which plan survives a $400 month?',
   choices:[
    {label:'Plan A \u2014 the floor IS the $400 month', ok:true},
    {label:'Plan B \u2014 averages are mathematically sound', ok:false, mis:'close-enough-math'},
    {label:'Tie \u2014 both are paces', ok:false},
    {label:'Plan B \u2014 higher paces motivate higher earnings', ok:false, mis:'afford-more'}],
   hint:'What does Plan B assume about the $400 month?',
   good:'Plan A was built for it. Plan B spends $250 of money that did not arrive.',
   bad:'Averages are not plans \u2014 they are wishes with math.',
   why:'Plan for the floor; enjoy the ceiling.'};
 }},
{id:'irregular-income-compare-03', verb:'compare', part:6, tier:'independent', skill:'irregular-income',
 gen:(v)=>{
  return {
   context:'<p><b>Jo:</b> Big $900 week \u2192 protects costs, buffers $300, paces $200 flexible.</p><p><b>Kim:</b> Big $900 week \u2192 spends $700, "slow weeks will work out."</p>',
   q:'Who is still standing in week 4 (a $150 week)?',
   choices:[
    {label:'Jo \u2014 the $300 buffer carries the slow weeks', ok:true},
    {label:'Kim \u2014 $700 of spending bought momentum', ok:false, mis:'add-week-to-lump'},
    {label:'Tie \u2014 same $900 week', ok:false, mis:'total-is-safe'},
    {label:'Kim \u2014 confidence earns more gigs', ok:false}],
   hint:'Week 4 has $150. Who has reserves?',
   good:'Jo\u2019s buffer turns the $150 week into a normal week. Kim\u2019s week 4 has nothing.',
   bad:'Peak-week spending is borrowing from future slow weeks.',
   why:'Big weeks are for building, not balling.'};
 }},
{id:'irregular-income-compare-04', verb:'compare', part:6, tier:'independent', skill:'irregular-income',
 gen:(v)=>{
  return {
   context:'<p><b>Ray:</b> Recalculates the pace every payday from cash in hand.</p><p><b>Jay:</b> Set one pace in January, still using it in June.</p>',
   q:'Whose pace matches reality?',
   choices:[
    {label:'Ray \u2014 irregular income needs fresh math constantly', ok:true},
    {label:'Jay \u2014 consistency beats recalculating', ok:false, mis:'plan-never-changes'},
    {label:'Tie \u2014 a pace is a pace', ok:false},
    {label:'Jay \u2014 recalculating is overthinking', ok:false, mis:'no-pace-needed'}],
   hint:'Whose inputs are current?',
   good:'Ray\u2019s pace always reflects actual cash. Jay\u2019s reflects January.',
   bad:'A stale pace is a fantasy with a spreadsheet.',
   why:'Irregular income = recalculate every payday. No exceptions.'};
 }},
{id:'irregular-income-compare-05', verb:'compare', part:6, tier:'independent', skill:'irregular-income',
 gen:(v)=>{
  return {
   context:'<p><b>Ari:</b> $350 cash, budgets $350.</p><p><b>Max:</b> $350 cash + $300 "expected," budgets $650.</p>',
   q:'Who made the honest budget?',
   choices:[
    {label:'Ari \u2014 cash in hand only', ok:true},
    {label:'Max \u2014 expected money counts', ok:false, mis:'buffers-are-for-steady'},
    {label:'Tie \u2014 both used real numbers', ok:false, mis:'close-enough-math'},
    {label:'Max \u2014 optimism is a strategy', ok:false}],
   hint:'Which budget survives the gigs falling through?',
   good:'Ari\u2019s $350 budget works even if nothing else arrives. Max\u2019s needs $300 of luck.',
   bad:'Optimism is not a line item.',
   why:'Honest budgets use arrived money only.'};
 }},
{id:'irregular-income-compare-06', verb:'compare', part:6, tier:'independent', skill:'irregular-income',
 gen:(v)=>{
  return {
   context:'<p><b>Plan X:</b> Buffer = 2 weeks of costs, rebuilt after every use.</p><p><b>Plan Y:</b> Buffer = "whatever is left," never rebuilt.</p>',
   q:'Which buffer actually protects?',
   choices:[
    {label:'Plan X \u2014 sized in weeks, maintained like a tool', ok:true},
    {label:'Plan Y \u2014 any buffer is a buffer', ok:false, mis:'buffers-are-for-steady'},
    {label:'Tie \u2014 both are called buffers', ok:false},
    {label:'Plan Y \u2014 maintenance is overkill', ok:false, mis:'plan-never-changes'}],
   hint:'What happens after Plan Y\u2019s buffer gets used once?',
   good:'Plan X is a system: sized, used, rebuilt. Plan Y is a one-time wish.',
   bad:'An unrebuilt buffer is a used-up buffer.',
   why:'Buffers are measured in weeks of costs and rebuilt after every draw.'};
 }},
{id:'irregular-income-choice-01', verb:'choice', part:7, tier:'independent', skill:'irregular-income',
 gen:(v)=>{
  const cash=v.int(420,640), req=v.int(180,300), buf=v.int(50,100);
  const flex=cash-req-buf;
  return {
   q:`Cash in hand: ${v.money(cash)}. Required costs: ${v.money(req)}. Buffer to hold: ${v.money(buf)}. What is flexible?`,
   choices:[
    {label:v.money(flex), ok:true},
    {label:v.money(cash-req), ok:false, mis:'buffers-are-for-steady'},
    {label:v.money(cash), ok:false, mis:'total-is-safe'},
    {label:v.money(flex-30), ok:false, mis:'close-enough-math'}],
   hint:'Cash \u2212 costs \u2212 buffer.',
   good:`${v.money(cash)} \u2212 ${v.money(req)} \u2212 ${v.money(buf)} = ${v.money(flex)} flexible.`,
   bad:'Skipping the buffer spends the safety net as fun money.',
   why:'The irregular-income formula: cash \u2212 costs \u2212 buffer = flexible.'};
 }},
{id:'irregular-income-choice-02', verb:'choice', part:7, tier:'independent', skill:'irregular-income',
 gen:(v)=>{
  const weekly=v.pick([120,150,180]); const wks=v.pick([2,3,4]);
  const buf=weekly*wks;
  return {
   q:`Weekly costs are ${v.money(weekly)}. How big a buffer covers ${wks} slow weeks?`,
   choices:[
    {label:v.money(buf), ok:true},
    {label:v.money(weekly), ok:false, mis:'close-enough-math'},
    {label:v.money(buf*2), ok:false, mis:'buffers-are-for-steady'},
    {label:'$0 \u2014 buffers are for steady earners', ok:false, mis:'buffers-are-for-steady'}],
   hint:'Buffers are measured in weeks of costs.',
   good:`${v.money(weekly)} \u00d7 ${wks} = ${v.money(buf)}. That is ${wks} weeks of survival.`,
   bad:'One week of costs is not a buffer \u2014 it is next week\u2019s bills.',
   why:'Size buffers in weeks of costs, not vibes.'};
 }},
{id:'irregular-income-choice-03', verb:'choice', part:7, tier:'independent', skill:'irregular-income',
 gen:(v)=>{
  const cash=v.int(500,750), req=v.int(220,340);
  const flex=cash-req-75;
  return {
   q:`${v.money(cash)} cash, ${v.money(req)} required costs, and the buffer rule says hold $75. A $200 want appears. Does it fit?`,
   choices:[
    {label:`No \u2014 flexible is ${v.money(flex)}, short of $200`, ok:true},
    {label:'Yes \u2014 $200 is less than the cash', ok:false, mis:'total-is-safe'},
    {label:'Yes \u2014 skip the $75 buffer this once', ok:false, mis:'buffers-are-for-steady'},
    {label:`Yes \u2014 flexible is ${v.money(cash-req)}, which covers it`, ok:false, mis:'close-enough-math'}],
   hint:'Subtract the buffer BEFORE comparing.',
   good:`${v.money(cash)} \u2212 ${v.money(req)} \u2212 $75 = ${v.money(flex)}. The $200 want is over \u2014 it waits.`,
   bad:'"Just this once" on the buffer is the most expensive sentence in gig work.',
   why:'Wants are measured against post-buffer flexible \u2014 always.'};
 }},
{id:'irregular-income-choice-04', verb:'choice', part:7, tier:'independent', skill:'irregular-income',
 gen:(v)=>{
  const months=v.pick([3,4,6]); const low=v.pick([400,500]);
  const pace=low;
  return {
   q:`Gig pay ranges $${low}\u2013$${low+400}/month. Setting a monthly pace for the next ${months} months \u2014 what anchors it?`,
   choices:[
    {label:v.money(pace)+'/month \u2014 the floor', ok:true},
    {label:v.money(low+400)+'/month \u2014 the ceiling', ok:false, mis:'add-week-to-lump'},
    {label:v.money(low+200)+'/month \u2014 the midpoint', ok:false, mis:'close-enough-math'},
    {label:'No pace \u2014 ranges cannot be paced', ok:false, mis:'pace-doesnt-apply'}],
   hint:'Which month must the pace survive?',
   good:`Pacing ${v.money(low)}/month works in every month. Surplus months build the buffer.`,
   bad:'Midpoints break in bad months; ceilings break in most months.',
   why:'Anchor to the floor. Bank the rest.'};
 }},
{id:'irregular-income-choice-05', verb:'choice', part:7, tier:'independent', skill:'irregular-income',
 gen:(v)=>{
  const cash=v.int(380,520), req=v.int(150,240), buf=60;
  const flex=cash-req-buf; const wks=3;
  const weekly=Math.floor(flex/wks);
  return {
   q:`${v.money(cash)} cash, ${v.money(req)} costs, $60 buffer. ${wks} weeks until known income. What is the weekly pace?`,
   choices:[
    {label:`${v.money(flex)} flexible \u2192 ~${v.money(weekly)}/week`, ok:true},
    {label:`${v.money(cash)}/week \u2014 pace the whole cash`, ok:false, mis:'total-is-safe'},
    {label:`${v.money(cash-req)}/week \u2014 skip the buffer`, ok:false, mis:'buffers-are-for-steady'},
    {label:'$0/week \u2014 gig gaps mean no spending', ok:false, mis:'nothing-safe'}],
   hint:'Flexible first, then \u00f7 weeks.',
   good:`${v.money(flex)} \u00f7 ${wks} \u2248 ${v.money(weekly)}/week. Small, honest, survivable.`,
   bad:'Skipping steps inflates the pace with protected money.',
   why:'Gap pacing: (cash \u2212 costs \u2212 buffer) \u00f7 weeks.'};
 }},
{id:'irregular-income-choice-06', verb:'choice', part:7, tier:'independent', skill:'irregular-income',
 gen:(v)=>{
  const have=v.pick([180,240]); const need=v.pick([300,360]);
  const short=need-have;
  return {
   q:`Buffer goal: ${v.money(need)} (4 weeks of costs). Saved so far: ${v.money(have)}. A good week brings $150 surplus. What is the move?`,
   choices:[
    {label:`Put the full $150 to the buffer \u2014 ${v.money(short)} short, every surplus counts`, ok:true},
    {label:'Spend the $150 \u2014 the buffer is "close enough"', ok:false, mis:'close-enough-math'},
    {label:'Split it: $75 fun, $75 buffer', ok:false, mis:'buffers-are-for-steady'},
    {label:'Skip the buffer \u2014 good weeks mean it is not needed', ok:false, mis:'plan-never-changes'}],
   hint:'What are surplus weeks FOR?',
   good:`$150 \u2192 buffer. Now ${v.money(have+150)} of ${v.money(need)}. Surplus builds safety.`,
   bad:'"Close enough" buffers fail exactly when tested.',
   why:'Surplus weeks have one job: finish the buffer.'};
 }},
{id:'irregular-income-choice-07', verb:'choice', part:7, tier:'independent', skill:'irregular-income',
 gen:(v)=>{
  const cash=v.int(600,850), req=v.int(300,450);
  const flex=cash-req-100;
  return {
   q:`Project pay: ${v.money(cash)} landed. ${v.money(req)} in costs before the next project (unknown date). Buffer rule: $100. What is flexible?`,
   choices:[
    {label:v.money(flex), ok:true},
    {label:v.money(cash), ok:false, mis:'total-is-safe'},
    {label:v.money(cash-req), ok:false, mis:'buffers-are-for-steady'},
    {label:v.money(flex+100), ok:false, mis:'close-enough-math'}],
   hint:'Unknown gap = cautious math. Cash \u2212 costs \u2212 buffer.',
   good:`${v.money(flex)} flexible, paced carefully across the unknown gap.`,
   bad:'Unknown timing makes the buffer MORE important, not less.',
   why:'Project pay: protect, buffer, pace the rest.'};
 }},
{id:'irregular-income-choice-08', verb:'choice', part:7, tier:'independent', skill:'irregular-income',
 gen:(v)=>{
  const drawn=v.pick([120,180]); const costs=v.pick([200,260]);
  return {
   q:`The buffer was ${v.money(drawn+80)}. A dry spell drew it down to ${v.money(drawn)}. Costs are ${v.money(costs)}/month. What is the rebuild priority?`,
   choices:[
    {label:'Highest \u2014 rebuild to full before raising flexible spending', ok:true},
    {label:'Lowest \u2014 dry spells do not repeat', ok:false, mis:'plan-never-changes'},
    {label:'Medium \u2014 split rebuild with fun money', ok:false, mis:'close-enough-math'},
    {label:'None \u2014 buffers are one-time tools', ok:false, mis:'buffers-are-for-steady'}],
   hint:'What happens in the NEXT dry spell?',
   good:'A drawn buffer is a used fire extinguisher \u2014 refill first.',
   bad:'"It worked once" is not a reason to retire it.',
   why:'Rebuild after every draw. The next gap is always coming.'};
 }},
{id:'irregular-income-sort-01', verb:'sort', part:7, tier:'independent', skill:'irregular-income',
 gen:(v)=>({
  h:'Sort it: budget now or not yet?',
  body:'<p>Sort each dollar by whether it can be budgeted today.</p>',
  buckets:['Budget now','Not yet'],
  items:[
   {label:'$350 cash in hand', a:'budget now', why:'Arrived = real.'},
   {label:'$400 "expected" gig pay', a:'not yet', why:'Expected = $0 until it lands.'},
   {label:'$200 confirmed shift, worked, unpaid', a:'not yet', why:'Unpaid is not in hand.'},
   {label:'$180 buffer already saved', a:'budget now', why:'It exists \u2014 as a buffer, not spending.'},
   {label:'$250 "might" get scheduled', a:'not yet', why:'"Might" is not money.'},
   {label:'$90 side-gig cash received', a:'budget now', why:'In hand.'},
   {label:'Next month\u2019s probable bonus', a:'not yet', why:'Probable is not arrived.'},
   {label:'$120 costs due Friday', a:'budget now', why:'A job \u2014 subtract it now.'}]
 })},
{id:'irregular-income-sort-02', verb:'sort', part:7, tier:'independent', skill:'irregular-income',
 gen:(v)=>({
  h:'Sort it: buffer job or buffer raid?',
  body:'<p>Sort each use of buffer money.</p>',
  buckets:['Buffer job','Buffer raid'],
  items:[
   {label:'Covering rent in a $0 week', a:'buffer job', why:'Exactly what it is for.'},
   {label:'Buying sale sneakers', a:'buffer raid', why:'A want, not a gap.'},
   {label:'Groceries during a dry spell', a:'buffer job', why:'A cost gap.'},
   {label:'Concert tickets "before they sell out"', a:'buffer raid', why:'FOMO is not a gap.'},
   {label:'Car repair to keep gigging', a:'buffer job', why:'Protects the income itself.'},
   {label:'Upgrading a working phone', a:'buffer raid', why:'Want disguised as need.'},
   {label:'Electric bill in a slow month', a:'buffer job', why:'Dated obligation, no income.'},
   {label:'Lending it to a friend', a:'buffer raid', why:'Lent buffers do not cover YOUR gaps.'}]
 })},
{id:'irregular-income-sort-03', verb:'sort', part:7, tier:'independent', skill:'irregular-income',
 gen:(v)=>({
  h:'Sort it: floor thinking or ceiling thinking?',
  body:'<p>Sort each thought about irregular pay.</p>',
  buckets:['Floor thinking','Ceiling thinking'],
  items:[
   {label:'"Pace the $400 month"', a:'floor thinking', why:'Plans for the worst realistic.'},
   {label:'"Pace the $900 month"', a:'ceiling thinking', why:'Plans for the best.'},
   {label:'"Surplus months build the buffer"', a:'floor thinking', why:'Peaks have a job.'},
   {label:'"Good weeks mean I can spend more"', a:'ceiling thinking', why:'Ratchets the lifestyle up.'},
   {label:'"Budget cash in hand only"', a:'floor thinking', why:'Reality-based.'},
   {label:'"The gigs will probably come"', a:'ceiling thinking', why:'Probably is not a plan.'},
   {label:'"Slow seasons get tightened pacing"', a:'floor thinking', why:'Adapts down.'},
   {label:'"One great week = new normal"', a:'ceiling thinking', why:'The ratchet trap.'}]
 })},
{id:'irregular-income-sort-04', verb:'sort', part:7, tier:'independent', skill:'irregular-income',
 gen:(v)=>({
  h:'Sort it: protect, buffer, or pace?',
  body:'<p>$520 cash, gig worker. Sort each dollar\u2019s role.</p>',
  buckets:['Protect','Buffer','Pace'],
  items:[
   {label:'$200 rent due', a:'protect', why:'Dated obligation.'},
   {label:'$80 slow-week cushion', a:'buffer', why:'The gap fund.'},
   {label:'$60/week flexible spending', a:'pace', why:'Paced wants.'},
   {label:'$90 utility bills', a:'protect', why:'Required costs.'},
   {label:'$50 emergency top-up', a:'buffer', why:'Rebuilding safety.'},
   {label:'$40 dining out (paced)', a:'pace', why:'Flexible, measured.'},
   {label:'$60 savings goal move', a:'protect', why:'A committed job.'},
   {label:'$40 gig gas', a:'protect', why:'Keeps the income running.'}]
 })},
{id:'irregular-income-sort-05', verb:'sort', part:7, tier:'independent', skill:'irregular-income',
 gen:(v)=>({
  h:'Sort it: steady rule or irregular rule?',
  body:'<p>Sort each rule by whose income it fits.</p>',
  buckets:['Steady income','Irregular income'],
  items:[
   {label:'Pace each paycheck the same', a:'steady income', why:'Predictable pay, predictable pace.'},
   {label:'Recalculate every payday from cash in hand', a:'irregular income', why:'Inputs change constantly.'},
   {label:'Hold a buffer for gaps', a:'irregular income', why:'Gaps are the norm.'},
   {label:'Autopay everything on the 1st', a:'steady income', why:'Dates are reliable.'},
   {label:'Pace the floor month', a:'irregular income', why:'The floor is the plan.'},
   {label:'Same budget 12 months a year', a:'steady income', why:'Nothing changes.'},
   {label:'Tighten pacing in slow seasons', a:'irregular income', why:'Seasons change the math.'},
   {label:'Budget expected shifts at $0', a:'irregular income', why:'Unarrived money is not budgeted.'}]
 })},
{id:'irregular-income-sort-06', verb:'sort', part:7, tier:'independent', skill:'irregular-income',
 gen:(v)=>({
  h:'Sort it: builds the buffer or drains it?',
  body:'<p>Sort each habit by what it does to the buffer.</p>',
  buckets:['Builds','Drains'],
  items:[
   {label:'Sending surplus weeks to the buffer', a:'builds', why:'That is the surplus\u2019s job.'},
   {label:'Raiding it for sales', a:'drains', why:'Wants are not gaps.'},
   {label:'Rebuilding after every draw', a:'builds', why:'Maintenance.'},
   {label:'"Forgetting" to refill it', a:'drains', why:'Slow evaporation.'},
   {label:'Sizing it in weeks of costs', a:'builds', why:'Proper measurement.'},
   {label:'Keeping it unlabeled in checking', a:'drains', why:'Looks spendable.'},
   {label:'Topping it up from windfalls', a:'builds', why:'Windfalls\u2019 best job.'},
   {label:'Lending it out', a:'drains', why:'Gone when you need it.'}]
 })},
{id:'irregular-income-build-01', verb:'build', part:7, tier:'independent', skill:'irregular-income',
 gen:(v)=>{
  const total=550;
  return {
   h:'Build it: gig-week split',
   body:'<p>Split $550 cash in hand: $230 required costs, $80 buffer hold, and pace the flexible rest.</p>',
   totalDollars: total,
   buckets:[{id:'costs',label:'Required costs'},{id:'buffer',label:'Buffer'},{id:'flex',label:'Flexible'}],
   targets:{costs:230, buffer:80, flex:240},
   hint:'Costs, then buffer, then flexible.',
   good:'$240 flexible from $550 \u2014 costs and buffer protected.',
   bad:'Skipping the buffer turns $320 into fake flexible.',
   why:'The irregular split: protect, buffer, pace.'};
 }},
{id:'irregular-income-build-02', verb:'build', part:7, tier:'independent', skill:'irregular-income',
 gen:(v)=>{
  const total=400;
  return {
   h:'Build it: size the buffer',
   body:'<p>Build a 4-week buffer at $100/week costs, then show what is left of $400... wait \u2014 the buffer IS $400 here. Split $700: buffer $400, costs $200, flexible rest.</p>',
   totalDollars: 700,
   buckets:[{id:'buffer',label:'Buffer (4 wks)'},{id:'costs',label:'Costs due'},{id:'flex',label:'Flexible'}],
   targets:{buffer:400, costs:200, flex:100},
   hint:'Buffer = weeks \u00d7 weekly costs.',
   good:'$400 buffer = 4 weeks of survival; $100 flexible, honestly paced.',
   bad:'An undersized buffer is a decoration.',
   why:'Size buffers in weeks of costs.'};
 }},
{id:'irregular-income-build-03', verb:'build', part:7, tier:'independent', skill:'irregular-income',
 gen:(v)=>{
  const total=900;
  return {
   h:'Build it: peak-week discipline',
   body:'<p>Split a $900 peak week: $350 costs, $300 to the buffer, $100 savings pace, flexible rest.</p>',
   totalDollars: total,
   buckets:[{id:'costs',label:'Costs'},{id:'buffer',label:'Buffer build'},{id:'savings',label:'Savings pace'},{id:'flex',label:'Flexible'}],
   targets:{costs:350, buffer:300, savings:100, flex:150},
   hint:'Peak weeks build; they do not ball.',
   good:'$300 buffer + $100 savings from one peak week \u2014 future slow weeks funded.',
   bad:'Spending the peak is borrowing from the valley.',
   why:'Peaks are for building.'};
 }},
{id:'irregular-income-build-04', verb:'build', part:7, tier:'independent', skill:'irregular-income',
 gen:(v)=>{
  const total=300;
  return {
   h:'Build it: slow-week survival',
   body:'<p>Split $300 in a slow week: $180 costs, $60 buffer draw (from savings), $60 flexible.</p>',
   totalDollars: total,
   buckets:[{id:'costs',label:'Costs'},{id:'bufferdraw',label:'Buffer covers gap'},{id:'flex',label:'Flexible'}],
   targets:{costs:180, bufferdraw:60, flex:60},
   hint:'The buffer draw is a planned job here.',
   good:'Costs covered, buffer doing its job, $60 paced tight.',
   bad:'Pretending it is a normal week burns the buffer in days.',
   why:'Slow weeks: buffer covers gaps, pacing goes tight.'};
 }},
{id:'irregular-income-build-05', verb:'build', part:7, tier:'independent', skill:'irregular-income',
 gen:(v)=>{
  const total=1000;
  return {
   h:'Build it: project-pay plan',
   body:'<p>Split $1,000 project pay: $400 costs before next project, $250 buffer, $150 savings, flexible rest.</p>',
   totalDollars: total,
   buckets:[{id:'costs',label:'Costs'},{id:'buffer',label:'Buffer'},{id:'savings',label:'Savings'},{id:'flex',label:'Flexible'}],
   targets:{costs:400, buffer:250, savings:150, flex:200},
   hint:'Unknown gap \u2014 protect generously.',
   good:'$200 flexible across the unknown gap; everything else protected.',
   bad:'Treating project pay as salary spends the gap.',
   why:'Project pay: protect, buffer, save, then pace.'};
 }},
{id:'irregular-income-explain-01', verb:'explain', part:7, tier:'independent', skill:'irregular-income',
 gen:(v)=>({
  h:'Teach it back: the irregular-income rule',
  prompt:'Explain the stricter rule for irregular income.',
  keyPoints:['Budget only cash in hand \u2014 never expected money','Protect required costs first','Hold a buffer for the gaps','Pace only what remains, recalculating every payday'],
  modelAnswer:'With irregular income you budget only money that has arrived \u2014 expected shifts count as $0. First protect required costs, then hold a buffer sized in weeks of costs for the gaps, and pace only the remainder. Recalculate every payday, because the inputs change constantly.',
  hint:'Cash in hand. Costs. Buffer. Pace.'
 })},
{id:'irregular-income-explain-02', verb:'explain', part:7, tier:'independent', skill:'irregular-income',
 gen:(v)=>({
  h:'Teach it back: pace the floor',
  prompt:'Explain why irregular earners pace the low end, not the average.',
  keyPoints:['Bad months still have full bills','Averages break in below-average months','Pacing the floor works every month','Surplus months become buffer and savings \u2014 a bonus, not the plan'],
  modelAnswer:'If you pace the average, every below-average month breaks the plan \u2014 and bills do not care about averages. Pacing the realistic floor means the plan survives every month; surplus months then build the buffer and accelerate goals as a bonus.',
  hint:'Which month must the pace survive?'
 })},
{id:'irregular-income-explain-03', verb:'explain', part:7, tier:'independent', skill:'irregular-income',
 gen:(v)=>({
  h:'Teach it back: what a buffer is',
  prompt:'Explain what a buffer is and how to size one.',
  keyPoints:['A buffer is saved money that covers cost gaps in slow periods','Size it in weeks of required costs, not dollars of vibes','It gets used, then rebuilt \u2014 it is a tool, not a trophy','It lives separate and labeled so it is not mistaken for spending money'],
  modelAnswer:'A buffer is money set aside to cover required costs during slow or $0 periods. Size it in weeks of costs \u2014 "4 weeks at $150/week = $600." It is meant to be used and then rebuilt, and it stays separate and labeled so it never looks like flexible money.',
  hint:'Measured in weeks of WHAT?'
 })},
{id:'irregular-income-explain-04', verb:'explain', part:7, tier:'independent', skill:'irregular-income',
 gen:(v)=>({
  h:'Teach it back: peak weeks',
  prompt:'Explain what to do with an unusually big earning week.',
  keyPoints:['Big weeks are for building, not celebrating','Fund costs, then the buffer, then savings pace','Only then pace a modest flexible amount','Spending the peak borrows from future slow weeks'],
  modelAnswer:'A peak week\u2019s surplus has jobs: required costs first, then buffer-building, then the savings pace. Only the remainder gets paced as flexible \u2014 modestly. Blowing the peak feels great for a week and creates the exact hole the buffer was meant to prevent.',
  hint:'Who needs the peak\u2019s money most: this week or a future slow week?'
 })},
{id:'irregular-income-explain-05', verb:'explain', part:7, tier:'independent', skill:'irregular-income',
 gen:(v)=>({
  h:'Teach it back: why expected money is $0',
  prompt:'Explain why expected income counts as $0 in the budget.',
  keyPoints:['Shifts get cancelled, gigs fall through, clients pay late','Budgeting it spends real money against phantom income','When it arrives, THEN it gets budgeted','Conservative counting is what makes the plan survive'],
  modelAnswer:'Expected money routinely fails to arrive \u2014 shifts cancel, gigs vanish, payments lag. Budgeting it means spending real dollars against phantom income, and the bills notice first. Count it at $0 until it lands; when it lands, budget it for real. Pessimistic counting is honest counting.',
  hint:'What is "expected" worth until it arrives?'
 })},
],
'semester-plan': [
{id:'semester-plan-spot-01', verb:'spot', part:6, tier:'independent', skill:'semester-plan',
 gen:(v)=>{
  const person=v.person();
  return {
   scenario:`<p>${person}\u2019s semester refund:</p><ul><li>$3,200 lands in August</li><li>"I am rich!" \u2014 spends $900 in the first two weeks</li><li>Semester: 16 weeks; needs $1,600; savings goal $400</li><li>Week 6: $400 left, 10 weeks to go</li></ul>`,
   q:'What is the mistake here?',
   choices:[
    {label:'Treated the lump as spending money \u2014 real pace was ($3,200\u2212$1,600\u2212$400)\u00f716 = $75/week', ok:true},
    {label:'The refund \u2014 $3,200 is too small for a semester', ok:false},
    {label:'Spending $900 \u2014 the amount was fine, the timing was not the issue', ok:false, mis:'close-enough-math'},
    {label:'Having needs \u2014 needs ruin refunds', ok:false, mis:'total-is-safe'}],
   hint:'Lump sums lie. What was the true weekly pace?',
   good:'$1,200 flexible \u00f7 16 = $75/week. $900 in two weeks burned twelve weeks of pace.',
   bad:'"I am rich" is the lump-sum illusion talking.',
   why:'Big money + long time = pace it, or watch it evaporate.'};
 }},
{id:'semester-plan-spot-02', verb:'spot', part:6, tier:'independent', skill:'semester-plan',
 gen:(v)=>{
  const person=v.person();
  return {
   scenario:`<p>${person}\u2019s "semester plan":</p><ul><li>$4,000 for 20 weeks</li><li>Plan: "$200/week" \u2014 paced the whole $4,000</li><li>Forgot: $2,000 tuition + $500 savings goal</li><li>Week 10: tuition due, account empty</li></ul>`,
   q:'What is the mistake here?',
   choices:[
    {label:'Paced the whole lump instead of ($4,000\u2212$2,000\u2212$500)\u00f720 = $75/week', ok:true},
    {label:'The $200/week pace \u2014 paces should be higher', ok:false, mis:'afford-more'},
    {label:'Paying tuition \u2014 tuition should come from elsewhere', ok:false, mis:'obligation-is-available'},
    {label:'20 weeks \u2014 too long to plan', ok:false, mis:'pace-doesnt-apply'}],
   hint:'Which dollars already had jobs?',
   good:'Only $1,500 was flexible: $75/week. The $200 pace spent tuition and savings by week 10.',
   bad:'Pacing the lump paces the jobs inside it.',
   why:'Protect first, pace the rest \u2014 at semester scale too.'};
 }},
{id:'semester-plan-spot-03', verb:'spot', part:6, tier:'independent', skill:'semester-plan',
 gen:(v)=>{
  const person=v.person();
  return {
   scenario:`<p>${person}\u2019s fall plan:</p><ul><li>$2,400 for 12 weeks \u2192 $200/week pace, followed perfectly</li><li>December: "The semester is over \u2014 pace me nothing"</li><li>January: $0, spring costs arrive</li></ul>`,
   q:'What is the mistake here?',
   choices:[
    {label:'No bridge plan \u2014 the pace ended with $0 for the gap between semesters', ok:true},
    {label:'The $200 pace \u2014 too low', ok:false},
    {label:'Following the pace \u2014 discipline was the problem', ok:false, mis:'no-pace-needed'},
    {label:'12 weeks \u2014 semesters should be paced monthly', ok:false, mis:'schedule-swap'}],
   hint:'What happens AFTER the last paced week?',
   good:'A semester pace that ends at $0 strands January. Rolling surplus or a bridge buffer covers the gap.',
   bad:'Perfect pacing of a plan with no ending is still a broken plan.',
   why:'Long-horizon plans include the landing, not just the flight.'};
 }},
{id:'semester-plan-spot-04', verb:'spot', part:6, tier:'independent', skill:'semester-plan',
 gen:(v)=>{
  const person=v.person();
  return {
   scenario:`<p>${person}\u2019s tax refund:</p><ul><li>$1,800 refund in March</li><li>"Free money!" \u2014 all $1,800 spent by April</li><li>May: car insurance ($600/6 months) due, $0 saved</li></ul>`,
   q:'What is the mistake here?',
   choices:[
    {label:'Treated a lump as windfall instead of pacing it across known future costs', ok:true},
    {label:'Getting a refund \u2014 refunds should be $0', ok:false},
    {label:'The $600 insurance \u2014 insurance is a scam', ok:false},
    {label:'Spending in April \u2014 March spending would have been fine', ok:false, mis:'close-enough-math'}],
   hint:'Was the May bill a surprise?',
   good:'The $600 May bill was predictable. $1,800 paced across spring covers it with room to spare.',
   bad:'"Free money" framing deletes every future job the money had.',
   why:'Lumps are future months arriving early \u2014 pace them forward, not backward.'};
 }},
{id:'semester-plan-spot-05', verb:'spot', part:6, tier:'independent', skill:'semester-plan',
 gen:(v)=>{
  const person=v.person();
  return {
   scenario:`<p>${person}\u2019s bonus plan:</p><ul><li>$5,000 bonus, 25-week project</li><li>Set pace: $200/week ($5,000 \u00f7 25)</li><li>Week 8: project extended 10 more weeks, same $5,000</li><li>Kept spending $200/week</li></ul>`,
   q:'What is the mistake here?',
   choices:[
    {label:'Never recalculated \u2014 new time (35 weeks) means $143/week', ok:true},
    {label:'The $200 pace \u2014 it was wrong from the start', ok:false, mis:'pace-math'},
    {label:'The extension \u2014 extensions should add money', ok:false},
    {label:'Nothing \u2014 paces never change', ok:false, mis:'plan-never-changes'}],
   hint:'Same money, more weeks.',
   good:'$5,000 \u00f7 35 = ~$143/week. Keeping $200/week runs dry at week 25 with 10 weeks left.',
   bad:'Time changed; the pace did not. That is the whole failure.',
   why:'New time horizon = new pace. Always recalculate.'};
 }},
{id:'semester-plan-spot-06', verb:'spot', part:6, tier:'independent', skill:'semester-plan',
 gen:(v)=>{
  const person=v.person();
  return {
   scenario:`<p>${person}\u2019s semester:</p><ul><li>Correct pace: $80/week for 15 weeks</li><li>Weeks 1\u20134: spent $80/week \u2713</li><li>Week 5: "I have been so good" \u2014 spent $400 on a trip</li><li>Weeks 6\u201315: $80/week pace on $0 remaining</li></ul>`,
   q:'What is the mistake here?',
   choices:[
    {label:'"Rewarded" discipline by breaking the pace \u2014 $400 was 5 weeks of pace', ok:true},
    {label:'The $80 pace \u2014 too strict to survive', ok:false, mis:'pace-doesnt-apply'},
    {label:'Weeks 1\u20134 \u2014 should have spent more early', ok:false, mis:'skip-spending-breaks-pace'},
    {label:'The trip \u2014 travel is never allowed on a pace', ok:false, mis:'nothing-safe'}],
   hint:'What did 4 good weeks earn?',
   good:'Four good weeks earned $0 extra \u2014 the pace is the reward (money that lasts). The $400 trip stole 5 future weeks.',
   bad:'Discipline does not bank spendable credit. The pace is the plan every week.',
   why:'Good weeks do not create bonus weeks. The pace holds until the horizon ends.'};
 }},
{id:'semester-plan-compare-01', verb:'compare', part:6, tier:'independent', skill:'semester-plan',
 gen:(v)=>{
  return {
   context:'<p><b>Plan A:</b> $3,200 refund \u2192 protect $2,000 needs+savings \u2192 pace $1,200 \u00f7 16 = $75/week.</p><p><b>Plan B:</b> $3,200 refund \u2192 "spend carefully" with no weekly number.</p>',
   q:'Which plan reaches week 16?',
   choices:[
    {label:'Plan A \u2014 $75/week is a checkable limit', ok:true},
    {label:'Plan B \u2014 careful is enough over 16 weeks', ok:false, mis:'no-pace-needed'},
    {label:'Tie \u2014 same $3,200', ok:false, mis:'total-is-safe'},
    {label:'Plan B \u2014 freedom beats math', ok:false}],
   hint:'Which plan has a number to check?',
   good:'Plan A survives because $75/week is measurable. Plan B\u2019s "careful" evaporates by week 6.',
   bad:'Sixteen weeks of "careful" is sixteen weeks of drift.',
   why:'Long horizons need numbers, not intentions.'};
 }},
{id:'semester-plan-compare-02', verb:'compare', part:6, tier:'independent', skill:'semester-plan',
 gen:(v)=>{
  return {
   context:'<p><b>Monthly pacing:</b> $1,200 flexible \u00f7 4 months = $300/month.</p><p><b>Weekly pacing:</b> $1,200 flexible \u00f7 16 weeks = $75/week.</p>',
   q:'Which is better for a semester?',
   choices:[
    {label:'Weekly \u2014 tighter feedback catches drift 4x faster', ok:true},
    {label:'Monthly \u2014 fewer numbers to track', ok:false, mis:'close-enough-math'},
    {label:'Tie \u2014 same total', ok:false},
    {label:'Monthly \u2014 weeks are too short to matter', ok:false, mis:'schedule-swap'}],
   hint:'How fast do you find out you overspent?',
   good:'A blown week shows up in 7 days; a blown month hides for 30. Weekly wins on feedback speed.',
   bad:'Same total, different control. Shorter periods = faster corrections.',
   why:'Pace at the shortest period you will actually check.'};
 }},
{id:'semester-plan-compare-03', verb:'compare', part:6, tier:'independent', skill:'semester-plan',
 gen:(v)=>{
  return {
   context:'<p><b>Sam:</b> $2,000 for 10 weeks, paces $200/week, recalculates after over weeks.</p><p><b>Alex:</b> $2,000 for 10 weeks, spends $400 in week 1 "to get it over with."</p>',
   q:'Who finishes the 10 weeks?',
   choices:[
    {label:'Sam \u2014 paced and self-repairing', ok:true},
    {label:'Alex \u2014 front-loading is efficient', ok:false, mis:'add-week-to-lump'},
    {label:'Tie \u2014 both had $2,000', ok:false, mis:'total-is-safe'},
    {label:'Alex \u2014 getting spending done early is disciplined', ok:false}],
   hint:'Week 1: $400 gone. Weeks 2\u201310: ?',
   good:'Alex\u2019s week 1 ate two weeks of pace. Sam\u2019s worst week gets recalculated, not repeated.',
   bad:'Front-loading is not efficiency \u2014 it is borrowing from your future self.',
   why:'Pace + repair beats splurge + hope.'};
 }},
{id:'semester-plan-compare-04', verb:'compare', part:6, tier:'independent', skill:'semester-plan',
 gen:(v)=>{
  return {
   context:'<p><b>Plan X:</b> $4,800 \u00f7 24 weeks = $200/week, needs protected first.</p><p><b>Plan Y:</b> $4,800 \u00f7 24 weeks = $200/week, needs NOT protected.</p>',
   q:'What is the real difference?',
   choices:[
    {label:'Plan X\u2019s $200 is truly flexible; Plan Y\u2019s $200 secretly includes rent', ok:true},
    {label:'No difference \u2014 same math', ok:false, mis:'pace-math'},
    {label:'Plan Y is better \u2014 simpler', ok:false, mis:'total-is-safe'},
    {label:'Plan X is worse \u2014 protecting needs lowers the pace', ok:false, mis:'afford-more'}],
   hint:'Whose rent is inside the $200?',
   good:'Identical division, opposite honesty. Plan Y\u2019s pace spends the rent by mid-semester.',
   bad:'The formula is only half the system \u2014 protection is the other half.',
   why:'Pace math without protection is just organized overspending.'};
 }},
{id:'semester-plan-compare-05', verb:'compare', part:6, tier:'independent', skill:'semester-plan',
 gen:(v)=>{
  return {
   context:'<p><b>Rae:</b> Semester pace $75/week, checks every Sunday.</p><p><b>Lee:</b> Semester pace $75/week, never checks \u2014 "set it and forget it."</p>',
   q:'Whose pace survives 16 weeks?',
   choices:[
    {label:'Rae \u2014 16 weekly checks catch 16 weeks of drift', ok:true},
    {label:'Lee \u2014 set-and-forget is the dream', ok:false, mis:'no-pace-needed'},
    {label:'Tie \u2014 same pace', ok:false},
    {label:'Lee \u2014 checking creates anxiety', ok:false}],
   hint:'What happens in week 3 when Lee overspends?',
   good:'Rae catches a $95 week on Sunday and tightens. Lee discovers it in week 12.',
   bad:'"Set and forget" works for thermostats, not spending.',
   why:'Long horizons need long attention. Check weekly.'};
 }},
{id:'semester-plan-compare-06', verb:'compare', part:6, tier:'independent', skill:'semester-plan',
 gen:(v)=>{
  return {
   context:'<p><b>Option 1:</b> $6,000 signing bonus paced over 12 months ($500/month after protecting $0 needs).</p><p><b>Option 2:</b> $6,000 signing bonus spent in 3 months, then "figure it out."</p>',
   q:'Which treats the bonus as what it is?',
   choices:[
    {label:'Option 1 \u2014 12 months of money, paced as 12 months', ok:true},
    {label:'Option 2 \u2014 bonuses are for spending fast', ok:false, mis:'job-money-extra'},
    {label:'Tie \u2014 it is bonus money either way', ok:false, mis:'total-is-safe'},
    {label:'Option 2 \u2014 3 months of fun beats 12 months of math', ok:false}],
   hint:'How many months must the bonus cover?',
   good:'A 12-month bonus is a year of paced money, not a quarter of splurging.',
   bad:'"Bonus" framing turns a year of security into a season of regret.',
   why:'Lumps are time in disguise. Pace the time.'};
 }},
{id:'semester-plan-decide-01', verb:'decide', part:7, tier:'independent', skill:'semester-plan',
 gen:(v)=>{
  const person=v.person();
  return {
   q:`${person} gets a $3,600 semester refund. Needs for 18 weeks: $1,800. Savings goal: $360. What is the call?`,
   choices:[
    {label:'Protect $2,160, pace $1,440 \u00f7 18 = $80/week', ok:true},
    {label:'Pace the whole $3,600 \u00f7 18 = $200/week', ok:false, mis:'total-is-safe'},
    {label:'Spend $1,000 now, pace the rest "later"', ok:false, mis:'add-week-to-lump'},
    {label:'Skip the savings goal \u2014 refunds are for spending', ok:false, mis:'savings-doesnt-touch-spending'}],
   hint:'(Lump \u2212 needs \u2212 savings) \u00f7 periods.',
   good:'$3,600 \u2212 $1,800 \u2212 $360 = $1,440 \u00f7 18 = $80/week. Protected and paced.',
   bad:'$200/week spends tuition and the goal by mid-semester.',
   why:'The semester formula: (lump \u2212 needs \u2212 savings) \u00f7 periods.'};
 }},
{id:'semester-plan-decide-02', verb:'decide', part:7, tier:'independent', skill:'semester-plan',
 gen:(v)=>{
  const person=v.person();
  return {
   q:`${person} is 8 weeks into a 16-week $75/week pace and gets a $400 surprise bill. What is the call?`,
   choices:[
    {label:'Absorb it: remaining pool minus $400, recalculate over 8 weeks', ok:true},
    {label:'Ignore it and keep $75/week \u2014 the pace is set', ok:false, mis:'plan-never-changes'},
    {label:'Pay it from savings and keep the pace', ok:false, mis:'savings-doesnt-touch-spending'},
    {label:'Abandon the pace \u2014 surprises prove pacing is useless', ok:false, mis:'pace-doesnt-apply'}],
   hint:'The pool shrank. What must the pace do?',
   good:'New remaining \u00f7 8 weeks = the honest new pace. Surprises get absorbed, not ignored.',
   bad:'A fixed pace on a shrunk pool runs dry early.',
   why:'Mid-plan shocks trigger recalculation \u2014 same formula, new numbers.'};
 }},
{id:'semester-plan-decide-03', verb:'decide', part:7, tier:'independent', skill:'semester-plan',
 gen:(v)=>{
  const person=v.person();
  return {
   q:`${person}\u2019s semester pace is $80/week. A friend\u2019s road trip costs $240 \u2014 three weeks of pace. What is the call?`,
   choices:[
    {label:'Go only if 3 lean weeks ($0\u2013$20) before/after can fund it \u2014 otherwise skip', ok:true},
    {label:'Go \u2014 $240 is just money', ok:false, mis:'skip-spending-breaks-pace'},
    {label:'Go and put it on credit \u2014 the pace stays clean', ok:false},
    {label:'Skip all trips forever \u2014 paces forbid fun', ok:false, mis:'nothing-safe'}],
   hint:'$240 = 3 weeks of pace. Where do those weeks come from?',
   good:'Big wants get funded by planned lean weeks \u2014 the pace bends deliberately, then holds.',
   bad:'Unfunded big spends break the semester; credit just moves the break.',
   why:'The pace can flex for big wants \u2014 if the flex is planned and paid for.'};
 }},
{id:'semester-plan-decide-04', verb:'decide', part:7, tier:'independent', skill:'semester-plan',
 gen:(v)=>{
  const person=v.person();
  return {
   q:`${person} has $600 left with 4 weeks of semester to go (pace was $75/week = $300 needed). What is the call?`,
   choices:[
    {label:'Bank the $300 surplus as next semester\u2019s bridge, pace $75/week', ok:true},
    {label:'Double spending \u2014 $150/week, "I earned it"', ok:false, mis:'afford-more'},
    {label:'Spend all $600 now \u2014 semester is almost over', ok:false, mis:'add-week-to-lump'},
    {label:'Keep pacing $75 and ignore the surplus', ok:false, mis:'keep-separate'}],
   hint:'$600 \u2212 $300 needed = $300 surplus. What is its best job?',
   good:'The surplus becomes the bridge to next semester \u2014 the landing the plan was missing.',
   bad:'End-of-horizon splurging wastes the exact cushion next term needs.',
   why:'Surplus at the end is seed money for the next beginning.'};
 }},
{id:'semester-plan-decide-05', verb:'decide', part:7, tier:'independent', skill:'semester-plan',
 gen:(v)=>{
  const person=v.person();
  return {
   q:`${person} lands a $2,000 grant for next semester (20 weeks). Needs will be $1,200, savings goal $200. What is the call?`,
   choices:[
    {label:'Plan now: ($2,000\u2212$1,200\u2212$200)\u00f720 = $30/week starting day one', ok:true},
    {label:'Wait until it arrives to think about it', ok:false, mis:'plan-never-changes'},
    {label:'Pace $100/week \u2014 $2,000 \u00f7 20', ok:false, mis:'total-is-safe'},
    {label:'Spend $500 on arrival, then pace the rest', ok:false, mis:'add-week-to-lump'}],
   hint:'Plan BEFORE it lands.',
   good:'$600 flexible \u00f7 20 = $30/week, decided before the money can feel like a windfall.',
   bad:'Unplanned arrivals get spent at arrival-speed.',
   why:'Decide the pace before the lump lands \u2014 pre-commitment beats willpower.'};
 }},
{id:'semester-plan-decide-06', verb:'decide', part:7, tier:'independent', skill:'semester-plan',
 gen:(v)=>{
  const person=v.person();
  return {
   q:`${person}\u2019s 16-week pace assumed no income, but a $120/week campus job starts in week 5. What is the call?`,
   choices:[
    {label:'Recalculate: add expected income cautiously, raise the pace modestly, bank the rest', ok:true},
    {label:'Keep the old pace and spend all $120/week extra', ok:false, mis:'afford-more'},
    {label:'Quit the pace \u2014 income means pacing is over', ok:false, mis:'no-pace-needed'},
    {label:'Count all future job pay as arrived today', ok:false, mis:'add-week-to-lump'}],
   hint:'New income, same formula \u2014 but only count what arrives.',
   good:'Each paycheck recalculates the pace upward a little; the surplus builds savings. Cautious, not celebratory.',
   bad:'Spending unarrived pay repeats the oldest mistake in the book.',
   why:'New income recalculates the pace \u2014 conservatively, as it arrives.'};
 }},
{id:'semester-plan-decide-07', verb:'decide', part:7, tier:'independent', skill:'semester-plan',
 gen:(v)=>{
  const person=v.person();
  return {
   q:`${person} is offered: $1,000 now OR $90/month for 12 months ($1,080 total). For a student pacing a year, what is the call?`,
   choices:[
    {label:'Take the $90/month \u2014 paced income beats a lump that begs to be spent', ok:true},
    {label:'Take the $1,000 \u2014 bigger number now', ok:false, mis:'total-is-safe'},
    {label:'Take the $1,000 and pace it perfectly \u2014 easy', ok:false, mis:'no-pace-needed'},
    {label:'Take neither \u2014 decisions are stressful', ok:false}],
   hint:'Which option does the pacing FOR you?',
   good:'$90/month is pre-paced income \u2014 $1,080 total AND no lump-sum temptation. Structure beats willpower.',
   bad:'"I will pace it perfectly" is the lump-sum illusion talking.',
   why:'When given the choice, pick the structure that paces itself.'};
 }},
{id:'semester-plan-decide-08', verb:'decide', part:7, tier:'independent', skill:'semester-plan',
 gen:(v)=>{
  const person=v.person();
  return {
   q:`${person}\u2019s semester ends with the pace intact but $0 saved beyond the goal. A summer job offers $3,000 over 10 weeks. What is the call?`,
   choices:[
    {label:'Pace the summer too \u2014 ($3,000\u2212needs\u2212bigger savings)\u00f710, and build the fall bridge', ok:true},
    {label:'Summer is for spending \u2014 no pace needed', ok:false, mis:'pace-doesnt-apply'},
    {label:'Save all $3,000 \u2014 summers are for suffering', ok:false, mis:'nothing-safe'},
    {label:'Spend it all \u2014 fall will provide', ok:false, mis:'add-week-to-lump'}],
   hint:'Summer is just another horizon.',
   good:'Summer gets the same formula with a heavier savings weight \u2014 funding fall\u2019s bridge.',
   bad:'"Summer doesn\u2019t count" is how fall starts at $0.',
   why:'Every horizon gets paced. Summers build bridges.'};
 }},
{id:'semester-plan-sort-01', verb:'sort', part:7, tier:'independent', skill:'semester-plan',
 gen:(v)=>({
  h:'Sort it: subtract first or pace across?',
  body:'<p>$3,200 semester refund, 16 weeks. Sort each item.</p>',
  buckets:['Subtract first','Pace across weeks'],
  items:[
   {label:'$1,600 semester needs', a:'subtract first', why:'Jobs come off the lump.'},
   {label:'$400 savings goal', a:'subtract first', why:'Protected before pacing.'},
   {label:'Weekly groceries', a:'pace across weeks', why:'Flexible, paced spending.'},
   {label:'Tuition installment due', a:'subtract first', why:'Dated obligation.'},
   {label:'Weekend fun money', a:'pace across weeks', why:'Paced wants.'},
   {label:'Emergency fund contribution', a:'subtract first', why:'Savings is protected.'},
   {label:'Daily coffee', a:'pace across weeks', why:'Small, paced.'},
   {label:'Textbook purchase', a:'subtract first', why:'Known dated cost.'}]
 })},
{id:'semester-plan-sort-02', verb:'sort', part:7, tier:'independent', skill:'semester-plan',
 gen:(v)=>({
  h:'Sort it: plan input or plan output?',
  body:'<p>Sort each piece of the semester formula.</p>',
  buckets:['Input','Output'],
  items:[
   {label:'Lump sum amount', a:'input', why:'Goes into the formula.'},
   {label:'Needs total', a:'input', why:'Subtracted.'},
   {label:'Savings goal', a:'input', why:'Subtracted.'},
   {label:'Number of periods', a:'input', why:'Divided by.'},
   {label:'Pace per period', a:'output', why:'The result.'},
   {label:'Flexible total', a:'output', why:'Lump minus jobs.'},
   {label:'Known future bill', a:'input', why:'A job to subtract.'},
   {label:'Weekly spending limit', a:'output', why:'The pace itself.'}]
 })},
{id:'semester-plan-sort-03', verb:'sort', part:7, tier:'independent', skill:'semester-plan',
 gen:(v)=>({
  h:'Sort it: recalculate or hold steady?',
  body:'<p>Sort each event by whether the semester pace must be recalculated.</p>',
  buckets:['Recalculate','Hold steady'],
  items:[
   {label:'Surprise $400 bill', a:'recalculate', why:'Pool shrank.'},
   {label:'Normal $75 week', a:'hold steady', why:'The plan working.'},
   {label:'Semester extended 4 weeks', a:'recalculate', why:'Time changed.'},
   {label:'Campus job starts', a:'recalculate', why:'Income changed.'},
   {label:'Found $5 on the street', a:'hold steady', why:'Too small to matter.'},
   {label:'Tuition rises $200', a:'recalculate', why:'A job grew.'},
   {label:'Skipped a want, $30 under pace', a:'hold steady', why:'Under is fine.'},
   {label:'Refund arrives $500 larger than planned', a:'recalculate', why:'Lump changed.'}]
 })},
{id:'semester-plan-sort-04', verb:'sort', part:7, tier:'independent', skill:'semester-plan',
 gen:(v)=>({
  h:'Sort it: semester-smart or semester-risky?',
  body:'<p>Sort each habit for long-horizon money.</p>',
  buckets:['Smart','Risky'],
  items:[
   {label:'Weekly pace check every Sunday', a:'smart', why:'Catches drift early.'},
   {label:'"I will be careful" for 16 weeks', a:'risky', why:'No number, no control.'},
   {label:'Bridge fund for the gap after finals', a:'smart', why:'Plans the landing.'},
   {label:'Front-loading fun in week 1', a:'risky', why:'Borrows from 15 weeks.'},
   {label:'Recalculating after shocks', a:'smart', why:'Honest math.'},
   {label:'Keeping the lump in checking, unlabeled', a:'risky', why:'Looks spendable.'},
   {label:'Pre-committing the pace before arrival', a:'smart', why:'Beats the windfall feeling.'},
   {label:'Rewarding good weeks with splurges', a:'risky', why:'Steals future weeks.'}]
 })},
{id:'semester-plan-sort-05', verb:'sort', part:7, tier:'independent', skill:'semester-plan',
 gen:(v)=>({
  h:'Sort it: this horizon or next horizon?',
  body:'<p>Sort each dollar by which time period it belongs to.</p>',
  buckets:['This semester','Next semester'],
  items:[
   {label:'Fall tuition', a:'this semester', why:'Due now.'},
   {label:'Spring tuition pre-save', a:'next semester', why:'Future job.'},
   {label:'This week\u2019s groceries', a:'this semester', why:'Current pace.'},
   {label:'Bridge fund for January', a:'next semester', why:'The gap belongs to next.'},
   {label:'Fall textbook goal', a:'this semester', why:'Current goal.'},
   {label:'Summer earnings for fall', a:'next semester', why:'Future funding.'},
   {label:'October rent', a:'this semester', why:'Current obligation.'},
   {label:'Next year\u2019s emergency fund', a:'next semester', why:'Future safety.'}]
 })},
{id:'semester-plan-sort-06', verb:'sort', part:7, tier:'independent', skill:'semester-plan',
 gen:(v)=>({
  h:'Sort it: lump thinking or horizon thinking?',
  body:'<p>Sort each thought about a $5,000 bonus.</p>',
  buckets:['Lump thinking','Horizon thinking'],
  items:[
   {label:'"I am rich!"', a:'lump thinking', why:'Sees the pile.'},
   {label:'"That is 25 weeks at $200"', a:'horizon thinking', why:'Sees the time.'},
   {label:'"Bonuses are for splurging"', a:'lump thinking', why:'Windfall framing.'},
   {label:'"Protect needs, then pace the rest"', a:'horizon thinking', why:'The formula.'},
   {label:'"Spend it before it feels normal"', a:'lump thinking', why:'Urgency illusion.'},
   {label:'"What does month 11 need?"', a:'horizon thinking', why:'Thinks forward.'},
   {label:'"The balance looks amazing"', a:'lump thinking', why:'Balance-watching.'},
   {label:'"Recalculate if the timeline changes"', a:'horizon thinking', why:'Adaptive.'}]
 })},
{id:'semester-plan-build-01', verb:'build', part:7, tier:'independent', skill:'semester-plan',
 gen:(v)=>{
  const total=3200;
  return {
   h:'Build it: semester refund split',
   body:'<p>Split the $3,200 refund: $1,600 needs, $400 savings, $200 bridge fund, and pace the flexible rest across 16 weeks ($100/week).</p>',
   totalDollars: total,
   buckets:[{id:'needs',label:'Needs'},{id:'savings',label:'Savings'},{id:'bridge',label:'Bridge fund'},{id:'flex',label:'Flexible ($100/wk)'}],
   targets:{needs:1600, savings:400, bridge:200, flex:1000},
   hint:'(3200 \u2212 1600 \u2212 400 \u2212 200) \u00f7 16.',
   good:'$100/week pace with needs, savings, and the bridge protected.',
   bad:'Skipping the bridge strands January.',
   why:'The full semester split: protect, save, bridge, pace.'};
 }},
{id:'semester-plan-build-02', verb:'build', part:7, tier:'independent', skill:'semester-plan',
 gen:(v)=>{
  const total=4800;
  return {
   h:'Build it: signing bonus year',
   body:'<p>Split a $4,800 bonus: $2,400 needs for the year, $1,200 savings, flexible rest paced monthly ($100/month).</p>',
   totalDollars: total,
   buckets:[{id:'needs',label:'Needs'},{id:'savings',label:'Savings'},{id:'flex',label:'Flexible ($100/mo)'}],
   targets:{needs:2400, savings:1200, flex:1200},
   hint:'(4800 \u2212 2400 \u2212 1200) \u00f7 12.',
   good:'$100/month for 12 months, needs and savings safe.',
   bad:'Monthly pacing still needs the protection step.',
   why:'Year-scale pacing: same formula, bigger window.'};
 }},
{id:'semester-plan-build-03', verb:'build', part:7, tier:'independent', skill:'semester-plan',
 gen:(v)=>{
  const total=2000;
  return {
   h:'Build it: grant split',
   body:'<p>Split a $2,000 grant: $1,200 needs, $200 savings goal, flexible rest ($30/week \u00d7 20 weeks).</p>',
   totalDollars: total,
   buckets:[{id:'needs',label:'Needs'},{id:'savings',label:'Savings'},{id:'flex',label:'Flexible ($30/wk)'}],
   targets:{needs:1200, savings:200, flex:600},
   hint:'(2000 \u2212 1200 \u2212 200) \u00f7 20.',
   good:'$30/week for 20 weeks, decided before the grant feels like a windfall.',
   bad:'Unplanned grants get spent at arrival-speed.',
   why:'Pre-commit the split before the lump lands.'};
 }},
{id:'semester-plan-build-04', verb:'build', part:7, tier:'independent', skill:'semester-plan',
 gen:(v)=>{
  const total=1500;
  return {
   h:'Build it: summer job horizon',
   body:'<p>Split $1,500 summer earnings: $600 fall bridge, $300 savings, flexible rest for 10 weeks ($60/week).</p>',
   totalDollars: total,
   buckets:[{id:'bridge',label:'Fall bridge'},{id:'savings',label:'Savings'},{id:'flex',label:'Flexible ($60/wk)'}],
   targets:{bridge:600, savings:300, flex:600},
   hint:'Summer funds fall. Protect the bridge first.',
   good:'$600 waiting for fall, $60/week summer pace.',
   bad:'A bridgeless summer strands September.',
   why:'Earn in one horizon, protect the next.'};
 }},
{id:'semester-plan-build-05', verb:'build', part:7, tier:'independent', skill:'semester-plan',
 gen:(v)=>{
  const total=5400;
  return {
   h:'Build it: tax refund year',
   body:'<p>Split a $5,400 refund: $3,000 known yearly costs, $1,200 emergency fund, flexible rest ($100/month \u00d7 12).</p>',
   totalDollars: total,
   buckets:[{id:'costs',label:'Yearly costs'},{id:'emergency',label:'Emergency fund'},{id:'flex',label:'Flexible ($100/mo)'}],
   targets:{costs:3000, emergency:1200, flex:1200},
   hint:'(5400 \u2212 3000 \u2212 1200) \u00f7 12.',
   good:'Yearly costs and emergency fund protected; $100/month paced.',
   bad:'Refunds feel like windfalls \u2014 the formula says otherwise.',
   why:'Lump \u2212 jobs, paced across the horizon it must cover.'};
 }},
{id:'semester-plan-choice-01', verb:'choice', part:8, tier:'stretch', skill:'semester-plan',
 gen:(v)=>{
  const lump=4800, needs=2400, sav=720, wks=24;
  const pace=(lump-needs-sav)/wks;
  return {
   q:`$${lump} fellowship for ${wks} weeks. Needs: $${needs}. Savings goal: $${sav}. What is the weekly pace?`,
   choices:[
    {label:v.money(pace)+'/week', ok:true},
    {label:v.money(lump/wks)+'/week \u2014 pace the whole fellowship', ok:false, mis:'total-is-safe'},
    {label:v.money((lump-needs)/wks)+'/week \u2014 skip the savings', ok:false, mis:'savings-doesnt-touch-spending'},
    {label:v.money(pace*2)+'/week \u2014 fellowships deserve more', ok:false, mis:'afford-more'}],
   hint:'(Lump \u2212 needs \u2212 savings) \u00f7 weeks.',
   good:`$${lump} \u2212 $${needs} \u2212 $${sav} = $${lump-needs-sav} \u00f7 ${wks} = ${v.money(pace)}/week.`,
   bad:'Fellowship framing does not exempt the protection step.',
   why:'Novel lump, same formula.'};
 }},
{id:'semester-plan-choice-02', verb:'choice', part:8, tier:'stretch', skill:'semester-plan',
 gen:(v)=>{
  const lump=5400, costs=3000, sav=1200, mo=12;
  const pace=(lump-costs-sav)/mo;
  return {
   q:`$${lump} tax refund. Known yearly costs: $${costs}. Emergency fund goal: $${sav}. Monthly pace?`,
   choices:[
    {label:v.money(pace)+'/month', ok:true},
    {label:v.money(lump/mo)+'/month', ok:false, mis:'total-is-safe'},
    {label:v.money((lump-costs)/mo)+'/month \u2014 skip the emergency fund', ok:false, mis:'protect-first'},
    {label:v.money(pace/2)+'/month \u2014 half pace is safer', ok:false, mis:'close-enough-math'}],
   hint:'Yearly horizon, monthly periods.',
   good:`$${lump-costs-sav} flexible \u00f7 ${mo} = ${v.money(pace)}/month.`,
   bad:'Halving the pace without reason just strands money purposelessly.',
   why:'Match the period to the horizon: months for a year.'};
 }},
{id:'semester-plan-choice-03', verb:'choice', part:8, tier:'stretch', skill:'semester-plan',
 gen:(v)=>{
  const lump=10000, needs=6000, sav=1500, mo=20;
  const pace=(lump-needs-sav)/mo;
  return {
   q:`$${lump} relocation stipend must cover ${mo} months. Needs: $${needs}. Savings: $${sav}. Monthly pace?`,
   choices:[
    {label:v.money(pace)+'/month', ok:true},
    {label:v.money(lump/mo)+'/month', ok:false, mis:'total-is-safe'},
    {label:v.money((lump-needs)/mo)+'/month', ok:false, mis:'savings-doesnt-touch-spending'},
    {label:'$0/month \u2014 stipends are for spending fast', ok:false, mis:'job-money-extra'}],
   hint:'(10000 \u2212 6000 \u2212 1500) \u00f7 20.',
   good:`$2,500 \u00f7 20 = ${v.money(pace)}/month for 20 months.`,
   bad:'"Stipend" is just a word. The math does not care what the lump is called.',
   why:'Every lump gets the same three-step treatment.'};
 }},
{id:'semester-plan-choice-04', verb:'choice', part:8, tier:'stretch', skill:'semester-plan',
 gen:(v)=>{
  const lump=3600, wks=18;
  const pace=lump/wks;
  return {
   q:`$${lump} for ${wks} weeks, zero needs (living at home), zero savings goal yet. What is the pace \u2014 and what is missing?`,
   choices:[
    {label:v.money(pace)+'/week \u2014 but a savings goal should be set before pacing', ok:true},
    {label:v.money(pace)+'/week \u2014 nothing missing, perfect', ok:false, mis:'protect-first'},
    {label:v.money(lump)+'/week', ok:false, mis:'pace-math'},
    {label:'No pace needed \u2014 zero needs means zero planning', ok:false, mis:'no-pace-needed'}],
   hint:'Zero needs is rare. What should be created?',
   good:`${v.money(pace)}/week is the math \u2014 but with no savings goal, the "flexible" total is suspiciously large. Set a goal first.`,
   bad:'No needs does not mean no jobs. Unassigned money needs assignment.',
   why:'Zero-job lumps are where savings goals get born.'};
 }},
{id:'semester-plan-choice-05', verb:'choice', part:8, tier:'stretch', skill:'semester-plan',
 gen:(v)=>{
  const lump=7200, needs=3600, sav=1200, wks=36;
  const pace=(lump-needs-sav)/wks;
  return {
   q:`$${lump} covers ${wks} weeks. Needs $${needs}, savings $${sav}. At week 12, $800 of unexpected costs hit. What is the new pace?`,
   choices:[
    {label:'Remaining pool minus $800, \u00f7 24 weeks', ok:true},
    {label:v.money(pace)+'/week \u2014 the pace never changes', ok:false, mis:'plan-never-changes'},
    {label:'$0/week \u2014 one shock ends the plan', ok:false, mis:'pace-doesnt-apply'},
    {label:'Double the pace to recover faster', ok:false, mis:'close-enough-math'}],
   hint:'New reality: pool \u2212 $800, time = 24 weeks left.',
   good:'Original pace was '+v.money(pace)+'/week. After the shock: (remaining \u2212 $800) \u00f7 24 = the honest new pace.',
   bad:'Holding a dead pace guarantees running dry.',
   why:'Shocks recalculate. The formula survives; the numbers update.'};
 }},
{id:'semester-plan-choice-06', verb:'choice', part:8, tier:'stretch', skill:'semester-plan',
 gen:(v)=>{
  const a=2400, b=1800;
  return {
   q:`Two offers: $${a} now, or $${b} now plus $60/month for 12 months ($${b+720} total). For someone who struggles with lump sums, which is better?`,
   choices:[
    {label:`The $${b} + $60/month \u2014 pre-paced income removes the lump-sum risk`, ok:true},
    {label:`The $${a} \u2014 $${a} is less than $${b+720}, so it is worse... wait, $${a} > $${b+720}`, ok:false},
    {label:`The $${a} \u2014 lump sums are always better`, ok:false, mis:'total-is-safe'},
    {label:'Neither \u2014 choices are traps', ok:false}],
   hint:'$2,400 vs $2,520 total \u2014 and which is easier to pace?',
   good:`$${b+720} total AND pre-paced. More money with less temptation \u2014 the rare double win.`,
   bad:'Bigger-now is not better when pacing is the weakness.',
   why:'Structure has value. Pre-paced income beats raw lumps for pacers.'};
 }},
{id:'semester-plan-choice-07', verb:'choice', part:8, tier:'stretch', skill:'semester-plan',
 gen:(v)=>{
  const lump=6000, mo=15;
  const pace=lump/mo;
  return {
   q:`$${lump} inheritance must last ${mo} months. No debts, no goals yet. What is the FIRST move?`,
   choices:[
    {label:'Assign jobs: emergency fund + goals, THEN pace the remainder at '+v.money(pace)+'/month or less', ok:true},
    {label:'Pace the full '+v.money(pace)+'/month immediately \u2014 no jobs needed', ok:false, mis:'protect-first'},
    {label:'Spend $2,000 celebrating, then pace the rest', ok:false, mis:'add-week-to-lump'},
    {label:'Give it all away \u2014 inheritances are cursed', ok:false}],
   hint:'Unassigned money gets assigned \u2014 by you or by impulse.',
   good:'Inheritances need job assignment first: emergency fund, goals, then a modest pace on the rest.',
   bad:'Pacing $400/month of unassigned money just rations the impulse.',
   why:'Windfalls get jobs before paces. Assignment before division.'};
 }},
{id:'semester-plan-choice-08', verb:'choice', part:8, tier:'stretch', skill:'semester-plan',
 gen:(v)=>{
  const lump=4500, needs=2700, sav=900, wks=30;
  const pace=(lump-needs-sav)/wks;
  return {
   q:`$${lump} for ${wks} weeks: needs $${needs}, savings $${sav}. Computed pace: ${v.money(pace)}/week. Which check proves it?`,
   choices:[
    {label:v.money(pace)+' \u00d7 '+wks+' = $'+Math.round(pace*wks)+' flexible; + jobs = $'+lump+' \u2713', ok:true},
    {label:'It feels right \u2014 trust the feeling', ok:false, mis:'close-enough-math'},
    {label:v.money(pace)+' \u00d7 52 = annual pace \u2014 that is the check', ok:false, mis:'pace-math'},
    {label:'No check needed \u2014 division is always right', ok:false}],
   hint:'Multiply back. Does it reconstruct the lump?',
   good:v.money(pace)+' \u00d7 '+wks+' = $'+Math.round(pace*wks)+'; plus $'+needs+' + $'+sav+' = $'+lump+'. The math closes.',
   bad:'"Feels right" is not verification. Multiply back \u2014 always.',
   why:'Verify paces by reconstructing the total. Math that closes is math you can trust.'};
 }},
{id:'semester-plan-predict-01', verb:'predict', part:8, tier:'stretch', skill:'semester-plan',
 gen:(v)=>{
  const person=v.person();
  return {
   q:`${person} inherits $8,000 at 19 with no plan and no jobs assigned. What does year one usually look like?`,
   choices:[
    {label:'Gone \u2014 unassigned lumps get spent at arrival-speed', ok:true},
    {label:'Doubled \u2014 inheritances grow on their own', ok:false, mis:'savings-compounds'},
    {label:'Saved \u2014 young people naturally preserve windfalls', ok:false},
    {label:'Paced \u2014 lumps pace themselves', ok:false, mis:'no-pace-needed'}],
   hint:'What happens to money with no jobs?',
   good:'No jobs + no pace = the money assigns itself to whatever shows up first. Usually gone in a year.',
   bad:'Money does not pace or preserve itself.',
   why:'Unassigned lumps are the fastest-spent money there is.'};
 }},
{id:'semester-plan-predict-02', verb:'predict', part:8, tier:'stretch', skill:'semester-plan',
 gen:(v)=>{
  const person=v.person();
  return {
   q:`${person} paces a $6,000 bonus over 12 months perfectly, then gets a second $6,000 bonus. What is the likely outcome?`,
   choices:[
    {label:'Another paced year \u2014 the system repeats', ok:true},
    {label:'A splurge \u2014 second bonuses do not count', ok:false, mis:'job-money-extra'},
    {label:'Confusion \u2014 systems only work once', ok:false},
    {label:'Doubled spending \u2014 success earns lifestyle', ok:false, mis:'afford-more'}],
   hint:'What did the first bonus prove?',
   good:'The first year proved the system. The second bonus runs the same playbook \u2014 protect, pace, repeat.',
   bad:'"Second one is free" is the windfall trap with a new costume.',
   why:'Systems repeat. That is what makes them systems.'};
 }},
{id:'semester-plan-predict-03', verb:'predict', part:8, tier:'stretch', skill:'semester-plan',
 gen:(v)=>{
  const person=v.person();
  return {
   q:`${person} uses semester pacing for 4 years of college on refunds, grants, and summer jobs. What is ${person} at graduation?`,
   choices:[
    {label:'In control \u2014 4 years of paced horizons compound into financial calm', ok:true},
    {label:'Rich \u2014 pacing creates money', ok:false, mis:'savings-compounds'},
    {label:'The same \u2014 pacing changes nothing long-term', ok:false, mis:'no-pace-needed'},
    {label:'Burned out \u2014 4 years of math is unsustainable', ok:false}],
   hint:'What does 4 years of practice build?',
   good:'Four years of protect-pace-recalculate becomes instinct. Graduation with habits beats graduation with hacks.',
   bad:'Pacing does not create money \u2014 it creates the person who keeps it.',
   why:'Horizons stack. The skill compounds even when the money does not.'};
 }},
{id:'semester-plan-predict-04', verb:'predict', part:8, tier:'stretch', skill:'semester-plan',
 gen:(v)=>{
  const person=v.person();
  return {
   q:`${person} teaches a younger sibling the semester formula with real numbers. What happens to ${person}\u2019s own pacing?`,
   choices:[
    {label:'It strengthens \u2014 teaching locks in the habit', ok:true},
    {label:'It weakens \u2014 teaching spends the knowledge', ok:false},
    {label:'Nothing \u2014 teaching does not affect habits', ok:false},
    {label:'It becomes rigid \u2014 teachers cannot adapt', ok:false, mis:'plan-never-changes'}],
   hint:'What does explaining require you to do?',
   good:'Teaching forces clarity \u2014 and you cannot teach a pace you are breaking without noticing.',
   bad:'Knowledge is not a consumable. Teaching multiplies it.',
   why:'The final transfer: teach it, and it teaches you back.'};
 }},
{id:'semester-plan-predict-05', verb:'predict', part:8, tier:'stretch', skill:'semester-plan',
 gen:(v)=>{
  const person=v.person();
  return {
   q:`${person} gets a $12,000 annual bonus and paces it monthly for 3 years straight, banking every surplus. What builds up?`,
   choices:[
    {label:'A real safety net \u2014 paced surpluses compound into security', ok:true},
    {label:'Nothing \u2014 paced money cannot accumulate', ok:false, mis:'close-enough-math'},
    {label:'Debt \u2014 bonuses cause debt', ok:false},
    {label:'Regret \u2014 unspent bonuses are wasted life', ok:false, mis:'nothing-safe'}],
   hint:'Pace + surplus, 36 months.',
   good:'Under-pace months banked for 3 years = a safety net most adults never build.',
   bad:'"Unspent" is not "wasted" \u2014 banked surplus is future freedom.',
   why:'Long-horizon pacing does not just prevent broke \u2014 it builds wealth.'};
 }},
{id:'semester-plan-predict-06', verb:'predict', part:8, tier:'stretch', skill:'semester-plan',
 gen:(v)=>{
  const person=v.person();
  return {
   q:`${person} ignores semester pacing for a $5,000 grant, spends it in 2 months, then faces 4 more months of semester. What is the cost?`,
   choices:[
    {label:'4 months of scrambling \u2014 borrowing, skipping needs, or debt', ok:true},
    {label:'Nothing \u2014 2 months of fun is worth it', ok:false, mis:'add-week-to-lump'},
    {label:'$5,000 \u2014 the money is just gone, no further cost', ok:false, mis:'close-enough-math'},
    {label:'Pride \u2014 the only cost is embarrassment', ok:false}],
   hint:'4 months, $0. What fills the gap?',
   good:'The $5,000 is gone AND 4 months still need funding \u2014 the true cost is debt or deprivation.',
   bad:'"Just gone" ignores the months the money was supposed to cover.',
   why:'Blown horizons cost double: the money AND the months.'};
 }},
{id:'semester-plan-explain-01', verb:'explain', part:8, tier:'stretch', skill:'semester-plan',
 gen:(v)=>({
  h:'Teach it back: the long-horizon formula',
  prompt:'Teach a friend the full semester-pacing formula from scratch.',
  keyPoints:['Start with the lump sum','Subtract every job: needs, savings goals, known future bills','Divide the flexible remainder by the number of periods','Verify by multiplying back \u2014 it must reconstruct the lump'],
  modelAnswer:'Take the lump sum, subtract everything with a job \u2014 needs, savings goals, known bills \u2014 and divide what is left by the number of weeks or months it must cover. That is the pace. Check it by multiplying back: pace \u00d7 periods + jobs must equal the original lump.',
  hint:'Lump \u2212 jobs, \u00f7 time. Then verify.'
 })},
{id:'semester-plan-explain-02', verb:'explain', part:8, tier:'stretch', skill:'semester-plan',
 gen:(v)=>({
  h:'Teach it back: why lumps lie',
  prompt:'Explain to a skeptic why a $5,000 lump is not $5,000 of spending money.',
  keyPoints:['Day one shows every dollar at once \u2014 the pile illusion','The money must survive every week of the horizon','Needs and savings already own part of it','Only the paced remainder is truly spendable'],
  modelAnswer:'Five thousand dollars on day one looks like wealth, but it has to survive every week until the horizon ends \u2014 and part of it already belongs to needs and savings. Divide the truly flexible remainder by the weeks, and the "$5,000" becomes an honest weekly number. The lump was time in disguise.',
  hint:'What does the pile hide?'
 })},
{id:'semester-plan-explain-03', verb:'explain', part:8, tier:'stretch', skill:'semester-plan',
 gen:(v)=>({
  h:'Teach it back: the bridge',
  prompt:'Explain what a "bridge fund" is and why semester plans need one.',
  keyPoints:['A bridge fund covers the gap between horizons (e.g., December to January)','Semester paces that end at $0 strand the next period','Fund it from surplus or protect it in the original split','It is the landing the flight plan was missing'],
  modelAnswer:'A bridge fund is money set aside to cover the gap between two horizons \u2014 like the weeks between fall finals and spring income. A perfect semester pace that ends at exactly $0 still fails if January has costs. Protect a bridge in the original split or build one from surplus, so every horizon lands safely.',
  hint:'What happens the day AFTER the last paced week?'
 })},
{id:'semester-plan-explain-04', verb:'explain', part:8, tier:'stretch', skill:'semester-plan',
 gen:(v)=>({
  h:'Teach it back: novel lump, same system',
  prompt:'Explain how you would handle a lump sum you have never seen before (bonus, inheritance, stipend).',
  keyPoints:['Name the horizon it must cover','List every job: needs, goals, known future costs','Pace the remainder across the periods','Recalculate when anything changes \u2014 the formula never changes'],
  modelAnswer:'Whatever the lump is called \u2014 bonus, inheritance, stipend \u2014 the system is identical: name the time horizon, subtract every jobbed dollar, pace the remainder across the periods, and recalculate whenever reality shifts. New situations never need new math, just honest inputs.',
  hint:'What changes between a refund and an inheritance?'
 })},
{id:'semester-plan-explain-05', verb:'explain', part:8, tier:'stretch', skill:'semester-plan',
 gen:(v)=>({
  h:'Teach it back: the whole module',
  prompt:'Explain the entire "Make Money Last" module in your own words.',
  keyPoints:['Pace = flexible money \u00f7 time; the pace is a speed limit','Safe-to-spend = balance minus every jobbed dollar','Savings gets a job and a pace, moved first','Long horizons use the same formula at bigger scale \u2014 protect, pace, recalculate'],
  modelAnswer:'Make Money Last is four ideas: pacing turns lumps into weekly speed limits; safe-to-spend tells you what is truly spendable after jobs are subtracted; savings gets named goals with their own paces, moved first; and long horizons \u2014 semesters, bonuses, grants \u2014 run the exact same formula at bigger scale. Protect first, pace the rest, recalculate when life changes.',
  hint:'Four lessons, one system.'
 })},
],
};
