import Vue from 'vue'
import Router from 'vue-router'
import routerConfig from "./config";
Vue.use(Router)

const createRouter = () =>
  new Router({
    mode: "history",
    scrollBehavior: () => ({ y: 0 }),
    routes: routerConfig,
  });

const router = createRouter();

export default router;
