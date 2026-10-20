import test from 'node:test';
import assert from 'node:assert/strict';
import {affordability,purchaseInputs,areaClass,housingBenchmarks,SQFT_PER_SQM} from '../src/planner-math.mjs';
import {payment} from '../src/math.mjs';
import {housing} from '../src/research-data.mjs';
const base={savings:2500000,reserve:200000,costs:200000,income:60000,debts:0,monthlyBudget:20000,ltv:70,rate:3.5,months:360};
const near=(a,b)=>assert.ok(Math.abs(a-b)<0.01,a+' != '+b);
test('budget ceiling satisfies cash, loan and payment constraints across scenarios',()=>{
 for(const savings of [0,300000,1000000,2500000,8000000])for(const monthlyBudget of [0,5000,20000,100000])for(const rate of [0,3.5,28]){
  const v={...base,savings,monthlyBudget,rate},p=affordability(v);
  assert.ok(p.downpayment<=p.availableCash+0.01);assert.ok(p.principal<=p.price*.7+0.01);
  assert.ok(p.monthly<=Math.min(monthlyBudget,base.income*.5)+0.01);
  near(p.downpayment+p.principal,p.price);
  if(p.price>0){const next=p.price+1;assert.ok(next*(1-.7)>p.availableCash||payment(Math.max(0,next-p.availableCash),rate,v.months)>p.paymentLimit);}
 }
});
test('monthly limit permits a larger deposit rather than overstating required LTV',()=>{
 const p=affordability({...base,savings:3000000,reserve:0,costs:0,monthlyBudget:10000,rate:0,months:120});
 near(p.price,4200000);near(p.principal,1200000);near(p.monthly,10000);assert.equal(p.constrainedBy,'monthly');
});
test('other debts restrict capacity and reserve is unavailable for the deposit',()=>{
 const p=affordability({...base,debts:29000});near(p.paymentLimit,1000);near(p.availableCash,2100000);
 const empty=affordability({...base,savings:100000});near(empty.price,0);near(empty.cashShortfall,300000);
});
test('area classes honor exact RVD boundaries and no bedroom assumptions are inferred',()=>{
 for(const [sqm,klass] of [[39.999,'A'],[40,'B'],[69.999,'B'],[70,'C'],[100,'D'],[160,'E']])assert.equal(areaClass(sqm),klass);
 const rows=housingBenchmarks(housing,450,5000000,'New Territories');assert.equal(rows.length,1);assert.equal(rows[0].area_class,'B');near(rows[0].estimate,110084*450/SQFT_PER_SQM);
 assert.equal(rows[0].within,true);assert.equal(housingBenchmarks(housing,450,0).filter(r=>r.within).length,0);
});
test('budget rejects unsupported high LTV, nonfinite money and invalid area',()=>{
 for(const patch of [{ltv:90},{rate:-1},{months:361},{savings:NaN},{reserve:-1},{income:0}])assert.throws(()=>affordability({...base,...patch}),RangeError);
 assert.throws(()=>housingBenchmarks(housing,0,5000000),RangeError);
});

test('transferred inputs preserve cash and payment limits after rounding LTV',()=>{
 for(const monthlyBudget of [10000,20000,30000]){
  const v={...base,monthlyBudget},q=purchaseInputs(v);
  const loan=q.price*q.ltv/100;
  assert.ok(q.price-loan+q.costs<=v.savings-v.reserve+0.01);
  assert.ok(payment(loan,q.rate,q.months)<=monthlyBudget+0.01);
 }
 assert.equal(purchaseInputs({...base,monthlyBudget:0}),null);
});
