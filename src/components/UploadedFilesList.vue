<template>
    <div class="uploaded-files-list">
        <!-- Content Area -->
        <div class="content-wrapper">
            <div class="file-list-content">
                <!-- Show loading bar only if `isLoading` is true -->
                <div v-if="isLoading" class="loading-overlay">
                    <div>
                        <loading v-model:active="isLoading" :color="'#0078D4'" :background="'rgba(0, 0, 0, 0.2)'"
                            :can-cancel="false" :is-full-page="false" :loader="'bars'" />
                    </div>
                </div>
                <div v-if="files?.length" class="file-list">
                    <div v-for="file in files" :key="file.id" class="file-item">
                        <template v-if="isImage(file.file_path)">
                            <img :src="file.file_url" alt="File preview" class="file-preview" />
                        </template>
                        <template v-else-if="isPDF(file.file_path)">
                            <div class="file-preview-placeholder">
                                <span class="material-icons">picture_as_pdf</span>
                                <p>PDF</p>
                            </div>
                        </template>
                        <template v-else-if="isDoc(file.file_path)">
                            <div class="file-preview-placeholder">
                                <span class="material-icons">description</span>
                                <p>DOC</p>
                            </div>
                        </template>
                        <template v-else-if="isXls(file.file_path)">
                            <div class="file-preview-placeholder">
                                <span class="material-icons">grid_on</span>
                                <p>XLS</p>
                            </div>
                        </template>
                        <template v-else-if="isEps(file.file_path)">
                            <div class="file-preview-placeholder">
                                <span class="material-icons">insert_photo</span>
                                <p>EPS</p>
                            </div>
                        </template>
                        <template v-else-if="isAi(file.file_path)">
                            <div class="file-preview-placeholder">
                                <span class="material-icons">brush</span>
                                <p>AI</p>
                            </div>
                        </template>
                        <template v-else-if="isPs(file.file_path)">
                            <div class="file-preview-placeholder">
                                <span class="material-icons">edit</span>
                                <p>PS</p>
                            </div>
                        </template>
                        <template v-else-if="isZip(file.file_path)">
                            <div class="file-preview-placeholder">
                                <span class="material-icons">archive</span>
                                <p>ZIP</p>
                            </div>
                        </template>
                        <template v-else>
                            <div class="file-preview-placeholder">
                                <span class="material-icons">description</span>
                                <p>{{ file.file_name }}</p>
                            </div>
                        </template>

                        <div class="file-info">
                            <p>{{ file.file_name }}</p>
                            <p>Uploaded on: {{ file.created_at }}</p>
                        </div>
                        <div class="delete-container">
                            <button @click.prevent="confirmDelete(file.id)" class="delete-button">
                                <span class="material-icons">delete</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div v-if="files?.length == 0 && !isLoading">
                    <p class="no-files-message">No files uploaded yet.</p>
                </div>
                <div v-else>
                    <p style="padding-top: 24px;"></p>
                </div>
            </div>
        </div>
    </div>
</template>




<script>
import axios from 'axios';
import Loading from 'vue-loading-overlay';
import 'material-icons/iconfont/material-icons.css';
import Toast from '../utils/toast.js';
import Swal from 'sweetalert2';
import { mapActions } from 'vuex';

