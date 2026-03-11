import { Metadata } from 'next'
import Link from 'next/link'
import { providers } from '@/lib/providers'
import { games } from '@/lib/games'
import { ProviderLogo } from '@/components/ui/ProviderLogo'

export const metadata: Metadata = {
  title: 'Провайдеры игр казино 2026 — Pragmatic Play, Evolution, Spribe',
  description: 'Все провайдеры казино-игр: Pragmatic Play, Evolution Gaming, Spribe, NetEnt. Игры провайдеров и казино где играть.',
}

export default function ProvidersPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link href="/" className="hover:text-slate-300">Главная</Link>
        <span>/</span>
        <span className="text-slate-300">Провайдеры</span>
      </div>

      <h1 className="section-title text-3xl md:text-4xl text-white mb-3">Провайдеры игр</h1>
      <p className="text-slate-400 text-lg mb-10">
        {providers.length} провайдеров · {games.length}+ игр в каталоге
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {providers.map(provider => {
          const provGames = games.filter(g => g.providerSlug === provider.slug)
          return (
            <Link key={provider.slug} href={`/providers/${provider.slug}`}
              className="service-card p-5 hover:scale-[1.02] transition-transform group">
              {/* Лого */}
              <div className="flex items-center gap-3 mb-4">
                <ProviderLogo
                  slug={provider.slug}
                  name={provider.name}
                  fallbackIcon={provider.logo}
                  color={provider.color}
                  size="md"
                />
                <div>
                  <h2 className="text-white font-700 text-base group-hover:text-purple-300 transition-colors"
                    style={{ fontFamily: 'Exo 2, sans-serif' }}>
                    {provider.name}
                  </h2>
                  <p className="text-slate-500 text-xs mt-0.5">{provider.country} · {provider.founded}</p>
                </div>
              </div>

              <p className="text-slate-400 text-sm leading-snug mb-4 line-clamp-2">{provider.description}</p>

              {/* Теги */}
              <div className="flex flex-wrap gap-1 mb-4">
                {provider.tags.slice(0, 2).map(tag => (
                  <span key={tag} className="text-xs px-2 py-0.5 rounded bg-slate-800/60 text-slate-400 border border-slate-700/30">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Игры превью */}
              {provGames.length > 0 && (
                <div className="flex items-center gap-1.5 mt-2 pt-3 border-t border-purple-900/15">
                  {provGames.slice(0, 4).map(g => (
                    <span key={g.slug} title={g.name} className="text-xl">{g.icon}</span>
                  ))}
                  {provGames.length > 4 && (
                    <span className="text-xs text-slate-500 ml-1">+{provGames.length - 4}</span>
                  )}
                </div>
              )}

              <div className="flex items-center justify-between mt-3">
                <span className="text-xs text-slate-600">{provider.gameCount}+ игр</span>
                <span className="text-purple-400 text-xs group-hover:text-purple-300">Смотреть →</span>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
