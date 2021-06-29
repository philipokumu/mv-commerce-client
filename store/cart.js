/* eslint-disable no-console */

export const state = () => ({
  items: null,
  busy: false,
  errors: null
});

export const getters = {
  items: state => state.items,
  busy: state => state.busy,
  errors: state => state.errors
};

export const mutations = {
  SET_ITEMS(state, payload) {
    state.items = payload;
  },

  ADD_TO_CART(state, payload) {
    state.items.push(payload);
  },

  INCREMENT_ITEM_QUANTITY(state, payload) {
    const item = state.items[payload];

    item.product_quantity += 1;
    state.items[payload] = item;
  },

  REMOVE_FROM_CART(state, payload) {
    const items = state.items;
    items.shift(payload, 1);
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

  getLocalCart({ commit }) {
    let items = [];

    if (process.browser && localStorage.getItem('cart')) {
      items = JSON.parse(localStorage.getItem('cart'));
    }

    commit('SET_ITEMS', items);
    commit('IS_BUSY', false);
  },

  addToLocalCart({ getters, commit, dispatch }, data) {
    dispatch('getLocalCart');
    const items = getters.items;
    let item = items.find(itm => itm.product_id === data.product_id);

    if (item) {
      const index = items.indexOf(item);
      commit('INCREMENT_ITEM_QUANTITY', index);
    } else {
      item = data;
      commit('ADD_TO_CART', item);
    }

    if (process.browser) {
      localStorage.setItem('cart', JSON.stringify(items));
    }

    dispatch('getLocalCart');
  },

  removeFromLocalCart({ getters, commit, dispatch }, id) {
    const items = getters.items;
    const item = items.find(itm => itm.product_id === parseInt(id));
    const index = items.indexOf(item);

    commit('REMOVE_FROM_CART', index);

    if (process.browser) {
      localStorage.setItem('cart', JSON.stringify(items));
    }

    dispatch('getLocalCart');
  },

  clearLocalCart() {
    localStorage.setItem('cart', JSON.stringify([]));
  },

  /**
   * Dispatched after login.
   *
   * Migrates all the cart items in the localStorage
   * to the database.
   */
  updateCartState({ getters, commit, dispatch }) {
    commit('SET_ERRORS', null);
    commit('IS_BUSY', true);

    dispatch('getLocalItems');
    const items = getters.items;

    if (!items || items.length < 1) return;

    items.forEach(async item => {
      await this.$axios
        .post('/cartItems', {
          product_id: item.product_id,
          quantity: item.product_quantity
        })
        .then(() => {
          dispatch('removeFromLocalCart', item.product_id);
        })
        .catch(err => {
          console.log(err);
          commit('IS_BUSY', false);
        });
    });

    dispatch('get', true);
    window.location.href = '/checkout';
  },

  async get({ getters, commit, dispatch }, refresh) {
    commit('SET_ERRORS', null);
    commit('IS_BUSY', true);

    let items = getters.items;

    if (!this.$auth.loggedIn) {
      return dispatch('getLocalCart');
    }

    if (!items || items.length === 0 || refresh) {
      const res = await this.$axios.get('/cartItems');
      items = res.data.data;
    }

    commit('SET_ITEMS', items);
    commit('IS_BUSY', false);
  },

  async create({ commit, dispatch }, data) {
    commit('SET_ERRORS', null);
    commit('IS_BUSY', true);

    if (!this.$auth.loggedIn) {
      return dispatch('addToLocalCart', data);
    }

    await this.$axios
      .post('/cartItems', {
        product_id: data.product_id,
        quantity: data.product_quantity
      })
      .then(() => {
        dispatch('get', true);
      })
      .catch(err => {
        console.log(err);
        commit('IS_BUSY', false);
      });
  },

  async delete({ commit, dispatch }, id) {
    commit('SET_ERRORS', null);
    commit('IS_BUSY', true);

    if (!this.$auth.loggedIn) {
      return dispatch('removeFromLocalCart', id);
    }

    await this.$axios
      .delete(`/cartItems/${id}`)
      .then(() => {
        dispatch('get', true);
      })
      .catch(err => {
        console.log(err);
        commit('IS_BUSY', false);
      });
  }
};
