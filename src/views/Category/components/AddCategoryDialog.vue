<script setup lang="ts">
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../../../components/ui/dialog';
import Button from '../../../components/ui/button/Button.vue';
import { Form, GenericObject } from 'vee-validate';
import { genereateId } from '../../../utils/Product';
import { CategoriesService } from '../../../services/CategoryService';
import { toast } from 'vue-sonner';
import CreateCategoryInputDto from '../../../services/dtos/Category/input/create-category.dto';
import { formSchema } from '../schema/create';
import MyInputField from '../../../components/MyInputField.vue';
import { useProductStore } from '../../../store';
import { ref } from 'vue';

const emit = defineEmits(['update:categories']);
const categoriesService = new CategoriesService();
const productStore = useProductStore();
const isOpen = ref<boolean>(false);


const onSubmit = (async (values: GenericObject) => {
    const existingCategory = productStore.getCategories.find(category =>
        category.nome.toLowerCase() === values.nome.toLowerCase()
    );

    if (existingCategory) {
        toast.error(`Categoria "${existingCategory.nome}" já cadastrada`);
        return;
    }

    const payload = new CreateCategoryInputDto({
        nome: values.nome,
        id: genereateId()
    });

    await categoriesService.createCategory(payload).then((response) => {
        toast.success(`Categoria ${response.nome} cadastrada com sucesso!`);
        emit('update:categories');
        isOpen.value = false;

    }).catch(() => {
        toast.error('Erro ao cadastrar categoria');
    });

});
</script>

<template>
    <Dialog v-model:open="isOpen">
        <DialogTrigger as-child class="w-full">
            <Button variant="secondary" size="sm" class="bg-indigo-900 text-white w-1/6 hover:bg-indigo-800">
                Adicionar Categoria
            </Button>
        </DialogTrigger>
        <DialogContent class="py-9">
            <Form @submit="onSubmit" :validation-schema="formSchema">
                <DialogHeader class="flex flex-row justify-between pe-6">
                    <DialogTitle>Cadastrar categoria</DialogTitle>
                </DialogHeader>
                <DialogDescription class="px-3 pt-4">
                    <MyInputField placeholder="Nome da categoria" name="nome" id="nome" type="text" />
                </DialogDescription>
                <DialogFooter class="pt-3">
                    <Button type="submit">Salvar</Button>
                </DialogFooter>
            </Form>
        </DialogContent>
    </Dialog>
</template>
