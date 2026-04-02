import { Star, Zap, Smartphone, Clock, ExternalLink, Trophy, Sparkles, Coins } from 'lucide-react'
import { Service } from '@/types'
import { BrandLogo } from '@/components/ui/BrandLogo'

interface PaymentHighlight {
  icon: string
  name: string
  speed: string
  commission: string
}

interface ServiceCardProps {
  service: Service
  rank?: number
  paymentHighlight?: PaymentHighlight
}

export function ServiceCard({ service, rank, paymentHighlight }: ServiceCardProps) {
  return (
    <div className="service-card p-5 group">
      <div className="flex items-start gap-4">
        {/* Rank + Logo */}
        <div className="flex flex-col items-center gap-2 shrink-0">
          {rank && (
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-700 ${
              rank === 1 ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40' :
              rank === 2 ? 'bg-slate-400/20 text-slate-300 border border-slate-400/40' :
              rank === 3 ? 'bg-orange-400/20 text-orange-300 border border-orange-400/40' :
              'bg-purple-900/30 text-purple-400 border border-purple-700/30'
            }`} style={{fontFamily:'Exo 2, sans-serif', fontWeight:700}}>
              {rank}
            </div>
          )}
          <BrandLogo
            website={service.website}
            name={service.name}
            logo={service.logo} logoUrl={service.logoUrl}
            accentColor={service.accentColor}
            size="md"
          />
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h3 className="text-white font-700 text-lg leading-tight" style={{fontFamily:'Exo 2, sans-serif', fontWeight:700}}>
              {service.name}
            </h3>
            {service.badge && <span className="badge badge-featured">{service.badge}</span>}
            {service.popular && !service.badge && (
              <span className="badge badge-popular"><Trophy size={9} /> Популярное</span>
            )}
          </div>

          <div className="flex items-center gap-2 mt-1">
            <div className="flex">
              {Array.from({length:5}, (_,i) => (
                <Star key={i} size={12} className={i < Math.floor(service.rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-600'} />
              ))}
            </div>
            <span className="text-amber-400 text-sm font-600">{service.rating}</span>
            <span className="text-slate-500 text-xs">({service.reviewCount.toLocaleString()})</span>
          </div>

          <p className="text-slate-400 text-sm leading-relaxed mt-2 line-clamp-2">{service.description}</p>

          <div className="mt-3">
            <p className="text-xs text-slate-500 uppercase tracking-wider font-500 mb-0.5">Бонус</p>
            <p className="font-700 text-sm" style={{fontFamily:'Exo 2, sans-serif', fontWeight:700, color: service.accentColor}}>
              {service.mainBonus}
            </p>
          </div>

          {paymentHighlight && (
            <div className="flex flex-wrap items-center gap-1.5 mt-3">
              <span className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-sky-900/30 text-sky-300 border border-sky-700/40 font-500">
                {paymentHighlight.icon} {paymentHighlight.name} ✓
              </span>
              <span className="text-xs px-2 py-1 rounded-full bg-slate-800/50 text-slate-400 border border-slate-700/30">
                {paymentHighlight.speed}
              </span>
              {paymentHighlight.commission === '0%' && (
                <span className="text-xs px-2 py-1 rounded-full bg-green-900/30 text-green-400 border border-green-700/30">
                  0% комиссия
                </span>
              )}
            </div>
          )}

          <div className="flex flex-wrap gap-1.5 mt-3">
            {service.hasLiveBetting && (
              <span className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-blue-900/30 text-blue-300 border border-blue-700/30">
                <Zap size={10} /> Live
              </span>
            )}
            {service.hasMobileApp && (
              <span className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-purple-900/30 text-purple-300 border border-purple-700/30">
                <Smartphone size={10} /> Приложение
              </span>
            )}
            {service.hasFastWithdrawal && (
              <span className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-green-900/30 text-green-300 border border-green-700/30">
                <Clock size={10} /> Быстро
              </span>
            )}
            {service.hasFreeSpins && (
              <span className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-amber-900/30 text-amber-300 border border-amber-700/30">
                <Sparkles size={10} /> Фриспины
              </span>
            )}
            {service.hasCashback && (
              <span className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-rose-900/30 text-rose-300 border border-rose-700/30">
                <Coins size={10} /> Кэшбек
              </span>
            )}
            <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800/50 text-slate-400 border border-slate-700/30">
              Деп. от {service.minDeposit} ₽
            </span>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-2 mt-4 pt-4 border-t border-purple-900/20">
        <a href={service.refUrl || service.website} target="_blank" rel="noopener noreferrer nofollow"
          className="btn-neon flex-1 justify-center text-sm py-3 font-700">
          Получить бонус <ExternalLink size={14} />
        </a>
        <a href={`/review/${service.slug}`}
          className="flex items-center justify-center gap-1 text-sm px-4 py-3 rounded-xl border border-purple-700/30 text-slate-400 hover:text-white hover:border-purple-500/50 hover:bg-purple-900/10 transition-all sm:w-auto w-full">
          Обзор
        </a>
      </div>
    </div>
  )
}
