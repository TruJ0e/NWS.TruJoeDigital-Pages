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
  body:'<p>Most money stress is not a math problem. It is a <b>sorting</b> problem: dollars without a job get spent on whatever shows up first.</p><p>The NWS routine gives every dollar a job:</p><ul><li><b>Need</b> - keeps you safe, healthy, or functioning <i>right now</i>.</li><li><b>Want</b> - nice to have, but life works without it.</li><li><b>Savings</b> - money moved to later, for a goal or a surprise.</li></ul><p>This is not about being "good with money." It is a decision tool: sort first, then decide.</p>'},
 {t:'teach',h:'The 4-step routine',
  body:'<ol><li><b>List</b> what is coming: bills, pay, anything pending.</li><li><b>Sort</b> each one into Need, Want, or Savings.</li><li><b>Protect</b> Needs first, then move Savings aside <i>before</i> spending on Wants.</li><li><b>Spend</b> what is left on Wants - without guilt. That is what it is for.</li></ol><p>Order matters. Wants are decided <i>last</i>, from what is left - never first, from what is visible.</p>'},
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
 {t:'try',q:'Maya\u2019s old backpack broke and she needs one for school. A plain $25 backpack is a\u2026',
  choices:[{label:'Need',ok:true},{label:'Want',ok:false},{label:'Savings',ok:false}],
  hint:'Ask: what is it for, right now?',
  good:'Right. She needs it for school - that is a Need.',
  bad:'Not quite. She needs it for school - function first.',
  why:'A plain backpack that lets her do school is a Need. The <i>fancy</i> $80 version would be a Want hiding inside a Need.'},
 {t:'try',q:'Maya\u2019s phone: she needs it for work shifts, but mostly uses it for games. How should she sort it?',
  choices:[{label:'It is all a Need',ok:false},{label:'It is all a Want',ok:false},{label:'Split it: the work part is a Need, the games part is a Want',ok:true}],
  hint:'One item can hold two jobs.',
  good:'Exactly. Sort by what it is <i>for</i>, not by the object itself.',
  bad:'Look closer - the phone does two jobs. Sort each job separately.',
  why:'The work capability is a Need; the gaming is a Want. When one purchase does both, sort the <i>reasons</i>, not the thing.'}
]},
'available-money':{intro:'The number on the screen is not the number you can spend.',steps:[
 {t:'teach',h:'The number on the screen lies a little',
  body:'<p>Your app shows a <b>balance</b>. But some of that money already has a job:</p><ul><li><b>Scheduled payments</b> - autopay that has not hit yet.</li><li><b>Pending charges</b> - swiped but not posted.</li><li><b>Promises</b> - money you already decided to save.</li></ul><p><b>Available money = balance \u2212 money that already has a job.</b> Spend from the available number, never the visible one.</p>'},
 {t:'example',h:'Maya checks before she spends',story:'<p>Friday night. Maya\u2019s app shows <b>$320</b>. A friend invites her to dinner - about $40. She checks first:</p>',
  points:['Balance on screen: $320','Electric autopay hits tomorrow: \u2212$90','Promised to emergency savings: \u2212$40','Actually available: <b>$190</b>','Dinner fits. She goes - and the electric bill is safe.']},
 {t:'try',q:'Your app shows $200. A $60 rent autopay hits tomorrow. Nothing else is pending. What is actually available?',
  choices:[{label:'$200',ok:false},{label:'$140',ok:true},{label:'$260',ok:false}],
  hint:'Subtract the money that already has a job.',
  good:'Right: $200 \u2212 $60 = $140.',
  bad:'Subtract the scheduled $60 first: $200 \u2212 $60 = $140.',
  why:'The $60 is already spoken for. Available = $200 \u2212 $60 = $140.'},
 {t:'try',q:'App shows $500. $200 rent autopay in 3 days, a $45 pending gas hold, and $50 you promised to savings. Available?',
  choices:[{label:'$500',ok:false},{label:'$255',ok:false},{label:'$205',ok:true}],
  hint:'Three things already have a job. Subtract all three.',
  good:'Right: $500 \u2212 $200 \u2212 $45 \u2212 $50 = $205.',
  bad:'Count everything with a job: $200 + $45 + $50 = $295 spoken for. $500 \u2212 $295 = $205.',
  why:'Rent, the pending hold, and the savings promise all count. $500 \u2212 $295 = $205 actually available.'},
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
 {t:'try',q:'Two students buy the same $120 shoes. One\u2019s old shoes have holes; the other\u2019s are fine. Who made a Need purchase?',
  choices:[{label:'The one whose shoes had holes',ok:true},{label:'Both - same shoes, same category',ok:false},{label:'Neither - shoes are always Wants',ok:false}],
  hint:'Same item, different context.',
  good:'Exactly. The category lives in the context, not the price tag.',
  bad:'Look at the context, not the item. Holes = function = Need.',
  why:'Identical purchase, different categories. This is why "what is it for, right now?" beats any fixed list.'},
 {t:'try',q:'Maya has $40. She needs $30 for groceries and wants a $15 game. She cannot do both. What does the routine say?',
  choices:[{label:'Buy the game now, figure out groceries later',ok:false},{label:'Protect the $30 need first; the game waits',ok:true},{label:'Split it: $20 groceries, $15 game, hope for the best',ok:false}],
  hint:'Remember the order: Needs first, then Savings, then Wants.',
  good:'Right. Needs are protected first. The Want waits for "what is left."',
  bad:'The routine protects Needs before Wants. Groceries first.',
  why:'When money is short, the routine is a tiebreaker: Needs win. The game is a fine Want - next week, from what is left.'}
]}
};

