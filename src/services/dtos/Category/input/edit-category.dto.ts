import Dto from '../../dto';

interface CategoryStructure {
    nome: string;
}

interface DataStructure {
    id: string;
    category: CategoryStructure;
}

export default class EditCategoryInputDto extends Dto<DataStructure> {}
