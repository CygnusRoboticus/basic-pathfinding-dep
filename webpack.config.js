const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');

const baseConfig = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  plugins: [
    new CompressionPlugin()
  ]
}

const server = {
  target: 'node',
  output: {
    filename: 'basic-pathfinding.node.js',
    path: path.resolve(__dirname, 'dist')
  },
  ...baseConfig
};

const client = {
  output: {
    filename: 'basic-pathfinding.js',
    path: path.resolve(__dirname, 'dist')
  },
  ...baseConfig
};

module.exports = [server, client];
