import { join } from "path"
import { Configuration } from "webpack"

const SRC_DIR = join(__dirname, "src")
const DIST_DIR = join(__dirname, "dist")

const config: Configuration = {
  entry: "./src/index.ts",
  output: {
    filename: "main.js",
    path: DIST_DIR,
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
}

export default config
