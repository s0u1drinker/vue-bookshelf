<script setup>
import { ref, watch, onMounted, computed } from 'vue'
// Icon
import TheIcon from '@/components/TheIcon.vue'

const props = defineProps({
  slides: {
    type: Array,
    required: true,
  },
  showSlide: {
    type: Number,
    default: 0,
  },
})
const emits = defineEmits(['change-slide'])
// Индекс текущего слайда.
const slideIndexToShow = ref(-1)
/**
 * Перемещение слайдера
 * @param direction String Направление движения.
 */
const moveSlide = (direction) => {
  if (direction === '+') {
    slideIndexToShow.value = (slideIndexToShow.value + 1) % props.slides.length
  } else if (direction === '-') {
    slideIndexToShow.value =
      (slideIndexToShow.value - 1 + props.slides.length) % props.slides.length
  } else {
    console.error('Задано неверное направление для слайдера.')
  }
}
// Наблюдаем за изменением индекса текщего слайда.
watch(slideIndexToShow, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    emits('change-slide', slideIndexToShow.value)
  }
})
// Наблюдаем за изменением в props
watch(props, (newValue) => {
  // Если был добавлен новый элемент в слайдер, то необходимо его отобразить.
  if (newValue.showSlide !== slideIndexToShow.value) {
    slideIndexToShow.value = newValue.showSlide
  }
})
// Путь к картинке с обложкой книги.
const bookCover = computed(() => {
  return props.slides[slideIndexToShow.value]
})
// Смонтировано.
onMounted(() => {
  slideIndexToShow.value = 0
})
</script>

<template>
  <div class="slider">
    <button class="slider__arrow" @click="moveSlide('-')">
      <TheIcon name="ChevronLeft" />
    </button>
    <img class="slider__slide" :src="bookCover" alt="" />
    <button class="slider__arrow" @click="moveSlide('+')">
      <TheIcon name="ChevronRight" />
    </button>
  </div>
</template>

<style scoped>
.slider {
  display: flex;
  align-items: center;

  &:hover {
    .slider__slide {
      box-shadow: var(--shadow-options) var(--white);
    }
  }

  &__arrow {
    background-color: transparent;
    border: 1px solid transparent;
    color: var(--white);
    display: flex;
    margin: 0;
    padding: var(--ident) 0;
    transition: border var(--animation-options);

    &:hover {
      border-color: var(--white);
    }

    & > svg {
      width: 2rem;
    }
  }

  &__slide {
    border: 1px solid var(--white);
    flex: 1;
    margin: var(--ident);
    transition:
      box-shadow var(--animation-options),
      opacity var(--animation-options);
    width: 8rem;
  }
}
</style>
