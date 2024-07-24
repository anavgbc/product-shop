import UserStructure from '../../../../shared/types/product';

export default class Product {
    private value: UserStructure;

    constructor(value: UserStructure) {
        this.value = value;
    }

    get nome() {
        return this.value.nome;
    }

    get categoria() {
        return this.value.categoria;
    }

    get valor_formatado() {
        return this.value.valor.toLocaleString('pt-br', {
            style: 'currency',
            currency: 'BRL',
        });
    }

    get valor() {
        return this.value.valor;
    }

    get id() {
        return this.value.id;
    }

    get descricao() {
        return this.value.descricao && this.value.descricao;
    }
}
