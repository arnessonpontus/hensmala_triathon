import Stripe from "stripe";
import { BaseOrderType, CartItem, FormType, RegisterFormSoloState, RegisterFormTeamState, StripeMetadata } from "../../../src/features/register/models";
import { sekToOre, extractShirtsAsString } from "../../../src/features/register/utils";

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

export const toMetaData = (
  formType: FormType,
  formData: RegisterFormSoloState | RegisterFormTeamState | BaseOrderType,
  cartData: CartItem[]
): StripeMetadata => {
  // TODO: Change show purchase items are added to email etc
  const baseMetadata: StripeMetadata = {
    formType,
    shirtsString: extractShirtsAsString(cartData),
    name1: formData.name1,
    email1: formData.email1,
    extraDonation: formData.extraDonation.toString(),
    info: formData.info || '',
    numCaps: cartData.find(d => d.metadata.data_id === "keps")?.quantity.toString() ?? "0",
    couponName: formData.coupon?.name || '',
  };

  if (formType === FormType.Solo) {
    const soloData = formData as RegisterFormSoloState;
    return {
      ...baseMetadata,
      birthday1: birthdayToString(soloData.year1, soloData.month1, soloData.day1),
      city1: soloData.city1,
      gender: soloData.gender,
    };
  }

  if (formType === FormType.Team) {
    const teamData = formData as RegisterFormTeamState;
    return {
      ...baseMetadata,
      teamName: teamData.teamName,
      birthday1: birthdayToString(teamData.year1, teamData.month1, teamData.day1),
      birthday2: birthdayToString(teamData.year2, teamData.month2, teamData.day2),
      birthday3: birthdayToString(teamData.year3, teamData.month3, teamData.day3),
      name2: teamData.name2,
      name3: teamData.name3,
      email2: teamData.email2,
      email3: teamData.email3,
      city1: teamData.city1,
      city2: teamData.city2,
      city3: teamData.city3,
    };
  }

  return baseMetadata;
};
