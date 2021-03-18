/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
module.exports = {
  theme: {
    fill: {
      current: 'currentColor',
    }
  },
  variants: {
    opacity: ({
      after
    }) => after(['disabled'])
  },
  plugins: []
}
