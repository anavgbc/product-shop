<script setup lang="ts">
import { Book, Heart, Home } from 'lucide-vue-next';

import { onMounted, ref } from 'vue';
import User from '../../modules/auth/domain/entities/user';
import { routerNavigation } from '../../shared/constants/string';
import { Avatar, AvatarImage } from './ui/avatar';
import { Card } from './ui/card';
import router from '../../registerModules/router';
import { useUserStore } from '../stores/user';

const iconMap: Record<string, any> = {
    Home,
    Heart,
    Book,
};

const userStore = useUserStore();
const isAuthenticated = ref<boolean | undefined>(false);
const user = ref<User | null>(null)

const loadUser = () => {
    const data = userStore.getToken;
    isAuthenticated.value = data;
    if (isAuthenticated.value) {
        user.value = userStore.getUser;
    }
};

onMounted(() => {
    loadUser();
});

</script>

<template>
    <Card
        class="bg-indigo-900  text-gray-300  h-full w-1/6 rounded-none drop-shadow-sm flex flex-col items-center py-4 px-4">
        <span class="flex flex-row items-center w-full gap-2 px-1 py-4 font-medium" v-if="user">
            <Avatar class="w-8 h-8 rounded-full">
                <AvatarImage
                    src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541" />
            </Avatar>
            <p class="px-1">{{ user?.nome }}</p>
        </span>
        <span class=" hover:opacity-50 w-full py-3 flex flex-row items-center justify-start cursor-pointer px-2"
            v-for="item in routerNavigation" :key="item.name" @click="router.push({ name: item.name })">
            <component :is="iconMap[item.icon]" class="size-4" />
            <p class="px-2 hover:text-white">{{ item.title }}</p>
        </span>
    </Card>
</template>
