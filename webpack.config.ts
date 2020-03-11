import path from "path";
import merge from "webpack-merge";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import VueLoaderPlugin from "vue-loader/dist/plugin";
import Dotenv from "dotenv-webpack";
import { Configuration, Options } from "webpack";

const common: Configuration = {
    entry: {
        app: [
            path.resolve(__dirname, "src/shims/shims.ts"),
            path.resolve(__dirname, "src/index.ts")
        ]
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js"
    },
    resolve: {
        extensions: [ ".js", ".ts", ".tsx" ],
        alias: {
            "stream": "stream-browserify",
            "crypto": "crypto-browserify",
            "vm": "vm-browserify"
        }
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
            },
            {
                test: /\.(png|svg|jpg|gif)$/u,
                include: path.resolve(__dirname, "src"),
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            fallback: "file-loader",
                            limit: 8192
                        }
                    },
                    {
                        loader: "img-loader",
                    }
                ]
            },
            {
                test: /\.(ttf)$/u,
                include: path.resolve(__dirname, "src"),
                use: [
                    {
                        loader: "file-loader",
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new Dotenv(),
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
    devtool: "cheap-module-source-map" as Options.Devtool,
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
