<script setup>
import { computed, defineAsyncComponent } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
})
// Динамически подгружаем компонент (иконку) по имени.
const dynamicComponent = computed(() => {
  const name = props.name

  return name ? defineAsyncComponent(() => import(`@/components/icons/Icon${name}.vue`)) : false
})
</script>

<template>
  <component :is="dynamicComponent" />
</template>

<style scoped></style>
