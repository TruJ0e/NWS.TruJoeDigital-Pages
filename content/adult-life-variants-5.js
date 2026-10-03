// NWS adult-life content depth — expertise build (2026-10-03).
// Adds application/adaptation variants for the 4 core topics so learners
// encounter novel scenarios requiring transfer, not just repetition.
// Keys and good answers match canonical items exactly (check-gapB enforced).
import { ADULT_TRANSFER_VARIANT_BANK, ADULT_RETENTION_VARIANT_BANK } from './adult-life-assessment.js';

export const ADULT_TRANSFER_VARIANTS = {
  banking: [
    {
      question:'You get paid Friday. Rent ($800) is due Monday, and your balance is $950. A friend invites you on a $120 weekend trip leaving tonight. What is the expert move?',
      choices:[['reserve','Protect the $800 rent first, then decide if the trip fits in the remaining $150.'],['spend','Go on the trip because $950 covers both.','spend-before-obligation'],['overdraft','Go and let overdraft handle any shortfall.','overdraft-as-backup'],['borrow','Borrow the $120 so the $950 stays untouched.','borrow-to-spend']],
      good:'reserve',
      help:'Same routine, new pressure: a fun, time-limited offer does not change which dollars already have a job.'
    }
  ],
  credit: [
    {
      question:'You have $300 saved for a $300 bike. A store card offers "0% for 6 months" with a $35 annual fee. What should your plan recognize?',
      choices:[['debt','The card still creates a $300 debt plus a $35 fee; 0% interest is not 0% cost.'],['income','The 0% offer means the bike is free for 6 months.','credit-as-income'],['minimum','The bike only costs the minimum payment each month.','min-payment-trap'],['later','The annual fee does not count because it is charged later.','later-is-free']],
      good:'debt',
      help:'Promotional rates change the interest, not the debt. Fees are part of the true cost.'
    }
  ],
  safety: [
    {
      question:'A caller says they are from your phone company, offers a 50% discount, and asks for your account PIN to "apply it." What is the safest first action?',
      choices:[['verify','Hang up and call the company back on their official number.'],['pay','Give the PIN — a discount is worth it.','urgency-overrides-verify'],['reply','Give the PIN but ask them to prove who they are first.'],['call','Ask them to call back later so you can think.','their-number-verifies']],
      good:'verify',
      help:'A reward plus a request for credentials is the same pattern as a threat plus a request for payment: verify through a channel you trust.'
    }
  ],
  housing: [
    {
      question:'Two apartments: A is $900/mo with utilities included. B is $750/mo but you pay ~$120 utilities and $40 parking. Which is cheaper per month, and what else matters?',
      choices:[['bundle','B totals ~$910 vs A at $900 — compare the full bundle, then weigh commute, lease terms, and deposit.'],['rent','B, because $750 is less than $900.','sticker-rent'],['parking','A, because parking fees are the only thing that matters.'],['deposit','Whichever has the lower deposit — monthly costs even out.']],
      good:'bundle',
      help:'Stripping the bundle to sticker rent flips the answer. Always rebuild the full monthly total before comparing.'
    }
  ]
};

export const ADULT_RETENTION_VARIANTS = {
  banking: [
    {
      question:'Your balance is $200. You wrote a $150 check yesterday that has not cleared, and you want to buy $60 shoes. What is actually flexible?',
      choices:[['five','About $50, because the $150 check is already spoken for even though it has not cleared.'],['sixty','$200, because that is the displayed balance.'],['one-fifteen','$260, because the check might not clear for days.']],
      good:'five',
      help:'Money you have committed counts as spent for planning purposes, whether or not it has cleared.'
    }
  ],
  credit: [
    {
      question:'You pay your $500 card balance in full every month. A friend says you are "wasting the card." What is accurate?',
      choices:[['borrowing','You are using the card as a payment tool, not borrowing — no interest, no debt carried.'],['income','You should carry a balance to build credit faster.'],['savings','Paying in full means the purchases were free.']],
      good:'borrowing',
      help:'Paying in full means the card never becomes debt. Carrying a balance does not build credit faster — it builds interest charges.'
    }
  ],
  safety: [
    {
      question:'A job posting asks you to "verify your identity" by sending a photo of your driver\u2019s license before any interview. What should you do?',
      choices:[['known-channel','Do not send it. Research the company independently and apply through their official site.'],['message-link','Send it — real jobs need ID.'],['send-pin','Send it plus your SSN to speed things up.']],
      good:'known-channel',
      help:'Legitimate employers do not collect ID documents before an interview. Verify the company exists through channels you find yourself.'
    }
  ],
  housing: [
    {
      question:'Your lease renews with a $50/mo increase. A neighbor says "just ignore it, they never enforce it." How should you treat the increase?',
      choices:[['include','Include it. The signed lease sets what you owe; a neighbor\u2019s guess does not override it.'],['ignore','Ignore it because the neighbor has lived there longer.'],['deposit','Treat it as a one-time fee instead of monthly.']],
      good:'include',
      help:'The lease is the source of truth for what you owe. Hearsay does not change a signed agreement.'
    }
  ]
};

// Append-merge: adds alongside other batches. Canonical items stay at index 0.
for (const [__k, __v] of Object.entries(ADULT_TRANSFER_VARIANTS))
  ADULT_TRANSFER_VARIANT_BANK[__k] = [...(ADULT_TRANSFER_VARIANT_BANK[__k] || []), ...__v];
for (const [__k, __v] of Object.entries(ADULT_RETENTION_VARIANTS))
  ADULT_RETENTION_VARIANT_BANK[__k] = [...(ADULT_RETENTION_VARIANT_BANK[__k] || []), ...__v];
