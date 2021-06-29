<template>
  <div class="glide">
    <div class="glide__track" data-glide-el="track">
      <ul class="glide__slides">
        <slot />
      </ul>
    </div>

    <div class="glide__arrows" data-glide-el="controls">
      <button
        class="glide__arrow glide__arrow--left absolute left-4 top-1/2 transform -translate-y-1/2 h-10 w-10 grid place-items-center rounded-full shadow-md bg-white text-gray-500 ring-green-600 hover:bg-gray-50 focus:bg-gray-50 focus:ring-2 transition focus:outline-none"
        data-glide-dir="<"
      >
        <div class="h-2/3 w-2/3">
          <chevron-left-icon />
        </div>
      </button>
      <button
        class="glide__arrow glide__arrow--right absolute right-4 top-1/2 transform -translate-y-1/2 h-10 w-10 grid place-items-center rounded-full shadow-md bg-white text-gray-500 ring-green-600 hover:bg-gray-50 focus:bg-gray-50 focus:ring-2 transition focus:outline-none"
        data-glide-dir=">"
      >
        <div class="h-2/3 w-2/3">
          <chevron-right-icon />
        </div>
      </button>
    </div>
  </div>
</template>

<script>
import Glide from '@glidejs/glide';
import ChevronLeftIcon from '../Icons/ChevronLeftIcon.vue';
import ChevronRightIcon from '../Icons/ChevronRightIcon.vue';

export default {
  name: 'Carousel',
  components: { ChevronLeftIcon, ChevronRightIcon },
  props: {
    options: {
      type: Object,
      default: null
    }
  },
  mounted() {
    this.initGlide();
  },
  methods: {
    initGlide() {
      new Glide('.glide', { type: 'carousel', ...this.options }).mount();
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'node_modules/@glidejs/glide/src/assets/sass/glide.core';
</style>
