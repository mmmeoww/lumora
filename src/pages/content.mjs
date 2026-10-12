import { adventures, genres, bySlug } from '../data/adventures.mjs';
import { articles, articleCategories, allTags, articleBySlug } from '../data/articles.mjs';
import { videos, videoCategories, videoBySlug } from '../data/videos.mjs';
import { faq, faqCategories } from '../data/faq.mjs';
import { cover } from '../lib/art.mjs';
import { config } from '../config.mjs';
import { button, sectionHeading, gameCard, articleCard, videoCard, accordion, ctaBand, emptyState, esc, fmtDate } from '../lib/components.mjs';

const chip = (value, label, pressed = false) => `<button type="button" class="chip" data-chip="${esc(value)}" aria-pressed="${pressed}">${esc(label)}</button>`;
const searchBox = (label, ph) => `<div class="search"><label class="sr-only" for="q">${label}</label><input id="q" type="search" data-search placeholder="${ph}" autocomplete="off"></div>`;
const sorted = [...articles].sort((a, b) => b.date.localeCompare(a.date));

export const pages = [];

/* ---------- Приключения ---------- */
pages.push({
  path: 'games/', nav: 'games',
  title: 'Каталог приключений: примеры персональных игр по личным историям',
  description: 'Демонстрационные приключения LUMORA: драма, мистика, романтика, детектив, семейные и фантастические сюжеты. Найдите жанр и вдохновитесь.',
  crumbs: [['Главная', ''], ['Приключения']],
  render: (root) => `<section class="section section--page"><div class="container">
<header class="page-head"><h1>Каталог приключений</h1><p class="lead">Демонстрационные концепты показывают, как личная история может стать игрой. Это примеры, а не заказы реальных людей.</p></header>
<div class="toolbar" data-filter>
${searchBox('Поиск по приключениям', 'Поиск по названию или описанию')}
<div class="chips" role="group" aria-label="Жанр">${chip('', 'Все жанры', true)}${genres.map((g) => chip(g, g)).join('')}</div>
<div class="sort"><label for="sort">Сортировка</label><select id="sort" data-sort><option value="">По умолчанию</option><option value="name">По названию</option><option value="players">По числу участников</option></select></div>
<p class="count" data-count aria-live="polite"></p>
<div class="grid grid--3" data-list>${adventures.map((a) => gameCard(a, root)).join('')}</div>
${emptyState('По вашему запросу ничего не нашлось. Попробуйте другой жанр или сбросьте поиск.')}
</div></div></section>
${ctaBand({ title: 'Не нашли свой жанр?', text: 'Расскажите историю, и мы подберём формат под неё.', root })}`,
});

for (const a of adventures) {
  const related = a.related.map(bySlug).filter(Boolean);
  const gallery = [0, 1, 2].map((v) => `<figure>${cover(a.motif, { variant: v, label: `Иллюстрация концепта «${a.title}», кадр ${v + 1}`, seed: a.slug })}</figure>`).join('');
  pages.push({
    path: `games/${a.slug}/`, nav: 'games', goalView: 'adventure_view',
    title: `${a.title} — пример приключения`,
    description: `${a.short} Жанр: ${a.genre.toLowerCase()}, ${a.duration}, ${a.players}. Демонстрационное приключение LUMORA.`,
    crumbs: [['Главная', ''], ['Приключения', 'games/'], [a.title]],
    render: (root) => `<article class="section section--page"><div class="container">
<div class="detail">
<div class="detail__main">
<header class="page-head"><p class="tags"><span class="tag tag--gold">${esc(a.genre)}</span><span class="tag">Демонстрационный концепт</span></p>
<h1>${esc(a.title)}</h1><p class="lead">${esc(a.short)}</p></header>
<div class="gallery">${gallery}</div>
<h2>О приключении</h2>${a.story.map((p) => `<p>${esc(p)}</p>`).join('')}
<h2>Что внутри</h2><ul class="check">${a.features.map((f) => `<li>${esc(f)}</li>`).join('')}</ul>
</div>
<aside class="detail__side" aria-label="Параметры приключения"><div class="panel">
<h2>Параметры</h2>
<dl class="facts"><div><dt>Жанр</dt><dd>${esc(a.genre)}</dd></div><div><dt>Настроение</dt><dd>${esc(a.mood)}</dd></div><div><dt>Продолжительность</dt><dd>${esc(a.duration)}</dd></div><div><dt>Участники</dt><dd>${esc(a.players)}</dd></div><div><dt>Стоимость</dt><dd>Определяется после обсуждения заявки</dd></div></dl>
${button({ href: root + 'create/', label: 'Создать похожее', goal: 'cta_create_adventure', arrow: true })}
<p class="hint">Это пример. Ваше приключение будет собрано из вашей собственной истории.</p>
</div></aside>
</div>
<section class="related" aria-labelledby="rel"><h2 id="rel">Похожие приключения</h2><div class="grid grid--2">${related.map((r) => gameCard(r, root)).join('')}</div></section>
</div></article>`,
  });
}

