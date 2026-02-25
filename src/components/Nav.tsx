import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Menu, X, ShoppingBag } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { CartDrawer } from '@/components/shop/CartDrawer'

const navLinks = [
  { label: 'About', href: '/#about' },
  { label: 'Tattoos', href: '/#portfolio' },
  { label: 'Art', href: '/#art' },
  { label: 'Services', href: '/#services' },
  { label: 'Book', href: '/#booking' },
]

export function Nav() {
  const [isOpen, setIsOpen] = useState(false)
  const { openCart, totalItems } = useCart()

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-bg/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-16">
          {/* Wordmark */}
          <a
            href="/"
            className="font-display text-gold text-sm tracking-[0.2em] uppercase font-semibold"
          >
            Gabe Muñoz
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="font-body text-xs tracking-widest uppercase text-text-muted hover:text-gold transition-colors duration-200"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop right: Shop + Cart */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/shop"
              className="font-body text-xs tracking-widest uppercase text-text-muted hover:text-gold transition-colors duration-200"
            >
              Shop
            </Link>
            <button
              onClick={openCart}
              className="relative text-text-muted hover:text-gold transition-colors duration-200 cursor-pointer"
              aria-label="Open cart"
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-gold text-bg text-[10px] font-body font-semibold rounded-full w-4 h-4 flex items-center justify-center leading-none">
                  {totalItems > 9 ? '9+' : totalItems}
                </span>
              )}
            </button>
          </div>

          {/* Mobile: cart icon + hamburger */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={openCart}
              className="relative text-text-muted hover:text-gold transition-colors duration-200 cursor-pointer"
              aria-label="Open cart"
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-gold text-bg text-[10px] font-body font-semibold rounded-full w-4 h-4 flex items-center justify-center leading-none">
                  {totalItems > 9 ? '9+' : totalItems}
                </span>
              )}
            </button>
            <button
              className="text-text-muted hover:text-gold transition-colors duration-200 cursor-pointer"
              onClick={() => setIsOpen((prev) => !prev)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden bg-surface border-t border-border">
            <ul className="flex flex-col py-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block px-6 py-3 font-body text-xs tracking-widest uppercase text-text-muted hover:text-gold transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <Link
                  to="/shop"
                  onClick={() => setIsOpen(false)}
                  className="block px-6 py-3 font-body text-xs tracking-widest uppercase text-text-muted hover:text-gold transition-colors duration-200"
                >
                  Shop
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>

      <CartDrawer />
    </>
  )
}
