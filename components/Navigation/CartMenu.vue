<template>
  <div class="relative">
    <nuxt-link
      to="/cart"
      class="ml-2 h-10 w-10 grid place-items-center md:hidden ring-primary-500 hover:bg-gray-50 focus:bg-gray-50 focus:ring-2 rounded-full transition focus:outline-none"
    >
      <div class="h-2/3 w-2/3 relative">
        <div
          v-if="items && items.length > 0"
          class="h-4 w-4 absolute -top-1 -left-1 text-white bg-red-500 rounded-full"
        >
          <p class="text-sm leading-4 text-center">{{ items.length }}</p>
        </div>
        <cart-icon />
      </div>
    </nuxt-link>
    <div class="hidden md:block">
      <button
        class="ml-2 h-10 px-4 flex items-center ring-primary-500 hover:bg-gray-50 focus:bg-gray-50 rounded focus:ring-2 transition focus:outline-none"
        @click.stop="toggleMenu"
      >
        <div class="mr-2 h-6 w-6 relative">
          <div
            v-if="items && items.length > 0"
            class="h-4 w-4 absolute -top-1 -left-1 text-white bg-red-500 rounded-full"
          >
            <p class="text-sm leading-4 text-center">{{ items.length }}</p>
          </div>
          <cart-icon />
        </div>
        <span class="whitespace-nowrap">Cart</span>
      </button>
      <div
        class="cart w-80 absolute top-full right-0 transform translate-y-2 origin-top-right transition-all bg-white shadow-md rounded-md overflow-hidden"
        :class="{
          'scale-50 opacity-0 invisible': !open,
          'scale-100 opacity-100 visible': open
        }"
      >
        <div v-if="busy" class="p-4">
          <spinner color="primary" class="mx-auto" />
        </div>
        <div v-else>
          <div v-if="items && items.length > 0">
            <div class="py-2 px-4 max-h-72 overflow-y-auto">
              <product-mini-card
                v-for="(item, index) in items"
                :key="index"
                :item="item"
                class="mb-3"
              />
            </div>
            <div
              class="p-4 sticky top-full bg-white border-t border-gray-100 z-10"
            >
              <div class="mb-2 flex items-center justify-between text-2xl">
                <p>Total</p>
                <p class="font-semibold">KSH {{ total }}</p>
              </div>
              <nuxt-link
                to="/cart"
                class="py-2 px-4 block w-full text-center text-lg font-semibold uppercase text-white bg-primary-500 hover:bg-primary-600 focus:bg-primary-600 transition rounded shadow-md focus:outline-none"
              >
                View Cart
              </nuxt-link>
            </div>
          </div>
          <div v-else class="p-4">
            <div class="mx-auto mb-4 h-20 w-20 text-gray-400">
              <cart-icon />
            </div>
            <p class="text-xl font-poppins font-semibold text-center">
              Your cart is empty
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ProductMiniCard from '../Cards/ProductMiniCard.vue';
import CartIcon from '../Icons/CartIcon.vue';
import Spinner from '../Widgets/Spinner.vue';

export default {
  name: 'CartMenu',
  components: { CartIcon, ProductMiniCard, Spinner },
  data() {
    return {
      open: false,
      total: null
    };
  },
  computed: {
    ...mapGetters({
      busy: 'cart/busy',
      items: 'cart/items'
    })
  },
  watch: {
    items() {
      this.calculateTotal();
    }
  },
  created() {
    this.getItems().then(() => this.calculateTotal());
  },
  methods: {
    ...mapActions({
      getItems: 'cart/get'
    }),
    toggleMenu() {
      this.open = !this.open;

      window.onclick = () => {
        this.open = false;
      };
    },
    calculateTotal() {
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

      const total = this.items.reduce(reducer, 0);

      this.total = total;
    }
  }
};
</script>

<style scoped>
div::-webkit-scrollbar {
  height: 0.5rem;
  width: 0.5rem;
  background: transparent;
}

div::-webkit-scrollbar-thumb {
  border-radius: 25px;
  background: rgba(0, 0, 0, 0.2);
}

div::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.3);
}
</style>
