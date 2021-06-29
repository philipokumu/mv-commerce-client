<template>
  <nav>
    <div class="container mx-auto py-4 px-8 flex items-center justify-center">
      <nuxt-link to="/">
        <logo />
      </nuxt-link>
    </div>
  </nav>
</template>

<script>
import Logo from '../Icons/Logo.vue';

export default {
  name: 'AuthNavbar',
  components: { Logo }
};
</script>
