<script setup>
// Store
import { useBooksStore } from '@/stores/booksStore'
// Components
import TheButton from '@/components/TheButton.vue'
import AddProgress from '@/components/AddProgress.vue'

const props = defineProps({
  isbn: {
    type: String,
    required: true,
  },
})
const booksStore = useBooksStore()

// Обновление статуса в хранилище.
const changeStatus = (idStatus) => {
  booksStore.updateStatus(props.isbn, idStatus)
}
</script>

<template>
  <div class="book-buttons">
    <AddProgress v-if="booksStore.isBookInProgress(props.isbn)" :isbn="props.isbn" />
    <template v-else>
      <TheButton color="blue" icon="BookOpen" text="Почитать" @click="changeStatus(1)" />
      <TheButton color="red" icon="Headphones" text="Послушать" @click="changeStatus(2)" />
    </template>
  </div>
</template>

<style scoped>
.book-buttons {
  display: flex;
  flex-direction: column;
  gap: var(--ident);
  flex: 1 1;
}
</style>
