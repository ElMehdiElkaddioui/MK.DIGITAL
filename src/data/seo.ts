import { projects } from './projects.ts'

/** Page titles/descriptions — shared by the app (client navigation) and the build (static HTML per route). */
export const homeMeta = {
  title: 'MK DIGITAL — Agence web au Maroc | Création de sites web & e-commerce',
  description:
    'MK DIGITAL, studio de création web au Maroc fondé par El Mehdi El Kaddioui : sites vitrines, boutiques e-commerce et applications web sur mesure, rapides et pensés pour le mobile.',
}

export function pageMeta(path: string) {
  const slug = path.match(/^\/projets\/([\w-]+)$/)?.[1]
  const p = slug && projects.find((x) => x.slug === slug)
  if (p) return { title: `${p.name} — ${p.category} | Projet MK DIGITAL`, description: p.summary }
  if (path === '/') return homeMeta
  return { title: 'Page introuvable | MK DIGITAL', description: homeMeta.description }
}
