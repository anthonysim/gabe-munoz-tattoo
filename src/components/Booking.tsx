import Cal, { getCalApi } from '@calcom/embed-react'
import { useEffect } from 'react'
import { SectionWrapper } from './ui/SectionWrapper'

// TODO: Replace with Gabe's actual Cal.com username/event-slug
const CAL_LINK = 'gabe-munoz/consultation'

export function Booking() {
  useEffect(() => {
    ;(async () => {
      const cal = await getCalApi({ namespace: 'consultation' })
      cal('ui', {
        theme: 'dark',
        hideEventTypeDetails: false,
        layout: 'month_view',
      })
    })()
  }, [])

  return (
    <div className="bg-surface-alt">
      <SectionWrapper>
        {/* Section header */}
        <div className="text-center mb-12">
          <p className="font-body text-gold text-xs tracking-[0.3em] uppercase mb-4">
            Let's Talk
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-text uppercase tracking-wide">
            Book a Consultation
          </h2>
          <div className="flex items-center justify-center gap-3 mt-6 mb-6">
            <span className="h-px w-10 bg-gold/40" />
            <span className="text-gold/40 text-xs">✦</span>
            <span className="h-px w-10 bg-gold/40" />
          </div>
          <p className="font-body text-text-muted text-sm max-w-md mx-auto leading-relaxed">
            All new tattoos start with a consultation. Select a time that works for
            you and come prepared with references, ideas, or just an open mind.
          </p>
        </div>

        {/* Cal.com embed */}
        <div className="border border-border overflow-hidden">
          <Cal
            namespace="consultation"
            calLink={CAL_LINK}
            style={{ width: '100%', height: '700px', overflow: 'scroll' }}
            config={{
              layout: 'month_view',
            }}
          />
        </div>
      </SectionWrapper>
    </div>
  )
}
