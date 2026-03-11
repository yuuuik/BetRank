import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-8xl font-900 gradient-text mb-4" style={{fontFamily:'Exo 2, sans-serif', fontWeight:900}}>404</p>
        <h1 className="section-title text-2xl text-white mb-3">Страница не найдена</h1>
        <p className="text-slate-400 mb-8">Запрашиваемая страница не существует или была удалена</p>
        <Link href="/" className="btn-neon">
          <ArrowLeft size={16} /> На главную
        </Link>
      </div>
    </div>
  )
}
