<script setup lang="ts">
import { useField, ErrorMessage } from 'vee-validate';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';

export interface Props {
  label?: string;
  placeholder?: string;
  name: string;
  id: string;
  type?: string;
  initialValue?: any;
  disabled?: boolean;
  currency?: boolean;
  hasIcon?: boolean;
}

const props = defineProps<Props>();

const {
  value: inputValue,
  handleBlur,
} = useField(props.name, undefined, {
  initialValue: props.initialValue,
});


const handleApplyMask = (event: any) => {
  if (props.currency) {
    const newRawValue = event.target.value.replace(/\D/g, '');

    const formattedValue = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(Number(newRawValue) / 100);

    inputValue.value = formattedValue;
  }
};

</script>

<template>
  <div class="flex flex-col gap-2 py-2">
    <Label v-if="label" class="pb-2" :for="name">{{ label }}</Label>
    <Input :label="label" :placeholder="placeholder" :name="name" :id="id" :type="type" v-model="inputValue"
      :disabled="disabled" @blur="handleBlur" @input="handleApplyMask" :class="{ 'pl-10': hasIcon }" />
    <ErrorMessage :name="name" class="text-red-500 px-2 text-sm" />
  </div>
</template>
