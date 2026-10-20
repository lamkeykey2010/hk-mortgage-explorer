# HK Mortgage Explorer

Working bilingual draft with a budget-first planner for Hong Kong homebuyers and owners refinancing. English and Traditional Chinese pages share a tested calculation module. AdSense is the selected revenue model. No referrals, live ad code, trackers or contact collection are implemented.

## Run locally

Requires Node.js 22 or newer. No package installation is needed.

```powershell
node build.mjs
node --test tests/*.test.mjs
node preview.mjs
```

Open `http://127.0.0.1:4173`. Static deployment output is `dist/`. Source is in `src/` and `build.mjs`. The hosting manifest identifies the existing private Site. Reuse it for future deployments.

## Budget planning and housing context

The default tool derives a purchase ceiling from available savings, retained reserves, entered purchase costs, income, other debts and a comfortable payment limit. It supports ordinary LTV up to 70%, includes a higher-rate scenario, and allows more cash than the minimum deposit. Transfer to purchase mode rounds down to preserve both cash and payment limits.

The housing context uses the August 2026 RVD regional average resale price per square metre for the target saleable-area class. All observations are provisional, with additional small-sample flags preserved. It is a three-region size comparison, not district or estate coverage, individual listings or a statistical price range. Snapshot provenance is retained in src/research-data.mjs. The bank directory contains 20 source records and identifies evidence gaps. It does not rank current quotes.

## Scope and limits

- Purchase: lower purchase price or valuation, editable LTV, monthly payments, all-debt DSR, income at a 50% planning benchmark, higher-rate scenario and annual repayment table.
- Quote comparison: two user-entered effective rates at the same principal and term. Illustrative rates are not current bank offers. Offer-specific fees are not ranked.
- Refinancing: identical remaining term, fees, redemption penalty, old cashback clawback, new cashback, horizon interest benefit and first recovery of net switching costs.
- Refinancing assumes rates stay constant and costs and retained cashback occur at outset. It does not support financed fees, a changed term, staged cashback or variable-rate projections.
- No automated duty calculation, MIP premium table, insurance financing, bank eligibility decision or historical housing explorer. Source research remains intact outside this Site checkout.
- Inputs are transient. Summary download contains the visitor's entered financial figures and is saved only on their own device.
- Preview is private and explicitly excluded from search indexing. A public launch needs the steps in `GROWTH.md`. A successful private deployment does not prove public crawlability or AdSense approval.

## Validation

Calculation tests include an independent annuity benchmark, zero interest, principal conservation, lower valuation, debt servicing, refinancing cash-flow/equity reconciliation, costs, cashback and invalid inputs. Static checks cover pages, navigation, labels and inactive advertising. These do not replace browser, mobile or assistive technology testing.

Rebuild after source changes before testing generated pages. Source research dates must not be advanced without a substantive review. Refresh canonical URLs, hreflang and sitemap together when the public domain is selected.
