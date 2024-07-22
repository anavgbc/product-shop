import UserStructure from '../types/Product';
import Entity from './entity';

export default class Product extends Entity<UserStructure> {
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
