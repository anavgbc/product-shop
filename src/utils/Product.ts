export const genereateId = (): string => {
    return (Math.floor(Math.random() * 1000000) + 1).toString();
};

export const formatCurrencyToNumber = (currency: string): number => {
    const cleanedString = currency
        .split('R$')[1]
        .replace(/\./g, '')
        .replace(',', '.');

    return parseFloat(cleanedString);
};
