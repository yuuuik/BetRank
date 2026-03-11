import { Metadata } from 'next'
import Link from 'next/link'
import { FilteredCatalog } from '@/components/filters/FilteredCatalog'
import { getBetting } from '@/lib/data'
import { TrendingUp, Radio, BarChart2, Timer, ShieldCheck, Wallet } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Лучшие букмекерские конторы 2026 — Рейтинг и бонусы',
  description: 'Рейтинг букмекеров 2026: высокие коэффициенты, Live-ставки, быстрые выплаты. Сравните лучших букмекеров и выберите оптимальный вариант.',
}

const criteria = [
  { icon: TrendingUp,  color: '#38bdf8', title: 'Коэффициенты', desc: 'Маржа букмекера определяет вашу долгосрочную доходность. Оцениваем по топ-матчам РПЛ.' },
  { icon: Radio,       color: '#a855f7', title: 'Live-ставки',  desc: 'Широта росписи live, наличие трансляций и скорость обновления линии.' },
  { icon: BarChart2,   color: '#f59e0b', title: 'Роспись линии', desc: 'Количество исходов на матч: чем больше — тем больше возможностей для стратегий.' },
  { icon: Timer,       color: '#4ade80', title: 'Кэшаут',       desc: 'Возможность закрыть ставку до события — важная функция управления риском.' },
  { icon: ShieldCheck, color: '#f97316', title: 'Лицензия',     desc: 'Лицензия ФНС России — гарантия защиты средств игрока.' },
  { icon: Wallet,      color: '#e879f9', title: 'Вывод средств', desc: 'Скорость и лимиты вывода: СБП, МИР, ЮMoney, крипта.' },
]

const sportTypes = [
  { icon: '⚽', name: 'Футбол' },
  { icon: '🏒', name: 'Хоккей' },
  { icon: '🎾', name: 'Теннис' },
  { icon: '🏀', name: 'Баскетбол' },
  { icon: '🥊', name: 'ММА/Бокс' },
  { icon: '🎮', name: 'Киберспорт' },
  { icon: '🏐', name: 'Волейбол' },
  { icon: '🏎️', name: 'Формула-1' },
]

export default function BettingPage() {
  const betting = getBetting()
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link href="/" className="hover:text-slate-300">Главная</Link>
        <span>/</span>
        <span className="text-slate-300">Букмекеры</span>
      </div>

      <div className="mb-8">
        <h1 className="section-title text-3xl md:text-4xl text-white mb-3">Лучшие букмекеры 2026</h1>
        <p className="text-slate-400 text-lg max-w-2xl">Топ-рейтинг букмекерских контор с высокими коэффициентами, Live-ставками и быстрыми выплатами.</p>
      </div>

      {/* Виды спорта */}
      <div className="glass rounded-2xl border border-purple-900/20 p-6 mb-8">
        <h2 className="section-title text-xl text-white mb-1">Виды спорта в рейтинге</h2>
        <p className="text-slate-500 text-sm mb-5">Все букмекеры проверены по наличию ставок на популярные виды спорта</p>
        <div className="flex flex-wrap gap-3">
          {sportTypes.map(({ icon, name }) => (
            <div key={name} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/3 border border-purple-900/20 text-sm text-slate-300">
              <span>{icon}</span> {name}
            </div>
          ))}
        </div>
      </div>

      {/* Критерии выбора */}
      <div className="glass rounded-2xl border border-purple-900/20 p-6 mb-10">
        <h2 className="section-title text-xl text-white mb-1">Как мы оцениваем букмекеров</h2>
        <p className="text-slate-500 text-sm mb-6">6 параметров, которые важны для серьёзного игрока</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {criteria.map(({ icon: Icon, color, title, desc }) => (
            <div key={title} className="text-center group">
              <div className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center transition-transform group-hover:scale-110"
                style={{ background: `${color}15`, border: `1px solid ${color}30` }}>
                <Icon size={20} style={{ color }} />
              </div>
              <p className="text-white font-600 text-sm mb-1" style={{fontFamily:'Exo 2, sans-serif'}}>{title}</p>
              <p className="text-slate-500 text-xs leading-relaxed hidden md:block">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Быстрые факты */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
        {[
          { value: `${betting.length}`, label: 'букмекеров в рейтинге' },
          { value: '40+', label: 'видов спорта' },
          { value: '1000+', label: 'live-событий в день' },
          { value: 'от 100 ₽', label: 'минимальная ставка' },
        ].map(({ value, label }) => (
          <div key={label} className="service-card p-4 text-center">
            <p className="text-2xl font-800 gradient-text mb-1" style={{fontFamily:'Exo 2, sans-serif'}}>{value}</p>
            <p className="text-slate-500 text-xs">{label}</p>
          </div>
        ))}
      </div>

      <FilteredCatalog services={betting} showRanks hideTypeFilter />
    </div>
  )
}
