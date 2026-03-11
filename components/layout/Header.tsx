'use client'
import { useState, useRef, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Search, Star, ChevronDown } from 'lucide-react'
import { services } from '@/lib/data'
import { providers } from '@/lib/providers'
import { BrandLogo } from '@/components/ui/BrandLogo'
import { ProviderLogo } from '@/components/ui/ProviderLogo'

const navLinks = [
  {
    label: 'Казино',
    href: '/casino',
    children: [
      { href: '/casino',                  label: '🎰 Все казино' },
      { href: '/casino/bez-verifikacii',  label: '🎭 Без верификации' },
      { href: '/casino/s-frispinami',     label: '🎰 С фриспинами' },
      { href: '/casino/s-bystrim-vivodom',label: '⚡ Быстрый вывод' },
      { href: '/casino/bez-depozita',     label: '🎁 Без депозита' },
      { href: '/casino/s-licenziei',      label: '🛡️ С лицензией ФНС' },
      { href: '/casino/s-kriptovaliutoi', label: '₿ С криптовалютой' },
    ],
  },
  {
    label: 'Букмекеры',
    href: '/betting',
    children: [
      { href: '/betting',                        label: '⚽ Все букмекеры' },
      { href: '/betting/s-fribet',               label: '🎯 С фрибетом' },
      { href: '/betting/s-laiv-stavkami',        label: '🔴 Live-ставки' },
      { href: '/betting/legalnye',               label: '🇷🇺 Легальные' },
      { href: '/betting/s-mobilnim-prilozheniem',label: '📱 С приложением' },
    ],
  },
  {
    label: 'Бонусы',
    href: '/bonuses',
    children: [
      { href: '/bonuses',            label: '🎁 Все бонусы' },
      { href: '/bonuses/fribet',     label: '🎯 Фрибеты' },
      { href: '/bonuses/frispiny',   label: '🎰 Фриспины' },
      { href: '/bonuses/na-depozit', label: '💰 На депозит' },
      { href: '/bonuses/keshbek',    label: '♻️ Кэшбек' },
      { href: '/bonuses/bez-depozita',label: '🎁 Без депозита' },
      { href: '/promo',              label: '🔥 Промокоды' },
    ],
  },
  { href: '/ratings', label: 'Рейтинг' },
  {
    label: 'Игры',
    href: '/games',
    children: [
      { href: '/games',                    label: '🎮 Все игры' },
      { href: '/games/aviator',            label: '✈️ Aviator' },
      { href: '/games/lucky-jet',          label: '🚀 Lucky Jet' },
      { href: '/games/gates-of-olympus',   label: '⚡ Gates of Olympus' },
      { href: '/games/sweet-bonanza',      label: '🍭 Sweet Bonanza' },
      { href: '/games/dog-house',          label: '🐶 The Dog House' },
      { href: '/games/crazy-time',         label: '🎡 Crazy Time' },
    ],
  },
  {
    label: 'Провайдеры',
    href: '/providers',
    children: [{ href: '/providers', label: 'placeholder' }],
  },
  {
    label: 'Полезное',
    children: [
      { href: '/reviews', label: '⭐ Обзоры' },
      { href: '/news',    label: '📰 Новости' },
      { href: '/compare', label: '⚖️ Сравнение' },
      { href: '/faq',    label: '❓ FAQ' },
    ],
  },
]

type NavLink = typeof navLinks[0]

