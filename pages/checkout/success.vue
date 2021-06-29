<template>
  <div class="h-96 flex items-center justify-center">
    <div>
      <div class="mx-auto mb-4 h-28 w-28 text-green-500 rounded-full">
        <verified-icon />
      </div>
      <p class="text-2xl font-poppins font-semibold text-center">
        Order successfull!
      </p>
      <div class="mt-6 grid grid-cols-2 gap-4">
        <nuxt-link
          to="/"
          class="mx-auto py-2 px-4 block max-w-max font-semibold bg-primary-500 text-white hover:bg-primary-600 focus:bg-primary-600 transition rounded shadow-md focus:outline-none"
        >
          View My Orders
        </nuxt-link>
        <nuxt-link
          to="/"
          class="mx-auto py-2 px-4 block max-w-max font-semibold border-2 border-primary-500 text-green-500 hover:text-white hover:bg-primary-500 focus:text-white focus:bg-primary-500 transition rounded shadow-md focus:outline-none"
        >
          Continue Shopping
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import VerifiedIcon from '@/components/Icons/VerifiedIcon.vue';

export default {
  components: {
    VerifiedIcon
  },
  middleware: 'auth'
};
</script>
