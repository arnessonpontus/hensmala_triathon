import { Handler } from '@netlify/functions';
import Stripe from 'stripe';
import { BaseOrderType, CartItem, FormType, RegisterFormSoloState, RegisterFormTeamState } from '../../../src/features/register/models';
import { createExtraDonationPurchaseItem, toMetaData } from '../utils/paymentUtil';
import { MetadataParam } from '@stripe/stripe-js';
import { getNodeEnvVariable } from '../utils/envUtil';
import { validateFormCart, validateFormData } from './validation';

const stripe = new Stripe(getNodeEnvVariable("STRIPE_SECRET"), {
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

  if (getNodeEnvVariable("VITE_ALLOW_REGISTRATION") !== "true") {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Registration is now allowed at the moment.' })
    };
  }

  // Handle POST request for payment creation
  try {
    const { formType, formData, cartData } = JSON.parse(event.body || '{}') as {formType: FormType, formData: RegisterFormSoloState | RegisterFormTeamState | BaseOrderType, cartData: CartItem[]};

    const { error: errorForm } = validateFormData(formData, formType);
    const { error: errorCart } = validateFormCart(cartData);
    
    if (errorForm || errorCart) {
      return {
        statusCode: 400,
        body: JSON.stringify({ errors: errorForm ? errorForm.details : errorCart?.details })
      };
    }
    
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

    cartData.forEach(d => lineItems.push({price: d.default_price?.id, quantity: d.quantity}))

    if (formData.extraDonation > 0) {
      lineItems.push(...createExtraDonationPurchaseItem(formData.extraDonation));
    }

    const metadata = toMetaData(formType, formData, cartData);

    console.log("Processing metadata: ", metadata)

    const session = await stripe.checkout.sessions.create({
      metadata: metadata as unknown as MetadataParam,
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${getNodeEnvVariable("CLIENT_URL")}/payment-success`,
      cancel_url: `${getNodeEnvVariable("CLIENT_URL")}/payment-cancelled`,
      discounts: formData.coupon ? [{ coupon: formData.coupon.id }] : [],
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ id: session.id }),
    };

  } catch (error) {
    console.error('Error processing payment:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};
