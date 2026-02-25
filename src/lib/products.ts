export type ProductCategory = 'print' | 'sticker' | 'apparel' | 'pin'

export interface ProductVariant {
  label: string
  value: string
}

export interface Product {
  id: string
  name: string
  description: string
  price: number // in cents, e.g. 2500 = $25.00
  category: ProductCategory
  image: string // path relative to /public
  variants?: ProductVariant[]
  available: boolean
}

export const products: Product[] = [
  {
    id: 'classic-tattoo-tee',
    name: 'Classic Tattoo Tee',
    description:
      'White tee featuring the Classic Tattoo Fullerton, CA design with card suit graphics. 100% cotton.',
    price: 2500,
    category: 'apparel',
    image: '/shop/classic-tee.jpg',
    variants: [
      { label: 'S', value: 'sm' },
      { label: 'M', value: 'md' },
      { label: 'L', value: 'lg' },
      { label: 'XL', value: 'xl' },
    ],
    available: true,
  },
  {
    id: 'pin-skull-heart',
    name: 'Skull Broken Heart — Hard Enamel Pin',
    description:
      'Hard enamel pin featuring the skull broken heart with crossbones design. High-quality finish with butterfly clutch backing.',
    price: 1000,
    category: 'pin',
    image: '/shop/pin-skull-heart.jpg',
    available: true,
  },
  {
    id: 'sticker-panther',
    name: 'Panther Sticker',
    description:
      'Die-cut vinyl sticker featuring a traditional black panther design. Waterproof and UV resistant.',
    price: 300,
    category: 'sticker',
    image: '/shop/sticker-panther.jpg',
    available: true,
  },
  {
    id: 'sticker-coffin-pack',
    name: 'Coffin Sticker Pack',
    description:
      'Pack of 3 die-cut vinyl stickers featuring the coffin heart design. Waterproof and UV resistant.',
    price: 800,
    category: 'sticker',
    image: '/shop/sticker-coffin.jpg',
    available: true,
  },
  {
    id: 'sticker-skull-heart',
    name: 'Skull Broken Heart Sticker',
    description:
      'Die-cut vinyl sticker featuring a skull broken heart with crossbones design. Waterproof and UV resistant.',
    price: 300,
    category: 'sticker',
    image: '/shop/sticker-skull-heart.jpg',
    available: true,
  },
]

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}

export function formatPrice(cents: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(cents / 100)
}
