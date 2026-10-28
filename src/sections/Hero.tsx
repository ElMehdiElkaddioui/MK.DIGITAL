import { useEffect, useRef, useState } from 'react'
import { DotField } from '../components/DotField'
import { ArrowDown, ArrowRight } from '../components/icons'
import { Mark } from '../components/Logo'
import { Magnetic } from '../components/Magnetic'
import { site } from '../data/site'
import { finePointer, gsap } from '../lib/gsap'
import { Link } from '../lib/router'
import { useGsap } from '../lib/useGsap'

function useMoroccoTime() {
  const fmt = () => new Intl.DateTimeFormat('fr-FR', { hour: '2-digit', minute: '2-digit', timeZone: site.timezone }).format(new Date())
  const [time, setTime] = useState(fmt)
  useEffect(() => {
    const id = setInterval(() => setTime(fmt()), 15000)
    return () => clearInterval(id)
  }, [])
  return time
}

export function Hero({ ready }: { ready: boolean }) {
  const root = useRef<HTMLElement>(null)
  const markWrap = useRef<HTMLDivElement>(null)
  const time = useMoroccoTime()

  const entrance = useRef<gsap.core.Timeline | null>(null)
  const played = useRef(false)

  // Built paused at mount (elements start hidden behind the intro), played on hand-over.
  // matchMedia rebuilds it when the viewport crosses a breakpoint (e.g. phone rotation):
  // after the first play, a rebuilt timeline jumps straight to its end state.
  useGsap(root, ({ reduced, mobile }) => {
    if (reduced) return
    const tl = gsap.timeline({ paused: true, delay: 0.1, onStart: () => void (played.current = true) })
    entrance.current = tl
    tl.fromTo(
      '[data-hero-mark]',
      { clipPath: 'polygon(0% 100%, 0% 100%, -40% 100%, -40% 100%)', scale: 1.15 },
      { clipPath: 'polygon(0% 0%, 140% 0%, 100% 100%, -40% 100%)', scale: 1, duration: 1.8, ease: 'expo.inOut' },
      0,
    )
      .from('[data-hero-line] > span', { yPercent: 115, rotate: 2, duration: 1.5, stagger: 0.12 }, 0.35)
      .from('[data-hero-rule]', { scaleX: 0, duration: 1.4, ease: 'expo.inOut' }, 0.7)
      .from('[data-hero-fade]', { opacity: 0, y: 24, stagger: 0.08, duration: 1.1 }, 1)

    // Scroll: text drifts up faster than the mark sinks — subtle parallax depth. Applied to the
    // children (not the wrapper) so the headline keeps blending with the mark behind it.
    const st = { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true }
    gsap.to('#hero-title', { yPercent: mobile ? -10 : -30, ease: 'none', scrollTrigger: st })
    gsap.to('[data-hero-markbox]', { yPercent: 22, scale: 0.9, ease: 'none', scrollTrigger: st })
    if (played.current) tl.progress(1)
  })

  useEffect(() => {
    if (ready) entrance.current?.play()
  }, [ready])

  // Pointer tilt on the monogram (desktop only).
  useEffect(() => {
    const el = markWrap.current
    if (!el || !finePointer() || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const rx = gsap.quickTo(el, 'rotationX', { duration: 1.2, ease: 'power3.out' })
    const ry = gsap.quickTo(el, 'rotationY', { duration: 1.2, ease: 'power3.out' })
    const move = (e: PointerEvent) => {
      rx(((e.clientY / window.innerHeight) - 0.5) * -14)
      ry(((e.clientX / window.innerWidth) - 0.5) * 18)
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [])

  return (
    <section ref={root} id="top" aria-labelledby="hero-title" className="relative flex min-h-[100svh] flex-col overflow-hidden bg-ink">
      <DotField className="absolute inset-0 h-full w-full" />
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[38%] h-[70vmax] w-[70vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,.07),transparent)]" />

      {/* Monogram — the supplied logo, with a light sweep clipped to its exact shape */}
      <div aria-hidden="true" data-hero-markbox className="pointer-events-none absolute inset-x-0 top-[11%] flex justify-center md:top-[10%] md:justify-end md:pr-[7vw]" style={{ perspective: '900px' }}>
        <div ref={markWrap} className="relative will-change-transform">
          <div data-hero-mark className="relative">
            <Mark width={640} eager alt="" className="h-auto w-[46vw] max-w-[520px] opacity-[0.95] md:w-[34vw]" />
            <div
              className="absolute inset-0 mix-blend-overlay"
              style={{
                WebkitMaskImage: 'url(/brand/mk-mark-640.webp)',
                maskImage: 'url(/brand/mk-mark-640.webp)',
                WebkitMaskSize: '100% 100%',
                maskSize: '100% 100%',
                background: 'linear-gradient(118deg, transparent 35%, rgba(255,255,255,.95) 50%, transparent 65%)',
                backgroundSize: '250% 100%',
                animation: 'sheen 6s cubic-bezier(.16,1,.3,1) infinite',
              }}
            />
          </div>
        </div>
      </div>

      <div className="gutter relative mt-auto pb-8 pt-40 md:pb-10">
        <p data-hero-fade className="kicker mb-6 flex items-center gap-3 text-white/55 md:mb-8">
          <span className="h-1.5 w-1.5 rounded-full bg-white" style={{ animation: 'pulse-dot 2.4s ease-in-out infinite' }} />
          Studio de création web — {site.location}
        </p>

        <h1 id="hero-title" className="display text-[clamp(2.7rem,11.6vw,11.5rem)] mix-blend-difference md:text-[clamp(3rem,9.3vw,11.5rem)]">
          <span data-hero-line className="block">
            <span>We create</span>
          </span>
          <span data-hero-line className="block">
            <span className="silver silver-sheen">Digital</span>
          </span>
          <span data-hero-line className="block">
            <span>
              Experiences<span className="silver">.</span>
            </span>
          </span>
        </h1>

        <div data-hero-rule className="mt-8 h-px w-full origin-left bg-gradient-to-r from-white/50 via-white/15 to-transparent md:mt-10" />

        <div className="mt-7 flex flex-col gap-8 md:mt-9 md:flex-row md:items-end md:justify-between">
          <p data-hero-fade className="max-w-xl font-serif text-[1.65rem] italic leading-[1.15] text-white/85 md:text-[2.1rem]">
            Nous donnons vie à vos ambitions digitales.
          </p>
          <div data-hero-fade className="flex flex-col gap-3 sm:flex-row">
            <Magnetic>
              <Link to="#projets" className="btn btn-light w-full justify-center sm:w-auto" data-cursor="Projets">
                Découvrir nos projets
                <ArrowDown className="h-4 w-4" />
              </Link>
            </Magnetic>
            <Magnetic>
              <Link to="#contact" className="btn btn-ghost w-full justify-center sm:w-auto">
                Démarrer un projet
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Magnetic>
          </div>
        </div>

        <div data-hero-fade className="mt-10 flex items-center justify-between border-t border-white/10 pt-5 text-white/45 md:mt-14">
          <span className="kicker !tracking-[0.18em] md:!tracking-[0.32em]">Web · E-commerce · Apps</span>
          <span className="kicker hidden sm:inline">Fondé par {site.founder}</span>
          <span className="kicker tabular-nums">
            Maroc <span className="text-white/80">{time}</span>
          </span>
        </div>
      </div>
    </section>
  )
}
