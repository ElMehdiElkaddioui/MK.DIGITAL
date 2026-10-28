import { ArrowLeft } from '../components/icons'
import { Mark } from '../components/Logo'
import { Link } from '../lib/router'

export function NotFound() {
  return (
    <main id="main" className="gutter relative flex min-h-[100svh] flex-col items-start justify-center overflow-hidden bg-ink pt-24">
      <div aria-hidden="true" className="pointer-events-none absolute -right-[8vw] top-1/2 -translate-y-1/2 opacity-[0.06]">
        <Mark width={640} alt="" className="h-auto w-[70vw] max-w-[800px]" />
      </div>
      <p className="kicker text-white/40">Erreur 404</p>
      <h1 className="display mt-6 text-[clamp(3rem,12vw,12rem)]">
        <span className="silver">Page</span>
        <br />
        introuvable.
      </h1>
      <p className="mt-8 max-w-md leading-relaxed text-white/60">Cette page n’existe pas ou a été déplacée. Retrouvez nos projets et nos services depuis l’accueil.</p>
      <Link to="/" className="btn btn-light mt-10">
        <ArrowLeft className="h-4 w-4" />
        Retour à l’accueil
      </Link>
    </main>
  )
}
