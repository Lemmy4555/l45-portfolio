const globals = require('@gulp-compile/globals')

const pushVersionTask = require('./push-version')
const tagVersionTask = require('./tag-version')
const updateVersionTask = require('./update-version')
const rollbackVersionTask = require('./rollback-version')

module.exports = () => {
  return new Promise((resolve, reject) => {
    const version = globals.readVersion()
    updateVersionTask()
      .then((versionChanged) => pushVersionTask(versionChanged))
      .then((versionChanged) => tagVersionTask(versionChanged))
      .then(() => resolve())
      .catch((error) => {
        rollbackVersionTask(version).then(() => reject(error))
      })
  })
}
