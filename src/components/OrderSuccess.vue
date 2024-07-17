<!-- src/components/OrderSuccess.vue -->
<template>
  <div class="container mt-5">
    <div class="card">
      <div class="card-body text-center">
        <h1 class="card-title">Order Successful!</h1>
        <p class="card-text">Thank you for your order.</p>
        <p class="card-text">Your order will be processed shortly.</p>
        <router-link to="/" class="btn btn-primary">Back to Home</router-link>
      </div>
    </div>
    <div>
      <h2>Order Success</h2>
      <div>
        <h3>Delivery Details</h3>
        <p>{{ getDeliveryDetails }}</p>
      </div>
      <div>
        <h3>Product Details</h3>
        <p>{{ getProductDetails }}</p>
      </div>
      <div>
        <h3>Your Details</h3>
        <p>{{ getYourDetails }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'OrderSuccess',

  computed: {
    ...mapGetters(['getDeliveryDetails', 'getProductDetails', 'getYourDetails'])
  }
};
</script>

<style scoped>
/* Optional scoped styles */
.card {
  max-width: 400px;
  margin: auto;
}
</style>