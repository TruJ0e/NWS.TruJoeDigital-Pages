export const BENEFITS_REVIEW = {
  lastReviewed: '2026-09-16',
  reviewRequired: true,
  scope: 'U.S. federal introductory educational content only',
  disclaimer: 'NWS does not determine eligibility or benefit amounts. Rules can change. Use the linked official source for current decisions.'
};

export const BENEFIT_TOPICS = [
  {
    id: 'ssi-basics',
    title: 'SSI: needs-based cash support',
    summary: 'Supplemental Security Income (SSI) has income and resource rules. Work does not automatically mean SSI ends, but earnings can change the payment calculation.',
    stableConcepts: [
      'SSI is different from SSDI.',
      'Countable income and resources matter.',
      'Some earned income can be excluded under SSI rules.',
      'Students under age 22 may qualify for a separate Student Earned Income Exclusion if they meet SSA requirements.'
    ],
    currentFacts: [
      {label:'2026 federal SSI payment standard — individual',value:'$994/month'},
      {label:'2026 federal SSI payment standard — couple',value:'$1,491/month'},
      {label:'SSI resource limit — individual',value:'$2,000'},
      {label:'SSI resource limit — couple',value:'$3,000'},
      {label:'2026 Student Earned Income Exclusion',value:'Up to $2,410/month, maximum $9,730/year, for qualifying students under age 22'}
    ],
    source:{agency:'Social Security Administration',title:'2026 COLA Fact Sheet / SSI work incentives',url:'https://www.ssa.gov/cola/factsheets/2026.html',effective:'2026',reviewRequired:true}
  },
  {
    id: 'ssdi-basics',
    title: 'SSDI: insurance-based disability benefits',
    summary: 'Social Security Disability Insurance (SSDI) is based on insured status/work history or certain related entitlement categories. Its work rules differ from SSI.',
    stableConcepts: [
      'SSDI and SSI use different financial rules.',
      'A Trial Work Period applies to SSDI, not SSI.',
      'Substantial Gainful Activity (SGA) figures are adjusted periodically.',
      'Do not use one earnings threshold as a universal rule for every disability benefit situation.'
    ],
    currentFacts: [
      {label:'2026 SGA — nonblind',value:'$1,690/month'},
      {label:'2026 SGA — blind',value:'$2,830/month'},
      {label:'2026 Trial Work Period earnings trigger',value:'$1,210/month'}
    ],
    source:{agency:'Social Security Administration',title:'2026 Red Book / disability work thresholds',url:'https://www.ssa.gov/redbook/newfor2026.htm',effective:'2026',reviewRequired:true}
  },
  {
    id: 'able-basics',
    title: 'ABLE: disability-related saving without using an ordinary savings rule',
    summary: 'ABLE accounts are tax-advantaged accounts for qualified disability expenses. Eligibility and SSI treatment have specific rules, so NWS treats ABLE as a separate planning tool rather than ordinary savings.',
    stableConcepts: [
      'The ABLE account owner and beneficiary is the eligible individual.',
      'Beginning January 1, 2026, the disability or blindness must have begun before age 46 rather than before age 26.',
      'SSA excludes up to $100,000 of an ABLE account balance as a resource for SSI purposes, subject to program rules.',
      'ABLE eligibility and qualified-expense rules should be checked through official sources before making a real decision.'
    ],
    currentFacts: [
      {label:'Disability-onset age rule effective 2026',value:'Before age 46'},
      {label:'2026 standard annual ABLE contribution limit',value:'$20,000'},
      {label:'SSI resource exclusion for ABLE balance',value:'Up to $100,000, subject to SSA rules'}
    ],
    source:{agency:'Social Security Administration / Internal Revenue Service',title:'SSA ABLE Spotlight and IRS 2026 inflation adjustments',url:'https://www.ssa.gov/ssi/spotlights/spot-able.html',effective:'2026',reviewRequired:true},
    secondarySource:{agency:'Internal Revenue Service',title:'Internal Revenue Bulletin 2025-45 — 2026 ABLE contribution limitation',url:'https://www.irs.gov/irb/2025-45_IRB',effective:'2026',reviewRequired:true}
  },
  {
    id: 'representative-payee',
    title: 'Representative payee: support with Social Security money',
    summary: 'A representative payee is appointed by SSA to receive and manage Social Security or SSI payments for a beneficiary when SSA determines a payee is needed. It is not the same thing as owning the person’s money or making every life decision.',
    stableConcepts: [
      'The payee must use benefits for the beneficiary’s current and foreseeable needs and conserve remaining funds appropriately.',
      'A payee may be able to use an ABLE account when doing so is in the beneficiary’s best interests and applicable rules are followed.',
      'NWS should teach what the role is and when to ask questions, not simulate legal authority.'
    ],
    currentFacts: [],
    source:{agency:'Social Security Administration',title:'Representative Payee Program — Payee and ABLE Accounts',url:'https://www.ssa.gov/payee/able_accounts.htm',effective:'current',reviewRequired:true}
  },
  {
    id: 'work-benefits',
    title: 'Working while receiving disability benefits',
    summary: 'Work can interact with SSI and SSDI in different ways. NWS teaches learners to identify which program they have, locate current rules, and ask for benefits counseling before relying on a single number.',
    stableConcepts: [
      'SSI generally uses countable-income rules after eligibility; SSDI has separate work-incentive stages.',
      'The same paycheck can affect two people differently depending on program, age, student status, expenses, and other facts.',
      'A current official source or qualified benefits counselor should be used before making a real benefits decision.'
    ],
    currentFacts: [],
    source:{agency:'Social Security Administration',title:'SSI Work Incentives / Red Book',url:'https://www.ssa.gov/ssi/text-work-ussi.htm',effective:'current',reviewRequired:true}
  }
];

export function benefitsNeedingReview(now = new Date()) {
  const year=now.getUTCFullYear();
  return BENEFIT_TOPICS.filter(topic=>topic.source.reviewRequired && String(topic.source.effective)!==String(year) && topic.source.effective!=='current');
}
