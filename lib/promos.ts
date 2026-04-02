export interface PromoCode {
  slug: string
  serviceSlug: string
  serviceName: string
  serviceLogo: string
  serviceAccent: string
  serviceWebsite: string
  refUrl?: string
  code: string
  title: string
  description: string
  amount: string
  type: 'freebet' | 'freespins' | 'deposit' | 'cashback' | 'nodep'
  validUntil: string
  wagering: string
  exclusive: boolean
  verified: boolean
}

export const promoCodes: PromoCode[] = [
  {
    slug: 'jozz-promo',
    serviceSlug: 'jozz', serviceName: 'Jozz Casino', serviceLogo: '🃏',
    serviceAccent: '#6366f1', serviceWebsite: 'https://jozz.com',
    refUrl: 'https://jozz-promo1.com/alt/jozz/registration?bbb519bee13dc37a3b95625adb955eb3',
    code: 'JOZZRANK', title: '100% + 100 фриспинов',
    description: 'Введите промокод при регистрации и получите бонус 100% до 30 000₽ плюс 100 фриспинов в лучших слотах.',
    amount: '100% до 30 000 ₽ + 100 FS', type: 'deposit',
    validUntil: '2026-12-31', wagering: '40x', exclusive: true, verified: true,
  },
  {
    slug: 'booi-promo',
    serviceSlug: 'booi', serviceName: 'Booi Casino', serviceLogo: '🐯',
    serviceAccent: '#f97316', serviceWebsite: 'https://booi.com',
    code: 'BOOIRANK', title: '100 фриспинов без депозита',
    description: 'Эксклюзивный промокод BetRank: 100 бесплатных спинов без пополнения + бонус 100% на первый депозит.',
    amount: '100 FS без депозита', type: 'nodep',
    validUntil: '2026-12-31', wagering: '50x', exclusive: true, verified: true,
  },
  {
    slug: 'fugu-promo',
    serviceSlug: 'fugu', serviceName: 'FUGU Casino', serviceLogo: '🐡',
    serviceAccent: '#ec4899', serviceWebsite: 'https://fugucasino.com',
    code: 'FUGURANK', title: '200% + 200 фриспинов',
    description: 'Промокод BetRank: мегабонус 200% до 50 000₽ и 200 фриспинов. Один из лучших приветственных пакетов.',
    amount: '200% до 50 000 ₽ + 200 FS', type: 'deposit',
    validUntil: '2026-12-31', wagering: '35x', exclusive: true, verified: true,
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
    slug: 'vavada-promo',
    serviceSlug: 'vavada', serviceName: 'Vavada', serviceLogo: '🌀',
    serviceAccent: '#7c3aed', serviceWebsite: 'https://vavada.com',
    code: 'VAVRANK', title: '100 фриспинов без депозита',
    description: 'Эксклюзивно для читателей BetRank: 100 бесплатных спинов без пополнения при регистрации.',
    amount: '100 FS', type: 'nodep',
    validUntil: '2026-09-30', wagering: '30x', exclusive: true, verified: true,
  },
  {
    slug: 'ramenbet-promo',
    serviceSlug: 'ramenbet', serviceName: 'RamenBet', serviceLogo: '🍜',
    serviceAccent: '#dc2626', serviceWebsite: 'https://ramenbet.com',
    code: 'RAMENRANK', title: '150 фриспинов без депозита',
    description: 'Промокод BetRank: 150 бесплатных вращений без депозита + бонус на первое пополнение.',
    amount: '150 FS без депозита', type: 'nodep',
    validUntil: '2026-12-31', wagering: '40x', exclusive: true, verified: true,
  },
  {
    slug: 'casino-x-promo',
    serviceSlug: 'casino-x', serviceName: 'Casino-X', serviceLogo: '✖️',
    serviceAccent: '#1d4ed8', serviceWebsite: 'https://casino-x.com',
    code: 'XRANK', title: '100% + 200 фриспинов',
    description: 'Введите промокод при регистрации: бонус 100% до 50 000₽ и 200 фриспинов на популярные слоты.',
    amount: '100% до 50 000 ₽ + 200 FS', type: 'deposit',
    validUntil: '2026-12-31', wagering: '40x', exclusive: true, verified: true,
  },
  {
    slug: 'joycasino-promo',
    serviceSlug: 'joycasino', serviceName: 'Joy Casino', serviceLogo: '🎉',
    serviceAccent: '#f43f5e', serviceWebsite: 'https://joycasino.com',
    code: 'JOYRANK', title: '100% на депозит + 50 FS',
    description: 'Промокод BetRank для Joy Casino: 100% бонус до 50 000₽ и 50 фриспинов в подарок.',
    amount: '100% до 50 000 ₽ + 50 FS', type: 'deposit',
    validUntil: '2026-12-31', wagering: '45x', exclusive: true, verified: true,
  },
  {
    slug: 'riobet-promo',
    serviceSlug: 'riobet', serviceName: 'RioBet', serviceLogo: '🎰',
    serviceAccent: '#f59e0b', serviceWebsite: 'https://riobet.com',
    code: 'RIORANK', title: '100% + 100 фриспинов',
    description: 'Эксклюзивный промокод: бонус 100% до 30 000₽ на первый депозит плюс 100 фриспинов.',
    amount: '100% до 30 000 ₽ + 100 FS', type: 'deposit',
    validUntil: '2026-12-31', wagering: '40x', exclusive: true, verified: true,
  },
  {
    slug: 'monro-promo',
    serviceSlug: 'monro', serviceName: 'MONRO Casino', serviceLogo: '🎬',
    serviceAccent: '#8b5cf6', serviceWebsite: 'https://monro.casino',
    code: 'MONRORANK', title: '100% + 200 FS на депозит',
    description: 'Промокод BetRank для MONRO: приветственный бонус 100% до 50 000₽ и 200 фриспинов.',
    amount: '100% до 50 000 ₽ + 200 FS', type: 'deposit',
    validUntil: '2026-12-31', wagering: '40x', exclusive: true, verified: true,
  },
  {
    slug: 'starda-promo',
    serviceSlug: 'starda', serviceName: 'STARDA Casino', serviceLogo: '⭐',
    serviceAccent: '#eab308', serviceWebsite: 'https://starda.casino',
    code: 'STARDARANK', title: '100 FS без депозита',
    description: 'Промокод BetRank: 100 бесплатных вращений без депозита сразу при регистрации.',
    amount: '100 FS без депозита', type: 'nodep',
    validUntil: '2026-12-31', wagering: '40x', exclusive: true, verified: true,
  },
  {
    slug: 'jet-promo',
    serviceSlug: 'jet', serviceName: 'JET Casino', serviceLogo: '✈️',
    serviceAccent: '#06b6d4', serviceWebsite: 'https://jetcasino.com',
    code: 'JETRANK', title: '150 FS без депозита',
    description: 'Эксклюзивный промокод для JET Casino: 150 фриспинов без пополнения + бонус на первый депозит.',
    amount: '150 FS без депозита', type: 'nodep',
    validUntil: '2026-12-31', wagering: '40x', exclusive: true, verified: true,
  },
  {
    slug: 'rox-promo',
    serviceSlug: 'rox', serviceName: 'ROX Casino', serviceLogo: '🪨',
    serviceAccent: '#ef4444', serviceWebsite: 'https://roxcasino.com',
    code: 'ROXRANK', title: '100% + 100 FS',
    description: 'Промокод BetRank для ROX Casino: бонус 100% до 30 000₽ и 100 фриспинов.',
    amount: '100% до 30 000 ₽ + 100 FS', type: 'deposit',
    validUntil: '2026-12-31', wagering: '40x', exclusive: true, verified: true,
  },
  {
    slug: 'martin-promo',
    serviceSlug: 'martin', serviceName: 'MARTIN Casino', serviceLogo: '🎩',
    serviceAccent: '#0ea5e9', serviceWebsite: 'https://martincasino.com',
    code: 'MARTINRANK', title: '100% + 100 FS на первый депозит',
    description: 'Промокод BetRank для MARTIN Casino: приветственный бонус 100% до 30 000₽ + 100 фриспинов.',
    amount: '100% до 30 000 ₽ + 100 FS', type: 'deposit',
    validUntil: '2026-12-31', wagering: '40x', exclusive: true, verified: true,
  },
  {
    slug: 'stake-promo',
    serviceSlug: 'stake', serviceName: 'Stake', serviceLogo: '🎲',
    serviceAccent: '#10b981', serviceWebsite: 'https://stake.com',
    code: 'STAKERANK', title: 'Кэшбек 5% навсегда',
    description: 'Промокод BetRank для Stake: активируйте постоянный кэшбек 5% на все ставки без вейджера.',
    amount: '5% кэшбек', type: 'cashback',
    validUntil: '2026-12-31', wagering: '0x', exclusive: true, verified: true,
  },
]
