import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { games, getGameBySlug } from '@/lib/games'
import { services } from '@/lib/data'
import { BrandLogo } from '@/components/ui/BrandLogo'
import { GameLogo, ProviderLogo } from '@/components/ui/ProviderLogo'
import { EmailSubscribe } from '@/components/widgets/EmailSubscribe'
import { ChevronRight, HelpCircle, ExternalLink, Star, Zap, TrendingUp } from 'lucide-react'
import { providers } from '@/lib/providers'

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  return games.map(g => ({ slug: g.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const game = getGameBySlug(params.slug)
  if (!game) return {}
  return { title: `${game.name} — играть онлайн 2026`, description: game.metaDesc }
}

const typeLabel: Record<string, string> = { slot: 'Слот', crash: 'Краш-игра', live: 'Live казино', card: 'Карточная', instant: 'Мгновенная' }
const volLabel: Record<string, string> = { low: 'Низкая', medium: 'Средняя', high: 'Высокая', 'very-high': 'Очень высокая' }
const volColor: Record<string, string> = { low: '#4ade80', medium: '#f59e0b', high: '#f97316', 'very-high': '#ef4444' }

export default function GamePage({ params }: Props) {
  const game = getGameBySlug(params.slug)
  if (!game) notFound()

  // Казино где доступна эта игра
  const casinosForGame = services.filter(s => game.casinoSlugs.includes(s.slug))

  // Другие игры того же провайдера
  const sameProvider = games.filter(g => g.providerSlug === game.providerSlug && g.slug !== game.slug)
  const otherGames = games.filter(g => g.slug !== game.slug && g.providerSlug !== game.providerSlug).slice(0, 6)

  const provider = providers.find(p => p.slug === game.providerSlug)

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-sm text-slate-500 mb-6 flex-wrap">
        <Link href="/" className="hover:text-slate-300">Главная</Link>
        <ChevronRight size={13} />
        <Link href="/games" className="hover:text-slate-300">Игры</Link>
        <ChevronRight size={13} />
        <span className="text-slate-300">{game.name}</span>
      </div>

      {/* Hero игры */}
      <div className="relative overflow-hidden rounded-2xl p-6 md:p-8 mb-10 border"
        style={{ background: `linear-gradient(135deg, ${game.color}15, ${game.color}05)`, borderColor: `${game.color}30` }}>
        <div className="absolute top-0 right-0 text-9xl opacity-10 select-none pointer-events-none pr-6 pt-2">
          {game.icon}
        </div>
        <div className="relative flex flex-col md:flex-row items-start gap-6">
          {/* Иконка */}
          <GameLogo
            slug={game.slug}
            providerSlug={game.providerSlug}
            name={game.name}
            fallbackIcon={game.icon}
            color={game.color}
            size="lg"
          />

          {/* Название */}
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <h1 className="section-title text-3xl md:text-4xl text-white">{game.name}</h1>
              {game.isNew && (
                <span className="badge bg-emerald-900/50 text-emerald-300 border border-emerald-700/30">🆕 Новинка</span>
              )}
              <span className="badge text-xs px-2.5 py-1"
                style={{ background: `${game.color}20`, color: game.color, border: `1px solid ${game.color}30` }}>
                {typeLabel[game.type]}
              </span>
            </div>
            <div className="flex items-center gap-2 mb-3">
              {provider ? (
                <Link href={`/providers/${provider.slug}`}
                  className="text-sm text-slate-400 hover:text-purple-300 transition-colors">
                  {provider.name}
                </Link>
              ) : (
                <span className="text-sm text-slate-400">{game.provider}</span>
              )}
            </div>
            <p className="text-slate-400 text-lg mb-4 max-w-2xl">{game.description}</p>

            {/* Характеристики */}
            <div className="flex flex-wrap gap-2">
              {game.features.map(f => (
                <span key={f} className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg"
                  style={{ background: `${game.color}15`, border: `1px solid ${game.color}25`, color: game.color }}>
                  <Zap size={10} /> {f}
                </span>
              ))}
            </div>
          </div>

          {/* Статы */}
          <div className="glass rounded-xl p-4 border border-purple-900/20 shrink-0 grid grid-cols-2 gap-3 min-w-48">
            <div className="text-center">
              <p className="text-slate-500 text-xs mb-1">RTP</p>
              <p className="text-white font-800 text-xl" style={{ fontFamily: 'Exo 2, sans-serif' }}>{game.rtp}</p>
            </div>
            <div className="text-center">
              <p className="text-slate-500 text-xs mb-1">Макс. выигрыш</p>
              <p className="font-700 text-base" style={{ color: game.color, fontFamily: 'Exo 2, sans-serif' }}>{game.maxWin}</p>
            </div>
            <div className="text-center">
              <p className="text-slate-500 text-xs mb-1">Волатильность</p>
              <p className="text-xs font-600" style={{ color: volColor[game.volatility] }}>{volLabel[game.volatility]}</p>
            </div>
            <div className="text-center">
              <p className="text-slate-500 text-xs mb-1">Мин. ставка</p>
              <p className="text-slate-300 text-sm font-600">{game.minBet}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Основной контент */}
        <div className="lg:col-span-2 space-y-8">
          {/* Описание */}
          <div className="glass rounded-2xl border border-purple-900/20 p-6">
            <h2 className="section-title text-xl text-white mb-4">Об игре {game.name}</h2>
            <p className="text-slate-400 text-sm leading-relaxed whitespace-pre-line">{game.longDesc}</p>
          </div>

          {/* Казино где доступна */}
          <div>
            <h2 className="section-title text-2xl text-white mb-5">
              Где играть в {game.name}
            </h2>
            {casinosForGame.length > 0 ? (
              <div className="space-y-3">
                {casinosForGame.map((casino, i) => (
                  <div key={casino.slug} className="service-card p-4 flex items-center gap-4">
                    <span className="text-slate-600 font-700 text-sm w-6 text-center shrink-0">{i + 1}</span>
                    <BrandLogo website={casino.website} name={casino.name}
                      logo={casino.logo} accentColor={casino.accentColor} size="md" />
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-700 text-sm" style={{ fontFamily: 'Exo 2, sans-serif' }}>{casino.name}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        {Array.from({ length: 5 }).map((_, j) => (
                          <Star key={j} size={10} className={j < Math.floor(casino.rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-700'} />
                        ))}
                        <span className="text-amber-400 text-xs font-600">{casino.rating}</span>
                      </div>
                    </div>
                    <div className="hidden sm:block shrink-0 text-right">
                      <p className="text-xs text-slate-500 mb-0.5">Бонус</p>
                      <p className="text-sm font-600" style={{ color: casino.accentColor }}>{casino.mainBonus}</p>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <Link href={`/review/${casino.slug}`} target="_blank"
                        className="text-xs py-2 px-3 rounded-xl border border-slate-700/40 text-slate-400 hover:text-white hover:border-purple-700/40 transition-all hidden sm:block">
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
              <div className="glass rounded-2xl border border-purple-900/20 p-8 text-center">
                <p className="text-slate-500 mb-3">Казино с этой игрой скоро появятся</p>
                <Link href="/casino" className="text-purple-400 hover:text-purple-300 text-sm transition-colors">
                  Смотреть все казино →
                </Link>
              </div>
            )}
          </div>

          {/* FAQ */}
          {game.faqs.length > 0 && (
            <div>
              <h2 className="section-title text-2xl text-white mb-5 flex items-center gap-2">
                <HelpCircle size={20} className="text-purple-400" /> Частые вопросы
              </h2>
              <div className="space-y-3">
                {game.faqs.map((faq, i) => (
                  <div key={i} className="glass rounded-xl border border-purple-900/20 p-5">
                    <p className="text-white font-600 mb-2" style={{ fontFamily: 'Exo 2, sans-serif' }}>{faq.q}</p>
                    <p className="text-slate-400 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Сайдбар */}
        <div className="space-y-6">
          {/* Провайдер */}
          {provider && (
            <div className="glass rounded-2xl border border-purple-900/20 p-5">
              <p className="text-slate-500 text-xs mb-3">Провайдер</p>
              <Link href={`/providers/${provider.slug}`}
                className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <ProviderLogo slug={provider.slug} name={provider.name} fallbackIcon={provider.logo} color={provider.color} size="md" />
                <div>
                  <p className="text-white font-700 text-sm">{provider.name}</p>
                  <p className="text-slate-500 text-xs mt-0.5">{provider.gameCount}+ игр</p>
                </div>
              </Link>
              <div className="mt-3 flex flex-wrap gap-1">
                {provider.tags.map(tag => (
                  <span key={tag} className="text-xs px-2 py-0.5 rounded bg-slate-800/60 text-slate-400 border border-slate-700/30">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Другие игры провайдера */}
          {sameProvider.length > 0 && (
            <div className="glass rounded-2xl border border-purple-900/20 overflow-hidden">
              <div className="px-4 py-3 border-b border-purple-900/20">
                <p className="text-white font-600 text-sm" style={{ fontFamily: 'Exo 2, sans-serif' }}>
                  Другие игры {game.provider}
                </p>
              </div>
              <div className="divide-y divide-purple-900/10">
                {sameProvider.slice(0, 4).map(g => (
                  <Link key={g.slug} href={`/games/${g.slug}`}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-white/2 transition-colors group">
                    <GameLogo slug={g.slug} providerSlug={g.providerSlug} name={g.name} fallbackIcon={g.icon} color={g.color} size="sm" />
                    <div className="flex-1 min-w-0">
                      <p className="text-slate-300 text-sm group-hover:text-white transition-colors truncate">{g.name}</p>
                      <p className="text-slate-600 text-xs">RTP {g.rtp}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Другие популярные игры */}
          <div className="glass rounded-2xl border border-purple-900/20 overflow-hidden">
            <div className="px-4 py-3 border-b border-purple-900/20 flex justify-between items-center">
              <p className="text-white font-600 text-sm" style={{ fontFamily: 'Exo 2, sans-serif' }}>
                Популярные игры
              </p>
              <Link href="/games" className="text-purple-400 text-xs hover:text-purple-300">Все →</Link>
            </div>
            <div className="divide-y divide-purple-900/10">
              {otherGames.slice(0, 5).map(g => (
                <Link key={g.slug} href={`/games/${g.slug}`}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-white/2 transition-colors group">
                  <GameLogo slug={g.slug} providerSlug={g.providerSlug} name={g.name} fallbackIcon={g.icon} color={g.color} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="text-slate-300 text-sm group-hover:text-white transition-colors truncate">{g.name}</p>
                    <p className="text-slate-600 text-xs">{g.provider} · {g.rtp}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <EmailSubscribe compact />
      </div>
    </div>
  )
}
