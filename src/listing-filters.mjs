// Cascading choices use source coverage. Price filtering is applied to results separately.
export function listingFilterState(rows,requested={}){
 const active=rows.filter(r=>!r.excluded);
 const unique=(items,key)=>[...new Set(items.map(r=>r[key]))];
 const choose=(value,allowed)=>allowed.includes(value)?value:'all';
 const regions=unique(active,'region'),region=choose(requested.region,regions);
 const regionRows=active.filter(r=>region==='all'||r.region===region);
 const districts=unique(regionRows,'district'),district=choose(requested.district,districts);
 const districtRows=regionRows.filter(r=>district==='all'||r.district===district);
 const buildings=new Map();
 for(const r of districtRows){const key=r.region+'|'+r.district+'|'+r.estate;if(!buildings.has(key))buildings.set(key,r);}
 const estates=[...buildings.values()].map(r=>r.id),estate=choose(requested.estate,estates);
 const chosenBuilding=districtRows.find(r=>r.id===estate);
 const estateRows=districtRows.filter(r=>estate==='all'||(r.estate===chosenBuilding.estate&&r.region===chosenBuilding.region&&r.district===chosenBuilding.district));
 const bedrooms=unique(estateRows,'bedrooms').map(String).sort((a,b)=>Number(a)-Number(b));
 return {values:{region,district,estate,bedrooms:choose(String(requested.bedrooms),bedrooms)},
  options:{region:regions,district:districts,estate:estates,bedrooms}};
}
export function listingPage(rows,{page=1,pageSize=12,sort='price-asc'}={}){
 const sorted=[...rows].sort(sort==='area-desc'?(a,b)=>b.sqft-a.sqft||a.price-b.price:
  sort==='price-desc'?(a,b)=>b.price-a.price||a.id.localeCompare(b.id):
  sort==='recent'?(a,b)=>b.updated.localeCompare(a.updated)||a.price-b.price:
  (a,b)=>a.price-b.price||a.id.localeCompare(b.id));
 const pages=Math.max(1,Math.ceil(sorted.length/pageSize));
 const current=Math.max(1,Math.min(pages,Math.trunc(Number(page))||1));
 const start=(current-1)*pageSize;
 return {items:sorted.slice(start,start+pageSize),total:sorted.length,page:current,pages,start:sorted.length?start+1:0,end:Math.min(start+pageSize,sorted.length)};
}
