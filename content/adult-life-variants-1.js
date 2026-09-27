// NWS adult-life content depth v3 — Gap B, batch 1: banking, credit, scams, first-job, health-insurance.
// Each variant is a new concrete situation testing the SAME durable skill, SAME judgment path,
// SAME correct choice id, and SAME plain-direct voice as the canonical items.
// Canonical items stay at index 0; these are appended.
import { ADULT_PRACTICE_VARIANT_BANK } from './adult-life.js';
import { ADULT_TRANSFER_VARIANT_BANK, ADULT_RETENTION_VARIANT_BANK } from './adult-life-assessment.js';

export const ADULT_PRACTICE_VARIANTS = {
  banking: [
    {
      prompt:'Your app shows $118.62. A $96.47 car-insurance autopay is scheduled for tomorrow, and you are considering a $34.18 purchase today. What should you do first?',
      choices:[
        {id:'check-obligations',label:'Protect the scheduled $96.47 first and check what will remain.',feedback:'This uses the NWS decision routine: account for a known required payment before treating the visible balance as flexible money.'},
        {id:'spend-visible',label:'Spend the $34.18 because the app currently shows $118.62.',feedback:'The displayed balance does not erase a known scheduled payment. A pending obligation still matters.',mis:'spend-before-obligation'},
        {id:'assume-overdraft',label:'Spend it and assume overdraft coverage will handle the bill.',feedback:'Overdraft coverage can involve fees or borrowing. It is not extra income.',mis:'overdraft-as-backup'},
        {id:'split-purchase',label:'Buy a $10 version now and the rest after the autopay clears.',feedback:'Splitting still spends flexible money before a known required payment posts. Protect the $96.47 first, then decide with what remains.'}
      ],
      correct:'check-obligations'
    },
    {
      prompt:'Your app shows $74.10. A $68.20 rent-related autopay is scheduled for Friday, and you are considering an $11.49 food order tonight. What should you do first?',
      choices:[
        {id:'check-obligations',label:'Protect the scheduled $68.20 first and check what will remain.',feedback:'This uses the NWS decision routine: account for a known required payment before treating the visible balance as flexible money.'},
        {id:'spend-visible',label:'Spend the $11.49 because the app currently shows $74.10.',feedback:'The displayed balance does not erase a known scheduled payment. A pending obligation still matters.',mis:'spend-before-obligation'},
        {id:'assume-overdraft',label:'Order it and assume overdraft coverage will handle the bill.',feedback:'Overdraft coverage can involve fees or borrowing. It is not extra income.',mis:'overdraft-as-backup'},
        {id:'split-purchase',label:'Order a cheaper $5 version now and the rest after the autopay clears.',feedback:'Splitting still spends flexible money before a known required payment posts. Protect the $68.20 first, then decide with what remains.'}
      ],
      correct:'check-obligations'
    }
  ],
  credit: [
    {
      prompt:'A $412.36 car repair will not fit your current plan. A credit card would let you pay for it today. What is the financially accurate way to classify the card?',
      choices:[
        {id:'borrowed',label:'Borrowed money that creates a future payment obligation.',feedback:'Correct. Credit changes when you pay, not whether the repair ultimately has a cost.'},
        {id:'income',label:'Extra income because the card increases what I can spend today.',feedback:'A credit limit is not income. Using it creates debt that must be repaid.',mis:'credit-as-income'},
        {id:'savings',label:'Savings because I can delay paying for the repair.',feedback:'Delaying payment does not turn a bill into savings and may add interest or fees.',mis:'delay-is-savings'},
        {id:'free-until-bill',label:'Free money until the statement arrives.',feedback:'The statement arrives with the full $412.36 owed plus any interest or fees. Later is a due date, not a discount.',mis:'later-is-free'}
      ],
      correct:'borrowed'
    },
    {
      prompt:'You want $263.75 worth of tools for a side job. Putting them on a credit card would let you start this weekend. What is the financially accurate way to classify the card?',
      choices:[
        {id:'borrowed',label:'Borrowed money that creates a future payment obligation.',feedback:'Correct. Credit changes when you pay, not whether the tools ultimately have a cost.'},
        {id:'income',label:'Extra income because the card increases what I can spend today.',feedback:'A credit limit is not income. Using it creates debt that must be repaid.',mis:'credit-as-income'},
        {id:'savings',label:'Savings because I can delay paying for the tools.',feedback:'Delaying payment does not turn a purchase into savings and may add interest or fees.',mis:'delay-is-savings'},
        {id:'free-until-bill',label:'Free money until the statement arrives.',feedback:'The statement arrives with the full $263.75 owed plus any interest or fees. Later is a due date, not a discount.',mis:'later-is-free'}
      ],
      correct:'borrowed'
    }
  ],
  scams: [
    {
      prompt:'A caller claims to be a sheriff and says a family member owes $2,840.17 in bail, payable immediately in cryptocurrency. What is the best first action?',
      choices:[
        {id:'verify',label:'End the contact and verify through the family member or the courthouse using a number you already know.',feedback:'Correct. Separate the verification step from the person creating the urgency.'},
        {id:'pay',label:'Pay quickly so the family member is released, then verify afterward.',feedback:'Urgent cryptocurrency payment is a major scam signal. Paying first can make recovery difficult.',mis:'urgency-overrides-verify'},
        {id:'share',label:'Give account information so the caller can prove the case details.',feedback:'Do not provide financial or personal information to an unexpected caller. Verify independently.'},
        {id:'callback',label:'Call back the number the caller gave you to confirm.',feedback:'A scammer’s callback number reaches the scammer. Verify through a number you already know: the courthouse, a known official site, or the family member directly.',mis:'their-number-verifies'}
      ],
      correct:'verify'
    },
    {
      prompt:'A text claiming to be the IRS says you owe $987.52 in back taxes and must pay by wire transfer within two hours. What is the best first action?',
      choices:[
        {id:'verify',label:'End the contact and verify through the IRS using a number or website you already know.',feedback:'Correct. Separate the verification step from the person creating the urgency.'},
        {id:'pay',label:'Wire the money quickly to avoid penalties, then verify afterward.',feedback:'Urgent wire-transfer payment is a major scam signal. Paying first can make recovery difficult.',mis:'urgency-overrides-verify'},
        {id:'share',label:'Give account information so the texter can prove the balance.',feedback:'Do not provide financial or account information to an unexpected texter. Verify independently.'},
        {id:'callback',label:'Call the number in the text to confirm it is real.',feedback:'A scammer’s supplied number reaches the scammer. Verify through a number you already know: a past notice, the app, or the official site.',mis:'their-number-verifies'}
      ],
      correct:'verify'
    }
  ],
  'first-job': [
    {
      prompt:'You are planning next month using a salary job that lists $2,134.00 gross per month, but $1,762.18 actually lands in your account. Which number belongs in the amount-available step?',
      choices:[
        {id:'take-home',label:'The $1,762.18 actually deposited to you.',feedback:'Correct. Budget from money actually available after deductions, not the larger gross-pay figure.'},
        {id:'gross',label:'The $2,134.00 gross wages before any deductions.',feedback:'Gross pay helps describe earnings, but it is not the same as the amount available to spend after withholding/deductions.',mis:'paycheck-gross'},
        {id:'annual',label:'The annual salary divided by twelve, no matter how payroll works.',feedback:'Pay frequency, withholding, and deductions matter. Use the actual take-home amount for the immediate plan.'},
        {id:'gross-minus-guess',label:'The $2,134.00 minus a rough guess at taxes.',feedback:'Guessing at deductions is still guessing. The $1,762.18 is the number that actually reaches you; budget from that.',mis:'guess-is-good-enough'}
      ],
      correct:'take-home'
    },
    {
      prompt:'Your hourly job pays $12.75 an hour for about 32 hours a week, and your first deposit is $346.12. Which number belongs in the amount-available step for your budget?',
      choices:[
        {id:'take-home',label:'The $346.12 actually deposited to you.',feedback:'Correct. Budget from money actually available after deductions, not the larger gross-pay figure.'},
        {id:'gross',label:'The $408.00 gross wages before any deductions.',feedback:'Gross pay helps describe earnings, but it is not the same as the amount available to spend after withholding/deductions.',mis:'paycheck-gross'},
        {id:'annual',label:'The hourly rate times full-time hours, then divided by twelve.',feedback:'Pay frequency, hours, withholding, and deductions matter. Use the actual take-home amount for the immediate plan.'},
        {id:'gross-minus-guess',label:'The $408.00 minus a rough guess at taxes.',feedback:'Guessing at deductions is still guessing. The $346.12 is the number that actually reaches you; budget from that.',mis:'guess-is-good-enough'}
      ],
      correct:'take-home'
    }
  ],
  'health-insurance': [
    {
      prompt:'Plan A has a $48.20 monthly premium, 40% coinsurance after a large deductible. Plan B has a $112.75 premium, $25 copays, and a small deductible. You expect regular therapy visits. Does the lowest premium automatically make Plan A cheapest for the year?',
      choices:[
        {id:'no-total',label:'No. Compare premiums plus expected deductible, copay/coinsurance costs, and coverage.',feedback:'Correct. A low premium can come with higher cost sharing; actual needs and plan rules matter.'},
        {id:'yes-premium',label:'Yes. The premium is the only cost that matters.',feedback:'Premium is only one part of total health-plan cost.',mis:'premium-is-total'},
        {id:'ignore-network',label:'Yes, as long as I ignore whether my therapist is in network.',feedback:'Network rules can materially affect what you pay and whether costs count toward plan limits.',mis:'network-doesnt-matter'},
        {id:'ask-friend',label:'Yes, if a coworker with Plan A pays less overall.',feedback:'Someone else’s care needs are not yours. Total cost depends on your expected care, deductible, copays, and network.',mis:'friend-math'}
      ],
      correct:'no-total'
    },
    {
      prompt:'Plan C advertises the lowest monthly premium at $61.30. You take a monthly prescription and see a specialist twice a year. Does that automatically make it the least expensive plan for the year?',
      choices:[
        {id:'no-total',label:'No. Compare premiums plus expected prescription costs, copays/coinsurance, and coverage.',feedback:'Correct. A low premium can come with higher cost sharing; actual needs and plan rules matter.'},
        {id:'yes-premium',label:'Yes. The premium is the only cost that matters.',feedback:'Premium is only one part of total health-plan cost.',mis:'premium-is-total'},
        {id:'ignore-network',label:'Yes, as long as I ignore whether my doctors and pharmacy are in network.',feedback:'Network rules can materially affect what you pay and whether costs count toward plan limits.',mis:'network-doesnt-matter'},
        {id:'ask-friend',label:'Yes, if a friend with Plan C pays less overall.',feedback:'Someone else’s care needs are not yours. Total cost depends on your expected care, prescriptions, copays, and network.',mis:'friend-math'}
      ],
      correct:'no-total'
    }
  ]
};

