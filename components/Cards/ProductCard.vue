<template>
  <article
    class="card block relative max-w-xs w-full bg-white rounded-md shadow md:shadow-none hover:shadow-md focus:shadow-md transition overflow-hidden"
  >
    <nuxt-link
      :to="`/products/${product.data.attributes.slug}`"
      class="focus:outline-none"
    >
      <div class="h-40 overflow-hidden">
        <img
          :src="product.data.attributes.cover_image.data.attributes.path"
          :alt="product.data.attributes.product_name"
          class="h-full w-full object-cover"
        />
      </div>
      <div class="p-4">
        <p class="md:text-lg">{{ product.data.attributes.product_name }}</p>
        <p class="my-1 flex items-center text-gray-400">
          <span
            class="h-3 w-3 block"
            :class="{
              'text-yellow-400':
                product.data.attributes.productReviews.meta.review_average >= 1
            }"
          >
            <star-icon />
          </span>
          <span
            class="h-3 w-3 block"
            :class="{
              'text-yellow-400':
                product.data.attributes.productReviews.meta.review_average >= 2
            }"
          >
            <star-icon />
          </span>
          <span
            class="h-3 w-3 block"
            :class="{
              'text-yellow-400':
                product.data.attributes.productReviews.meta.review_average >= 3
            }"
          >
            <star-icon />
          </span>
          <span
            class="h-3 w-3 block"
            :class="{
              'text-yellow-400':
                product.data.attributes.productReviews.meta.review_average >= 4
            }"
          >
            <star-icon />
          </span>
          <span
            class="h-3 w-3 block"
            :class="{
              'text-yellow-400':
                product.data.attributes.productReviews.meta.review_average >= 5
            }"
          >
            <star-icon />
          </span>
        </p>
        <div>
          <p class="text-primary-500 text-xl">
            {{ product.data.attributes.currency }}
            {{ product.data.attributes.product_price }}
          </p>
          <p v-if="product.data.attributes.discounted_price">
            <span class="text-gray-400 line-through"
              >{{ product.data.attributes.currency }}
              {{ product.attributes.discounted_price }}
            </span>
            <span
              class="ml-1 px-1 text-sm bg-primary-100 text-primary-600 rounded"
            >
              -
              {{
                percentageDiscount(
                  product.data.attributes.discount_percent,
                  product.data.attributes.product_price
                )
              }}%
            </span>
          </p>
        </div>
      </div>
    </nuxt-link>
    <footer class="p-4 sticky top-full">
      <button
        class="add-to-cart py-2 px-4 block font-semibold uppercase w-full lg:opacity-0 lg:invisible text-white bg-primary-500 shadow-md rounded hover:bg-primary-600 focus:bg-primary-600 transition-all focus:outline-none"
        :disabled="busy"
        :class="{ 'pointer-events-none': busy }"
        @click="addToCart(product.data)"
      >
        <div v-if="!busy" class="flex items-center">
          <div class="hidden md:block h-5 w-5">
            <cart-add-icon />
          </div>
          <div class="mx-auto whitespace-nowrap">Add To Cart</div>
        </div>
        <spinner v-if="busy" class="mx-auto" />
      </button>
    </footer>
  </article>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import CartAddIcon from '../Icons/CartAddIcon.vue';
import StarIcon from '../Icons/StarIcon.vue';
import Spinner from '../Widgets/Spinner.vue';

export default {
  name: 'ProductCard',
  components: { StarIcon, CartAddIcon, Spinner },
  props: {
    product: {
      type: Object,
      default: null
    }
  },
  computed: {
    ...mapGetters({
      busy: 'cart/busy'
    })
  },
  methods: {
    ...mapActions({
      saveCart: 'cart/create'
    }),
    addToCart(product) {
      this.saveCart({ product_quantity: 1, ...product });
    },
    percentageDiscount(originalPrice, sellingPrice) {
      const discount = originalPrice - sellingPrice;
      const percentageDiscount = Math.round((discount / originalPrice) * 100);

      return percentageDiscount;
    }
  }
};
</script>

<style lang="scss" scoped>
.card:hover .add-to-cart {
  opacity: 1;
  visibility: visible;
}

.card:focus .add-to-cart {
  opacity: 1;
  visibility: visible;
}
</style>
