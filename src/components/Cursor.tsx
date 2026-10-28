import { useEffect, useRef, useState } from 'react'
import { finePointer, gsap, prefersReducedMotion } from '../lib/gsap'

/**
 * Two-part cursor for fine pointers: an exact dot + a trailing ring that grows over links
 * and turns into a labelled disc over elements carrying `data-cursor="Label"`.
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  const [label, setLabel] = useState('')
  const [on, setOn] = useState(false)

  useEffect(() => {
    if (finePointer() && !prefersReducedMotion()) setOn(true)
  }, [])

  useEffect(() => {
    if (!on || !dot.current || !ring.current) return
    const els = [dot.current, ring.current]
    gsap.set(els, { autoAlpha: 0 })
    const dx = gsap.quickTo(dot.current, 'x', { duration: 0.12, ease: 'power3.out' })
    const dy = gsap.quickTo(dot.current, 'y', { duration: 0.12, ease: 'power3.out' })
    const rx = gsap.quickTo(ring.current, 'x', { duration: 0.55, ease: 'power3.out' })
    const ry = gsap.quickTo(ring.current, 'y', { duration: 0.55, ease: 'power3.out' })
    let current = ''
    let shown = false
    let last = { x: 0, y: 0 }
    const update = (target: Element | null) => {
      const t = target?.closest<HTMLElement>('[data-cursor], a, button, select, label')
      const next = t ? (t.dataset.cursor ?? '·') : ''
      if (next !== current) {
        current = next
        setLabel(next)
      }
    }
    const move = (e: PointerEvent) => {
      if (!shown) {
        shown = true
        gsap.to(els, { autoAlpha: 1, duration: 0.3 })
      }
      last = { x: e.clientX, y: e.clientY }
      dx(e.clientX)
      dy(e.clientY)
      rx(e.clientX)
      ry(e.clientY)
      update(e.target as Element | null)
    }
    // A click can swap the element under a still pointer (form → success, route change).
    const click = () => setTimeout(() => update(document.elementFromPoint(last.x, last.y)), 120)
    window.addEventListener('click', click)
    const hide = () => {
      shown = false
      gsap.to(els, { autoAlpha: 0, duration: 0.3 })
    }
    window.addEventListener('pointermove', move, { passive: true })
    document.documentElement.addEventListener('pointerleave', hide)
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('click', click)
      document.documentElement.removeEventListener('pointerleave', hide)
    }
  }, [on])

  if (!on) return null
  const big = label !== '' && label !== '·'
  return (
    <>
      <div ref={dot} aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[95] -ml-[3px] -mt-[3px] h-[6px] w-[6px] rounded-full bg-white mix-blend-difference" />
      <div ref={ring} aria-hidden="true" className={`pointer-events-none fixed left-0 top-0 z-[95] ${big ? '' : 'mix-blend-difference'}`}>
        <div
          className={`flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border transition-[width,height,background-color,border-color] duration-500 ease-[cubic-bezier(.16,1,.3,1)] ${
            big ? 'h-24 w-24 border-transparent bg-white text-black' : label ? 'h-14 w-14 border-white/80' : 'h-9 w-9 border-white/40'
          }`}
        >
          {big && <span className="kicker text-[0.56rem] !tracking-[0.2em]">{label}</span>}
        </div>
      </div>
    </>
  )
}
