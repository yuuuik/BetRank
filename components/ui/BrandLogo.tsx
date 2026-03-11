'use client'
import { useState, useEffect } from 'react'

interface BrandLogoProps {
  website: string
  name: string
  logo: string
  accentColor: string
  size?: 'sm' | 'md' | 'lg'
}

// Глобальный кэш: домен → рабочий URL или 'failed'
// Живёт всё время работы вкладки, не сбрасывается при ремонте компонентов
const logoCache: Record<string, string | 'failed'> = {}

function getSources(domain: string): string[] {
  return [
    `https://img.logo.dev/${domain}?token=pk_X2xMsTkTSPuWj4MJblmstw`,
    `https://logo.clearbit.com/${domain}`,
    `https://www.google.com/s2/favicons?domain=${domain}&sz=128`,
  ]
}

// Проверяем URL: загружаем Image в фоне и резолвим только если успешно
function probeUrl(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(url)
    img.onerror = () => reject()
    img.src = url
  })
}

// Перебираем источники последовательно, кэшируем результат
async function resolveLogoUrl(domain: string): Promise<string | null> {
  if (logoCache[domain]) {
    return logoCache[domain] === 'failed' ? null : logoCache[domain]
  }
  for (const url of getSources(domain)) {
    try {
      await probeUrl(url)
      logoCache[domain] = url
      return url
    } catch {
      // пробуем следующий
    }
  }
  logoCache[domain] = 'failed'
  return null
}

export function BrandLogo({ website, name, logo, accentColor, size = 'md' }: BrandLogoProps) {
  const domain = website.replace(/https?:\/\//, '').replace(/\/$/, '').split('/')[0]

  const sizeClass = size === 'sm' ? 'w-11 h-11' : size === 'lg' ? 'w-20 h-20' : 'w-14 h-14'
  const imgSize   = size === 'sm' ? 36 : size === 'lg' ? 64 : 44
  const textSize  = size === 'sm' ? 'text-2xl' : size === 'lg' ? 'text-5xl' : 'text-3xl'
  const radius    = size === 'lg' ? 'rounded-2xl' : 'rounded-xl'
  const border    = size === 'lg' ? 2 : 1

  // Берём из кэша сразу если уже есть — без мигания при ремонте
  const cached = logoCache[domain]
  const [resolvedUrl, setResolvedUrl] = useState<string | null>(
    cached && cached !== 'failed' ? cached : null
  )
  const [failed, setFailed] = useState(cached === 'failed')

  useEffect(() => {
    // Если уже знаем результат — ничего не делаем
    if (logoCache[domain]) return

    let cancelled = false
    resolveLogoUrl(domain).then(url => {
      if (cancelled) return
      if (url) setResolvedUrl(url)
      else setFailed(true)
    })
    return () => { cancelled = true }
  }, [domain])

  return (
    <div
      className={`${sizeClass} ${radius} flex items-center justify-center overflow-hidden shrink-0`}
      style={{
        background: `linear-gradient(135deg, ${accentColor}22, ${accentColor}10)`,
        border: `${border}px solid ${accentColor}30`,
      }}
    >
      {resolvedUrl && !failed ? (
        <img
          src={resolvedUrl}
          alt={name}
          width={imgSize}
          height={imgSize}
          className="object-contain w-full h-full p-1.5"
          // Если вдруг картинка пропала (CDN лёг) — показываем эмодзи
          onError={() => {
            delete logoCache[domain]
            setResolvedUrl(null)
            setFailed(true)
          }}
        />
      ) : (
        <span className={`${textSize} select-none`}>{logo}</span>
      )}
    </div>
  )
}
