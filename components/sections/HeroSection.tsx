import Link from 'next/link'
import { ArrowRight, Shield, Star, Users, TrendingUp } from 'lucide-react'

const stats = [
  { icon: Star, value: '50+', label: 'Обзоров' },
  { icon: Users, value: '200K+', label: 'Читателей' },
  { icon: Shield, value: '100%', label: 'Независимость' },
  { icon: TrendingUp, value: '5 лет', label: 'Опыта' },
]

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      {/* Decorative grid */}
      <div className="absolute inset-0 opacity-5"
        style={{ backgroundImage: 'linear-gradient(rgba(168,85,247,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.3) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />

      {/* Radial glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.6) 0%, rgba(56,189,248,0.3) 40%, transparent 70%)' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="text-center max-w-4xl mx-auto">
          {/* Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-700/40 bg-purple-900/20 text-purple-300 text-sm font-500 mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Обновлено в {new Date().toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' })}
          </div>

          {/* Title */}
          <h1 className="section-title text-4xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight">
            Рейтинг лучших{' '}
            <span className="gradient-text">онлайн-казино</span>{' '}
            2026
          </h1>

          <p className="text-slate-400 text-lg md:text-xl leading-relaxed mb-8 max-w-2xl mx-auto">
            Независимые обзоры, сравнение бонусов и честные отзывы. Находите самые выгодные предложения среди проверенных платформ.
          </p>

          {/* CTA */}
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/ratings" className="btn-neon text-base px-6 py-3">
              Смотреть рейтинг <ArrowRight size={18} />
            </Link>
            <Link href="/bonuses"
              className="flex items-center gap-2 text-base px-6 py-3 rounded-xl border border-purple-700/30 text-slate-300 hover:text-white hover:border-purple-500/50 hover:bg-purple-900/10 transition-all">
              Лучшие бонусы ✨
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-2xl mx-auto">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="text-center p-4 rounded-xl bg-white/3 border border-purple-900/20">
                <Icon size={20} className="mx-auto mb-2 text-purple-400" />
                <p className="text-2xl font-800 text-white" style={{fontFamily:'Exo 2, sans-serif'}}>{value}</p>
                <p className="text-xs text-slate-500 mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
