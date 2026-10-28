import Lenis from 'lenis'
import { gsap, ScrollTrigger, prefersReducedMotion } from './gsap'

let lenis: Lenis | null = null

/** Inertia scrolling on desktop, driven by GSAP's ticker so ScrollTrigger stays in sync. */
export function startSmoothScroll() {
  if (lenis || prefersReducedMotion()) return
  lenis = new Lenis({ duration: 1.15, smoothWheel: true })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((t) => lenis?.raf(t * 1000))
  gsap.ticker.lagSmoothing(0)
}

export function scrollToTarget(target: string | number, immediate = false) {
  if (lenis) {
    lenis.scrollTo(target, { immediate, duration: 1.6 })
    return
  }
  if (typeof target === 'number') window.scrollTo({ top: target, behavior: immediate ? 'auto' : 'smooth' })
  else document.querySelector(target)?.scrollIntoView({ behavior: immediate || prefersReducedMotion() ? 'auto' : 'smooth' })
}

export const lockScroll = (locked: boolean) => {
  if (lenis) locked ? lenis.stop() : lenis.start()
  document.documentElement.style.overflow = locked ? 'hidden' : ''
}
