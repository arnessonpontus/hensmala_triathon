import Stripe from "stripe";
import { priceType } from "../models";

export const getPrices = async (): Promise<Record<priceType, number>> => {
  try {
    const res = await fetch('/.netlify/functions/getPrices', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return await res.json();

  } catch (error) {
    console.error("Error fetching price details:", error)
    return Promise.reject();
  }
};

export const matchCoupon = async (coupon: string): Promise<Stripe.Coupon | undefined> => {
  try {
    const res = await fetch('/.netlify/functions/matchCoupon?coupon='+ coupon, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return await res.json();

  } catch (error) {
    console.error("Error matching coupon:", error)
    return Promise.reject();
  }
};
