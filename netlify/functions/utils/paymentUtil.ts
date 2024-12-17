import Stripe from "stripe";
import { FormType, Shirt } from "../../../src/features/register/models";
import { getPriceId } from "./pricing";
import { sekToOre } from "../../../src/features/register/utils";


export const createRegistrationPurchaseItem = (formType: FormType): Stripe.Checkout.SessionCreateParams.LineItem[] => {

    let registrationPriceId: string | null = null;

    if (formType === FormType.Solo) {
        registrationPriceId = getPriceId("registration-fee-solo", true);
    } else if (formType === FormType.Team) {
        registrationPriceId = getPriceId("registration-fee-team", true);
    }

    if (registrationPriceId) {
        return [
            {
                price: registrationPriceId,
                quantity: 1,
            },
        ];
    }
    return [];
}

export const createShirtPurchaseItems = (shirts: Shirt[]): Stripe.Checkout.SessionCreateParams.LineItem[] => {
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
    if (Array.isArray(shirts)) {
        shirts.forEach((shirt: Shirt) => {
            const shirtPriceId = getPriceId(shirt.material, true);
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
    const capPriceId = getPriceId("keps", true)
    if (capPriceId) {
        return [{
            price: capPriceId,
            quantity: numCaps,
        }];
    }
    return [];
}

export const createExtraDonationPurchaseItem = (extraDonation: number): Stripe.Checkout.SessionCreateParams.LineItem[] => {
    const amountInOre = sekToOre(extraDonation);
    return [{
        price_data: {
            currency: 'sek',
            product_data: {
                name: 'Extra donation',
            },
            unit_amount: amountInOre,
        },
        quantity: 1,
    }];
};

const appendZero = (str: string) => {
    return parseInt(str) < 10 ? "0" + str : str;
}

export function birthdayToString(year: string, month: string, day: string): string {
    return `${year}-${appendZero(month)}-${appendZero(day)}`
}
