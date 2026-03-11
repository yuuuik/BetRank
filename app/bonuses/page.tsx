import { Metadata } from 'next'
import Link from 'next/link'
import { ExternalLink, Flame, Gift, RotateCcw, DollarSign, Percent } from 'lucide-react'
import { services } from '@/lib/data'
import { BrandLogo } from '@/components/ui/BrandLogo'

export const metadata: Metadata = {
  title: 'Лучшие бонусы казино и букмекеров 2026',
  description: 'Все актуальные бонусы онлайн-казино: бонусы на депозит, фриспины, кэшбек, бездепозитные бонусы. Сравните и выберите лучшее предложение.',
}

const bonusTypes = [
  { icon: Gift, label: 'Бездепозитные', key: 'registration', color: '#a855f7', desc: 'Бонусы без пополнения счёта' },
  { icon: DollarSign, label: 'На депозит', key: 'deposit', color: '#38bdf8', desc: 'Бонус на первое пополнение' },
  { icon: Flame, label: 'Фриспины', key: 'freespins', color: '#f97316', desc: 'Бесплатные вращения в слотах' },
  { icon: Percent, label: 'Кэшбек', key: 'cashback', color: '#4ade80', desc: 'Возврат части проигрыша' },
  { icon: RotateCcw, label: 'На пополнение', key: 'reload', color: '#e879f9', desc: 'Еженедельные бонусы' },
]

export default function BonusesPage() {
  const allBonuses = services.flatMap(s => s.bonuses.map(b => ({ ...b, service: s })))

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-10">
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
          <Link href="/" className="hover:text-slate-300">Главная</Link>
          <span>/</span>
          <span className="text-slate-300">Бонусы</span>
        </div>
        <h1 className="section-title text-3xl md:text-4xl text-white mb-3">Лучшие бонусы 2026</h1>
        <p className="text-slate-400 text-lg max-w-2xl">Все актуальные бонусные предложения от проверенных казино и букмекеров. Обновляется ежедневно.</p>
      </div>

      {/* Bonus type filters */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-10">
        {bonusTypes.map(({ icon: Icon, label, color, desc }) => (
          <div key={label} className="service-card p-4 text-center cursor-pointer hover:scale-105 transition-transform">
            <div className="w-10 h-10 rounded-xl mx-auto mb-2 flex items-center justify-center"
              style={{background:`${color}15`, border:`1px solid ${color}30`}}>
              <Icon size={18} style={{color}} />
            </div>
            <p className="text-white font-600 text-sm" style={{fontFamily:'Exo 2, sans-serif'}}>{label}</p>
            <p className="text-slate-500 text-xs mt-0.5">{desc}</p>
          </div>
        ))}
      </div>

      {/* All bonuses */}
      <h2 className="section-title text-2xl text-white mb-6">Все актуальные бонусы</h2>
      <div className="space-y-3">
        {allBonuses.map((bonus, i) => (
          <div key={i} className="service-card p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Service */}
            <div className="flex items-center gap-3 sm:w-40 shrink-0">
              <BrandLogo website={bonus.service.website} name={bonus.service.name} logo={bonus.service.logo} accentColor={bonus.service.accentColor} size="sm" />
              <div>
                <p className="text-white font-600 text-sm" style={{fontFamily:'Exo 2, sans-serif'}}>{bonus.service.name}</p>
                <p className="text-xs text-slate-500">{bonus.service.rating} ⭐</p>
              </div>
            </div>

            {/* Bonus info */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <p className="text-white font-600 text-sm">{bonus.title}</p>
                <span className="badge" style={{background:`${bonus.service.accentColor}15`, border:`1px solid ${bonus.service.accentColor}30`, color:bonus.service.accentColor}}>
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
              <p className="font-800 text-lg" style={{fontFamily:'Exo 2, sans-serif', fontWeight:800, color:bonus.service.accentColor}}>
                {bonus.amount}
              </p>
              <a href={bonus.service.website} target="_blank" rel="noopener noreferrer nofollow"
                className="btn-neon text-xs py-2 px-4">
                Получить <ExternalLink size={12} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
