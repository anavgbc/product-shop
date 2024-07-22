import UserStructure from '../types/User';
import Entity from './entity';

export default class User extends Entity<UserStructure> {
    get nome() {
        return this.value.nome;
    }

    get email() {
        return this.value.email;
    }

    get senha() {
        return this.value.senha;
    }

    get id() {
        return this.value.id;
    }
}
