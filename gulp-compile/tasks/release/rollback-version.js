const gulp = require('gulp')
const bump = require('gulp-bump')

const globals = require('@gulp-compile/globals')
const Log = require('@gulp-compile/Log')
const log = new Log('rollback-version')

module.exports = (version) => {
  return new Promise((resolve, reject) => {
    gulp
      .src('./package.json')
      .pipe(bump({ version: version }))
      .pipe(gulp.dest('./'))
      .on('end', () => {
        console.info(log.message(`Rollback a versione ${version}`))
        resolve()
      })
      .on('error', (error) => reject(error))
  })
}