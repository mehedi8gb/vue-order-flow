<!-- <template>
  <div id="app" class="container">
    <HeaderComponent></HeaderComponent>
    <div class="mt-3">
      <component :is="currentComponent" @next-step="nextStep" @previous-step="previousStep" />
    </div>
  </div>
</template>

<script>
import ProductDetails from './components/ProductDetails.vue';
import DeliveryDetails from './components/DeliveryDetails.vue';
import YourDetails from './components/YourDetails.vue';
import OrderSuccess from "./components/OrderSuccess.vue"
import HeaderComponent from './components/layout/HeaderComponent.vue';

export default {
  name: 'App',
  components: {
    ProductDetails,
    DeliveryDetails,
    YourDetails,
    OrderSuccess,
    HeaderComponent
  },
  data() {
    return {
      currentComponent: 'ProductDetails',
      steps: ['ProductDetails', 'DeliveryDetails', 'YourDetails', 'OrderSuccess'],
      title: ''
    };
  },
  methods: {
    nextStep() {

      const currentIndex = this.steps.indexOf(this.currentComponent);
      if (currentIndex < this.steps.length - 1) {
        this.currentComponent = this.steps[currentIndex + 1];
      }
    },
    previousStep() {
      const currentIndex = this.steps.indexOf(this.currentComponent);
      if (currentIndex < this.steps.length - 1) {
        this.currentComponent = this.steps[currentIndex - 1];
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
</style> -->
<template>
  <router-view />
</template>

<style scoped>
body {
  padding-top: 20px !important;
}
</style>