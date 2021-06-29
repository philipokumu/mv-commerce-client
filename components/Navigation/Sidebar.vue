<template>
  <menu class="m-0 p-0 sticky top-24 md:rounded-md md:shadow overflow-hidden">
    <ul
      class="bg-white border-b md:border-b-0 flex items-center md:block overflow-x-auto"
    >
      <li>
        <nuxt-link
          to="/dashboard/profile"
          class="py-3 px-6 flex items-center hover:bg-gray-50 focus:bg-gray-50 transition whitespace-nowrap outline-none"
          :class="{
            'bg-gray-100 hover:bg-gray-100 focus:bg-gray-100':
              $route.name === 'dashboard-profile'
          }"
        >
          <div class="mr-2 h-8 w-8 grid place-items-center">
            <div class="w-2/3 h-2/3">
              <user-edit-icon />
            </div>
          </div>
          Update Profile
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          to="/dashboard/addresses"
          class="py-3 px-6 flex items-center hover:bg-gray-50 focus:bg-gray-50 transition whitespace-nowrap outline-none"
          :class="{
            'bg-gray-100 hover:bg-gray-100 focus:bg-gray-100':
              $route.name === 'dashboard-addresses'
          }"
        >
          <div class="mr-2 h-8 w-8 grid place-items-center">
            <div class="w-2/3 h-2/3">
              <address-icon />
            </div>
          </div>
          Manage Addresses
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          to="/dashboard/password"
          class="py-3 px-6 flex items-center hover:bg-gray-50 focus:bg-gray-50 transition whitespace-nowrap outline-none"
          :class="{
            'bg-gray-100 hover:bg-gray-100 focus:bg-gray-100':
              $route.name === 'dashboard-password'
          }"
        >
          <div class="mr-2 h-8 w-8 grid place-items-center">
            <div class="w-2/3 h-2/3">
              <padlock-icon />
            </div>
          </div>
          Change Password
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          to="/dashboard/account"
          class="py-3 px-6 flex items-center hover:bg-gray-50 focus:bg-gray-50 transition whitespace-nowrap outline-none"
          :class="{
            'bg-gray-100 hover:bg-gray-100 focus:bg-gray-100':
              $route.name === 'dashboard-account'
          }"
        >
          <div class="mr-2 h-8 w-8 grid place-items-center">
            <div class="w-2/3 h-2/3">
              <account-settings-icon />
            </div>
          </div>
          Manage Account
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          to="/dashboard/orders"
          class="py-3 px-6 flex items-center hover:bg-gray-50 focus:bg-gray-50 transition whitespace-nowrap outline-none"
          :class="{
            'bg-gray-100 hover:bg-gray-100 focus:bg-gray-100':
              $route.name === 'dashboard-orders'
          }"
        >
          <div class="mr-2 h-8 w-8 grid place-items-center">
            <div class="w-2/3 h-2/3">
              <package-icon />
            </div>
          </div>
          Orders
        </nuxt-link>
      </li>
      <li class="border-l md:border-l-0 md:border-t border-gray-100">
        <button
          class="py-3 px-6 flex items-center w-full hover:bg-gray-50 focus:bg-gray-50 transition whitespace-nowrap focus:outline-none"
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
  </menu>
</template>

<script>
import { mapActions } from 'vuex';
import AccountSettingsIcon from '../Icons/AccountSettingsIcon.vue';
import AddressIcon from '../Icons/AddressIcon.vue';
import LogoutIcon from '../Icons/LogoutIcon.vue';
import PackageIcon from '../Icons/PackageIcon.vue';
import PadlockIcon from '../Icons/PadlockIcon.vue';
import UserEditIcon from '../Icons/UserEditIcon.vue';

export default {
  name: 'Sidebar',
  components: {
    PackageIcon,
    LogoutIcon,
    PadlockIcon,
    UserEditIcon,
    AccountSettingsIcon,
    AddressIcon
  },
  methods: {
    ...mapActions({
      logout: 'authentication/logout'
    })
  }
};
</script>
