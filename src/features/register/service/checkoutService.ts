import { loadStripe } from '@stripe/stripe-js';
import { Shirt } from '../models';
import { DEFAULT_CONTACT_EMAIL } from '../../../Constants';

const stripePromise = loadStripe(`${import.meta.env.VITE_STRIPE_PUBLIC}`);

export const handleCheckout = async (
    registrationType: "registration-fee-solo" | "registration-fee-team",
    shirts: Shirt[],
    numCaps: number,
    showErrorModal: (message: string, title: string) => void
) => {
    try {
        const response = await fetch('.netlify/functions/payment/payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ registrationType, shirts, numCaps }),
        });

        if (!response.ok) {
            console.error("Failed to create checkout session");
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
