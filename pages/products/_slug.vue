<template>
  <div>
    <div v-if="product" class="container mx-auto md:py-4 md:px-8">
      <div
        class="mb-4 md:grid grid-cols-2 gap-4 bg-white md:rounded-md shadow overflow-hidden"
      >
        <div class="mb-4 md:mb-0">
          <product-view-slider
            :images="product.data.attributes.productImages.data"
          />
        </div>
        <product-view-summary :product="product.data" />
      </div>
      <div class="mb-4">
        <product-view-details :product="product.data" />
      </div>
      <div>
        <similar-products-slider :product="product.data" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ProductViewSlider from '@/components/Sections/ProductViewSlider.vue';
import ProductViewSummary from '@/components/Sections/ProductViewSummary.vue';
import ProductViewDetails from '@/components/Sections/ProductViewDetails.vue';
import SimilarProductsSlider from '@/components/Sections/SimilarProductsSlider.vue';

export default {
  components: {
    ProductViewSlider,
    ProductViewSummary,
    ProductViewDetails,
    SimilarProductsSlider
  },
  computed: {
    ...mapGetters({
      product: 'products/product'
    })
  },
  created() {
    this.closeMenu();
    this.getProduct(this.$route.params.slug);
  },
  methods: {
    ...mapActions({
      closeMenu: 'closeMenu',
      getProduct: 'products/view'
    })
  }
};
</script>