/* ---------- Блог ---------- */
pages.push({
  path: 'blog/', nav: 'blog',
  title: 'Блог: как придумывать интерактивные истории и игровые сценарии',
  description: 'Статьи LUMORA о том, как создавать интерактивные истории, придумывать игровые сценарии и превращать личные воспоминания в игры.',
  crumbs: [['Главная', ''], ['Блог']],
  render: (root) => `<section class="section section--page"><div class="container">
<header class="page-head"><h1>Блог LUMORA</h1><p class="lead">Практические материалы об интерактивных историях, сценариях и совместных приключениях.</p></header>
<div class="toolbar" data-filter>
${searchBox('Поиск по статьям', 'Поиск по статьям')}
<div class="chips" role="group" aria-label="Категория">${chip('', 'Все', true)}${articleCategories.map((c) => chip(c, c)).join('')}</div>
<p class="tagline">Теги: ${allTags.map((t) => `<button type="button" class="tagbtn" data-tag="${esc(t)}" aria-pressed="false">#${esc(t)}</button>`).join(' ')}</p>
<p class="count" data-count aria-live="polite"></p>
<div class="grid grid--2" data-list>${sorted.map((a) => articleCard(a, root)).join('')}</div>
${emptyState('Статей по такому запросу пока нет.')}
</div></div></section>`,
});

for (const a of articles) {
  const rel = a.related.map(articleBySlug).filter(Boolean);
  pages.push({
    path: `blog/${a.slug}/`, nav: 'blog', ogType: 'article',
    title: a.title, description: a.description,
    crumbs: [['Главная', ''], ['Блог', 'blog/'], [a.title]],
    jsonld: (url) => [{
      '@context': 'https://schema.org', '@type': 'Article', headline: a.title, description: a.description,
      datePublished: a.date, dateModified: a.date, inLanguage: 'ru', mainEntityOfPage: url,
      author: { '@type': 'Organization', name: 'LUMORA' }, publisher: { '@type': 'Organization', name: 'LUMORA', logo: { '@type': 'ImageObject', url: config.siteUrl + '/assets/favicon.svg' } },
    }],
    render: (root) => `<article class="section section--page"><div class="container container--article">
<header class="page-head"><p class="tags"><a class="tag tag--gold" href="${root}blog/">${esc(a.category)}</a><span class="tag"><time datetime="${a.date}">${fmtDate(a.date)}</time></span><span class="tag">${a.readTime} мин чтения</span></p>
<h1>${esc(a.title)}</h1><p class="lead">${esc(a.description)}</p></header>
<div class="prose">${a.body.replaceAll('{{root}}', root)}</div>
<p class="byline">Автор: ${esc(a.author)}</p>
<aside class="article-cta"><h2>Хотите попробовать на своей истории?</h2><p>Расскажите её, и мы подскажем, как превратить её в приключение.</p>${button({ href: root + 'create/', label: 'Создать приключение', goal: 'cta_create_article', arrow: true })}</aside>
<section class="related" aria-labelledby="rel"><h2 id="rel">Читайте также</h2><div class="grid grid--2">${rel.map((r) => articleCard(r, root)).join('')}</div></section>
</div></article>`,
  });
}

/* ---------- Видео ---------- */
pages.push({
  path: 'videos/', nav: 'videos',
  title: 'Видео о LUMORA: примеры и разборы персональных приключений',
  description: 'Видеотека LUMORA: ролики о проекте, инструкции по созданию историй и разборы примеров. Первые видео готовятся.',
  crumbs: [['Главная', ''], ['Видео']],
  render: (root) => `<section class="section section--page"><div class="container">
<header class="page-head"><h1>Видео</h1><p class="lead">Ролики о проекте, инструкции и разборы примеров. Первые видео сейчас готовятся, и страницы уже ждут их.</p></header>
<div class="toolbar" data-filter>
${searchBox('Поиск по видео', 'Поиск по видео')}
<div class="chips" role="group" aria-label="Категория">${chip('', 'Все', true)}${videoCategories.map((c) => chip(c, c)).join('')}</div>
<p class="count" data-count aria-live="polite"></p>
<div class="grid grid--3" data-list>${videos.map((v) => videoCard(v, root, bySlug(v.adventure)?.motif)).join('')}</div>
${emptyState('Видео по такому запросу пока нет.')}
</div></div></section>`,
});

for (const v of videos) {
  const art = articleBySlug(v.article), adv = bySlug(v.adventure);
  pages.push({
    path: `videos/${v.slug}/`, nav: 'videos', goalView: 'video_view',
    title: v.title, description: v.description,
    crumbs: [['Главная', ''], ['Видео', 'videos/'], [v.title]],
    render: (root) => `<article class="section section--page"><div class="container container--article">
<header class="page-head"><p class="tags"><span class="tag tag--gold">${esc(v.category)}</span>${v.embed ? '' : '<span class="tag">Скоро</span>'}</p><h1>${esc(v.title)}</h1><p class="lead">${esc(v.description)}</p></header>
${v.embed
    ? `<div class="player" data-player data-embed="${esc(v.embed)}" data-title="${esc(v.title)}">${cover(adv?.motif || 'door', { label: '', seed: v.slug })}<button type="button" class="player__btn" aria-label="Смотреть видео «${esc(v.title)}»"><span class="play"></span></button></div>`
    : `<div class="player player--soon">${cover(adv?.motif || 'door', { label: '', seed: v.slug })}<p class="player__note">Видео появится здесь после публикации</p></div>`}
<h2>Связанные материалы</h2>
<ul class="check">${art ? `<li>Статья: <a href="${root}blog/${art.slug}/">${esc(art.title)}</a></li>` : ''}${adv ? `<li>Пример приключения: <a href="${root}games/${adv.slug}/">${esc(adv.title)}</a></li>` : ''}<li><a href="${root}create/" data-goal="cta_create_video">Создать своё приключение</a></li></ul>
</div></article>`,
  });
}

/* ---------- FAQ ---------- */
pages.push({
  path: 'faq/', nav: 'faq',
  title: 'Вопросы и ответы о LUMORA',
  description: 'Ответы на частые вопросы: что такое LUMORA, как создать приключение, как проходит заказ и оплата, как защищены ваши данные.',
  crumbs: [['Главная', ''], ['FAQ']],
  jsonld: () => [{ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }],
  render: (root) => `<section class="section section--page"><div class="container container--narrow">
<header class="page-head"><h1>Вопросы и ответы</h1><p class="lead">Если не нашли нужный ответ, напишите нам через страницу «Контакты».</p></header>
${faqCategories.map((c) => `<section class="faq-group"><h2>${esc(c)}</h2>${accordion(faq.filter((f) => f.cat === c), root, { name: 'faq-' + c })}</section>`).join('')}
<p class="center">${button({ href: root + 'contacts/', label: 'Задать вопрос', variant: 'ghost' })}</p>
</div></section>`,
});
