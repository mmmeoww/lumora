import { portal } from '../lib/art.mjs';
import { adventures } from '../data/adventures.mjs';
import { articles } from '../data/articles.mjs';
import { videos } from '../data/videos.mjs';
import { faq } from '../data/faq.mjs';
import { button, sectionHeading, gameCard, articleCard, videoCard, accordion, ctaBand, esc } from '../lib/components.mjs';
import { config } from '../config.mjs';

const advantages = [
  ['Из вашей истории', 'Сюжет строится на ваших воспоминаниях, местах и людях, а не на шаблоне, который одинаков для всех.'],
  ['Один опыт на двоих и больше', 'Приключение рассчитано на совместное прохождение: решать и переживать можно вместе.'],
  ['Вы задаёте настроение', 'Жанр, темп и тон выбираете вы: от тёплой драмы до детектива или фантастики.'],
  ['Подарок с характером', 'Такое приключение нельзя купить на полке. Оно существует только для вас.'],
];

const steps = [
  ['Расскажите историю', 'Опишите событие, место или отношения в свободной форме. Достаточно нескольких абзацев.'],
  ['Выберите жанр и настроение', 'Укажите, каким должно быть приключение: мистическим, тёплым, напряжённым или светлым.'],
  ['Согласуйте концепт', 'Мы уточняем детали и показываем, как ваша история превратится в игровой сюжет.'],
  ['Проживите приключение', 'Пройдите историю вместе с теми, кого выбрали, и сделайте свои выборы.'],
];

export const home = {
  path: '',
  nav: '',
  hero: true,
  bodyClass: 'is-home',
  title: 'LUMORA — персональные приключения из ваших историй',
  description: 'LUMORA превращает личные истории в персональные интерактивные приключения, которые можно прожить вместе. Расскажите историю, выберите жанр и создайте своё приключение.',
  jsonld: (url) => [
    { '@context': 'https://schema.org', '@type': 'Organization', name: 'LUMORA', url: config.siteUrl + '/', logo: config.siteUrl + '/assets/favicon.svg', slogan: config.slogan },
    { '@context': 'https://schema.org', '@type': 'WebSite', name: 'LUMORA', url: config.siteUrl + '/', inLanguage: 'ru' },
  ],
  render: (root) => `
<section class="hero">
<div class="container hero__grid">
<div class="hero__text">
<p class="pill">Совместное приключение на 2–3 часа</p>
<h1>Твоя история.<br>Твой мир.</h1>
<p class="hero__sub">Преврати личную историю в уникальное приключение, которое можно прожить вместе.</p>
<div class="actions">
${button({ href: root + 'create/', label: 'Создать приключение', goal: 'cta_create_hero', arrow: true })}
${button({ href: root + 'games/doroga-domoy/', label: 'Посмотреть пример', variant: 'ghost', goal: 'cta_example_hero' })}
</div>
</div>
<div class="hero__art" aria-hidden="false">${portal()}</div>
</div>
<a class="scroll" href="#about-product"><span>Узнать больше</span><i aria-hidden="true"></i></a>
</section>

<section class="section" id="about-product"><div class="container split">
<div>${sectionHeading({ eyebrow: 'О LUMORA', title: 'Не прочитать историю, а стать её участником', lead: 'LUMORA превращает личные воспоминания, отношения и события в интерактивные игровые приключения.' })}
<p>Вы рассказываете, что для вас важно: поездку, знакомство, семейную легенду. Мы помогаем превратить это в сюжет с выборами, загадками и финалом, который зависит от вас.</p>
<p>Так появляется приключение, которое нельзя найти в магазине: оно собрано из вашей жизни и предназначено для совместного прохождения.</p>
<p>${button({ href: root + 'about/', label: 'О проекте', variant: 'ghost' })}</p></div>
<ul class="adv-grid">${advantages.map(([t, d]) => `<li class="adv"><h3>${esc(t)}</h3><p>${esc(d)}</p></li>`).join('')}</ul>
</div></section>

<section class="section section--alt" id="steps"><div class="container">
${sectionHeading({ eyebrow: 'Как это работает', title: 'Четыре шага от истории до приключения', center: true })}
<ol class="steps">${steps.map(([t, d], i) => `<li class="step"><span class="step__n" aria-hidden="true">${i + 1}</span><h3>${esc(t)}</h3><p>${esc(d)}</p></li>`).join('')}</ol>
<p class="center">${button({ href: root + 'how-it-works/', label: 'Подробнее о процессе', variant: 'ghost' })}</p>
</div></section>

<section class="section" id="examples"><div class="container">
${sectionHeading({ eyebrow: 'Примеры', title: 'Приключения, которые могут получиться', lead: 'Демонстрационные концепты показывают, как личная история превращается в игру.' })}
<div class="grid grid--3">${adventures.slice(0, 3).map((a) => gameCard(a, root)).join('')}</div>
<p class="center">${button({ href: root + 'games/', label: 'Весь каталог', variant: 'ghost', arrow: true })}</p>
</div></section>

<section class="section section--alt" id="video"><div class="container split split--video">
<div>${sectionHeading({ eyebrow: 'Видео', title: 'Посмотрите, как это выглядит', lead: 'Здесь будут короткие ролики о проекте, примеры и разборы. Первые видео готовятся.' })}
<p>${button({ href: root + 'videos/', label: 'Видеотека', variant: 'ghost', arrow: true })}</p></div>
<div>${videoCard(videos[0], root, 'door')}</div>
</div></section>

<section class="section" id="blog"><div class="container">
${sectionHeading({ eyebrow: 'Блог', title: 'Как придумывать истории, которые хочется прожить' })}
<div class="grid grid--3">${[...articles].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3).map((a) => articleCard(a, root)).join('')}</div>
<p class="center">${button({ href: root + 'blog/', label: 'Все статьи', variant: 'ghost', arrow: true })}</p>
</div></section>

<section class="section section--alt" id="faq"><div class="container container--narrow">
${sectionHeading({ eyebrow: 'FAQ', title: 'Частые вопросы', center: true })}
${accordion(faq.slice(0, 5), root, { name: 'home-faq' })}
<p class="center">${button({ href: root + 'faq/', label: 'Все вопросы', variant: 'ghost' })}</p>
</div></section>

${ctaBand({ title: 'У вас уже есть история', text: 'Расскажите её, и мы поможем превратить её в приключение, которое можно прожить вместе.', root })}`,
};
