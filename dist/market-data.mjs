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
export const listings=[
 {id:'4063031',estate:'Novi',estateZh:'逸新',district:'Mong Kok',districtZh:'旺角',region:'Kowloon',price:3700000,sqft:226,bedrooms:0,updated:'2026-10-20',excluded:true,note:'Excluded from recommendations: structured price HK$3.7m conflicts with EN heading HK$3.8m and ZH heading HK$3.3m.'},
 {id:'4061725',estate:'Sun Lee Mansion',estateZh:'新利大廈',district:'Mong Kok / Prince Edward',districtZh:'旺角／太子',region:'Kowloon',price:3500000,sqft:311,bedrooms:2,updated:'2026-10-20'},
 {id:'4063115',estate:'AVA228',estateZh:'AVA228',district:'Sham Shui Po',districtZh:'深水埗',region:'Kowloon',price:4000000,sqft:236,bedrooms:1,updated:'2026-10-20'},
 {id:'4053941',estate:'Hay Wah Building',estateZh:'熙華大廈',district:'Wan Chai',districtZh:'灣仔',region:'Hong Kong',price:4980000,sqft:336,bedrooms:1,updated:'2026-10-20',note:'Current structured layout is one bedroom. Advertised conversion possibility is not the present layout.'},
 {id:'4063154',estate:'Flora Plaza',estateZh:'花都廣場',district:'Fanling',districtZh:'粉嶺',region:'New Territories',price:4200000,sqft:370,bedrooms:2,updated:'2026-10-20'},
 {id:'4063170',estate:'Royal Green',estateZh:'御皇庭',district:'Sheung Shui',districtZh:'上水',region:'New Territories',price:4440000,sqft:415,bedrooms:2,updated:'2026-10-20'},
 {id:'4063182',estate:'Lido Garden',estateZh:'麗都花園',district:'Sham Tseng',districtZh:'深井',region:'New Territories',price:5080000,sqft:617,bedrooms:3,updated:'2026-10-20'},
 {id:'4063188',estate:'The Yoho Hub, Phase B',estateZh:'The YOHO Hub B期',district:'Yuen Long',districtZh:'元朗',region:'New Territories',price:6200000,sqft:326,bedrooms:1,updated:'2026-10-20'},
 {id:'4063207',estate:'The Reach',estateZh:'尚悅',district:'Yuen Long',districtZh:'元朗',region:'New Territories',price:7150000,sqft:743,bedrooms:3,updated:'2026-10-20'},
 {id:'4048554',estate:'Ming Garden',estateZh:'明苑',district:'Mid-Levels West',districtZh:'西半山',region:'Hong Kong',price:8500000,sqft:505,bedrooms:2,updated:'2026-10-17'},
 {id:'4063178',estate:'Tierra Verde',estateZh:'盈翠半島',district:'Tsing Yi',districtZh:'青衣',region:'New Territories',price:9900000,sqft:518,bedrooms:1,updated:'2026-10-20'}
].map(r=>({...r,source:'https://www.28hse.com/en/buy/apartment/property-'+r.id,checkedOn,kind:'asking-price snapshot'}));
