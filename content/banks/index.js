// NWS lesson variation banks: merged registry.
//
// Each module file exports BANK_<MODULE> = { '<lessonId>': [templates] }.
// Template schema (frozen — see docs/SCAFFOLD-MAP.md):
//   { id, verb, part, tier, skill, gen }
// Verbs: choice | sort | decide | spot | compare | predict | build | explain.
// Every lesson carries exactly 50 confirmed templates.
import { BANK_FOUNDATIONS } from './foundations.js';
import { BANK_PACING } from './pacing.js';
import { BANK_VALUE } from './value.js';
import { BANK_ADULT_MONEY } from './adult-money.js';
import { BANK_LIVING_COSTS } from './living-costs.js';
import { BANK_SUPPORT } from './support.js';

export const VARIATION_BANKS = Object.assign({},
  BANK_FOUNDATIONS,
  BANK_PACING,
  BANK_VALUE,
  BANK_ADULT_MONEY,
  BANK_LIVING_COSTS,
  BANK_SUPPORT
);
