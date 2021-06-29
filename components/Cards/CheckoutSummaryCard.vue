<template>
  <div
    class="p-4 lg:p-4 border-t-4 border-primary-500 bg-white md:rounded-md md:shadow overflow-hidden"
  >
    <div class="mb-4">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="mb-2 flex items-center"
      >
        <div class="mr-2 h-10 w-10 rounded overflow-hidden">
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
        <div>
          <p class="text-lg">
            {{
              item.data.attributes.productDetails.data.attributes.product_name
            }}
          </p>
          <p class="text-sm">
            <span>
              Price:
              {{ item.data.attributes.productDetails.data.attributes.currency }}
              {{
                item.data.attributes.productDetails.data.attributes
                  .product_price
              }}
            </span>
            &middot;
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
      </div>
    </div>
    <div class="mb-2 flex items-center justify-between">
      <p class="text-lg">Subtotal:</p>
      <p class="text-lg">KSH {{ subtotal }}</p>
    </div>
    <div class="mb-2 flex items-center justify-between">
      <p class="text-lg">Delivery Fee:</p>
      <p class="text-lg">KSH {{ deliveryFee }}</p>
    </div>
    <hr class="my-2 border-gray-100" />
    <div class="flex items-center justify-between">
      <p class="text-xl font-semibold">Total</p>
      <p class="text-xl font-semibold">KSH {{ subtotal + deliveryFee }}</p>
    </div>
    <div v-if="complete" class="mt-6">
      <paypal-button :options="options" :order="order" />
      <credit-card-button class="mt-4" />
      <mpesa-button class="mt-4" />
    </div>
  </div>
</template>

<script>
import CreditCardButton from '../Widgets/CreditCardButton.vue';
import MpesaButton from '../Widgets/MpesaButton.vue';
import PaypalButton from '../Widgets/PaypalButton.vue';

export default {
  name: 'CheckoutSummaryCard',
  components: { PaypalButton, CreditCardButton, MpesaButton },
  props: {
    items: {
      type: Array,
      default: null
    },
    complete: {
      type: Boolean,
      default: false
    },
    order: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      subtotal: null,
      deliveryFee: 2,
      options: {
        amount: 0.01,
        currency: 'USD',
        invoiceNumber: `${Math.round(Math.random() * 9999)}`
      }
    };
  },
  watch: {
    items: {
      immediate: true,
      handler() {
        this.calculateSubtotal();
      }
    },
    subtotal: {
      immediate: true,
      handler() {
        this.options.amount = `${this.subtotal + this.deliveryFee}`;
      }
    }
  },
  methods: {
    calculateSubtotal() {
      const reducer = (accumulator, currentValue) => {
        return (
          accumulator +
          currentValue.data.attributes.quantity *
            currentValue.data.attributes.productDetails.data.attributes
              .product_price
        );
      };
      const subtotal = this.items.reduce(reducer, 0);

      this.subtotal = subtotal;
    }
  }
};
</script>
