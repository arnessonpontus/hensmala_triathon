import Stripe from "stripe";
import { Handler } from '@netlify/functions';
import { getPriceId } from "../payment/pricing";

const stripe = new Stripe(process.env.STRIPE_SECRET as string, {
  apiVersion: '2024-10-28.acacia',
});

export const handler: Handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      body: '',
    };
  }

  try {
    const { productName } = JSON.parse(event.body || '{}');

    const priceId = getPriceId(productName);
    if (priceId) {
      const price = await stripe.prices.retrieve(priceId);
      return {
        statusCode: 200,
        body: JSON.stringify(price),
      };
    }

    return {
      statusCode: 404,
      body: JSON.stringify({ error: "Price not found" }),
    };
  } catch (error) {
    console.error("Error retrieving price:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to retrieve price" }),
    };
  }

}
