require('module-alias/register')

const gulp = require('gulp')
const runSequence = require('run-sequence')

const browserSyncTask = require('@gulp-compile/tasks/browser-sync')
const sassTask = require('@gulp-compile/tasks/sass')
const ngBuildTask = require('@gulp-compile/tasks/ng-build')
const htmlTask = require('@gulp-compile/tasks/html')
const nodeModulesAssetsTask = require('@gulp-compile/tasks/node-modules-assets')
const assetsTask = require('@gulp-compile/tasks/assets')
const cleanDistTask = require('@gulp-compile/tasks/clean-dist')
const printConfigTask = require('@gulp-compile/tasks/print-config')
const setConfigTask = require('@gulp-compile/tasks/set-config')
const readVersionTask = require('@gulp-compile/tasks/read-version')
const releaseTask = require('@gulp-compile/tasks/release')
const zipTask = require('@gulp-compile/tasks/zip')

let variables = require('@gulp-compile/globals')

gulp.task('release', () => {
  return releaseTask()
})

gulp.task('read-version', () => {
  return readVersionTask()
})

gulp.task('set-config:prod', () => {
  return setConfigTask('production')
})

gulp.task('set-config:dev', () => {
  return setConfigTask('development')
})

gulp.task('set-config:analyze', () => {
  return setConfigTask('analyze')
})

gulp.task('print-config', () => {
  return printConfigTask()
})

gulp.task('config:dev', () => {
  variables.config = require('@gulp-compile/config.dev')
})

gulp.task('clean-dist', () => {
  return cleanDistTask()
})

gulp.task('html', () => {
  return htmlTask()
})

gulp.task('node-modules-assets', () => {
  return nodeModulesAssetsTask()
})

gulp.task('sass', () => {
  return sassTask()
})

gulp.task('scripts', () => {
  return ngBuildTask()
})

gulp.task('assets', () => {
  return assetsTask()
})

gulp.task('browser-sync', () => {
  return browserSyncTask()
})

gulp.task('zip', () => {
  return zipTask()
})

gulp.task('sass:watch', () => {
  return gulp.watch('./src/**/*.scss', ['sass'])
})

gulp.task('html:watch', () => {
  return gulp.watch('./src/index.html', ['html'])
})

gulp.task('assets:watch', () => {
  return gulp.watch('./src/assets/**/*.*', ['assets'])
})

gulp.task('scripts:watch', () => {
  variables.config.watch = true
  
  return ngBuildTask()
})

gulp.task('default', ['build:dev:serve'])

gulp.task('build:dev', done => {
  runSequence(
    ['set-config:dev', 'print-config', 'clean-dist'],
    ['scripts', 'html', 'node-modules-assets', 'sass', 'assets'],
    done
  )
})

gulp.task('build:prod', done => {
  runSequence(
    ['set-config:prod', 'print-config', 'clean-dist'],
    ['scripts', 'html', 'node-modules-assets', 'sass', 'assets'],
    done
  )
})

gulp.task('build:prod:release', done => {
  runSequence(
    'release',
    ['set-config:prod', 'print-config', 'clean-dist'],
    ['scripts', 'html', 'node-modules-assets', 'sass', 'assets'],
    'zip',
    done
  )
})

gulp.task('build:dev:serve', done => {
  runSequence(
    ['set-config:dev', 'print-config', 'clean-dist'],
    ['scripts:watch', 'html', 'node-modules-assets', 'sass', 'assets'],
    ['html:watch', 'sass:watch', 'assets:watch'],
    'browser-sync',
    done
  )
})

gulp.task('build:prod:serve', done => {
  runSequence(
    ['set-config:prod', 'print-config', 'clean-dist'],
    ['scripts:watch', 'html', 'node-modules-assets', 'sass', 'assets'],
    ['html:watch', 'sass:watch', 'assets:watch'],
    'browser-sync',
    done
  )
})
