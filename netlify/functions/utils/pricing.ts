import { discountType, priceType } from "../../../src/features/register/models";
import { getNodeEnvVariable } from "./envUtil";

export const priceMapProd: Record<priceType, string> = {
  'registration-fee-solo': 'price_1QotWeJv440zP1qkyJQHGoFK',
  'registration-fee-team': 'price_1QotgEJv440zP1qkznsPPEJX',
  'funktion': 'price_1QX6J9Jv440zP1qkITYMDEWU',
  'bomull': 'price_1QX6IeJv440zP1qkWOHJiyS1',
  'keps': 'price_1QX6IDJv440zP1qkvEif7KrS',
};

export const priceMapDev: Record<priceType, string> = {
  'registration-fee-solo': 'price_1QKQxZJv440zP1qkSr5rWl5o',
  'registration-fee-team': 'price_1QKQxpJv440zP1qkBIAjUPCB',
  'funktion': 'price_1QKQyAJv440zP1qkYLGxsSML',
  'bomull': 'price_1QKQyPJv440zP1qk7kku7LmJ',
  'keps': 'price_1QKQybJv440zP1qkReYLYpIY',
};

export const discountMapProd: Record<discountType, string> = {
  'company-discount-code': 'XXXXXXXXXXXX' //No active coupon on PROD
}

export const discountMapDev: Record<discountType, string> = {
  'company-discount-code': 'q04XNbmg'
}

export const getPriceId = (item: priceType): string | null => {
  return getNodeEnvVariable("VITE_ENV") === "prod" ? priceMapProd[item] || null : priceMapDev[item] || null;
};
