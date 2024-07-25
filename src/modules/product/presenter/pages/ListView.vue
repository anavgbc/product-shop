<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

import { Card, CardContent, CardHeader, CardTitle } from '../../../../components/ui/card';
import Input from '../../../../components/ui/input/Input.vue';
import Separator from '../../../../components/ui/separator/Separator.vue';
import { Button } from '../../../../components/ui/button';

import Menu from '../components/Menu.vue';
import ProductCard from '../components/ProductCard.vue';
import ProductList from '../components/ProductList.vue';

import { Search } from 'lucide-vue-next';

import Product from '../../domain/entities/product';
import router from '../../../../registerModules/router';
import { getProducts } from '../../domain/controllers';
import Category from '../../../../modules/categories/domain/entities/category';
import { listCategories } from '../../../../modules/categories/domain/controllers';
import store from '../../store';

const categories = ref<Category[]>([]);
const products = ref<Product[]>([]);
const searchValue = ref<string>('');
const filteredList = ref<Product[] | null>(null);
const categorySelected = ref<string>('');

const productStore = store();

const clearFilters = () => {
    searchValue.value = '';
    filteredList.value = products.value;
    categorySelected.value = '';
};

const loadProducts = async () => {
    const result = await getProducts();
    productStore.setProducts(result);
    products.value = result;
};

const loadCategories = async () => {
    const result = await listCategories();
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

onMounted(() => {
    loadCategories();
    loadProducts();
});

</script>

<template>
    <Card class="bg-white h-4/5 w-11/12 rounded-sm drop-shadow-sm">
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
            <ProductList :category="categorySelected" :list="(displayedProducts as Product[])">
                <ProductCard v-for="product in displayedProducts" :key="product.id" :product="(product as Product)" />
            </ProductList>
        </CardContent>
    </Card>
</template>
