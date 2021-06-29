/* eslint-disable no-console */

export const state = () => ({
  orders: null,
  order: null,
  busy: false,
  errors: null
});

export const getters = {
  orders: state => state.orders,
  order: state => state.order,
  busy: state => state.busy,
  errors: state => state.errors
};

export const mutations = {
  SET_ORDERS(state, payload) {
    state.orders = payload;
  },

  SET_ORDER(state, payload) {
    state.order = payload;
  },

  IS_BUSY(state, payload) {
    state.busy = payload;
  },

  SET_ERRORS(state, payload) {
    state.errors = payload;
  }
};

export const actions = {
  clearErrors({ commit }) {
    return commit('SET_ERRORS', null);
  },

  async get({ getters, commit }, refresh) {
    commit('SET_ERRORS', null);
    commit('IS_BUSY', true);

    let orders = getters.orders;

    if (!orders || orders.length === 0 || refresh) {
      const res = await this.$axios.get('/orders');
      orders = res.data.data;
    }

    commit('SET_ORDERS', orders);
    commit('IS_BUSY', false);
  },

  async view({ getters, commit }, id) {
    commit('SET_ERRORS', null);
    commit('IS_BUSY', true);

    const orders = getters.orders;
    let order = null;

    if (!orders || orders.length === 0) {
      const res = await this.$axios.get(`/orders/${id}`);
      order = res.data;
    } else {
      order = orders.find(ord => ord.data.order_id === parseInt(id));
    }

    commit('SET_ORDER', order);
    commit('IS_BUSY', false);
  },

  /**
   * Recieves the shipping_id, transaction_id and payment
   * mode then updates the order.
   */
  async create({ rootGetters, commit, dispatch }, data) {
    commit('SET_ERRORS', null);
    commit('IS_BUSY', true);

    const cartItems = rootGetters['cart/items'];
    const orderItem = cartItems[0];
    const orderId = orderItem.data.attributes.order_id;

    await this.$axios
      .patch(`/orders/${orderId}/payment`, data)
      .then(() => {
        dispatch('cart/get', true, { root: true });
        this.$router.push({ path: '/checkout/success' });
      })
      .catch(err => {
        console.log(err);
        commit('IS_BUSY', false);
      });
  }
};
