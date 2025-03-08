<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { RouterLink } from 'vue-router'
// Store
import { useBooksStore } from '@/stores/booksStore.js'
// Componnets
import ImageSlider from '@/components/ImageSlider.vue'
import TheIcon from '@/components/TheIcon.vue'
// Helper
import { getCoverPath } from '@/helpers/functions'

const booksStore = useBooksStore()
// Список книг, которые имеют статус "Читаю" или "Слушаю".
const currentBooks = ref([])
// Информация о книге, которая в данный момент отображается на слайде.
const bookOnSlideInfo = ref({})
// Порядковый номер слайда для отображения при добавлении нового элемента.
const slideToShowOnTrigger = ref(0)
// Наименование иконки для отображения статуса книги.
let iconName = ref('')
// Прогресс в процентах.
let bookProgress = ref(0)
// Наблюдаем за изменением в хранилище с книгами, чтобы обновить список книг в слайдере.
watch(booksStore.listOfBooks, () => {
  currentBooks.value = booksStore.getBooksOnReadingAndOnAudition
  // Показать добавленную книгу в слайдере.
  slideToShowOnTrigger.value = currentBooks.value.length - 1
})
// Слайды.
const currentBooksSlides = computed(() => {
  return currentBooks.value.map((item) => getCoverPath(item.cover))
})
// Вычисляемое значение цвета элемента, отображающего прогресс.
const progressColor = computed(() => {
  const percentToValue = Math.trunc((255 * bookProgress.value) / 100)
  const red = 255 - percentToValue
  const green = percentToValue
  const textColor = bookProgress.value >= 75 ? 'color:var(--dark);' : ''

  return `background-color:rgb(${red},${green},0);${textColor}`
})
// Именованный маршрут для router-link
const pathToBook = computed(() => {
  return `/book/${bookOnSlideInfo.value.isbn}`
})
/**
 * Функция обновляет информцию о книге при изменении слайда.
 * @param idBookToShow Порядковый номер книги в объекте currentBooks.
 */
const changeSlide = (idBookToShow) => {
  bookOnSlideInfo.value = currentBooks.value[idBookToShow]

  const status = bookOnSlideInfo.value.status
  let all
  // На основе статуса определяем иконку и считаем прогресс.
  if (status === 'read') {
    all = bookOnSlideInfo.value.pages
    iconName.value = 'BookOpen'

    bookProgress.value =
      all && all > 0 ? ((bookOnSlideInfo.value.pagesRead * 100) / all).toFixed(1) : 0
  } else if (status === 'audio') {
    all = bookOnSlideInfo.value.audioDuration
    iconName.value = 'Headphones'

    bookProgress.value =
      all && all > 0 ? ((bookOnSlideInfo.value.totalListened * 100) / all).toFixed(1) : 0
  } else {
    iconName.value = 'Question'
  }
}
// Смонтировано.
onMounted(() => {
  currentBooks.value = booksStore.getBooksOnReadingAndOnAudition
})
</script>

<template>
  <div class="current-books" v-show="currentBooks.length">
    <ImageSlider
      :slides="currentBooksSlides"
      :showSlide="slideToShowOnTrigger"
      @change-slide="changeSlide"
    />
    <transition name="change-slide" mode="out-in">
      <RouterLink
        :to="pathToBook"
        class="current-books__book-info-wrapper"
        :key="bookOnSlideInfo.isbn"
      >
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
      </RouterLink>
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
      color: var(--white);
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
