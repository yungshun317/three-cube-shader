const { merge } = require("webpack-merge");
const commonConfiguration = require("./webpack.common.js");
const path = require("path");

module.exports = merge(
    commonConfiguration,
    {
        mode: "development",
        devServer: {
            watchFiles: ["src/**/*"],
            static: {
                directory: path.join(__dirname, "dist"),
                watch: true
            },
            hot: true,
            port: 3000,
            open: true
        }
    }
)