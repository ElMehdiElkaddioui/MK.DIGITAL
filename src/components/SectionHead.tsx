import type { ReactNode } from 'react'

/** Numbered section heading: kicker + two-line display title with masked line reveals. */
export function SectionHead({
  index,
  kicker,
  id,
  line1,
  line2,
  tone = 'dark',
  className = '',
}: {
  index: string
  kicker: string
  id: string
  line1: ReactNode
  line2?: ReactNode
  tone?: 'dark' | 'light'
  className?: string
}) {
  const muted = tone === 'dark' ? 'text-white/45' : 'text-black/45'
  return (
    <div className={className}>
      <p data-reveal className={`kicker flex items-center gap-4 ${muted}`}>
        <span>{index}</span>
        <span aria-hidden="true" className={`h-px w-10 ${tone === 'dark' ? 'bg-white/30' : 'bg-black/30'}`} />
        <span>{kicker}</span>
      </p>
      <h2 id={id} data-lines className="display mt-6 text-[clamp(2.3rem,7.4vw,7.5rem)]">
        <span data-line>
          <span>{line1}</span>
        </span>
        {line2 && (
          <span data-line>
            <span>{line2}</span>
          </span>
        )}
      </h2>
    </div>
  )
}
