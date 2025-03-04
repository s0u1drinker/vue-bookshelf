<script setup>
import { onMounted, ref } from 'vue'
// Store
import { useBooksStore } from '@/stores/booksStore'
// Components
import TheButton from '@/components/TheButton.vue'
import BookCard from '@/components/BookCard.vue'

const booksStore = useBooksStore()
// Всего книг на полке.
const booksCount = ref(0)
// Счётчики прочитанных книг.
const booksCompleteCount = ref([])
// Список книг.
const books = ref([])
// Значения для запроса списка книг.
const dataForLoad = ref({
  start: 0,
  end: 6,
  count: 6,
})

// Смонтировано.
onMounted(() => {
  booksCount.value = booksStore.getBooksCount
  booksCompleteCount.value = booksStore.getBooksCompleteCount()

  loadMoreBooks()
})
const loadMoreBooks = () => {
  if (books.value.length < booksCount.value) {
    books.value = [...booksStore.getBooks(dataForLoad.value.start, dataForLoad.value.end)]
    dataForLoad.value.end += dataForLoad.value.count
  }
}
</script>

<template>
  <h1>Книжная полка</h1>
  <div class="bookshelf">
    <div class="bookshelf__info">
      <div class="bookshelf__info-wrapper">
        <span class="bookshelf__info-item">Всего книг на полке: {{ booksCount }}</span>
        <span class="bookshelf__info-item">Из них прочитано: {{ booksCompleteCount.all }}</span>
        <span class="bookshelf__info-item">Показано книг: {{ books.length }}</span>
      </div>
      <TheButton icon="Plus" text="Добавить книгу" color="blue" />
    </div>
    <div class="bookshelf__list">
      <BookCard v-for="(book, index) in books" :key="index" :bookData="book" />
    </div>
    <TheButton
      text="Загрузить ещё"
      color="blue"
      :outline="true"
      @click="loadMoreBooks"
      v-show="books.length < booksCount"
    />
  </div>
</template>

<style scoped>
.bookshelf {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--ident-double);
  margin-top: var(--ident-double);

  &__info {
    align-items: center;
    display: flex;
    width: 100%;

    &-wrapper {
      display: flex;
      flex-direction: column;

      & + button {
        margin-left: var(--ident-double);
      }
    }

    &-item {
      & + & {
        margin-top: var(--ident-quarter);
      }
    }
  }

  &__list {
    display: flex;
    flex-wrap: wrap;
    gap: var(--ident);
  }
}
</style>
