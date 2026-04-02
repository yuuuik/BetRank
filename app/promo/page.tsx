import { Metadata } from 'next'
import Link from 'next/link'
import { promoCodes } from '@/lib/promos'
import { ChevronRight, Shield, Gift } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Промокоды казино 2026 — эксклюзивные бонусы BetRank',
  description: 'Актуальные промокоды для онлайн-казино 2026. Эксклюзивные коды BetRank: бонусы без депозита, фриспины, увеличенные приветственные пакеты.',
}

const typeLabels: Record<string, string> = {
  deposit: 'На депозит',
  nodep: 'Без депозита',
  freespins: 'Фриспины',
  freebet: 'Фрибет',
  cashback: 'Кэшбек',
}

const typeColors: Record<string, string> = {
  deposit: '#a855f7',
  nodep: '#22c55e',
  freespins: '#f59e0b',
  freebet: '#3b82f6',
  cashback: '#f43f5e',
}

export default function PromoIndexPage() {
  const exclusivePromos = promoCodes.filter(p => p.exclusive)
  const otherPromos = promoCodes.filter(p => !p.exclusive)

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex items-center gap-1.5 text-sm text-slate-500 mb-6 flex-wrap">
        <Link href="/" className="hover:text-slate-300">Главная</Link>
        <ChevronRight size={13} />
        <span className="text-slate-300">Промокоды</span>
      </div>

      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl p-8 mb-10 border border-purple-900/20"
        style={{ background: 'linear-gradient(135deg, #a855f715, #6366f108)' }}>
        <div className="text-4xl mb-3">🎁</div>
        <h1 className="section-title text-3xl md:text-4xl text-white mb-2">
          Промокоды казино 2026
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl">
          Эксклюзивные промокоды BetRank — увеличенные бонусы, фриспины без депозита и уникальные предложения только для наших читателей.
        </p>
        <div className="flex flex-wrap gap-4 mt-5">
          <div className="flex items-center gap-2 text-sm">
            <Shield size={14} className="text-green-400" />
            <span className="text-slate-400">Все коды проверены</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Gift size={14} className="text-purple-400" />
            <span className="text-slate-400">{exclusivePromos.length} эксклюзивных предложений</span>
          </div>
        </div>
      </div>

      {/* Exclusive */}
      <h2 className="section-title text-2xl text-white mb-5">
        Эксклюзивные промокоды BetRank
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {exclusivePromos.map(promo => {
          const color = typeColors[promo.type] || '#a855f7'
          return (
            <Link key={promo.slug} href={`/promo/${promo.serviceSlug}`}
              className="service-card p-5 group hover:scale-[1.01] transition-transform flex flex-col">
              <div className="flex items-start gap-3 mb-4">
                <span className="text-3xl shrink-0">{promo.serviceLogo}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap gap-1.5 mb-1">
                    <span className="text-xs px-2 py-0.5 rounded-full font-600"
                      style={{ background: `${color}20`, color, border: `1px solid ${color}30` }}>
                      {typeLabels[promo.type]}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-amber-900/30 text-amber-300 border border-amber-700/30 font-600">
                      Эксклюзив
                    </span>
                  </div>
                  <h3 className="text-white font-700 text-base leading-tight" style={{ fontFamily: 'Exo 2, sans-serif' }}>
                    Промокод {promo.serviceName}
                  </h3>
                </div>
              </div>

              <p className="text-2xl font-800 mb-1" style={{ color, fontFamily: 'Exo 2, sans-serif' }}>
                {promo.amount}
              </p>
              <p className="text-slate-500 text-sm mb-4 flex-1">{promo.title}</p>

              <div className="flex items-center justify-between pt-3 border-t border-purple-900/20">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-600">Код:</span>
                  <span className="text-xs font-700 px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                    {promo.code}
                  </span>
                </div>
                <span className="text-sm font-600 group-hover:translate-x-1 transition-transform" style={{ color }}>
                  Получить →
                </span>
              </div>
            </Link>
          )
        })}
      </div>

      {otherPromos.length > 0 && (
        <>
          <h2 className="section-title text-2xl text-white mb-5">Другие промокоды</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherPromos.map(promo => {
              const color = typeColors[promo.type] || '#a855f7'
              return (
                <Link key={promo.slug} href={`/promo/${promo.serviceSlug}`}
                  className="service-card p-5 group hover:scale-[1.01] transition-transform flex flex-col">
                  <div className="flex items-start gap-3 mb-4">
                    <span className="text-3xl shrink-0">{promo.serviceLogo}</span>
                    <div className="flex-1 min-w-0">
                      <span className="text-xs px-2 py-0.5 rounded-full font-600 mb-1 inline-block"
                        style={{ background: `${color}20`, color, border: `1px solid ${color}30` }}>
                        {typeLabels[promo.type]}
                      </span>
                      <h3 className="text-white font-700 text-base leading-tight" style={{ fontFamily: 'Exo 2, sans-serif' }}>
                        Промокод {promo.serviceName}
                      </h3>
                    </div>
                  </div>
                  <p className="text-2xl font-800 mb-1" style={{ color, fontFamily: 'Exo 2, sans-serif' }}>
                    {promo.amount}
                  </p>
                  <p className="text-slate-500 text-sm mb-4 flex-1">{promo.title}</p>
                  <div className="flex items-center justify-between pt-3 border-t border-purple-900/20">
                    <span className="text-xs font-700 px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                      {promo.code}
                    </span>
                    <span className="text-sm font-600 group-hover:translate-x-1 transition-transform" style={{ color }}>
                      Получить →
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
