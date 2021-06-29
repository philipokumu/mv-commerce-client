/* eslint-disable no-console */

export const state = () => ({
  products: null,
  product: null,
  busy: false,
  errors: null
});

export const getters = {
  products: state => state.products,
  product: state => state.product,
  busy: state => state.busy,
  errors: state => state.errors
};

export const mutations = {
  SET_PRODUCTS(state, payload) {
    state.products = payload;
  },

  SET_PRODUCT(state, payload) {
    state.product = payload;
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

  async get({ getters, commit }) {
    commit('SET_ERRORS', null);
    commit('IS_BUSY', true);

    let products = getters.products;

    if (!products || products.length === 0) {
      const res = await this.$axios.get('/products');
      products = res.data.data;
    }

    commit('SET_PRODUCTS', products);
    commit('IS_BUSY', false);
  },

  async view({ getters, commit }, slug) {
    commit('SET_ERRORS', null);
    commit('IS_BUSY', true);

    const products = getters.products;
    let product = null;

    if (!products || products.length === 0) {
      const res = await this.$axios.get(`/products/${slug}`);
      product = res.data;
    } else {
      product = products.find(prod => prod.data.attributes.slug === slug);
    }

    commit('SET_PRODUCT', product);
    commit('IS_BUSY', false);
  }
};
