<script setup lang="ts">
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { useField } from 'vee-validate';

export interface Props {
  label: string;
  placeholder?: string;
  name: string;
  id: string;
  initialValue?: any;
  disabled?: boolean;
}

const props = defineProps<Props>();

const {
  value: inputValue,

} = useField(props.name, undefined, {
  initialValue: props.initialValue,
});

</script>

<template>
  <div class="col-span-2 flex flex-col gap-3">
    <Label :for="name">Descrição</Label>
    <Textarea :label="label" :placeholder="placeholder" :name="name" :id="id" v-model="inputValue" :disabled="disabled"
      class="h-32" />
  </div>
</template>

<style></style>
