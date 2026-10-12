/* LUMORA — клиентская логика. Без зависимостей. Сайт остаётся читаемым и без JS. */
(() => {
  'use strict';

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const store = {
    get: (k) => { try { return localStorage.getItem(k); } catch { return null; } },
    set: (k, v) => { try { localStorage.setItem(k, v); } catch { /* приватный режим */ } },
  };

  /* ---------- Аналитика (Яндекс Метрика) ---------- */
  // Цели отправляются только по имени. Тексты историй и данные форм в аналитику не попадают.
  const metrikaId = $('meta[name="metrika-id"]')?.content;
  const goal = (name) => {
    if (metrikaId && typeof window.ym === 'function') window.ym(Number(metrikaId), 'reachGoal', name);
  };

  function loadMetrika() {
    if (!metrikaId || window.ym) return;
    (function (m, e, t, r, i, k, a) {
      m[i] = m[i] || function () { (m[i].a = m[i].a || []).push(arguments); };
      m[i].l = 1 * new Date();
      k = e.createElement(t); a = e.getElementsByTagName(t)[0]; k.async = 1; k.src = r; a.parentNode.insertBefore(k, a);
    })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym');
    window.ym(Number(metrikaId), 'init', { clickmap: true, trackLinks: true, accurateTrackBounce: true, webvisor: false });
    const view = document.body.dataset.goalView;
    if (view) goal(view);
  }

  const banner = $('#consent');
  if (metrikaId) {
    const choice = store.get('lumora-consent');
    if (choice === 'yes') loadMetrika();
    else if (!choice && banner) banner.hidden = false;
    $$('[data-consent]').forEach((b) => b.addEventListener('click', () => {
      store.set('lumora-consent', b.dataset.consent);
      banner.hidden = true;
      if (b.dataset.consent === 'yes') loadMetrika();
    }));
  }

  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-goal]');
    if (el) goal(el.dataset.goal);
    const post = e.target.closest('.prose a[href*="games/"], .prose a[href*="create/"]');
    if (post) goal('blog_to_adventure');
  });

  /* ---------- Мобильное меню ---------- */
  const burger = $('.burger'), nav = $('#site-nav');
  if (burger && nav) {
    const set = (open) => {
      nav.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
    };
    burger.addEventListener('click', () => set(!nav.classList.contains('is-open')));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && nav.classList.contains('is-open')) { set(false); burger.focus(); } });
    nav.addEventListener('click', (e) => { if (e.target.closest('a')) set(false); });
    window.matchMedia('(min-width: 1140px)').addEventListener('change', (m) => { if (m.matches) set(false); });
  }

  /* ---------- Поиск, фильтры, сортировка ---------- */
  $$('[data-filter]').forEach((root) => {
    const list = $('[data-list]', root);
    const items = $$('[data-item]', list);
    const search = $('[data-search]', root);
    const sort = $('[data-sort]', root);
    const count = $('[data-count]', root);
    const empty = $('[data-empty]', root);
    const state = { q: '', cat: '', tag: '' };

    const plural = (n) => (n % 10 === 1 && n % 100 !== 11 ? 'найден' : 'найдено');

    function apply() {
      const q = state.q.trim().toLowerCase();
      let shown = 0;
      items.forEach((it) => {
        const ok = (!q || it.dataset.title.toLowerCase().includes(q))
          && (!state.cat || it.dataset.genre === state.cat)
          && (!state.tag || (it.dataset.tags || '').split('|').includes(state.tag));
        it.hidden = !ok;
        if (ok) shown++;
      });
      if (sort) {
        const mode = sort.value;
        const sorted = [...items].sort((a, b) => {
          if (mode === 'name') return a.dataset.name.localeCompare(b.dataset.name, 'ru');
          if (mode === 'players') return Number(a.dataset.players) - Number(b.dataset.players);
          return items.indexOf(a) - items.indexOf(b);
        });
        sorted.forEach((it) => list.appendChild(it));
      }
      if (empty) empty.hidden = shown !== 0;
      if (count) count.textContent = `${plural(shown)}: ${shown} из ${items.length}`;
    }

    search?.addEventListener('input', () => { state.q = search.value; apply(); });
    sort?.addEventListener('change', apply);
    $$('[data-chip]', root).forEach((chip) => chip.addEventListener('click', () => {
      state.cat = chip.dataset.chip;
      $$('[data-chip]', root).forEach((c) => c.setAttribute('aria-pressed', String(c === chip)));
      apply();
    }));
    $$('[data-tag]', root).forEach((btn) => btn.addEventListener('click', () => {
      const on = btn.getAttribute('aria-pressed') !== 'true';
      $$('[data-tag]', root).forEach((b) => b.setAttribute('aria-pressed', 'false'));
      btn.setAttribute('aria-pressed', String(on));
      state.tag = on ? btn.dataset.tag : '';
      apply();
    }));
    apply();
  });

  /* ---------- Видео: iframe создаётся только по клику ---------- */
  $$('[data-player]').forEach((box) => {
    const btn = $('.player__btn', box);
    btn?.addEventListener('click', () => {
      const frame = document.createElement('iframe');
      frame.src = box.dataset.embed + (box.dataset.embed.includes('?') ? '&' : '?') + 'autoplay=1';
      frame.title = box.dataset.title;
      frame.allow = 'autoplay; fullscreen; picture-in-picture';
      frame.allowFullscreen = true;
      box.replaceChildren(frame);
      goal('video_play');
    });
  });

  /* ---------- Формы ---------- */
  const messages = {
    valueMissing: 'Заполните это поле.',
    typeMismatch: 'Проверьте формат.',
    tooShort: (el) => `Напишите подробнее: нужно хотя бы ${el.minLength} символов.`,
  };
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function errorFor(el) {
    const v = el.validity;
    if (el.type === 'checkbox' && v.valueMissing) return 'Необходимо ваше согласие.';
    if (v.valueMissing) return messages.valueMissing;
    if (v.tooShort) return messages.tooShort(el);
    if (el.type === 'email' && (v.typeMismatch || !emailRe.test(el.value))) return 'Введите корректный адрес почты, например name@mail.ru.';
    if (el.type === 'url' && v.typeMismatch) return 'Введите ссылку целиком, начиная с https://';
    return '';
  }

  function showError(el, text) {
    const holder = el.closest('.field');
    const out = $(`#${el.id}-err`);
    holder?.classList.toggle('is-invalid', Boolean(text));
    if (out) out.textContent = text;
    el.setAttribute('aria-invalid', text ? 'true' : 'false');
  }

  $$('form[data-form]').forEach((form) => {
    const kind = form.dataset.form;
    const status = $('[data-status]', form);
    const submit = $('[data-submit]', form);
    const spinner = $('[data-spinner]', form);
    let started = false, busy = false, done = false;

    const say = (type, html) => { status.className = `form-status is-${type}`; status.innerHTML = html; status.focus(); };

    form.addEventListener('input', () => {
      if (!started) { started = true; goal(kind === 'adventure' ? 'form_start' : 'contact_form_start'); }
    }, { once: true });
    form.addEventListener('focusout', (e) => { if (e.target.matches('input, select, textarea') && e.target.name !== '_gotcha') showError(e.target, errorFor(e.target)); });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (busy || done) return;

      const fields = $$('input[name], select[name], textarea[name]', form).filter((el) => el.name !== '_gotcha');
      let firstBad = null;
      fields.forEach((el) => { const msg = errorFor(el); showError(el, msg); if (msg && !firstBad) firstBad = el; });
      if (firstBad) { firstBad.focus(); say('err', 'Проверьте поля, отмеченные красным.'); return; }

      // Антиспам: заполненная ловушка (honeypot). Ботам ничего не сообщаем.
      if (form.elements._gotcha.value) { say('ok', 'Спасибо! Заявка принята.'); done = true; return; }

      const data = {};
      fields.forEach((el) => { if (el.name !== 'consent') data[el.name] = el.type === 'checkbox' ? el.checked : el.value.trim(); });
      data._form = kind;

      const endpoint = form.dataset.endpoint, email = form.dataset.email;
      if (!endpoint) {
        const lines = Object.entries(data).filter(([k]) => !k.startsWith('_')).map(([k, v]) => `${k}: ${v}`).join('\n');
        const mail = email ? `<br><a href="mailto:${email}?subject=${encodeURIComponent('Заявка с сайта LUMORA')}&body=${encodeURIComponent(lines)}">Отправить заявку по почте</a>` : '';
        say('info', `<strong>Приём заявок пока не подключён.</strong> Данные никуда не отправлены.${mail}`);
        return;
      }

      busy = true; submit.disabled = true; spinner.hidden = false; status.className = 'form-status'; status.textContent = '';
      try {
        const res = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(data) });
        if (!res.ok) throw new Error(String(res.status));
        done = true;
        goal(kind === 'adventure' ? 'form_submit_success' : 'contact_submit_success');
        form.reset();
        say('ok', kind === 'adventure'
          ? '<strong>Спасибо! Заявка отправлена.</strong> Мы прочитаем вашу историю и свяжемся с вами по почте.'
          : '<strong>Спасибо! Сообщение отправлено.</strong> Мы ответим на указанную почту.');
        submit.textContent = 'Отправлено';
      } catch {
        submit.disabled = false;
        say('err', 'Не удалось отправить. Проверьте соединение и попробуйте ещё раз.');
      } finally {
        busy = false; spinner.hidden = true;
      }
    });
  });

  /* ---------- Плавное появление ---------- */
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => entries.forEach((en) => {
      if (en.isIntersecting) {
        const t = en.target;
        t.classList.add('is-in'); io.unobserve(t);
        setTimeout(() => t.classList.remove('reveal', 'is-in'), 800); // чтобы не мешать hover-эффектам
      }
    }), { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    $$('.section:not(.section--page) .section-heading, .card, .step, .adv, .cta-band__box').forEach((el) => { el.classList.add('reveal'); io.observe(el); });
  }
})();
