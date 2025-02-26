<script setup>
import { ref, computed } from 'vue'
// Store
import { useBooksStore } from '@/stores/booksStore.js'
// Componnets
import ImageSlider from '@/components/ImageSlider.vue'
import TheIcon from '@/components/TheIcon.vue'

const booksStore = useBooksStore()
/**
 * Список книг, которые имеют статус "Читаю" или "Слушаю".
 * @type Object
 */
const currentBooks = booksStore.getBooksOnReadingAndOnAudition
/**
 * Список имён файлов с обложками книг.
 * @type Array
 */
const currentBooksCovers = currentBooks.map((item) => item.cover)
/**
 * Информация о книге, которая в данный момент отображается на слайде.
 * @type Object
 */
let bookOnSlideInfo = ref({})
/**
 * Наименование иконки для отображения статуса книги.
 * @type String
 */
let iconName = ref('')
/**
 * Прогресс в процентах.
 * @type Number
 */
let bookProgress = ref(0)
/**
 * Вычисляемое значение цвета элемента, отображающего прогресс.
 * @type String
 */
const progressColor = computed(() => {
  const percentToValue = Math.trunc((255 * bookProgress.value) / 100)
  const red = 255 - percentToValue
  const green = percentToValue
  const textColor = bookProgress.value >= 75 ? 'color:var(--dark);' : ''

  return `background-color:rgb(${red},${green},0);${textColor}`
})
/**
 * Функция обновляет информцию о книге при изменении слайда.
 * @param idBookToShow Порядковый номер книги в объекте currentBooks.
 */
const changeSlide = (idBookToShow) => {
  bookOnSlideInfo.value = currentBooks[idBookToShow]

  const status = bookOnSlideInfo.value.status

  if (status === 'read') {
    iconName.value = 'BookOpen'
    bookProgress.value = (
      (bookOnSlideInfo.value.pagesRead * 100) /
      bookOnSlideInfo.value.pages
    ).toFixed(1)
  } else if (status === 'audio') {
    iconName.value = 'Headphones'
    bookProgress.value = (
      (bookOnSlideInfo.value.totalListened * 100) /
      bookOnSlideInfo.value.audioDuration
    ).toFixed(1)
  } else {
    iconName.value = 'Question'
  }
}
</script>

<template>
  <div class="current-books" v-show="currentBooks.length">
    <ImageSlider :slides="currentBooksCovers" @change-slide="changeSlide" />
    <transition name="change-slide" mode="out-in">
      <div class="current-books__book-info-wrapper" :key="bookOnSlideInfo.isbn">
        <TheIcon :name="iconName" class="current-books__status-icon" />
        <div class="current-books__book-info">
          <span class="current-books__book-author">{{ bookOnSlideInfo.author }}</span>
          <span class="current-books__book-title">{{ bookOnSlideInfo.title }}</span>
        </div>
        <div
          class="current-books__book-progress"
          :style="progressColor"
          v-show="bookOnSlideInfo.isbn"
        >
          {{ `${bookProgress}%` }}
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.current-books {
  --icon-size: 2rem;

  &__status-icon {
    background-color: var(--dark-blue);
    grid-area: icon;
    padding: var(--ident-half);
    height: var(--icon-size);
    width: var(--icon-size);
  }

  &__book {
    &-info-wrapper {
      display: flex;
      flex-wrap: wrap;
    }

    &-info {
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: stretch;
      padding-left: var(--ident-half);
    }

    &-author {
      filter: brightness(0.5);
      font-style: italic;
    }

    &-progress {
      border: 1px solid var(--white);
      margin-top: var(--ident);
      padding: var(--ident-quarter) 0;
      text-align: center;
      width: 100%;
    }
  }
}
</style>
