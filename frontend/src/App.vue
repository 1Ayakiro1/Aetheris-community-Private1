<template>
        <div class="app-container">
            <!--Сделать потом здесь safeArea из MiniApps API-->
            <AppHeader />

            <main class="app-main">
                <router-view />
            </main>
        </div>
</template>

<script setup lang="ts">
import AppHeader from './components/AppHeader.vue';
</script>

<style lang="scss">
</style>
