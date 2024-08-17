<template>
  <div>
    <div class="container">
      <CustomLoading :show="isLoading" :texts="loadingTexts" @finished="onLoadingFinished" />

      <transition name="fade" @after-leave="onTransitionEnd">
        <div class="card-container" v-if="!isLoading && orderSuccess" key="order-success">
          <div class="text-center">
            <h1 class="card-title">Order Successful!</h1>
            <p class="card-text">Thank you for your order.</p>
            <p class="card-text">Your order will be processed shortly.</p>
            <!-- Display the Order ID -->
            <p class="card-text mt-3">
              <strong>Order ID:</strong> {{ response.data.order.order_id }}
            </p>
            <p v-if="invoiceUrl"><a class="btn btn-secondary" :href="invoiceUrl">View Invoice</a></p>
            <router-link to="/" class="btn btn-primary">Back to Home</router-link>
          </div>
        </div>
      </transition>

      <transition name="fade" @after-leave="onTransitionEnd">
        <div v-if="orderFailed" class="card-container" key="order-failed">
          <div class="text-center">
            <h1 class="card-title">Order Failed</h1>
            <p class="card-text">Something went wrong with your order.</p>
            <p class="card-text">Please try again later or contact support if the issue persists.</p>
            <router-link to="/" class="btn btn-primary">Back to Home</router-link>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapActions, mapGetters } from 'vuex';
import CustomLoading from '@/components/CustomLoading.vue';

export default {
  name: 'OrderSuccess',
  components: {
    CustomLoading,
  },
  data() {
    return {
      response: null,
      isLoading: false,
      orderSuccess: false,
      orderFailed: false,
      invoiceUrl: null,
      loadingTexts: [
        'Checking submitted data...',
        'Processing your order...',
        'Please wait a moment.',
        'Almost done...',
      ],
    };
  },
  computed: {
    ...mapGetters(['getDeliveryDetails', 'getProductDetails', 'getYourDetails', 'getErrors']),
  },
  methods: {
    ...mapActions(['setErrors', 'clearErrors', 'updateAddressLookup']),
    async makeOrderRequest() {
      this.isLoading = true;
      this.clearErrors();
      this.updateAddressLookup(true);
      try {
        const payload = {
          deliveryDetails: this.getDeliveryDetails,
          productDetails: this.getProductDetails,
          yourDetails: this.getYourDetails,
        };

        this.response = await axios.post(`${process.env.VUE_APP_BACKOFFICE_API_BASE_URL}/checkout/order`, payload);
        if (this.response.status === 201) {
          this.invoiceUrl = this.response.data.invoice_url; // Assume these URLs are returned
          this.orderSuccess = true;
          this.isLoading = false;
        }
      } catch (error) {
        this.orderFailed = true;
        if (error.response && error.response.status === 422) {
          this.handleValidationError(error.response.data.errors);
        } else {
          console.error('Error making order request:', error);
        }
        this.isLoading = false;
      }
    },
    handleValidationError(errors) {
      // Pass errors to the relevant page/component
      this.clearErrors();
      this.setErrors(errors);
      // Dynamically detect which page the error belongs to and redirect
      const errorKeys = Object.keys(errors);
      if (errorKeys.length) {
        const firstErrorKey = errorKeys[0];
        console.log('First error key:', firstErrorKey);
        if (firstErrorKey.startsWith('yourDetails')) {
          this.$router.push({ name: 'YourDetails' });
        }
        else if (firstErrorKey.startsWith('deliveryDetails')) {
          this.$router.push({ name: 'DeliveryDetails' });
        }
        else if (firstErrorKey.startsWith('productDetails')) {
          this.$router.push({ name: 'ProductDetails' });
        }
      }
    },
  },
  mounted() {
    this.clearErrors();
    this.makeOrderRequest();
  },
};
</script>

<style>
body {
  padding-top: 20px !important;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.card-container {
  max-width: 500px;
  margin: 20px auto;
  margin-top: 130px !important;
  padding: 20px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 15px;
  box-shadow: 2px 8px 12px rgba(46, 175, 245, 0.294);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.card-body {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.2) 100%);
  padding: 20px;
  border-radius: 15px;
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
}

.btn-secondary {
  background-color: #f0f0f0;
  border: 1px solid #0078d4;
  color: #0078d4;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin: 5px;
}

.btn-secondary:hover {
  background-color: #e0e0e0;
}
</style>
