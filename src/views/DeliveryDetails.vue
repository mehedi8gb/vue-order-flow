<template>
  <div class="container">
    <div class="d-flex pb-lg-4">
      <div class="col-md-2" style="width: 200px">
        <div class="position-absolute bg-secondary rounded text-white d-flex justify-content-center align-items-center"
             style="width: 150px; height: 100px; top: 52px; left: 34px">
          <span class="bg-white text-dark rounded text-center px-2 py-1">Flyers</span>
        </div>
      </div>
      <div class="col-md-8 border rounded mt-5" style="border-color: rgb(185, 185, 185)">
        <div class="position-relative" style="top: -14px; margin-left: 40px">
          <div class="d-flex justify-content-between">
            <div class="position-relative">
                            <span class="position-absolute bg-white" style="white-space: nowrap; z-index: 100">delivery
                                details</span>
            </div>
            <div class="position-relative">
              <button type="button" class="btn btn-danger rounded-circle position-absolute"
                      style="z-index: 100">
                <span>&times;</span>
              </button>
            </div>
          </div>
        </div>

        <form @submit.prevent="saveDetails">
          <loading v-model:active="isLoadingValidation" :can-cancel="false" :is-full-page="false"
                   :loader="'bars'"/>

          <div class="card-body m-3 pb-5">
            <transition name="slide">
              <!-- Conditional rendering based on loading state -->
              <div class="custom-radio-placeholder-container">
                <h2 class="custom-radio-title">Select Delivery Option</h2>
                <div class="custom-radio-options">
                  <!-- Placeholder skeletons for delivery options -->
                  <div class="loading-container">
                    <loading
                        v-model:active="isLoadingOptions"
                        :can-cancel="false"
                        :is-full-page="false"
                        :loader="'bars'"
                        class="custom-loading-bar"/>
                  </div>
                  <div v-if="isLoadingOptions" class="custom-radio-options">
                    <div v-for="n in 3" :key="n" class="custom-radio-placeholder">
                      <div class="custom-radio-input-placeholder"></div>
                      <div class="custom-radio-label-placeholder">
                        <div class="custom-radio-content-placeholder">
                          <div class="d-flex align-items-center">
                            <span class="custom-radio-checkmark-placeholder"></span>
                            <div>
                              <div class="custom-radio-text-placeholder mb-1"></div>
                              <div class="custom-radio-subtext-placeholder mb-1"></div>
                            </div>
                          </div>
                          <div class="custom-radio-price-placeholder"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-else class="custom-radio-options">
                    <div v-if="errors['deliveryDetails.deliveryOption']"
                         class="alert alert-danger p-3 mb-4 text-red-600 bg-red-100 border border-red-200 rounded"
                         role="alert">
                      {{ errors['deliveryDetails.deliveryOption'][0] }}
                    </div>
                    <div v-for="option in deliveryOptions" :key="option.value" class="custom-radio-option">
                      <input
                          v-model="form.deliveryOption"
                          type="radio"
                          :id="option.value"
                          name="deliveryOption"
                          :value="option.value"
                          class="custom-radio-input"
                          @change="pushDeliveryOption(option)"/>
                      <label :for="option.value" class="custom-radio-label">
                        <div class="custom-radio-content">
                          <div class="d-flex align-items-center">
                            <span class="custom-radio-checkmark"></span>
                            <div>
                              <p class="custom-radio-text mb-0">{{ option.label }}</p>
                              <p class="custom-radio-subtext mb-0">Additional Cost: £{{ option.cost }}</p>
                            </div>
                          </div>
                          <div class="custom-radio-price">£{{ option.cost }}</div>
                        </div>
                        <div v-if="form.deliveryOption === option.value" class="custom-radio-badge">
                          Selected
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </transition>

            <div id="address-lockup" class="custom-radio-container mt-3">
              <div class="form-group mt-4">
                <label for="postcode" class="form-label">Delivery Address</label><br>
                <small class="form-text text-muted">Enter postcode and click the Lookup button.</small>
                <div class="input-group">
                  <input v-model="form.postcode" type="text" class="form-control"
                         :class="{ 'is-invalid': errors['deliveryDetails.postcode'] }" name="postcode"
                         placeholder="Enter postcode...">
                  <button class="btn btn-warning" type="button" @click="lookUp">Look Up</button>
                  <div v-if="errors['deliveryDetails.postcode']" class="invalid-feedback">
                    {{ errors['deliveryDetails.postcode'][0] }}
                  </div>
                </div>

                <!-- Address Dropdown -->
                <div v-if="addresses?.length > 0" class="form-group mt-3">
                  <label for="addressSelect" class="form-label">Select an Address</label>
                  <select v-model="selectedAddressId" @change="getAddressDetails" class="form-control"
                          id="addressSelect">
                    <option disabled value="">Select an address...</option>
                    <option v-for="address in addresses" :key="address.Id" :value="address.Id">
                      {{ address.StreetAddress }}, {{ address.Place }}
                    </option>
                  </select>
                </div>

                <!-- Show Address Form when lookup is done -->
                <div v-if="showAddressForm()">
                  <div class="row mt-4">
                    <div class="form-group mb-3 col-md-6">
                      <label for="nameNumber" class="form-label">Name/Number and Street</label>
                      <input v-model="form.nameNumber" type="text" class="form-control"
                             :class="{ 'is-invalid': errors['deliveryDetails.nameNumber'] }"
                             id="nameNumber" placeholder="Enter name/number and street"/>
                      <div v-if="errors['deliveryDetails.nameNumber']" class="invalid-feedback">
                        {{ errors['deliveryDetails.nameNumber'][0] }}
                      </div>
                    </div>

                    <div class="form-group mb-3 col-md-6">
                      <label for="addressLine2" class="form-label">Address Line 2</label>
                      <input v-model="form.addressLine2" type="text" class="form-control"
                             :class="{ 'is-invalid': errors['deliveryDetails.addressLine2'] }"
                             id="addressLine2" placeholder="Enter address line 2"/>
                      <div v-if="errors['deliveryDetails.addressLine2']" class="invalid-feedback">
                        {{ errors['deliveryDetails.addressLine2'][0] }}
                      </div>
                    </div>

                    <div class="form-group mb-3">
                      <label for="townCity" class="form-label">Town/City</label>
                      <input v-model="form.townCity" type="text" class="form-control"
                             :class="{ 'is-invalid': errors['deliveryDetails.townCity'] }" id="townCity"
                             placeholder="Enter town/city"/>
                      <div v-if="errors['deliveryDetails.townCity']" class="invalid-feedback">
                        {{ errors['deliveryDetails.townCity'][0] }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            <div class="my-4 d-flex justify-content-between align-items-center">
              <router-link :to="{ name: 'ProductDetails' }" class="btn btn-outline-secondary btn-md">
                Previous
              </router-link>

              <input type="submit" @click.prevent="saveDetails" value="Next"
                     class="btn btn-block btn-primary">
            </div>
          </div>
        </form>
      </div>
      <div class="col-md-4">
        <PricingComponent/>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
// import {CheckIcon} from 'lucide-vue-next'

import axios from 'axios';
import toast from '@/utils/toast';
import PricingComponent from "@/components/PricingComponent.vue";

export default {
  name: 'DeliveryDetails',
  components: {
    PricingComponent,
    Loading,
    // CheckIcon
  },
  data() {
    return {
      isLoadingValidation: false,
      isLoadingOptions: false,
      previousDeliveryOption: '',
      deliveryOptions: [],
      form: {
        deliveryOption: 'same_day', // or 'next_day', depending on your test
        postcode: '94105', // Example postcode
        nameNumber: '500', // House or building number
        addressLine2: 'Pier 70 Boulevard', // Additional address information
        townCity: 'San Francisco', // City name
        deliveryAddressResponse: '', // This can be filled after a successful response from the API
      },
      addresses: [], // To store list of addresses from the first API call
      selectedAddressId: '', // Stores the selected address ID
      errors: {}, // Error handling
      username: 'OliuChowdhury788333', // Example API username
      key: '8MD1-0O7H-H2TI-FFAL', // Example API key
      apiUrl: `${process.env.VUE_APP_BACKOFFICE_API_BASE_URL}/address-lookup`,
    };
  },
  computed: {
    ...mapGetters([
      'getProductDetails',
      'getDeliveryDetails',
      'getDeliveryOption',
      'getPrice',
      'getErrors',
      'getAddressLookup',
      "getIsLookupSuccess",
      "getPreviousOption"
    ]),
    productDetails() {
      return {
        productName: this.getProductDetails.productName || 'Product',
        quantity: this.getProductDetails.quantity,
        size: this.getProductDetails.design.finishedSize || 'Unknown',
        side: this.getProductDetails.design.slides || 'Unknown',
        paper_thickness: this.getProductDetails.design.paperThickness || 'Unknown',
        paper_type: this.getProductDetails.design.paperType || 'Unknown',
      };
    },
  },
  methods: {
    ...mapActions([
      'updateDeliveryOption',
      'updatePreviousOption',
      'updateDeliveryFee',
      'updatePrice',
      'updateDeliveryDetails',
      'updateDeliveryAddressResponse',
      'clearErrors',
      'setErrors',
      'updateIsLookupSuccess'
    ]),
    saveDetails() {
      this.isLoadingValidation = true;
      this.updateDeliveryDetails(this.form);
      this.validateData();
    },
    pushDeliveryOption(selectedValue) {
      console.log('Selected Delivery Option:', selectedValue.value);
      const payload = {
        address: `${this.form.nameNumber}, ${this.form.addressLine2}, ${this.form.townCity}, ${this.form.postcode}`, // Combine the address components
        delivery_slot: selectedValue.value, // Assuming you have a variable for the selected delivery slot
        // delivery_date: this.selectedDeliveryDate, // Assuming you have a variable for the selected delivery date
        base_price: this.getPrice, // Assuming you have a variable for the base price
        productDetails: this.productDetails
      };

      axios.post(`${process.env.VUE_APP_BACKOFFICE_API_BASE_URL}/checkout/calculate-delivery-price`, payload)
          .then(response => {
            console.log('Delivery price calculated:', response.data);
            this.updatePrice(response.data.total_price);
            this.updateDeliveryFee(response.data.additional_cost);
            this.updateDeliveryOption(selectedValue);
            this.updatePreviousOption(selectedValue);
          })
          .catch(error => {
            console.error('Error calculating delivery price:', error);
          });

      // First, log the previous delivery option
      // console.log('Prev Selected Delivery Option:', this.getPreviousOption.value);
      //
      // // Check if the selected value is different from the current one
      // if (this.form.deliveryOption === selectedValue.value) {
      //   // Find the previous option and its cost
      //   let oldPrice = this.getPrice;
      //
      //   // If there is a previous option, remove its cost
      //   if (this.getPreviousOption) {
      //     const previousOption = this.deliveryOptions.find(option => option.value === this.getPreviousOption.value);
      //     oldPrice -= previousOption ? previousOption.cost : 0;
      //   }
      //   this.updateDeliveryOption(selectedValue);
      //   // Log the selected delivery option
      //   console.log('Selected Delivery Option:', this.getDeliveryOption.value);
      //
      //   // Update the price with the new delivery option's cost
      //   this.updatePrice(oldPrice + selectedValue.cost);
      //
      //   // Update the previous delivery option to the current one
      //   this.updatePreviousOption(selectedValue);
    },


    async fetchDeliveryOptions() {
      try {
        this.isLoadingOptions = true;
        const response = await axios.get(`${process.env.VUE_APP_BACKOFFICE_API_BASE_URL}/checkout/delivery/options`);
        this.deliveryOptions = response.data; // Assuming the response contains an array of options
      } catch (error) {
        console.error("Error fetching delivery options:", error);
      } finally {
        this.isLoadingOptions = false;
      }
    },
    async validateData() {
      this.clearErrors();
      try {
        const payload = {
          deliveryDetails: this.getDeliveryDetails,
        };
        const response = await axios.post(`${process.env.VUE_APP_BACKOFFICE_API_BASE_URL}/checkout/validate/delivery-details`, payload);

        console.log('Response Status:', response.status);

        if (response.status === 200) {
          this.$router.push({name: 'YourDetails'});
          console.log('Product details validated successfully:', response.data);
        }
      } catch (error) {
        if (error.response.status === 422) {
          console.log('errors', error.response.data.errors);
          this.clearErrors();
          this.setErrors(error.response.data.errors);
          this.errors = this.getErrors;
        }
      } finally {
        this.isLoadingValidation = false;
      }
    },
    lookUp() {
      if (this.form.postcode) {
        axios
            .get(`${this.apiUrl}?username=${this.username}&key=${this.key}&postcode=${this.form.postcode}`)
            .then(response => {
              // Check if response contains error information
              if (response.data.Error) {
                // Handle error response from server
                const errorDescription = response.data.Error.Description || "Unknown error occurred.";
                toast.error(`Error: ${errorDescription}`);
                this.updateIsLookupSuccess(false);
              } else {
                // Handle successful response
                this.addresses = response.data.Summaries || [];
                toast.success('Please select an address from the dropdown.');
                this.updateIsLookupSuccess(true);
              }
            })
            .catch(error => {
              console.error("There was an error fetching the data!", error);
              if (error.response && error.response.data && error.response.data.Error) {
                const errorDescription = error.response.data.Error.Description || "An error occurred.";
                toast.error(`Error: ${errorDescription}`);
              } else {
                toast.error("There was an error fetching the data!");
              }
              this.updateIsLookupSuccess(false);
            });
      } else {
        toast.error("Please enter a postcode!");
      }
    },
    getAddressDetails() {
      if (this.selectedAddressId) {
        axios
            .get(`${this.apiUrl}/address-details`, {
              params: {
                username: this.username,
                key: this.key,
                id: this.selectedAddressId,
              }
            })
            .then(response => {
              const address = response.data.Address;
              // Populate the form fields
              this.form.nameNumber = address.BuildingNumber + ' ' + address.PrimaryStreet;
              this.form.addressLine2 = address.Line2;
              this.form.townCity = address.PostTown;
              this.form.postcode = address.Postcode;

              // Clear addresses after selection
              this.addresses = [];
              toast.success('Address filled with selected address details.');
            })
            .catch(error => {
              console.error("There was an error fetching the full address details!", error);
              toast.error("Error fetching full address details.");
            });
      }
    },
    showAddressForm() {
      return this.form.nameNumber || this.addresses?.length > 0 || this.getIsLookupSuccess === false;
    }
  }
  ,
  mounted() {
    if (this.form.deliveryOption) {
      this.previousDeliveryOption = this.getDeliveryOption; // Set initial previous option
    }
    this.fetchDeliveryOptions();
    this.$nextTick(() => {
      this.errors = this.getErrors;
      const details = this.getDeliveryDetails;
      if (details) {
        this.form = details; // Populate the form with existing details if available
      }
    });
  }
}
;
</script>


<style scoped>
/* Add your global styles here */
body {
  padding-top: 20px !important;
}

/* Custom Radio Button Styles */
.custom-radio-container {
  margin: 0 auto;
  padding: 1.5rem;
  background-color: #ffffff;
  border-radius: 0.75rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  animation: slideDown 0.3s ease-out;
}

.custom-radio-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: #1f2937;
}

