<script setup>
import { ref, watch, onMounted, computed } from 'vue'
// Helper
import { getCoverPath } from '@/helpers/functions'
// Icon
import TheIcon from './TheIcon.vue'

const props = defineProps({
  slides: {
    type: Array,
    required: true,
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
    console.error('Wrong direction to move slider.')
  }
}
// Наблюдаем за изменением индекса текщего слайда.
watch(slideIndexToShow, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    emits('change-slide', slideIndexToShow.value)
  }
})
// Путь к картинке с обложкой книги.
const bookCover = computed(() => {
  return getCoverPath(props.slides[slideIndexToShow.value])
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
