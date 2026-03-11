'use client'
import { ExternalLink, Globe, Shield, Star } from 'lucide-react'

interface SiteScreenshotProps {
  website: string
  name: string
  accentColor: string
  mainBonus: string
  rating: number
  license: string
}

export function SiteScreenshot({ website, name, accentColor, mainBonus, rating, license }: SiteScreenshotProps) {
  const domain = website.replace(/https?:\/\//, '').replace(/\/$/, '').split('/')[0]

  return (
    <div className="service-card overflow-hidden">
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 px-3 py-2.5 border-b border-white/5"
        style={{background:'rgba(255,255,255,0.04)'}}>
        <span className="w-3 h-3 rounded-full bg-red-500/70" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <span className="w-3 h-3 rounded-full bg-green-500/70" />
        <div className="flex-1 mx-3 px-3 py-1 rounded-md flex items-center gap-2"
          style={{background:'rgba(255,255,255,0.06)'}}>
          <Shield size={11} className="text-green-400 shrink-0" />
          <span className="text-slate-400 text-xs truncate">{website}</span>
        </div>
      </div>

      {/* Site preview card */}
      <div className="relative p-6 min-h-[180px] flex flex-col justify-between overflow-hidden"
        style={{background:`linear-gradient(135deg, ${accentColor}18 0%, rgba(7,11,36,0.95) 60%)`}}>

        {/* Background glow */}
        <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-20 pointer-events-none"
          style={{background:`radial-gradient(circle, ${accentColor} 0%, transparent 70%)`, transform:'translate(30%,-30%)'}} />

        {/* Top row */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Globe size={14} style={{color: accentColor}} />
              <span className="text-xs text-slate-400">{domain}</span>
            </div>
            <h3 className="text-white font-800 text-2xl mb-1" style={{fontFamily:'Exo 2, sans-serif', fontWeight:800}}>
              {name}
            </h3>
            <div className="flex items-center gap-1.5">
              {Array.from({length:5},(_,i)=>(
                <Star key={i} size={13} className={i < Math.floor(rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-600'} />
              ))}
              <span className="text-amber-400 text-sm font-600 ml-1">{rating}</span>
            </div>
          </div>
          <a href={website} target="_blank" rel="noopener noreferrer nofollow"
            className="shrink-0 flex items-center gap-1.5 text-xs px-4 py-2 rounded-xl font-600 text-white transition-opacity hover:opacity-80"
            style={{background: accentColor, fontFamily:'Exo 2, sans-serif'}}>
            Открыть <ExternalLink size={12} />
          </a>
        </div>

        {/* Bonus block */}
        <div className="mt-5 p-3 rounded-xl flex items-center gap-3"
          style={{background:'rgba(0,0,0,0.3)', border:`1px solid ${accentColor}30`}}>
          <span className="text-2xl shrink-0">🎁</span>
          <div>
            <p className="text-xs text-slate-500 mb-0.5">Приветственный бонус</p>
            <p className="font-700 text-sm" style={{color: accentColor, fontFamily:'Exo 2, sans-serif', fontWeight:700}}>
              {mainBonus}
            </p>
          </div>
        </div>

        {/* License */}
        <div className="mt-3 flex items-center gap-2">
          <Shield size={12} className="text-green-400 shrink-0" />
          <span className="text-xs text-slate-500">{license}</span>
        </div>
      </div>
    </div>
  )
}
