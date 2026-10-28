import { readFileSync, mkdirSync, writeFileSync } from 'node:fs'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { homeMeta, pageMeta } from './src/data/seo.ts'
import { projects } from './src/data/projects.ts'

// Public URL: set VITE_SITE_URL on Netlify once a custom domain exists; otherwise Netlify's
// build-time URL variable is used. Locally it stays empty and absolute-URL tags are omitted.
const SITE_URL = (process.env.VITE_SITE_URL || process.env.URL || '').replace(/\/$/, '')
const escape = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

function fillPage(html: string, path: string) {
  const m = pageMeta(path)
  const url = SITE_URL ? `${SITE_URL}${path === '/' ? '/' : path}` : ''
  const canonical = url ? `<link rel="canonical" href="${url}" />\n    <meta property="og:url" content="${url}" />` : ''
  return html
    .replace('<!--mk:canonical-->', canonical)
    .replaceAll('%PAGE_TITLE%', escape(m.title))
    .replaceAll('%PAGE_DESCRIPTION%', escape(m.description))
    .replaceAll('%OG_IMAGE%', `${SITE_URL}/og-image.jpg`)
    .replaceAll('%SITE_URL%', SITE_URL ? `${SITE_URL}/` : '/')
    .replaceAll('%ABS%', SITE_URL)
}

/**
 * SEO at build time, no server needed:
 * - fills title/description/canonical/OG in index.html
 * - writes dist/projets/<slug>/index.html with each case study's own metadata
 *   (Netlify serves these real files before the SPA fallback)
 * - emits robots.txt and sitemap.xml
 */
function seo(): Plugin {
  let outDir = 'dist'
  return {
    name: 'mk-seo',
    configResolved(c) {
      outDir = c.build.outDir
    },
    transformIndexHtml: {
      order: 'pre',
      handler: (html) => fillPage(html, '/'),
    },
    closeBundle() {
      let base: string
      try {
        base = readFileSync(`${outDir}/index.html`, 'utf8')
      } catch {
        return // dev server — nothing was written
      }
      const home = escape(homeMeta.title)
      const homeDesc = escape(homeMeta.description)
      for (const p of projects) {
        const path = `/projets/${p.slug}`
        const m = pageMeta(path)
        let html = base.replaceAll(home, escape(m.title)).replaceAll(homeDesc, escape(m.description))
        if (SITE_URL) html = html.replaceAll(`href="${SITE_URL}/"`, `href="${SITE_URL}${path}"`).replaceAll(`content="${SITE_URL}/"`, `content="${SITE_URL}${path}"`)
        mkdirSync(`${outDir}/projets/${p.slug}`, { recursive: true })
        writeFileSync(`${outDir}/projets/${p.slug}/index.html`, html)
      }

      writeFileSync(`${outDir}/robots.txt`, `User-agent: *\nAllow: /\n${SITE_URL ? `\nSitemap: ${SITE_URL}/sitemap.xml\n` : ''}`)
      const today = new Date().toISOString().slice(0, 10)
      const urls = ['/', ...projects.map((p) => `/projets/${p.slug}`)]
      const origin = SITE_URL || 'https://VOTRE-SITE.netlify.app'
      writeFileSync(
        `${outDir}/sitemap.xml`,
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
          .map((u) => `  <url>\n    <loc>${origin}${u}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${u === '/' ? '1.0' : '0.7'}</priority>\n  </url>`)
          .join('\n')}\n</urlset>\n`,
      )
    },
  }
}

/**
 * Preloads the two latin font files the first screen needs (hashed names come from the bundle),
 * so the expanded headline renders in its real font instead of reflowing after a swap.
 */
function preloadFonts(): Plugin {
  return {
    name: 'mk-preload-fonts',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(_html, ctx) {
        const files = Object.keys(ctx.bundle ?? {}).filter((f) => /archivo-latin-standard-normal|instrument-serif-latin-400-italic.*\.woff2$/.test(f) && f.endsWith('.woff2'))
        return files.map((f) => ({ tag: 'link', attrs: { rel: 'preload', as: 'font', type: 'font/woff2', href: `/${f}`, crossorigin: '' }, injectTo: 'head' as const }))
      },
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), seo(), preloadFonts()],
  // Pre-bundle every runtime dependency up front: the dev server never has to discover one
  // mid-load and force a page reload.
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-dom/client', 'react/jsx-runtime', 'gsap', 'gsap/ScrollTrigger', 'lenis'],
  },
  build: {
    target: 'es2020',
    assetsInlineLimit: 2048,
  },
})
