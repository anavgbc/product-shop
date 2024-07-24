import Product from '@/shared/types/product/index';

interface ProductStructure {
    nome: string;
    valor: string;
    categoria: string;
    descricao?: string;
}

export interface CreateProductRequest {
    product: ProductStructure;
    productList: Product[];
}
