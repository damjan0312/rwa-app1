const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["babel-loader"]
      },
      {
        test:/\.css$/,
        loader:[
          require.resolve('style-loader'),
          require.resolve('css-loader'),
        ]
      }
      
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "./index.html"
    })
  ]
};

module.exports = config;