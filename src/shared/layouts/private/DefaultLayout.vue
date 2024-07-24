<script setup lang="ts">
import Navbar from '@/shared/components/Navbar.vue';
import Sidebar from '@/shared/components/Sidebar.vue';
import { ref } from 'vue';

const isOpenSidebar = ref<boolean>(true);
</script>

<template>
    <main class="w-full h-full bg-gray-200">
        <Navbar @open-sidebar="isOpenSidebar = !isOpenSidebar" />
        <div class="w-full h-screen flex justify-between">
            <Sidebar v-if="isOpenSidebar" />
            <div class="items-center h-screen w-screen flex justify-center align-start">
                <router-view />
            </div>
        </div>
    </main>
</template>
