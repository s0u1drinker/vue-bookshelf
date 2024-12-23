<script setup>
import { RouterView } from 'vue-router'
// Components
import TheSidebar from '@/components/TheSidebar.vue'
</script>

<template>
  <TheSidebar />
  <main>
    <RouterView />
  </main>
</template>

<style scoped></style>
