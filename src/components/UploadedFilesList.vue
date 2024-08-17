<template>
    <div class="uploaded-files-list">
        <!-- Content Area -->
        <div class="content-wrapper">
            <div class="file-list-content">
                <!-- Show loading bar only if `isLoading` is true -->
                <div v-if="isLoading" class="loading-overlay">
                    <loading v-model:active="isLoading" :color="'#0078D4'" :background="'rgba(0, 0, 0, 0.2)'"
                        :can-cancel="false" :is-full-page="false" :loader="'bars'" />
                </div>
                <div v-if="files.length" class="file-list">
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
                            <button @click="deleteFile(file.id)" class="delete-button">
                                <span class="material-icons">delete</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <p class="no-files-message">No files uploaded yet.</p>
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

export default {
    components: {
        Loading
    },
    data() {
        return {
            files: [],
            isLoading: false,
        };
    },
    computed: {
        orderId() {
            return this.$store.getters.getOrderId;
        }
    },
    watch: {
        orderId(newOrderId) {
            if (newOrderId) {
                this.fetchFiles();  // Only fetch files when orderId is available
            }
        }
    },
    methods: {
        async fetchFiles() {
            if (!this.$store.getters.getOrderId) {
                console.error('Order ID is not available');
                return;
            }

            this.isLoading = true;

            try {
                const response = await axios.get(`${process.env.VUE_APP_FILESYSTEM_API_URL}/files`, {
                    params: {
                        order_id: this.$store.getters.getOrderId,
                        file_type: 'artwork'
                    }
                });
                this.files = response.data.data || [];
            } catch (error) {
                console.error('Error fetching files:', error);
            } finally {
                this.isLoading = false;
            }
        },
        async deleteFile(fileId) {
            // if (!confirm('Are you sure you want to delete this file?')) return;

            try {
                await axios.post(`${process.env.VUE_APP_FILESYSTEM_API_URL}/file/destroy/${fileId}`);
                this.files = this.files.filter(file => file.id !== fileId);
                Toast.success('File deleted successfully');
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
    },
    mounted() {
        if (this.orderId) {
            this.fetchFiles();
        }
    }
};
</script>


<style scoped>
/* Container for the file list content */
.file-list-content {
    position: relative;
    overflow: hidden;
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #fff;
}

/* Wrapper for each file item */
.file-item {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    padding: 0.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: #f9f9f9;
    position: relative;
}

/* Preview for image files */
.file-preview {
    width: 100px;
    height: auto;
    margin-right: 1rem;
    border-radius: 4px;
}

/* Placeholder for non-image files */
.file-preview-placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 100px;
    background-color: #ddd;
    border-radius: 4px;
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
    padding: 0.5rem 1rem;
    cursor: pointer;
    border-radius: 4px;
    font-size: 0.875rem;
    transition: background-color 0.3s ease;
}

/* Hover state for delete button */
.delete-button:hover {
    background-color: #c0392b;
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
    border-radius: 4px;
    background-color: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
