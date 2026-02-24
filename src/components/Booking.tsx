import { useState } from 'react'
import { MapPin } from 'lucide-react'
import { SectionWrapper } from './ui/SectionWrapper'

const LOCATIONS = [
  { id: 'fullerton', label: 'Fullerton', state: 'CA', address: '521 N Harbor Blvd, Fullerton, CA 92832' },
  { id: 'encinitas', label: 'Encinitas', state: 'CA', address: '454 N Coast Hwy 101, Encinitas, CA 92024' },
] as const

type LocationId = (typeof LOCATIONS)[number]['id']

export function Booking() {
  const [selectedLocation, setSelectedLocation] = useState<LocationId | null>(null)

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
            All new tattoos start with a consultation. Select your preferred location,
            then choose a time that works for you.
          </p>
        </div>

        {/* Location selector */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          {LOCATIONS.map((loc) => {
            const isActive = selectedLocation === loc.id
            return (
              <button
                key={loc.id}
                onClick={() => setSelectedLocation(loc.id)}
                className={`group flex items-start gap-3 px-8 py-5 border transition-all duration-300 min-w-55 cursor-pointer text-left ${
                  isActive
                    ? 'border-gold bg-gold/10 text-text'
                    : 'border-gold/30 hover:border-gold/70 text-text hover:bg-gold/5'
                }`}
              >
                <MapPin
                  size={16}
                  strokeWidth={1.5}
                  className={`shrink-0 mt-0.5 transition-colors duration-300 ${isActive ? 'text-gold' : 'text-gold/50 group-hover:text-gold'}`}
                />
                <span className="flex flex-col gap-1">
                  <span className="font-body text-sm tracking-widest uppercase">
                    {loc.label},{' '}
                    <span className={`transition-colors duration-300 ${isActive ? 'text-gold' : 'text-gold/50 group-hover:text-gold'}`}>
                      {loc.state}
                    </span>
                  </span>
                  <span className={`font-body text-xs transition-colors duration-300 normal-case tracking-wide ${isActive ? 'text-text-muted' : 'text-text-muted/50 group-hover:text-text-muted'}`}>
                    {loc.address}
                  </span>
                </span>
              </button>
            )
          })}
        </div>

        {/* Calendar area */}
        {selectedLocation ? (
          <div className="border border-border overflow-hidden">
            {/* TODO: Replace with Cal.com embed for the selected location */}
            {/* <Cal namespace={selectedLocation} calLink={`gabe-munoz/${selectedLocation}-consultation`} ... /> */}
            <div className="flex flex-col items-center justify-center gap-4 py-24 text-center bg-surface">
              <MapPin size={28} strokeWidth={1} className="text-gold/40" />
              {(() => {
                const loc = LOCATIONS.find((l) => l.id === selectedLocation)
                return (
                  <>
                    <p className="font-body text-xs tracking-[0.3em] uppercase text-gold/60">
                      {loc?.label}, {loc?.state}
                    </p>
                    <p className="font-body text-text-muted text-xs">{loc?.address}</p>
                    <p className="font-body text-text-muted/50 text-sm mt-2">
                      Calendar coming soon
                    </p>
                  </>
                )
              })()}
            </div>
          </div>
        ) : (
          <div className="border border-border/40 border-dashed flex items-center justify-center py-24 bg-surface/40">
            <p className="font-body text-xs tracking-[0.3em] uppercase text-text-muted/50">
              Select a location above
            </p>
          </div>
        )}
      </SectionWrapper>
    </div>
  )
}
