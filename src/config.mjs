// Единая точка настроек сайта. Секретов здесь быть не должно:
// всё, что попадает в сборку, публично видно в браузере.
const env = process.env;

export const config = {
  name: 'LUMORA',
  slogan: 'Твоя история. Твой мир.',
  lang: 'ru',
  // Задаётся при сборке (в GitHub Actions подставляется автоматически).
  siteUrl: (env.SITE_URL || 'http://localhost:4173').replace(/\/$/, ''),
  // Пусто = адрес ещё не задан. Сайт честно скажет об этом, а не подставит выдуманный.
  contactEmail: env.CONTACT_EMAIL || '',
  // URL приёмника форм (например, Formspree). Пусто = заявки не отправляются.
  formEndpoint: env.FORM_ENDPOINT || '',
  // Номер счётчика Яндекс Метрики. Пусто = аналитика и баннер cookies отключены.
  metrikaId: env.METRIKA_ID || '',
  // Содержимое meta-тега yandex-verification из Яндекс Вебмастера.
  yandexVerification: env.YANDEX_VERIFICATION || '',
  // Официальные соцсети: [{ label, url }]. Пока пусто — блок не выводится.
  social: [],
};
