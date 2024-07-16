import { createRouter, createWebHistory } from "vue-router";
import ProductDetails from "../components/ProductDetails.vue";
import DeliveryDetails from "../components/DeliveryDetails.vue";
import YourDetails from "../components/YourDetails.vue";
import OrderSuccess from "../components/OrderSuccess.vue"

const routes = [
  { path: "/", redirect: "/product-details" },
  { path: "/product-details", component: ProductDetails },
  { path: "/delivery-details", component: DeliveryDetails },
  { path: "/your-details", component: YourDetails },
  { path: '/order-success', component: OrderSuccess }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
