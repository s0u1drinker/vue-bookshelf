<script setup>
import { computed } from 'vue'
// Store
import { useProgressStore } from '@/stores/progressStore'
// Components
import TheMark from '@/components/TheMark.vue'

const props = defineProps({
  isbn: {
    type: String,
    required: true,
  },
})
const progressStore = useProgressStore()
// Статус (прочитано/прослушано/в процессе) книги.
const bookStatus = computed(() => {
  return progressStore.getBookStatus(props.isbn)
})
</script>

<template>
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
</template>

<style scoped></style>
