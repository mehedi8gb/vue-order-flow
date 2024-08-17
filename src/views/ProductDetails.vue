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
                    <loading v-model:active="isLoadingValidation" :can-cancel="false" :is-full-page="false"
                        :loader="'bars'" />

                    <div class="card-body m-3 pb-5">
                        <div class="row g-3 px-3">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="singleSided">Sides</label>
                                    <div class="form-check">
                                        <input v-model="productDetails.design.slides" class="form-check-input"
                                            type="radio" name="sides" value="singleSided" id="singleSided" />
                                        <label class="form-check-label" for="singleSided">Single sided</label>
                                    </div>
                                    <div class="form-check">
                                        <input v-model="productDetails.design.slides" class="form-check-input"
                                            type="radio" name="sides" value="doubleSided" id="doubleSided" />
                                        <label class="form-check-label" for="doubleSided">Double sided</label>
                                    </div>
                                    <div v-if="errors['productDetails.design.slides']" class="text-danger">{{
                                        errors['productDetails.design.slides'][0] }}</div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="portrait">Orientation</label>
                                    <div class="form-check">
                                        <input v-model="productDetails.design.orientation" class="form-check-input"
                                            type="radio" name="orientation" id="portrait" value="portrait" />
                                        <label class="form-check-label" for="portrait">Portrait</label>
                                    </div>
                                    <div class="form-check">
                                        <input v-model="productDetails.design.orientation" class="form-check-input"
                                            type="radio" name="orientation" id="landscape" value="landscape" />
                                        <label class="form-check-label" for="landscape">Landscape</label>
                                    </div>
                                    <div v-if="errors['productDetails.design.orientation']" class="text-danger">{{
                                        errors['productDetails.design.orientation'][0] }}</div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="gsm130">Paper Thickness
                                        <i class="fa fa-info-circle" aria-hidden="true"
                                            style="color: black"></i></label>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio"
                                            v-model="productDetails.design.paperThickness" name="paperThickness"
                                            value="gsm130" id="gsm130" />
                                        <label class="form-check-label" for="gsm130">130 GSM</label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio"
                                            v-model="productDetails.design.paperThickness" name="paperThickness"
                                            value="gsm170" id="gsm170" />
                                        <label class="form-check-label" for="gsm170">170 GSM</label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio"
                                            v-model="productDetails.design.paperThickness" name="paperThickness"
                                            value="gsm250" id="gsm250" />
                                        <label class="form-check-label" for="gsm250">250 GSM</label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio"
                                            v-model="productDetails.design.paperThickness" name="paperThickness"
                                            value="gsm300" id="gsm300" />
                                        <label class="form-check-label" for="gsm300">300 GSM</label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio"
                                            v-model="productDetails.design.paperThickness" name="paperThickness"
                                            value="gsm350" id="gsm350" />
                                        <label class="form-check-label" for="gsm350">350 GSM</label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio"
                                            v-model="productDetails.design.paperThickness" name="paperThickness"
                                            value="customThickness" id="customThickness" />
                                        <label class="form-check-label" for="customThickness">Custom</label>
                                    </div>
                                    <div v-if="errors['productDetails.design.paperThickness']" class="text-danger">{{
                                        errors['productDetails.design.paperThickness'][0] }}</div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="silkMatt">Paper Type
                                        <i class="fa fa-info-circle" aria-hidden="true" style="color: black"></i>
                                    </label>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio"
                                            v-model="productDetails.design.paperType" name="paperType" value="silkMatt"
                                            id="silkMatt" />
                                        <label class="form-check-label" for="silkMatt">Silk (Matt)</label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio"
                                            v-model="productDetails.design.paperType" name="paperType" value="gloss"
                                            id="gloss" />
                                        <label class="form-check-label" for="gloss">Gloss</label>
                                    </div>
                                    <div v-if="errors['productDetails.design.paperType']" class="text-danger">{{
                                        errors['productDetails.design.paperType'][0] }}</div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="a6Size">Finished Size
                                        <i class="fa fa-info-circle" aria-hidden="true" style="color: black"></i>
                                    </label>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio"
                                            v-model="productDetails.design.finishedSize" name="finishedSize"
                                            value="a6Size" id="a6Size" />
                                        <label class="form-check-label" for="a6Size">A6</label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio"
                                            v-model="productDetails.design.finishedSize" name="finishedSize"
                                            value="a5Size" id="a5Size" />
                                        <label class="form-check-label" for="a5Size">A5</label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio"
                                            v-model="productDetails.design.finishedSize" name="finishedSize"
                                            value="a4Size" id="a4Size" />
                                        <label class="form-check-label" for="a4Size">A4</label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio"
                                            v-model="productDetails.design.finishedSize" name="finishedSize"
                                            value="customSize" id="customSize" />
                                        <label class="form-check-label" for="customSize">Custom</label>
                                    </div>
                                    <div v-if="errors['productDetails.design.finishedSize']" class="text-danger">{{
                                        errors['productDetails.design.finishedSize'][0] }}</div>
                                </div>
                            </div>
                        </div>

                        <div class="form-group mt-4">
                            <label class="form-label">Do you have your design file/document/artwork ready?</label>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" id="yes" value="1"
                                    v-model="productDetails.hasDesignFile" />
                                <label class="form-check-label" for="yes">Yes</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" id="no" value="0"
                                    v-model="productDetails.hasDesignFile" />
                                <label class="form-check-label" for="no">No</label>
                            </div>
                            <div v-if="errors['productDetails.hasDesignFile']" class="text-danger">{{
                                errors['productDetails.hasDesignFile'][0] }}</div>
                        </div>


                        <div v-if="productDetails.hasDesignFile === '1'" class="form-group mt-4"
                            style="margin-inline: 1rem">
                            <label for="fileUpload" style="margin-bottom: 5px">
                                Upload Design File (multiple files allowed) [optional]
                            </label>
                            <file-pond v-model="productDetails.fileUpload" ref="pond" name="fileUpload"
                                allow-multiple="true" max-file-size="256MB" max-files="100"
                                @addfile="handleProcessFile" />


                            <small class="px-2 form-text text-muted">
                                Accepted file types: pdf, doc, docx, xls, xlsx, eps, ai, ps, zip, jpg, jpeg, png, gif,
                                Max. file size: 256 MB, Max. files: 100
                            </small>

                            <div v-if="errors['productDetails.fileUpload']" class="text-danger px-2">{{
                                errors['productDetails.fileUpload'][0] }}</div>

                            <div v-if="errors['files'] && uploadedFilesList == false" class="text-danger px-2">{{
                                errors['files'][0] }}</div>


                            <uploaded-files-list ref="uploadedFilesList"></uploaded-files-list>
                        </div>


                        <div v-else class="form-group mt-4" style="margin-inline: 1rem">
                            <label for="whenArtworkSend" style="margin-bottom: 5px">When can you send us the
                                artwork?</label><span class="text-danger">*</span>
                            <input v-model="productDetails.whenArtworkSend" class="form-control" id="whenArtworkSend"
                                placeholder="Write here">
                            <small class="text-muted">Please provide the most accurate estimate possible to help us
                                determine the appropriate quote.</small>
                            <div v-if="errors['productDetails.whenArtworkSend']" class="text-danger">{{
                                errors['productDetails.whenArtworkSend'][0] }}</div>
                        </div>


                        <div class="form-group mt-4" style="margin-inline: 1rem">
                            <label for="comment" style="margin-bottom: 5px">Comment (optional)</label>
                            <textarea v-model="productDetails.comment" class="form-control" id="comment" rows="3"
                                placeholder="Write here" style="outline: none"></textarea>
                            <div v-if="errors['productDetails.comment']" class="text-danger">{{
                                errors['productDetails.comment'][0] }}</div>
                        </div>
                        <div class="mt-4" style="margin-inline: 1rem">
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
import { mapState, mapActions, mapGetters } from 'vuex';
import axios from 'axios';

