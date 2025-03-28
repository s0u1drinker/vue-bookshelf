<script setup>
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
// Functions
import { months, yearsForSelect } from '@/helpers/constants'
// Store
import { useBooksStore } from '@/stores/booksStore'
import { useProgressStore } from '@/stores/progressStore'
import { useRatingsStore } from '@/stores/ratingsStore'
// Components
import StatBlock from '@/components/StatBlock.vue'
import TheSelect from '@/components/TheSelect.vue'
import TheButton from '@/components/TheButton.vue'
import ChartForTheYear from '@/components/ChartForTheYear.vue'

const booksStore = useBooksStore()
const progressStore = useProgressStore()
const ratingsStore = useRatingsStore()

// Счётчики прочитанных книг за выбранный период.
const booksCompleteCountAtUserPeriod = ref([])
// Выбранный пользователем месяц.
const userSelectedMonth = ref(null)
// Выбранный пользователем год.
const userSelectedYear = ref(null)
// Заголовок блока, в котором пользователь выбирает период.
const userBlockTitle = ref('')
// Рейтинг в блоке, в котором пользователь выбирает перриод.
const userBlockRating = ref(0)
// Всего книг на полке.
const booksCount = computed(() => booksStore.getBooksCount)
// Счётчики прочитанных книг.
const booksCompleteCount = computed(() => progressStore.getFinishedBooks)
// Смонтировано.
onMounted(() => {
  showSelectedPeriodData()
})
// Показывает статистику по книгам за выбранный период.
const showSelectedPeriodData = () => {
  const year = userSelectedYear.value
  const month = userSelectedMonth.value == -1 ? false : userSelectedMonth.value

  booksCompleteCountAtUserPeriod.value = booksStore.getBooksCompleteCount(true, year, month)

  if (month !== null && year) {
    const m = month === 0 || month ? ` ${months[month].label.toLowerCase()}` : ''
    const y = yearsForSelect().find((item) => item.value === year).label

    userBlockTitle.value = `Данные за${m} ${y} г.`
  } else
    console.warn(
      `Странная ситуация: не установлен(ы) month (${month}) или(и) year (${year}) при запросе данных за период.`,
    )

  userBlockRating.value = ratingsStore.getAverageRating(booksCompleteCountAtUserPeriod.value.list)
}
</script>

<template>
  <h1>Немного статистики</h1>
  <div class="statistic">
    <StatBlock title="Все книги">
      <ul>
        <li>На полке: {{ booksCount }}</li>
        <li>Прочитано/прослушано раз: {{ booksCompleteCount.count }}</li>
        <li>Из них:</li>
        <li>- прочитано: {{ booksCompleteCount.read }}</li>
        <li>- прослушано: {{ booksCompleteCount.audio }}</li>
        <li>Средний рейтинг: {{ ratingsStore.getAverageRating() }}</li>
      </ul>
    </StatBlock>
    <div class="statistic__block_text">
      <span
        >Выберите период для отображения:
        <span
          class="tooltip"
          title="Если необходимы данные только за год - оставьте значение пустым."
          >месяц</span
        >&nbsp;
      </span>
      <TheSelect
        :options="months"
        v-model="userSelectedMonth"
        :selectedElement="new Date().getMonth()"
      />
      <span> год </span>
      <TheSelect
        :options="yearsForSelect()"
        :addEmptyFirstElement="false"
        v-model="userSelectedYear"
        :selectedElement="new Date().getFullYear()"
      />
      <TheButton text="Показать" color="blue" @click="showSelectedPeriodData" />
    </div>
    <div class="statistic__block_wrapper">
      <StatBlock :title="userBlockTitle">
        <ul>
          <li>Закончено книг: {{ booksCompleteCountAtUserPeriod.all }}</li>
          <li>Из них:</li>
          <li>- прочитано: {{ booksCompleteCountAtUserPeriod.read }}</li>
          <li>- прослушано: {{ booksCompleteCountAtUserPeriod.audio }}</li>
          <li>Средний рейтинг: {{ userBlockRating }}</li>
        </ul>
      </StatBlock>
      <StatBlock
        title="Список книг"
        :slaveClass="true"
        v-if="booksCompleteCountAtUserPeriod.list?.length"
      >
        <ol>
          <li v-for="(book, index) in booksCompleteCountAtUserPeriod.list" :key="index">
            <RouterLink :to="`/book/${book.isbn}`" class="link">
              <span class="italic">{{ book.author }}</span> -
              <span class="bold">&laquo;{{ book.title }}&raquo;</span>
            </RouterLink>
          </li>
        </ol>
      </StatBlock>
    </div>
  </div>
  <ChartForTheYear />
</template>

<style scoped>
.statistic {
  margin-top: var(--ident-double);

  &__block {
    &_wrapper {
      align-items: flex-start;
      display: flex;
      flex-wrap: wrap;
      margin-top: var(--ident);
    }

    &_text {
      margin: calc(var(--ident) * 2) 0 var(--ident) 0;

      & > button {
        margin-left: var(--ident);
      }
    }
  }
}
</style>
