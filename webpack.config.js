var path = require('path');

module.exports = {
    entry: './src/main/js/phonebook.js',
    devtool: 'cheap-module-source-map',
    cache: true,
    mode: 'development',
    output: {
        path: __dirname,
        filename: './src/main/webapp/resources/js/bundle.js'
    },
    module: {
        rules: [
            {
                test: path.join(__dirname, '.'),
                exclude: /(node_modules)/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"]
                    }
                }]
            },
            {test: /\.css$/, use: 'css-loader'}
        ]
    }
};