<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';
import Separator from '../../components/ui/separator/Separator.vue';
import Button from '../../components/ui/button/Button.vue';

import DeleteProductInputDto from '../../services/dtos/Product/input/delete-product.dto';
import GetProductInputDto from '../../services/dtos/Product/input/retrieve-product.dto';
import { CategoriesService } from '../../services/CategoryService';
import { ProductService } from '../../services/ProductService'
import Product from '../../services/entities/Product';
import Category from '../../services/entities/Category';

import { formSchema } from './schema/edit';
import { Form, GenericObject, } from 'vee-validate';
import { toast } from 'vue-sonner';
import router from '../../router';
import MySelectField from '../../components/MySelectField.vue';
import MyTextarea from '../../components/MyTextarea.vue';
import EditProductInputDto from '../../services/dtos/Product/input/edit-product.dto';
import MyInputField from '../../components/MyInputField.vue';
import { formatCurrencyToNumber } from '../../utils/Product';

const productService = new ProductService();
const categoryService = new CategoriesService();

const route = useRoute();

const product = ref<Product | null>(null);
const products = ref<Product[]>([]);
const categories = ref<Category[]>([]);

const productId = route.params.id.toString();

const loadCategories = async () => {
    categories.value = await categoryService.getCategories();
};

const loadProduct = async (productId: string) => {
    try {
        const input = new GetProductInputDto({ id: productId });
        product.value = await productService.getProductById(input);
    } catch (e) {
        toast.error('Erro ao carregar produto');
        router.push({ name: 'home' });
    }
};

const loadProducts = async () => {
    products.value = await productService.getProducts();
};

const handleDelete = async () => {
    const input = new DeleteProductInputDto({ id: productId });

    await productService.deleteProduct(input).then(() => {
        toast.success('Produto excluído com sucesso');
        router.push({ name: 'home' });
    });
};

const checkIfProductExists = (name: string, id: string) => {
    const product = products.value.find(product => product.nome.toLowerCase() === name.toLowerCase());
    return product && product.id !== id;
};

const onSubmit = async (body: GenericObject) => {
    try {
        typeof body.valor === 'string' && (body.valor = formatCurrencyToNumber(body.valor));

        if (checkIfProductExists(body.nome, productId)) {
            toast.error('Produto já cadastrado');
            return;
        }

        const input = new EditProductInputDto({
            id: productId,
            product: body
        });

        await productService.updateProduct(input);
        toast.success('Produto atualizado com sucesso');
        router.push({ name: 'home' });
    } catch (error) {
        toast.error('Erro ao atualizar produto');
    }
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
