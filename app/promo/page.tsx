import { Metadata } from 'next'
import Link from 'next/link'
import { promoCodes } from '@/lib/promos'
import { BrandLogo } from '@/components/ui/BrandLogo'
import { CountdownTimer } from '@/components/widgets/CountdownTimer'
import { EmailSubscribe } from '@/components/widgets/EmailSubscribe'
import { Copy, ExternalLink, CheckCircle, Flame, Gift } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Промокоды казино и букмекеров 2026 — Эксклюзивные коды BetRank',
  description: 'Эксклюзивные промокоды для казино и букмекеров 2026. Бесплатные фрибеты, фриспины и бонусы по промокодам только на BetRank.',
}

const typeLabel: Record<string, string> = {
  freebet: '🎯 Фрибет', freespins: '🎰 Фриспины',
  deposit: '💰 На депозит', cashback: '♻️ Кэшбек', nodep: '🎁 Без депозита',
}
const typeColor: Record<string, string> = {
  freebet: '#38bdf8', freespins: '#f97316', deposit: '#a855f7',
  cashback: '#4ade80', nodep: '#e879f9',
}

export default function PromoPage() {
  const exclusive = promoCodes.filter(p => p.exclusive)
  const regular = promoCodes.filter(p => !p.exclusive)

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link href="/" className="hover:text-slate-300">Главная</Link>
        <span>/</span>
        <span className="text-slate-300">Промокоды</span>
      </div>

      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl p-8 md:p-12 mb-10 text-center border border-purple-700/30"
        style={{ background: 'linear-gradient(135deg, rgba(168,85,247,0.12), rgba(56,189,248,0.06))' }}>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-96 h-96 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #a855f7 0%, transparent 70%)' }} />
        </div>
        <div className="relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-500/40 bg-orange-900/20 text-orange-300 text-sm mb-4">
            <Flame size={14} /> {promoCodes.length} активных промокодов
          </div>
          <h1 className="section-title text-3xl md:text-4xl text-white mb-3">Эксклюзивные промокоды 2026</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Промокоды только для читателей BetRank. Введите код при регистрации и получите увеличенный бонус.
          </p>
        </div>
      </div>

      {/* Как использовать */}
      <div className="glass rounded-2xl border border-purple-900/20 p-6 mb-10">
        <h2 className="section-title text-xl text-white mb-4">Как использовать промокод</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { step: '1', icon: '📋', text: 'Скопируйте промокод нажав на кнопку' },
            { step: '2', icon: '📝', text: 'Перейдите на сайт и зарегистрируйтесь' },
            { step: '3', icon: '🎁', text: 'Вставьте код в поле "Промокод" при регистрации или депозите' },
          ].map(({ step, icon, text }) => (
            <div key={step} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-900/40 border border-purple-700/40 flex items-center justify-center text-purple-300 font-700 text-sm shrink-0">
                {step}
              </div>
              <p className="text-slate-400 text-sm">{icon} {text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Эксклюзивные */}
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 rounded-xl bg-orange-900/30 border border-orange-700/30 flex items-center justify-center">
          <Flame size={16} className="text-orange-400" />
        </div>
        <div>
          <h2 className="section-title text-2xl text-white">Эксклюзивные промокоды BetRank</h2>
          <p className="text-slate-500 text-sm">Только у нас — улучшенные условия</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
        {exclusive.map(promo => (
          <PromoCard key={promo.slug} promo={promo} />
        ))}
      </div>

      {/* Обычные */}
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 rounded-xl bg-purple-900/30 border border-purple-700/30 flex items-center justify-center">
          <Gift size={16} className="text-purple-400" />
        </div>
        <h2 className="section-title text-2xl text-white">Актуальные промокоды</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
        {regular.map(promo => (
          <PromoCard key={promo.slug} promo={promo} />
        ))}
      </div>

      <EmailSubscribe />
    </div>
  )
}

function PromoCard({ promo }: { promo: (typeof promoCodes)[0] }) {
  const color = typeColor[promo.type] || '#a855f7'
  return (
    <div className="service-card p-5 relative overflow-hidden">
      {promo.exclusive && (
        <div className="absolute top-3 right-3">
          <span className="text-xs px-2 py-0.5 rounded-full bg-orange-900/40 text-orange-300 border border-orange-700/30 font-600">
            🔥 Эксклюзив
          </span>
        </div>
      )}

      {/* Сервис */}
      <div className="flex items-center gap-3 mb-4">
        <BrandLogo website={promo.serviceWebsite} name={promo.serviceName}
          logo={promo.serviceLogo} accentColor={promo.serviceAccent} size="sm" />
        <div>
          <p className="text-white font-700 text-sm" style={{ fontFamily: 'Exo 2, sans-serif' }}>{promo.serviceName}</p>
          <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: `${color}20`, color, border: `1px solid ${color}30` }}>
            {typeLabel[promo.type]}
          </span>
        </div>
      </div>

      <p className="text-white font-600 text-base mb-1" style={{ fontFamily: 'Exo 2, sans-serif' }}>{promo.title}</p>
      <p className="text-slate-400 text-sm mb-3">{promo.description}</p>

      {/* Сумма */}
      <div className="p-3 rounded-xl mb-4" style={{ background: `${color}10`, border: `1px solid ${color}20` }}>
        <p className="text-xs text-slate-500 mb-0.5">Размер бонуса</p>
        <p className="font-800 text-lg" style={{ fontFamily: 'Exo 2, sans-serif', fontWeight: 800, color }}>{promo.amount}</p>
        <p className="text-xs text-slate-500 mt-1">Вейджер: {promo.wagering} · До {new Date(promo.validUntil).toLocaleDateString('ru-RU')}</p>
      </div>

      <CountdownTimer
        targetDate={new Date(new Date(promo.validUntil).setHours(23, 59, 59)).toISOString()}
        label="Истекает"
        accentColor={color}
      />

      {/* Код + кнопка */}
      <div className="flex items-center gap-2 mt-4">
        <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-xl border border-dashed text-center"
          style={{ borderColor: `${color}40`, background: `${color}08` }}>
          <span className="text-white font-mono font-700 tracking-widest text-sm flex-1 text-center">
            {promo.code}
          </span>
          <Copy size={14} className="text-slate-500 shrink-0" />
        </div>
        <a href={promo.serviceWebsite} target="_blank" rel="noopener noreferrer nofollow"
          className="btn-neon text-sm px-4 shrink-0">
          Перейти <ExternalLink size={12} />
        </a>
      </div>

      {promo.verified && (
        <p className="flex items-center gap-1 text-xs text-emerald-400/70 mt-2">
          <CheckCircle size={11} /> Проверено редакцией BetRank
        </p>
      )}
    </div>
  )
}
