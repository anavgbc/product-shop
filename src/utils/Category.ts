import Category from '../services/types/Category';

export const findCategoryById = (
    list: Category[],
    id: string
): Category | undefined => {
    return list.find((elem) => Number(elem.id) === Number(id));
};
