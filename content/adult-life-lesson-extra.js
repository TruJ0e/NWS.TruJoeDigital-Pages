// Extra lesson content for the 9 adult-life lessons (modules 4 & 5).
// Each topic gets one worked example + two additional try questions so these
// lessons teach with the same depth as modules 1-3. Static (non-generated)
// steps: the same question each visit, like worked examples elsewhere.
// Content authored 2026-10-04 to the NWS bar (12-year-old clarity, expert application).
export const ADULT_LESSON_EXTRA = {
 banking: {
  example: {
   h: "Maya checks what she can actually spend",
   story: "<p>Maya has $120 in her checking account. On Friday she swiped her debit card for $30 of groceries — the store authorized the charge, but it has not posted yet, so her balance still shows $120.</p><p>On Saturday she opens her banking app before buying a $100 pair of shoes. Her <em>available</em> balance is $90, not $120.</p>",
   points: [
    "Bank shows: $120. Pending: the $30 grocery authorization.",
    "Available balance = $120 − $30 = $90.",
    "The $100 shoes cost more than the $90 that is actually free.",
    "If she buys them anyway, the bank may cover the shortfall as an overdraft — and her account terms may add a fee.",
    "Takeaway: check the bank's available balance and your own known upcoming obligations before deciding what is safe to spend."
   ]
  },
  trys: [
   {
    q: "Maya's app shows a $90 balance and a $60 pending debit-card charge from gas she bought yesterday. Her sister says \"you still have $90 — buy the $80 concert ticket.\" What should Maya do?",
    choices: [
     {
      label: "Hold off — her available balance is only $30, so the $80 ticket would overdraft her account.",
      ok: true
     },
     {
      label: "Buy the ticket; the $90 balance is hers to spend however she wants.",
      ok: false,
      mis: "spend-before-obligation"
     },
     {
      label: "Check tomorrow; if the balance still says $90, the $60 was a mistake and she can buy it.",
      ok: false,
      mis: "pending-is-gone"
     },
     {
      label: "Buy it — banks waive overdraft fees when the shortfall is small.",
      ok: false,
      mis: "small-shortfall-free"
     }
    ],
    hint: "Which number counts money that is already spoken for?",
    good: "Exactly — available balance is what is left after pending charges. Waiting protects the gas payment and avoids an overdraft fee.",
    bad: "Look again at which money is free to spend — the $90 includes a charge that has not posted yet.",
    why: "Pending transactions reduce what you can safely spend even before they post."
   },
   {
    q: "Jordan has $35 in checking. His $30 subscription auto-posts in the morning, then he buys a $12 sandwich with his debit card at lunch. His bank covers overdrafts at $25 per transaction. What happens?",
    choices: [
     {
      label: "The subscription leaves $5. The $12 sandwich takes the account to −$7; if the bank pays it, one $25 overdraft fee applies under this scenario, so he must repay $32 to get back to $0.",
      ok: true
     },
     {
      label: "Both transactions trigger separate $25 overdraft fees, even though the subscription itself did not overdraw the account.",
      ok: false,
      mis: "declined-means-free"
     },
     {
      label: "No fee applies because the account was positive before lunch.",
      ok: false,
      mis: "one-fee-per-day"
     },
     {
      label: "The bank pays both and it is fine — overdraft is a free backup plan for tight weeks.",
      ok: false,
      mis: "overdraft-as-backup"
     }
    ],
    hint: "Count each transaction that lands when the money is short.",
    good: "Right — the $30 subscription does not overdraw the account. The $12 sandwich is the transaction that creates the $7 shortfall, so this hypothetical produces one $25 fee, not two.",
    bad: "Follow the balance in order: $35 − $30 = $5. Only the next $12 transaction takes the account below zero.",
    why: "An overdraft fee is tied to the account terms and the transaction that overdraws the account. In this scenario, the subscription leaves a positive balance; the sandwich creates the overdraft."
   }
  ]
 },
 "first-job": {
  example: {
   h: "Maya's first paycheck math",
   story: "<p>Maya's first job pays $400 every two weeks. When she was hired she filled out a W-4, which tells her employer how much tax to withhold. Her first pay stub shows $400 gross, minus $48 in taxes and deductions.</p><p>Her take-home pay — the amount that actually lands in her account — is $352.</p>",
   points: [
    "Gross pay: $400 (before anything is taken out).",
    "Withheld: $48 (taxes + deductions).",
    "Take-home = $400 − $48 = $352.",
    "She budgets with $352, not $400.",
    "Takeaway: gross pay is the headline; take-home pay is what you actually have to spend."
   ]
  },
  trys: [
   {
    q: "It is January and Maya gets a W-2 from the fast-food place where she worked last year. Her friend tells her to fill it out like a job application. What is the W-2 actually for?",
    choices: [
     {
      label: "It reports last year's wages and taxes withheld, and she uses it to file her tax return.",
      ok: true
     },
     {
      label: "It is the form new hires fill out to set their tax withholding.",
      ok: false,
      mis: "w4-is-w2"
     },
     {
      label: "It is proof she is allowed to work; she files it with her employer.",
      ok: false,
      mis: "w2-is-work-permit"
     },
     {
      label: "It shows what she will earn this year so she can plan her budget.",
      ok: false,
      mis: "w2-predicts-future"
     }
    ],
    hint: "Think about the timing — which form comes at the START of a job, and which arrives after the year ends?",
    good: "Right. The W-4 is filled out when you start a job and sets withholding; the W-2 arrives in January reporting last year's wages for your tax return.",
    bad: "Check the timing: one form is filled out when you start working, the other shows up after the tax year is over. Which did she receive?",
    why: "The W-4 sets withholding at job start; the W-2 reports prior-year wages for filing your tax return."
   },
   {
    q: "Liam keeps his pay stubs crumpled in his backpack and his W-2 somewhere in his room. In January he needs them for his tax return. What is the most reliable habit?",
    choices: [
     {
      label: "Put every pay stub and tax document in one predictable place the day it arrives — then check the current IRS instructions when filing.",
      ok: true
     },
     {
      label: "Throw out pay stubs; the W-2 will have everything he needs.",
      ok: false,
      mis: "paystubs-dont-matter"
     },
     {
      label: "Ask coworkers to help guess last year's totals if a document is missing.",
      ok: false,
      mis: "estimate-is-fine"
     },
     {
      label: "Keep them for a week, then recycle — the employer keeps copies anyway.",
      ok: false,
      mis: "documents-dont-matter"
     }
    ],
    hint: "When it is January, what would future-you wish past-you had done?",
    good: "Exactly — one folder or drawer from day one beats a backpack search in January. And use that year's IRS instructions, since rules change.",
    bad: "Think about what makes tax time easy: can you count on finding every document when you need it?",
    why: "Keep tax documents in a predictable place from the start and follow current-year IRS instructions when filing."
   }
  ]
 },
 credit: {
  example: {
   h: "Maya's first credit card bill",
   story: "<p>Maya gets a credit card with a $500 limit. In March she charges $120 and pays the full $120 by the due date: no finance charges, and her on-time payment is reported.</p><p>In April she charges $120 again but pays only $35, carrying $85. Using a simplified classroom estimate of 24% APR ÷ 12, one month of interest on $85 is about $1.70. Real card interest commonly uses a daily periodic rate and the account's actual balance history.</p>",
   points: [
    "$120 charged, paid in full by the due date = $0 in finance charges.",
    "Paying only the $35 minimum leaves $85 borrowed at about 24% APR.",
    "Simplified estimate: $85 × 24% ÷ 12 ≈ $1.70 for one month; the real statement can differ because card issuers use the agreement's interest method.",
    "Both months report an on-time payment — only April added interest.",
    "Takeaway: carrying a balance builds interest, not credit. Paying in full avoids finance charges and still builds your history."
   ]
  },
  trys: [
   {
    q: "Devon's uncle says: \"Carry a balance every month or your credit won't improve.\" Devon charges $60 and plans to pay only $20 of it to \"build credit.\" Is the uncle right?",
    choices: [
     {
      label: "No — what builds his score is on-time payments and low balances. The unpaid $40 just costs him interest.",
      ok: true
     },
     {
      label: "Yes — carrying a balance shows lenders he uses credit, which raises his score faster.",
      ok: false,
      mis: "balance-builds-credit"
     },
     {
      label: "Only if the balance is over $100; small balances do not count toward his history.",
      ok: false,
      mis: "balance-size-myth"
     },
     {
      label: "Yes — paying some interest proves he can handle debt, so leaving part of the $60 unpaid should help more than paying in full.",
      ok: false,
      mis: "credit-as-income"
     }
    ],
    hint: "What does a lender actually want to see: money paid on time, or interest paid?",
    good: "Right — carrying interest-bearing debt is not required to build credit. On-time payment history and lower revolving balances can help without deliberately paying interest.",
    bad: "Ask what the score rewards: does it track the interest he pays, or the fact that he pays on time?",
    why: "Paying on time can build positive history without intentionally carrying an interest-bearing balance. Exact score effects vary by scoring model and the information reported."
   },
   {
    q: "Priya's card has a $600 limit. Her statement closes with a $240 balance. She wonders how that looks to credit models. What is her utilization, and what should she know about it?",
    choices: [
     {
      label: "$240 ÷ $600 = 40%. Lower reported balances generally mean lower utilization; there is no universal 30% pass/fail cutoff shared by every scoring model.",
      ok: true
     },
     {
      label: "$240 ÷ $600 = 40%, and 40% is automatically bad in every credit-scoring model.",
      ok: false,
      mis: "thirty-percent-magic"
     },
     {
      label: "$240 ÷ $600 = 240% utilization — she is over her limit.",
      ok: false,
      mis: "utilization-math-error"
     },
     {
      label: "Utilization only counts cash advances, so her $240 in purchases does not matter.",
      ok: false,
      mis: "purchases-dont-count"
     }
    ],
    hint: "Divide the balance by the limit — then treat utilization as a continuum, not a magic 30% line.",
    good: "Right — utilization is 40%. Lower reported revolving balances generally reduce utilization, but scoring models do not share one universal 30% cutoff.",
    bad: "Run the division: $240 ÷ $600 = 40%. Then avoid turning 30% into a universal rule — lower utilization is generally better, but exact scoring effects vary.",
    why: "Utilization is balance divided by limit. Lower revolving utilization generally helps, while the exact scoring impact and reporting timing vary by model and issuer."
   }
  ]
 },
 scams: {
  example: {
   h: "Maya's $600 landlord text",
   story: "<p>Maya got a text from an unknown number claiming to be her building's leasing office: a new payment system meant she had to send her $600 security deposit in Bitcoin within 2 hours or lose her unit, with a link to confirm. Instead of rushing, Maya ran her stop-and-verify routine.</p><p>She lost nothing — and the scammer got nothing.</p>",
   points: [
    "Stop: a 2-hour deadline is manufactured pressure, not a real emergency — urgency is the tactic.",
    "Red flag: Bitcoin, like gift cards and wire transfers, is nearly impossible to reverse — exactly why scammers demand it.",
    "Verify through a channel she knows: she called her landlord's number from her signed lease, not the link in the text.",
    "Report: her landlord confirmed he sent nothing, so she reported the number as fraud.",
    "Takeaway: urgency plus an irreversible payment demand means stop and verify through a contact you trust — $600 kept, $0 sent."
   ]
  },
  trys: [
   {
    q: "A caller says Maya owes $120 and must pay with gift cards today. What is the real reason gift cards, crypto, and wire transfers are scam warning signs?",
    choices: [
     {
      label: "Once the money is sent, it is almost impossible to get back — and scammers count on that.",
      ok: true
     },
     {
      label: "They charge the highest fees, so the victim loses even more money.",
      ok: false,
      mis: "red-flag-means-fees"
     },
     {
      label: "They are warning signs only when the caller also sounds suspicious; the payment method itself does not change recovery risk.",
      ok: false,
      mis: "unfamiliar-means-suspicious"
     },
     {
      label: "Gift cards are the real red flag; crypto and wire transfers are safe because banks handle them.",
      ok: false,
      mis: "crypto-and-wire-are-safe"
     }
    ],
    hint: "Think about what happens AFTER the payment goes through — can it be undone?",
    good: "Exactly. Recovery is the key issue: gift cards, cryptocurrency, and wire transfers can be difficult or impossible to reverse after the recipient gets the value, which is why scammers favor them.",
    bad: "Not quite — focus on recovery. If the payment turns out to be fraudulent, how easy is it to stop, reverse, or recover the money through the real provider?",
    why: "Scam-proof your payments by asking one question first: if this goes wrong, can I reverse it?"
   },
   {
    q: "Marcus already sent $200 in gift cards to a scammer before realizing it. What should he do now?",
    choices: [
     {
      label: "Contact the gift-card issuer or other payment provider immediately to ask about stopping or recovering the payment, then report the fraud.",
      ok: true
     },
     {
      label: "Call the number the scammer gave him and demand a refund.",
      ok: false,
      mis: "their-number-verifies"
     },
     {
      label: "Wait a week to see if the scammer sends the money back on their own.",
      ok: false,
      mis: "wait-and-hope"
     },
     {
      label: "There is nothing anyone can do, so delete the messages and forget about it.",
      ok: false,
      mis: "too-late-to-act"
     }
    ],
    hint: "Speed matters here — but through whose channels?",
    good: "Right. Fast action through the company that handled the payment is the best recovery step; then report the scam through official channels.",
    bad: "A recovery step still exists: contact the company that actually handled the payment using a trusted channel, then report the fraud. Do not rely on the scammer's contact information.",
    why: "If money goes to a scammer, contact the payment provider or gift-card issuer immediately. Recovery is not guaranteed, but speed matters and reporting creates a record."
   }
  ]
 },
 renting: {
  example: {
   h: "Maya's first apartment math",
   story: "<p>Maya found a place listed at $950 a month and almost budgeted exactly $950. Then she read the lease like a checklist and did the real math.</p><p>At signing she owed the first month, a full month's deposit, and a $45 application fee. Every month after that, the rent was only one line of a bigger bundle.</p>",
   points: [
    "Signing day: $950 first month + $950 deposit + $45 application fee = $1,945 to get the keys.",
    "Monthly bundle: $950 rent + $120 utilities + $60 internet + $18 renters insurance = $1,148.",
    "She verified the listing first — confirming who actually controls the unit before sending any money or info.",
    "She checked local guidance for her state rules: deposit return timelines and notice periods come from the lease plus authoritative rules, not the ad.",
    "Takeaway: advertised rent is a headline; the bundle — upfront plus monthly — is the real price."
   ]
  },
  trys: [
   {
    q: "Maya is signing for an apartment with $950/month rent. The lease says: security deposit equals one month's rent, a $45 application fee, and the first month's rent is due at signing. How much money does she need on signing day?",
    choices: [
     {
      label: "$1,945 — first month ($950) + deposit ($950) + application fee ($45).",
      ok: true
     },
     {
      label: "$995 — just the first month plus the application fee.",
      ok: false,
      mis: "upfront-is-all"
     },
     {
      label: "$1,900 — first month plus deposit; the small application fee does not really count.",
      ok: false,
      mis: "small-fees-dont-count"
     },
     {
      label: "$2,895 — first month, deposit, and last month's rent just in case.",
      ok: false,
      mis: "always-pay-last-month"
     }
    ],
    hint: "Add up every dollar the lease requires before the keys change hands — count each line item once.",
    good: "Correct. Move-in math is a checklist: first month + deposit + every fee. The sticker rent ($950) is less than half the real signing-day total ($1,945).",
    bad: "Check the lease line by line — the total is every upfront cost added together, not just one or two of them.",
    why: "Housing bundles upfront costs together: first month, deposit, and fees are all due before you get the keys."
   },
   {
    q: "A listing advertises $900/month rent. Maya's lease would add: average utilities $120, internet $60, renters insurance $18, and parking $40. What is her real monthly housing cost?",
    choices: [
     {
      label: "$1,138 — the $900 rent plus every recurring charge in the lease.",
      ok: true
     },
     {
      label: "$900 — the advertised rent is the full monthly cost.",
      ok: false,
      mis: "sticker-rent"
     },
     {
      label: "$1,020 — rent plus utilities; internet and insurance are optional extras.",
      ok: false,
      mis: "optional-charges-dont-count"
     },
     {
      label: "$900, because utilities and parking are always included in rent.",
      ok: false,
      mis: "everything-is-included"
     }
    ],
    hint: "The ad shows one number; the lease shows all of them. Budget from which one?",
    good: "Right — $900 + $120 + $60 + $18 + $40 = $1,138. Advertised rent is the headline, not the budget; the true monthly bundle is what your paycheck has to cover.",
    bad: "The advertised rent is only one line of the bill. Add every recurring charge the lease assigns you and see how the number changes.",
    why: "True monthly housing cost = rent + every recurring charge the lease assigns to you — budget the bundle, not the headline."
   }
  ]
 },
 utilities: {
  example: {
   h: "Maya's utility setup",
   story: "<p>Maya's lease said water and trash were included, but electric and gas were on her to set up. Before move-in she called the provider, put the account in her name, asked for the due date, and learned the average winter bill ran about $150.</p><p>Her bills came in at $74 in the fall and $163 in January. When a text demanded $147 today or we shut you off, she checked her real account — nothing due — and deleted the text.</p>",
   points: [
    "She checked the lease first: which utilities are included vs. which accounts she must set up herself.",
    "She confirmed the provider, the due date, and that the account was in her name before move-in.",
    "She budgeted $160 a month with a buffer instead of one exact number — January's $163 was already covered.",
    "She treated the shutoff text as a scam and verified through her real account, not the text's link.",
    "Takeaway: confirm amount, due date, provider, and responsibility before move-in — then budget with a buffer and verify every surprise demand."
   ]
  },
  trys: [
   {
    q: "Priya's electric bill was $75 in October, $168 in January, and $82 in April. She can get a longer billing history if needed. What is the strongest budgeting approach?",
    choices: [
     {
      label: "Use the best available history — ideally a full year — to estimate a normal monthly amount, then keep a separate utility buffer for seasonal spikes.",
      ok: true
     },
     {
      label: "$75 — the lowest bill is her normal bill, so budget that every month.",
      ok: false,
      mis: "best-month-is-normal"
     },
     {
      label: "Bills vary so wildly that budgeting is pointless — just pay whatever shows up.",
      ok: false,
      mis: "variable-means-unplannable"
     },
     {
      label: "Use exactly $108 every month because the three-bill average guarantees the future bill.",
      ok: false,
      mis: "exact-average-no-buffer"
     }
    ],
    hint: "One exact number breaks when the weather does not cooperate — what would a buffer protect?",
    good: "Exactly. Variable utilities call for a reasonable estimate plus a buffer. More history improves the estimate; low-cost months can refill the buffer for high-cost months.",
    bad: "A single exact number from only three bills is fragile. Use more history when available, estimate the normal range, and keep a buffer for the high months.",
    why: "Utilities vary by season and usage. The goal is not to guess one perfect bill; it is to estimate from history and carry enough buffer that a high month does not break the plan."
   },
   {
    q: "Three roommates split a $180 electric bill three ways. The account is in Jaden's name. One roommate offers to collect everyone's $60 share and pay the whole bill himself. What is the trap?",
    choices: [
     {
      label: "If the roommate never pays, Jaden still owes the utility $180 — the account holder is responsible no matter who promised what.",
      ok: true
     },
     {
      label: "Once Jaden sends his $60 share, he has done his part and is fully protected.",
      ok: false,
      mis: "paid-share-means-done"
     },
     {
      label: "The trap is splitting equally — utilities must always be split by who used the most.",
      ok: false,
      mis: "equal-split-is-the-trap"
     },
     {
      label: "Venmo payments do not count as proof, so Jaden should pay his share in cash instead.",
      ok: false,
      mis: "venmo-isnt-proof"
     }
    ],
    hint: "Whose name is on the account — and who does the utility company actually know?",
    good: "Right. The utility only knows the account holder: Jaden owes the full $180, plus late fees, if his roommate flakes. Track due dates yourself and pay the provider directly.",
    bad: "The utility company does not know about the roommate arrangement — it only knows one name. Follow that thread.",
    why: "Whoever's name is on the utility account is responsible for the full bill — pay the provider directly and track due dates yourself."
   }
  ]
 },
 groceries: {
  example: {
   h: "Maya plans before she shops",
   story: "<p>Maya gets $120 a month for food at her college dorm. Before making a list, she checks her fridge, freezer, and shelf: she still has rice, frozen chicken, canned beans, and a half-used bottle of oil. She plans five easy dinners from what is already there, then lists only what is missing: vegetables, eggs, milk, and tortillas. Total at the store: $64.</p><p>Her roommate shops without a list and spends $110 in one trip — then throws out wilted lettuce and moldy bread she never had a plan for. Maya ends the month with $56 still unspent in her food budget and zero waste.</p>",
   points: [
    "Maya checked what she had FIRST — that became her starting point, not her memory.",
    "She planned actual meals around the chicken, rice, and beans, so every item on her list had a job.",
    "The list stopped impulse buys: she bought only the gaps, not duplicates.",
    "The math: $120 - $64 = $56 remaining in the food budget. It becomes savings only if she deliberately moves it to savings.",
    "Takeaway: a list built from your shelves costs less than a list built from memory."
   ]
  },
  trys: [
   {
    q: "Luis finds a 12-pack of yogurt at $0.50 each (unit price $0.50/cup) versus a 4-pack at $0.63/cup. He always eats 4 yogurts before they expire and the rest usually goes bad. Which buy actually saves money?",
    choices: [
     {
      label: "The 4-pack — he pays $2.52 and uses all of it",
      ok: true
     },
     {
      label: "The 12-pack — the unit price is lower",
      ok: false,
      mis: "unit-price-only"
     },
     {
      label: "Buy the 12-pack and eat faster so none spoils",
      ok: false,
      mis: "forcing-consumption"
     },
     {
      label: "Split the 12-pack with a friend without asking first",
      ok: false,
      mis: "friend-math"
     }
    ],
    hint: "Which dollars actually turn into eaten food?",
    good: "Exactly — real savings count only the food you eat. The 4-pack costs $2.52 with zero waste.",
    bad: "Not quite. Re-read the scenario: how much of the 12-pack becomes food he actually eats?",
    why: "A lower unit price is not savings if the extra quantity goes in the trash — compare the cost of what you will actually use."
   },
   {
    q: "Priya is building her weekly grocery list from memory. She remembers buying pasta last month but is not sure any is left. What should she do before she shops?",
    choices: [
     {
      label: "Check the pantry first — only list what is actually missing",
      ok: true
     },
     {
      label: "Buy the pasta anyway to be safe",
      ok: false,
      mis: "memory-inventory"
     },
     {
      label: "Buy two boxes in case the first runs out",
      ok: false,
      mis: "sale-not-needed"
     },
     {
      label: "Skip the check — checking takes longer than the drive to the store",
      ok: false,
      mis: "skip-inventory-time"
     }
    ],
    hint: "Memory is free, but how reliable is it?",
    good: "Right — a 60-second pantry check beats buying duplicates. The list has to start from what is actually on the shelf.",
    bad: "Close, but think about what happens when the pasta turns out to be already there. What did that trip really cost?",
    why: "Shopping lists built from memory cause double-buys; a quick inventory check is the cheapest savings tool there is."
   }
  ]
 },
 transportation: {
  example: {
   h: "Maya prices the whole month, not the ride",
   story: "<p>Maya needs to get to her part-time job 6 miles away, 5 days a week. A ride-hailing trip costs $14 each way — she did it twice and figured that was her plan. Then she ran the month: 2 rides x 20 workdays = 40 rides x $14 = $560.</p><p>The bus pass costs $75 a month, the ride takes 25 minutes longer, and she can use it for errands too. She takes the bus to work ($75) and keeps ride-hailing for late nights only — about $84 more a month. New total: $159. She keeps over $400 a month versus the all-rides plan.</p>",
   points: [
    "Maya stopped pricing one trip and priced the whole month: $14 x 40 = $560.",
    "The bus pass is a flat $75 no matter how many rides — the more she rides, the cheaper each ride gets.",
    "She kept ride-hailing only where it actually earns its price: late nights when the bus is not running.",
    "The math: $560 - ($75 + $84) = $401 saved per month.",
    "Takeaway: compare monthly totals, not per-trip prices — the cheapest ride is rarely the cheapest month."
   ]
  },
  trys: [
   {
    q: "Dre is offered a used car for $2,800. Insurance is $110/mo, gas about $90/mo. A friend says \"it is a steal — no car payment!\" What is the risk Dre is missing?",
    choices: [
     {
      label: "Surprise repairs — a $900 transmission bill can land in month two and he has no repair savings",
      ok: true
     },
     {
      label: "The gas — $90/mo is too much for any used car",
      ok: false,
      mis: "gas-blame"
     },
     {
      label: "Nothing — with no car payment the car is basically free",
      ok: false,
      mis: "no-payment-means-free"
     },
     {
      label: "Repairs do not belong in the transportation budget because the $2,800 purchase price already covered the car",
      ok: false,
      mis: "cosmetic-value"
     }
    ],
    hint: "Separate what he can predict from what he cannot.",
    good: "Exactly — the $200/month insurance-and-gas cost is known; the irregular repair cost is the trap. A low purchase price can still produce a high total transportation cost.",
    bad: "Think again — which cost in this story can show up without warning and wreck the budget?",
    why: "Transportation cost has two halves: predictable recurring costs and irregular repair/emergency costs — a cheap car looks cheap only until the first surprise repair."
   },
   {
    q: "Sofia compares two ways to get to campus: ride-hailing at $12 per trip, 20 trips a month, or a $95 monthly bus pass. Which statement is true?",
    choices: [
     {
      label: "The bus pass is cheaper: $95 vs $240 for rides",
      ok: true
     },
     {
      label: "Ride-hailing is cheaper because each trip is only $12",
      ok: false,
      mis: "per-trip-trap"
     },
     {
      label: "They cost the same since both get her there",
      ok: false,
      mis: "arrival-equals-cost"
     },
     {
      label: "The bus is cheaper only if she rides more than 30 times",
      ok: false,
      mis: "break-even-misread"
     }
    ],
    hint: "Multiply the per-trip price by the month.",
    good: "Right — 20 x $12 = $240, so the $95 pass wins by $145 a month. The per-trip price hides the monthly total.",
    bad: "Hold on — do the multiplication first. What does 20 trips at $12 each actually add up to?",
    why: "Cheaper per-trip is not automatically cheaper per-month — always multiply out the recurring total before deciding."
   }
  ]
 },
 "health-insurance": {
  example: {
   h: "Maya compares total cost, not the sticker price",
   story: "<p>Maya compares two hypothetical in-network plans for a year when she expects one covered surgery with an $8,000 allowed cost. Plan A costs $95/month, has a $7,500 deductible, 20% coinsurance after the deductible, and an $8,700 out-of-pocket maximum. Plan B costs $310/month, has a $1,200 deductible, 20% coinsurance after the deductible, and a $4,500 out-of-pocket maximum.</p><p>This is a simplified teaching example: assume the entire $8,000 is covered, in network, and subject to the stated deductible and coinsurance. Premiums do not count toward the out-of-pocket maximum.</p>",
   points: [
    "Plan A premiums: $95 × 12 = $1,140. Care cost sharing: $7,500 deductible + 20% of the remaining $500 ($100) = $7,600. Estimated yearly total = $8,740.",
    "Plan B premiums: $310 × 12 = $3,720. Care cost sharing: $1,200 deductible + 20% of the remaining $6,800 ($1,360) = $2,560. Estimated yearly total = $6,280.",
    "Neither example reaches its out-of-pocket maximum on this one claim, so the cap does not change these totals.",
    "For this specific scenario, Plan B costs about $2,460 less for the year even though its monthly premium is higher.",
    "Takeaway: compare premiums + expected cost sharing + network/coverage rules. A deductible by itself is never the full yearly cost."
   ]
  },
  trys: [
   {
    q: "Jamal picks the plan with the lowest monthly premium: $0/mo, $8,000 deductible, $9,000 out-of-pocket max. He says \"my insurance costs me nothing.\" What is he getting wrong?",
    choices: [
     {
      label: "A $0 premium does not mean $0 medical cost — the deductible, copays/coinsurance, coverage rules, and out-of-pocket maximum still matter when he uses care.",
      ok: true
     },
     {
      label: "The $0 premium is enough to compare plans; the deductible only matters after the insurer has already paid most of the bill.",
      ok: false,
      mis: "premium-is-total"
     },
     {
      label: "The $8,000 deductible is automatically the most he can spend for the whole year, including premiums and any out-of-network care.",
      ok: false,
      mis: "avoid-care"
     },
     {
      label: "The $9,000 out-of-pocket maximum means every medical charge counts toward the cap, even services the plan does not cover.",
      ok: false,
      mis: "oop-max-instant"
     }
    ],
    hint: "Separate the price of keeping coverage from the cost sharing that can apply when care is used.",
    good: "Exactly — $0 premium only describes the recurring premium. Covered care can still create deductible, copay, or coinsurance costs, subject to the plan's rules and out-of-pocket limit.",
    bad: "Not quite. A premium, deductible, cost sharing, network rules, and the out-of-pocket maximum answer different questions. You need more than the premium to estimate yearly cost.",
    why: "The premium is one part of total cost. Deductible, copays/coinsurance, covered-service rules, network status, and the out-of-pocket maximum can all affect what the member pays."
   },
   {
    q: "Elena has $40,000 in covered, in-network allowed costs. Her plan has a $1,500 deductible, 20% coinsurance after the deductible, and a $6,000 out-of-pocket maximum. Assume all of this cost sharing counts toward that maximum. About how much does she pay for covered care?",
    choices: [
     {
      label: "$6,000 — the out-of-pocket max caps her cost sharing for the year",
      ok: true
     },
     {
      label: "$9,200 — deductible plus 20% of $40,000",
      ok: false,
      mis: "coinsurance-no-cap"
     },
     {
      label: "$1,500 — only the deductible, then the plan pays all",
      ok: false,
      mis: "deductible-ends-cost"
     },
     {
      label: "$8,000 — the out-of-pocket maximum is a target amount she must pay before the insurer contributes",
      ok: false,
      mis: "bill-vanishes"
     }
    ],
    hint: "Do the deductible + coinsurance math first, then check the cap.",
    good: "Right — $1,500 deductible + 20% of the remaining $38,500 would be $9,200, but the $6,000 out-of-pocket maximum caps covered in-network cost sharing at $6,000 for this simplified scenario. Premiums are separate.",
    bad: "Re-do the math: deductible + coinsurance first, then ask whether the plan puts a ceiling on that number.",
    why: "The out-of-pocket maximum is a yearly ceiling on covered in-network cost sharing. After that limit, the plan pays 100% of covered in-network benefits for the rest of the plan year; premiums and non-covered or out-of-network costs may sit outside that limit."
   }
  ]
 }
};
