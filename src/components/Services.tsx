import { Pen, Zap, RefreshCw } from 'lucide-react'
import { Button } from './ui/Button'

const services = [
  {
    icon: Pen,
    title: 'Custom Pieces',
    description:
      'Designed specifically for you. Bring your concept or trust Gabe to develop something original — every custom piece starts with a consultation to ensure the design fits your vision and body.',
  },
  {
    icon: Zap,
    title: 'Flash Tattoos',
    description:
      'Pre-drawn designs available on a first-come, first-served basis. Flash pieces are a great way to get Gabe\'s work at a set price with minimal turnaround. Check Instagram for current available flash.',
  },
  {
    icon: RefreshCw,
    title: 'Cover-Ups & Reworks',
    description:
      'Old tattoo you want reimagined? Gabe evaluates cover-up projects on a case-by-case basis, focusing on designs that will genuinely improve on what\'s there — not just hide it.',
  },
]

export function Services() {
  return (
    <div className="min-h-screen flex items-center px-6 md:px-12 py-20">
    <div className="max-w-7xl mx-auto w-full">
      {/* Section header */}
      <div className="text-center mb-14">
        <p className="font-body text-gold text-xs tracking-[0.3em] uppercase mb-4">
          What I Do
        </p>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-text uppercase tracking-wide">
          Services
        </h2>
        <div className="flex items-center justify-center gap-3 mt-6">
          <span className="h-px w-10 bg-gold/40" />
          <span className="text-gold/40 text-xs">✦</span>
          <span className="h-px w-10 bg-gold/40" />
        </div>
      </div>

      {/* Service cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
        {services.map((service) => {
          const Icon = service.icon
          return (
            <div
              key={service.title}
              className="bg-surface border border-border p-8 flex flex-col gap-5 hover:border-gold/40 transition-colors duration-300"
            >
              <Icon size={24} className="text-gold" strokeWidth={1.5} />
              <h3 className="font-display text-lg font-semibold text-text uppercase tracking-wide">
                {service.title}
              </h3>
              <p className="font-body text-sm text-text-muted leading-relaxed">
                {service.description}
              </p>
            </div>
          )
        })}
      </div>

      {/* CTA */}
      <div className="text-center">
        <Button as="a" href="#booking" variant="gold">
          Book a Consultation
        </Button>
      </div>
    </div>
    </div>
  )
}
