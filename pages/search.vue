<template>
  <div class="container mx-auto py-4 px-4 md:px-8">
    <div class="md:bg-white md:shadow md:rounded-md overflow-hidden">
      <div v-if="busy">
        <spinner color="primary" class="mx-auto" />
      </div>
      <div v-else>
        <div
          v-if="products && products.length > 0"
          class="md:p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          <product-card
            v-for="(product, index) in products"
            :key="index"
            :product="product"
          />
        </div>
        <div v-else class="py-4 px-4 md:px-8">
          <p class="mb-2 text-lg text-center font-semibold">
            Sory, No products match your query...
          </p>
          <nuxt-link
            to="/"
            class="mx-auto py-2 px-4 font-semibold block w-max rounded text-white bg-primary-500 hover:bg-primary-600 focus:bg-primary-600 transition focus:outline-none"
          >
            Go Home
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ProductCard from '@/components/Cards/ProductCard.vue';
import Spinner from '@/components/Widgets/Spinner.vue';

export default {
  components: {
    ProductCard,
    Spinner
  },
  computed: {
    ...mapGetters({
      busy: 'search/busy',
      products: 'search/products' // Get products matching the key_name
    })
  },
  created() {
    this.getProducts(this.$route.query.query); // Search key_name first
  },
  methods: {
    ...mapActions({
      getProducts: 'search/get' // Method to fetch matching products from store
    })
  }
};
</script>
