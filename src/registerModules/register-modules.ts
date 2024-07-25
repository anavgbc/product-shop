import { Router } from 'vue-router';
import router from './router/index';
import { Store } from 'pinia';

interface Module {
    router: (router: Router) => void;
    store: (pinia: Store<any>, hot: any) => void;
}
class registerModulesClass {
    storeModules: { [key: string]: any } = {};

    registerModule(name: string, module: Module) {
        if (module.store) {
            this.storeModules[name] = module.store;
        }

        if (module.router) {
            module.router(router);
        }
    }

    getModules() {
        return this.storeModules;
    }

    registerModules(modules: any) {
        Object.keys(modules).forEach((moduleKey) => {
            const module = modules[moduleKey];
            this.registerModule(moduleKey, module);
        });
    }
}

export default registerModulesClass;
