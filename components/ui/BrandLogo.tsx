'use client'
import { useState, useEffect } from 'react'

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
    img.onload = () => {
      // Reject tiny default favicons (16×16 placeholder returned by Google when no real favicon exists)
      if (img.naturalWidth <= 16 && img.naturalHeight <= 16) reject()
      else resolve(url)
    }
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

interface BrandLogoProps {
  website: string
  name: string
  logo: string
  logoUrl?: string
  accentColor: string
  size?: 'sm' | 'md' | 'lg'
}

export function BrandLogo({ website, name, logo, logoUrl, accentColor, size = 'md' }: BrandLogoProps) {
  const domain = website.replace(/https?:\/\//, '').replace(/\/$/, '').split('/')[0]

  const sizeClass = size === 'sm' ? 'w-11 h-11' : size === 'lg' ? 'w-20 h-20' : 'w-14 h-14'
  const imgSize   = size === 'sm' ? 36 : size === 'lg' ? 64 : 44
  const radius    = size === 'lg' ? 'rounded-2xl' : 'rounded-xl'
  const border    = size === 'lg' ? 2 : 1

  // Если передан logoUrl — используем его напрямую, без кэша и проб
  const cached = logoUrl ? null : logoCache[domain]
  const [resolvedUrl, setResolvedUrl] = useState<string | null>(
    logoUrl ?? (cached && cached !== 'failed' ? cached : null)
  )
  const [failed, setFailed] = useState(!logoUrl && cached === 'failed')

  useEffect(() => {
    // Локальный логотип — ничего не делаем
    if (logoUrl) return
    // Если уже знаем результат — ничего не делаем
    if (logoCache[domain]) return

    let cancelled = false
    resolveLogoUrl(domain).then(url => {
      if (cancelled) return
      if (url) setResolvedUrl(url)
      else setFailed(true)
    })
    return () => { cancelled = true }
  }, [domain, logoUrl])

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
        <span
          className="font-black tracking-tight select-none leading-none"
          style={{
            fontSize: size === 'lg' ? 22 : size === 'sm' ? 14 : 17,
            color: accentColor,
            fontFamily: 'Exo 2, sans-serif',
          }}
        >
          {name.replace(/\s*(casino|казино)\s*/gi, ' ').replace(/[^a-zA-ZА-Яа-я0-9]/g, ' ').trim().replace(/\s+/g, '').slice(0, 4).toUpperCase()}
        </span>
      )}
    </div>
  )
}
