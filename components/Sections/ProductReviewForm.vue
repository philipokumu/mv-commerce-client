<template>
  <form
    class="max-w-2xl mx-auto"
    autocomplete="off"
    @submit.prevent="submitForm"
  >
    <div class="mb-4">
      <p>Rating</p>
      <div class="flex items-center text-gray-400">
        <label
          for="one"
          class="mr-2 h-8 w-8 block"
          :class="{ 'text-yellow-400': data.rating >= 1 }"
        >
          <star-icon />
          <input
            id="one"
            v-model="data.rating"
            name="rating"
            type="radio"
            value="1"
            class="hidden"
            required
          />
        </label>
        <label
          for="two"
          class="mr-2 h-8 w-8 block"
          :class="{ 'text-yellow-400': data.rating >= 2 }"
        >
          <star-icon />
          <input
            id="two"
            v-model="data.rating"
            name="rating"
            type="radio"
            value="2"
            class="hidden"
            required
          />
        </label>
        <label
          for="three"
          class="mr-2 h-8 w-8 block"
          :class="{ 'text-yellow-400': data.rating >= 3 }"
        >
          <star-icon />
          <input
            id="three"
            v-model="data.rating"
            name="rating"
            type="radio"
            value="3"
            class="hidden"
            required
          />
        </label>
        <label
          for="four"
          class="mr-2 h-8 w-8 block"
          :class="{ 'text-yellow-400': data.rating >= 4 }"
        >
          <star-icon />
          <input
            id="four"
            v-model="data.rating"
            name="rating"
            type="radio"
            value="4"
            class="hidden"
            required
          />
        </label>
        <label
          for="five"
          class="mr-2 h-8 w-8 block"
          :class="{ 'text-yellow-400': data.rating >= 5 }"
        >
          <star-icon />
          <input
            id="five"
            v-model="data.rating"
            name="rating"
            type="radio"
            value="5"
            class="hidden"
            required
          />
        </label>
      </div>
    </div>
    <div class="mb-4">
      <label for="review" class="block leading-8"> Review </label>
      <textarea
        id="review"
        v-model="data.review"
        rows="5"
        class="py-3 px-6 block w-full border ring-primary-500 focus:ring-2 transition rounded outline-none"
        placeholder="Write your review"
      ></textarea>
    </div>
    <button
      class="mt-4 py-3 px-6 block w-full md:w-max bg-primary-500 text-white hover:bg-primary-600 focus:bg-primary-600 transition text-lg font-semibold rounded shadow-md focus:outline-none"
      :disabled="busy"
      :class="{ 'pointer-events-none': busy }"
    >
      <p v-if="!busy">Submit Review</p>
      <spinner v-if="busy" class="mx-auto" />
    </button>
  </form>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import StarIcon from '../Icons/StarIcon.vue';
import Spinner from '../Widgets/Spinner.vue';

export default {
  name: 'ProductReviewForm',
  components: { StarIcon, Spinner },
  data() {
    return {
      data: {
        rating: null,
        review: null
      }
    };
  },
  computed: {
    ...mapGetters({
      busy: 'reviews/busy'
    })
  },
  methods: {
    ...mapActions({
      addReview: 'reviews/create'
    }),
    submitForm() {
      this.addReview({
        productSlug: this.$route.params.slug,
        review: this.data
      }).then(() => {
        for (const key in this.data) {
          this.data[key] = null;
        }
      });
    }
  }
};
</script>
