<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';
import { ProductService } from '../../services/ProductService';
import { useProductStore } from '../../store';
import { formSchema } from './schema/create';
import { Form, GenericObject } from 'vee-validate';
import { toast } from 'vue-sonner';

import router from '../../router';

import { formatCurrencyToNumber, genereateId } from '../../utils/Product';

import Category from '../../services/entities/Category';
import CreateProductInputDto from '../../services/dtos/Product/input/create-product.dto';
import { CategoriesService } from '../../services/CategoryService';
import MyInputField from '../../components/MyInputField.vue';
import MySelectField from '../../components/MySelectField.vue';
import MyTextarea from '../../components/MyTextarea.vue';
import { Button } from '../../components/ui/button';
import Separator from '../../components/ui/separator/Separator.vue';
import Product from '../../services/entities/Product';

const productService = new ProductService();
const categoriesService = new CategoriesService();

const productStore = useProductStore();

const categories = ref<Category[]>([]);
const products = ref<Product[]>([]);

const loadCategories = async () => {
    const categoriesList = await categoriesService.getCategories();
    productStore.setCategories(categoriesList);

    return categoriesList;
};

const loadProducts = async () => {
    const productsList = await productService.getProducts();
    productStore.setProducts(productsList);
    return productsList;
};

onMounted(async () => {
    categories.value = await loadCategories();
    products.value = await loadProducts();
});

const onSubmit = (async (body: GenericObject) => {
    const productAlreadyExists = products.value.find((product) => product.nome.toLowerCase() === body.nome.toLowerCase());

    if (productAlreadyExists) {
        toast.error('Produto já cadastrado');
        return;
    }

    const input = new CreateProductInputDto({
        nome: body.nome,
        valor: formatCurrencyToNumber(body.valor),
        categoria: body.categoria,
        descricao: body.descricao,
        id: genereateId(),
    })

    await productService.createProduct(input).then(() => {
        toast.success('Produto cadastrado com sucesso');
        router.push({ name: 'home' });
    }).catch(() => {
        toast.error('Erro ao cadastrar produto');
    });
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
