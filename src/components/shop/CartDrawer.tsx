import { useState } from 'react'
import { X, Minus, Plus, ShoppingBag } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { getProductById, formatPrice } from '@/lib/products'

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalItems } = useCart()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const subtotal = items.reduce((sum, item) => {
    const product = getProductById(item.productId)
    return sum + (product?.price ?? 0) * item.quantity
  }, 0)

  const handleCheckout = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/shop/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Checkout failed')
      window.location.href = data.url
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setLoading(false)
    }
  }

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
          onClick={closeCart}
        />
      )}

      {/* Drawer panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm z-[70] bg-surface border-l border-border flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <span className="font-display text-sm font-semibold text-text uppercase tracking-widest">
            Your Cart
          </span>
          <button
            onClick={closeCart}
            className="text-text-muted hover:text-gold transition-colors duration-200"
            aria-label="Close cart"
          >
            <X size={18} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <ShoppingBag size={32} strokeWidth={1} className="text-gold/30" />
              <p className="font-body text-xs tracking-widest uppercase text-text-muted/50">
                Your cart is empty
              </p>
            </div>
          ) : (
            <ul className="flex flex-col gap-5">
              {items.map((item) => {
                const product = getProductById(item.productId)
                if (!product) return null
                const variantLabel = product.variants?.find(
                  (v) => v.value === item.variant,
                )?.label
                return (
                  <li
                    key={`${item.productId}::${item.variant ?? ''}`}
                    className="flex gap-4"
                  >
                    {/* Thumbnail */}
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover shrink-0 bg-surface-alt"
                    />

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <p className="font-body text-xs font-medium text-text uppercase tracking-wide truncate">
                        {product.name}
                      </p>
                      {variantLabel && (
                        <p className="font-body text-[10px] text-text-muted/70 uppercase tracking-widest mt-0.5">
                          Size: {variantLabel}
                        </p>
                      )}
                      <p className="font-body text-xs text-gold mt-1">
                        {formatPrice(product.price * item.quantity)}
                      </p>

                      {/* Quantity + Remove */}
                      <div className="flex items-center gap-3 mt-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity - 1, item.variant)
                          }
                          className="w-6 h-6 flex items-center justify-center border border-border text-text-muted hover:border-gold/50 hover:text-gold transition-colors duration-200"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={10} />
                        </button>
                        <span className="font-body text-xs text-text w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity + 1, item.variant)
                          }
                          className="w-6 h-6 flex items-center justify-center border border-border text-text-muted hover:border-gold/50 hover:text-gold transition-colors duration-200"
                          aria-label="Increase quantity"
                        >
                          <Plus size={10} />
                        </button>
                        <button
                          onClick={() => removeItem(item.productId, item.variant)}
                          className="ml-auto font-body text-[10px] tracking-widest uppercase text-text-muted/50 hover:text-gold transition-colors duration-200"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-border space-y-4">
            {error && (
              <p className="font-body text-xs text-red-400 text-center">{error}</p>
            )}
            <div className="flex items-center justify-between">
              <span className="font-body text-xs tracking-widest uppercase text-text-muted">
                Subtotal ({totalItems} {totalItems === 1 ? 'item' : 'items'})
              </span>
              <span className="font-body text-sm font-medium text-text">
                {formatPrice(subtotal)}
              </span>
            </div>
            <p className="font-body text-[10px] text-text-muted/50 text-center">
              Shipping & taxes calculated at checkout
            </p>
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full bg-gold text-bg font-body text-sm font-medium tracking-widest uppercase py-3 hover:bg-gold-light transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? 'Redirecting...' : 'Checkout'}
            </button>
          </div>
        )}
      </div>
    </>
  )
}
