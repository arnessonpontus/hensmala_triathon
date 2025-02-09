import moment from 'moment-timezone';
import { CartItem, ProductWithExpandedPrice, registerType, registerTypes, Shirt } from "./models";
import Stripe from 'stripe';

export function shirtArrayToString(items: CartItem[]) {
  return items.filter(s => (
    s.metadata.data_id === "funktion" ||
    s.metadata.data_id === "bomull") &&
    s.selectedSize && s.selectedType
  ).map(shirt => `${shirt.quantity} ${shirt.name} ${shirt.selectedType} ${shirt.selectedSize}`).join(', ');
}

// Checks if at lease one shirt is valid (not having any null values)
export function hasValidShirt(shirts: Shirt[]) {
  for (let shirt of shirts) {
    if (shirt.size !== null && shirt.type !== null) {
      return true;
    }
  }
  return false;
}

export function scrollToInfo(elementID: string) {
  const yOffset = -30;
  const element = document.getElementById(elementID);
  const y = (element?.getBoundingClientRect().top ?? 0) + window.pageYOffset + yOffset;

  window.scrollTo({ top: y, behavior: 'smooth' });
};

export const calcShirtPrice = (shirts: Shirt[], cottonShirtPrice: number, functionShirtPrice: number) => {
  const shirtAmount = shirts.reduce((acc, shirt) => {
    if (shirt.size && shirt.type && shirt.material) {
      if (shirt.material === 'bomull') {
        return acc + cottonShirtPrice;
      } else {
        return acc + functionShirtPrice;
      }
    } else {
      return acc;
    }
  }, 0);
  return shirtAmount;
}

export const calcTotalProductPrice = (
  products: CartItem[],
  donation: number,
  coupon: Stripe.Coupon | undefined
) => {
  return donation + (products.reduce((prev, curr) => {
    const doesIncludeProduct = coupon?.applies_to?.products.includes(curr.id);
    const inverseDiscount = doesIncludeProduct ? getInverseDiscountFromPercentOff(coupon?.percent_off) : 1;
    return prev + curr.quantity * oreToSek(curr.default_price?.unit_amount ?? 0) * inverseDiscount;
  }, 0));
}

export const oreToSek = (ore: number) => {
  return ore / 100;
}

export const sekToOre = (sek: number) => {
  return Math.round(sek * 100);
}

export const getDaysFromNow = (day: string) => {
  return Math.ceil(moment(day).tz("Europe/Stockholm").diff(moment().tz("Europe/Stockholm")) / 86400000)
}

export const getInverseDiscountFromPercentOff = (percent_off?: number | null) =>  1 - (percent_off ?? 0)/100;

export const isProductRegistration = (product: ProductWithExpandedPrice) => registerTypes.includes(product.metadata.data_id as registerType);
