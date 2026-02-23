import { useState, useEffect, useCallback, useRef } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

const images = Array.from({ length: 14 }, (_, i) => ({
  src: `/art/${String(i + 1).padStart(2, '0')}.jpg`,
  alt: `Art piece ${i + 1}`,
}))

export function Art() {
  const [selected, setSelected] = useState<number | null>(null)
  const touchStartX = useRef<number | null>(null)

  const open = (i: number) => setSelected(i)
  const close = () => setSelected(null)

  const prev = useCallback(() => {
    setSelected((s) => (s === null ? null : (s - 1 + images.length) % images.length))
  }, [])

  const next = useCallback(() => {
    setSelected((s) => (s === null ? null : (s + 1) % images.length))
  }, [])

  useEffect(() => {
    if (selected === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      else if (e.key === 'ArrowLeft') prev()
      else if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selected, prev, next])

  return (
    <div className="min-h-screen flex items-center px-6 md:px-12 py-20">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section header */}
        <div className="text-center mb-14">
          <p className="font-body text-gold text-xs tracking-[0.3em] uppercase mb-4">
            On Paper & Canvas
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-text uppercase tracking-wide">
            Art
          </h2>
          <div className="flex items-center justify-center gap-3 mt-6">
            <span className="h-px w-10 bg-gold/40" />
            <span className="text-gold/40 text-xs">✦</span>
            <span className="h-px w-10 bg-gold/40" />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => open(i)}
              className="group aspect-square overflow-hidden bg-surface border border-border hover:border-gold/40 transition-colors duration-300 focus:outline-none cursor-pointer"
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selected !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={close}
        >
          {/* Close */}
          <button
            onClick={close}
            className="absolute top-5 right-5 text-text-muted hover:text-gold transition-colors duration-200 z-10"
            aria-label="Close"
          >
            <X size={24} />
          </button>

          {/* Counter */}
          <span className="absolute top-5 left-1/2 -translate-x-1/2 font-body text-xs tracking-widest text-text-muted">
            {selected + 1} / {images.length}
          </span>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); prev() }}
            className="absolute left-4 md:left-8 text-text-muted hover:text-gold transition-colors duration-200 z-10"
            aria-label="Previous"
          >
            <ChevronLeft size={32} />
          </button>

          {/* Image */}
          <div
            className="max-w-[90vw] max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX }}
            onTouchEnd={(e) => {
              if (touchStartX.current === null) return
              const dx = e.changedTouches[0].clientX - touchStartX.current
              if (Math.abs(dx) > 50) dx < 0 ? next() : prev()
              touchStartX.current = null
            }}
          >
            <img
              key={selected}
              src={images[selected].src}
              alt={images[selected].alt}
              className="max-w-[90vw] max-h-[90vh] object-contain"
            />
          </div>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); next() }}
            className="absolute right-4 md:right-8 text-text-muted hover:text-gold transition-colors duration-200 z-10"
            aria-label="Next"
          >
            <ChevronRight size={32} />
          </button>
        </div>
      )}
    </div>
  )
}
