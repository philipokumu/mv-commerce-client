const colors = require('tailwindcss/colors');

module.exports = {
  purge: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}'
  ],
  darkMode: false,
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      primary: colors.green,
      secondary: colors.purple,
      white: colors.white,
      black: colors.black,
      gray: colors.gray,
      green: colors.green,
      blue: colors.blue,
      yellow: colors.yellow,
      red: colors.red
    },
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        sourcesans: ['"Source Sans Pro"', 'sans-serif']
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
