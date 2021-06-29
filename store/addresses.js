/* eslint-disable no-console */

export const state = () => ({
  addresses: null,
  address: null,
  busy: false,
  errors: null
});

export const getters = {
  addresses: state => state.addresses,
  address: state => state.address,
  busy: state => state.busy,
  errors: state => state.errors
};

export const mutations = {
  SET_ADDRESSES(state, payload) {
    state.addresses = payload;
  },

  SET_ADDRESS(state, payload) {
    state.address = payload;
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

    let addresses = getters.addresses;

    if (!addresses || addresses.length === 0 || refresh) {
      const res = await this.$axios.get('/auth/user/shippingDetails');
      addresses = res.data.data;
    }

    commit('SET_ADDRESSES', addresses);
    commit('IS_BUSY', false);
  },

  async view({ getters, commit }, id) {
    commit('SET_ERRORS', null);
    commit('IS_BUSY', true);

    const addresses = getters.addresses;
    let address = null;

    if (!addresses || addresses.length === 0) {
      const res = await this.$axios.get(`/auth/user/shippingDetails/${id}`);
      address = res.data;
    } else {
      address = addresses.find(
        addr => addr.data.shipping_details_id === parseInt(id)
      );
    }

    commit('SET_ADDRESS', address);
    commit('IS_BUSY', false);
  },

  async create({ commit, dispatch }, data) {
    commit('SET_ERRORS', null);
    commit('IS_BUSY', true);

    await this.$axios
      .post('/auth/user/shippingDetails', data)
      .then(() => {
        dispatch('get', true);
        this.$router.push('/dashboard/addresses');
      })
      .catch(err => {
        console.log(err);
        commit('IS_BUSY', false);
      });
  },

  async update({ commit, dispatch }, { id, data }) {
    commit('SET_ERRORS', null);
    commit('IS_BUSY', true);

    await this.$axios
      .patch(`/auth/user/shippingDetails/${id}`, data)
      .then(() => {
        dispatch('get', true);
        this.$router.push('/dashboard/addresses');
      })
      .catch(err => {
        console.log(err);
        commit('IS_BUSY', false);
      });
  },

  async delete({ commit, dispatch }, id) {
    if (!confirm('Are you sure?')) return;

    commit('SET_ERRORS', null);
    commit('IS_BUSY', true);

    await this.$axios
      .delete(`/auth/user/shippingDetails/${id}`)
      .then(() => {
        dispatch('get', true);
      })
      .catch(err => {
        console.log(err);
        commit('IS_BUSY', false);
      });
  }
};
