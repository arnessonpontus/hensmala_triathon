export interface Shirt {
  size: string,
  type: string,
  material: "funktion" | "bomull"
}

export interface orderDetails {
  loading: boolean,
  name: string,
  email: string,
  extraDonation: number,
  shirts: Shirt[],
  numCaps: number,
  info: string,
  consent: boolean,
  hasOrderd: boolean
}

export type FormType = "solo" | "team" | "tshirt_order";