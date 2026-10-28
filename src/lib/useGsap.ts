import { useLayoutEffect, type DependencyList, type RefObject } from 'react'
import { gsap } from './gsap'

/**
 * Runs GSAP setup scoped to a container and reverts every tween/ScrollTrigger on cleanup.
 * The callback receives `reduced` so each section can keep a static fallback.
 */
export function useGsap(
  scope: RefObject<HTMLElement | null>,
  setup: (ctx: { reduced: boolean; mobile: boolean }) => void | (() => void),
  deps: DependencyList = [],
) {
  useLayoutEffect(() => {
    if (!scope.current) return
    const mm = gsap.matchMedia(scope.current)
    mm.add({ reduced: '(prefers-reduced-motion: reduce)', mobile: '(max-width: 767px)', any: 'all' }, (c) => {
      const { reduced, mobile } = c.conditions as { reduced: boolean; mobile: boolean }
      return setup({ reduced, mobile })
    })
    return () => mm.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

/** Standard reveal: every [data-reveal] child rises in when it enters the viewport. */
export function revealChildren(root: HTMLElement | null) {
  if (!root) return
  root.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
    gsap.from(el, { opacity: 0, y: 40, duration: 1.2, scrollTrigger: { trigger: el, start: 'top 88%' } })
  })
  root.querySelectorAll<HTMLElement>('[data-lines]').forEach((el) => {
    gsap.from(el.querySelectorAll('[data-line] > span'), {
      yPercent: 110,
      duration: 1.3,
      stagger: 0.08,
      scrollTrigger: { trigger: el, start: 'top 85%' },
    })
  })
}
