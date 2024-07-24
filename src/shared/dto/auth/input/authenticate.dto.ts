import Dto from '../../dto';

interface DataStructure {
    email: string;
    senha: string;
}

export default class AuthenticateInputDto extends Dto<DataStructure> {}
