import CreateProductInputDto from '@/shared/dto/product/input/create-product.dto';
import DeleteProductInputDto from '@/shared/dto/product/input/delete-product.dto';
import EditProductInputDto from '@/shared/dto/product/input/edit-product.dto';
import GetProductInputDto from '@/shared/dto/product/input/retrieve-product.dto';
import Product from '@/shared/types/product';

export default interface ProductService {
    getAll(): Promise<Product[]>;
    getById(input: GetProductInputDto): Promise<Product>;
    create(request: CreateProductInputDto): Promise<Product>;
    update(input: EditProductInputDto): Promise<Product>;
    delete(input: DeleteProductInputDto): Promise<void>;
}

export const ProductService = Symbol('ProductService');
