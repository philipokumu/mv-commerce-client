<template>
  <div v-if="category">
    <div class="container mx-auto py-4 px-4 md:px-8">
      <div class="md:bg-white md:shadow md:rounded-md overflow-hidden">
        <div
          class="md:p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          <product-card
            v-for="(product, index) in category.data.attributes.productDetails
              .data"
            :key="index"
            :product="product"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ProductCard from '@/components/Cards/ProductCard.vue';

export default {
  components: { ProductCard },
  computed: {
    ...mapGetters({
      category: 'subCategories/category'
    })
  },
  created() {
    this.closeMenu();
    this.getCategory({
      categorySlug: this.$route.params.slug,
      subCategorySlug: this.$route.params.subCategorySlug
    });
  },
  methods: {
    ...mapActions({
      closeMenu: 'closeMenu',
      getCategory: 'subCategories/view'
    })
  }
};
</script>
