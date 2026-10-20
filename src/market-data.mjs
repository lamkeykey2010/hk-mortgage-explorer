// Manually researched public source snapshot. No daily HIBOR redistribution or live listing feed.
export const checkedOn='2026-10-20';
export const dutySource='https://www.ird.gov.hk/eng/faq/avd.htm';
export const commissionSource='https://www.eaa.org.hk/Portals/0/Sections/LGA/Circular/24-01_CRE.pdf';
const hsbc={bank:'HSBC',bankZh:'滙豐',prime:5,primeDate:'2025-10-31',documentDate:'2026-05',source:'https://www.hsbc.com.hk/content/dam/hsbc/hk/docs/mortgages/home-loan/key-facts-statement.pdf',reference:'https://www.hsbc.com.hk/investments/market-information/hk/lending-rate/',rate:3.25};
const citi={bank:'Citibank',bankZh:'花旗',prime:5.25,primeDate:null,documentDate:'2025-11-03',source:'https://www.citibank.com.hk/english/loans/mortgages/pdf/key-facts-statement.pdf',reference:'https://www.citibank.com.hk/english/info/rates.html',rate:3.25};
export const plans=[
 {...hsbc,id:'hsbc-h',type:'H',formula:'1M H + 1.30%, cap P − 1.75%',cap:true,from:true},
 {...hsbc,id:'hsbc-p',type:'P',formula:'P − 1.75% (from)',cap:false,from:true},
 {...citi,id:'citi-h',type:'H',formula:'1M H + 1.50%, cap P − 2.00%',cap:true,from:false},
 {...citi,id:'citi-p',type:'P',formula:'P − 2.00%',cap:false,from:false},
 {id:'hangseng-h',bank:'Hang Seng',bankZh:'恒生',type:'H',formula:'1M H + 1.30%, cap P − 1.75%',cap:true,from:true,prime:5,rate:3.25,primeDate:'2025-10-31',documentDate:'2025-08',source:'https://www.hangseng.com/content/dam/wpb/hase/config/bde/pws/personal/mortgage/pdfs/FMKFS3-R5.pdf',reference:'https://cms.hangseng.com/cms/ccd/chi/PDF/301025c.pdf'}
];
export {listings} from './listing-data.mjs';
