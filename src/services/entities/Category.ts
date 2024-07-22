import UserStructure from '../types/Category';
import Entity from './entity';

export default class Category extends Entity<UserStructure> {
    get nome() {
        return this.value.nome;
    }

    get id() {
        return this.value.id;
    }
}
