import Stripe from "stripe";
import { Shirt } from "../../../src/features/register/models";
import { getPriceId } from "./pricing";


export const createShirtPurchaseItems = (shirts: Shirt[]): Stripe.Checkout.SessionCreateParams.LineItem[] => {
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
    if (Array.isArray(shirts)) {
        shirts.forEach((shirt: Shirt) => {
            const shirtPriceId = getPriceId(shirt.material);
            if (shirtPriceId) {
                lineItems.push({
                    price: shirtPriceId,
                    quantity: 1,
                });
            }
        });
    }
    return lineItems;
}

export const createCapPurchaseItems = (numCaps: number): Stripe.Checkout.SessionCreateParams.LineItem[] => {
    const capPriceId = getPriceId("keps")
    if (capPriceId) {
        return [{
            price: capPriceId,
            quantity: numCaps,
        }];
    }
    return [];
}

const appendZero = (str: string) => {
    return parseInt(str) < 10 ? "0" + str : str;
}

export function birthdayToString(year: string, month: string, day: string): string {
    return `${year}-${appendZero(month)}-${appendZero(day)}`
}
