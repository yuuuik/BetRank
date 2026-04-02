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
    label: 'Главная',
    href: '/',
  },
  {
    label: 'Бонусы',
    href: '/bonuses',
    allHref: '/bonuses',
    allLabel: 'Все бонусы',
    children: [
      { href: '/bonuses/frispiny',    icon: '🎰', label: 'Фриспины',    sub: 'Бесплатные вращения', color: '#a855f7' },
      { href: '/bonuses/na-depozit',  icon: '💰', label: 'На депозит',  sub: 'Приветственный бонус', color: '#22c55e' },
      { href: '/bonuses/keshbek',     icon: '♻️', label: 'Кэшбек',      sub: 'Возврат проигрыша', color: '#f59e0b' },
    ],
  },
  {
    label: 'Игры',
    href: '/games',
    allHref: '/games',
    allLabel: 'Все игры',
    children: [
      { href: '/games/aviator',          icon: '✈️', label: 'Aviator',          sub: 'Краш · Spribe',          color: '#1a73e8' },
      { href: '/games/gates-of-olympus', icon: '⚡', label: 'Gates of Olympus', sub: 'Слот · Pragmatic Play',  color: '#f59e0b' },
      { href: '/games/crazy-time',       icon: '🎡', label: 'Crazy Time',       sub: 'Live · Evolution',       color: '#4ade80' },
    ],
  },
  {
    label: 'Провайдеры',
    href: '/providers',
    allHref: '/providers',
    allLabel: 'Все провайдеры',
    children: [],
  },
  {
    label: 'Оплата',
    href: '/payment',
    allHref: '/payment',
    allLabel: 'Все способы',
    children: [
      { href: '/payment/sbp',      icon: '📱', label: 'СБП',              sub: 'Мгновенно · 0%',       color: '#38bdf8' },
      { href: '/payment/karta',    icon: '💳', label: 'Банковская карта', sub: 'Visa / МИР',            color: '#a855f7' },
      { href: '/payment/kripto',   icon: '₿',  label: 'Криптовалюта',    sub: 'BTC, USDT, ETH',        color: '#f59e0b' },
      { href: '/payment/yuimoney', icon: '💰', label: 'ЮMoney',          sub: 'Электронный кошелёк',   color: '#8b5cf6' },
    ],
  },
  {
    label: 'Полезное',
    children: [
      { href: '/reviews', icon: '⭐', label: 'Обзоры',    sub: 'Честные отзывы',   color: '#f59e0b' },
      { href: '/news',    icon: '📰', label: 'Новости',   sub: 'Мир казино 2026',  color: '#38bdf8' },
      { href: '/compare', icon: '⚖️', label: 'Сравнение', sub: '50+ критериев',    color: '#a855f7' },
      { href: '/faq',     icon: '❓', label: 'FAQ',        sub: 'Вопросы и ответы', color: '#4ade80' },
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
                  <div className="absolute top-full left-0 pt-2 z-50 w-64"
                    onMouseEnter={() => handleMouseEnter(link.label)}
                    onMouseLeave={handleMouseLeave}>
                    <div className="glass rounded-xl border border-purple-900/30 overflow-hidden shadow-2xl shadow-black/40">
                      {link.label === 'Провайдеры' ? (
                        <>
                          {providers.filter(p => p.popular).slice(0, 3).map(p => (
                            <Link key={p.slug} href={`/providers/${p.slug}`}
                              onClick={() => setActiveDropdown(null)}
                              className="flex items-center gap-3 px-4 py-2.5 hover:bg-purple-900/20 transition-all group">
                              <ProviderLogo slug={p.slug} name={p.name} fallbackIcon={p.logo} color={p.color} size="xs" />
                              <div className="flex-1 min-w-0">
                                <p className="text-slate-300 text-sm group-hover:text-white transition-colors truncate">{p.name}</p>
                                <p className="text-slate-600 text-xs">{p.gameCount}+ игр</p>
                              </div>
                            </Link>
                          ))}
                          <Link href="/providers" onClick={() => setActiveDropdown(null)}
                            className="flex items-center justify-center px-4 py-2.5 text-xs text-purple-400 hover:text-purple-300 hover:bg-purple-900/20 transition-all border-t border-purple-900/20">
                            Все провайдеры →
                          </Link>
                        </>
                      ) : (
                        <>
                          {link.children.map((child) => (
                            <Link key={child.href} href={child.href}
                              onClick={() => setActiveDropdown(null)}
                              className="flex items-center gap-3 px-4 py-2.5 hover:bg-purple-900/20 transition-all group">
                              <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-base"
                                style={{ background: `${'color' in child && child.color ? child.color : '#a855f7'}20`, border: `1px solid ${'color' in child && child.color ? child.color : '#a855f7'}30` }}>
                                {'icon' in child ? child.icon : ''}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-slate-300 text-sm group-hover:text-white transition-colors truncate">{'label' in child ? child.label : ''}</p>
                                {'sub' in child && child.sub && <p className="text-slate-600 text-xs truncate">{child.sub}</p>}
                              </div>
                            </Link>
                          ))}
                          {'allHref' in link && link.allHref && (
                            <Link href={link.allHref as string} onClick={() => setActiveDropdown(null)}
                              className="flex items-center justify-center px-4 py-2.5 text-xs text-purple-400 hover:text-purple-300 hover:bg-purple-900/20 transition-all border-t border-purple-900/20">
                              {(link as {allLabel?: string}).allLabel} →
                            </Link>
                          )}
                        </>
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
                    placeholder="Поиск казино..."
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
                                  logo={s.logo} logoUrl={s.logoUrl}
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
                                    'text-purple-400 bg-purple-900/20'
                                  }`}>
                                    {'Казино'}
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
                      {link.label === 'Провайдеры'
                        ? providers.filter(p => p.popular).slice(0, 3).map(p => (
                            <Link key={p.slug} href={`/providers/${p.slug}`}
                              onClick={() => { setOpen(false); setMobileExpanded(null) }}
                              className="block px-3 py-2 text-sm text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-all">
                              {p.name}
                            </Link>
                          ))
                        : link.children.map(child => (
                            <Link key={child.href} href={child.href}
                              onClick={() => { setOpen(false); setMobileExpanded(null) }}
                              className="block px-3 py-2 text-sm text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-all">
                              {'icon' in child ? child.icon + ' ' : ''}{'label' in child ? child.label : ''}
                            </Link>
                          ))
                      }
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
              <input type="text" placeholder="Поиск казино..."
                className="neon-input w-full text-sm" />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
