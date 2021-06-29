<template>
  <button
    class="h-8 w-8 flex-shrink-0 grid place-items-center ring-primary-500 hover:bg-gray-50 focus:bg-gray-50 focus:ring-2 focus:outline-none transition rounded-full"
    @click="$router.go(-1)"
  >
    <div class="h-2/3 w-2/3">
      <back-icon />
    </div>
  </button>
</template>

<script>
import BackIcon from '../Icons/BackIcon.vue';

export default {
  name: 'BackButton',
  components: { BackIcon }
};
</script>
