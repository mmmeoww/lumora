import { genres } from '../data/adventures.mjs';
import { config } from '../config.mjs';
import { button, sectionHeading, accordion, ctaBand, field, esc } from '../lib/components.mjs';
import { faq } from '../data/faq.mjs';

export const pages = [];

const formAttrs = (kind) => `data-form="${kind}" data-endpoint="${esc(config.formEndpoint)}" data-email="${esc(config.contactEmail)}" novalidate`;
const consentField = (root) => `<div class="field field--check"><label><input type="checkbox" name="consent" id="consent-box" required aria-required="true" aria-describedby="consent-box-err"> <span>Я согласен(на) на обработку персональных данных в соответствии с <a href="${root}privacy/">политикой конфиденциальности</a></span></label><p class="error" id="consent-box-err" role="alert"></p></div>`;
const honeypot = '<div class="hp" aria-hidden="true"><label>Не заполняйте это поле<input type="text" name="_gotcha" tabindex="-1" autocomplete="off"></label></div>';
const formStatus = '<div class="form-status" data-status role="status" aria-live="polite" tabindex="-1"></div>';

/* ---------- О проекте ---------- */
pages.push({
  path: 'about/', nav: 'about',
  title: 'О проекте LUMORA: персональные приключения из личных историй',
  description: 'Что такое LUMORA, в чём её миссия и принципы персонализации. Проект превращает личные истории и воспоминания в приключения, которые можно прожить вместе.',
  crumbs: [['Главная', ''], ['О проекте']],
  render: (root) => `<section class="section section--page"><div class="container container--narrow">
<header class="page-head"><h1>О проекте LUMORA</h1><p class="lead">Мы превращаем личные истории в приключения, которые можно прожить вместе.</p></header>
<div class="prose">
<h2>Концепция</h2>
<p>LUMORA — это место, где личная история становится игрой. Слово «lumora» отсылает к свету, а образ проекта — к светящейся двери в темноте: за ней начинается другой мир, и этот мир собран из вашей жизни.</p>
<h2>Миссия</h2>
<p>Дать людям возможность не просто вспоминать значимые события, а проживать их заново: вместе, с выбором и неожиданным поворотом. Основная идея бренда: не прочитать историю, а стать её участником.</p>
<h2>Для кого создан продукт</h2>
<ul>
<li>Для пар, которые хотят необычный способ отметить важную дату.</li>
<li>Для друзей, которым нужен общий вечер, не похожий на остальные.</li>
<li>Для семей, у которых есть истории, достойные большего, чем пересказ за столом.</li>
<li>Для тех, кто любит игры и интерактивное повествование.</li>
</ul>
<h2>Принципы персонализации</h2>
<ul>
<li><strong>История важнее шаблона.</strong> Сюжет строится на том, что рассказали вы.</li>
<li><strong>Вы решаете, что показать.</strong> Имена, места и подробности можно изменить или скрыть.</li>
<li><strong>Бережное обращение.</strong> Личные детали нужны только для подготовки приключения.</li>
<li><strong>Вместе, а не рядом.</strong> Приключение рассчитано на общее прохождение.</li>
</ul>
<h2>Что дальше</h2>
<p>Посмотрите <a href="${root}games/">примеры приключений</a>, узнайте <a href="${root}how-it-works/">как проходит процесс</a> или сразу <a href="${root}create/">расскажите свою историю</a>.</p>
</div></div></section>
${ctaBand({ title: 'Готовы начать?', text: 'Расскажите историю, и мы подскажем, каким может быть ваше приключение.', root })}`,
});

