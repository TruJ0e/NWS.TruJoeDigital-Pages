import { ADULT_PRACTICE_VARIANT_BANK } from './adult-life.js';
import { ADULT_TRANSFER_VARIANT_BANK, ADULT_RETENTION_VARIANT_BANK } from './adult-life-assessment.js';

// Gap B, batch 2: renting, utilities, groceries, transportation.
// Canonical items stay index 0 in the banks; these variants are appended.
// Choice ids (practice) and keys (transfer/retention) are character-identical
// to the canonical items so the engine can treat them interchangeably.

export const ADULT_PRACTICE_VARIANTS = {
  renting:[
    {
      prompt:'Maya finds a duplex listed at $963.75/month. Her housing budget is $1,180/month. What should she total up before deciding it fits?',
      choices:[
        {id:'bundle',label:'Rent plus lease-required fees and expected utilities/recurring housing costs.',feedback:'Correct. Sticker rent can be only one part of the recurring housing obligation.'},
        {id:'rent-only',label:'Only the advertised $963.75 rent.',mis:'sticker-rent',feedback:'The lease may assign additional recurring costs. Include those before deciding how much is flexible.'},
        {id:'deposit-only',label:'Only the deposit and first month\u2019s payment due at signing.',mis:'upfront-is-all',feedback:'Upfront costs matter, but the recurring monthly bundle must also fit after move-in.'},
        {id:'negotiate-later',label:'Only the $963.75 rent; the pet fee and utility setup can be negotiated away.',mis:'fees-negotiable',feedback:'Lease-required fees and utilities are part of the recurring cost whether you negotiate or not. Plan the full bundle first.'}
      ],
      correct:'bundle'
    },
    {
      prompt:'Jalen is offered a room in a shared house for $548.20/month. The house rules add a required $40.00/month cleaning fee, and utilities are split four ways. His housing budget is $720/month. What belongs in his comparison?',
      choices:[
        {id:'bundle',label:'Rent plus his share of utilities, the cleaning fee, and any other lease-required recurring charges.',feedback:'Correct. Sticker rent can be only one part of the recurring housing obligation.'},
        {id:'rent-only',label:'Only the $548.20 rent.',mis:'sticker-rent',feedback:'The lease may assign additional recurring costs. Include those before deciding how much is flexible.'},
        {id:'deposit-only',label:'Only what is due at move-in: deposit plus the first month.',mis:'upfront-is-all',feedback:'Upfront costs matter, but the recurring monthly bundle must also fit after move-in.'},
        {id:'negotiate-later',label:'Only the $548.20 rent; the cleaning fee can be talked down.',mis:'fees-negotiable',feedback:'Lease-required fees and utilities are part of the recurring cost whether you negotiate or not. Plan the full bundle first.'}
      ],
      correct:'bundle'
    }
  ],
  utilities:[
    {
      prompt:'The lease says the tenant pays gas and water, but the listing gives no amounts. What information is most useful for your budget?',
      choices:[
        {id:'responsibility',label:'Which utilities I pay, typical monthly cost information, setup/deposit requirements, and due timing.',feedback:'Correct. Confirm both responsibility and timing before deciding how much housing cost fits.'},
        {id:'assume',label:'Assume the landlord covers them because the photos show full hookups.',mis:'assume-included',feedback:'Utility responsibility should be checked in the lease/with the legitimate provider before move-in.'},
        {id:'ignore-variable',label:'Skip gas and water because variable bills cannot be planned for.',mis:'variable-means-unplannable',feedback:'Variable costs can still be estimated and buffered; uncertainty is a reason to plan, not omit the cost.'},
        {id:'listing-word',label:'Treat the listing as final; the bills will land somewhere average.',feedback:'A vague listing is not a number. Ask which utilities you pay and get typical costs before the lease locks them in.'}
      ],
      correct:'responsibility'
    },
    {
      prompt:'Before signing a lease, the listing says \u201celectric and internet vary by usage\u201d and names no provider or amount. What information is most useful for your budget?',
      choices:[
        {id:'responsibility',label:'Which utilities I pay, typical/available cost information, setup/deposit requirements, and due timing.',feedback:'Correct. Confirm both responsibility and timing before deciding how much housing cost fits.'},
        {id:'assume',label:'Assume both are included until the first bill arrives.',mis:'assume-included',feedback:'Utility responsibility should be checked in the lease/with the legitimate provider before move-in.'},
        {id:'ignore-variable',label:'Leave electric out of the budget because the amount changes.',mis:'variable-means-unplannable',feedback:'Variable costs can still be estimated and buffered; uncertainty is a reason to plan, not omit the cost.'},
        {id:'listing-word',label:'Take the listing at its word; \u201cvary\u201d means roughly average.',mis:'vary-is-a-number',feedback:'\u201cVary\u201d is not a number. Ask which utilities you pay and get typical costs before the lease locks them in.'}
      ],
      correct:'responsibility'
    }
  ],
  groceries:[
    {
      prompt:'You have $47.60 for groceries until next Friday. The pantry has rice and beans, and the freezer has your roommate\u2019s shared chicken. Which first step gives you the best planning information?',
      choices:[
        {id:'inventory',label:'Check what food you already have, then plan meals and the missing items.',feedback:'Correct. Inventory-first planning reduces duplicate purchases and connects spending to actual meals.'},
        {id:'sale',label:'Buy every buy-one-get-one item first and figure out meals afterward.',mis:'sale-not-needed',feedback:'A sale only helps if the item fits your actual plan and will be used.'},
        {id:'percentage',label:'Spend exactly 12% of each paycheck, the rule everyone should use.',mis:'one-percent-fits-all',feedback:'There is no single useful grocery percentage for every learner and budget. Start with needs, resources, and the actual period.'},
        {id:'list-memory',label:'Write the list from memory without checking the kitchen.',mis:'memory-inventory',feedback:'A memory list duplicates what you already own and misses what you need. A two-minute inventory prevents both.'}
      ],
      correct:'inventory'
    },
    {
      prompt:'You have $28.35 for food until Thursday after rent cleared. The fridge has eggs and leftover soup; the freezer has frozen vegetables. Which first step gives you the best planning information?',
      choices:[
        {id:'inventory',label:'Check what food you already have, then plan meals and the missing items.',feedback:'Correct. Inventory-first planning reduces duplicate purchases and connects spending to actual meals.'},
        {id:'sale',label:'Grab the discounted bulk pack first; the price is too good to pass up.',mis:'free-means-stockup',feedback:'A sale only helps if the item fits your actual plan and will be used.'},
        {id:'percentage',label:'Apply the 15% food rule from a video everyone shares.',mis:'one-percent-fits-all',feedback:'There is no single useful grocery percentage for every learner and budget. Start with needs, resources, and the actual period.'},
        {id:'list-memory',label:'Write the list from memory on the bus to the store.',mis:'memory-inventory',feedback:'A memory list duplicates what you already own and misses what you need. A two-minute inventory prevents both.'}
      ],
      correct:'inventory'
    }
  ],
  transportation:[
    {
      prompt:'A used sedan would cost $212.40/month on a loan. Parking near your job is $35.00/month, and an insurance quote came back at $118.75/month. What should you compare before deciding it fits?',
      choices:[
        {id:'total',label:'Payment plus insurance, fuel, maintenance/repairs, parking, and alternatives such as transit.',feedback:'Correct. Transportation is a bundle of costs and constraints, not just the loan/payment amount.'},
        {id:'payment',label:'Only the $212.40 loan payment.',mis:'payment-is-total',feedback:'Ownership/operation can add several other required or variable costs.'},
        {id:'fuel',label:'Only fuel, since gas prices change most often.',mis:'volatile-means-only',feedback:'Fuel matters, but so do fixed and irregular costs such as insurance, parking, maintenance, and repairs.'},
        {id:'payment-plus-insurance',label:'Payment plus insurance; gas and upkeep are too small to change the math.',mis:'small-costs-dont-matter',feedback:'Fuel, maintenance, repairs, and parking add up fast. Small recurring costs are exactly what break a tight car budget.'}
      ],
      correct:'total'
    },
    {
      prompt:'A used scooter would cost $89.50/month on payments, about $61.30/month in fuel, and $52.00/month for the cheapest insurance quote. Rideshares to work run $14.80 each way. What should you compare before deciding?',
      choices:[
        {id:'total',label:'Payment plus insurance, fuel, maintenance/repairs, parking, and alternatives such as transit.',feedback:'Correct. Transportation is a bundle of costs and constraints, not just the loan/payment amount.'},
        {id:'payment',label:'Only the $89.50 scooter payment.',mis:'payment-is-total',feedback:'Ownership/operation can add several other required or variable costs.'},
        {id:'fuel',label:'Only fuel because that is the only cost that changes.',mis:'volatile-means-only',feedback:'Fuel matters, but so do fixed and irregular costs such as insurance, parking, maintenance, and repairs.'},
        {id:'payment-plus-insurance',label:'Payment plus insurance; maintenance is too small to matter.',mis:'small-costs-dont-matter',feedback:'Fuel, maintenance, repairs, and parking add up fast. Small recurring costs are exactly what break a tight car budget.'}
      ],
      correct:'total'
    }
  ]
};

