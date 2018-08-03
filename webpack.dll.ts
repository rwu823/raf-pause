import { DllPlugin, Configuration } from 'webpack'
import path from 'path'
import HardSourcePlugin from 'hard-source-webpack-plugin'

const library = '__[name]_[hash]'

interface Conf extends Configuration {
  mode: any;
}

const conf: Conf = {
  mode: process.env.NODE_ENV || 'development',
  entry: {
    libs: ['react', 'react-dom', 'styled-components'],
  },

  output: {
    library,
    filename: '[name].dll.[hash].js',
    path: path.resolve('gh-pages'),
  },

  plugins: [
    new HardSourcePlugin(),
    new DllPlugin({
      name: library,
      path: path.resolve('out/assets/libs.dll.json'),
    }),
  ],

  performance: {
    hints: false,
  },
}

export default conf
