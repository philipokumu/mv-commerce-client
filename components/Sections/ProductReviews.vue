<template>
  <div class="md:grid grid-cols-12 gap-8">
    <div class="mb-4 md:mb-0 col-span-4 lg:col-span-3">
      <div class="mb-4 p-4 bg-gray-50 rounded-md">
        <p class="text-5xl text-center font-semibold text-yellow-400">4/5</p>
        <div class="my-2 flex items-center justify-center text-gray-300">
          <div
            class="h-5 w-5"
            :class="{ 'text-yellow-400': reviews.meta.review_average >= 1 }"
          >
            <star-icon />
          </div>
          <div
            class="h-5 w-5"
            :class="{ 'text-yellow-400': reviews.meta.review_average >= 2 }"
          >
            <star-icon />
          </div>
          <div
            class="h-5 w-5"
            :class="{ 'text-yellow-400': reviews.meta.review_average >= 3 }"
          >
            <star-icon />
          </div>
          <div
            class="h-5 w-5"
            :class="{ 'text-yellow-400': reviews.meta.review_average >= 4 }"
          >
            <star-icon />
          </div>
          <div
            class="h-5 w-5"
            :class="{ 'text-yellow-400': reviews.meta.review_average >= 5 }"
          >
            <star-icon />
          </div>
        </div>
        <p class="text-xl text-center">
          {{ reviews.meta.review_count }} ratings
        </p>
      </div>
    </div>
    <div class="col-span-8 lg:col-span-9 divide-y">
      <div v-for="(review, index) in reviews.data" :key="index" class="py-4">
        <div class="flex items-center text-gray-300">
          <div
            class="h-3 w-3"
            :class="{ 'text-yellow-400': review.data.attributes.rating >= 1 }"
          >
            <star-icon />
          </div>
          <div
            class="h-3 w-3"
            :class="{ 'text-yellow-400': review.data.attributes.rating >= 2 }"
          >
            <star-icon />
          </div>
          <div
            class="h-3 w-3"
            :class="{ 'text-yellow-400': review.data.attributes.rating >= 3 }"
          >
            <star-icon />
          </div>
          <div
            class="h-3 w-3"
            :class="{ 'text-yellow-400': review.data.attributes.rating >= 4 }"
          >
            <star-icon />
          </div>
          <div
            class="h-3 w-3"
            :class="{ 'text-yellow-400': review.data.attributes.rating >= 5 }"
          >
            <star-icon />
          </div>
        </div>
        <p class="my-2">
          {{ review.data.attributes.review }}
        </p>
        <div class="text-sm flex items-center justify-between">
          <p class="text-gray-500">
            {{ review.data.attributes.user_name }} &middot;
            {{ formatTime(review.data.attributes.created_at) }}
          </p>
          <p class="text-green-500 flex items-center">
            <span class="mr-1 block h-4 w-4">
              <verified-icon />
            </span>
            Verified purchase
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import StarIcon from '../Icons/StarIcon.vue';
import VerifiedIcon from '../Icons/VerifiedIcon.vue';

export default {
  name: 'ProductReviews',
  components: {
    StarIcon,
    VerifiedIcon
  },
  props: {
    reviews: {
      type: Object,
      default: null
    }
  },
  methods: {
    formatTime(time) {
      return moment(time).format('MMMM Do YYYY');
    }
  }
};
</script>
