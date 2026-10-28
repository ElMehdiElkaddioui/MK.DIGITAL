import { useRef } from 'react'
import { Mark } from '../components/Logo'
import { SectionHead } from '../components/SectionHead'
import { site } from '../data/site'
import { gsap } from '../lib/gsap'
import { revealChildren, useGsap } from '../lib/useGsap'

const statement =
  'MK DIGITAL est un studio de création web né au Maroc. Nous concevons et développons des sites, des boutiques en ligne et des applications web qui donnent aux entreprises, aux marques et aux professionnels une présence digitale à la hauteur de leurs ambitions.'

const pillars = [
  {
    title: 'Notre mission',
    text: 'Aider les entreprises, entrepreneurs, marques et professionnels à affirmer une présence digitale forte, grâce à des expériences web exigeantes, claires et efficaces.',
  },
  {
    title: 'Notre approche',
    text: 'Le design et le code réunis sous un même toit. Chaque projet est imaginé, dessiné puis développé sur mesure — sans template, sans compromis sur la qualité.',
  },
  {
    title: 'Le fondateur',
    text: `${site.founder}, développeur web et fondateur de MK DIGITAL, accompagne personnellement chaque projet, de la première idée à la mise en ligne.`,
  },
]

export function Studio() {
  const root = useRef<HTMLElement>(null)

  useGsap(root, ({ reduced }) => {
    if (reduced) return
    revealChildren(root.current)
    // Words light up one after another as the paragraph crosses the viewport.
    gsap.fromTo(
      '[data-word]',
      { opacity: 0.14 },
      { opacity: 1, stagger: 0.05, ease: 'none', scrollTrigger: { trigger: '[data-statement]', start: 'top 80%', end: 'bottom 45%', scrub: true } },
    )
    gsap.to('[data-studio-mark]', { yPercent: -30, rotate: -6, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true } })
  })

  return (
    <section ref={root} id="studio" aria-labelledby="studio-title" className="relative overflow-hidden bg-ink py-28 md:py-44">
      <div aria-hidden="true" data-studio-mark className="pointer-events-none absolute -right-[12vw] top-[18%] opacity-[0.05]">
        <Mark width={640} alt="" className="h-auto w-[70vw] max-w-[900px]" />
      </div>

      <div className="gutter relative mx-auto max-w-[1600px]">
        <SectionHead index="01" kicker="Le studio" id="studio-title" line1="Un studio," line2={<span className="serif-i normal-case text-white/85">pensé pour l’exigence.</span>} />

        <p data-statement className="mt-16 max-w-[68rem] text-[clamp(1.5rem,3.3vw,3.1rem)] font-light leading-[1.22] tracking-[-0.015em] md:mt-24">
          {statement.split(' ').map((w, i) => (
            <span key={i} data-word className={w === 'MK' || w === 'DIGITAL' ? 'silver font-semibold' : ''}>
              {w}{' '}
            </span>
          ))}
        </p>

        <div className="mt-20 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:mt-28 md:grid-cols-3">
          {pillars.map((p, i) => (
            <article key={p.title} data-reveal className="group relative bg-ink p-8 transition-colors duration-700 hover:bg-ash md:p-10">
              <span className="kicker text-white/35">0{i + 1}</span>
              <h3 className="mt-10 text-xl font-semibold [font-stretch:115%] md:text-2xl">{p.title}</h3>
              <p className="mt-4 leading-relaxed text-white/60">{p.text}</p>
              <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-white to-transparent transition-transform duration-700 group-hover:scale-x-100" />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
