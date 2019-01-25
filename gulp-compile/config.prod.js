const configCommon = require('./config.common')

let configProd = {
  production: true,
  uglify: true,
  sourceMaps: false,
  watch: false
}

let config = { ...configCommon, ...configProd }

module.exports = config