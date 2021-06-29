<template>
  <div>
    <article
      v-if="$auth.loggedIn"
      class="card flex items-center justify-between w-full border border-gray-100 rounded overflow-hidden"
    >
      <nuxt-link
        :to="`/products/${item.data.attributes.productDetails.data.attributes.slug}`"
        class="flex items-center focus:outline-none"
      >
        <div class="h-20 w-20 overflow-hidden">
          <img
            :src="
              item.data.attributes.productDetails.data.attributes.cover_image
                .data.attributes.path
            "
            :alt="
              item.data.attributes.productDetails.data.attributes.product_name
            "
            class="h-full w-full object-cover"
          />
        </div>
        <div class="p-2">
          <p>
            {{
              item.data.attributes.productDetails.data.attributes.product_name
            }}
          </p>
          <p>
            <span class="text-primary-500 text-lg">
              {{ item.data.attributes.productDetails.data.attributes.currency }}
              {{
                item.data.attributes.productDetails.data.attributes
                  .product_price
              }}
            </span>
            <span class="text-gray-400 line-through text-sm">Ksh 6000</span>
          </p>
          <p class="text-xs">
            <span>Quantity: {{ item.data.attributes.quantity }}</span>
            &middot;
            <span>
              Subtotal:
              {{
                item.data.attributes.quantity *
                item.data.attributes.productDetails.data.attributes
                  .product_price
              }}
            </span>
          </p>
        </div>
      </nuxt-link>
      <button
        class="mr-2 h-8 w-8 grid place-items-center ring-red-500 hover:bg-gray-50 focus:bg-gray-50 focus:ring-2 rounded-full focus:outline-none"
        :disabled="busy"
        :class="{ 'pointer-events-none': busy }"
        @click="removeItem(item.data.cartItem_id)"
      >
        <div class="h-2/3 w-2/3 text-red-500">
          <delete-icon />
        </div>
      </button>
    </article>
    <article
      v-else
      class="card flex items-center justify-between w-full border border-gray-100 rounded overflow-hidden"
    >
      <nuxt-link
        :to="`/products/${item.attributes.slug}`"
        class="flex items-center focus:outline-none"
      >
        <div class="h-20 w-20 overflow-hidden">
          <img
            :src="item.attributes.cover_image.data.attributes.path"
            :alt="item.attributes.product_name"
            class="h-full w-full object-cover"
          />
        </div>
        <div class="p-2">
          <p>
            {{ item.attributes.product_name }}
          </p>
          <p>
            <span class="text-primary-500 text-lg">
              {{ item.attributes.currency }}
              {{ item.attributes.product_price }}
            </span>
            <!-- <span class="text-gray-400 line-through text-sm">
              {{ item.attributes.currency }} 00
            </span> -->
          </p>
          <p class="text-xs">
            <span>Quantity: {{ item.product_quantity }}</span>
            &middot;
            <span>
              Subtotal:
              {{ item.product_quantity * item.attributes.product_price }}
            </span>
          </p>
        </div>
      </nuxt-link>
      <button
        class="mr-2 h-8 w-8 grid place-items-center ring-red-500 hover:bg-gray-50 focus:bg-gray-50 focus:ring-2 rounded-full focus:outline-none"
        :disabled="busy"
        :class="{ 'pointer-events-none': busy }"
        @click="removeItem(item.product_id)"
      >
        <div class="h-2/3 w-2/3 text-red-500">
          <delete-icon />
        </div>
      </button>
    </article>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import DeleteIcon from '../Icons/DeleteIcon.vue';

export default {
  name: 'MiniCartCard',
  components: { DeleteIcon },
  props: {
    item: {
      type: Object,
      default: null
    }
  },
  computes: {
    ...mapGetters({
      busy: 'cart/busy'
    })
  },
  methods: {
    ...mapActions({
      removeItem: 'cart/delete'
    })
  }
};
</script>
