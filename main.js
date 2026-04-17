import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import "./assets/style.css";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:8081/api";
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

const app = createApp(App);
app.config.globalProperties.$axios = axios;

app.use(router).mount("#app");
