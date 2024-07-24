import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import RegisterModulesClass from './register-modules.js';

//----------------MODULOS---------------------------------------
import auth from '../modules/auth/index.ts';
import products from '../modules/product/index.ts';
import categories from '../modules/categories/index.ts';

const registerModulesClass = new RegisterModulesClass();

registerModulesClass.registerModules({
    auth,
    products,
    categories,
});

const modulesSaved = registerModulesClass.getModules();
const data = {
    userdata: Object,
    theme: String,
};

export default createStore({
    state: data,
    mutations: {
        setUserData(state, payload) {
            state.userdata = payload;
        },
        setTheme(state, payload) {
            state.theme = payload;
        },
    },
    actions: {},
    modules: modulesSaved,
    plugins: [createPersistedState()],
});
