<template>
    <div v-if="show" class="custom-loading">
      <div class="loading-content">
        <div class="progress-bar">
          <div class="progress"></div>
        </div>
        <div class="loading-text">
          <p v-for="(text, index) in texts" :key="index" class="loading-text-item">{{ text }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CustomLoading',
    props: {
      show: {
        type: Boolean,
        required: true,
      },
      texts: {
        type: Array,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  .custom-loading {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.95);
    z-index: 9999;
  }
  .loading-content {
    text-align: center;
    animation: fadeInUp 0.5s ease-in-out;
  }
  .progress-bar {
    width: 300px;
    height: 30px;
    border: 2px solid #3498db;
    border-radius: 15px;
    overflow: hidden;
    margin-bottom: 20px;
  }
  .progress {
    height: 100%;
    background-color: #3498db;
    width: 0;
    animation: progress 3s ease-in-out forwards;
  }
  @keyframes progress {
    0% {
      width: 0;
    }
    100% {
      width: 100%;
    }
  }
  .loading-text {
    font-size: 18px;
    color: #333;
  }
  .loading-text-item {
    opacity: 0;
    animation: fadeIn 1.5s forwards;
  }
  .loading-text-item:nth-child(1) {
    animation-delay: 0.5s;
  }
  .loading-text-item:nth-child(2) {
    animation-delay: 1.5s;
  }
  .loading-text-item:nth-child(3) {
    animation-delay: 2.5s;
  }
  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translate3d(0, 40px, 0);
    }
    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }
  </style>
  