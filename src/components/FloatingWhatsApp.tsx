import { useEffect, useState } from 'react'
import { links } from '../data/site'
import { WhatsApp } from './icons'

/** Quick WhatsApp access once the visitor has left the hero — most traffic comes from Instagram on mobile. */
export function FloatingWhatsApp() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => {
      const contact = document.getElementById('contact')
      const nearContact = contact ? contact.getBoundingClientRect().top < window.innerHeight * 0.6 : false
      setShow(window.scrollY > window.innerHeight * 0.8 && !nearContact)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <a
      href={links.whatsappWith('Bonjour MK DIGITAL, je souhaite discuter d’un projet.')}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Écrire à MK DIGITAL sur WhatsApp (ouvre un nouvel onglet)"
      tabIndex={show ? 0 : -1}
      className={`group fixed bottom-5 right-5 z-50 flex h-14 items-center gap-3 rounded-full border border-white/15 bg-black/80 pl-4 pr-4 text-white shadow-[0_20px_50px_rgba(0,0,0,.6)] backdrop-blur-md transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)] hover:bg-white hover:text-black md:bottom-8 md:right-8 ${
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'
      }`}
    >
      <WhatsApp className="h-6 w-6" />
      <span className="kicker hidden !tracking-[0.2em] sm:inline">WhatsApp</span>
    </a>
  )
}
