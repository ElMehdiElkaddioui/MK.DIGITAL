import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { links, nav, site } from '../data/site'
import { gsap, prefersReducedMotion } from '../lib/gsap'
import { Link, useRouter } from '../lib/router'
import { lockScroll } from '../lib/smooth'
import { ArrowUpRight, Instagram, Mail, WhatsApp } from './icons'
import { Logo, Mark } from './Logo'
import { Magnetic } from './Magnetic'

/**
 * Fixed header in `mix-blend-difference`, so the silver logo and links invert automatically
 * over the white sections. Hides while scrolling down, returns on scroll up.
 */
export function Nav({ ready }: { ready: boolean }) {
  const { path } = useRouter()
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const header = useRef<HTMLElement>(null)
  const menu = useRef<HTMLDivElement>(null)
  const toggle = useRef<HTMLButtonElement>(null)
  const isHome = path === '/'

  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 40)
      if (Math.abs(y - last) > 6) setHidden(y > last && y > 400)
      last = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Hidden behind the intro, then slides in on hand-over.
  useLayoutEffect(() => {
    if (!header.current || prefersReducedMotion()) return
    const items = header.current.querySelectorAll('[data-nav-in]')
    if (!ready) {
      gsap.set(items, { y: -30, autoAlpha: 0 })
      return
    }
    gsap.fromTo(items, { y: -30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.06, duration: 1.1, delay: 0.25 })
  }, [ready])

  // Menu open/close: diagonal wipe + staggered links, focus management, Escape to close.
  useEffect(() => {
    const el = menu.current
    if (!el) return
    lockScroll(open)
    const q = gsap.utils.selector(el)
    if (open) {
      gsap.set(el, { display: 'flex' })
      if (prefersReducedMotion()) gsap.set(el, { clipPath: 'none' })
      else {
        gsap.fromTo(el, { clipPath: 'polygon(100% 0, 100% 0, 100% 0, 100% 0)' }, { clipPath: 'polygon(-40% 0, 100% 0, 100% 100%, -40% 100%)', duration: 0.9, ease: 'expo.inOut' })
        gsap.fromTo(q('[data-menu-link] > span'), { yPercent: 110 }, { yPercent: 0, stagger: 0.06, duration: 1.1, delay: 0.35 })
        gsap.fromTo(q('[data-menu-fade]'), { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, stagger: 0.05, duration: 0.9, delay: 0.55 })
      }
      q<HTMLAnchorElement>('[data-menu-link]')[0]?.focus({ preventScroll: true })
      const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
      window.addEventListener('keydown', onKey)
      return () => window.removeEventListener('keydown', onKey)
    }
    if (el.style.display === 'flex') {
      if (prefersReducedMotion()) gsap.set(el, { display: 'none' })
      else gsap.to(el, { clipPath: 'polygon(-40% 0, -40% 0, -40% 100%, -40% 100%)', duration: 0.7, ease: 'expo.inOut', onComplete: () => void gsap.set(el, { display: 'none' }) })
      toggle.current?.focus({ preventScroll: true })
    }
  }, [open])

  const href = (id: string) => (isHome ? `#${id}` : `/#${id}`)
  // Release the scroll lock synchronously so the link's own scroll (run right after) isn't swallowed.
  const close = () => {
    lockScroll(false)
    setOpen(false)
  }

  return (
    <>
      <header
        ref={header}
        className={`fixed inset-x-0 top-0 z-[60] mix-blend-difference transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] ${hidden && !open ? '-translate-y-full' : ''}`}
      >
        <div className={`gutter flex items-center justify-between transition-[padding] duration-500 ${scrolled ? 'py-3 md:py-4' : 'py-5 md:py-7'}`}>
          <Link to="/" data-nav-in aria-label="MK DIGITAL — accueil" className="block shrink-0" onClick={close}>
            <Logo height={34} eager className="hidden h-[30px] w-auto sm:block md:h-[34px]" />
            <Mark width={44} eager className="h-auto w-[42px] sm:hidden" />
          </Link>

          <nav aria-label="Navigation principale" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {nav.map((n, i) => (
                <li key={n.id} data-nav-in>
                  <Link to={href(n.id)} className="link-line kicker !tracking-[0.24em] text-white/80 hover:text-white">
                    <span className="mr-1.5 text-white/40">0{i + 1}</span>
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <span data-nav-in className="hidden md:inline-flex">
              <Magnetic>
                <Link to={href('contact')} className="btn btn-light !min-h-11 !px-5 !text-[0.64rem]">
                  Démarrer un projet
                </Link>
              </Magnetic>
            </span>
            <span data-nav-in>
              <Magnetic strength={0.4}>
                <button
                  ref={toggle}
                  type="button"
                  onClick={() => setOpen((o) => !o)}
                  aria-expanded={open}
                  aria-controls="menu"
                  aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
                  className="group relative flex h-12 w-12 items-center justify-center rounded-full border border-white/40 text-white transition-colors hover:border-white"
                >
                  <span className={`absolute h-px w-5 bg-current transition-transform duration-500 ${open ? 'rotate-45' : '-translate-y-[4px]'}`} />
                  <span className={`absolute h-px bg-current transition-all duration-500 ${open ? 'w-5 -rotate-45' : 'w-3 translate-x-[4px] translate-y-[4px] group-hover:w-5 group-hover:translate-x-0'}`} />
                </button>
              </Magnetic>
            </span>
          </div>
        </div>
      </header>

      <div
        ref={menu}
        id="menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden={!open}
        className="fixed inset-0 z-[55] hidden flex-col overflow-y-auto bg-ash"
        style={{ clipPath: 'polygon(100% 0, 100% 0, 100% 0, 100% 0)' }}
      >
        <div aria-hidden="true" className="pointer-events-none absolute -right-[10vw] bottom-[-8vh] opacity-[0.06]">
          <Mark width={640} alt="" className="h-auto w-[90vw] max-w-[760px]" />
        </div>
        <div className="gutter relative flex min-h-full flex-1 flex-col justify-between pb-10 pt-28 md:pt-36">
          <nav aria-label="Menu">
            <ul className="space-y-1 md:space-y-2">
              {[{ id: 'top', label: 'Accueil' }, ...nav].map((n, i) => (
                <li key={n.id} className="flex items-baseline gap-4 md:gap-8">
                  <span data-menu-fade className="kicker w-8 text-white/35">
                    0{i}
                  </span>
                  <Link
                    to={n.id === 'top' ? '/' : href(n.id)}
                    onClick={close}
                    tabIndex={open ? 0 : -1}
                    data-menu-link
                    className="group block overflow-hidden"
                  >
                    <span className="display block text-[clamp(2.4rem,9vw,7rem)] text-white/90 transition-[color,transform] duration-700 group-hover:translate-x-4 group-hover:text-white">
                      <span className="silver-hover">{n.label}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-14 grid gap-6 border-t border-white/10 pt-8 md:grid-cols-3">
            {[
              { href: links.whatsapp, icon: WhatsApp, label: 'WhatsApp', value: site.whatsappDisplay },
              { href: links.instagram, icon: Instagram, label: 'Instagram', value: site.instagramHandle },
              { href: links.email, icon: Mail, label: 'Email', value: site.email },
            ].map((c) => (
              <a
                key={c.label}
                data-menu-fade
                href={c.href}
                target={c.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                tabIndex={open ? 0 : -1}
                className="group flex items-center gap-4"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 transition-colors group-hover:bg-white group-hover:text-black">
                  <c.icon className="h-5 w-5" />
                </span>
                <span>
                  <span className="kicker block text-white/40">{c.label}</span>
                  <span className="mt-1 flex items-center gap-1 text-sm text-white/85">
                    {c.value}
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
