<template>
  <div v-if="category">
    <div class="container mx-auto py-4 px-4 md:px-8">
      <div v-if="busy">
        <spinner color="primary" class="mx-auto" />
      </div>
      <div v-else>
        <div
          v-if="category.data.attributes.subCategories.data.length > 0"
          class="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4"
        >
          <nuxt-link
            v-for="(subCategory, index) in category.data.attributes
              .subCategories.data"
            :key="index"
            :to="`/categories/${$route.params.slug}/sub-category/${subCategory.data.attributes.slug}`"
            class="bg-white shadow rounded hover:shadow-md transition overflow-hidden"
          >
            <div class="mr-2 h-24 w-full">
              <img
                :src="
                  subCategory.data.attributes.subCategoryImage.data.attributes
                    .path
                "
                :alt="subCategory.data.attributes.name"
                class="h-full w-full object-cover"
              />
            </div>
            <p class="p-4 text-lg">
              {{ subCategory.data.attributes.name }}
            </p>
          </nuxt-link>
        </div>
        <div v-else>
          <p class="text-center">This category doesn't have anything yet.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Spinner from '@/components/Widgets/Spinner.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  components: { Spinner },
  computed: {
    ...mapGetters({
      busy: 'categories/busy',
      category: 'categories/category'
    })
  },
  created() {
    this.closeMenu();
    this.getCategory(this.$route.params.slug);
  },
  methods: {
    ...mapActions({
      closeMenu: 'closeMenu',
      getCategory: 'categories/view'
    })
  }
};
</script>
