const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
const { defineConfig } = require('@vue/cli-service')
const compressionWebpackPlugin = require('compression-webpack-plugin'); //引入插件
const productionGZipExtensions = ['js', 'css'];


module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap:false,
  devServer: {
    client: {
      overlay: false,
    },
  },
  configureWebpack: {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      new compressionWebpackPlugin({
        //[file] 会被替换成原始资源。[path] 会被替换成原始资源的路径， [query] 会被替换成查询字符串。默认值是 "[path].gz[query]"。
        filename: '[path][base].gz', // 提示compression-webpack-plugin@3.0.0的话asset改为filename
        //可以是 function(buf, callback) 或者字符串。对于字符串来说依照 zlib 的算法(或者 zopfli 的算法)。默认值是 "gzip"。
        algorithm: 'gzip',
        //所有匹配该正则的资源都会被处理。默认值是全部资源。
        test: new RegExp('\\.(' + productionGZipExtensions.join('|') + ')$'),
        //只有大小大于该值的资源会被处理。单位是 bytes。默认值是 0。
        threshold: 10240,
        //只有压缩率小于这个值的资源才会被处理。默认值是 0.8。
        minRatio: 0.8
      })
    ]
  }
})
