export default abstract class Dto<DataStructure = any> {
    constructor(public readonly value: DataStructure) {}
}
