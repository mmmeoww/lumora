# LUMORA

Многостраничный статический сайт: HTML, CSS, JS. Страницы собирает Node-скрипт без зависимостей. Рассчитан на GitHub Pages.

## Запуск

```bash
npm run dev      # сборка + http://localhost:4173
npm run build    # сборка в dist/
npm run check    # сборка + проверка ссылок, title, H1, canonical и т. д.
```

Нужен Node 18+. Ставить пакеты не требуется.

## Как устроено

```
build.mjs               сборка: страницы → dist/, sitemap.xml, robots.txt
src/config.mjs          настройки (адрес, email, форма, Метрика)
src/data/               КОНТЕНТ: приключения, статьи, видео, FAQ
src/pages/              шаблоны страниц
src/lib/                шапка/подвал, компоненты, SVG-графика
src/assets/             CSS, JS, favicon, og.png
scripts/check.mjs       проверка собранного сайта
project-docs/           документы для сдачи (структура, ТЗ, SEO, карта трафика…)
```

## Как добавить контент

Правьте файлы в `src/data/` и пересобирайте сайт (на GitHub это происходит автоматически при push).
- **Статья:** новый объект в `articles.mjs` (slug латиницей, `body` — HTML).
- **Приключение:** объект в `adventures.mjs`, `motif`: `road | door | train | city | island | letter`.
- **Видео:** в `videos.mjs` укажите `embed` (ссылка на встраивание RuTube/YouTube) и `status: 'published'`.
- **Вопрос FAQ:** объект в `faq.mjs`.

## Публикация на GitHub Pages

1. Создайте репозиторий, отправьте код в ветку `main`.
2. Settings → Pages → Source: **GitHub Actions**.
3. Workflow `.github/workflows/pages.yml` соберёт и опубликует сайт. Адрес подставится автоматически.
4. Для своего домена: Settings → Pages → Custom domain, затем DNS у регистратора (см. `project-docs/02-domain-hosting.md`).

## Настройки (Settings → Secrets and variables → Actions → Variables)

| Переменная | Назначение | Если пусто |
|---|---|---|
| `FORM_ENDPOINT` | URL приёмника форм (например, Formspree) | форма честно сообщает, что приём заявок не подключён |
| `CONTACT_EMAIL` | публичная почта | адрес не показывается |
| `METRIKA_ID` | номер счётчика Яндекс Метрики | аналитики и баннера cookies нет |
| `YANDEX_VERIFICATION` | код подтверждения Вебмастера | мета-тег не выводится |

Все значения публичны (попадают в HTML). Секретные ключи сюда класть нельзя.

Локально те же значения можно задать переменными окружения: `FORM_ENDPOINT=... npm run build`.

## Ограничения

Сайт статический: нет базы данных, админки, оплаты и серверной обработки заявок. Что сделано вместо этого и что нужно для этапа 2, см. `project-docs/03-tz.md`. Правовые страницы — черновики, их должен проверить юрист.
