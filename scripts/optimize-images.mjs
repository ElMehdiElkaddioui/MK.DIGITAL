// Builds every web asset in public/ from the originals in assets-src/.
// Run with `npm run images` — only needed when a logo or screenshot changes.
import sharp from 'sharp'
import { mkdirSync, readdirSync } from 'node:fs'

const SRC = 'assets-src'
const OUT = 'public'
mkdirSync(`${OUT}/brand`, { recursive: true })
mkdirSync(`${OUT}/work`, { recursive: true })

/**
 * Lifts a logo off its flat background without redrawing it.
 * Dark logos (white/silver on #000): alpha ramps with brightness, colour is un-premultiplied
 * so anti-aliased edges keep the silver tone. Light logos (black on #fff): alpha = darkness.
 */
async function lift(file, { mode, crop }) {
  let img = sharp(`${SRC}/logos/${file}`)
  if (crop) img = img.extract(crop)
  const { data, info } = await img.removeAlpha().raw().toBuffer({ resolveWithObject: true })
  const out = Buffer.alloc(info.width * info.height * 4)
  const T = 150 // brightness at which the silver mark is treated as fully opaque
  for (let i = 0, j = 0; i < data.length; i += 3, j += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2]
    if (mode === 'dark') {
      const a = Math.min(1, Math.max(r, g, b) / T)
      out[j] = a ? Math.min(255, r / Math.max(a, r / 255)) : 0
      out[j + 1] = a ? Math.min(255, g / Math.max(a, g / 255)) : 0
      out[j + 2] = a ? Math.min(255, b / Math.max(a, b / 255)) : 0
      out[j + 3] = Math.round(a * 255)
    } else {
      const a = 1 - Math.min(r, g, b) / 255
      out[j] = out[j + 1] = out[j + 2] = 0
      out[j + 3] = Math.round(a * 255)
    }
  }
  return sharp(out, { raw: { width: info.width, height: info.height, channels: 4 } }).trim({ threshold: 1 })
}

async function brand() {
  // Logo 2 (dark, horizontal) → main header/footer lockup + transparent mark.
  const horiz = await (await lift('mk-horizontal-dark.png', { mode: 'dark' })).png().toBuffer()
  const markCrop = { left: 300, top: 400, width: 440, height: 400 }
  const mark = await (await lift('mk-horizontal-dark.png', { mode: 'dark', crop: markCrop })).png().toBuffer()
  // Logo 3 (light) → same lockup for white sections.
  const horizLight = await (await lift('mk-horizontal-light.png', { mode: 'light' })).png().toBuffer()
  const markLight = await (await lift('mk-horizontal-light.png', { mode: 'light', crop: markCrop })).png().toBuffer()

  for (const [name, buf, widths] of [
    ['mk-logo', horiz, [480, 1200]],
    ['mk-logo-light', horizLight, [480, 1200]],
    ['mk-mark', mark, [160, 640]],
    ['mk-mark-light', markLight, [160, 640]],
  ]) {
    for (const w of widths) {
      await sharp(buf).resize({ width: w }).webp({ quality: 92, alphaQuality: 100 }).toFile(`${OUT}/brand/${name}-${w}.webp`)
    }
    await sharp(buf).resize({ width: widths[0] }).png({ compressionLevel: 9 }).toFile(`${OUT}/brand/${name}.png`)
  }

  // Logo 1 (square monogram on its vignette) → favicons, app icons, schema logo.
  const square = `${SRC}/logos/mk-monogram-dark.png`
  await sharp(square).resize(32).png().toFile(`${OUT}/favicon-32.png`)
  await sharp(square).resize(180).png().toFile(`${OUT}/apple-touch-icon.png`)
  await sharp(square).resize(192).png().toFile(`${OUT}/icon-192.png`)
  await sharp(square).resize(512).png().toFile(`${OUT}/icon-512.png`)

  // Open Graph card 1200×630 from logo 2 on pure black.
  const og = await sharp(`${SRC}/logos/mk-horizontal-dark.png`).resize({ width: 1200, height: 600, fit: 'contain', background: '#000' }).toBuffer()
  await sharp({ create: { width: 1200, height: 630, channels: 3, background: '#000' } })
    .composite([{ input: og, top: 15, left: 0 }])
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(`${OUT}/og-image.jpg`)
}

async function work() {
  for (const f of readdirSync(`${SRC}/shots`).filter((f) => f.endsWith('.png'))) {
    const base = f.replace('.png', '')
    const mobile = base.endsWith('-m1')
    const widths = mobile ? [390, 780] : [960, 1600]
    for (const w of widths) {
      await sharp(`${SRC}/shots/${f}`).resize({ width: w }).webp({ quality: 78, effort: 6 }).toFile(`${OUT}/work/${base}-${w}.webp`)
    }
  }
}

await brand()
await work()
console.log('images ready')