import UploadedFilesList from '@/components/UploadedFilesList.vue';

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

import vueFilePond from 'vue-filepond';
import 'filepond/dist/filepond.min.css';
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";

// Import FilePond plugins
// import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import Toast from '../utils/toast.js';

// Create a FilePond component instance
const FilePond = vueFilePond(FilePondPluginFileValidateSize, FilePondPluginFileEncode, FilePondPluginImagePreview);

export default {
    name: 'ProductDetails',
    components: {
        FilePond,
        Loading,
        UploadedFilesList,
    },
    data() {
        return {
            errors: {},
            isLoadingValidation: false,
            fileResponse: [
                { success: false },
            ],
        };
    },
    created() {
        this.fetchAndGenerateOrderId();
    },
    computed: {
        ...mapGetters(['getErrors']),
        ...mapState({
            productDetails: (state) => state.productDetails,
            orderId: (state) => state.productDetails.orderId,
            // errors: (state) => state.errors,
        }),
        acceptedFileTypes() {
            return [
                'application/pdf',
                'application/msword',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'application/vnd.ms-excel',
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'application/postscript',
                'application/zip',
                'image/jpeg',
                'image/png',
                'image/gif'
            ];
        },
    },
    methods: {
        ...mapActions([
            'fetchAndGenerateOrderId',
            'setErrors',
            'clearErrors',
            'updateProductDetails',
            'hasFileAttached',
            // 'setFileUploadError'
        ]),

        saveDetails() {
            this.isLoadingValidation = true;
            this.updateProductDetails(this.productDetails);
            this.validateData();
        },
        async handleProcessFile(error, file) {
            if (error) {
                console.error('Error processing file:', error);
                Toast.error(error.main);
                return;
            }
            await this.uploadFiles();
            console.log('File processed:', file);
            this.$refs.uploadedFilesList.fetchFiles();
            this.hasFileAttached('yes');
            // this.setFileUploadError('');
        },
        async uploadFiles() {
            try {
                const formData = new FormData();

                const pondFiles = this.$refs.pond.getFiles();

                pondFiles.forEach(fileItem => {
                    const file = fileItem.file; // Extract the actual file object
                    formData.append('files[]', file); // Append file to FormData
                });

                console.log('Files to upload:', pondFiles);

                if (pondFiles.length > 0) {
                    formData.append('order_id', this.orderId);
                    formData.append('file_type', 'artwork');
                    formData.append('user_id', '1');

                    this.fileResponse = await axios.post(
                        `${process.env.VUE_APP_FILESYSTEM_API_URL}/files/upload`,
                        formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                    );

                    console.log('File uploaded successfully:', this.fileResponse.data);

                    this.productDetails.fileUpload = 'file uploaded';
                } else {
                    console.log('No new files to upload.');
                }
            } catch (error) {
                if (error.response && error.response.status === 422) {
                    Toast.error(error.response.data.message);
                    this.setErrors(error.response.data.errors);
                    this.errors = this.getErrors;
                } else {
                    console.error('Error uploading file:', error.response || error.message);
                }
            }
        },

        async validateData() {
            this.clearErrors();
            try {
                const payload = {
                    productDetails: this.productDetails,
                };
                const response = await axios.post(`${process.env.VUE_APP_BACKOFFICE_API_BASE_URL}/checkout/validate/product-details`, payload);

                console.log('Response Status:', response.status);

                if (response.status === 200) {
                    this.$router.push({ name: 'DeliveryDetails' });
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

        removePQINAText() {
            const observer = new MutationObserver((mutationsList) => {
                for (const mutation of mutationsList) {
                    if (mutation.type === 'childList') {
                        const pqinaElement = document.querySelector('.filepond--credits');
                        if (pqinaElement) {
                            pqinaElement.remove();
                        }
                    }
                }
            });

            // Start observing the document body for changes
            observer.observe(document.body, { childList: true, subtree: true });

            // Optionally, stop observing after a certain time or condition
            setTimeout(() => observer.disconnect(), 5000); // Stop observing after 5 seconds
        },
    },
    mounted() {
        this.clearErrors();
        this.removePQINAText();
        this.errors = this.getErrors;
        console.log("order id from parent", this.productDetails.orderId);
        // if (this.$refs.uploadedFilesList.orderId) {
        //     this.$refs.uploadedFilesList.fetchFiles();
        // }
        console.log('ProductDetails created', this.$refs.uploadedFilesList.files);
    }
};
</script>

<style>
body {
    padding-top: 20px !important;
}
</style>
