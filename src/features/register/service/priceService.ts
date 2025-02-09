import Stripe from "stripe";
import { ProductWithExpandedPrice } from "../models";

export const getProducts = async (): Promise<ProductWithExpandedPrice[]> => {
  try {
    const res = await fetch('/.netlify/functions/getProducts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return await res.json();

  } catch (error) {
    console.error("Error fetching product details:", error)
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
