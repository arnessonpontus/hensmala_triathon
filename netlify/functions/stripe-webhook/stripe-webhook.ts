import { Handler } from '@netlify/functions';
import Stripe from 'stripe';
import { FormType, StripeMetadata } from "../../../src/features/register/models";
import { oreToSek } from '../../../src/features/register/utils';
import { writeToSpreadsheet } from './writeToSpreadsheet';
import { sendEmail, sendEmailToUsInCaseOfError } from './emailSender';
import { getNodeEnvVariable } from '../utils/envUtil';
import { createJsonResponse } from '../utils/responseUtil';

const stripe = new Stripe(getNodeEnvVariable("STRIPE_SECRET") as string, {
  apiVersion: '2024-10-28.acacia',
});

const endpointSecret = getNodeEnvVariable("STRIPE_WEBHOOK_SECRET") as string;

export const handler: Handler = async (event) => {

  if (!event.body || !event.headers['stripe-signature']) {
    return createJsonResponse(400, { error: 'Invalid webhook request' });
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
    return createJsonResponse(400, { error: 'Webhook Error: Signature verification failed' });
  }

  if (stripeEvent.type === 'checkout.session.completed') {
    const session = stripeEvent.data.object as Stripe.Checkout.Session;
    if (session.metadata == null) {
      console.log("something went wrong with the data when being sent")
      sendEmailToUsInCaseOfError(session.customer_details?.name, session.customer_details?.email, session.customer_details?.phone);
      return createJsonResponse(400, { error: 'Missing metadata when getting the stripe.checkout.session webhook.' });
    }

    const metadata: StripeMetadata = session.metadata as unknown as StripeMetadata;

    const totalInOre = session.amount_total || 0;

    const orderID = "ORDER-" + Date.now() + Math.floor(Math.random() * 5000);

    try {
      const spreadsheetRow = await writeToSpreadsheet(metadata, oreToSek(totalInOre), orderID)
      await sendEmail(spreadsheetRow, metadata.formType as FormType, orderID);
      return createJsonResponse(200, { received: true });
    } catch (e) {
      sendEmailToUsInCaseOfError(session.customer_details?.name, session.customer_details?.email, session.customer_details?.phone, metadata);
      console.error(e);
      return createJsonResponse(400, { error: 'Error when trying to write to spreedsheet and sending registration email' });
    }
  }

  return createJsonResponse(200, { received: true });
}
