import RegisterModulesClass from './register-modules.ts';

//----------------MODULOS---------------------------------------
import auth from '../modules/auth/index.ts';
import products from '../modules/product/index.ts';
import categories from '../modules/categories/index.ts';
import { createPinia } from 'pinia';

const registerModulesClass = new RegisterModulesClass();

registerModulesClass.registerModules({
    auth,
    products,
    categories,
});

export default createPinia();
