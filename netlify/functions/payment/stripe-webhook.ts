import { Handler } from '@netlify/functions';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET as string, {
    apiVersion: '2024-10-28.acacia',
});

//Du måste lägga till STRIPE_WEBHOOK_SECRET i netlify env pontus.
//Jag la till en webhook på stripe men vet inte om endpointen är correct

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
        console.log('Payment successfull XDDDDDD', session.id);
    }

    return { statusCode: 200, body: JSON.stringify({ received: true }) };

}