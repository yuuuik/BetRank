import { Metadata } from 'next'
import Link from 'next/link'
import { games } from '@/lib/games'
import { Zap, Flame, Sparkles } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Популярные игры казино 2026 — Aviator, Gates of Olympus, Crazy Time',
  description: 'Все популярные игры казино: слоты, краш-игры, live казино. Где играть, RTP, стратегии.',
}

const typeColor: Record<string, string> = {
  slot: '#a855f7', crash: '#ef4444', live: '#4ade80', card: '#f59e0b', instant: '#38bdf8',
}

const TOP_RU_SLUGS = [
  'aviator', 'lucky-jet', 'gates-of-olympus', 'sweet-bonanza',
  'mines', 'crazy-time', 'plinko', 'book-of-ra', 'the-dog-house', 'lightning-roulette',
]

const INITIAL = 6

function dedup<T extends { slug: string }>(arr: T[]): T[] {
  const seen = new Set<string>()
  return arr.filter(g => seen.has(g.slug) ? false : (seen.add(g.slug), true))
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
        <div style={{
          width: 56, height: 56, minWidth: 56, borderRadius: '14px', flexShrink: 0,
          background: `linear-gradient(145deg, ${game.color}40, ${game.color}18)`,
          border: `2px solid ${game.color}55`,
          boxShadow: `0 3px 14px ${game.color}30`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ fontSize: 27, lineHeight: 1 }}>{game.icon}</span>
        </div>
      </div>
      <p className="text-white text-xs font-600 group-hover:text-purple-300 transition-colors truncate">{game.name}</p>
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

function GameSection({ items, initial = INITIAL }: { items: typeof games; initial?: number }) {
  const unique = dedup(items)
  const first = unique.slice(0, initial)
  const rest  = unique.slice(initial)
  return (
    <div className="mb-12">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {first.map(g => <GameCard key={g.slug} game={g} />)}
      </div>
      {rest.length > 0 && (
        <details className="mt-0">
          <summary className="flex justify-center mt-4 mb-4 cursor-pointer list-none">
            <span className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-purple-300 border border-purple-700/40 hover:border-purple-500/60 hover:text-purple-200 hover:bg-purple-900/20 transition-all select-none">
              Показать ещё {rest.length} ↓
            </span>
          </summary>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {rest.map(g => <GameCard key={g.slug} game={g} />)}
          </div>
        </details>
      )}
    </div>
  )
}

export default function GamesPage() {
  const popular  = dedup(TOP_RU_SLUGS.map(slug => games.find(g => g.slug === slug)).filter(Boolean) as typeof games)
  const newGames = dedup(games.filter(g => g.isNew))
  const excluded = new Set([...TOP_RU_SLUGS, ...newGames.map(g => g.slug)])
  const byType = {
    crash: games.filter(g => (g.type === 'crash' || g.type === 'instant') && !excluded.has(g.slug)),
    slot:  games.filter(g => g.type === 'slot' && !excluded.has(g.slug)),
    live:  games.filter(g => g.type === 'live' && !excluded.has(g.slug)),
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link href="/" className="hover:text-slate-300">Главная</Link>
        <span>/</span>
        <span className="text-slate-300">Игры</span>
      </div>

      <h1 className="section-title text-3xl md:text-4xl text-white mb-3">Популярные игры казино</h1>
      <p className="text-slate-400 text-lg mb-10">Слоты, краш-игры, live казино — обзоры и где играть</p>

      <div className="flex items-center gap-2 mb-5">
        <Flame size={18} className="text-orange-400" />
        <h2 className="section-title text-2xl text-white">Топ игры</h2>
      </div>
      <GameSection items={popular} initial={10} />

      {newGames.length > 0 && (
        <>
          <div className="flex items-center gap-2 mb-5">
            <Sparkles size={18} className="text-purple-400" />
            <h2 className="section-title text-2xl text-white">Новинки</h2>
          </div>
          <GameSection items={newGames} />
        </>
      )}

      <div className="flex items-center gap-2 mb-5">
        <Zap size={18} className="text-red-400" />
        <h2 className="section-title text-2xl text-white">Краш-игры и мгновенные</h2>
      </div>
      <GameSection items={byType.crash} />

      <div className="flex items-center gap-2 mb-5">
        <span className="text-lg">🎰</span>
        <h2 className="section-title text-2xl text-white">Слоты</h2>
      </div>
      <GameSection items={byType.slot} />

      <div className="flex items-center gap-2 mb-5">
        <span className="text-lg">📡</span>
        <h2 className="section-title text-2xl text-white">Live казино</h2>
      </div>
      <GameSection items={byType.live} />

      <div className="glass rounded-2xl border border-purple-900/20 p-6 text-center">
        <p className="text-slate-400 mb-3">Ищете игры конкретного провайдера?</p>
        <Link href="/providers" className="btn-neon text-sm inline-flex">
          Смотреть всех провайдеров →
        </Link>
      </div>
    </div>
  )
}
