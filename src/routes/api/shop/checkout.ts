import { createAPIFileRoute } from '@tanstack/react-start/api'
import Stripe from 'stripe'
import { getProductById } from '@/lib/products'

interface CartItem {
  productId: string
  quantity: number
  variant?: string
}

export const APIRoute = createAPIFileRoute('/api/shop/checkout')({
  POST: async ({ request }) => {
    const secretKey = process.env.STRIPE_SECRET_KEY
    if (!secretKey) {
      return Response.json({ error: 'Stripe is not configured' }, { status: 500 })
    }

    const stripe = new Stripe(secretKey, { apiVersion: '2025-01-27.acacia' })

    let body: { items: CartItem[] }
    try {
      body = await request.json()
    } catch {
      return Response.json({ error: 'Invalid request body' }, { status: 400 })
    }

    if (!Array.isArray(body.items) || body.items.length === 0) {
      return Response.json({ error: 'Cart is empty' }, { status: 400 })
    }

    const baseUrl = process.env.PUBLIC_BASE_URL ?? 'http://localhost:3000'

    const lineItems = body.items.flatMap((item) => {
      const product = getProductById(item.productId)
      if (!product || !product.available) return []

      const variantLabel = item.variant
        ? (product.variants?.find((v) => v.value === item.variant)?.label ?? item.variant)
        : null

      const name = variantLabel ? `${product.name} — ${variantLabel}` : product.name

      return [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name,
              images: [`${baseUrl}${product.image}`],
            },
            unit_amount: product.price,
          },
          quantity: item.quantity,
        },
      ]
    })

    if (lineItems.length === 0) {
      return Response.json({ error: 'No valid items in cart' }, { status: 400 })
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems,
      shipping_address_collection: {
        allowed_countries: ['US', 'CA'],
      },
      success_url: `${baseUrl}/shop/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/shop`,
    })

    return Response.json({ url: session.url })
  },
})
