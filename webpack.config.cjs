const path = require('path');

module.exports = {
  entry: './src/content.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'content.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/, // Add this rule to handle SCSS files
        use: [
          'style-loader', // Injects styles into the DOM
          'css-loader', // Translates CSS into CommonJS
          'sass-loader' // Compiles Sass to CSS
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss']
  }
};
