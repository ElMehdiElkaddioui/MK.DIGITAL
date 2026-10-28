import { useRef, useState, type FormEvent } from 'react'
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Copy, Info, Instagram, Mail, WhatsApp } from '../components/icons'
import { Magnetic } from '../components/Magnetic'
import { links, site } from '../data/site'
import { gsap } from '../lib/gsap'
import { revealChildren, useGsap } from '../lib/useGsap'

export const projectTypes = ['Site vitrine', 'Boutique e-commerce', 'Application web', 'Refonte de site', 'Design UI/UX', 'Maintenance', 'Autre']
export const budgets = ['Moins de 5 000 MAD', '5 000 – 15 000 MAD', '15 000 – 30 000 MAD', 'Plus de 30 000 MAD', 'À définir ensemble']

type Status = 'idle' | 'sending' | 'success' | 'error'
type Errors = Partial<Record<'name' | 'email' | 'whatsapp' | 'type' | 'message', string>>

const encode = (data: FormData) => new URLSearchParams(data as unknown as Record<string, string>).toString()

function validate(f: FormData): Errors {
  const e: Errors = {}
  const v = (k: string) => String(f.get(k) ?? '').trim()
  if (v('name').length < 2) e.name = 'Indiquez votre nom complet.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v('email'))) e.email = 'Adresse email invalide.'
  if (v('whatsapp') && !/^\+?[\d\s().-]{8,20}$/.test(v('whatsapp'))) e.whatsapp = 'Numéro invalide (ex. +212 6 00 00 00 00).'
  if (!v('type')) e.type = 'Choisissez un type de projet.'
  if (v('message').length < 15) e.message = 'Décrivez votre projet en quelques phrases (15 caractères minimum).'
  return e
}

function Field({ id, label, error, children, hint }: { id: string; label: string; error?: string; children: React.ReactNode; hint?: string }) {
  return (
    <div className="relative">
      {children}
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-0 top-6 origin-left text-white/45 transition-all duration-300 peer-focus:-translate-y-5 peer-focus:scale-[0.78] peer-focus:text-white/70 peer-[:not(:placeholder-shown)]:-translate-y-5 peer-[:not(:placeholder-shown)]:scale-[0.78] peer-data-[filled=true]:-translate-y-5 peer-data-[filled=true]:scale-[0.78]"
      >
        {label}
      </label>
      {hint && !error && <p className="mt-2 text-xs text-white/35">{hint}</p>}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-2 text-xs text-[#ff8f8f]">
          {error}
        </p>
      )}
    </div>
  )
}

const selectCls = 'field peer pr-8 data-[filled=false]:text-white/40'
const Chevron = () => <ArrowDown className="pointer-events-none absolute right-0 top-8 h-4 w-4 text-white/40" />

