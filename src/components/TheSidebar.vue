<script setup>
import { computed } from 'vue'
// Components
import Navigation from '@/components/TheNavigation.vue'
import CurrentBooks from '@/components/CurrentBooks.vue'
// Store
import { useProgressStore } from '@/stores/progressStore.js'

const progressStore = useProgressStore()
// Статистика за текущий день.
const statisticToday = computed(() => {
  return progressStore.getStatisticsByDate(new Date())
})
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
        <li>Прочитано сегодня: {{ statisticToday.pages }}</li>
        <li>Прослушано сегодня: {{ statisticToday.minutes }}</li>
      </ul>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  background-color: var(--dark);
  color: var(--white);
  display: flex;
  flex: 1;
  flex-direction: column;

  &__block {
    padding: var(--ident);

    &_grow {
      flex: 1;
      margin-top: 2rem;
    }
  }
}
</style>
