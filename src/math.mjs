// Nominal annual rates expressed as percentages. Monthly annuity, no daily accrual.
function valid(value, min, max, name) {
  if (!Number.isFinite(value) || value < min || value > max) throw new RangeError(name);
  return value;
}
export function payment(principal, rate, months) {
  valid(principal, 0, 1e10, 'principal'); valid(rate, 0, 30, 'rate');
  valid(months, 1, 360, 'months');
  if (!Number.isInteger(months)) throw new RangeError('months');
  const r = rate / 1200;
  return r === 0 ? principal / months : principal * r / -Math.expm1(-months * Math.log1p(r));
}
export function schedule(principal, rate, months) {
  const monthly = payment(principal, rate, months);
  let balance = principal, interestTotal = 0;
  const rows = [];
  for (let month = 1; month <= months; month++) {
    const interest = balance * rate / 1200;
    const paid = Math.min(monthly, balance + interest);
    balance = Math.max(0, balance + interest - paid);
    if (month === months && balance < 0.01) balance = 0;
    interestTotal += interest;
    rows.push({month, paid, interest, interestTotal, balance});
  }
  return {monthly, rows, interestTotal};
}
export function purchase({price, valuation, ltv, rate, months, income, debts, costs}) {
  valid(rate, 0, 28, 'rate');
  valid(price, 1, 1e9, 'price'); valid(valuation, 1, 1e9, 'valuation');
  valid(ltv, 1, 90, 'ltv'); valid(income, 1, 1e8, 'income');
  valid(debts, 0, 1e8, 'debts'); valid(costs, 0, 1e8, 'costs');
  const principal = Math.min(price, valuation) * ltv / 100;
  const loan = schedule(principal, rate, months);
  const requiredIncome = (loan.monthly + debts) / 0.5;
  return {...loan, principal, downpayment: price - principal, cash: price - principal + costs,
    dsr: (loan.monthly + debts) / income * 100, requiredIncome,
    rateUp: payment(principal, Math.min(30, rate + 2), months)};
}
export function refinance({principal, currentRate, newRate, months, horizon, fees, penalty, clawback, cashback}) {
  for (const [key, value] of Object.entries({fees, penalty, clawback, cashback})) valid(value, 0, 1e8, key);
  valid(principal, 1, 1e10, 'principal'); valid(horizon, 1, months, 'horizon');
  if (!Number.isInteger(horizon)) throw new RangeError('horizon');
  const current = schedule(principal, currentRate, months);
  const next = schedule(principal, newRate, months);
  const netCosts = fees + penalty + clawback - cashback;
  const interestSavings = current.rows[horizon-1].interestTotal - next.rows[horizon-1].interestTotal;
  const monthlySavings = current.monthly - next.monthly;
  let breakEven = netCosts <= 0 ? 0 : null;
  if (breakEven === null) {
    const found = current.rows.find((row, i) => row.interestTotal - next.rows[i].interestTotal >= netCosts);
    if (found) breakEven = found.month;
  }
  return {current, next, netCosts, interestSavings, benefit: interestSavings - netCosts, monthlySavings,
    cashflowBenefit: monthlySavings * horizon - netCosts, breakEven,
    balanceDifference: current.rows[horizon-1].balance - next.rows[horizon-1].balance};
}
