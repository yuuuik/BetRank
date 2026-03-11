import { Metadata } from 'next'
import Link from 'next/link'
import { Clock, ArrowRight } from 'lucide-react'
import { guides } from './[slug]/page'

export const metadata: Metadata = {
  title: 'Гайды по казино и букмекерам — Советы экспертов',
  description: 'Полезные гайды для игроков: как выбрать казино, как работают бонусы, стратегии ставок, управление банкроллом.',
}

export default function GuidesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link href="/" className="hover:text-slate-300">Главная</Link>
        <span>/</span>
        <span className="text-slate-300">Гайды</span>
      </div>
      <div className="mb-8">
        <h1 className="section-title text-3xl md:text-4xl text-white mb-3">Гайды и советы</h1>
        <p className="text-slate-400 text-lg max-w-2xl">Экспертные материалы для новичков и опытных игроков. Узнайте всё о казино, букмекерах и стратегиях.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {guides.map(guide => (
          <Link key={guide.slug} href={`/guides/${guide.slug}`} className="service-card p-5 group block hover:border-purple-500/40 transition-all">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">{guide.emoji}</span>
              <span className="badge badge-featured">{guide.category}</span>
            </div>
            <h2 className="text-white font-700 text-lg mb-2 leading-snug" style={{fontFamily:'Exo 2, sans-serif', fontWeight:700}}>
              {guide.title}
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">{guide.excerpt}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-xs text-slate-500">
                <Clock size={12} /> {guide.readTime} чтения
              </div>
              <span className="flex items-center gap-1 text-xs text-purple-400 group-hover:text-purple-300 transition-colors">
                Читать <ArrowRight size={13} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
