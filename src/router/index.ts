import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '../store';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'login',
        component: () => import('../views/Login/LoginView.vue'),
    },
    {
        path: '/',
        component: () => import('../layout/private/DefaultLayout.vue'),
        meta: { requiresAuth: true },
        children: [
            {
                path: '/home',
                name: 'home',
                component: () => import('../views/Home/HomeView.vue'),
            },
            {
                path: '/edit/product/:id',
                name: 'edit',
                component: () => import('../views/Product/EditView.vue'),
            },
            {
                path: '/create/product',
                name: 'create',
                component: () => import('../views/Product/CreateView.vue'),
            },
            {
                path: '/categories',
                name: 'category',
                component: () => import('../views/Category/ListView.vue'),
            },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, _from, next) => {
    const store = useUserStore();

    if (to.meta.requiresAuth && !store.getToken) {
        next('/');
    } else {
        next();
    }
});

export default router;
