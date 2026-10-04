// NWS variation bank: value — 50 confirmed templates per lesson.
// Lessons: sales-decisions, sales-tax, usable-value, gas-value, subscriptions-lesson.
export const BANK_VALUE = {
'sales-decisions': [
/* ---- choice x8 (part 1: 01-05 recognize, part 2: 06-08 classify) ---- */
{ id:'sales-decisions-choice-01', verb:'choice', part:1, tier:'independent', skill:'sales-decisions',
  gen:(v)=>{
    const person=v.person(), store=v.place();
    const items=[['a winter coat','coat'],['a pair of headphones','headphones'],['a desk lamp','lamp'],['a backpack','backpack'],['a pair of sneakers','sneakers']];
    const [item,short]=v.pick(items);
    const price=Math.round(v.cents(40,120)*100)/100;
    const pct=v.pick([20,25,30,40,50]);
    const saleP=Math.round(price*(100-pct))/100;
    const saved=Math.round((price-saleP)*100)/100;
    return {
      q:`${person} has needed ${item} for a month and planned to buy it this week. At ${store}, the ${short} is ${pct}% off: ${v.money(price)} → ${v.money(saleP)}. ${person} buys it. Did the discount save ${person} money?`,
      choices:[
        {label:`Yes — ${person} was buying ${item} anyway, so the ${v.money(saved)} discount is real savings`,ok:true},
        {label:`No — you can never save money by buying something`,ok:false,mis:'sale-not-needed'},
        {label:`No — ${person} should have waited for a bigger sale`,ok:false,mis:'sale-timing'},
        {label:`Yes — ${v.money(saleP)} is just a good price for the ${short}`,ok:false,mis:'low-price-justifies'}],
      hint:'Ask the test first: was this purchase already planned?',
      good:`Right. Planned purchase + discount = ${v.money(saved)} kept.`,
      bad:`The test passes: ${person} was buying ${item} this week no matter what. The ${v.money(saved)} discount lowers the price ${person} would have paid.`,
      why:`Savings means paying less for something you were already going to buy. ${person} kept ${v.money(saved)} off the original plan.`};
  }},
{ id:'sales-decisions-choice-02', verb:'choice', part:1, tier:'independent', skill:'sales-decisions',
  gen:(v)=>{
    const person=v.person(), store=v.place();
    const items=[['a Bluetooth speaker','speaker'],['a smart watch','watch'],['an espresso gadget','gadget'],['a designer water bottle','bottle'],['a mini projector','projector']];
    const [item,short]=v.pick(items);
    const price=Math.round(v.cents(45,140)*100)/100;
    const pct=v.pick([30,40,50,60]);
    const saleP=Math.round(price*(100-pct))/100;
    const saved=Math.round((price-saleP)*100)/100;
    return {
      q:`${person} was not planning to buy ${item}. At ${store}, the ${short} is ${pct}% off: ${v.money(price)} → ${v.money(saleP)}. ${person} buys it and says, "I saved ${v.money(saved)}!" Is that true?`,
      choices:[
        {label:`No — ${person} spent ${v.money(saleP)} of unplanned money; the "savings" is spending in disguise`,ok:true},
        {label:`Yes — ${pct}% off is always real savings, planned or not`,ok:false,mis:'sale-not-needed'},
        {label:`Yes — ${v.money(saleP)} is objectively cheap for a ${short}`,ok:false,mis:'low-price-justifies'},
        {label:`No — but only because ${pct}% is too small a discount to matter`,ok:false}],
      hint:'Run the test: was the purchase already planned?',
      good:`Right. No plan = no savings. ${v.money(saleP)} left ${person}'s account.`,
      bad:`The test fails: ${person} had a $0.00 plan for the ${short}. "${pct}% off" turned $0.00 of spending into ${v.money(saleP)} of spending.`,
      why:`A discount only saves money when it lowers a price you were already going to pay. Here it created a purchase — ${v.money(saleP)} spent, ${v.money(saved)} never "saved."`};
  }},
{ id:'sales-decisions-choice-03', verb:'choice', part:1, tier:'independent', skill:'sales-decisions',
  gen:(v)=>{
    const person=v.person(), store=v.place();
    const items=[['printer paper','paper'],['dish soap','soap'],['trash bags','bags'],['toothpaste','toothpaste'],['batteries','batteries']];
    const [item,short]=v.pick(items);
    const list=Math.round(v.cents(12,30)*100)/100;
    const clearance=Math.round(list*0.5*100)/100;
    const saved=Math.round((list-clearance)*100)/100;
    return {
      q:`${person}'s household runs out of ${item} every month. At ${store}, the ${short} is on clearance at half price: ${v.money(list)} → ${v.money(clearance)}. ${person} buys one. Real savings?`,
      choices:[
        {label:`Yes — ${person} buys ${item} every month anyway, so half price is ${v.money(saved)} kept`,ok:true},
        {label:`No — clearance items are always low quality, so it is not savings`,ok:false,mis:'price-means-quality'},
        {label:`No — a discount on a small item is not real savings`,ok:false,mis:'small-per-unit'},
        {label:`Yes — clearance means the store is losing money, not ${person}`,ok:false}],
      hint:'Was this going to be bought regardless of the sale?',
      good:`Right. Recurring need + lower price = real savings of ${v.money(saved)}.`,
      bad:`${person} was buying ${short} this month no matter what. Clearance cut that bill from ${v.money(list)} to ${v.money(clearance)} — ${v.money(saved)} stayed in the pocket.`,
      why:`"Was I going to buy it anyway" passes here: this was a recurring household need, so the half-price tag kept ${v.money(saved)}.`};
  }},
{ id:'sales-decisions-choice-04', verb:'choice', part:1, tier:'independent', skill:'sales-decisions',
  gen:(v)=>{
    const person=v.person(), store=v.place();
    const items=[['shampoo','shampoo'],['cereal','cereal'],['laundry pods','pods'],['paper towels','towels']];
    const [item,short]=v.pick(items);
    const price=Math.round(v.cents(5,12)*100)/100;
    const twoP=Math.round(price*1.5*100)/100;
    const twoFull=Math.round(2*price*100)/100;
    const saved=Math.round((twoFull-twoP)*100)/100;
    return {
      q:`${item} is on the shopping list this week. At ${store}, it is buy-one-get-one-half-off: two for ${v.money(twoP)} instead of ${v.money(twoFull)}. ${person} needs two and buys both. Savings or not?`,
      choices:[
        {label:`Savings — ${person} needed both, so the deal kept ${v.money(saved)} of the ${short} budget`,ok:true},
        {label:`Not savings — BOGO deals always push you to buy extra`,ok:false,mis:'sale-not-needed'},
        {label:`Not savings — ${person} should have bought only one`,ok:false},
        {label:`Savings — because the second ${short} is basically free`,ok:false,mis:'discount-doubles'}],
      hint:'Count what was needed, then count what the deal cost.',
      good:`Right: two needed, two bought, ${v.money(saved)} kept.`,
      bad:`${person} needed two and the plan already called for two. ${v.money(twoP)} instead of ${v.money(twoFull)} = ${v.money(saved)} real savings.`,
      why:`The sale lowered the price of a planned purchase. Needing both is what makes the BOGO real savings instead of extra spending.`};
  }},
{ id:'sales-decisions-choice-05', verb:'choice', part:1, tier:'independent', skill:'sales-decisions',
  gen:(v)=>{
    const person=v.person(), store=v.place();
    const items=[['a novelty waffle maker','waffle maker'],['a light-up vanity mirror','mirror'],['a robot vacuum gadget','gadget'],['a designer candle set','candle set']];
    const [item,short]=v.pick(items);
    const price=Math.round(v.cents(60,110)*100)/100;
    const pct=v.pick([25,30,40]);
    const saleP=Math.round(price*(100-pct))/100;
    const saved=Math.round((price-saleP)*100)/100;
    return {
      q:`${person} has never mentioned wanting ${item}. At ${store}, a flash sale takes it from ${v.money(price)} to ${v.money(saleP)} (${pct}% off). ${person} buys it and says "I saved ${v.money(saved)}." True?`,
      choices:[
        {label:`No — ${person} "saved" ${v.money(saved)} by spending ${v.money(saleP)} on something never planned`,ok:true},
        {label:`Yes — ${v.money(saved)} off the list price is savings`,ok:false,mis:'sale-not-needed'},
        {label:`Yes — flash sales only happen once, so waiting would cost more`,ok:false,mis:'urgency-pricing'},
        {label:`No — ${person} should have bought two to double the savings`,ok:false,mis:'discount-doubles'}],
      hint:'Apply the one-question test before the price tag.',
      good:`Right. ${v.money(saved)} "saved" cost ${v.money(saleP)} to collect.`,
      bad:`Ask the test: was ${person} going to buy the ${short}? Never mentioned, never planned. The sale did not cut spending — it started it.`,
      why:`"Savings" requires a planned purchase to shrink. Without the plan, ${pct}% off is just a ${v.money(saleP)} purchase wearing a savings costume.`};
  }},
{ id:'sales-decisions-choice-06', verb:'choice', part:2, tier:'independent', skill:'sales-decisions',
  gen:(v)=>{
    const person=v.person(), store=v.place();
    const items=[['a birthday gift for their sibling','gift'],['a graduation present','present'],['a thank-you gift','gift'],['a holiday gift','gift']];
    const [item,short]=v.pick(items);
    const price=Math.round(v.cents(25,70)*100)/100;
    const pct=v.pick([15,20,25]);
    const saleP=Math.round(price*(100-pct))/100;
    const saved=Math.round((price-saleP)*100)/100;
    return {
      q:`${person} promised ${item} this month, budgeted at ${v.money(price)}. At ${store}, it is ${pct}% off this week: ${v.money(saleP)}. ${person} buys it now. Which statement is right?`,
      choices:[
        {label:`Real savings — the planned ${short} cost ${v.money(saleP)} instead of ${v.money(price)}, keeping ${v.money(saved)}`,ok:true},
        {label:`Fake savings — waiting for a bigger discount is always better`,ok:false,mis:'sale-timing'},
        {label:`Fake savings — gifts are wants, so no discount counts`,ok:false,mis:'want-value-irrelevant'},
        {label:`Real savings — ${pct}% off would be savings on anything`,ok:false,mis:'sale-not-needed'}],
      hint:'Was this purchase happening anyway, or did the sale invent it?',
      good:`Right: promised gift + discount = ${v.money(saved)} real savings.`,
      bad:`The promise already made this purchase certain. The sale just made it ${v.money(saved)} cheaper — that is the exact situation where a discount saves money.`,
      why:`Planned commitment + lower price = real savings. The gift was already decided; the ${pct}% off only changed the cost, not the decision.`};
  }},
{ id:'sales-decisions-choice-07', verb:'choice', part:2, tier:'independent', skill:'sales-decisions',
  gen:(v)=>{
    const person=v.person(), store=v.place();
    const need=Math.round(v.cents(60,90)*100)/100;
    const threshold=v.pick([100,125]);
    const fillerPrice=Math.round((threshold-need+v.cents(1,8))*100)/100;
    const coupon=v.pick([15,20,25]);
    const net=Math.round((coupon-fillerPrice)*100)/100;
    const win=net>0;
    const filler=v.pick(['a scented candle','a phone case','a fancy notebook','a bag of coffee']);
    return {
      q:`${person} has ${v.money(need)} of groceries needed at ${store}. The store offers ${v.money(coupon)} off any purchase over ${v.money(threshold)}. ${person} adds ${filler} (${v.money(fillerPrice)}) to cross the line. Smart or not?`,
      choices:[
        win?{label:`Smart — ${v.money(coupon)} off beats the ${v.money(fillerPrice)} filler: net ${v.money(net)} ahead`,ok:true}
        :{label:`Not smart — the ${v.money(fillerPrice)} filler costs more than the ${v.money(coupon)} coupon: net ${v.money(-net)} lost`,ok:true},
        {label:`Coupons are always worth chasing no matter the filler`,ok:false,mis:'sale-not-needed'},
        win?{label:`Not smart — threshold deals are always traps`,ok:false}:{label:`Smart — ${v.money(coupon)} off is always a win`,ok:false,mis:'sale-not-needed'},
        {label:`The filler should have been something bigger to win more`,ok:false}],
      hint:'Net it out: coupon gained minus filler spent.',
      good:win?`Right: +${v.money(coupon)} − ${v.money(fillerPrice)} = +${v.money(net)}. The math, not the rule, decides.`:`Right: +${v.money(coupon)} − ${v.money(fillerPrice)} = −${v.money(-net)}.`,
      bad:win?`Both sides: the coupon saves ${v.money(coupon)} but the filler costs ${v.money(fillerPrice)}. ${v.money(coupon)} − ${v.money(fillerPrice)} = ${v.money(net)} ahead — this one works.`:`Both sides: the coupon saves ${v.money(coupon)} but the filler costs ${v.money(fillerPrice)}. ${v.money(coupon)} − ${v.money(fillerPrice)} = −${v.money(-net)} — a loss.`,
      why:win?`Threshold deals are math problems, not traps: here the filler costs less than the coupon it unlocks.`:`"Spend to save" loses when the filler costs more than the coupon. Net math says skip it.`};
  }},
{ id:'sales-decisions-choice-08', verb:'choice', part:2, tier:'independent', skill:'sales-decisions',
  gen:(v)=>{
    const person=v.person(), store=v.place();
    const price=Math.round(v.cents(35,85)*100)/100;
    const pct=v.pick([10,15,20]);
    const online=Math.round(price*(100-pct))/100;
    const ship=Math.round(v.cents(4.99,9.99)*100)/100;
    const total=Math.round((online+ship)*100)/100;
    const diff=Math.round((price-total)*100)/100;
    const wins=diff>0;
    return {
      q:`${person} planned to buy an item this week. ${store} sells it at ${v.money(price)}. The same item online is ${pct}% off (${v.money(online)}) plus ${v.money(ship)} shipping. Better buy?`,
      choices:[
        wins?{label:`Online — ${v.money(online)} + ${v.money(ship)} shipping = ${v.money(total)}, still ${v.money(diff)} under the ${store} price`,ok:true}
        :{label:`${store} — the "discount" totals ${v.money(total)}, ${v.money(-diff)} over the planned ${v.money(price)}`,ok:true},
        wins?{label:`${store} — online discounts are always cancelled by shipping`,ok:false}:{label:`Online — ${v.money(online)} is less than ${v.money(price)}, so it is cheaper`,ok:false,mis:'sticker-compare'},
        {label:`Wait for a bigger online sale — never buy at less than half price`,ok:false,mis:'sale-timing'},
        wins?{label:`Online — flash sales mean it will never be this cheap again`,ok:false,mis:'urgency-pricing'}:{label:`Online — the lower sticker price wins`,ok:false,mis:'sticker-compare'}],
      hint:'Compare all-in totals, not sticker prices.',
      good:wins?`Right: all-in ${v.money(total)} beats ${v.money(price)} by ${v.money(diff)}.`:`Right: the discount dies under shipping. Stay local.`,
      bad:wins?`${v.money(online)} + ${v.money(ship)} = ${v.money(total)} vs ${v.money(price)} at ${store}. All-in wins.`:`${v.money(online)} + ${v.money(ship)} = ${v.money(total)} vs ${v.money(price)} planned. The sticker lied; the total tells the truth.`,
      why:wins?`Two checks passed: planned purchase, and the all-in online total ${v.money(total)} is under budget.`:`The sticker ignored the shipping. All-in, the "deal" costs ${v.money(total)} vs ${v.money(price)} planned.`};
  }},
/* ---- sort x6 (part 2) ---- */
{ id:'sales-decisions-sort-01', verb:'sort', part:2, tier:'independent', skill:'sales-decisions',
  gen:(v)=>{
    const items=v.shuffle([
      {label:'Planned groceries on sale',a:'real savings',why:'Needed anyway; the discount lowers a certain cost.'},
      {label:'Impulse jacket marked 50% off',a:'fake savings',why:'Never planned; the sale created the spending.'},
      {label:'Shampoo BOGO, uses both',a:'real savings',why:'Both get used; the free one cuts a planned cost.'},
      {label:'"Saved $40" on a gadget never wanted',a:'fake savings',why:'$40 "saved" cost real money to collect.'},
      {label:'Birthday gift bought on sale',a:'real savings',why:'The gift was already decided; the price dropped.'},
      {label:'Clearance sneakers in the wrong size',a:'fake savings',why:'An unusable purchase is not a saving at any price.'},
      {label:'Toilet paper bulk pack, lower unit price',a:'real savings',why:'Used fully; the math checks out.'},
      {label:'Limited-edition mug bought for the discount',a:'fake savings',why:'Bought for the deal, not the need.'}]);
    return {
      h:'Sort it: real savings or fake savings?',
      body:'<p>Sort each sale into the right bucket. Use the one-question test: was it already going to be bought?</p>',
      buckets:['Real savings','Fake savings'],
      items};
  }},
{ id:'sales-decisions-sort-02', verb:'sort', part:2, tier:'independent', skill:'sales-decisions',
  gen:(v)=>{
    const items=v.shuffle([
      {label:'It was on the shopping list',a:'good deal reason',why:'A planned purchase passes the test.'},
      {label:'It is 70% off',a:'bad deal reason',why:'The discount alone says nothing about the plan.'},
      {label:'All of it will get used',a:'good deal reason',why:'Use is the second half of the test.'},
      {label:'The coupon ends today',a:'bad deal reason',why:'Urgency is pressure, not value.'},
      {label:'The all-in total is under budget',a:'good deal reason',why:'Total vs budget is the real comparison.'},
      {label:'The tag price looks cheap',a:'bad deal reason',why:'A low sticker price is not savings.'},
      {label:'It replaces something already used up',a:'good deal reason',why:'Replacing a need is a planned purchase.'},
      {label:'Everyone online says it is a steal',a:'bad deal reason',why:'Other people\'s plans are not your plan.'}]);
    return {
      h:'Sort it: good deal reason or bad deal reason?',
      body:'<p>Sort each reason for buying into whether it actually proves the deal is good.</p>',
      buckets:['Good deal reason','Bad deal reason'],
      items};
  }},
{ id:'sales-decisions-sort-03', verb:'sort', part:2, tier:'independent', skill:'sales-decisions',
  gen:(v)=>{
    const items=v.shuffle([
      {label:'Weekly milk, on sale',a:'planned',why:'On the list already.'},
      {label:'Flash-sale headphones',a:'unplanned',why:'The sale created the want.'},
      {label:'Birthday cake for Saturday',a:'planned',why:'The event is already scheduled.'},
      {label:'Random clearance gadget',a:'unplanned',why:'Bought because it was marked down.'},
      {label:'Shoes replacing a worn-out pair',a:'planned',why:'Replacement of a need.'},
      {label:'Extra candy bars at checkout',a:'unplanned',why:'Impulse, not plan.'},
      {label:'Laundry detergent, running low',a:'planned',why:'Stocking a need.'},
      {label:'Second jacket "just in case"',a:'unplanned',why:'No plan, no need date.'}]);
    return {
      h:'Sort it: planned or unplanned?',
      body:'<p>Sort each purchase by whether it was in the plan BEFORE the sale showed up.</p>',
      buckets:['Planned','Unplanned'],
      items};
  }},
{ id:'sales-decisions-sort-04', verb:'sort', part:2, tier:'independent', skill:'sales-decisions',
  gen:(v)=>{
    const items=v.shuffle([
      {label:'$5 filler unlocks a $20 coupon',a:'worth it',why:'$5 spent gains $20: net +$15.'},
      {label:'$30 of extras to get $15 off',a:'not worth it',why:'$30 spent for $15: net −$15.'},
      {label:'$3 of tape reaches free shipping on a $60 planned order',a:'worth it',why:'$3 beats the $7 shipping fee.'},
      {label:'$12 of add-ons to reach a $10 reward',a:'not worth it',why:'Net −$2, plus stuff not needed.'},
      {label:'Buying two you need to get the third free',a:'worth it',why:'All three get used; the free one is real.'},
      {label:'Buying five you need to get the sixth free',a:'not worth it',why:'Three will expire unused.'},
      {label:'$8 filler reaches a $25 threshold',a:'worth it',why:'$8 gains $25: net +$17.'},
      {label:'Adding a $25 gift card to save $5',a:'not worth it',why:'Still $20 of unplanned spending.'}]);
    return {
      h:'Sort it: threshold trick that is worth it, or not?',
      body:'<p>Sort each "spend to unlock" move by the net math: gained minus spent.</p>',
      buckets:['Worth it','Not worth it'],
      items};
  }},
{ id:'sales-decisions-sort-05', verb:'sort', part:2, tier:'independent', skill:'sales-decisions',
  gen:(v)=>{
    const items=v.shuffle([
      {label:'Stocking up on weekly cereal at 40% off',a:'smart stock-up',why:'Used fast; big discount.'},
      {label:'Three years of a spice that expires in one',a:'wasteful stock-up',why:'Expiry beats the discount.'},
      {label:'Extra toothpaste tubes for a family of five',a:'smart stock-up',why:'Never expires; always used.'},
      {label:'Bulk milk for one person',a:'wasteful stock-up',why:'Will spoil before it is used.'},
      {label:'Doubling a monthly soap at half price',a:'smart stock-up',why:'Two months of certain use.'},
      {label:'Ten phone cases for a phone being replaced',a:'wasteful stock-up',why:'The need is ending, not starting.'},
      {label:'A year of batteries at clearance',a:'smart stock-up',why:'Long shelf life; steady use.'},
      {label:'Seasonal decor in bulk',a:'wasteful stock-up',why:'Wants in bulk are just bigger spending.'}]);
    return {
      h:'Sort it: smart stock-up or wasteful stock-up?',
      body:'<p>Sort each stock-up by whether the extra units will actually get used in time.</p>',
      buckets:['Smart stock-up','Wasteful stock-up'],
      items};
  }},
{ id:'sales-decisions-sort-06', verb:'sort', part:2, tier:'independent', skill:'sales-decisions',
  gen:(v)=>{
    const items=v.shuffle([
      {label:'The all-in total is lower than the plan',a:'take the deal',why:'The math says it wins.'},
      {label:'The sticker is lower but shipping erases it',a:'skip the deal',why:'The total is what matters.'},
      {label:'Needed it this week; sale price under budget',a:'take the deal',why:'Planned + cheaper = take it.'},
      {label:'Sale ends tonight and nothing is planned',a:'skip the deal',why:'Urgency on an unplanned buy is a trap.'},
      {label:'Price beats the last three months\' average',a:'take the deal',why:'A real dip on a planned buy.'},
      {label:'Discount applies only with a card signup',a:'skip the deal',why:'A hidden cost rides along.'},
      {label:'Refill of a household staple at the lowest price seen',a:'take the deal',why:'Certain use, best price.'},
      {label:'"Final sale" on something never budgeted',a:'skip the deal',why:'Final sale removes the exit; no plan removes the point.'}]);
    return {
      h:'Sort it: take the deal or skip the deal?',
      body:'<p>Sort each situation by the final call: do the test and the math say take it?</p>',
      buckets:['Take the deal','Skip the deal'],
      items};
  }},
/* ---- decide x8 (part 3, guided with cue) ---- */
{ id:'sales-decisions-decide-01', verb:'decide', part:3, tier:'guided', skill:'sales-decisions',
  gen:(v)=>{
    const person=v.person(), store=v.place();
    const budget=Math.round(v.cents(120,200)*100)/100;
    const items=[['a pair of running shoes','shoes'],['a Bluetooth speaker','speaker'],['a jacket','jacket'],['a backpack','backpack']];
    const [item,short]=v.pick(items);
    const price=Math.round(v.cents(70,120)*100)/100;
    const pct=v.pick([20,25,30]);
    const saleP=Math.round(price*(100-pct))/100;
    const saved=Math.round((price-saleP)*100)/100;
    return {
      q:`${person} has ${v.money(budget)} until payday and planned to buy ${item} this week. At ${store} it is ${pct}% off today only: ${v.money(price)} → ${v.money(saleP)}. But ${person} never planned on the ${short} model — the cheaper house brand ${v.money(Math.round(price*0.6*100)/100)} would do. What is the call?`,
      choices:[
        {label:`Buy the sale ${short} only if the plan needs THIS ${short} — otherwise the house brand keeps more of the ${v.money(budget)}`,ok:true},
        {label:`Buy the ${pct}%-off ${short} right now — "today only" means waiting always costs more`,ok:false,mis:'urgency-pricing'},
        {label:`Skip both — discounts are never real savings`,ok:false,mis:'sale-not-needed'},
        {label:`Buy two of the ${pct}%-off ${short} — the discount doubles if you double the purchase`,ok:false,mis:'discount-doubles'}],
      cue:`Two checks, in order: (1) was THIS ${short} planned, or just "a ${short}"? (2) which choice leaves more of the ${v.money(budget)}?`,
      hint:'A planned purchase of "shoes" is not a planned purchase of THIS shoe.',
      good:`Right. "I need shoes" does not bless a premium shoe at a discount. The house brand keeps more of the ${v.money(budget)} for the rest of the week.`,
      bad:`Split the test: the plan said "${item}"-ish, not this exact ${short}. ${v.money(saleP)} for the fancy one vs the house brand — the "deal" is only real if this specific ${short} was the plan.`,
      why:`The test applies to the specific item, not the category. A discount on an upgrade is still an upgrade you chose.`};
  }},
{ id:'sales-decisions-decide-02', verb:'decide', part:3, tier:'guided', skill:'sales-decisions',
  gen:(v)=>{
    const person=v.person(), store=v.place();
    const cash=Math.round(v.cents(40,80)*100)/100;
    const items=[['phone charger','charger'],['water bottle','bottle'],['notebook','notebook'],['desk lamp','lamp']];
    const [item,short]=v.pick(items);
    const need=Math.round(v.cents(12,25)*100)/100;
    const price=Math.round(v.cents(25,50)*100)/100;
    const pct=v.pick([40,50]);
    const saleP=Math.round(price*(100-pct))/100;
    return {
      q:`${person} has ${v.money(cash)} until Friday. The plan calls for ${item} (${v.money(need)} at ${store}). A flash sale offers a premium ${short} at ${pct}% off: ${v.money(price)} → ${v.money(saleP)}. What should ${person} do?`,
      choices:[
        {label:`Buy the planned ${v.money(need)} ${short} — it covers the need and protects the rest of the ${v.money(cash)}`,ok:true},
        {label:`Buy the ${pct}%-off premium ${short} — a discount this big overrides the plan`,ok:false,mis:'low-price-justifies'},
        {label:`Buy both — the premium one is an investment at this price`,ok:false,mis:'discount-doubles'},
        {label:`Buy the premium ${short} and skip the plan — upgrades are always worth it on sale`,ok:false,mis:'urgency-pricing'}],
      cue:`Cover the need first: does the premium ${short} protect the need, or just spend more of the ${v.money(cash)}?`,
      hint:'The plan names the need. Judge the upgrade against it.',
      good:`Right. The ${v.money(need)} ${short} closes the need; the rest of the ${v.money(cash)} stays protected for the week.`,
      bad:`${person} needs a working ${short}, not a premium one. ${v.money(saleP)} vs ${v.money(need)}: the "deal" spends ${v.money(Math.round((saleP-need)*100)/100)} more to solve the same need.`,
      why:`A need is solved by the cheapest working option. Paying more for a discounted premium version is an upgrade, not savings.`};
  }},
{ id:'sales-decisions-decide-03', verb:'decide', part:3, tier:'guided', skill:'sales-decisions',
  gen:(v)=>{
    const person=v.person(), store=v.place();
    const items=[['coffee pods','pods'],['paper towels','towels'],['laundry pods','pods'],['cereal','cereal']];
    const [item,short]=v.pick(items);
    const monthly=v.int(2,4);
    const price=Math.round(v.cents(8,16)*100)/100;
    const pct=v.pick([30,40]);
    const stockMonths=v.pick([6,12]);
    const units=monthly*stockMonths;
    return {
      q:`${person} uses ${monthly} packs of ${item} a month. At ${store}, a ${pct}%-off sale tempts a ${stockMonths}-month stock-up (${units} packs at ${v.money(price)} each). The ${short} never expires and storage is free. Take the deal?`,
      choices:[
        {label:`Yes — certain use plus a real discount: the stock-up is ${units} planned purchases at ${pct}% off`,ok:true},
        {label:`No — stocking up is always a trap`,ok:false},
        {label:`No — ${person} should only ever buy one month at a time`,ok:false,mis:'sale-not-needed'},
        {label:`Yes — and buy double, since the discount might be bigger next time`,ok:false,mis:'sale-timing'}],
      cue:`Run both halves of the test: was it planned (yes, monthly) AND will all ${units} get used?`,
      hint:'Certain use + no expiry + discount = the green light.',
      good:`Right. ${monthly} a month × ${stockMonths} months of certain use, zero waste, ${pct}% off each.`,
      bad:`Check both: planned? Yes — ${monthly} packs a month, every month. Used? Yes — never expires, ${units} packs over ${stockMonths} months. Both halves pass, so the discount is real.`,
      why:`Stock-ups fail on waste or unplanned buying. Here there is neither: certain use makes every discounted pack a planned purchase at a lower price.`};
  }},
{ id:'sales-decisions-decide-04', verb:'decide', part:3, tier:'guided', skill:'sales-decisions',
  gen:(v)=>{
    const person=v.person(), store=v.place();
    const items=[['avocados','avocados'],['berries','berries'],['fresh juice','juice'],['salad kits','kits']];
    const [item,short]=v.pick(items);
    const price=Math.round(v.cents(3,6)*100)/100;
    const bulk=v.int(6,10);
    const weekly=v.int(1,2);
    const pct=v.pick([40,50]);
    const wasted=bulk-weekly*2;
    return {
      q:`${person} eats about ${weekly} ${short==='avocados'?'':''}serving${weekly>1?'s':''} of ${item} a week; it spoils in about 2 weeks. At ${store}, a ${pct}%-off bulk bin offers ${bulk} at ${v.money(price)} each. What is the call?`,
      choices:[
        {label:`Pass — about ${wasted} of the ${bulk} will spoil, so the "deal" is a waste in disguise`,ok:true},
        {label:`Buy the bulk — ${pct}% off is ${pct}% off no matter what`,ok:false,mis:'sale-not-needed'},
        {label:`Buy the bulk — spoiled food is still cheaper than full price`,ok:false,mis:'free-means-stockup'},
        {label:`Buy twice the bulk — more discount always wins`,ok:false,mis:'discount-doubles'}],
      cue:`How many get eaten in 2 weeks, and what happens to the rest?`,
      hint:'The expiry date votes on every perishable deal.',
      good:`Right. ${weekly} a week × 2 weeks = ${weekly*2} used; ~${wasted} spoiled. The discount dies in the trash.`,
      bad:`Do the use math: ${weekly} per week, 2 weeks of freshness = ${weekly*2} eaten. ${bulk} − ${weekly*2} = ${wasted} wasted. The true price divides by ${weekly*2}, not ${bulk}.`,
      why:`Perishables fail the second half of the test: "will I use it all?" A ${pct}% discount on food that spoils is full price for the trash.`};
  }},
{ id:'sales-decisions-decide-05', verb:'decide', part:3, tier:'guided', skill:'sales-decisions',
  gen:(v)=>{
    const person=v.person(), store=v.place();
    const giftBudget=Math.round(v.cents(50,90)*100)/100;
    const items=[['a board game','game'],['a book set','set'],['a art kit','kit'],['a puzzle','puzzle']];
    const [item,short]=v.pick(items);
    const price=Math.round(v.cents(30,60)*100)/100;
    const pct=v.pick([20,30]);
    const saleP=Math.round(price*(100-pct))/100;
    const saved=Math.round((price-saleP)*100)/100;
    return {
      q:`${person} promised a friend ${item} this month, budgeted at ${v.money(giftBudget)}. At ${store}, the exact ${short} is ${pct}% off: ${v.money(price)} → ${v.money(saleP)}. But the "today only" banner is screaming. Call?`,
      choices:[
        {label:`Buy it now — the promise makes it planned, so the ${v.money(saved)} discount is real; the banner is just noise`,ok:true},
        {label:`Wait for a better sale — "today only" always means a bigger sale is coming`,ok:false,mis:'sale-timing'},
        {label:`Buy it now because of the banner — today-only deals never come back`,ok:false,mis:'urgency-pricing'},
        {label:`Buy two — the discount applies to both`,ok:false,mis:'discount-doubles'}],
      cue:`The promise is the plan. Does the banner change the math of ${v.money(saleP)} vs ${v.money(price)}?`,
      hint:'Planned purchase + lower price = done. Urgency is decoration.',
      good:`Right. Promise + ${pct}% off = ${v.money(saved)} kept. The banner changes nothing.`,
      bad:`The promise already locked the purchase in. ${v.money(price)} → ${v.money(saleP)} is ${v.money(saved)} real savings whether the banner screams or not.`,
      why:`"Today only" is the store's schedule, not yours. The savings come from the plan matching the price — the urgency is just the costume.`};
  }},
{ id:'sales-decisions-decide-06', verb:'decide', part:3, tier:'guided', skill:'sales-decisions',
  gen:(v)=>{
    const person=v.person(), store=v.place();
    const items=[['headphones','headphones'],['a keyboard','keyboard'],['a mouse','mouse'],['a webcam','webcam']];
    const [item,short]=v.pick(items);
    const planPrice=Math.round(v.cents(40,80)*100)/100;
    const pct=v.pick([15,20]);
    const saleP=Math.round(planPrice*(100-pct))/100;
    const shipFee=Math.round(v.cents(6.99,12.99)*100)/100;
    const total=Math.round((saleP+shipFee)*100)/100;
    const over=Math.round((total-planPrice)*100)/100;
    const freeShip=v.pick([50,75]);
    const filler=Math.round((freeShip-saleP+v.cents(1,5))*100)/100;
    return {
      q:`${person} planned to buy ${item} at ${v.money(planPrice)}. Online it is ${pct}% off (${v.money(saleP)}) but shipping is ${v.money(shipFee)} — free over ${v.money(freeShip)}. The cart total would be ${v.money(total)}. What is the smart move?`,
      choices:[
        {label:`Skip the online deal — ${v.money(total)} all-in is ${v.money(over)} over the planned ${v.money(planPrice)}`,ok:true},
        {label:`Add ${v.money(filler)} of extras for free shipping — it unlocks the savings`,ok:false,mis:'sale-not-needed'},
        {label:`Take the online deal — ${v.money(saleP)} is less than ${v.money(planPrice)}, so it is cheaper`,ok:false,mis:'sticker-compare'},
        {label:`Wait for a 50% sale and pay shipping then`,ok:false,mis:'sale-timing'}],
      cue:`Compare ALL-IN numbers: what leaves the account at ${store} vs online with shipping?`,
      hint:'The sticker price never leaves the account alone.',
      good:`Right: ${v.money(saleP)} + ${v.money(shipFee)} = ${v.money(total)} vs ${v.money(planPrice)} planned. The deal loses.`,
      bad:`Add everything: ${v.money(saleP)} + ${v.money(shipFee)} shipping = ${v.money(total)}, which is ${v.money(over)} MORE than the ${v.money(planPrice)} plan. A filler "for free shipping" is just more spending.`,
      why:`Out-the-door math decides, not the sticker. Here the discount is real but smaller than the shipping — so the planned local buy wins.`};
  }},
{ id:'sales-decisions-decide-07', verb:'decide', part:3, tier:'guided', skill:'sales-decisions',
  gen:(v)=>{
    const person=v.person(), store=v.place();
    const items=[['running shoes','shoes'],['a rain jacket','jacket'],['work boots','boots'],['a backpack','backpack']];
    const [item,short]=v.pick(items);
    const full=Math.round(v.cents(90,150)*100)/100;
    const pct=v.pick([30,40]);
    const saleP=Math.round(full*(100-pct))/100;
    const saved=Math.round((full-saleP)*100)/100;
    const season=v.pick(['next winter','the spring trip','next fall','the hiking trip']);
    return {
      q:`${person}'s ${short} are falling apart but will survive until ${season}. At ${store}, the replacement is ${pct}% off now: ${v.money(full)} → ${v.money(saleP)}. The sale ends today. Buy now or wait?`,
      choices:[
        {label:`Buy now — the replacement is certain before ${season}, so the ${v.money(saved)} discount is real savings today`,ok:true},
        {label:`Wait — buying early is the same as impulse buying`,ok:false,mis:'sale-not-needed'},
        {label:`Buy now — "ends today" means it will never be this cheap`,ok:false,mis:'urgency-pricing'},
        {label:`Buy two pairs — the discount doubles on the second`,ok:false,mis:'discount-doubles'}],
      cue:`Is the future purchase certain? A certain replacement is a planned purchase — just an early one.`,
      hint:'Certainty is the test. The ${short} WILL be bought.',
      good:`Right. Certain future need + real discount = ${v.money(saved)} kept. Timing just moved earlier.`,
      bad:`The ${short} are dying; the replacement is certain before ${season}. Buying a certain purchase at ${v.money(saleP)} instead of ${v.money(full)} keeps ${v.money(saved)} — "early" is not "unplanned."`,
      why:`A planned purchase includes certain future replacements. The discount shrinks a certain future cost — that is real savings, not impulse.`};
  }},
{ id:'sales-decisions-decide-08', verb:'decide', part:3, tier:'guided', skill:'sales-decisions',
  gen:(v)=>{
    const person=v.person(), store=v.place();
    const items=[['a desk lamp','lamp'],['a throw blanket','blanket'],['a picture frame','frame'],['a plant pot','pot']];
    const [item,short]=v.pick(items);
    const price=Math.round(v.cents(18,35)*100)/100;
    const pct=v.pick([50,60]);
    const saleP=Math.round(price*(100-pct))/100;
    return {
      q:`${person} is browsing at ${store} with no shopping list. The ${short} is ${pct}% off: ${v.money(price)} → ${v.money(saleP)}. ${person} thinks "at this price I cannot afford NOT to buy it." Call?`,
      choices:[
        {label:`Walk away — no plan means no savings; this is ${v.money(saleP)} of spending, not a bargain`,ok:true},
        {label:`Buy it — ${pct}% off means you literally cannot lose money`,ok:false,mis:'low-price-justifies'},
        {label:`Buy it — at ${v.money(saleP)} it will definitely be useful someday`,ok:false,mis:'someday-subscription'},
        {label:`Buy two — at ${pct}% off the second one pays for itself`,ok:false,mis:'discount-doubles'}],
      cue:`No list, no plan. Run the test: was this purchase decided before the tag was seen?`,
      hint:'"Cannot afford NOT to buy it" is the sale talking, not the budget.',
      good:`Right. No plan = the ${v.money(saleP)} is spending, not savings.`,
      bad:`The test needs a plan that existed before the sale. Browsing with no list means the tag created the want — ${v.money(saleP)} leaves the account for something worth $0.00 to the plan.`,
      why:`"Cannot afford not to buy it" flips the test backwards. The question is never "is it cheap?" — it is "was I buying it anyway?"`};
  }},
/* ---- spot x6 (part 3, guided with cue) ---- */
{ id:'sales-decisions-spot-01', verb:'spot', part:3, tier:'guided', skill:'sales-decisions',
  gen:(v)=>{
    const person=v.person();
    const list=Math.round(v.cents(200,300)*100)/100;
    const sale=Math.round(list*0.6*100)/100;
    return {
      scenario:`<p>${person}\u2019s reasoning about a jacket:</p><ul><li>List price: ${v.money(list)}</li><li>Sale price: ${v.money(sale)}</li><li>"I saved ${v.money(Math.round((list-sale)*100)/100)}!"</li><li>Was a jacket in the plan? No.</li></ul>`,
      q:'What is the mistake here?',
      choices:[
        {label:`No jacket was planned, so nothing was "saved" — the sale created ${v.money(sale)} of spending`,ok:true},
        {label:`The math is wrong — 40% off is not real savings`,ok:false},
        {label:`The mistake is not buying two jackets to double the savings`,ok:false,mis:'discount-doubles'},
        {label:`The mistake is the store lying about the list price`,ok:false,mis:'sticker-gap-trust'}],
      cue:`Check the plan first: was a jacket in it before the sale appeared?`,
      hint:'Savings needs a plan to shrink.',
      good:`Right. No plan, no savings — just ${v.money(sale)} spent.`,
      bad:`A discount only saves money on a planned purchase. No jacket was planned, so the "savings" never existed.`,
      why:`"I saved $X" without a plan is the classic fake-savings line. Real savings shrinks a purchase you were making anyway.`};
  }},
{ id:'sales-decisions-spot-02', verb:'spot', part:3, tier:'guided', skill:'sales-decisions',
  gen:(v)=>{
    const person=v.person();
    const reg=Math.round(v.cents(8,14)*100)/100;
    const bulk=Math.round(reg*6*0.8*100)/100;
    return {
      scenario:`<p>${person} buys ${v.money(bulk)} of berries in bulk "because it is 20% off":</p><ul><li>Normal price: ${v.money(reg)} each</li><li>Bulk deal: 6 for ${v.money(bulk)}</li><li>Eats: 2 a week; berries spoil in 1 week</li><li>"20% off means I win either way."</li></ul>`,
      q:'Where does the reasoning break?',
      choices:[
        {label:`About 4 of the 6 spoil — the "20% off" is full price for the trash`,ok:true},
        {label:`Bulk deals are always wrong, so the whole idea fails`,ok:false},
        {label:`The math is wrong — 6 for ${v.money(bulk)} is not 20% off`,ok:false},
        {label:`${person} should have bought 12 to make the discount bigger`,ok:false,mis:'discount-doubles'}],
      cue:`How many berries get EATEN before they spoil? Divide the bulk price by that number.`,
      hint:'Count what gets used, not what gets bought.',
      good:`Right: 2 used, 4 wasted. ${v.money(bulk)} ÷ 2 = ${v.money(Math.round(bulk/2*100)/100)} per eaten berry vs ${v.money(reg)}.`,
      bad:`2 a week, 1 week of freshness = 2 eaten, 4 wasted. True unit price: ${v.money(bulk)} ÷ 2 = ${v.money(Math.round(bulk/2*100)/100)} each — worse than ${v.money(reg)}.`,
      why:`The test has two halves: planned AND used. The discount passes the first and fails the second — spoilage rewrites the price.`};
  }},
{ id:'sales-decisions-spot-03', verb:'spot', part:3, tier:'guided', skill:'sales-decisions',
  gen:(v)=>{
    const person=v.person(), store=v.place();
    const price=Math.round(v.cents(50,90)*100)/100;
    const online=Math.round(price*0.75*100)/100;
    const ship=Math.round(v.cents(7.99,11.99)*100)/100;
    return {
      scenario:`<p>${person} compares a planned purchase:</p><ul><li>${store}: ${v.money(price)}</li><li>Online: ${v.money(online)} (25% off!) plus ${v.money(ship)} shipping</li><li>Total online: ${v.money(Math.round((online+ship)*100)/100)}</li><li>"The 25% off wins, obviously."</li></ul>`,
      q:'What did the reasoning miss?',
      choices:[
        {label:`The shipping — all-in, online costs ${v.money(Math.round((online+ship)*100)/100)} vs ${v.money(price)} local; the sticker lied`,ok:true},
        {label:`Nothing — 25% off always beats the local price`,ok:false,mis:'sticker-compare'},
        {label:`Online shopping is always a trap, so ${store} wins by default`,ok:false},
        {label:`${person} should wait for a 50% sale before comparing`,ok:false,mis:'sale-timing'}],
      cue:`Add EVERYTHING that leaves the account — then compare.`,
      hint:'Sticker vs sticker is not the comparison.',
      good:`Right: ${v.money(online)} + ${v.money(ship)} = ${v.money(Math.round((online+ship)*100)/100)} — the discount loses to shipping.`,
      bad:`The sticker is ${v.money(online)}, but the account loses ${v.money(online)} + ${v.money(ship)} = ${v.money(Math.round((online+ship)*100)/100)}. ${store} at ${v.money(price)} is cheaper out the door.`,
      why:`"Cheaper" means out the door. The 25% off was real but smaller than the shipping — totals decide, not tags.`};
  }},
{ id:'sales-decisions-spot-04', verb:'spot', part:3, tier:'guided', skill:'sales-decisions',
  gen:(v)=>{
    const person=v.person();
    const coupon=Math.round(v.cents(15,25)*100)/100;
    const threshold=Math.round(v.cents(75,120)*100)/100;
    const filler=Math.round(v.cents(20,35)*100)/100;
    return {
      scenario:`<p>${person} at the checkout:</p><ul><li>Needed items total: ${v.money(Math.round((threshold-filler)*100)/100)}</li><li>Coupon: ${v.money(coupon)} off ${v.money(threshold)}+</li><li>Adds unneeded filler: ${v.money(filler)}</li><li>"I am saving ${v.money(coupon)}!"</li></ul>`,
      q:'What is wrong with the "savings" claim?',
      choices:[
        {label:`The filler costs ${v.money(filler)} to gain ${v.money(coupon)} — net ${v.money(Math.round((coupon-filler)*100)/100)}, so the "savings" cost money`,ok:true},
        {label:`Coupons are always traps, so ${person} should never use them`,ok:false},
        {label:`${person} should have added a bigger filler to save more`,ok:false,mis:'sale-not-needed'},
        {label:`The threshold is too high — stores should not have thresholds`,ok:false}],
      cue:`Net it: coupon gained minus filler spent. Which number is bigger?`,
      hint:'${v.money(filler)} out, ${v.money(coupon)} back.',
      good:`Right: +${v.money(coupon)} − ${v.money(filler)} = ${v.money(Math.round((coupon-filler)*100)/100)}.`,
      bad:`Both sides: gain ${v.money(coupon)}, spend ${v.money(filler)}. Net: ${v.money(coupon)} − ${v.money(filler)} = ${v.money(Math.round((coupon-filler)*100)/100)}. The coupon was bait.`,
      why:`"Spend to save" is a math problem. Here the filler costs more than the coupon — the savings claim spends money to "earn" less.`};
  }},
{ id:'sales-decisions-spot-05', verb:'spot', part:3, tier:'guided', skill:'sales-decisions',
  gen:(v)=>{
    const person=v.person();
    const price=Math.round(v.cents(30,60)*100)/100;
    const pct=v.pick([30,40,50]);
    const saleP=Math.round(price*(100-pct))/100;
    return {
      scenario:`<p>${person} sees a "LIMITED TIME" banner:</p><ul><li>Item: ${v.money(price)} → ${v.money(saleP)} (${pct}% off, today only)</li><li>Plan: none — was not shopping for this</li><li>"If I wait, I will lose the deal forever."</li></ul>`,
      q:'What is the flaw in the thinking?',
      choices:[
        {label:`"Losing the deal" assumes a deal existed — with no plan, there is only ${v.money(saleP)} of new spending`,ok:true},
        {label:`Flash sales are always scams, so the price must be fake`,ok:false,mis:'sticker-gap-trust'},
        {label:`The flaw is not buying two before the sale ends`,ok:false,mis:'discount-doubles'},
        {label:`The flaw is that ${pct}% is too small to count as a deal`,ok:false}],
      cue:`Urgency assumes the purchase was happening. Was it?`,
      hint:'You cannot lose a deal on something you were never buying.',
      good:`Right. No plan = no deal to lose. Just spending to avoid.`,
      bad:`The banner's logic needs a planned purchase to be true. No plan existed, so "losing" the sale loses nothing — buying it loses ${v.money(saleP)}.`,
      why:`Urgency borrows the logic of a planned purchase and applies it to an unplanned one. The pressure is real; the "deal" is not.`};
  }},
{ id:'sales-decisions-spot-06', verb:'spot', part:3, tier:'guided', skill:'sales-decisions',
  gen:(v)=>{
    const person=v.person();
    const price=Math.round(v.cents(20,40)*100)/100;
    const pct=v.pick([25,30]);
    const saleP=Math.round(price*(100-pct))/100;
    return {
      scenario:`<p>${person} needed ONE item and found it ${pct}% off:</p><ul><li>Needed: 1 at ${v.money(price)}</li><li>Deal: ${pct}% off — ${v.money(saleP)} each</li><li>Bought: 3 ("the discount is bigger on more")</li><li>Total spent: ${v.money(Math.round(saleP*3*100)/100)} vs plan ${v.money(price)}</li></ul>`,
      q:'What went wrong?',
      choices:[
        {label:`The plan needed 1; buying 3 turned ${v.money(price)} of planned spending into ${v.money(Math.round(saleP*3*100)/100)} of spending`,ok:true},
        {label:`Buying more of a discounted item is always the smart move`,ok:false,mis:'discount-doubles'},
        {label:`The discount was too small to matter at all`,ok:false},
        {label:`${person} should have bought 3 at full price instead`,ok:false}],
      cue:`The discount shrank the price of ONE. What did the extra two cost?`,
      hint:'One needed. Three bought. Do that subtraction.',
      good:`Right: the extra two cost ${v.money(Math.round(saleP*2*100)/100)} of pure unplanned spending.`,
      bad:`1 at ${v.money(saleP)} = ${v.money(Math.round((price-saleP)*100)/100)} saved. 3 at ${v.money(saleP)} = ${v.money(Math.round(saleP*3*100)/100)} spent — ${v.money(Math.round((saleP*3-price)*100)/100)} MORE than the plan.`,
      why:`Discounts shrink prices; they do not shrink quantities. Buying extra at a discount multiplies the spending the plan never had.`};
  }},
/* ---- compare x6 (part 2: 01-04, part 3: 05-06 guided) ---- */
{ id:'sales-decisions-compare-01', verb:'compare', part:2, tier:'independent', skill:'sales-decisions',
  gen:(v)=>{
    const person=v.person(), store=v.place();
    const priceA=Math.round(v.cents(60,100)*100)/100;
    const pct=v.pick([25,30]);
    const saleA=Math.round(priceA*(100-pct))/100;
    const priceB=Math.round(v.cents(40,70)*100)/100;
    const aWins=saleA<priceB;
    return {
      context:`<p><b>Option A:</b> name-brand item at ${store}: ${v.money(priceA)} → ${v.money(saleA)} (${pct}% off). ${person} needs the item, but the plan named the category, not this brand.</p><p><b>Option B:</b> house brand, same category: ${v.money(priceB)}, works fine for the need.</p>`,
      q:'Which is the better buy?',
      choices:[
        aWins?{label:`Option A — ${v.money(saleA)} beats the house brand ${v.money(priceB)}; the plan was the category and the discount wins`,ok:true}
        :{label:`Option B — ${v.money(priceB)} beats the discounted ${v.money(saleA)}; the plan was the category, not the brand`,ok:true},
        {label:`The name brand — a ${pct}% discount always wins`,ok:false,mis:'sale-not-needed'},
        aWins?{label:`Option B — house brands are always cheaper`,ok:false}:{label:`Option A — the name brand is higher quality`,ok:false,mis:'price-means-quality'},
        {label:`Buy both — the discount applies to both`,ok:false,mis:'discount-doubles'}],
      hint:'Compare the two totals against what the plan actually required.',
      good:aWins?`Right: ${v.money(saleA)} < ${v.money(priceB)}. The discount beats the cheaper brand.`:`Right: the plan needed the category, not the brand. ${v.money(priceB)} < ${v.money(saleA)}.`,
      bad:`The plan said "an item," not "this exact brand." Compare totals: ${v.money(saleA)} vs ${v.money(priceB)}.`,
      why:`A discount on a brand is still just a price. Compare the totals against the actual need, not against the original sticker.`};
  }},
{ id:'sales-decisions-compare-02', verb:'compare', part:2, tier:'independent', skill:'sales-decisions',
  gen:(v)=>{
    const person=v.person(), store=v.place();
    const pA=Math.round(v.cents(50,80)*100)/100;
    const pB=Math.round(v.cents(55,90)*100)/100;
    const pctB=v.pick([20,25]);
    const saleB=Math.round(pB*(100-pctB))/100;
    return {
      context:`<p><b>Option A:</b> planned item at ${store}, no sale: ${v.money(pA)}.</p><p><b>Option B:</b> same item, another store: ${v.money(pB)} list, ${pctB}% off today = ${v.money(saleB)}.</p>`,
      q:`${person} planned to buy this exact item. Which store wins?`,
      choices:[
        {label:`Option B — ${v.money(saleB)} vs ${v.money(pA)}: planned item + real discount`,ok:true},
        {label:`Option A — sales are just traps`,ok:false,mis:'sale-not-needed'},
        {label:`Option B — and buy a second one since the discount applies`,ok:false,mis:'discount-doubles'},
        {label:`Option A — the lower list price is always the better deal`,ok:false,mis:'sticker-gap-trust'}],
      hint:'Both are the planned item. Compare the prices you would actually pay.',
      good:`Right: ${v.money(saleB)} < ${v.money(pA)}.`,
      bad:`Same planned item, two prices: ${v.money(pA)} vs ${v.money(saleB)}. The lower one wins — the discount is real because the purchase was planned.`,
      why:`When the purchase is planned, a lower price is simply savings. Compare what leaves the account.`};
  }},
{ id:'sales-decisions-compare-03', verb:'compare', part:2, tier:'independent', skill:'sales-decisions',
  gen:(v)=>{
    const person=v.person(), store=v.place();
    const big=Math.round(v.cents(24,40)*100)/100;
    const bulk=Math.round(big*3*0.85*100)/100;
    return {
      context:`<p><b>Option A:</b> regular size at ${store}: ${v.money(big)} each, ${person} uses 1 a month.</p><p><b>Option B:</b> 3-pack, 15% off per unit: ${v.money(bulk)} total. The product expires in 2 months.</p>`,
      q:'Which is the better buy for what will actually be used?',
      choices:[
        {label:`Option A — but only because bigger packs are always a waste`,ok:false},
        {label:`Option A — ${person} uses 2 in 2 months, so the 3-pack wastes one: true cost ${v.money(Math.round(bulk/2*100)/100)}/used vs ${v.money(big)}`,ok:true},
        {label:`Option B — 15% off per unit is always the better value`,ok:false,mis:'unit-price-sticker'},
        {label:`Option B — buying more is always smarter on sale`,ok:false,mis:'discount-doubles'}],
      hint:'How many get used before the expiry date?',
      good:`Right: 2 used of 3. ${v.money(bulk)} ÷ 2 = ${v.money(Math.round(bulk/2*100)/100)} per used vs ${v.money(big)}.`,
      bad:`Expiry: 2 months, ${person} uses 1 a month = 2 used, 1 wasted. True unit price: ${v.money(bulk)} ÷ 2 = ${v.money(Math.round(bulk/2*100)/100)} vs ${v.money(big)} regular.`,
      why:`The 15% discount assumed all 3 get used. Expiry rewrites the price — divide by used, not bought.`};
  }},
{ id:'sales-decisions-compare-04', verb:'compare', part:2, tier:'independent', skill:'sales-decisions',
  gen:(v)=>{
    const person=v.person(), store=v.place();
    const pA=Math.round(v.cents(45,75)*100)/100;
    const pct=v.pick([30,40]);
    const pB=Math.round(v.cents(50,85)*100)/100;
    const saleB=Math.round(pB*(100-pct))/100;
    const ship=Math.round(v.cents(5.99,9.99)*100)/100;
    const totalB=Math.round((saleB+ship)*100)/100;
    return {
      context:`<p><b>Option A:</b> ${store}, planned item: ${v.money(pA)}, no shipping.</p><p><b>Option B:</b> online, same item: ${v.money(pB)} → ${v.money(saleB)} (${pct}% off) + ${v.money(ship)} shipping = ${v.money(totalB)} all-in.</p>`,
      q:'Better buy?',
      choices:[
        totalB<pA?{label:`Option B — ${v.money(totalB)} all-in beats ${v.money(pA)}`,ok:true}:{label:`Option A — ${v.money(pA)} beats the ${v.money(totalB)} all-in online total`,ok:true},
        totalB<pA?{label:`Option A — local stores are always cheaper`,ok:false}:{label:`Option B — the ${v.money(saleB)} sticker is lower than ${v.money(pA)}`,ok:false,mis:'sticker-compare'},
        {label:`Wait for a bigger sale instead of comparing`,ok:false,mis:'sale-timing'},
        {label:`Option B — online discounts always win`,ok:false,mis:'sticker-compare'}],
      hint:'All-in vs all-in. Add the shipping first.',
      good:totalB<pA?`Right: ${v.money(totalB)} < ${v.money(pA)}.`:`Right: ${v.money(pA)} < ${v.money(totalB)}.`,
      bad:`Compare the full totals: ${v.money(pA)} vs ${v.money(saleB)} + ${v.money(ship)} = ${v.money(totalB)}.`,
      why:`Stickers compete with stickers, but accounts compete with accounts. All-in decides.`};
  }},
{ id:'sales-decisions-compare-05', verb:'compare', part:3, tier:'guided', skill:'sales-decisions',
  gen:(v)=>{
    const person=v.person(), store=v.place();
    const need=Math.round(v.cents(80,120)*100)/100;
    const threshold=v.pick([150,200]);
    const filler=Math.round((threshold-need+v.cents(2,10))*100)/100;
    const coupon=Math.round(v.cents(20,30)*100)/100;
    return {
      context:`<p><b>Option A:</b> buy just the needed ${v.money(need)} of groceries — no coupon.</p><p><b>Option B:</b> add ${v.money(filler)} of unneeded filler to reach ${v.money(threshold)} and get ${v.money(coupon)} off.</p>`,
      q:'Which is the better call?',
      choices:[
        coupon>filler?{label:`Option B — ${v.money(coupon)} off beats the ${v.money(filler)} filler: net ${v.money(Math.round((coupon-filler)*100)/100)} ahead`,ok:true}:{label:`Option A — the ${v.money(filler)} filler costs more than the ${v.money(coupon)} coupon: net ${v.money(Math.round((filler-coupon)*100)/100)} lost`,ok:true},
        {label:`Option B — coupons are always worth it`,ok:false,mis:'sale-not-needed'},
        {label:`Option A — threshold deals are always traps`,ok:false},
        {label:`Option B — and add even more filler for the next threshold`,ok:false,mis:'sale-not-needed'}],
      cue:`Net math: coupon gained minus filler spent. The bigger number wins the comparison.`,
      hint:'Gained minus spent.',
      good:coupon>filler?`Right: ${v.money(coupon)} − ${v.money(filler)} = +${v.money(Math.round((coupon-filler)*100)/100)}.`:`Right: ${v.money(coupon)} − ${v.money(filler)} = −${v.money(Math.round((filler-coupon)*100)/100)}.`,
      bad:`Option A nets $0.00 extra. Option B nets ${v.money(coupon)} − ${v.money(filler)} = ${v.money(Math.round((coupon-filler)*100)/100)}.`,
      why:`Threshold deals are never automatically good or bad — the net decides the comparison.`};
  }},
{ id:'sales-decisions-compare-06', verb:'compare', part:3, tier:'guided', skill:'sales-decisions',
  gen:(v)=>{
    const person=v.person(), store=v.place();
    const price=Math.round(v.cents(25,50)*100)/100;
    const pctA=v.pick([20,25]);
    const saleA=Math.round(price*(100-pctA))/100;
    const pctB=v.pick([40,50]);
    const saleB=Math.round(price*(100-pctB))/100;
    return {
      context:`<p><b>Option A:</b> buy 1 now at ${store}: ${v.money(price)} → ${v.money(saleA)} (${pctA}% off). ${person} needs 1 this week.</p><p><b>Option B:</b> buy 3 now: 3 × ${v.money(saleB)} (${pctB}% off) = ${v.money(Math.round(saleB*3*100)/100)}. ${person} will use 1 more in a month; it never expires.</p>`,
      q:'Which is the better call?',
      choices:[
        {label:`Option B — all 3 will be used, so 3 × ${v.money(saleB)} beats buying later at higher prices`,ok:true},
        {label:`Option A — buying extra is always a trap`,ok:false},
        {label:`Option B — bigger discounts are always better, no math needed`,ok:false,mis:'low-price-justifies'},
        {label:`Option A — ${pctA}% off is safer than ${pctB}% off`,ok:false,mis:'smaller-is-safer'}],
      cue:`Count the CERTAIN future uses: 1 now + 1 later = 2 certain. What does the third one cost vs save?`,
      hint:'Certain use turns extra units into planned purchases.',
      good:`Right: 2 certain uses at the ${pctB}% price beats waiting.`,
      bad:`Uses: 1 now + 1 certain later = 2 certain. Option B gets 2 certain units at ${v.money(saleB)} each vs ${v.money(saleA)} now. The third is a bonus, not a burden — it never expires.`,
      why:`Certain future use converts "extra" into "early." The bigger discount on certain units is real savings.`};
  }},
/* ---- predict x6 (part 3, guided with cue) ---- */
{ id:'sales-decisions-predict-01', verb:'predict', part:3, tier:'guided', skill:'sales-decisions',
  gen:(v)=>{
    const person=v.person(), store=v.place();
    const spend=Math.round(v.cents(60,110)*100)/100;
    const pct=v.pick([30,40,50]);
    return {
      q:`${person} walks into ${store} with no plan and buys ${v.money(spend)} of ${pct}%-off items, telling a friend "I saved a ton." What actually happened to ${person}'s money?`,
      choices:[
        {label:`${v.money(spend)} of unplanned spending left the account — the "savings" never existed without a plan`,ok:true},
        {label:`${person} really did save money, because ${pct}% off is savings`,ok:false,mis:'sale-not-needed'},
        {label:`${person} saved ${v.money(spend)} — spending on sale counts as saving`,ok:false,mis:'sale-not-needed'},
        {label:`${person} should have spent more to save more`,ok:false,mis:'discount-doubles'}],
      cue:`Apply the test: was any of this purchased before the sale existed? No plan = ?`,
      hint:'No plan, no savings.',
      good:`Right. ${v.money(spend)} spent, $0.00 saved.`,
      bad:`The test: nothing was planned, so nothing was saved. The account lost ${v.money(spend)} — the discount only decided what got bought, not whether money was saved.`,
      why:`Predictable outcome: unplanned sale spending always converts $0.00 of planned spending into real spending. The "ton saved" is the story the tag tells.`};
  }},
{ id:'sales-decisions-predict-02', verb:'predict', part:3, tier:'guided', skill:'sales-decisions',
  gen:(v)=>{
    const person=v.person(), store=v.place();
    const need=Math.round(v.cents(40,70)*100)/100;
    const threshold=v.pick([100,125]);
    const filler=Math.round((threshold-need)*100)/100;
    const coupon=Math.round(v.cents(15,25)*100)/100;
    return {
      q:`Every month ${person} adds about ${v.money(filler)} of unneeded filler at ${store} to reach a ${v.money(coupon)}-off threshold. After a year of this, what is the real result?`,
      choices:[
        {label:`About ${v.money(Math.round((filler-coupon)*12*100)/100)} of net loss a year — ${v.money(Math.round((filler-coupon)*100)/100)} lost × 12 months`,ok:true},
        {label:`About ${v.money(coupon*12)} saved a year — coupons are savings`,ok:false,mis:'sale-not-needed'},
        {label:`It evens out — filler spending is basically free`,ok:false,mis:'sale-not-needed'},
        {label:`${person} should double the filler to double the coupons`,ok:false,mis:'discount-doubles'}],
      cue:`One month: ${v.money(filler)} spent, ${v.money(coupon)} gained. Net per month = ? Then × 12.`,
      hint:'Monthly net × 12.',
      good:`Right: ${v.money(Math.round((filler-coupon)*100)/100)} × 12 = ${v.money(Math.round((filler-coupon)*12*100)/100)} a year gone.`,
      bad:`Monthly: +${v.money(coupon)} − ${v.money(filler)} = −${v.money(Math.round((filler-coupon)*100)/100)}. × 12 = −${v.money(Math.round((filler-coupon)*12*100)/100)} a year. The "savings habit" is a spending habit.`,
      why:`Small monthly leaks compound. A ${v.money(Math.round((filler-coupon)*100)/100)}-a-month threshold habit costs ${v.money(Math.round((filler-coupon)*12*100)/100)} a year — predictable from the first receipt.`};
  }},
{ id:'sales-decisions-predict-03', verb:'predict', part:3, tier:'guided', skill:'sales-decisions',
  gen:(v)=>{
    const person=v.person(), store=v.place();
    const items=[['sneakers','shoes'],['a jacket','jacket'],['headphones','headphones'],['a backpack','backpack']];
    const [item,short]=v.pick(items);
    const full=Math.round(v.cents(80,140)*100)/100;
    const pct=v.pick([25,30]);
    const saleP=Math.round(full*(100-pct))/100;
    const saved=Math.round((full-saleP)*100)/100;
    return {
      q:`${person}'s ${short} will need replacing in 3 months — it is certain. At ${store}, the replacement is ${pct}% off this week: ${v.money(full)} → ${v.money(saleP)}. If ${person} buys now instead of waiting 3 months, what is the outcome?`,
      choices:[
        {label:`${v.money(saved)} of real savings — a certain future purchase bought cheaper today`,ok:true},
        {label:`${v.money(saleP)} of wasted money — buying early is always impulse buying`,ok:false,mis:'sale-not-needed'},
        {label:`Nothing changes — timing never affects savings`,ok:false},
        {label:`${person} should wait — early buyers always regret it`,ok:false,mis:'sale-timing'}],
      cue:`Is the future purchase certain? Certainty = planned, just early.`,
      hint:'Certain future need + discount = savings.',
      good:`Right: certain replacement at ${v.money(saleP)} instead of ${v.money(full)} = ${v.money(saved)} kept.`,
      bad:`The replacement is certain within 3 months. Buying it at ${v.money(saleP)} instead of ${v.money(full)} keeps ${v.money(saved)} — "early" is not "unplanned" when the need is certain.`,
      why:`Predictable: certain future purchases are planned purchases. Moving them earlier at a discount keeps money, it does not spend extra.`};
  }},
{ id:'sales-decisions-predict-04', verb:'predict', part:3, tier:'guided', skill:'sales-decisions',
  gen:(v)=>{
    const person=v.person();
    const weekly=Math.round(v.cents(15,30)*100)/100;
    return {
      q:`${person} starts buying the weekly groceries "only on sale," but the sales keep adding unplanned items — about ${v.money(weekly)} extra a week. What breaks first?`,
      choices:[
        {label:`The weekly budget — ${v.money(weekly)} a week of unplanned "sale" spending leaks ${v.money(Math.round(weekly*52*100)/100)} a year`,ok:true},
        {label:`Nothing — sale prices always cover the extra items`,ok:false,mis:'low-price-justifies'},
        {label:`The savings account grows — sales build wealth automatically`,ok:false,mis:'sale-not-needed'},
        {label:`The store runs out of sales — buying extra ends the discounts`,ok:false}],
      cue:`${v.money(weekly)} a week × 52 weeks. What does that number do to the budget?`,
      hint:'Unplanned spending is spending, even on sale.',
      good:`Right: ${v.money(weekly)} × 52 = ${v.money(Math.round(weekly*52*100)/100)} a year of leaks.`,
      bad:`${v.money(weekly)} a week × 52 = ${v.money(Math.round(weekly*52*100)/100)} a year. The groceries were planned; the extras were not. The budget breaks before the "savings" ever show up.`,
      why:`Sale-only shopping without the plan test becomes unplanned spending with better marketing. The leak is predictable: extras × weeks.`};
  }},
{ id:'sales-decisions-predict-05', verb:'predict', part:3, tier:'guided', skill:'sales-decisions',
  gen:(v)=>{
    const person=v.person(), store=v.place();
    const items=[['a lamp','lamp'],['a rug','rug'],['a set of curtains','curtains'],['a throw blanket','blanket']];
    const [item,short]=v.pick(items);
    const price=Math.round(v.cents(25,60)*100)/100;
    const pct=v.pick([50,60,70]);
    const saleP=Math.round(price*(100-pct))/100;
    return {
      q:`${person} keeps a wish list and checks it during sales. At ${store}, ${item} on the list is ${pct}% off: ${v.money(price)} → ${v.money(saleP)}. ${person} buys it. What is the predictable result?`,
      choices:[
        {label:`Real savings — the wish list is a plan, so the discount shrank a planned purchase`,ok:true},
        {label:`Wasted money — wish lists are just excuses to spend`,ok:false,mis:'sale-not-needed'},
        {label:`No savings — only immediate needs count as plans`,ok:false},
        {label:`Double savings — wish lists earn interest while waiting`,ok:false}],
      cue:`The wish list IS the plan. Was the purchase decided before the tag?`,
      hint:'A list made before the sale = a plan.',
      good:`Right: planned + discounted = real savings.`,
      bad:`The wish list is the plan — decided before the sale existed. ${v.money(price)} → ${v.money(saleP)} on a listed item is the test passing.`,
      why:`A wish list turns "someday" into "planned." Sales checked against a list become real savings instead of real spending.`};
  }},
{ id:'sales-decisions-predict-06', verb:'predict', part:3, tier:'guided', skill:'sales-decisions',
  gen:(v)=>{
    const person=v.person(), store=v.place();
    const price=Math.round(v.cents(40,90)*100)/100;
    const pct=v.pick([30,40]);
    const saleP=Math.round(price*(100-pct))/100;
    return {
      q:`${person} buys an unplanned ${v.money(saleP)} item "because it was ${pct}% off," then does it again next month, and again. After 6 months, what does the account show?`,
      choices:[
        {label:`About ${v.money(Math.round(saleP*6*100)/100)} of unplanned spending — the "deals" compounded into a leak`,ok:true},
        {label:`Big savings — six discounts in a row build wealth`,ok:false,mis:'sale-not-needed'},
        {label:`About $0.00 changed — sale spending does not count`,ok:false},
        {label:`The store owes ${person} a loyalty reward that covers it`,ok:false,mis:'discount-doubles'}],
      cue:`${v.money(saleP)} × 6. No plan in any month = no savings in any month.`,
      hint:'Repeat the month, then multiply.',
      good:`Right: ${v.money(saleP)} × 6 = ${v.money(Math.round(saleP*6*100)/100)} of pure spending.`,
      bad:`Each month: no plan, so ${v.money(saleP)} spent, $0.00 saved. × 6 = ${v.money(Math.round(saleP*6*100)/100)} gone. The discount never once turned into savings.`,
      why:`Unplanned sale spending compounds exactly like interest — in the wrong direction. Six "deals" = six spends.`};
  }},
/* ---- build x5 (part 3, guided with cue; targets in cents, must sum to totalCents) ---- */
{ id:'sales-decisions-build-01', verb:'build', part:3, tier:'guided', skill:'sales-decisions',
  gen:(v)=>{
    const total=v.pick([12000,15000,18000]);
    const planned=Math.round(total*0.6/100)*100;
    const savings=total-planned-Math.round(total*0.1/100)*100;
    const saleGrab=Math.round(total*0.1/100)*100;
    return {
      h:'Build it: split the shopping budget',
      body:`<p>Split ${v.money(total/100)} between what is planned, savings, and one sale-grab allowance. Planned comes first; the grab jar is capped so a deal cannot eat the plan.</p>`,
      totalDollars: Math.round(total/100),
      buckets:[{id:'planned',label:'Planned buys'},{id:'savings',label:'Savings'},{id:'sale',label:'Sale-grab jar'}],
      targets:{planned:Math.round(planned/100), savings:Math.round(savings/100), sale:Math.round(saleGrab/100)},
      cue:`Try: most to Planned, a slice to Savings, and only about 10% to the sale-grab jar. The three numbers must add to ${v.money(total/100)}.`,
      hint:'Planned first, savings next, sale-grab jar small and capped.',
      good:`Planned gets ${v.money(planned/100)}, savings keeps ${v.money(savings/100)}, and the sale-grab jar is capped at ${v.money(saleGrab/100)} — deals cannot eat the plan.`,
      bad:`Put the biggest slice on Planned, the next on Savings, and only a small cap on the sale-grab jar. Targets must sum to ${v.money(total/100)}.`,
      why:'A capped sale-grab jar lets deals happen inside the plan instead of replacing it.'};
  }},
{ id:'sales-decisions-build-02', verb:'build', part:3, tier:'guided', skill:'sales-decisions',
  gen:(v)=>{
    const total=v.pick([8000,10000,12000]);
    const needs=Math.round(total*0.7/100)*100;
    const wants=Math.round(total*0.2/100)*100;
    const flex=total-needs-wants;
    return {
      h:'Build it: split the clothing budget',
      body:`<p>Split ${v.money(total/100)} for clothes this season: replacements you need, wants, and a small flex jar for surprise sale finds.</p>`,
      totalDollars: Math.round(total/100),
      buckets:[{id:'needs',label:'Replacements'},{id:'wants',label:'Wants'},{id:'flex',label:'Sale flex jar'}],
      targets:{needs:Math.round(needs/100), wants:Math.round(wants/100), flex:Math.round(flex/100)},
      cue:`Replacements (the certain needs) get the biggest slice; the flex jar stays small. Sum must be ${v.money(total/100)}.`,
      hint:'Certain needs first, flex jar last and small.',
      good:`${v.money(needs/100)} for replacements, ${v.money(wants/100)} for wants, ${v.money(flex/100)} capped for surprise finds.`,
      bad:`Biggest slice on Replacements, then Wants, then a small flex jar. All three must add to ${v.money(total/100)}.`,
      why:'Separating certain replacements from sale finds keeps the test visible: the flex jar is the only money allowed to chase unplanned deals.'};
  }},
{ id:'sales-decisions-build-03', verb:'build', part:3, tier:'guided', skill:'sales-decisions',
  gen:(v)=>{
    const total=v.pick([20000,25000,30000]);
    const pantry=Math.round(total*0.55/100)*100;
    const fresh=Math.round(total*0.3/100)*100;
    const bulk=total-pantry-fresh;
    return {
      h:'Build it: split the grocery stock-up',
      body:`<p>Split ${v.money(total/100)} for a grocery run: pantry staples (certain use), fresh food (expires), and a bulk-deal jar for stock-ups.</p>`,
      totalDollars: Math.round(total/100),
      buckets:[{id:'pantry',label:'Pantry staples'},{id:'fresh',label:'Fresh food'},{id:'bulk',label:'Bulk-deal jar'}],
      targets:{pantry:Math.round(pantry/100), fresh:Math.round(fresh/100), bulk:Math.round(bulk/100)},
      cue:`Staples get the most (certain use), fresh next (expiry limits it), bulk-deal jar the rest. Sum: ${v.money(total/100)}.`,
      hint:'Certain use first, expiry-limited second, bulk deals last.',
      good:`${v.money(pantry/100)} staples, ${v.money(fresh/100)} fresh, ${v.money(bulk/100)} for bulk deals — waste is fenced out by design.`,
      bad:`Pantry staples first (certain use), fresh food next (expiry), bulk-deal jar last. They must total ${v.money(total/100)}.`,
      why:'Bulk deals earn their jar only when use is certain; the split keeps perishables and stock-ups from mixing.'};
  }},
{ id:'sales-decisions-build-04', verb:'build', part:3, tier:'guided', skill:'sales-decisions',
  gen:(v)=>{
    const total=v.pick([6000,9000,12000]);
    const gift=Math.round(total*0.6/100)*100;
    const card=Math.round(total*0.25/100)*100;
    const wrap=total-gift-card;
    return {
      h:'Build it: split the gift budget',
      body:`<p>Split ${v.money(total/100)} for this month's gift promise: the gift itself, a card, and wrap/extras. The promise is the plan — sale prices just shrink it.</p>`,
      totalDollars: Math.round(total/100),
      buckets:[{id:'gift',label:'The gift'},{id:'card',label:'Card'},{id:'wrap',label:'Wrap & extras'}],
      targets:{gift:Math.round(gift/100), card:Math.round(card/100), wrap:Math.round(wrap/100)},
      cue:`The gift itself gets the biggest slice — that is the promise. Sum must be ${v.money(total/100)}.`,
      hint:'Promise first, packaging last.',
      good:`${v.money(gift/100)} for the gift, ${v.money(card/100)} for the card, ${v.money(wrap/100)} for wrap — the plan stays the plan.`,
      bad:`Gift first (biggest slice), card next, wrap last. Total: ${v.money(total/100)}.`,
      why:'A promised gift is a planned purchase; the split keeps the sale from upgrading the promise into a bigger spend.'};
  }},
{ id:'sales-decisions-build-05', verb:'build', part:3, tier:'guided', skill:'sales-decisions',
  gen:(v)=>{
    const total=v.pick([15000,18000,21000]);
    const planned=Math.round(total*0.65/100)*100;
    const waitlist=Math.round(total*0.2/100)*100;
    const impulse=total-planned-waitlist;
    return {
      h:'Build it: split the holiday shopping',
      body:`<p>Split ${v.money(total/100)} for holiday shopping: planned gifts, a wish-list jar (buy only on sale), and a small impulse cap.</p>`,
      totalDollars: Math.round(total/100),
      buckets:[{id:'planned',label:'Planned gifts'},{id:'waitlist',label:'Wish-list jar'},{id:'impulse',label:'Impulse cap'}],
      targets:{planned:Math.round(planned/100), waitlist:Math.round(waitlist/100), impulse:Math.round(impulse/100)},
      cue:`Planned gifts get the most; the wish-list jar holds "someday" items until a sale appears; impulse stays tiny. Sum: ${v.money(total/100)}.`,
      hint:'Plan first, wish-list second (sale-only), impulse capped.',
      good:`${v.money(planned/100)} planned, ${v.money(waitlist/100)} wish-list (sale-only), ${v.money(impulse/100)} impulse cap.`,
      bad:`Biggest slice on Planned gifts, then the wish-list jar, then a small impulse cap. Sum: ${v.money(total/100)}.`,
      why:'The wish-list jar turns "someday" into a plan — sales against it become real savings, and impulse spending stays fenced.'};
  }},
/* ---- explain x5 (part 3, guided with cue) ---- */
{ id:'sales-decisions-explain-01', verb:'explain', part:3, tier:'guided', skill:'sales-decisions',
  gen:(v)=>{
    return {
      h:'Teach it back: the "was I going to buy it anyway" test',
      prompt:'Explain in your own words how the "was I going to buy it anyway" test tells real savings from fake savings.',
      keyPoints:['The test asks whether the purchase was planned BEFORE the sale appeared','A discount on a planned purchase is real savings','A discount on an unplanned purchase creates spending, not savings','"Saved $X" without a plan is the line sales want you to say'],
      modelAnswer:'Real savings only happens when a discount lowers the price of something you were already going to buy. If the sale created the purchase, you did not save anything — you spent money you were not going to spend.',
      cue:'Start with the one question, then say what each answer means.',
      hint:'One question, two answers, opposite results.'};
  }},
{ id:'sales-decisions-explain-02', verb:'explain', part:3, tier:'guided', skill:'sales-decisions',
  gen:(v)=>{
    return {
      h:'Teach it back: the two halves of a stock-up deal',
      prompt:'Explain in your own words the two things you must check before a bulk or BOGO deal counts as real savings.',
      keyPoints:['Check 1: was the item going to be bought anyway (planned)','Check 2: will ALL of it get used before it expires or goes stale','Waste rewrites the price — divide by what gets used, not what gets bought','A deal that fails either check is spending, not savings'],
      modelAnswer:'A stock-up is only savings if both halves pass: the item was already planned, and all of it will get used in time. If units expire or go unused, the true price is the total divided by what got used — usually worse than buying single.',
      cue:'Name both checks, then say what waste does to the price.',
      hint:'Planned AND used — both must pass.'};
  }},
{ id:'sales-decisions-explain-03', verb:'explain', part:3, tier:'guided', skill:'sales-decisions',
  gen:(v)=>{
    return {
      h:'Teach it back: why shipping can kill a discount',
      prompt:'Explain in your own words why a 25% online discount can still lose to the local store.',
      keyPoints:['The sticker price is not what leaves your account — shipping adds on','"Cheaper" means the all-in total, not the discounted price','Compare total vs total: discounted price + shipping vs local price','A real discount that is smaller than the shipping loses'],
      modelAnswer:'The account pays the discounted price PLUS shipping, so a 25% discount can still cost more than the local store. Always compare the all-in totals: the sticker competes with stickers, but your account competes with accounts.',
      cue:'Follow the money: what actually leaves the account in each case?',
      hint:'Sticker vs sticker is the wrong fight.'};
  }},
{ id:'sales-decisions-explain-04', verb:'explain', part:3, tier:'guided', skill:'sales-decisions',
  gen:(v)=>{
    return {
      h:'Teach it back: how "spend to save" thresholds really work',
      prompt:'Explain in your own words how to judge a "spend $X, save $Y" threshold deal.',
      keyPoints:['It is a math problem, not a trap and not a gift','Net it: coupon gained minus filler spent','Positive net = take it; negative net = skip it','The filler must be something you would use, or it is pure cost'],
      modelAnswer:'Threshold deals are math: subtract what the filler costs from what the coupon gains. If the coupon is bigger, take it; if the filler costs more, the "savings" cost you money. The rule is the net, not the banner.',
      cue:'Give the formula, then say what each result means.',
      hint:'Gained minus spent = the verdict.'};
  }},
{ id:'sales-decisions-explain-05', verb:'explain', part:3, tier:'guided', skill:'sales-decisions',
  gen:(v)=>{
    return {
      h:'Teach it back: why urgency is not a reason to buy',
      prompt:'Explain in your own words why "today only" and countdown timers should not decide a purchase.',
      keyPoints:['Urgency assumes the purchase was already planned — it borrows that logic','With no plan, "losing the deal" loses nothing; buying loses real money','Urgency is the store\'s schedule, not your budget\'s','Decide with the test and the math; the timer is decoration'],
      modelAnswer:'Urgency only makes sense for a planned purchase — then a deadline can move the timing. On an unplanned buy, "today only" pressures you into spending you never planned. Decide with the plan test and the totals, and let the timer be noise.',
      cue:'Say what urgency ASSUMES, then show why that assumption fails.',
      hint:'The timer needs a plan to mean anything.'};
  }},
],
'sales-tax': [
/* ---- sort x6 (part 3, guided with cue) ---- */
{ id:'sales-tax-sort-01', verb:'sort', part:3, tier:'guided', skill:'sales-tax',
  gen:(v)=>{
    const items=v.shuffle([
      {label:'"$20 tag" means $20 out the door',a:'tag-price thinking',why:'The register adds tax on top.'},
      {label:'The register adds rate × price',a:'register thinking',why:'Total = price + tax.'},
      {label:'Compare stores by sticker price',a:'tag-price thinking',why:'Different tax rates flip the winner.'},
      {label:'Bring price + tax to the register',a:'register thinking',why:'That is what leaves the account.'},
      {label:'Tax is a percent of the price',a:'register thinking',why:'Rate × price, then add.'},
      {label:'8% tax means add $8 to any price',a:'tag-price thinking',why:'8% is 8 cents per dollar, not $8 flat.'},
      {label:'Discount first, then tax the sale price',a:'register thinking',why:'The register taxes what you actually pay.'},
      {label:'Budget to the tag and hope',a:'tag-price thinking',why:'Hope is not a budget line.'}]);
    return {
      h:'Sort it: tag-price thinking or register thinking?',
      body:'<p>Sort each statement by whether it thinks like the price tag or like the register.</p>',
      buckets:['Tag-price thinking','Register thinking'],
      cue:'Ask of each one: does it include the tax the register will add?',
      items};
  }},
{ id:'sales-tax-sort-02', verb:'sort', part:3, tier:'guided', skill:'sales-tax',
  gen:(v)=>{
    const items=v.shuffle([
      {label:'Tax = price × rate',a:'right order',why:'Tax comes from the price.'},
      {label:'Total = price + tax',a:'right order',why:'Add tax to the price.'},
      {label:'Total = price + rate (as dollars)',a:'wrong order',why:'8% is not $8.'},
      {label:'Tax the discounted price, not the list',a:'right order',why:'The register taxes what you pay.'},
      {label:'Discount the tax, not the price',a:'wrong order',why:'The store discounts the price; tax follows it.'},
      {label:'Convert % to decimal first (8% → 0.08)',a:'right order',why:'Percents need converting before multiplying.'},
      {label:'Add the percent to 100, then multiply once',a:'right order',why:'Price × 1.08 gives the total directly.'},
      {label:'Tax the list price, then apply the discount',a:'wrong order',why:'That taxes money you never spend.'}]);
    return {
      h:'Sort it: right order or wrong order?',
      body:'<p>Sort each tax step by whether it runs the register math in the right order.</p>',
      buckets:['Right order','Wrong order'],
      cue:'The register taxes what you actually pay — the discounted price, not the list.',
      items};
  }},
{ id:'sales-tax-sort-03', verb:'sort', part:3, tier:'guided', skill:'sales-tax',
  gen:(v)=>{
    const items=v.shuffle([
      {label:'"$40" on the tag at 8% tax',a:'needs tax math',why:'Register total is $43.20.'},
      {label:'Price already includes tax (labeled)',a:'no extra math',why:'Total is already shown.'},
      {label:'"$25" online + 9% tax + shipping',a:'needs tax math',why:'Tax and shipping both add on.'},
      {label:'A gift card for a fixed amount',a:'no extra math',why:'The amount is the amount.'},
      {label:'"$60" jacket, 20% off, 7% tax',a:'needs tax math',why:'Discount first, then tax.'},
      {label:'Rent payment, flat $800',a:'no extra math',why:'No sales tax on rent.'},
      {label:'"$12" lunch at a 6% tax counter',a:'needs tax math',why:'Register adds $0.72.'},
      {label:'A price that says "tax included"',a:'no extra math',why:'The math is already done.'}]);
    return {
      h:'Sort it: needs tax math or no extra math?',
      body:'<p>Sort each purchase by whether the register will add sales tax on top.</p>',
      buckets:['Needs tax math','No extra math'],
      cue:'If the price can change at the register, it needs the math.',
      items};
  }},
{ id:'sales-tax-sort-04', verb:'sort', part:3, tier:'guided', skill:'sales-tax',
  gen:(v)=>{
    const items=v.shuffle([
      {label:'$200 at 6% tax vs $200 at 9.5% tax',a:'tax decides',why:'Same tag, $7.00 different out the door.'},
      {label:'20% off at 8% tax vs 10% off at 6% tax',a:'tax decides',why:'Both discounts AND rates vote.'},
      {label:'$50 at 0% vs $50 at 0%',a:'tag decides',why:'No tax difference; tag wins.'},
      {label:'$30 at 7% vs $35 at 7%',a:'tag decides',why:'Same rate; lower tag wins.'},
      {label:'$100 at 10% vs $105 at 6%',a:'tax decides',why:'The cheaper tag loses out the door.'},
      {label:'Same item, same tax, different sticker',a:'tag decides',why:'Only the tag varies.'},
      {label:'Big discount + high tax vs small discount + low tax',a:'tax decides',why:'Run both totals; the sticker misleads.'},
      {label:'Identical out-the-door totals',a:'tag decides',why:'A tie is a tie — pick either.'}]);
    return {
      h:'Sort it: tax decides or tag decides?',
      body:'<p>Sort each comparison by whether the tax rate changes the winner.</p>',
      buckets:['Tax decides','Tag decides'],
      cue:'If the rates differ, run the register totals before trusting the tag.',
      items};
  }},
{ id:'sales-tax-sort-05', verb:'sort', part:3, tier:'guided', skill:'sales-tax',
  gen:(v)=>{
    const items=v.shuffle([
      {label:'"The $20 item costs $21.60 at 8%"',a:'counts tax',why:'$20 × 1.08 = $21.60.'},
      {label:'"The $20 item costs $20"',a:'ignores tax',why:'Forgot the register.'},
      {label:'"Budget $26.99 for the $24.99 headphones"',a:'counts tax',why:'$2.00 of tax is in the plan.'},
      {label:'"I have exactly $24.99, so I can afford it"',a:'ignores tax',why:'Short by the tax.'},
      {label:'"8% on $50 is $4, so $54 total"',a:'counts tax',why:'Rate × price, then add.'},
      {label:'"Just add $8 for 8% tax"',a:'ignores tax',why:'Percent is not dollars.'},
      {label:'"After the discount it is $40, plus tax"',a:'counts tax',why:'Tax on the sale price.'},
      {label:'"The discount covers the tax"',a:'ignores tax',why:'Discounts and tax are separate lines.'}]);
    return {
      h:'Sort it: counts tax or ignores tax?',
      body:'<p>Sort each statement by whether it accounts for the tax the register adds.</p>',
      buckets:['Counts tax','Ignores tax'],
      cue:'Listen for the register total — is the tax in it or not?',
      items};
  }},
{ id:'sales-tax-sort-06', verb:'sort', part:3, tier:'guided', skill:'sales-tax',
  gen:(v)=>{
    const items=v.shuffle([
      {label:'Same shirt, 6% town vs 9% town',a:'rates change the total',why:'Same tag, different register.'},
      {label:'Same shirt, same town, two stores',a:'rates do not change it',why:'Same rate; compare tags.'},
      {label:'Buying across the county line',a:'rates change the total',why:'Rates follow the register location.'},
      {label:'Online order shipped to your address',a:'rates change the total',why:'Your address sets the rate.'},
      {label:'Two items, same store, same rate',a:'rates do not change it',why:'Same rate both ways.'},
      {label:'In-store vs curbside, same store',a:'rates do not change it',why:'Same register, same rate.'},
      {label:'Vacation state vs home state',a:'rates change the total',why:'Different states, different rates.'},
      {label:'Tax-free weekend vs normal weekend',a:'rates change the total',why:'The rate itself changes.'}]);
    return {
      h:'Sort it: does the rate change the total?',
      body:'<p>Sort each situation by whether the sales tax rate can change the out-the-door total.</p>',
      buckets:['Rates change the total','Rates do not change it'],
      cue:'Rates follow the register location — if the location changes, the rate can change.',
      items};
  }},
/* ---- choice x8 (part 3: 01-05 guided, part 4: 06-08 independent) ---- */
{ id:'sales-tax-choice-01', verb:'choice', part:3, tier:'guided', skill:'sales-tax',
  gen:(v)=>{
    const price=Math.round(v.cents(9,55)*100)/100;
    const rate=v.pick([6,7,7.25,8,8.5,9,9.5,10]);
    const taxC=Math.round(price*rate);
    const totalC=Math.round(price*100)+taxC;
    return {
      q:`${v.person()} buys an item tagged ${v.money(price)} at ${v.place()}. The sales tax rate there is ${rate}%. What is the register total?`,
      choices:[
        {label:v.money(totalC/100),ok:true},
        {label:v.money(price),ok:false,mis:'forgot-tax'},
        {label:v.money(price+rate),ok:false,mis:'tax-added-as-dollars'},
        {label:v.money((Math.round(price*100)+Math.round(price*(rate+2)))/100),ok:false}],
      cue:`Turn ${rate}% into a decimal (${rate/100}), multiply by the price to get the tax, then add the tax to the price.`,
      hint:'Tax = rate × price. Total = price + tax.',
      good:`Right: ${v.money(price)} × ${rate/100} = ${v.money(taxC/100)} of tax, so ${v.money(totalC/100)} out the door.`,
      bad:`Two steps: tax = ${v.money(price)} × ${rate/100} = ${v.money(taxC/100)}. Total = ${v.money(price)} + ${v.money(taxC/100)} = ${v.money(totalC/100)}.`,
      why:`The tag is not the total. ${rate}% of ${v.money(price)} is ${v.money(taxC/100)}, and the register charges ${v.money(totalC/100)}.`};
  }},
{ id:'sales-tax-choice-02', verb:'choice', part:3, tier:'guided', skill:'sales-tax',
  gen:(v)=>{
    const person=v.person();
    const price=Math.round(v.cents(15,45)*100)/100;
    const rate=v.pick([6,7,8,9]);
    const taxC=Math.round(price*rate);
    const totalC=Math.round(price*100)+taxC;
    const cash=Math.round(v.cents(totalC/100-2,totalC/100+6)*100)/100;
    const enough=cash*100>=totalC;
    return {
      q:`${person} has ${v.money(cash)} and wants an item tagged ${v.money(price)} at ${rate}% tax. Can ${person}'s cash cover the register total of ${v.money(totalC/100)}?`,
      choices:[
        enough?{label:`Yes — ${v.money(totalC/100)} fits inside ${v.money(cash)}`,ok:true}:{label:`No — ${v.money(totalC/100)} is more than ${v.money(cash)}`,ok:true},
        enough?{label:`No — the tag is ${v.money(price)}, so ${v.money(cash)} is short`,ok:false,mis:'forgot-tax'}:{label:`Yes — the tag is only ${v.money(price)}`,ok:false,mis:'forgot-tax'},
        {label:`Just add ${rate} dollars to the tag and compare`,ok:false,mis:'tax-added-as-dollars'},
        {label:`Tax is the store's problem, not the buyer's`,ok:false,mis:'tax-absorbed'}],
      cue:`First find the register total (${v.money(price)} × 1.${rate<10?'0':''}${rate}), then compare it to ${v.money(cash)}.`,
      hint:'Register total first, then compare to cash.',
      good:enough?`Right: ${v.money(totalC/100)} ≤ ${v.money(cash)}.`:`Right: ${v.money(totalC/100)} > ${v.money(cash)} — short by ${v.money(Math.round((totalC/100-cash)*100)/100)}.`,
      bad:`Register total: ${v.money(price)} × ${(100+rate)/100} = ${v.money(totalC/100)}. Cash: ${v.money(cash)}. ${enough?'It fits.':'It is short.'}`,
      why:`The tag never decides affordability — the register total does. ${v.money(totalC/100)} vs ${v.money(cash)} is the real comparison.`};
  }},
{ id:'sales-tax-choice-03', verb:'choice', part:3, tier:'guided', skill:'sales-tax',
  gen:(v)=>{
    const price=Math.round(v.cents(20,60)*100)/100;
    const rA=v.pick([6,7]);
    const rB=v.pick([9,10]);
    const tA=Math.round(price*100)+Math.round(price*rA);
    const tB=Math.round(price*100)+Math.round(price*rB);
    return {
      q:`${v.person()} wants an item tagged ${v.money(price)}. Store A (in a ${rA}% tax town) vs Store B (in a ${rB}% tax town). Which is cheaper out the door, and by how much?`,
      choices:[
        {label:`Store A — ${v.money(tA/100)} vs ${v.money(tB/100)}, ${v.money((tB-tA)/100)} cheaper`,ok:true},
        {label:`Store B — the higher tax means the store absorbs more`,ok:false,mis:'tax-absorbed'},
        {label:`Neither — ${v.money(price)} is ${v.money(price)} wherever you buy it`,ok:false,mis:'forgot-tax'},
        {label:`Store A — ${v.money(price+rA)} vs ${v.money(price+rB)}`,ok:false,mis:'tax-added-as-dollars'}],
      cue:`Run the register math for BOTH stores: ${v.money(price)} × 1.0${rA} and ${v.money(price)} × 1.0${rB>9?'':'9'}.`,
      hint:'Same tag, different registers.',
      good:`Right: ${v.money(tA/100)} vs ${v.money(tB/100)} — Store A wins by ${v.money((tB-tA)/100)}.`,
      bad:`Store A: ${v.money(price)} × ${(100+rA)/100} = ${v.money(tA/100)}. Store B: ${v.money(price)} × ${(100+rB)/100} = ${v.money(tB/100)}. Difference: ${v.money((tB-tA)/100)}.`,
      why:`Same item, different tax, different register total. "Cheaper" means out the door — ${v.money((tB-tA)/100)} cheaper at the ${rA}% store.`};
  }},
{ id:'sales-tax-choice-04', verb:'choice', part:3, tier:'guided', skill:'sales-tax',
  gen:(v)=>{
    const price=Math.round(v.cents(30,70)*100)/100;
    const rate=v.pick([7,8,9]);
    const taxC=Math.round(price*rate);
    const totalC=Math.round(price*100)+taxC;
    const paid=Math.round(v.cents(totalC/100,totalC/100+20)*100)/100;
    const change=Math.round((paid-totalC/100)*100)/100;
    return {
      q:`${v.person()} pays ${v.money(paid)} cash for an item tagged ${v.money(price)} at ${rate}% tax. What change comes back?`,
      choices:[
        {label:v.money(change),ok:true},
        {label:v.money(Math.round((paid-price)*100)/100),ok:false,mis:'forgot-tax'},
        {label:v.money(Math.round((paid-price-rate)*100)/100),ok:false,mis:'tax-added-as-dollars'},
        {label:v.money(Math.round((paid-(price*rate))*100)/100),ok:false}],
      cue:`Register total first (${v.money(price)} × ${(100+rate)/100}), then subtract from ${v.money(paid)}.`,
      hint:'Total first, then change.',
      good:`Right: ${v.money(paid)} − ${v.money(totalC/100)} = ${v.money(change)}.`,
      bad:`Total = ${v.money(price)} + ${v.money(taxC/100)} tax = ${v.money(totalC/100)}. Change = ${v.money(paid)} − ${v.money(totalC/100)} = ${v.money(change)}.`,
      why:`Change comes from the register total, not the tag. ${v.money(paid)} − ${v.money(totalC/100)} = ${v.money(change)}.`};
  }},
{ id:'sales-tax-choice-05', verb:'choice', part:3, tier:'guided', skill:'sales-tax',
  gen:(v)=>{
    const p1=Math.round(v.cents(12,28)*100)/100;
    const p2=Math.round(v.cents(18,40)*100)/100;
    const rate=v.pick([6,7,8]);
    const totalC=Math.round(p1*100)+Math.round(p2*100)+Math.round((p1+p2)*rate);
    return {
      q:`${v.person()} buys two items tagged ${v.money(p1)} and ${v.money(p2)} at ${rate}% tax. What is the register total?`,
      choices:[
        {label:v.money(totalC/100),ok:true},
        {label:v.money(Math.round((p1+p2)*100)/100),ok:false,mis:'forgot-tax'},
        {label:v.money(Math.round((p1+p2+rate)*100)/100),ok:false,mis:'tax-added-as-dollars'},
        {label:v.money(Math.round((p1+p2)*100)/100+rate),ok:false,mis:'tax-added-as-dollars'}],
      cue:`Add the two tags first (${v.money(p1)} + ${v.money(p2)}), then tax the sum at ${rate}%.`,
      hint:'Sum the tags, then tax the sum.',
      good:`Right: ${v.money(Math.round((p1+p2)*100)/100)} × ${(100+rate)/100} = ${v.money(totalC/100)}.`,
      bad:`Tags: ${v.money(p1)} + ${v.money(p2)} = ${v.money(Math.round((p1+p2)*100)/100)}. Tax: × ${rate/100} = ${v.money(Math.round((p1+p2)*rate)/100)}. Total: ${v.money(totalC/100)}.`,
      why:`One register total covers the whole cart: sum the tags, then apply the rate once.`};
  }},
{ id:'sales-tax-choice-06', verb:'choice', part:4, tier:'independent', skill:'sales-tax',
  gen:(v)=>{
    const person=v.person();
    const item=v.pick(['a jacket','a backpack','headphones','sneakers','a desk lamp']);
    const price=Math.round(v.cents(28,75)*100)/100;
    const off=v.pick([15,20,25]);
    const rate=v.pick([6,7,8,9]);
    const pC=Math.round(price*100);
    const discC=Math.round(pC*(100-off)/100);
    const taxC=Math.round(discC*rate/100);
    const okC=discC+taxC;
    const taxFullC=Math.round(pC*rate/100);
    const wrongOrderC=pC+taxFullC-Math.round(pC*off/100);
    const asDollarsC=discC+rate*100;
    return {
      q:`${person} finds ${item} priced at ${v.money(price)}: ${off}% off, and the sales tax rate is ${rate}%. What is the out-the-door total?`,
      choices:[
        {label:v.money(okC/100),ok:true},
        {label:v.money(wrongOrderC/100),ok:false,mis:'discount-then-tax-order'},
        {label:v.money(discC/100),ok:false,mis:'forgot-tax'},
        {label:v.money(asDollarsC/100),ok:false,mis:'tax-added-as-dollars'}],
      hint:'What does the store tax — the price before the discount, or after?',
      good:`Right: ${off}% off first (${v.money(discC/100)}), then ${rate}% tax on that: ${v.money(okC/100)}.`,
      bad:`Discount first: ${v.money(price)} × ${(100-off)/100} = ${v.money(discC/100)}. Then tax that: ${v.money(discC/100)} × ${(100+rate)/100} = ${v.money(okC/100)}.`,
      why:`The register taxes what you actually pay — the discounted price. Taxing the full price and then discounting overcharges by ${v.money((wrongOrderC-okC)/100)} here.`};
  }},
{ id:'sales-tax-choice-07', verb:'choice', part:4, tier:'independent', skill:'sales-tax',
  gen:(v)=>{
    const person=v.person();
    const item=v.pick(['shoes','a hoodie','a game','a watch','a bag']);
    const price=Math.round(v.cents(60,120)*100)/100;
    const off=v.pick([20,30]);
    const rate=v.pick([8,9,10]);
    const pC=Math.round(price*100);
    const discC=Math.round(pC*(100-off)/100);
    const taxC=Math.round(discC*rate/100);
    const okC=discC+taxC;
    const budgetC=okC+v.pick([-300,200,500,800]);
    const fits=budgetC>=okC;
    return {
      q:`${person} has ${v.money(budgetC/100)} budgeted for ${item}: ${v.money(price)} with ${off}% off and ${rate}% tax. Does the budget cover the out-the-door total of ${v.money(okC/100)}?`,
      choices:[
        fits?{label:`Yes — ${v.money(okC/100)} fits inside ${v.money(budgetC/100)}`,ok:true}:{label:`No — ${v.money(okC/100)} is over the ${v.money(budgetC/100)} budget`,ok:true},
        fits?{label:`No — ${v.money(discC/100)} after the discount already breaks it`,ok:false,mis:'forgot-tax'}:{label:`Yes — the tag is only ${v.money(price)}`,ok:false,mis:'forgot-tax'},
        {label:`Add the tax as ${rate} dollars, then decide`,ok:false,mis:'tax-added-as-dollars'},
        {label:`The discount covers the tax, so just use the tag`,ok:false,mis:'discount-then-tax-order'}],
      hint:'Out-the-door total first: discount, then tax, then compare to budget.',
      good:fits?`Right: ${v.money(okC/100)} ≤ ${v.money(budgetC/100)}.`:`Right: ${v.money(okC/100)} > ${v.money(budgetC/100)} — short by ${v.money((okC-budgetC)/100)}.`,
      bad:`${off}% off: ${v.money(price)} → ${v.money(discC/100)}. Then ${rate}% tax: → ${v.money(okC/100)}. Budget: ${v.money(budgetC/100)}.`,
      why:`Budgets meet the register total, not the tag. Discount first, tax second, compare third.`};
  }},
{ id:'sales-tax-choice-08', verb:'choice', part:4, tier:'independent', skill:'sales-tax',
  gen:(v)=>{
    const person=v.person();
    const item=v.pick(['a tablet','a bike helmet','a coffee maker','a speaker']);
    const price=Math.round(v.cents(90,160)*100)/100;
    const off=v.pick([10,15]);
    const rA=v.pick([6,7]);
    const rB=v.pick([9,10]);
    const pC=Math.round(price*100);
    const dA=Math.round(pC*(100-off)/100), tA=dA+Math.round(dA*rA/100);
    const tB=pC+Math.round(pC*rB/100);
    return {
      q:`${person} buys ${item} tagged ${v.money(price)}. Store A: ${off}% off, ${rA}% tax. Store B: no discount, ${rB}% tax. Which is cheaper out the door?`,
      choices:[
        tA<tB?{label:`Store A — ${v.money(tA/100)} vs ${v.money(tB/100)}`,ok:true}:{label:`Store B — ${v.money(tB/100)} vs ${v.money(tA/100)}`,ok:true},
        tA<tB?{label:`Store B — no discount means no tricks`,ok:false}:{label:`Store A — the discount always wins`,ok:false,mis:'discount-then-tax-order'},
        {label:`They tie — the tax cancels the discount`,ok:false},
        {label:`Store B — the higher tax means the store pays it`,ok:false,mis:'tax-absorbed'}],
      hint:'Run the full register math on both stores.',
      good:tA<tB?`Right: ${v.money(tA/100)} < ${v.money(tB/100)}.`:`Right: ${v.money(tB/100)} < ${v.money(tA/100)}.`,
      bad:`Store A: ${v.money(price)} × ${(100-off)/100} × ${(100+rA)/100} = ${v.money(tA/100)}. Store B: ${v.money(price)} × ${(100+rB)/100} = ${v.money(tB/100)}.`,
      why:`Discounts and taxes both vote. Only the out-the-door totals tell you the winner.`};
  }},
/* ---- decide x8 (part 3: 01-02 guided, part 4: 03-08 independent) ---- */
{ id:'sales-tax-decide-01', verb:'decide', part:3, tier:'guided', skill:'sales-tax',
  gen:(v)=>{
    const person=v.person(), store=v.place();
    const cash=Math.round(v.cents(45,75)*100)/100;
    const price=Math.round(v.cents(38,60)*100)/100;
    const rate=v.pick([7,8,9]);
    const totalC=Math.round(price*100)+Math.round(price*rate);
    const fits=cash*100>=totalC;
    return {
      q:`${person} has ${v.money(cash)} until Friday and needs an item tagged ${v.money(price)} at ${store} (${rate}% tax). Buy it now or wait?`,
      choices:[
        fits?{label:`Buy now — the register total ${v.money(totalC/100)} fits inside ${v.money(cash)}`,ok:true}:{label:`Wait — the register total ${v.money(totalC/100)} breaks the ${v.money(cash)}`,ok:true},
        fits?{label:`Wait — the tag is ${v.money(price)}, too close to call`,ok:false,mis:'forgot-tax'}:{label:`Buy now — the tag is only ${v.money(price)}`,ok:false,mis:'forgot-tax'},
        {label:`Buy now — the tax is the store's problem`,ok:false,mis:'tax-absorbed'},
        {label:`Just add ${rate} dollars to the tag to decide`,ok:false,mis:'tax-added-as-dollars'}],
      cue:`Step 1: register total = ${v.money(price)} × ${(100+rate)/100}. Step 2: compare it to ${v.money(cash)}.`,
      hint:'The tag does not decide affordability.',
      good:fits?`Right: ${v.money(totalC/100)} ≤ ${v.money(cash)} — the register math says go.`:`Right: ${v.money(totalC/100)} > ${v.money(cash)} — waiting protects the rest of the week.`,
      bad:`Register total: ${v.money(totalC/100)}. Cash: ${v.money(cash)}. ${fits?'It fits — buy it.':'It breaks the cash — wait.'}`,
      why:fits?`Affordability is register total vs cash on hand: ${v.money(totalC/100)} fits.`:`The tag said "affordable"; the register said ${v.money(totalC/100)} — over the ${v.money(cash)}. The register wins.`};
  }},
{ id:'sales-tax-decide-02', verb:'decide', part:3, tier:'guided', skill:'sales-tax',
  gen:(v)=>{
    const person=v.person();
    const price=Math.round(v.cents(50,90)*100)/100;
    const off=v.pick([15,20]);
    const rate=v.pick([8,9]);
    const pC=Math.round(price*100);
    const discC=Math.round(pC*(100-off)/100);
    const okC=discC+Math.round(discC*rate/100);
    const budget=Math.round(v.cents(okC/100-3,okC/100+5)*100)/100;
    const fits=budget*100>=okC;
    return {
      q:`${person} budgeted ${v.money(budget)} for a planned item: ${v.money(price)}, ${off}% off, ${rate}% tax. The out-the-door total is ${v.money(okC/100)}. Go or adjust?`,
      choices:[
        fits?{label:`Go — ${v.money(okC/100)} fits the ${v.money(budget)} budget`,ok:true}:{label:`Adjust — ${v.money(okC/100)} breaks the ${v.money(budget)} budget by ${v.money(Math.round((okC/100-budget)*100)/100)}`,ok:true},
        fits?{label:`Adjust — the discount was not big enough`,ok:false}:{label:`Go — the tag ${v.money(price)} is under budget`,ok:false,mis:'forgot-tax'},
        {label:`The tax does not count against the budget`,ok:false,mis:'forgot-tax'},
        {label:`Subtract the tax as ${rate} dollars, then decide`,ok:false,mis:'tax-added-as-dollars'}],
      cue:`The budget meets the REGISTER total: discount first, then tax, then compare.`,
      hint:'${v.money(okC/100)} vs ${v.money(budget)} — that is the whole decision.',
      good:fits?`Right: ${v.money(okC/100)} ≤ ${v.money(budget)}.`:`Right: trim ${v.money(Math.round((okC/100-budget)*100)/100)} or wait — the register does not negotiate.`,
      bad:`${off}% off: ${v.money(price)} → ${v.money(discC/100)}. ${rate}% tax: → ${v.money(okC/100)}. Budget ${v.money(budget)}: ${fits?'fits.':'short.'}`,
      why:`A budget is a promise to the register total. ${v.money(okC/100)} vs ${v.money(budget)} is the only comparison that matters.`};
  }},
{ id:'sales-tax-decide-03', verb:'decide', part:4, tier:'independent', skill:'sales-tax',
  gen:(v)=>{
    const person=v.person();
    const item=v.pick(['a jacket','sneakers','a backpack','headphones']);
    const price=Math.round(v.cents(70,130)*100)/100;
    const offA=v.pick([20,25]);
    const rA=v.pick([6,7]);
    const rB=v.pick([9,10]);
    const pC=Math.round(price*100);
    const tA=Math.round(pC*(100-offA)/100)+Math.round(Math.round(pC*(100-offA)/100)*rA/100);
    const tB=pC+Math.round(pC*rB/100);
    const aWins=tA<tB;
    return {
      q:`${person} is buying ${item} (${v.money(price)}). Store A: ${offA}% off + ${rA}% tax. Store B: full price + ${rB}% tax. Which store, and what happens to the budget?`,
      choices:[
        aWins?{label:`Store A — ${v.money(tA/100)} vs ${v.money(tB/100)}; the budget keeps ${v.money((tB-tA)/100)}`,ok:true}:{label:`Store B — ${v.money(tB/100)} vs ${v.money(tA/100)}; the budget keeps ${v.money((tA-tB)/100)}`,ok:true},
        aWins?{label:`Store B — discounts are traps`,ok:false}:{label:`Store A — the discount always wins`,ok:false,mis:'discount-then-tax-order'},
        {label:`Either — the totals are close enough to ignore`,ok:false},
        {label:`Store B — the higher tax is absorbed by the store`,ok:false,mis:'tax-absorbed'}],
      hint:'Discount first, then tax — on BOTH stores.',
      good:aWins?`Right: Store A ${v.money(tA/100)} wins by ${v.money((tB-tA)/100)}.`:`Right: Store B ${v.money(tB/100)} wins by ${v.money((tA-tB)/100)} — the "deal" loses to the tax gap.`,
      bad:`Store A: ${v.money(price)} × ${(100-offA)/100} × ${(100+rA)/100} = ${v.money(tA/100)}. Store B: ${v.money(price)} × ${(100+rB)/100} = ${v.money(tB/100)}.`,
      why:`The bigger sticker discount does not always win — the tax rates vote too. The register totals decide.`};
  }},
{ id:'sales-tax-decide-04', verb:'decide', part:4, tier:'independent', skill:'sales-tax',
  gen:(v)=>{
    const person=v.person();
    const price=Math.round(v.cents(25,50)*100)/100;
    const rate=v.pick([8,9]);
    const pC=Math.round(price*100);
    const taxC=Math.round(pC*rate/100);
    const okC=pC+taxC;
    const coupon=Math.round(v.cents(3,6)*100)/100;
    const withCoupon=Math.round((okC/100-coupon)*100)/100;
    return {
      q:`${person} is buying a planned item: ${v.money(price)} + ${rate}% tax = ${v.money(okC/100)}. A ${v.money(coupon)} coupon just appeared in the app. Use it now or save it for later?`,
      choices:[
        {label:`Use it now — the planned purchase is happening today; ${v.money(withCoupon)} beats ${v.money(okC/100)}`,ok:true},
        {label:`Save it — coupons get bigger if you wait`,ok:false,mis:'sale-timing'},
        {label:`Skip it — coupons never work with tax`,ok:false,mis:'discount-then-tax-order'},
        {label:`Use it on something unplanned instead`,ok:false,mis:'sale-not-needed'}],
      hint:'The purchase is planned and happening. When does the coupon help most?',
      good:`Right: a planned purchase today is the coupon's best job.`,
      bad:`The item is planned and being bought now. ${v.money(okC/100)} − ${v.money(coupon)} = ${v.money(withCoupon)}. Saving the coupon for an unplanned buy would flip it into spending.`,
      why:`Coupons attach to planned purchases. Using it on today's plan keeps ${v.money(coupon)}; saving it risks spending it on something never planned.`};
  }},
{ id:'sales-tax-decide-05', verb:'decide', part:4, tier:'independent', skill:'sales-tax',
  gen:(v)=>{
    const person=v.person(), store=v.place();
    const price=Math.round(v.cents(40,80)*100)/100;
    const pct=v.pick([30,40]);
    const saleP=Math.round(price*(100-pct))/100;
    const rate=v.pick([8,9]);
    const withTax=Math.round(saleP*(100+rate))/100;
    const reg=Math.round(price*(100+rate))/100;
    return {
      q:`${person} planned to buy an item this month (${v.money(price)}). At ${store} it is ${pct}% off this week: ${v.money(saleP)} + ${rate}% tax = ${v.money(withTax)} out the door. Buy now or buy later at the regular taxed price ${v.money(reg)}?`,
      choices:[
        {label:`Buy now — ${v.money(withTax)} vs ${v.money(reg)} later; the plan plus the discount wins`,ok:true},
        {label:`Buy later — the discount probably gets bigger`,ok:false,mis:'sale-timing'},
        {label:`Buy now — the tax disappears during sales`,ok:false,mis:'tax-absorbed'},
        {label:`Buy later — planned purchases should never use sales`,ok:false,mis:'sale-not-needed'}],
      hint:'Both options include tax. Compare the two register totals.',
      good:`Right: ${v.money(withTax)} < ${v.money(reg)}. Planned + discounted = buy.`,
      bad:`Now: ${v.money(saleP)} × ${(100+rate)/100} = ${v.money(withTax)}. Later: ${v.money(price)} × ${(100+rate)/100} = ${v.money(reg)}. The plan was already set — the discount just shrinks it.`,
      why:`Tax applies to both options, so it cancels out of the decision. Planned purchase + real discount = buy now.`};
  }},
{ id:'sales-tax-decide-06', verb:'decide', part:4, tier:'independent', skill:'sales-tax',
  gen:(v)=>{
    const person=v.person();
    const price=Math.round(v.cents(35,65)*100)/100;
    const rate=v.pick([7,8]);
    const okC=Math.round(price*100)+Math.round(price*rate);
    const cash=Math.round(v.cents(okC/100-4,okC/100-0.5)*100)/100;
    const item=v.pick(['a hoodie','a game','a lamp','a bag']);
    return {
      q:`${person} wants ${item} today but has only ${v.money(cash)}; the register total is ${v.money(okC/100)} (${v.money(price)} + ${rate}% tax). What is the smart call?`,
      choices:[
        {label:`Wait — ${v.money(cash)} cannot cover ${v.money(okC/100)}; buying anyway means borrowing or breaking the budget`,ok:true},
        {label:`Buy it — the tag is ${v.money(price)}, close enough to ${v.money(cash)}`,ok:false,mis:'forgot-tax'},
        {label:`Buy it — the store will waive the tax if you ask`,ok:false,mis:'tax-absorbed'},
        {label:`Buy it — subtract the tax as ${rate} dollars and it fits`,ok:false,mis:'tax-added-as-dollars'}],
      hint:'The register charges the total, not the tag.',
      good:`Right: short by ${v.money(Math.round((okC/100-cash)*100)/100)}. Waiting protects the week.`,
      bad:`Register total ${v.money(okC/100)} > cash ${v.money(cash)}. The tag ${v.money(price)} does not change what the register collects.`,
      why:`Affordability is decided at the register. ${v.money(okC/100)} vs ${v.money(cash)} says wait — the tax is not optional.`};
  }},
{ id:'sales-tax-decide-07', verb:'decide', part:4, tier:'independent', skill:'sales-tax',
  gen:(v)=>{
    const person=v.person();
    const price=Math.round(v.cents(100,180)*100)/100;
    const off=v.pick([15,20]);
    const rA=v.pick([6,7]);
    const pC=Math.round(price*100);
    const dA=Math.round(pC*(100-off)/100);
    const tA=dA+Math.round(dA*rA/100);
    const ship=Math.round(v.cents(0,0)*100)/100;
    const onlineP=Math.round(pC*(100-off-5)/100);
    const rOn=v.pick([8,9]);
    const tOn=onlineP+Math.round(onlineP*rOn/100);
    return {
      q:`${person} is buying a planned ${v.money(price)} item. Local: ${off}% off + ${rA}% tax = ${v.money(tA/100)}. Online: extra 5% off but ${rOn}% tax = ${v.money(tOn/100)}. Free shipping both ways. Which wins?`,
      choices:[
        tA<tOn?{label:`Local — ${v.money(tA/100)} vs ${v.money(tOn/100)} online`,ok:true}:{label:`Online — ${v.money(tOn/100)} vs ${v.money(tA/100)} local`,ok:true},
        tA<tOn?{label:`Online — a bigger discount always wins`,ok:false,mis:'discount-then-tax-order'}:{label:`Local — local stores always win`,ok:false},
        {label:`They tie — the tax cancels the extra discount`,ok:false},
        {label:`Online — online stores absorb the tax`,ok:false,mis:'tax-absorbed'}],
      hint:'Discount first, then tax, on BOTH. Then compare.',
      good:tA<tOn?`Right: ${v.money(tA/100)} < ${v.money(tOn/100)}.`:`Right: ${v.money(tOn/100)} < ${v.money(tA/100)}.`,
      bad:`Local: ${v.money(price)} × ${(100-off)/100} × ${(100+rA)/100} = ${v.money(tA/100)}. Online: ${v.money(price)} × ${(100-off-5)/100} × ${(100+rOn)/100} = ${v.money(tOn/100)}.`,
      why:`The extra 5% and the rate gap pull in opposite directions. Only the two register totals settle it.`};
  }},
{ id:'sales-tax-decide-08', verb:'decide', part:4, tier:'independent', skill:'sales-tax',
  gen:(v)=>{
    const person=v.person(), store=v.place();
    const budget=Math.round(v.cents(60,100)*100)/100;
    const p1=Math.round(v.cents(20,35)*100)/100;
    const p2=Math.round(v.cents(15,30)*100)/100;
    const rate=v.pick([7,8,9]);
    const totalC=Math.round(p1*100)+Math.round(p2*100)+Math.round((p1+p2)*rate);
    const fits=budget*100>=totalC;
    return {
      q:`${person} has ${v.money(budget)} for two planned items at ${store}: ${v.money(p1)} and ${v.money(p2)}, ${rate}% tax. Total: ${v.money(totalC/100)}. Both, one, or wait?`,
      choices:[
        fits?{label:`Both — ${v.money(totalC/100)} fits the ${v.money(budget)}`,ok:true}:{label:`One now, one later — ${v.money(totalC/100)} breaks the ${v.money(budget)}`,ok:true},
        fits?{label:`Just one — two items always break a budget`,ok:false}:{label:`Both — the tags add to ${v.money(Math.round((p1+p2)*100)/100)}`,ok:false,mis:'forgot-tax'},
        {label:`Both — the tax is the store's problem`,ok:false,mis:'tax-absorbed'},
        {label:`Drop the cheaper one — expensive items get taxed less`,ok:false}],
      hint:'One register total for the whole cart, then compare to the budget.',
      good:fits?`Right: ${v.money(totalC/100)} ≤ ${v.money(budget)}.`:`Right: split the trip — ${v.money(totalC/100)} > ${v.money(budget)}.`,
      bad:`Cart: ${v.money(p1)} + ${v.money(p2)} = ${v.money(Math.round((p1+p2)*100)/100)}; × ${(100+rate)/100} = ${v.money(totalC/100)}. Budget: ${v.money(budget)}.`,
      why:`The budget meets the cart's register total. ${fits?'Both fit.':'Splitting the trip keeps the budget intact.'}`};
  }},
/* ---- spot x6 (part 4) ---- */
{ id:'sales-tax-spot-01', verb:'spot', part:4, tier:'independent', skill:'sales-tax',
  gen:(v)=>{
    const person=v.person();
    const price=Math.round(v.cents(40,80)*100)/100;
    const off=v.pick([20,25]);
    const rate=v.pick([8,9]);
    const pC=Math.round(price*100);
    const discC=Math.round(pC*(100-off)/100);
    const taxC=Math.round(discC*rate/100);
    return {
      scenario:`<p>${person}\u2019s math on a ${off}% off item (${v.money(price)}, ${rate}% tax):</p><ul><li>Tax on the full price: ${v.money(price)} × ${rate/100} = ${v.money(Math.round(pC*rate/100)/100)}</li><li>Total: ${v.money(Math.round((pC+Math.round(pC*rate/100))/100)/100)} − ${off}% discount</li><li>"Discount applies to the total, so order does not matter."</li></ul>`,
      q:'What is the mistake?',
      choices:[
        {label:`The register taxes the DISCOUNTED price (${v.money(discC/100)}), not the full price — order matters`,ok:true},
        {label:`Discounts never apply to taxed totals`,ok:false},
        {label:`The math is fine — order never matters`,ok:false,mis:'discount-then-tax-order'},
        {label:`Tax should be added as ${rate} dollars, not ${rate}%`,ok:false,mis:'tax-added-as-dollars'}],
      hint:'What does the store tax — the price before the discount, or after?',
      good:`Right: tax the ${v.money(discC/100)} sale price, not ${v.money(price)}.`,
      bad:`Correct order: ${off}% off first → ${v.money(discC/100)}. Then ${rate}% tax on that → ${v.money(Math.round((discC+taxC)/100)/100)}. Taxing the full price overcharges.`,
      why:`The register taxes what you actually pay. Discount first, then tax — the order changes the total.`};
  }},
{ id:'sales-tax-spot-02', verb:'spot', part:4, tier:'independent', skill:'sales-tax',
  gen:(v)=>{
    const person=v.person();
    const price=Math.round(v.cents(25,55)*100)/100;
    const rate=v.pick([7,8]);
    return {
      scenario:`<p>${person} budgets for an item:</p><ul><li>Tag: ${v.money(price)}</li><li>Tax rate: ${rate}%</li><li>Budget line: ${v.money(price)} ("the discount will cover the tax")</li></ul>`,
      q:'What is the mistake?',
      choices:[
        {label:`There is no discount here — the register total is ${v.money(Math.round(price*(100+rate))/100)}, and the budget is short by the tax`,ok:true},
        {label:`The budget should be the tag minus the tax`,ok:false,mis:'tax-absorbed'},
        {label:`Budgets should never include tax`,ok:false,mis:'forgot-tax'},
        {label:`${rate}% tax means adding $${rate}.00, so the budget is almost right`,ok:false,mis:'tax-added-as-dollars'}],
      hint:'Discounts and tax are separate lines. Is there a discount here?',
      good:`Right: no discount exists, so nothing "covers" the tax.`,
      bad:`Register total: ${v.money(price)} × ${(100+rate)/100} = ${v.money(Math.round(price*(100+rate))/100)}. The budget ${v.money(price)} is short ${v.money(Math.round(price*rate)/100)}. "The discount covers it" invents a discount.`,
      why:`A discount can only cover tax if a discount exists. Budget the register total: ${v.money(Math.round(price*(100+rate))/100)}, not the tag.`};
  }},
{ id:'sales-tax-spot-03', verb:'spot', part:4, tier:'independent', skill:'sales-tax',
  gen:(v)=>{
    const person=v.person();
    const price=Math.round(v.cents(30,70)*100)/100;
    const rate=v.pick([8,9,10]);
    return {
      scenario:`<p>${person} computes tax as dollars:</p><ul><li>Tag: ${v.money(price)}</li><li>Rate: ${rate}%</li><li>"Tax = $${rate}.00, so total = ${v.money(Math.round((price+rate)*100)/100)}"</li></ul>`,
      q:'What is the mistake?',
      choices:[
        {label:`${rate}% is ${v.money(Math.round(price*rate)/100)} on ${v.money(price)}, not $${rate}.00 — percent is not dollars`,ok:true},
        {label:`Tax is always a flat dollar amount`,ok:false,mis:'tax-added-as-dollars'},
        {label:`The tag already includes the tax`,ok:false,mis:'tax-absorbed'},
        {label:`Sales tax does not apply to items over $20`,ok:false}],
      hint:'${rate}% of WHAT? Percent needs a base.',
      good:`Right: ${v.money(price)} × ${rate/100} = ${v.money(Math.round(price*rate)/100)}.`,
      bad:`${rate}% means ${rate} cents per dollar: ${v.money(price)} × ${rate/100} = ${v.money(Math.round(price*rate)/100)}, not $${rate}.00. Total: ${v.money(Math.round((price+price*rate/100)*100)/100)}.`,
      why:`A percent is a fraction of the price, not a dollar amount. ${rate}% of ${v.money(price)} is ${v.money(Math.round(price*rate)/100)}.`};
  }},
{ id:'sales-tax-spot-04', verb:'spot', part:4, tier:'independent', skill:'sales-tax',
  gen:(v)=>{
    const person=v.person();
    const pA=Math.round(v.cents(80,120)*100)/100;
    const rA=v.pick([6,7]);
    const pB=Math.round(v.cents(75,110)*100)/100;
    const rB=v.pick([9,10]);
    const tA=Math.round(pA*(100+rA))/100, tB=Math.round(pB*(100+rB))/100;
    const aWins=tA<tB;
    return {
      scenario:`<p>${person} compares two stores:</p><ul><li>Store A: ${v.money(pA)} tag, ${rA}% tax</li><li>Store B: ${v.money(pB)} tag, ${rB}% tax</li><li>"Store ${pB<pA?'B':'A'} has the lower tag, so it wins."</li></ul>`,
      q:'What is the mistake?',
      choices:[
        {label:aWins?`Store A wins out the door: ${v.money(tA/100)} vs ${v.money(tB/100)} — the tag misled`: `Store B wins out the door: ${v.money(tB/100)} vs ${v.money(tA/100)} — the tag misled`,ok:true},
        {label:`Lower tag always wins — tax is too small to matter`,ok:false,mis:'forgot-tax'},
        {label:`The higher-tax store absorbs the tax, so it wins`,ok:false,mis:'tax-absorbed'},
        {label:`Compare tags, then add the tax rates as dollars`,ok:false,mis:'tax-added-as-dollars'}],
      hint:'Run both register totals before trusting the tag.',
      good:aWins?`Right: ${v.money(tA/100)} < ${v.money(tB/100)}.`:`Right: ${v.money(tB/100)} < ${v.money(tA/100)}.`,
      bad:`Store A: ${v.money(pA)} × ${(100+rA)/100} = ${v.money(tA/100)}. Store B: ${v.money(pB)} × ${(100+rB)/100} = ${v.money(tB/100)}. The lower tag lost.`,
      why:`"Cheaper" means out the door. The tag-only comparison skipped the rates — and the rates flipped the winner.`};
  }},
{ id:'sales-tax-spot-05', verb:'spot', part:4, tier:'independent', skill:'sales-tax',
  gen:(v)=>{
    const person=v.person();
    const price=Math.round(v.cents(50,100)*100)/100;
    const rate=v.pick([8,9]);
    return {
      scenario:`<p>${person} at the register:</p><ul><li>Tag: ${v.money(price)}</li><li>Tax: ${rate}%</li><li>Hands the cashier ${v.money(price)} exactly: "That covers it."</li><li>Cashier: "That is ${v.money(Math.round(price*rate)/100)} short."</li></ul>`,
      q:'What went wrong?',
      choices:[
        {label:`${person} paid the tag, but the register charges ${v.money(Math.round(price*(100+rate))/100)} — the tax was never counted`,ok:true},
        {label:`The cashier is wrong — the tag is the total`,ok:false,mis:'forgot-tax'},
        {label:`${person} should have paid ${v.money(price+rate)}`,ok:false,mis:'tax-added-as-dollars'},
        {label:`Stores absorb the tax on exact payments`,ok:false,mis:'tax-absorbed'}],
      hint:'What does the register add after the tag?',
      good:`Right: tag + tax = ${v.money(Math.round(price*(100+rate))/100)}.`,
      bad:`The tag is ${v.money(price)}; the register adds ${rate}% = ${v.money(Math.round(price*rate)/100)}. Total due: ${v.money(Math.round(price*(100+rate))/100)}.`,
      why:`The tag is a quote; the register is the bill. Forgetting the tax leaves you short at the counter.`};
  }},
{ id:'sales-tax-spot-06', verb:'spot', part:4, tier:'independent', skill:'sales-tax',
  gen:(v)=>{
    const person=v.person();
    const price=Math.round(v.cents(60,110)*100)/100;
    const off=v.pick([20,25]);
    const rate=v.pick([8,9]);
    const pC=Math.round(price*100);
    const discC=Math.round(pC*(100-off)/100);
    const okC=discC+Math.round(discC*rate/100);
    const wrongC=pC+Math.round(pC*rate/100)-Math.round(pC*off/100);
    return {
      scenario:`<p>${person} combines a ${off}% coupon with ${rate}% tax on ${v.money(price)}:</p><ul><li>"Tax first: ${v.money(price)} + ${rate}% = ${v.money(Math.round((pC+Math.round(pC*rate/100))/100)/100)}"</li><li>"Then ${off}% off: ${v.money(Math.round(wrongC)/100)}"</li><li>"Order does not matter — same numbers."</li></ul>`,
      q:'What is the mistake?',
      choices:[
        {label:`Order matters: discount first (${v.money(discC/100)}), then tax → ${v.money(okC/100)}, not ${v.money(wrongC/100)}`,ok:true},
        {label:`The numbers are right — order never matters`,ok:false,mis:'discount-then-tax-order'},
        {label:`Coupons cancel tax entirely`,ok:false,mis:'tax-absorbed'},
        {label:`The tax should be $${rate}.00, not ${rate}%`,ok:false,mis:'tax-added-as-dollars'}],
      hint:'The store taxes what you PAY. Do you pay the full price?',
      good:`Right: ${v.money(discC/100)} taxed at ${rate}% = ${v.money(okC/100)}.`,
      bad:`Discount first: ${v.money(price)} × ${(100-off)/100} = ${v.money(discC/100)}. Tax that: × ${(100+rate)/100} = ${v.money(okC/100)}. The wrong order gives ${v.money(wrongC/100)} — an overcharge of ${v.money((wrongC-okC)/100)}.`,
      why:`The register taxes the discounted price. Taxing first taxes money the discount then erases — you pay tax on dollars you never spend.`};
  }},
/* ---- compare x6 (part 4) ---- */
{ id:'sales-tax-compare-01', verb:'compare', part:4, tier:'independent', skill:'sales-tax',
  gen:(v)=>{
    const person=v.person();
    const item=v.pick(['a jacket','a backpack','headphones','sneakers']);
    const price=Math.round(v.cents(28,75)*100)/100;
    const off=v.pick([15,20,25]);
    const rate=v.pick([6,7,8,9]);
    const pC=Math.round(price*100);
    const discC=Math.round(pC*(100-off)/100);
    const okC=discC+Math.round(discC*rate/100);
    const taxFullC=Math.round(pC*rate/100);
    const wrongOrderC=pC+taxFullC-Math.round(pC*off/100);
    return {
      context:`<p><b>Right order:</b> ${off}% off ${v.money(price)} = ${v.money(discC/100)}, then ${rate}% tax = ${v.money(okC/100)}.</p><p><b>Wrong order:</b> ${rate}% tax on ${v.money(price)} = ${v.money(Math.round((pC+taxFullC)/100)/100)}, then ${off}% off = ${v.money(wrongOrderC/100)}.</p>`,
      q:`${person} buys ${item}. Which total is the register really going to charge?`,
      choices:[
        {label:`${v.money(okC/100)} — the register taxes the discounted price`,ok:true},
        {label:`${v.money(wrongOrderC/100)} — order does not matter`,ok:false,mis:'discount-then-tax-order'},
        {label:`${v.money(discC/100)} — the discount cancels the tax`,ok:false,mis:'forgot-tax'},
        {label:`${v.money(price)} — sales erase the tax`,ok:false,mis:'tax-absorbed'}],
      hint:'The store taxes what you actually pay.',
      good:`Right: ${v.money(okC/100)}.`,
      bad:`The register runs discount first: ${v.money(discC/100)}, then tax: ${v.money(okC/100)}. The wrong order overcharges by ${v.money((wrongOrderC-okC)/100)}.`,
      why:`Tax applies to the money changing hands — the discounted price. The right order is the only order the register uses.`};
  }},
{ id:'sales-tax-compare-02', verb:'compare', part:4, tier:'independent', skill:'sales-tax',
  gen:(v)=>{
    const person=v.person();
    const item=v.pick(['a tablet','a bike','a console','a monitor']);
    const price=Math.round(v.cents(150,250)*100)/100;
    const d=v.pick([15,20]);
    const e=v.pick([10,25]);
    const rA=v.pick([7,8]);
    const rB=v.pick([9,10]);
    const pC=Math.round(price*100);
    const tAC=Math.round(pC*(100-d)*(100+rA)/10000);
    const tBC=Math.round(pC*(100-e)*(100+rB)/10000);
    const aWins=tAC<tBC;
    const diffC=Math.abs(tAC-tBC);
    return {
      context:`<p><b>Store A:</b> ${v.money(price)} − ${d}% = ${v.money(Math.round(pC*(100-d)/100)/100)}, then ${rA}% tax = ${v.money(tAC/100)}.</p><p><b>Store B:</b> ${v.money(price)} − ${e}% = ${v.money(Math.round(pC*(100-e)/100)/100)}, then ${rB}% tax = ${v.money(tBC/100)}.</p>`,
      q:`${person} is buying ${item}. Which store is cheaper out the door, and by about how much?`,
      choices:[
        aWins?{label:`Store A — ${v.money(tAC/100)} vs ${v.money(tBC/100)}, about ${v.money(diffC/100)} cheaper`,ok:true}:{label:`Store B — ${v.money(tBC/100)} vs ${v.money(tAC/100)}, about ${v.money(diffC/100)} cheaper`,ok:true},
        {label:`The bigger sticker discount always wins — no math needed`,ok:false,mis:'discount-then-tax-order'},
        {label:`They tie — tax cancels every discount`,ok:false},
        {label:`The lower-tax store absorbs the tax, so it loses`,ok:false,mis:'tax-absorbed'}],
      hint:'Both totals are computed. Just compare them.',
      good:aWins?`Right: Store A by ${v.money(diffC/100)}.`:`Right: Store B by ${v.money(diffC/100)}.`,
      bad:`Store A: ${v.money(tAC/100)}. Store B: ${v.money(tBC/100)}. Difference: ${v.money(diffC/100)}.`,
      why:`Two moves, in order, on each store. The bigger sticker discount does not always win — the tax rates vote too.`};
  }},
{ id:'sales-tax-compare-03', verb:'compare', part:4, tier:'independent', skill:'sales-tax',
  gen:(v)=>{
    const person=v.person();
    const price=Math.round(v.cents(40,80)*100)/100;
    const rHome=v.pick([8,9]);
    const rAway=v.pick([5,6]);
    const tHome=Math.round(price*(100+rHome))/100;
    const tAway=Math.round(price*(100+rAway))/100;
    const gas=Math.round(v.cents(3,7)*100)/100;
    const netAway=Math.round((tAway+gas)*100)/100;
    return {
      context:`<p><b>Home store:</b> ${v.money(price)} + ${rHome}% tax = ${v.money(tHome)}, no trip.</p><p><b>Away store:</b> ${v.money(price)} + ${rAway}% tax = ${v.money(tAway)}, but the trip costs ${v.money(gas)} in gas.</p>`,
      q:`${person} planned this purchase. Which is really cheaper?`,
      choices:[
        netAway<tHome?{label:`Away store — ${v.money(tAway)} + ${v.money(gas)} trip = ${v.money(netAway)} vs ${v.money(tHome)}`,ok:true}:{label:`Home store — ${v.money(tHome)} vs ${v.money(netAway)} all-in away`,ok:true},
        {label:`Away store — the lower tax rate always wins`,ok:false,mis:'forgot-tax'},
        {label:`Home store — driving for a lower tax is always wrong`,ok:false},
        {label:`Away store — the tax difference is profit`,ok:false,mis:'tax-absorbed'}],
      hint:'Tax AND trip cost both count. Add them before comparing.',
      good:netAway<tHome?`Right: ${v.money(netAway)} < ${v.money(tHome)}.`:`Right: ${v.money(tHome)} < ${v.money(netAway)}.`,
      bad:`Home: ${v.money(tHome)}. Away all-in: ${v.money(tAway)} + ${v.money(gas)} = ${v.money(netAway)}.`,
      why:`Out-the-door means everything: tax plus the trip. The lower rate can still lose once the drive is priced in.`};
  }},
{ id:'sales-tax-compare-04', verb:'compare', part:4, tier:'independent', skill:'sales-tax',
  gen:(v)=>{
    const person=v.person();
    const price=Math.round(v.cents(60,110)*100)/100;
    const rate=v.pick([8,9]);
    const withTax=Math.round(price*(100+rate))/100;
    const coupon=Math.round(v.cents(10,20)*100)/100;
    const afterCoupon=Math.round((withTax-coupon)*100)/100;
    return {
      context:`<p><b>Plan A:</b> buy at ${v.money(price)} + ${rate}% tax = ${v.money(withTax)}.</p><p><b>Plan B:</b> use a ${v.money(coupon)} coupon on the same purchase = ${v.money(afterCoupon)}.</p>`,
      q:`${person} planned this purchase. Which plan is better?`,
      choices:[
        {label:`Plan B — ${v.money(afterCoupon)} vs ${v.money(withTax)}; the coupon shrinks the register total`,ok:true},
        {label:`Plan A — coupons never stack with tax`,ok:false,mis:'discount-then-tax-order'},
        {label:`Plan B — and the coupon also erases the tax`,ok:false,mis:'tax-absorbed'},
        {label:`Plan A — coupons are only for unplanned buys`,ok:false,mis:'sale-not-needed'}],
      hint:'A coupon on a planned purchase is real savings.',
      good:`Right: ${v.money(afterCoupon)} < ${v.money(withTax)}.`,
      bad:`Plan A: ${v.money(withTax)}. Plan B: ${v.money(withTax)} − ${v.money(coupon)} = ${v.money(afterCoupon)}.`,
      why:`The coupon lowers the register total on a planned purchase — that is the exact shape of real savings.`};
  }},
{ id:'sales-tax-compare-05', verb:'compare', part:4, tier:'independent', skill:'sales-tax',
  gen:(v)=>{
    const person=v.person();
    const p1=Math.round(v.cents(20,40)*100)/100;
    const p2=Math.round(v.cents(20,40)*100)/100;
    const rate=v.pick([7,8]);
    const together=Math.round((p1+p2)*(100+rate))/100;
    const separate=Math.round(p1*(100+rate))/100+Math.round(p2*(100+rate))/100;
    return {
      context:`<p><b>Together:</b> ${v.money(p1)} + ${v.money(p2)} = ${v.money(Math.round((p1+p2)*100)/100)}, then ${rate}% tax = ${v.money(together)}.</p><p><b>Separate trips:</b> ${v.money(Math.round(p1*(100+rate))/100)} + ${v.money(Math.round(p2*(100+rate))/100)} = ${v.money(Math.round(separate*100)/100)}.</p>`,
      q:'Does buying together or separately change the tax?',
      choices:[
        {label:`No real difference — tax applies per item either way; the totals match within rounding`,ok:true},
        {label:`Together is cheaper — combined carts get taxed less`,ok:false,mis:'discount-then-tax-order'},
        {label:`Separate is cheaper — splitting avoids the tax bracket`,ok:false,mis:'tax-absorbed'},
        {label:`Together costs more — tax compounds on combined carts`,ok:false}],
      hint:'The rate applies to each dollar once, however you group them.',
      good:`Right: ${v.money(together)} ≈ ${v.money(Math.round(separate*100)/100)}. Grouping does not change the rate.`,
      bad:`Tax is per-dollar: ${rate}% of the sum ≈ sum of ${rate}% of each. ${v.money(together)} vs ${v.money(Math.round(separate*100)/100)} — rounding only.`,
      why:`Sales tax is linear: it does not care how you split the cart. Only the rate and the prices matter.`};
  }},
{ id:'sales-tax-compare-06', verb:'compare', part:4, tier:'independent', skill:'sales-tax',
  gen:(v)=>{
    const person=v.person();
    const price=Math.round(v.cents(90,150)*100)/100;
    const off=v.pick([10,15,20]);
    const rNow=v.pick([9,10]);
    const pC=Math.round(price*100);
    const dNow=Math.round(pC*(100-off)/100);
    const tNow=dNow+Math.round(dNow*rNow/100);
    const tLater=pC+Math.round(pC*6/100);
    return {
      context:`<p><b>Buy now (sale county):</b> ${v.money(price)} − ${off}% = ${v.money(dNow/100)}, then ${rNow}% tax = ${v.money(tNow/100)}.</p><p><b>Buy later (home, 6% tax):</b> full ${v.money(price)} + 6% tax = ${v.money(tLater/100)}.</p>`,
      q:`${person} planned this purchase. Better to buy now on sale in the high-tax county, or later at full price at home?`,
      choices:[
        tNow<tLater?{label:`Buy now — ${v.money(tNow/100)} vs ${v.money(tLater/100)} later`,ok:true}:{label:`Buy later at home — ${v.money(tLater/100)} vs ${v.money(tNow/100)} on sale`,ok:true},
        {label:`Buy now — sales always beat full price`,ok:false,mis:'discount-then-tax-order'},
        {label:`Buy later — full price at home is always calmer`,ok:false},
        {label:`Buy now — the high tax is absorbed during sales`,ok:false,mis:'tax-absorbed'}],
      hint:'Discount first, then each county\'s tax. Then compare.',
      good:tNow<tLater?`Right: ${v.money(tNow/100)} < ${v.money(tLater/100)}.`:`Right: ${v.money(tLater/100)} < ${v.money(tNow/100)}.`,
      bad:`Now: ${v.money(price)} × ${(100-off)/100} × ${(100+rNow)/100} = ${v.money(tNow/100)}. Later: ${v.money(price)} × 1.06 = ${v.money(tLater/100)}.`,
      why:`The discount and the rate gap fight each other. Run both register totals — the winner is whichever is lower, wherever it sits.`};
  }},
/* ---- predict x6 (part 4) ---- */
{ id:'sales-tax-predict-01', verb:'predict', part:4, tier:'independent', skill:'sales-tax',
  gen:(v)=>{
    const person=v.person();
    const weekly=Math.round(v.cents(60,100)*100)/100;
    const rate=v.pick([8,9]);
    const taxW=Math.round(weekly*rate)/100;
    return {
      q:`${person} budgets groceries to the tag: ${v.money(weekly)} a week, never counting the ${rate}% tax. What happens over a year?`,
      choices:[
        {label:`A leak of about ${v.money(Math.round(taxW*52*100)/100)} a year — ${v.money(Math.round(taxW*100)/100)} of untracked tax × 52 weeks`,ok:true},
        {label:`Nothing — the tax is too small to matter`,ok:false,mis:'forgot-tax'},
        {label:`The store absorbs the tax eventually`,ok:false,mis:'tax-absorbed'},
        {label:`The budget balances because tags are averages`,ok:false}],
      hint:'Weekly untracked tax × 52.',
      good:`Right: ${v.money(Math.round(taxW*100)/100)} × 52 = ${v.money(Math.round(taxW*52*100)/100)}.`,
      bad:`Weekly tax: ${v.money(weekly)} × ${rate/100} = ${v.money(Math.round(taxW*100)/100)}. × 52 = ${v.money(Math.round(taxW*52*100)/100)} a year the budget never saw.`,
      why:`Forgetting the tax weekly compounds into a yearly hole. Budget the register total or the leak is predictable.`};
  }},
{ id:'sales-tax-predict-02', verb:'predict', part:4, tier:'independent', skill:'sales-tax',
  gen:(v)=>{
    const person=v.person();
    const price=Math.round(v.cents(200,400)*100)/100;
    const rate=v.pick([8,9,10]);
    const total=Math.round(price*(100+rate))/100;
    return {
      q:`${person} saves exactly ${v.money(price)} for a big planned purchase, forgetting the ${rate}% tax. At the register the total is ${v.money(total)}. What breaks?`,
      choices:[
        {label:`The plan — ${v.money(Math.round((total-price)*100)/100)} short at the counter; the purchase waits or the budget breaks`,ok:true},
        {label:`Nothing — big purchases are tax-free`,ok:false,mis:'forgot-tax'},
        {label:`The store covers the difference on big sales`,ok:false,mis:'tax-absorbed'},
        {label:`${person} just pays the tag — the register accepts it`,ok:false,mis:'forgot-tax'}],
      hint:'Saved vs register total.',
      good:`Right: ${v.money(price)} saved, ${v.money(total)} due.`,
      bad:`Saved: ${v.money(price)}. Due: ${v.money(price)} × ${(100+rate)/100} = ${v.money(total)}. Short: ${v.money(Math.round((total-price)*100)/100)}. The goal needed the register total, not the tag.`,
      why:`Savings goals must target out-the-door totals. Saving to the tag guarantees coming up short.`};
  }},
{ id:'sales-tax-predict-03', verb:'predict', part:4, tier:'independent', skill:'sales-tax',
  gen:(v)=>{
    const person=v.person();
    const price=Math.round(v.cents(80,140)*100)/100;
    const off=v.pick([20,25]);
    const rate=v.pick([8,9]);
    const pC=Math.round(price*100);
    const discC=Math.round(pC*(100-off)/100);
    const okC=discC+Math.round(discC*rate/100);
    return {
      q:`${person} assumes a ${off}% coupon "cancels out" the ${rate}% tax on a ${v.money(price)} planned purchase. What will the register actually charge?`,
      choices:[
        {label:`${v.money(okC/100)} — discount first, then tax; the coupon does not erase the tax`,ok:true},
        {label:`${v.money(price)} — the coupon and tax cancel exactly`,ok:false,mis:'discount-then-tax-order'},
        {label:`${v.money(discC/100)} — the coupon wipes out the tax`,ok:false,mis:'tax-absorbed'},
        {label:`${v.money(price+rate)} — add the rate as dollars`,ok:false,mis:'tax-added-as-dollars'}],
      hint:'A ${off}% discount and a ${rate}% tax are different sizes on different bases.',
      good:`Right: ${v.money(price)} → ${v.money(discC/100)} → ${v.money(okC/100)}.`,
      bad:`${off}% off: ${v.money(price)} → ${v.money(discC/100)}. ${rate}% tax on that: → ${v.money(okC/100)}. "Cancel out" only works if the percents matched AND shared a base — they do not.`,
      why:`Discounts shrink the price; tax grows the discounted price. They are separate lines, not opposites.`};
  }},
{ id:'sales-tax-predict-04', verb:'predict', part:4, tier:'independent', skill:'sales-tax',
  gen:(v)=>{
    const person=v.person(), store=v.place();
    const price=Math.round(v.cents(30,60)*100)/100;
    const rate=v.pick([8,9]);
    const total=Math.round(price*(100+rate))/100;
    return {
      q:`${person} tells a friend "just bring the tag amount" before a ${store} trip for a ${v.money(price)} item at ${rate}% tax. What happens at the register?`,
      choices:[
        {label:`The friend is ${v.money(Math.round((total-price)*100)/100)} short — the register wants ${v.money(total)}, the tag said ${v.money(price)}`,ok:true},
        {label:`It works fine — tags are totals`,ok:false,mis:'forgot-tax'},
        {label:`The cashier waives the tax for exact-tag payments`,ok:false,mis:'tax-absorbed'},
        {label:`The friend pays ${v.money(price+rate)}`,ok:false,mis:'tax-added-as-dollars'}],
      hint:'Tag + tax = due.',
      good:`Right: ${v.money(total)} due, ${v.money(price)} brought.`,
      bad:`Due: ${v.money(price)} × ${(100+rate)/100} = ${v.money(total)}. Brought: ${v.money(price)}. Short: ${v.money(Math.round((total-price)*100)/100)}.`,
      why:`"Bring the tag amount" is the classic short-at-the-register advice. The register always adds the tax.`};
  }},
{ id:'sales-tax-predict-05', verb:'predict', part:4, tier:'independent', skill:'sales-tax',
  gen:(v)=>{
    const person=v.person();
    const price=Math.round(v.cents(120,200)*100)/100;
    const rA=v.pick([6,7]);
    const rB=v.pick([9,10]);
    const save=Math.round(price*(rB-rA))/100;
    return {
      q:`${person} always drives to the ${rA}% county for big purchases instead of buying at home (${rB}%). On a ${v.money(price)} planned purchase, what is the predictable yearly effect if this happens monthly?`,
      choices:[
        {label:`About ${v.money(Math.round(save*12*100)/100)} a year kept — ${v.money(Math.round(save*100)/100)} a trip × 12`,ok:true},
        {label:`Nothing — county rates are basically the same`,ok:false,mis:'forgot-tax'},
        {label:`A loss — lower-tax counties charge hidden fees`,ok:false},
        {label:`About ${v.money(rB-rA)} a year — rates are dollars`,ok:false,mis:'tax-added-as-dollars'}],
      hint:'Per-trip savings × 12.',
      good:`Right: ${v.money(Math.round(save*100)/100)} × 12 = ${v.money(Math.round(save*12*100)/100)}.`,
      bad:`Per trip: ${v.money(price)} × ${(rB-rA)/100} = ${v.money(Math.round(save*100)/100)}. × 12 = ${v.money(Math.round(save*12*100)/100)} a year — as long as the trip itself stays free.`,
      why:`Rate gaps compound monthly. A ${(rB-rA)}-point gap on ${v.money(price)} is ${v.money(Math.round(save*100)/100)} a trip — predictable savings, if the drive costs nothing extra.`};
  }},
{ id:'sales-tax-predict-06', verb:'predict', part:4, tier:'independent', skill:'sales-tax',
  gen:(v)=>{
    const person=v.person();
    const price=Math.round(v.cents(45,85)*100)/100;
    const off=v.pick([15,20]);
    const rate=v.pick([8,9]);
    const pC=Math.round(price*100);
    const discC=Math.round(pC*(100-off)/100);
    const okC=discC+Math.round(discC*rate/100);
    const wrongC=pC+Math.round(pC*rate/100)-Math.round(pC*off/100);
    return {
      q:`${person} keeps doing tax math in the wrong order (tax the full price, then discount). On a ${v.money(price)} item with ${off}% off and ${rate}% tax, what does this habit cost per purchase?`,
      choices:[
        {label:`${v.money((wrongC-okC)/100)} per purchase — ${v.money(wrongC/100)} wrong vs ${v.money(okC/100)} right`,ok:true},
        {label:`Nothing — the order never changes the total`,ok:false,mis:'discount-then-tax-order'},
        {label:`${v.money(rate)} per purchase — the tax itself`,ok:false,mis:'tax-added-as-dollars'},
        {label:`It saves money — taxing first is a loophole`,ok:false}],
      hint:'Wrong total minus right total.',
      good:`Right: ${v.money(wrongC/100)} − ${v.money(okC/100)} = ${v.money((wrongC-okC)/100)}.`,
      bad:`Right order: ${v.money(okC/100)}. Wrong order: ${v.money(wrongC/100)}. The habit overpays ${v.money((wrongC-okC)/100)} every time — it budgets too much, not too little.`,
      why:`Wrong-order math overstates the total. It does not cause overspending at the register — the register is right — but it warps every budget and comparison built on it.`};
  }},
/* ---- build x5 (part 4; targets in cents, must sum to totalCents) ---- */
{ id:'sales-tax-build-01', verb:'build', part:4, tier:'independent', skill:'sales-tax',
  gen:(v)=>{
    const total=v.pick([5400,8100,10800]);
    const rate=v.pick([8,9]);
    const price=Math.round(total*100/(100+rate)/100)*100;
    const tax=total-price;
    return {
      h:'Build it: split the register total',
      body:`<p>Split a ${v.money(total/100)} register total at ${rate}% tax: how much is the tag price, and how much is the tax? The two must add to ${v.money(total/100)}.</p>`,
      totalDollars: Math.round(total/100),
      buckets:[{id:'price',label:'Tag price'},{id:'tax',label:'Sales tax'}],
      targets:{price:Math.round(price/100), tax:Math.round(tax/100)},
      hint:`Tag = total ÷ 1.${rate<10?'0':''}${rate}, rounded to the cent. Tax is the rest.`,
      good:`Tag ${v.money(price/100)} + tax ${v.money(tax/100)} = ${v.money(total/100)}.`,
      bad:`Work backwards: ${v.money(total/100)} ÷ ${(100+rate)/100} ≈ ${v.money(price/100)} tag; the rest (${v.money(tax/100)}) is tax.`,
      why:'Every register total is two numbers: what the store keeps and what the tax takes. Splitting them makes the tax visible.'};
  }},
{ id:'sales-tax-build-02', verb:'build', part:4, tier:'independent', skill:'sales-tax',
  gen:(v)=>{
    const total=v.pick([12000,15000,18000]);
    const item=Math.round(total*0.7/100)*100;
    const ship=Math.round(total*0.1/100)*100;
    const tax=total-item-ship;
    return {
      h:'Build it: split the out-the-door budget',
      body:`<p>Split ${v.money(total/100)} for an online order: the item price, the shipping, and the tax reserve. All three must add to ${v.money(total/100)}.</p>`,
      totalDollars: Math.round(total/100),
      buckets:[{id:'item',label:'Item price'},{id:'ship',label:'Shipping'},{id:'tax',label:'Tax reserve'}],
      targets:{item:Math.round(item/100), ship:Math.round(ship/100), tax:Math.round(tax/100)},
      hint:'Item first, shipping next, tax reserve last. Sum: the full budget.',
      good:`Item ${v.money(item/100)}, shipping ${v.money(ship/100)}, tax reserve ${v.money(tax/100)} — nothing forgotten.`,
      bad:`Allocate the item, then shipping, then whatever is left to the tax reserve. They must total ${v.money(total/100)}.`,
      why:'Online "deals" hide two add-ons: shipping and tax. Budgeting all three keeps the total honest.'};
  }},
{ id:'sales-tax-build-03', verb:'build', part:4, tier:'independent', skill:'sales-tax',
  gen:(v)=>{
    const total=v.pick([20000,25000,30000]);
    const cart=Math.round(total*0.8/100)*100;
    const tax=Math.round(total*0.07/100)*100;
    const cushion=total-cart-tax;
    return {
      h:'Build it: split the shopping trip',
      body:`<p>Split ${v.money(total/100)} for a shopping trip: the cart (tag prices), the tax on the cart, and a cushion for rounding. All three must add to ${v.money(total/100)}.</p>`,
      totalDollars: Math.round(total/100),
      buckets:[{id:'cart',label:'Cart tags'},{id:'tax',label:'Tax'},{id:'cushion',label:'Cushion'}],
      targets:{cart:Math.round(cart/100), tax:Math.round(tax/100), cushion:Math.round(cushion/100)},
      hint:'Tags first, tax next, cushion absorbs the rounding.',
      good:`Cart ${v.money(cart/100)} + tax ${v.money(tax/100)} + cushion ${v.money(cushion/100)} = ${v.money(total/100)}.`,
      bad:`Put the tag total on Cart, ~7% on Tax, and the leftover on Cushion. Sum: ${v.money(total/100)}.`,
      why:'A tax line plus a cushion means the register never surprises the trip.'};
  }},
{ id:'sales-tax-build-04', verb:'build', part:4, tier:'independent', skill:'sales-tax',
  gen:(v)=>{
    const total=v.pick([9000,12000,15000]);
    const storeA=Math.round(total*0.55/100)*100;
    const storeB=total-storeA;
    return {
      h:'Build it: split the two-store run',
      body:`<p>Split ${v.money(total/100)} across two stores with different tax rates: Store A (lower tax) gets more of the list, Store B (higher tax) gets less. Both slices must add to ${v.money(total/100)}.</p>`,
      totalDollars: Math.round(total/100),
      buckets:[{id:'storea',label:'Store A (low tax)'},{id:'storeb',label:'Store B (high tax)'}],
      targets:{storea:Math.round(storeA/100), storeb:Math.round(storeB/100)},
      hint:'More list to the low-tax store, less to the high-tax store.',
      good:`${v.money(storeA/100)} at the low-tax store, ${v.money(storeB/100)} at the high-tax store.`,
      bad:`Shift the list toward the lower-tax store. The two slices must total ${v.money(total/100)}.`,
      why:'When rates differ, WHERE you buy is part of the price. The split routes spending to the cheaper register.'};
  }},
{ id:'sales-tax-build-05', verb:'build', part:4, tier:'independent', skill:'sales-tax',
  gen:(v)=>{
    const total=v.pick([24000,30000,36000]);
    const goal=Math.round(total*0.6/100)*100;
    const tax=Math.round(total*0.08/100)*100;
    const buffer=total-goal-tax;
    return {
      h:'Build it: split the big-purchase savings goal',
      body:`<p>Split ${v.money(total/100)} saved for a big planned purchase: the item's tag price, the tax on it, and a buffer. The goal must cover the register total, not just the tag.</p>`,
      totalDollars: Math.round(total/100),
      buckets:[{id:'goal',label:'Tag-price goal'},{id:'tax',label:'Tax'},{id:'buffer',label:'Buffer'}],
      targets:{goal:Math.round(goal/100), tax:Math.round(tax/100), buffer:Math.round(buffer/100)},
      hint:'Save to the register total: tag + tax + buffer.',
      good:`Tag goal ${v.money(goal/100)} + tax ${v.money(tax/100)} + buffer ${v.money(buffer/100)} = ready at the register.`,
      bad:`Tag-price goal first, then the tax line, then a buffer. Sum: ${v.money(total/100)}.`,
      why:'Saving to the tag guarantees coming up short. The goal is the register total.'};
  }},
/* ---- explain x5 (part 4) ---- */
{ id:'sales-tax-explain-01', verb:'explain', part:4, tier:'independent', skill:'sales-tax',
  gen:(v)=>{
    return {
      h:'Teach it back: why the register total is the real price',
      prompt:'Explain in your own words why the price tag is not the price you pay.',
      keyPoints:['The tag is the store\'s quote; the register adds sales tax on top','Tax = rate × price, then total = price + tax','The account loses the register total, not the tag','Budgeting to the tag guarantees coming up short'],
      modelAnswer:'The tag is only the store\'s starting number. At the register, sales tax — rate times price — gets added on top, and that total is what actually leaves your account. Anyone who budgets to the tag will always be short by the tax.',
      hint:'Tag vs register: who collects what?'};
  }},
{ id:'sales-tax-explain-02', verb:'explain', part:4, tier:'independent', skill:'sales-tax',
  gen:(v)=>{
    return {
      h:'Teach it back: why the discount comes before the tax',
      prompt:'Explain in your own words why you take the discount first and then apply the tax.',
      keyPoints:['The register taxes what you actually pay — the discounted price','Taxing the full price taxes money the discount erases','The wrong order overcharges you on every sale','Discount first, then tax, is the only order the register uses'],
      modelAnswer:'The store only taxes the money changing hands, which is the discounted price. If you tax the full price first and then discount, you pay tax on dollars you never spent. Discount first, then tax — order matters.',
      hint:'What money is actually changing hands?'};
  }},
{ id:'sales-tax-explain-03', verb:'explain', part:4, tier:'independent', skill:'sales-tax',
  gen:(v)=>{
    return {
      h:'Teach it back: how tax rates change the winner',
      prompt:'Explain in your own words how two stores with the same item and different tax rates can have different winners.',
      keyPoints:['Same tag + different rate = different register total','"Cheaper" means out the door, not the sticker','A bigger discount can lose to a higher tax rate','Compare register totals, never tags'],
      modelAnswer:'The tax rate follows the register\'s location, so the same item rings up differently in different towns. A store with a lower tag can still lose out the door if its tax rate is higher. Only the register totals tell you the real winner.',
      hint:'Same item, two registers.'};
  }},
{ id:'sales-tax-explain-04', verb:'explain', part:4, tier:'independent', skill:'sales-tax',
  gen:(v)=>{
    return {
      h:'Teach it back: the percent-vs-dollars trap',
      prompt:'Explain in your own words why adding the tax rate as dollars (e.g., "8% = $8") is wrong.',
      keyPoints:['A percent is a fraction of the price, not a flat dollar amount','8% means 8 cents of tax per dollar — it scales with the price','On $50, 8% is $4.00, not $8.00','Always convert the percent to a decimal and multiply'],
      modelAnswer:'A percent is not dollars — it is a slice of the price. 8% means 8 cents per dollar, so it is $0.80 on $10 and $4.00 on $50. Adding "$8" treats the rate as a flat fee, which is only right by accident.',
      hint:'8% of WHAT?'};
  }},
{ id:'sales-tax-explain-05', verb:'explain', part:4, tier:'independent', skill:'sales-tax',
  gen:(v)=>{
    return {
      h:'Teach it back: budgeting for the register, not the tag',
      prompt:'Explain in your own words how to budget a shopping trip so the register never surprises you.',
      keyPoints:['List the tag prices, then add the tax line on top','The budget meets the register total, not the sum of tags','A small cushion absorbs rounding','Savings goals must target out-the-door totals too'],
      modelAnswer:'Budget the register total: add up the tags, apply the tax rate, and keep a small cushion for rounding. A budget built on tags will break at the counter; a budget built on register totals holds.',
      hint:'What does the budget shake hands with — the tag or the register?'};
  }},
],
'usable-value': [
/* ---- choice x8 (part 4: calculate unit prices) ---- */
{ id:'usable-value-choice-01', verb:'choice', part:4, tier:'independent', skill:'usable-value',
  gen:(v)=>{
    const prods=[['granola bars','bar'],['pasta packs','pack'],['coffee pods','pod'],['trash bags','bag'],['yogurt cups','cup']];
    const [name,unit]=v.pick(prods);
    const bigQ=v.pick([24,20,30]), smallQ=bigQ/2;
    const upBig=Math.round(v.cents(0.55,0.85)*100)/100;
    const upSmall=Math.round((upBig+v.cents(0.12,0.35))*100)/100;
    const person=v.person();
    return {
      q:`${name}: ${bigQ}-pack for ${v.money(Math.round(upBig*bigQ*100)/100)} (${v.money(upBig)} each) vs ${smallQ}-pack for ${v.money(Math.round(upSmall*smallQ*100)/100)} (${v.money(upSmall)} each). ${person} will use every single one. What is the ${bigQ}-pack's true unit price?`,
      choices:[
        {label:`${v.money(upBig)} per ${unit} — ${v.money(Math.round(upBig*bigQ*100)/100)} ÷ ${bigQ} used`,ok:true},
        {label:`${v.money(Math.round(upBig*bigQ*100)/100)} — the total price is the true price`,ok:false,mis:'total-not-unit'},
        {label:`${v.money(upSmall)} per ${unit} — copy the small pack's unit price`,ok:false},
        {label:`The ${smallQ}-pack's total is lower, so it wins`,ok:false,mis:'total-not-unit'}],
      hint:'Price ÷ units you will use.',
      good:`Right: ${v.money(Math.round(upBig*bigQ*100)/100)} ÷ ${bigQ} = ${v.money(upBig)} per ${unit}.`,
      bad:`All ${bigQ} get used, so divide the price by ${bigQ}: ${v.money(Math.round(upBig*bigQ*100)/100)} ÷ ${bigQ} = ${v.money(upBig)} per ${unit}.`,
      why:`When everything gets used, the tag's unit price IS the true unit price: ${v.money(upBig)} vs ${v.money(upSmall)} per ${unit}.`};
  }},
{ id:'usable-value-choice-02', verb:'choice', part:4, tier:'independent', skill:'usable-value',
  gen:(v)=>{
    const prods=[['granola bars','bar'],['pasta packs','pack'],['coffee pods','pod'],['soda cans','can']];
    const [name,unit]=v.pick(prods);
    const bigQ=v.pick([24,20]), smallQ=bigQ/2;
    const upBig=Math.round(v.cents(0.55,0.85)*100)/100;
    const upSmall=Math.round((upBig+v.cents(0.12,0.35))*100)/100;
    const bigP=Math.round(upBig*bigQ*100)/100;
    const trueBig=Math.round(bigP/smallQ*100)/100;
    const person=v.person();
    return {
      q:`${name}: ${bigQ}-pack for ${v.money(bigP)} vs ${smallQ}-pack for ${v.money(Math.round(upSmall*smallQ*100)/100)}. ${person} will use ${smallQ} before the rest expire. What is the ${bigQ}-pack's TRUE unit price?`,
      choices:[
        {label:`${v.money(trueBig)} per ${unit} — ${v.money(bigP)} ÷ ${smallQ} used`,ok:true},
        {label:`${v.money(upBig)} per ${unit} — the tag's unit price`,ok:false,mis:'unit-price-sticker'},
        {label:`${v.money(bigP)} — the total is the true price`,ok:false,mis:'total-not-unit'},
        {label:`${v.money(upSmall)} per ${unit} — same as the small pack`,ok:false}],
      hint:'Divide by USED, not bought.',
      good:`Right: ${v.money(bigP)} ÷ ${smallQ} used = ${v.money(trueBig)} per ${unit}.`,
      bad:`The tag's ${v.money(upBig)} pretends all ${bigQ} get used. Real: ${v.money(bigP)} ÷ ${smallQ} = ${v.money(trueBig)} per ${unit}.`,
      why:`Waste rewrites the price. The tag says ${v.money(upBig)}; the truth — dividing by ${smallQ} used — is ${v.money(trueBig)}.`};
  }},
{ id:'usable-value-choice-03', verb:'choice', part:4, tier:'independent', skill:'usable-value',
  gen:(v)=>{
    const items=[['Laundry detergent','load',60,40],['Dish soap','wash',50,30],['Shampoo','wash',80,48],['Body wash','wash',70,35]];
    const [name,unit,bigQ,smallQ]=v.pick(items);
    const upBig=Math.round(v.cents(0.18,0.32)*100)/100;
    const upSmall=Math.round((upBig+v.cents(0.05,0.14))*100)/100;
    const person=v.person();
    return {
      q:`${name}: ${v.money(Math.round(upBig*bigQ*100)/100)} for ${bigQ} ${unit}s vs ${v.money(Math.round(upSmall*smallQ*100)/100)} for ${smallQ} ${unit}s. ${person} will use every drop. Which is the better buy?`,
      choices:[
        {label:`The big one — ${v.money(upBig)}/${unit} beats ${v.money(upSmall)}/${unit}`,ok:true},
        {label:`The small one — the lower total is cheaper`,ok:false,mis:'total-not-unit'},
        {label:`They are the same — both clean things`,ok:false,mis:'same-category-same-value'},
        {label:`The small one — smaller is safer`,ok:false,mis:'smaller-is-safer'}],
      hint:`Divide price by ${unit}s you will use.`,
      good:`Right: ${v.money(upBig)} < ${v.money(upSmall)} per ${unit} used.`,
      bad:`${v.money(Math.round(upBig*bigQ*100)/100)} ÷ ${bigQ} = ${v.money(upBig)} vs ${v.money(Math.round(upSmall*smallQ*100)/100)} ÷ ${smallQ} = ${v.money(upSmall)}. When all of it gets used, unit price decides.`,
      why:`"Lower total" and "smaller is safer" skip the division. True unit price — price ÷ ${unit}s used — is the whole answer.`};
  }},
{ id:'usable-value-choice-04', verb:'choice', part:4, tier:'independent', skill:'usable-value',
  gen:(v)=>{
    const prods=[['juice boxes','box'],['snack packs','pack'],['yogurt cups','cup'],['fruit cups','cup']];
    const [name,unit]=v.pick(prods);
    const bigQ=v.pick([30,36]), smallQ=bigQ/2;
    const upBig=Math.round(v.cents(0.42,0.68)*100)/100;
    const upSmall=Math.round((upBig+v.cents(0.10,0.28))*100)/100;
    const bigP=Math.round(upBig*bigQ*100)/100;
    const smallP=Math.round(upSmall*smallQ*100)/100;
    const eatQ=Math.round(smallQ*0.7);
    const trueBig=Math.round(bigP/eatQ*100)/100;
    const person=v.person();
    return {
      q:`${person}'s family will eat ${eatQ} ${name} before the rest expire. ${bigQ}-pack for ${v.money(bigP)} vs ${smallQ}-pack for ${v.money(smallP)}. Which wins?`,
      choices:[
        {label:`The ${smallQ}-pack — ${v.money(bigP)} ÷ ${eatQ} eaten = ${v.money(trueBig)}/${unit} vs ${v.money(upSmall)}`,ok:true},
        {label:`The ${bigQ}-pack — the sticker says ${v.money(upBig)} each`,ok:false,mis:'unit-price-sticker'},
        {label:`The ${bigQ}-pack — leftovers can be given away`,ok:false,mis:'others-use'},
        {label:`They tie — both cover the ${eatQ} needed`,ok:false,mis:'exact-quantity-tie'}],
      hint:'Divide by eaten, not bought.',
      good:`Right: ${v.money(trueBig)} per ${unit} eaten vs ${v.money(upSmall)}.`,
      bad:`True unit price uses what gets used: ${v.money(bigP)} ÷ ${eatQ} = ${v.money(trueBig)} each. The small pack at ${v.money(upSmall)} wins.`,
      why:`The sticker's ${v.money(upBig)} assumes all ${bigQ} get eaten. Waste rewrites it to ${v.money(trueBig)} — the small pack wins.`};
  }},
{ id:'usable-value-choice-05', verb:'choice', part:4, tier:'independent', skill:'usable-value',
  gen:(v)=>{
    const items=[['Paper towels','roll',12,6],['Napkins','pack',8,4],['Tissues','box',10,5]];
    const [name,unit,bigQ,smallQ]=v.pick(items);
    const upBig=Math.round(v.cents(0.90,1.40)*100)/100;
    const upSmall=Math.round((upBig+v.cents(0.20,0.50))*100)/100;
    const bigP=Math.round(upBig*bigQ*100)/100;
    const smallP=Math.round(upSmall*smallQ*100)/100;
    const person=v.person();
    return {
      q:`${name}: ${bigQ} for ${v.money(bigP)} vs ${smallQ} for ${v.money(smallP)}. ${person}'s household will use all of them within the month. Better buy?`,
      choices:[
        {label:`The ${bigQ}-pack — ${v.money(upBig)} per ${unit} beats ${v.money(upSmall)}`,ok:true},
        {label:`The ${smallQ}-pack — ${v.money(smallP)} is less than ${v.money(bigP)}`,ok:false,mis:'total-not-unit'},
        {label:`The ${smallQ}-pack — buying less is always the safer value`,ok:false,mis:'smaller-is-safer'},
        {label:`They are equal — both are ${name.toLowerCase()}`,ok:false,mis:'same-category-same-value'}],
      hint:'All get used. Divide each price by its count.',
      good:`Right: ${v.money(bigP)} ÷ ${bigQ} = ${v.money(upBig)} < ${v.money(upSmall)}.`,
      bad:`${v.money(bigP)} ÷ ${bigQ} = ${v.money(upBig)} per ${unit} vs ${v.money(smallP)} ÷ ${smallQ} = ${v.money(upSmall)}. Big pack wins.`,
      why:`Certain use makes the tag's unit price true. ${v.money(upBig)} vs ${v.money(upSmall)} — the big pack is cheaper per use.`};
  }},
{ id:'usable-value-choice-06', verb:'choice', part:4, tier:'independent', skill:'usable-value',
  gen:(v)=>{
    const prods=[['milk','gallon'],['eggs','dozen'],['bread','loaf'],['bananas','bunch']];
    const [name,unit]=v.pick(prods);
    const bulkQ=v.pick([4,6]);
    const bulkP=Math.round(v.cents(3,5)*bulkQ*100)/100;
    const singleP=Math.round(v.cents(3.5,6)*100)/100;
    const useQ=v.pick([2,3]);
    const trueBulk=Math.round(bulkP/useQ*100)/100;
    const person=v.person();
    return {
      q:`${name} in bulk: ${bulkQ} ${unit}s for ${v.money(bulkP)}. Singles: ${v.money(singleP)} each. ${person} will use ${useQ} before the rest spoil. What is the bulk deal's true price per ${unit} used?`,
      choices:[
        {label:`${v.money(trueBulk)} per ${unit} — ${v.money(bulkP)} ÷ ${useQ} used`,ok:true},
        {label:`${v.money(Math.round(bulkP/bulkQ*100)/100)} per ${unit} — the bulk sticker price`,ok:false,mis:'unit-price-sticker'},
        {label:`${v.money(bulkP)} — the total is what matters`,ok:false,mis:'total-not-unit'},
        {label:`${v.money(singleP)} per ${unit} — singles set the price`,ok:false}],
      hint:'Spoilage eats the extra units. Divide by used.',
      good:`Right: ${v.money(bulkP)} ÷ ${useQ} = ${v.money(trueBulk)} per ${unit} used.`,
      bad:`Only ${useQ} get used: ${v.money(bulkP)} ÷ ${useQ} = ${v.money(trueBulk)} each vs ${v.money(singleP)} single.`,
      why:`The bulk sticker divides by ${bulkQ}; reality divides by ${useQ}. Spoilage rewrites every bulk price.`};
  }},
{ id:'usable-value-choice-07', verb:'choice', part:4, tier:'independent', skill:'usable-value',
  gen:(v)=>{
    const items=[['Cereal','box',2,1],['Oatmeal','tub',2,1],['Pasta sauce','jar',3,1]];
    const [name,unit,bigQ,smallQ]=v.pick(items);
    const pBig=Math.round(v.cents(4,7)*bigQ*0.9*100)/100;
    const pSmall=Math.round(v.cents(4,7)*100)/100;
    const upBig=Math.round(pBig/bigQ*100)/100;
    const upSmall=pSmall;
    const person=v.person();
    const useAll=v.pick([true,false]);
    const used=useAll?bigQ:1;
    const trueBig=Math.round(pBig/used*100)/100;
    const smallWins=!useAll;
    return {
      q:`${name}: ${bigQ} for ${v.money(pBig)} vs ${smallQ} for ${v.money(pSmall)}. ${useAll?`${person} will finish all ${bigQ} this month.`:`${person} will finish only 1 — the rest go stale.`} Which wins?`,
      choices:[
        useAll?{label:`The ${bigQ}-pack — all get used: ${v.money(upBig)} per ${unit} vs ${v.money(upSmall)}`,ok:true}
        :{label:`The single — only 1 gets used: true cost ${v.money(trueBig)} vs ${v.money(upSmall)}`,ok:true},
        useAll?{label:`The single — the lower total always wins`,ok:false,mis:'total-not-unit'}:{label:`The ${bigQ}-pack — the sticker unit price ${v.money(upBig)} is lower`,ok:false,mis:'unit-price-sticker'},
        {label:`They tie — both are ${name.toLowerCase()}`,ok:false,mis:'same-category-same-value'},
        {label:`The ${bigQ}-pack — bigger is always better value`,ok:false,mis:'unit-price-sticker'}],
      hint:useAll?'All get used — trust the tag\'s unit price.':'Only 1 gets used — divide by 1.',
      good:useAll?`Right: ${v.money(upBig)} < ${v.money(upSmall)} per ${unit}.`:`Right: ${v.money(pBig)} ÷ 1 = ${v.money(trueBig)} vs ${v.money(upSmall)}.`,
      bad:useAll?`${v.money(pBig)} ÷ ${bigQ} = ${v.money(upBig)} per ${unit} vs ${v.money(upSmall)}. Big wins.`:`${v.money(pBig)} ÷ 1 used = ${v.money(trueBig)} — the "deal" is the most expensive option.`,
      why:useAll?`Certain use = the tag's unit price is true.`:`Stale units are not savings. Dividing by used flips the winner.`};
  }},
{ id:'usable-value-choice-08', verb:'choice', part:4, tier:'independent', skill:'usable-value',
  gen:(v)=>{
    const prods=[['cat treats','bag'],['dog food','bag'],['bird seed','bag']];
    const [name,unit]=v.pick(prods);
    const bigQ=v.pick([3,4]);
    const bigP=Math.round(v.cents(18,28)*100)/100;
    const smallP=Math.round(v.cents(8,12)*100)/100;
    const perMonth=v.pick([1,2]);
    const months=v.pick([2,3]);
    const used=Math.min(bigQ, perMonth*months);
    const trueBig=Math.round(bigP/used*100)/100;
    const upSmall=smallP;
    const smallWins=trueBig>upSmall;
    const person=v.person();
    return {
      q:`${name}: ${bigQ}-pack for ${v.money(bigP)} vs single for ${v.money(smallP)}. ${person}'s pet goes through ${perMonth} a month; the food stays fresh ${months} months. Which wins?`,
      choices:[
        smallWins?{label:`The single — only ${used} get used in time: ${v.money(trueBig)} each vs ${v.money(smallP)}`,ok:true}
        :{label:`The ${bigQ}-pack — all ${used} get used in time: ${v.money(Math.round(bigP/bigQ*100)/100)} each vs ${v.money(smallP)}`,ok:true},
        {label:`The ${bigQ}-pack — the sticker total is the best value`,ok:false,mis:'total-not-unit'},
        {label:`The single — singles are always the safe choice`,ok:false,mis:'smaller-is-safer'},
        {label:`They tie — both feed the pet`,ok:false,mis:'same-category-same-value'}],
      hint:'How many get eaten before the freshness runs out?',
      good:smallWins?`Right: ${v.money(trueBig)} > ${v.money(smallP)} per used.`:`Right: all ${bigQ} get used in ${months} months.`,
      bad:`${perMonth} a month × ${months} months = ${used} used. ${v.money(bigP)} ÷ ${used} = ${v.money(trueBig)} each vs ${v.money(smallP)}.`,
      why:`Freshness is the clock. Divide the bulk price by what gets eaten before it runs out.`};
  }},
/* ---- sort x6 (part 4) ---- */
{ id:'usable-value-sort-01', verb:'sort', part:4, tier:'independent', skill:'usable-value',
  gen:(v)=>{
    const items=v.shuffle([
      {label:'Bulk pack, all units used',a:'good bulk buy',why:'True unit price = tag unit price.'},
      {label:'Bulk pack, half expires unused',a:'bad bulk buy',why:'True price doubles.'},
      {label:'BOGO where both get used',a:'good bulk buy',why:'The free unit is real.'},
      {label:'"Family size" that spoils in a week',a:'bad bulk buy',why:'Spoilage rewrites the price.'},
      {label:'Year supply of batteries on clearance',a:'good bulk buy',why:'Never expires; steady use.'},
      {label:'Bulk milk for one person',a:'bad bulk buy',why:'Cannot drink it in time.'},
      {label:'Doubling a monthly soap at half price',a:'good bulk buy',why:'Two months of certain use.'},
      {label:'Ten phone cases for a replaced phone',a:'bad bulk buy',why:'The need is ending.'}]);
    return {
      h:'Sort it: good bulk buy or bad bulk buy?',
      body:'<p>Sort each bulk deal by whether the extra units will actually get used.</p>',
      buckets:['Good bulk buy','Bad bulk buy'],
      items};
  }},
{ id:'usable-value-sort-02', verb:'sort', part:4, tier:'independent', skill:'usable-value',
  gen:(v)=>{
    const items=v.shuffle([
      {label:'$9.00 ÷ 12 used = $0.75 each',a:'true unit price',why:'Divides by used.'},
      {label:'$9.00 ÷ 12 bought = $0.75 each',a:'sticker unit price',why:'Assumes all get used.'},
      {label:'$9.00 ÷ 6 used = $1.50 each',a:'true unit price',why:'Waste rewrites it.'},
      {label:'The shelf tag\'s per-unit number',a:'sticker unit price',why:'Ignores your waste.'},
      {label:'$12.00 ÷ 4 eaten = $3.00 each',a:'true unit price',why:'Counts only eaten.'},
      {label:'"Only 40¢ each!" on the sign',a:'sticker unit price',why:'Sign math, not your math.'},
      {label:'Total ÷ units your family finishes',a:'true unit price',why:'Use is the denominator.'},
      {label:'Total ÷ units in the package',a:'sticker unit price',why:'Package count, not use count.'}]);
    return {
      h:'Sort it: true unit price or sticker unit price?',
      body:'<p>Sort each calculation by whether it divides by what gets USED or what gets BOUGHT.</p>',
      buckets:['True unit price','Sticker unit price'],
      items};
  }},
{ id:'usable-value-sort-03', verb:'sort', part:4, tier:'independent', skill:'usable-value',
  gen:(v)=>{
    const items=v.shuffle([
      {label:'Toothpaste, never expires',a:'safe to bulk',why:'Time is on your side.'},
      {label:'Berries, spoil in days',a:'never bulk',why:'Spoilage wins.'},
      {label:'Laundry pods, steady use',a:'safe to bulk',why:'Certain, steady use.'},
      {label:'Milk for a one-person home',a:'never bulk',why:'Too much, too fast.'},
      {label:'Batteries, long shelf life',a:'safe to bulk',why:'Years of freshness.'},
      {label:'Bread for one person, 10 loaves',a:'never bulk',why:'Stale before eaten.'},
      {label:'Trash bags, used weekly',a:'safe to bulk',why:'Never expires.'},
      {label:'Avocados, ripen all at once',a:'never bulk',why:'Same-day ripening.'}]);
    return {
      h:'Sort it: safe to bulk or never bulk?',
      body:'<p>Sort each product by whether buying it in bulk is safe from waste.</p>',
      buckets:['Safe to bulk','Never bulk'],
      items};
  }},
{ id:'usable-value-sort-04', verb:'sort', part:4, tier:'independent', skill:'usable-value',
  gen:(v)=>{
    const items=v.shuffle([
      {label:'"Lower total price" as the reason',a:'bad reason',why:'Total ignores quantity.'},
      {label:'"Cheaper per unit I will use"',a:'good reason',why:'That is the definition.'},
      {label:'"Bigger pack, so better value"',a:'bad reason',why:'Size is not value.'},
      {label:'"All of it gets used before expiry"',a:'good reason',why:'Use makes the math true.'},
      {label:'"The sticker unit price is lower"',a:'bad reason',why:'Sticker assumes full use.'},
      {label:'"I divided by what we will finish"',a:'good reason',why:'True unit price.'},
      {label:'"It is the same brand, so equal"',a:'bad reason',why:'Brand is not value.'},
      {label:'"The extra units cost nothing"',a:'bad reason',why:'They cost the bulk price.'}]);
    return {
      h:'Sort it: good reason or bad reason?',
      body:'<p>Sort each reason for picking a pack by whether it proves the better value.</p>',
      buckets:['Good reason','Bad reason'],
      items};
  }},
{ id:'usable-value-sort-05', verb:'sort', part:4, tier:'independent', skill:'usable-value',
  gen:(v)=>{
    const items=v.shuffle([
      {label:'Unit price × units you will use',a:'answers the question',why:'That is the true cost.'},
      {label:'The package count on the front',a:'ignores your use',why:'Package ≠ used.'},
      {label:'Expiry date vs your usage rate',a:'answers the question',why:'Decides the denominator.'},
      {label:'The "was $X" crossed-out price',a:'ignores your use',why:'History, not value.'},
      {label:'How many go stale each month',a:'answers the question',why:'Waste is data.'},
      {label:'The brand logo size',a:'ignores your use',why:'Marketing, not math.'},
      {label:'Your family\'s actual weekly use',a:'answers the question',why:'Sets the denominator.'},
      {label:'The shelf position (eye level)',a:'ignores your use',why:'Placement, not price.'}]);
    return {
      h:'Sort it: answers the question or ignores your use?',
      body:'<p>"Which pack is the better value FOR ME?" Sort each fact by whether it helps answer that.</p>',
      buckets:['Answers the question','Ignores your use'],
      items};
  }},
{ id:'usable-value-sort-06', verb:'sort', part:4, tier:'independent', skill:'usable-value',
  gen:(v)=>{
    const items=v.shuffle([
      {label:'Pantry staples at the lowest unit price',a:'stock up',why:'Certain use, best price.'},
      {label:'Fresh berries in bulk for one',a:'buy small',why:'Spoilage beats the discount.'},
      {label:'Toilet paper, family of four',a:'stock up',why:'Steady, certain use.'},
      {label:'Seasonal candy in bulk',a:'buy small',why:'Want in bulk is bigger spending.'},
      {label:'Dish soap refill, runs out monthly',a:'stock up',why:'Certain monthly use.'},
      {label:'Gallon of milk for one person',a:'buy small',why:'Spoils first.'},
      {label:'Coffee pods, daily drinker',a:'stock up',why:'Daily certain use.'},
      {label:'Bulk salad kits for the week',a:'buy small',why:'Wilt before the week ends.'}]);
    return {
      h:'Sort it: stock up or buy small?',
      body:'<p>Sort each item by the right call: bulk up on certain use, buy small where waste waits.</p>',
      buckets:['Stock up','Buy small'],
      items};
  }},
/* ---- spot x6 (part 4) ---- */
{ id:'usable-value-spot-01', verb:'spot', part:4, tier:'independent', skill:'usable-value',
  gen:(v)=>{
    const person=v.person();
    const bigP=Math.round(v.cents(9,15)*100)/100;
    const smallP=Math.round(v.cents(5,8)*100)/100;
    return {
      scenario:`<p>${person} compares snack packs:</p><ul><li>24-pack: ${v.money(bigP)} (sticker: ${v.money(Math.round(bigP/24*100)/100)} each)</li><li>12-pack: ${v.money(smallP)} (sticker: ${v.money(Math.round(smallP/12*100)/100)} each)</li><li>Uses 12 before the rest expire</li><li>"The sticker says the 24-pack is cheaper per pack, so I buy it."</li></ul>`,
      q:'What is the mistake?',
      choices:[
        {label:`Only 12 get used — true price is ${v.money(bigP)} ÷ 12 = ${v.money(Math.round(bigP/12*100)/100)} each, worse than the 12-pack`,ok:true},
        {label:`Bulk packs are always the better value`,ok:false,mis:'unit-price-sticker'},
        {label:`The mistake is not buying two 24-packs`,ok:false,mis:'discount-doubles'},
        {label:`The 12-pack is cheaper because its total is lower`,ok:false,mis:'total-not-unit'}],
      hint:'Divide by used, not bought.',
      good:`Right: ${v.money(bigP)} ÷ 12 used = ${v.money(Math.round(bigP/12*100)/100)} each.`,
      bad:`Sticker: ${v.money(bigP)} ÷ 24 = ${v.money(Math.round(bigP/24*100)/100)} — but that pretends all 24 get eaten. Real: ${v.money(bigP)} ÷ 12 = ${v.money(Math.round(bigP/12*100)/100)} each.`,
      why:`The sticker's unit price assumes zero waste. Trusting it with waste is the mistake — always divide by what gets used.`};
  }},
{ id:'usable-value-spot-02', verb:'spot', part:4, tier:'independent', skill:'usable-value',
  gen:(v)=>{
    const person=v.person();
    const bigP=Math.round(v.cents(14,22)*100)/100;
    const smallP=Math.round(v.cents(8,13)*100)/100;
    return {
      scenario:`<p>${person} on detergent:</p><ul><li>Big: ${v.money(bigP)} total</li><li>Small: ${v.money(smallP)} total</li><li>"${v.money(smallP)} is less than ${v.money(bigP)}, so the small one is the better value."</li><li>Will use every drop of either.</li></ul>`,
      q:'What is the mistake?',
      choices:[
        {label:`"Lower total" is not "better value" — value is price per unit used, not the size of the bill`,ok:true},
        {label:`The big one is always better because it is bigger`,ok:false,mis:'unit-price-sticker'},
        {label:`Detergent value does not matter since it is a need`,ok:false,mis:'want-value-irrelevant'},
        {label:`The small one is safer, so it wins anyway`,ok:false,mis:'smaller-is-safer'}],
      hint:'Value = price ÷ units. Not the total.',
      good:`Right. Compare per-unit, not per-bill.`,
      bad:`The totals ${v.money(bigP)} vs ${v.money(smallP)} say nothing about value until divided by units used. "Lower total" just means "less stuff."`,
      why:`Total price measures how much you buy, not how good the deal is. Value needs the division.`};
  }},
{ id:'usable-value-spot-03', verb:'spot', part:4, tier:'independent', skill:'usable-value',
  gen:(v)=>{
    const person=v.person();
    const bigP=Math.round(v.cents(20,30)*100)/100;
    return {
      scenario:`<p>${person} buys a 40-pack of yogurt cups (${v.money(bigP)}) "because the unit price is amazing":</p><ul><li>Family eats 10 cups before they expire</li><li>30 cups go in the trash</li><li>"But the sticker said ${v.money(Math.round(bigP/40*100)/100)} each!"</li></ul>`,
      q:'What is the mistake?',
      choices:[
        {label:`True price is ${v.money(bigP)} ÷ 10 eaten = ${v.money(Math.round(bigP/10*100)/100)} each — the sticker assumed all 40 get eaten`,ok:true},
        {label:`Yogurt is healthy, so any price is fine`,ok:false,mis:'want-value-irrelevant'},
        {label:`The family should eat faster to match the sticker`,ok:false},
        {label:`Bulk yogurt is always the best value`,ok:false,mis:'unit-price-sticker'}],
      hint:'10 eaten. 40 bought. Which number divides the price?',
      good:`Right: ${v.money(bigP)} ÷ 10 = ${v.money(Math.round(bigP/10*100)/100)} per eaten cup.`,
      bad:`Sticker: ${v.money(bigP)} ÷ 40 = ${v.money(Math.round(bigP/40*100)/100)} each. Truth: ${v.money(bigP)} ÷ 10 eaten = ${v.money(Math.round(bigP/10*100)/100)} each. 30 cups paid for the trash.`,
      why:`The sticker's denominator is the package; yours must be your stomach. Waste is the most expensive ingredient.`};
  }},
{ id:'usable-value-spot-04', verb:'spot', part:4, tier:'independent', skill:'usable-value',
  gen:(v)=>{
    const person=v.person();
    return {
      scenario:`<p>${person} compares two cereals:</p><ul><li>Brand A: $4.50/box, 12 oz box</li><li>Brand B: $5.00/box, 18 oz box</li><li>"Brand A is cheaper — $4.50 is less than $5.00."</li></ul>`,
      q:'What is the mistake?',
      choices:[
        {label:`Per ounce, B is ${v.money(Math.round(500/18)/100)} vs A at ${v.money(Math.round(450/12)/100)} — the boxes hold different amounts`,ok:true},
        {label:`Brand A is cheaper because the box costs less`,ok:false,mis:'total-not-unit'},
        {label:`Both are cereal, so the price does not matter`,ok:false,mis:'same-category-same-value'},
        {label:`The bigger box is always better`,ok:false,mis:'unit-price-sticker'}],
      hint:'The boxes are different sizes. Price per ounce?',
      good:`Right: A = $0.375/oz, B ≈ $0.28/oz. B wins.`,
      bad:`A: $4.50 ÷ 12 oz = $0.375/oz. B: $5.00 ÷ 18 oz ≈ $0.28/oz. The "cheaper" box costs more per ounce.`,
      why:`Boxes are not units — ounces are. Comparing box prices without the sizes is comparing totals, not value.`};
  }},
{ id:'usable-value-spot-05', verb:'spot', part:4, tier:'independent', skill:'usable-value',
  gen:(v)=>{
    const person=v.person();
    const bigP=Math.round(v.cents(24,36)*100)/100;
    return {
      scenario:`<p>${person} buys bulk paper towels (${v.money(bigP)} for 24 rolls):</p><ul><li>Household uses 6 rolls a month</li><li>They never expire</li><li>Friend: "You overbought." ${person}: "No — the unit price was the lowest."</li></ul>`,
      q:'Is there actually a mistake here?',
      choices:[
        {label:`No mistake — certain use + no expiry + lowest unit price = the bulk pack wins`,ok:true},
        {label:`Yes — buying 4 months of anything is always wrong`,ok:false,mis:'smaller-is-safer'},
        {label:`Yes — the total ${v.money(bigP)} is too much at once`,ok:false,mis:'total-not-unit'},
        {label:`Yes — paper towels are a want, so value is irrelevant`,ok:false,mis:'want-value-irrelevant'}],
      hint:'Check both halves: planned AND used. Any waste? Any expiry?',
      good:`Right. 6 a month, never expires, lowest unit price — the math holds.`,
      bad:`Use: 6/month, certain. Expiry: none. Unit price: lowest. Both halves of the test pass — this is exactly when bulk wins.`,
      why:`Not every bulk buy is a trap. Certain use with no expiry is the green light — the test says take it.`};
  }},
{ id:'usable-value-spot-06', verb:'spot', part:4, tier:'independent', skill:'usable-value',
  gen:(v)=>{
    const person=v.person();
    return {
      scenario:`<p>${person} on two olive oils:</p><ul><li>Store brand: $8.00 for 17 oz</li><li>Fancy brand: $12.00 for 17 oz</li><li>"The fancy one is better value — you get what you pay for."</li></ul>`,
      q:'What is the mistake?',
      choices:[
        {label:`Price is not quality — per ounce both are priced, and "better value" needs the unit math, not the price tag's reputation`,ok:true},
        {label:`The fancy brand is better value because it costs more`,ok:false,mis:'price-means-quality'},
        {label:`Both are oil, so value is identical`,ok:false,mis:'same-category-same-value'},
        {label:`The store brand always wins on value`,ok:false}],
      hint:'Value is price ÷ units used. Where is quality in that formula?',
      good:`Right. $8.00 ÷ 17 vs $12.00 ÷ 17 — the math, not the mystique.`,
      bad:`Store: $8.00 ÷ 17 oz ≈ $0.47/oz. Fancy: $12.00 ÷ 17 oz ≈ $0.71/oz. "You get what you pay for" is a feeling, not a unit price.`,
      why:`Price-means-quality confuses the tag with the contents. Value is arithmetic: price divided by what you use.`};
  }},
/* ---- compare x6 (part 4: 01-03, part 5: 04-06) ---- */
{ id:'usable-value-compare-01', verb:'compare', part:4, tier:'independent', skill:'usable-value',
  gen:(v)=>{
    const person=v.person();
    const upBig=Math.round(v.cents(0.55,0.85)*100)/100;
    const upSmall=Math.round((upBig+v.cents(0.12,0.35))*100)/100;
    const bigQ=24, smallQ=12;
    return {
      context:`<p><b>Option A:</b> 24-pack for ${v.money(Math.round(upBig*bigQ*100)/100)} (${v.money(upBig)} each). ${person} will use all 24.</p><p><b>Option B:</b> 12-pack for ${v.money(Math.round(upSmall*smallQ*100)/100)} (${v.money(upSmall)} each). ${person} will use all 12.</p>`,
      q:'Which is the better buy?',
      choices:[
        {label:`Option A — ${v.money(upBig)} per used unit beats ${v.money(upSmall)}`,ok:true},
        {label:`Option B — ${v.money(Math.round(upSmall*smallQ*100)/100)} total is less than ${v.money(Math.round(upBig*bigQ*100)/100)}`,ok:false,mis:'total-not-unit'},
        {label:`Option B — smaller is safer`,ok:false,mis:'smaller-is-safer'},
        {label:`They tie — both get fully used`,ok:false,mis:'exact-quantity-tie'}],
      hint:'Both get fully used. Compare the unit prices.',
      good:`Right: ${v.money(upBig)} < ${v.money(upSmall)}.`,
      bad:`A: ${v.money(Math.round(upBig*bigQ*100)/100)} ÷ 24 = ${v.money(upBig)}. B: ${v.money(Math.round(upSmall*smallQ*100)/100)} ÷ 12 = ${v.money(upSmall)}. Full use both ways — A wins.`,
      why:`When everything gets used, the lower unit price wins. "Lower total" is just "less stuff."`};
  }},
{ id:'usable-value-compare-02', verb:'compare', part:4, tier:'independent', skill:'usable-value',
  gen:(v)=>{
    const person=v.person();
    const upBig=Math.round(v.cents(0.55,0.85)*100)/100;
    const upSmall=Math.round((upBig+v.cents(0.12,0.35))*100)/100;
    const bigQ=24, smallQ=12;
    const trueBig=Math.round(upBig*bigQ/smallQ*100)/100;
    return {
      context:`<p><b>Option A:</b> 24-pack for ${v.money(Math.round(upBig*bigQ*100)/100)} (sticker: ${v.money(upBig)} each). ${person} will use ${smallQ} before the rest expire.</p><p><b>Option B:</b> 12-pack for ${v.money(Math.round(upSmall*smallQ*100)/100)} (${v.money(upSmall)} each), all used.</p>`,
      q:'Which is the better buy for what will actually be used?',
      choices:[
        {label:`Option B — true cost of A is ${v.money(Math.round(upBig*bigQ*100)/100)} ÷ ${smallQ} = ${v.money(trueBig)} per used vs ${v.money(upSmall)}`,ok:true},
        {label:`Option A — the sticker says ${v.money(upBig)} each`,ok:false,mis:'unit-price-sticker'},
        {label:`Option A — the extra 12 can be given to a friend`,ok:false,mis:'others-use'},
        {label:`They tie — both deliver the ${smallQ} needed`,ok:false,mis:'exact-quantity-tie'}],
      hint:'Recompute A with 12 used, not 24 bought.',
      good:`Right: ${v.money(trueBig)} > ${v.money(upSmall)}.`,
      bad:`A true: ${v.money(Math.round(upBig*bigQ*100)/100)} ÷ ${smallQ} used = ${v.money(trueBig)} each. B: ${v.money(upSmall)}. B wins.`,
      why:`Waste flips the answer. The sticker assumed 24 used; reality is 12.`};
  }},
{ id:'usable-value-compare-03', verb:'compare', part:4, tier:'independent', skill:'usable-value',
  gen:(v)=>{
    const person=v.person();
    const ozA=v.pick([12,16]);
    const pA=Math.round(v.cents(4,6)*100)/100;
    const ozB=v.pick([20,24]);
    const pB=Math.round(v.cents(5.5,8)*100)/100;
    const uA=Math.round(pA/ozA*100)/100;
    const uB=Math.round(pB/ozB*100)/100;
    const bWins=uB<uA;
    return {
      context:`<p><b>Option A:</b> ${ozA} oz for ${v.money(pA)} (${v.money(uA)}/oz).</p><p><b>Option B:</b> ${ozB} oz for ${v.money(pB)} (${v.money(uB)}/oz).</p>`,
      q:`${person} will use it all. Which is the better value?`,
      choices:[
        bWins?{label:`Option B — ${v.money(uB)}/oz beats ${v.money(uA)}/oz`,ok:true}:{label:`Option A — ${v.money(uA)}/oz beats ${v.money(uB)}/oz`,ok:true},
        bWins?{label:`Option A — ${v.money(pA)} is less than ${v.money(pB)}`,ok:false,mis:'total-not-unit'}:{label:`Option B — bigger box, better value`,ok:false,mis:'unit-price-sticker'},
        {label:`They are the same product type, so equal`,ok:false,mis:'same-category-same-value'},
        {label:`The smaller box is safer`,ok:false,mis:'smaller-is-safer'}],
      hint:'Same units now — compare per ounce.',
      good:bWins?`Right: ${v.money(uB)} < ${v.money(uA)}.`:`Right: ${v.money(uA)} < ${v.money(uB)}.`,
      bad:`A: ${v.money(pA)} ÷ ${ozA} = ${v.money(uA)}/oz. B: ${v.money(pB)} ÷ ${ozB} = ${v.money(uB)}/oz.`,
      why:`Different sizes need a common unit. Per ounce decides — not the box price.`};
  }},
{ id:'usable-value-compare-04', verb:'compare', part:5, tier:'independent', skill:'usable-value',
  gen:(v)=>{
    const person=v.person();
    const bigQ=36, smallQ=18;
    const upBig=Math.round(v.cents(0.42,0.68)*100)/100;
    const upSmall=Math.round((upBig+v.cents(0.10,0.28))*100)/100;
    const bigP=Math.round(upBig*bigQ*100)/100;
    const smallP=Math.round(upSmall*smallQ*100)/100;
    const eatQ=v.int(14,17);
    const trueBig=Math.round(bigP/eatQ*100)/100;
    return {
      context:`<p><b>Option A:</b> ${bigQ}-pack for ${v.money(bigP)} (sticker ${v.money(upBig)} each). ${person}'s family will eat ${eatQ} before the rest expire.</p><p><b>Option B:</b> ${smallQ}-pack for ${v.money(smallP)} (${v.money(upSmall)} each), all eaten.</p>`,
      q:'Which wins for what will actually be eaten?',
      choices:[
        {label:`Option B — ${v.money(bigP)} ÷ ${eatQ} = ${v.money(trueBig)} per eaten vs ${v.money(upSmall)}`,ok:true},
        {label:`Option A — the sticker ${v.money(upBig)} is the lowest`,ok:false,mis:'unit-price-sticker'},
        {label:`Option A — leftovers might get eaten by guests`,ok:false,mis:'others-use'},
        {label:`They tie — both feed the family`,ok:false,mis:'same-category-same-value'}],
      hint:'Divide by eaten.',
      good:`Right: ${v.money(trueBig)} > ${v.money(upSmall)}.`,
      bad:`A true: ${v.money(bigP)} ÷ ${eatQ} = ${v.money(trueBig)} each. B: ${v.money(upSmall)}. B wins.`,
      why:`"Might get eaten" is not a plan. Only counted, certain use goes in the denominator.`};
  }},
{ id:'usable-value-compare-05', verb:'compare', part:5, tier:'independent', skill:'usable-value',
  gen:(v)=>{
    const person=v.person();
    const bigQ=v.pick([3,4]);
    const bigP=Math.round(v.cents(18,28)*100)/100;
    const smallP=Math.round(v.cents(8,12)*100)/100;
    const perMonth=v.pick([1,2]);
    const months=v.pick([2,3]);
    const used=Math.min(bigQ,perMonth*months);
    const trueBig=Math.round(bigP/used*100)/100;
    const stickerBig=Math.round(bigP/bigQ*100)/100;
    const smallWins=trueBig>smallP;
    return {
      context:`<p><b>Option A:</b> ${bigQ}-pack for ${v.money(bigP)} (sticker ${v.money(stickerBig)} each). Pet uses ${perMonth}/month; fresh ${months} months → ${used} used.</p><p><b>Option B:</b> single for ${v.money(smallP)}, all used.</p>`,
      q:'Which is the better buy?',
      choices:[
        smallWins?{label:`Option B — ${v.money(bigP)} ÷ ${used} used = ${v.money(trueBig)} vs ${v.money(smallP)}`,ok:true}
        :{label:`Option A — all ${used} get used: ${v.money(stickerBig)} each vs ${v.money(smallP)}`,ok:true},
        {label:`Option A — the sticker unit price is the truth`,ok:false,mis:'unit-price-sticker'},
        {label:`Option B — singles are always the safe value`,ok:false,mis:'smaller-is-safer'},
        {label:`They tie — both feed the pet`,ok:false,mis:'same-category-same-value'}],
      hint:'Freshness sets the denominator.',
      good:smallWins?`Right: ${v.money(trueBig)} > ${v.money(smallP)}.`:`Right: ${v.money(stickerBig)} < ${v.money(smallP)}, all used.`,
      bad:`Used: ${used}. A true: ${v.money(bigP)} ÷ ${used} = ${v.money(trueBig)} each. B: ${v.money(smallP)}.`,
      why:`Freshness is the clock: divide by what gets eaten before it runs out, nothing more.`};
  }},
{ id:'usable-value-compare-06', verb:'compare', part:5, tier:'independent', skill:'usable-value',
  gen:(v)=>{
    const person=v.person();
    const aQ=v.pick([2,3]);
    const aP=Math.round(v.cents(5,8)*100)/100;
    const bQ=aQ*2;
    const bP=Math.round(aP*2*0.85*100)/100;
    const useQ=v.pick([2,3]);
    const used=Math.min(bQ,useQ);
    const trueB=Math.round(bP/used*100)/100;
    const uA=Math.round(aP/aQ*100)/100;
    const bWins=used===bQ&&trueB<uA;
    return {
      context:`<p><b>Option A:</b> ${aQ}-pack for ${v.money(aP)} (${v.money(uA)} each), all used.</p><p><b>Option B:</b> ${bQ}-pack, 15% off per unit: ${v.money(bP)}. ${person} will use ${used} before expiry.</p>`,
      q:'Which is the better buy for actual use?',
      choices:[
        bWins?{label:`Option B — all ${bQ} get used at ${v.money(trueB)} each vs ${v.money(uA)}`,ok:true}
        :{label:`Option A — B's true cost is ${v.money(bP)} ÷ ${used} = ${v.money(trueB)} each vs ${v.money(uA)}`,ok:true},
        {label:`Option B — 15% off per unit always wins`,ok:false,mis:'unit-price-sticker'},
        {label:`Option A — smaller packs are always the better value`,ok:false,mis:'smaller-is-safer'},
        {label:`They tie — both are the same product`,ok:false,mis:'same-category-same-value'}],
      hint:'How many of B get used? Divide B by that.',
      good:bWins?`Right: ${v.money(trueB)} < ${v.money(uA)}, full use.`:`Right: ${v.money(trueB)} > ${v.money(uA)}.`,
      bad:`B true: ${v.money(bP)} ÷ ${used} used = ${v.money(trueB)} each. A: ${v.money(uA)}.`,
      why:`The 15% discount assumed full use. The denominator — ${used} used — decides whether it holds.`};
  }},
/* ---- decide x8 (part 5: bulk vs small decisions) ---- */
{ id:'usable-value-decide-01', verb:'decide', part:5, tier:'independent', skill:'usable-value',
  gen:(v)=>{
    const person=v.person(), store=v.place();
    const bigQ=24, smallQ=12;
    const upBig=Math.round(v.cents(0.55,0.85)*100)/100;
    const upSmall=Math.round((upBig+v.cents(0.12,0.35))*100)/100;
    const bigP=Math.round(upBig*bigQ*100)/100;
    const smallP=Math.round(upSmall*smallQ*100)/100;
    const weekly=v.pick([3,4,6]);
    const weeks=v.pick([2,3]);
    const used=Math.min(bigQ,weekly*weeks);
    const trueBig=Math.round(bigP/used*100)/100;
    const smallWins=trueBig>upSmall;
    return {
      q:`${person} is at ${store}: ${bigQ}-pack for ${v.money(bigP)} vs ${smallQ}-pack for ${v.money(smallP)}. The family uses ${weekly} a week; it stays fresh ${weeks} weeks. What is the call, and what happens next?`,
      choices:[
        smallWins?{label:`Small pack — only ${used} get used: ${v.money(trueBig)} each vs ${v.money(upSmall)}; the bulk "deal" wastes money`,ok:true}
        :{label:`Big pack — all ${used} get used at ${v.money(trueBig)} each vs ${v.money(upSmall)}; the bulk deal holds`,ok:true},
        {label:`Big pack — the sticker unit price is always the truth`,ok:false,mis:'unit-price-sticker'},
        {label:`Small pack — smaller is always the safe value`,ok:false,mis:'smaller-is-safer'},
        {label:`Big pack — leftovers can be donated later`,ok:false,mis:'others-use'}],
      hint:'Freshness × weekly use = the denominator.',
      good:smallWins?`Right: ${weekly}×${weeks} = ${used} used. ${v.money(trueBig)} > ${v.money(upSmall)}.`:`Right: ${weekly}×${weeks} = ${used} used — everything. ${v.money(trueBig)} < ${v.money(upSmall)}.`,
      bad:`Used: ${Math.min(bigQ,weekly*weeks)}. Big true: ${v.money(bigP)} ÷ ${used} = ${v.money(trueBig)} each. Small: ${v.money(upSmall)}.`,
      why:smallWins?`Consequence: the bulk pack costs more per used unit — the "deal" is a waste bill.`:`Consequence: full use locks in the lower unit price — the bulk deal pays off.`};
  }},
{ id:'usable-value-decide-02', verb:'decide', part:5, tier:'independent', skill:'usable-value',
  gen:(v)=>{
    const person=v.person(), store=v.place();
    const items=[['Laundry detergent','load',60,40],['Dish soap','wash',50,30],['Shampoo','wash',80,48]];
    const [name,unit,bigQ,smallQ]=v.pick(items);
    const upBig=Math.round(v.cents(0.18,0.32)*100)/100;
    const upSmall=Math.round((upBig+v.cents(0.05,0.14))*100)/100;
    const bigP=Math.round(upBig*bigQ*100)/100;
    const smallP=Math.round(upSmall*smallQ*100)/100;
    return {
      q:`${person} at ${store}: ${name}, ${v.money(bigP)} for ${bigQ} ${unit}s vs ${v.money(smallP)} for ${smallQ}. The household will use every drop; it never expires. Call?`,
      choices:[
        {label:`Big — ${v.money(upBig)}/${unit} beats ${v.money(upSmall)}/${unit}; certain use locks the win`,ok:true},
        {label:`Small — ${v.money(smallP)} is less than ${v.money(bigP)}`,ok:false,mis:'total-not-unit'},
        {label:`Small — big bottles are a commitment trap`,ok:false,mis:'smaller-is-safer'},
        {label:`Big — bigger is always the better value`,ok:false,mis:'unit-price-sticker'}],
      hint:'Certain use + no expiry. What does the division say?',
      good:`Right: ${v.money(bigP)} ÷ ${bigQ} = ${v.money(upBig)} vs ${v.money(upSmall)}.`,
      bad:`Every drop gets used, nothing expires: ${v.money(upBig)}/${unit} < ${v.money(upSmall)}/${unit}. The big one wins cleanly.`,
      why:`Consequence: the household pays ${v.money(upBig)} per ${unit} instead of ${v.money(upSmall)} — the bulk buy keeps paying off every wash.`};
  }},
{ id:'usable-value-decide-03', verb:'decide', part:5, tier:'independent', skill:'usable-value',
  gen:(v)=>{
    const person=v.person(), store=v.place();
    const prods=[['milk','gallon'],['bread','loaf'],['berries','box']];
    const [name,unit]=v.pick(prods);
    const bulkQ=v.pick([4,6]);
    const bulkP=Math.round(v.cents(3,5)*bulkQ*100)/100;
    const singleP=Math.round(v.cents(3.5,6)*100)/100;
    const useQ=v.pick([2,3]);
    const trueBulk=Math.round(bulkP/useQ*100)/100;
    return {
      q:`${person} at ${store}: ${name} bulk — ${bulkQ} for ${v.money(bulkP)} — vs singles at ${v.money(singleP)}. The household uses ${useQ} before the rest spoil. What is the call?`,
      choices:[
        {label:`Singles — bulk's true price is ${v.money(bulkP)} ÷ ${useQ} = ${v.money(trueBulk)} each vs ${v.money(singleP)}`,ok:true},
        {label:`Bulk — the sticker per-${unit} is lower`,ok:false,mis:'unit-price-sticker'},
        {label:`Bulk — the family can eat faster`,ok:false},
        {label:`Singles — singles are always the better value`,ok:false,mis:'smaller-is-safer'}],
      hint:'Spoilage sets the denominator.',
      good:`Right: ${v.money(trueBulk)} > ${v.money(singleP)} per used ${unit}.`,
      bad:`Only ${useQ} get used: ${v.money(bulkP)} ÷ ${useQ} = ${v.money(trueBulk)} each. Singles at ${v.money(singleP)} win.`,
      why:`Consequence: the bulk "deal" is the most expensive option — spoilage turned it into a waste bill.`};
  }},
{ id:'usable-value-decide-04', verb:'decide', part:5, tier:'independent', skill:'usable-value',
  gen:(v)=>{
    const person=v.person(), store=v.place();
    const bigQ=v.pick([3,4]);
    const bigP=Math.round(v.cents(18,28)*100)/100;
    const smallP=Math.round(v.cents(8,12)*100)/100;
    const perMonth=v.pick([1,2]);
    const months=v.pick([2,3]);
    const used=Math.min(bigQ,perMonth*months);
    const trueBig=Math.round(bigP/used*100)/100;
    const stickerBig=Math.round(bigP/bigQ*100)/100;
    const smallWins=trueBig>smallP;
    return {
      q:`${person} at ${store}: pet food ${bigQ}-pack for ${v.money(bigP)} vs single for ${v.money(smallP)}. The pet eats ${perMonth} a month; it stays fresh ${months} months. Call?`,
      choices:[
        smallWins?{label:`Single — only ${used} stay fresh: ${v.money(trueBig)} each vs ${v.money(smallP)}`,ok:true}
        :{label:`${bigQ}-pack — all ${used} stay fresh: ${v.money(stickerBig)} each vs ${v.money(smallP)}`,ok:true},
        {label:`${bigQ}-pack — the sticker says ${v.money(stickerBig)}`,ok:false,mis:'unit-price-sticker'},
        {label:`Single — singles are always safer`,ok:false,mis:'smaller-is-safer'},
        {label:`${bigQ}-pack — the pet might eat more`,ok:false}],
      hint:'${perMonth}/month × ${months} months = the denominator.',
      good:smallWins?`Right: ${v.money(trueBig)} > ${v.money(smallP)}.`:`Right: full use at ${v.money(stickerBig)} < ${v.money(smallP)}.`,
      bad:`${perMonth} × ${months} = ${used} used. ${v.money(bigP)} ÷ ${used} = ${v.money(trueBig)} each vs ${v.money(smallP)}.`,
      why:smallWins?`Consequence: stale kibble is not savings — the single wins.`:`Consequence: everything stays fresh, so the sticker price holds — bulk wins.`};
  }},
{ id:'usable-value-decide-05', verb:'decide', part:5, tier:'independent', skill:'usable-value',
  gen:(v)=>{
    const person=v.person(), store=v.place();
    const items=[['Paper towels','roll',12,6],['Napkins','pack',8,4]];
    const [name,unit,bigQ,smallQ]=v.pick(items);
    const upBig=Math.round(v.cents(0.90,1.40)*100)/100;
    const upSmall=Math.round((upBig+v.cents(0.20,0.50))*100)/100;
    const bigP=Math.round(upBig*bigQ*100)/100;
    const smallP=Math.round(upSmall*smallQ*100)/100;
    const roommates=v.pick([2,3]);
    return {
      q:`${person} splits household goods with ${roommates} roommates at ${store}: ${name} ${bigQ} for ${v.money(bigP)} vs ${smallQ} for ${v.money(smallP)}. All ${bigQ} will be used across the house. Call?`,
      choices:[
        {label:`Big pack — ${v.money(upBig)} per ${unit} vs ${v.money(upSmall)}; shared certain use makes it win`,ok:true},
        {label:`Small pack — the total ${v.money(smallP)} is lower`,ok:false,mis:'total-not-unit'},
        {label:`Small pack — roommates might move out`,ok:false,mis:'others-use'},
        {label:`Big pack — bulk is always better`,ok:false,mis:'unit-price-sticker'}],
      hint:'Shared use still counts as used. Divide.',
      good:`Right: ${v.money(bigP)} ÷ ${bigQ} = ${v.money(upBig)} < ${v.money(upSmall)}.`,
      bad:`All ${bigQ} get used across the house: ${v.money(upBig)} per ${unit} vs ${v.money(upSmall)}. The big pack wins.`,
      why:`Consequence: the house pays ${v.money(upBig)} per ${unit} instead of ${v.money(upSmall)} — shared certain use is still certain use.`};
  }},
{ id:'usable-value-decide-06', verb:'decide', part:5, tier:'independent', skill:'usable-value',
  gen:(v)=>{
    const person=v.person(), store=v.place();
    const prods=[['yogurt cups','cup'],['juice boxes','box'],['fruit cups','cup']];
    const [name,unit]=v.pick(prods);
    const bigQ=v.pick([30,36]), smallQ=bigQ/2;
    const upBig=Math.round(v.cents(0.42,0.68)*100)/100;
    const upSmall=Math.round((upBig+v.cents(0.10,0.28))*100)/100;
    const bigP=Math.round(upBig*bigQ*100)/100;
    const smallP=Math.round(upSmall*smallQ*100)/100;
    const eatQ=Math.round(smallQ*0.6);
    const trueBig=Math.round(bigP/eatQ*100)/100;
    return {
      q:`${person}'s kid will eat ${eatQ} ${name} before the rest expire; a neighbor "might take some" but nothing is promised. At ${store}: ${bigQ}-pack ${v.money(bigP)} vs ${smallQ}-pack ${v.money(smallP)}. Call?`,
      choices:[
        {label:`Small pack — ${v.money(bigP)} ÷ ${eatQ} eaten = ${v.money(trueBig)} each vs ${v.money(upSmall)}; "might" is not a plan`,ok:true},
        {label:`Big pack — the sticker ${v.money(upBig)} is lowest`,ok:false,mis:'unit-price-sticker'},
        {label:`Big pack — the neighbor will take the rest`,ok:false,mis:'others-use'},
        {label:`Big pack — the kid might eat more`,ok:false}],
      hint:'Count only what is promised.',
      good:`Right: ${v.money(trueBig)} > ${v.money(upSmall)}.`,
      bad:`Promised use: ${eatQ}. ${v.money(bigP)} ÷ ${eatQ} = ${v.money(trueBig)} each vs ${v.money(upSmall)}. The neighbor's "might" changes the question instead of answering it.`,
      why:`Consequence: counting unpromised use is how bulk deals become waste bills. Only certain use goes in the denominator.`};
  }},
{ id:'usable-value-decide-07', verb:'decide', part:5, tier:'independent', skill:'usable-value',
  gen:(v)=>{
    const person=v.person(), store=v.place();
    const items=[['Cereal','box',2,1],['Oatmeal','tub',2,1]];
    const [name,unit,bigQ,smallQ]=v.pick(items);
    const pBig=Math.round(v.cents(4,7)*bigQ*0.9*100)/100;
    const pSmall=Math.round(v.cents(4,7)*100)/100;
    return {
      q:`${person} at ${store}: ${name} ${bigQ}-pack for ${v.money(pBig)} vs single for ${v.money(pSmall)}. The pantry is already full of ${name.toLowerCase()}; one box is open. Call?`,
      choices:[
        {label:`Single — the open box plus pantry stock means the extra will go stale; ${v.money(pBig)} for stale ${name.toLowerCase()} is waste`,ok:true},
        {label:`${bigQ}-pack — the sticker unit price is lower`,ok:false,mis:'unit-price-sticker'},
        {label:`${bigQ}-pack — a full pantry means buying more is safe`,ok:false},
        {label:`Single — singles are always the better value`,ok:false,mis:'smaller-is-safer'}],
      hint:'What is already at home? New units wait behind old ones.',
      good:`Right: the pantry is the queue — new boxes go stale waiting.`,
      bad:`The open box + full pantry = the new pack waits. Waiting = stale. The ${bigQ}-pack's "deal" dies in the queue.`,
      why:`Consequence: stock you already own is the first thing that expires. Buying bulk into a full pantry buys waste.`};
  }},
{ id:'usable-value-decide-08', verb:'decide', part:5, tier:'independent', skill:'usable-value',
  gen:(v)=>{
    const person=v.person(), store=v.place();
    const prods=[['trash bags','bag'],['toilet paper','roll'],['dish soap','bottle']];
    const [name,unit]=v.pick(prods);
    const bigP=Math.round(v.cents(12,20)*100)/100;
    const smallP=Math.round(v.cents(7,11)*100)/100;
    const storage=v.pick(['a tiny apartment closet','plenty of garage space']);
    const fits=storage==='plenty of garage space';
    return {
      q:`${person} at ${store}: bulk ${name} for ${v.money(bigP)} (lowest unit price) vs small for ${v.money(smallP)}. It never expires and will all get used — but ${person} has ${storage}. Call?`,
      choices:[
        fits?{label:`Bulk — never expires, all gets used, and there is room: the unit price win is real`,ok:true}
        :{label:`Small — the bulk unit price wins on paper, but nowhere to store it turns the deal into clutter and damage`,ok:true},
        {label:`Bulk — unit price is the only thing that matters`,ok:false,mis:'unit-price-sticker'},
        {label:`Small — small is always safer`,ok:false,mis:'smaller-is-safer'},
        {label:`Bulk — storage problems solve themselves`,ok:false}],
      hint:'Value math assumes the units survive. Where do they live?',
      good:fits?`Right: room + certain use + no expiry = bulk wins.`:`Right: no room means damaged or tossed units — the denominator shrinks.`,
      bad:fits?`All three hold: used, fresh, stored. ${v.money(bigP)} bulk wins.`:`No storage = crushed, damp, or tossed units. Used drops, true price rises. The small pack wins the real math.`,
      why:`Consequence: storage is part of the denominator. Units that cannot be stored cannot be "used."`};
  }},
/* ---- predict x6 (part 5) ---- */
{ id:'usable-value-predict-01', verb:'predict', part:5, tier:'independent', skill:'usable-value',
  gen:(v)=>{
    const person=v.person();
    const bigP=Math.round(v.cents(16,24)*100)/100;
    const useQ=v.pick([8,10]);
    const buyQ=useQ*3;
    return {
      q:`${person} keeps buying the ${buyQ}-pack "for the unit price" but the family only uses ${useQ} before expiry. What is the predictable result after 6 months?`,
      choices:[
        {label:`Paying for ${buyQ-useQ} wasted units every cycle — the "cheap" pack is the expensive habit`,ok:true},
        {label:`Big savings — the sticker unit price compounds`,ok:false,mis:'unit-price-sticker'},
        {label:`It evens out — waste is free`,ok:false},
        {label:`The family will naturally use more to match the pack`,ok:false}],
      hint:'Waste per cycle × cycles.',
      good:`Right: ${buyQ-useQ} wasted units per cycle, every cycle.`,
      bad:`Each cycle: ${v.money(bigP)} for ${useQ} used = ${v.money(Math.round(bigP/useQ*100)/100)} per used — not the sticker. × 6 months of the same mistake.`,
      why:`The habit's true price never changes: waste rewrites it every single cycle. The sticker is a rumor; the trash is the receipt.`};
  }},
{ id:'usable-value-predict-02', verb:'predict', part:5, tier:'independent', skill:'usable-value',
  gen:(v)=>{
    const person=v.person();
    const pMonth=Math.round(v.cents(9,14)*100)/100;
    return {
      q:`${person} switches from bulk (half wasted) to right-sized packs at a higher sticker unit price. What happens to the monthly spend?`,
      choices:[
        {label:`It drops — paying for zero waste beats a low sticker with 50% waste`,ok:true},
        {label:`It rises — the sticker unit price is higher`,ok:false,mis:'unit-price-sticker'},
        {label:`It stays the same — pack size does not affect spending`,ok:false},
        {label:`It rises — small packs are always a worse value`,ok:false,mis:'smaller-is-safer'}],
      hint:'Compare TRUE unit prices, not stickers.',
      good:`Right: true bulk price was double the sticker; the small pack's sticker is honest.`,
      bad:`Bulk true: ${v.money(pMonth)} sticker → ${v.money(Math.round(pMonth*2*100)/100)} true with half wasted. Right-sized: higher sticker, zero waste. The honest number wins.`,
      why:`Waste is a 100% tax on the wasted half. Removing it beats any sticker discount.`};
  }},
{ id:'usable-value-predict-03', verb:'predict', part:5, tier:'independent', skill:'usable-value',
  gen:(v)=>{
    const person=v.person();
    const kids=v.pick([1,2]);
    return {
      q:`${person}'s household grows (a kid moves back home). The bulk packs that used to half-spoil now get fully used. What happens to the value math?`,
      choices:[
        {label:`The bulk deals flip from wasteful to winning — the denominator fills up`,ok:true},
        {label:`Nothing changes — bulk is always wasteful`,ok:false},
        {label:`Bulk gets worse — more people means more waste`,ok:false},
        {label:`The sticker prices change with household size`,ok:false}],
      hint:'The denominator is "units used." What just happened to it?',
      good:`Right: used rises to bought, so true price falls to the sticker.`,
      bad:`Before: half used, true price doubled. Now: all used, true price = sticker. Same packs, opposite verdict — because the household changed.`,
      why:`Value is personal: the same pack is a trap for one household and a deal for another. The denominator is your use, not the package.`};
  }},
{ id:'usable-value-predict-04', verb:'predict', part:5, tier:'independent', skill:'usable-value',
  gen:(v)=>{
    const person=v.person();
    const bigP=Math.round(v.cents(20,30)*100)/100;
    return {
      q:`${person} buys a warehouse club membership "to save on bulk," then buys bulk out of habit — including perishables that spoil. What is the predictable first-year result?`,
      choices:[
        {label:`The membership fee plus spoiled bulk wipes out the unit-price wins — the habit decides, not the store`,ok:true},
        {label:`Automatic savings — warehouse stores always save money`,ok:false,mis:'unit-price-sticker'},
        {label:`The fee pays for itself no matter what is bought`,ok:false},
        {label:`Perishables do not spoil at warehouse stores`,ok:false}],
      hint:'Fee + waste vs unit-price wins. Which side is bigger?',
      good:`Right: the fee is certain; the wins need the use math to hold.`,
      bad:`Fee: certain. Bulk wins: only on certain use with no expiry. Spoiled perishables + fee > sticker savings. The membership is a bet the habits have to win.`,
      why:`A membership does not change the denominator — your use does. Bulk without the use math is just expensive shopping with a fee on top.`};
  }},
{ id:'usable-value-predict-05', verb:'predict', part:5, tier:'independent', skill:'usable-value',
  gen:(v)=>{
    const person=v.person();
    return {
      q:`${person} starts checking "will we finish it?" before every bulk buy. What breaks first — the old habit or the grocery bill?`,
      choices:[
        {label:`The grocery bill drops — the question filters out the waste before it is bought`,ok:true},
        {label:`Nothing changes — questions do not affect prices`,ok:false},
        {label:`The bill rises — thinking takes time away from shopping`,ok:false},
        {label:`The habit wins — bulk always feels cheaper`,ok:false,mis:'unit-price-sticker'}],
      hint:'The question changes the denominator before money moves.',
      good:`Right: waste gets filtered at the shelf, not the trash.`,
      bad:`Every "no, we will not finish it" is a bulk pack not bought — and a waste bill not paid. The bill drops because the denominator gets honest.`,
      why:`One question moves the decision before the money. Habits change when the check happens at the shelf.`};
  }},
{ id:'usable-value-predict-06', verb:'predict', part:5, tier:'independent', skill:'usable-value',
  gen:(v)=>{
    const person=v.person();
    const pSmall=Math.round(v.cents(6,10)*100)/100;
    const pBig=Math.round(v.cents(10,16)*100)/100;
    return {
      q:`${person} buys the small ${v.money(pSmall)} pack every week instead of the ${v.money(pBig)} bulk pack that half-spoils. After a year, which choice cost less?`,
      choices:[
        {label:`The small pack — ${v.money(pSmall)}×52 of honest spending beats ${v.money(pBig)}×26 of half-wasted bulk`,ok:true},
        {label:`The bulk pack — ${v.money(pBig)} is less than two small packs`,ok:false,mis:'total-not-unit'},
        {label:`They cost the same — spending is spending`,ok:false},
        {label:`The bulk pack — the sticker unit price guarantees it`,ok:false,mis:'unit-price-sticker'}],
      hint:'Yearly true cost: small × 52 vs bulk-true × 26.',
      good:`Right: ${v.money(Math.round(pSmall*52*100)/100)} vs ${v.money(Math.round(pBig*2*26*100)/100)} true.`,
      bad:`Small: ${v.money(pSmall)} × 52 = ${v.money(Math.round(pSmall*52*100)/100)}. Bulk true: ${v.money(pBig)} ÷ half-used = ${v.money(Math.round(pBig*2*100)/100)} per cycle × 26 = ${v.money(Math.round(pBig*2*26*100)/100)}. Small wins the year.`,
      why:`Yearly math exposes the habit: honest small spending beats discounted waste, 52 weeks to 26.`};
  }},
/* ---- build x5 (part 5; targets in cents, must sum to totalCents) ---- */
{ id:'usable-value-build-01', verb:'build', part:5, tier:'independent', skill:'usable-value',
  gen:(v)=>{
    const total=v.pick([12000,15000,18000]);
    const staples=Math.round(total*0.5/100)*100;
    const fresh=Math.round(total*0.3/100)*100;
    const bulk=total-staples-fresh;
    return {
      h:'Build it: split the grocery budget by use',
      body:`<p>Split ${v.money(total/100)} for groceries: pantry staples (certain use, bulk-friendly), fresh food (expires — buy small), and a bulk-deal jar for proven winners.</p>`,
      totalDollars: Math.round(total/100),
      buckets:[{id:'staples',label:'Pantry staples'},{id:'fresh',label:'Fresh (buy small)'},{id:'bulk',label:'Bulk-deal jar'}],
      targets:{staples:Math.round(staples/100), fresh:Math.round(fresh/100), bulk:Math.round(bulk/100)},
      hint:'Certain use gets bulk money; expiry gets small-buy money.',
      good:`${v.money(staples/100)} staples, ${v.money(fresh/100)} fresh, ${v.money(bulk/100)} bulk jar — waste fenced out by design.`,
      bad:`Staples first (certain use), fresh next (buy small), bulk jar last. Sum: ${v.money(total/100)}.`,
      why:'The split encodes the rule: bulk money only goes where use is certain.'};
  }},
{ id:'usable-value-build-02', verb:'build', part:5, tier:'independent', skill:'usable-value',
  gen:(v)=>{
    const total=v.pick([8000,10000,12000]);
    const household=Math.round(total*0.6/100)*100;
    const pets=Math.round(total*0.25/100)*100;
    const trial=total-household-pets;
    return {
      h:'Build it: split the household supplies budget',
      body:`<p>Split ${v.money(total/100)}: household supplies (certain use), pet supplies (freshness-limited), and a trial jar for testing a new bulk buy before committing.</p>`,
      totalDollars: Math.round(total/100),
      buckets:[{id:'household',label:'Household'},{id:'pets',label:'Pet supplies'},{id:'trial',label:'Trial jar'}],
      targets:{household:Math.round(household/100), pets:Math.round(pets/100), trial:Math.round(trial/100)},
      hint:'Certain use first, freshness-limited next, trial jar small.',
      good:`${v.money(household/100)} household, ${v.money(pets/100)} pets, ${v.money(trial/100)} trial jar.`,
      bad:`Household biggest, pets next, trial jar small. Sum: ${v.money(total/100)}.`,
      why:'The trial jar tests the denominator before the bulk buy commits the money.'};
  }},
{ id:'usable-value-build-03', verb:'build', part:5, tier:'independent', skill:'usable-value',
  gen:(v)=>{
    const total=v.pick([6000,9000,12000]);
    const weekly=Math.round(total*0.7/100)*100;
    const stock=Math.round(total*0.2/100)*100;
    const waste=total-weekly-stock;
    return {
      h:'Build it: split the weekly shop',
      body:`<p>Split ${v.money(total/100)} for the week: this week's food (buy small, eat fresh), stock-up staples (certain use), and a waste budget of $0 — the goal is to spend it on nothing.</p>`,
      totalDollars: Math.round(total/100),
      buckets:[{id:'weekly',label:"This week's food"},{id:'stock',label:'Stock-up staples'},{id:'waste',label:'Waste budget'}],
      targets:{weekly:Math.round(weekly/100), stock:Math.round(stock/100), waste:Math.round(waste/100)},
      hint:'The waste budget target is $0.00 — that is the point.',
      good:`${v.money(weekly/100)} weekly, ${v.money(stock/100)} stock-up, ${v.money(waste/100)} waste.`,
      bad:`Weekly food first, stock-up staples next, waste at zero. Sum: ${v.money(total/100)}.`,
      why:'A $0 waste budget makes the goal visible: every bulk buy must earn its place in the denominator.'};
  }},
{ id:'usable-value-build-04', verb:'build', part:5, tier:'independent', skill:'usable-value',
  gen:(v)=>{
    const total=v.pick([15000,18000,21000]);
    const shared=Math.round(total*0.55/100)*100;
    const personal=Math.round(total*0.3/100)*100;
    const flex=total-shared-personal;
    return {
      h:'Build it: split the shared-household budget',
      body:`<p>Split ${v.money(total/100)} for a shared house: shared supplies (bulk-friendly, certain use), personal items (buy small), and a flex jar for the house to vote on.</p>`,
      totalDollars: Math.round(total/100),
      buckets:[{id:'shared',label:'Shared supplies'},{id:'personal',label:'Personal items'},{id:'flex',label:'House flex jar'}],
      targets:{shared:Math.round(shared/100), personal:Math.round(personal/100), flex:Math.round(flex/100)},
      hint:'Shared certain use gets the bulk money.',
      good:`${v.money(shared/100)} shared, ${v.money(personal/100)} personal, ${v.money(flex/100)} flex.`,
      bad:`Shared first (certain use), personal next, flex last. Sum: ${v.money(total/100)}.`,
      why:'Shared certain use is the safest bulk bet there is — the denominator is the whole house.'};
  }},
{ id:'usable-value-build-05', verb:'build', part:5, tier:'independent', skill:'usable-value',
  gen:(v)=>{
    const total=v.pick([10000,12000,15000]);
    const proven=Math.round(total*0.6/100)*100;
    const seasonal=Math.round(total*0.25/100)*100;
    const experiment=total-proven-seasonal;
    return {
      h:'Build it: split the pantry plan',
      body:`<p>Split ${v.money(total/100)} for pantry planning: proven bulk winners (certain use), seasonal items (buy small, eat in season), and an experiment jar for one new bulk test.</p>`,
      totalDollars: Math.round(total/100),
      buckets:[{id:'proven',label:'Proven winners'},{id:'seasonal',label:'Seasonal (small)'},{id:'experiment',label:'Experiment jar'}],
      targets:{proven:Math.round(proven/100), seasonal:Math.round(seasonal/100), experiment:Math.round(experiment/100)},
      hint:'Proven winners earn the bulk money; experiments stay small.',
      good:`${v.money(proven/100)} proven, ${v.money(seasonal/100)} seasonal, ${v.money(experiment/100)} experiment.`,
      bad:`Proven first, seasonal next, experiment small. Sum: ${v.money(total/100)}.`,
      why:'Bulk money follows proof, not hope. The experiment jar keeps new bets small until the denominator proves out.'};
  }},
/* ---- explain x5 (part 5) ---- */
{ id:'usable-value-explain-01', verb:'explain', part:5, tier:'independent', skill:'usable-value',
  gen:(v)=>{
    return {
      h:'Teach it back: true unit price',
      prompt:'Explain in your own words what "true unit price" means and how to compute it.',
      keyPoints:['True unit price = price ÷ units you will USE, not units you buy','The sticker divides by the package; you must divide by your use','Waste raises the true price above the sticker','Compare true unit prices, not totals or stickers'],
      modelAnswer:'True unit price is the price divided by the units you will actually use. The shelf sticker divides by everything in the package, which assumes zero waste. When some goes unused, divide by what gets used instead — that number is the real price per unit.',
      hint:'Price ÷ used. Say why the sticker differs.'};
  }},
{ id:'usable-value-explain-02', verb:'explain', part:5, tier:'independent', skill:'usable-value',
  gen:(v)=>{
    return {
      h:'Teach it back: why waste flips the winner',
      prompt:'Explain in your own words how waste can make the "cheaper" bulk pack the expensive choice.',
      keyPoints:['The bulk sticker assumes every unit gets used','Waste shrinks the denominator, which raises the true price','A small pack with zero waste can beat a bulk pack with waste','The flip happens at the shelf if you count your real use'],
      modelAnswer:'A bulk pack looks cheaper because its sticker divides by all the units. But if half expire unused, the true price divides by only the used half — doubling it. That is how a "cheap" bulk pack becomes the expensive choice, and counting your real use at the shelf reveals the flip.',
      hint:'Denominator shrinks → price rises.'};
  }},
{ id:'usable-value-explain-03', verb:'explain', part:5, tier:'independent', skill:'usable-value',
  gen:(v)=>{
    return {
      h:'Teach it back: the two halves of a bulk decision',
      prompt:'Explain in your own words the two checks that decide whether a bulk buy is smart.',
      keyPoints:['Check 1: will ALL of it get used before it expires or goes stale','Check 2: is the true unit price (÷ used) actually lower','Certain use + no expiry = the green light','Failing either check turns the "deal" into a waste bill'],
      modelAnswer:'A bulk buy is smart only if both checks pass: everything will get used in time, and the true unit price — dividing by used, not bought — is actually lower. Certain use with no expiry is the green light; anything else is paying for the trash.',
      hint:'Used in time AND truly cheaper.'};
  }},
{ id:'usable-value-explain-04', verb:'explain', part:5, tier:'independent', skill:'usable-value',
  gen:(v)=>{
    return {
      h:'Teach it back: why "lower total" is not "better value"',
      prompt:'Explain in your own words why a lower total price does not mean a better value.',
      keyPoints:['Total price measures how much you buy, not how good the deal is','Value needs the division: price ÷ units used','A lower total can hide a higher per-unit price','Compare per-unit, not per-bill'],
      modelAnswer:'The total only says how big the purchase is — it says nothing about the deal. Value is price divided by units you will use. A $5 small pack can be a worse value than a $9 big pack, or a better one; the totals alone cannot tell you. Divide first, then compare.',
      hint:'Total = size. Value = division.'};
  }},
{ id:'usable-value-explain-05', verb:'explain', part:5, tier:'independent', skill:'usable-value',
  gen:(v)=>{
    return {
      h:'Teach it back: value is personal',
      prompt:'Explain in your own words why the same bulk pack can be a deal for one household and a trap for another.',
      keyPoints:['The denominator is YOUR use, not the package','A family of five and a single person divide the same pack differently','Expiry and storage change the denominator too','There is no universal "good deal" — only good-for-your-use'],
      modelAnswer:'Value is personal because the denominator is your own use. The same 24-pack is a deal for a family that finishes it and a trap for one person who wastes half. Expiry dates, storage, and household size all change the math — so the "best deal" is always best-for-your-use.',
      hint:'Same pack, different households.'};
  }},
],
'gas-value': [
/* ---- choice x8 (part 5: trip-cost math) ---- */
{ id:'gas-value-choice-01', verb:'choice', part:5, tier:'independent', skill:'gas-value',
  gen:(v)=>{
    const person=v.person();
    const gal=v.int(10,16);
    const priceA=Math.round(v.cents(2.95,3.79)*100)/100;
    const gap=Math.round(v.cents(0.08,0.22)*100)/100;
    const priceB=Math.round((priceA-gap)*100)/100;
    const miles=v.int(5,12), mpg=v.int(22,32);
    const pump=Math.round(gal*gap*100)/100;
    const trip=Math.round(miles/mpg*priceA*100)/100;
    const real=Math.round((pump-trip)*100)/100;
    return {
      q:`${person} needs ${gal} gallons. Station A (${v.money(priceA)}/gal) is next door; station B (${v.money(priceB)}/gal) is ${miles} extra miles round trip. The car gets ${mpg} mpg. What are the real savings of driving to B?`,
      choices:[
        {label:`${v.money(real)} — ${v.money(pump)} pump savings minus ${v.money(trip)} trip cost`,ok:true},
        {label:`${v.money(pump)} — the pump price is all that matters`,ok:false,mis:'ignores-trip-cost'},
        {label:`$0.00 — any detour wipes out the savings`,ok:false,mis:'trip-math'},
        {label:`${v.money(Math.round(pump*2*100)/100)} — count the savings on the way there and back`,ok:false,mis:'double-count-savings'}],
      hint:'Real savings = pump savings − trip cost.',
      good:`Right: ${v.money(pump)} − ${v.money(trip)} = ${v.money(real)}.`,
      bad:`Pump savings: ${gal} × ${v.money(gap)} = ${v.money(pump)}. Trip cost: (${miles} ÷ ${mpg}) × ${v.money(priceA)} = ${v.money(trip)}. Net: ${v.money(real)}.`,
      why:`The pump price ignores the drive. Real savings = ${v.money(pump)} − ${v.money(trip)} = ${v.money(real)}.`};
  }},
{ id:'gas-value-choice-02', verb:'choice', part:5, tier:'independent', skill:'gas-value',
  gen:(v)=>{
    const person=v.person();
    const gal=v.int(8,14);
    const priceA=Math.round(v.cents(2.95,3.79)*100)/100;
    const gap=Math.round(v.cents(0.10,0.30)*100)/100;
    const priceB=Math.round((priceA-gap)*100)/100;
    const miles=v.int(6,16), mpg=v.int(20,30);
    const pump=Math.round(gal*gap*100)/100;
    const trip=Math.round(miles/mpg*priceA*100)/100;
    const real=Math.round((pump-trip)*100)/100;
    const worth=real>0;
    return {
      q:`Station B is ${v.money(gap)}/gal cheaper than station A (${v.money(priceA)} vs ${v.money(priceB)}), but ${miles} extra miles round trip. ${person} needs ${gal} gallons; the car gets ${mpg} mpg. Worth the drive?`,
      choices:[
        worth?{label:`Yes — ${v.money(pump)} pump savings minus ${v.money(trip)} trip cost = ${v.money(real)} real`,ok:true}
        :{label:`No — the ${v.money(trip)} trip cost wipes out the ${v.money(pump)} pump savings`,ok:true},
        {label:`Yes — ${v.money(gap)}/gal cheaper is all that matters`,ok:false,mis:'ignores-trip-cost'},
        {label:`No — driving farther for gas is never worth it`,ok:false,mis:'trip-math'},
        {label:`It does not matter — ${v.money(gap)}/gal is too small to count`,ok:false,mis:'small-per-unit'}],
      hint:'Pump savings − trip cost. The sign decides.',
      good:worth?`Right: ${v.money(real)} real savings.`:`Right: the detour eats the discount.`,
      bad:`${gal} × ${v.money(gap)} = ${v.money(pump)} pump savings. (${miles} ÷ ${mpg}) × ${v.money(priceA)} = ${v.money(trip)} trip cost. Net: ${v.money(real)}.`,
      why:`Same subtraction as always: ${v.money(pump)} − ${v.money(trip)} = ${v.money(real)}.`};
  }},
{ id:'gas-value-choice-03', verb:'choice', part:5, tier:'independent', skill:'gas-value',
  gen:(v)=>{
    const person=v.person();
    const gal=v.int(12,18);
    const priceA=Math.round(v.cents(3.05,3.85)*100)/100;
    const gap=Math.round(v.cents(0.10,0.25)*100)/100;
    const priceB=Math.round((priceA-gap)*100)/100;
    const pump=Math.round(gal*gap*100)/100;
    return {
      q:`Station B (${v.money(priceB)}/gal) sits directly on ${person}'s normal route — zero extra miles. Station A is ${v.money(priceA)}/gal. ${person} needs ${gal} gallons. Which station wins?`,
      choices:[
        {label:`Station B — zero extra miles means zero trip cost; the full ${v.money(pump)} is real`,ok:true},
        {label:`Station A — the closest station is always cheapest overall`,ok:false,mis:'trip-math'},
        {label:`Station B — but only because cheaper gas is higher quality`,ok:false,mis:'price-means-quality'},
        {label:`It does not matter — ${v.money(gap)}/gal is too small to count`,ok:false,mis:'small-per-unit'}],
      hint:'What does the trip cost this time?',
      good:`Right. Zero extra miles = zero extra cost.`,
      bad:`Extra miles = 0, so extra cost = $0.00. Pump savings ${gal} × ${v.money(gap)} = ${v.money(pump)} — all real.`,
      why:`On-route changes everything: the trip cost drops to $0.00, so the full ${v.money(pump)} pump savings is real.`};
  }},
{ id:'gas-value-choice-04', verb:'choice', part:5, tier:'independent', skill:'gas-value',
  gen:(v)=>{
    const person=v.person();
    const gal=v.int(20,32);
    const priceA=Math.round(v.cents(3.05,3.95)*100)/100;
    const gap=Math.round(v.cents(0.12,0.35)*100)/100;
    const priceB=Math.round((priceA-gap)*100)/100;
    const miles=v.int(10,24), mpg=v.int(14,22);
    const pump=Math.round(gal*gap*100)/100;
    const trip=Math.round(miles/mpg*priceA*100)/100;
    const real=Math.round((pump-trip)*100)/100;
    const worth=real>0;
    return {
      q:`${person}'s truck needs ${gal} gallons. Station B is ${v.money(gap)}/gal cheaper (${v.money(priceB)} vs ${v.money(priceA)}) but ${miles} extra miles round trip; the truck gets ${mpg} mpg. Worth the drive?`,
      choices:[
        worth?{label:`Yes — ${v.money(pump)} pump savings minus ${v.money(trip)} trip cost = ${v.money(real)} real`,ok:true}
        :{label:`No — the ${v.money(trip)} trip cost wipes out the ${v.money(pump)} pump savings`,ok:true},
        {label:`Yes — big tanks always make the drive worth it`,ok:false,mis:'trip-math'},
        {label:`Yes — the trip does not cost real money`,ok:false,mis:'ignores-trip-cost'},
        {label:`No — ${miles} miles is too far for any discount`,ok:false,mis:'trip-math'}],
      hint:'Pump savings − trip cost — the tank size does not change the formula.',
      good:worth?`Right: ${v.money(real)} real savings.`:`Right: the truck drinks the discount. Stay at A.`,
      bad:`Pump: ${gal} × ${v.money(gap)} = ${v.money(pump)}. Trip: (${miles} ÷ ${mpg}) × ${v.money(priceA)} = ${v.money(trip)}. Net: ${v.money(real)}.`,
      why:`A big tank scales BOTH sides: bigger pump savings, but the same subtraction. ${v.money(pump)} − ${v.money(trip)} = ${v.money(real)}.`};
  }},
{ id:'gas-value-choice-05', verb:'choice', part:5, tier:'independent', skill:'gas-value',
  gen:(v)=>{
    const person=v.person();
    const miles=v.int(8,18), mpg=v.int(20,30);
    const priceA=Math.round(v.cents(3.05,3.85)*100)/100;
    const trip=Math.round(miles/mpg*priceA*100)/100;
    return {
      q:`${person} is deciding whether a ${miles}-mile round-trip detour is worth it. The car gets ${mpg} mpg and gas is ${v.money(priceA)}/gal. What does the detour itself cost?`,
      choices:[
        {label:`${v.money(trip)} — (${miles} ÷ ${mpg}) × ${v.money(priceA)}`,ok:true},
        {label:`$0.00 — driving is free once you own the car`,ok:false,mis:'ignores-trip-cost'},
        {label:`${v.money(miles)} — a dollar a mile`,ok:false,mis:'trip-math'},
        {label:`${v.money(Math.round(miles/mpg*100)/100)} — just the gallons, not the price`,ok:false,mis:'trip-math'}],
      hint:'Gallons burned × price per gallon.',
      good:`Right: (${miles} ÷ ${mpg}) × ${v.money(priceA)} = ${v.money(trip)}.`,
      bad:`Gallons: ${miles} ÷ ${mpg} = ${v.money(Math.round(miles/mpg*100)/100)}-ish gallons. × ${v.money(priceA)} = ${v.money(trip)}.`,
      why:`Every detour burns (miles ÷ mpg) gallons, and each gallon costs the pump price. That is the trip's price tag.`};
  }},
{ id:'gas-value-choice-06', verb:'choice', part:5, tier:'independent', skill:'gas-value',
  gen:(v)=>{
    const person=v.person();
    const gal=v.int(10,15);
    const priceA=Math.round(v.cents(3.10,3.90)*100)/100;
    const gap=Math.round(v.cents(0.15,0.30)*100)/100;
    const priceB=Math.round((priceA-gap)*100)/100;
    const miles=v.int(4,9), mpg=v.int(24,34);
    const pump=Math.round(gal*gap*100)/100;
    const trip=Math.round(miles/mpg*priceA*100)/100;
    const real=Math.round((pump-trip)*100)/100;
    return {
      q:`A friend tells ${person}: "Station B is ${v.money(gap)}/gal cheaper — always go there." B is ${miles} extra miles round trip; ${person} needs ${gal} gallons at ${mpg} mpg. Is "always" right?`,
      choices:[
        {label:real>0?`Here yes — ${v.money(real)} real — but "always" is wrong: the trip cost decides each time`:`Here no — the trip eats it — and "always" is wrong: the trip cost decides each time`,ok:true},
        {label:`Yes — cheaper per gallon is always cheaper overall`,ok:false,mis:'ignores-trip-cost'},
        {label:`No — cheaper stations are never worth it`,ok:false,mis:'trip-math'},
        {label:`Yes — ${v.money(gap)}/gal × ${gal} gallons is the whole story`,ok:false,mis:'ignores-trip-cost'}],
      hint:'Run this trip\'s numbers, then judge the word "always."',
      good:real>0?`Right: ${v.money(real)} real this time — but only because the math said so.`:`Right: the trip eats it this time — "always" fails the math.`,
      bad:`This trip: ${v.money(pump)} − ${v.money(trip)} = ${v.money(real)}. Next trip the miles, gallons, and gap all change — "always" cannot survive that.`,
      why:`"Always go to the cheap pump" skips the subtraction. The trip cost votes every time.`};
  }},
{ id:'gas-value-choice-07', verb:'choice', part:5, tier:'independent', skill:'gas-value',
  gen:(v)=>{
    const person=v.person();
    const gal=v.int(12,20);
    const priceA=Math.round(v.cents(3.05,3.85)*100)/100;
    const gap=Math.round(v.cents(0.10,0.28)*100)/100;
    const priceB=Math.round((priceA-gap)*100)/100;
    const miles=v.int(8,18), mpg=v.int(20,30);
    const pump=Math.round(gal*gap*100)/100;
    const trip=Math.round(miles/mpg*priceA*100)/100;
    const real=Math.round((pump-trip)*100)/100;
    const worth=real>0;
    return {
      q:`Station B is ${v.money(gap)}/gal cheaper but ${miles} extra miles round trip. ${person} is already driving past B for groceries this week — needs ${gal} gallons, ${mpg} mpg. Which station wins?`,
      choices:[
        {label:`Station B — the trip was happening anyway, so trip cost is $0.00 and the full ${v.money(pump)} is real`,ok:true},
        {label:`Station A — ${v.money(priceA)} and ${v.money(priceB)} are basically the same price`,ok:false,mis:'close-enough-prices'},
        {label:`Station A — driving farther for gas is never worth it`,ok:false,mis:'trip-math'},
        {label:`Station B — ${v.money(gap)}/gal cheaper is all that matters`,ok:false,mis:'ignores-trip-cost'}],
      hint:'Does the detour add any NEW miles?',
      good:`Right: miles already driven cost nothing extra. Full ${v.money(pump)} is real.`,
      bad:`${person} drives past B anyway: extra miles = 0, trip cost = $0.00. The full ${v.money(pump)} pump savings is real.`,
      why:`Combine the errand and the detour disappears: $0.00 extra trip cost, so the whole ${v.money(pump)} pump gap is real savings.`};
  }},
{ id:'gas-value-choice-08', verb:'choice', part:5, tier:'independent', skill:'gas-value',
  gen:(v)=>{
    const person=v.person();
    const gal=v.int(9,13);
    const priceA=Math.round(v.cents(3.20,4.00)*100)/100;
    const gapC=v.pick([3,4,5]);
    const gap=gapC/100;
    const priceB=Math.round((priceA-gap)*100)/100;
    const miles=v.int(10,20), mpg=v.int(22,30);
    const pump=Math.round(gal*gap*100)/100;
    const trip=Math.round(miles/mpg*priceA*100)/100;
    const real=Math.round((pump-trip)*100)/100;
    return {
      q:`An app flags station B as "${gapC}¢ cheaper!" — ${v.money(priceB)} vs ${v.money(priceA)}, ${miles} extra miles round trip. ${person} needs ${gal} gallons (${mpg} mpg). Is the flag worth following?`,
      choices:[
        real>0?{label:`Yes — ${v.money(pump)} pump savings minus ${v.money(trip)} trip = ${v.money(real)} real`,ok:true}
        :{label:`No — ${v.money(pump)} pump savings minus ${v.money(trip)} trip = ${v.money(real)}; the flag loses money`,ok:true},
        {label:`Yes — the app did the math already`,ok:false,mis:'ignores-trip-cost'},
        {label:`No — apps are always wrong about gas`,ok:false,mis:'trip-math'},
        {label:`Yes — ${gapC}¢ a gallon is a huge gap`,ok:false,mis:'small-per-unit'}],
      hint:'The app flagged the pump gap. Who prices the trip?',
      good:real>0?`Right: ${v.money(real)} real — the flag survives the math.`:`Right: the flag dies under the trip cost.`,
      bad:`Pump: ${gal} × ${v.money(gap)} = ${v.money(pump)}. Trip: (${miles} ÷ ${mpg}) × ${v.money(priceA)} = ${v.money(trip)}. Net: ${v.money(real)}.`,
      why:`"¢ cheaper" is pump-only marketing. The trip still votes — run it before following the flag.`};
  }},
/* ---- sort x6 (part 5) ---- */
{ id:'gas-value-sort-01', verb:'sort', part:5, tier:'independent', skill:'gas-value',
  gen:(v)=>{
    const items=v.shuffle([
      {label:'Cheaper pump 10 miles off route',a:'run the math',why:'Trip cost might eat the gap.'},
      {label:'Cheaper pump on the normal route',a:'take it',why:'Zero extra miles = full savings.'},
      {label:'Cheaper pump, errand already going there',a:'take it',why:'No NEW miles, no trip cost.'},
      {label:'Cheaper pump, tiny gap, long detour',a:'run the math',why:'Small gap vs big trip.'},
      {label:'Same price, closer station',a:'take it',why:'No decision needed — closer wins.'},
      {label:'Cheaper pump across town, big tank',a:'run the math',why:'Big tank scales both sides.'},
      {label:'Cheaper pump next door',a:'take it',why:'No detour at all.'},
      {label:'"¢ cheaper" app flag, 15 miles away',a:'run the math',why:'Flags skip the trip cost.'}]);
    return {
      h:'Sort it: take it or run the math?',
      body:'<p>Sort each gas situation by whether the answer is obvious or needs the trip math.</p>',
      buckets:['Take it','Run the math'],
      items};
  }},
{ id:'gas-value-sort-02', verb:'sort', part:5, tier:'independent', skill:'gas-value',
  gen:(v)=>{
    const items=v.shuffle([
      {label:'Pump savings: gallons × gap',a:'counts',why:'That is the pump side.'},
      {label:'Trip cost: (miles ÷ mpg) × price',a:'counts',why:'That is the trip side.'},
      {label:'The pump price gap alone',a:'misses the trip',why:'Half the equation.'},
      {label:'Real savings = pump − trip',a:'counts',why:'The full formula.'},
      {label:'"The drive is free"',a:'misses the trip',why:'The drive burns gas.'},
      {label:'Extra miles = 0 on route',a:'counts',why:'Zero miles = zero trip cost.'},
      {label:'The app\'s "¢ cheaper" flag',a:'misses the trip',why:'Flags are pump-only.'},
      {label:'Errand already going that way',a:'counts',why:'New miles = 0.'}]);
    return {
      h:'Sort it: counts the trip or misses the trip?',
      body:'<p>Sort each line of reasoning by whether it includes the cost of getting there.</p>',
      buckets:['Counts','Misses the trip'],
      items};
  }},
{ id:'gas-value-sort-03', verb:'sort', part:5, tier:'independent', skill:'gas-value',
  gen:(v)=>{
    const items=v.shuffle([
      {label:'"Cheaper per gallon = cheaper overall"',a:'pump-only thinking',why:'Skips the trip.'},
      {label:'"Real savings = pump − trip"',a:'full-cost thinking',why:'Both sides counted.'},
      {label:'"On my route, so the gap is all mine"',a:'full-cost thinking',why:'Trip cost = $0 here.'},
      {label:'"The app says it is cheaper"',a:'pump-only thinking',why:'App flags skip trips.'},
      {label:'"My car gets bad mileage, so detours cost me more"',a:'full-cost thinking',why:'mpg is in the formula.'},
      {label:'"A big tank makes any drive worth it"',a:'pump-only thinking',why:'Big tanks scale both sides.'},
      {label:'"Combine the errand, kill the detour"',a:'full-cost thinking',why:'New miles drop to zero.'},
      {label:'"15¢ a gallon is always worth it"',a:'pump-only thinking',why:'"Always" skips the math.'}]);
    return {
      h:'Sort it: pump-only thinking or full-cost thinking?',
      body:'<p>Sort each claim by whether it counts the whole cost of the cheaper gas.</p>',
      buckets:['Pump-only thinking','Full-cost thinking'],
      items};
  }},
{ id:'gas-value-sort-04', verb:'sort', part:5, tier:'independent', skill:'gas-value',
  gen:(v)=>{
    const items=v.shuffle([
      {label:'$1.80 pump savings, $0.96 trip',a:'worth the drive',why:'$0.84 real.'},
      {label:'$2.10 pump savings, $3.40 trip',a:'not worth it',why:'Trip eats it.'},
      {label:'$1.50 pump savings, $0 trip (on route)',a:'worth the drive',why:'Full $1.50 real.'},
      {label:'$0.60 pump savings, $2.00 trip',a:'not worth it',why:'Negative real.'},
      {label:'$4.00 pump savings, $1.20 trip',a:'worth the drive',why:'$2.80 real.'},
      {label:'$1.00 pump savings, $1.00 trip',a:'not worth it',why:'Zero real — not worth the time.'},
      {label:'$3.20 pump savings, $0.80 trip',a:'worth the drive',why:'$2.40 real.'},
      {label:'$0.90 pump savings, $1.50 trip',a:'not worth it',why:'Loses money.'}]);
    return {
      h:'Sort it: worth the drive or not worth it?',
      body:'<p>Sort each trip by the sign of real savings: pump savings minus trip cost.</p>',
      buckets:['Worth the drive','Not worth it'],
      items};
  }},
{ id:'gas-value-sort-05', verb:'sort', part:5, tier:'independent', skill:'gas-value',
  gen:(v)=>{
    const items=v.shuffle([
      {label:'Gallons needed',a:'changes the math',why:'Scales pump savings.'},
      {label:'Extra miles',a:'changes the math',why:'Scales trip cost.'},
      {label:'Your car\'s mpg',a:'changes the math',why:'In the trip formula.'},
      {label:'Pump price gap',a:'changes the math',why:'Scales pump savings.'},
      {label:'The station\'s brand name',a:'does not change it',why:'Math, not marketing.'},
      {label:'The color of the pump',a:'does not change it',why:'Irrelevant.'},
      {label:'Whether it is Tuesday',a:'does not change it',why:'The formula has no weekday.'},
      {label:'The cashier\'s friendliness',a:'does not change it',why:'Nice, but not math.'}]);
    return {
      h:'Sort it: changes the math or does not change it?',
      body:'<p>Sort each factor by whether it belongs in the real-savings calculation.</p>',
      buckets:['Changes the math','Does not change it'],
      items};
  }},
{ id:'gas-value-sort-06', verb:'sort', part:5, tier:'independent', skill:'gas-value',
  gen:(v)=>{
    const items=v.shuffle([
      {label:'Detour adds new miles',a:'trip cost counts',why:'New miles burn gas.'},
      {label:'Station on the normal route',a:'trip cost is zero',why:'No new miles.'},
      {label:'Errand already going that way',a:'trip cost is zero',why:'Miles were happening anyway.'},
      {label:'Special trip just for the discount',a:'trip cost counts',why:'Every mile is new.'},
      {label:'Passing the station on the commute',a:'trip cost is zero',why:'Zero extra miles.'},
      {label:'Driving 12 miles out and back',a:'trip cost counts',why:'24 new miles.'},
      {label:'Station next door',a:'trip cost is zero',why:'No detour.'},
      {label:'Detour on the way to the game',a:'trip cost counts',why:'Extra miles are extra.'}]);
    return {
      h:'Sort it: trip cost counts or trip cost is zero?',
      body:'<p>Sort each situation by whether the drive adds a real trip cost.</p>',
      buckets:['Trip cost counts','Trip cost is zero'],
      items};
  }},
/* ---- decide x8 (part 5) ---- */
{ id:'gas-value-decide-01', verb:'decide', part:5, tier:'independent', skill:'gas-value',
  gen:(v)=>{
    const person=v.person();
    const gal=v.int(10,16);
    const priceA=Math.round(v.cents(2.95,3.79)*100)/100;
    const gap=Math.round(v.cents(0.08,0.22)*100)/100;
    const priceB=Math.round((priceA-gap)*100)/100;
    const miles=v.int(5,12), mpg=v.int(22,32);
    const pump=Math.round(gal*gap*100)/100;
    const trip=Math.round(miles/mpg*priceA*100)/100;
    const real=Math.round((pump-trip)*100)/100;
    const worth=real>0;
    return {
      q:`${person} needs ${gal} gallons. Station A (${v.money(priceA)}/gal) is next door; station B (${v.money(priceB)}/gal) is ${miles} extra miles round trip (${mpg} mpg). What is the call, and what happens to the budget?`,
      choices:[
        worth?{label:`Drive to B — ${v.money(pump)} − ${v.money(trip)} = ${v.money(real)} real; the budget keeps it`,ok:true}
        :{label:`Stay at A — the ${v.money(trip)} trip wipes out the ${v.money(pump)} pump savings`,ok:true},
        {label:`Drive to B — ${v.money(gap)}/gal cheaper is all that matters`,ok:false,mis:'ignores-trip-cost'},
        {label:`Stay at A — any detour wipes out every saving`,ok:false,mis:'trip-math'},
        {label:`Drive to B and back twice — double the savings`,ok:false,mis:'double-count-savings'}],
      hint:'Pump savings − trip cost.',
      good:worth?`Right: ${v.money(real)} real savings lands in the budget.`:`Right: staying at A protects the budget from a losing trip.`,
      bad:`Pump: ${gal} × ${v.money(gap)} = ${v.money(pump)}. Trip: (${miles} ÷ ${mpg}) × ${v.money(priceA)} = ${v.money(trip)}. Net: ${v.money(real)}.`,
      why:worth?`Consequence: the drive earns ${v.money(real)} — worth the wheel time.`:`Consequence: the drive would LOSE ${v.money(Math.abs(real))} — staying put is the win.`};
  }},
{ id:'gas-value-decide-02', verb:'decide', part:5, tier:'independent', skill:'gas-value',
  gen:(v)=>{
    const person=v.person();
    const gal=v.int(12,18);
    const priceA=Math.round(v.cents(3.05,3.85)*100)/100;
    const gap=Math.round(v.cents(0.10,0.25)*100)/100;
    const priceB=Math.round((priceA-gap)*100)/100;
    const pump=Math.round(gal*gap*100)/100;
    return {
      q:`${person} passes station B (${v.money(priceB)}/gal) on the normal commute — zero extra miles. Station A near home is ${v.money(priceA)}/gal. Needs ${gal} gallons. Call?`,
      choices:[
        {label:`Fill at B — zero extra miles means the full ${v.money(pump)} is real savings`,ok:true},
        {label:`Fill at A — closer to home is always cheaper`,ok:false,mis:'trip-math'},
        {label:`Fill at B — cheaper gas is higher quality`,ok:false,mis:'price-means-quality'},
        {label:`Skip both — ${v.money(gap)}/gal is too small to matter`,ok:false,mis:'small-per-unit'}],
      hint:'Extra miles = 0. What is the trip cost?',
      good:`Right: $0.00 trip cost, ${v.money(pump)} real.`,
      bad:`On-route: extra miles 0 → trip cost $0.00. Pump savings ${gal} × ${v.money(gap)} = ${v.money(pump)}, all real.`,
      why:`Consequence: ${v.money(pump)} stays in the budget with zero effort — on-route cheap gas is free money.`};
  }},
{ id:'gas-value-decide-03', verb:'decide', part:5, tier:'independent', skill:'gas-value',
  gen:(v)=>{
    const person=v.person();
    const gal=v.int(14,22);
    const priceA=Math.round(v.cents(3.10,3.90)*100)/100;
    const gap=Math.round(v.cents(0.12,0.30)*100)/100;
    const priceB=Math.round((priceA-gap)*100)/100;
    const miles=v.int(8,18), mpg=v.int(18,28);
    const pump=Math.round(gal*gap*100)/100;
    const trip=Math.round(miles/mpg*priceA*100)/100;
    const real=Math.round((pump-trip)*100)/100;
    const worth=real>0;
    const errand=v.pick(['groceries','a doctor visit','picking up a friend']);
    return {
      q:`Station B is ${v.money(gap)}/gal cheaper but ${miles} extra miles round trip. ${person} needs ${gal} gallons (${mpg} mpg) and is already driving past B for ${errand} this week. Call?`,
      choices:[
        {label:`Fill at B — the ${errand} trip was happening anyway: trip cost $0.00, full ${v.money(pump)} real`,ok:true},
        {label:`Stay at A — ${v.money(priceA)} vs ${v.money(priceB)} is basically the same`,ok:false,mis:'close-enough-prices'},
        {label:`Stay at A — detours are never worth it`,ok:false,mis:'trip-math'},
        {label:`Fill at B — the pump gap is the whole story`,ok:false,mis:'ignores-trip-cost'}],
      hint:'New miles = 0. The errand pays for the drive.',
      good:`Right: combine the errand, erase the detour.`,
      bad:`The ${errand} drive happens regardless: extra miles = 0, trip cost = $0.00. Full ${v.money(pump)} pump savings is real.`,
      why:`Consequence: ${v.money(pump)} saved with zero extra driving — errand-stacking is the cheat code.`};
  }},
{ id:'gas-value-decide-04', verb:'decide', part:5, tier:'independent', skill:'gas-value',
  gen:(v)=>{
    const person=v.person();
    const gal=v.int(8,12);
    const priceA=Math.round(v.cents(3.20,4.00)*100)/100;
    const gap=Math.round(v.cents(0.05,0.12)*100)/100;
    const priceB=Math.round((priceA-gap)*100)/100;
    const miles=v.int(12,22), mpg=v.int(20,30);
    const pump=Math.round(gal*gap*100)/100;
    const trip=Math.round(miles/mpg*priceA*100)/100;
    return {
      q:`A friend brags about station B: "${v.money(gap)}/gal cheaper!" It is ${miles} extra miles round trip. ${person} needs ${gal} gallons (${mpg} mpg). Follow the friend?`,
      choices:[
        {label:`No — ${v.money(pump)} pump savings vs ${v.money(trip)} trip = losing ${v.money(Math.round((trip-pump)*100)/100)}; the brag skips the math`,ok:true},
        {label:`Yes — ${v.money(gap)}/gal cheaper is ${v.money(gap)}/gal cheaper`,ok:false,mis:'ignores-trip-cost'},
        {label:`Yes — friends know the best stations`,ok:false},
        {label:`No — cheap stations water down their gas`,ok:false,mis:'price-means-quality'}],
      hint:'Small gap, long detour. Run it.',
      good:`Right: ${v.money(pump)} − ${v.money(trip)} = −${v.money(Math.round((trip-pump)*100)/100)}.`,
      bad:`Pump: ${gal} × ${v.money(gap)} = ${v.money(pump)}. Trip: (${miles} ÷ ${mpg}) × ${v.money(priceA)} = ${v.money(trip)}. The "deal" loses ${v.money(Math.round((trip-pump)*100)/100)}.`,
      why:`Consequence: following pump-only advice costs ${v.money(Math.round((trip-pump)*100)/100)} — the brag never priced the drive.`};
  }},
{ id:'gas-value-decide-05', verb:'decide', part:5, tier:'independent', skill:'gas-value',
  gen:(v)=>{
    const person=v.person();
    const gal=v.int(25,35);
    const priceA=Math.round(v.cents(3.05,3.95)*100)/100;
    const gap=Math.round(v.cents(0.15,0.35)*100)/100;
    const priceB=Math.round((priceA-gap)*100)/100;
    const miles=v.int(10,20), mpg=v.int(14,20);
    const pump=Math.round(gal*gap*100)/100;
    const trip=Math.round(miles/mpg*priceA*100)/100;
    const real=Math.round((pump-trip)*100)/100;
    const worth=real>0;
    return {
      q:`${person}'s work truck needs ${gal} gallons. Station B is ${v.money(gap)}/gal cheaper (${v.money(priceB)} vs ${v.money(priceA)}), ${miles} extra miles round trip; the truck gets ${mpg} mpg. Call?`,
      choices:[
        worth?{label:`Drive to B — ${v.money(pump)} − ${v.money(trip)} = ${v.money(real)} real; the big tank earns it`,ok:true}
        :{label:`Stay at A — ${v.money(pump)} − ${v.money(trip)} = ${v.money(real)}; the truck drinks the discount`,ok:true},
        {label:`Drive to B — big tanks always win the drive`,ok:false,mis:'trip-math'},
        {label:`Stay at A — trucks should never chase cheap gas`,ok:false,mis:'trip-math'},
        {label:`Drive to B — the pump savings are ${v.money(pump)} and the trip is free`,ok:false,mis:'ignores-trip-cost'}],
      hint:'Big tank scales BOTH sides. Subtract.',
      good:worth?`Right: ${v.money(real)} real.`:`Right: the thirsty truck eats the gap.`,
      bad:`Pump: ${gal} × ${v.money(gap)} = ${v.money(pump)}. Trip: (${miles} ÷ ${mpg}) × ${v.money(priceA)} = ${v.money(trip)}. Net: ${v.money(real)}.`,
      why:`Consequence: ${worth?`${v.money(real)} earned by the drive.`:`${v.money(Math.abs(real))} lost by the drive — the tank size does not rescue bad math.`}`};
  }},
{ id:'gas-value-decide-06', verb:'decide', part:5, tier:'independent', skill:'gas-value',
  gen:(v)=>{
    const person=v.person();
    const gal=v.int(10,14);
    const priceA=Math.round(v.cents(3.15,3.95)*100)/100;
    const gap=Math.round(v.cents(0.20,0.40)*100)/100;
    const priceB=Math.round((priceA-gap)*100)/100;
    const miles=v.int(15,25), mpg=v.int(22,30);
    const pump=Math.round(gal*gap*100)/100;
    const trip=Math.round(miles/mpg*priceA*100)/100;
    const real=Math.round((pump-trip)*100)/100;
    return {
      q:`Station B is a full ${v.money(gap)}/gal cheaper — but ${miles} extra miles round trip across town. ${person} needs ${gal} gallons (${mpg} mpg). Big gap, big drive. Call?`,
      choices:[
        real>0?{label:`Drive — ${v.money(pump)} − ${v.money(trip)} = ${v.money(real)} real; the gap beats the drive`,ok:true}
        :{label:`Stay — ${v.money(pump)} − ${v.money(trip)} = ${v.money(real)}; even this gap loses to the drive`,ok:true},
        {label:`Drive — a big gap always wins`,ok:false,mis:'ignores-trip-cost'},
        {label:`Stay — cross-town drives are never worth it`,ok:false,mis:'trip-math'},
        {label:`Drive — and fill a spare can to double the savings`,ok:false,mis:'double-count-savings'}],
      hint:'Big gap AND big drive. Only the subtraction knows.',
      good:real>0?`Right: ${v.money(real)} real.`:`Right: even ${v.money(gap)}/gal cannot beat ${miles} miles.`,
      bad:`${gal} × ${v.money(gap)} = ${v.money(pump)}. (${miles} ÷ ${mpg}) × ${v.money(priceA)} = ${v.money(trip)}. Net: ${v.money(real)}.`,
      why:`Consequence: ${real>0?`the gap earns ${v.money(real)}.`:`the drive costs ${v.money(Math.abs(real))} net — "big gap" is not a verdict, the subtraction is.`}`};
  }},
{ id:'gas-value-decide-07', verb:'decide', part:5, tier:'independent', skill:'gas-value',
  gen:(v)=>{
    const person=v.person();
    const gal=v.int(11,16);
    const priceA=Math.round(v.cents(3.00,3.80)*100)/100;
    const gap=Math.round(v.cents(0.08,0.18)*100)/100;
    const priceB=Math.round((priceA-gap)*100)/100;
    const miles=v.int(6,14), mpg=v.int(24,34);
    const pump=Math.round(gal*gap*100)/100;
    const trip=Math.round(miles/mpg*priceA*100)/100;
    const real=Math.round((pump-trip)*100)/100;
    const worth=real>0;
    return {
      q:`${person} is running late for work. Station B (${v.money(priceB)}/gal) is ${miles} extra miles round trip; station A (${v.money(priceA)}/gal) is on the way. Needs ${gal} gallons (${mpg} mpg). Call?`,
      choices:[
        worth?{label:`B still wins ${v.money(real)} — but being late costs more than ${v.money(real)}; take A and protect the job`,ok:true}
        :{label:`Take A — B loses ${v.money(Math.abs(real))} AND makes ${person} late; double loss`,ok:true},
        {label:`Take B — ${v.money(gap)}/gal cheaper is all that matters`,ok:false,mis:'ignores-trip-cost'},
        {label:`Take B — being late is fine if the gas is cheap`,ok:false},
        {label:`Skip gas entirely — running on fumes is free`,ok:false}],
      hint:'Money math AND time math. Which costs more?',
      good:worth?`Right: ${v.money(real)} is not worth being late.`:`Right: B loses money AND time.`,
      bad:`Money: ${v.money(pump)} − ${v.money(trip)} = ${v.money(real)}. Time: late for work. The ${v.money(real)} cannot cover a late arrival.`,
      why:`Consequence: the cheapest gas is not the cheapest choice when time has a price. Protect the job first.`};
  }},
{ id:'gas-value-decide-08', verb:'decide', part:5, tier:'independent', skill:'gas-value',
  gen:(v)=>{
    const person=v.person();
    const gal=v.int(10,15);
    const priceA=Math.round(v.cents(3.05,3.85)*100)/100;
    const gap=Math.round(v.cents(0.10,0.25)*100)/100;
    const priceB=Math.round((priceA-gap)*100)/100;
    const miles=v.int(5,12), mpg=v.int(20,30);
    const pump=Math.round(gal*gap*100)/100;
    const trip=Math.round(miles/mpg*priceA*100)/100;
    const real=Math.round((pump-trip)*100)/100;
    const worth=real>0;
    return {
      q:`${person} fills up weekly. Station B is ${v.money(gap)}/gal cheaper, ${miles} extra miles round trip (${mpg} mpg, ${gal} gallons). This week's math says B wins by ${v.money(Math.abs(real))}. Make it a habit?`,
      choices:[
        worth?{label:`Only if the math holds weekly — recheck when miles, gap, or gallons change; a habit needs a standing win`,ok:true}
        :{label:`No — this week it loses ${v.money(Math.abs(real))}; a habit would compound the loss × 52`,ok:true},
        {label:`Yes — one win means always win`,ok:false,mis:'ignores-trip-cost'},
        {label:`No — habits are always bad`,ok:false,mis:'trip-math'},
        {label:`Yes — and tell everyone B is the best station`,ok:false}],
      hint:'This week\'s numbers are not next week\'s numbers.',
      good:worth?`Right: recheck the subtraction each week.`:`Right: ${v.money(Math.abs(real))} × 52 = ${v.money(Math.round(Math.abs(real)*52*100)/100)} a year lost.`,
      bad:`This week: ${v.money(pump)} − ${v.money(trip)} = ${v.money(real)}. Next week the gap, miles, or gallons change — the habit is only as good as the weekly math.`,
      why:`Consequence: ${worth?'a standing habit needs a standing win — verify, don\'t assume.':'a losing trip × 52 is a ${v.money(Math.round(Math.abs(real)*52*100)/100)} yearly habit of losing.'}`};
  }},
/* ---- spot x6 (part 5: 01-03, part 6: 04-06) ---- */
{ id:'gas-value-spot-01', verb:'spot', part:5, tier:'independent', skill:'gas-value',
  gen:(v)=>{
    const person=v.person();
    const gal=v.int(12,16);
    const gap=Math.round(v.cents(0.10,0.20)*100)/100;
    return {
      scenario:`<p>${person}\u2019s claim:</p><ul><li>Station B is ${v.money(gap)}/gal cheaper</li><li>Needs ${gal} gallons</li><li>"I am saving ${v.money(Math.round(gal*gap*100)/100)} — the pump price is all that matters."</li><li>B is 10 extra miles round trip (never counted)</li></ul>`,
      q:'What is the mistake in the claim?',
      choices:[
        {label:`The 10-mile detour was never priced — pump savings minus trip cost is the real number`,ok:true},
        {label:`The pump gap is fake — stations never differ`,ok:false,mis:'trip-math'},
        {label:`${gal} gallons is too much to count`,ok:false},
        {label:`The claim is correct — pump price is all that matters`,ok:false,mis:'ignores-trip-cost'}],
      hint:'What did the drive cost?',
      good:`Right. Pump savings are only half the equation.`,
      bad:`${v.money(Math.round(gal*gap*100)/100)} is the pump side. The trip side — (10 ÷ mpg) × price — was never subtracted. Real savings are smaller, maybe negative.`,
      why:`"The pump price is all that matters" is the classic pump-only mistake. The drive always votes.`};
  }},
{ id:'gas-value-spot-02', verb:'spot', part:5, tier:'independent', skill:'gas-value',
  gen:(v)=>{
    const person=v.person();
    const gal=v.int(10,14);
    const gap=Math.round(v.cents(0.15,0.25)*100)/100;
    return {
      scenario:`<p>${person}\u2019s math:</p><ul><li>Pump savings: ${gal} gal × ${v.money(gap)} = ${v.money(Math.round(gal*gap*100)/100)}</li><li>"And I save it again on the drive home — ${v.money(Math.round(gal*gap*2*100)/100)} total!"</li></ul>`,
      q:'What is the mistake?',
      choices:[
        {label:`The savings happen once — at the pump. The drive home does not re-save the gap`,ok:true},
        {label:`The pump savings are wrong — gaps do not multiply by gallons`,ok:false},
        {label:`Driving home costs double, so the savings are ${v.money(Math.round(gal*gap*100)/100)}`,ok:false,mis:'trip-math'},
        {label:`The math is right — round trips double everything`,ok:false,mis:'double-count-savings'}],
      hint:'When does the cheaper price apply? Once, at fill-up.',
      good:`Right: one fill-up, one savings.`,
      bad:`The ${v.money(gap)}/gal gap applies to the ${gal} gallons bought — once. The drive home burns gas; it does not buy it. Total: ${v.money(Math.round(gal*gap*100)/100)}, not ${v.money(Math.round(gal*gap*2*100)/100)}.`,
      why:`Double-counting invents savings. The discount is collected once, at the pump.`};
  }},
{ id:'gas-value-spot-03', verb:'spot', part:5, tier:'independent', skill:'gas-value',
  gen:(v)=>{
    const person=v.person();
    return {
      scenario:`<p>${person}\u2019s rule:</p><ul><li>"Any detour for cheaper gas is a waste of money."</li><li>Station B: 12¢/gal cheaper, 2 extra miles round trip, 14-gallon fill</li><li>Never runs the numbers — the rule decides.</li></ul>`,
      q:'What is the mistake?',
      choices:[
        {label:`"Any detour" is as wrong as "every detour" — 14 × $0.12 = $1.68 vs a ~$0.25 trip; the math says go`,ok:true},
        {label:`The rule is correct — detours never pay`,ok:false,mis:'trip-math'},
        {label:`12¢ is too small to ever matter`,ok:false,mis:'small-per-unit'},
        {label:`14 gallons is too much to count`,ok:false}],
      hint:'Absolute rules skip the subtraction. Run it.',
      good:`Right: $1.68 − ~$0.25 = ~$1.43 real. The rule was wrong here.`,
      bad:`Pump: 14 × $0.12 = $1.68. Trip: (2 ÷ ~25) × ~$3.40 ≈ $0.27. Net ≈ +$1.41. "Never" fails the math.`,
      why:`Absolute rules in both directions skip the subtraction. The numbers decide each trip — not the rule.`};
  }},
{ id:'gas-value-spot-04', verb:'spot', part:6, tier:'independent', skill:'gas-value',
  gen:(v)=>{
    const person=v.person();
    return {
      scenario:`<p>An ad claims:</p><ul><li>"Our gas is 20¢ cheaper per gallon!"</li><li>Station is 18 extra miles round trip from ${person}</li><li>${person} needs 10 gallons; car gets 25 mpg</li><li>"20¢ × 10 = $2.00 saved!"</li></ul>`,
      q:'What is wrong with the ad\'s claim?',
      choices:[
        {label:`The ad prices the pump, not the trip — (18 ÷ 25) × ~$3.50 ≈ $2.52 trip cost wipes out the $2.00`,ok:true},
        {label:`The ad is right — $2.00 is $2.00`,ok:false,mis:'ignores-trip-cost'},
        {label:`Ads are always lying about prices`,ok:false,mis:'trip-math'},
        {label:`20¢ is too small to advertise`,ok:false,mis:'small-per-unit'}],
      hint:'Price the 18-mile detour.',
      good:`Right: $2.00 − $2.52 = −$0.52. The "deal" loses money.`,
      bad:`Pump: $2.00. Trip: (18 ÷ 25) × $3.50 ≈ $2.52. Net: −$0.52. The ad's math stops at the pump — yours should not.`,
      why:`"¢ cheaper" is pump-only marketing. Critique every claim with the trip cost included.`};
  }},
{ id:'gas-value-spot-05', verb:'spot', part:6, tier:'independent', skill:'gas-value',
  gen:(v)=>{
    const person=v.person();
    return {
      scenario:`<p>${person}\u2019s friend insists:</p><ul><li>"Cheap gas ruins engines — pay more for quality."</li><li>Both stations sell the same regulated fuel grade</li><li>Price gap: 15¢/gal; ${person} buys 12 gallons a week</li></ul>`,
      q:'What is the flaw?',
      choices:[
        {label:`Same regulated grade = same fuel — "quality" is marketing; the 15¢ gap is the only real difference`,ok:true},
        {label:`The friend is right — price always means quality`,ok:false,mis:'price-means-quality'},
        {label:`15¢ is too small to matter either way`,ok:false,mis:'small-per-unit'},
        {label:`${person} should buy premium to be safe`,ok:false,mis:'price-means-quality'}],
      hint:'What does the grade sticker on the pump regulate?',
      good:`Right. Same grade, same fuel — the gap is price, not quality.`,
      bad:`Regulated grades standardize the fuel. 15¢ × 12 gal = $1.80 a week of "quality" that does not exist — $93.60 a year.`,
      why:`Price-means-quality is a feeling, not a fact. Same grade = same gas; judge the gap with the trip math, not fear.`};
  }},
{ id:'gas-value-spot-06', verb:'spot', part:6, tier:'independent', skill:'gas-value',
  gen:(v)=>{
    const person=v.person();
    return {
      scenario:`<p>A viral post claims:</p><ul><li>"Gas is $3.00 here but $2.70 two towns over — everyone should drive there!"</li><li>Two towns over = 40 extra miles round trip</li><li>Average fill: 12 gallons, 28 mpg</li></ul>`,
      q:'What is wrong with the "everyone should drive there" claim?',
      choices:[
        {label:`The 40-mile trip costs (40 ÷ 28) × $3.00 ≈ $4.29 to save 12 × $0.30 = $3.60 — it loses $0.69 a fill`,ok:true},
        {label:`The post is right — 30¢ a gallon is huge`,ok:false,mis:'ignores-trip-cost'},
        {label:`Nobody should ever drive for cheaper gas`,ok:false,mis:'trip-math'},
        {label:`30¢ gaps do not exist in real life`,ok:false}],
      hint:'40 miles at 28 mpg. Price it.',
      good:`Right: $3.60 − $4.29 = −$0.69. The viral math skips the drive.`,
      bad:`Pump: 12 × $0.30 = $3.60. Trip: (40 ÷ 28) × $3.00 ≈ $4.29. Net: −$0.69 per fill. "Everyone" would lose money together.`,
      why:`Viral claims are pump-only. The trip cost is the fact-check — and here it fails.`};
  }},
/* ---- compare x6 (part 6: critique "cheaper gas" claims) ---- */
{ id:'gas-value-compare-01', verb:'compare', part:6, tier:'independent', skill:'gas-value',
  gen:(v)=>{
    const person=v.person();
    const gal=v.int(12,18);
    const priceA=Math.round(v.cents(3.20,3.90)*100)/100;
    const gapA=Math.round(v.cents(0.10,0.20)*100)/100;
    const gapB=Math.round(v.cents(0.20,0.35)*100)/100;
    const milesA=v.int(4,8), milesB=v.int(12,22);
    const mpg=v.int(22,30);
    const pumpA=Math.round(gal*gapA*100)/100, tripA=Math.round(milesA/mpg*priceA*100)/100;
    const pumpB=Math.round(gal*gapB*100)/100, tripB=Math.round(milesB/mpg*priceA*100)/100;
    const realA=Math.round((pumpA-tripA)*100)/100, realB=Math.round((pumpB-tripB)*100)/100;
    const aWins=realA>realB;
    return {
      context:`<p><b>Station X:</b> ${v.money(gapA)}/gal cheaper, ${milesA} extra miles. Pump ${v.money(pumpA)}, trip ${v.money(tripA)} → real ${v.money(realA)}.</p><p><b>Station Y:</b> ${v.money(gapB)}/gal cheaper, ${milesB} extra miles. Pump ${v.money(pumpB)}, trip ${v.money(tripB)} → real ${v.money(realB)}.</p>`,
      q:`${person} needs ${gal} gallons (${mpg} mpg). Which station is really cheaper?`,
      choices:[
        aWins?{label:`Station X — ${v.money(realA)} real beats ${v.money(realB)}`,ok:true}:{label:`Station Y — ${v.money(realB)} real beats ${v.money(realA)}`,ok:true},
        aWins?{label:`Station Y — the bigger pump gap always wins`,ok:false,mis:'ignores-trip-cost'}:{label:`Station X — the shorter drive always wins`,ok:false,mis:'trip-math'},
        {label:`They tie — gaps and drives cancel out`,ok:false},
        {label:`Neither — pump gaps are marketing`,ok:false,mis:'trip-math'}],
      hint:'Compare the REAL numbers, not the gaps.',
      good:aWins?`Right: ${v.money(realA)} > ${v.money(realB)}.`:`Right: ${v.money(realB)} > ${v.money(realA)}.`,
      bad:`X real: ${v.money(pumpA)} − ${v.money(tripA)} = ${v.money(realA)}. Y real: ${v.money(pumpB)} − ${v.money(tripB)} = ${v.money(realB)}.`,
      why:`Bigger gap vs longer drive — only the net decides. The pump gap is advertising; the real number is the verdict.`};
  }},
{ id:'gas-value-compare-02', verb:'compare', part:6, tier:'independent', skill:'gas-value',
  gen:(v)=>{
    const person=v.person();
    const gal=v.int(12,16);
    const priceA=Math.round(v.cents(3.10,3.90)*100)/100;
    const gap=Math.round(v.cents(0.12,0.25)*100)/100;
    const pump=Math.round(gal*gap*100)/100;
    const mpg=v.int(20,30);
    return {
      context:`<p><b>Claim:</b> "Station B is ${v.money(gap)}/gal cheaper — save ${v.money(pump)}!"</p><p><b>Reality check:</b> B is 14 extra miles round trip. ${person}'s car gets ${mpg} mpg; gas is ${v.money(priceA)}/gal. Trip cost: (14 ÷ ${mpg}) × ${v.money(priceA)} = ${v.money(Math.round(14/mpg*priceA*100)/100)}.</p>`,
      q:'Does the claim survive the trip cost?',
      choices:[
        Math.round((pump-14/mpg*priceA)*100)/100>0?{label:`Yes — ${v.money(pump)} − ${v.money(Math.round(14/mpg*priceA*100)/100)} = ${v.money(Math.round((pump-14/mpg*priceA)*100)/100)} real`,ok:true}
        :{label:`No — ${v.money(pump)} − ${v.money(Math.round(14/mpg*priceA*100)/100)} = ${v.money(Math.round((pump-14/mpg*priceA)*100)/100)}; the claim loses money`,ok:true},
        {label:`Yes — the claim is the math`,ok:false,mis:'ignores-trip-cost'},
        {label:`No — claims about gas are always false`,ok:false,mis:'trip-math'},
        {label:`Yes — ${v.money(gap)}/gal is a big gap`,ok:false,mis:'small-per-unit'}],
      hint:'Claim minus trip = verdict.',
      good:Math.round((pump-14/mpg*priceA)*100)/100>0?`Right: the claim survives, smaller.`:`Right: the claim dies under the trip.`,
      bad:`${v.money(pump)} pump − ${v.money(Math.round(14/mpg*priceA*100)/100)} trip = ${v.money(Math.round((pump-14/mpg*priceA)*100)/100)}.`,
      why:`Every "cheaper gas" claim gets one fact-check: the trip cost. Survivors are smaller than advertised; failures are losses.`};
  }},
{ id:'gas-value-compare-03', verb:'compare', part:6, tier:'independent', skill:'gas-value',
  gen:(v)=>{
    const person=v.person();
    const gal=v.int(10,15);
    const price=Math.round(v.cents(3.20,4.00)*100)/100;
    return {
      context:`<p><b>Plan A:</b> fill ${gal} gallons at the ${v.money(price)}/gal station on the route — no detour.</p><p><b>Plan B:</b> fill ${gal} gallons at a station 5¢/gal cheaper, 16 extra miles round trip (25 mpg).</p>`,
      q:'Which plan is really cheaper?',
      choices:[
        {label:`Plan A — 5¢ × ${gal} = ${v.money(Math.round(gal*0.05*100)/100)} pump savings vs (16 ÷ 25) × ${v.money(price)} = ${v.money(Math.round(16/25*price*100)/100)} trip; the detour loses`,ok:true},
        {label:`Plan B — 5¢ cheaper is 5¢ cheaper`,ok:false,mis:'ignores-trip-cost'},
        {label:`Plan B — any savings beats no savings`,ok:false,mis:'small-per-unit'},
        {label:`Plan A — detours are never worth it`,ok:false,mis:'trip-math'}],
      hint:'5¢ × gallons vs the 16-mile trip.',
      good:`Right: ${v.money(Math.round(gal*0.05*100)/100)} − ${v.money(Math.round(16/25*price*100)/100)} = −${v.money(Math.round((16/25*price-gal*0.05)*100)/100)}.`,
      bad:`Pump: ${v.money(Math.round(gal*0.05*100)/100)}. Trip: ${v.money(Math.round(16/25*price*100)/100)}. Net negative — Plan A wins.`,
      why:`Tiny gaps die under real drives. 5¢ needs a nearly free trip to survive.`};
  }},
{ id:'gas-value-compare-04', verb:'compare', part:6, tier:'independent', skill:'gas-value',
  gen:(v)=>{
    const person=v.person();
    const gal=v.int(30,40);
    const priceA=Math.round(v.cents(3.10,3.90)*100)/100;
    const gap=Math.round(v.cents(0.15,0.30)*100)/100;
    const pump=Math.round(gal*gap*100)/100;
    const mpgA=v.int(24,32), mpgB=v.int(14,18);
    const miles=v.int(10,16);
    const tripA=Math.round(miles/mpgA*priceA*100)/100;
    const tripB=Math.round(miles/mpgB*priceA*100)/100;
    const realA=Math.round((pump-tripA)*100)/100, realB=Math.round((pump-tripB)*100)/100;
    return {
      context:`<p><b>Same trip, two cars:</b> station B is ${v.money(gap)}/gal cheaper, ${miles} extra miles round trip, ${gal} gallons.</p><p><b>Car 1 (${mpgA} mpg):</b> pump ${v.money(pump)}, trip ${v.money(tripA)} → real ${v.money(realA)}.</p><p><b>Car 2 (${mpgB} mpg):</b> pump ${v.money(pump)}, trip ${v.money(tripB)} → real ${v.money(realB)}.</p>`,
      q:`${person} drives Car 1; a friend drives Car 2. Who should make the drive?`,
      choices:[
        realA>0&&realB<=0?{label:`Car 1 — ${v.money(realA)} real vs Car 2's ${v.money(realB)}; same trip, different verdict`,ok:true}
        :realA>0?{label:`Both — ${v.money(realA)} and ${v.money(realB)} real; both win, Car 1 wins bigger`,ok:true}
        :{label:`Neither — ${v.money(realA)} and ${v.money(realB)}; the trip loses for both`,ok:true},
        {label:`Both — the pump gap is the same for everyone`,ok:false,mis:'ignores-trip-cost'},
        {label:`Neither — cheap gas is never worth any drive`,ok:false,mis:'trip-math'},
        {label:`Car 2 — thirstier cars save more`,ok:false,mis:'trip-math'}],
      hint:'Same pump savings, different trip costs.',
      good:realA>0&&realB<=0?`Right: Car 1 wins, Car 2 loses — mpg decides.`:`Right.`,
      bad:`Car 1: ${v.money(pump)} − ${v.money(tripA)} = ${v.money(realA)}. Car 2: ${v.money(pump)} − ${v.money(tripB)} = ${v.money(realB)}.`,
      why:`mpg lives in the trip formula, so the same "deal" has different verdicts per car. Thirstier cars pay more for every detour.`};
  }},
{ id:'gas-value-compare-05', verb:'compare', part:6, tier:'independent', skill:'gas-value',
  gen:(v)=>{
    const person=v.person();
    const gal=v.int(12,16);
    const priceA=Math.round(v.cents(3.20,4.00)*100)/100;
    const gap=Math.round(v.cents(0.10,0.20)*100)/100;
    const pump=Math.round(gal*gap*100)/100;
    return {
      context:`<p><b>Ad:</b> "Members save ${v.money(gap)}/gal at our station!" (membership: free, 12 extra miles round trip).</p><p><b>Math:</b> ${gal} gallons → ${v.money(pump)} pump savings. Trip: (12 ÷ 26) × ${v.money(priceA)} = ${v.money(Math.round(12/26*priceA*100)/100)}.</p>`,
      q:'Is the membership deal real?',
      choices:[
        Math.round((pump-12/26*priceA)*100)/100>0?{label:`Yes — ${v.money(pump)} − ${v.money(Math.round(12/26*priceA*100)/100)} = ${v.money(Math.round((pump-12/26*priceA)*100)/100)} real`,ok:true}
        :{label:`No — ${v.money(pump)} − ${v.money(Math.round(12/26*priceA*100)/100)} = ${v.money(Math.round((pump-12/26*priceA)*100)/100)}; "free" membership still costs the drive`,ok:true},
        {label:`Yes — free memberships are always worth it`,ok:false,mis:'ignores-trip-cost'},
        {label:`No — memberships are always scams`,ok:false,mis:'trip-math'},
        {label:`Yes — ${v.money(gap)}/gal is the whole story`,ok:false,mis:'small-per-unit'}],
      hint:'"Free" covers the membership. Who covers the drive?',
      good:Math.round((pump-12/26*priceA)*100)/100>0?`Right: the drive is cheap enough here.`:`Right: free membership, paid drive — the deal loses.`,
      bad:`${v.money(pump)} − ${v.money(Math.round(12/26*priceA*100)/100)} = ${v.money(Math.round((pump-12/26*priceA)*100)/100)}.`,
      why:`"Free" describes the membership, not the trip. The drive is the price of the deal.`};
  }},
{ id:'gas-value-compare-06', verb:'compare', part:6, tier:'independent', skill:'gas-value',
  gen:(v)=>{
    const person=v.person();
    const gal=v.int(11,15);
    const priceA=Math.round(v.cents(3.10,3.90)*100)/100;
    const gapW=Math.round(v.cents(0.08,0.15)*100)/100;
    const gapS=Math.round(v.cents(0.18,0.30)*100)/100;
    const miles=v.int(8,14), mpg=v.int(22,30);
    const pumpW=Math.round(gal*gapW*100)/100, pumpS=Math.round(gal*gapS*100)/100;
    const trip=Math.round(miles/mpg*priceA*100)/100;
    const realW=Math.round((pumpW-trip)*100)/100, realS=Math.round((pumpS-trip)*100)/100;
    return {
      context:`<p><b>Weekday:</b> station B is ${v.money(gapW)}/gal cheaper — pump ${v.money(pumpW)}, trip ${v.money(trip)} → real ${v.money(realW)}.</p><p><b>Saturday sale:</b> B is ${v.money(gapS)}/gal cheaper — pump ${v.money(pumpS)}, trip ${v.money(trip)} → real ${v.money(realS)}.</p>`,
      q:`${person} needs ${gal} gallons. When is the drive worth it?`,
      choices:[
        realW>0?{label:`Both days — ${v.money(realW)} weekday and ${v.money(realS)} Saturday`,ok:true}
        :realS>0?{label:`Saturday only — weekday loses ${v.money(Math.abs(realW))}, Saturday wins ${v.money(realS)}`,ok:true}
        :{label:`Neither — weekday ${v.money(realW)}, Saturday ${v.money(realS)}; the trip wins both`,ok:true},
        {label:`Weekday only — sales are traps`,ok:false,mis:'trip-math'},
        {label:`Both — the pump gap is all that matters`,ok:false,mis:'ignores-trip-cost'},
        {label:`Neither — driving for gas is never worth it`,ok:false,mis:'trip-math'}],
      hint:'Same trip, different gaps. Two subtractions.',
      good:realW>0?`Right: both win.`:`Right: only Saturday's gap beats the trip.`,
      bad:`Weekday: ${v.money(pumpW)} − ${v.money(trip)} = ${v.money(realW)}. Saturday: ${v.money(pumpS)} − ${v.money(trip)} = ${v.money(realS)}.`,
      why:`The trip cost is fixed; the gap is not. "Worth it" can change day to day — recheck, don't assume.`};
  }},
/* ---- predict x6 (part 6) ---- */
{ id:'gas-value-predict-01', verb:'predict', part:6, tier:'independent', skill:'gas-value',
  gen:(v)=>{
    const person=v.person();
    const loss=Math.round(v.cents(1,3)*100)/100;
    return {
      q:`${person} drives 15 extra miles round trip every week for "cheap gas" without ever doing the math — losing about ${v.money(loss)} a week vs the closer station. What is the yearly result?`,
      choices:[
        {label:`About ${v.money(Math.round(loss*52*100)/100)} a year lost — ${v.money(loss)} × 52 weeks of unpriced driving`,ok:true},
        {label:`Big savings — cheap gas always wins eventually`,ok:false,mis:'ignores-trip-cost'},
        {label:`About $0 — small weekly amounts do not add up`,ok:false,mis:'small-per-unit'},
        {label:`The car gets better with the exercise`,ok:false}],
      hint:'Weekly loss × 52.',
      good:`Right: ${v.money(loss)} × 52 = ${v.money(Math.round(loss*52*100)/100)}.`,
      bad:`${v.money(loss)} a week × 52 = ${v.money(Math.round(loss*52*100)/100)} a year. The "cheap gas" habit is a subscription to losing.`,
      why:`Unpriced driving compounds. A small weekly loss is a big yearly habit — predictable from week one.`};
  }},
{ id:'gas-value-predict-02', verb:'predict', part:6, tier:'independent', skill:'gas-value',
  gen:(v)=>{
    const person=v.person();
    return {
      q:`${person} starts combining the cheap-gas fill-up with the weekly grocery trip that already passes the station. What happens to the real savings?`,
      choices:[
        {label:`They jump — the trip cost drops to $0.00, so the full pump gap becomes real`,ok:true},
        {label:`Nothing changes — errands do not affect gas math`,ok:false,mis:'ignores-trip-cost'},
        {label:`They drop — combined trips use more gas`,ok:false,mis:'trip-math'},
        {label:`The pump gap shrinks when you combine trips`,ok:false}],
      hint:'New miles = 0.',
      good:`Right: $0.00 trip cost, full pump savings real.`,
      bad:`Before: pump − trip. After: pump − $0.00 = pump. The errand was happening anyway — the detour disappears.`,
      why:`Errand-stacking is the highest-ROI move in gas math: it deletes the trip cost without deleting the savings.`};
  }},
{ id:'gas-value-predict-03', verb:'predict', part:6, tier:'independent', skill:'gas-value',
  gen:(v)=>{
    const person=v.person();
    const gal=v.int(12,16);
    const save=Math.round(v.cents(0.80,1.60)*100)/100;
    return {
      q:`${person} finds an on-route station ${v.money(Math.round(save/gal*100)/100)}/gal cheaper and switches permanently — ${v.money(save)} real savings per ${gal}-gallon fill, zero extra miles. What does a year of fills look like?`,
      choices:[
        {label:`About ${v.money(Math.round(save*52*100)/100)} a year kept — ${v.money(save)} × 52 fills, zero trip cost`,ok:true},
        {label:`About $0 — on-route savings are too small to count`,ok:false,mis:'small-per-unit'},
        {label:`A loss — switching stations always costs more`,ok:false,mis:'trip-math'},
        {label:`The savings shrink every month`,ok:false}],
      hint:'${v.money(save)} × 52. Zero trip cost, every time.',
      good:`Right: ${v.money(Math.round(save*52*100)/100)} a year.`,
      bad:`${v.money(save)} per fill × 52 = ${v.money(Math.round(save*52*100)/100)}. On-route means the trip cost stays $0.00 forever.`,
      why:`Zero-trip-cost savings are pure: they repeat every fill without decaying. Small and certain beats big and iffy.`};
  }},
{ id:'gas-value-predict-04', verb:'predict', part:6, tier:'independent', skill:'gas-value',
  gen:(v)=>{
    const person=v.person();
    return {
      q:`Gas prices spike $0.50/gal everywhere. ${person} keeps the same detour habit: 12 extra miles round trip for a station that stays 10¢/gal cheaper. What happens to the real savings?`,
      choices:[
        {label:`They shrink or flip negative — the trip cost rises with the price while the 10¢ gap stays flat`,ok:true},
        {label:`They grow — higher prices mean bigger savings`,ok:false,mis:'ignores-trip-cost'},
        {label:`Nothing changes — the gap is what matters`,ok:false,mis:'ignores-trip-cost'},
        {label:`The station gets cheaper to reach`,ok:false,mis:'trip-math'}],
      hint:'Trip cost = (miles ÷ mpg) × price. The gap did not move.',
      good:`Right: the drive gets pricier, the gap does not.`,
      bad:`Trip cost rises with the pump price; the 10¢ gap stays 10¢. The subtraction gets worse every spike — old "worth it" trips flip to losses.`,
      why:`Price spikes punish detours: they inflate the trip cost while the gap stands still. Recheck every habit when prices move.`};
  }},
{ id:'gas-value-predict-05', verb:'predict', part:6, tier:'independent', skill:'gas-value',
  gen:(v)=>{
    const person=v.person();
    const gal=v.int(10,14);
    return {
      q:`${person} trades a 20-mpg car for a 35-mpg car but keeps the same cheap-gas detour (10 extra miles round trip, ${gal} gallons). What happens to the trip math?`,
      choices:[
        {label:`The trip gets cheaper — (10 ÷ 35) burns fewer gallons than (10 ÷ 20), so more detours become worth it`,ok:true},
        {label:`Nothing changes — mpg does not affect the math`,ok:false,mis:'trip-math'},
        {label:`The trip gets more expensive — efficient cars cost more to drive`,ok:false},
        {label:`The pump gap shrinks with better mpg`,ok:false,mis:'ignores-trip-cost'}],
      hint:'Trip cost = (miles ÷ mpg) × price. mpg went up.',
      good:`Right: fewer gallons burned per detour.`,
      bad:`Old trip: (10 ÷ 20) × price. New trip: (10 ÷ 35) × price — about 43% cheaper per detour. The same gaps now win more often.`,
      why:`mpg is a lever on the trip cost. Better mileage does not change the pump gap — it shrinks the price of chasing it.`};
  }},
{ id:'gas-value-predict-06', verb:'predict', part:6, tier:'independent', skill:'gas-value',
  gen:(v)=>{
    const person=v.person();
    return {
      q:`A new station opens next door to ${person} at the area's lowest price. ${person} stops all detours and fills there. What is the predictable result?`,
      choices:[
        {label:`Maximum real savings with zero trip cost — the pump gap is captured with no drive at all`,ok:true},
        {label:`Higher spending — nearby stations are always pricier`,ok:false,mis:'trip-math'},
        {label:`No change — station location does not matter`,ok:false,mis:'ignores-trip-cost'},
        {label:`The savings shrink — convenience costs extra`,ok:false}],
      hint:'Lowest price + zero extra miles.',
      good:`Right: full pump gap, $0.00 trip cost, every fill.`,
      bad:`Pump gap: captured. Trip cost: $0.00. That is the best possible version of the equation — no detour can beat it.`,
      why:`The ideal gas decision is the lowest pump price at zero extra miles. Everything else is that, minus the drive.`};
  }},
/* ---- build x5 (part 6; targets in cents, must sum to totalCents) ---- */
{ id:'gas-value-build-01', verb:'build', part:6, tier:'independent', skill:'gas-value',
  gen:(v)=>{
    const total=v.pick([12000,15000,18000]);
    const fuel=Math.round(total*0.8/100)*100;
    const detour=Math.round(total*0.1/100)*100;
    const buffer=total-fuel-detour;
    return {
      h:'Build it: split the monthly fuel budget',
      body:`<p>Split ${v.money(total/100)} for the month: fuel at the regular station, a detour fund for proven cheap-gas trips, and a buffer. The detour fund only spends on trips the math approves.</p>`,
      totalDollars: Math.round(total/100),
      buckets:[{id:'fuel',label:'Regular fuel'},{id:'detour',label:'Detour fund'},{id:'buffer',label:'Buffer'}],
      targets:{fuel:Math.round(fuel/100), detour:Math.round(detour/100), buffer:Math.round(buffer/100)},
      hint:'Most to regular fuel; the detour fund stays small and math-gated.',
      good:`${v.money(fuel/100)} fuel, ${v.money(detour/100)} detour fund, ${v.money(buffer/100)} buffer.`,
      bad:`Fuel first, then a small detour fund, then the buffer. Sum: ${v.money(total/100)}.`,
      why:'A gated detour fund lets cheap-gas trips happen only when the subtraction says yes.'};
  }},
{ id:'gas-value-build-02', verb:'build', part:6, tier:'independent', skill:'gas-value',
  gen:(v)=>{
    const total=v.pick([8000,10000,12000]);
    const commute=Math.round(total*0.7/100)*100;
    const errands=Math.round(total*0.2/100)*100;
    const cheap=total-commute-errands;
    return {
      h:'Build it: split the driving budget',
      body:`<p>Split ${v.money(total/100)} for driving: commute fuel (fixed), errand fuel (route-planned), and a cheap-gas chase fund for on-route deals only.</p>`,
      totalDollars: Math.round(total/100),
      buckets:[{id:'commute',label:'Commute fuel'},{id:'errands',label:'Errand fuel'},{id:'cheap',label:'On-route deals'}],
      targets:{commute:Math.round(commute/100), errands:Math.round(errands/100), cheap:Math.round(cheap/100)},
      hint:'Commute first; the chase fund only covers on-route deals.',
      good:`${v.money(commute/100)} commute, ${v.money(errands/100)} errands, ${v.money(cheap/100)} on-route deals.`,
      bad:`Commute biggest, errands next, chase fund small. Sum: ${v.money(total/100)}.`,
      why:'On-route deals have zero trip cost — the chase fund only pays for the free-money kind.'};
  }},
{ id:'gas-value-build-03', verb:'build', part:6, tier:'independent', skill:'gas-value',
  gen:(v)=>{
    const total=v.pick([20000,25000,30000]);
    const truck=Math.round(total*0.6/100)*100;
    const car=Math.round(total*0.25/100)*100;
    const savings=total-truck-car;
    return {
      h:'Build it: split the two-vehicle fuel budget',
      body:`<p>Split ${v.money(total/100)} across two vehicles: the work truck (thirsty — detours cost it more) and the car (efficient — detours cost less). Leftover goes to savings.</p>`,
      totalDollars: Math.round(total/100),
      buckets:[{id:'truck',label:'Truck fuel'},{id:'car',label:'Car fuel'},{id:'savings',label:'Savings'}],
      targets:{truck:Math.round(truck/100), car:Math.round(car/100), savings:Math.round(savings/100)},
      hint:'The thirsty truck gets the bigger slice — and fewer detours.',
      good:`${v.money(truck/100)} truck, ${v.money(car/100)} car, ${v.money(savings/100)} savings.`,
      bad:`Truck first (bigger), car next, savings last. Sum: ${v.money(total/100)}.`,
      why:'mpg changes the trip math per vehicle — the budget splits where the math splits.'};
  }},
{ id:'gas-value-build-04', verb:'build', part:6, tier:'independent', skill:'gas-value',
  gen:(v)=>{
    const total=v.pick([6000,9000,12000]);
    const fillups=Math.round(total*0.75/100)*100;
    const verify=Math.round(total*0.15/100)*100;
    const spare=total-fillups-verify;
    return {
      h:'Build it: split the fill-up plan',
      body:`<p>Split ${v.money(total/100)} for fill-ups: the fills themselves, a verify jar (for testing one new cheap station with the trip math), and a spare.</p>`,
      totalDollars: Math.round(total/100),
      buckets:[{id:'fillups',label:'Fill-ups'},{id:'verify',label:'Verify jar'},{id:'spare',label:'Spare'}],
      targets:{fillups:Math.round(fillups/100), verify:Math.round(verify/100), spare:Math.round(spare/100)},
      hint:'Fills first; the verify jar tests one new station at a time.',
      good:`${v.money(fillups/100)} fill-ups, ${v.money(verify/100)} verify jar, ${v.money(spare/100)} spare.`,
      bad:`Fill-ups biggest, verify jar small, spare last. Sum: ${v.money(total/100)}.`,
      why:'New stations earn trust one verified trip at a time — the verify jar funds the test, not the habit.'};
  }},
{ id:'gas-value-build-05', verb:'build', part:6, tier:'independent', skill:'gas-value',
  gen:(v)=>{
    const total=v.pick([15000,18000,21000]);
    const planned=Math.round(total*0.65/100)*100;
    const combined=Math.round(total*0.2/100)*100;
    const audit=total-planned-combined;
    return {
      h:'Build it: split the road-trip fuel plan',
      body:`<p>Split ${v.money(total/100)} for a road trip: planned-route fuel, combined-errand fuel (stops already on the route), and an audit jar for checking prices along the way.</p>`,
      totalDollars: Math.round(total/100),
      buckets:[{id:'planned',label:'Planned route'},{id:'combined',label:'Combined stops'},{id:'audit',label:'Price audit'}],
      targets:{planned:Math.round(planned/100), combined:Math.round(combined/100), audit:Math.round(audit/100)},
      hint:'Planned route first; combined stops are the free-money kind.',
      good:`${v.money(planned/100)} planned, ${v.money(combined/100)} combined, ${v.money(audit/100)} audit.`,
      bad:`Planned route biggest, combined stops next, audit last. Sum: ${v.money(total/100)}.`,
      why:'On a road trip the route IS the plan — cheap gas on it has zero trip cost by definition.'};
  }},
/* ---- explain x5 (part 6) ---- */
{ id:'gas-value-explain-01', verb:'explain', part:6, tier:'independent', skill:'gas-value',
  gen:(v)=>{
    return {
      h:'Teach it back: real savings',
      prompt:'Explain in your own words the formula for real savings on cheaper gas.',
      keyPoints:['Real savings = pump savings − trip cost','Pump savings = gallons × price gap','Trip cost = (extra miles ÷ mpg) × gas price','If the result is negative, stay at the closer station'],
      modelAnswer:'Real savings is what the pump saves minus what the drive costs. Multiply gallons by the price gap for the pump side, and extra miles divided by mpg times the gas price for the trip side. Subtract — positive means drive, negative means stay.',
      hint:'Two sides, one subtraction.'};
  }},
{ id:'gas-value-explain-02', verb:'explain', part:6, tier:'independent', skill:'gas-value',
  gen:(v)=>{
    return {
      h:'Teach it back: why "¢ cheaper" is not an answer',
      prompt:'Explain in your own words why a "cheaper per gallon" claim is not enough to decide.',
      keyPoints:['The claim only prices the pump, never the trip','The trip cost can be bigger than the pump gap','"Always go to the cheap pump" skips the subtraction','Fact-check every claim: pump savings minus trip cost'],
      modelAnswer:'A per-gallon claim is pump-only: it never prices the drive. The trip can cost more than the gap saves, flipping a "deal" into a loss. "Cheaper per gallon" is the start of the math, not the answer — subtract the trip before deciding.',
      hint:'Pump-only vs pump-minus-trip.'};
  }},
{ id:'gas-value-explain-03', verb:'explain', part:6, tier:'independent', skill:'gas-value',
  gen:(v)=>{
    return {
      h:'Teach it back: the zero-trip-cost trick',
      prompt:'Explain in your own words when the trip cost drops to zero.',
      keyPoints:['On your normal route: zero extra miles = zero trip cost','Combined with an errand already going there: no NEW miles','Then the full pump gap is real savings','Errand-stacking is the highest-ROI move in gas math'],
      modelAnswer:'The trip cost is zero whenever the drive adds no new miles: the station sits on your normal route, or you are already going there for an errand. With zero trip cost, the whole pump gap is real savings — which is why combining errands is the best gas move there is.',
      hint:'No NEW miles = no trip cost.'};
  }},
{ id:'gas-value-explain-04', verb:'explain', part:6, tier:'independent', skill:'gas-value',
  gen:(v)=>{
    return {
      h:'Teach it back: why mpg changes the verdict',
      prompt:'Explain in your own words why the same cheap-gas trip can be worth it for one car and not another.',
      keyPoints:['mpg sits inside the trip-cost formula: (miles ÷ mpg) × price','Thirstier cars burn more gallons per detour','Same pump gap, bigger trip cost for the thirsty car','The "deal" is per-car, not universal'],
      modelAnswer:'The trip cost divides miles by mpg, so a thirsty car burns more gallons on the same detour. Two cars chasing the same pump gap get different trip costs — and different verdicts. There is no universal "worth it"; the car you drive is part of the math.',
      hint:'Same trip, different mpg.'};
  }},
{ id:'gas-value-explain-05', verb:'explain', part:6, tier:'independent', skill:'gas-value',
  gen:(v)=>{
    return {
      h:'Teach it back: critiquing a viral gas claim',
      prompt:'Explain in your own words how to fact-check a viral "drive here for cheap gas!" post.',
      keyPoints:['Compute the pump savings: gallons × gap','Compute the trip cost: (extra miles ÷ mpg) × price','Subtract: positive = the post survives, negative = it fails','Viral posts are pump-only — the trip is the fact-check'],
      modelAnswer:'Fact-check any gas claim with the subtraction: gallons times the gap for the pump side, extra miles divided by mpg times the price for the trip side. If the result is positive the claim survives (smaller than advertised); if negative, the "deal" loses money. Viral posts never include the trip — you have to.',
      hint:'Pump minus trip = the fact-check.'};
  }},
],
'subscriptions-lesson': [
/* ---- choice x8 (part 6: critique subscription stacks) ---- */
{ id:'subscriptions-lesson-choice-01', verb:'choice', part:6, tier:'independent', skill:'subscriptions-lesson',
  gen:(v)=>{
    const person=v.person();
    const subs=[['music streaming','video streaming'],['a fitness app','cloud storage'],['a news app','a gaming service']];
    const [s1,s2]=v.pick(subs);
    const m1=Math.round(v.cents(7.99,16.99)*100)/100, m2=Math.round(v.cents(4.99,12.99)*100)/100;
    const monthly=Math.round((m1+m2)*100)/100, yearly=Math.round(monthly*12*100)/100;
    return {
      q:`${person} pays ${v.money(m1)}/month for ${s1} and ${v.money(m2)}/month for ${s2}. What is the real yearly size of these two subscriptions?`,
      choices:[
        {label:`${v.money(yearly)}/year — (${v.money(m1)} + ${v.money(m2)}) × 12`,ok:true},
        {label:`${v.money(monthly)}/month — the monthly number is the real size`,ok:false,mis:'subscription-blindness'},
        {label:`About ${v.money(monthly)} a year — just add the two monthly prices`,ok:false,mis:'per-day-illusion'},
        {label:`${v.money(Math.round(monthly*6*100)/100)}/year — multiply by 6 for half a year`,ok:false}],
      hint:'Add, then × 12.',
      good:`Right: ${v.money(monthly)} × 12 = ${v.money(yearly)}/year.`,
      bad:`Add first: ${v.money(m1)} + ${v.money(m2)} = ${v.money(monthly)}/month. Then × 12 = ${v.money(yearly)}/year.`,
      why:`${v.money(monthly)} feels small; ${v.money(yearly)} is the same money with the costume off. Every subscription is a yearly decision.`};
  }},
{ id:'subscriptions-lesson-choice-02', verb:'choice', part:6, tier:'independent', skill:'subscriptions-lesson',
  gen:(v)=>{
    const person=v.person();
    const sub=v.pick(['a meditation app','a streaming service','a gaming subscription','a news app','cloud storage']);
    const m=Math.round(v.cents(6.99,17.99)*100)/100;
    const yearly=v.money(Math.round(m*12*100)/100);
    const use=v.pick(['daily','a few times a month','twice ever','not once']);
    const keep=use==='daily'||use==='a few times a month';
    return {
      q:`${person} pays ${v.money(m)}/month for ${sub}. In the last three months ${person} opened it ${use}. At ${yearly}/year, keep or cancel?`,
      choices: keep?[
        {label:`Keep — ${use} use earns its ${yearly}/year`,ok:true},
        {label:`Cancel — every subscription is a trap`,ok:false},
        {label:`Keep — canceling wastes the months already paid for`,ok:false,mis:'sunk-subscription'},
        {label:`Cancel — ${v.money(m)}/month is too much for any app`,ok:false,mis:'price-alone-cancels'}]
      :[
        {label:`Cancel — ${yearly}/year for "${use}" is a bad trade; re-subscribe if life changes`,ok:true},
        {label:`Keep — it is only ${v.money(m)}/month`,ok:false,mis:'subscription-blindness'},
        {label:`Keep — ${person} might need it someday`,ok:false,mis:'someday-subscription'},
        {label:`Keep — canceling wastes the three months already paid`,ok:false,mis:'sunk-subscription'}],
      hint:'Recurring cost needs recurring value.',
      good:keep?`Right: ${use} use at ${yearly}/year is money working.`:`Right: "${use}" does not earn ${yearly}/year. Cancel in two minutes; rejoin if life changes.`,
      bad:keep?`${use} is recurring value — the subscription earns its ${yearly}/year.`:`Three months at "${use}" = the value is not recurring. ${yearly}/year for that is a bad trade.`,
      why:keep?`A subscription must earn its cost every month. "${use}" clears that bar at ${yearly}/year.`:`${v.money(m)}/month sounds tiny; ${yearly}/year is the real price of "${use}." Cancel now, re-subscribe if life changes.`};
  }},
{ id:'subscriptions-lesson-choice-03', verb:'choice', part:6, tier:'independent', skill:'subscriptions-lesson',
  gen:(v)=>{
    const person=v.person();
    const svc=v.pick(['a language app','a fitness app','a cloud backup plan','a music service']);
    const daily=Math.round(v.cents(0.89,2.49)*100)/100;
    let monthly=Math.round(v.cents(24.99,59.99)*100)/100;
    let dYear=Math.round(daily*365*100)/100, mYear=Math.round(monthly*12*100)/100;
    if(dYear===mYear){monthly=Math.round((monthly+1)*100)/100;mYear=Math.round(monthly*12*100)/100;}
    const dailyWins=dYear<mYear;
    return {
      q:`${person} can get ${svc} for ${v.money(daily)}/day or ${v.money(monthly)}/month. Which costs less over a full year?`,
      choices:[
        {label:`${v.money(daily)}/day — ${v.money(dYear)}/year`,ok:dailyWins},
        {label:`${v.money(monthly)}/month — ${v.money(mYear)}/year`,ok:!dailyWins},
        {label:`The daily plan — ${v.money(daily)} a day is pocket change`,ok:false,mis:'per-day-illusion'},
        {label:`The monthly plan — ${v.money(monthly)}/month is the number that matters`,ok:false,mis:'subscription-blindness'}],
      hint:'Multiply both out to a full year.',
      good:`Right: ${v.money(dYear)} vs ${v.money(mYear)} per year. The costume does not change the money.`,
      bad:`${v.money(daily)} × 365 = ${v.money(dYear)}/year. ${v.money(monthly)} × 12 = ${v.money(mYear)}/year. Compare those.`,
      why:`"Pocket change a day" hides ${v.money(dYear)}/year; the monthly number hides ${v.money(mYear)}/year. Multiply everything to yearly before judging.`};
  }},
{ id:'subscriptions-lesson-choice-04', verb:'choice', part:6, tier:'independent', skill:'subscriptions-lesson',
  gen:(v)=>{
    const person=v.person();
    const subs=v.shuffle([['music',9.99],['video',15.99],['fitness app',7.99],['cloud',2.99],['news',4.99],['gaming',11.99]]);
    const three=subs.slice(0,3);
    const monthly=Math.round(three.reduce((s,x)=>s+x[1],0)*100)/100;
    const yearly=Math.round(monthly*12*100)/100;
    const names=three.map(x=>x[0]).join(', ');
    return {
      q:`${person}'s stack: ${names} — ${three.map(x=>v.money(x[1])+'/mo').join(', ')}. What is the stack's real yearly size?`,
      choices:[
        {label:`${v.money(yearly)}/year — ${v.money(monthly)}/month × 12`,ok:true},
        {label:`${v.money(monthly)} — the monthly total is the real size`,ok:false,mis:'subscription-blindness'},
        {label:`About ${v.money(Math.round(monthly*100)/100)} a year — add the monthlies and stop`,ok:false,mis:'per-day-illusion'},
        {label:`${v.money(Math.round(monthly*10*100)/100)}/year — ten months is close enough`,ok:false}],
      hint:'Monthly total × 12.',
      good:`Right: ${v.money(monthly)} × 12 = ${v.money(yearly)}/year.`,
      bad:`${three.map(x=>v.money(x[1])).join(' + ')} = ${v.money(monthly)}/month. × 12 = ${v.money(yearly)}/year.`,
      why:`Stacks hide in monthly pieces. The yearly total — ${v.money(yearly)} — is the number that actually leaves the account.`};
  }},
{ id:'subscriptions-lesson-choice-05', verb:'choice', part:6, tier:'independent', skill:'subscriptions-lesson',
  gen:(v)=>{
    const person=v.person();
    const m=Math.round(v.cents(4.99,9.99)*100)/100;
    const yearly=Math.round(m*12*100)/100;
    const uses=v.pick([0,1,2]);
    return {
      q:`${person} pays ${v.money(m)}/month for an app opened ${uses===0?'zero':uses} time${uses===1?'':'s'} in three months. What does each actual use cost at ${v.money(yearly)}/year?`,
      choices:[
        uses===0?{label:`Infinite — ${v.money(yearly)}/year for zero uses is pure waste; cancel it`,ok:true}
        :{label:`${v.money(Math.round(yearly/uses*100)/100)} per use — ${v.money(yearly)} ÷ ${uses} uses`,ok:true},
        {label:`${v.money(m)} per use — the monthly price is the per-use price`,ok:false,mis:'subscription-blindness'},
        {label:`It is free — unused subscriptions do not count`,ok:false,mis:'sunk-subscription'},
        {label:`${v.money(Math.round(m/30*100)/100)} per use — divide by days`,ok:false,mis:'per-day-illusion'}],
      hint:'Yearly cost ÷ actual uses.',
      good:uses===0?`Right: division by zero — the money buys nothing.`:`Right: ${v.money(yearly)} ÷ ${uses} = ${v.money(Math.round(yearly/uses*100)/100)} per use.`,
      bad:uses===0?`${v.money(yearly)}/year, 0 uses. Every dollar is waste.`:`${v.money(yearly)} ÷ ${uses} uses = ${v.money(Math.round(yearly/uses*100)/100)} each. That is the real per-use price.`,
      why:`Per-use cost exposes dead subscriptions: ${uses===0?'infinite':v.money(Math.round(yearly/uses*100)/100)} per use is not a subscription — it is a leak.`};
  }},
{ id:'subscriptions-lesson-choice-06', verb:'choice', part:6, tier:'independent', skill:'subscriptions-lesson',
  gen:(v)=>{
    const person=v.person();
    const a=v.pick(['music streaming','video streaming']);
    const b=v.pick(['a fitness app','a meditation app','cloud storage']);
    const aOld=Math.round(v.cents(9.99,14.99)*100)/100, aNew=Math.round((aOld+v.cents(2,5))*100)/100;
    const bOld=Math.round(v.cents(4.99,9.99)*100)/100, bNew=Math.round((bOld+v.cents(1,4))*100)/100;
    const total=Math.round((aNew+bNew)*12*100)/100;
    return {
      q:`${person} uses ${a} daily (just rose ${v.money(aOld)} → ${v.money(aNew)}/mo) and opened ${b} twice ever (rose ${v.money(bOld)} → ${v.money(bNew)}/mo). New yearly total: ${v.money(total)}. What is the move?`,
      choices:[
        {label:`Cancel ${b}, keep ${a} — the hike is a free reminder to cut dead weight`,ok:true},
        {label:`Keep both — the hikes are only a few dollars a month`,ok:false,mis:'subscription-blindness'},
        {label:`Cancel both — price hikes are always a scam`,ok:false},
        {label:`Keep ${b} too — canceling wastes what was already paid`,ok:false,mis:'sunk-subscription'}],
      hint:'Which subscription earns its cost at the NEW prices?',
      good:`Right: ${v.money(total)} drops to ${v.money(Math.round(aNew*12*100)/100)}/year.`,
      bad:`Re-audit: ${a} is daily (${v.money(Math.round(aNew*12*100)/100)}/year — earns it). ${b} is "twice ever" (${v.money(Math.round(bNew*12*100)/100)}/year — does not). Cut ${b}.`,
      why:`Price hikes count on you not noticing. Each one is a free reminder: would you sign up today at this price? For ${b}, no.`};
  }},
{ id:'subscriptions-lesson-choice-07', verb:'choice', part:6, tier:'independent', skill:'subscriptions-lesson',
  gen:(v)=>{
    const person=v.person();
    const m1=Math.round(v.cents(12.99,19.99)*100)/100;
    const m2=Math.round(v.cents(5.99,9.99)*100)/100;
    const y1=Math.round(m1*12*100)/100, y2=Math.round(m2*12*100)/100;
    return {
      q:`${person} has two video subscriptions: ${v.money(m1)}/mo (watched daily) and ${v.money(m2)}/mo (opened once in two months). Yearly: ${v.money(y1)} vs ${v.money(y2)}. What is the smart audit?`,
      choices:[
        {label:`Keep the daily one, cancel the dusty one — ${v.money(y2)}/year for one opening is a bad trade`,ok:true},
        {label:`Keep both — two subscriptions means twice the value`,ok:false,mis:'subscription-blindness'},
        {label:`Cancel the daily one — it costs more`,ok:false,mis:'cheaper-means-keep'},
        {label:`Keep the dusty one — it might get good someday`,ok:false,mis:'someday-subscription'}],
      hint:'Value is use, not count. Which one earns its yearly price?',
      good:`Right: daily use earns ${v.money(y1)}/year; one opening does not earn ${v.money(y2)}.`,
      bad:`Daily: ${v.money(y1)}/year of real value. Dusty: ${v.money(y2)}/year for one opening. The audit keeps earners, cuts freeloaders.`,
      why:`Duplicate subscriptions compete for the same hours. The one that loses the hours should lose the subscription.`};
  }},
{ id:'subscriptions-lesson-choice-08', verb:'choice', part:6, tier:'independent', skill:'subscriptions-lesson',
  gen:(v)=>{
    const person=v.person();
    const trial=v.pick(['a streaming trial','a fitness app trial','a meal-kit trial']);
    const m=Math.round(v.cents(9.99,19.99)*100)/100;
    return {
      q:`${person}'s free trial of ${trial} ends Friday, then it bills ${v.money(m)}/month. ${person} opened it twice during the trial. What is the call before Friday?`,
      choices:[
        {label:`Cancel before Friday — twice in a trial predicts "${'twice ever'}" at ${v.money(Math.round(m*12*100)/100)}/year`,ok:true},
        {label:`Let it bill — it is only ${v.money(m)}/month`,ok:false,mis:'subscription-blindness'},
        {label:`Let it bill — maybe it gets better after the trial`,ok:false,mis:'someday-subscription'},
        {label:`Let it bill — canceling wastes the free trial`,ok:false,mis:'sunk-subscription'}],
      hint:'The trial IS the audition. What did it show?',
      good:`Right: two opens in a free trial = the verdict. Cancel before the billing starts.`,
      bad:`Trial use: twice. That predicts the subscription's future at ${v.money(Math.round(m*12*100)/100)}/year. Cancel before Friday — rejoin if life changes.`,
      why:`Free trials are auditions with a deadline. "Twice" is the data — decide before the billing decides for you.`};
  }},
/* ---- sort x6 (part 6) ---- */
{ id:'subscriptions-lesson-sort-01', verb:'sort', part:6, tier:'independent', skill:'subscriptions-lesson',
  gen:(v)=>{
    const items=v.shuffle([
      {label:'Music app, used daily',a:'keep',why:'Daily use earns the yearly cost.'},
      {label:'Fitness app, opened twice ever',a:'cancel',why:'$95+/year for "twice ever."'},
      {label:'Cloud storage, full of files',a:'keep',why:'Real, recurring use.'},
      {label:'News app, never opened',a:'cancel',why:'Zero use, full price.'},
      {label:'Video service, watched weekly',a:'keep',why:'Weekly value clears the bar.'},
      {label:'Gaming service, untouched 3 months',a:'cancel',why:'No recurring value.'},
      {label:'Meditation app, used nightly',a:'keep',why:'Nightly use earns it.'},
      {label:'"Might need it someday" app',a:'cancel',why:'Someday is not a use.'}]);
    return {
      h:'Sort it: keep or cancel?',
      body:'<p>Sort each subscription by the audit rule: recurring cost needs recurring value.</p>',
      buckets:['Keep','Cancel'],
      items};
  }},
{ id:'subscriptions-lesson-sort-02', verb:'sort', part:6, tier:'independent', skill:'subscriptions-lesson',
  gen:(v)=>{
    const items=v.shuffle([
      {label:'$9.99/month → $119.88/year',a:'yearly thinking',why:'The real size.'},
      {label:'"$9.99 is pocket change"',a:'monthly thinking',why:'Hides the year.'},
      {label:'"$0.33/day sounds like nothing"',a:'monthly thinking',why:'Per-day is the deepest costume.'},
      {label:'Three subs = $33.97/mo = $407.64/yr',a:'yearly thinking',why:'Stacks add up yearly.'},
      {label:'"It is only $4.99"',a:'monthly thinking',why:'"Only" hides ×12.'},
      {label:'$15.99/mo → $191.88/yr',a:'yearly thinking',why:'Same money, honest scale.'},
      {label:'"Canceling saves pennies"',a:'monthly thinking',why:'It saves $191.88.'},
      {label:'$7.99/mo → $95.88/yr',a:'yearly thinking',why:'The number that matters.'}]);
    return {
      h:'Sort it: yearly thinking or monthly thinking?',
      body:'<p>Sort each statement by whether it sees the subscription\'s real size.</p>',
      buckets:['Yearly thinking','Monthly thinking'],
      items};
  }},
{ id:'subscriptions-lesson-sort-03', verb:'sort', part:6, tier:'independent', skill:'subscriptions-lesson',
  gen:(v)=>{
    const items=v.shuffle([
      {label:'Used daily',a:'earns its cost',why:'Recurring value.'},
      {label:'Opened twice ever',a:'does not earn it',why:'No recurring value.'},
      {label:'Watched every week',a:'earns its cost',why:'Weekly value.'},
      {label:'"Might use it someday"',a:'does not earn it',why:'Someday is not use.'},
      {label:'Opened a few times a month',a:'earns its cost',why:'Regular use.'},
      {label:'Forgot it existed',a:'does not earn it',why:'Zero value.'},
      {label:'Used for work daily',a:'earns its cost',why:'Daily value.'},
      {label:'Trial ended, never opened since',a:'does not earn it',why:'The audition failed.'}]);
    return {
      h:'Sort it: earns its cost or does not earn it?',
      body:'<p>Sort each usage pattern by whether it justifies a recurring charge.</p>',
      buckets:['Earns its cost','Does not earn it'],
      items};
  }},
{ id:'subscriptions-lesson-sort-04', verb:'sort', part:6, tier:'independent', skill:'subscriptions-lesson',
  gen:(v)=>{
    const items=v.shuffle([
      {label:'"Canceling wastes what I paid"',a:'sunk-cost thinking',why:'Past payments are gone either way.'},
      {label:'"Would I sign up today at this price?"',a:'clean audit thinking',why:'The only question that matters.'},
      {label:'"I have paid for a year, so keep it"',a:'sunk-cost thinking',why:'The year is spent; the future is the choice.'},
      {label:'"It is only $5/month"',a:'sunk-cost thinking',why:'Hides the $60/year — and the past.'},
      {label:'"Re-subscribe if life changes"',a:'clean audit thinking',why:'Canceling is reversible.'},
      {label:'"I already invested so much"',a:'sunk-cost thinking',why:'Investment is not value.'},
      {label:'"Judge it on next month\'s value"',a:'clean audit thinking',why:'Forward-looking.'},
      {label:'"Keep it to get my money\'s worth"',a:'sunk-cost thinking',why:'Future payments are not past value.'}]);
    return {
      h:'Sort it: sunk-cost thinking or clean audit thinking?',
      body:'<p>Sort each thought by whether past payments are driving the decision.</p>',
      buckets:['Sunk-cost thinking','Clean audit thinking'],
      items};
  }},
{ id:'subscriptions-lesson-sort-05', verb:'sort', part:6, tier:'independent', skill:'subscriptions-lesson',
  gen:(v)=>{
    const items=v.shuffle([
      {label:'$1.99/day → $726.35/year',a:'bigger than it looks',why:'Per-day hides the year.'},
      {label:'$0.99/day → $361.35/year',a:'bigger than it looks',why:'Pocket change × 365.'},
      {label:'$29.99/month → $359.88/year',a:'bigger than it looks',why:'Monthly hides ×12.'},
      {label:'$4.99/month → $59.88/year',a:'about what it looks',why:'Small stays small yearly.'},
      {label:'$2.49/day → $908.85/year',a:'bigger than it looks',why:'Daily is the deepest costume.'},
      {label:'$1/month → $12/year',a:'about what it looks',why:'Tiny stays tiny.'},
      {label:'$14.99/month → $179.88/year',a:'bigger than it looks',why:'"Only $15" is $180.'},
      {label:'Free trial → $0',a:'about what it looks',why:'Free is free — until it bills.'}]);
    return {
      h:'Sort it: bigger than it looks, or about what it looks?',
      body:'<p>Sort each price by whether the billing period hides its real yearly size.</p>',
      buckets:['Bigger than it looks','About what it looks'],
      items};
  }},
{ id:'subscriptions-lesson-sort-06', verb:'sort', part:6, tier:'independent', skill:'subscriptions-lesson',
  gen:(v)=>{
    const items=v.shuffle([
      {label:'Price just went up',a:'re-audit now',why:'The value question changed.'},
      {label:'Usage dropped to zero',a:'re-audit now',why:'Value left; cost stayed.'},
      {label:'A duplicate subscription appeared',a:'re-audit now',why:'Two compete for the same hours.'},
      {label:'Still used daily, same price',a:'no audit needed',why:'Nothing changed.'},
      {label:'Free trial about to bill',a:'re-audit now',why:'Deadline decides.'},
      {label:'New cheaper alternative exists',a:'re-audit now',why:'The comparison changed.'},
      {label:'Same use, same price, still fits budget',a:'no audit needed',why:'Earning its keep.'},
      {label:'Life changed (new job, move)',a:'re-audit now',why:'Needs changed.'}]);
    return {
      h:'Sort it: re-audit now or no audit needed?',
      body:'<p>Sort each trigger by whether the subscription deserves a fresh audit.</p>',
      buckets:['Re-audit now','No audit needed'],
      items};
  }},
/* ---- spot x6 (part 6: 01-03, part 7: 04-06) ---- */
{ id:'subscriptions-lesson-spot-01', verb:'spot', part:6, tier:'independent', skill:'subscriptions-lesson',
  gen:(v)=>{
    const person=v.person();
    const m=Math.round(v.cents(11.99,16.99)*100)/100;
    return {
      scenario:`<p>${person} defends a subscription:</p><ul><li>Cost: ${v.money(m)}/month (${v.money(Math.round(m*12*100)/100)}/year)</li><li>Opened: twice ever</li><li>"It is only ${v.money(m)} a month — canceling barely saves anything."</li></ul>`,
      q:'What is the mistake?',
      choices:[
        {label:`"${'Only'} ${v.money(m)}" hides ${v.money(Math.round(m*12*100)/100)}/year for "twice ever" — the monthly framing is the mistake`,ok:true},
        {label:`The mistake is the app — all subscriptions are traps`,ok:false},
        {label:`${v.money(m)}/month really is pocket change`,ok:false,mis:'subscription-blindness'},
        {label:`Twice ever is plenty of use for ${v.money(m)}/month`,ok:false,mis:'someday-subscription'}],
      hint:'Multiply to yearly. Then judge "twice ever."',
      good:`Right: ${v.money(Math.round(m*12*100)/100)}/year for two opens.`,
      bad:`Yearly: ${v.money(m)} × 12 = ${v.money(Math.round(m*12*100)/100)}. Use: twice ever. "${'Only'} ${v.money(m)}" is the costume; ${v.money(Math.round(m*12*100)/100)} for nothing is the truth.`,
      why:`Monthly framing shrinks the number; yearly framing shows it. "Barely saves anything" is wrong by ${v.money(Math.round(m*12*100)/100)} a year.`};
  }},
{ id:'subscriptions-lesson-spot-02', verb:'spot', part:6, tier:'independent', skill:'subscriptions-lesson',
  gen:(v)=>{
    const person=v.person();
    const m=Math.round(v.cents(7.99,12.99)*100)/100;
    return {
      scenario:`<p>${person} keeps a dead subscription:</p><ul><li>Cost: ${v.money(m)}/month</li><li>Use: zero opens in 4 months</li><li>"I have paid for 4 months already — canceling now wastes that money."</li></ul>`,
      q:'What is the mistake?',
      choices:[
        {label:`The 4 months are gone either way — keeping it wastes FUTURE months too`,ok:true},
        {label:`The mistake is not using it more`,ok:false},
        {label:`Canceling really does waste the 4 months paid`,ok:false,mis:'sunk-subscription'},
        {label:`${v.money(m)}/month is too small to audit`,ok:false,mis:'subscription-blindness'}],
      hint:'Past payments are gone. What does keeping it cost NEXT month?',
      good:`Right: sunk cost. The only question is next month's value.`,
      bad:`4 × ${v.money(m)} is spent — canceling or keeping cannot unspend it. Keeping it costs ${v.money(m)} MORE every future month for zero value.`,
      why:`Sunk-cost thinking protects past payments by sacrificing future money. The audit asks: would you sign up today at this price for this use?`};
  }},
{ id:'subscriptions-lesson-spot-03', verb:'spot', part:6, tier:'independent', skill:'subscriptions-lesson',
  gen:(v)=>{
    const person=v.person();
    const d=Math.round(v.cents(1.49,2.99)*100)/100;
    return {
      scenario:`<p>${person} on a daily-billed app:</p><ul><li>Cost: ${v.money(d)}/day — "pocket change!"</li><li>Yearly: ${v.money(Math.round(d*365*100)/100)}</li><li>"It is just ${v.money(d)} a day."</li></ul>`,
      q:'What is the mistake?',
      choices:[
        {label:`"Pocket change" × 365 = ${v.money(Math.round(d*365*100)/100)}/year — the daily framing hides the real size`,ok:true},
        {label:`Daily billing is always cheaper than monthly`,ok:false,mis:'per-day-illusion'},
        {label:`${v.money(d)} a day really is nothing`,ok:false,mis:'per-day-illusion'},
        {label:`The mistake is not paying yearly upfront`,ok:false}],
      hint:'${v.money(d)} × 365.',
      good:`Right: ${v.money(Math.round(d*365*100)/100)}/year is not pocket change.`,
      bad:`${v.money(d)} × 365 = ${v.money(Math.round(d*365*100)/100)} a year. "Just ${v.money(d)} a day" is the deepest costume subscriptions wear.`,
      why:`Per-day pricing is designed to feel tiny. The yearly number — ${v.money(Math.round(d*365*100)/100)} — is the same money, unhidden.`};
  }},
{ id:'subscriptions-lesson-spot-04', verb:'spot', part:7, tier:'independent', skill:'subscriptions-lesson',
  gen:(v)=>{
    const person=v.person();
    const m=Math.round(v.cents(8.99,13.99)*100)/100;
    const oldM=Math.round((m-3)*100)/100;
    return {
      scenario:`<p>${person} after a price hike:</p><ul><li>Was ${v.money(oldM)}/month, now ${v.money(m)}/month</li><li>Use: opened once in two months</li><li>"It is only $3 more — not worth the hassle of canceling."</li></ul>`,
      q:'What is the mistake?',
      choices:[
        {label:`The hike is a free audit reminder — "${'once in two months'}" never earned ${v.money(Math.round(oldM*12*100)/100)}/year, let alone ${v.money(Math.round(m*12*100)/100)}`,ok:true},
        {label:`$3 more really is not worth any hassle`,ok:false,mis:'subscription-blindness'},
        {label:`Price hikes mean the service improved`,ok:false},
        {label:`Canceling always wastes past payments`,ok:false,mis:'sunk-subscription'}],
      hint:'The hike changed the price. Did the value change?',
      good:`Right: the use never justified it — at either price.`,
      bad:`Old yearly: ${v.money(Math.round(oldM*12*100)/100)} for ~6 opens a year. New: ${v.money(Math.round(m*12*100)/100)}. "Only $3 more" defends a subscription that failed the audit before the hike.`,
      why:`Hikes are free reminders to ask: would I sign up today at THIS price? The answer was already no.`};
  }},
{ id:'subscriptions-lesson-spot-05', verb:'spot', part:7, tier:'independent', skill:'subscriptions-lesson',
  gen:(v)=>{
    const person=v.person();
    const cheap=Math.round(v.cents(4.99,7.99)*100)/100;
    const pricey=Math.round(v.cents(12.99,17.99)*100)/100;
    return {
      scenario:`<p>${person} audits two subscriptions:</p><ul><li>Cheap: ${v.money(cheap)}/month, opened twice ever</li><li>Pricey: ${v.money(pricey)}/month, used daily for work</li><li>"Cancel the pricey one — it costs more."</li></ul>`,
      q:'What is the mistake?',
      choices:[
        {label:`Cost alone does not decide — the daily ${v.money(pricey)} earns its keep; the dusty ${v.money(cheap)} earns nothing`,ok:true},
        {label:`The pricey one should go — higher price always loses`,ok:false,mis:'cheaper-means-keep'},
        {label:`Keep both — canceling either wastes money`,ok:false,mis:'sunk-subscription'},
        {label:`Cancel both — subscriptions are traps`,ok:false}],
      hint:'Value is use ÷ cost. Which one has the use?',
      good:`Right: keep the earner, cut the freeloader — regardless of sticker.`,
      bad:`Cheap: ${v.money(Math.round(cheap*12*100)/100)}/year for ~nothing. Pricey: ${v.money(Math.round(pricey*12*100)/100)}/year for daily work value. "Costs more" is not "worth less."`,
      why:`The audit compares value to cost, not cost to cost. A cheap subscription with no use is pure waste; a pricey one with daily use is a tool.`};
  }},
{ id:'subscriptions-lesson-spot-06', verb:'spot', part:7, tier:'independent', skill:'subscriptions-lesson',
  gen:(v)=>{
    const person=v.person();
    const m=Math.round(v.cents(9.99,14.99)*100)/100;
    return {
      scenario:`<p>${person} on a "someday" subscription:</p><ul><li>Cost: ${v.money(m)}/month (${v.money(Math.round(m*12*100)/100)}/year)</li><li>Use: zero in 5 months</li><li>"I will definitely use it when things calm down."</li></ul>`,
      q:'What is the mistake?',
      choices:[
        {label:`"Someday" has cost ${v.money(Math.round(m*5*100)/100)} for 5 months of nothing — cancel now, re-subscribe on the actual someday`,ok:true},
        {label:`Keeping it is smart — someday always comes`,ok:false,mis:'someday-subscription'},
        {label:`${v.money(m)}/month is too small to matter`,ok:false,mis:'subscription-blindness'},
        {label:`Canceling now wastes the 5 months paid`,ok:false,mis:'sunk-subscription'}],
      hint:'5 months × ${v.money(m)}. What did "someday" cost so far?',
      good:`Right: ${v.money(Math.round(m*5*100)/100)} for zero uses.`,
      bad:`${v.money(m)} × 5 = ${v.money(Math.round(m*5*100)/100)} paid for "someday." Canceling is reversible — re-subscribe the week things actually calm down.`,
      why:`"Someday" subscriptions bill in the present for a future that keeps moving. The someday, if it comes, can start the subscription then.`};
  }},
/* ---- compare x6 (part 7) ---- */
{ id:'subscriptions-lesson-compare-01', verb:'compare', part:7, tier:'independent', skill:'subscriptions-lesson',
  gen:(v)=>{
    const person=v.person();
    const mA=Math.round(v.cents(9.99,14.99)*100)/100;
    const mB=Math.round(v.cents(6.99,11.99)*100)/100;
    const yA=Math.round(mA*12*100)/100, yB=Math.round(mB*12*100)/100;
    return {
      context:`<p><b>Plan A:</b> ${v.money(mA)}/month (${v.money(yA)}/year). ${person} uses it daily.</p><p><b>Plan B:</b> ${v.money(mB)}/month (${v.money(yB)}/year). ${person} opened it twice ever.</p>`,
      q:'Which subscription survives the audit?',
      choices:[
        {label:`Plan A — daily use earns ${v.money(yA)}/year; Plan B's ${v.money(yB)} buys "twice ever"`,ok:true},
        {label:`Plan B — it is cheaper`,ok:false,mis:'cheaper-means-keep'},
        {label:`Both — canceling wastes what was paid`,ok:false,mis:'sunk-subscription'},
        {label:`Neither — all subscriptions are traps`,ok:false}],
      hint:'Compare value to cost, not cost to cost.',
      good:`Right: A earns its keep; B does not.`,
      bad:`A: daily value at ${v.money(yA)}/year. B: "twice ever" at ${v.money(yB)}/year. The cheaper one is the worse deal.`,
      why:`The audit keeps earners and cuts freeloaders. Price alone never decides — use does.`};
  }},
{ id:'subscriptions-lesson-compare-02', verb:'compare', part:7, tier:'independent', skill:'subscriptions-lesson',
  gen:(v)=>{
    const person=v.person();
    const svc=v.pick(['cloud storage','a music service','a news app']);
    const m=Math.round(v.cents(4.99,9.99)*100)/100;
    const annual=Math.round(m*12*0.8*100)/100;
    const monthly=Math.round(m*12*100)/100;
    return {
      context:`<p><b>Monthly:</b> ${v.money(m)}/month = ${v.money(monthly)}/year, cancel anytime.</p><p><b>Annual:</b> ${v.money(annual)}/year upfront (20% off), no refunds.</p>`,
      q:`${person} uses ${svc} daily and will for the next year. Which billing wins?`,
      choices:[
        {label:`Annual — certain year-long use locks in ${v.money(Math.round((monthly-annual)*100)/100)} of real savings`,ok:true},
        {label:`Monthly — annual plans are always traps`,ok:false},
        {label:`Annual — and also keep the monthly as backup`,ok:false,mis:'subscription-blindness'},
        {label:`Monthly — paying more keeps you flexible`,ok:false,mis:'sunk-subscription'}],
      hint:'Certain use + discount + no refund risk = ?',
      good:`Right: ${v.money(monthly)} − ${v.money(annual)} = ${v.money(Math.round((monthly-annual)*100)/100)} kept.`,
      bad:`Yearly use is certain, so the no-refund clause has no teeth: ${v.money(monthly)} vs ${v.money(annual)}. Annual wins by ${v.money(Math.round((monthly-annual)*100)/100)}.`,
      why:`Annual billing is a bulk buy: certain use makes the discount real. Uncertain use would flip it — here use is certain.`};
  }},
{ id:'subscriptions-lesson-compare-03', verb:'compare', part:7, tier:'independent', skill:'subscriptions-lesson',
  gen:(v)=>{
    const person=v.person();
    const m=Math.round(v.cents(9.99,15.99)*100)/100;
    const annual=Math.round(m*12*0.8*100)/100;
    return {
      context:`<p><b>Monthly:</b> ${v.money(m)}/month, cancel anytime.</p><p><b>Annual:</b> ${v.money(annual)}/year upfront (20% off), no refunds.</p>`,
      q:`${person} tried it twice and is not sure about next month. Which billing is safer?`,
      choices:[
        {label:`Monthly — uncertain use + no refunds = the annual discount is a trap here`,ok:true},
        {label:`Annual — 20% off is 20% off`,ok:false,mis:'low-price-justifies'},
        {label:`Annual — the discount doubles if you pay upfront`,ok:false,mis:'discount-doubles'},
        {label:`Monthly — monthly is always cheaper`,ok:false,mis:'per-day-illusion'}],
      hint:'The discount is real only if the use is certain. Is it?',
      good:`Right: "twice, not sure" + no refunds = do not prepay the year.`,
      bad:`Annual saves 20% only if all 12 months get used. At "twice, not sure," the likely outcome is paying ${v.money(annual)} for a dead subscription.`,
      why:`Annual plans are bulk buys with a no-refund clause. Uncertain use turns the discount into a prepayment for waste.`};
  }},
{ id:'subscriptions-lesson-compare-04', verb:'compare', part:7, tier:'independent', skill:'subscriptions-lesson',
  gen:(v)=>{
    const person=v.person();
    const fam=Math.round(v.cents(14.99,19.99)*100)/100;
    const solo=Math.round(v.cents(8.99,11.99)*100)/100;
    const users=v.pick([3,4]);
    return {
      context:`<p><b>Family plan:</b> ${v.money(fam)}/month, up to 6 users. ${users} people in ${person}'s house would use it.</p><p><b>Solo plans:</b> ${v.money(solo)}/month each × ${users} = ${v.money(Math.round(solo*users*100)/100)}/month.</p>`,
      q:'Which is the better buy?',
      choices:[
        {label:`Family plan — ${v.money(fam)}/month vs ${v.money(Math.round(solo*users*100)/100)} for solos; shared certain use wins`,ok:true},
        {label:`Solo plans — everyone should pay their own`,ok:false},
        {label:`Family plan — bigger plans are always better`,ok:false,mis:'unit-price-sticker'},
        {label:`Solo plans — the family plan might get canceled`,ok:false,mis:'someday-subscription'}],
      hint:'Compare the totals for the actual users.',
      good:`Right: ${v.money(fam)} < ${v.money(Math.round(solo*users*100)/100)}.`,
      bad:`${users} solos: ${v.money(Math.round(solo*users*100)/100)}/month. Family: ${v.money(fam)}/month. Shared certain use makes the family plan win by ${v.money(Math.round((solo*users-fam)*100)/100)}/month.`,
      why:`Shared certain use is the safest bulk bet — the denominator is the whole house.`};
  }},
{ id:'subscriptions-lesson-compare-05', verb:'compare', part:7, tier:'independent', skill:'subscriptions-lesson',
  gen:(v)=>{
    const person=v.person();
    const m1=Math.round(v.cents(12.99,16.99)*100)/100;
    const m2=Math.round(v.cents(7.99,11.99)*100)/100;
    const y1=Math.round(m1*12*100)/100, y2=Math.round(m2*12*100)/100;
    return {
      context:`<p><b>Service 1:</b> ${v.money(m1)}/month (${v.money(y1)}/year), watched daily.</p><p><b>Service 2:</b> ${v.money(m2)}/month (${v.money(y2)}/year), watched weekly.</p>`,
      q:`${person} can only justify one. Which survives?`,
      choices:[
        {label:`Service 1 — daily use at ${v.money(y1)}/year beats weekly use; keep the earner`,ok:true},
        {label:`Service 2 — it is cheaper`,ok:false,mis:'cheaper-means-keep'},
        {label:`Service 1 — the expensive one is higher quality`,ok:false,mis:'price-means-quality'},
        {label:`Both — one subscription is never enough`,ok:false,mis:'subscription-blindness'}],
      hint:'Hours per dollar, not dollars per month.',
      good:`Right: daily beats weekly at these prices.`,
      bad:`Service 1: daily use, ${v.money(y1)}/year. Service 2: weekly use, ${v.money(y2)}/year. Per hour of value, Service 1 wins — keep the earner.`,
      why:`Duplicates compete for hours. The audit keeps the one that earns its cost per hour of use.`};
  }},
{ id:'subscriptions-lesson-compare-06', verb:'compare', part:7, tier:'independent', skill:'subscriptions-lesson',
  gen:(v)=>{
    const person=v.person();
    const m=Math.round(v.cents(6.99,10.99)*100)/100;
    const y=Math.round(m*12*100)/100;
    const perUse=Math.round(y/24*100)/100;
    return {
      context:`<p><b>Keep subscribing:</b> ${v.money(m)}/month = ${v.money(y)}/year. ${person} uses it about twice a month.</p><p><b>Pay per use:</b> ${v.money(perUse)} per session × 24 sessions a year = ${v.money(Math.round(perUse*24*100)/100)}/year.</p>`,
      q:'Subscription or pay-per-use?',
      choices:[
        Math.round(perUse*24*100)/100<y?{label:`Pay per use — ${v.money(Math.round(perUse*24*100)/100)}/year vs ${v.money(y)} subscribed`,ok:true}
        :{label:`Subscribe — ${v.money(y)}/year vs ${v.money(Math.round(perUse*24*100)/100)} pay-per-use`,ok:true},
        {label:`Subscribe — subscriptions are always the better deal`,ok:false,mis:'subscription-blindness'},
        {label:`Pay per use — subscriptions are always traps`,ok:false},
        {label:`Subscribe — the monthly price feels smaller`,ok:false,mis:'per-day-illusion'}],
      hint:'Yearly vs yearly at the ACTUAL use rate.',
      good:Math.round(perUse*24*100)/100<y?`Right: ${v.money(Math.round(perUse*24*100)/100)} < ${v.money(y)}.`:`Right: ${v.money(y)} < ${v.money(Math.round(perUse*24*100)/100)}.`,
      bad:`Subscription: ${v.money(y)}/year. Pay-per-use at twice a month: ${v.money(Math.round(perUse*24*100)/100)}/year. The use rate decides.`,
      why:`Subscriptions prepay for use. At low use rates, pay-per-use wins; at high rates, the subscription wins. The rate — not the habit — decides.`};
  }},
/* ---- build x5 (part 7; targets in cents, must sum to totalCents) ---- */
{ id:'subscriptions-lesson-build-01', verb:'build', part:7, tier:'independent', skill:'subscriptions-lesson',
  gen:(v)=>{
    const total=v.pick([3600,4800,6000]);
    const earners=Math.round(total*0.6/100)*100;
    const trial=Math.round(total*0.2/100)*100;
    const cut=total-earners-trial;
    return {
      h:'Build it: split the subscription budget',
      body:`<p>Split ${v.money(total/100)}/month across subscriptions: earners (daily/weekly use), one trial slot (audition with a deadline), and a cut jar — money freed by canceled subs, moved to savings.</p>`,
      totalDollars: Math.round(total/100),
      buckets:[{id:'earners',label:'Earners'},{id:'trial',label:'Trial slot'},{id:'cut',label:'Cut → savings'}],
      targets:{earners:Math.round(earners/100), trial:Math.round(trial/100), cut:Math.round(cut/100)},
      hint:'Earners first, one trial slot, and the cut jar grows every audit.',
      good:`${v.money(earners/100)} earners, ${v.money(trial/100)} trial, ${v.money(cut/100)} cut to savings.`,
      bad:`Earners biggest, trial slot small, cut jar gets the rest. Sum: ${v.money(total/100)}.`,
      why:'The cut jar makes canceling visible: every dead subscription becomes savings, not just a smaller bill.'};
  }},
{ id:'subscriptions-lesson-build-02', verb:'build', part:7, tier:'independent', skill:'subscriptions-lesson',
  gen:(v)=>{
    const total=v.pick([2400,3600,4800]);
    const video=Math.round(total*0.5/100)*100;
    const music=Math.round(total*0.3/100)*100;
    const apps=total-video-music;
    return {
      h:'Build it: split the entertainment stack',
      body:`<p>Split ${v.money(total/100)}/month: video (the most-watched earner), music (daily use), and an apps jar for the rest — each app must earn its slice monthly.</p>`,
      totalDollars: Math.round(total/100),
      buckets:[{id:'video',label:'Video'},{id:'music',label:'Music'},{id:'apps',label:'Apps jar'}],
      targets:{video:Math.round(video/100), music:Math.round(music/100), apps:Math.round(apps/100)},
      hint:'The most-used earner gets the biggest slice.',
      good:`${v.money(video/100)} video, ${v.money(music/100)} music, ${v.money(apps/100)} apps.`,
      bad:`Video first, music next, apps jar last. Sum: ${v.money(total/100)}.`,
      why:'Capped jars force the audit: an app that cannot fit its jar does not earn its keep.'};
  }},
{ id:'subscriptions-lesson-build-03', verb:'build', part:7, tier:'independent', skill:'subscriptions-lesson',
  gen:(v)=>{
    const total=v.pick([6000,7200,8400]);
    const keep=Math.round(total*0.55/100)*100;
    const review=Math.round(total*0.25/100)*100;
    const cancel=total-keep-review;
    return {
      h:'Build it: split the audit result',
      body:`<p>Split ${v.money(total/100)}/month after a full audit: keep (earners), review (re-audit next month), and cancel (freed money → savings).</p>`,
      totalDollars: Math.round(total/100),
      buckets:[{id:'keep',label:'Keep'},{id:'review',label:'Review soon'},{id:'cancel',label:'Cancel → savings'}],
      targets:{keep:Math.round(keep/100), review:Math.round(review/100), cancel:Math.round(cancel/100)},
      hint:'Keep the earners, park the maybes, free the rest.',
      good:`${v.money(keep/100)} keep, ${v.money(review/100)} review, ${v.money(cancel/100)} freed to savings.`,
      bad:`Keep biggest, review next, cancel the rest to savings. Sum: ${v.money(total/100)}.`,
      why:'The audit is a sort with a destination: every dollar lands in keep, review, or savings.'};
  }},
{ id:'subscriptions-lesson-build-04', verb:'build', part:7, tier:'independent', skill:'subscriptions-lesson',
  gen:(v)=>{
    const total=v.pick([4800,6000,7200]);
    const essential=Math.round(total*0.5/100)*100;
    const nice=Math.round(total*0.3/100)*100;
    const trial=total-essential-nice;
    return {
      h:'Build it: split the recurring-cost budget',
      body:`<p>Split ${v.money(total/100)}/month across ALL recurring costs: essential (used daily), nice-to-have (weekly use), and a trial jar for anything new — trials get one slot and a deadline.</p>`,
      totalDollars: Math.round(total/100),
      buckets:[{id:'essential',label:'Essential'},{id:'nice',label:'Nice-to-have'},{id:'trial',label:'Trial jar'}],
      targets:{essential:Math.round(essential/100), nice:Math.round(nice/100), trial:Math.round(trial/100)},
      hint:'Essential first, nice-to-have capped, trials get one slot.',
      good:`${v.money(essential/100)} essential, ${v.money(nice/100)} nice-to-have, ${v.money(trial/100)} trial.`,
      bad:`Essential biggest, nice-to-have next, trial small. Sum: ${v.money(total/100)}.`,
      why:'One trial slot with a deadline stops "free trials" from becoming permanent residents.'};
  }},
{ id:'subscriptions-lesson-build-05', verb:'build', part:7, tier:'independent', skill:'subscriptions-lesson',
  gen:(v)=>{
    const total=v.pick([12000,15000,18000]);
    const yearly=Math.round(total*0.5/100)*100;
    const monthly=Math.round(total*0.35/100)*100;
    const flex=total-yearly-monthly;
    return {
      h:'Build it: split annual vs monthly billing',
      body:`<p>Split ${v.money(total/100)}/year of subscriptions: annual billing (certain year-long use — the discount is real), monthly billing (uncertain use — keep the exit), and a flex jar.</p>`,
      totalDollars: Math.round(total/100),
      buckets:[{id:'yearly',label:'Annual (certain)'},{id:'monthly',label:'Monthly (flexible)'},{id:'flex',label:'Flex jar'}],
      targets:{yearly:Math.round(yearly/100), monthly:Math.round(monthly/100), flex:Math.round(flex/100)},
      hint:'Annual money only for certain year-long use.',
      good:`${v.money(yearly/100)} annual, ${v.money(monthly/100)} monthly, ${v.money(flex/100)} flex.`,
      bad:`Annual first (certain use), monthly next, flex last. Sum: ${v.money(total/100)}.`,
      why:'Annual billing is a bulk buy: it earns its discount only on certain use. The split keeps uncertain use on monthly.'};
  }},
/* ---- decide x8 (part 7: 01-03 independent, part 8: 04-08 stretch, novel recurring-cost audit) ---- */
{ id:'subscriptions-lesson-decide-01', verb:'decide', part:7, tier:'independent', skill:'subscriptions-lesson',
  gen:(v)=>{
    const person=v.person();
    const a=v.pick(['music streaming','video streaming']);
    const b=v.pick(['a fitness app','a meditation app','cloud storage']);
    const aNew=Math.round(v.cents(9.99,14.99)*100)/100;
    const bNew=Math.round(v.cents(4.99,9.99)*100)/100;
    const total=Math.round((aNew+bNew)*12*100)/100;
    const aYear=Math.round(aNew*12*100)/100;
    return {
      q:`${person} uses ${a} daily; it just rose to ${v.money(aNew)}/month. ${person} opened ${b} twice ever; it rose to ${v.money(bNew)}/month. New yearly total: ${v.money(total)}. What is the call?`,
      choices:[
        {label:`Cancel ${b}, keep ${a} — new total ${v.money(aYear)}/year; the hike did its job as a reminder`,ok:true},
        {label:`Keep both — the hikes are only a few dollars a month`,ok:false,mis:'subscription-blindness'},
        {label:`Cancel both — price hikes are always a scam`,ok:false},
        {label:`Keep ${b} too — canceling wastes what was already paid`,ok:false,mis:'sunk-subscription'}],
      hint:'Which subscriptions earn their cost at the NEW prices?',
      good:`Right: ${v.money(total)} drops to ${v.money(aYear)}/year.`,
      bad:`Re-audit at the new prices: ${a} earns its ${v.money(aYear)}/year; ${b} at "twice ever" does not earn ${v.money(Math.round(bNew*12*100)/100)}/year. Cut ${b}.`,
      why:`A price hike is a prompt to re-audit, not an order to cancel. Cut the freeloader, keep the earner.`};
  }},
{ id:'subscriptions-lesson-decide-02', verb:'decide', part:7, tier:'independent', skill:'subscriptions-lesson',
  gen:(v)=>{
    const person=v.person();
    const svc=v.pick(['a language app','a cloud backup plan','a music service']);
    const m=Math.round(v.cents(4.99,9.99)*100)/100;
    const annual=Math.round(m*12*0.8*100)/100;
    const monthly=Math.round(m*12*100)/100;
    const certain=v.pick([true,false]);
    return {
      q:`${person} ${certain?'uses':'tried'} ${svc} ${certain?'daily and will all year':'twice and is unsure'}. Monthly: ${v.money(m)}/mo (${v.money(monthly)}/yr). Annual: ${v.money(annual)}/yr upfront, no refunds. Which billing?`,
      choices:[
        certain?{label:`Annual — certain year-long use makes the 20% discount real: ${v.money(annual)} vs ${v.money(monthly)}`,ok:true}
        :{label:`Monthly — uncertain use + no refunds makes annual a prepayment for waste`,ok:true},
        certain?{label:`Monthly — annual plans are always traps`,ok:false}:{label:`Annual — 20% off is 20% off`,ok:false,mis:'low-price-justifies'},
        {label:`Both — pay annual and keep monthly as backup`,ok:false,mis:'subscription-blindness'},
        {label:`Neither — cancel everything`,ok:false}],
      hint:certain?'Certain use + no-refund clause with no teeth = ?':'Uncertain use + no refunds = ?',
      good:certain?`Right: ${v.money(Math.round((monthly-annual)*100)/100)} kept.`:`Right: keep the exit.`,
      bad:certain?`Use is certain for 12 months: ${v.money(annual)} < ${v.money(monthly)}. The discount is real.`:`Use is uncertain and refunds do not exist: monthly keeps the exit open.`,
      why:certain?`Annual billing is a bulk buy — certain use makes the discount real.`:`Annual billing prepays the year. Uncertain use turns the discount into a donation.`};
  }},
{ id:'subscriptions-lesson-decide-03', verb:'decide', part:7, tier:'independent', skill:'subscriptions-lesson',
  gen:(v)=>{
    const person=v.person();
    const m1=Math.round(v.cents(12.99,16.99)*100)/100;
    const m2=Math.round(v.cents(7.99,11.99)*100)/100;
    const y2=Math.round(m2*12*100)/100;
    return {
      q:`${person} has two overlapping subscriptions: ${v.money(m1)}/mo (used daily) and ${v.money(m2)}/mo (opened once in two months). The budget is tight this month. What is the call?`,
      choices:[
        {label:`Cancel the dusty one — ${v.money(y2)}/year for one opening is the obvious cut; the daily earner stays`,ok:true},
        {label:`Cancel the daily one — it costs more per month`,ok:false,mis:'cheaper-means-keep'},
        {label:`Keep both — tight months pass`,ok:false,mis:'subscription-blindness'},
        {label:`Cancel both — the budget demands it`,ok:false}],
      hint:'Tight budget = audit time. Which one earns its cost?',
      good:`Right: cut the freeloader, keep the earner.`,
      bad:`Daily: earns ${v.money(Math.round(m1*12*100)/100)}/year. Dusty: ${v.money(y2)}/year for one opening. The audit is easy here.`,
      why:`Tight months do not change the rule — they just make it urgent. Earners stay; freeloaders go.`};
  }},
{ id:'subscriptions-lesson-decide-04', verb:'decide', part:8, tier:'stretch', skill:'subscriptions-lesson',
  gen:(v)=>{
    const person=v.person();
    const gymM=Math.round(v.cents(29.99,49.99)*100)/100;
    const gymY=Math.round(gymM*12*100)/100;
    const visits=v.pick([0,1,3]);
    const perVisit=visits===0?'infinite':v.money(Math.round(gymY/Math.max(visits*12,1)*100)/100);
    return {
      q:`Novel audit: ${person} pays ${v.money(gymM)}/month for a gym membership (${v.money(gymY)}/year) and went ${visits===0?'zero':visits} time${visits===1?'':'s'} last month. A day pass costs $10. Audit the membership like a subscription.`,
      choices:[
        visits>=3?{label:`Keep — ${visits} visits a month earns the membership vs $10 day passes`,ok:true}
        :{label:`Cancel — ${v.money(gymY)}/year for ~${visits} visits a month is ${perVisit} per visit vs a $10 day pass`,ok:true},
        {label:`Keep — gym memberships are investments, not subscriptions`,ok:false,mis:'someday-subscription'},
        {label:`Keep — canceling wastes the months already paid`,ok:false,mis:'sunk-subscription'},
        {label:`Keep — it is only ${v.money(gymM)}/month`,ok:false,mis:'subscription-blindness'}],
      hint:'Same audit: yearly cost ÷ actual uses. Compare to the day pass.',
      good:visits>=3?`Right: regular use earns it.`:`Right: the membership is a leak wearing gym clothes.`,
      bad:`${v.money(gymY)}/year ÷ ~${visits*12} visits = ${perVisit} per visit vs $10 day passes. The audit does not care that it is a gym — recurring cost needs recurring value.`,
      why:`A gym membership IS a subscription. The same audit applies: yearly cost, actual use, per-use price vs the alternative.`};
  }},
{ id:'subscriptions-lesson-decide-05', verb:'decide', part:8, tier:'stretch', skill:'subscriptions-lesson',
  gen:(v)=>{
    const person=v.person();
    const passM=Math.round(v.cents(9.99,14.99)*100)/100;
    const passY=Math.round(passM*12*100)/100;
    const orders=v.pick([1,2,6]);
    const fee=Math.round(v.cents(2.99,4.99)*100)/100;
    const paygo=Math.round(orders*fee*12*100)/100;
    return {
      q:`Novel audit: ${person} pays ${v.money(passM)}/month for a delivery pass (${v.money(passY)}/year, "free delivery"). ${person} orders ${orders} time${orders===1?'':'s'} a month; delivery is ${v.money(fee)} without the pass. Keep the pass?`,
      choices:[
        paygo<passY?{label:`Cancel the pass — ${orders}/month × ${v.money(fee)} × 12 = ${v.money(paygo)}/year vs ${v.money(passY)} for the pass`,ok:true}
        :{label:`Keep the pass — ${v.money(passY)}/year beats ${v.money(paygo)} pay-as-you-go`,ok:true},
        {label:`Keep the pass — "free delivery" is always worth it`,ok:false,mis:'subscription-blindness'},
        {label:`Cancel — delivery passes are scams`,ok:false},
        {label:`Keep — canceling wastes the months paid`,ok:false,mis:'sunk-subscription'}],
      hint:'Yearly pass vs yearly pay-per-delivery at the ACTUAL order rate.',
      good:paygo<passY?`Right: ${v.money(paygo)} < ${v.money(passY)}.`:`Right: ${v.money(passY)} < ${v.money(paygo)}.`,
      bad:`Pass: ${v.money(passY)}/year. Pay-go: ${orders} × ${v.money(fee)} × 12 = ${v.money(paygo)}/year. The order rate decides.`,
      why:`A delivery pass is a subscription on food. Audit it yearly against actual orders — "free delivery" is prepaid delivery.`};
  }},
{ id:'subscriptions-lesson-decide-06', verb:'decide', part:8, tier:'stretch', skill:'subscriptions-lesson',
  gen:(v)=>{
    const person=v.person();
    const warrY=Math.round(v.cents(120,240)*100)/100;
    const item=v.pick(['a laptop','a phone','a TV']);
    const repairP=v.pick([15,25]);
    const expected=Math.round(warrY*0+ (warrY*(repairP/100))*100)/100;
    return {
      q:`Novel audit: ${person} is offered a ${v.money(warrY)}/year extended warranty on ${item}. About ${repairP}% of these need a ~${v.money(warrY)} repair in a year. Audit it like a subscription.`,
      choices:[
        {label:`Skip it — expected repair cost ≈ ${v.money(Math.round(warrY*repairP/100*100)/100)}/year vs ${v.money(warrY)} for the warranty; the warranty is overpriced insurance`,ok:true},
        {label:`Buy it — warranties are always worth it`,ok:false,mis:'someday-subscription'},
        {label:`Buy it — ${v.money(warrY)}/year is pocket change`,ok:false,mis:'subscription-blindness'},
        {label:`Skip it — warranties never pay out`,ok:false}],
      hint:'Expected value: chance × cost. Compare to the warranty price.',
      good:`Right: ${repairP}% × ${v.money(warrY)} ≈ ${v.money(Math.round(warrY*repairP/100*100)/100)} expected vs ${v.money(warrY)} charged.`,
      bad:`Expected repairs: ${repairP}% × ${v.money(warrY)} = ~${v.money(Math.round(warrY*repairP/100*100)/100)}/year. Warranty: ${v.money(warrY)}/year. You are paying ${v.money(Math.round((warrY-warrY*repairP/100)*100)/100)} for peace of mind.`,
      why:`A warranty is a subscription on risk. Audit the expected value like any recurring cost — price vs probability, not fear vs comfort.`};
  }},
{ id:'subscriptions-lesson-decide-07', verb:'decide', part:8, tier:'stretch', skill:'subscriptions-lesson',
  gen:(v)=>{
    const person=v.person();
    const donM=Math.round(v.cents(10,25)*100)/100;
    const donY=Math.round(donM*12*100)/100;
    const intentional=v.pick([true,false]);
    return {
      q:`Novel audit: ${person} donates ${v.money(donM)}/month (${v.money(donY)}/year) to a cause — set up ${intentional?'intentionally last year and still aligned':'years ago on impulse and rarely thinks about it'}. Audit it like a subscription.`,
      choices:[
        intentional?{label:`Keep — intentional, aligned, recurring giving is a value, not a leak`,ok:true}
        :{label:`Re-decide or cancel — impulse giving from years ago deserves a fresh yes, not autopilot`,ok:true},
        {label:`Keep — canceling donations is selfish`,ok:false},
        {label:`Cancel — all recurring charges are leaks`,ok:false,mis:'price-alone-cancels'},
        {label:`Keep — it is only ${v.money(donM)}/month`,ok:false,mis:'subscription-blindness'}],
      hint:'The audit is not about the cause — it is about whether the giving is still intentional.',
      good:intentional?`Right: intentional giving passes the audit.`:`Right: autopilot is not intention.`,
      bad:intentional?`Set up intentionally, still aligned: ${v.money(donY)}/year of chosen giving. The audit keeps it.`:`Set up on impulse, rarely considered: ${v.money(donY)}/year on autopilot. Re-decide with fresh eyes — keep it only with a fresh yes.`,
      why:`Even good causes get audited: the question is never "is it worthy" but "is it still your choice?" Autopilot is not a decision.`};
  }},
{ id:'subscriptions-lesson-decide-08', verb:'decide', part:8, tier:'stretch', skill:'subscriptions-lesson',
  gen:(v)=>{
    const person=v.person();
    const cloudM=Math.round(v.cents(1.99,9.99)*100)/100;
    const cloudY=Math.round(cloudM*12*100)/100;
    const full=v.pick([true,false]);
    const freeGB=v.pick([5,15]);
    return {
      q:`Novel audit: ${person} pays ${v.money(cloudM)}/month (${v.money(cloudY)}/year) for cloud storage that is ${full?'92% full of photos and files':'11% full — the free ${freeGB}GB tier would hold it all'}. Audit it.`,
      choices:[
        full?{label:`Keep — 92% full of real files is recurring value at ${v.money(cloudY)}/year`,ok:true}
        :{label:`Cancel — 11% full fits the free ${freeGB}GB tier; ${v.money(cloudY)}/year buys nothing`,ok:true},
        {label:`Keep — cloud storage is essential no matter what`,ok:false,mis:'subscription-blindness'},
        {label:`Cancel — all cloud plans are overpriced`,ok:false},
        {label:`Keep — the files might grow someday`,ok:false,mis:'someday-subscription'}],
      hint:'Value = use. How full is it, really?',
      good:full?`Right: 92% full = real recurring value.`:`Right: the free tier covers it — the paid plan is pure leak.`,
      bad:full?`92% full of actual files: the ${v.money(cloudY)}/year earns its keep.`:`11% full fits free ${freeGB}GB. ${v.money(cloudY)}/year for air. Cancel and move to the free tier.`,
      why:`Storage is a subscription on space. Audit the fill level like use: full of files = value; full of air = leak.`};
  }},
/* ---- predict x6 (part 8, stretch: novel recurring-cost audit) ---- */
{ id:'subscriptions-lesson-predict-01', verb:'predict', part:8, tier:'stretch', skill:'subscriptions-lesson',
  gen:(v)=>{
    const person=v.person();
    const m=Math.round(v.cents(9.99,14.99)*100)/100;
    const y=Math.round(m*12*100)/100;
    return {
      q:`${person} ignores a ${v.money(m)}/month subscription ("too small to bother") for 3 years, never opening it. What is the predictable total damage?`,
      choices:[
        {label:`${v.money(Math.round(y*3*100)/100)} — ${v.money(y)}/year × 3 years of "too small to bother"`,ok:true},
        {label:`${v.money(m)} — just one month, since small amounts do not compound`,ok:false,mis:'subscription-blindness'},
        {label:`$0 — forgotten subscriptions stop billing themselves`,ok:false,mis:'sunk-subscription'},
        {label:`${v.money(y)} — one year is the maximum damage`,ok:false}],
      hint:'Yearly × 3.',
      good:`Right: ${v.money(y)} × 3 = ${v.money(Math.round(y*3*100)/100)}.`,
      bad:`${v.money(m)} × 12 = ${v.money(y)}/year. × 3 = ${v.money(Math.round(y*3*100)/100)}. "Too small to bother" is the most expensive sentence in subscriptions.`,
      why:`Small leaks do not stay small — they stay. Three years of ignoring is a ${v.money(Math.round(y*3*100)/100)} habit of nothing.`};
  }},
{ id:'subscriptions-lesson-predict-02', verb:'predict', part:8, tier:'stretch', skill:'subscriptions-lesson',
  gen:(v)=>{
    const person=v.person();
    const m=Math.round(v.cents(12.99,18.99)*100)/100;
    const hike=Math.round(v.cents(2,4)*100)/100;
    const yOld=Math.round(m*12*100)/100, yNew=Math.round((m+hike)*12*100)/100;
    return {
      q:`${person}'s ${v.money(m)}/mo subscription rises by ${v.money(hike)}/mo. ${person} shrugs — "it's just ${v.money(hike)}." What is the predictable yearly effect of shrugging at every hike?`,
      choices:[
        {label:`${v.money(yOld)}/yr becomes ${v.money(yNew)}/yr — and shrugging at each hike compounds the stack upward`,ok:true},
        {label:`Nothing — ${v.money(hike)} a month is invisible`,ok:false,mis:'subscription-blindness'},
        {label:`The service improves by ${v.money(hike)} worth`,ok:false},
        {label:`Hikes reverse themselves if you wait`,ok:false}],
      hint:'${v.money(hike)} × 12. Then imagine it happening twice.',
      good:`Right: ${v.money(yNew)} vs ${v.money(yOld)} — ${v.money(Math.round((yNew-yOld)*100)/100)} more a year.`,
      bad:`${v.money(hike)} × 12 = ${v.money(Math.round(hike*12*100)/100)} more a year. Two shrugged hikes = ${v.money(Math.round(hike*24*100)/100)}. Hikes count on the shrug.`,
      why:`Every hike is priced for the shrug. The predictable result of never re-auditing: the stack only ever grows.`};
  }},
{ id:'subscriptions-lesson-predict-03', verb:'predict', part:8, tier:'stretch', skill:'subscriptions-lesson',
  gen:(v)=>{
    const person=v.person();
    const trials=v.pick([3,4]);
    const m=Math.round(v.cents(9.99,15.99)*100)/100;
    return {
      q:`${person} starts ${trials} free trials "just to look" and forgets all of them. They bill at ~${v.money(m)}/month each. What happens next month?`,
      choices:[
        {label:`~${v.money(Math.round(trials*m*100)/100)}/month in new charges — trials bill by default, not by use`,ok:true},
        {label:`Nothing — free trials stay free`,ok:false,mis:'subscription-blindness'},
        {label:`One charge — trials merge into a single bill`,ok:false},
        {label:`The trials cancel themselves when unused`,ok:false,mis:'sunk-subscription'}],
      hint:'${trials} trials × ~${v.money(m)}. Who cancels them?',
      good:`Right: ~${v.money(Math.round(trials*m*100)/100)}/month of new billing.`,
      bad:`Each trial becomes a subscription at billing day: ${trials} × ~${v.money(m)} = ~${v.money(Math.round(trials*m*100)/100)}/month. Forgetting is the business model.`,
      why:`Trials are auditions with a billing deadline. "Just looking" without a calendar reminder is just subscribing slowly.`};
  }},
{ id:'subscriptions-lesson-predict-04', verb:'predict', part:8, tier:'stretch', skill:'subscriptions-lesson',
  gen:(v)=>{
    const person=v.person();
    const m=Math.round(v.cents(19.99,29.99)*100)/100;
    const y=Math.round(m*12*100)/100;
    return {
      q:`${person} audits yearly now: cancels two dead ${v.money(m)}/mo subscriptions and keeps the earners. What is the predictable 5-year effect?`,
      choices:[
        {label:`~${v.money(Math.round(y*2*5*100)/100)} kept over 5 years — ${v.money(Math.round(y*2*100)/100)}/year × 5, plus the habit compounds`,ok:true},
        {label:`~${v.money(m)} — one month of savings, once`,ok:false,mis:'subscription-blindness'},
        {label:`Nothing — canceled subs get replaced automatically`,ok:false},
        {label:`The earners get more expensive to compensate`,ok:false}],
      hint:'Yearly freed × 5.',
      good:`Right: ${v.money(Math.round(y*2*100)/100)} × 5 = ${v.money(Math.round(y*2*5*100)/100)}.`,
      bad:`Two dead subs: 2 × ${v.money(y)}/year = ${v.money(Math.round(y*2*100)/100)}/year freed. × 5 = ${v.money(Math.round(y*2*5*100)/100)}. The audit is a raise you give yourself.`,
      why:`A yearly audit compounds like interest: every dead subscription found is money freed forever, not once.`};
  }},
{ id:'subscriptions-lesson-predict-05', verb:'predict', part:8, tier:'stretch', skill:'subscriptions-lesson',
  gen:(v)=>{
    const person=v.person();
    return {
      q:`${person} applies the subscription audit to EVERY recurring cost: gym, warranties, delivery passes, donations, cloud. What breaks first — the leaks or the budget?`,
      choices:[
        {label:`The leaks — the same audit (yearly cost ÷ actual use) exposes every recurring cost, not just apps`,ok:true},
        {label:`The budget — auditing everything costs too much time`,ok:false},
        {label:`Nothing — non-app costs cannot be audited`,ok:false,mis:'price-alone-cancels'},
        {label:`The gym — gyms are exempt from audits`,ok:false,mis:'someday-subscription'}],
      hint:'Recurring cost needs recurring value — everywhere, not just in the app store.',
      good:`Right: one audit, every recurring cost.`,
      bad:`Gym: yearly ÷ visits. Warranty: price ÷ expected repairs. Delivery pass: yearly ÷ orders. Donations: still intentional? The formula transfers everywhere.`,
      why:`The audit is a principle, not an app feature. Every recurring cost answers the same question: does the value recur like the bill does?`};
  }},
{ id:'subscriptions-lesson-predict-06', verb:'predict', part:8, tier:'stretch', skill:'subscriptions-lesson',
  gen:(v)=>{
    const person=v.person();
    const m=Math.round(v.cents(7.99,12.99)*100)/100;
    const y=Math.round(m*12*100)/100;
    return {
      q:`${person} cancels a dead ${v.money(m)}/mo subscription today and moves the money to savings automatically. What is the predictable result in 2 years?`,
      choices:[
        {label:`${v.money(Math.round(y*2*100)/100)} in savings — ${v.money(y)}/year redirected, not just unspent`,ok:true},
        {label:`${v.money(m)} — one month, once`,ok:false,mis:'subscription-blindness'},
        {label:`$0 — canceled money disappears`,ok:false},
        {label:`The subscription reactivates itself`,ok:false,mis:'sunk-subscription'}],
      hint:'${v.money(y)}/year × 2 — redirected, not just saved.',
      good:`Right: ${v.money(Math.round(y*2*100)/100)} working instead of leaking.`,
      bad:`${v.money(m)} × 12 = ${v.money(y)}/year. × 2 = ${v.money(Math.round(y*2*100)/100)} — moved to savings automatically, so it compounds instead of evaporating.`,
      why:`Canceling stops the leak; redirecting builds the asset. The predictable result is ${v.money(Math.round(y*2*100)/100)} that would have been nothing.`};
  }},
/* ---- explain x5 (part 8, stretch) ---- */
{ id:'subscriptions-lesson-explain-01', verb:'explain', part:8, tier:'stretch', skill:'subscriptions-lesson',
  gen:(v)=>{
    return {
      h:'Teach it back: the subscription audit',
      prompt:'Explain in your own words how to audit any subscription in under two minutes.',
      keyPoints:['Add up the monthly cost and multiply by 12 — that is the real size','Check actual use: does the value recur like the bill does','Ask: would I sign up today at this price for this use','Cancel the freeloaders, keep the earners — canceling is reversible'],
      modelAnswer:'Multiply the monthly price by 12 to see the real yearly size. Then check actual use over the last few months: a subscription must earn its cost every month. Ask whether you would sign up today at this price — if not, cancel it. You can always re-subscribe if life changes.',
      hint:'Yearly size, actual use, the today question.'};
  }},
{ id:'subscriptions-lesson-explain-02', verb:'explain', part:8, tier:'stretch', skill:'subscriptions-lesson',
  gen:(v)=>{
    return {
      h:'Teach it back: why monthly framing is a costume',
      prompt:'Explain in your own words why subscription prices are shown monthly and what that hides.',
      keyPoints:['Monthly numbers feel small; yearly numbers show the real size','$9.99/month is $119.88/year — the same money','Per-day pricing hides it even deeper ($1.99/day = $726/year)','Always multiply to yearly before judging'],
      modelAnswer:'Subscriptions are priced monthly because small numbers feel painless — $9.99 feels like pocket change, but it is $119.88 a year. Per-day pricing hides it deeper still. The yearly number is the same money with the costume off, so always multiply before you judge.',
      hint:'Same money, different costume.'};
  }},
{ id:'subscriptions-lesson-explain-03', verb:'explain', part:8, tier:'stretch', skill:'subscriptions-lesson',
  gen:(v)=>{
    return {
      h:'Teach it back: sunk cost in subscriptions',
      prompt:'Explain in your own words why "I already paid for months" is not a reason to keep a subscription.',
      keyPoints:['Past payments are gone whether you keep it or cancel','Keeping it costs FUTURE months for the same zero value','The only question: would I sign up today at this price','Canceling is reversible — rejoin if life changes'],
      modelAnswer:'Money already paid is gone either way — keeping the subscription cannot unspend it. What keeping it does is spend future months on the same zero value. The only question that matters is forward-looking: would I sign up today at this price for this use? If not, cancel.',
      hint:'Past is gone; future is the choice.'};
  }},
{ id:'subscriptions-lesson-explain-04', verb:'explain', part:8, tier:'stretch', skill:'subscriptions-lesson',
  gen:(v)=>{
    return {
      h:'Teach it back: the audit transfers everywhere',
      prompt:'Explain in your own words how the subscription audit applies to non-app recurring costs like gyms, warranties, and delivery passes.',
      keyPoints:['Every recurring cost gets the same audit: yearly cost ÷ actual use','Gym: yearly fee ÷ visits, vs the day-pass alternative','Warranty: price vs expected repair cost (chance × cost)','Delivery pass: yearly fee vs pay-per-delivery at your real order rate'],
      modelAnswer:'The audit is a principle, not an app feature: yearly cost divided by actual use, compared to the alternative. A gym membership is yearly fee versus day passes at your visit rate; a warranty is price versus chance times repair cost; a delivery pass is the yearly fee versus per-delivery fees at your order rate. Recurring cost needs recurring value — everywhere.',
      hint:'Same formula, new costumes.'};
  }},
{ id:'subscriptions-lesson-explain-05', verb:'explain', part:8, tier:'stretch', skill:'subscriptions-lesson',
  gen:(v)=>{
    return {
      h:'Teach it back: teach someone the yearly habit',
      prompt:'Explain in your own words how you would teach a friend to run a yearly subscription audit.',
      keyPoints:['List every recurring charge and multiply each to yearly','Sort into earners (recurring value) and freeloaders','Cancel freeloaders; redirect the freed money to savings','Set a yearly reminder — stacks only grow without audits'],
      modelAnswer:'Once a year, list every recurring charge and multiply each to its yearly size. Sort them into earners — real recurring value — and freeloaders. Cancel the freeloaders and redirect that money to savings automatically. Then set next year\'s reminder, because subscription stacks only ever grow without audits.',
      hint:'List, sort, cancel, redirect, remind.'};
  }},
],
};
