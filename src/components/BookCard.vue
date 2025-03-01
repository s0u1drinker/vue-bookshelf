<script setup>
import { computed } from 'vue'
// Helper
import { getCoverPath } from '@/helpers/functions'

const props = defineProps({
  bookData: {
    type: Object,
    required: true,
    validator: (bookData) => {
      if (
        'author' in bookData &&
        'title' in bookData &&
        'isbn' in bookData &&
        'cover' in bookData
      ) {
        return true
      } else
        throw new Error(
          'Отсутствуют необходимые свойства объекта, переданного в компонент <BookCard>.',
        )
    },
  },
})
// Путь к картинке с обложкой книги.
const bookCover = computed(() => {
  return getCoverPath(props.bookData.cover)
})
</script>

<template>
  <div class="book-card">
    <div class="book-card__content">
      <img :src="bookCover" alt="" class="book-card__cover" />
      <div class="book-card__info">
        <div class="book-card__title">{{ bookData.title }}</div>
        <div class="book-card__author">{{ bookData.author }}</div>
        <div class="book-card__serie">{{ bookData.bookSeries }}</div>
      </div>
    </div>
    <div class="book-card__content">
      <div class="book-card__statuses">
        <span class="book-card__complete"></span>
        <span class="book-card__in-progress"></span>
      </div>
      <div class="book-card__buttons">
        <button>Послушать</button>
        <button>Почитать</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.book-card {
  border: 1px solid var(--blue);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: var(--ident-half);
  padding: var(--ident);
  width: 45%;

  &__content {
    display: flex;
    gap: var(--ident);
  }

  &__cover {
    width: calc(var(--ident) * 8);
  }
}
</style>
