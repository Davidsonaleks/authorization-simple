import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin"
import { join } from "path"
import { Configuration as WebpackConfiguration } from "webpack"
import { Configuration as DevServerConfiguration } from "webpack-dev-server"
require("dotenv").config()

type Configuration = WebpackConfiguration & DevServerConfiguration

const { WDS_PORT } = process.env
const SRC_DIR = join(__dirname, "src")
const DIST_DIR = join(__dirname, "dist")
const OUTPUT_PATH = WDS_PORT ? `http://localhost:${WDS_PORT}/dist/` : DIST_DIR

const stats: Configuration["stats"] = {
  // https://github.com/TypeStrong/ts-loader/issues/751
  warningsFilter: /export .* was not found in/,
  colors: true,
}

const config: Configuration = {
  entry: "./src/web/browser.ts",
  output: {
    filename: "main.js",
    path: DIST_DIR,
  },
  devServer: {
    port: Number(WDS_PORT),
    publicPath: OUTPUT_PATH,
    contentBase: false,
    disableHostCheck: true,
    compress: false,
    stats,
    liveReload: false,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    symlinks: false,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: "ts-loader",
          options: {
            // https://github.com/TypeStrong/ts-loader#loader-options
            transpileOnly: true,
            happyPackMode: true,
            compilerOptions: {
              // IMPORTANT! target is ES5 for production
              target: "ES2018",
            },
            experimentalWatchApi: true, // https://webpack.js.org/guides/build-performance/#typescript-loader
          },
        },
        exclude: [/node_modules/],
        include: SRC_DIR,
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      checkSyntacticErrors: true,
    }),
  ],
  watchOptions: {
    ignored: /node_modules/,
  },
}

export default config
