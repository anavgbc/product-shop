<script setup lang="ts">
import router from '@/registerModules/router';

</script>

<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
        <div class="text-center">
            <h1 class="text-9xl font-bold text-gray-800">404</h1>
            <p class="text-2xl font-medium text-gray-600 mb-8">Página Não Encontrada</p>
            <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
                @click="router.push({ name: 'login' })">
                Voltar para a Página Inicial
            </button>
        </div>
    </div>
</template>