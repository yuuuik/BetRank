import { Metadata } from 'next'
import Link from 'next/link'
import { games } from '@/lib/games'
import { GameLogo } from '@/components/ui/ProviderLogo'
import { Zap, Flame, Sparkles } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Популярные игры казино 2026 — Aviator, Gates of Olympus, Crazy Time',
  description: 'Все популярные игры казино: слоты, краш-игры, live казино. Где играть, RTP, стратегии.',
}

const typeLabel: Record<string, string> = { slot: 'Слот', crash: 'Краш', live: 'Live', card: 'Карты', instant: 'Мгновенная' }
const typeColor: Record<string, string> = { slot: '#a855f7', crash: '#ef4444', live: '#4ade80', card: '#f59e0b', instant: '#38bdf8' }

const volLabel: Record<string, string> = { low: 'Низкая', medium: 'Средняя', high: 'Высокая', 'very-high': 'Очень высокая' }
const volColor: Record<string, string> = { low: '#4ade80', medium: '#f59e0b', high: '#f97316', 'very-high': '#ef4444' }

const TOP_RU_SLUGS = [
  'aviator',
  'lucky-jet',
  'gates-of-olympus',
  'sweet-bonanza',
  'mines',
  'crazy-time',
  'plinko',
  'book-of-ra',
  'the-dog-house',
  'lightning-roulette',
]

export default function GamesPage() {
  const popular = TOP_RU_SLUGS.map(slug => games.find(g => g.slug === slug)).filter(Boolean) as typeof games
  const newGames = games.filter(g => g.isNew)
  const byType = {
    crash: games.filter(g => g.type === 'crash' || g.type === 'instant'),
    slot: games.filter(g => g.type === 'slot'),
    live: games.filter(g => g.type === 'live'),
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link href="/" className="hover:text-slate-300">Главная</Link>
        <span>/</span>
        <span className="text-slate-300">Игры</span>
      </div>

      <h1 className="section-title text-3xl md:text-4xl text-white mb-3">Популярные игры казино</h1>
      <p className="text-slate-400 text-lg mb-10">
        Слоты, краш-игры, live казино — обзоры и где играть
      </p>

      {/* Популярные */}
      <div className="flex items-center gap-2 mb-5">
        <Flame size={18} className="text-orange-400" />
        <h2 className="section-title text-2xl text-white">Топ игры</h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-12">
        {popular.map(game => <GameCard key={game.slug} game={game} />)}
      </div>

      {/* Новинки */}
      {newGames.length > 0 && (
        <>
          <div className="flex items-center gap-2 mb-5">
            <Sparkles size={18} className="text-purple-400" />
            <h2 className="section-title text-2xl text-white">Новинки</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-12">
            {newGames.map(game => <GameCard key={game.slug} game={game} />)}
          </div>
        </>
      )}

      {/* Краш-игры */}
      <div className="flex items-center gap-2 mb-5">
        <Zap size={18} className="text-red-400" />
        <h2 className="section-title text-2xl text-white">Краш-игры и мгновенные</h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-12">
        {byType.crash.map(game => <GameCard key={game.slug} game={game} />)}
      </div>

      {/* Слоты */}
      <div className="flex items-center gap-2 mb-5">
        <span className="text-lg">🎰</span>
        <h2 className="section-title text-2xl text-white">Слоты</h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-12">
        {byType.slot.map(game => <GameCard key={game.slug} game={game} />)}
      </div>

      {/* Live */}
      <div className="flex items-center gap-2 mb-5">
        <span className="text-lg">📡</span>
        <h2 className="section-title text-2xl text-white">Live казино</h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-12">
        {byType.live.map(game => <GameCard key={game.slug} game={game} />)}
      </div>

      {/* Ссылка на провайдеров */}
      <div className="glass rounded-2xl border border-purple-900/20 p-6 text-center">
        <p className="text-slate-400 mb-3">Ищете игры конкретного провайдера?</p>
        <Link href="/providers" className="btn-neon text-sm inline-flex">
          Смотреть всех провайдеров →
        </Link>
      </div>
    </div>
  )
}

function GameCard({ game }: { game: typeof games[0] }) {
  const color = typeColor[game.type] || '#a855f7'
  return (
    <Link href={`/games/${game.slug}`}
      className="service-card p-4 text-center hover:scale-105 transition-transform group relative">
      {game.isNew && (
        <span className="absolute top-1.5 right-1.5 text-xs px-1.5 py-0.5 rounded bg-emerald-900/50 text-emerald-300 border border-emerald-700/30 leading-none">
          NEW
        </span>
      )}
      <div className="flex justify-center mb-2">
        <GameLogo slug={game.slug} providerSlug={game.providerSlug} name={game.name} fallbackIcon={game.icon} color={game.color} size="md" />
      </div>
      <p className="text-white text-xs font-600 group-hover:text-purple-300 transition-colors truncate"
        style={{ fontFamily: 'Exo 2, sans-serif' }}>{game.name}</p>
      <p className="text-slate-500 text-xs mt-0.5 truncate">{game.provider}</p>
      <div className="flex items-center justify-center gap-1 mt-2">
        <span className="text-xs px-1.5 py-0.5 rounded"
          style={{ background: `${color}15`, color, border: `1px solid ${color}25` }}>
          {game.rtp}
        </span>
      </div>
    </Link>
  )
}
