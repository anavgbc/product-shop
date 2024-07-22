import Dto from '../../dto';

interface DataStructure {
    id: string;
    nome: string;
    valor: number;
    categoria: string;
    descricao?: string;
}

export default class GetAllProductsInputDto extends Dto<DataStructure> {}
