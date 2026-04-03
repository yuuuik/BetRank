import { Metadata } from 'next'
import { HeroSection } from '@/components/sections/HeroSection'
import { BestBonusesSection } from '@/components/sections/BestBonusesSection'
import { services } from '@/lib/data'
import { gamesData } from '@/lib/categories'
import { games as allGames, type Game } from '@/lib/games'
import { providers } from '@/lib/providers'
import { ServiceCard } from '@/components/cards/ServiceCard'
import { EmailSubscribe } from '@/components/widgets/EmailSubscribe'
import { RatingChangeTable } from '@/components/widgets/RatingChange'
import Link from 'next/link'
import { GameLogo, ProviderLogo } from '@/components/ui/ProviderLogo'
import { ArrowRight, Zap, BookOpen, HelpCircle, Gamepad2, Gift, Trophy, Sword, Shield, Bitcoin, Sparkles, UserCheck, Search, BarChart2, RefreshCw } from 'lucide-react'

export const metadata: Metadata = {
  title: 'BetRank — Рейтинг лучших онлайн-казино 2026',
  description: 'Независимый рейтинг онлайн-казино. Обзоры, бонусы, фриспины. Найдите лучшее казино с честными условиями.',
}

const quickLinks = [
  { href: '/casino', Icon: Gamepad2, color: 'text-purple-400', bg: 'bg-purple-900/30 border-purple-700/30', title: 'Онлайн казино', desc: 'Топ казино с бонусами' },
  { href: '/bonuses', Icon: Gift, color: 'text-amber-400', bg: 'bg-amber-900/30 border-amber-700/30', title: 'Все бонусы', desc: 'Фриспины и кэшбек' },
  { href: '/ratings', Icon: Trophy, color: 'text-yellow-400', bg: 'bg-yellow-900/30 border-yellow-700/30', title: 'Полный рейтинг', desc: 'Сравнение по 50+ критериям' },
  { href: '/games', Icon: Sword, color: 'text-emerald-400', bg: 'bg-emerald-900/30 border-emerald-700/30', title: 'Игры', desc: 'Слоты, краш, live' },
]

