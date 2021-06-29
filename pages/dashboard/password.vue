<template>
  <div class="py-4 px-4 md:px-8 bg-white shadow rounded-md overflow-hidden">
    <form autocomplete="off" @submit.prevent="submitForm">
      <div class="mb-4">
        <label for="currentPassword" class="block leading-8"
          >Current Password</label
        >
        <input
          id="currentPassword"
          v-model="data.current_password"
          type="password"
          class="py-3 px-6 block w-full ring-primary-500 focus:ring-2 transition rounded border outline-none"
          :class="{
            'border-red-500': serverErrors && serverErrors.current_password
          }"
          required
        />
        <div class="text-sm text-red-500">
          <span v-if="serverErrors && serverErrors.current_password">
            {{ serverErrors.current_password }}
          </span>
        </div>
      </div>
      <div class="mb-4">
        <label for="newPassword" class="block leading-8">New Password</label>
        <input
          id="newPassword"
          v-model="data.password"
          type="password"
          class="py-3 px-6 block w-full ring-primary-500 focus:ring-2 transition rounded border outline-none"
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
        <label for="passwordConfirmation" class="block leading-8"
          >Confirm Password</label
        >
        <input
          id="passwordConfirmation"
          v-model="data.password_confirmation"
          type="password"
          class="py-3 px-6 block w-full ring-primary-500 focus:ring-2 transition rounded border outline-none"
          required
        />
      </div>
      <button
        type="submit"
        class="mt-6 ml-auto py-3 px-6 block text-white transition rounded shadow-md focus:outline-none"
        :disabled="busy || !ready"
        :class="{
          'bg-primary-500 hover:bg-primary-600 focus:bg-primary-600': ready,
          'bg-gray-500 hover:bg-gray-700 focus:bg-gray-700': !ready,
          'pointer-events-none': busy || !ready
        }"
      >
        <span v-if="!busy"> Reset Password </span>
        <spinner v-else class="mx-auto" />
      </button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Spinner from '@/components/Widgets/Spinner.vue';

export default {
  components: {
    Spinner
  },
  layout: 'dashboard',
  middleware: 'auth',
  data() {
    return {
      ready: false,
      data: {
        current_password: null,
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
  watch: {
    data: {
      deep: true,
      immediate: true,
      handler() {
        this.listenChanges();
      }
    }
  },
  created() {
    this.clearServerErrors();
  },
  methods: {
    ...mapActions({
      changePassword: 'authentication/updatePassword',
      clearServerErrors: 'authentication/clearErrors'
    }),
    listenChanges() {
      if (
        this.data.current_password &&
        this.data.password &&
        this.data.password_confirmation
      ) {
        return (this.ready = true);
      }

      this.ready = false;
    },
    submitForm() {
      this.changePassword(this.data).then(() => {
        if (this.serverErrors) return;

        this.data.current_password = null;
        this.data.password = null;
        this.data.password_confirmation = null;
      });
    }
  }
};
</script>
