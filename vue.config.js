module.exports = {
  pwa: {
    themeColor: '#FFF'
  },
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].description =
        'Example Vue.js get trading view with binance api.'
      return args
    })
  },
  publicPath: process.env.NODE_ENV === 'production' ? '/trading-charts/' : '/'
}
