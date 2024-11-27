import { Handler } from '@netlify/functions';
import Stripe from 'stripe';
import { FormType, RegisterFormSoloState, Shirt, StripeMetadata } from "../../../src/features/register/models";
import { oreToSek, shirtStringToArray } from '../../../src/features/register/utils';
import { writeToSpreadsheet } from './writeToSpreadsheet';

const stripe = new Stripe(process.env.STRIPE_SECRET as string, {
  apiVersion: '2024-10-28.acacia',
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

export const handler: Handler = async (event) => {

  if (!event.body || !event.headers['stripe-signature']) {
    return { statusCode: 400, body: 'Invalid webhook request' };
  }

  let stripeEvent: Stripe.Event;

  try {
    stripeEvent = stripe.webhooks.constructEvent(
      event.body,
      event.headers['stripe-signature'],
      endpointSecret
    );
  } catch (error) {
    console.error('Webhook signature verification failed', error);
    return { statusCode: 400, body: 'Webhook Error: Signature verification failed' };
  }

  if (stripeEvent.type === 'checkout.session.completed') {
    const session = stripeEvent.data.object as Stripe.Checkout.Session;
    if (session.metadata == null) {
      console.log("something went wrong with the data when being sent")
      return { statusCode: 400, body: 'Någon hund blev begraven någonstans' };
    }

    const metadata: StripeMetadata = session.metadata as unknown as StripeMetadata;

    const totalInOre = session.amount_total || 0;

    writeToSpreadsheet(metadata, oreToSek(totalInOre))

    console.log('Payment successfull! Webhook works fine!', session.id);
  }

  return { statusCode: 200, body: JSON.stringify({ received: true }) };

}
