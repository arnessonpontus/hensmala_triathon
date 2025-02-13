import Stripe from "stripe";
import { Handler } from '@netlify/functions';
import { getNodeEnvVariable } from "../utils/envUtil";

const stripe = new Stripe(getNodeEnvVariable("STRIPE_SECRET"), {
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
    const products = (await stripe.products.list({
      expand: ['data.default_price'],
    })).data;

    for (const product of products) {
      if (typeof product.default_price === 'string') {
        return {
          statusCode: 500,
          body: JSON.stringify({ error: "Failed to expand prices for products" }),
        };
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify(products),
    };

  } catch (error) {
    console.error("Error retrieving product:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to retrieve product" }),
    };
  }
}
