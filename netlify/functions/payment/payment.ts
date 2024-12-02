import { Handler } from '@netlify/functions';
import Stripe from 'stripe';
import { getPriceId } from '../utils/pricing';
import { FormType, StripeMetadata } from '../../../src/features/register/models';
import { shirtArrayToString } from '../../../src/features/register/utils';
import { birthdayToString, createCapPurchaseItems, createRegistrationPurchaseItem, createShirtPurchaseItems } from '../utils/paymentUtil';
import { MetadataParam } from '@stripe/stripe-js';

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
  //#TODO Vi måste validera mer så att vi vet mer om betalning går igenom men det funkar inte för nån anledning med mail eller skriva i excel. 
  /*
  if (!(process.env.VITE_ALLOW_REGISTRATION === "true")) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Registration is now allowed at the moment.' })
    };
  }
*/
  // Handle POST request for payment creation
  try {
    const { formType, formData } = JSON.parse(event.body || '{}');
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

    lineItems.push(...createRegistrationPurchaseItem(formType));

    if (Array.isArray(formData.shirts)) {
      lineItems.push(...createShirtPurchaseItems(formData.shirts));
    }

    if (typeof formData.numCaps === 'number' && formData.numCaps > 0) {
      lineItems.push(...createCapPurchaseItems(formData.numCaps));
    }

    //Common data for all registrations
    let metadata: StripeMetadata = {
      formType: formType,
      birthday1: birthdayToString(formData.year1, formData.month1, formData.day1),
      shirtsString: shirtArrayToString(formData.shirts),
      name1: formData.name1,
      email1: formData.email1,
      city1: formData.city1,
      gender: formData.gender,
      extraDonation: formData.extraDonation.toString(),
      info: formData.info,
      numCaps: formData.numCaps.toString(),
    }

    if (formType === FormType.Team) {
      metadata = {
        ...metadata,
        teamName: formData.teamName,
        birthday2: birthdayToString(formData.year2, formData.month2, formData.day2),
        birthday3: birthdayToString(formData.year3, formData.month3, formData.day3),
        name2: formData.name2,
        name3: formData.name3,
        email2: formData.email1, //#TODO Assign different emails for other people?
        email3: formData.email1,
        city2: formData.city2,
        city3: formData.city3,
      }
    }
    console.log(metadata)

    const session = await stripe.checkout.sessions.create({
      metadata: metadata as unknown as MetadataParam,
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
    console.log(error);
    return {

      statusCode: 400,
      body: JSON.stringify({ error: error instanceof Error ? error.message : 'An error occurred' }),
    };
  }
};