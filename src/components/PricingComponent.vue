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
        <div class="price-section border-top mt-3 pt-2">
          <div v-if="getDeliveryOption" class="d-flex justify-content-between align-items-center">
            <span class="h6 text-muted">Delivery Fee:</span>
            <div class="d-flex align-items-center ms-2">
              <span v-if="getPricingComponentDeliveryFeeLoading" class="spinner-dots">
                <div></div>
                <div></div>
                <div></div>
              </span>
              <span v-else class="h6 price-value">{{ getDeliveryCost }}</span>
            </div>
          </div>
          <div class="d-flex justify-content-between align-items-center mt-2">
            <span class="h6 text-muted">Product Price:</span>
            <div class="d-flex align-items-center ms-2">
              <span v-if="getPricingComponentLoading" class="spinner-dots">
                <div></div>
                <div></div>
                <div></div>
              </span>
              <span v-else class="h6 price-value">{{ getPrice }}</span>
            </div>
          </div>
        </div>

        <!-- Total Price Section -->
        <div class="total-section mt-3 pt-3 border-top text-center">
          <span class="h6 text-muted">Total:</span>
          <span v-if="getPricingComponentLoading" class="spinner-dots ms-2">
            <div></div>
            <div></div>
            <div></div>
          </span>
          <span v-else class="h5 total-value ms-2">{{ getTotalCost }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';

export default {
  name: 'PricingComponent',
  computed: {
    ...mapGetters(['getTotalPrice', 'getPricingComponentDeliveryFeeLoading', 'getProductDetails', 'getPricingComponentLoading', 'getPricingComponentLoaded', 'getDeliveryOption', 'getDeliveryFee']),
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
    },
    getDeliveryCost() {
      return new Intl.NumberFormat('en-UK', {
        style: 'currency',
        currency: 'GBP',
      }).format(this.getDeliveryFee);
    },
    getTotalCost() {
      return new Intl.NumberFormat('en-UK', {
        style: 'currency',
        currency: 'GBP',
      }).format(this.getProductDetails.totalPrice);
    }
  },
  methods: {
    ...mapActions(['fetchPrice', 'updatePricingComponentLoaded']),
  },
  watch: {
    // Watch for changes in the product details and trigger price fetch
    productDetails: {
      handler() {
        this.$store.dispatch('fetchPrice', { fromSession: false });
      },
      deep: true
    },
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
/* General Styles */
.pricing-card {
  max-width: 100%;
  display: inline-block;
  border-radius: 0.75rem;
}

.card-header {
  border-bottom: 2px solid #0056b3;
}

.card-body {
  font-size: 0.875rem;
}

.card-body ul {
  padding-left: 0;
}

.card-body li {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
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

/* Price Section */
.price-section {
  border-top: 1px solid #dee2e6;
  padding-top: 10px;
}

.price-value {
  font-size: 1.25rem;
  font-weight: bold;
  color: #343a40;
}

.total-section {
  border-top: 1px solid #dee2e6;
  padding-top: 15px;
}

.total-value {
  font-size: 1.5rem;
  font-weight: bold;
  color: #343a40;
}

/* Spinner Styles */
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
  background: blue;
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
