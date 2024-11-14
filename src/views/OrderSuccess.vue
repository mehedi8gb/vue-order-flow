<template>
  <div>
    <div class="container">
      <CustomLoading :show="isLoading" :texts="loadingTexts" @finished="onLoadingFinished"/>

      <transition name="fade" @after-leave="onTransitionEnd">
        <div class="card-container" v-if="!isLoading && orderSuccess" key="order-success">
          <div class="text-center">
            <h1 class="card-title">Quotation Request Received.</h1>
            <p class="card-text">Thank you for choosing our services.</p>
            <p class="card-text">Your order quotation is being processed.</p>
            <!-- Display the Order ID -->
            <p class="card-text mt-3">
              <strong>Enquiry Reference</strong> #{{ getQuotationResponse.order.order_id }}
            </p>
            <p>
              <a class="btn" style="background: #F5CD47" target="_blank" :href="getQuotationResponse.agreement_url">Proceed to Payment</a>
            </p>
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
import {mapActions, mapGetters} from 'vuex';
import CustomLoading from '@/components/CustomLoading.vue';
import {nextTick} from "vue";

export default {
  name: 'OrderSuccess',
  components: {
    CustomLoading,
  },
  data() {
    return {
      response: this.getQuotationResponse,
      isLoading: false,
      orderSuccess: false,
      orderFailed: false,
      invoiceUrl: null,
      agreementUrl: null,
      loadingTexts: [
        'Checking submitted data...',
        'Processing your order...',
        'Please wait a moment.',
        'Almost done...',
      ],
    };
  },
  computed: {
    ...mapGetters(['getDeliveryDetails', 'getProductDetails', 'getYourDetails', 'getErrors', 'getQuotationCreated', 'getQuotationResponse']),
  },
  methods: {
    ...mapActions(['setErrors', 'clearErrors', 'updateAddressLookup', 'updateQuotationCreated', 'updateQuotationResponse']),
    async makeOrderRequest() {
      this.isLoading = true;
      this.updateAddressLookup(true);
      try {
        const payload = {
          sessionId: this.$store.state.sessionId,
          deliveryDetails: this.getDeliveryDetails,
          productDetails: this.getProductDetails,
          yourDetails: this.getYourDetails,
        };

        const response = await axios.post(`${process.env.VUE_APP_BACKOFFICE_API_BASE_URL}/checkout/order`, payload);
        if (response.status === 201) {
          this.updateQuotationCreated(true);
          this.updateQuotationResponse(response.data);

          this.orderSuccess = true;
          this.isLoading = false;
          this.$store.dispatch('clearSessionId');
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
      this.setErrors(errors);

      // Define the mappings for each route and error key to scrollable IDs
      const errorIdMaps = {
        YourDetails: {
          'yourDetails.someField': 'yourDetailsField',
          // Add other mappings specific to 'YourDetails' page here
        },
        DeliveryDetails: {
          'deliveryDetails.someField': 'deliveryDetailsField',
          // Add other mappings specific to 'DeliveryDetails' page here
        },
        ProductDetails: {
          'productDetails.hasDesignFile': 'hasDesignFile',
          'productDetails.fileUpload': 'fileUpload',
          'productDetails.productName': 'productName',
          'productDetails.design.slides': 'designSlides',
          'productDetails.design.orientation': 'designOrientation',
          'productDetails.design.paperThickness': 'paperThickness',
          'productDetails.design.paperType': 'paperType',
          'productDetails.design.finishedSize': 'finishedSize',
        },
        // Add other routes and their respective error mappings here if needed
      };

      // Get the first error key
      const errorKeys = Object.keys(errors);
      if (errorKeys.length) {
        const firstErrorKey = errorKeys[0];
        console.log('First error key:', firstErrorKey);

        // Determine the route and error ID map based on the error key prefix
        let targetRoute = null;
        let targetId = null;

        if (firstErrorKey.startsWith('yourDetails')) {
          targetRoute = 'YourDetails';
          targetId = errorIdMaps.YourDetails[firstErrorKey];
        } else if (firstErrorKey.startsWith('deliveryDetails')) {
          targetRoute = 'DeliveryDetails';
          targetId = errorIdMaps.DeliveryDetails[firstErrorKey];
        } else if (firstErrorKey.startsWith('productDetails')) {
          targetRoute = 'ProductDetails';
          targetId = errorIdMaps.ProductDetails[firstErrorKey];
        }

        // Redirect to the route and scroll to the specific element
        if (targetRoute && targetId) {
          this.$router.push({name: targetRoute}).then(() => {
            // Wait until the route is fully loaded and the component is rendered
            nextTick(() => {
              const element = document.getElementById(targetId);
              if (element) element.scrollIntoView({behavior: 'smooth', block: 'center'});
            });
          });
        }
      }
    }

  },
  mounted() {
    this.response = this.getQuotationResponse;
    this.clearErrors();
    if (!this.getQuotationCreated) {
      this.makeOrderRequest();
    } else {
      this.orderSuccess = true;
    }
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
