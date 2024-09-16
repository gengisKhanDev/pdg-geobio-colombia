module.exports = {
  content: [
    './client/**/*.html',
    './imports/ui/**/*.jsx',
    './node_modules/flowbite/**/*.js'
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
};
