module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  devServer: {
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'http://47.104.211.178:9187/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api'
        }
      }
    }
  }
};
