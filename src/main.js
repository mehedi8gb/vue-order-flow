import { createApp } from "vue";
import App from "./App.vue";
import VueSweetalert2 from 'vue-sweetalert2';
import router from "./router";
import store from "./states/store"; 
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min'
import 'sweetalert2/dist/sweetalert2.min.css';
import "./assets/css/global-form.css";
import './assets/css/variables.css';
import './assets/css/error.css';

const app = createApp(App);
app.use(router);
app.use(store); 
app.use(VueSweetalert2);
app.mount("#app");
