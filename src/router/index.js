import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", redirect: "/product-details" },
  {
    path: "/product-details",
    name: "ProductDetails",
    component: () => import('@/views/ProductDetails.vue'),
  },
  {
    path: "/deliver-details",
    name: "DeliveryDetails",
    component: () => import('@/views/DeliveryDetails.vue'),
  },
  {
    path: "/your-details",
    name: "YourDetails",
    component: () => import('@/views/YourDetails.vue'),
  },
  {
    path: "/order-success",
    name: "OrderSuccess",
    component: () => import('@/views/OrderSuccess.vue'),
  },
  // {
  //   path: '/:pathMatch(.*)*',
  //   name: 'NotFound',
  //   component: () => import('@/views/NotFound.vue'),
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
