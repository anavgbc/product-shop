<script setup lang="ts">
import { Button } from './ui/button';
import { Card } from './ui/card';
import { LogOut, Menu } from 'lucide-vue-next';
import { useUserStore } from '../stores/user';

const emit = defineEmits(['openSidebar']);
const userStore = useUserStore();
</script>

<template>
    <header>
        <Card class="bg-white w-full h-14 rounded-none drop-shadow-sm flex items-center justify-around">
            <span class="absolute start-0 inset-y-0 flex items-center justify-start px-4 w-1/3">
                <Menu class="size-6 text-muted-foreground cursor-pointer" @click="emit('openSidebar')" />
            </span>
            <span class="w-2/3">
                <p class="font-semibold text-lg">Product Shop</p>
            </span>
            <Button variant="ghost" class="rounded-full w-10 h-10 p-0 bg-none text-black hover:bg-gray-200"
                @click="userStore.logout">
                <LogOut class="size-4 text-muted-foreground text-black" />
            </Button>
        </Card>
    </header>
</template>
