<template>
  <div class="mobile-pricing-component d-md-none">
    <div class="bg-white shadow-sm">
      <div class="container py-2">
        <div class="row align-items-center">
          <div class="col-12">
            <div class="d-flex justify-content-between align-items-center">
              <div class="price-item">
                <h6 class="mb-0 product-name">{{ productName }}</h6>
                <small class="text-muted">Qty: {{ productDetails.quantity }}</small>
              </div>           <div class="price-item">
                <small class="text-muted">Delivery:</small>
                <div v-if="getPricingComponentLoading" class="spinner-border spinner-border-sm text-primary" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
                <strong v-else>{{ getDeliveryCost }}</strong>
              </div>
              <div class="price-item">
                <small class="text-muted">Product:</small>
                <div v-if="getPricingComponentLoading" class="spinner-border spinner-border-sm text-primary" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
                <strong v-else>{{ getPrice }}</strong>
              </div>
              <div class="price-item total">
                <small class="text-muted">Total:</small>
                <div v-if="getPricingComponentLoading" class="spinner-border spinner-border-sm text-primary" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
                <strong v-else class="total-price">{{ getTotalCost }}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';

export default {
  name: 'PricingComponent',
  data() {
    return {
      showBottomSheet: false,
    };
  },
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
    },
  },
  methods: {
    ...mapActions(['fetchPrice', 'updatePricingComponentLoaded']),
    toggleBottomSheet() {
      this.showBottomSheet = !this.showBottomSheet;
      // if (this.showBottomSheet) {
      //   document.body.style.overflow = 'hidden';
      // } else {
      //   document.body.style.overflow = '';
      // }
    }
  },
  watch: {
    // Watch for changes in the product details and trigger price fetch
    productDetails: {
      handler() {
        this.$store.dispatch('fetchPrice', {fromSession: false});
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
.mobile-pricing-component {
  font-size: 0.9rem;
}


.product-name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.price-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.price-item.total {
  align-items: flex-end;
}

.total-price {
  font-size: 1.2rem;
  color: #007bff;
}

.spinner-border-sm {
  width: 1rem;
  height: 1rem;
  border-width: 0.2em;
}
</style>