import Link from 'next/link'
import { Star, Shield, AlertTriangle } from 'lucide-react'

const footerLinks = {
  'Казино': [
    { href: '/casino', label: 'Все казино' },
    { href: '/ratings', label: 'Топ рейтинг' },
    { href: '/bonuses', label: 'Бонусы' },
    { href: '/review/vavada', label: 'Vavada' },
    { href: '/review/1win', label: '1Win' },
    { href: '/review/jozz', label: 'Jozz Casino' },
    { href: '/review/rox', label: 'ROX Casino' },
  ],
  'Бонусы': [
    { href: '/bonuses/bez-depozita', label: 'Без депозита' },
    { href: '/bonuses/frispiny', label: 'Фриспины' },
    { href: '/bonuses/na-depozit', label: 'На депозит' },
    { href: '/bonuses/keshbek', label: 'Кэшбек' },
  ],
  'Информация': [
    { href: '/reviews', label: 'Обзоры' },
    { href: '/news', label: 'Новости' },
    { href: '/guides', label: 'Гайды' },
    { href: '/faq', label: 'FAQ' },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-purple-900/20 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center">
                <Star size={16} className="text-white fill-white" />
              </div>
              <span style={{fontFamily:'Exo 2, sans-serif', fontWeight:800, fontSize:'1.2rem'}}>
                <span className="gradient-text">Bet</span>
                <span className="text-white">Rank</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-4 max-w-xs">
              Независимый агрегатор с честными обзорами онлайн-казино. Мы помогаем найти лучшие бонусы и надёжные платформы.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Shield size={14} className="text-purple-400" />
              <span>Независимые обзоры · Честные рейтинги</span>
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-white font-600 mb-4 text-sm" style={{fontFamily:'Exo 2, sans-serif'}}>{title}</h3>
              <ul className="space-y-2">
                {links.map(link => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-slate-400 hover:text-purple-300 text-sm transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="neon-divider mb-8" />

        <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-900/10 border border-amber-700/20 mb-8">
          <AlertTriangle size={16} className="text-amber-400 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-200/70 leading-relaxed">
            <strong className="text-amber-300">Ответственная игра:</strong> Азартные игры могут вызывать зависимость. Играйте ответственно и только на деньги, которые можете позволить себе потерять. Материалы сайта предназначены только для лиц старше 18 лет.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© 2026 BetRank. Все права защищены.</p>
          <div className="flex gap-4">
            <Link href="/faq" className="hover:text-slate-300 transition-colors">Политика конфиденциальности</Link>
            <Link href="/faq" className="hover:text-slate-300 transition-colors">Условия использования</Link>
            <Link href="/faq" className="hover:text-slate-300 transition-colors">Контакты</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
