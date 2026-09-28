// NWS variant engine (content-depth rework, phase 1; misconception-targeted
// retries wired in the adjust pass).
// Stable-but-personal question variants: the SKILL stays invariant while the
// surface varies (numbers with cents, names, stores, situations, time frames,
// wording). Seeded RNG means every learner gets a personal, reproducible set:
// the same learner always sees the same variant, and a miss-triggered retry
// gets a FRESH variant of the same skill TARGETED at the diagnosed
// misconception when one is known (diagnose, don't repeat).
//
// A generator step looks like:
//   {t:'try', skill:'sales-tax-total', tier:'independent',
//    gen:(v)=>({q, choices:[{label, ok, mis?}], hint, cue?, good, bad, why})}
// Choices may carry `mis` (a MISCONCEPTIONS id) so feedback diagnoses the
// predictable mistake instead of just saying "wrong".
import { hashSeed, seededRandom } from './scenarios.js';

// --- Learner seed: generated once per browser, stable across sessions. ---
const LEARNER_SEED_KEY='nwsLearnerSeed.v1';
export function learnerSeed(){
  try{
    let s=localStorage.getItem(LEARNER_SEED_KEY);
    if(!s){ s='NWS-'+Math.random().toString(36).slice(2,10); localStorage.setItem(LEARNER_SEED_KEY,s); }
    return s;
  }catch{ return 'NWS-fallback'; }
}

// --- Seeded RNG: rngFor('lesson-id', stepIdx, 'attempt-0') is deterministic. ---
export function rngFor(...parts){ return seededRandom(hashSeed(parts.join('|'))); }
export function makeVariant(seedString, ...parts){ return variantContext(rngFor(seedString, ...parts)); }

