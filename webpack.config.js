const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const path = require('path');

module.exports ={
    mode: "production",
    entry: "./client/index.js",
    output:{
        path: path.resolve(__dirname, "public"),
        filename: "bundle.js",
        publicPath: "/"
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
            //reglas para archivo css
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
    //configuracion de plugins
    plugins:[
        new MiniCssExtractPlugin({
            filename:"styles/app.css"
        })
    ]
};