import { useRef } from 'react'
import { RelationBadge } from '../components/Badge'
import { ArrowRight, ArrowUpRight, Info } from '../components/icons'
import { Magnetic } from '../components/Magnetic'
import { SectionHead } from '../components/SectionHead'
import { BrowserFrame, PhoneFrame, Shot } from '../components/Shot'
import { projects, type Project } from '../data/projects'
import { disclaimer } from '../data/site'
import { gsap } from '../lib/gsap'
import { Link } from '../lib/router'
import { revealChildren, useGsap } from '../lib/useGsap'

function ProjectCard({ p, i }: { p: Project; i: number }) {
  return (
    <article
      data-card
      aria-labelledby={`p-${p.slug}`}
      className="relative md:sticky md:top-0 md:flex md:h-[100svh] md:items-center md:pt-16"
    >
      <div data-card-inner className="relative w-full origin-top overflow-hidden rounded-3xl border border-white/10 bg-coal will-change-transform">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ background: `radial-gradient(60% 70% at 85% 0%, ${p.accent}33, transparent 70%)` }}
        />
        <div data-card-shade aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 bg-black opacity-0" />
        <div className="relative grid items-center gap-10 p-5 sm:p-8 md:grid-cols-12 md:gap-10 md:p-10 lg:px-12 lg:py-11">
          {/* Text */}
          <div className="order-2 flex flex-col md:order-1 md:col-span-5">
            <div className="flex flex-wrap items-center gap-3">
              <span className="kicker text-white/40 tabular-nums">
                {String(i + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
              </span>
              <RelationBadge relation={p.relation} />
            </div>
            <p className="kicker mt-7 text-white/55">{p.category}</p>
            <h3 id={`p-${p.slug}`} className="display mt-4 text-[clamp(2.1rem,3.9vw,4.4rem)] leading-[0.92]">
              {p.name}
            </h3>
            <p className="mt-6 max-w-md leading-relaxed text-white/65">{p.summary}</p>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies">
              {p.stack.slice(0, 5).map((s) => (
                <li key={s} className="rounded-full bg-white/[.06] px-3 py-1 text-[0.7rem] text-white/70">
                  {s}
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-3 pt-9 sm:flex-row">
              <Magnetic>
                <a href={p.url} target="_blank" rel="noopener noreferrer" className="btn btn-light w-full justify-center sm:w-auto">
                  Voir le site
                  <ArrowUpRight className="h-4 w-4" />
                  <span className="sr-only">(ouvre un nouvel onglet)</span>
                </a>
              </Magnetic>
              <Magnetic>
                <Link to={`/projets/${p.slug}`} className="btn btn-ghost w-full justify-center sm:w-auto">
                  Étude de cas
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Magnetic>
            </div>
          </div>

          {/* Visuals */}
          <Link
            to={`/projets/${p.slug}`}
            data-cursor="Explorer"
            aria-label={`Étude de cas ${p.name}`}
            className="group relative order-1 block md:order-2 md:col-span-7"
          >
            <div className="relative sm:pb-10 sm:pl-8 lg:pb-12 lg:pl-10">
            <BrowserFrame url={p.url} className="transition-transform duration-[1200ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:-translate-y-2">
              <Shot
                id={p.shots.cover}
                alt={`Page d’accueil du site ${p.name}`}
                sizes="(min-width: 768px) 55vw, 92vw"
                className="h-[112%] w-full scale-[1.02] object-cover object-top transition-transform duration-[1400ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.06]"
              />
            </BrowserFrame>
            <PhoneFrame className="absolute bottom-0 left-0 hidden w-[21%] transition-transform duration-[1200ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:-translate-y-5 group-hover:-rotate-2 sm:block">
              <Shot id={p.shots.mobile} mobile alt={`Version mobile du site ${p.name}`} sizes="12vw" className="h-full w-full object-cover object-top" />
            </PhoneFrame>
            </div>
          </Link>
        </div>
      </div>
    </article>
  )
}

export function Work() {
  const root = useRef<HTMLElement>(null)

  useGsap(root, ({ reduced, mobile }) => {
    if (reduced) return
    revealChildren(root.current)
    const cards = gsap.utils.toArray<HTMLElement>('[data-card]')
    cards.forEach((card, i) => {
      const inner = card.querySelector<HTMLElement>('[data-card-inner]')
      const img = card.querySelector<HTMLElement>('[data-card-inner] img')
      if (img) gsap.fromTo(img, { yPercent: -6 }, { yPercent: 0, ease: 'none', scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: true } })
      if (mobile) {
        gsap.from(inner, { y: 60, opacity: 0, duration: 1.2, scrollTrigger: { trigger: card, start: 'top 88%' } })
        return
      }
      // Desktop: as the next sheet slides over, this one recedes.
      const next = cards[i + 1]
      if (inner && next) {
        const st = { trigger: next, start: 'top bottom', end: 'top top', scrub: true }
        gsap.to(inner, { scale: 0.9, ease: 'none', scrollTrigger: st })
        gsap.to(inner.querySelector('[data-card-shade]'), { opacity: 0.65, ease: 'none', scrollTrigger: st })
      }
    })
  })

  return (
    <section ref={root} id="projets" aria-labelledby="work-title" className="relative bg-ink pb-24 md:pb-36">
      <div className="gutter mx-auto max-w-[1600px]">
        <div className="flex flex-col justify-between gap-10 pt-10 md:flex-row md:items-end">
          <SectionHead index="03" kicker="Projets sélectionnés" id="work-title" line1="Selected" line2={<span className="silver">work.</span>} />
          <div data-reveal className="max-w-sm md:pb-3">
            <p className="leading-relaxed text-white/55">
              Sept réalisations — sites vitrines, e-commerce, plateformes — en ligne et consultables. Chaque projet a son étude de cas.
            </p>
            <p className="display mt-6 text-[4.5rem] leading-none text-white/10 md:text-[6rem]">{String(projects.length).padStart(2, '0')}</p>
          </div>
        </div>

        <div className="mt-14 space-y-8 md:mt-10 md:space-y-0">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} p={p} i={i} />
          ))}
        </div>

        {/* Demo disclaimer — visible, but quiet */}
        <aside data-reveal aria-label="À propos des projets présentés" className="relative mt-16 grid gap-8 rounded-3xl border border-white/10 p-7 md:mt-24 md:grid-cols-12 md:p-12">
          <div className="flex items-start gap-4 md:col-span-8">
            <Info className="mt-1 h-5 w-5 shrink-0 text-white/50" />
            <p className="font-serif text-xl italic leading-snug text-white/80 md:text-2xl">{disclaimer}</p>
          </div>
          <dl className="space-y-4 md:col-span-4 md:border-l md:border-white/10 md:pl-10">
            {(
              [
                ['client', 'Site réalisé pour un client, relation confirmée.'],
                ['demo', 'Version publique de démonstration ou frontend.'],
                ['concept', 'Proposition ou concept réalisé à l’initiative du studio.'],
              ] as const
            ).map(([k, d]) => (
              <div key={k}>
                <dt>
                  <RelationBadge relation={k} />
                </dt>
                <dd className="mt-2 text-sm text-white/50">{d}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </section>
  )
}
