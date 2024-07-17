import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./states/store"; 
import "bootstrap/dist/css/bootstrap.min.css";

const app = createApp(App);
app.use(router);
app.use(store); // use the store
app.mount("#app");
