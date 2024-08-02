<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <span class="navbar-brand">Checkout</span>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav mx-auto">
            <li class="nav-item">
              <router-link 
                class="nav-link" 
                :to="{ name: 'ProductDetails' }"
                :class="{ active: isActive('ProductDetails') }"
              >
                <span class="step-indicator">1</span> Product Details
              </router-link>
            </li>
            <li class="nav-item">
              <router-link 
                class="nav-link" 
                :to="{ name: 'DeliveryDetails' }"
                :class="{ active: isActive('DeliveryDetails') }"
              >
                <span class="step-indicator">2</span> Delivery Details
              </router-link>
            </li>
            <li class="nav-item">
              <router-link 
                class="nav-link" 
                :to="{ name: 'YourDetails' }"
                :class="{ active: isActive('YourDetails') }"
              >
                <span class="step-indicator">3</span> Your Details
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'HeaderComponent',
    methods: {
      isActive(routeName) {
        return this.$route.name === routeName;
      }
    }
  }
  </script>
  
  <style scoped>
  .navbar {
    background-color: #f8f9fa; /* Light background color */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
  }
  
  .navbar .container {
    position: relative;
  }
  
  .navbar-brand {
    font-size: 1.5rem;
    font-weight: bold;
    color: #0078d4;
    position: absolute;
    left: 0;
    transform: translateX(18%);
  }
  
  .navbar-nav {
    flex-direction: row;
  }
  
  .nav-link {
    position: relative;
    padding: 10px 20px;
    border-radius: 50px; /* Rounded links */
    font-size: 1rem;
    transition: background-color 0.3s ease, color 0.3s ease;
  }
  
  .nav-link.active {
    background-color: #0078d4; /* Windows 11 primary color */
    color: white !important;
  }
  
  .nav-link.active .step-indicator {
    background-color: white;
    color: #0078d4;
  }
  
  .step-indicator {
    display: inline-block;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: #0078d4;
    color: white;
    text-align: center;
    line-height: 24px;
    margin-right: 10px;
    font-weight: bold;
  }
  
  @media (max-width: 768px) {
    .navbar-nav {
      margin-top: 10px;
    }
  }
  </style>
  