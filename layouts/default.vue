<template>
  <div class="min-h-screen h-full font-sourcesans text-gray-800 bg-gray-50">
    <navbar />
    <mobile-categories-menu />
    <div class="min-h-screen h-full">
      <Nuxt />
    </div>
    <footr />
  </div>
</template>

<script>
import Navbar from '@/components/Navigation/Navbar.vue';
import Footr from '@/components/Navigation/Footer.vue';
import MobileCategoriesMenu from '@/components/Navigation/MobileCategoriesMenu.vue';

export default {
  components: {
    Navbar,
    Footr,
    MobileCategoriesMenu
  }
};
</script>
