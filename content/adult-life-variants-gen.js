// NWS adult-life massive variant generation — 200 questions per topic.
// Parametric templates × seeded combinations. Deterministic: same index
// always yields the same question. Keys/good match canonical (check-gapB).
// Goal: learners rarely see the same question twice in a session.
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

const NAMES=['Maya','Jamal','Sofia','Tyler','Priya','Marcus','Lena','Diego','Aisha','Noah','Zoe','Ethan','Ruby','Liam','Nora','Owen','Ivy','Caleb','Mila','Jonah','Aria','Felix','Nina','Omar','Tessa','Victor','Wren','Yusuf','Hazel','Silas'];

const GEN = {
  // ============ BANKING ============
  banking:{
    transfer(i){
      const r=mulberry32(i*7919+101);
      const person=pick(NAMES,r);
      const tpl=int(r,0,3);
      const balance=int(r,70,220);
      if(tpl===0){
        const ob=pick(['rent autopay','car-insurance draft','phone payment','utility autopay'],r);
        const obAmt=int(r,50,balance-10);
        const temp=pick(['concert tickets','new headphones','a weekend trip','sneakers'],r);
        const tCost=int(r,20,80);
        return {question:`${person}'s account shows ${money(balance)}. A ${money(obAmt)} ${ob} is scheduled for tomorrow, and ${temp} costing ${money(tCost)} caught ${person==='Maya'||person==='Sofia'||person==='Priya'||person==='Lena'||person==='Aisha'||person==='Zoe'||person==='Ruby'||person==='Nora'||person==='Ivy'||person==='Mila'||person==='Aria'||person==='Nina'||person==='Tessa'||person==='Wren'||person==='Hazel'?'her':'his'} eye today. What should happen first?`,
          choices:[['reserve',`Protect the ${money(obAmt)} ${ob} first, then see what is left.`],['spend',`Buy it — ${money(balance)} is showing right now.`,'spend-before-obligation'],['overdraft','Buy it and let overdraft cover the bill.','overdraft-as-backup'],['borrow',`Borrow ${money(tCost)} so the balance stays untouched.`,'borrow-to-spend']],
          good:'reserve',help:'Scheduled obligations are already spoken for. Decide from what remains.'};
      }
      if(tpl===1){
        const check=int(r,100,balance-20);
        const item=pick(['textbooks','a bike repair','groceries for the week'],r);
        const iCost=int(r,30,90);
        return {question:`${person} wrote a ${money(check)} check yesterday that has not cleared. The balance shows ${money(balance)}. ${person} needs ${item} costing ${money(iCost)}. What is actually available?`,
          choices:[['reserve',`About ${money(balance-check)} — the check counts as spent even before it clears.`],['spend',`The full ${money(balance)} — it has not cleared yet.`,'spend-before-obligation'],['overdraft','Spend and assume overdraft will cover the check.','overdraft-as-backup'],['borrow','Borrow against next week so nothing moves.','borrow-to-spend']],
          good:'reserve',help:'Committed money counts as spent for planning, cleared or not.'};
      }
      if(tpl===2){
        const sub=pick(['a streaming service','a gym membership','a subscription box'],r);
        const sAmt=int(r,10,30);
        return {question:`${person} notices a ${money(sAmt)} monthly charge for ${sub} they forgot about. Balance is ${money(balance)}. What is the right first move?`,
          choices:[['reserve',`Account for the ${money(sAmt)} as a recurring obligation before planning flexible spending.`],['spend',`Ignore it — it is only ${money(sAmt)}.`,'spend-before-obligation'],['overdraft','Cancel the debit card so it cannot charge.','overdraft-as-backup'],['borrow','Borrow to cover it this month.','borrow-to-spend']],
          good:'reserve',help:'Forgotten subscriptions are still obligations. Name them before planning around them.'};
      }
      const refund=int(r,40,150);
      return {question:`${person} is getting a ${money(refund)} refund in 3 days. Balance is ${money(balance)}. A ${money(int(r,30,70))} purchase is tempting right now. What should ${person} do?`,
        choices:[['reserve',`Wait for the refund to actually arrive before counting it.`],['spend',`Spend now — the refund is basically here.`,'spend-before-obligation'],['overdraft','Spend and let overdraft bridge the 3 days.','overdraft-as-backup'],['borrow','Borrow until the refund lands.','borrow-to-spend']],
        good:'reserve',help:'Future money is not available money, even when it is 3 days away.'};
    },
    retention(i){
      const r=mulberry32(i*104729+7);
      const bal=int(r,40,180);
      const pay=int(r,20,bal-10);
      const tpl=int(r,0,2);
      if(tpl===0) return {question:`Balance is ${money(bal)} and a ${money(pay)} payment is scheduled before your next income. What is flexible?`,
        choices:[['five',`About ${money(bal-pay)} — the scheduled ${money(pay)} still matters.`],['sixty',`${money(bal)} — that is the displayed balance.`],['one-fifteen',`${money(bal+pay)} — the payment can wait.`]],
        good:'five',help:'Protect known payments before treating the visible balance as flexible.'};
      if(tpl===1) return {question:`You have ${money(bal)}. You already promised ${money(pay)} to savings this week. A friend wants to split a ${money(int(r,20,50))} gift. What can you actually contribute?`,
        choices:[['five',`About ${money(bal-pay)} — the savings promise counts as spoken for.`],['sixty',`The full ${money(bal)}.`],['one-fifteen',`${money(bal+pay)} — savings can wait.`]],
        good:'five',help:'A promise to save is an obligation to yourself. Honor it before flexible spending.'};
      return {question:`Account shows ${money(bal)}. A ${money(pay)} autopay hits Friday. It is Wednesday. What should you treat as spendable today?`,
        choices:[['five',`About ${money(bal-pay)} — Friday's autopay is already committed.`],['sixty',`${money(bal)} — Friday is two days away.`],['one-fifteen',`More than ${money(bal)} — autopays sometimes post late.`]],
        good:'five',help:'Time until a payment does not un-commit it. Plan from what remains after it.'};
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
