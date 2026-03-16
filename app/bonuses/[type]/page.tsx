import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { bonusCategories } from '@/lib/categories'
import { services } from '@/lib/data'
import { BrandLogo } from '@/components/ui/BrandLogo'
import { EmailSubscribe } from '@/components/widgets/EmailSubscribe'
import { ChevronRight, ExternalLink } from 'lucide-react'

interface Props { params: { type: string } }

export async function generateStaticParams() {
  return bonusCategories.map(c => ({ type: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cat = bonusCategories.find(c => c.slug === params.type)
  if (!cat) return {}
  return { title: cat.title, description: cat.metaDesc }
}

export default function BonusTypePage({ params }: Props) {
  const cat = bonusCategories.find(c => c.slug === params.type)
  if (!cat) notFound()

  const bonuses = [...services].sort((a, b) => b.rating - a.rating).flatMap(s =>
    s.bonuses
      .filter(b => b.type === cat.type)
      .map(b => ({ ...b, service: s }))
  )

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex items-center gap-1.5 text-sm text-slate-500 mb-6 flex-wrap">
        <Link href="/" className="hover:text-slate-300">Главная</Link>
        <ChevronRight size={13} />
        <Link href="/bonuses" className="hover:text-slate-300">Бонусы</Link>
        <ChevronRight size={13} />
        <span className="text-slate-300">{cat.h1}</span>
      </div>

      <div className="relative overflow-hidden rounded-2xl p-8 mb-10 border"
        style={{ background: `linear-gradient(135deg, ${cat.color}12, ${cat.color}04)`, borderColor: `${cat.color}25` }}>
        <div className="text-4xl mb-3">{cat.icon}</div>
        <h1 className="section-title text-3xl md:text-4xl text-white mb-3">{cat.h1}</h1>
        <p className="text-slate-400 text-lg max-w-2xl">{cat.description}</p>
        <span className="inline-block mt-4 px-3 py-1 rounded-full text-sm font-500 border"
          style={{ background: `${cat.color}15`, borderColor: `${cat.color}30`, color: cat.color }}>
          {bonuses.length} предложений
        </span>
      </div>

      <div className="glass rounded-2xl border border-purple-900/20 p-6 mb-10">
        <p className="text-slate-400 text-sm leading-relaxed">{cat.seoText}</p>
      </div>

      <div className="space-y-3 mb-12">
        {bonuses.map((bonus, i) => (
          <div key={i} className="service-card p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-center gap-3 sm:w-44 shrink-0">
              <BrandLogo website={bonus.service.website} name={bonus.service.name}
                logo={bonus.service.logo} logoUrl={bonus.service.logoUrl} accentColor={bonus.service.accentColor} size="sm" />
              <div>
                <p className="text-white font-600 text-sm" style={{ fontFamily: 'Exo 2, sans-serif' }}>
                  {bonus.service.name}
                </p>
                <p className="text-xs text-slate-500">{bonus.service.rating} ★</p>
              </div>
            </div>
            <div className="flex-1">
              <p className="text-white font-600 text-sm mb-1">{bonus.title}</p>
              <p className="text-slate-400 text-sm">{bonus.description}</p>
              <div className="flex flex-wrap gap-3 mt-1 text-xs text-slate-500">
                <span>Вейджер: {bonus.wagering}</span>
                <span>Срок: {bonus.validDays} дн.</span>
              </div>
            </div>
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

      {/* Другие типы бонусов */}
      <div className="mb-10">
        <h2 className="section-title text-xl text-white mb-4">Другие виды бонусов</h2>
        <div className="flex flex-wrap gap-2">
          {bonusCategories.filter(c => c.slug !== params.type).map(c => (
            <Link key={c.slug} href={`/bonuses/${c.slug}`}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm border border-purple-900/20 text-slate-400 hover:text-white hover:border-purple-700/40 transition-all">
              {c.icon} {c.h1}
            </Link>
          ))}
        </div>
      </div>

    </div>
  )
}
