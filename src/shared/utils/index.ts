import Category from '@/modules/categories/domain/entities/category';

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

export const findCategoryById = (
    list: Category[],
    id: string
): Category | undefined => {
    return list.find((elem) => Number(elem.id) === Number(id));
};
