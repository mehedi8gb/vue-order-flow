<template>
  <div class="pricing-card card border-light shadow-sm mt-4">
    <div class="card-header bg-primary text-white text-center rounded-top">
      <h5 class="mb-0">{{ productName }}</h5>
    </div>
    <div class="card-body bg-light">
      <loading v-model:active="loading" :can-cancel="false" :is-full-page="false"
               :loader="'bars'"/>
      <ul class="list-unstyled mb-0">
        <li class="d-flex justify-content-between border-bottom py-1">
          <strong class="text-muted">Quantity:</strong> <span>{{ productDetails.quantity }}</span>
        </li>
        <li class="d-flex justify-content-between border-bottom py-1">
          <strong class="text-muted">Size:</strong> <span>{{ productDetails.size }}</span>
        </li>
        <li class="d-flex justify-content-between border-bottom py-1">
          <strong class="text-muted">orientation:</strong> <span>{{ productDetails.side }}</span>
        </li>
        <li class="d-flex justify-content-between border-bottom py-1">
          <strong class="text-muted">Paper Thickness:</strong> <span>{{ productDetails.paper_thickness }}</span>
        </li>
        <li class="d-flex justify-content-between border-bottom py-1">
          <strong class="text-muted">Paper Type:</strong> <span>{{ productDetails.paper_type }}</span>
        </li>
        <li class="d-flex justify-content-between border-bottom py-1">
          <strong class="text-muted">Price:</strong> <span>{{ getPrice }}</span>
        </li>

      </ul>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import axios from 'axios';
import Loading from "vue-loading-overlay";

export default {
  name: 'PricingComponent',
  components: {
    Loading,
  },
  data() {
    return {
      loading: false
    };
  },
  computed: {
    ...mapGetters(['getProductDetails']),
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
    ...mapActions(['updatePrice']),
    async fetchPrice() {
      this.loading = true;
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
        this.loading = false; // Set loading state to false
      }
    }
  },
  watch: {
    // Watch for changes in the product details and trigger price fetch
    productDetails: {
      handler() {
        this.fetchPrice();
      },
      deep: true // Watch for nested changes
    }
  },
  mounted() {
    this.fetchPrice();
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
</style>
