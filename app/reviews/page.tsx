import { Metadata } from 'next'
import Link from 'next/link'
import { Star, ArrowRight } from 'lucide-react'
import { services } from '@/lib/data'
import { BrandLogo } from '@/components/ui/BrandLogo'

export const metadata: Metadata = {
  title: 'Обзоры казино и букмекеров 2026 — Подробный анализ',
  description: 'Подробные обзоры онлайн-казино и букмекерских контор. Анализ бонусов, выплат, поддержки и игрового ассортимента.',
}

export default function ReviewsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link href="/" className="hover:text-slate-300">Главная</Link>
        <span>/</span>
        <span className="text-slate-300">Обзоры</span>
      </div>
      <div className="mb-8">
        <h1 className="section-title text-3xl md:text-4xl text-white mb-3">Обзоры сервисов</h1>
        <p className="text-slate-400 text-lg">Подробный анализ каждой платформы от наших экспертов</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map(service => (
          <Link key={service.slug} href={`/review/${service.slug}`} target="_blank"
            className="service-card p-5 group block">
            <div className="flex items-center gap-4 mb-4">
              {/* BrandLogo вместо эмодзи */}
              <BrandLogo
                website={service.website}
                name={service.name}
                logo={service.logo}
                accentColor={service.accentColor}
                size="md"
              />
              <div>
                <h2 className="text-white font-700 text-lg" style={{ fontFamily: 'Exo 2, sans-serif', fontWeight: 700 }}>
                  {service.name}
                </h2>
                {service.badge && (
                  <span className="badge badge-featured text-xs mt-0.5 inline-block">{service.badge}</span>
                )}
                <div className="flex items-center gap-1 mt-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} size={12} className={i < Math.floor(service.rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-700'} />
                  ))}
                  <span className="text-amber-400 text-xs ml-1 font-600">{service.rating}</span>
                  <span className="text-slate-600 text-xs">({service.reviewCount.toLocaleString('ru')})</span>
                </div>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 mb-4">{service.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-sm font-600" style={{ color: service.accentColor }}>{service.mainBonus}</span>
              <span className="flex items-center gap-1 text-xs text-purple-400 group-hover:text-purple-300 transition-colors">
                Читать обзор <ArrowRight size={13} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
