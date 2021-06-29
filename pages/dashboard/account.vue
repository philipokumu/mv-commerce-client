<template>
  <div class="py-4 px-4 md:px-8 bg-white shadow rounded-md overflow-hidden">
    <div class="mb-8">
      <h2 class="mb-4 py-2 text-xl font-semibold border-b">Email</h2>
      <form autocomplete="off" @submit.prevent="">
        <p class="mb-2">You can't change username</p>
        <div class="mb-4">
          <label for="email" class="block leading-8">Email</label>
          <input
            id="email"
            type="email"
            :value="$auth.user.attributes.user_email"
            class="py-3 px-6 block w-full transition rounded border outline-none"
            readonly
            required
          />
        </div>
      </form>
    </div>
    <div>
      <h2 class="mb-4 py-2 text-xl text-red-500 font-semibold border-b">
        Danger Zone
      </h2>
      <p class="mb-2">
        Proceed with caution! This cannot be undone. This will delete all the
        data associated with your account.
      </p>
      <button
        type="submit"
        class="py-3 px-6 block w-full text-white bg-gray-500 hover:bg-gray-600 focus:bg-gray-600 transition rounded shadow-md focus:outline-none"
        :disabled="busy"
        :class="{ 'pointer-events-none': busy }"
        @click="deleteAccount"
      >
        <span v-if="!busy"> Delete Account </span>
        <spinner v-else class="mx-auto" />
      </button>
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
  computed: {
    ...mapGetters({
      busy: 'authentication/busy'
    })
  },
  methods: {
    ...mapActions({
      deleteAccount: 'authentication/delete'
    })
  }
};
</script>
