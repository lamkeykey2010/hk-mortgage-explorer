import {plannerResult,prepareExplore,parameters,dreamResult,syncDreamFilters} from './explore-ui.mjs';
import {transferExplore} from './explore-math.mjs';
import {purchase,payment,refinance} from './math.mjs';
const zh=document.documentElement.lang==='zh-Hant';
const t=zh?{
 monthly:'每月供款估算',perMonth:'港元／月，按情境 A 的利率',loan:'貸款額',cash:'首期及已輸入費用',income:'50% 供款比率對應收入',dsr:'供款與入息比率',total:'全期利息估算',up:'加息 2 個百分點月供',dsrOk:'供款比率未超過 50%，實際審批仍由銀行決定。',dsrHigh:'供款比率超過 50%，請降低貸款額或檢視收入及債務。',mip:'此成數高於一般 70% 上限。高成數按揭須符合按揭保險等條件，保費未自動計算。',costs:'印花稅、律師費、代理佣金及按揭保費須自行加入費用。0 表示未計入，並非免收。',compare:'相同貸款額及年期，情境 B 月供',diff:'兩個情境的月供差額',refi:'每月供款減少',refiNote:'現有及新按揭採用相同剩餘年期',net:'比較期內淨利息效益',netcost:'淨轉按成本',recover:'首次收回成本',interest:'比較期內利息減少',current:'現有月供',next:'新按揭月供',never:'全期未能收回',now:'期初',month:'個月',refiCaveat:'假設利率不變、費用於期初支付、回贈於期初收取且可全數保留。淨效益以利息差額減成本計算，不等於供款現金流差額。',recoverCaveat:'首次收回成本不保證其後持續有利，請同時檢視比較期內淨效益。',invalid:'請檢查輸入。金額不可為負數，年期最多 360 個月，比較期不可超過剩餘年期。',year:'年',balance:'年末貸款結餘',paid:'全年供款',annualInterest:'全年利息',schedule:'供款表按情境 A 計算，利率假設全期不變。',download:'下載計算摘要',assumptions:'估算用途，並非銀行報價或批核。所有金額以港元計。',inputs:'輸入假設',results:'結果'
}:{monthly:'Estimated monthly payment',perMonth:'HKD per month, using scenario A',loan:'Loan amount',cash:'Down payment + entered costs',income:'Income at 50% DSR',dsr:'Debt servicing ratio',total:'Lifetime interest estimate',up:'Payment if rate rises 2 points',dsrOk:'Within a 50% DSR planning benchmark. Bank approval is still required.',dsrHigh:'Above a 50% DSR benchmark. Review the loan size, income and existing debts.',mip:'Above the ordinary 70% LTV ceiling. Higher LTV needs eligibility checks such as MIP. Insurance premiums are not calculated automatically.',costs:'Add stamp duty, legal fees, agency fees and any MIP premium to your costs. Zero means excluded, not waived.',compare:'Scenario B payment, same loan and term',diff:'Monthly payment difference',refi:'Monthly payment reduction',refiNote:'Same remaining term for the existing and new mortgage',net:'Net interest benefit over your horizon',netcost:'Net switching costs',recover:'First cost recovery',interest:'Interest saved over your horizon',current:'Current monthly payment',next:'New monthly payment',never:'Not within remaining term',now:'At outset',month:'months',refiCaveat:'Assumes constant rates, costs paid and cashback received at outset, with cashback fully retained. Net benefit is interest saved less costs, rather than the difference in payment cash flows.',recoverCaveat:'First recovery does not guarantee a lasting benefit. Check the net benefit over your chosen horizon too.',invalid:'Check your inputs. Amounts cannot be negative, the term must be 1 to 360 months, and the comparison horizon cannot exceed the remaining term.',year:'Year',balance:'Closing balance',paid:'Annual payments',annualInterest:'Annual interest',schedule:'Schedule uses scenario A and assumes its rate stays constant for the whole term.',download:'Download calculation summary',assumptions:'Planning estimates, not a bank quote or approval. All amounts are in HKD.',inputs:'Input assumptions',results:'Results'};
const money=x=>new Intl.NumberFormat(zh?'zh-HK':'en-HK',{maximumFractionDigits:0}).format(Math.round(x));
const hkd=x=>'HK$ '+money(x);
const metric=(label,value)=>`<div class="metric"><dt>${label}</dt><dd>${value}</dd></div>`;
let active='budget';
let listingPageNumber=1;
const snapshots={};
function values(form){return Object.fromEntries([...new FormData(form)].map(([k,v])=>[k,['region','district','estate','bedrooms','planId','sort'].includes(k)?v:Number(v)]));}
function render(mode){
 const invalid=mode==='budget'?(zh?'請輸入有效現金及每月收入，並檢查可調整假設。':'Enter valid cash and monthly income, and check any adjusted assumptions.'):t.invalid;
 const form=document.querySelector(`#${mode}-form`), output=document.querySelector(`#${mode}-result`);
 if(mode==='refi'){
  const horizon=form.elements.namedItem('horizon');
  horizon.setCustomValidity(Number(horizon.value)>Number(form.elements.namedItem('months').value)?t.invalid:'');
 }
 if(!form.checkValidity()){if(mode==='budget'){document.querySelector('#dream-result').innerHTML='';document.querySelector('#budget-price-label').textContent='';}output.innerHTML=`<p class="error" role="status">${invalid}</p>`;delete snapshots[mode];return;}
 if(mode==='budget')prepareExplore(form);
 const v=values(form);
 try{
 if(mode==='budget'){
  output.innerHTML=plannerResult(v,zh);
  document.querySelector('#dream-result').innerHTML=dreamResult(v,zh,{...syncDreamFilters(document.querySelector('#dream-form'),zh),page:listingPageNumber});
 }else if(mode==='buy'){
  const p=purchase(v), b=payment(p.principal,v.rateB,v.months);
  output.innerHTML=`<div class="eyebrow">${t.monthly}</div><div class="big-number">${hkd(p.monthly)}</div><p class="number-note">${t.perMonth}</p><dl class="metrics">${metric(t.loan,hkd(p.principal))}${metric(t.cash,hkd(p.cash))}${metric(t.income,hkd(p.requiredIncome))}${metric(t.dsr,p.dsr.toFixed(1)+'%')}${metric(t.total,hkd(p.interestTotal))}${metric(t.up,hkd(p.rateUp))}</dl><div class="bar" role="img" aria-label="${t.dsr}: ${p.dsr.toFixed(1)}%"><span style="width:${Math.min(100,p.dsr/50*100)}%;background:${p.dsr>50?'#b75a35':'#1a5143'}"></span></div><p class="result-note ${p.dsr>50?'warning':''}">${p.dsr>50?t.dsrHigh:t.dsrOk}</p><p class="result-note"><strong>${t.compare}: ${hkd(b)}</strong><br>${t.diff}: ${hkd(Math.abs(p.monthly-b))}</p>${v.ltv>70?`<p class="result-note warning">${t.mip}</p>`:''}<p class="result-note">${t.costs}</p>`;
  const yearly=[];let paid=0,interest=0;
  for(const row of p.rows){paid+=row.paid;interest+=row.interest;if(row.month%12===0||row.month===v.months){yearly.push(`<tr><td>${Math.ceil(row.month/12)}</td><td>${hkd(paid)}</td><td>${hkd(interest)}</td><td>${hkd(row.balance)}</td></tr>`);paid=0;interest=0;}}
  document.querySelector('#schedule').innerHTML=`<table><caption>${t.schedule}</caption><thead><tr><th scope="col">${t.year}</th><th scope="col">${t.paid}</th><th scope="col">${t.annualInterest}</th><th scope="col">${t.balance}</th></tr></thead><tbody>${yearly.join('')}</tbody></table>`;
 }else{
  const r=refinance(v);
  const recovery=r.breakEven===null?t.never:r.breakEven===0?t.now:r.breakEven+' '+t.month;
  output.innerHTML=`<div class="eyebrow">${t.refi}</div><div class="big-number">${hkd(r.monthlySavings)}</div><p class="number-note">${t.refiNote}</p><dl class="metrics">${metric(t.current,hkd(r.current.monthly))}${metric(t.next,hkd(r.next.monthly))}${metric(t.net,`<span class="${r.benefit<0?'warning':'good'}">${hkd(r.benefit)}</span>`)}${metric(t.netcost,hkd(r.netCosts))}${metric(t.interest,hkd(r.interestSavings))}${metric(t.recover,recovery)}</dl><p class="result-note">${t.refiCaveat}</p><p class="result-note">${t.recoverCaveat}</p>`;
 }
 snapshots[mode]=`${t.assumptions}\n\n${t.inputs}\n`+[...form.elements].filter(el=>el.name).map(el=>`${el.labels?.[0]?.textContent||(el.name==='months'?(zh?'貸款年期（月）':'Loan term (months)'):el.name)}: ${el.value}`).join('\n')+`\n\n${t.results}\n`+output.innerText;
 }catch{output.innerHTML=`<p class="error" role="status">${invalid}</p>`;delete snapshots[mode];}
}
for(const mode of ['budget','buy','refi']){
 const form=document.querySelector(`#${mode}-form`);
 form.addEventListener('input',e=>{if(mode==='budget')listingPageNumber=1;if(mode==='budget'&&['savings','income'].includes(e.target.name)&&form.checkValidity())prepareExplore(form,true);render(mode);});form.addEventListener('submit',e=>e.preventDefault());render(mode);
}
document.querySelectorAll('[data-mode]').forEach(button=>button.addEventListener('click',()=>{
 active=button.dataset.mode;
 document.querySelectorAll('[data-mode]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
 document.querySelectorAll('[data-panel]').forEach(p=>p.hidden=p.dataset.panel!==active);
 document.querySelector('#schedule-details').hidden=active!=='buy';
}));
document.querySelector('#download').addEventListener('click',()=>{
 if(!snapshots[active]){document.querySelector(`#${active}-form`).reportValidity();return;}
 const blob=new Blob([snapshots[active]],{type:'text/plain;charset=utf-8'}),url=URL.createObjectURL(blob);
 const a=document.createElement('a');a.href=url;a.download=`mortgage-${active}-estimate.txt`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
});

document.querySelector('#budget-result').addEventListener('click',e=>{
 if(!e.target.closest('[data-use-budget]'))return;
 const v=values(document.querySelector('#budget-form')),transferred=transferExplore(v.price,parameters(v));
 if(!transferred)return;
 const form=document.querySelector('#buy-form');
 for(const [key,value] of Object.entries(transferred))form.elements.namedItem(key).value=value;
 render('buy');document.querySelector('[data-mode="buy"]').click();
});

document.querySelector('#dream-form').addEventListener('input',()=>{listingPageNumber=1;render('budget');});
document.querySelector('#dream-form').addEventListener('submit',e=>e.preventDefault());
document.querySelector('#budget-result').addEventListener('click',e=>{const term=e.target.closest('[data-term]');if(!term)return;document.querySelector('#budget-form').elements.namedItem('months').value=term.dataset.term;render('budget');});

document.querySelector('#dream-result').addEventListener('click',e=>{const button=e.target.closest('[data-listing-page]');if(!button||button.disabled)return;listingPageNumber=Number(button.dataset.listingPage);render('budget');document.querySelector('#dream-house').scrollIntoView({block:'start'});});
