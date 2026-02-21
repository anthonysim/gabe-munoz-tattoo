import { useState, useRef } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
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
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const touchStartX = useRef<number | null>(null)

  const openModal = (index: number) => setSelectedIndex(index)
  const closeModal = () => setSelectedIndex(null)

  const prev = () => {
    if (selectedIndex === null) return
    setSelectedIndex((selectedIndex - 1 + images.length) % images.length)
  }

  const next = () => {
    if (selectedIndex === null) return
    setSelectedIndex((selectedIndex + 1) % images.length)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') prev()
    else if (e.key === 'ArrowRight') next()
    else if (e.key === 'Escape') closeModal()
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) {
      diff > 0 ? next() : prev()
    }
    touchStartX.current = null
  }

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
              <button
                key={image.src}
                onClick={() => openModal(index)}
                className={`group relative overflow-hidden cursor-pointer ${isFeatured ? 'col-span-2 row-span-2' : ''}`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gold/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            )
          })}
        </div>
      </SectionWrapper>

      {/* Lightbox modal */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={closeModal}
          onKeyDown={handleKeyDown}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          tabIndex={-1}
        >
          {/* Close button */}
          <button
            onClick={closeModal}
            className="absolute top-5 right-5 text-text-muted hover:text-gold transition-colors duration-200 z-10"
            aria-label="Close"
          >
            <X size={28} strokeWidth={1.5} />
          </button>

          {/* Prev button */}
          <button
            onClick={(e) => { e.stopPropagation(); prev() }}
            className="absolute left-4 md:left-8 text-text-muted hover:text-gold transition-colors duration-200 z-10"
            aria-label="Previous image"
          >
            <ChevronLeft size={36} strokeWidth={1.5} />
          </button>

          {/* Image */}
          <img
            src={images[selectedIndex].src}
            alt={images[selectedIndex].alt}
            className="max-h-[90vh] max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Next button */}
          <button
            onClick={(e) => { e.stopPropagation(); next() }}
            className="absolute right-4 md:right-8 text-text-muted hover:text-gold transition-colors duration-200 z-10"
            aria-label="Next image"
          >
            <ChevronRight size={36} strokeWidth={1.5} />
          </button>

          {/* Image counter */}
          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 font-body text-xs text-text-muted tracking-widest">
            {selectedIndex + 1} / {images.length}
          </p>
        </div>
      )}
    </div>
  )
}
