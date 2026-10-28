import { useRef, type ComponentType, type SVGProps } from 'react'
import { ArrowUpRight, IconCart, IconPen, IconRefresh, IconShield, IconSpark, IconStack, IconWeb } from '../components/icons'
import { SectionHead } from '../components/SectionHead'
import { Marquee } from '../components/Marquee'
import { Link } from '../lib/router'
import { revealChildren, useGsap } from '../lib/useGsap'

type Service = { title: string; text: string; tags: string[]; icon: ComponentType<SVGProps<SVGSVGElement>> }

const services: Service[] = [
  {
    title: 'Création de sites web',
    text: 'Sites vitrines, institutionnels et portfolios sur mesure : rapides, élégants et pensés pour transformer vos visiteurs en clients.',
    tags: ['Site vitrine', 'Landing page', 'Portfolio'],
    icon: IconWeb,
  },
  {
    title: 'Développement e-commerce',
    text: 'Des boutiques en ligne claires et rassurantes : catalogue, fiches produits, panier et parcours de commande adaptés à vos clients.',
    tags: ['Catalogue', 'Panier', 'Commande'],
    icon: IconCart,
  },
  {
    title: 'Applications web full-stack',
    text: 'Des plateformes sur mesure avec espaces utilisateurs, tableaux de bord et back-office, du front-end à la base de données.',
    tags: ['Espaces membres', 'Dashboard', 'API'],
    icon: IconStack,
  },
  {
    title: 'Design UI/UX',
    text: 'Parcours, maquettes et prototypes : une interface cohérente avec votre identité, pensée d’abord pour le mobile.',
    tags: ['Maquettes', 'Prototype', 'Direction artistique'],
    icon: IconPen,
  },
  {
    title: 'Refonte de site web',
    text: 'Moderniser un site existant — design, vitesse, lisibilité et référencement — sans perdre ce qui fonctionne déjà.',
    tags: ['Audit', 'Modernisation', 'Performance'],
    icon: IconRefresh,
  },
  {
    title: 'Maintenance',
    text: 'Mises à jour, corrections et évolutions régulières pour un site toujours fiable, sécurisé et à jour.',
    tags: ['Mises à jour', 'Corrections', 'Évolutions'],
    icon: IconShield,
  },
  {
    title: 'Solutions digitales',
    text: 'Formulaires, réservations, multilingue, liens WhatsApp, référencement : les outils concrets qui font avancer votre activité.',
    tags: ['Formulaires', 'Multilingue', 'SEO'],
    icon: IconSpark,
  },
]

export function Services() {
  const root = useRef<HTMLElement>(null)
  useGsap(root, ({ reduced }) => {
    if (!reduced) revealChildren(root.current)
  })

  return (
    <section ref={root} id="services" aria-labelledby="services-title" className="relative bg-ink pb-24 md:pb-40">
      <Marquee items={['Web', 'E-commerce', 'Apps', 'UI/UX', 'Refonte', 'Maintenance']} className="display border-y border-white/10 py-6 text-[clamp(2.6rem,7vw,6.5rem)] md:py-8" />

      <div className="gutter mx-auto max-w-[1600px] pt-24 md:pt-36">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <SectionHead index="02" kicker="Services" id="services-title" line1="Ce que nous" line2={<span className="silver">construisons.</span>} />
          <p data-reveal className="max-w-sm leading-relaxed text-white/55 md:pb-3">
            Du premier site vitrine à l’application web complète, chaque service est conçu et développé sur mesure par MK DIGITAL.
          </p>
        </div>

        <ul className="mt-16 border-t border-white/12 md:mt-24">
          {services.map((s, i) => (
            <li key={s.title} data-reveal>
              <div
                tabIndex={0}
                className="group relative isolate block overflow-hidden border-b border-white/12 outline-none focus-visible:ring-1 focus-visible:ring-white"
              >
                {/* Fill that rises along the logo's diagonal on hover */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 hidden origin-bottom-right translate-y-[110%] -skew-y-3 bg-[linear-gradient(118deg,#fff,#e4e6ea_45%,#c3c6cc_60%,#fff)] transition-transform duration-[900ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-y-0 group-hover:skew-y-0 group-focus-visible:translate-y-0 group-focus-visible:skew-y-0 md:block"
                />
                <div className="grid grid-cols-[auto_1fr_auto] items-center gap-x-5 py-7 transition-colors duration-500 md:grid-cols-[5rem_1fr_auto] md:gap-x-8 md:px-6 md:py-9 md:group-hover:text-black md:group-focus-visible:text-black">
                  <span className="kicker self-start pt-2 text-white/35 transition-colors md:self-center md:pt-0 md:group-hover:text-black/45 md:group-focus-visible:text-black/45">
                    0{i + 1}
                  </span>
                  <h3 className="text-[clamp(1.35rem,3.6vw,3.4rem)] font-semibold uppercase leading-none tracking-[-0.02em] [font-stretch:118%] md:transition-transform md:duration-700 md:group-hover:translate-x-3">
                    {s.title}
                  </h3>
                  <s.icon className="h-7 w-7 shrink-0 self-start text-white/60 transition-[color,transform] duration-700 md:h-10 md:w-10 md:self-center md:group-hover:rotate-[-8deg] md:group-hover:scale-110 md:group-hover:text-black md:group-focus-visible:text-black" />

                  {/* Description: always visible on mobile, unfolds on hover/focus on desktop */}
                  <div className="col-start-2 col-end-4 grid transition-[grid-template-rows] duration-700 ease-[cubic-bezier(.16,1,.3,1)] md:col-end-3 md:grid-rows-[0fr] md:group-hover:grid-rows-[1fr] md:group-focus-visible:grid-rows-[1fr]">
                    <div className="overflow-hidden">
                      <div className="flex flex-col gap-5 pt-4 md:flex-row md:items-end md:justify-between md:gap-10 md:pt-6">
                        <p className="max-w-xl leading-relaxed text-white/60 md:text-black/70">{s.text}</p>
                        <ul className="flex flex-wrap gap-2">
                          {s.tags.map((t) => (
                            <li key={t} className="rounded-full border border-white/15 px-3 py-1 text-[0.68rem] uppercase tracking-[0.14em] text-white/60 md:border-black/20 md:text-black/60">
                              {t}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div data-reveal className="mt-12 flex justify-end">
          <Link to="#contact" className="link-line group inline-flex items-center gap-3 text-lg text-white/80 hover:text-white">
            Un besoin spécifique ? Parlons-en
            <ArrowUpRight className="h-5 w-5 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  )
}
