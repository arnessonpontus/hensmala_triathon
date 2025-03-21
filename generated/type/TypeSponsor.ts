import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeSponsorFields {
    siteLink?: EntryFieldTypes.Symbol;
    title?: EntryFieldTypes.Symbol;
    image: EntryFieldTypes.AssetLink;
    level: EntryFieldTypes.Symbol;
    sponsorYears?: EntryFieldTypes.Array<EntryFieldTypes.Symbol<"2024" | "2025">>;
}

export type TypeSponsorSkeleton = EntrySkeletonType<TypeSponsorFields, "sponsor">;
export type TypeSponsor<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeSponsorSkeleton, Modifiers, Locales>;
