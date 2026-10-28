import { ArrowUpRight } from '../components/icons'
import { Logo } from '../components/Logo'
import { Magnetic } from '../components/Magnetic'
import { links, nav, site } from '../data/site'
import { Link, useRouter } from '../lib/router'
import { scrollToTarget } from '../lib/smooth'

export function Footer() {
  const { path } = useRouter()
  const href = (id: string) => (path === '/' ? `#${id}` : `/#${id}`)
  const contacts = [
    { label: 'Instagram', value: site.instagramHandle, href: links.instagram },
    { label: 'WhatsApp', value: site.whatsappDisplay, href: links.whatsapp },
    { label: 'Email', value: site.email, href: links.email },
  ]

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-coal pt-20 md:pt-28">
      <div className="gutter mx-auto max-w-[1600px]">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link to="/" aria-label="MK DIGITAL — accueil" className="inline-block">
              <Logo height={56} className="h-auto w-[260px] md:w-[320px]" />
            </Link>
            <p className="mt-8 max-w-sm leading-relaxed text-white/50">
              Studio de création web au Maroc — sites vitrines, e-commerce et applications web sur mesure. Fondé par {site.founder}.
            </p>
          </div>

          <nav aria-label="Plan du site" className="md:col-span-3">
            <p className="kicker text-white/35">Navigation</p>
            <ul className="mt-6 space-y-3">
              {nav.map((n) => (
                <li key={n.id}>
                  <Link to={href(n.id)} className="link-line text-white/75 hover:text-white">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <p className="kicker text-white/35">Contact</p>
            <ul className="mt-6 space-y-4">
              {contacts.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    target={c.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="group flex items-baseline justify-between gap-4 border-b border-white/10 pb-3"
                  >
                    <span className="text-sm text-white/40">{c.label}</span>
                    <span className="flex items-center gap-1.5 truncate text-white/85 group-hover:text-white">
                      {c.value}
                      <ArrowUpRight className="h-3.5 w-3.5 shrink-0 opacity-50 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-6 border-t border-white/10 py-8 text-sm text-white/40 md:flex-row md:items-center md:justify-between">
          <p>© MK DIGITAL 2026 — Tous droits réservés.</p>
          <p className="max-w-md text-xs leading-relaxed text-white/30 md:text-center">
            Projets présentés en version de démonstration ou frontend, dans le respect de la confidentialité de nos clients.
          </p>
          <Magnetic>
            <button type="button" onClick={() => scrollToTarget(0)} className="kicker flex items-center gap-3 text-white/60 hover:text-white">
              Haut de page
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20">
                <ArrowUpRight className="h-4 w-4 -rotate-45" />
              </span>
            </button>
          </Magnetic>
        </div>
      </div>

      <p aria-hidden="true" className="display pointer-events-none select-none whitespace-nowrap text-center text-[17.5vw] leading-[0.75] text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,.09)] md:text-[15.5vw]">
        MK DIGITAL
      </p>
    </footer>
  )
}
