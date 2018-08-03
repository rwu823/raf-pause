import path from 'path'
import { Configuration, DefinePlugin, DllReferencePlugin } from 'webpack'
import { Configuration as WebpackDevConf } from 'webpack-dev-server'
import HardSourcePlugin from 'hard-source-webpack-plugin'
import HTMLPlugin from 'html-webpack-plugin'

interface DevServer extends WebpackDevConf {
  port: any
  stats: any
}

interface Conf extends Configuration {
  mode: any
  entry: any
  devServer: DevServer
  optimization: any
}

const port = process.env.PORT || 8081
const env = process.env.NODE_ENV || 'development'
const isDev = env === 'development'

const config: Conf = {
  devServer: {
    port,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    stats: {
      modules: false,
      error: true,
      warning: true,
    },
    contentBase: 'gh-pages/',
    overlay: {
      warnings: false,
      errors: true,
    },
  },

  mode: env,
  entry: {
    main: ['./benchmark'],
    raf: ['./benchmark/RafPause'],
    settimeout: ['./benchmark/SetTimeout'],
  },
  devtool: isDev && 'source-map',

  output: {
    publicPath: isDev ? `http://0.0.0.0:${port}/` : './',
    path: path.resolve('gh-pages'),
    filename: isDev ? '[name].js' : '[name].[hash].js',
    chunkFilename: isDev ? '[name].js' : '[name].[chunkhash].js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.wasm', '.mjs', '.js', '.json'],
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              useCache: true,
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new DllReferencePlugin({
      manifest: require('./out/assets/libs.dll.json'),
      context: __dirname,
    }),
    new HardSourcePlugin(),
  ],

  optimization: {
    splitChunks: {
      cacheGroups: {
        default: false,
        shared: {
          chunks: 'all',
          test: /(client\/components|src\/share)/,
          name: 'shared',
        },
      },
    },
  },
}

export default Object.getOwnPropertyNames(config.entry).map((filename) => {
  const plugins = [
    ...(config.plugins as []),
    new HTMLPlugin({
      filename: `${filename}.html`,
      title: filename,
      template: './benchmark/template.html',
      dllHash: require('./out/assets/libs.dll.json')
        .name.split('_')
        .slice(-1)[0],
      minify: isDev
        ? false
        : {
            collapseWhitespace: true,
          },
    }),
  ]

  return {
    ...config,
    plugins,
    entry: {
      [filename]: config.entry[filename],
    },
  }
})
