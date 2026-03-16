import { Metadata } from 'next'
import Link from 'next/link'
import { Clock, ExternalLink } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Новости онлайн-казино 2026 — Последние события',
  description: 'Актуальные новости мира онлайн-казино: новые игры, бонусы, акции, обновления платформ.',
}

const news = [
  {
    title: 'Vavada запускает весенний марафон с призовым фондом 500 000 ₽',
    excerpt: 'Vavada Casino анонсировало весенний турнирный марафон среди зарегистрированных игроков. Участники соревнуются в специально отобранных слотах Pragmatic Play и BGaming. Призовой фонд распределяется между топ-100 лидеров таблицы.',
    date: '2026-03-15',
    emoji: '🌀',
    slug: 'vavada-spring-marathon',
    source: 'vavada.com',
    sourceUrl: 'https://vavada.com/tournaments',
    tag: 'Акция',
    tagColor: '#6366f1',
    important: true,
  },
  {
    title: 'Pragmatic Play: Gates of Olympus 2 — официальный анонс',
    excerpt: 'Pragmatic Play официально анонсировал сиквел легендарного слота Gates of Olympus. В новой версии обещают улучшенный движок множителей, расширенное поле барабанов и новый режим Buy Bonus с гарантированными мега-множителями.',
    date: '2026-03-12',
    emoji: '⚡',
    slug: 'gates-of-olympus-2-announce',
    source: 'pragmaticplay.com',
    sourceUrl: 'https://www.pragmaticplay.com/en/games/gates-of-olympus/',
    tag: 'Новинка',
    tagColor: '#f59e0b',
    important: false,
  },
  {
    title: '1Win Casino: новый приветственный пакет до 75 000 ₽ + 150 фриспинов',
    excerpt: '1Win обновил приветственную акцию для новых игроков. Теперь пакет включает бонус на 4 первых депозита с суммарным лимитом до 75 000 ₽ и 150 фриспинов на популярных слотах Pragmatic Play. Вейджер — x35.',
    date: '2026-03-11',
    emoji: '🏅',
    slug: '1win-welcome-2026',
    source: '1win.com',
    sourceUrl: 'https://1win.com/bonuses/',
    tag: 'Бонус',
    tagColor: '#4ade80',
    important: false,
  },
  {
    title: 'Evolution Gaming: новое live-шоу Funky Time появилось в казино',
    excerpt: 'Evolution Gaming расширяет линейку live-шоу: Funky Time уже доступна в крупных онлайн-казино. Игра сочетает элементы Crazy Time с диско-тематикой и четырьмя бонусными раундами. RTP достигает 96,10%.',
    date: '2026-03-09',
    emoji: '🎡',
    slug: 'evolution-funky-time',
    source: 'evolution.com',
    sourceUrl: 'https://www.evolution.com/games/',
    tag: 'Игра',
    tagColor: '#a855f7',
    important: false,
  },
  {
    title: 'Stake Casino: обновлённая программа лояльности с кэшбеком до 15%',
    excerpt: 'Stake обновил систему VIP-привилегий. Теперь программа насчитывает 8 уровней с кэшбеком от 5% до 15% от проигрышей. Для активации достаточно сделать первый депозит — все ставки учитываются автоматически.',
    date: '2026-03-07',
    emoji: '🎲',
    slug: 'stake-loyalty-update',
    source: 'stake.com',
    sourceUrl: 'https://stake.com',
    tag: 'Программа лояльности',
    tagColor: '#38bdf8',
    important: false,
  },
  {
    title: 'Spribe: Aviator преодолел отметку 10 млн игроков по всему миру',
    excerpt: 'Разработчик Spribe сообщил о достижении знаковой отметки — краш-игра Aviator теперь насчитывает более 10 миллионов активных игроков. Игра продолжает оставаться лидером среди краш-игр и доступна в большинстве топовых казино.',
    date: '2026-03-05',
    emoji: '✈️',
    slug: 'aviator-10m-players',
    source: 'spribe.co',
    sourceUrl: 'https://spribe.co/games/aviator',
    tag: 'Рекорд',
    tagColor: '#1a73e8',
    important: false,
  },
  {
    title: 'Joy Casino: 200 фриспинов за регистрацию без депозита в марте',
    excerpt: 'Joy Casino запустило ограниченную акцию — 200 фриспинов за верификацию аккаунта без пополнения баланса. Акция действует в течение марта 2026. Выигрыши по фриспинам зачисляются с вейджером x40.',
    date: '2026-03-03',
    emoji: '🎉',
    slug: 'joycasino-freeroll-march',
    source: 'joycasino.com',
    sourceUrl: 'https://joycasino.com/bonuses/',
    tag: 'Фриспины',
    tagColor: '#fb923c',
    important: false,
  },
  {
    title: 'Hacksaw Gaming: новый слот Chaos Crew 3 выходит в апреле',
    excerpt: 'Hacksaw Gaming анонсировал третью часть популярной серии Chaos Crew. Релиз запланирован на апрель 2026. Разработчики обещают повышенный потенциал до x25 000 и новый механизм «Wild Multiplier Respin».',
    date: '2026-03-01',
    emoji: '🎰',
    slug: 'hacksaw-chaos-crew-3',
    source: 'hacksawgaming.com',
    sourceUrl: 'https://www.hacksawgaming.com/games/',
    tag: 'Анонс',
    tagColor: '#22c55e',
    important: false,
  },
]

