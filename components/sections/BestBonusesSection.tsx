import Link from 'next/link'
import { Flame, ArrowRight, Clock } from 'lucide-react'
import { services } from '@/lib/data'
import { BrandLogo } from '@/components/ui/BrandLogo'

export function BestBonusesSection() {
  const topServices = services.sort((a,b) => b.rating - a.rating).slice(0, 4)

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/10 border border-orange-500/30 flex items-center justify-center">
              <Flame size={20} className="text-orange-400" />
            </div>
            <div>
              <h2 className="section-title text-2xl text-white">Лучшие бонусы сегодня</h2>
              <p className="text-slate-500 text-sm flex items-center gap-1">
                <Clock size={12} /> Обновлено сегодня
              </p>
            </div>
          </div>
          <Link href="/bonuses" className="hidden sm:flex items-center gap-1 text-sm text-purple-400 hover:text-purple-300 transition-colors">
            Все бонусы <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {topServices.map((service, i) => (
            <div key={service.slug} className="service-card p-4 group">
              {/* Top row */}
              <div className="flex items-center gap-3 mb-3">
                <BrandLogo website={service.website} name={service.name} logo={service.logo} logoUrl={service.logoUrl} accentColor={service.accentColor} size="sm" />
                <div>
                  <p className="text-white font-700 text-sm" style={{fontFamily:'Exo 2, sans-serif', fontWeight:700}}>{service.name}</p>
                  <div className="flex items-center gap-1">
                    <span className="text-amber-400 text-xs">★</span>
                    <span className="text-amber-400 text-xs font-600">{service.rating}</span>
                  </div>
                </div>
              </div>

              {/* Bonus */}
              <div className="p-3 rounded-lg mb-3" style={{background:`${service.accentColor}10`, border:`1px solid ${service.accentColor}20`}}>
                <p className="text-xs text-slate-400 mb-0.5">Бонус</p>
                <p className="font-700 text-sm" style={{fontFamily:'Exo 2, sans-serif', fontWeight:700, color:service.accentColor}}>
                  {service.mainBonus}
                </p>
              </div>

              <a href={service.refUrl || service.website} target="_blank" rel="noopener noreferrer nofollow"
                className="btn-neon w-full justify-center text-xs py-2">
                Получить бонус
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
