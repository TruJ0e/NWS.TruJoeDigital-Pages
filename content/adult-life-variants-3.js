// NWS adult-life content depth v3 — Gap B, batch 3: all nine modules.
// Each variant is a new concrete situation testing the SAME durable skill, SAME
// judgment path, SAME correct choice id, and SAME plain-direct voice as the
// canonical items. Choice ids are character-identical to the canonical items
// and every mis: id exists verbatim in the MISCONCEPTIONS registry
// (src/app/variants.js). Canonical items stay at index 0; these are appended.
import { ADULT_PRACTICE_VARIANT_BANK } from './adult-life.js';

export const ADULT_PRACTICE_VARIANTS = {
  banking: [
    {
      prompt:'Maya\u2019s app shows $92.47. An $84.15 insurance autopay posts tomorrow, and she is eyeing a $15.60 dinner out tonight. What should she do first?',
      choices:[
        {id:'check-obligations',label:'Protect the scheduled $84.15 first and check what will remain.',feedback:'Right. Accounting for the known payment first shows what the dinner can actually cost her.'},
        {id:'spend-visible',label:'Spend the $15.60 because the app currently shows $92.47.',feedback:'The visible balance does not erase tomorrow\u2019s autopay. Spending first can leave the insurance bill short.',mis:'spend-before-obligation'},
        {id:'assume-overdraft',label:'Go out and assume overdraft coverage will handle the insurance bill.',feedback:'Overdraft coverage can mean fees or forced repayment. It is not extra room in the account.',mis:'overdraft-as-backup'},
        {id:'split-purchase',label:'Get a $7.00 appetizer tonight and save the rest for later.',feedback:'Even a smaller dinner spends money before the known $84.15 is protected. Reserve the bill first.',mis:'spend-before-obligation'}
      ],
      correct:'check-obligations'
    },
    {
      prompt:'Jordan\u2019s app shows $143.28. A $129.95 rent-share autopay hits Friday, and he is considering a $22.35 game purchase today. What should he do first?',
      choices:[
        {id:'check-obligations',label:'Protect the scheduled $129.95 first and check what will remain.',feedback:'Right. The rent share is already spoken for; whatever is left after it is the real game budget.'},
        {id:'spend-visible',label:'Buy the game because the app currently shows $143.28.',feedback:'The displayed balance ignores the Friday autopay. Buying first can push the rent share short.',mis:'spend-before-obligation'},
        {id:'assume-overdraft',label:'Buy it and assume overdraft coverage will handle the rent share.',feedback:'Overdraft coverage can add fees on top of a shortfall. It is not a backup balance.',mis:'overdraft-as-backup'},
        {id:'split-purchase',label:'Buy a $9.99 expansion now and the full game after Friday.',feedback:'A smaller purchase still spends before the $129.95 is safe. Protect the autopay, then decide.',mis:'spend-before-obligation'}
      ],
      correct:'check-obligations'
    },
    {
      prompt:'Priya\u2019s app shows $61.09. A $54.82 phone autopay posts this evening, and a $9.75 delivery order is sitting in her cart. What should she do first?',
      choices:[
        {id:'check-obligations',label:'Protect the scheduled $54.82 first and check what will remain.',feedback:'Right. Evening autopays post the same as morning ones — reserve the known amount before ordering.'},
        {id:'spend-visible',label:'Order the $9.75 delivery because the app currently shows $61.09.',feedback:'The visible balance does not erase tonight\u2019s autopay. The phone bill still has a job to do.',mis:'spend-before-obligation'},
        {id:'assume-overdraft',label:'Order it and assume overdraft coverage will handle the phone bill.',feedback:'Overdraft coverage can involve fees or borrowing. It is not extra income.',mis:'overdraft-as-backup'},
        {id:'split-purchase',label:'Order a $4.50 side now and the full meal after the autopay clears.',feedback:'Splitting still spends before the known $54.82 is protected. Reserve the bill first.',mis:'spend-before-obligation'}
      ],
      correct:'check-obligations'
    }
  ],
  credit: [
    {
      prompt:'Sam\u2019s $1,240.55 tuition balance will not fit this month\u2019s plan. A credit card would let him pay it today. If he charges it, what has actually happened?',
      choices:[
        {id:'borrowed',label:'He has borrowed $1,240.55, creating a debt he must repay with interest possible.',feedback:'Correct. Charging the card changed when he pays, not whether the tuition costs money.'},
        {id:'income',label:'He has gained $1,240.55 of extra income this month.',feedback:'A credit limit is not income. Using it creates debt that must be repaid.',mis:'credit-as-income'},
        {id:'savings',label:'He has saved money because he delayed paying for the tuition.',feedback:'Delaying payment does not turn a bill into savings and may add interest or fees.',mis:'delay-is-savings'},
        {id:'free-until-bill',label:'The tuition costs him nothing until the statement arrives.',feedback:'The statement arrives with the full $1,240.55 owed plus any interest or fees. Later is a due date, not a discount.',mis:'later-is-free'}
      ],
      correct:'borrowed'
    },
    {
      prompt:'Alex needs $589.47 of furniture before starting a new job. Putting it on a credit card would let him move in this weekend. How should he describe the card in this decision?',
      choices:[
        {id:'borrowed',label:'Borrowed money that creates a future payment obligation.',feedback:'Correct. The furniture still costs $589.47; the card only changes the payment timing.'},
        {id:'income',label:'Extra income because the card increases what he can spend today.',feedback:'A credit limit is not income. Using it creates debt that must be repaid.',mis:'credit-as-income'},
        {id:'savings',label:'Savings because he can delay paying for the furniture.',feedback:'Delaying payment does not turn a purchase into savings and may add interest or fees.',mis:'delay-is-savings'},
        {id:'free-until-bill',label:'Free money until the statement arrives.',feedback:'The statement arrives with the full $589.47 owed plus any interest or fees. Later is a due date, not a discount.',mis:'later-is-free'}
      ],
      correct:'borrowed'
    },
    {
      prompt:'Riley gets a $214.30 urgent-care bill he cannot cover until next month. A credit card would let him pay it today. What is the accurate description of using the card here?',
      choices:[
        {id:'borrowed',label:'Borrowed money that creates a future payment obligation.',feedback:'Correct. The card buys time, not forgiveness — the $214.30 still has to be repaid.'},
        {id:'income',label:'Extra income because the card increases what he can spend today.',feedback:'A credit limit is not income. Using it creates debt that must be repaid.',mis:'credit-as-income'},
        {id:'savings',label:'Savings because he can delay paying the bill.',feedback:'Delaying payment does not turn a bill into savings and may add interest or fees.',mis:'delay-is-savings'},
        {id:'free-until-bill',label:'Free money until the statement arrives.',feedback:'The statement arrives with the full $214.30 owed plus any interest or fees. Later is a due date, not a discount.',mis:'later-is-free'}
      ],
      correct:'borrowed'
    }
  ],
  scams: [
    {
      prompt:'A caller claiming to be a federal agent says Casey\u2019s grandson owes $3,940.17 in bail, payable immediately in cryptocurrency. What is the best first action?',
      choices:[
        {id:'verify',label:'End the contact and check on her grandson or the courthouse using a number she already knows.',feedback:'Correct. A demand for instant hard-to-reverse payment is exactly when to verify somewhere else.'},
        {id:'pay',label:'Pay quickly so her grandson is released, then verify afterward.',feedback:'Urgent cryptocurrency payment is a major scam signal. Paying first can make recovery nearly impossible.',mis:'urgency-overrides-verify'},
        {id:'share',label:'Give bank details so the caller can prove the bail amount.',feedback:'Do not provide financial information to an unexpected caller. Verify independently.'},
        {id:'callback',label:'Call back the number the caller gave her to confirm the case.',feedback:'A scammer\u2019s callback number reaches the scammer. Verify through a number you already know: family, the courthouse, or a known official site.',mis:'their-number-verifies'}
      ],
      correct:'verify'
    },
    {
      prompt:'A text says Taylor missed jury duty and a $647.22 warrant fine must be paid in gift cards within 90 minutes. What is the best first action?',
      choices:[
        {id:'verify',label:'Ignore the demand and check with the courthouse using a number from its official website.',feedback:'Correct. Real courts do not collect fines in gift cards on a countdown.'},
        {id:'pay',label:'Buy the gift cards quickly to clear the warrant, then verify afterward.',feedback:'Urgent gift-card payment is a major scam signal. Paying first can make recovery difficult.',mis:'urgency-overrides-verify'},
        {id:'share',label:'Reply with personal details so the texter can confirm the warrant.',feedback:'Do not provide personal information to an unexpected texter. Verify independently.'},
        {id:'callback',label:'Call the number in the text to confirm it is a real court order.',feedback:'A scammer\u2019s supplied number reaches the scammer. Verify through a channel you already trust.',mis:'their-number-verifies'}
      ],
      correct:'verify'
    },
    {
      prompt:'A caller claiming to be Noah\u2019s bank fraud department says $1,842.17 in suspicious charges just hit, and he must move his money to a \u201csafe account\u201d by wire transfer right now. What is the best first action?',
      choices:[
        {id:'verify',label:'Hang up and call the bank using the number on his card or its known app.',feedback:'Correct. A \u201csafe account\u201d wire is a classic move-the-money trick — verify on your own channel.'},
        {id:'pay',label:'Wire the money quickly to protect it, then verify afterward.',feedback:'Urgent wire-transfer instructions are a major scam signal. Sending first can make recovery difficult.',mis:'urgency-overrides-verify'},
        {id:'share',label:'Read his account numbers aloud so the caller can locate the fraud.',feedback:'Do not provide account information to an unexpected caller. Verify independently.'},
        {id:'callback',label:'Call back the number the caller gave him to confirm the fraud alert.',feedback:'A scammer\u2019s callback number reaches the scammer. Use the number printed on your card or the bank\u2019s known site.',mis:'their-number-verifies'}
      ],
      correct:'verify'
    }
  ],
  'first-job': [
    {
      prompt:'Ava\u2019s new job lists $1,048.50 gross per pay period, but $876.44 actually lands in her account. Which number belongs in the amount-available step of her budget?',
      choices:[
        {id:'take-home',label:'The $876.44 actually deposited to her.',feedback:'Correct. Rent and groceries get paid from money that arrived, not money that was listed.'},
        {id:'gross',label:'The $1,048.50 gross wages before any deductions.',feedback:'Gross pay describes earnings, but withholding and deductions mean it is not the amount available to spend.',mis:'paycheck-gross'},
        {id:'annual',label:'The yearly salary divided by twenty-six, no matter how payroll works.',feedback:'Pay frequency, withholding, and deductions matter. Use the actual take-home amount for the immediate plan.',mis:'paycheck-gross'},
        {id:'gross-minus-guess',label:'The $1,048.50 minus a rough guess at taxes.',feedback:'Guessing at deductions is still guessing. The $876.44 is the number that actually reaches her; budget from that.',mis:'guess-is-good-enough'}
      ],
      correct:'take-home'
    },
    {
      prompt:'Maya works 28 hours a week at $15.40 an hour — $431.20 gross — and her first deposit is $371.58. Which number belongs in the amount-available step for her budget?',
      choices:[
        {id:'take-home',label:'The $371.58 actually deposited to her.',feedback:'Correct. Her spending plan has to run on the money that showed up.'},
        {id:'gross',label:'The $431.20 gross wages before any deductions.',feedback:'Gross pay describes earnings, but it is not the amount available to spend after withholding and deductions.',mis:'paycheck-gross'},
        {id:'annual',label:'The hourly rate times forty hours, then divided by fifty-two.',feedback:'Pay frequency, hours, withholding, and deductions matter. Use the actual take-home amount for the immediate plan.',mis:'paycheck-gross'},
        {id:'gross-minus-guess',label:'The $431.20 minus a rough guess at taxes.',feedback:'Guessing at deductions is still guessing. The $371.58 is the number that actually reaches her; budget from that.',mis:'guess-is-good-enough'}
      ],
      correct:'take-home'
    },
    {
      prompt:'Jordan accepts a salaried job at $3,166.67 gross per month, and $2,548.12 actually lands in his account. Which number belongs in the amount-available step of his budget?',
      choices:[
        {id:'take-home',label:'The $2,548.12 actually deposited to him.',feedback:'Correct. A monthly salary still has taxes and deductions taken before it reaches him.'},
        {id:'gross',label:'The $3,166.67 gross monthly wages before any deductions.',feedback:'Gross pay describes earnings, but it is not the amount available to spend after withholding and deductions.',mis:'paycheck-gross'},
        {id:'annual',label:'The offer letter\u2019s yearly figure divided by twelve, no matter how payroll works.',feedback:'Pay frequency, withholding, and deductions matter. Use the actual take-home amount for the immediate plan.',mis:'paycheck-gross'},
        {id:'gross-minus-guess',label:'The $3,166.67 minus a rough guess at taxes.',feedback:'Guessing at deductions is still guessing. The $2,548.12 is the number that actually reaches him; budget from that.',mis:'guess-is-good-enough'}
      ],
      correct:'take-home'
    }
  ],
  'health-insurance': [
    {
      prompt:'Priya needs knee surgery this year. Plan A has an $82.40 monthly premium with a $4,000.00 deductible. Plan B has a $156.90 premium, a $500.00 deductible, and $30.00 copays. Does the lowest premium automatically make Plan A cheapest for her year?',
      choices:[
        {id:'no-total',label:'No. Compare premiums plus expected deductible, copay/coinsurance costs, and coverage.',feedback:'Correct. One surgery can blow past the deductible math — the total picture decides, not the premium alone.'},
        {id:'yes-premium',label:'Yes. The premium is the only cost that matters.',feedback:'Premium is only one part of total health-plan cost.',mis:'premium-is-total'},
        {id:'ignore-network',label:'Yes, as long as she ignores whether the surgeon is in network.',feedback:'Network rules can materially affect what she pays and whether costs count toward plan limits.',mis:'network-doesnt-matter'},
        {id:'ask-friend',label:'Yes, if her sister with Plan A pays less overall.',feedback:'Her sister\u2019s care needs are not hers. Total cost depends on her expected care, deductible, copays, and network.',mis:'friend-math'}
      ],
      correct:'no-total'
    },
    {
      prompt:'Sam sees a cardiologist every three months. One plan has a $52.75 monthly premium but his doctor is out of network. Another is $118.30 a month with his doctor in network. Does the lowest premium automatically make the first plan cheapest for his year?',
      choices:[
        {id:'no-total',label:'No. Compare premiums plus expected deductible, copay/coinsurance costs, coverage, and network.',feedback:'Correct. Out-of-network visits can cost far more and may not count toward plan limits.'},
        {id:'yes-premium',label:'Yes. The premium is the only cost that matters.',feedback:'Premium is only one part of total health-plan cost.',mis:'premium-is-total'},
        {id:'ignore-network',label:'Yes, as long as he ignores whether his cardiologist is in network.',feedback:'Network rules can materially affect what he pays and whether costs count toward plan limits.',mis:'network-doesnt-matter'},
        {id:'ask-friend',label:'Yes, if a friend with the cheap plan pays less overall.',feedback:'A friend\u2019s care needs are not his. Total cost depends on his expected visits, cost sharing, and network.',mis:'friend-math'}
      ],
      correct:'no-total'
    },
    {
      prompt:'Alex takes a $340.18-a-month prescription and sees a specialist monthly. Plan L has a $39.60 premium with 30% coinsurance. Plan M has a $128.55 premium with $25.00 copays. Does the lowest premium automatically make Plan L cheapest for his year?',
      choices:[
        {id:'no-total',label:'No. Compare premiums plus expected prescription costs, copays/coinsurance, and coverage.',feedback:'Correct. With regular prescriptions and visits, 30% coinsurance can dwarf the premium savings fast.'},
        {id:'yes-premium',label:'Yes. The premium is the only cost that matters.',feedback:'Premium is only one part of total health-plan cost.',mis:'premium-is-total'},
        {id:'ignore-network',label:'Yes, as long as he ignores whether his pharmacy and specialist are in network.',feedback:'Network rules can materially affect what he pays and whether costs count toward plan limits.',mis:'network-doesnt-matter'},
        {id:'ask-friend',label:'Yes, if a coworker with Plan L pays less overall.',feedback:'A coworker\u2019s prescriptions are not his. Total cost depends on his expected care, cost sharing, and network.',mis:'friend-math'}
      ],
      correct:'no-total'
    }
  ],
  renting: [
    {
      prompt:'Riley finds a house listed at $1,214.60/month. The lease adds required $85.00/month pet rent, and the tenant pays electric, which averages $142.60. His housing budget is $1,400/month. What should he total up before deciding it fits?',
      choices:[
        {id:'bundle',label:'Rent plus required pet rent, expected electric, and any other lease-required recurring charges.',feedback:'Correct. The advertised number is only the start of what the lease actually requires.'},
        {id:'rent-only',label:'Only the advertised $1,214.60 rent.',feedback:'The lease assigns additional recurring costs. Include those before deciding how much is flexible.',mis:'sticker-rent'},
        {id:'deposit-only',label:'Only the deposit and first month\u2019s payment due at signing.',feedback:'Upfront costs matter, but the recurring monthly bundle must also fit after move-in.',mis:'upfront-is-all'},
        {id:'negotiate-later',label:'Only the $1,214.60 rent; the pet rent can be negotiated away later.',feedback:'Lease-required fees and utilities are part of the recurring cost whether you negotiate or not. Plan the full bundle first.',mis:'fees-negotiable'}
      ],
      correct:'bundle'
    },
    {
      prompt:'Casey tours a studio at $687.45/month. The lease requires $55.00/month for parking and $22.75/month for trash and sewer. Her housing budget is $800/month. What belongs in her comparison?',
      choices:[
        {id:'bundle',label:'Rent plus required parking, trash/sewer, and any other lease-required recurring charges.',feedback:'Correct. Small required fees stack — the comparison needs every recurring line the lease names.'},
        {id:'rent-only',label:'Only the $687.45 rent.',feedback:'The lease assigns additional recurring costs. Include those before deciding how much is flexible.',mis:'sticker-rent'},
        {id:'deposit-only',label:'Only what is due at move-in: deposit plus the first month.',feedback:'Upfront costs matter, but the recurring monthly bundle must also fit after move-in.',mis:'upfront-is-all'},
        {id:'negotiate-later',label:'Only the $687.45 rent; parking and trash fees can be talked down.',feedback:'Lease-required fees and utilities are part of the recurring cost whether you negotiate or not. Plan the full bundle first.',mis:'fees-negotiable'}
      ],
      correct:'bundle'
    },
    {
      prompt:'Taylor is offered a room for $812.30/month in a shared apartment. Utilities are split three ways at about $108.45 each, and the lease requires $18.75/month renters insurance. Her housing budget is $950/month. What should she total up before deciding it fits?',
      choices:[
        {id:'bundle',label:'Her rent share plus her utility share, required insurance, and any other lease-required recurring charges.',feedback:'Correct. In a shared place, her slice of the bundle is what has to fit — not the headline rent.'},
        {id:'rent-only',label:'Only the $812.30 rent share.',feedback:'The lease assigns additional recurring costs. Include those before deciding how much is flexible.',mis:'sticker-rent'},
        {id:'deposit-only',label:'Only the deposit and her first month\u2019s share due at signing.',feedback:'Upfront costs matter, but the recurring monthly bundle must also fit after move-in.',mis:'upfront-is-all'},
        {id:'negotiate-later',label:'Only the $812.30 share; the insurance can be skipped once she moves in.',feedback:'Lease-required fees and utilities are part of the recurring cost whether you negotiate or not. Plan the full bundle first.',mis:'fees-negotiable'}
      ],
      correct:'bundle'
    }
  ],
  utilities: [
    {
      prompt:'Noah\u2019s lease says the tenant sets up electric and water, but the landlord says \u201cthe last tenant paid around $140 a month.\u201d What information is most useful for his budget?',
      choices:[
        {id:'responsibility',label:'Which utilities he pays, typical monthly cost information, setup/deposit requirements, and due timing.',feedback:'Correct. One person\u2019s \u201caround $140\u201d is not a budget — confirm responsibility and real cost information before signing.'},
        {id:'assume',label:'Assume the landlord covers setup because the unit is already wired.',feedback:'Utility responsibility should be checked in the lease and with the legitimate provider before move-in.',mis:'assume-included'},
        {id:'ignore-variable',label:'Skip electric and water because variable bills cannot be planned for.',feedback:'Variable costs can still be estimated and buffered; uncertainty is a reason to plan, not omit the cost.',mis:'variable-means-unplannable'},
        {id:'listing-word',label:'Budget exactly $140.00 a month because the landlord said so.',feedback:'\u201cAround $140\u201d is not a number. Ask which utilities you pay and get typical costs before the lease locks them in.',mis:'vary-is-a-number'}
      ],
      correct:'responsibility'
    },
    {
      prompt:'Before signing, Ava reads \u201cwater and trash included; other utilities vary with usage\u201d and no amounts are listed. What information is most useful for her budget?',
      choices:[
        {id:'responsibility',label:'Which utilities she pays, typical/available cost information, setup/deposit requirements, and due timing.',feedback:'Correct. \u201cVary with usage\u201d tells her nothing about the electric bill — get the missing numbers before the lease locks them in.'},
        {id:'assume',label:'Assume electric and gas are included until a bill arrives.',feedback:'Utility responsibility should be checked in the lease and with the legitimate provider before move-in.',mis:'assume-included'},
        {id:'ignore-variable',label:'Leave the variable utilities out because the amounts change.',feedback:'Variable costs can still be estimated and buffered; uncertainty is a reason to plan, not omit the cost.',mis:'variable-means-unplannable'},
        {id:'listing-word',label:'Take the listing at its word; \u201cvary\u201d means roughly average.',feedback:'\u201cVary\u201d is not a number. Ask which utilities you pay and get typical costs before the lease locks them in.',mis:'vary-is-a-number'}
      ],
      correct:'responsibility'
    },
    {
      prompt:'Maya gets paid on the 1st and 15th, but the electric company bills on the 20th with autopay as the only free payment option. What should she confirm before signing the lease?',
      choices:[
        {id:'responsibility',label:'Which utilities she pays, typical cost information, setup/deposit requirements, and when each bill is due.',feedback:'Correct. Due dates have to line up with paydays — a bill due between paychecks needs its own plan.'},
        {id:'assume',label:'Assume the electric bill will work itself out once autopay starts.',feedback:'Utility responsibility and timing should be confirmed in the lease and with the provider before move-in.',mis:'assume-included'},
        {id:'ignore-variable',label:'Skip the timing question because variable bills cannot be planned for.',feedback:'Variable amounts can still be estimated and buffered; due dates are fixed and plannable.',mis:'variable-means-unplannable'},
        {id:'listing-word',label:'Assume \u201cvary\u201d means the bill will land right after payday.',feedback:'\u201cVary\u201d describes the amount, not the due date. Confirm actual billing timing before signing.',mis:'vary-is-a-number'}
      ],
      correct:'responsibility'
    }
  ],
  groceries: [
    {
      prompt:'Jordan has $41.75 for groceries until payday. The pantry has pasta and sauce, and the fridge has leftover stir-fry. Which first step gives him the best planning information?',
      choices:[
        {id:'inventory',label:'Check what food he already has, then plan meals and the missing items.',feedback:'Correct. Pasta, sauce, and stir-fry are already meals — the store trip only fills the gaps.'},
        {id:'sale',label:'Buy every clearance item first and figure out meals afterward.',feedback:'A sale only helps if the item fits his actual plan and will be used.',mis:'sale-not-needed'},
        {id:'percentage',label:'Spend the 10% grocery rule from a budgeting video.',feedback:'There is no single useful grocery percentage for every budget. Start with needs, resources, and the actual period.',mis:'one-percent-fits-all'},
        {id:'list-memory',label:'Write the list from memory without checking the kitchen.',feedback:'A memory list duplicates what he already owns and misses what he needs. A two-minute inventory prevents both.',mis:'memory-inventory'}
      ],
      correct:'inventory'
    },
    {
      prompt:'Priya has $62.40 for food over the next two weeks. The freezer has ground turkey, and the pantry has black beans and rice. Which first step gives her the best planning information?',
      choices:[
        {id:'inventory',label:'Check what food she already has, then plan meals and the missing items.',feedback:'Correct. Turkey, beans, and rice already cover most meals — the list is produce and gaps, not a full restock.'},
        {id:'sale',label:'Grab the discounted warehouse packs first; the price is too good to pass up.',feedback:'A sale only helps if the item fits her actual plan and will be used.',mis:'free-means-stockup'},
        {id:'percentage',label:'Apply the same grocery percentage everyone should use.',feedback:'There is no single useful grocery percentage for every learner and budget. Start with needs, resources, and the actual period.',mis:'one-percent-fits-all'},
        {id:'list-memory',label:'Write the list from memory on the way to the store.',feedback:'A memory list duplicates what she already owns and misses what she needs. A two-minute inventory prevents both.',mis:'memory-inventory'}
      ],
      correct:'inventory'
    },
    {
      prompt:'Sam has $19.85 for food until Friday after buying his transit pass. The fridge has eggs and tortillas. Which first step gives him the best planning information?',
      choices:[
        {id:'inventory',label:'Check what food he already has, then plan meals and the missing items.',feedback:'Correct. Eggs and tortillas are already several meals — $19.85 stretches much further once he sees that.'},
        {id:'sale',label:'Buy every buy-one-get-one item first and figure out meals afterward.',feedback:'A sale only helps if the item fits his actual plan and will be used.',mis:'sale-not-needed'},
        {id:'percentage',label:'Use the percentage rule from a finance app instead of checking his food.',feedback:'There is no single useful grocery percentage for every budget. Start with needs, resources, and the actual period.',mis:'one-percent-fits-all'},
        {id:'list-memory',label:'Write the list from memory without opening the fridge.',feedback:'A memory list duplicates what he already owns and misses what he needs. A two-minute inventory prevents both.',mis:'memory-inventory'}
      ],
      correct:'inventory'
    }
  ],
  transportation: [
    {
      prompt:'Alex is eyeing a used truck: $284.60/month loan payment, a $142.35/month insurance quote, and $50.00/month parking at his apartment. What should he compare before deciding it fits?',
      choices:[
        {id:'total',label:'Payment plus insurance, fuel, maintenance/repairs, parking, and alternatives such as transit.',feedback:'Correct. The $284.60 is barely half the story once insurance and parking join the math.'},
        {id:'payment',label:'Only the $284.60 monthly payment.',feedback:'Ownership/operation can add several other required or variable costs.',mis:'payment-is-total'},
        {id:'fuel',label:'Only fuel because gas prices change most often.',feedback:'Fuel matters, but so do fixed and irregular costs such as insurance, parking, maintenance, and repairs.',mis:'volatile-means-only'},
        {id:'payment-plus-insurance',label:'Payment plus insurance; gas and upkeep are too small to matter.',feedback:'Fuel, maintenance, repairs, and parking add up fast. Small recurring costs are exactly what break a tight car budget.',mis:'small-costs-dont-matter'}
      ],
      correct:'total'
    },
    {
      prompt:'Riley\u2019s rideshare to work costs $9.60 each way, five days a week. A monthly bus pass is $72.00 but adds 25 minutes per trip. What should he compare before deciding?',
      choices:[
        {id:'total',label:'Full monthly cost of each option plus reliability, time, and whether the ride is required for work.',feedback:'Correct. One $9.60 ride looks small; $384.00 a month of them does not.'},
        {id:'payment',label:'Only the $9.60 price of one ride.',feedback:'Ownership/operation can add several other required or variable costs.',mis:'payment-is-total'},
        {id:'fuel',label:'Only fuel costs, since those change most often.',feedback:'Fuel matters, but so do fixed and irregular costs such as insurance, parking, maintenance, and repairs.',mis:'volatile-means-only'},
        {id:'payment-plus-insurance',label:'Only this week\u2019s rideshare total; the rest is too small to matter.',feedback:'Fuel, maintenance, repairs, and parking add up fast. Small recurring costs are exactly what break a tight car budget.',mis:'small-costs-dont-matter'}
      ],
      correct:'total'
    },
    {
      prompt:'Casey can join a coworker\u2019s carpool for a $40.00/week gas share, or buy a used car at $196.80/month plus her own insurance and maintenance. What should she compare before deciding?',
      choices:[
        {id:'total',label:'Payment plus insurance, fuel, maintenance/repairs, parking, and the carpool as an alternative.',feedback:'Correct. The car\u2019s payment is one line; the carpool quote is the whole line — compare totals, not one against the other\u2019s part.'},
        {id:'payment',label:'Only the $196.80 car payment against the $40.00 gas share.',feedback:'Ownership/operation can add several other required or variable costs.',mis:'payment-is-total'},
        {id:'fuel',label:'Only fuel because that is the only cost that changes.',feedback:'Fuel matters, but so do fixed and irregular costs such as insurance, parking, maintenance, and repairs.',mis:'volatile-means-only'},
        {id:'payment-plus-insurance',label:'Payment plus insurance; maintenance is too small to matter.',feedback:'Fuel, maintenance, repairs, and parking add up fast. Small recurring costs are exactly what break a tight car budget.',mis:'small-costs-dont-matter'}
      ],
      correct:'total'
    }
  ]
};

