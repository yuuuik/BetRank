import { Metadata } from 'next'
import Link from 'next/link'
import { services } from '@/lib/data'
import { BonusesClient } from './BonusesClient'

export const metadata: Metadata = {
  title: 'Лучшие бонусы казино 2026',
  description: 'Все актуальные бонусы онлайн-казино: бонусы на депозит, фриспины, кэшбек, бездепозитные бонусы. Сравните и выберите лучшее предложение.',
}

export default function BonusesPage() {
  const allBonuses = [...services].sort((a, b) => b.rating - a.rating).flatMap(s => s.bonuses.map(b => ({ ...b, service: s })))

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-10">
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
          <Link href="/" className="hover:text-slate-300">Главная</Link>
          <span>/</span>
          <span className="text-slate-300">Бонусы</span>
        </div>
        <h1 className="section-title text-3xl md:text-4xl text-white mb-3">Лучшие бонусы 2026</h1>
        <p className="text-slate-400 text-lg max-w-2xl">Все актуальные бонусные предложения от проверенных казино. Обновляется ежедневно.</p>
      </div>

      <BonusesClient allBonuses={allBonuses} />
    </div>
  )
}
