import Stripe from "stripe";
import { Handler } from '@netlify/functions';
import { getNodeEnvVariable } from "../utils/envUtil";
import { createJsonResponse } from "../utils/responseUtil";

const stripe = new Stripe(getNodeEnvVariable("STRIPE_SECRET"), {
  apiVersion: '2024-10-28.acacia',
});

export const handler: Handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return createJsonResponse(200, "");
  }

  try {
    const products = (await stripe.products.list({
      expand: ['data.default_price'],
    })).data;

    for (const product of products) {
      if (typeof product.default_price === 'string') {
        return createJsonResponse(500, { error: "Failed to expand prices for products" });
      }
    }

    return createJsonResponse(200, products);

  } catch (error) {
    console.error("Error retrieving product:", error);
    return createJsonResponse(500, { error: "Failed to retrieve product" });
  }
}
