'use client'
import { useState, useEffect } from 'react' // useEffect used by ProviderLogo

interface GameLogoProps {
  name: string
  slug?: string
  icon?: string
  fallbackIcon?: string
  color: string
  size?: 'sm' | 'md' | 'lg'
  providerSlug?: string
}

const sizeMap = {
  sm: { outer: 'w-10 h-10', text: 'text-xl' },
  md: { outer: 'w-14 h-14', text: 'text-3xl' },
  lg: { outer: 'w-20 h-20', text: 'text-5xl' },
}

export function GameLogo({ name, icon, fallbackIcon, color, size = 'md' }: GameLogoProps) {
  const emojiIcon = icon ?? fallbackIcon ?? '🎮'
  const { outer, text } = sizeMap[size]

  return (
    <div
      className={`${outer} rounded-xl flex items-center justify-center shrink-0`}
      style={{ background: `${color}18`, border: `2px solid ${color}30` }}
    >
      <span className={text}>{emojiIcon}</span>
    </div>
  )
}

// ProviderLogo — отдельный компонент для провайдера
interface ProviderLogoProps {
  slug: string
  name: string
  icon?: string
  fallbackIcon?: string
  color: string
  size?: 'sm' | 'md' | 'lg'
}

export function ProviderLogo({ slug, name, icon, fallbackIcon, color, size = 'md' }: ProviderLogoProps) {
  const emojiIcon = icon ?? fallbackIcon ?? '🎰'
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
        <span className={text}>{emojiIcon}</span>
      )}
    </div>
  )
}
