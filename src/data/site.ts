/** Agency facts and contact links — the single place to edit them. */
export const site = {
  name: 'MK DIGITAL',
  founder: 'El Mehdi El Kaddioui',
  location: 'Maroc',
  email: 'mkdigitalweb7@gmail.com',
  whatsappDisplay: '+212 762 101 493',
  whatsappNumber: '212762101493',
  instagramHandle: '@mkdigital.ma',
  instagram: 'https://www.instagram.com/mkdigital.ma/',
  timezone: 'Africa/Casablanca',
}

export const links = {
  whatsapp: `https://wa.me/${site.whatsappNumber}`,
  whatsappWith: (text: string) => `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(text)}`,
  email: `mailto:${site.email}`,
  emailWith: (subject: string, body = '') =>
    `mailto:${site.email}?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ''}`,
  instagram: site.instagram,
}

export const nav = [
  { id: 'studio', label: 'Studio' },
  { id: 'services', label: 'Services' },
  { id: 'projets', label: 'Projets' },
  { id: 'process', label: 'Process' },
  { id: 'contact', label: 'Contact' },
]

export const disclaimer =
  'Les projets présentés sur ce portfolio sont principalement des versions de démonstration et des interfaces frontend réalisées par MK DIGITAL. Certaines fonctionnalités, données et infrastructures privées ne sont pas publiées afin de respecter la confidentialité et les intérêts de nos clients.'
