'use client'
import { useState, useEffect } from 'react'

// ─── Реальные логотипы провайдеров через logo.dev / clearbit ───────────────
const PROVIDER_DOMAINS: Record<string, string> = {
  'pragmatic-play':  'pragmaticplay.com',
  'evolution':       'evolution.com',
  'spribe':          'spribe.co',
  'novomatic':       'novomatic.com',
  'netent':          'netent.com',
  'hacksaw-gaming':  'hacksawgaming.com',
  'bgaming':         'bgaming.com',
  '1win-games':      '1win.com',
  'playn-go':        'playngo.com',
  'push-gaming':     'pushgaming.com',
  'nolimit-city':    'nolimitcity.com',
  'relax-gaming':    'relaxgaming.com',
}

// ─── Реальные картинки игр (публичные CDN Pragmatic / Spribe / Evolution) ──
// Pragmatic Play CDN: https://demo.pragmaticplay.net/game-icon/v2/{code}/en.png
// Spribe CDN: https://client.spribe.co/games/{code}/logo.png
// Evolution: iframes/preview
export const GAME_IMAGES: Record<string, string> = {
  // Pragmatic Play slots — официальный CDN
  'gates-of-olympus':   'https://demo.pragmaticplay.net/game-icon/v2/vs20olympgate/en.png',
  'sweet-bonanza':      'https://demo.pragmaticplay.net/game-icon/v2/vs20fruitsw/en.png',
  'dog-house':          'https://demo.pragmaticplay.net/game-icon/v2/vs20doghouse/en.png',
  'big-bass-bonanza':   'https://demo.pragmaticplay.net/game-icon/v2/vs10bbbonanza/en.png',
  'starlight-princess': 'https://demo.pragmaticplay.net/game-icon/v2/vs20starlight/en.png',
  'sugar-rush':         'https://demo.pragmaticplay.net/game-icon/v2/vs20sugarrush/en.png',
  'wolf-gold':          'https://demo.pragmaticplay.net/game-icon/v2/vs25wolfgold/en.png',
  'fruit-party':        'https://demo.pragmaticplay.net/game-icon/v2/vs20fruitparty/en.png',
  'mega-roulette':      'https://demo.pragmaticplay.net/game-icon/v2/cs5megaroul/en.png',
  // Spribe — официальный CDN
  'aviator':    'https://client.spribe.co/games/aviator/logo.png',
  'mines':      'https://client.spribe.co/games/mines/logo.png',
  'plinko':     'https://client.spribe.co/games/plinko/logo.png',
  'dice':       'https://client.spribe.co/games/dice/logo.png',
  // Для остальных — Freepik / общедоступные картинки по игре
  'lucky-jet':          'https://1win.com/apple-touch-icon.png',
  'crazy-time':         'https://img.logo.dev/evolution.com?token=pk_X2xMsTkTSPuWj4MJblmstw&size=128',
  'lightning-roulette': 'https://img.logo.dev/evolution.com?token=pk_X2xMsTkTSPuWj4MJblmstw&size=128',
  'monopoly-live':      'https://img.logo.dev/evolution.com?token=pk_X2xMsTkTSPuWj4MJblmstw&size=128',
  'cash-or-crash':      'https://img.logo.dev/evolution.com?token=pk_X2xMsTkTSPuWj4MJblmstw&size=128',
  'book-of-ra':         'https://img.logo.dev/novomatic.com?token=pk_X2xMsTkTSPuWj4MJblmstw&size=128',
  'book-of-ra-deluxe':  'https://img.logo.dev/novomatic.com?token=pk_X2xMsTkTSPuWj4MJblmstw&size=128',
  'starburst':          'https://img.logo.dev/netent.com?token=pk_X2xMsTkTSPuWj4MJblmstw&size=128',
  'gonzo-quest':        'https://img.logo.dev/netent.com?token=pk_X2xMsTkTSPuWj4MJblmstw&size=128',
  'banana-party':       'https://img.logo.dev/bgaming.com?token=pk_X2xMsTkTSPuWj4MJblmstw&size=128',
  'tower-rush':         'https://img.logo.dev/hacksawgaming.com?token=pk_X2xMsTkTSPuWj4MJblmstw&size=128',
  'squealin-riches':    'https://img.logo.dev/hacksawgaming.com?token=pk_X2xMsTkTSPuWj4MJblmstw&size=128',
}

const imgCache: Record<string, string | 'failed'> = {}

function probeImg(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => (img.naturalWidth > 4 ? resolve(url) : reject())
    img.onerror = () => reject()
    img.src = url
  })
}

