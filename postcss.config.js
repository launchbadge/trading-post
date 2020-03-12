const plugins = {
    // "postcss-import": {},
    "postcss-preset-env": {
        stage: 0,
        importFrom: "./src/theme.css"
    },
    "postcss-color-mod-function": {},
};

if (process.env.NODE_ENV === "production") {
    plugins.cssnano = {};
}

module.exports = { plugins };
