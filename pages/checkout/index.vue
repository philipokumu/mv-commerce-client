<template>
  <div class="container mx-auto md:py-4 md:px-8">
    <div v-if="items && items.length > 0" class="lg:grid grid-cols-12 gap-6">
      <div
        class="mb-4 p-4 relative lg:mb-0 col-span-8 bg-white md:rounded-md shadow overflow-hidden"
      >
        <div class="mb-2 py-2 flex items-center text-lg overflow-x-auto">
          <p
            class="whitespace-nowrap"
            :class="{ 'font-semibold text-green-500': step === 1 }"
          >
            Delivery Method
          </p>
          <span class="mx-2">&rsaquo;</span>
          <p
            class="whitespace-nowrap"
            :class="{ 'font-semibold text-green-500': step === 2 }"
          >
            Delivery Address
          </p>
          <span class="mx-2">&rsaquo;</span>
          <p
            class="whitespace-nowrap"
            :class="{ 'font-semibold text-green-500': step === 3 }"
          >
            Summary
          </p>
        </div>
        <div :class="{ hidden: step !== 1 }">
          <label
            for="homeOffice"
            class="mb-4 p-4 block border border-gray-100 rounded"
            :class="{
              'bg-green-200 ring-2 ring-green-500':
                order.delivery_method === 'Home or Office'
            }"
          >
            <input
              id="homeOffice"
              v-model="order.delivery_method"
              type="radio"
              value="Home or Office"
              class="hidden"
            />
            <p class="text-lg font-semibold">Home or Office</p>
          </label>
          <label
            for="pickUpStation"
            class="p-4 block border border-gray-100 rounded"
            :class="{
              'bg-green-200 ring-2 ring-green-500':
                order.delivery_method === 'Pick up station'
            }"
          >
            <input
              id="pickUpStation"
              v-model="order.delivery_method"
              type="radio"
              value="Pick up station"
              class="hidden"
            />
            <p class="text-lg font-semibold">Pick up station</p>
          </label>
        </div>
        <div v-if="order.delivery_method" :class="{ hidden: step !== 2 }">
          <nuxt-link
            to="/dashboard/addresses"
            class="mb-4 ml-auto py-2 px-4 font-semibold block w-max rounded text-white bg-gray-500 hover:bg-gray-600 focus:bg-gray-600 transition focus:outline-none"
          >
            Manage My Addresses
          </nuxt-link>
          <div v-if="addresses.length > 0">
            <label
              v-for="(address, index) in addresses"
              :key="index"
              :for="`address-${index + 1}`"
              class="mb-4 p-4 block border border-gray-100 rounded"
              :class="{
                'bg-green-200 ring-2 ring-green-500':
                  order.shipping_id === address.data.shipping_details_id
              }"
            >
              <div>
                <input
                  :id="`address-${index + 1}`"
                  v-model="order.shipping_id"
                  name="address"
                  type="radio"
                  class="hidden"
                  :value="address.data.shipping_details_id"
                />
              </div>
              <div>
                <p class="text-lg font-semibold">
                  {{ address.data.attributes.country }} -
                  {{ address.data.attributes.location }}
                </p>
                <p class="text-sm">{{ address.data.attributes.contact }}</p>
              </div>
            </label>
          </div>
          <div v-else>
            <form autocomplete="off" @submit.prevent="">
              <div class="md:grid grid-cols-2 gap-4">
                <div class="mb-4">
                  <label for="firstName" class="block leading-8"
                    >First Name</label
                  >
                  <input
                    id="firstName"
                    type="text"
                    class="py-3 px-6 block w-full ring-primary-500 focus:ring-2 transition rounded border outline-none"
                  />
                </div>
                <div class="mb-4">
                  <label for="lastName" class="block leading-8"
                    >Last Name</label
                  >
                  <input
                    id="lastName"
                    type="text"
                    class="py-3 px-6 block w-full ring-primary-500 focus:ring-2 transition rounded border outline-none"
                  />
                </div>
              </div>
              <div class="mb-4">
                <label for="email" class="block leading-8">Email</label>
                <input
                  id="email"
                  type="email"
                  class="py-3 px-6 block w-full ring-primary-500 focus:ring-2 transition rounded border outline-none"
                />
              </div>
              <div class="mb-4">
                <label for="phoneNumber" class="block leading-8"
                  >Phone Number</label
                >
                <input
                  id="phoneNumber"
                  type="number"
                  class="py-3 px-6 block w-full ring-primary-500 focus:ring-2 transition rounded border outline-none"
                />
              </div>
              <div class="mb-4">
                <label for="location" class="block leading-8">Location</label>
                <input
                  id="location"
                  type="text"
                  class="py-3 px-6 block w-full ring-primary-500 focus:ring-2 transition rounded border outline-none"
                />
              </div>
            </form>
          </div>
        </div>
        <div v-if="order.shipping_id" :class="{ hidden: step !== 3 }">
          <div class="mb-4">
            <h2
              class="mb-2 py-1 text-xl font-semibold border-b border-gray-100"
            >
              Delivery Method
            </h2>
            <p>{{ order.delivery_method }}</p>
          </div>
          <div class="mb-4">
            <h2
              class="mb-2 py-1 text-xl font-semibold border-b border-gray-100"
            >
              Delivery Address
            </h2>
            <p class="text-lg">
              {{ deliveryAddress.country }} - {{ deliveryAddress.location }}
            </p>
            <p>{{ deliveryAddress.contact }}</p>
          </div>
        </div>
        <div class="mt-6 flex items-center justify-between sticky top-full">
          <button
            type="submit"
            class="py-3 px-6 block text-white transition rounded shadow-md focus:outline-none"
            :class="{
              'bg-primary-500 hover:bg-primary-600 focus:bg-primary-600':
                step > 1,
              'bg-gray-500 pointer-events-none': step === 1
            }"
            :disabled="step === 1"
            @click="step--"
          >
            &lsaquo; Prev
          </button>
          <button
            type="submit"
            class="py-3 px-6 block text-white transition rounded shadow-md focus:outline-none"
            :class="{
              'bg-primary-500 hover:bg-primary-600 focus:bg-primary-600':
                step < 3,
              'bg-gray-500 pointer-events-none': step === 3
            }"
            :disabled="step === 3"
            @click="step++"
          >
            Next &rsaquo;
          </button>
        </div>
      </div>
      <div class="col-span-4">
        <checkout-summary-card
          :items="items"
          :complete="step === 3"
          :order="order"
          class="sticky top-24"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import CheckoutSummaryCard from '@/components/Cards/CheckoutSummaryCard.vue';

export default {
  components: { CheckoutSummaryCard },
  middleware: 'auth',
  data() {
    return {
      step: 1,
      addresses: this.$auth.user.attributes.shippingInfo.data,
      order: {
        delivery_method: null,
        shipping_id: null
      }
    };
  },
  computed: {
    ...mapGetters({
      items: 'cart/items'
    }),
    deliveryAddress() {
      let address;

      if (this.order.shipping_id) {
        address = this.addresses.find(
          address => address.data.shipping_details_id === this.order.shipping_id
        );
        address = address.data.attributes;
      }

      return address;
    }
  },
  created() {
    this.getItems();
  },
  methods: {
    ...mapActions({
      getItems: 'cart/get'
    })
  }
};
</script>
