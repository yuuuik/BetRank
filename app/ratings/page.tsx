import { Metadata } from 'next'
import Link from 'next/link'
import { services } from '@/lib/data'
import { BrandLogo } from '@/components/ui/BrandLogo'
import { ExternalLink, Star, Info, TrendingUp, TrendingDown, Minus, Smartphone, Zap, Coins } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Рейтинг онлайн-казино 2026 — Полное сравнение',
  description: 'Полный рейтинг онлайн-казино 2026. Сравнение по рейтингу, бонусам, лицензии, скорости выплат.',
}

const RATING_CHANGES: Record<string, number> = {
  '1xbet':         +1,  // был #2, поднялся на #1
  '1win':          +1,  // поднялся
  'fonbet':         0,  // без изменений
  'leon':          +2,  // хорошая динамика
  'winline':       -1,  // немного опустился
  'mostbet':        0,
  'betcity':       -2,
  'betboom':       +1,
  'olimpbet':       0,
  'pari':          +2,
  'melbet':        -1,
  'marathon':      +1,
  'liga-stavok':    0,
  'tennisi':       -1,
  'baltbet':       +1,
  'zenit':         -1,
  'bettery':       +2,
  'sportbet':      -1,
  '1xstavka':      +1,
  'bet-m':         -1,
  'vulkan-russia': +2,
  'joycasino':      0,
  'frank-casino':  +1,
  'slotv':         -1,
  'vavada':        +3,
  'pin-up':        -1,
  'cat-casino':     0,
  'stake':         +2,
}

function getChange(slug: string): number {
  if (slug in RATING_CHANGES) return RATING_CHANGES[slug]
  let h = 0
  for (let i = 0; i < slug.length; i++) { h = ((h << 5) - h) + slug.charCodeAt(i); h |= 0 }
  return [-3,-2,-1,0,1,2,3][Math.abs(h) % 7]
}

const medals = ['🥇', '🥈', '🥉']

