'use client'
import { useState, useEffect } from 'react'
import { Clock } from 'lucide-react'

interface CountdownTimerProps {
  targetDate: string // ISO string
  label?: string
  accentColor?: string
}

export function CountdownTimer({ targetDate, label = 'Предложение истекает через', accentColor = '#a855f7' }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({ h: 0, m: 0, s: 0 })
  const [expired, setExpired] = useState(false)

  useEffect(() => {
    const calc = () => {
      const diff = new Date(targetDate).getTime() - Date.now()
      if (diff <= 0) { setExpired(true); return }
      const h = Math.floor(diff / 3600000)
      const m = Math.floor((diff % 3600000) / 60000)
      const s = Math.floor((diff % 60000) / 1000)
      setTimeLeft({ h, m, s })
    }
    calc()
    const id = setInterval(calc, 1000)
    return () => clearInterval(id)
  }, [targetDate])

  if (expired) return (
    <div className="text-xs text-red-400 flex items-center gap-1">
      <Clock size={11} /> Предложение завершено
    </div>
  )

  const pad = (n: number) => String(n).padStart(2, '0')

  return (
    <div className="flex items-center gap-2">
      <Clock size={12} style={{ color: accentColor }} />
      <span className="text-xs text-slate-400">{label}</span>
      <div className="flex items-center gap-1 font-mono">
        {[pad(timeLeft.h), pad(timeLeft.m), pad(timeLeft.s)].map((val, i) => (
          <span key={i} className="flex items-center gap-1">
            <span className="px-1.5 py-0.5 rounded text-xs font-700 text-white"
              style={{ background: `${accentColor}25`, border: `1px solid ${accentColor}40`, fontFamily: 'monospace' }}>
              {val}
            </span>
            {i < 2 && <span className="text-slate-500 text-xs">:</span>}
          </span>
        ))}
      </div>
    </div>
  )
}

// Баннер "горячее предложение" с таймером
export function HotDealBanner({
  title, description, accentColor = '#a855f7', expiresAt, ctaText = 'Получить', ctaHref,
}: {
  title: string; description: string; accentColor?: string
  expiresAt: string; ctaText?: string; ctaHref: string
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl p-5 border"
      style={{ background: `linear-gradient(135deg, ${accentColor}15, ${accentColor}05)`, borderColor: `${accentColor}30` }}>
      {/* Glow */}
      <div className="absolute top-0 right-0 w-40 h-40 rounded-full pointer-events-none opacity-20"
        style={{ background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)`, transform: 'translate(30%, -30%)' }} />

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 relative">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-600 px-2 py-0.5 rounded-full text-white"
              style={{ background: accentColor }}>🔥 Горячее</span>
          </div>
          <h3 className="text-white font-700 text-base mb-1" style={{ fontFamily: 'Exo 2, sans-serif' }}>{title}</h3>
          <p className="text-slate-400 text-sm mb-2">{description}</p>
          <CountdownTimer targetDate={expiresAt} accentColor={accentColor} />
        </div>
        <a href={ctaHref} target="_blank" rel="noopener noreferrer nofollow"
          className="btn-neon shrink-0 text-sm" style={{ '--neon-color': accentColor } as any}>
          {ctaText}
        </a>
      </div>
    </div>
  )
}
