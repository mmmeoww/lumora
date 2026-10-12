// Видеотека. Пока реальных роликов нет, поэтому embed пустой и страница честно показывает «скоро».
// Когда ролик будет готов, вставьте в embed ссылку вида https://rutube.ru/play/embed/ID
// или https://www.youtube-nocookie.com/embed/ID и поставьте status: 'published'.
export const videos = [
  {
    slug: 'chto-takoe-lumora',
    title: 'Что такое LUMORA: история, которая становится игрой',
    category: 'О проекте',
    description: 'Короткий ролик о том, как личная история превращается в приключение: от первой идеи до совместного прохождения.',
    embed: '',
    duration: '',
    status: 'planned',
    article: 'kak-prevratit-istoriyu-v-igru',
    adventure: 'doroga-domoy',
  },
  {
    slug: 'kak-rasskazat-istoriyu',
    title: 'Как рассказать историю, чтобы из неё получилась игра',
    category: 'Инструкции',
    description: 'Практические советы: какие детали вспомнить, о чём не забыть и как описать настроение, которое должно получиться.',
    embed: '',
    duration: '',
    status: 'planned',
    article: 'kak-sozdat-interaktivnuyu-istoriyu',
    adventure: 'dver-v-leto',
  },
  {
    slug: 'razbor-primera',
    title: 'Разбор примера: как устроена «Дорога домой»',
    category: 'Примеры',
    description: 'Пошаговый разбор демонстрационного приключения: где в нём реальные воспоминания, а где игровая механика.',
    embed: '',
    duration: '',
    status: 'planned',
    article: 'kak-pridumat-igrovoy-scenariy',
    adventure: 'doroga-domoy',
  },
];

export const videoCategories = [...new Set(videos.map((v) => v.category))];
export const videoBySlug = (slug) => videos.find((v) => v.slug === slug);
