export type ProductCategory = 'print' | 'sticker' | 'apparel'

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
    id: 'art-print-01',
    name: 'Eagle Study — Art Print',
    description:
      'High-quality giclée print on 100lb matte paper. Signed and numbered. Ships flat in protective packaging.',
    price: 4500,
    category: 'print',
    image: '/art/01.jpg',
    available: true,
  },
  {
    id: 'sticker-pack-01',
    name: 'Flash Sticker Pack',
    description:
      'Set of 5 die-cut vinyl stickers featuring original flash designs. Waterproof and UV resistant.',
    price: 1200,
    category: 'sticker',
    image: '/art/02.jpg',
    available: true,
  },
  {
    id: 'hoodie-black',
    name: 'Flash Hoodie — Black',
    description:
      'Premium heavyweight hoodie with original flash print on the chest. 80% cotton / 20% polyester.',
    price: 6500,
    category: 'apparel',
    image: '/art/03.jpg',
    variants: [
      { label: 'S', value: 'sm' },
      { label: 'M', value: 'md' },
      { label: 'L', value: 'lg' },
      { label: 'XL', value: 'xl' },
    ],
    available: true,
  },
  {
    id: 'tee-flash-01',
    name: 'Flash Tee — White',
    description:
      'Soft ringspun cotton tee with original flash design screenprinted on the front.',
    price: 3500,
    category: 'apparel',
    image: '/art/04.jpg',
    variants: [
      { label: 'S', value: 'sm' },
      { label: 'M', value: 'md' },
      { label: 'L', value: 'lg' },
      { label: 'XL', value: 'xl' },
    ],
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
