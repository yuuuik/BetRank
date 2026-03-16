import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Star, Check, X, ExternalLink, ChevronRight, Shield, Calendar, CreditCard, Smartphone, Zap, Clock } from 'lucide-react'
import { services, getBySlug } from '@/lib/data'
import { BrandLogo } from '@/components/ui/BrandLogo'
import { SiteScreenshot } from '@/components/ui/SiteScreenshot'
import { ViewCounter, LiveViewers } from '@/components/widgets/ViewCounter'
import { NewsWidget } from '@/components/widgets/NewsWidget'
import { TopWeekWidget } from '@/components/widgets/RatingChange'
import { EmailSubscribe } from '@/components/widgets/EmailSubscribe'

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  return services.map(s => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = getBySlug(params.slug)
  if (!service) return {}
  return {
    title: `${service.name} — Обзор, бонусы и отзывы 2026`,
    description: `Полный обзор ${service.name}: ${service.tagline}. Бонус: ${service.mainBonus}. Рейтинг: ${service.rating}/5.`,
  }
}

function StarRating({ value, size = 16 }: { value: number; size?: number }) {
  return (
    <div className="flex">
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} size={size} className={
          i < Math.floor(value) ? 'text-amber-400 fill-amber-400' :
          i < value ? 'text-amber-400/50 fill-amber-400/50' : 'text-slate-700'
        } />
      ))}
    </div>
  )
}

