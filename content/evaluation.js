export const EVALUATION_PROTOCOL_VERSION = '0.1-draft';

export const EVALUATION_POSITION = {
  label:'Evaluation-ready, not efficacy-validated',
  statement:'NWS evaluation should progress from autistic-partnered co-design and feasibility to transfer/retention studies before any broad efficacy claim.',
  governance:'Formal research intended to contribute to generalizable knowledge requires the institution’s human-research determination before recruitment or research data collection.'
};

export const EVALUATION_PHASES = [
  {id:'codesign',label:'Phase 0 — Participatory co-design',purpose:'Find accessibility, wording, relevance, dignity, and workflow problems with autistic participants/partners before efficacy testing.'},
  {id:'feasibility',label:'Phase 1 — Feasibility & usability',purpose:'Confirm core tasks can be completed, measurement works, and critical interface barriers are resolved.'},
  {id:'preliminary',label:'Phase 2 — Preliminary learning / transfer',purpose:'Measure within-person accuracy, support, novel transfer, delayed retention, and recovery.'},
  {id:'comparative',label:'Phase 3 — Comparative efficacy',purpose:'Consider a powered comparative/randomized design only after intervention delivery, outcomes, accessibility, and recruitment are stable.'}
];

export const EVALUATION_DIMENSIONS = [
  {id:'accuracy',label:'Accuracy',definition:'Coherent/correct response for the defined financial scenario.'},
  {id:'independence',label:'Independence',definition:'Level of support required to complete the skill.'},
  {id:'transfer',label:'Transfer',definition:'Performance on a pre-designated novel scenario that meaningfully differs from training.'},
  {id:'retention',label:'Retention',definition:'Performance after a delay, reported together with support level and actual interval.'},
  {id:'recovery',label:'Recovery',definition:'Ability to re-plan after a reversible simulated error or changed constraint.'},
  {id:'usability',label:'Usability / accessibility',definition:'Ability to operate and understand the interface without avoidable barriers.'},
  {id:'acceptability',label:'Acceptability',definition:'Whether learners consider the experience respectful, relevant, useful, and tolerable.'}
];

export const SUPPORT_LEVELS = [
  {value:0,label:'Independent'},
  {value:1,label:'Learner-requested general hint'},
  {value:2,label:'Specific cue'},
  {value:3,label:'Worked step / model'},
  {value:4,label:'Facilitator directly supplies/completes response'}
];

export const ERROR_CATEGORIES = [
  'classification_context','arithmetic','required_cost_omission','recurring_cost_omission',
  'future_obligation_omission','income_interpretation','benefits_rule_confusion','navigation_interface','other_coded'
];

export const EVALUATION_DATA_EXCLUSIONS = [
  'learner name','email','phone','student ID','diagnosis','medical information','SSN',
  'benefit claim number','bank information','free-text notes','IP address','device fingerprint',
  'exact wall-clock timestamp when relative order is sufficient'
];

export const READINESS_CHECKS = [
  'Institutional determination obtained before formal human-subjects research data collection',
  'Accessible consent materials reviewed',
  'Participation separated from grades/services/coercive leverage',
  'Autistic participant/partner input included in design',
  'Novel transfer probes defined before analysis',
  'Prompt/support coding plan defined',
  'Retention intervals and acceptable windows defined',
  'Privacy/data-retention plan approved',
  'Critical accessibility blockers resolved for the tested path',
  'Analysis language avoids unvalidated mastery/efficacy claims'
];
