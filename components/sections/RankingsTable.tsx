import Link from 'next/link'
import { Trophy, Star, ExternalLink, ArrowRight } from 'lucide-react'
import { services } from '@/lib/data'
import { BrandLogo } from '@/components/ui/BrandLogo'

export function RankingsTable() {
  const ranked = [...services].sort((a, b) => b.rating - a.rating)

  const medals = ['🥇', '🥈', '🥉']

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-yellow-500/10 border border-amber-500/30 flex items-center justify-center">
              <Trophy size={20} className="text-amber-400" />
            </div>
            <div>
              <h2 className="section-title text-2xl text-white">Таблица рейтинга</h2>
              <p className="text-slate-500 text-sm">Все платформы в сравнении</p>
            </div>
          </div>
          <Link href="/ratings" className="hidden sm:flex items-center gap-1 text-sm text-purple-400 hover:text-purple-300 transition-colors">
            Полный рейтинг <ArrowRight size={14} />
          </Link>
        </div>

        <div className="glass rounded-2xl border border-purple-900/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full rankings-table">
              <thead>
                <tr className="border-b border-purple-900/20">
                  <th className="px-4 py-3 text-left text-xs font-600 text-slate-500 uppercase tracking-wider">#</th>
                  <th className="px-4 py-3 text-left text-xs font-600 text-slate-500 uppercase tracking-wider">Сервис</th>
                  <th className="px-4 py-3 text-left text-xs font-600 text-slate-500 uppercase tracking-wider hidden md:table-cell">Тип</th>
                  <th className="px-4 py-3 text-left text-xs font-600 text-slate-500 uppercase tracking-wider">Рейтинг</th>
                  <th className="px-4 py-3 text-left text-xs font-600 text-slate-500 uppercase tracking-wider hidden sm:table-cell">Бонус</th>
                  <th className="px-4 py-3 text-left text-xs font-600 text-slate-500 uppercase tracking-wider hidden lg:table-cell">Депозит от</th>
                  <th className="px-4 py-3 text-right text-xs font-600 text-slate-500 uppercase tracking-wider">Действие</th>
                </tr>
              </thead>
              <tbody>
                {ranked.map((service, i) => (
                  <tr key={service.slug} className="border-b border-purple-900/10 transition-colors">
                    <td className="px-4 py-4 text-center">
                      {i < 3 ? (
                        <span className="text-xl">{medals[i]}</span>
                      ) : (
                        <span className="text-slate-500 font-600 text-sm">{i + 1}</span>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <Link href={`/review/${service.slug}`} target="_blank" className="flex items-center gap-3 hover:text-purple-300 transition-colors">
                        <BrandLogo website={service.website} name={service.name} logo={service.logo} logoUrl={service.logoUrl} accentColor={service.accentColor} size="sm" />
                        <div>
                          <p className="text-white font-600 text-sm" style={{fontFamily:'Exo 2, sans-serif'}}>{service.name}</p>
                          <p className="text-slate-500 text-xs hidden sm:block">{service.tagline.slice(0, 40)}...</p>
                        </div>
                      </Link>
                    </td>
                    <td className="px-4 py-4 hidden md:table-cell">
                      <span className="badge badge-featured text-xs px-2.5 py-1">
                        Казино
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {Array.from({length:5}, (_,j) => (
                            <Star key={j} size={11} className={j < Math.floor(service.rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-700'} />
                          ))}
                        </div>
                        <span className="text-amber-400 font-700 text-sm">{service.rating}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 hidden sm:table-cell">
                      <span className="font-600 text-sm" style={{color: service.accentColor}}>{service.mainBonus}</span>
                    </td>
                    <td className="px-4 py-4 hidden lg:table-cell">
                      <span className="text-slate-300 text-sm">{service.minDeposit} ₽</span>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <a href={service.refUrl || service.website} target="_blank" rel="noopener noreferrer nofollow"
                        className="inline-flex items-center gap-1 btn-neon text-xs py-1.5 px-3">
                        Играть <ExternalLink size={11} />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
