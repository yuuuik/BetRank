import { Metadata } from 'next'
import Link from 'next/link'
import { services } from '@/lib/data'
import { casinoCategories, bonusCategories, paymentMethods } from '@/lib/categories'
import { games } from '@/lib/games'
import { providers } from '@/lib/providers'
import { Map, Gamepad2, Gift, Star, Sword, Cpu, CreditCard, BookOpen, Newspaper, HelpCircle, Trophy, Home, FileText } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Карта сайта BetRank',
  description: 'Карта сайта BetRank — все разделы и страницы. Казино, бонусы, обзоры, игры, провайдеры, способы оплаты.',
}

type SitemapSection = {
  title: string
  icon: React.ReactNode
  color: string
  links: { href: string; label: string }[]
}

export default function SitemapPage() {
  const sections: SitemapSection[] = [
    {
      title: 'Главная',
      icon: <Home size={18} />,
      color: 'text-slate-400',
      links: [
        { href: '/', label: 'Главная страница' },
        { href: '/ratings', label: 'Полный рейтинг казино' },
      ],
    },
    {
      title: 'Казино',
      icon: <Gamepad2 size={18} />,
      color: 'text-purple-400',
      links: [
        { href: '/casino', label: 'Все онлайн-казино' },
        ...casinoCategories.map(c => ({ href: `/casino/${c.slug}`, label: c.h1 })),
      ],
    },
    {
      title: 'Бонусы',
      icon: <Gift size={18} />,
      color: 'text-amber-400',
      links: [
        { href: '/bonuses', label: 'Все бонусы' },
        ...bonusCategories.map(c => ({ href: `/bonuses/${c.slug}`, label: c.h1 })),
      ],
    },
    {
      title: 'Обзоры казино',
      icon: <Star size={18} />,
      color: 'text-yellow-400',
      links: [
        { href: '/reviews', label: 'Все обзоры казино' },
        ...services.map(s => ({ href: `/review/${s.slug}`, label: s.name })),
      ],
    },
    {
      title: 'Игры',
      icon: <Sword size={18} />,
      color: 'text-emerald-400',
      links: [
        { href: '/games', label: 'Все игры' },
        ...games.map(g => ({ href: `/games/${g.slug}`, label: g.name })),
      ],
    },
    {
      title: 'Провайдеры игр',
      icon: <Cpu size={18} />,
      color: 'text-blue-400',
      links: [
        { href: '/providers', label: 'Все провайдеры' },
        ...providers.map(p => ({ href: `/providers/${p.slug}`, label: p.name })),
      ],
    },
    {
      title: 'Способы оплаты',
      icon: <CreditCard size={18} />,
      color: 'text-cyan-400',
      links: paymentMethods.map(m => ({ href: `/payment/${m.slug}`, label: m.fullName })),
    },
    {
      title: 'Гайды',
      icon: <BookOpen size={18} />,
      color: 'text-indigo-400',
      links: [
        { href: '/guides', label: 'Все гайды' },
      ],
    },
    {
      title: 'Новости',
      icon: <Newspaper size={18} />,
      color: 'text-pink-400',
      links: [
        { href: '/news', label: 'Новости казино' },
      ],
    },
    {
      title: 'Сравнение',
      icon: <Trophy size={18} />,
      color: 'text-orange-400',
      links: [
        { href: '/compare', label: 'Сравнение казино' },
      ],
    },
    {
      title: 'Дополнительно',
      icon: <FileText size={18} />,
      color: 'text-slate-400',
      links: [
        { href: '/faq', label: 'Часто задаваемые вопросы' },
        { href: '/promo', label: 'Промокоды' },
        { href: '/betting', label: 'Букмекеры' },
      ],
    },
  ]

  const totalLinks = sections.reduce((acc, s) => acc + s.links.length, 0)

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-8">
        <Link href="/" className="hover:text-slate-300 transition-colors">Главная</Link>
        <span>/</span>
        <span className="text-slate-300">Карта сайта</span>
      </div>

      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-purple-900/40 border border-purple-700/30 flex items-center justify-center">
          <Map size={20} className="text-purple-400" />
        </div>
        <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'Exo 2, sans-serif' }}>
          Карта сайта
        </h1>
      </div>
      <p className="text-slate-400 mb-10 ml-[52px]">
        {totalLinks} страниц — все разделы и материалы BetRank
      </p>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {sections.map(section => (
          <div key={section.title} className="service-card p-5">
            <div className="flex items-center gap-2 mb-4">
              <span className={section.color}>{section.icon}</span>
              <h2 className="text-white font-700 text-base" style={{ fontFamily: 'Exo 2, sans-serif' }}>
                {section.title}
              </h2>
              <span className="ml-auto text-xs text-slate-600 bg-slate-800/60 px-2 py-0.5 rounded-full">
                {section.links.length}
              </span>
            </div>
            <ul className="space-y-1.5">
              {section.links.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-purple-300 transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-slate-700 group-hover:bg-purple-500 transition-colors shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
