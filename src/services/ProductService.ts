import ApiService from './api';
import CreateProductInputDto from './dtos/Product/input/create-product.dto';
import DeleteProductInputDto from './dtos/Product/input/delete-product.dto';
import EditProductInputDto from './dtos/Product/input/edit-product.dto';
import GetProductInputDto from './dtos/Product/input/retrieve-product.dto';

import Entity from './entities/Product';
import Product from './types/Product';

export class ProductService extends ApiService implements ProductService {
    constructor() {
        super('', null);
    }

    public async getProducts(): Promise<Entity[]> {
        try {
            const { data } = await this.apiInstance.get('/products');

            return data.map((product: Product) => new Entity(product));
        } catch (err) {
            console.error(err);
            throw new Error();
        }
    }

    public async getCategories(): Promise<any> {
        try {
            const { data } = await this.apiInstance.get('/categories');

            return data;
        } catch (err) {
            console.error(err);
        }
    }

    public async getProductById(input: GetProductInputDto): Promise<Entity> {
        try {
            const { data } = await this.apiInstance.get(
                `/products/${input.value.id}`
            );

            return new Entity(data);
        } catch (err) {
            console.error(err);
            throw new Error();
        }
    }

    public async createProduct(input: CreateProductInputDto): Promise<Entity> {
        try {
            const { data } = await this.apiInstance.post(
                '/products',
                input.value
            );

            return new Entity(data);
        } catch (err) {
            console.error(err);
            throw new Error();
        }
    }

    public async updateProduct(input: EditProductInputDto): Promise<Entity> {
        try {
            const { data } = await this.apiInstance.patch(
                `/products/${input.value.id}`,
                input.value.product
            );

            return new Entity(data);
        } catch (err) {
            console.error(err);
            throw new Error();
        }
    }

    public async deleteProduct(input: DeleteProductInputDto): Promise<void> {
        try {
            const { data } = await this.apiInstance.delete(
                `/products/${input.value.id}`
            );

            return data;
        } catch (err) {
            console.error(err);
        }
    }
}
