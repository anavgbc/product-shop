import CreateCategoryInputDto from '@/shared/dto/category/input/create-category.dto';
import DeleteCategoryInputDto from '@/shared/dto/category/input/delete-category.dto';
import EditCategoryInputDto from '@/shared/dto/category/input/edit-category.dto';
import GetCategoryInputDto from '@/shared/dto/category/input/retrieve-category.dto';
import Category from '@/shared/types/category';

export default interface CategoriesService {
    getAll(): Promise<Category[]>;
    getById(input: GetCategoryInputDto): Promise<Category>;
    create(request: CreateCategoryInputDto): Promise<Category>;
    update(input: EditCategoryInputDto): Promise<Category>;
    delete(input: DeleteCategoryInputDto): Promise<void>;
}

export const CategoriesService = Symbol('CategoriesService');
