<template>
  <div class="container">
    <div class="pricing-sticky ms-2" style="top: 15px;">
      <!-- PricingComponent for mobile (below the form, visible on mobile) -->
      <MobilePricingComponent/>
    </div>
    <div class="row">
      <div class="d-none d-lg-block col-lg-2 position-relative">
        <div class="position-absolute bg-secondary rounded text-white d-flex justify-content-center align-items-center"
             style="width: 150px; height: 100px; top: 52px; left: 34px;">
          <span class="bg-white text-dark rounded text-center px-2 py-1">Flyers</span>
        </div>
      </div>
      <div class="col-md-7 col-12 border rounded mt-5" style="border-color: rgb(185, 185, 185);">
        <div class="position-relative" style="top: -14px; margin-left: 40px;">
          <div class="d-flex justify-content-between">
            <div class="position-relative">
              <span class="position-absolute bg-white" style="white-space: nowrap; z-index: 100;">Final preview</span>
            </div>
          </div>
        </div>
        <form @submit.prevent="saveDetails">
          <div class="card-body m-3 pb-5">
            <div class="row g-3 px-3">
              <div class="form-group col-12">
                <label for="inputName">Your Name*</label>
                <input type="text" class="form-control"
                       :class="{ 'is-invalid': errors['yourDetails.name'] }" id="inputName"
                       v-model="form.name" required>
                <div v-if="errors['yourDetails.name']" class="text-danger">
                  {{ errors['yourDetails.name'][0] }}
                </div>
              </div>

              <div class="row col-12">
                <div class="form-group col-md-6">
                  <label for="inputEmail">Your Email*</label>
                  <input type="email" class="form-control"
                         :class="{ 'is-invalid': errors['yourDetails.email'] }" id="inputEmail"
                         v-model="form.email" required>
                  <div v-if="errors['yourDetails.email']" class="text-danger">
                    {{ errors['yourDetails.email'][0] }}
                  </div>
                </div>

                <div class="form-group col-md-6">
                  <label for="confirmEmail">Confirm Email*</label>
                  <input type="email" class="form-control"
                         :class="{ 'is-invalid': errors['yourDetails.confirmEmail'] }" id="confirmEmail"
                         v-model="form.confirmEmail" required>
                  <div v-if="errors['yourDetails.confirmEmail']" class="text-danger">
                    {{ errors['yourDetails.confirmEmail'][0] }}
                  </div>
                </div>
              </div>

              <div class="form-group col-12">
                <label for="inputPhone">Your Phone Number*</label>
                <input type="tel" class="form-control"
                       :class="{ 'is-invalid': errors['yourDetails.phone'] }" id="inputPhone"
                       v-model="form.phone" required>
                <div v-if="errors['yourDetails.phone']" class="text-danger">
                  {{ errors['yourDetails.phone'][0] }}
                </div>
              </div>

              <div class="form-group col-12">
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
                <div v-if="errors['yourDetails.whoWillReceive']" class="text-danger">
                  {{ errors['yourDetails.whoWillReceive'][0] }}
                </div>
              </div>

              <div v-if="form.whoWillReceive == 'someone_else'" class="col-12">
                <div class="form-group">
                  <label for="recipientName">Recipient's name? *</label>
                  <input type="text" class="form-control"
                         :class="{ 'is-invalid': errors['yourDetails.recipientsName'] }"
                         id="recipientName" v-model="form.recipientsName">
                  <div v-if="errors['yourDetails.recipientsName']" class="text-danger">
                    {{ errors['yourDetails.recipientsName'][0] }}
                  </div>
                </div>

                <div class="form-group">
                  <label for="recipientPhone">Recipient's phone number? *</label>
                  <input type="tel" class="form-control"
                         :class="{ 'is-invalid': errors['yourDetails.recipientsPhone'] }"
                         id="recipientPhone" v-model="form.recipientsPhone">
                  <div v-if="errors['yourDetails.recipientsPhone']" class="text-danger">
                    {{ errors['yourDetails.recipientsPhone'][0] }}
                  </div>
                </div>
              </div>

              <div class="form-group col-12">
                <label for="additionalInstructions">Any further instructions or details? (optional)</label>
                <textarea v-model="form.additionalInstructions" class="form-control"
                          :class="{ 'is-invalid': errors['yourDetails.additionalInstructions'] }"
                          id="additionalInstructions" rows="3"></textarea>
                <div v-if="errors['yourDetails.additionalInstructions']" class="text-danger">
                  {{ errors['yourDetails.additionalInstructions'][0] }}
                </div>
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
      <div class="col-12 col-md-5 col-lg-3 d-none d-md-block">
        <PricingComponent/>
      </div>
    </div>
  </div>
</template>


<script>
import {mapActions, mapGetters} from 'vuex';
import PricingComponent from "@/components/PricingComponent.vue";
import MobilePricingComponent from "@/components/MobilePricingComponent.vue";

export default {
  name: 'YourDetails',
  components: {MobilePricingComponent, PricingComponent},

  data() {
    return {
      form: {
        name: '',
        email: '',
        confirmEmail: '',
        phone: '',
        whoWillReceive: '',
        additionalInstructions: ''
      },
      errors: {}
    };
  },
  computed: {
    ...mapGetters(['getYourDetails', 'getErrors']),
  },
  methods: {
    ...mapActions(['updateYourDetails']),
    saveDetails() {
      this.updateYourDetails(this.form); // Use the form data to update the store
    }
  },
  mounted() {
    this.errors = this.getErrors;
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
