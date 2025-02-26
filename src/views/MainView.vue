<script setup>
import { ref, computed } from 'vue'
import { months, yearsForSelect } from '@/helpers/constants'
// Store
import { useBooksStore } from '@/stores/booksStore.js'
// Components
import StatBlock from '@/components/StatBlock.vue'
import TheSelect from '@/components/TheSelect.vue'

const booksStore = useBooksStore()

/**
 * Выбранный пользователем месяц.
 */
const userSelectedMonth = ref(null)
/**
 * Выбранный пользователейм год.
 */
const userSelectedYear = ref(null)
/**
 * Заголовок блока, в котором пользователь выбирает период.
 */
const userBlockTitle = computed(() => {
  if (userSelectedMonth.value !== null && userSelectedYear.value) {
    const m =
      userSelectedMonth.value != -1 ? ` ${months[userSelectedMonth.value].label.toLowerCase()}` : ''
    const y = yearsForSelect().find((item) => item.value === userSelectedYear.value).label

    return `Показатели за${m} ${y} г.`
  } else return ''
})
</script>

<template>
  <h1>Немного статистики</h1>
  <div class="block_wrapper">
    <StatBlock title="Все книги">
      <ul>
        <li>На полке: {{ booksStore.getBooksCount }}</li>
        <li>Закончено: {{ booksStore.getBooksCompleteCount }}</li>
        <li>Прочитано:</li>
        <li>Прослушано:</li>
      </ul>
    </StatBlock>
    <StatBlock title="Средние показатели">
      <ul>
        <li>Рейтинг:</li>
        <li>Количество книг в месяц:</li>
        <li>Количество страниц в день:</li>
        <li>Количество минут в день:</li>
      </ul>
    </StatBlock>
  </div>
  <div class="block_text">
    <span
      >Выберите период для отображения:
      <span class="tooltip" title="Если необходимы данные только за год - оставьте значение пустым."
        >месяц</span
      >&nbsp;
    </span>
    <TheSelect :options="months" v-model="userSelectedMonth" />
    <span> год </span>
    <TheSelect
      :options="yearsForSelect()"
      :addEmptyFirstElement="false"
      v-model="userSelectedYear"
      :selectedElement="new Date().getFullYear()"
    />
    <button class="button button_blue">Показать</button>
  </div>
  <StatBlock :title="userBlockTitle">
    <ul>
      <li>Закончено книг: {{ booksStore.getBooksReadThisYearCount }}</li>
      <li>Из них:</li>
      <li>- прочитано:</li>
      <li>- прослушано:</li>
      <li>Средний рейтинг:</li>
      <li>Среднее количество страниц в день:</li>
      <li>Среднее количество минут в день:</li>
    </ul>
    <div class="stat-block__content-wrapper">
      <span>Список книг:</span>
      <ol></ol>
    </div>
  </StatBlock>
</template>

<style scoped>
.block {
  &_wrapper {
    display: flex;
    flex-wrap: wrap;
    margin-top: var(--ident);

    & > * + * {
      margin-left: var(--ident);
    }
  }

  &_text {
    margin: calc(var(--ident) * 2) 0 var(--ident) 0;

    & > button {
      margin-left: var(--ident);
    }
  }
}
</style>
