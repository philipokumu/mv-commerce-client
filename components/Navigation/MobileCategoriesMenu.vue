<template>
  <div>
    <overlay :active="menu" />
    <div
      class="fixed top-0 bottom-0 left-0 transform w-56 bg-white transition-all z-10"
      :class="{ '-translate-x-full': !menu, 'translate-x-0 shadow-md': menu }"
      @click.stop=""
    >
      <div
        class="px-4 h-20 sticky top-0 flex items-center justify-between bg-white"
      >
        <logo />
        <button
          class="h-10 w-10 grid place-items-center ring-primary-500 hover:bg-gray-50 focus:bg-gray-50 focus:ring-2 rounded-full transition focus:outline-none"
          @click="closeMenu"
        >
          <div class="h-2/3 w-2/3">
            <close-icon />
          </div>
        </button>
      </div>
      <ul class="relative h-full overflow-hidden">
        <li>
          <p class="py-2 px-4 font-semibold border-b border-gray-100">
            Categories
          </p>
        </li>
        <li v-for="(category, index) in categories" :key="index">
          <button
            class="px-4 h-12 w-full flex items-center justify-between hover:bg-gray-100 focus:bg-gray-100 transition focus:outline-none"
            @click="activeCategory = category.data.attributes.name"
          >
            <span>{{ category.data.attributes.name }}</span>
            <div class="h-6 w-6">
              <chevron-right-icon />
            </div>
          </button>
          <ul
            v-if="category.data.attributes.subCategories.data.length > 0"
            class="absolute top-0 bottom-0 w-full transition-all duration-200 bg-white border-gray-100"
            :class="{
              'left-full': activeCategory !== category.data.attributes.name,
              'left-0': activeCategory === category.data.attributes.name
            }"
          >
            <li class="py-2 px-4 flex items-center border-b">
              <button
                class="mr-2 h-8 w-8 grid place-items-center hover:bg-gray-50 focus:bg-gray-50 rounded-full transition focus:outline-none"
                :class="{}"
                @click="activeCategory = null"
              >
                <div class="h-2/3 w-2/3">
                  <chevron-left-icon />
                </div>
              </button>
              <p class="font-semibold border-gray-100">Sub Categories</p>
            </li>
            <li
              v-for="(subCategory, i) in category.data.attributes.subCategories
                .data"
              :key="i"
            >
              <nuxt-link
                :to="`/categories/${category.data.attributes.slug}/sub-category/${subCategory.data.attributes.slug}`"
                class="px-4 h-12 flex items-center w-full whitespace-nowrap hover:text-primary-500 focus:text-green-500 transition focus:outline-none"
              >
                {{ subCategory.data.attributes.name }}
              </nuxt-link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Logo from '../Icons/Logo.vue';
import Overlay from '../Widgets/Overlay.vue';
import CloseIcon from '../Icons/CloseIcon.vue';
import ChevronRightIcon from '../Icons/ChevronRightIcon.vue';
import ChevronLeftIcon from '../Icons/ChevronLeftIcon.vue';

export default {
  name: 'CategoriesMenu',
  components: {
    Overlay,
    Logo,
    CloseIcon,
    ChevronRightIcon,
    ChevronLeftIcon
  },
  data() {
    return {
      activeCategory: null
    };
  },
  computed: {
    ...mapGetters({
      menu: 'menu',
      categories: 'categories/categories'
    })
  },
  created() {
    this.getCategories();
  },
  methods: {
    ...mapActions({
      closeMenu: 'closeMenu',
      getCategories: 'categories/get'
    })
  }
};
</script>
