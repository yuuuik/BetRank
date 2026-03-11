export interface PromoCode {
  slug: string
  serviceSlug: string
  serviceName: string
  serviceLogo: string
  serviceAccent: string
  serviceWebsite: string
  code: string
  title: string
  description: string
  amount: string
  type: 'freebet' | 'freespins' | 'deposit' | 'cashback' | 'nodep'
  validUntil: string // ISO date
  wagering: string
  exclusive: boolean
  verified: boolean
}

export const promoCodes: PromoCode[] = [
  {
    slug: '1xbet-promo',
    serviceSlug: '1xbet', serviceName: '1xBet', serviceLogo: '1️⃣',
    serviceAccent: '#3b82f6', serviceWebsite: 'https://1xbet.com',
    code: 'BETRANK', title: 'Бонус 100% + €1950 казино',
    description: 'Введите промокод при регистрации. Бонус 100% до 32 500₽ на спорт + пакет казино €1950 + 150 FS.',
    amount: '100% до 32 500 ₽', type: 'deposit',
    validUntil: '2026-12-31', wagering: '5x', exclusive: true, verified: true,
  },
  {
    slug: '1win-promo',
    serviceSlug: '1win', serviceName: '1Win', serviceLogo: '🏅',
    serviceAccent: '#a855f7', serviceWebsite: 'https://1win.com',
    code: 'RANK500', title: 'Мегабонус 500% на 4 депозита',
    description: 'Эксклюзивный промокод BetRank. 500% суммарно: 200%+150%+100%+50% на первые 4 депозита.',
    amount: 'до 200 000 ₽', type: 'deposit',
    validUntil: '2026-12-31', wagering: '3x', exclusive: true, verified: true,
  },
  {
    slug: 'fonbet-promo',
    serviceSlug: 'fonbet', serviceName: 'Fonbet', serviceLogo: '🦅',
    serviceAccent: '#f97316', serviceWebsite: 'https://fonbet.ru',
    code: 'FREEBET15', title: 'Фрибет до 15 000 ₽',
    description: 'Бездепозитный фрибет до 15 000₽ просто за регистрацию и верификацию. Без пополнения!',
    amount: 'до 15 000 ₽', type: 'nodep',
    validUntil: '2026-12-31', wagering: '1x', exclusive: false, verified: true,
  },
  {
    slug: 'mostbet-promo',
    serviceSlug: 'mostbet', serviceName: 'MostBet', serviceLogo: '⚽',
    serviceAccent: '#10b981', serviceWebsite: 'https://mostbet.com',
    code: 'MOSTRANK', title: '125% + 250 фриспинов',
    description: 'Приветственный бонус 125% до 25 000₽ плюс 250 фриспинов в популярных слотах.',
    amount: '125% + 250 FS', type: 'freespins',
    validUntil: '2026-12-31', wagering: '60x', exclusive: true, verified: true,
  },
  {
    slug: 'winline-promo',
    serviceSlug: 'winline', serviceName: 'Winline', serviceLogo: '🎯',
    serviceAccent: '#22c55e', serviceWebsite: 'https://winline.ru',
    code: 'WIN3000', title: 'Фрибет 3 000 ₽',
    description: 'Гарантированный фрибет 3 000₽ за первый депозит от 500₽. Программа Priority в подарок.',
    amount: '3 000 ₽', type: 'freebet',
    validUntil: '2026-12-31', wagering: '1x', exclusive: false, verified: true,
  },
  {
    slug: 'leon-promo',
    serviceSlug: 'leon', serviceName: 'Leon', serviceLogo: '🦁',
    serviceAccent: '#f59e0b', serviceWebsite: 'https://leon.ru',
    code: 'LEON25K', title: 'Фрибет до 25 000 ₽',
    description: 'Фрибет до 25 000₽ за первую проигрышную ставку. Один из лучших welcome-предложений рынка.',
    amount: 'до 25 000 ₽', type: 'freebet',
    validUntil: '2026-12-31', wagering: '1x', exclusive: false, verified: true,
  },
  {
    slug: 'vavada-promo',
    serviceSlug: 'vavada', serviceName: 'Vavada', serviceLogo: '🌊',
    serviceAccent: '#6366f1', serviceWebsite: 'https://vavada.com',
    code: 'VAVRANK', title: '100 фриспинов без депозита',
    description: 'Эксклюзивно для читателей BetRank: 100 бесплатных спинов без пополнения при регистрации.',
    amount: '100 FS', type: 'nodep',
    validUntil: '2026-09-30', wagering: '30x', exclusive: true, verified: true,
  },
  {
    slug: 'betboom-promo',
    serviceSlug: 'betboom', serviceName: 'BetBoom', serviceLogo: '💥',
    serviceAccent: '#ef4444', serviceWebsite: 'https://betboom.ru',
    code: 'BOOM5000', title: 'Фрибет 5 000 ₽',
    description: 'Фрибет 5 000₽ + кэшбек 10% на первый месяц. Промокод действует при регистрации.',
    amount: '5 000 ₽', type: 'freebet',
    validUntil: '2026-12-31', wagering: '1x', exclusive: true, verified: true,
  },
]
