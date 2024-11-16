import { Handler } from '@netlify/functions';
import Stripe from 'stripe';
import { getPriceId } from './pricing';
import { Shirt } from '../../../src/features/register/models';

const stripe = new Stripe(process.env.STRIPE_SECRET as string, {
  apiVersion: '2024-10-28.acacia',
});

export const handler: Handler = async (event) => {
  // Handle OPTIONS request for CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      body: '',
    };
  }

  // Handle POST request for payment creation
  try {
    const { registrationType, shirts, numCaps } = JSON.parse(event.body || '{}');
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
    const registrationPriceId = getPriceId(registrationType);

    if (registrationPriceId) {
      lineItems.push({
        price: registrationPriceId,
        quantity: 1,
      });
    }

    if (Array.isArray(shirts) && shirts.length > 0) {
      shirts.forEach((shirt: Shirt) => {
        const shirtPriceId = getPriceId(shirt.material);
        if (shirtPriceId) {
          lineItems.push({
            price: shirtPriceId,
            quantity: 1,
          });
        }
      });
    }

    if (typeof numCaps === 'number' && numCaps > 0) {
      const capPriceId = getPriceId("keps")
      if (capPriceId) {
        lineItems.push({
          price: capPriceId,
          quantity: numCaps,
        });
      }
    }

    const session = await stripe.checkout.sessions.create({
      metadata: {
        registrationType,
        shirts: shirts.toString(), // TODO: Send proccessed data
        numCaps: numCaps.toString()
      },
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/payment-success`,
      cancel_url: `${process.env.CLIENT_URL}/payment-cancelled`,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ id: session.id }),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error instanceof Error ? error.message : 'An error occurred' }),
    };
  }
};
