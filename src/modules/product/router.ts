const DefaultLayout = () =>
    import('../../shared/layouts/private/DefaultLayout.vue');

const Products = () => import('./presenter/pages/ListView.vue');
const CreateView = () => import('./presenter/pages/CreateView.vue');
const EditView = () => import('./presenter/pages/EditView.vue');

const moduleRoute = {
    path: '/',
    name: '',
    component: DefaultLayout,
    children: [
        {
            path: '/home',
            name: 'home',

            component: Products,
        },
        {
            path: '/edit/product/:id',
            name: 'edit',

            component: EditView,
        },
        {
            path: '/create/product',
            name: 'create',

            component: CreateView,
        },
    ],
};

export default (router: any) => {
    router.addRoute(moduleRoute);
};
