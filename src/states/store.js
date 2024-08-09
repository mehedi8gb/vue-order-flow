// store.js
import { createStore } from "vuex";

const store = createStore({
  state: {
    deliveryDetails: {
      deliveryAddressResponse: null,
      showAddressLookup: false,
    },
    productDetails: {
      productName: "Flyers",
      hasDesignFile: "1",
    },
    yourDetails: {
      whoWillReceive: "myself",
    },
    errors: {},
  },
  mutations: {
    setDeliveryDetails(state, details) {
      state.deliveryDetails = details;
    },
    setDeliveryAddressResponse(state, response) {
      state.deliveryDetails.deliveryAddressResponse = response;
    },
    setAddressLookup(state, cond) {
      state.deliveryDetails.showAddressLookup = cond;
    },
    setProductDetails(state, details) {
      state.productDetails = details;
    },
    setYourDetails(state, details) {
      state.yourDetails = details;
    },
    // error mutations
    SET_ERRORS(state, errors) {
      state.errors = errors;
    },
    CLEAR_ERRORS(state) {
      state.errors = {};
    },
  },
  actions: {
    updateDeliveryDetails({ commit }, details) {
      commit("setDeliveryDetails", details);
    },
    updateDeliveryAddressResponse({ commit }, response) {
      commit("setDeliveryAddressResponse", response);
    },
    updateAddressLookup({ commit }, cond) {
      commit("setAddressLookup", cond);
    },
    updateProductDetails({ commit }, details) {
      commit("setProductDetails", details);
    },
    updateYourDetails({ commit }, details) {
      commit("setYourDetails", details);
    },
    // error actions 
    setErrors({ commit }, errors) {
      commit('SET_ERRORS', errors);
    },
    clearErrors({ commit }) {
      commit('CLEAR_ERRORS');
    },
  },
  getters: {
    getDeliveryDetails: (state) => state.deliveryDetails,
    getProductDetails: (state) => state.productDetails,
    getYourDetails: (state) => state.yourDetails,
    getAddressLookup: (state) => state.deliveryDetails.showAddressLookup,
    getErrors: (state) => state.errors,
  },
});

export default store;
