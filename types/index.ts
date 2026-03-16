export type ServiceType = 'casino' | 'betting' | 'both'

export interface PaymentMethod {
  name: string
  icon: string
  minDeposit: number
  maxWithdrawal: number
  time: string
}

export interface BonusOffer {
  type: 'deposit' | 'freespins' | 'cashback' | 'registration' | 'reload'
  title: string
  description: string
  amount: string
  wagering: string
  validDays: number
}

export interface Review {
  author: string
  rating: number
  date: string
  text: string
  avatar: string
}

export interface Service {
  slug: string
  name: string
  logo: string
  logoUrl?: string
  tagline: string
  description: string
  fullDescription: string
  rating: number
  userRating: number
  reviewCount: number
  type: ServiceType
  founded: number
  license: string
  website: string
  refUrl?: string
  mainBonus: string
  bonuses: BonusOffer[]
  hasLiveBetting: boolean
  hasMobileApp: boolean
  hasFastWithdrawal: boolean
  minDeposit: number
  hasFreeSpins: boolean
  hasCashback: boolean
  hasRegistrationBonus: boolean
  hasDepositBonus: boolean
  pros: string[]
  cons: string[]
  paymentMethods: PaymentMethod[]
  screenshots: string[]
  faq: { question: string; answer: string }[]
  reviews: Review[]
  featured: boolean
  popular: boolean
  badge?: string
  accentColor: string
}

export interface FilterState {
  registrationBonus: boolean
  freeSpins: boolean
  depositBonus: boolean
  cashback: boolean
  liveBetting: boolean
  mobileApp: boolean
  fastWithdrawal: boolean
  minDeposit: number | null
  type: 'all' | 'casino' | 'betting'
  sortBy: 'rating' | 'bonus' | 'name' | 'newest'
  search: string
}
