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
    for (const stripeCoupon of (await stripe.coupons.list()).data) {
      const coupon = event.queryStringParameters?.['coupon'];
      if (coupon?.toLocaleLowerCase() === stripeCoupon.name?.toLocaleLowerCase()) {
        return {
          statusCode: 200,
          body: JSON.stringify(stripeCoupon),
        };
      }

    }
    return {
      statusCode: 404,
      body: JSON.stringify({ error: "No code matching" }),
    };

  } catch (error) {
    console.error("Error retrieving coupon:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to retrieve coupon" }),
    };
  }
}
