<template>
    <div class="container">

        <!-- <HeaderComponent></HeaderComponent> -->
        <div class="d-flex pb-lg-4">
            <div class="position-relative" style="width: 200px">
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
                    <loading v-model:active="isLoading" :can-cancel="false" :is-full-page="false" :loader="'bars'" />

                    <div class="card-body m-3 pb-5">
                        <!-- <div class="row g-3">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label>When would you like to receive your item?*</label>
                                    <small class="d-block mb-3 px-2 text-muted">To receive express same-day delivery,
                                        please
                                        continue
                                        to fill
                                        out the form and let us know your preferred delivery time in the comment
                                        section</small>

                                    <div class="form-check">
                                        <input v-model="form.deliveryOption" class="form-check-input" type="radio"
                                            checked name="deliveryOption" id="priorityTomorrow"
                                            value="Priority service tomorrow">
                                        <label class="form-check-label" for="priorityTomorrow">Priority service
                                            tomorrow</label>
                                    </div>

                                    <div class="form-check">
                                        <input v-model="form.deliveryOption" class="form-check-input" type="radio"
                                            name="deliveryOption" id="superExpressToday"
                                            value="Super Express Same Day Delivery ( by 6 pm today) *£££ express charges may apply">
                                        <label class="form-check-label" for="superExpressToday">Super Express Same Day
                                            Delivery
                                            (by 6 pm today) *£££ express charges may apply</label>
                                    </div>

                                    <div class="form-check">
                                        <input v-model="form.deliveryOption" class="form-check-input" type="radio"
                                            name="deliveryOption" id="superExpressNight"
                                            value="Super Express Night Delivery (by 11:59 pm today) *£££ express charges may apply">
                                        <label class="form-check-label" for="superExpressNight">Super Express Night
                                            Delivery
                                            (by
                                            11:59 pm today) *£££ express charges may apply</label>
                                    </div>

                                    <div class="form-check">
                                        <input v-model="form.deliveryOption" class="form-check-input" type="radio"
                                            name="deliveryOption" id="expressTomorrow1030am"
                                            value="Express Delivery Tomorrow by 10:30 am *£££ express charges may apply">
                                        <label class="form-check-label" for="expressTomorrow1030am">Express Delivery
                                            Tomorrow by
                                            10:30 am *£££ express charges may apply</label>
                                    </div>

                                    <div class="form-check">
                                        <input v-model="form.deliveryOption" class="form-check-input" type="radio"
                                            name="deliveryOption" id="expressTomorrow1pm"
                                            value="Express Delivery Tomorrow by 1 pm *£££ express charges may apply">
                                        <label class="form-check-label" for="expressTomorrow1pm">Express Delivery
                                            Tomorrow
                                            by 1
                                            pm *£££ express charges may apply</label>
                                    </div>

                                    <div class="form-check">
                                        <input v-model="form.deliveryOption" class="form-check-input" type="radio"
                                            name="deliveryOption" id="expressTomorrow6pm"
                                            value="Express Delivery Tomorrow by 6 pm *££ express charges may apply">
                                        <label class="form-check-label" for="expressTomorrow6pm">Express Delivery
                                            Tomorrow
                                            by 6
                                            pm *££ express charges may apply</label>
                                    </div>

                                    <div class="form-check">
                                        <input v-model="form.deliveryOption" class="form-check-input" type="radio"
                                            name="deliveryOption" id="priorityTomorrow1159pm"
                                            value="Priority Delivery Tomorrow by 11:59 pm">
                                        <label class="form-check-label" for="priorityTomorrow1159pm">Priority Delivery
                                            Tomorrow
                                            by 11:59 pm</label>
                                    </div>

                                    <div class="form-check">
                                        <input v-model="form.deliveryOption" class="form-check-input" type="radio"
                                            name="deliveryOption" id="standard2days"
                                            value="Standard 2 Working Days Delivery">
                                        <label class="form-check-label" for="standard2days">Standard 2 Working Days
                                            Delivery</label>
                                    </div>

                                    <div class="form-check">
                                        <input v-model="form.deliveryOption" class="form-check-input" type="radio"
                                            name="deliveryOption" id="standard3days"
                                            value="Standard 3 Working Days Delivery">
                                        <label class="form-check-label" for="standard3days">Standard 3 Working Days
                                            Delivery</label>
                                    </div>

                                    <div class="form-check">
                                        <input v-model="form.deliveryOption" class="form-check-input" type="radio"
                                            name="deliveryOption" id="standard4days"
                                            value="Standard 4 Working Days Delivery">
                                        <label class="form-check-label" for="standard4days">Standard 4 Working Days
                                            Delivery</label>
                                    </div>

                                    <div class="form-check">
                                        <input v-model="form.deliveryOption" class="form-check-input" type="radio"
                                            name="deliveryOption" id="standard35days"
                                            value="Standard (3-5 working days)">
                                        <label class="form-check-label" for="standard35days">Standard (3-5 working
                                            days)</label>
                                    </div>

                                    <div class="form-check">
                                        <input v-model="form.deliveryOption" class="form-check-input" type="radio"
                                            name="deliveryOption" id="customDeadline"
                                            value="I have a custom delivery deadline">
                                        <label class="form-check-label" for="customDeadline">I have a custom delivery
                                            deadline</label>
                                    </div>
                                </div>

                            </div>
                        </div> -->

                        <label>When would you like to receive your item?*</label>
                        <small class="d-block mb-3 px-2 text-muted">
                            To receive express same-day delivery, please continue to fill out the form and let us know
                            your preferred delivery time in the comment section.
                        </small>

                        <!-- Display error message from Vuex state -->
                        <div v-if="errors['deliveryDetails.deliveryOption']" class="alert alert-danger" role="alert">
                            {{ errors['deliveryDetails.deliveryOption'][0] }}
                        </div>

                        <!-- Radio button options loop -->
                        <div class="form-check" v-for="option in deliveryOptions" :key="option.id">
                            <input v-model="form.deliveryOption" class="form-check-input" type="radio" :id="option.id"
                                :name="option.name" :value="option.value">
                            <label class="form-check-label" :for="option.id">
                                {{ option.label }}
                            </label>
                        </div>

                        <div v-if="form.deliveryOption === 'I have a custom delivery deadline'" class="form-group mt-4">
                            <label for="deliveryDeadline" class="form-label">What is your delivery deadline?</label><br>
                            <small class="form-text text-muted">You can describe deadline here.</small>
                            <div class="input-group">
                                <input v-model="form.deliveryDeadline" type="text" class="form-control"
                                    :class="{ 'is-invalid': errors['deliveryDetails.deliveryDeadline'] }"
                                    name="deliveryDeadline" placeholder="Enter delivery deadline">
                                <div v-if="errors['deliveryDetails.deliveryDeadline']" class="invalid-feedback">
                                    {{ errors['deliveryDetails.deliveryDeadline'][0] }}
                                </div>
                            </div>
                        </div>
                        <div class="form-group mt-4">
                            <label for="postcode" class="form-label">Delivery Address</label><br>
                            <small class="form-text text-muted">Enter postcode and click the Lookup button.</small>
                            <div class="input-group">
                                <input v-model="form.postcode" type="text" class="form-control"
                                    :class="{ 'is-invalid': errors['deliveryDetails.postcode'] }" name="postcode"
                                    placeholder="Enter postcode...">
                                <button class="btn btn-warning" type="button" @click="lookUp">Look
                                    Up</button>
                                <div v-if="errors['deliveryDetails.postcode']" class="invalid-feedback">
                                    {{ errors['deliveryDetails.postcode'][0] }}
                                </div>
                            </div>


                            <div v-if="showAddressForm()">
                                <div class="row mt-4">
                                    <div class="form-group mb-3 col-md-6">
                                        <label for="nameNumber" class="form-label">Name/Number and Street</label>
                                        <input v-model="form.nameNumber" type="text" class="form-control"
                                            :class="{ 'is-invalid': errors['deliveryDetails.nameNumber'] }"
                                            id="nameNumber" placeholder="Enter name/number and street" />
                                        <div v-if="errors['deliveryDetails.nameNumber']" class="invalid-feedback">
                                            {{ errors['deliveryDetails.nameNumber'][0] }}
                                        </div>
                                    </div>

                                    <div class="form-group mb-3 col-md-6">
                                        <label for="addressLine2" class="form-label">Address Line 2</label>
                                        <input v-model="form.addressLine2" type="text" class="form-control"
                                            :class="{ 'is-invalid': errors['deliveryDetails.addressLine2'] }"
                                            id="addressLine2" placeholder="Enter address line 2" />
                                        <div v-if="errors['deliveryDetails.addressLine2']" class="invalid-feedback">
                                            {{ errors['deliveryDetails.addressLine2'][0] }}
                                        </div>
                                    </div>

                                    <div class="form-group mb-3">
                                        <label for="townCity" class="form-label">Town/City</label>
                                        <input v-model="form.townCity" type="text" class="form-control"
                                            :class="{ 'is-invalid': errors['deliveryDetails.townCity'] }" id="townCity"
                                            placeholder="Enter town/city" />
                                        <div v-if="errors['deliveryDetails.townCity']" class="invalid-feedback">
                                            {{ errors['deliveryDetails.townCity'][0] }}
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
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

