import { createContext, useContext, useEffect, useState } from 'react'

export const CART_STORAGE_KEY = 'gabe-munoz-cart'

export interface CartItem {
  productId: string
  quantity: number
  variant?: string
}

interface CartContextValue {
  items: CartItem[]
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
  addItem: (item: CartItem) => void
  removeItem: (productId: string, variant?: string) => void
  updateQuantity: (productId: string, quantity: number, variant?: string) => void
  clearCart: () => void
  totalItems: number
}

const CartContext = createContext<CartContextValue | null>(null)

function readCart(): CartItem[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY)
    return raw ? (JSON.parse(raw) as CartItem[]) : []
  } catch {
    return []
  }
}

function itemKey(productId: string, variant?: string): string {
  return `${productId}::${variant ?? ''}`
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(readCart)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const openCart = () => setIsOpen(true)
  const closeCart = () => setIsOpen(false)

  const addItem = (incoming: CartItem) => {
    setItems((prev) => {
      const key = itemKey(incoming.productId, incoming.variant)
      const existing = prev.find(
        (i) => itemKey(i.productId, i.variant) === key,
      )
      if (existing) {
        return prev.map((i) =>
          itemKey(i.productId, i.variant) === key
            ? { ...i, quantity: i.quantity + incoming.quantity }
            : i,
        )
      }
      return [...prev, incoming]
    })
  }

  const removeItem = (productId: string, variant?: string) => {
    const key = itemKey(productId, variant)
    setItems((prev) => prev.filter((i) => itemKey(i.productId, i.variant) !== key))
  }

  const updateQuantity = (productId: string, quantity: number, variant?: string) => {
    const key = itemKey(productId, variant)
    if (quantity <= 0) {
      removeItem(productId, variant)
      return
    }
    setItems((prev) =>
      prev.map((i) => (itemKey(i.productId, i.variant) === key ? { ...i, quantity } : i)),
    )
  }

  const clearCart = () => setItems([])

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        openCart,
        closeCart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
