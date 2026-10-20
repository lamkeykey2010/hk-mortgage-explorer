# Traffic and AdSense launch plan

Decision recorded 20 October 2026: serve Hong Kong homebuyers and owners refinancing. Monetise through Google AdSense. Mortgage referrals are out of scope. The site is currently a private prototype with no ads or analytics.

## Positioning

Help people make one concrete mortgage decision with transparent calculations and explanations. Start with monthly affordability and refinancing costs. Publish in Traditional Chinese and English with separate URLs. Keep the housing explorer secondary until completed-transaction data and reuse rights are confirmed. Do not create generic estate pages from unlicensed or missing data.

## Revenue economics

Use monthly monetised page views divided by 1,000, multiplied by observed page RPM. Page RPM is revenue per thousand page views, not per thousand ad impressions. Recalculating the form is not a new page view. Do not refresh pages or ads to inflate impressions.

The scenarios below are arithmetic assumptions in HKD, not observed market rates, expected performance or revenue promises. The actual RPM, ad coverage and approval outcome are unknown. Revenue can be zero, and amounts exclude operating costs and tax.

| Monthly monetised page views | HK$10 page RPM | HK$30 page RPM | HK$60 page RPM |
| --- | ---: | ---: | ---: |
| 10,000 | 100 | 300 | 600 |
| 50,000 | 500 | 1,500 | 3,000 |
| 100,000 | 1,000 | 3,000 | 6,000 |

At an assumed HK$30 page RPM, HK$5,000 monthly gross revenue requires roughly 166,667 monetised page views. This sensitivity illustrates the scale required. It is not a traffic forecast. Do not buy traffic until real revenue per session, genuine engagement and acquisition costs are measured. For example, 1.5 monetised page views per session at that assumed RPM yields HK$0.045 gross per session before costs.

Google's [RPM definition](https://support.google.com/adsense/answer/190515) supports the formula. All RPM values above are our modelling assumptions.

## Public launch requirements

1. Choose a domain controlled by Keith and configure its DNS and hosting. The current chatgpt.site subdomain is a preview, and its suitability for independent AdSense site verification is unconfirmed. Google describes supported site URL types in its [site management guidance](https://support.google.com/adsense/answer/12170421). A controlled domain is the recommended route, not a domain purchase already authorised or completed.
2. Complete browser, phone-width, keyboard, empty-field, language-switch and download testing. Review both languages, calculation assumptions and guide examples. Finish source verification for any new financial rules. Do not advertise a live bank comparison until quotes can be dated and reconciled.
3. Publish operator and editor identity, a real contact channel, editorial method and privacy information. Do not invent qualifications, partner relationships, business registration details or contact addresses. The current About and Privacy sections describe the prototype, not the final advertising setup.
4. Update canonical URLs, both language alternates and sitemap to the final origin. Remove preview noindex and robots disallow only for the public version. Ensure the public site and required assets are accessible without sign-in. Verify the domain in Search Console and submit the sitemap.
5. Add the site to Keith's AdSense account, use Google's real verification instructions and submit for review when content and navigation are ready. Account acceptance and site approval are external decisions. There is no asserted minimum article count, guaranteed review time or guaranteed approval.
6. Use the actual publisher ID and account-provided ads.txt line. Do not fabricate values. Check that the ad crawler can access the site and the ads.txt file can be served at the required domain location. See [adding a site](https://support.google.com/adsense/answer/12169212).
7. Before loading advertising, implement the appropriate privacy disclosures and consent handling for the actual visitor regions. Configure a Google-certified CMP integrating with TCF for ad traffic from the EEA, UK and Switzerland. A Hong Kong focus does not prevent visitors from those regions. See [Google CMP requirements](https://support.google.com/adsense/answer/13554020).
8. Enable limited placements only after approval and end-to-end checks. Update the privacy copy to describe the scripts actually loaded, their purposes and available choices. Verify that income, debt, loan balances and scenario values never enter analytics events, URLs or advertising parameters.

## Advertising layout

Begin with one responsive in-content unit after the explanatory content on a guide page. Consider a second placement only after measuring reading and completion behaviour. Clearly label units as Advertisement or 廣告. Reserve their space to reduce layout shifts and collapse empty placements appropriately.

Keep ads away from calculator input fields, mode switches, results, download controls and navigation. Do not insert a unit into the results panel. Keep automated placements disabled around interactive tools until reviewed. No pop-up that blocks calculation, click encouragement or forced extra page views.

Follow Google's [ad placement policies](https://support.google.com/adsense/answer/1346295) and [invalid traffic guidance](https://support.google.com/adsense/answer/1348754). Do not click our own live ads during QA, ask others to click, use traffic exchanges or use misleading distribution. Approval is not evidence that every future placement is compliant.

## First 90 days after public launch

These are work phases and review points, not promises of rankings or traffic.

| Phase | Work | Evidence to review |
| --- | --- | --- |
| Days 1 to 14 | Launch the validated calculators and two bilingual guides. Add a genuinely useful affordability guide with a worked lower-valuation example. Configure Search Console and real contact details. | Public crawlability, sitemap processing, calculation completion and errors, source freshness. |
| Days 15 to 30 | Add a down-payment and buying-cost guide after verifying current duty and MIP rules. Expand refinancing examples and rate-sensitivity explanations. | Search queries and impressions by language, indexed pages, organic clicks and user questions. |
| Days 31 to 60 | Improve pages gaining impressions. Add useful worked examples, clearer assumptions and internal links. Create short demonstrations in both languages. | Search click-through rate, genuine calculator usage, guide-to-tool navigation and content gaps. |
| Days 61 to 90 | Assess actual AdSense page RPM and coverage if approved. Review placements and performance on mobile. Decide which content deserves further effort. | Gross revenue, genuine monetised page views, RPM by page/language, hosting cost, layout shifts and invalid traffic notices. |

Seed topics: 按揭計算機, 轉按計算機, 按揭供款與入息比率, H 按 P 按分別, 轉按罰息期, Hong Kong mortgage calculator, Hong Kong refinancing costs. These are topic hypotheses. Search volume, ranking difficulty and conversion are not yet measured. Avoid promises about the best rate or full-market coverage.

Build original examples around actual decisions and explain how they were calculated. Each financial guide needs an identifiable editor, review date, direct official sources and an explicit scope. Follow Google's [people-first content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content). Do not mass-produce thin keyword or estate pages.

## Distribution and measurement

Prepare short demos that answer one question, such as whether a lower valuation changes the cash deposit or whether cashback offsets a redemption penalty. Keith can share them through his own channels and relevant communities where promotion is allowed. Seek editorial links by making the tool useful to housing educators and personal finance writers. No outreach messages or public posts have been sent.

Use Search Console for organic discovery. Add privacy-reviewed analytics only when configured with the actual account and required consent choices. Track calculator use, successful calculation, error category, mode, language, guide-to-calculator navigation and summary download. Keep financial inputs and contact details out of events. One calculation is an event, not a fabricated page view. This telemetry is planned, not implemented.

## Inputs still needed from Keith

- A domain he owns or the domain name he wants to purchase himself.
- The public operator/editor name and a contact channel suitable for publication.
- Existing AdSense account status, followed by publisher and unit IDs when available. No passwords or private payment/tax details should be sent in chat.

These are configuration dependencies. They do not block work on the website draft, content, calculation tests or the launch plan.
