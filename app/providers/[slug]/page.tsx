import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { providers, getProviderBySlug } from '@/lib/providers'
import { games } from '@/lib/games'
import { services } from '@/lib/data'
import { BrandLogo } from '@/components/ui/BrandLogo'
import { ProviderLogo, GameLogo } from '@/components/ui/ProviderLogo'
import { ChevronRight, ExternalLink, Zap, Star } from 'lucide-react'

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  return providers.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const provider = getProviderBySlug(params.slug)
  if (!provider) return {}
  return {
    title: `${provider.name} — Игры и казино 2026`,
    description: provider.metaDesc,
  }
}

export default function ProviderPage({ params }: Props) {
  const provider = getProviderBySlug(params.slug)
  if (!provider) notFound()

  const providerGames = games.filter(g => g.providerSlug === params.slug)

  // Казино где есть игры этого провайдера (объединяем все casinoSlugs)
  const allCasinoSlugs = [...new Set(providerGames.flatMap(g => g.casinoSlugs))]
  const providerCasinos = services.filter(s => allCasinoSlugs.includes(s.slug))
    .sort((a, b) => b.rating - a.rating)

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-sm text-slate-500 mb-6 flex-wrap">
        <Link href="/" className="hover:text-slate-300">Главная</Link>
        <ChevronRight size={13} />
        <Link href="/providers" className="hover:text-slate-300">Провайдеры</Link>
        <ChevronRight size={13} />
        <span className="text-slate-300">{provider.name}</span>
      </div>

      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl p-8 mb-10 border"
        style={{ background: `linear-gradient(135deg, ${provider.color}12, ${provider.color}04)`, borderColor: `${provider.color}25` }}>
        <div className="flex flex-col md:flex-row items-start gap-6">
          <ProviderLogo
            slug={provider.slug}
            name={provider.name}
            fallbackIcon={provider.logo}
            color={provider.color}
            size="lg"
          />
          <div className="flex-1">
            <h1 className="section-title text-3xl md:text-4xl text-white mb-2">{provider.name}</h1>
            <div className="flex flex-wrap items-center gap-3 mb-3 text-sm text-slate-400">
              <span>📍 {provider.country}</span>
              <span>📅 Основан в {provider.founded}</span>
              <span>🎮 {provider.gameCount}+ игр</span>
            </div>
            <p className="text-slate-400 text-lg max-w-2xl">{provider.description}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {provider.tags.map(tag => (
                <span key={tag} className="text-xs px-2.5 py-1 rounded-lg"
                  style={{ background: `${provider.color}15`, border: `1px solid ${provider.color}25`, color: provider.color }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Игры провайдера */}
        <div className="lg:col-span-2">
          <h2 className="section-title text-2xl text-white mb-5">
            Игры {provider.name} ({providerGames.length})
          </h2>

          {providerGames.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {providerGames.map(game => (
                <Link key={game.slug} href={`/games/${game.slug}`}
                  className="service-card p-4 flex items-center gap-4 hover:border-purple-700/40 transition-all group">
                  <GameLogo slug={game.slug} providerSlug={game.providerSlug} name={game.name} fallbackIcon={game.icon} color={game.color} size="md" />
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-700 text-sm group-hover:text-purple-300 transition-colors"
                      style={{ fontFamily: 'Exo 2, sans-serif' }}>
                      {game.name}
                      {game.isNew && <span className="ml-1.5 text-xs text-emerald-400">NEW</span>}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      <span className="text-xs text-slate-500">RTP {game.rtp}</span>
                      <span className="text-xs text-slate-600">·</span>
                      <span className="text-xs text-slate-500">Макс. {game.maxWin}</span>
                    </div>
                    <div className="flex gap-1 mt-1.5">
                      {game.features.slice(0, 2).map(f => (
                        <span key={f} className="text-xs px-1.5 py-0.5 rounded"
                          style={{ background: `${game.color}10`, color: game.color, border: `1px solid ${game.color}20` }}>
                          {f.split(' ')[0]}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-slate-600 group-hover:text-purple-400 transition-colors shrink-0">
                    <ChevronRight size={16} />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="glass rounded-2xl border border-purple-900/20 p-8 text-center text-slate-500 mb-10">
              Игры этого провайдера скоро появятся в каталоге
            </div>
          )}

          {/* Казино с играми провайдера */}
          <h2 className="section-title text-2xl text-white mb-5">
            Казино с играми {provider.name}
          </h2>
          {providerCasinos.length > 0 ? (
            <div className="space-y-3">
              {providerCasinos.map((casino, i) => (
                <div key={casino.slug} className="service-card p-4 flex items-center gap-4">
                  <span className="text-slate-600 font-700 text-sm w-6 text-center shrink-0">{i + 1}</span>
                  <BrandLogo website={casino.website} name={casino.name}
                    logo={casino.logo} accentColor={casino.accentColor} size="md" />
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-700 text-sm" style={{ fontFamily: 'Exo 2, sans-serif' }}>{casino.name}</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star key={j} size={10} className={j < Math.floor(casino.rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-700'} />
                      ))}
                      <span className="text-amber-400 text-xs">{casino.rating}</span>
                    </div>
                  </div>
                  <div className="hidden sm:block text-right shrink-0">
                    <p className="text-xs text-slate-500 mb-0.5">Бонус</p>
                    <p className="text-sm font-600" style={{ color: casino.accentColor }}>{casino.mainBonus}</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Link href={`/review/${casino.slug}`} target="_blank"
                      className="hidden sm:block text-xs py-2 px-3 rounded-xl border border-slate-700/40 text-slate-400 hover:text-white hover:border-purple-700/40 transition-all">
                      Обзор
                    </Link>
                    <a href={casino.website} target="_blank" rel="noopener noreferrer nofollow"
                      className="btn-neon text-xs py-2 px-3">
                      Играть <ExternalLink size={11} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="glass rounded-2xl border border-purple-900/20 p-8 text-center text-slate-500">
              Казино скоро появятся
            </div>
          )}
        </div>

        {/* Сайдбар — другие провайдеры */}
        <div>
          <div className="glass rounded-2xl border border-purple-900/20 overflow-hidden">
            <div className="px-5 py-4 border-b border-purple-900/20">
              <p className="text-white font-600 text-sm" style={{ fontFamily: 'Exo 2, sans-serif' }}>
                Другие провайдеры
              </p>
            </div>
            <div className="divide-y divide-purple-900/10">
              {providers.filter(p => p.slug !== params.slug).map(p => (
                <Link key={p.slug} href={`/providers/${p.slug}`}
                  className="flex items-center gap-3 px-5 py-3 hover:bg-white/2 transition-colors group">
                  <ProviderLogo slug={p.slug} name={p.name} fallbackIcon={p.logo} color={p.color} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="text-slate-300 text-sm group-hover:text-white transition-colors truncate">{p.name}</p>
                    <p className="text-slate-600 text-xs">{p.gameCount}+ игр</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
