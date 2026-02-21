export function About() {
  return (
    <div className="min-h-screen flex items-center px-6 md:px-12 py-20">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
        {/* Photo */}
        <div className="relative w-fit mx-auto">
          <div className="border border-gold/30 overflow-hidden">
            <img
              src="/gabe.jpg"
              alt="Gabe Muñoz, tattoo artist"
              className="max-h-[75vh] w-auto block"
            />
          </div>
          {/* Decorative offset border */}
          <div className="absolute -bottom-4 -right-4 w-full h-full border border-gold/15 -z-10" />
        </div>

        {/* Bio */}
        <div>
          <p className="font-body text-gold text-xs tracking-[0.3em] uppercase mb-4">
            About the Artist
          </p>

          <h2 className="font-display text-4xl md:text-5xl font-bold text-text uppercase tracking-wide leading-tight mb-6">
            Gabe Muñoz
          </h2>

          {/* Gold separator */}
          <div className="flex items-center gap-3 mb-8">
            <span className="h-px w-10 bg-gold/50" />
            <span className="text-gold/50 text-xs">✦</span>
          </div>

          <div className="space-y-5 text-text-muted font-body text-base leading-relaxed">
            <p>
              With a deep respect for the history and craft of tattooing, Gabe
              Muñoz specializes in traditional and neo-traditional work — bold
              outlines, rich saturation, and timeless imagery that holds up for
              decades.
            </p>
            <p>
              Every piece is designed custom for the individual. Whether it's a
              classic American traditional eagle, a neo-trad floral sleeve, or a
              bold Japanese-inspired composition, Gabe brings the same
              dedication to linework and color theory that defines lasting
              tattoos.
            </p>
            <p>
              Based out of{' '}
              <span className="text-text">
                <strong>Fullerton, CA</strong>
              </span>
              , Gabe takes a limited number of appointments each month to ensure
              each client receives his full attention.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
