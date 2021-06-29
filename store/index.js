export const state = () => ({
  menu: false
});

export const getters = {
  menu: state => state.menu
};

export const mutations = {
  TOGGLE_MENU(state) {
    state.menu = !state.menu;
  },

  CLOSE_MENU(state) {
    state.menu = false;
  }
};

export const actions = {
  toggleMenu({ commit, getters }) {
    if (process.browser) {
      if (!getters.menu) {
        document.body.classList.add('overflow-hidden');
      } else {
        document.body.classList.remove('overflow-hidden');
      }
    }

    commit('TOGGLE_MENU');
  },

  closeMenu({ commit }) {
    if (process.browser) {
      document.body.classList.remove('overflow-hidden');
    }

    commit('CLOSE_MENU');
  }
};
