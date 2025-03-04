<script setup>
import { computed } from 'vue'
// Icon
import TheIcon from '@/components/TheIcon.vue'

const props = defineProps({
  text: {
    type: String,
    default: '',
    required: true,
  },
  icon: {
    type: String,
    default: '',
  },
  color: {
    type: String,
    default: '',
  },
})

const extendedClass = computed(() => {
  return props.color ? `mark_${props.color}` : false
})
</script>

<template>
  <div class="mark" :class="[extendedClass]">
    <TheIcon :name="props.icon" v-if="props.icon" />
    <span>{{ props.text }}</span>
  </div>
</template>

<style scoped>
.mark {
  align-items: center;
  background-color: var(--dark);
  border: 1px solid var(--dark);
  border-radius: 1rem;
  color: var(--white);
  display: flex;
  gap: var(--ident-half);
  font-size: 0.75rem;
  padding: var(--ident-quarter) var(--ident-half);

  & > svg {
    --icon-size: var(--ident);

    height: var(--icon-size);
    width: var(--icon-size);
  }

  &_green {
    background-color: var(--button-green);
    border-color: var(--button-green);
  }

  &_orange {
    background-color: var(--orange);
    border-color: var(--orange);
  }
}
</style>
