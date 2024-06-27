<template>
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
            <div class="card-body m-3">
                <div class="row g-3 px-3">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="singleSided">Sides</label>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="sides" id="singleSided" checked />
                                <label class="form-check-label" for="singleSided">Single sided</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="sides" id="doubleSided" />
                                <label class="form-check-label" for="doubleSided">Double sided</label>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="portrait">Orientation</label>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="orientation" id="portrait" />
                                <label class="form-check-label" for="portrait">Portrait</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="orientation" id="landscape"
                                    checked />
                                <label class="form-check-label" for="landscape">Landscape</label>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="gsm130">Paper Thickness
                                <i class="fa fa-info-circle" aria-hidden="true" style="color: black"></i></label>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="paperThickness" id="gsm130"
                                    checked />
                                <label class="form-check-label" for="gsm130">130 GSM</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="paperThickness" id="gsm170" />
                                <label class="form-check-label" for="gsm170">170 GSM</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="paperThickness" id="gsm250" />
                                <label class="form-check-label" for="gsm250">250 GSM</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="paperThickness" id="gsm300" />
                                <label class="form-check-label" for="gsm300">300 GSM</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="paperThickness" id="gsm350" />
                                <label class="form-check-label" for="gsm350">350 GSM</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="paperThickness"
                                    id="customThickness" />
                                <label class="form-check-label" for="customThickness">Custom</label>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="silkMatt">
                                Paper Type
                                <i class="fa fa-info-circle" aria-hidden="true" style="color: black"></i>
                            </label>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="paperType" id="silkMatt" />
                                <label class="form-check-label" for="silkMatt">Silk (Matt)</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="paperType" id="gloss" checked />
                                <label class="form-check-label" for="gloss">Gloss</label>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="a6Size">
                                Finished Size
                                <i class="fa fa-info-circle" aria-hidden="true" style="color: black"></i>
                            </label>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="finishedSize" id="a6Size" />
                                <label class="form-check-label" for="a6Size">A6</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="finishedSize" id="a5Size" checked />
                                <label class="form-check-label" for="a5Size">A5</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="finishedSize" id="a4Size" />
                                <label class="form-check-label" for="a4Size">A4</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="finishedSize" id="customSize" />
                                <label class="form-check-label" for="customSize">Custom</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-group mt-4" style="margin-inline: 1rem">
                    <label for="fileUpload" style="margin-bottom: 5px">Upload Design File (multiple files allowed)
                        [optional]</label>
                    <div class="p-3 text-center" style="position: relative; border: 1px dashed grey">
                        <input type="file" class="form-control" id="fileUpload" multiple style="
                  opacity: 0;
                  position: absolute;
                  width: 100%;
                  height: 100%;
                  z-index: 100;
                " />
                        <label for="fileUpload" class="d-block">
                            Drop your file here or
                            <span class="btn btn-primary btn-sm">upload file</span>
                        </label>
                    </div>
                    <small class="form-text text-muted">Accepted file types: pdf, doc, docx, xls, xlsx, eps, ai, ps,
                        zip, jpg, jpeg, png, gif, Max. file size: 256 MB, Max. files:
                        100</small>
                </div>
                <div class="form-group mt-4" style="margin-inline: 1rem">
                    <label for="comment" style="margin-bottom: 5px">Comment (optional)</label>
                    <textarea class="form-control" id="comment" rows="3" placeholder="Write here"
                        style="outline: none"></textarea>
                </div>
                <div class="mt-4" style="margin-inline: 1rem">
                    <router-link to="/delivery-details">
                        <button type="button" class="btn btn-block btn-primary">
                            Next
                        </button>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ProductDetails',
};
</script>

<style scoped>
/* Add your styles here */
</style>
