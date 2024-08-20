// store.js
import { createStore } from "vuex";

const store = createStore({
  state: {
    sessionId: null,
    deliveryDetails: {
      deliveryAddressResponse: null,
      showAddressLookup: false,
      deliveryDeadline: "",
      postcode: "",
      nameNumber: "",
      addressLine2: "",
      townCity: "",
    },
    productDetails: {
      productName: "Flyers",
      hasDesignFile: "1",
      whenArtworkSend: "",
      comment: "",
      fileUpload: "",
      files: [],
      design: {
        slides: "doubleSided",
        orientation: "portrait",
        paperThickness: "gsm170",
        paperType: "silkMatt",
        finishedSize: "a4Size",
      },
    },
    yourDetails: {
      whoWillReceive: "myself",
    },
    errors: {
      productDetails: {
        fileUpload: "",
      },
    },
  },
  mutations: {
    setFileAttached(state, cond) {
      state.productDetails.fileUpload = cond;
    },
    setSessionId(state, sessionId) {
      state.sessionId = sessionId;
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
    SET_FILE_UPLOAD_ERROR(state, message) {
      state.errors.productDetails.fileUpload = message;
    },
    SET_ERRORS(state, errors) {
      state.errors = errors;
    },
    CLEAR_ERRORS(state) {
      state.errors = {};
    },
  },
  actions: {
    async fetchAndGenerateSessionId({ commit }) {
      try {
        let sessionId = localStorage.getItem("sessionId");

        if (!sessionId) {
          sessionId = (
            Math.random().toString(36).substr(2, 11) +
            Date.now().toString(36).substr(-11)
          ).substr(0, 22);
          
          localStorage.setItem("sessionId", sessionId);
          console.log("Generated new sessionId:", sessionId);
        } else {

          this.state.sessionId = sessionId;
          console.log(
            "Retrieved sessionId from localStorage:",
            this.state.sessionId
          );
        }
        commit("setSessionId", sessionId);
      } catch (error) {
        console.error("Error generating or retrieving sessionId:", error);
      }
    },

    async clearSessionId({ commit }) {
      try {
        // Remove the session ID from localStorage
        localStorage.removeItem("sessionId");
        console.log("SessionId removed from localStorage");
    
        // Clear the session ID from Vuex state
        commit("setSessionId", null);
        console.log("SessionId cleared from Vuex state");
      } catch (error) {
        console.error("Error clearing sessionId:", error);
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
    hasFileAttached({ commit }, cond) {
      commit("setFileAttached", cond);
    },
    // error actions
    setFileUploadError({ commit }, errorMessage) {
      commit("SET_FILE_UPLOAD_ERROR", errorMessage);
    },
    setErrors({ commit }, errors) {
      commit("SET_ERRORS", errors);
    },
    clearErrors({ commit }) {
      commit("CLEAR_ERRORS");
    },
  },
  getters: {
    getDeliveryDetails: (state) => state.deliveryDetails,
    getProductDetails: (state) => state.productDetails,
    getYourDetails: (state) => state.yourDetails,
    getAddressLookup: (state) => state.deliveryDetails.showAddressLookup,
    getErrors: (state) => state.errors,
    getSessionId: (state) => state.sessionId,
  },
});

export default store;
