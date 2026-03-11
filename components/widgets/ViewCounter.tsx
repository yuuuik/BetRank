'use client'
import { useState, useEffect } from 'react'
import { Eye } from 'lucide-react'

// Симулируем реалистичные просмотры на основе slug (детерминированно)
function seedViews(slug: string): number {
  let hash = 0
  for (let i = 0; i < slug.length; i++) {
    hash = ((hash << 5) - hash) + slug.charCodeAt(i)
    hash |= 0
  }
  return 1200 + Math.abs(hash % 8800) // от 1200 до 10000
}

export function ViewCounter({ slug }: { slug: string }) {
  const [views, setViews] = useState<number | null>(null)

  useEffect(() => {
    const base = seedViews(slug)
    // Добавляем случайный сдвиг при каждом посещении (имитация "сейчас смотрят")
    const live = base + Math.floor(Math.random() * 50)
    setViews(live)
  }, [slug])

  if (!views) return null

  return (
    <span className="inline-flex items-center gap-1 text-xs text-slate-500">
      <Eye size={11} />
      {views.toLocaleString('ru')} просмотров
    </span>
  )
}

// Компонент "сейчас смотрят X человек" для карточек
export function LiveViewers({ slug }: { slug: string }) {
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    let hash = 0
    for (let i = 0; i < slug.length; i++) {
      hash = ((hash << 5) - hash) + slug.charCodeAt(i)
      hash |= 0
    }
    const base = 12 + Math.abs(hash % 88)
    setCount(base)

    // Периодически немного меняем число — ощущение живости
    const interval = setInterval(() => {
      setCount(prev => {
        if (!prev) return base
        const delta = Math.random() > 0.5 ? 1 : -1
        return Math.max(5, Math.min(120, prev + delta))
      })
    }, 4000)
    return () => clearInterval(interval)
  }, [slug])

  if (!count) return null

  return (
    <span className="inline-flex items-center gap-1 text-xs text-emerald-400/80">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
      {count} сейчас смотрят
    </span>
  )
}
