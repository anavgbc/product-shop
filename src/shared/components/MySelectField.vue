<script setup lang="ts">
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Category from '@/modules/categories/domain/entities/category';
import { ErrorMessage, useField } from 'vee-validate';

export interface Props {
    label: string;
    placeholder?: string;
    name: string;
    id: string;
    initialValue?: any;
    disabled?: boolean;
    items: Category[];
    title: string;
}

const props = defineProps<Props>();

const {
    value: inputValue,
    handleChange,
} = useField(props.name, undefined, {
    initialValue: props.initialValue,
});

</script>

<template>

    <div class="flex flex-col gap-3">
        <Label class="pb-2" for="categoria">{{ props.title }}</Label>
        <Select v-model="inputValue" :id="props.id" :disabled="props.disabled" :placeholder="props.placeholder"
            :label="props.label" :items="props.items" item-title="label" item-value="value" @input="handleChange">
            <SelectTrigger class="w-full">
                <SelectValue placeholder="Categorias" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup v-for="item in items" :key="item.id">
                    <SelectItem :value="item.id">
                        {{ item.nome }}
                    </SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
        <ErrorMessage :name="name" class="text-red-500 px-2 text-sm" />

    </div>
</template>
