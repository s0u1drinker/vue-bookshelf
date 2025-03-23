<script setup>
// Constants
import { months } from '@/helpers/constants'

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
})
</script>

<template>
  <div class="chart-svg">
    <div class="chart-svg__legend">
      <slot name="legend"></slot>
    </div>
    <svg class="chart-svg__svg" width="500" height="315">
      <line class="chart-svg__y-axis" x1="79" y1="0" x2="79" y2="315" />

      <g class="chart-svg__group" v-for="(item, index) in months" :key="index">
        <text text-anchor="end" x="70" :y="25 + 25 * index">
          {{ item.label }}
        </text>
        <g v-if="props.data[index].read">
          <rect
            class="chart-svg__rect chart-svg__rect_read"
            x="80"
            :y="10 + 25 * index"
            :width="70 * props.data[index].read"
            height="20"
          />
          <text class="chart-svg__rect-value" x="85" :y="25 + 25 * index">
            {{ props.data[index].read }}
          </text>
        </g>
        <g v-if="props.data[index].audio">
          <rect
            class="chart-svg__rect chart-svg__rect_audio"
            :x="80 + 70 * props.data[index].read"
            :y="10 + 25 * index"
            width="70"
            height="20"
          />
          <text
            class="chart-svg__rect-value"
            :x="85 + 70 * props.data[index].read"
            :y="25 + 25 * index"
          >
            {{ props.data[index].audio }}
          </text>
        </g>
      </g>
    </svg>
  </div>
</template>

<style>
.chart-svg {
  --read: #0069d9;
  --audio: #c82333;

  margin-top: var(--ident);

  &__legend {
    display: flex;
    gap: var(--ident);
    margin-bottom: var(--ident);

    &-block {
      color: white;
      padding: var(--ident-quarter);

      &_read {
        background-color: var(--read);
      }

      &_audio {
        background-color: var(--audio);
      }
    }
  }

  &__y-axis {
    stroke: black;
    stroke-width: 2px;
  }

  &__rect {
    &_read {
      fill: var(--read);
    }

    &_audio {
      fill: var(--audio);
    }

    &-value {
      fill: white;
    }
  }
}
</style>
