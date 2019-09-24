require('@babel/register')({
  plugins: ["@babel/plugin-syntax-dynamic-import"],
  presets: ["@babel/preset-env"],
  ignore: [],
  extensions: [".es6", ".es", ".jsx", ".js", ".mjs"],
  cache: true,
})
require('./fw/index')
