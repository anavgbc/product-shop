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
import { GenericObject } from 'vee-validate';
import CreateCategoryInputDto from '../../services/dtos/Category/input/create-category.dto';
import { genereateId } from '../../utils/Product';

const categories = ref<Category[] | null>(null);
const isLoading = ref<boolean>(false);
const isOpenModal = ref<boolean>(false);

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

const handleCreateCategory = async (body: GenericObject) => {
    const existingCategory = categories.value?.find(category =>
        category.nome.toLowerCase() === body.nome.toLowerCase()
    );

    if (existingCategory) {
        toast.error(`Categoria "${existingCategory.nome}" já cadastrada`);
        return;
    }

    const payload = new CreateCategoryInputDto({
        nome: body.nome,
        id: genereateId()
    });

    await categoriesService.createCategory(payload).then((response) => {
        toast.success(`Categoria ${response.nome} cadastrada com sucesso!`);
        loadCategories();
        handleOpenModal()

    }).catch(() => {
        toast.error('Erro ao cadastrar categoria');
    });
}

const handleOpenModal = () => {
    isOpenModal.value = !isOpenModal.value;
};

</script>

<template>
    <Card class="bg-white h-4/5 w-11/12 rounded-sm drop-shadow-sm">
        <CardHeader class="flex flex-row align-center items-center justify-between px-4 py-4">
            <CardTitle class="text-lg">
                Listagem de categorias
            </CardTitle>
            <CategoryDialog v-model:open="isOpenModal" @create:categories="(value) => handleCreateCategory(value)" />
        </CardHeader>
        <Separator class="w-full" />
        <CardContent class="flex w-full justify-center align-center items-center ">
            <Table :categories="categories as Category[]" v-if="categories"
                @delete="(categoryId) => handleDeleteCategory(categoryId)" @update-list="loadCategories" />
        </CardContent>
    </Card>
</template>
