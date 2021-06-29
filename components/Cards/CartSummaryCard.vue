<template>
  <div
    class="py-4 px-4 border-t-4 border-primary-500 bg-white md:rounded-md md:shadow overflow-hidden"
  >
    <div class="mb-2 flex items-center justify-between">
      <p class="text-lg">Subtotal:</p>
      <p class="text-lg">KSH {{ subtotal }}</p>
    </div>
    <hr class="my-2 border-gray-100" />
    <p class="text-sm text-gray-500">Delivery fee not included yet.</p>
    <nuxt-link
      to="/checkout"
      class="mt-6 py-2 px-4 block w-full text-center text-lg font-semibold text-white bg-primary-500 hover:bg-primary-600 focus:bg-primary-600 transition rounded shadow-md focus:outline-none"
    >
      CHECKOUT
    </nuxt-link>
    <div class="mt-2 flex items-center justify-center text-green-500">
      <div class="mr-1 h-4 w-4">
        <padlock-icon />
      </div>
      <p class="text-sm">Secure checkout.</p>
    </div>
  </div>
</template>

<script>
import PadlockIcon from '../Icons/PadlockIcon.vue';

export default {
  name: 'CartSummaryCard',
  components: { PadlockIcon },
  props: {
    items: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      subtotal: null
    };
  },
  watch: {
    items: {
      immediate: true,
      handler() {
        this.calculateSubtotal();
      }
    }
  },
  methods: {
    calculateSubtotal() {
      let reducer;

      if (!this.$auth.loggedIn) {
        reducer = (accumulator, currentValue) =>
          accumulator +
          currentValue.product_quantity * currentValue.attributes.product_price;
      } else {
        reducer = (accumulator, currentValue) =>
          accumulator +
          currentValue.data.attributes.quantity *
            currentValue.data.attributes.productDetails.data.attributes
              .product_price;
      }

      const subtotal = this.items.reduce(reducer, 0);

      this.subtotal = subtotal;
    }
  }
};
</script>
