<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
// Components
import TheButton from '@/components/TheButton.vue'
import TheMark from '@/components/TheMark.vue'
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
// Статус (прочитано/прослушано/в процессе) книги.
const bookStatus = ref({
  read: {
    complete: false,
    progress: false,
    text: '',
    color: '',
  },
  audio: {
    complete: false,
    progress: false,
    text: '',
    color: '',
  },
})
// Смонитровано.
onMounted(() => {
  if (props.bookData.isComplete) {
    if (props.bookData.pagesRead) {
      bookStatus.value.read.complete = true
      bookStatus.value.read.text = 'Прочитано'
      bookStatus.value.read.color = 'green'
    }
    if (props.bookData.totalListened) {
      bookStatus.value.audio.complete = true
      bookStatus.value.audio.text = 'Прослушано'
      bookStatus.value.audio.color = 'green'
    }
  } else if (props.bookData.status) {
    if (props.bookData.status === 'read') {
      bookStatus.value.read.progress = true
      bookStatus.value.read.text = 'Читаю'
      bookStatus.value.read.color = 'orange'
    }
    if (props.bookData.status === 'audio') {
      bookStatus.value.audio.progress = true
      bookStatus.value.audio.text = 'Слушаю'
      bookStatus.value.audio.color = 'orange'
    }
  }
})
</script>

<template>
  <div class="book-card">
    <div class="book-card__content">
      <img :src="bookCover" alt="" class="book-card__cover" />
      <div class="book-card__info">
        <span class="book-card__title">{{ bookData.title }}</span>
        <span class="book-card__author">{{ bookData.author }}</span>
        <TheMark
          :text="bookStatus.read.text"
          icon="BookOpen"
          :color="bookStatus.read.color"
          v-if="bookStatus.read.complete || bookStatus.read.progress"
        />
        <TheMark
          :text="bookStatus.audio.text"
          icon="Headphones"
          :color="bookStatus.audio.color"
          v-if="bookStatus.audio.complete || bookStatus.audio.progress"
        />
      </div>
    </div>
    <div class="book-card__content">
      <div class="book-card__buttons">
        <TheButton
          color="blue"
          icon="Plus"
          :text="`${bookStatus.read.progress ? 'Страницы' : 'Минуты'}`"
          v-if="bookStatus.read.progress || bookStatus.audio.progress"
        />
        <template v-else>
          <TheButton color="blue" icon="BookOpen" text="Почитать" />
          <TheButton color="red" icon="Headphones" text="Послушать" />
        </template>
      </div>
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
  width: 32%;
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

  &__buttons {
    display: flex;
    flex-direction: column;
    gap: var(--ident);
    flex: 1 1;
  }
}
</style>
