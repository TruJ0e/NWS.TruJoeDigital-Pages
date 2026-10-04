// Real-World Money Survival modules (2026-10-04). Appends to ADULT_LIFE_MODULES.
import { ADULT_LIFE_MODULES } from './adult-life.js';

ADULT_LIFE_MODULES.push({
  id:"nd-money",
  title:"Money systems for every brain",
  skill:"nd-money",
  summary:"Practical money systems built for brains that work differently — no willpower required.",
  durableConcepts:["Money you cannot see does not feel spent: make every dollar visible with notifications, separate low-balance spending accounts, and cash envelopes for problem categories.","Impulse spending beats willpower, so change the environment instead: 24-hour rule, delete saved card numbers, unsubscribe from marketing email, disable in-app purchases.","Routines beat motivation: anchor money check-ins to things you already do (Sunday after breakfast) and track visually — whiteboards, jars, color codes.","Design systems WITH your brain, not against it: if a tool needs remembering, it will fail — pick tools that show up on their own."],
  practice:{
    prompt:"Jordan has ADHD. He taps his card for everything and is shocked at his balance every Friday. Which change makes his spending VISIBLE so his brain registers it?",
    choices:[{"id":"a","label":"Turn on app notifications for every transaction and keep a low-balance spending account","feedback":"[Street-smart] Notifications and a low balance make each dollar visible — money you can see gets treated as spent."},{"id":"b","label":"Promise himself he will try harder to remember purchases","feedback":"[Street-smart] Promises use willpower, and willpower is the weakest tool here. Systems beat willpower every time.","mis":"willpower-over-systems"},{"id":"c","label":"Move all his money into a savings account with no debit card and no notifications","feedback":"[Street-smart] That makes money LESS visible, not more. Hidden money gets spent accidentally — the opposite of the goal.","mis":"hide-money-solves-spending"},{"id":"d","label":"Check his balance once a month","feedback":"[Street-smart] Once a month is way too late to catch a spending pattern. Weekly or real-time visibility is what works.","mis":"infrequent-check-is-enough"}],
    correct:"a"
  },
  sources:[{"agency":"Consumer Financial Protection Bureau","title":"Tools for financial wellbeing","url":"https://www.consumerfinance.gov","lastReviewed":"2026-10-04"},{"agency":"CHADD","title":"National Resource on ADHD","url":"https://chadd.org","lastReviewed":"2026-10-04"}]
});

ADULT_LIFE_MODULES.push({
  id:"debt-warfare",
  title:"Getting out of debt",
  skill:"debt-warfare",
  summary:"A battle plan for killing debt: snowball it, dodge the traps, and finish.",
  durableConcepts:["Snowball: pay minimums on every debt, throw every extra dollar at the SMALLEST balance first. Visible wins keep you going.","Avalanche (highest interest first) saves more money on paper. Snowball wins on follow-through. Pick the plan you will actually finish.","Minimum payments stretch debt for years: a $2,000 balance at 22% paid at minimums can take decades and cost far more than the balance in interest.","Interest accrues on the remaining balance, so every extra dollar attacks principal and shrinks all future interest — including the free 13th payment that biweekly payments sneak in."],
  practice:{
    prompt:"Jordan has three debts: a $400 store card (min $25), a $2,500 card (min $60), and a $6,000 loan (min $130). He finds an extra $200/month. What is the snowball play?",
    choices:[{"id":"a","label":"Minimums on all three; all $200 extra at the $400 store card until it is gone, then roll that payment into the next debt.","feedback":"[Research-backed] Exactly. Minimums everywhere so nothing slips, every spare dollar at the smallest balance, and the freed payment rolls forward — the snowball grows with each kill."},{"id":"b","label":"Split the $200 evenly across all three debts.","feedback":"[Research-backed] Splitting feels fair but kills nothing fast. Concentrated fire on the smallest debt buys the first win, and wins are the fuel.","mis":"split-the-extra"},{"id":"c","label":"All $200 at the $6,000 loan — attack the biggest debt first.","feedback":"[Research-backed] Biggest-first is backwards for the snowball: the $6,000 loan barely notices $200, while that same $200 nearly halves the $400 card. Order by smallest balance.","mis":"biggest-first"},{"id":"d","label":"Skip the minimums on the big debts to kill the small one even faster.","feedback":"[Research-backed] Never skip minimums — missed payments mean fees and credit damage. Snowball works on top of minimums, not instead of them.","mis":"skip-minimums"}],
    correct:"a"
  },
  sources:[{"agency":"Consumer Financial Protection Bureau","title":"Resolve to take control of your debt in the new year","url":"https://www.consumerfinance.gov/archive/blog/resolve-take-control-your-debt-new-year/","lastReviewed":"2026-10-04"}]
});