export const ADULT_TRANSFER_VARIANTS = {
  banking: [
    {
      question:'Your checking account shows $132.47. A $110.00 gym-membership autopay is scheduled for tomorrow, and a friend asks you to chip in $28.50 for a group gift tonight. What should you do first?',
      choices:[['reserve','Protect the $110.00 scheduled payment and check what remains.'],['spend','Spend the $28.50 because $132.47 is visible now.', 'spend-before-obligation'],['overdraft','Pay and assume overdraft will cover the autopay.','overdraft-as-backup'],['borrow','Borrow $28.50 from another friend so the $132.47 stays untouched.','borrow-to-spend']],
      good:'reserve',
      help:'Treat known scheduled obligations as already spoken for before deciding what is flexible.'
    },
    {
      question:'Your app shows $203.18. A $187.64 insurance draft posts Monday, and you are eyeing a $45.99 online purchase today. What should you do first?',
      choices:[['reserve','Protect the $187.64 scheduled draft and check what remains.'],['spend','Buy it because $203.18 is visible now.', 'spend-before-obligation'],['overdraft','Buy it and assume overdraft will cover the draft.','overdraft-as-backup'],['borrow','Put the purchase on a friend’s card and settle up later so your balance stays untouched.','borrow-to-spend']],
      good:'reserve',
      help:'Treat known scheduled obligations as already spoken for before deciding what is flexible.'
    }
  ],
  credit: [
    {
      question:'A $189.50 set of headphones can go on a credit card with a $30 minimum payment. What should your plan recognize?',
      choices:[['debt','The purchase creates a $189.50 debt obligation; the minimum payment is not the total cost.'],['income','The card adds $189.50 of income this month.','credit-as-income'],['minimum','The purchase only costs $30 because that is the minimum payment.','min-payment-trap'],['later','The purchase costs nothing until the bill arrives.','later-is-free']],
      good:'debt',
      help:'Credit changes when you pay for something; it does not turn borrowed money into income.'
    },
    {
      question:'A $527.25 laptop repair can go on a credit card, and the statement will show a $35 minimum payment. What should your plan recognize?',
      choices:[['debt','The repair creates a $527.25 debt obligation; the minimum payment is not the total cost.'],['income','The card adds $527.25 of income this month.','credit-as-income'],['minimum','The repair only costs $35 because that is the minimum payment.','min-payment-trap'],['later','The repair costs nothing until the bill arrives.','later-is-free']],
      good:'debt',
      help:'Credit changes when you pay for something; it does not turn borrowed money into income.'
    }
  ],
  safety: [
    {
      question:'An email says your bank account will be locked in two hours unless you pay a $214.77 “verification fee” in gift cards. What is the safest first action?',
      choices:[['verify','Do not use the link; verify through your bank app or the number on your card.'],['pay','Pay quickly to keep the account open, then verify.','urgency-overrides-verify'],['reply','Reply with your account number so the sender can confirm.'],['call','Call the number in the email to confirm it is real.','their-number-verifies']],
      good:'verify',
      help:'Urgency plus hard-to-reverse payment is a reason to stop and verify independently.'
    },
    {
      question:'A caller says your pharmacy account owes $146.20 and demands immediate payment by wire transfer. What is the safest first action?',
      choices:[['verify','Do not use the caller’s link or number; verify through the pharmacy’s known app or website.'],['pay','Pay quickly to keep the prescription active, then verify.','urgency-overrides-verify'],['reply','Give your card number so the caller can check the balance.'],['call','Call back the number the caller provided to confirm.','their-number-verifies']],
      good:'verify',
      help:'Urgency plus hard-to-reverse payment is a reason to stop and verify independently.'
    }
  ],
  paperwork: [
    {
      question:'It is January, and your old employer hands you a W-2 for the summer job you left. A roommate says it is the form you use to set withholding at your new job. What is its main role in this learning scenario?',
      choices:[['wages','It reports prior-year wages and withholding used when preparing a tax return.'],['withholding-choice','It tells a new employer how much federal income tax to withhold.'],['paycheck','It replaces each pay statement during the year.'],['id','It serves as a government ID for the new job.']],
      good:'wages',
      help:'W-2 reports prior-year wage/withholding information. W-4 is the employee withholding form generally completed when starting or changing a job.'
    },
    {
      question:'You are preparing a tax return and need last year’s total wages and the income tax already withheld. Which document is the one that reports those?',
      choices:[['wages','Form W-2, which reports prior-year wages and withholding used when preparing a tax return.'],['withholding-choice','Form W-4, because you filled it out when you were hired.'],['paycheck','Your last pay statement of the year.'],['id','Your employee ID badge.']],
      good:'wages',
      help:'W-2 reports prior-year wage/withholding information. W-4 is the employee withholding form generally completed when starting or changing a job.'
    }
  ],
  'health-costs': [
    {
      question:'Plan D has the lowest premium, but you need a surgery this year that will involve hospital visits and follow-ups. What is the better comparison before choosing?',
      choices:[['total','Compare premiums plus expected deductible, copays/coinsurance, network rules, and coverage.'],['premium','Choose the lowest premium automatically.','premium-is-total'],['deductible','Compare only the deductible and ignore premiums and other cost sharing.'],['brand','Choose the plan from the most familiar company.']],
      good:'total',
      help:'Health-plan cost is a bundle. The lowest premium does not automatically produce the lowest total cost.'
    },
    {
      question:'Plan E has the lowest premium, but your child sees a specialist quarterly and needs labs each time. What is the better comparison before choosing?',
      choices:[['total','Compare premiums plus expected deductible, copays/coinsurance, network rules, and coverage.'],['premium','Choose the lowest premium automatically.','premium-is-total'],['deductible','Compare only the deductible and ignore premiums and other cost sharing.'],['brand','Choose the plan from the company with the best commercials.']],
      good:'total',
      help:'Health-plan cost is a bundle. The lowest premium does not automatically produce the lowest total cost.'
    }
  ]
};

