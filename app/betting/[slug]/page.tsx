import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { bettingCategories } from '@/lib/categories'
import { services } from '@/lib/data'
import { ServiceCard } from '@/components/cards/ServiceCard'
import { EmailSubscribe } from '@/components/widgets/EmailSubscribe'
import { ChevronRight, HelpCircle } from 'lucide-react'

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  return bettingCategories.map(c => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cat = bettingCategories.find(c => c.slug === params.slug)
  if (!cat) return {}
  return { title: cat.title, description: cat.metaDesc }
}

export default function BettingCategoryPage({ params }: Props) {
  const cat = bettingCategories.find(c => c.slug === params.slug)
  if (!cat) notFound()

  const filtered = services.filter(cat.filter)

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex items-center gap-1.5 text-sm text-slate-500 mb-6 flex-wrap">
        <Link href="/" className="hover:text-slate-300">Главная</Link>
        <ChevronRight size={13} />
        <Link href="/betting" className="hover:text-slate-300">Букмекеры</Link>
        <ChevronRight size={13} />
        <span className="text-slate-300">{cat.h1}</span>
      </div>

      <div className="relative overflow-hidden rounded-2xl p-8 mb-10 border"
        style={{ background: `linear-gradient(135deg, ${cat.color}12, ${cat.color}04)`, borderColor: `${cat.color}25` }}>
        <div className="absolute top-0 right-0 text-8xl opacity-10 select-none pointer-events-none pr-6 pt-4">
          {cat.icon}
        </div>
        <div className="relative">
          <div className="text-4xl mb-3">{cat.icon}</div>
          <h1 className="section-title text-3xl md:text-4xl text-white mb-3">{cat.h1}</h1>
          <p className="text-slate-400 text-lg max-w-2xl">{cat.description}</p>
          <div className="flex items-center gap-3 mt-4">
            <span className="px-3 py-1 rounded-full text-sm font-500 border"
              style={{ background: `${cat.color}15`, borderColor: `${cat.color}30`, color: cat.color }}>
              {filtered.length} букмекеров
            </span>
            <span className="text-slate-500 text-sm">Обновлено в {new Date().toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' })}</span>
          </div>
        </div>
      </div>

      <div className="glass rounded-2xl border border-purple-900/20 p-6 mb-10">
        <p className="text-slate-400 text-sm leading-relaxed whitespace-pre-line">{cat.seoText}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-12">
        {filtered.map((service, i) => (
          <ServiceCard key={service.slug} service={service} rank={i + 1} />
        ))}
      </div>

      {cat.faqs.length > 0 && (
        <div className="mb-12">
          <h2 className="section-title text-2xl text-white mb-6 flex items-center gap-2">
            <HelpCircle size={22} className="text-purple-400" /> Частые вопросы
          </h2>
          <div className="space-y-3">
            {cat.faqs.map((faq, i) => (
              <div key={i} className="glass rounded-xl border border-purple-900/20 p-5">
                <p className="text-white font-600 mb-2" style={{ fontFamily: 'Exo 2, sans-serif' }}>{faq.q}</p>
                <p className="text-slate-400 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mb-10">
        <h2 className="section-title text-xl text-white mb-4">Другие категории букмекеров</h2>
        <div className="flex flex-wrap gap-2">
          {bettingCategories.filter(c => c.slug !== params.slug).map(c => (
            <Link key={c.slug} href={`/betting/${c.slug}`}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm border border-purple-900/20 text-slate-400 hover:text-white hover:border-purple-700/40 transition-all">
              {c.icon} {c.h1}
            </Link>
          ))}
        </div>
      </div>

      <EmailSubscribe compact />
    </div>
  )
}
