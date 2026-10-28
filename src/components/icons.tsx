import type { SVGProps } from 'react'

type P = SVGProps<SVGSVGElement>
const base = (p: P) => ({
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  ...p,
})

export const ArrowUpRight = (p: P) => (
  <svg {...base(p)}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
)
export const ArrowRight = (p: P) => (
  <svg {...base(p)}>
    <path d="M4 12h16M14 6l6 6-6 6" />
  </svg>
)
export const ArrowLeft = (p: P) => (
  <svg {...base(p)}>
    <path d="M20 12H4M10 6l-6 6 6 6" />
  </svg>
)
export const ArrowDown = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 4v16M6 14l6 6 6-6" />
  </svg>
)
export const Plus = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 5v14M5 12h14" />
  </svg>
)
export const Check = (p: P) => (
  <svg {...base(p)}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
)
export const Info = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11v5M12 7.6v.1" />
  </svg>
)
export const Copy = (p: P) => (
  <svg {...base(p)}>
    <rect x="8" y="8" width="12" height="12" rx="2" />
    <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
  </svg>
)
export const Close = (p: P) => (
  <svg {...base(p)}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
)
export const Mail = (p: P) => (
  <svg {...base(p)}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
  </svg>
)
export const Instagram = (p: P) => (
  <svg {...base(p)}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4.2" />
    <circle cx="17.4" cy="6.6" r="0.6" fill="currentColor" stroke="none" />
  </svg>
)
export const WhatsApp = (p: P) => (
  <svg {...base(p)} viewBox="0 0 24 24">
    <path d="M3.5 20.5 4.8 16A8.5 8.5 0 1 1 8 19.2Z" />
    <path
      d="M9 8.2c.2-.5.5-.5.8-.5h.5c.2 0 .4 0 .5.4l.7 1.7c.1.2 0 .4-.1.6l-.5.6c-.1.1-.2.3 0 .5.4.8 1.1 1.5 1.9 2 .2.1.4.1.5 0l.6-.7c.2-.2.3-.2.5-.1l1.6.8c.2.1.3.2.3.4 0 .5-.2 1.2-.8 1.5-.6.3-1.4.4-2.6-.1a8.4 8.4 0 0 1-3.7-3.3C8.6 10.8 8.6 9.2 9 8.2Z"
      fill="currentColor"
      stroke="none"
    />
  </svg>
)

/* Service icons — drawn on the same 24px grid, thin and geometric. */
export const IconWeb = (p: P) => (
  <svg {...base(p)}>
    <rect x="2.5" y="4" width="19" height="15" rx="2" />
    <path d="M2.5 8h19M6 6h.01M8.5 6h.01M7 12.5l-2 1.75L7 16M17 12.5l2 1.75L17 16M13.2 11.5l-2.4 5.5" />
  </svg>
)
export const IconCart = (p: P) => (
  <svg {...base(p)}>
    <path d="M3 4h2.2l2.2 10.2a1.5 1.5 0 0 0 1.5 1.2h8.4a1.5 1.5 0 0 0 1.5-1.1L20.5 8H6.1" />
    <circle cx="9.5" cy="19.5" r="1.3" />
    <circle cx="17" cy="19.5" r="1.3" />
  </svg>
)
export const IconStack = (p: P) => (
  <svg {...base(p)}>
    <path d="m12 3 9 4.5-9 4.5-9-4.5Z" />
    <path d="m3 12 9 4.5 9-4.5M3 16.5 12 21l9-4.5" />
  </svg>
)
export const IconPen = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 2.5 18 9l-6 12.5L6 9Z" />
    <path d="M12 21.5V12.5M12 12.5a1.6 1.6 0 1 0 0-.01" />
    <path d="M8.3 6.4h7.4" />
  </svg>
)
export const IconRefresh = (p: P) => (
  <svg {...base(p)}>
    <path d="M20 11a8 8 0 0 0-14.5-4.5L4 8.5M4 4v4.5h4.5" />
    <path d="M4 13a8 8 0 0 0 14.5 4.5L20 15.5M20 20v-4.5h-4.5" />
  </svg>
)
export const IconShield = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 3 4.5 6v5.5c0 4.4 3.1 8.2 7.5 9.5 4.4-1.3 7.5-5.1 7.5-9.5V6Z" />
    <path d="m8.8 12 2.2 2.2 4.3-4.4" />
  </svg>
)
export const IconSpark = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 2.5v5M12 16.5v5M2.5 12h5M16.5 12h5M5.3 5.3l3.2 3.2M15.5 15.5l3.2 3.2M18.7 5.3l-3.2 3.2M8.5 15.5l-3.2 3.2" />
  </svg>
)
