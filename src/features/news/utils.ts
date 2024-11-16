export const spaceToDash = (str: string) => {
    return str.replace(/\s+/g, '-');
}

export const trimTimeFromDate = (str: string | undefined) => {
    return str ? str.split("T")[0] : "unknown date";
}
