var webpack = require('webpack');//引入webpack
var path = require('path');//引入nodejs路径模块，处理路径用的
var glob = require('glob');//glob，这个是一个全局的模块，动态配置多页面会用得着
var HtmlWebpackPlugin = require('html-webpack-plugin'); //这个是通过html模板生成html页面的插件
var MiniCssExtractPlugin = require("mini-css-extract-plugin");//分离css，webpack4推荐的分离css的插件
var TransferWebpackPlugin = require('transfer-webpack-plugin');//原封不动的把assets中的文件复制到dist文件夹中


//动态添加入口
function getEntry() {
  var entry = {};
  //读取src目录所有page入口
  glob.sync('./src/js/**/*.js').forEach(function (name) {
    var start = name.indexOf('src/') + 4;
    var end = name.length - 3;
    var eArr = [];
    var n = name.slice(start, end);
    n = n.split('/')[1];
    eArr.push(name);
    eArr.push('babel-polyfill'); //引入这个，是为了用async await，一些IE不支持的属性能够受支持，兼容IE浏览器用的
    entry[n] = eArr;
  })
  return entry;
}

//动态生成html
//获取html-webpack-plugin参数的方法
var getHtmlConfig = function (name, chunks) {
  return {
    template: `./src/pages/${name}.html`,
    filename: `pages/${name}.html`,
    inject: true,
    hash: false,
    chunks: [name]
  }
}

module.exports = {
  entry: getEntry(),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name]-bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        include: /src/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env',],
              plugins: ['@babel/transform-runtime']
            }
          }
        ]
      },
      {
        test: /\.css$/,
        //use:['style-loader','css-loader','postcss-loader']//css不分离写法
        //css分离写法
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"]
      },
      {
        test: /\.scss$/,
        //use:['style-loader','css-loader','sass-loader','postcss-loader']//css不分离写法
        //css分离写法
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"]
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 5000
            }
          }
        ]
      }
    ]
  },
  mode: "development",
  // 性能相关配置
  performance: {
    hints: false
  },
  //插件
  plugins: [
    //将css分离出去
    new MiniCssExtractPlugin({
      filename: "css/[name].css"
    }),
    //全局引入jquery
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      jquery: "jquery",
      "window.jQuery": "jquery"
    }),
    //作用相当于copy-webpack-plugin
    new TransferWebpackPlugin([
      {
        from: 'assets',
        to: 'assets'
      }
    ], path.resolve(__dirname, "src")),
    // 热更新模块，这样js改变就不会全部重载，而是只是重载你改过的那一部分
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'), //最好设置成绝对路径
    historyApiFallback: false, //true默认打开index.html，false会出现一个目录，一会演示
    hot: true,
    inline: true,
    // stats: 'errors-only',
    stats: {
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false,
      timings: true
    },
    host: '0.0.0.0',
    port: '8090',
    overlay: true, //出现错误之后会在页面中出现遮罩层提示
    open: true//运行之后自动打开本地浏览器
  }
}

//配置页面
var entryObj = getEntry();
var htmlArray = [];
Object.keys(entryObj).forEach(function (element) {
  htmlArray.push({
    _html: element,
    title: '',
    chunks: [element]
  })
})
//自动生成html模板
htmlArray.forEach(function (element) {
  module.exports.plugins.push(new HtmlWebpackPlugin(getHtmlConfig(element._html, element.chunks)));
})


// 但是webpack-dev-server打包之后的dist文件夹我们是看不见的，是打包在内存中的（也是为了快），硬盘中是看不到的
// 如果你有个index.html，它会自动打开index.html，我这个项目没有在根目录下设置index.html
