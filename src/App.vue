<script setup>
import { onMounted, ref } from 'vue'
import { RouterView } from 'vue-router'
// Components
import TheSidebar from '@/components/TheSidebar.vue'
import ThePreloader from '@/components/ThePreloader.vue'
import ServerError from '@/components/ServerError.vue'
// Store
import { useBooksStore } from '@/stores/booksStore'
import { useProgressStore } from '@/stores/progressStore'
import { useRatingsStore } from '@/stores/ratingsStore'
// Constants
import { api } from '@/helpers/constants'

const booksStore = useBooksStore()
const progressStore = useProgressStore()
const ratingStore = useRatingsStore()

const dataIsLoading = ref(true)
const errorLoadingData = ref({
  flag: false,
  message: '',
})

onMounted(async () => {
  const url = `${api}data?api_key=${import.meta.env.VITE_API_KEY}`

  await fetch(url)
    .then((response) => response.json())
    .then((newData) => {
      if (newData.error) {
        errorLoadingData.value.flag = true
        errorLoadingData.value.message = newData.message
      } else {
        if (newData.books.length && newData.progress.length && newData.rating.length) {
          booksStore.updateBooks(newData.books)
          progressStore.updateProgress(newData.progress)
          ratingStore.updateRating(newData.rating)
        } else {
          errorLoadingData.value.flag = true
          errorLoadingData.value.message = 'Сервер не вернул данные.'
        }
      }
    })
    .catch((error) => {
      errorLoadingData.value.flag = true
      errorLoadingData.value.message = 'Сервер не отвечает.'
      console.log(`При обработке запроса возникла ошибка: ${error}`)
    })
    .finally(() => {
      dataIsLoading.value = false
    })
})
</script>

<template>
  <template v-if="dataIsLoading || errorLoadingData.flag">
    <ThePreloader v-if="dataIsLoading" />
    <ServerError :text="errorLoadingData.message" v-else-if="errorLoadingData.flag" />
    <div v-else>Что-то сломалось... зовите фиксиков!</div>
  </template>
  <template v-else>
    <TheSidebar />
    <main>
      <RouterView />
    </main>
  </template>
</template>

<style scoped></style>
