import Category from '../../modules/categories/domain/entities/category';
import Product from './domain/entities/product';
import { defineStore } from 'pinia';

interface State {
    categories: Category[];
    products: Product[];
    favorites: Product[];
}

export default defineStore('product', {
    state: (): State => ({
        categories: [],
        products: [],
        favorites: [],
    }),
    actions: {
        setCategories(categories: Category[]) {
            this.categories = categories;
        },
        setProducts(products: Product[]) {
            this.products = products.sort(
                (a: { nome: string }, b: { nome: string }) =>
                    a.nome.localeCompare(b.nome)
            );
        },
        setFavorites(product: Product) {
            this.favorites = [...this.favorites, product];
        },
    },
    getters: {
        getCategories(state) {
            return state.categories;
        },
        getProducts(state) {
            return state.products;
        },
        getFavorites(state) {
            return state.favorites;
        },
    },
});