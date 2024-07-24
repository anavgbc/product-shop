<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../../../components/ui/card';
import { formSchema } from '../utils/schema/create';
import { Form, GenericObject } from 'vee-validate';
import { Button } from '../../../../components/ui/button';
import Separator from '../../../../components/ui/separator/Separator.vue';
import Product from '../../domain/entities/product';
import Category from '@/modules/categories/domain/entities/category';
import { useProductStore } from '@/shared/stores/product';
import { getProducts, createProduct } from '../../domain/controllers';
import { listCategories } from '@/modules/categories/domain/controllers';
import MyInputField from '@/shared/components/MyInputField.vue';
import MySelectField from '@/shared/components/MySelectField.vue';
import MyTextarea from '@/shared/components/MyTextarea.vue';

const productStore = useProductStore();
const categories = ref<Category[]>([]);
const products = ref<Product[]>([]);

const loadCategories = async () => {
    const categoriesList = await listCategories();
    productStore.setCategories(categoriesList);
    categories.value = categoriesList;
};

const loadProducts = async () => {
    const productsList = await getProducts();
    productStore.setProducts(productsList);
    products.value = productsList;
};

onMounted(() => {
    loadCategories();
    loadProducts();
});

const onSubmit = (async (body: GenericObject) => {
    const product = {
        nome: body.nome,
        valor: body.valor,
        categoria: body.categoria,
        descricao: body.descricao,
    }
    createProduct({ product, productList: products.value });
});
</script>

<template>
    <Card class="bg-white h-4/5 w-11/12 rounded-sm drop-shadow-sm">
        <CardHeader class="flex flex-row align-center items-center justify-between px-4 py-4">
            <CardTitle class="text-lg">
                Cadastrar novo produto
            </CardTitle>
        </CardHeader>
        <Separator class="w-full" />
        <Form @submit="onSubmit" :validation-schema="formSchema">
            <CardContent>
                <div class="grid grid-cols-2 gap-4">
                    <MyInputField label="Nome do produto" placeholder="Nome do produto" name="nome" id="nome"
                        type="text" />
                    <MyInputField currency label="Valor" placeholder="R$ 0,00" name="valor" id="valor" type="text" />
                    <MySelectField title="Categorias" label="categoria" :items="categories as Category[]"
                        name="categoria" id="categoria" />
                    <MyTextarea label="descricao" id="descricao" name="descricao" />
                </div>
            </CardContent>
            <CardFooter class="gap-2 flex justify-end">
                <Button variant="secondary" size="default" type="submit">
                    Salvar
                </Button>
            </CardFooter>
        </Form>
    </Card>
</template>