export const ADULT_TRANSFER_VARIANTS = {
  housing:[
    {
      question:'A room lists $792.50 rent, a required $75.00 parking fee, and tenant-paid gas. What belongs in the recurring housing comparison?',
      choices:[
        ['bundle','Rent plus required parking plus expected tenant-paid utilities and other lease-required recurring costs.'],
        ['rent','$792.50 rent only.','sticker-rent'],
        ['parking','Only the $75.00 parking fee, since the rent is already known.'],
        ['deposit','Only the security deposit; the monthly costs sort themselves out.','upfront-is-all']
      ],
      good:'bundle',
      help:'Housing affordability depends on the recurring bundle assigned by the lease, not sticker rent alone.'
    },
    {
      question:'A condo lists $1,105.00 rent, required $45.00/month pet rent, and tenant-paid electricity. What belongs in the recurring housing comparison?',
      choices:[
        ['bundle','Rent plus required pet rent plus expected tenant-paid utilities and other lease-required recurring costs.'],
        ['rent','$1,105.00 rent only.','sticker-rent'],
        ['parking','Only the pet fee, since the rent is already known.'],
        ['deposit','Only the deposit and first month due at signing.','upfront-is-all']
      ],
      good:'bundle',
      help:'Housing affordability depends on the recurring bundle assigned by the lease, not sticker rent alone.'
    }
  ],
  utilities:[
    {
      question:'Gas bills run $38.90 in fall and $121.45 in deep winter. What is the stronger monthly planning approach?',
      choices:[
        ['buffer','Use cost history and estimates, and leave room for seasonal variation.'],
        ['lowest','Budget only the $38.90 fall bill.','optimistic-plan'],
        ['omit','Leave gas out because the amount changes.','variable-means-unplannable'],
        ['card','Put winter overages on a credit card and budget only fall amounts.']
      ],
      good:'buffer',
      help:'Variable required costs still belong in the plan. Estimate them and preserve a buffer for variation.'
    },
    {
      question:'Water and sewer run $31.20 in summer and $68.75 in winter. What is the stronger monthly planning approach?',
      choices:[
        ['buffer','Use cost history and estimates, and leave room for seasonal variation.'],
        ['lowest','Budget only the $31.20 summer bill.','optimistic-plan'],
        ['omit','Leave water out because the amount changes.','variable-means-unplannable'],
        ['card','Cover winter spikes from savings and budget only the summer amount.']
      ],
      good:'buffer',
      help:'Variable required costs still belong in the plan. Estimate them and preserve a buffer for variation.'
    }
  ],
  food:[
    {
      question:'You have $52.30 for food and already have eggs, tortillas, and frozen stir-fry mix. What should you do before shopping?',
      choices:[
        ['plan','Plan meals around what you already have, then list the missing items.'],
        ['bulk','Buy the biggest sale packages first.','sale-not-needed'],
        ['percent','Use a universal grocery percentage instead of checking your actual food and budget.','one-percent-fits-all'],
        ['delivery','Order delivery for the week since $52.30 covers a few meals.']
      ],
      good:'plan',
      help:'Inventory-first meal planning connects purchases to food you will actually use.'
    },
    {
      question:'You have $33.75 for food until payday and the freezer has chicken thighs and mixed vegetables. What should you do before shopping?',
      choices:[
        ['plan','Plan meals around what you already have, then list the missing items.'],
        ['bulk','Stock up on the warehouse-size sale items first.','free-means-stockup'],
        ['percent','Spend the percentage a budgeting app recommends for everyone.','one-percent-fits-all'],
        ['delivery','Order delivery for the week since $33.75 covers a few meals.']
      ],
      good:'plan',
      help:'Inventory-first meal planning connects purchases to food you will actually use.'
    }
  ],
  transportation:[
    {
      question:'A $96.00 monthly transit pass costs more upfront than a few $4.75 single rides, but you commute to class and a part-time job five days a week. What should you compare?',
      choices:[
        ['period','Total cost and reliability/access needs across the whole month or semester.'],
        ['single','Only the price of one ride.'],
        ['upfront','Only which option costs less today.'],
        ['car','Buy a cheap car instead; passes are never worth it.']
      ],
      good:'period',
      help:'Transportation choices should be compared over the relevant time period and include reliability/access constraints.'
    },
    {
      question:'A rideshare subscription costs $149.99/month. Buying individual rides for your usual trips would run about $186.40/month, but a coworker sometimes offers you a ride. What should you compare?',
      choices:[
        ['period','Total cost and reliability/access needs across the whole month or semester.'],
        ['single','Only the price of one ride.'],
        ['upfront','Only which option costs less this week.'],
        ['car','Buy a cheap car instead; subscriptions are never worth it.']
      ],
      good:'period',
      help:'Transportation choices should be compared over the relevant time period and include reliability/access constraints.'
    }
  ]
};

