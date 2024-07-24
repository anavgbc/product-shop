import Product from '@/shared/types/product';

interface ProductStruture {
    nome?: string;
    valor?: number;
    categoria?: string;
    descricao?: string;
}

export interface UpdateProductByIdRequest {
    id: string;
    product: ProductStruture;
    productList: Product[];
}
