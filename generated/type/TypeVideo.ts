import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeVideoFields {
    videoLink: EntryFieldTypes.Symbol;
    title: EntryFieldTypes.Symbol;
    text?: EntryFieldTypes.Symbol;
}

export type TypeVideoSkeleton = EntrySkeletonType<TypeVideoFields, "video">;
export type TypeVideo<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeVideoSkeleton, Modifiers, Locales>;
