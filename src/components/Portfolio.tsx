import { SectionWrapper } from './ui/SectionWrapper'

interface GalleryImage {
  src: string
  alt: string
}

// TODO: Replace with actual photo filenames placed in public/portfolio/
const images: GalleryImage[] = [
  { src: '/portfolio/01.jpg', alt: 'Traditional tattoo' },
  { src: '/portfolio/02.jpg', alt: 'Neo-traditional tattoo' },
  { src: '/portfolio/03.jpg', alt: 'Traditional tattoo' },
  { src: '/portfolio/04.jpg', alt: 'Neo-traditional tattoo' },
  { src: '/portfolio/05.jpg', alt: 'Traditional tattoo' },
  { src: '/portfolio/06.jpg', alt: 'Neo-traditional tattoo' },
  { src: '/portfolio/07.jpg', alt: 'Traditional tattoo' },
  { src: '/portfolio/08.jpg', alt: 'Neo-traditional tattoo' },
  { src: '/portfolio/09.jpg', alt: 'Traditional tattoo' },
]

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

        {/* Masonry gallery — CSS columns */}
        <div className="columns-2 md:columns-3 gap-3">
          {images.map((image) => (
            <div
              key={image.src}
              className="break-inside-avoid mb-3 group relative overflow-hidden"
            >
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className="w-full block object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </SectionWrapper>
    </div>
  )
}
