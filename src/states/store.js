// store.js
import { createStore } from "vuex";

const store = createStore({
  state: {
    deliveryDetails: {
      deliveryAddressResponse: null,
      showAddressLookup: false,
    },
    productDetails: {
      orderId: '',
      productName: "Flyers",
      hasDesignFile: "1",
      whenArtworkSend: '',
      comment: '',
      fileUpload: '',
      files: [],
      design: {
          slides: 'singleSided',
          orientation: '',
          paperThickness: 'gsm130',
          paperType: '',
          finishedSize: '',
      },
    },
    yourDetails: {
      whoWillReceive: "myself",
    },
    errors: {},
  },
  mutations: {
    setOrderId(state, orderId) {
      state.productDetails.orderId = orderId;
    },
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
    async fetchAndGenerateOrderId({ commit }) {
      try {
        // Fetch latest order_id from Laravel API
        const response = await fetch(`${process.env.VUE_APP_BACKOFFICE_API_BASE_URL}/order/latest-order-id`);
        const data = await response.json();
        const latestOrderId = parseInt(data.order_id, 10) + 1;
    
        // Commit new order_id to Vuex state
        console.log('Latest order_id:', latestOrderId);
        commit('setOrderId', latestOrderId);
      } catch (error) {
        console.error('Error fetching latest order_id:', error);
      }
    },
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
    getOrderId: (state) => state.productDetails.orderId,
  }
});

export default store;
