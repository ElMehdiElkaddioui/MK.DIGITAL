import { createContext, useCallback, useContext, useEffect, useRef, useState, type AnchorHTMLAttributes, type ReactNode } from 'react'
import { gsap, prefersReducedMotion, ScrollTrigger } from './gsap'
import { scrollToTarget } from './smooth'

type Router = { path: string; navigate: (to: string) => void }
const Ctx = createContext<Router>({ path: '/', navigate: () => {} })
export const useRouter = () => useContext(Ctx)

const normalize = (p: string) => (p.length > 1 ? p.replace(/\/+$/, '') : p)

/**
 * Minimal history router with a cinematic transition: a diagonal curtain (the slash of the
 * MK monogram) covers the page, the route swaps underneath, then the curtain leaves.
 */
export function RouterProvider({ children }: { children: ReactNode }) {
  const [path, setPath] = useState(() => normalize(window.location.pathname))
  const curtain = useRef<HTMLDivElement>(null)
  const busy = useRef(false)

  const swap = useCallback((to: string, push: boolean) => {
    const [pathname, hash] = to.split('#')
    const target = normalize(pathname || '/')
    const apply = () => {
      if (push) history.pushState(null, '', to)
      setPath(target)
      requestAnimationFrame(() => {
        ScrollTrigger.refresh()
        if (hash) setTimeout(() => scrollToTarget(`#${hash}`, true), 60)
        else scrollToTarget(0, true)
      })
    }
    if (prefersReducedMotion() || !curtain.current) return apply()
    busy.current = true
    const el = curtain.current
    gsap
      .timeline({ onComplete: () => void (busy.current = false) })
      .set(el, { display: 'block' })
      .fromTo(el, { clipPath: 'polygon(0% 100%, 0% 100%, -40% 100%, -40% 100%)' }, { clipPath: 'polygon(0% 0%, 140% 0%, 100% 100%, -40% 100%)', duration: 0.75, ease: 'expo.inOut' })
      .add(apply)
      .fromTo('[data-curtain-mark]', { autoAlpha: 0, scale: 0.9 }, { autoAlpha: 1, scale: 1, duration: 0.4 }, '-=0.25')
      .to('[data-curtain-mark]', { autoAlpha: 0, duration: 0.25 }, '+=0.1')
      .to(el, { clipPath: 'polygon(140% 0%, 140% 0%, 100% 0%, 100% 0%)', duration: 0.8, ease: 'expo.inOut' })
      .set(el, { display: 'none' })
  }, [])

  const navigate = useCallback(
    (to: string) => {
      if (busy.current) return
      const [pathname, hash] = to.split('#')
      if (normalize(pathname || '/') === path) {
        if (hash) scrollToTarget(`#${hash}`)
        else scrollToTarget(0)
        if (hash) history.replaceState(null, '', to)
        return
      }
      swap(to, true)
    },
    [path, swap],
  )

  // Deep link on first load (e.g. /#contact): the native jump fires before React renders,
  // so scroll once the layout exists — behind the intro if it is playing.
  useEffect(() => {
    const { hash } = window.location
    if (!hash || hash.length < 2) return
    const id = setTimeout(() => {
      ScrollTrigger.refresh()
      if (document.querySelector(hash)) scrollToTarget(hash, true)
    }, 120)
    return () => clearTimeout(id)
  }, [])

  useEffect(() => {
    const onPop = () => swap(window.location.pathname + window.location.hash, false)
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [swap])

  return (
    <Ctx.Provider value={{ path, navigate }}>
      {children}
      <div ref={curtain} aria-hidden="true" className="fixed inset-0 z-[90] hidden bg-ink" style={{ clipPath: 'polygon(0 100%, 0 100%, 0 100%, 0 100%)' }}>
        <div className="absolute inset-0 grid place-items-center">
          <img data-curtain-mark src="/brand/mk-mark-160.webp" alt="" width={120} height={101} className="opacity-0" />
        </div>
      </div>
    </Ctx.Provider>
  )
}

/** Internal link: keeps native href (SEO, new tab, middle click) and routes in-app on plain clicks. */
export function Link({ to, onClick, ...rest }: { to: string } & AnchorHTMLAttributes<HTMLAnchorElement>) {
  const { navigate } = useRouter()
  return (
    <a
      href={to}
      onClick={(e) => {
        onClick?.(e)
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
        e.preventDefault()
        navigate(to)
      }}
      {...rest}
    />
  )
}
