<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { PropType } from 'vue';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../../../../components/ui/dialog';
import Button from '../../../../components/ui/button/Button.vue';

import { Form, GenericObject } from 'vee-validate';
import { Pencil } from 'lucide-vue-next';
import Category from '../../domain/entities/category';
import { formSchema } from '../utils/schema/edit.ts';
import MyInputField from '@/shared/components/MyInputField.vue';
import { updateCategory } from '../../domain/controllers';

const props = defineProps({
    category: {
        type: Object as PropType<Category>,
        required: true,
    },
    categories: {
        type: Object as PropType<Category[]>,
        required: true,
    },
});

const emit = defineEmits(['update:categories']);

const categories = ref<Category[]>([]);
const isOpen = ref<boolean>(false);

onMounted(() => {
    categories.value = props.categories;
});

const onSubmit = (async (values: GenericObject) => {
    const request = {
        id: props.category.id,
        category: {
            nome: values.nome,
        },
        categoryList: categories.value,
    };

    await updateCategory(request).then(() => {
        emit('update:categories');
        isOpen.value = false;
    });
});

const initialValues = computed(() => {
    return {
        nome: props.category.nome,
    };
});
</script>

<template>
    <Dialog v-model:open="isOpen">
        <DialogTrigger as-child class="w-full">
            <Button variant="ghost" class="rounded-full w-8 h-8 p-0">
                <Pencil class="size-3 text-muted-foreground" />
            </Button>
        </DialogTrigger>
        <DialogContent class="py-9">
            <Form @submit="onSubmit" :initial-values="initialValues" :validation-schema="formSchema">
                <DialogHeader class="flex flex-row justify-between pe-6">
                    <DialogTitle>Editar {{ category.nome }}</DialogTitle>
                </DialogHeader>
                <DialogDescription class="px-3 pt-4">
                    <MyInputField label="Nome da categoria" placeholder="Nome da categoria" name="nome" id="nome"
                        type="text" />
                </DialogDescription>
                <DialogFooter class="pt-3">
                    <Button type="submit">Salvar</Button>
                </DialogFooter>
            </Form>
        </DialogContent>
    </Dialog>
</template>
