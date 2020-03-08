// TODO: cssnano or clean-css
module.exports = {
    plugins: {
        "postcss-import": {},
        "postcss-preset-env": {
            stage: 0,
            importFrom: "./src/theme.css"
        },
        "postcss-color-mod-function": {},
    }
}
