import Category from '../../../../shared/types/category';

export interface CreateCategoryRequest {
    nome: string;
    categoryList: Category[];
}
