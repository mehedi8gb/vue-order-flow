<template>
  <div v-if="show" class="custom-loading" :class="{ 'fade-out': isDone }">
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
  data() {
    return {
      isDone: false,
    };
  },
  watch: {
    show(newVal) {
      if (newVal) {
        this.startLoading();
      }
    }
  },
  methods: {
    startLoading() {
      setTimeout(() => {
        this.isDone = true;
        setTimeout(() => {
          this.$emit('finished');
        }, 50); // Delay to ensure fade-out animation completes
      }, 3000); // Duration of the loading animation
    }
  }
};
</script>

<style>
.custom-loading {
  position: absolute;
  margin: 200px 0px 0px 0px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 0.7);
  /* Slightly transparent background */
  padding: 20px;
  border-radius: 80px;
  box-shadow: 0 4px 8px rgba(46, 175, 245, 0.294);
  z-index: 9999;
  transition: opacity 0.5s ease, visibility 0.5s ease;
}

.custom-loading.fade-out {
  opacity: 0;
  visibility: hidden;
}

.loading-content {
  text-align: center;
  animation: fadeInUp 0.5s forwards;
  margin-top: 4rem !important;
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
  animation: progress 4s ease-in-out forwards;
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