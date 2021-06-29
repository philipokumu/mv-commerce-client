<template>
  <div class="container mx-auto px-8 py-4">
    <div class="h-96 flex items-center justify-center">
      <div>
        <p class="mb-4 text-lg font-poppins font-semibold text-center">
          The password reset link has been sent to your email
        </p>
        <nuxt-link
          to="/"
          class="mx-auto py-2 px-4 block max-w-max font-semibold border-2 border-primary-500 text-green-500 hover:text-white hover:bg-primary-500 focus:text-white focus:bg-primary-500 transition rounded shadow-md focus:outline-none"
        >
          Back to Home page
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
