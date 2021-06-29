<template>
  <div class="container mx-auto px-8 py-4">
    <form
      autocomplete="off"
      class="mx-auto max-w-sm"
      @submit.prevent="submitForm"
    >
      <div class="mb-4">
        <label for="email" class="block text-lg leading-8">Email</label>
        <input
          id="email"
          v-model="data.email"
          type="email"
          class="px-6 py-3 block w-full border outline-none ring-primary-600 focus:ring-2 transition rounded"
          :class="{
            'border-red-500':
              errors.email || (serverErrors && serverErrors.email)
          }"
          required
        />
        <div class="text-sm text-red-500">
          <span v-if="errors.email">{{ errors.email }}</span>
          <span v-if="serverErrors && serverErrors.email">
            {{ serverErrors.email }}
          </span>
        </div>
      </div>
      <button
        type="submit"
        class="my-6 px-6 py-3 text-lg flex items-center justify-center w-full bg-primary-500 text-white hover:bg-primary-600 focus:bg-primary-600 transition rounded shadow-md focus:outline-none"
        :disabled="busy"
        :class="{ 'pointer-events-none': busy }"
      >
        <span v-if="!busy">Proceed</span>
        <spinner v-if="busy" />
      </button>
      <nuxt-link
        to="/auth/login"
        class="block text-sm text-center text-blue-500 hover:text-blue-600 focus:text-blue-600 transition outline-none"
        >Back to login</nuxt-link
      >
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
        email: null
      },
      errors: {
        email: null
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
      requestReset: 'authentication/requestPasswordReset',
      clearServerErrors: 'authentication/clearErrors'
    }),
    clearErrors() {
      for (const error in this.errors) {
        this.errors[error] = null;
      }
      this.clearServerErrors();
    },
    validate() {
      let valid = true;
      const re = /\S+@\S+\.\S+/;
      this.clearErrors();

      if (!re.test(this.data.email)) {
        this.errors.email = 'Invalid email address';
        valid = false;
      }

      return valid;
    },
    submitForm() {
      const valid = this.validate();

      if (!valid) return;

      this.requestReset(this.data);
    }
  }
};
</script>
