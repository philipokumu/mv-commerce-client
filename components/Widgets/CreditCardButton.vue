<template>
  <button
    class="py-2 px-4 w-full font-semibold text-lg flex items-center justify-center text-white bg-blue-500 hover:bg-blue-600 focus:bg-blue-600 focus:outline-none transition rounded"
  >
    <div class="mr-2 h-8 w-8">
      <credit-card-icon />
    </div>
    <p>Credit Card</p>
  </button>
</template>

<script>
import CreditCardIcon from '../Icons/CreditCardIcon.vue';

export default {
  name: 'DebitCardButton',
  components: { CreditCardIcon }
};
</script>
