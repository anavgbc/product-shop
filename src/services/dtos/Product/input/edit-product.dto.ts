import Dto from '../../dto';

interface ProductStruture {
    nome?: string;
    valor?: number;
    categoria?: string;
    descricao?: string;
}

interface DataStructure {
    id: string;
    product: ProductStruture;
}

export default class EditProductInputDto extends Dto<DataStructure> {}
