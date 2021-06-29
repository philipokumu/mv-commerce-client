<template>
  <div class="font-sourcesans text-gray-800 bg-gray-50">
    <navbar />
    <div class="container mx-auto md:py-4 md:px-8 md:grid grid-cols-12 gap-6">
      <div class="col-span-3">
        <sidebar />
      </div>
      <div class="col-span-9 min-h-screen h-full">
        <Nuxt />
      </div>
    </div>
    <footr />
  </div>
</template>

<script>
import Navbar from '@/components/Navigation/Navbar.vue';
import Footr from '@/components/Navigation/Footer.vue';
import Sidebar from '@/components/Navigation/Sidebar.vue';

export default {
  components: {
    Navbar,
    Footr,
    Sidebar
  }
};
</script>
