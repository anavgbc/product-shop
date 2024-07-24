import Product from '@/shared/types/product';
import Entity from '../entities/product';
import CreateProductInputDto from '@/shared/dto/product/input/create-product.dto';
import EditProductInputDto from '@/shared/dto/product/input/edit-product.dto';
import DeleteProductInputDto from '@/shared/dto/product/input/delete-product.dto';
import GetProductInputDto from '@/shared/dto/product/input/retrieve-product.dto';
import useService from '@/hooks/use-service';
import { ProductService as ProductContract } from '@/shared/contracts/product';
import { toast } from 'vue-sonner';
import { CreateProductRequest } from '@/shared/types/product/requests/create-product';
import { UpdateProductByIdRequest } from '@/shared/types/product/requests/update-product';
import { DeleteProductRequest } from '@/shared/types/product/requests/delete-product';
import { getProductByIdRequest } from '@/shared/types/product/requests/get-product';
import { formatCurrencyToNumber, genereateId } from '@/shared/utils';
import router from '@/registerModules/router';

const productService = useService(ProductContract);

export async function getProducts(): Promise<Entity[]> {
    try {
        const products = await productService.getAll();
        return products.map((product: Product) => new Entity(product));
    } catch (err) {
        toast.error('Erro ao buscar produtos');
        console.error(err);
        throw err;
    }
}

export async function createProduct(
    request: CreateProductRequest
): Promise<void> {
    const newProduct = request.product;
    const productAlreadyExists = request.productList.find(
        (product) =>
            product.nome.toLowerCase() === newProduct.nome.toLowerCase()
    );

    if (productAlreadyExists) {
        toast.error('Produto já cadastrado');
        throw new Error('Produto já cadastrado');
    }

    const input = new CreateProductInputDto({
        nome: newProduct.nome,
        valor: formatCurrencyToNumber(newProduct.valor),
        categoria: newProduct.categoria,
        descricao: newProduct.descricao,
        id: genereateId(),
    });

    await productService.create(input).then(() => {
        toast.success('Produto criado com sucesso');
        router.push({ name: 'home' });
    });
}

export async function updateProduct(
    request: UpdateProductByIdRequest
): Promise<void> {
    const productExists = request.productList.find(
        (product) =>
            product.nome.toLowerCase() === request.product.nome?.toLowerCase()
    );

    if (productExists && productExists.id !== request.id) {
        toast.error('Produto já cadastrado');
        throw new Error('Produto já cadastrado');
    }

    const input = new EditProductInputDto({
        id: request.id,
        product: request.product,
    });

    await productService.update(input).then(() => {
        toast.success('Produto editado com sucesso');
        router.push({ name: 'home' });
    });
}

export async function deleteProduct(
    request: DeleteProductRequest
): Promise<void> {
    const input = new DeleteProductInputDto(request);
    try {
        await productService.delete(input).then(() => {
            toast.success('Produto deletado com sucesso');
            router.push({ name: 'home' });
        });
    } catch (err) {
        console.error(err);
        toast.error('Erro ao deletar produto');
        throw err;
    }
}

export async function getProduct(
    request: getProductByIdRequest
): Promise<Entity> {
    const input = new GetProductInputDto(request);
    try {
        const product = await productService.getById(input);
        return new Entity(product);
    } catch (err) {
        console.error(err);
        toast.error('Erro ao buscar produto');
        throw err;
    }
}
