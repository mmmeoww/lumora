// Проверка собранного сайта: битые внутренние ссылки, title/description/H1, дубли, canonical, страницы без входящих ссылок.
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, dirname, resolve, relative } from 'node:path';

const DIST = resolve('dist');
const files = [];
(function walk(d) { for (const f of readdirSync(d)) { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') && files.push(p); } })(DIST);

const problems = [];
const titles = new Map(), descs = new Map(), inbound = new Map();
const pageOf = (f) => relative(DIST, f);

for (const f of files) {
  const html = readFileSync(f, 'utf8');
  const name = pageOf(f);
  const title = html.match(/<title>(.*?)<\/title>/s)?.[1]?.trim();
  const desc = html.match(/<meta name="description" content="(.*?)"/s)?.[1]?.trim();
  const h1s = html.match(/<h1[\s>]/g) || [];
  if (!title) problems.push(`${name}: нет <title>`);
  if (!desc) problems.push(`${name}: нет meta description`);
  if (h1s.length !== 1) problems.push(`${name}: H1 найдено ${h1s.length}, нужен ровно один`);
  if (!name.startsWith('404') && !html.includes('rel="canonical"')) problems.push(`${name}: нет canonical`);
  if (/href="#"/.test(html)) problems.push(`${name}: есть href="#"`);
  for (const img of html.match(/<img\b[^>]*>/g) || []) if (!/\balt=/.test(img)) problems.push(`${name}: <img> без alt`);
  if (title) titles.set(title, [...(titles.get(title) || []), name]);
  if (desc) descs.set(desc, [...(descs.get(desc) || []), name]);

  if (name === '404.html') continue; // абсолютная <base>, ссылки проверяются относительно корня
  for (const m of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const ref = m[1];
    if (/^(https?:|mailto:|tel:|data:|#)/.test(ref)) continue;
    const clean = ref.split('#')[0].split('?')[0];
    if (!clean) continue;
    let target = resolve(dirname(f), clean);
    if (clean.endsWith('/') || !/\.[a-z0-9]+$/i.test(clean)) target = join(target, 'index.html');
    if (!existsSync(target)) problems.push(`${name}: битая ссылка ${ref}`);
    else if (target.endsWith('.html') && target !== f) inbound.set(pageOf(target), (inbound.get(pageOf(target)) || 0) + 1);
  }
}
for (const [t, p] of titles) if (p.length > 1) problems.push(`Дубль title «${t}»: ${p.join(', ')}`);
for (const [d, p] of descs) if (p.length > 1) problems.push(`Дубль description: ${p.join(', ')}`);
for (const f of files) { const n = pageOf(f); if (n !== 'index.html' && n !== '404.html' && !inbound.get(n)) problems.push(`${n}: нет входящих внутренних ссылок`); }

for (const f of ['sitemap.xml', 'robots.txt']) if (!existsSync(join(DIST, f))) problems.push(`нет ${f}`);

console.log(`Проверено страниц: ${files.length}`);
if (problems.length) { console.log('\nПроблемы:\n- ' + problems.join('\n- ')); process.exit(1); }
console.log('Проблем не найдено.');
