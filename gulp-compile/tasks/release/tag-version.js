const git = require('gulp-git')

const globals = require('../../globals')
const Log = require('../../Log')
const log = new Log('tag-version')

module.exports = (versionChanged) => {
  return new Promise((resolve, reject) => {
    if (!versionChanged) {
      console.info(log.message('La versione non è cambiata, non verrà creata nessuna tag'))
      resolve(false)
      return
    }

    tagVersion()
      .then(() => pushTag())
      .then(() => resolve(true))
      .catch((error) => reject(error))
  })
}

const tagVersion = () => {
  return new Promise((resolve, reject) => {
    const version = globals.readVersion()

    git.tag(version, `CMS Custom ${version}`, { quiet: true }, function(error) {
      if (error) {
        console.error(log.message(error))
        reject(error)
      }

      resolve()
    })
  })
}

const pushTag = () => {
  return new Promise((resolve, reject) => {
    const version = globals.readVersion()

    git.push('origin', version, { quiet: true }, function(error) {
      if (error) {
        console.error(log.message(error))
        reject(error)
      } else {
        console.info(log.message(`Tag ${version} creata`))
      }

      resolve()
    })
  })
}
