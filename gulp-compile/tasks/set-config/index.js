const gulp = require('gulp')

const variables = require('@gulp-compile/globals')
const Log = require('@gulp-compile/Log')

module.exports = mode => {
  const log = new Log('set-config')

  switch (mode) {
    case 'production':
      console.info(log.message('Compilazione in modalità "production"'))
      variables.config = require('@gulp-compile/config.prod')
      break
    case 'analyze':
      console.info(log.message('Compilazione in modalità "bundle-analyze"'))
      variables.config = require('@gulp-compile/config.analyze')
      break
    case 'development':
    default:
      console.info(log.message('Compilazione in modalità "development"'))
      variables.config = require('@gulp-compile/config.dev')
      break
  }

  return Promise.resolve()
}
