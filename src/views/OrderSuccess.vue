<template>
  <div>
    <HeaderComponent />
    <div class="container mt-5">
      <CustomLoading :show="isLoading" :texts="loadingTexts" />
  
      <div class="card" v-if="orderSuccess">
        <div class="card-body text-center">
          <h1 class="card-title">Order Successful!</h1>
          <p class="card-text">Thank you for your order.</p>
          <p class="card-text">Your order will be processed shortly.</p>
          <router-link to="/" class="btn btn-primary">Back to Home</router-link>
        </div>
      </div>
      <div v-if="orderSuccess">
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
  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
import CustomLoading from '@/components/CustomLoading.vue';
import HeaderComponent from '@/components/layout/HeaderComponent.vue';

export default {
  name: 'OrderSuccess',
  components: {
    CustomLoading,
    HeaderComponent,
  },
  data() {
    return {
      isLoading: false,
      orderSuccess: false,
      loadingTexts: [
        'Processing your order...',
        'Please wait a moment.',
        'Almost done...',
      ],
    };
  },
  computed: {
    ...mapGetters(['getDeliveryDetails', 'getProductDetails', 'getYourDetails']),
  },
  methods: {
    async makeOrderRequest() {
      this.isLoading = true;
      try {
        const response = await axios.post(`${process.env.VUE_APP_API_BASE_URL}/checkout/order`);
        if (response.status === 200) {
          this.orderSuccess = true;
        }
      } catch (error) {
        console.error('Error making order request:', error);
        // Handle error case, possibly set a failure state
      } finally {
        this.isLoading = false;
      }
    },
  },
  mounted() {
    this.makeOrderRequest();
  },
};
</script>

<style scoped>
/* Optional scoped styles */
.card {
  max-width: 400px;
  margin: auto;
}
</style>
