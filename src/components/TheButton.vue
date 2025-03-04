<script setup>
import { computed } from 'vue'
// Icon
import TheIcon from '@/components/TheIcon.vue'

const props = defineProps({
  text: {
    type: String,
    default: '',
  },
  icon: {
    type: String,
    default: '',
  },
  outline: {
    type: Boolean,
    default: false,
  },
  color: {
    type: String,
    default: '',
  },
  link: {
    type: String,
    default: '',
  },
})
const extraClass = computed(() => {
  let className = ''

  if (props.outline || props.color) {
    className = `button${props.outline ? '_outline' : ''}${props.color ? '_' + props.color : ''}`
  }

  return className
})
</script>

<template>
  <component
    :is="link ? 'RouterLink' : 'button'"
    class="button"
    :class="extraClass"
    :to="link || null"
  >
    <TheIcon :name="props.icon" v-if="props.icon" />
    <span v-if="props.text">{{ props.text }}</span>
    <span v-if="!props.icon && !props.text">Кто-то забыл передать кнопке текст или икноку? =)</span>
  </component>
</template>

<style scoped>
.button {
  align-items: center;
  background-color: var(--white);
  border: 1px solid var(--black);
  display: inline-flex;
  gap: var(--ident-half);
  justify-content: center;
  margin: 0;
  padding: var(--ident-half);
  transition:
    color var(--animation-options-fast),
    background-color var(--animation-options-fast),
    border-color var(--animation-options-fast),
    box-shadow var(--animation-options-fast);

  &:hover {
    cursor: pointer;
    background-color: var(--light-blue);
  }

  & > svg {
    --icon-size: calc(var(--ident) + 0.25rem);

    height: var(--icon-size);
    width: var(--icon-size);
  }

  &_outline {
    &_blue {
      border-color: var(--button-blue);
      color: var(--button-blue);

      &:hover {
        background-color: var(--button-blue);
        color: var(--white);
      }
    }
  }

  &_blue {
    background-color: var(--button-blue);
    border-color: var(--button-blue);
    color: var(--white);

    &:hover {
      background-color: var(--button-blue-hover);
      border-color: var(--button-blue-hover);
    }
  }

  &_red {
    background-color: var(--button-red);
    border-color: var(--button-red);
    color: var(--white);

    &:hover {
      background-color: var(--button-red-hover);
      border-color: var(--button-red-hover);
    }
  }
}
</style>