export const ADULT_RETENTION_VARIANTS = {
  banking: [
    {
      question:'Your balance is $62.45 and a $57.90 electricity draft posts before your next refill. What amount should you treat as flexible before checking anything else?',
      choices:[['five','About $5, because the scheduled $57.90 still matters.'],['sixty','$62.45, because that is the displayed balance.'],['one-fifteen','$120.35, because the draft can be paid later.']],
      good:'five',
      help:'Subtract or protect known required payments before treating the visible balance as flexible money.'
    },
    {
      question:'Your app shows $88.30 and a $83.55 streaming-and-phone bundle charge is scheduled to post tomorrow. What amount should you treat as flexible before checking anything else?',
      choices:[['five','About $5, because the scheduled $83.55 still matters.'],['sixty','$88.30, because that is the displayed balance.'],['one-fifteen','Over $170, because the charge can wait until next month.']],
      good:'five',
      help:'Subtract or protect known required payments before treating the visible balance as flexible money.'
    }
  ],
  credit: [
    {
      question:'Your card issuer raises your limit from $1,200 to $1,700. What changed?',
      choices:[['borrowing','Your available borrowing capacity changed, not your income or savings.'],['income','Your monthly income increased by $500.'],['savings','Your savings increased by $500.']],
      good:'borrowing',
      help:'A credit limit is permission to borrow up to a limit, not money you earned or saved.'
    },
    {
      question:'You open a second credit card and gain $2,500 of new available credit. What changed?',
      choices:[['borrowing','Your available borrowing capacity changed, not your income or savings.'],['income','Your monthly income increased by $2,500.'],['savings','Your savings increased by $2,500.']],
      good:'borrowing',
      help:'A credit limit is permission to borrow up to a limit, not money you earned or saved.'
    }
  ],
  safety: [
    {
      question:'A message claiming to be your phone carrier says your service will be cut off today unless you pay through a new link. What should you do?',
      choices:[['known-channel','Open the carrier app yourself or use the number on your bill or known website.'],['message-link','Use the message link because the warning is urgent.'],['send-pin','Reply with your account PIN so the carrier can verify you.']],
      good:'known-channel',
      help:'Use a contact path you already know is legitimate rather than the one supplied by the unexpected message.'
    },
    {
      question:'A voicemail says fraud was detected on your debit card and tells you to press a number to reverse it immediately. What should you do?',
      choices:[['known-channel','Hang up and call the bank using the number on your card or its known website.'],['message-link','Press the number in the voicemail because the warning is urgent.'],['send-pin','Enter your PIN over the phone so the bank can verify you.']],
      good:'known-channel',
      help:'Use a contact path you already know is legitimate rather than the one supplied by the unexpected message.'
    }
  ],
  paperwork: [
    {
      question:'Your new employer hands you the federal form that tells them how much income tax to withhold from each paycheck. Which form is it?',
      choices:[['w4','Form W-4.'],['w2','Form W-2.'],['lease','A rental lease.']],
      good:'w4',
      help:'W-4 is generally completed for withholding; W-2 reports prior-year wages and withholding.'
    },
    {
      question:'You changed your withholding after a life change, and HR asks you to complete the form that updates it. Which form is it?',
      choices:[['w4','Form W-4.'],['w2','Form W-2.'],['lease','A rental lease.']],
      good:'w4',
      help:'W-4 is generally completed for withholding; W-2 reports prior-year wages and withholding.'
    }
  ],
  'health-costs': [
    {
      question:'A plan lists a $40 copayment for a covered specialist visit. What does “copayment” describe?',
      choices:[['fixed','A fixed amount charged for that covered service under the plan rules.'],['percent','A percentage of the allowed cost.'],['premium','The recurring amount paid to keep coverage active.']],
      good:'fixed',
      help:'Copayment is generally a fixed amount for a covered service; coinsurance is percentage-based.'
    },
    {
      question:'Your urgent-care visit has a $75 copayment listed on your plan summary. What does “copayment” describe?',
      choices:[['fixed','A fixed amount charged for that covered service under the plan rules.'],['percent','A percentage of the allowed cost.'],['premium','The recurring amount paid to keep coverage active.']],
      good:'fixed',
      help:'Copayment is generally a fixed amount for a covered service; coinsurance is percentage-based.'
    }
  ]
};

Object.assign(ADULT_PRACTICE_VARIANT_BANK, ADULT_PRACTICE_VARIANTS);
Object.assign(ADULT_TRANSFER_VARIANT_BANK, ADULT_TRANSFER_VARIANTS);
Object.assign(ADULT_RETENTION_VARIANT_BANK, ADULT_RETENTION_VARIANTS);
