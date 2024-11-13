import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Button, ButtonProps, Spinner } from "reactstrap";
import { Shirt } from '../models';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC);

interface CheckoutButtonProps extends ButtonProps {
  registrationType: "registration-fee-solo" | "registration-fee-team"
  shirts: Shirt[],
  numCaps: number,
  text: string,
  loading: boolean,
  disabled: boolean
}


const CheckoutButton = (props: CheckoutButtonProps) => {
  const { registrationType, shirts, numCaps, text, loading, disabled } = props;

  const handleCheckout = async () => {
    const response = await fetch('http://localhost:8888/.netlify/functions/payment/Payment', {
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
