import {payment} from './math.mjs';
const check=(n,min,max,name)=>{if(!Number.isFinite(n)||n<min||n>max)throw new RangeError(name);};
// Residential AVD table, instruments from 26 Feb 2026. IRD FAQ Q1.
export function stampDuty(value){
 check(value,0,1e10,'property value');if(value===0)return 0;
 const p=Math.ceil(value);
 const duty=p<=4000000?100:p<=4323780?100+(p-4000000)*.2:p<=4500000?p*.015:
 p<=4935480?67500+(p-4500000)*.1:p<=6000000?p*.0225:p<=6642860?135000+(p-6000000)*.1:
 p<=9000000?p*.03:p<=10080000?270000+(p-9000000)*.1:p<=20000000?p*.0375:
 p<=21739120?750000+(p-20000000)*.1:p<=100000000?p*.0425:p<=109574470?4250000+(p-100000000)*.3:p*.065;
 return Math.ceil(duty-1e-8);
}
export function normalizeExplore(v,rate){
 const p={savings:v.savings,income:v.income,debts:v.debts??0,reserveMonths:v.reserveMonths??6,
 agencyPct:v.agencyPct??1,legal:v.legal??10000,other:v.other??5000,comfortDsr:v.comfortDsr??35,
 months:v.months??360,ltv:70,rate};
 for(const k of ['savings','debts','legal','other'])check(p[k],0,1e9,k);
 check(p.income,1,1e8,'income');check(p.reserveMonths,0,24,'reserveMonths');
 check(p.agencyPct,0,5,'agencyPct');check(p.comfortDsr,10,50,'comfortDsr');
 check(p.months,12,360,'months');if(!Number.isInteger(p.months))throw new RangeError('months');check(rate,0,28,'rate');
 // Reserve assumes living costs equal 50% of stated monthly income. Editable months.
 p.reserve=p.income*.5*p.reserveMonths;
 return p;
}
export function buyingCosts(price,p){
 check(price,0,1e9,'price');
 return {duty:stampDuty(price),agency:price*p.agencyPct/100,legal:p.legal,other:p.other,
 total:stampDuty(price)+price*p.agencyPct/100+p.legal+p.other};
}
export function assessPrice(price,p){
 const fees=buyingCosts(price,p),usableCash=Math.max(0,p.savings-p.reserve);
 const loanNeeded=Math.max(0,price+fees.total-usableCash);
 const monthly=payment(loanNeeded,p.rate,p.months);
 const comfortablePayment=Math.max(0,p.income*p.comfortDsr/100-p.debts);
 const maximumPayment=Math.max(0,p.income*.5-p.debts);
 const cashNeeded=price*.3+fees.total+p.reserve;
 const cashGap=Math.max(0,cashNeeded-p.savings);
 const feasible=price>0&&cashGap<.01&&monthly<=maximumPayment+.01;
 const comfortable=feasible&&monthly<=comfortablePayment+.01;
 return {price,fees,loanNeeded,monthly,comfortablePayment,maximumPayment,cashNeeded,cashGap,
  status:comfortable?'green':feasible?'amber':'red',feasible,comfortable,
  dsr:(monthly+p.debts)/p.income*100,
  downpayment:Math.max(0,price-loanNeeded),
  cashUsed:Math.max(0,price-loanNeeded)+fees.total,
  higherPayment:payment(loanNeeded,p.rate+2,p.months),
  interest:monthly*p.months-loanNeeded};
}
export function purchaseCeiling(p,ratio=p.comfortDsr){
 const allowance=Math.max(0,p.income*ratio/100-p.debts);
 const maxLoan=allowance/payment(1,p.rate,p.months);
 const fits=price=>{
  const fees=buyingCosts(price,p).total;
  const usable=p.savings-p.reserve-fees;
  return usable>=price*.3&&price-usable<=maxLoan;
 };
 let low=0,high=1e9;
 for(let i=0;i<65;i++){const mid=(low+high)/2;if(fits(mid))low=mid;else high=mid;}
 return Math.floor(low);
}
export function exploreOptions(p){return [360,300,240].map(months=>{
 const parameters={...p,months};const price=purchaseCeiling(parameters);
 return {months,price,maximum:purchaseCeiling(parameters,50),...assessPrice(price,parameters)};
});}
export function transferExplore(price,p){
 const a=assessPrice(price,p);if(!a.feasible||a.loanNeeded<1)return null;
 // Preserve the exact required ratio, price, payment and cash limits on transfer.
 const ltv=a.loanNeeded/price*100;
 if(ltv<1)return null;
 return {price:Math.floor(price),valuation:Math.floor(price),ltv,rate:p.rate,rateB:Math.min(30,p.rate+.25),months:p.months,income:p.income,debts:p.debts,costs:Math.ceil(a.fees.total)};
}
