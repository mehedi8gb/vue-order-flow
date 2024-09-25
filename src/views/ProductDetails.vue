<template>
  <div class="container">

    <!-- <HeaderComponent /> -->


    <div class="d-flex">
      <div class="col-md-2" style="width: 200px">
        <div class="position-absolute bg-secondary rounded text-white d-flex justify-content-center align-items-center"
             style="width: 150px; height: 100px; top: 52px; left: 34px">
                    <span class="bg-white text-dark rounded text-center px-2 py-1">{{
                        productDetails.productName
                      }}</span>
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
                   :loader="'bars'"/>

          <div class="card-body m-3 pb-5">
            <div class="row g-3 px-3">
              <div class="col-md-6">
                <div class="form-group">
                  <label for="singleSided">Sides</label>
                  <div class="form-check">
                    <input v-model="productDetails.design.slides" class="form-check-input"
                           type="radio" name="sides" value="Single-Sided" id="singleSided"/>
                    <label class="form-check-label" for="singleSided">Single sided</label>
                  </div>
                  <div class="form-check">
                    <input v-model="productDetails.design.slides" class="form-check-input"
                           type="radio" name="sides" value="Double-Sided" id="doubleSided"/>
                    <label class="form-check-label" for="doubleSided">Double sided</label>
                  </div>
                  <div v-if="errors['productDetails.design.slides']" class="text-danger">{{
                      errors['productDetails.design.slides'][0]
                    }}
                  </div>
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group">
                  <label for="quantity">Quantity
                    <i class="fa fa-info-circle" aria-hidden="true" style="color: black"></i>
                  </label>
                  <select class="form-control" v-model="productDetails.quantity" id="quantity">
                    <option v-for="quantity in quantityOptions" :key="quantity" :value="quantity.value">
                      {{ quantity.label }}
                    </option>
                  </select>
                  <div v-if="errors['productDetails.quantity']" class="text-danger">
                    {{ errors['productDetails.quantity'][0] }}
                  </div>
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
                           id="silkMatt"/>
                    <label class="form-check-label" for="silkMatt">Silk (Matt)</label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" type="radio"
                           v-model="productDetails.design.paperType" name="paperType" value="gloss"
                           id="gloss"/>
                    <label class="form-check-label" for="gloss">Gloss</label>
                  </div>
                  <div v-if="errors['productDetails.design.paperType']" class="text-danger">{{
                      errors['productDetails.design.paperType'][0]
                    }}
                  </div>
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group">
                  <label for="portrait">Orientation</label>
                  <div class="form-check">
                    <input v-model="productDetails.design.orientation" class="form-check-input"
                           type="radio" name="orientation" id="portrait" value="portrait"/>
                    <label class="form-check-label" for="portrait">Portrait</label>
                  </div>
                  <div class="form-check">
                    <input v-model="productDetails.design.orientation" class="form-check-input"
                           type="radio" name="orientation" id="landscape" value="landscape"/>
                    <label class="form-check-label" for="landscape">Landscape</label>
                  </div>
                  <div v-if="errors['productDetails.design.orientation']" class="text-danger">{{
                      errors['productDetails.design.orientation'][0]
                    }}
                  </div>
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
                           value="130 gsm" id="gsm130"/>
                    <label class="form-check-label" for="gsm130">130 GSM</label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" type="radio"
                           v-model="productDetails.design.paperThickness" name="paperThickness"
                           value="170 gsm" id="gsm170"/>
                    <label class="form-check-label" for="gsm170">170 GSM</label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" type="radio"
                           v-model="productDetails.design.paperThickness" name="paperThickness"
                           value="250 gsm" id="gsm250"/>
                    <label class="form-check-label" for="gsm250">250 GSM</label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" type="radio"
                           v-model="productDetails.design.paperThickness" name="paperThickness"
                           value="300 gsm" id="gsm300"/>
                    <label class="form-check-label" for="gsm300">300 GSM</label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" type="radio"
                           v-model="productDetails.design.paperThickness" name="paperThickness"
                           value="350 gsm" id="gsm350"/>
                    <label class="form-check-label" for="gsm350">350 GSM</label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" type="radio"
                           v-model="productDetails.design.paperThickness" name="paperThickness"
                           value="customThickness" id="customThickness"/>
                    <label class="form-check-label" for="customThickness">Custom</label>
                  </div>
                  <div v-if="errors['productDetails.design.paperThickness']" class="text-danger">{{
                      errors['productDetails.design.paperThickness'][0]
                    }}
                  </div>
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
                           value="A7" id="A7"/>
                    <label class="form-check-label" for="A7">A7</label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" type="radio"
                           v-model="productDetails.design.finishedSize" name="finishedSize"
                           value="A6" id="a6Size"/>
                    <label class="form-check-label" for="a6Size">A6</label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" type="radio"
                           v-model="productDetails.design.finishedSize" name="finishedSize"
                           value="A5" id="a5Size"/>
                    <label class="form-check-label" for="a5Size">A5</label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" type="radio"
                           v-model="productDetails.design.finishedSize" name="finishedSize"
                           value="A4" id="a4Size"/>
                    <label class="form-check-label" for="a4Size">A4</label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" type="radio"
                           v-model="productDetails.design.finishedSize" name="finishedSize"
                           value="A3" id="A3"/>
                    <label class="form-check-label" for="A3">A3</label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" type="radio"
                           v-model="productDetails.design.finishedSize" name="finishedSize"
                           value="DL" id="DL"/>
                    <label class="form-check-label" for="DL">DL</label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" type="radio"
                           v-model="productDetails.design.finishedSize" name="finishedSize"
                           value="customSize" id="customSize"/>
                    <label class="form-check-label" for="customSize">Custom</label>
                  </div>
                  <div v-if="errors['productDetails.design.finishedSize']" class="text-danger">{{
                      errors['productDetails.design.finishedSize'][0]
                    }}
                  </div>
                </div>
              </div>
            </div>

            <div class="form-group mt-4">
              <label class="form-label">Do you have your design file/document/artwork ready?</label>
              <div class="form-check">
                <input class="form-check-input" type="radio" id="yes" value="1"
                       v-model="productDetails.hasDesignFile"/>
                <label class="form-check-label" for="yes">Yes</label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" id="no" value="0"
                       v-model="productDetails.hasDesignFile"/>
                <label class="form-check-label" for="no">No</label>
              </div>
              <div v-if="errors['productDetails.hasDesignFile']" class="text-danger">{{
                  errors['productDetails.hasDesignFile'][0]
                }}
              </div>
            </div>


            <div v-if="productDetails.hasDesignFile === '1'" class="form-group mt-4"
                 style="margin-inline: 1rem">
              <label for="fileUpload" style="margin-bottom: 5px">
                Upload Design File (multiple files allowed) [optional]
              </label>
              <file-pond v-model="productDetails.fileUpload" ref="pond" name="fileUpload"
                         allow-multiple="true" max-file-size="256MB" max-files="100" :instant-upload="false"
                         @addfile="handleFileAdd"/>


              <small class="px-2 form-text text-muted">
                Accepted file types: pdf, doc, docx, xls, xlsx, eps, ai, ps, zip, jpg, jpeg, png, gif,
                Max. file size: 256 MB, Max. files: 100
              </small>

              <div v-if="errors['productDetails.fileUpload']" class="text-danger px-2">{{
                  errors['productDetails.fileUpload'][0]
                }}
              </div>

              <div v-if="errors['files'] && uploadedFilesList == false" class="text-danger px-2">{{
                  errors['files'][0]
                }}
              </div>


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
                  errors['productDetails.whenArtworkSend'][0]
                }}
              </div>
            </div>


            <div class="form-group mt-4" style="margin-inline: 1rem">
              <label for="comment" style="margin-bottom: 5px">Comment (optional)</label>
              <textarea v-model="productDetails.comment" class="form-control" id="comment" rows="3"
                        placeholder="Write here" style="outline: none"></textarea>
              <div v-if="errors['productDetails.comment']" class="text-danger">{{
                  errors['productDetails.comment'][0]
                }}
              </div>
            </div>
            <div class="mt-4" style="margin-inline: 1rem">
              <input type="submit" @click.prevent="saveDetails" value="Next"
                     class="btn btn-block btn-primary">


            </div>
          </div>
        </form>

      </div>
      <div class="col-md-4">
        <PricingComponent/>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions, mapGetters} from 'vuex';
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
import PricingComponent from "@/components/PricingComponent.vue";

