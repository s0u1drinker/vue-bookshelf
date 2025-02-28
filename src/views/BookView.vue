<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <h1>Информация о книге</h1>
  {{ route.params.isbn }}
</template>

<style scoped></style>
