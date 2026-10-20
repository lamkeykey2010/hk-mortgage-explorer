import test from 'node:test';
import assert from 'node:assert/strict';
import {payment, schedule, purchase, refinance} from '../src/math.mjs';
const near = (a,b,tolerance=0.01) => assert.ok(Math.abs(a-b)<tolerance, `${a} != ${b}`);
test('annuity agrees with independent standard example', () => near(payment(100000,6,360),599.550525));
test('zero rate and full amortisation conserve principal', () => {
  near(payment(120000,0,120),1000);
  for (const rate of [0,0.000001,3.5,15,30]) {
    const s=schedule(4200000,rate,360);
    near(s.rows.at(-1).balance,0);
    near(s.rows.reduce((a,r)=>a+r.paid-r.interest,0),4200000);
  }
});
test('lower valuation increases cash need, and all debt enters DSR', () => {
  const p=purchase({price:6000000,valuation:5500000,ltv:70,rate:3.5,months:360,income:60000,debts:3000,costs:120000});
  near(p.principal,3850000); near(p.cash,2270000); near(p.dsr,(p.monthly+3000)/60000*100);
});
const base={principal:4000000,currentRate:4,newRate:3,months:240,horizon:24,fees:10000,penalty:0,clawback:0,cashback:0};
test('refinance economic benefit reconciles cash flow and remaining equity', () => {
  const r=refinance(base); near(r.benefit,r.cashflowBenefit+r.balanceDifference);
  assert.ok(r.breakEven>0); assert.ok(r.benefit>0);
});
test('identical rates with fees never break even', () => {
  const r=refinance({...base,newRate:4}); near(r.benefit,-10000); assert.equal(r.breakEven,null);
});
test('fees, redemption penalty, clawback and cashback each affect net benefit', () => {
  const r=refinance({...base,penalty:5000,clawback:8000,cashback:2000}); near(r.netCosts,21000);
});
test('cashback may cause immediate recovery but later cost can erase it', () => {
  const r=refinance({...base,newRate:5,cashback:20000}); assert.equal(r.breakEven,0); assert.ok(r.benefit<0);
});
test('invalid inputs are rejected', () => {
  for (const args of [[NaN,3,360],[100,-1,360],[100,3,0],[100,3,361],[100,3,1.5]]) assert.throws(()=>payment(...args),RangeError);
  assert.throws(()=>refinance({...base,horizon:241}),RangeError);
  assert.throws(()=>refinance({...base,fees:-1}),RangeError);
});
