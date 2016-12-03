module.exports = {
    devtool: 'source-map',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: './dist'
    },
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
        ]
    }
};
