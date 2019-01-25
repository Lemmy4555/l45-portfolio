const globals = require('@gulp-compile/globals')
const Log = require('@gulp-compile/Log')
const log = new Log('read-version')

module.exports = () => {
  return new Promise((resolve) => {
    console.info(log.message(`La versione attuale è: ${globals.readVersion()}`))
    resolve()
  })
}