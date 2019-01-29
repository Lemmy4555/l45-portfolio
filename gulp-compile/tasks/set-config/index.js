const gulp = require('gulp')

const variables = require('../../globals')
const Log = require('../../Log')

module.exports = mode => {
  const log = new Log('set-config')

  switch (mode) {
    case 'production':
      console.info(log.message('Compilazione in modalità "production"'))
      variables.config = require('../../config.prod')
      break
    case 'analyze':
      console.info(log.message('Compilazione in modalità "bundle-analyze"'))
      variables.config = require('../../config.analyze')
      break
    case 'development':
    default:
      console.info(log.message('Compilazione in modalità "development"'))
      variables.config = require('../../config.dev')
      break
  }

  return Promise.resolve()
}
