<template>
    <div class="default">
        <header>
            <HeaderComponent></HeaderComponent>
        </header>

        <main>
            <router-view></router-view>
        </main>

        <footer>
            <!-- Your footer content goes here -->
        </footer>
    </div>
</template>

<script>
import HeaderComponent from '@/components/layout/HeaderComponent.vue';
export default {
    name: 'DefaultLayout',
    components: {
        HeaderComponent
    },
    // Add any necessary logic or data properties here
}
</script>

<style>
/* Add your custom styles for the default layout here */
.default {
    /* Your layout styles */
}

header {
    /* Your header styles */
}

main {
    /* Your main content styles */
}

footer {
    /* Your footer styles */
}
</style>
</main>