'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'

const faqData = [
  {
    category: 'Общие вопросы',
    emoji: '❓',
    questions: [
      { q: 'Как BetRank проверяет казино?', a: 'Наша команда тестирует каждую платформу: регистрируется, вносит депозит, играет, запрашивает вывод и оценивает поддержку. Проверка занимает от 2 до 4 недель.' },
      { q: 'Платит ли BetRank за положительные отзывы?', a: 'Нет. Мы принципиально не принимаем деньги за улучшение рейтингов. Партнёрские комиссии мы получаем с переходов, но это не влияет на оценку.' },
      { q: 'Как часто обновляются рейтинги?', a: 'Рейтинги пересматриваются ежемесячно. При существенных изменениях (новые бонусы, проблемы с выплатами) обновление происходит немедленно.' },
    ],
  },
  {
    category: 'Бонусы',
    emoji: '🎁',
    questions: [
      { q: 'Что такое вейджер (wagering)?', a: 'Вейджер — это коэффициент отыгрыша бонуса. Например, бонус 1000 ₽ с вейджером 35x означает, что нужно поставить 35 000 ₽ для вывода бонусных средств.' },
      { q: 'Можно ли выиграть реальные деньги с бездепозитного бонуса?', a: 'Да, но нужно выполнить условия отыгрыша. Максимальная сумма вывода обычно ограничена (например, 3000–5000 ₽).' },
      { q: 'Почему мой бонус аннулировали?', a: 'Причины: нарушение условий (запрещённые игры, несколько аккаунтов), пропущен срок отыгрыша, вывод до выполнения условий. Всегда читайте правила.' },
    ],
  },
  {
    category: 'Выплаты',
    emoji: '💸',
    questions: [
      { q: 'Почему задерживается вывод?', a: 'Причины: верификация аккаунта, технические работы, выходные дни у банков, подозрительная активность. Большинство задержек решается обращением в поддержку.' },
      { q: 'Нужно ли платить налоги с выигрышей?', a: 'В России выигрыши в онлайн-казино облагаются НДФЛ (13%). Формально вы обязаны декларировать доходы свыше 4000 ₽ в год. Рекомендуем проконсультироваться с налоговым специалистом.' },
      { q: 'Что делать, если казино не выплачивает деньги?', a: 'Сначала обратитесь в поддержку. Если нет результата — напишите жалобу регулятору (eCOGRA, MGA, Curaçao). BetRank помогает читателям в разрешении споров.' },
    ],
  },
  {
    category: 'Безопасность',
    emoji: '🔒',
    questions: [
      { q: 'Как проверить лицензию казино?', a: 'Информация о лицензии обычно находится внизу сайта. Проверьте номер лицензии на официальном сайте регулятора (MGA: mga.org.mt, Curaçao: gaming-curacao.com).' },
      { q: 'Как защитить аккаунт от взлома?', a: 'Используйте уникальный сложный пароль, включите двухфакторную аутентификацию (если доступна), никому не передавайте данные для входа.' },
      { q: 'Что такое KYC-верификация?', a: 'KYC (Know Your Customer) — проверка личности. Вас попросят загрузить паспорт и подтверждение адреса. Это обязательная процедура для легальных операторов.' },
    ],
  },
]

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-purple-900/20 last:border-0">
      <button onClick={() => setOpen(!open)} className="w-full text-left py-4 flex items-start justify-between gap-4 group">
        <span className="text-white font-500 text-sm group-hover:text-purple-300 transition-colors">{q}</span>
        <ChevronDown size={16} className={`text-purple-400 shrink-0 transition-transform mt-0.5 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <p className="text-slate-400 text-sm leading-relaxed pb-4">{a}</p>}
    </div>
  )
}

export default function FAQPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link href="/" className="hover:text-slate-300">Главная</Link>
        <span>/</span>
        <span className="text-slate-300">FAQ</span>
      </div>
      <div className="mb-10">
        <h1 className="section-title text-3xl md:text-4xl text-white mb-3">Часто задаваемые вопросы</h1>
        <p className="text-slate-400 text-lg">Ответы на самые популярные вопросы об онлайн-казино, букмекерах и бонусах</p>
      </div>

      <div className="space-y-6">
        {faqData.map(category => (
          <div key={category.category} className="service-card p-6">
            <h2 className="section-title text-xl text-white mb-5 flex items-center gap-2">
              <span>{category.emoji}</span> {category.category}
            </h2>
            {category.questions.map(item => (
              <FAQItem key={item.q} q={item.q} a={item.a} />
            ))}
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 service-card text-center">
        <p className="text-slate-400 mb-3">Не нашли ответ на свой вопрос?</p>
        <Link href="mailto:support@betrank.vercel.app" className="btn-neon">Написать нам</Link>
      </div>
    </div>
  )
}
