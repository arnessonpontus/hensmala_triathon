
export const priceMap: Record<string, string> = {
    'registration-fee-solo': 'price_1QKQxZJv440zP1qkSr5rWl5o',
    'registration-fee-team': 'price_1QKQxpJv440zP1qkBIAjUPCB',
    'funktion': 'price_1QKQyAJv440zP1qkYLGxsSML',
    'bomull': 'price_1QKQyPJv440zP1qk7kku7LmJ',
    'keps': 'price_1QKQybJv440zP1qkReYLYpIY',

};

export const getPriceId = (item: string): string | null => {
    return priceMap[item] || null;
};