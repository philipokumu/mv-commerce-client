<template>
  <div class="relative">
    <nuxt-link
      to="/dashboard/profile"
      class="h-10 w-10 grid place-items-center md:hidden ring-primary-500 hover:bg-gray-50 focus:bg-gray-50 focus:ring-2 rounded-full transition focus:outline-none"
    >
      <div class="h-2/3 w-2/3">
        <user-icon />
      </div>
    </nuxt-link>
    <div class="hidden md:block">
      <button
        class="h-10 px-4 flex items-center ring-primary-500 hover:bg-gray-50 focus:bg-gray-50 rounded focus:ring-2 transition focus:outline-none"
        @click.stop="toggleMenu"
      >
        <div class="h-6 w-6 mr-2">
          <user-icon />
        </div>
        <span class="whitespace-nowrap">My Account</span>
      </button>
      <menu
        class="m-0 p-0 absolute top-full right-0 transform translate-y-2 origin-top-right transition-all bg-white shadow-md rounded-md overflow-hidden"
        :class="{
          'scale-50 opacity-0 invisible': !open,
          'scale-100 opacity-100 visible': open
        }"
      >
        <ul v-if="$auth.loggedIn">
          <li>
            <nuxt-link
              to="/dashboard/profile"
              class="py-2 px-4 flex items-center hover:bg-gray-50 focus:bg-gray-50 transition whitespace-nowrap outline-none"
            >
              <div class="mr-2 h-8 w-8 grid place-items-center">
                <div class="w-2/3 h-2/3">
                  <user-icon />
                </div>
              </div>
              Manage Account
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              to="/dashboard/orders"
              class="py-2 px-4 flex items-center hover:bg-gray-50 focus:bg-gray-50 transition whitespace-nowrap outline-none"
            >
              <div class="mr-2 h-8 w-8 grid place-items-center">
                <div class="w-2/3 h-2/3">
                  <package-icon />
                </div>
              </div>
              Track Orders
            </nuxt-link>
          </li>
          <li class="border-t border-gray-100">
            <button
              class="py-2 px-4 flex items-center w-full hover:bg-gray-50 focus:bg-gray-50 transition whitespace-nowrap focus:outline-none"
              @click="logout"
            >
              <div class="mr-2 h-8 w-8 grid place-items-center">
                <div class="w-2/3 h-2/3">
                  <logout-icon />
                </div>
              </div>
              Logout
            </button>
          </li>
        </ul>
        <ul v-else>
          <li>
            <nuxt-link
              to="/auth/login"
              class="py-2 px-4 flex items-center hover:bg-gray-50 focus:bg-gray-50 transition whitespace-nowrap outline-none"
            >
              <div class="mr-2 h-8 w-8 grid place-items-center">
                <div class="w-2/3 h-2/3">
                  <login-icon />
                </div>
              </div>
              Login
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              to="/auth/register"
              class="py-2 px-4 flex items-center hover:bg-gray-50 focus:bg-gray-50 transition whitespace-nowrap outline-none"
            >
              <div class="mr-2 h-8 w-8 grid place-items-center">
                <div class="w-2/3 h-2/3">
                  <user-icon />
                </div>
              </div>
              Create Account
            </nuxt-link>
          </li>
        </ul>
      </menu>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import LoginIcon from '../Icons/LoginIcon.vue';
import LogoutIcon from '../Icons/LogoutIcon.vue';
import PackageIcon from '../Icons/PackageIcon.vue';
import UserIcon from '../Icons/UserIcon.vue';

export default {
  name: 'AccountMenu',
  components: {
    UserIcon,
    LogoutIcon,
    PackageIcon,
    LoginIcon
  },
  data() {
    return {
      open: false
    };
  },
  methods: {
    ...mapActions({
      logout: 'authentication/logout'
    }),
    toggleMenu() {
      this.open = !this.open;

      window.onclick = () => {
        this.open = false;
      };
    }
  }
};
</script>
