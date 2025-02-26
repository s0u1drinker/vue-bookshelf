<script setup>
import { onMounted, ref } from 'vue'

const props = defineProps({
  options: {
    type: Array,
    required: true,
    validator: (options) => {
      if (options.length) {
        if (options.every((option) => 'value' in option && 'label' in option)) {
          return true
        } else
          throw new Error(
            'Отсутствуют необходимые свойства объекта, переданного в компонент <TheSelect>.',
          )
      } else throw new Error('Передан пустой список для компонента <TheSelect>.')
    },
  },
  addEmptyFirstElement: {
    type: Boolean,
    default: true,
  },
  selectedElement: {
    default: null,
  },
})
const emits = defineEmits(['update:modelValue'])

const select = ref(null)
const selectValue = ref(null)

/**
 * Обновляет модель в родителе при изменении значения select.
 * @param value String Значение
 */
const onChange = () => {
  emits('update:modelValue', selectValue.value)
}
/**
 * Смонтировано.
 */
onMounted(() => {
  // Если в компонент был передан элемент для выбора по умолчанию.
  if (props.selectedElement) {
    // Выбираем из списка элементы с таким значением.
    const elementsInSelect = props.options.filter((item) => item.value == props.selectedElement)

    if (elementsInSelect.length === 0) {
      // Ничего не найдено - выделяем первый элемент в списке.
      selectValue.value = select.value[0].value
    } else if (elementsInSelect.length > 1) {
      // Несколько элементов в спсике с одинаковым value.
      // Такого быть не должно. Нужно разбираться.
      // Кидаем предупреждение в консоль
      console.warn(
        `В компоненте <TheSelect> найдены элементы с одинаковым свойством <value>: ${props.selectedElement}`,
      )
      // и выбираем первый элемент из спсика.
      selectValue.value = select.value[0].value
    } else {
      // Всё отработало как надо - выбираем соответствующий элемент.
      selectValue.value = elementsInSelect[0].value
    }
  } else {
    selectValue.value = select.value[0].value
  }
  // Имитируем выбор элемента.
  onChange()
})
</script>

<template>
  <select @change="onChange()" v-model="selectValue" ref="select">
    <option value="-1" v-if="addEmptyFirstElement"></option>
    <option v-for="(item, index) in props.options" :key="index" :value="item.value">
      {{ item.label }}
    </option>
  </select>
</template>

<style scoped></style>
