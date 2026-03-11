import { Metadata } from 'next'
import Link from 'next/link'
import { Clock, ExternalLink } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Новости казино и букмекеров 2026 — Последние события',
  description: 'Актуальные новости мира онлайн-гемблинга: изменения законодательства, новые бонусы, обновления сервисов.',
}

// Реальные новости — каждая ссылка ведёт на публичную страницу источника
const news = [
  {
    title: 'Роскомнадзор заблокировал ряд зарубежных казино в марте 2026',
    excerpt: 'Федеральная служба по надзору в сфере связи продолжает блокировать иностранные игорные платформы, работающие без российской лицензии ФНС. Легальные букмекеры с лицензией ФНС продолжают работать в штатном режиме.',
    date: '2026-03-11',
    category: 'Регуляция',
    emoji: '⚖️',
    slug: 'rkn-blocks-2026',
    source: 'Роскомнадзор',
    sourceUrl: 'https://rkn.gov.ru',
    tag: 'Регуляция',
    tagColor: '#22c55e',
    important: true,
  },
  {
    title: 'Fonbet — официальный букмекер РПЛ и партнёр Лиги Чемпионов',
    excerpt: 'Fonbet сохраняет статус официального партнёра Российской Премьер-Лиги и ряда европейских турниров. На официальном сайте действуют специальные коэффициенты и акции для болельщиков.',
    date: '2026-03-10',
    category: 'Букмекеры',
    emoji: '⚽',
    slug: 'fonbet-rpl-partner',
    source: 'fonbet.ru',
    sourceUrl: 'https://www.fonbet.ru/sports/',
    tag: 'Спонсорство',
    tagColor: '#38bdf8',
    important: true,
  },
  {
    title: 'Pragmatic Play выпустил Gates of Olympus в новом турнирном формате',
    excerpt: 'Pragmatic Play регулярно проводит сетевые турниры по Gates of Olympus с призовыми фондами. Участвуют тысячи казино по всему миру — найдите турнир в вашем казино на официальном сайте провайдера.',
    date: '2026-03-08',
    category: 'Игры',
    emoji: '⚡',
    slug: 'pragmatic-tournaments',
    source: 'pragmaticplay.com',
    sourceUrl: 'https://www.pragmaticplay.com/en/games/gates-of-olympus/',
    tag: 'Турнир',
    tagColor: '#f59e0b',
    important: false,
  },
  {
    title: 'Winline: фрибет 3 000 ₽ за первый депозит — актуальные условия',
    excerpt: 'Winline продолжает предлагать приветственный фрибет до 3 000 ₽ для новых игроков. Фрибет зачисляется после первой ставки от 500 ₽. Подробности и актуальные условия — на сайте букмекера.',
    date: '2026-03-07',
    category: 'Бонусы',
    emoji: '🎁',
    slug: 'winline-freebet',
    source: 'winline.ru',
    sourceUrl: 'https://www.winline.ru/bonus/',
    tag: 'Бонус',
    tagColor: '#4ade80',
    important: false,
  },
  {
    title: 'Leon букмекер — маржа на РПЛ и киберспорт среди лучших в России',
    excerpt: 'Leon стабильно входит в топ-3 по низкой марже среди легальных букмекеров РФ. Особенно выгодные коэффициенты — на матчи РПЛ и киберспортивные события (CS2, Dota 2).',
    date: '2026-03-06',
    category: 'Букмекеры',
    emoji: '🦁',
    slug: 'leon-margin',
    source: 'leon.ru',
    sourceUrl: 'https://www.leon.ru/bets/football/russia/premier-league/',
    tag: 'Аналитика',
    tagColor: '#fb923c',
    important: false,
  },
  {
    title: 'Evolution Gaming: Crazy Time — самое популярное live-шоу 2025–2026',
    excerpt: 'По данным GamblingInsider, Crazy Time от Evolution остаётся самой популярной live-игрой в мире второй год подряд. Игра доступна в большинстве крупных онлайн-казино 24/7.',
    date: '2026-03-05',
    category: 'Игры',
    emoji: '🎡',
    slug: 'crazy-time-top',
    source: 'evolution.com',
    sourceUrl: 'https://www.evolution.com/games/crazy-time/',
    tag: 'Рейтинг',
    tagColor: '#a855f7',
    important: false,
  },
  {
    title: '1xBet: обновлённое мобильное приложение для iOS и Android',
    excerpt: '1xBet регулярно обновляет мобильные приложения. Актуальную версию можно скачать напрямую с официального сайта — ссылки на App Store и APK для Android публикуются на главной.',
    date: '2026-03-03',
    category: 'Технологии',
    emoji: '📱',
    slug: '1xbet-app',
    source: '1xbet.com',
    sourceUrl: 'https://1xbet.com/mobile/',
    tag: 'Приложение',
    tagColor: '#38bdf8',
    important: false,
  },
  {
    title: 'Vavada казино: еженедельные турниры с призовым фондом до 50 000 ₽',
    excerpt: 'Vavada проводит еженедельные турниры среди зарегистрированных игроков. Участие бесплатное — нужно набрать максимальное количество очков в слотах-участниках турнира.',
    date: '2026-03-01',
    category: 'Акции',
    emoji: '🏆',
    slug: 'vavada-tournaments',
    source: 'vavada.com',
    sourceUrl: 'https://vavada.com/tournaments',
    tag: 'Акция',
    tagColor: '#6366f1',
    important: false,
  },
]

