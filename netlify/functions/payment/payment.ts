import { Handler } from '@netlify/functions';
import Stripe from 'stripe';
import { FormType, StripeMetadata } from '../../../src/features/register/models';
import { shirtArrayToString } from '../../../src/features/register/utils';
import { birthdayToString, createCapPurchaseItems, createExtraDonationPurchaseItem, createRegistrationPurchaseItem, createShirtPurchaseItems } from '../utils/paymentUtil';
import { MetadataParam } from '@stripe/stripe-js';
import { getNodeEnvVariable } from '../utils/envUtil';
import { validateFormData } from './validation';

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
    const { formType, formData } = JSON.parse(event.body || '{}');

    const { error } = validateFormData(formData, formType);
    if (error) {
      return {
        statusCode: 400,
        body: JSON.stringify({ errors: error.details })
      };
    }
    
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

    lineItems.push(...createRegistrationPurchaseItem(formType));

    if (Array.isArray(formData.shirts)) {
      lineItems.push(...createShirtPurchaseItems(formData.shirts));
    }

    if (typeof formData.numCaps === 'number' && formData.numCaps > 0) {
      lineItems.push(...createCapPurchaseItems(formData.numCaps));
    }

    if (formData.extraDonation > 0) {
      lineItems.push(...createExtraDonationPurchaseItem(formData.extraDonation));
    }

    // Common data for all registrations
    const baseMetadata: StripeMetadata = {
      formType: formType,
      shirtsString: shirtArrayToString(formData.shirts),
      name1: formData.name1,
      email1: formData.email1,
      extraDonation: formData.extraDonation.toString(),
      info: formData.info,
      numCaps: formData.numCaps.toString(),
      couponCode: formData.couponCode
    }

    const soloMetadata = formType === FormType.Solo ? {
      birthday1: birthdayToString(formData.year1, formData.month1, formData.day1),
      city1: formData.city1,
      gender: formData.gender,
    } : {}

    const teamMetadata = formType === FormType.Team ? {
      teamName: formData.teamName,
      birthday1: birthdayToString(formData.year1, formData.month1, formData.day1),
      birthday2: birthdayToString(formData.year2, formData.month2, formData.day2),
      birthday3: birthdayToString(formData.year3, formData.month3, formData.day3),
      name2: formData.name2,
      name3: formData.name3,
      email2: formData.email2,
      email3: formData.email3,
      city1: formData.city1,
      city2: formData.city2,
      city3: formData.city3,
    } : {}

    const metadata = {...baseMetadata, ...soloMetadata, ...teamMetadata}

    console.log("Processing metadata: ", metadata)

    const discounts: Stripe.Checkout.SessionCreateParams.Discount[] = formData.couponCode != "" ? [{ coupon: formData.couponCode }] : [];

    const session = await stripe.checkout.sessions.create({
      metadata: metadata as unknown as MetadataParam,
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${getNodeEnvVariable("CLIENT_URL")}/payment-success`,
      cancel_url: `${getNodeEnvVariable("CLIENT_URL")}/payment-cancelled`,
      discounts,
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
