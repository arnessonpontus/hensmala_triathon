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
