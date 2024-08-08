// store.js
import { createStore } from "vuex";

const store = createStore({
  state: {
    deliveryDetails: {},
    productDetails: {
      productName: "Flyers",
      hasDesignFile: "1",
    },
    yourDetails: {
      whoWillReceive: "myself",
    },
    validationErrors: {},
  },
  mutations: {
    setDeliveryDetails(state, details) {
      state.deliveryDetails = details;
    },
    setDeliveryAddressResponse(state, response) {
      state.deliveryDetails.deliveryAddressResponse = response;
    },
    setProductDetails(state, details) {
      state.productDetails = details;
    },
    setYourDetails(state, details) {
      state.yourDetails = details;
    },
    // vaqliationErrors
    setValidationErrors(state, errors) {
      state.validationErrors = errors;
    },
    clearValidationErrors(state) {
      state.validationErrors = {};
    },
  },
  actions: {
    updateDeliveryDetails({ commit }, details) {
      commit("setDeliveryDetails", details);
    },
    updateDeliveryAddressResponse({ commit }, response) {
      commit("setDeliveryAddressResponse", response);
    },
    updateProductDetails({ commit }, details) {
      commit("setProductDetails", details);
    },
    updateYourDetails({ commit }, details) {
      commit("setYourDetails", details);
    },
  },
  getters: {
    getDeliveryDetails: (state) => state.deliveryDetails,
    getProductDetails: (state) => state.productDetails,
    getYourDetails: (state) => state.yourDetails,
    getValidationErrors: (state) => state.validationErrors,
  },
});

export default store;