ADULT_LIFE_MODULES.push({
  id:"retirement",
  title:"Retirement starts now",
  skill:"retirement",
  summary:"Why a dollar at 18 beats ten dollars at 48 — and how to set it up.",
  durableConcepts:[{"title":"Traditional vs Roth, plain","body":"Traditional: pay no tax now, pay tax later when you take the money out. Roth: pay tax now, never pay tax on it again — as long as you are 59½ and the account has been open 5 years. A teenager in a low tax bracket usually wins with Roth. [Research-backed]"},{"title":"2026 contribution limits","body":"IRA: $7,500 a year if you are under 50 ($8,600 at 50 and up). 401(k): $24,500 a year. These limits change most years — check the IRS before you plan. [Research-backed]"},{"title":"The employer match is a raise","body":"If your job matches 50% up to 6% of your pay and you do not contribute, you are refusing a raise. Always capture the full match first — nothing else hands you an instant 50% return on your money. [Research-backed]"},{"title":"Time matters more than amount","body":"$100 a month from age 18 to 65 in a Roth, at an illustrative 7% average growth, ends up around $380,000+ tax-free. Start at 28 instead and you land around $210,000 — those ten skipped years cost roughly $170,000, and every decade you wait pushes the gap into the hundreds of thousands. Actual returns vary. You cannot open an account yet at 12, but knowing this at 12 beats learning it at 32. [Research-backed]"}],
  practice:{
    prompt:"Jordan is 22, working part-time, earning little. She can put $200 a month into a Traditional IRA or a Roth IRA. Which is the better pick and why?",
    choices:[{"id":"roth","label":"Roth — she pays little tax now, so tax-free growth later wins.","feedback":"[Research-backed] At 22 with low earnings, her tax rate is near its lowest. Paying tax now (Roth) locks in decades of tax-free growth."},{"id":"trad","label":"Traditional — the tax break now is always better.","mis":"tax-break-myth","feedback":"[Research-backed] A tax break now helps most when your tax rate is high. At 22 with low income, there is barely any tax to break."},{"id":"neither","label":"Neither — she should wait until she earns real money.","mis":"waiting-fallacy","feedback":"[Research-backed] Waiting costs the one thing money cannot buy back: time. Ten years of compounding at 22 dwarfs a bigger contribution at 32."},{"id":"split50","label":"Split it evenly — diversification is always safer.","mis":"false-diversification","feedback":"[Street-smart] Splitting without a reason is not diversification, it is indecision. Her tax bracket answers this one clearly: Roth."}],
    correct:"roth"
  },
  sources:[{"agency":"IRS","title":"IRS — Retirement Plans","url":"https://www.irs.gov/retirement-plans","lastReviewed":"2026-10-04"}]
});

ADULT_LIFE_MODULES.push({
  id:"student-loans",
  title:"College money without the trap",
  skill:"student-loans",
  summary:"How to pay for college without burying your future in debt.",
  durableConcepts:[{"title":"Borrow federal first","body":"Federal loans come with income-driven repayment plans, Public Service Loan Forgiveness, and deferment if you hit a rough patch. Private loans come with none of that — the lender sets the terms, the rate is often variable, and they usually make a parent co-sign. Take every federal dollar you qualify for before you touch a private loan. [Research-backed]"},{"title":"The plans changed — learn the new ones","body":"The SAVE plan is dead: a court vacated it in March 2026 and a new law terminated it for good, so no one can enroll. The new income-driven plan is RAP (Repayment Assistance Plan): payments run 1%–10% of your adjusted gross income, $10 a month minimum, and your balance cannot grow while you are paying. IBR (Income-Based Repayment) still exists for many older loans. PAYE and ICR are being phased out and disappear by July 2028. [Research-backed]"},{"title":"New borrowing caps (July 2026)","body":"Grad PLUS loans are eliminated for new borrowers. Graduate school borrowing is capped at $20,500 a year ($100,000 lifetime); professional school at $50,000 a year ($200,000 lifetime); Parent PLUS at $20,000 a year per student ($65,000 total). Student-loan rules are changing through 2028 — always verify the current options at StudentAid.gov before you decide. [Research-backed]"},{"title":"Scholarships: hunt all three levels","body":"Three levels: your college's own scholarships (ask the financial-aid office — that is their job), community ones (local businesses, civic groups, employers), and national ones (big money, bigger competition). Apply to all three. The small local ones are often less competitive, and deadlines matter more than a perfect essay. [Street-smart]"}],
  practice:{
    prompt:"Maya needs $12,000 more for the year. She qualifies for $12,000 in federal loans, and a lender is offering her a private loan at a lower first-year rate. What should she do? Rules are changing through 2028 — verify current options at StudentAid.gov.",
    choices:[{"id":"fed","label":"Take the federal loans first, skip the private loan.","feedback":"[Research-backed] Federal loans carry income-driven plans, deferment, and PSLF. Private loans carry none of those — a low teaser rate is not worth giving up every safety net."},{"id":"priv","label":"Take the private loan since the first-year rate is lower.","mis":"rate-chasing","feedback":"[Research-backed] A low first-year rate does not beat federal protections. Private rates are often variable and you cannot switch to an income-driven plan later."},{"id":"split","label":"Split it: $6,000 federal, $6,000 private.","mis":"unnecessary-private-debt","feedback":"[Research-backed] She qualifies for the full $12,000 in federal loans. Every private dollar adds risk she does not need to take."},{"id":"wait","label":"Skip college this year and wait for better rates.","mis":"opportunity-cost","feedback":"[Street-smart] Waiting a year costs a year of post-college earning. Federal loans exist precisely so she does not have to time the market."}],
    correct:"fed"
  },
  sources:[{"agency":"Federal Student Aid","title":"Federal Student Aid — official loan information","url":"https://studentaid.gov","lastReviewed":"2026-10-04"}]
});