.custom-radio-options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.custom-radio-option {
  position: relative;
}

.custom-radio-label {
  display: block;
  position: relative;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 2px solid #e5e7eb;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
}

.custom-radio-label:hover {
  border-color: #93c5fd;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.custom-radio-input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.custom-radio-input:checked + .custom-radio-label {
  border-color: transparent;
  background: linear-gradient(to right, #3b82f6, #8b5cf6);
  color: #ffffff;
  transform: scale(1.03);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.custom-radio-checkmark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  border: 2px solid #d1d5db;
  margin-right: 0.75rem;
  transition: all 0.3s ease-in-out;
}

.custom-radio-input:checked + .custom-radio-label .custom-radio-checkmark {
  border-color: #ffffff;
  background-color: #ffffff;
}

.custom-radio-input:checked + .custom-radio-label .custom-radio-checkmark::after {
  content: '\2713';
  display: block;
  color: #3b82f6;
  font-size: 1rem;
  line-height: 1;
}

.custom-radio-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.custom-radio-text {
  font-weight: 500;
}

.custom-radio-subtext {
  font-size: 0.875rem;
  color: #6b7280;
}

.custom-radio-input:checked + .custom-radio-label .custom-radio-subtext {
  color: #bfdbfe;
}

.custom-radio-price {
  font-size: 1.5rem;
  font-weight: bold;
  color: #3b82f6;
  transition: color 0.3s ease-in-out;
}

.custom-radio-input:checked + .custom-radio-label .custom-radio-price {
  color: #ffffff;
}

.custom-radio-badge {
  position: absolute;
  top: -0.5rem;
  right: -0.5rem;
  background-color: #fbbf24;
  color: #92400e;
  font-size: 0.75rem;
  font-weight: bold;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}

/* Skeleton Placeholder Styles */
.custom-radio-placeholder-container {
  margin: 0 auto;
  padding: 1.5rem;
  background-color: #ffffff;
  border-radius: 0.75rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  animation: slideDown 0.3s ease-out;
  position: relative; /* Ensure the loading bar stays within the container */
}

/* Improved Placeholder Styles */
.custom-radio-placeholder {
  display: flex;
  align-items: center;
  padding: 1rem;
  border: 2px solid #f3f4f6;
  border-radius: 0.5rem;
  gap: 0.75rem;
  position: relative;
  overflow: hidden; /* Hide overflow for smooth animations */
}

/* Placeholder for the radio input */
.custom-radio-input-placeholder {
  width: 1.5rem;
  height: 1.5rem;
  background-color: #e5e7eb;
  border-radius: 50%;
}

/* Content Placeholder */
.custom-radio-content-placeholder {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

/* Checkmark Placeholder */
.custom-radio-checkmark-placeholder {
  width: 1.5rem;
  height: 1.5rem;
  background-color: #e5e7eb;
  border-radius: 50%;
  margin-right: 0.75rem;
}

/* Text Placeholders */
.custom-radio-text-placeholder,
.custom-radio-subtext-placeholder,
.custom-radio-price-placeholder {
  height: 0.875rem;
  background-color: #e5e7eb;
  border-radius: 0.25rem;
  position: relative; /* Allow for pseudo-element */
  overflow: hidden; /* Ensure overflow is hidden */
}

/* Line effect using pseudo-elements */
.custom-radio-text-placeholder::after,
.custom-radio-subtext-placeholder::after,
.custom-radio-price-placeholder::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  height: 2px; /* Line thickness */
  width: 100%;
  background-color: rgba(255, 255, 255, 0.5); /* Light line color */
  transform: translateY(-50%); /* Center the line vertically */
}

/* Animation for the line effect */
@keyframes lineAnimation {
  0% {
    width: 0%;
  }
  50% {
    width: 100%;
  }
  100% {
    width: 0%;
  }
}

/* Apply Animation to Line Effect */
.custom-radio-text-placeholder::after,
.custom-radio-subtext-placeholder::after,
.custom-radio-price-placeholder::after {
  animation: lineAnimation 1.5s infinite ease-in-out;
  background-color: rgba(255, 255, 255, 0.8); /* Line color */
}

/* Add Animation to the text placeholders for a glowing effect */
.custom-radio-text-placeholder,
.custom-radio-subtext-placeholder,
.custom-radio-price-placeholder {
  animation: glow 1.5s infinite alternate;
}

/* Glow effect */
@keyframes glow {
  0% {
    background-color: #e5e7eb;
  }
  100% {
    background-color: #d1d5db;
  }
}

</style>