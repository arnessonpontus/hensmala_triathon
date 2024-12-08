import { Asset, UnresolvedLink } from "contentful";

export const getAssetUrl = (asset: UnresolvedLink<'Asset'> | Asset | undefined): string | undefined => {
  if (asset && 'fields' in asset) {
    return asset.fields.file?.url as string;
  }
  return undefined;
};

export const getViteEnvVariable = (key: string): string => {
  const value = import.meta.env[key];
  if (!value) {
    throw new Error(`Environment variable ${key} is not set.`);
  }
  return value;
};
