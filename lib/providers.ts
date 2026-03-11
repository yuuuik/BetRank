export interface Provider {
  slug: string
  name: string
  logo: string
  color: string
  founded: number
  country: string
  description: string
  metaDesc: string
  gameSlugs: string[] // игры этого провайдера
  gameCount: number
  licenses: string[]
  popular: boolean
  tags: string[]
}

export const providers: Provider[] = [
  {
    slug: 'pragmatic-play',
    name: 'Pragmatic Play',
    logo: '🎯',
    color: '#e93b3b',
    founded: 2015,
    country: 'Мальта',
    description: 'Один из крупнейших провайдеров казино-игр. Создатели Gates of Olympus, Sweet Bonanza, The Dog House.',
    metaDesc: 'Pragmatic Play — игры казино онлайн 2026. Слоты Gates of Olympus, Sweet Bonanza. Список казино с Pragmatic Play.',
    gameSlugs: ['gates-of-olympus', 'sweet-bonanza', 'dog-house', 'big-bass-bonanza', 'starlight-princess', 'sugar-rush'],
    gameCount: 300,
    licenses: ['MGA', 'UKGC', 'Curaçao'],
    popular: true,
    tags: ['Слоты', 'Live', 'Виртуальный спорт'],
  },
  {
    slug: 'evolution',
    name: 'Evolution Gaming',
    logo: '🎰',
    color: '#c41e3a',
    founded: 2006,
    country: 'Швеция / Латвия',
    description: 'Лидер рынка live-казино. Crazy Time, Lightning Roulette, Monopoly Live — все хиты от Evolution.',
    metaDesc: 'Evolution Gaming — live казино онлайн 2026. Crazy Time, Lightning Roulette. Казино с Evolution.',
    gameSlugs: ['crazy-time', 'lightning-roulette', 'monopoly-live', 'cash-or-crash'],
    gameCount: 100,
    licenses: ['MGA', 'UKGC', 'Curaçao'],
    popular: true,
    tags: ['Live Casino', 'Рулетка', 'Блэкджек', 'Шоу'],
  },
  {
    slug: 'spribe',
    name: 'Spribe',
    logo: '✈️',
    color: '#1a73e8',
    founded: 2018,
    country: 'Грузия',
    description: 'Создатели Aviator — самой популярной краш-игры в мире. Также Mines, Plinko, Dice.',
    metaDesc: 'Spribe — краш-игры онлайн 2026. Aviator, Mines, Plinko. Казино с играми Spribe.',
    gameSlugs: ['aviator', 'mines', 'plinko', 'dice'],
    gameCount: 15,
    licenses: ['MGA', 'UKGC', 'Curaçao'],
    popular: true,
    tags: ['Краш-игры', 'Instantwin', 'Провабли фэйр'],
  },
  {
    slug: 'novomatic',
    name: 'Novomatic',
    logo: '🎪',
    color: '#e65c00',
    founded: 1980,
    country: 'Австрия',
    description: 'Легендарный провайдер, создавший Book of Ra. Более 40 лет на рынке игровых автоматов.',
    metaDesc: 'Novomatic игры онлайн 2026. Book of Ra, Sizzling Hot. Казино с Novomatic.',
    gameSlugs: ['book-of-ra', 'book-of-ra-deluxe'],
    gameCount: 200,
    licenses: ['MGA', 'UKGC'],
    popular: true,
    tags: ['Классические слоты', 'Book of Ra серия', 'Sizzling Hot'],
  },
  {
    slug: 'netent',
    name: 'NetEnt',
    logo: '💎',
    color: '#0a84ff',
    founded: 1996,
    country: 'Швеция',
    description: 'Пионер онлайн-гемблинга. Starburst, Gonzo\'s Quest — классика от NetEnt.',
    metaDesc: 'NetEnt игры онлайн 2026. Starburst, Gonzo\'s Quest. Казино с NetEnt.',
    gameSlugs: ['starburst', 'gonzo-quest'],
    gameCount: 250,
    licenses: ['MGA', 'UKGC', 'Curaçao'],
    popular: true,
    tags: ['Слоты', 'Jackpot', 'Live', 'Классика'],
  },
  {
    slug: 'hacksaw-gaming',
    name: 'Hacksaw Gaming',
    logo: '🪚',
    color: '#f97316',
    founded: 2018,
    country: 'Мальта',
    description: 'Молодой провайдер с уникальными механиками. Tower Rush, Squealin\' Riches — свежие хиты.',
    metaDesc: 'Hacksaw Gaming игры 2026. Tower Rush, скретч-карты. Казино с Hacksaw.',
    gameSlugs: ['tower-rush', 'squealin-riches'],
    gameCount: 80,
    licenses: ['MGA', 'Curaçao'],
    popular: true,
    tags: ['Слоты', 'Краш', 'Скретч-карты'],
  },
  {
    slug: 'bgaming',
    name: 'BGaming',
    logo: '🃏',
    color: '#8b5cf6',
    founded: 2018,
    country: 'Мальта',
    description: 'Провайдер с высоким RTP и инновационными механиками. Banana Party — вирусный хит.',
    metaDesc: 'BGaming игры онлайн 2026. Banana Party. Казино с BGaming, RTP 97%+.',
    gameSlugs: ['banana-party'],
    gameCount: 120,
    licenses: ['MGA', 'Curaçao'],
    popular: false,
    tags: ['Слоты', 'Высокий RTP', 'Провабли фэйр'],
  },
  {
    slug: '1win-games',
    name: '1Win Games',
    logo: '🚀',
    color: '#a855f7',
    founded: 2020,
    country: 'Россия / Кюрасао',
    description: 'Эксклюзивный провайдер платформы 1Win. Lucky Jet — самая популярная краш-игра на 1Win.',
    metaDesc: '1Win Games — Lucky Jet 2026. Краш-игры 1Win. Играть в Lucky Jet.',
    gameSlugs: ['lucky-jet'],
    gameCount: 5,
    licenses: ['Curaçao'],
    popular: false,
    tags: ['Краш-игры', 'Эксклюзив 1Win'],
  },
]

export function getProviderBySlug(slug: string): Provider | undefined {
  return providers.find(p => p.slug === slug)
}
