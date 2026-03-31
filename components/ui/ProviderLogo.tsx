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

// ─── Картинки игр: официальные CDN провайдеров ──────────────────────────────
// PP = Pragmatic Play official SEO CDN (разрешён для встраивания)
// SC = SlotCatalog CDN
const PP = (id: string) => `https://seo.pgpstatic.net/images/games/thumbnail_200/${id}.png`
const SC = (slug: string) => `https://slotcatalog.com/userfiles/image/games/main/${slug}.jpg`

export const GAME_IMAGES: Record<string, string> = {
  // Pragmatic Play — официальный CDN
  'gates-of-olympus':        PP('vs20olympgate'),
  'sweet-bonanza':           PP('vs20fruitsw'),
  'the-dog-house':           PP('vs20doghouse'),
  'dog-house':               PP('vs20doghouse'),
  'big-bass-bonanza':        PP('vs10bbbonanza'),
  'starlight-princess':      PP('vs20starlight'),
  'sugar-rush':              PP('vs20sugarrush'),
  'wolf-gold':               PP('vs25wolfgold'),
  'fruit-party':             PP('vs20fruitparty'),
  'mega-roulette':           PP('cs5megaroul'),
  'hot-fiesta':              PP('vs40hotfiesta'),
  'sugar-rush-1000':         PP('vs20sugarrush1000'),
  'gates-of-olympus-1000':   PP('vs20olympgate1000'),
  'wild-west-gold':          PP('vs40wildwest'),
  'the-dog-house-megaways':  PP('vswaysdoghouse'),
  'john-hunter':             PP('vs25johngolden'),
  'buffalo-king':            PP('vs4096bufking'),
  'aztec-gems':              PP('vs5aztecgems'),
  'big-bass-splash':         PP('vs10bsbonanza'),
  'starlight-princess-1000': PP('vs20starlight1000'),
  'the-hand-of-midas':       PP('vs25goldmine'),
  'floating-dragon':         PP('vs10fdrasbf'),
  'gems-bonanza':            PP('vs20gemsbonanza'),
  'wild-west-gold-megaways': PP('vswayswildwest'),
  'fruit-party-2':           PP('vs20fruitparty2'),
  'curse-of-the-werewolf':   PP('vswayswwriches'),
  // Spribe — SlotCatalog
  'aviator':                 SC('Aviator-Spribe'),
  'mines':                   SC('Mines-Spribe'),
  'plinko':                  SC('Plinko-Spribe'),
  'dice':                    SC('Dice-Spribe'),
  'hilo':                    SC('HiLo-Spribe'),
  'goal':                    SC('Goal-Spribe'),
  'mini-roulette':           SC('Mini-Roulette-Spribe'),
  'keno':                    SC('Keno-Spribe'),
  // 1Win Games
  'lucky-jet':               SC('Lucky-Jet-1Win-Games'),
  // Evolution — SlotCatalog
  'crazy-time':              SC('Crazy-Time-Evolution'),
  'lightning-roulette':      SC('Lightning-Roulette-Evolution'),
  'monopoly-live':           SC('Monopoly-Live-Evolution'),
  'cash-or-crash':           SC('Cash-or-Crash-Evolution'),
  'dream-catcher':           SC('Dream-Catcher-Evolution'),
  'mega-ball':               SC('Mega-Ball-Evolution'),
  'funky-time':              SC('Funky-Time-Evolution'),
  'xxxtreme-lightning-roulette': SC('XXXtreme-Lightning-Roulette-Evolution'),
  // Novomatic — SlotCatalog
  'book-of-ra':              SC('Book-of-Ra-Novomatic'),
  'book-of-ra-deluxe':       SC('Book-of-Ra-Deluxe-Novomatic'),
  'lucky-ladys-charm':       SC('Lucky-Ladys-Charm-Deluxe-Novomatic'),
  'dolphins-pearl':          SC('Dolphins-Pearl-Deluxe-Novomatic'),
  'sizzling-hot':            SC('Sizzling-Hot-Deluxe-Novomatic'),
  // NetEnt — SlotCatalog
  'starburst':               SC('Starburst-NetEnt'),
  'gonzo-quest':             SC('Gonzos-Quest-NetEnt'),
  'dead-or-alive-2':         SC('Dead-or-Alive-2-NetEnt'),
  'twin-spin':               SC('Twin-Spin-NetEnt'),
  'jack-and-the-beanstalk':  SC('Jack-and-the-Beanstalk-NetEnt'),
  // BGaming — SlotCatalog
  'banana-party':            SC('Banana-Party-BGaming'),
  'book-of-cats':            SC('Book-of-Cats-BGaming'),
  'elvis-frog':              SC('Elvis-Frog-in-Vegas-BGaming'),
  // Play'n GO — SlotCatalog
  'book-of-dead':            SC('Book-of-Dead-Playn-GO'),
  'reactoonz':               SC('Reactoonz-Playn-GO'),
  'legacy-of-egypt':         SC('Legacy-of-Egypt-Playn-GO'),
  'rise-of-olympus':         SC('Rise-of-Olympus-Playn-GO'),
  'fire-joker':              SC('Fire-Joker-Playn-GO'),
  // Push Gaming — SlotCatalog
  'jammin-jars':             SC('Jammin-Jars-Push-Gaming'),
  'jammin-jars-2':           SC('Jammin-Jars-2-Push-Gaming'),
  'fat-santa':               SC('Fat-Santa-Push-Gaming'),
  'wild-swarm':              SC('Wild-Swarm-Push-Gaming'),
  'fat-banker':              SC('Fat-Banker-Push-Gaming'),
  // Nolimit City — SlotCatalog
  'san-quentin':             SC('San-Quentin-xWays-Nolimit-City'),
  'san-quentin-xways':       SC('San-Quentin-xWays-Nolimit-City'),
  'mental':                  SC('Mental-Nolimit-City'),
  'tombstone-rip':           SC('Tombstone-RIP-Nolimit-City'),
  'narcos':                  SC('Narcos-Nolimit-City'),
  'deadwood':                SC('Deadwood-Nolimit-City'),
  'fire-in-the-hole':        SC('Fire-in-the-Hole-xBomb-Nolimit-City'),
  // Red Tiger — SlotCatalog
  'gonzos-gold':             SC('Gonzos-Gold-Red-Tiger'),
  'dragons-luck':            SC('Dragons-Luck-Red-Tiger'),
  'piggy-riches-megaways':   SC('Piggy-Riches-Megaways-Red-Tiger'),
  // Yggdrasil — SlotCatalog
  'vikings-go-berzerk':      SC('Vikings-Go-Berzerk-Yggdrasil'),
  'valley-of-the-gods':      SC('Valley-of-the-Gods-Yggdrasil'),
  'empire-fortune':          SC('Empire-Fortune-Yggdrasil'),
  // Hacksaw Gaming — SlotCatalog
  'tower-rush':              SC('Tower-Rush-Hacksaw-Gaming'),
  'squealin-riches':         SC('Squealin-Riches-Hacksaw-Gaming'),
  'wanted-dead-or-a-wild':   SC('Wanted-Dead-or-a-Wild-Hacksaw-Gaming'),
  'stick-em':                SC('Stick-Em-Hacksaw-Gaming'),
  'road-rage':               SC('Road-Rage-Hacksaw-Gaming'),
  'chaos-crew-2':            SC('Chaos-Crew-2-Hacksaw-Gaming'),
  // Relax Gaming — SlotCatalog
  'money-train-4':           SC('Money-Train-4-Relax-Gaming'),
  'money-train-3':           SC('Money-Train-3-Relax-Gaming'),
  'money-train-2':           SC('Money-Train-2-Relax-Gaming'),
  'money-train':             SC('Money-Train-Relax-Gaming'),
  'snake-arena':             SC('Snake-Arena-Relax-Gaming'),
  'deadwood-xnudge':         SC('Deadwood-xNudge-Relax-Gaming'),
  // Big Time Gaming — SlotCatalog
  'bonanza':                 SC('Bonanza-Megaways-Big-Time-Gaming'),
  'bonanza-megaways':        SC('Bonanza-Megaways-Big-Time-Gaming'),
  'extra-chilli':            SC('Extra-Chilli-Big-Time-Gaming'),
  'white-rabbit':            SC('White-Rabbit-Megaways-Big-Time-Gaming'),
  'extra-chilli-megaways':   SC('Extra-Chilli-Megaways-Big-Time-Gaming'),
  // Microgaming — SlotCatalog
  'mega-moolah':             SC('Mega-Moolah-Microgaming'),
  'thunderstruck-2':         SC('Thunderstruck-II-Microgaming'),
  'immortal-romance':        SC('Immortal-Romance-Microgaming'),
  // Wazdan — SlotCatalog
  '9-lions':                 SC('9-Lions-Wazdan'),
  'power-of-gods-egypt':     SC('Power-of-Gods-Egypt-Wazdan'),
  'magic-stars-9':           SC('Magic-Stars-9-Wazdan'),
  // ELK Studios — SlotCatalog
  'wild-toro':               SC('Wild-Toro-ELK-Studios'),
  'sam-on-the-beach':        SC('Sam-on-the-Beach-ELK-Studios'),
  'nitropolis-4':            SC('Nitropolis-4-ELK-Studios'),
  // Quickspin — SlotCatalog
  'big-bad-wolf':            SC('Big-Bad-Wolf-Quickspin'),
  'sakura-fortune':          SC('Sakura-Fortune-Quickspin'),
  // Endorphina — SlotCatalog
  'book-of-santa':           SC('Book-of-Santa-Endorphina'),
  '2021-hit-slot':           SC('2021-Hit-Slot-Endorphina'),
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

// Маппинг slug провайдера → папка на softswiss CDN
const SOFTSWISS_PROVIDER: Record<string, string> = {
  'spribe':          'spribe',
  'evolution':       'evolution',
  'novomatic':       'novomatic',
  'netent':          'netent',
  'bgaming':         'bgaming',
  'playn-go':        'playngo',
  'playngo':         'playngo',
  'push-gaming':     'pushgaming',
  'nolimit-city':    'nolimitcity',
  'red-tiger':       'redtiger',
  'yggdrasil':       'yggdrasil',
  'hacksaw-gaming':  'hacksaw',
  'relax-gaming':    'relaxgaming',
  'big-time-gaming': 'bigtimegaming',
  'wazdan':          'wazdan',
  'elk':             'elk',
  'quickspin':       'quickspin',
  'endorphina':      'endorphina',
  'smartsoft':       'smartsoft',
  '1win-games':      'onlyplay',
}

async function resolveGameImage(slug: string, providerSlug?: string): Promise<string | null> {
  const key = `game:${slug}`
  if (imgCache[key] !== undefined) return imgCache[key] === 'failed' ? null : imgCache[key] as string

  const snake = slug.replace(/-/g, '_')
  const cdn = 'https://cdn2.softswiss.net/i/s3'

  // Сначала — захардкоженный URL (может использовать внутренний ID провайдера)
  const staticUrl = GAME_IMAGES[slug]
  // Затем — автоматически строим URL по паттерну провайдера
  const provFolder = providerSlug ? SOFTSWISS_PROVIDER[providerSlug] : null
  const autoUrl = provFolder ? `${cdn}/${provFolder}/${snake}.jpg` : null

  const candidates = [staticUrl, autoUrl].filter(Boolean) as string[]
  for (const url of candidates) {
    try { await probeImg(url); imgCache[key] = url; return url } catch {}
  }
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
  icon?: string
}

export function ProviderLogo({ slug, name, fallbackIcon, icon, color, size = 'md' }: ProviderLogoProps) {
  const emoji = icon ?? fallbackIcon
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

export function GameLogo({ slug, providerSlug, name, fallbackIcon, color, size = 'md' }: GameLogoProps) {
  const dims: Record<string, number> = { xs: 28, sm: 40, md: 56, lg: 80 }
  const radii: Record<string, string> = { xs: '7px', sm: '10px', md: '14px', lg: '18px' }
  const textSz: Record<string, number>  = { xs: 9, sm: 12, md: 15, lg: 20 }
  const box = dims[size]
  const br  = radii[size]
  const ts  = textSz[size]

  const snake = slug.replace(/-/g, '_')
  const provFolder = SOFTSWISS_PROVIDER[providerSlug] ?? null
  const candidates = [
    GAME_IMAGES[slug],
    provFolder ? `https://cdn2.softswiss.net/i/s3/${provFolder}/${snake}.jpg` : null,
    provFolder ? `https://cdn.softswiss.net/i/s3/${provFolder}/${snake}.jpg` : null,
  ].filter(Boolean) as string[]

  const [urlIdx, setUrlIdx] = useState(0)
  const currentUrl = candidates[urlIdx] ?? null

  return (
    <div style={{
      width: box, height: box, minWidth: box, borderRadius: br, flexShrink: 0,
      background: currentUrl ? '#0a0a18' : `linear-gradient(145deg, ${color}40, ${color}18)`,
      border: `2px solid ${color}55`,
      boxShadow: `0 3px 14px ${color}30`,
      display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
    }}>
      {currentUrl
        ? <img src={currentUrl} alt={name} width={box} height={box}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            onError={() => setUrlIdx(i => i + 1)} />
        : <span style={{ fontSize: ts * 1.8, lineHeight: 1 }}>{fallbackIcon}</span>
      }
    </div>
  )
}
