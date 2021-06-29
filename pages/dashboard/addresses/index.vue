<template>
  <div class="py-4 px-4 md:px-8 bg-white shadow rounded-md overflow-hidden">
    <div v-if="busy">
      <spinner color="primary" class="mx-auto" />
    </div>
    <div v-else>
      <div v-if="addresses && addresses.length > 0">
        <nuxt-link
          v-if="addresses.length < 3"
          to="/dashboard/addresses/new"
          class="mb-4 ml-auto py-2 px-4 font-semibold block w-max rounded text-white bg-primary-500 hover:bg-primary-600 focus:bg-primary-600 transition focus:outline-none"
        >
          Add New
        </nuxt-link>
        <div
          v-for="(address, index) in addresses"
          :key="index"
          class="mb-2 p-4 flex items-center justify-between border border-gray-100 rounded"
        >
          <div>
            <p class="text-lg font-semibold">
              {{ address.data.attributes.country }} -
              {{ address.data.attributes.location }}
            </p>
            <p class="text-sm">{{ address.data.attributes.contact }}</p>
          </div>
          <div class="flex items-center">
            <nuxt-link
              :to="`/dashboard/addresses/${address.data.shipping_details_id}/edit`"
              class="h-8 w-8 grid place-items-center rounded-full ring-blue-500 hover:bg-gray-50 focus:ring-2 focus:bg-gray-50 transition focus:outline-none"
            >
              <div class="h-2/3 w-2/3">
                <edit-icon />
              </div>
            </nuxt-link>
            <button
              class="h-8 w-8 grid place-items-center rounded-full ring-red-500 hover:bg-gray-50 focus:ring-2 focus:bg-gray-50 transition focus:outline-none"
              @click="deleteAddress(address.data.shipping_details_id)"
            >
              <div class="h-2/3 w-2/3">
                <delete-icon />
              </div>
            </button>
          </div>
        </div>
      </div>
      <div v-else>
        <p class="mb-2 text-lg text-center font-semibold">
          You have no addresses yet.
        </p>
        <button
          class="mx-auto py-2 px-4 font-semibold block rounded text-white bg-primary-500 hover:bg-primary-600 focus:bg-primary-600 transition focus:outline-none"
        >
          Add One
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import DeleteIcon from '@/components/Icons/DeleteIcon.vue';
import Spinner from '@/components/Widgets/Spinner.vue';
import EditIcon from '@/components/Icons/EditIcon.vue';

export default {
  components: { DeleteIcon, Spinner, EditIcon },
  layout: 'dashboard',
  middleware: 'auth',
  computed: {
    ...mapGetters({
      busy: 'addresses/busy',
      addresses: 'addresses/addresses'
    })
  },
  created() {
    this.getAddresses();
  },
  methods: {
    ...mapActions({
      getAddresses: 'addresses/get',
      deleteAddress: 'addresses/delete'
    })
  }
};
</script>
