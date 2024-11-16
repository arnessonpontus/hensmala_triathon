import { Asset, UnresolvedLink } from "contentful";

export const getAssetUrl = (asset: UnresolvedLink<'Asset'> | Asset | undefined): string | undefined => {
    if (asset && 'fields' in asset) {
      return asset.fields.file?.url as string;
    }
    return undefined;
  };
