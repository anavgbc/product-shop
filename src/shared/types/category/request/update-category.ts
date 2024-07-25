import Category from '../../../../shared/types/category';

interface CategoryStructure {
    nome: string;
}

export interface UpdateCategoryByIdRequest {
    id: string;
    category: CategoryStructure;
    categoryList: Category[];
}
