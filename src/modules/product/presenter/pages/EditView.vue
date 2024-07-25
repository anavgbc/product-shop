<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../../../components/ui/card';
import Separator from '../../../../components/ui/separator/Separator.vue';
import Button from '../../../../components/ui/button/Button.vue';

import { formSchema } from '../utils/schema/edit';
import { Form, GenericObject, } from 'vee-validate';
import Product from '../../domain/entities/product';
import Category from '../../../../modules/categories/domain/entities/category';
import { deleteProduct, getProduct, getProducts, updateProduct } from '../../domain/controllers';
import { formatCurrencyToNumber } from '../../../../shared/utils';
import { listCategories } from '../../../../modules/categories/domain/controllers';
import MyInputField from '../../../../shared/components/MyInputField.vue';
import MySelectField from '../../../../shared/components/MySelectField.vue';
import MyTextarea from '../../../../shared/components/MyTextarea.vue';
import { UpdateProductByIdRequest } from '../../../../shared/types/product/requests/update-product';

const route = useRoute();

const product = ref<Product | null>(null);
const products = ref<Product[]>([]);
const categories = ref<Category[]>([]);

const productId = route.params.id.toString();

const loadCategories = async () => {
    categories.value = await listCategories();
};

const loadProduct = async (productId: string) => {
    const input = ({ id: productId });
    product.value = await getProduct(input);
};

const loadProducts = async () => {
    products.value = await getProducts();
};

const handleDelete = async () => {
    const request = { id: productId };
    await deleteProduct(request);
};

const onSubmit = async (body: GenericObject) => {
    typeof body.valor === 'string' && (body.valor = formatCurrencyToNumber(body.valor));

    const product = {
        nome: body.nome,
        valor: body.valor,
        categoria: body.categoria,
        descricao: body.descricao,
    }

    await updateProduct({
        id: productId,
        product: product,
        productList: products.value
    } as UpdateProductByIdRequest);

};

const getValidCategory = () => {
    const categoryExists = categories.value.find(category => category.id === product.value?.categoria);
    return categoryExists ? product.value?.categoria : categories.value[0].id;
};

const initialValues = computed(() => {
    return {
        nome: product.value?.nome,
        valor: product.value?.valor,
        descricao: product.value?.descricao,
        categoria: getValidCategory(),
    };
});

onMounted(async () => {
    await loadCategories();
    await loadProduct(productId);
    await loadProducts();
});
</script>

<template>
    <Card class="bg-white h-4/5 w-11/12 rounded-sm drop-shadow-sm" v-if="product">
        <CardHeader class=" flex flex-row align-center items-center justify-between px-4 py-4">
            <CardTitle class="text-lg">
                Editar {{ product.nome }}
            </CardTitle>
        </CardHeader>
        <Separator class="w-full" />
        <Form @submit="onSubmit" :initial-values="initialValues" :validation-schema="formSchema">
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
                <Button variant="destructive" size="default" @click="handleDelete" type="button">
                    Excluir
                </Button>
                <Button variant="default" size="default" type="submit">
                    Salvar
                </Button>
            </CardFooter>
        </Form>
    </Card>
</template>
