'use client'
import { useState, useEffect } from 'react' // useEffect used by ProviderLogo

interface GameLogoProps {
  name: string
  slug?: string          // для загрузки миниатюры игры
  icon?: string          // эмодзи fallback (алиас: fallbackIcon)
  fallbackIcon?: string  // эмодзи fallback
  color: string
  size?: 'sm' | 'md' | 'lg'
  providerSlug?: string  // для попытки загрузить лого провайдера
}

// Словарь реальных лого провайдеров
const PROVIDER_LOGO_URLS: Record<string, string> = {
  'pragmatic-play':  'https://img.logo.dev/pragmaticplay.com?token=pk_X-1ZO13GSgeOoUrIuJ6BeQ',
  'spribe':          'https://img.logo.dev/spribe.co?token=pk_X-1ZO13GSgeOoUrIuJ6BeQ',
  '1win-games':      'https://img.logo.dev/1win.com?token=pk_X-1ZO13GSgeOoUrIuJ6BeQ',
  'evolution':       'https://img.logo.dev/evolution.com?token=pk_X-1ZO13GSgeOoUrIuJ6BeQ',
  'novomatic':       'https://img.logo.dev/novomatic.com?token=pk_X-1ZO13GSgeOoUrIuJ6BeQ',
  'hacksaw-gaming':  'https://img.logo.dev/hacksawgaming.com?token=pk_X-1ZO13GSgeOoUrIuJ6BeQ',
  'bgaming':         'https://img.logo.dev/bgaming.com?token=pk_X-1ZO13GSgeOoUrIuJ6BeQ',
  'push-gaming':     'https://img.logo.dev/pushgaming.com?token=pk_X-1ZO13GSgeOoUrIuJ6BeQ',
  'nolimit-city':    'https://img.logo.dev/nolimitcity.com?token=pk_X-1ZO13GSgeOoUrIuJ6BeQ',
  'playn-go':        'https://img.logo.dev/playngo.com?token=pk_X-1ZO13GSgeOoUrIuJ6BeQ',
  'netent':          'https://img.logo.dev/netent.com?token=pk_X-1ZO13GSgeOoUrIuJ6BeQ',
  'red-tiger':       'https://img.logo.dev/redtiger.com?token=pk_X-1ZO13GSgeOoUrIuJ6BeQ',
  'yggdrasil':       'https://img.logo.dev/yggdrasilgaming.com?token=pk_X-1ZO13GSgeOoUrIuJ6BeQ',
}

// Миниатюры конкретных игр (приоритет над лого провайдера)
const GAME_IMAGE_URLS: Record<string, string> = {
  'gates-of-olympus':  'https://cdn2.softswiss.net/i/s3/pragmaticexternal/vs20olympgate.jpg',
  'sweet-bonanza':     'https://cdn2.softswiss.net/i/s3/pragmaticexternal/vs20fruitsw.jpg',
  'dog-house':         'https://cdn2.softswiss.net/i/s3/pragmaticexternal/vs20doghouse.jpg',
  'big-bass-bonanza':  'https://cdn2.softswiss.net/i/s3/pragmaticexternal/vs10bbbonanza.jpg',
  'starlight-princess':'https://cdn2.softswiss.net/i/s3/pragmaticexternal/vs20starlight.jpg',
  'sugar-rush':        'https://cdn2.softswiss.net/i/s3/pragmaticexternal/vs20sugarrush.jpg',
  'aviator':           'https://cdn2.softswiss.net/i/s3/spribe/aviator.jpg',
  'mines':             'https://cdn2.softswiss.net/i/s3/spribe/mines.jpg',
  'plinko':            'https://cdn2.softswiss.net/i/s3/spribe/plinko.jpg',
  'lucky-jet':         'https://cdn2.softswiss.net/i/s3/onlyplay/lucky_jet.jpg',
  'crazy-time':        'https://cdn2.softswiss.net/i/s3/evolution/crazy_time.jpg',
  'lightning-roulette':'https://cdn2.softswiss.net/i/s3/evolution/lightning_roulette.jpg',
  'monopoly-live':     'https://cdn2.softswiss.net/i/s3/evolution/monopoly_live.jpg',
  'book-of-ra':        'https://cdn2.softswiss.net/i/s3/novomatic/book_of_ra.jpg',
  'starburst':         'https://cdn2.softswiss.net/i/s3/netent/starburst.jpg',
  'gonzo-quest':       'https://cdn2.softswiss.net/i/s3/netent/gonzo_quest.jpg',
  'book-of-dead':      'https://cdn2.softswiss.net/i/s3/playngo/book_of_dead.jpg',
  'reactoonz':         'https://cdn2.softswiss.net/i/s3/playngo/reactoonz.jpg',
  'jammin-jars':       'https://cdn2.softswiss.net/i/s3/pushgaming/jammin_jars.jpg',
  'san-quentin':       'https://cdn2.softswiss.net/i/s3/nolimitcity/san_quentin_xways.jpg',
  'tombstone-rip':     'https://cdn2.softswiss.net/i/s3/nolimitcity/tombstone_rip.jpg',
  'vikings-go-berzerk':'https://cdn2.softswiss.net/i/s3/yggdrasil/vikings_go_berzerk.jpg',
  'banana-party':      'https://cdn2.softswiss.net/i/s3/bgaming/banana_party.jpg',
}

const sizeMap = {
  sm: { outer: 'w-10 h-10', text: 'text-xl' },
  md: { outer: 'w-14 h-14', text: 'text-3xl' },
  lg: { outer: 'w-20 h-20', text: 'text-5xl' },
}

export function GameLogo({ name, slug, icon, fallbackIcon, color, size = 'md', providerSlug }: GameLogoProps) {
  const emojiIcon = icon ?? fallbackIcon ?? '🎮'
  const { outer, text } = sizeMap[size]

  const gameUrl = slug ? GAME_IMAGE_URLS[slug] : null
  const providerUrl = providerSlug ? PROVIDER_LOGO_URLS[providerSlug] : null

  const [gameImgFailed, setGameImgFailed] = useState(false)
  const [providerImgFailed, setProviderImgFailed] = useState(false)

  const activeUrl = (!gameImgFailed && gameUrl) ? gameUrl
                  : (!providerImgFailed && providerUrl) ? providerUrl
                  : null

  return (
    <div
      className={`${outer} rounded-xl flex items-center justify-center shrink-0 overflow-hidden`}
      style={{ background: `${color}18`, border: `2px solid ${color}30` }}
    >
      {activeUrl ? (
        <img
          src={activeUrl}
          alt={name}
          className="w-full h-full object-contain p-1.5"
          onError={() => {
            if (activeUrl === gameUrl) setGameImgFailed(true)
            else setProviderImgFailed(true)
          }}
        />
      ) : (
        <span className={text}>{emojiIcon}</span>
      )}
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
