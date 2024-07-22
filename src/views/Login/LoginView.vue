<script setup lang="ts">
import Button from '../../components/ui/button/Button.vue';
import Separator from '../../components/ui/separator/Separator.vue';
import LoginCard from './components/LoginCard.vue';

import { MessageCircle, Phone } from 'lucide-vue-next';
import { Search } from 'lucide-vue-next';
import { Mail } from 'lucide-vue-next';
import { toast } from 'vue-sonner';

import router from '../../router';
import { Form, GenericObject } from 'vee-validate';

import { AuthService } from '../../services/AuthService';
import AuthenticateInputDto from '../../services/dtos/Auth/input/authenticate.dto';
import { useUserStore } from '../../store';
import MyInputField from '../../components/MyInputField.vue';

const authService = new AuthService();
const userStore = useUserStore();

const onSubmit = (async (values: GenericObject) => {
    const input = new AuthenticateInputDto({
        email: values.email,
        senha: values.senha,
    });
    const response = await authService.Authenticate(input);
    const firstUser = response && response[0];

    if (firstUser.email === values.email && firstUser.senha === values.senha) {
        userStore.setUser(firstUser);
        router.push({ name: 'home' });
    } else {
        toast.error('Email ou senha incorretos');
    }
});
</script>

<template>
    <main class="w-full h-screen flex">
        <LoginCard />
        <Form @submit="onSubmit" class="w-1/3 space-y-6 flex justify-center flex-col items-center">
            <div class="w-4/5 flex flex-col gap-3">
                <div class="relative w-full max-w-sm items-center justify-center">
                    <MyInputField hasIcon placeholder="example@example.com" name="email" id="email" type="text" />
                    <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
                        <Mail class="size-3 text-muted-foreground" />
                    </span>
                </div>
                <div class="relative w-full max-w-sm items-center">
                    <MyInputField hasIcon id="senha" type="password" placeholder="Sua senha aqui" name="senha" />
                    <span class=" absolute start-0 inset-y-0 flex items-center justify-center px-2">
                        <Search class="size-3 text-muted-foreground" />
                    </span>
                </div>
                <Button class="bg-indigo-700 hover:bg-indigo-800 w-full text-white" variant="secondary" type="submit"
                    size="sm">Entre</Button>
                <Separator class="my-2" label="Ou" />
                <span class="flex gap-4 items-center justify-center">
                    <Button variant="ghost"
                        class="p-2 rounded-full w-10 h-10 p-0 bg-indigo-500 text-white hover:bg-indigo-700">
                        <Mail class="size-4 text-muted-foreground text-white" />
                    </Button>
                    <Button variant="ghost"
                        class="p-2 rounded-full w-10 h-10 p-0 bg-gray-200 text-black hover:bg-gray-300">
                        <Phone class="size-4 text-muted-foreground text-black" />
                    </Button>
                    <Button variant="ghost"
                        class="p-2 rounded-full w-10 h-10 p-0 bg-black text-white hover:bg-gray-700">
                        <MessageCircle class="size-4 text-muted-foreground text-white" />
                    </Button>
                </span>
            </div>
        </Form>
    </main>
</template>
