<template>
  <div>
    <headr />
    <section>
      <div class="container mx-auto py-4 px-4 md:px-8">
        <div class="md:bg-white md:rounded-md md:shadow md:overflow-hidden">
          <h2
            class="mb-2 py-2 md:px-4 text-2xl font-semibold uppercase border-b border-gray-100"
          >
            Latest Products
          </h2>
          <div
            v-if="products"
            class="md:p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-4"
          >
            <product-card
              v-for="(product, index) in products"
              :key="index"
              :product="product"
            />
          </div>
        </div>
      </div>
    </section>
    <offer-banner />
    <section>
      <div class="container mx-auto py-4 px-4 md:px-8">
        <div class="md:bg-white md:rounded-md md:shadow md:overflow-hidden">
          <h2
            class="mb-2 py-2 md:px-4 text-2xl font-semibold uppercase border-b border-gray-100"
          >
            Popular Products
          </h2>
          <div
            v-if="products"
            class="md:p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-4"
          >
            <product-card
              v-for="(product, index) in products"
              :key="index"
              :product="product"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Headr from '@/components/Sections/Header.vue';
import OfferBanner from '@/components/Sections/OfferBanner.vue';
import ProductCard from '@/components/Cards/ProductCard.vue';

export default {
  components: {
    Headr,
    OfferBanner,
    ProductCard
  },
  computed: {
    ...mapGetters({
      products: 'products/products'
    })
  },
  created() {
    this.closeMenu();
    this.getProducts();
  },
  methods: {
    ...mapActions({
      closeMenu: 'closeMenu',
      getProducts: 'products/get'
    })
  }
};
</script>
