import CategoryStructure from '../../../../shared/types/category';

export default class Category {
    private value: CategoryStructure;

    constructor(value: CategoryStructure) {
        this.value = value;
    }

    get nome() {
        return this.value.nome;
    }
    get id() {
        return this.value.id;
    }
}
