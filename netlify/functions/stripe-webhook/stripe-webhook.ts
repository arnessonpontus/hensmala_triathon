import { Handler } from '@netlify/functions';
import Stripe from 'stripe';
import { handleSubmit } from "../../../src/features/register/service/registerService";
import { FormType, RegisterFormSoloState, Shirt } from "../../../src/features/register/models";
import { shirtStringToArray } from '../../../src/features/register/utils';

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
    const shirts = shirtStringToArray(session.metadata.shirtsString);
    const formType: FormType = session.metadata.formType as FormType; //#TODO should probably use this FormType instead of the registration-fee-solo thing. ändrade de nu men nu blev jag själv förivrrad vad som är formtype, regsitrationtype etc.
    const formData: RegisterFormSoloState = {
      shirts: shirts,
      numCaps: Number(session.metadata.numCaps),
      name: session.metadata.name,
      email: session.metadata.email,
      year: session.metadata.year,
      month: session.metadata.month,
      day: session.metadata.day,
      info: session.metadata.info,
      gender: session.metadata.gender,
      city: session.metadata.city,
      extraDonation: Number(session.metadata.extraDonation),
      isCheckboxOneTicked: false, //ta bort från model? eller iaf sätta optional
      isCheckboxTwoTicked: false,
      isCheckboxThreeTicked: false
    }
    const totalInOre = session.amount_total || 0;
    handleSubmit(formType, formData, totalInOre / 100)

    console.log('Payment successfull! Webhook works fine!', session.id);
  }

  return { statusCode: 200, body: JSON.stringify({ received: true }) };

}
