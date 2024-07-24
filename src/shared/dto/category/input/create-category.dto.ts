import Dto from '../../dto';

interface DataStructure {
    id: string;
    nome: string;
}

export default class CreateCategoryInputDto extends Dto<DataStructure> {}
