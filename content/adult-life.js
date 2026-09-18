export const ADULT_LIFE_REVIEW = {
  version:'2026.09-v1',
  lastReviewed:'2026-09-16',
  claimBoundary:'Educational practice only. NWS does not provide individualized financial, tax, legal, insurance, medical, or housing advice.'
};

const source=(agency,title,url,{reviewRequired=false,jurisdictionSpecific=false}={})=>({agency,title,url,lastReviewed:ADULT_LIFE_REVIEW.lastReviewed,reviewRequired,jurisdictionSpecific});

export const ADULT_LIFE_MODULES = [
  {
    id:'banking',
    title:'Banking & overdrafts',
    skill:'banking',
    summary:'Know what is actually available, what can still post, and what happens when an account does not have enough money.',
    durableConcepts:[
      'A checking-account balance can change when pending or scheduled transactions post.',
      'An overdraft occurs when there is not enough money for a transaction and the financial institution pays it anyway; repayment and fees may follow.',
      'Low-balance alerts and tracking scheduled bills can reduce accidental overdrafts.',
      'Overdraft options and fees vary by institution. Compare the actual account terms rather than assuming every bank works the same way.'
    ],
    practice:{
      prompt:'Your app shows $45. A $40 utility autopay is scheduled for tomorrow, and you are considering a $20 purchase today. What should you do first?',
      choices:[
        {id:'check-obligations',label:'Protect the scheduled $40 first and check what will remain.',feedback:'This uses the NWS decision routine: account for a known required payment before treating the visible balance as flexible money.'},
        {id:'spend-visible',label:'Spend the $20 because the app currently shows $45.',feedback:'The displayed balance does not erase a known scheduled payment. A pending obligation still matters.'},
        {id:'assume-overdraft',label:'Spend it and assume overdraft coverage will handle the bill.',feedback:'Overdraft coverage can involve fees or borrowing. It is not extra income.'}
      ],
      correct:'check-obligations'
    },
    sources:[
      source('Consumer Financial Protection Bureau','Bank accounts and services','https://www.consumerfinance.gov/consumer-tools/bank-accounts/'),
      source('Consumer Financial Protection Bureau','Know your overdraft options','https://www.consumerfinance.gov/consumer-tools/bank-accounts/know-your-overdraft-options/')
    ]
  },
  {
    id:'credit',
    title:'Credit & borrowing',
    skill:'credit',
    summary:'Treat credit as borrowed money with future consequences, not as an increase in available income.',
    durableConcepts:[
      'A credit report describes credit activity and account history; a credit score is a model-based estimate derived from report information.',
      'There is not one universal credit score. Different models, products, and data can produce different scores.',
      'On-time payment history, how close balances are to credit limits, credit-history length, and recent applications can affect scores.',
      'Carrying a credit-card balance is not required to build credit; paying in full can avoid finance charges while still establishing payment history.',
      'A percentage such as “30% utilization” is guidance, not a magic threshold shared by every scoring model.'
    ],
    practice:{
      prompt:'A $300 purchase will not fit your current plan. A credit card would let you buy it today. What is the financially accurate way to classify the card?',
      choices:[
        {id:'borrowed',label:'Borrowed money that creates a future payment obligation.',feedback:'Correct. Credit changes when you pay, not whether the purchase ultimately has a cost.'},
        {id:'income',label:'Extra income because the card increases what I can spend today.',feedback:'A credit limit is not income. Using it creates debt that must be repaid.'},
        {id:'savings',label:'Savings because I can delay paying for the purchase.',feedback:'Delaying payment does not turn a purchase into savings and may add interest or fees.'}
      ],
      correct:'borrowed'
    },
    sources:[
      source('Consumer Financial Protection Bureau','Credit reports and scores','https://www.consumerfinance.gov/consumer-tools/credit-reports-and-scores/'),
      source('Consumer Financial Protection Bureau','Understand your credit score','https://www.consumerfinance.gov/consumer-tools/credit-reports-and-scores/understand-your-credit-score/'),
      source('Consumer Financial Protection Bureau','How to rebuild your credit','https://www.consumerfinance.gov/consumer-tools/credit-reports-and-scores/how-to-rebuild-your-credit/')
    ]
  },
  {
    id:'scams',
    title:'Scams & payment safety',
    skill:'safety',
    summary:'Use a repeatable stop-and-verify routine when someone creates urgency around money.',
    durableConcepts:[
      'Urgency, fear, secrecy, or pressure to pay immediately are reasons to slow down and verify.',
      'Requests for gift cards, cryptocurrency, wire transfers, or other hard-to-reverse payments are common scam warning signs.',
      'Verify through a contact method you already know is legitimate—not a phone number, link, or account supplied by the person demanding payment.',
      'If money was sent to a scammer, contact the payment provider or financial institution quickly and report the fraud.'
    ],
    practice:{
      prompt:'A caller says your electricity will be shut off in 30 minutes unless you pay with a gift card. What is the best first action?',
      choices:[
        {id:'verify',label:'End the contact and call the utility using the number on a real bill or its known website.',feedback:'Correct. Separate the verification step from the person creating the urgency.'},
        {id:'pay',label:'Pay quickly so the power stays on, then verify afterward.',feedback:'Urgent gift-card payment is a major scam signal. Paying first can make recovery difficult.'},
        {id:'share',label:'Give account information so the caller can prove the balance.',feedback:'Do not provide financial/account information to an unexpected caller. Verify independently.'}
      ],
      correct:'verify'
    },
    sources:[
      source('Federal Trade Commission','Scammers Pretend To Be Your Utility Company','https://consumer.ftc.gov/articles/scammers-pretend-be-your-utility-company'),
      source('Federal Trade Commission','What To Do if You Were Scammed','https://consumer.ftc.gov/articles/what-do-if-you-were-scammed'),
      source('Federal Trade Commission','Rental and Housing Scams','https://consumer.ftc.gov/all-scams/rental-housing-scams')
    ]
  },
  {
    id:'first-job',
    title:'First job: paycheck & tax paperwork',
    skill:'paperwork',
    summary:'Recognize the documents and sequence without pretending a classroom simulation can calculate an individual tax return.',
    durableConcepts:[
      'Gross pay and take-home pay are different because taxes and other deductions may be withheld.',
      'Form W-4 is generally completed when starting a job so an employer can determine federal income-tax withholding.',
      'Form W-2 reports prior-year wages and withholding and is used when preparing a tax return.',
      'Keep employment/tax documents in a predictable place and use current IRS instructions for filing questions.'
    ],
    practice:{
      prompt:'You are planning next month using your first paycheck. Which number belongs in the amount-available step?',
      choices:[
        {id:'take-home',label:'The take-home amount actually deposited or paid to you.',feedback:'Correct. Budget from money actually available after deductions, not the larger gross-pay figure.'},
        {id:'gross',label:'Gross wages before any deductions.',feedback:'Gross pay helps describe earnings, but it is not the same as the amount available to spend after withholding/deductions.'},
        {id:'annual',label:'The annual salary divided by twelve, no matter how payroll works.',feedback:'Pay frequency, withholding, and deductions matter. Use the actual take-home amount for the immediate plan.'}
      ],
      correct:'take-home'
    },
    sources:[
      source('Internal Revenue Service','Your first job','https://www.irs.gov/individuals/your-first-job',{reviewRequired:true})
    ]
  },
  {
    id:'health-insurance',
    title:'Health insurance & medical costs',
    skill:'health-costs',
    summary:'A premium is only one part of health-plan cost. Practice recognizing the major cost-sharing terms.',
    durableConcepts:[
      'Premium: the recurring amount paid to keep coverage.',
      'Deductible: an amount you may have to pay for covered services before the plan starts paying for many services, subject to plan rules.',
      'Copayment: a fixed amount for certain covered services under the plan.',
      'Coinsurance: a percentage of the allowed cost you pay for certain covered services.',
      'Out-of-pocket maximum: a plan-year limit on certain covered in-network cost sharing; premiums and some other costs are not included.',
      'Compare estimated total cost and plan details—not just the monthly premium.'
    ],
    practice:{
      prompt:'Plan A has the lowest monthly premium. Does that automatically make it the least expensive plan for the year?',
      choices:[
        {id:'no-total',label:'No. Compare premiums plus expected deductible/copay/coinsurance and plan coverage.',feedback:'Correct. A low premium can come with higher cost sharing; actual needs and plan rules matter.'},
        {id:'yes-premium',label:'Yes. The premium is the only cost that matters.',feedback:'Premium is only one part of total health-plan cost.'},
        {id:'ignore-network',label:'Yes, as long as I ignore whether providers are in network.',feedback:'Network rules can materially affect what you pay and whether costs count toward plan limits.'}
      ],
      correct:'no-total'
    },
    sources:[
      source('HealthCare.gov','Premium glossary','https://www.healthcare.gov/glossary/premium/',{reviewRequired:true}),
      source('HealthCare.gov','Deductible glossary','https://www.healthcare.gov/glossary/deductible/',{reviewRequired:true}),
      source('HealthCare.gov','Copayment glossary','https://www.healthcare.gov/glossary/co-payment/',{reviewRequired:true}),
      source('HealthCare.gov','Coinsurance glossary','https://www.healthcare.gov/glossary/co-insurance/',{reviewRequired:true}),
      source('HealthCare.gov','Out-of-pocket maximum/limit','https://www.healthcare.gov/glossary/out-of-pocket-maximum-limit/',{reviewRequired:true}),
      source('HealthCare.gov','Total cost estimate','https://www.healthcare.gov/glossary/total-cost-estimate/',{reviewRequired:true})
    ]
  },
  {
    id:'renting',
    title:'Renting & leases',
    skill:'housing',
    summary:'Treat housing as a bundle of upfront costs, recurring costs, written rules, and jurisdiction-specific rights.',
    durableConcepts:[
      'Read the lease before agreeing to it. A lease can assign responsibility for rent, fees, utilities, parking, guests, pets, maintenance, and other rules.',
      'Upfront rental costs can include application fees, deposits, and rent due at signing; requirements vary by property and jurisdiction.',
      'Recurring housing cost can include rent, utilities, internet, renters insurance, parking, pet costs, and other lease-specific charges.',
      'Tenant rights and deposit/notice rules vary by state and locality. Use the lease plus authoritative state/local guidance rather than a universal NWS rule.',
      'Verify a rental listing and who controls the property before sending money or sensitive information.'
    ],
    practice:{
      prompt:'An apartment is advertised at $700/month. What should you calculate before deciding it fits an $850 monthly housing budget?',
      choices:[
        {id:'bundle',label:'Rent plus lease-required fees and expected utilities/recurring housing costs.',feedback:'Correct. Sticker rent can be only one part of the recurring housing obligation.'},
        {id:'rent-only',label:'Only the advertised $700 rent.',feedback:'The lease may assign additional recurring costs. Include those before deciding how much is flexible.'},
        {id:'deposit-only',label:'Only the security deposit because it is due first.',feedback:'Upfront costs matter, but the recurring monthly bundle must also fit after move-in.'}
      ],
      correct:'bundle'
    },
    sources:[
      source('U.S. Department of Housing and Urban Development','HUD Housing Counselor Training — Renting / Rental Agreements','https://www.hudhousingcounselors.hud.gov/sites/default/files/study_pdfs/Module%202.1_202511%20-%20Copy.pdf',{reviewRequired:true}),
      source('USAGov','Tenant rights and landlord complaints','https://www.usa.gov/tenant-rights',{reviewRequired:true,jurisdictionSpecific:true}),
      source('Federal Trade Commission','Rental and Housing Scams','https://consumer.ftc.gov/all-scams/rental-housing-scams',{reviewRequired:true})
    ]
  },
  {
    id:'utilities',
    title:'Utilities & recurring home bills',
    skill:'utilities',
    summary:'Utilities are recurring obligations whose amount, due date, provider, and responsibility should be confirmed before move-in.',
    durableConcepts:[
      'Check the lease to learn which utilities are included and which accounts you must establish yourself.',
      'Utility bills can vary by season and usage, so a plan needs buffer rather than assuming one exact monthly amount forever.',
      'Track due dates and automatic payments together with the account balance.',
      'An unexpected demand for immediate utility payment should be verified through a known legitimate utility contact channel.'
    ],
    practice:{
      prompt:'Before signing a lease, the listing says “utilities vary.” What information is most useful for your budget?',
      choices:[
        {id:'responsibility',label:'Which utilities I pay, typical/available cost information, setup/deposit requirements, and due timing.',feedback:'Correct. Confirm both responsibility and timing before deciding how much housing cost fits.'},
        {id:'assume',label:'Assume all utilities are included unless the first bill arrives.',feedback:'Utility responsibility should be checked in the lease/with the legitimate provider before move-in.'},
        {id:'ignore-variable',label:'Ignore utilities because variable bills cannot be planned for.',feedback:'Variable costs can still be estimated and buffered; uncertainty is a reason to plan, not omit the cost.'}
      ],
      correct:'responsibility'
    },
    sources:[
      source('U.S. Department of Housing and Urban Development','HUD Housing Counselor Training — Rental Agreements','https://hudhousingcounselors.hud.gov/sites/default/files/study_pdfs/Module%206.1_20251.pdf',{reviewRequired:true}),
      source('Federal Trade Commission','Getting Utility Services: Why Your Credit Matters','https://consumer.ftc.gov/articles/getting-utility-services-why-your-credit-matters',{reviewRequired:true}),
      source('Federal Trade Commission','Scammers Pretend To Be Your Utility Company','https://consumer.ftc.gov/articles/scammers-pretend-be-your-utility-company',{reviewRequired:true})
    ]
  },
  {
    id:'groceries',
    title:'Groceries & meal planning',
    skill:'food',
    summary:'Plan food around meals, what is already available, realistic preparation time, and a spending limit—not a universal grocery percentage.',
    durableConcepts:[
      'Check the refrigerator, freezer, and pantry before building a shopping list.',
      'Plan meals and a list before shopping so purchases connect to actual meals rather than isolated items.',
      'Use fresh, frozen, and shelf-stable foods in ways that match storage space, preparation ability, and schedule.',
      'Compare options and unit prices where useful, but a lower unit price is not savings if the food will be wasted.',
      'A food budget should reflect the person’s available money, dietary needs, access, schedule, and other required costs rather than one universal percentage.'
    ],
    practice:{
      prompt:'You have $35 for groceries until the next refill. Which first step gives you the best planning information?',
      choices:[
        {id:'inventory',label:'Check what food you already have, then plan meals and the missing items.',feedback:'Correct. Inventory-first planning reduces duplicate purchases and connects spending to actual meals.'},
        {id:'sale',label:'Buy every sale item first and figure out meals afterward.',feedback:'A sale only helps if the item fits your actual plan and will be used.'},
        {id:'percentage',label:'Apply the same grocery percentage everyone should use.',feedback:'There is no single useful grocery percentage for every learner and budget. Start with needs, resources, and the actual period.'}
      ],
      correct:'inventory'
    },
    sources:[
      source('USDA MyPlate','Healthy Eating on a Budget','https://www.myplate.gov/web/eat-healthy/healthy-eating-budget'),
      source('USDA MyPlate','Make a Plan','https://www.myplate.gov/eathealthy/budget/budget-weekly-meals')
    ]
  },
  {
    id:'transportation',
    title:'Transportation choices',
    skill:'transportation',
    summary:'Compare transportation as a full recurring/variable cost, not just a car payment, bus fare, or one ride.',
    durableConcepts:[
      'Transportation cost can include vehicle purchase/lease payments, insurance, fuel, maintenance, repairs, parking, ride-hailing, and public transit.',
      'A cheaper option on one trip is not automatically the cheaper option over a month or semester.',
      'Reliability, accessibility, time, and whether transportation is required for class/work are part of the decision—not only sticker price.',
      'Separate predictable recurring transportation costs from irregular repair/emergency costs so both can be planned.'
    ],
    practice:{
      prompt:'A used car payment looks affordable by itself. What should you compare before deciding it fits?',
      choices:[
        {id:'total',label:'Payment plus insurance, fuel, maintenance/repairs, parking, and alternatives such as transit.',feedback:'Correct. Transportation is a bundle of costs and constraints, not just the loan/payment amount.'},
        {id:'payment',label:'Only the monthly car payment.',feedback:'Ownership/operation can add several other required or variable costs.'},
        {id:'fuel',label:'Only fuel because that changes most often.',feedback:'Fuel matters, but so do fixed and irregular costs such as insurance, parking, maintenance, and repairs.'}
      ],
      correct:'total'
    },
    sources:[
      source('U.S. Department of Transportation','Transportation Insecurity Analysis Tool User Guide — transportation cost definition','https://www.transportation.gov/sites/dot.gov/files/docs/justice40/TIAT_User_Guide_v01_2024_11_24.pdf',{reviewRequired:true})
    ]
  }
];

export function getAdultLifeModule(id){ return ADULT_LIFE_MODULES.find(module=>module.id===id)||null; }

export function adultLifeSourcesNeedingReview(now=new Date()){
  const currentYear=now.getUTCFullYear();
  return ADULT_LIFE_MODULES.flatMap(module=>module.sources
    .filter(item=>item.reviewRequired && Number(item.lastReviewed.slice(0,4))<currentYear)
    .map(item=>({moduleId:module.id,...item})));
}
