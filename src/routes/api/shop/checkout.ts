import { createFileRoute } from '@tanstack/react-router'
import Stripe from 'stripe'
import { getProductById } from '@/lib/products'

const MAX_QUANTITY = 99

interface CartItem {
  productId: string
  quantity: number
  variant?: string
}

function isCartItem(value: unknown): value is CartItem {
  if (typeof value !== 'object' || value === null) return false
  const item = value as Record<string, unknown>
  return (
    typeof item.productId === 'string' &&
    Number.isInteger(item.quantity) &&
    (item.quantity as number) >= 1 &&
    (item.quantity as number) <= MAX_QUANTITY &&
    (item.variant === undefined || typeof item.variant === 'string')
  )
}

async function createCheckout(request: Request): Promise<Response> {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const items = (body as { items?: unknown } | null)?.items
  if (!Array.isArray(items) || items.length === 0) {
    return Response.json({ error: 'Cart is empty' }, { status: 400 })
  }
  if (!items.every(isCartItem)) {
    return Response.json(
      { error: `Each item needs a quantity from 1 to ${MAX_QUANTITY}` },
      { status: 400 },
    )
  }

  const secretKey = process.env.STRIPE_SECRET_KEY
  if (!secretKey) {
    return Response.json(
      { error: 'Checkout is not available yet' },
      { status: 503 },
    )
  }

  const baseUrl = process.env.PUBLIC_BASE_URL || new URL(request.url).origin
  const lineItems: Array<Stripe.Checkout.SessionCreateParams.LineItem> = []

  for (const item of items) {
    const product = getProductById(item.productId)
    // The cart can hold products that have since been removed from the shop.
    if (!product || !product.available) continue

    const variant = product.variants?.find((v) => v.value === item.variant)
    if (product.variants && !variant) {
      return Response.json(
        { error: `Choose an option for ${product.name}` },
        { status: 400 },
      )
    }

    lineItems.push({
      price_data: {
        currency: 'usd',
        product_data: {
          name: variant ? `${product.name} — ${variant.label}` : product.name,
          images: [`${baseUrl}${product.image}`],
        },
        unit_amount: product.price,
      },
      quantity: item.quantity,
    })
  }

  if (lineItems.length === 0) {
    return Response.json({ error: 'No valid items in cart' }, { status: 400 })
  }

  try {
    const session = await new Stripe(secretKey).checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems,
      shipping_address_collection: {
        allowed_countries: ['US', 'CA'],
      },
      success_url: `${baseUrl}/shop/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/shop`,
    })
    return Response.json({ url: session.url })
  } catch (error) {
    console.error(
      'Stripe checkout failed',
      error instanceof Error ? error.message : error,
    )
    return Response.json(
      { error: 'Could not start checkout. Please try again.' },
      { status: 502 },
    )
  }
}

export const Route = createFileRoute('/api/shop/checkout')({
  server: {
    handlers: {
      POST: ({ request }) => createCheckout(request),
    },
  },
})
