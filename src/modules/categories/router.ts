const DefaultLayout = () =>
    import('../../shared/layouts/private/DefaultLayout.vue');

const Categories = () => import('./presenter/pages/ListView.vue');

const moduleRoute = {
    path: '/',
    name: '',
    component: DefaultLayout,
    children: [
        {
            path: '/categories',
            name: 'category',

            component: Categories,
        },
    ],
};

export default (router: any) => {
    router.addRoute(moduleRoute);
};
