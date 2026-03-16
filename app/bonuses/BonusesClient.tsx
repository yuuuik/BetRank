'use client'
import { useState } from 'react'
import { ExternalLink, Flame, Gift, RotateCcw, DollarSign, Percent } from 'lucide-react'
import { Service, BonusOffer } from '@/types'
import { BrandLogo } from '@/components/ui/BrandLogo'

const bonusTypes = [
  { icon: Gift,       label: 'Бездепозитные', key: 'registration', color: '#a855f7', desc: 'Бонусы без пополнения счёта' },
  { icon: DollarSign, label: 'На депозит',     key: 'deposit',      color: '#38bdf8', desc: 'Бонус на первое пополнение' },
  { icon: Flame,      label: 'Фриспины',       key: 'freespins',    color: '#f97316', desc: 'Бесплатные вращения в слотах' },
  { icon: Percent,    label: 'Кэшбек',         key: 'cashback',     color: '#4ade80', desc: 'Возврат части проигрыша' },
  { icon: RotateCcw,  label: 'На пополнение',  key: 'reload',       color: '#e879f9', desc: 'Еженедельные бонусы' },
]

type BonusWithService = BonusOffer & { service: Service }

interface Props {
  allBonuses: BonusWithService[]
}

export function BonusesClient({ allBonuses }: Props) {
  const [activeFilter, setActiveFilter] = useState<string | null>(null)

  const filtered = activeFilter
    ? allBonuses.filter(b => {
        if (activeFilter === 'freespins') {
          return b.type === 'freespins'
            || /фриспин|\bfs\b/i.test(b.amount + ' ' + b.description)
        }
        return b.type === activeFilter
      })
    : allBonuses

  return (
    <>
      {/* Bonus type filters */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-10">
        {bonusTypes.map(({ icon: Icon, label, key, color, desc }) => {
          const isActive = activeFilter === key
          return (
            <button
              key={key}
              onClick={() => setActiveFilter(isActive ? null : key)}
              className={`service-card p-4 text-center cursor-pointer hover:scale-105 transition-all text-left w-full ${
                isActive ? 'ring-2' : ''
              }`}
              style={isActive ? { ringColor: color, boxShadow: `0 0 0 2px ${color}60` } : {}}
            >
              <div className="w-10 h-10 rounded-xl mx-auto mb-2 flex items-center justify-center transition-all"
                style={{
                  background: isActive ? `${color}30` : `${color}15`,
                  border: `1px solid ${isActive ? color : color + '30'}`,
                }}>
                <Icon size={18} style={{ color }} />
              </div>
              <p className="text-white font-600 text-sm" style={{ fontFamily: 'Exo 2, sans-serif' }}>{label}</p>
              <p className="text-slate-500 text-xs mt-0.5">{desc}</p>
            </button>
          )
        })}
      </div>

      {/* All bonuses */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="section-title text-2xl text-white">
          {activeFilter
            ? bonusTypes.find(b => b.key === activeFilter)?.label
            : 'Все актуальные бонусы'}
        </h2>
        <span className="text-slate-500 text-sm">{filtered.length} предложений</span>
      </div>

      <div className="space-y-3">
        {filtered.map((bonus, i) => (
          <div key={`${bonus.service.slug}-${bonus.type}-${i}`} className="service-card p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Service */}
            <div className="flex items-center gap-3 sm:w-40 shrink-0">
              <BrandLogo website={bonus.service.website} name={bonus.service.name} logo={bonus.service.logo} logoUrl={bonus.service.logoUrl} accentColor={bonus.service.accentColor} size="sm" />
              <div>
                <p className="text-white font-600 text-sm" style={{ fontFamily: 'Exo 2, sans-serif' }}>{bonus.service.name}</p>
                <p className="text-xs text-slate-500">{bonus.service.rating} ⭐</p>
              </div>
            </div>

            {/* Bonus info */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <p className="text-white font-600 text-sm">{bonus.title}</p>
                <span className="badge" style={{ background: `${bonus.service.accentColor}15`, border: `1px solid ${bonus.service.accentColor}30`, color: bonus.service.accentColor }}>
                  {bonusTypes.find(b => b.key === bonus.type)?.label || bonus.type}
                </span>
              </div>
              <p className="text-slate-400 text-sm">{bonus.description}</p>
              <div className="flex flex-wrap gap-3 mt-1 text-xs text-slate-500">
                <span>Вейджер: {bonus.wagering}</span>
                <span>Срок: {bonus.validDays} дн.</span>
              </div>
            </div>

            {/* Amount + CTA */}
            <div className="flex items-center gap-3 sm:flex-col sm:items-end shrink-0">
              <p className="font-800 text-lg" style={{ fontFamily: 'Exo 2, sans-serif', fontWeight: 800, color: bonus.service.accentColor }}>
                {bonus.amount}
              </p>
              <a href={bonus.service.refUrl || bonus.service.website} target="_blank" rel="noopener noreferrer nofollow"
                className="btn-neon text-xs py-2 px-4">
                Получить <ExternalLink size={12} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
