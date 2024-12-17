import { Asset, UnresolvedLink } from "contentful";
import { priceType } from "./features/register/models";
import { priceMapDev, priceMapProd } from "../netlify/functions/utils/pricing";

export const getAssetUrl = (asset: UnresolvedLink<'Asset'> | Asset | undefined): string | undefined => {
  if (asset && 'fields' in asset) {
    return asset.fields.file?.url as string;
  }
  return undefined;
};

export const getViteEnvVariable = (key: string): string => {
  const value = import.meta.env[key];
  if (!value) {
    throw new Error(`Vite environment variable ${key} is not set.`);
  }
  return value;
};

export const getPriceId = (item: priceType): string | null => {
  return getViteEnvVariable("MODE") === "production" ? priceMapProd[item] || null : priceMapDev[item] || null;
};