// Worked real-world examples: story-first teaching, one per module.
// h = short title; story = concrete situation with real numbers;
// math = the key calculation shown in one line.
export const ADULT_WORKED_EXAMPLES = {
  banking: [
    {
      h:'The $96.47 insurance bill',
      story:'Maya\u2019s banking app shows $118.62 on Tuesday night. An insurance autopay of $96.47 posts Wednesday morning. She wants a $34.18 dinner with friends tonight. She protects the $96.47 first, which leaves $22.15 — so the dinner does not fit tonight, and she makes plans for after payday instead.',
      math:'118.62 \u2212 96.47 = $22.15 truly flexible before the dinner decision.'
    }
  ],
  credit: [
    {
      h:'The $214.30 urgent-care bill',
      story:'Riley puts a $214.30 urgent-care bill on his credit card at 24.99% APR because he cannot pay it this month. He plans to pay $40.00 a month. The first month\u2019s interest alone is about $25.84, so the $214.30 bill will cost him well over $240.00 by the time it is gone — the card bought time, not a discount.',
      math:'214.30 \u00d7 (0.2499 \u00f7 12) \u2248 $25.84 in interest the very first month.'
    }
  ],
  scams: [
    {
      h:'The $1,842.17 \u201csafe account\u201d call',
      story:'Noah gets a call claiming to be his bank\u2019s fraud department: $1,842.17 in suspicious charges, and he must wire his money to a \u201csafe account\u201d immediately. He hangs up, calls the number printed on his debit card, and the real bank confirms there is no fraud at all. The \u201csafe account\u201d was the scammer\u2019s account.',
      math:'$1,842.17 demanded by wire \u2212 $1,842.17 verified first = $0 lost.'
    }
  ],
  'first-job': [
    {
      h:'The $1,048.50 that became $876.44',
      story:'Ava\u2019s offer letter says $1,048.50 gross per pay period. Her first deposit is $876.44 — taxes and deductions took the rest before she ever saw it. She builds her rent-and-food plan from $876.44, the money that actually arrived, instead of budgeting $172.06 she never had.',
      math:'1,048.50 \u2212 876.44 = $172.06 that never reaches her \u2014 plan from 876.44.'
    }
  ],
  'health-insurance': [
    {
      h:'The $82.40 premium that cost $4,988.80',
      story:'Priya needs knee surgery this year. Plan A\u2019s $82.40 monthly premium looks cheapest next to Plan B\u2019s $156.90. But Plan A has a $4,000.00 deductible, so the surgery year costs her $988.80 in premiums plus the full $4,000.00 deductible before the plan pays much. The \u201ccheap\u201d plan is the expensive one for a surgery year.',
      math:'(82.40 \u00d7 12) + 4,000.00 = $4,988.80 out of pocket before Plan A covers most of the surgery.'
    }
  ],
  renting: [
    {
      h:'The $1,214.60 house that cost $1,442.20',
      story:'Riley\u2019s housing budget is $1,400.00 a month. A house lists at $1,214.60, which looks like it fits — until the lease adds required $85.00/month pet rent and tenant-paid electric averaging $142.60. The real monthly number is $1,442.20, which is $42.20 over his budget, so he keeps looking.',
      math:'1,214.60 + 85.00 + 142.60 = $1,442.20, which is $42.20 over the 1,400.00 budget.'
    }
  ],
  utilities: [
    {
      h:'The $38.90 fall bill and the $121.45 winter one',
      story:'Noah\u2019s lease makes him responsible for electric, and the utility company shows the unit\u2019s history: $38.90 in mild fall months, $121.45 in deep winter. Instead of budgeting the fall number and getting blindsided in January, he plans from the average and keeps the winter buffer in his housing plan.',
      math:'(38.90 + 121.45) \u00f7 2 = $80.18 average monthly electric to budget.'
    }
  ],
  groceries: [
    {
      h:'The $41.75 that became $18.35 of breathing room',
      story:'Jordan has $41.75 for groceries until payday. Before shopping, he checks the kitchen: pasta, sauce, and leftover stir-fry are already there. He plans meals around them and buys only the missing items for $23.40, which leaves $18.35 as a buffer instead of duplicating food he already owns.',
      math:'41.75 \u2212 23.40 = $18.35 left as a buffer for the week.'
    }
  ],
  transportation: [
    {
      h:'The $9.60 ride that cost $422.40 a month',
      story:'Riley rideshares to work at $9.60 each way, five days a week — it feels cheap per ride. Over a month that is $422.40, while the bus pass is $72.00. The pass adds 25 minutes per trip, so he weighs the $350.40 monthly difference against his time and the job\u2019s start time before deciding.',
      math:'(9.60 \u00d7 2 \u00d7 22) = $422.40 rideshare vs. $72.00 bus pass for the month.'
    }
  ]
};

// Append-merge (not Object.assign): this batch adds variants alongside the
// others instead of replacing them. Canonical items stay at index 0.
for (const [__k, __v] of Object.entries(ADULT_PRACTICE_VARIANTS))
  ADULT_PRACTICE_VARIANT_BANK[__k] = [...(ADULT_PRACTICE_VARIANT_BANK[__k] || []), ...__v];
