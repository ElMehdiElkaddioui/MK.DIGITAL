import { useRef } from 'react'
import { Mark } from '../components/Logo'
import { SectionHead } from '../components/SectionHead'
import { gsap } from '../lib/gsap'
import { revealChildren, useGsap } from '../lib/useGsap'

const strengths = [
  { title: 'Design moderne', text: 'Des interfaces actuelles et élégantes, cohérentes avec votre identité — loin des templates génériques.' },
  { title: 'Expériences responsives', text: 'Chaque page est pensée d’abord pour le mobile, puis sublimée sur tablette et ordinateur.' },
  { title: 'Performance', text: 'Images optimisées, code léger, chargement rapide : la vitesse fait partie du design.' },
  { title: 'Développement sur mesure', text: 'Un code écrit pour votre projet, maintenable et évolutif — pas un thème modifié.' },
  { title: 'Souci du détail', text: 'Typographie, animations, micro-interactions : chaque élément est intentionnel.' },
  { title: 'Solutions créatives', text: 'Trouver l’idée qui rend votre site mémorable, puis la rendre simple à utiliser.' },
]

export function Why() {
  const root = useRef<HTMLElement>(null)

  useGsap(root, ({ reduced }) => {
    if (reduced) return
    // The white page is cut open along the monogram's diagonal.
    gsap.fromTo(
      root.current,
      { clipPath: 'polygon(0 30%, 100% 0%, 100% 100%, 0 100%)' },
      { clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)', ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'top 30%', scrub: true } },
    )
    revealChildren(root.current)
    gsap.from('[data-strength]', { y: 50, opacity: 0, stagger: 0.08, duration: 1.2, scrollTrigger: { trigger: '[data-strengths]', start: 'top 80%' } })
    gsap.to('[data-why-mark]', { yPercent: -25, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true } })
  })

  return (
    <section ref={root} id="pourquoi" aria-labelledby="why-title" className="relative overflow-hidden bg-white py-28 text-black md:py-44">
      <div aria-hidden="true" data-why-mark className="pointer-events-none absolute -left-[6vw] bottom-[-10%] opacity-[0.04]">
        <Mark variant="light" width={640} alt="" className="h-auto w-[80vw] max-w-[980px]" />
      </div>
      <div className="gutter relative mx-auto max-w-[1600px]">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <SectionHead
            tone="light"
            index="04"
            kicker="Pourquoi MK DIGITAL"
            id="why-title"
            line1="Le détail fait"
            line2={<span className="serif-i normal-case">la différence.</span>}
          />
          <Mark variant="light" width={120} alt="" className="hidden h-auto w-[110px] md:block" />
        </div>

        <ol data-strengths className="mt-16 grid border-l border-t border-black/12 sm:grid-cols-2 md:mt-24 lg:grid-cols-3">
          {strengths.map((s, i) => (
            <li key={s.title} data-strength className="group relative border-b border-r border-black/12 p-7 transition-colors duration-700 hover:bg-black hover:text-white md:p-10">
              <span className="display text-[3.4rem] leading-none text-black/10 transition-colors duration-700 group-hover:text-white/15 md:text-[4.5rem]">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-10 text-xl font-semibold uppercase tracking-[-0.01em] [font-stretch:118%] md:text-2xl">{s.title}</h3>
              <p className="mt-4 leading-relaxed text-black/60 transition-colors duration-700 group-hover:text-white/65">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
