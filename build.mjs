// Сборщик статического сайта LUMORA. Зависимостей нет: node build.mjs → dist/
import { rmSync, mkdirSync, writeFileSync, cpSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { config } from './src/config.mjs';
import { renderPage } from './src/lib/layout.mjs';
import { home } from './src/pages/home.mjs';
import { pages as contentPages } from './src/pages/content.mjs';
import { pages as staticPages } from './src/pages/static.mjs';

const OUT = join(process.cwd(), 'dist');
const pages = [home, ...staticPages, ...contentPages];

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });
cpSync('src/assets', join(OUT, 'assets'), { recursive: true });

const rootFor = (path) => {
  const dir = path.endsWith('/') ? path : path.split('/').slice(0, -1).join('/');
  return dir ? '../'.repeat(dir.split('/').filter(Boolean).length) : '';
};

const seen = new Set();
for (const page of pages) {
  if (seen.has(page.path)) throw new Error(`Дубликат адреса: ${page.path}`);
  seen.add(page.path);
  const file = page.path === '' || page.path.endsWith('/') ? join(page.path, 'index.html') : page.path;
  const target = join(OUT, file);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, renderPage(page, rootFor(page.path)));
}

const urls = pages.filter((p) => !p.noindex).map((p) => `  <url><loc>${config.siteUrl}/${p.path}</loc></url>`).join('\n');
writeFileSync(join(OUT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
writeFileSync(join(OUT, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${config.siteUrl}/sitemap.xml\n`);
writeFileSync(join(OUT, '.nojekyll'), '');
if (existsSync('CNAME')) cpSync('CNAME', join(OUT, 'CNAME'));

console.log(`Собрано страниц: ${pages.length} → dist/ (siteUrl: ${config.siteUrl})`);
