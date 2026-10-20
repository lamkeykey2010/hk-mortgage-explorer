# HK Mortgage Explorer

A bilingual static webapp for preliminary Hong Kong private-resale affordability, detailed mortgage calculations and refinancing.

## Start

Requires Node.js22+. No dependencies or API keys.

    node build.mjs
    node --test tests/*.test.mjs
    node preview.mjs

Open http://127.0.0.1:4173/hk-mortgage-explorer/ . Generated output is dist/. Links support the GitHub Pages project path.

## Experience

- Step1 requires only available cash and monthly household income. Buying costs, a reserve and 20/25/30-year options are estimated automatically.
- A price slider checks cash and monthly repayments. Green fits the chosen comfortable income share, amber fits the50% outer benchmark, red fails either cash or repayment limits.
- Five selectable published H/P scenarios from HSBC, Citi and Hang Seng carry source and document dates. H scenarios use a cap-based planning assumption. They are not live quotes.
- Find my dream house contains34 usable source-linked asking-price records. Region, district, estate and bedroom choices depend on each other. All matches can be browsed with counts, sorting and12-record pages. The sample is dated, not a live market feed.
- Step2 retains the purchase calculator. Guarantors, employee plans and combining spouse benefits are future work.
- The refinance view compares equal remaining terms, interest, costs and retained cashback.

See RESEARCH.md for sources, dates, fee assumptions and limitations. Financial inputs stay in the browser tab. Downloads contain only the entered scenario. No advertising or analytics is active.

## GitHub Pages

Target repository: https://github.com/lamkeykey2010/hk-mortgage-explorer

Expected project URL, once deployed: https://lamkeykey2010.github.io/hk-mortgage-explorer/

.github/workflows/pages.yml builds, tests and deploys dist/ from main. Pages must use GitHub Actions. The final deployment result is recorded separately from this expected URL.
