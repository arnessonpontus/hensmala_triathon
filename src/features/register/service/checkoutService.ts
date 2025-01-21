import { loadStripe } from '@stripe/stripe-js';
import { BaseOrderType, FormType, RegisterFormSoloState, RegisterFormTeamState } from '../models';
import { DEFAULT_CONTACT_EMAIL } from '../../../Constants';
import { getViteEnvVariable } from '../../../utils';

const stripePromise = loadStripe(`${getViteEnvVariable("VITE_STRIPE_PUBLIC")}`);

export const handleCheckout = async (
  formType: FormType,
  formData: RegisterFormSoloState | RegisterFormTeamState | BaseOrderType,
  showErrorModal: (message: string | string[], title: string) => void
) => {
  try {
    const response = await fetch('/.netlify/functions/payment/payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ formType, formData }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Failed to create checkout session", errorData);
      if (errorData?.errors) {
        showErrorModal(errorData.errors.map((err: any) => err.message), "Vissa fält är inte korrekta")
      } else {
        showErrorModal(`Försök igen eller kontakta ${DEFAULT_CONTACT_EMAIL} om felet kvarstår.`, "Kunde inte slutföra betalning")
      }
      return;
    }

    const { id: sessionId } = await response.json();
    const stripe = await stripePromise;

    if (stripe) {
      await stripe.redirectToCheckout({ sessionId });
    } else {
      console.error("Stripe failed to initialize");
    }
  } catch (error) {
    showErrorModal(`Försök igen eller kontakta ${DEFAULT_CONTACT_EMAIL} om felet kvarstår.`, "Kunde inte slutföra betalning")
    console.error(error)
  }
};
