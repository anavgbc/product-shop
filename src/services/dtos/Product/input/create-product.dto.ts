import Dto from '../../dto';

interface DataStructure {
    id: string;
    nome: string;
    valor: number;
    categoria: string;
    descricao?: string;
}

export default class CreateProductInputDto extends Dto<DataStructure> {}
