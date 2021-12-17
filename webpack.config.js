const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const tailwind = require("tailwindcss");

const mode = "development";
module.exports = [
  {
    mode,
    entry: "./src/renderer/index.tsx",
    output: {
      filename: "main.js",
      path: path.join(__dirname, "build"),
    },
    devtool: "source-map",
    target: "electron-renderer",
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src//renderer/index.html",
      }),
    ],
    module: {
      rules: [
        {
          test: /.tsx$/,
          loader: "babel-loader",
          options: {
            babelrc: false,

            presets: [
              ["@babel/preset-env", { targets: { electron: "9.0.2" } }],
              "solid",
              "@babel/preset-typescript",
            ],
            cacheDirectory: true,
            cacheCompression: false,
            compact: false,
          },
        },
        {
          test: /.css$/,
          use: [
            "style-loader",
            "css-loader",
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: [
                    require("postcss-import"),
                    tailwind("./tailwind.config.js"),
                    require("autoprefixer"),
                  ],
                },
              },
            },
          ],
        },
      ],
    },
  },
  {
    mode,
    entry: {
      main: "./src/main/index.ts",
      preload: "./src/main/preload.ts",
    },
    output: {
      filename: "[name].bundle.js",
      path: path.join(__dirname, "build"),
    },
    target: "electron-main",
    resolve: {
      extensions: [".ts"],
    },
    module: {
      rules: [
        {
          test: /.ts$/,
          loader: "ts-loader",
        },
      ],
    },
  },
];
