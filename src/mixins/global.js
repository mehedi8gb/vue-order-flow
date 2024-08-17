import axios from "axios";
import { mapActions } from "vuex";

export default {
  ...mapActions(["setErrors", "clearErrors", "updateAddressLookup"]),
  methods: {
    async validateFormData(url, payload) {
      this.isLoading = true;
      this.clearErrors();
      this.updateAddressLookup(true);
      try {
        const response = await axios.post(url, payload);
        if (response.status === 201 || response.status === 200) {
          this.invoiceUrl = response.data.invoice_url; // Assume these URLs are returned
          this.orderSuccess = true;
        }
      } catch (error) {
        this.orderFailed = true;
        if (error.response && error.response.status === 422) {
          this.handleValidationError(error.response.data.errors);
        } else {
          console.error("Error making order request:", error);
        }
      } finally {
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
        console.log("First error key:", firstErrorKey);
        if (firstErrorKey.startsWith("yourDetails")) {
          this.$router.push({ name: "YourDetails" });
        } else if (firstErrorKey.startsWith("deliveryDetails")) {
          this.$router.push({ name: "DeliveryDetails" });
        } else if (firstErrorKey.startsWith("productDetails")) {
          this.$router.push({ name: "ProductDetails" });
        }
      }
    },
  },
};
