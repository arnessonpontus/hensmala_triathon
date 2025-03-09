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
    for (const stripeCoupon of (await stripe.coupons.list({expand: ['data.applies_to']})).data) {
      const coupon = event.queryStringParameters?.['coupon'];
      if (coupon?.toLocaleLowerCase() === stripeCoupon.name?.toLocaleLowerCase()) {
        return createJsonResponse(200, stripeCoupon);
      }

    }
    return createJsonResponse(404, {error: "No code matching"});

  } catch (error) {
    console.error("Error retrieving coupon:", error);
    return createJsonResponse(500, { error:  "Failed to retrieve coupon" });
  }
}
