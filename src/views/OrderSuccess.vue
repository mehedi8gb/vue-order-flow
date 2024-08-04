<template>
  <div>

    <div class="container">
      <!-- <HeaderComponent /> -->
      <CustomLoading :show="isLoading" :texts="loadingTexts" @finished="onLoadingFinished" />

      <transition name="fade" @after-leave="onTransitionEnd">
        <div class="card-container" v-if="!isLoading && orderSuccess" key="order-success">
          <div class="card-body text-center">
            <h1 class="card-title">Order Successful!</h1>
            <p class="card-text">Thank you for your order.</p>
            <p class="card-text">Your order will be processed shortly.</p>
            <router-link to="/" class="btn btn-primary">Back to Home</router-link>
          </div>
        </div>
      </transition>
      <!-- <div v-if="orderSuccess">
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
      </div> -->
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
import CustomLoading from '@/components/CustomLoading.vue';
// import HeaderComponent from '@/components/layout/HeaderComponent.vue';

export default {
  name: 'OrderSuccess',
  components: {
    CustomLoading,
    // HeaderComponent,
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
        const payload = {
          deliveryDetails: this.getDeliveryDetails,
          productDetails: this.getProductDetails,
          yourDetails: this.getYourDetails,
        };

        const response = await axios.post(`${process.env.VUE_APP_API_BASE_URL}/checkout/order`, payload);
        if (response.status === 200) {
          setTimeout(() => {
            this.orderSuccess = true;
            this.isLoading = false;
          }, 2500);
        }
      } catch (error) {
        console.error('Error making order request:', error);
        // Handle error case, possibly set a failure state
        setTimeout(() => {
          this.orderSuccess = true;
          this.isLoading = false;
        }, 2500);
      } finally {
        setTimeout(() => {
          this.orderSuccess = true;
          this.isLoading = false;
        }, 2500);
      }
    },
  },
  mounted() {
    this.makeOrderRequest();
  },
};
</script>

<style>
body {
  padding-top: 20px !important;
}

/* Optional scoped styles */
/* Optional: Transition for the fade effect */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active in <2.1.8 */
  {
  opacity: 0;
}

/* .card {
  max-width: 400px;
  margin: auto;
  margin-top: 120px !important;
} */
.card-container {
  max-width: 500px;
  margin: 20px auto;
  margin-top: 130px !important;
  padding: 20px;
  background: rgba(255, 255, 255, 0.8);
  /* Semi-transparent white background */
  border-radius: 15px;
  /* Rounded corners */
  box-shadow: 2px 8px 12px rgba(46, 175, 245, 0.294);
  backdrop-filter: blur(10px);
  /* Glassmorphism effect */
  border: 1px solid rgba(255, 255, 255, 0.2);
  /* Light border to enhance the glass effect */
}

.card-body {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.2) 100%);
  /* Gradient background */
  padding: 20px;
  border-radius: 15px;
  /* Rounded corners inside the card */
}

.card-title {
  font-size: 2rem;
  color: #333;
}

.card-text {
  font-size: 1rem;
  color: #666;
}

.btn-primary {
  background-color: #0078d4;
  /* Windows 11 button color */
  border: none;
  color: white;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-primary:hover {
  background-color: #005a9e;
  /* Darker button color on hover */
}
</style>
