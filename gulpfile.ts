import gulp from "gulp";
import log from "fancy-log";
import WebpackDevServer from "webpack-dev-server";
import webpack from "webpack";
import webpackConfiguration from "./webpack.config";

gulp.task("build", (resolve) => {
   webpack(webpackConfiguration).run((err, stats) => {
       if (err != null) throw err;

       log(stats.toString({
           colors: true,
           all: false,
           assets: true,
       }));

       resolve();
   });
});

gulp.task("serve", () => {
    const compiler = webpack(webpackConfiguration);
    const server = new WebpackDevServer(compiler, {
        publicPath: "/",
        historyApiFallback: true,
        noInfo: true,
        disableHostCheck: true,
        hot: true
    }).listen(8080, "0.0.0.0", () => {
        log(`App running at: \u001B[34mhttp://localhost:8080\u001B[0m`);
    });
});
