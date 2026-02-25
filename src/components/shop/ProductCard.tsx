import { Link } from '@tanstack/react-router'
import { type Product, formatPrice } from '@/lib/products'

const categoryLabels: Record<string, string> = {
  print: 'Print',
  sticker: 'Sticker',
  apparel: 'Apparel',
  pin: 'Pin',
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      to="/shop/$productId"
      params={{ productId: product.id }}
      className="group block bg-surface border border-border hover:border-gold/40 transition-all duration-300"
    >
      {/* Image */}
      <div className="aspect-square overflow-hidden bg-surface-alt">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Info */}
      <div className="p-5">
        <span className="font-body text-[10px] tracking-[0.3em] uppercase text-gold/70">
          {categoryLabels[product.category]}
        </span>
        <h3 className="font-display text-sm font-semibold text-text uppercase tracking-wide mt-1 mb-2">
          {product.name}
        </h3>
        <div className="flex items-center justify-between">
          <span className="font-body text-gold text-sm font-medium">
            {formatPrice(product.price)}
          </span>
          {!product.available && (
            <span className="font-body text-[10px] tracking-widest uppercase text-text-muted/50">
              Sold Out
            </span>
          )}
          {product.variants && product.available && (
            <span className="font-body text-[10px] tracking-widest uppercase text-text-muted/50">
              Multiple sizes
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
