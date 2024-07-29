<template>
    <div class="container">

        <HeaderComponent></HeaderComponent>
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
                    <div class="card-body m-3 pb-5">
                        <div class="row g-3">
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
                        </div>
                        <div v-if="form.deliveryOption === 'I have a custom delivery deadline'" class="form-group mt-4">
                            <label for="deliveryDeadline" class="form-label">What is your delivery deadline?</label><br>
                            <small class="form-text text-muted">You can describe deadline here.</small>
                            <div class="input-group">
                                <input v-model="form.deliveryDeadline" type="text" class="form-control"
                                    name="deliveryDeadline" placeholder="Enter delivery deadline">
                            </div>
                        </div>
                        <div class="form-group mt-4">
                            <label for="postcode" class="form-label">Delivery Address</label><br>
                            <small class="form-text text-muted">Enter postcode and click the Lookup button.</small>
                            <div class="input-group">
                                <input v-model="form.postcode" type="text" class="form-control" name="postcode"
                                    placeholder="Enter postcode...">
                                <button class="btn btn-warning" type="button" @click="lookUp">Look
                                    Up</button>
                            </div>
                            <div v-if="data == 'error'">
                                <div class="row mt-4">
                                    <div class="form-group mb-3 col-md-6">
                                        <label for="nameNumber" class="form-label">Name/Number and Street</label>
                                        <input v-model="form.nameNumber" type="text" class="form-control"
                                            id="nameNumber" placeholder="Enter name/number and street">
                                    </div>

                                    <div class="form-group mb-3 col-md-6">
                                        <label for="addressLine2" class="form-label">Address Line 2</label>
                                        <input v-model="form.addressLine2" type="text" class="form-control"
                                            id="addressLine2" placeholder="Enter address line 2">
                                    </div>

                                    <div class="form-group mb-3">
                                        <label for="townCity" class="form-label">Town/City</label>
                                        <input v-model="form.townCity" type="text" class="form-control" id="townCity"
                                            placeholder="Enter town/city">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="my-4 d-flex justify-content-between align-items-center">
                            <router-link :to="{ name: 'ProductDetails' }" class="btn btn-outline-secondary btn-md">
                                Previous
                            </router-link>

                            <router-link :to="{ name: 'YourDetails' }" class="btn btn-primary btn-block">
                                Next
                            </router-link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import axios from 'axios';
import toast from '@/utils/toast';
import HeaderComponent from '@/components/layout/HeaderComponent.vue';
export default {
    name: 'DeliveryDetails',
    components: {
        HeaderComponent
    },
    data() {
        return {
            form: {
                deliveryOption: '',
                deliveryAddressResponse: '',
                postcode: '',
                nameNumber: '',
                addressLine2: '',
                townCity: ''
            },
            data: null,
            apiUrl: 'https://services.3xsoftware.co.uk/Search/ByPostcode/json',
            username: 'OliuChowdhury788333',
            key: '8MD1-0O7H-H2TI-FFAL'
        };
    },
    computed: {
        ...mapGetters(['getDeliveryDetails'])
    },
    methods: {
        ...mapActions(['updateDeliveryDetails']),
        saveDetails() {
            this.updateDeliveryDetails(this.form); // Use the form data to update the store
        },
        lookUp() {
            if (this.form.postcode) {
                axios
                    .get(`${this.apiUrl}?username=${this.username}&key=${this.key}&postcode=${this.form.postcode}`)
                    .then(response => {
                        this.data = response.data;
                        console.log(this.data);

                    })
                    .catch(error => {
                        console.error("There was an error fetching the data!", error);
                        this.data = 'error';
                        toast.error("There was an error fetching the data!");
                    });
            }
        }
    },
    mounted() {
        this.$nextTick(() => {
            const details = this.getDeliveryDetails;
            if (details) {
                this.form = details; // Populate the form with existing details if available
            }
        });
    }
};
</script>

<style>
@import '~bootstrap/dist/css/bootstrap.min.css';

/* Add your global styles here */
body {
    padding-top: 56px;
}
</style>
