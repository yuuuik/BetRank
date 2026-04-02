'use client'
import { useState } from 'react'

const PROVIDER_LOGO_URLS: Record<string, string> = {}

// ─── ProviderLogo ───────────────────────────────────────────────────────────
interface ProviderLogoProps {
  slug: string
  name: string
  fallbackIcon: string
  color: string
  size?: 'xs' | 'sm' | 'md' | 'lg'
  icon?: string
}

export function ProviderLogo({ slug, name, fallbackIcon, icon, color, size = 'md' }: ProviderLogoProps) {
  const emoji = icon ?? fallbackIcon
  const logoUrl = PROVIDER_LOGO_URLS[slug] ?? null
  const [failed, setFailed] = useState(false)

  const dims: Record<string, number> = { xs: 28, sm: 36, md: 48, lg: 64 }
  const radii: Record<string, string> = { xs: '7px', sm: '9px', md: '12px', lg: '16px' }
  const textSz: Record<string, number> = { xs: 9, sm: 11, md: 14, lg: 18 }
  const box = dims[size]
  const br  = radii[size]
  const ts  = textSz[size]

  return (
    <div style={{
      width: box, height: box, minWidth: box, borderRadius: br, flexShrink: 0,
      background: `linear-gradient(135deg, ${color}30, ${color}15)`,
      border: `1.5px solid ${color}40`,
      display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
    }}>
      {logoUrl && !failed
        ? <img src={logoUrl} alt={name} width={box - 6} height={box - 6}
            style={{ objectFit: 'contain', padding: '3px' }}
            onError={() => setFailed(true)} />
        : <span style={{ fontSize: ts * 1.6, lineHeight: 1 }}>{emoji}</span>
      }
    </div>
  )
}

// ─── GameLogo ───────────────────────────────────────────────────────────────
interface GameLogoProps {
  slug: string
  providerSlug: string
  name: string
  fallbackIcon: string
  color: string
  size?: 'xs' | 'sm' | 'md' | 'lg'
}

export function GameLogo({ fallbackIcon, color, size = 'md' }: GameLogoProps) {
  const dims: Record<string, number> = { xs: 28, sm: 40, md: 56, lg: 80 }
  const radii: Record<string, string> = { xs: '7px', sm: '10px', md: '14px', lg: '18px' }
  const textSz: Record<string, number> = { xs: 9, sm: 12, md: 15, lg: 20 }
  const box = dims[size]
  const br  = radii[size]
  const ts  = textSz[size]

  return (
    <div style={{
      width: box, height: box, minWidth: box, borderRadius: br, flexShrink: 0,
      background: `linear-gradient(145deg, ${color}40, ${color}18)`,
      border: `2px solid ${color}55`,
      boxShadow: `0 3px 14px ${color}30`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <span style={{ fontSize: ts * 1.8, lineHeight: 1 }}>{fallbackIcon}</span>
    </div>
  )
}
