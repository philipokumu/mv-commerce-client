<template>
  <div class="bg-white shadow rounded-md overflow-hidden">
    <div class="flex items-center overflow-x-auto">
      <nuxt-link
        to="?tab=all"
        class="py-2 px-4 block hover:text-green-500 focus:text-green-500 focus:outline-none"
        :class="{ 'text-green-500 border-b-2 border-green-500': tab === 'all' }"
      >
        All
      </nuxt-link>
      <nuxt-link
        to="?tab=unpaid"
        class="py-2 px-4 block hover:text-green-500 focus:text-green-500 focus:outline-none"
        :class="{
          'text-green-500 border-b-2 border-green-500': tab === 'unpaid'
        }"
      >
        Unpaid
      </nuxt-link>
      <nuxt-link
        to="?tab=paid"
        class="py-2 px-4 block hover:text-green-500 focus:text-green-500 focus:outline-none"
        :class="{
          'text-green-500 border-b-2 border-green-500': tab === 'paid'
        }"
      >
        Paid
      </nuxt-link>
    </div>
    <div>
      <div v-if="busy" class="p-2">
        <spinner color="primary" class="mx-auto" />
      </div>
      <div v-else class="w-full overflow-x-auto">
        <table
          v-if="orders && orders.length > 0"
          class="w-full divide-y divide-gray-100"
        >
          <thead class="bg-gray-50 text-gray-500">
            <tr>
              <th
                scope="col"
                class="px-6 py-3 text-left text-sm font-normal uppercase tracking-wider whitespace-nowrap"
              >
                Order No.
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-sm font-normal uppercase tracking-wider whitespace-nowrap"
              >
                Products
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-sm font-normal uppercase tracking-wider whitespace-nowrap"
              >
                Payment Mode
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-sm font-normal uppercase tracking-wider whitespace-nowrap"
              >
                Status
              </th>
              <th scope="col" class="relative px-6 py-3">
                <span class="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y">
            <tr v-for="(order, index) in orders" :key="index">
              <td class="px-6 py-4 whitespace-nowrap">
                <p>{{ order.data.attributes.order_number }}</p>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <p>{{ order.data.attributes.cartProducts.data.length }}</p>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <p>{{ order.data.attributes.payment_mode }}</p>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <p
                  class="py-1 px-2 w-max text-xs rounded-full"
                  :class="{
                    'text-red-600 bg-red-200':
                      order.data.attributes.status === 'unpaid',
                    'text-green-600 bg-green-200':
                      order.data.attributes.status === 'paid'
                  }"
                >
                  {{ order.data.attributes.status }}
                </p>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-right">
                <nuxt-link
                  :to="`/dashboard/orders/${order.data.order_id}`"
                  class="ml-2 inline-block text-primary-500 hover:text-green-600 focus:text-green-600 outline-none"
                >
                  View
                </nuxt-link>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-else class="p-4">
          <p class="mx-auto text-lg text-center font-semibold">
            You have not made any orders yet.
          </p>
          <nuxt-link
            to="/"
            class="mx-auto py-2 px-4 font-semibold block w-max rounded text-white bg-primary-500 hover:bg-primary-600 focus:bg-primary-600 transition focus:outline-none"
          >
            Start Shopping
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Spinner from '@/components/Widgets/Spinner.vue';

export default {
  components: { Spinner },
  layout: 'dashboard',
  middleware: 'auth',
  data() {
    return {
      orders: []
    };
  },
  computed: {
    ...mapGetters({
      busy: 'orders/busy',
      allOrders: 'orders/orders'
    }),
    tab() {
      if (!this.$route.query.tab) return 'all';
      return this.$route.query.tab;
    }
  },
  watch: {
    tab() {
      this.filterOrders(this.tab);
    }
  },
  created() {
    this.getOrders().then(() => this.filterOrders(this.tab));
  },
  methods: {
    ...mapActions({
      getOrders: 'orders/get'
    }),
    filterOrders(tab) {
      if (!this.allOrders) return;

      let orders = [];

      switch (tab) {
        case 'all':
          orders = this.allOrders;
          break;

        case 'unpaid':
          orders = this.allOrders.filter(
            order => order.data.attributes.status === 'unpaid'
          );
          break;

        case 'paid':
          orders = this.allOrders.filter(
            order => order.data.attributes.status === 'paid'
          );
          break;

        default:
          orders = this.allOrders.filter(
            order => order.data.attributes.status === 'unpaid'
          );
          break;
      }

      return (this.orders = orders);
    }
  }
};
</script>
