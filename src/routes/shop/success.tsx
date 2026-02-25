import { useEffect } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { CheckCircle } from 'lucide-react'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { useCart } from '@/context/CartContext'

export const Route = createFileRoute('/shop/success')({
  validateSearch: (search) => ({
    session_id: typeof search.session_id === 'string' ? search.session_id : undefined,
  }),
  component: SuccessPage,
})

function SuccessPage() {
  const { clearCart } = useCart()

  useEffect(() => {
    clearCart()
  }, [])

  return (
    <div className="bg-bg min-h-screen">
      <Nav />
      <main className="pt-16">
        <div className="bg-surface-alt">
          <SectionWrapper>
            <div className="flex flex-col items-center justify-center py-20 text-center gap-6 max-w-lg mx-auto">
              <CheckCircle size={56} strokeWidth={1} className="text-gold" />

              <div>
                <p className="font-body text-gold text-xs tracking-[0.3em] uppercase mb-4">
                  Payment Confirmed
                </p>
                <h1 className="font-display text-4xl md:text-5xl font-bold text-text uppercase tracking-wide">
                  Order Confirmed
                </h1>
              </div>

              <div className="flex items-center justify-center gap-3">
                <span className="h-px w-10 bg-gold/40" />
                <span className="text-gold/40 text-xs">✦</span>
                <span className="h-px w-10 bg-gold/40" />
              </div>

              <p className="font-body text-text-muted text-sm leading-relaxed">
                Thank you for your order. Gabe will be in touch shortly with
                shipping details and a tracking number.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto">
                <Link
                  to="/shop"
                  className="inline-block border border-gold text-gold font-body text-sm font-medium tracking-widest uppercase px-8 py-3 hover:bg-gold hover:text-bg transition-all duration-200 text-center"
                >
                  Back to Shop
                </Link>
                <Link
                  to="/"
                  className="inline-block bg-gold text-bg font-body text-sm font-medium tracking-widest uppercase px-8 py-3 hover:bg-gold-light transition-colors duration-200 text-center"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </SectionWrapper>
        </div>
      </main>
      <Footer />
    </div>
  )
}
