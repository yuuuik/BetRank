'use client'

interface ShowMoreButtonProps {
  targetId: string
  total: number
  initial: number
}

export function ShowMoreButton({ targetId, total, initial }: ShowMoreButtonProps) {
  const rest = total - initial

  function toggle() {
    const el = document.getElementById(targetId)
    if (!el) return
    const isHidden = el.classList.contains('hidden')
    el.classList.toggle('hidden', !isHidden)
    const btn = el.previousElementSibling?.querySelector('[data-show-more]') as HTMLButtonElement | null
    if (btn) btn.textContent = isHidden ? 'Свернуть ↑' : `Показать ещё ${rest} ↓`
  }

  return (
    <div className="flex justify-center mb-12">
      <button
        data-show-more
        onClick={toggle}
        className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-600 text-purple-300 border border-purple-700/40 hover:border-purple-500/60 hover:text-purple-200 hover:bg-purple-900/20 transition-all"
      >
        Показать ещё {rest} ↓
      </button>
    </div>
  )
}
