<template>
  <header>
    <div class="shadow overflow-hidden">
      <carousel :options="options">
        <li
          v-for="(image, index) in images"
          :key="index"
          class="glide__slide relative"
        >
          <div class="banner w-full focus:outline-none">
            <img
              :src="image"
              alt="Banner"
              loading="lazy"
              class="h-full w-full object-cover"
            />
          </div>
          <div
            class="absolute left-1/2 bottom-10 transform -translate-x-1/2 z-10"
          >
            <nuxt-link
              to="/products"
              class="w-36 h-14 flex items-center justify-center uppercase text-lg font-semibold text-white bg-primary-500 shadow-md rounded hover:bg-primary-600 focus:bg-primary-600 transition focus:outline-none"
            >
              Shop now
            </nuxt-link>
          </div>
        </li>
      </carousel>
    </div>
  </header>
</template>

<script>
import Carousel from '../Widgets/Carousel.vue';

export default {
  name: 'Headr',
  components: { Carousel },
  data() {
    return {
      options: {
        autoplay: 3000
      },
      images: [
        'https://morecustomersapp.com/wp-content/uploads/2020/08/banner-and-eCommerce.jpg',
        'http://bangaknitwear.com/assets/data/option14/Banga-knitwear-Home-Banner-4.jpg',
        'https://www.goingit.com.au/blog/wp-content/uploads/2015/11/amazing-banner-1200x565.jpg'
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.banner {
  height: 50vh;
}

@media screen and (min-width: 768px) {
  .banner {
    height: 70vh;
  }
}
</style>
