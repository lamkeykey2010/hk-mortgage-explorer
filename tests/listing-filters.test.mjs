import test from 'node:test';
import assert from 'node:assert/strict';
import {listingFilterState,listingPage} from '../src/listing-filters.mjs';
import {listings} from '../src/market-data.mjs';

test('Kowloon removes Wan Chai and its estate and clears incompatible prior selections',()=>{
 const state=listingFilterState(listings,{region:'Kowloon',district:'Wan Chai',estate:'4053941',bedrooms:'1'});
 assert.equal(state.values.district,'all');assert.equal(state.values.estate,'all');
 assert.ok(!state.options.district.includes('Wan Chai'));assert.ok(!state.options.estate.includes('4053941'));
 assert.ok(state.options.district.includes('Sham Shui Po'));
});
test('district narrows estates and an estate narrows actual published bedroom choices',()=>{
 const state=listingFilterState(listings,{region:'Hong Kong',district:'Wan Chai',estate:'4053941',bedrooms:'2'});
 assert.equal(state.values.estate,'4053941');assert.equal(state.values.bedrooms,'all');
 assert.deepEqual(state.options.bedrooms,['1']);
 for(const id of state.options.estate)assert.equal(listings.find(r=>r.id===id).district,'Wan Chai');
});
test('compatible choices survive and excluded advertisements never enter filter options',()=>{
 const state=listingFilterState(listings,{region:'Kowloon',district:'Sham Shui Po',estate:'4063115',bedrooms:'1'});
 assert.deepEqual(state.values,{region:'Kowloon',district:'Sham Shui Po',estate:'4063115',bedrooms:'1'});
 assert.ok(!listingFilterState(listings).options.estate.includes('4063031'));
});
test('pagination exposes all matches exactly once and sorting preserves the full set',()=>{
 const rows=Array.from({length:31},(_,i)=>({id:String(i),price:(31-i)*100000,sqft:300+i,updated:'2026-10-20'}));
 const first=listingPage(rows),second=listingPage(rows,{page:2}),last=listingPage(rows,{page:3});
 assert.equal(first.total,31);assert.equal(first.pages,3);assert.equal(first.items.length,12);assert.equal(last.items.length,7);
 const combined=[...first.items,...second.items,...last.items];assert.equal(new Set(combined.map(r=>r.id)).size,31);
 assert.equal(listingPage(rows,{sort:'price-desc'}).items[0].price,3100000);
 assert.equal(listingPage(rows,{sort:'area-desc'}).items[0].sqft,330);
 assert.equal(listingPage(rows,{page:99}).page,3);assert.equal(listingPage([]).total,0);
});

test('an estate choice groups all units in the same building instead of duplicating its option',()=>{
 const state=listingFilterState(listings,{region:'Kowloon',district:'Sham Shui Po',estate:'4063123',bedrooms:'2'});
 assert.ok(state.options.estate.includes('4063123'));assert.ok(!state.options.estate.includes('4063085'));
});
