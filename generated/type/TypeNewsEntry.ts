import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeNewsEntryFields {
    title: EntryFieldTypes.Symbol;
    ingressText?: EntryFieldTypes.Text;
    body?: EntryFieldTypes.RichText;
    publishedTime?: EntryFieldTypes.Date;
    relatedArticles?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<EntrySkeletonType>>;
    link?: EntryFieldTypes.Symbol;
    linkText?: EntryFieldTypes.Symbol;
    videoLink?: EntryFieldTypes.Symbol;
    isOld?: EntryFieldTypes.Boolean;
    thumbnail?: EntryFieldTypes.AssetLink;
    images?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
}

export type TypeNewsEntrySkeleton = EntrySkeletonType<TypeNewsEntryFields, "newsEntry">;
export type TypeNewsEntry<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeNewsEntrySkeleton, Modifiers, Locales>;
