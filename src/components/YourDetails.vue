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
            <div class="card-body m-3 pb-5">
                <div class="row g-3 px-3">
                    <div class="form-group mt-4">
                        <label for="inputName">Your Name*</label>
                        <input type="text" class="form-control" id="inputName" name="name" required>
                    </div>

                    <div class="form-group">
                        <label for="inputEmail">Your Email*</label>
                        <input type="email" class="form-control" id="inputEmail" name="email" required>
                    </div>

                    <div class="form-group">
                        <label for="confirmEmail">Confirm Email*</label>
                        <input type="email" class="form-control" id="confirmEmail" name="confirmEmail" required>
                    </div>

                    <div class="form-group">
                        <label for="inputPhone">Your Phone Number*</label>
                        <input type="tel" class="form-control" id="inputPhone" name="phone" required>
                    </div>

                    <div class="form-group">
                        <label>Who will receive the order?*</label>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="recipient" id="myself" value="myself"
                                checked>
                            <label class="form-check-label" for="myself">Myself</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="recipient" id="someoneElse"
                                value="someone_else">
                            <label class="form-check-label" for="someoneElse">Someone else</label>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="additionalInstructions">Any further instructions or details? (optional)</label>
                        <textarea class="form-control" id="additionalInstructions" rows="3"
                            name="instructions"></textarea>
                    </div>


                </div>
                <div class="my-4 d-flex justify-content-between align-items-center">
                    <router-link to="/delivery-details">
                        <button type="button" class="btn btn-outline-secondary btn-md">
                            Previous
                        </button>
                    </router-link>

                    <router-link to="/order-success">
                        <button type="button" class="btn btn-success btn-block" @click="$emit('next-step')">
                            Submit
                        </button>
                    </router-link>
                </div>

                <div class="mt-3">
                    <button type="button" class="btn btn-primary btn-block btn-md" data-bs-toggle="tooltip"
                        data-bs-placement="top" title="Save your progress and continue later">
                        Save and Continue Later
                    </button>
                </div>




            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'YourDetails',
};
</script>

<style scoped>
/* Add your styles here */
</style>
