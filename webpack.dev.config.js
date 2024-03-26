const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const path = require('path');

module.exports ={
    mode: "development",
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
    },
    module:{
        rules:[
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use:[
                    {
                        loader:'babel-loader',
                        options: {
                            presets: [
                                [
                                    '@babel/preset-env',
                                    {
                                        'modules': false,
                                        'useBuiltIns': 'usage',
                                        'targets': '> 0.25%, not dead',
                                        'corejs': 3
                                    }
                                ]
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use:[
                    //usar el loader de css-loader
                    MiniCssExtractPlugin.loader,
                    //usar el loader de css-loader
                    "css-loader"
                ]
            }
        ]
    },
    plugins:[
        new MiniCssExtractPlugin({
            filename:"styles/app.css"
        })
    ]
};