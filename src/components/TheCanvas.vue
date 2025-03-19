<script setup>
import { computed, watch, ref, useTemplateRef, nextTick } from 'vue'
// Helpers
import { drawChart } from '@/helpers/drawChart'

const props = defineProps({
  datalist: {
    type: Array,
    required: true,
  },
})
const canvas = useTemplateRef('chart')
const canvasWidth = ref(0)
const canvasHeight = ref(0)
// Конфигурация стилей
const config = {
  padding: 40,
  font: '16px sans-serif',
  gridColor: '#aaa',
  fillTextColor: '#000',
  fillRectColor: '#c23613',
  paddingRect: 30,
}
const showFlag = computed(() => {
  return props.datalist && props.datalist.length
})

watch(showFlag, async (newVal) => {
  if (newVal) {
    const aggregated = {}
    // Собираем данные по датам.
    props.datalist.forEach((item) => {
      aggregated[item.text] = (aggregated[item.text] || 0) + item.value
    })
    // Вычисляем высоту canvas.
    canvasHeight.value = config.paddingRect * Object.keys(aggregated).length + 20
    // Вычисляем ширину canvas.
    canvasWidth.value = 90 + Math.max(...Object.values(aggregated)) + 50
    // Ждём обновления DOM.
    await nextTick()
    // Создаём контекст.
    const ctx = canvas.value.getContext('2d')
    // Рисуем график.
    drawChart(aggregated, canvasWidth.value, canvasHeight.value, ctx, config)
  }
})
</script>

<template>
  <div class="canvas">
    <canvas
      id="chart"
      ref="chart"
      class="canvas__chart"
      :width="canvasWidth"
      :height="canvasHeight"
      v-show="showFlag"
    ></canvas>
    <div class="canvas__empty-data" v-show="!showFlag">Нет данных для отрисовки графика.</div>
  </div>
</template>

<style scoped>
.canvas {
  margin-top: var(--ident);
}
</style>
