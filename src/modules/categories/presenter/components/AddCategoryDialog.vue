<script setup lang="ts">
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
import { formSchema } from '../utils/schema/create';
import MyInputField from '../../../../shared/components/MyInputField.vue';

const emit = defineEmits(['create:categories']);

const onSubmit = (async (values: GenericObject) => {
    emit('create:categories', values);
});
</script>

<template>
    <Dialog>
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
