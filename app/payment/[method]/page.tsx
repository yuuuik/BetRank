import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { paymentMethods } from '@/lib/categories'
import { services } from '@/lib/data'
import { ServiceCard } from '@/components/cards/ServiceCard'
import { EmailSubscribe } from '@/components/widgets/EmailSubscribe'
import { ChevronRight, Clock, CreditCard, DollarSign } from 'lucide-react'

interface Props { params: { method: string } }

export async function generateStaticParams() {
  return paymentMethods.map(m => ({ method: m.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const method = paymentMethods.find(m => m.slug === params.method)
  if (!method) return {}
  return { title: `Казино с ${method.name} 2026`, description: method.metaDesc }
}

export default function PaymentMethodPage({ params }: Props) {
  const method = paymentMethods.find(m => m.slug === params.method)
  if (!method) notFound()

  const filtered = services.filter(method.filter)

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex items-center gap-1.5 text-sm text-slate-500 mb-6 flex-wrap">
        <Link href="/" className="hover:text-slate-300">Главная</Link>
        <ChevronRight size={13} />
        <span className="text-slate-500">Способы оплаты</span>
        <ChevronRight size={13} />
        <span className="text-slate-300">{method.name}</span>
      </div>

      <div className="relative overflow-hidden rounded-2xl p-8 mb-10 border"
        style={{ background: `linear-gradient(135deg, ${method.color}12, ${method.color}04)`, borderColor: `${method.color}25` }}>
        <div className="text-4xl mb-3">{method.icon}</div>
        <h1 className="section-title text-3xl md:text-4xl text-white mb-2">Казино с {method.name}</h1>
        <p className="text-slate-500 text-sm mb-3">{method.fullName}</p>
        <p className="text-slate-400 text-lg max-w-2xl">{method.description}</p>

        {/* Параметры метода */}
        <div className="flex flex-wrap gap-4 mt-6">
          <div className="flex items-center gap-2 text-sm">
            <DollarSign size={14} style={{ color: method.color }} />
            <span className="text-slate-500">Мин. депозит:</span>
            <span className="text-white font-600">{method.minDeposit}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock size={14} style={{ color: method.color }} />
            <span className="text-slate-500">Скорость:</span>
            <span className="text-white font-600">{method.speed}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <CreditCard size={14} style={{ color: method.color }} />
            <span className="text-slate-500">Комиссия:</span>
            <span className="text-white font-600">{method.commission}</span>
          </div>
        </div>
      </div>

      <div className="glass rounded-2xl border border-purple-900/20 p-6 mb-10">
        <p className="text-slate-400 text-sm leading-relaxed">{method.seoText}</p>
      </div>

      <h2 className="section-title text-2xl text-white mb-6">
        {filtered.length > 0 ? `${filtered.length} казино с ${method.name}` : `Казино поддерживающие ${method.name}`}
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-12">
        {(filtered.length > 0 ? filtered : services.sort((a,b) => b.rating - a.rating).slice(0, 6)).map((service, i) => (
          <ServiceCard key={service.slug} service={service} rank={i + 1} />
        ))}
      </div>

      {/* Другие методы */}
      <div className="mb-10">
        <h2 className="section-title text-xl text-white mb-4">Другие способы оплаты</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {paymentMethods.filter(m => m.slug !== params.method).map(m => (
            <Link key={m.slug} href={`/payment/${m.slug}`}
              className="service-card p-4 text-center hover:scale-105 transition-transform">
              <div className="text-3xl mb-2">{m.icon}</div>
              <p className="text-white text-sm font-600" style={{ fontFamily: 'Exo 2, sans-serif' }}>{m.name}</p>
              <p className="text-slate-500 text-xs mt-0.5">{m.speed}</p>
            </Link>
          ))}
        </div>
      </div>

      <EmailSubscribe compact />
    </div>
  )
}
