<template>
  <article class="h-80 w-full">
    <div class="container mx-auto py-4 px-4 md:px-8 h-full w-full">
      <nuxt-link
        to="/products"
        class="block h-full w-full rounded-md shadow overflow-hidden"
      >
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/001/937/856/small/paper-art-shopping-online-on-smartphone-sale-promotion-backgroud-banner-for-market-ecommerce-free-vector.jpg"
          alt="Banner"
          class="h-full w-full object-cover"
        />
      </nuxt-link>
    </div>
  </article>
</template>

<script>
export default {
  name: 'OfferBanner',
  props: {
    action: {
      type: Boolean,
      default: true
    }
  }
};
</script>
