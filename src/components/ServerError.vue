<script setup>
const props = defineProps({
  text: {
    type: String,
    default: 'Сервер не отвечает',
  },
})
</script>

<template>
  <div class="server-error">
    <span class="server-error__code">500</span>
    <span class="server-error__text">Ошибка загрузки данных:<br />{{ props.text }}</span>
  </div>
</template>

<style scoped>
.server-error {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
  gap: var(--ident);

  &__code {
    font-size: 8rem;
  }

  &__text {
    text-align: center;
  }
}
</style>
