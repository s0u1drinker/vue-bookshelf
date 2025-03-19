<script setup>
import { ref, computed } from 'vue'
// Components
import TheButton from '@/components/TheButton.vue'
import ModalWindow from '@/components/ModalWindow.vue'
import TheDatepicker from '@/components/TheDatepicker.vue'
// Store
import { useBooksStore } from '@/stores/booksStore'
import { useProgressStore } from '@/stores/progressStore'
// Helpers
import { getLocalISOString } from '@/helpers/datetimeFunctions'

const props = defineProps({
  isbn: {
    type: String,
    required: true,
  },
})
const booksStore = useBooksStore()
const progressStore = useProgressStore()

// Флаг отображения модального окна.
const showModalWindow = ref(false)
// Даты начала и окончания.
const datepickerStart = ref(null)
const datepickerEnd = ref(null)
// Количество страниц/минут.
const count = ref(0)
// Информация об ошибках.
const error = ref({
  start: false,
  end: false,
  count: false,
  message: '',
})
// Текст кнопки.
const buttonText = computed(() => {
  return progressStore.getBookStatus(props.isbn).textButton
})
// Всего страниц/минут в книге.
const totalCount = computed(() => {
  return booksStore.getTotalCount(props.isbn)
})
// Страниц/минут осталось.
const leftCount = computed(() => {
  return totalCount.value - progressStore.getAllCountsInLastEvent(props.isbn)
})
// Закрытие модального окна.
const closeModalWindow = () => {
  showModalWindow.value = false
  clearErrorFlags()
  clearDataInModalWindow()
}
// Добавить данные о прогрессе.
const addNewProgress = () => {
  // Очищаем флаги.
  clearErrorFlags()
  // Проверяем данные.
  if (datepickerStart.value) {
    const start = new Date(datepickerStart.value)

    if (datepickerEnd.value) {
      const end = new Date(datepickerEnd.value)

      if (start.getTime() != end.getTime()) {
        if (end > start) {
          if (count.value > 0 && count.value <= leftCount.value) {
            // Если всё устраивает - добавляем запись.
            progressStore.addNewProgress(
              props.isbn,
              getLocalISOString(start),
              getLocalISOString(end),
              count.value,
            )
            // Закрываем окошко.
            closeModalWindow()
          } else {
            error.value.count = true
            error.value.message = 'Не верно указано количество.'
          }
        } else {
          error.value.start = true
          error.value.end = true
          error.value.message = 'Дата начала не должна быть позже даты окончания.'
        }
      } else {
        error.value.start = true
        error.value.end = true
        error.value.message = 'Даты начала и окончания не должны быть равны.'
      }
    } else {
      error.value.end = true
      error.value.message = 'Не указана дата окончания.'
    }
  } else {
    error.value.start = true
    error.value.message = 'Не указана дата начала.'
  }
}
// Очистка данных в можальном окне.
const clearDataInModalWindow = () => {
  datepickerStart.value = null
  datepickerEnd.value = null
  count.value = 0
}
// Очистка флагов ошибок.
const clearErrorFlags = () => {
  error.value.start = false
  error.value.end = false
  error.value.count = false
  error.value.message = ''
}
</script>

<template>
  <TheButton color="blue" icon="Plus" :text="buttonText" @click="showModalWindow = true" />
  <ModalWindow
    :showWindow="showModalWindow"
    @close-window="closeModalWindow"
    :headerText="`Добавить ${buttonText.toLowerCase()}`"
  >
    <template #content>
      <div class="add-progress">
        <div class="add-progress__item">
          <span class="add-progress__item-text">Дата и время начала:</span>
          <TheDatepicker :showError="error.start" v-model="datepickerStart" />
        </div>
        <div class="add-progress__item">
          <span class="add-progress__item-text">Дата и время окончания:</span>
          <TheDatepicker :showError="error.end" v-model="datepickerEnd" />
        </div>
        <div class="add-progress__item">
          <span class="add-progress__item-text">Осталось:</span>
          {{ `${leftCount} (Всего: ${totalCount})` }}
        </div>
        <div class="add-progress__item">
          <span class="add-progress__item-text">Количество:</span>
          <input
            type="number"
            min="0"
            :max="leftCount"
            :class="{ input_error: error.count }"
            v-model="count"
          />
        </div>
        <div class="add-progress__message">{{ error.message }}</div>
      </div>
    </template>
    <template #buttons>
      <TheButton color="blue" text="Добавить" @click="addNewProgress" />
      <TheButton color="red" text="Отмена" @click="closeModalWindow" />
    </template>
  </ModalWindow>
</template>

<style scoped>
.add-progress {
  display: flex;
  flex-direction: column;
  gap: var(--ident);

  &__item {
    display: flex;
    align-items: center;

    &-text {
      width: 13rem;
    }

    & > input {
      width: 10rem;
    }
  }

  &__message {
    color: var(--button-red);
    text-align: center;
  }
}
</style>
