export type Size = "XXS" | "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL"

export type shirtType = "Dam" | "Herr";

export type ShirtMaterial = "funktion" | "bomull";

export interface Shirt {
  size: Size | null,
  type: "Dam" | "Herr" | null,
  material: "funktion" | "bomull"
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
  birthday1: string;
  birthday2?: string;
  birthday3?: string;
  teamName?: string;
  name1: string;
  name2?: string;
  name3?: string;
  city1: string;
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

export interface OrderShirtState extends BaseOrderType {
  consent: boolean,
  hasOrdered: boolean,
  loading: boolean,
}

export type DataToSend = Partial<
  BaseOrderType &
  RegisterFormSoloState &
  RegisterFormTeamState &
  OrderShirtState
> & {
  totalToPay: number
};

export enum FormType {
  Solo = "solo",
  Team = "team",
  TShirtOrder = "tshirt_order",
}

export type priceType =
  "registration-fee-solo"
  | "registration-fee-team"
  | "funktion"
  | "bomull"
  | "keps"
