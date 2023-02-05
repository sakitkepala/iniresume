const { composePlugins, withNx } = require('@nrwl/webpack');
const { withReact } = require('@nrwl/react');

const { VanillaExtractPlugin } = require('@vanilla-extract/webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = composePlugins(withNx(), withReact(), (config) => {
  config.plugins.push(new VanillaExtractPlugin());
  config.plugins.push(new MiniCssExtractPlugin());
  return config;
});
