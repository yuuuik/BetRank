import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { services, getBySlug } from '@/lib/data'
import { BrandLogo } from '@/components/ui/BrandLogo'
import { EmailSubscribe } from '@/components/widgets/EmailSubscribe'
import { ChevronRight, Check, X, Star, ExternalLink } from 'lucide-react'

interface Props { params: { slugs: string } }

// Генерируем страницы сравнения для топовых пар
export async function generateStaticParams() {
  const top = services.slice(0, 8)
  const pairs: { slugs: string }[] = []
  for (let i = 0; i < top.length; i++) {
    for (let j = i + 1; j < top.length; j++) {
      pairs.push({ slugs: `${top[i].slug}-vs-${top[j].slug}` })
    }
  }
  return pairs
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const [slugA, , slugB] = params.slugs.split('-vs-')
  const a = getBySlug(slugA), b = getBySlug(slugB)
  if (!a || !b) return {}
  return {
    title: `${a.name} vs ${b.name} — Сравнение 2026`,
    description: `Подробное сравнение ${a.name} и ${b.name}: бонусы, лицензии, выплаты, мобильные приложения. Что выбрать?`,
  }
}

export default function ComparePage({ params }: Props) {
  const parts = params.slugs.split('-vs-')
  if (parts.length !== 2) notFound()
  const [slugA, slugB] = parts
  const a = getBySlug(slugA), b = getBySlug(slugB)
  if (!a || !b) notFound()

  const rows: { label: string; aVal: string | boolean; bVal: string | boolean; type: 'text' | 'bool' | 'rating' }[] = [
    { label: 'Рейтинг BetRank', aVal: String(a.rating), bVal: String(b.rating), type: 'rating' },
    { label: 'Основной бонус', aVal: a.mainBonus, bVal: b.mainBonus, type: 'text' },
    { label: 'Мин. депозит', aVal: `${a.minDeposit} ₽`, bVal: `${b.minDeposit} ₽`, type: 'text' },
    { label: 'Лицензия', aVal: a.license.includes('ФНС') ? '🇷🇺 ФНС России' : '🌐 Зарубежная', bVal: b.license.includes('ФНС') ? '🇷🇺 ФНС России' : '🌐 Зарубежная', type: 'text' },
    { label: 'Год основания', aVal: String(a.founded), bVal: String(b.founded), type: 'text' },
    { label: 'Live-ставки', aVal: a.hasLiveBetting, bVal: b.hasLiveBetting, type: 'bool' },
    { label: 'Мобильное приложение', aVal: a.hasMobileApp, bVal: b.hasMobileApp, type: 'bool' },
    { label: 'Быстрый вывод', aVal: a.hasFastWithdrawal, bVal: b.hasFastWithdrawal, type: 'bool' },
    { label: 'Фриспины', aVal: a.hasFreeSpins, bVal: b.hasFreeSpins, type: 'bool' },
    { label: 'Кэшбек', aVal: a.hasCashback, bVal: b.hasCashback, type: 'bool' },
    { label: 'Бездепозитный бонус', aVal: a.hasRegistrationBonus, bVal: b.hasRegistrationBonus, type: 'bool' },
  ]

  const winner = a.rating > b.rating ? a : b.rating > a.rating ? b : null

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-center gap-1.5 text-sm text-slate-500 mb-6 flex-wrap">
        <Link href="/" className="hover:text-slate-300">Главная</Link>
        <ChevronRight size={13} />
        <Link href="/ratings" className="hover:text-slate-300">Рейтинг</Link>
        <ChevronRight size={13} />
        <span className="text-slate-300">{a.name} vs {b.name}</span>
      </div>

      <h1 className="section-title text-3xl md:text-4xl text-white mb-2 text-center">
        {a.name} <span className="text-slate-500">vs</span> {b.name}
      </h1>
      <p className="text-slate-400 text-center mb-10">Детальное сравнение двух сервисов по всем ключевым параметрам</p>

      {/* Шапка сравнения */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="glass rounded-2xl border border-purple-900/20 p-5 text-center col-start-1">
          <BrandLogo website={a.website} name={a.name} logo={a.logo} accentColor={a.accentColor} size="lg" />
          <p className="text-white font-700 text-lg mt-3" style={{ fontFamily: 'Exo 2, sans-serif' }}>{a.name}</p>
          {a.badge && <span className="badge badge-featured text-xs mt-1 inline-block">{a.badge}</span>}
          <div className="flex justify-center gap-1 mt-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={12} className={i < Math.floor(a.rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-700'} />
            ))}
          </div>
          <p className="text-amber-400 font-700 mt-1">{a.rating}</p>
          <a href={a.website} target="_blank" rel="noopener noreferrer nofollow"
            className="btn-neon text-xs py-2 px-4 mt-3 w-full justify-center">
            Играть <ExternalLink size={11} />
          </a>
        </div>

        <div className="flex items-center justify-center">
          <div className="text-center">
            <p className="text-4xl font-800 text-slate-600" style={{ fontFamily: 'Exo 2, sans-serif' }}>VS</p>
            {winner && (
              <p className="text-xs text-purple-400 mt-2">
                Победитель: <span className="text-white font-600">{winner.name}</span>
              </p>
            )}
          </div>
        </div>

        <div className="glass rounded-2xl border border-purple-900/20 p-5 text-center">
          <BrandLogo website={b.website} name={b.name} logo={b.logo} accentColor={b.accentColor} size="lg" />
          <p className="text-white font-700 text-lg mt-3" style={{ fontFamily: 'Exo 2, sans-serif' }}>{b.name}</p>
          {b.badge && <span className="badge badge-featured text-xs mt-1 inline-block">{b.badge}</span>}
          <div className="flex justify-center gap-1 mt-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={12} className={i < Math.floor(b.rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-700'} />
            ))}
          </div>
          <p className="text-amber-400 font-700 mt-1">{b.rating}</p>
          <a href={b.website} target="_blank" rel="noopener noreferrer nofollow"
            className="btn-neon text-xs py-2 px-4 mt-3 w-full justify-center">
            Играть <ExternalLink size={11} />
          </a>
        </div>
      </div>

      {/* Таблица сравнения */}
      <div className="glass rounded-2xl border border-purple-900/20 overflow-hidden mb-10">
        {rows.map((row, i) => (
          <div key={i} className={`grid grid-cols-3 border-b border-purple-900/10 last:border-0 ${i % 2 === 0 ? 'bg-white/1' : ''}`}>
            <div className="px-5 py-3.5 flex items-center">
              {row.type === 'bool' ? (
                <div className={`flex items-center justify-center ${row.aVal ? 'text-emerald-400' : 'text-red-400/60'}`}>
                  {row.aVal ? <Check size={16} /> : <X size={16} />}
                </div>
              ) : row.type === 'rating' ? (
                <span className="text-amber-400 font-700 text-lg" style={{ fontFamily: 'Exo 2, sans-serif' }}>{row.aVal}</span>
              ) : (
                <span className="text-slate-300 text-sm" style={{ color: row.aVal === row.bVal ? undefined : Number(String(row.aVal).replace(/[^\d]/g, '')) > Number(String(row.bVal).replace(/[^\d]/g, '')) ? a.accentColor : undefined }}>
                  {row.aVal as string}
                </span>
              )}
            </div>
            <div className="px-5 py-3.5 flex items-center justify-center border-x border-purple-900/10">
              <span className="text-slate-500 text-xs text-center">{row.label}</span>
            </div>
            <div className="px-5 py-3.5 flex items-center justify-end">
              {row.type === 'bool' ? (
                <div className={`flex items-center justify-center ${row.bVal ? 'text-emerald-400' : 'text-red-400/60'}`}>
                  {row.bVal ? <Check size={16} /> : <X size={16} />}
                </div>
              ) : row.type === 'rating' ? (
                <span className="text-amber-400 font-700 text-lg" style={{ fontFamily: 'Exo 2, sans-serif' }}>{row.bVal}</span>
              ) : (
                <span className="text-slate-300 text-sm text-right">{row.bVal as string}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Вывод */}
      {winner && (
        <div className="glass rounded-2xl border p-6 mb-10 text-center"
          style={{ borderColor: `${winner.accentColor}30`, background: `${winner.accentColor}08` }}>
          <p className="text-slate-400 text-sm mb-2">Наш выбор</p>
          <p className="text-white font-700 text-xl mb-1" style={{ fontFamily: 'Exo 2, sans-serif' }}>
            🏆 {winner.name}
          </p>
          <p className="text-slate-400 text-sm max-w-md mx-auto">{winner.tagline}</p>
          <Link href={`/review/${winner.slug}`} target="_blank" className="btn-neon text-sm mt-4 inline-flex">
            Читать полный обзор
          </Link>
        </div>
      )}

      {/* Другие сравнения */}
      <div>
        <h2 className="section-title text-xl text-white mb-4">Другие сравнения</h2>
        <div className="flex flex-wrap gap-2">
          {services.slice(0, 6).filter(s => s.slug !== slugA && s.slug !== slugB).map(s => (
            <Link key={s.slug} href={`/compare/${slugA}-vs-${s.slug}`}
              className="px-3 py-2 rounded-xl text-sm border border-purple-900/20 text-slate-400 hover:text-white hover:border-purple-700/40 transition-all">
              {a.name} vs {s.name}
            </Link>
          ))}
        </div>
      </div>

      <EmailSubscribe compact />
    </div>
  )
}
