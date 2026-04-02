import { Metadata } from 'next'
import Link from 'next/link'
import { paymentMethods } from '@/lib/categories'
import { services } from '@/lib/data'
import { ChevronRight, Clock, CreditCard, DollarSign } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Способы оплаты в казино 2026 — пополнение и вывод',
  description: 'Сравнение способов оплаты в онлайн-казино: СБП, банковская карта, криптовалюта, ЮMoney. Скорость, комиссии, лимиты.',
}

export default function PaymentPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex items-center gap-1.5 text-sm text-slate-500 mb-6 flex-wrap">
        <Link href="/" className="hover:text-slate-300">Главная</Link>
        <ChevronRight size={13} />
        <span className="text-slate-300">Способы оплаты</span>
      </div>

      <h1 className="section-title text-3xl md:text-4xl text-white mb-3">Способы оплаты в казино</h1>
      <p className="text-slate-400 text-lg mb-10 max-w-2xl">
        Выберите удобный способ пополнения и вывода — СБП, карта, крипта или электронный кошелёк.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5">
        {paymentMethods.map(method => {
          const count = services.filter(method.filter).length
          return (
            <Link key={method.slug} href={`/payment/${method.slug}`}
              className="service-card p-6 group hover:scale-[1.01] transition-transform">
              <div className="flex items-start gap-4">
                <div className="text-4xl shrink-0">{method.icon}</div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-white font-700 text-xl mb-0.5" style={{ fontFamily: 'Exo 2, sans-serif' }}>
                    {method.name}
                  </h2>
                  <p className="text-slate-500 text-sm mb-3">{method.fullName}</p>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">{method.description}</p>

                  <div className="flex flex-wrap gap-3 text-sm">
                    <div className="flex items-center gap-1.5">
                      <DollarSign size={13} style={{ color: method.color }} />
                      <span className="text-slate-500">от</span>
                      <span className="text-white font-600">{method.minDeposit}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock size={13} style={{ color: method.color }} />
                      <span className="text-white font-600">{method.speed}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CreditCard size={13} style={{ color: method.color }} />
                      <span className="text-white font-600">{method.commission}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-5 pt-4 border-t border-purple-900/20">
                <span className="text-slate-500 text-sm">{count} казино</span>
                <span className="text-sm font-600 group-hover:translate-x-1 transition-transform"
                  style={{ color: method.color }}>
                  Смотреть →
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