ADULT_LIFE_MODULES.push({
  id:"shopping-smart",
  title:"Shopping without getting played",
  skill:"shopping-smart",
  summary:"Stores are designed to make you spend more than you planned. Learn to see the traps and walk out with your money.",
  durableConcepts:["Store fatigue: the longer you shop, the worse your decisions get — a list is armor; decide at home, execute at the store.","Coupons live in apps now, but a coupon for something you would not buy anyway is not savings.","Total cost decides: gas detours, shipping thresholds, and shipping math — do the arithmetic before chasing a price.","Unit prices on the shelf tag tell the truth when package sizes try to trick you."],
  practice:{
    prompt:"Liam brings a list and a snack to the grocery store. Maya goes hungry with no list and wanders every aisle. Who is more likely to overspend?",
    choices:[{"id":"maya","label":"Maya — hunger and no plan make impulse buys far more likely","feedback":"[Street-smart] Correct. Hungry + unplanned + long store time is the classic overspend combo. The list is armor: it turns a browsing trip into an execution run."},{"id":"liam","label":"Liam — planning ahead makes him overconfident and careless","feedback":"[Street-smart] Not quite. Liam has the two cheapest defenses: a list and a full stomach. Overconfidence is not the driver here — hunger and fatigue are.","mis":"blames-preparation"},{"id":"same","label":"Both equally — willpower decides, not preparation","feedback":"[Street-smart] Close, but willpower fades as the trip gets longer. That is exactly why the system (list, full stomach) beats the pep talk.","mis":"willpower-trumps-system"},{"id":"luck","label":"Neither — overspending is pure luck","feedback":"[Street-smart] Not luck. Stores are designed around predictable human behavior — longer time in store and hunger raise impulse buying.","mis":"random-spending"}],
    correct:"maya"
  },
  sources:[{"agency":"Federal Trade Commission","title":"Shopping & saving","url":"https://consumer.ftc.gov/","lastReviewed":"2026-10-04"}]
});

ADULT_LIFE_MODULES.push({
  id:"the-gap",
  title:"When money gets real",
  skill:"the-gap",
  summary:"Knowing the right answers is not the same as doing them. The gap between knowing and doing is the real curriculum — here is how to cross it.",
  durableConcepts:["Knowing is not doing: real life adds fatigue, peer pressure, emotions, and surprise bills that no paper exercise shows — that is normal, not failure.","The plan will break on first contact; the skill is noticing fast and adjusting, not executing perfectly.","Trial by fire is expensive: make $5 mistakes on purpose, not $500 ones by accident.","Systems beat willpower: automatic transfers, separate accounts, and removed temptations work when motivation does not."],
  practice:{
    prompt:"Maya aced every quiz in this app. Her first paycheck hits, she is tired and excited, her friends want dinner out, and the car needs a repair. She blows her whole budget in a weekend. What is the right read on this?",
    choices:[{"id":"gap-normal","label":"Normal: real life adds fatigue, pressure, and surprises that paper never shows — now she adjusts her system","feedback":"[Street-smart] Exactly. Knowing is not doing. The win is not a perfect budget — it is noticing fast, logging what triggered the spend, and adjusting the system so next time is cheaper.","correct":true},{"id":"failure","label":"She failed — the quizzes meant nothing if she cannot do it","feedback":"[Street-smart] No. A quiz never had a tired Friday and a broken car in it. One bad weekend is data, not a verdict on her character.","mis":"all-or-nothing-thinking"},{"id":"discipline","label":"She just needs more discipline — willpower would have saved her","feedback":"[Street-smart] Willpower was already spent that week. Every \"just be disciplined\" plan fails eventually; systems — automatic transfers, separate accounts — work when motivation does not.","mis":"willpower-fix"},{"id":"quit","label":"Budgeting does not work for her — she should stop planning","feedback":"[Street-smart] A budget that survives first contact is better than a perfect one that shatters. She does not need a new personality; she needs a sturdier plan.","mis":"abandon-after-one-miss"}],
    correct:"gap-normal"
  },
  sources:[{"agency":"Consumer Financial Protection Bureau","title":"Money as you grow: teens and young adults","url":"https://www.consumerfinance.gov/consumer-tools/","lastReviewed":"2026-10-04"}]
});
