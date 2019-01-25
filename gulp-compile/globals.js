const fs = require('fs');

const configDefault = require('./config.dev')

let globals = {
  config: configDefault,
  readVersion: readVersion,
}

function readVersion() {
  const package = JSON.parse(fs.readFileSync('./package.json'));
  if (!package.version) {
    const error = 'Cannot read version from package.json!'
    console.error(log.message(error))
    throw new Error(error)
  }
  return package.version
}

module.exports = globals