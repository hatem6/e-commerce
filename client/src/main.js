import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./style.css";
const app = createApp(App);
app.use(router); // Use the router

app.mount("#app");
