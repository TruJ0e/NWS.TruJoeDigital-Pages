// NWS adult-life content depth — health-costs gap fill (2026-10-02).
// The health-costs topic had only 2 base questions (transfer + retention).
// These 4 variants bring it to 6, matching the other topics.
// Same durable skill, same judgment path, same plain-direct voice.
import { ADULT_TRANSFER_VARIANT_BANK, ADULT_RETENTION_VARIANT_BANK } from './adult-life-assessment.js';

export const ADULT_TRANSFER_VARIANTS = {
  'health-costs': [
    {
      question:'Plan B charges $45 per month with a $2,000 deductible. Plan C charges $120 per month with a $500 deductible. You expect one minor covered visit this year and no major care. What is the better comparison?',
      choices:[['total','Compare total yearly cost: premiums for 12 months plus expected deductible, copays, and coverage rules.'],['premium','Pick Plan B because $45 is less than $120.','premium-is-total'],['deductible','Pick Plan C because the deductible is lower, ignoring premiums.'],['brand','Pick the plan from the most familiar company.']],
      good:'total',
      help:'Yearly cost is premiums times 12 plus what you actually expect to pay for care. Low use favors low premiums; high use can favor low deductibles.'
    },
    {
      question:'Your plan covers preventive visits at no charge but a specialist visit costs a $60 copay. You need to see a specialist twice this year. What should your plan account for?',
      choices:[['total','About $120 in copays for the two specialist visits, on top of premiums and any deductible.'],['premium','Only the monthly premium matters.','premium-is-total'],['deductible','Only the deductible matters for specialist visits.'],['brand','It does not matter which plan; all specialists cost the same.']],
      good:'total',
      help:'Covered does not mean free. Copays are fixed amounts you pay per visit under the plan rules.'
    }
  ]
};

export const ADULT_RETENTION_VARIANTS = {
  'health-costs': [
    {
      question:'Your plan lists a $25 copayment for a covered urgent-care visit. You go twice this year. What do you pay for those visits?',
      choices:[['fixed','A fixed $25 for each visit, so about $50 total for the two.'],['percent','A percentage of each visit cost that changes every time.'],['premium','Nothing extra; the monthly premium already covers it.']],
      good:'fixed',
      help:'A copayment is a fixed amount per covered service. Two visits at $25 means about $50.'
    },
    {
      question:'A friend says a copay and coinsurance are the same thing. What is the accurate distinction?',
      choices:[['fixed','Copay is a fixed dollar amount; coinsurance is a percentage of the allowed cost.'],['percent','They are identical; the names are interchangeable.'],['premium','Both are just other words for the monthly premium.']],
      good:'fixed',
      help:'Copayment = fixed amount. Coinsurance = percentage share. Both are cost-sharing, but they work differently.'
    }
  ]
};

// Append-merge: adds alongside other batches. Canonical items stay at index 0.
for (const [__k, __v] of Object.entries(ADULT_TRANSFER_VARIANTS))
  ADULT_TRANSFER_VARIANT_BANK[__k] = [...(ADULT_TRANSFER_VARIANT_BANK[__k] || []), ...__v];
for (const [__k, __v] of Object.entries(ADULT_RETENTION_VARIANTS))
  ADULT_RETENTION_VARIANT_BANK[__k] = [...(ADULT_RETENTION_VARIANT_BANK[__k] || []), ...__v];
