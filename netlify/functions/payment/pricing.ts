
export const priceMap: Record<string, string> = {
    'registration-fee-solo': 'price_1QJgCAHwfCH6Z6NmG3DW1Gue',
    'registration-fee-team': 'price_1QJiHmHwfCH6Z6NmAt5pz1ey',
    'funktion': 'price_1QJhuOHwfCH6Z6NmQ0N2qvcR',
    'bomull': 'price_1QJiJTHwfCH6Z6Nm6CvBxVEO',
    'keps': 'price_1QJiIKHwfCH6Z6NmSvFSMSXM',

};

export const getPriceId = (item: string): string | null => {
    return priceMap[item] || null;
};