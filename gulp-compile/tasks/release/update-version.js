const gulp = require('gulp')
const inquirer = require('inquirer')
const bump = require('gulp-bump')

const globals = require('@gulp-compile/globals')
const Log = require('@gulp-compile/Log')
const log = new Log('update-version')

module.exports = () => {
  return new Promise(resolve => {
    const version = globals.readVersion()

    const nextVersionFactory = new NextVersionFactory(version)
    inquirer
      .prompt({
        type: 'list',
        name: 'release',
        message: `Seleziona la versione del prossimo rilascio:`,
        choices: [
          `Lascia la versione attuale (${version})`,
          `patch: ${nextVersionFactory.patch().toString()}`,
          `minor: ${nextVersionFactory.minor().toString()}`,
          `major: ${nextVersionFactory.major().toString()}`
        ]
      })
      .then(choice => {
        choice = choice.release

        let nextVersion = null

        if (choice.indexOf('patch') == 0) {
          nextVersion = nextVersionFactory.patch().nextVersionValue()
        } else if (choice.indexOf('minor') == 0) {
          nextVersion = nextVersionFactory.minor().nextVersionValue()
        } else if (choice.indexOf('major') == 0) {
          nextVersion = nextVersionFactory.major().nextVersionValue()
        } else {
          console.info(log.message(`La versione resterà invariata (${globals.readVersion()})`))
          resolve(false)
          return
        }

        console.info(log.message(`La versione verrà impostata a ${nextVersion}`))

        gulp
          .src('./package.json')
          .pipe(bump({ version: nextVersion }))
          .pipe(gulp.dest('./'))
          .on('end', () => {
            resolve(true)
          })
          .on('error', (error) => reject(error))
      })
  })
}

class NextVersionFactory {
  constructor(currentVersion) {
    this.currentVersion = currentVersion
  }

  patch() {
    let currentVersionSplitted = this.currentVersionSplitted()
    currentVersionSplitted[2] = `${parseInt(currentVersionSplitted[2]) + 1}`
    const nextVersion = currentVersionSplitted.join('.')
    return new NextVersion(this.currentVersion, nextVersion)
  }

  minor() {
    let currentVersionSplitted = this.currentVersionSplitted()
    currentVersionSplitted[2] = '0'
    currentVersionSplitted[1] = `${parseInt(currentVersionSplitted[1]) + 1}`
    const nextVersion = currentVersionSplitted.join('.')
    return new NextVersion(this.currentVersion, nextVersion)
  }

  major() {
    let currentVersionSplitted = this.currentVersionSplitted()
    currentVersionSplitted[2] = '0'
    currentVersionSplitted[1] = '0'
    currentVersionSplitted[0] = `${parseInt(currentVersionSplitted[0]) + 1}`
    const nextVersion = currentVersionSplitted.join('.')
    return new NextVersion(this.currentVersion, nextVersion)
  }

  currentVersionSplitted() {
    return this.currentVersion.split('.')
  }
}

class NextVersion {
  constructor(currentVersion, nextVersion) {
    this.currentVersion = currentVersion
    this.nextVersion = nextVersion
  }

  nextVersionValue() {
    return this.nextVersion
  }

  toString() {
    return `${this.currentVersion} => ${this.nextVersion}`
  }
}
