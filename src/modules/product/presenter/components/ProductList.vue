<script setup lang="ts">
import Product from '../../domain/entities/product';

export interface Props {
    category: string;
    list: Product[];
}

defineProps<Props>();
</script>

<template>
    <span class="py-4 flex gap-2 px-2" v-if="category">
        <p>Mostrando resultados para: </p>
        <p class="font-bold">{{ category }}</p>

    </span>
    <div v-if="list && list.length > 0"
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 p-2">
        <slot></slot>
    </div>
    <div v-else class="flex justify-center items-center w-full py-5 h-full">
        Não foram encontrados resultados.
    </div>
</template>
