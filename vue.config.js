const path = require('path')
const webpack = require('webpack');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = ['js', 'css'];
function getObj(url){
  let  obj={
    '/api': {
      target: url,
      ws: true,
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''  //通过pathRewrite重写地址，将前缀/api转为/
      }
    }
  }
  return obj
}
function getProxy(){
    if(process.env.development=="development"){
      return getObj(process.env.VUE_APP_API)
    }
 
}
module.exports = {
  publicPath: "./",
  outputDir: "app",
  assetsDir: 'static',
  devServer: {// 环境配置
    host: '0.0.0.0',
    port: 8080,
    open: true, //配置自动启动浏览器
    proxy:getProxy(),
  },
	lintOnSave: false, //命令行关闭eslint校验
  chainWebpack: config => {
    // #region svg-config
    const svgRule = config.module.rule('svg') // 找到svg-loader
    svgRule.uses.clear() // 清除已有的loader, 如果不这样做会添加在此loader之后
    svgRule.exclude.add(/node_modules/) // 正则匹配排除node_modules目录
    svgRule // 添加svg新的loader处理
      .test(/\.svg$/)
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
    // 修改images loader 添加svg处理
    const imagesRule = config.module.rule('images')
    imagesRule.exclude.add(path.resolve('src/assets/icons'))
    // #endregion svg-config
    config.entry.app = ['babel-polyfill', './src/main.js'];
  },
  configureWebpack: config => {
    config.plugins.push(new webpack.ProvidePlugin({
      'window.Quill': 'quill/dist/quill.js',
      'Quill': 'quill/dist/quill.js'
    }),);
    if (process.env.NODE_ENV == 'production') {
      config.plugins.push(new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 10240,
        minRatio: 0.8
      }))
    }
    // plugins: [
    //   new webpack.ProvidePlugin({
    //     'window.Quill': 'quill/dist/quill.js',
    //     'Quill': 'quill/dist/quill.js'
    //   }),
    // ]
  }
};