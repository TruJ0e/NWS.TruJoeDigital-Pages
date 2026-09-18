export const SCAFFOLD_LEVELS = [
  {id:'Teach',goal:'Understand the modeled reasoning',automaticSupport:'worked'},
  {id:'Guide',goal:'Choose with visible cues and optional steps',automaticSupport:'cues'},
  {id:'Practice',goal:'Complete with minimal proactive assistance',automaticSupport:'minimal'},
  {id:'Simulate',goal:'Transfer the skill to novel situations',automaticSupport:'none'}
];

const SUPPORT = {
  buy:{Teach:'Protect required costs first. Example: available money minus known Needs shows what is flexible.',Guide:'What must still be paid before the next income or refill?',Practice:'Check the balance, upcoming Needs, and what changes later if you spend now.',Simulate:'Review the next income date and any known obligations.'},
  save:{Teach:'Work from the goal backward: amount still needed ÷ periods remaining. Then check whether that fits after Needs.',Guide:'What remains after required costs? Is the goal pace realistic this period?',Practice:'Compare the planned contribution with flexible money.',Simulate:'Consider the goal, deadline, and upcoming obligations.'},
  sub:{Teach:'Monthly cost × 12 shows yearly impact. Cost ÷ uses estimates cost per use.',Guide:'Compare monthly cost, yearly cost, use, overlap, and personal value.',Practice:'What does keeping this service delay or reduce elsewhere?',Simulate:'Check recurring impact before deciding.'}
};

export function supportTextFor(level,kind){ return SUPPORT[kind]?.[level]||''; }
