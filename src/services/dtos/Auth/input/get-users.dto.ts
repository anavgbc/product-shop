import Dto from '../../dto';

interface DataStructure {
    nome: string;
    email: string;
    senha: string;
    id: string;
}

export default class GetAllUsersInputDto extends Dto<DataStructure[]> {}
