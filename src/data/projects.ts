/**
 * Portfolio projects. Every fact here was checked on the live demo or in the project's source.
 *
 * `relation` drives the public label:
 *   'client'  → "Projet client"  — only once the client relationship is confirmed
 *   'demo'    → "Démonstration"  — public demo / frontend version
 *   'concept' → "Concept"        — unsolicited proposal or personal concept
 *
 * `stack` lists only technologies verified in the source code or detected on the live site.
 */
export type Relation = 'client' | 'demo' | 'concept'

export type Project = {
  slug: string
  name: string
  category: string
  sector: string
  relation: Relation
  url: string
  accent: string
  summary: string
  intro: string
  features: string[]
  stack: string[]
  note?: string
  shots: { cover: string; second: string; third: string; mobile: string }
}

export const relationLabel: Record<Relation, string> = {
  client: 'Projet client',
  demo: 'Démonstration',
  concept: 'Concept',
}

const shots = (key: string) => ({
  cover: `${key}-d1`,
  second: `${key}-d2`,
  third: `${key}-d3`,
  mobile: `${key}-m1`,
})

export const projects: Project[] = [
  {
    slug: 'rayan-benameur',
    name: 'Rayan Benameur',
    category: 'Portfolio de footballeur',
    sector: 'Sport · Athlète',
    relation: 'demo',
    url: 'https://rayanbenameur.netlify.app/',
    accent: '#e2333a',
    summary:
      'Un site éditorial pour un latéral gauche marocain formé à Casablanca : typographie monumentale, joueur détouré et récit de carrière animé au scroll.',
    intro:
      'Présenter un jeune joueur comme une marque. Le site s’ouvre sur une introduction animée, puis sur un héros typographique où le joueur, détouré, passe entre les lettres de son nom. Chaque section — profil, parcours, sélection marocaine, images en action, galerie — se dévoile au rythme du scroll.',
    features: [
      'Site bilingue français / anglais',
      'Introduction animée et héros typographique avec joueur détouré',
      'Parcours, profil et données publiques présentés en sections éditoriales',
      'Galerie photo avec visionneuse plein écran',
      'Vidéo de highlights chargée uniquement au clic (respect de la vie privée)',
      'Animations GSAP ScrollTrigger avec alternative « mouvement réduit »',
      'Images optimisées en AVIF / WebP, plusieurs résolutions',
    ],
    stack: ['React 19', 'Vite', 'TypeScript', 'Tailwind CSS 4', 'GSAP'],
    shots: shots('rayan'),
  },
  {
    slug: 'mm-el-jadida',
    name: 'MM El Jadida',
    category: 'Café · Restaurant · Pâtisserie',
    sector: 'Restauration',
    relation: 'concept',
    url: 'https://mmeljadida.netlify.app/',
    accent: '#c8733f',
    summary:
      'Une vitrine haut de gamme pour un café-restaurant face à l’Atlantique : vidéo en cuisine, carte interactive, galerie et réservation en mode démo.',
    intro:
      'Une maquette conceptuelle réalisée pour être présentée aux propriétaires. L’univers reprend les teintes cognac et dorées du lieu, avec des arches en écho à l’architecture, une vidéo filmée en cuisine et une carte qui voyage entre Méditerranée, Asie et pâtisserie fine.',
    features: [
      'Trois langues : français, anglais et arabe (mise en page RTL)',
      'Héros vidéo et galerie filtrable avec visionneuse',
      'Carte interactive par catégories (sélection et prix de démonstration)',
      'Parcours de réservation simulé : calendrier, créneaux, validation',
      'Espace administrateur de démonstration (données fictives)',
      'Plusieurs pages : univers, carte, galerie, réservation, contact',
    ],
    stack: ['React 19', 'Vite', 'TypeScript', 'Tailwind CSS 4', 'Framer Motion', 'React Router', 'i18next'],
    note: 'Maquette non officielle — photos et vidéos © MM El Jadida.',
    shots: shots('mm'),
  },
  {
    slug: 'dhj-el-jadida',
    name: 'DHJ El Jadida',
    category: 'Site de club de football',
    sector: 'Sport · Club',
    relation: 'concept',
    url: 'https://dhjjadidi.netlify.app/',
    accent: '#16b56e',
    summary:
      'Une proposition de nouveau site pour le Difaâ Hassani d’El Jadida : prochain match, résultats, classement Botola Pro, effectif et histoire du club.',
    intro:
      'Une proposition indépendante, non affiliée au club, pensée comme le site d’un club professionnel moderne. Elle réunit le calendrier, les derniers résultats, le classement, l’effectif complet et l’histoire du club, en français et en arabe, avec des scènes 3D pour le stade et le palmarès.',
    features: [
      'Bilingue français / arabe avec mise en page RTL',
      'Prochain match, derniers résultats et forme de l’équipe',
      'Classement Botola Pro et effectif avec fiches joueurs',
      'Histoire, palmarès et présentation du Stade El Abdi',
      'Scènes 3D (stade, trophée) avec Three.js',
      'Données sourcées et datées, mention « proposition non officielle »',
    ],
    stack: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Three.js', 'React Router', 'i18next'],
    note: 'Concept non officiel, non affilié au Difaâ Hassani d’El Jadida.',
    shots: shots('dhj'),
  },
  {
    slug: 'madani-shop',
    name: 'Madani Shop',
    category: 'E-commerce · Parfumerie',
    sector: 'Beauté · Retail',
    relation: 'demo',
    url: 'https://lmadanishopdemomehdi.netlify.app/',
    accent: '#c9a25f',
    summary:
      'Une boutique en ligne de démonstration pour une parfumerie d’El Jadida : huit rayons, fiches produits à formats et teintes, favoris et panier.',
    intro:
      'Un projet de boutique en ligne pour Madani Parfumerie. L’expérience reprend l’organisation d’une vraie boutique — huit rayons, des familles olfactives, du maquillage à comparer teinte par teinte — dans un écrin sombre et doré qui met les produits en lumière.',
    features: [
      'Huit univers produits avec navigation par méga-menus',
      'Fiches produits avec formats (30, 50, 100 ml) et nuances',
      'Recherche, favoris et panier',
      'Mise en avant des nouveautés et des promotions',
      'Interface responsive pensée pour le mobile',
      'Catalogue et prix fictifs, clairement signalés comme démonstration',
    ],
    stack: ['React', 'Vite'],
    note: 'Démonstration : produits, marques et prix fictifs, aucune commande n’est transmise.',
    shots: shots('madani'),
  },
  {
    slug: 'elbahri-shop',
    name: 'Elbahri Shop',
    category: 'E-commerce · Chaussures',
    sector: 'Mode homme',
    relation: 'demo',
    url: 'https://elbahrishop.netlify.app/',
    accent: '#b98552',
    summary:
      'Une boutique de sandales et d’espadrilles pour hommes, pensée pour le marché marocain : paiement à la livraison, pointures 39 à 45 et commande simple.',
    intro:
      'Une boutique claire et chaleureuse, construite autour des attentes des acheteurs au Maroc : livraison partout dans le pays, paiement à la réception et échange de pointure. Les visuels larges laissent parler le cuir, la toile et la corde de jute.',
    features: [
      'Catalogue Sandales / Espadrilles avec variantes de couleur',
      'Sélection de pointure (39 à 45) et échange mis en avant',
      'Paiement à la livraison et livraison partout au Maroc',
      'Panier, favoris et recherche',
      'Bouton WhatsApp flottant pour les questions',
      'Coordonnées et avis de démonstration, clairement signalés',
    ],
    stack: ['React', 'Vite'],
    note: 'Démonstration : aucune commande réelle n’est enregistrée.',
    shots: shots('elbahri'),
  },
  {
    slug: 'clinikc',
    name: 'Clinikc',
    category: 'Clinique · Landing page',
    sector: 'Santé · Esthétique',
    relation: 'concept',
    url: 'https://clinikc.netlify.app/',
    accent: '#27b3c9',
    summary:
      'Une landing page premium pour une clinique de greffe capillaire à Istanbul (marque « FAZEN ») : comparateur avant / après, 4 langues et thème clair / sombre.',
    intro:
      'Une page conçue pour rassurer une patientèle internationale. Grande typographie, contrastes profonds et une touche turquoise, un comparateur avant / après interactif, la présentation des techniques et du parcours patient, et un contact WhatsApp toujours à portée.',
    features: [
      'Quatre langues : anglais, français, turc et arabe',
      'Thème clair / sombre',
      'Comparateur avant / après interactif',
      'Présentation des techniques (FUE Sapphire, DHI) et du parcours patient',
      'Prise de contact et WhatsApp mis en avant',
      'Site léger en HTML, CSS et JavaScript, sans framework',
    ],
    stack: ['HTML', 'CSS', 'JavaScript'],
    note: 'Concept : les coordonnées et chiffres affichés sur la démo sont illustratifs.',
    shots: shots('clinikc'),
  },
  {
    slug: 'mazagan-scoot',
    name: 'Mazagan Scoot',
    category: 'Plateforme de mobilité',
    sector: 'Mobilité · Application web',
    relation: 'concept',
    url: 'https://mazaganscoot.netlify.app/',
    accent: '#c6f432',
    summary:
      'Le prototype d’une plateforme de location de trottinettes électriques à El Jadida : site public, carte des stations et trois espaces — utilisateur, admin, maintenance.',
    intro:
      'Une application web complète en prototype. Au-delà du site public — fonctionnement, stations, tarifs, sécurité — elle simule les trois rôles d’un vrai service : l’utilisateur qui réserve et roule, l’administrateur qui pilote la flotte, et l’équipe de maintenance.',
    features: [
      'Site public : fonctionnement, stations, tarifs, sécurité, FAQ',
      'Carte interactive des stations',
      'Connexion / inscription et espace utilisateur de démonstration',
      'Espaces administrateur et maintenance',
      'Parcours de location : réservation, déverrouillage, wallet',
      'Interface type tableau de bord, sombre et technique',
    ],
    stack: ['React', 'Vite'],
    note: 'Prototype : la flotte, les stations et les chiffres affichés sont illustratifs.',
    shots: shots('mazagan'),
  },
]

export const getProject = (slug: string) => projects.find((p) => p.slug === slug)
