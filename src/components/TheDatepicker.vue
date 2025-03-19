<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
  },
  showError: {
    type: Boolean,
    default: false,
  },
})
const emits = defineEmits(['update:modelValue'])

watch(props, (newVal) => {
  if (newVal.modelValue === null) {
    datetime.value = ''
  }
})

const datetime = ref('')
</script>

<template>
  <input
    class="datepicker"
    :class="{ datepicker_error: props.showError }"
    type="datetime-local"
    v-model="datetime"
    @change="emits('update:modelValue', datetime)"
  />
</template>

<style scoped>
.datepicker {
  &_error {
    border-color: var(--button-red);
  }
}
</style>