export function Header() {
  const [open, setOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const searchRef = useRef<HTMLDivElement>(null)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)

  const searchResults = useMemo(() => {
    if (!searchValue || searchValue.length < 2) return []
    const q = searchValue.toLowerCase()
    return services.filter(s =>
      s.name.toLowerCase().includes(q) ||
      s.tagline?.toLowerCase().includes(q) ||
      s.slug.toLowerCase().includes(q)
    )
  }, [searchValue])

  // Закрываем поиск по клику вне
  useEffect(() => {
    if (!searchOpen) return
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false)
        setSearchValue('')
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [searchOpen])

  const handleMouseEnter = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setActiveDropdown(label)
  }
  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setActiveDropdown(null), 200)
  }

  return (
    <header className="glass sticky top-0 z-50 border-b border-purple-900/20">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center">
            <Star size={16} className="text-white fill-white" />
          </div>
          <span className="font-display font-800 text-xl tracking-tight" style={{ fontFamily: 'Exo 2, sans-serif', fontWeight: 800 }}>
            <span className="gradient-text">Bet</span><span className="text-white">Rank</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-0.5">
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.label} className="relative"
                onMouseEnter={() => handleMouseEnter(link.label)}
                onMouseLeave={handleMouseLeave}>
                <Link href={link.href || '#'}
                  className={`flex items-center gap-1 px-3 py-2 text-sm rounded-lg transition-all ${
                    activeDropdown === link.label
                      ? 'text-white bg-white/5'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}>
                  {link.label}
                  <ChevronDown size={13} className={`transition-transform duration-200 ${activeDropdown === link.label ? 'rotate-180' : ''}`} />
                </Link>
                {activeDropdown === link.label && (
                  <div className={`absolute top-full left-0 pt-2 z-50 ${link.label === 'Провайдеры' ? 'w-72' : 'w-52'}`}
                    onMouseEnter={() => handleMouseEnter(link.label)}
                    onMouseLeave={handleMouseLeave}>
                    <div className="glass rounded-xl border border-purple-900/30 overflow-hidden shadow-2xl shadow-black/40">
                      {link.label === 'Провайдеры' ? (
                        /* Кастомный дропдаун провайдеров с логотипами */
                        <>
                          <Link href="/providers" onClick={() => setActiveDropdown(null)}
                            className="flex items-center gap-2 px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-purple-900/20 transition-all border-b border-purple-900/20">
                            <span className="text-base">🏭</span> Все провайдеры
                          </Link>
                          {providers.map(p => (
                            <Link key={p.slug} href={`/providers/${p.slug}`}
                              onClick={() => setActiveDropdown(null)}
                              className="flex items-center gap-3 px-4 py-2.5 hover:bg-purple-900/20 transition-all group">
                              <ProviderLogo slug={p.slug} name={p.name} fallbackIcon={p.logo} color={p.color} size="xs" />
                              <div className="flex-1 min-w-0">
                                <p className="text-slate-300 text-sm group-hover:text-white transition-colors truncate">
                                  {p.name}
                                </p>
                                <p className="text-slate-600 text-xs">{p.gameCount}+ игр</p>
                              </div>
                            </Link>
                          ))}
                        </>
                      ) : (
                        link.children.map((child) => (
                          <Link key={child.href} href={child.href}
                            onClick={() => setActiveDropdown(null)}
                            className="block px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-purple-900/20 transition-all">
                            {child.label}
                          </Link>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link key={link.href} href={link.href!}
                className="px-3 py-2 text-sm text-slate-300 hover:text-white rounded-lg hover:bg-white/5 transition-all">
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2 shrink-0">

          {/* Поиск с BrandLogo */}
          <div className="relative hidden sm:block" ref={searchRef}>
            {searchOpen ? (
              <div className="flex items-center gap-2">
                <div className="relative">
                  <input
                    autoFocus
                    type="text"
                    placeholder="Казино, букмекер..."
                    value={searchValue}
                    onChange={e => setSearchValue(e.target.value)}
                    className="neon-input text-sm w-52"
                    onKeyDown={e => {
                      if (e.key === 'Escape') { setSearchOpen(false); setSearchValue('') }
                    }}
                  />
                  {searchValue.length > 1 && (
                    <div className="absolute top-full mt-1 left-0 w-80 glass rounded-xl border border-purple-900/30 shadow-2xl shadow-black/40 z-[60] overflow-hidden">
                      {searchResults.length > 0 ? (
                        <>
                          <div className="px-4 py-2 border-b border-purple-900/20">
                            <span className="text-xs text-slate-500">
                              Найдено: {searchResults.length} {searchResults.length === 1 ? 'сервис' : searchResults.length < 5 ? 'сервиса' : 'сервисов'}
                            </span>
                          </div>
                          <div className="divide-y divide-purple-900/10 max-h-72 overflow-y-auto">
                            {searchResults.slice(0, 8).map(s => (
                              <Link key={s.slug} href={`/review/${s.slug}`} target="_blank"
                                onClick={() => { setSearchOpen(false); setSearchValue('') }}
                                className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors group">
                                {/* BrandLogo — реальный логотип */}
                                <BrandLogo
                                  website={s.website}
                                  name={s.name}
                                  logo={s.logo}
                                  accentColor={s.accentColor}
                                  size="sm"
                                />
                                <div className="flex-1 min-w-0">
                                  <p className="text-white text-sm font-600 truncate group-hover:text-purple-300 transition-colors">
                                    {s.name}
                                  </p>
                                  <p className="text-slate-500 text-xs truncate">{s.mainBonus}</p>
                                </div>
                                <div className="flex flex-col items-end gap-0.5 shrink-0">
                                  <span className="text-amber-400 text-xs font-600">{s.rating} ★</span>
                                  <span className={`text-xs px-1.5 py-0.5 rounded ${
                                    s.type === 'casino' ? 'text-purple-400 bg-purple-900/20' :
                                    s.type === 'betting' ? 'text-blue-400 bg-blue-900/20' :
                                    'text-green-400 bg-green-900/20'
                                  }`}>
                                    {s.type === 'casino' ? 'Казино' : s.type === 'betting' ? 'БК' : 'Казино+БК'}
                                  </span>
                                </div>
                              </Link>
                            ))}
                          </div>
                          {searchResults.length > 8 && (
                            <div className="px-4 py-2 border-t border-purple-900/20 text-center">
                              <span className="text-xs text-slate-500">и ещё {searchResults.length - 8} результатов</span>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="px-4 py-4 text-center">
                          <p className="text-slate-400 text-sm">Ничего не найдено</p>
                          <p className="text-slate-600 text-xs mt-1">Попробуйте другой запрос</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => { setSearchOpen(false); setSearchValue('') }}
                  className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-white/5 transition-all">
                  <X size={16} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-all">
                <Search size={18} />
              </button>
            )}
          </div>

          <Link href="/promo"
            className="hidden sm:flex items-center gap-1 text-sm px-3 py-2 rounded-xl border border-orange-700/40 text-orange-300 hover:bg-orange-900/20 transition-all">
            🔥 Промокоды
          </Link>
          <Link href="/ratings" className="btn-neon text-sm hidden lg:inline-flex">
            Топ рейтинг
          </Link>

          {/* Mobile menu button */}
          <button className="md:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5"
            onClick={() => setOpen(!open)}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden glass border-t border-purple-900/20 max-h-[80vh] overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.label}>
                  <button
                    onClick={() => setMobileExpanded(mobileExpanded === link.label ? null : link.label)}
                    className="w-full flex items-center justify-between px-3 py-2.5 text-sm text-slate-300 hover:text-white rounded-lg hover:bg-white/5 transition-all">
                    <span>{link.label}</span>
                    <ChevronDown size={14} className={`transition-transform duration-200 ${mobileExpanded === link.label ? 'rotate-180' : ''}`} />
                  </button>
                  {mobileExpanded === link.label && (
                    <div className="ml-3 mt-1 space-y-0.5 border-l-2 border-purple-900/30 pl-3">
                      {link.children.map(child => (
                        <Link key={child.href} href={child.href}
                          onClick={() => { setOpen(false); setMobileExpanded(null) }}
                          className="block px-3 py-2 text-sm text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-all">
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link key={link.href} href={link.href!}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2.5 text-sm text-slate-300 hover:text-white rounded-lg hover:bg-white/5 transition-all">
                  {link.label}
                </Link>
              )
            )}
            {/* Mobile search */}
            <div className="pt-3 border-t border-purple-900/20">
              <input type="text" placeholder="Поиск казино, букмекера..."
                className="neon-input w-full text-sm" />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
