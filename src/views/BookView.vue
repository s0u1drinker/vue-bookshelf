<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
// Store
import { useBooksStore } from '@/stores/booksStore'
import { useProgressStore } from '@/stores/progressStore'
// Components
import BookStatus from '@/components/BookStatus.vue'
import BookButtons from '@/components/BookButtons.vue'
import TheRating from '@/components/TheRating.vue'
import TheGraphic from '@/components/TheGraphic.vue'
import TheButton from '@/components/TheButton.vue'
// Helpers
import { getCoverPath } from '@/helpers/functions'
import { prettyStringDate, minutesToHours } from '@/helpers/datetimeFunctions'

const booksStore = useBooksStore()
const progressStore = useProgressStore()
const route = useRoute()
// Комментарий.
const newOpinion = ref('')
// Текст ошибки при добавлении.
const formError = ref('')
// ISBN книги из маршрута.
const isbn = computed(() => {
  return route.params.isbn
})
// Ифнормация о книге.
const book = computed(() => {
  return booksStore.getBookInfoByISBN(isbn.value)
})
// Прогресс.
const progress = computed(() => {
  return progressStore.getProgressListByISBN(isbn.value)
})
// Путь к файлу с обложкой.
const cover = computed(() => {
  return getCoverPath(book.value.cover)
})
// Дата добавления книги на полку.
const dateAdd = computed(() => {
  return prettyStringDate(book.value.dateAdd)
})
// Добавление комментария к книге.
const addOpinion = () => {
  formError.value = ''

  if (newOpinion.value.length > 3) {
    booksStore.setOpinion(isbn.value, newOpinion.value)
    newOpinion.value = ''
  } else formError.value = 'Необходимо ввести не менее 3-х символов.'
}
</script>

<template>
  <div class="book">
    <h1>{{ book.title }}</h1>
    <div class="book__author">{{ book.author }}</div>
    <div class="book__status">
      <BookStatus :isbn />
    </div>
    <div class="book__content">
      <div class="book__cover-wrapper">
        <img :src="cover" alt="" class="book__cover" />
        <BookButtons :isbn />
      </div>
      <div class="book__about">
        <ul class="book__info">
          <li class="book__info-item" v-if="book.bookSeries">
            <span class="book__info-item-title">Серия:</span> {{ book.bookSeries }}
          </li>
          <li class="book__info-item">
            <span class="book__info-item-title">Добавлена на полку:</span> {{ dateAdd }}
          </li>
          <li class="book__info-item" v-if="book.pages">
            <span class="book__info-item-title">Страниц:</span> {{ book.pages }}
          </li>
          <li class="book__info-item" v-if="book.audioDuration">
            <span class="book__info-item-title">Продолжительность аудио:</span>
            {{ minutesToHours(book.audioDuration) }}
          </li>
        </ul>
        <h2>Аннотация</h2>
        <div class="book__descr" v-html="book.description"></div>
      </div>
    </div>
    <div class="book__rating">
      <h2>Рейтинг</h2>
      <div class="book__rating-wrapper">
        <TheRating :isbn />
        <div class="book__opinion">
          <h3>Мнение о книге</h3>
          <p v-if="book.opinion">{{ book.opinion }}</p>
          <div class="book__opinion-form" v-else>
            <textarea v-model="newOpinion"></textarea>
            <div class="book__opinion-form-error">{{ formError }}</div>
            <TheButton color="blue" icon="Plus" text="Комментарий" @click="addOpinion" />
          </div>
        </div>
      </div>
    </div>
    <div class="book__progress">
      <h2>График прогресса</h2>
      <TheGraphic :graphData="progress" />
    </div>
  </div>
</template>

<style scoped>
.book {
  &__author {
    color: var(--gray);
    margin-top: var(--ident-half);
    font-style: italic;
  }

  &__status {
    display: flex;
    gap: var(--ident);
    margin-top: var(--ident-double);
  }

  &__content {
    align-items: flex-start;
    margin-top: var(--ident);
    display: flex;
    gap: var(--ident);
  }

  &__cover {
    &-wrapper {
      display: flex;
      flex-direction: column;
      gap: var(--ident);
    }
  }

  &__about {
    & > * + * {
      margin-top: var(--ident);
    }
  }

  &__info {
    &-item-title {
      color: var(--gray);
    }
  }

  &__rating {
    margin-top: var(--ident-double);

    &-wrapper {
      display: flex;
      gap: var(--ident);
      margin-top: var(--ident);

      & > .rating {
        width: 13rem;
      }
    }
  }

  &__opinion {
    flex: 4;

    & > p {
      margin-top: var(--ident-half);
    }

    &-form {
      margin-top: var(--ident);
      display: flex;
      flex-direction: column;
      gap: var(--ident);
      align-items: flex-start;

      &-error {
        color: var(--button-red);
      }

      & > textarea {
        height: 7rem;
        width: 100%;
      }
    }
  }

  &__progress {
    margin-top: var(--ident-double);
  }
}
</style>
