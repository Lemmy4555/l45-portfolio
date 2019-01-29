const globals = require('../../globals')
const Log = require('../../Log')
const log = new Log('read-version')

module.exports = () => {
  return new Promise((resolve) => {
    console.info(log.message(`La versione attuale è: ${globals.readVersion()}`))
    resolve()
  })
}