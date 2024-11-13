import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeImageCollectionFields {
    albumLink: EntryFieldTypes.Symbol;
    title: EntryFieldTypes.Symbol;
    thumbnailUrl: EntryFieldTypes.Symbol;
    year?: EntryFieldTypes.Integer;
}

export type TypeImageCollectionSkeleton = EntrySkeletonType<TypeImageCollectionFields, "imageCollection">;
export type TypeImageCollection<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeImageCollectionSkeleton, Modifiers, Locales>;
