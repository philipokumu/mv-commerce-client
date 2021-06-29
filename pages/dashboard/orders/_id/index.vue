<template>
  <div class="bg-white shadow rounded-md overflow-hidden">
    <div v-if="busy" class="p-2">
      <spinner color="primary" class="mx-auto" />
    </div>
    <div v-else>
      <div v-if="order">
        <div class="py-4 px-4 md:px-8 flex items-center">
          <back-button />
          <p class="mx-2 text-lg font-semibold">
            Order {{ order.data.attributes.order_number }}
          </p>
          <p
            class="py-1 px-2 text-xs rounded-full"
            :class="{
              'text-red-600 bg-red-200':
                order.data.attributes.status === 'unpaid',
              'text-green-600 bg-green-200':
                order.data.attributes.status === 'paid'
            }"
          >
            {{ order.data.attributes.status }}
          </p>
        </div>
        <div class="py-2 px-4 md:px-8">
          <p class="py-2 text-lg font-semibold border-b">Products</p>
          <div class="w-full overflow-x-auto">
            <table class="w-full divide-y divide-gray-100">
              <thead class="bg-gray-100 text-gray-500">
                <tr>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-sm font-normal uppercase tracking-wider whitespace-nowrap"
                  >
                    Product Name
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
                    Total Price
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y">
                <tr
                  v-for="(product, index) in order.data.attributes.cartProducts
                    .data"
                  :key="index"
                >
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="mr-2 h-10 w-10 rounded overflow-hidden">
                        <img
                          :src="
                            product.data.attributes.productDetails.data
                              .attributes.cover_image.data.attributes.path
                          "
                          :alt="
                            product.data.attributes.productDetails.data
                              .attributes.preserve_name
                          "
                          class="h-full w-full object-cover"
                        />
                      </div>
                      <p>
                        {{
                          product.data.attributes.productDetails.data.attributes
                            .preserve_name
                        }}
                      </p>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <p>
                      {{
                        product.data.attributes.productDetails.data.attributes
                          .currency
                      }}
                      {{
                        product.data.attributes.productDetails.data.attributes
                          .product_price
                      }}
                    </p>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <p>
                      {{ product.data.attributes.quantity }}
                    </p>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <p>
                      {{ product.data.attributes.currency }}
                      {{ product.data.attributes.total_price }}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import BackButton from '@/components/Widgets/BackButton.vue';
import Spinner from '@/components/Widgets/Spinner.vue';

export default {
  components: { BackButton, Spinner },
  layout: 'dashboard',
  middleware: 'auth',
  computed: {
    ...mapGetters({
      busy: 'orders/busy',
      order: 'orders/order'
    })
  },
  created() {
    this.getOrder(this.$route.params.id);
  },
  methods: {
    ...mapActions({
      getOrder: 'orders/view'
    })
  }
};
</script>
