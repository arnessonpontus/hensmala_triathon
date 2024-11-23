import Stripe from "stripe";
import { Handler } from '@netlify/functions';
import { oreToSek } from "../../../src/features/register/utils";

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
    const prices: Record<string, number | null> = {};
    for (const price of (await stripe.prices.list()).data) {
      prices[price.id] = price.unit_amount ? oreToSek(price.unit_amount) : null;
    }
    return {
      statusCode: 200,
      body: JSON.stringify(prices),
    };
    
  } catch (error) {
    console.error("Error retrieving price:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to retrieve price" }),
    };
  }

}