export const ADULT_RETENTION_VARIANTS = {
  housing:[
    {
      question:'A lease says the tenant pays trash collection and water in addition to rent. How should those costs be treated?',
      choices:[
        ['include','Include them in the recurring housing plan.'],
        ['ignore','Ignore them because they are not labeled rent.','sticker-rent'],
        ['deposit','Treat them only as one-time move-in deposits.','upfront-is-all']
      ],
      good:'include',
      help:'Use the lease to identify which recurring costs are the tenant\u2019s responsibility.'
    },
    {
      question:'A lease says the tenant pays required $28.50/month renters insurance and a $15.00/month pet fee in addition to rent. How should those costs be treated?',
      choices:[
        ['include','Include them in the recurring housing plan.'],
        ['ignore','Ignore them because they are not labeled rent.','sticker-rent'],
        ['deposit','Treat them only as one-time move-in costs.','upfront-is-all']
      ],
      good:'include',
      help:'Use the lease to identify which recurring costs are the tenant\u2019s responsibility.'
    }
  ],
  utilities:[
    {
      question:'Someone calls saying your electric bill will be disconnected today unless you pay through a new payment link. What should happen first?',
      choices:[
        ['verify','Verify the account through a known utility website, bill, or phone number.'],
        ['link','Use the new link immediately.','urgency-overrides-verify'],
        ['gift','Offer a gift card instead.']
      ],
      good:'verify',
      help:'Unexpected urgent utility payment demands should be verified through a known legitimate channel.'
    },
    {
      question:'A text says your gas will be shut off in 45 minutes unless you pay with a prepaid card. What should happen first?',
      choices:[
        ['verify','Verify the account through a known utility website, bill, or phone number.'],
        ['link','Pay through the link in the text right away.','urgency-overrides-verify'],
        ['gift','Send the prepaid card to keep the gas on.']
      ],
      good:'verify',
      help:'Unexpected urgent utility payment demands should be verified through a known legitimate channel.'
    }
  ],
  food:[
    {
      question:'A warehouse-size cereal box has the lowest unit price, but half will go stale before you finish it. Is it automatically the better value?',
      choices:[
        ['no','No. Waste, storage, schedule, and actual use matter along with unit price.'],
        ['yes','Yes. Lowest unit price is always the best financial choice.','total-not-unit'],
        ['ignore','Unit price and likely use never matter.']
      ],
      good:'no',
      help:'A lower unit price is not savings when the extra amount will not realistically be used.'
    },
    {
      question:'A 5-pound bag of spinach is cheapest per ounce, but you realistically use only half before it wilts. Is it automatically the better value?',
      choices:[
        ['no','No. Waste, storage, schedule, and actual use matter along with unit price.'],
        ['yes','Yes. Lowest unit price is always the best financial choice.','total-not-unit'],
        ['ignore','Unit price and likely use never matter.']
      ],
      good:'no',
      help:'A lower unit price is not savings when the extra amount will not realistically be used.'
    }
  ],
  transportation:[
    {
      question:'You are estimating the monthly cost of owning a moped. Which set is most complete?',
      choices:[
        ['bundle','Payment if any, insurance, fuel, maintenance/repairs, parking, and other required operating costs.'],
        ['payment','Loan payment only.','payment-is-total'],
        ['fuel','Fuel only.']
      ],
      good:'bundle',
      help:'Transportation ownership is a bundle of fixed, variable, and irregular costs.'
    },
    {
      question:'You are estimating the monthly cost of a used pickup truck for a weekend job. Which set is most complete?',
      choices:[
        ['bundle','Payment if any, insurance, fuel, maintenance/repairs, parking, and other required operating costs.'],
        ['payment','Truck payment only.','payment-is-total'],
        ['fuel','Fuel only.']
      ],
      good:'bundle',
      help:'Transportation ownership is a bundle of fixed, variable, and irregular costs.'
    }
  ]
};

Object.assign(ADULT_PRACTICE_VARIANT_BANK, ADULT_PRACTICE_VARIANTS);
Object.assign(ADULT_TRANSFER_VARIANT_BANK, ADULT_TRANSFER_VARIANTS);
Object.assign(ADULT_RETENTION_VARIANT_BANK, ADULT_RETENTION_VARIANTS);
