module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    extend: {
      height: {
        'below-nav': 'calc(100vh - 7rem)',
      }
    }
  },
  variants: {
    backgroundColor: ['odd'],
  },
  plugins: [],
}
