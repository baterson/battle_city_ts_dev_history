const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    devtool: 'inline-source-map',
    entry: './src/index.ts',
    output: {
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    plugins: [
        new HtmlWebpackPlugin({ template: "./src/index.html" })
    ]
}
