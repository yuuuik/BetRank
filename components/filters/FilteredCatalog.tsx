'use client'
import { useState, useCallback, useMemo } from 'react'
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react'
import { Service, FilterState } from '@/types'
import { ServiceCard } from '@/components/cards/ServiceCard'

interface FilteredCatalogProps {
  services: Service[]
  title?: string
  showRanks?: boolean
  hideTypeFilter?: boolean
}

const defaultFilters: FilterState = {
  registrationBonus: false,
  freeSpins: false,
  depositBonus: false,
  cashback: false,
  liveBetting: false,
  mobileApp: false,
  fastWithdrawal: false,
  minDeposit: null,
  type: 'all',
  sortBy: 'rating',
  search: '',
}

const ITEMS_PER_PAGE = 12

export function FilteredCatalog({ services, title, showRanks, hideTypeFilter }: FilteredCatalogProps) {
  const [filters, setFilters] = useState<FilterState>(defaultFilters)
  const [page, setPage] = useState(1)
  const [filtersOpen, setFiltersOpen] = useState(false)

  const toggle = useCallback((key: keyof FilterState) => {
    setFilters(prev => ({ ...prev, [key]: !prev[key] }))
    setPage(1)
  }, [])

  const filtered = useMemo(() => services
    .filter(s => {
      if (filters.search && !s.name.toLowerCase().includes(filters.search.toLowerCase()) &&
          !s.description.toLowerCase().includes(filters.search.toLowerCase())) return false
      if (filters.registrationBonus && !s.hasRegistrationBonus) return false
      if (filters.freeSpins && !s.hasFreeSpins) return false
      if (filters.depositBonus && !s.hasDepositBonus) return false
      if (filters.cashback && !s.hasCashback) return false
      if (filters.mobileApp && !s.hasMobileApp) return false
      if (filters.fastWithdrawal && !s.hasFastWithdrawal) return false
      return true
    })
    .sort((a, b) => {
      if (filters.sortBy === 'rating') return b.rating - a.rating
      if (filters.sortBy === 'bonus') return b.minDeposit - a.minDeposit
      if (filters.sortBy === 'name') return a.name.localeCompare(b.name)
      return 0
    }), [services, filters])

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated = filtered.slice(0, page * ITEMS_PER_PAGE)
  const activeFilterCount = [
    filters.registrationBonus, filters.freeSpins, filters.depositBonus,
    filters.cashback, filters.mobileApp, filters.fastWithdrawal,
  ].filter(Boolean).length

  const filterChips = [
    { key: 'registrationBonus', label: 'Бездепозитный бонус' },
    { key: 'freeSpins', label: 'Фриспины' },
    { key: 'depositBonus', label: 'Бонус на депозит' },
    { key: 'cashback', label: 'Кэшбек' },
    { key: 'mobileApp', label: 'Мобильное приложение' },
    { key: 'fastWithdrawal', label: 'Быстрый вывод' },
  ] as const

  return (
    <div>
      {/* Controls bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        {/* Search */}
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Поиск по названию или описанию..."
            value={filters.search}
            onChange={e => { setFilters(p => ({...p, search: e.target.value})); setPage(1) }}
            className="neon-input w-full pl-9 text-sm"
          />
        </div>

        {/* Sort */}
        <div className="relative">
          <select
            value={filters.sortBy}
            onChange={e => setFilters(p => ({...p, sortBy: e.target.value as FilterState['sortBy']}))}
            className="neon-input text-sm pr-8 appearance-none cursor-pointer min-w-[160px]"
          >
            <option value="rating">По рейтингу</option>
            <option value="bonus">По бонусу</option>
            <option value="name">По названию</option>
          </select>
          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
        </div>


        {/* Filter toggle */}
        <button onClick={() => setFiltersOpen(!filtersOpen)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-all border ${
            filtersOpen || activeFilterCount > 0
              ? 'border-purple-500/50 bg-purple-900/20 text-purple-300'
              : 'border-purple-900/30 text-slate-400 hover:text-white hover:bg-white/5'
          }`}>
          <SlidersHorizontal size={15} />
          Фильтры
          {activeFilterCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-purple-600 text-white text-xs flex items-center justify-center">{activeFilterCount}</span>
          )}
        </button>
      </div>

      {/* Filter chips */}
      {filtersOpen && (
        <div className="glass rounded-xl p-4 mb-6 border border-purple-900/20">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-600 text-slate-300" style={{fontFamily:'Exo 2, sans-serif'}}>Фильтры</p>
            {activeFilterCount > 0 && (
              <button onClick={() => setFilters(defaultFilters)} className="flex items-center gap-1 text-xs text-slate-500 hover:text-red-400 transition-colors">
                <X size={12} /> Сбросить все
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {filterChips.map(({ key, label }) => (
              <button key={key} onClick={() => toggle(key as keyof FilterState)}
                className={`filter-checkbox ${filters[key as keyof FilterState] ? 'active' : ''}`}>
                <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                  filters[key as keyof FilterState] ? 'bg-purple-600 border-purple-500' : 'border-slate-600'
                }`}>
                  {filters[key as keyof FilterState] && <span className="text-white text-xs">✓</span>}
                </div>
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results count */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-slate-500">
          Найдено: <span className="text-white font-600">{filtered.length}</span> сервисов
        </p>
        {activeFilterCount > 0 && (
          <button onClick={() => setFilters(defaultFilters)} className="text-xs text-purple-400 hover:text-purple-300 transition-colors">
            Сбросить фильтры
          </button>
        )}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-slate-500">
          <p className="text-4xl mb-3">🔍</p>
          <p className="text-lg font-500">Ничего не найдено</p>
          <p className="text-sm mt-1">Попробуйте изменить параметры фильтрации</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {paginated.map((service, i) => (
            <ServiceCard key={service.slug} service={service} rank={showRanks ? i + 1 : undefined} />
          ))}
        </div>
      )}

      {/* Load more */}
      {page < totalPages && (
        <div className="text-center mt-8">
          <button onClick={() => setPage(p => p + 1)}
            className="px-8 py-3 rounded-xl border border-purple-700/40 text-slate-300 hover:text-white hover:border-purple-500/60 hover:bg-purple-900/10 transition-all text-sm font-500">
            Показать ещё ({filtered.length - paginated.length})
          </button>
        </div>
      )}
    </div>
  )
}
