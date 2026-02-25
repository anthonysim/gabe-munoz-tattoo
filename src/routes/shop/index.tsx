import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { ProductCard } from '@/components/shop/ProductCard'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { products, type ProductCategory } from '@/lib/products'

export const Route = createFileRoute('/shop/')({ component: ShopPage })

type FilterCategory = ProductCategory | 'all'

const filters: { label: string; value: FilterCategory }[] = [
  { label: 'All', value: 'all' },
  { label: 'Apparel', value: 'apparel' },
  { label: 'Stickers', value: 'sticker' },
  { label: 'Pins', value: 'pin' },
  { label: 'Art', value: 'print' },
]

function ShopPage() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all')

  const filtered =
    activeFilter === 'all' ? products : products.filter((p) => p.category === activeFilter)

  return (
    <div className="bg-bg min-h-screen">
      <Nav />
      <main className="pt-16">
        <div className="bg-surface-alt">
          <SectionWrapper>
            {/* Section header */}
            <div className="text-center mb-12">
              <p className="font-body text-gold text-xs tracking-[0.3em] uppercase mb-4">
                Gabe Muñoz
              </p>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-text uppercase tracking-wide">
                Shop
              </h1>
              <div className="flex items-center justify-center gap-3 mt-6 mb-6">
                <span className="h-px w-10 bg-gold/40" />
                <span className="text-gold/40 text-xs">✦</span>
                <span className="h-px w-10 bg-gold/40" />
              </div>
              <p className="font-body text-text-muted text-sm max-w-md mx-auto leading-relaxed">
                Original art prints, flash stickers, and apparel. Each piece ships
                directly from Gabe.
              </p>
            </div>

            {/* Category filters */}
            <div className="flex items-center justify-center gap-6 mb-12">
              {filters.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setActiveFilter(f.value)}
                  className={`font-body text-xs tracking-widest uppercase pb-1 transition-colors duration-200 cursor-pointer ${
                    activeFilter === f.value
                      ? 'text-gold border-b border-gold'
                      : 'text-text-muted hover:text-gold'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Product grid */}
            {activeFilter === 'print' ? (
              <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
                <div className="flex items-center gap-3">
                  <span className="h-px w-10 bg-gold/40" />
                  <span className="text-gold/40 text-xs">✦</span>
                  <span className="h-px w-10 bg-gold/40" />
                </div>
                <p className="font-display text-lg font-semibold text-text uppercase tracking-widest">
                  Coming Soon
                </p>
                <p className="font-body text-xs text-text-muted/60 max-w-xs leading-relaxed">
                  Original art prints are on the way. Check back soon.
                </p>
              </div>
            ) : filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center py-24">
                <p className="font-body text-xs tracking-[0.3em] uppercase text-text-muted/50">
                  No products in this category
                </p>
              </div>
            )}
          </SectionWrapper>
        </div>
      </main>
      <Footer />
    </div>
  )
}
