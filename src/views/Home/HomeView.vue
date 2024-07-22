<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue';

import Card from '../../components/ui/card/Card.vue';
import Input from '../../components/ui/input/Input.vue';
import CardContent from '../../components/ui/card/CardContent.vue';
import CardHeader from '../../components/ui/card/CardHeader.vue';
import Separator from '../../components/ui/separator/Separator.vue';
import CardTitle from '../../components/ui/card/CardTitle.vue';
import { Button } from '../../components/ui/button';

import Menu from './components/Menu.vue';
import ProductCard from './components/ProductCard.vue';
import ProductList from './components/ProductList.vue';

import { Search } from 'lucide-vue-next';

import { ProductService } from '../../services/ProductService';
import { useProductStore } from '../../store';

import router from '../../router';

import Product from '../../services/entities/Product';
import Category from '../../services/entities/Category';
import { CategoriesService } from '../../services/CategoryService';

const categories = ref<Category[]>([]);
const products = ref<Product[]>([]);
const searchValue = ref<string>('');
const filteredList = ref<Product[] | null>(null);
const categorySelected = ref<string>('');

const productService = new ProductService();
const categoriesService = new CategoriesService();

const productStore = useProductStore();

const clearFilters = () => {
    searchValue.value = '';
    filteredList.value = products.value;
    categorySelected.value = '';
};

const loadProducts = async () => {
    const result = await productService.getProducts();
    productStore.setProducts(result);
    products.value = result;
};

const loadCategories = async () => {
    const result = await categoriesService.getCategories();
    productStore.setCategories(result);
    categories.value = result;
};

const handleSearch = () => {
    if (searchValue.value !== '') {
        const items = products.value.filter((item) =>
            item.nome.toLowerCase().includes(searchValue.value.toLowerCase())
        );
        filteredList.value = items;
    } else {
        clearFilters();
    }
};

const displayedProducts = computed(() => {
    return filteredList.value || searchValue.value !== ""
        ? filteredList.value
        : products.value;
});

const handleFilterByCategory = (categoryId: string) => {
    if (categoryId === '0') {
        clearFilters();
    } else {
        filteredList.value = products.value.filter((product) =>
            Number(product.categoria) === Number(categoryId)
        );

        const category = categories.value.find((category) => category.id === categoryId);
        categorySelected.value = category ? category.nome : '';
    }
};


onBeforeMount(async () => {
    await loadCategories();
    await loadProducts();
});

</script>

<template>
    <Card class="bg-white h-4/5 w-12/13 rounded-sm drop-shadow-sm">
        <CardHeader class="flex flex-row align-center items-center justify-between px-4 py-4">
            <div class="flex gap-6 w-2/3 items-center">
                <CardTitle class="text-lg px-2">Produtos</CardTitle>
                <div class="relative w-full max-w-sm items-center">
                    <Input id="search" type="text" placeholder="Procurar por nome" class="pl-10 w-5/6"
                        v-model="searchValue" @input="handleSearch" />
                    <span class="absolute start-0 inset-y-0 flex items-center justify-center px-4">
                        <Search class="size-3 text-muted-foreground" />
                    </span>
                </div>
            </div>
            <div class="flex flex-row justify-end gap-3">
                <Menu :categories="categories as Category[]" title="Filtrar categoria"
                    @change="(categoryId) => handleFilterByCategory(categoryId)" />
                <Button variant="outline" size="sm" class="text-black border-lg "
                    @click="router.push({ name: 'create' })">Adicionar
                    Produto</Button>
            </div>
        </CardHeader>
        <Separator label="" />
        <CardContent v-if="products" class="flex flex-col overflow-y-auto h-5/6">
            <ProductList :category="categorySelected" :list="displayedProducts as Product[]">
                <ProductCard v-for="product in displayedProducts" :key="product.id" :product="product as Product" />
            </ProductList>
        </CardContent>
    </Card>
</template>
