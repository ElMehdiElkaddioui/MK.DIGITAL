import { useRef } from 'react'
import { RelationBadge } from '../components/Badge'
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Info } from '../components/icons'
import { Magnetic } from '../components/Magnetic'
import { BrowserFrame, PhoneFrame, Shot } from '../components/Shot'
import { projects, relationLabel, type Project } from '../data/projects'
import { disclaimer } from '../data/site'
import { gsap } from '../lib/gsap'
import { Link } from '../lib/router'
import { revealChildren, useGsap } from '../lib/useGsap'

export function ProjectPage({ project: p }: { project: Project }) {
  const root = useRef<HTMLElement>(null)
  const index = projects.indexOf(p)
  const next = projects[(index + 1) % projects.length]

  useGsap(
    root,
    ({ reduced }) => {
      if (reduced) return
      gsap.from('[data-cs-line] > span', { yPercent: 115, duration: 1.4, stagger: 0.1, delay: 0.35 })
      gsap.from('[data-cs-fade]', { opacity: 0, y: 24, stagger: 0.07, duration: 1.1, delay: 0.6 })
      gsap.fromTo('[data-cs-cover]', { clipPath: 'inset(18% 8% 0% 8% round 24px)' }, { clipPath: 'inset(0% 0% 0% 0% round 24px)', duration: 1.8, ease: 'expo.inOut', delay: 0.4 })
      gsap.to('[data-cs-cover] img', { yPercent: 8, ease: 'none', scrollTrigger: { trigger: '[data-cs-cover]', start: 'top top', end: 'bottom top', scrub: true } })
      revealChildren(root.current)
      gsap.utils.toArray<HTMLElement>('[data-cs-shot]').forEach((el) =>
        gsap.from(el, { y: 80, opacity: 0, duration: 1.4, scrollTrigger: { trigger: el, start: 'top 90%' } }),
      )
    },
    [p.slug],
  )

  const meta = [
    { k: 'Catégorie', v: p.category },
    { k: 'Secteur', v: p.sector },
    { k: 'Statut', v: relationLabel[p.relation] },
    { k: 'Technologies', v: p.stack.join(' · ') },
  ]

  return (
    <main ref={root} id="main" className="bg-ink">
      <section aria-labelledby="cs-title" className="gutter relative mx-auto max-w-[1600px] pb-14 pt-32 md:pb-20 md:pt-44">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[70vh]"
          style={{ background: `radial-gradient(50% 60% at 70% 0%, ${p.accent}2b, transparent 70%)` }}
        />
        <div className="relative">
          <div data-cs-fade className="flex flex-wrap items-center gap-4">
            <Link to="/#projets" className="kicker group inline-flex items-center gap-2 text-white/55 hover:text-white">
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Tous les projets
            </Link>
            <span className="h-px w-8 bg-white/20" aria-hidden="true" />
            <span className="kicker tabular-nums text-white/40">
              Projet {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
            </span>
            <RelationBadge relation={p.relation} />
          </div>

          <h1 id="cs-title" className="display mt-10 text-[clamp(2.8rem,10vw,10rem)]">
            <span data-cs-line data-line>
              <span>{p.name}</span>
            </span>
          </h1>
          <p data-cs-fade className="serif-i mt-5 text-[clamp(1.5rem,3vw,2.6rem)] text-white/75">
            {p.category}
          </p>

          <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-12">
            <dl data-cs-fade className="grid grid-cols-2 gap-6 md:col-span-7 md:grid-cols-4">
              {meta.map((m) => (
                <div key={m.k} className="border-t border-white/15 pt-4">
                  <dt className="kicker text-white/40">{m.k}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-white/85">{m.v}</dd>
                </div>
              ))}
            </dl>
            <div data-cs-fade className="flex items-end md:col-span-5 md:justify-end">
              <Magnetic>
                <a href={p.url} target="_blank" rel="noopener noreferrer" className="btn btn-light">
                  Visiter la démo en ligne
                  <ArrowUpRight className="h-4 w-4" />
                  <span className="sr-only">(ouvre un nouvel onglet)</span>
                </a>
              </Magnetic>
            </div>
          </div>
        </div>
      </section>

      <div className="gutter mx-auto max-w-[1600px]">
        <div data-cs-cover className="overflow-hidden rounded-3xl">
          <BrowserFrame url={p.url}>
            <Shot id={p.shots.cover} eager alt={`Page d’accueil du site ${p.name}`} sizes="(min-width: 1600px) 1600px, 100vw" className="h-[110%] w-full object-cover object-top" />
          </BrowserFrame>
        </div>
      </div>

      <section aria-labelledby="cs-about" className="gutter mx-auto grid max-w-[1600px] gap-12 py-24 md:grid-cols-12 md:py-36">
        <div className="md:col-span-5">
          <p data-reveal className="kicker text-white/40">Le projet</p>
          <h2 id="cs-about" data-lines className="display mt-6 text-[clamp(2rem,4.4vw,4.2rem)]">
            <span data-line>
              <span>L’essentiel</span>
            </span>
            <span data-line>
              <span className="silver">en bref.</span>
            </span>
          </h2>
        </div>
        <div className="md:col-span-7">
          <p data-reveal className="text-[clamp(1.2rem,1.9vw,1.6rem)] font-light leading-[1.45] text-white/85">
            {p.intro}
          </p>
          <h3 data-reveal className="kicker mt-14 text-white/40">
            Ce que l’on trouve sur la démo
          </h3>
          <ul className="mt-6 border-t border-white/10">
            {p.features.map((f) => (
              <li key={f} data-reveal className="flex items-start gap-4 border-b border-white/10 py-4 text-white/75">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-white/50" />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-label="Aperçus" className="gutter mx-auto max-w-[1600px] space-y-8 md:space-y-14">
        <div className="grid items-end gap-8 md:grid-cols-12 md:gap-14">
          <div data-cs-shot className="md:col-span-8">
            <BrowserFrame url={p.url}>
              <Shot id={p.shots.second} alt={`Section intérieure du site ${p.name}`} sizes="(min-width: 768px) 66vw, 100vw" className="h-full w-full object-cover object-top" />
            </BrowserFrame>
          </div>
          <div data-cs-shot className="mx-auto w-[62%] sm:w-[45%] md:col-span-4 md:w-[78%]">
            <PhoneFrame>
              <Shot id={p.shots.mobile} mobile alt={`Version mobile du site ${p.name}`} sizes="(min-width: 768px) 25vw, 60vw" className="h-full w-full object-cover object-top" />
            </PhoneFrame>
            <p className="kicker mt-5 text-center text-white/40">Version mobile</p>
          </div>
        </div>
        <div data-cs-shot className="md:ml-[16%]">
          <BrowserFrame url={p.url}>
            <Shot id={p.shots.third} alt={`Autre section du site ${p.name}`} sizes="(min-width: 768px) 84vw, 100vw" className="h-full w-full object-cover object-top" />
          </BrowserFrame>
        </div>
      </section>

      <div className="gutter mx-auto max-w-[1600px] pt-20">
        <aside data-reveal aria-label="Note sur la démonstration" className="flex gap-4 rounded-2xl border border-white/10 p-6 md:p-8">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-white/45" />
          <div className="space-y-2 text-sm leading-relaxed text-white/55">
            {p.note && <p className="text-white/75">{p.note}</p>}
            <p>{disclaimer}</p>
          </div>
        </aside>
      </div>

      {/* Next project */}
      <Link
        to={`/projets/${next.slug}`}
        data-cursor="Suivant"
        className="group relative mt-24 block overflow-hidden border-t border-white/10 md:mt-36"
      >
        <div className="absolute inset-0 opacity-0 transition-opacity duration-1000 group-hover:opacity-40">
          <Shot id={next.shots.cover} alt="" sizes="100vw" className="h-full w-full scale-110 object-cover transition-transform duration-[2000ms] group-hover:scale-100" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40" />
        </div>
        <div className="gutter relative mx-auto max-w-[1600px] py-20 md:py-32">
          <p className="kicker flex items-center gap-3 text-white/45">
            Projet suivant <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-2" />
          </p>
          <p className="display mt-6 text-[clamp(2.6rem,9vw,9rem)] transition-transform duration-1000 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-4">
            <span className="silver">{next.name}</span>
          </p>
          <p className="serif-i mt-3 text-2xl text-white/55">{next.category}</p>
        </div>
      </Link>
    </main>
  )
}
