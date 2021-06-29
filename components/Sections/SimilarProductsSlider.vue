<template>
  <div class="bg-white md:rounded-md shadow overflow-hidden">
    <h2 class="p-4 text-2xl font-semibold uppercase border-b border-gray-100">
      Similar Products
    </h2>
    <div
      v-if="products"
      class="p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-4"
    >
      <product-card
        v-for="(product, index) in products"
        :key="index"
        :product="product"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ProductCard from '../Cards/ProductCard.vue';

export default {
  name: 'SimilarProductsSlider',
  components: {
    ProductCard
  },
  data() {
    return {
      options: {
        perView: 4,
        focusAt: 'center',
        breakpoints: {
          800: {
            perView: 4
          },
          480: {
            perView: 2
          }
        }
      }
    };
  },
  computed: {
    ...mapGetters({
      products: 'products/products'
    })
  },
  created() {
    this.getProducts();
  },
  methods: {
    ...mapActions({
      getProducts: 'products/get'
    })
  }
};
</script>
