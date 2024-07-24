<script setup lang="ts">

import { PropType } from 'vue';
import Button from '../../../../components/ui/button/Button.vue';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '../../../../components/ui/table'
import { EllipsisVertical, Trash } from 'lucide-vue-next';

import EditCategoryDialog from './EditCategoryDialog.vue';
import Category from '../../domain/entities/category';

defineProps({
    categories: {
        type: Object as PropType<Category[]>,
        required: true,
    },
});

const emit = defineEmits(['delete', 'updateList']);

</script>

<template>
    <Table class="w-full overflow-y-auto overflow">
        <TableHeader>
            <TableRow>
                <TableHead class="w-[100px]">
                    Nome
                </TableHead>
                <TableHead class="text-right">
                    id
                </TableHead>
                <TableHead class="text-right">
                    <span class="flex items-end justify-end px-2">
                        <EllipsisVertical class="size-4 text-muted-foreground" />
                    </span>
                </TableHead>
            </TableRow>
        </TableHeader>
        <TableBody class="max-h-full">
            <TableRow v-for="category in categories" :key="category.id">
                <TableCell class="font-medium">
                    {{ category.nome }}
                </TableCell>
                <TableCell class="text-right">
                    {{ category.id }}
                </TableCell>
                <TableCell class="text-right">
                    <EditCategoryDialog :category="category" :categories="categories"
                        @update:categories="emit('updateList')" />
                    <Button variant="ghost" class="rounded-full w-8 h-8 p-0 hover:bg-gray-200"
                        @click="emit('delete', category.id)">
                        <Trash class="size-3 text-muted-foreground" />
                    </Button>
                </TableCell>
            </TableRow>
        </TableBody>
    </Table>
</template>
