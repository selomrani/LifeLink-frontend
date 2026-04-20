import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import "./assets/style.css";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:8081/api";
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
const token = localStorage.getItem("auth_token");
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

const app = createApp(App);

app.config.globalProperties.$axios = axios;

app.use(router).mount("#app");
