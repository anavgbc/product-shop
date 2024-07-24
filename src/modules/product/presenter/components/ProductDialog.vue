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
import { onMounted, PropType } from 'vue';
import { ref } from 'vue';
import Badge from '../../../../components/ui/badge/Badge.vue';
import { Coins } from 'lucide-vue-next';
import Product from '../../domain/entities/product';
import Category from '@/modules/categories/domain/entities/category';
import { findCategoryById } from '@/shared/utils';
import { useProductStore } from '@/shared/stores/product';

defineProps({
    product: {
        type: Object as PropType<Product>,
        required: true,
    },
});

const categories = ref<Category[]>([]);

onMounted(() => {
    const productStore = useProductStore();
    categories.value = productStore.getCategories;
});

const renderCategory = (id: string) => {
    const selectedCategory = findCategoryById((categories.value as Category[]), id)?.nome;
    return selectedCategory ? selectedCategory : 'Não informado';
};

</script>

<template>
    <Dialog>
        <DialogTrigger as-child class="w-full">
            <Button variant="secondary" class="bg-indigo-700 text-white w-full hover:bg-indigo-800"
                size="xs">Detalhes</Button>
        </DialogTrigger>
        <DialogContent class="py-9">
            <DialogHeader class="flex flex-row justify-between pe-6">
                <DialogTitle>{{ product.nome }}</DialogTitle>
                <Badge class="items-center" v-if="categories" variant="outline">
                    <p class="py-1 px-1">{{ renderCategory(product.categoria) }}</p>
                </Badge>
            </DialogHeader>
            <DialogDescription class="px-3">
                {{ product.descricao ? product.descricao : 'Produto sem descrição' }}
            </DialogDescription>
            <DialogFooter class="pt-3">
                <span class=" flex items-center justify-center px-2">
                    <Coins class="size-4 text-muted-foreground" />
                </span>
                {{ product.valor_formatado }}
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>
