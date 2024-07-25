<script setup lang="ts">
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from '../../../../components/ui/dropdown-menu';
import Button from '../../../../components/ui/button/Button.vue';
import Category from '../../../../modules/categories/domain/entities/category';

export interface Props {
    categories: Category[];
    title: string
};

defineProps<Props>();

const emit = defineEmits(['change']);

const handleCategorySelection = (categoryId: string) => {
    emit('change', categoryId);
};
</script>

<template>
    <DropdownMenu>
        <DropdownMenuTrigger as-child>
            <Button variant="secondary" size="sm" class="bg-indigo-700 text-white hover:text-black">
                {{ title }}
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent class="w-56">
            <DropdownMenuRadioGroup>
                <DropdownMenuRadioItem value="0" @click="handleCategorySelection('0')">Mostrar tudo
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem :value="category.id" @click="handleCategorySelection(category.id)"
                    v-for="category in categories">
                    {{ category.nome }}
                </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
        </DropdownMenuContent>
    </DropdownMenu>
</template>
