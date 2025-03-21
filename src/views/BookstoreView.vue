<script setup>
import { ref } from 'vue'
// Store
import { useBooksStore } from '@/stores/booksStore'
// Components
import TheButton from '@/components/TheButton.vue'
import ModalWindow from '@/components/ModalWindow.vue'

const booksStore = useBooksStore()

const book = ref({})
// Ошибки при проверке данных.
const error = ref({
  flag: false,
  message: '',
})
// Флаг отображения модального окна.
const showModalWindow = ref(false)

// Добавить книгу.
const addBook = () => {
  resetError()

  if (book.value.name?.length > 0) {
    if (book.value.author?.length > 0) {
      if (book.value.isbn > 0) {
        if (book.value.pages > 0) {
          if (book.value.audio > 0) {
            if (book.value.descr?.length > 0) {
              booksStore.addNewBook(book.value)
              showModalWindow.value = true
            } else {
              error.value.message = 'Укажите описание'
              error.value.flag = true
            }
          } else {
            error.value.message = 'Укажите продолжительность аудио'
            error.value.flag = true
          }
        } else {
          error.value.message = 'Укажите количество страниц'
          error.value.flag = true
        }
      } else {
        error.value.message = 'Введите ISBN книги'
        error.value.flag = true
      }
    } else {
      error.value.message = 'Введите автора книги'
      error.value.flag = true
    }
  } else {
    error.value.message = 'Введите наименование книги'
    error.value.flag = true
  }
}
// Очистить форму.
const clearForm = () => {
  book.value = {}
  resetError()
}
// Сбросить флаг ошибки.
const resetError = () => {
  error.value = ref({
    flag: false,
    message: '',
  })
}
// Закрытие модального окна.
const closeModalWindow = () => {
  clearForm()
  showModalWindow.value = false
}
</script>

<template>
  <h1>Книжный магазин (добавить книгу)</h1>
  <div class="bookstore">
    <div class="bookstore__item">
      <label for="name">Наименование:</label>
      <input type="text" id="name" v-model="book.name" />
    </div>
    <div class="bookstore__item">
      <label for="author">Автор:</label>
      <input type="text" id="author" v-model="book.author" />
    </div>
    <div class="bookstore__item">
      <label for="isbn">ISBN:</label>
      <input type="number" id="isbn" v-model="book.isbn" />
    </div>
    <div class="bookstore__item">
      <label for="serie">Серия:</label>
      <input type="text" id="serie" v-model="book.serie" />
    </div>
    <div class="bookstore__item">
      <label for="pages">Страницы:</label>
      <input type="number" min="0" id="pages" v-model="book.pages" />
    </div>
    <div class="bookstore__item">
      <label for="audio">Аудио (минуты):</label>
      <input type="number" min="0" id="audio" v-model="book.audio" />
    </div>
    <div class="bookstore__item">
      <label for="descr">Описание:</label>
      <textarea id="descr" rows="4" v-model="book.descr"></textarea>
    </div>
    <div class="bookstore__message" :class="{ bookstore__message_show: error.flag }">
      {{ error.message }}
    </div>
    <div class="bookstore__buttons">
      <TheButton color="blue" text="Добавить" @click="addBook" />
      <TheButton color="red" text="Очистить" @click="clearForm" />
    </div>
  </div>
  <ModalWindow
    :showWindow="showModalWindow"
    @close-window="closeModalWindow"
    headerText="Книга добавлена"
  >
    <template #content>
      <ul>
        <li><span class="underline">Наименование</span>: {{ book.name }}</li>
        <li><span class="underline">Автор</span>: {{ book.author }}</li>
        <li><span class="underline">ISBN</span>: {{ book.isbn }}</li>
      </ul>
    </template>
    <template #buttons>
      <TheButton color="blue" text="Хорошо" @click="closeModalWindow" />
    </template>
  </ModalWindow>
</template>

<style scoped>
.bookstore {
  margin-top: var(--ident-double);
  width: 26rem;
  display: flex;
  flex-direction: column;
  gap: var(--ident);

  &__item {
    display: flex;
    justify-content: space-between;

    & > input,
    textarea {
      width: 12rem;
    }
  }

  &__message {
    color: var(--button-red);
    min-height: var(--ident-and-quarter);
    text-align: center;
    opacity: 0;

    &_show {
      opacity: 1;
    }
  }

  &__buttons {
    display: flex;
    gap: var(--ident);
    justify-content: center;
  }
}
</style>
