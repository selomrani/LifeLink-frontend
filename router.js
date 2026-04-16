import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home.vue";
import HowItWorks from "./views/HowItWorks.vue";
import NotFound from "./views/NotFound.vue";
import loginVue from "./views/auth/login.vue";
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/how-it-works",
    name: "HowItWorks",
    component: HowItWorks,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
  {
    path: "/login",
    name: "login",
    component: loginVue,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
