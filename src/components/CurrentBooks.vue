<script setup>
import { ref, computed } from 'vue'
// Store
import { useBooksStore } from '@/stores/booksStore.js'
// Helper
import { getCoverPath } from '@/helpers/functions'

const booksStore = useBooksStore()
const indexToShow = ref(0)
const blockTitle = computed(() => {
  return booksStore.getBooksOnReadingAndOnAudition[indexToShow.value].isbn
})
</script>

<template>
  <div class="current-books">
    <button @click="indexToShow--">Prev</button>
    <h4 class="current-books__header">{{ blockTitle }}</h4>
    <button @click="indexToShow++">Next</button>
    <div
      class="current-books__book"
      v-for="(book, index) in booksStore.getBooksOnReadingAndOnAudition"
      :key="index"
      v-show="indexToShow === index"
    >
      <img class="current-books__book-cover" :src='getCoverPath(book.cover)' alt="">
      <span class="current-books__book-title">{{ book.title }}</span>
      <span class="current-books__book-authoe">{{ book.author }}</span>
      <div class="current-books__book-progress"></div>
    </div>
  </div>
</template>

<style scoped>
</style>
