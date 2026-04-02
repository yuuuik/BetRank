import { Clock, ExternalLink } from 'lucide-react'
import Link from 'next/link'

const recentNews = [
  {
    title: 'РКН продолжает блокировку зарубежных казино без лицензии',
    date: '2026-03-11',
    tag: 'Регуляция',
    tagColor: '#22c55e',
    sourceUrl: 'https://rkn.gov.ru',
  },
  {
    title: 'Fonbet — официальный партнёр РПЛ сезона 2025/26',
    date: '2026-03-10',
    tag: 'Букмекеры',
    tagColor: '#38bdf8',
    sourceUrl: 'https://www.fonbet.ru/sports/',
  },
  {
    title: 'Pragmatic Play: сетевые турниры по Gates of Olympus',
    date: '2026-03-08',
    tag: 'Игры',
    tagColor: '#f59e0b',
    sourceUrl: 'https://www.pragmaticplay.com/en/games/gates-of-olympus/',
  },
  {
    title: 'Crazy Time от Evolution — топ live-игра года по версии GamblingInsider',
    date: '2026-03-05',
    tag: 'Рейтинг',
    tagColor: '#a855f7',
    sourceUrl: 'https://www.evolution.com/games/crazy-time/',
  },
]

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const days = Math.floor(diff / 86400000)
  if (days === 0) return 'сегодня'
  if (days === 1) return 'вчера'
  if (days < 7) return `${days} дн. назад`
  return new Date(dateStr).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })
}

export function NewsWidget() {
  return (
    <div className="glass rounded-2xl border border-purple-900/20 overflow-hidden">
      <div className="px-5 py-4 border-b border-purple-900/20 flex items-center justify-between">
        <h3 className="text-white font-700 text-base" style={{ fontFamily: 'Exo 2, sans-serif' }}>
          📰 Последние новости
        </h3>
        <Link href="/news" className="text-purple-400 text-xs hover:text-purple-300 transition-colors">
          Все →
        </Link>
      </div>
      <div className="divide-y divide-purple-900/10">
        {recentNews.map((item, i) => (
          <a key={i} href={item.sourceUrl} target="_blank" rel="noopener noreferrer nofollow"
            className="flex items-start gap-3 px-5 py-3 hover:bg-white/3 transition-colors group cursor-pointer">
            <div className="flex-1 min-w-0">
              <span className="text-xs px-1.5 py-0.5 rounded mb-1.5 inline-block"
                style={{ background: `${item.tagColor}15`, color: item.tagColor, border: `1px solid ${item.tagColor}25` }}>
                {item.tag}
              </span>
              <p className="text-slate-300 text-sm group-hover:text-white transition-colors line-clamp-2 leading-snug">
                {item.title}
              </p>
            </div>
            <div className="flex flex-col items-end gap-1 shrink-0 mt-1">
              <span className="text-xs text-slate-600 flex items-center gap-0.5">
                <Clock size={9} /> {timeAgo(item.date)}
              </span>
              <ExternalLink size={11} className="text-slate-600 group-hover:text-purple-400 transition-colors" />
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
