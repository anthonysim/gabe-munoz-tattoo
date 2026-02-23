import { Instagram, Mail } from 'lucide-react'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Tattoos', href: '#portfolio' },
  { label: 'Services', href: '#services' },
  { label: 'Book', href: '#booking' },
]

// TODO: Replace with actual values
const INSTAGRAM_HANDLE = '@munozgabe'
const INSTAGRAM_URL = 'https://instagram.com/munozgabe'
const EMAIL = 'hello@gabemunoz.com'
const LOCATION = 'Fullerton & Encinitas, CA'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-surface border-t border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <p className="font-display text-gold text-sm tracking-[0.2em] uppercase font-semibold mb-3">
              Gabe Muñoz
            </p>
            <p className="font-body text-xs text-text-muted leading-relaxed">
              Traditional &amp; Neo-Traditional Tattoo Artist
              <br />
              {LOCATION}
            </p>
          </div>

          {/* Nav links */}
          <div>
            <p className="font-body text-xs tracking-widest uppercase text-text-muted mb-4">
              Navigate
            </p>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-body text-xs text-text-muted hover:text-gold transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact / Social */}
          <div>
            <p className="font-body text-xs tracking-widest uppercase text-text-muted mb-4">
              Connect
            </p>
            <div className="flex flex-col gap-3">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-text-muted hover:text-gold transition-colors duration-200"
              >
                <Instagram size={14} strokeWidth={1.5} />
                <span className="font-body text-xs">{INSTAGRAM_HANDLE}</span>
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center gap-2 text-text-muted hover:text-gold transition-colors duration-200"
              >
                <Mail size={14} strokeWidth={1.5} />
                <span className="font-body text-xs">{EMAIL}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-text-muted">
            &copy; {year} Gabe Muñoz. All rights reserved.
          </p>
          <p className="font-body text-xs text-text-muted/50">
            All artwork &copy; Gabe Muñoz. Do not reproduce without permission.
          </p>
        </div>
      </div>
    </footer>
  )
}
