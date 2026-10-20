import test from 'node:test';
import assert from 'node:assert/strict';
import {stampDuty,normalizeExplore,buyingCosts,assessPrice,purchaseCeiling,exploreOptions,transferExplore} from '../src/explore-math.mjs';
import {matchingListings} from '../src/explore-ui.mjs';
import {plans,listings} from '../src/market-data.mjs';
import {purchase} from '../src/math.mjs';
const base={savings:2500000,income:60000};
const params=v=>normalizeExplore({...base,...v},3.25);
test('current residential stamp duty agrees with independently specified IRD examples',()=>{
 for(const [price,duty] of [[0,0],[4000000,100],[4100000,20100],[4500000,67500],[4800000,97500],[5000000,112500],[6000000,135000],[6300000,165000],[7000000,210000],[9000000,270000],[9500000,320000],[12000000,450000],[21000000,850000],[25000000,1062500],[105000000,5750000],[120000000,7800000]])assert.equal(stampDuty(price),duty);
 for(const b of [4000000,4323780,4500000,4935480,6000000,6642860,9000000,10080000,20000000,21739120,100000000,109574470]){
  const before=stampDuty(b-1),at=stampDuty(b),after=stampDuty(b+1);
  assert.ok(before<=at&&at<=after,`nonmonotonic duty at ${b}`);assert.ok(after-before<=2);
 }
 assert.equal(stampDuty(5000001),112501);
 assert.throws(()=>stampDuty(-1),RangeError);assert.throws(()=>stampDuty(NaN),RangeError);
});
test('only cash and income are needed for defaults, allowances and reserve are explicit',()=>{
 const p=params({});assert.equal(p.reserve,180000);assert.equal(p.months,360);assert.equal(p.debts,0);
 const fees=buyingCosts(6000000,p);assert.deepEqual(fees,{duty:135000,agency:60000,legal:10000,other:5000,total:210000});
});
test('income and cash constrained ceilings reconcile fees and fail beyond the ceiling',()=>{
 for(const savings of [0,500000,2500000,8000000])for(const income of [10000,60000,150000])for(const months of [240,300,360]){
  const p=params({savings,income,months}),ceiling=purchaseCeiling(p),max=purchaseCeiling(p,50);
  assert.ok(ceiling<=max);
  if(ceiling>0){const a=assessPrice(ceiling,p);assert.equal(a.status,'green');assert.ok(a.loanNeeded<=ceiling*.7+.01);}
  assert.equal(assessPrice(max+100,p).status,'red');
 }
});
test('green, amber and red are driven by both cash and income',()=>{
 const p=params({savings:3000000,income:20000}),green=purchaseCeiling(p),max=purchaseCeiling(p,50);
 assert.equal(assessPrice(green,p).status,'green');assert.equal(assessPrice((green+max)/2,p).status,'amber');assert.equal(assessPrice(max+10000,p).status,'red');
 assert.equal(assessPrice(100000,params({savings:0})).status,'red');
});
test('debts and buffer reduce capacity and all three terms are assessed',()=>{
 const p=params({}),ordinary=purchaseCeiling(p);assert.ok(purchaseCeiling(params({debts:20000}))<ordinary);
 assert.ok(purchaseCeiling(params({reserveMonths:12}))<ordinary);
 const options=exploreOptions(p);assert.deepEqual(options.map(o=>o.months),[360,300,240]);assert.ok(options[0].price>=options[2].price);
});
test('listing filters use verified asking prices and never infer rooms or substitute regional averages',()=>{
 const matches=matchingListings(listings,5000000,{bedrooms:'2'});
 assert.ok(matches.length>0);assert.ok(matches.every(r=>r.price<=5000000&&r.bedrooms===2&&!r.excluded));
 assert.equal(matchingListings(listings,2000000).length,0);
 assert.equal(matchingListings(listings,6000000,{estate:'4053941',bedrooms:'2'}).length,0);
 assert.equal(matchingListings(listings,6000000,{estate:'4053941',bedrooms:'1'}).length,1);
 assert.ok(!matchingListings(listings,10000000).some(r=>r.id==='4063031'));
});
test('bank choices include H and P formulas with dates and public sources',()=>{
 assert.ok(plans.some(p=>p.type==='H'));assert.ok(plans.some(p=>p.type==='P'));
 for(const p of plans){assert.ok(p.source.startsWith('https://'));assert.ok(p.documentDate);assert.ok(p.reference);assert.ok(p.rate>0);}
});
test('transfer keeps the selected price, fees and cash limits consistent with detailed calculator',()=>{
 const p=params({}),price=Math.floor(purchaseCeiling(p)/50000)*50000;
 const q=transferExplore(price,p);assert.ok(q);assert.equal(q.price,price);
 const detail=purchase(q);assert.ok(detail.cash+p.reserve<=p.savings+1);assert.ok(detail.monthly<=p.income*.5+.01);
 assert.equal(transferExplore(purchaseCeiling(p,50)+10000,p),null);
});
