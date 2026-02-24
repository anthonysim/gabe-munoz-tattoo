import { useState, useEffect, useCallback, useRef } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

const images = Array.from({ length: 14 }, (_, i) => ({
  src: `/art/${String(i + 1).padStart(2, '0')}.jpg`,
  alt: `Art piece ${i + 1}`,
}))

export function Art() {
  const [selected, setSelected] = useState<number | null>(null)
  const touchStartX = useRef<number | null>(null)
  const touchStartTime = useRef<number>(0)
  const stripRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const liveIndexRef = useRef<number>(0)

  const open = (i: number) => {
    liveIndexRef.current = i
    setSelected(i)
  }
  const close = () => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setSelected(null)
  }

  const navigate = useCallback((direction: 'prev' | 'next') => {
    setSelected((s) => {
      if (s === null) return null
      return direction === 'next'
        ? (s + 1) % images.length
        : (s - 1 + images.length) % images.length
    })
  }, [])

  const prev = useCallback(() => navigate('prev'), [navigate])
  const next = useCallback(() => navigate('next'), [navigate])

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

  useEffect(() => {
    document.body.style.overflow = selected !== null ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [selected])

  const setStrip = (x: number, animate: boolean, duration = 250) => {
    if (!stripRef.current) return
    stripRef.current.style.transition = animate
      ? `transform ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`
      : 'none'
    stripRef.current.style.transform = `translateX(${x}px)`
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
      setSelected(liveIndexRef.current)
      setStrip(0, false)
    }
    touchStartX.current = e.touches[0].clientX
    touchStartTime.current = Date.now()
    setStrip(0, false)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    setStrip(e.touches[0].clientX - touchStartX.current, false)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || selected === null) return
    const diff = touchStartX.current - e.changedTouches[0].clientX
    const velocity = Math.abs(diff) / (Date.now() - touchStartTime.current)

    const isFastSwipe = velocity > 0.4
    const isFarEnough = Math.abs(diff) > 60

    if (isFastSwipe || isFarEnough) {
      const isNext = diff > 0
      const newIndex = isNext
        ? (liveIndexRef.current + 1) % images.length
        : (liveIndexRef.current - 1 + images.length) % images.length

      liveIndexRef.current = newIndex

      const duration = isFastSwipe ? 150 : 250
      setStrip(isNext ? -window.innerWidth : window.innerWidth, true, duration)

      timeoutRef.current = setTimeout(() => {
        timeoutRef.current = null
        setSelected(newIndex)
        setStrip(0, false)
      }, duration)
    } else {
      setStrip(0, true)
    }

    touchStartX.current = null
  }

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
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center overflow-hidden"
          onClick={close}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Close */}
          <button
            onClick={close}
            className="absolute top-5 right-5 text-text-muted hover:text-gold transition-colors duration-200 z-10"
            aria-label="Close"
          >
            <X size={28} strokeWidth={1.5} />
          </button>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); prev() }}
            className="absolute left-4 md:left-8 text-text-muted hover:text-gold transition-colors duration-200 z-10"
            aria-label="Previous"
          >
            <ChevronLeft size={36} strokeWidth={1.5} />
          </button>

          {/* Three-image strip: [prev | current | next] */}
          <div
            ref={stripRef}
            className="absolute top-0 flex"
            style={{ width: '300vw', left: '-100vw', height: '100%' }}
            onClick={(e) => e.stopPropagation()}
          >
            {[
              (selected - 1 + images.length) % images.length,
              selected,
              (selected + 1) % images.length,
            ].map((imgIdx, slot) => (
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
            onClick={(e) => { e.stopPropagation(); next() }}
            className="absolute right-4 md:right-8 text-text-muted hover:text-gold transition-colors duration-200 z-10"
            aria-label="Next"
          >
            <ChevronRight size={36} strokeWidth={1.5} />
          </button>

          {/* Counter */}
          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 font-body text-xs tracking-widest text-text-muted">
            {selected + 1} / {images.length}
          </p>
        </div>
      )}
    </div>
  )
}
