<template>
    <div class="container">

        <!-- <HeaderComponent /> -->


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
                            <span class="position-absolute bg-white" style="white-space: nowrap; z-index: 100">Flyers
                                settings 1</span>
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
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="singleSided">Sides</label>
                                    <div class="form-check">
                                        <input v-model="form.slides" class="form-check-input" type="radio" name="sides"
                                            value="singleSided" id="singleSided" />
                                        <label class="form-check-label" for="singleSided">Single sided</label>
                                    </div>
                                    <div class="form-check">
                                        <input v-model="form.slides" class="form-check-input" type="radio" name="sides"
                                            value="doubleSided" id="doubleSided" />
                                        <label class="form-check-label" for="doubleSided">Double sided</label>
                                    </div>
                                    <div v-if="errors['productDetails.slides']" class="text-danger">{{
                                        errors['productDetails.slides'][0] }}</div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="portrait">Orientation</label>
                                    <div class="form-check">
                                        <input v-model="form.orientation" class="form-check-input" type="radio"
                                            name="orientation" id="portrait" value="portrait" />
                                        <label class="form-check-label" for="portrait">Portrait</label>
                                    </div>
                                    <div class="form-check">
                                        <input v-model="form.orientation" class="form-check-input" type="radio"
                                            name="orientation" id="landscape" value="landscape" />
                                        <label class="form-check-label" for="landscape">Landscape</label>
                                    </div>
                                    <div v-if="errors['productDetails.orientation']" class="text-danger">{{
                                        errors['productDetails.orientation'][0] }}</div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="gsm130">Paper Thickness
                                        <i class="fa fa-info-circle" aria-hidden="true"
                                            style="color: black"></i></label>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" v-model="form.paperThickness"
                                            name="paperThickness" value="gsm130" id="gsm130" />
                                        <label class="form-check-label" for="gsm130">130 GSM</label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" v-model="form.paperThickness"
                                            name="paperThickness" value="gsm170" id="gsm170" />
                                        <label class="form-check-label" for="gsm170">170 GSM</label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" v-model="form.paperThickness"
                                            name="paperThickness" value="gsm250" id="gsm250" />
                                        <label class="form-check-label" for="gsm250">250 GSM</label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" v-model="form.paperThickness"
                                            name="paperThickness" value="gsm300" id="gsm300" />
                                        <label class="form-check-label" for="gsm300">300 GSM</label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" v-model="form.paperThickness"
                                            name="paperThickness" value="gsm350" id="gsm350" />
                                        <label class="form-check-label" for="gsm350">350 GSM</label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" v-model="form.paperThickness"
                                            name="paperThickness" value="customThickness" id="customThickness" />
                                        <label class="form-check-label" for="customThickness">Custom</label>
                                    </div>
                                    <div v-if="errors['productDetails.paperThickness']" class="text-danger">{{
                                        errors['productDetails.paperThickness'][0] }}</div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="silkMatt">Paper Type
                                        <i class="fa fa-info-circle" aria-hidden="true" style="color: black"></i>
                                    </label>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" v-model="form.paperType"
                                            name="paperType" value="silkMatt" id="silkMatt" />
                                        <label class="form-check-label" for="silkMatt">Silk (Matt)</label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" v-model="form.paperType"
                                            name="paperType" value="gloss" id="gloss" />
                                        <label class="form-check-label" for="gloss">Gloss</label>
                                    </div>
                                    <div v-if="errors['productDetails.paperType']" class="text-danger">{{
                                        errors['productDetails.paperType'][0] }}</div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="a6Size">Finished Size
                                        <i class="fa fa-info-circle" aria-hidden="true" style="color: black"></i>
                                    </label>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" v-model="form.finishedSize"
                                            name="finishedSize" value="a6Size" id="a6Size" />
                                        <label class="form-check-label" for="a6Size">A6</label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" v-model="form.finishedSize"
                                            name="finishedSize" value="a5Size" id="a5Size" />
                                        <label class="form-check-label" for="a5Size">A5</label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" v-model="form.finishedSize"
                                            name="finishedSize" value="a4Size" id="a4Size" />
                                        <label class="form-check-label" for="a4Size">A4</label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" v-model="form.finishedSize"
                                            name="finishedSize" value="customSize" id="customSize" />
                                        <label class="form-check-label" for="customSize">Custom</label>
                                    </div>
                                    <div v-if="errors['productDetails.finishedSize']" class="text-danger">{{
                                        errors['productDetails.finishedSize'][0] }}</div>
                                </div>
                            </div>
                        </div>

                        <div class="form-group mt-4">
                            <label class="form-label">Do you have your design file/document/artwork ready?</label>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" id="yes" value="1"
                                    v-model="form.hasDesignFile" />
                                <label class="form-check-label" for="yes">Yes</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" id="no" value="0"
                                    v-model="form.hasDesignFile" />
                                <label class="form-check-label" for="no">No</label>
                            </div>
                            <div v-if="errors['productDetails.hasDesignFile']" class="text-danger">{{
                                errors['productDetails.hasDesignFile'][0] }}</div>
                        </div>

                        <!-- Conditionally rendered file upload field -->
                        <div v-if="form.hasDesignFile === '1'" class="form-group mt-4" style="margin-inline: 1rem">
                            <label for="fileUpload" style="margin-bottom: 5px">Upload Design File (multiple files
                                allowed) [optional]</label>
                            <div class="p-3 text-center" style="position: relative; border: 1px dashed grey">
                                <input type="file" class="form-control" id="fileUpload" multiple
                                    style="opacity: 0; position: absolute; width: 100%; height: 100%; z-index: 100;" />
                                <label for="fileUpload" class="d-block">
                                    Drop your file here or <span class="btn btn-primary btn-sm">upload file</span>
                                </label>
                            </div>
                            <small class="form-text text-muted">Accepted file types: pdf, doc, docx, xls, xlsx, eps, ai,
                                ps, zip, jpg, jpeg, png, gif, Max. file size: 256 MB, Max. files: 100</small>
                        </div>

                        <div v-else class="form-group mt-4" style="margin-inline: 1rem">
                            <label for="whenArtworkSend" style="margin-bottom: 5px">When can you send us the
                                artwork?</label><span class="text-danger">*</span>
                            <input v-model="form.whenArtworkSend" class="form-control" id="whenArtworkSend"
                                placeholder="Write here">
                            <small class="text-muted">Please provide the most accurate estimate possible to help us
                                determine the appropriate quote.</small>
                            <div v-if="errors['productDetails.whenArtworkSend']" class="text-danger">{{
                                errors['productDetails.whenArtworkSend'][0] }}</div>
                        </div>

                        <div class="form-group mt-4" style="margin-inline: 1rem">
                            <label for="comment" style="margin-bottom: 5px">Comment (optional)</label>
                            <textarea v-model="form.comment" class="form-control" id="comment" rows="3"
                                placeholder="Write here" style="outline: none"></textarea>
                            <div v-if="errors['productDetails.comment']" class="text-danger">{{
                                errors['productDetails.comment'][0] }}</div>
                        </div>
                        <div class="mt-4" style="margin-inline: 1rem">
                            <router-link :to="{ name: 'DeliveryDetails' }" type="submit" @click.prevent="saveDetails"
                                class="btn btn-block btn-primary">
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
// import HeaderComponent from '@/components/layout/HeaderComponent.vue';
export default {
    name: 'ProductDetails',
    components: {
        // HeaderComponent
    },
    data() {
        return {
            form: {
                productName: '',
                hasDesignFile: '',
                slides: '',
                orientation: '',
                paperThickness: '',
                paperType: '',
                finishedSize: '',
                whenArtworkSend: '',
                comment: '',
            },
            errors: {},
        };
    },
    computed: {
        ...mapGetters(['getProductDetails', 'getErrors']),
    },
    methods: {
        ...mapActions(['updateProductDetails']),
        saveDetails() {
            console.log(this.form);
            this.updateProductDetails(this.form); // Use the form data to update the store
        }
    },
    mounted() {
        this.form.hasDesignFile = this.hasDesignFile;
        this.errors = this.getErrors;
        this.$nextTick(() => {
            const details = this.getProductDetails;
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
