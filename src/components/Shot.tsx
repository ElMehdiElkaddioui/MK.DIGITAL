import type { ReactNode } from 'react'

type ShotProps = { id: string; alt: string; sizes?: string; className?: string; eager?: boolean; mobile?: boolean }

/** Responsive screenshot of a project (generated in public/work by the image script). */
export function Shot({ id, alt, sizes = '100vw', className = '', eager = false, mobile = false }: ShotProps) {
  const [s, l] = mobile ? [390, 780] : [960, 1600]
  return (
    <img
      src={`/work/${id}-${s}.webp`}
      srcSet={`/work/${id}-${s}.webp ${s}w, /work/${id}-${l}.webp ${l}w`}
      sizes={sizes}
      width={mobile ? 390 : 1600}
      height={mobile ? 844 : 1000}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={eager ? 'high' : undefined}
      className={className}
    />
  )
}

/** Minimal browser chrome around a desktop screenshot. */
export function BrowserFrame({ url, children, className = '' }: { url: string; children: ReactNode; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-[10px] border border-white/10 bg-ash shadow-[0_40px_120px_-30px_rgba(0,0,0,.9)] ${className}`}>
      <div className="flex items-center gap-3 border-b border-white/[.07] bg-[#0d0d0e] px-3 py-2.5 md:px-4">
        <span className="flex gap-1.5" aria-hidden="true">
          <i className="h-2 w-2 rounded-full bg-white/15" />
          <i className="h-2 w-2 rounded-full bg-white/15" />
          <i className="h-2 w-2 rounded-full bg-white/15" />
        </span>
        <span className="mx-auto truncate rounded-full bg-white/[.05] px-4 py-1 text-[0.62rem] tracking-wide text-white/45">
          {url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
        </span>
        <span className="w-8" aria-hidden="true" />
      </div>
      <div className="relative aspect-[16/10] overflow-hidden">{children}</div>
    </div>
  )
}

/** Phone silhouette around a mobile screenshot. Pass `relative` or `absolute` via className. */
export function PhoneFrame({ children, className = 'relative' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-[2rem] border border-white/15 bg-[#0b0b0c] p-[6px] shadow-[0_40px_90px_-20px_rgba(0,0,0,.95)] ${className}`}>
      <div className="relative aspect-[390/844] overflow-hidden rounded-[1.6rem]">{children}</div>
      <span aria-hidden="true" className="absolute left-1/2 top-[10px] h-[14px] w-[32%] -translate-x-1/2 rounded-full bg-black" />
    </div>
  )
}
