<template>
  <div class="container mx-auto md:py-4 md:px-8">
    <table-clone v-if="busy" />
    <div v-else>
      <div v-if="items && items.length > 0" class="lg:grid grid-cols-12 gap-6">
        <div class="mb-4 lg:mb-0 col-span-8">
          <div class="w-full bg-white md:rounded-md shadow overflow-x-auto">
            <table
              v-if="items && items.length > 0"
              class="w-full divide-y divide-gray-100"
            >
              <thead class="bg-gray-50 text-gray-500">
                <tr>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-sm font-normal uppercase tracking-wider whitespace-nowrap"
                  >
                    Product
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-sm font-normal uppercase tracking-wider whitespace-nowrap"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-sm font-normal uppercase tracking-wider whitespace-nowrap"
                  >
                    Quantity
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-sm font-normal uppercase tracking-wider whitespace-nowrap"
                  >
                    Sub Total
                  </th>
                  <th scope="col" class="relative px-6 py-3">
                    <span class="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody v-if="$auth.loggedIn" class="bg-white divide-y">
                <tr v-for="(item, index) in items" :key="index">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div
                        class="mr-2 h-12 w-12 flex-shrink-0 rounded overflow-hidden"
                      >
                        <img
                          :src="
                            item.data.attributes.productDetails.data.attributes
                              .cover_image.data.attributes.path
                          "
                          :alt="
                            item.data.attributes.productDetails.data.attributes
                              .product_name
                          "
                          class="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <p class="text-lg">
                          {{
                            item.data.attributes.productDetails.data.attributes
                              .product_name
                          }}
                        </p>
                        <p class="text-sm text-gray-500">Category</p>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <p class="text-lg">
                      {{
                        item.data.attributes.productDetails.data.attributes
                          .currency
                      }}
                      {{
                        item.data.attributes.productDetails.data.attributes
                          .product_price
                      }}
                    </p>
                    <!-- <p>
                      <span class="mr-1 text-sm text-gray-500 line-through">
                        {{
                          item.data.attributes.productDetails.data.attributes
                            .currency
                        }}
                        00
                      </span>
                      <span
                        class="p-1 text-xs text-green-800 bg-green-100 rounded"
                      >
                        -{{
                          percentageDiscount(
                            item.data.attributes.productDetails.data.attributes
                              .product_price,
                            0
                          )
                        }}%
                      </span>
                    </p> -->
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <p>{{ item.data.attributes.quantity }}</p>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <p class="text-xl">
                      {{
                        item.data.attributes.productDetails.data.attributes
                          .currency
                      }}
                      {{
                        item.data.attributes.quantity *
                        item.data.attributes.productDetails.data.attributes
                          .product_price
                      }}
                    </p>
                  </td>
                  <td
                    class="px-6 py-4 whitespace-nowrap text-right font-semibold"
                  >
                    <button
                      to="#"
                      class="ml-2 inline-block text-red-500 hover:text-red-600 focus:text-red-600 focus:outline-none"
                      :disabled="busy"
                      :class="{ 'pointer-events-none': busy }"
                      @click="removeItem(item.data.cartItem_id)"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              </tbody>
              <tbody v-else class="bg-white divide-y">
                <tr v-for="(item, index) in items" :key="index">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div
                        class="mr-2 h-12 w-12 flex-shrink-0 rounded overflow-hidden"
                      >
                        <img
                          :src="
                            item.attributes.cover_image.data.attributes.path
                          "
                          :alt="item.attributes.product_name"
                          class="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <p class="text-lg">
                          {{ item.attributes.product_name }}
                        </p>
                        <p class="text-sm text-gray-500">Category</p>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <p class="text-lg">
                      {{ item.attributes.currency }}
                      {{ item.attributes.product_price }}
                    </p>
                    <!-- <p>
                      <span class="mr-1 text-sm text-gray-500 line-through">
                        {{ item.attributes.currency }}
                        00
                      </span>
                      <span
                        class="p-1 text-xs text-green-800 bg-green-100 rounded"
                      >
                        -{{
                          percentageDiscount(
                            item.attributes.product_price,
                            0
                          )
                        }}%
                      </span>
                    </p> -->
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <p>
                      {{ item.product_quantity }}
                    </p>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <p class="text-xl">
                      {{ item.attributes.currency }}
                      {{
                        item.product_quantity * item.attributes.product_price
                      }}
                    </p>
                  </td>
                  <td
                    class="px-6 py-4 whitespace-nowrap text-right font-semibold"
                  >
                    <button
                      to="#"
                      class="ml-2 inline-block text-red-500 hover:text-red-600 focus:text-red-600 focus:outline-none"
                      :disabled="busy"
                      :class="{ 'pointer-events-none': busy }"
                      @click="removeItem(item.product_id)"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="col-span-4">
          <cart-summary-card :items="items" class="sticky top-24" />
        </div>
      </div>
      <div v-else class="p-4">
        <div class="mx-auto h-24 w-24 grid place-items-center text-gray-400">
          <cart-icon />
        </div>
        <p class="my-4 text-3xl font-poppins font-semibold text-center">
          Your cart is empty
        </p>
        <nuxt-link
          to="/"
          class="mx-auto mt-4 py-3 px-6 block max-w-max font-semibold bg-primary-500 text-white hover:bg-primary-600 focus:bg-primary-600 transition rounded shadow-md focus:outline-none"
        >
          Continue Shopping
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import TableClone from '@/components/Widgets/TableClone.vue';
import CartIcon from '@/components/Icons/CartIcon.vue';
import CartSummaryCard from '@/components/Cards/CartSummaryCard.vue';

export default {
  components: { TableClone, CartIcon, CartSummaryCard },
  computed: {
    ...mapGetters({
      busy: 'cart/busy',
      items: 'cart/items'
    })
  },
  created() {
    this.getItems();
  },
  methods: {
    ...mapActions({
      getItems: 'cart/get',
      removeItem: 'cart/delete'
    }),
    percentageDiscount(originalPrice, sellingPrice) {
      const discount = originalPrice - sellingPrice;
      const percentageDiscount = Math.round((discount / originalPrice) * 100);

      return Math.round(percentageDiscount);
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  min-height: calc(100vh - 20rem);
}
</style>
