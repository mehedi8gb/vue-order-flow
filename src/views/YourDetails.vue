<template>
    <div class="container">
        <!-- <HeaderComponent></HeaderComponent> -->
        <div class="d-flex">
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
                            <span class="position-absolute bg-white" style="white-space: nowrap; z-index: 100">Final
                                preview</span>
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
                        <div class="row g-3 px-3">
                            <div class="form-group mt-4">
                                <label for="inputName">Your Name*</label>
                                <input type="text" class="form-control" id="inputName" v-model="form.name" required>
                            </div>
                            <div class="row mt-2">
                                <div class="form-group col-md-6">
                                    <label for="inputEmail">Your Email*</label>
                                    <input type="email" class="form-control" id="inputEmail" v-model="form.email"
                                        required>
                                </div>

                                <div class="form-group col-md-6">
                                    <label for="confirmEmail">Confirm Email*</label>
                                    <input type="email" class="form-control" id="confirmEmail" name="confirmEmail"
                                        v-model="form.confirmEmail" required>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="inputPhone">Your Phone Number*</label>
                                <input type="tel" class="form-control" id="inputPhone" name="phone" v-model="form.phone"
                                    required>
                            </div>

                            <div class="form-group">
                                <label>Who will receive the order?*</label>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="recipient" id="myself"
                                        v-model="form.whoWillReceive" value="myself">
                                    <label class="form-check-label" for="myself">Myself</label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="recipient" id="someoneElse"
                                        v-model="form.whoWillReceive" value="someone_else">
                                    <label class="form-check-label" for="someoneElse">Someone else</label>
                                </div>
                            </div>

                            <div v-if="form.whoWillReceive == 'someone_else'" class="form-group">
                                <div class="form-group">
                                    <label for="inputName">Recipient's name? *</label>
                                    <input type="text" class="form-control" id="inputName" name="inputName"
                                        v-model="form.recipientsName">
                                </div>

                                <div class="form-group">
                                    <label for="inputPhone">Recipient's phone number? *</label>
                                    <input type="tel" class="form-control" id="inputPhone" name="phone"
                                        v-model="form.recipientsPhone">
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="additionalInstructions">Any further instructions or details?
                                    (optional)</label>
                                <textarea v-model="form.additionalInstructions" class="form-control"
                                    id="additionalInstructions" rows="3" name="instructions"></textarea>
                            </div>


                        </div>
                        <div class="my-4 d-flex justify-content-between align-items-center">
                            <router-link :to="{ name: 'DeliveryDetails' }" class="btn btn-outline-secondary btn-md">
                                Previous
                            </router-link>

                            <router-link :to="{ name: 'OrderSuccess' }" class="btn btn-success btn-block">
                                Submit
                            </router-link>
                        </div>

                        <div class="mt-3">
                            <button type="button" class="btn btn-primary btn-block btn-md" data-bs-toggle="tooltip"
                                data-bs-placement="top" title="Save your progress and continue later">
                                Save and Continue Later
                            </button>
                        </div>




                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
// import HeaderComponent from '@/components/layout/HeaderComponent.vue';
import { mapActions, mapGetters } from 'vuex';
export default {
    name: 'YourDetails',
    components: {
        // HeaderComponent
    },

    data() {
        return {
            form: {
                name: '',
                email: '',
                confirmEmail: '',
                phone: '',
                whoWillReceive: '',
                additionalInstructions: ''
            }
        };
    },
    computed: {
        ...mapGetters(['getYourDetails'])
    },
    methods: {
        ...mapActions(['updateYourDetails']),
        saveDetails() {
            this.updateYourDetails(this.form); // Use the form data to update the store
        }
    },
    mounted() {
        this.$nextTick(() => {
            const details = this.getYourDetails;
            if (details) {
                this.form = details; // Populate the form with existing details if available
            }
        });
    }
};
</script>

<style>
body {
    padding-top: 20px !important;
}
</style>
