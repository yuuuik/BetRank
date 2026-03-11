# BetRank — Агрегатор казино и букмекеров

Современный мультистраничный сайт-агрегатор с обзорами онлайн-букмекеров и казино.

## Технологии
- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Lucide React** (иконки)

## Структура страниц

| Путь | Описание |
|------|----------|
| `/` | Главная с топ-бонусами и каталогом |
| `/casino` | Каталог казино с фильтрами |
| `/betting` | Каталог букмекеров |
| `/bonuses` | Все актуальные бонусы |
| `/ratings` | Полная таблица рейтингов |
| `/reviews` | Список всех обзоров |
| `/guides` | Полезные гайды |
| `/news` | Новости индустрии |
| `/faq` | Частые вопросы |
| `/review/[slug]` | Детальный обзор сервиса |

## Быстрый старт

```bash
# Установка зависимостей
npm install

# Разработка
npm run dev

# Сборка
npm run build

# Запуск продакшена
npm start
```

## Деплой на Vercel

1. Залейте проект на GitHub
2. Импортируйте в Vercel
3. Настройте домен
4. Деплой происходит автоматически

```bash
# Или через Vercel CLI
npx vercel --prod
```

## Добавление новых сервисов

Откройте `lib/data.ts` и добавьте новый объект в массив `services`. Следуйте типу `Service` из `types/index.ts`.

## SEO

- Sitemap: `/sitemap.xml`
- Robots: `/robots.txt`
- Метаданные для каждой страницы
- Schema.org разметка
- Open Graph теги

## Дизайн

- **Тема:** Тёмная (navy blue)
- **Акценты:** Фиолетовый (#a855f7), Голубой (#38bdf8)
- **Шрифты:** Exo 2 (заголовки), Inter (текст)
- **Адаптивный:** Mobile-first

## Файловая структура

```
betrank/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Главная
│   ├── globals.css         # Global styles
│   ├── sitemap.ts          # Sitemap
│   ├── robots.ts           # Robots.txt
│   ├── not-found.tsx       # 404
│   ├── bonuses/page.tsx
│   ├── casino/page.tsx
│   ├── betting/page.tsx
│   ├── ratings/page.tsx
│   ├── reviews/page.tsx
│   ├── guides/page.tsx
│   ├── news/page.tsx
│   ├── faq/page.tsx
│   └── review/[slug]/page.tsx
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── cards/
│   │   └── ServiceCard.tsx
│   ├── filters/
│   │   └── FilteredCatalog.tsx
│   └── sections/
│       ├── HeroSection.tsx
│       ├── BestBonusesSection.tsx
│       └── RankingsTable.tsx
├── lib/
│   └── data.ts             # Данные сервисов
├── types/
│   └── index.ts            # TypeScript типы
├── public/                 # Статические файлы
├── next.config.js
├── tailwind.config.ts
└── tsconfig.json
```
