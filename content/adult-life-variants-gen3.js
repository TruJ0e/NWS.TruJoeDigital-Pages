// NWS adult-life massive variant generation — gen3: housing + utilities.
// 200 transfer + 200 retention per topic (800 total). Parametric templates ×
// seeded combinations. Deterministic: same index always yields the same
// question. Keys/good match canonical (check-gapB). Goal: learners rarely
// see the same question twice in a session.
import { ADULT_TRANSFER_VARIANT_BANK, ADULT_RETENTION_VARIANT_BANK } from './adult-life-assessment.js';

// Seeded PRNG for deterministic generation
function mulberry32(a){
  return function(){
    a|=0; a=a+0x6D2B79F5|0;
    let t=Math.imul(a^a>>>15,1|a);
    t=t+Math.imul(t^t>>>7,61|t)^t;
    return ((t^t>>>14)>>>0)/4294967296;
  };
}
const pick=(arr,r)=>arr[Math.floor(r()*arr.length)];
const int=(r,lo,hi)=>lo+Math.floor(r()*(hi-lo+1));
const money=n=>'$'+n;
const FEMALE=new Set(['Maya','Sofia','Priya','Lena','Aisha','Zoe','Ruby','Nora','Ivy','Mila','Aria','Nina','Tessa','Wren','Hazel']);
const poss=n=>FEMALE.has(n)?'her':'his';
const subj=n=>FEMALE.has(n)?'she':'he';

const NAMES=['Maya','Jamal','Sofia','Tyler','Priya','Marcus','Lena','Diego','Aisha','Noah','Zoe','Ethan','Ruby','Liam','Nora','Owen','Ivy','Caleb','Mila','Jonah','Aria','Felix','Nina','Omar','Tessa','Victor','Wren','Yusuf','Hazel','Silas'];

