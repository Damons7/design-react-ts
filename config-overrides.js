const {
    override,
    addLessLoader,
    addWebpackAlias
} = require('customize-cra');
const path = require('path');
function resolve(dir) {
    return path.join(__dirname, '.', dir)
}
const lessOptions = {
    strictMath: true,
    noIeCompat: true,
    cssLoaderOptions: {}, // .less file used css-loader option, not all CSS file.
    cssModules: {
        localIdentName: "[path][name]__[local]--[hash:base64:5]", // if you use CSS Modules, and custom `localIdentName`, default is '[local]--[hash:base64:5]'.
    },
}
module.exports = override(
    addLessLoader({
        lessOptions,

    }),
    addWebpackAlias({
        '@': resolve('src'),
        "@components": resolve("src/components"),
        "@view": resolve("src/view"),
        "@eda": resolve("src/components/eda-design")
    })
)
