<template>
  <div>
    <client-only>
      <paypal-checkout
        :amount="options.amount"
        :currency="options.currency"
        :invoice-number="options.invoiceNumber"
        :client="credentials"
        env="sandbox"
        :button-style="myStyle"
        @payment-authorized="authorizedPayment"
        @payment-completed="completedPayment"
        @payment-cancelled="cancelledPayment"
      ></paypal-checkout>
    </client-only>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'PaypalButton',
  props: {
    options: {
      type: Object,
      default: null
    },
    order: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      credentials: {
        sandbox: this.$config.paypalSandboxToken,
        production: this.$config.paypalProductionToken
      },
      myStyle: {
        label: 'checkout',
        size: 'responsive',
        shape: 'rect',
        color: 'gold'
      }
    };
  },
  methods: {
    ...mapActions({
      createOrder: 'orders/create'
    }),
    authorizedPayment(context) {
      // eslint-disable-next-line no-console
      console.log('Authorized payment');
    },
    completedPayment(context) {
      this.createOrder({
        payment_mode: 'paypal',
        shipping_id: this.order.shipping_id,
        transaction_id: context.transactions[0].related_resources[0].sale.id
      });
    },
    cancelledPayment(context) {
      // eslint-disable-next-line no-console
      console.log('Cancelled payment');
    }
  }
};
</script>
