<template>
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
                                <small class="d-block mb-3 px-2 text-muted">To receive express same-day delivery, please
                                    continue
                                    to fill
                                    out the form and let us know your preferred delivery time in the comment
                                    section</small>

                                <div class="form-check">
                                    <input v-model="form.deliveryOption" class="form-check-input" type="radio" checked
                                        name="deliveryOption" id="priorityTomorrow" value="Priority service tomorrow">
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
                                    <label class="form-check-label" for="superExpressNight">Super Express Night Delivery
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
                                    <label class="form-check-label" for="expressTomorrow1pm">Express Delivery Tomorrow
                                        by 1
                                        pm *£££ express charges may apply</label>
                                </div>

                                <div class="form-check">
                                    <input v-model="form.deliveryOption" class="form-check-input" type="radio"
                                        name="deliveryOption" id="expressTomorrow6pm"
                                        value="Express Delivery Tomorrow by 6 pm *££ express charges may apply">
                                    <label class="form-check-label" for="expressTomorrow6pm">Express Delivery Tomorrow
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
                                        name="deliveryOption" id="standard35days" value="Standard (3-5 working days)">
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
                    <div class="form-group mt-4">
                        <label for="deliveryAddress" class="form-label">Delivery Address</label>
                        <small class="form-text text-muted">Enter postcode and click the Lookup button.</small>
                        <div class="input-group">
                            <input v-model="form.deliveryAddress" type="text" class="form-control" name="deliveryAddress"
                                placeholder="Enter postcode...">
                            <button class="btn btn-warning" type="button" id="lookUpButton">Look Up</button>
                        </div>
                    </div>

                    <div class="mt-4" style="margin-inline: 1rem">
                        <button type="button" class="btn btn-block btn-primary" @click="$emit('next-step')">
                            Next
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    name: 'DeliveryDetails',
    data() {
        return {
            form: {
                deliveryOption: '',
                deliveryAddress: ''
            }
        };
    },
    computed: {
        ...mapGetters(['getDeliveryDetails'])
    },
    methods: {
        ...mapActions(['updateDeliveryDetails']),
        saveDetails() {
            this.updateDeliveryDetails(this.form); // Use the form data to update the store
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
