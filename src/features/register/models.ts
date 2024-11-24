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
  name: string,
  email: string,
  info: string,
}

export interface RegisterFormSoloState extends BaseOrderType {
  year: string;
  month: string;
  day: string;
  gender: string;
  city: string;
  isCheckboxOneTicked: boolean;
  isCheckboxTwoTicked: boolean;
  isCheckboxThreeTicked: boolean;
}

export interface RegisterFormTeamState extends Omit<BaseOrderType, "name" | "email"> {
  teamName: string;
  name1: string;
  email1: string;
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
  isCheckboxOneTicked: boolean;
  isCheckboxTwoTicked: boolean;
  isCheckboxThreeTicked: boolean;
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

export type FormType = "solo" | "team" | "tshirt_order";

export type priceType =
  "registration-fee-solo"
  | "registration-fee-team"
  | "funktion"
  | "bomull"
  | "keps"
