export const sizeValues = ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"] as const;
export type Size = typeof sizeValues[number];

export const shirtTypes = ["Dam", "Herr"] as const;
export type ShirtType = typeof shirtTypes[number];

export const shirtMaterials = ["funktion", "bomull"] as const;
export type ShirtMaterial = typeof shirtMaterials[number];

export const genderValues = ["Dam", "Herr"] as const;
export type GenderType = typeof genderValues[number];

export interface Shirt {
  size: Size | null,
  type: GenderType | null,
  material: ShirtMaterial
}

export interface BaseOrderType {
  shirts: Shirt[],
  shirtsString?: string,
  numCaps: number,
  extraDonation: number,
  name1: string,
  email1: string,
  info: string,
}

export interface RegisterFormSoloState extends BaseOrderType {
  year1: string;
  month1: string;
  day1: string;
  gender: string;
  city1: string;
}

export interface StripeMetadata {
  formType: string;
  birthday1?: string;
  birthday2?: string;
  birthday3?: string;
  teamName?: string;
  name1: string;
  name2?: string;
  name3?: string;
  city1?: string;
  city2?: string;
  city3?: string;
  email1: string;
  email2?: string;
  email3?: string;
  gender?: string;
  shirtsString?: string;
  numCaps: string;
  extraDonation: string;
  info: string;
}

export interface RegisterFormTeamState extends BaseOrderType {
  teamName: string;
  year1: string;
  month1: string;
  day1: string;
  city1: string;
  name2: string;
  email2: string;
  year2: string;
  month2: string;
  day2: string;
  city2: string;
  name3: string;
  email3: string;
  year3: string;
  month3: string;
  day3: string;
  city3: string;
}

export type DataToSend = Partial<
  BaseOrderType &
  RegisterFormSoloState &
  RegisterFormTeamState
> & {
  totalToPay: number
};

export enum FormType {
  Solo = "solo",
  Team = "team",
  MerchOrder = "merch_order",
}

export type priceType =
  "registration-fee-solo"
  | "registration-fee-team"
  | "funktion"
  | "bomull"
  | "keps"

export type discountType =
  "company-discount-code"
