<script setup>
// Components
import Navigation from '@/components/TheNavigation.vue'
import CurrentBooks from './CurrentBooks.vue'
// Store
import { useProgressStore } from '@/stores/progressStore.js'

const progressStore = useProgressStore()
</script>

<template>
  <aside class="sidebar">
    <div class="sidebar__block">
      <Navigation />
    </div>
    <div class="sidebar__block sidebar__block_grow">
      <CurrentBooks />
    </div>
    <div class="sidebar__block">
      <ul class="sidebar__read-stat">
        <li>Прочитано сегодня: {{ progressStore.getCountPagesReadToday }}</li>
        <li>Прослушано сегодня: {{ progressStore.getCountMinutesListenedToday }}</li>
      </ul>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  background-color: var(--dark);
  color: var(--white);
  display: flex;
  flex-direction: column;
  width: 17rem;

  &__block {
    padding: var(--ident);

    &_grow {
      flex: 1;
      margin-top: 2rem;
    }
  }
}
</style>
