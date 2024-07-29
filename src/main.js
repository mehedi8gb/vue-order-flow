import { createApp } from "vue";
import App from "./App.vue";
import VueSweetalert2 from 'vue-sweetalert2';
import router from "./router";
import store from "./states/store"; 
import "bootstrap/dist/css/bootstrap.min.css";
import 'sweetalert2/dist/sweetalert2.min.css';

const app = createApp(App);
app.use(router);
app.use(store); 
app.use(VueSweetalert2);
app.mount("#app");
