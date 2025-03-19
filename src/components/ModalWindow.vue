<script setup>
import { watch, useTemplateRef, useSlots } from 'vue'

const props = defineProps({
  showWindow: {
    type: Boolean,
    default: false,
  },
  headerText: {
    type: String,
    default: '',
  },
})
const emits = defineEmits(['close-window'])
const slots = useSlots()
// DOM-элемент dialog.
const modalWindow = useTemplateRef('modalWindow')

watch(props, (newVal) => {
  newVal.showWindow === true ? modalWindow.value.showModal() : modalWindow.value.close()
})
//
const closeModalWindow = () => {
  emits('close-window')
}

const handleModalClick = (event) => {
  if (event.target.classList.contains('modal-window')) {
    closeModalWindow()
  }
}
</script>

<template>
  <teleport to="body">
    <dialog
      ref="modalWindow"
      aria-label="Добавить значение"
      class="modal-window"
      @click="handleModalClick"
      @keydown.esc="closeModalWindow"
    >
      <div class="modal-window__content-wrapper">
        <h2 class="modal-window__header" v-if="props.headerText">{{ props.headerText }}</h2>
        <div class="modal-window__content" v-if="slots.content">
          <slot name="content"></slot>
        </div>
        <div class="modal-window__buttons" v-if="slots.buttons">
          <slot name="buttons"></slot>
        </div>
      </div>
    </dialog>
  </teleport>
</template>

<style scoped>
.modal-window {
  &__header {
    text-align: center;
  }

  &__content-wrapper {
    padding: var(--ident);
    border: 2px solid var(--dark);
    display: flex;
    flex-direction: column;
    gap: var(--ident);
  }

  &__buttons {
    display: flex;
    justify-content: center;
    gap: var(--ident);
  }
}
</style>
