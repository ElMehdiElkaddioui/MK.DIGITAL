import { useRef } from 'react'
import { SectionHead } from '../components/SectionHead'
import { gsap } from '../lib/gsap'
import { revealChildren, useGsap } from '../lib/useGsap'

const steps = [
  { en: 'Discovery', fr: 'Découverte', text: 'Un échange sur vos objectifs, votre activité, votre cible et vos contenus. Nous définissons ensemble le périmètre du projet.' },
  { en: 'Design', fr: 'Conception', text: 'Arborescence, maquettes et direction artistique : l’expérience prend forme et se valide avec vous avant la moindre ligne de code.' },
  { en: 'Development', fr: 'Développement', text: 'Intégration et développement sur mesure, responsive, optimisé et testé sur mobile comme sur ordinateur.' },
  { en: 'Launch', fr: 'Lancement', text: 'Mise en ligne, configuration du domaine, référencement de base et vérifications finales. Votre site est prêt.' },
  { en: 'Support', fr: 'Suivi', text: 'Après le lancement, nous restons disponibles : corrections, évolutions et maintenance selon vos besoins.' },
]

export function Process() {
  const root = useRef<HTMLElement>(null)
  const track = useRef<HTMLOListElement>(null)

  useGsap(root, ({ reduced }) => {
    if (reduced) return
    revealChildren(root.current)
    const mm = gsap.matchMedia()
    mm.add('(min-width: 1024px)', () => {
      const el = track.current
      if (!el) return
      const distance = () => el.scrollWidth - el.clientWidth
      const tl = gsap.timeline({
        scrollTrigger: { trigger: '[data-process-pin]', start: 'top top', end: () => `+=${distance() + window.innerHeight * 0.5}`, scrub: 0.8, pin: true, invalidateOnRefresh: true },
      })
      tl.to(el, { x: () => -distance(), ease: 'none' }, 0).fromTo('[data-progress]', { scaleX: 0 }, { scaleX: 1, ease: 'none' }, 0)
      el.querySelectorAll<HTMLElement>('[data-step]').forEach((s, i) => {
        tl.fromTo(s.querySelector('[data-step-num]'), { opacity: 0.12 }, { opacity: 1, duration: 0.15, ease: 'none' }, Math.max(0, i / steps.length - 0.05))
      })
    })
    mm.add('(max-width: 1023px)', () => {
      gsap.fromTo('[data-vline]', { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: track.current, start: 'top 70%', end: 'bottom 60%', scrub: true } })
      gsap.utils.toArray<HTMLElement>('[data-step]').forEach((s) =>
        gsap.from(s, { opacity: 0, x: 30, duration: 1, scrollTrigger: { trigger: s, start: 'top 82%' } }),
      )
    })
    return () => mm.revert()
  })

  return (
    <section ref={root} id="process" aria-labelledby="process-title" className="relative bg-ink">
      <div data-process-pin className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden py-28 lg:py-0">
        <div className="gutter mx-auto w-full max-w-[1600px]">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <SectionHead index="05" kicker="Process" id="process-title" line1="De l’idée" line2={<span className="silver">au lancement.</span>} />
            <p data-reveal className="max-w-sm leading-relaxed text-white/55 md:pb-3">
              Une méthode claire en cinq étapes, pour avancer ensemble sans surprise.
            </p>
          </div>

          <div className="relative mt-16 hidden h-px bg-white/10 lg:block" aria-hidden="true">
            <div data-progress className="absolute inset-0 origin-left bg-gradient-to-r from-white/40 to-white" />
          </div>
        </div>

        <div className="relative mt-14 lg:mt-12">
          <span
            data-vline
            aria-hidden="true"
            className="absolute bottom-0 top-0 w-px origin-top bg-gradient-to-b from-white to-white/10 lg:hidden"
            style={{ left: 'clamp(1rem, 4.5vw, 4rem)' }}
          />
          <ol ref={track} className="gutter flex flex-col gap-12 pl-[calc(clamp(1rem,4.5vw,4rem)+2rem)] lg:flex-row lg:gap-0 lg:pl-[clamp(1rem,4.5vw,4rem)] lg:pr-[20vw]">
            {steps.map((s, i) => (
              <li key={s.en} data-step className="relative lg:w-[38vw] lg:shrink-0 lg:pr-[6vw]">
                <span aria-hidden="true" className="absolute -left-[2.3125rem] top-3 h-2.5 w-2.5 rotate-45 border border-white bg-ink lg:hidden" />
                <p data-step-num className="display text-[clamp(4rem,10vw,10rem)] leading-none text-white/90">
                  <span className="silver">{String(i + 1).padStart(2, '0')}</span>
                </p>
                <h3 className="mt-6 text-2xl font-semibold uppercase tracking-[-0.01em] [font-stretch:120%] md:text-3xl">{s.en}</h3>
                <p className="serif-i mt-1 text-xl text-white/50">{s.fr}</p>
                <p className="mt-5 max-w-sm leading-relaxed text-white/60">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
