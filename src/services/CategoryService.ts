import ApiService from './api';
import CreateCategoryInputDto from './dtos/Category/input/create-category.dto';
import DeleteCategoryInputDto from './dtos/Category/input/delete-category.dto';
import EditCategoryInputDto from './dtos/Category/input/edit-category.dto';
import GetCategoryInputDto from './dtos/Category/input/retrieve-category.dto';
import Entity from './entities/Category';
import Category from './types/Category';

export class CategoriesService extends ApiService implements CategoriesService {
    constructor() {
        super('', null);
    }

    public async getCategories(): Promise<Entity[]> {
        try {
            const { data } = await this.apiInstance.get('/categories');

            return data.map((category: Category) => new Entity(category));
        } catch (err) {
            console.error(err);
            throw new Error();
        }
    }

    public async getCategoryById(input: GetCategoryInputDto): Promise<Entity> {
        try {
            const { data } = await this.apiInstance.get(
                `/categories/${input.value.id}`
            );

            return new Entity(data);
        } catch (err) {
            console.error(err);
            throw new Error();
        }
    }

    public async createCategory(
        input: CreateCategoryInputDto
    ): Promise<Entity> {
        try {
            const { data } = await this.apiInstance.post(
                '/categories',
                input.value
            );

            return new Entity(data);
        } catch (err) {
            console.error(err);
            throw new Error();
        }
    }

    public async updateCategory(input: EditCategoryInputDto): Promise<Entity> {
        try {
            const { data } = await this.apiInstance.patch(
                `/categories/${input.value.id}`,
                input.value.category
            );

            return new Entity(data);
        } catch (err) {
            console.error(err);
            throw new Error();
        }
    }

    public async deleteCategory(input: DeleteCategoryInputDto): Promise<void> {
        try {
            await this.apiInstance.delete(`/categories/${input.value.id}`);
        } catch (err) {
            console.error(err);
        }
    }
}