export function Contact() {
  const root = useRef<HTMLElement>(null)
  const form = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Errors>({})
  const [filled, setFilled] = useState<Record<string, boolean>>({})
  const [copied, setCopied] = useState(false)
  const [summary, setSummary] = useState('')

  useGsap(root, ({ reduced }) => {
    if (reduced) return
    revealChildren(root.current)
    gsap.from('[data-contact-tile]', { y: 40, opacity: 0, stagger: 0.1, duration: 1.2, scrollTrigger: { trigger: '[data-contact-tiles]', start: 'top 85%' } })
  })

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const errs = validate(data)
    setErrors(errs)
    if (Object.keys(errs).length) {
      form.current?.querySelector<HTMLElement>(`[name="${Object.keys(errs)[0]}"]`)?.focus()
      return
    }
    const g = (k: string) => String(data.get(k) ?? '').trim()
    setSummary(
      `Bonjour MK DIGITAL,\n\nNom : ${g('name')}\nEmail : ${g('email')}${g('whatsapp') ? `\nWhatsApp : ${g('whatsapp')}` : ''}\nType de projet : ${g('type')}\nBudget : ${g('budget') || 'Non précisé'}\n\n${g('message')}`,
    )
    setStatus('sending')
    try {
      const res = await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: encode(data) })
      if (!res.ok) throw new Error(String(res.status))
      setStatus('success')
      form.current?.reset()
      setFilled({})
    } catch {
      setStatus('error')
    }
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    } catch {
      window.location.href = links.email
    }
  }

  const tiles = [
    { href: links.whatsappWith('Bonjour MK DIGITAL, je souhaite discuter d’un projet.'), icon: WhatsApp, label: 'WhatsApp', value: site.whatsappDisplay, note: 'Réponse rapide' },
    { href: links.instagram, icon: Instagram, label: 'Instagram', value: site.instagramHandle, note: 'Suivre le studio' },
    { href: links.emailWith('Nouveau projet — MK DIGITAL'), icon: Mail, label: 'Email', value: site.email, note: 'Écrire au studio' },
  ]

  const track = (name: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setFilled((f) => ({ ...f, [name]: e.target.value !== '' }))
  const aria = (k: keyof Errors) => ({ 'aria-invalid': !!errors[k] || undefined, 'aria-describedby': errors[k] ? `${k}-error` : undefined })

  return (
    <section ref={root} id="contact" aria-labelledby="contact-title" className="relative overflow-hidden bg-ink pb-24 pt-28 md:pb-36 md:pt-44">
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 h-[60vmax] w-[80vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,.08),transparent)]" />

      <div className="gutter relative mx-auto max-w-[1600px]">
        <p data-reveal className="kicker flex items-center gap-4 text-white/45">
          <span>06</span>
          <span aria-hidden="true" className="h-px w-10 bg-white/30" />
          <span>Contact</span>
        </p>
        <h2 id="contact-title" data-lines className="display mt-8 text-[10vw] md:text-[6.5vw]">
          <span data-line>
            <span>Let’s build</span>
          </span>
          <span data-line>
            <span className="silver silver-sheen">something</span>
          </span>
          <span data-line>
            <span>extraordinary.</span>
          </span>
        </h2>
        <p data-reveal className="serif-i mt-8 text-[clamp(1.6rem,3.2vw,2.8rem)] text-white/80">
          Votre prochain grand projet commence ici.
        </p>

        <div data-contact-tiles className="mt-16 grid gap-4 md:mt-24 md:grid-cols-3">
          {tiles.map((t) => (
            <a
              key={t.label}
              data-contact-tile
              href={t.href}
              target={t.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="group relative isolate flex items-center justify-between gap-4 overflow-hidden rounded-2xl border border-white/12 p-6 transition-colors duration-500 hover:border-white md:p-8"
            >
              <span aria-hidden="true" className="absolute inset-0 -z-10 translate-y-full bg-white transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-y-0" />
              <span className="flex items-center gap-5">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/20 transition-colors duration-500 group-hover:border-black/15 group-hover:text-black">
                  <t.icon className="h-6 w-6" />
                </span>
                <span className="min-w-0">
                  <span className="kicker block text-white/45 transition-colors duration-500 group-hover:text-black/50">{t.label}</span>
                  <span className="mt-1.5 block truncate text-base font-medium transition-colors duration-500 group-hover:text-black md:text-lg">{t.value}</span>
                </span>
              </span>
              <ArrowUpRight className="h-5 w-5 shrink-0 transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-black" />
              <span className="sr-only">{t.note}{t.href.startsWith('http') ? ' (ouvre un nouvel onglet)' : ''}</span>
            </a>
          ))}
        </div>

        <div className="mt-20 grid gap-14 md:mt-28 lg:grid-cols-12">
          <div data-reveal className="lg:col-span-4">
            <h3 className="text-2xl font-semibold uppercase [font-stretch:118%]">Parlez-nous de votre projet</h3>
            <p className="mt-5 leading-relaxed text-white/55">
              Remplissez le formulaire : nous revenons vers vous par email ou WhatsApp pour en discuter. Toutes les demandes sont lues personnellement.
            </p>
            <button type="button" onClick={copyEmail} className="link-line mt-8 inline-flex items-center gap-2 text-white/80 hover:text-white">
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? 'Adresse copiée' : `Copier ${site.email}`}
            </button>
          </div>

          <div data-reveal className="lg:col-span-8">
            {status === 'success' ? (
              <div role="status" className="flex min-h-[28rem] flex-col items-start justify-center rounded-3xl border border-white/12 p-8 md:p-14">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-black">
                  <Check className="h-6 w-6" />
                </span>
                <p className="display mt-8 text-[clamp(1.8rem,4vw,3.2rem)]">Message envoyé.</p>
                <p className="mt-4 max-w-md leading-relaxed text-white/60">
                  Merci ! Votre demande a bien été transmise à MK DIGITAL. Nous vous répondons au plus vite. Pour une question urgente, écrivez-nous sur WhatsApp.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href={links.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-light">
                    <WhatsApp className="h-4 w-4" /> WhatsApp
                  </a>
                  <button type="button" onClick={() => setStatus('idle')} className="btn btn-ghost">
                    Nouveau message
                  </button>
                </div>
              </div>
            ) : (
              <form
                ref={form}
                name="contact"
                method="POST"
                action="/"
                data-netlify="true"
                netlify-honeypot="bot-field"
                noValidate
                onSubmit={onSubmit}
                onInput={(e) => {
                  const n = (e.target as HTMLInputElement).name as keyof Errors
                  if (errors[n]) setErrors((prev) => ({ ...prev, [n]: undefined }))
                }}
                className="grid gap-x-10 gap-y-6 md:grid-cols-2"
              >
                <input type="hidden" name="form-name" value="contact" />
                <p className="hidden">
                  <label>
                    Ne pas remplir : <input name="bot-field" tabIndex={-1} autoComplete="off" />
                  </label>
                </p>

                <Field id="name" label="Nom complet *" error={errors.name}>
                  <input id="name" name="name" type="text" autoComplete="name" required placeholder=" " className="field peer" {...aria('name')} />
                </Field>
                <Field id="email" label="Email *" error={errors.email}>
                  <input id="email" name="email" type="email" autoComplete="email" inputMode="email" required placeholder=" " className="field peer" {...aria('email')} />
                </Field>
                <Field id="whatsapp" label="Numéro WhatsApp" error={errors.whatsapp} hint="Facultatif — pour un échange plus rapide.">
                  <input id="whatsapp" name="whatsapp" type="tel" autoComplete="tel" inputMode="tel" placeholder=" " className="field peer" {...aria('whatsapp')} />
                </Field>
                <Field id="type" label="Type de projet *" error={errors.type}>
                  <select id="type" name="type" required defaultValue="" onChange={track('type')} data-filled={!!filled.type} className={selectCls} {...aria('type')}>
                    <option value="" disabled>
                      Sélectionner…
                    </option>
                    {projectTypes.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                  <Chevron />
                </Field>
                <div className="md:col-span-2">
                  <Field id="budget" label="Budget estimé">
                    <select id="budget" name="budget" defaultValue="" onChange={track('budget')} data-filled={!!filled.budget} className={selectCls}>
                      <option value="" disabled>
                        Sélectionner…
                      </option>
                      {budgets.map((b) => (
                        <option key={b}>{b}</option>
                      ))}
                    </select>
                    <Chevron />
                  </Field>
                </div>
                <div className="md:col-span-2">
                  <Field id="message" label="Description du projet *" error={errors.message}>
                    <textarea id="message" name="message" rows={5} required placeholder=" " className="field peer resize-none" {...aria('message')} />
                  </Field>
                </div>

                {status === 'error' && (
                  <div role="alert" className="flex gap-4 rounded-2xl border border-[#ff8f8f]/40 bg-[#ff8f8f]/[.06] p-5 md:col-span-2">
                    <Info className="mt-0.5 h-5 w-5 shrink-0 text-[#ff8f8f]" />
                    <div className="text-sm leading-relaxed text-white/75">
                      <p className="font-medium text-white">Le message n’a pas pu être envoyé.</p>
                      <p className="mt-1">Vérifiez votre connexion et réessayez, ou envoyez directement votre demande :</p>
                      <div className="mt-4 flex flex-wrap gap-3">
                        <a href={links.whatsappWith(summary)} target="_blank" rel="noopener noreferrer" className="btn btn-light !min-h-11 !px-5">
                          <WhatsApp className="h-4 w-4" /> Via WhatsApp
                        </a>
                        <a href={links.emailWith('Nouveau projet — MK DIGITAL', summary)} className="btn btn-ghost !min-h-11 !px-5">
                          <Mail className="h-4 w-4" /> Par email
                        </a>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex flex-col gap-5 pt-4 sm:flex-row sm:items-center sm:justify-between md:col-span-2">
                  <p className="text-xs leading-relaxed text-white/35">
                    * Champs obligatoires. Vos informations servent uniquement à répondre à votre demande.
                  </p>
                  <Magnetic>
                    <button type="submit" disabled={status === 'sending'} className="btn btn-light w-full justify-center disabled:opacity-60 sm:w-auto" data-cursor="Envoyer">
                      {status === 'sending' ? 'Envoi en cours…' : 'Envoyer la demande'}
                      <ArrowRight className={`h-4 w-4 ${status === 'sending' ? 'animate-pulse' : ''}`} />
                    </button>
                  </Magnetic>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
