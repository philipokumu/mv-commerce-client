/* eslint-disable no-console */

export const state = () => ({
  busy: false,
  errors: null
});

export const getters = {
  busy: state => state.busy,
  errors: state => state.errors
};

export const mutations = {
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

  async create({ commit, dispatch }, { productSlug, review }) {
    commit('SET_ERRORS', null);
    commit('IS_BUSY', true);

    await this.$axios
      .post(`/products/${productSlug}/productReviews`, review)
      .then(() => {
        commit('IS_BUSY', false);
        dispatch('products/view', productSlug, { root: true });
        this.$router.push(`/products/${productSlug}`);
      })
      .catch(err => {
        console.log(err);
        commit('IS_BUSY', false);
      });
  }
};
