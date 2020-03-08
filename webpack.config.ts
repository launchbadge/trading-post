import path from "path";
import merge from "webpack-merge";
import type { Options, Configuration } from "webpack";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import VueLoaderPlugin from "vue-loader/dist/plugin";

const common: Configuration = {
    entry: { app: path.resolve(__dirname, "src/index.ts") },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[contenthash].js"
    },
    resolve: {
        extensions: [ ".js", ".ts", ".tsx" ],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/u,
                exclude: /node_modules/u,
                use: "babel-loader"
            },
            {
                test: /\.vue$/u,
                exclude: /node_modules/u,
                use: "vue-loader"
            },
            {
                test: /\.css$/u,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: { importLoaders: 1 }
                    },
                    "postcss-loader"
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        // @ts-ignore
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src/index.html")
        }),
    ],
};

// @ts-ignore
const development: Configuration = {
    mode: "development",
    devtool: "eval-nosources-cheap-module-source-map" as Options.Devtool,
};

// TODO: Use https://webpack.js.org/plugins/mini-css-extract-plugin/
const production: Configuration = {
    mode: "production",
    plugins: [
        new CleanWebpackPlugin(),
    ]
};

export default merge(
    common,
    process.env.NODE_ENV === "development" ? development : production
);
