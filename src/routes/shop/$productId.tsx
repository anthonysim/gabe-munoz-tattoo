import { useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { getProductById, formatPrice } from '@/lib/products'
import { useCart } from '@/context/CartContext'

export const Route = createFileRoute('/shop/$productId')({ component: ProductDetailPage })

const categoryLabels: Record<string, string> = {
  print: 'Print',
  sticker: 'Sticker',
  apparel: 'Apparel',
}

function ProductDetailPage() {
  const { productId } = Route.useParams()
  const { addItem, openCart } = useCart()

  const product = getProductById(productId)

  const [selectedVariant, setSelectedVariant] = useState<string | null>(
    product?.variants?.[0]?.value ?? null,
  )
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  if (!product) {
    return (
      <div className="bg-bg min-h-screen">
        <Nav />
        <main className="pt-16">
          <SectionWrapper>
            <div className="flex flex-col items-center justify-center py-32 gap-6 text-center">
              <p className="font-body text-xs tracking-[0.3em] uppercase text-text-muted/50">
                Product not found
              </p>
              <Link
                to="/shop"
                className="font-body text-xs tracking-widest uppercase text-gold hover:text-gold-light transition-colors duration-200"
              >
                ← Back to Shop
              </Link>
            </div>
          </SectionWrapper>
        </main>
        <Footer />
      </div>
    )
  }

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      quantity,
      variant: selectedVariant ?? undefined,
    })
    setAdded(true)
    openCart()
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="bg-bg min-h-screen">
      <Nav />
      <main className="pt-16">
        <div className="bg-surface-alt">
          <SectionWrapper>
            {/* Back link */}
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 font-body text-xs tracking-widest uppercase text-text-muted hover:text-gold transition-colors duration-200 mb-10"
            >
              <ArrowLeft size={12} />
              Back to Shop
            </Link>

            {/* Product layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
              {/* Image */}
              <div className="aspect-square overflow-hidden bg-surface">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Details */}
              <div className="flex flex-col justify-center">
                <span className="font-body text-[10px] tracking-[0.3em] uppercase text-gold/70 mb-2">
                  {categoryLabels[product.category]}
                </span>
                <h1 className="font-display text-3xl md:text-4xl font-bold text-text uppercase tracking-wide mb-4">
                  {product.name}
                </h1>
                <p className="font-body text-2xl text-gold mb-6">
                  {formatPrice(product.price)}
                </p>
                <p className="font-body text-sm text-text-muted leading-relaxed mb-8">
                  {product.description}
                </p>

                {/* Variant selector */}
                {product.variants && (
                  <div className="mb-6">
                    <p className="font-body text-xs tracking-widest uppercase text-text-muted mb-3">
                      Size
                    </p>
                    <div className="flex gap-2">
                      {product.variants.map((v) => (
                        <button
                          key={v.value}
                          onClick={() => setSelectedVariant(v.value)}
                          className={`w-10 h-10 font-body text-xs tracking-widest uppercase border transition-all duration-200 cursor-pointer ${
                            selectedVariant === v.value
                              ? 'border-gold text-gold bg-gold/10'
                              : 'border-border text-text-muted hover:border-gold/50 hover:text-gold'
                          }`}
                        >
                          {v.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity selector */}
                <div className="mb-8">
                  <p className="font-body text-xs tracking-widest uppercase text-text-muted mb-3">
                    Quantity
                  </p>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-10 h-10 flex items-center justify-center border border-border text-text-muted hover:border-gold/50 hover:text-gold transition-colors duration-200 cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="font-body text-sm text-text w-6 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="w-10 h-10 flex items-center justify-center border border-border text-text-muted hover:border-gold/50 hover:text-gold transition-colors duration-200 cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Add to cart */}
                <button
                  onClick={handleAddToCart}
                  disabled={!product.available}
                  className="w-full bg-gold text-bg font-body text-sm font-medium tracking-widest uppercase py-4 hover:bg-gold-light transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  {!product.available
                    ? 'Sold Out'
                    : added
                      ? 'Added!'
                      : 'Add to Cart'}
                </button>
              </div>
            </div>
          </SectionWrapper>
        </div>
      </main>
      <Footer />
    </div>
  )
}
