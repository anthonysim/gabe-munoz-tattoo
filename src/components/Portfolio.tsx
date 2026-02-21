import { SectionWrapper } from './ui/SectionWrapper'

interface GalleryImage {
  src: string
  alt: string
}

const images: GalleryImage[] = Array.from({ length: 33 }, (_, i) => ({
  src: `/portfolio/${String(i + 1).padStart(2, '0')}.jpg`,
  alt: 'Tattoo by Gabe Muñoz',
}))

export function Portfolio() {
  return (
    <div className="bg-surface-alt">
      <SectionWrapper>
        {/* Section header */}
        <div className="text-center mb-14">
          <p className="font-body text-gold text-xs tracking-[0.3em] uppercase mb-4">
            The Work
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-text uppercase tracking-wide">
            Portfolio
          </h2>
          <div className="flex items-center justify-center gap-3 mt-6">
            <span className="h-px w-10 bg-gold/40" />
            <span className="text-gold/40 text-xs">✦</span>
            <span className="h-px w-10 bg-gold/40" />
          </div>
        </div>

        {/* Bento grid */}
        <div
          className="grid grid-cols-2 md:grid-cols-3 gap-2 grid-flow-dense"
          style={{ gridAutoRows: '220px' }}
        >
          {images.map((image, index) => {
            const isFeatured = index % 7 === 0
            return (
              <div
                key={image.src}
                className={`group relative overflow-hidden ${isFeatured ? 'col-span-2 row-span-2' : ''}`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gold/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            )
          })}
        </div>
      </SectionWrapper>
    </div>
  )
}
