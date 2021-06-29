<template>
  <div
    class="font-sourcesans text-gray-800 min-h-screen h-full flex flex-col justify-between"
  >
    <auth-navbar />
    <Nuxt />
    <auth-footer />
  </div>
</template>

<script>
import AuthNavbar from '@/components/Navigation/AuthNavbar.vue';
import AuthFooter from '@/components/Navigation/AuthFooter.vue';

export default {
  components: { AuthNavbar, AuthFooter }
};
</script>
