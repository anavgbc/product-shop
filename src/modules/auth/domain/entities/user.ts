import UserStructure from '../../../../shared/types/user';

export default class User {
    private value: UserStructure;

    constructor(value: UserStructure) {
        this.value = value;
    }

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
