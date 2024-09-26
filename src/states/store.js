// store.js
import {createStore} from "vuex";
import axios from "axios";

const store = createStore({
    state: {
        sessionId: null,
        deliveryDetails: {
            DeliveryOption: [],
            previousDeliveryOption: [],
            deliveryFee: 0.0,
            deliveryAddressResponse: null,
            isLookupSuccessful: true,
            showAddressLookup: false,
            deliveryDeadline: "",
            deliveryOption: '', // or 'next_day', depending on your test
            postcode: '', // Example postcode
            nameNumber: '', // House or building number
            addressLine2: '', // Additional address information
            townCity: '',
        },
        productDetails: {
            productName: "Flyers",
            hasDesignFile: "1",
            whenArtworkSend: "",
            comment: "",
            fileUpload: "",
            files: [],
            price: 0.0,
            totalPrice: 0.0,
            quantity: 25,
            design: {
                slides: "Double-Sided",
                orientation: "portrait",
                paperThickness: "170 gsm",
                paperType: "silkMatt",
                finishedSize: "A4",
            },
        },
        yourDetails: {
            whoWillReceive: "myself",
        },
        pricingComponent: {
            loading: false,
            loaded: false,
            deliveryFeeLoading: false,
        },
        errors: {
            productDetails: {
                fileUpload: "",
            },
        },
    },
    mutations: {
        // delivery option
        setDeliveryFee(state, fee) {
            state.deliveryDetails.deliveryFee = fee;
        },
        setDeliveryOption(state, option) {
            state.deliveryDetails.DeliveryOption = option;
        },
        setPreviousOption(state, option) {
            state.deliveryDetails.previousDeliveryOption = option
        },
        // pricing component
        setPricingComponentLoading(state, loading) {
            state.pricingComponent.loading = loading;
        },
        setPricingComponentDeliveryFeeLoading(state, loading) {
            state.pricingComponent.deliveryFeeLoading = loading;
        },
        setPricingComponentLoaded(state, loaded) {
            state.pricingComponent.loaded = loaded;
        },
        // update price
        setPrice(state, price) {
            state.productDetails.price = price;
        },
        setTotalPrice(state, price) {
            state.productDetails.totalPrice = price;
        },
        setFileAttached(state, cond) {
            state.productDetails.fileUpload = cond;
        },
        setSessionId(state, sessionId) {
            state.sessionId = sessionId;
        },
        setDeliveryDetails(state, details) {
            state.deliveryDetails = details;
        },
        setIsLookupSuccess(state, cond) {
            state.deliveryDetails.isLookupSuccess = cond;
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
        // store.js or a specific module
        async fetchPrice({dispatch}, {fromSession} = {}) {
            // Use default value `true` only when `fromSession` is `undefined` (not `null` or `false`).
            if (typeof fromSession === 'undefined') {
                fromSession = true;
            }
            console.log('fetch price: fromSession:', fromSession);
            dispatch('updatePricingComponentLoading', true);
            try {
                const response = await axios.post(`${process.env.VUE_APP_BACKOFFICE_API_BASE_URL}/checkout/calculate-order-price`, {
                    product_name: this.state.productDetails.productName,
                    product_details: this.state.productDetails,
                    sessionId: this.state.sessionId,
                    fromSession: fromSession,
                });
                await dispatch('updatePrice', response.data.price);
                await dispatch('updateTotalPrice', response.data.totalPrice);
                console.log('Price fetched:', response.data.price);
            } catch (error) {
                console.error('Error fetching price:', error);
            } finally {
                dispatch('updatePricingComponentLoading', false);
            }
        },
        // delivery option
        updateDeliveryOption({commit}, option) {
            commit("setDeliveryOption", option);
        },
        updateDeliveryFee({commit}, fee) {
            commit("setDeliveryFee", fee);
        },
        updatePreviousOption({commit}, option) {
            commit("setPreviousOption", option);
        },
        // pricing component
        updatePricingComponentLoading({commit}, loading) {
            commit("setPricingComponentLoading", loading);
        },
        updatePricingComponentLoaded({commit}, loaded) {
            commit("setPricingComponentLoaded", loaded);
        },
        updatePricingComponentDeliveryFeeLoading({commit}, loaded) {
            commit("setPricingComponentDeliveryFeeLoading", loaded);
        },
        // update price
        updatePrice({commit}, price) {
            commit("setPrice", price);
        },
        updateTotalPrice({commit}, price) {
            commit("setTotalPrice", price);
        },
        async fetchAndGenerateSessionId({commit}) {
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

        async clearSessionId({commit}) {
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

        updateDeliveryDetails({commit}, details) {
            commit("setDeliveryDetails", details);
        },
        updateIsLookupSuccess({commit}, cond) {
            commit("setIsLookupSuccess", cond);
        },
        updateDeliveryAddressResponse({commit}, response) {
            commit("setDeliveryAddressResponse", response);
        },
        updateAddressLookup({commit}, cond) {
            commit("setAddressLookup", cond);
        },
        updateProductDetails({commit}, details) {
            commit("setProductDetails", details);
        },
        updateYourDetails({commit}, details) {
            commit("setYourDetails", details);
        },
        hasFileAttached({commit}, cond) {
            commit("setFileAttached", cond);
        },
        // error actions
        setFileUploadError({commit}, errorMessage) {
            commit("SET_FILE_UPLOAD_ERROR", errorMessage);
        },
        setErrors({commit}, errors) {
            commit("SET_ERRORS", errors);
        },
        clearErrors({commit}) {
            commit("CLEAR_ERRORS");
        },
    },
    getters: {
        getPricingComponentLoading: (state) => state.pricingComponent.loading,
        getPricingComponentDeliveryFeeLoading: (state) => state.pricingComponent.deliveryFeeLoading,
        getPricingComponentLoaded: (state) => state.pricingComponent.loaded,
        getDeliveryDetails: (state) => state.deliveryDetails,
        getIsLookupSuccess: (state) => state.deliveryDetails.isLookupSuccess,
        getProductDetails: (state) => state.productDetails,
        getYourDetails: (state) => state.yourDetails,
        getAddressLookup: (state) => state.deliveryDetails.showAddressLookup,
        getErrors: (state) => state.errors,
        getSessionId: (state) => state.sessionId,
        getDeliveryOption: (state) => state.deliveryDetails.DeliveryOption,
        getPreviousOption: (state) => state.deliveryDetails.previousDeliveryOption,
        getPrice: (state) => state.productDetails.price,
        getTotalPrice: (state) => state.productDetails.totalPrice,
        getDeliveryFee: (state) => state.deliveryDetails.deliveryFee,
    },
});

export default store;