/* ---------- Как это работает ---------- */
const how = [
  ['Вы рассказываете историю', 'Заполните форму: опишите событие, место или отношения в свободной форме. Чем больше деталей, тем точнее получится результат. Если что-то личное, отметьте, что нужно изменить или не использовать.'],
  ['Выбираете жанр и настроение', 'Укажите, каким должно быть приключение: тёплым, мистическим, напряжённым или светлым, сколько участников и сколько времени вы готовы ему посвятить.'],
  ['Мы изучаем и уточняем', 'После заявки мы читаем вашу историю и при необходимости задаём вопросы. Так мы понимаем, что в ней главное.'],
  ['Согласуем концепт', 'Мы описываем, как история превратится в игровой сюжет: какие будут места, персонажи и ключевые выборы.'],
  ['Вы проживаете приключение', 'Пройдите историю вместе с теми, кого выбрали. Формат и платформа обсуждаются на этапе заявки.'],
];
pages.push({
  path: 'how-it-works/', nav: 'how',
  title: 'Как это работает: от личной истории до игрового приключения',
  description: 'Пять этапов создания персонального приключения в LUMORA: от рассказа истории и выбора жанра до согласования концепта и совместного прохождения.',
  crumbs: [['Главная', ''], ['Как это работает']],
  render: (root) => `<section class="section section--page"><div class="container container--narrow">
<header class="page-head"><h1>Как это работает</h1><p class="lead">Пять шагов от идеи до приключения, которое можно прожить вместе.</p></header>
<ol class="steps steps--list">${how.map(([t, d], i) => `<li class="step"><span class="step__n" aria-hidden="true">${i + 1}</span><h2>${esc(t)}</h2><p>${esc(d)}</p></li>`).join('')}</ol>
<h2>Примеры сценариев</h2>
<p>Чтобы понять, как могут выглядеть готовые приключения, загляните в <a href="${root}games/">каталог примеров</a>. Для начала можно открыть <a href="${root}games/doroga-domoy/">«Дорогу домой»</a> или <a href="${root}games/gorod-pod-dozhdem/">«Город под дождём»</a>.</p>
<h2>Частые вопросы о процессе</h2>
${accordion(faq.filter((f) => f.cat === 'Создание приключения').slice(0, 3), root, { name: 'how-faq' })}
</div></section>
${ctaBand({ title: 'Начните с одной истории', text: 'Первый шаг — рассказать о том, что для вас важно.', root })}`,
});

/* ---------- Создать приключение ---------- */
pages.push({
  path: 'create/', nav: '', goalView: 'create_view',
  title: 'Создать приключение: расскажите свою историю',
  description: 'Оставьте заявку на персональное приключение LUMORA: расскажите историю, выберите жанр, настроение, количество участников и продолжительность.',
  crumbs: [['Главная', ''], ['Создать приключение']],
  render: (root) => `<section class="section section--page"><div class="container container--form">
<header class="page-head"><h1>Создать приключение</h1><p class="lead">Расскажите историю и выберите настроение. Мы свяжемся с вами, уточним детали и согласуем концепт. Оплата на этом шаге не требуется.</p></header>
<form class="form" ${formAttrs('adventure')}>
${honeypot}
<div class="form__row">
${field({ id: 'name', label: 'Имя', required: true, extra: ' autocomplete="name" maxlength="80"' })}
${field({ id: 'email', label: 'Email', type: 'email', required: true, extra: ' autocomplete="email" maxlength="120"', hint: 'Ответ придёт на эту почту.' })}
</div>
${field({ id: 'title', label: 'Название приключения', required: true, extra: ' maxlength="100"', hint: 'Рабочее название. Его можно будет изменить.' })}
${field({ id: 'story', label: 'Описание истории', required: true, rows: 7, extra: ' minlength="40" maxlength="5000"', hint: 'Расскажите, что произошло, где и с кем. Хотя бы несколько предложений (от 40 символов).' })}
<div class="form__row">
${field({ id: 'genre', label: 'Жанр', required: true, options: [{ value: '', label: 'Выберите жанр' }, ...genres, 'Другое'] })}
${field({ id: 'mood', label: 'Настроение', required: true, options: [{ value: '', label: 'Выберите настроение' }, 'Тёплое', 'Загадочное', 'Напряжённое', 'Светлое', 'Ностальгическое'] })}
</div>
<div class="form__row">
${field({ id: 'players', label: 'Количество участников', required: true, options: [{ value: '', label: 'Выберите' }, '1', '2', '3–4', '5 и больше'] })}
${field({ id: 'duration', label: 'Продолжительность', required: true, options: [{ value: '', label: 'Выберите' }, 'До 1 часа', '1–2 часа', '2–3 часа', 'Больше 3 часов'] })}
</div>
${field({ id: 'wishes', label: 'Дополнительные пожелания', rows: 4, extra: ' maxlength="2000"', hint: 'Что нельзя использовать, какие имена изменить, что обязательно добавить.' })}
${field({ id: 'ref', label: 'Ссылка на референс', type: 'url', extra: ' maxlength="300" placeholder="https://"', hint: 'Например, на игру, фильм или музыку, которые передают настроение.' })}
${consentField(root)}
<div class="form__actions"><button class="btn btn--primary" type="submit" data-submit>Отправить заявку</button><span class="spinner" data-spinner hidden aria-hidden="true"></span></div>
${formStatus}
</form>
<aside class="panel panel--note"><h2>Что будет дальше</h2><p>Мы прочитаем вашу историю, при необходимости уточним детали и предложим концепт. Решение о заказе вы принимаете после согласования. Подробнее на странице <a href="${root}how-it-works/">«Как это работает»</a>.</p></aside>
</div></section>`,
});

