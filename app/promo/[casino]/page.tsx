'use client'
import { useState } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { promoCodes } from '@/lib/promos'
import { ChevronRight, Copy, Check, ExternalLink, Shield, Clock, Star, Gift, AlertCircle } from 'lucide-react'

const typeLabels: Record<string, string> = {
  deposit: 'На депозит',
  nodep: 'Без депозита',
  freespins: 'Фриспины',
  freebet: 'Фрибет',
  cashback: 'Кэшбек',
}

const typeColors: Record<string, string> = {
  deposit: '#a855f7',
  nodep: '#22c55e',
  freespins: '#f59e0b',
  freebet: '#3b82f6',
  cashback: '#f43f5e',
}

function PromoContent({ casino }: { casino: string }) {
  const promo = promoCodes.find(p => p.serviceSlug === casino)
  if (!promo) notFound()

  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(promo.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const typeColor = typeColors[promo.type] || '#a855f7'
  const typeLabel = typeLabels[promo.type] || promo.type

  const steps = promo.type === 'nodep'
    ? [
        'Нажмите кнопку «Получить бонус» ниже',
        `Зарегистрируйтесь на сайте ${promo.serviceName}`,
        `Введите промокод ${promo.code} в поле для промокодов`,
        'Бонус начислится автоматически без депозита',
      ]
    : [
        'Нажмите кнопку «Получить бонус» ниже',
        `Зарегистрируйтесь на сайте ${promo.serviceName}`,
        `Введите промокод ${promo.code} при регистрации`,
        'Сделайте первый депозит — бонус активируется автоматически',
      ]

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-1.5 text-sm text-slate-500 mb-6 flex-wrap">
        <Link href="/" className="hover:text-slate-300">Главная</Link>
        <ChevronRight size={13} />
        <Link href="/promo" className="hover:text-slate-300">Промокоды</Link>
        <ChevronRight size={13} />
        <span className="text-slate-300">{promo.serviceName}</span>
      </div>

      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl p-8 mb-8 border"
        style={{ background: `linear-gradient(135deg, ${typeColor}15, ${typeColor}05)`, borderColor: `${typeColor}25` }}>
        <div className="flex flex-col sm:flex-row sm:items-start gap-6">
          <div className="text-5xl shrink-0">{promo.serviceLogo}</div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-xs px-2.5 py-1 rounded-full font-600"
                style={{ background: `${typeColor}20`, color: typeColor, border: `1px solid ${typeColor}30` }}>
                {typeLabel}
              </span>
              {promo.exclusive && (
                <span className="text-xs px-2.5 py-1 rounded-full bg-amber-900/30 text-amber-300 border border-amber-700/30 font-600">
                  Эксклюзив BetRank
                </span>
              )}
              {promo.verified && (
                <span className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-green-900/30 text-green-400 border border-green-700/30">
                  <Shield size={10} /> Проверен
                </span>
              )}
            </div>
            <h1 className="text-2xl md:text-3xl font-800 text-white mb-1" style={{ fontFamily: 'Exo 2, sans-serif' }}>
              Промокод {promo.serviceName} 2026
            </h1>
            <p className="text-slate-400 text-lg mb-2">{promo.title}</p>
            <p className="text-slate-500 text-sm">{promo.description}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        {/* Promo code box */}
        <div className="md:col-span-3 glass rounded-2xl border border-purple-900/20 p-6">
          <p className="text-slate-500 text-sm mb-3 flex items-center gap-2">
            <Gift size={14} /> Ваш промокод
          </p>
          <div className="flex gap-3 mb-5">
            <div className="flex-1 flex items-center justify-center rounded-xl border-2 border-dashed px-4 py-3 text-xl font-800 tracking-widest select-all"
              style={{ borderColor: `${typeColor}50`, color: typeColor, background: `${typeColor}10`, fontFamily: 'Exo 2, sans-serif' }}>
              {promo.code}
            </div>
            <button onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-3 rounded-xl font-600 text-sm transition-all shrink-0"
              style={{ background: copied ? '#22c55e20' : `${typeColor}20`, color: copied ? '#22c55e' : typeColor, border: `1px solid ${copied ? '#22c55e40' : `${typeColor}40`}` }}>
              {copied ? <><Check size={15} /> Скопировано</> : <><Copy size={15} /> Скопировать</>}
            </button>
          </div>

          <a href={promo.refUrl || promo.serviceWebsite} target="_blank" rel="noopener noreferrer nofollow"
            className="btn-neon w-full justify-center text-base py-3.5 font-700 mb-3">
            Получить бонус <ExternalLink size={16} />
          </a>
          <p className="text-center text-xs text-slate-600">
            Нажимая кнопку, вы переходите на официальный сайт {promo.serviceName}
          </p>
        </div>

        {/* Details */}
        <div className="md:col-span-2 glass rounded-2xl border border-purple-900/20 p-6 flex flex-col gap-4">
          <p className="text-slate-400 text-sm font-600 uppercase tracking-wider">Параметры бонуса</p>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 text-sm">Сумма</span>
              <span className="text-white font-700 text-sm" style={{ fontFamily: 'Exo 2, sans-serif' }}>{promo.amount}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 text-sm">Вейджер</span>
              <span className="text-white font-700 text-sm" style={{ fontFamily: 'Exo 2, sans-serif' }}>{promo.wagering}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 text-sm">Тип</span>
              <span className="text-sm font-600" style={{ color: typeColor }}>{typeLabel}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 text-sm">Действует до</span>
              <span className="text-white text-sm flex items-center gap-1">
                <Clock size={12} className="text-slate-500" />
                {new Date(promo.validUntil).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 text-sm">Рейтинг</span>
              <span className="flex items-center gap-1 text-amber-400 text-sm font-600">
                <Star size={12} className="fill-amber-400" /> 4.8
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="glass rounded-2xl border border-purple-900/20 p-6 mb-8">
        <h2 className="text-white font-700 text-lg mb-5" style={{ fontFamily: 'Exo 2, sans-serif' }}>
          Как активировать промокод {promo.serviceName}
        </h2>
        <div className="flex flex-col gap-4">
          {steps.map((step, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-700 shrink-0 mt-0.5"
                style={{ background: `${typeColor}20`, color: typeColor, border: `1px solid ${typeColor}30`, fontFamily: 'Exo 2, sans-serif' }}>
                {i + 1}
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">{step}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-800/30 border border-slate-700/30 mb-8">
        <AlertCircle size={16} className="text-slate-500 shrink-0 mt-0.5" />
        <p className="text-slate-500 text-xs leading-relaxed">
          Промокоды предоставлены в ознакомительных целях. Условия бонусов могут меняться — проверяйте актуальную информацию на официальном сайте казино. Играйте ответственно.
        </p>
      </div>

      {/* Other promos */}
      <h2 className="text-white font-700 text-xl mb-4" style={{ fontFamily: 'Exo 2, sans-serif' }}>
        Другие промокоды казино
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {promoCodes.filter(p => p.serviceSlug !== casino).slice(0, 6).map(p => (
          <Link key={p.slug} href={`/promo/${p.serviceSlug}`}
            className="service-card p-4 flex items-center gap-3 hover:scale-[1.01] transition-transform group">
            <span className="text-2xl shrink-0">{p.serviceLogo}</span>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-600 truncate" style={{ fontFamily: 'Exo 2, sans-serif' }}>
                Промокод {p.serviceName}
              </p>
              <p className="text-slate-500 text-xs truncate">{p.amount}</p>
            </div>
            <span className="text-xs px-2 py-1 rounded-full shrink-0 font-600"
              style={{ background: `${typeColors[p.type] || '#a855f7'}20`, color: typeColors[p.type] || '#a855f7' }}>
              {typeLabels[p.type]}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default function PromoPage({ params }: { params: { casino: string } }) {
  return <PromoContent casino={params.casino} />
}
