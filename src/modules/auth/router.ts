const moduleRoute = {
    path: '/',
    name: '',
    children: [
        {
            path: '/',
            name: 'login',

            component: () => import('./presenter/pages/LoginView.vue'),
        },
    ],
};

export default (router: any) => {
    router.addRoute(moduleRoute);
};
