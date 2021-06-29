<template>
  <section class="p-4">
    <carousel class="rounded-md overflow-hidden">
      <li v-for="(image, index) in images" :key="index" class="glide__slide">
        <div class="h-80 md:h-96 focus:outline-none">
          <img
            :src="image.data.attributes.path"
            alt="Image"
            loading="lazy"
            class="h-full w-full object-cover"
          />
        </div>
      </li>
    </carousel>
  </section>
</template>

<script>
import Carousel from '../Widgets/Carousel.vue';

export default {
  name: 'ProductViewSlider',
  components: { Carousel },
  props: {
    images: {
      type: Array,
      default: null
    }
  }
};
</script>
