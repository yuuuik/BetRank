import { MetadataRoute } from 'next'
import { services } from '@/lib/data'
import { casinoCategories, bettingCategories, bonusCategories, paymentMethods } from '@/lib/categories'
import { games } from '@/lib/games'
import { providers } from '@/lib/providers'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://betrank.pro'
  const now = new Date()

  return [
    { url: base, lastModified: now, changeFrequency: 'daily', priority: 1 },
    { url: `${base}/casino`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${base}/betting`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${base}/bonuses`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${base}/ratings`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/promo`, lastModified: now, changeFrequency: 'daily', priority: 0.85 },
    { url: `${base}/games`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/providers`, lastModified: now, changeFrequency: 'weekly', priority: 0.75 },
    { url: `${base}/reviews`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${base}/guides`, lastModified: now, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${base}/news`, lastModified: now, changeFrequency: 'daily', priority: 0.7 },
    { url: `${base}/faq`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    ...services.map(s => ({ url: `${base}/review/${s.slug}`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.8 })),
    ...casinoCategories.map(c => ({ url: `${base}/casino/${c.slug}`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.75 })),
    ...bettingCategories.map(c => ({ url: `${base}/betting/${c.slug}`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.75 })),
    ...bonusCategories.map(c => ({ url: `${base}/bonuses/${c.slug}`, lastModified: now, changeFrequency: 'daily' as const, priority: 0.7 })),
    ...games.map(g => ({ url: `${base}/games/${g.slug}`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.7 })),
    ...providers.map(p => ({ url: `${base}/providers/${p.slug}`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.65 })),
    ...paymentMethods.map(m => ({ url: `${base}/payment/${m.slug}`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.6 })),
  ]
}
