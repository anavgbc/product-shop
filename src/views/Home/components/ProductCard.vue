<script setup lang="ts">
import { PropType } from 'vue';
import Card from '../../../components/ui/card/Card.vue';
import CardContent from '../../../components/ui/card/CardContent.vue';
import CardTitle from '../../../components/ui/card/CardTitle.vue';
import CardHeader from '../../../components/ui/card/CardHeader.vue';
import { Button } from '../../../components/ui/button';
import { Heart, Pencil } from 'lucide-vue-next';
import ProductDialog from './ProductDialog.vue';
import router from '../../../router';
import Product from '../../../services/entities/Product';

defineProps({
    product: {
        type: Object as PropType<Product>,
        required: true,
    },
});

const emit = defineEmits(['favorited']);

const handleFavorite = (productId: string) => {
    emit('favorited', productId);
};
</script>

<template>
    <Card class="w-44 h-56 flex flex-col justify-center items-center rounded-sm drop-shadow-sm hover:shadow-md ">
        <CardHeader class="flex justify-end w-full flex-row p-0 py-3 px-2">
            <Button variant="ghost" class="p-2 rounded-full w-8 h-8 p-0"
                @click="router.push(`/edit/product/${product.id}`)">
                <Pencil class="size-3 text-muted-foreground" />
            </Button>
            <Button variant="ghost" class="p-2 rounded-full w-8 h-8 p-0">
                <Heart class="size-3 text-muted-foreground" @click="handleFavorite(product.id)" />
            </Button>
        </CardHeader>
        <CardContent class="w-full h-5/6 flex justify-between items-center flex-col text-center">
            <CardTitle class="text-lg">
                {{ product.nome }}
            </CardTitle>
            <ProductDialog :product="product" />
        </CardContent>
    </Card>
</template>
