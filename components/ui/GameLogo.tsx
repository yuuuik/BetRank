'use client'
import { useState, useEffect } from 'react'

interface GameLogoProps {
  name: string
  icon: string          // эмодзи fallback
  color: string
  size?: 'sm' | 'md' | 'lg'
  providerSlug?: string // для попытки загрузить лого провайдера
}

// Словарь реальных лого игр через скриншоты/иконки провайдеров
const PROVIDER_LOGO_URLS: Record<string, string> = {
  'pragmatic-play':  'https://img.logo.dev/pragmaticplay.com?token=pk_X-1ZO13GSgeOoUrIuJ6BeQ',
  'spribe':          'https://img.logo.dev/spribe.co?token=pk_X-1ZO13GSgeOoUrIuJ6BeQ',
  '1win-games':      'https://img.logo.dev/1win.com?token=pk_X-1ZO13GSgeOoUrIuJ6BeQ',
  'evolution':       'https://img.logo.dev/evolution.com?token=pk_X-1ZO13GSgeOoUrIuJ6BeQ',
  'novomatic':       'https://img.logo.dev/novomatic.com?token=pk_X-1ZO13GSgeOoUrIuJ6BeQ',
  'hacksaw':         'https://img.logo.dev/hacksawgaming.com?token=pk_X-1ZO13GSgeOoUrIuJ6BeQ',
  'bgaming':         'https://img.logo.dev/bgaming.com?token=pk_X-1ZO13GSgeOoUrIuJ6BeQ',
  'push-gaming':     'https://img.logo.dev/pushgaming.com?token=pk_X-1ZO13GSgeOoUrIuJ6BeQ',
  'nolimit-city':    'https://img.logo.dev/nolimitcity.com?token=pk_X-1ZO13GSgeOoUrIuJ6BeQ',
  'playn-go':        'https://img.logo.dev/playngo.com?token=pk_X-1ZO13GSgeOoUrIuJ6BeQ',
  'netent':          'https://img.logo.dev/netent.com?token=pk_X-1ZO13GSgeOoUrIuJ6BeQ',
}

const sizeMap = {
  sm: { outer: 'w-10 h-10', text: 'text-xl' },
  md: { outer: 'w-14 h-14', text: 'text-3xl' },
  lg: { outer: 'w-20 h-20', text: 'text-5xl' },
}

export function GameLogo({ name, icon, color, size = 'md', providerSlug }: GameLogoProps) {
  const [imgUrl, setImgUrl] = useState<string | null>(null)
  const [failed, setFailed] = useState(false)
  const { outer, text } = sizeMap[size]

  useEffect(() => {
    if (!providerSlug) return
    const url = PROVIDER_LOGO_URLS[providerSlug]
    if (!url) return
    const img = new Image()
    img.onload = () => setImgUrl(url)
    img.onerror = () => setFailed(true)
    img.src = url
  }, [providerSlug])

  return (
    <div
      className={`${outer} rounded-xl flex items-center justify-center shrink-0 overflow-hidden`}
      style={{ background: `${color}18`, border: `2px solid ${color}30` }}
    >
      {imgUrl && !failed ? (
        <img
          src={imgUrl}
          alt={name}
          className="w-full h-full object-contain p-1.5"
          onError={() => setFailed(true)}
        />
      ) : (
        <span className={text}>{icon}</span>
      )}
    </div>
  )
}

// ProviderLogo — отдельный компонент для провайдера
interface ProviderLogoProps {
  slug: string
  name: string
  icon: string
  color: string
  size?: 'sm' | 'md' | 'lg'
}

export function ProviderLogo({ slug, name, icon, color, size = 'md' }: ProviderLogoProps) {
  const [imgUrl, setImgUrl] = useState<string | null>(null)
  const [failed, setFailed] = useState(false)
  const { outer, text } = sizeMap[size]

  useEffect(() => {
    const url = PROVIDER_LOGO_URLS[slug]
    if (!url) return
    const img = new Image()
    img.onload = () => setImgUrl(url)
    img.onerror = () => setFailed(true)
    img.src = url
  }, [slug])

  return (
    <div
      className={`${outer} rounded-xl flex items-center justify-center shrink-0 overflow-hidden`}
      style={{ background: `${color}18`, border: `2px solid ${color}30` }}
    >
      {imgUrl && !failed ? (
        <img
          src={imgUrl}
          alt={name}
          className="w-full h-full object-contain p-1.5"
          onError={() => setFailed(true)}
        />
      ) : (
        <span className={text}>{icon}</span>
      )}
    </div>
  )
}
