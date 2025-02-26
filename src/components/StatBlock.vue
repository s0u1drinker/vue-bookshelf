<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <fieldset class="stat-block">
    <legend>{{ props.title }}</legend>
    <slot></slot>
  </fieldset>
</template>

<style>
.stat-block {
  border: 1px solid var(--blue);
  display: inline-flex;
  margin: 0;
  min-width: 10rem;
  padding: var(--ident);

  & > legend {
    font-weight: bold;
    padding: 0 var(--ident);
  }

  &__content-wrapper {
    margin-left: 1rem;
  }
}
</style>