const GEN = {
  // ============ HOUSING ============
  housing:{
    transfer(i){
      const r=mulberry32(i*104729+13);
      const person=pick(NAMES,r);
      const tpl=int(r,0,3);
      if(tpl===0){
        // Apartment comparison: sticker rent vs full bundle
        const rentA=int(r,800,1100);
        const rentB=int(r,600,Math.max(601,rentA-150));
        const utilB=int(r,80,160);
        const parkB=int(r,0,60);
        const totB=rentB+utilB+parkB;
        const parkTxt=parkB>0?` plus ${money(parkB)} parking`:'';
        return {question:`${person} compares two apartments. A: ${money(rentA)}/mo, utilities included. B: ${money(rentB)}/mo, but the tenant pays about ${money(utilB)} in utilities${parkTxt}. What is the right comparison?`,
          choices:[['bundle',`Compare the full monthly totals: A is ${money(rentA)}, B is about ${money(totB)}.`],['rent',`B — ${money(rentB)} is less than ${money(rentA)}.`,'sticker-rent'],['parking',`Only compare the parking fees.`],['deposit',`Only compare the security deposits — monthly costs even out.`,'upfront-is-all']],
          good:'bundle',help:'Rebuild the full monthly total for each option before comparing. Sticker rent alone flips the answer.'};
      }
      if(tpl===1){
        // Single listing: rent + required parking + tenant utility
        const rent=int(r,650,1200);
        const park=int(r,25,75);
        const util=pick(['electricity','gas','water'],r);
        const utilAmt=int(r,40,110);
        return {question:`A listing shows ${money(rent)} rent, a required ${money(park)}/mo parking fee, and tenant-paid ${util} of about ${money(utilAmt)}. What belongs in the recurring housing comparison?`,
          choices:[['bundle',`Rent plus required parking plus expected tenant-paid ${util} and other lease-required costs.`],['rent',`${money(rent)} rent only.`,'sticker-rent'],['parking',`Only the ${money(park)} parking fee, since the rent is already known.`],['deposit',`Only the security deposit; the monthly costs sort themselves out.`,'upfront-is-all']],
          good:'bundle',help:'Housing affordability depends on the recurring bundle assigned by the lease, not sticker rent alone.'};
      }
      if(tpl===2){
        // Roommate split: true per-person monthly cost
        const rent=int(r,900,1500);
        const roommates=pick([2,3],r);
        const share=Math.round(rent/roommates);
        const util=int(r,90,180);
        const utilShare=Math.round(util/roommates);
        const total=share+utilShare;
        return {question:`${person} will split a ${money(rent)}/mo apartment with ${roommates-1} roommate${roommates>2?'s':''}. Utilities run about ${money(util)}/mo, split evenly. What is ${person}'s true monthly housing cost?`,
          choices:[['bundle',`About ${money(total)}: ${money(share)} rent share plus ${money(utilShare)} utility share.`],['rent',`${money(share)} — just the rent split.`,'sticker-rent'],['parking',`Whatever parking costs, split ${roommates} ways.`],['deposit',`Only the move-in deposit divided by ${roommates}.`,'upfront-is-all']],
          good:'bundle',help:'Split every recurring cost, not just rent. The utility share is part of the monthly total.'};
      }
      // Lease renewal: rent increase + new required fee
      const rent=int(r,700,1100);
      const increase=int(r,25,75);
      const feeName=pick(['trash collection','pest control','a common-area fee'],r);
      const fee=int(r,15,40);
      const newTotal=rent+increase+fee;
      return {question:`${person}'s lease renews: rent goes from ${money(rent)} to ${money(rent+increase)}, and a required ${money(fee)}/mo ${feeName} is added. What is the new monthly housing cost to plan around?`,
        choices:[['bundle',`About ${money(newTotal)}: new rent plus the required ${feeName}.`],['rent',`${money(rent+increase)} — the old rent plus the increase.`,'sticker-rent'],['parking',`Only what parking costs now.`],['deposit',`Only the renewal deposit, if any.`,'upfront-is-all']],
        good:'bundle',help:'A renewal can change more than rent. Rebuild the bundle from the new lease terms.'};
    },
    retention(i){
      const r=mulberry32(i*224737+29);
      const person=pick(NAMES,r);
      const tpl=int(r,0,2);
      if(tpl===0){
        const util=pick(['trash collection','water','sewer','lawn care'],r);
        return {question:`${person}'s lease says the tenant pays ${util} in addition to rent. How should that cost be treated?`,
          choices:[['include','Include it in the recurring housing plan.'],['ignore','Ignore it because it is not labeled rent.','sticker-rent'],['deposit','Treat it only as a one-time move-in cost.','upfront-is-all']],
          good:'include',help:'Use the lease to identify which recurring costs are the tenant\u2019s responsibility.'};
      }
      if(tpl===1){
        const fee=pick(['renters insurance','a pet fee','a storage fee'],r);
        const amt=int(r,12,45);
        return {question:`${person}'s landlord mentions a required ${money(amt)}/mo ${fee} and says "it is small, do not worry about it." How should that cost be treated?`,
          choices:[['include','Include it. Required monthly costs belong in the plan no matter how small.'],['ignore','Ignore it — the landlord said not to worry.','sticker-rent'],['deposit','Treat it as a one-time move-in cost.','upfront-is-all']],
          good:'include',help:'"Small" and "monthly" can both be true. The lease decides, not the landlord\u2019s tone.'};
      }
      const util=pick(['electricity','internet','gas'],r);
      const amt=int(r,35,95);
      return {question:`${person} is budgeting. Which belongs in the monthly housing plan: a ${money(amt)} ${util} bill the tenant pays, or the one-time application fee?`,
        choices:[['include',`The ${money(amt)} ${util} bill — it recurs every month.`],['ignore',`Neither — only rent counts as housing.`,'sticker-rent'],['deposit','Only the application fee.','upfront-is-all']],
        good:'include',help:'Separate recurring from one-time. The monthly bill stays in the plan; the fee does not.'};
    }
  },
  // ============ UTILITIES ============
  utilities:{
    transfer(i){
      const r=mulberry32(i*335895+47);
      const person=pick(NAMES,r);
      const tpl=int(r,0,3);
      if(tpl===0){
        // Seasonal variation
        const util=pick(['Electric','Gas','Water'],r);
        const low=int(r,30,60);
        const high=int(r,110,190);
        const mid=Math.round((low+high)/2);
        return {question:`${person}'s ${util.toLowerCase()} bills run about ${money(low)} in mild months and ${money(high)} in extreme months. What is the stronger monthly planning approach?`,
          choices:[['buffer',`Budget around ${money(mid)} and leave room for the ${money(high)} months.`],['lowest',`Budget only the ${money(low)} bill.`,'optimistic-plan'],['omit','Leave it out because the amount changes.','variable-means-unplannable'],['card','Put the high months on a credit card and budget only the low ones.']],
          good:'buffer',help:'Variable required costs still belong in the plan. Estimate them and preserve a buffer for variation.'};
      }
      if(tpl===1){
        // First apartment, no history
        const util=pick(['electric','gas'],r);
        const guess=int(r,70,130);
        return {question:`${person} is renting for the first time and has no ${util} bill history. A neighbor in a similar unit pays about ${money(guess)}. What is the stronger approach?`,
          choices:[['buffer',`Budget a bit above ${money(guess)} until there is real history, and keep a buffer.`],['lowest',`Budget the lowest number the neighbor ever saw.`,'optimistic-plan'],['omit','Skip it until the first real bill arrives.','variable-means-unplannable'],['card','Budget nothing and put it on a credit card.']],
          good:'buffer',help:'No history means estimate conservatively, not optimistically. The buffer covers the surprise.'};
      }
      if(tpl===2){
        // Roommate split of a variable bill
        const util=pick(['electric','water'],r);
        const low=int(r,60,90);
        const high=int(r,130,200);
        const share=Math.round(high/2)+10;
        return {question:`${person} splits the ${util} bill with a roommate. It runs ${money(low)} to ${money(high)} a month. What should ${person} budget for ${poss(person)} share?`,
          choices:[['buffer',`About ${money(share)} — half of a high month plus a little buffer.`],['lowest',`Half of ${money(low)} — the bill is usually low.`,'optimistic-plan'],['omit','Nothing — the roommate usually pays first.','variable-means-unplannable'],['card','Put the high months on a credit card.']],
          good:'buffer',help:'Budget your share from the high end, not the low end. Splitting does not shrink the variation.'};
      }
      // Rates rising year over year
      const util=pick(['Electric','Gas'],r);
      const last=int(r,80,140);
      const now=Math.round(last*1.12);
      return {question:`${person}'s ${util.toLowerCase()} averaged ${money(last)}/mo last year. Rates rose about 12% this year. What is the stronger plan?`,
        choices:[['buffer',`Budget around ${money(now)} and keep a buffer for extreme months.`],['lowest',`Budget ${money(last)} — last year's number is fine.`,'optimistic-plan'],['omit','Leave it out; rate changes are unpredictable.','variable-means-unplannable'],['card','Budget last year\u2019s number and card the difference.']],
        good:'buffer',help:'Update estimates when rates change. Last year\u2019s average is stale the moment prices move.'};
    },
    retention(i){
      const r=mulberry32(i*441593+61);
      const person=pick(NAMES,r);
      const tpl=int(r,0,2);
      if(tpl===0){
        const util=pick(['electric','gas','water'],r);
        const channel=pick(['a new link they text','a payment app they name','a callback number they give'],r);
        return {question:`Someone calls ${person} saying the ${util} will be disconnected today unless payment goes through ${channel}. What should happen first?`,
          choices:[['verify','Verify the account through the known utility website, bill, or phone number.'],['link','Use their payment method immediately.','urgency-overrides-verify'],['gift','Offer a gift card instead.']],
          good:'verify',help:'Unexpected urgent utility payment demands should be verified through a known legitimate channel.'};
      }
      if(tpl===1){
        const util=pick(['power','water'],r);
        const mins=pick(['30','45','60'],r);
        const ps=subj(person);
        return {question:`A text says ${person}'s ${util} will be shut off in ${mins} minutes unless ${ps} pays with a prepaid card. What should happen first?`,
          choices:[['verify','Check the real account through the utility\u2019s own app or number — not the text\u2019s link.'],['link','Pay through the text\u2019s link before the shutoff.','urgency-overrides-verify'],['gift','Buy the prepaid card — at least it is fast.']],
          good:'verify',help:'A countdown plus an unusual payment method is a scam pattern. Real utilities do not work this way.'};
      }
      const util=pick(['internet','trash','gas'],r);
      const fee=int(r,15,60);
      return {question:`${person} gets an email that looks like the ${util} company: "Past due ${money(fee)} — pay now to avoid fees." The sender address looks slightly off. What should happen first?`,
        choices:[['verify','Go to the company\u2019s real site directly and check the account there.'],['link','Click the email\u2019s pay button — it looks official.','urgency-overrides-verify'],['gift','Reply asking if a gift card works.']],
        good:'verify',help:'When the sender looks slightly off, do not use their link. Navigate to the real site yourself.'};
    }
  }
};

// Generate 200 per topic per kind and append to banks
for(const [skill, kinds] of Object.entries(GEN)){
  for(const [kind, fn] of Object.entries(kinds)){
    const bank = kind==='transfer' ? ADULT_TRANSFER_VARIANT_BANK : ADULT_RETENTION_VARIANT_BANK;
    const arr = [];
    for(let i=0;i<200;i++) arr.push(fn(i));
    bank[skill] = [...(bank[skill]||[]), ...arr];
  }
}
