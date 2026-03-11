import { Metadata } from 'next'
import Link from 'next/link'
import { FilteredCatalog } from '@/components/filters/FilteredCatalog'
import { getCasinos } from '@/lib/data'
import { ShieldCheck, Zap, CreditCard, Headphones, Smartphone, Star } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Лучшие онлайн-казино 2026 — Рейтинг и обзоры',
  description: 'Топ онлайн-казино с лицензией: обзоры, бонусы, отзывы. Сравните казино по бонусам, выплатам и надёжности. Только проверенные платформы.',
}

const criteria = [
  { icon: ShieldCheck, color: '#a855f7', title: 'Лицензия', desc: 'Проверяем наличие действующей лицензии. Работаем только с легальными операторами.' },
  { icon: Star,        color: '#f59e0b', title: 'Бонусы',   desc: 'Оцениваем размер бонуса, вейджер и реальные условия отыгрыша.' },
  { icon: Zap,         color: '#38bdf8', title: 'Выплаты',  desc: 'Скорость и лимиты вывода — ключевой критерий надёжности казино.' },
  { icon: CreditCard,  color: '#4ade80', title: 'Платежи',  desc: 'Карты, СБП, криптовалюта: чем больше методов — тем удобнее.' },
  { icon: Smartphone,  color: '#e879f9', title: 'Мобильность', desc: 'Проверяем качество мобильного приложения и адаптивного сайта.' },
  { icon: Headphones,  color: '#f97316', title: 'Поддержка', desc: 'Live-чат, скорость ответа и качество решения проблем.' },
]

export default function CasinoPage() {
  const casinos = getCasinos()
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link href="/" className="hover:text-slate-300">Главная</Link>
        <span>/</span>
        <span className="text-slate-300">Казино</span>
      </div>

      <div className="mb-8">
        <h1 className="section-title text-3xl md:text-4xl text-white mb-3">Лучшие онлайн-казино 2026</h1>
        <p className="text-slate-400 text-lg max-w-2xl">Рейтинг проверенных онлайн-казино с лицензией. Честные обзоры, актуальные бонусы, реальные отзывы игроков.</p>
      </div>

      {/* Критерии выбора — уникальный контент страницы */}
      <div className="glass rounded-2xl border border-purple-900/20 p-6 mb-10">
        <h2 className="section-title text-xl text-white mb-1">По каким критериям мы выбираем казино</h2>
        <p className="text-slate-500 text-sm mb-6">Каждое казино проходит проверку по 6 ключевым параметрам перед попаданием в рейтинг</p>
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
          { value: `${casinos.length}`, label: 'казино в рейтинге' },
          { value: '100%', label: 'с действующей лицензией' },
          { value: 'до 200 000 ₽', label: 'максимальный бонус' },
          { value: '1-24 ч', label: 'скорость вывода' },
        ].map(({ value, label }) => (
          <div key={label} className="service-card p-4 text-center">
            <p className="text-2xl font-800 gradient-text mb-1" style={{fontFamily:'Exo 2, sans-serif'}}>{value}</p>
            <p className="text-slate-500 text-xs">{label}</p>
          </div>
        ))}
      </div>

      <FilteredCatalog services={casinos} showRanks hideTypeFilter />
    </div>
  )
}
