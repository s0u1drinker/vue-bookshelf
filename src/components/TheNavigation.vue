<script setup>
import { RouterLink } from 'vue-router'

const links = [
  { to: '/', text: 'Главная' },
  { to: '/bookshelf', text: 'Книжная полка' },
  { to: '/bookstore', text: 'Книжный магазин' },
]
</script>

<template>
  <nav class="navigation">
    <RouterLink
      class="navigation__link"
      v-for="(link, index) in links"
      :to="link.to"
      :key="index"
    >{{ link.text }}</RouterLink>
  </nav>
</template>

<style scoped>
.navigation {
  display: flex;
  flex-direction: column;
}

.navigation__link {
  background-color: transparent;
  color: var(--white);
  display: block;
  padding: .5rem;
  text-align: center;
  transition: color .3s, background-color .3s;

  &:hover {
    background-color: var(--white);
    color: var(--dark);
    text-decoration: none;
  }
}

.navigation__link_active {
  background-color: var(--blue);
  color: var(--dark);
  pointer-events: none;
  position: relative;
  text-decoration: none;
}
</style>