import axios from 'axios';
import toast from '@/utils/toast';
export default {
    name: 'DeliveryDetails',
    components: {
        Loading,
    },
    data() {
        return {
            form: {
                deliveryOption: '',
                deliveryAddressResponse: '',
                deliveryDeadline: '',
                postcode: '',
                nameNumber: '',
                addressLine2: '',
                townCity: '',
            },
            data: null,
            apiUrl: 'https://services.3xsoftware.co.uk/Search/ByPostcode/json',
            username: 'OliuChowdhury788333',
            key: '8MD1-0O7H-H2TI-FFAL',
            errors: {},
            deliveryOptions: [
                { id: 'priorityTomorrow', name: 'deliveryOption', value: 'Priority service tomorrow', label: 'Priority service tomorrow' },
                { id: 'superExpressToday', name: 'deliveryOption', value: 'Super Express Same Day Delivery (by 6 pm today) *£££ express charges may apply', label: 'Super Express Same Day Delivery (by 6 pm today) *£££ express charges may apply' },
                { id: 'superExpressNight', name: 'deliveryOption', value: 'Super Express Night Delivery (by 11:59 pm today) *£££ express charges may apply', label: 'Super Express Night Delivery (by 11:59 pm today) *£££ express charges may apply' },
                { id: 'expressTomorrow1030am', name: 'deliveryOption', value: 'Express Delivery Tomorrow by 10:30 am *£££ express charges may apply', label: 'Express Delivery Tomorrow by 10:30 am *£££ express charges may apply' },
                { id: 'expressTomorrow1pm', name: 'deliveryOption', value: 'Express Delivery Tomorrow by 1 pm *£££ express charges may apply', label: 'Express Delivery Tomorrow by 1 pm *£££ express charges may apply' },
                { id: 'expressTomorrow6pm', name: 'deliveryOption', value: 'Express Delivery Tomorrow by 6 pm *££ express charges may apply', label: 'Express Delivery Tomorrow by 6 pm *££ express charges may apply' },
                { id: 'priorityTomorrow1159pm', name: 'deliveryOption', value: 'Priority Delivery Tomorrow by 11:59 pm', label: 'Priority Delivery Tomorrow by 11:59 pm' },
                { id: 'standard2days', name: 'deliveryOption', value: 'Standard 2 Working Days Delivery', label: 'Standard 2 Working Days Delivery' },
                { id: 'standard3days', name: 'deliveryOption', value: 'Standard 3 Working Days Delivery', label: 'Standard 3 Working Days Delivery' },
                { id: 'standard4days', name: 'deliveryOption', value: 'Standard 4 Working Days Delivery', label: 'Standard 4 Working Days Delivery' },
                { id: 'standard35days', name: 'deliveryOption', value: 'Standard (3-5 working days)', label: 'Standard (3-5 working days)' },
                { id: 'customDeadline', name: 'deliveryOption', value: 'I have a custom delivery deadline', label: 'I have a custom delivery deadline' }
            ]

        };
    },
    computed: {
        ...mapGetters(['getDeliveryDetails', 'getErrors', 'getAddressLookup']),
    },
    methods: {
        ...mapActions(['updateDeliveryDetails', 'updateDeliveryAddressResponse', 'clearErrors', 'setErrors']),
        saveDetails() {
            this.updateDeliveryDetails(this.form);
            this.validateData();
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
                    this.$router.push({ name: 'YourDetails' });
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
                        this.data = response.data;
                        console.log(this.data);
                        this.form.deliveryAddressResponse = 'error';
                        this.updateDeliveryAddressResponse(this.form.deliveryAddressResponse);

                    })
                    .catch(error => {
                        console.error("There was an error fetching the data!", error);
                        toast.error("There was an error fetching the data!");
                        this.data = 'error';
                        this.form.deliveryAddressResponse = 'error';
                        this.updateDeliveryAddressResponse(this.form.deliveryAddressResponse);
                    });
            } else {
                toast.error("Please enter a postcode!");
                this.form.deliveryAddressResponse = 'incomplete';
                this.updateDeliveryAddressResponse(this.form.deliveryAddressResponse);
            }
        },
        showAddressForm() {
            const isAddressResponseError = this.form.deliveryAddressResponse === 'error' || this.form.deliveryAddressResponse === 'incomplete';

            const hasErrors = [
                'deliveryDetails.deliveryOption',
                'deliveryDetails.deliveryDeadline',
                'deliveryDetails.nameNumber',
                'deliveryDetails.townCity',
                'deliveryDetails.postcode'
            ].some(field => this.errors[field] && this.errors[field].length > 0);

            return isAddressResponseError || hasErrors || this.getAddressLookup;
        }

    },
    mounted() {
        this.$nextTick(() => {
            this.errors = this.getErrors;
            const details = this.getDeliveryDetails;
            if (details) {
                this.form = details; // Populate the form with existing details if available
            }
        });
    }
};
</script>

<style>
/* Add your global styles here */
body {
    padding-top: 20px !important;
}
</style>
