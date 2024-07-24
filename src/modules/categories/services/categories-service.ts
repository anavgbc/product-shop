import Category from '@/shared/types/category';
import GetCategoryInputDto from '@/shared/dto/category/input/retrieve-category.dto';
import CreateCategoryInputDto from '@/shared/dto/category/input/create-category.dto';
import EditCategoryInputDto from '@/shared/dto/category/input/edit-category.dto';
import DeleteCategoryInputDto from '@/shared/dto/category/input/delete-category.dto';
import ApiService from '@/shared/client/api';
import Contract from '@/shared/contracts/category';

export class CategoriesService extends ApiService implements Contract {
    constructor() {
        super('', null);
    }

    public async getAll(): Promise<Category[]> {
        try {
            const { data } = await this.apiInstance.get<Category[]>(
                '/categories'
            );
            return data;
        } catch (err) {
            console.error(err);
            throw new Error();
        }
    }

    public async getById(input: GetCategoryInputDto): Promise<Category> {
        try {
            const { data } = await this.apiInstance.get(
                `/categories/${input.value.id}`
            );

            return data;
        } catch (err) {
            console.error(err);
            throw new Error();
        }
    }

    public async create(input: CreateCategoryInputDto): Promise<Category> {
        try {
            const { data } = await this.apiInstance.post(
                '/categories',
                input.value
            );

            return data;
        } catch (err) {
            console.error(err);
            throw new Error();
        }
    }

    public async update(input: EditCategoryInputDto): Promise<Category> {
        try {
            const { data } = await this.apiInstance.patch(
                `/categories/${input.value.id}`,
                input.value.category
            );

            return data;
        } catch (err) {
            console.error(err);
            throw new Error();
        }
    }

    public async delete(input: DeleteCategoryInputDto): Promise<void> {
        try {
            await this.apiInstance.delete(`/categories/${input.value.id}`);
        } catch (err) {
            console.error(err);
        }
    }
}
