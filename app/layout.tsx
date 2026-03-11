import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  metadataBase: new URL('https://betrank.pro'),
  title: {
    default: 'BetRank — Рейтинг лучших казино и букмекеров 2026',
    template: '%s | BetRank',
  },
  description: 'BetRank — независимый рейтинг онлайн-казино и букмекерских контор. Обзоры, бонусы, отзывы игроков. Найдите лучшее казино с бонусом на первый депозит.',
  keywords: ['онлайн казино', 'букмекеры', 'бонусы казино', 'рейтинг казино', 'фриспины', 'ставки на спорт'],
  authors: [{ name: 'BetRank Team' }],
  creator: 'BetRank',
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: 'https://betrank.pro',
    siteName: 'BetRank',
    title: 'BetRank — Рейтинг лучших казино и букмекеров',
    description: 'Независимый рейтинг онлайн-казино и букмекерских контор. Найдите лучшие бонусы 2026.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BetRank — Топ казино и букмекеров',
    description: 'Независимый рейтинг с реальными отзывами',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <!-- Yandex.Metrika counter -->
<script type="text/javascript">
    (function(m,e,t,r,i,k,a){
        m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();
        for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
    })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=107271083', 'ym');

    ym(107271083, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});
</script>
<noscript><div><img src="https://mc.yandex.ru/watch/107271083" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
<!-- /Yandex.Metrika counter -->
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Exo+2:wght@300;400;500;600;700;800;900&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'BetRank',
          url: 'https://betrank.pro',
          description: 'Рейтинг лучших онлайн-казино и букмекерских контор',
          potentialAction: {
            '@type': 'SearchAction',
            target: 'https://betrank.pro/reviews?q={search_term_string}',
            'query-input': 'required name=search_term_string',
          },
        }) }} />
      </head>
      <body className="noise-bg">
        {/* Background glow orbs */}
        <div className="glow-orb w-96 h-96 top-0 left-1/4 bg-purple-900/20" style={{position:'fixed',top:'-100px',left:'20%'}} />
        <div className="glow-orb w-96 h-96 bg-blue-900/15" style={{position:'fixed',top:'50%',right:'-100px'}} />
        <div className="glow-orb w-64 h-64 bg-purple-800/10" style={{position:'fixed',bottom:'20%',left:'-50px'}} />
        <div style={{position:'relative',zIndex:1}}>
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