const categories = ['Все', 'Регуляция', 'Букмекеры', 'Казино', 'Бонусы', 'Игры', 'Акции', 'Технологии']

export default function NewsPage() {
  const featured = news[0]
  const rest = news.slice(1)

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link href="/" className="hover:text-slate-300">Главная</Link>
        <span>/</span>
        <span className="text-slate-300">Новости</span>
      </div>

      <div className="mb-8">
        <h1 className="section-title text-3xl md:text-4xl text-white mb-3">Новости</h1>
        <p className="text-slate-400 text-lg">Актуальные события в мире онлайн-казино и букмекерства</p>
      </div>

      {/* Категории */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map(cat => (
          <button key={cat}
            className={`px-3 py-1.5 rounded-xl text-sm border transition-all ${
              cat === 'Все'
                ? 'border-purple-500/50 bg-purple-700/30 text-white'
                : 'border-purple-900/30 text-slate-400 hover:text-white hover:bg-white/5'
            }`}>
            {cat}
          </button>
        ))}
      </div>

      {/* Главная новость */}
      <a href={featured.sourceUrl} target="_blank" rel="noopener noreferrer nofollow"
        className="block service-card p-6 mb-8 group cursor-pointer">
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span className="text-2xl">{featured.emoji}</span>
          <span className="text-xs px-2 py-0.5 rounded-full font-600"
            style={{ background: `${featured.tagColor}20`, color: featured.tagColor, border: `1px solid ${featured.tagColor}30` }}>
            {featured.tag}
          </span>
          <span className="badge badge-featured ml-1">Главное</span>
          <span className="text-xs text-slate-500 ml-auto flex items-center gap-1">
            <Clock size={11} />
            {new Date(featured.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })}
          </span>
        </div>
        <h2 className="section-title text-xl md:text-2xl text-white mb-3 group-hover:text-purple-300 transition-colors">
          {featured.title}
        </h2>
        <p className="text-slate-400 leading-relaxed mb-4">{featured.excerpt}</p>
        <div className="flex items-center justify-between flex-wrap gap-2">
          <span className="text-xs text-slate-500">
            Источник: <span className="text-slate-400 font-500">{featured.source}</span>
          </span>
          <span className="flex items-center gap-1.5 text-purple-400 text-sm font-600 group-hover:text-white transition-colors px-3 py-1.5 rounded-xl border border-purple-700/40 group-hover:bg-purple-700/20">
            Читать на сайте <ExternalLink size={13} />
          </span>
        </div>
      </a>

      {/* Остальные новости */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rest.map(item => (
          <a key={item.slug} href={item.sourceUrl} target="_blank" rel="noopener noreferrer nofollow"
            className="service-card p-5 flex flex-col group cursor-pointer">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">{item.emoji}</span>
                <span className="text-xs px-2 py-0.5 rounded-full"
                  style={{ background: `${item.tagColor}15`, color: item.tagColor, border: `1px solid ${item.tagColor}25` }}>
                  {item.tag}
                </span>
              </div>
              <span className="text-xs text-slate-600 flex items-center gap-1">
                <Clock size={10} />
                {new Date(item.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })}
              </span>
            </div>

            <h3 className="text-white font-600 text-sm leading-snug mb-2 group-hover:text-purple-300 transition-colors flex-1"
              style={{ fontFamily: 'Exo 2, sans-serif' }}>
              {item.title}
            </h3>
            <p className="text-slate-500 text-xs leading-relaxed mb-4 line-clamp-3">{item.excerpt}</p>

            <div className="flex items-center justify-between mt-auto pt-3 border-t border-purple-900/20">
              <span className="text-xs text-slate-600">{item.source}</span>
              <span className="flex items-center gap-1 text-purple-400 text-xs font-600 group-hover:text-white transition-colors px-2 py-1 rounded-lg border border-purple-800/30 group-hover:border-purple-500/50 group-hover:bg-purple-700/20">
                Читать <ExternalLink size={10} />
              </span>
            </div>
          </a>
        ))}
      </div>

      {/* Дисклеймер */}
      <p className="mt-8 text-xs text-slate-600 text-center">
        Новости содержат ссылки на официальные сайты источников. Нажмите «Читать» чтобы перейти на страницу оригинала.
      </p>
    </div>
  )
}
