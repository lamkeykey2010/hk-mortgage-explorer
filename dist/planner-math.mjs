import {payment} from './math.mjs';
export const SQFT_PER_SQM = 10.76391041671;
function check(v,min,max,name){if(!Number.isFinite(v)||v<min||v>max)throw new RangeError(name);}
export function affordability({savings,reserve,costs,income,debts,monthlyBudget,ltv,rate,months}){
 for(const [k,v] of Object.entries({savings,reserve,costs,debts,monthlyBudget}))check(v,0,1e9,k);
 check(income,1,1e8,'income');check(ltv,1,70,'ltv');check(rate,0,28,'rate');
 const availableCash=Math.max(0,savings-reserve-costs);
 const paymentLimit=Math.max(0,Math.min(monthlyBudget,income*0.5-debts));
 const loanLimit=paymentLimit/payment(1,rate,months);
 // Savings may be used beyond the minimum deposit, allowing less than maximum LTV.
 const cashCeiling=availableCash/(1-ltv/100);
 const price=Math.min(cashCeiling,availableCash+loanLimit);
 const principal=Math.min(price*ltv/100,loanLimit);
 return {price,principal,availableCash,paymentLimit,monthly:payment(principal,rate,months),
  cashCeiling,loanLimit,downpayment:price-principal,
  cashUsed:price-principal+costs,
  constrainedBy:cashCeiling<=availableCash+loanLimit?'cash':'monthly',
  higherRatePayment:payment(principal,rate+2,months),
  affordableAtHigherRate:Math.min(cashCeiling,availableCash+paymentLimit/payment(1,rate+2,months)),
  cashShortfall:Math.max(0,reserve+costs-savings)};
}
export function areaClass(sqm){
 check(sqm,0.01,10000,'saleable area');
 return sqm<40?'A':sqm<70?'B':sqm<100?'C':sqm<160?'D':'E';
}
export function purchaseInputs(v){
 const p=affordability(v);
 // Round the ratio to the purchase form's 0.1% step, then recalculate a safe price.
 const ratio=Math.floor(p.principal/p.price*1000)/1000;
 if(!Number.isFinite(ratio)||ratio<0.01)return null;
 const price=Math.floor(Math.min(p.price,p.availableCash/(1-ratio),p.loanLimit/ratio));
 return {price,valuation:price,ltv:Math.round(ratio*1000)/10,rate:v.rate,months:v.months,income:v.income,debts:v.debts,costs:v.costs};
}
export function housingBenchmarks(rows,sqft,ceiling,region='all'){
 check(sqft,100,5000,'saleable area');check(ceiling,0,1e10,'ceiling');
 const sqm=sqft/SQFT_PER_SQM,klass=areaClass(sqm);
 return rows.filter(r=>r.area_class===klass&&(region==='all'||r.region===region))
 .map(r=>({...r,sqm,estimate:r.average_hkd_per_sqm*sqm,within:r.average_hkd_per_sqm*sqm<=ceiling}))
 .sort((a,b)=>a.estimate-b.estimate);
}
