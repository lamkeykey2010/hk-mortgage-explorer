import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,readdir,stat} from 'node:fs/promises';
import {resolve,dirname} from 'node:path';
const root=resolve('dist');
async function files(dir){const result=[];for(const name of await readdir(dir)){const path=resolve(dir,name);if((await stat(path)).isDirectory())result.push(...await files(path));else result.push(path);}return result;}
const pages=(await files(root)).filter(p=>p.endsWith('.html'));
test('both languages have a calculator and two guide pages',async()=>{
 assert.equal(pages.length,6);
 for(const file of pages){const html=await readFile(file,'utf8');assert.match(html,/<title>[^<]+<\/title>/);assert.match(html,/rel="canonical"/);assert.match(html,/hreflang="zh-Hant"/);assert.match(html,/hreflang="en"/);assert.match(html,/noindex,nofollow/);}
});
test('every local navigation and asset target exists',async()=>{
 for(const file of pages){const html=await readFile(file,'utf8');
  for(const match of html.matchAll(/(?:href|src)="([^"]+)"/g)){
   const url=match[1];if(/^https?:/.test(url))continue;
   const [rawPath,anchor]=url.split('#');const path=rawPath.replace(/^\/hk-mortgage-explorer(?=\/)/,'');const target=path?resolve(root,'.'+path+(path.endsWith('/')?'index.html':'')):file;
   assert.ok((await stat(target)).isFile(),target);
   if(anchor){assert.ok((await readFile(target,'utf8')).includes(`id="${anchor}"`),`${target}#${anchor}`);}
  }
 }
});
test('form labels are connected and IDs are unique',async()=>{
 for(const file of [resolve(root,'index.html'),resolve(root,'zh/index.html')]){
  const html=await readFile(file,'utf8');const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(new Set(ids).size,ids.length);
  for(const m of html.matchAll(/<input id="([^"]+)"/g))assert.ok(html.includes(`for="${m[1]}"`));
  assert.ok(html.includes('id="buy-form"') && html.includes('id="refi-form"'));
 }
});
test('preview has no live ads, trackers or fabricated publisher identity',async()=>{
 for(const file of [...pages,resolve(root,'app.mjs')]){
  const text=await readFile(file,'utf8');assert.doesNotMatch(text,/ca-pub-|adsbygoogle|googletagmanager|google-analytics|fetch\(|localStorage|sessionStorage/);
 }
 assert.match(await readFile(resolve(root,'robots.txt'),'utf8'),/Disallow: \//);
});
