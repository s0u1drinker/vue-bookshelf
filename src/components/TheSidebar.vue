<script setup>
// Components
import Navigation from '@/components/TheNavigation.vue'
import CurrentBooks from './CurrentBooks.vue';
// Store
import { useBooksStore } from '@/stores/booksStore.js'

const booksStore = useBooksStore()
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
        <li>Прочитано страниц сегодня: {{ booksStore.getTodayPagesRead }}</li>
        <li>Прочитано книг в этом году: {{ booksStore.getBooksReadThisYearCount }}</li>
        <li>Всего книг на полке: {{ booksStore.getBooksCount }}</li>
        <li>Всего книг прочитано: {{ booksStore.getBooksCompleteCount }}</li>
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
    padding: var(--padding);

    &_grow {
      flex: 1;
      margin-top: 2rem;
    }
  }
}
</style>
