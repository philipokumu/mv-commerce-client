<template>
  <div class="container mx-auto px-8 py-4">
    <form
      autocomplete="off"
      class="mx-auto max-w-sm"
      @submit.prevent="submitForm"
    >
      <div class="mb-4">
        <label for="password" class="block text-lg leading-8">Password</label>
        <input
          id="password"
          v-model="data.password"
          type="password"
          class="px-6 py-3 block w-full border outline-none ring-primary-600 focus:ring-2 transition rounded"
          :class="{
            'border-red-500': serverErrors && serverErrors.password
          }"
          required
        />
        <div class="text-sm text-red-500">
          <span v-if="serverErrors && serverErrors.password">
            {{ serverErrors.password[0] }}
          </span>
        </div>
      </div>
      <div class="mb-4">
        <label for="passwordConfirmation" class="block text-lg leading-8"
          >Confirm Password</label
        >
        <input
          id="passwordConfirmation"
          v-model="data.password_confirmation"
          type="password"
          class="px-6 py-3 block w-full border outline-none ring-primary-600 focus:ring-2 transition rounded"
          required
        />
      </div>
      <button
        type="submit"
        class="my-6 px-6 py-3 text-lg flex items-center justify-center w-full bg-primary-500 text-white hover:bg-primary-600 focus:bg-primary-600 transition rounded shadow-md focus:outline-none"
        :disabled="busy"
        :class="{ 'pointer-events-none': busy }"
      >
        <p v-if="!busy">Login</p>
        <spinner v-if="busy" />
      </button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Spinner from '@/components/Widgets/Spinner.vue';

export default {
  components: { Spinner },
  auth: 'guest',
  layout: 'auth',
  data() {
    return {
      data: {
        token: this.$route.query.token,
        email: this.$route.query.email,
        password: null,
        password_confirmation: null
      }
    };
  },
  computed: {
    ...mapGetters({
      busy: 'authentication/busy',
      serverErrors: 'authentication/errors'
    })
  },
  mounted() {
    this.closeMenu();
  },
  created() {
    this.clearServerErrors();
  },
  methods: {
    ...mapActions({
      closeMenu: 'closeMenu',
      resetPassword: 'authentication/resetPassword',
      clearServerErrors: 'authentication/clearErrors'
    }),
    submitForm() {
      this.clearServerErrors();

      this.resetPassword(this.data);
    }
  }
};
</script>
