import { ADULT_LIFE_MODULES } from './adult-life.js';

const item=(question,choices,good,help)=>({question,choices,good,help});

export const ADULT_LIFE_ASSESSMENTS = {
  banking:{
    transfer:item(
      'Your checking account shows $90. A $75 rent autopay is scheduled for tomorrow, and you are considering spending $25 tonight. What should you do first?',
      [['reserve','Protect the $75 scheduled payment and check what remains.'],['spend','Spend the $25 because $90 is visible now.'],['overdraft','Spend it and assume overdraft will cover rent.']],
      'reserve',
      'Treat known scheduled obligations as already spoken for before deciding what is flexible.'
    ),
    retention:item(
      'Your balance is $60 and a $55 phone payment is scheduled before your next refill. What amount should you treat as flexible before checking anything else?',
      [['five','About $5, because the scheduled $55 still matters.'],['sixty','$60, because that is the displayed balance.'],['one-fifteen','$115, because the phone payment can be paid later.']],
      'five',
      'Subtract or protect known required payments before treating the visible balance as flexible money.'
    )
  },
  credit:{
    transfer:item(
      'A $240 purchase can go on a credit card with a $25 minimum payment. What should your plan recognize?',
      [['debt','The purchase creates a $240 debt obligation; the minimum payment is not the total cost.'],['income','The card adds $240 of income this month.'],['minimum','The purchase only costs $25 because that is the minimum payment.']],
      'debt',
      'Credit changes when you pay for something; it does not turn borrowed money into income.'
    ),
    retention:item(
      'Your card limit increases by $500. What changed?',
      [['borrowing','Your available borrowing capacity changed, not your income or savings.'],['income','Your monthly income increased by $500.'],['savings','Your savings increased by $500.']],
      'borrowing',
      'A credit limit is permission to borrow up to a limit, not money you earned or saved.'
    )
  },
  safety:{
    transfer:item(
      'A text says your university account is overdue and demands cryptocurrency within one hour. What is the safest first action?',
      [['verify','Do not use the link; verify through the university portal or a known official contact.'],['pay','Pay quickly to avoid a hold, then verify.'],['reply','Reply with account details so the sender can prove the balance.']],
      'verify',
      'Urgency plus hard-to-reverse payment is a reason to stop and verify independently.'
    ),
    retention:item(
      'A message claiming to be your bank says to click a link immediately to stop fraud. What should you do?',
      [['known-channel','Open the bank app yourself or use the number on the card or known website.'],['message-link','Use the message link because the warning is urgent.'],['send-pin','Reply with your PIN so the bank can verify you.']],
      'known-channel',
      'Use a contact path you already know is legitimate rather than the one supplied by the unexpected message.'
    )
  },
  paperwork:{
    transfer:item(
      'You received a W-2 after the end of the year. What is its main role in this learning scenario?',
      [['wages','It reports prior-year wages and withholding used when preparing a tax return.'],['withholding-choice','It tells a new employer how much federal income tax to withhold.'],['paycheck','It replaces each pay statement during the year.']],
      'wages',
      'W-2 reports prior-year wage/withholding information. W-4 is the employee withholding form generally completed when starting or changing a job.'
    ),
    retention:item(
      'You start a new job and the employer asks for the federal form used to determine income-tax withholding. Which form is it?',
      [['w4','Form W-4.'],['w2','Form W-2.'],['lease','A rental lease.']],
      'w4',
      'W-4 is generally completed for withholding; W-2 reports prior-year wages and withholding.'
    )
  },
  'health-costs':{
    transfer:item(
      'Plan A has a lower premium, but you expect frequent covered care. What is the better comparison before choosing?',
      [['total','Compare premiums plus expected deductible, copays/coinsurance, network rules, and coverage.'],['premium','Choose the lowest premium automatically.'],['deductible','Compare only the deductible and ignore premiums and other cost sharing.']],
      'total',
      'Health-plan cost is a bundle. The lowest premium does not automatically produce the lowest total cost.'
    ),
    retention:item(
      'A plan lists a $30 copayment for a covered visit. What does “copayment” describe?',
      [['fixed','A fixed amount charged for that covered service under the plan rules.'],['percent','A percentage of the allowed cost.'],['premium','The recurring amount paid to keep coverage active.']],
      'fixed',
      'Copayment is generally a fixed amount for a covered service; coinsurance is percentage-based.'
    )
  },
  housing:{
    transfer:item(
      'An apartment lists $850 rent, $60 required parking, and tenant-paid electricity. What belongs in the recurring housing comparison?',
      [['bundle','Rent plus required parking plus expected tenant-paid utilities and other lease-required recurring costs.'],['rent','$850 rent only.'],['parking','Only the $60 parking fee because rent is obvious.']],
      'bundle',
      'Housing affordability depends on the recurring bundle assigned by the lease, not sticker rent alone.'
    ),
    retention:item(
      'A lease says the tenant pays internet and electricity in addition to rent. How should those costs be treated?',
      [['include','Include them in the recurring housing plan.'],['ignore','Ignore them because they are not labeled rent.'],['deposit','Treat them only as one-time move-in deposits.']],
      'include',
      'Use the lease to identify which recurring costs are the tenant’s responsibility.'
    )
  },
  utilities:{
    transfer:item(
      'Electric bills are higher in winter and lower in spring. What is the stronger monthly planning approach?',
      [['buffer','Use available cost history/estimates and leave room for seasonal variation.'],['lowest','Budget only the lowest bill you have seen.'],['omit','Leave electricity out because the amount changes.']],
      'buffer',
      'Variable required costs still belong in the plan. Estimate them and preserve a buffer for variation.'
    ),
    retention:item(
      'Someone calls saying your water will be disconnected today unless you pay through a new payment link. What should happen first?',
      [['verify','Verify the account through a known utility website, bill, or phone number.'],['link','Use the new link immediately.'],['gift','Offer a gift card instead.']],
      'verify',
      'Unexpected urgent utility payment demands should be verified through a known legitimate channel.'
    )
  },
  food:{
    transfer:item(
      'You have $40 for food and already have rice, pasta, and frozen vegetables. What should you do before shopping?',
      [['plan','Plan meals around what you already have, then list the missing items.'],['bulk','Buy the biggest sale packages first.'],['percent','Use a universal grocery percentage instead of checking your actual food and budget.']],
      'plan',
      'Inventory-first meal planning connects purchases to food you will actually use.'
    ),
    retention:item(
      'A large package has the lowest unit price, but half is likely to spoil before you can use it. Is it automatically the better value?',
      [['no','No. Waste, storage, schedule, and actual use matter along with unit price.'],['yes','Yes. Lowest unit price is always the best financial choice.'],['ignore','Unit price and likely use never matter.']],
      'no',
      'A lower unit price is not savings when the extra amount will not realistically be used.'
    )
  },
  transportation:{
    transfer:item(
      'A transit pass costs more upfront than a few individual rides, but you travel to class and work most weekdays. What should you compare?',
      [['period','Total cost and reliability/access needs across the whole month or semester.'],['single','Only the price of one ride.'],['upfront','Only which option costs less today.']],
      'period',
      'Transportation choices should be compared over the relevant time period and include reliability/access constraints.'
    ),
    retention:item(
      'You are estimating the monthly cost of owning a car. Which set is most complete?',
      [['bundle','Payment if any, insurance, fuel, maintenance/repairs, parking, and other required operating costs.'],['payment','Car payment only.'],['fuel','Fuel only.']],
      'bundle',
      'Transportation ownership is a bundle of fixed, variable, and irregular costs.'
    )
  }
};

export const ADULT_LIFE_SKILLS = Object.freeze(Object.keys(ADULT_LIFE_ASSESSMENTS));

export function adultLifeAssessmentForSkill(skill,kind='transfer'){
  const set=ADULT_LIFE_ASSESSMENTS[skill];
  return set?.[kind]||null;
}

export function adultLifeModuleForSkill(skill){
  return ADULT_LIFE_MODULES.find(module=>module.skill===skill)||null;
}

export function isAdultLifeSkill(skill){ return ADULT_LIFE_SKILLS.includes(skill); }
