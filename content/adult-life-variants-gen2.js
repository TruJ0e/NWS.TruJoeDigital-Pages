// NWS adult-life massive variant generation, batch 2 — credit + safety.
// Parametric templates × seeded combinations. Deterministic: same index
// always yields the same question. Keys/good match canonical (check-gapB).
// 200 transfer + 200 retention per topic (800 total). Goal: learners
// rarely see the same question twice.
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
const cap=s=>s.charAt(0).toUpperCase()+s.slice(1);

const NAMES=['Maya','Jamal','Sofia','Tyler','Priya','Marcus','Lena','Diego','Aisha','Noah','Zoe','Ethan','Ruby','Liam','Nora','Owen','Ivy','Caleb','Mila','Jonah','Aria','Felix','Nina','Omar','Tessa','Victor','Wren','Yusuf','Hazel','Silas'];
const FEM=new Set(['Maya','Sofia','Priya','Lena','Aisha','Zoe','Ruby','Nora','Ivy','Mila','Aria','Nina','Tessa','Wren','Hazel']);
const subj=n=>FEM.has(n)?'she':'he';
const obj=n=>FEM.has(n)?'her':'him';
const poss=n=>FEM.has(n)?'her':'his';

const GEN = {
  // ============ CREDIT ============
  credit:{
    transfer(i){
      const r=mulberry32(i*4099+17);
      const person=pick(NAMES,r);
      const tpl=int(r,0,3);
      if(tpl===0){
        // Minimum-payment trap on a store card purchase
        const purchase=int(r,150,900);
        const item=pick(['a laptop','new tires','a phone','a bike','a gaming console','furniture','a camera'],r);
        const minPay=Math.max(20,Math.round(purchase*int(r,8,15)/100));
        return {question:`${person} wants ${item} costing ${money(purchase)}. A store card lets ${obj(person)} pay ${money(minPay)} a month. What should ${person} understand first?`,
          choices:[['debt',`The ${item} creates a ${money(purchase)} debt. The ${money(minPay)} is one monthly piece, not the price.`],['income',`The card adds ${money(purchase)} of income this month.`,'credit-as-income'],['minimum',`The ${item} really costs ${money(minPay)} — that is the payment.`,'min-payment-trap'],['later',`It costs nothing until the first bill shows up.`,'later-is-free']],
          good:'debt',help:'Credit changes WHEN you pay, not WHETHER you owe. The minimum is a payment plan, not a price.'};
      }
      if(tpl===1){
        // 0% promo with a fee
        const purchase=int(r,200,1200);
        const item=pick(['a laptop','furniture','a TV','a mattress','car repairs'],r);
        const fee=int(r,25,95);
        const months=pick([6,12,15],r);
        return {question:`${person} sees a card with "0% interest for ${months} months" plus a ${money(fee)} yearly fee, and wants ${item} at ${money(purchase)}. What is the true cost picture?`,
          choices:[['debt',`A ${money(purchase)} debt plus the ${money(fee)} fee — 0% interest is not 0% cost.`],['income',`${months} months of free money.`,'credit-as-income'],['minimum',`Only the monthly minimum matters while the promo lasts.`,'min-payment-trap'],['later',`The fee does not count because it is charged later.`,'later-is-free']],
          good:'debt',help:'A promo rate changes the interest, not the debt. Fees are part of the real cost.'};
      }
      if(tpl===2){
        // Cash advance
        const need=int(r,100,500);
        const fee=Math.max(10,Math.round(need*0.05));
        return {question:`${person} needs ${money(need)} today. A cash advance from a credit card gives it now, with a ${money(fee)} fee and interest starting at once. What should ${person} see?`,
          choices:[['debt',`A ${money(need)} debt plus a ${money(fee)} fee — with interest starting today, not next month.`],['income',`Fast extra income for a tight spot.`,'credit-as-income'],['minimum',`Only the minimum payment will matter.`,'min-payment-trap'],['later',`It is free until the statement arrives.`,'later-is-free']],
          good:'debt',help:'A cash advance is the priciest way to borrow: a fee up front and interest from day one.'};
      }
      // Limit increase treated as new money
      const limit=int(r,1000,5000);
      const purchase=int(r,300,Math.min(1500,limit-100));
      const item=pick(['headphones','sneakers','a tablet','a watch','a bike'],r);
      return {question:`${person}'s card limit just rose to ${money(limit)}. ${cap(subj(person))} is eyeing ${item} at ${money(purchase)}. What is true?`,
        choices:[['debt',`The limit is permission to borrow up to ${money(limit)} — spending it still creates debt to repay.`],['income',`The higher limit means ${person} can afford it now.`,'credit-as-income'],['minimum',`It only costs the minimum payment.`,'min-payment-trap'],['later',`It costs nothing until ${person} chooses to pay.`,'later-is-free']],
        good:'debt',help:'A higher limit raises how much you CAN borrow, not how much you HAVE.'};
    },
    retention(i){
      const r=mulberry32(i*8209+23);
      const tpl=int(r,0,2);
      if(tpl===0){
        const amt=int(r,300,2000);
        return {question:`Your card limit goes up by ${money(amt)}. What changed?`,
          choices:[['borrowing',`Your borrowing capacity changed — not your income or savings.`],['income',`Your monthly income went up by ${money(amt)}.`],['savings',`Your savings grew by ${money(amt)}.`]],
          good:'borrowing',help:'A limit is permission to borrow. It adds zero dollars to what you own or earn.'};
      }
      if(tpl===1){
        const limit=int(r,1000,5000);
        return {question:`You open a new card with a ${money(limit)} limit. A friend says you are "${money(limit)} richer." What is accurate?`,
          choices:[['borrowing',`You can borrow up to ${money(limit)} — you are not ${money(limit)} richer.`],['income',`You gained ${money(limit)} of income.`],['savings',`Your savings rose by ${money(limit)}.`]],
          good:'borrowing',help:'Cards shift WHEN you pay. They never add money you did not earn.'};
      }
      const limit=int(r,2000,10000);
      return {question:`A letter says you are "pre-approved for ${money(limit)}." What does that actually mean?`,
        choices:[['borrowing',`A lender may let you borrow up to ${money(limit)} — it is an offer of debt, not a gift.`],['income',`You were given ${money(limit)} to spend.`],['savings',`Your savings are ${money(limit)} higher now.`]],
        good:'borrowing',help:'"Pre-approved" means pre-approved to borrow. Every dollar still has to be repaid.'};
    }
  },
  // ============ SAFETY ============
  safety:{
    transfer(i){
      const r=mulberry32(i*16381+31);
      const person=pick(NAMES,r);
      const tpl=int(r,0,3);
      if(tpl===0){
        // Crypto urgency text
        const org=pick(['power company','phone carrier','bank','student loan servicer','internet provider'],r);
        const amt=int(r,150,900);
        const time=pick(['one hour','two hours','by midnight'],r);
        return {question:`${person} gets a text: "${cap(org)} account overdue — pay ${money(amt)} in crypto within ${time} or service stops." What is the safest first move?`,
          choices:[['verify',`Do not touch the link. Check the real ${org} site or call their official number.`],['pay',`Pay quickly to avoid shutoff, then check.`,'urgency-overrides-verify'],['reply',`Text back asking for proof the bill is real.`],['call',`Call the number in the text to confirm it.`,'their-number-verifies']],
          good:'verify',help:'Urgency plus a hard-to-reverse payment is the classic scam pattern. Stop and verify on your own.'};
      }
      if(tpl===1){
        // Gift card demand
        const who=pick(['the IRS','a sheriff','the power company','a court','a delivery company'],r);
        const amt=int(r,200,1500);
        return {question:`A caller claiming to be ${who} says ${person} owes ${money(amt)} and must pay with gift cards today. What should ${person} do?`,
          choices:[['verify',`Hang up. No real agency takes gift cards — verify through an official channel.`],['pay',`Buy the gift cards — better safe than sorry.`,'urgency-overrides-verify'],['reply',`Ask them to mail official papers first.`],['call',`Call back the number they gave you.`,'their-number-verifies']],
          good:'verify',help:'A gift-card demand proves it is a scam. Real organizations never collect payment that way.'};
      }
      if(tpl===2){
        // Tech support pop-up
        const phone=`1-800-${int(r,200,999)}-${int(r,1000,9999)}`;
        return {question:`A pop-up warns that ${person}'s computer has a virus and says to call ${phone} at once before files are erased. What is safest?`,
          choices:[['verify',`Close the pop-up. Real warnings never arrive as pop-ups demanding a call.`],['pay',`Call right away — the files could be erased.`,'urgency-overrides-verify'],['reply',`Click the pop-up's "scan now" button.`],['call',`Call the number — it looks official.`,'their-number-verifies']],
          good:'verify',help:'Scare plus call-now is the tech-support scam script. Closing the pop-up ends it.'};
      }
      // Prize fee
      const prize=int(r,1000,50000);
      const fee=int(r,25,200);
      return {question:`${person} gets a message: "You won ${money(prize)}! Pay a ${money(fee)} fee to claim it." What is the right move?`,
        choices:[['verify',`Ignore it. Real prizes never charge you to collect.`],['pay',`Pay the ${money(fee)} — ${money(prize)} is worth it.`,'urgency-overrides-verify'],['reply',`Reply asking for the prize rules in writing.`],['call',`Call their number to confirm the win.`,'their-number-verifies']],
        good:'verify',help:'"Pay to collect a prize" is always a scam. The fee IS the trick.'};
    },
    retention(i){
      const r=mulberry32(i*32749+47);
      const tpl=int(r,0,2);
      if(tpl===0){
        const inst=pick(['your bank','your credit union','your card company','Chase','Wells Fargo'],r);
        const amt=int(r,50,800);
        return {question:`A text "from ${inst}" says a ${money(amt)} charge needs your approval — click the link right now or it goes through. What do you do?`,
          choices:[['known-channel',`Open your ${inst==='your bank'||inst==='your credit union'?'bank':'card'} app yourself, or call the number on your card.`],['message-link',`Use the link — an unknown ${money(amt)} charge is urgent.`],['send-pin',`Text back your PIN so they can verify you.`]],
          good:'known-channel',help:'Use a contact path you already trust — never the one a surprise message hands you.'};
      }
      if(tpl===1){
        const fee=int(r,2,25);
        const carrier=pick(['the post office','a delivery company','a courier','FedEx','UPS'],r);
        const pkg=pick(['package','parcel','order'],r);
        return {question:`A text says your ${pkg} is being held by ${carrier} and you must click a link to pay a ${money(fee)} redelivery fee. What is safest?`,
          choices:[['known-channel',`Track it on the carrier's real site or app — not through the text link.`],['message-link',`Click and pay — you are expecting a delivery.`],['send-pin',`Reply with your address to confirm it is yours.`]],
          good:'known-channel',help:'Delivery scams spike exactly when you are waiting for something. Verify on the carrier site you know.'};
      }
      const util=pick(['electric','water','gas','internet','trash'],r);
      const amt=int(r,40,300);
      const when=pick(['today','within 2 hours','by 5 PM'],r);
      return {question:`A caller says your ${util} bill of ${money(amt)} is overdue and service ends ${when} unless you pay through a link they will text. What comes first?`,
        choices:[['known-channel',`Check your account on the utility's real website or your paper bill.`],['message-link',`Use their link — a shutoff is serious.`],['send-pin',`Give your account number on this call to confirm.`]],
        good:'known-channel',help:'Real utilities send written warnings first and never demand instant payment through a texted link.'};
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
