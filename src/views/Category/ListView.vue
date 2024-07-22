<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import Separator from '../../components/ui/separator/Separator.vue';
import CategoryDialog from './components/AddCategoryDialog.vue';
import Table from './components/Table.vue';

import { CategoriesService } from '../../services/CategoryService';
import Category from '../../services/entities/Category';
import DeleteCategoryInputDto from '../../services/dtos/Category/input/delete-category.dto';
import { toast } from 'vue-sonner';

const categories = ref<Category[] | null>(null);
const isLoading = ref<boolean>(false);

const categoriesService = new CategoriesService();

const toggleLoading = () => isLoading.value = !isLoading.value;

onBeforeMount(async () => {
    toggleLoading();
    await loadCategories();
    toggleLoading();
});

const loadCategories = async () => {
    const response = await categoriesService.getCategories();
    categories.value = response;
};

const handleDeleteCategory = async (categoryId: string) => {
    const input = new DeleteCategoryInputDto({ id: categoryId });
    await categoriesService.deleteCategory(input).then(() => {
        toast.success('Categoria excluída com sucesso');
        loadCategories();

    }).catch(() => {
        toast.error('Erro ao excluir categoria');
    });
}

</script>

<template>
    <Card class="bg-white h-4/5 w-11/12 rounded-sm drop-shadow-sm">
        <CardHeader class="flex flex-row align-center items-center justify-between px-4 py-4">
            <CardTitle class="text-lg">
                Listagem de categorias
            </CardTitle>
            <CategoryDialog @update:categories="loadCategories()" />
        </CardHeader>
        <Separator class="w-full" />
        <CardContent class="flex w-full justify-center align-center items-center ">
            <Table :categories="categories as Category[]" v-if="categories"
                @delete="(categoryId) => handleDeleteCategory(categoryId)" @update-list="loadCategories" />
        </CardContent>
    </Card>
</template>
