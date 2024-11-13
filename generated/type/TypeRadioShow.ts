import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeRadioShowFields {
    title: EntryFieldTypes.Symbol;
    radioFile: EntryFieldTypes.AssetLink;
    text?: EntryFieldTypes.Symbol;
    thumbnail?: EntryFieldTypes.AssetLink;
}

export type TypeRadioShowSkeleton = EntrySkeletonType<TypeRadioShowFields, "radioShow">;
export type TypeRadioShow<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeRadioShowSkeleton, Modifiers, Locales>;
