<script setup>
import { ref, computed } from 'vue'
// Store
import { useRatingsStore } from '@/stores/ratingsStore'
// Components
import TheSelect from '@/components/TheSelect.vue'
import TheButton from '@/components/TheButton.vue'

const ratingsStore = useRatingsStore()

const props = defineProps({
  isbn: {
    type: String,
    required: true,
  },
})
// Рейтинг для выбора.
const ratingArray = ratingsStore.getRatingArray
// Параметры рейтинга
const parameters = ratingsStore.getParameters
// Шаблон для заполнения.
const ratingTemplate = ref({ ...ratingsStore.getTemplate })
// Сообщение об ошибке.
const ratingError = ref('')
// Рейтинг.
const rating = computed(() => {
  return ratingsStore.getBookRating(props.isbn)
})
// Класс для числового значения рейтинга.
let colorClass = computed(() => {
  return `rating__overall-value_${['low', 'mid', 'high'][Math.floor(rating.value.summary / 4)] || 'low'}`
})
// Добавляем рейтинг книги.
const setRating = () => {
  let count = 0
  let sum = 0
  ratingError.value = ''
  // Считаем итоговый рейтинг.
  Object.entries(ratingTemplate.value).forEach(([key, value]) => {
    if (key !== 'summary' && value !== '-1') {
      count++
      sum += value
    }
  })

  if (count === Object.keys(ratingTemplate.value).length - 1) {
    ratingTemplate.value.summary = +(sum / count).toFixed(2)
    ratingsStore.addNewRating(props.isbn, ratingTemplate.value)
    // Сброс временных значений.
    ratingTemplate.value = ratingsStore.getTemplate
  } else {
    ratingError.value = 'Даны не все оценки.'
  }
}
</script>

<template>
  <div class="rating">
    <template v-if="rating.summary">
      <div class="rating__overall">
        <span class="rating__overall-value" :class="colorClass">{{ rating.summary }}</span>
        <span class="rating__overall-max">/10</span>
      </div>
      <div class="rating__item" v-for="(item, index) in parameters" :key="index">
        {{ `${Object.values(item)}: ` }}
        <span class="bold italic">{{ `${rating[Object.keys(item)]}` }}</span>
      </div>
    </template>
    <template v-else>
      <div class="rating__item" v-for="(item, index) in parameters" :key="index">
        {{ `${Object.values(item)}: ` }}
        <TheSelect :options="ratingArray" v-model="ratingTemplate[Object.keys(item)]" />
      </div>
      <div class="rating__add-error">{{ ratingError }}</div>
      <TheButton color="blue" icon="Plus" text="Оценить" @click="setRating" />
    </template>
  </div>
</template>

<style scoped>
.rating {
  border: 1px solid var(--blue);
  display: flex;
  flex-direction: column;
  gap: var(--ident-half);
  padding: var(--ident);

  &__overall {
    position: relative;

    &-value {
      font-size: var(--ident-and-half);

      &_high {
        color: var(--button-green);
      }

      &_mid {
        color: var(--orange);
      }

      &_low {
        color: var(--button-red);
      }
    }

    &-max {
      font-weight: bold;
    }
  }

  &__add-error {
    color: var(--button-red);
    text-align: center;
  }
}
</style>
