import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import "./assets/style.css";

axios.defaults.baseURL = "http://localhost:8081/api";
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

const userData = JSON.parse(localStorage.getItem("user_data") || "null");
if (userData?.token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${userData.token}`;
}

const app = createApp(App);
app.use(router).mount("#app");
