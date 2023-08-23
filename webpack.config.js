const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: './src/index.ts', // Entry point of your application
    target: 'node', // Set the target environment to Node.js
    externals: [nodeExternals()], // Exclude external modules
    output: {
        filename: 'bundle.js', // Output filename
        path: path.resolve(__dirname, 'dist'), // Output directory
    },
    resolve: {
        extensions: ['.ts', '.js'], // File extensions to resolve
        alias: {
            '@utils': path.resolve(__dirname, 'src/utils'),
            '@config': path.resolve(__dirname, 'src/config'),
            '@models': path.resolve(__dirname, 'src/models'),
            '@controllers': path.resolve(__dirname, 'src/controllers'),
            '@routes': path.resolve(__dirname, 'src/routes'),
        },
    },
    watchOptions: {
        ignored: /node_modules/,
        aggregateTimeout: 300, // default value
        poll: 1000 // default value
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/, // Apply babel-loader and ts-loader for .ts and .tsx files
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-typescript']
                        }
                    },
                    {
                        loader: 'ts-loader'
                    }
                ]
            }
        ]
    }
};
