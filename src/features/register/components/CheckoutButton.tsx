import { loadStripe } from '@stripe/stripe-js';
import { Button, ButtonProps, Spinner } from "reactstrap";
import { Shirt } from '../models';
import { useErrorModal } from '../../../context/ErrorModalContext';
import { DEFAULT_CONTACT_EMAIL } from '../../../Constants';

const stripePromise = loadStripe(`${import.meta.env.VITE_STRIPE_PUBLIC}`);

interface CheckoutButtonProps extends ButtonProps {
  registrationType: "registration-fee-solo" | "registration-fee-team"
  shirts: Shirt[],
  numCaps: number,
  text: string,
  loading: boolean,
  disabled: boolean
}

const CheckoutButton = (props: CheckoutButtonProps) => {
  const { showErrorModal } = useErrorModal();
  const { registrationType, shirts, numCaps, text, loading, disabled } = props;

  const handleCheckout = async () => {
    try {
      const response = await fetch('/.netlify/functions/payment/payment', {
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

  return (
    <div>
      <Button
        onClick={handleCheckout}
        className="mt-2"
        style={{ minWidth: "140px", minHeight: "40px", display: "flex", alignItems: "center", justifyContent: "center" }}
        disabled={disabled}
      >
        {loading ? (
          <Spinner size="sm" color="light" />
        ) : (text)}
      </Button>
    </div>
  );
};

export default CheckoutButton;
