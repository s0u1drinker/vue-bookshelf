<script setup>
import { RouterLink } from 'vue-router'
// Icons
import TheIcon from './TheIcon.vue'

const links = [
  { to: '/', text: 'Главная', icon: 'Statistic' },
  { to: '/bookshelf', text: 'Книжная полка', icon: 'Bookshelf' },
  { to: '/bookstore', text: 'Книжный магазин', icon: 'Bookstore' },
]
</script>

<template>
  <nav class="navigation">
    <RouterLink class="navigation__link" v-for="(link, index) in links" :to="link.to" :key="index">
      <TheIcon class="navigation__link-icon" :name="link.icon" v-if="link.icon" />
      <span class="navigation__link-text">{{ link.text }}</span>
    </RouterLink>
  </nav>
</template>

<style scoped>
.navigation {
  display: flex;
  flex-direction: column;

  &__link {
    align-items: center;
    background-color: transparent;
    color: var(--white);
    display: flex;
    padding: 0.5rem;
    text-align: center;
    transition:
      color 0.3s,
      background-color 0.3s;

    &:hover {
      background-color: var(--white);
      color: var(--dark);

      & > .navigation__link-icon {
        fill: var(--dark);
      }
    }

    &_active {
      background-color: var(--blue);
      color: var(--dark);
      pointer-events: none;
      position: relative;

      & > .navigation__link-icon {
        fill: var(--dark);
      }
    }

    &-icon {
      fill: var(--white);
      height: 24px;
      margin-right: 0.25rem;
      transition: fill 0.3s;
      width: 24px;
    }
  }
}
</style>
