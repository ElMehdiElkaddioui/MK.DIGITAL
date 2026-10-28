/**
 * The supplied MK DIGITAL logos, lifted onto transparency by scripts/optimize-images.mjs
 * (pixels and proportions unchanged). `variant="light"` is the black version for white sections.
 */
const ratio = { logo: 1200 / 230, mark: 640 / 540 }

type LogoProps = { variant?: 'dark' | 'light'; height?: number; className?: string; eager?: boolean }

export function Logo({ variant = 'dark', height = 36, className = '', eager = false }: LogoProps) {
  const name = variant === 'dark' ? 'mk-logo' : 'mk-logo-light'
  const w = Math.round(height * ratio.logo)
  return (
    <img
      src={`/brand/${name}-480.webp`}
      srcSet={`/brand/${name}-480.webp 480w, /brand/${name}-1200.webp 1200w`}
      sizes={`${w}px`}
      width={w}
      height={height}
      alt="MK DIGITAL — Web · E-commerce · Apps"
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      className={className}
    />
  )
}

type MarkProps = { variant?: 'dark' | 'light'; width?: number; className?: string; alt?: string; eager?: boolean }

export function Mark({ variant = 'dark', width = 64, className = '', alt = 'MK DIGITAL', eager = false }: MarkProps) {
  const name = variant === 'dark' ? 'mk-mark' : 'mk-mark-light'
  return (
    <img
      src={`/brand/${name}-160.webp`}
      srcSet={`/brand/${name}-160.webp 160w, /brand/${name}-640.webp 640w`}
      sizes={`${width}px`}
      width={width}
      height={Math.round(width / ratio.mark)}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      className={className}
    />
  )
}
