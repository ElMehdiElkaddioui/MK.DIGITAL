import { useEffect, useState } from 'react'
import { Cursor } from './components/Cursor'
import { FloatingWhatsApp } from './components/FloatingWhatsApp'
import { Intro, shouldPlayIntro } from './components/Intro'
import { Nav } from './components/Nav'
import { getProject } from './data/projects'
import { pageMeta } from './data/seo'
import { useRouter } from './lib/router'
import { startSmoothScroll } from './lib/smooth'
import { NotFound } from './pages/NotFound'
import { ProjectPage } from './pages/ProjectPage'
import { Contact } from './sections/Contact'
import { Footer } from './sections/Footer'
import { Hero } from './sections/Hero'
import { Process } from './sections/Process'
import { Services } from './sections/Services'
import { Studio } from './sections/Studio'
import { Why } from './sections/Why'
import { Work } from './sections/Work'

function Home({ ready }: { ready: boolean }) {
  return (
    <main id="main">
      <Hero ready={ready} />
      <Studio />
      <Services />
      <Work />
      <Why />
      <Process />
      <Contact />
    </main>
  )
}

export function App() {
  const { path } = useRouter()
  const [intro] = useState(shouldPlayIntro)
  const [ready, setReady] = useState(!intro)

  useEffect(() => {
    // No intro this time (already seen / reduced motion): drop the HTML boot shell right away.
    if (!intro) document.getElementById('boot')?.remove()
    startSmoothScroll()
  }, [intro])

  // Keep <title> and description in sync on client-side navigation.
  useEffect(() => {
    const m = pageMeta(path)
    document.title = m.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', m.description)
  }, [path])

  const slug = path.match(/^\/projets\/([\w-]+)$/)?.[1]
  const project = slug ? getProject(slug) : undefined

  let page
  if (path === '/') page = <Home ready={ready} />
  else if (project) page = <ProjectPage key={project.slug} project={project} />
  else page = <NotFound />

  return (
    <>
      <a href="#main" className="sr-only z-[200] rounded-full bg-white px-5 py-3 text-sm font-semibold text-black focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Aller au contenu
      </a>
      {intro && <Intro onDone={() => setReady(true)} />}
      <Nav ready={ready} />
      {page}
      <Footer />
      <FloatingWhatsApp />
      <Cursor />
      <div className="grain" aria-hidden="true" />
    </>
  )
}
