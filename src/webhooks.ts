import express from 'express'
import { WebhookRequest } from '@/server'
import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'

export const stripeWebhookHandler = async (
  req: express.Request,
  res: express.Response,
) => {
  const webhookRequest = req as unknown as WebhookRequest
  const body = webhookRequest.rawBody
  const signature = req.headers['stripe-signature'] || ''

  let event
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || '',
    )
  } catch (err) {
    return res
      .status(400)
      .send(
        `Webhook Error: ${err instanceof Error ? err.message : 'Unknown error'}`,
      )
  }

  const session = event.data.object as Stripe.Checkout.Session

  if (!session?.metadata?.userId || !session.metadata.orderId) {
    return res.status(400).send('Webhook Error: No user present in metadata')
  }
}
