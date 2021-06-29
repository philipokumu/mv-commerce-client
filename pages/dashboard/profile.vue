<template>
  <div class="py-4 px-4 md:px-8 bg-white shadow rounded-md overflow-hidden">
    <form autocomplete="off" @submit.prevent="submitForm">
      <div class="mb-4">
        <label for="name" class="block leading-8">Name</label>
        <input
          id="name"
          v-model="data.name"
          type="text"
          class="py-3 px-6 block w-full ring-primary-500 focus:ring-2 transition rounded border outline-none"
          required
        />
      </div>
      <button
        type="submit"
        class="mt-6 ml-auto py-3 px-6 block text-white transition rounded shadow-md focus:outline-none"
        :disabled="busy || !changed"
        :class="{
          'bg-primary-500 hover:bg-primary-600 focus:bg-primary-600': changed,
          'bg-gray-500 hover:bg-gray-700 focus:bg-gray-700': !changed,
          'pointer-events-none': busy || !changed
        }"
      >
        <span v-if="!busy"> Save Changes </span>
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
      changed: false,
      data: {
        name: this.$auth.user.attributes.user_name
      }
    };
  },
  computed: {
    ...mapGetters({
      busy: 'authentication/busy'
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
  mounted() {
    this.listenChanges();
  },
  methods: {
    ...mapActions({
      saveChanges: 'authentication/update'
    }),
    listenChanges() {
      if (this.data.name === this.$auth.user.attributes.user_name) {
        return (this.changed = false);
      }

      this.changed = true;
    },
    submitForm() {
      this.saveChanges(this.data).then(() => this.listenChanges());
    }
  }
};
</script>
