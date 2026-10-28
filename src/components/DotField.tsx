import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../lib/gsap'

/**
 * Field of fine silver points. A slow diagonal light sweep (same angle as the logo's sheen)
 * and the pointer brighten nearby points. Plain 2D canvas, paused when off-screen.
 */
export function DotField({ className = '' }: { className?: string }) {
  const canvas = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const c = canvas.current
    const ctx = c?.getContext('2d')
    if (!c || !ctx) return
    const reduced = prefersReducedMotion()
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    let w = 0
    let h = 0
    let gap = 26
    let raf = 0
    let visible = true
    const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999 }

    const resize = () => {
      const r = c.getBoundingClientRect()
      w = r.width
      h = r.height
      gap = w < 768 ? 22 : 28
      c.width = Math.round(w * dpr)
      c.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      if (reduced) draw(0)
    }

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h)
      const sweep = ((t / 9000) % 1) * (w + h) * 1.6 - (w + h) * 0.3
      pointer.x += (pointer.tx - pointer.x) * 0.08
      pointer.y += (pointer.ty - pointer.y) * 0.08
      for (let y = gap / 2; y < h; y += gap) {
        for (let x = gap / 2; x < w; x += gap) {
          // distance to the diagonal light band (x + y = sweep)
          const band = Math.abs(x * 0.8 + y - sweep)
          let a = 0.07 + Math.max(0, 1 - band / 220) * 0.38
          const dx = x - pointer.x
          const dy = y - pointer.y
          const d = Math.sqrt(dx * dx + dy * dy)
          let r = 0.75
          if (d < 180) {
            const k = 1 - d / 180
            a += k * 0.6
            r += k * 1.1
          }
          // vignette towards the edges keeps the focus on the headline
          const vx = x / w - 0.5
          const vy = y / h - 0.5
          a *= Math.max(0, 1 - (vx * vx + vy * vy) * 1.6)
          ctx.fillStyle = `rgba(226,228,232,${a.toFixed(3)})`
          ctx.fillRect(x - r, y - r, r * 2, r * 2)
        }
      }
    }

    const loop = (t: number) => {
      if (visible) draw(t)
      raf = requestAnimationFrame(loop)
    }

    const onMove = (e: PointerEvent) => {
      const r = c.getBoundingClientRect()
      pointer.tx = e.clientX - r.left
      pointer.ty = e.clientY - r.top
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(c)
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting))
    io.observe(c)
    if (!reduced) {
      raf = requestAnimationFrame(loop)
      window.addEventListener('pointermove', onMove, { passive: true })
    }
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      window.removeEventListener('pointermove', onMove)
    }
  }, [])

  return <canvas ref={canvas} aria-hidden="true" className={`pointer-events-none ${className}`} />
}