export default function HomePage() {
  const topCasinos = services
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Рейтинг лучших онлайн-казино',
        numberOfItems: services.length,
        itemListElement: services.map((s, i) => ({
          '@type': 'ListItem', position: i + 1, name: s.name,
          url: `https://betrank.vercel.app/review/${s.slug}`,
        })),
      }) }} />

      <HeroSection />

      {/* Quick navigation */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {quickLinks.map(({ href, Icon, color, bg, title, desc }) => (
              <Link key={href} href={href}
                className="service-card p-4 text-center group cursor-pointer hover:scale-105 transition-transform">
                <div className={`w-12 h-12 rounded-2xl border ${bg} flex items-center justify-center mx-auto mb-3`}>
                  <Icon size={22} className={color} />
                </div>
                <p className="text-white font-600 text-sm" style={{fontFamily:'Exo 2, sans-serif'}}>{title}</p>
                <p className="text-slate-500 text-xs mt-0.5">{desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="neon-divider my-4 max-w-7xl mx-auto px-4" />

      <BestBonusesSection />

      <div className="neon-divider my-4 max-w-7xl mx-auto px-4" />

      {/* Top casinos */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="section-title text-2xl md:text-3xl text-white">Топ казино</h2>
              <p className="text-slate-400 mt-1 text-sm">Лучшие проверенные казино с бонусами</p>
            </div>
            <Link href="/casino" className="flex items-center gap-1 text-sm text-purple-400 hover:text-purple-300 transition-colors">
              Все казино <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {topCasinos.map((service, i) => (
              <ServiceCard key={service.slug} service={service} rank={i + 1} />
            ))}
          </div>
        </div>
      </section>

      {/* Популярные игры */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="section-title text-2xl md:text-3xl text-white">Популярные игры</h2>
              <p className="text-slate-500 text-sm mt-1">Краш-игры, слоты и live казино</p>
            </div>
            <Link href="/games" className="flex items-center gap-1 text-purple-400 hover:text-purple-300 text-sm transition-colors">
              Все игры <ArrowRight size={15} />
            </Link>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
            {allGames.filter(g => g.popular || g.isNew).slice(0, 8).map(game => (
              <Link key={game.slug} href={`/games/${game.slug}`}
                className="service-card p-4 text-center hover:scale-105 transition-transform group relative">
                {game.isNew && (
                  <span className="absolute top-1 right-1 text-xs px-1 py-0.5 rounded bg-emerald-900/50 text-emerald-300 border border-emerald-700/30 leading-none text-[10px]">NEW</span>
                )}
                <div className="flex justify-center mb-2">
                  <GameLogo slug={game.slug} providerSlug={game.providerSlug} name={game.name} fallbackIcon={game.icon} color={game.color} size="sm" />
                </div>
                <p className="text-white text-xs font-600 group-hover:text-purple-300 transition-colors truncate"
                  style={{ fontFamily: 'Exo 2, sans-serif' }}>{game.name}</p>
                <p className="text-slate-600 text-xs mt-0.5">{game.rtp}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="neon-divider my-4 max-w-7xl mx-auto px-4" />

      {/* Провайдеры */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="section-title text-2xl md:text-3xl text-white">Провайдеры игр</h2>
              <p className="text-slate-500 text-sm mt-1">Pragmatic Play, Evolution, Spribe и другие</p>
            </div>
            <Link href="/providers" className="flex items-center gap-1 text-purple-400 hover:text-purple-300 text-sm transition-colors">
              Все провайдеры <ArrowRight size={15} />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {providers.slice(0, 4).map(prov => (
              <Link key={prov.slug} href={`/providers/${prov.slug}`}
                className="service-card p-4 flex items-center gap-3 hover:scale-[1.02] transition-transform group">
                <ProviderLogo slug={prov.slug} name={prov.name} fallbackIcon={prov.logo} color={prov.color} size="sm" />
                <div className="min-w-0">
                  <p className="text-white text-sm font-600 group-hover:text-purple-300 transition-colors truncate"
                    style={{ fontFamily: 'Exo 2, sans-serif' }}>{prov.name}</p>
                  <p className="text-slate-600 text-xs mt-0.5">{prov.gameCount}+ игр</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="neon-divider my-4 max-w-7xl mx-auto px-4" />

      {/* Рейтинг + изменения */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div>
            <h2 className="section-title text-2xl text-white mb-4">Таблица изменений рейтинга</h2>
            <RatingChangeTable />
          </div>
        </div>
      </section>

      <div className="neon-divider my-4 max-w-7xl mx-auto px-4" />

      {/* Why trust us */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="section-title text-2xl md:text-3xl text-white mb-3">Почему доверяют BetRank</h2>
            <p className="text-slate-400 max-w-xl mx-auto">Проверяем каждый сервис по 50+ параметрам</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { Icon: Search, color: 'text-blue-400', bg: 'bg-blue-900/30 border-blue-700/30', title: 'Независимые обзоры', desc: 'Не принимаем деньги за положительные отзывы. Каждый обзор — реальное тестирование.' },
              { Icon: BarChart2, color: 'text-purple-400', bg: 'bg-purple-900/30 border-purple-700/30', title: '50+ параметров оценки', desc: 'Лицензии, выплаты, бонусы, поддержка, мобильность — всё учитывается в рейтинге.' },
              { Icon: RefreshCw, color: 'text-emerald-400', bg: 'bg-emerald-900/30 border-emerald-700/30', title: 'Ежемесячные обновления', desc: 'Рейтинги обновляются ежемесячно. Устаревшая информация немедленно помечается.' },
            ].map(({ Icon, color, bg, title, desc }) => (
              <div key={title} className="service-card p-6 text-center">
                <div className={`w-14 h-14 rounded-2xl border ${bg} flex items-center justify-center mx-auto mb-4`}>
                  <Icon size={26} className={color} />
                </div>
                <h3 className="text-white font-700 text-lg mb-2" style={{fontFamily:'Exo 2, sans-serif'}}>{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Bottom CTAs */}
      <section className="py-8 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/guides" className="service-card p-5 group flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-900/30 border border-blue-700/30 flex items-center justify-center shrink-0">
                <BookOpen size={20} className="text-blue-400" />
              </div>
              <div>
                <p className="text-white font-600" style={{fontFamily:'Exo 2, sans-serif'}}>Гайды для новичков</p>
                <p className="text-slate-500 text-sm">Как выбрать казино и не ошибиться</p>
              </div>
              <ArrowRight size={16} className="text-slate-600 group-hover:text-purple-400 transition-colors ml-auto" />
            </Link>
            <Link href="/bonuses" className="service-card p-5 group flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-purple-900/30 border border-purple-700/30 flex items-center justify-center shrink-0">
                <Zap size={20} className="text-purple-400" />
              </div>
              <div>
                <p className="text-white font-600" style={{fontFamily:'Exo 2, sans-serif'}}>Эксклюзивные бонусы</p>
                <p className="text-slate-500 text-sm">Спецпредложения только на BetRank</p>
              </div>
              <ArrowRight size={16} className="text-slate-600 group-hover:text-purple-400 transition-colors ml-auto" />
            </Link>
            <Link href="/faq" className="service-card p-5 group flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-green-900/30 border border-green-700/30 flex items-center justify-center shrink-0">
                <HelpCircle size={20} className="text-green-400" />
              </div>
              <div>
                <p className="text-white font-600" style={{fontFamily:'Exo 2, sans-serif'}}>Частые вопросы</p>
                <p className="text-slate-500 text-sm">Ответы на популярные вопросы</p>
              </div>
              <ArrowRight size={16} className="text-slate-600 group-hover:text-purple-400 transition-colors ml-auto" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