axios.defaults.withCredentials = true;

// Create a FilePond component instance
const FilePond = vueFilePond(FilePondPluginFileValidateSize, FilePondPluginFileEncode, FilePondPluginImagePreview);

export default {
  name: 'ProductDetails',
  components: {
    PricingComponent,
    FilePond,
    Loading,
    UploadedFilesList,
  },
  data() {
    return {
      errors: {},
      isLoadingValidation: false,
      fileResponse: [
        {success: false},
      ],
      quantityOptions: [
        {
          id: 'quantity25',
          name: 'quantity',
          value: '25',
          label: '25'
        },
        {
          id: 'quantity50',
          name: 'quantity',
          value: '50',
          label: '50'
        },
        {
          id: 'quantity75',
          name: 'quantity',
          value: '75',
          label: '75'
        },
        {
          id: 'quantity100',
          name: 'quantity',
          value: '100',
          label: '100'
        },
        {
          id: 'quantity125',
          name: 'quantity',
          value: '125',
          label: '125'
        },
        {
          id: 'quantity150',
          name: 'quantity',
          value: '150',
          label: '150'
        },
        {
          id: 'quantity175',
          name: 'quantity',
          value: '175',
          label: '175'
        },
        {
          id: 'quantity200',
          name: 'quantity',
          value: '200',
          label: '200'
        },
        {
          id: 'quantity225',
          name: 'quantity',
          value: '225',
          label: '225'
        },
        {
          id: 'quantity250',
          name: 'quantity',
          value: '250',
          label: '250'
        },
        {
          id: 'quantity275',
          name: 'quantity',
          value: '275',
          label: '275'
        },
        {
          id: 'quantity300',
          name: 'quantity',
          value: '300',
          label: '300'
        },
        {
          id: 'quantity325',
          name: 'quantity',
          value: '325',
          label: '325'
        },
        {
          id: 'quantity350',
          name: 'quantity',
          value: '350',
          label: '350'
        },
        {
          id: 'quantity375',
          name: 'quantity',
          value: '375',
          label: '375'
        },
        {
          id: 'quantity400',
          name: 'quantity',
          value: '400',
          label: '400'
        },
        {
          id: 'quantity425',
          name: 'quantity',
          value: '425',
          label: '425'
        },
        {
          id: 'quantity450',
          name: 'quantity',
          value: '450',
          label: '450'
        },
        {
          id: 'quantity475',
          name: 'quantity',
          value: '475',
          label: '475'
        },
        {
          id: 'quantity500',
          name: 'quantity',
          value: '500',
          label: '500'
        },
        {
          id: 'quantity1000',
          name: 'quantity',
          value: '1000',
          label: '1000'
        },
        {
          id: 'quantity1500',
          name: 'quantity',
          value: '1500',
          label: '1500'
        },
        {
          id: 'quantity2000',
          name: 'quantity',
          value: '2000',
          label: '2000'
        },
        {
          id: 'quantity2500',
          name: 'quantity',
          value: '2500',
          label: '2500'
        },
        {
          id: 'quantity3000',
          name: 'quantity',
          value: '3000',
          label: '3000'
        },
        {
          id: 'quantity3500',
          name: 'quantity',
          value: '3500',
          label: '3500'
        },
        {
          id: 'quantity4000',
          name: 'quantity',
          value: '4000',
          label: '4000'
        },
        {
          id: 'quantity4500',
          name: 'quantity',
          value: '4500',
          label: '4500'
        },
        {
          id: 'quantity5000',
          name: 'quantity',
          value: '5000',
          label: '5000'
        },
        {
          id: 'quantity5500',
          name: 'quantity',
          value: '5500',
          label: '5500'
        },
        {
          id: 'quantity6000',
          name: 'quantity',
          value: '6000',
          label: '6000'
        },
        {
          id: 'quantity6500',
          name: 'quantity',
          value: '6500',
          label: '6500'
        },
        {
          id: 'quantity7000',
          name: 'quantity',
          value: '7000',
          label: '7000'
        },
        {
          id: 'quantity7500',
          name: 'quantity',
          value: '7500',
          label: '7500'
        },
        {
          id: 'quantity8000',
          name: 'quantity',
          value: '8000',
          label: '8000'
        },
        {
          id: 'quantity8500',
          name: 'quantity',
          value: '8500',
          label: '8500'
        },
        {
          id: 'quantity9000',
          name: 'quantity',
          value: '9000',
          label: '9000'
        },
        {
          id: 'quantity9500',
          name: 'quantity',
          value: '9500',
          label: '9500'
        },
        {
          id: 'quantity10000',
          name: 'quantity',
          value: '10000',
          label: '10000'
        }
      ],
    };
  },
  created() {
    this.fetchAndGenerateSessionId();
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
      'fetchAndGenerateSessionId',
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
    handleFileAdd() {
      clearTimeout(this.uploadTimeout);

      // Set a timeout to trigger the upload after a short delay
      this.uploadTimeout = setTimeout(() => {
        this.uploadFiles();
      }, 500);
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
          formData.append('session_id', this.$store.getters.getSessionId);
          formData.append('file_type', 'item_file');

          this.fileResponse = await axios.post(
              `${process.env.VUE_APP_FILESYSTEM_API_URL}/temp/files/upload`,
              formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              }
          );

          console.log('File uploaded successfully:', this.fileResponse.data);

          // Clear FilePond's file list after successful upload
          // this.$refs.pond.removeFiles();

          this.productDetails.fileUpload = 'file uploaded';
          this.$refs.uploadedFilesList.fetchFiles();
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
          this.$router.push({name: 'DeliveryDetails'});
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
      observer.observe(document.body, {childList: true, subtree: true});

      // Optionally, stop observing after a certain time or condition
      setTimeout(() => observer.disconnect(), 5000); // Stop observing after 5 seconds
    },
  },
  mounted() {
    this.clearErrors();
    this.removePQINAText();
    this.errors = this.getErrors;
    console.log('ProductDetails created', this.$refs.uploadedFilesList.files);
  }
};
</script>

<style>
body {
  padding-top: 20px !important;
}
</style>