export default {
    components: {
        Loading
    },
    data() {
        return {
            files: [],
            isLoading: false,
            fileResponse: { success: false, data: []}
        };
    },
    computed: {
        sessionId() {
            return this.$store.getters.getSessionId;
        }
    },
    watch: {
        sessionId(newsessionId) {
            if (newsessionId) {
                this.fetchFiles();  
            }
        }
    },
    methods: {
        ...mapActions(['hasFileAttached', 'clearErrors']),
        async fetchFiles() {
            if (!this.$store.getters.getSessionId) {
                console.error('Order ID is not available');
                return;
            }

            this.isLoading = true;

            try {
                this.fileResponse = await axios.get(`${process.env.VUE_APP_FILESYSTEM_API_URL}/files`, {
                    params: {
                        session_id: this.$store.getters.getSessionId,
                        file_type: 'item_file'
                    }
                });
                this.files = this.fileResponse.data.data || [];
                if (this.files?.length > 0) {
                    this.hasFileAttached('yes');
                    this.clearErrors();
                }
            } catch (error) {
                console.error('Error fetching files:', error);
                this.hasFileAttached('');
            } finally {
                this.isLoading = false;
            }
        },
        confirmDelete(fileId) {
            Swal.fire({
                title: 'Are you sure?',
                text: "Do you really want to delete this file? This action cannot be undone.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'Cancel',
                toast: true,
                position: 'center',
            }).then((result) => {
                if (result.isConfirmed) {
                    this.deleteFile(fileId);
                    Swal.fire({
                        title: 'Deleted!',
                        text: 'Your file has been deleted.',
                        icon: 'success',
                        toast: true,
                        position: 'top-end',
                    });
                }
            });
        },
        async deleteFile(fileId) {
            // if (!confirm('Are you sure you want to delete this file?')) return;

            try {
                await axios.post(`${process.env.VUE_APP_FILESYSTEM_API_URL}/file/destroy/${fileId}`);
                this.files = this.files.filter(file => file.id !== fileId);
                Toast.success('File deleted successfully');
                this.hasFileAttached('');
            } catch (error) {
                console.error('Error deleting file:', error);
            }
        },
        isImage(filePath) {
            const imageExtensions = ['jpg', 'jpeg', 'png', 'gif'];
            const extension = filePath.split('.').pop().toLowerCase();
            return imageExtensions.includes(extension);
        },
        isPDF(filePath) {
            return filePath.endsWith('.pdf');
        },
        isDoc(filePath) {
            const docExtensions = ['doc', 'docx'];
            return docExtensions.includes(filePath.split('.').pop().toLowerCase());
        },
        isXls(filePath) {
            const xlsExtensions = ['xls', 'xlsx'];
            return xlsExtensions.includes(filePath.split('.').pop().toLowerCase());
        },
        isEps(filePath) {
            return filePath.endsWith('.eps');
        },
        isAi(filePath) {
            return filePath.endsWith('.ai');
        },
        isPs(filePath) {
            return filePath.endsWith('.ps');
        },
        isZip(filePath) {
            return filePath.endsWith('.zip');
        },
    },
    mounted() {
        if (this.sessionId) {
            this.fetchFiles();
        }
    }
};
</script>


<style scoped>
.loader-with-text {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.loading-text {
    margin-top: 0.5rem;
    /* Adjust the spacing as needed */
    font-size: 1rem;
    color: #0078D4;
    /* Match the loader color */
}

/* Container for the file list content */
.content-wrapper {
    margin: 0 auto;
}

.file-list-content {
    position: relative;
    overflow: hidden;
    padding: 1rem;
    border-radius: 12px;
    /* Smoother border-radius */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #fff;
}

/* Wrapper for each file item */
.file-item {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    padding: 0.5rem;
    border-radius: 12px;
    /* Smoother border-radius */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: #f9f9f9;
    position: relative;
    transition: background-color 0.3s ease;
}

/* Soft blue hover effect */
.file-item:hover {
    background-color: rgba(173, 216, 230, 0.3);
    /* Soft blue 30% */
}

/* Preview for image files */
.file-preview {
    width: 100px;
    height: auto;
    margin-right: 1rem;
    border-radius: 6px;
}

/* Placeholder for non-image files */
.file-preview-placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 100px;
    background-color: #ddd;
    border-radius: 6px;
    margin-right: 1rem;
    text-align: center;
    font-size: 1.5rem;
}

/* Material icon styling within placeholders */
.file-preview-placeholder span {
    display: block;
    margin-bottom: 0.5rem;
    font-size: 2rem;
    /* Adjust size of the icon */
}

/* Information about the file */
.file-info {
    flex: 1;
}

/* Container for delete button */
.delete-container {
    flex: 0 0 30%;
    display: flex;
    justify-content: flex-end;
}

/* Styling for the delete button */
.delete-button {
    background-color: #e74c3c;
    color: white;
    border: none;
    padding: 0.5rem 1.2rem;
    /* Slightly wider padding */
    cursor: pointer;
    border-radius: 6px;
    /* Smoother border-radius */
    font-size: 0.875rem;
    font-weight: 500;
    /* Slightly bolder text */
    transition: background-color 0.3s ease, transform 0.2s ease;
}

/* Hover state for delete button */
.delete-button:hover {
    background-color: #c0392b;
    transform: scale(1.05);
    /* Slight zoom effect */
}

/* Message displayed when no files are available */
.no-files-message {
    text-align: center;
    color: #888;
    font-size: 1rem;
}

/* Adjust the file preview for PDF files */
.pdf-preview {
    width: 100px;
    /* Width for PDF preview */
    height: 100px;
    /* Height for PDF preview */
    border: 1px solid #ddd;
    border-radius: 6px;
    background-color: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