export default function ReviewPage({ params }: Props) {
  const service = getBySlug(params.slug)
  if (!service) notFound()

  const bonusTypeLabel: Record<string, string> = {
    deposit: 'Бонус на депозит', freespins: 'Фриспины', cashback: 'Кэшбек',
    registration: 'Без депозита', reload: 'Бонус на пополнение',
  }

  return (
    <>
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center gap-2 text-sm text-slate-500 flex-wrap">
          <Link href="/" className="hover:text-slate-300">Главная</Link>
          <ChevronRight size={14} />
          <Link href="/reviews" className="hover:text-slate-300">Обзоры</Link>
          <ChevronRight size={14} />
          <span className="text-slate-300">{service.name}</span>
        </div>
      </div>

      {/* Hero */}
      <div className="relative overflow-hidden py-8 mb-8">
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{background:`radial-gradient(ellipse at 20% 50%, ${service.accentColor}60 0%, transparent 60%)`}} />
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <BrandLogo
              website={service.website}
              name={service.name}
              logo={service.logo} logoUrl={service.logoUrl}
              accentColor={service.accentColor}
              size="lg"
            />
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="section-title text-3xl md:text-4xl text-white">{service.name}</h1>
                {service.badge && <span className="badge badge-featured">{service.badge}</span>}
              </div>
              <p className="text-slate-400 text-lg mb-3">{service.tagline}</p>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <StarRating value={service.rating} size={18} />
                  <span className="text-white font-700 text-lg" style={{fontFamily:'Exo 2, sans-serif'}}>{service.rating}</span>
                  <span className="text-slate-500 text-sm">({service.reviewCount.toLocaleString()} отзывов)</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <Shield size={14} className="text-green-400" />
                  <span className="truncate max-w-xs">{service.license}</span>
                </div>
              </div>
            </div>
            <div className="shrink-0 flex flex-col gap-2 w-full md:w-56">
              <a href={service.refUrl || service.website} target="_blank" rel="noopener noreferrer nofollow"
                className="btn-neon justify-center px-6 py-3 text-base">
                Играть в {service.name} <ExternalLink size={16} />
              </a>
              <p className="text-center text-xs text-slate-500">
                Бонус: <span style={{color:service.accentColor}} className="font-600">{service.mainBonus}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* ── Main content ── */}
          <div className="lg:col-span-2 flex flex-col gap-6">

            {/* Quick features */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { icon: Calendar,   label: 'Основано',       value: service.founded.toString() },
                { icon: CreditCard, label: 'Мин. депозит',   value: `${service.minDeposit} ₽` },
                { icon: Smartphone, label: 'Приложение',     value: service.hasMobileApp ? 'Есть' : 'Нет' },
                { icon: Zap,        label: 'Live-ставки',    value: service.hasLiveBetting ? 'Есть' : 'Нет' },
                { icon: Clock,      label: 'Быстрый вывод',  value: service.hasFastWithdrawal ? 'Да' : 'Нет' },
                { icon: Shield,     label: 'Лицензия',       value: service.license.split(' ')[0] },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="glass rounded-xl p-3 flex items-center gap-3">
                  <Icon size={16} className="text-purple-400 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs text-slate-500 truncate">{label}</p>
                    <p className="text-sm text-white font-500 truncate">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Screenshot */}
            <SiteScreenshot
              website={service.website}
              refUrl={service.refUrl}
              name={service.name}
              accentColor={service.accentColor}
              mainBonus={service.mainBonus}
              rating={service.rating}
              license={service.license}
            />

            {/* Full description */}
            <div className="service-card p-6">
              <h2 className="section-title text-xl text-white mb-4">Обзор {service.name}</h2>
              {service.fullDescription.split('\n\n').map((para, i) => (
                <p key={i} className="text-slate-400 leading-relaxed mb-4 last:mb-0">{para}</p>
              ))}
            </div>

            {/* Pros & Cons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="service-card p-5">
                <h3 className="text-green-400 font-700 mb-4 flex items-center gap-2" style={{fontFamily:'Exo 2, sans-serif'}}>
                  <span className="w-6 h-6 rounded-full bg-green-400/15 flex items-center justify-center">
                    <Check size={14} className="text-green-400" />
                  </span>
                  Преимущества
                </h3>
                <ul className="space-y-2">
                  {service.pros.map(pro => (
                    <li key={pro} className="flex items-start gap-2 text-sm text-slate-300">
                      <Check size={14} className="text-green-400 mt-0.5 shrink-0" /> {pro}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="service-card p-5">
                <h3 className="text-red-400 font-700 mb-4 flex items-center gap-2" style={{fontFamily:'Exo 2, sans-serif'}}>
                  <span className="w-6 h-6 rounded-full bg-red-400/15 flex items-center justify-center">
                    <X size={14} className="text-red-400" />
                  </span>
                  Недостатки
                </h3>
                <ul className="space-y-2">
                  {service.cons.map(con => (
                    <li key={con} className="flex items-start gap-2 text-sm text-slate-300">
                      <X size={14} className="text-red-400 mt-0.5 shrink-0" /> {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bonuses */}
            {service.bonuses.length > 0 && (
              <div className="service-card p-6">
                <h2 className="section-title text-xl text-white mb-5">Бонусы и акции</h2>
                <div className="space-y-3">
                  {service.bonuses.map(bonus => (
                    <div key={bonus.title} className="flex items-start gap-4 p-4 rounded-xl"
                      style={{background:`${service.accentColor}08`, border:`1px solid ${service.accentColor}20`}}>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
                        style={{background:`${service.accentColor}15`}}>
                        {bonus.type === 'freespins' ? '🎰' : bonus.type === 'cashback' ? '💰' : bonus.type === 'registration' ? '🎁' : '💎'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 flex-wrap">
                          <div>
                            <p className="text-white font-600 text-sm" style={{fontFamily:'Exo 2, sans-serif'}}>{bonus.title}</p>
                            <p className="text-slate-400 text-xs mt-0.5">{bonus.description}</p>
                          </div>
                          <span className="badge badge-featured shrink-0 text-xs">{bonusTypeLabel[bonus.type]}</span>
                        </div>
                        <div className="flex flex-wrap gap-3 mt-2 text-xs text-slate-500">
                          <span>💰 <strong className="text-slate-300">{bonus.amount}</strong></span>
                          <span>🔄 <strong className="text-slate-300">{bonus.wagering}</strong></span>
                          {bonus.validDays > 0 && <span>📅 {bonus.validDays} дней</span>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Payment methods */}
            {service.paymentMethods.length > 0 && (
              <div className="service-card p-6">
                <h2 className="section-title text-xl text-white mb-5">Способы оплаты</h2>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[400px]">
                    <thead>
                      <tr className="border-b border-purple-900/20">
                        <th className="pb-3 text-left text-xs text-slate-500 font-500">Метод</th>
                        <th className="pb-3 text-left text-xs text-slate-500 font-500">Мин. депозит</th>
                        <th className="pb-3 text-left text-xs text-slate-500 font-500">Макс. вывод</th>
                        <th className="pb-3 text-left text-xs text-slate-500 font-500">Время</th>
                      </tr>
                    </thead>
                    <tbody>
                      {service.paymentMethods.map(pm => (
                        <tr key={pm.name} className="border-b border-purple-900/10">
                          <td className="py-3 text-sm text-white">{pm.icon} {pm.name}</td>
                          <td className="py-3 text-sm text-slate-300">{pm.minDeposit} ₽</td>
                          <td className="py-3 text-sm text-slate-300">{pm.maxWithdrawal.toLocaleString()} ₽</td>
                          <td className="py-3 text-sm text-green-400">{pm.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* FAQ */}
            {service.faq.length > 0 && (
              <div className="service-card p-6">
                <h2 className="section-title text-xl text-white mb-5">Частые вопросы о {service.name}</h2>
                <div className="space-y-4">
                  {service.faq.map((item, i) => (
                    <div key={i} className="border-b border-purple-900/20 pb-4 last:border-0 last:pb-0">
                      <h3 className="text-white font-600 text-sm mb-2">{item.question}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews */}
            {service.reviews.length > 0 && (
              <div className="service-card p-6">
                <h2 className="section-title text-xl text-white mb-5">Отзывы игроков</h2>
                <div className="space-y-4">
                  {service.reviews.map((review, i) => (
                    <div key={i} className="p-4 rounded-xl border border-purple-900/15" style={{background:'rgba(255,255,255,0.02)'}}>
                      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-purple-800/40 border border-purple-700/30 flex items-center justify-center text-sm font-600 text-purple-200">
                            {review.avatar}
                          </div>
                          <div>
                            <p className="text-white font-500 text-sm">{review.author}</p>
                            <p className="text-slate-500 text-xs">{new Date(review.date).toLocaleDateString('ru-RU')}</p>
                          </div>
                        </div>
                        <StarRating value={review.rating} size={13} />
                      </div>
                      <p className="text-slate-400 text-sm leading-relaxed">{review.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── Sidebar ── */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 flex flex-col gap-5">

              {/* CTA Card */}
              <div className="service-card p-5">
                <div className="text-center mb-4">
                  <div className="flex justify-center mb-3">
                    <BrandLogo
                      website={service.website}
                      name={service.name}
                      logo={service.logo} logoUrl={service.logoUrl}
                      accentColor={service.accentColor}
                      size="md"
                    />
                  </div>
                  <h3 className="text-white font-700 text-lg mb-1" style={{fontFamily:'Exo 2, sans-serif'}}>{service.name}</h3>
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <StarRating value={service.rating} size={14} />
                    <span className="text-amber-400 font-600">{service.rating}</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl mb-4"
                  style={{background:`${service.accentColor}10`, border:`1px solid ${service.accentColor}25`}}>
                  <p className="text-xs text-slate-400 text-center mb-1">Бонус для новых игроков</p>
                  <p className="text-center font-800 text-base leading-snug"
                    style={{fontFamily:'Exo 2, sans-serif', fontWeight:800, color:service.accentColor}}>
                    {service.mainBonus}
                  </p>
                </div>

                <a href={service.refUrl || service.website} target="_blank" rel="noopener noreferrer nofollow"
                  className="btn-neon w-full justify-center mb-2 text-sm py-2.5">
                  Играть сейчас <ExternalLink size={14} />
                </a>
                <p className="text-center text-xs text-slate-500">Минимальный депозит: {service.minDeposit} ₽</p>

                <div className="mt-4 space-y-2 border-t border-purple-900/20 pt-4">
                  {[
                    service.hasLiveBetting    && '⚡ Live-ставки',
                    service.hasMobileApp      && '📱 Мобильное приложение',
                    service.hasFastWithdrawal && '⚡ Быстрые выплаты',
                    service.hasFreeSpins      && '🎰 Фриспины',
                    service.hasCashback       && '💰 Кэшбек',
                  ].filter(Boolean).map(feature => (
                    <div key={feature as string} className="flex items-center gap-2 text-sm text-slate-300">
                      <Check size={13} className="text-green-400 shrink-0" /> {feature}
                    </div>
                  ))}
                </div>
              </div>

              {/* Rating breakdown */}
              <div className="service-card p-5">
                <h3 className="text-white font-700 mb-4" style={{fontFamily:'Exo 2, sans-serif'}}>Детальная оценка</h3>
                {[
                  { label: 'Надёжность', value: +(service.rating * 0.95).toFixed(1) },
                  { label: 'Бонусы',     value: +(service.rating * 0.90).toFixed(1) },
                  { label: 'Выплаты',    value: +(service.hasFastWithdrawal ? service.rating : service.rating * 0.8).toFixed(1) },
                  { label: 'Поддержка',  value: +(service.rating * 0.92).toFixed(1) },
                  { label: 'Мобильность',value: +(service.hasMobileApp ? service.rating : service.rating * 0.7).toFixed(1) },
                ].map(({ label, value }) => (
                  <div key={label} className="mb-3 last:mb-0">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-400">{label}</span>
                      <span className="text-white font-500">{value}</span>
                    </div>
                    <div className="rating-bar">
                      <div className="rating-bar-fill" style={{width:`${(value/5)*100}%`}} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Счётчик просмотров */}
              <div className="service-card p-4 flex items-center justify-between">
                <ViewCounter slug={service.slug} />
                <LiveViewers slug={service.slug} />
              </div>

              {/* Топ недели */}
              <TopWeekWidget />

              {/* Новости */}
              <NewsWidget />


            </div>
          </div>

        </div>
      </div>
    </>
  )
}