/* ================= MODULE 2: Make Money Last ================= */
Object.assign(LESSON_CONTENT,{
'pacing-basics':{intro:'Turn a lump of money into a weekly pace you can actually follow.',steps:[
 {t:'teach',h:'Divide money by time',
  body:'<p>A month of money feels huge on day one and tiny on day twenty. <b>Pacing</b> fixes that:</p><p><b>Flexible money \u00f7 time remaining = your pace.</b></p><p>The pace is a <i>speed limit</i>, not a target. Staying under it means the money lasts. Use <i>flexible</i> money - after Needs and Savings are protected - never the full balance.</p>'},
 {t:'example',h:'Maya paces $400',story:'<p>Maya has $400 for 4 weeks. She protects $200 for needs and savings first, leaving $200 flexible.</p>',
  points:['Flexible money: $200','Time: 4 weeks','Pace: $200 \u00f7 4 = <b>$50/week</b>','Week 2, she has spent $45. She is under pace - the money will last.']},
 {t:'try',q:'You have $300 of flexible money and 3 weeks left. What is your weekly pace?',
  choices:[{label:'$100/week',ok:true},{label:'$150/week',ok:false},{label:'$300/week',ok:false}],
  hint:'Flexible money \u00f7 time.',
  good:'Right: $300 \u00f7 3 = $100/week.',
  bad:'Divide the flexible money by the weeks: $300 \u00f7 3 = $100/week.',
  why:'Pace = $300 \u00f7 3 weeks = $100/week. Spend at or under it and the money lasts.'},
 {t:'try',q:'You had $400 for 4 weeks - a $100/week pace. But you spent $130 in week 1. What is the new pace for the remaining $270 over 3 weeks?',
  choices:[{label:'$100/week - stick to the original plan',ok:false},{label:'$90/week',ok:true},{label:'$67.50/week',ok:false}],
  hint:'Forget the original plan. Use what REMAINS.',
  good:'Right: $270 \u00f7 3 = $90/week. You recalculated from what remains.',
  bad:'Do not punish yourself or cling to the old plan. $270 \u00f7 3 = $90/week.',
  why:'Overspending does not mean the plan failed - it means the plan updates. New pace = remaining money \u00f7 remaining time = $270 \u00f7 3 = $90/week.'},
 {t:'try',q:'Payday: $1,800 for the month. Needs: $1,050. Savings: $150. What is the daily pace for flexible spending?',
  choices:[{label:'$60/day',ok:false},{label:'$20/day',ok:true},{label:'$35/day',ok:false}],
  hint:'Flexible first, then divide by 30.',
  good:'Right: ($1,800 \u2212 $1,050 \u2212 $150) = $600 \u00f7 30 = $20/day.',
  bad:'Protect Needs and Savings first: $1,800 \u2212 $1,050 \u2212 $150 = $600. Then $600 \u00f7 30 = $20/day.',
  why:'$60/day would spend the rent money. The pace only ever applies to flexible money: $600 \u00f7 30 = $20/day.'},
 {t:'tool',screen:'pacing-value',focus:'pacing',h:'Try the pacing calculator',body:'<p>Enter your own numbers and watch the pace compute - including what happens when you change the time left.</p>',cta:'Open the pacing calculator'}
]},
'safe-to-spend':{intro:'Balance is what exists. Safe to spend is what is left after money with a job.',steps:[
 {t:'teach',h:'Two different numbers',
  body:'<p><b>Balance</b> = everything in the account.<br><b>Safe to spend</b> = balance \u2212 future needs \u2212 protected savings.</p><p>Confusing the two is the #1 way people "mysteriously" run out of money. The balance includes money that already has a job.</p>'},
 {t:'example',h:'Maya\u2019s two numbers',story:'<p>Maya\u2019s balance: <b>$400</b>.</p>',
  points:['Future transport this month: \u2212$120','Protected savings: \u2212$80','Safe to spend: <b>$200</b>','Over 4 weeks: $50/week safe. The $400 balance would have lied to her.']},
 {t:'try',q:'Balance $400. Transport $120 coming up. Savings $80 protected. What is safe to spend per week over 4 weeks?',
  choices:[{label:'$100/week',ok:false},{label:'$50/week',ok:true},{label:'$400 - it is all there',ok:false}],
  hint:'Balance minus the money with a job, then divide.',
  good:'Right: ($400 \u2212 $120 \u2212 $80) \u00f7 4 = $50/week.',
  bad:'First find safe to spend: $400 \u2212 $120 \u2212 $80 = $200. Then $200 \u00f7 4 = $50/week.',
  why:'$400 is the balance; $200 is safe to spend. Spending from the balance spends the transport and savings money too.'},
 {t:'try',q:'Your friend says "I have $800, I\u2019m set this month!" But $500 rent + $150 bills hit before next payday. What is actually safe?',
  choices:[{label:'$800 - it is all available',ok:false},{label:'$150',ok:true},{label:'$650',ok:false}],
  hint:'Subtract every future need first.',
  good:'Right: $800 \u2212 $500 \u2212 $150 = $150.',
  bad:'The rent and bills already have a job: $800 \u2212 $650 = $150 safe.',
  why:'Feeling rich from the balance is the trap. $650 is spoken for; $150 is the real number to plan around.'}
]},
'savings-purpose':{intro:'Savings is not a vault you never open. It is money with a future job.',steps:[
 {t:'teach',h:'Savings has a job description',
  body:'<p>"Savings" is vague, and vague money gets spent. Give it a job:</p><ul><li><b>Emergency money</b> - for surprises (car repair, medical).</li><li><b>Planned goal</b> - textbooks, a deposit, a trip.</li><li><b>Future need</b> - tuition due in 3 months.</li></ul><p>When the job arrives, <b>using the savings IS the plan working</b> - not a failure.</p>'},
 {t:'example',h:'Maya\u2019s textbooks',story:'<p>Maya saved $180 for textbooks all semester.</p>',
  points:['Saved: $180 (job: textbooks)','Books cost: $165','She spends the $165 from savings - the plan worked.','$15 stays saved for next time.']},
 {t:'try',q:'Maya saved $180 for textbooks. The books cost $165 and she buys them from savings. What happened?',
  choices:[{label:'She failed - savings should never be touched',ok:false},{label:'The savings did its job',ok:true},{label:'She should feel guilty',ok:false}],
  hint:'What was the money\u2019s job?',
  good:'Exactly. That is what the money was for.',
  bad:'The money\u2019s job was textbooks. Using it for textbooks is success.',
  why:'Savings with a purpose is meant to be spent <i>on its purpose</i>. Untouched savings with no job is just unspent money.'},
 {t:'try',q:'Maya has $200 in emergency savings and a $200 surprise car repair. She also wants $80 concert tickets. What should the emergency money do?',
  choices:[{label:'Cover the repair - that is its job',ok:true},{label:'Buy the concert tickets - emergencies can wait',ok:false},{label:'Split it: half repair, half concert',ok:false}],
  hint:'Match the money to its job description.',
  good:'Right. The repair is exactly what emergency money exists for.',
  bad:'Emergency money has one job: emergencies. The concert is a Want.',
  why:'Purpose beats impulse. The repair is the emergency the fund was built for; the concert waits for flexible money.'}
]},
'irregular-income':{intro:'Do not budget money that has not arrived yet.',steps:[
 {t:'teach',h:'Irregular income needs a stricter rule',
  body:'<p>When shifts vary, the paycheck is a <i>guess</i> until it lands. The rule:</p><ol><li><b>Protect required costs first</b> - what MUST be paid before the next known income.</li><li><b>Hold a buffer</b> - a cushion for the gap.</li><li><b>Only then</b> treat the rest as flexible.</li></ol><p>Never spend "expected" shifts. Budget the cash in hand.</p>'},
 {t:'example',h:'Maya\u2019s slow weeks',story:'<p>Two slow weeks ahead. Maya has $300 cash, $170 in required costs, and no guaranteed shifts.</p>',
  points:['Cash in hand: $300','Required costs: \u2212$170','Buffer for the gap: \u2212$50','Flexible: <b>$80</b>. Small - and honest.']},
 {t:'try',q:'You have $300 cash, $170 in required costs before any more known income, and no guaranteed shifts. A $50 buffer is wise. What is flexible?',
  choices:[{label:'$300 - all of it',ok:false},{label:'$130',ok:false},{label:'$80',ok:true}],
  hint:'Protect, buffer, then see what is left.',
  good:'Right: $300 \u2212 $170 \u2212 $50 = $80.',
  bad:'$300 \u2212 $170 (required) \u2212 $50 (buffer) = $80 flexible.',
  why:'With irregular income, required costs and a buffer come off the top. Only $80 is truly flexible.'},
 {t:'try',q:'Your friend has $250 cash, $180 in bills due, and no shifts scheduled. He says "just spend normally - you\u2019ll pick up shifts." What is the flaw?',
  choices:[{label:'There is no flaw - optimism pays bills',ok:false},{label:'He is budgeting shifts that do not exist yet',ok:true},{label:'He should spend faster before the money disappears',ok:false}],
  hint:'What is he counting that is not in his hand?',
  good:'Exactly. Expected income is not income.',
  bad:'He is spending money from shifts he has not worked. Protect first.',
  why:'"You will pick up shifts" is a hope, not a paycheck. The rule: budget cash in hand, protect required costs, hold a buffer.'},
 {t:'tool',screen:'pacing-value',focus:'irregular',h:'Try the irregular-income calculator',body:'<p>Plug in cash on hand, required costs, and a buffer - see what is honestly flexible.</p>',cta:'Open the calculator'}
]},
'semester-plan':{intro:'Lump sums lie. Break them into periods.',steps:[
 {t:'teach',h:'Big money, long time',
  body:'<p>A semester refund, a tax refund, a bonus - lump sums <i>feel</i> huge on day one. The fix is the same pace math, stretched out:</p><p><b>(Lump sum \u2212 needs \u2212 savings) \u00f7 number of periods = pace per period.</b></p><p>A $3,200 semester refund is not $3,200 of spending money. It is 16 weeks of paced money.</p>'},
 {t:'example',h:'Maya\u2019s semester refund',story:'<p>$3,200 refund lands in August. Semester is 16 weeks.</p>',
  points:['Semester needs: \u2212$1,600','Savings goal: \u2212$400','Flexible: $1,200','Pace: $1,200 \u00f7 16 = <b>$75/week</b> for the whole semester.']},
 {t:'try',q:'$3,200 for the semester. $1,600 in needs, $400 savings goal, 16 weeks. What is the weekly pace?',
  choices:[{label:'$200/week',ok:false},{label:'$75/week',ok:true},{label:'$3,200 - spend as needed',ok:false}],
  hint:'Flexible money \u00f7 weeks.',
  good:'Right: ($3,200 \u2212 $1,600 \u2212 $400) \u00f7 16 = $75/week.',
  bad:'Protect first: $3,200 \u2212 $2,000 = $1,200 flexible. $1,200 \u00f7 16 = $75/week.',
  why:'$200/week would burn through the needs money by October. $75/week lasts all 16 weeks.'},
 {t:'try',q:'You get a $1,000 tax refund. Rent is $600/month. Your friend says "we\u2019re set for months!" What is wrong?',
  choices:[{label:'Nothing - $1,000 is a lot',ok:false},{label:'It covers less than 2 months of rent - it is one-time money against ongoing costs',ok:true},{label:'Refunds do not count as money',ok:false}],
  hint:'One-time money \u00f7 ongoing costs.',
  good:'Exactly. $1,000 \u00f7 $600 = about 1.6 months. Then what?',
  bad:'Divide: $1,000 covers rent for ~1.6 months. "Set for months" is the lump-sum illusion.',
  why:'Lump sums feel permanent; they are not. Always divide one-time money by the ongoing cost to see how long it really lasts.'},
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
 {t:'try',q:'Maya was not going to buy a $60 jacket. It is 50% off, so $30, and she buys it. Did she save $30?',
  choices:[{label:'Yes - half price is half price',ok:false},{label:'No - she spent $30 she was not going to spend',ok:true}],
  hint:'Was she going to buy it anyway?',
  good:'Right. No planned purchase = no savings.',
  bad:'Apply the test: she was NOT going to buy it. So she saved nothing.',
  why:'Savings require a planned purchase. Without one, "50% off" just means spending $30 instead of $0.'},
 {t:'try',q:'A store offers $20 off any $100 purchase. Maya adds a $25 item she does not need to reach $100. Good deal?',
  choices:[{label:'Yes - she got $20 off',ok:false},{label:'No - she spent $25 extra to "save" $20',ok:true},{label:'Yes - free shipping makes it worth it',ok:false}],
  hint:'Do the net math.',
  good:'Right: \u2212$25 + $20 = \u2212$5. She lost $5.',
  bad:'Net it out: she spent $25 to save $20. That is \u2212$5.',
  why:'Threshold deals ("spend $X, save $Y") bait you into adding unneeded items. Net math: \u2212$25 spent + $20 saved = $5 lost.'}
]},
'usable-value':{intro:'Compare what you will USE, not what is in the package.',steps:[
 {t:'teach',h:'Unit price is only half the story',
  body:'<p><b>Unit price = price \u00f7 quantity.</b> But the quantity that matters is what you will <i>actually use</i>:</p><p><b>True unit price = price \u00f7 units you will use.</b></p><p>A giant pack is only cheaper if the extra does not go in the trash. Waste is the most expensive ingredient.</p>'},
 {t:'example',h:'Maya compares two packs',story:'<p>Pasta: 12-pack for $9 ($0.75 each) vs 6-pack for $5.40 ($0.90 each).</p>',
  points:['She will use all 12 before they expire.','True cost: $0.75 vs $0.90 per pack.','The 12-pack wins - <i>because none is wasted</i>.']},
 {t:'try',q:'12-pack for $9 ($0.75 each) vs 6-pack for $5.40 ($0.90 each). Maya will use all 12. Which is the better buy?',
  choices:[{label:'The 12-pack',ok:true},{label:'The 6-pack - smaller is safer',ok:false}],
  hint:'Compare true unit prices.',
  good:'Right: $0.75 < $0.90 per pack used.',
  bad:'$9 \u00f7 12 = $0.75 each vs $5.40 \u00f7 6 = $0.90 each. The 12-pack is cheaper per use.',
  why:'When everything gets used, the lower unit price wins: $0.75 vs $0.90 per pack.'},
 {t:'try',q:'Same two packs - but Maya will only use 6 before they expire. Now which is better?',
  choices:[{label:'Still the 12-pack - the sticker says $0.75',ok:false},{label:'The 6-pack',ok:true}],
  hint:'Recompute with 6 used, not 12 bought.',
  good:'Right: $9 \u00f7 6 used = $1.50 each vs $0.90. The 6-pack wins.',
  bad:'True unit price uses what you USE: $9 \u00f7 6 = $1.50 each. The 6-pack at $0.90 wins.',
  why:'Waste flips the answer. $9 for 6 used = $1.50 each - nearly double the 6-pack. Always divide by what you will use.'},
 {t:'tool',screen:'pacing-value',focus:'value',h:'Try the value calculator',body:'<p>Compare packs with unit price - and factor in what you will actually use.</p>',cta:'Open the value calculator'}
]},
'gas-value':{intro:'Count the cost of getting the deal.',steps:[
 {t:'teach',h:'The pump price is not the full price',
  body:'<p>Driving for cheaper gas has a cost: the trip itself.</p><p><b>Real savings = pump savings \u2212 extra trip cost.</b></p><p>Extra trip cost = (extra miles \u00f7 mpg) \u00d7 gas price. If the station is <i>on your route anyway</i>, the extra cost is $0 - then the cheaper pump always wins.</p>'},
 {t:'example',h:'Maya does the math',story:'<p>Station A: $3.00/gal, next door. Station B: $2.85/gal, 8 extra miles round trip. 12 gallons, 25 mpg.</p>',
  points:['Pump savings: 12 \u00d7 $0.15 = $1.80','Trip cost: (8 \u00f7 25) \u00d7 $3.00 \u2248 $0.96','Real savings: $1.80 \u2212 $0.96 = <b>$0.84</b>','Worth it? Barely. A smaller gap would flip it.']},
 {t:'try',q:'12 gallons. Station B is $0.15 cheaper but 8 extra miles round trip (25 mpg, gas $3.00). What is the right comparison?',
  choices:[{label:'Just the pump price - $0.15 cheaper wins',ok:false},{label:'Pump savings minus the extra trip cost',ok:true},{label:'Always pick the closest station',ok:false}],
  hint:'What does the trip itself cost?',
  good:'Right: $1.80 pump savings \u2212 ~$0.96 trip cost = ~$0.84 real savings.',
  bad:'Subtract the trip: (8 \u00f7 25) \u00d7 $3.00 \u2248 $0.96. $1.80 \u2212 $0.96 = $0.84.',
  why:'The pump price ignores the drive. Real savings = $1.80 \u2212 $0.96 \u2248 $0.84.'},
 {t:'try',q:'The cheaper station is directly on Maya\u2019s normal route to work - zero extra miles. Which station wins?',
  choices:[{label:'The cheaper one - no extra trip cost',ok:true},{label:'The closer one - habit beats math',ok:false}],
  hint:'What is the extra trip cost now?',
  good:'Right. Zero extra miles = zero extra cost. Cheaper pump wins outright.',
  bad:'Extra miles = 0, so extra cost = $0. The cheaper pump wins with no penalty.',
  why:'On-route changes everything: the trip cost drops to $0, so the full $1.80 pump savings is real.'},
 {t:'tool',screen:'pacing-value',focus:'gas',h:'Try the gas calculator',body:'<p>Enter both stations, your tank, and the detour - see the real savings.</p>',cta:'Open the gas calculator'}
]},
'subscriptions-lesson':{intro:'Small monthly charges are yearly decisions in disguise.',steps:[
 {t:'teach',h:'Multiply by 12',
  body:'<p>$12.99/month sounds small. <b>$12.99 \u00d7 12 = $156/year</b> sounds different - because it is the same money.</p><p>Every subscription is a <i>yearly</i> decision wearing a monthly costume. Three "small" subs can quietly eat $400\u2013$500 a year.</p>'},
 {t:'example',h:'Maya audits her subs',story:'<p>Music $9.99 + video $15.99 + a fitness app $7.99 she opened twice.</p>',
  points:['Monthly total: $33.97','Yearly: $33.97 \u00d7 12 = <b>$407.64</b>','She cancels the fitness app: saves $95.88/year in 2 minutes.']},
 {t:'try',q:'Music $9.99/mo + video $15.99/mo. What is the yearly total?',
  choices:[{label:'About $312/year',ok:true},{label:'About $26/year',ok:false},{label:'About $156/year',ok:false}],
  hint:'Add, then multiply by 12.',
  good:'Right: ($9.99 + $15.99) \u00d7 12 = $311.76.',
  bad:'($9.99 + $15.99) = $25.98/month. \u00d7 12 = $311.76/year.',
  why:'$25.98 feels small; $311.76 is the real decision size. Always multiply by 12.'},
 {t:'try',q:'Maya pays $7.99/mo for an app she has not opened in 3 months. Keep or cancel?',
  choices:[{label:'Keep - she might use it someday',ok:false},{label:'Cancel - re-subscribe if she ever needs it',ok:true}],
  hint:'Recurring cost needs recurring value.',
  good:'Right. $95.88/year for "might" is a bad trade.',
  bad:'Three unused months = the value is not recurring. Cancel; it takes 2 minutes to rejoin later.',
  why:'A subscription must earn its cost <i>every month</i>. "Might use it" is not earning. Cancel now, re-subscribe if life changes.'},
 {t:'tool',screen:'subscriptions',h:'Audit your subscriptions',body:'<p>List yours and see the yearly total - the number that actually matters.</p>',cta:'Open the subscription tracker'}
]}
});

