'use client'
import { useState } from 'react'

// Прямые URL логотипов провайдеров — без async probing
const PROVIDER_LOGO_URLS: Record<string, string> = {
  'pragmatic-play':  'https://img.logo.dev/pragmaticplay.com?token=pk_X2xMsTkTSPuWj4MJblmstw&size=128',
  'evolution':       'https://img.logo.dev/evolution.com?token=pk_X2xMsTkTSPuWj4MJblmstw&size=128',
  'spribe':          'https://img.logo.dev/spribe.co?token=pk_X2xMsTkTSPuWj4MJblmstw&size=128',
  'novomatic':       'https://img.logo.dev/novomatic.com?token=pk_X2xMsTkTSPuWj4MJblmstw&size=128',
  'netent':          'https://img.logo.dev/netent.com?token=pk_X2xMsTkTSPuWj4MJblmstw&size=128',
  'hacksaw-gaming':  'https://img.logo.dev/hacksawgaming.com?token=pk_X2xMsTkTSPuWj4MJblmstw&size=128',
  'bgaming':         'https://img.logo.dev/bgaming.com?token=pk_X2xMsTkTSPuWj4MJblmstw&size=128',
  '1win-games':      'https://img.logo.dev/1win.com?token=pk_X2xMsTkTSPuWj4MJblmstw&size=128',
  'playn-go':        'https://img.logo.dev/playngo.com?token=pk_X2xMsTkTSPuWj4MJblmstw&size=128',
  'push-gaming':     'https://img.logo.dev/pushgaming.com?token=pk_X2xMsTkTSPuWj4MJblmstw&size=128',
  'nolimit-city':    'https://img.logo.dev/nolimitcity.com?token=pk_X2xMsTkTSPuWj4MJblmstw&size=128',
  'red-tiger':       'https://img.logo.dev/redtigergaming.com?token=pk_X2xMsTkTSPuWj4MJblmstw&size=128',
  'yggdrasil':       'https://img.logo.dev/yggdrasilgaming.com?token=pk_X2xMsTkTSPuWj4MJblmstw&size=128',
  'relax-gaming':    'https://img.logo.dev/relaxgaming.com?token=pk_X2xMsTkTSPuWj4MJblmstw&size=128',
  'big-time-gaming': 'https://img.logo.dev/bigtimegaming.com?token=pk_X2xMsTkTSPuWj4MJblmstw&size=128',
  'microgaming':     'https://img.logo.dev/microgaming.co.uk?token=pk_X2xMsTkTSPuWj4MJblmstw&size=128',
  'wazdan':          'https://img.logo.dev/wazdan.com?token=pk_X2xMsTkTSPuWj4MJblmstw&size=128',
  'elk':             'https://img.logo.dev/elkstudios.com?token=pk_X2xMsTkTSPuWj4MJblmstw&size=128',
  'quickspin':       'https://img.logo.dev/quickspin.com?token=pk_X2xMsTkTSPuWj4MJblmstw&size=128',
  'endorphina':      'https://img.logo.dev/endorphina.com?token=pk_X2xMsTkTSPuWj4MJblmstw&size=128',
}

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
