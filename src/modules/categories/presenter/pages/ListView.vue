<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../components/ui/card';
import Separator from '../../../../components/ui/separator/Separator.vue';

import { GenericObject } from 'vee-validate';
import { createCategory, deleteCategory, listCategories } from '../../domain/controllers';
import Category from '../../domain/entities/category';
import Table from '../components/Table.vue';
import AddCategoryDialog from '../components/AddCategoryDialog.vue';
import { DeleteCategoryRequest } from '../../../../shared/types/category/request/delete-category';

const categories = ref<Category[] | null>(null);
const isLoading = ref<boolean>(false);
const isOpenModal = ref<boolean>(false);

const toggleLoading = () => isLoading.value = !isLoading.value;

onBeforeMount(() => {
    toggleLoading();
    loadCategories();
    toggleLoading();
});

const loadCategories = async () => {
    const response = await listCategories();
    categories.value = response;
};

const handleDeleteCategory = async (categoryId: string) => {
    const request = { id: categoryId } as DeleteCategoryRequest;
    await deleteCategory(request).then(() => {
        loadCategories();
    });
}

const handleCreateCategory = async (body: GenericObject) => {
    if (categories.value) {
        await createCategory({ nome: body.nome, categoryList: categories.value });
    }
    loadCategories();
    handleOpenModal()
}

const handleOpenModal = () => {
    isOpenModal.value = !isOpenModal.value;
};

</script>

<template>
    <Card class="bg-white h-4/5 w-11/12 rounded-sm drop-shadow-sm overflow-y-auto">
        <CardHeader class="flex flex-row align-center items-center justify-between px-4 py-4">
            <CardTitle class="text-lg">
                Listagem de categorias
            </CardTitle>
            <AddCategoryDialog v-model:open="isOpenModal" @create:categories="(value) => handleCreateCategory(value)" />
        </CardHeader>
        <Separator class="w-full" />
        <CardContent class="flex w-full justify-center align-center items-center ">
            <Table :categories="categories as Category[]" v-if="categories"
                @delete="(categoryId) => handleDeleteCategory(categoryId)" @update-list="loadCategories" />
        </CardContent>
    </Card>
</template>
