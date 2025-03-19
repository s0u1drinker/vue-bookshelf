<script setup>
import { ref, computed } from 'vue'
// Components
import TheSelect from '@/components/TheSelect.vue'
import TheCanvas from '@/components/TheCanvas.vue'
// Helpers
import { prettyStringDate } from '@/helpers/datetimeFunctions'

const props = defineProps({
  graphData: {
    required: true,
    default: () => [],
  },
})
//
const idEvent = ref(null)
// Список событий.
const selectOptions = computed(() => {
  if (!props.graphData.length) {
    return null //[{ label: '', value: '' }]
  } else {
    return props.graphData.map((item) => {
      let label = `${item.idEvent + 1}. ${item.type === 'read' ? 'Чтение' : 'Аудио'}: `
      let start = item?.progress[0]?.dateStart

      if (start) {
        label += `${prettyStringDate(start)} - ${item.isEnd ? prettyStringDate(item.progress[item.progress.length - 1].dateStop) : '...'}`
      } else {
        label += '-'
      }

      return { label, value: item.idEvent }
    })
  }
})
// Выбранный период
const progressPeriod = computed(() => {
  return props.graphData.length
    ? props.graphData.filter((item) => item.idEvent === idEvent.value)[0]
    : null
})
// Форматирование данных для передачи в Canvas.
const dataForCanvas = computed(() => {
  if (progressPeriod.value) {
    return progressPeriod.value.progress.map((item) => {
      return { text: prettyStringDate(item.dateStop), value: item.count }
    })
  } else return []
})
</script>

<template>
  <div class="graphic">
    <template v-if="selectOptions">
      Выберите период:
      <TheSelect :options="selectOptions" v-model="idEvent" />
      <TheCanvas :datalist="dataForCanvas" />
    </template>
    <p v-else>Нет данных для отображения.</p>
  </div>
</template>

<style scoped>
.graphic {
  margin-top: var(--ident);
}
</style>
