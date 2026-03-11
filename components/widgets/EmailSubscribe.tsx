'use client'
import { useState } from 'react'
import { Mail, CheckCircle, ArrowRight } from 'lucide-react'

export function EmailSubscribe({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes('@')) return
    setStatus('loading')
    // Имитация подписки — в реальном проекте здесь POST запрос
    await new Promise(r => setTimeout(r, 800))
    setStatus('success')
  }

  if (compact) return (
    <div className="glass rounded-xl border border-purple-900/20 p-4">
      <div className="flex items-center gap-2 mb-3">
        <Mail size={16} className="text-purple-400" />
        <p className="text-white font-600 text-sm" style={{ fontFamily: 'Exo 2, sans-serif' }}>Новые бонусы на почту</p>
      </div>
      {status === 'success' ? (
        <div className="flex items-center gap-2 text-emerald-400 text-sm">
          <CheckCircle size={16} /> Вы подписаны!
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input type="email" placeholder="ваш@email.ru" value={email}
            onChange={e => setEmail(e.target.value)}
            className="neon-input text-sm flex-1 min-w-0" required />
          <button type="submit" disabled={status === 'loading'}
            className="btn-neon text-sm px-3 shrink-0">
            {status === 'loading' ? '...' : <ArrowRight size={14} />}
          </button>
        </form>
      )}
    </div>
  )

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative overflow-hidden rounded-2xl p-8 md:p-12 text-center border border-purple-700/30"
          style={{ background: 'linear-gradient(135deg, rgba(168,85,247,0.12) 0%, rgba(56,189,248,0.06) 100%)' }}>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-96 h-96 rounded-full opacity-10"
              style={{ background: 'radial-gradient(circle, #a855f7 0%, transparent 70%)' }} />
          </div>
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-purple-900/40 border border-purple-700/40 flex items-center justify-center mx-auto mb-4">
              <Mail size={28} className="text-purple-400" />
            </div>
            <h2 className="section-title text-2xl md:text-3xl text-white mb-3">Получайте лучшие бонусы первыми</h2>
            <p className="text-slate-400 mb-6 max-w-md mx-auto">Подпишитесь на еженедельную подборку: новые промокоды, эксклюзивные фрибеты и актуальные обзоры.</p>
            {status === 'success' ? (
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-emerald-900/30 border border-emerald-700/40 text-emerald-400">
                <CheckCircle size={20} />
                <span className="font-600">Вы подписаны! Первое письмо придёт в пятницу</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input type="email" placeholder="Введите ваш email" value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="neon-input flex-1 text-sm" required />
                <button type="submit" disabled={status === 'loading'}
                  className="btn-neon text-sm px-6 shrink-0">
                  {status === 'loading' ? 'Подписываем...' : 'Подписаться'}
                </button>
              </form>
            )}
            <p className="text-slate-600 text-xs mt-3">Без спама. Только лучшие предложения. Отписаться можно в любой момент.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
