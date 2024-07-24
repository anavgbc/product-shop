import Product from '@/shared/types/product';
import GetProductInputDto from '@/shared/dto/product/input/retrieve-product.dto';
import CreateProductInputDto from '@/shared/dto/product/input/create-product.dto';
import EditProductInputDto from '@/shared/dto/product/input/edit-product.dto';
import DeleteProductInputDto from '@/shared/dto/product/input/delete-product.dto';
import ApiService from '@/shared/client/api';
import Contract from '@/shared/contracts/product';

export class ProductService extends ApiService implements Contract {
    constructor() {
        super('', null);
    }

    public async getAll(): Promise<Product[]> {
        try {
            const { data } = await this.apiInstance.get<Product[]>('/products');

            return data;
        } catch (err) {
            console.error(err);
            throw new Error();
        }
    }

    public async getById(input: GetProductInputDto): Promise<Product> {
        try {
            const { data } = await this.apiInstance.get(
                `/products/${input.value.id}`
            );

            return data;
        } catch (err) {
            console.error(err);
            throw new Error();
        }
    }

    public async create(input: CreateProductInputDto): Promise<Product> {
        try {
            const { data } = await this.apiInstance.post(
                '/products',
                input.value
            );

            return data;
        } catch (err) {
            console.error(err);
            throw new Error();
        }
    }

    public async update(input: EditProductInputDto): Promise<Product> {
        try {
            const { data } = await this.apiInstance.patch(
                `/products/${input.value.id}`,
                input.value.product
            );

            return data;
        } catch (err) {
            console.error(err);
            throw new Error();
        }
    }

    public async delete(input: DeleteProductInputDto): Promise<void> {
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
