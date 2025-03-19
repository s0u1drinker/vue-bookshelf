<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
// Components
import BookStatus from '@/components/BookStatus.vue'
import BookButtons from '@/components/BookButtons.vue'
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
        <span class="book-card__title">{{ bookData.title }}</span>
        <span class="book-card__author">{{ bookData.author }}</span>
        <BookStatus :isbn="bookData.isbn" />
      </div>
    </div>
    <div class="book-card__content">
      <BookButtons :isbn="bookData.isbn" />
      <RouterLink :to="`/book/${bookData.isbn}`" class="link">Подробнее</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.book-card {
  box-sizing: border-box;
  display: flex;
  gap: var(--ident);
  padding: var(--ident);
  width: 21rem;
  transition: box-shadow var(--animation-options-fast);

  &:hover {
    box-shadow: var(--shadow-options) var(--dark);

    & > .book-card__content:nth-child(2) {
      opacity: 1;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: var(--ident);
    transition: opacity var(--animation-options-fast);
    width: 50%;

    &:nth-child(2) {
      align-items: center;
      opacity: 0;
    }
  }

  &__cover {
    width: 100%;
  }

  &__info {
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    gap: var(--ident-half);
  }

  &__title {
    font-weight: bold;
  }

  &__author {
    font-style: italic;
  }
}
</style>
