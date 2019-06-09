module.exports = {
  plugins: {
    'autoprefixer': {
        browsers: ['ie >= 8','Firefox >= 20', 'Safari >= 5', 'Android >= 4','Ios >= 6', 'last 4 version'],
        grid: true
    },
    "postcss-px-to-viewport": {
      // viewportWidth: 1349,
      viewportWidth: 1920,
      // viewportWidth: 1170,
      // viewportWidth: 750,
      viewportHeight: 1334,
      unitPrecision: 3,
      viewportUnit: 'vw',
      selectorBlackList: ['.ignore', '.hairlines'],
      minPixelValue: 1,
      mediaQuery: false
    }
  }
}