/* ================= MODULES 4 & 5: built from adult-life content ================= */
import { ADULT_LIFE_MODULES } from './adult-life.js';
import { adultLifeAssessmentForSkill } from './adult-life-assessment.js';

const escHtml=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

function adultLifeLesson(id){
  const m=ADULT_LIFE_MODULES.find(x=>x.id===id);
  if(!m) return {intro:'',steps:[]};
  const correctChoice=m.practice.choices.find(c=>c.id===m.practice.correct);
  const correctFeedback=correctChoice?correctChoice.feedback:'Correct.';
  const steps=[
    {t:'teach',h:m.title+': what to know',
     body:'<p>'+escHtml(m.summary)+'</p><ul>'+m.durableConcepts.map(c=>'<li>'+escHtml(c)+'</li>').join('')+'</ul><p class="sub">Concepts last; rules, amounts, and forms change. When an answer depends on current rules, check the official source - never memorize a number as permanent.</p>'},
    {t:'try',q:m.practice.prompt,
     choices:m.practice.choices.map(c=>({label:c.label,ok:c.id===m.practice.correct,note:c.feedback})),
     hint:'Which choice protects the decision process - not just today, but as a habit?',
     good:correctFeedback,
     bad:'Not quite. Read what each choice actually does, then pick the one that protects the process.',
     why:correctFeedback}
  ];
  const transfer=adultLifeAssessmentForSkill(m.skill,'transfer');
  if(transfer){
    steps.push({t:'try',q:'Harder - same skill, new situation: '+transfer.question,
      choices:transfer.choices.map(c=>({label:c[1],ok:c[0]===transfer.good})),
      hint:'Ignore the new surface details. What is the underlying decision?',
      good:'Right. '+transfer.help,
      bad:'The situation changed but the skill did not. '+transfer.help,
      why:transfer.help});
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
 {t:'example',h:'Maya builds a buffer',story:'<p>Maya moves $10/week into emergency savings. Nothing dramatic.</p>',
  points:['After 6 months: ~$260.','After a year: ~$520.','Then her car needs a $300 repair.','It comes from the buffer. No credit card. No crisis. The plan worked.']},
 {t:'try',q:'Maya has $0 in emergency savings and a $400 car repair she must pay. What most likely happens?',
  choices:[{label:'It goes on a credit card, plus interest',ok:true},{label:'The repair waits politely until she saves up',ok:false},{label:'Nothing - repairs are optional',ok:false}],
  hint:'Without a buffer, where does surprise money come from?',
  good:'Right. No buffer = borrowing, usually at high interest.',
  bad:'Repairs do not wait. Without savings, the money comes from borrowing - plus interest.',
  why:'This is the real cost of $0 emergency savings: a $400 repair becomes $400 + interest. The buffer breaks that chain.'},
 {t:'try',q:'Two students each save $20/week. One calls it "emergency money," the other just leaves it in checking. A $300 surprise hits. Who is better off?',
  choices:[{label:'The one who named it emergency money',ok:true},{label:'No difference - same dollars',ok:false}],
  hint:'What happens to unnamed money?',
  good:'Right. Named money has a job; unnamed money gets spent.',
  bad:'Same dollars, different fate: unnamed money leaks into daily spending. The label protects it.',
  why:'This is the deeper lesson: the <i>label</i> is the protection. Money with a job (emergency) survives; money without one quietly disappears into Wants.'},
 {t:'tool',screen:'save',h:'Start the buffer',body:'<p>Set a savings target and watch small weekly moves add up to a real buffer.</p>',cta:'Open savings tools'}
]},
'benefits-lesson':{intro:'Support programs exist. Learn how to read them correctly.',steps:[
 {t:'teach',h:'Versioned information, not memorized numbers',
  body:'<p>Programs like SSI, SSDI, and ABLE accounts have <b>rules that change</b>: amounts update yearly, eligibility depends on your situation.</p><p>So do not memorize numbers. Learn the <b>stable concepts</b>:</p><ul>'+BENEFIT_TOPICS.slice(0,3).map(t=>'<li><b>'+escHtml(t.title)+':</b> '+escHtml(t.summary)+'</li>').join('')+'</ul><p class="sub">Current figures are labeled with their year and source inside the Benefits section. When an answer depends on a current rule, check the official source.</p>'},
 {t:'example',h:'Maya reads a benefit correctly',story:'<p>Maya hears "SSI pays $X a month" from a friend.</p>',
  points:['She checks the Benefits section: the figure is labeled with its year and source.','She reads the <i>stable concept</i>: SSI has income and resource rules; work does not automatically end it.','She does not treat the friend\u2019s number as permanent - she checks the official source.']},
 {t:'try',q:'A friend says "I heard SSI pays $994 a month, so that is what you would get." What is wrong with treating that as your answer?',
  choices:[{label:'Nothing - a number is a number',ok:false},{label:'Amounts change yearly and depend on your situation - check the current official source',ok:true}],
  hint:'What did you learn about versioned information?',
  good:'Right. Concepts last; numbers expire.',
  bad:'Figures are year-labeled for a reason: they change. And eligibility is individual.',
  why:'The $994 figure is real <i>for its year and situation</i> - not a permanent personal quote. Always verify current rules at the official source.'},
 {t:'try',q:'Why does NWS teach the <i>concept</i> ("SSI has income and resource rules") instead of just the current payment amount?',
  choices:[{label:'Concepts stay useful after numbers change',ok:true},{label:'Numbers are not important',ok:false}],
  hint:'Which one survives a new year?',
  good:'Exactly. Learn the durable part; look up the changeable part.',
  bad:'The amount will change next year. The concept - that rules exist and where to check them - lasts.',
  why:'This is a thinking skill, not trivia: know <i>that</i> rules exist, <i>what kind</i> they are, and <i>where</i> to verify them. That survives every update.'},
 {t:'tool',screen:'benefits',h:'Explore the Benefits section',body:'<p>See how figures are year-labeled and sourced - and where the official links live.</p>',cta:'Open Benefits'}
]},
'decision-routine':{intro:'Put the whole routine together on one real scenario.',steps:[
 {t:'teach',h:'The full NWS decision routine',
  body:'<p>Everything in this course compresses into one routine. Run it whenever money arrives or a big decision looms:</p><ol><li><b>Available?</b> Balance \u2212 scheduled, pending, and promised money.</li><li><b>How long?</b> How much time must it cover?</li><li><b>Needs first.</b> Protect every required cost.</li><li><b>Savings next.</b> Move future money aside before spending.</li><li><b>Pace it.</b> Safe money \u00f7 time = your speed limit.</li><li><b>Spend smart.</b> Was I going to buy it anyway? What will I actually use?</li><li><b>Overspent?</b> Recalculate from what remains - never from the original plan.</li></ol>'},
 {t:'example',h:'Maya runs the whole routine',story:'<p>Maya gets $600 for the month.</p>',
  points:['<b>Available?</b> $600, nothing pending \u2192 $600.','<b>How long?</b> 30 days.','<b>Needs:</b> $350 rent share + food \u2192 protect it.','<b>Savings:</b> $60 to the emergency buffer.','<b>Pace:</b> ($600 \u2212 $350 \u2212 $60) \u00f7 30 = <b>$6.33/day</b>.','<b>Spend smart:</b> the "deal" she sees gets the "was I going to buy it anyway" test.','<b>Overspent mid-month?</b> New pace from what remains.']},
 {t:'try',q:'Mid-month, Maya realizes she spent $100 more than planned. What are her next two moves, in order?',
  choices:[{label:'Feel bad, then keep spending the same way',ok:false},{label:'Find the money remaining, then set a new pace from it',ok:true},{label:'Borrow from next month to stay on the old plan',ok:false}],
  hint:'Step 7 of the routine.',
  good:'Right: remaining money \u00f7 remaining time. The plan updates; it does not punish.',
  bad:'Step 7: recalculate from what REMAINS. Find it, divide by time left.',
  why:'Overspending is data, not failure. The routine\u2019s last step exists for exactly this: new pace = remaining \u00f7 remaining time.'},
 {t:'try',q:'Which order does the routine protect money in?',
  choices:[{label:'Wants, then Needs, then Savings',ok:false},{label:'Needs, then Savings, then Wants from what is left',ok:true},{label:'Savings only - Needs can wait',ok:false}],
  hint:'Steps 3, 4, 5.',
  good:'Right. Needs \u2192 Savings \u2192 Wants. In that order, every time.',
  bad:'Needs first (you must function), Savings second (future you), Wants last (from what is left).',
  why:'The order IS the routine. Flip it - Wants first - and Needs and Savings get whatever happens to be left, which is usually nothing.'}
]}
});
