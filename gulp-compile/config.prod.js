const configCommon = require('./config.common')

let configProd = {
  production: true,
  uglify: true,
  sourceMaps: false,
  watch: false,
  concatProdFiles: false,
  name: 'production-configuration'
}

let config = { ...configCommon, ...configProd }

module.exports = config