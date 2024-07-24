import { createRouter, createWebHistory } from 'vue-router';
const routes = [
    {
        path: '/',
        name: 'login',
        redirect: (_to: any) => {
            return { name: 'login' };
        },
    },
    {
        path: '/:pathMatch(.*)*',
        component: () => import('../../views/public/NotFound.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
