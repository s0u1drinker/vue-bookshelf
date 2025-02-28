<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  slaveClass: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <fieldset class="stat-block" :class="{ 'stat-block_slave': slaveClass }">
    <legend>{{ props.title }}</legend>
    <slot></slot>
  </fieldset>
</template>

<style scoped>
.stat-block {
  --divider-size: calc(var(--ident) * 3);

  border: 1px solid var(--blue);
  display: inline-flex;
  margin: 0;
  min-width: 13rem;
  padding: var(--ident);

  & > legend {
    font-weight: bold;
    padding: 0 var(--ident);
  }

  & + &:not(&_slave) {
    margin-left: var(--ident);
  }

  &:has(+ &_slave) {
    position: relative;

    &::after {
      content: url("data:image/svg+xml; utf8, <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m8 4l8 8l-8 8'></path></svg>");
      height: var(--divider-size);
      position: absolute;
      right: calc(var(--divider-size) * -1);
      top: 0;
      width: var(--divider-size);
    }
  }

  &_slave {
    margin-left: var(--divider-size);
  }
}
</style>
