/* eslint-disable no-console */

export const state = () => ({
  products: null,
  busy: false
});

export const getters = {
  products: state => state.products,
  busy: state => state.busy
};

export const mutations = {
  SET_PRODUCTS(state, payload) {
    state.products = payload;
  },

  IS_BUSY(state, payload) {
    state.busy = payload;
  }
};

export const actions = {
  async get({ commit }, query) {
    commit('IS_BUSY', true);

    const res = await this.$axios.get(`/products?key_name=${query}`);
    const products = res.data.data;

    commit('SET_PRODUCTS', products);
    commit('IS_BUSY', false);
  }
};
