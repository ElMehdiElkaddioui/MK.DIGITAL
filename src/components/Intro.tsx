import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/gsap'
import { Mark } from './Logo'

const KEY = 'mk-intro-seen'

/** True when the opening sequence should play (first visit of the session, motion allowed). */
export function shouldPlayIntro() {
  if (prefersReducedMotion()) return false
  try {
    return !sessionStorage.getItem(KEY)
  } catch {
    return true
  }
}

/**
 * Opening sequence: the MK mark is revealed along the logo's diagonal, a counter tracks real
 * loading (fonts + hero mark, capped at ~1.6 s), then the screen splits along the same slash.
 */
export function Intro({ onDone }: { onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el) return
    try {
      sessionStorage.setItem(KEY, '1')
    } catch {
      /* private mode — the intro simply plays again next time */
    }
    const q = gsap.utils.selector(el)
    const counter = { v: 0 }
    const out = q('[data-count]')[0]
    const render = () => out && (out.textContent = String(Math.round(counter.v)).padStart(3, '0'))

    // index.html already painted the mark (#boot) before JS: take over without re-revealing it.
    const boot = document.getElementById('boot')
    boot?.remove()
    const enter = gsap.timeline()
    if (!boot) enter.fromTo(q('[data-mark]'), { clipPath: 'polygon(0 100%, 0 100%, 0 100%, 0 100%)' }, { clipPath: 'polygon(0 0, 130% 0, 100% 100%, -30% 100%)', duration: 1.3, ease: 'expo.inOut' })
    enter.from(q('[data-intro-text]'), { autoAlpha: 0, y: 14, stagger: 0.08, duration: 0.8 }, boot ? 0 : 0.3)
    const counting = gsap.to(counter, { v: 86, duration: 1.2, ease: 'power2.out', onUpdate: render })

    const ready = Promise.all([
      document.fonts?.ready ?? Promise.resolve(),
      new Promise<void>((r) => {
        const img = new Image()
        img.onload = img.onerror = () => r()
        img.src = '/brand/mk-mark-640.webp'
      }),
    ])
    const cap = new Promise((r) => setTimeout(r, 1400))
    let cancelled = false
    Promise.all([Promise.race([ready, cap]), new Promise((r) => setTimeout(r, boot ? 1000 : 1300))]).then(() => {
      if (cancelled) return
      counting.kill()
      gsap
        .timeline({ onComplete: () => el && (el.style.display = 'none') })
        .to(counter, { v: 100, duration: 0.45, ease: 'power2.inOut', onUpdate: render })
        .to(q('[data-intro-text], [data-count]'), { autoAlpha: 0, y: -12, duration: 0.4, ease: 'power2.in' }, '+=0.05')
        .to(q('[data-mark]'), { scale: 0.86, autoAlpha: 0, duration: 0.55, ease: 'expo.in' }, '<')
        .to(q('[data-half="a"]'), { xPercent: -60, yPercent: -100, duration: 1.1, ease: 'expo.inOut' }, '-=0.15')
        .to(q('[data-half="b"]'), { xPercent: 60, yPercent: 100, duration: 1.1, ease: 'expo.inOut' }, '<')
        .add(onDone, '-=0.85')
    })
    return () => {
      cancelled = true
      enter.kill()
      counting.kill()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div ref={root} aria-hidden="true" className="fixed inset-0 z-[100] overflow-hidden">
      {/* Two halves cut along the monogram's diagonal */}
      <div data-half="a" className="absolute inset-0 bg-ink" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 18%, 0 82%)' }} />
      <div data-half="b" className="absolute inset-0 bg-ink" style={{ clipPath: 'polygon(0 81.8%, 100% 17.8%, 100% 100%, 0 100%)' }} />
      <div className="absolute inset-0 grid place-items-center">
        <div data-mark className="relative">
          <Mark width={150} eager alt="" className="h-auto w-[110px] md:w-[150px]" />
        </div>
      </div>
      <div className="gutter absolute inset-x-0 bottom-8 flex items-end justify-between md:bottom-12">
        <div className="text-white/60">
          <p data-intro-text className="kicker">MK DIGITAL</p>
          <p data-intro-text className="kicker mt-2 text-white/35">Studio de création web · Maroc</p>
        </div>
        <span data-count className="display tabular-nums text-[clamp(2.5rem,8vw,6rem)] leading-none text-white/90">
          000
        </span>
      </div>
    </div>
  )
}
