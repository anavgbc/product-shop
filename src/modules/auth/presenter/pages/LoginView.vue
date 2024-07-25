<script setup lang="ts">
import Button from '../../../../shared/components/ui/button/Button.vue';
import Separator from '../../../../shared/components/ui/separator/Separator.vue';
import LoginCard from '../components/LoginCard.vue';

import { MessageCircle, Phone } from 'lucide-vue-next';
import { Mail } from 'lucide-vue-next';

import { Form, GenericObject } from 'vee-validate';

import MyInputField from '../../../../shared/components/MyInputField.vue';
import { formSchema } from '../utils/schema';
import { authenticate } from '../../domain/controllers';
import { AuthenticateRequest } from '../../../../shared/types/user/requests';

const onSubmit = (async (values: GenericObject) => {
    const input: AuthenticateRequest = {
        email: values.email,
        senha: values.senha,
    };
    return await authenticate(input);
});
</script>

<template>
    <main class="w-full h-screen flex">
        <LoginCard />
        <Form @submit="onSubmit" :validationSchema="formSchema"
            class="w-1/3 space-y-6 flex justify-center flex-col items-center">
            <div class="w-4/5 flex flex-col gap-3">
                <div class="relative w-full max-w-sm items-center justify-center">
                    <MyInputField placeholder="example@example.com" name="email" id="email" type="text" />
                </div>
                <div class="relative w-full max-w-sm items-center">
                    <MyInputField id="senha" type="password" placeholder="Sua senha aqui" name="senha" />
                </div>
                <Button class="bg-indigo-700 hover:bg-indigo-800 w-full text-white" variant="secondary" type="submit"
                    size="sm">Entre</Button>
                <Separator class="my-2" label="Ou" />
                <span class="flex gap-4 items-center justify-center">
                    <Button variant="ghost"
                        class="p-2 rounded-full w-10 h-10 bg-indigo-500 text-white hover:bg-indigo-700">
                        <Mail class="size-4 text-muted-foreground text-white" />
                    </Button>
                    <Button variant="ghost" class="p-2 rounded-full w-10 h-10 bg-gray-200 text-black hover:bg-gray-300">
                        <Phone class="size-4 text-muted-foreground text-black" />
                    </Button>
                    <Button variant="ghost" class="p-2 rounded-full w-10 h-10 bg-black text-white hover:bg-gray-700">
                        <MessageCircle class="size-4 text-muted-foreground text-white" />
                    </Button>
                </span>
            </div>
        </Form>
    </main>
</template>
