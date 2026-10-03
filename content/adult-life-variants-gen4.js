// NWS adult-life massive variant generation — gen4: food, transportation, paperwork, health-costs.
// Parametric templates × seeded combinations. Deterministic: same index
// always yields the same question. Keys/good match canonical (check-gapB).
// 200 transfer + 200 retention per topic × 4 topics = 1600 total.
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
const FEMALE=new Set(['Maya','Sofia','Priya','Lena','Aisha','Zoe','Ruby','Nora','Ivy','Mila','Aria','Nina','Tessa','Wren','Hazel']);
const pro=n=>FEMALE.has(n)?'her':'his';
const subj=n=>FEMALE.has(n)?'she':'he';

const GEN = {
  // ============ FOOD ============
  food:{
    transfer(i){
      const r=mulberry32(i*31337+11);
      const person=pick(NAMES,r);
      const tpl=int(r,0,3);
      if(tpl===0){
        const budget=int(r,30,70);
        const have1=pick(['rice','pasta','oatmeal','canned beans','frozen vegetables'],r);
        const have2=pick(['eggs','peanut butter','tortillas','carrots','yogurt'],r);
        return {question:`${person} has ${money(budget)} for groceries this week. The kitchen already has ${have1} and ${have2}. What should ${person} do first?`,
          choices:[['plan',`Check what is on hand, plan meals around it, then list only what is missing.`],['bulk',`Buy the biggest sale packs first.`,'sale-not-needed'],['percent',`Spend a fixed percent of pay on groceries, no list needed.`,'one-percent-fits-all'],['delivery',`Order delivery for the whole week instead of shopping.`]],
          good:'plan',help:'Inventory first. Buy what you will actually use, not what looks like a deal.'};
      }
      if(tpl===1){
        const item=pick(['chicken breasts','ground turkey','fresh spinach','strawberries','salmon'],r);
        const budget=int(r,30,70);
        return {question:`${item[0].toUpperCase()+item.slice(1)} at 50% off this week, but ${person} already has plenty at home and some will spoil. ${person} has ${money(budget)} for food. What is the smart move?`,
          choices:[['plan',`Skip it — plan from what is at home and what will actually get eaten.`],['bulk',`Stock up — half price is always worth it.`,'free-means-stockup'],['percent',`Buy it as long as groceries stay under a set percent of pay.`,'one-percent-fits-all'],['delivery',`Order it for delivery instead of going to the store.`]],
          good:'plan',help:'A discount on food you will throw away is not savings. Plan from real use.'};
      }
      if(tpl===2){
        const budget=int(r,30,70);
        return {question:`${person} shops with no list and throws food away every week. With ${money(budget)} for groceries, what fixes that?`,
          choices:[['plan',`Make a short meal plan and a list before shopping.`],['bulk',`Buy in bulk so there is always extra on hand.`,'sale-not-needed'],['percent',`Use an app that sets the grocery budget by percent of pay.`,'one-percent-fits-all'],['delivery',`Switch to grocery delivery to save time.`]],
          good:'plan',help:'A list built from a meal plan is what turns a budget into food you eat.'};
      }
      const a=int(r,35,60), b=a+int(r,5,25);
      return {question:`${person} can fill a cart for ${money(a)} with planned meals, or grab sale items for ${money(b)} with no plan. Which is the better use of the food budget?`,
        choices:[['plan',`The ${money(a)} planned cart — every item has a meal attached.`],['bulk',`The ${money(b)} cart — more food for the money.`,'sale-not-needed'],['percent',`Whichever one fits the grocery percent rule.`,'one-percent-fits-all'],['delivery',`Have both delivered and decide at the door.`]],
        good:'plan',help:'Planned food gets eaten. Unplanned "deals" get tossed. Compare use, not just price.'};
    },
    retention(i){
      const r=mulberry32(i*31337+503);
      const person=pick(NAMES,r);
      const tpl=int(r,0,2);
      if(tpl===0){
        const item=pick(['peanut butter','oatmeal','pasta','rice','cereal','black beans'],r);
        const bigOz=pick([28,32,40,48],r), smlOz=Math.round(bigOz/2);
        const bigP=(bigOz*int(r,22,30))/100, smlP=(smlOz*int(r,30,42))/100;
        const upb=(bigP/bigOz).toFixed(2), ups=(smlP/smlOz).toFixed(2);
        const frac=pick(['about half','about a third','less than half'],r);
        return {question:`${person} compares a ${bigOz}oz pack of ${item} at ${money(bigP.toFixed(2))} (${money(upb)}/oz) with a ${smlOz}oz pack at ${money(smlP.toFixed(2))} (${money(ups)}/oz). ${person} will use ${frac} the big pack before it goes stale. Is the big pack the better value?`,
          choices:[['no',`No — the thrown-away part raises the real cost per used ounce above the small pack.`],['yes',`Yes — the lowest price per ounce always wins.`],['ignore',`Unit price does not matter at all.`]],
          good:'no',help:'Value is price per ounce you actually use. Spoiled food raises the real cost.'};
      }
      if(tpl===1){
        const item=pick(['strawberries','fresh spinach','milk','bananas','bread','grapes','avocados'],r);
        const alone=pick(['lives alone and eats out twice a week','cooks only on weekends','shares a kitchen but buys separately'],r);
        return {question:`${person} sees a bulk deal on ${item} but ${alone}. Is bulk automatically the smart buy?`,
          choices:[['no',`No — food ${subj(person)} will not eat is not savings.`],['yes',`Yes — bulk is always cheaper.`],['ignore',`It makes no difference either way.`]],
          good:'no',help:'Bulk only saves money if the extra gets used before it spoils.'};
      }
      const item=pick(['chicken breasts','ground turkey','berries','tortillas','mixed vegetables','pork chops'],r);
      const why=pick([`${pro(person)} freezer is already full`,`${pro(person)} fridge has no room`,`${subj(person)} is traveling next week`],r);
      return {question:`${item[0].toUpperCase()+item.slice(1)} — cheapest in the family pack, but ${why}. Should ${person} buy it anyway?`,
        choices:[['no',`No — with nowhere to keep it, the extra will spoil.`],['yes',`Yes — the unit price is what counts.`],['ignore',`Storage space never matters.`]],
        good:'no',help:'No storage means no savings. The deal only works if the food survives until you eat it.'};
    }
  },
  // ============ TRANSPORTATION ============
  transportation:{
    transfer(i){
      const r=mulberry32(i*27183+17);
      const person=pick(NAMES,r);
      const tpl=int(r,0,3);
      if(tpl===0){
        const pass=int(r,60,110), ride=pick([2.5,3,3.5],r), n=int(r,8,14);
        const rideCost=Math.round(ride*n*4.33);
        return {question:`A monthly transit pass costs ${money(pass)}. Single rides cost ${money(ride.toFixed(2))} and ${person} rides about ${n} times a week for work and class. What should ${person} compare?`,
          choices:[['period',`Total cost across the whole month — about ${money(rideCost)} in single rides vs ${money(pass)} for the pass — plus whether the pass covers every needed trip.`],['single',`Only the price of one ride.`],['upfront',`Only which option costs less today.`,'upfront-is-all'],['car',`Skip both and buy a cheap car instead.`]],
          good:'period',help:'Compare the full period cost, then check reliability: does it get you there on time, every time?'};
      }
      if(tpl===1){
        const bus=int(r,70,100), pay=int(r,120,220), ins=int(r,80,140), gas=int(r,60,110);
        const carTotal=pay+ins+gas;
        return {question:`${person} can take the bus (${money(bus)}/month) or drive an old car: payment ${money(pay)}, insurance ${money(ins)}, gas about ${money(gas)}. What is the right comparison?`,
          choices:[['period',`Add the full monthly cost of each — the car is about ${money(carTotal)} before repairs and parking — then compare.`],['single',`Compare one bus ride to one tank of gas.`],['upfront',`Pick whichever needs less cash today.`,'upfront-is-all'],['car',`The car wins automatically because it is yours.`]],
          good:'period',help:'A car is a bundle: payment plus insurance plus fuel plus repairs plus parking. Add it all.'};
      }
      if(tpl===2){
        const mode=pick(['The cheapest bus route','The cheapest rideshare option','A borrowed bike with no lights'],r);
        const freq=pick(['twice a week','three times a month','almost every Monday'],r);
        const risk=pick(['lateness can cost hours or the job','the boss has already warned about tardiness','shifts start exactly on time'],r);
        return {question:`${mode} makes ${person} late for work ${freq}. What belongs in this decision?`,
          choices:[['period',`Cost over the month AND whether it gets ${pro(person)} to work on time — ${risk}.`],['single',`Just the ticket price.`],['upfront',`Just what it costs today.`,'upfront-is-all'],['car',`Buy any car — cars are always reliable.`]],
          good:'period',help:'Transportation buys access. The cheapest option that fails at access is the most expensive.'};
      }
      const rs=int(r,25,60), bike=int(r,150,400);
      const months=Math.ceil(bike/rs);
      return {question:`${person} spends about ${money(rs)} a week on rideshares. A ${money(bike)} bike would last for years. What should ${person} compare?`,
        choices:[['period',`Rideshare spending over a few months vs the bike — the bike pays for itself in about ${months} weeks.`],['single',`One rideshare trip vs the full bike price.`],['upfront',`The bike costs more today, so rideshares win.`,'upfront-is-all'],['car',`Forget the bike and get a car — bikes are too slow.`]],
          good:'period',help:'Spread one-time costs over their useful life, then compare periods fairly.'};
    },
    retention(i){
      const r=mulberry32(i*27183+809);
      const person=pick(NAMES,r);
      const tpl=int(r,0,3);
      if(tpl===0){
        const car=pick(['a used sedan','a 10-year-old truck','a hatchback','an old SUV','a compact car','a minivan'],r);
        const use=pick(['to get to work','for a delivery job','to commute to class','to visit family'],r);
        return {question:`${person} is budgeting for ${car} ${use}. Which cost list is complete?`,
          choices:[['bundle',`Monthly payment, insurance, fuel, maintenance and repairs, parking.`],['payment',`Just the monthly payment.`,'payment-is-total'],['fuel',`Just fuel.`]],
          good:'bundle',help:'Car ownership is five costs, not one. Budget the bundle or the "cheap" car surprises you.'};
      }
      if(tpl===1){
        const pay=int(r,150,280);
        const who=pick(['A dealer','An online ad','A friend selling a car','A buy-here-pay-here lot'],r);
        return {question:`${who} tells ${person} a car is "only ${money(pay)} a month." What else must ${person} count?`,
          choices:[['bundle',`Insurance, fuel, maintenance, repairs, and parking — the full bundle.`],['payment',`Nothing — ${money(pay)} is the whole cost.`,'payment-is-total'],['fuel',`Only gas on top of the payment.`]],
          good:'bundle',help:'"Only" a payment is a sales pitch. The real monthly cost is the whole bundle.'};
      }
      if(tpl===2){
        const surprise=pick(['insurance bills','a transmission repair','new tires and brakes','parking tickets and fees','a dead battery and tow'],r);
        return {question:`${person}'s first year with a car cost far more than the payments added up to, mostly from ${surprise}. What was the budgeting mistake?`,
          choices:[['bundle',`Planning for the payment alone instead of the full bundle of ownership costs.`],['payment',`Nothing — payments are the only real cost.`,'payment-is-total'],['fuel',`Only fuel was missed.`]],
          good:'bundle',help:'Irregular costs are still costs. Insurance and repairs do not ask permission.'};
      }
      const mpg=pick([18,22,25,30,35],r);
      const miles=int(r,200,600);
      return {question:`${person} drives about ${miles} miles a month in a car that gets ${mpg} miles per gallon. Gas is about $3.50 a gallon. What is the monthly fuel cost — and what else still counts?`,
        choices:[['bundle',`About ${money(Math.round(miles/mpg*3.5))} for fuel — plus payment, insurance, maintenance, and parking.`],['payment',`Just the car payment — fuel is too small to matter.`,'payment-is-total'],['fuel',`About ${money(Math.round(miles/mpg*3.5))} for fuel, and that is the whole cost.`]],
        good:'bundle',help:'Even when you nail the fuel math, fuel is only one of five costs.'};
    }
  },
  // ============ PAPERWORK ============
  paperwork:{
    transfer(i){
      const r=mulberry32(i*40503+23);
      const person=pick(NAMES,r);
      const tpl=int(r,0,3);
      if(tpl===0){
        const when=pick(['in the mail in January','by email in late January','in a sealed envelope from payroll'],r);
        const yr=int(r,2023,2026);
        return {question:`${person} gets a W-2 ${when} for tax year ${yr}. What is it for?`,
          choices:[['wages',`It reports last year's wages and the tax withheld, used to file a tax return.`],['withholding-choice',`It tells a new employer how much tax to take from each paycheck.`],['paycheck',`It replaces all the pay stubs from the year.`],['id',`It works as a photo ID.`]],
          good:'wages',help:'W-2 looks back: it totals what you earned and what was withheld last year.'};
      }
      if(tpl===1){
        const job=pick(['a summer job','a part-time job','an internship'],r);
        return {question:`${person}'s employer at ${job} sent pay stubs all year, then a W-2 in January. Why does ${person} need the W-2 at tax time?`,
          choices:[['wages',`It puts the whole year's wages and withholding in one official document the IRS also receives.`],['withholding-choice',`It tells the IRS how much to withhold next year.`],['paycheck',`The pay stubs were unofficial — only the W-2 is real.`],['id',`It proves identity to the IRS.`]],
          good:'wages',help:'The W-2 is the official yearly record. The IRS gets a copy too, so the numbers must match.'};
      }
      if(tpl===2){
        const yr=int(r,2022,2025);
        return {question:`${person} lost the ${yr} W-2 but kept all the pay stubs. Can ${person} just file with those?`,
          choices:[['wages',`Better to request a W-2 copy — it is the official yearly total the IRS will match against.`],['withholding-choice',`Use the stubs to set next year's withholding instead.`],['paycheck',`Yes — pay stubs and the W-2 are exactly the same thing.`],['id',`No — tax filing requires a photo ID, not pay records.`]],
          good:'wages',help:'Stubs are pieces; the W-2 is the official total. Get the replacement — employers must provide it.'};
      }
      const j1=pick(['a restaurant','a warehouse','a store'],r), j2=pick(['landscaping','babysitting','a car wash'],r);
      return {question:`${person} worked at ${j1} and did ${j2} last year, and received two W-2s. What should ${person} do with them?`,
        choices:[['wages',`Both report wages — combine them on one tax return.`],['withholding-choice',`Pick one W-2 to set this year's withholding.`],['paycheck',`Only the bigger job's W-2 matters.`],['id',`Use one as ID and file the other.`]],
          good:'wages',help:'Every W-2 reports wages you earned. All of them go on the return.'};
    },
    retention(i){
      const r=mulberry32(i*40503+911);
      const person=pick(NAMES,r);
      const tpl=int(r,0,2);
      if(tpl===0){
        const job=pick(['a restaurant','a warehouse','a grocery store','a landscaping crew','a retail shop'],r);
        return {question:`${person} starts a new job at ${job}. The manager asks for the form that sets how much federal tax comes out of each paycheck. Which form is it?`,
          choices:[['w4',`Form W-4.`],['w2',`Form W-2.`],['lease',`A rental lease.`]],
          good:'w4',help:'W-4 looks forward: it tells the employer how much to withhold from future pay.'};
      }
      if(tpl===1){
        const bill=int(r,400,2500);
        return {question:`${person} owed ${money(bill)} at tax time because too little was withheld from ${pro(person)} pay. Which form should ${person} update at work?`,
          choices:[['w4',`W-4 — it controls how much gets withheld going forward.`],['w2',`W-2 — it reports what was already earned.`],['lease',`The lease — it proves where ${subj(person)} lives.`]],
          good:'w4',help:'Owing at tax time means withholding was too low. A new W-4 fixes future paychecks.'};
      }
      const change=pick(['got married','had a baby','started a second job','bought a house'],r);
      return {question:`${person} ${change} and wants the withholding to match the new situation. What should ${person} file with the employer?`,
        choices:[['w4',`A new W-4 reflecting the new situation.`],['w2',`A new W-2.`],['lease',`An updated lease.`]],
          good:'w4',help:'Life changes — marriage, kids, second jobs — mean updating the W-4, not waiting until April.'};
    }
  },
  // ============ HEALTH-COSTS ============
  'health-costs':{
    transfer(i){
      const r=mulberry32(i*55987+29);
      const person=pick(NAMES,r);
      const tpl=int(r,0,3);
      if(tpl===0){
        const pa=int(r,40,90), da=int(r,1500,3000), pb=pa+int(r,40,90), db=int(r,300,800);
        const visits=int(r,2,6);
        return {question:`Plan A costs ${money(pa)} a month with a ${money(da)} deductible. Plan B costs ${money(pb)} a month with a ${money(db)} deductible. ${person} expects about ${visits} doctor visits this year. What is the right comparison?`,
          choices:[['total',`Total cost for the year: 12 months of premiums plus the expected deductible, copays, and what each plan covers.`],['premium',`Pick the lower monthly price and stop there.`,'premium-is-total'],['deductible',`Pick the lower deductible and stop there.`],['brand',`Pick whichever company ${subj(person)} has heard of.`]],
          good:'total',help:'Premiums times 12 plus expected care costs. The cheapest premium rarely means the cheapest year.'};
      }
      if(tpl===1){
        const px=int(r,35,70), dx=int(r,2000,4000), py=px+int(r,50,100), dy=int(r,250,750);
        return {question:`${person} rarely gets sick. Plan X is ${money(px)} a month with a ${money(dx)} deductible; Plan Y is ${money(py)} a month with a ${money(dy)} deductible. How should ${person} decide?`,
          choices:[['total',`Compare the full yearly cost for a healthy year — low premiums usually win when little care is expected.`],['premium',`Always take the cheapest premium, no math needed.`,'premium-is-total'],['deductible',`Always take the lowest deductible.`],['brand',`Take the most advertised brand.`]],
          good:'total',help:'Low expected care favors low premiums. High expected care can favor low deductibles. Do the yearly math.'};
      }
      if(tpl===2){
        return {question:`${person} takes a monthly prescription and sees a specialist four times a year. How should ${person} compare two health plans?`,
          choices:[['total',`Add up premiums for 12 months plus expected copays and the deductible under each plan, then compare totals.`],['premium',`Just compare the monthly prices.`,'premium-is-total'],['deductible',`Just compare the deductibles.`],['brand',`Ask the pharmacy which brand they like.`]],
          good:'total',help:'Regular care means copays add up fast. The plan with the lowest premium can cost the most per year.'};
      }
      const px=int(r,120,220), py=px+int(r,60,140);
      return {question:`${person} is picking a plan for a family of four — two kids who play sports. Plan P is ${money(px)} a month; Plan Q is ${money(py)} a month. What is the key comparison?`,
        choices:[['total',`Each family's total expected yearly cost — and the out-of-pocket maximum as the worst-case year.`],['premium',`The monthly premium alone.`,'premium-is-total'],['deductible',`Only the deductible.`],['brand',`Whichever plan the neighbors have.`]],
          good:'total',help:'With kids, the worst-case year matters. The out-of-pocket maximum caps what a bad year can cost.'};
    },
    retention(i){
      const r=mulberry32(i*55987+331);
      const person=pick(NAMES,r);
      const tpl=int(r,0,2);
      if(tpl===0){
        const c=pick([20,25,30,40,50,60],r);
        const visit=pick(['a primary-care visit','an urgent-care visit','a checkup','a dermatologist visit'],r);
        return {question:`${person}'s plan lists a ${money(c)} copay for ${visit}. What does "copay" mean here?`,
          choices:[['fixed',`A fixed ${money(c)} ${subj(person)} pays for that visit.`],['percent',`A percentage of whatever the visit costs.`],['premium',`The monthly payment to keep the plan.`]],
          good:'fixed',help:'Copay = fixed dollars per visit. Coinsurance = a percentage. Different tools.'};
      }
      if(tpl===1){
        const c=pick([40,50,60,75],r);
        const pct=pick([10,20,30],r);
        const proc=pick(['surgery','an MRI','a hospital stay'],r);
        return {question:`${person}'s plan has a ${money(c)} copay for urgent care and ${pct}% coinsurance for ${proc}. What is the difference?`,
          choices:[['fixed',`The copay is a set dollar amount; the coinsurance is a share of the ${proc} cost.`],['percent',`They are the same thing with different names.`],['premium',`Both are just parts of the monthly premium.`]],
          good:'fixed',help:'Fixed vs percentage: a set copay never surprises you; a percent of a big bill can.'};
      }
      const c=pick([25,30,40,50,60],r);
      const nv=int(r,2,5);
      const spec=pick(['specialist','dermatologist','physical therapy'],r);
      return {question:`${person} will have ${nv} ${spec} visits this year at a ${money(c)} copay each. About what will ${person} pay for those visits?`,
        choices:[['fixed',`About ${money(c*nv)} — the copay times the number of visits.`],['percent',`A small percent of the total bill.`],['premium',`Nothing extra — the monthly premium covers it.`]],
          good:'fixed',help:'Fixed copays are predictable: multiply by visits. That predictability is the point.'};
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
