import { ChevronDown } from 'lucide-react'
import { Button } from './ui/Button'

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-16 overflow-hidden">
      {/* Background texture overlay */}
      <div className="absolute inset-0 bg-bg" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* Tagline above name */}
        <p className="font-body text-gold text-xs tracking-[0.35em] uppercase mb-6">
          Traditional &amp; Neo-Traditional
        </p>

        {/* Gold separator */}
        <div className="flex items-center gap-3 mb-6">
          <span className="h-px w-12 bg-gold/40" />
          <span className="text-gold/40 text-xs">✦</span>
          <span className="h-px w-12 bg-gold/40" />
        </div>

        {/* Artist name */}
        <h1 className="font-display font-black uppercase leading-none tracking-[0.15em] text-text mb-4"
          style={{ fontSize: 'clamp(3rem, 10vw, 9rem)' }}
        >
          Gabe
          <br />
          Muñoz
        </h1>

        {/* Subtitle */}
        <p className="font-body text-text-muted text-sm tracking-widest uppercase mt-6 mb-10">
          Tattoo Artist
        </p>

        {/* CTA */}
        <Button as="a" href="#booking" variant="gold">
          Book a Consultation
        </Button>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <ChevronDown size={18} className="text-gold/50" />
      </div>
    </section>
  )
}
