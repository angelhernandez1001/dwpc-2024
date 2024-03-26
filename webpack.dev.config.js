const path = require('path');

module.exports ={
    mode: "evelopment",
    entry: "./client/index.js",
    output:{
        path: path.resolve(__dirname, "public"),
        filename: "bundle.js",
        publicPath: "/"
    },
    devServer:{
        static: path.join(__dirname, "public"),
        port: 8080,
        host: "0.0.0.0"
    }
};