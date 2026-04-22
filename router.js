import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home.vue";
import HowItWorks from "./views/HowItWorks.vue";
import NotFound from "./views/NotFound.vue";
import loginVue from "./views/auth/login.vue";
import registerVue from "./views/auth/register.vue";
import feedView from "./views/social/feed.vue";
import dashboard from "./views/admin/dashboard.vue";
import forgot from "./views/auth/forgot.vue";
import reset from "./views/auth/reset.vue";
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
  {
    path: "/register",
    name: "register",
    component: registerVue,
  },
  {
    path: "/feed",
    name: "feed",
    component: feedView,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: dashboard,
  },
  {
    path: "/forgot-password",
    name: "forgot",
    component: forgot,
  },
  {
    path: "/reset-password",
    name: "reset",
    component: reset,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