/* ---------- Купить ---------- */
pages.push({
  path: 'buy/', nav: '',
  title: 'Купить приключение: условия заказа LUMORA',
  description: 'Как заказать персональное приключение LUMORA: описание продукта, условия заказа и информация об оплате.',
  crumbs: [['Главная', ''], ['Купить']],
  render: (root) => `<section class="section section--page"><div class="container container--narrow">
<header class="page-head"><h1>Заказать приключение</h1><p class="lead">Персональное приключение собирается из вашей истории. Поэтому заказ начинается с заявки.</p></header>
<div class="panel offer">
<h2>Персональное приключение</h2>
<ul class="check"><li>Сюжет на основе вашей истории</li><li>Жанр и настроение по вашему выбору</li><li>Рассчитано на совместное прохождение, как правило, на 2–3 часа</li><li>Концепт согласуется с вами до начала разработки</li></ul>
<dl class="facts"><div><dt>Стоимость</dt><dd>Определяется после обсуждения заявки. Цены пока не опубликованы.</dd></div><div><dt>Оплата</dt><dd>Онлайн-оплата на сайте пока не подключена. Способ оплаты согласуется индивидуально.</dd></div></dl>
<div class="actions">${button({ href: root + 'create/', label: 'Оставить заявку', goal: 'checkout_start', arrow: true })}${button({ href: root + 'games/', label: 'Посмотреть примеры', variant: 'ghost' })}</div>
</div>
<div class="prose"><h2>Условия заказа</h2>
<ul><li>Заявка не обязывает вас к покупке.</li><li>Мы связываемся с вами по указанному email.</li><li>Итоговые условия, сроки и стоимость фиксируются до начала работы.</li><li>Личные данные используются только для подготовки приключения (см. <a href="${root}privacy/">политику конфиденциальности</a>).</li></ul>
<p>Вопросы по заказу собраны на странице <a href="${root}faq/">FAQ</a>.</p></div>
</div></section>`,
});

/* ---------- Контакты ---------- */
pages.push({
  path: 'contacts/', nav: 'contacts',
  title: 'Контакты LUMORA: связаться с командой',
  description: 'Свяжитесь с LUMORA: форма обратной связи для вопросов о проекте, создании приключения и заказе.',
  crumbs: [['Главная', ''], ['Контакты']],
  render: (root) => `<section class="section section--page"><div class="container container--form">
<header class="page-head"><h1>Контакты</h1><p class="lead">Задайте вопрос о проекте, заказе или сотрудничестве.</p></header>
<div class="contact-grid">
<form class="form" ${formAttrs('contact')}>
${honeypot}
${field({ id: 'c-name', name: 'name', label: 'Имя', required: true, extra: ' autocomplete="name" maxlength="80"' })}
${field({ id: 'c-email', name: 'email', label: 'Email', type: 'email', required: true, extra: ' autocomplete="email" maxlength="120"' })}
${field({ id: 'c-message', name: 'message', label: 'Сообщение', required: true, rows: 6, extra: ' minlength="10" maxlength="3000"' })}
${consentField(root)}
<div class="form__actions"><button class="btn btn--primary" type="submit" data-submit>Отправить</button><span class="spinner" data-spinner hidden aria-hidden="true"></span></div>
${formStatus}
</form>
<aside class="panel"><h2>Другие способы связи</h2>
${config.contactEmail ? `<p>Email: <a href="mailto:${esc(config.contactEmail)}">${esc(config.contactEmail)}</a></p>` : '<p class="muted">Адрес электронной почты будет указан здесь.</p>'}
${config.social.length ? `<ul class="check">${config.social.map((s) => `<li><a href="${esc(s.url)}" rel="noopener me">${esc(s.label)}</a></li>`).join('')}</ul>` : ''}
<p class="muted">Прежде чем писать, загляните в <a href="${root}faq/">частые вопросы</a>: возможно, ответ уже есть.</p></aside>
</div></div></section>`,
});

