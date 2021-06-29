<template>
  <div class="py-4 px-4 md:px-8 bg-white shadow rounded-md overflow-hidden">
    <form autocomplete="off" @submit.prevent="submitForm">
      <div class="mb-4">
        <label for="country" class="block leading-8">Country</label>
        <input
          id="country"
          v-model="data.country"
          type="text"
          placeholder="eg Kenya"
          class="py-3 px-6 block w-full ring-primary-500 focus:ring-2 transition rounded border outline-none"
          required
        />
      </div>
      <div class="mb-4">
        <label for="contact" class="block leading-8">Contact</label>
        <input
          id="contact"
          v-model="data.contact"
          type="number"
          placeholder="eg 254712345678"
          class="py-3 px-6 block w-full ring-primary-500 focus:ring-2 transition rounded border outline-none"
          required
        />
      </div>
      <div class="mb-4">
        <label for="location" class="block leading-8">Location</label>
        <textarea
          id="location"
          v-model="data.location"
          rows="2"
          placeholder="eg Nairobi, Kenya"
          class="py-3 px-6 block w-full ring-primary-500 focus:ring-2 transition rounded border outline-none"
          required
        ></textarea>
      </div>
      <button
        type="submit"
        class="mt-6 ml-auto py-3 px-6 block text-white bg-primary-500 hover:bg-primary-600 focus:bg-primary-600 transition rounded shadow-md focus:outline-none"
        :disabled="busy"
        :class="{ 'pointer-events-none': busy }"
      >
        <span v-if="!busy"> Save Address </span>
        <spinner v-else class="mx-auto" />
      </button>
    </form>
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
      data: {
        country: null,
        contact: null,
        location: null
      }
    };
  },
  computed: {
    ...mapGetters({
      busy: 'addresses/busy'
    })
  },
  methods: {
    ...mapActions({
      saveAddress: 'addresses/create'
    }),
    submitForm() {
      this.saveAddress(this.data).then(() => this.listenChanges());
    }
  }
};
</script>
