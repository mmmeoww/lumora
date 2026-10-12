import { config } from '../config.mjs';
import { logoMark } from './art.mjs';
import { esc, breadcrumbs } from './components.mjs';

export const NAV = [
  ['about', 'О проекте', 'about/'],
  ['games', 'Приключения', 'games/'],
  ['how', 'Как это работает', 'how-it-works/'],
  ['blog', 'Блог', 'blog/'],
  ['videos', 'Видео', 'videos/'],
  ['faq', 'FAQ', 'faq/'],
  ['contacts', 'Контакты', 'contacts/'],
];

function header(root, active) {
  const links = NAV.map(([key, label, path]) => `<li><a href="${root}${path}"${key === active ? ' aria-current="page"' : ''}>${label}</a></li>`).join('');
  return `<header class="site-header"><div class="site-header__bar">
<a class="logo" href="${root}" aria-label="LUMORA — на главную">${logoMark()}<span>LUMORA</span></a>
<nav class="nav" id="site-nav" aria-label="Основная навигация"><ul>${links}</ul>
<a class="btn btn--outline nav__cta" href="${root}create/" data-goal="cta_create_header">Создать приключение</a></nav>
<button class="burger" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="Открыть меню"><span></span><span></span><span></span></button>
</div></header>`;
}

function footer(root) {
  const social = config.social.length
    ? `<ul class="footer__list">${config.social.map((s) => `<li><a href="${esc(s.url)}" rel="noopener me">${esc(s.label)}</a></li>`).join('')}</ul>` : '';
  const col = (title, items) => `<div><h2 class="footer__title">${title}</h2><ul class="footer__list">${items.map(([l, p]) => `<li><a href="${root}${p}">${l}</a></li>`).join('')}</ul></div>`;
  return `<footer class="site-footer"><div class="container">
<div class="footer__grid">
<div class="footer__brand"><a class="logo" href="${root}">${logoMark()}<span>LUMORA</span></a>
<p>${esc(config.slogan)}</p><p class="muted">Превращаем личные истории в приключения, которые можно прожить вместе.</p>${social}</div>
${col('Разделы', [['О проекте', 'about/'], ['Приключения', 'games/'], ['Как это работает', 'how-it-works/'], ['Купить', 'buy/']])}
${col('Материалы', [['Блог', 'blog/'], ['Видео', 'videos/'], ['Вопросы и ответы', 'faq/'], ['Контакты', 'contacts/']])}
${col('Документы', [['Политика конфиденциальности', 'privacy/'], ['Пользовательское соглашение', 'terms/'], ['Cookies', 'cookies/']])}
</div>
<p class="footer__copy">© ${new Date().getFullYear()} LUMORA. Все права защищены.</p>
</div></footer>`;
}

const consent = () => `<div class="consent" id="consent" role="dialog" aria-label="Согласие на cookies" hidden>
<p>Мы используем Яндекс Метрику, чтобы понимать, какие страницы полезны. Она работает только с вашего согласия. <a href="__ROOT__cookies/">Подробнее</a></p>
<div class="consent__actions"><button class="btn btn--primary btn--sm" type="button" data-consent="yes">Разрешить</button><button class="btn btn--ghost btn--sm" type="button" data-consent="no">Отклонить</button></div></div>`;

export function renderPage(page, root) {
  const url = `${config.siteUrl}/${page.path}`;
  const title = page.path === '' ? page.title : `${page.title} — LUMORA`;
  const ogImage = `${config.siteUrl}/assets/og.png`;
  const ld = [...(page.jsonld ? page.jsonld(url) : [])];
  if (page.crumbs && page.crumbs.length > 1) {
    ld.push({
      '@context': 'https://schema.org', '@type': 'BreadcrumbList',
      itemListElement: page.crumbs.map(([name, p], i) => ({ '@type': 'ListItem', position: i + 1, name, item: `${config.siteUrl}/${p ?? page.path}` })),
    });
  }
  const robots = page.noindex ? '<meta name="robots" content="noindex, follow">' : '';
  const canonical = page.noindex ? '' : `<link rel="canonical" href="${url}">`;
  const base = page.absoluteBase ? `<base href="${config.siteUrl}/">` : '';
  return `<!doctype html>
<html lang="${config.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
${base}<title>${esc(title)}</title>
<meta name="description" content="${esc(page.description)}">
${robots}${canonical}
<meta name="theme-color" content="#080D18">
<meta property="og:type" content="${page.ogType || 'website'}">
<meta property="og:site_name" content="LUMORA">
<meta property="og:locale" content="ru_RU">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(page.description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${ogImage}">
<meta name="twitter:card" content="summary_large_image">
${config.yandexVerification ? `<meta name="yandex-verification" content="${esc(config.yandexVerification)}">` : ''}
${config.metrikaId ? `<meta name="metrika-id" content="${esc(config.metrikaId)}">` : ''}
<link rel="icon" href="${root}assets/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap">
<link rel="stylesheet" href="${root}assets/css/main.css">
${ld.map((o) => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, '\\u003c')}</script>`).join('\n')}
<script>document.documentElement.classList.add('js')</script>
</head>
<body class="${page.bodyClass || ''}"${page.goalView ? ` data-goal-view="${page.goalView}"` : ''}>
<a class="skip" href="#main">Перейти к содержимому</a>
${header(root, page.nav)}
<main id="main">
${page.hero ? '' : breadcrumbs(page.crumbs, root) ? `<div class="container crumbs-wrap">${breadcrumbs(page.crumbs, root)}</div>` : ''}
${page.render(root)}
</main>
${footer(root)}
${config.metrikaId ? consent().replace('__ROOT__', root) : ''}
<script src="${root}assets/js/main.js" defer></script>
</body>
</html>`;
}