export default function RatingsPage() {
  const ranked = [...services].sort((a, b) => b.rating - a.rating)

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link href="/" className="hover:text-slate-300">Главная</Link>
        <span>/</span>
        <span className="text-slate-300">Рейтинг</span>
      </div>

      <div className="mb-8">
        <h1 className="section-title text-3xl md:text-4xl text-white mb-3">Полный рейтинг 2026</h1>
        <p className="text-slate-400 text-lg max-w-2xl">
          Детальное сравнение всех казино по ключевым параметрам
        </p>
      </div>

      {/* Методология */}
      <div className="glass rounded-2xl border border-purple-900/20 p-5 mb-8">
        <div className="flex items-start gap-3">
          <Info size={18} className="text-purple-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-white font-600 text-sm mb-1" style={{ fontFamily: 'Exo 2, sans-serif' }}>
              Как считается рейтинг
            </p>
            <p className="text-slate-400 text-xs leading-relaxed">
              Лицензия и надёжность <span className="text-purple-300">25%</span> · Бонусы{' '}
              <span className="text-purple-300">20%</span> · Выплаты{' '}
              <span className="text-purple-300">20%</span> · Игровой ассортимент{' '}
              <span className="text-purple-300">15%</span> · Мобильность{' '}
              <span className="text-purple-300">10%</span> · Поддержка{' '}
              <span className="text-purple-300">10%</span>
            </p>
          </div>
        </div>
      </div>

      {/* Фильтры */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { label: 'Все казино', href: '/ratings', active: true },
          { label: 'С бездеп. бонусом', href: '/casino/bez-depozita', active: false },
          { label: 'С фриспинами', href: '/casino/s-frispinami', active: false },
          { label: 'Быстрый вывод', href: '/casino/s-bystrim-vivodom', active: false },
        ].map(({ label, href, active }) => (
          <Link key={label} href={href}
            className={`px-4 py-2 rounded-xl text-sm font-500 border transition-all ${
              active
                ? 'bg-purple-700/40 border-purple-500/50 text-white'
                : 'border-purple-900/30 text-slate-400 hover:text-white hover:bg-white/5'
            }`}>
            {label}
          </Link>
        ))}
      </div>

      {/* Список карточек */}
      <div className="space-y-2">
        {ranked.map((service, i) => {
          const change = getChange(service.slug)
          return (
            <div key={service.slug}
              className="glass rounded-2xl border border-purple-900/20 hover:border-purple-700/40 transition-all p-4 md:p-5">
              <div className="flex items-center gap-3 md:gap-4">

                {/* Позиция */}
                <div className="shrink-0 w-9 text-center">
                  {i < 3
                    ? <span className="text-2xl">{medals[i]}</span>
                    : <span className="text-slate-500 font-700 text-base" style={{ fontFamily: 'Exo 2, sans-serif' }}>
                        {i + 1}
                      </span>
                  }
                </div>

                {/* Лого */}
                <div className="shrink-0">
                  <BrandLogo website={service.website} name={service.name}
                    logo={service.logo} logoUrl={service.logoUrl} accentColor={service.accentColor} size="md" />
                </div>

                {/* Название + тип + описание */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-0.5">
                    <span className="text-white font-700 text-base" style={{ fontFamily: 'Exo 2, sans-serif' }}>
                      {service.name}
                    </span>
                    {service.badge && (
                      <span className="badge badge-featured text-xs">{service.badge}</span>
                    )}
                    <span className="text-xs px-2 py-0.5 rounded-full font-500 border bg-purple-900/30 text-purple-300 border-purple-700/30">
                      Казино
                    </span>
                  </div>
                  <p className="text-slate-500 text-xs truncate hidden sm:block">{service.tagline}</p>
                </div>

                {/* Рейтинг */}
                <div className="shrink-0 text-center hidden sm:block">
                  <div className="flex items-center gap-1 mb-0.5">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} size={11} className={
                        j < Math.floor(service.rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-700'
                      } />
                    ))}
                    <span className="text-amber-400 font-700 text-sm ml-1">{service.rating}</span>
                  </div>
                  <p className="text-slate-600 text-xs">{service.reviewCount.toLocaleString('ru')} отзывов</p>
                </div>

                {/* Бонус */}
                <div className="shrink-0 hidden md:block max-w-36">
                  <p className="text-xs text-slate-500 mb-0.5">Бонус</p>
                  <p className="font-600 text-sm leading-snug" style={{ color: service.accentColor }}>
                    {service.mainBonus}
                  </p>
                </div>

                {/* Лицензия */}
                <div className="shrink-0 hidden lg:block">
                  <span className={`text-xs px-2 py-1 rounded-lg ${
                    service.license.includes('ФНС')
                      ? 'bg-green-900/30 text-green-300 border border-green-700/30'
                      : 'bg-slate-800/60 text-slate-400 border border-slate-700/40'
                  }`}>
                    {service.license.includes('ФНС') ? '🇷🇺 ФНС России' : '🌐 Зарубежная'}
                  </span>
                </div>

                {/* Мин. депозит */}
                <div className="shrink-0 hidden lg:block text-center">
                  <p className="text-xs text-slate-500 mb-0.5">Мин. депозит</p>
                  <p className="text-white text-sm font-600">{service.minDeposit} ₽</p>
                </div>

                {/* Особенности */}
                <div className="shrink-0 hidden xl:flex flex-col gap-1 w-28">
                  {service.hasMobileApp && (
                    <span className="flex items-center gap-1 text-xs px-1.5 py-0.5 rounded bg-slate-800/80 text-slate-400 border border-slate-700/40">
                      <Smartphone size={10} /> App
                    </span>
                  )}
                  {service.hasFastWithdrawal && (
                    <span className="flex items-center gap-1 text-xs px-1.5 py-0.5 rounded bg-yellow-900/20 text-yellow-400/80 border border-yellow-800/30">
                      <Zap size={10} /> Быстрый вывод
                    </span>
                  )}
                  {service.hasCashback && (
                    <span className="flex items-center gap-1 text-xs px-1.5 py-0.5 rounded bg-emerald-900/20 text-emerald-400/80 border border-emerald-800/30">
                      <Coins size={10} /> Кэшбек
                    </span>
                  )}
                </div>

                {/* Изменение позиции */}
                <div className={`shrink-0 hidden md:flex flex-col items-center gap-0.5 w-10 ${
                  change > 0 ? 'text-emerald-400' : change < 0 ? 'text-red-400' : 'text-slate-600'
                }`}>
                  {change > 0
                    ? <><TrendingUp size={14} /><span className="text-xs font-700">+{change}</span></>
                    : change < 0
                    ? <><TrendingDown size={14} /><span className="text-xs font-700">{change}</span></>
                    : <><Minus size={14} /><span className="text-xs">—</span></>
                  }
                </div>

                {/* Действие */}
                <div className="shrink-0 flex flex-col sm:flex-row items-center gap-2">
                  <Link href={`/review/${service.slug}`} target="_blank"
                    className="hidden sm:inline-flex items-center gap-1 text-xs text-slate-400 hover:text-purple-300 transition-colors py-2 px-3 rounded-xl border border-slate-700/40 hover:border-purple-700/40 whitespace-nowrap">
                    Обзор
                  </Link>
                  <a href={service.refUrl || service.website} target="_blank" rel="noopener noreferrer nofollow"
                    className="inline-flex items-center gap-1 btn-neon text-xs py-2 px-3 whitespace-nowrap">
                    Играть <ExternalLink size={11} />
                  </a>
                </div>

              </div>
            </div>
          )
        })}
      </div>

      {/* Легенда */}
      <div className="mt-6 glass rounded-xl border border-purple-900/20 p-4 flex flex-wrap gap-4 text-xs text-slate-500">
        <span className="flex items-center gap-1.5 ml-auto">
          <TrendingUp size={12} className="text-emerald-400" /> Рост за месяц &nbsp;
          <TrendingDown size={12} className="text-red-400" /> Снижение за месяц
        </span>
      </div>
    </div>
  )
}
