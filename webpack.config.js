const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    app: path.resolve(__dirname, 'src', 'index.js'), // tu index.js principal dentro de src
    main: path.resolve(__dirname, 'js', 'main.js')    // tu script main.js en la raíz/js
  },
  output: {
    path: path.resolve(__dirname, 'dist'),                  // carpeta de salida
    filename: '[name].[contenthash].js',                     // bundles nombrados por entry key
    chunkFilename: 'js/[name].[contenthash].js',             // chunks dinámicos en dist/js/
    publicPath: './',                                        // rutas relativas
    clean: true                                              // limpia /dist antes de cada build
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico|avif|webp)$/i,
        type: 'asset/resource',
        generator: { filename: 'img/[name][ext]' }            // mantiene estructura de img/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html'),       // usa tu index.html raíz
      inject: 'body',
      chunks: ['main', 'app'],                               // inyecta ambos bundles
      minify: false                                          // conserva formato original
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'                   // estilos extraídos para cada entry
    }),
    new CopyPlugin({
      patterns: [
        { from: 'gracias.html', to: '' },                    // copia página de gracias
        { from: 'img', to: 'img' }                           // copia assets de img/
      ]
    })
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
    splitChunks: { chunks: 'all' }                          // separa vendors automáticamente
  },
  resolve: {
    extensions: ['.js']                                     // permite omitir extensión al importar
  }
};


