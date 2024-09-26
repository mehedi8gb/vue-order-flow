<template>
  <div id="app">
    <HeaderComponent />
    <transition
      name="fade-slide"
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
    >
      <router-view />
    </transition>
  </div>
</template>

<script>
import HeaderComponent from './components/HeaderComponent.vue';

export default {
  name: 'App',
  components: {
    HeaderComponent
  },
  methods: {
    beforeEnter(el) {
      el.style.transform = 'translateY(20px)';
      el.style.opacity = '0';
    },
    enter(el, done) {
      el.offsetHeight; // Trigger reflow
      el.style.transition = 'transform 0.5s ease-out, opacity 0.5s ease-out';
      el.style.transform = 'translateY(0)';
      el.style.opacity = '1';
      done();
    },
    leave(el, done) {
      el.style.transition = 'transform 0.5s ease-out, opacity 0.5s ease-out';
      el.style.transform = 'translateY(20px)';
      el.style.opacity = '0';
      done();
    }
  }
};
</script>

<style>
@import './assets/css/variables.css';
@import './assets/css/global-form.css';
@import './assets/css/error.css';

/* Transition styles */
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: transform 0.5s ease-out, opacity 0.5s ease-out;
}

.fade-slide-enter, .fade-slide-leave-to /* .fade-slide-leave-active in <2.1.8 */ {
  transform: translateY(20px);
  opacity: 0;
}

body {
  padding-top: 20px !important;
}

.pricing-sticky {
  position: sticky;
  top: 0;
  z-index: 1020;
}
</style>
