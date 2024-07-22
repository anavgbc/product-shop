export default class Entity<EntityStructure = any> {
    constructor(protected readonly value: EntityStructure) {}
}
