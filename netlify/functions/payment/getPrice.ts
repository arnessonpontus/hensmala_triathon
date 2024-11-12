import Stripe from "stripe";
import { Handler } from '@netlify/functions';
import { getPriceId } from "./pricing";

const stripe = new Stripe(process.env.STRIPE_SECRET as string, {
    apiVersion: '2024-10-28.acacia',
});
// FÖRSÖKTE ANVÄNDA DENNA FÖR ATT HÄMTA PRISER MEN LÖSTE DET INTE.

export const handler: Handler = async (event) => {
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS, POST',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
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
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'OPTIONS, POST',
                    'Access-Control-Allow-Headers': 'Content-Type',
                },
                body: JSON.stringify({ price }),

            };
        }

        return {
            statusCode: 404,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS, POST',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
            body: JSON.stringify({ error: "Price not found" }),
        };
    } catch (error) {
        console.error("Error retrieving price:", error);
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS, POST',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
            body: JSON.stringify({ error: "Failed to retrieve price" }),
        };
    }

}