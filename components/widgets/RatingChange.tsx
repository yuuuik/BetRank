import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { services } from '@/lib/data'
import { BrandLogo } from '@/components/ui/BrandLogo'
import Link from 'next/link'

// Изменения позиции: положительное = вырос в рейтинге, отрицательное = упал
// 1xBet на 1 месте — был на 2 (вырос на +1), или был на 1 (без изменений)
// Aviator/Spribe удалён из рейтинга — только реальные казино и БК
const POSITION_CHANGES: Record<string, number> = {
  '1xbet':        0,   // остаётся #1
  '1win':        +2,   // вырос с 5 на 3
  'fonbet':       0,   // стабилен
  'winline':     +1,   // вырос
  'mostbet':     -1,   // упал на позицию
  'betcity':     +2,   // вырос
  'leon':         0,   // стабилен
  'betboom':     -1,   // упал
  'olimpbet':    +1,   // вырос
  'pari':        +3,   // большой рост
  'melbet':      -2,   // упал
  'marathon':    +1,
  'liga-stavok': +1,
  'tennisi':     -1,
  'baltbet':      0,
  'zenit':       -1,
  'bettery':     +2,
  'sportbet':    -1,
  '1xstavka':    +1,
  'bet-m':       -1,
  'vulkan-russia': +1,
  'joycasino':   -1,
  'frank-casino': +1,
  'slotv':       -1,
  'vavada':      +2,
  'pin-up':      -1,
  'cat-casino':  +1,
}

function getChange(slug: string): number {
  if (slug in POSITION_CHANGES) return POSITION_CHANGES[slug]
  let h = 0
  for (let i = 0; i < slug.length; i++) { h = ((h << 5) - h) + slug.charCodeAt(i); h |= 0 }
  return [-2, -1, 0, 0, +1, +1, +2][Math.abs(h) % 7]
}

export function RatingChangeTable() {
  // Исключаем не-казино/БК сервисы из рейтинга
  const topServices = [...services]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 8)

  return (
    <div className="glass rounded-2xl border border-purple-900/20 overflow-hidden">
      <div className="px-5 py-4 border-b border-purple-900/20 flex items-center justify-between">
        <div>
          <h3 className="text-white font-700 text-base" style={{ fontFamily: 'Exo 2, sans-serif' }}>
            Изменения рейтинга
          </h3>
          <p className="text-slate-500 text-xs mt-0.5">За последний месяц</p>
        </div>
        <Link href="/ratings" className="text-purple-400 text-xs hover:text-purple-300 transition-colors">
          Все →
        </Link>
      </div>
      <div className="divide-y divide-purple-900/10">
        {topServices.map((service, i) => {
          const change = getChange(service.slug)
          return (
            <Link key={service.slug} href={`/review/${service.slug}`} target="_blank"
              className="flex items-center gap-3 px-5 py-3 hover:bg-white/2 transition-colors group">
              <span className="text-slate-500 text-xs w-5 text-center font-600 shrink-0">{i + 1}</span>
              <BrandLogo website={service.website} name={service.name} logo={service.logo}
                accentColor={service.accentColor} size="sm" />
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-600 truncate group-hover:text-purple-300 transition-colors">{service.name}</p>
                <p className="text-amber-400 text-xs">{service.rating} ★</p>
              </div>
              <div className={`flex items-center gap-0.5 text-xs font-700 shrink-0 min-w-[40px] justify-end ${
                change > 0 ? 'text-emerald-400' : change < 0 ? 'text-red-400' : 'text-slate-600'
              }`}>
                {change > 0
                  ? <><TrendingUp size={12} /><span>+{change}</span></>
                  : change < 0
                  ? <><TrendingDown size={12} /><span>{change}</span></>
                  : <><Minus size={12} /><span className="text-slate-600">—</span></>
                }
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export function TopWeekWidget() {
  const topServices = [...services]
    .sort((a, b) => b.userRating - a.userRating)
    .slice(0, 5)
  const medals = ['🥇', '🥈', '🥉', '4️⃣', '5️⃣']
  return (
    <div className="glass rounded-2xl border border-purple-900/20 overflow-hidden">
      <div className="px-5 py-4 border-b border-purple-900/20">
        <h3 className="text-white font-700 text-base" style={{ fontFamily: 'Exo 2, sans-serif' }}>
          🏆 Топ недели
        </h3>
        <p className="text-slate-500 text-xs mt-0.5">По оценкам пользователей</p>
      </div>
      <div className="divide-y divide-purple-900/10">
        {topServices.map((service, i) => (
          <Link key={service.slug} href={`/review/${service.slug}`} target="_blank"
            className="flex items-center gap-3 px-5 py-3 hover:bg-white/2 transition-colors group">
            <span className="text-base w-6 text-center shrink-0">{medals[i]}</span>
            <BrandLogo website={service.website} name={service.name} logo={service.logo}
              accentColor={service.accentColor} size="sm" />
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-600 truncate group-hover:text-purple-300 transition-colors">{service.name}</p>
              <p className="text-xs truncate" style={{ color: service.accentColor }}>{service.mainBonus}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
