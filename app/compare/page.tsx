'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import { services } from '@/lib/data'
import { BrandLogo } from '@/components/ui/BrandLogo'
import { Search, ArrowLeftRight, X, ChevronRight, Star, Check, Minus } from 'lucide-react'

// Все поля для сравнения
function CompareTable({ a, b }: { a: typeof services[0]; b: typeof services[0] }) {
  const rows = [
    { label: 'Рейтинг BetRank', va: `${a.rating} / 5`, vb: `${b.rating} / 5`, better: a.rating > b.rating ? 'a' : b.rating > a.rating ? 'b' : 'eq' },
    { label: 'Пользовательский рейтинг', va: `${a.userRating} / 5`, vb: `${b.userRating} / 5`, better: a.userRating > b.userRating ? 'a' : b.userRating > a.userRating ? 'b' : 'eq' },
    { label: 'Отзывов', va: a.reviewCount.toLocaleString('ru'), vb: b.reviewCount.toLocaleString('ru'), better: a.reviewCount > b.reviewCount ? 'a' : 'b' },
    { label: 'Год основания', va: String(a.founded), vb: String(b.founded), better: a.founded < b.founded ? 'a' : b.founded < a.founded ? 'b' : 'eq' },
    { label: 'Лицензия', va: a.license, vb: b.license, better: 'eq' },
    { label: 'Мин. депозит', va: `${a.minDeposit} ₽`, vb: `${b.minDeposit} ₽`, better: a.minDeposit < b.minDeposit ? 'a' : b.minDeposit < a.minDeposit ? 'b' : 'eq' },
    { label: 'Главный бонус', va: a.mainBonus, vb: b.mainBonus, better: 'eq' },
    { label: 'Мобильное приложение', va: a.hasMobileApp, vb: b.hasMobileApp, bool: true, better: (a.hasMobileApp && !b.hasMobileApp) ? 'a' : (!a.hasMobileApp && b.hasMobileApp) ? 'b' : 'eq' },
    { label: 'Быстрый вывод', va: a.hasFastWithdrawal, vb: b.hasFastWithdrawal, bool: true, better: (a.hasFastWithdrawal && !b.hasFastWithdrawal) ? 'a' : (!a.hasFastWithdrawal && b.hasFastWithdrawal) ? 'b' : 'eq' },
    { label: 'Фриспины', va: a.hasFreeSpins, vb: b.hasFreeSpins, bool: true, better: (a.hasFreeSpins && !b.hasFreeSpins) ? 'a' : (!a.hasFreeSpins && b.hasFreeSpins) ? 'b' : 'eq' },
    { label: 'Кэшбек', va: a.hasCashback, vb: b.hasCashback, bool: true, better: (a.hasCashback && !b.hasCashback) ? 'a' : (!a.hasCashback && b.hasCashback) ? 'b' : 'eq' },
    { label: 'Live-ставки', va: a.hasLiveBetting, vb: b.hasLiveBetting, bool: true, better: (a.hasLiveBetting && !b.hasLiveBetting) ? 'a' : (!a.hasLiveBetting && b.hasLiveBetting) ? 'b' : 'eq' },
    { label: 'Бонус без депозита', va: a.hasRegistrationBonus, vb: b.hasRegistrationBonus, bool: true, better: (a.hasRegistrationBonus && !b.hasRegistrationBonus) ? 'a' : (!a.hasRegistrationBonus && b.hasRegistrationBonus) ? 'b' : 'eq' },
  ]

  const scoreA = rows.filter(r => r.better === 'a').length
  const scoreB = rows.filter(r => r.better === 'b').length

  return (
    <div>
      {/* Счёт */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="glass rounded-2xl border p-4 text-center" style={{ borderColor: a.accentColor + '40' }}>
          <p className="text-3xl font-800 mb-1" style={{ color: a.accentColor, fontFamily: 'Exo 2, sans-serif' }}>{scoreA}</p>
          <p className="text-slate-400 text-xs">преимуществ</p>
          <p className="text-white text-sm font-600 mt-1">{a.name}</p>
        </div>
        <div className="glass rounded-2xl border border-purple-900/20 p-4 text-center flex flex-col items-center justify-center">
          <ArrowLeftRight size={20} className="text-slate-500 mb-1" />
          <p className="text-slate-500 text-xs">vs</p>
        </div>
        <div className="glass rounded-2xl border p-4 text-center" style={{ borderColor: b.accentColor + '40' }}>
          <p className="text-3xl font-800 mb-1" style={{ color: b.accentColor, fontFamily: 'Exo 2, sans-serif' }}>{scoreB}</p>
          <p className="text-slate-400 text-xs">преимуществ</p>
          <p className="text-white text-sm font-600 mt-1">{b.name}</p>
        </div>
      </div>

      {/* Таблица */}
      <div className="glass rounded-2xl border border-purple-900/20 overflow-hidden">
        <div className="grid grid-cols-3 border-b border-purple-900/20">
          <div className="p-3 border-r border-purple-900/20" />
          <div className="p-3 flex items-center justify-center border-r border-purple-900/20">
            <BrandLogo website={a.website} name={a.name} logo={a.logo} logoUrl={a.logoUrl} accentColor={a.accentColor} size="sm" />
            <span className="text-white text-sm font-700 ml-2 hidden sm:inline" style={{ fontFamily: 'Exo 2, sans-serif' }}>{a.name}</span>
          </div>
          <div className="p-3 flex items-center justify-center">
            <BrandLogo website={b.website} name={b.name} logo={b.logo} logoUrl={b.logoUrl} accentColor={b.accentColor} size="sm" />
            <span className="text-white text-sm font-700 ml-2 hidden sm:inline" style={{ fontFamily: 'Exo 2, sans-serif' }}>{b.name}</span>
          </div>
        </div>
        {rows.map((row, i) => (
          <div key={i} className={`grid grid-cols-3 border-b border-purple-900/10 last:border-0 ${i % 2 === 0 ? '' : 'bg-white/[0.01]'}`}>
            <div className="p-3 border-r border-purple-900/15 flex items-center">
              <span className="text-slate-400 text-xs">{row.label}</span>
            </div>
            <div className={`p-3 border-r border-purple-900/15 flex items-center justify-center ${row.better === 'a' ? 'bg-green-900/10' : ''}`}>
              {row.bool !== undefined ? (
                row.va ? <Check size={16} className="text-green-400" /> : <Minus size={16} className="text-slate-600" />
              ) : (
                <span className={`text-xs text-center leading-snug ${row.better === 'a' ? 'text-green-400 font-600' : 'text-slate-400'}`}>
                  {row.va as string}
                </span>
              )}
            </div>
            <div className={`p-3 flex items-center justify-center ${row.better === 'b' ? 'bg-green-900/10' : ''}`}>
              {row.bool !== undefined ? (
                row.vb ? <Check size={16} className="text-green-400" /> : <Minus size={16} className="text-slate-600" />
              ) : (
                <span className={`text-xs text-center leading-snug ${row.better === 'b' ? 'text-green-400 font-600' : 'text-slate-400'}`}>
                  {row.vb as string}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Вывод */}
      <div className="mt-4 glass rounded-2xl border border-purple-900/20 p-5">
        <p className="text-white font-700 text-base mb-2" style={{ fontFamily: 'Exo 2, sans-serif' }}>
          {scoreA > scoreB ? `${a.name} выигрывает по ${scoreA} из ${rows.length} критериев` :
           scoreB > scoreA ? `${b.name} выигрывает по ${scoreB} из ${rows.length} критериев` :
           'Ничья — оба сервиса равны по основным критериям'}
        </p>
        <p className="text-slate-400 text-sm">
          {scoreA > scoreB
            ? `${a.name} предпочтительнее по рейтингу и условиям. ${b.name} может быть лучше для конкретных задач.`
            : scoreB > scoreA
            ? `${b.name} предпочтительнее по рейтингу и условиям. ${a.name} может быть лучше для конкретных задач.`
            : `Оба сервиса примерно одинаковы. Рекомендуем прочитать полные обзоры.`}
        </p>
        <div className="flex gap-3 mt-4">
          <Link href={`/review/${a.slug}`} target="_blank"
            className="flex-1 btn-neon text-xs py-2 justify-center">
            Обзор {a.name}
          </Link>
          <Link href={`/review/${b.slug}`} target="_blank"
            className="flex-1 btn-neon text-xs py-2 justify-center">
            Обзор {b.name}
          </Link>
        </div>
      </div>
    </div>
  )
}

function ServicePicker({
  label,
  selected,
  onSelect,
  exclude,
  accentColor,
}: {
  label: string
  selected: typeof services[0] | null
  onSelect: (s: typeof services[0]) => void
  exclude?: string
  accentColor: string
}) {
  const [search, setSearch] = useState('')
  const [open, setOpen] = useState(false)

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return [...services]
      .sort((a, b) => b.rating - a.rating)
      .filter(s => s.slug !== exclude)
      .filter(s => !q || s.name.toLowerCase().includes(q) || s.slug.includes(q))
      .slice(0, 20)
  }, [search, exclude])

  return (
    <div className="flex-1 min-w-0">
      <p className="text-slate-500 text-xs mb-2 font-500">{label}</p>
      {selected ? (
        <div className="glass rounded-2xl border p-4 flex items-center gap-3 relative"
          style={{ borderColor: selected.accentColor + '50' }}>
          <BrandLogo key={selected.slug} website={selected.website} name={selected.name} logo={selected.logo} logoUrl={selected.logoUrl} accentColor={selected.accentColor} size="md" />
          <div className="flex-1 min-w-0">
            <p className="text-white font-700 text-sm truncate" style={{ fontFamily: 'Exo 2, sans-serif' }}>{selected.name}</p>
            <p className="text-slate-500 text-xs truncate">{selected.mainBonus}</p>
            <div className="flex items-center gap-1 mt-0.5">
              <Star size={10} className="text-amber-400 fill-amber-400" />
              <span className="text-amber-400 text-xs">{selected.rating}</span>
            </div>
          </div>
          <button onClick={() => onSelect(selected)}
            className="absolute top-2 right-2 p-1 text-slate-500 hover:text-white rounded-lg hover:bg-white/5 transition-all">
            <X size={14} />
          </button>
          <button onClick={() => { setOpen(true); setSearch('') }}
            className="text-purple-400 text-xs hover:text-purple-300 transition-colors shrink-0">
            Изменить
          </button>
        </div>
      ) : (
        <button onClick={() => setOpen(true)}
          className="w-full glass rounded-2xl border-2 border-dashed border-purple-800/40 hover:border-purple-600/60 p-6 text-center transition-all group">
          <div className="w-10 h-10 rounded-xl border-2 border-dashed border-purple-700/40 group-hover:border-purple-500/60 flex items-center justify-center mx-auto mb-2 transition-all">
            <span className="text-xl">+</span>
          </div>
          <p className="text-slate-400 text-sm group-hover:text-white transition-colors">Выбрать {label.toLowerCase()}</p>
        </button>
      )}

      {/* Поиск и список */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}>
          <div className="glass rounded-2xl border border-purple-900/30 w-full max-w-md shadow-2xl shadow-black/50 overflow-hidden">
            <div className="flex items-center gap-3 p-4 border-b border-purple-900/20">
              <Search size={16} className="text-slate-500 shrink-0" />
              <input
                autoFocus
                type="text"
                placeholder="Поиск казино или букмекера..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="flex-1 bg-transparent text-white text-sm outline-none placeholder:text-slate-600"
              />
              <button onClick={() => setOpen(false)} className="text-slate-500 hover:text-white transition-colors">
                <X size={16} />
              </button>
            </div>
            <div className="max-h-80 overflow-y-auto divide-y divide-purple-900/10">
              {filtered.map(s => (
                <button key={s.slug} onClick={() => { onSelect(s); setOpen(false); setSearch('') }}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors text-left group">
                  <BrandLogo website={s.website} name={s.name} logo={s.logo} logoUrl={s.logoUrl} accentColor={s.accentColor} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-600 truncate group-hover:text-purple-300 transition-colors">
                      {s.name}
                    </p>
                    <p className="text-slate-500 text-xs truncate">{s.mainBonus}</p>
                  </div>
                  <div className="flex flex-col items-end gap-0.5 shrink-0">
                    <span className="text-amber-400 text-xs font-600">{s.rating} ★</span>
                    <span className={`text-xs px-1.5 py-0.5 rounded ${
                      s.type === 'casino' ? 'text-purple-400 bg-purple-900/20'
                      : s.type === 'betting' ? 'text-blue-400 bg-blue-900/20'
                      : 'text-green-400 bg-green-900/20'
                    }`}>
                      {s.type === 'casino' ? 'Казино' : s.type === 'betting' ? 'БК' : 'Казино+БК'}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function ComparePage() {
  const [serviceA, setServiceA] = useState<typeof services[0] | null>(null)
  const [serviceB, setServiceB] = useState<typeof services[0] | null>(null)

  const handleSelectA = (s: typeof services[0]) => {
    if (serviceA?.slug === s.slug) { setServiceA(null); return }
    setServiceA(s)
  }
  const handleSelectB = (s: typeof services[0]) => {
    if (serviceB?.slug === s.slug) { setServiceB(null); return }
    setServiceB(s)
  }

  // Популярные пары для быстрого старта
  const quickPairs = [
    ['1win', 'vavada'], ['jozz', 'joycasino'], ['stake', 'rox'],
    ['playfortuna', 'booi'], ['starda', 'monro'],
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex items-center gap-1.5 text-sm text-slate-500 mb-6">
        <Link href="/" className="hover:text-slate-300">Главная</Link>
        <ChevronRight size={13} />
        <span className="text-slate-300">Сравнение</span>
      </div>

      <div className="mb-8">
        <h1 className="section-title text-3xl md:text-4xl text-white mb-3">
          Сравнение казино и букмекеров
        </h1>
        <p className="text-slate-400 text-lg">
          Выберите два сервиса чтобы сравнить их по всем ключевым критериям
        </p>
      </div>

      {/* Быстрые пары */}
      {!serviceA && !serviceB && (
        <div className="mb-8">
          <p className="text-slate-500 text-sm mb-3">Популярные сравнения:</p>
          <div className="flex flex-wrap gap-2">
            {quickPairs.map(([slugA, slugB]) => {
              const a = services.find(s => s.slug === slugA)
              const b = services.find(s => s.slug === slugB)
              if (!a || !b) return null
              return (
                <button key={`${slugA}-${slugB}`}
                  onClick={() => { setServiceA(a); setServiceB(b) }}
                  className="flex items-center gap-2 px-3 py-2 glass rounded-xl border border-purple-900/20 hover:border-purple-700/40 text-sm text-slate-300 hover:text-white transition-all">
                  <span>{a.logo}</span>
                  <span className="text-slate-500 text-xs">{a.name}</span>
                  <ArrowLeftRight size={12} className="text-slate-600" />
                  <span className="text-slate-500 text-xs">{b.name}</span>
                  <span>{b.logo}</span>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Пикеры */}
      <div className="flex gap-4 items-start mb-8">
        <ServicePicker
          label="Первый сервис"
          selected={serviceA}
          onSelect={handleSelectA}
          exclude={serviceB?.slug}
          accentColor="#a855f7"
        />
        <div className="flex items-center justify-center mt-8 shrink-0">
          <div className="w-10 h-10 rounded-full glass border border-purple-900/20 flex items-center justify-center">
            <ArrowLeftRight size={16} className="text-slate-500" />
          </div>
        </div>
        <ServicePicker
          label="Второй сервис"
          selected={serviceB}
          onSelect={handleSelectB}
          exclude={serviceA?.slug}
          accentColor="#38bdf8"
        />
      </div>

      {/* Таблица сравнения */}
      {serviceA && serviceB ? (
        <CompareTable a={serviceA} b={serviceB} />
      ) : (
        <div className="glass rounded-2xl border border-purple-900/20 p-10 text-center">
          <div className="text-5xl mb-4">⚖️</div>
          <p className="text-white font-700 text-xl mb-2" style={{ fontFamily: 'Exo 2, sans-serif' }}>
            Выберите два сервиса для сравнения
          </p>
          <p className="text-slate-400 text-sm">
            Нажмите на карточки выше чтобы выбрать казино или букмекера
          </p>
        </div>
      )}
    </div>
  )
}
