const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  mode: 'production', // ou 'development'
  entry: path.resolve(__dirname, './src/main.ts'), // Fichier principal
  output: {
    filename: 'main.bundle.js',
    path: path.resolve(__dirname, '../../dist/apps/gestion-enfants/'),
  },
  resolve: {
    extensions: ['.ts', '.js'], // Support des fichiers TypeScript
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: path.resolve(
        __dirname,
        '../../dist/apps/gestion-enfants/report.html'
      ),
      openAnalyzer: false,
      generateStatsFile: true,
      statsFilename: path.resolve(
        __dirname,
        '../../dist/apps/gestion-enfants/stats.json'
      ),
    }),
  ],
};
