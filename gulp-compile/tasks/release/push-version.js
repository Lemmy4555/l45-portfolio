const gulp = require('gulp')
const exec = require('gulp-exec')
const git = require('gulp-git')

const globals = require('../../globals')
const Log = require('../../Log')
const log = new Log('push-version')

const execOptions = {
  continueOnError: false, // default = false, true means don't emit error event
  pipeStdout: false, // default = false, true means stdout is written to file.contents
  customTemplatingThing: 'test' // content passed to lodash.template()
}

const execReportOptions = {
  err: true, // default = true, false means don't write err
  stderr: true, // default = true, false means don't write stderr
  stdout: true // default = true, false means don't write stdout
}

module.exports = versionChanged => {
  return new Promise((resolve, reject) => {
    if (!versionChanged) {
      console.info(log.message('La versione non è cambiata, non verrà fatto nessun commit per il versionamento'))
      resolve(false)
      return
    }

    checkGitWorkingTree()
      .then(() => checkGitPullNeeded())
      .then(() => checkGitNothingToCommit())
      .then(pushAllowed => commitAndPush(pushAllowed))
      .then(() => {
        resolve(true)
      })
      .catch(error => reject(error))
  })
}

const checkGitNothingToCommit = () => {
  return new Promise((resolve, reject) => {
    git.status({ args: '--porcelain', quiet: true }, (error, stdout) => {
      if (error) {
        console.error(log.message(error))
        reject(error)
        return
      }

      const changes = stdout.split('\n')
      if (changes.length == 1) {
        console.warn(log.message('Non hai nulla da committare, hai aggiornato la versione nel package.json?'))
        resolve(false)
        return
      }

      resolve(true)
    })
  })
}

const checkGitWorkingTree = () => {
  return new Promise((resolve, reject) => {
    git.status({ args: '--porcelain', quiet: true }, (error, stdout) => {
      if (error) {
        console.error(log.message(error))
        reject(error)
        return
      }

      const changes = stdout.split('\n')
      if (changes.length >= 2 && changes[0] != ' M package.json') {
        const error = 'Hai dei file non committati, committali prima di committare la nuova versione!'
        console.error(log.message(error))
        console.error(log.message(logStatusWorkingTree), stdout)
        reject(error)
        return
      }

      resolve()
    })
  })
}

const checkGitPullNeeded = () => {
  return new Promise((resolve, reject) => {
    git.status({ args: '-uno', quiet: true }, (error, stdout) => {
      if (error) {
        console.error(log.message(error))
        reject(error)
        return
      }

      if (stdout.indexOf('Your branch is behind') != -1 || stdout.indexOf('use "git pull" to merge') != -1) {
        const error = 'Il tuo branch non è aggiornato, devi effettuare un pull prima di pushare il commit della nuova versione!'
        console.error(log.message(logStatusPullNeeded), stdout)
        console.error(log.message(error))
        reject(error)
        return
      }

      resolve()
    })
  })
}

const commitAndPush = pushAllowed => {
  return new Promise((resolve, reject) => {
    const version = globals.readVersion()

    if (!pushAllowed) {
      resolve()
      return
    }

    console.info(log.message(`Commit e push della versione ${version}`))
    gulp
      .src('.')
      .pipe(exec('git add ./package.json', execOptions))
      .pipe(exec(`git commit ./package.json -m "CMS Custom ${version}"`, execOptions))
      .pipe(exec('git push', execOptions))
      .pipe(exec.reporter(execReportOptions))
      .pipe(gulp.dest('.'))
      .on('end', () => {
        resolve()
      })
      .on('error', error => {
        console.error(log.message(`Errore durante il commit/push del versionamento:\n${error}`))
        reject(error)
      })
  })
}

const logStatusWorkingTree = `Stato della working tree di git:
%s`

const logStatusPullNeeded = `Stato del branch attuale:
%s`
