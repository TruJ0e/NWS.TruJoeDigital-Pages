export const RETRIEVAL_INTERVAL_DAYS = [1, 7, 21];

const DAY_MS = 86400000;
const iso = value => new Date(value).toISOString();

function completedStages(state, skill) {
  return (state.learning?.delayedChecks || [])
    .filter(x => x.skill === skill && x.status === 'completed' && x.correct && !x.prompted)
    .map(x => Number(x.stage) || 0);
}

export function nextRetrievalStage(state, skill) {
  const stages = completedStages(state, skill);
  return stages.length ? Math.max(...stages) + 1 : 0;
}

export function scheduleDelayedCheck(state, skill, {
  now = Date.now(),
  stage = nextRetrievalStage(state, skill),
  sourceDecisionId = null,
  seed = null
} = {}) {
  state.learning ||= {};
  state.learning.delayedChecks ||= [];
  if (stage >= RETRIEVAL_INTERVAL_DAYS.length) return null;

  const existing = state.learning.delayedChecks.find(x =>
    x.skill === skill && x.stage === stage && x.status === 'scheduled'
  );
  if (existing) return existing;

  const intervalDays = RETRIEVAL_INTERVAL_DAYS[stage];
  const dueAt = Number(now) + intervalDays * DAY_MS;
  const check = {
    id: `retrieval-${skill}-${stage}-${Number(now)}`,
    skill,
    stage,
    intervalDays,
    scheduledAt: iso(now),
    dueAt: iso(dueAt),
    status: 'scheduled',
    sourceDecisionId,
    scenarioSeed: seed || `${state.profile?.scenarioSeed || 'NWS'}-${skill}-R${stage + 1}`,
    correct: null,
    prompted: null,
    completedAt: null
  };
  state.learning.delayedChecks.push(check);
  return check;
}

export function dueDelayedChecks(state, now = Date.now()) {
  return (state.learning?.delayedChecks || []).filter(x =>
    x.status === 'scheduled' && new Date(x.dueAt).getTime() <= Number(now)
  );
}

export function completeDelayedCheck(state, id, {
  correct,
  prompted = false,
  now = Date.now()
} = {}) {
  const check = (state.learning?.delayedChecks || []).find(x => x.id === id);
  if (!check) return null;
  check.status = 'completed';
  check.correct = !!correct;
  check.prompted = !!prompted;
  check.completedAt = iso(now);

  if (check.correct && !check.prompted) {
    scheduleDelayedCheck(state, check.skill, {
      now,
      stage: check.stage + 1,
      sourceDecisionId: check.sourceDecisionId,
      seed: `${state.profile?.scenarioSeed || 'NWS'}-${check.skill}-R${check.stage + 2}`
    });
  }
  return check;
}

export function retrievalStatus(state, skill, now = Date.now()) {
  const checks = (state.learning?.delayedChecks || []).filter(x => x.skill === skill);
  const completed = checks.filter(x => x.status === 'completed');
  const due = checks.filter(x => x.status === 'scheduled' && new Date(x.dueAt).getTime() <= Number(now));
  const scheduled = checks.filter(x => x.status === 'scheduled');
  const independentCorrect = completed.filter(x => x.correct && !x.prompted).length;
  return {
    completed: completed.length,
    independentCorrect,
    due: due.length,
    scheduled: scheduled.length,
    retentionPercent: completed.length ? Math.round(100 * independentCorrect / completed.length) : null
  };
}
