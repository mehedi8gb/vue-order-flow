// store/modules/files.js
import Vue from 'vue';

const state = {
    files: [],  // Array to store selected files
    uploadProgress: {},  // Object to track upload progress for each file
  };
  
  const mutations = {
    SET_FILES(state, files) {
      state.files = files;
    },
    SET_UPLOAD_PROGRESS(state, { fileName, progress }) {
      Vue.set(state.uploadProgress, fileName, progress);
    },
  };
  
  const actions = {
    setFiles({ commit }, files) {
      commit('SET_FILES', files);
    },
    updateUploadProgress({ commit }, { fileName, progress }) {
      commit('SET_UPLOAD_PROGRESS', { fileName, progress });
    },
  };
  
  export default {
    state,
    mutations,
    actions,
  };
  