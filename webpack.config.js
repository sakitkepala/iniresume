const { composePlugins, withNx } = require('@nrwl/webpack');
const { withReact } = require('@nrwl/react');
const { VanillaExtractPlugin } = require('@vanilla-extract/webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = composePlugins(withNx(), withReact(), (config) => {
  // Integrasi Vanilla Extract CSS di Webpack:
  // https://vanilla-extract.style/documentation/integrations/webpack/
  config.plugins.push(new VanillaExtractPlugin());
  config.plugins.push(new MiniCssExtractPlugin());

  // Gak bisa import pakai: `import image from './image.png';`.
  // Cara import aset image yang dideskripsikan dokumentasinya gak jalan:
  // https://nx.dev/recipes/other/adding-assets-react#adding-images,-fonts,-and-files
  // Referensi workaround dengan konfig webpack: https://github.com/nrwl/nx/issues/14532
  // Dan musti pakai path dari root kayak ini:
  // `import image from 'src/assets/image.png';`
  config.module.rules = config.module.rules.map((rule) => {
    if (/file-loader/.test(rule.loader)) {
      return {
        ...rule,
        type: 'javascript/auto', // This is fixing issue https://webpack.js.org/guides/asset-modules/
      };
    }
    return rule;
  });

  return config;
});
