<script setup>
// Components
import Navigation from '@/components/TheNavigation.vue'
import { useBooksStore } from '@/stores/booksStore.js'

const booksStore = useBooksStore()
</script>

<template>
  <aside class="sidebar">
    <div class="sidebar__block">
      <Navigation />
    </div>
    <div class="sidebar__block">
      <ul class="sidebar__read-stat">
        <li>Прочитано страниц сегодня: {{ booksStore.getTodayPagesRead }}</li>
        <li>Прочитано книг в этом году: {{ booksStore.getBoosReadThisYearCount }}</li>
        <li>Всего книг прочитано: {{ booksStore.getCompleteBooksCount }}</li>
      </ul>
    </div>
    <div class="sidebar__block sidebar__now-info">Читаю/Слушаю</div>
  </aside>
</template>

<style scoped>
.sidebar {
  background-color: var(--dark);
  color: var(--white);
  width: 17rem;

  &__block {
    padding: 1rem;
  }

  &__user {
    &-name {
      text-align: center;
    }

    &-avatar {
      border-radius: 50%;
      box-shadow: 0 0 0.5rem var(--shadow);
      display: block;
      margin: 1rem auto 0;
      width: 70%;
    }
  }

  &__read-stat {
    margin: 0;
    padding: 0;

    li {
      list-style: none;

      & + li {
        margin-top: 0.5rem;
      }
    }
  }
}
</style>
