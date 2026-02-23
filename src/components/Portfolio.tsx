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
  const touchStartTime = useRef<number>(0)
  const stripRef = useRef<HTMLDivElement>(null)

  const openModal = (index: number) => setSelectedIndex(index)
  const closeModal = () => setSelectedIndex(null)

  const navigate = (direction: 'prev' | 'next') => {
    setSelectedIndex((i) => {
      if (i === null) return null
      return direction === 'next'
        ? (i + 1) % images.length
        : (i - 1 + images.length) % images.length
    })
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') navigate('prev')
    else if (e.key === 'ArrowRight') navigate('next')
    else if (e.key === 'Escape') closeModal()
  }

  // Strip: [prev | current | next], starts offset so current is visible
  // marginLeft: -100vw centers the strip on the "current" slot
  // translateX moves the whole strip so adjacent images come into view

  const setStrip = (x: number, animate: boolean, duration = 250) => {
    if (!stripRef.current) return
    stripRef.current.style.transition = animate
      ? `transform ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`
      : 'none'
    stripRef.current.style.transform = `translateX(${x}px)`
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchStartTime.current = Date.now()
    setStrip(0, false)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    // Move strip with finger — adjacent image naturally follows
    setStrip(e.touches[0].clientX - touchStartX.current, false)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || selectedIndex === null) return
    const diff = touchStartX.current - e.changedTouches[0].clientX
    const velocity = Math.abs(diff) / (Date.now() - touchStartTime.current)

    const isFastSwipe = velocity > 0.4
    const isFarEnough = Math.abs(diff) > 60

    if (isFastSwipe || isFarEnough) {
      const isNext = diff > 0
      const newIndex = isNext
        ? (selectedIndex + 1) % images.length
        : (selectedIndex - 1 + images.length) % images.length

      // Animate strip to the adjacent slot, then update state and snap back
      const duration = isFastSwipe ? 150 : 250
      setStrip(isNext ? -window.innerWidth : window.innerWidth, true, duration)

      setTimeout(() => {
        setSelectedIndex(newIndex)
        setStrip(0, false)
      }, duration)
    } else {
      // Not far enough — snap back to center
      setStrip(0, true)
    }

    touchStartX.current = null
  }

  const prevIndex = selectedIndex !== null
    ? (selectedIndex - 1 + images.length) % images.length
    : 0
  const nextIndex = selectedIndex !== null
    ? (selectedIndex + 1) % images.length
    : 0

  return (
    <div className="bg-surface-alt">
      <SectionWrapper>
        {/* Section header */}
        <div className="text-center mb-14">
          <p className="font-body text-gold text-xs tracking-[0.3em] uppercase mb-4">
            The Work
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-text uppercase tracking-wide">
            Tattoos
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
                <div className="absolute inset-0 bg-gold/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            )
          })}
        </div>
      </SectionWrapper>

      {/* Lightbox modal */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 overflow-hidden"
          onClick={closeModal}
          onKeyDown={handleKeyDown}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          tabIndex={-1}
        >
          {/* Close */}
          <button
            onClick={closeModal}
            className="absolute top-5 right-5 text-text-muted hover:text-gold transition-colors duration-200 z-10"
            aria-label="Close"
          >
            <X size={28} strokeWidth={1.5} />
          </button>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); navigate('prev') }}
            className="absolute left-4 md:left-8 text-text-muted hover:text-gold transition-colors duration-200 z-10"
            aria-label="Previous image"
          >
            <ChevronLeft size={36} strokeWidth={1.5} />
          </button>

          {/*
            Three-image strip: [prev | current | next]
            Width is 300vw; marginLeft shifts it so "current" (the middle slot) is centered.
            Dragging translateX moves the whole strip — the adjacent image scrolls in naturally.
          */}
          <div
            ref={stripRef}
            className="absolute top-0 flex"
            style={{ width: '300vw', left: '-100vw', height: '100%' }}
            onClick={(e) => e.stopPropagation()}
          >
            {[prevIndex, selectedIndex, nextIndex].map((imgIdx, slot) => (
              <div
                key={slot}
                className="shrink-0 flex items-center justify-center"
                style={{ width: '100vw', height: '100vh' }}
              >
                <img
                  src={images[imgIdx].src}
                  alt={images[imgIdx].alt}
                  className="max-h-[90vh] max-w-[90vw] object-contain"
                />
              </div>
            ))}
          </div>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); navigate('next') }}
            className="absolute right-4 md:right-8 text-text-muted hover:text-gold transition-colors duration-200 z-10"
            aria-label="Next image"
          >
            <ChevronRight size={36} strokeWidth={1.5} />
          </button>

          {/* Counter */}
          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 font-body text-xs text-text-muted tracking-widest">
            {selectedIndex + 1} / {images.length}
          </p>
        </div>
      )}
    </div>
  )
}