/* ---------- Правовые ---------- */
const draft = '<p class="notice"><strong>Черновик.</strong> Текст подготовлен как шаблон и требует проверки юристом, а также указания реквизитов владельца проекта перед запуском.</p>';
const legal = (path, title, description, body) => ({
  path, nav: '', title, description, crumbs: [['Главная', ''], [title.split(' — ')[0]]],
  render: () => `<section class="section section--page"><div class="container container--narrow"><header class="page-head"><h1>${esc(title.split(' — ')[0])}</h1></header>${draft}<div class="prose">${body}</div></div></section>`,
});

pages.push(
  legal('privacy/', 'Политика конфиденциальности — LUMORA', 'Как LUMORA обрабатывает персональные данные, которые вы указываете в формах на сайте.', `
<h2>1. Какие данные мы собираем</h2><p>Через формы сайта мы получаем имя, адрес электронной почты, текст вашей истории и пожелания. Эти данные вы указываете добровольно.</p>
<h2>2. Для чего используются данные</h2><p>Для связи с вами, подготовки концепта и приключения, ответа на обращения. Данные не используются для рекламы третьих лиц.</p>
<h2>3. Хранение и передача</h2><p>Данные хранятся столько, сколько необходимо для выполнения заявки. Они не передаются третьим лицам, кроме сервисов, обеспечивающих приём заявок и отправку писем. Перечень сервисов уточняется владельцем проекта.</p>
<h2>4. Аналитика</h2><p>При согласии на cookies используется Яндекс Метрика. В аналитику не передаются тексты историй и персональные данные из форм.</p>
<h2>5. Ваши права</h2><p>Вы можете запросить доступ к своим данным, их исправление или удаление, написав через страницу «Контакты».</p>`),
  legal('terms/', 'Пользовательское соглашение — LUMORA', 'Условия использования сайта LUMORA и подачи заявок на персональные приключения.', `
<h2>1. Общие положения</h2><p>Используя сайт, вы соглашаетесь с настоящими условиями. Сайт носит информационный характер и принимает заявки на создание персональных приключений.</p>
<h2>2. Заявки</h2><p>Отправка заявки не является заказом и не обязывает ни одну из сторон. Условия, сроки и стоимость согласуются отдельно.</p>
<h2>3. Контент пользователя</h2><p>Отправляя историю, вы подтверждаете, что вправе ею делиться, и что она не нарушает права третьих лиц.</p>
<h2>4. Демонстрационные материалы</h2><p>Приключения в каталоге — демонстрационные концепты, а не реальные заказы.</p>
<h2>5. Изменения</h2><p>Условия могут обновляться. Актуальная версия всегда размещена на этой странице.</p>`),
  legal('cookies/', 'Cookies — LUMORA', 'Какие cookies может использовать сайт LUMORA и как управлять согласием.', `
<h2>Что такое cookies</h2><p>Это небольшие файлы, которые сайт сохраняет в вашем браузере.</p>
<h2>Какие используются</h2><ul><li><strong>Необходимое хранилище.</strong> Запоминает ваш выбор в баннере согласия.</li><li><strong>Аналитика.</strong> Яндекс Метрика, если счётчик подключён и вы дали согласие.</li></ul>
<h2>Как отказаться</h2><p>Нажмите «Отклонить» в баннере либо очистите данные сайта в настройках браузера. Без согласия аналитический скрипт не загружается.</p>`),
);

/* ---------- 404 ---------- */
pages.push({
  path: '404.html', file: '404.html', nav: '', noindex: true, absoluteBase: true,
  title: 'Страница не найдена', description: 'Такой страницы на сайте LUMORA нет.',
  render: (root) => `<section class="section section--page"><div class="container container--narrow center">
<p class="eyebrow">Ошибка 404</p><h1>Эта дверь никуда не ведёт</h1><p class="lead">Страница не найдена или была перемещена. Вернитесь на главную или загляните в каталог.</p>
<div class="actions actions--center">${button({ href: root, label: 'На главную' })}${button({ href: root + 'games/', label: 'Каталог приключений', variant: 'ghost' })}</div>
</div></section>`,
});
