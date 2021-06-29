<template>
  <div class="relative">
    <button
      class="category-menu-toggle h-10 w-10 grid place-items-center ring-primary-500 hover:bg-gray-50 focus:bg-gray-50 focus:ring-2 rounded-full transition focus:outline-none"
    >
      <div class="h-2/3 w-2/3">
        <menu-icon />
      </div>
    </button>
    <menu
      class="category-menu m-0 p-0 absolute top-full left-0 transform translate-y-5 scale-50 opacity-0 invisible origin-top-left transition-all bg-white shadow-md"
    >
      <ul>
        <li v-for="(category, index) in categories" :key="index">
          <nuxt-link
            :to="`/categories/${category.data.attributes.slug}`"
            class="category-link p-3 block whitespace-nowrap hover:bg-primary-500 hover:text-white focus:bg-green-500 focus:text-white transition focus:outline-none"
          >
            {{ category.data.attributes.name }}
          </nuxt-link>
          <ul
            v-if="category.data.attributes.subCategories.data.length > 0"
            class="sub-category-menu hidden absolute top-0 left-full bottom-0 max-w-xl w-full bg-white border-l border-gray-100"
          >
            <li
              v-for="(subCategory, i) in category.data.attributes.subCategories
                .data"
              :key="i"
            >
              <nuxt-link
                :to="`/categories/${category.data.attributes.slug}/sub-category/${subCategory.data.attributes.slug}`"
                class="p-3 block whitespace-nowrap hover:text-primary-500 focus:text-green-500 transition focus:outline-none"
              >
                {{ subCategory.data.attributes.name }}
              </nuxt-link>
            </li>
          </ul>
        </li>
      </ul>
    </menu>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import MenuIcon from '../Icons/MenuIcon.vue';

export default {
  name: 'CategoriesMenu',
  components: { MenuIcon },
  computed: {
    ...mapGetters({
      categories: 'categories/categories'
    })
  },
  created() {
    this.getCategories();
  },
  methods: {
    ...mapActions({
      getCategories: 'categories/get'
    })
  }
};
</script>

<style lang="scss" scoped>
.category-menu-toggle {
  &:hover + .category-menu,
  &:focus + .category-menu {
    transform: translateY(1.25rem) scale(1);
    opacity: 1;
    visibility: visible;
  }
}

.category-menu {
  &:hover,
  &:focus-within {
    transform: translateY(1.25rem) scale(1);
    opacity: 1;
    visibility: visible;
  }
}

.category-link {
  &:hover ~ .sub-category-menu,
  &:focus ~ .sub-category-menu {
    display: block;
  }
}

.sub-category-menu {
  &:hover,
  &:focus-within {
    display: block;
  }
}
</style>
