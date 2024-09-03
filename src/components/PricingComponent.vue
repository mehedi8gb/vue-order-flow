<template>
  <!-- Sticky pricing card -->
  <div class="position-sticky m-4 mt-5" style="top: 20px;">
    <div class="pricing-card card border-light shadow-lg rounded-lg">
      <div class="card-header bg-primary text-white text-center rounded-top">
        <h5 class="mb-0">{{ productName }}</h5>
      </div>
      <div class="card-body bg-gradient-light">
        <!-- Pricing Details -->
        <ul class="list-unstyled mb-0">
          <li class="d-flex justify-content-between border-bottom py-1">
            <strong class="text-muted">Quantity:</strong> <span>{{ productDetails.quantity }}</span>
          </li>
          <li class="d-flex justify-content-between border-bottom py-1">
            <strong class="text-muted">Size:</strong> <span>{{ productDetails.size }}</span>
          </li>
          <li class="d-flex justify-content-between border-bottom py-1">
            <strong class="text-muted">Orientation:</strong> <span>{{ productDetails.side }}</span>
          </li>
          <li class="d-flex justify-content-between border-bottom py-1">
            <strong class="text-muted">Paper Thickness:</strong> <span>{{ productDetails.paper_thickness }}</span>
          </li>
          <li class="d-flex justify-content-between border-bottom py-1">
            <strong class="text-muted">Paper Type:</strong> <span>{{ productDetails.paper_type }}</span>
          </li>
        </ul>

        <!-- Price Section -->
        <div class="price-section border-top mt-3 pt-2 position-relative">
          <div class="d-flex justify-content-between align-items-center">
            <span class="h6 text-muted">Price:</span>
            <div class="d-flex align-items-center ml-2">
              <span v-if="getPricingComponentLoading" class="spinner-dots">
                <div></div>
                <div></div>
                <div></div>
              </span>
              <span v-else class="h6 price-value">{{ getPrice }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import axios from 'axios';
// import Loading from "vue-loading-overlay";

export default {
  name: 'PricingComponent',
  components: {
    // Loading,
  },
  data() {
    return {
      loaded: false,
    };
  },
  computed: {
    ...mapGetters(['getProductDetails', 'getPricingComponentLoading', 'getPricingComponentLoaded']),
    productName() {
      return this.getProductDetails.productName || 'Product';
    },
    productDetails() {
      return {
        quantity: this.getProductDetails.quantity,
        size: this.getProductDetails.design.finishedSize || 'Unknown',
        side: this.getProductDetails.design.slides || 'Unknown',
        paper_thickness: this.getProductDetails.design.paperThickness || 'Unknown',
        paper_type: this.getProductDetails.design.paperType || 'Unknown',
      };
    },
    getPrice() {
      return new Intl.NumberFormat('en-UK', {
        style: 'currency',
        currency: 'GBP',
      }).format(this.getProductDetails.price);
    }
  },
  methods: {
    ...mapActions(['updatePrice', 'updatePricingComponentLoading', 'updatePricingComponentLoaded']),
    async fetchPrice() {
      this.loaded = true;
      this.updatePricingComponentLoading(true);
      try {
        const response = await axios.post(`${process.env.VUE_APP_BACKOFFICE_API_BASE_URL}/checkout/calculate-order-price`, {
          product_name: this.productName,
          product_details: this.productDetails
        });
        await this.updatePrice(response.data.price);
        console.log('Price fetched:', response.data.price);
      } catch (error) {
        console.error('Error fetching price:', error);
      } finally {
        this.updatePricingComponentLoading(false);
      }
    }
  },
  watch: {
    // Watch for changes in the product details and trigger price fetch
    productDetails: {
      handler() {
        this.fetchPrice();
      },
      deep: true
    }
  },
  mounted() {
    if (this.$route.name === 'ProductDetails' && !this.getPricingComponentLoaded) {
      this.fetchPrice();
      this.updatePricingComponentLoaded(true);
    }
  }
};
</script>

<style scoped>
.pricing-card {
  max-width: 100%; /* Ensure card does not exceed its container */
  display: inline-block; /* Fit content naturally */
  border-radius: 0.75rem; /* Rounded corners for a modern look */
}

.card-header {
  border-bottom: 2px solid #0056b3; /* Darker border for header */
}

.card-body {
  font-size: 0.875rem; /* Slightly smaller font size */
}

.card-body ul {
  padding-left: 0; /* Remove default padding */
}

.card-body li {
  overflow: hidden; /* Ensure content does not overflow list items */
  white-space: nowrap; /* Prevent text wrapping */
  text-overflow: ellipsis; /* Add ellipsis for overflowing text */
}

.pricing-card {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  transition: box-shadow 0.3s, transform 0.3s;
}

.pricing-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transform: translateY(-5px);
}

.bg-gradient-light {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
}

.price-section {
  border-top: 1px solid #dee2e6;
  padding-top: 10px;
}

.price-value {
  font-size: 1.25rem;
  font-weight: bold;
  color: #343a40;
}

.spinner-border {
  color: #0078d4;
}

.text-muted {
  color: #6c757d;
}

.card-header {
  border-radius: .25rem .25rem 0 0;
}

.card-body {
  padding: 1rem;
}

.rounded-lg {
  border-radius: .5rem;
}

.shadow-lg {
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}

.border-light {
  border-color: #f8f9fa;
}

.spinner-dots {
  display: inline-block;
  width: 61px;
  height: 15px;
  position: relative;
}

.spinner-dots div {
  position: absolute;
  top: 0;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: blue; /* Change color to match your design */
  animation: spinner-dots 1.2s infinite ease-in-out;
}

.spinner-dots div:nth-child(1) {
  left: 0;
  animation-delay: -0.24s;
}

.spinner-dots div:nth-child(2) {
  left: 20px;
  animation-delay: -0.12s;
}

.spinner-dots div:nth-child(3) {
  left: 40px;
}

@keyframes spinner-dots {
  0%, 20%, 80%, 100% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
}
</style>
