import router from "./router/index";

class registerModulesClass {
  storeModules = {}

  registerModule(name, module) {
    if (module.store) {
      this.storeModules[name] = module.store;
    }
   
    if (module.router) {
      module.router(router);
    }
  };

  getModules() {
    return this.storeModules;
  }

  registerModules(modules) {

    Object.keys(modules).forEach(moduleKey => {
      const module = modules[moduleKey];
      this.registerModule(moduleKey, module);
    });
  };
}

export default registerModulesClass;
