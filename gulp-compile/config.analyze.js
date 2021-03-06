const configCommon = require('./config.common')

let configDev = {
  production: true,
  uglify: true,
  sourceMaps: false,
  verboseStats: true,
  bundleAnalyzer: true,
  name: 'analyze-configuration'
}

let config = { ...configCommon, ...configDev }

module.exports = config