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
            }
        ]
    }
};