import { createApp } from "vue";
import Home from "./views/Home.vue";
import router from "./router";
import "./assets/style.css";
createApp(Home).use(router).mount("#app");
