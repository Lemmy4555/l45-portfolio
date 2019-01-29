const webpack = require('webpack')

module.exports = {
  plugins: [
    // Workaround warning di moment che non trova i locale in fase di compilazione
    //new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /(en\-us)$/),
  ]
};