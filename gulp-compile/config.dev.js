const configCommon = require('./config.common')

let configDev = {
  production: false,
  uglify: false,
  sourceMaps: true,
  watch: false
}

let config = { ...configCommon, ...configDev }

module.exports = config