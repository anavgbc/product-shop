<script setup lang="ts">
import { PropType } from 'vue';
import Product from '../../../services/entities/Product';

defineProps({
    category: {
        type: String,
        required: true,
    },
    list: {
        type: Object as PropType<Product[] | null>,
        required: true,
    },
});

</script>

<template>
    <span class="py-4 flex gap-2 px-2" v-if="category">
        <p>Mostrando resultados para: </p>
        <p class="font-bold">{{ category }}</p>

    </span>
    <div v-if="list && list.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        <slot></slot>
    </div>
    <div v-else class="flex justify-center items-center w-full py-5 h-full">
        Não foram encontrados resultados.
    </div>
</template>
