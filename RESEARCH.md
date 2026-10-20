# Research and model scope

Checked 20 October 2026. This public development preview is not a continuously updated data service.

## Preliminary exploration

Only cash and monthly household income are required. Defaults: ordinary mortgage maximum 70% LTV, comfortable all-debt servicing 35% of income, outer planning limit 50%, no other debts, 30 years with 20/25-year comparisons. The reserve is six months of assumed living costs at half the entered monthly income. All assumptions can be reviewed and most adjusted. These are our planning choices, not a bank eligibility decision. Property valuation equals price and rates are held constant.

Residential AVD uses the [IRD table](https://www.ird.gov.hk/eng/faq/avd.htm) effective 26 February 2026, including marginal relief and rounding up to whole HKD. Commission allowance is 1%, legal allowance HK$10,000, other registration/insurance/disbursement allowance HK$5,000. These allowances are not prescribed charges. [EAA guidance](https://www.eaa.org.hk/Portals/0/Sections/LGA/Circular/24-01_CRE.pdf) confirms commission is negotiated. No MIP premiums, financing of fees, guarantors or employee benefits are modeled in the preliminary step.

## Bank terms

HSBC KFS May 2026: H from bank 1M H+1.30%, cap P-1.75%; P from P-1.75%. Official BLR 5%, effective31October2025. Citi KFS effective3November2025: H+1.50%, cap P-2%; P-2%. Citi official rates page shows P5.25%, with no effective date exposed. Hang Seng KFS August2025: H+1.30%, cap P-1.75%; P5% effective31October2025. Links and dates are in src/market-data.mjs and the website.

The selected H scenarios use the prime-linked cap, yielding3.25% for this research snapshot. They do not imply the quoted H fixing or final offer must equal the cap. We do not redistribute HKAB daily fixings. The P examples are indicative published terms, not approved offers. No rate ranking or cashback estimate is inferred. Other banks remain in the dated research directory, with known evidence gaps.

## Property examples

Thirty-four usable attributed asking-price records from 28Hse are linked in src/listing-data.mjs, with individual source-updated and checked dates. They are manually reviewed factual examples, not a licensed automated listing feed or a guarantee of availability. No images, floor plans, agent descriptions or contact data are copied. Bedroom count and saleable area are source fields, not estimated layouts. Exact floor plans and dimensions are not inferred. One inconsistent Novi advertisement is retained only as an excluded provenance record. Hay Wah is one bedroom despite an advertisement suggesting potential conversion to two.

All matching records in this sample can be browsed in12-record pages, with price, area and update-date sorting. Filters cascade from region to administrative district to estate to bedrooms. Multiple units share one estate option. This is not market-wide coverage. Financial color checks run separately for every example. Region, district, estate and bedroom filters narrow only this sample. Empty results remain empty. Asking prices, bank valuations and registered transaction prices are separate concepts.

## Land Registry

Free monthly [price-band statistics](https://data.gov.hk/en-data/dataset/hk-lr-data5-landreg) are aggregate context. They are not unit-level prices or for-sale inventory. [IRIS searches](https://www.landreg.gov.hk/en/faq/faq_search_4.htm) are charged. The [MDB subscription](https://www.landreg.gov.hk/en/services/services_b_7.htm) is HK$19,100/month plus HK$1,070 application, minimum six months. Clause11 of the [subscription terms](https://www.landreg.gov.hk/pdf/en/lrmdb1.pdf) restricts onward use and redistribution. It is not an authorised public feed for this project. The Land Search API is limited to subscribing Authorized Institutions. No subscription, purchase or paid search was made. Instrument dates and registration dates differ and must not be conflated.

## Publication

Keith requested GitHub account lamkeykey2010 and GitHub Pages hosting. This is a development preview with indexing disabled. No AdSense scripts or tracking are configured. Future production expansion needs a suitable property-data arrangement, a freshness process for bank terms, real operator/contact details and advertising configuration. No general redistribution licence is granted for third-party material by publishing this source.

## Expansion checked 21 October 2026

Added24 directly checked asking-price examples. There are34 usable records, plus one excluded inconsistent advertisement. Per-record source and checked dates are in src/listing-data.mjs. Region/district/estate/bedroom choices cascade, and all matching records can be browsed with counts, sorting and12-record pages. District values are administrative districts, with locality retained separately. This remains a dated sample, not a live or market-wide feed. No licensed free listing API has been established.
