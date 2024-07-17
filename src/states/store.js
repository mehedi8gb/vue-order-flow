// store.js
import { createStore } from 'vuex';

const store = createStore({
  state: {
    deliveryDetails: {},
    productDetails: {},
    yourDetails: {}
  },
  mutations: {
    setDeliveryDetails(state, details) {
      state.deliveryDetails = details;
    },
    setProductDetails(state, details) {
      state.productDetails = details;
    },
    setYourDetails(state, details) {
      state.yourDetails = details;
    }
  },
  actions: {
    updateDeliveryDetails({ commit }, details) {
      commit('setDeliveryDetails', details);
    },
    updateProductDetails({ commit }, details) {
      commit('setProductDetails', details);
    },
    updateYourDetails({ commit }, details) {
      commit('setYourDetails', details);
    }
  },
  getters: {
    getDeliveryDetails: (state) => state.deliveryDetails,
    getProductDetails: (state) => state.productDetails,
    getYourDetails: (state) => state.yourDetails
  }
});

export default store;
