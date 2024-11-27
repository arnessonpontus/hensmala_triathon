import { Handler } from '@netlify/functions';
import Stripe from 'stripe';
import { getPriceId } from './pricing';
import { Shirt } from '../../../src/features/register/models';
import { handleBirthday } from '../writeToSpreadsheet/writeToSpreadsheet';
import { shirtArrayToString } from '../../../src/features/register/utils';

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
    const { formType, shirts, numCaps, formData } = JSON.parse(event.body || '{}');
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
    const registrationPriceId = getPriceId(formType);

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


    const birthday = handleBirthday([formData.year, formData.month, formData.day], formData);
    const shirtsString = shirtArrayToString(shirts);
    const session = await stripe.checkout.sessions.create({
      metadata: {
        formType,
        shirtsString: shirtsString, // TODO: Send proccessed data
        numCaps: numCaps.toString(),
        name: formData.name,
        email: formData.email,
        year: formData.year,
        month: formData.month,
        day: formData.day,
        info: formData.info,
        gender: formData.gender,
        city: formData.city,
        extraDonation: formData.extraDonation.toString(),
      },
      payment_method_types: ['card', 'klarna'],
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
