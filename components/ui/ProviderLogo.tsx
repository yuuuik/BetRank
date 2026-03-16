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
  'red-tiger':       'redtigergaming.com',
  'yggdrasil':       'yggdrasilgaming.com',
  'relax-gaming':    'relaxgaming.com',
}

// ─── Реальные картинки игр (softswiss CDN — публичный, работает в продакшене) ──
export const GAME_IMAGES: Record<string, string> = {
  'gates-of-olympus':   'https://cdn2.softswiss.net/i/s3/pragmaticexternal/vs20olympgate.jpg',
  'sweet-bonanza':      'https://cdn2.softswiss.net/i/s3/pragmaticexternal/vs20fruitsw.jpg',
  'dog-house':          'https://cdn2.softswiss.net/i/s3/pragmaticexternal/vs20doghouse.jpg',
  'big-bass-bonanza':   'https://cdn2.softswiss.net/i/s3/pragmaticexternal/vs10bbbonanza.jpg',
  'starlight-princess': 'https://cdn2.softswiss.net/i/s3/pragmaticexternal/vs20starlight.jpg',
  'sugar-rush':         'https://cdn2.softswiss.net/i/s3/pragmaticexternal/vs20sugarrush.jpg',
  'wolf-gold':          'https://cdn2.softswiss.net/i/s3/pragmaticexternal/vs25wolfgold.jpg',
  'fruit-party':        'https://cdn2.softswiss.net/i/s3/pragmaticexternal/vs20fruitparty.jpg',
  'mega-roulette':      'https://cdn2.softswiss.net/i/s3/pragmaticexternal/cs5megaroul.jpg',
  'aviator':            'https://cdn2.softswiss.net/i/s3/spribe/aviator.jpg',
  'mines':              'https://cdn2.softswiss.net/i/s3/spribe/mines.jpg',
  'plinko':             'https://cdn2.softswiss.net/i/s3/spribe/plinko.jpg',
  'dice':               'https://cdn2.softswiss.net/i/s3/spribe/dice.jpg',
  'lucky-jet':          'https://cdn2.softswiss.net/i/s3/onlyplay/lucky_jet.jpg',
  'crazy-time':         'https://cdn2.softswiss.net/i/s3/evolution/crazy_time.jpg',
  'lightning-roulette': 'https://cdn2.softswiss.net/i/s3/evolution/lightning_roulette.jpg',
  'monopoly-live':      'https://cdn2.softswiss.net/i/s3/evolution/monopoly_live.jpg',
  'cash-or-crash':      'https://cdn2.softswiss.net/i/s3/evolution/cash_or_crash.jpg',
  'book-of-ra':         'https://cdn2.softswiss.net/i/s3/novomatic/book_of_ra.jpg',
  'book-of-ra-deluxe':  'https://cdn2.softswiss.net/i/s3/novomatic/book_of_ra_deluxe.jpg',
  'starburst':          'https://cdn2.softswiss.net/i/s3/netent/starburst.jpg',
  'gonzo-quest':        'https://cdn2.softswiss.net/i/s3/netent/gonzo_quest.jpg',
  'banana-party':       'https://cdn2.softswiss.net/i/s3/bgaming/banana_party.jpg',
  'book-of-dead':       'https://cdn2.softswiss.net/i/s3/playngo/book_of_dead.jpg',
  'reactoonz':          'https://cdn2.softswiss.net/i/s3/playngo/reactoonz.jpg',
  'legacy-of-egypt':    'https://cdn2.softswiss.net/i/s3/playngo/legacy_of_egypt.jpg',
  'jammin-jars':        'https://cdn2.softswiss.net/i/s3/pushgaming/jammin_jars.jpg',
  'fat-santa':          'https://cdn2.softswiss.net/i/s3/pushgaming/fat_santa.jpg',
  'wild-swarm':         'https://cdn2.softswiss.net/i/s3/pushgaming/wild_swarm.jpg',
  'san-quentin':        'https://cdn2.softswiss.net/i/s3/nolimitcity/san_quentin_xways.jpg',
  'mental':             'https://cdn2.softswiss.net/i/s3/nolimitcity/mental.jpg',
  'tombstone-rip':      'https://cdn2.softswiss.net/i/s3/nolimitcity/tombstone_rip.jpg',
  'gonzos-gold':        'https://cdn2.softswiss.net/i/s3/redtiger/gonzos_gold.jpg',
  'dragons-luck':       'https://cdn2.softswiss.net/i/s3/redtiger/dragons_luck.jpg',
  'lucky-wizard':       'https://cdn2.softswiss.net/i/s3/redtiger/lucky_wizard.jpg',
  'vikings-go-berzerk': 'https://cdn2.softswiss.net/i/s3/yggdrasil/vikings_go_berzerk.jpg',
  'valley-of-the-gods': 'https://cdn2.softswiss.net/i/s3/yggdrasil/valley_of_the_gods.jpg',
  'tower-rush':         'https://cdn2.softswiss.net/i/s3/hacksaw/tower_rush.jpg',
  'squealin-riches':    'https://cdn2.softswiss.net/i/s3/hacksaw/squealin_riches.jpg',
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

// Аббревиатура для текстового fallback (до 4 символов)
function abbrev(name: string): string {
  return name
    .replace(/[^a-zA-ZА-Яа-я0-9\s]/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map(w => w[0])
    .join('')
    .slice(0, 4)
    .toUpperCase()
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
  const textSz: Record<string, number> = { xs: 9, sm: 11, md: 14, lg: 18 }
  const box = dims[size]
  const br  = radii[size]
  const ts  = textSz[size]

  useEffect(() => {
    if (imgUrl) return
    let dead = false
    resolveProviderLogo(slug).then(url => { if (!dead) setImgUrl(url) })
    return () => { dead = true }
  }, [slug, imgUrl])

  return (
    <div style={{
      width: box, height: box, minWidth: box, borderRadius: br, flexShrink: 0,
      background: `linear-gradient(135deg, ${color}30, ${color}15)`,
      border: `1.5px solid ${color}40`,
      display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
    }}>
      {imgUrl
        ? <img src={imgUrl} alt={name} width={box - 6} height={box - 6}
            style={{ objectFit: 'contain', padding: '3px' }}
            onError={() => setImgUrl(null)} />
        : <span style={{
            fontSize: ts,
            fontWeight: 900,
            color,
            fontFamily: 'Exo 2, sans-serif',
            lineHeight: 1,
            letterSpacing: '-0.5px',
          }}>{abbrev(name)}</span>
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
  const textSz: Record<string, number>  = { xs: 9, sm: 12, md: 15, lg: 20 }
  const box = dims[size]
  const br  = radii[size]
  const ts  = textSz[size]

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
        : <span style={{
            fontSize: ts,
            fontWeight: 900,
            color,
            fontFamily: 'Exo 2, sans-serif',
            lineHeight: 1.1,
            letterSpacing: '-0.3px',
            textAlign: 'center',
            padding: '2px',
            maxWidth: box - 6,
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
          } as React.CSSProperties}>{name.split(' ').slice(0, 2).join(' ')}</span>
      }
    </div>
  )
}
