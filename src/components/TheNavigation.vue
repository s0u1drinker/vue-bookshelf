<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <nav>
    <RouterLink to="/">Главная</RouterLink>
    <RouterLink to="/bookshelf">Книжная полка</RouterLink>
    <RouterLink to="/bookstore">Книжный магазин</RouterLink>
  </nav>
</template>

<style scoped>
nav {
  a {
    color: var(--white);
  }
}

a:visited {
  color: inherit;
}
</style>
