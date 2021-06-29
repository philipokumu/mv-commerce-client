<template>
  <button
    class="py-2 px-4 w-full flex items-center justify-center font-semibold text-lg bg-gray-100 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none transition rounded"
  >
    <div class="mr-2 h-10 w-16">
      <mpesa-icon />
    </div>
    <p>Lipa na Mpesa</p>
  </button>
</template>

<script>
import MpesaIcon from '../Icons/MpesaIcon.vue';

export default {
  name: 'MpesaButton',
  components: { MpesaIcon }
};
</script>
