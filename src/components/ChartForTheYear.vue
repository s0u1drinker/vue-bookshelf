<script setup>
import { ref, computed } from 'vue'
// Store
import { useProgressStore } from '@/stores/progressStore'
// Functions
import { yearsForSelect } from '@/helpers/constants'
// Components
import ChartSVG from '@/components/ChartSVG.vue'
import TheSelect from '@/components/TheSelect.vue'

const progressStore = useProgressStore()
// Выбранный пользователем год.
const userSelectedYear = ref(null)
// Данные для диаграммы.
const chartData = computed(() =>
  progressStore.getFinishedBooksPerMonthInYear(userSelectedYear.value),
)
</script>

<template>
  <div class="chart">
    <div class="chart__header">
      Количество книг за
      <TheSelect
        :options="yearsForSelect()"
        :addEmptyFirstElement="false"
        v-model="userSelectedYear"
        :selectedElement="new Date().getFullYear()"
      />
      год
    </div>
    <ChartSVG :data="chartData.months">
      <template #legend>
        <div class="chart-svg__legend-block chart-svg__legend-block_read">
          {{ `Книг прочитано: ${chartData.read}` }}
        </div>
        <div class="chart-svg__legend-block chart-svg__legend-block_audio">
          {{ `Книг прослушано: ${chartData.audio}` }}
        </div>
      </template>
    </ChartSVG>
  </div>
</template>

<style scoped>
.chart {
  display: flex;
  flex-direction: column;
  margin-top: var(--ident-double);

  &__header {
    font-weight: bold;
    font-size: var(--ident-and-half);
  }
}
</style>
