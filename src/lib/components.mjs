import { cover } from './art.mjs';

export const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const fmtDate = (iso) => new Date(iso + 'T12:00:00Z').toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

export function button({ href, label, variant = 'primary', goal = '', arrow = false, attrs = '' }) {
  return `<a class="btn btn--${variant}" href="${href}"${goal ? ` data-goal="${goal}"` : ''}${attrs}>${esc(label)}${arrow ? '<span aria-hidden="true">→</span>' : ''}</a>`;
}

export function sectionHeading({ eyebrow = '', title, lead = '', level = 2, center = false }) {
  return `<header class="section-heading${center ? ' is-center' : ''}">
${eyebrow ? `<p class="eyebrow">${esc(eyebrow)}</p>` : ''}<h${level}>${esc(title)}</h${level}>${lead ? `<p class="lead">${esc(lead)}</p>` : ''}</header>`;
}

export function breadcrumbs(items, root) {
  if (!items || items.length < 2) return '';
  const li = items.map(([label, path], i) => {
    const last = i === items.length - 1;
    return last ? `<li aria-current="page">${esc(label)}</li>` : `<li><a href="${root}${path}">${esc(label)}</a></li>`;
  }).join('');
  return `<nav class="breadcrumbs" aria-label="Хлебные крошки"><ol>${li}</ol></nav>`;
}

export function gameCard(a, root) {
  return `<article class="card game-card" data-item data-title="${esc(a.title + ' ' + a.short)}" data-genre="${esc(a.genre)}" data-players="${a.playersMin}" data-name="${esc(a.title)}">
<a class="card__media" href="${root}games/${a.slug}/" tabindex="-1" aria-hidden="true">${cover(a.motif, { label: '', seed: a.slug })}</a>
<div class="card__body">
<p class="tags"><span class="tag tag--gold">${esc(a.genre)}</span><span class="tag">${esc(a.duration)}</span><span class="tag">${esc(a.players)}</span></p>
<h3><a href="${root}games/${a.slug}/">${esc(a.title)}</a></h3>
<p>${esc(a.short)}</p>
<a class="more" href="${root}games/${a.slug}/" aria-label="Подробнее о приключении «${esc(a.title)}»">Подробнее <span aria-hidden="true">→</span></a>
</div></article>`;
}

export function articleCard(a, root) {
  return `<article class="card article-card" data-item data-title="${esc(a.title + ' ' + a.description + ' ' + a.tags.join(' '))}" data-genre="${esc(a.category)}" data-tags="${esc(a.tags.join('|'))}">
<a class="card__media" href="${root}blog/${a.slug}/" tabindex="-1" aria-hidden="true">${cover(a.art, { label: '', seed: a.slug })}</a>
<div class="card__body">
<p class="tags"><span class="tag tag--gold">${esc(a.category)}</span><span class="tag"><time datetime="${a.date}">${fmtDate(a.date)}</time></span></p>
<h3><a href="${root}blog/${a.slug}/">${esc(a.title)}</a></h3>
<p>${esc(a.description)}</p>
<a class="more" href="${root}blog/${a.slug}/" aria-label="Читать статью «${esc(a.title)}»">Читать, ${a.readTime} мин <span aria-hidden="true">→</span></a>
</div></article>`;
}

export function videoCard(v, root, motif = 'door') {
  const soon = !v.embed && !v.file;
  return `<article class="card video-card" data-item data-title="${esc(v.title + ' ' + v.description)}" data-genre="${esc(v.category)}">
<a class="card__media card__media--video" href="${root}videos/${v.slug}/" tabindex="-1" aria-hidden="true">${cover(motif, { label: '', seed: v.slug })}<span class="play" aria-hidden="true"></span></a>
<div class="card__body">
<p class="tags"><span class="tag tag--gold">${esc(v.category)}</span>${soon ? '<span class="tag">Скоро</span>' : v.duration ? `<span class="tag">${esc(v.duration)}</span>` : ''}</p>
<h3><a href="${root}videos/${v.slug}/">${esc(v.title)}</a></h3>
<p>${esc(v.description)}</p>
</div></article>`;
}

export function accordion(items, root, { name = 'faq' } = {}) {
  return `<div class="accordion">${items.map((it) => `<details class="accordion__item" name="${name}">
<summary>${esc(it.q)}</summary>
<div class="accordion__body"><p>${esc(it.a)}</p>${it.link ? `<p><a class="more" href="${root}${it.link[0]}">${esc(it.link[1])} <span aria-hidden="true">→</span></a></p>` : ''}</div>
</details>`).join('')}</div>`;
}

export function field({ id, label, type = 'text', required = false, hint = '', rows = 0, options = null, extra = '', name = id }) {
  const req = required ? ' required aria-required="true"' : '';
  const hintId = hint ? ` aria-describedby="${id}-hint ${id}-err"` : ` aria-describedby="${id}-err"`;
  let control;
  if (options) {
    control = `<select id="${id}" name="${name}"${req}${hintId}>${options.map((o) => `<option value="${esc(o.value ?? o)}">${esc(o.label ?? o)}</option>`).join('')}</select>`;
  } else if (rows) {
    control = `<textarea id="${id}" name="${name}" rows="${rows}"${req}${hintId}${extra}></textarea>`;
  } else {
    control = `<input id="${id}" name="${name}" type="${type}"${req}${hintId}${extra}>`;
  }
  return `<div class="field">
<label for="${id}">${esc(label)}${required ? '' : ' <span class="opt">(необязательно)</span>'}</label>${control}
${hint ? `<p class="hint" id="${id}-hint">${esc(hint)}</p>` : ''}<p class="error" id="${id}-err" role="alert"></p></div>`;
}

export function emptyState(text) {
  return `<div class="state" data-empty hidden><p>${esc(text)}</p></div>`;
}

export function ctaBand({ title, text, root, label = 'Создать приключение', goal = 'cta_create_band' }) {
  return `<section class="section cta-band"><div class="container"><div class="cta-band__box">
<h2>${esc(title)}</h2><p>${esc(text)}</p>
<div class="actions">${button({ href: root + 'create/', label, goal, arrow: true })}${button({ href: root + 'games/', label: 'Посмотреть примеры', variant: 'ghost' })}</div>
</div></div></section>`;
}