async function resolveProviderLogo(slug: string): Promise<string | null> {
  const domain = PROVIDER_DOMAINS[slug]
  if (!domain) return null
  const key = `provider:${slug}`
  if (imgCache[key] !== undefined) return imgCache[key] === 'failed' ? null : imgCache[key] as string

  const sources = [
    `https://img.logo.dev/${domain}?token=pk_X2xMsTkTSPuWj4MJblmstw&size=128`,
    `https://logo.clearbit.com/${domain}`,
    `https://www.google.com/s2/favicons?domain=${domain}&sz=128`,
  ]
  for (const url of sources) {
    try { await probeImg(url); imgCache[key] = url; return url } catch {}
  }
  imgCache[key] = 'failed'
  return null
}

async function resolveGameImage(slug: string): Promise<string | null> {
  const key = `game:${slug}`
  if (imgCache[key] !== undefined) return imgCache[key] === 'failed' ? null : imgCache[key] as string
  const staticUrl = GAME_IMAGES[slug]
  if (!staticUrl) { imgCache[key] = 'failed'; return null }
  try { await probeImg(staticUrl); imgCache[key] = staticUrl; return staticUrl } catch {}
  imgCache[key] = 'failed'
  return null
}

// ─── ProviderLogo ───────────────────────────────────────────────────────────
interface ProviderLogoProps {
  slug: string
  name: string
  fallbackIcon: string
  color: string
  size?: 'xs' | 'sm' | 'md' | 'lg'
}

export function ProviderLogo({ slug, name, fallbackIcon, color, size = 'md' }: ProviderLogoProps) {
  const key = `provider:${slug}`
  const [imgUrl, setImgUrl] = useState<string | null>(
    imgCache[key] && imgCache[key] !== 'failed' ? imgCache[key] as string : null
  )

  const dims: Record<string, number> = { xs: 28, sm: 36, md: 48, lg: 64 }
  const radii: Record<string, string> = { xs: '7px', sm: '9px', md: '12px', lg: '16px' }
  const fsSz: Record<string, string> = { xs: '0.9rem', sm: '1.1rem', md: '1.5rem', lg: '2.2rem' }
  const box = dims[size]
  const br  = radii[size]
  const fs  = fsSz[size]

  useEffect(() => {
    if (imgUrl) return
    let dead = false
    resolveProviderLogo(slug).then(url => { if (!dead) setImgUrl(url) })
    return () => { dead = true }
  }, [slug, imgUrl])

  return (
    <div style={{
      width: box, height: box, minWidth: box, borderRadius: br, flexShrink: 0,
      background: imgUrl ? `${color}15` : `linear-gradient(135deg, ${color}30, ${color}15)`,
      border: `1.5px solid ${color}40`,
      display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
    }}>
      {imgUrl
        ? <img src={imgUrl} alt={name} width={box - 6} height={box - 6}
            style={{ objectFit: 'contain', padding: '3px' }}
            onError={() => setImgUrl(null)} />
        : <span style={{ fontSize: fs, lineHeight: 1 }}>{fallbackIcon}</span>
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

export function GameLogo({ slug, providerSlug, name, fallbackIcon, color, size = 'md' }: GameLogoProps) {
  const key = `game:${slug}`
  const [imgUrl, setImgUrl] = useState<string | null>(
    imgCache[key] && imgCache[key] !== 'failed' ? imgCache[key] as string : null
  )

  const dims: Record<string, number> = { xs: 28, sm: 40, md: 56, lg: 80 }
  const radii: Record<string, string> = { xs: '7px', sm: '10px', md: '14px', lg: '18px' }
  const fsSz: Record<string, string>  = { xs: '0.9rem', sm: '1.3rem', md: '1.8rem', lg: '2.8rem' }
  const box = dims[size]
  const br  = radii[size]
  const fs  = fsSz[size]

  useEffect(() => {
    if (imgUrl) return
    let dead = false
    resolveGameImage(slug).then(url => { if (!dead) setImgUrl(url) })
    return () => { dead = true }
  }, [slug, imgUrl])

  return (
    <div style={{
      width: box, height: box, minWidth: box, borderRadius: br, flexShrink: 0,
      background: imgUrl ? '#0a0a18' : `linear-gradient(145deg, ${color}40, ${color}18)`,
      border: `2px solid ${color}55`,
      boxShadow: `0 3px 14px ${color}30`,
      display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
    }}>
      {imgUrl
        ? <img src={imgUrl} alt={name} width={box} height={box}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            onError={() => setImgUrl(null)} />
        : <span style={{ fontSize: fs, lineHeight: 1 }}>{fallbackIcon}</span>
      }
    </div>
  )
}