export default function NewsPage() {
  const featured = news[0]
  const rest = news.slice(1)

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link href="/" className="hover:text-slate-300">Главная</Link>
        <span>/</span>
        <span className="text-slate-300">Новости</span>
      </div>

      <div className="mb-8">
        <h1 className="section-title text-3xl md:text-4xl text-white mb-3">Новости</h1>
        <p className="text-slate-400 text-lg">Актуальные события в мире онлайн-казино</p>
      </div>

      {/* Главная новость */}
      <a href={featured.sourceUrl} target="_blank" rel="noopener noreferrer nofollow"
        className="block service-card p-6 mb-8 group cursor-pointer">
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span className="text-2xl">{featured.emoji}</span>
          <span className="text-xs px-2 py-0.5 rounded-full font-600"
            style={{ background: `${featured.tagColor}20`, color: featured.tagColor, border: `1px solid ${featured.tagColor}30` }}>
            {featured.tag}
          </span>
          <span className="badge badge-featured ml-1">Главное</span>
          <span className="text-xs text-slate-500 ml-auto flex items-center gap-1">
            <Clock size={11} />
            {new Date(featured.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })}
          </span>
        </div>
        <h2 className="section-title text-xl md:text-2xl text-white mb-3 group-hover:text-purple-300 transition-colors">
          {featured.title}
        </h2>
        <p className="text-slate-400 leading-relaxed mb-4">{featured.excerpt}</p>
        <div className="flex items-center justify-between flex-wrap gap-2">
          <span className="text-xs text-slate-500">
            Источник: <span className="text-slate-400 font-500">{featured.source}</span>
          </span>
          <span className="flex items-center gap-1.5 text-purple-400 text-sm font-600 group-hover:text-white transition-colors px-3 py-1.5 rounded-xl border border-purple-700/40 group-hover:bg-purple-700/20">
            Читать на сайте <ExternalLink size={13} />
          </span>
        </div>
      </a>

      {/* Остальные новости */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rest.map(item => (
          <a key={item.slug} href={item.sourceUrl} target="_blank" rel="noopener noreferrer nofollow"
            className="service-card p-5 flex flex-col group cursor-pointer">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">{item.emoji}</span>
                <span className="text-xs px-2 py-0.5 rounded-full"
                  style={{ background: `${item.tagColor}15`, color: item.tagColor, border: `1px solid ${item.tagColor}25` }}>
                  {item.tag}
                </span>
              </div>
              <span className="text-xs text-slate-600 flex items-center gap-1">
                <Clock size={10} />
                {new Date(item.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })}
              </span>
            </div>

            <h3 className="text-white font-600 text-sm leading-snug mb-2 group-hover:text-purple-300 transition-colors flex-1"
              style={{ fontFamily: 'Exo 2, sans-serif' }}>
              {item.title}
            </h3>
            <p className="text-slate-500 text-xs leading-relaxed mb-4 line-clamp-3">{item.excerpt}</p>

            <div className="flex items-center justify-between mt-auto pt-3 border-t border-purple-900/20">
              <span className="text-xs text-slate-600">{item.source}</span>
              <span className="flex items-center gap-1 text-purple-400 text-xs font-600 group-hover:text-white transition-colors px-2 py-1 rounded-lg border border-purple-800/30 group-hover:border-purple-500/50 group-hover:bg-purple-700/20">
                Читать <ExternalLink size={10} />
              </span>
            </div>
          </a>
        ))}
      </div>

      {/* Дисклеймер */}
      <p className="mt-8 text-xs text-slate-600 text-center">
        Новости содержат ссылки на официальные сайты источников. Нажмите «Читать» чтобы перейти на страницу оригинала.
      </p>
    </div>
  )
}
