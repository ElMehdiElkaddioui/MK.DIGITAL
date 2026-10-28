import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion, ScrollTrigger } from '../lib/gsap'

/**
 * Infinite ribbon of words. CSS keeps it moving; scroll velocity briefly speeds it up
 * and flips its direction, so it feels connected to the page.
 */
export function Marquee({ items, className = '', reverse = false }: { items: string[]; className?: string; reverse?: boolean }) {
  const track = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = track.current
    if (!el || prefersReducedMotion()) return
    const anim = el.getAnimations()[0]
    if (!anim) return
    const base = 1
    let reset: ReturnType<typeof setTimeout>
    const st = ScrollTrigger.create({
      onUpdate: (self) => {
        const v = Math.abs(self.getVelocity()) / 500
        const dir = self.direction || 1
        anim.playbackRate = gsap.utils.clamp(-5, 5, dir * Math.max(base, v))
        clearTimeout(reset)
        reset = setTimeout(() => (anim.playbackRate = dir * base), 180)
      },
    })
    return () => {
      st.kill()
      clearTimeout(reset)
    }
  }, [])
  const row = (hidden: boolean) => (
    <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((t, i) => (
        <span key={i} className="flex items-center">
          <span className={i % 2 ? 'outline-text' : 'silver'}>{t}</span>
          <span aria-hidden="true" className="mx-[0.45em] inline-block h-[0.1em] w-[0.55em] -skew-x-[34deg] bg-white/35" />
        </span>
      ))}
    </div>
  )
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div ref={track} className="flex w-max" style={{ animation: `marquee 40s linear infinite${reverse ? ' reverse' : ''}` }}>
        {row(false)}
        {row(true)}
      </div>
    </div>
  )
}