function variantContext(r){
  return {
    r,
    int:(min,max)=>min+Math.floor(r()*(max-min+1)),
    pick:(arr)=>arr[Math.floor(r()*arr.length)],
    shuffle:(arr)=>{ const a=arr.slice(); for(let i=a.length-1;i>0;i--){ const j=Math.floor(r()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; },
    money:(n)=>'$'+Number(n).toFixed(2),
    // Random price with cents, avoids round dollars so mental shortcuts fail.
    cents:(minD,maxD)=>{ const lo=Math.round(minD*100), hi=Math.round(maxD*100); return (lo+Math.floor(r()*(hi-lo+1)))/100; },
    person:()=>variantContext(r).pick(PEOPLE),
    place:()=>variantContext(r).pick(PLACES),
  };
}

// --- Context pools: rotate jobs, stores, situations for transfer. ---
export const PEOPLE=['Maya','Jordan','Priya','Sam','Alex','Riley','Casey','Taylor','Noah','Ava'];
export const PLACES=['the corner store','a campus shop','the grocery store','a thrift shop','an online store','the farmers market','a discount warehouse','the mall kiosk'];
export const JOBS=['a part-time shift','a weekend gig','a campus job','a summer job','an internship stipend'];

// --- Misconception registry: every distractor maps to a predictable mistake,
// so feedback can name what went wrong and the retry can target it. ---
export const MISCONCEPTIONS={
  'forgot-tax':'The register total includes tax — the tag price is not what you pay.',
  'tax-added-as-dollars':'The tax rate is a percent, not dollars to add on.',
  'discount-then-tax-order':'Discount comes off first, then tax applies to the discounted price.',
  'apr-as-monthly':'APR is the yearly rate. The monthly rate is APR ÷ 12.',
  'min-payment-trap':'The minimum is not the plan — the rest keeps charging interest every month.',
  'added-not-compounded':'Growth earns growth: each year applies to the new total, not just the start.',
  'apy-apr-confusion':'APY includes compounding; APR does not. Same digits, different meaning.',
  'balance-not-available':'The balance includes money that already has a job (rent, subscriptions).',
  'available-means-balance':'Available = balance minus what you already committed.',
  'unit-price-sticker':'Compare what you will USE, not what is in the package.',
  'total-not-unit':'The total price is not the comparison — divide by what you will actually use.',
  'ignores-trip-cost':'The drive to the deal costs money too — gas and time.',
  'sale-not-needed':'A discount on something you were not buying is spending, not saving.',
  'subscription-blindness':'Monthly × 12 is the real size of the decision.',
  'per-day-illusion':'A small daily number hides a big monthly total — multiply it out.',
  'paycheck-gross':'You do not get the gross — take-home is after taxes and deductions.',
  'emergency-as-savings':'An emergency fund is not spending money; it is insurance you keep.',
  // --- Adjust pass: every distractor in the variant engine maps to a
  // predictable mistake. One-liners render in feedback as "The trap: ...".
  'windfall-exception':'Found money spends exactly like earned money — gifts and windfalls run the same routine.',
  'savings-means-no-spending':'Savings is a job for some dollars, not a ban on spending the rest.',
  'savings-skippable':'Skipping the Savings move for a Want breaks the order — the Want waits.',
  'not-spending-is-saving':'Not spending is not saving — saving means money actually moved to later.',
  'cheap-means-need':'A low price does not change the job — a cheap Want is still a Want.',
  'even-split':'Splitting evenly feels fair, but Needs eat first — fairness does not change the order.',
  'absolute-rules':'Absolute rules ("never", "always") skip the actual situation — run the numbers for this one.',
  'first-come-first-served':'First come is not a decision rule — the routine sorts by job, not arrival order.',
  'price-only-decision':'Price alone does not decide — check the flexible amount and the job first.',
  'pending-is-cash':'Pending, promised, or confirmed money is not in hand — spend from what has arrived.',
  'spend-pending-save-cash':'Spending the pending amount while "keeping cash safe" still spends money you do not have.',
  'great-week-splurge':'A great week does not change the routine — windfalls get sorted, not splurged.',
  'average-is-plan':'An average hides the real numbers — plan from actual amounts, not the middle.',
  'save-everything':'Saving everything is not the routine either — Needs, the Savings move, then Wants from what is left.',
  'buffers-are-for-steady':'Irregular income needs buffers most — the buffer is the plan for uneven weeks.',
  'needs-are-flexible':'Needs are not flexible — the routine protects them before pacing starts.',
  'savings-from-leftovers':'Savings is moved first, not from whatever is left at month-end.',
  'protect-first':'Protect fixed costs first, then pace what is left — pacing the whole lump overspends.',
  'pace-math':'Pace = flexible money ÷ time left, matched to the period — one division, counted once.',
  'plan-never-changes':'The pace updates when the numbers change — "stick to the plan" ignores new information.',
  'no-pace-needed':'No weekly limit is not a pace — the limit is the point.',
  'pace-doesnt-apply':'Lump sums need pacing most — a semester is just more weeks.',
  'savings-doesnt-touch-spending':'Saving more leaves less to pace — the Savings move changes the spending number.',
  'job-money-extra':'Job money is pace money too — all income runs the routine.',
  'add-week-to-lump':'Income joins the total once — adding a week of pay to the lump sum counts it twice.',
  'keep-separate':'"Keep them separate" skips the combined plan — all money paces together.',
  'afford-more':'"Can afford more" is not the pace — the numbers set it, not confidence.',
  'close-enough-math':'"Close enough" monthly math hides weekly reality — do the period math.',
  'nothing-safe':'Protecting Needs does not mean nothing is safe — the flexible amount is real.',
  'skip-spending-breaks-pace':'Planned spending inside the pace does not break it — the pace is the plan.',
  'return-as-plan':'Planning to return it is not a decision — decide from the pace before buying.',
  'discount-doubles':'Two of a deal is still spending — the discount changes the price, not the pace.',
  'pace-absorbs':'"The pace can absorb it" is a feeling — check the numbers.',
  'sale-timing':'Waiting for a bigger sale is not a decision rule — compare the current price against the plan.',
  'free-means-stockup':'Free still costs storage, spoilage, and the trip — stock up only what you will use.',
  'low-price-justifies':'A low price alone does not justify the buy — it still has to fit the flexible amount.',
  'sticker-compare':'Shelf price is not out-the-door price — tax and trip costs change the comparison.',
  'urgency-pricing':'"Today only" is sales pressure, not a price forecast — decide from the plan.',
  'smaller-is-safer':'Smaller is not automatically safer — compare what you will actually use.',
  'same-category-same-value':'Same category is not same value — compare per usable unit.',
  'others-use':'"Someone will take the extra" is a hope, not a plan — compare what YOU will use.',
  'exact-quantity-tie':'Both covering the need does not make it a tie — the cheaper total still wins.',
  'want-value-irrelevant':'Even Wants deserve value — the routine still compares once you decide to buy.',
  'trip-math':'Compare trip cost against the savings — "never worth it" and "always cheapest" both skip the math.',
  'double-count-savings':'Count the savings once — the round trip is one decision.',
  'close-enough-prices':'"Basically the same" hides real cents — multiply by the gallons.',
  'small-per-unit':'Small per-unit gaps multiply — do the multiplication before dismissing them.',
  'price-means-quality':'Cheaper gas is not lower quality — compare the numbers, not the story.',
  'tax-absorbed':'The store does not absorb sales tax — you pay rate × price.',
  'sticker-gap-trust':'The sticker gap is not the out-the-door gap — tax changes the comparison.',
  'no-conversion':'The question asks for the monthly rate — the yearly number is not the answer.',
  'rule-72-flip':'Rule of 72: 72 ÷ rate gives years — flipping it gives nonsense.',
  'interest-eats-all':'Interest does not eat the whole payment — part of every payment cuts the balance.',
  'fee-inevitable':'Fees feel automatic, but each one has an off switch — the dodge is the lesson.',
  'fee-face-value':'A fee does not cost its face value — it joins the balance and earns interest too.',
  'shuffle-fee':'Paying a fee with another card moves the cost — it does not remove it.',
  'surprises-unplannable':'You cannot schedule surprises, but you can fund them — that is what the buffer is for.',
  'small-saves-nothing':'Small steady amounts fill the buffer — the math is weeks × amount.',
  'savings-compounds':'Steady saving adds up; it does not compound — the total is weeks × amount.',
  'schedule-swap':'Monthly and weekly are different amounts — the same number on a slower schedule saves less.',
  'buffer-vs-interest':'Money in the buffer does not erase card interest — compare both sides of the choice.',
  'emergency-misuse':'Not every big bill is an emergency — the fund covers surprises, not planned costs.',
  'goal-trophy-spend':'Hitting the goal is the win — spending the fund restarts the climb.',
  'emergency-invests':'Emergency money has one job: be there. Growth is for other dollars.',
  'fund-fungibility':'Different savings have different jobs — raiding one fund breaks its plan.',
  'goal-swap':'Moving the goalposts spends the fund — finish or consciously reassign, not drift.',
  'credit-shield':'A credit card does not protect savings — it adds interest to the cost.',
  'guilt-is-budgeting':'Guilt is not a budgeting method — the fund exists to be used on purpose.',
  'spend-the-fund':'Spending the fund now breaks its job — "later", "half", and "celebrate" all spend it.',
  'close-enough':'Close enough is not the goal — finish the buffer, then redirect.',
  'miss-means-fail':'A missed month is a detour, not a failure — adjust the pace, keep the goal.',
  'fund-is-plan':'The fund is the tool, not the plan — the repair still needs its full cost.',
  'fund-purity':'Using the fund for its purpose is not failure — that is what it is for.',
  'obligation-is-available':'The bill amount is not the spending number — subtract it, do not spend it.',
  'timing-dodge':'"Not today" does not erase the obligation — it posts whether you worry or not.',
  'skip-obligation':'Skipping the autopay does not make money available — the bill still comes.',
  'not-due-means-safe':'Not due yet is not safe to spend — the bills still have a job.',
  'total-is-safe':'The total is not the safe number — pacing and obligations come out first.',
  'daily-equals-total':'The safe amount covers the whole period — spending it daily multiplies it.',
  'sort-dodge':'"It depends" and "guess to be safe" dodge the sort — judge what it is for.',
  'price-decides-need':'Price does not decide the bucket — the job does.',
  'extreme-alternative':'"Could always walk" is not the test — judge the actual situation.',
  'bundle-justifies':'One purchase does not make it one Need — sort each part by its job.',
  'motivation-premium':'Motivation does not change the bucket — the upgrade is a Want.',
  'investment-relabel':'Calling a purchase an "investment" does not make it Savings.',
  'need-no-matter-cost':'Even Needs get compared — "whatever it costs" skips cheaper ways to meet it.',
  'eventual-need':'"Eventually" is not now — sort by what it is for right now.',
  'defer-forever':'Deferring forever is not deciding — judge the actual need now.',
  'period-math':'Match the multiplier to the period — monthly × 12 is a year, × 6 is half.',
  'hearsay-number':'A number without an official source is hearsay — check it before planning on it.',
  'unverified-source':'Views, friends, and specific-looking numbers do not verify anything — check the official source.',
  'folk-rules':'Benefit rules change — check current official guidance, not memory.',
  'numbers-permanent':'Published figures change — check the current official number.',
  'optimistic-plan':'Plan from verified numbers, not the optimistic one.',
  'sunk-subscription':'Paid months are gone either way — judge the subscription on its future value.',
  'price-alone-cancels':'Too much for what? Compare price against use and alternatives.',
  'someday-subscription':'"Someday" is not a use — subscriptions need current value.',
  'cheaper-means-keep':'Cheaper is not automatically the keeper — compare value per use.',
  'assume-included':'Utility responsibility is confirmed in the lease, not assumed.',
  'variable-means-unplannable':'Variable costs can be estimated and buffered — uncertainty is a reason to plan.',
  'vary-is-a-number':'"Vary" is not a number — get typical costs before the lease locks them in.',
  'premium-is-total':'The premium is only one part of total health-plan cost.',
  'network-doesnt-matter':'Network rules change what you pay and what counts toward plan limits.',
  'friend-math':"Someone else's costs are not yours — total cost depends on your care and plan.",
  'sticker-rent':'Sticker rent can be only part of the recurring housing obligation.',
  'upfront-is-all':'Upfront costs matter, but the recurring bundle must fit every month after move-in.',
  'fees-negotiable':'Lease-required fees are part of the recurring cost whether you negotiate or not.',
  'payment-is-total':'Ownership adds insurance, fuel, maintenance, repairs, parking — the payment is one part.',
  'volatile-means-only':'The cost that changes most is not the only cost — fixed and irregular costs count too.',
  'small-costs-dont-matter':'Small recurring costs are exactly what break a tight budget.',
  'one-percent-fits-all':'No single grocery percentage fits every budget — start with your actual needs.',
  'memory-inventory':'A memory list duplicates what you own and misses what you need.',
  'guess-is-good-enough':'A guess at deductions is still a guess — budget from the take-home amount.',
  'overdraft-as-backup':'Overdraft coverage is expensive borrowing, not a backup balance.',
  'spend-before-obligation':'Spending anything before a scheduled obligation posts spends money the bill needs.',
  'borrow-to-spend':'Borrowing to spend keeps the balance pretty but adds a debt — the spending still happened.',
  'credit-as-income':'A credit limit is not income — using it creates debt that must be repaid.',
  'delay-is-savings':'Delaying a payment is not saving — the cost stays, and interest may grow it.',
  'later-is-free':'A later due date is not a discount — the full amount still comes due.',
  'urgency-overrides-verify':'Urgency is the reason to verify, not a reason to skip it.',
  'their-number-verifies':'A callback number from the person demanding payment reaches that person — use a channel you trust.',
};

// --- Resolve a try step to its concrete question (gen or static). ---
// attempt=0 is the base variant (cached in-session); retries bump the attempt
// so the learner gets a fresh variant of the same skill.
//
// Misconception-targeted retries: an attempt may carry a diagnosed
// misconception as "n|mis-id" (see parseAttempt). When it does, resolveTry
// searches nearby deterministic sub-seeds for a variant whose distractors
// include that misconception's choice — same skill AND same misconception.
// If no sub-seed surfaces it, the base same-skill variant is kept; a
// distractor is never fabricated.
export function parseAttempt(attempt){
  if(typeof attempt==='string'){
    const m=/^(\d+)\|([a-z0-9-]+)$/.exec(attempt);
    if(m) return {n:parseInt(m[1],10), targetMis:m[2]};
    const n=parseInt(attempt,10);
    return {n:Number.isInteger(n)&&n>=0?n:0, targetMis:null};
  }
  return {n:(Number.isInteger(attempt)&&attempt>=0?attempt:0), targetMis:null};
}
const variantCache=new Map();
function buildVariant(lessonId, stepIdx, step, n, targetMis, sub){
  const seedParts=[learnerSeed(), lessonId, stepIdx, 'attempt-'+n];
  if(targetMis) seedParts.push('mis-'+targetMis);
  if(sub) seedParts.push('sub-'+sub);
  const v=variantContext(rngFor(...seedParts));
  v.attempt=n; v.targetMis=targetMis||null;
  const base=typeof step.gen==='function'
    ? step.gen(v)
    : {q:step.q, choices:step.choices, hint:step.hint, cue:step.cue, good:step.good, bad:step.bad, why:step.why};
  return {q:base.q, choices:base.choices.slice(), hint:base.hint, cue:base.cue, good:base.good, bad:base.bad, why:base.why, skill:step.skill||null, tier:step.tier||'independent', attempt:n, targetMis:targetMis||null, subAttempt:sub||0};
}
const hasMis=(resolved,misId)=>resolved.choices.some(c=>!c.ok&&c.mis===misId);
export function resolveTry(lessonId, stepIdx, step, attempt=0){
  const {n, targetMis}=parseAttempt(attempt);
  const key=lessonId+':'+stepIdx+':'+n+':'+(targetMis||'');
  let hit=variantCache.get(key);
  if(!hit){
    const isGen=typeof step.gen==='function';
    hit=buildVariant(lessonId,stepIdx,step,n,null,0);
    // Freshness: a retry (n>=1) must not serve the identical question the
    // learner just saw. Compare against the previous attempt's untargeted
    // question (the common miss->retry flow); tiny variation spaces can still
    // collide, so skip duplicates while searching sub-seeds.
    const prevQ=(n>=1&&isGen)?buildVariant(lessonId,stepIdx,step,n-1,null,0).q:null;
    const isDup=c=>!!prevQ&&c.q===prevQ;
    if(isGen){
      if(targetMis&&(!hasMis(hit,targetMis)||isDup(hit))){
        for(let i=1;i<=24;i++){
          const cand=buildVariant(lessonId,stepIdx,step,n,targetMis,i);
          if(isDup(cand)) continue;
          if(hasMis(cand,targetMis)){ hit=cand; break; }
        }
        if(isDup(hit)||!hasMis(hit,targetMis)){
          for(let i=1;i<=24;i++){
            const cand=buildVariant(lessonId,stepIdx,step,n,targetMis,i);
            if(!isDup(cand)){ hit=cand; break; }
          }
        }
      }else if(!targetMis&&n>=1&&isDup(hit)){
        for(let i=1;i<=24;i++){
          const cand=buildVariant(lessonId,stepIdx,step,n,null,i);
          if(!isDup(cand)){ hit=cand; break; }
        }
      }
    }
    variantCache.set(key,hit);
  }
  return hit;
}

// --- Seeded choice shuffle: same learner+lesson+step+attempt always orders
// the same way, so answers, reviews, and replays stay consistent. ---
export function orderedChoices(resolved, lessonId, stepIdx){
  const r=rngFor(learnerSeed(), lessonId, stepIdx, 'order-'+resolved.attempt);
  const a=resolved.choices.slice();
  for(let i=a.length-1;i>0;i--){ const j=Math.floor(r()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; }
  return a;
}

// --- Skill evidence: per-skill accuracy in localStorage (additive; the old
// completion semantics are untouched). Gates are computed on SKILL accuracy,
// never on total score. ---
const SKILL_KEY='nwsSkillEvidence.v1';
function readSkills(){ try{ return JSON.parse(localStorage.getItem(SKILL_KEY))||{}; }catch{ return {}; } }
function writeSkills(s){ try{ localStorage.setItem(SKILL_KEY, JSON.stringify(s)); }catch{} }
export function recordSkillAttempt(skill, correct, {misconception=null}={}){
  if(!skill) return;
  const s=readSkills();
  const cur=s[skill]||{asked:0,correct:0,misses:{}};
  cur.asked+=1; if(correct)cur.correct+=1;
  if(!correct&&misconception)cur.misses[misconception]=(cur.misses[misconception]||0)+1;
  s[skill]=cur; writeSkills(s);
}
export function skillStats(skill){
  const cur=readSkills()[skill];
  if(!cur||!cur.asked) return {asked:0,correct:0,pct:null,status:'not-started'};
  const pct=Math.round(cur.correct/cur.asked*100);
  const status=cur.asked>=3&&pct>=70?'solid':pct>=50?'building':'needs-practice';
  return {asked:cur.asked, correct:cur.correct, pct, status, misses:cur.misses||{}};
}
export function topMisconception(skill){
  const m=(readSkills()[skill]||{}).misses||{};
  let best=null,bestN=0;
  for(const [k,n] of Object.entries(m)) if(n>bestN){best=k;bestN=n;}
  return best?{id:best, count:bestN}:null;
}
export function misconceptionLine(id){ return MISCONCEPTIONS[id]||null; }

// --- Khan-style skill dots (informational only — never gates advancement).
// Thresholds are set so a click-through learner (~25% on 4-choice questions)
// can never reach Proficient: it requires sustained high accuracy.
export function skillDotStatus(skill){
  const st=skillStats(skill);
  if(!st.asked) return {level:'not-started',label:'Not started'};
  if(st.asked>=8&&st.pct>=85) return {level:'mastered',label:'Mastered'};
  if(st.asked>=5&&st.pct>=80) return {level:'proficient',label:'Proficient'};
  if(st.asked>=3&&st.pct>=50) return {level:'familiar',label:'Familiar'};
  return {level:'attempted',label:'Attempted'};
}
export const DOT_LEVELS=['not-started','attempted','familiar','proficient','mastered'];

// Human-readable skill names for review screens.
export const SKILL_LABELS={
  'unit-price-usable':'Unit price (what you use)',
  'available-money':'Available money',
  'pacing-weekly':'Weekly pacing',
  'safe-to-spend':'Safe to spend',
  'budget-tradeoff':'Budget tradeoffs',
  'sales-tax-total':'Sales tax total',
  'sales-tax-deal':'Deal judgment after tax',
  'sales-tax-compare':'Tax rate comparison',
  'apr-to-monthly':'APR → monthly rate',
  'min-payment-cost':'Minimum-payment cost',
  'card-fees':'Card fees',
  'compounding':'Compounding growth',
  'apy-vs-apr':'APY vs APR',
  'rule-of-72':'Rule of 72',
  'subscription-annual':'Subscription annual cost',
  'trip-cost':'Trip cost vs deal',
  'gas-value':'Gas value',
  'emergency-buffer':'Emergency buffer',
  'benefits-basics':'Benefits basics',
  'decision-routine':'Decision routine',
};
export function skillLabel(skill){ return SKILL_LABELS[skill]||skill.replace(/-/g,' '); }
