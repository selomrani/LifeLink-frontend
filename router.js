import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home.vue";
import HowItWorks from "./views/HowItWorks.vue";
import NotFound from "./views/NotFound.vue";

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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
