module.exports = {
  purge: ['./pages/**/*.js', './components/**/*.js'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#00B3B0',
        secondary: '#1B243F',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
