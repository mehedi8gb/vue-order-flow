<template>
  <div id="app" class="container">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">Order Flow</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="#" @click.prevent="currentComponent = 'ProductDetails'">Product Details</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click.prevent="currentComponent = 'DeliveryDetails'">Delivery Details</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click.prevent="currentComponent = 'YourDetails'">Your Details</a>
          </li>
        </ul>
      </div>
    </nav>
    <div class="container mt-3">
      <component :is="currentComponent" @next-step="nextStep" />
    </div>
  </div>
</template>

<script>
import ProductDetails from './components/ProductDetails.vue';
import DeliveryDetails from './components/DeliveryDetails.vue';
import YourDetails from './components/YourDetails.vue';

export default {
  name: 'App',
  components: {
    ProductDetails,
    DeliveryDetails,
    YourDetails
  },
  data() {
    return {
      currentComponent: 'ProductDetails'
    };
  },
  methods: {
    nextStep() {
      const steps = ['ProductDetails', 'DeliveryDetails', 'YourDetails'];
      const currentIndex = steps.indexOf(this.currentComponent);
      if (currentIndex < steps.length - 1) {
        this.currentComponent = steps[currentIndex + 1];
      }
    }
  }
};
</script>

<style>
@import '~bootstrap/dist/css/bootstrap.min.css';

body {
  padding-top: 56px;
}
</style>
